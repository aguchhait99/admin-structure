import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { TAuthModel } from '../auth/schema';
import { TUseMutationOptions } from '../common/common';

import { TProfileSchema } from './schema';

import axiosInstance from '@/api/axiosInstance/axiosInstance';
import { endpoints } from '@/api/endpoints/endpoints';
import { TCommonSchema } from '@/types/common/common.schema';

export type TUseProfileChangeMutation = (
  options?: TUseMutationOptions<
    TProfileSchema['IProfileUpdateResponse'],
    Error,
    TProfileSchema['IProfileUpdatePayload']
  >,
) => UseMutationResult<
  TProfileSchema['IProfileUpdateResponse'],
  Error,
  TProfileSchema['IProfileUpdatePayload']
>;

export const useProfileChange: TUseProfileChangeMutation = () => {
  return useMutation<
    TProfileSchema['IProfileUpdateResponse'],
    Error,
    TProfileSchema['IProfileUpdatePayload']
  >({
    mutationKey: ['profile_change'],
    mutationFn: async (payload) => {
      const res = await axiosInstance.patch(endpoints.user.users.update, payload);
      return res?.data;
    },
  });
};

export type TUsePasswordChangeMutation = (
  options?: TUseMutationOptions<
    TProfileSchema['IPasswordUpdateResponse'],
    Error,
    TProfileSchema['IPasswordChangePayload']
  >,
) => UseMutationResult<
  TProfileSchema['IPasswordUpdateResponse'],
  Error,
  TProfileSchema['IPasswordChangePayload']
>;
export const useChangePassHook: TUsePasswordChangeMutation = () => {
  return useMutation<
    TProfileSchema['IPasswordUpdateResponse'],
    Error,
    TProfileSchema['IPasswordChangePayload']
  >({
    mutationKey: ['change password'],
    mutationFn: async (payload) => {
      const res = await axiosInstance.patch(endpoints.user.users.changePassword, payload);
      return res?.data;
    },
  });
};

export const fetchUserDetails = async () => {
  const res = await axiosInstance.get<
    TCommonSchema['BaseApiResponse'] & { data: TAuthModel['IUserData'] }
  >(endpoints.auth.profileDetails);

  return res?.data;
};

export const profileService = {
  useProfileChange,
  useChangePassHook,
};
