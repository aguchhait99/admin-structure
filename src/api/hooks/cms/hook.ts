import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { CmsQueryEnum } from './key';
import { getCmsResponseById, IStatusChangePayload, IUpdatePayload } from './schema';

import axiosInstance from '@/api/axiosInstance/axiosInstance';
import { endpoints } from '@/api/endpoints/endpoints';
import { TCommonSchema } from '@/types/common/common.schema';

export const useGetAllCms = (payload: TCommonSchema['BaseApiPaginationPayload']) => {
  return useQuery({
    queryKey: [CmsQueryEnum.CmsAll, JSON.stringify(payload)],
    queryFn: async () => {
      const res = await axiosInstance.post(
        endpoints.cms.all,
        payload,
      );
      return res?.data;
    },
  });
};

export const useGetCms = (id: string) => {
  return useQuery({
    queryKey: [CmsQueryEnum.CmsGet, id],
    queryFn: async () => {
      const res = await axiosInstance.get<getCmsResponseById>(
        `${endpoints.cms.get}/${id}`,
      );
      return res?.data;
    },
    enabled: !!id,
  });
};

export const useGetCmsBySlug = (slug: string) => {
  return useQuery({
    queryKey: [CmsQueryEnum.CmsGet, slug],
    queryFn: async () => {
      const res = await axiosInstance.get<getCmsResponseById>(
        `${endpoints.cms.get}/${slug}`,
      );
      return res?.data;
    },
    enabled: !!slug,
  });
};

export const useCmsUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [CmsQueryEnum.CmsUpdate],
    mutationFn: async (payload: IUpdatePayload) => {
      const res = await axiosInstance.patch(
        `${endpoints.cms.update}/${payload.id}`,
        { title: payload.title, content: payload.content },
      );
      return res?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CmsQueryEnum.CmsAll] });
    },
  });
};

export const useCmsStatusChange = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [CmsQueryEnum.CmsStatusChange],
    mutationFn: async (payload: IStatusChangePayload) => {
      const res = await axiosInstance.patch(
        `${endpoints.cms.status}/${payload.id}`,
        { status: payload.status },
      );
      return res?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CmsQueryEnum.CmsAll] });
    },
  });
};

export const cmsService = {
  useGetAllCms,
  useGetCms,
  useCmsUpdate,
  useCmsStatusChange,
};
