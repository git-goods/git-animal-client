/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import { CardBack as CardBackUi } from '@gitanimals/ui-panda';

import { AnimalCard } from '@/components/AnimalCard';
import { Portal } from '@/components/Portal';

import { RitualCircle } from './RitualCircle';
import {
  ConvergeMotion,
  MergedCardMotion,
  ResultCardMotion,
  ShatterMotion,
  ShockwaveRing,
  SummonCardMotion,
} from './SummonMotion';

type GameState = 'ready' | 'drawing' | 'revealing' | 'selected';

interface CardDrawingGameProps {
  characters: { id: number }[];
  onSelectCard: (index: number) => Promise<{ type: string; dropRate: string } | undefined>;
  onClose: () => void;
}

const CIRCLE_RADIUS_DESKTOP = 140;
const CIRCLE_RADIUS_MOBILE = 90;

function getCirclePosition(index: number, total: number, radius: number) {
  const angle = (index * 360) / total - 90; // start from top
  const rad = (angle * Math.PI) / 180;
  return {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius,
  };
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

export function CardDrawingGame({ characters, onSelectCard, onClose }: CardDrawingGameProps) {
  const t = useTranslations('Gotcha');
  const isMobile = useIsMobile();

  const [gameState, setGameState] = useState<GameState>('ready');
  const [isAnimating, setIsAnimating] = useState(false);
  const [cardData, setCardData] = useState<{ type: string; dropRate: string } | null>(null);
  const [shatterDone, setShatterDone] = useState(false);

  const radius = isMobile ? CIRCLE_RADIUS_MOBILE : CIRCLE_RADIUS_DESKTOP;

  const positions = useMemo(
    () => characters.map((_, i) => getCirclePosition(i, characters.length, radius)),
    [characters, radius],
  );

  // Auto-start drawing on mount
  useEffect(() => {
    const timer = setTimeout(() => setGameState('drawing'), 600);
    return () => clearTimeout(timer);
  }, []);

  const selectCard = useCallback(
    async (index: number) => {
      if (isAnimating || gameState !== 'drawing') return;

      setIsAnimating(true);
      setGameState('revealing');

      try {
        const result = await onSelectCard(index);
        if (!result) {
          throw new Error('Failed to draw card');
        }

        setCardData(result);

        // Brief pause for converge animation, then shatter
        setTimeout(() => {
          setGameState('selected');
        }, 800);
      } catch (error) {
        console.error('Card selection error:', error);
        setGameState('drawing');
      } finally {
        setIsAnimating(false);
      }
    },
    [isAnimating, gameState, onSelectCard],
  );

  const closeGame = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <div className={containerStyle}>
      <div className={gameAreaStyle}>
        <RitualCircle accelerate={gameState === 'revealing'} />

        {/* Drawing: cards appear on circle points */}
        {gameState === 'drawing' &&
          characters.map((char, index) => (
            <SummonCardMotion
              key={`summon-${char.id}`}
              x={positions[index].x}
              y={positions[index].y}
              index={index}
              onClick={() => selectCard(index)}
            >
              <CardBack />
            </SummonCardMotion>
          ))}

        {/* Revealing: all cards converge to center */}
        {gameState === 'revealing' && (
          <>
            {characters.map((char, index) => (
              <ConvergeMotion key={`converge-${char.id}`} x={positions[index].x} y={positions[index].y} index={index}>
                <CardBack />
              </ConvergeMotion>
            ))}
            <MergedCardMotion>
              <CardBack />
            </MergedCardMotion>
          </>
        )}

        {/* Selected: shatter + result */}
        {gameState === 'selected' && cardData && (
          <>
            {!shatterDone && (
              <ShatterMotion onComplete={() => setShatterDone(true)}>
                <CardBack />
              </ShatterMotion>
            )}

            <Portal>
              <div className={overlayStyle} onClick={closeGame}>
                <ShockwaveRing />
                <ResultCardMotion>
                  <DetailedCard cardData={cardData} />
                </ResultCardMotion>
                <p className={noticeMessageStyle}>{t('click-to-close')}</p>
              </div>
            </Portal>
          </>
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
  return (
    <div className={detailedCardStyle} style={{ backfaceVisibility: 'hidden' }}>
      <AnimalCard type={cardData.type} dropRate={cardData.dropRate} />
    </div>
  );
}

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

const overlayStyle = css({
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
  zIndex: 3001,
});

const cardBackStyle = css({
  width: '220px',
  height: '272px',
  overflow: 'hidden',
  _mobile: {
    width: '140px',
    height: '173px',
  },
});

const detailedCardStyle = css({
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
