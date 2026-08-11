import { UserProgress } from '../types';

export interface PlayerLevelInfo {
  level: number;
  title: string;
  totalXP: number;
  xpInCurrentLevel: number;
  xpForNextLevel: number;
  progressPercent: number;
  rankBadgeColor: string;
}

const PLAYER_TITLES = [
  { maxLevel: 2, title: 'Apprentice Pourer', color: 'text-amber-400 border-amber-500/40 bg-amber-500/10' },
  { maxLevel: 5, title: 'Novice Alchemist', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10' },
  { maxLevel: 10, title: 'Flask Operator', color: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10' },
  { maxLevel: 18, title: 'Fluid Tactician', color: 'text-blue-400 border-blue-500/40 bg-blue-500/10' },
  { maxLevel: 28, title: 'Spectrum Chemist', color: 'text-indigo-400 border-indigo-500/40 bg-indigo-500/10' },
  { maxLevel: 40, title: 'Master Transmuter', color: 'text-purple-400 border-purple-500/40 bg-purple-500/10' },
  { maxLevel: 60, title: 'Grand Alchemist', color: 'text-fuchsia-400 border-fuchsia-500/40 bg-fuchsia-500/10' },
  { maxLevel: 80, title: 'Prism Sovereign', color: 'text-yellow-300 border-yellow-400/50 bg-yellow-500/20' },
  { maxLevel: 999, title: 'Cosmic Elemental Lord', color: 'text-rose-300 border-rose-400/50 bg-rose-500/20' },
];

/**
 * Calculates total XP from progress object if playerXP is not explicitly stored
 */
export function calculatePlayerXP(progress: UserProgress): number {
  if (progress.playerXP !== undefined && progress.playerXP > 0) {
    return progress.playerXP;
  }
  const levels = progress.stats?.levelsCompleted || 0;
  const perfect = progress.stats?.perfectLevels || 0;
  const pours = progress.stats?.totalPours || 0;
  const daily = progress.dailyChallenge?.totalCompleted || 0;
  const hints = progress.stats?.hintsUsed || 0;

  return levels * 100 + perfect * 50 + daily * 200 + pours * 1 + hints * 5;
}

/**
 * Cumulative XP threshold needed to reach Level L (1-indexed).
 * Level 1 = 0
 * Level 2 = 200
 * Level 3 = 500
 * Level 4 = 900
 * Level L = 50 * L * (L - 1) + 150 * (L - 1)
 */
function getXPThresholdForLevel(level: number): number {
  if (level <= 1) return 0;
  // Quadratic curve: level 2=200, 3=500, 4=900, 5=1400, 6=2000, 10=5400...
  return 50 * (level - 1) * (level + 2);
}

/**
 * Computes full player level details from XP
 */
export function getPlayerLevelInfo(totalXP: number): PlayerLevelInfo {
  let level = 1;
  while (getXPThresholdForLevel(level + 1) <= totalXP) {
    level++;
  }

  const currentLevelThreshold = getXPThresholdForLevel(level);
  const nextLevelThreshold = getXPThresholdForLevel(level + 1);

  const xpInCurrentLevel = totalXP - currentLevelThreshold;
  const xpForNextLevel = nextLevelThreshold - currentLevelThreshold;
  const progressPercent = Math.min(100, Math.max(0, (xpInCurrentLevel / xpForNextLevel) * 100));

  const titleEntry =
    PLAYER_TITLES.find((t) => level <= t.maxLevel) || PLAYER_TITLES[PLAYER_TITLES.length - 1];

  return {
    level,
    title: titleEntry.title,
    totalXP,
    xpInCurrentLevel,
    xpForNextLevel,
    progressPercent,
    rankBadgeColor: titleEntry.color,
  };
}

/**
 * Helper to format seconds into clean human-readable play time
 */
export function formatPlayTime(seconds: number): string {
  if (!seconds || seconds <= 0) return '0 mins';

  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  if (mins > 0) {
    return `${mins}m ${secs}s`;
  }
  return `${secs}s`;
}
