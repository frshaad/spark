import prisma from '@/lib/prisma';

export async function createPost(authorId: string, content: string) {
  return prisma.post.create({
    data: { content, authorId },
  });
}
