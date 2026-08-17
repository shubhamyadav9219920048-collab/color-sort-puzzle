import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Cookie, Mail, Check, Copy, ExternalLink, ArrowLeft, Shield, CheckCircle2, AlertCircle } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Breadcrumb } from '../components/Breadcrumb';
import { SEOHead } from '../components/SEOHead';
import { soundEngine } from '../lib/sound';

export const CookiePolicyPage: React.FC = () => {
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
        title="Cookie Policy - Cookies, Local Storage &amp; AdSense"
        description="Comprehensive Cookie Policy for Color Sort Puzzle 3D. Learn about necessary cookies, Google AdSense ad cookies, localStorage, and cookie management settings."
        canonicalUrl="/cookies"
        keywords="cookie policy, gdpr cookie consent, adsense cookies, local storage game data, tracking preferences"
      />

      <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 flex flex-col gap-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'Cookie Policy', current: true }]} />

        {/* Page Container */}
        <article className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-10 flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
                <Cookie className="w-7 h-7" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Cookie &amp; Storage Policy
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
                  How We Use Cookies, Web Storage &amp; Third-Party Ad Identifiers • Updated: August 2026
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
          <section className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-950 border border-amber-500/30 flex items-center gap-3">
            <Shield className="w-6 h-6 text-amber-400 shrink-0" aria-hidden="true" />
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Quick Summary:</strong> This policy explains what cookies and HTML5 local storage technologies are used on Color Sort Puzzle 3D, why we use them, and how you can control your tracking preferences at any time.
            </div>
          </section>

          {/* Content Sections */}
          <div className="flex flex-col gap-8 text-sm text-slate-300 leading-relaxed">
            {/* Section 1 */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                1. What Are Cookies and Local Storage?
              </h2>
              <p>
                Cookies are small text files placed on your computer or mobile device when you visit a website. HTML5 Local Storage allows websites to store structured key-value data directly in your browser without transmitting it to the web server on every HTTP request.
              </p>
              <p>
                We use local storage for essential game mechanics (remembering your unlocked levels, sound volume, high scores, and shop unlocks) and cookies for performance analytics and ad delivery through Google AdSense.
              </p>
            </section>

            {/* Section 2: Cookie Breakdown Table */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
                <Cookie className="w-5 h-5 text-amber-400" aria-hidden="true" />
                2. Categories of Cookies &amp; Storage We Use
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-800 rounded-2xl overflow-hidden">
                  <thead className="bg-slate-950 text-slate-300 font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-3">Category</th>
                      <th className="p-3">Provider</th>
                      <th className="p-3">Purpose</th>
                      <th className="p-3">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-900/50">
                    <tr>
                      <td className="p-3 font-semibold text-emerald-400">Strictly Necessary</td>
                      <td className="p-3">Color Sort 3D (First-party)</td>
                      <td className="p-3">Stores game save state, par moves, sound settings, and coin wallet</td>
                      <td className="p-3">Persistent (localStorage)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-cyan-400">Cookie Consent</td>
                      <td className="p-3">Color Sort 3D</td>
                      <td className="p-3">Remembers your GDPR / CCPA cookie consent preference</td>
                      <td className="p-3">365 Days</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-amber-400">Advertising &amp; AdSense</td>
                      <td className="p-3">Google AdSense / DoubleClick</td>
                      <td className="p-3">Serves relevant ads, prevents ad repetition, and detects invalid traffic</td>
                      <td className="p-3">90–390 Days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 3: Managing & Disabling */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                3. How to Manage or Disable Cookies
              </h2>
              <p>
                You can control and manage cookies in various ways:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
                <li><strong>Browser Settings:</strong> Most browsers allow you to block third-party cookies or delete existing cookies via Settings &gt; Privacy &amp; Security.</li>
                <li><strong>Google Ad Personalization:</strong> Manage your Google advertising profile at <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">adssettings.google.com</a>.</li>
                <li><strong>Network Advertising Initiative:</strong> Opt out of targeted ads from participating networks at <a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">optout.networkadvertising.org</a>.</li>
              </ul>
              <p className="text-xs text-slate-400">
                Please note that disabling strictly necessary local storage will prevent the game from saving your level progress.
              </p>
            </section>

            {/* Developer Contact Box */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Questions on Cookies &amp; Storage?</h3>
                  <p className="text-xs text-slate-400">Reach our developer directly</p>
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
              <span>Related Policies:</span>
              <Link to="/privacy" className="text-cyan-400 hover:underline">Privacy Policy</Link>
              <span>•</span>
              <Link to="/terms" className="text-cyan-400 hover:underline">Terms &amp; Conditions</Link>
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
