import { useState } from 'react';
import { css } from '_panda/css';
import { motion } from 'framer-motion';

export function MobileGameConsole() {
  const [isPressed, setIsPressed] = useState({
    button1: false,
    button2: false,
    button3: false,
  });

  const handleButtonClick = (button: 'button1' | 'button2' | 'button3') => {
    setIsPressed((prev) => ({ ...prev, [button]: !prev[button] }));
  };

  return (
    <div className={containerStyle}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 375 113"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect y="32.5283" width="375" height="80" fill="url(#paint0_linear_6599_419437)" />
        <rect x="47.3477" y="74.6045" width="47.4712" height="10.4332" fill="#1C2923" />
        <rect x="62.3887" y="0.52832" width="17.3887" height="8.69437" fill="#01BB66" />
        <rect x="62.3887" y="44" width="17.3887" height="8.69437" fill="#D8B91E" />
        <rect x="62.4766" y="52.6943" width="17.2148" height="21.9098" fill="#2F453B" />
        <rect x="71.3438" y="52.6943" width="8.34659" height="21.9098" fill="#213333" />
        <rect x="53.6953" y="9.22266" width="34.7775" height="8.69437" fill="#F8DA43" />
        <rect x="53.6953" y="35.3057" width="34.7775" height="8.69437" fill="#F8DA43" />
        <rect x="45" y="17.917" width="52.1662" height="17.3887" fill="#F8DA43" />
        <rect x="79.7773" y="35.3057" width="8.69437" height="8.69437" fill="#D8B91E" />
        <rect x="88.4727" y="17.917" width="8.69437" height="17.3887" fill="#D8B91E" />
        <rect x="53.6953" y="9.22266" width="8.69437" height="8.69437" fill="#FFED93" />
        <rect x="62.3887" y="0.52832" width="17.3887" height="8.69437" fill="#FFED93" />
        <rect x="45" y="17.917" width="8.69437" height="17.3887" fill="#FFED93" />

        <motion.g
          animate={{ y: isPressed.button1 ? 5 : 0 }}
          transition={{ type: 'spring', stiffness: 500 }}
          onClick={() => handleButtonClick('button1')}
          style={{ cursor: 'pointer' }}
        >
          <rect x="150.896" y="69.9619" width="36.5163" height="8.21662" fill="#00A057" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M156.113 59.5283H182.197V64.7449H187.413V69.9616H150.896V64.7449H156.113V59.5283Z"
            fill="#01BB66"
          />
        </motion.g>
        <rect x="145.42" y="75.1787" width="47.4712" height="10.4332" fill="#1C2923" />

        <motion.g
          animate={{ y: isPressed.button2 ? 5 : 0 }}
          transition={{ type: 'spring', stiffness: 500 }}
          onClick={() => handleButtonClick('button2')}
          style={{ cursor: 'pointer' }}
        >
          <rect x="224.451" y="69.9619" width="36.5163" height="8.21662" fill="#00B294" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M229.668 59.5283H255.751V64.7449H260.968V69.9616H224.451V64.7449H229.668V59.5283Z"
            fill="#00D1A7"
          />
        </motion.g>
        <rect x="218.975" y="75.1787" width="47.4712" height="10.4332" fill="#1C2923" />

        <motion.g
          animate={{ y: isPressed.button3 ? 5 : 0 }}
          transition={{ type: 'spring', stiffness: 500 }}
          onClick={() => handleButtonClick('button3')}
          style={{ cursor: 'pointer' }}
        >
          <rect x="298.006" y="69.9619" width="36.5163" height="8.21662" fill="#1A77C0" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M303.222 59.5283H329.306V64.7449H334.522V69.9616H298.006V64.7449H303.222V59.5283Z"
            fill="#198BE5"
          />
        </motion.g>
        <rect x="292.529" y="75.1787" width="47.4712" height="10.4332" fill="#1C2923" />

        <defs>
          <linearGradient
            id="paint0_linear_6599_419437"
            x1="187.5"
            y1="112.528"
            x2="187.5"
            y2="32.5283"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#58C96E" />
            <stop offset="0.595" stop-color="#9CF3A8" />
            <stop offset="1" stop-color="#AFFFB9" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

const containerStyle = css({
  width: '100vw',
  transform: 'translateX(-16px)',
  height: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
