import { useEffect, useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';

type SearchResult = {
  id: number;
  title: string;
  url: string;
};

type UseSearchOptions = {
  minLength?: number;
  debounceMs?: number;
  searchFn: (query: string) => Promise<SearchResult[]>;
};

export function useSearch({
  searchFn,
  debounceMs = 300,
  minLength = 2,
}: UseSearchOptions) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [debouncedQuery] = useDebounceValue(query, debounceMs);

  useEffect(() => {
    if (debouncedQuery.trim().length < minLength) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);

    void searchFn(debouncedQuery)
      .then((data) => {
        setResults(data);
        setIsOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [debouncedQuery, searchFn]);

  return {
    query,
    setQuery,

    results,
    isLoading,

    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
}
