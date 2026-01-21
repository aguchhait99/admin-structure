export enum ROUTES_TYPE {
  management = '/management',
  cms = '/cms',
  auth = '/auth',
  dashboard = '/dashboard',
  profile = '/profile',
  settings = '/settings',
}
export const ROUTES = {
  dashboard: ROUTES_TYPE.dashboard,

  auth: {
    login: `${ROUTES_TYPE.auth}/login`,
    signup: `${ROUTES_TYPE.auth}/sign-up`,
    forgetPassword: `${ROUTES_TYPE.auth}/forget-password`,
  },
};
