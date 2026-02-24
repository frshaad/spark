import { Notification } from '@/generated/prisma/client';
import prisma from '@/lib/prisma';
import { notificationInclude } from '@/lib/types';

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

export function getNotificationsForUser({
  recipientId,
  cursor,
  pageSize = 10,
}: {
  recipientId: string;
  cursor: string | undefined;
  pageSize: number | undefined;
}) {
  return prisma.notification.findMany({
    where: { recipientId },
    include: notificationInclude,
    orderBy: { createdAt: 'desc' },
    take: pageSize + 1,
    cursor: cursor ? { id: cursor } : undefined,
    skip: cursor ? 1 : 0,
  });
}
