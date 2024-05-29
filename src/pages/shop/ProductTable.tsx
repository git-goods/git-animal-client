import { useGetProductForProductList } from '@/apis/auctions/useGetProducts';
import { ACTION_BUTTON_OBJ } from '@/constants/action';
import type { ProductItemType } from '@/schema/action';

import ShopTableBackground from './ShopTableBackground';
import ShopTableRowView from './ShopTableRowView';

function ProductTable() {
  const { data } = useGetProductForProductList();

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
