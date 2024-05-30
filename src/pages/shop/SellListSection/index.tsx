import { useState } from 'react';

import { useGetMyProducts } from '@/apis/auctions/useGetMyProduct';
import ShopTableBackground from '@/components/ProductTable/ShopTableBackground';
import ShopTableRowView from '@/components/ProductTable/ShopTableRowView';
import { ACTION_BUTTON_OBJ } from '@/constants/action';
import type { ProductType } from '@/schema/action';

import EditModal from './EditModal';

const SELL_LIST_ACTION_OBJ = ACTION_BUTTON_OBJ['EDIT'];

function SellListSection() {
  const [editProductId, setEditProductId] = useState<string>();
  const { data } = useGetMyProducts<{ products: ProductType<'EDIT'>[] }>(
    {},
    {
      select: (data) => ({
        ...data,
        products: data.products.map((product) => {
          return { ...product, paymentState: 'EDIT' };
        }),
      }),
    },
  );

  const onEditAction = (item: ProductType) => {
    console.log('onEditAction: ', item);
    setEditProductId(item.id);
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
      <EditModal
        isOpen={Boolean(editProductId)}
        productId={editProductId}
        onClose={() => {
          setEditProductId(undefined);
        }}
      />
    </ShopTableBackground>
  );
}

export default SellListSection;
