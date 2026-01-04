import { useState } from 'react';
import { toast } from 'sonner';
import { submitPost } from '@/actions/post.action';
import { queryKeys } from '@/lib/query-keys';
import { useQueryClient } from '@tanstack/react-query';

export function usePostSubmit() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const submit = async (content: string, clear: () => void) => {
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      await submitPost(content);
      clear();
      toast.success('Post published!');
    } catch {
      toast.error('Failed to submit post');
    } finally {
      setIsSubmitting(false);
      queryClient.invalidateQueries({ queryKey: queryKeys.feed });
    }
  };

  return { isSubmitting, submit };
}
