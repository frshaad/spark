import { PostView } from '@/lib/types'
import Post from './post'

export default function PostsList({ posts }: { posts: PostView[]; className?: string }) {
  return (
    <>
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </>
  )
}
