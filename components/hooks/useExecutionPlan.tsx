import { FlowToExecutionPlan } from '@/lib/workflow/executionPlan';
import { AppNode } from '@/types/appNode';
import { useReactFlow } from '@xyflow/react';
import { useCallback } from 'react';

export const useExecutionPlan = () => {
  const { toObject } = useReactFlow();

  const generateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject();
    const { executionPlan } = FlowToExecutionPlan(nodes as AppNode[], edges);

    return executionPlan;
  }, [toObject]);

  return generateExecutionPlan;
};
