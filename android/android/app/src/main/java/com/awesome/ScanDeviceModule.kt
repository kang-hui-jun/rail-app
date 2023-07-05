package com.awesome

import android.os.Build
import com.blankj.utilcode.util.ThreadUtils
import com.blankj.utilcode.util.ToastUtils
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule


import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch

class ScanDeviceModule(private var reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(
        reactContext
    ) {
    private var manager24 : MicrowaveManager?=null

    val TAG_EVENT = "tagEvent"


    override fun getName(): String {
        return "ScanDeviceModule"
    }

    var callBack915 : ((String) -> Unit) = {
        if(it.isNullOrBlank()) return
        sendTagEvent(reactContext,TAG_EVENT,it)
    }



    fun sendTagEvent(reactContext: ReactContext,eventName : String,params : String)
    {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(TAG_EVENT,params)
    }


    @ReactMethod
    fun initDevice() {
        manager24 = MicrowaveManager()
        manager24?.listener = callBack915
        ScanUtil.instance.setListener(callBack915)
    }

    @ReactMethod
    fun open24(success : Callback , failure : Callback)
    {
        manager24?.open({
            success.invoke()
        }){
            failure.invoke()
        }
    }

    @ReactMethod
    fun close24()
    {
        manager24?.close()
    }

    @ReactMethod
    fun setDelayTime(delayTime : Int)
    {
        ScanUtil.instance.listenerDelayTimeMiles = delayTime.toLong()
    }


    //power 功率
    @ReactMethod
    fun open915(power : Int,success : Callback , failure : Callback)
    {
        ScanUtil.instance.open915(power,{success.invoke()},{failure.invoke()})

    }

    @ReactMethod
    fun close915()
    {
        ScanUtil.instance.close915()
    }

    @ReactMethod
    fun startScan915()
    {
        ScanUtil.instance.startScan915()

    }

    @ReactMethod
    fun stopScan915()
    {
        ScanUtil.instance.stopScan915()
    }




    @ReactMethod
    fun test() {
        ToastUtils.showLong("鬼行区 rn 原生测试")
    }

    override fun getConstants(): MutableMap<String, Any>? {
        var c = HashMap<String,Any>();
        return c
    }

}

