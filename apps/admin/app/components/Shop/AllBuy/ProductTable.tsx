'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';
import { Box, Flex } from '@shadow-panda/styled-system/jsx';
import { icon } from '@shadow-panda/styled-system/recipes';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { STATIC_IMAGE_URL } from '@/constants/outlink';
import { Product } from '@gitanimals/api';

export const columns: ColumnDef<Product>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    // persona
    accessorKey: 'personaType',
    accessorFn: (info) => info.persona.personaType,
    header: 'Image',
    cell: ({ row }) => (
      <div>
        <img
          src={`${STATIC_IMAGE_URL}/${row.getValue('personaType')}`}
          width={48}
          height={48}
          alt={row.getValue('personaType')}
        />
      </div>
    ),
  },
  {
    accessorKey: 'personaLevel',
    accessorFn: (info) => info.persona.personaLevel,
    header: 'Level',
    cell: ({ row }) => <div>level {row.getValue('personaLevel')}</div>,
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => <div className="capitalize">{row.getValue('price')}</div>,
  },
  {
    accessorKey: 'paymentState',
    header: 'Payment State',
    cell: ({ row }) => <div className="capitalize">{row.getValue('paymentState')}</div>,
  },
];

function ProductDataTable({ data }: { data: Product[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <Box w="full">
      <Flex align="center" py="4" gap="2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" ml="auto">
              Columns <ChevronDown className={icon()} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    textTransform="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </Flex>
      <Box rounded="md" border="base">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} h="24" textAlign="center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
      <Flex align="center" justify="flex-end" gap="2" py="4">
        <Box flex="1" textStyle="sm" color="muted.foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </Box>
        <Flex align="center" gap="2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export default ProductDataTable;
