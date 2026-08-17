import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, Shield, Check, X } from 'lucide-react';
import { soundEngine } from '../lib/sound';

export const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('colorsort_cookie_consent_v2');
      if (!consent) {
        const timer = setTimeout(() => {
          setVisible(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch (e) {}
  }, []);

  const handleAccept = () => {
    soundEngine.playSelect();
    try {
      localStorage.setItem('colorsort_cookie_consent_v2', 'accepted');
    } catch (e) {}
    setVisible(false);
  };

  const handleDismiss = () => {
    soundEngine.playSelect();
    try {
      localStorage.setItem('colorsort_cookie_consent_v2', 'dismissed');
    } catch (e) {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in slide-in-from-bottom duration-300">
      <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/95 backdrop-blur-xl border border-slate-800 shadow-2xl shadow-cyan-950/40 text-slate-200 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">Cookie &amp; Storage Preferences</h3>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Privacy Guaranteed</span>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Dismiss cookie banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          We use local storage and cookies to save your level progress, unlockables, and provide ad-supported free gameplay in accordance with GDPR and AdSense guidelines.
        </p>

        <div className="flex items-center justify-between gap-2 pt-1">
          <Link
            to="/cookies"
            onClick={() => soundEngine.playSelect()}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-bold underline"
          >
            Cookie Policy
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDismiss}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              Essential Only
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black text-xs shadow-md active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Accept All</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
