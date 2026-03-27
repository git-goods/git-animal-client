import type { PropsWithChildren } from 'react';
import { css } from '_panda/css';
import { motion } from 'framer-motion';

interface SummonCardMotionProps {
  x: number;
  y: number;
  index: number;
  onClick: () => void;
}

export function SummonCardMotion({ children, x, y, index, onClick }: PropsWithChildren<SummonCardMotionProps>) {
  return (
    <motion.div
      className={cardStyle}
      initial={{ opacity: 0, scale: 0.3, x: 0, y: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        x,
        y,
      }}
      transition={{
        duration: 0.5,
        type: 'spring',
        stiffness: 120,
        damping: 15,
        delay: index * 0.15,
      }}
      onClick={onClick}
      whileHover={{
        scale: 1.05,
        boxShadow: '0 0 24px rgba(147, 130, 255, 0.6)',
        transition: { duration: 0.2 },
      }}
    >
      {/* Floating animation wrapper */}
      <motion.div
        animate={{ y: [-4, 4] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
          delay: index * 0.2,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

interface ConvergeMotionProps {
  x: number;
  y: number;
  index: number;
}

export function ConvergeMotion({ children, x, y, index }: PropsWithChildren<ConvergeMotionProps>) {
  return (
    <motion.div
      className={cardStyle}
      initial={{ x, y, scale: 1, opacity: 1 }}
      animate={{ x: 0, y: 0, scale: 0.3, opacity: 0.8 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 20,
        delay: index * 0.03,
      }}
    >
      {children}
    </motion.div>
  );
}

export function MergedCardMotion({ children }: PropsWithChildren) {
  return (
    <motion.div
      className={mergedCardStyle}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [0.5, 0.55, 0.5], opacity: 1 }}
      transition={{
        scale: {
          duration: 1.5,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        },
        opacity: { duration: 0.3 },
      }}
    >
      {/* Micro-shake container */}
      <motion.div
        animate={{ x: [-1, 1, -1], y: [1, -1, 1] }}
        transition={{ duration: 0.15, repeat: Infinity, repeatType: 'reverse' }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

const SHARD_CLIPS = [
  'polygon(50% 50%, 0% 0%, 50% 0%)',
  'polygon(50% 50%, 50% 0%, 100% 0%)',
  'polygon(50% 50%, 100% 0%, 100% 50%)',
  'polygon(50% 50%, 100% 50%, 100% 100%)',
  'polygon(50% 50%, 100% 100%, 50% 100%)',
  'polygon(50% 50%, 50% 100%, 0% 100%)',
];

interface ShatterMotionProps {
  children: React.ReactNode;
  onComplete: () => void;
}

export function ShatterMotion({ children, onComplete }: ShatterMotionProps) {
  return (
    <div className={shatterContainerStyle}>
      {SHARD_CLIPS.map((clip, i) => {
        const angle = (i * 60 + 30) * (Math.PI / 180);
        const dist = 200;
        return (
          <motion.div
            key={i}
            className={shardStyle}
            style={{ clipPath: clip }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            animate={{
              x: Math.cos(angle) * dist,
              y: Math.sin(angle) * dist,
              opacity: 0,
              rotate: (i % 2 === 0 ? 1 : -1) * 90,
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            onAnimationComplete={i === 0 ? onComplete : undefined}
          >
            {children}
          </motion.div>
        );
      })}
    </div>
  );
}

export function ShockwaveRing() {
  return (
    <motion.div
      className={shockwaveStyle}
      initial={{ scale: 0, opacity: 0.8 }}
      animate={{ scale: 3, opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    />
  );
}

export function ResultCardMotion({ children }: PropsWithChildren) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: [0, 1.3, 1.2] }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 15,
        duration: 0.6,
      }}
    >
      {children}
    </motion.div>
  );
}

const cardStyle = css({
  position: 'absolute',
  cursor: 'pointer',
  borderRadius: '8px',
});

const mergedCardStyle = css({
  position: 'absolute',
  zIndex: 10,
});

const shatterContainerStyle = css({
  position: 'absolute',
  width: '220px',
  height: '272px',
});

const shardStyle = css({
  position: 'absolute',
  inset: 0,
});

const shockwaveStyle = css({
  position: 'absolute',
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  border: '3px solid rgba(147, 130, 255, 0.8)',
  pointerEvents: 'none',
});
