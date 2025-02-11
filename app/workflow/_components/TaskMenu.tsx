'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { TaskRegistry } from '@/lib/workflow/task/registry';
import { TaskType } from '@/types/task';
import { DragEvent } from 'react';

export const TaskMenu = () => {
  return (
    <aside className="w-[340px] min-w-[340px] max-w-[340px] border-r-2 border-separate h-full p-2 px-4 overflow-auto">
      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={['extraction']}>
        <AccordionItem value="extraction">
          <AccordionTrigger className="font-bold">
            Data Extraction
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuBtn taskType={TaskType.PAGE_TO_HTML} />
            <TaskMenuBtn taskType={TaskType.EXTRACT_TEXT_FROM_ELEMENT} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

type TaskMenuBtnProps = {
  taskType: TaskType;
};

const TaskMenuBtn = ({ taskType }: TaskMenuBtnProps) => {
  const task = TaskRegistry[taskType];

  const onDragStart = (event: DragEvent, type: TaskType) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Button
      variant="secondary"
      draggable
      onDragStart={(event) => onDragStart(event, taskType)}
      className="flex justify-between items-center gap-2 border w-full">
      <div className="flex gap-2 items-center">
        <task.icon size={20} />
        {task.label}
      </div>
    </Button>
  );
};
