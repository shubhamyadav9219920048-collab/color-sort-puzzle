export interface AdMobUnitConfig {
  appOpenId: string;
  bannerId: string;
  interstitialId: string;
  rewardedId: string;
  testMode: boolean;
}

// Official AdMob Production & Test Ad Unit IDs
export const DEFAULT_ADMOB_CONFIG: AdMobUnitConfig = {
  appOpenId: 'ca-app-pub-3940256099942544/3419835294',
  bannerId: 'ca-app-pub-3940256099942544/6300978111',
  interstitialId: 'ca-app-pub-3940256099942544/1033173712',
  rewardedId: 'ca-app-pub-3940256099942544/5224354917',
  testMode: false,
};

class AdMobService {
  private config: AdMobUnitConfig = { ...DEFAULT_ADMOB_CONFIG };
  private levelsCompletedSinceLastInterstitial: number = 0;
  private appOpenAdShown: boolean = false;
  private isBannerVisible: boolean = true;
  private isAdLoading: boolean = false;

  constructor() {
    this.loadSavedConfig();
  }

  private loadSavedConfig() {
    try {
      const saved = localStorage.getItem('admob_config');
      if (saved) {
        this.config = { ...DEFAULT_ADMOB_CONFIG, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to load AdMob config', e);
    }
  }

  public getConfig(): AdMobUnitConfig {
    return { ...this.config };
  }

  public updateConfig(newConfig: Partial<AdMobUnitConfig>) {
    this.config = { ...this.config, ...newConfig };
    try {
      localStorage.setItem('admob_config', JSON.stringify(this.config));
    } catch (e) {
      console.error('Failed to save AdMob config', e);
    }
  }

  /**
   * Initializes AdMob SDK for Web / Native Bridge.
   */
  public async initialize(): Promise<boolean> {
    this.isAdLoading = true;
    return new Promise((resolve) => {
      // Simulate fast background ad preloading (100-300ms)
      setTimeout(() => {
        this.isAdLoading = false;
        resolve(true);
      }, 250);
    });
  }

  public hasAppOpenAdBeenShown(): boolean {
    return this.appOpenAdShown;
  }

  public markAppOpenAdShown() {
    this.appOpenAdShown = true;
  }

  /**
   * Called on level win. Returns true if interstitial should show (every 3 levels).
   */
  public recordLevelCompleted(): boolean {
    this.levelsCompletedSinceLastInterstitial += 1;
    if (this.levelsCompletedSinceLastInterstitial >= 3) {
      this.levelsCompletedSinceLastInterstitial = 0;
      return true;
    }
    return false;
  }

  public setBannerVisible(visible: boolean) {
    this.isBannerVisible = visible;
  }

  public getIsBannerVisible(): boolean {
    return this.isBannerVisible;
  }
}

export const admobService = new AdMobService();
