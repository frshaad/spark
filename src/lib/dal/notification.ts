import { Notification } from '@/generated/prisma/client';
import prisma from '@/lib/prisma';

export function createNotification(
  data: Pick<Notification, 'issuerId' | 'postId' | 'recipientId' | 'type'>,
) {
  return prisma.notification.create({ data });
}

export function deleteNotifications(
  data: Pick<Notification, 'issuerId' | 'postId' | 'recipientId' | 'type'>,
) {
  return prisma.notification.deleteMany({
    where: data,
  });
}
