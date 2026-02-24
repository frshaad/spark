import { Notification } from '@/generated/prisma/client';
import prisma from '@/lib/prisma';

type NotificationInput = Omit<
  Pick<Notification, 'issuerId' | 'postId' | 'recipientId' | 'type'>,
  'postId'
> & {
  postId?: string;
};

export function createNotification(data: NotificationInput) {
  return prisma.notification.create({ data });
}

export function deleteNotification(data: NotificationInput) {
  return prisma.notification.deleteMany({ where: data });
}
