'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { css } from '_panda/css';
import { motion } from 'framer-motion';

export function KingGhost() {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  console.log('isExpanded: ', isExpanded);

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: isHovered ? 0.5 : 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };

  const expandAnimation = {
    top: isExpanded ? '50%' : '50px',
    right: isExpanded ? '50%' : '20px',
    width: isExpanded ? '80vh' : '64px',
    height: isExpanded ? '80vh' : '64px',
    x: isExpanded ? '50%' : '0%',
    y: isExpanded ? '-60%' : '0%',
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  };

  const handleClick = () => {
    console.log('handleClick: ');
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <motion.div
        animate={expandAnimation}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          position: 'absolute',
          right: '10',
          zIndex: 100,
        })}
      >
        <motion.div
          animate={floatingAnimation}
          className={css({
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          })}
        >
          <Image
            src="/event/halloween/king-ghost.svg"
            width={96}
            height={99}
            alt="king ghost"
            className={kingGhostStyle}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

const kingGhostStyle = css({
  width: '100%',
  height: 'auto',
});
