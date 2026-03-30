'use client';
import { useState } from 'react';

import { css } from '_panda/css';
import { motion } from 'framer-motion';

export function MotionPet() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.img
      src="/main/snowman.svg"
      alt="snowman"
      width={100}
      height={100}
      draggable={false}
      className={css({
        width: 'auto',
        height: '100%',
        objectFit: 'contain',
        userSelect: 'none',
        pointerEvents: 'auto',
        cursor: 'pointer',
      })}
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        y: {
          duration: isHovered ? 1 : 3,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
      whileHover={{
        rotate: [0, -3, 3, -2, 0],
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.9,
        rotate: 0,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => {
        console.log('clicked');
      }}
    />
  );
}
