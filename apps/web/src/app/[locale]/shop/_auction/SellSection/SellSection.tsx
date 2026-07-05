'use client';

import React, { useState } from 'react';
import type { Persona } from '@gitanimals/api';

import PetList from './PetList';
import SellInputRow from './SellInputRow';

function SellSection() {
  const [selectPersona, setSelectPersona] = useState<Persona | null>(null);

  return (
    <div className="mobile:mt-[32px]">
      {selectPersona && <SellInputRow item={selectPersona} initPersona={() => setSelectPersona(null)} />}
      <h3 className="glyph18-bold mb-[16px] text-white-100 mobile:glyph15-bold mobile:mb-[8px] mobile:mt-[28px]">
        My Pets
      </h3>
      <PetList selectedPersona={selectPersona} onProductClick={setSelectPersona} />
    </div>
  );
}

export default SellSection;
