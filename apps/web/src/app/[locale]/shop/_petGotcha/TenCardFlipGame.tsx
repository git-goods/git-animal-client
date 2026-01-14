import React, { useEffect, useState } from 'react';
import type { GotchaResult } from '@gitanimals/api';
import { cn } from '@gitanimals/ui-tailwind/utils';
import { motion } from 'framer-motion';

import { AnimalCard } from '@/components/AnimalCard';
import { AnimalCardBack } from '@/components/AnimalCard/AnimalCard';

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
        <div className={cn(cardFaceStyle, cardBackFaceStyle)}>
          {persona && <AnimalCard type={persona.name} dropRate={persona.dropRate} />}
        </div>
        <div className={cn(cardFaceStyle, cardFrontFaceStyle)}>
          <AnimalCardBack tier="S_PLUS" />
        </div>
      </motion.div>
    </button>
  );
};

const cardStyle = cn(
  'relative cursor-pointer w-[20%] aspect-[109/135] h-auto',
  '[perspective:1000px]',
  'max-mobile:w-[30%]'
);

const cardInnerStyle = cn(
  'w-full h-full relative',
  '[transform-style:preserve-3d]'
);

const cardFaceStyle = cn(
  'absolute w-full h-full rounded-xl',
  'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]'
);

const cardFrontFaceStyle = cn('[backface-visibility:hidden]');
const cardBackFaceStyle = cn('[backface-visibility:hidden] [transform:rotateY(180deg)]');

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

const gameContainerStyle = cn('w-full');

const cardGridStyle = cn('flex flex-col gap-6');

const rowStyle = cn(
  'grid grid-rows-2 gap-3',
  'max-mobile:w-full max-mobile:gap-2 max-mobile:flex max-mobile:flex-wrap max-mobile:justify-center max-mobile:items-center'
);

const cardRowStyle = cn(
  'flex gap-3 justify-center',
  'max-mobile:w-full max-mobile:flex max-mobile:flex-wrap max-mobile:justify-center max-mobile:items-center'
);
