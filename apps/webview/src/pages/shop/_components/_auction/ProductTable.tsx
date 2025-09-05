/* eslint-disable @next/next/no-img-element */
'use client';

import { Suspense, useEffect, useState } from 'react';
import type { Product } from '@gitanimals/api';
import { auctionQueries, useBuyProduct, useDeleteProduct, userQueries } from '@gitanimals/react-query';
import { Button } from '@gitanimals/ui-panda';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import Pagination from '@/components/Pagination/Pagination';

import { ShopTableMobileRow, ShopTableRowViewSkeleton } from '../_common/ShopTableMobileRow';
import { useSearchOptions } from './useSearchOptions';

import { tableCss, tbodyCss, theadCss } from './table.styles';
import { useTranslation } from 'react-i18next';
import { useUser } from '@/hooks/useUser';

function ProductTable() {
  const { t } = useTranslation('shop');
  const { id: myId } = useUser();
  const [currentPage, setCurrentPage] = useState(1);

  const { searchOptions } = useSearchOptions();
  useEffect(
    function 옵션_변경시_페이지_초기화() {
      setCurrentPage(0);
    },
    [searchOptions],
  );

  const { data } = useQuery({
    ...auctionQueries.productsOptions({
      pageNumber: currentPage,
      ...{
        personaType: searchOptions.personaType ?? undefined,
        orderType: searchOptions.orderType ?? undefined,
        sortDirection: searchOptions.sortDirection ?? undefined,
      },
      count: 6,
    }),
    enabled: Boolean(myId),
    placeholderData: (prevData) => prevData,
  });

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
              <Suspense>
                <ProductTableRow product={product} key={product.id} />
              </Suspense>
            );
          })}
        </div>
      </div>
      {data && <Pagination {...data.pagination} currentPage={currentPage} onSetPage={setCurrentPage} />}
    </>
  );
}

export default ProductTable;

function ProductTableRow({ product }: { product: Product }) {
  const queryClient = useQueryClient();
  const { id: myId } = useUser();
  // const { setLoading } = useLoading();
  const { t } = useTranslation('shop');

  const productStatus = product.sellerId === myId ? 'MY_SELLING' : product.paymentState;

  const { mutate: buyProduct, isPending: isBuying } = useBuyProduct({
    onSuccess: () => {
      toast.success(t('buy-product-success'), {
        duration: 1000,
      });
      queryClient.invalidateQueries({ queryKey: auctionQueries.productsKey() });
      queryClient.invalidateQueries({ queryKey: userQueries.allKey() });
    },
    onSettled: () => {
      // TODO: 로딩 처리
      // setLoading(false);
    },
  });

  const { mutate: deleteProduct } = useDeleteProduct({
    onSuccess: () => {
      toast.success(t('delete-product-success'), {
        duration: 1000,
      });

      queryClient.invalidateQueries({ queryKey: auctionQueries.productsKey() });
    },
    onSettled: () => {
      // setLoading(false);
    },
    onError: () => {
      toast.error(t('delete-product-fail'), {
        duration: 1000,
      });
    },
  });

  const onAction = (id: Product['id']) => {
    if (isBuying) return;
    // setLoading(true);

    if (productStatus === 'MY_SELLING') {
      deleteProduct(id);
      return;
    }

    if (product.paymentState === 'ON_SALE') {
      buyProduct({ productId: id });
    }
  };

  return (
    <ShopTableMobileRow
      personaType={product.persona.personaType}
      personaLevel={product.persona.personaLevel}
      price={product.price}
      rightElement={
        <Button variant="secondary" size="s" onClick={() => onAction(product.id)}>
          {t(productStatus === 'MY_SELLING' ? 'cancel' : isBuying ? 'buying' : 'buy')}
        </Button>
      }
    />
  );
}
