import { useMySellHistory } from '@/apis/auctions/useGetHistory';
import ShopTableBackground from '@/components/ProductTable/ShopTableBackground';
import ShopTableRowView from '@/components/ProductTable/ShopTableRowView';
import { ACTION_BUTTON_OBJ } from '@/constants/action';
import type { ProductHistoryType, ProductItemType } from '@/schema/action';

const HISTORY_ACTION_OBJ = ACTION_BUTTON_OBJ['SELL_HISTORY'];

function HistoryTable() {
  const { data } = useMySellHistory();

  const onAction = (item: ProductItemType) => {
    console.log('onAction: ', item);
  };

  const getHistoryActionLabel = (soldAt: string) => {
    return soldAt?.slice(2, 10).replace(/-/g, '.');
  };

  return (
    <ShopTableBackground>
      {data?.products.map((product) => {
        return (
          <ShopTableRowView
            key={product.id}
            item={product}
            onAction={onAction}
            actionLabel={getHistoryActionLabel((product as ProductHistoryType)?.receipt.soldAt)}
            actionColor={HISTORY_ACTION_OBJ.color}
          />
        );
      })}
    </ShopTableBackground>
  );
}

export default HistoryTable;
