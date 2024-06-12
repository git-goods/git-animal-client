import { useState } from 'react';

import { useGetMyProducts } from '@/apis/auctions/useGetMyProduct';
import Pagination from '@/components/Pagination';
import ShopTableBackground from '@/components/ProductTable/ShopTableBackground';
import ShopTableRowView from '@/components/ProductTable/ShopTableRowView';
import { ACTION_BUTTON_OBJ } from '@/constants/action';
import type { ProductType } from '@/schema/action';
import type { PaginationSchema } from '@/schema/pagination';

import EditModal from './EditModal';

const SELL_LIST_ACTION_OBJ = ACTION_BUTTON_OBJ['EDIT'];

function SellListSection() {
  const [editProductId, setEditProductId] = useState<string>();
  const [currentPage, setCurrentPage] = useState(0);

  const { data } = useGetMyProducts<{ products: ProductType<'EDIT'>[]; pagination: PaginationSchema }>(
    {
      pageNumber: currentPage,
    },
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
    setEditProductId(item.id);
  };

  return (
    <div>
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
          key={editProductId}
          isOpen={Boolean(editProductId)}
          productId={editProductId}
          onClose={() => {
            setEditProductId(undefined);
          }}
        />
      </ShopTableBackground>
      {data && data.pagination.totalPages > 1 && (
        <Pagination {...data.pagination} currentPage={currentPage} onSetPage={setCurrentPage} />
      )}
    </div>
  );
}

export default SellListSection;
