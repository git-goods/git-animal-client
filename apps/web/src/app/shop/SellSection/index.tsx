'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

import type { PetInfoSchema } from '@/schema/user';

import PetList from './PetList';
import ShopRow from './SellInputRow';

function SellSection() {
  const [selectPersona, setSelectPersona] = useState<PetInfoSchema>();

  return (
    <div>
      <ShopRow item={selectPersona} initPersona={() => setSelectPersona(undefined)} />
      <PetsHeading>Pets</PetsHeading>
      <PetList selectedPersona={selectPersona} onProductClick={setSelectPersona} />
    </div>
  );
}

export default SellSection;

const PetsHeading = styled.h3`
  margin-top: 12px;
  margin-bottom: 4px;
`;
