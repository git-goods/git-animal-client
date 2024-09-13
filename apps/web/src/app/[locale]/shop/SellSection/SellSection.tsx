'use client';

import React, { useState } from 'react';
import { css } from '_panda/css';

import type { PetInfoSchema } from '@/schema/user';

import PetList from './PetList';
import ShopRow from './SellInputRow';

function SellSection() {
  const [selectPersona, setSelectPersona] = useState<PetInfoSchema>();

  return (
    <div>
      <ShopRow item={selectPersona} initPersona={() => setSelectPersona(undefined)} />
      <h3 className={petHeadingStyle}>Pets</h3>
      <PetList selectedPersona={selectPersona} onProductClick={setSelectPersona} />
    </div>
  );
}

export default SellSection;

const petHeadingStyle = css({
  marginTop: '12px',
  marginBottom: '4px',
});
