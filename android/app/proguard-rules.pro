# ProGuard / R8 rules for Color Sort 3D Android Release

# Keep Capacitor Web Bridge
-keep class com.getcapacitor.** { *; }
-keep interface com.getcapacitor.** { *; }

# Keep Google Mobile Ads (AdMob)
-keep class com.google.android.gms.ads.** { *; }
-dontwarn com.google.android.gms.ads.**

# Keep Google Play Games Services
-keep class com.google.android.gms.games.** { *; }
-dontwarn com.google.android.gms.games.**

# JavaScript Interface
-keepattributes *Annotation*,Signature,InnerClasses,EnclosingMethod
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
