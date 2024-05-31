import { useQueryClient } from '@tanstack/react-query';

import { getProductsQueryKey, useGetProducts } from '@/apis/auctions/useGetProducts';
import { useBuyProduct, useDeleteProduct } from '@/apis/auctions/useProduct';
import ShopTableBackground from '@/components/ProductTable/ShopTableBackground';
import ShopTableRowView from '@/components/ProductTable/ShopTableRowView';
import { useSnackBar } from '@/components/SnackBar/useSnackBar';
import { ACTION_BUTTON_OBJ } from '@/constants/action';
import type { ProductItemType, ProductType } from '@/schema/action';
import { useLoading } from '@/store/loading';
import { useUser } from '@/store/user';

function ProductTable() {
  const myId = useUser()?.id;

  const queryClient = useQueryClient();

  const { showSnackBar } = useSnackBar();
  const { setLoading } = useLoading();

  const { data } = useGetProducts<{ products: ProductType<'MY_SELLING' | 'ON_SALE'>[] }>(
    {},
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
  );
}

export default ProductTable;
