import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Tv, Sparkles, Play, X, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { soundEngine } from '../lib/sound';
import { admobService } from '../lib/admob';

interface AppOpenAdModalProps {
  onClose: () => void;
}

export const AppOpenAdModal: React.FC<AppOpenAdModalProps> = ({ onClose }) => {
  const [countdown, setCountdown] = useState<number>(4);
  const [canSkip, setCanSkip] = useState<boolean>(false);
  const config = admobService.getConfig();

  useEffect(() => {
    admobService.markAppOpenAdShown();

    // Timer for countdown and auto-dismiss/skip enablement
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

    // Auto-dismiss after 4 seconds so player is never blocked
    const autoDismiss = setTimeout(() => {
      onClose();
    }, 4500);

    return () => {
      clearInterval(timer);
      clearTimeout(autoDismiss);
    };
  }, [onClose]);

  const handleSkip = () => {
    soundEngine.playSelect();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-sm bg-slate-900 border-2 border-amber-500/50 rounded-3xl p-6 shadow-[0_0_60px_rgba(245,158,11,0.25)] flex flex-col items-center text-center gap-5 relative overflow-hidden"
      >
        {/* AdMob Official Badge Header */}
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-amber-300 bg-amber-500/20 px-2.5 py-1 rounded-full border border-amber-500/40">
            <Tv className="w-3.5 h-3.5" />
            <span>AdMob App Open Ad</span>
          </div>
          <span className="text-[9px] font-mono text-slate-500 truncate max-w-[120px]">
            {config.appOpenId.slice(0, 16)}...
          </span>
        </div>

        {/* Sponsor Banner Visual */}
        <div className="w-full bg-gradient-to-br from-amber-500/10 via-slate-950 to-purple-950/40 rounded-2xl border border-amber-500/30 p-5 flex flex-col items-center gap-3 relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-amber-400">
              <Zap className="w-8 h-8 animate-bounce" />
            </div>
          </div>

          <div className="flex flex-col items-center gap-1">
            <h3 className="text-base font-black text-white">Color Sort Master 3D</h3>
            <span className="text-xs text-amber-300 font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Official Game Sponsor
            </span>
          </div>

          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400 to-yellow-300"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 4, ease: 'linear' }}
            />
          </div>
        </div>

        {/* Status / Notice */}
        <div className="flex items-center gap-2 text-xs text-slate-400 font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Game launching in {countdown > 0 ? `${countdown}s` : 'a moment'}...</span>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSkip}
          className={`w-full py-3 rounded-2xl font-black text-xs flex items-center justify-center gap-2 transition-all ${
            canSkip || countdown === 0
              ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 shadow-lg shadow-amber-400/30 active:scale-95 cursor-pointer'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 active:scale-95'
          }`}
        >
          <span>{canSkip || countdown === 0 ? 'CONTINUE TO GAME' : 'SKIP AD'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
};
