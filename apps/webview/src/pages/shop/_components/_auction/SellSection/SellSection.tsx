import React, { useState } from 'react';
import type { Persona } from '@gitanimals/api';

import PetList from './PetList';
import SellInputRow from './SellInputRow';

const containerStyle = 'max-mobile:mt-8';

const petHeadingStyle =
  'mb-4 text-glyph-18 font-bold text-white-100 max-mobile:mb-2 max-mobile:mt-7 max-mobile:text-glyph-15';

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
