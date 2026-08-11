import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Sparkles, Coins, CheckCircle2, X } from 'lucide-react';
import { Achievement } from '../types';
import { soundEngine } from '../lib/sound';

interface AchievementUnlockToastProps {
  achievement: Achievement | null;
  onClaim: (achievementId: string, reward: number) => void;
  onDismiss: () => void;
}

export const AchievementUnlockToast: React.FC<AchievementUnlockToastProps> = ({
  achievement,
  onClaim,
  onDismiss,
}) => {
  useEffect(() => {
    if (achievement) {
      soundEngine.playJackpot();
    }
  }, [achievement]);

  if (!achievement) return null;

  return (
    <AnimatePresence>
      <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4 pointer-events-auto">
        <motion.div
          initial={{ y: -60, scale: 0.8, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: -60, scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-2xl p-0.5 shadow-[0_10px_30px_rgba(245,158,11,0.4)] overflow-hidden"
        >
          <div className="bg-slate-950/95 backdrop-blur-md rounded-[14px] p-3.5 flex items-center justify-between gap-3 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute -top-10 -left-10 w-28 h-28 bg-amber-500/20 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center shrink-0 text-amber-300 shadow-inner">
                <Trophy className="w-6 h-6 animate-bounce" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-300 animate-spin" /> Achievement Unlocked!
                </span>
                <span className="text-sm font-black text-white leading-tight mt-0.5">
                  {achievement.title}
                </span>
                <span className="text-xs text-slate-300 line-clamp-1">
                  {achievement.description}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <button
                onClick={() => {
                  soundEngine.playCoin();
                  onClaim(achievement.id, achievement.reward);
                  onDismiss();
                }}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-xs flex items-center gap-1 shadow-md active:scale-95 transition-all"
              >
                <Coins className="w-3.5 h-3.5" />
                <span>+{achievement.reward}</span>
              </button>
              <button
                onClick={onDismiss}
                className="p-1 rounded-lg text-slate-400 hover:text-white transition-all"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
