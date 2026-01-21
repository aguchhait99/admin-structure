export const contactUsKeys = {
  all: (params: unknown) => ['contact-us', 'list', params] as const,
  detail: (id: string) => ['contact-us', 'detail', id] as const,
};


