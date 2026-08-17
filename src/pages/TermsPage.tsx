import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FileText, Mail, Check, Copy, ExternalLink, ArrowLeft, ShieldCheck, Scale, AlertCircle, Award } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Breadcrumb } from '../components/Breadcrumb';
import { SEOHead } from '../components/SEOHead';
import { soundEngine } from '../lib/sound';

export const TermsPage: React.FC = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const developerEmail = 'shubhamyadav9219920048@gmail.com';

  const handleCopyEmail = () => {
    soundEngine.playSelect();
    try {
      navigator.clipboard.writeText(developerEmail);
    } catch (e) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="w-full text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      <SEOHead
        title="Terms &amp; Conditions - End User License Agreement"
        description="Official Terms and Conditions and End User License Agreement (EULA) for Color Sort Puzzle 3D."
        canonicalUrl="/terms"
        keywords="terms and conditions, eula, end user license agreement, terms of service, color sort puzzle terms"
      />

      <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 flex flex-col gap-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'Terms & Conditions', current: true }]} />

        {/* Page Container */}
        <article className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-10 flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 shrink-0">
                <FileText className="w-7 h-7" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Terms &amp; Conditions
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
                  End User License Agreement (EULA) &amp; Terms of Service • Effective: August 2026
                </p>
              </div>
            </div>

            <Link
              to="/play"
              onClick={() => soundEngine.playSelect()}
              className="self-start sm:self-auto px-4 py-2 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-all shadow-md active:scale-95"
            >
              Play Game
            </Link>
          </div>

          {/* Quick Notice Banner */}
          <section className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-500/30 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-indigo-400 shrink-0" aria-hidden="true" />
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Agreement Overview:</strong> By playing, accessing, or using Color Sort Puzzle 3D on web or mobile platforms, you agree to be legally bound by these Terms and our Privacy Policy.
            </div>
          </section>

          {/* Terms Content Sections */}
          <div className="flex flex-col gap-8 text-sm text-slate-300 leading-relaxed">
            {/* Section 1 */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
                <Scale className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                1. Grant of License &amp; Permitted Use
              </h2>
              <p>
                Color Sort Puzzle Studio grants you a personal, non-exclusive, non-transferable, revocable, royalty-free license to play <strong className="text-white">Color Sort Puzzle 3D</strong> for personal, non-commercial entertainment purposes via authorized web browsers and official application packages.
              </p>
              <p>
                You agree not to decompile, reverse-engineer, modify, distribute, or exploit the proprietary procedural solver algorithms, sound assets, or SVG game art without express written consent.
              </p>
            </section>

            {/* Section 2 */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
                <Award className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                2. Virtual Currency, Boosters &amp; Gameplay Items
              </h2>
              <p>
                In-game virtual items, including coins, undo tokens, smart hints, extra tube passes, and unlockable flask skins, are purely digital gameplay features with no real-world monetary value.
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-slate-300">
                <li>Virtual coins are earned via gameplay achievements, daily login streaks, lucky spins, and optional rewarded ad bonuses.</li>
                <li>Virtual items cannot be redeemed, transferred, or exchanged for real fiat currency or legal tender.</li>
                <li>Clearing your browser's localStorage will reset virtual coin balances.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                3. User Conduct &amp; Prohibited Activities
              </h2>
              <p>When interacting with Color Sort Puzzle 3D, you agree not to:</p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-slate-300">
                <li>Deploy automated bots, scrapers, or memory injectors to manipulate score leaderboards or speedrun timers.</li>
                <li>Attempt to bypass, disable, or tamper with third-party advertising modules or security headers.</li>
                <li>Submit abusive, misleading, or fraudulent communications through our Contact Support portal.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                4. Disclaimer of Warranty &amp; Limitation of Liability
              </h2>
              <p>
                Color Sort Puzzle 3D is provided "as is" and "as available". We disclaim all warranties of any kind, whether express or implied. Under no circumstances shall the developer be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use the game.
              </p>
            </section>

            {/* Developer Contact Box */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Legal &amp; Terms Inquiries</h3>
                  <p className="text-xs text-slate-400">Contact our administrative team</p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-mono text-cyan-300 bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 truncate">
                  {developerEmail}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 active:scale-95"
                  aria-label="Copy developer email"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Cross Links */}
            <div className="pt-6 border-t border-slate-800 flex flex-wrap gap-4 text-xs text-slate-400">
              <span>Related Legal Policies:</span>
              <Link to="/privacy" className="text-cyan-400 hover:underline">Privacy Policy</Link>
              <span>•</span>
              <Link to="/cookies" className="text-cyan-400 hover:underline">Cookie Policy</Link>
              <span>•</span>
              <Link to="/disclaimer" className="text-cyan-400 hover:underline">Legal Disclaimer</Link>
              <span>•</span>
              <Link to="/about" className="text-cyan-400 hover:underline">About Us</Link>
              <span>•</span>
              <Link to="/contact" className="text-cyan-400 hover:underline">Contact Support</Link>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};
