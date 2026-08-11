import React from 'react';
import {
  RotateCcw,
  Lightbulb,
  PlusCircle,
  RefreshCw,
  Coins,
  Map,
  ShoppingBag,
  Trophy,
  Settings,
  Smartphone,
  Maximize2,
  Calendar,
  Tv,
  BarChart3,
  Flame,
  FastForward,
  Sparkles,
  User,
} from 'lucide-react';
import { soundEngine } from '../lib/sound';

interface NavbarProps {
  currentLevel: number;
  chapterName: string;
  movesCount: number;
  parMoves: number;
  coins: number;
  freeUndos: number;
  freeHints: number;
  freeExtraTubes: number;
  freeSkips?: number;
  extraTubesUsed: number;
  isAndroidFrame: boolean;
  isDailyClaimedToday: boolean;
  isDailyChallengeCompletedToday?: boolean;
  isLuckySpinReady?: boolean;
  onUndo: () => void;
  onHint: () => void;
  onAddTube: () => void;
  onSkipLevel?: () => void;
  onRestart: () => void;
  onOpenLevelMap: () => void;
  onOpenShop: () => void;
  onOpenAchievements: () => void;
  onOpenSettings: () => void;
  onOpenDailyRewards: () => void;
  onOpenLuckySpin?: () => void;
  onOpenDailyChallenge: () => void;
  onOpenStats: () => void;
  onOpenProfile?: () => void;
  onOpenLeaderboard?: () => void;
  onOpenRewardedAds: () => void;
  onToggleFrame: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLevel,
  chapterName,
  movesCount,
  coins,
  freeUndos,
  freeHints,
  freeExtraTubes,
  freeSkips = 0,
  extraTubesUsed,
  isAndroidFrame,
  isDailyClaimedToday,
  isDailyChallengeCompletedToday,
  isLuckySpinReady = false,
  onUndo,
  onHint,
  onAddTube,
  onSkipLevel,
  onRestart,
  onOpenLevelMap,
  onOpenShop,
  onOpenAchievements,
  onOpenSettings,
  onOpenDailyRewards,
  onOpenLuckySpin,
  onOpenDailyChallenge,
  onOpenStats,
  onOpenProfile,
  onOpenLeaderboard,
  onOpenRewardedAds,
  onToggleFrame,
}) => {
  return (
    <header className="w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-3 py-2.5 flex flex-col gap-2 shadow-lg z-30">
      {/* Top Row: Map, Chapter/Level Badge, Daily Bonus, Free Ads, Coins, Menu Buttons */}
      <div className="flex items-center justify-between gap-1.5 sm:gap-2">
        {/* Left: Level Select & Level Info */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundEngine.playSelect();
              onOpenLevelMap();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-xs border border-cyan-500/30 transition-all active:scale-95 shadow-sm"
          >
            <Map className="w-4 h-4 text-cyan-400" />
            <span>Map</span>
          </button>

          <div className="flex flex-col">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              {chapterName}
            </span>
            <span className="text-sm font-extrabold text-white tracking-wide flex items-center gap-1">
              Level {currentLevel}
            </span>
          </div>
        </div>

        {/* Center/Right: Daily Challenge, Daily Reward, Watch Ad, Coins & Navigation Controls */}
        <div className="flex items-center gap-1.5">
          {/* Daily Challenge Button */}
          <button
            onClick={() => {
              soundEngine.playSelect();
              onOpenDailyChallenge();
            }}
            className="relative p-2 rounded-xl bg-gradient-to-r from-purple-500/20 to-indigo-500/20 hover:from-purple-500/30 hover:to-indigo-500/30 text-purple-300 border border-purple-500/40 transition-all active:scale-95 flex items-center gap-1"
            title="Daily Challenge Mode"
          >
            <Flame className="w-4 h-4 text-purple-400 fill-purple-400/20" />
            <span className="text-[11px] font-black hidden md:inline">Challenge</span>
            {!isDailyChallengeCompletedToday && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-purple-500 rounded-full animate-ping" />
            )}
            {!isDailyChallengeCompletedToday && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-purple-500 rounded-full" />
            )}
          </button>

          {/* Daily Reward Button */}
          <button
            onClick={() => {
              soundEngine.playSelect();
              onOpenDailyRewards();
            }}
            className="relative p-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-500/20 hover:from-amber-500/30 hover:to-yellow-500/30 text-amber-300 border border-amber-500/40 transition-all active:scale-95 flex items-center gap-1"
            title="Daily Bonus Rewards"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span className="text-[11px] font-black hidden sm:inline">Daily</span>
            {!isDailyClaimedToday && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
            )}
            {!isDailyClaimedToday && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full" />
            )}
          </button>

          {/* Coins Counter */}
          <button
            onClick={() => {
              soundEngine.playSelect();
              onOpenShop();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-extrabold text-xs shadow-inner transition-all hover:bg-amber-500/20 active:scale-95"
          >
            <Coins className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>{coins}</span>
          </button>

          {/* Player Profile Button */}
          {onOpenProfile && (
            <button
              onClick={() => {
                soundEngine.playSelect();
                onOpenProfile();
              }}
              className="p-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 text-cyan-300 border border-cyan-500/40 transition-all active:scale-95 flex items-center gap-1"
              title="Player Profile"
            >
              <User className="w-4 h-4 text-cyan-400" />
              <span className="text-[11px] font-black hidden md:inline">Profile</span>
            </button>
          )}

          {/* Stats Button */}
          <button
            onClick={() => {
              soundEngine.playSelect();
              onOpenStats();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/30 transition-all active:scale-95"
            title="Career Statistics"
          >
            <BarChart3 className="w-4 h-4" />
          </button>

          {/* Lucky Spin Wheel */}
          {onOpenLuckySpin && (
            <button
              onClick={() => {
                soundEngine.playSelect();
                onOpenLuckySpin();
              }}
              className="relative p-2 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 hover:from-amber-500/30 hover:to-yellow-500/30 text-amber-300 border border-amber-500/40 transition-all active:scale-95"
              title="Lucky Spin Wheel"
            >
              <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
              {isLuckySpinReady && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-slate-900 animate-ping" />
              )}
            </button>
          )}

          {/* Shop */}
          <button
            onClick={() => {
              soundEngine.playSelect();
              onOpenShop();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-400 border border-purple-500/30 transition-all active:scale-95"
            title="Shop & Customization"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>

          {/* Leaderboards */}
          {onOpenLeaderboard && (
            <button
              onClick={() => {
                soundEngine.playSelect();
                onOpenLeaderboard();
              }}
              className="p-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-500/20 hover:from-amber-500/30 hover:to-yellow-500/30 text-amber-300 border border-amber-500/40 transition-all active:scale-95 flex items-center gap-1"
              title="Global & Country Leaderboards"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="text-[11px] font-black hidden lg:inline">Ranks</span>
            </button>
          )}

          {/* Achievements */}
          <button
            onClick={() => {
              soundEngine.playSelect();
              onOpenAchievements();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 transition-all active:scale-95"
            title="Trophies & Achievements"
          >
            <Trophy className="w-4 h-4" />
          </button>

          {/* Settings */}
          <button
            onClick={() => {
              soundEngine.playSelect();
              onOpenSettings();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all active:scale-95"
            title="Settings & Guide"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Toggle Android Device Frame View */}
          <button
            onClick={() => {
              soundEngine.playSelect();
              onToggleFrame();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/20 transition-all active:scale-95 hidden sm:flex"
            title={isAndroidFrame ? 'Full Screen View' : 'Android Frame View'}
          >
            {isAndroidFrame ? <Maximize2 className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Bottom Row: Gameplay Power-Ups & Move Counter Bar */}
      <div className="flex items-center justify-between gap-2 bg-slate-950/60 p-1.5 rounded-2xl border border-slate-800/80">
        {/* Moves Counter */}
        <div className="px-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center gap-2">
          <span className="text-[11px] font-medium text-slate-400">Moves:</span>
          <span className="text-sm font-black text-cyan-400">{movesCount}</span>
        </div>

        {/* Action Boosters with Free Inventory Badges */}
        <div className="flex items-center gap-1.5">
          {/* Undo */}
          <button
            onClick={onUndo}
            className="relative flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all active:scale-95 disabled:opacity-40"
            title={freeUndos > 0 ? `Undo Move (Free: ${freeUndos})` : 'Undo Last Move (-20 Coins)'}
          >
            <RotateCcw className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[11px]">Undo</span>
            {freeUndos > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 bg-blue-500 text-white font-extrabold text-[9px] rounded-full">
                {freeUndos}
              </span>
            )}
          </button>

          {/* Hint */}
          <button
            onClick={onHint}
            className="relative flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all active:scale-95"
            title={freeHints > 0 ? `Get Hint (Free: ${freeHints})` : 'Get Hint (-50 Coins)'}
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
            <span className="text-[11px]">Hint</span>
            {freeHints > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 bg-amber-500 text-slate-950 font-extrabold text-[9px] rounded-full">
                {freeHints}
              </span>
            )}
          </button>

          {/* Add Tube */}
          <button
            onClick={onAddTube}
            disabled={extraTubesUsed >= 2}
            className="relative flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all active:scale-95 disabled:opacity-40"
            title={freeExtraTubes > 0 ? `Add Tube (Free: ${freeExtraTubes})` : 'Add Empty Tube (-100 Coins)'}
          >
            <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px]">Tube</span>
            {freeExtraTubes > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 bg-emerald-500 text-slate-950 font-extrabold text-[9px] rounded-full">
                {freeExtraTubes}
              </span>
            )}
          </button>

          {/* Skip Level */}
          {onSkipLevel && (
            <button
              onClick={onSkipLevel}
              className="relative flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-xs font-bold transition-all active:scale-95"
              title={freeSkips > 0 ? `Skip Level (Free: ${freeSkips})` : 'Skip Level (-200 Coins)'}
            >
              <FastForward className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-[11px] hidden sm:inline">Skip</span>
              {freeSkips > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 bg-purple-500 text-white font-extrabold text-[9px] rounded-full">
                  {freeSkips}
                </span>
              )}
            </button>
          )}

          {/* Restart */}
          <button
            onClick={onRestart}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-400 border border-rose-500/30 transition-all active:scale-95"
            title="Restart Level"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};

