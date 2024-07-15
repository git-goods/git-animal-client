import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { STATIC_IMAGE_URL } from '@/constants/outlink';
import { Product, getProducts } from '@gitanimals/api';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { LoaderFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { css } from '_panda/css';
import { Flex } from '_panda/jsx';

export const loader: LoaderFunction = async ({ request, params }) => {
  // console.log('request, params: ', request, params);
  const data = await getProducts();
  return json(data);
};

function ActionAllBuyPage() {
  const { products } = useLoaderData<typeof loader>();
  // console.log('products: ', products);

  return (
    <Flex p={4}>
      <Card x-chunk="dashboard-05-chunk-3">
        <CardHeader className="px-7">
          <CardTitle>경매장 일괄 구매</CardTitle>
          <CardDescription>시장 경제 손보다가, 손이 빠질 것 같아여.......</CardDescription>

          <Button mt={4}>일괄 구매</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Price</TableHead>
                <TableHead textAlign="right">Payment State</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product: Product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Checkbox id={product.id} />
                  </TableCell>
                  <TableCell className={imageWrapperStyle}>
                    <Avatar>
                      <AvatarImage src={`${STATIC_IMAGE_URL}/${product.persona.personaType}`} />
                    </Avatar>
                  </TableCell>
                  <TableCell textAlign="center">{product.persona.personaLevel}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.paymentState}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Flex>
  );
}

export default ActionAllBuyPage;

const imageWrapperStyle = css({
  padding: '0',
  '& img': {
    width: '64px',
    height: '64px',
    objectFit: 'cover',
    margin: '0 auto',
  },
});
