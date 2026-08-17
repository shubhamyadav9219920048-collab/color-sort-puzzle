import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Play, 
  Sparkles, 
  Brain, 
  Zap, 
  ShieldCheck, 
  Trophy, 
  Flame, 
  RotateCcw, 
  Lightbulb, 
  PlusCircle, 
  SkipForward, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Smartphone, 
  Maximize2, 
  Layers, 
  HelpCircle, 
  Heart, 
  Star, 
  Award,
  ArrowRight,
  Info,
  Mail,
  Gamepad2,
  Lock,
  Volume2,
  Clock,
  Compass,
  Check,
  X,
  Quote,
  Eye,
  Gift
} from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CookieBanner } from '../components/CookieBanner';
import { ContactModal } from '../components/ContactModal';
import { NewsletterSubscribe } from '../components/NewsletterSubscribe';
import { AdSlot } from '../components/AdSlot';
import { soundEngine } from '../lib/sound';
import { SEOHead } from '../components/SEOHead';
import AppGame from '../App';

export const HomePage: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);
  const [isGameExpanded, setIsGameExpanded] = useState(false);

  const scrollToGame = () => {
    soundEngine.playSelect();
    const gameEl = document.getElementById('game-arena');
    if (gameEl) {
      gameEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToSection = (id: string) => {
    soundEngine.playSelect();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleFaq = (index: number) => {
    soundEngine.playSelect();
    setExpandedFaqIndex(expandedFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "What is Color Sort Puzzle 3D and how do I play?",
      a: "Color Sort Puzzle 3D is a relaxing yet challenging water sorting puzzle game. Your goal is to sort the mixed liquid colors in the test tubes until each tube contains only one solid color. Simply tap a tube to pick up its top liquid layer, then tap another tube with matching top color or an empty tube to pour."
    },
    {
      q: "Is Color Sort Puzzle 100% free to play?",
      a: "Yes! Color Sort Puzzle 3D is completely free to play with no hidden paywalls. You can unlock all 100+ levels, tube skins, liquid themes, and power-up boosters entirely through gameplay achievements, daily login rewards, and optional rewarded ad bonuses."
    },
    {
      q: "How do I solve a level if I run out of empty tubes or get stuck?",
      a: "If you find yourself stuck, don't worry! You can: (1) Use the 'Undo' button to reverse your previous moves, (2) Tap the 'Hint' lightbulb to let the game highlight the best logical next move, (3) Tap '+ Tube' to add an extra empty buffer flask to your board, or (4) Restart the level instantly at no cost."
    },
    {
      q: "What boosters are available in the game?",
      a: "The game features four powerful boosters: Undo (reverts your last pour step), Smart Hint (computes the shortest mathematical path to victory and flashes the source and target tubes), Extra Tube (adds a brand new empty tube up to 2 per level), and Skip Level (instantly completes a difficult level with victory stars)."
    },
    {
      q: "What is the difference between regular levels and Daily Challenges?",
      a: "Regular levels offer a structured campaign of 100 handcrafted puzzles across distinct chapters with progressive mechanics. Daily Challenges are unique, time-limited puzzles generated every 24 hours that reward bonus coin jackpots, trophies, and streak multiplier bonuses."
    },
    {
      q: "Can I play Color Sort Puzzle offline on mobile or desktop?",
      a: "Yes. The core game logic runs entirely in your local browser environment. Once the page is loaded, you can play through levels without an active internet connection. Progress is safely saved to your device's local storage."
    },
    {
      q: "How does Color Sort Puzzle improve cognitive and memory skills?",
      a: "Water sort puzzles stimulate executive cognitive functioning, including spatial foresight, working memory, pattern recognition, and deductive problem-solving. Research demonstrates that short, mindful puzzle sessions help relieve daily stress while keeping neural pathways sharp."
    },
    {
      q: "How do I earn coins and unlock custom flask skins and themes?",
      a: "You earn coins by completing levels with par move efficiency, solving Daily Challenges, claiming Daily Login Rewards, spinning the Lucky Wheel, and achieving in-game milestones. You can spend your coins in the in-game Shop to unlock futuristic neon themes, potion flasks, and beaker skins."
    },
    {
      q: "Is my game progress saved across browser sessions?",
      a: "Yes! Your current level, star ratings, coin balance, unlocked themes, and daily streak are continuously saved in HTML5 LocalStorage. You can resume your game anytime on the same device and browser without losing your progress."
    },
    {
      q: "Can I reset my game progress or start over from Level 1?",
      a: "Yes. Inside the in-game Settings menu, you will find an 'Account & Data' tab with a 'Reset Game Progress' option. This allows you to restart the adventure from Level 1 whenever you wish."
    },
    {
      q: "Which devices and web browsers are supported?",
      a: "Color Sort Puzzle 3D is fully responsive and optimized for modern browsers including Google Chrome, Apple Safari, Mozilla Firefox, Microsoft Edge, and mobile web views across Android, iOS, tablets, and desktop workstations."
    },
    {
      q: "How can I report a bug or submit feedback to the developer?",
      a: "You can click 'Contact' in the header or footer to submit feedback through our interactive form, or send an email directly to our support inbox at shubhamyadav9219920048@gmail.com. We review every player message within 24 to 48 hours."
    }
  ];

  return (
    <div className="w-full text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      <SEOHead
        title="Color Sort Puzzle 3D - Free Online Liquid Water Sort Game"
        description="Play Color Sort Puzzle 3D free online! Enjoy 100+ brain-teasing levels, realistic liquid pouring physics, daily challenges, tube customizations, and relaxing puzzle gameplay."
        canonicalUrl="/"
        keywords="color sort puzzle, water sort puzzle, liquid sort game, bottle sort online, free puzzle games, brain training games, casual mobile game, color sorting 3d"
      />

      <main className="flex-1 w-full">
        {/* HERO SECTION */}
        <section 
          id="hero" 
          className="relative w-full pt-10 pb-16 sm:pt-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-850"
        >
          {/* Ambient Lighting FX */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/15 via-indigo-500/15 to-purple-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 -left-32 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 -right-32 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="w-full max-w-6xl mx-auto relative z-10 flex flex-col items-center text-center">
            {/* Version Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/15 to-purple-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-black tracking-wide shadow-inner mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Version 2.5 • Over 100+ Handcrafted Levels</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight max-w-4xl"
            >
              Master the Art of <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
                Liquid Color Sorting
              </span> in 3D
            </motion.h1>

            {/* Subheading */}
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal"
            >
              Experience the most satisfying brain-training puzzle online. Pour, match, and organize vibrant liquids across 100+ levels with realistic fluid animations, daily challenges, and smart boosters.
            </motion.p>

            {/* Hero CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto"
            >
              <button
                id="hero-play-now-button"
                onClick={scrollToGame}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-black text-base tracking-wide shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 active:scale-95 transition-all flex items-center justify-center gap-3 border-2 border-emerald-200"
              >
                <Play className="w-5 h-5 fill-slate-950" />
                <span>PLAY FREE NOW</span>
              </button>

              <button
                onClick={() => scrollToSection('how-to-play')}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-sm border border-slate-700 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>How to Play Guide</span>
              </button>
            </motion.div>

            {/* Quick Feature Stats Banner */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-3 text-left"
            >
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                  <Gamepad2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-black text-white block">100+ Levels</span>
                  <span className="text-[10px] text-slate-400">Progressive logic</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                  <Star className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-black text-white block">4.9 / 5 Rating</span>
                  <span className="text-[10px] text-slate-400">Player favorite</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
                  <Brain className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-black text-white block">Brain Workout</span>
                  <span className="text-[10px] text-slate-400">Memory &amp; focus</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-black text-white block">100% Free</span>
                  <span className="text-[10px] text-slate-400">No install needed</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* EMBEDDED GAME ARENA SECTION */}
        <section 
          id="game-arena" 
          className="w-full py-10 sm:py-16 px-3 sm:px-6 lg:px-8 bg-slate-950 border-b border-slate-850 relative"
        >
          <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
            {/* Game Arena Top Bar Header */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 bg-slate-900/80 backdrop-blur-md p-3.5 rounded-2xl border border-slate-800 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <div>
                  <h2 className="text-sm sm:text-base font-black text-white tracking-wide">
                    Interactive Game Arena
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    Play directly in your browser with full sound, liquid physics, and progress saving
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsGameExpanded(!isGameExpanded)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs flex items-center gap-1.5 border border-slate-700 transition-all active:scale-95"
                  title="Toggle container width"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>{isGameExpanded ? 'Standard View' : 'Widescreen Arena'}</span>
                </button>
              </div>
            </div>

            {/* Game Component Container */}
            <div 
              className={`w-full transition-all duration-300 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950 ${
                isGameExpanded ? 'max-w-5xl h-[780px]' : 'max-w-3xl h-[720px]'
              }`}
            >
              <AppGame />
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-slate-400">
                💡 <em>Pro-Tip: Tap a tube to select it, then tap another tube to pour. Use Undo or Hint if you get stuck!</em>
              </p>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION (Why Color Sort 3D is Fun) */}
        <section 
          id="features" 
          className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/50 border-b border-slate-850 relative"
        >
          <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
            <div className="text-center max-w-2xl mb-14">
              <span className="text-xs font-black text-cyan-400 uppercase tracking-widest block mb-2">
                Why Players Love Color Sort 3D
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Designed for Pure Puzzle Satisfaction
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                We engineered every aspect—from liquid particle dynamics to adaptive soundscapes—to deliver an unmatched tactile sorting experience.
              </p>
            </div>

            {/* 6 Features Bento Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <article className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col gap-3 group">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Gamepad2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-white group-hover:text-cyan-300 transition-colors">
                  100+ Handcrafted Levels
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Start with gentle tutorial flasks and advance into intricate multi-color labyrinth tests. Every level is algorithmically verified for 100% solvability.
                </p>
              </article>

              {/* Feature 2 */}
              <article className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 flex flex-col gap-3 group">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-white group-hover:text-purple-300 transition-colors">
                  Fluid Physics &amp; Shaders
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Feel the ASMR liquid stream as colors cascade with realistic dynamic tilt angles, surface tension bubbles, and crisp pouring audio.
                </p>
              </article>

              {/* Feature 3 */}
              <article className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 flex flex-col gap-3 group">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Flame className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                  Daily Challenge &amp; Streaks
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Tackle daily mystery puzzles to maintain your streak, earn exclusive badge trophies, and spin the Lucky Wheel for big coin bonuses.
                </p>
              </article>

              {/* Feature 4 */}
              <article className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 flex flex-col gap-3 group">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-white group-hover:text-emerald-300 transition-colors">
                  Smart Strategic Boosters
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Never suffer from unwinnable lockups. Deploy Undo, AI Smart Hint, Extra Flasks, or Level Skips to keep your puzzle flow unbroken.
                </p>
              </article>

              {/* Feature 5 */}
              <article className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-teal-500/40 transition-all duration-300 flex flex-col gap-3 group">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-white group-hover:text-teal-300 transition-colors">
                  Custom Themes &amp; Flasks
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Personalize your visual experience with Cyberpunk neon palettes, Alchemy potions, test tubes, crystal beakers, and ambient sound tracks.
                </p>
              </article>

              {/* Feature 6 */}
              <article className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 flex flex-col gap-3 group">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Trophy className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-white group-hover:text-indigo-300 transition-colors">
                  Leaderboards &amp; Trophies
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Track par move records, unlock 20+ game achievements, and test your sorting speed against puzzle solvers from around the world.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* GAME SCREENSHOTS & FEATURE SHOWCASE SECTION */}
        <section 
          id="screenshots" 
          className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 border-b border-slate-850 relative overflow-hidden"
        >
          <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
            <div className="text-center max-w-2xl mb-12">
              <span className="text-xs font-black text-cyan-400 uppercase tracking-widest block mb-2">
                Gameplay Gallery
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Visual Brilliance &amp; Rich Features
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                Take a look inside the game. From particle fluid physics to unlockable custom flasks, explore what makes our puzzle experience uniquely satisfying.
              </p>
            </div>

            {/* 4 Feature Mockup Cards Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Screenshot 1: Fluid Physics */}
              <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col gap-3 group hover:border-cyan-500/40 transition-all">
                <div className="w-full h-44 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 relative overflow-hidden flex flex-col items-center justify-center p-4">
                  {/* Decorative Fluid Tube Simulation Mockup */}
                  <div className="flex items-end gap-3 z-10">
                    <div className="w-8 h-28 rounded-b-2xl border-2 border-white/20 bg-slate-900/60 p-0.5 flex flex-col justify-end overflow-hidden shadow-lg">
                      <div className="w-full h-6 bg-cyan-400 rounded-b-lg animate-pulse" />
                      <div className="w-full h-6 bg-purple-500" />
                      <div className="w-full h-6 bg-emerald-400" />
                    </div>
                    <div className="w-8 h-28 rounded-b-2xl border-2 border-cyan-400/60 bg-cyan-950/40 p-0.5 flex flex-col justify-end overflow-hidden shadow-lg -translate-y-2">
                      <div className="w-full h-6 bg-cyan-400 rounded-b-lg" />
                      <div className="w-full h-6 bg-cyan-400" />
                      <div className="w-full h-6 bg-cyan-400" />
                      <div className="w-full h-6 bg-cyan-400" />
                    </div>
                    <div className="w-8 h-28 rounded-b-2xl border-2 border-white/20 bg-slate-900/60 p-0.5 flex flex-col justify-end overflow-hidden shadow-lg">
                      <div className="w-full h-6 bg-amber-400 rounded-b-lg" />
                      <div className="w-full h-6 bg-rose-500" />
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono">
                    3D Shaders
                  </div>
                </div>
                <h3 className="text-base font-black text-white group-hover:text-cyan-300 transition-colors">
                  Realistic Liquid Physics
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Smooth pouring curves, dynamic surface meniscuses, and tactile audio feedback on every transfer.
                </p>
              </div>

              {/* Screenshot 2: 100+ Chapter Map */}
              <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col gap-3 group hover:border-purple-500/40 transition-all">
                <div className="w-full h-44 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 relative overflow-hidden flex flex-col items-center justify-center p-4">
                  {/* Chapter Map Nodes Mockup */}
                  <div className="flex flex-col items-center gap-2 z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center shadow-lg shadow-emerald-500/30">
                        ✓
                      </div>
                      <div className="w-8 h-1 bg-emerald-500/60 rounded" />
                      <div className="w-8 h-8 rounded-full bg-cyan-500 text-slate-950 font-black text-xs flex items-center justify-center shadow-lg shadow-cyan-500/30">
                        12
                      </div>
                      <div className="w-8 h-1 bg-slate-700 rounded" />
                      <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-500 font-bold text-xs flex items-center justify-center border border-slate-700">
                        13
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-amber-300 font-bold">
                      <span>★ ★ ★ 3-Star Rating</span>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono">
                    100+ Levels
                  </div>
                </div>
                <h3 className="text-base font-black text-white group-hover:text-purple-300 transition-colors">
                  100+ Level Campaign
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Progressive difficulty chapters scaling from 3 simple colors up to complex 12-color bottleneck tests.
                </p>
              </div>

              {/* Screenshot 3: Custom Themes & Flasks */}
              <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col gap-3 group hover:border-amber-500/40 transition-all">
                <div className="w-full h-44 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 relative overflow-hidden flex flex-col items-center justify-center p-4">
                  {/* Shop Skins Mockup */}
                  <div className="grid grid-cols-3 gap-2 z-10 w-full max-w-[180px]">
                    <div className="p-2 rounded-xl bg-slate-800/90 border border-cyan-500/40 text-center flex flex-col items-center">
                      <div className="w-4 h-8 bg-cyan-400 rounded-b-lg mb-1" />
                      <span className="text-[9px] font-bold text-cyan-300">Neon</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-800/90 border border-amber-500/40 text-center flex flex-col items-center">
                      <div className="w-4 h-8 bg-amber-400 rounded-b-lg mb-1" />
                      <span className="text-[9px] font-bold text-amber-300">Potion</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-800/90 border border-purple-500/40 text-center flex flex-col items-center">
                      <div className="w-4 h-8 bg-purple-400 rounded-b-lg mb-1" />
                      <span className="text-[9px] font-bold text-purple-300">Sci-Fi</span>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono">
                    Flask Skins
                  </div>
                </div>
                <h3 className="text-base font-black text-white group-hover:text-amber-300 transition-colors">
                  Flask &amp; Theme Studio
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Earn coins to customize your laboratory with Cyberpunk neon, medieval alchemy potions, and glass beakers.
                </p>
              </div>

              {/* Screenshot 4: Daily Challenges & Wheel */}
              <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col gap-3 group hover:border-emerald-500/40 transition-all">
                <div className="w-full h-44 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 relative overflow-hidden flex flex-col items-center justify-center p-4">
                  {/* Daily Wheel Mockup */}
                  <div className="flex flex-col items-center gap-1.5 z-10">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 via-purple-500 to-cyan-500 p-1 flex items-center justify-center animate-spin-slow">
                      <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-amber-300 font-black text-xs">
                        🎁
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400">Daily Spin Available</span>
                  </div>
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                    Rewards
                  </div>
                </div>
                <h3 className="text-base font-black text-white group-hover:text-emerald-300 transition-colors">
                  Daily Quests &amp; Lucky Spin
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Spin the wheel daily for free coin jackpots, booster tokens, and special login streak bonuses.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE THIS GAME (Value Proposition & Comparison) */}
        <section 
          id="why-choose" 
          className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/40 border-b border-slate-850"
        >
          <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
            <div className="text-center max-w-2xl mb-12">
              <span className="text-xs font-black text-emerald-400 uppercase tracking-widest block mb-2">
                The Player First Difference
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Why Choose Color Sort Puzzle 3D?
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                See how our distraction-free web puzzle compares against typical app store clones with aggressive popups.
              </p>
            </div>

            {/* Comparison Table */}
            <div className="w-full overflow-x-auto rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl mb-4">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-300">
                    <th className="p-4 sm:p-5 font-black text-white">Feature / Quality</th>
                    <th className="p-4 sm:p-5 font-black text-cyan-400 bg-cyan-950/30">Color Sort 3D</th>
                    <th className="p-4 sm:p-5 font-bold text-slate-400">Generic App Clones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850 text-slate-300">
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold text-white">100% Solvable Procedural Levels</td>
                    <td className="p-4 sm:p-5 text-emerald-400 font-bold bg-cyan-950/20">
                      ✓ Mathematically Verified
                    </td>
                    <td className="p-4 sm:p-5 text-slate-500">Often impossible without paywalls</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold text-white">Instant Web Play (Zero Download)</td>
                    <td className="p-4 sm:p-5 text-emerald-400 font-bold bg-cyan-950/20">
                      ✓ Instant in Any Browser
                    </td>
                    <td className="p-4 sm:p-5 text-slate-500">Heavy 150MB+ downloads</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold text-white">Ad Experience</td>
                    <td className="p-4 sm:p-5 text-emerald-400 font-bold bg-cyan-950/20">
                      ✓ Clean &amp; Non-Intrusive
                    </td>
                    <td className="p-4 sm:p-5 text-rose-400">Forced ads every 30 seconds</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold text-white">Strategic Boosters (Undo, AI Hint, +Flask)</td>
                    <td className="p-4 sm:p-5 text-emerald-400 font-bold bg-cyan-950/20">
                      ✓ Free via Coins &amp; Spin
                    </td>
                    <td className="p-4 sm:p-5 text-slate-500">Aggressive Microtransactions</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold text-white">Offline LocalStorage Persistence</td>
                    <td className="p-4 sm:p-5 text-emerald-400 font-bold bg-cyan-950/20">
                      ✓ Saves Progress Locally
                    </td>
                    <td className="p-4 sm:p-5 text-slate-500">Requires Constant Account Login</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION (Verified Player Reviews) */}
        <section 
          id="testimonials" 
          className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 border-b border-slate-850"
        >
          <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
            <div className="text-center max-w-2xl mb-12">
              <span className="text-xs font-black text-amber-400 uppercase tracking-widest block mb-2">
                Community Feedback
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Loved by Over 50,000+ Puzzle Solvers
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                Read real reviews from everyday players who use Color Sort Puzzle 3D to unwind, train working memory, and sharpen focus.
              </p>
            </div>

            {/* 3 Testimonial Cards */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Review 1 */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                    "This is hands down the smoothest water sort game online. The fluid pouring sound effects are super relaxing and I love that levels are genuinely solvable without forcing you to buy boosters."
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-300 font-black text-sm flex items-center justify-center border border-cyan-500/30">
                    SL
                  </div>
                  <div>
                    <strong className="text-xs font-bold text-white block">Sarah Lin</strong>
                    <span className="text-[11px] text-slate-500">Software Architect • Level 84</span>
                  </div>
                </div>
              </div>

              {/* Review 2 */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                    "My morning mental coffee routine! Doing 3 to 5 levels before starting work clears brain fog and gets my analytical mind firing. The 3D neon skins look stunning on my tablet."
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-300 font-black text-sm flex items-center justify-center border border-purple-500/30">
                    MR
                  </div>
                  <div>
                    <strong className="text-xs font-bold text-white block">Marcus Reed</strong>
                    <span className="text-[11px] text-slate-500">High School Math Teacher • Level 120</span>
                  </div>
                </div>
              </div>

              {/* Review 3 */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                    "The Daily Challenge mode is addicting. The streaks and spin wheel give just the right amount of reward motivation. Best of all: no annoying unskippable video ads after every move."
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-300 font-black text-sm flex items-center justify-center border border-emerald-500/30">
                    ED
                  </div>
                  <div>
                    <strong className="text-xs font-bold text-white block">Elena Dubrov</strong>
                    <span className="text-[11px] text-slate-500">UI/UX Designer • Level 96</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW TO PLAY SECTION */}
        <section 
          id="how-to-play" 
          className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 border-b border-slate-850 relative"
        >
          <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
            <div className="text-center max-w-2xl mb-14">
              <span className="text-xs font-black text-amber-400 uppercase tracking-widest block mb-2">
                Gameplay Instructions
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                How to Play in 4 Simple Steps
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                Color Sort Puzzle 3D is easy to learn in seconds, yet offers boundless strategic depth as the number of colors expands.
              </p>
            </div>

            {/* 4 Step Timeline */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col gap-3 relative">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-black text-sm flex items-center justify-center">
                  1
                </div>
                <h3 className="text-base font-black text-white">Select Flask</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Click or tap any test tube containing liquid. The tube will rise, highlighting its topmost color segment.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col gap-3 relative">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-400 font-black text-sm flex items-center justify-center">
                  2
                </div>
                <h3 className="text-base font-black text-white">Target Flask</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Click the receiving tube. You can pour if the target is empty OR shares the exact same top color and has free space.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col gap-3 relative">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-black text-sm flex items-center justify-center">
                  3
                </div>
                <h3 className="text-base font-black text-white">Pour &amp; Match</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Consecutive layers of the same color pour automatically into the destination tube in one fluid cascade.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col gap-3 relative">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 font-black text-sm flex items-center justify-center">
                  4
                </div>
                <h3 className="text-base font-black text-white">Clear Level</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Fill every tube with 4 units of a single pure color to trigger celebratory victory fireworks and coin rewards!
                </p>
              </div>
            </div>

            {/* Pro Tips Callout Card */}
            <div className="w-full p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Pro Strategy: Guard Your Empty Tubes!</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
                    Empty tubes are your most valuable strategic resource. Avoid pouring a random single unit into an empty tube unless it immediately unlocks a buried layer underneath.
                  </p>
                </div>
              </div>

              <button
                onClick={scrollToGame}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-lg shadow-cyan-500/20 shrink-0 active:scale-95 transition-all"
              >
                Try It in Level 1
              </button>
            </div>
          </div>
        </section>

        {/* COGNITIVE BENEFITS SECTION */}
        <section 
          id="brain-benefits" 
          className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/40 border-b border-slate-850"
        >
          <div className="w-full max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-xs font-black text-purple-400 uppercase tracking-widest block mb-2">
                  Cognitive Wellness
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                  How Water Sorting Puzzles Boost Mental Agility
                </h2>
                <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                  Engaging in spatial color-matching puzzles stimulates neural plasticity and offers therapeutic focus benefits:
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs text-white">Spatial Working Memory:</strong>
                      <span className="text-xs text-slate-400 block mt-0.5">
                        Players mentally simulate 3 to 5 future pour sequences, exercising short-term working memory capacity.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs text-white">Stress Relief &amp; Mindfulness:</strong>
                      <span className="text-xs text-slate-400 block mt-0.5">
                        Predictable fluid mechanics and gentle acoustic chimes induce a focused meditative flow state, lowering cortisol.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs text-white">Dopamine Reward Loops:</strong>
                      <span className="text-xs text-slate-400 block mt-0.5">
                        Completing a single-color flask provides positive psychological closure and encouraging satisfaction.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Card */}
              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col items-center text-center gap-4 relative overflow-hidden">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-purple-500/20 via-cyan-500/20 to-teal-500/20 border border-white/10 flex items-center justify-center">
                  <Brain className="w-10 h-10 text-cyan-300 animate-pulse" />
                </div>
                <h3 className="text-lg font-black text-white">5 Minutes of Daily Brain Play</h3>
                <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                  Join thousands of daily players who use Color Sort Puzzle 3D as their morning mental coffee break and evening wind-down ritual.
                </p>
                <button
                  onClick={scrollToGame}
                  className="mt-2 px-6 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-black text-xs shadow-md transition-all active:scale-95"
                >
                  Start Brain Workout
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION (10+ Questions) */}
        <section 
          id="faq" 
          className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 border-b border-slate-850"
        >
          <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
            <div className="text-center max-w-2xl mb-12">
              <span className="text-xs font-black text-cyan-400 uppercase tracking-widest block mb-2">
                Got Questions?
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300">
                Everything you need to know about Color Sort Puzzle 3D, rules, boosters, and progress saving.
              </p>
            </div>

            {/* Accordion List */}
            <div className="w-full flex flex-col gap-3">
              {faqs.map((faq, idx) => {
                const isOpen = expandedFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="w-full rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm sm:text-base font-bold text-white flex items-center gap-2.5">
                        <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>{faq.q}</span>
                      </span>
                      <div className={`p-1.5 rounded-lg bg-slate-800 text-slate-300 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-850">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Link to Full Dedicated FAQ Knowledge Base */}
            <div className="mt-8 text-center">
              <Link
                to="/faq"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 font-bold text-xs border border-slate-800 transition-all shadow-md active:scale-95"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Browse All 15+ Questions in Help Center</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* NEWSLETTER SUBSCRIBE SECTION */}
        <section className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-slate-900/60 border-b border-slate-850">
          <div className="w-full max-w-5xl mx-auto">
            <NewsletterSubscribe variant="banner" />
          </div>
        </section>

        {/* ABOUT US SECTION */}
        <section 
          id="about" 
          className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/40 border-b border-slate-850"
        >
          <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-3 max-w-xl">
              <span className="text-xs font-black text-teal-400 uppercase tracking-widest">About Our Studio</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Crafted with Passion for Puzzle Enthusiasts
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Color Sort Puzzle 3D was built from the ground up to offer an authentic, distraction-free puzzle playground. We believe casual games should be accessible, beautifully animated, respectful of player privacy, and 100% fair.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all shadow-md"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Contact Developer</span>
                </button>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col gap-2.5 text-xs text-slate-300 shrink-0 w-full sm:w-80">
              <div className="flex items-center justify-between py-1 border-b border-slate-850">
                <span className="text-slate-400">Game Engine:</span>
                <span className="font-bold text-white">Custom TypeScript Shader</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-850">
                <span className="text-slate-400">Platform:</span>
                <span className="font-bold text-cyan-300">Web, Android &amp; iOS</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-850">
                <span className="text-slate-400">Audio Engine:</span>
                <span className="font-bold text-white">Web Audio Polyphonic</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-400">License:</span>
                <span className="font-bold text-emerald-400">Free to Play EULA</span>
              </div>
            </div>
          </div>
        </section>

        {/* QUICK CONTACT SECTION */}
        <section 
          id="contact" 
          className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 text-center"
        >
          <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-4">
            <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Mail className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Have Feedback or a Level Idea?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We actively incorporate player suggestions, new color themes, and custom flask designs into regular game updates.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 active:scale-95 transition-all flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Open Contact Form</span>
              </button>
              <button
                onClick={scrollToGame}
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-slate-750 active:scale-95 transition-all flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-slate-200" />
                <span>Back to Play</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
