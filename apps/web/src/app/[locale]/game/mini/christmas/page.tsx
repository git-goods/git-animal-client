'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { css } from '_panda/css';
import { Button } from '@gitanimals/ui-panda';
import { AnimatePresence, motion } from 'framer-motion';

type ChristmasIcon = {
  id: string;
  type: string;
  emoji: string;
  matchId: string;
};

type GameCard = ChristmasIcon & {
  isFlipped: boolean;
  isMatched: boolean;
};

const CHRISTMAS_ICONS: Omit<ChristmasIcon, 'id' | 'matchId'>[] = [
  { type: 'SANTA', emoji: '🎅' },
  { type: 'TREE', emoji: '🎄' },
  { type: 'GIFT', emoji: '🎁' },
  { type: 'SNOWFLAKE', emoji: '❄️' },
  { type: 'REINDEER', emoji: '🦌' },
  { type: 'BELL', emoji: '🔔' },
  { type: 'STOCKING', emoji: '🧦' },
  { type: 'SNOWMAN', emoji: '⛄' },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateCards(): GameCard[] {
  const selectedIcons = shuffleArray(CHRISTMAS_ICONS).slice(0, 6); // 6 pairs = 12 cards
  const cards: GameCard[] = [];

  selectedIcons.forEach((icon, index) => {
    const matchId = `match-${index}`;
    cards.push(
      {
        ...icon,
        id: `${matchId}-1`,
        matchId,
        isFlipped: false,
        isMatched: false,
      },
      {
        ...icon,
        id: `${matchId}-2`,
        matchId,
        isFlipped: false,
        isMatched: false,
      },
    );
  });

  return shuffleArray(cards);
}

export default function ChristmasMemoryPage() {
  const router = useRouter();
  const [cards, setCards] = useState<GameCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [first, second] = selectedCards;
      const firstCard = cards.find((c) => c.id === first);
      const secondCard = cards.find((c) => c.id === second);

      if (firstCard && secondCard) {
        setMoves((prev) => prev + 1);

        if (firstCard.matchId === secondCard.matchId) {
          setTimeout(() => {
            setCards((prev) =>
              prev.map((card) => (card.matchId === firstCard.matchId ? { ...card, isMatched: true } : card)),
            );
            setMatches((prev) => prev + 1);
            setSelectedCards([]);
          }, 600);
        } else {
          setTimeout(() => {
            setCards((prev) =>
              prev.map((card) => (card.id === first || card.id === second ? { ...card, isFlipped: false } : card)),
            );
            setSelectedCards([]);
          }, 1000);
        }
      }
    }
  }, [selectedCards, cards]);

  useEffect(() => {
    if (matches === 6 && gameStarted) {
      setGameCompleted(true);
    }
  }, [matches, gameStarted]);

  const handleCardClick = useCallback(
    (cardId: string) => {
      if (selectedCards.length >= 2) return;

      const card = cards.find((c) => c.id === cardId);
      if (!card || card.isFlipped || card.isMatched) return;

      setCards((prev) => prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c)));
      setSelectedCards((prev) => [...prev, cardId]);
    },
    [cards, selectedCards],
  );

  const startGame = useCallback(() => {
    setCards(generateCards());
    setSelectedCards([]);
    setMoves(0);
    setMatches(0);
    setGameStarted(true);
    setGameCompleted(false);
  }, []);

  return (
    <div
      className={css({
        minHeight: '100vh',
        maxWidth: '600px',
        width: '100%',
        margin: '0 auto',
        padding: '8px',
        background: 'linear-gradient(to bottom, #2D1B14 0%, #8B4513 100%)',
        fontFamily: 'monospace', // Pixel-style font fallback
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
      })}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={css({
          minHeight: '60px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '8px',
          background: 'rgba(139, 69, 19, 0.3)',
          borderRadius: '8px',
          border: '2px solid #FFD700',
          textShadow: '2px 2px 0px #1A0F0A',
          padding: '8px',
        })}
      >
        <h1
          className={css({
            fontSize: { base: '18px', sm: '20px' },
            fontWeight: 'bold',
            color: '#FFFFFF',
            marginBottom: '4px',
            textAlign: 'center',
            lineHeight: '1.1',
          })}
        >
          🎄 Christmas Memory 🎄
        </h1>
        {gameStarted && (
          <div
            className={css({
              fontSize: '12px',
              color: '#FFD700',
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
            })}
          >
            <span>Moves: {moves}</span>
            <span>Matches: {matches}/6</span>
          </div>
        )}
      </motion.div>

      {/* Start Game Button */}
      {!gameStarted && !gameCompleted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={css({
            textAlign: 'center',
            marginBottom: '12px',
            flex: 'none',
          })}
        >
          <Button
            onClick={startGame}
            className={css({
              minHeight: '44px',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: 'bold',
              background: '#C41E3A',
              color: '#FFFFFF',
              border: '3px solid #FFD700',
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: 'monospace',
              textShadow: '1px 1px 0px #1A0F0A',
              boxShadow: '0 4px 8px rgba(26, 15, 10, 0.4)',
              transition: 'all 0.2s ease',
              '&:hover': {
                brightness: '1.1',
                transform: 'translateY(-2px)',
              },
              '&:active': {
                transform: 'translateY(1px)',
                boxShadow: '0 2px 4px rgba(26, 15, 10, 0.4)',
              },
            })}
          >
            🎮 Start Game 🎮
          </Button>
        </motion.div>
      )}

      {/* Game Grid */}
      {gameStarted && !gameCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={css({
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: { base: '6px', sm: '8px' },
            padding: '0',
            flex: '1',
            alignContent: 'center',
            justifyContent: 'center',
          })}
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, rotateY: 0 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ delay: index * 0.05 }}
              className={css({
                position: 'relative',
                aspectRatio: '200/272',
                cursor: card.isMatched ? 'default' : 'pointer',
                perspective: '1000px',
              })}
              onClick={() => !card.isMatched && handleCardClick(card.id)}
              whileHover={!card.isMatched ? { scale: 1.05 } : {}}
              whileTap={!card.isMatched ? { scale: 0.95 } : {}}
            >
              {/* Card Container */}
              <div
                className={css({
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.5s ease-in-out',
                  transform: card.isFlipped || card.isMatched ? 'rotateY(180deg)' : 'rotateY(0deg)',
                })}
              >
                {/* Card Back */}
                <div
                  className={css({
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    background: '#C41E3A',
                    border: '2px solid #FFD700',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: { base: '24px', sm: '28px' },
                    boxShadow: '0 2px 6px rgba(26, 15, 10, 0.3)',
                  })}
                >
                  ❄️
                </div>

                {/* Card Front */}
                <div
                  className={css({
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    background: card.isMatched ? '#228B22' : '#FFF8DC',
                    border: '2px solid #FFD700',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: { base: '36px', sm: '42px' },
                    boxShadow: '0 2px 6px rgba(26, 15, 10, 0.3)',
                    brightness: card.isMatched ? '1.2' : '1',
                    transition: 'brightness 0.3s ease',
                  })}
                >
                  {card.emoji}
                </div>
              </div>

              {/* Match Effect */}
              <AnimatePresence>
                {card.isMatched && (
                  <motion.div
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0, 1, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className={css({
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      pointerEvents: 'none',
                      zIndex: 10,
                    })}
                  >
                    ✨
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Game Completed */}
      {gameCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={css({
            textAlign: 'center',
            padding: '32px',
            background: 'rgba(139, 69, 19, 0.5)',
            border: '3px solid #FFD700',
            borderRadius: '12px',
            boxShadow: '0 8px 16px rgba(26, 15, 10, 0.4)',
          })}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className={css({ fontSize: '64px', marginBottom: '16px' })}
          >
            🎉
          </motion.div>

          <h2
            className={css({
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#FFD700',
              marginBottom: '16px',
              textShadow: '2px 2px 0px #1A0F0A',
            })}
          >
            Merry Christmas! 🎄
          </h2>

          <p
            className={css({
              fontSize: '18px',
              color: '#FFF8DC',
              marginBottom: '8px',
            })}
          >
            You completed the game in <span className={css({ color: '#FFD700', fontWeight: 'bold' })}>{moves}</span> moves!
          </p>

          <div
            className={css({
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              marginTop: '24px',
            })}
          >
            <Button
              onClick={startGame}
              className={css({
                minHeight: '44px',
                padding: '10px 18px',
                fontSize: '14px',
                fontWeight: 'bold',
                background: '#C41E3A',
                color: '#FFFFFF',
                border: '2px solid #FFD700',
                borderRadius: '6px',
                cursor: 'pointer',
                fontFamily: 'monospace',
                textShadow: '1px 1px 0px #1A0F0A',
                '&:hover': {
                  brightness: '1.1',
                },
              })}
            >
              🔄 Play Again
            </Button>

            <Button
              onClick={() => router.push('/game/mini/memory')}
              className={css({
                minHeight: '44px',
                padding: '10px 18px',
                fontSize: '14px',
                fontWeight: 'bold',
                background: '#228B22',
                color: '#FFFFFF',
                border: '2px solid #FFD700',
                borderRadius: '6px',
                cursor: 'pointer',
                fontFamily: 'monospace',
                textShadow: '1px 1px 0px #1A0F0A',
                '&:hover': {
                  brightness: '1.1',
                },
              })}
            >
              🔙 Back to Animals
            </Button>
          </div>
        </motion.div>
      )}

      {/* Instructions */}
      {!gameStarted && !gameCompleted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={css({
            textAlign: 'center',
            padding: '16px',
            background: 'rgba(139, 69, 19, 0.3)',
            border: '2px solid #FFD700',
            borderRadius: '8px',
            fontSize: '12px',
            color: '#FFF8DC',
            lineHeight: '1.4',
            marginTop: 'auto',
            flex: 'none',
          })}
        >
          <p className={css({ marginBottom: '6px', fontSize: '13px' })}>
            🎯 <strong>How to Play:</strong>
          </p>
          <p className={css({ marginBottom: '3px' })}>• Tap cards to flip them over</p>
          <p className={css({ marginBottom: '3px' })}>• Find matching Christmas pairs</p>
          <p>• Complete all 6 pairs to win!</p>
        </motion.div>
      )}
    </div>
  );
}