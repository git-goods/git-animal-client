'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { PerspectiveCenterSlider } from '@/components/Slider';

import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/react-flicking/dist/flicking-inline.css';

interface CardListProps {
  renderCard: (type: string) => React.ReactNode;
  persona: string[];
}

export function CardList({ renderCard, persona }: CardListProps) {
  const cards = persona.map((type, index) => ({
    key: `${type}-${index}`,
    Element: renderCard(type),
  }));

  const [visibleCards, setVisibleCards] = useState(cards.slice(0, 3));

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCards((prevCards) => {
        const nextCards = cards.filter((card) => !prevCards.includes(card)).slice(0, 3);
        return nextCards;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-between w-[1000px] max-w-[80vw] mx-auto">
      {[0, 1, 2].map((index) => (
        <div key={index} className="relative w-[265px] h-[328px] overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.div
              key={visibleCards[index].key}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute w-full h-full"
            >
              {visibleCards[index].Element}
            </motion.div>
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export function MobileCardList({ renderCard, persona }: CardListProps) {
  return (
    <div className="[&_.slider-container]:w-full">
      <PerspectiveCenterSlider>
        {persona.map((type) => (
          <div key={type}>{renderCard(type)}</div>
        ))}
      </PerspectiveCenterSlider>
    </div>
  );
}
