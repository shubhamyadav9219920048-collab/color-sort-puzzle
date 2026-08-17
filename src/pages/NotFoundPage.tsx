import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Play, Search, BookOpen, HelpCircle, ArrowLeft, Sparkles, Compass } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { SEOHead } from '../components/SEOHead';
import { soundEngine } from '../lib/sound';
import { getAllArticles } from '../data/blogArticles';

interface NotFoundPageProps {
  onOpenSearch?: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onOpenSearch }) => {
  const navigate = useNavigate();
  const recentArticles = getAllArticles().slice(0, 3);

  return (
    <div className="w-full text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      <SEOHead
        title="404 - Page Not Found | Color Sort Puzzle 3D"
        description="The page or puzzle level you are looking for does not exist or has been rearranged. Jump back into the game or explore our brain training guides."
        canonicalUrl="/404"
      />

      <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex-1 flex flex-col items-center justify-center text-center gap-8">
        {/* Breadcrumb */}
        <div className="w-full text-left">
          <Breadcrumb items={[{ label: '404 - Page Not Found', current: true }]} />
        </div>

        {/* 404 Visual Showcase */}
        <div className="relative flex flex-col items-center">
          {/* Glowing background halo */}
          <div className="absolute -inset-8 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-amber-500/20 rounded-full blur-3xl -z-10" />

          {/* Liquid Tube 404 Illustration */}
          <div className="relative flex items-center justify-center gap-3 sm:gap-4 my-2">
            <span className="text-7xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-600 tracking-tighter drop-shadow-2xl">
              4
            </span>

            {/* Test tube illustration */}
            <div className="w-14 sm:w-20 h-28 sm:h-40 rounded-b-3xl border-4 border-slate-700 bg-slate-900/90 shadow-2xl p-1 flex flex-col justify-end overflow-hidden relative rotate-6 transform hover:rotate-0 transition-transform">
              {/* Liquid layers */}
              <div className="h-6 sm:h-9 bg-purple-500/80 rounded-b-2xl border-t border-purple-400 animate-pulse" />
              <div className="h-6 sm:h-9 bg-amber-500/80 border-t border-amber-400" />
              <div className="h-6 sm:h-9 bg-cyan-400/80 border-t border-cyan-300" />
              {/* Bubbles */}
              <div className="absolute top-4 left-3 w-2 h-2 rounded-full bg-white/40 animate-ping" />
            </div>

            <span className="text-7xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-pink-600 tracking-tighter drop-shadow-2xl">
              4
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-4">
            Oops! This Tube Is Empty or Misplaced
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto mt-2 leading-relaxed">
            The link you followed may be broken, moved, or the colored water got poured into the wrong flask. Let’s get you back on track to solving puzzles!
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full max-w-md">
          <Link
            to="/"
            onClick={() => soundEngine.playSelect()}
            className="flex-1 min-w-[140px] px-6 py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-sm transition-all shadow-lg shadow-cyan-500/20 active:scale-95 flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home</span>
          </Link>

          <Link
            to="/play"
            onClick={() => soundEngine.playSelect()}
            className="flex-1 min-w-[140px] px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm transition-all shadow-lg shadow-purple-600/20 active:scale-95 flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Play Game</span>
          </Link>
        </div>

        {/* Secondary Navigation Options */}
        <div className="w-full max-w-2xl bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col gap-6 text-left shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-cyan-400" />
              Popular Destinations &amp; Guides
            </h2>
            {onOpenSearch && (
              <button
                onClick={() => {
                  soundEngine.playSelect();
                  onOpenSearch();
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search (⌘K)</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              to="/how-to-play"
              onClick={() => soundEngine.playSelect()}
              className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all flex items-start gap-3 group"
            >
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  How to Play Guide
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Learn game mechanics, bottle transfers, and winning conditions.
                </p>
              </div>
            </Link>

            <Link
              to="/tips"
              onClick={() => soundEngine.playSelect()}
              className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-amber-500/40 transition-all flex items-start gap-3 group"
            >
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                  Tips &amp; Strategy Tricks
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Master lookahead depth, dead-end prevention, and booster efficiency.
                </p>
              </div>
            </Link>

            <Link
              to="/blog"
              onClick={() => soundEngine.playSelect()}
              className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-purple-500/40 transition-all flex items-start gap-3 group"
            >
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                  Knowledge Hub (30 Articles)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Read neuroscience research and puzzle logic deep dives.
                </p>
              </div>
            </Link>

            <Link
              to="/faq"
              onClick={() => soundEngine.playSelect()}
              className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-emerald-500/40 transition-all flex items-start gap-3 group"
            >
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Frequently Asked Questions
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Answers to controls, coins, device sync, and offline play.
                </p>
              </div>
            </Link>
          </div>

          {/* Featured Articles */}
          <div className="mt-2 pt-4 border-t border-slate-800/80 flex flex-col gap-2.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Trending Articles You Might Enjoy:
            </span>
            <div className="flex flex-col gap-2">
              {recentArticles.map((art) => (
                <Link
                  key={art.slug}
                  to={`/blog/${art.slug}`}
                  onClick={() => soundEngine.playSelect()}
                  className="text-xs sm:text-sm text-cyan-400 hover:text-cyan-300 hover:underline flex items-center justify-between py-1"
                >
                  <span className="truncate pr-4">• {art.title}</span>
                  <span className="text-xs text-slate-500 shrink-0">{art.readingTimeMinutes} min read</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
