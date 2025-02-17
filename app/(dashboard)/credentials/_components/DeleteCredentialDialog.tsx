'use client';

import { DeleteCredential } from '@/actions/credentials/deleteCredential';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { XIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type DeleteCredentialDialogProps = {
  name: string;
};

export const DeleteCredentialDialog = ({
  name,
}: DeleteCredentialDialogProps) => {
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  const deleteMutation = useMutation({
    mutationFn: DeleteCredential,
    onSuccess: () => {
      toast.success('Credential deleted successfully', { id: name });
      setConfirmText('');
    },
    onError: () => {
      toast.error('Failed to delete credential', { id: name });
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <XIcon size={18} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            If you delete this credential, you will not be able to recover it.
            <span className="flex flex-col py-4 gap-2">
              <span>
                If you are sure, enter <b>{name}</b> to confirm:
              </span>
              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
              />
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={confirmText !== name || deleteMutation.isPending}
            onClick={() => {
              toast.loading('Deleting credential...', { id: name });
              deleteMutation.mutate(name);
            }}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
