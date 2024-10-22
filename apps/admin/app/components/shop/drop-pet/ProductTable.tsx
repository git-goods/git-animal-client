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
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { STATIC_IMAGE_URL } from '@/constants/outlink';
import { BuyProductRequest, buyProductWithToken, Persona } from '@gitanimals/api';
import { Box, Flex } from '_panda/jsx';
import { getToken } from '@/utils/token';
import { useMutation } from '@tanstack/react-query';

function ProductBuyButton({ productId }: { productId: string }) {
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: (request: BuyProductRequest) => {
      const token = getToken();
      if (!token) throw new Error('Token not found');

      return buyProductWithToken({ ...request, token });
    },
  });

  const onClick = async () => {
    mutate({ productId });
  };

  return (
    <Button onClick={onClick} variant="outline" isLoading={isPending}>
      {isSuccess ? 'succuss' : '판매'}
    </Button>
  );
}

export const columns: ColumnDef<Persona>[] = [
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
    accessorKey: 'type',
    header: 'type',
    cell: ({ row }) => (
      <div>
        <img src={`${STATIC_IMAGE_URL}/${row.getValue('type')}`} width={48} height={48} alt={row.getValue('type')} />
      </div>
    ),
  },
  {
    accessorKey: 'level',
    header: 'level',
    cell: ({ row }) => <div>level {row.getValue('level')}</div>,
  },
  {
    accessorKey: 'dropRate',
    header: 'dropRate',
    cell: ({ row }) => <div className="capitalize">{row.getValue('dropRate')}</div>,
  },
  {
    accessorKey: 'actions',
    header: () => <Box minW={32}>Actions</Box>,
    cell: ({ row }) => <ProductBuyButton productId={row.original.id} />,
  },
];

function ProductDataTable({ data }: { data: Persona[] }) {
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
      <Flex align="center" py="4" gap="2"></Flex>
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
