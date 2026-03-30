'use client';

import { css } from '_panda/css';
import { motion } from 'framer-motion';

interface SnowflakeProps {
  delay: number;
  left: string;
  size: number;
  duration: number;
}

export function Snowflake({ delay, left, size, duration }: SnowflakeProps) {
  return (
    <motion.div
      className={snowflakeStyle}
      initial={{ y: -20 }}
      animate={{
        y: ['-5vh', '200vh'],
        x: [-15, 15, -15],
      }}
      transition={{
        y: {
          duration,
          repeat: Infinity,
          delay,
          ease: 'linear',
        },
        x: {
          duration: duration * 0.5,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatType: 'reverse',
        },
      }}
      style={{
        left,
        width: size,
        height: size,
      }}
    />
  );
}

const snowflakeStyle = css({
  position: 'absolute',
  backgroundColor: 'white',
  borderRadius: '4px',
  opacity: 0.8,
  pointerEvents: 'none',
  top: 0,
  zIndex: 1,
  _mobile: {
    scale: 0.8,
  },
});
