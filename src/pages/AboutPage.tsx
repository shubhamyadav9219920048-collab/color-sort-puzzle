import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Sparkles, 
  Brain, 
  ShieldCheck, 
  Heart, 
  Gamepad2, 
  Layers, 
  Zap, 
  Award, 
  Mail, 
  CheckCircle2,
  Cpu,
  Users,
  Compass,
  Play,
  Clock,
  BookOpen
} from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Breadcrumb } from '../components/Breadcrumb';
import { SEOHead } from '../components/SEOHead';
import { soundEngine } from '../lib/sound';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const developerEmail = 'shubhamyadav9219920048@gmail.com';

  return (
    <div className="w-full text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      <SEOHead
        title="About Us - Our Mission &amp; Fluid Physics Puzzle Engine"
        description="Learn about the inspiration, development philosophy, fluid mechanics engine, and brain training mission behind Color Sort Puzzle 3D."
        canonicalUrl="/about"
        keywords="about color sort puzzle, puzzle game development, fluid simulation game, brain training mission, indie puzzle developers"
      />

      <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 flex flex-col gap-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'About Us', current: true }]} />

        {/* Page Container */}
        <article className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-10 flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shrink-0">
                <Sparkles className="w-7 h-7" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  About Color Sort Puzzle 3D
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
                  Our Mission, Engine Architecture &amp; Cognitive Wellness Philosophy
                </p>
              </div>
            </div>

            <span className="self-start sm:self-auto px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-bold">
              v2.5.0 Production
            </span>
          </div>

          {/* Mission Hero Banner */}
          <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-cyan-950/80 via-slate-900 to-indigo-950/80 border border-cyan-500/30 flex flex-col gap-3 shadow-xl">
            <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
              Our Core Mission
            </span>
            <p className="text-base sm:text-lg font-bold text-white leading-snug">
              "To create an accessible, calm, and intellectually stimulating puzzle sanctuary that turns daily downtime into mindful brain exercise."
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              In a digital world crowded with hyper-fast dopamine loops, aggressive timers, and intrusive ads, <strong className="text-cyan-300">Color Sort Puzzle 3D</strong> was engineered as an oasis of deliberate calm. We believe logic games should be visually hypnotic, mathematically rich, and genuinely rewarding to solve at your own unhurried pace.
            </p>
          </div>

          {/* Section 1: Genesis and Vision */}
          <section className="flex flex-col gap-4 text-sm text-slate-300 leading-relaxed">
            <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
              <Gamepad2 className="w-5 h-5 text-cyan-400" aria-hidden="true" />
              The Genesis of Color Sort Puzzle 3D
            </h2>
            <p>
              The project started with a simple question: <em className="text-slate-200">How can we translate the visceral satisfaction of pouring liquids into a crisp, modern browser experience that works instantly without high-spec hardware requirements?</em>
            </p>
            <p>
              Traditional water sorting games often suffer from clunky controls, static rendering, or repetitive puzzles. Our team developed a custom procedural level generation engine combined with a real-time fluid transfer animator. Every tube, splash droplet, and bubbling sound effect is calibrated to provide maximum tactile and auditory gratification.
            </p>
          </section>

          {/* Section 2: Core Engineering Pillars */}
          <section className="flex flex-col gap-4 text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-8">
            <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
              <Cpu className="w-5 h-5 text-emerald-400" aria-hidden="true" />
              Three Pillars of Our Engine
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <Zap className="w-5 h-5" />
                  <h3>1. 100% Solvability Guarantee</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Every level generated in our campaign or Daily Challenges is validated using a graph-search solver algorithm. You never have to worry about unwinnable dead-ends caused by random generation bugs.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-purple-400 font-bold">
                  <Brain className="w-5 h-5" />
                  <h3>2. Brain Wellness &amp; Flow</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Designed around cognitive psychology principles. No punitive timers, infinite free restarts, and seamless Undo mechanics allow players to explore solution branches without stress.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <Layers className="w-5 h-5" />
                  <h3>3. Universal Responsiveness</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Engineered using lightweight React and modern CSS. Enjoy 60 FPS fluid rendering on smartphones, tablets, laptops, and 4K desktop displays with zero app store downloads.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Community & Feedback */}
          <section className="flex flex-col gap-4 text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-8">
            <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
              <Users className="w-5 h-5 text-indigo-400" aria-hidden="true" />
              Community-Driven Evolution
            </h2>
            <p>
              Color Sort Puzzle 3D is actively maintained and regularly updated with new themes, cosmetic test tube skins, seasonal events, and community-requested quality-of-life improvements. We read every message sent to our support inbox and prioritize player suggestions in upcoming roadmap releases.
            </p>
          </section>

          {/* Quick CTA Card */}
          <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Want to Master Every Level?</h3>
                <p className="text-xs text-slate-400">Read our 1,500+ word strategy handbook with pro deadlock solutions.</p>
              </div>
            </div>

            <Link
              to="/how-to-play"
              onClick={() => soundEngine.playSelect()}
              className="px-5 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-all shrink-0 shadow-md active:scale-95"
            >
              Read Strategy Guide
            </Link>
          </div>

          {/* Cross Links Footer */}
          <div className="pt-6 border-t border-slate-800 flex flex-wrap gap-4 text-xs text-slate-400">
            <span>Discover More:</span>
            <Link to="/play" className="text-cyan-400 hover:underline">Play Online</Link>
            <span>•</span>
            <Link to="/how-to-play" className="text-cyan-400 hover:underline">How to Play</Link>
            <span>•</span>
            <Link to="/contact" className="text-cyan-400 hover:underline">Contact Us</Link>
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
    </div>
  );
};
