package com.ptc.realityeditor;

import android.util.Log;

import com.webileapps.fragments.VuforiaFragment;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class RealityEditorPlugin extends CordovaPlugin {
    static final String LOGTAG = "RealityEditorPlugin";

    VuforiaFragment fragment;

    @Override
    protected void pluginInitialize() {
        super.pluginInitialize();

        fragment = (VuforiaFragment) cordova.getActivity().getFragmentManager().findFragmentByTag(VuforiaFragment.TAG);
        Log.d(LOGTAG, "Plugin initialized.");
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {

        if(action.equals("getDeviceReady")) {
            getDeviceReady(callbackContext);
        }
        else if(action.equals("getVuforiaReady")) {
            getVuforiaReady(callbackContext);
        }
        else if(action.equals("addNewMarker")) {
            String markerName = args.getString(0);
            addNewMarker(callbackContext, markerName);
        }
        else if(action.equals("getProjectionMatrix")) {
            getProjectionMatrix(callbackContext);
        }
        else if(action.equals("getMatrixStream")) {
            getMatrixStream(callbackContext);
        }
        else if(action.equals("getCameraMatrixStream")) {
            getCameraMatrixStream(callbackContext);
        }
        else if(action.equals("getGroundPlaneMatrixStream")) {
            getGroundPlaneMatrixStream(callbackContext);
        }
        else if(action.equals("getScreenshot")) {
            getScreenshot(callbackContext, args.getString(0));
        }
        else if(action.equals("setPause")) {
            setPause(callbackContext);
        }
        else if(action.equals("setResume")) {
            setResume(callbackContext);
        }
        else if(action.equals("getUDPMessages")) {
            getUDPMessages(callbackContext);
        }
        else if(action.equals("sendUDPMessage")) {
            sendUDPMessage(callbackContext, args.getString(0));
        }
        else if(action.equals("getFileExists")) {
            getFileExists(callbackContext, args.getString(0));
        }
        else if(action.equals("downloadFile")) {
            downloadFile(callbackContext, args.getString(0));
        }
        else if(action.equals("getFilesExist")) {
            getFilesExist(callbackContext, jsArrayStringToArrayList(args));
        }
        else if(action.equals("getChecksum")) {
            getChecksum(callbackContext, jsArrayStringToArrayList(args));
        }
        else if(action.equals("setStorage")) {
            setStorage(callbackContext, args.getString(0), args.getString(1));
        }
        else if(action.equals("getStorage")) {
            getStorage(callbackContext, args.getString(0));
        }
        else if(action.equals("startSpeechRecording")) {
            startSpeechRecording(callbackContext);
        }
        else if(action.equals("stopSpeechRecording")) {
            stopSpeechRecording(callbackContext);
        }
        else if(action.equals("addSpeechListener")) {
            addSpeechListener(callbackContext);
        }
        else if(action.equals("startVideoRecording")) {
            startVideoRecording(callbackContext, args.getString(0), args.getString(1));
        }
        else if(action.equals("stopVideoRecording")) {
            stopVideoRecording(callbackContext, args.getString(0));
        }
        else if(action.equals("tap")) {
            tap(callbackContext);
        }
        else if(action.equals("tryPlacingGroundAnchor")) {
            tryPlacingGroundAnchor(callbackContext, args.getString(0), args.getString(1));
        }
        else if(action.equals("loadNewUI")) {
            loadNewUI(callbackContext, args.getString(0));
        }
        else if(action.equals("clearCache")) {
            clearCache(callbackContext);
        }
        else {
            return false;
        }

        return true;
    }

    private static ArrayList<String> jsArrayStringToArrayList(JSONArray arr) throws JSONException {
        ArrayList<String> out = new ArrayList<String>();
        for (int i = 0; i < arr.length(); i++) {
            out.add(arr.getString(i));
        }
        return out;
    }

    void getDeviceReady(CallbackContext callbackContext) {
    }

    void getVuforiaReady(CallbackContext callbackContext) {
    }

    void addNewMarker(CallbackContext callbackContext, String markerName) {
    }

    void getProjectionMatrix(CallbackContext callbackContext) {
    }

    void getMatrixStream(CallbackContext callbackContext) {
    }

    void getCameraMatrixStream(CallbackContext callbackContext) {
    }

    void getGroundPlaneMatrixStream(CallbackContext callbackContext) {
    }

    void getScreenshot(CallbackContext callbackContext, String size) {
    }

    void setPause(CallbackContext callbackContext) {
        fragment.doStopTrackers();

        PluginResult result = new PluginResult(PluginResult.Status.OK, new JSONObject());
        callbackContext.sendPluginResult(result);
    }

    void setResume(CallbackContext callbackContext) {
        fragment.doStartTrackers();

        PluginResult result = new PluginResult(PluginResult.Status.OK, new JSONObject());
        callbackContext.sendPluginResult(result);
    }

    void getUDPMessages(CallbackContext callbackContext) {
    }

    void sendUDPMessage(CallbackContext callbackContext, String message) {
    }

    void getFileExists(CallbackContext callbackContext, String fileName) {
    }

    void downloadFile(CallbackContext callbackContext, String fileName) {
    }

    void getFilesExist(CallbackContext callbackContext, ArrayList<String> fileNameArray) {
    }

    void getChecksum(CallbackContext callbackContext, ArrayList<String> fileNameArray) {
    }

    void setStorage(CallbackContext callbackContext, String storageID, String message) {
    }

    void getStorage(CallbackContext callbackContext, String storageID) {
    }

    void startSpeechRecording(CallbackContext callbackContext) {
    }

    void stopSpeechRecording(CallbackContext callbackContext) {
    }

    void addSpeechListener(CallbackContext callbackContext) {
    }

    void startVideoRecording(CallbackContext callbackContext, String objectKey, String objectIP) {
    }

    void stopVideoRecording(CallbackContext callbackContext, String videoId) {
    }

    void tap(CallbackContext callbackContext) {
    }

    void tryPlacingGroundAnchor(CallbackContext callbackContext, String normalizedScreenX, String normalizedScreenY) {
    }

    void loadNewUI(CallbackContext callbackContext, String reloadURL) {
    }

    void clearCache(CallbackContext callbackContext) {
    }
}

