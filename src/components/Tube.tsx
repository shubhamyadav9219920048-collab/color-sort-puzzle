import React from 'react';
import { motion } from 'motion/react';
import { LIQUID_COLORS, TUBE_SKINS, GAME_THEMES } from '../lib/colors';
import { LiquidColorId } from '../types';

interface TubeProps {
  id: number;
  colors: LiquidColorId[]; // Array of color IDs from bottom (0) to top (3)
  isSelected: boolean;
  isPourSource: boolean;
  isPourTarget: boolean;
  pourAngle?: number; // Tilt angle in degrees when pouring
  isHintSource?: boolean;
  isHintTarget?: boolean;
  activeSkinId?: string;
  activeThemeId?: string;
  onClick: () => void;
}

export const Tube: React.FC<TubeProps> = ({
  id,
  colors,
  isSelected,
  isPourSource,
  isPourTarget,
  pourAngle = 0,
  isHintSource = false,
  isHintTarget = false,
  activeSkinId = 'cyber_glass',
  activeThemeId,
  onClick,
}) => {
  const skin = TUBE_SKINS.find((s) => s.id === activeSkinId) || TUBE_SKINS[0];
  const activeTheme = GAME_THEMES.find((t) => t.id === activeThemeId);
  const tubeStyleClass =
    activeSkinId === 'cyber_glass' && activeTheme?.tubeStyleClass
      ? activeTheme.tubeStyleClass
      : skin.styleClass;

  // Total capacity is 4
  const CAPACITY = 4;
  const emptySlots = CAPACITY - colors.length;

  // Determine animations
  const animateVariants = {
    idle: {
      y: 0,
      rotate: 0,
      scale: 1,
    },
    selected: {
      y: -22,
      rotate: 0,
      scale: 1.05,
    },
    pouring: {
      y: -30,
      rotate: pourAngle,
      scale: 1.08,
    },
    hint: {
      y: [0, -10, 0],
      scale: [1, 1.03, 1],
      transition: {
        repeat: Infinity,
        duration: 1.2,
      },
    },
  };

  let currentVariant = 'idle';
  if (isPourSource) {
    currentVariant = 'pouring';
  } else if (isSelected) {
    currentVariant = 'selected';
  } else if (isHintSource || isHintTarget) {
    currentVariant = 'hint';
  }

  return (
    <motion.div
      className="relative flex flex-col items-center cursor-pointer select-none touch-manipulation group"
      variants={animateVariants}
      animate={currentVariant}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onClick}
    >
      {/* Selection Glow Indicator */}
      {isSelected && (
        <div className="absolute -inset-2 rounded-3xl bg-cyan-500/20 blur-md animate-pulse pointer-events-none" />
      )}

      {/* Hint Ring Indicator */}
      {(isHintSource || isHintTarget) && (
        <div
          className={`absolute -inset-2 rounded-3xl blur-sm pointer-events-none ${
            isHintSource ? 'bg-amber-500/30 animate-ping' : 'bg-emerald-500/30'
          }`}
        />
      )}

      {/* Tube Glass Vessel */}
      <div
        className={`relative w-14 h-48 sm:w-16 sm:h-52 md:w-18 md:h-56 rounded-b-[2rem] rounded-t-xl border-2 overflow-hidden flex flex-col justify-end p-1 transition-all duration-300 ${tubeStyleClass} ${
          isSelected
            ? 'border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)]'
            : isHintSource
            ? 'border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.4)]'
            : isHintTarget
            ? 'border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.4)]'
            : 'border-slate-700/80 hover:border-slate-500/80'
        }`}
      >
        {/* Glass Top Lip / Lip Outline */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-white/10 rounded-t-lg border-b border-white/20 z-20 pointer-events-none" />

        {/* Glass Measurement Ticks */}
        <div className="absolute top-0 bottom-0 left-1 w-1 flex flex-col justify-between py-4 opacity-25 z-20 pointer-events-none">
          <div className="w-full h-[1px] bg-white" />
          <div className="w-[75%] h-[1px] bg-white" />
          <div className="w-full h-[1px] bg-white" />
          <div className="w-[75%] h-[1px] bg-white" />
          <div className="w-full h-[1px] bg-white" />
        </div>

        {/* Glass Glare Reflection Line */}
        <div className="absolute top-2 right-2 bottom-3 w-1.5 bg-gradient-to-b from-white/30 via-white/10 to-transparent rounded-full z-20 pointer-events-none" />

        {/* Liquid Stack Container */}
        <div className="w-full h-full flex flex-col justify-end gap-0.5 rounded-b-[1.75rem] overflow-hidden relative">
          {/* Empty space slots filler */}
          {Array.from({ length: emptySlots }).map((_, idx) => (
            <div key={`tube-${id ?? 0}-empty-${idx}`} className="flex-1 w-full bg-transparent" />
          ))}

          {/* Color Layers (rendered top to bottom) */}
          {colors
            .slice()
            .reverse()
            .map((colorId, idx) => {
              const colorDef = LIQUID_COLORS[colorId] || LIQUID_COLORS[1];
              const isTopLiquid = idx === 0;
              const isBottomLiquid = idx === colors.length - 1;

              return (
                <motion.div
                  key={`tube-${id ?? 0}-layer-${colors.length - 1 - idx}-${colorId}-${idx}`}
                  layout
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.25 }}
                  className={`relative flex-1 w-full overflow-hidden ${
                    isBottomLiquid ? 'rounded-b-[1.5rem]' : ''
                  }`}
                  style={{
                    background: `linear-gradient(180deg, ${colorDef.gradient[1]} 0%, ${colorDef.gradient[0]} 100%)`,
                    boxShadow: `inset 0 1px 2px rgba(255,255,255,0.4), 0 0 12px ${colorDef.glow}`,
                  }}
                >
                  {/* Top Liquid Surface Shine Ripple */}
                  {isTopLiquid && (
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/40 rounded-full blur-[0.5px]" />
                  )}

                  {/* Inner Liquid Specular Highlights */}
                  <div className="absolute inset-y-0 left-1.5 w-1 bg-white/20 rounded-full blur-[0.5px]" />
                  
                  {/* Subtle Liquid Bubbles Animation */}
                  <motion.div
                    className="absolute w-1 h-1 bg-white/50 rounded-full"
                    animate={{
                      y: [12, -4],
                      opacity: [0, 0.8, 0],
                      x: [2, 6, 2],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.8 + idx * 0.4,
                      ease: 'easeInOut',
                    }}
                    style={{ left: `${30 + idx * 20}%`, bottom: '2px' }}
                  />
                </motion.div>
              );
            })}
        </div>
      </div>

      {/* Complete Tube Gold Star Badge */}
      {colors.length === 4 && colors.every((c) => c === colors[0]) && (
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          className="absolute -top-3 right-0 w-6 h-6 rounded-full bg-amber-400 border border-amber-200 text-slate-950 font-black text-[10px] flex items-center justify-center shadow-lg shadow-amber-500/40 z-30"
        >
          ✓
        </motion.div>
      )}
    </motion.div>
  );
};
