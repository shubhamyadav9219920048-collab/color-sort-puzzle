import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Calendar,
  Gift,
  Coins,
  Sparkles,
  PlusCircle,
  RotateCcw,
  CheckCircle2,
  Clock,
  Flame,
  Target,
  FastForward,
  Tv,
  Check,
  ChevronRight,
  Trophy,
  Award,
  Crown,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProgress } from '../types';
import { soundEngine } from '../lib/sound';
import {
  DAILY_REWARDS_30,
  DAILY_MISSIONS_LIST,
  getTodayDateString,
  ensureDailyMissions,
  getTimeUntilNextDaySeconds,
  formatSecondsToCountdown,
  MissionDef,
} from '../lib/dailyRewards';

interface DailyRewardModalProps {
  userProgress: UserProgress;
  onClaimDailyReward: (reward: {
    coins: number;
    hints: number;
    tubes: number;
    undos: number;
    skips: number;
    claimedDay: number;
  }) => void;
  onClaimMissionReward: (missionId: string, reward: { coins: number; itemType?: string; itemCount?: number }) => void;
  onClaimAllMissionsBonus: () => void;
  onClose: () => void;
}

export const DailyRewardModal: React.FC<DailyRewardModalProps> = ({
  userProgress,
  onClaimDailyReward,
  onClaimMissionReward,
  onClaimAllMissionsBonus,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'calendar' | 'missions'>('calendar');
  const [countdownSecs, setCountdownSecs] = useState<number>(getTimeUntilNextDaySeconds());

  const todayStr = getTodayDateString();
  const isClaimedToday = userProgress.lastDailyClaimDate === todayStr;

  // Track claimed day numbers in current 30-day cycle
  const claimedDays: number[] = userProgress.claimedDailyDays || [];

  // Determine current claimable day in 1..30 range
  // If claimed today, activeDay is the last claimed day; else it's the next day
  const currentStreak = userProgress.dailyStreak || 0;
  const activeDayNumber = isClaimedToday
    ? Math.max(1, ((currentStreak - 1) % 30) + 1)
    : (currentStreak % 30) + 1;

  const currentReward = DAILY_REWARDS_30.find((d) => d.day === activeDayNumber) || DAILY_REWARDS_30[0];

  // Daily Missions state
  const missionsProgress = ensureDailyMissions(userProgress).dailyMissions || {
    date: todayStr,
    levelsCompleted: 0,
    adsWatched: 0,
    hintsUsed: 0,
    coinsEarned: 0,
    claimedMissionIds: [],
    claimedAllBonus: false,
  };

  // Live countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownSecs(getTimeUntilNextDaySeconds());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const fireConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#3b82f6', '#a855f7', '#ec4899'],
      });
    } catch {
      // ignore
    }
  };

  const handleClaimLoginReward = () => {
    if (isClaimedToday) return;

    soundEngine.playVictory();
    fireConfetti();

    onClaimDailyReward({
      coins: currentReward.coins,
      hints: currentReward.hints,
      tubes: currentReward.tubes,
      undos: currentReward.undos,
      skips: currentReward.skips,
      claimedDay: currentReward.day,
    });
  };

  const handleClaimMission = (mission: MissionDef) => {
    soundEngine.playCoin();
    fireConfetti();
    onClaimMissionReward(mission.id, {
      coins: mission.rewardCoins,
      itemType: mission.rewardItemType,
      itemCount: mission.rewardItemCount,
    });
  };

  const handleClaimBonusAll = () => {
    soundEngine.playVictory();
    fireConfetti();
    onClaimAllMissionsBonus();
  };

  // Calculate mission status helper
  const getMissionCurrentVal = (mId: string) => {
    switch (mId) {
      case 'complete_5_levels':
        return missionsProgress.levelsCompleted;
      case 'watch_3_ads':
        return missionsProgress.adsWatched;
      case 'use_2_hints':
        return missionsProgress.hintsUsed;
      case 'earn_500_coins':
        return missionsProgress.coinsEarned;
      default:
        return 0;
    }
  };

  const completedMissionsCount = DAILY_MISSIONS_LIST.filter(
    (m) => getMissionCurrentVal(m.id) >= m.target
  ).length;

  const canClaimAllBonus =
    completedMissionsCount === DAILY_MISSIONS_LIST.length && !missionsProgress.claimedAllBonus;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-xl max-h-[92vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden relative"
      >
        {/* Top Glow Accent */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-950/90 via-slate-900 to-slate-950/90 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/10">
              <Gift className="w-6 h-6 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white tracking-wide">Daily Rewards & Missions</h2>
                <div className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-[10px] font-black text-amber-300 flex items-center gap-1">
                  <Flame className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>Day {activeDayNumber} / 30</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Next Bonus In:</span>
                <span className="font-mono font-black text-cyan-300">{formatSecondsToCountdown(countdownSecs)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playSelect();
              onClose();
            }}
            className="p-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 pt-3 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between gap-2 z-10">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundEngine.playSelect();
                setActiveTab('calendar');
              }}
              className={`px-4 py-2.5 rounded-t-2xl text-xs font-black transition-all flex items-center gap-2 border-t border-x ${
                activeTab === 'calendar'
                  ? 'bg-slate-900 border-slate-700 text-amber-400 shadow-lg'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>30-Day Login Calendar</span>
              {!isClaimedToday && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              )}
            </button>

            <button
              onClick={() => {
                soundEngine.playSelect();
                setActiveTab('missions');
              }}
              className={`px-4 py-2.5 rounded-t-2xl text-xs font-black transition-all flex items-center gap-2 border-t border-x ${
                activeTab === 'missions'
                  ? 'bg-slate-900 border-slate-700 text-cyan-400 shadow-lg'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>Daily Missions ({completedMissionsCount}/4)</span>
              {canClaimAllBonus && (
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              )}
            </button>
          </div>
        </div>

        {/* Scrollable Main Content */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 flex flex-col gap-4 z-10">
          {/* TAB 1: 30-DAY CALENDAR */}
          {activeTab === 'calendar' && (
            <div className="flex flex-col gap-4">
              {/* Daily Claim Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-slate-900 border border-amber-500/40 flex items-center justify-between gap-3 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center shrink-0">
                    <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-amber-300">
                      <Trophy className="w-6 h-6 animate-bounce" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-amber-300 uppercase tracking-wider">
                      Day {currentReward.day} Bonus
                    </span>
                    <span className="text-sm font-black text-white">{currentReward.label}</span>
                    <span className="text-[11px] text-slate-400">
                      {isClaimedToday
                        ? 'Claimed for today! Next day unlocks in ' + formatSecondsToCountdown(countdownSecs)
                        : 'Tap below to claim today\'s free login reward!'}
                    </span>
                  </div>
                </div>

                {!isClaimedToday ? (
                  <button
                    onClick={handleClaimLoginReward}
                    className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/30 transition-all active:scale-95 shrink-0 flex items-center gap-1.5"
                  >
                    <Gift className="w-4 h-4" />
                    <span>CLAIM</span>
                  </button>
                ) : (
                  <div className="px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-emerald-400 text-xs font-bold flex items-center gap-1.5 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Claimed</span>
                  </div>
                )}
              </div>

              {/* 30-Day Grid */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-black text-slate-400 uppercase tracking-wider px-1">
                  <span>30-Day Reward Schedule</span>
                  <span className="text-amber-400">{claimedDays.length} / 30 Claimed</span>
                </div>

                <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 max-h-[340px] overflow-y-auto pr-1">
                  {DAILY_REWARDS_30.map((item) => {
                    const isClaimed = claimedDays.includes(item.day) || (isClaimedToday && item.day <= activeDayNumber);
                    const isActive = !isClaimedToday && item.day === activeDayNumber;

                    return (
                      <div
                        key={item.day}
                        className={`p-2 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all text-center relative ${
                          item.isUltimate
                            ? 'col-span-2 bg-gradient-to-br from-amber-500/30 via-purple-500/30 to-indigo-900 border-amber-400 shadow-lg shadow-amber-500/20'
                            : item.isBigger
                            ? 'bg-gradient-to-br from-amber-500/15 via-purple-500/10 to-slate-900 border-amber-500/50'
                            : isActive
                            ? 'bg-amber-500/20 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)] animate-pulse'
                            : isClaimed
                            ? 'bg-slate-950/60 border-slate-800 opacity-60'
                            : 'bg-slate-800/40 border-slate-800/80'
                        }`}
                      >
                        {/* Day Tag */}
                        <div className="flex items-center justify-between w-full text-[9px] font-black text-slate-400 px-1">
                          <span>D{item.day}</span>
                          {item.isBigger && (
                            <Crown className="w-3 h-3 text-amber-400" />
                          )}
                        </div>

                        {/* Icon */}
                        <div className="my-0.5">
                          {item.coins > 0 ? (
                            <Coins className={`w-5 h-5 ${item.isBigger ? 'text-amber-300' : 'text-amber-400'}`} />
                          ) : item.hints > 0 ? (
                            <Sparkles className="w-5 h-5 text-amber-300" />
                          ) : item.tubes > 0 ? (
                            <PlusCircle className="w-5 h-5 text-emerald-400" />
                          ) : item.skips > 0 ? (
                            <FastForward className="w-5 h-5 text-purple-400" />
                          ) : (
                            <RotateCcw className="w-5 h-5 text-blue-400" />
                          )}
                        </div>

                        <span className="text-[10px] font-black text-white truncate w-full px-0.5">
                          {item.label}
                        </span>

                        {/* Claimed Check Overlay */}
                        {isClaimed && (
                          <div className="absolute inset-0 bg-slate-950/70 rounded-2xl flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DAILY MISSIONS */}
          {activeTab === 'missions' && (
            <div className="flex flex-col gap-3">
              {/* Daily All-Missions Grand Chest */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-indigo-900 border border-cyan-500/40 flex items-center justify-between gap-3 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300">
                    <Award className="w-7 h-7 text-cyan-300 animate-bounce" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black uppercase text-cyan-300 tracking-wider">
                      Daily Master Chest
                    </span>
                    <span className="text-sm font-black text-white">Complete All 4 Daily Missions</span>
                    <span className="text-[11px] text-slate-300">
                      Reward: +500 Coins + 1 Extra Tube + 1 Skip Level!
                    </span>
                  </div>
                </div>

                {missionsProgress.claimedAllBonus ? (
                  <div className="px-3.5 py-2 rounded-xl bg-slate-800 text-emerald-400 text-xs font-bold flex items-center gap-1.5 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Claimed</span>
                  </div>
                ) : (
                  <button
                    disabled={!canClaimAllBonus}
                    onClick={handleClaimBonusAll}
                    className={`px-4 py-2.5 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 shrink-0 ${
                      canClaimAllBonus
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/30 active:scale-95'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    }`}
                  >
                    <span>CLAIM ALL</span>
                  </button>
                )}
              </div>

              {/* 4 Mission Cards */}
              <div className="flex flex-col gap-2.5">
                {DAILY_MISSIONS_LIST.map((mission) => {
                  const currentVal = getMissionCurrentVal(mission.id);
                  const isCompleted = currentVal >= mission.target;
                  const isClaimed = (missionsProgress.claimedMissionIds || []).includes(mission.id);

                  return (
                    <div
                      key={mission.id}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition-all ${
                        isClaimed
                          ? 'bg-slate-950/50 border-slate-800/80 opacity-60'
                          : isCompleted
                          ? 'bg-cyan-500/10 border-cyan-500/50 shadow-md'
                          : 'bg-slate-950/70 border-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-amber-400 shrink-0">
                          {mission.id === 'complete_5_levels' && <Trophy className="w-5 h-5 text-amber-400" />}
                          {mission.id === 'watch_3_ads' && <Tv className="w-5 h-5 text-purple-400" />}
                          {mission.id === 'use_2_hints' && <Sparkles className="w-5 h-5 text-amber-300" />}
                          {mission.id === 'earn_500_coins' && <Coins className="w-5 h-5 text-amber-400" />}
                        </div>

                        <div className="flex flex-col flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-black text-white truncate">{mission.title}</span>
                            <span className="text-[11px] font-mono font-bold text-slate-400">
                              {Math.min(currentVal, mission.target)} / {mission.target}
                            </span>
                          </div>

                          <p className="text-[10px] text-slate-400 truncate">{mission.description}</p>

                          {/* Progress bar */}
                          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1.5">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                              style={{ width: `${Math.min(100, (currentVal / mission.target) * 100)}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="shrink-0">
                        {isClaimed ? (
                          <div className="p-2 text-emerald-400">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                        ) : isCompleted ? (
                          <button
                            onClick={() => handleClaimMission(mission)}
                            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs shadow-md active:scale-95 transition-all"
                          >
                            CLAIM
                          </button>
                        ) : (
                          <div className="px-2.5 py-1.5 rounded-xl bg-slate-800 text-slate-500 text-[10px] font-bold border border-slate-700">
                            In Progress
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
