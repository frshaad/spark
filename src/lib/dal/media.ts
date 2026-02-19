import { Media } from '@/generated/prisma/client';
import prisma from '@/lib/prisma';

export async function createMediaRecord(data: Pick<Media, 'url' | 'type'>) {
  return prisma.media.create({ data });
}
