'use client';

import { useInView } from 'react-intersection-observer';

type InfiniteScrollContainerProps = {
  onBottomReached: () => void;
  hasNextPage?: boolean;
  isLoading?: boolean;
  className?: string;
} & React.PropsWithChildren;

export default function InfiniteScrollContainer({
  children,
  onBottomReached,
  hasNextPage = true,
  isLoading = false,
  className = '',
}: InfiniteScrollContainerProps) {
  const { ref } = useInView({
    rootMargin: '200px',
    triggerOnce: false,
    onChange: (inView) => {
      if (inView && hasNextPage && !isLoading) {
        onBottomReached();
      }
    },
  });

  return (
    <div className={className}>
      {children}
      <div ref={ref} />
    </div>
  );
}
