'use client';

import { useExecutionPlan } from '@/components/hooks/useExecutionPlan';
import { Button } from '@/components/ui/button';
import { PlayIcon } from 'lucide-react';

type ExecuteBtnProps = {
  workflowId: string;
};

export const ExecuteBtn = ({ workflowId }: ExecuteBtnProps) => {
  const generate = useExecutionPlan();

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      onClick={() => {
        const plan = generate();
        console.log('----- P L A N -----');
        console.table(plan);
      }}>
      <PlayIcon size={16} className="stroke-orange-400" />
      Execute
    </Button>
  );
};
