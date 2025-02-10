'use client';

import { CreateFlowNode } from '@/lib/workflow/createFlowNode';
import { TaskType } from '@/types/task';
import { Workflow } from '@prisma/client';
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import NodeComponent from './nodes/NodeComponent';

type FlowEditorProps = {
  workflow: Workflow;
};

const nodeTypes = {
  AutoFlowNode: NodeComponent,
};

const snapGrid: [number, number] = [50, 50];
const fitViewOptions = { padding: 1 };

export const FlowEditor = ({ workflow }: FlowEditorProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    CreateFlowNode(TaskType.LAUNCH_BROWSER),
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        snapToGrid
        // snapGrid={snapGrid}
        fitView
        fitViewOptions={fitViewOptions}>
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  );
};
