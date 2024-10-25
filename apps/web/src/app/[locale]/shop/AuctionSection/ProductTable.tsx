'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import type { Product } from '@gitanimals/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useBuyProduct, useDeleteProduct } from '@/apis/auctions/useProduct';
import Pagination from '@/components/Pagination';
import ShopTableRowView, { ShopTableRowViewSkeleton } from '@/components/ProductTable/ShopTableRowView';
import { ACTION_BUTTON_OBJ } from '@/constants/action';
import { useLoading } from '@/store/loading';
import { useClientUser } from '@/utils/clientAuth';

import { useSearchOptions } from '../useSearchOptions';

import { tableCss, tbodyCss, theadCss } from './table.styles';
import { auctionQueries, userQueries } from '@gitanimals/react-query';

function ProductTable() {
  const t = useTranslations('Shop');
  const { id: myId } = useClientUser();
  const [currentPage, setCurrentPage] = useState(0);

  const { searchOptions } = useSearchOptions();

  useEffect(
    function 옵션_변경시_페이지_초기화() {
      setCurrentPage(0);
    },
    [searchOptions],
  );

  const { data } = useQuery({
    ...auctionQueries.productsOptions({ pageNumber: currentPage, ...searchOptions }),
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
            return <ProductTableRow product={product} key={product.id} />;
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
  const { id: myId } = useClientUser();
  const { setLoading } = useLoading();
  const t = useTranslations('Shop');

  const productStatus = product.sellerId === myId ? 'MY_SELLING' : product.paymentState;

  const { mutate: buyProduct } = useBuyProduct({
    onSuccess: () => {
      toast.success(t('buy-product-success'), {
        duration: 1000,
      });
      queryClient.invalidateQueries({ queryKey: auctionQueries.productsKey() });
      queryClient.invalidateQueries({ queryKey: userQueries.allKey() });
    },
    onSettled: () => {
      setLoading(false);
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
      setLoading(false);
    },
    onError: () => {
      toast.error(t('delete-product-fail'), {
        duration: 1000,
      });
    },
  });

  const onAction = (id: Product['id']) => {
    setLoading(true);

    if (productStatus === 'MY_SELLING') {
      deleteProduct(id);
      return;
    }

    if (product.paymentState === 'ON_SALE') {
      buyProduct(id);
    }
  };

  return (
    <ShopTableRowView
      key={product.id}
      id={product.id}
      persona={product.persona}
      price={product.price}
      onAction={onAction}
      actionLabel={t(ACTION_BUTTON_OBJ[productStatus].label)}
      actionColor={ACTION_BUTTON_OBJ[productStatus].color}
    />
  );
}
