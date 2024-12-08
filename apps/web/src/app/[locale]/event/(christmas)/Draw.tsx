'use client';

import { Draw } from '../(common)/Draw';

import { ChristmasCard } from './ChristmasCard';

const CHRISTMAS_STAR_BONUS_EVENT_CODE = 'CHRISTMAS_2024_STAR_BONUS';

export const ChristmasDraw = () => {
  return (
    <Draw
      renderCard={(type) => <ChristmasCard type={type} />}
      bonusEventCode={CHRISTMAS_STAR_BONUS_EVENT_CODE}
      baseEventCode="CHRISTMAS_2024"
    />
  );
};
