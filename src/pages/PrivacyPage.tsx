import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Mail, Check, Copy, ExternalLink, ArrowLeft, Printer } from 'lucide-react';
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
    setTimeout(() => setCopied(false), 2500);
  };

  const handleEmailLaunch = () => {
    soundEngine.playSelect();
    handleCopyEmail();
    const mailtoUrl = `mailto:${developerEmail}?subject=${encodeURIComponent(
      'Color Sort 3D - Support & Privacy Inquiry'
    )}&body=${encodeURIComponent(
      'Hello Developer,\n\nI have a question regarding Color Sort 3D:\n\n[Please enter your message here]\n\nApp Version: 2.5.0\nDevice: Web / Android'
    )}`;
    window.location.href = mailtoUrl;
  };

  const handleBackToGame = () => {
    soundEngine.playSelect();
    try {
      navigate('/');
    } catch (e) {
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-200 flex flex-col items-center justify-start p-4 sm:p-8 font-sans">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBackToGame}
              className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all flex items-center gap-2 mr-1"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-xs font-bold hidden sm:inline">Back to Game</span>
            </button>
            <div className="p-2.5 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-wide">Privacy Policy</h1>
              <p className="text-xs text-slate-400 font-medium">
                Color Sort 3D • Effective Date: August 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all hidden sm:flex"
              title="Print Policy"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Policy Content */}
        <div className="p-6 sm:p-8 flex flex-col gap-6 text-sm text-slate-300 leading-relaxed max-h-[75vh] overflow-y-auto">
          {/* Quick Notice Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 to-slate-950 border border-blue-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-blue-400 animate-ping" />
              <span className="font-semibold text-white">
                Zero Sensitive Personal Data Sold or Shared.
              </span>
            </div>
            <button
              onClick={handleEmailLaunch}
              className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all shadow-md shrink-0"
            >
              <Mail className="w-4 h-4" />
              <span>Contact DPO</span>
            </button>
          </div>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-black text-blue-400 uppercase tracking-wider">
              1. Overview & Commitment
            </h2>
            <p>
              This Privacy Policy explains how <strong>Color Sort Puzzle 3D</strong> ("we", "our", or "the App") collects, uses, and safeguards information when you play our water sorting puzzle game on Android or Web platforms. We are committed to protecting user privacy and maintaining full compliance with Google Play Developer Policies, General Data Protection Regulation (GDPR), and Children's Online Privacy Protection Act (COPPA).
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-black text-blue-400 uppercase tracking-wider">
              2. Data Collection & Local Storage
            </h2>
            <p>
              <strong>Color Sort 3D</strong> is designed to run locally on your device without forcing account registration.
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
              <li>
                <strong className="text-white">Game Progress & Statistics:</strong> Saved locally using browser/device LocalStorage (e.g., level completions, star ratings, coin balance, unlocked tube skins, and daily streak progress).
              </li>
              <li>
                <strong className="text-white">Google Play Games Sync:</strong> If you voluntarily sign in with Google Play Games, your gamer ID and avatar profile are used solely to store cloud save files and populate leaderboard rankings.
              </li>
              <li>
                <strong className="text-white">Device & Diagnostics:</strong> Non-personally identifiable diagnostic logs (FPS rates, screen resolution) to ensure liquid physics shaders perform smoothly across mobile devices.
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-black text-blue-400 uppercase tracking-wider">
              3. Advertising & AdMob Compliance
            </h2>
            <p>
              We integrate Google AdMob services to serve optional rewarded video ads, banner ads, and interstitial transition breaks:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
              <li>AdMob may utilize non-sensitive advertising IDs (GAID) to prevent fraud and deliver rewarded booster tokens (extra tubes, free hints, undos).</li>
              <li>You can reset your device's Advertising ID at any time via Android Device Settings &gt; Google &gt; Ads.</li>
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-black text-blue-400 uppercase tracking-wider">
              4. Data Control & Reset Progress
            </h2>
            <p>
              You maintain full ownership of your stored data. You can clear all cached game states, coin balances, and local records directly in the game under <strong>Settings &gt; Account &gt; Reset Game Progress</strong>.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-black text-blue-400 uppercase tracking-wider">
              5. Developer Contact & Inquiries
            </h2>
            <p>
              For privacy requests, data deletion inquiries, or technical support, contact the developer directly:
            </p>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 my-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-sm font-bold text-white">{developerEmail}</span>
                  <span className="text-xs text-slate-400">Direct Support & Data Protection Officer</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Email'}</span>
                </button>
                <a
                  href={`mailto:${developerEmail}?subject=Color%20Sort%203D%20Privacy%20Inquiry`}
                  onClick={handleEmailLaunch}
                  className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Email App</span>
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between shrink-0">
          <button
            onClick={handleBackToGame}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-extrabold text-xs flex items-center gap-2 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Game</span>
          </button>

          <button
            onClick={handleEmailLaunch}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-400 hover:to-teal-300 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all active:scale-95"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Developer</span>
          </button>
        </div>
      </div>
    </div>
  );
};
