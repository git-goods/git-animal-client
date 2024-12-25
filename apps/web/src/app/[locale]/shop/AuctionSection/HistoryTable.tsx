'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { auctionQueries } from '@gitanimals/react-query';
import { Table } from '@gitanimals/ui-panda';
import { useQuery } from '@tanstack/react-query';

import Pagination from '@/components/Pagination';
import ShopTableRowView, { ShopTableRowViewSkeleton } from '@/components/ProductTable/ShopTableRowView';
import { ACTION_BUTTON_OBJ } from '@/constants/action';

import { useSearchOptions } from '../useSearchOptions';

import { tableCss } from './table.styles';

const HISTORY_ACTION_OBJ = ACTION_BUTTON_OBJ['SELL_HISTORY'];

function HistoryTable() {
  const t = useTranslations('Shop');
  const [currentPage, setCurrentPage] = useState(0);

  const { searchOptions } = useSearchOptions();

  const { data } = useQuery({
    ...auctionQueries.historyOptions({ pageNumber: currentPage, ...searchOptions }),
    placeholderData: (prevData) => prevData,
  });

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
      <Table className={tableCss}>
        <Table.Header>
          <Table.Row>
            <Table.Head width="132px" textAlign="center">
              {t('pet')}
            </Table.Head>
            <Table.Head>{t('name')}</Table.Head>
            <Table.Head>{t('grade')}</Table.Head>
            <Table.Head>{t('level')}</Table.Head>
            <Table.Head width="30%">{t('price')}</Table.Head>
            <Table.Head width="160px"></Table.Head>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {!data && Array.from({ length: 8 }).map((_, index) => <ShopTableRowViewSkeleton key={`skeleton-${index}`} />)}
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
        </Table.Body>
      </Table>

      {data && data.pagination.totalPages > 1 && (
        <Pagination {...data.pagination} currentPage={currentPage} onSetPage={setCurrentPage} />
      )}
    </>
  );
}

export default HistoryTable;
