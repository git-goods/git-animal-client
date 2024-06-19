import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { getProductsQueryKey, useGetProducts } from '@/apis/auctions/useGetProducts';
import { useBuyProduct, useDeleteProduct } from '@/apis/auctions/useProduct';
import Pagination from '@/components/Pagination';
import ShopTableBackground from '@/components/ProductTable/ShopTableBackground';
import ShopTableRowView from '@/components/ProductTable/ShopTableRowView';
import { useSnackBar } from '@/components/SnackBar/useSnackBar';
import { ACTION_BUTTON_OBJ } from '@/constants/action';
import type { ProductItemType, ProductType } from '@/schema/action';
import type { PaginationSchema } from '@/schema/pagination';
import { useLoading } from '@/store/loading';
import { useUser } from '@/store/user';

interface ProductTableProps {
  searchPersona?: string;
}

function ProductTable({ searchPersona }: ProductTableProps) {
  const myId = useUser()?.id;

  const queryClient = useQueryClient();

  const { showSnackBar } = useSnackBar();
  const { setLoading } = useLoading();

  const [currentPage, setCurrentPage] = useState(0);

  const { data } = useGetProducts<{ products: ProductType<'MY_SELLING' | 'ON_SALE'>[]; pagination: PaginationSchema }>(
    {
      pageNumber: currentPage,
      personaType: searchPersona,
    },
    {
      enabled: Boolean(myId),
      select: (data) => {
        const products = data?.products || [];
        return {
          products: products.map((product) => {
            if (product.sellerId === myId) {
              return { ...product, paymentState: 'MY_SELLING' };
            }
            return product;
          }),
          pagination: data?.pagination,
        };
      },
    },
  );

  const { mutate: buyProduct } = useBuyProduct({
    onSuccess: () => {
      showSnackBar({ message: '구매가 완료되었습니다!!' });
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
      showSnackBar({ message: '판매 취소가 완료되었습니다!!' });
      queryClient.invalidateQueries({
        queryKey: getProductsQueryKey(),
      });
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const onAction = (item: ProductItemType) => {
    setLoading(true);

    if (item.paymentState === 'ON_SALE') {
      buyProduct(item.id);
    }
    if (item.paymentState === 'MY_SELLING') {
      deleteProduct(item.id);
    }
  };

  return (
    <div>
      <ShopTableBackground>
        {data?.products.map((product) => {
          return (
            <ShopTableRowView
              key={product.id}
              item={product}
              onAction={onAction}
              actionLabel={ACTION_BUTTON_OBJ[product.paymentState].label}
              actionColor={ACTION_BUTTON_OBJ[product.paymentState].color}
            />
          );
        })}
      </ShopTableBackground>
      {data && <Pagination {...data.pagination} currentPage={currentPage} onSetPage={setCurrentPage} />}
    </div>
  );
}

export default ProductTable;
