import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `${process.env.UPLOADTHING_APP_ID}.ufs.sh`,
        pathname: '/f/*',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  reactCompiler: true,
  typedRoutes: true,
  cacheComponents: true,
  experimental: { typedEnv: true, authInterrupts: true },
};

export default nextConfig;
