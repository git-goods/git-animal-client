'use client';

import { useEffect, useState } from 'react';
import { css } from '_panda/css';
import { motion } from 'framer-motion';

export default function GameConsole() {
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
        <svg
          viewBox="0 0 1660 1714"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={svgStyle}
          preserveAspectRatio="xMidYMid meet"
        >
          <rect
            x="151"
            y="10"
            width="1358"
            height="1212"
            fill="url(#paint0_linear_2620_81262)"
            stroke="url(#paint1_linear_2620_81262)"
            strokeWidth="20"
          />
          <path
            d="M17.3404 1474L146.12 1222H1511.94L1643.5 1474H17.3404Z"
            fill="url(#paint2_linear_2620_81262)"
            stroke="url(#paint3_linear_2620_81262)"
            strokeWidth="20"
          />

          {/* Power Button - Interactive */}
          <g onClick={togglePower} style={{ cursor: 'pointer' }}>
            <rect x="673" y="1288" width="140" height="40" fill={isPowered ? '#01BB66' : '#666666'} />
            <rect x="673" y="1328" width="140" height="20" fill={isPowered ? '#00A057' : '#444444'} />
            <rect x="793" y="1288" width="20" height="20" fill={isPowered ? '#7FE18F' : '#888888'} />
            <rect x="673" y="1288" width="20" height="20" fill={isPowered ? '#7FE18F' : '#888888'} />
            <rect x="652" y="1348" width="182" height="40" fill="#1C2923" />
          </g>

          {/* Button 1 - Interactive */}
          <motion.g
            animate={{ y: pressedButtons.button1 ? 5 : 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            onClick={() => handleButtonClick('button1')}
            style={{ cursor: 'pointer' }}
          >
            <rect x="955" y="1288" width="140" height="40" fill="#00D1A7" />
            <rect x="955" y="1328" width="140" height="20" fill="#00B294" />
            <rect x="1075" y="1288" width="20" height="20" fill="#7FE18F" />
            <rect x="955" y="1288" width="20" height="20" fill="#7FE18F" />
          </motion.g>
          <rect x="934" y="1348" width="182" height="40" fill="#1C2923" />

          {/* Button 2 - Interactive */}
          <motion.g
            animate={{ y: pressedButtons.button2 ? 5 : 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            onClick={() => handleButtonClick('button2')}
            style={{ cursor: 'pointer' }}
          >
            <rect x="1237" y="1288" width="140" height="40" fill="#198BE5" />
            <rect x="1237" y="1328" width="140" height="20" fill="#1A77C0" />
            <rect x="1357" y="1288" width="20" height="20" fill="#7FE18F" />
            <rect x="1237" y="1288" width="20" height="20" fill="#7FE18F" />
          </motion.g>
          <rect x="1216" y="1348" width="182" height="40" fill="#1C2923" />

          <foreignObject x="187" y="33" width="1286" height="1148">
            <div className={blurContainerStyle} />
          </foreignObject>

          <path
            data-figma-bg-blur-radius="40"
            d="M237 78H232V83V1131V1136H237H1423H1428V1131V83V78H1423H237Z"
            fill="#6DE575"
            stroke="#A1FFA7"
            strokeWidth="10"
          />

          {/* Screen Background */}
          <path d="M280 121H1380V1086H280V121Z" fill="url(#paint4_linear_2620_81262)" />

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
                <div className={screenTextStyle}>hello</div>
              </motion.div>
            </div>
          </motion.foreignObject>

          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1320 121H1300V141H1320V161H1340V181H1360V201H1380V181V161V141V126V121H1370H1360H1340H1320Z"
            fill="#6EE577"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1320 1086H1300V1066H1320V1046H1340V1026H1360V1006H1380V1026V1046V1066V1081V1086H1370H1360H1340H1320Z"
            fill="#6EE577"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M340 1086H360V1066H340V1046H320V1026H300V1006H280V1026V1046V1066V1081V1086H290H300H320H340Z"
            fill="#6EE577"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M340 121H360V141H340V161H320V181H300V201H280V181V161V141V121H300H320H340Z"
            fill="#6EE577"
          />
          <rect x="1340" y="121" width="20" height="20" fill="#00C448" />
          <rect x="1360" y="141" width="20" height="20" fill="#00C448" />
          <rect width="20" height="20" transform="matrix(1 0 0 -1 1340 1086)" fill="#00C448" />
          <rect width="20" height="20" transform="matrix(1 0 0 -1 1360 1066)" fill="#00C448" />
          <rect x="320" y="1086" width="20" height="20" transform="rotate(180 320 1086)" fill="#00C448" />
          <rect x="300" y="1066" width="20" height="20" transform="rotate(180 300 1066)" fill="#00C448" />
          <rect width="20" height="20" transform="matrix(-1 0 0 1 320 121)" fill="#00C448" />
          <rect width="20" height="20" transform="matrix(-1 0 0 1 300 141)" fill="#00C448" />
          <path
            d="M28 1474H1632C1641.94 1474 1650 1482.06 1650 1492V1704H10V1492C10 1482.06 18.0589 1474 28 1474Z"
            fill="url(#paint5_linear_2620_81262)"
            stroke="#0799D7"
            strokeWidth="20"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1479 0H1499H1507H1519V13V20V40H1499V20H1479V0Z"
            fill="#141517"
          />
          <rect x="1479" y="20" width="20" height="20" fill="#0799D7" />
          <path fillRule="evenodd" clipRule="evenodd" d="M181 0H161H153H141V13V20V40H161V20H181V0Z" fill="#141517" />
          <rect width="20" height="20" transform="matrix(-1 0 0 1 181 20)" fill="#0799D7" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1394 73H1414H1421H1434V86V93V113H1414V93H1394V73Z"
            fill="#0477D9"
          />
          <rect x="1384" y="80" width="10" height="16" fill="#A0FFA7" />
          <rect x="1404" y="100" width="10" height="16" fill="#A0FFA7" />
          <rect x="1384" y="93" width="15" height="10" fill="#A0FFA7" />
          <rect x="1394" y="93" width="20" height="10" fill="#A0FFA7" />
          <rect x="1404" y="113" width="23" height="10" fill="#A0FFA7" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1393 1141H1413H1420H1433V1128V1121V1101H1413V1121H1393V1141Z"
            fill="#51C779"
          />
          <rect width="10" height="16" transform="matrix(1 0 0 -1 1383 1134)" fill="#A0FFA7" />
          <rect width="10" height="16" transform="matrix(1 0 0 -1 1403 1114)" fill="#A0FFA7" />
          <rect width="15" height="10" transform="matrix(1 0 0 -1 1383 1121)" fill="#A0FFA7" />
          <rect width="20" height="10" transform="matrix(1 0 0 -1 1393 1121)" fill="#A0FFA7" />
          <rect width="23" height="10" transform="matrix(1 0 0 -1 1403 1101)" fill="#A0FFA7" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M267 1141H247H240H227V1128V1121V1101H247V1121H267V1141Z"
            fill="#51C779"
          />
          <rect x="277" y="1134" width="10" height="16" transform="rotate(180 277 1134)" fill="#A0FFA7" />
          <rect x="257" y="1114" width="10" height="16" transform="rotate(180 257 1114)" fill="#A0FFA7" />
          <rect x="277" y="1121" width="15" height="10" transform="rotate(180 277 1121)" fill="#A0FFA7" />
          <rect x="267" y="1121" width="20" height="10" transform="rotate(180 267 1121)" fill="#A0FFA7" />
          <rect x="257" y="1101" width="23" height="10" transform="rotate(180 257 1101)" fill="#A0FFA7" />
          <path fillRule="evenodd" clipRule="evenodd" d="M267 73H247H240H227V86V93V113H247V93H267V73Z" fill="#0477D9" />
          <rect width="10" height="16" transform="matrix(-1 0 0 1 277 80)" fill="#A0FFA7" />
          <rect width="10" height="16" transform="matrix(-1 0 0 1 257 100)" fill="#A0FFA7" />
          <rect width="15" height="10" transform="matrix(-1 0 0 1 277 93)" fill="#A0FFA7" />
          <rect width="20" height="10" transform="matrix(-1 0 0 1 267 93)" fill="#A0FFA7" />
          <rect width="23" height="10" transform="matrix(-1 0 0 1 257 113)" fill="#A0FFA7" />
          <rect x="276" y="1348" width="182" height="40" fill="#1C2923" />

          {/* Fixed Joystick Base */}
          <g>
            <rect x="334" y="1264" width="66" height="84" fill="#2F453B" />
            <rect x="368" y="1264" width="32" height="84" fill="#213333" />
          </g>

          {/* Joystick Top Part - Interactive with pivot at bottom */}
          <motion.g
            animate={{ rotate: joystickRotation }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{ originX: 0.5, originY: 1, transformBox: 'fill-box', transformOrigin: '367px 1264px' }}
          >
            <rect x="333.667" y="1064" width="66.6667" height="33.3333" fill="#01BB66" />
            <rect x="333.667" y="1230.67" width="66.6667" height="33.3333" fill="#D8B91E" />
            <rect x="300.333" y="1097.33" width="133.333" height="33.3333" fill="#F8DA43" />
            <rect x="300.333" y="1197.33" width="133.333" height="33.3333" fill="#F8DA43" />
            <rect x="267" y="1130.67" width="200" height="66.6667" fill="#F8DA43" />
            <rect x="400.333" y="1197.33" width="33.3333" height="33.3333" fill="#D8B91E" />
            <rect x="433.667" y="1130.67" width="33.3333" height="66.6667" fill="#D8B91E" />
            <rect x="300.333" y="1097.33" width="33.3333" height="33.3333" fill="#FFED93" />
            <rect x="333.667" y="1064" width="66.6667" height="33.3333" fill="#FFED93" />
            <rect x="267" y="1130.67" width="33.3333" height="66.6667" fill="#FFED93" />
          </motion.g>

          {/* Button 3 - Interactive */}
          <motion.g
            animate={{ y: pressedButtons.button3 ? 5 : 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            onClick={() => handleButtonClick('button3')}
            style={{ cursor: 'pointer' }}
          >
            <rect x="276" y="1348" width="182" height="40" fill="#1C2923" />
          </motion.g>

          <defs>
            <clipPath id="bgblur_0_2620_81262_clip_path" transform="translate(-187 -33)">
              <path d="M237 78H232V83V1131V1136H237H1423H1428V1131V83V78H1423H237Z" />
            </clipPath>
            <linearGradient
              id="paint0_linear_2620_81262"
              x1="830"
              y1="0"
              x2="830"
              y2="1232"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#016EDB" />
              <stop offset="0.555" stopColor="#16B7CD" />
              <stop offset="1" stopColor="#5CCA69" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_2620_81262"
              x1="830"
              y1="0"
              x2="830"
              y2="1232"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#0799D7" />
              <stop offset="1" stopColor="#00C448" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_2620_81262"
              x1="830.5"
              y1="1484"
              x2="830.5"
              y2="1212"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#AFFFB9" />
              <stop offset="0.405" stopColor="#9CF3A8" />
              <stop offset="1" stopColor="#58C96E" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_2620_81262"
              x1="830.5"
              y1="1212"
              x2="830.5"
              y2="1484"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#01C34B" />
              <stop offset="1" stopColor="#0799D7" />
            </linearGradient>
            <linearGradient
              id="paint4_linear_2620_81262"
              x1="830"
              y1="121"
              x2="830"
              y2="1086"
              gradientUnits="userSpaceOnUse"
            >
              <stop />
              <stop offset="0.165" stopColor="#001420" />
              <stop offset="0.365" stopColor="#002943" />
              <stop offset="1" stopColor="#008FE8" />
            </linearGradient>
            <linearGradient
              id="paint5_linear_2620_81262"
              x1="830"
              y1="1464"
              x2="830"
              y2="1714"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#016EDB" />
              <stop offset="0.555" stopColor="#16B7CD" />
              <stop offset="1" stopColor="#5CCA69" />
            </linearGradient>
          </defs>
        </svg>
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
