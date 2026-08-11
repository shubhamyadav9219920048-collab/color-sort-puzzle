import React from 'react';
import { motion } from 'motion/react';
import {
  X,
  BarChart3,
  Star,
  Trophy,
  Zap,
  Droplets,
  Coins,
  Flame,
  Award,
  Sparkles,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { UserProgress } from '../types';
import { soundEngine } from '../lib/sound';

interface StatsModalProps {
  userProgress: UserProgress;
  onClose: () => void;
}

export const StatsModal: React.FC<StatsModalProps> = ({ userProgress, onClose }) => {
  const { stats, dailyChallenge, levels, coins } = userProgress;

  // Calculate total stars earned
  const totalStarsEarned = Object.values(levels).reduce((acc: number, lvl: any) => acc + (lvl?.stars || 0), 0);
  const totalPossibleStars = 500 * 3; // 1500 stars

  // Difficulty stats
  const easyCount = stats.easyCompleted || 0;
  const mediumCount = stats.mediumCompleted || 0;
  const hardCount = stats.hardCompleted || 0;
  const expertCount = stats.expertCompleted || 0;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-black text-white tracking-wide">Career Statistics</h2>
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

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1 flex flex-col gap-4">
          {/* Main Level Progress Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-blue-950/40 to-slate-900 border border-cyan-500/30 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-black text-white">Total Progression</span>
              </div>
              <span className="text-xs font-black text-cyan-400">
                {stats.levelsCompleted} / 500 Levels
              </span>
            </div>

            {/* Level Bar */}
            <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden p-0.5 border border-slate-800">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (stats.levelsCompleted / 500) * 100)}%` }}
              />
            </div>

            {/* Stars Row */}
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 pt-1">
              <div className="flex items-center gap-1.5 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>
                  {totalStarsEarned} / {totalPossibleStars} Stars
                </span>
              </div>
              <span className="text-slate-400">
                {((stats.levelsCompleted / 500) * 100).toFixed(1)}% Completed
              </span>
            </div>
          </div>

          {/* Difficulty Breakdown Grid */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              Difficulty Zone Completion
            </span>

            <div className="grid grid-cols-2 gap-2.5">
              {/* Easy */}
              <div className="p-3 rounded-2xl bg-slate-950/60 border border-emerald-500/30 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-emerald-400">Easy Zone</span>
                  <span className="text-[11px] font-extrabold text-slate-300">{easyCount} / 125</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: `${(easyCount / 125) * 100}%` }}
                  />
                </div>
              </div>

              {/* Medium */}
              <div className="p-3 rounded-2xl bg-slate-950/60 border border-amber-500/30 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-400">Medium Zone</span>
                  <span className="text-[11px] font-extrabold text-slate-300">{mediumCount} / 125</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full"
                    style={{ width: `${(mediumCount / 125) * 100}%` }}
                  />
                </div>
              </div>

              {/* Hard */}
              <div className="p-3 rounded-2xl bg-slate-950/60 border border-rose-500/30 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-rose-400">Hard Zone</span>
                  <span className="text-[11px] font-extrabold text-slate-300">{hardCount} / 125</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-rose-500 h-full rounded-full"
                    style={{ width: `${(hardCount / 125) * 100}%` }}
                  />
                </div>
              </div>

              {/* Expert */}
              <div className="p-3 rounded-2xl bg-slate-950/60 border border-purple-500/30 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-purple-400">Expert Zone</span>
                  <span className="text-[11px] font-extrabold text-slate-300">{expertCount} / 125</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-purple-500 h-full rounded-full"
                    style={{ width: `${(expertCount / 125) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Total Pours */}
            <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/80 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400">
                <Droplets className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black text-white">{stats.totalPours}</span>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase">Total Pours</span>
              </div>
            </div>

            {/* Perfect Levels */}
            <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/80 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
                <Zap className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black text-white">{stats.perfectLevels}</span>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase">3-Star Wins</span>
              </div>
            </div>

            {/* Daily Streak */}
            <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/80 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400">
                <Flame className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black text-white">{dailyChallenge?.currentStreak || 0} Days</span>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase">Daily Streak</span>
              </div>
            </div>

            {/* Total Coins */}
            <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/80 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-yellow-500/20 text-yellow-400">
                <Coins className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black text-white">{stats.totalCoinsEarned}</span>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase">Total Earned</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
