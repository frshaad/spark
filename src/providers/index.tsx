'use client';

import { Toaster } from '@/components/ui/sonner';
import ReactQueryProvider from './react-query-provider';
import { ThemeProvider } from './theme-provider';

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
    >
      <ReactQueryProvider>
        {children}
        <Toaster richColors />
      </ReactQueryProvider>
    </ThemeProvider>
  );
}
