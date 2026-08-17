import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Bookmark, 
  ChevronRight, 
  Trash2, 
  ArrowRight, 
  Gamepad2, 
  BookOpen, 
  Sparkles,
  Calendar,
  Layers
} from 'lucide-react';
import { UserProgress, FavoriteGameItem } from '../types';
import { toggleFavoriteItem } from '../lib/storage';
import { soundEngine } from '../lib/sound';

export interface FavoritesPageProps {
  userProgress: UserProgress;
  onUpdateProgress: (progress: UserProgress) => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({
  userProgress,
  onUpdateProgress,
}) => {
  const navigate = useNavigate();
  const favorites = userProgress.favorites || [];

  const handleRemove = (item: FavoriteGameItem, e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playSelect();
    const { updatedProgress } = toggleFavoriteItem(userProgress, item);
    onUpdateProgress(updatedProgress);
  };

  const handleLaunch = (link: string) => {
    soundEngine.playSelect();
    navigate(link);
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
            <span className="text-amber-400 font-bold">Saved Favorites</span>
          </nav>

          <div className="max-w-3xl">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-black uppercase tracking-wider border border-amber-500/20 inline-flex items-center gap-1.5 mb-3">
              <Bookmark className="w-3.5 h-3.5 fill-amber-400" />
              Personal Library
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Your Saved <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Favorites</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Bookmarked strategy articles, preferred puzzle game modes, and custom levels stored securely for quick offline access.
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {favorites.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center gap-4 bg-slate-900/40 rounded-3xl border border-slate-800 p-6">
            <div className="p-5 rounded-full bg-slate-800 text-slate-500 border border-slate-700">
              <Bookmark className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-black text-white">No Bookmarks Saved Yet</h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Browse any of our 20+ articles or game modes and click the Bookmark button to save them to your personal dashboard.
            </p>
            <div className="flex flex-wrap gap-3 mt-2">
              <Link
                to="/blog"
                onClick={() => soundEngine.playSelect()}
                className="px-5 py-2.5 rounded-2xl bg-cyan-500 text-slate-950 font-black text-xs hover:bg-cyan-400 transition-all shadow-lg"
              >
                Browse Articles
              </Link>
              <Link
                to="/play"
                onClick={() => soundEngine.playSelect()}
                className="px-5 py-2.5 rounded-2xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition-all border border-slate-700"
              >
                Play Levels
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((item) => (
              <div
                key={item.id}
                onClick={() => handleLaunch(item.link)}
                className="p-5 rounded-3xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all duration-200 hover:-translate-y-1 shadow-xl flex flex-col justify-between cursor-pointer group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-xl bg-amber-500/10 text-amber-300 text-[11px] font-bold border border-amber-500/20">
                      {item.category || item.type.toUpperCase()}
                    </span>
                    <button
                      onClick={(e) => handleRemove(item, e)}
                      className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <span className="text-[10px] text-slate-500 block">
                    Saved on {new Date(item.addedAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-amber-400 font-bold flex items-center gap-1 group-hover:underline">
                    <span>Open Link</span>
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
