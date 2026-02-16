import './globals.css';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { inter, vazirMatn } from '@/lib/fonts';
import Providers from '@/providers';
import UploadthingSSRProvider from '@/providers/uploadthing-ssr-provider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${vazirMatn.variable} antialiased`}>
        <Suspense>
          <UploadthingSSRProvider />
        </Suspense>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    default: 'Spark',
    template: '%s',
  },
  description:
    'Spark is a social media platform to connect with friends and family.',
};
