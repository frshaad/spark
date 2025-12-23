import { Suspense } from 'react';
import SearchField from '@/components/search/search-field';
import SearchResultsContent from '@/components/search/search-result';

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Search Results</h1>
          <Suspense
            fallback={
              <div className="bg-muted h-10 w-full animate-pulse rounded-md" />
            }
          >
            <SearchField />
          </Suspense>
        </div>

        <Suspense fallback={<div>Loading results...</div>}>
          <SearchResultsContent searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
