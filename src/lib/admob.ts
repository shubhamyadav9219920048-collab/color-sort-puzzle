import { Capacitor } from '@capacitor/core';
import { AdMob, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';

export interface AdMobUnitConfig {
  appOpenId: string;
  bannerId: string;
  interstitialId: string;
  rewardedId: string;
  testMode: boolean;
}

// Official Google AdMob Test Ad Unit IDs for Android
export const ADMOB_TEST_UNITS = {
  APP_OPEN: 'ca-app-pub-3940256099942544/9257390723',
  BANNER: 'ca-app-pub-3940256099942544/6300978111',
  INTERSTITIAL: 'ca-app-pub-3940256099942544/1033173712',
  REWARDED: 'ca-app-pub-3940256099942544/5224354917',
} as const;

export const DEFAULT_ADMOB_CONFIG: AdMobUnitConfig = {
  appOpenId: ADMOB_TEST_UNITS.APP_OPEN,
  bannerId: ADMOB_TEST_UNITS.BANNER,
  interstitialId: ADMOB_TEST_UNITS.INTERSTITIAL,
  rewardedId: ADMOB_TEST_UNITS.REWARDED,
  testMode: true,
};

class AdMobService {
  private config: AdMobUnitConfig = { ...DEFAULT_ADMOB_CONFIG };
  private completedLevelsCount: number = 0;
  private appOpenAdShown: boolean = false;
  private isBannerVisible: boolean = true;
  private isInitialized: boolean = false;

  constructor() {
    this.loadSavedConfig();
    this.initNativeAdMob();
  }

  private loadSavedConfig() {
    try {
      const saved = localStorage.getItem('admob_config');
      if (saved) {
        this.config = { ...DEFAULT_ADMOB_CONFIG, ...JSON.parse(saved) };
      }
    } catch (e) {}
  }

  private async initNativeAdMob() {
    if (Capacitor.isNativePlatform() && !this.isInitialized) {
      try {
        await AdMob.initialize({
          initializeForTesting: this.config.testMode,
        });
        this.isInitialized = true;
        console.log('[AdMob Native] Initialized successfully');
      } catch (e) {
        console.warn('[AdMob Native] Init warning:', e);
      }
    }
  }

  public getConfig(): AdMobUnitConfig {
    return { ...this.config };
  }

  public isNative(): boolean {
    return Capacitor.isNativePlatform();
  }

  public hasAppOpenAdBeenShown(): boolean {
    return this.appOpenAdShown;
  }

  public markAppOpenAdShown() {
    this.appOpenAdShown = true;
  }

  /**
   * Called on level win. Returns true if interstitial should show (every 5 levels).
   */
  public recordLevelCompleted(): boolean {
    this.completedLevelsCount += 1;
    if (this.completedLevelsCount >= 5) {
      this.completedLevelsCount = 0;
      return true;
    }
    return false;
  }

  public setBannerVisible(visible: boolean) {
    this.isBannerVisible = visible;
    if (Capacitor.isNativePlatform()) {
      if (visible) {
        this.showNativeBanner();
      } else {
        this.hideNativeBanner();
      }
    }
  }

  public async showNativeBanner(): Promise<void> {
    if (!Capacitor.isNativePlatform()) return;
    try {
      await AdMob.showBanner({
        adId: this.config.bannerId,
        adSize: BannerAdSize.BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        isTesting: this.config.testMode,
      });
    } catch (err) {
      console.warn('[AdMob Native] Show banner error:', err);
    }
  }

  public async hideNativeBanner(): Promise<void> {
    if (!Capacitor.isNativePlatform()) return;
    try {
      await AdMob.hideBanner();
    } catch (err) {
      console.warn('[AdMob Native] Hide banner error:', err);
    }
  }

  public async showNativeInterstitial(): Promise<void> {
    if (!Capacitor.isNativePlatform()) return;
    try {
      await AdMob.prepareInterstitial({
        adId: this.config.interstitialId,
        isTesting: this.config.testMode,
      });
      await AdMob.showInterstitial();
    } catch (err) {
      console.warn('[AdMob Native] Interstitial error:', err);
    }
  }

  public async showNativeRewarded(onRewarded: () => void): Promise<void> {
    if (!Capacitor.isNativePlatform()) {
      onRewarded();
      return;
    }
    try {
      await AdMob.prepareRewardVideoAd({
        adId: this.config.rewardedId,
        isTesting: this.config.testMode,
      });
      await AdMob.showRewardVideoAd();
      onRewarded();
    } catch (err) {
      console.warn('[AdMob Native] Rewarded error, completing reward:', err);
      onRewarded();
    }
  }

  public getIsBannerVisible(): boolean {
    return this.isBannerVisible;
  }
}

export const admobService = new AdMobService();
