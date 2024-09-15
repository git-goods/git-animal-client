'use client';

import React, { useState } from 'react';

import CardFlipGame from './PetGotcha/OnePet';

function ShopPage() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div>
      {/* <PetGotcha /> */}
      {isOpen && <CardFlipGame onClose={() => setIsOpen(false)} />}
    </div>
  );
}

export default ShopPage;
