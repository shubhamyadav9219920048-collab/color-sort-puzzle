import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, X, Mail, Check, Copy, ExternalLink, ArrowLeft, Printer } from 'lucide-react';
import { soundEngine } from '../lib/sound';

interface PrivacyPolicyModalProps {
  onClose: () => void;
  onOpenContact?: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  onClose,
  onOpenContact,
}) => {
  const [copied, setCopied] = useState(false);
  const developerEmail = 'shubhamyadav9219920048@gmail.com';

  const handleCopyEmail = () => {
    soundEngine.playSelect();
    navigator.clipboard.writeText(developerEmail);
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-2xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-200"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white tracking-wide">Privacy Policy</h2>
              <p className="text-xs text-slate-400 font-medium">
                Color Sort 3D • Effective Date: August 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all hidden sm:flex"
              title="Print Policy"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                soundEngine.playSelect();
                onClose();
              }}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Policy Content */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-5 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
          {/* Quick Notice Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 to-slate-950 border border-blue-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping" />
              <span className="font-semibold text-white">
                Zero Sensitive Personal Data Sold or Shared.
              </span>
            </div>
            <button
              onClick={handleEmailLaunch}
              className="px-3 py-1.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all shadow-md shrink-0"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact DPO</span>
            </button>
          </div>

          <section className="flex flex-col gap-2">
            <h3 className="text-sm font-black text-blue-400 uppercase tracking-wider">
              1. Overview & Commitment
            </h3>
            <p>
              This Privacy Policy explains how <strong>Color Sort Puzzle 3D</strong> ("we", "our", or "the App") collects, uses, and safeguards information when you play our water sorting puzzle game on Android or Web platforms. We are committed to protecting user privacy and maintaining full compliance with Google Play Developer Policies, General Data Protection Regulation (GDPR), and Children's Online Privacy Protection Act (COPPA).
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h3 className="text-sm font-black text-blue-400 uppercase tracking-wider">
              2. Data Collection & Local Storage
            </h3>
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
            <h3 className="text-sm font-black text-blue-400 uppercase tracking-wider">
              3. Advertising & AdMob Compliance
            </h3>
            <p>
              We integrate Google AdMob services to serve optional rewarded video ads, banner ads, and interstitial transition breaks:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
              <li>AdMob may utilize non-sensitive advertising IDs (GAID) to prevent fraud and deliver rewarded booster tokens (extra tubes, free hints, undos).</li>
              <li>You can reset your device's Advertising ID at any time via Android Device Settings &gt; Google &gt; Ads.</li>
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h3 className="text-sm font-black text-blue-400 uppercase tracking-wider">
              4. Data Control & Permanently Reset Progress
            </h3>
            <p>
              You maintain full ownership of your stored data. You can clear all cached game states, coin balances, and local records directly in the game under <strong>Settings &gt; Account &gt; Reset Game Progress</strong>.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h3 className="text-sm font-black text-blue-400 uppercase tracking-wider">
              5. Developer Contact & Inquiries
            </h3>
            <p>
              For privacy requests, data deletion inquiries, or technical support, contact the developer directly:
            </p>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 my-1">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
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
                  className="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all"
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
            onClick={() => {
              soundEngine.playSelect();
              onClose();
            }}
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
      </motion.div>
    </div>
  );
};
