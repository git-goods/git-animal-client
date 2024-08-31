'use client';

import HistoryTable from './HistoryTable';
import ProductTable from './ProductTable';
import SellListSection from './SellListSection';
import SellSection from './SellSection';

function ShopInner({ tab }: { tab: string }) {
  return (
    <section style={{ height: '710px' }}>
      {tab === 'products' && <ProductTable />}
      {tab === 'history' && <HistoryTable />}
      {tab === 'sell' && <SellSection />}
      {tab === 'sellList' && <SellListSection />}
    </section>
  );
}

export default ShopInner;
