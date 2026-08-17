import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, X, Gamepad2, BookOpen, Trash2, ArrowRight, Sparkles, Calendar } from 'lucide-react';
import { UserProgress, FavoriteGameItem } from '../types';
import { toggleFavoriteItem } from '../lib/storage';
import { soundEngine } from '../lib/sound';

export interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProgress: UserProgress;
  onUpdateProgress: (progress: UserProgress) => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  userProgress,
  onUpdateProgress,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const favorites = userProgress.favorites || [];

  const handleRemove = (item: FavoriteGameItem, e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playSelect();
    const { updatedProgress } = toggleFavoriteItem(userProgress, item);
    onUpdateProgress(updatedProgress);
  };

  const handleLaunch = (link: string) => {
    soundEngine.playSelect();
    onClose();
    navigate(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] z-10">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Bookmark className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <h2 className="text-base font-black text-white">Your Saved Favorites</h2>
              <p className="text-xs text-slate-400">Quick access to bookmarked articles and favorite modes</p>
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
          {favorites.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
              <div className="p-4 rounded-full bg-slate-800/80 text-slate-500 border border-slate-700/50">
                <Bookmark className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-white">No Favorites Saved Yet</h3>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Click the bookmark button on any blog article or game mode to save it here for instant access.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {favorites.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleLaunch(item.link)}
                  className="p-3.5 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/30 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 group-hover:text-amber-400 shrink-0">
                      {item.type === 'mode' ? (
                        <Gamepad2 className="w-4 h-4" />
                      ) : (
                        <BookOpen className="w-4 h-4" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-[10px] text-amber-400 font-bold">
                        <span>{item.category || item.type.toUpperCase()}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-slate-400">
                        Added on {new Date(item.addedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <button
                      onClick={(e) => handleRemove(item, e)}
                      title="Remove from favorites"
                      className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>{favorites.length} saved item{favorites.length === 1 ? '' : 's'}</span>
          <button
            onClick={() => {
              onClose();
              navigate('/favorites');
            }}
            className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
          >
            <span>Open Favorites Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
