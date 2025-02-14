'use client';

import { UnpublishWorkflow } from '@/actions/workflows/unpublishWorkflow';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { DownloadIcon } from 'lucide-react';
import { toast } from 'sonner';

type UnpublishBtnProps = {
  workflowId: string;
};

export const UnpublishBtn = ({ workflowId }: UnpublishBtnProps) => {
  const mutation = useMutation({
    mutationFn: UnpublishWorkflow,
    onSuccess: () => {
      toast.success('Workflow Unpublished', { id: workflowId });
    },
    onError: () => {
      toast.success('Workflow Unpublished', { id: workflowId });
    },
  });

  return (
    <Button
      variant="outline"
      disabled={mutation.isPending}
      className="flex items-center gap-2"
      onClick={() => {
        toast.loading('Unpublishing Workflow...', { id: workflowId });
        mutation.mutate(workflowId);
      }}>
      <DownloadIcon size={16} className="stroke-orange-500" />
      Unpublish
    </Button>
  );
};
