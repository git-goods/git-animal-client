import ProductDataTable from '@/components/Auction/AllBuy/ProductTable';
import SortFilter from '@/components/Auction/AllBuy/SortFilter';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { userToken } from '@/cookies.server';
import { GetProductsResponse, Product, buyProductWithToken, getProducts } from '@gitanimals/api';
import { ActionFunctionArgs, LoaderFunction, json, redirect } from '@remix-run/node';
import { Form, useLoaderData, useSubmit } from '@remix-run/react';

import { Flex } from '_panda/jsx';
import { useEffect, useState } from 'react';

const INIT_COUNT = 20;

const getProductParams = (query: URLSearchParams) => {
  return Object.fromEntries(
    Object.entries({
      pageNumber: query.get('pageNumber'),
      personaType: query.get('personaType'),
      count: query.get('count') ?? INIT_COUNT,
      orderType: query.get('orderType') ?? 'PRICE',
      sortDirection: query.get('sortDirection') ?? 'ASC',
    }).filter(([, v]) => v != null),
  );
};

export const loader: LoaderFunction = async ({ request }) => {
  const query = new URL(request.url).searchParams;

  const params = getProductParams(query);

  const data: GetProductsResponse = await getProducts(params);
  return json({ products: data.products, tableParams: params, query });
};

export async function action({ request }: ActionFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const { token } = (await userToken.parse(cookieHeader)) || {};

  let formData = await request.formData();
  let items = formData.get('products');
  let itemsArray = items ? JSON.parse(items as string) : [];

  try {
    const promises = itemsArray.map((id: string) => buyProductWithToken({ productId: id, token }));
    await Promise.allSettled(promises);

    console.info('buy product success');
  } catch (error) {
    console.error('buy products error');
  }

  return redirect('/auction/all-buy?alert=success');
}

function ActionAllBuyPage() {
  const { products, tableParams, query } = useLoaderData<typeof loader>();

  const submit = useSubmit();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [query]);

  return (
    <Flex p={4}>
      <Card>
        <CardHeader>
          <CardTitle>경매장 일괄 구매</CardTitle>
          <CardDescription>시장 경제 손보다가, 손이 빠질 것 같아여.......</CardDescription>

          <Form
            method="post"
            onSubmit={() => {
              submit(tableParams, { method: 'post', encType: 'application/json' });
              setIsLoading(true);
            }}
          >
            <input type="hidden" name="products" value={JSON.stringify(products?.map((item: Product) => item.id))} />

            <Button mt={4} type="submit" isLoading={isLoading}>
              일괄 구매 (평균{getProductAveragePrice(products)}원, 총 {products?.length}개)
            </Button>
          </Form>
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
