'use client';

import { useEffect, useState } from 'react';
import { css } from '_panda/css';
import { motion } from 'framer-motion';

import { MotionButton } from './MotionButton';
import { GameConsoleSvgContainer } from './SvgContainer';

export default function GameConsole({ children }: { children: React.ReactNode }) {
  const [isPowered, setIsPowered] = useState(true);
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
        <GameConsoleSvgContainer joystickRotation={joystickRotation}>
          {/* Power Button - Interactive */}
          <MotionButton
            isPressed={isPowered}
            handleButtonClick={togglePower}
            startX={673}
            colors={['#01BB66', '#00A057']}
          />

          {/* Button 1 - Interactive */}
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

          {/* Screen Content with Retro TV Animation */}
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
              {/* Pixel noise effect for turning on/off */}
              <motion.div
                className={noiseContainerStyle}
                initial={false}
                animate={{
                  opacity: isPowered ? [1, 0] : [0, 1, 0],
                }}
                transition={{
                  duration: 0.2,
                  times: isPowered ? [0, 1] : [0, 0.5, 1],
                }}
              >
                <div className={noiseGridStyle}>
                  {Array.from({ length: 144 }).map((_, i) => (
                    <div
                      key={i}
                      className={noiseCellStyle}
                      style={{
                        opacity: Math.random() * 0.5,
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Screen Content */}
              <motion.div
                className={screenContentStyle}
                initial={false}
                animate={{
                  opacity: isPowered ? 1 : 0,
                }}
                transition={{ duration: 0.1, delay: isPowered ? 0.1 : 0 }}
              >
                <div className={screenTextStyle}>{children}</div>
              </motion.div>
            </div>
          </motion.foreignObject>
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

const svgStyle = css({
  width: '100%',
  height: 'auto',
});

const screenContainerStyle = css({
  width: '100%',
  height: '100%',
  backgroundColor: '#000000',
  position: 'relative',
  overflow: 'hidden',
});

const noiseContainerStyle = css({
  position: 'absolute',
  inset: 0,
  zIndex: 10,
});

const noiseGridStyle = css({
  width: '100%',
  height: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gridTemplateRows: 'repeat(12, 1fr)',
});

const noiseCellStyle = css({
  backgroundColor: '#4ADE80',
});

const screenContentStyle = css({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#000000',
});

const screenTextStyle = css({
  color: '#4ADE80',
  fontFamily: 'monospace',
  fontSize: '36px',
  '@media (min-width: 640px)': {
    fontSize: '48px',
  },
  '@media (min-width: 768px)': {
    fontSize: '60px',
  },
  '@media (min-width: 1024px)': {
    fontSize: '72px',
  },
  '@media (min-width: 1280px)': {
    fontSize: '96px',
  },
  letterSpacing: '2px',
});

const blurContainerStyle = css({
  backdropFilter: 'blur(20px)',
  clipPath: 'url(#bgblur_0_2620_81262_clip_path)',
  height: '100%',
  width: '100%',
});
