'use client';

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
      className="absolute bg-white rounded-[4px] opacity-80 pointer-events-none top-0 z-[1] max-mobile:scale-[0.8]"
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
