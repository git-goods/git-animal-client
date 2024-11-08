import React, { useEffect, useState } from 'react';
import { css, cx } from '_panda/css';
import type { GotchaResult } from '@gitanimals/api';
import { CardBack } from '@gitanimals/ui-panda';
import { motion } from 'framer-motion';

import { AnimalCard } from '@/components/AnimalCard';

const Card = ({
  onClick,
  persona,
  isFlipped,
}: {
  onClick: () => void;
  persona: GotchaResult | null;
  isFlipped: boolean;
}) => {
  return (
    <button className={cardStyle} onClick={onClick}>
      <motion.div
        className={cardInnerStyle}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <div className={cx(cardFaceStyle, cardBackFaceStyle)}>
          {persona && <AnimalCard type={persona.name} dropRate={persona.ratio} />}
        </div>
        <div className={cx(cardFaceStyle, cardFrontFaceStyle)}>
          <CardBack tier="S_PLUS" />
        </div>
      </motion.div>
    </button>
  );
};

const cardStyle = css({
  position: 'relative',
  cursor: 'pointer',
  width: '220px',
  height: '272px',
  perspective: '1000px',
});

const cardInnerStyle = css({
  width: '100%',
  height: '100%',
  position: 'relative',
  transformStyle: 'preserve-3d',
});

const cardFaceStyle = css({
  position: 'absolute',
  width: '100%',
  height: '100%',
  borderRadius: 'xl',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
});

const cardFrontFaceStyle = css({ backfaceVisibility: 'hidden' });
const cardBackFaceStyle = css({ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' });

export const TenCardFlipGame = ({
  onGetPersona,
  getPersona,
}: {
  onGetPersona: () => void;
  getPersona: GotchaResult[] | null;
}) => {
  const [flippedCards, setFlippedCards] = useState(Array(10).fill(false));
  const [isAnimating, setIsAnimating] = useState(false);

  // 모든 카드 순차적으로 뒤집기
  const handleFlipAll = async () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // 현재 상태 확인 (하나라도 뒤집혀있으면 모두 원래대로, 아니면 모두 뒤집기)

    // 순차적으로 뒤집기
    for (let i = 0; i < 10; i++) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      setFlippedCards((prev) => {
        const newState = [...prev];
        newState[i] = true;
        return newState;
      });
    }
    setTimeout(() => setIsAnimating(false), 200);
  };

  const onCardClick = () => {
    onGetPersona();
  };

  useEffect(() => {
    if (getPersona) {
      handleFlipAll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getPersona]);

  return (
    <>
      <div className={gameContainerStyle}>
        <div className={cardGridStyle}>
          <div className={rowStyle}>
            <div className={cardRowStyle}>
              {[0, 1, 2, 3, 4].map((index) => (
                <Card
                  key={index}
                  isFlipped={flippedCards[index]}
                  onClick={() => onCardClick()}
                  persona={getPersona ? getPersona[index] : null}
                />
              ))}
            </div>
            {/* 하단 행 */}
            <div className={cardRowStyle}>
              {[5, 6, 7, 8, 9].map((index) => (
                <Card
                  key={index}
                  isFlipped={flippedCards[index]}
                  onClick={() => onCardClick()}
                  persona={getPersona ? getPersona[index] : null}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const gameContainerStyle = css({
  width: '100%',
});

const cardGridStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '6',
});

const rowStyle = css({
  display: 'grid',
  gridTemplateRows: '2',
  gap: '12px',
});

const cardRowStyle = css({
  display: 'flex',
  gap: '12px',
  justifyContent: 'center',
});
