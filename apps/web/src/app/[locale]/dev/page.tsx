import { css } from '_panda/css';
import { Box } from '_panda/jsx';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from '@gitanimals/ui-panda';

import GNB from '@/components/GNB/GNB';

import DevClient from './Client';

async function DevPage() {
  return (
    <Box p={32}>
      <GNB />
      <h1>server</h1>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </div>
      <hr className={dividerStyle} />
      <h1>client</h1>
      <DevClient />
      <Accordion type="single" collapsible w="full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>Yes. It&apos;s animated by default, but you can disable it if you prefer.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}

export default DevPage;

const dividerStyle = css({
  margin: '24px 0',
});
