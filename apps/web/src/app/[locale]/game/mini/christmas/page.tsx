'use client';

import { useCallback, useEffect, useState } from 'react';
import { css, cx } from '_panda/css';
import { Button } from '@gitanimals/ui-panda';
import { AnimatePresence, motion } from 'framer-motion';

import ChristmasGameCompleted from '@/components/ChristmasGameCompleted';
import { getPersonaImage } from '@/utils/image';

type AnimalType = {
  id: string;
  type: string;
  dropRate: string;
  matchId: string;
};

type GameCard = AnimalType & {
  isFlipped: boolean;
  isMatched: boolean;
};

const CHRISTMAS_ANIMALS: Omit<AnimalType, 'id' | 'matchId'>[] = [
  { type: 'PENGUIN', dropRate: '5%' },
  { type: 'CAT', dropRate: '8%' },
  { type: 'DOG', dropRate: '10%' },
  { type: 'RABBIT', dropRate: '7%' },
  { type: 'BEAR', dropRate: '4%' },
  { type: 'FOX', dropRate: '6%' },
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
  const selectedAnimals = shuffleArray(CHRISTMAS_ANIMALS).slice(0, 6); // 6 pairs = 12 cards
  const cards: GameCard[] = [];

  selectedAnimals.forEach((animal, index) => {
    const matchId = `match-${index}`;
    cards.push(
      {
        ...animal,
        id: `${matchId}-1`,
        matchId,
        isFlipped: false,
        isMatched: false,
      },
      {
        ...animal,
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
      className="h-full text-white flex flex-col overflow-hidden box-border"
      // className={css({
      //   // background: 'linear-gradient(to bottom, #2D1B14 0%, #8B4513 100%)',
      //   fontFamily: 'monospace', // Pixel-style font fallback
      //   color: '#FFFFFF',
      //   display: 'flex',
      //   flexDirection: 'column',
      //   overflow: 'hidden',
      //   boxSizing: 'border-box',
      //   height: '100%',
      // })}
    >
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        {gameStarted && (
          <div
            className={css({
              fontSize: '10px',
              color: '#FFD700',
              display: 'flex',
              gap: '8px',
              justifyContent: 'center',
              marginTop: '2px',
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
            marginBottom: '8px',
            flex: 'none',
          })}
        >
          <Button
            onClick={startGame}
            className={css({
              minHeight: '40px',
              padding: '8px 16px',
              fontSize: '12px',
              fontWeight: 'bold',
              background: '#C41E3A',
              color: '#FFFFFF',
              border: '2px solid #FFD700',
              borderRadius: '6px',
              cursor: 'pointer',
              fontFamily: 'monospace',
              textShadow: '1px 1px 0px #1A0F0A',
              boxShadow: '0 2px 4px rgba(26, 15, 10, 0.4)',
              transition: 'all 0.2s ease',
              '&:hover': {
                brightness: '1.1',
                transform: 'translateY(-1px)',
              },
              '&:active': {
                transform: 'translateY(1px)',
                boxShadow: '0 1px 2px rgba(26, 15, 10, 0.4)',
              },
            })}
          >
            🎮 Start Game 🎮
          </Button>
        </motion.div>
      )}

      {/* Game Grid */}
      {gameStarted && !gameCompleted && (
        <div
          className={css({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: '1',
            minHeight: '0',
          })}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={css({
              display: 'grid',
              maxWidth: '70%',
              maxHeight: '70%',

              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(4, 1fr)',
              gap: { base: '4px', sm: '6px' },
              padding: '0',
              flex: '1',
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              justifyItems: 'center',
              minHeight: '0',
              height: '100%',
            })}
          >
            {cards.map((card, index) => (
              <GameCard key={card.id} card={card} index={index} handleCardClick={handleCardClick} />
            ))}
          </motion.div>
        </div>
      )}

      {/* Game Completed */}
      {gameCompleted && (
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: '1',
            padding: '16px 0',
          })}
        >
          <ChristmasGameCompleted moves={moves} onPlayAgain={startGame} />
        </div>
      )}

      {/* Instructions */}
      {!gameStarted && !gameCompleted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={css({
            textAlign: 'center',
            padding: '12px',
            background: 'rgba(139, 69, 19, 0.3)',
            border: '2px solid #FFD700',
            borderRadius: '6px',
            fontSize: '10px',
            color: '#FFF8DC',
            lineHeight: '1.3',
            marginTop: 'auto',
            flex: 'none',
          })}
        >
          <p className={css({ marginBottom: '4px', fontSize: '11px' })}>
            🎯 <strong>How to Play:</strong>
          </p>
          <p className={css({ marginBottom: '2px' })}>• Tap cards to flip them over</p>
          <p className={css({ marginBottom: '2px' })}>• Find matching animal pairs</p>
          <p>• Complete all 6 pairs to win!</p>
        </motion.div>
      )}
    </div>
  );
}

function GameCard({
  card,
  index,
  handleCardClick,
}: {
  card: GameCard;
  index: number;
  handleCardClick: (cardId: string) => void;
}) {
  return (
    <motion.div
      key={card.id}
      initial={{ opacity: 0, rotateY: 0 }}
      animate={{ opacity: 1, rotateY: 0 }}
      transition={{ delay: index * 0.05 }}
      className={css({
        position: 'relative',
        width: '100%',
        height: '100%',
        cursor: card.isMatched ? 'default' : 'pointer',
        perspective: '1000px',
        minHeight: '0',
      })}
      onClick={() => !card.isMatched && handleCardClick(card.id)}
      whileHover={!card.isMatched ? { scale: 1.02 } : {}}
      whileTap={!card.isMatched ? { scale: 0.98 } : {}}
    >
      {/* Card Container */}
      <div
        className={css({
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '6px',
          overflow: 'hidden',
        })}
      >
        {/* Card Back - visible when not flipped */}
        <motion.div
          initial={false}
          animate={{
            opacity: card.isFlipped || card.isMatched ? 0 : 1,
            rotateY: card.isFlipped || card.isMatched ? 90 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            pointerEvents: card.isFlipped || card.isMatched ? 'none' : 'auto',
          }}
        >
          <div className={cardCss}>
            ❄️
            {card.type}
          </div>
        </motion.div>

        {/* Card Front - visible when flipped */}
        <motion.div
          initial={false}
          animate={{
            opacity: card.isFlipped || card.isMatched ? 1 : 0,
            rotateY: card.isFlipped || card.isMatched ? 0 : -90,
          }}
          transition={{ duration: 0.3 }}
          className={cx(
            cardCss,
            css({
              position: 'absolute',
              filter: card.isMatched ? 'brightness(1.2)' : 'brightness(1)',
              pointerEvents: card.isFlipped || card.isMatched ? 'auto' : 'none',
              objectFit: 'cover',
            }),
          )}
        >
          <img src={getPersonaImage(card.type)} alt={card.type} />
        </motion.div>
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
  );
}

const cardCss = css({
  background: '#C41E3A',
  border: '2px solid #FFD700',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: { base: '16px', sm: '20px' },
  boxShadow: '0 1px 3px rgba(26, 15, 10, 0.3)',
  width: '100%',
  height: '100%',
});
