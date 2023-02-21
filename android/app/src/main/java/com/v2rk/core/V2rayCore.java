package com.v2rk.core;


import android.content.Context;
import android.os.Build;
import android.util.Log;

import com.v2rk.services.V2rayVPNService;

import libv2ray.Libv2ray;
import libv2ray.V2RayPoint;
import libv2ray.V2RayVPNServiceSupportsSet;

public class V2rayCore {
    public static V2rayVPNService fbProtectListener = null;
    private static final V2RayPoint v2RayPoint = Libv2ray.newV2RayPoint(new V2RayVPNServiceSupportsSet() {
        @Override
        public long onEmitStatus(long l, String s) {
            return 0;
        }

        @Override
        public long prepare() {
            return 0;
        }

        @Override
        public boolean protect(long l) {
            if (fbProtectListener != null)
                return fbProtectListener.onProtect((int) l);
            return true;
        }

        @Override
        public long setup(String s) {
            return 0;
        }

        @Override
        public long shutdown() {
            return 0;
        }
    }, Build.VERSION.SDK_INT >= Build.VERSION_CODES.N_MR1);

    public static boolean isV2rayRunning() {
        if (v2RayPoint == null) {
            return false;
        }
        return v2RayPoint.getIsRunning();
    }

    public static Long getV2rayDelay() {
        if (isV2rayRunning()) {
            try {
                return v2RayPoint.measureDelay();
            } catch (Exception e) {
                return -1L;
            }
        }
        return -1L;
    }
    public static Long getRealPing(String config) {
        try {
            return Libv2ray.measureOutboundDelay(config);
        } catch ( Exception e) {
            return -1L;
        }
    }


    public static boolean start(final Context context, String config)  {
         try {
             v2RayPoint.setConfigureFileContent(config);
            v2RayPoint.setDomainName("103.178.234.162:80");
            v2RayPoint.runLoop(false);
        } catch (Exception e) {
            Log.e("V2RAY_CORE_START", "FAILED=>", e);
            return false;
        }
        return true;
    }

    public static void stop() {
        try {
            v2RayPoint.stopLoop();
        } catch (Exception e) {
            Log.e("V2RAY_CORE_STOP", "FAILED=>", e);
        }
    }


}
