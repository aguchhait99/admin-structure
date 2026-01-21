import { useQuery } from '@tanstack/react-query';

import { buyerApplicationKeys } from './key';

import axiosInstance from '@/api/axiosInstance/axiosInstance';
import { endpoints } from '@/api/endpoints/endpoints';

interface BuyerApplicationParams {
  page: number;
  limit: number;
  search?: string;
  status?: string;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
}

interface BuyerApplication {
  _id: string;
  firstName: string;
  lastName: string;
  companyLegalName: string;
  countryOfOperation: string;
  businessEmail: string;
  roleInCompany: string;
  businessType: string;
  productsToSource: string;
  typicalOrderSize: string;
  purchaseFrequency: string;
  status: string;
  createdAt: string;
}

interface BuyerApplicationDetail {
  _id: string;
  companyLegalName: string;
  countryOfOperation: string;
  businessEmail: string;
  firstName: string;
  lastName: string;
  website: string;
  roleInCompany: string;
  businessType: string;
  productsToSource: string;
  typicalOrderSize: string;
  purchaseFrequency: string;
  countriesSourceFrom: string[];
  confirmBulkTrade: boolean;
  confirmRykenReviews: boolean;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface BuyerApplicationDetailResponse {
  statusCode: number;
  message: string;
  data: BuyerApplicationDetail;
}
interface BuyerApplicationResponse {
  statusCode: number;
  message: string;
  data: {
    meta: {
      totalDocs: number;
      skip: number;
      page: number;
      limit: number;
      hasPrevPage: boolean;
      hasNextPage: boolean;
      prevPage: number | null;
      nextPage: number | null;
    };
    docs: BuyerApplication[];
  };
}

export const useGetAllBuyerApplications = (params: BuyerApplicationParams) => {
  return useQuery({
    queryKey: buyerApplicationKeys.list(params),
    queryFn: async (): Promise<BuyerApplicationResponse> => {
      const response = await axiosInstance.post(endpoints.enquiry.buyer.all, params);
      return response.data;
    },
  });
};

export const useGetBuyerApplication = (id: string) => {
  return useQuery({
    queryKey: buyerApplicationKeys.detail(id),
    queryFn: async (): Promise<BuyerApplicationDetailResponse> => {
      const response = await axiosInstance.get(`${endpoints.enquiry.buyer.get}/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useExportBuyerApplicationsCsv = () => {
  return async () => {
    const response = await axiosInstance.get(endpoints.enquiry.buyer.exportCsv, {
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `buyer-applications-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };
};