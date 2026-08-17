import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Play, 
  Menu, 
  X, 
  Sparkles, 
  HelpCircle, 
  Info, 
  Mail, 
  Home, 
  Layers, 
  Trophy, 
  ShieldCheck,
  Zap,
  BookOpen,
  Search,
  Bookmark,
  History,
  BarChart3,
  Sun,
  Moon
} from 'lucide-react';
import { UserProgress } from '../types';
import { soundEngine } from '../lib/sound';

interface HeaderProps {
  onPlayNowClick?: () => void;
  onOpenContactModal?: () => void;
  onOpenSearchModal?: () => void;
  onOpenFavoritesModal?: () => void;
  onOpenRecentlyPlayedModal?: () => void;
  onOpenStatsModal?: () => void;
  onToggleThemeMode?: () => void;
  userProgress?: UserProgress;
}

export const Header: React.FC<HeaderProps> = ({ 
  onPlayNowClick, 
  onOpenContactModal,
  onOpenSearchModal,
  onOpenFavoritesModal,
  onOpenRecentlyPlayedModal,
  onOpenStatsModal,
  onToggleThemeMode,
  userProgress
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = (targetId?: string, routePath?: string) => {
    soundEngine.playSelect();
    setMobileMenuOpen(false);

    if (routePath && location.pathname !== routePath) {
      navigate(routePath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (targetId) {
      if (location.pathname !== '/') {
        navigate(`/#${targetId}`);
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handlePlayClick = () => {
    soundEngine.playSelect();
    setMobileMenuOpen(false);
    if (onPlayNowClick) {
      onPlayNowClick();
    } else {
      handleNavClick('game-arena', '/play');
    }
  };

  const favoritesCount = userProgress?.favorites?.length || 0;
  const isDarkMode = userProgress?.darkMode ?? true;

  return (
    <header 
      id="main-header"
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-xl shadow-cyan-950/20 py-2.5' 
          : 'bg-slate-950/60 backdrop-blur-sm border-b border-slate-900 py-3.5'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link 
          to="/" 
          onClick={() => {
            soundEngine.playSelect();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none"
          id="brand-logo-link"
        >
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-x-1 bottom-1 h-4 bg-gradient-to-t from-cyan-400 to-blue-500 rounded-b-lg opacity-80" />
              <div className="absolute inset-x-2 bottom-3 h-2 bg-purple-400 rounded-full opacity-70" />
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 relative z-10 animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-base sm:text-xl tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                Color Sort <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">3D</span>
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-[9px] font-extrabold uppercase tracking-wider hidden lg:inline-block">
                Free Game
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium tracking-wide hidden xs:block">
              Fluid Water Sorting Puzzle
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
          <button
            onClick={() => handleNavClick(undefined, '/')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs xl:text-sm transition-all ${
              location.pathname === '/' 
                ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Home
          </button>

          <button
            onClick={handlePlayClick}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs xl:text-sm transition-all ${
              location.pathname === '/play' 
                ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Play Game
          </button>

          <button
            onClick={() => handleNavClick(undefined, '/blog')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs xl:text-sm transition-all flex items-center gap-1.5 ${
              location.pathname.startsWith('/blog') 
                ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Blog (20+)</span>
          </button>

          <button
            onClick={() => handleNavClick('how-to-play', '/how-to-play')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs xl:text-sm transition-all ${
              location.pathname === '/how-to-play' 
                ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Guide
          </button>

          <button
            onClick={() => handleNavClick('about', '/about')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs xl:text-sm transition-all ${
              location.pathname === '/about' 
                ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            About
          </button>

          <button
            onClick={() => {
              if (onOpenContactModal) {
                soundEngine.playSelect();
                onOpenContactModal();
              } else {
                handleNavClick('contact', '/contact');
              }
            }}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs xl:text-sm transition-all ${
              location.pathname === '/contact' 
                ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Action Header Items: Search, Favorites, Stats, Theme, Play CTA */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Site Search Button */}
          <button
            id="header-search-btn"
            onClick={() => {
              soundEngine.playSelect();
              if (onOpenSearchModal) onOpenSearchModal();
              else navigate('/search');
            }}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-300 text-xs font-medium flex items-center gap-1.5 transition-all"
            title="Search articles and puzzles (⌘K)"
            aria-label="Site Search"
          >
            <Search className="w-4 h-4 text-cyan-400" />
            <span className="hidden xl:inline">Search</span>
            <kbd className="hidden xl:inline px-1.5 py-0.2 rounded bg-slate-800 text-[10px] text-slate-400 font-mono">⌘K</kbd>
          </button>

          {/* Favorites Button */}
          <button
            id="header-favorites-btn"
            onClick={() => {
              soundEngine.playSelect();
              if (onOpenFavoritesModal) onOpenFavoritesModal();
              else navigate('/favorites');
            }}
            className="p-2 sm:p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-amber-400 transition-all relative"
            title="Saved Favorites"
            aria-label="Saved Favorites"
          >
            <Bookmark className="w-4 h-4" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-black text-[9px] flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Stats Button */}
          <button
            id="header-stats-btn"
            onClick={() => {
              soundEngine.playSelect();
              if (onOpenStatsModal) onOpenStatsModal();
              else navigate('/stats');
            }}
            className="p-2 sm:p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-all hidden sm:flex items-center justify-center"
            title="Game Statistics & Analytics"
            aria-label="Game Statistics"
          >
            <BarChart3 className="w-4 h-4" />
          </button>

          {/* Recently Played Button */}
          <button
            id="header-recents-btn"
            onClick={() => {
              soundEngine.playSelect();
              if (onOpenRecentlyPlayedModal) onOpenRecentlyPlayedModal();
              else navigate('/recent');
            }}
            className="p-2 sm:p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-all hidden sm:flex items-center justify-center"
            title="Recently Played Matches"
            aria-label="Recently Played"
          >
            <History className="w-4 h-4" />
          </button>

          {/* Dark / Light Mode Toggle */}
          {onToggleThemeMode && (
            <button
              id="header-theme-toggle-btn"
              onClick={() => {
                soundEngine.playSelect();
                onToggleThemeMode();
              }}
              className="p-2 sm:p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-amber-300 transition-all"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}

          {/* Header Play CTA */}
          <button
            id="header-play-cta-btn"
            onClick={handlePlayClick}
            className="px-3.5 sm:px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-black text-xs sm:text-xs tracking-wide shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center gap-1.5 border border-emerald-300/40"
          >
            <Play className="w-3.5 h-3.5 fill-slate-950" />
            <span>PLAY</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => {
              soundEngine.playSelect();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white active:scale-95 transition-all ml-1"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-slate-950/98 backdrop-blur-2xl border-b border-slate-800 px-4 py-5 shadow-2xl animate-in slide-in-from-top duration-200 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => handleNavClick(undefined, '/')}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left font-bold text-sm text-slate-200 hover:bg-slate-900 hover:text-cyan-400 transition-colors"
            >
              <Home className="w-4 h-4 text-cyan-400" />
              <span>Home</span>
            </button>

            <button
              onClick={handlePlayClick}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left font-bold text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 transition-colors"
            >
              <Play className="w-4 h-4 fill-emerald-400 text-emerald-400" />
              <span>Play Game Online (500 Levels)</span>
            </button>

            <button
              onClick={() => handleNavClick(undefined, '/blog')}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left font-bold text-sm text-slate-200 hover:bg-slate-900 hover:text-cyan-400 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span>Blog &amp; Knowledge Hub (20 Articles)</span>
            </button>

            <button
              onClick={() => handleNavClick(undefined, '/blog/popular')}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left font-bold text-sm text-slate-200 hover:bg-slate-900 hover:text-rose-400 transition-colors"
            >
              <Zap className="w-4 h-4 text-rose-400" />
              <span>Popular Articles &amp; Rankings</span>
            </button>

            <button
              onClick={() => handleNavClick('how-to-play', '/how-to-play')}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left font-bold text-sm text-slate-200 hover:bg-slate-900 hover:text-cyan-400 transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>Strategy Guide (1,500+ Words)</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playSelect();
                setMobileMenuOpen(false);
                if (onOpenFavoritesModal) onOpenFavoritesModal();
                else navigate('/favorites');
              }}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left font-bold text-sm text-slate-200 hover:bg-slate-900 hover:text-amber-400 transition-colors"
            >
              <Bookmark className="w-4 h-4 text-amber-400" />
              <span>Saved Favorites ({favoritesCount})</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playSelect();
                setMobileMenuOpen(false);
                if (onOpenStatsModal) onOpenStatsModal();
                else navigate('/stats');
              }}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left font-bold text-sm text-slate-200 hover:bg-slate-900 hover:text-cyan-400 transition-colors"
            >
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <span>Player Statistics &amp; Mastery</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playSelect();
                setMobileMenuOpen(false);
                if (onOpenRecentlyPlayedModal) onOpenRecentlyPlayedModal();
                else navigate('/recent');
              }}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left font-bold text-sm text-slate-200 hover:bg-slate-900 hover:text-cyan-400 transition-colors"
            >
              <History className="w-4 h-4 text-indigo-400" />
              <span>Recently Played</span>
            </button>

            <button
              onClick={() => handleNavClick('about', '/about')}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left font-bold text-sm text-slate-200 hover:bg-slate-900 hover:text-cyan-400 transition-colors"
            >
              <Info className="w-4 h-4 text-teal-400" />
              <span>About Us</span>
            </button>

            <button
              onClick={() => {
                if (onOpenContactModal) {
                  soundEngine.playSelect();
                  setMobileMenuOpen(false);
                  onOpenContactModal();
                } else {
                  handleNavClick('contact', '/contact');
                }
              }}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left font-bold text-sm text-slate-200 hover:bg-slate-900 hover:text-cyan-400 transition-colors"
            >
              <Mail className="w-4 h-4 text-indigo-400" />
              <span>Contact &amp; Support</span>
            </button>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
            <Link to="/privacy" className="hover:text-slate-200">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-200">Terms &amp; Conditions</Link>
            <Link to="/cookies" className="hover:text-slate-200">Cookie Policy</Link>
            <Link to="/disclaimer" className="hover:text-slate-200">Disclaimer</Link>
          </div>
        </div>
      )}
    </header>
  );
};

