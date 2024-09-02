'use client';

import { useEffect, useState } from 'react';
import { flex } from '_panda/patterns';
import type { Product } from '@gitanimals/api';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getProductsQueryKey, useGetProducts } from '@/apis/auctions/useGetProducts';
import { useBuyProduct, useDeleteProduct } from '@/apis/auctions/useProduct';
import Pagination from '@/components/Pagination';
import ShopTableBackground from '@/components/ProductTable/ShopTableBackground';
import ShopTableRowView from '@/components/ProductTable/ShopTableRowView';
import { ACTION_BUTTON_OBJ } from '@/constants/action';
import { useLoading } from '@/store/loading';
import { useClientUser } from '@/utils/clientAuth';

import { OrderTypeSelect, PersonaType, SortDirectionSelect } from './SearchOption';
import { useSearchOptions } from './useSearchOptions';

interface ProductTableProps {}

function ProductTable({}: ProductTableProps) {
  const { id: myId } = useClientUser();

  const [currentPage, setCurrentPage] = useState(0);

  const { searchOptions, onSearchOptionChange } = useSearchOptions();

  useEffect(
    function 옵션_변경시_페이지_초기화() {
      setCurrentPage(0);
    },
    [searchOptions],
  );

  const { data } = useGetProducts({ pageNumber: currentPage, ...searchOptions }, { enabled: Boolean(myId) });

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
          return <ProductTableRow product={product} key={product.id} />;
        })}
      </ShopTableBackground>
      {data && <Pagination {...data.pagination} currentPage={currentPage} onSetPage={setCurrentPage} />}
    </div>
  );
}

export default ProductTable;

function ProductTableRow({ product }: { product: Product }) {
  const queryClient = useQueryClient();
  const { id: myId } = useClientUser();
  const { setLoading } = useLoading();

  const productStatus = product.sellerId === myId ? 'MY_SELLING' : product.paymentState;

  const { mutate: buyProduct } = useBuyProduct({
    onSuccess: () => {
      toast.success('Purchase complete!', {
        position: 'top-center',
        duration: 1000,
      });
      queryClient.invalidateQueries({
        queryKey: getProductsQueryKey(),
      });
      queryClient.invalidateQueries({
        queryKey: ['user'], // TODO: user query key
      });
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const { mutate: deleteProduct } = useDeleteProduct({
    onSuccess: () => {
      toast.success('Cancellation complete!', {
        position: 'top-center',
        duration: 1000,
      });

      queryClient.invalidateQueries({
        queryKey: getProductsQueryKey(),
      });
    },
    onSettled: () => {
      setLoading(false);
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
      actionLabel={ACTION_BUTTON_OBJ[productStatus].label}
      actionColor={ACTION_BUTTON_OBJ[productStatus].color}
    />
  );
}
