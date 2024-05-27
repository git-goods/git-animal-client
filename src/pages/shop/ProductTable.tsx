import { useGetProductForProductList } from '@/apis/auctions/useGetProducts';

import ShopTable from './ShopTable';

function ProductTable() {
  const { data } = useGetProductForProductList();

  return <ShopTable list={data?.products ?? []} />;
}

export default ProductTable;
