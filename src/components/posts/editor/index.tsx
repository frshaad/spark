'use client';

import './tiptap.css';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import UserAvatar from '@/components/user-avatar';
import { usePostEditor } from '@/hooks/use-post-editor';
import { usePostSubmit } from '@/hooks/use-post-submit';
import { EditorContent } from '@tiptap/react';

type Props = {
  userName: string;
  userImage: string | undefined;
};

export default function PostEditor({ userName, userImage }: Props) {
  const { editor, content, canPost, clear } = usePostEditor();
  const { submit, isSubmitting } = usePostSubmit();

  return (
    <Card>
      <CardContent>
        <div className="flex gap-3">
          <UserAvatar
            image={userImage}
            name={userName}
            className="size-10 shrink-0"
          />
          <div className="flex-1 pt-1">
            <EditorContent editor={editor} className="w-full" />
          </div>
        </div>
      </CardContent>

      <CardFooter className="justify-end">
        <Button
          onClick={() => submit(content, clear)}
          disabled={!canPost || isSubmitting}
          size="lg"
          className="rounded-full px-10"
        >
          {isSubmitting ? 'Posting...' : 'Post'}
        </Button>
      </CardFooter>
    </Card>
  );
}
