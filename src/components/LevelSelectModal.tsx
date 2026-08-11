import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Lock, Star, Trophy, CheckCircle2, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { UserProgress, DifficultyTier } from '../types';
import { CHAPTER_NAMES, getDifficultyForLevel } from '../lib/levelGenerator';
import { soundEngine } from '../lib/sound';

interface LevelSelectModalProps {
  userProgress: UserProgress;
  currentLevel: number;
  onSelectLevel: (levelId: number) => void;
  onClose: () => void;
}

export const LevelSelectModal: React.FC<LevelSelectModalProps> = ({
  userProgress,
  currentLevel,
  onSelectLevel,
  onClose,
}) => {
  // 25 chapters total (20 levels per chapter)
  const initialChapter = Math.min(25, Math.max(1, Math.ceil(currentLevel / 20)));
  const [activeChapter, setActiveChapter] = useState<number>(initialChapter);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | DifficultyTier>('All');

  const getChapterRange = (chap: number) => {
    const start = (chap - 1) * 20 + 1;
    const end = Math.min(500, chap * 20);
    return { start, end };
  };

  const { start: chapterStart, end: chapterEnd } = getChapterRange(activeChapter);
  const chapterDifficulty = getDifficultyForLevel(chapterStart);

  // Filter chapter list based on selected difficulty tab
  const allChapterNumbers = Array.from({ length: 25 }, (_, i) => i + 1);
  const filteredChapters = allChapterNumbers.filter((chap) => {
    if (selectedDifficulty === 'All') return true;
    const chapStart = (chap - 1) * 20 + 1;
    return getDifficultyForLevel(chapStart) === selectedDifficulty;
  });

  const difficultyColors: Record<DifficultyTier, string> = {
    Easy: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    Medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    Hard: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    Expert: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-2xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-black text-white tracking-wide">
              Level Select (500 Levels)
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundEngine.playSelect();
                const curChap = Math.min(25, Math.max(1, Math.ceil(currentLevel / 20)));
                setActiveChapter(curChap);
                setSelectedDifficulty('All');
              }}
              className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 font-bold text-xs flex items-center gap-1 transition-all"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Jump to Lvl {currentLevel}</span>
            </button>
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

        {/* Difficulty Tiers Navigation Bar */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-950/60 border-b border-slate-800 text-xs font-bold overflow-x-auto scrollbar-none">
          {(['All', 'Easy', 'Medium', 'Hard', 'Expert'] as const).map((tier) => {
            const isActive = selectedDifficulty === tier;
            return (
              <button
                key={tier}
                onClick={() => {
                  soundEngine.playSelect();
                  setSelectedDifficulty(tier);
                  if (tier === 'Easy') setActiveChapter(1);
                  if (tier === 'Medium') setActiveChapter(7);
                  if (tier === 'Hard') setActiveChapter(13);
                  if (tier === 'Expert') setActiveChapter(19);
                }}
                className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap font-black ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                    : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {tier === 'All' ? 'All Tiers' : `${tier} (Lvl ${tier === 'Easy' ? '1-125' : tier === 'Medium' ? '126-250' : tier === 'Hard' ? '251-375' : '376-500'})`}
              </button>
            );
          })}
        </div>

        {/* Chapter Carousel / Tabs */}
        <div className="flex items-center gap-1.5 p-3 overflow-x-auto border-b border-slate-800/80 scrollbar-none bg-slate-950/20">
          {filteredChapters.map((chap) => {
            const isActive = activeChapter === chap;
            const diff = getDifficultyForLevel((chap - 1) * 20 + 1);
            return (
              <button
                key={chap}
                onClick={() => {
                  soundEngine.playSelect();
                  setActiveChapter(chap);
                }}
                className={`px-3 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/30 scale-105'
                    : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <span>Ch.{chap}: {CHAPTER_NAMES[chap - 1]}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-md border font-black ${difficultyColors[diff]}`}>
                  {diff[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Chapter Header Banner & Star Progress */}
        <div className="px-5 py-2.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-xs font-bold text-slate-300">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-extrabold text-sm">
              Chapter {activeChapter}: {CHAPTER_NAMES[activeChapter - 1]}
            </span>
            <span className={`px-2 py-0.5 rounded-full border text-[10px] font-black uppercase ${difficultyColors[chapterDifficulty]}`}>
              {chapterDifficulty}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>
              {Array.from({ length: chapterEnd - chapterStart + 1 }).reduce((acc, _, idx) => {
                const lvlId = chapterStart + idx;
                return acc + (userProgress.levels[lvlId]?.stars || 0);
              }, 0)} / 60 Stars
            </span>
          </div>
        </div>

        {/* Level Grid */}
        <div className="p-5 overflow-y-auto flex-1 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-5 gap-3">
          {Array.from({ length: chapterEnd - chapterStart + 1 }).map((_, idx) => {
            const levelId = chapterStart + idx;
            const levelData = userProgress.levels[levelId];
            const isCompleted = levelData?.completed || false;
            const stars = levelData?.stars || 0;
            const isCurrent = currentLevel === levelId;

            // Unlocked if previous level completed or it's level 1 or already in levelData
            const isUnlocked =
              levelId === 1 ||
              userProgress.levels[levelId - 1]?.completed ||
              levelData !== undefined;

            return (
              <button
                key={levelId}
                disabled={!isUnlocked}
                onClick={() => {
                  if (isUnlocked) {
                    soundEngine.playSelect();
                    onSelectLevel(levelId);
                    onClose();
                  }
                }}
                className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center p-2 border transition-all active:scale-95 ${
                  isCurrent
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.4)] ring-2 ring-cyan-400/50'
                    : isCompleted
                    ? 'bg-slate-800/90 border-emerald-500/50 text-white hover:border-emerald-400'
                    : isUnlocked
                    ? 'bg-slate-800/60 border-slate-700 text-slate-200 hover:bg-slate-700/80'
                    : 'bg-slate-950/60 border-slate-800/60 text-slate-600 cursor-not-allowed'
                }`}
              >
                {/* Level Number */}
                <span className="text-sm font-black tracking-tight">{levelId}</span>

                {/* Status or Stars */}
                {isUnlocked ? (
                  <div className="flex items-center gap-0.5 mt-1">
                    {isCompleted ? (
                      stars > 0 ? (
                        Array.from({ length: 3 }).map((_, sIdx) => (
                          <Star
                            key={sIdx}
                            className={`w-2.5 h-2.5 ${
                              sIdx < stars
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-slate-600'
                            }`}
                          />
                        ))
                      ) : (
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      )
                    ) : (
                      <span className="text-[9px] font-black text-cyan-400">PLAY</span>
                    )}
                  </div>
                ) : (
                  <Lock className="w-3.5 h-3.5 text-slate-600 mt-1" />
                )}
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

