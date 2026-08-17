import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  Sparkles, 
  BookOpen, 
  Play, 
  ShieldCheck, 
  Brain, 
  Zap, 
  Layers, 
  Smartphone,
  Mail,
  ArrowRight
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';
import { AdSlot } from '../components/AdSlot';
import { NewsletterSubscribe } from '../components/NewsletterSubscribe';
import { soundEngine } from '../lib/sound';

interface FAQItem {
  q: string;
  a: string;
  category: 'General' | 'Gameplay & Rules' | 'Boosters & Power-Ups' | 'Brain Benefits' | 'Technical & Progress';
}

const FAQ_LIST: FAQItem[] = [
  // General
  {
    category: 'General',
    q: 'What is Color Sort Puzzle 3D?',
    a: 'Color Sort Puzzle 3D is a modern web-based logic and spatial puzzle game. Players transfer mixed colored liquids between laboratory flasks and test tubes until each container holds only one uniform color. It combines realistic fluid shaders, soothing soundscapes, and over 100 progressive levels.'
  },
  {
    category: 'General',
    q: 'Is Color Sort Puzzle 3D free to play on mobile and desktop?',
    a: 'Yes, 100% free! You can play directly in any web browser without downloading or installing apps. All levels, custom skins, daily mystery puzzles, and boosters can be unlocked through normal gameplay and achievement milestones.'
  },
  {
    category: 'General',
    q: 'Do I need an active internet connection to play?',
    a: 'No. The entire puzzle physics engine and state manager run locally inside your browser client. Once the web application loads, you can play completely offline in airplane mode.'
  },

  // Gameplay & Rules
  {
    category: 'Gameplay & Rules',
    q: 'What are the exact legal rules for pouring water between tubes?',
    a: 'You can pour liquid from Tube A to Tube B if Tube B is completely empty OR Tube B has the exact same color on its topmost layer AND Tube B has space remaining (each tube holds a maximum of 4 units). All contiguous top layers of the same color transfer automatically in one stream.'
  },
  {
    category: 'Gameplay & Rules',
    q: 'Can I pour different liquid colors on top of each other?',
    a: 'No. The game enforces strict color segregation. You cannot pour a red layer on top of a blue layer unless the receiving flask is completely empty.'
  },
  {
    category: 'Gameplay & Rules',
    q: 'What happens when a flask is completely sorted?',
    a: 'When a flask contains 4 identical color segments, it is permanently locked and displays a celebratory cork and sparkle effect. Once all flasks on the board are uniformly sorted, you achieve victory and receive stars and coins.'
  },
  {
    category: 'Gameplay & Rules',
    q: 'What is a Par Move count and how do I earn 3 stars?',
    a: 'Each level has a calculated Par Move threshold representing the optimal solver path. If you complete the puzzle at or below the Par Move limit, you earn a perfect 3-star rating and the maximum coin payout.'
  },

  // Boosters & Power-Ups
  {
    category: 'Boosters & Power-Ups',
    q: 'How does the Undo booster work?',
    a: 'Undo reverses your most recent pour step, returning both flasks to their exact previous liquid level and state. You can use Undo multiple times in a row to retrace your path if you make an unintended move.'
  },
  {
    category: 'Boosters & Power-Ups',
    q: 'How does the Smart Hint booster work?',
    a: 'The Smart Hint button uses an integrated breadth-first search (BFS) solver to compute the shortest path to victory from your current configuration. It highlights the source and destination tubes with a radiant neon pulse.'
  },
  {
    category: 'Boosters & Power-Ups',
    q: 'How does the Extra Tube (+ Tube) booster work?',
    a: 'Tapping "+ Tube" adds a brand new, empty clear test tube to your puzzle arena for that level. You can add up to 2 extra buffer flasks per stage, which helps untangle even the most congested color bottlenecks.'
  },
  {
    category: 'Boosters & Power-Ups',
    q: 'What is the Level Skip booster?',
    a: 'If you encounter an exceptionally hard level that you wish to bypass, the Skip booster marks the level as cleared with default stars, granting instant access to the subsequent puzzle.'
  },

  // Brain Benefits
  {
    category: 'Brain Benefits',
    q: 'How does Color Sort Puzzle exercise cognitive and memory skills?',
    a: 'Color sorting puzzles exercise the dorsolateral prefrontal cortex by requiring spatial lookahead, working memory buffering (holding multiple candidate moves in mind), and inhibitory impulse control (avoiding premature pours). Regular 10-minute sessions boost focus and mental clarity.'
  },
  {
    category: 'Brain Benefits',
    q: 'Why are water sorting games so effective for anxiety and stress relief?',
    a: 'The combination of predictable fluid dynamics, ASMR-style water acoustic feedback, and the satisfying transition from entropy (disorder) to symmetry stimulates dopamine release and induces a mindful flow state.'
  },

  // Technical & Progress
  {
    category: 'Technical & Progress',
    q: 'How is my game progress and coin balance saved?',
    a: 'Your progress is automatically and continuously saved in your browser HTML5 LocalStorage. As long as you use the same browser and device, your levels, skins, stars, and records remain intact.'
  },
  {
    category: 'Technical & Progress',
    q: 'Can I play Color Sort Puzzle on my smartphone or tablet?',
    a: 'Yes! The game features a mobile-first responsive design with touch haptics and touch-optimized controls, working flawlessly on iPhone, iPad, Android smartphones, tablets, and desktop computers.'
  },
  {
    category: 'Technical & Progress',
    q: 'How can I submit feedback or report an issue?',
    a: 'You can submit feedback via our Contact page or email the development team directly at shubhamyadav9219920048@gmail.com. We respond to all inquiries within 24–48 hours.'
  }
];

const CATEGORIES = ['All', 'General', 'Gameplay & Rules', 'Boosters & Power-Ups', 'Brain Benefits', 'Technical & Progress'] as const;

export const FAQPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    soundEngine.playSelect();
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const filteredFaqs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return FAQ_LIST.filter((item) => {
      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = !q || item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Schema.org FAQ structured data
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_LIST.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      <SEOHead
        title="Color Sort Puzzle 3D FAQ - Frequently Asked Questions & Answers"
        description="Find answers to all frequently asked questions about Color Sort Puzzle 3D. Learn game rules, booster mechanics, 3-star scoring, offline play, cognitive benefits, and tips."
        canonicalUrl="/faq"
        keywords="color sort puzzle faq, water sort questions, how to play color sort, liquid puzzle rules, color sort tips, puzzle game help"
        schemaData={faqSchema}
      />

      <main className="flex-1 w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'FAQ & Help Center' }]} />

        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mt-6 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-500/15 text-cyan-300 text-xs font-bold border border-cyan-500/30 mb-4">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span>Help Center &amp; Knowledge Base</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">Questions</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            Got questions about rules, boosters, par ratings, brain benefits, or progress saving? Search our complete knowledge base below.
          </p>

          {/* Interactive Search Bar */}
          <div className="mt-8 relative max-w-xl mx-auto">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              id="faq-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g., 'extra tube', 'par moves', 'save progress')..."
              aria-label="Search frequently asked questions"
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm shadow-xl"
            />
          </div>
        </div>

        {/* AdSense Top Display Banner */}
        <AdSlot slotId="faq-top-banner" label="Sponsored Help Resources" className="mb-8" />

        {/* Category Filter Pills */}
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

        {/* FAQ Accordion List */}
        <div className="space-y-3 mb-12">
          {filteredFaqs.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-slate-900/60 border border-slate-800">
              <HelpCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white">No matching questions found</h3>
              <p className="text-xs text-slate-400 mt-1">
                Try different keywords or browse our comprehensive Strategy Guide.
              </p>
              <Link
                to="/how-to-play"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 text-xs font-black"
              >
                <span>Read Strategy Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = expandedIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors overflow-hidden"
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-bold text-white flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    <div className={`p-1.5 rounded-lg bg-slate-800 text-slate-300 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-850">
                      <p>{faq.a}</p>
                      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                        <span>Category: <strong className="text-slate-400">{faq.category}</strong></span>
                        <Link to="/play" className="text-cyan-400 hover:underline font-semibold">
                          Practice in Game →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Quick Links Bento Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <Link
            to="/how-to-play"
            className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col gap-2 group"
          >
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-cyan-300">How to Play Guide</h3>
            <p className="text-xs text-slate-400">
              Detailed breakdown of basic mechanics, rules, and pro-tips for clearing hard stages.
            </p>
          </Link>

          <Link
            to="/blog"
            className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 transition-all flex flex-col gap-2 group"
          >
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-purple-300">Brain &amp; Logic Blog</h3>
            <p className="text-xs text-slate-400">
              20 in-depth articles exploring neuroscience, graph theory algorithms, and IQ drills.
            </p>
          </Link>

          <Link
            to="/contact"
            className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col gap-2 group"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-emerald-300">Still Need Help?</h3>
            <p className="text-xs text-slate-400">
              Contact our development and support team directly with feedback or bug reports.
            </p>
          </Link>
        </div>

        {/* Newsletter Signup Banner */}
        <NewsletterSubscribe variant="banner" />
      </main>
    </div>
  );
};
