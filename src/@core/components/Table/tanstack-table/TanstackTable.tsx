'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useRef, useState } from 'react';

import { TableFooter } from './TableFooter';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export type TDataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onPageSizeChange: (value: string) => void;
  isLoading: boolean;
};

export function TanstackTable<T>({
  data = [],
  columns,
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  isLoading,
}: TDataTableProps<T>) {
  const pageCount = Math.ceil(total / pageSize);
  const [columnWidths, setColumnWidths] = useState<number[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    getSortedRowModel: getSortedRowModel(),
    pageCount,
    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize,
      },
    },
  });

  // Measure header column widths on initial render and window resize
  useEffect(() => {
    const calculateColumnWidths = () => {
      if (headerRef.current) {
        const headerCells = headerRef.current.querySelectorAll('th');
        const widths = Array.from(headerCells).map((cell) => cell.getBoundingClientRect().width);
        setColumnWidths(widths);
      }
    };

    calculateColumnWidths();
    window.addEventListener('resize', calculateColumnWidths);

    return () => {
      window.removeEventListener('resize', calculateColumnWidths);
    };
  }, [columns.length]);

  const handlePageChange = (newPage: number) => {
    onPageChange({ target: { value: newPage } }, newPage);
  };

  return (
    <div className="h-full w-full flex-col justify-start gap-6 overflow-hidden">
      <div className="relative flex flex-col gap-4 px-6">
        <div className="rounded-lg border">
          {/* Table with fixed header structure */}
          <div className="relative">
            {/* Fixed header section */}
            <div className="bg-muted rounded-t-lg" ref={headerRef}>
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id} className="bg-muted">
                          {!header.isPlaceholder &&
                            flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
              </Table>
            </div>

            {/* Scrollable body section */}
            <div className="max-h-[600px] overflow-y-auto">
              <Table>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : table.getRowModel().rows.length > 0 ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell, index) => (
                          <TableCell
                            key={cell.id}
                            style={
                              columnWidths.length > 0
                                ? { width: `${columnWidths[index]}px` }
                                : undefined
                            }
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <TableFooter
          page={page}
          pageSize={pageSize}
          pageCount={pageCount}
          total={total}
          dataLength={data.length}
          onPageSizeChange={onPageSizeChange}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
