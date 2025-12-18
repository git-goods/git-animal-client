'use client';

import { useCallback, useEffect, useState } from 'react';
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

const DUMMY_ANIMALS: Omit<AnimalType, 'id' | 'matchId'>[] = [
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
  const selectedAnimals = shuffleArray(DUMMY_ANIMALS).slice(0, 6);
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
      }
    );
  });
  
  return shuffleArray(cards);
}

export default function TestMemoryPage() {
  const [cards, setCards] = useState<GameCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [first, second] = selectedCards;
      const firstCard = cards.find((c) => c.id === first);
      const secondCard = cards.find((c) => c.id === second);
      
      if (firstCard && secondCard) {
        if (firstCard.matchId === secondCard.matchId) {
          setTimeout(() => {
            setCards(prev => prev.map(card => 
              card.matchId === firstCard.matchId 
                ? { ...card, isMatched: true }
                : card
            ));
            setSelectedCards([]);
          }, 600);
        } else {
          setTimeout(() => {
            setCards(prev => prev.map(card => 
              card.id === first || card.id === second
                ? { ...card, isFlipped: false }
                : card
            ));
            setSelectedCards([]);
          }, 1000);
        }
      }
    }
  }, [selectedCards, cards]);

  const handleCardClick = useCallback((cardId: string) => {
    if (selectedCards.length >= 2) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;
    
    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));
    setSelectedCards(prev => [...prev, cardId]);
  }, [cards, selectedCards]);

  const startGame = useCallback(() => {
    setCards(generateCards());
    setSelectedCards([]);
    setGameStarted(true);
  }, []);

  return (
    <div className={css({
      minHeight: '100vh',
      padding: '2rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    })}>
      <div className={css({
        maxWidth: '800px',
        margin: '0 auto',
      })}>
        <h1 className={css({
          fontSize: '2rem',
          fontWeight: 'bold',
          color: 'white',
          textAlign: 'center',
          marginBottom: '2rem',
        })}>
          Memory Game Test (3x4 Grid)
        </h1>
        
        <div className={css({ textAlign: 'center', marginBottom: '2rem' })}>
          <Button onClick={startGame}>
            {gameStarted ? 'Restart Game' : 'Start Game'}
          </Button>
        </div>

        {gameStarted && (
          <div className={css({
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '1rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          })}>
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ rotateY: 0, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={css({
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '3/4',
                  cursor: card.isMatched ? 'default' : 'pointer',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.6s',
                  transform: card.isFlipped || card.isMatched ? 'rotateY(180deg)' : 'rotateY(0)',
                })}
                onClick={() => !card.isMatched && handleCardClick(card.id)}
                whileHover={!card.isMatched ? { scale: 1.05 } : {}}
                whileTap={!card.isMatched ? { scale: 0.95 } : {}}
              >
                <div className={css({
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                })}>
                  <AnimalCardBack tier="S_PLUS" />
                </div>
                
                <div className={css({
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  opacity: card.isMatched ? 0.5 : 1,
                  transition: 'opacity 0.3s',
                })}>
                  <AnimalCard type={card.type} dropRate={card.dropRate} />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!gameStarted && (
          <div className={css({
            textAlign: 'center',
            padding: '4rem',
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '1rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          })}>
            <h2 className={css({ fontSize: '1.5rem', marginBottom: '1rem' })}>
              Click Start Game to test the memory game functionality!
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}