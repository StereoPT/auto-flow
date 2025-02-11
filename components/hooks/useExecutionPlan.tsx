import {
  FlowToExecutionPlan,
  FlowToExecutionPlanValidationError,
} from '@/lib/workflow/executionPlan';
import { AppNode } from '@/types/appNode';
import { useReactFlow } from '@xyflow/react';
import { useCallback } from 'react';
import { useFlowValidation } from './useFlowValidation';
import { toast } from 'sonner';

export const useExecutionPlan = () => {
  const { toObject } = useReactFlow();
  const { setInvalidInputs, clearErrors } = useFlowValidation();

  const handleError = useCallback(
    (error: any) => {
      switch (error.type) {
        case FlowToExecutionPlanValidationError.NO_ENTRY_POINT:
          toast.error('No Entry Point Found!');
          break;
        case FlowToExecutionPlanValidationError.INVALID_INPUTS:
          toast.error('Not All Input Values are Valid'!);
          setInvalidInputs(error.invalidElements);
          break;
        default:
          toast.error('Something went Wrong!');
          break;
      }
    },
    [setInvalidInputs],
  );

  const generateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject();
    const { executionPlan, error } = FlowToExecutionPlan(
      nodes as AppNode[],
      edges,
    );

    if (error) {
      handleError(error);
      return null;
    }

    clearErrors();
    return executionPlan;
  }, [clearErrors, handleError, toObject]);

  return generateExecutionPlan;
};
