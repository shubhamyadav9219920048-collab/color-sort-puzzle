import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  ChevronRight, 
  Trophy, 
  Star, 
  Flame, 
  Zap, 
  Clock, 
  Target, 
  Coins, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  Lightbulb, 
  RotateCcw,
  ArrowRight
} from 'lucide-react';
import { UserProgress } from '../types';
import { soundEngine } from '../lib/sound';

export interface GameStatsPageProps {
  userProgress: UserProgress;
}

export const GameStatsPage: React.FC<GameStatsPageProps> = ({ userProgress }) => {
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
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <section className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 pt-8 pb-10 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <Link to="/" onClick={() => soundEngine.playSelect()} className="hover:text-cyan-400">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-cyan-400 font-bold">Game Statistics</span>
          </nav>

          <div className="max-w-3xl">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-black uppercase tracking-wider border border-cyan-500/20 inline-flex items-center gap-1.5 mb-3">
              <BarChart3 className="w-3.5 h-3.5" />
              Cognitive Analytics &amp; Performance
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Player <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Statistics &amp; Metrics</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Track your water sorting accuracy, streak milestones, 3-star mastery percentages, and booster efficiency across 500 campaign puzzles.
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        {/* Core KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col justify-between">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-400" />
              Campaign Progress
            </span>
            <div className="mt-3">
              <div className="text-3xl font-black text-white">{completedCount} <span className="text-sm font-normal text-slate-500">/ 500</span></div>
              <div className="text-xs text-slate-400 mt-1">Level {userProgress.currentLevel} active</div>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col justify-between">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              Total Stars
            </span>
            <div className="mt-3">
              <div className="text-3xl font-black text-amber-300">{totalStars}</div>
              <div className="text-xs text-slate-400 mt-1">{threeStarRate}% 3-star solves</div>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col justify-between">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-rose-400" />
              Daily Streak
            </span>
            <div className="mt-3">
              <div className="text-3xl font-black text-rose-400">{userProgress.dailyChallenge?.currentStreak || 0} Days</div>
              <div className="text-xs text-slate-400 mt-1">Record: {userProgress.dailyChallenge?.bestStreak || 0} days</div>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col justify-between">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-cyan-400" />
              Liquid Pours
            </span>
            <div className="mt-3">
              <div className="text-3xl font-black text-cyan-300">{stats.totalPours || 0}</div>
              <div className="text-xs text-slate-400 mt-1">Total volume transferred</div>
            </div>
          </div>
        </div>

        {/* Detailed Difficulty Progress */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-cyan-400" />
            <span>Difficulty Tier Mastery</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-emerald-400">Easy (1–100)</span>
                <span className="text-slate-400">{stats.easyCompleted || 0}/100</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${Math.min(100, Math.round(((stats.easyCompleted || 0) / 100) * 100))}%` }}
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-cyan-400">Medium (101–250)</span>
                <span className="text-slate-400">{stats.mediumCompleted || 0}/150</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-cyan-500 rounded-full"
                  style={{ width: `${Math.min(100, Math.round(((stats.mediumCompleted || 0) / 150) * 100))}%` }}
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-amber-400">Hard (251–400)</span>
                <span className="text-slate-400">{stats.hardCompleted || 0}/150</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${Math.min(100, Math.round(((stats.hardCompleted || 0) / 150) * 100))}%` }}
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-rose-400">Expert (401–500)</span>
                <span className="text-slate-400">{stats.expertCompleted || 0}/100</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-rose-500 rounded-full"
                  style={{ width: `${Math.min(100, Math.round(((stats.expertCompleted || 0) / 100) * 100))}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Economy, Time & Boosters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <Coins className="w-4 h-4" /> Treasury
            </span>
            <div className="text-2xl font-black text-white">{userProgress.coins} Coins</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Earned from 3-star completions and daily streaks. Used to unlock tube glass styles and themes.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
            <span className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Booster Utilization
            </span>
            <div className="text-2xl font-black text-white">{totalBoostersUsed} Used</div>
            <div className="text-xs text-slate-400 space-y-1">
              <div>Hints: {stats.hintsUsed || 0}</div>
              <div>Undos: {stats.undosUsed || 0}</div>
              <div>Extra Tubes: {stats.extraTubesUsed || 0}</div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> Active Focus Time
            </span>
            <div className="text-2xl font-black text-white">{formattedPlayTime}</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Total session time dedicated to spatial problem solving and working memory exercise.
            </p>
          </div>
        </div>

        {/* Play Now CTA */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-cyan-950/70 via-slate-900 to-indigo-950/70 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h3 className="text-xl font-black text-white">Ready for your next challenge?</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">Continue to Level {userProgress.currentLevel} or tackle today's Daily Puzzle.</p>
          </div>
          <Link
            to="/play"
            onClick={() => soundEngine.playSelect()}
            className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-transform active:scale-95 shadow-lg shadow-cyan-500/20 flex items-center gap-2 shrink-0"
          >
            <span>Play Level {userProgress.currentLevel}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
};
