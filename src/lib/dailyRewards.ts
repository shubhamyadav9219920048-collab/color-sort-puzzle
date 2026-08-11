import { DailyRewardDay, UserProgress, DailyMissionsProgress } from '../types';

export const DAILY_REWARDS_30: DailyRewardDay[] = [
  { day: 1, label: '100 Coins', coins: 100, hints: 0, tubes: 0, undos: 0, skips: 0 },
  { day: 2, label: '150 Coins', coins: 150, hints: 0, tubes: 0, undos: 0, skips: 0 },
  { day: 3, label: '1 Free Hint', coins: 0, hints: 1, tubes: 0, undos: 0, skips: 0 },
  { day: 4, label: '1 Extra Tube', coins: 0, hints: 0, tubes: 1, undos: 0, skips: 0 },
  { day: 5, label: '300 Coins', coins: 300, hints: 0, tubes: 0, undos: 0, skips: 0 },
  { day: 6, label: '5 Undos + 150c', coins: 150, hints: 0, tubes: 0, undos: 5, skips: 0 },
  { day: 7, label: 'Week 1 Chest', coins: 500, hints: 1, tubes: 1, undos: 0, skips: 1, isBigger: true },
  
  { day: 8, label: '150 Coins', coins: 150, hints: 0, tubes: 0, undos: 0, skips: 0 },
  { day: 9, label: '2 Free Hints', coins: 0, hints: 2, tubes: 0, undos: 0, skips: 0 },
  { day: 10, label: '250 Coins', coins: 250, hints: 0, tubes: 0, undos: 0, skips: 0 },
  { day: 11, label: '1 Extra Tube', coins: 0, hints: 0, tubes: 1, undos: 0, skips: 0 },
  { day: 12, label: '350 Coins', coins: 350, hints: 0, tubes: 0, undos: 0, skips: 0 },
  { day: 13, label: '1 Skip Level', coins: 0, hints: 0, tubes: 0, undos: 0, skips: 1 },
  { day: 14, label: 'Week 2 Chest', coins: 750, hints: 2, tubes: 1, undos: 0, skips: 1, isBigger: true },
  
  { day: 15, label: '200 Coins', coins: 200, hints: 0, tubes: 0, undos: 0, skips: 0 },
  { day: 16, label: '1 Extra Tube', coins: 0, hints: 0, tubes: 1, undos: 0, skips: 0 },
  { day: 17, label: '3 Free Hints', coins: 0, hints: 3, tubes: 0, undos: 0, skips: 0 },
  { day: 18, label: '400 Coins', coins: 400, hints: 0, tubes: 0, undos: 0, skips: 0 },
  { day: 19, label: '5 Free Undos', coins: 0, hints: 0, tubes: 0, undos: 5, skips: 0 },
  { day: 20, label: '2 Extra Tubes', coins: 0, hints: 0, tubes: 2, undos: 0, skips: 0 },
  { day: 21, label: 'Week 3 Vault', coins: 1000, hints: 2, tubes: 2, undos: 0, skips: 1, isBigger: true },
  
  { day: 22, label: '300 Coins', coins: 300, hints: 0, tubes: 0, undos: 0, skips: 0 },
  { day: 23, label: '2 Skip Levels', coins: 0, hints: 0, tubes: 0, undos: 0, skips: 2 },
  { day: 24, label: '500 Coins', coins: 500, hints: 0, tubes: 0, undos: 0, skips: 0 },
  { day: 25, label: '2 Extra Tubes', coins: 0, hints: 0, tubes: 2, undos: 0, skips: 0 },
  { day: 26, label: '3 Hints + 250c', coins: 250, hints: 3, tubes: 0, undos: 0, skips: 0 },
  { day: 27, label: '10 Free Undos', coins: 0, hints: 0, tubes: 0, undos: 10, skips: 0 },
  { day: 28, label: 'Week 4 Trove', coins: 1200, hints: 3, tubes: 2, undos: 0, skips: 2, isBigger: true },
  
  { day: 29, label: '600 Coins', coins: 600, hints: 0, tubes: 1, undos: 0, skips: 0 },
  { day: 30, label: 'Master Chest', coins: 2000, hints: 5, tubes: 3, undos: 10, skips: 3, isBigger: true, isUltimate: true },
];

export interface MissionDef {
  id: string;
  title: string;
  description: string;
  target: number;
  rewardCoins: number;
  rewardItemType?: 'hint' | 'tube' | 'skip' | 'undo';
  rewardItemCount?: number;
}

export const DAILY_MISSIONS_LIST: MissionDef[] = [
  {
    id: 'complete_5_levels',
    title: 'Complete 5 Levels',
    description: 'Solve and finish 5 puzzle levels today',
    target: 5,
    rewardCoins: 250,
    rewardItemType: 'hint',
    rewardItemCount: 1,
  },
  {
    id: 'watch_3_ads',
    title: 'Watch 3 Rewarded Ads',
    description: 'Watch 3 sponsor videos in shop or boosters',
    target: 3,
    rewardCoins: 300,
    rewardItemType: 'tube',
    rewardItemCount: 1,
  },
  {
    id: 'use_2_hints',
    title: 'Use 2 Hints',
    description: 'Use the hint booster 2 times during gameplay',
    target: 2,
    rewardCoins: 150,
    rewardItemType: 'skip',
    rewardItemCount: 1,
  },
  {
    id: 'earn_500_coins',
    title: 'Earn 500 Coins',
    description: 'Collect 500 gold coins from levels or spins',
    target: 500,
    rewardCoins: 400,
    rewardItemType: 'undo',
    rewardItemCount: 5,
  },
];

export function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

export function getInitialDailyMissions(): DailyMissionsProgress {
  return {
    date: getTodayDateString(),
    levelsCompleted: 0,
    adsWatched: 0,
    hintsUsed: 0,
    coinsEarned: 0,
    claimedMissionIds: [],
    claimedAllBonus: false,
  };
}

export function ensureDailyMissions(progress: UserProgress): UserProgress {
  const today = getTodayDateString();
  if (!progress.dailyMissions || progress.dailyMissions.date !== today) {
    return {
      ...progress,
      dailyMissions: getInitialDailyMissions(),
    };
  }
  return progress;
}

export function recordMissionAction(
  progress: UserProgress,
  action: {
    levelsDelta?: number;
    adsDelta?: number;
    hintsDelta?: number;
    coinsDelta?: number;
  }
): UserProgress {
  const updated = ensureDailyMissions(progress);
  const missions = updated.dailyMissions || getInitialDailyMissions();

  const newMissions: DailyMissionsProgress = {
    ...missions,
    levelsCompleted: missions.levelsCompleted + (action.levelsDelta || 0),
    adsWatched: missions.adsWatched + (action.adsDelta || 0),
    hintsUsed: missions.hintsUsed + (action.hintsDelta || 0),
    coinsEarned: missions.coinsEarned + (action.coinsDelta || 0),
  };

  return {
    ...updated,
    dailyMissions: newMissions,
  };
}

export function getTimeUntilNextDaySeconds(): number {
  const now = new Date();
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return Math.max(0, Math.floor((tomorrow.getTime() - now.getTime()) / 1000));
}

export function formatSecondsToCountdown(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, '0')}h : ${m.toString().padStart(2, '0')}m : ${s.toString().padStart(2, '0')}s`;
}
