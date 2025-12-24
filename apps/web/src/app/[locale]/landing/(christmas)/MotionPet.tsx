'use client';
import { css } from '_panda/css';
import { motion } from 'framer-motion';

export function MotionPet() {
  return (
    <motion.img
      src="/main/snowman.svg"
      alt="snowman"
      width={100}
      height={100}
      className={css({
        width: 'auto',
        height: '100%',
        objectFit: 'contain',
        userSelect: 'none',
        cursor: 'pointer',
      })}
      whileHover={{ y: [0, -20, 0] }}
      whileTap={{ y: [0, -20, 0] }}
      transition={{
        duration: 0.6,
        ease: 'easeInOut',
      }}
      onClick={() => {
        console.log('clicked');
      }}
    />
  );
}
