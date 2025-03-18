import type { PropsWithChildren } from 'react';
import { css } from '_panda/css';
import { motion } from 'framer-motion';

interface CardMotionProps {
  x: number;
  y: number;
  rotate: number;
  index: number;
}

export function NonSelectedCardMotion({ children, x, y, rotate }: PropsWithChildren<CardMotionProps>) {
  return (
    <motion.div
      initial={{
        opacity: 1,
        scale: 0.9,
        x: x,
        y: y + 50,
        rotate: rotate,
        rotateY: 180,
      }}
      animate={{
        opacity: 0.3,
        scale: 0.7,
        x: x * 1.5,
        y: y * 1.5 + 50,
        rotate: rotate,
        rotateY: 180,
        transition: {
          duration: 0.5,
        },
      }}
      className={cardStyle}
      style={{
        transformStyle: 'preserve-3d',
        transformOrigin: 'center center',
      }}
    >
      {children}
    </motion.div>
  );
}

export function SelectedCardMotion({ children, x, y, rotate }: PropsWithChildren<CardMotionProps>) {
  return (
    <motion.div
      initial={{
        opacity: 1,
        scale: 0.9,
        x: x,
        y: y + 50,
        rotate: rotate,
        rotateY: 180, // Face down initially
      }}
      animate={{
        opacity: 1,
        scale: 1.2,
        x: 0,
        y: 0,
        rotate: 0,
        rotateY: 0, // Face up
        transition: {
          duration: 0.8,
          type: 'spring',
          stiffness: 70,
        },
      }}
      className={selectedCardStyle}
      style={{
        transformStyle: 'preserve-3d',
        transformOrigin: 'center center',
        zIndex: 50,
      }}
    >
      {children}
    </motion.div>
  );
}

const selectedCardStyle = css({
  position: 'absolute',
});

export function DrawingCardMotion({
  children,
  x,
  y,
  rotate,
  index,
  onClick,
}: PropsWithChildren<CardMotionProps & { index: number; onClick: () => void }>) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.6,
        x: 0,
        y: 0,
        rotate: 0,
        rotateY: 0,
      }}
      animate={{
        opacity: 1,
        scale: 0.9,
        x: x,
        y: y + 50, // Adjust vertical position
        rotate: rotate,
        // rotateY: 180, // Face down
        transition: {
          duration: 0.7,
          type: 'spring',
          stiffness: 70,
          delay: index * 0.1,
        },
      }}
      className={cardStyle}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
        transformOrigin: 'center center',
      }}
      whileHover={{
        y: y + 30, // Lift card slightly on hover
        scale: 0.95,
        transition: { duration: 0.2 },
      }}
    >
      {children}
    </motion.div>
  );
}

const cardStyle = css({
  position: 'absolute',
  cursor: 'pointer',
});
