import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Mail, 
  Check, 
  Copy, 
  ArrowLeft, 
  Scale, 
  FileText, 
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Breadcrumb } from '../components/Breadcrumb';
import { SEOHead } from '../components/SEOHead';
import { soundEngine } from '../lib/sound';

export const DisclaimerPage: React.FC = () => {
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
        title="Legal Disclaimer & Content Notice"
        description="Official legal disclaimer, advertising disclosures, and health & entertainment terms for Color Sort Puzzle 3D."
        canonicalUrl="/disclaimer"
        keywords="color sort puzzle disclaimer, game terms, advertising disclosures, fair use, cognitive entertainment notice"
      />

      <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 flex flex-col gap-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'Disclaimer', current: true }]} />

        {/* Page Container */}
        <article className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-10 flex flex-col gap-8">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
                <AlertTriangle className="w-7 h-7" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Legal Disclaimer
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
                  General Disclaimer, Advertising Disclosures &amp; Terms of Use • Effective: August 2026
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
          <section className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/50 via-slate-900 to-slate-900 border border-amber-500/30 flex items-start gap-3.5">
            <ShieldAlert className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p className="font-semibold text-white mb-1">Important Notice for All Players:</p>
              The information, game mechanics, and brain-training references provided on Color Sort Puzzle 3D are published in good faith for general entertainment, relaxation, and cognitive leisure purposes only. By accessing or using this website, you accept this disclaimer in full.
            </div>
          </section>

          {/* Body Sections */}
          <div className="flex flex-col gap-8 text-sm text-slate-300 leading-relaxed">
            {/* Section 1 */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
                <Scale className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                1. General Information &amp; "As-Is" Gameplay
              </h2>
              <p>
                All content, interactive puzzle modules, simulated fluid mechanics, visual themes, sound effects, and digital progression elements on <strong className="text-white">Color Sort Puzzle 3D</strong> (accessible at <span className="font-mono text-cyan-400">colorsortpuzzle3d.com</span>) are provided on an "as-is" and "as-available" basis without representations or warranties of any kind, express or implied.
              </p>
              <p>
                While we strive to ensure 100% puzzle solvability, glitch-free animations, and accurate local save states, we make no guarantees that the website will always be uninterrupted, error-free, completely bug-free, or compatible with every legacy browser environment or hardware specification.
              </p>
            </section>

            {/* Section 2 */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
                <Info className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                2. Cognitive &amp; Health Disclaimer
              </h2>
              <p>
                Any references on this website or in our <Link to="/how-to-play" className="text-cyan-400 hover:underline font-semibold">Game Guides</Link> regarding "brain training," "memory enhancement," "cognitive agility," or "stress reduction" are based on casual observational studies and general puzzle literature.
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-slate-300 pl-2">
                <li>Color Sort Puzzle 3D is not a medical device, diagnostic instrument, or therapeutic treatment.</li>
                <li>The game is not designed to diagnose, treat, cure, or prevent any mental health conditions, neurological disorders, or cognitive impairments.</li>
                <li>Players who experience eye strain, dizziness, or fatigue should take regular breaks and adjust screen brightness accordingly.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                3. Advertising, Monetization &amp; Google AdSense Transparency
              </h2>
              <p>
                Color Sort Puzzle 3D is 100% free for all players. To support ongoing server costs, updates, and level design development, the site utilizes third-party advertising networks, including Google AdSense.
              </p>
              <p>
                Third-party ad vendors, including Google, may use cookies or device identifiers to serve personalized and non-personalized ads based on prior visits. Advertisements displayed on our site do not constitute an endorsement, warranty, or recommendation by Color Sort Puzzle 3D of the advertised products, services, or claims. For details on managing ad cookies, please consult our <Link to="/cookies" className="text-amber-400 hover:underline font-semibold">Cookie Policy</Link> and <Link to="/privacy" className="text-emerald-400 hover:underline font-semibold">Privacy Policy</Link>.
              </p>
            </section>

            {/* Section 4 */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                4. External Links Disclaimer
              </h2>
              <p>
                Our site may contain links to external websites, services, or developer portals that are not operated, owned, or monitored by Color Sort Puzzle 3D. We have no control over the content, privacy policies, practices, or availability of third-party websites and assume no responsibility or liability for any damages or losses incurred from their use.
              </p>
            </section>

            {/* Section 5 */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                5. Intellectual Property &amp; Fair Use
              </h2>
              <p>
                All original algorithms, SVG artwork, procedural level generation algorithms, UI components, brand assets, and game guides are the intellectual property of Color Sort Puzzle Studio unless otherwise stated. All other product names, trademarks, and registered trademarks mentioned are the property of their respective owners.
              </p>
            </section>

            {/* Section 6 */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                6. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by applicable law, in no event shall Color Sort Puzzle Studio, its developers, or contributors be held liable for any direct, indirect, incidental, special, consequential, or punitive damages (including loss of data, loss of device battery health, or loss of gameplay progress) arising out of or related to your access or inability to access this website.
              </p>
            </section>

            {/* Contact Box */}
            <div className="mt-4 p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Mail className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Questions Regarding This Disclaimer?</h3>
                  <p className="text-xs text-slate-400">Reach our developer team directly:</p>
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
              <Link to="/terms" className="text-cyan-400 hover:underline">Terms &amp; Conditions</Link>
              <span>•</span>
              <Link to="/cookies" className="text-cyan-400 hover:underline">Cookie Policy</Link>
              <span>•</span>
              <Link to="/about" className="text-cyan-400 hover:underline">About Us</Link>
              <span>•</span>
              <Link to="/contact" className="text-cyan-400 hover:underline">Contact Form</Link>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};
