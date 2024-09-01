'use client';

import { useEffect, useState } from 'react';
import { flex } from '_panda/patterns';
import type { Product, ProductOrderType, ProductSortDirection } from '@gitanimals/api';
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

import Search from './Search';

interface ProductTableProps {}

function ProductTable({}: ProductTableProps) {
  const { id: myId } = useClientUser();

  const [currentPage, setCurrentPage] = useState(0);
  const [searchPersona, setSearchPersona] = useState<string>();
  const [orderType, setOrderType] = useState<ProductOrderType>('PRICE');
  const [sortDirection, setSortDirection] = useState<ProductSortDirection>('ASC');

  useEffect(
    function 선택_동물_변경시_페이지_초기화() {
      setCurrentPage(0);
    },
    [searchPersona],
  );

  const { data } = useGetProducts(
    { pageNumber: currentPage, personaType: searchPersona, orderType, sortDirection },
    { enabled: Boolean(myId) },
  );

  return (
    <div>
      <div className={flex({ gap: '4px' })}>
        <Search onSelect={setSearchPersona} selected={searchPersona} />
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

  const onAction = (item: Product) => {
    setLoading(true);

    if (productStatus === 'MY_SELLING') {
      deleteProduct(item.id);
      return;
    }

    if (item.paymentState === 'ON_SALE') {
      buyProduct(item.id);
    }
  };

  return (
    <ShopTableRowView
      key={product.id}
      item={product}
      onAction={onAction}
      actionLabel={ACTION_BUTTON_OBJ[productStatus].label}
      actionColor={ACTION_BUTTON_OBJ[productStatus].color}
    />
  );
}
