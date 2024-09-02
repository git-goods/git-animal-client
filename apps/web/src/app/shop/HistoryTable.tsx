import { useState } from 'react';

import { useGetHistory } from '@/apis/auctions/useGetHistory';
import Pagination from '@/components/Pagination';
import ShopTableBackground from '@/components/ProductTable/ShopTableBackground';
import ShopTableRowView from '@/components/ProductTable/ShopTableRowView';
import { ACTION_BUTTON_OBJ } from '@/constants/action';

import Search from './SearchOption/PersonaType';

const HISTORY_ACTION_OBJ = ACTION_BUTTON_OBJ['SELL_HISTORY'];

interface ProductTableProps {}

function HistoryTable({}: ProductTableProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchPersona, setSearchPersona] = useState<string>();

  const { data } = useGetHistory({
    pageNumber: currentPage,
    personaType: searchPersona,
  });

  const getHistoryActionLabel = (soldAt: string) => {
    return String(soldAt)?.slice(2, 10).replace(/-/g, '.');
  };

  return (
    <div>
      <Search onSelect={setSearchPersona} selected={searchPersona} />
      <ShopTableBackground>
        {data?.products.map((product) => {
          return (
            <ShopTableRowView
              key={product.id}
              id={product.id}
              persona={product.persona}
              price={product.price}
              onAction={() => null}
              actionLabel={getHistoryActionLabel(product?.receipt.soldAt)}
              actionColor={HISTORY_ACTION_OBJ.color}
            />
          );
        })}
      </ShopTableBackground>
      {data && data.pagination.totalPages > 1 && (
        <Pagination {...data.pagination} currentPage={currentPage} onSetPage={setCurrentPage} />
      )}
    </div>
  );
}

export default HistoryTable;
