'use client';

import React, { useState } from 'react';
import { css } from '_panda/css';
import type { Persona } from '@gitanimals/api';

import PetList from './PetList';
import SellInputRow from './SellInputRow';

function SellSection() {
  const [selectPersona, setSelectPersona] = useState<Persona | null>(null);

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
  marginBottom: '16px',
  color: 'white.white_100',
});
