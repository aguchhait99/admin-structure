import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import axiosInstance from '@/api/axiosInstance/axiosInstance';
import { endpoints } from '@/api/endpoints/endpoints';

export const useGetHomeCms = () => {
  return useQuery({
    queryKey: ['home-cms'],
    queryFn: async () => {
      const res = await axiosInstance.get(endpoints.cms.homeCms.get);
      return res?.data;
    },
  });
};

export const useUpdateHomeCms = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await axiosInstance.patch(endpoints.cms.homeCms.update, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['home-cms'] });
    },
  });
};
