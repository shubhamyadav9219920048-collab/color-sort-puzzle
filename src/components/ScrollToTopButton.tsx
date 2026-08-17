import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { soundEngine } from '../lib/sound';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    soundEngine.playSelect();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      id="scroll-to-top-button"
      aria-label="Scroll to top of page"
      className="fixed bottom-6 right-6 z-50 p-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-2xl shadow-cyan-500/30 border border-cyan-300/40 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group"
    >
      <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
};
