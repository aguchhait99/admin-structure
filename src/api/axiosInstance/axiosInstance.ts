import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { toast } from 'sonner';

import { sanitizePayload } from '@/@core/utils/sanitizePayload';
import { baseUrlApi, endpoints } from '@/api/endpoints/endpoints';
import { TCommonSchema } from '@/types/common/common.schema';

const axiosInstance = axios.create({
  baseURL: baseUrlApi,
});

let oauthAppAccessToken: string | null = null;
export const setOAuthAppAccessToken = (_accessToken: typeof oauthAppAccessToken) => {
  oauthAppAccessToken = _accessToken;
};
export const getOAuthAppAccessToken = () => oauthAppAccessToken;

const refreshToken = async (): Promise<string | null> => {
  try {
    const cookies = parseCookies();
    const _token = getOAuthAppAccessToken() || cookies[process.env.NEXT_PUBLIC_TOKEN_NAME!];

    const response = await axiosInstance.post(endpoints.auth.refresh, {
      accessToken: _token,
      refreshToken: cookies[process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME!],
    });
    const newAccessToken = response.data.data.accessToken;
    console.info('newAccessToken', newAccessToken);

    if (newAccessToken) {
      console.info('newAccessToken', newAccessToken);
      setCookie(null, process.env.NEXT_PUBLIC_TOKEN_NAME!, newAccessToken, {
        path: '/',
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
      });

      setOAuthAppAccessToken(newAccessToken);
      return newAccessToken;
    }
  } catch (error) {
    console.error('Failed to refresh token:', error);
    destroyCookie(null, process.env.NEXT_PUBLIC_TOKEN_NAME!);
  }
  return null;
};

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const cookies = parseCookies();
  let _token = cookies[process.env.NEXT_PUBLIC_TOKEN_NAME!];
  const AuthToken = getOAuthAppAccessToken();

  if (AuthToken) {
    _token = AuthToken;
  }

  if (_token && config.headers) {
    config.headers['Authorization'] = `Bearer ${_token}`;
  }
  if (config.data && typeof config.data === 'object') {
    config.data = sanitizePayload(config.data);
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<TCommonSchema['BaseApiErrorResponse']>) => {
    if (!error.config) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshToken();
      console.info('back');
      if (newAccessToken) {
        console.info('newAccessToken at axios', newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      }
    }

    const apiError = error.response?.data;
    const message =
      (typeof apiError?.message === 'string'
        ? apiError?.message
        : (apiError?.message as unknown as { message?: string })?.message) ||
      'Something went wrong';

    if (message) {
      const capitalizeMessage = message.charAt(0).toUpperCase() + message.slice(1);
      toast.error(capitalizeMessage);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
