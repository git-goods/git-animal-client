'use client';

import { useState } from 'react';

import HistoryTable from './HistoryTable';
import ProductTable from './ProductTable';
import SellListSection from './SellListSection';
import SellSection from './SellSection';

function ShopInner({ tab }: { tab: string }) {
  const [searchPersona, setSearchPersona] = useState<string>();

  const onSearch = (personaType?: string) => {
    setSearchPersona(personaType);
  };

  return (
    <section style={{ height: '655px' }}>
      {tab === 'products' && <ProductTable searchPersona={searchPersona} />}
      {tab === 'history' && <HistoryTable searchPersona={searchPersona} />}
      {tab === 'sell' && <SellSection />}
      {tab === 'sellList' && <SellListSection />}
    </section>
  );
}

export default ShopInner;
