import { Suspense } from 'react';
import SearchField from '@/components/search-field';

export default function Home() {
  return (
    <div>
      <h1>Hello World!</h1>
      <Suspense
        fallback={
          <div className="bg-muted h-10 w-full animate-pulse rounded-md" />
        }
      >
        <SearchField />
      </Suspense>
    </div>
  );
}
