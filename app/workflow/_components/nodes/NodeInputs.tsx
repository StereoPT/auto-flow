'use client';

import { cn } from '@/lib/utils';
import { TaskParam } from '@/types/task';
import { Handle, Position, useEdges } from '@xyflow/react';
import { ReactNode } from 'react';
import { NodeParamField } from './NodeParamField';
import { ColorForHandle } from './common';
import { useFlowValidation } from '@/components/hooks/useFlowValidation';

type NodeInputsProps = {
  children: ReactNode;
};

export const NodeInputs = ({ children }: NodeInputsProps) => {
  return <div className="flex flex-col divide-y gap-2">{children}</div>;
};

type NodeInputProps = {
  input: TaskParam;
  nodeId: string;
};

export const NodeInput = ({ input, nodeId }: NodeInputProps) => {
  const { invalidInputs } = useFlowValidation();
  const edges = useEdges();

  const isConnected = edges.some(
    (edge) => edge.target === nodeId && edge.targetHandle === input.name,
  );
  const hasErrors = invalidInputs
    .find((node) => node.nodeId === nodeId)
    ?.inputs.find((invalidInput) => invalidInput === input.name);

  return (
    <div
      className={cn(
        'flex justify-start relative p-3 bg-secondary w-full',
        hasErrors && 'bg-destructive/30',
      )}>
      <NodeParamField param={input} nodeId={nodeId} disabled={isConnected} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          isConnectable={!isConnected}
          type="target"
          position={Position.Left}
          className={cn(
            '!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4',
            ColorForHandle[input.type],
          )}
        />
      )}
    </div>
  );
};
