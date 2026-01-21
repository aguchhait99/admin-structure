import { useQuery } from '@tanstack/react-query';

import { contactUsKeys } from './key';

import axiosInstance from '@/api/axiosInstance/axiosInstance';
import { endpoints } from '@/api/endpoints/endpoints';

export interface ContactUsListParams {
    page: number;
    limit: number;
    search?: string;
    status?: string;
    type?: 'Buyer' | 'Seller' | string;
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface ContactUsItem {
    _id: string;
    type: 'Buyer' | 'Seller' | string;
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
    status: string;
    createdAt: string;
}

export interface ContactUsDetail extends ContactUsItem {
    isDeleted: boolean;
    updatedAt: string;
}

interface ContactUsListResponse {
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
        docs: ContactUsItem[];
    };
}

interface ContactUsDetailResponse {
    statusCode: number;
    message: string;
    data: ContactUsDetail;
}

export const useGetAllContactUs = (params: ContactUsListParams) => {
  return useQuery<ContactUsListResponse>({
    queryKey: contactUsKeys.all(params),
    queryFn: async () => {
      const response = await axiosInstance.post(endpoints.cms.contactUs.all, params);
      return response.data;
    },
  });
};

export const useGetContactUs = (id: string) => {
  return useQuery<ContactUsDetailResponse>({
    queryKey: contactUsKeys.detail(id),
    queryFn: async () => {
      const response = await axiosInstance.get(`${endpoints.cms.contactUs.get}/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useExportContactUsCsv = () => {
  return async () => {
    const response = await axiosInstance.get(endpoints.cms.contactUs.exportCsv, {
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `contact-us-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };
};
