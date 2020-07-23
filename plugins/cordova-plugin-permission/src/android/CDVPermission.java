package com.adrianodigiovanni.permission;

import android.content.pm.PackageManager;
import android.util.SparseArray;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;

public class CDVPermission extends CordovaPlugin {
    private int lastRequestCode = -1;
    private SparseArray<CallbackContext> mCallbackContexts = new SparseArray<>();

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("has")) {
            cordova.getThreadPool().execute(() -> {
                try {
                    JSONArray permissions = args.getJSONArray(0);
                    JSONObject message = new JSONObject();
                    int n = permissions.length();
                    for (int i = 0; i < n; i++) {
                        String permission = permissions.getString(i);
                        message.put(permission, cordova.hasPermission(permission));
                    }
                    callbackContext.success(message);
                } catch (Exception e) {
                    callbackContext.error(e.getMessage());
                }
            });
            return true;
        }

        if (action.equals("request")) {
            mCallbackContexts.put(++lastRequestCode, callbackContext);
            cordova.getThreadPool().execute(() -> {
                try {
                    String[] permissions = toArray(args.getJSONArray(0));
                    cordova.requestPermissions(this, lastRequestCode, permissions);
                } catch (Exception e) {
                    callbackContext.error(e.getMessage());
                }
            });
            return true;
        }

        return false;
    }

    @Override
    public void onRequestPermissionResult(int requestCode, String[] permissions, int[] grantResults) throws JSONException {
        CallbackContext callbackContext = mCallbackContexts.get(requestCode);
        mCallbackContexts.delete(requestCode);
        cordova.getThreadPool().execute(() -> {
            try {
                JSONObject message = new JSONObject();
                int n = permissions.length;
                for (int i = 0; i < n; i++) {
                    message.put(permissions[i], grantResults[i] == PackageManager.PERMISSION_GRANTED);
                }
                callbackContext.success(message);
            } catch (Exception e) {
                callbackContext.error(e.getMessage());
            }
        });
    }

    private String[] toArray(JSONArray permissions) {
        int n = permissions.length();
        String[] array = new String[n];
        for (int i = 0; i < n; i++) {
            array[i] = permissions.optString(i);
        }
        return array;
    }
}
