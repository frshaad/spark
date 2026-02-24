import { EllipsisVertical, Trash } from 'lucide-react'
import { useCallback, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useDeletePost } from '@/hooks/use-delete-post'
import { authClient } from '@/lib/auth-client'

type PostMenuProps = {
  authorId: string
  postId: string
}

export default function PostMenu({ authorId, postId }: PostMenuProps) {
  const { data } = authClient.useSession()
  const canManage = authorId === data?.user.id
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const onConfirmDelete = useCallback(() => {
    deletePost(postId, {
      onSuccess() {
        setIsDialogOpen(false)
      },
    })
  }, [deletePost, postId])

  if (!canManage) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant='ghost' />}
        className='opacity-0 transition-opacity group-hover/post:opacity-100'
        onClick={(e) => e.stopPropagation()}
      >
        <EllipsisVertical />
      </DropdownMenuTrigger>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
          <DropdownMenuItem variant='destructive' onClick={() => setIsDialogOpen(true)}>
            <Trash /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>

        <DialogContent onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>Delete post?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this post? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose
              render={
                <Button variant='outline' disabled={isDeleting}>
                  Cancel
                </Button>
              }
            />
            <Button variant='destructive' onClick={onConfirmDelete} disabled={isDeleting}>
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DropdownMenu>
  )
}
