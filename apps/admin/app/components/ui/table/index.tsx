import { styled } from '_panda/jsx';
import {
  tableContainer,
  table,
  tableHeader,
  tableBody,
  tableFooter,
  tableHead,
  tableRow,
  tableCell,
  tableCaption,
} from '_panda/recipes';
import { forwardRef, HTMLAttributes } from 'react';

const TableContainer = styled('div', tableContainer);

const BaseTable = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>((props, ref) => (
  <TableContainer>
    <table ref={ref} {...props} />
  </TableContainer>
));
BaseTable.displayName = 'Table';

export const Table = styled(BaseTable, table);
export const TableHeader = styled('thead', tableHeader);
export const TableBody = styled('tbody', tableBody);
export const TableFooter = styled('tfoot', tableFooter);
export const TableHead = styled('th', tableHead);
export const TableRow = styled('tr', tableRow);
export const TableCell = styled('td', tableCell);
export const TableCaption = styled('caption', tableCaption);
