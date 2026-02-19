'use client';

import './tiptap.css';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import UserAvatar from '@/components/user-avatar';
import { usePostEditor } from '@/hooks/use-post-editor';
import { usePostSubmit } from '@/hooks/use-post-submit';
import { useUploadMedia } from '@/hooks/use-upload-media';
import { isRTL } from '@/lib/format';
import { EditorContent } from '@tiptap/react';

type Props = {
  user: {
    name: string;
    image: string | null;
  };
};

export default function PostEditor({ user }: Props) {
  const { editor, content, canPost, clear: clearText } = usePostEditor();
  const { mutate, isPending } = usePostSubmit();
  const {
    attachments,
    isUploading,
    removeAttachments,
    startUpload,
    uploadProgress,
    reset: resetMediaUpload,
  } = useUploadMedia();

  const isContentRtl = useMemo(() => isRTL(content), [content]);

  const submit = (content: string) => {
    if (!content.trim()) return;
    mutate(
      {
        content,
        mediaIds: attachments.map((a) => a.mediaId).filter(Boolean) as string[],
      },
      {
        onSuccess() {
          clearText();
          resetMediaUpload();
        },
      },
    );
  };

  return (
    <Card>
      <CardContent>
        <div className="flex gap-3">
          <UserAvatar user={user} className="size-10 shrink-0" />
          <div className="flex-1 pt-1">
            <EditorContent
              editor={editor}
              className="w-full"
              dir={isContentRtl ? 'rtl' : 'ltr'}
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="justify-end">
        <Button
          onClick={() => submit(content)}
          disabled={!canPost || isPending}
          size="lg"
          className="rounded-full px-10"
        >
          {isPending ? 'Posting...' : 'Post'}
        </Button>
      </CardFooter>
    </Card>
  );
}
