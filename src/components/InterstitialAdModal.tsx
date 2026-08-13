import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Tv, X, ShieldCheck, Trophy } from 'lucide-react';
import { soundEngine } from '../lib/sound';
import { ADMOB_TEST_UNITS } from '../lib/admob';

interface InterstitialAdModalProps {
  onClose: () => void;
}

export const InterstitialAdModal: React.FC<InterstitialAdModalProps> = ({ onClose }) => {
  const [countdown, setCountdown] = useState<number>(3);
  const [canSkip, setCanSkip] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanSkip(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClose = () => {
    soundEngine.playSelect();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-sm bg-slate-900 border-2 border-indigo-500/50 rounded-3xl p-6 shadow-[0_0_60px_rgba(99,102,241,0.3)] flex flex-col items-center text-center gap-5 relative overflow-hidden"
      >
        {/* Header */}
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-indigo-300 bg-indigo-500/20 px-2.5 py-1 rounded-full border border-indigo-500/40">
            <Tv className="w-3.5 h-3.5" />
            <span>AdMob Interstitial Test Ad</span>
          </div>

          <button
            onClick={handleClose}
            disabled={!canSkip}
            className={`p-1.5 rounded-xl border transition-all ${
              canSkip
                ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700 active:scale-95'
                : 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sponsor Banner Content */}
        <div className="w-full bg-slate-950 rounded-2xl border border-slate-800 p-5 flex flex-col items-center gap-3 relative overflow-hidden">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 p-0.5 shadow-xl shadow-indigo-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-indigo-400">
              <Trophy className="w-10 h-10 animate-pulse" />
            </div>
          </div>

          <div className="flex flex-col items-center gap-1">
            <h3 className="text-lg font-black text-white">5 Levels Milestone Completed!</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Awesome sorting skills! Sponsored by Google AdMob Ads.
            </p>
            <span className="text-[10px] font-mono text-indigo-300/80 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800/50 mt-1">
              Unit: {ADMOB_TEST_UNITS.INTERSTITIAL}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full flex flex-col gap-1 mt-2">
            <div className="flex justify-between text-[10px] font-bold text-slate-400">
              <span>Next level ready in:</span>
              <span className="text-indigo-400">{countdown > 0 ? `${countdown}s` : 'Ready!'}</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                initial={{ width: '0%' }}
                animate={{ width: `${((3 - countdown) / 3) * 100}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleClose}
          className={`w-full py-3 rounded-2xl font-black text-xs flex items-center justify-center gap-2 transition-all ${
            canSkip
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 active:scale-95'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          {canSkip ? 'CONTINUE GAME' : `NEXT LEVEL IN ${countdown}S`}
        </button>
      </motion.div>
    </div>
  );
};
