import React from 'react';
import { useNavigate } from 'react-router-dom';
import { History, X, Play, Trophy, Star, ArrowRight, Clock, Flame } from 'lucide-react';
import { UserProgress } from '../types';
import { soundEngine } from '../lib/sound';

export interface RecentlyPlayedModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProgress: UserProgress;
  onSelectLevel?: (levelId: number) => void;
}

export const RecentlyPlayedModal: React.FC<RecentlyPlayedModalProps> = ({
  isOpen,
  onClose,
  userProgress,
  onSelectLevel,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const recents = userProgress.recentlyPlayed || [];

  const handleResume = (item: any) => {
    soundEngine.playSelect();
    onClose();
    if (item.levelId && onSelectLevel) {
      onSelectLevel(item.levelId);
    } else {
      navigate('/play');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] z-10">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-white">Recently Played</h2>
              <p className="text-xs text-slate-400">Continue your puzzle journey right where you left off</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {recents.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
              <div className="p-4 rounded-full bg-slate-800/80 text-slate-500 border border-slate-700/50">
                <History className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-white">No Recent Matches Yet</h3>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Play any puzzle level or daily challenge, and your recent sessions and scores will appear here.
              </p>
              <button
                onClick={() => {
                  soundEngine.playSelect();
                  onClose();
                  navigate('/play');
                }}
                className="mt-2 px-5 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-transform active:scale-95 shadow-lg shadow-cyan-500/20 flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Start Level 1</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {recents.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleResume(item)}
                  className="p-3.5 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/30 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 group-hover:scale-105 transition-transform shrink-0">
                      <Play className="w-4 h-4 fill-cyan-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-[10px] text-cyan-400 font-bold">
                        <span className="uppercase">{item.type}</span>
                        {item.completed && (
                          <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                            Completed
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {typeof item.stars === 'number' && item.stars > 0 && (
                          <span className="flex items-center gap-0.5 text-amber-400 font-bold">
                            <Star className="w-3 h-3 fill-amber-400" />
                            {item.stars}/3
                          </span>
                        )}
                        {typeof item.moves === 'number' && (
                          <span>{item.moves} moves</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className="text-xs font-bold text-cyan-400 group-hover:underline flex items-center gap-1">
                      <span>Play</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Campaign Progress: Level {userProgress.currentLevel}/500</span>
          <button
            onClick={() => {
              onClose();
              navigate('/recent');
            }}
            className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
          >
            <span>Full History</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
