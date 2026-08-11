import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Tv, ExternalLink, X, Info } from 'lucide-react';
import { admobService } from '../lib/admob';

export const AdMobBanner: React.FC = () => {
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const config = admobService.getConfig();

  if (isClosed || !admobService.getIsBannerVisible()) {
    return null;
  }

  return (
    <div className="w-full shrink-0 bg-slate-950/95 border-t border-slate-800/80 px-3 py-1.5 flex items-center justify-between gap-2 z-30 shadow-2xl relative">
      {/* AdMob Sponsor Badge */}
      <div className="flex items-center gap-2 overflow-hidden">
        <div className="px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-[9px] font-black uppercase text-amber-300 flex items-center gap-1 shrink-0">
          <Tv className="w-3 h-3 text-amber-400" />
          <span>AdMob</span>
        </div>

        <div className="flex flex-col truncate">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-black text-white truncate">
              Color Sort Premium - Special Sponsor
            </span>
            <span className="text-[9px] px-1 bg-slate-800 text-slate-400 rounded font-mono hidden sm:inline">
              Ad
            </span>
          </div>
          <span className="text-[9px] text-slate-400 truncate">
            Play 500+ mind-bending liquid puzzles with zero lags!
          </span>
        </div>
      </div>

      {/* Ad Controls */}
      <div className="flex items-center gap-2 shrink-0">
        <a
          href="https://play.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-[10px] flex items-center gap-1 transition-all active:scale-95 shadow-md"
        >
          <span>INSTALL</span>
          <ExternalLink className="w-3 h-3" />
        </a>

        <button
          onClick={() => setIsClosed(true)}
          className="p-1 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-all"
          title="Close Ad"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
