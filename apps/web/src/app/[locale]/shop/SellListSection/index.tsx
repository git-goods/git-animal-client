'use client';

import { useState } from 'react';
import type { Product } from '@gitanimals/api';

import { useGetMyProducts } from '@/apis/auctions/useGetMyProduct';
import Pagination from '@/components/Pagination';
import ShopTableRowView from '@/components/ProductTable/ShopTableRowView';
import { ACTION_BUTTON_OBJ } from '@/constants/action';
import type { ProductType } from '@/schema/action';
import type { PaginationSchema } from '@/schema/pagination';

import { tableCss, tbodyCss, theadCss } from '../AuctionSection/table.styles';

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

  const onEditAction = (id: Product['id']) => {
    setEditProductId(id);
  };

  return (
    <>
      <div className={tableCss}>
        <div className={theadCss}>
          <span>Pet</span>
          <span>Name</span>
          <span>Grade</span>
          <span>Level</span>
          <span>Price</span>
          <span></span>
        </div>

        <div className={tbodyCss}>
          {data?.products.map((product) => {
            return (
              <ShopTableRowView
                key={product.id}
                id={product.id}
                persona={product.persona}
                price={product.price}
                onAction={onEditAction}
                actionLabel={SELL_LIST_ACTION_OBJ.label}
                actionColor={SELL_LIST_ACTION_OBJ.color}
              />
            );
          })}
        </div>
      </div>

      {data && data.pagination.totalPages > 1 && (
        <Pagination {...data.pagination} currentPage={currentPage} onSetPage={setCurrentPage} />
      )}

      <EditModal
        key={editProductId}
        isOpen={Boolean(editProductId)}
        productId={editProductId}
        onClose={() => {
          setEditProductId(undefined);
        }}
      />
    </>
  );
}

export default SellListSection;
