/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@gitanimals/ui-tailwind';
import { CardBack as CardBackUi } from '@gitanimals/ui-tailwind';
import { motion } from 'framer-motion';

import { AnimalCard } from '@/components/AnimalCard';
import { Portal } from '@/components/Portal';

import { DrawingCardMotion, NonSelectedCardMotion, SelectedCardMotion } from './CardMotion';

interface CardDrawingGameProps {
  characters: { id: number }[];
  onSelectCard: (index: number) => Promise<{ type: string; dropRate: string } | undefined>;
  onClose: () => void;
}

export function CardDrawingGame({ characters, onSelectCard, onClose }: CardDrawingGameProps) {
  const t = useTranslations('Gotcha');

  const [gameState, setGameState] = useState<'ready' | 'drawing' | 'selected' | 'revealing'>('ready');
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cardData, setCardData] = useState<{ type: string; dropRate: string } | null>(null);

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

  const closeGame = () => {
    onClose();
    resetGame();
  };

  const getFanPosition = (index: number, total: number) => {
    const radius = 60;
    const totalAngle = 120;
    const startAngle = -60;

    const angle = startAngle + (index / (total - 1)) * totalAngle;

    const radians = (angle * Math.PI) / 180;

    const x = Math.sin(radians) * radius * 2;
    const y = (-Math.cos(radians) * radius) / 2;

    const rotate = angle / 1.5;

    return { x, y, rotate };
  };

  const selectCard = async (index: number) => {
    if (isAnimating || gameState !== 'drawing') return;

    setIsAnimating(true);
    setSelectedCardIndex(index);
    setGameState('revealing');

    try {
      // 카드 선택 시 API 호출 및 결과 대기
      // 이 시간 동안 카드가 흔들리는 애니메이션 표시
      const result = await onSelectCard(index);
      if (!result) {
        throw new Error('카드를 뽑을 수 없습니다.');
      }

      setCardData(result);
      setGameState('selected');
    } catch (error) {
      console.error('카드 선택 중 오류 발생:', error);
      setGameState('drawing');
    } finally {
      setIsAnimating(false);
    }
  };

  useEffect(() => {
    startDrawing();
  }, []);

  return (
    <div className="w-full mx-auto">
      <div className="relative h-[360px] flex items-center justify-center">
        {gameState === 'drawing' && (
          <div className="relative z-0 w-full h-full flex items-center justify-center">
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

        {gameState === 'revealing' && selectedCardIndex !== null && (
          <div className="relative z-0 w-full h-full flex items-center justify-center">
            {selectedCards.map((cardId, index) => {
              const isSelected = index === selectedCardIndex;
              const { x, y, rotate } = getFanPosition(index, selectedCards.length);

              if (isSelected) {
                return (
                  <RevealingCardMotion key={`revealing-card-${cardId}`} x={0} y={0} rotate={0} index={index}>
                    <CardBack />
                  </RevealingCardMotion>
                );
              } else {
                return (
                  <NonSelectedCardMotion key={`nonselected-card-${cardId}`} x={x} y={y} rotate={rotate} index={index}>
                    <CardBack />
                  </NonSelectedCardMotion>
                );
              }
            })}
          </div>
        )}

        {gameState === 'selected' && selectedCardIndex !== null && (
          <div className="relative z-0 w-full h-full flex items-center justify-center">
            {selectedCards.map((cardId, index) => {
              const isSelected = index === selectedCardIndex;
              const { x, y, rotate } = getFanPosition(index, selectedCards.length);

              if (isSelected && cardData) {
                return (
                  <Portal key={`selected-card-${cardId}`}>
                    <div
                      className="fixed top-0 left-0 w-full h-full bg-black-50 flex items-center justify-center backdrop-blur-[10px] flex-col gap-[100px] z-[3001]"
                      onClick={closeGame}
                    >
                      <SelectedCardMotion key={`selected-card-${cardId}`} x={x} y={y} rotate={rotate} index={index}>
                        <DetailedCard cardData={cardData} />
                      </SelectedCardMotion>
                      <p className="font-product text-glyph-22 text-white text-center max-mobile:font-product max-mobile:text-glyph-16">
                        {t('click-to-close')}
                      </p>
                    </div>
                  </Portal>
                );
              } else {
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
    <div className="w-[220px] h-[272px] overflow-hidden" style={{ backfaceVisibility: 'hidden' }}>
      <CardBackUi tier="S_PLUS" />
    </div>
  );
}

function DetailedCard({ cardData }: { cardData: { type: string; dropRate: string } }) {
  // cardData가 없으면 기본값 사용
  const getPersona = cardData || {
    tier: 'S_PLUS' as const,
    type: 'SCREAM' as const,
    dropRate: '10%' as const,
  };

  return (
    <div
      className="h-auto overflow-hidden relative [transform-style:preserve-3d] aspect-[220/272]"
      style={{ backfaceVisibility: 'hidden' }}
    >
      <AnimalCard type={getPersona.type} dropRate={getPersona.dropRate} />
    </div>
  );
}

// RevealingCardMotion 컴포넌트 추가 (카드 흔들림 효과)
function RevealingCardMotion({
  children,
  x,
  y,
  rotate,
}: {
  children: React.ReactNode;
  x: number;
  y: number;
  rotate: number;
  index: number;
}) {
  return (
    <motion.div
      className="absolute z-10 [transform-style:preserve-3d] cursor-pointer"
      initial={{ x, y, rotateZ: rotate }}
      animate={{
        x: [x, x + 5, x - 5, x + 5, x - 5, x],
        y: [y, y - 5, y + 5, y - 5, y + 5, y],
        rotateZ: [rotate, rotate + 2, rotate - 2, rotate + 2, rotate - 2, rotate],
      }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        repeatType: 'reverse',
      }}
    >
      {children}
    </motion.div>
  );
}
