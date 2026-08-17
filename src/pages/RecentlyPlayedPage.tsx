import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  History, 
  ChevronRight, 
  Play, 
  Star, 
  Clock, 
  Trophy, 
  ArrowRight, 
  Sparkles, 
  RotateCcw 
} from 'lucide-react';
import { UserProgress } from '../types';
import { soundEngine } from '../lib/sound';

export interface RecentlyPlayedPageProps {
  userProgress: UserProgress;
  onSelectLevel?: (levelId: number) => void;
}

export const RecentlyPlayedPage: React.FC<RecentlyPlayedPageProps> = ({
  userProgress,
  onSelectLevel,
}) => {
  const navigate = useNavigate();
  const recents = userProgress.recentlyPlayed || [];

  const handlePlayLevel = (levelId?: number) => {
    soundEngine.playSelect();
    if (levelId && onSelectLevel) {
      onSelectLevel(levelId);
    } else {
      navigate('/play');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <section className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 pt-8 pb-10 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <Link to="/" onClick={() => soundEngine.playSelect()} className="hover:text-cyan-400">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-cyan-400 font-bold">Recently Played</span>
          </nav>

          <div className="max-w-3xl">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-black uppercase tracking-wider border border-cyan-500/20 inline-flex items-center gap-1.5 mb-3">
              <History className="w-3.5 h-3.5" />
              Session History
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Recently Played <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Puzzles</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Review your recent completions, moves count, star ratings, and easily jump back in to master any stage.
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {recents.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center gap-4 bg-slate-900/40 rounded-3xl border border-slate-800 p-6">
            <div className="p-5 rounded-full bg-slate-800 text-slate-500 border border-slate-700">
              <History className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-black text-white">No Recent Matches Found</h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Start playing the 500-level campaign or daily puzzle, and your match history will be recorded automatically.
            </p>
            <button
              onClick={() => handlePlayLevel(1)}
              className="mt-2 px-6 py-3 rounded-2xl bg-cyan-500 text-slate-950 font-black text-xs hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Start Level 1</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recents.map((item) => (
              <div
                key={item.id}
                onClick={() => handlePlayLevel(item.levelId)}
                className="p-5 rounded-3xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all duration-200 hover:-translate-y-1 shadow-xl flex flex-col justify-between cursor-pointer group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-xl bg-cyan-500/15 text-cyan-300 text-[11px] font-bold border border-cyan-500/30 uppercase">
                      {item.type}
                    </span>
                    {item.completed && (
                      <span className="px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                        Solved ✓
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>

                  {item.subtitle && (
                    <p className="text-xs text-slate-400">{item.subtitle}</p>
                  )}

                  <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                    {typeof item.stars === 'number' && item.stars > 0 && (
                      <span className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        {item.stars}/3 Stars
                      </span>
                    )}
                    {typeof item.moves === 'number' && (
                      <span>{item.moves} Moves</span>
                    )}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                  <span className="text-xs text-cyan-400 font-bold flex items-center gap-1 group-hover:underline">
                    <span>Replay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
