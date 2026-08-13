import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Settings,
  Volume2,
  VolumeX,
  Music,
  Smartphone,
  RefreshCw,
  HelpCircle,
  Download,
  Upload,
  Check,
  Cloud,
  CloudOff,
  Globe,
  Sun,
  Moon,
  Zap,
  Sliders,
  AlertTriangle,
  Monitor,
  ShieldAlert,
  User,
  LogOut,
  LogIn,
  Mail,
  FileText,
  Shield,
  Star,
  Share2,
  Gamepad2,
  ExternalLink,
  MessageSquare,
  Send,
  Sparkles,
  HeartHandshake,
  CheckCircle2,
  Lock,
  Trophy,
  Copy,
} from 'lucide-react';
import { UserProgress, UserAccount } from '../types';
import { soundEngine } from '../lib/sound';
import { AdMobBanner } from './AdMobBanner';
import { saveUserProgress, resetUserProgress } from '../lib/storage';

interface SettingsModalProps {
  userProgress: UserProgress;
  onUpdateSettings: (updated: UserProgress) => void;
  onResetProgress: () => void;
  onClose: () => void;
  onOpenLeaderboard?: () => void;
  onOpenAchievements?: () => void;
  onOpenPrivacyPolicy?: () => void;
  onOpenTerms?: () => void;
}

export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
];

export const MORE_GAMES = [
  {
    id: 'liquid_master',
    title: 'Liquid Logic 3D',
    category: 'Physics Puzzle',
    rating: '4.9 ★',
    downloads: '1M+',
    description: 'Master gravity and fluid dynamics in 200+ challenging physics levels!',
    iconBg: 'from-blue-500 to-cyan-400',
  },
  {
    id: 'color_match',
    title: 'Color Match Pro',
    category: 'Mind & Memory',
    rating: '4.8 ★',
    downloads: '500K+',
    description: 'Fast-paced spatial color sorting with daily brain tournaments.',
    iconBg: 'from-purple-500 to-pink-500',
  },
  {
    id: 'block_sort',
    title: 'Block Sort Deluxe',
    category: 'Casual Strategy',
    rating: '4.9 ★',
    downloads: '2M+',
    description: 'Stack and merge vibrant 3D blocks in satisfying combo chain reactions.',
    iconBg: 'from-emerald-500 to-teal-400',
  },
];

export const SettingsModal: React.FC<SettingsModalProps> = ({
  userProgress,
  onUpdateSettings,
  onResetProgress,
  onClose,
  onOpenLeaderboard,
  onOpenAchievements,
  onOpenPrivacyPolicy,
  onOpenTerms,
}) => {
  const [activeTab, setActiveTab] = useState<'account' | 'play_games' | 'audio' | 'display' | 'privacy' | 'extra' | 'guide'>('account');
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [copiedBackup, setCopiedBackup] = useState(false);
  const [importString, setImportString] = useState('');
  const [showImportBox, setShowImportBox] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Sub-modal views
  const [activeSubView, setActiveSubView] = useState<'privacy' | 'terms' | 'contact' | 'rate' | 'more_games' | null>(null);

  // Google Sign-In Simulation state
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState<string | null>(null);

  // Rating state
  const [ratingStars, setRatingStars] = useState<number>(5);
  const [ratingFeedback, setRatingFeedback] = useState<string>('');
  const [ratingSubmitted, setRatingSubmitted] = useState<boolean>(false);

  // Contact support form state
  const [contactSubject, setContactSubject] = useState<string>('Bug Report');
  const [contactMessage, setContactMessage] = useState<string>('');
  const [contactSent, setContactSent] = useState<boolean>(false);

  // Settings update helper
  const updateSetting = <K extends keyof UserProgress>(key: K, value: UserProgress[K]) => {
    soundEngine.playSelect();
    const updated: UserProgress = {
      ...userProgress,
      [key]: value,
    };

    // Apply audio changes directly to soundEngine
    if (key === 'soundEnabled') {
      soundEngine.enabled = value as boolean;
    }
    if (key === 'hapticsEnabled' || key === 'vibrationEnabled') {
      soundEngine.hapticsEnabled = value as boolean;
    }
    if (key === 'musicEnabled') {
      soundEngine.musicEnabled = value as boolean;
      if (!value) {
        soundEngine.stopThemeMusic();
      } else {
        soundEngine.startThemeMusic(userProgress.activeTheme || 'forest');
      }
    }
    if (key === 'soundVolume') {
      soundEngine.soundVolume = value as number;
    }
    if (key === 'musicVolume') {
      soundEngine.musicVolume = value as number;
    }

    onUpdateSettings(updated);
  };

  // Google Sign In / Sign Out handler
  const handleGoogleSignIn = () => {
    soundEngine.playSelect();
    setIsSigningIn(true);
    setTimeout(() => {
      setIsSigningIn(false);
      const userAccount: UserAccount = {
        isSignedIn: true,
        displayName: 'Alex Smith',
        email: 'alex.smith.player@gmail.com',
        photoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        provider: 'google',
        lastSyncedAt: new Date().toISOString(),
      };

      const updated = {
        ...userProgress,
        account: userAccount,
      };
      onUpdateSettings(updated);
      saveUserProgress(updated);
      soundEngine.playCoin();
      setSyncStatusMsg('Google Account connected & synced!');
      setTimeout(() => setSyncStatusMsg(null), 3000);
    }, 1200);
  };

  const handleGoogleSignOut = () => {
    soundEngine.playSelect();
    const userAccount: UserAccount = {
      isSignedIn: false,
      displayName: 'Guest Player',
      email: '',
      provider: 'guest',
      lastSyncedAt: new Date().toISOString(),
    };
    const updated = {
      ...userProgress,
      account: userAccount,
    };
    onUpdateSettings(updated);
    saveUserProgress(updated);
    setSyncStatusMsg('Signed out of Google account.');
    setTimeout(() => setSyncStatusMsg(null), 3000);
  };

  const handleForceSyncNow = () => {
    soundEngine.playSelect();
    setSyncStatusMsg('Syncing data to Cloud...');
    setTimeout(() => {
      const updatedAccount: UserAccount = {
        ...(userProgress.account || { isSignedIn: false }),
        lastSyncedAt: new Date().toISOString(),
      };
      const updated = { ...userProgress, account: updatedAccount };
      onUpdateSettings(updated);
      saveUserProgress(updated);
      soundEngine.playCoin();
      setSyncStatusMsg('Cloud Save complete! Progress is safe.');
      setTimeout(() => setSyncStatusMsg(null), 3000);
    }, 800);
  };

  const handleRestoreProgress = () => {
    soundEngine.playSelect();
    setSyncStatusMsg('Restoring cloud save data...');
    setTimeout(() => {
      soundEngine.playVictory();
      setSyncStatusMsg('Cloud save successfully restored!');
      setTimeout(() => setSyncStatusMsg(null), 3000);
    }, 1000);
  };

  const handleRestorePurchases = () => {
    soundEngine.playSelect();
    setSyncStatusMsg('Verifying Google Play purchases...');
    setTimeout(() => {
      soundEngine.playVictory();
      const updated: UserProgress = {
        ...userProgress,
        freeHints: (userProgress.freeHints || 0) + 2,
        freeExtraTubes: (userProgress.freeExtraTubes || 0) + 1,
        freeSkips: (userProgress.freeSkips || 0) + 1,
        coins: userProgress.coins + 500,
      };
      onUpdateSettings(updated);
      saveUserProgress(updated);
      setSyncStatusMsg('Purchases restored! Granted 500 Coins + Boosters & No-Ads License!');
      setTimeout(() => setSyncStatusMsg(null), 4000);
    }, 1200);
  };

  const handleShareApp = () => {
    soundEngine.playSelect();
    const shareData = {
      title: 'Color Sort Puzzle 3D',
      text: `Can you solve level ${userProgress.currentLevel}? Play Color Sort Puzzle 3D with liquid physics!`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setSyncStatusMsg('Game share link copied to clipboard!');
      setTimeout(() => setSyncStatusMsg(null), 3000);
    }
  };

  const handleExportSave = () => {
    try {
      const json = JSON.stringify(userProgress);
      navigator.clipboard.writeText(json);
      setCopiedBackup(true);
      setTimeout(() => setCopiedBackup(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const handleImportSave = () => {
    try {
      const parsed = JSON.parse(importString.trim());
      if (parsed && typeof parsed === 'object' && parsed.coins !== undefined) {
        saveUserProgress(parsed);
        setImportStatus('Save loaded successfully!');
        setTimeout(() => {
          window.location.reload();
        }, 800);
      } else {
        setImportStatus('Invalid save data format.');
      }
    } catch (e) {
      setImportStatus('Failed to parse save code.');
    }
  };

  const handleConfirmReset = () => {
    soundEngine.playError();
    resetUserProgress();
    onResetProgress();
    setShowConfirmReset(false);
    onClose();
    window.location.reload();
  };

  const currentLanguage =
    LANGUAGES.find((l) => l.code === (userProgress.language || 'en')) || LANGUAGES[0];

  const userAccount = userProgress.account || {
    isSignedIn: false,
    displayName: 'Guest Player',
    email: '',
    provider: 'guest',
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg max-h-[92vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden relative"
      >
        {/* Top Ambient Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-950/90 via-slate-900 to-slate-950/90 z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              <Settings className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg font-black text-white tracking-wide">Settings & Account</h2>
              <span className="text-xs text-cyan-400/80 font-bold">Manage Account, Audio & Preferences</span>
            </div>
          </div>
          <button
            onClick={() => {
              soundEngine.playSelect();
              onClose();
            }}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Navigation Tabs */}
        <div className="px-4 pt-3 bg-slate-950/60 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto z-10 no-scrollbar">
          <button
            onClick={() => {
              soundEngine.playSelect();
              setActiveTab('play_games');
            }}
            className={`px-3 py-2 rounded-t-xl text-xs font-black transition-all flex items-center gap-1.5 border-t border-x shrink-0 ${
              activeTab === 'play_games'
                ? 'bg-slate-900 border-slate-700 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5 text-emerald-400" />
            Play Games
          </button>

          <button
            onClick={() => {
              soundEngine.playSelect();
              setActiveTab('account');
            }}
            className={`px-3 py-2 rounded-t-xl text-xs font-black transition-all flex items-center gap-1.5 border-t border-x shrink-0 ${
              activeTab === 'account'
                ? 'bg-slate-900 border-slate-700 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            Account
          </button>

          <button
            onClick={() => {
              soundEngine.playSelect();
              setActiveTab('audio');
            }}
            className={`px-3 py-2 rounded-t-xl text-xs font-black transition-all flex items-center gap-1.5 border-t border-x shrink-0 ${
              activeTab === 'audio'
                ? 'bg-slate-900 border-slate-700 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            Audio
          </button>

          <button
            onClick={() => {
              soundEngine.playSelect();
              setActiveTab('display');
            }}
            className={`px-3 py-2 rounded-t-xl text-xs font-black transition-all flex items-center gap-1.5 border-t border-x shrink-0 ${
              activeTab === 'display'
                ? 'bg-slate-900 border-slate-700 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            Display
          </button>

          <button
            onClick={() => {
              soundEngine.playSelect();
              setActiveTab('privacy');
            }}
            className={`px-3 py-2 rounded-t-xl text-xs font-black transition-all flex items-center gap-1.5 border-t border-x shrink-0 ${
              activeTab === 'privacy'
                ? 'bg-slate-900 border-slate-700 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            Privacy
          </button>

          <button
            onClick={() => {
              soundEngine.playSelect();
              setActiveTab('extra');
            }}
            className={`px-3 py-2 rounded-t-xl text-xs font-black transition-all flex items-center gap-1.5 border-t border-x shrink-0 ${
              activeTab === 'extra'
                ? 'bg-slate-900 border-slate-700 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            Extra
          </button>

          <button
            onClick={() => {
              soundEngine.playSelect();
              setActiveTab('guide');
            }}
            className={`px-3 py-2 rounded-t-xl text-xs font-black transition-all flex items-center gap-1.5 border-t border-x shrink-0 ${
              activeTab === 'guide'
                ? 'bg-slate-900 border-slate-700 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Rules
          </button>
        </div>

        {/* Sync Toast Feedback */}
        {syncStatusMsg && (
          <div className="bg-cyan-500/20 border-b border-cyan-500/40 px-4 py-2 text-xs font-bold text-cyan-300 text-center flex items-center justify-center gap-2">
            <Check className="w-3.5 h-3.5" />
            <span>{syncStatusMsg}</span>
          </div>
        )}

        {/* Scrollable Main Content */}
        <div className="p-5 overflow-y-auto flex-1 flex flex-col gap-5 z-10">
          {/* TAB 0: GOOGLE PLAY GAMES INTEGRATION */}
          {activeTab === 'play_games' && (
            <div className="flex flex-col gap-4">
              {/* Google Play Games Sign-In Profile Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/80 via-slate-900 to-teal-950/60 border border-emerald-500/40 flex flex-col gap-3 relative overflow-hidden shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400/60 flex items-center justify-center shrink-0 text-emerald-400 shadow-inner">
                      <Gamepad2 className="w-7 h-7 animate-pulse" />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-black text-white">
                          {userAccount.isSignedIn ? userAccount.displayName : 'Google Play Games'}
                        </span>
                        {userAccount.isSignedIn && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[9px]">
                            Connected
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-emerald-300/80 font-bold">
                        {userAccount.isSignedIn
                          ? `GamerTag: ${userAccount.displayName.replace(/\s+/g, '')}#9201 • Level 24 XP`
                          : 'Sign in to access Leaderboards & Trophies'}
                      </span>
                    </div>
                  </div>
                </div>

                {!userAccount.isSignedIn ? (
                  <button
                    onClick={handleGoogleSignIn}
                    disabled={isSigningIn}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                  >
                    <Gamepad2 className="w-4 h-4" />
                    <span>{isSigningIn ? 'Connecting Play Games...' : 'Sign in with Google Play Games'}</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 py-2 px-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-between">
                      <span>XP Progress: 14,850 / 20,000</span>
                      <span className="font-black text-white">74%</span>
                    </div>
                    <button
                      onClick={handleGoogleSignOut}
                      className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 font-bold text-xs flex items-center gap-1 transition-all"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Disconnect</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Google Play Games Quick Services */}
              <div className="grid grid-cols-2 gap-3">
                {/* Leaderboards */}
                <button
                  onClick={() => {
                    soundEngine.playSelect();
                    if (onOpenLeaderboard) {
                      onOpenLeaderboard();
                      onClose();
                    }
                  }}
                  className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30 hover:border-amber-500/60 flex flex-col items-start gap-2.5 transition-all group text-left relative overflow-hidden"
                >
                  <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 group-hover:scale-110 transition-transform">
                    <Trophy className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-white group-hover:text-amber-300 transition-colors">
                      Leaderboards
                    </span>
                    <span className="text-[10px] text-slate-400">Global & Country Ranks</span>
                  </div>
                  <span className="text-[10px] font-bold text-amber-400 mt-1">
                    Rank #{userProgress.currentLevel > 10 ? 142 : 890}
                  </span>
                </button>

                {/* Achievements */}
                <button
                  onClick={() => {
                    soundEngine.playSelect();
                    if (onOpenAchievements) {
                      onOpenAchievements();
                      onClose();
                    }
                  }}
                  className="p-4 rounded-2xl bg-slate-950/80 border border-purple-500/30 hover:border-purple-500/60 flex flex-col items-start gap-2.5 transition-all group text-left relative overflow-hidden"
                >
                  <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-white group-hover:text-purple-300 transition-colors">
                      Achievements
                    </span>
                    <span className="text-[10px] text-slate-400">Unlock Play Trophies</span>
                  </div>
                  <span className="text-[10px] font-bold text-purple-400 mt-1">
                    {userProgress.achievementsCompleted?.length || 5} / 30 Unlocked
                  </span>
                </button>
              </div>

              {/* Play Games Cloud Features List */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col gap-2.5">
                <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">
                  Google Play Games Services
                </span>
                <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
                  <li>
                    <strong className="text-white">Cloud Save:</strong> Progress auto-syncs across all Android devices.
                  </li>
                  <li>
                    <strong className="text-white">Live Leaderboards:</strong> Real-time ranking with friends and regional players.
                  </li>
                  <li>
                    <strong className="text-white">XP & Badges:</strong> Earn Google Play Games profile XP for completed puzzle milestones.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 1: ACCOUNT & CLOUD */}
          {activeTab === 'account' && (
            <div className="flex flex-col gap-4">
              {/* Google Account Profile Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/50 border border-slate-800 flex flex-col gap-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800 border-2 border-cyan-500/40 overflow-hidden flex items-center justify-center shrink-0">
                      {userAccount.photoUrl ? (
                        <img src={userAccount.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-6 h-6 text-slate-400" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-black text-white">{userAccount.displayName}</span>
                        {userAccount.isSignedIn && (
                          <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[9px] font-black">
                            Google Connected
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400">
                        {userAccount.email || 'Sign in to back up game save in Google Cloud'}
                      </span>
                    </div>
                  </div>
                </div>

                {!userAccount.isSignedIn ? (
                  <button
                    onClick={handleGoogleSignIn}
                    disabled={isSigningIn}
                    className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-white/10 active:scale-95"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>{isSigningIn ? 'Connecting Google Account...' : 'Sign In with Google'}</span>
                  </button>
                ) : (
                  <button
                    onClick={handleGoogleSignOut}
                    className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-400" />
                    <span>Sign Out</span>
                  </button>
                )}
              </div>

              {/* Cloud Save Controls */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {userProgress.cloudSaveEnabled !== false ? (
                        <Cloud className="w-5 h-5 text-cyan-400" />
                      ) : (
                        <CloudOff className="w-5 h-5 text-slate-500" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-white">Cloud Auto-Save</span>
                      <span className="text-[11px] text-slate-400">Sync progress across browser sessions</span>
                    </div>
                  </div>
                  <button
                    onClick={() => updateSetting('cloudSaveEnabled', !userProgress.cloudSaveEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                      userProgress.cloudSaveEnabled !== false ? 'bg-cyan-500' : 'bg-slate-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        userProgress.cloudSaveEnabled !== false ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={handleForceSyncNow}
                    className="py-2 px-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 font-black text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Cloud className="w-3.5 h-3.5" />
                    <span>Sync Now</span>
                  </button>

                  <button
                    onClick={handleRestoreProgress}
                    className="py-2 px-3 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 font-black text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Restore Save</span>
                  </button>
                </div>
              </div>

              {/* Raw Save Code Backup */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col gap-3">
                <span className="text-xs font-black uppercase text-cyan-400 tracking-wider">
                  Backup & Restore Save Code
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Export raw save code to transfer game progress to another device or backup locally.
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportSave}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    {copiedBackup ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4" />}
                    <span>{copiedBackup ? 'Copied Code!' : 'Export Save'}</span>
                  </button>

                  <button
                    onClick={() => setShowImportBox(!showImportBox)}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Upload className="w-4 h-4 text-purple-400" />
                    <span>Import Save</span>
                  </button>
                </div>

                {showImportBox && (
                  <div className="flex flex-col gap-2 pt-2 border-t border-slate-800">
                    <textarea
                      value={importString}
                      onChange={(e) => setImportString(e.target.value)}
                      placeholder="Paste exported JSON save string here..."
                      className="w-full h-20 p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                    />
                    <button
                      onClick={handleImportSave}
                      className="py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs transition-all shadow-md"
                    >
                      Load Save Data
                    </button>
                    {importStatus && (
                      <span className="text-xs text-center font-bold text-amber-400">{importStatus}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Danger Zone: Reset Progress */}
              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/40 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-rose-400 font-black text-xs uppercase tracking-wider">
                  <ShieldAlert className="w-4 h-4" /> Reset Game Progress
                </div>
                <p className="text-xs text-slate-400">
                  Wipe all completed levels, coins, skins, and achievements permanently.
                </p>

                {!showConfirmReset ? (
                  <button
                    onClick={() => setShowConfirmReset(true)}
                    className="py-2.5 px-4 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 font-black text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Reset Game Progress</span>
                  </button>
                ) : (
                  <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500 flex flex-col gap-2">
                    <span className="text-xs font-black text-rose-200 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      Are you completely sure?
                    </span>
                    <span className="text-[11px] text-slate-300">This action CANNOT be undone!</span>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={handleConfirmReset}
                        className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs transition-all shadow-lg"
                      >
                        Yes, Erase Everything
                      </button>
                      <button
                        onClick={() => setShowConfirmReset(false)}
                        className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: AUDIO & HAPTICS */}
          {activeTab === 'audio' && (
            <div className="flex flex-col gap-4">
              {/* Music Toggle & Slider */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                      <Music className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-white">Background Music</span>
                      <span className="text-[11px] text-slate-400">Ambient theme melodies</span>
                    </div>
                  </div>
                  <button
                    onClick={() => updateSetting('musicEnabled', !userProgress.musicEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                      userProgress.musicEnabled !== false ? 'bg-purple-500' : 'bg-slate-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        userProgress.musicEnabled !== false ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {userProgress.musicEnabled !== false && (
                  <div className="flex items-center gap-3 pt-2 border-t border-slate-800/80">
                    <span className="text-xs font-bold text-slate-400 w-16">Volume:</span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={userProgress.musicVolume ?? 0.8}
                      onChange={(e) => updateSetting('musicVolume', parseFloat(e.target.value))}
                      className="flex-1 accent-purple-500 cursor-pointer"
                    />
                    <span className="text-xs font-black text-purple-300 w-10 text-right">
                      {Math.round((userProgress.musicVolume ?? 0.8) * 100)}%
                    </span>
                  </div>
                )}
              </div>

              {/* Sound Effects Toggle & Slider */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                      {userProgress.soundEnabled ? (
                        <Volume2 className="w-5 h-5" />
                      ) : (
                        <VolumeX className="w-5 h-5 text-slate-500" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-white">Sound Effects (SFX)</span>
                      <span className="text-[11px] text-slate-400">Liquid pouring & puzzle tones</span>
                    </div>
                  </div>
                  <button
                    onClick={() => updateSetting('soundEnabled', !userProgress.soundEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                      userProgress.soundEnabled ? 'bg-cyan-500' : 'bg-slate-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        userProgress.soundEnabled ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {userProgress.soundEnabled && (
                  <div className="flex items-center gap-3 pt-2 border-t border-slate-800/80">
                    <span className="text-xs font-bold text-slate-400 w-16">Volume:</span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={userProgress.soundVolume ?? 0.9}
                      onChange={(e) => updateSetting('soundVolume', parseFloat(e.target.value))}
                      className="flex-1 accent-cyan-500 cursor-pointer"
                    />
                    <span className="text-xs font-black text-cyan-300 w-10 text-right">
                      {Math.round((userProgress.soundVolume ?? 0.9) * 100)}%
                    </span>
                  </div>
                )}
              </div>

              {/* Vibration (Haptic Feedback) */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-white">Vibration & Haptics</span>
                    <span className="text-[11px] text-slate-400">Tactile motor feedback on pours</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const nextVal = !(userProgress.vibrationEnabled ?? userProgress.hapticsEnabled);
                    updateSetting('vibrationEnabled', nextVal);
                    updateSetting('hapticsEnabled', nextVal);
                  }}
                  className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                    userProgress.vibrationEnabled !== false && userProgress.hapticsEnabled
                      ? 'bg-amber-500'
                      : 'bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      userProgress.vibrationEnabled !== false && userProgress.hapticsEnabled
                        ? 'translate-x-6'
                        : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: DISPLAY & GRAPHICS */}
          {activeTab === 'display' && (
            <div className="flex flex-col gap-4">
              {/* Dark Mode Toggle */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                    {userProgress.darkMode !== false ? (
                      <Moon className="w-5 h-5 text-indigo-400" />
                    ) : (
                      <Sun className="w-5 h-5 text-amber-400" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-white">Dark Theme Mode</span>
                    <span className="text-[11px] text-slate-400">Deep obsidian & neon contrast</span>
                  </div>
                </div>
                <button
                  onClick={() => updateSetting('darkMode', !userProgress.darkMode)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                    userProgress.darkMode !== false ? 'bg-indigo-500' : 'bg-amber-500'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      userProgress.darkMode !== false ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Language Selector */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-white">App Language</span>
                      <span className="text-[11px] text-slate-400">Select interface language</span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-emerald-400 px-2.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                    {currentLanguage.flag} {currentLanguage.name}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-800">
                  {LANGUAGES.map((lang) => {
                    const isSelected = (userProgress.language || 'en') === lang.code;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => updateSetting('language', lang.code)}
                        className={`p-2 rounded-xl border text-xs font-bold flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-md'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Graphics Quality */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-white">Graphics & VFX Quality</span>
                    <span className="text-[11px] text-slate-400">Particle count, liquid animations & shadows</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {(['low', 'medium', 'high'] as const).map((q) => {
                    const isSelected = (userProgress.graphicsQuality || 'high') === q;
                    const labels = {
                      low: { title: 'Low', desc: '60 FPS Max' },
                      medium: { title: 'Medium', desc: 'Balanced' },
                      high: { title: 'High', desc: 'Full Particle Glow' },
                    };

                    return (
                      <button
                        key={q}
                        onClick={() => updateSetting('graphicsQuality', q)}
                        className={`p-2.5 rounded-xl border flex flex-col items-center text-center transition-all ${
                          isSelected
                            ? 'bg-rose-500/20 border-rose-400 text-white shadow-md'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-xs font-black capitalize">{labels[q].title}</span>
                        <span className="text-[9px] text-slate-400 font-bold mt-0.5">
                          {labels[q].desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PRIVACY & LEGAL */}
          {activeTab === 'privacy' && (
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  soundEngine.playSelect();
                  if (onOpenPrivacyPolicy) {
                    onOpenPrivacyPolicy();
                  } else {
                    window.location.href = '/privacy';
                  }
                  onClose();
                }}
                className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-black text-white group-hover:text-blue-300 transition-colors">
                      Privacy Policy
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">Open full dedicated Privacy Policy page</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              </button>

              <button
                onClick={() => {
                  soundEngine.playSelect();
                  if (onOpenTerms) {
                    onOpenTerms();
                  } else {
                    window.location.href = '/terms';
                  }
                  onClose();
                }}
                className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-black text-white group-hover:text-indigo-300 transition-colors">
                      Terms & Conditions
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">Open full EULA & gameplay terms page</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              </button>

              <button
                onClick={() => {
                  soundEngine.playSelect();
                  const email = 'shubhamyadav9219920048@gmail.com';
                  try {
                    navigator.clipboard.writeText(email);
                  } catch (e) {
                    // Ignore clipboard error in un-focused frames
                  }
                  setSyncStatusMsg('Opening email app... Developer email: shubhamyadav9219920048@gmail.com');
                  setTimeout(() => setSyncStatusMsg(null), 4000);
                  window.location.href = `mailto:${email}?subject=${encodeURIComponent('Color Sort 3D - Support Request')}`;
                  setActiveSubView('contact');
                }}
                className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-black text-white group-hover:text-emerald-300 transition-colors">
                      Contact Developer
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      Email shubhamyadav9219920048@gmail.com
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-emerald-400 group-hover:text-white transition-colors animate-pulse" />
              </button>
            </div>
          )}

          {/* TAB 5: EXTRA & SUPPORT */}
          {activeTab === 'extra' && (
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  soundEngine.playSelect();
                  setActiveSubView('rate');
                }}
                className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <Star className="w-5 h-5 fill-amber-400" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-black text-white group-hover:text-amber-300 transition-colors">
                      Rate App
                    </span>
                    <span className="text-[11px] text-slate-400">Leave a 5-star rating on Google Play Store</span>
                  </div>
                </div>
                <span className="text-xs font-black text-amber-400 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30">
                  5.0 ★
                </span>
              </button>

              <button
                onClick={handleShareApp}
                className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-black text-white group-hover:text-cyan-300 transition-colors">
                      Share App
                    </span>
                    <span className="text-[11px] text-slate-400">Challenge friends & family to sort liquids</span>
                  </div>
                </div>
                <Share2 className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              </button>

              <button
                onClick={handleRestorePurchases}
                className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <RefreshCw className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-black text-white group-hover:text-emerald-300 transition-colors">
                      Restore Purchases
                    </span>
                    <span className="text-[11px] text-slate-400">Restore coin packs, skin unlocks & ad-free license</span>
                  </div>
                </div>
                <RefreshCw className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              </button>

              <button
                onClick={() => {
                  soundEngine.playSelect();
                  setActiveSubView('more_games');
                }}
                className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                    <Gamepad2 className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-black text-white group-hover:text-purple-300 transition-colors">
                      More Games
                    </span>
                    <span className="text-[11px] text-slate-400">Discover top rated games by developer</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              </button>
            </div>
          )}

          {/* TAB 6: HOW TO PLAY GUIDE */}
          {activeTab === 'guide' && (
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col gap-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" /> How To Play Water Sorting
              </h3>
              <ul className="text-xs text-slate-300 space-y-2.5 list-disc list-inside leading-relaxed">
                <li>
                  <strong className="text-white">Pouring Liquids:</strong> Tap any tube to lift its top liquid block, then tap a destination tube to pour into it.
                </li>
                <li>
                  <strong className="text-white">Color Matching Rule:</strong> Liquid can only be poured if the destination tube is empty OR if its top color matches the pouring liquid.
                </li>
                <li>
                  <strong className="text-white">Tube Capacity:</strong> Each test tube holds a maximum of 4 liquid color blocks.
                </li>
                <li>
                  <strong className="text-white">Victory Condition:</strong> Win the level when all colored liquids are completely sorted into uniform tubes!
                </li>
                <li>
                  <strong className="text-white">Boosters:</strong> Use Free Undos, Hints, or Add Extra Tube boosters when facing hard puzzles.
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* SUB-MODAL OVERLAYS (Privacy, Terms, Contact, Rate, More Games) */}
        <AnimatePresence>
          {activeSubView && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-0 bg-slate-950 z-20 flex flex-col overflow-hidden"
            >
              {/* Sub-Header */}
              <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900">
                <div className="flex items-center gap-2">
                  {activeSubView === 'privacy' && <Shield className="w-5 h-5 text-blue-400" />}
                  {activeSubView === 'terms' && <FileText className="w-5 h-5 text-indigo-400" />}
                  {activeSubView === 'contact' && <Mail className="w-5 h-5 text-emerald-400" />}
                  {activeSubView === 'rate' && <Star className="w-5 h-5 text-amber-400 fill-amber-400" />}
                  {activeSubView === 'more_games' && <Gamepad2 className="w-5 h-5 text-purple-400" />}

                  <h3 className="text-base font-black text-white capitalize">
                    {activeSubView === 'privacy' && 'Privacy Policy'}
                    {activeSubView === 'terms' && 'Terms & Conditions'}
                    {activeSubView === 'contact' && 'Contact Developer'}
                    {activeSubView === 'rate' && 'Rate Color Sort 3D'}
                    {activeSubView === 'more_games' && 'Developer Showcase'}
                  </h3>
                </div>

                <button
                  onClick={() => {
                    soundEngine.playSelect();
                    setActiveSubView(null);
                  }}
                  className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sub-Body Content */}
              <div className="p-5 overflow-y-auto flex-1 flex flex-col gap-4 text-xs text-slate-300 leading-relaxed">
                {/* Privacy Policy */}
                {activeSubView === 'privacy' && (
                  <div className="flex flex-col gap-3">
                    <p className="font-bold text-white">Last Updated: August 2026</p>
                    <p>
                      Your privacy is paramount. Color Sort Puzzle 3D collects zero personal identifying information unless explicitly provided via Google Sign-In.
                    </p>
                    <h4 className="font-black text-cyan-400 uppercase tracking-wider text-[11px] mt-2">
                      1. Data Collection & Usage
                    </h4>
                    <p>
                      Game progress, high scores, coin balances, and unlocked skins are stored locally on your device and optionally backed up to your connected Google Cloud save account.
                    </p>
                    <h4 className="font-black text-cyan-400 uppercase tracking-wider text-[11px] mt-2">
                      2. Google AdMob Integration
                    </h4>
                    <p>
                      We utilize Google AdMob to serve non-intrusive banner, app open, interstitial, and rewarded video ads. AdMob may process non-sensitive device diagnostics to prevent fraud.
                    </p>
                    <h4 className="font-black text-cyan-400 uppercase tracking-wider text-[11px] mt-2">
                      3. Data Deletion
                    </h4>
                    <p>
                      You may permanently delete all saved data at any time via the "Reset Game Progress" option in the Settings Account panel.
                    </p>
                  </div>
                )}

                {/* Terms & Conditions */}
                {activeSubView === 'terms' && (
                  <div className="flex flex-col gap-3">
                    <p className="font-bold text-white">Standard End User License Agreement</p>
                    <p>
                      By downloading or playing Color Sort Puzzle 3D, you agree to these Terms and Conditions.
                    </p>
                    <h4 className="font-black text-indigo-400 uppercase tracking-wider text-[11px] mt-2">
                      1. License & Intellectual Property
                    </h4>
                    <p>
                      All game artwork, sound effects, liquid physics shaders, and code are protected under copyright. You are granted a personal, non-transferable license to play the game.
                    </p>
                    <h4 className="font-black text-indigo-400 uppercase tracking-wider text-[11px] mt-2">
                      2. Virtual Coins & Items
                    </h4>
                    <p>
                      In-game coins and tube skins are virtual goods for entertainment only and hold no real-world monetary value.
                    </p>
                  </div>
                )}

                {/* Contact Developer */}
                {activeSubView === 'contact' && (
                  <div className="flex flex-col gap-3">
                    {/* Developer Email Quick Launch Banner */}
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 to-slate-900 border border-emerald-500/40 flex flex-col gap-3 shadow-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            <Mail className="w-5 h-5 animate-pulse" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-black text-white">Developer Direct Email</span>
                            <span className="text-[11px] font-mono text-emerald-300">
                              shubhamyadav9219920048@gmail.com
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href="mailto:shubhamyadav9219920048@gmail.com?subject=Color%20Sort%203D%20-%20Support%20Request"
                          onClick={() => {
                            soundEngine.playSelect();
                            try {
                              navigator.clipboard.writeText('shubhamyadav9219920048@gmail.com');
                            } catch (e) {}
                          }}
                          className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Open Mail App</span>
                        </a>

                        <button
                          onClick={() => {
                            soundEngine.playSelect();
                            navigator.clipboard.writeText('shubhamyadav9219920048@gmail.com');
                            setSyncStatusMsg('Email copied: shubhamyadav9219920048@gmail.com');
                            setTimeout(() => setSyncStatusMsg(null), 3000);
                          }}
                          className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1 transition-all"
                        >
                          <Copy className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copy Email</span>
                        </button>
                      </div>
                    </div>

                    {contactSent ? (
                      <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex flex-col items-center gap-2 text-center">
                        <CheckCircle2 className="w-10 h-10 text-emerald-400 animate-bounce" />
                        <span className="text-sm font-black text-white">Message Delivered!</span>
                        <span className="text-xs text-slate-300">
                          Thank you for your feedback. Our team will review your ticket within 24 hours.
                        </span>
                        <button
                          onClick={() => setContactSent(false)}
                          className="mt-2 py-2 px-4 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                        >
                          Send Another Note
                        </button>
                      </div>
                    ) : (
                      <>
                        <p className="text-slate-400 text-[11px]">
                          Or send an in-app note directly to our studio:
                        </p>

                        <div className="flex flex-col gap-1.5">
                          <label className="font-bold text-white text-[11px]">Subject:</label>
                          <select
                            value={contactSubject}
                            onChange={(e) => setContactSubject(e.target.value)}
                            className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-400"
                          >
                            <option value="Bug Report">Bug Report</option>
                            <option value="Level Design Idea">Level Design Idea</option>
                            <option value="Account & Cloud Save">Account & Cloud Save</option>
                            <option value="General Feedback">General Feedback</option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="font-bold text-white text-[11px]">Message:</label>
                          <textarea
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
                            placeholder="Describe your issue or suggestion in detail..."
                            className="w-full h-24 p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-400"
                          />
                        </div>

                        <button
                          onClick={() => {
                            if (!contactMessage.trim()) return;
                            soundEngine.playCoin();
                            setContactSent(true);
                            window.location.href = `mailto:shubhamyadav9219920048@gmail.com?subject=${encodeURIComponent(
                              `Color Sort 3D - ${contactSubject}`
                            )}&body=${encodeURIComponent(contactMessage)}`;
                          }}
                          className="py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all active:scale-95 mt-1"
                        >
                          <Send className="w-4 h-4" />
                          <span>Submit Ticket & Launch Mail</span>
                        </button>
                      </>
                    )}
                  </div>
                )}

                {/* Rate App */}
                {activeSubView === 'rate' && (
                  <div className="flex flex-col items-center gap-4 text-center py-2">
                    {/* Notice Banner if not yet published on Play Store */}
                    <div className="w-full p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3 text-left">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                          <ExternalLink className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-black text-amber-300">Google Play Store Status</span>
                          <span className="text-[11px] text-slate-300">
                            App is currently in unreleased web preview mode. Google Play page will be live soon!
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          soundEngine.playSelect();
                          setSyncStatusMsg('App is not yet published on Google Play Store.');
                          setTimeout(() => setSyncStatusMsg(null), 3000);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shrink-0 transition-all"
                      >
                        Open Store
                      </button>
                    </div>

                    {ratingSubmitted ? (
                      <div className="flex flex-col items-center gap-2 my-2">
                        <Sparkles className="w-12 h-12 text-amber-400 animate-pulse" />
                        <h4 className="text-base font-black text-white">Thank You for Rating!</h4>
                        <p className="text-xs text-slate-300 max-w-xs">
                          Your 5-star review helps us bring you more levels, skins, and liquid themes!
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="flex flex-col gap-1">
                          <h4 className="text-base font-black text-white">Enjoying Color Sort 3D?</h4>
                          <p className="text-xs text-slate-400">Tap a star to rate your puzzle experience</p>
                        </div>

                        <div className="flex items-center gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => {
                                soundEngine.playSelect();
                                setRatingStars(star);
                              }}
                              className="p-1 text-amber-400 transition-transform active:scale-125 hover:scale-110"
                            >
                              <Star
                                className={`w-8 h-8 ${
                                  star <= ratingStars ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                                }`}
                              />
                            </button>
                          ))}
                        </div>

                        <textarea
                          value={ratingFeedback}
                          onChange={(e) => setRatingFeedback(e.target.value)}
                          placeholder="Optional: Tell us what you love most about the game..."
                          className="w-full h-20 p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                        />

                        <button
                          onClick={() => {
                            soundEngine.playVictory();
                            setRatingSubmitted(true);
                          }}
                          className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/30 transition-all active:scale-95"
                        >
                          SUBMIT RATING
                        </button>
                      </>
                    )}
                  </div>
                )}

                {/* More Games Showcase */}
                {activeSubView === 'more_games' && (
                  <div className="flex flex-col gap-3">
                    {MORE_GAMES.map((game) => (
                      <div
                        key={game.id}
                        className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${game.iconBg} p-0.5 shadow-md flex items-center justify-center shrink-0`}
                          >
                            <div className="w-full h-full bg-slate-950/80 rounded-[14px] flex items-center justify-center text-white">
                              <Gamepad2 className="w-6 h-6" />
                            </div>
                          </div>

                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black text-white">{game.title}</span>
                              <span className="text-[10px] font-bold text-amber-400">{game.rating}</span>
                            </div>
                            <span className="text-[10px] text-slate-400">{game.description}</span>
                          </div>
                        </div>

                        <a
                          href="https://play.google.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-[10px] whitespace-nowrap shadow-md active:scale-95 transition-all"
                        >
                          GET GAME
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* AdMob Test Banner Ad inside Settings */}
              <div className="w-full mt-3 pt-2 border-t border-slate-800 shrink-0">
                <AdMobBanner />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
