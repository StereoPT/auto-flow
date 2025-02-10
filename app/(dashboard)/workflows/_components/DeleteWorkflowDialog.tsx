'use client';

import { DeleteWorkflow } from '@/actions/workflows/deleteWorkflow';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

type DeleteWorkflowDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  workflowId: string;
  workflowName: string;
};

export const DeleteWorkflowDialog = ({
  open,
  setOpen,
  workflowId,
  workflowName,
}: DeleteWorkflowDialogProps) => {
  const [confirmText, setConfirmText] = useState('');

  const deleteMutation = useMutation({
    mutationFn: DeleteWorkflow,
    onSuccess: () => {
      toast.success('Workflow deleted successfully', { id: workflowId });
      setConfirmText('');
    },
    onError: () => {
      toast.error('Failed to delete workflow', { id: workflowId });
    },
  });

  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        setConfirmText('');
        setOpen(open);
      }}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            If you delete this workflow, you will not be able to recover ir.
            <span className="flex flex-col py-4 gap-2">
              <span>
                If you are sure, enter <b>{workflowName}</b> to confirm:
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
            disabled={confirmText !== workflowName || deleteMutation.isPending}
            onClick={() => {
              toast.loading('Deleting workflow...', { id: workflowId });
              deleteMutation.mutate(workflowId);
            }}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
