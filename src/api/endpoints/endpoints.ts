export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const baseUrlApi = `${process.env.NEXT_PUBLIC_BASE_URL}api/`;
export const baseUrlMedia = process.env.NEXT_PUBLIC_BASE_URL;

export const mediaUrl = (url: string, path: string = 'users') => {
  return `${baseUrlMedia}uploads/${path}/${url}`;
};

export const endpoints = {
  auth: {
    login: 'auth/login',
    forgot: 'auth/forgot-password',
    reset: 'auth/reset-password',
    refresh: 'auth/refresh-token',
    logout: 'auth/logout',
    check: '/admin/auth/check-auth',
    profileDetails: 'v1/admin/user/profile-details',
  },
  user: {
    users: {
      all: 'v1/admin/user/getall',
      get: 'v1/admin/user',
      update: 'v1/admin/user',
      updateProfile: 'v1/admin/user/update-profile',
      save: '/v1/admin/user/save/admin',
      status: 'v1/admin/user/status-change',
      delete: '/v1/admin/user/delete/admin',
      changePassword: 'v1/admin/user/change-password-admin',
    },
    fontend: {
      all: 'v1/admin/user/getall',
      get: 'v1/admin/user',
      save: '/v1/admin/user/save/frontend',
      update: '/v1/admin/user/update/frontend',
      status: '/v1/admin/user/status-change/frontend',
      delete: '/v1/admin/user/delete/frontend',
    },
  },
  role: {
    all: '/v1/admin/role/getall',
    get: '/v1/admin/role/get',
    save: '/v1/admin/role/save',
    update: '/v1/admin/role/update',
    status: '/v1/admin/role/status-change',
    delete: '/v1/admin/role/delete',
  },
  cms: {
    all: '/v1/admin/cms/getall',
    get: '/v1/admin/cms',
    update: '/v1/admin/cms',
    status: '/v1/admin/cms/status-change',
    homeCms: {
      get: 'v1/admin/home-cms',
      update: 'v1/admin/home-cms',
    },
    contactUsCms: {
      get: 'v1/admin/contact-us-cms',
      update: 'v1/admin/contact-us-cms',
    },
    contactUs: {
      all: 'v1/admin/contact-us/getall',
      get: 'v1/admin/contact-us',
      update: 'v1/admin/contact-us',
      exportCsv: 'v1/admin/contact-us/export-csv',
    },
    privacyPolicy: {
      get: 'v1/admin/privacy-policy',
      update: 'v1/admin/privacy-policy',
    },
    termsConditions: {
      get: 'v1/admin/terms-conditions',
      update: 'v1/admin/terms-conditions',
    },
  },
  faq: {
    faq: {
      all: 'v1/admin/faq/getall',
      create: 'v1/admin/faq',
      save: '/v1/admin/faq/save',
      get: 'v1/admin/faq',
      update: 'v1/admin/faq',
      delete: 'v1/admin/faq',
      status: '/v1/admin/faq/status-change',
    },
    category: {
      all: '/v1/admin/faq/getall-category',
      create: '/v1/admin/faq/save-category',
      save: '/v1/admin/faq/save',
      get: '/v1/admin/faq/category',
      update: '/v1/admin/faq/category',
      delete: '/v1/admin/faq/category',
      status: '/v1/admin/faq/category/status-change',
    },
  },
  category: {
    all: '/v1/admin/category/getall',
    save: '/v1/admin/category/save',
    create: 'v1/admin/category',
    get: 'v1/admin/category',
    update: 'v1/admin/category',
    status: 'v1/admin/category/status-change',
    delete: 'v1/admin/category',
  },
  enquiry: {
    buyer: {
      all: 'v1/admin/buyer-application/getall',
      get: 'v1/admin/buyer-application',
      status: 'v1/admin/enquiry/status-change',
      exportCsv: 'v1/admin/buyer-application/export-csv',
    },
    supplier: {
      all: 'v1/admin/supplier-application/getall',
      get: 'v1/admin/supplier-application',
      status: 'v1/admin/enquiry/status-change',
      exportCsv: 'v1/admin/supplier-application/export-csv',
    },
  },
  access: {
    getall: '/v1/admin/access/getall',
  },
  settings: {
    get: 'v1/admin/settings',
    update: 'v1/admin/settings',
  },
  service: {
    getall: 'v1/admin/service/getall',
    statusChange: 'v1/admin/service/status-change',
    get: 'v1/admin/service',
  },

  offer: {
    getall: 'v1/admin/special-offer/getall',
    statusChange: 'v1/admin/special-offer/status-change',
    get: 'v1/admin/special-offer',
    create: 'v1/admin/special-offer',
    update: 'v1/admin/special-offer',
  },
  review: {
    getall: 'v1/admin/rating-review/getall',
    statusChange: 'v1/admin/rating-review/status-change',
  },
};
