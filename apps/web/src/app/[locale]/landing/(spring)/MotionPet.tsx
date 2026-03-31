'use client';

import type { CSSProperties } from 'react';
import { useCallback, useState } from 'react';
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

export function MotionPetSection() {
  const [petals, setPetals] = useState<Petal[]>([]);

  const handleClick = useCallback(() => {
    setPetals((prev) => [...prev, ...createPetals()]);
  }, []);

  const handlePetalComplete = useCallback((id: number) => {
    setPetals((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <>
      <div className="desktop" style={desktopWrapperStyle}>
        <div style={petPositionStyle}>
          <MotionPet onClick={handleClick} />
        </div>
      </div>

      <AnimatePresence>
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            style={petalStyle}
            initial={{ opacity: 1, y: 0, x: petal.x * 0.3, scale: 0 }}
            animate={{
              opacity: [1, 1, 0],
              y: [0, 60, 150],
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
    </>
  );
}

function MotionPet({ onClick }: { onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={containerStyle}>
      <motion.img
        src="/assets/spring-maltese.svg"
        alt="maltese"
        draggable={false}
        style={petStyle}
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
        onClick={onClick}
      />
    </div>
  );
}

const desktopWrapperStyle: CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '100%',
  maxHeight: 'calc(100vh - 60px)',
  overflow: 'visible',
};

const petPositionStyle: CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  userSelect: 'none',
  cursor: 'pointer',
};

const containerStyle: CSSProperties = {
  position: 'relative',
  width: 'min(500px, 34vw)',
};

const petStyle: CSSProperties = {
  width: 'min(500px, 34vw)',
  height: 'auto',
  objectFit: 'contain',
  userSelect: 'none',
  pointerEvents: 'auto',
  cursor: 'pointer',
  imageRendering: 'pixelated',
};

const petalStyle: CSSProperties = {
  position: 'absolute',
  bottom: '10%',
  right: '15%',
  pointerEvents: 'none',
  zIndex: 1,
};
