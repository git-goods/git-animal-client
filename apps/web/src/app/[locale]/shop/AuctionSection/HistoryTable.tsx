'use client';

import { useEffect, useState } from 'react';

import { useGetHistory } from '@/apis/auctions/useGetHistory';
import Pagination from '@/components/Pagination';
import ShopTableRowView from '@/components/ProductTable/ShopTableRowView';
import { ACTION_BUTTON_OBJ } from '@/constants/action';

import { useSearchOptions } from '../useSearchOptions';

import { tableCss, tbodyCss, theadCss } from './table.styles';

const HISTORY_ACTION_OBJ = ACTION_BUTTON_OBJ['SELL_HISTORY'];

function HistoryTable() {
  const [currentPage, setCurrentPage] = useState(0);

  const { searchOptions } = useSearchOptions();

  const { data } = useGetHistory(
    {
      pageNumber: currentPage,
      ...searchOptions,
    },
    {
      placeholderData: (prevData) => prevData,
    },
  );

  useEffect(
    function 옵션_변경시_페이지_초기화() {
      setCurrentPage(0);
    },
    [searchOptions],
  );

  // TODO: 개선하기 @sumi-0011
  const getHistoryActionLabel = (soldAt: string) => {
    return String(soldAt)?.slice(2, 10).replace(/-/g, '.');
  };

  return (
    <>
      <div className={tableCss}>
        <div className={theadCss}>
          <span>Pet</span>
          <span>Name</span>
          <span>Grade</span>
          <span>Level</span>
          <span>Price</span>
          <span>Date</span>
        </div>

        <div className={tbodyCss}>
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
        </div>
      </div>

      {data && data.pagination.totalPages > 1 && (
        <Pagination {...data.pagination} currentPage={currentPage} onSetPage={setCurrentPage} />
      )}
    </>
  );
}

export default HistoryTable;
