'use client';

import { motion } from 'framer-motion';

interface CherryBlossomProps {
  delay: number;
  left: string;
  size: number;
  duration: number;
  variant: number;
  opacity: number;
}

export function BlossomSVG({ variant, size }: { variant: number; size: number }) {
  switch (variant) {
    case 0:
      // 9x9 큰 다이아몬드 벚꽃 (variant 1 확장판, 채워진 다이아몬드 + 수술)
      return (
        <svg width={size} height={size} viewBox="0 0 9 9" shapeRendering="crispEdges">
          <rect x="4" y="0" width="1" height="1" fill="#FF94A8" />
          <rect x="3" y="1" width="1" height="1" fill="#FFB7C5" />
          <rect x="4" y="1" width="1" height="1" fill="#FFC0CB" />
          <rect x="5" y="1" width="1" height="1" fill="#FFB7C5" />
          <rect x="2" y="2" width="1" height="1" fill="#FF94A8" />
          <rect x="3" y="2" width="1" height="1" fill="#FFC0CB" />
          <rect x="4" y="2" width="1" height="1" fill="#FFB7C5" />
          <rect x="5" y="2" width="1" height="1" fill="#FFC0CB" />
          <rect x="6" y="2" width="1" height="1" fill="#FF94A8" />
          <rect x="1" y="3" width="1" height="1" fill="#FFB7C5" />
          <rect x="2" y="3" width="1" height="1" fill="#FFC0CB" />
          <rect x="3" y="3" width="1" height="1" fill="#FFB7C5" />
          <rect x="4" y="3" width="1" height="1" fill="#FFC0CB" />
          <rect x="5" y="3" width="1" height="1" fill="#FFB7C5" />
          <rect x="6" y="3" width="1" height="1" fill="#FFC0CB" />
          <rect x="7" y="3" width="1" height="1" fill="#FFB7C5" />
          <rect x="0" y="4" width="1" height="1" fill="#FF94A8" />
          <rect x="1" y="4" width="1" height="1" fill="#FFC0CB" />
          <rect x="2" y="4" width="1" height="1" fill="#FFB7C5" />
          <rect x="3" y="4" width="1" height="1" fill="#FFD700" />
          <rect x="4" y="4" width="1" height="1" fill="#FFEC8B" />
          <rect x="5" y="4" width="1" height="1" fill="#FFD700" />
          <rect x="6" y="4" width="1" height="1" fill="#FFB7C5" />
          <rect x="7" y="4" width="1" height="1" fill="#FFC0CB" />
          <rect x="8" y="4" width="1" height="1" fill="#FF94A8" />
          <rect x="1" y="5" width="1" height="1" fill="#FFB7C5" />
          <rect x="2" y="5" width="1" height="1" fill="#FFC0CB" />
          <rect x="3" y="5" width="1" height="1" fill="#FFB7C5" />
          <rect x="4" y="5" width="1" height="1" fill="#FFC0CB" />
          <rect x="5" y="5" width="1" height="1" fill="#FFB7C5" />
          <rect x="6" y="5" width="1" height="1" fill="#FFC0CB" />
          <rect x="7" y="5" width="1" height="1" fill="#FFB7C5" />
          <rect x="2" y="6" width="1" height="1" fill="#FF94A8" />
          <rect x="3" y="6" width="1" height="1" fill="#FFC0CB" />
          <rect x="4" y="6" width="1" height="1" fill="#FFB7C5" />
          <rect x="5" y="6" width="1" height="1" fill="#FFC0CB" />
          <rect x="6" y="6" width="1" height="1" fill="#FF94A8" />
          <rect x="3" y="7" width="1" height="1" fill="#FFB7C5" />
          <rect x="4" y="7" width="1" height="1" fill="#FFC0CB" />
          <rect x="5" y="7" width="1" height="1" fill="#FFB7C5" />
          <rect x="4" y="8" width="1" height="1" fill="#FF94A8" />
        </svg>
      );
    case 1:
      // 7x7 다이아몬드 벚꽃 (기존 variant 1 고도화, 꽃잎 채움 + 수술 강화)
      return (
        <svg width={size} height={size} viewBox="0 0 7 7" shapeRendering="crispEdges">
          <rect x="3" y="0" width="1" height="1" fill="#FF94A8" />
          <rect x="2" y="1" width="1" height="1" fill="#FFB7C5" />
          <rect x="3" y="1" width="1" height="1" fill="#FFC0CB" />
          <rect x="4" y="1" width="1" height="1" fill="#FFB7C5" />
          <rect x="1" y="2" width="1" height="1" fill="#FF94A8" />
          <rect x="2" y="2" width="1" height="1" fill="#FFC0CB" />
          <rect x="3" y="2" width="1" height="1" fill="#FFB7C5" />
          <rect x="4" y="2" width="1" height="1" fill="#FFC0CB" />
          <rect x="5" y="2" width="1" height="1" fill="#FF94A8" />
          <rect x="0" y="3" width="1" height="1" fill="#FFB7C5" />
          <rect x="1" y="3" width="1" height="1" fill="#FFC0CB" />
          <rect x="2" y="3" width="1" height="1" fill="#FFD700" />
          <rect x="3" y="3" width="1" height="1" fill="#FFEC8B" />
          <rect x="4" y="3" width="1" height="1" fill="#FFD700" />
          <rect x="5" y="3" width="1" height="1" fill="#FFC0CB" />
          <rect x="6" y="3" width="1" height="1" fill="#FFB7C5" />
          <rect x="1" y="4" width="1" height="1" fill="#FF94A8" />
          <rect x="2" y="4" width="1" height="1" fill="#FFC0CB" />
          <rect x="3" y="4" width="1" height="1" fill="#FFB7C5" />
          <rect x="4" y="4" width="1" height="1" fill="#FFC0CB" />
          <rect x="5" y="4" width="1" height="1" fill="#FF94A8" />
          <rect x="2" y="5" width="1" height="1" fill="#FFB7C5" />
          <rect x="3" y="5" width="1" height="1" fill="#FFC0CB" />
          <rect x="4" y="5" width="1" height="1" fill="#FFB7C5" />
          <rect x="3" y="6" width="1" height="1" fill="#FF94A8" />
        </svg>
      );
    case 2:
      // 5x5 소형 벚꽃 (기존 variant 2 고도화, 꽃잎 채움 + 중심점)
      return (
        <svg width={size} height={size} viewBox="0 0 5 5" shapeRendering="crispEdges">
          <rect x="2" y="0" width="1" height="1" fill="#FF94A8" />
          <rect x="1" y="1" width="1" height="1" fill="#FFB7C5" />
          <rect x="2" y="1" width="1" height="1" fill="#FFC0CB" />
          <rect x="3" y="1" width="1" height="1" fill="#FFB7C5" />
          <rect x="0" y="2" width="1" height="1" fill="#FF94A8" />
          <rect x="1" y="2" width="1" height="1" fill="#FFC0CB" />
          <rect x="2" y="2" width="1" height="1" fill="#FFD700" />
          <rect x="3" y="2" width="1" height="1" fill="#FFC0CB" />
          <rect x="4" y="2" width="1" height="1" fill="#FF94A8" />
          <rect x="1" y="3" width="1" height="1" fill="#FFB7C5" />
          <rect x="2" y="3" width="1" height="1" fill="#FFC0CB" />
          <rect x="3" y="3" width="1" height="1" fill="#FFB7C5" />
          <rect x="2" y="4" width="1" height="1" fill="#FF94A8" />
        </svg>
      );
    case 3:
    default:
      // 3x3 작은 꽃잎 (기존 variant 2 유지)
      return (
        <svg width={size} height={size} viewBox="0 0 3 3" shapeRendering="crispEdges">
          <rect x="1" y="0" width="1" height="1" fill="#FFB7C5" />
          <rect x="0" y="1" width="1" height="1" fill="#FF94A8" />
          <rect x="1" y="1" width="1" height="1" fill="#FFC0CB" />
          <rect x="2" y="1" width="1" height="1" fill="#FF94A8" />
          <rect x="1" y="2" width="1" height="1" fill="#FFB7C5" />
        </svg>
      );
  }
}

export function CherryBlossom({ delay, left, size, duration, variant, opacity }: CherryBlossomProps) {
  return (
    <motion.div
      className="absolute pointer-events-none top-0 z-[1] max-mobile:scale-[0.8]"
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
