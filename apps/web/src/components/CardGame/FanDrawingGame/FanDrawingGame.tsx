'use client';

import { useState } from 'react';
import { css } from '_panda/css';
import { flex } from '_panda/patterns';
import { Button, Card } from '@gitanimals/ui-panda';
import { CardBack as CardBackUi } from '@gitanimals/ui-panda';
import { RotateCcw } from 'lucide-react';

import { getPersonaImage } from '@/utils/image';

import { DrawingCardMotion, NonSelectedCardMotion, SelectedCardMotion } from './CardMotion';

const characters = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }];

export function CardDrawingGame() {
  const [gameState, setGameState] = useState<'ready' | 'drawing' | 'selected'>('ready');
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const startDrawing = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setGameState('drawing');

    const allCardIds = characters.map((char) => char.id);

    setSelectedCards(allCardIds);
    setSelectedCardIndex(null);

    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  const resetGame = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setGameState('ready');
    setSelectedCards([]);
    setSelectedCardIndex(null);

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const getFanPosition = (index: number, total: number) => {
    const radius = 40;
    const totalAngle = 80;
    const startAngle = -40;

    const angle = startAngle + (index / (total - 1)) * totalAngle;

    const radians = (angle * Math.PI) / 180;

    const x = Math.sin(radians) * radius * 2;
    const y = (-Math.cos(radians) * radius) / 2; // Flatten the arc a bit

    const rotate = angle / 1.5;

    return { x, y, rotate };
  };
  // Handle card selection
  const selectCard = (index: number) => {
    if (isAnimating || gameState !== 'drawing') return;

    setIsAnimating(true);
    setSelectedCardIndex(index);
    setGameState('selected');

    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <div className={containerStyle}>
      <div className={buttonContainerStyle}>
        {gameState === 'ready' && (
          <Button onClick={startDrawing} disabled={isAnimating}>
            카드 뽑기 시작
          </Button>
        )}

        {gameState === 'selected' && (
          <Button onClick={startDrawing} disabled={isAnimating}>
            다시 뽑기
          </Button>
        )}

        {(gameState === 'drawing' || gameState === 'selected') && (
          <Button onClick={resetGame} disabled={isAnimating} variant="secondary">
            <RotateCcw className="mr-2 h-4 w-4" />
            처음으로
          </Button>
        )}
      </div>

      <div className={gameAreaStyle}>
        {gameState === 'ready' && <div>ready</div>}

        {gameState === 'drawing' && (
          <div className={cardContainerStyle}>
            {selectedCards.map((cardId, index) => {
              const { x, y, rotate } = getFanPosition(index, selectedCards.length);

              return (
                <DrawingCardMotion
                  key={`card-${cardId}-${index}`}
                  x={x}
                  y={y}
                  rotate={rotate}
                  index={index}
                  onClick={() => selectCard(index)}
                >
                  <CardBack />
                </DrawingCardMotion>
              );
            })}
          </div>
        )}

        {gameState === 'selected' && selectedCardIndex !== null && (
          <div className={cardContainerStyle}>
            {selectedCards.map((cardId, index) => {
              const isSelected = index === selectedCardIndex;

              const { x, y, rotate } = getFanPosition(index, selectedCards.length);

              if (isSelected) {
                return (
                  <SelectedCardMotion key={`selected-card-${cardId}`} x={x} y={y} rotate={rotate} index={index}>
                    <DetailedCard />
                  </SelectedCardMotion>
                );
              } else {
                // Non-selected cards fade out
                return (
                  <NonSelectedCardMotion key={`nonselected-card-${cardId}`} x={x} y={y} rotate={rotate} index={index}>
                    <CardBack />
                  </NonSelectedCardMotion>
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function CardBack() {
  return (
    <div className={cardBackStyle} style={{ backfaceVisibility: 'hidden' }}>
      <CardBackUi tier="S_PLUS" />
    </div>
  );
}

function DetailedCard() {
  const getPersona = {
    tier: 'S_PLUS' as const,
    type: 'SCREAM' as const,
    dropRate: '10%' as const,
  };
  return (
    <div className={detailedCardStyle} style={{ backfaceVisibility: 'hidden' }}>
      <Card
        tier={getPersona.tier}
        type={getPersona.type}
        dropRate={getPersona.dropRate}
        personaImage={getPersonaImage(getPersona.type)}
      />
    </div>
  );
}

// 스타일 정의
const containerStyle = css({
  width: '100%',
  mx: 'auto',
});

const buttonContainerStyle = flex({
  justifyContent: 'center',
  gap: 4,
  mb: 8,
});

const gameAreaStyle = css({
  position: 'relative',
  height: '600px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const cardContainerStyle = css({
  position: 'relative',
  zIndex: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const cardBackStyle = css({
  width: '220px',
  height: '272px',
  overflow: 'hidden',
});

const detailedCardStyle = css({
  width: '280px',
  height: 'auto',
  overflow: 'hidden',
  position: 'relative',
  transformStyle: 'preserve-3d',
  aspectRatio: '220/272',
});
