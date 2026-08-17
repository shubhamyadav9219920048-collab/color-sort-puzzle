import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Lightbulb, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Layers, 
  Zap, 
  Trophy, 
  ShieldCheck, 
  Brain, 
  RotateCcw, 
  PlusCircle, 
  HelpCircle,
  Play,
  Flame,
  Star
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';
import { AdSlot } from '../components/AdSlot';
import { NewsletterSubscribe } from '../components/NewsletterSubscribe';
import { soundEngine } from '../lib/sound';

interface TipCard {
  id: number;
  title: string;
  category: 'Beginner' | 'Advanced Lookahead' | 'Bottleneck Breaking' | 'Booster Mastery';
  badgeColor: string;
  rule: string;
  explanation: string;
  pitfall: string;
  proSecret: string;
}

const TIPS_LIST: TipCard[] = [
  {
    id: 1,
    title: 'Protect Your Empty Buffer Flasks at All Costs',
    category: 'Beginner',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    rule: 'Never pour an isolated 1-unit segment into a clear tube without an immediate chain plan.',
    explanation: 'Empty tubes are your volatile swap registers. If you fill both empty flasks with random mismatched top colors, your board capacity drops to zero and you trigger a quick deadlock.',
    pitfall: 'Scattering stray red or yellow segments across empty tubes just to make a quick move.',
    proSecret: 'Only populate an empty tube if doing so immediately enables moving a 2- or 3-segment homogeneous stack from another flask.'
  },
  {
    id: 2,
    title: 'Establish Monochrome Anchors from the Bottom Up',
    category: 'Beginner',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    rule: 'Identify tubes with 2+ matching bottom segments and turn them into one-way collection magnets.',
    explanation: 'Look for flasks that already have matching colors at their base. Treat these as dedicated "anchors" and never pour competing colors into them.',
    pitfall: 'Contaminating an anchor tube that already has 3 matching blue segments with a single stray green layer.',
    proSecret: 'Once an anchor tube has 3 matching layers, all other moves on the board should prioritize locating and transferring the 4th matching segment.'
  },
  {
    id: 3,
    title: 'Prioritize Multi-Layer Contiguous Pours',
    category: 'Advanced Lookahead',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    rule: 'Transfer stacks of 2 or 3 matching layers in a single stream to conserve par moves.',
    explanation: 'When a tube has two contiguous orange layers on top and the receiving tube has space for two, both layers pour simultaneously in one single move count.',
    pitfall: 'Splitting matching contiguous stacks across multiple different tubes.',
    proSecret: 'Contiguous pours create massive volumetric cavities in donor flasks, instantly revealing critical buried keystone colors underneath.'
  },
  {
    id: 4,
    title: 'Excavate Keystone Layers Blocking Multiple Tubes',
    category: 'Advanced Lookahead',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    rule: 'Trace backwards: locate the single buried segment that is bottlenecking 2 or 3 other flasks.',
    explanation: 'A keystone segment is a color trapped at the very bottom of a flask that is preventing full consolidation elsewhere. Focus your early-game moves on digging it out.',
    pitfall: 'Working randomly on superficial top-layer matches that do not advance keystone excavation.',
    proSecret: 'Ask yourself at the start of every puzzle: "Where is the final fourth segment of each color located?"'
  },
  {
    id: 5,
    title: 'Detect Cyclic Dependencies and Break Them Cleanly',
    category: 'Bottleneck Breaking',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    rule: 'When Tube A needs Tube B and Tube B needs Tube A, sacrifice one layer into a buffer flask.',
    explanation: 'Mutual locks happen when all tubes have mismatched tops. The only way to break the cycle is by temporarily parking the topmost layer in an empty buffer.',
    pitfall: 'Parking the top layer of the wrong tube and locking yourself further.',
    proSecret: 'Always sacrifice the top layer of the flask that has the most matching colors at its base.'
  },
  {
    id: 6,
    title: 'Master the Undo Booster Decision Tree Probe',
    category: 'Booster Mastery',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    rule: 'Use Undo as an exploratory tool to test branch feasibility without penalty.',
    explanation: 'Undo is completely free and instant. If you reach a dead end after 3 moves, tap Undo 3 times and take the alternative branch in your mental decision tree.',
    pitfall: 'Restarting the entire level from scratch when a simple 2-step Undo would solve the deadlock.',
    proSecret: 'Undo does not reset your star rating calculation as long as you complete the puzzle within par limits.'
  },
  {
    id: 7,
    title: 'Calculate 3-Star Par Move Limits Before Starting',
    category: 'Advanced Lookahead',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    rule: 'Aim for the shortest mathematical sequence to earn maximum coins and 3 stars.',
    explanation: 'Every stage displays a Par Move count. Complete the puzzle at or below this target number to earn a 3-star rating and maximize your daily coin yield.',
    pitfall: 'Making back-and-forth exploratory pours that waste move counts.',
    proSecret: 'Taking 10 seconds to mentally plan your first 4 moves before touching the screen almost guarantees a 3-star clearance.'
  },
  {
    id: 8,
    title: 'Use the +Tube Booster Strategically on 12-Flask Levels',
    category: 'Booster Mastery',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    rule: 'Save +Tube tokens for master levels with high color fragmentation.',
    explanation: 'Tapping "+ Tube" adds an extra clean clear test tube to your arena. This provides an additional swap buffer, making even the hardest 12-color puzzles manageable.',
    pitfall: 'Using +Tube on early 4-flask levels where a simple Undo would suffice.',
    proSecret: 'Spin the Daily Lucky Wheel every morning to stockpile free +Tube and Smart Hint booster tokens.'
  }
];

const CATEGORIES = ['All', 'Beginner', 'Advanced Lookahead', 'Bottleneck Breaking', 'Booster Mastery'] as const;

export const TipsTricksPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredTips = TIPS_LIST.filter(
    (t) => selectedCategory === 'All' || t.category === selectedCategory
  );

  const tipsSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Master Color Sort Puzzle 3D: Top Tips and Strategies',
    description: 'Expert tips, tricks, and strategies to solve any water sort puzzle level, break deadlocks, and achieve 3-star ratings.',
    step: TIPS_LIST.map((tip, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: tip.title,
      text: `${tip.rule} ${tip.explanation}`,
    })),
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      <SEOHead
        title="Color Sort Puzzle 3D Tips &amp; Tricks - Master Strategy Guide"
        description="Master Color Sort Puzzle 3D with our definitive strategy guide. Learn 8 golden rules, bottleneck breaking techniques, par move optimization, and booster tier lists."
        canonicalUrl="/tips"
        keywords="color sort tips, water sort tricks, how to win color sort, puzzle game strategy, liquid sort cheats, 3 star guide"
        schemaData={tipsSchema}
      />

      <main className="flex-1 w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Tips & Tricks Guide' }]} />

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mt-6 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/15 text-amber-300 text-xs font-bold border border-amber-500/30 mb-4">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Grandmaster Strategy Manual</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Top Tips, Tricks &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-cyan-400">Pro Strategies</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            Stuck on an impossible level? Discover the mathematical heuristics, lookahead drills, and bottleneck evacuation secrets used by the top 1% of puzzle solvers.
          </p>
        </div>

        {/* AdSense Top Display Banner */}
        <AdSlot slotId="tips-top-banner" label="Sponsored Strategy Resources" className="mb-8" />

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
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                    : 'bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Strategy Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {filteredTips.map((tip) => (
            <div
              key={tip.id}
              className="p-6 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition-all shadow-xl flex flex-col justify-between gap-5 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${tip.badgeColor}`}>
                    Rule #{tip.id} • {tip.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center font-bold text-xs">
                    ★
                  </div>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                  {tip.title}
                </h2>

                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-200">
                  <strong>The Golden Rule:</strong> {tip.rule}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {tip.explanation}
                </p>

                {/* Pitfall vs Secret Box */}
                <div className="space-y-2 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span><strong>Avoid:</strong> {tip.pitfall}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Pro Secret:</strong> {tip.proSecret}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Booster Tier List & Optimization Matrix */}
        <section className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">
            <Zap className="w-4 h-4" />
            <span>Power-Up Guide</span>
          </div>
          <h3 className="text-2xl font-black text-white tracking-tight mb-4">
            In-Game Boosters: Strategic Tier List
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
            Understand the optimal time to deploy each booster to maintain three-star ratings and conquer bottleneck stages:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Undo */}
            <div className="p-5 rounded-2xl bg-slate-850 border border-slate-700/60 flex flex-col gap-2">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                <RotateCcw className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Undo (Tier S)</h4>
              <p className="text-xs text-slate-400">
                Reverses your last pour. Best used when you cap a flask too early or miscount available capacity.
              </p>
            </div>

            {/* Smart Hint */}
            <div className="p-5 rounded-2xl bg-slate-850 border border-slate-700/60 flex flex-col gap-2">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Smart Hint (Tier A+)</h4>
              <p className="text-xs text-slate-400">
                Calculates the mathematically optimal next move using our integrated BFS graph solver algorithm.
              </p>
            </div>

            {/* Extra Tube */}
            <div className="p-5 rounded-2xl bg-slate-850 border border-slate-700/60 flex flex-col gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <PlusCircle className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">+ Tube (Tier A)</h4>
              <p className="text-xs text-slate-400">
                Adds a brand new empty clear buffer flask. Essential for untangling 10+ color multi-flask bottlenecks.
              </p>
            </div>

            {/* Level Skip */}
            <div className="p-5 rounded-2xl bg-slate-850 border border-slate-700/60 flex flex-col gap-2">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                <ArrowRight className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Level Skip (Tier B)</h4>
              <p className="text-xs text-slate-400">
                Instantly clears an exceptionally frustrating level with default stars so you can continue your campaign.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Play Box */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-purple-950/40 border border-cyan-500/30 text-center flex flex-col items-center gap-4 mb-12">
          <h3 className="text-2xl font-black text-white">Ready to Put These Tips into Practice?</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Jump into the puzzle arena now. Apply monochrome anchors and keystone excavation to earn your next 3-star victory!
          </p>
          <Link
            to="/play"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-sm shadow-xl shadow-cyan-400/20 transition-all active:scale-95"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Play Color Sort Puzzle 3D Now</span>
          </Link>
        </div>

        {/* Newsletter Banner */}
        <NewsletterSubscribe variant="banner" />
      </main>
    </div>
  );
};
