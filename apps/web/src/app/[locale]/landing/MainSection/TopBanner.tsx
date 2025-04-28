'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { css } from '_panda/css';
import SplitText from '@gitanimals/ui-panda/src/animation/SplitText/SplitText';
import { motion } from 'framer-motion';

export default function TopBanner() {
  const data = [
    {
      id: '671643895035339143',
      name: 'Frontend-Engineer',
      rank: 0,
      prize: 3000,
      rankType: 'WEEKLY_GUILD_CONTRIBUTIONS',
    },
    {
      id: '669546667782242005',
      name: 'Guild',
      rank: 1,
      prize: 2000,
      rankType: 'WEEKLY_GUILD_CONTRIBUTIONS',
    },
    {
      id: '673540103172091050',
      name: 'JIWOO-HOUSE',
      rank: 2,
      prize: 1000,
      rankType: 'WEEKLY_GUILD_CONTRIBUTIONS',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  //     setAnimateStep('TEXT');
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, [data.length]);

  const currentItem = data[currentIndex];

  const [animateStep, setAnimateStep] = useState<'TEXT' | 'COIN' | 'PRIZE'>('TEXT');

  const onNextText = () => {
    setAnimateStep('TEXT');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  return (
    <div className={containerStyle} key={currentIndex}>
      <SplitText
        style={textStyle}
        text={`Last Week ${currentIndex + 1}ST ${currentItem.name}`}
        onLetterAnimationComplete={() => {
          setAnimateStep('COIN');
        }}
      />
      {animateStep === 'COIN' && (
        <>
          <motion.div
            initial={{ y: 15, opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Image className={coinStyle} width={32} height={32} src="/shop/coin.webp" alt="coin" />
          </motion.div>
          <SplitText
            key={currentIndex}
            style={textStyle}
            text={`${currentItem.prize}P!`}
            onLetterAnimationComplete={() => {
              onNextText();
            }}
          />
        </>
      )}
    </div>
  );
}

function CoinImage({ onNextText }: { onNextText: () => void }) {
  useEffect(() => {
    const interval = setInterval(() => {
      onNextText();
    }, 0);

    return () => clearInterval(interval);
  }, []);

  return;
}

const containerStyle = css({
  background: 'white.white_25',
  color: 'white.white_100',
  padding: '12px 20px',
  borderRadius: '8px',
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  width: '100%',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  textAlign: 'center',
  fontFeatureSettings: 'liga off, clig off',
  fontFamily: 'token(fonts.dosgothic)',
  fontSize: '32px',
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: '120%',
  letterSpacing: '-0.3px',
});

const textStyle = {
  background: 'linear-gradient(116deg, #FFFA8E 31.98%, #62FFE3 98.75%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

const coinStyle = css({
  width: '32px',
  height: '32px',
  ml: '10px',
  mr: '8px',
});
