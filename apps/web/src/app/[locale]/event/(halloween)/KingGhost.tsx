'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function KingGhost() {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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
        className="flex items-center justify-center cursor-pointer absolute right-10 z-[100]"
      >
        <motion.div animate={floatingAnimation} className="w-full h-full flex items-center justify-center">
          <Image
            src="/event/halloween/king-ghost.svg"
            width={96}
            height={99}
            alt="king ghost"
            className="w-full h-auto"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
