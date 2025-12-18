'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { css } from '_panda/css';
import { Button } from '@gitanimals/ui-panda';
import { AnimatePresence, motion } from 'framer-motion';

import AnimalCard, { AnimalCardBack } from '@/components/AnimalCard/AnimalCard';

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

type Ranking = {
  score: number;
  time: number;
  moves: number;
  date: string;
};

const DUMMY_ANIMALS: Omit<AnimalType, 'id' | 'matchId'>[] = [
  { type: 'PENGUIN', dropRate: '5%' },
  { type: 'CAT', dropRate: '8%' },
  { type: 'DOG', dropRate: '10%' },
  { type: 'RABBIT', dropRate: '7%' },
  { type: 'BEAR', dropRate: '4%' },
  { type: 'FOX', dropRate: '6%' },
  { type: 'LION', dropRate: '3%' },
  { type: 'ELEPHANT', dropRate: '2%' },
  { type: 'GIRAFFE', dropRate: '5%' },
  { type: 'ZEBRA', dropRate: '8%' },
  { type: 'MONKEY', dropRate: '7%' },
  { type: 'PANDA', dropRate: '1%' },
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
  const selectedAnimals = shuffleArray(DUMMY_ANIMALS).slice(0, 12);
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

function calculateScore(time: number): number {
  if (time <= 30) return 1000;
  if (time <= 45) return 800;
  if (time <= 60) return 600;
  if (time <= 90) return 400;
  if (time <= 120) return 200;
  return 100;
}

export default function MemoryGamePage() {
  const router = useRouter();
  const [cards, setCards] = useState<GameCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (gameStarted && !gameCompleted) {
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameStarted, gameCompleted, startTime]);

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
    if (matches === 12 && gameStarted) {
      setGameCompleted(true);
      const finalScore = calculateScore(elapsedTime);
      setScore(finalScore);

      const rankings = JSON.parse(localStorage.getItem('memoryGameRankings') || '[]');
      rankings.push({
        score: finalScore,
        time: elapsedTime,
        moves,
        date: new Date().toISOString(),
      });
      rankings.sort((a: Ranking, b: Ranking) => b.score - a.score);
      localStorage.setItem('memoryGameRankings', JSON.stringify(rankings.slice(0, 10)));
    }
  }, [matches, gameStarted, elapsedTime, moves]);

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
    setStartTime(Date.now());
    setElapsedTime(0);
    setScore(0);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={css({
        minHeight: '100vh',
        padding: '2rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      })}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={css({
          maxWidth: '1200px',
          margin: '0 auto',
        })}
      >
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '1.5rem',
            borderRadius: '1rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          })}
        >
          <h1
            className={css({
              fontSize: '2.5rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            })}
            style={{
              WebkitBackgroundClip: 'text',
            }}
          >
            Animal Memory Game
          </h1>

          <div
            className={css({
              display: 'flex',
              gap: '2rem',
              alignItems: 'center',
            })}
          >
            {gameStarted && (
              <>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className={css({ textAlign: 'center' })}>
                  <div className={css({ fontSize: '0.875rem', color: '#666' })}>Time</div>
                  <div className={css({ fontSize: '1.5rem', fontWeight: 'bold' })}>{formatTime(elapsedTime)}</div>
                </motion.div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className={css({ textAlign: 'center' })}
                >
                  <div className={css({ fontSize: '0.875rem', color: '#666' })}>Moves</div>
                  <div className={css({ fontSize: '1.5rem', fontWeight: 'bold' })}>{moves}</div>
                </motion.div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className={css({ textAlign: 'center' })}
                >
                  <div className={css({ fontSize: '0.875rem', color: '#666' })}>Matches</div>
                  <div className={css({ fontSize: '1.5rem', fontWeight: 'bold' })}>{matches}/12</div>
                </motion.div>
              </>
            )}

            <div className={css({ display: 'flex', gap: '1rem' })}>
              <Button
                onClick={startGame}
                className={css({
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                })}
              >
                {gameStarted ? 'Restart' : 'Start Game'}
              </Button>

              <Button
                onClick={() => router.push('/game/mini/memory/ranking')}
                className={css({
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                })}
              >
                View Rankings
              </Button>
            </div>
          </div>
        </div>

        {!gameStarted && !gameCompleted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={css({
              textAlign: 'center',
              padding: '4rem',
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '1rem',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            })}
          >
            <h2 className={css({ fontSize: '2rem', marginBottom: '1rem' })}>Welcome to Animal Memory Game!</h2>
            <p className={css({ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' })}>
              Match all 12 pairs of animal cards as quickly as possible!
            </p>
            <p className={css({ fontSize: '1rem', color: '#888' })}>Click &quot;Start Game&quot; to begin</p>
          </motion.div>
        )}

        {gameStarted && !gameCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={css({
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '1rem',
              padding: '2rem',
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '1rem',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            })}
          >
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className={css({
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '3/4',
                  cursor: card.isMatched ? 'default' : 'pointer',
                })}
                style={{
                  perspective: '1000px',
                }}
                onClick={() => !card.isMatched && handleCardClick(card.id)}
                whileHover={!card.isMatched ? { scale: 1.05 } : {}}
                whileTap={!card.isMatched ? { scale: 0.95 } : {}}
              >
                <AnimatePresence mode="wait">
                  {card.isMatched && (
                    <motion.div
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.2, 0] }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '0.5rem',
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        opacity: 0.3,
                        zIndex: 10,
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Card Container */}
                <div
                  className={css({
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  })}
                >
                  {/* Back of card - visible when not flipped */}
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
                    <AnimalCardBack tier="S_PLUS" />
                  </motion.div>

                  {/* Front of card - visible when flipped */}
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: card.isFlipped || card.isMatched ? 1 : 0,
                      rotateY: card.isFlipped || card.isMatched ? 0 : -90,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      opacity: card.isMatched ? 0.5 : 1,
                      pointerEvents: card.isFlipped || card.isMatched ? 'auto' : 'none',
                    }}
                  >
                    <AnimalCard type={card.type} dropRate={card.dropRate} />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {gameCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={css({
              textAlign: 'center',
              padding: '3rem',
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '1rem',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            })}
          >
            <motion.h2
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className={css({
                fontSize: '3rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                backgroundClip: 'text',
                color: 'transparent',
                marginBottom: '2rem',
              })}
              style={{
                WebkitBackgroundClip: 'text',
              }}
            >
              Congratulations!
            </motion.h2>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className={css({
                fontSize: '4rem',
                fontWeight: 'bold',
                marginBottom: '2rem',
              })}
            >
              {score}
            </motion.div>

            <div
              className={css({
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '2rem',
                marginBottom: '3rem',
              })}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className={css({
                  padding: '1rem',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '0.5rem',
                  color: 'white',
                })}
              >
                <div className={css({ fontSize: '0.875rem', opacity: 0.9 })}>Time</div>
                <div className={css({ fontSize: '1.5rem', fontWeight: 'bold' })}>{formatTime(elapsedTime)}</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={css({
                  padding: '1rem',
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  borderRadius: '0.5rem',
                  color: 'white',
                })}
              >
                <div className={css({ fontSize: '0.875rem', opacity: 0.9 })}>Moves</div>
                <div className={css({ fontSize: '1.5rem', fontWeight: 'bold' })}>{moves}</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className={css({
                  padding: '1rem',
                  background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                  borderRadius: '0.5rem',
                  color: 'white',
                })}
              >
                <div className={css({ fontSize: '0.875rem', opacity: 0.9 })}>Score</div>
                <div className={css({ fontSize: '1.5rem', fontWeight: 'bold' })}>{score}</div>
              </motion.div>
            </div>

            <div className={css({ display: 'flex', gap: '1rem', justifyContent: 'center' })}>
              <Button
                onClick={startGame}
                className={css({
                  padding: '1rem 2rem',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                })}
              >
                Play Again
              </Button>

              <Button
                onClick={() => router.push('/game/mini/memory/ranking')}
                className={css({
                  padding: '1rem 2rem',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                })}
              >
                View Rankings
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
