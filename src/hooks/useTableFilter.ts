'use client';

import { SortingState } from '@tanstack/react-table';
import { useDebounce } from 'ahooks';
import { useCallback, useState } from 'react';

interface useTableFiltersProps<T extends object> {
  extraPayload: T;
}
type BasePayload = {
  page: number;
  limit: number;
  search: string;
  sortField: string;
  sortOrder: string;
  status?: string;
  category?: string;
};

const useTableFilters = <T extends object>({ extraPayload }: useTableFiltersProps<T>) => {
  console.info('useTableFilters');
  const [search, setSearch] = useState('');

  const [filters, setFilters] = useState<Record<string, string>>({
    status: '',
    category: '',
    startDate: '',
    endDate: '',
    price: '',
  });

  const debouncedSearchVal = useDebounce(search.trim(), {
    wait: 500,
  });

  const [payload, setPayload] = useState<BasePayload & T>({
    page: 1,
    limit: 10,
    search: '',
    sortField: '',
    sortOrder: 'desc',

    ...extraPayload,
  });

  const handleSearch = useCallback((val: string) => {
    setSearch(val.toLowerCase());
  }, []);

  const handleFilterChange = useCallback((name: string, value: string) => {
    console.info('handleFilterChange', name, value);
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const onSortModelChange = (newModel: SortingState) => {
    if (newModel.length) {
      setPayload({
        ...payload,
        sortField: newModel[0].id,
        sortOrder: newModel[0].desc ? 'desc' : 'asc',
      });
    } else {
      setPayload({
        ...payload,
        sortField: '',
        sortOrder: 'desc',
      });
    }
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPayload({
      ...payload,
      page: newPage,
    });
  };

  const handleChangeRowsPerPage = (value: string) => {
    setPayload({
      ...payload,
      limit: parseInt(value, 10),
      page: 1,
    });
  };

  const finalPayload = {
    ...payload,
    search: debouncedSearchVal,
    ...(filters.status && { status: filters.status }),
    ...(filters.categoryId && { categoryId: filters.categoryId }),
    ...(filters.endDate && { maxEndDate: filters.endDate }),
    ...(filters.startDate && { minStartDate: filters.startDate }),
    ...(filters.price && { price: filters.price }),
  };

  return {
    handleChangePage,
    handleChangeRowsPerPage,
    search,
    onSortModelChange,
    handleSearch,
    handleFilterChange,
    payload: finalPayload,
    setPayload,
    status: filters.status,
    category: filters.category,
    endDate: filters.endDate,
    startDate: filters.startDate,
    price: filters.price,
  };
};

export default useTableFilters;
