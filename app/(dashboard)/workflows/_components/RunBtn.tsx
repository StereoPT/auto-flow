'use client';

import { RunWorkflow } from '@/actions/workflows/runWorkflow';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { PlayIcon } from 'lucide-react';
import { toast } from 'sonner';

type RunBtnType = {
  workflowId: string;
};

export const RunBtn = ({ workflowId }: RunBtnType) => {
  const mutation = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: () => {
      toast.success('Workflow Started', { id: workflowId });
    },
    onError: () => {
      toast.success('Workflow Started', { id: workflowId });
    },
  });

  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
      disabled={mutation.isPending}
      onClick={() => {
        toast.loading('Scheduling Run...', { id: workflowId });
        mutation.mutate({ workflowId });
      }}>
      <PlayIcon size={16} />
      Run
    </Button>
  );
};
