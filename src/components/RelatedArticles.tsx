import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Eye, Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import { BlogArticle } from '../data/blogCategories';
import { soundEngine } from '../lib/sound';

export interface RelatedArticlesProps {
  articles: BlogArticle[];
  title?: string;
  className?: string;
}

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({
  articles,
  title = 'Related Articles & Guides',
  className = '',
}) => {
  if (!articles || articles.length === 0) return null;

  return (
    <section className={`w-full flex flex-col gap-5 ${className}`}>
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h2 className="text-xl font-black text-white flex items-center gap-2.5">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          <span>{title}</span>
        </h2>
        <Link
          to="/blog"
          onClick={() => soundEngine.playSelect()}
          className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
        >
          <span>View All ({articles.length}+)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {articles.slice(0, 3).map((article) => (
          <article
            key={article.id}
            className="group rounded-3xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 p-4 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-lg hover:shadow-cyan-950/20"
          >
            <div className="flex flex-col gap-3">
              {/* Image */}
              <div className="relative w-full h-36 rounded-2xl overflow-hidden bg-slate-950">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-[10px] font-extrabold text-cyan-300 border border-cyan-500/30">
                  {article.category}
                </span>
              </div>

              {/* Title & Summary */}
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                  <Link
                    to={`/blog/${article.slug}`}
                    onClick={() => soundEngine.playSelect()}
                  >
                    {article.title}
                  </Link>
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                  {article.summary}
                </p>
              </div>
            </div>

            {/* Footer Metrics */}
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {article.readingTimeMinutes} min read
                </span>
              </div>
              <Link
                to={`/blog/${article.slug}`}
                onClick={() => soundEngine.playSelect()}
                className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-0.5"
              >
                <span>Read</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
