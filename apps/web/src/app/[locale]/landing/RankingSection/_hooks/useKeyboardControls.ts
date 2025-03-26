'use client';

import { useEffect, useState } from 'react';

export function useKeyboardControls() {
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [isJumping, setIsJumping] = useState(false);
  const [isShooting, setIsShooting] = useState(false);

  useEffect(() => {
    const keys = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
      Space: false,
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'ArrowUp') keys.ArrowUp = true;
      if (e.code === 'ArrowDown') keys.ArrowDown = true;
      if (e.code === 'ArrowLeft') keys.ArrowLeft = true;
      if (e.code === 'ArrowRight') keys.ArrowRight = true;
      if (e.code === 'Space') {
        keys.Space = true;
        setIsJumping(true);
        setIsShooting(true);
      }

      updateDirection();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'ArrowUp') keys.ArrowUp = false;
      if (e.code === 'ArrowDown') keys.ArrowDown = false;
      if (e.code === 'ArrowLeft') keys.ArrowLeft = false;
      if (e.code === 'ArrowRight') keys.ArrowRight = false;
      if (e.code === 'Space') {
        keys.Space = false;
        setIsJumping(false);
        setIsShooting(false);
      }

      updateDirection();
    };

    const updateDirection = () => {
      const x = (keys.ArrowRight ? 1 : 0) - (keys.ArrowLeft ? 1 : 0);
      const y = (keys.ArrowDown ? 1 : 0) - (keys.ArrowUp ? 1 : 0);

      // Normalize for diagonal movement
      if (x !== 0 && y !== 0) {
        const length = Math.sqrt(x * x + y * y);
        setDirection({
          x: x / length,
          y: y / length,
        });
      } else {
        setDirection({ x, y });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return { direction, isJumping, isShooting };
}
