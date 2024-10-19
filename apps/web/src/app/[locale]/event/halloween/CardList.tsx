'use client';

import React, { useEffect, useState } from 'react';
import { css } from '_panda/css';
import { AnimatePresence, motion } from 'framer-motion';

import { HalloweenCard } from './HalloweenCard';

const PERSONA = ['GHOST_KING', 'GHOST', 'SCREAM', 'SCREAM_GHOST', 'SLIME_PUMPKIN_1', 'SLIME_PUMPKIN_2']; //  ''

const cards = PERSONA.map((type, index) => ({
  key: `${type}-${index}`,
  Element: <HalloweenCard type={type} key={type} />,
}));

export function CardList() {
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
    <div className={cardContainerStyle}>
      {[0, 1, 2].map((index) => (
        <div key={index} className={slotContainerStyle}>
          <AnimatePresence initial={false}>
            <motion.div
              key={visibleCards[index].key}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={slotItemStyle}
            >
              {visibleCards[index].Element}
            </motion.div>
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

const cardContainerStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  width: '1000px',
  maxWidth: '80vw',
  margin: '0 auto',
});

const slotContainerStyle = css({ position: 'relative', width: '265px', height: '328px', overflow: 'hidden' });

const slotItemStyle = css({
  position: 'absolute',
  width: '100%',
  height: '100%',
});
