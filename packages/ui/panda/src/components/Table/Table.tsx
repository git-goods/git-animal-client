import * as React from 'react';
import { styled } from '_panda/jsx';

const TableContainer = styled('div', {});

const BaseTable = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>((props, ref) => (
  <TableContainer>
    <table ref={ref} {...props} />
  </TableContainer>
));
BaseTable.displayName = 'Table';

const TableRoot = styled('table', {
  base: {
    width: '100%',
    borderSpacing: '0 4px',
    borderCollapse: 'separate',
  },
});

const TableHeader = styled('thead', {
  base: {
    backgroundColor: 'white_50',
  },
});

const TableBody = styled('tbody', {
  base: {
    // backgroundColor: 'white_10',
    '& > tr': {
      height: '80px',
    },
  },
});
const TableFooter = styled('tfoot', {});
const TableHead = styled('th', {
  base: {
    color: 'white_100',
    textStyle: 'glyph18.bold',
    textAlign: 'left',
    padding: '12px 16px',
    _first: {
      paddingLeft: '44px',
      borderRadius: '8px 0 0 8px',
    },
    _last: {
      paddingRight: '44px',
      borderRadius: '0 8px 8px 0',
    },
  },
});
const TableRow = styled('tr', {
  base: {
    transition: 'colors',
    _hover: {
      bg: 'white_10',
    },
    '&.empty': {
      _hover: {
        bg: 'transparent',
      },
    },
  },
});
const TableCell = styled('td', {
  base: {
    color: 'white_100',
    backgroundColor: 'white_10',
    verticalAlign: 'middle',
    padding: '12px 16px',
    textStyle: 'glyph20.regular',
    _first: {
      paddingLeft: '44px',
      borderRadius: '8px 0 0 8px',
    },
    _last: {
      borderRadius: '0 8px 8px 0',
      paddingRight: '44px',
    },
  },
});
const TableCaption = styled('caption', {});

export const Table = Object.assign(TableRoot, {
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Head: TableHead,
  Row: TableRow,
  Cell: TableCell,
  Caption: TableCaption,
});
