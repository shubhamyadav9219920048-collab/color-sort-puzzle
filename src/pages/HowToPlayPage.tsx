import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  HelpCircle, 
  Play, 
  Lightbulb, 
  RotateCcw, 
  PlusCircle, 
  SkipForward, 
  CheckCircle2, 
  AlertTriangle,
  Zap,
  Layers,
  Sparkles,
  Brain,
  Compass,
  Trophy,
  Flame,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Award,
  Clock,
  ArrowRight,
  BookOpen,
  Check
} from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Breadcrumb } from '../components/Breadcrumb';
import { SEOHead } from '../components/SEOHead';
import { soundEngine } from '../lib/sound';

export const HowToPlayPage: React.FC = () => {
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    soundEngine.playSelect();
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "What is the core rule for pouring water between tubes in Color Sort Puzzle 3D?",
      a: "You can pour liquid from Tube A to Tube B if and only if two conditions are met: (1) Tube B is either completely empty OR the topmost color layer of Tube B exactly matches the topmost color layer of Tube A, and (2) Tube B has enough remaining capacity (it cannot exceed 4 total liquid units). When you pour, all contiguous units of that same matching top color are transferred in a single fluid stream as long as space permits."
    },
    {
      q: "Can I pour different colors on top of each other?",
      a: "No. The physics rules strictly forbid placing different colors on top of each other. You cannot pour a blue layer onto a red layer unless the receiving tube is completely empty."
    },
    {
      q: "What is the fastest way to get unstuck without restarting?",
      a: "First, use the 'Undo' button to step backwards to a fork where you still had buffer capacity. Second, tap the 'Smart Hint' lightbulb to let the game's mathematical solver calculate the optimal sequence. Third, if the board is genuinely congested, use the '+ Tube' booster to introduce a brand new empty flask to resolve deadlocks."
    },
    {
      q: "Why is an empty tube considered the most valuable resource in the game?",
      a: "An empty tube is a universal buffer flask (wildcard). It can receive any color layer regardless of color restrictions. Once you deposit a non-matching single layer into an empty flask, that flask loses its wildcard status and can only receive matching colors until emptied again. Preserving empty tubes is the #1 secret of master players."
    },
    {
      q: "How many liquid units does each tube hold?",
      a: "Each standard test tube has a maximum capacity of exactly 4 liquid units. A tube is declared 'completed' or 'solved' when it contains exactly 4 units of the same uniform solid color."
    },
    {
      q: "What determines my 3-star rating on completed levels?",
      a: "Your star rating is determined by move efficiency compared to the level's theoretical Par Move threshold. Completing a level within the par move limit earns 3 stars and the maximum coin jackpot. Even if you exceed par, you still clear the level and unlock the next challenge."
    },
    {
      q: "Are all procedural levels guaranteed to be solvable?",
      a: "Yes. Every level in Color Sort Puzzle 3D is validated by an integrated reverse-shuffle and breadth-first search solver algorithm before being generated. There is always at least one viable mathematical solution path from the initial state."
    },
    {
      q: "How does the '+ Tube' booster work?",
      a: "Tapping '+ Tube' spends in-game coins (or an ad reward) to add an additional clean, empty test tube to your playing board for that level. You can add up to 2 extra tubes per level, making even the most complex 12-color puzzles approachable."
    },
    {
      q: "What is the difference between Daily Challenges and Campaign Levels?",
      a: "Campaign levels are handcrafted sequential puzzles with increasing difficulty chapters. Daily Challenges are fresh, time-limited puzzles published every 24 hours featuring unique color combinations, daily streak multipliers, and exclusive trophy rewards."
    },
    {
      q: "Can I replay completed levels to improve my score or star count?",
      a: "Yes. You can open the Level Select menu at any time and replay any unlocked level to beat your previous move count, earn missing stars, and master alternative sorting paths."
    },
    {
      q: "Does the game save my progress if I close the browser?",
      a: "Yes. Your current campaign level, star ratings, coin balance, unlocked tube skins, daily missions, and theme customizations are securely stored in your local browser storage instantly."
    },
    {
      q: "What happens if I accidentally make a wrong move?",
      a: "You can tap the 'Undo' booster button at any time. Undo reverses your previous pour step completely, restoring both flasks to their exact previous state without penalizing your run."
    }
  ];

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      <SEOHead
        title="Complete Game Guide: How to Play, Strategies, Tips & FAQ"
        description="Comprehensive 1500+ word strategy guide for Color Sort Puzzle 3D. Master liquid sorting rules, beginner tutorials, advanced deadlock avoidance, pro tactics, and FAQs."
        canonicalUrl="/how-to-play"
        keywords="how to play color sort puzzle, water sort strategy, liquid sort tips and tricks, water sorting guide, color sort cheats, puzzle game walkthrough"
        schemaJson={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to Play and Master Color Sort Puzzle 3D",
          "description": "A comprehensive strategic walkthrough explaining fundamental rules, buffer mechanics, and advanced deadlock avoidance in liquid sorting games.",
          "totalTime": "PT10M",
          "step": [
            {
              "@type": "HowToStep",
              "name": "Select the Source Tube",
              "text": "Tap any test tube containing mixed liquids to lift its topmost color layer."
            },
            {
              "@type": "HowToStep",
              "name": "Identify a Valid Destination",
              "text": "Find a target tube that is either completely empty or has the exact same color on top with available capacity."
            },
            {
              "@type": "HowToStep",
              "name": "Execute the Fluid Pour",
              "text": "Tap the target tube to pour the liquid stream. Repeat until all tubes are consolidated into single solid colors."
            }
          ]
        }}
      />

      <Header />

      <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 flex flex-col gap-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'How to Play & Strategy Guide', current: true }]} />

        {/* Page Container */}
        <article className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-10 flex flex-col gap-10">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-gradient-to-tr from-amber-500 to-cyan-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20 shrink-0">
                <BookOpen className="w-7 h-7" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Color Sort Puzzle 3D Strategy &amp; Gameplay Guide
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
                  The Master Handbook • 1,500+ Words of Deep Tactics, Rule Explanations &amp; Pro Strategies
                </p>
              </div>
            </div>

            <Link
              to="/play"
              onClick={() => soundEngine.playSelect()}
              className="self-start sm:self-auto px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/25 active:scale-95 flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>PLAY NOW</span>
            </Link>
          </div>

          {/* Table of Contents Quick Bar */}
          <nav aria-label="Guide Table of Contents" className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col gap-2.5">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
              <Compass className="w-4 h-4" aria-hidden="true" />
              Table of Contents
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs text-slate-300">
              <a href="#rules" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                1. Fundamental Game Rules
              </a>
              <a href="#beginner-guide" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                2. Beginner Walkthrough (Levels 1–15)
              </a>
              <a href="#tips-tricks" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                3. Essential Tips &amp; Tricks
              </a>
              <a href="#advanced-strategies" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                4. Advanced Deadlock Avoidance
              </a>
              <a href="#common-mistakes" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                5. Common Mistakes &amp; Traps
              </a>
              <a href="#boosters-guide" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                6. Booster Mastery System
              </a>
              <a href="#cognitive-benefits" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                7. Cognitive &amp; Neurological Science
              </a>
              <a href="#faq" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                8. Comprehensive FAQ (12 Questions)
              </a>
            </div>
          </nav>

          {/* Section 1: Fundamental Rules */}
          <section id="rules" className="flex flex-col gap-4 text-sm text-slate-300 leading-relaxed scroll-mt-24">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-400 font-black text-xs">SECTION 01</span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Fundamental Game Rules &amp; Liquid Mechanics
              </h2>
            </div>

            <p>
              At its core, <strong className="text-white">Color Sort Puzzle 3D</strong> is a pure deductive logic puzzle disguised as a soothing fluid simulation. The overarching objective is elegantly straightforward: you are presented with a series of glass test tubes containing mixed, stratified layers of colored water. You must sort the liquids by transferring colored layers between tubes until every individual tube contains exactly one homogenous, solid color—or is left completely empty.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <Layers className="w-4 h-4" />
                  <h3>Fixed 4-Unit Capacity</h3>
                </div>
                <p className="text-xs text-slate-400">
                  Every standard flask has an exact volumetric ceiling of 4 liquid units. No tube can hold more than 4 units under any circumstances.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <h3>Top-Color Matching Law</h3>
                </div>
                <p className="text-xs text-slate-400">
                  You can only pour liquid onto a receiving tube if the receiving tube’s topmost visible layer matches the source color, OR if the destination is empty.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-purple-400 font-bold">
                  <Zap className="w-4 h-4" />
                  <h3>Continuous Stream Transfer</h3>
                </div>
                <p className="text-xs text-slate-400">
                  If the source tube has multiple stacked units of the same color on top (e.g. 2 blue units), tapping the target will automatically pour all continuous units in one fluid motion, provided space allows.
                </p>
              </div>
            </div>

            <p>
              A tube is formally locked and declared <strong className="text-emerald-400">"Complete"</strong> when it holds 4 units of a single color. Once complete, you should treat that tube as solved and avoid disrupting it unless an emergency redistribution is required to rescue an adjacent deadlock.
            </p>
          </section>

          {/* Section 2: Beginner Walkthrough */}
          <section id="beginner-guide" className="flex flex-col gap-4 text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-8 scroll-mt-24">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-black text-xs">SECTION 02</span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Beginner Guide &amp; Early Campaign Walkthrough (Levels 1–15)
              </h2>
            </div>

            <p>
              When beginning your sorting journey in Chapters 1 &amp; 2, levels typically contain between 3 to 5 tubes with 2 to 3 distinct colors. The puzzle layout provides 1 or 2 fully empty buffer tubes. Follow these three foundational steps on every early level:
            </p>

            <div className="flex flex-col gap-3">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-cyan-500 text-slate-950 font-black flex items-center justify-center shrink-0 text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Scan for Exposed Majorities</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Identify which color appears most frequently across the top of multiple tubes. If Tube 1 has an orange top and Tube 2 has an orange top, immediately examine whether uniting them will uncover a valuable underlying color.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-cyan-500 text-slate-950 font-black flex items-center justify-center shrink-0 text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Unify Bottom Anchors First</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Look at the bottom-most layer of all tubes. If Tube 3 has 2 purple units at the bottom, your ultimate goal should be to direct all remaining purple units on the board into Tube 3, transforming it into your dedicated purple container.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-cyan-500 text-slate-950 font-black flex items-center justify-center shrink-0 text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Never Squander Your Clean Buffer Tube</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Do not deposit a single random color into an empty tube unless that move directly enables you to empty another tube or uncover a critical underlying layer. An empty tube is your lifeline; once occupied, your maneuverability drops by 50%.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Essential Tips & Tricks */}
          <section id="tips-tricks" className="flex flex-col gap-4 text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-8 scroll-mt-24">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-400 font-black text-xs">SECTION 03</span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Essential Tips &amp; Tricks for Smooth Solving
              </h2>
            </div>

            <p>
              To maintain high move efficiency and earn maximum 3-star ratings across all chapters, integrate these proven cognitive shortcuts into your gameplay:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col gap-2">
                <h3 className="font-bold text-amber-300 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  The "Chain Extraction" Technique
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Before making a pour, visualize 3 steps ahead. If pouring yellow onto yellow uncovers a red layer, verify whether you have a waiting red container. If yes, that move creates a domino reaction that frees up board space rapidly.
                </p>
              </div>

              <div className="p-4.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col gap-2">
                <h3 className="font-bold text-amber-300 flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-amber-400" />
                  Proactive Undo Habit
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  If you make 2 consecutive moves and notice that no new layers were revealed and no tubes were freed, you have likely ventured into an unproductive loop. Tap 'Undo' immediately rather than forcing more moves into a blind corner.
                </p>
              </div>

              <div className="p-4.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col gap-2">
                <h3 className="font-bold text-amber-300 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-amber-400" />
                  Count Unit Frequencies
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Every color in a standard level has exactly 4 units total across all tubes. If you see 3 units of green already exposed and ready to combine, focus on unearthing the single 4th hidden green unit to permanently complete that color.
                </p>
              </div>

              <div className="p-4.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col gap-2">
                <h3 className="font-bold text-amber-300 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-amber-400" />
                  Maintain an "Evacuation Tube"
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Always designate one specific tube as your temporary transfer hub. Use it strictly to hold temporary layers while you consolidate a permanent 4-stack, then immediately evacuate it back to 0 units.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Advanced Deadlock Avoidance Strategies */}
          <section id="advanced-strategies" className="flex flex-col gap-4 text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-8 scroll-mt-24">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-400 font-black text-xs">SECTION 04</span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Advanced Deadlock Avoidance &amp; Theoretical Mastery
              </h2>
            </div>

            <p>
              As you enter Master and Grandmaster tiers (Levels 40–100+), puzzles introduce 8 to 14 distinct colors and complex layer stratification. At this tier, casual intuition will lead to deadlocks. You must apply formal puzzle theory:
            </p>

            <div className="flex flex-col gap-4">
              <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/30 flex flex-col gap-2">
                <h3 className="text-base font-bold text-purple-300 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-400" />
                  1. The Law of Bottle Entropy (Layer Homogeneity)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Entropy in color sorting is defined as the number of color transitions within all tubes. A tube containing [Red, Blue, Green, Yellow] has an entropy of 4. Your primary mathematical goal on every turn is to <strong className="text-white">reduce total board entropy</strong>. Any move that consolidates 2 adjacent layers of the same color reduces entropy and brings you closer to the solvable graph state.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/30 flex flex-col gap-2">
                <h3 className="text-base font-bold text-purple-300 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-purple-400" />
                  2. Circular Dependency Cycle Breaking
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  A classic deadlock occurs when Color A is trapped under Color B in Flask 1, while Color B is trapped under Color A in Flask 2. To break this closed cycle without an extra empty tube:
                </p>
                <ul className="list-disc list-inside text-xs sm:text-sm text-slate-400 space-y-1 pl-2">
                  <li>Transfer the top layer of Flask 1 into your temporary buffer tube.</li>
                  <li>Transfer the uncovered secondary layer into an existing matching partial stack elsewhere on the board.</li>
                  <li>Reclaim the buffer tube immediately by re-routing the top layer.</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/30 flex flex-col gap-2">
                <h3 className="text-base font-bold text-purple-300 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-purple-400" />
                  3. Parity &amp; Capacity Reservation
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Never pour 1 unit of a color into a tube that already contains 2 units of that color if the 4th unit is still buried 3 layers deep in a different tube, unless that move immediately liberates a completely empty flask. Leaving a tube at 3/4 capacity with only 1 slot open severely limits your ability to use that tube as a temporary staging point.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Common Mistakes */}
          <section id="common-mistakes" className="flex flex-col gap-4 text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-8 scroll-mt-24">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-400 font-black text-xs">SECTION 05</span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                5 Fatal Mistakes &amp; How to Avoid Them
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold">
                  <AlertTriangle className="w-4 h-4" />
                  <h3>1. The "Single Drop" Trap</h3>
                </div>
                <p className="text-xs text-slate-400">
                  Pouring a single unit of liquid into a completely clean, empty tube without having the other 3 matching units ready to follow. This renders your empty tube useless as a wildcard.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold">
                  <AlertTriangle className="w-4 h-4" />
                  <h3>2. Blind Forward Pouring</h3>
                </div>
                <p className="text-xs text-slate-400">
                  Making moves simply because they are visually available, rather than asking: "What layer does this uncover, and what will I do with that newly uncovered layer?"
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold">
                  <AlertTriangle className="w-4 h-4" />
                  <h3>3. Premature Level Restarts</h3>
                </div>
                <p className="text-xs text-slate-400">
                  Giving up and restarting from scratch when you are merely 2 moves away from the solution. Using Undo or a Smart Hint can save your progress and teach you the optimal branch.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold">
                  <AlertTriangle className="w-4 h-4" />
                  <h3>4. Fragmenting Colors Across 3 Tubes</h3>
                </div>
                <p className="text-xs text-slate-400">
                  Splitting 4 units of yellow across 3 different tubes (1 in Tube A, 1 in Tube B, 2 in Tube C). Always consolidate colors into a single target container whenever possible.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Booster Mastery */}
          <section id="boosters-guide" className="flex flex-col gap-4 text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-8 scroll-mt-24">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-400 font-black text-xs">SECTION 06</span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Booster Mastery &amp; Tactical Economy
              </h2>
            </div>

            <p>
              Color Sort Puzzle 3D provides 4 strategic power-ups to help you navigate tricky puzzles and maintain your win streaks:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center text-center gap-2">
                <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-sm">Undo Booster</h3>
                <p className="text-xs text-slate-400">
                  Instantly rewinds your last pour step, restoring both source and destination flasks to their exact previous liquid state.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center text-center gap-2">
                <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-sm">Smart Hint</h3>
                <p className="text-xs text-slate-400">
                  Executes our integrated BFS solver engine to find the shortest mathematical path to victory and flashes the exact tubes to tap.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center text-center gap-2">
                <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <PlusCircle className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-sm">+ Extra Tube</h3>
                <p className="text-xs text-slate-400">
                  Adds an additional brand new empty test tube directly to your active game board (up to 2 extra tubes per level) to instantly resolve congestion.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center text-center gap-2">
                <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  <SkipForward className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-sm">Skip Level</h3>
                <p className="text-xs text-slate-400">
                  Bypasses an exceptionally difficult level, awarding completion stars and immediately unlocking the next sequential challenge.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7: Cognitive Science */}
          <section id="cognitive-benefits" className="flex flex-col gap-4 text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-8 scroll-mt-24">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-lg bg-teal-500/20 text-teal-400 font-black text-xs">SECTION 07</span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Cognitive Science &amp; Brain Wellness Benefits
              </h2>
            </div>

            <p>
              Why are water sorting puzzles so intensely satisfying and mentally rejuvenating? Cognitive scientists and neuropsychologists attribute their therapeutic appeal to three core psychological phenomena:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col gap-2">
                <h3 className="font-bold text-teal-300 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-teal-400" />
                  Working Memory &amp; Executive Function
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Planning multi-step color sequences exercises the dorsolateral prefrontal cortex, enhancing mental manipulation of spatial arrays and short-term memory recall.
                </p>
              </div>

              <div className="p-4.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col gap-2">
                <h3 className="font-bold text-teal-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-400" />
                  Dopaminergic Feedback Loops
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Completing a solid tube and watching the liquid bubble produces immediate micro-accomplishments, stimulating dopamine release and alleviating daily cognitive fatigue.
                </p>
              </div>

              <div className="p-4.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col gap-2">
                <h3 className="font-bold text-teal-300 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-400" />
                  Low-Arousal Meditative Flow State
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  With zero punitive timers or high-stress countdowns, players enter a calm, self-paced meditative state characterized by alpha brain wave synchronization.
                </p>
              </div>
            </div>
          </section>

          {/* Section 8: Comprehensive FAQ */}
          <section id="faq" className="flex flex-col gap-4 border-t border-slate-800 pt-8 scroll-mt-24">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-400 font-black text-xs">SECTION 08</span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Frequently Asked Questions (FAQ)
              </h2>
            </div>
            <p className="text-sm text-slate-400 mb-2">
              Have specific questions about liquid physics, booster economy, or cross-platform gameplay? Explore our complete official answers below:
            </p>

            <div className="flex flex-col gap-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen 
                        ? 'bg-slate-900 border-cyan-500/40 shadow-lg shadow-cyan-950/20' 
                        : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left font-bold text-sm sm:text-base text-white hover:text-cyan-300 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-400 text-xs font-black flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span>{faq.q}</span>
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-cyan-400 shrink-0" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" aria-hidden="true" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 mt-1">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* CTA Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex flex-col gap-1.5 text-center sm:text-left">
              <h3 className="text-xl font-black text-white">Ready to Put Your Skills to the Test?</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Jump straight into Level 1 or test your cognitive endurance on today's Daily Challenge!
              </p>
            </div>

            <Link
              to="/play"
              onClick={() => soundEngine.playVictory()}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-black text-sm tracking-wide transition-all shadow-lg shadow-emerald-500/30 active:scale-95 flex items-center gap-2 shrink-0"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>PLAY COLOR SORT NOW</span>
            </Link>
          </div>

          {/* Cross Links Footer */}
          <div className="pt-6 border-t border-slate-800 flex flex-wrap gap-4 text-xs text-slate-400">
            <span>Explore More:</span>
            <Link to="/about" className="text-cyan-400 hover:underline">About Us</Link>
            <span>•</span>
            <Link to="/contact" className="text-cyan-400 hover:underline">Contact &amp; Support</Link>
            <span>•</span>
            <Link to="/privacy" className="text-cyan-400 hover:underline">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="text-cyan-400 hover:underline">Terms &amp; Conditions</Link>
            <span>•</span>
            <Link to="/cookies" className="text-cyan-400 hover:underline">Cookie Policy</Link>
            <span>•</span>
            <Link to="/disclaimer" className="text-cyan-400 hover:underline">Legal Disclaimer</Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};
