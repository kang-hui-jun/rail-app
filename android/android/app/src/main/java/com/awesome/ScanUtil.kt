package com.awesome

import com.blankj.utilcode.util.ConvertUtils
import com.blankj.utilcode.util.LogUtils
import com.blankj.utilcode.util.ThreadUtils
import com.handheld.uhfr.UHFRManager
import com.uhf.api.cls.Reader
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlin.concurrent.thread

class ScanUtil {

    companion object {
        val instance by lazy(LazyThreadSafetyMode.SYNCHRONIZED) {
            ScanUtil()
        }
    }

    var listenerDelayTimeMiles : Long = 3000L

    private var listener: ((String) -> Unit)? = null
    private var manager: UHFRManager? = null
    var job = Runnable {
        while (!Thread.interrupted()) {
            var retList = manager?.tagInventoryRealTime()
            LogUtils.e("${retList?.size}")
            if (!retList.isNullOrEmpty()) {
                retList.forEach {
                    var epc = ConvertUtils.bytes2HexString(it.EpcId)
                    LogUtils.e("epc : ${epc}")
                    ThreadUtils.runOnUiThread { listener?.invoke(epc) }
                }
            }
            try {
                Thread.sleep(listenerDelayTimeMiles)
            } catch (e: InterruptedException) {
                e.printStackTrace()
                Thread.currentThread().interrupt()
            }
        }
    }
    var scanThread: Thread? = null

    fun open915(power: Int, success: () -> Unit, failure: () -> Unit) {
        try {
            manager = UHFRManager.getInstance()
            if (manager != null) {
                manager?.setPower(power, power)
                manager?.region = Reader.Region_Conf.valueOf(1)
                is915Open = true
                success.invoke()
            } else {
                LogUtils.e("manager = null")
                failure.invoke()
            }
        } catch (e: Exception) {
            e.printStackTrace()

            failure.invoke()
        }
    }

    fun close915() {
        if (manager != null) {
            if(is915Reading){
                stopScan915()
            }
            manager?.close()
            manager = null;
            is915Open = false
        }
    }

    var is915Reading = false
    var is915Open = false

    fun startScan915(): Boolean {
        if (is915Reading) return true
        var ret = manager?.asyncStartReading()
        if (ret == Reader.READER_ERR.MT_OK_ERR) {
            is915Reading = true
            if (scanThread == null) {
                scanThread = Thread(job)
            }
            scanThread?.start()
            return true
        }
        return false
    }

    fun stopScan915(): Boolean {
        if (!is915Reading) return true
        var ret = manager?.asyncStopReading()
        if (ret == Reader.READER_ERR.MT_OK_ERR) {
            is915Reading = false
            scanThread?.interrupt()
            scanThread = null
            LogUtils.e(scanThread)
            return true
        }
        return false
    }

    fun setListener(listener: (String) -> Unit) {
        this.listener = listener
    }


}