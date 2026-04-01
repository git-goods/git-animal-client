'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { cn } from '@gitanimals/ui-tailwind';
import { GameCard } from '@gitanimals/ui-tailwind';

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
              className={cn(
                cardInnerStyle,
                isCardFlipped ? '[transform:rotateY(180deg)]' : '',
                selectedCard === index && isShaking ? 'animate-move' : ''
              )}
            >
              <div className={cn(cardFaceStyle, selectedCard !== null && cardScaleStyle)}>
                <AnimalCardBack tier="S_PLUS" />
              </div>
              <div className={cn(cardFaceStyle, cardBackStyle)}>
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

const containerStyle = cn(
  'flex flex-col items-center gap-4 w-full'
);

const cardContainerStyle = cn(
  'flex gap-4 w-full',
  'max-mobile:flex-wrap max-mobile:justify-center max-mobile:gap-2'
);

const cardStyle = cn(
  'w-[20%] cursor-pointer h-auto aspect-[109/135]',
  '[perspective:1000px]',
  'max-mobile:w-[30%]'
);

const cardInnerStyle = cn(
  'relative w-full h-full text-center',
  'transition-transform duration-[600ms]',
  '[transform-style:preserve-3d]'
);

const cardFaceStyle = cn(
  'absolute w-full h-full',
  '[backface-visibility:hidden]',
  'flex items-center justify-center'
);

const cardScaleStyle = cn(
  'transition-transform duration-300',
  'hover:scale-105'
);

const cardBackStyle = cn(
  '[transform:rotateY(180deg)]'
);
