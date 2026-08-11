import { LevelConfig, LiquidColorId, DifficultyTier } from '../types';
import { solveLevelBFS } from './solver';

// Simple mulberry32 PRNG for deterministic level generation
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const CHAPTER_NAMES = [
  'Novice Lab',
  'Color Chemist',
  'Prism Apprentice',
  'Elemental Mixing',
  'Spectral Genesis',
  'Liquid Harmony',
  'Crystal Alchemist',
  'Chroma Catalyst',
  'Neon Refinery',
  'Quantum Spectrum',
  'Fluid Dynamics',
  'Prism Reaction',
  'Vortex Laboratory',
  'Bioluminescent Grid',
  'Plasma Nexus',
  'Supernova Reactor',
  'Dimensional Fluid',
  'Aether Matrix',
  'Dark Matter Alchemist',
  'Singularity Spectrum',
  'Omega Color Engine',
  'Cosmic Crucible',
  'Entropy Breaker',
  'Hyperdimensional Chemist',
  'Grandmaster Infinity',
];

export function getDifficultyForLevel(levelId: number): DifficultyTier {
  if (levelId <= 125) return 'Easy';
  if (levelId <= 250) return 'Medium';
  if (levelId <= 375) return 'Hard';
  return 'Expert';
}

export function getChapterForLevel(levelId: number): {
  chapter: number;
  name: string;
  difficulty: DifficultyTier;
} {
  const boundedId = Math.min(500, Math.max(1, levelId));
  // 20 levels per chapter (25 chapters total for 500 levels)
  const chapterNumber = Math.min(25, Math.floor((boundedId - 1) / 20) + 1);
  const name = CHAPTER_NAMES[chapterNumber - 1] || `Chapter ${chapterNumber}`;
  const difficulty = getDifficultyForLevel(boundedId);

  return { chapter: chapterNumber, name, difficulty };
}

// Generate single solvable level configuration
export function generateLevelConfig(levelId: number): LevelConfig {
  const { chapter, name: chapterName, difficulty } = getChapterForLevel(levelId);

  // Determine color count based on difficulty and level tier
  let colorCount = 3;
  if (difficulty === 'Easy') {
    if (levelId > 5) colorCount = 4;
    if (levelId > 30) colorCount = 5;
  } else if (difficulty === 'Medium') {
    colorCount = 6;
    if (levelId > 160) colorCount = 7;
    if (levelId > 210) colorCount = 8;
  } else if (difficulty === 'Hard') {
    colorCount = 9;
    if (levelId > 290) colorCount = 10;
    if (levelId > 330) colorCount = 11;
  } else {
    // Expert
    colorCount = 11;
    if (levelId > 400) colorCount = 12;
  }

  const emptyTubes = 2;
  const tubeCount = colorCount + emptyTubes;

  // Try multiple seeds to find a valid, non-trivial level configuration
  let attempts = 0;
  let bestTubes: LiquidColorId[][] = [];

  while (attempts < 60) {
    attempts++;
    const prng = mulberry32(levelId * 1000 + attempts * 37 + 1337);

    // Build all blocks: 4 blocks for each color ID (1..colorCount)
    const blocks: LiquidColorId[] = [];
    for (let c = 1; c <= colorCount; c++) {
      for (let i = 0; i < 4; i++) {
        blocks.push(c);
      }
    }

    // Fisher-Yates shuffle
    for (let i = blocks.length - 1; i > 0; i--) {
      const j = Math.floor(prng() * (i + 1));
      [blocks[i], blocks[j]] = [blocks[j], blocks[i]];
    }

    // Distribute into colorCount tubes (each length 4)
    const tubes: LiquidColorId[][] = [];
    for (let i = 0; i < colorCount; i++) {
      tubes.push(blocks.slice(i * 4, (i + 1) * 4));
    }

    // Add empty tubes
    for (let e = 0; e < emptyTubes; e++) {
      tubes.push([]);
    }

    // Check if any tube was generated already solved (not challenging)
    let alreadySolvedCount = 0;
    for (let i = 0; i < colorCount; i++) {
      if (tubes[i].length === 4 && tubes[i].every((col) => col === tubes[i][0])) {
        alreadySolvedCount++;
      }
    }

    if (alreadySolvedCount > 0 && attempts < 50) {
      continue; // try another shuffle
    }

    // Solve test using fast BFS
    const solution = solveLevelBFS(tubes, 25);
    if (solution !== null && solution.length >= Math.max(3, colorCount - 1)) {
      bestTubes = tubes;
      break;
    }

    if (bestTubes.length === 0) {
      bestTubes = tubes;
    }
  }

  // Estimate par moves (benchmark for 3 stars)
  const parMoves = Math.max(6, colorCount * 3 + Math.floor(levelId / 15));

  return {
    id: levelId,
    chapter,
    chapterName,
    difficulty,
    tubeCount,
    emptyTubes,
    colorCount,
    initialTubes: bestTubes,
    parMoves,
  };
}

// Daily Challenge Generator based on date seed string (e.g., '2026-08-10')
export function generateDailyChallengeConfig(dateStr: string): LevelConfig {
  const numericSeed = parseInt(dateStr.replace(/-/g, ''), 10) || 20260810;
  const prng = mulberry32(numericSeed);

  // Daily Challenge has 8 to 10 colors
  const colorCount = 8 + Math.floor(prng() * 3); // 8, 9, or 10
  const emptyTubes = 2;
  const tubeCount = colorCount + emptyTubes;

  const blocks: LiquidColorId[] = [];
  for (let c = 1; c <= colorCount; c++) {
    for (let i = 0; i < 4; i++) {
      blocks.push(c);
    }
  }

  for (let i = blocks.length - 1; i > 0; i--) {
    const j = Math.floor(prng() * (i + 1));
    [blocks[i], blocks[j]] = [blocks[j], blocks[i]];
  }

  const tubes: LiquidColorId[][] = [];
  for (let i = 0; i < colorCount; i++) {
    tubes.push(blocks.slice(i * 4, (i + 1) * 4));
  }
  for (let e = 0; e < emptyTubes; e++) {
    tubes.push([]);
  }

  return {
    id: 9999, // Special ID for Daily Challenge
    chapter: 99,
    chapterName: 'Daily Challenge',
    difficulty: 'Hard',
    tubeCount,
    emptyTubes,
    colorCount,
    initialTubes: tubes,
    parMoves: colorCount * 3 + 2,
    isDailyChallenge: true,
  };
}

// Memory cache for generated levels
const levelCache = new Map<number, LevelConfig>();

export function getLevelConfig(levelId: number): LevelConfig {
  if (levelCache.has(levelId)) {
    return levelCache.get(levelId)!;
  }
  const config = generateLevelConfig(levelId);
  levelCache.set(levelId, config);
  return config;
}
