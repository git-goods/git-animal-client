'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import useIsMobile from '@gitanimals/react/src/hooks/useIsMobile/useIsMobile';
import { auctionQueries } from '@gitanimals/react-query';
import { useQuery } from '@tanstack/react-query';

import { MediaQuery } from '@/components/MediaQuery';
import Pagination from '@/components/Pagination/Pagination';

import { ShopTableDesktopRow, ShopTableMobileRow, ShopTableRowViewSkeleton } from '../_common/ShopTableMobileRow';
import { useSearchOptions } from '../useSearchOptions';

import { tableCss, tbodyCss, theadCss } from './table.styles';

function HistoryTable() {
  const t = useTranslations('Shop');
  const [currentPage, setCurrentPage] = useState(0);

  const { searchOptions } = useSearchOptions();
  const isMobile = useIsMobile();

  const { data } = useQuery({
    ...auctionQueries.historyOptions({ pageNumber: currentPage, ...searchOptions, count: isMobile ? 6 : 10 }),
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
      <div className={tableCss}>
        <div className={theadCss}>
          <span>{t('pet')}</span>
          <span>{t('name')}</span>
          <span>{t('grade')}</span>
          <span>{t('level')}</span>
          <span>{t('price')}</span>
          <span>{t('date')}</span>
        </div>

        <div className={tbodyCss}>
          {!data && Array.from({ length: 8 }).map((_, index) => <ShopTableRowViewSkeleton key={`skeleton-${index}`} />)}
          {data?.products.map((product) => (
            <MediaQuery
              key={product.id}
              mobile={
                <ShopTableMobileRow
                  key={product.id}
                  personaType={product.persona.personaType}
                  personaLevel={product.persona.personaLevel}
                  price={product.price}
                  rightElement={
                    <span className={css({ textStyle: 'glyph15.regular', color: 'white.white' })}>
                      {getHistoryActionLabel(product?.receipt.soldAt)}
                    </span>
                  }
                />
              }
              desktop={
                <ShopTableDesktopRow
                  personaType={product.persona.personaType}
                  personaLevel={product.persona.personaLevel}
                  price={product.price}
                  rightElement={getHistoryActionLabel(product?.receipt.soldAt)}
                />
              }
            />
          ))}
        </div>
      </div>

      {data && data.pagination.totalPages > 1 && (
        <Pagination {...data.pagination} currentPage={currentPage} onSetPage={setCurrentPage} />
      )}
    </>
  );
}

export default HistoryTable;
