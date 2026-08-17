import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FolderTree, 
  ChevronRight, 
  Clock, 
  ArrowRight, 
  BookOpen, 
  Tag, 
  Sparkles,
  ArrowLeft 
} from 'lucide-react';
import { BLOG_CATEGORIES } from '../data/blogCategories';
import { BLOG_ARTICLES, getArticlesByCategory } from '../data/blogArticles';
import { RecentPostsWidget, PopularPostsWidget } from '../components/RecentPostsWidget';
import { AdSlot } from '../components/AdSlot';
import { soundEngine } from '../lib/sound';

export const CategoryDetailPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();

  const category = BLOG_CATEGORIES.find((c) => c.slug === categorySlug);
  const categoryName = category ? category.name : categorySlug?.replace(/-/g, ' ') || 'Category';
  const articles = getArticlesByCategory(categoryName);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Category Hero */}
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
            <Link to="/blog/categories" onClick={() => soundEngine.playSelect()} className="hover:text-cyan-400">
              Categories
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-cyan-400 font-bold">{categoryName}</span>
          </nav>

          <div className="max-w-3xl">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-black uppercase tracking-wider border border-cyan-500/20 inline-flex items-center gap-1.5 mb-3">
              <FolderTree className="w-3.5 h-3.5" />
              Category Archive
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              {categoryName}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              {category?.description || `Explore comprehensive articles, guides, and strategic breakdowns in ${categoryName}.`}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content (Articles + Sidebar) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main List (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
              <span>
                Found <strong className="text-white">{articles.length}</strong> article{articles.length === 1 ? '' : 's'}
              </span>
              <Link
                to="/blog/categories"
                onClick={() => soundEngine.playSelect()}
                className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>All Categories</span>
              </Link>
            </div>

            {articles.length === 0 ? (
              <div className="py-16 text-center text-slate-400">
                <p className="text-base font-bold text-white">No articles found in this category.</p>
                <Link
                  to="/blog"
                  className="mt-4 inline-block px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-black text-xs"
                >
                  View All Articles
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {articles.map((article) => (
                  <article
                    key={article.id}
                    className="rounded-3xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-xl group"
                  >
                    <div className="space-y-3.5">
                      <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-slate-950">
                        <img
                          src={article.featuredImage}
                          alt={article.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          {article.readingTimeMinutes} min read
                        </span>
                        <span>•</span>
                        <span>{new Date(article.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>

                      <h2 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                        <Link
                          to={`/blog/${article.slug}`}
                          onClick={() => soundEngine.playSelect()}
                        >
                          {article.title}
                        </Link>
                      </h2>

                      <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                        {article.summary}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">By {article.author.name}</span>
                      <Link
                        to={`/blog/${article.slug}`}
                        onClick={() => soundEngine.playSelect()}
                        className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                      >
                        <span>Read</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <AdSlot slotId="category-bottom-unit" label="Recommended Reads" />
          </div>

          {/* Sidebar (4 cols) */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            <PopularPostsWidget limit={5} />
            <AdSlot slotId="category-sidebar-rect" format="rectangle" />
            <RecentPostsWidget limit={5} />
          </aside>
        </div>
      </main>
    </div>
  );
};
