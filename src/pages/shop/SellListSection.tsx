import { useGetMyProductsForSellList } from '@/apis/auctions/useGetMyProduct';
import ShopTableBackground from '@/components/ProductTable/ShopTableBackground';
import ShopTableRowView from '@/components/ProductTable/ShopTableRowView';
import { ACTION_BUTTON_OBJ } from '@/constants/action';
import type { ProductItemType } from '@/schema/action';

const SELL_LIST_ACTION_OBJ = ACTION_BUTTON_OBJ['EDIT'];
function SellListSection() {
  const { data } = useGetMyProductsForSellList();

  const onEditAction = (item: ProductItemType) => {
    console.log('onEditAction: ', item);
  };

  return (
    <ShopTableBackground>
      {data?.products.map((product) => {
        return (
          <ShopTableRowView
            key={product.id}
            item={product}
            onAction={onEditAction}
            actionLabel={SELL_LIST_ACTION_OBJ.label}
            actionColor={SELL_LIST_ACTION_OBJ.color}
          />
        );
      })}
    </ShopTableBackground>
  );
}

export default SellListSection;
