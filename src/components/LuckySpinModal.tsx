import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Coins,
  Lightbulb,
  RotateCcw,
  PlusCircle,
  FastForward,
  Sparkles,
  Tv,
  Gift,
  CheckCircle2,
  Trophy,
} from 'lucide-react';
import { UserProgress } from '../types';
import { soundEngine } from '../lib/sound';

interface LuckySpinModalProps {
  userProgress: UserProgress;
  onClaimReward: (reward: SpinReward) => void;
  onOpenRewardedAds?: () => void;
  onClose: () => void;
}

export interface SpinReward {
  id: string;
  label: string;
  type: 'coins' | 'hints' | 'undos' | 'extraTubes' | 'skips';
  amount: number;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
}

const WHEEL_SEGMENETS: SpinReward[] = [
  {
    id: 'coins_100',
    label: '100 Coins',
    type: 'coins',
    amount: 100,
    icon: <Coins className="w-5 h-5 text-amber-300" />,
    color: '#f59e0b',
    bgGradient: 'from-amber-600 to-amber-700',
  },
  {
    id: 'hints_2',
    label: '2 Hints',
    type: 'hints',
    amount: 2,
    icon: <Lightbulb className="w-5 h-5 text-amber-200" />,
    color: '#eab308',
    bgGradient: 'from-yellow-600 to-amber-600',
  },
  {
    id: 'undos_3',
    label: '3 Undos',
    type: 'undos',
    amount: 3,
    icon: <RotateCcw className="w-5 h-5 text-rose-300" />,
    color: '#f43f5e',
    bgGradient: 'from-rose-600 to-pink-700',
  },
  {
    id: 'tube_1',
    label: '1 Extra Tube',
    type: 'extraTubes',
    amount: 1,
    icon: <PlusCircle className="w-5 h-5 text-cyan-200" />,
    color: '#06b6d4',
    bgGradient: 'from-cyan-600 to-blue-700',
  },
  {
    id: 'skip_1',
    label: '1 Skip Pass',
    type: 'skips',
    amount: 1,
    icon: <FastForward className="w-5 h-5 text-purple-200" />,
    color: '#a855f7',
    bgGradient: 'from-purple-600 to-indigo-700',
  },
  {
    id: 'coins_300',
    label: '300 Jackpot',
    type: 'coins',
    amount: 300,
    icon: <Coins className="w-5 h-5 text-yellow-100" />,
    color: '#fbbf24',
    bgGradient: 'from-amber-500 to-yellow-500',
  },
  {
    id: 'hints_5',
    label: '5 Mega Hints',
    type: 'hints',
    amount: 5,
    icon: <Lightbulb className="w-5 h-5 text-amber-100" />,
    color: '#d97706',
    bgGradient: 'from-amber-600 to-yellow-700',
  },
  {
    id: 'skip_3',
    label: '2 Level Skips',
    type: 'skips',
    amount: 2,
    icon: <FastForward className="w-5 h-5 text-fuchsia-200" />,
    color: '#c084fc',
    bgGradient: 'from-fuchsia-600 to-purple-800',
  },
];

export const LuckySpinModal: React.FC<LuckySpinModalProps> = ({
  userProgress,
  onClaimReward,
  onOpenRewardedAds,
  onClose,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [wonReward, setWonReward] = useState<SpinReward | null>(null);
  const [isAdWatching, setIsAdWatching] = useState(false);
  const [adCountdown, setAdCountdown] = useState(5);

  const todayStr = new Date().toISOString().split('T')[0];
  const isFreeSpinAvailable = !userProgress.lastLuckySpinDate || userProgress.lastLuckySpinDate !== todayStr;

  const numSegments = WHEEL_SEGMENETS.length;
  const segmentAngle = 360 / numSegments;

  const currentRotationRef = useRef(0);
  const lastTickSegmentRef = useRef(-1);

  // Sound ticking as wheel rotates
  useEffect(() => {
    if (!isSpinning) return;

    const interval = setInterval(() => {
      // Estimate segment from current rotation angle
      const normalizedAngle = (currentRotationRef.current % 360 + 360) % 360;
      const currentSegment = Math.floor(normalizedAngle / segmentAngle);

      if (currentSegment !== lastTickSegmentRef.current) {
        soundEngine.playWheelTick();
        lastTickSegmentRef.current = currentSegment;
      }
    }, 60);

    return () => clearInterval(interval);
  }, [isSpinning, segmentAngle]);

  const spinWheel = (isAdExtraSpin = false) => {
    if (isSpinning) return;

    soundEngine.playBooster();
    setIsSpinning(true);
    setWonReward(null);

    // Pick random target segment (0 to 7)
    const winningIndex = Math.floor(Math.random() * numSegments);
    const winningReward = WHEEL_SEGMENETS[winningIndex];

    // Compute target rotation angle so pointer (at top, angle -90deg or 270deg) points to winning segment
    // Target slice angle center
    const targetSliceCenter = winningIndex * segmentAngle + segmentAngle / 2;
    // Pointer is at 270 degrees (top center)
    const offset = 270 - targetSliceCenter;
    const fullSpins = 360 * (5 + Math.floor(Math.random() * 3)); // 5 to 7 full revolutions
    const finalRotation = wheelRotation + fullSpins + offset + (Math.random() * 10 - 5);

    currentRotationRef.current = finalRotation;
    setWheelRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setWonReward(winningReward);

      if (winningReward.amount >= 300 || winningReward.type === 'skips') {
        soundEngine.playJackpot();
      } else {
        soundEngine.playVictory();
      }

      onClaimReward(winningReward);
    }, 4800);
  };

  const handleWatchAdForExtraSpin = () => {
    soundEngine.playSelect();
    setIsAdWatching(true);
    setAdCountdown(5);

    const timer = setInterval(() => {
      setAdCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsAdWatching(false);
          spinWheel(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {/* Rewarded Ad Simulated Player Overlay */}
      <AnimatePresence>
        {isAdWatching && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 bg-slate-950/95 flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="p-4 rounded-3xl bg-purple-500/20 border border-purple-500/40 text-purple-300 mb-4 animate-bounce">
              <Tv className="w-12 h-12 text-amber-300" />
            </div>
            <h3 className="text-xl font-black text-white mb-2">Watching Sponsored Video...</h3>
            <p className="text-sm text-slate-300 max-w-sm mb-6">
              Thank you for supporting Liquid Alchemist! Your free bonus spin unlocks when video ends.
            </p>
            <div className="w-20 h-20 rounded-full border-4 border-amber-400 border-t-transparent animate-spin flex items-center justify-center mb-4">
              <span className="text-2xl font-black text-amber-300">{adCountdown}s</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        className="w-full max-w-lg bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col items-center p-5 sm:p-7 relative overflow-hidden"
      >
        {/* Glow ambient background circles */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="w-full flex items-center justify-between mb-4 z-10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300">
              <Gift className="w-6 h-6 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-black text-white tracking-wide flex items-center gap-1.5">
                Lucky Alchemist Wheel
              </h2>
              <span className="text-xs text-amber-300/80 font-semibold">
                {isFreeSpinAvailable ? '🎁 Daily Free Spin Ready!' : 'Watch ad for Extra Spin!'}
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              soundEngine.playSelect();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wheel Container */}
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 my-4 flex items-center justify-center">
          {/* Wheel Pointer Indicator Top Pin */}
          <div className="absolute -top-3 z-30 flex flex-col items-center pointer-events-none drop-shadow-xl">
            <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-amber-400 filter drop-shadow-[0_2px_8px_rgba(251,191,36,0.8)]" />
            <div className="w-4 h-4 -mt-2 rounded-full bg-amber-300 border-2 border-slate-900 shadow-md" />
          </div>

          {/* Outer Glowing Border Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-amber-400/40 shadow-[0_0_30px_rgba(245,158,11,0.25)] pointer-events-none z-10" />

          {/* Rotating Wheel Canvas / SVG */}
          <div
            className="w-full h-full rounded-full relative overflow-hidden border-4 border-amber-500 shadow-2xl transition-transform duration-[4800ms] ease-out"
            style={{
              transform: `rotate(${wheelRotation}deg)`,
              transitionTimingFunction: 'cubic-bezier(0.15, 0.9, 0.2, 1)',
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              {WHEEL_SEGMENETS.map((seg, idx) => {
                const angle = 360 / numSegments;
                const startAngle = idx * angle;
                const endAngle = (idx + 1) * angle;

                const startRad = (startAngle * Math.PI) / 180;
                const endRad = (endAngle * Math.PI) / 180;

                const x1 = 50 + 50 * Math.cos(startRad);
                const y1 = 50 + 50 * Math.sin(startRad);
                const x2 = 50 + 50 * Math.cos(endRad);
                const y2 = 50 + 50 * Math.sin(endRad);

                const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;

                return (
                  <g key={seg.id}>
                    <path
                      d={pathData}
                      fill={seg.color}
                      className="opacity-90 hover:opacity-100 transition-opacity"
                      stroke="#0f172a"
                      strokeWidth="1.5"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Segment Labels and Icons */}
            {WHEEL_SEGMENETS.map((seg, idx) => {
              const angle = (idx + 0.5) * (360 / numSegments);
              const rad = (angle * Math.PI) / 180;
              const radiusPercent = 34; // distance from center
              const x = 50 + radiusPercent * Math.cos(rad);
              const y = 50 + radiusPercent * Math.sin(rad);

              return (
                <div
                  key={`label_${seg.id}`}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-white pointer-events-none drop-shadow-md"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: `translate(-50%, -50%) rotate(${angle + 90}deg)`,
                  }}
                >
                  <div className="p-1 rounded-full bg-slate-950/40 backdrop-blur-sm shadow-sm">
                    {seg.icon}
                  </div>
                  <span className="text-[10px] font-black text-white tracking-tight whitespace-nowrap mt-0.5">
                    {seg.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Center Hub Glass Orb */}
          <div className="absolute z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 border-4 border-amber-300 shadow-2xl flex flex-col items-center justify-center text-slate-950 font-black text-xs">
            <Sparkles className="w-5 h-5 text-slate-950 animate-spin" />
            <span className="text-[10px] uppercase tracking-wider font-extrabold">SPIN</span>
          </div>
        </div>

        {/* Won Reward Banner Announcement */}
        <AnimatePresence>
          {wonReward && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="mt-2 mb-4 p-3 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 font-black text-center shadow-xl border border-amber-300 flex items-center gap-3"
            >
              <Trophy className="w-6 h-6 text-slate-950 animate-bounce" />
              <div className="flex flex-col text-left">
                <span className="text-xs uppercase tracking-widest text-slate-900 font-extrabold">
                  Congratulations!
                </span>
                <span className="text-base font-black text-slate-950">
                  Won {wonReward.label}!
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Controls */}
        <div className="w-full flex flex-col gap-2.5 z-10">
          {isFreeSpinAvailable ? (
            <button
              disabled={isSpinning}
              onClick={() => spinWheel(false)}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-base shadow-xl shadow-amber-500/30 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            >
              <Sparkles className="w-5 h-5 text-slate-950 animate-spin" />
              <span>CLAIM FREE DAILY SPIN</span>
            </button>
          ) : (
            <button
              disabled={isSpinning}
              onClick={handleWatchAdForExtraSpin}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            >
              <Tv className="w-5 h-5 text-amber-300 animate-pulse" />
              <span>WATCH AD FOR EXTRA SPIN</span>
            </button>
          )}

          <p className="text-[11px] text-slate-400 text-center font-medium">
            {isFreeSpinAvailable
              ? 'Free spin resets every 24 hours. Spin now!'
              : 'Daily free spin claimed! Watch a short ad for bonus spins.'}
          </p>
        </div>
      </motion.div>
    </div>
  );
};
