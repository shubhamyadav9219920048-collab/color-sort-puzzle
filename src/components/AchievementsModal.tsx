import React from 'react';
import { motion } from 'motion/react';
import { X, Trophy, Sparkles, Award, Crown, Flame, Zap, Droplets, Coins, CheckCircle2 } from 'lucide-react';
import { UserProgress } from '../types';
import { ACHIEVEMENTS } from '../lib/achievements';
import { soundEngine } from '../lib/sound';

interface AchievementsModalProps {
  userProgress: UserProgress;
  onClaimReward: (achievementId: string, reward: number) => void;
  onClose: () => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5 text-amber-400" />,
  Award: <Award className="w-5 h-5 text-cyan-400" />,
  Trophy: <Trophy className="w-5 h-5 text-purple-400" />,
  Crown: <Crown className="w-5 h-5 text-amber-400" />,
  Flame: <Flame className="w-5 h-5 text-rose-400" />,
  Zap: <Zap className="w-5 h-5 text-yellow-400" />,
  Droplets: <Droplets className="w-5 h-5 text-blue-400" />,
};

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  userProgress,
  onClaimReward,
  onClose,
}) => {
  const unlockedCount = ACHIEVEMENTS.filter((a) => a.isUnlocked(userProgress)).length;

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
          <div className="flex items-center gap-2.5">
            <Trophy className="w-5 h-5 text-amber-400" />
            <div className="flex flex-col">
              <h2 className="text-lg font-black text-white tracking-wide">Achievements ({unlockedCount}/100)</h2>
              <span className="text-xs text-amber-400/80 font-bold">{unlockedCount} of 100 Achievements Unlocked</span>
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

        {/* List */}
        <div className="p-5 overflow-y-auto flex-1 flex flex-col gap-3">
          {ACHIEVEMENTS.map((ach) => {
            const isUnlocked = ach.isUnlocked(userProgress);
            const isClaimed = userProgress.claimedAchievements.includes(ach.id);

            return (
              <div
                key={ach.id}
                className={`p-4 rounded-2xl border flex items-center justify-between gap-3 transition-all ${
                  isClaimed
                    ? 'bg-slate-900/60 border-slate-800 opacity-80'
                    : isUnlocked
                    ? 'bg-amber-950/20 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                    : 'bg-slate-800/30 border-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                    {ICON_MAP[ach.iconName] || <Trophy className="w-5 h-5 text-slate-400" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-white">{ach.title}</span>
                    <span className="text-xs text-slate-400">{ach.description}</span>
                  </div>
                </div>

                {isClaimed ? (
                  <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-400 font-bold text-xs flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Claimed
                  </span>
                ) : isUnlocked ? (
                  <button
                    onClick={() => {
                      soundEngine.playCoin();
                      onClaimReward(ach.id, ach.reward);
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1 shadow-md shadow-amber-500/20 transition-all active:scale-95"
                  >
                    <Coins className="w-3.5 h-3.5" />
                    <span>+{ach.reward}</span>
                  </button>
                ) : (
                  <span className="px-3 py-1.5 rounded-xl bg-slate-800/60 text-slate-500 font-bold text-xs">
                    Locked
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
