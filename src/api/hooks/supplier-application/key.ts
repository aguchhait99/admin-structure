export const supplierApplicationKeys = {
  all: ['supplier-applications'] as const,
  lists: () => [...supplierApplicationKeys.all, 'list'] as const,
  list: (params: any) => [...supplierApplicationKeys.lists(), params] as const,
  details: () => [...supplierApplicationKeys.all, 'detail'] as const,
  detail: (id: string) => [...supplierApplicationKeys.details(), id] as const,
};