import { useState } from 'react';

import { useGetHistory } from '@/apis/auctions/useGetHistory';
import Pagination from '@/components/Pagination';
import ShopTableBackground from '@/components/ProductTable/ShopTableBackground';
import ShopTableRowView from '@/components/ProductTable/ShopTableRowView';
import { ACTION_BUTTON_OBJ } from '@/constants/action';
import type { ProductHistoryType } from '@/schema/action';
import type { PaginationSchema } from '@/schema/pagination';

import Search from './Search';

const HISTORY_ACTION_OBJ = ACTION_BUTTON_OBJ['SELL_HISTORY'];

interface ProductTableProps {}

function HistoryTable({}: ProductTableProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchPersona, setSearchPersona] = useState<string>();

  const { data } = useGetHistory<{
    products: ProductHistoryType<'SELL_HISTORY'>[];
    pagination: PaginationSchema;
  }>(
    {
      pageNumber: currentPage,
      personaType: searchPersona,
    },
    {
      select: (data) => ({
        products: data.products.map((product) =>
          Boolean(product?.receipt.soldAt)
            ? {
                ...product,
                paymentState: 'SELL_HISTORY',
              }
            : product,
        ),
        pagination: data.pagination,
      }),
    },
  );

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
              actionLabel={getHistoryActionLabel((product as ProductHistoryType<'SELL_HISTORY'>)?.receipt.soldAt)}
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
