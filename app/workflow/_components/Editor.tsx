'use client';

import { Workflow } from '@prisma/client';
import { ReactFlowProvider } from '@xyflow/react';
import { FlowEditor } from './FlowEditor';

type EditorProps = {
  workflow: Workflow;
};

export const Editor = ({ workflow }: EditorProps) => {
  return (
    <ReactFlowProvider>
      <div className="flex flex-col h-full w-full overflow-hidden">
        <section className="flex h-full overflow-auto">
          <FlowEditor workflow={workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  );
};
