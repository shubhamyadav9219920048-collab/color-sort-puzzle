package com.colorsort.puzzle3d;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.initialization.InitializationStatus;
import com.google.android.gms.ads.initialization.OnInitializationCompleteListener;
import com.google.android.gms.games.PlayGamesSdk;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Initialize Google Play Games Services SDK
        try {
            PlayGamesSdk.initialize(this);
        } catch (Exception e) {
            e.printStackTrace();
        }

        // Initialize Google Mobile Ads (AdMob) SDK
        try {
            MobileAds.initialize(this, new OnInitializationCompleteListener() {
                @Override
                public void onInitializationComplete(InitializationStatus initializationStatus) {
                }
            });
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
