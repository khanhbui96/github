package com.v2rk;

import android.content.Context;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.net.VpnService;
import android.content.Intent;
import android.util.Log;

public class RNV2rayModule extends ReactContextBaseJavaModule {
    Context context;
    RNV2rayModule(ReactApplicationContext context) {
       super(context);
       this.context = context.getApplicationContext();

   }


    @Override
    public String getName() {
    return "RNV2rayModule";
    }

    @ReactMethod
    public void nativeStartV2ray(String config) {
         MainActivity activity = (MainActivity) this.getReactApplicationContext().getCurrentActivity();
         Intent intent = VpnService.prepare(context.getApplicationContext());
         if (intent != null) {
             activity.activityResultLauncher.launch(intent);
         }
         V2rayController.StartV2ray(context.getApplicationContext(), config, null);
    }
    @ReactMethod
    public void nativeStopV2ray() {
         V2rayController.StopV2ray(context.getApplicationContext());
    }
    @ReactMethod
    public void nativeGetStatusSocket(Callback callback) {
         Boolean value = V2rayController.isV2raySocketRunning();
         callback.invoke(value);
    }
    @ReactMethod
    public void nativeServerDelay(Callback callback) {
        String value = V2rayController.getServerDelay();
        callback.invoke(value);
    }
    @ReactMethod
    public void nativeConfigDelay(String config, Callback callback) {
        String value = V2rayController.getConfigDelay(config);
        callback.invoke(value);
    }
}