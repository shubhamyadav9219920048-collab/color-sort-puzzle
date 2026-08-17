import React, { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { UserProgress } from './types';
import { loadUserProgress, saveUserProgress, toggleThemeMode } from './lib/storage';

// Pages
import { HomePage } from './pages/HomePage';
import AppGame from './App';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import { AboutPage } from './pages/AboutPage';
import { HowToPlayPage } from './pages/HowToPlayPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { BlogIndexPage } from './pages/BlogIndexPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { BlogCategoriesPage } from './pages/BlogCategoriesPage';
import { CategoryDetailPage } from './pages/CategoryDetailPage';
import { PopularPostsPage } from './pages/PopularPostsPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { RecentlyPlayedPage } from './pages/RecentlyPlayedPage';
import { GameStatsPage } from './pages/GameStatsPage';
import { NewsPage } from './pages/NewsPage';
import { TipsTricksPage } from './pages/TipsTricksPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Shared Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { FavoritesModal } from './components/FavoritesModal';
import { RecentlyPlayedModal } from './components/RecentlyPlayedModal';
import { UserStatsDashboardModal } from './components/UserStatsDashboardModal';
import { ContactModal } from './components/ContactModal';
import { CookieBanner } from './components/CookieBanner';

import './index.css';

// Master App Wrapper with Global Modals & Routing
export const RootApplication: React.FC = () => {
  const [userProgress, setUserProgress] = useState<UserProgress>(() => loadUserProgress());
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isRecentOpen, setIsRecentOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top on every route transition
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Apply dark / light theme to HTML root
  useEffect(() => {
    const isDark = userProgress.darkMode !== false;
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [userProgress.darkMode]);

  // Global Keyboard Shortcut: ⌘K or Ctrl+K for Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleUpdateProgress = (updated: UserProgress) => {
    setUserProgress(updated);
    saveUserProgress(updated);
  };

  const handleToggleTheme = () => {
    const { updatedProgress } = toggleThemeMode(userProgress);
    handleUpdateProgress(updatedProgress);
  };

  // Determine if active route is standalone game screen
  const isPlayPage = location.pathname === '/play';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950 relative overflow-x-hidden">
      {!isPlayPage && (
        <Header
          userProgress={userProgress}
          onOpenContactModal={() => setIsContactOpen(true)}
          onOpenSearchModal={() => setIsSearchOpen(true)}
          onOpenFavoritesModal={() => setIsFavoritesOpen(true)}
          onOpenRecentlyPlayedModal={() => setIsRecentOpen(true)}
          onOpenStatsModal={() => setIsStatsOpen(true)}
          onToggleThemeMode={handleToggleTheme}
        />
      )}

      <main className="flex-1 w-full">
        <Routes>
          {/* Main Portal & Game */}
          <Route path="/" element={<HomePage />} />
          <Route path="/play" element={<AppGame />} />

          {/* Blog & Editorial Hub */}
          <Route 
            path="/blog" 
            element={
              <BlogIndexPage 
                userProgress={userProgress}
                onUpdateProgress={handleUpdateProgress}
                onOpenSearchModal={() => setIsSearchOpen(true)}
              />
            } 
          />
          <Route 
            path="/blog/categories" 
            element={<BlogCategoriesPage />} 
          />
          <Route 
            path="/blog/category/:categoryId" 
            element={
              <CategoryDetailPage 
                userProgress={userProgress}
                onUpdateProgress={handleUpdateProgress}
              />
            } 
          />
          <Route 
            path="/blog/popular" 
            element={
              <PopularPostsPage 
                userProgress={userProgress}
                onUpdateProgress={handleUpdateProgress}
              />
            } 
          />
          <Route 
            path="/blog/:slug" 
            element={
              <ArticleDetailPage 
                userProgress={userProgress}
                onUpdateProgress={handleUpdateProgress}
              />
            } 
          />
          <Route 
            path="/search" 
            element={
              <SearchResultsPage 
                userProgress={userProgress}
                onUpdateProgress={handleUpdateProgress}
              />
            } 
          />

          {/* User Feature Pages */}
          <Route 
            path="/favorites" 
            element={
              <FavoritesPage 
                userProgress={userProgress}
                onUpdateProgress={handleUpdateProgress}
              />
            } 
          />
          <Route 
            path="/recent" 
            element={
              <RecentlyPlayedPage 
                userProgress={userProgress}
                onSelectLevel={(lvl) => navigate('/play')}
              />
            } 
          />
          <Route 
            path="/stats" 
            element={<GameStatsPage userProgress={userProgress} />} 
          />

          {/* Game Guide, About, Legal, FAQ, News, Tips */}
          <Route path="/how-to-play" element={<HowToPlayPage />} />
          <Route path="/guide" element={<HowToPlayPage />} />
          <Route path="/game-guide" element={<HowToPlayPage />} />
          <Route path="/tips" element={<TipsTricksPage />} />
          <Route path="/tips-tricks" element={<TipsTricksPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/cookies" element={<CookiePolicyPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />

          {/* Catch-all Fallback (404 Page) */}
          <Route path="*" element={<NotFoundPage onOpenSearch={() => setIsSearchOpen(true)} />} />
        </Routes>
      </main>

      {!isPlayPage && (
        <Footer onOpenContactModal={() => setIsContactOpen(true)} />
      )}

      {/* Global Scroll to Top Button */}
      <ScrollToTopButton />

      {/* Global Interactive Modals */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        userProgress={userProgress}
        onUpdateProgress={handleUpdateProgress}
      />

      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        userProgress={userProgress}
        onUpdateProgress={handleUpdateProgress}
      />

      <RecentlyPlayedModal
        isOpen={isRecentOpen}
        onClose={() => setIsRecentOpen(false)}
        userProgress={userProgress}
        onSelectLevel={(lvl) => {
          setIsRecentOpen(false);
          navigate('/play');
        }}
      />

      <UserStatsDashboardModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        userProgress={userProgress}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <CookieBanner />
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <RootApplication />
    </BrowserRouter>
  </StrictMode>
);
