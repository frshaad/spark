import { connection } from 'next/server';
import { extractRouterConfig } from 'uploadthing/server';
import { appFileRouter } from '@/app/api/uploadthing/core';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';

export default async function UploadthingSSRProvider() {
  await connection();

  return <NextSSRPlugin routerConfig={extractRouterConfig(appFileRouter)} />;
}
