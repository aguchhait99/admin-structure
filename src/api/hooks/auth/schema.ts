import { TCommonSchema } from '@/types/common/common.schema';

export type TAuthModel = {
  ILoginReq: {
    email: string;
    password: string;
    deviceToken?: string;
  };
  IRefreshTokenReq: {
    refreshToken: string;
  };
  ILogoutReq: {
    refreshToken: string;
  };
  ILoginResData: {
    _id: string;
    fullName: string;
    email: string;
    role: TAuthModel['IRole'];
    profileImage: string;
    status: string;
    createdAt: string;
  };
  IData: {
    user: TAuthModel['IUserData'];
    accessToken: string;
    refreshToken: string;
  };
  IForgotPassReq: {
    email: string;
    baseUrl: string;
  };
  IResetPassReq: {
    newPassword: string;
    authToken: string;
  };
  IRole: {
    _id: string;
    role: string;
    roleDisplayName: string;
  };
  IUserData: {
    _id: string;
    role: TAuthModel['IRole'];
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    userName: string;
    profileImage: string;
    status: string;
    createdAt: string;
  };
  IAuthResponseBody: {
    _id: string;
    role: string;
    fullName: string;
    countryCode: string;
    phone: string;
    email: string;
    userName: string;
    password: string;
    profileImage: string;
    emailOtp: string;
    otpExpireTime: string;
    status: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
  };
  ILoginResponse: TCommonSchema['BaseApiResponse'] & {
    data: TAuthModel['IData'];
  };
  IResetPassResponse: TCommonSchema['BaseApiResponse'] & {
    data: TAuthModel['IAuthResponseBody'];
  };
};
