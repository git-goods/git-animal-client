'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { css, cx } from '_panda/css';
import { GameCard } from '@gitanimals/ui-panda';

import { AnimalCardBack } from '@/components/AnimalCard/AnimalCard';
import type { AnimalTierType } from '@/components/AnimalCard/AnimalCard.constant';
import { getPersonaImage } from '@/utils/image';

interface CardFlipGameProps {
  getPersona: {
    type: string;
    dropRate: string;
    tier: AnimalTierType;
  } | null;

  onClose: () => void;
  onGetPersona: () => void;
}

const CardFlipGame = ({ onGetPersona, getPersona }: CardFlipGameProps) => {
  const [cards, setCards] = useState(Array(5).fill(false));
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const isShaking = selectedCard !== null && getPersona === null; // 카드가 선택되었지만 페르소나가 선택되지 않았을 때
  const isFlipped = getPersona && selectedCard !== null; // 뽑힌 페르소나가 정해졌을 때

  const handleCardClick = (index: number) => {
    if (selectedCard === null) {
      setSelectedCard(index);
      onGetPersona();
    }
  };

  const onCardFlip = useCallback(() => {
    if (isFlipped) {
      setCards((prevCards) => {
        const newCards = [...prevCards];
        newCards[selectedCard] = true;
        return newCards;
      });
    }
  }, [isFlipped, selectedCard]);

  useEffect(() => {
    onCardFlip();
  }, [onCardFlip]);

  return (
    <div className={containerStyle}>
      <div className={cardContainerStyle}>
        {cards.map((isCardFlipped, index) => (
          <button key={index} className={cardStyle} onClick={() => handleCardClick(index)}>
            <div
              className={cx(
                cardInnerStyle,
                css({
                  transform: isCardFlipped ? 'rotateY(180deg)' : 'none',
                  animation: selectedCard === index && isShaking ? 'move 0.5s' : 'none',
                }),
              )}
            >
              <div className={cx(cardFaceStyle, selectedCard !== null && cardScaleStyle)}>
                <AnimalCardBack tier="S_PLUS" />
              </div>
              <div className={cx(cardFaceStyle, cardBackStyle)}>
                {getPersona && (
                  <GameCard
                    title={getPersona.type}
                    percentage={getPersona.dropRate}
                    tier={getPersona.tier}
                    imageUrl={getPersonaImage(getPersona.type)}
                    size="responsive"
                  />
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CardFlipGame;

const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  width: '100%',
});

const cardContainerStyle = css({
  display: 'flex',
  gap: '1rem',
  width: '100%',

  _mobile: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '8px',
  },
});

const cardStyle = css({
  width: '20%',
  perspective: '1000px',
  cursor: 'pointer',
  height: 'auto',
  aspectRatio: '109/135',

  _mobile: {
    width: '30%',
  },
});

const cardInnerStyle = css({
  position: 'relative',
  width: '100%',
  height: '100%',
  textAlign: 'center',
  transition: 'transform 0.6s',
  transformStyle: 'preserve-3d',
});

const cardFaceStyle = css({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const cardScaleStyle = css({
  transition: 'transform 0.3s',
  _hover: {
    transform: 'scale(1.05)',
  },
});

const cardBackStyle = css({
  transform: 'rotateY(180deg)',
});
