export type TCommonSchema = {
  BaseApiResponse: {
    statusCode: number;
    message: string;
  };
  BaseApiErrorResponse: {
    statusCode: number;
    message: string;
    error: string;
  };
  BaseApiPaginationPayload: {
    page: number;
    limit?: number;
    search?: string;
    status?: string;
    sortField: string;
    sortOrder: string;
    role?: string;
  };
  BaseMetaResponse: {
    totalDocs: number;
    skip: number;
    page: number;
    limit: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: unknown;
    nextPage: unknown;
  };
};
