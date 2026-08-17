import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  ChevronRight, 
  Clock, 
  Eye, 
  ArrowRight, 
  SlidersHorizontal, 
  X, 
  Gamepad2, 
  BookOpen, 
  Sparkles,
  Tag
} from 'lucide-react';
import { BLOG_ARTICLES } from '../data/blogArticles';
import { BLOG_CATEGORIES } from '../data/blogCategories';
import { AdSlot } from '../components/AdSlot';
import { soundEngine } from '../lib/sound';

export const SearchResultsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'relevance' | 'newest' | 'popular'>('relevance');

  useEffect(() => {
    const q = searchParams.get('q') || '';
    setQuery(q);
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playSelect();
    setSearchParams({ q: query.trim() });
  };

  const q = query.toLowerCase().trim();

  // Filter and sort articles
  let results = BLOG_ARTICLES.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesQuery =
      !q ||
      article.title.toLowerCase().includes(q) ||
      article.subtitle.toLowerCase().includes(q) ||
      article.summary.toLowerCase().includes(q) ||
      article.tags.some((t) => t.toLowerCase().includes(q)) ||
      article.content.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  if (sortBy === 'newest') {
    results.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
  } else if (sortBy === 'popular') {
    results.sort((a, b) => (b.views || 0) - (a.views || 0));
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Search Header */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 pt-8 pb-10 border-b border-slate-800/80">
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
            <span className="text-cyan-400 font-bold">Search Results</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Site &amp; Article Search
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-300">
              Search across 20+ comprehensive guides, water sorting mechanics, brain training, and level strategies.
            </p>

            {/* Search Input Bar */}
            <form onSubmit={handleSearchSubmit} className="mt-6 flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-cyan-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search articles, strategies, keywords..."
                  className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 focus:border-cyan-400 text-white placeholder-slate-500 text-sm focus:outline-none shadow-xl"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('');
                      setSearchParams({});
                    }}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="px-6 py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-transform active:scale-95 shadow-lg shadow-cyan-500/20"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Main Results Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Controls Bar: Category Filter & Sort Dropdown */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Dropdown/Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" /> Filter:
            </span>
            <button
              onClick={() => {
                soundEngine.playSelect();
                setSelectedCategory('All');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === 'All'
                  ? 'bg-cyan-500 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              All Topics
            </button>
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  soundEngine.playSelect();
                  setSelectedCategory(cat.name);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.name
                    ? 'bg-cyan-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort By Select */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-bold text-slate-400">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => {
                soundEngine.playSelect();
                setSortBy(e.target.value as any);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="relevance">Most Relevant</option>
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-6">
          <span>
            Found <strong className="text-white">{results.length}</strong> matching result{results.length === 1 ? '' : 's'}
            {query ? ` for "${query}"` : ''}
          </span>
        </div>

        {/* Results List */}
        {results.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center gap-3 bg-slate-900/40 rounded-3xl border border-slate-800">
            <div className="p-4 rounded-full bg-slate-800 text-slate-500">
              <Search className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-black text-white">No Matching Articles Found</h2>
            <p className="text-xs text-slate-400 max-w-sm">
              We couldn't find any results matching your search. Try different keywords or browse all categories.
            </p>
            <button
              onClick={() => {
                setQuery('');
                setSelectedCategory('All');
                setSearchParams({});
              }}
              className="mt-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
            >
              Reset Search Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((article) => (
              <article
                key={article.id}
                className="p-5 rounded-3xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all duration-200 hover:-translate-y-1 shadow-xl flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="relative w-full h-40 rounded-2xl overflow-hidden bg-slate-950">
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md text-[10px] font-extrabold text-cyan-300 border border-cyan-500/30">
                      {article.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {article.readingTimeMinutes} min read
                    </span>
                    <span>•</span>
                    <span>{(article.views / 1000).toFixed(1)}k views</span>
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
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* AdSense Unit */}
        <AdSlot slotId="search-bottom-unit" label="Sponsored Content" />
      </main>
    </div>
  );
};
