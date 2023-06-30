package com.awesome

import android.annotation.SuppressLint
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.hardware.usb.*
import android.os.Build
import androidx.annotation.RequiresApi
import cn.pda.serialport.SerialPort
import com.blankj.utilcode.util.*
import kotlinx.coroutines.*
import java.io.InputStream
import java.io.OutputStream

/**
 * 2.4G 模块
 * Created by ouyang on 2021/6/18.
 */
class MicrowaveManager {
    companion object {
        const val PID = 29987
        const val VID = 6790

        // 2.4G 标签卡号的开始位和结束位
        const val BEGIN_FLAG = "02";
        const val END_FLAG = "03";
        const val EPC_LENGTH = 8

        val instance : MicrowaveManager by lazy(LazyThreadSafetyMode.SYNCHRONIZED)
        {
            MicrowaveManager();
        }
    }



    private var isWaitingSet = false;
    private var setStr = "";
    private var setCount = 0;
    private lateinit var serialPort: SerialPort
    private lateinit var inputStream: InputStream
    private lateinit var outputStream: OutputStream
    var usbConnection: UsbDeviceConnection? = null
    var usbEndPointIn: UsbEndpoint? = null
    var usbEndPointOut: UsbEndpoint? = null
    var usbEndPointCtl: UsbEndpoint? = null
    lateinit var manager : UsbManager
    lateinit var permissionIntent : PendingIntent
    init {
        manager = MainApplication.mContext.getSystemService(Context.USB_SERVICE) as UsbManager
        permissionIntent =
            PendingIntent.getBroadcast(MainApplication.mContext, 0, Intent("com.android.example.USB_PERMISSION"), 0)
        UsbDeviceBroadCastReceiver.registUsbReceiver(MainApplication.mContext).setCallBack {
            onUsbAttached {
                LogUtils.e("usb插入", "${it.productId}", "${it.vendorId}")
                if(manager.hasPermission(it))
                {
                    connectUsbDevice(it);
                }
                else
                {
                    manager?.requestPermission(it, permissionIntent)
//                    connectUsbDevice(it!!)
                }
            }

            onUsbDetached {
                if (it.vendorId == VID && it.productId == PID) {
                    usbConnection = null
                    ToastUtils.showLong("2.4usb被设备拔出，将无法进行扫描")
                }
            }
            onUsbPermissionDenied {

            }
            onUsbPermissionAllowed {
                if (it?.vendorId == VID && it.productId == PID) {
                    connectUsbDevice(it)
                }
            }
        }
    }


    fun connectUsbDevice(usbDevice: UsbDevice) {
        LogUtils.e(
            manager, usbDevice.vendorId, usbDevice.productId, usbDevice.interfaceCount
        )
        if (manager != null) {
            try {
                for(i in 0..usbDevice.interfaceCount)
                {
                    LogUtils.e(i)

                    val usbInterface = usbDevice.getInterface(i)
                    for (i in 0 until usbInterface.endpointCount) {
                        val end = usbInterface.getEndpoint(i);
                        if(end.type == UsbConstants.USB_ENDPOINT_XFER_BULK)
                        {
                            if (end.direction == UsbConstants.USB_DIR_IN) {
                                usbEndPointIn = end;
                            } else if (end.direction == UsbConstants.USB_DIR_OUT) {
                                usbEndPointOut = end;
                            }
                        }
                        else if(end.type == UsbConstants.USB_ENDPOINT_XFER_CONTROL)
                        {
                            usbEndPointCtl = end
                        }

                    }
                    if(usbEndPointIn!=null && usbEndPointOut!=null)
                    {
                        usbConnection = manager?.openDevice(usbDevice)
                        if (usbConnection != null) {
                            ToastUtils.showLong("Usb已链接")
                            configUsb(9600)
                        } else {
                            ToastUtils.showLong("Usb未链接")
                        }
                    }

                }
            } catch (e: Exception) {
            }


        } else {
            ToastUtils.showLong("Usb未链接")
        }
    }

    fun writeData2Usb(message: String): Int {
        if (usbEndPointOut == null) {
            ToastUtils.showLong("usb输出接口未找到")
            return 0
        }
        val sendBytes = ConvertUtils.hexString2Bytes(message)
        return usbConnection?.bulkTransfer(usbEndPointOut, sendBytes, sendBytes.size, 10000) ?: -1
    }

    data class UsbRecvDat(var len :Int,var dat : String)

    private fun receiverDataFromUsb(): UsbRecvDat? {
        val buffer = ByteArray(128)
        val receiveResult =
            usbConnection?.bulkTransfer(usbEndPointIn, buffer, buffer.size, 1000) ?: -1
//        LogUtils.e(receiveResult)
        return if (receiveResult <= 2) {
            null
        } else {
            UsbRecvDat(receiveResult,ConvertUtils.bytes2HexString(buffer))
        }
    }


    var listener: (card: String) -> Unit = {}
    var scanJob : Job? = null



    private var isOpen = false

    fun set2_4Power(power : Int)
    {
        var count = 0;
        while(count<20)
        {
            var powerhex = ConvertUtils.int2HexString(power);
            if(powerhex.length%2!=0)
            {
                powerhex= "0$powerhex"
            }
            val hexPower = "02${powerhex}03"
            val pwoerByte = ConvertUtils.hexString2Bytes(hexPower)
            setStr = hexPower
            try {
                isWaitingSet = true
                var ret = writeData2Usb(setStr)
                LogUtils.e(ret)
            }catch (e:Exception){
                e.printStackTrace()
            }
            count++;
        }


    }



    fun open(success: ()->Unit,failed : ()->Unit)
    {
        LogUtils.e("24 open : $isOpen")
        if(!isOpen){
            var deviceFlag = false;
            if(usbConnection!=null && usbEndPointIn!=null && usbEndPointOut!=null)
            {
                deviceFlag = true
            }
            else
            {
                manager.deviceList.forEach { (t, u) ->
                    if(u.vendorId == VID && u.productId == PID)
                    {
                        deviceFlag = true
                        if(manager.hasPermission(u))
                        {
                            connectUsbDevice(u)
                        }
                        else
                        {
                            manager.requestPermission(u,permissionIntent)
                        }
                    }
                }
            }
            if(deviceFlag)
            {
                isOpen = true
                scanJob = GlobalScope.launch {
                    delay(1000);
                    receive()
                }
                success.invoke()
            }
            else
            {
                failed.invoke()
            }

        }
    }

    fun close()
    {
        if(isOpen)
        {
            usbConnection?.close();
            scanJob?.cancel()
            isOpen = false;
        }
    }

    private suspend fun receive() {
        while (true) {
            if (isOpen && usbConnection != null && usbEndPointIn != null && usbEndPointOut != null) {
                var recv = receiverDataFromUsb();
                if (recv != null && recv.len > 0) {
                    var buffer = ConvertUtils.hexString2Bytes(recv.dat)
                    var size = buffer.size
                    val cache = StringBuilder()
                    for (i in 0 until size) {
                        val oneByte: String = ConvertUtils.bytes2HexString(byteArrayOf(buffer[i]))
                        cache.append(oneByte)
                        if (oneByte == END_FLAG && cache.length >= 16) {
                            var startIndex = 0
                            val length = cache.length
                            startIndex = cache.indexOf(BEGIN_FLAG)
                            //02025E288803
                            if ((length - startIndex) == 16) {
                                var tag = cache.substring(startIndex + BEGIN_FLAG.length, length)
                                tag = tag.substring(0, tag.length - END_FLAG.length)
                                val epc = tag.substring(0, EPC_LENGTH)
                                listener(epc)
                                cache.setLength(0)
                                break
                            } else {
                                cache.setLength(0)
                            }
                        }


                    }
                }
            }
        }
    }

    fun configUsb(paramInt: Int): Boolean {
        if (usbConnection != null) {
            val arrayOfByte = ByteArray(8)
            usbConnection?.controlTransfer(192, 95, 0, 0, arrayOfByte, 8, 1000)
            usbConnection?.controlTransfer(64, 161, 0, 0, null, 0, 1000)
            var l1 = (1532620800 / paramInt).toLong()
            var i = 3
            while (true) {
                if (l1 <= 65520L || i <= 0) {
                    val l2 = 65536L - l1
                    val j: Int = (0xFF00 and l2.toInt() or i)
                    val k: Int = (0xFF and l2.toInt())
                    usbConnection?.controlTransfer(64, 154, 4882, j, null, 0, 1000)
                    usbConnection?.controlTransfer(64, 154, 3884, k, null, 0, 1000)
                    usbConnection?.controlTransfer(192, 149, 9496, 0, arrayOfByte, 8, 1000)
                    usbConnection?.controlTransfer(64, 154, 1304, 80, null, 0, 1000)
                    usbConnection?.controlTransfer(64, 161, 20511, 55562, null, 0, 1000)
                    usbConnection?.controlTransfer(64, 154, 4882, j, null, 0, 1000)
                    usbConnection?.controlTransfer(64, 154, 3884, k, null, 0, 1000)
                    usbConnection?.controlTransfer(64, 164, 0, 0, null, 0, 1000)
                    return true
                }
                l1 = l1 shr 3
                i--
            }
        } else return false
    }

}

