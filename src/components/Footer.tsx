import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  FileText, 
  Cookie, 
  Mail, 
  Copy, 
  Check, 
  ArrowUp, 
  Sparkles, 
  Heart, 
  Gamepad2, 
  ExternalLink,
  HelpCircle,
  Info
} from 'lucide-react';
import { soundEngine } from '../lib/sound';

interface FooterProps {
  onOpenContactModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContactModal }) => {
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

  const scrollToTop = () => {
    soundEngine.playSelect();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (targetId?: string, routePath?: string) => {
    soundEngine.playSelect();
    if (routePath) {
      navigate(routePath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="main-footer" className="w-full bg-slate-950 border-t border-slate-850 text-slate-300 pt-12 pb-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-850">
          {/* Col 1 & 2: Brand & About summary */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-cyan-300 font-black text-sm">
                  3D
                </div>
              </div>
              <span className="font-black text-xl text-white tracking-tight">
                Color Sort <span className="text-cyan-400">Puzzle 3D</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed pr-0 sm:pr-4">
              The premier free online water sort puzzle game. Challenge your logic and cognitive agility with 100+ vibrant liquid sorting levels, realistic physics animations, and daily brain workouts.
            </p>

            {/* Quick Contact Card */}
            <div className="mt-2 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col truncate">
                  <span className="text-xs text-slate-400 font-medium">Developer Support</span>
                  <span className="text-xs font-bold text-white truncate font-mono">{developerEmail}</span>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1 shrink-0 transition-colors"
                title="Copy developer email address"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-black text-cyan-400 uppercase tracking-widest">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNavClick(undefined, '/')}
                  className="text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  Home Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick(undefined, '/play')}
                  className="text-slate-400 hover:text-cyan-300 transition-colors font-semibold"
                >
                  Play Game (500 Levels)
                </button>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  Blog &amp; Articles (30)
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className="text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  News &amp; Updates
                </Link>
              </li>
              <li>
                <Link
                  to="/tips"
                  className="text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  Tips &amp; Tricks Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/blog/popular"
                  className="text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  Popular Posts
                </Link>
              </li>
              <li>
                <Link
                  to="/blog/categories"
                  className="text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  Browse 10 Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  FAQ &amp; Help Center
                </Link>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('how-to-play', '/how-to-play')}
                  className="text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  Strategy Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Player Features & Guides */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-black text-purple-400 uppercase tracking-widest">Player Hub</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/favorites" className="text-slate-400 hover:text-purple-300 transition-colors">
                  Saved Favorites
                </Link>
              </li>
              <li>
                <Link to="/stats" className="text-slate-400 hover:text-purple-300 transition-colors">
                  Player Statistics
                </Link>
              </li>
              <li>
                <Link to="/recent" className="text-slate-400 hover:text-purple-300 transition-colors">
                  Recently Played
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-purple-300 transition-colors">
                  About Color Sort 3D
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-purple-300 transition-colors">
                  Contact &amp; Feedback
                </Link>
              </li>
              <li>
                <a 
                  href={`mailto:${developerEmail}?subject=Color%20Sort%203D%20Feature%20Suggestion`}
                  className="text-slate-400 hover:text-purple-300 transition-colors flex items-center gap-1"
                >
                  <span>Submit Suggestion</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Legal & AdSense Policies */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-black text-amber-400 uppercase tracking-widest">Legal & Policies</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-400" />
                  <span>Terms & Conditions</span>
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <Cookie className="w-3.5 h-3.5 text-amber-400" />
                  <span>Cookie Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-rose-400" />
                  <span>Disclaimer</span>
                </Link>
              </li>
              <li>
                <span className="text-[11px] text-slate-500 block pt-1">
                  AdSense & GDPR Compliant
                </span>
              </li>
              <li>
                <span className="text-[11px] text-slate-500 block">
                  COPPA Family-Safe Certified
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* AdSense Editorial Disclosure Notice */}
        <div className="py-6 border-b border-slate-900 text-[11px] text-slate-500 leading-relaxed text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            <strong>AdSense & Third-Party Disclosure:</strong> This website is an independent gaming publication and web portal. We adhere to Google Publisher Policies, user privacy rights, and clean advertising standards. In-game advertisements fund free access for all players worldwide.
          </p>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span>© 2026 Color Sort Puzzle 3D. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (onOpenContactModal) {
                  onOpenContactModal();
                } else {
                  navigate('/contact');
                }
              }}
              className="hover:text-cyan-400 transition-colors"
            >
              Support Center
            </button>
            <span>•</span>
            <Link to="/privacy" className="hover:text-cyan-400 transition-colors">
              Privacy
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-cyan-400 transition-colors">
              Terms
            </Link>
            <span>•</span>
            <Link to="/cookies" className="hover:text-cyan-400 transition-colors">
              Cookies
            </Link>
            <span>•</span>
            <Link to="/disclaimer" className="hover:text-cyan-400 transition-colors">
              Disclaimer
            </Link>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 active:scale-95 transition-all flex items-center gap-1 ml-2"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
