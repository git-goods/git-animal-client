'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { Product } from '@gitanimals/api';
import { auctionQueries } from '@gitanimals/react-query';
import { useQuery } from '@tanstack/react-query';

import Pagination from '@/components/Pagination';
import ShopTableRowView, { ShopTableRowViewSkeleton } from '@/components/ProductTable/ShopTableRowView';
import { ACTION_BUTTON_OBJ } from '@/constants/action';

import { tableCss, tbodyCss, theadCss } from '../AuctionSection/table.styles';

import EditModal from './EditModal';

const SELL_LIST_ACTION_OBJ = ACTION_BUTTON_OBJ['EDIT'];

function SellListSection() {
  const t = useTranslations('Shop');

  const [editProductId, setEditProductId] = useState<string>();
  const [currentPage, setCurrentPage] = useState(0);

  const { data } = useQuery({
    ...auctionQueries.myProductsOptions({
      pageNumber: currentPage,
    }),
    select: (data) => ({
      ...data,
      products: data.products.map((product) => {
        return { ...product, paymentState: 'EDIT' };
      }),
    }),
    placeholderData: (prevData) => prevData,
  });

  const onEditAction = (id: Product['id']) => {
    setEditProductId(id);
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
          <span></span>
        </div>

        <div className={tbodyCss}>
          {!data && Array.from({ length: 8 }).map((_, index) => <ShopTableRowViewSkeleton key={`skeleton-${index}`} />)}
          {data?.products.map((product) => {
            return (
              <ShopTableRowView
                key={product.id}
                id={product.id}
                persona={product.persona}
                price={product.price}
                onAction={onEditAction}
                actionLabel={t('edit')}
                actionColor={SELL_LIST_ACTION_OBJ.color}
              />
            );
          })}
        </div>
      </div>

      {data && data.pagination.totalPages > 1 && (
        <Pagination {...data.pagination} currentPage={currentPage} onSetPage={setCurrentPage} />
      )}

      <EditModal
        key={editProductId}
        isOpen={Boolean(editProductId)}
        productId={editProductId}
        onClose={() => {
          setEditProductId(undefined);
        }}
      />
    </>
  );
}

export default SellListSection;
