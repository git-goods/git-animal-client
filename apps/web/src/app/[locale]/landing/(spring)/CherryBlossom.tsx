'use client';

import { css } from '_panda/css';
import { motion } from 'framer-motion';

interface CherryBlossomProps {
  delay: number;
  left: string;
  size: number;
  duration: number;
  variant: number;
  opacity: number;
}

function BlossomSVG({ variant, size }: { variant: number; size: number }) {
  switch (variant) {
    case 0:
      // 큰 4방향 꽃 (11x11)
      return (
        <svg width={size} height={size} viewBox="0 0 11 11" shapeRendering="crispEdges">
          <rect x="5" y="0" width="1" height="1" fill="#FFB7C5" />
          <rect x="4" y="1" width="1" height="1" fill="#FF94A8" />
          <rect x="5" y="1" width="1" height="1" fill="#FFB7C5" />
          <rect x="6" y="1" width="1" height="1" fill="#FF94A8" />
          <rect x="3" y="2" width="1" height="1" fill="#FFC0CB" />
          <rect x="5" y="2" width="1" height="1" fill="#FFB7C5" />
          <rect x="7" y="2" width="1" height="1" fill="#FFC0CB" />
          <rect x="1" y="3" width="1" height="1" fill="#FFC0CB" />
          <rect x="2" y="3" width="1" height="1" fill="#FFB7C5" />
          <rect x="8" y="3" width="1" height="1" fill="#FFB7C5" />
          <rect x="9" y="3" width="1" height="1" fill="#FFC0CB" />
          <rect x="0" y="4" width="1" height="1" fill="#FF94A8" />
          <rect x="1" y="4" width="1" height="1" fill="#FFB7C5" />
          <rect x="9" y="4" width="1" height="1" fill="#FFB7C5" />
          <rect x="10" y="4" width="1" height="1" fill="#FF94A8" />
          <rect x="0" y="5" width="1" height="1" fill="#FFB7C5" />
          <rect x="2" y="5" width="1" height="1" fill="#FFB7C5" />
          <rect x="5" y="5" width="1" height="1" fill="#FFD700" />
          <rect x="8" y="5" width="1" height="1" fill="#FFB7C5" />
          <rect x="10" y="5" width="1" height="1" fill="#FFB7C5" />
          <rect x="0" y="6" width="1" height="1" fill="#FF94A8" />
          <rect x="1" y="6" width="1" height="1" fill="#FFB7C5" />
          <rect x="9" y="6" width="1" height="1" fill="#FFB7C5" />
          <rect x="10" y="6" width="1" height="1" fill="#FF94A8" />
          <rect x="1" y="7" width="1" height="1" fill="#FFC0CB" />
          <rect x="2" y="7" width="1" height="1" fill="#FFB7C5" />
          <rect x="8" y="7" width="1" height="1" fill="#FFB7C5" />
          <rect x="9" y="7" width="1" height="1" fill="#FFC0CB" />
          <rect x="3" y="8" width="1" height="1" fill="#FFC0CB" />
          <rect x="5" y="8" width="1" height="1" fill="#FFB7C5" />
          <rect x="7" y="8" width="1" height="1" fill="#FFC0CB" />
          <rect x="4" y="9" width="1" height="1" fill="#FF94A8" />
          <rect x="5" y="9" width="1" height="1" fill="#FFB7C5" />
          <rect x="6" y="9" width="1" height="1" fill="#FF94A8" />
          <rect x="5" y="10" width="1" height="1" fill="#FFB7C5" />
        </svg>
      );
    case 1:
      // 중간 다이아몬드 꽃 (7x7)
      return (
        <svg width={size} height={size} viewBox="0 0 7 7" shapeRendering="crispEdges">
          <rect x="3" y="0" width="1" height="1" fill="#FFB7C5" />
          <rect x="2" y="1" width="1" height="1" fill="#FF94A8" />
          <rect x="3" y="1" width="1" height="1" fill="#FFC0CB" />
          <rect x="4" y="1" width="1" height="1" fill="#FF94A8" />
          <rect x="1" y="2" width="1" height="1" fill="#FFB7C5" />
          <rect x="3" y="2" width="1" height="1" fill="#FFB7C5" />
          <rect x="5" y="2" width="1" height="1" fill="#FFB7C5" />
          <rect x="0" y="3" width="1" height="1" fill="#FFB7C5" />
          <rect x="2" y="3" width="1" height="1" fill="#FFC0CB" />
          <rect x="3" y="3" width="1" height="1" fill="#FFD700" />
          <rect x="4" y="3" width="1" height="1" fill="#FFC0CB" />
          <rect x="6" y="3" width="1" height="1" fill="#FFB7C5" />
          <rect x="1" y="4" width="1" height="1" fill="#FFB7C5" />
          <rect x="3" y="4" width="1" height="1" fill="#FFB7C5" />
          <rect x="5" y="4" width="1" height="1" fill="#FFB7C5" />
          <rect x="2" y="5" width="1" height="1" fill="#FF94A8" />
          <rect x="3" y="5" width="1" height="1" fill="#FFC0CB" />
          <rect x="4" y="5" width="1" height="1" fill="#FF94A8" />
          <rect x="3" y="6" width="1" height="1" fill="#FFB7C5" />
        </svg>
      );
    case 2:
      // 작은 꽃잎 (3x3)
      return (
        <svg width={size} height={size} viewBox="0 0 3 3" shapeRendering="crispEdges">
          <rect x="1" y="0" width="1" height="1" fill="#FFB7C5" />
          <rect x="0" y="1" width="1" height="1" fill="#FF94A8" />
          <rect x="1" y="1" width="1" height="1" fill="#FFC0CB" />
          <rect x="2" y="1" width="1" height="1" fill="#FF94A8" />
          <rect x="1" y="2" width="1" height="1" fill="#FFB7C5" />
        </svg>
      );
    case 3:
    default:
      // 아주 작은 점 (2x2)
      return (
        <svg width={size} height={size} viewBox="0 0 2 2" shapeRendering="crispEdges">
          <rect x="0" y="0" width="1" height="1" fill="#FFC0CB" />
          <rect x="1" y="0" width="1" height="1" fill="#FFB7C5" />
          <rect x="0" y="1" width="1" height="1" fill="#FFB7C5" />
          <rect x="1" y="1" width="1" height="1" fill="#FF94A8" />
        </svg>
      );
  }
}

export function CherryBlossom({ delay, left, size, duration, variant, opacity }: CherryBlossomProps) {
  return (
    <motion.div
      className={blossomStyle}
      initial={{ y: -20 }}
      animate={{
        y: ['-5vh', '200vh'],
        x: [-25, 25, -25],
        rotate: [0, 180, 360],
      }}
      transition={{
        y: {
          duration,
          repeat: Infinity,
          delay,
          ease: 'linear',
        },
        x: {
          duration: duration * 0.4,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatType: 'reverse',
        },
        rotate: {
          duration: duration * 0.7,
          repeat: Infinity,
          ease: 'linear',
        },
      }}
      style={{
        left,
        opacity,
      }}
    >
      <BlossomSVG variant={variant} size={size} />
    </motion.div>
  );
}

const blossomStyle = css({
  position: 'absolute',
  pointerEvents: 'none',
  top: 0,
  zIndex: 1,
  _mobile: {
    scale: 0.8,
  },
});
