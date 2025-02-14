'use client';

import { PublishWorkflow } from '@/actions/workflows/publishWorkflow';
import { useExecutionPlan } from '@/components/hooks/useExecutionPlan';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { useReactFlow } from '@xyflow/react';
import { UploadIcon } from 'lucide-react';
import { toast } from 'sonner';

type PublishBtnProps = {
  workflowId: string;
};

export const PublishBtn = ({ workflowId }: PublishBtnProps) => {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();

  const mutation = useMutation({
    mutationFn: PublishWorkflow,
    onSuccess: () => {
      toast.success('Workflow Published', { id: workflowId });
    },
    onError: () => {
      toast.success('Workflow Published', { id: workflowId });
    },
  });

  return (
    <Button
      variant="outline"
      disabled={mutation.isPending}
      className="flex items-center gap-2"
      onClick={() => {
        const plan = generate();
        if (!plan) return;

        toast.loading('Publishing Workflow...', { id: workflowId });
        mutation.mutate({
          id: workflowId,
          flowDefinition: JSON.stringify(toObject()),
        });
      }}>
      <UploadIcon size={16} className="stroke-green-400" />
      Publish
    </Button>
  );
};
