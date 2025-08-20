'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { Product } from '@gitanimals/api';
import useIsMobile from '@gitanimals/react/src/hooks/useIsMobile/useIsMobile';
import { auctionQueries } from '@gitanimals/react-query';
import { Button } from '@gitanimals/ui-panda';
import { useQuery } from '@tanstack/react-query';

import Pagination from '@/components/Pagination/Pagination';

import { ShopTableMobileRow, ShopTableRowViewSkeleton } from '../_common/ShopTableMobileRow';

import EditModal from './SellSection/EditModal';
import { tableCss, tbodyCss } from './table.styles';

function SellListSection() {
  const t = useTranslations('Shop');
  const isMobile = useIsMobile();
  const [editProductId, setEditProductId] = useState<string>();
  const [currentPage, setCurrentPage] = useState(0);

  const { data } = useQuery({
    ...auctionQueries.myProductsOptions({ pageNumber: currentPage, count: isMobile ? 6 : 10 }),
    placeholderData: (prevData) => prevData,
  });

  const onEditAction = (id: Product['id']) => {
    setEditProductId(id);
  };

  return (
    <>
      <div className={tableCss}>
        <div className={tbodyCss}>
          {!data && Array.from({ length: 8 }).map((_, index) => <ShopTableRowViewSkeleton key={`skeleton-${index}`} />)}
          {data?.products.map((product) => (
            <ShopTableMobileRow
              key={product.id}
              personaType={product.persona.personaType}
              personaLevel={product.persona.personaLevel}
              price={product.price}
              rightElement={
                <Button variant="secondary" size="s" onClick={() => onEditAction(product.id)}>
                  {t('edit')}
                </Button>
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
