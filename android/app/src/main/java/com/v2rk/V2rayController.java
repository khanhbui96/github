package com.v2rk;

import static com.v2rk.core.utils.BLOCKED_APPS;
import static com.v2rk.core.utils.FLAG_VPN_START;
import static com.v2rk.core.utils.FLAG_VPN_STOP;

import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.util.Log;

import com.v2rk.core.V2rayCore;
import com.v2rk.services.V2rayVPNService;

import java.util.ArrayList;

public class V2rayController {
    public static void StartV2ray(final Context context, final String config, final ArrayList<String> blocked_apps) {
        BLOCKED_APPS = blocked_apps;
        Intent start_intent = new Intent(context, V2rayVPNService.class);
        start_intent.putExtra("ACTION", FLAG_VPN_START);
        start_intent.putExtra("V2RAY_CONFIG", config);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            context.startForegroundService(start_intent);
        }

        else
            context.startService(start_intent);
    }

    public static void StopV2ray(final Context context) {
        BLOCKED_APPS = null;
        Intent stop_intent = new Intent(context, V2rayVPNService.class);
        stop_intent.putExtra("ACTION", FLAG_VPN_STOP);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O)
            context.startForegroundService(stop_intent);
        else
            context.startService(stop_intent);
    }
    public static String getServerDelay() {
        Long server_delay = V2rayCore.getV2rayDelay();
        if (server_delay == -1) {
            return "0";
        }
        return String.valueOf(server_delay);
    }
    public static String getConfigDelay(String config) {
        Long config_delay = V2rayCore.getRealPing(config);
        return String.valueOf(config_delay);
    }

    public static boolean isV2raySocketRunning() {
        return V2rayCore.isV2rayRunning();
    }

}
