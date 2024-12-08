'use client';

import { Draw } from '../(common)/Draw';

import { HalloweenCard } from './HalloweenCard';

const HALLOWEEN_STAR_BONUS_EVENT_CODE = 'HALLOWEEN_2024_STAR_BONUS';

export const HalloweenDraw = () => {
  return (
    <Draw
      renderCard={(type) => <HalloweenCard type={type} />}
      bonusEventCode={HALLOWEEN_STAR_BONUS_EVENT_CODE}
      baseEventCode="HALLOWEEN_2024"
    />
  );
};
