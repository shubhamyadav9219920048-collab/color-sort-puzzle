import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, ArrowRight, RotateCcw, Coins, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../lib/sound';

interface VictoryModalProps {
  levelId: number;
  movesCount: number;
  parMoves: number;
  starsEarned: number;
  coinsEarned: number;
  isDailyChallenge?: boolean;
  onNextLevel: () => void;
  onReplay: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  levelId,
  movesCount,
  parMoves,
  starsEarned,
  coinsEarned,
  isDailyChallenge = false,
  onNextLevel,
  onReplay,
}) => {
  useEffect(() => {
    soundEngine.playVictory();

    // Trigger colorful confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ef4444', '#3b82f6', '#10b981', '#eab308', '#a855f7', '#ec4899'],
      });

      const timer = setTimeout(() => {
        confetti({
          particleCount: 40,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 40,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 250);

      return () => clearTimeout(timer);
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="w-full max-w-sm bg-slate-900 border-2 border-emerald-500/50 rounded-3xl p-6 shadow-[0_0_50px_rgba(16,185,129,0.3)] flex flex-col items-center gap-5 text-center relative overflow-hidden"
      >
        {/* Background Celebration Rays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none" />

        {/* Title */}
        <div className="flex flex-col items-center gap-1 z-10">
          <span className="text-xs font-black uppercase text-emerald-400 tracking-widest flex items-center gap-1">
            <Award className="w-4 h-4" /> {isDailyChallenge ? 'Daily Challenge Complete!' : 'Level Complete!'}
          </span>
          <h2 className="text-2xl font-black text-white">
            {isDailyChallenge ? "Today's Puzzle Solved" : `Level ${levelId} Solved`}
          </h2>
        </div>

        {/* Stars Display */}
        <div className="flex items-center gap-3 my-1 z-10">
          {[1, 2, 3].map((s) => {
            const isEarned = s <= starsEarned;
            return (
              <motion.div
                key={s}
                initial={{ scale: 0, rotate: -45 }}
                animate={isEarned ? { scale: 1, rotate: 0 } : { scale: 0.8, opacity: 0.3 }}
                transition={{ delay: 0.2 + s * 0.15, type: 'spring' }}
              >
                <Star
                  className={`w-12 h-12 ${
                    isEarned
                      ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]'
                      : 'text-slate-700'
                  }`}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Score & Coins Card */}
        <div className="w-full bg-slate-950/60 rounded-2xl border border-slate-800 p-4 flex flex-col gap-2 z-10">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <span>Moves Used:</span>
            <span className="text-sm font-black text-cyan-400">{movesCount}</span>
          </div>
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <span>Target Par:</span>
            <span className="text-slate-400">{parMoves} moves</span>
          </div>
          <div className="h-[1px] bg-slate-800 my-0.5" />
          <div className="flex items-center justify-between text-sm font-black text-amber-300">
            <span className="flex items-center gap-1">
              <Coins className="w-4 h-4 text-amber-400" /> Reward Coins:
            </span>
            <span className="text-base text-amber-400">+{coinsEarned}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex items-center gap-3 z-10">
          <button
            onClick={() => {
              soundEngine.playSelect();
              onReplay();
            }}
            className="flex-1 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-extrabold text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" /> Replay
          </button>

          <button
            onClick={() => {
              soundEngine.playSelect();
              onNextLevel();
            }}
            className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition-all active:scale-95"
          >
            <span>{isDailyChallenge ? 'Continue' : 'Next Level'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
