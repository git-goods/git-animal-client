'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { Product } from '@gitanimals/api';
import { auctionQueries } from '@gitanimals/react-query';
import { Button } from '@gitanimals/ui-panda';
import { useQuery } from '@tanstack/react-query';

import { MediaQuery } from '@/components/MediaQuery';
import Pagination from '@/components/Pagination/Pagination';

import { tableCss, tbodyCss, theadCss } from '../_auction/table.styles';
import { ShopTableDesktopRow, ShopTableMobileRow, ShopTableRowViewSkeleton } from '../_common/ShopTableMobileRow';

import EditModal from './EditModal';

function SellListSection() {
  const t = useTranslations('Shop');

  const [editProductId, setEditProductId] = useState<string>();
  const [currentPage, setCurrentPage] = useState(0);

  const { data } = useQuery({
    ...auctionQueries.myProductsOptions({ pageNumber: currentPage }),
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
          {data?.products.map((product) => (
            <MediaQuery
              key={product.id}
              mobile={
                <ShopTableMobileRow
                  personaType={product.persona.personaType}
                  personaLevel={product.persona.personaLevel}
                  price={product.price}
                  rightElement={
                    <Button variant="secondary" size="s" onClick={() => onEditAction(product.id)}>
                      {t('edit')}
                    </Button>
                  }
                />
              }
              desktop={
                <ShopTableDesktopRow
                  personaType={product.persona.personaType}
                  personaLevel={product.persona.personaLevel}
                  price={product.price}
                  rightElement={
                    <Button variant="secondary" onClick={() => onEditAction(product.id)}>
                      {t('edit')}
                    </Button>
                  }
                />
              }
            />
          ))}
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
