import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Mail, Check, Copy, ExternalLink, ArrowLeft, Shield, Eye, Lock, Database } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Breadcrumb } from '../components/Breadcrumb';
import { SEOHead } from '../components/SEOHead';
import { soundEngine } from '../lib/sound';

export const PrivacyPage: React.FC = () => {
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
        title="Privacy Policy - Data Protection &amp; Ad Transparency"
        description="Official Privacy Policy for Color Sort Puzzle 3D. Learn about local data storage, Google AdSense cookies, GDPR, CCPA rights, and COPPA child safety compliance."
        canonicalUrl="/privacy"
        keywords="privacy policy, data protection, gdpr compliance, ccpa rights, adsense privacy, color sort puzzle privacy"
      />

      <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 flex flex-col gap-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'Privacy Policy', current: true }]} />

        {/* Page Container */}
        <article className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-10 flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                <ShieldCheck className="w-7 h-7" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Privacy Policy
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
                  Transparency, Data Safety &amp; Regulatory Compliance • Last Updated: August 2026
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

          {/* Quick Summary Pill Banner */}
          <section className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-950 border border-emerald-500/30 flex items-center gap-3">
            <Shield className="w-6 h-6 text-emerald-400 shrink-0" aria-hidden="true" />
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Summary:</strong> We do not sell your personal data or maintain invasive user tracking databases. Game progress and cosmetics are stored locally on your device. Advertising partners (Google AdSense) may use cookies to serve non-intrusive ads.
            </div>
          </section>

          {/* Privacy Content Sections */}
          <div className="flex flex-col gap-8 text-sm text-slate-300 leading-relaxed">
            {/* Section 1 */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
                <Database className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                1. Information We Store Locally on Your Device
              </h2>
              <p>
                To provide a seamless gaming experience without requiring mandatory account registration or passwords, <strong className="text-white">Color Sort Puzzle 3D</strong> utilizes your browser's client-side <code className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 text-xs">localStorage</code>.
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-slate-300">
                <li>Current campaign level progression, par move records, and 3-star ratings.</li>
                <li>In-game virtual coin balance and inventory of power-ups (Undo, Hints, Extra Tubes).</li>
                <li>Unlocked cosmetic tube skins, liquid themes, and player avatars.</li>
                <li>Audio preferences (Sound FX toggle, Music toggle, Haptics toggle).</li>
              </ul>
              <p className="text-xs text-slate-400">
                This data is stored purely on your physical device and is never uploaded to private remote data tracking brokers.
              </p>
            </section>

            {/* Section 2 */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
                <Eye className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                2. Advertising, Cookies &amp; Google AdSense
              </h2>
              <p>
                Color Sort Puzzle 3D is 100% free. To maintain our servers, development tools, and content updates, we partner with reputable third-party advertising networks, including Google AdSense.
              </p>
              <p>
                Google uses cookies (such as the DoubleClick cookie) to serve ads based on your prior visits to this website or other sites on the internet. You may opt out of personalized advertising by visiting Google's <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline font-semibold inline-flex items-center gap-0.5">Ads Settings <ExternalLink className="w-3 h-3 inline" /></a>.
              </p>
              <p>
                For complete details regarding cookie categories, duration, and consent management, please read our dedicated <Link to="/cookies" className="text-amber-400 hover:underline font-semibold">Cookie Policy</Link>.
              </p>
            </section>

            {/* Section 3 */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
                <Lock className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                3. European General Data Protection Regulation (GDPR) Compliance
              </h2>
              <p>
                If you are a resident of the European Economic Area (EEA) or United Kingdom (UK), you enjoy distinct rights under GDPR:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-slate-300">
                <li><strong>Right to Access &amp; Portability:</strong> You can inspect or clear your locally stored gameplay metrics at any time through your browser settings.</li>
                <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> Simply clearing your browser cache and localStorage completely purges all associated game data.</li>
                <li><strong>Right to Withdraw Consent:</strong> You can adjust cookie preferences via our on-screen Cookie Banner or browser controls.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                4. California Consumer Privacy Act (CCPA) Rights
              </h2>
              <p>
                Under the California Consumer Privacy Act (CCPA) and CPRA, California residents have the right to request disclosure of categories of personal information collected, request deletion of personal information, and opt out of the sale or sharing of personal information. Color Sort Puzzle 3D does not sell player personal information to data brokers.
              </p>
            </section>

            {/* Section 5 */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
                <Shield className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                5. Children’s Online Privacy Protection (COPPA)
              </h2>
              <p>
                Color Sort Puzzle 3D is designed for audiences of all ages and is compliant with the Children's Online Privacy Protection Act (COPPA). We do not knowingly collect, request, or solicit personally identifiable information from children under the age of 13.
              </p>
            </section>

            {/* Developer Contact Box */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Privacy Officer &amp; Inquiries</h3>
                  <p className="text-xs text-slate-400">Questions about your data or policies?</p>
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
              <span>Related Documents:</span>
              <Link to="/terms" className="text-cyan-400 hover:underline">Terms &amp; Conditions</Link>
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
