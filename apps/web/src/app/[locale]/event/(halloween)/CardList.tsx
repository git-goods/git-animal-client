'use client';

import { css } from '_panda/css';

import { CardList, MobileCardList } from '../(common)/CardList';

import { HalloweenCard } from './HalloweenCard';
import { OnlyDesktop, OnlyMobile } from '_panda/jsx';

const PERSONA = ['GHOST_KING', 'GHOST', 'SCREAM', 'SCREAM_GHOST', 'SLIME_PUMPKIN_1', 'SLIME_PUMPKIN_2']; //  ''

export function HalloweenCardList() {
  return (
    <>
      <OnlyMobile>
        <MobileCardList renderCard={(type) => <HalloweenCard type={type} />} persona={PERSONA} />
      </OnlyMobile>
      <OnlyDesktop>
        <CardList persona={PERSONA} renderCard={(type) => <HalloweenCard type={type} />} />
      </OnlyDesktop>
    </>
  );
}
