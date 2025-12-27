'use client';

import './tiptap.css';
import { useState } from 'react';
import { toast } from 'sonner';
import { submitPost } from '@/actions/post.action';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import UserAvatar from '@/components/user-avatar';
import { authClient } from '@/lib/auth-client';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function PostEditor() {
  const { data: session } = authClient.useSession();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ bold: false, italic: false }),
      Placeholder.configure({
        placeholder: "What's on your mind?",
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'prose prose-sm max-w-none focus:outline-none min-h-[60px] text-base text-foreground leading-relaxed',
      },
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getText({ blockSeparator: '\n' }));
    },
    immediatelyRender: false,
  });

  const canPost = content.trim().length > 0;

  async function onSubmit() {
    if (!canPost) return;

    setIsSubmitting(true);
    try {
      await submitPost(content);
      editor?.commands.clearContent();
      setContent('');
      toast.success('Post published!');
    } catch {
      toast.error('Failed to submit post');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardContent>
        <div className="flex gap-3">
          <UserAvatar
            image={session?.user.image}
            name={session?.user.name || ''}
            className="size-10 shrink-0"
          />
          <div className="flex-1 pt-1">
            <EditorContent editor={editor} className="w-full" />
          </div>
        </div>
      </CardContent>

      {/*<Separator />*/}

      <CardFooter className="justify-end">
        <Button
          onClick={onSubmit}
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
