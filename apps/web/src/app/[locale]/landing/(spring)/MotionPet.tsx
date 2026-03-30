'use client';

import { useCallback, useState } from 'react';
import { css } from '_panda/css';
import { AnimatePresence, motion } from 'framer-motion';

import { BlossomSVG } from './CherryBlossom';

interface Petal {
  id: number;
  x: number;
  size: number;
  variant: number;
  delay: number;
}

let petalId = 0;

function createPetals(): Petal[] {
  return Array.from({ length: 12 }, () => ({
    id: petalId++,
    x: (Math.random() - 0.5) * 160,
    size: 6 + Math.random() * 10,
    variant: Math.random() > 0.5 ? 3 : 2,
    delay: Math.random() * 0.15,
  }));
}

export function MotionPet() {
  const [isHovered, setIsHovered] = useState(false);
  const [petals, setPetals] = useState<Petal[]>([]);

  const handleClick = useCallback(() => {
    setPetals((prev) => [...prev, ...createPetals()]);
  }, []);

  const handlePetalComplete = useCallback((id: number) => {
    setPetals((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <div className={containerStyle}>
      <motion.img
        src="/main/snowman.svg"
        alt="snowman"
        width={100}
        height={100}
        draggable={false}
        className={petStyle}
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
        onClick={handleClick}
      />

      <AnimatePresence>
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            className={petalStyle}
            initial={{ opacity: 1, y: -20, x: petal.x * 0.3, scale: 0 }}
            animate={{
              opacity: [1, 1, 0],
              y: [0, 80, 200],
              x: [petal.x * 0.3, petal.x, petal.x * 0.8],
              scale: [0, 1, 0.6],
              rotate: [0, petal.x > 0 ? 180 : -180, petal.x > 0 ? 360 : -360],
            }}
            transition={{
              duration: 1.8,
              delay: petal.delay,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            onAnimationComplete={() => handlePetalComplete(petal.id)}
          >
            <BlossomSVG variant={petal.variant} size={petal.size} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

const containerStyle = css({
  position: 'relative',
  width: 'auto',
  height: '100%',
});

const petStyle = css({
  width: 'auto',
  height: '100%',
  objectFit: 'contain',
  userSelect: 'none',
  pointerEvents: 'auto',
  cursor: 'pointer',
});

const petalStyle = css({
  position: 'absolute',
  top: '30%',
  left: '50%',
  pointerEvents: 'none',
});
