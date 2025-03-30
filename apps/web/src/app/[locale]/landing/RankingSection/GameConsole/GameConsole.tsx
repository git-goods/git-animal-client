'use client';

import { useEffect, useState } from 'react';
import { css } from '_panda/css';
import { AnimatePresence, motion } from 'framer-motion';

import { GameScreen } from './GameScreen';
import { Joystick } from './Joystick';
import { MotionButton } from './MotionButton';
import { PixelNoiseEffect } from './PixelNoiseEffect';
import { GameConsoleSvgContainer } from './SvgContainer';

export default function GameConsole({ children }: { children: React.ReactNode }) {
  const [isPowered, setIsPowered] = useState(false);
  const [joystickRotation, setJoystickRotation] = useState(0);
  const [pressedButtons, setPressedButtons] = useState({
    button1: false,
    button2: false,
    button3: false,
  });

  // Handle keyboard events for joystick
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setJoystickRotation(-20);
        console.log('Joystick moved left');
      } else if (e.key === 'ArrowRight') {
        setJoystickRotation(20);
        console.log('Joystick moved right');
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        setJoystickRotation(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Button click handlers
  const handleButtonClick = (button: 'button1' | 'button2' | 'button3') => {
    setPressedButtons((prev) => ({ ...prev, [button]: true }));
    console.log(`${button} clicked`);

    setTimeout(() => {
      setPressedButtons((prev) => ({ ...prev, [button]: false }));
    }, 150);
  };

  // Power toggle handler
  const togglePower = () => {
    setIsPowered(!isPowered);
    console.log(`Power turned ${!isPowered ? 'on' : 'off'}`);
  };

  return (
    <div className={containerStyle}>
      <div className={svgContainerStyle}>
        <GameConsoleSvgContainer>
          <MotionButton
            isPressed={isPowered}
            handleButtonClick={togglePower}
            startX={673}
            colors={['#01BB66', '#00A057']}
          />

          <MotionButton
            isPressed={pressedButtons.button1}
            handleButtonClick={() => handleButtonClick('button1')}
            startX={955}
            colors={['#00D1A7', '#00B294']}
          />

          <MotionButton
            isPressed={pressedButtons.button2}
            handleButtonClick={() => handleButtonClick('button2')}
            startX={1237}
            colors={['#198BE5', '#1A77C0']}
          />
          <Joystick joystickRotation={joystickRotation} />

          <AnimatePresence>
            <motion.foreignObject
              x="280"
              y="121"
              width="1100"
              height="965"
              initial={false}
              animate={{
                clipPath: isPowered
                  ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                  : 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)',
                transition: {
                  duration: 0.15,
                  ease: 'easeInOut',
                },
              }}
            >
              <div className={screenContainerStyle}>
                <PixelNoiseEffect isPowered={isPowered} />
                <GameScreen isPowered={isPowered}>hello</GameScreen>
              </div>
            </motion.foreignObject>

            {/* Screen Content */}
            <motion.foreignObject
              x="280"
              y="121"
              width="1100"
              height="965"
              initial={false}
              animate={{ transition: { duration: 0.15, ease: 'easeInOut' } }}
            >
              <div className={screenContainerStyle}>{!isPowered && children}</div>
            </motion.foreignObject>
          </AnimatePresence>
        </GameConsoleSvgContainer>
      </div>
    </div>
  );
}

const containerStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  backgroundColor: '#111827',
  overflow: 'hidden',
});

const svgContainerStyle = css({
  width: '100%',
  height: 'auto',
});

const screenContainerStyle = css({
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
});
