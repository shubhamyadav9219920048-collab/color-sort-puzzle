import { UserProgress, LevelProgress, Achievement } from '../types';
import { getDifficultyForLevel } from './levelGenerator';
import { ACHIEVEMENTS } from './achievements';
import {
  getActiveEventCoinMultiplier,
  addEventTokensOnLevelComplete,
  getCurrentActiveEvent,
} from './events';

export { ACHIEVEMENTS };

const STORAGE_KEY = 'color_sort_puzzle_save_v1';

export const INITIAL_PROGRESS: UserProgress = {
  coins: 150, // Welcome starter coins
  currentLevel: 1,
  levels: {
    1: { levelId: 1, completed: false, stars: 0, bestMoves: null },
  },
  unlockedTubeSkins: ['cyber_glass'],
  activeTubeSkin: 'cyber_glass',
  unlockedThemes: ['forest'],
  activeTheme: 'forest',
  soundEnabled: true,
  hapticsEnabled: true,
  musicEnabled: true,
  musicVolume: 0.8,
  soundVolume: 0.9,
  vibrationEnabled: true,
  darkMode: true,
  language: 'en',
  cloudSaveEnabled: true,
  graphicsQuality: 'high',
  account: {
    isSignedIn: false,
    displayName: 'Guest Player',
    email: '',
    provider: 'guest',
    lastSyncedAt: new Date().toISOString(),
  },
  freeUndos: 2,
  freeHints: 1,
  freeExtraTubes: 1,
  freeSkips: 1,
  lastDailyClaimDate: null,
  lastLuckySpinDate: null,
  dailyStreak: 0,
  dailyChallenge: {
    lastCompletedDate: null,
    currentStreak: 0,
    totalCompleted: 0,
    bestStreak: 0,
  },
  stats: {
    levelsCompleted: 0,
    totalPours: 0,
    totalCoinsEarned: 150,
    perfectLevels: 0,
    boostersUsed: 0,
    totalPlayTimeSeconds: 0,
    easyCompleted: 0,
    mediumCompleted: 0,
    hardCompleted: 0,
    expertCompleted: 0,
  },
  favorites: [
    {
      id: 'mode-classic',
      type: 'mode',
      title: '500 Level Campaign',
      category: 'Game Modes',
      link: '/play',
      addedAt: new Date().toISOString(),
      iconName: 'Gamepad2',
    },
    {
      id: 'mode-daily',
      type: 'mode',
      title: 'Daily Challenge',
      category: 'Game Modes',
      link: '/play',
      addedAt: new Date().toISOString(),
      iconName: 'Calendar',
    },
  ],
  recentlyPlayed: [
    {
      id: 'recent-level-1',
      type: 'level',
      title: 'Level 1 - Starter Pour',
      subtitle: 'Chapter 1: Beginner Glass',
      timestamp: new Date().toISOString(),
      stars: 3,
      moves: 4,
      completed: true,
      levelId: 1,
    },
  ],
  claimedAchievements: [],
};

export function loadUserProgress(): UserProgress {
  if (typeof window === 'undefined') return INITIAL_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PROGRESS;
    const parsed = JSON.parse(raw);

    // Map old theme IDs if present
    let activeTheme = parsed.activeTheme || 'forest';
    if (activeTheme === 'neon_lab') activeTheme = 'forest';

    let unlockedThemes = Array.isArray(parsed.unlockedThemes) ? parsed.unlockedThemes : ['forest'];
    unlockedThemes = unlockedThemes.map((t: string) => (t === 'neon_lab' ? 'forest' : t));
    if (!unlockedThemes.includes('forest')) unlockedThemes.push('forest');

    return {
      ...INITIAL_PROGRESS,
      ...parsed,
      activeTheme,
      unlockedThemes,
      favorites: Array.isArray(parsed.favorites) ? parsed.favorites : INITIAL_PROGRESS.favorites,
      recentlyPlayed: Array.isArray(parsed.recentlyPlayed) ? parsed.recentlyPlayed : INITIAL_PROGRESS.recentlyPlayed,
      dailyChallenge: {
        ...INITIAL_PROGRESS.dailyChallenge,
        ...(parsed.dailyChallenge || {}),
      },
      stats: {
        ...INITIAL_PROGRESS.stats,
        ...(parsed.stats || {}),
      },
    };
  } catch (err) {
    console.error('Failed to load user progress:', err);
    return INITIAL_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save user progress:', err);
  }
}

export function saveLevelCompletion(
  currentProgress: UserProgress,
  levelId: number,
  movesCount: number,
  parMoves: number,
  usedUndo: boolean = false
): { updatedProgress: UserProgress; coinsEarned: number; starsEarned: number } {
  // Calculate stars
  let starsEarned = 1;
  if (movesCount <= parMoves) starsEarned = 3;
  else if (movesCount <= parMoves * 1.4) starsEarned = 2;

  // Calculate coin reward
  let coinsEarned = 50; // Base win reward
  if (starsEarned === 3) coinsEarned += 25; // 3-star bonus
  if (starsEarned === 2) coinsEarned += 10;

  const difficulty = getDifficultyForLevel(levelId);

  const prevLevelData: LevelProgress = currentProgress.levels[levelId] || {
    levelId,
    completed: false,
    stars: 0,
    bestMoves: null,
  };

  const isFirstCompletion = !prevLevelData.completed;
  const isBetterStars = starsEarned > prevLevelData.stars;

  const newStars = Math.max(prevLevelData.stars, starsEarned);
  const newBestMoves =
    prevLevelData.bestMoves === null
      ? movesCount
      : Math.min(prevLevelData.bestMoves, movesCount);

  // If already completed and didn't improve, give minor re-play coin reward (15 coins)
  if (!isFirstCompletion && !isBetterStars) {
    coinsEarned = 15;
  }

  // Apply Weekly Event Coin Multiplier
  const eventMultiplier = getActiveEventCoinMultiplier(currentProgress);
  coinsEarned = Math.round(coinsEarned * eventMultiplier);

  // Bonus XP from Active Weekly Event
  const activeEvent = getCurrentActiveEvent(currentProgress);
  const bonusXP = activeEvent.bonusXPPerLevel || 50;
  const xpEarned = 100 + bonusXP;
  const newPlayerXP = (currentProgress.playerXP || 0) + xpEarned;

  const newLevels = {
    ...currentProgress.levels,
    [levelId]: {
      levelId,
      completed: true,
      stars: newStars,
      bestMoves: newBestMoves,
    },
  };

  // Next level unlocking up to 500
  const nextLevelId = Math.min(500, Math.max(currentProgress.currentLevel, levelId + 1));
  if (!newLevels[nextLevelId]) {
    newLevels[nextLevelId] = {
      levelId: nextLevelId,
      completed: false,
      stars: 0,
      bestMoves: null,
    };
  }

  const easyAdd = isFirstCompletion && difficulty === 'Easy' ? 1 : 0;
  const mediumAdd = isFirstCompletion && difficulty === 'Medium' ? 1 : 0;
  const hardAdd = isFirstCompletion && difficulty === 'Hard' ? 1 : 0;
  const expertAdd = isFirstCompletion && difficulty === 'Expert' ? 1 : 0;

  const baseUpdatedProgress: UserProgress = {
    ...currentProgress,
    coins: currentProgress.coins + coinsEarned,
    playerXP: newPlayerXP,
    currentLevel: nextLevelId,
    levels: newLevels,
    stats: {
      ...currentProgress.stats,
      levelsCompleted: isFirstCompletion
        ? currentProgress.stats.levelsCompleted + 1
        : currentProgress.stats.levelsCompleted,
      totalCoinsEarned: currentProgress.stats.totalCoinsEarned + coinsEarned,
      perfectLevels:
        starsEarned === 3 && prevLevelData.stars < 3
          ? currentProgress.stats.perfectLevels + 1
          : currentProgress.stats.perfectLevels,
      easyCompleted: (currentProgress.stats.easyCompleted || 0) + easyAdd,
      mediumCompleted: (currentProgress.stats.mediumCompleted || 0) + mediumAdd,
      hardCompleted: (currentProgress.stats.hardCompleted || 0) + hardAdd,
      expertCompleted: (currentProgress.stats.expertCompleted || 0) + expertAdd,
      noUndoLevelCompletions: (!usedUndo)
        ? (currentProgress.stats.noUndoLevelCompletions || 0) + 1
        : (currentProgress.stats.noUndoLevelCompletions || 0),
    },
  };

  // Award event tokens for level completion
  const { updatedProgress } = addEventTokensOnLevelComplete(
    baseUpdatedProgress,
    starsEarned === 3
  );

  saveUserProgress(updatedProgress);

  return {
    updatedProgress,
    coinsEarned,
    starsEarned,
  };
}

export function saveDailyChallengeCompletion(
  currentProgress: UserProgress,
  dateStr: string
): { updatedProgress: UserProgress; coinsEarned: number } {
  const coinsEarned = 500;
  const prevDaily = currentProgress.dailyChallenge || {
    lastCompletedDate: null,
    currentStreak: 0,
    totalCompleted: 0,
    bestStreak: 0,
    completedDates: [],
  };

  const isAlreadyCompleted = prevDaily.lastCompletedDate === dateStr;
  if (isAlreadyCompleted) {
    return { updatedProgress: currentProgress, coinsEarned: 0 };
  }

  const newStreak = prevDaily.currentStreak + 1;
  const newBestStreak = Math.max(prevDaily.bestStreak, newStreak);
  const prevCompletedDates = prevDaily.completedDates || [];
  const newCompletedDates = prevCompletedDates.includes(dateStr)
    ? prevCompletedDates
    : [...prevCompletedDates, dateStr];

  const updatedProgress: UserProgress = {
    ...currentProgress,
    coins: currentProgress.coins + coinsEarned,
    freeHints: (currentProgress.freeHints || 0) + 1,
    freeUndos: (currentProgress.freeUndos || 0) + 2,
    dailyChallenge: {
      lastCompletedDate: dateStr,
      currentStreak: newStreak,
      totalCompleted: prevDaily.totalCompleted + 1,
      bestStreak: newBestStreak,
      completedDates: newCompletedDates,
    },
    stats: {
      ...currentProgress.stats,
      totalCoinsEarned: currentProgress.stats.totalCoinsEarned + coinsEarned,
    },
  };

  saveUserProgress(updatedProgress);

  return {
    updatedProgress,
    coinsEarned,
  };
}

export function resetUserProgress(): UserProgress {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
  return INITIAL_PROGRESS;
}

export function toggleFavoriteItem(
  currentProgress: UserProgress,
  item: { id: string; type: 'mode' | 'level' | 'article'; title: string; category?: string; link: string; iconName?: string }
): { updatedProgress: UserProgress; isFavorited: boolean } {
  const currentFavorites = currentProgress.favorites || [];
  const exists = currentFavorites.some((f) => f.id === item.id);

  let newFavorites;
  if (exists) {
    newFavorites = currentFavorites.filter((f) => f.id !== item.id);
  } else {
    newFavorites = [
      {
        ...item,
        addedAt: new Date().toISOString(),
      },
      ...currentFavorites,
    ];
  }

  const updatedProgress: UserProgress = {
    ...currentProgress,
    favorites: newFavorites,
  };

  saveUserProgress(updatedProgress);
  return { updatedProgress, isFavorited: !exists };
}

export function isItemFavorited(progress: UserProgress, itemId: string): boolean {
  return (progress.favorites || []).some((f) => f.id === itemId);
}

export function recordRecentlyPlayed(
  currentProgress: UserProgress,
  item: { id: string; type: 'level' | 'daily' | 'speedrun' | 'zen'; title: string; subtitle?: string; stars?: number; moves?: number; completed: boolean; levelId?: number }
): UserProgress {
  const currentRecents = currentProgress.recentlyPlayed || [];
  const filtered = currentRecents.filter((r) => r.id !== item.id);
  const newRecents = [
    {
      ...item,
      timestamp: new Date().toISOString(),
    },
    ...filtered,
  ].slice(0, 12); // Keep last 12

  const updatedProgress: UserProgress = {
    ...currentProgress,
    recentlyPlayed: newRecents,
  };

  saveUserProgress(updatedProgress);
  return updatedProgress;
}

export function toggleThemeMode(currentProgress: UserProgress): { updatedProgress: UserProgress; isDark: boolean } {
  const newDarkMode = !currentProgress.darkMode;
  const updatedProgress: UserProgress = {
    ...currentProgress,
    darkMode: newDarkMode,
  };

  saveUserProgress(updatedProgress);
  if (typeof document !== 'undefined') {
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
  return { updatedProgress, isDark: newDarkMode };
}

