import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Flame, 
  ChevronRight, 
  Clock, 
  Eye, 
  ArrowRight, 
  Sparkles, 
  Trophy, 
  TrendingUp, 
  Bookmark 
} from 'lucide-react';
import { BLOG_ARTICLES } from '../data/blogArticles';
import { RecentPostsWidget } from '../components/RecentPostsWidget';
import { AdSlot } from '../components/AdSlot';
import { soundEngine } from '../lib/sound';

export const PopularPostsPage: React.FC = () => {
  const rankedArticles = [...BLOG_ARTICLES].sort((a, b) => (b.views || 0) - (a.views || 0));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 pt-8 pb-12 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <Link to="/" onClick={() => soundEngine.playSelect()} className="hover:text-cyan-400">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/blog" onClick={() => soundEngine.playSelect()} className="hover:text-cyan-400">
              Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-rose-400 font-bold">Popular Posts</span>
          </nav>

          <div className="max-w-3xl">
            <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-black uppercase tracking-wider border border-rose-500/20 inline-flex items-center gap-1.5 mb-3">
              <Flame className="w-3.5 h-3.5 fill-rose-400" />
              Community Favorites &amp; Top Ranked
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Most Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-400">Puzzle Articles</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              The highest-rated water sorting tutorials, neuroscience breakdowns, and logic game strategies read by over 100,000+ players worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Ranked List (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            {rankedArticles.map((article, index) => (
              <article
                key={article.id}
                className="p-5 sm:p-6 rounded-3xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-rose-500/40 transition-all duration-200 hover:-translate-y-1 shadow-xl flex flex-col sm:flex-row items-start sm:items-center gap-5 group"
              >
                {/* Rank Badge */}
                <div
                  className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center font-black shrink-0 shadow-lg ${
                    index === 0
                      ? 'bg-amber-500 text-slate-950 shadow-amber-500/20'
                      : index === 1
                      ? 'bg-slate-300 text-slate-950 shadow-slate-300/20'
                      : index === 2
                      ? 'bg-amber-700 text-amber-100 shadow-amber-700/20'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  <span className="text-[10px] uppercase tracking-wider leading-none">Rank</span>
                  <span className="text-lg leading-tight">#{index + 1}</span>
                </div>

                {/* Article Image */}
                <div className="w-full sm:w-36 h-28 rounded-2xl overflow-hidden bg-slate-950 shrink-0">
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Article Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1">
                    <span className="text-rose-400 font-bold">{article.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-semibold text-slate-300">
                      <Eye className="w-3 h-3 text-slate-500" />
                      {(article.views / 1000).toFixed(1)}k views
                    </span>
                    <span>•</span>
                    <span>{article.readingTimeMinutes} min</span>
                  </div>

                  <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-rose-300 transition-colors leading-snug">
                    <Link
                      to={`/blog/${article.slug}`}
                      onClick={() => soundEngine.playSelect()}
                    >
                      {article.title}
                    </Link>
                  </h2>

                  <p className="text-xs text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                {/* Read Button */}
                <Link
                  to={`/blog/${article.slug}`}
                  onClick={() => soundEngine.playSelect()}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-rose-500 text-slate-300 hover:text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors self-end sm:self-center shrink-0"
                >
                  <span>Read</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </article>
            ))}

            <AdSlot slotId="popular-bottom-banner" label="Sponsored Content" />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            <RecentPostsWidget limit={6} />
            <AdSlot slotId="popular-sidebar-unit" format="rectangle" />
          </aside>
        </div>
      </main>
    </div>
  );
};
