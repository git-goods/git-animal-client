import { useGetProducts } from '@/apis/auctions/useGetProducts';
import ShopTableBackground from '@/components/ProductTable/ShopTableBackground';
import ShopTableRowView from '@/components/ProductTable/ShopTableRowView';
import { ACTION_BUTTON_OBJ } from '@/constants/action';
import type { ProductItemType, ProductType } from '@/schema/action';
import { useUser } from '@/store/user';

function ProductTable() {
  const myId = useUser()?.id;

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

  const onAction = (item: ProductItemType) => {
    console.log('onAction: ', item);
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
