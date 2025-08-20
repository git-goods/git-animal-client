'use client';

import React, { useState } from 'react';
import { css } from '_panda/css';
import type { Persona } from '@gitanimals/api';

import PetList from './PetList';
import SellInputRow from './SellInputRow';

function SellSection() {
  const [selectPersona, setSelectPersona] = useState<Persona | null>(null);

  return (
    <div className={containerStyle}>
      {selectPersona && <SellInputRow item={selectPersona} initPersona={() => setSelectPersona(null)} />}
      <h3 className={petHeadingStyle}>My Pets</h3>
      <PetList selectedPersona={selectPersona} onProductClick={setSelectPersona} />
    </div>
  );
}

export default SellSection;

const containerStyle = css({
  marginTop: '32px',
});

const petHeadingStyle = css({
  color: 'white.white_100',

  textStyle: 'glyph15.bold',
  marginBottom: '8px',
  marginTop: '28px',
});
