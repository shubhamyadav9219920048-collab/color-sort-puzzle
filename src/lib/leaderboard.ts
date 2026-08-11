import { UserProgress } from '../types';
import { calculatePlayerXP, getPlayerLevelInfo } from './playerLevel';

export interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  avatarId: string;
  countryCode: string;
  countryFlag: string;
  level: number;
  coins: number;
  xp: number;
  isUser?: boolean;
  status?: 'online' | 'offline' | 'in_game';
  isFriend?: boolean;
}

export interface CountryInfo {
  code: string;
  name: string;
  flag: string;
}

export const COUNTRIES: CountryInfo[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
];

const GLOBAL_TOP_PLAYERS: Omit<LeaderboardEntry, 'rank'>[] = [
  { id: 'p1', name: 'AetherSovereign', avatarId: 'golden_crown', countryCode: 'JP', countryFlag: '🇯🇵', level: 88, coins: 45200, xp: 395000 },
  { id: 'p2', name: 'FlaskMaster99', avatarId: 'grandmaster_trophy', countryCode: 'US', countryFlag: '🇺🇸', level: 82, coins: 38900, xp: 341000 },
  { id: 'p3', name: 'PrismQueen', avatarId: 'prism_gem', countryCode: 'DE', countryFlag: '🇩🇪', level: 75, coins: 32100, xp: 289000 },
  { id: 'p4', name: 'LiquidNexus', avatarId: 'element_master', countryCode: 'KR', countryFlag: '🇰🇷', level: 71, coins: 29400, xp: 256000 },
  { id: 'p5', name: 'SorcererHex', avatarId: 'lightning_sorcerer', countryCode: 'UK', countryFlag: '🇬🇧', level: 68, coins: 26800, xp: 235000 },
  { id: 'p6', name: 'AlchemicGuru', avatarId: 'alchemist_flask', countryCode: 'IN', countryFlag: '🇮🇳', level: 63, coins: 24100, xp: 202000 },
  { id: 'p7', name: 'FlameWalker_X', avatarId: 'flame_walker', countryCode: 'BR', countryFlag: '🇧🇷', level: 59, coins: 21500, xp: 178000 },
  { id: 'p8', name: 'CyberPourer', avatarId: 'champion_shield', countryCode: 'FR', countryFlag: '🇫🇷', level: 54, coins: 19800, xp: 151000 },
  { id: 'p9', name: 'AquaShield', avatarId: 'champion_shield', countryCode: 'CA', countryFlag: '🇨🇦', level: 50, coins: 17900, xp: 130000 },
  { id: 'p10', name: 'ZenFluid', avatarId: 'element_master', countryCode: 'AU', countryFlag: '🇦🇺', level: 46, coins: 15400, xp: 110000 },
  { id: 'p11', name: 'SolsticeAlchemist', avatarId: 'golden_crown', countryCode: 'US', countryFlag: '🇺🇸', level: 42, coins: 13900, xp: 92000 },
  { id: 'p12', name: 'NeonVessel', avatarId: 'prism_gem', countryCode: 'JP', countryFlag: '🇯🇵', level: 38, coins: 12100, xp: 76000 },
  { id: 'p13', name: 'VortexMaster', avatarId: 'lightning_sorcerer', countryCode: 'DE', countryFlag: '🇩🇪', level: 35, coins: 10800, xp: 64000 },
  { id: 'p14', name: 'AuraBrewer', avatarId: 'alchemist_flask', countryCode: 'KR', countryFlag: '🇰🇷', level: 31, coins: 9200, xp: 51000 },
  { id: 'p15', name: 'PixelPotions', avatarId: 'flame_walker', countryCode: 'BR', countryFlag: '🇧🇷', level: 27, coins: 8100, xp: 39000 },
];

const INITIAL_FRIENDS: Omit<LeaderboardEntry, 'rank'>[] = [
  { id: 'f1', name: 'Alex (Bestie)', avatarId: 'lightning_sorcerer', countryCode: 'US', countryFlag: '🇺🇸', level: 24, coins: 6400, xp: 31000, status: 'online', isFriend: true },
  { id: 'f2', name: 'Sarah_Gamer', avatarId: 'prism_gem', countryCode: 'CA', countryFlag: '🇨🇦', level: 19, coins: 4800, xp: 20500, status: 'in_game', isFriend: true },
  { id: 'f3', name: 'Marco_R', avatarId: 'flame_walker', countryCode: 'BR', countryFlag: '🇧🇷', level: 15, coins: 3500, xp: 13200, status: 'offline', isFriend: true },
  { id: 'f4', name: 'Yuki_JP', avatarId: 'alchemist_flask', countryCode: 'JP', countryFlag: '🇯🇵', level: 12, coins: 2700, xp: 8800, status: 'online', isFriend: true },
  { id: 'f5', name: 'Liam_UK', avatarId: 'champion_shield', countryCode: 'UK', countryFlag: '🇬🇧', level: 8, coins: 1900, xp: 4200, status: 'offline', isFriend: true },
];

/**
 * Builds user entry based on real progress
 */
export function buildUserLeaderboardEntry(progress: UserProgress): LeaderboardEntry {
  const xp = calculatePlayerXP(progress);
  const lvlInfo = getPlayerLevelInfo(xp);
  const country = COUNTRIES.find((c) => c.code === (progress.countryCode || 'US')) || COUNTRIES[0];

  return {
    id: 'user_me',
    rank: 0,
    name: 'You (Alchemist)',
    avatarId: progress.selectedAvatarId || 'alchemist_flask',
    countryCode: country.code,
    countryFlag: country.flag,
    level: lvlInfo.level,
    coins: progress.coins,
    xp,
    isUser: true,
    status: 'online',
  };
}

/**
 * Generates sorted leaderboard for Global scope
 */
export function getGlobalLeaderboard(
  progress: UserProgress,
  sortBy: 'xp' | 'level' | 'coins' = 'xp'
): LeaderboardEntry[] {
  const userEntry = buildUserLeaderboardEntry(progress);
  const allEntries = [...GLOBAL_TOP_PLAYERS, userEntry];

  allEntries.sort((a, b) => {
    if (b[sortBy] !== a[sortBy]) {
      return b[sortBy] - a[sortBy];
    }
    return b.xp - a.xp;
  });

  return allEntries.map((entry, index) => ({
    ...entry,
    rank: index + 1,
  }));
}

/**
 * Generates sorted leaderboard for Country scope
 */
export function getCountryLeaderboard(
  progress: UserProgress,
  countryCode: string = 'US',
  sortBy: 'xp' | 'level' | 'coins' = 'xp'
): LeaderboardEntry[] {
  const userEntry = buildUserLeaderboardEntry(progress);
  // Ensure user is matching selected country for filtering if same, or user override
  const filteredBots = GLOBAL_TOP_PLAYERS.filter((p) => p.countryCode === countryCode);

  const countryFlag = COUNTRIES.find((c) => c.code === countryCode)?.flag || '🌐';

  // If list is small, add dynamic competitors for country vibrancy
  if (filteredBots.length < 5) {
    filteredBots.push(
      { id: 'c_extra1', name: `Master_${countryCode}1`, avatarId: 'element_master', countryCode, countryFlag, level: 33, coins: 9800, xp: 52000 },
      { id: 'c_extra2', name: `Pourer_${countryCode}2`, avatarId: 'champion_shield', countryCode, countryFlag, level: 21, coins: 5400, xp: 24000 },
      { id: 'c_extra3', name: `Aura_${countryCode}3`, avatarId: 'prism_gem', countryCode, countryFlag, level: 14, coins: 3100, xp: 11500 }
    );
  }

  const userBelongsToCountry = (progress.countryCode || 'US') === countryCode;
  const listToRank = userBelongsToCountry ? [...filteredBots, userEntry] : [...filteredBots, { ...userEntry, countryCode, countryFlag }];

  listToRank.sort((a, b) => b[sortBy] - a[sortBy] || b.xp - a.xp);

  return listToRank.map((entry, index) => ({
    ...entry,
    rank: index + 1,
  }));
}

/**
 * Generates sorted leaderboard for Friends scope
 */
export function getFriendsLeaderboard(
  progress: UserProgress,
  sortBy: 'xp' | 'level' | 'coins' = 'xp'
): LeaderboardEntry[] {
  const userEntry = buildUserLeaderboardEntry(progress);
  const friendsList = [...INITIAL_FRIENDS, userEntry];

  friendsList.sort((a, b) => b[sortBy] - a[sortBy] || b.xp - a.xp);

  return friendsList.map((entry, index) => ({
    ...entry,
    rank: index + 1,
  }));
}
