import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/dashboard/default',
        permanent: false,
      },
      {
        source: '/',
        destination: '/auth/login',
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/robots.txt',
        destination: isProd ? '/robots.prod.txt' : '/robots.disallow.txt',
      },
    ];
  },
};

export default nextConfig;
