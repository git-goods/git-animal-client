import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getProducts } from '@gitanimals/api';
import { Flex } from '_panda/jsx';
import { useEffect } from 'react';

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
];
function ActionAllBuyPage() {
  useEffect(() => {
    getProducts().then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <Flex p={4}>
      <Card x-chunk="dashboard-05-chunk-3">
        <CardHeader className="px-7">
          <CardTitle>Orders</CardTitle>
          <CardDescription>Recent orders from your store.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead w="100px">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead textAlign="right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell fontWeight="medium">{invoice.invoice}</TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell textAlign="right">{invoice.totalAmount}</TableCell>
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
