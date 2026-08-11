import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Trophy,
  Globe,
  Flag,
  Users,
  Zap,
  Coins,
  Sparkles,
  Search,
  UserPlus,
  Crown,
  Medal,
  ChevronDown,
  Navigation,
  Swords,
  Check,
} from 'lucide-react';
import { UserProgress } from '../types';
import {
  LeaderboardEntry,
  COUNTRIES,
  getGlobalLeaderboard,
  getCountryLeaderboard,
  getFriendsLeaderboard,
} from '../lib/leaderboard';
import { AVATAR_OPTIONS } from './ProfileModal';
import { soundEngine } from '../lib/sound';

interface LeaderboardModalProps {
  userProgress: UserProgress;
  onUpdateCountry?: (countryCode: string) => void;
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  userProgress,
  onUpdateCountry,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'global' | 'country' | 'friends'>('global');
  const [sortBy, setSortBy] = useState<'xp' | 'level' | 'coins'>('xp');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState(
    userProgress.countryCode || 'US'
  );
  const [friendActionToast, setFriendActionToast] = useState<string | null>(null);

  const userRowRef = useRef<HTMLDivElement | null>(null);

  // Compute active list
  let activeEntries: LeaderboardEntry[] = [];
  if (activeTab === 'global') {
    activeEntries = getGlobalLeaderboard(userProgress, sortBy);
  } else if (activeTab === 'country') {
    activeEntries = getCountryLeaderboard(userProgress, selectedCountryCode, sortBy);
  } else {
    activeEntries = getFriendsLeaderboard(userProgress, sortBy);
  }

  // Filter entries if search query typed
  const filteredEntries = activeEntries.filter((e) =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const userEntry = activeEntries.find((e) => e.isUser);

  const handleCountryChange = (code: string) => {
    setSelectedCountryCode(code);
    if (onUpdateCountry) {
      onUpdateCountry(code);
    }
  };

  const scrollToUser = () => {
    soundEngine.playSelect();
    if (userRowRef.current) {
      userRowRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const triggerFriendAction = (msg: string) => {
    soundEngine.playCoin();
    setFriendActionToast(msg);
    setTimeout(() => {
      setFriendActionToast(null);
    }, 2500);
  };

  const renderAvatarIcon = (avatarId: string) => {
    const avatar = AVATAR_OPTIONS.find((a) => a.id === avatarId) || AVATAR_OPTIONS[0];
    return (
      <div
        className={`w-9 h-9 rounded-xl bg-gradient-to-br ${avatar.bgGradient} border ${avatar.borderColor} flex items-center justify-center shrink-0 shadow-md`}
      >
        {avatar.icon}
      </div>
    );
  };

  const currentCountryObj =
    COUNTRIES.find((c) => c.code === selectedCountryCode) || COUNTRIES[0];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-2xl max-h-[92vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden relative"
      >
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-950/90 via-slate-900 to-amber-950/40 z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-inner">
              <Trophy className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg font-black text-white tracking-wide flex items-center gap-2">
                Leaderboards
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Global Hall of Fame
                </span>
              </h2>
              <span className="text-xs text-amber-400/80 font-bold">
                Compete for top ranks in Level, Coins, and XP
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Country Selector Dropdown */}
            <div className="relative group">
              <select
                value={selectedCountryCode}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="appearance-none bg-slate-950 text-slate-200 border border-slate-700 hover:border-amber-500/50 rounded-xl px-3 py-1.5 pr-7 text-xs font-bold cursor-pointer transition-all"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code} className="bg-slate-900 text-white">
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
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
        </div>

        {/* Tab Selection & Control Bar */}
        <div className="px-5 pt-3 bg-slate-950/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 z-10">
          {/* Main Scope Tabs */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                soundEngine.playSelect();
                setActiveTab('global');
              }}
              className={`px-3.5 py-2 rounded-t-xl text-xs font-black transition-all flex items-center gap-1.5 border-t border-x ${
                activeTab === 'global'
                  ? 'bg-slate-900 border-slate-700 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              Global
            </button>

            <button
              onClick={() => {
                soundEngine.playSelect();
                setActiveTab('country');
              }}
              className={`px-3.5 py-2 rounded-t-xl text-xs font-black transition-all flex items-center gap-1.5 border-t border-x ${
                activeTab === 'country'
                  ? 'bg-slate-900 border-slate-700 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Flag className="w-3.5 h-3.5" />
              Country ({currentCountryObj.flag})
            </button>

            <button
              onClick={() => {
                soundEngine.playSelect();
                setActiveTab('friends');
              }}
              className={`px-3.5 py-2 rounded-t-xl text-xs font-black transition-all flex items-center gap-1.5 border-t border-x ${
                activeTab === 'friends'
                  ? 'bg-slate-900 border-slate-700 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Friends
            </button>
          </div>

          {/* Sort By Toggle */}
          <div className="flex items-center gap-1 pb-2">
            <span className="text-[10px] font-bold text-slate-400 mr-1 hidden sm:inline">Sort:</span>
            <button
              onClick={() => setSortBy('xp')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition-all flex items-center gap-1 ${
                sortBy === 'xp'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3" /> XP
            </button>
            <button
              onClick={() => setSortBy('level')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition-all flex items-center gap-1 ${
                sortBy === 'level'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3 h-3" /> Level
            </button>
            <button
              onClick={() => setSortBy('coins')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition-all flex items-center gap-1 ${
                sortBy === 'coins'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white'
              }`}
            >
              <Coins className="w-3 h-3" /> Coins
            </button>
          </div>
        </div>

        {/* Search & Actions Bar */}
        <div className="px-5 py-2.5 bg-slate-950/40 border-b border-slate-800 flex items-center justify-between gap-3 z-10">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search player name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            {userEntry && (
              <button
                onClick={scrollToUser}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs flex items-center gap-1.5 border border-cyan-500/30 transition-all"
              >
                <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                <span>My Rank #{userEntry.rank}</span>
              </button>
            )}

            {activeTab === 'friends' && (
              <button
                onClick={() => triggerFriendAction('Friend request link copied to clipboard!')}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-xs flex items-center gap-1 transition-all active:scale-95 shadow-md"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Add Friend</span>
              </button>
            )}
          </div>
        </div>

        {/* Toast Notification */}
        <AnimatePresence>
          {friendActionToast && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="absolute top-16 left-1/2 -translate-x-1/2 z-30 px-4 py-2 rounded-2xl bg-amber-500 text-slate-950 font-black text-xs shadow-xl border border-yellow-300 flex items-center gap-2"
            >
              <Check className="w-4 h-4" /> {friendActionToast}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scrollable Leaderboard List Body */}
        <div className="p-5 overflow-y-auto flex-1 flex flex-col gap-3 z-10">
          {/* Top 3 Podium (Only when not searching) */}
          {!searchQuery && filteredEntries.length >= 3 && (
            <div className="grid grid-cols-3 gap-2 sm:gap-3 my-1">
              {/* Rank 2 (Silver) */}
              <div className="p-3 rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-900 border border-slate-700/60 flex flex-col items-center text-center relative pt-6 shadow-md">
                <div className="absolute -top-3 px-2 py-0.5 rounded-full bg-slate-300 text-slate-950 font-black text-[10px] border border-white shadow-sm flex items-center gap-1">
                  <Medal className="w-3 h-3 text-slate-700" /> #2
                </div>
                {renderAvatarIcon(filteredEntries[1].avatarId)}
                <span className="text-xs font-black text-white mt-1.5 truncate max-w-full">
                  {filteredEntries[1].name}
                </span>
                <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1 mt-0.5">
                  {filteredEntries[1].countryFlag} Lvl {filteredEntries[1].level}
                </span>
                <span className="text-xs font-black text-slate-300 mt-1">
                  {filteredEntries[1].xp.toLocaleString()} XP
                </span>
              </div>

              {/* Rank 1 (Gold Podium Centerpiece) */}
              <div className="p-3 rounded-2xl bg-gradient-to-b from-amber-500/20 via-slate-900 to-amber-950/40 border-2 border-amber-400 flex flex-col items-center text-center relative pt-7 shadow-xl shadow-amber-950/50 scale-105">
                <div className="absolute -top-4 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-xs border border-yellow-200 shadow-md flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5 text-amber-950" /> #1 Champion
                </div>
                {renderAvatarIcon(filteredEntries[0].avatarId)}
                <span className="text-xs font-black text-amber-300 mt-1.5 truncate max-w-full">
                  {filteredEntries[0].name}
                </span>
                <span className="text-[10px] text-amber-200/80 font-bold flex items-center gap-1 mt-0.5">
                  {filteredEntries[0].countryFlag} Lvl {filteredEntries[0].level}
                </span>
                <span className="text-xs font-black text-amber-400 mt-1">
                  {filteredEntries[0].xp.toLocaleString()} XP
                </span>
              </div>

              {/* Rank 3 (Bronze) */}
              <div className="p-3 rounded-2xl bg-gradient-to-b from-amber-900/30 to-slate-900 border border-amber-800/40 flex flex-col items-center text-center relative pt-6 shadow-md">
                <div className="absolute -top-3 px-2 py-0.5 rounded-full bg-amber-700 text-amber-100 font-black text-[10px] border border-amber-400 shadow-sm flex items-center gap-1">
                  <Medal className="w-3 h-3 text-amber-200" /> #3
                </div>
                {renderAvatarIcon(filteredEntries[2].avatarId)}
                <span className="text-xs font-black text-white mt-1.5 truncate max-w-full">
                  {filteredEntries[2].name}
                </span>
                <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1 mt-0.5">
                  {filteredEntries[2].countryFlag} Lvl {filteredEntries[2].level}
                </span>
                <span className="text-xs font-black text-amber-200/90 mt-1">
                  {filteredEntries[2].xp.toLocaleString()} XP
                </span>
              </div>
            </div>
          )}

          {/* Full Rankings List */}
          <div className="flex flex-col gap-2 mt-2">
            {filteredEntries.map((entry) => {
              const isUser = entry.isUser;

              return (
                <div
                  key={entry.id}
                  ref={isUser ? userRowRef : null}
                  className={`p-3 rounded-2xl border flex items-center justify-between gap-3 transition-all relative ${
                    isUser
                      ? 'bg-gradient-to-r from-cyan-950/80 via-slate-900 to-blue-950/80 border-cyan-400 shadow-xl shadow-cyan-950/60 ring-2 ring-cyan-500/40'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Rank Badge & Avatar */}
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 text-center font-black text-sm ${
                        entry.rank === 1
                          ? 'text-yellow-400'
                          : entry.rank === 2
                          ? 'text-slate-300'
                          : entry.rank === 3
                          ? 'text-amber-500'
                          : 'text-slate-400'
                      }`}
                    >
                      #{entry.rank}
                    </span>

                    <div className="relative">
                      {renderAvatarIcon(entry.avatarId)}
                      <span className="absolute -bottom-1 -right-1 text-xs">
                        {entry.countryFlag}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-white">{entry.name}</span>
                        {isUser && (
                          <span className="px-1.5 py-0.2 rounded bg-cyan-500 text-slate-950 font-black text-[9px] uppercase">
                            YOU
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                        <span className="text-amber-400 flex items-center gap-0.5">
                          <Zap className="w-3 h-3" /> Lvl {entry.level}
                        </span>
                        {entry.status && (
                          <span
                            className={`flex items-center gap-1 ${
                              entry.status === 'online'
                                ? 'text-emerald-400'
                                : entry.status === 'in_game'
                                ? 'text-cyan-400'
                                : 'text-slate-500'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                entry.status === 'online'
                                  ? 'bg-emerald-400'
                                  : entry.status === 'in_game'
                                  ? 'bg-cyan-400'
                                  : 'bg-slate-500'
                              }`}
                            />
                            {entry.status === 'in_game' ? 'Playing' : entry.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Player Stats (XP & Coins) */}
                  <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-black text-amber-300 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-yellow-400" />
                        {entry.xp.toLocaleString()} XP
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                        <Coins className="w-3 h-3 text-amber-400" />
                        {entry.coins.toLocaleString()}
                      </span>
                    </div>

                    {/* Friend Challenge Button */}
                    {activeTab === 'friends' && !isUser && (
                      <button
                        onClick={() =>
                          triggerFriendAction(`Challenge sent to ${entry.name}!`)
                        }
                        className="p-2 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition-all active:scale-95"
                        title="Challenge Friend"
                      >
                        <Swords className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
