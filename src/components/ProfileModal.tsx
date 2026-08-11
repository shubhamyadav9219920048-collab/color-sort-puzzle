import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  User,
  Zap,
  Coins,
  Trophy,
  Flame,
  Clock,
  Lightbulb,
  CheckCircle2,
  Sparkles,
  Crown,
  Droplets,
  RotateCcw,
  ShieldCheck,
  Medal,
  Award,
  FlaskConical,
  Star,
  Check,
} from 'lucide-react';
import { UserProgress } from '../types';
import {
  calculatePlayerXP,
  getPlayerLevelInfo,
  formatPlayTime,
} from '../lib/playerLevel';
import { soundEngine } from '../lib/sound';

interface ProfileModalProps {
  userProgress: UserProgress;
  onUpdateAvatar?: (avatarId: string) => void;
  onClose: () => void;
}

export interface AvatarOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  bgGradient: string;
  borderColor: string;
  unlockLevel: number;
}

export const AVATAR_OPTIONS: AvatarOption[] = [
  {
    id: 'alchemist_flask',
    name: 'Alchemist Flask',
    icon: <FlaskConical className="w-8 h-8 text-cyan-300" />,
    bgGradient: 'from-cyan-500/20 to-blue-600/20',
    borderColor: 'border-cyan-500/50',
    unlockLevel: 1,
  },
  {
    id: 'prism_gem',
    name: 'Prism Gem',
    icon: <Sparkles className="w-8 h-8 text-purple-300" />,
    bgGradient: 'from-purple-500/20 to-pink-600/20',
    borderColor: 'border-purple-500/50',
    unlockLevel: 1,
  },
  {
    id: 'element_master',
    name: 'Element Master',
    icon: <Droplets className="w-8 h-8 text-emerald-300" />,
    bgGradient: 'from-emerald-500/20 to-teal-600/20',
    borderColor: 'border-emerald-500/50',
    unlockLevel: 2,
  },
  {
    id: 'flame_walker',
    name: 'Flame Walker',
    icon: <Flame className="w-8 h-8 text-rose-400" />,
    bgGradient: 'from-rose-500/20 to-amber-600/20',
    borderColor: 'border-rose-500/50',
    unlockLevel: 3,
  },
  {
    id: 'lightning_sorcerer',
    name: 'Lightning Sorcerer',
    icon: <Zap className="w-8 h-8 text-amber-300" />,
    bgGradient: 'from-amber-500/20 to-yellow-600/20',
    borderColor: 'border-amber-500/50',
    unlockLevel: 5,
  },
  {
    id: 'golden_crown',
    name: 'Golden Sovereign',
    icon: <Crown className="w-8 h-8 text-yellow-300" />,
    bgGradient: 'from-yellow-500/20 to-amber-600/20',
    borderColor: 'border-yellow-400/60',
    unlockLevel: 8,
  },
  {
    id: 'champion_shield',
    name: 'Champion Shield',
    icon: <ShieldCheck className="w-8 h-8 text-indigo-300" />,
    bgGradient: 'from-indigo-500/20 to-blue-600/20',
    borderColor: 'border-indigo-500/50',
    unlockLevel: 10,
  },
  {
    id: 'grandmaster_trophy',
    name: 'Grandmaster Trophy',
    icon: <Trophy className="w-8 h-8 text-fuchsia-300" />,
    bgGradient: 'from-fuchsia-500/20 to-purple-600/20',
    borderColor: 'border-fuchsia-500/50',
    unlockLevel: 15,
  },
];

export const ProfileModal: React.FC<ProfileModalProps> = ({
  userProgress,
  onUpdateAvatar,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'avatars' | 'breakdown'>('overview');

  const totalXP = calculatePlayerXP(userProgress);
  const levelInfo = getPlayerLevelInfo(totalXP);

  const selectedAvatarId = userProgress.selectedAvatarId || 'alchemist_flask';
  const currentAvatar =
    AVATAR_OPTIONS.find((a) => a.id === selectedAvatarId) || AVATAR_OPTIONS[0];

  const stats = userProgress.stats || {
    levelsCompleted: 0,
    totalPours: 0,
    totalCoinsEarned: 0,
    perfectLevels: 0,
    boostersUsed: 0,
    totalPlayTimeSeconds: 0,
    easyCompleted: 0,
    mediumCompleted: 0,
    hardCompleted: 0,
    expertCompleted: 0,
    hintsUsed: 0,
    undosUsed: 0,
    noUndoLevelCompletions: 0,
  };

  const dailyStreak = userProgress.dailyStreak || 0;
  const bestStreak = userProgress.dailyChallenge?.bestStreak || dailyStreak;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-xl max-h-[92vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden relative"
      >
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-950/80 via-slate-900 to-cyan-950/40 z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              <User className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg font-black text-white tracking-wide">Player Profile</h2>
              <span className="text-xs text-cyan-300/80 font-bold">Player Career & Statistics</span>
            </div>
          </div>
          <button
            onClick={() => {
              soundEngine.playSelect();
              onClose();
            }}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Controls */}
        <div className="px-5 pt-3 bg-slate-950/60 border-b border-slate-800 flex items-center gap-2 z-10">
          <button
            onClick={() => {
              soundEngine.playSelect();
              setActiveTab('overview');
            }}
            className={`px-3.5 py-2 rounded-t-xl text-xs font-black transition-all border-t border-x ${
              activeTab === 'overview'
                ? 'bg-slate-900 border-slate-700 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => {
              soundEngine.playSelect();
              setActiveTab('avatars');
            }}
            className={`px-3.5 py-2 rounded-t-xl text-xs font-black transition-all border-t border-x ${
              activeTab === 'avatars'
                ? 'bg-slate-900 border-slate-700 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Avatars
          </button>
          <button
            onClick={() => {
              soundEngine.playSelect();
              setActiveTab('breakdown');
            }}
            className={`px-3.5 py-2 rounded-t-xl text-xs font-black transition-all border-t border-x ${
              activeTab === 'breakdown'
                ? 'bg-slate-900 border-slate-700 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Zone Breakdown
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-5 overflow-y-auto flex-1 flex flex-col gap-4 z-10">
          {activeTab === 'overview' && (
            <>
              {/* Profile Card Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/60 border border-slate-800 flex flex-col sm:flex-row items-center gap-4 relative overflow-hidden shadow-lg">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

                {/* Avatar Display */}
                <div className="relative group shrink-0">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${currentAvatar.bgGradient} border-2 ${currentAvatar.borderColor} flex items-center justify-center shadow-xl shadow-cyan-950/50`}
                  >
                    {currentAvatar.icon}
                  </div>
                  <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 font-black text-[10px] uppercase shadow-md border border-cyan-300">
                    Lvl {levelInfo.level}
                  </div>
                </div>

                {/* Player Rank & Titles */}
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left flex-1 gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-white tracking-tight">Alchemist Player</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${levelInfo.rankBadgeColor}`}
                    >
                      {levelInfo.title}
                    </span>
                  </div>

                  {/* Level Progress Label */}
                  <div className="w-full mt-2 flex flex-col gap-1">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                      <span className="flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        Level {levelInfo.level} Progress
                      </span>
                      <span className="text-amber-300 font-mono">
                        {levelInfo.xpInCurrentLevel} / {levelInfo.xpForNextLevel} XP
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-3 bg-slate-950 rounded-full border border-slate-800 p-0.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${levelInfo.progressPercent}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-cyan-400 rounded-full shadow-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Player Profile Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {/* 1. Player Level */}
                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col gap-1 hover:border-cyan-500/40 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">Player Level</span>
                    <Zap className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-2xl font-black text-white">Level {levelInfo.level}</span>
                  <span className="text-[10px] font-semibold text-slate-500">
                    {Math.round(levelInfo.progressPercent)}% to Lvl {levelInfo.level + 1}
                  </span>
                </div>

                {/* 2. XP */}
                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col gap-1 hover:border-amber-500/40 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">Total XP</span>
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                  </div>
                  <span className="text-2xl font-black text-amber-300">{totalXP.toLocaleString()}</span>
                  <span className="text-[10px] font-semibold text-slate-500">
                    +{levelInfo.xpInCurrentLevel} XP in level
                  </span>
                </div>

                {/* 3. Coins */}
                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col gap-1 hover:border-yellow-500/40 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">Coins Balance</span>
                    <Coins className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-2xl font-black text-amber-400">{userProgress.coins.toLocaleString()}</span>
                  <span className="text-[10px] font-semibold text-slate-500">
                    Earned: {(stats.totalCoinsEarned || userProgress.coins).toLocaleString()}
                  </span>
                </div>

                {/* 4. Levels Completed */}
                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col gap-1 hover:border-emerald-500/40 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">Levels Completed</span>
                    <Trophy className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-2xl font-black text-emerald-400">{stats.levelsCompleted}</span>
                  <span className="text-[10px] font-semibold text-slate-500">Out of 500 levels</span>
                </div>

                {/* 5. Hints Used */}
                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col gap-1 hover:border-purple-500/40 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">Hints Used</span>
                    <Lightbulb className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="text-2xl font-black text-purple-300">{stats.hintsUsed || 0}</span>
                  <span className="text-[10px] font-semibold text-slate-500">
                    Free Hints: {userProgress.freeHints || 0}
                  </span>
                </div>

                {/* 6. Daily Streak */}
                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col gap-1 hover:border-rose-500/40 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">Daily Streak</span>
                    <Flame className="w-4 h-4 text-rose-400" />
                  </div>
                  <span className="text-2xl font-black text-rose-400">{dailyStreak} Days</span>
                  <span className="text-[10px] font-semibold text-slate-500">Best Streak: {bestStreak} Days</span>
                </div>

                {/* 7. Play Time */}
                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col gap-1 col-span-2 sm:col-span-3 hover:border-cyan-500/40 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      Total Play Time
                    </span>
                    <span className="text-sm font-black text-cyan-300">
                      {formatPlayTime(stats.totalPlayTimeSeconds)}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-cyan-400 w-full animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Advanced Highlights */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col gap-3">
                <span className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-yellow-400" />
                  Career Highlights
                </span>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-400" /> Perfect 3-Star Solves
                    </span>
                    <span className="font-extrabold text-white">{stats.perfectLevels}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Droplets className="w-3.5 h-3.5 text-cyan-400" /> Total Pours
                    </span>
                    <span className="font-extrabold text-white">{stats.totalPours.toLocaleString()}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> No-Undo Solves
                    </span>
                    <span className="font-extrabold text-white">{stats.noUndoLevelCompletions || 0}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <RotateCcw className="w-3.5 h-3.5 text-amber-400" /> Undos Used
                    </span>
                    <span className="font-extrabold text-white">{stats.undosUsed || 0}</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'avatars' && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-300 uppercase tracking-wider">
                  Select Player Avatar
                </span>
                <span className="text-xs text-cyan-400 font-bold">Unlocks with Player Level</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {AVATAR_OPTIONS.map((avatar) => {
                  const isUnlocked = levelInfo.level >= avatar.unlockLevel;
                  const isSelected = selectedAvatarId === avatar.id;

                  return (
                    <button
                      key={avatar.id}
                      disabled={!isUnlocked}
                      onClick={() => {
                        soundEngine.playSelect();
                        if (onUpdateAvatar) onUpdateAvatar(avatar.id);
                      }}
                      className={`p-3.5 rounded-2xl border flex flex-col items-center gap-2 text-center transition-all relative ${
                        isSelected
                          ? 'bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-950/50'
                          : isUnlocked
                          ? 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                          : 'bg-slate-950/30 border-slate-900 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${avatar.bgGradient} border ${avatar.borderColor} flex items-center justify-center`}
                      >
                        {avatar.icon}
                      </div>

                      <span className="text-xs font-black text-white">{avatar.name}</span>

                      {isSelected ? (
                        <span className="px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 font-black text-[9px] uppercase flex items-center gap-1">
                          <Check className="w-3 h-3" /> Selected
                        </span>
                      ) : isUnlocked ? (
                        <span className="text-[10px] font-bold text-emerald-400">Unlocked</span>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-500">
                          Requires Lvl {avatar.unlockLevel}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'breakdown' && (
            <div className="flex flex-col gap-3">
              <span className="text-xs font-black text-slate-300 uppercase tracking-wider">
                Difficulty Level Completions
              </span>

              <div className="flex flex-col gap-2.5">
                {/* Easy Zone */}
                <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                      <Medal className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-white">Easy Zone (Levels 1 - 125)</span>
                      <span className="text-[10px] text-slate-400">Beginner Alchemy Puzzles</span>
                    </div>
                  </div>
                  <span className="text-sm font-black text-emerald-400">
                    {stats.easyCompleted || 0} / 125
                  </span>
                </div>

                {/* Medium Zone */}
                <div className="p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                      <Award className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-white">Medium Zone (Levels 126 - 250)</span>
                      <span className="text-[10px] text-slate-400">Advanced Transmutations</span>
                    </div>
                  </div>
                  <span className="text-sm font-black text-cyan-400">
                    {stats.mediumCompleted || 0} / 125
                  </span>
                </div>

                {/* Hard Zone */}
                <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                      <Flame className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-white">Hard Zone (Levels 251 - 375)</span>
                      <span className="text-[10px] text-slate-400">Expert Fluid Dynamics</span>
                    </div>
                  </div>
                  <span className="text-sm font-black text-amber-400">
                    {stats.hardCompleted || 0} / 125
                  </span>
                </div>

                {/* Expert Zone */}
                <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                      <Crown className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-white">Expert Zone (Levels 376 - 500)</span>
                      <span className="text-[10px] text-slate-400">Master Level Alchemy</span>
                    </div>
                  </div>
                  <span className="text-sm font-black text-purple-300">
                    {stats.expertCompleted || 0} / 125
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
