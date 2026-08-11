import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  X,
  Calendar,
  Sparkles,
  Trophy,
  Flame,
  CheckCircle2,
  Coins,
  Play,
  RotateCcw,
  Lightbulb,
  Award,
  Clock,
  ShieldCheck,
  Crown,
  Medal,
  Lock,
} from 'lucide-react';
import { UserProgress } from '../types';
import { soundEngine } from '../lib/sound';

interface DailyChallengeModalProps {
  userProgress: UserProgress;
  onStartDailyChallenge: () => void;
  onClose: () => void;
}

export interface DailyBadgeTier {
  id: string;
  name: string;
  requiredCount: number;
  icon: React.ReactNode;
  gradient: string;
  borderColor: string;
  textColor: string;
  glowColor: string;
}

const BADGE_TIERS: DailyBadgeTier[] = [
  {
    id: 'bronze_badge',
    name: 'Novice Alchemist Badge',
    requiredCount: 1,
    icon: <Medal className="w-6 h-6 text-amber-500" />,
    gradient: 'from-amber-900/40 via-stone-900 to-amber-950/40',
    borderColor: 'border-amber-700/60',
    textColor: 'text-amber-400',
    glowColor: 'rgba(217, 119, 6, 0.3)',
  },
  {
    id: 'silver_badge',
    name: 'Adept Alchemist Badge',
    requiredCount: 3,
    icon: <Award className="w-6 h-6 text-slate-200" />,
    gradient: 'from-slate-800/60 via-slate-900 to-slate-800/60',
    borderColor: 'border-slate-400/60',
    textColor: 'text-slate-200',
    glowColor: 'rgba(226, 232, 240, 0.3)',
  },
  {
    id: 'gold_badge',
    name: 'Master Alchemist Badge',
    requiredCount: 7,
    icon: <Trophy className="w-6 h-6 text-yellow-300" />,
    gradient: 'from-amber-500/20 via-yellow-950/40 to-amber-600/20',
    borderColor: 'border-yellow-400/70',
    textColor: 'text-yellow-300',
    glowColor: 'rgba(250, 204, 21, 0.35)',
  },
  {
    id: 'legend_badge',
    name: 'Grandmaster Alchemist Badge',
    requiredCount: 15,
    icon: <Crown className="w-6 h-6 text-purple-300" />,
    gradient: 'from-purple-900/40 via-indigo-950/40 to-fuchsia-900/40',
    borderColor: 'border-purple-400/70',
    textColor: 'text-purple-300',
    glowColor: 'rgba(192, 132, 252, 0.4)',
  },
];

export const DailyChallengeModal: React.FC<DailyChallengeModalProps> = ({
  userProgress,
  onStartDailyChallenge,
  onClose,
}) => {
  const [timeLeftStr, setTimeLeftStr] = useState<string>('');

  const todayStr = new Date().toISOString().split('T')[0];
  const dateFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  const dailyState = userProgress.dailyChallenge || {
    lastCompletedDate: null,
    currentStreak: 0,
    totalCompleted: 0,
    bestStreak: 0,
    completedDates: [],
  };

  const isCompletedToday = dailyState.lastCompletedDate === todayStr;

  // Real-time Countdown Timer until next midnight reset
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const diffMs = tomorrow.getTime() - now.getTime();
      if (diffMs <= 0) {
        setTimeLeftStr('00h 00m 00s');
        return;
      }

      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      const hStr = String(hours).padStart(2, '0');
      const mStr = String(minutes).padStart(2, '0');
      const sStr = String(seconds).padStart(2, '0');

      setTimeLeftStr(`${hStr}h ${mStr}m ${sStr}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Determine current earned badge and next tier progress
  const totalCompleted = dailyState.totalCompleted || 0;
  let currentBadge = BADGE_TIERS[0];
  let nextBadge = BADGE_TIERS[1];

  for (let i = BADGE_TIERS.length - 1; i >= 0; i--) {
    if (totalCompleted >= BADGE_TIERS[i].requiredCount) {
      currentBadge = BADGE_TIERS[i];
      nextBadge = BADGE_TIERS[i + 1] || null;
      break;
    }
  }

  // Generate last 7 days calendar array
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dayDateStr = d.toISOString().split('T')[0];
    const dayLabel = d.toLocaleDateString('en-US', { weekday: 'narrow' });
    const isToday = dayDateStr === todayStr;
    const isCompleted =
      (dailyState.completedDates || []).includes(dayDateStr) ||
      (isToday && dailyState.lastCompletedDate === todayStr);

    return { dayDateStr, dayLabel, isToday, isCompleted };
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden relative"
      >
        {/* Glow ambient accent */}
        <div className="absolute -top-20 -right-20 w-56 h-56 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-purple-950/50 via-indigo-950/40 to-slate-900 z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg font-black text-white tracking-wide">Daily Challenge</h2>
              <span className="text-xs text-purple-300/80 font-semibold">{dateFormatted}</span>
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

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto flex-1 flex flex-col gap-4 z-10">
          {/* Main Today Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-900/40 via-slate-900 to-indigo-950/40 border border-purple-500/30 flex flex-col items-center text-center gap-2.5 relative overflow-hidden">
            <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-[11px] font-black uppercase tracking-widest text-purple-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>1 New Puzzle Generated Daily</span>
            </span>

            <h3 className="text-2xl font-black text-white tracking-tight">Today's Master Alchemy</h3>
            <p className="text-xs text-slate-300 max-w-xs leading-relaxed">
              Solve today's custom procedural puzzle to earn bonus coins & unlock exclusive badges!
            </p>

            {/* Guaranteed Rewards Box */}
            <div className="w-full mt-1 p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-around text-xs font-black">
              <div className="flex items-center gap-1.5 text-amber-400">
                <Coins className="w-4 h-4" />
                <span>+500 Coins</span>
              </div>
              <div className="flex items-center gap-1.5 text-purple-300">
                <Award className="w-4 h-4" />
                <span>Badge Progress</span>
              </div>
              <div className="flex items-center gap-1.5 text-cyan-300">
                <RotateCcw className="w-3.5 h-3.5" />
                <span>+2 Undos</span>
              </div>
            </div>
          </div>

          {/* Exclusive Badge Showcase */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                Exclusive Badge Status
              </span>
              <span className="text-xs font-bold text-amber-400">
                {totalCompleted} / {nextBadge ? nextBadge.requiredCount : totalCompleted} Solved
              </span>
            </div>

            <div
              className={`p-3.5 rounded-xl border bg-gradient-to-r ${currentBadge.gradient} ${currentBadge.borderColor} flex items-center gap-3.5 shadow-md`}
              style={{ boxShadow: `0 0 15px ${currentBadge.glowColor}` }}
            >
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 shrink-0">
                {totalCompleted >= 1 ? (
                  currentBadge.icon
                ) : (
                  <Lock className="w-6 h-6 text-slate-500" />
                )}
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-black ${currentBadge.textColor}`}>
                    {totalCompleted >= 1 ? currentBadge.name : 'Exclusive Badge Locked'}
                  </span>
                  {totalCompleted >= 1 && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold uppercase">
                      Unlocked
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-400 mt-0.5">
                  {totalCompleted >= 1
                    ? nextBadge
                      ? `Solve ${nextBadge.requiredCount - totalCompleted} more to reach ${nextBadge.name}`
                      : 'You have reached the highest Grandmaster Badge tier!'
                    : 'Complete 1 Daily Challenge to earn your Exclusive Alchemist Badge!'}
                </span>
              </div>
            </div>
          </div>

          {/* Weekly Streak Tracker */}
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-rose-400" />
                7-Day Challenge Tracker
              </span>
              <span className="text-xs font-black text-rose-400">
                {dailyState.currentStreak} Day Streak 🔥
              </span>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {last7Days.map((day, idx) => (
                <div
                  key={day.dayDateStr}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                    day.isCompleted
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                      : day.isToday
                      ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                      : 'bg-slate-900 border-slate-800 text-slate-500'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase mb-1">{day.dayLabel}</span>
                  {day.isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : day.isToday ? (
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-slate-700" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Realtime Countdown until next challenge */}
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-300">
              <Clock className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="text-xs font-extrabold">Next Challenge In:</span>
            </div>
            <span className="text-sm font-black text-cyan-300 tracking-wider font-mono">
              {timeLeftStr || '00h 00m 00s'}
            </span>
          </div>

          {/* Action Button */}
          {isCompletedToday ? (
            <div className="py-3.5 px-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 flex items-center justify-center gap-2 text-emerald-400 font-black text-sm shadow-lg shadow-emerald-950/50">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Today's Challenge Completed! Come back tomorrow.</span>
            </div>
          ) : (
            <button
              onClick={() => {
                soundEngine.playSelect();
                onStartDailyChallenge();
                onClose();
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-black text-sm shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>START TODAY'S DAILY PUZZLE</span>
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
