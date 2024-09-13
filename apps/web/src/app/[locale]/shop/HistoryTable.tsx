'use client';

import { useEffect, useState } from 'react';
import { flex } from '_panda/patterns';

import { useGetHistory } from '@/apis/auctions/useGetHistory';
import Pagination from '@/components/Pagination';
import ShopTableBackground from '@/components/ProductTable/ShopTableBackground';
import ShopTableRowView from '@/components/ProductTable/ShopTableRowView';
import { ACTION_BUTTON_OBJ } from '@/constants/action';

import { OrderTypeSelect, PersonaType, SortDirectionSelect } from './SearchOption';
import { useSearchOptions } from './useSearchOptions';

const HISTORY_ACTION_OBJ = ACTION_BUTTON_OBJ['SELL_HISTORY'];

interface ProductTableProps {}

function HistoryTable({}: ProductTableProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const { searchOptions, onSearchOptionChange } = useSearchOptions();

  const { data } = useGetHistory({
    pageNumber: currentPage,
    ...searchOptions,
  });

  useEffect(
    function 옵션_변경시_페이지_초기화() {
      setCurrentPage(0);
    },
    [searchOptions],
  );

  const getHistoryActionLabel = (soldAt: string) => {
    return String(soldAt)?.slice(2, 10).replace(/-/g, '.');
  };

  return (
    <div>
      <div className={flex({ justifyContent: 'space-between', alignItems: 'center', mb: '8px' })}>
        <div className={flex({ gap: '10px', alignItems: 'center' })}>
          <OrderTypeSelect onSelect={(option) => onSearchOptionChange('orderType', option)} />
          <SortDirectionSelect onSelect={(option) => onSearchOptionChange('sortDirection', option)} />
        </div>

        <PersonaType
          onSelect={(option) => onSearchOptionChange('personaType', option)}
          selected={searchOptions.personaType}
        />
      </div>

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
