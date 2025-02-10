'use client';

import { Input } from '@/components/ui/input';
import { TaskParam, TaskParamType } from '@/types/task';

type NodeParamFieldProps = {
  param: TaskParam;
};

export const NodeParamField = ({ param }: NodeParamFieldProps) => {
  switch (param.type) {
    case TaskParamType.STRING:
      return <Input />;
    default:
      return (
        <div className="w-full">
          <p className="text-xs text-muted-foreground">Not Implemented</p>
        </div>
      );
  }
};
