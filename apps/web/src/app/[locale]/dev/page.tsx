import { css } from '_panda/css';
import { Box } from '_panda/jsx';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Table } from '@gitanimals/ui-panda';

import GNB from '@/components/GNB/GNB';

import DevClient from './Client';

async function DevPage() {
  return (
    <Box p={32}>
      <GNB />
      <h1>server</h1>
      <div style={{ background: 'green', padding: '16px' }}>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head>Name</Table.Head>
              <Table.Head>Age</Table.Head>
              <Table.Head>Age2</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>John</Table.Cell>
              <Table.Cell>25</Table.Cell>
              <Table.Cell>25</Table.Cell>
            </Table.Row>
          </Table.Body>
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
