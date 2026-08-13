# Color Sort 3D - Android Release & Signed AAB Build Guide

This project is configured as a production-ready **Capacitor Android Application** equipped with:
- **Google Mobile Ads (AdMob)** (App Open, Banner, Interstitial, Rewarded Video Ads)
- **Google Play Games Services** (Leaderboards, Achievements, Cloud Save)
- **Bundle & Performance Optimizations** (Code Splitting, Resource Shrinking, ProGuard Rules)

---

## 🚀 Quick Steps to Build Signed Android App Bundle (.aab)

### 1. Build Web Assets
Ensure the web bundle is built inside the `dist` folder:
```bash
npm run build
```

### 2. Open Project in Android Studio
Open the `/android` folder directly in **Android Studio** (or launch via CLI):
```bash
npx cap open android
```

### 3. Generate Signed Release Bundle (AAB)
1. In Android Studio, go to top menu: **Build -> Generate Signed Bundle / APK...**
2. Select **Android App Bundle (.aab)** and click **Next**.
3. Create a new Keystore or select your existing `.jks` keystore file:
   - **Key store path**: e.g., `/your-path/release-key.jks`
   - **Alias**: `colorsort3d`
   - **Passwords**: Set secure passwords.
4. Select Destination Folder (e.g., `android/app/release`).
5. Choose **release** build variant and click **Create**.
6. Android Studio will generate `app-release.aab` ready for submission to the **Google Play Console**.

---

## 📱 Google Services & AdMob Setup

### Google AdMob Production IDs
Replace test unit IDs in `android/app/src/main/res/values/strings.xml` and `capacitor.config.ts` with your official AdMob IDs from https://admob.google.com:

- **App ID**: `ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX`
- **Banner Ad**: `ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX`
- **Interstitial Ad**: `ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX`
- **Rewarded Ad**: `ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX`
- **App Open Ad**: `ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX`

### Google Play Games Services Setup
In `android/app/src/main/res/values/strings.xml`, update the `game_services_project_id`:
```xml
<string name="game_services_project_id">YOUR_12_DIGIT_PLAY_CONSOLE_PROJECT_ID</string>
```

---

## 🔍 Key Configuration Files Included

- `capacitor.config.ts` - Capacitor settings and plugin config.
- `android/app/src/main/AndroidManifest.xml` - App permissions, AdMob & Play Games meta-data.
- `android/app/build.gradle` - Build variant, SDK versions, ProGuard shrinking enabled.
- `android/app/proguard-rules.pro` - Optimization and code shrinking rules.
