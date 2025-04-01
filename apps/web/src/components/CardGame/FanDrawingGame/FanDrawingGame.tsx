/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import { CardBack as CardBackUi } from '@gitanimals/ui-panda';
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
    const y = (-Math.cos(radians) * radius) / 2; // Flatten the arc a bit

    const rotate = angle / 1.5;

    return { x, y, rotate };
  };
  // Handle card selection
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
      // API 응답 후 선택된 상태로 변경
      setGameState('selected');
    } catch (error) {
      console.error('카드 선택 중 오류 발생:', error);
      // 오류 발생 시 drawing 상태로 되돌림
      setGameState('drawing');
    } finally {
      setIsAnimating(false);
    }
  };

  useEffect(() => {
    startDrawing();
  }, []);

  return (
    <div className={containerStyle}>
      {/* <div className={buttonContainerStyle}> */}
      {/* {gameState === 'ready' && (
          <Button onClick={startDrawing} disabled={isAnimating}>
            카드 뽑기 시작
          </Button>
        )} */}
      {/* {gameState === 'selected' && (
          <Button onClick={startDrawing} disabled={isAnimating}>
            다시 뽑기
          </Button>
        )}

        {(gameState === 'drawing' || gameState === 'selected' || gameState === 'revealing') && (
          <Button onClick={resetGame} disabled={isAnimating} variant="secondary">
            <RotateCcw className="mr-2 h-4 w-4" />
            처음으로
          </Button>
        )} */}
      {/* </div> */}

      <div className={gameAreaStyle}>
        {/* {gameState === 'ready' && <div>ready</div>} */}
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

        {gameState === 'revealing' && selectedCardIndex !== null && (
          <div className={cardContainerStyle}>
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
          <div className={cardContainerStyle}>
            {selectedCards.map((cardId, index) => {
              const isSelected = index === selectedCardIndex;

              const { x, y, rotate } = getFanPosition(index, selectedCards.length);

              if (isSelected && cardData) {
                return (
                  <Portal key={`selected-card-${cardId}`}>
                    <div
                      className={css({
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        bg: 'black.black_50',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(10px)',
                        flexDirection: 'column',
                        gap: '100px',
                        zIndex: 3001, // TODO: overlayStyle 보다 높게, z-index 수정 필요
                      })}
                      onClick={closeGame}
                    >
                      <SelectedCardMotion key={`selected-card-${cardId}`} x={x} y={y} rotate={rotate} index={index}>
                        <DetailedCard cardData={cardData} />
                      </SelectedCardMotion>
                      <p className={noticeMessageStyle}>{t('click-to-close')}</p>
                    </div>
                  </Portal>
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

function DetailedCard({ cardData }: { cardData: { type: string; dropRate: string } }) {
  // cardData가 없으면 기본값 사용
  const getPersona = cardData || {
    tier: 'S_PLUS' as const,
    type: 'SCREAM' as const,
    dropRate: '10%' as const,
  };

  return (
    <div className={detailedCardStyle} style={{ backfaceVisibility: 'hidden' }}>
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
      className={css({
        position: 'absolute',
        zIndex: 10,
        transformStyle: 'preserve-3d',
        cursor: 'pointer',
      })}
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

// 스타일 정의
const containerStyle = css({
  width: '100%',
  mx: 'auto',
});

const gameAreaStyle = css({
  position: 'relative',
  height: '360px',
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
  // width: '280px',
  height: 'auto',
  overflow: 'hidden',
  position: 'relative',
  transformStyle: 'preserve-3d',
  aspectRatio: '220/272',
});

const noticeMessageStyle = css({
  textStyle: 'glyph22.regular',
  color: 'white',
  textAlign: 'center',

  _mobile: {
    textStyle: 'glyph16.regular',
  },
});
