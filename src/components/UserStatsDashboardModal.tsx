import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  X, 
  Trophy, 
  Star, 
  Flame, 
  Zap, 
  Clock, 
  Target, 
  Sparkles, 
  Coins, 
  RotateCcw, 
  Lightbulb, 
  PlusCircle, 
  Award,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { UserProgress } from '../types';
import { soundEngine } from '../lib/sound';

export interface UserStatsDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProgress: UserProgress;
}

export const UserStatsDashboardModal: React.FC<UserStatsDashboardModalProps> = ({
  isOpen,
  onClose,
  userProgress,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const stats = userProgress.stats;
  const levelValues = Object.values(userProgress.levels || {}) as { completed?: boolean; stars?: number }[];
  const completedCount = levelValues.filter((l) => l.completed).length;
  
  let totalStars = 0;
  levelValues.forEach((l) => {
    if (l.stars) totalStars += l.stars;
  });

  const perfectCount = levelValues.filter((l) => l.stars === 3).length;
  const threeStarRate = completedCount > 0 ? Math.round((perfectCount / completedCount) * 100) : 0;
  
  const playTimeMinutes = Math.floor((stats.totalPlayTimeSeconds || 0) / 60);
  const playTimeHours = Math.floor(playTimeMinutes / 60);
  const remainingMins = playTimeMinutes % 60;
  const formattedPlayTime = playTimeHours > 0 ? `${playTimeHours}h ${remainingMins}m` : `${playTimeMinutes}m`;

  const totalBoostersUsed =
    (stats.boostersUsed || 0) +
    (stats.hintsUsed || 0) +
    (stats.undosUsed || 0) +
    (stats.extraTubesUsed || 0) +
    (stats.skipsUsed || 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white">Player Statistics &amp; Mastery</h2>
              <p className="text-xs text-slate-400">Real-time performance analytics across all 500 levels</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Main 4 Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Levels Solved */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                Levels Solved
              </span>
              <div className="mt-2">
                <div className="text-2xl font-black text-white">{completedCount}</div>
                <div className="text-[10px] text-slate-500">out of 500 Campaign</div>
              </div>
            </div>

            {/* Stars Earned */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                Total Stars
              </span>
              <div className="mt-2">
                <div className="text-2xl font-black text-amber-300">{totalStars}</div>
                <div className="text-[10px] text-slate-500">{threeStarRate}% 3-Star Ratio</div>
              </div>
            </div>

            {/* Daily Streak */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-rose-400" />
                Daily Streak
              </span>
              <div className="mt-2">
                <div className="text-2xl font-black text-rose-400">
                  {userProgress.dailyChallenge?.currentStreak || 0}d
                </div>
                <div className="text-[10px] text-slate-500">
                  Best: {userProgress.dailyChallenge?.bestStreak || 0}d
                </div>
              </div>
            </div>

            {/* Total Pours */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                Total Pours
              </span>
              <div className="mt-2">
                <div className="text-2xl font-black text-cyan-300">{stats.totalPours || 0}</div>
                <div className="text-[10px] text-slate-500">Liquid Transfers</div>
              </div>
            </div>
          </div>

          {/* Difficulty Tier Progress */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Target className="w-4 h-4 text-cyan-400" />
              Difficulty Completion Breakdown
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Easy */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-emerald-400">Easy (Levels 1–100)</span>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {stats.easyCompleted || 0} / 100 Solved
                  </div>
                </div>
                <span className="font-mono font-bold text-slate-300">
                  {Math.min(100, Math.round(((stats.easyCompleted || 0) / 100) * 100))}%
                </span>
              </div>

              {/* Medium */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-cyan-400">Medium (Levels 101–250)</span>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {stats.mediumCompleted || 0} / 150 Solved
                  </div>
                </div>
                <span className="font-mono font-bold text-slate-300">
                  {Math.min(100, Math.round(((stats.mediumCompleted || 0) / 150) * 100))}%
                </span>
              </div>

              {/* Hard */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-amber-400">Hard (Levels 251–400)</span>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {stats.hardCompleted || 0} / 150 Solved
                  </div>
                </div>
                <span className="font-mono font-bold text-slate-300">
                  {Math.min(100, Math.round(((stats.hardCompleted || 0) / 150) * 100))}%
                </span>
              </div>

              {/* Expert */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-rose-400">Expert (Levels 401–500)</span>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {stats.expertCompleted || 0} / 100 Solved
                  </div>
                </div>
                <span className="font-mono font-bold text-slate-300">
                  {Math.min(100, Math.round(((stats.expertCompleted || 0) / 100) * 100))}%
                </span>
              </div>
            </div>
          </div>

          {/* Secondary Stats Grid: Boosters, Economy & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Economy */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Coins className="w-4 h-4" /> Coin Treasury
              </span>
              <div className="text-xl font-black text-white">{userProgress.coins} Coins</div>
              <div className="text-[11px] text-slate-400">
                Total Earned: {stats.totalCoinsEarned || 0}
              </div>
            </div>

            {/* Booster Usage */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Boosters Used
              </span>
              <div className="text-xl font-black text-white">{totalBoostersUsed} Total</div>
              <div className="text-[10px] text-slate-400 flex items-center gap-2">
                <span>Hints: {stats.hintsUsed || 0}</span>
                <span>•</span>
                <span>Undos: {stats.undosUsed || 0}</span>
              </div>
            </div>

            {/* Play Time */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> Time Invested
              </span>
              <div className="text-xl font-black text-white">{formattedPlayTime}</div>
              <div className="text-[11px] text-slate-400">Active Mind Workout</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Profile synced locally &amp; Cloud Ready</span>
          <button
            onClick={() => {
              onClose();
              navigate('/stats');
            }}
            className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
          >
            <span>Full Stats Hub</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
