import React from 'react';

import type { ProductSchema } from '@/schema/action';

import PetList from './PetList';
import ShopRow from './ShopRow';

const DUMMY: ProductSchema = {
  id: '577529734157395726',
  sellerId: '577033802389381209',
  persona: {
    personaId: '577523468959026699',
    personaType: 'SLIME_GREEN',
    personaLevel: 0,
  },
  price: '1234567890',
  paymentState: 'ON_SALE',
  //   receipt: null,
};

function SellSection() {
  return (
    <div>
      <ShopRow item={DUMMY} />
      <PetList />
    </div>
  );
}

export default SellSection;
