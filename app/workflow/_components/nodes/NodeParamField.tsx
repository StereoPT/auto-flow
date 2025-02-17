'use client';

import { TaskParam, TaskParamType } from '@/types/task';
import { StringParam } from './params/StringParam';
import { useReactFlow } from '@xyflow/react';
import { AppNode } from '@/types/appNode';
import { useCallback } from 'react';
import { BrowserInstanceParam } from './params/BrowserInstanceParam';
import { SelectParam } from './params/SelectParam';

type NodeParamFieldProps = {
  param: TaskParam;
  nodeId: string;
  disabled: boolean;
};

export const NodeParamField = ({
  param,
  nodeId,
  disabled,
}: NodeParamFieldProps) => {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId) as AppNode;
  const value = node?.data.inputs?.[param.name];

  const updateNodeParamValue = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        inputs: {
          ...node?.data.inputs,
          [param.name]: newValue,
        },
      });
    },
    [node?.data.inputs, nodeId, param.name, updateNodeData],
  );

  switch (param.type) {
    case TaskParamType.STRING:
      return (
        <StringParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
          disabled={disabled}
        />
      );
    case TaskParamType.BROWSER_INSTANCE:
      return (
        <BrowserInstanceParam
          param={param}
          value={''}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    case TaskParamType.SELECT:
      return (
        <SelectParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
          disabled={disabled}
        />
      );
    default:
      return (
        <div className="w-full">
          <p className="text-xs text-muted-foreground">Not Implemented</p>
        </div>
      );
  }
};
