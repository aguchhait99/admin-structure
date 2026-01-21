import { useQuery } from '@tanstack/react-query';

import { supplierApplicationKeys } from './key';

import axiosInstance from '@/api/axiosInstance/axiosInstance';
import { endpoints } from '@/api/endpoints/endpoints';

interface SupplierApplicationParams {
  page: number;
  limit: number;
  search?: string;
  status?: string;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
}

interface SupplierApplication {
  _id: string;
  firstName: string;
  lastName: string;
  companyLegalName: string;
  countryOfRegistration: string;
  businessEmail: string;
  businessType: string;
  industries: string[];
  yearsInOperation: string;
  typicalMOQ: string;
  averageOrderSize: string;
  exportInternationally: string;
  status: string;
  createdAt: string;
}

interface SupplierApplicationDetail {
  _id: string;
  companyLegalName: string;
  countryOfRegistration: string;
  businessEmail: string;
  firstName: string;
  lastName: string;
  website: string;
  businessType: string;
  industries: string[];
  yearsInOperation: string;
  typicalMOQ: string;
  averageOrderSize: string;
  mainExportRegions: string[];
  exportInternationally: string;
  canProvideDocumentation: string;
  willingToCompleteKYB: boolean;
  confirmBulkOrders: boolean;
  understandEscrowModel: boolean;
  understandCommission: boolean;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface SupplierApplicationResponse {
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
    docs: SupplierApplication[];
  };
}

interface SupplierApplicationDetailResponse {
  statusCode: number;
  message: string;
  data: SupplierApplicationDetail;
}

export const useGetAllSupplierApplications = (params: SupplierApplicationParams) => {
  return useQuery({
    queryKey: supplierApplicationKeys.list(params),
    queryFn: async (): Promise<SupplierApplicationResponse> => {
      const response = await axiosInstance.post(endpoints.enquiry.supplier.all, params);
      return response.data;
    },
  });
};

export const useGetSupplierApplication = (id: string) => {
  return useQuery({
    queryKey: supplierApplicationKeys.detail(id),
    queryFn: async (): Promise<SupplierApplicationDetailResponse> => {
      const response = await axiosInstance.get(`${endpoints.enquiry.supplier.get}/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useExportSupplierApplicationsCsv = () => {
  return async () => {
    const response = await axiosInstance.get(endpoints.enquiry.supplier.exportCsv, {
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `supplier-applications-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };
};