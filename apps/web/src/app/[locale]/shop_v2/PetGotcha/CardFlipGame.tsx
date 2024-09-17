'use client';

import React, { useState } from 'react';
import { css, cx } from '_panda/css';
import { Card, CardBack } from '@gitanimals/ui-panda';

import { getPersonaImage } from '@/utils/image';

const tier = 'S_PLUS';
const type = 'MOLE';
const dropRate = '100%';

interface CardFlipGameProps {
  onClose: () => void;
  onAction: () => void;
}

const CardFlipGame = ({ onClose, onAction }: CardFlipGameProps) => {
  const [cards, setCards] = useState(Array(5).fill(false));
  const [showButton, setShowButton] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    if (selectedCard === null) {
      const newCards = [...cards];
      newCards[index] = true;
      setCards(newCards);
      setSelectedCard(index);
      setShowButton(true);
      onAction();
    }
  };

  return (
    <div className={containerStyle}>
      <div className={cardContainerStyle}>
        {cards.map((isFlipped, index) => (
          <button key={index} className={cardStyle} onClick={() => handleCardClick(index)}>
            <div
              className={cx(
                cardInnerStyle,
                css({
                  transform: isFlipped ? 'rotateY(180deg)' : 'none',
                }),
              )}
            >
              <div className={cx(cardFaceStyle, !showButton && cardScaleStyle)}>
                <CardBack tier="S_PLUS" />
              </div>
              <div className={cx(cardFaceStyle, cardBackStyle)}>
                <Card tier={tier} type={type} dropRate={dropRate} personaImage={getPersonaImage(type)} />
              </div>
            </div>
          </button>
        ))}
      </div>
      {/* {showButton && <Button onClick={onClose}>닫기</Button>} */}
      {/* {showButton && <Button onClick={handleFlipAllCards}>모든 카드 뒤집기</Button>} */}
    </div>
  );
};

export default CardFlipGame;

const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
});

const cardContainerStyle = css({
  display: 'flex',
  gap: '1rem',
});

const cardStyle = css({
  width: '220px',
  height: '272px',
  perspective: '1000px',
  cursor: 'pointer',
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
