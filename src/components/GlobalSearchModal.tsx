import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, 
  X, 
  BookOpen, 
  Gamepad2, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Flame, 
  Tag, 
  SlidersHorizontal,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { BLOG_ARTICLES } from '../data/blogArticles';
import { BLOG_CATEGORIES } from '../data/blogCategories';
import { soundEngine } from '../lib/sound';

export interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'articles' | 'guides' | 'modes' | 'categories'>('all');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches
  useEffect(() => {
    try {
      const saved = localStorage.getItem('colorsort_recent_searches');
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  // Focus input on open & keyboard shortcut Cmd+K / Ctrl+K
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveRecentSearch = (term: string) => {
    if (!term.trim()) return;
    const clean = term.trim();
    const updated = [clean, ...recentSearches.filter((s) => s.toLowerCase() !== clean.toLowerCase())].slice(0, 6);
    setRecentSearches(updated);
    try {
      localStorage.setItem('colorsort_recent_searches', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearRecents = () => {
    soundEngine.playSelect();
    setRecentSearches([]);
    try {
      localStorage.removeItem('colorsort_recent_searches');
    } catch (e) {}
  };

  const q = query.toLowerCase().trim();

  // Matched Articles
  const matchedArticles = q
    ? BLOG_ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.subtitle.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)) ||
          a.category.toLowerCase().includes(q) ||
          a.content.toLowerCase().includes(q)
      )
    : [];

  // Matched Categories
  const matchedCategories = q
    ? BLOG_CATEGORIES.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.slug.toLowerCase().includes(q)
      )
    : [];

  // Matched Game Modes & Guides
  const gameModeResults = [
    {
      id: 'classic-mode',
      title: '500-Level Campaign',
      category: 'Game Mode',
      link: '/play',
      description: 'Progress through 500 handcrafted solvable puzzle stages with par move tracking.',
      icon: Gamepad2,
    },
    {
      id: 'daily-challenge',
      title: 'Daily Challenge Puzzle',
      category: 'Daily Game Mode',
      link: '/play',
      description: 'Exclusive daily synchronized brain challenge with streak badges and coin multipliers.',
      icon: Sparkles,
    },
    {
      id: 'how-to-play-guide',
      title: '1,500+ Word Strategy Handbook',
      category: 'Game Guide',
      link: '/how-to-play',
      description: 'Complete water sorting guide, deadlock prevention theorems, and booster tactics.',
      icon: BookOpen,
    },
  ].filter(
    (item) =>
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
  );

  const totalResults = matchedArticles.length + matchedCategories.length + (q ? gameModeResults.length : 0);

  const popularKeywords = [
    'Deadlock Prevention',
    'Neuroscience',
    'Working Memory',
    'Par Moves',
    'Flow State',
    'Graph Theory',
    'Daily Challenge',
    'Speedrun Logic',
  ];

  const handleSelectResult = (url: string, term?: string) => {
    soundEngine.playSelect();
    if (term) handleSaveRecentSearch(term);
    onClose();
    navigate(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 sm:pt-16 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] z-10"
        role="dialog"
        aria-modal="true"
        aria-label="Site Search"
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center gap-3 bg-slate-950/60">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && query.trim()) {
                handleSaveRecentSearch(query);
                onClose();
                navigate(`/search?q=${encodeURIComponent(query.trim())}`);
              }
              if (e.key === 'Escape') onClose();
            }}
            placeholder="Search 20+ articles, puzzle strategies, game modes, topics..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => {
                soundEngine.playSelect();
                setQuery('');
              }}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2.5 bg-slate-950/40 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-xs">
          {[
            { id: 'all', label: 'All Results' },
            { id: 'articles', label: `Articles (${matchedArticles.length})` },
            { id: 'categories', label: `Categories (${matchedCategories.length})` },
            { id: 'modes', label: 'Game Modes' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundEngine.playSelect();
                setActiveFilter(tab.id as any);
              }}
              className={`px-3 py-1 rounded-xl font-bold whitespace-nowrap transition-all ${
                activeFilter === tab.id
                  ? 'bg-cyan-500 text-slate-950'
                  : 'bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Results Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-5">
          {/* If no query entered yet: Show Recent Searches & Popular Suggestions */}
          {!q ? (
            <div className="flex flex-col gap-5">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      Recent Searches
                    </span>
                    <button
                      onClick={handleClearRecents}
                      className="text-[11px] text-slate-500 hover:text-rose-400 transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          soundEngine.playSelect();
                          setQuery(term);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 text-xs font-medium border border-slate-700/50 transition-all flex items-center gap-1.5"
                      >
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{term}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Search Topics */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                  Popular Topics
                </span>
                <div className="flex flex-wrap gap-2">
                  {popularKeywords.map((kw, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        soundEngine.playSelect();
                        setQuery(kw);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700/50 transition-all flex items-center gap-1.5"
                    >
                      <Tag className="w-3 h-3 text-cyan-400" />
                      <span>{kw}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Jump Links */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 flex flex-col gap-2">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Quick Navigation</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => handleSelectResult('/play')}
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-left flex items-center justify-between text-slate-300 hover:text-white"
                  >
                    <span className="font-semibold flex items-center gap-2">
                      <Gamepad2 className="w-4 h-4 text-cyan-400" /> Play Game Online
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                  <button
                    onClick={() => handleSelectResult('/how-to-play')}
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-left flex items-center justify-between text-slate-300 hover:text-white"
                  >
                    <span className="font-semibold flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-emerald-400" /> Strategy Guide
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                  <button
                    onClick={() => handleSelectResult('/blog')}
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-left flex items-center justify-between text-slate-300 hover:text-white"
                  >
                    <span className="font-semibold flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-400" /> 20+ Blog Articles
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                  <button
                    onClick={() => handleSelectResult('/blog/popular')}
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-left flex items-center justify-between text-slate-300 hover:text-white"
                  >
                    <span className="font-semibold flex items-center gap-2">
                      <Flame className="w-4 h-4 text-rose-400" /> Popular Posts
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                </div>
              </div>
            </div>
          ) : totalResults === 0 ? (
            /* No Results Found */
            <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
              <div className="p-4 rounded-full bg-slate-800 text-slate-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-white">No results found for "{query}"</h3>
              <p className="text-xs text-slate-400 max-w-sm">
                Try searching for general keywords like "Brain", "Liquid", "Deadlock", "Strategy", "Focus", or "Memory".
              </p>
            </div>
          ) : (
            /* Active Results List */
            <div className="flex flex-col gap-4">
              {/* Category Matches */}
              {(activeFilter === 'all' || activeFilter === 'categories') && matchedCategories.length > 0 && (
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Categories ({matchedCategories.length})
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {matchedCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleSelectResult(`/blog/category/${cat.slug}`, query)}
                        className="p-3 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-left flex items-center justify-between group transition-all"
                      >
                        <div>
                          <div className="text-xs font-bold text-cyan-300 group-hover:text-cyan-200">
                            {cat.name}
                          </div>
                          <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                            {cat.description}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Article Matches */}
              {(activeFilter === 'all' || activeFilter === 'articles') && matchedArticles.length > 0 && (
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Articles ({matchedArticles.length})
                  </span>
                  <div className="flex flex-col divide-y divide-slate-800/60 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
                    {matchedArticles.map((article) => (
                      <button
                        key={article.id}
                        onClick={() => handleSelectResult(`/blog/${article.slug}`, query)}
                        className="p-3.5 hover:bg-slate-900/80 text-left flex items-start gap-3.5 group transition-colors"
                      >
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-800">
                          <img
                            src={article.featuredImage}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 text-[10px] text-cyan-400 font-bold mb-0.5">
                            <span>{article.category}</span>
                            <span>•</span>
                            <span className="text-slate-400">{article.readingTimeMinutes} min read</span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                            {article.title}
                          </h4>
                          <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                            {article.summary}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 self-center shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Game Modes & Guides */}
              {(activeFilter === 'all' || activeFilter === 'modes' || activeFilter === 'guides') &&
                gameModeResults.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Game Modes &amp; Guides
                    </span>
                    <div className="flex flex-col gap-2">
                      {gameModeResults.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleSelectResult(item.link, query)}
                          className="p-3 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-left flex items-center justify-between group transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                              <item.icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white group-hover:text-cyan-300">
                                {item.title}
                              </div>
                              <div className="text-[11px] text-slate-400 line-clamp-1">
                                {item.description}
                              </div>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 px-5">
          <span>
            Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">ENTER</kbd> for full search page
          </span>
          <button
            onClick={() => {
              if (query.trim()) handleSaveRecentSearch(query);
              onClose();
              navigate(`/search?q=${encodeURIComponent(query.trim())}`);
            }}
            className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
          >
            <span>View Full Search Results</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
