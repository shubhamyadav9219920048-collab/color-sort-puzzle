import React, { useState } from 'react';
import { Tv, ExternalLink, X, ShieldCheck } from 'lucide-react';
import { ADMOB_TEST_UNITS } from '../lib/admob';

interface AdMobBannerProps {
  className?: string;
}

export const AdMobBanner: React.FC<AdMobBannerProps> = ({ className = '' }) => {
  const [isClosed, setIsClosed] = useState<boolean>(false);

  if (isClosed) {
    return null;
  }

  return (
    <div
      className={`w-full shrink-0 bg-slate-950/95 border-t border-amber-500/30 px-3 py-2 flex items-center justify-between gap-2 z-30 shadow-2xl relative ${className}`}
    >
      {/* AdMob Test Sponsor Badge */}
      <div className="flex items-center gap-2 overflow-hidden min-w-0">
        <div className="px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/50 text-[10px] font-black uppercase text-amber-300 flex items-center gap-1 shrink-0">
          <Tv className="w-3.5 h-3.5 text-amber-400" />
          <span>Test AdMob</span>
        </div>

        <div className="flex flex-col truncate min-w-0">
          <div className="flex items-center gap-1.5 truncate">
            <span className="text-[11px] font-black text-white truncate">
              Color Sort Premium Sponsor
            </span>
            <span className="text-[9px] px-1 bg-amber-500/30 text-amber-200 rounded font-mono shrink-0">
              {ADMOB_TEST_UNITS.BANNER.slice(0, 18)}...
            </span>
          </div>
          <span className="text-[10px] text-slate-400 truncate flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400 inline" />
            Official Google Test Ad Unit • 500+ Liquid Puzzles
          </span>
        </div>
      </div>

      {/* Ad Controls */}
      <div className="flex items-center gap-2 shrink-0">
        <a
          href="https://play.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-[10px] flex items-center gap-1 transition-all active:scale-95 shadow-md"
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
