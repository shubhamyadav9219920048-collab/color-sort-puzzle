import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Mail, 
  Send, 
  Check, 
  Copy, 
  ExternalLink, 
  MessageSquare, 
  Bug, 
  Sparkles, 
  Clock, 
  ShieldCheck,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  FileText
} from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Breadcrumb } from '../components/Breadcrumb';
import { SEOHead } from '../components/SEOHead';
import { soundEngine } from '../lib/sound';

export const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  const developerEmail = 'shubhamyadav9219920048@gmail.com';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<'feedback' | 'bug' | 'feature' | 'business' | 'general'>('general');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopyEmail = () => {
    soundEngine.playSelect();
    try {
      navigator.clipboard.writeText(developerEmail);
    } catch (e) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    soundEngine.playSelect();
    setIsSubmitting(true);

    // Simulate swift submission with realistic feedback
    setTimeout(() => {
      soundEngine.playVictory();
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleResetForm = () => {
    soundEngine.playSelect();
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setCategory('general');
    setSubmitted(false);
  };

  const handleDirectEmail = () => {
    soundEngine.playSelect();
    const mailtoUrl = `mailto:${developerEmail}?subject=${encodeURIComponent(
      `Color Sort 3D - [${category.toUpperCase()}] ${subject || 'Inquiry'} from ${name || 'Player'}`
    )}&body=${encodeURIComponent(
      `Name: ${name || 'N/A'}\nEmail: ${email || 'N/A'}\nSubject: ${subject || 'N/A'}\nCategory: ${category}\n\nMessage:\n${message || '[Enter your message here]'}`
    )}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      <SEOHead
        title="Contact Us &amp; Player Support"
        description="Get in touch with the Color Sort Puzzle 3D development team. Submit bug reports, feature suggestions, partnership inquiries, or general support requests."
        canonicalUrl="/contact"
        keywords="contact color sort puzzle, support, developer email, bug report, feature request, customer care"
      />

      <Header />

      <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 flex flex-col gap-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'Contact Us', current: true }]} />

        {/* Page Container */}
        <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-10 flex flex-col gap-8">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 shrink-0">
                <Mail className="w-7 h-7" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Contact &amp; Player Support
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
                  Have a question, feedback, or suggestion? We typically respond within 24–48 hours.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Support Online
              </span>
            </div>
          </div>

          {/* Two-Column Layout: Contact Form & Info Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Col: Contact Form or Success State (7 cols) */}
            <div className="lg:col-span-7 flex flex-col">
              {submitted ? (
                /* Success Message State */
                <div 
                  className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-slate-950 to-slate-900 border border-emerald-500/40 shadow-xl flex flex-col items-center text-center gap-4 animate-in fade-in zoom-in-95 duration-300 my-auto"
                  role="status"
                  aria-live="polite"
                >
                  <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-black text-white">Message Received!</h2>
                    <p className="text-sm text-emerald-300/90 font-medium">
                      Thank you for contacting Color Sort Puzzle 3D, <span className="font-bold text-white">{name}</span>.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 text-left w-full space-y-2">
                    <div className="flex justify-between border-b border-slate-800 pb-1.5">
                      <span className="text-slate-400">Sender:</span>
                      <span className="font-mono text-white">{email}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-1.5">
                      <span className="text-slate-400">Subject:</span>
                      <span className="font-bold text-cyan-300">{subject || 'General Inquiry'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Category:</span>
                      <span className="uppercase text-amber-300 font-bold">{category}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    Our team reviews all player inquiries in order of submission. If your inquiry requires a reply, we will respond to <strong className="text-white">{email}</strong> within 1–2 business days.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full mt-2">
                    <button
                      onClick={handleResetForm}
                      className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all active:scale-95"
                    >
                      Send Another Message
                    </button>
                    <Link
                      to="/play"
                      onClick={() => soundEngine.playSelect()}
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-black text-xs transition-all shadow-md active:scale-95 text-center"
                    >
                      Return to Game
                    </Link>
                  </div>
                </div>
              ) : (
                /* Contact Form */
                <form 
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4.5 bg-slate-950/70 p-5 sm:p-7 rounded-3xl border border-slate-800/80"
                  aria-label="Contact Us Form"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                      Send Us a Message
                    </h2>
                    <span className="text-xs text-slate-500 font-medium">* Required fields</span>
                  </div>

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-name" className="text-xs font-bold text-slate-300">
                        Your Full Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-email" className="text-xs font-bold text-slate-300">
                        Your Email Address <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. alex@example.com"
                        className="w-full px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subject & Category Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-subject" className="text-xs font-bold text-slate-300">
                        Subject Line <span className="text-rose-400">*</span>
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. Issue on Level 42 or Feature Idea"
                        className="w-full px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-category" className="text-xs font-bold text-slate-300">
                        Inquiry Category
                      </label>
                      <select
                        id="contact-category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value as any)}
                        className="w-full px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-white outline-none transition-colors cursor-pointer"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="feedback">Gameplay Feedback</option>
                        <option value="bug">Report a Bug / Glitch</option>
                        <option value="feature">Suggest a Feature / Skin</option>
                        <option value="business">Advertising / Partnership</option>
                      </select>
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-message" className="text-xs font-bold text-slate-300">
                      Message Content <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please write your detailed message, question, or bug description here..."
                      className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-white placeholder-slate-500 outline-none transition-colors resize-y leading-relaxed"
                    />
                  </div>

                  {/* Submit Button & Direct Mail Link */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-cyan-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Sending Message...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Message</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleDirectEmail}
                      className="text-xs text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                    >
                      <span>Or open in Email App</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Col: Support Info, Direct Developer Details & FAQs (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              {/* Direct Developer Card */}
              <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col gap-3.5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Direct Developer Email</h3>
                    <p className="text-xs text-slate-400">For urgent queries &amp; partnership</p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-2">
                  <span className="text-xs font-mono text-cyan-300 truncate font-semibold">
                    {developerEmail}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1 shrink-0 active:scale-95"
                    aria-label="Copy developer email address"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Quick FAQ / Help links */}
              <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col gap-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-400" />
                  Before You Send: Quick Help
                </h3>
                
                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                    <p className="font-semibold text-white mb-1">Stuck on a specific puzzle level?</p>
                    <p className="text-slate-400">
                      Check our comprehensive <Link to="/how-to-play" className="text-cyan-400 hover:underline font-bold">Game Strategy Guide</Link> for detailed walkthroughs, booster tips, and deadlock solutions.
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                    <p className="font-semibold text-white mb-1">In-Game Purchases &amp; Coins</p>
                    <p className="text-slate-400">
                      Color Sort Puzzle 3D is completely free. Coins can be accumulated via Daily Rewards, Daily Missions, and Lucky Spins.
                    </p>
                  </div>
                </div>
              </div>

              {/* Response Time & Privacy Guarantee */}
              <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-850 flex items-center gap-3 text-xs text-slate-400">
                <Clock className="w-5 h-5 text-indigo-400 shrink-0" />
                <span>
                  <strong>Average Response Time:</strong> 24–48 hours on business days. Your contact data is strictly used for replying to your inquiry per our <Link to="/privacy" className="text-cyan-400 hover:underline">Privacy Policy</Link>.
                </span>
              </div>
            </div>
          </div>

          {/* Cross Links Footer */}
          <div className="pt-6 border-t border-slate-800 flex flex-wrap gap-4 text-xs text-slate-400">
            <span>Explore Other Pages:</span>
            <Link to="/about" className="text-cyan-400 hover:underline">About Us</Link>
            <span>•</span>
            <Link to="/how-to-play" className="text-cyan-400 hover:underline">How to Play Guide</Link>
            <span>•</span>
            <Link to="/privacy" className="text-cyan-400 hover:underline">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="text-cyan-400 hover:underline">Terms &amp; Conditions</Link>
            <span>•</span>
            <Link to="/cookies" className="text-cyan-400 hover:underline">Cookie Policy</Link>
            <span>•</span>
            <Link to="/disclaimer" className="text-cyan-400 hover:underline">Legal Disclaimer</Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
