import { defineRecipe } from '@pandacss/dev';

const tableContainer = defineRecipe({
  className: 'tableContainer',
  description: 'Styles for the TableContainer component',
  base: {},
});

const table = defineRecipe({
  className: 'table',
  description: 'Styles for the Table component',
  base: {},
});

const tableHeader = defineRecipe({
  className: 'tableHeader',
  description: 'Styles for the TableHeader component',
  base: {
    backgroundColor: 'white_50',
  },
});

const tableBody = defineRecipe({
  className: 'tableBody',
  description: 'Styles for the TableBody component',
  base: {
    backgroundColor: 'white_10',
  },
});

const tableFooter = defineRecipe({
  className: 'tableFooter',
  description: 'Styles for the TableFooter component',
  base: {},
});

const tableRow = defineRecipe({
  className: 'tableRow',
  description: 'Styles for the TableRow component',
  base: {
    transition: 'colors',
    _hover: {
      bg: 'white_10',
    },
  },
});

const tableHead = defineRecipe({
  className: 'tableHead',
  description: 'Styles for the TableHead component',
  base: {
    color: 'white_100',
    textStyle: 'glyph18.bold',
    padding: '12px 8px',
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

const tableCell = defineRecipe({
  className: 'tableCell',
  description: 'Styles for the TableCell component',
  base: {
    color: 'white_100',
    verticalAlign: 'middle',
    padding: '12px 8px',
    textStyle: 'glyph20.regular',
    _first: {
      paddingLeft: '44px',
      borderRadius: '0 8px 8px 0',
    },
    _last: {
      paddingRight: '44px',
      borderRadius: '8px 0 0 8px',
    },
  },
});

const tableCaption = defineRecipe({
  className: 'tableCaption',
  description: 'Styles for the TableCaption component',
  base: {},
});

export const tableRecipe = {
  tableContainer,
  table,
  tableHeader,
  tableBody,
  tableFooter,
  tableRow,
  tableHead,
  tableCell,
  tableCaption,
};
