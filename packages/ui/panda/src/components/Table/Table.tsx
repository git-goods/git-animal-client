import { styled } from '_panda/jsx';
import {
  tableContainer,
  tableHeader,
  tableBody,
  tableFooter,
  tableHead,
  tableRow,
  tableCell,
  tableCaption,
  table,
} from '_panda/recipes';
import * as React from 'react';

const TableContainer = styled('div', tableContainer);

const BaseTable = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>((props, ref) => (
  <TableContainer>
    <table ref={ref} {...props} />
  </TableContainer>
));
BaseTable.displayName = 'Table';

const TableRoot = styled(BaseTable, table);
const TableHeader = styled('thead', tableHeader);
const TableBody = styled('tbody', tableBody);
const TableFooter = styled('tfoot', tableFooter);
const TableHead = styled('th', tableHead);
const TableRow = styled('tr', tableRow);
const TableCell = styled('td', tableCell);
const TableCaption = styled('caption', tableCaption);

export const Table = Object.assign(TableRoot, {
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Head: TableHead,
  Row: TableRow,
  Cell: TableCell,
  Caption: TableCaption,
});
