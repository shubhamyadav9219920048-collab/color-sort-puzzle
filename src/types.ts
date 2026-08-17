export type LiquidColorId = number;

export type DifficultyTier = 'Easy' | 'Medium' | 'Hard' | 'Expert';

export interface ColorDefinition {
  id: LiquidColorId;
  name: string;
  hex: string;
  lightHex: string;
  glow: string;
  gradient: [string, string];
}

export interface LevelConfig {
  id: number; // 1 to 500
  chapter: number;
  chapterName: string;
  difficulty: DifficultyTier;
  tubeCount: number;
  emptyTubes: number;
  colorCount: number;
  initialTubes: LiquidColorId[][]; // Array of tubes, each tube is array of colors bottom-to-top (length <= 4)
  parMoves: number; // Benchmark for 3 stars
  isDailyChallenge?: boolean;
}

export interface LevelProgress {
  levelId: number;
  completed: boolean;
  stars: number; // 0 to 3
  bestMoves: number | null;
}

export interface DailyChallengeState {
  lastCompletedDate: string | null;
  currentStreak: number;
  totalCompleted: number;
  bestStreak: number;
  completedDates?: string[];
}

export interface UserAccount {
  isSignedIn: boolean;
  email?: string;
  displayName?: string;
  photoUrl?: string;
  lastSyncedAt?: string;
  provider?: 'google' | 'guest';
}

export interface FavoriteGameItem {
  id: string;
  type: 'mode' | 'level' | 'article';
  title: string;
  category?: string;
  link: string;
  addedAt: string;
  iconName?: string;
}

export interface RecentlyPlayedItem {
  id: string;
  type: 'level' | 'daily' | 'speedrun' | 'zen';
  title: string;
  subtitle?: string;
  timestamp: string;
  stars?: number;
  moves?: number;
  completed: boolean;
  levelId?: number;
}

export interface UserProgress {
  coins: number;
  currentLevel: number;
  levels: Record<number, LevelProgress>;
  unlockedTubeSkins: string[];
  activeTubeSkin: string;
  unlockedThemes: string[];
  activeTheme: string;
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  musicEnabled?: boolean;
  musicVolume?: number;
  soundVolume?: number;
  vibrationEnabled?: boolean;
  darkMode?: boolean;
  language?: string;
  cloudSaveEnabled?: boolean;
  graphicsQuality?: 'low' | 'medium' | 'high';
  account?: UserAccount;
  freeUndos: number;
  freeHints: number;
  freeExtraTubes: number;
  freeSkips: number;
  lastDailyClaimDate: string | null;
  lastLuckySpinDate?: string | null;
  dailyStreak: number;
  dailyChallenge: DailyChallengeState;
  favorites?: FavoriteGameItem[];
  recentlyPlayed?: RecentlyPlayedItem[];
  stats: {
    levelsCompleted: number;
    totalPours: number;
    totalCoinsEarned: number;
    perfectLevels: number;
    boostersUsed: number;
    totalPlayTimeSeconds: number;
    easyCompleted: number;
    mediumCompleted: number;
    hardCompleted: number;
    expertCompleted: number;
    hintsUsed?: number;
    undosUsed?: number;
    noUndoLevelCompletions?: number;
    luckySpinsCount?: number;
    extraTubesUsed?: number;
    skipsUsed?: number;
  };
  playerXP?: number;
  selectedAvatarId?: string;
  countryCode?: string;
  eventProgress?: {
    claimedRewardIds: string[];
    eventTokensCount: number;
    selectedEventId?: string;
  };
  claimedAchievements: string[];
  claimedDailyDays?: number[];
  dailyMissions?: DailyMissionsProgress;
}

export interface DailyRewardDay {
  day: number;
  label: string;
  coins: number;
  hints: number;
  tubes: number;
  undos: number;
  skips: number;
  isBigger?: boolean;
  isUltimate?: boolean;
}

export interface DailyMissionsProgress {
  date: string;
  levelsCompleted: number;
  adsWatched: number;
  hintsUsed: number;
  coinsEarned: number;
  claimedMissionIds: string[];
  claimedAllBonus?: boolean;
}

export interface TubeSkin {
  id: string;
  name: string;
  price: number;
  description: string;
  styleClass: string;
  previewGradient: string;
}

export interface GameTheme {
  id: string;
  name: string;
  price: number;
  description: string;
  bgGradient: string;
  cardBg: string;
  accentGlow: string;
  buttonStyle: {
    primary: string;
    secondary: string;
    accent: string;
    border: string;
  };
  tubeStyleClass: string;
  musicKey: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  reward: number;
  iconName: string;
  isUnlocked: (progress: UserProgress) => boolean;
}

export interface PourStep {
  fromIndex: number;
  toIndex: number;
  color: LiquidColorId;
  count: number;
  previousTubesState: LiquidColorId[][];
}
