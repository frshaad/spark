import { useState } from 'react';
import Placeholder from '@tiptap/extension-placeholder';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export function usePostEditor() {
  const [content, setContent] = useState('');

  const canPost = content.trim().length > 0;

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

  return {
    editor,
    content,
    canPost,
    clear: () => editor?.commands.clearContent(),
  };
}
