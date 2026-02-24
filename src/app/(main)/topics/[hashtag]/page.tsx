export default async function HashtagPage({ params }: PageProps<'/topics/[hashtag]'>) {
  const { hashtag } = await params;

  return <h1>{hashtag}</h1>;
}
