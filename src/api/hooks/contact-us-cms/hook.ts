import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { ContactUsCmsQueryEnum } from './key';
import { getResponse, IUpdatePayload } from './schema';

import axiosInstance from '@/api/axiosInstance/axiosInstance';
import { endpoints } from '@/api/endpoints/endpoints';

export const useGetContactUsCms = () => {
  return useQuery({
    queryKey: [ContactUsCmsQueryEnum.Get],
    queryFn: async () => {
      const res = await axiosInstance.get<getResponse>(
        endpoints.cms.contactUsCms.get,
      );
      return res?.data;
    },
  });
};

export const useUpdateContactUsCms = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [ContactUsCmsQueryEnum.Update],
    mutationFn: async (payload: IUpdatePayload) => {
      const formData = new FormData();
      formData.append('pageTitle', payload.pageTitle);
      formData.append('headerText', payload.headerText);
      formData.append('description', payload.description);
      if (payload.bannerImage) {
        formData.append('bannerImage', payload.bannerImage);
      }

      const res = await axiosInstance.patch(
        `${endpoints.cms.contactUsCms.update}/${payload.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return res?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ContactUsCmsQueryEnum.Get] });
    },
  });
};
