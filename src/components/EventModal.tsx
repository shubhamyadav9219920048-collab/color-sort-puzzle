import React from 'react';
import { motion } from 'motion/react';
import {
  X,
  Coins,
  Sparkles,
  Flame,
  Ghost,
  Snowflake,
  Calendar,
  Gift,
  CheckCircle2,
  Zap,
  Lightbulb,
  RotateCcw,
  Crown,
  Check,
  Award,
} from 'lucide-react';
import { UserProgress } from '../types';
import {
  WEEKLY_EVENTS,
  WeeklyEvent,
  getCurrentActiveEvent,
  EventRewardMilestone,
} from '../lib/events';
import { soundEngine } from '../lib/sound';

interface EventModalProps {
  userProgress: UserProgress;
  onSelectEvent: (eventId: string) => void;
  onClaimMilestone: (eventId: string, milestone: EventRewardMilestone) => void;
  onClose: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({
  userProgress,
  onSelectEvent,
  onClaimMilestone,
  onClose,
}) => {
  const currentActiveEvent = getCurrentActiveEvent(userProgress);
  const claimedRewardIds = userProgress.eventProgress?.claimedRewardIds || [];
  const tokenCount = userProgress.eventProgress?.eventTokensCount || 0;

  const renderEventIcon = (iconName: string, className: string = 'w-5 h-5') => {
    switch (iconName) {
      case 'Coins':
        return <Coins className={className} />;
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'Flame':
        return <Flame className={className} />;
      case 'Ghost':
        return <Ghost className={className} />;
      case 'Snowflake':
        return <Snowflake className={className} />;
      default:
        return <Calendar className={className} />;
    }
  };

  const renderRewardIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coins':
        return <Coins className="w-5 h-5 text-amber-400" />;
      case 'Lightbulb':
        return <Lightbulb className="w-5 h-5 text-purple-400" />;
      case 'RotateCcw':
        return <RotateCcw className="w-5 h-5 text-cyan-400" />;
      case 'Crown':
        return <Crown className="w-5 h-5 text-yellow-400" />;
      default:
        return <Gift className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-xl max-h-[92vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden relative"
      >
        {/* Top Glow Accent */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-950/80 via-slate-900 to-amber-950/40 z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg font-black text-white tracking-wide">Weekly Events & Season Boosts</h2>
              <span className="text-xs text-amber-400/80 font-bold">Earn Multipliers & Exclusive Rewards</span>
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

        {/* Scrollable Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 flex flex-col gap-5 z-10">
          {/* Active Event Featured Card */}
          <div
            className={`p-5 rounded-2xl bg-gradient-to-br ${currentActiveEvent.bannerGradient} border border-slate-800 flex flex-col gap-4 relative overflow-hidden shadow-xl`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className={`p-2.5 rounded-xl ${currentActiveEvent.accentBg} border shrink-0`}>
                  {renderEventIcon(currentActiveEvent.iconName, 'w-6 h-6')}
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                    {currentActiveEvent.badgeText}
                  </span>
                  <h3 className="text-xl font-black text-white">{currentActiveEvent.title}</h3>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {currentActiveEvent.description}
            </p>

            {/* Event Perks Banner */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-amber-500/30 flex items-center gap-2.5">
                <Coins className="w-5 h-5 text-amber-400 shrink-0 animate-bounce" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Coin Multiplier</span>
                  <span className="text-sm font-black text-amber-300">
                    {currentActiveEvent.coinMultiplier}x Boost
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-cyan-500/30 flex items-center gap-2.5">
                <Zap className="w-5 h-5 text-cyan-400 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Bonus XP</span>
                  <span className="text-sm font-black text-cyan-300">
                    +{currentActiveEvent.bonusXPPerLevel} XP / level
                  </span>
                </div>
              </div>
            </div>

            {/* Token Collection Progress */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span className="flex items-center gap-1.5 text-amber-300">
                  <Gift className="w-4 h-4 text-amber-400" />
                  Collected {currentActiveEvent.tokenName}
                </span>
                <span className="text-amber-400 font-black text-sm">{tokenCount} Tokens</span>
              </div>
            </div>
          </div>

          {/* Event Reward Milestones */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              Event Reward Milestones
            </span>

            <div className="flex flex-col gap-2.5">
              {currentActiveEvent.milestones.map((m) => {
                const isClaimed = claimedRewardIds.includes(m.id);
                const canClaim = tokenCount >= m.tokensRequired && !isClaimed;

                return (
                  <div
                    key={m.id}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition-all ${
                      isClaimed
                        ? 'bg-slate-950/40 border-slate-800/60 opacity-70'
                        : canClaim
                        ? 'bg-amber-500/10 border-amber-500/50 shadow-lg shadow-amber-950/40'
                        : 'bg-slate-950/70 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
                        {renderRewardIcon(m.iconName)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-white">{m.title}</span>
                        <span className="text-[10px] font-bold text-slate-400">
                          Requires {m.tokensRequired} {currentActiveEvent.tokenName}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isClaimed ? (
                        <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-400 font-bold text-xs flex items-center gap-1">
                          <Check className="w-3.5 h-3.5 text-emerald-400" /> Claimed
                        </span>
                      ) : (
                        <button
                          disabled={!canClaim}
                          onClick={() => {
                            soundEngine.playCoin();
                            onClaimMilestone(currentActiveEvent.id, m);
                          }}
                          className={`px-3.5 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
                            canClaim
                              ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 hover:from-amber-300 hover:to-yellow-400'
                              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          <Gift className="w-3.5 h-3.5" />
                          <span>Claim Reward</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weekly Event Selector */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-black text-slate-300 uppercase tracking-wider">
              Switch Active Weekly Event
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {WEEKLY_EVENTS.map((evt) => {
                const isSelected = evt.id === currentActiveEvent.id;

                return (
                  <button
                    key={evt.id}
                    onClick={() => {
                      soundEngine.playSelect();
                      onSelectEvent(evt.id);
                    }}
                    className={`p-3 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500 shadow-md'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl ${evt.accentBg} border`}>
                        {renderEventIcon(evt.iconName, 'w-4 h-4')}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-white">{evt.title}</span>
                        <span className="text-[10px] font-bold text-amber-400">
                          {evt.coinMultiplier}x Coins Boost
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="p-1 rounded-full bg-amber-500 text-slate-950 shrink-0">
                        <Check className="w-3.5 h-3.5 font-bold" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
