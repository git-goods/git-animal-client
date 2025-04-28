'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { css } from '_panda/css';

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 3000); // 3초마다 다음 항목으로 전환

    return () => clearInterval(interval);
  }, [data.length]);

  const currentItem = data[currentIndex];

  return (
    <div className={containerStyle}>
      <p style={textStyle}>
        Last Week {currentIndex + 1}ST {currentItem.name}
      </p>
      <Image className={coinStyle} width={32} height={32} src="/shop/coin.webp" alt="coin" />
      <p style={textStyle}>{currentItem.prize}P!</p>
    </div>
  );
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
