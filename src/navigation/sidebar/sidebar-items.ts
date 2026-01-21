
export type IconifyIconString = string;

export interface INavSubItem {
  title: string;
  url?: string;
  icon?: IconifyIconString;
  comingSoon?: boolean;
  subItems?: INavSubItem[];
}

export interface INavMainItem {
  title: string;
  url?: string;
  icon?: IconifyIconString;
  subItems?: INavSubItem[];
  comingSoon?: boolean;
}

export interface INavGroup {
  id: number;
  label?: string;
  items: INavMainItem[];
}

export const sidebarItems: INavGroup[] = [
  {
    id: 1,
    label: 'MANAGEMENT',
    items: [
      // {
      //   title: 'Users',
      //   icon: 'mdi:account-group',
      //   subItems: [
      //     {
      //       title: 'Customer',
      //       url: ROUTES.dashboard,
      //       icon: 'mdi:account-group',
      //     },
      //     {
      //       title: 'Provider',
      //       icon: 'mdi:account-group',
      //       url: '#',
      //     },
      //   ],
      // },

      {
        title: 'Enquiry',
        icon: 'mdi:account-group',
        subItems: [
          {
            title: 'Buyers',
            url: '/dashboard/enquiry/buyers',
            icon: 'mdi:account-group',
          },
          {
            title: 'Suppliers',
            icon: 'mdi:account-group',
            url: '/dashboard/enquiry/suppliers',
          },
        ],
      },

      // {
      //   title: 'Category',
      //   icon: 'mdi:tags',
      //   url: '#',
      // },

      // {
      //   title: 'Products list',
      //   icon: 'mdi:package-variant-closed',
      //   url: '#',
      // },

      // {
      //   title: 'Order list',
      //   icon: 'mdi:clipboard-list-outline',
      //   url: '#',
      // },
    ],
  },

  {
    id: 2,
    label: 'CMS',
    items: [
      {
        title: 'FAQ',
        url: '/dashboard/faq',
        icon: 'mdi:comment-question-outline',
      },
      {
        title: 'Page Management',
        icon: 'mdi:file-document-multiple-outline',
        subItems: [
          {
            title: 'Home CMS',
            url: '/dashboard/cms/home-cms',
            icon: 'mdi:home-outline',
          },
          {
            title: 'Terms and Conditions',
            url: '/dashboard/cms/terms-conditions',
            icon: 'mdi:scale-balance',
          },
          {
            title: 'Privacy Policy',
            url: '/dashboard/cms/privacy-policy',
            icon: 'mdi:shield-lock-outline',
          },
          {
            title: 'Contact Us',
            url: '/dashboard/cms/contact-us-cms',
            icon: 'mdi:file-document-edit-outline',
          },
        ],
      },
      {
        title: 'Contact Us Enquiry',
        url: '/dashboard/contact-us',
        icon: 'mdi:email-outline',
      },
    ],
  },

  {
    id: 3,
    label: 'SETTINGS',
    items: [
      {
        title: 'Settings',
        url: '/dashboard/settings',
        icon: 'mdi:cog-outline',
      },
    ],
  },
];

// import { ROUTES } from './routes';

// export type IconifyIconString = string;

// export interface INavSubItem {
//   title: string;
//   url?: string;
//   icon?: IconifyIconString;
//   comingSoon?: boolean;
//   subItems?: INavSubItem[];
// }

// export interface INavMainItem {
//   title: string;
//   url?: string;
//   icon?: IconifyIconString;
//   subItems?: INavSubItem[];
//   comingSoon?: boolean;
// }

// export interface INavGroup {
//   id: number;
//   label?: string;
//   items: INavMainItem[];
// }

// export const sidebarItems: INavGroup[] = [
//   {
//     id: 1,
//     label: 'MANAGEMENT',
//     items: [
//       {
//         title: 'Users',
//         icon: 'mdi:account-group',
//         subItems: [
//           {
//             title: 'Customer',
//             url: ROUTES.management.user.customer.list,
//             icon: 'mdi:account-group',
//           },
//           {
//             title: 'Provider',
//             url: ROUTES.management.user.provider.list,
//             icon: 'mdi:account-group',
//           },
//         ],
//       },
//       {
//         title: 'Category',
//         icon: 'mdi:tags',
//         url: ROUTES.management.category.list,
//       },
//     ],
//   },

//   {
//     id: 2,
//     label: 'CMS',
//     items: [
//       {
//         title: 'FAQ',
//         icon: 'mdi:comment-question-outline',
//         subItems: [
//           {
//             title: 'FAQ Category',
//             icon: 'mdi:shape-outline',
//             url: ROUTES.cms.faq.faqCategory.list,
//           },
//           {
//             title: 'FAQ Entries',
//             icon: 'mdi:file-document-outline',
//             url: ROUTES.cms.faq.faq.list,
//           },
//         ],
//       },
//       {
//         title: 'Privacy Policy',
//         url: ROUTES.cms.privacyPolicy,
//         icon: 'mdi:shield-lock-outline',
//       },
//       {
//         title: 'Terms and Condition',
//         url: ROUTES.cms.termsConditions,
//         icon: 'mdi:scale-balance',
//       },
//       {
//         title: 'Payments',
//         url: ROUTES.payments.list,
//         icon: 'mdi:credit-card-outline',
//       },
//       {
//         title: 'SEO',
//         url: ROUTES.seo.list,
//         icon: 'mdi:magnify',
//       },
//       {
//         title: 'Contact Us',
//         url: ROUTES.cms.contact.list,
//         icon: 'mdi:scale-balance',
//       },
//     ],
//   },

//   {
//     id: 3,
//     label: 'ORDER MANAGEMENT',
//     items: [
//       {
//         title: 'Products',
//         icon: 'mdi:package-variant',
//         subItems: [
//           {
//             title: 'Product List',
//             icon: 'mdi:format-list-bulleted',
//             url: '',
//           },
//           {
//             title: 'Add Product',
//             icon: 'mdi:plus-box-outline',
//             url: '',
//           },
//         ],
//       },
//       {
//         title: 'Orders',
//         icon: 'mdi:clipboard-list',
//         subItems: [
//           {
//             title: 'Order List',
//             icon: 'mdi:clipboard-list-outline',
//             url: '',
//           },
//           {
//             title: 'Order Detail',
//             icon: 'mdi:clipboard-text-outline',
//             url: '',
//           },
//         ],
//       },
//     ],
//   },
// ];
