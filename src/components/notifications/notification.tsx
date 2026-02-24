import { Heart, MessageCircle, UserPlus } from 'lucide-react';
import { Route } from 'next';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { NotificationType } from '@/generated/prisma/enums';
import { NotificationRecord } from '@/lib/types';
import { cn } from '@/lib/utils';
import UserAvatar from '../user-avatar';

export default function Notification({ notification }: { notification: NotificationRecord }) {
  const notificationTypeMap: Record<
    NotificationType,
    { message: React.ReactNode; icon: React.ReactNode; href: string }
  > = {
    FOLLOW: {
      message: (
        <p>
          <span className='font-semibold'>{notification.issuer.name}</span> started following you
        </p>
      ),
      icon: <UserPlus className='text-primary size-5' />,
      href: `/${notification.issuer.username}`,
    },
    COMMENT: {
      message: (
        <p>
          <span className='font-semibold'>{notification.issuer.name}</span> commented on your post
        </p>
      ),
      icon: <MessageCircle className='text-primary fill-primary size-5' />,
      href: `/${notification.recipient.username}/${notification.postId}`,
    },
    LIKE: {
      message: (
        <p>
          <span className='font-semibold'>{notification.issuer.name}</span> liked your post
        </p>
      ),
      icon: <Heart className='size-5 fill-red-500 text-red-500' />,
      href: `/${notification.recipient.username}/${notification.postId}`,
    },
  };

  const { message, href, icon } = notificationTypeMap[notification.type];

  return (
    <Link href={href as Route} className='block'>
      <Card className={cn('transition-colors', !notification.isRead && 'bg-primary/10')}>
        <CardContent className='flex items-center gap-5'>
          <div>{icon}</div>
          <div className='flex items-center gap-4'>
            <UserAvatar
              user={{
                name: notification.issuer.name,
                image: notification.issuer.image,
              }}
              className='size-8'
            />
            <div>
              <span>{message}</span>
              {notification.post && (
                <div className='text-muted-foreground line-clamp-1 whitespace-pre-line'>
                  {notification.post.content}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
