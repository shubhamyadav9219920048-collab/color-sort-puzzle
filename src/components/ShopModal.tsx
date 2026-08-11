import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShoppingBag,
  Check,
  Coins,
  Sparkles,
  Palette,
  Shield,
  Lightbulb,
  RotateCcw,
  PlusCircle,
  FastForward,
  CheckCircle2,
  Tv,
  Zap,
} from 'lucide-react';
import { UserProgress } from '../types';
import { TUBE_SKINS, GAME_THEMES } from '../lib/colors';
import { soundEngine } from '../lib/sound';

export type PowerUpType = 'hints' | 'extraTubes' | 'undos' | 'skip';

interface ShopModalProps {
  userProgress: UserProgress;
  onBuyPowerUp: (type: PowerUpType, amount: number, price: number) => void;
  onBuyTubeSkin: (skinId: string, price: number) => void;
  onSelectTubeSkin: (skinId: string) => void;
  onBuyTheme: (themeId: string, price: number) => void;
  onSelectTheme: (themeId: string) => void;
  onAddCoins: (amount: number) => void;
  onOpenRewardedAds?: () => void;
  onClose: () => void;
}

interface ShopItem {
  id: string;
  name: string;
  description: string;
  type: PowerUpType;
  amount: number;
  price: number;
  badge?: string;
  icon: React.ReactNode;
  iconBg: string;
}

export const ShopModal: React.FC<ShopModalProps> = ({
  userProgress,
  onBuyPowerUp,
  onBuyTubeSkin,
  onSelectTubeSkin,
  onBuyTheme,
  onSelectTheme,
  onAddCoins,
  onOpenRewardedAds,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'boosters' | 'tubes' | 'themes' | 'coins'>('boosters');
  const [purchaseToast, setPurchaseToast] = useState<{ title: string; subtitle: string } | null>(null);

  const triggerPurchaseEffect = (title: string, subtitle: string) => {
    soundEngine.playBooster();
    setPurchaseToast({ title, subtitle });
    setTimeout(() => {
      setPurchaseToast(null);
    }, 2800);
  };

  const BOOSTER_ITEMS: ShopItem[] = [
    {
      id: 'hint_1',
      name: 'Single Hint',
      description: 'Reveals the optimal next move step.',
      type: 'hints',
      amount: 1,
      price: 100,
      icon: <Lightbulb className="w-6 h-6 text-amber-300" />,
      iconBg: 'bg-amber-500/20 border-amber-500/40',
    },
    {
      id: 'hint_3',
      name: 'Hint Trio Pack',
      description: 'Get 3 step-by-step solver hints.',
      type: 'hints',
      amount: 3,
      price: 250,
      badge: 'POPULAR',
      icon: <Lightbulb className="w-6 h-6 text-amber-300" />,
      iconBg: 'bg-amber-500/30 border-amber-400',
    },
    {
      id: 'hint_10',
      name: 'Hint Master Bundle',
      description: 'Get 10 solver hints for tough levels.',
      type: 'hints',
      amount: 10,
      price: 700,
      badge: 'BEST VALUE',
      icon: <Lightbulb className="w-6 h-6 text-amber-200" />,
      iconBg: 'bg-gradient-to-br from-amber-500/30 to-amber-700/40 border-amber-400',
    },
    {
      id: 'tube_1',
      name: 'Extra Tube',
      description: 'Adds 1 empty tube to active puzzle.',
      type: 'extraTubes',
      amount: 1,
      price: 150,
      icon: <PlusCircle className="w-6 h-6 text-cyan-300" />,
      iconBg: 'bg-cyan-500/20 border-cyan-500/40',
    },
    {
      id: 'tube_3',
      name: '3x Extra Tube Pack',
      description: 'Get 3 extra tube power-ups saved in stock.',
      type: 'extraTubes',
      amount: 3,
      price: 380,
      badge: 'HOT',
      icon: <PlusCircle className="w-6 h-6 text-cyan-200" />,
      iconBg: 'bg-cyan-500/30 border-cyan-400',
    },
    {
      id: 'undo_3',
      name: 'Undo Trio Pack',
      description: 'Rewind up to 3 incorrect moves.',
      type: 'undos',
      amount: 3,
      price: 80,
      icon: <RotateCcw className="w-6 h-6 text-rose-300" />,
      iconBg: 'bg-rose-500/20 border-rose-500/40',
    },
    {
      id: 'undo_10',
      name: '10x Time Rewind',
      description: 'Get 10 undo moves saved in inventory.',
      type: 'undos',
      amount: 10,
      price: 220,
      badge: 'SAVE 35%',
      icon: <RotateCcw className="w-6 h-6 text-rose-200" />,
      iconBg: 'bg-rose-500/30 border-rose-400',
    },
    {
      id: 'skip_1',
      name: 'Level Skip Pass',
      description: 'Instantly win & skip any difficult level!',
      type: 'skip',
      amount: 1,
      price: 200,
      badge: 'MEGA',
      icon: <FastForward className="w-6 h-6 text-purple-300" />,
      iconBg: 'bg-purple-500/30 border-purple-400',
    },
    {
      id: 'skip_3',
      name: '3x Level Skip Bundle',
      description: 'Get 3 level skip keys to bypass any level.',
      type: 'skip',
      amount: 3,
      price: 500,
      badge: 'SAVE 100 COINS',
      icon: <FastForward className="w-6 h-6 text-purple-200" />,
      iconBg: 'bg-gradient-to-br from-purple-600/30 to-indigo-600/40 border-purple-400',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {/* Animated Purchase Celebration Toast Effect */}
      <AnimatePresence>
        {purchaseToast && (
          <motion.div
            initial={{ y: -50, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -30, opacity: 0, scale: 0.9 }}
            className="fixed top-8 z-50 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-2xl border border-emerald-400/50 flex items-center gap-3 backdrop-blur-lg"
          >
            <div className="p-2 rounded-xl bg-white/20">
              <CheckCircle2 className="w-6 h-6 text-white animate-bounce" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-wide">{purchaseToast.title}</span>
              <span className="text-xs text-emerald-100 font-bold">{purchaseToast.subtitle}</span>
            </div>
            <div className="flex gap-1 ml-2">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden relative"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-black text-white tracking-wide">Alchemist Super Shop</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-extrabold text-xs shadow-sm">
              <Coins className="w-4 h-4 text-amber-400" />
              <span>{userProgress.coins}</span>
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

        {/* Current Owned Inventory Quick Bar */}
        <div className="px-4 py-2 bg-slate-950/70 border-b border-slate-800 flex items-center justify-between gap-2 text-[11px] font-extrabold text-slate-300 overflow-x-auto scrollbar-none">
          <span className="text-slate-400 uppercase tracking-wider text-[10px] font-black shrink-0">Inventory:</span>
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1 text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>{userProgress.freeHints || 0} Hints</span>
            </div>
            <div className="flex items-center gap-1 text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-lg border border-cyan-500/20">
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{userProgress.freeExtraTubes || 0} Extra Tubes</span>
            </div>
            <div className="flex items-center gap-1 text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded-lg border border-rose-500/20">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{userProgress.freeUndos || 0} Undos</span>
            </div>
            <div className="flex items-center gap-1 text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-lg border border-purple-500/20">
              <FastForward className="w-3.5 h-3.5" />
              <span>{userProgress.freeSkips || 0} Skips</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-2 gap-1.5 bg-slate-950/30 border-b border-slate-800 overflow-x-auto scrollbar-none">
          <button
            onClick={() => {
              soundEngine.playSelect();
              setActiveTab('boosters');
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'boosters'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-slate-800/60 text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Boosters</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playSelect();
              setActiveTab('tubes');
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'tubes'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-slate-800/60 text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Tube Skins</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playSelect();
              setActiveTab('themes');
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'themes'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-slate-800/60 text-slate-400 hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Themes</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playSelect();
              setActiveTab('coins');
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === 'coins'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                : 'bg-slate-800/60 text-slate-400 hover:text-white'
            }`}
          >
            <Coins className="w-3.5 h-3.5" />
            <span>Coin Packs</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 flex flex-col gap-4">
          {/* BOOSTERS TAB */}
          {activeTab === 'boosters' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BOOSTER_ITEMS.map((item) => {
                const canAfford = userProgress.coins >= item.price;

                return (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 hover:border-slate-600 flex flex-col justify-between gap-3 transition-all relative overflow-hidden group"
                  >
                    {item.badge && (
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-black text-[9px] uppercase tracking-wider shadow-sm">
                        {item.badge}
                      </span>
                    )}

                    <div className="flex items-start gap-3">
                      <div className={`p-3 rounded-2xl border ${item.iconBg} shrink-0 shadow-md`}>
                        {item.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                          {item.name}
                        </span>
                        <span className="text-xs text-slate-400 leading-tight mt-0.5">
                          {item.description}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-700/50 mt-1">
                      <span className="text-xs font-extrabold text-amber-300 flex items-center gap-1">
                        +{item.amount} {item.type === 'hints' ? 'Hints' : item.type === 'extraTubes' ? 'Tubes' : item.type === 'undos' ? 'Undos' : 'Skips'}
                      </span>
                      <button
                        disabled={!canAfford}
                        onClick={() => {
                          if (canAfford) {
                            onBuyPowerUp(item.type, item.amount, item.price);
                            triggerPurchaseEffect(
                              `Purchased ${item.name}!`,
                              `+${item.amount} ${item.type} saved in inventory.`
                            );
                          } else {
                            soundEngine.playError();
                          }
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
                      >
                        <Coins className="w-3.5 h-3.5" />
                        <span>{item.price}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TUBE SKINS TAB */}
          {activeTab === 'tubes' && (
            <div className="flex flex-col gap-3">
              {TUBE_SKINS.map((skin) => {
                const isUnlocked = userProgress.unlockedTubeSkins.includes(skin.id);
                const isActive = userProgress.activeTubeSkin === skin.id;

                return (
                  <div
                    key={skin.id}
                    className={`p-4 rounded-2xl border flex items-center justify-between gap-3 transition-all ${
                      isActive
                        ? 'bg-purple-950/30 border-purple-500/60 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                        : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-16 rounded-xl border-2 bg-gradient-to-br ${skin.previewGradient} flex items-center justify-center shadow-md`}
                      >
                        <Sparkles className="w-4 h-4 text-white/80 animate-pulse" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-extrabold text-white">{skin.name}</span>
                        <span className="text-xs text-slate-400">{skin.description}</span>
                      </div>
                    </div>

                    {isActive ? (
                      <span className="px-3 py-1.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold text-xs flex items-center gap-1">
                        <Check className="w-4 h-4" /> Active
                      </span>
                    ) : isUnlocked ? (
                      <button
                        onClick={() => {
                          soundEngine.playSelect();
                          onSelectTubeSkin(skin.id);
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs transition-all active:scale-95"
                      >
                        Equip
                      </button>
                    ) : (
                      <button
                        disabled={userProgress.coins < skin.price}
                        onClick={() => {
                          if (userProgress.coins >= skin.price) {
                            onBuyTubeSkin(skin.id, skin.price);
                            triggerPurchaseEffect(`Unlocked ${skin.name}!`, 'Equipped in active puzzle.');
                          } else {
                            soundEngine.playError();
                          }
                        }}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
                      >
                        <Coins className="w-3.5 h-3.5" />
                        <span>{skin.price}</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* THEMES TAB */}
          {activeTab === 'themes' && (
            <div className="flex flex-col gap-3">
              {GAME_THEMES.map((theme) => {
                const isUnlocked = userProgress.unlockedThemes.includes(theme.id);
                const isActive = userProgress.activeTheme === theme.id;

                return (
                  <div
                    key={theme.id}
                    className={`p-4 rounded-2xl border flex items-center justify-between gap-3 transition-all ${
                      isActive
                        ? 'bg-purple-950/30 border-purple-500/60 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                        : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-14 rounded-xl border border-slate-600 bg-gradient-to-br ${theme.bgGradient} flex flex-col items-center justify-center p-1 shadow-md shrink-0`}
                      >
                        <Palette className="w-5 h-5 text-amber-300" />
                        <span className="text-[8px] font-black text-white/80 uppercase tracking-tight mt-0.5">
                          {theme.musicKey}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-extrabold text-white">{theme.name}</span>
                        <span className="text-xs text-slate-400 leading-snug">{theme.description}</span>
                      </div>
                    </div>

                    {isActive ? (
                      <span className="px-3 py-1.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold text-xs flex items-center gap-1 shrink-0">
                        <Check className="w-4 h-4" /> Active
                      </span>
                    ) : isUnlocked ? (
                      <button
                        onClick={() => {
                          soundEngine.playSelect();
                          onSelectTheme(theme.id);
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs transition-all active:scale-95 shrink-0"
                      >
                        Equip
                      </button>
                    ) : (
                      <button
                        disabled={userProgress.coins < theme.price}
                        onClick={() => {
                          if (userProgress.coins >= theme.price) {
                            onBuyTheme(theme.id, theme.price);
                            triggerPurchaseEffect(
                              `Unlocked ${theme.name}!`,
                              'Theme equipped with custom tubes, particles & music!'
                            );
                          } else {
                            soundEngine.playError();
                          }
                        }}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-md shrink-0"
                      >
                        <Coins className="w-3.5 h-3.5" />
                        <span>{theme.price}</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* COINS TAB */}
          {activeTab === 'coins' && (
            <div className="flex flex-col gap-3">
              {onOpenRewardedAds && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-purple-900/40 to-indigo-900/60 border border-amber-500/50 flex items-center justify-between gap-3 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      <Coins className="w-6 h-6 text-amber-300 animate-pulse" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-white">Watch Ad for +100 Coins</span>
                      <span className="text-xs text-amber-200/80">Watch a 5s sponsor video to get 100 gold coins instantly!</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      soundEngine.playSelect();
                      onOpenRewardedAds();
                      onClose();
                    }}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs shadow-md active:scale-95 transition-all whitespace-nowrap"
                  >
                    WATCH AD
                  </button>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                {[
                  { coins: 200, label: 'Small Pouch', bonus: '+20 Bonus' },
                  { coins: 500, label: 'Medium Sack', bonus: '+75 Bonus' },
                  { coins: 1200, label: 'Large Chest', bonus: '+250 Bonus' },
                  { coins: 3000, label: 'Vault Of Gold', bonus: '+750 Bonus' },
                ].map((pack, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onAddCoins(pack.coins);
                      triggerPurchaseEffect(`Claimed +${pack.coins} Coins!`, 'Coins added to your balance.');
                    }}
                    className="p-4 rounded-2xl bg-gradient-to-b from-amber-500/10 to-amber-600/20 border border-amber-500/40 flex flex-col items-center justify-center gap-2 hover:border-amber-400 transition-all active:scale-95 shadow-md group"
                  >
                    <Coins className="w-8 h-8 text-amber-400 group-hover:scale-110 transition-transform" />
                    <span className="text-lg font-black text-amber-300">+{pack.coins}</span>
                    <span className="text-[10px] font-bold text-amber-200/80 bg-amber-500/20 px-2 py-0.5 rounded-full">
                      {pack.bonus}
                    </span>
                    <span className="text-xs font-extrabold text-slate-950 bg-amber-500 group-hover:bg-amber-400 px-3 py-1 rounded-xl mt-1 transition-colors">
                      CLAIM FREE
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
