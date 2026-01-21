import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { FaqCategoryQueryEnum, FaqQueryEnum } from './key';
import { TFaqCategoryModel, TFaqModel } from './schema';

import axiosInstance from '@/api/axiosInstance/axiosInstance';
import { endpoints } from '@/api/endpoints/endpoints';
import { TCommonSchema } from '@/types/common/common.schema';

export const useGetAllFaq = (payload: TCommonSchema['BaseApiPaginationPayload']) => {
  return useQuery<TFaqModel['getAllFaqSuccessResponse'], Error>({
    queryKey: [FaqQueryEnum.FaqAll, JSON.stringify(payload)],
    queryFn: async () => {
      const res = await axiosInstance.post<TFaqModel['getAllFaqSuccessResponse']>(
        endpoints.faq.faq.all,
        payload,
      );

      return res?.data;
    },
  });
};
export const useGetFaq = (id: string) => {
  return useQuery<TFaqModel['getFaqResponseById'], Error>({
    queryKey: [FaqQueryEnum.FaqGet, id],
    queryFn: async () => {
      const res = await axiosInstance.get<TFaqModel['getFaqResponseById']>(
        `${endpoints.faq.faq.get}/${id}`,
      );

      return res?.data;
    },
    enabled: !!id,
  });
};

export const useFaqUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation<TFaqModel['getFaqResponseById'], Error, TFaqModel['IFaqUpdatePayload']>({
    mutationKey: [FaqQueryEnum.FaqUpdate],
    mutationFn: async (payload: TFaqModel['IFaqUpdatePayload']) => {
      const res = await axiosInstance.patch<TFaqModel['getFaqResponseById']>(
        `${endpoints.faq.faq.update}/${payload.id}`,
        { question: payload.question, answer: payload.answer },
      );

      return res?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [FaqQueryEnum.FaqAll],
      });
    },
  });
};

export const useFaqDelete = () => {
  const queryClient = useQueryClient();

  return useMutation<TFaqModel['IFaqDeleteResponse'], Error, string>({
    mutationKey: [FaqQueryEnum.FaqDelete],
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete<TFaqModel['IFaqDeleteResponse']>(
        `${endpoints.faq.faq.delete}/${id}`,
      );

      return res?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [FaqQueryEnum.FaqAll],
      });
    },
  });
};

export const useFaqSave = () => {
  const queryClient = useQueryClient();

  return useMutation<TFaqModel['getFaqResponseById'], Error, TFaqModel['IFaqSavePayload']>({
    mutationKey: [FaqQueryEnum.FaqSave],
    mutationFn: async (payload: TFaqModel['IFaqSavePayload']) => {
      const res = await axiosInstance.post<TFaqModel['getFaqResponseById']>(
        endpoints.faq.faq.create,
        payload,
      );

      return res?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [FaqQueryEnum.FaqAll],
      });
    },
  });
};
export const useFaqStatusChange = () => {
  const queryClient = useQueryClient();

  return useMutation<TFaqModel['getFaqResponseById'], Error, TFaqModel['IFaqStatusChangePayload']>({
    mutationKey: [FaqQueryEnum.useFaqStatusChange],
    mutationFn: async (payload: TFaqModel['IFaqStatusChangePayload']) => {
      const res = await axiosInstance.patch<TFaqModel['getFaqResponseById']>(
        `${endpoints.faq.faq.status}/${payload.id}`,
        { status: payload.status },
      );

      return res?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [FaqQueryEnum.FaqAll],
      });
    },
  });
};

export const useGetAllFaqCategories = (payload: TCommonSchema['BaseApiPaginationPayload']) => {
  return useQuery<TFaqCategoryModel['getAllFaqCategorySuccessResponse'], Error>({
    queryKey: [FaqCategoryQueryEnum.FaqAll, JSON.stringify(payload)],
    queryFn: async () => {
      const res = await axiosInstance.post<TFaqCategoryModel['getAllFaqCategorySuccessResponse']>(
        endpoints.faq.category.all,
        payload,
      );

      return res?.data;
    },
  });
};

export const useFaqCategorySave = () => {
  const queryClient = useQueryClient();

  return useMutation<
    TFaqCategoryModel['getFaqCategoryResponseById'],
    Error,
    TFaqCategoryModel['IFaqCategorySavePayload']
  >({
    mutationKey: [FaqCategoryQueryEnum.FaqSave],
    mutationFn: async (payload: TFaqCategoryModel['IFaqCategorySavePayload']) => {
      const res = await axiosInstance.post<TFaqCategoryModel['getFaqCategoryResponseById']>(
        endpoints.faq.category.create,
        payload,
      );

      return res?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [FaqQueryEnum.FaqAll],
      });
    },
  });
};

export const useFaqCategoryUpdate = () => {
  return useMutation<
    TFaqCategoryModel['getFaqCategoryResponseById'],
    Error,
    TFaqCategoryModel['IFaqCategoryUpdatePayload']
  >({
    mutationKey: [FaqCategoryQueryEnum.FaqUpdate],
    mutationFn: async (payload: TFaqCategoryModel['IFaqCategoryUpdatePayload']) => {
      const res = await axiosInstance.patch<TFaqCategoryModel['getFaqCategoryResponseById']>(
        `${endpoints.faq.category.update}/${payload.id}`,
        { name: payload.name },
      );

      return res?.data;
    },
  });
};

export const useGetFaqCategory = (id: string) => {
  return useQuery<TFaqCategoryModel['getFaqCategoryResponseById'], Error>({
    queryKey: [FaqCategoryQueryEnum.FaqGet, id],
    queryFn: async () => {
      const res = await axiosInstance.get<TFaqCategoryModel['getFaqCategoryResponseById']>(
        `${endpoints.faq.category.get}/${id}`,
      );

      return res?.data;
    },
    enabled: !!id,
  });
};

export const useFaqCategoryDelete = () => {
  const queryClient = useQueryClient();

  return useMutation<TFaqCategoryModel['IFaqCategoryDeleteResponse'], Error, string>({
    mutationKey: [FaqCategoryQueryEnum.FaqDelete],
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete<TFaqCategoryModel['IFaqCategoryDeleteResponse']>(
        `${endpoints.faq.category.delete}/${id}`,
      );

      return res?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [FaqCategoryQueryEnum.FaqAll],
      });
    },
  });
};

export const useFaqCategoryStatusChange = () => {
  const queryClient = useQueryClient();

  return useMutation<
    TFaqCategoryModel['getFaqCategoryResponseById'],
    Error,
    TFaqCategoryModel['IFaqCategoryStatusChangePayload']
  >({
    mutationKey: [FaqCategoryQueryEnum.useFaqStatusChange],
    mutationFn: async (payload: TFaqCategoryModel['IFaqCategoryStatusChangePayload']) => {
      const res = await axiosInstance.patch<TFaqCategoryModel['getFaqCategoryResponseById']>(
        `${endpoints.faq.category.status}/${payload.id}`,
        { status: payload.status },
      );

      return res?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [FaqQueryEnum.FaqAll],
      });
    },
  });
};

export const faqService = {
  useGetAllFaq,
  useFaqSave,
  useFaqUpdate,
  useGetFaq,
  useFaqDelete,
  useFaqStatusChange,
  useGetAllFaqCategories,
  useFaqCategorySave,
  useFaqCategoryUpdate,
  useGetFaqCategory,
  useFaqCategoryDelete,
  useFaqCategoryStatusChange,
};
