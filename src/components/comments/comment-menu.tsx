import { useCallback, useState } from 'react';
import { EllipsisVertical, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDeleteComment } from '@/hooks/use-delete-comment';
import { authClient } from '@/lib/auth-client';

type CommentMenuProps = {
  authorId: string;
  commentId: string;
};

export default function CommentMenu({ authorId, commentId }: CommentMenuProps) {
  const { data } = authClient.useSession();
  const canManage = authorId === data?.user.id;
  const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onConfirmDelete = useCallback(() => {
    deleteComment(commentId, {
      onSuccess() {
        setIsDialogOpen(false);
      },
    });
  }, [deleteComment, commentId]);

  if (!canManage) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" />}
        className="opacity-0 transition-opacity group-hover/comment:opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        <EllipsisVertical />
      </DropdownMenuTrigger>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setIsDialogOpen(true)}
          >
            <Trash /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>

        <DialogContent onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>Delete comment?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this comment? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose
              render={
                <Button variant="outline" disabled={isDeleting}>
                  Cancel
                </Button>
              }
            />
            <Button
              variant="destructive"
              onClick={onConfirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DropdownMenu>
  );
}
