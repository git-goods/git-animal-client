'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { GameCard, type CardTierType } from '@gitanimals/ui-tailwind';
import { cn } from '@gitanimals/ui-tailwind/utils';

import { AnimalCardBack } from '@/components/AnimalCard/AnimalCard';
import { getPersonaImage } from '@/utils/image';

interface CardFlipGameProps {
  getPersona: {
    type: string;
    dropRate: string;
    tier: CardTierType;
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
    <div className="flex w-full flex-col items-center gap-4">
      <div className="flex w-full gap-4 max-mobile:flex-wrap max-mobile:justify-center max-mobile:gap-2">
        {cards.map((isCardFlipped, index) => (
          <button
            key={index}
            type="button"
            className="aspect-[109/135] h-auto w-1/5 cursor-pointer max-mobile:w-[30%] [perspective:1000px]"
            onClick={() => handleCardClick(index)}
          >
            <div
              className={cn(
                'relative h-full w-full text-center [transform-style:preserve-3d] transition-transform duration-[600ms]',
                selectedCard === index && isShaking && 'animate-[move_0.5s_ease-in-out]',
              )}
              style={{
                transform: isCardFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              <div
                className={cn(
                  'absolute flex h-full w-full items-center justify-center [backface-visibility:hidden]',
                  selectedCard !== null && 'transition-transform duration-300 hover:scale-105',
                )}
              >
                <AnimalCardBack tier="S_PLUS" />
              </div>
              <div className="absolute flex h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)] items-center justify-center">
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
