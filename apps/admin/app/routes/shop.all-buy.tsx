import ProductDataTable from '@/components/Shop/ProductTable';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { getProducts } from '@gitanimals/api';
import { LoaderFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { css } from '_panda/css';

import { Flex } from '_panda/jsx';

export const loader: LoaderFunction = async ({ request, params }) => {
  const data = await getProducts();
  return json(data);
};

function ActionAllBuyPage() {
  const { products } = useLoaderData<typeof loader>();
  console.log('products: ', products);

  return (
    <Flex p={4}>
      <Card x-chunk="dashboard-05-chunk-3">
        <CardHeader className="px-7">
          <CardTitle>경매장 일괄 구매</CardTitle>
          <CardDescription>시장 경제 손보다가, 손이 빠질 것 같아여.......</CardDescription>

          <Button mt={4}>일괄 구매</Button>
        </CardHeader>
        <CardContent>{products && <ProductDataTable data={products} />}</CardContent>
      </Card>
    </Flex>
  );
}

export default ActionAllBuyPage;
