import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FolderTree, 
  ChevronRight, 
  ArrowRight, 
  BookOpen, 
  Brain, 
  Sparkles, 
  Layers, 
  Flame, 
  Target, 
  Activity, 
  Smartphone, 
  Globe 
} from 'lucide-react';
import { BLOG_CATEGORIES } from '../data/blogCategories';
import { BLOG_ARTICLES, getArticlesByCategory } from '../data/blogArticles';
import { soundEngine } from '../lib/sound';

export const BlogCategoriesPage: React.FC = () => {
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
            <span className="text-cyan-400 font-bold">Categories</span>
          </nav>

          <div className="max-w-3xl">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-black uppercase tracking-wider border border-cyan-500/20 inline-flex items-center gap-1.5 mb-3">
              <FolderTree className="w-3.5 h-3.5" />
              10 Specialized Topics
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Explore Articles by <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Category</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Dive into specialized research across cognitive neuroscience, IQ training, logic game graph theory, stress relief, and mobile puzzle mechanics.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_CATEGORIES.map((cat) => {
            const categoryArticles = getArticlesByCategory(cat.name);
            const count = categoryArticles.length;
            return (
              <div
                key={cat.id}
                className="p-6 rounded-3xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all duration-200 hover:-translate-y-1 shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-xl bg-cyan-500/15 text-cyan-300 text-xs font-bold border border-cyan-500/30">
                      {count} Articles
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                      Topic #{cat.id}
                    </span>
                  </div>

                  <h2 className="text-xl font-black text-white group-hover:text-cyan-300 transition-colors">
                    <Link
                      to={`/blog/category/${cat.slug}`}
                      onClick={() => soundEngine.playSelect()}
                    >
                      {cat.name}
                    </Link>
                  </h2>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>

                  {/* Featured articles preview */}
                  <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Top Guides in this Topic:</span>
                    {categoryArticles.slice(0, 2).map((a) => (
                      <Link
                        key={a.id}
                        to={`/blog/${a.slug}`}
                        onClick={() => soundEngine.playSelect()}
                        className="block text-xs font-medium text-slate-300 hover:text-cyan-400 truncate transition-colors"
                      >
                        • {a.title}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Original Research</span>
                  <Link
                    to={`/blog/category/${cat.slug}`}
                    onClick={() => soundEngine.playSelect()}
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    <span>Browse All ({count})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};
