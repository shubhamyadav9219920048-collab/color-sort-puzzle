import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Mail, Check, Copy, ExternalLink, ArrowLeft, ShieldCheck } from 'lucide-react';
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
    setTimeout(() => setCopied(false), 2500);
  };

  const handleEmailLaunch = () => {
    soundEngine.playSelect();
    handleCopyEmail();
    const mailtoUrl = `mailto:${developerEmail}?subject=${encodeURIComponent(
      'Color Sort 3D - Terms & EULA Inquiry'
    )}&body=${encodeURIComponent(
      'Hello Developer,\n\nI have a question regarding Terms & Conditions:\n\n[Please enter your query here]\n\nApp Version: 2.5.0'
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
            <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-wide">Terms & Conditions</h1>
              <p className="text-xs text-slate-400 font-medium">
                End User License Agreement (EULA) • August 2026
              </p>
            </div>
          </div>
        </div>

        {/* Terms Content */}
        <div className="p-6 sm:p-8 flex flex-col gap-6 text-sm text-slate-300 leading-relaxed max-h-[75vh] overflow-y-auto">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-slate-950 border border-indigo-500/30 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-indigo-400 shrink-0" />
            <span className="font-semibold text-white">
              By downloading, installing, or playing Color Sort 3D, you agree to these legal terms.
            </span>
          </div>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-black text-indigo-400 uppercase tracking-wider">
              1. Grant of Limited License
            </h2>
            <p>
              We grant you a personal, revocable, non-exclusive, non-transferable license to install and use <strong>Color Sort Puzzle 3D</strong> solely for personal, non-commercial entertainment purposes on compatible web browsers or Android mobile devices.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-black text-indigo-400 uppercase tracking-wider">
              2. Virtual Goods & In-Game Items
            </h2>
            <p>
              The game includes virtual goods such as coins, liquid color themes, test tube skins, extra tubes, hints, and undos.
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
              <li>Virtual items have no real-world monetary value and cannot be redeemed for legal currency.</li>
              <li>Virtual items earned through gameplay, daily rewards, or rewarded ads are linked to your game progress.</li>
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-black text-indigo-400 uppercase tracking-wider">
              3. Fair Play & Conduct Rules
            </h2>
            <p>
              You agree not to reverse engineer, decompile, modify, or exploit game code or physics engines. Use of unauthorized third-party memory editing or automated bots to manipulate global leaderboards is strictly prohibited.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-black text-indigo-400 uppercase tracking-wider">
              4. Disclaimer of Warranties
            </h2>
            <p>
              Color Sort 3D is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind. We strive for 100% bug-free gameplay and liquid shader stability across all mobile chipsets.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-black text-indigo-400 uppercase tracking-wider">
              5. Developer Contact & Legal Inquiries
            </h2>
            <p>
              If you have questions regarding these Terms or licensing permissions, reach out to the developer directly:
            </p>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 my-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-sm font-bold text-white">{developerEmail}</span>
                  <span className="text-xs text-slate-400">Legal & Licensing Contact</span>
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
                  href={`mailto:${developerEmail}?subject=Color%20Sort%203D%20Terms%20Inquiry`}
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
            onClick={() => {
              soundEngine.playVictory();
              handleBackToGame();
            }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white font-black text-xs flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
          >
            <Check className="w-4 h-4" />
            <span>Accept Terms & Return</span>
          </button>
        </div>
      </div>
    </div>
  );
};
