import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { SettingsQueryEnum } from './key';
import { getResponse, IUpdatePayload } from './schema';

import axiosInstance from '@/api/axiosInstance/axiosInstance';
import { endpoints } from '@/api/endpoints/endpoints';

export const useGetSettings = () => {
  return useQuery<getResponse, Error>({
    queryKey: [SettingsQueryEnum.Get],
    queryFn: async () => {
      const res = await axiosInstance.get<getResponse>(
        endpoints.settings.get,
      );
      return res?.data;
    },
  });
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  return useMutation<getResponse, Error, IUpdatePayload>({
    mutationKey: [SettingsQueryEnum.Update],
    mutationFn: async (payload: IUpdatePayload) => {
      const res = await axiosInstance.patch<getResponse>(
        `${endpoints.settings.update}/${payload.id}`,
        { 
          contactNo: payload.contactNo, 
          contactEmail: payload.contactEmail,
          businessRegistrationNo: payload.businessRegistrationNo, 
        },
      );
      return res?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SettingsQueryEnum.Get] });
    },
  });
};
