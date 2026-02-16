import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '<APP_ID>.ufs.sh',
        pathname: '/f/*',
      },
    ],
  },
  reactCompiler: true,
  typedRoutes: true,
  cacheComponents: true,
  experimental: { typedEnv: true, authInterrupts: true },
};

export default nextConfig;
