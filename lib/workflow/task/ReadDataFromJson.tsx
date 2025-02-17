import { TaskParamType, TaskType } from '@/types/task';
import { WorkflowTask } from '@/types/workflow';
import { FileJson2Icon } from 'lucide-react';

export const ReadDataFromJsonTask = {
  type: TaskType.READ_DATA_FROM_JSON,
  label: 'Read Data From Json',
  icon: (props) => <FileJson2Icon className="stroke-orange-400" {...props} />,
  isEntryPoint: false,
  credits: 1,
  inputs: [
    {
      name: 'JSON',
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: 'Property Name',
      type: TaskParamType.STRING,
      required: true,
    },
  ] as const,
  outputs: [
    {
      name: 'Property Value',
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;
