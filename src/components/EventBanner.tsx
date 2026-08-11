import React from 'react';
import { motion } from 'motion/react';
import { Coins, Sparkles, Flame, Ghost, Snowflake, Calendar, ChevronRight, Gift } from 'lucide-react';
import { UserProgress } from '../types';
import { getCurrentActiveEvent } from '../lib/events';
import { soundEngine } from '../lib/sound';

interface EventBannerProps {
  userProgress: UserProgress;
  onOpenEventModal: () => void;
}

export const EventBanner: React.FC<EventBannerProps> = ({ userProgress, onOpenEventModal }) => {
  const activeEvent = getCurrentActiveEvent(userProgress);
  const tokenCount = userProgress.eventProgress?.eventTokensCount || 0;

  const renderIcon = () => {
    switch (activeEvent.iconName) {
      case 'Coins':
        return <Coins className="w-5 h-5 text-amber-300 animate-bounce" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-fuchsia-300 animate-pulse" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-rose-400 animate-bounce" />;
      case 'Ghost':
        return <Ghost className="w-5 h-5 text-orange-300 animate-pulse" />;
      case 'Snowflake':
        return <Snowflake className="w-5 h-5 text-cyan-300 animate-spin" />;
      default:
        return <Calendar className="w-5 h-5 text-amber-300" />;
    }
  };

  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full max-w-md mx-auto px-2 mb-2"
    >
      <button
        onClick={() => {
          soundEngine.playSelect();
          onOpenEventModal();
        }}
        className={`w-full p-2.5 rounded-2xl bg-gradient-to-r ${activeEvent.bannerGradient} border border-slate-800 hover:border-amber-500/50 flex items-center justify-between gap-3 shadow-lg transition-all group active:scale-[0.98] relative overflow-hidden`}
      >
        {/* Glow backdrop */}
        <div className="absolute -right-10 -bottom-10 w-28 h-28 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-center gap-2.5 shrink-0">
          <div className={`p-2 rounded-xl ${activeEvent.accentBg} border shrink-0 flex items-center justify-center shadow-inner`}>
            {renderIcon()}
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-black uppercase tracking-wider text-amber-400 px-1.5 py-0.2 rounded bg-amber-500/20 border border-amber-500/30">
                {activeEvent.badgeText}
              </span>
            </div>
            <span className="text-xs font-black text-white leading-snug mt-0.5">
              {activeEvent.title}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
              <Gift className="w-3 h-3 text-amber-400" /> Event Rewards
            </span>
            <span className="text-xs font-black text-amber-300">
              {tokenCount} {activeEvent.tokenName}
            </span>
          </div>
          <div className="p-1.5 rounded-xl bg-slate-800/80 group-hover:bg-amber-500 group-hover:text-slate-950 text-slate-300 transition-all">
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </button>
    </motion.div>
  );
};
