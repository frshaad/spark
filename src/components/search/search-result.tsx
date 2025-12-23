export default async function SearchResultsContent({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q;

  if (!query) {
    return (
      <div className="text-muted-foreground text-center">
        Enter a search query to see results
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground text-sm">
        Showing results for:{' '}
        <span className="text-foreground font-medium">{query}</span>
      </p>
      {/* Add your actual search results here */}
      <div className="text-muted-foreground rounded-lg border p-8 text-center">
        Search results for "{query}" would appear here
      </div>
    </div>
  );
}
