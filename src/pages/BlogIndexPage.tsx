import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  Clock, 
  Eye, 
  ArrowRight, 
  Tag, 
  Flame, 
  ChevronRight,
  Filter,
  CheckCircle2,
  TrendingUp,
  Bookmark
} from 'lucide-react';
import { BLOG_ARTICLES } from '../data/blogArticles';
import { BLOG_CATEGORIES, BlogArticle } from '../data/blogCategories';
import { RecentPostsWidget, PopularPostsWidget } from '../components/RecentPostsWidget';
import { AdSlot } from '../components/AdSlot';
import { soundEngine } from '../lib/sound';

export interface BlogIndexPageProps {
  onOpenSearch?: () => void;
}

export const BlogIndexPage: React.FC<BlogIndexPageProps> = ({ onOpenSearch }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const featuredArticle = BLOG_ARTICLES.find((a) => a.isFeatured) || BLOG_ARTICLES[0];

  const getCategoryCount = (catName: string, catSlug: string) => {
    return BLOG_ARTICLES.filter(
      (a) => a.category.toLowerCase() === catName.toLowerCase() || a.categorySlug === catSlug
    ).length;
  };

  const filteredArticles = BLOG_ARTICLES.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Blog Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 pt-8 pb-12 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <Link to="/" onClick={() => soundEngine.playSelect()} className="hover:text-cyan-400">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-cyan-400 font-bold">Blog &amp; Knowledge Hub</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-black uppercase tracking-wider border border-cyan-500/20 inline-flex items-center gap-1.5 mb-3">
                <BookOpen className="w-3.5 h-3.5" />
                Cognitive Science, Strategy &amp; Gaming
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Color Sort Puzzle <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Insights &amp; Logic</span>
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                Explore 20 comprehensive research guides, expert water sorting theorems, cognitive IQ benchmarks, and stress-reduction neuroscience.
              </p>
            </div>

            {/* Quick Actions / Search Bar Trigger */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => {
                  soundEngine.playSelect();
                  if (onOpenSearch) onOpenSearch();
                }}
                className="px-4 py-3 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-slate-200 text-xs font-medium flex items-center justify-between gap-4 shadow-lg group transition-all"
              >
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span>Search articles, guides, tags...</span>
                </div>
                <kbd className="px-2 py-0.5 rounded-lg bg-slate-800 text-[10px] text-slate-400 font-mono">⌘K</kbd>
              </button>

              <Link
                to="/blog/categories"
                onClick={() => soundEngine.playSelect()}
                className="px-4 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-transform active:scale-95 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
              >
                <Filter className="w-4 h-4" />
                <span>All 10 Categories</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Featured Hero Article */}
        {featuredArticle && selectedCategory === 'All' && !searchQuery && (
          <section className="mb-12">
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 overflow-hidden shadow-2xl transition-all duration-300 group grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative min-h-[260px] sm:min-h-[360px] bg-slate-950 overflow-hidden">
                <img
                  src={featuredArticle.featuredImage}
                  alt={featuredArticle.title}
                  loading="eager"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:hidden" />
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                  Featured Editorial
                </span>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold mb-2">
                    <span>{featuredArticle.category}</span>
                    <span>•</span>
                    <span className="text-slate-400">{featuredArticle.readingTimeMinutes} min read</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white group-hover:text-cyan-300 transition-colors leading-tight">
                    <Link
                      to={`/blog/${featuredArticle.slug}`}
                      onClick={() => soundEngine.playSelect()}
                    >
                      {featuredArticle.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-4">
                    {featuredArticle.summary}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-black text-xs">
                      {featuredArticle.author.name[0]}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{featuredArticle.author.name}</div>
                      <div className="text-[10px] text-slate-400">{featuredArticle.author.role}</div>
                    </div>
                  </div>
                  <Link
                    to={`/blog/${featuredArticle.slug}`}
                    onClick={() => soundEngine.playSelect()}
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-transform active:scale-95 shadow-md"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* AdSense In-Feed Responsive Unit */}
        <AdSlot slotId="blog-top-banner" label="Sponsored Content" />

        {/* Category Navigation Pills */}
        <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => {
              soundEngine.playSelect();
              setSelectedCategory('All');
            }}
            className={`px-4 py-2 rounded-2xl text-xs font-black transition-all whitespace-nowrap ${
              selectedCategory === 'All'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All 20 Articles
          </button>
          {BLOG_CATEGORIES.map((cat) => {
            const count = getCategoryCount(cat.name, cat.slug);
            return (
              <button
                key={cat.id}
                onClick={() => {
                  soundEngine.playSelect();
                  setSelectedCategory(cat.name);
                }}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  selectedCategory === cat.name
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === cat.name ? 'bg-slate-950 text-cyan-300' : 'bg-slate-800 text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 2-Column Layout: Main Article Grid & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Articles Grid (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>
                Showing <strong className="text-white">{filteredArticles.length}</strong> article{filteredArticles.length === 1 ? '' : 's'}
                {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
              </span>
              <Link
                to="/blog/popular"
                onClick={() => soundEngine.playSelect()}
                className="text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1"
              >
                <Flame className="w-3.5 h-3.5" />
                <span>View Most Popular</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="rounded-3xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-xl group"
                >
                  <div className="space-y-3.5">
                    {/* Featured Image */}
                    <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-slate-950">
                      <img
                        src={article.featuredImage}
                        alt={article.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-950/90 backdrop-blur-md text-[10px] font-extrabold text-cyan-300 border border-cyan-500/30">
                        {article.category}
                      </span>
                    </div>

                    {/* Meta info */}
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {article.readingTimeMinutes} min read
                      </span>
                      <span>•</span>
                      <span>{new Date(article.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      <Link
                        to={`/blog/${article.slug}`}
                        onClick={() => soundEngine.playSelect()}
                      >
                        {article.title}
                      </Link>
                    </h3>

                    {/* Summary */}
                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                      {article.summary}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {article.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-lg bg-slate-800 text-[10px] text-slate-400 font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Read Link */}
                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium">By {article.author.name}</span>
                    <Link
                      to={`/blog/${article.slug}`}
                      onClick={() => soundEngine.playSelect()}
                      className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar (4 cols) */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            {/* Play Game CTA Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-950/60 to-slate-900 border border-cyan-500/30 shadow-xl space-y-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Put Theory into Practice</span>
              <h3 className="text-lg font-black text-white">Play Color Sort Puzzle Online</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Enjoy 500 handcrafted levels, daily synchronized challenges, custom tube skins, and zero timer pressure.
              </p>
              <Link
                to="/play"
                onClick={() => soundEngine.playSelect()}
                className="w-full py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-cyan-500/20"
              >
                <span>Launch Game Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Popular Posts Widget */}
            <PopularPostsWidget limit={5} />

            {/* In-Sidebar Ad */}
            <AdSlot slotId="blog-sidebar-rect" format="rectangle" label="Advertisement" />

            {/* Recent Posts Widget */}
            <RecentPostsWidget limit={5} />

            {/* Category Directory Box */}
            <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col gap-3">
              <span className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 pb-2 border-b border-slate-800">
                <Tag className="w-4 h-4" />
                Browse Categories
              </span>
              <div className="flex flex-col gap-1 text-xs">
                {BLOG_CATEGORIES.map((cat) => {
                  const count = getCategoryCount(cat.name, cat.slug);
                  return (
                    <Link
                      key={cat.id}
                      to={`/blog/category/${cat.slug}`}
                      onClick={() => soundEngine.playSelect()}
                      className="py-2 px-3 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-cyan-300 flex items-center justify-between transition-colors"
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono">({count})</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};
