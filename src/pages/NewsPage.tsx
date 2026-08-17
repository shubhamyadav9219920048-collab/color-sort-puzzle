import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Newspaper, 
  Sparkles, 
  Calendar, 
  Tag, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Trophy, 
  Layers, 
  Smartphone, 
  Clock, 
  CheckCircle2,
  ChevronRight,
  Flame
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';
import { AdSlot } from '../components/AdSlot';
import { NewsletterSubscribe } from '../components/NewsletterSubscribe';
import { soundEngine } from '../lib/sound';

interface NewsItem {
  id: string;
  title: string;
  category: 'Game Updates' | 'Events & Tournaments' | 'Patch Notes' | 'Community';
  date: string;
  readTime: string;
  summary: string;
  tag: string;
  badgeColor: string;
  image: string;
  highlights: string[];
}

const NEWS_LIST: NewsItem[] = [
  {
    id: 'update-v2-4-fluid-physics-overhaul',
    title: 'Color Sort 3D v2.4 Released: Fluid Physics Overhaul, 30 New Master Levels & Dark Theme',
    category: 'Game Updates',
    date: 'August 15, 2026',
    readTime: '4 min read',
    summary: 'Our biggest visual and performance upgrade yet! Experience ultra-smooth fluid pouring with realistic meniscuses, high-contrast dark mode, and 30 brand new logic levels.',
    tag: 'Major Release',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    highlights: [
      'Sub-pixel fluid meniscus rendering with dynamic surface turbulence.',
      '30 new procedural campaign stages scaling up to 12 simultaneous flasks.',
      'OLED-optimized true dark theme reducing battery consumption and eye strain.',
      'Harmonic acoustic audio engine with ASMR water pouring sound variations.',
    ],
  },
  {
    id: 'daily-mystery-tournaments-season-1',
    title: 'Daily Mystery Tournaments Kick Off: Compete Globally for Gold Flask Skins',
    category: 'Events & Tournaments',
    date: 'August 12, 2026',
    readTime: '3 min read',
    summary: 'Join thousands of puzzle enthusiasts worldwide in our new 24-hour Daily Challenge leaderboards. Earn exclusive tournament badges and lucky spin coin jackpots.',
    tag: 'Live Event',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80',
    highlights: [
      'Daily 00:00 UTC synchronized mystery level reset for all players.',
      'Par Move tracking with global speed ranking certificates.',
      'Unlockable limited-edition "Alchemy Obsidian" flask skin.',
      'Streak multiplier bonus: earn up to 5x coin rewards for 7-day streaks.',
    ],
  },
  {
    id: 'patch-notes-v2-3-2-performance-fix',
    title: 'Patch Notes v2.3.2: Mobile Touch Optimization, Faster BFS Hints & Zero Latency',
    category: 'Patch Notes',
    date: 'August 05, 2026',
    readTime: '2 min read',
    summary: 'A performance-focused maintenance release reducing memory footprint on mobile devices, optimizing touch tap targets, and accelerating algorithm hint computations.',
    tag: 'Patch Notes',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    highlights: [
      '60% faster Breadth-First Search (BFS) solver computation for smart hints.',
      'Improved responsive touch hitboxes for small smartphone screens.',
      'Zero audio latency optimization on Safari iOS and Android Chrome.',
      'Enhanced HTML5 LocalStorage state serialization to prevent progress loss.',
    ],
  },
  {
    id: 'community-milestone-50k-players',
    title: 'Celebrating 50,000 Active Solvers! Community Growth & Feature Roadmap',
    category: 'Community',
    date: 'July 28, 2026',
    readTime: '3 min read',
    summary: 'We just passed 50,000 monthly active puzzle players across the globe! Check out our upcoming roadmap featuring custom level builders and speedrun modes.',
    tag: 'Community',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&auto=format&fit=crop&q=80',
    highlights: [
      'Over 2.5 million total liquid tubes sorted by players worldwide.',
      'Average player rating of 4.9/5 stars for stress relief and mental focus.',
      'Sneak peek: User-created level sharing and challenge link generation.',
      'Special 500 Coin bonus gift code awarded to all active players.',
    ],
  },
];

const CATEGORIES = ['All', 'Game Updates', 'Events & Tournaments', 'Patch Notes', 'Community'] as const;

export const NewsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredNews = NEWS_LIST.filter(
    (n) => selectedCategory === 'All' || n.category === selectedCategory
  );

  const newsSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Color Sort Puzzle 3D News & Updates',
    description: 'Latest game announcements, major version releases, patch notes, and community tournaments for Color Sort Puzzle 3D.',
    url: 'https://colorsortpuzzle3d.com/news',
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      <SEOHead
        title="Game News &amp; Updates - Color Sort Puzzle 3D"
        description="Stay up to date with the latest patch notes, major game releases, daily mystery tournaments, and feature roadmaps for Color Sort Puzzle 3D."
        canonicalUrl="/news"
        keywords="color sort news, game updates, patch notes, puzzle tournaments, liquid sort release, roadmap"
        schemaData={newsSchema}
      />

      <main className="flex-1 w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'News & Announcements' }]} />

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mt-6 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-500/15 text-cyan-300 text-xs font-bold border border-cyan-500/30 mb-4">
            <Newspaper className="w-4 h-4 text-cyan-400" />
            <span>Official Newsroom</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Latest News &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">Game Updates</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            Discover what’s new in Color Sort Puzzle 3D. Explore recent major releases, engine upgrades, tournament schedules, and upcoming features.
          </p>
        </div>

        {/* AdSense Top Display Banner */}
        <AdSlot slotId="news-top-banner" label="Sponsored Announcements" className="mb-8" />

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  soundEngine.playSelect();
                  setSelectedCategory(cat);
                }}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* News Feed Cards */}
        <div className="space-y-6 mb-12">
          {filteredNews.map((news) => (
            <article
              key={news.id}
              className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all shadow-xl flex flex-col md:flex-row gap-6 group"
            >
              {/* Thumbnail Image */}
              <div className="md:w-64 h-48 rounded-2xl overflow-hidden bg-slate-800 shrink-0 relative">
                <img
                  src={news.image}
                  alt={news.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border backdrop-blur-md ${news.badgeColor}`}>
                  {news.tag}
                </span>
              </div>

              {/* Content Body */}
              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{news.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{news.readTime}</span>
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {news.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {news.summary}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    {news.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">
                    Category: <strong className="text-slate-200">{news.category}</strong>
                  </span>
                  <Link
                    to="/play"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Play Latest Version</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Roadmap Preview Section */}
        <section className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Development Roadmap</span>
          </div>
          <h3 className="text-2xl font-black text-white tracking-tight mb-4">
            What's Coming in Future Updates
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
            Our engineering team is actively working on exciting new gameplay dimensions based on community player feedback:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold w-fit">
                Q4 2026
              </span>
              <h4 className="text-sm font-bold text-white">Multi-Flask Boss Stages</h4>
              <p className="text-xs text-slate-400">
                Special campaign levels with dynamic locks, ice barriers, and secret color reveal flasks.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold w-fit">
                Q1 2027
              </span>
              <h4 className="text-sm font-bold text-white">Community Level Editor</h4>
              <p className="text-xs text-slate-400">
                Design your own custom color sorting stages and generate shareable puzzle links for friends.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold w-fit">
                Q2 2027
              </span>
              <h4 className="text-sm font-bold text-white">Competitive Speedrun Mode</h4>
              <p className="text-xs text-slate-400">
                Real-time 1v1 asynchronous race brackets with par move bonuses and seasonal trophy leagues.
              </p>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <NewsletterSubscribe variant="banner" />
      </main>
    </div>
  );
};
