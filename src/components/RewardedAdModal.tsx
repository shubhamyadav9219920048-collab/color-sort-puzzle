import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Tv,
  Sparkles,
  PlusCircle,
  RotateCcw,
  FastForward,
  CheckCircle2,
  Play,
  Volume2,
  Coins,
} from 'lucide-react';
import { soundEngine } from '../lib/sound';

export type AdRewardType = 'hint' | 'tube' | 'undo' | 'skip' | 'coins';

interface RewardedAdModalProps {
  rewardType: AdRewardType;
  onAdCompleted: (rewardType: AdRewardType) => void;
  onClose: () => void;
}

const REWARD_CONFIGS: Record<
  AdRewardType,
  { title: string; description: string; icon: React.ReactNode; rewardLabel: string }
> = {
  coins: {
    title: 'Watch Ad for +100 Coins',
    description: 'Watch a short video ad to instantly claim 100 free gold coins!',
    icon: <Coins className="w-8 h-8 text-amber-400 animate-pulse" />,
    rewardLabel: '+100 Gold Coins',
  },
  hint: {
    title: 'Watch Ad for Hint',
    description: 'Watch a short video ad to instantly reveal the optimal move!',
    icon: <Sparkles className="w-8 h-8 text-amber-400 animate-pulse" />,
    rewardLabel: '+1 Free Hint',
  },
  tube: {
    title: 'Watch Ad for Extra Tube',
    description: 'Watch a short video ad to get an extra empty tube for this level!',
    icon: <PlusCircle className="w-8 h-8 text-emerald-400 animate-pulse" />,
    rewardLabel: '+1 Extra Tube',
  },
  undo: {
    title: 'Watch Ad for 5 Undos',
    description: 'Watch a short video ad to get 5 free move undos in your inventory!',
    icon: <RotateCcw className="w-8 h-8 text-blue-400 animate-pulse" />,
    rewardLabel: '+5 Free Undos',
  },
  skip: {
    title: 'Watch Ad to Continue',
    description: 'Stuck on a tricky level? Watch an ad to instantly pass this level!',
    icon: <FastForward className="w-8 h-8 text-purple-400 animate-pulse" />,
    rewardLabel: 'Skip Level & Win',
  },
};

export const RewardedAdModal: React.FC<RewardedAdModalProps> = ({
  rewardType,
  onAdCompleted,
  onClose,
}) => {
  const config = REWARD_CONFIGS[rewardType] || REWARD_CONFIGS.coins;
  const [isPlaying, setIsPlaying] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (isPlaying && countdown === 0) {
      setIsFinished(true);
      setIsPlaying(false);
      soundEngine.playVictory();
    }
    return () => clearInterval(timer);
  }, [isPlaying, countdown]);

  const handleStartAd = () => {
    soundEngine.playSelect();
    setIsPlaying(true);
  };

  const handleClaimReward = () => {
    soundEngine.playCoin();
    onAdCompleted(rewardType);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-sm bg-slate-900 border-2 border-purple-500/50 rounded-3xl p-6 shadow-[0_0_50px_rgba(168,85,247,0.3)] flex flex-col items-center text-center gap-5 relative overflow-hidden"
      >
        {/* Ad Header */}
        <div className="flex items-center gap-2 text-xs font-black uppercase text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/30">
          <Tv className="w-4 h-4" />
          <span>Google AdMob Rewarded Video</span>
        </div>

        {/* Reward Icon & Title */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-20 rounded-2xl bg-slate-800 border-2 border-purple-500/40 flex items-center justify-center shadow-lg shadow-purple-500/20">
            {config.icon}
          </div>
          <h2 className="text-xl font-black text-white">{config.title}</h2>
          <p className="text-xs text-slate-300 px-2 leading-relaxed">{config.description}</p>
        </div>

        {/* Ad Player Screen Simulation */}
        <div className="w-full bg-slate-950 rounded-2xl border border-slate-800 p-4 flex flex-col items-center justify-center min-h-[140px] relative overflow-hidden">
          {isPlaying ? (
            <div className="w-full flex flex-col items-center gap-3 py-2">
              <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-sm">
                <Volume2 className="w-4 h-4 animate-bounce" />
                <span>Playing AdMob Sponsor Video...</span>
              </div>

              {/* Fake animated video visualizer bar */}
              <div className="flex items-end gap-1 h-8 my-1">
                {[40, 80, 60, 100, 70, 90, 50, 85].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: ['20%', `${h}%`, '30%'] }}
                    transition={{ repeat: Infinity, duration: 0.8 + i * 0.1 }}
                    className="w-2 bg-gradient-to-t from-purple-600 to-cyan-400 rounded-full"
                  />
                ))}
              </div>

              {/* Progress Countdown */}
              <div className="w-full flex flex-col gap-1.5">
                <div className="flex justify-between text-[10px] font-bold text-slate-400">
                  <span>Reward Unlocks in:</span>
                  <span className="text-amber-400">{countdown}s</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-amber-400"
                    initial={{ width: '0%' }}
                    animate={{ width: `${((5 - countdown) / 5) * 100}%` }}
                    transition={{ ease: 'linear' }}
                  />
                </div>
              </div>
            </div>
          ) : isFinished ? (
            <div className="flex flex-col items-center gap-2 text-emerald-400 py-2">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
              <span className="text-sm font-black">Video Completed!</span>
              <span className="text-xs text-slate-300">Your reward is ready to claim</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-slate-400 py-2">
              <Play className="w-10 h-10 text-purple-400 opacity-80" />
              <span className="text-xs font-bold text-slate-300">Tap below to watch 5s ad</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="w-full flex flex-col gap-2">
          {isFinished ? (
            <button
              onClick={handleClaimReward}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/30 transition-all active:scale-95"
            >
              CLAIM {config.rewardLabel.toUpperCase()}
            </button>
          ) : isPlaying ? (
            <button
              disabled
              className="w-full py-3 rounded-2xl bg-slate-800 text-slate-500 font-bold text-xs opacity-70 cursor-not-allowed"
            >
              Please wait ({countdown}s)...
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={handleStartAd}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-purple-600/30 transition-all active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Play className="w-4 h-4 fill-white" /> Watch Ad
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
