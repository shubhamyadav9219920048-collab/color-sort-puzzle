import { UserProgress } from '../types';

export interface EventRewardMilestone {
  id: string;
  tokensRequired: number;
  title: string;
  rewardType: 'coins' | 'hints' | 'freeUndos' | 'xp';
  rewardAmount: number;
  iconName: string;
}

export interface WeeklyEvent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  themeColor: string;
  badgeText: string;
  bannerGradient: string;
  accentBg: string;
  iconName: 'Coins' | 'Sparkles' | 'Flame' | 'Ghost' | 'Snowflake';
  coinMultiplier: number;
  bonusXPPerLevel: number;
  tokenName: string;
  milestones: EventRewardMilestone[];
  isSpecialSeason?: boolean;
}

export const WEEKLY_EVENTS: WeeklyEvent[] = [
  {
    id: 'double_coins',
    title: 'Double Coins Weekend',
    subtitle: '2x Coin Multiplier on all levels!',
    description: 'Earn 2x Coins for every level you clear! Collect Gold Ingots to unlock massive coin bonuses.',
    themeColor: 'from-amber-500 via-yellow-500 to-amber-600',
    badgeText: '2X COINS LIVE',
    bannerGradient: 'from-amber-950/90 via-slate-900 to-yellow-950/80',
    accentBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    iconName: 'Coins',
    coinMultiplier: 2,
    bonusXPPerLevel: 50,
    tokenName: 'Gold Ingots',
    milestones: [
      { id: 'dc_1', tokensRequired: 10, title: 'Gold Pouch', rewardType: 'coins', rewardAmount: 500, iconName: 'Coins' },
      { id: 'dc_2', tokensRequired: 25, title: 'Treasure Chest', rewardType: 'coins', rewardAmount: 1200, iconName: 'Coins' },
      { id: 'dc_3', tokensRequired: 50, title: 'Royal Hoard', rewardType: 'coins', rewardAmount: 3000, iconName: 'Coins' },
    ],
  },
  {
    id: 'rainbow_prism',
    title: 'Rainbow Prism Festival',
    subtitle: 'Spectral Liquid Masteries',
    description: 'Solve colorful tube puzzles to gather Prism Crystals! Unlock rare crystal rewards and extra hints.',
    themeColor: 'from-purple-500 via-fuchsia-500 to-pink-500',
    badgeText: 'FESTIVAL LIVE',
    bannerGradient: 'from-purple-950/90 via-slate-900 to-pink-950/80',
    accentBg: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40',
    iconName: 'Sparkles',
    coinMultiplier: 1.5,
    bonusXPPerLevel: 75,
    tokenName: 'Prism Crystals',
    milestones: [
      { id: 'rp_1', tokensRequired: 15, title: 'Prism Dust', rewardType: 'coins', rewardAmount: 600, iconName: 'Sparkles' },
      { id: 'rp_2', tokensRequired: 35, title: 'Crystal Bundle', rewardType: 'hints', rewardAmount: 5, iconName: 'Lightbulb' },
      { id: 'rp_3', tokensRequired: 70, title: 'Spectral Jackpot', rewardType: 'coins', rewardAmount: 3500, iconName: 'Coins' },
    ],
  },
  {
    id: 'hard_puzzle_week',
    title: 'Hard Puzzle Master Week',
    subtitle: 'Harder Puzzles, Greater Glory',
    description: 'Challenge your mind with hard transmutations! Earn extra XP and Flask Badges for every win.',
    themeColor: 'from-rose-500 via-red-500 to-amber-600',
    badgeText: 'HARD RUSH ACTIVE',
    bannerGradient: 'from-rose-950/90 via-slate-900 to-amber-950/80',
    accentBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    iconName: 'Flame',
    coinMultiplier: 1.75,
    bonusXPPerLevel: 100,
    tokenName: 'Master Badges',
    milestones: [
      { id: 'hp_1', tokensRequired: 12, title: 'Tactician Ring', rewardType: 'freeUndos', rewardAmount: 5, iconName: 'RotateCcw' },
      { id: 'hp_2', tokensRequired: 30, title: 'Sorcerer Chest', rewardType: 'coins', rewardAmount: 1500, iconName: 'Coins' },
      { id: 'hp_3', tokensRequired: 60, title: 'Legendary Alchemist', rewardType: 'coins', rewardAmount: 4000, iconName: 'Crown' },
    ],
  },
  {
    id: 'halloween_spooky',
    title: 'Halloween Spooky Brews',
    subtitle: 'Spooky Potions & Pumpkin Tokens',
    description: 'Brew mystical potions! Collect Glowing Pumpkins on level completions for haunted rewards.',
    themeColor: 'from-orange-500 via-purple-600 to-emerald-600',
    badgeText: 'SPOOKY EVENT',
    bannerGradient: 'from-orange-950/90 via-slate-900 to-purple-950/80',
    accentBg: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    iconName: 'Ghost',
    isSpecialSeason: true,
    coinMultiplier: 2,
    bonusXPPerLevel: 80,
    tokenName: 'Spooky Pumpkins',
    milestones: [
      { id: 'hw_1', tokensRequired: 10, title: 'Ghostly Coin Bag', rewardType: 'coins', rewardAmount: 800, iconName: 'Coins' },
      { id: 'hw_2', tokensRequired: 25, title: 'Witch’s Brew Hints', rewardType: 'hints', rewardAmount: 6, iconName: 'Lightbulb' },
      { id: 'hw_3', tokensRequired: 50, title: 'Haunted Hoard', rewardType: 'coins', rewardAmount: 5000, iconName: 'Ghost' },
    ],
  },
  {
    id: 'christmas_winter',
    title: 'Christmas Winter Alchemy',
    subtitle: 'Frosty Flasks & Snowflake Rewards',
    description: 'Celebrate the winter holidays! Gather Magic Snowflakes to receive festive coin & hint packages.',
    themeColor: 'from-cyan-400 via-blue-500 to-indigo-600',
    badgeText: 'HOLIDAY SPECIAL',
    bannerGradient: 'from-cyan-950/90 via-slate-900 to-blue-950/80',
    accentBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    iconName: 'Snowflake',
    isSpecialSeason: true,
    coinMultiplier: 2,
    bonusXPPerLevel: 90,
    tokenName: 'Magic Snowflakes',
    milestones: [
      { id: 'xm_1', tokensRequired: 10, title: 'Holiday Gift Box', rewardType: 'coins', rewardAmount: 1000, iconName: 'Coins' },
      { id: 'xm_2', tokensRequired: 25, title: 'Frosty Free Undos', rewardType: 'freeUndos', rewardAmount: 8, iconName: 'RotateCcw' },
      { id: 'xm_3', tokensRequired: 50, title: 'Santa’s Grand Vault', rewardType: 'coins', rewardAmount: 6000, iconName: 'Crown' },
    ],
  },
];

/**
 * Gets currently selected active event (or defaults based on current date week)
 */
export function getCurrentActiveEvent(progress?: UserProgress): WeeklyEvent {
  const selectedId = progress?.eventProgress?.selectedEventId;
  if (selectedId) {
    const found = WEEKLY_EVENTS.find((e) => e.id === selectedId);
    if (found) return found;
  }

  // Rotation based on current day of year
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
  const weekIndex = Math.floor(dayOfYear / 7) % WEEKLY_EVENTS.length;

  return WEEKLY_EVENTS[weekIndex];
}

/**
 * Calculates current active coin multiplier
 */
export function getActiveEventCoinMultiplier(progress?: UserProgress): number {
  const activeEvent = getCurrentActiveEvent(progress);
  return activeEvent.coinMultiplier;
}

/**
 * Process level completion for weekly event progress: returns updated progress with tokens
 */
export function addEventTokensOnLevelComplete(
  progress: UserProgress,
  is3Stars: boolean
): { updatedProgress: UserProgress; tokensEarned: number } {
  const activeEvent = getCurrentActiveEvent(progress);
  const tokensEarned = is3Stars ? 3 : 2;

  const currentEventProg = progress.eventProgress || {
    claimedRewardIds: [],
    eventTokensCount: 0,
    selectedEventId: activeEvent.id,
  };

  const updatedProgress: UserProgress = {
    ...progress,
    eventProgress: {
      ...currentEventProg,
      selectedEventId: activeEvent.id,
      eventTokensCount: currentEventProg.eventTokensCount + tokensEarned,
    },
  };

  return { updatedProgress, tokensEarned };
}
