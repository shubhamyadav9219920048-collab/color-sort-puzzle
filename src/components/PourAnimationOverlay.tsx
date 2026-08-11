import React from 'react';
import { motion } from 'motion/react';
import { LIQUID_COLORS } from '../lib/colors';
import { LiquidColorId } from '../types';

interface PourAnimationOverlayProps {
  colorId: LiquidColorId | null;
  active: boolean;
  sourceCoords: { x: number; y: number } | null;
  targetCoords: { x: number; y: number } | null;
}

export const PourAnimationOverlay: React.FC<PourAnimationOverlayProps> = ({
  colorId,
  active,
  sourceCoords,
  targetCoords,
}) => {
  if (!active || !colorId || !sourceCoords || !targetCoords) return null;

  const colorDef = LIQUID_COLORS[colorId] || LIQUID_COLORS[1];

  const startX = sourceCoords.x;
  const startY = sourceCoords.y;
  const endX = targetCoords.x;
  const endY = targetCoords.y;

  // Quadratic curve control point for graceful liquid arc
  const midX = (startX + endX) / 2;
  const midY = Math.min(startY, endY) - 30;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <svg className="w-full h-full">
        <defs>
          <linearGradient id="pourLiquidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colorDef.gradient[0]} />
            <stop offset="100%" stopColor={colorDef.gradient[1]} />
          </linearGradient>
          <filter id="liquidGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Liquid Stream Curved Path */}
        <motion.path
          d={`M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`}
          fill="none"
          stroke="url(#pourLiquidGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          filter="url(#liquidGlow)"
          initial={{ pathLength: 0, opacity: 0.5 }}
          animate={{ pathLength: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        />

        {/* Liquid Splash Droplets at Target Tube Mouth */}
        <motion.circle
          cx={endX}
          cy={endY}
          r="8"
          fill={colorDef.hex}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: [0.8, 1.4, 1], opacity: [0.4, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 0.3 }}
        />
      </svg>
    </div>
  );
};
