import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Flame, ChevronRight, TrendingUp } from 'lucide-react';
import { BLOG_ARTICLES } from '../data/blogArticles';
import { soundEngine } from '../lib/sound';

export interface RecentPostsWidgetProps {
  limit?: number;
  className?: string;
}

export const RecentPostsWidget: React.FC<RecentPostsWidgetProps> = ({ limit = 5, className = '' }) => {
  const recentArticles = [...BLOG_ARTICLES]
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, limit);

  return (
    <div className={`p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col gap-4 ${className}`}>
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-cyan-400">
          <Clock className="w-4 h-4" />
          <span>Recent Articles</span>
        </div>
        <Link
          to="/blog"
          onClick={() => soundEngine.playSelect()}
          className="text-[11px] font-bold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          View All
        </Link>
      </div>

      <div className="flex flex-col divide-y divide-slate-800/60">
        {recentArticles.map((article) => (
          <Link
            key={article.id}
            to={`/blog/${article.slug}`}
            onClick={() => soundEngine.playSelect()}
            className="py-2.5 first:pt-0 last:pb-0 group flex items-start gap-3 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
              <img
                src={article.featuredImage}
                alt={article.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-tight">
                {article.title}
              </h4>
              <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                <span>{article.category}</span>
                <span>•</span>
                <span>{article.readingTimeMinutes} min</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const PopularPostsWidget: React.FC<{ limit?: number; className?: string }> = ({
  limit = 5,
  className = '',
}) => {
  const popularArticles = [...BLOG_ARTICLES]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, limit);

  return (
    <div className={`p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col gap-4 ${className}`}>
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-rose-400">
          <Flame className="w-4 h-4" />
          <span>Popular Posts</span>
        </div>
        <Link
          to="/blog/popular"
          onClick={() => soundEngine.playSelect()}
          className="text-[11px] font-bold text-slate-400 hover:text-rose-400 transition-colors"
        >
          Top Ranked
        </Link>
      </div>

      <div className="flex flex-col divide-y divide-slate-800/60">
        {popularArticles.map((article, index) => (
          <Link
            key={article.id}
            to={`/blog/${article.slug}`}
            onClick={() => soundEngine.playSelect()}
            className="py-2.5 first:pt-0 last:pb-0 group flex items-center gap-3 transition-colors"
          >
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
              index === 0 ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' :
              index === 1 ? 'bg-slate-300 text-slate-950' :
              index === 2 ? 'bg-amber-700 text-amber-100' :
              'bg-slate-800 text-slate-400'
            }`}>
              {index + 1}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-white group-hover:text-rose-300 transition-colors line-clamp-2 leading-tight">
                {article.title}
              </h4>
              <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                <span>{(article.views / 1000).toFixed(1)}k views</span>
                <span>•</span>
                <span>{article.category}</span>
              </div>
            </div>

            <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-rose-400 transition-colors shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
};
