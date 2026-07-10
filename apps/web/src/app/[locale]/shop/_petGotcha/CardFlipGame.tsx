'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { cn, GameCard } from '@gitanimals/ui-tailwind';

import { AnimalCardBack } from '@/components/AnimalCard/AnimalCard';
import type { AnimalTierType } from '@/constants/animalTier';
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
    <div className="flex w-full flex-col items-center gap-[1rem]">
      <div className="flex w-full gap-[1rem] mobile:flex-wrap mobile:justify-center mobile:gap-[8px]">
        {cards.map((isCardFlipped, index) => (
          <button
            key={index}
            className="aspect-[109/135] h-auto w-[20%] cursor-pointer [perspective:1000px] mobile:w-[30%]"
            onClick={() => handleCardClick(index)}
          >
            <div
              className="relative h-full w-full text-center transition-transform duration-[0.6s] [transform-style:preserve-3d]"
              style={{
                transform: isCardFlipped ? 'rotateY(180deg)' : 'none',
                animation: selectedCard === index && isShaking ? 'move 0.5s' : 'none',
              }}
            >
              <div
                className={cn(
                  'absolute flex h-full w-full items-center justify-center [backface-visibility:hidden]',
                  selectedCard !== null && 'transition-transform duration-[0.3s] hover:scale-105',
                )}
              >
                <AnimalCardBack tier="S_PLUS" />
              </div>
              <div className="absolute flex h-full w-full items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
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
