import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProgress, LevelConfig, LiquidColorId, PourStep } from './types';
import {
  loadUserProgress,
  saveUserProgress,
  saveLevelCompletion,
  saveDailyChallengeCompletion,
} from './lib/storage';
import { getLevelConfig, generateDailyChallengeConfig } from './lib/levelGenerator';
import { canPour, executePour, checkWinCondition, findHint, MoveHint } from './lib/solver';
import { soundEngine } from './lib/sound';
import { GAME_THEMES } from './lib/colors';

import { Navbar } from './components/Navbar';
import { Tube } from './components/Tube';
import { PourAnimationOverlay } from './components/PourAnimationOverlay';
import { ThemeParticles } from './components/ThemeParticles';
import { LevelSelectModal } from './components/LevelSelectModal';
import { ShopModal, PowerUpType } from './components/ShopModal';
import { VictoryModal } from './components/VictoryModal';
import { AchievementsModal } from './components/AchievementsModal';
import { SettingsModal } from './components/SettingsModal';
import { AndroidFrame } from './components/AndroidFrame';
import { RewardedAdModal, AdRewardType } from './components/RewardedAdModal';
import { AppOpenAdModal } from './components/AppOpenAdModal';
import { InterstitialAdModal } from './components/InterstitialAdModal';
import { AdMobBanner } from './components/AdMobBanner';
import { admobService } from './lib/admob';
import { DailyRewardModal } from './components/DailyRewardModal';
import {
  getTodayDateString,
  recordMissionAction,
  ensureDailyMissions,
  getInitialDailyMissions,
} from './lib/dailyRewards';
import { StatsModal } from './components/StatsModal';
import { DailyChallengeModal } from './components/DailyChallengeModal';
import { LuckySpinModal, SpinReward } from './components/LuckySpinModal';
import { AchievementUnlockToast } from './components/AchievementUnlockToast';
import { ProfileModal } from './components/ProfileModal';
import { EventBanner } from './components/EventBanner';
import { EventModal } from './components/EventModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { EventRewardMilestone } from './lib/events';
import { getUnlockedUnclaimedAchievements } from './lib/achievements';
import { Achievement } from './types';

export default function App() {
  // Load progress from localStorage
  const [userProgress, setUserProgress] = useState<UserProgress>(() =>
    loadUserProgress()
  );

  // Sync sound & haptics engine state
  useEffect(() => {
    soundEngine.enabled = userProgress.soundEnabled;
    soundEngine.hapticsEnabled = userProgress.hapticsEnabled;
  }, [userProgress.soundEnabled, userProgress.hapticsEnabled]);

  // Game View State
  const [currentLevelId, setCurrentLevelId] = useState<number>(
    userProgress.currentLevel || 1
  );
  const [levelConfig, setLevelConfig] = useState<LevelConfig>(() =>
    getLevelConfig(currentLevelId)
  );

  // Daily Challenge State
  const [isPlayingDailyChallenge, setIsPlayingDailyChallenge] = useState<boolean>(false);

  // Active level tubes state
  const [tubes, setTubes] = useState<LiquidColorId[][]>([]);
  const [selectedTubeIndex, setSelectedTubeIndex] = useState<number | null>(null);
  const [movesHistory, setMovesHistory] = useState<PourStep[]>([]);
  const [movesCount, setMovesCount] = useState<number>(0);
  const [extraTubesCount, setExtraTubesCount] = useState<number>(0);
  const [hint, setHint] = useState<MoveHint | null>(null);

  // Victory celebration state
  const [isVictory, setIsVictory] = useState<boolean>(false);
  const [victoryData, setVictoryData] = useState<{
    starsEarned: number;
    coinsEarned: number;
  } | null>(null);

  // Android Chassis Mode Toggle
  const [isAndroidFrame, setIsAndroidFrame] = useState<boolean>(true);

  // Active Modals
  const [activeModal, setActiveModal] = useState<
    'levelMap' | 'shop' | 'achievements' | 'settings' | 'daily' | 'rewardedAd' | 'stats' | 'dailyChallenge' | 'luckySpin' | 'profile' | 'events' | 'leaderboard' | null
  >(null);
  const [adRewardType, setAdRewardType] = useState<AdRewardType>('hint');

  // Google AdMob States
  const [showAppOpenAd, setShowAppOpenAd] = useState<boolean>(true);
  const [showInterstitialAd, setShowInterstitialAd] = useState<boolean>(false);

  const handleUpdateAvatar = (avatarId: string) => {
    const updated = {
      ...userProgress,
      selectedAvatarId: avatarId,
    };
    setUserProgress(updated);
    saveUserProgress(updated);
  };

  const handleUpdateCountry = (countryCode: string) => {
    const updated = {
      ...userProgress,
      countryCode,
    };
    setUserProgress(updated);
    saveUserProgress(updated);
  };

  const handleSelectEvent = (eventId: string) => {
    const currentProg = userProgress.eventProgress || {
      claimedRewardIds: [],
      eventTokensCount: 0,
      selectedEventId: eventId,
    };
    const updated = {
      ...userProgress,
      eventProgress: {
        ...currentProg,
        selectedEventId: eventId,
      },
    };
    setUserProgress(updated);
    saveUserProgress(updated);
  };

  const handleClaimEventMilestone = (eventId: string, milestone: EventRewardMilestone) => {
    const currentProg = userProgress.eventProgress || {
      claimedRewardIds: [],
      eventTokensCount: 0,
      selectedEventId: eventId,
    };

    let newCoins = userProgress.coins;
    let newFreeHints = userProgress.freeHints || 0;
    let newFreeUndos = userProgress.freeUndos || 0;
    let newPlayerXP = userProgress.playerXP || 0;

    if (milestone.rewardType === 'coins') {
      newCoins += milestone.rewardAmount;
    } else if (milestone.rewardType === 'hints') {
      newFreeHints += milestone.rewardAmount;
    } else if (milestone.rewardType === 'freeUndos') {
      newFreeUndos += milestone.rewardAmount;
    } else if (milestone.rewardType === 'xp') {
      newPlayerXP += milestone.rewardAmount;
    }

    const updated: UserProgress = {
      ...userProgress,
      coins: newCoins,
      freeHints: newFreeHints,
      freeUndos: newFreeUndos,
      playerXP: newPlayerXP,
      eventProgress: {
        ...currentProg,
        claimedRewardIds: [...currentProg.claimedRewardIds, milestone.id],
      },
      stats: {
        ...userProgress.stats,
        totalCoinsEarned:
          milestone.rewardType === 'coins'
            ? userProgress.stats.totalCoinsEarned + milestone.rewardAmount
            : userProgress.stats.totalCoinsEarned,
      },
    };

    setUserProgress(updated);
    saveUserProgress(updated);
  };

  // Tube DOM Refs for coordinates
  const tubeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const usedUndoInLevelRef = useRef<boolean>(false);

  // Achievement unlock popup toast state
  const [activeAchievementToast, setActiveAchievementToast] = useState<Achievement | null>(null);
  const [notifiedAchievements, setNotifiedAchievements] = useState<string[]>([]);

  // Auto-detect unlocked achievements for animated toast
  useEffect(() => {
    const unclaimedUnlocked = getUnlockedUnclaimedAchievements(userProgress);
    const unnotified = unclaimedUnlocked.filter((a) => !notifiedAchievements.includes(a.id));
    if (unnotified.length > 0 && !activeAchievementToast) {
      const nextToNotify = unnotified[0];
      setActiveAchievementToast(nextToNotify);
      setNotifiedAchievements((prev) => [...prev, nextToNotify.id]);
    }
  }, [userProgress, notifiedAchievements, activeAchievementToast]);

  // Initialize or reset normal level
  const initLevel = (levelId: number) => {
    usedUndoInLevelRef.current = false;
    setIsPlayingDailyChallenge(false);
    const config = getLevelConfig(levelId);
    setLevelConfig(config);
    setCurrentLevelId(levelId);

    // Deep clone initial tubes
    const initialCopy = config.initialTubes.map((t) => [...t]);
    setTubes(initialCopy);
    setSelectedTubeIndex(null);
    setMovesHistory([]);
    setMovesCount(0);
    setExtraTubesCount(0);
    setHint(null);
    setIsVictory(false);
    setVictoryData(null);
  };

  // Initialize Daily Challenge level
  const initDailyChallenge = () => {
    usedUndoInLevelRef.current = false;
    const todayStr = new Date().toISOString().split('T')[0];
    const config = generateDailyChallengeConfig(todayStr);
    setIsPlayingDailyChallenge(true);
    setLevelConfig(config);

    const initialCopy = config.initialTubes.map((t) => [...t]);
    setTubes(initialCopy);
    setSelectedTubeIndex(null);
    setMovesHistory([]);
    setMovesCount(0);
    setExtraTubesCount(0);
    setHint(null);
    setIsVictory(false);
    setVictoryData(null);
  };

  useEffect(() => {
    if (!isPlayingDailyChallenge) {
      initLevel(currentLevelId);
    }
  }, [currentLevelId]);

  // Theme ambient music and sound settings effect
  useEffect(() => {
    soundEngine.enabled = userProgress.soundEnabled;
    soundEngine.hapticsEnabled = userProgress.hapticsEnabled;
    if (userProgress.soundEnabled) {
      soundEngine.startThemeMusic(userProgress.activeTheme);
    } else {
      soundEngine.stopThemeMusic();
    }
    return () => {
      soundEngine.stopThemeMusic();
    };
  }, [userProgress.soundEnabled, userProgress.hapticsEnabled, userProgress.activeTheme]);

  // Track play time in stats
  useEffect(() => {
    const timer = setInterval(() => {
      setUserProgress((prev) => {
        const updated = {
          ...prev,
          stats: {
            ...prev.stats,
            totalPlayTimeSeconds: (prev.stats?.totalPlayTimeSeconds || 0) + 1,
          },
        };
        // Auto-save periodically
        if (updated.stats.totalPlayTimeSeconds % 15 === 0) {
          saveUserProgress(updated);
        }
        return updated;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Pouring Animation State
  const [pouringState, setPouringState] = useState<{
    active: boolean;
    sourceIndex: number | null;
    targetIndex: number | null;
    colorId: LiquidColorId | null;
    pourAngle: number;
    sourceCoords: { x: number; y: number } | null;
    targetCoords: { x: number; y: number } | null;
  }>({
    active: false,
    sourceIndex: null,
    targetIndex: null,
    colorId: null,
    pourAngle: 0,
    sourceCoords: null,
    targetCoords: null,
  });

  // Handle Tube Selection and Pouring
  const handleTubeClick = (targetIndex: number) => {
    if (isVictory || pouringState.active) return;

    // Clear active hint when player makes a move
    if (hint) setHint(null);

    // If nothing selected yet
    if (selectedTubeIndex === null) {
      if (tubes[targetIndex].length === 0) {
        soundEngine.playError();
        return;
      }
      soundEngine.playSelect();
      setSelectedTubeIndex(targetIndex);
      return;
    }

    // If same tube clicked again, deselect
    if (selectedTubeIndex === targetIndex) {
      soundEngine.playSelect();
      setSelectedTubeIndex(null);
      return;
    }

    // Attempt Pouring from selectedTubeIndex -> targetIndex
    const fromTube = tubes[selectedTubeIndex];
    const toTube = tubes[targetIndex];

    if (canPour(fromTube, toTube)) {
      const topColor = fromTube[fromTube.length - 1];
      const previousState = tubes.map((t) => [...t]);

      // Calculate DOM tube coordinates for arc
      const sourceEl = tubeRefs.current[selectedTubeIndex];
      const targetEl = tubeRefs.current[targetIndex];

      let sourceCoords = null;
      let targetCoords = null;
      let angle = -30;

      if (sourceEl && targetEl) {
        const sRect = sourceEl.getBoundingClientRect();
        const tRect = targetEl.getBoundingClientRect();

        sourceCoords = { x: sRect.left + sRect.width / 2, y: sRect.top + 15 };
        targetCoords = { x: tRect.left + tRect.width / 2, y: tRect.top + 15 };

        if (tRect.left > sRect.left) {
          angle = 35; // Tilt right
        } else {
          angle = -35; // Tilt left
        }
      }

      // Trigger pour sound & haptic
      soundEngine.playPour(0.35);

      // Trigger visual pouring arc animation
      setPouringState({
        active: true,
        sourceIndex: selectedTubeIndex,
        targetIndex,
        colorId: topColor,
        pourAngle: angle,
        sourceCoords,
        targetCoords,
      });

      const nextTubes = executePour(tubes, selectedTubeIndex, targetIndex);

      setTimeout(() => {
        setMovesHistory((prev) => [
          ...prev,
          {
            fromIndex: selectedTubeIndex,
            toIndex: targetIndex,
            color: topColor,
            count: fromTube.length - nextTubes[selectedTubeIndex].length,
            previousTubesState: previousState,
          },
        ]);

        setTubes(nextTubes);
        setMovesCount((prev) => prev + 1);
        setSelectedTubeIndex(null);

        // Record total pours in stats
        setUserProgress((prev) => {
          const updated = {
            ...prev,
            stats: {
              ...prev.stats,
              totalPours: (prev.stats?.totalPours || 0) + 1,
            },
          };
          saveUserProgress(updated);
          return updated;
        });

        setPouringState({
          active: false,
          sourceIndex: null,
          targetIndex: null,
          colorId: null,
          pourAngle: 0,
          sourceCoords: null,
          targetCoords: null,
        });

        // Check Win Condition
        if (checkWinCondition(nextTubes)) {
          setTimeout(() => {
            handleLevelWon(movesCount + 1);
          }, 250);
        }
      }, 300);
    } else {
      // Invalid Pour Target
      soundEngine.playError();
      // If target tube is non-empty, switch selection to it
      if (tubes[targetIndex].length > 0) {
        setSelectedTubeIndex(targetIndex);
      } else {
        setSelectedTubeIndex(null);
      }
    }
  };

  // Level Won Handler
  const handleLevelWon = (finalMoves: number) => {
    setIsVictory(true);

    // Check if Interstitial Ad should trigger (every 3 completed levels)
    const shouldShowInterstitial = admobService.recordLevelCompleted();
    if (shouldShowInterstitial) {
      setShowInterstitialAd(true);
    }

    let progressToSave: UserProgress;
    let victoryCoins = 0;
    let victoryStars = 3;

    if (isPlayingDailyChallenge) {
      const todayStr = getTodayDateString();
      const { updatedProgress, coinsEarned } = saveDailyChallengeCompletion(userProgress, todayStr);
      progressToSave = updatedProgress;
      victoryCoins = coinsEarned;
      victoryStars = 3;
    } else {
      const { updatedProgress, coinsEarned, starsEarned } = saveLevelCompletion(
        userProgress,
        currentLevelId,
        finalMoves,
        levelConfig.parMoves,
        usedUndoInLevelRef.current
      );
      progressToSave = updatedProgress;
      victoryCoins = coinsEarned;
      victoryStars = starsEarned;
    }

    // Update Daily Mission Progress (1 level completed, coins earned)
    const missionUpdated = recordMissionAction(progressToSave, {
      levelsDelta: 1,
      coinsDelta: victoryCoins,
    });

    setUserProgress(missionUpdated);
    saveUserProgress(missionUpdated);
    setVictoryData({ starsEarned: victoryStars, coinsEarned: victoryCoins });
  };

  // Booster: Undo Move
  const handleUndo = () => {
    if (movesHistory.length === 0) {
      soundEngine.playError();
      return;
    }

    usedUndoInLevelRef.current = true;

    const hasFreeUndo = (userProgress.freeUndos || 0) > 0;
    const hasEnoughCoins = userProgress.coins >= 20;

    if (!hasFreeUndo && !hasEnoughCoins) {
      soundEngine.playSelect();
      setAdRewardType('undo');
      setActiveModal('rewardedAd');
      return;
    }

    soundEngine.playBooster();

    const lastStep = movesHistory[movesHistory.length - 1];
    setTubes(lastStep.previousTubesState);
    setMovesHistory((prev) => prev.slice(0, prev.length - 1));
    setSelectedTubeIndex(null);

    const updated = {
      ...userProgress,
      freeUndos: hasFreeUndo ? Math.max(0, (userProgress.freeUndos || 0) - 1) : (userProgress.freeUndos || 0),
      coins: !hasFreeUndo ? Math.max(0, userProgress.coins - 20) : userProgress.coins,
      stats: {
        ...userProgress.stats,
        boostersUsed: userProgress.stats.boostersUsed + 1,
        undosUsed: (userProgress.stats.undosUsed || 0) + 1,
      },
    };
    setUserProgress(updated);
    saveUserProgress(updated);
  };

  // Booster: Get Hint
  const handleHint = () => {
    const hasFreeHint = (userProgress.freeHints || 0) > 0;
    const hasEnoughCoins = userProgress.coins >= 50;

    if (!hasFreeHint && !hasEnoughCoins) {
      soundEngine.playSelect();
      setAdRewardType('hint');
      setActiveModal('rewardedAd');
      return;
    }

    const foundHint = findHint(tubes);
    if (!foundHint) {
      soundEngine.playError();
      return;
    }

    soundEngine.playBooster();
    setHint(foundHint);

    const updated = {
      ...userProgress,
      freeHints: hasFreeHint ? Math.max(0, (userProgress.freeHints || 0) - 1) : (userProgress.freeHints || 0),
      coins: !hasFreeHint ? Math.max(0, userProgress.coins - 50) : userProgress.coins,
      stats: {
        ...userProgress.stats,
        boostersUsed: userProgress.stats.boostersUsed + 1,
        hintsUsed: (userProgress.stats.hintsUsed || 0) + 1,
      },
    };
    const missionUpdated = recordMissionAction(updated, { hintsDelta: 1 });
    setUserProgress(missionUpdated);
    saveUserProgress(missionUpdated);
  };

  // Booster: Add Extra Tube
  const handleAddTube = () => {
    if (extraTubesCount >= 2) {
      soundEngine.playError();
      return;
    }

    const hasFreeTube = (userProgress.freeExtraTubes || 0) > 0;
    const hasEnoughCoins = userProgress.coins >= 100;

    if (!hasFreeTube && !hasEnoughCoins) {
      soundEngine.playSelect();
      setAdRewardType('tube');
      setActiveModal('rewardedAd');
      return;
    }

    soundEngine.playBooster();
    setTubes((prev) => [...prev, []]);
    setExtraTubesCount((prev) => prev + 1);

    const updated = {
      ...userProgress,
      freeExtraTubes: hasFreeTube ? Math.max(0, (userProgress.freeExtraTubes || 0) - 1) : (userProgress.freeExtraTubes || 0),
      coins: !hasFreeTube ? Math.max(0, userProgress.coins - 100) : userProgress.coins,
      stats: {
        ...userProgress.stats,
        boostersUsed: userProgress.stats.boostersUsed + 1,
        extraTubesUsed: (userProgress.stats.extraTubesUsed || 0) + 1,
      },
    };
    setUserProgress(updated);
    saveUserProgress(updated);
  };

  // Rewarded Ad Completion Handler
  const handleAdCompleted = (type: AdRewardType) => {
    let baseUpdated: UserProgress = userProgress;

    if (type === 'coins') {
      baseUpdated = {
        ...userProgress,
        coins: userProgress.coins + 100,
        stats: {
          ...userProgress.stats,
          totalCoinsEarned: userProgress.stats.totalCoinsEarned + 100,
        },
      };
    } else if (type === 'hint') {
      const foundHint = findHint(tubes);
      if (foundHint) setHint(foundHint);
      baseUpdated = {
        ...userProgress,
        freeHints: (userProgress.freeHints || 0) + 1,
      };
    } else if (type === 'tube') {
      if (extraTubesCount < 2) {
        setTubes((prev) => [...prev, []]);
        setExtraTubesCount((prev) => prev + 1);
      }
      baseUpdated = {
        ...userProgress,
        freeExtraTubes: (userProgress.freeExtraTubes || 0) + 1,
      };
    } else if (type === 'undo') {
      baseUpdated = {
        ...userProgress,
        freeUndos: (userProgress.freeUndos || 0) + 5,
      };
    } else if (type === 'skip') {
      handleLevelWon(movesCount || 1);
      return;
    }

    // Record watching rewarded ad mission action
    const missionUpdated = recordMissionAction(baseUpdated, {
      adsDelta: 1,
      coinsDelta: type === 'coins' ? 100 : 0,
    });
    setUserProgress(missionUpdated);
    saveUserProgress(missionUpdated);
  };

  // Daily Reward Claim Handler (30 Days)
  const handleClaimDailyReward = (reward: {
    coins: number;
    hints: number;
    tubes: number;
    undos: number;
    skips: number;
    claimedDay: number;
  }) => {
    const todayStr = getTodayDateString();
    const prevClaimedDays = userProgress.claimedDailyDays || [];
    const newClaimedDays = prevClaimedDays.includes(reward.claimedDay)
      ? prevClaimedDays
      : [...prevClaimedDays, reward.claimedDay];

    const baseUpdated: UserProgress = {
      ...userProgress,
      coins: userProgress.coins + reward.coins,
      freeHints: (userProgress.freeHints || 0) + reward.hints,
      freeExtraTubes: (userProgress.freeExtraTubes || 0) + reward.tubes,
      freeUndos: (userProgress.freeUndos || 0) + reward.undos,
      freeSkips: (userProgress.freeSkips || 0) + reward.skips,
      lastDailyClaimDate: todayStr,
      dailyStreak: (userProgress.dailyStreak || 0) + 1,
      claimedDailyDays: newClaimedDays,
      stats: {
        ...userProgress.stats,
        totalCoinsEarned: userProgress.stats.totalCoinsEarned + reward.coins,
      },
    };

    const missionUpdated = recordMissionAction(baseUpdated, { coinsDelta: reward.coins });
    setUserProgress(missionUpdated);
    saveUserProgress(missionUpdated);
  };

  // Daily Mission Claim Handlers
  const handleClaimMissionReward = (
    missionId: string,
    reward: { coins: number; itemType?: string; itemCount?: number }
  ) => {
    const currentMissions = ensureDailyMissions(userProgress).dailyMissions || getInitialDailyMissions();
    const prevClaimedIds = currentMissions.claimedMissionIds || [];
    if (prevClaimedIds.includes(missionId)) return;

    const newClaimedIds = [...prevClaimedIds, missionId];
    let extraHints = 0;
    let extraTubes = 0;
    let extraUndos = 0;
    let extraSkips = 0;

    if (reward.itemType === 'hint') extraHints = reward.itemCount || 1;
    if (reward.itemType === 'tube') extraTubes = reward.itemCount || 1;
    if (reward.itemType === 'undo') extraUndos = reward.itemCount || 5;
    if (reward.itemType === 'skip') extraSkips = reward.itemCount || 1;

    const updated: UserProgress = {
      ...userProgress,
      coins: userProgress.coins + reward.coins,
      freeHints: (userProgress.freeHints || 0) + extraHints,
      freeExtraTubes: (userProgress.freeExtraTubes || 0) + extraTubes,
      freeUndos: (userProgress.freeUndos || 0) + extraUndos,
      freeSkips: (userProgress.freeSkips || 0) + extraSkips,
      dailyMissions: {
        ...currentMissions,
        claimedMissionIds: newClaimedIds,
      },
      stats: {
        ...userProgress.stats,
        totalCoinsEarned: userProgress.stats.totalCoinsEarned + reward.coins,
      },
    };
    setUserProgress(updated);
    saveUserProgress(updated);
  };

  const handleClaimAllMissionsBonus = () => {
    const currentMissions = ensureDailyMissions(userProgress).dailyMissions || getInitialDailyMissions();
    if (currentMissions.claimedAllBonus) return;

    const bonusCoins = 500;
    const updated: UserProgress = {
      ...userProgress,
      coins: userProgress.coins + bonusCoins,
      freeExtraTubes: (userProgress.freeExtraTubes || 0) + 1,
      freeSkips: (userProgress.freeSkips || 0) + 1,
      dailyMissions: {
        ...currentMissions,
        claimedAllBonus: true,
      },
      stats: {
        ...userProgress.stats,
        totalCoinsEarned: userProgress.stats.totalCoinsEarned + bonusCoins,
      },
    };
    setUserProgress(updated);
    saveUserProgress(updated);
  };

  // Lucky Spin Reward Handler
  const handleClaimLuckySpinReward = (reward: SpinReward) => {
    const todayStr = getTodayDateString();
    const isFree = !userProgress.lastLuckySpinDate || userProgress.lastLuckySpinDate !== todayStr;

    const baseCoinsEarned = reward.type === 'coins' ? reward.amount : 0;

    const baseUpdated: UserProgress = {
      ...userProgress,
      lastLuckySpinDate: isFree ? todayStr : userProgress.lastLuckySpinDate,
      coins: reward.type === 'coins' ? userProgress.coins + reward.amount : userProgress.coins,
      freeHints: reward.type === 'hints' ? (userProgress.freeHints || 0) + reward.amount : (userProgress.freeHints || 0),
      freeUndos: reward.type === 'undos' ? (userProgress.freeUndos || 0) + reward.amount : (userProgress.freeUndos || 0),
      freeExtraTubes: reward.type === 'extraTubes' ? (userProgress.freeExtraTubes || 0) + reward.amount : (userProgress.freeExtraTubes || 0),
      freeSkips: reward.type === 'skips' ? (userProgress.freeSkips || 0) + reward.amount : (userProgress.freeSkips || 0),
      stats: {
        ...userProgress.stats,
        totalCoinsEarned: reward.type === 'coins' ? userProgress.stats.totalCoinsEarned + reward.amount : userProgress.stats.totalCoinsEarned,
        luckySpinsCount: (userProgress.stats.luckySpinsCount || 0) + 1,
      },
    };

    const missionUpdated = recordMissionAction(baseUpdated, { coinsDelta: baseCoinsEarned });
    setUserProgress(missionUpdated);
    saveUserProgress(missionUpdated);
  };

  // Shop Actions
  const handleBuyPowerUp = (type: PowerUpType, amount: number, price: number) => {
    if (userProgress.coins < price) {
      soundEngine.playError();
      return;
    }
    soundEngine.playBooster();
    const updated: UserProgress = {
      ...userProgress,
      coins: userProgress.coins - price,
      freeHints: type === 'hints' ? (userProgress.freeHints || 0) + amount : (userProgress.freeHints || 0),
      freeExtraTubes: type === 'extraTubes' ? (userProgress.freeExtraTubes || 0) + amount : (userProgress.freeExtraTubes || 0),
      freeUndos: type === 'undos' ? (userProgress.freeUndos || 0) + amount : (userProgress.freeUndos || 0),
      freeSkips: type === 'skip' ? (userProgress.freeSkips || 0) + amount : (userProgress.freeSkips || 0),
    };
    setUserProgress(updated);
    saveUserProgress(updated);
  };

  const handleSkipLevel = () => {
    const hasFreeSkip = (userProgress.freeSkips || 0) > 0;
    if (!hasFreeSkip && userProgress.coins < 200) {
      soundEngine.playError();
      setActiveModal('shop');
      return;
    }

    soundEngine.playBooster();
    const updated: UserProgress = {
      ...userProgress,
      freeSkips: hasFreeSkip ? Math.max(0, (userProgress.freeSkips || 0) - 1) : (userProgress.freeSkips || 0),
      coins: !hasFreeSkip ? Math.max(0, userProgress.coins - 200) : userProgress.coins,
      stats: {
        ...userProgress.stats,
        boostersUsed: userProgress.stats.boostersUsed + 1,
      },
    };
    setUserProgress(updated);
    saveUserProgress(updated);
    handleLevelWon(movesCount || 1);
  };

  const handleBuyTubeSkin = (skinId: string, price: number) => {
    const updated: UserProgress = {
      ...userProgress,
      coins: userProgress.coins - price,
      unlockedTubeSkins: [...userProgress.unlockedTubeSkins, skinId],
      activeTubeSkin: skinId,
    };
    setUserProgress(updated);
    saveUserProgress(updated);
  };

  const handleSelectTubeSkin = (skinId: string) => {
    const updated: UserProgress = {
      ...userProgress,
      activeTubeSkin: skinId,
    };
    setUserProgress(updated);
    saveUserProgress(updated);
  };

  const handleBuyTheme = (themeId: string, price: number) => {
    const updated: UserProgress = {
      ...userProgress,
      coins: userProgress.coins - price,
      unlockedThemes: [...userProgress.unlockedThemes, themeId],
      activeTheme: themeId,
    };
    setUserProgress(updated);
    saveUserProgress(updated);
  };

  const handleSelectTheme = (themeId: string) => {
    const updated: UserProgress = {
      ...userProgress,
      activeTheme: themeId,
    };
    setUserProgress(updated);
    saveUserProgress(updated);
  };

  const handleAddCoins = (amount: number) => {
    const baseUpdated: UserProgress = {
      ...userProgress,
      coins: userProgress.coins + amount,
    };
    const missionUpdated = recordMissionAction(baseUpdated, { coinsDelta: amount });
    setUserProgress(missionUpdated);
    saveUserProgress(missionUpdated);
  };

  const handleClaimAchievement = (achId: string, reward: number) => {
    const updated: UserProgress = {
      ...userProgress,
      coins: userProgress.coins + reward,
      claimedAchievements: [...userProgress.claimedAchievements, achId],
    };
    setUserProgress(updated);
    saveUserProgress(updated);
  };

  const activeThemeObj =
    GAME_THEMES.find((t) => t.id === userProgress.activeTheme) || GAME_THEMES[0];

  const todayStr = new Date().toISOString().split('T')[0];
  const isDailyChallengeCompletedToday =
    userProgress.dailyChallenge?.lastCompletedDate === todayStr;
  const isLuckySpinReady = !userProgress.lastLuckySpinDate || userProgress.lastLuckySpinDate !== todayStr;

  return (
    <AndroidFrame isFrameActive={isAndroidFrame}>
      <div
        className={`w-full h-full flex flex-col justify-between bg-gradient-to-b ${activeThemeObj.bgGradient} text-white select-none relative overflow-hidden`}
      >
        {/* Dynamic Theme Atmospheric Canvas Particles */}
        <ThemeParticles themeId={userProgress.activeTheme} />

        {/* Navigation Bar */}
        <Navbar
          currentLevel={isPlayingDailyChallenge ? 999 : currentLevelId}
          chapterName={isPlayingDailyChallenge ? 'Daily Challenge' : levelConfig.chapterName}
          movesCount={movesCount}
          parMoves={levelConfig.parMoves}
          coins={userProgress.coins}
          freeUndos={userProgress.freeUndos || 0}
          freeHints={userProgress.freeHints || 0}
          freeExtraTubes={userProgress.freeExtraTubes || 0}
          freeSkips={userProgress.freeSkips || 0}
          extraTubesUsed={extraTubesCount}
          isAndroidFrame={isAndroidFrame}
          isDailyClaimedToday={userProgress.lastDailyClaimDate === todayStr}
          isDailyChallengeCompletedToday={isDailyChallengeCompletedToday}
          isLuckySpinReady={isLuckySpinReady}
          onUndo={handleUndo}
          onHint={handleHint}
          onAddTube={handleAddTube}
          onSkipLevel={handleSkipLevel}
          onRestart={() => (isPlayingDailyChallenge ? initDailyChallenge() : initLevel(currentLevelId))}
          onOpenLevelMap={() => setActiveModal('levelMap')}
          onOpenShop={() => setActiveModal('shop')}
          onOpenAchievements={() => setActiveModal('achievements')}
          onOpenSettings={() => setActiveModal('settings')}
          onOpenDailyRewards={() => setActiveModal('daily')}
          onOpenLuckySpin={() => setActiveModal('luckySpin')}
          onOpenDailyChallenge={() => setActiveModal('dailyChallenge')}
          onOpenStats={() => setActiveModal('stats')}
          onOpenProfile={() => setActiveModal('profile')}
          onOpenLeaderboard={() => setActiveModal('leaderboard')}
          onOpenRewardedAds={() => {
            setAdRewardType('hint');
            setActiveModal('rewardedAd');
          }}
          onToggleFrame={() => setIsAndroidFrame(!isAndroidFrame)}
        />

        {/* Active Weekly Event Banner */}
        <div className="pt-2 px-2">
          <EventBanner
            userProgress={userProgress}
            onOpenEventModal={() => setActiveModal('events')}
          />
        </div>

        {/* Game Arena / Tubes Rack Area */}
        <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-6 flex flex-col items-center justify-center relative">
          {/* Daily Challenge Indicator Tag */}
          {isPlayingDailyChallenge && (
            <div className="absolute top-2 px-3 py-1 rounded-full bg-purple-500/30 border border-purple-500/60 text-purple-200 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg z-20 animate-pulse">
              <span>🔥 Today's Special Daily Challenge</span>
            </div>
          )}

          {/* Active Hint Banner */}
          {hint && (
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute top-10 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-300 font-extrabold text-xs shadow-lg flex items-center gap-2 z-20"
            >
              <span>💡 Pour Tube #{hint.fromIndex + 1} into Tube #{hint.toIndex + 1}</span>
            </motion.div>
          )}

          {/* Tubes Display Grid / Layout */}
          <div className="w-full flex flex-wrap justify-center items-center gap-4 sm:gap-6 my-auto pt-6 pb-8">
            {tubes.map((tubeColors, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  tubeRefs.current[idx] = el;
                }}
              >
                <Tube
                  id={idx}
                  colors={tubeColors}
                  isSelected={selectedTubeIndex === idx}
                  isPourSource={pouringState.sourceIndex === idx}
                  isPourTarget={pouringState.targetIndex === idx}
                  pourAngle={pouringState.sourceIndex === idx ? pouringState.pourAngle : 0}
                  isHintSource={hint?.fromIndex === idx}
                  isHintTarget={hint?.toIndex === idx}
                  activeSkinId={userProgress.activeTubeSkin}
                  activeThemeId={userProgress.activeTheme}
                  onClick={() => handleTubeClick(idx)}
                />
              </div>
            ))}
          </div>

          {/* Pour Liquid Arc Stream Animation */}
          <PourAnimationOverlay
            colorId={pouringState.colorId}
            active={pouringState.active}
            sourceCoords={pouringState.sourceCoords}
            targetCoords={pouringState.targetCoords}
          />

          {/* Rack Base Stand Effect */}
          <div className="w-full max-w-md h-3 bg-gradient-to-r from-slate-800/20 via-slate-700/60 to-slate-800/20 rounded-full border-t border-white/10 shadow-lg mt-2" />
        </main>

        {/* AdMob Bottom Banner Ad (Always visible during gameplay, never overlaps buttons or tubes) */}
        <AdMobBanner />

        {/* Animated Achievement Unlock Popup Toast */}
        <AchievementUnlockToast
          achievement={activeAchievementToast}
          onClaim={handleClaimAchievement}
          onDismiss={() => setActiveAchievementToast(null)}
        />

        {/* Modals & Popups */}
        <AnimatePresence>
          {/* Google AdMob App Open Ad (App launch only, non-blocking) */}
          {showAppOpenAd && (
            <AppOpenAdModal onClose={() => setShowAppOpenAd(false)} />
          )}

          {/* Google AdMob Interstitial Ad (Triggers every 3 completed levels) */}
          {showInterstitialAd && (
            <InterstitialAdModal onClose={() => setShowInterstitialAd(false)} />
          )}
          {activeModal === 'levelMap' && (
            <LevelSelectModal
              userProgress={userProgress}
              currentLevel={currentLevelId}
              onSelectLevel={(lvl) => initLevel(lvl)}
              onClose={() => setActiveModal(null)}
            />
          )}

          {activeModal === 'shop' && (
            <ShopModal
              userProgress={userProgress}
              onBuyPowerUp={handleBuyPowerUp}
              onBuyTubeSkin={handleBuyTubeSkin}
              onSelectTubeSkin={handleSelectTubeSkin}
              onBuyTheme={handleBuyTheme}
              onSelectTheme={handleSelectTheme}
              onAddCoins={handleAddCoins}
              onOpenRewardedAds={() => {
                setAdRewardType('hint');
                setActiveModal('rewardedAd');
              }}
              onClose={() => setActiveModal(null)}
            />
          )}

          {activeModal === 'daily' && (
            <DailyRewardModal
              userProgress={userProgress}
              onClaimDailyReward={handleClaimDailyReward}
              onClaimMissionReward={handleClaimMissionReward}
              onClaimAllMissionsBonus={handleClaimAllMissionsBonus}
              onClose={() => setActiveModal(null)}
            />
          )}

          {activeModal === 'luckySpin' && (
            <LuckySpinModal
              userProgress={userProgress}
              onClaimReward={handleClaimLuckySpinReward}
              onOpenRewardedAds={() => {
                setAdRewardType('hint');
                setActiveModal('rewardedAd');
              }}
              onClose={() => setActiveModal(null)}
            />
          )}

          {activeModal === 'dailyChallenge' && (
            <DailyChallengeModal
              userProgress={userProgress}
              onStartDailyChallenge={() => initDailyChallenge()}
              onClose={() => setActiveModal(null)}
            />
          )}

          {activeModal === 'profile' && (
            <ProfileModal
              userProgress={userProgress}
              onUpdateAvatar={handleUpdateAvatar}
              onClose={() => setActiveModal(null)}
            />
          )}

          {activeModal === 'leaderboard' && (
            <LeaderboardModal
              userProgress={userProgress}
              onUpdateCountry={handleUpdateCountry}
              onClose={() => setActiveModal(null)}
            />
          )}

          {activeModal === 'events' && (
            <EventModal
              userProgress={userProgress}
              onSelectEvent={handleSelectEvent}
              onClaimMilestone={handleClaimEventMilestone}
              onClose={() => setActiveModal(null)}
            />
          )}

          {activeModal === 'stats' && (
            <StatsModal
              userProgress={userProgress}
              onClose={() => setActiveModal(null)}
            />
          )}

          {activeModal === 'rewardedAd' && (
            <RewardedAdModal
              rewardType={adRewardType}
              onAdCompleted={handleAdCompleted}
              onClose={() => setActiveModal(null)}
            />
          )}

          {activeModal === 'achievements' && (
            <AchievementsModal
              userProgress={userProgress}
              onClaimReward={handleClaimAchievement}
              onClose={() => setActiveModal(null)}
            />
          )}

          {activeModal === 'settings' && (
            <SettingsModal
              userProgress={userProgress}
              onUpdateSettings={(updated) => {
                setUserProgress(updated);
                saveUserProgress(updated);
              }}
              onResetProgress={() => {
                localStorage.clear();
                window.location.reload();
              }}
              onOpenLeaderboard={() => setActiveModal('leaderboard')}
              onOpenAchievements={() => setActiveModal('achievements')}
              onClose={() => setActiveModal(null)}
            />
          )}

          {isVictory && victoryData && (
            <VictoryModal
              levelId={isPlayingDailyChallenge ? 999 : currentLevelId}
              movesCount={movesCount}
              parMoves={levelConfig.parMoves}
              starsEarned={victoryData.starsEarned}
              coinsEarned={victoryData.coinsEarned}
              isDailyChallenge={isPlayingDailyChallenge}
              onNextLevel={() => {
                if (isPlayingDailyChallenge) {
                  initLevel(currentLevelId);
                } else {
                  const nextLvl = Math.min(500, currentLevelId + 1);
                  initLevel(nextLvl);
                }
              }}
              onReplay={() =>
                isPlayingDailyChallenge ? initDailyChallenge() : initLevel(currentLevelId)
              }
            />
          )}
        </AnimatePresence>
      </div>
    </AndroidFrame>
  );
}
