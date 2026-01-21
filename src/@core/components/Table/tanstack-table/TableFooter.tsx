'use client';

import { Icon } from '@iconify-icon/react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
// adjust based on your icon library

interface TableFooterProps {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
  dataLength: number;
  onPageSizeChange: (size: string) => void;
  handlePageChange: (page: number) => void;
}

export const TableFooter: React.FC<TableFooterProps> = ({
  page,
  pageSize,
  pageCount,
  total,
  dataLength,
  onPageSizeChange,
  handlePageChange,
}) => {
  return (
    <div className="flex items-center justify-between px-4">
      <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
        Showing {dataLength > 0 ? (page - 1) * pageSize + 1 : 0} to{' '}
        {Math.min(page * pageSize, total)} of {total} entries
      </div>
      <div className="flex w-full items-center gap-8 lg:w-fit">
        <div className="hidden items-center gap-2 lg:flex">
          <Label htmlFor="rows-per-page" className="text-sm font-medium">
            Rows per page
          </Label>
          <Select value={`${pageSize}`} onValueChange={onPageSizeChange}>
            <SelectTrigger size="sm" className="w-20" id="rows-per-page">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-fit items-center justify-center text-sm font-medium">
          Page {page} of {pageCount || 1}
        </div>
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => handlePageChange(1)}
            disabled={page <= 1}
          >
            <span className="sr-only">Go to first page</span>
            <Icon icon="tabler:chevron-left" height={16} width={16} />
          </Button>
          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
          >
            <span className="sr-only">Go to previous page</span>
            <Icon icon="tabler:chevrons-left" height={16} width={16} />
          </Button>
          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= pageCount}
          >
            <span className="sr-only">Go to next page</span>
            <Icon icon="tabler:chevron-right" height={16} width={16} />
          </Button>
          <Button
            variant="outline"
            className="hidden size-8 lg:flex"
            size="icon"
            onClick={() => handlePageChange(pageCount)}
            disabled={page >= pageCount}
          >
            <span className="sr-only">Go to last page</span>
            <Icon icon="tabler:chevrons-right" height={16} width={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};
