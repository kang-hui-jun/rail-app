package com.awesome

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.hardware.usb.UsbDevice
import android.hardware.usb.UsbManager
import com.blankj.utilcode.util.LogUtils
import com.blankj.utilcode.util.ToastUtils

class UsbDeviceBroadCastReceiver : BroadcastReceiver() {

    companion object {
        val ACTION_USB_PERMISSION = "com.android.example.USB_PERMISSION"
        fun registUsbReceiver(context: Context): UsbDeviceBroadCastReceiver {
            val receiver = UsbDeviceBroadCastReceiver()
            val filter = IntentFilter()
            filter.addAction(UsbManager.ACTION_USB_DEVICE_ATTACHED)
            filter.addAction(UsbManager.ACTION_USB_DEVICE_DETACHED)
            filter.addAction(ACTION_USB_PERMISSION)
            context.registerReceiver(receiver, filter)
            return receiver
        }
    }

    var listener : ReceiverCallback? = null

    fun setCallBack(callback : ReceiverCallback.() -> Unit) {
        listener = ReceiverCallback().apply(callback)
    }

    override fun onReceive(context: Context?, intent: Intent?) {
        val action = intent!!.action
        if (ACTION_USB_PERMISSION.equals(action)) {
            val isAllowed = intent.getBooleanExtra(UsbManager.EXTRA_PERMISSION_GRANTED, false)
            val device = intent.getParcelableExtra(UsbManager.EXTRA_DEVICE) as UsbDevice?

            if (isAllowed) {//usb权限获取成功
                listener?.onUsbPermissionAllowed?.invoke(device)
                LogUtils.e("权限获取成功")
            } else {
                listener?.onUsbPermissionDenied?.invoke(device)
                ToastUtils.showLong("usb权限获取失败")
            }
        } else if (UsbManager.ACTION_USB_DEVICE_ATTACHED == (action)) {// 有新的设备插入了，在这里一般会判断这个设备是不是我们想要的，是的话就去请求权限
            val device = intent.getParcelableExtra(UsbManager.EXTRA_DEVICE) as UsbDevice?
            device?.let {
                listener?.onUsbAttached?.invoke(device)
            }
        } else if (UsbManager.ACTION_USB_DEVICE_DETACHED == (action)) { // 有设备拔出了
            val device = intent.getParcelableExtra(UsbManager.EXTRA_DEVICE) as UsbDevice?
            device?.let {
                listener?.onUsbDetached?.invoke(device)
                LogUtils.e("usb拔出")

            }
        }
    }

    class ReceiverCallback {
        var onUsbAttached: ((UsbDevice) -> Unit)? = null
            private set
        var onUsbDetached: ((UsbDevice) -> Unit)? = null
            private set

        var onUsbPermissionAllowed: ((UsbDevice?) -> Unit)? = null
            private set

        var onUsbPermissionDenied: ((UsbDevice?) -> Unit)? = null
            private set


        fun onUsbAttached(onUsbAttached: ((UsbDevice) -> Unit)) {
            this.onUsbAttached = onUsbAttached
        }

        fun onUsbDetached(onUsbDetached: ((UsbDevice) -> Unit)){
            this.onUsbDetached = onUsbDetached
        }

        fun onUsbPermissionAllowed(onUsbPermissionAllowed: ((UsbDevice?) -> Unit)){
            this.onUsbPermissionAllowed = onUsbPermissionAllowed
        }

        fun onUsbPermissionDenied(onUsbPermissionDenied: ((UsbDevice?) -> Unit)){
            this.onUsbPermissionDenied = onUsbPermissionDenied
        }
    }

}