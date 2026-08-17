import React, { useState } from 'react';
import { Mail, CheckCircle2, ShieldCheck, Sparkles, Send, ArrowRight } from 'lucide-react';
import { soundEngine } from '../lib/sound';

interface NewsletterSubscribeProps {
  variant?: 'inline' | 'card' | 'banner';
  title?: string;
  subtitle?: string;
}

export const NewsletterSubscribe: React.FC<NewsletterSubscribeProps> = ({
  variant = 'card',
  title = "Join 25,000+ Puzzle Solvers",
  subtitle = "Get weekly brain workout challenges, exclusive solver strategies, and early access to new 3D liquid themes."
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playSelect();

    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      // Save subscriber status locally
      try {
        localStorage.setItem('csp3d_newsletter_subscribed', 'true');
        localStorage.setItem('csp3d_newsletter_email', email);
      } catch (err) {}

      soundEngine.playVictory();
      setStatus('success');
      setEmail('');
    }, 600);
  };

  if (status === 'success') {
    return (
      <div 
        id="newsletter-success-box" 
        className="w-full p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-cyan-950/70 border border-emerald-500/40 text-center shadow-xl flex flex-col items-center gap-3 animate-fade-in"
      >
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-black text-white">You're on the VIP Puzzle List!</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md">
          Thank you for subscribing. Check your inbox every Tuesday for new mind drills, parity logic cheatsheets, and special theme giveaway codes.
        </p>
        <div className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold pt-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Zero spam guaranteed • 1-click unsubscribe anytime</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      id="newsletter-subscribe-box"
      className={`w-full relative overflow-hidden ${
        variant === 'banner' 
          ? 'p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/80 via-slate-900 to-indigo-950/80 border border-cyan-500/30 shadow-2xl'
          : variant === 'card'
          ? 'p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl'
          : 'p-4 rounded-2xl bg-slate-900/70 border border-slate-800'
      }`}
    >
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-left max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 text-[11px] font-bold border border-cyan-500/30 mb-2">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Weekly Mind Gym Digest</span>
          </div>
          <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
            {subtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full md:w-auto flex-1 max-w-md flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="newsletter-email-input"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Enter your email address..."
                aria-label="Email address for puzzle newsletter"
                required
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950 border border-slate-750 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all shadow-inner"
              />
            </div>
            <button
              id="newsletter-submit-button"
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-lg shadow-cyan-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
            >
              {status === 'loading' ? (
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {status === 'error' && (
            <span className="text-[11px] text-rose-400 font-medium pl-1">
              {errorMsg}
            </span>
          )}

          <div className="flex items-center gap-2 text-[11px] text-slate-400 pl-1 pt-0.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Strict privacy. No third-party sharing. Unsubscribe anytime.</span>
          </div>
        </form>
      </div>
    </div>
  );
};
