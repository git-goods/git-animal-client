import { useGetProducts } from '@/apis/auctions/useGetProducts';

import ShopTable from './ShopTable';

function ProductTable() {
  const { data } = useGetProducts();

  return <ShopTable list={data?.products ?? []} />;
}

export default ProductTable;
