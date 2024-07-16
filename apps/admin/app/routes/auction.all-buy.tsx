import ProductDataTable from '@/components/Auction/AllBuy/ProductTable';
import SortFilter from '@/components/Auction/AllBuy/SortFilter';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { getToken } from '@/utils/token';
import { Product, buyProductWithToken, getProducts } from '@gitanimals/api';
import { LoaderFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { Flex } from '_panda/jsx';
import { useState } from 'react';

const INIT_COUNT = 20;

export const loader: LoaderFunction = async ({ request }) => {
  const query = new URL(request.url).searchParams;

  const params = Object.fromEntries(
    Object.entries({
      pageNumber: query.get('pageNumber'),
      personaType: query.get('personaType'),
      count: query.get('count') ?? INIT_COUNT,
      orderType: query.get('orderType') ?? 'PRICE',
      sortDirection: query.get('sortDirection') ?? 'ASC',
    }).filter(([, v]) => v != null),
  );

  const data = await getProducts(params);
  return json({ ...data, tableParams: params });
};

function ActionAllBuyPage() {
  const { products, tableParams } = useLoaderData<typeof loader>();

  // async function parallel(array) {
  //   const promises = array.map((url) => async_download(url));
  //   await Promise.all(promises);
  //   console.log('all done :)');
  // }

  const [isLoading, setIsLoading] = useState(false);
  const onClickAllBuy = async () => {
    setIsLoading(true);
    try {
      const token = getToken();
      if (!token) throw new Error('토큰이 없습니다. 로그인을 해주세요.');

      const promises = products.map((product: Product) => buyProductWithToken({ productId: product.id, token }));
      await Promise.all(promises);
      alert('구매가 완료되었습니다.');

      // remix page reload
      window.location.reload();
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex p={4}>
      <Card x-chunk="dashboard-05-chunk-3">
        <CardHeader className="px-7">
          <CardTitle>경매장 일괄 구매</CardTitle>
          <CardDescription>시장 경제 손보다가, 손이 빠질 것 같아여.......</CardDescription>

          <Button mt={4} onClick={onClickAllBuy} isLoading={isLoading}>
            일괄 구매 (평균{getProductAveragePrice(products)}원, 총 {products?.length}개)
          </Button>
        </CardHeader>
        <CardContent>
          <SortFilter tableParams={tableParams} />
          {products && <ProductDataTable data={products} />}
        </CardContent>
      </Card>
    </Flex>
  );
}

export default ActionAllBuyPage;

const getProductAveragePrice = (products: Product[]) => {
  const total = products.reduce<number>((acc, product) => acc + Number(product.price), 0);
  return total / products.length;
};
