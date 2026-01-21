# Super Admin Dashboard

<div align="center">
  <strong>Next.js Admin Dashboard with TypeScript & Shadcn UI</strong><br />
  A modern, feature-rich admin dashboard built with Next.js 15, Tailwind CSS, App Router, TypeScript, and Shadcn UI.
</div>

## 🚀 Features



## 📁 Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── (external)/          # Public pages
│   ├── (main)/              # Main application
│   │   ├── dashboard/       # Dashboard routes
│   │   │   ├── cms/        # CMS management
│   │   │   ├── seo/        # SEO tools
│   │   │   ├── management/ # User management
│   │   │   ├── payments/   # Payment processing
│   │   │   ├── settings/   # System settings
│   │   │   └── about/      # About section
│   │   ├── auth/           # Authentication
│   │   └── unauthorized/   # Unauthorized access
│   └── layout.tsx          # Root layout
│
├── components/              # React components
│   ├── ui/                 # Shadcn UI components
│   ├── icons/             # Custom icons
│   └── theme-provider.tsx # Theme configuration
│
├── module/                 # Feature modules
│   ├── auth/              # Authentication module
│   ├── user/              # User management module
│   ├── cms/               # CMS module
│   ├── seo/               # SEO module
│   ├── payments/          # Payment processing
│   ├── orders/            # Order management
│   ├── products/          # Product management
│   ├── category/          # Category management
│   ├── contact-us/        # Contact management
│   ├── faq/               # FAQ management
│   ├── profile/           # Profile management
│   └── settings/          # Settings management
│
├── api/                    # API integration
│   ├── hooks/             # API hooks
│   ├── axiosInstance/     # Axios configuration
│   └── endpoints/         # API endpoints
│
├── hooks/                  # Custom React hooks
├── lib/                    # Utility libraries
├── types/                  # TypeScript types
├── utils/                  # Helper functions
├── context/               # React context
├── config/                # App configuration
├── constants/             # Static values
├── rbac/                  # Role-based access control
└── navigation/            # Navigation configuration
```

## 📦 Module Management

### Module Structure
Each module in the `src/module` directory follows this structure:
```
module/
├── [module-name]/
│   ├── components/        # Module-specific components
│   ├── hooks/            # Module-specific hooks
│   ├── types/            # Module-specific types
│   ├── utils/            # Module-specific utilities
│   ├── constants.ts      # Module constants
│   └── index.ts          # Module exports
```

### Creating a New Module
1. Create a new directory in `src/module` with your module name
2. Follow the module structure above
3. Export your module components and utilities in `index.ts`
4. Import and use the module in your pages

Example:
```typescript
// src/module/user/index.ts
export * from './components';
export * from './hooks';
export * from './types';
export * from './utils';
export * from './constants';

// Using the module in a page
import { UserList, useUserData } from '@/module/user';
```

### Module Best Practices
1. **Encapsulation**: Keep module-specific code within the module
2. **Reusability**: Create shared components in `module/shared`
3. **Type Safety**: Define types in the module's `types` directory
4. **Testing**: Include tests within the module
5. **Documentation**: Add README.md for complex modules
6. **Error Handling**: Implement proper error boundaries
7. **Loading States**: Include loading and error states
8. **Data Validation**: Use Zod for data validation

## 🛠️ Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd super-admin-shadcn-ui
   ```

2. **Install dependencies**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   NEXT_PUBLIC_BASE_URL=your_api_base_url
   NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
   ```

4. **Start the development server**
   ```bash
   yarn dev
   # or
   npm run dev
   ```

5. **Build for production**
   ```bash
   yarn build
   # or
   npm run build
   ```

## 🔧 Available Scripts

- `dev` - Start development server
- `build` - Build for production
- `start` - Start production server
- `lint` - Run ESLint
- `format` - Format code with Prettier
- `format:check` - Check code formatting
- `check-types` - Run TypeScript type checking
- `lint:fix` - Fix linting issues
- `prettier:fix` - Fix formatting issues

## 📚 API Integration

The application integrates with a RESTful API with endpoints for:
- Authentication
- User Management
- Role Management
- CMS Content
- FAQ Management
- Category Management
- Service Management
- Special Offers
- Reviews & Ratings
- Payment Processing
- Order Management
- Product Management
- Contact Management

## 🎨 UI Components

The project uses Shadcn UI components including:
- Form elements (inputs, selects, checkboxes)
- Navigation components (sidebar, breadcrumb, tabs)
- Data display (tables, cards, charts)
- Feedback components (alerts, toasts, dialogs)
- Layout components (accordion, collapsible, drawer)
- Rich text editor (TipTap)
- File upload components
- Theme switching
- Carousel
- Command palette
- Context menu
- Dropdown menu
- Menubar
- Navigation menu
- Pagination
- Radio group
- Resizable panels
- Select
- Sheet
- Slider
- Toggle
- Tooltip

## 🔐 Security Features

- Token-based authentication
- Two-factor authentication
- Password reset functionality
- Role-based access control
- Secure API endpoints
- Environment variable protection
- CSRF protection
- Rate limiting
- Input validation
- XSS prevention

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Code Style

- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Add proper documentation
- Include unit tests for new features
- Follow the existing code structure
- Use proper error handling
- Implement loading states

---

<div align="center">
  Made with ❤️ by Webskitters
</div> 