'use client';

import React, { useState } from 'react';
import type { Persona } from '@gitanimals/api';
import { cn } from '@gitanimals/ui-tailwind';

import PetList from './PetList';
import SellInputRow from './SellInputRow';

function SellSection() {
  const [selectPersona, setSelectPersona] = useState<Persona | null>(null);

  return (
    <div className="max-mobile:mt-8">
      {selectPersona && <SellInputRow item={selectPersona} initPersona={() => setSelectPersona(null)} />}
      <h3 className={cn(
        'font-product text-glyph-18 font-bold mb-4 text-white',
        'max-mobile:text-glyph-15 max-mobile:mb-2 max-mobile:mt-7'
      )}>
        My Pets
      </h3>
      <PetList selectedPersona={selectPersona} onProductClick={setSelectPersona} />
    </div>
  );
}

export default SellSection;
