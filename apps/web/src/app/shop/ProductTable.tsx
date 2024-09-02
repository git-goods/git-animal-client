'use client';

import { useEffect, useState } from 'react';
import { css } from '_panda/css';
import { center, flex } from '_panda/patterns';
import type { Product, ProductOrderType, ProductSortDirection } from '@gitanimals/api';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getProductsQueryKey, useGetProducts } from '@/apis/auctions/useGetProducts';
import { useBuyProduct, useDeleteProduct } from '@/apis/auctions/useProduct';
import DottedThreeBox from '@/components/DottedBox/DottedThreeBox';
import Pagination from '@/components/Pagination';
import ShopTableBackground from '@/components/ProductTable/ShopTableBackground';
import ShopTableRowView from '@/components/ProductTable/ShopTableRowView';
import { ACTION_BUTTON_OBJ } from '@/constants/action';
import { useLoading } from '@/store/loading';
import { useClientUser } from '@/utils/clientAuth';

import OrderTypeSelect from './SearchOption/OrderType';
import Search from './SearchOption/PersonaType';

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
      <div className={flex({ gap: '4px', mb: '8px', alignItems: 'center' })}>
        <Search
          onSelect={(option) => onSearchOptionChange('personaType', option)}
          selected={searchOptions.personaType}
        />
        <hr className={css({ mx: '6px' })} />

        <p>order :</p>
        <OrderTypeSelect onSelect={(option) => onSearchOptionChange('orderType', option)} />
        {/* <DottedThreeBox width={110} height={54} bgColor="white">
          <select className={selectStyle} onChange={(e) => onSearchOptionChange('orderType', e.target.value)}>
            <option value="PRICE">Price</option>
            <option value="CREATED_AT">Date</option>
            <option value="LEVEL">Level</option>
          </select>
        </DottedThreeBox> */}
        <DottedThreeBox width={160} height={54} bgColor="white">
          <select className={selectStyle} onChange={(e) => onSearchOptionChange('sortDirection', e.target.value)}>
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
          </select>
        </DottedThreeBox>
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

const selectStyle = center({
  width: '100%',
  height: '100%',
  padding: '0 8px',
  border: 'none',
  backgroundColor: 'transparent',
  outline: 'none',
});

const useSearchOptions = () => {
  const [searchOptions, setSearchOptions] = useState<{
    personaType: string;
    orderType: ProductOrderType;
    sortDirection: ProductSortDirection;
  }>({
    personaType: '',
    orderType: 'PRICE',
    sortDirection: 'ASC',
  });

  const onSearchOptionChange = (key: keyof typeof searchOptions, value?: string) => {
    setSearchOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return { searchOptions, onSearchOptionChange };
};

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
