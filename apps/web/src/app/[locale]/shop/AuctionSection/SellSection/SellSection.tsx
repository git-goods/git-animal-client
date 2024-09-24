'use client';

import React, { useState } from 'react';
import { css } from '_panda/css';

import type { PetInfoSchema } from '@/schema/user';

import PetList from './PetList';
import SellInputRow from './SellInputRow';

function SellSection() {
  const [selectPersona, setSelectPersona] = useState<PetInfoSchema | null>(null);

  return (
    <div>
      <SellInputRow item={selectPersona} initPersona={() => setSelectPersona(null)} />
      <h3 className={petHeadingStyle}>My Pets</h3>
      <PetList selectedPersona={selectPersona} onProductClick={setSelectPersona} />
    </div>
  );
}

export default SellSection;

const petHeadingStyle = css({
  textStyle: 'glyph18.bold',
  marginBottom: 16,
  color: 'white.white_100',
});
