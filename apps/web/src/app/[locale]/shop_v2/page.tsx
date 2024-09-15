'use client';

import React, { useState } from 'react';

import CardFlipGame from './PetGotcha/OnePet';
import { PetGotcha } from './PetGotcha';

function ShopPage() {
  const [isOnePetGameOpen, setIsOnePetGameOpen] = useState(false);
  return (
    <div>
      <PetGotcha onOpenOnePetGame={() => setIsOnePetGameOpen(true)} />
      {isOnePetGameOpen && <CardFlipGame onClose={() => setIsOnePetGameOpen(false)} />}
    </div>
  );
}

export default ShopPage;
