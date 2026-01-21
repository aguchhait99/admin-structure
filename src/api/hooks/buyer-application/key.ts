export const buyerApplicationKeys = {
  all: ['buyer-applications'] as const,
  lists: () => [...buyerApplicationKeys.all, 'list'] as const,
  list: (params: any) => [...buyerApplicationKeys.lists(), params] as const,
  details: () => [...buyerApplicationKeys.all, 'detail'] as const,
  detail: (id: string) => [...buyerApplicationKeys.details(), id] as const,
};