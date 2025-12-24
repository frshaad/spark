'use client';

import type React from 'react';
import { useRef } from 'react';
import { Route } from 'next';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { useOnClickOutside } from 'usehooks-ts';
import { Input } from '@/components/ui/input';
import { useSearch } from '@/hooks/use-search';
import { cn } from '@/lib/utils';

// Mock search function - replace with your actual search logic
async function searchResults(query: string) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Mock data - replace with actual search results
  const mockResults = [
    {
      id: 1,
      title: 'Getting Started with Next.js',
      url: '/docs/getting-started',
    },
    { id: 2, title: 'React Server Components', url: '/docs/rsc' },
    { id: 3, title: 'API Routes in Next.js', url: '/docs/api-routes' },
    { id: 4, title: 'Data Fetching Strategies', url: '/docs/data-fetching' },
    { id: 5, title: 'Deploying to Vercel', url: '/docs/deployment' },
    { id: 6, title: 'Authentication Guide', url: '/docs/auth' },
    { id: 7, title: 'Database Integration', url: '/docs/database' },
  ];

  return mockResults
    .filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5);
}

export default function SearchField() {
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { query, setQuery, results, open, close, isOpen, isLoading } =
    useSearch({ searchFn: searchResults });

  useOnClickOutside(wrapperRef as React.RefObject<HTMLDivElement>, close);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      close();
      router.push(`/search?q=${encodeURIComponent(query)}` as Route);
    }
  };

  const handleResultClick = (url: string) => {
    close();
    setQuery('');
    router.push(url as Route);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
        <Input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && results.length > 0 && open()}
          className="pl-9"
        />
      </div>

      {isOpen && (
        <div className="bg-popover absolute top-full z-50 mt-2 w-full rounded-lg border shadow-lg">
          {isLoading ? (
            <div className="text-muted-foreground p-4 text-center text-sm">
              Searching...
            </div>
          ) : results.length > 0 ? (
            <ul className="py-2">
              {results.map((result) => (
                <li key={result.id}>
                  <button
                    onClick={() => handleResultClick(result.url)}
                    className={cn(
                      'flex w-full items-center px-4 py-2.5 text-left text-sm transition-colors',
                      'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none',
                    )}
                  >
                    <Search className="text-muted-foreground mr-3 size-4" />
                    <span>{result.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-muted-foreground p-4 text-center text-sm">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
