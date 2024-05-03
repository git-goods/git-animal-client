import React, { useState } from 'react';

import SelectAnimals from '@/components/SelectAnimals';

import { FarmSection } from './index.styles';

function OneType() {
  const [selected, setSelected] = useState<string>();
  return (
    <>
      <FarmSection>
        <h2>choose only one pet</h2>
        <SelectAnimals selected={selected} setSelected={setSelected} size={130} />
      </FarmSection>
    </>
  );
}

export default OneType;
