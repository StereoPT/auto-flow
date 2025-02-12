'use server';

import prisma from '@/lib/prisma';
import { FlowToExecutionPlan } from '@/lib/workflow/executionPlan';
import { WorkflowExecutionPlan } from '@/types/workflow';
import { auth } from '@clerk/nextjs/server';

type RunWorkflowArgs = {
  workflowId: string;
  flowDefinition?: string;
};

export const RunWorkflow = async (form: RunWorkflowArgs) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthenticated!');
  }

  const { workflowId, flowDefinition } = form;
  if (!workflowId) {
    throw new Error('Workflow is Required!');
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      userId,
      id: workflowId,
    },
  });
  if (!workflow) {
    throw new Error('Workflow not Found!');
  }

  let executionPlan: WorkflowExecutionPlan;
  if (!flowDefinition) {
    throw new Error('Flow Definition is not Defined!');
  }

  const flow = JSON.parse(flowDefinition);
  const result = FlowToExecutionPlan(flow.nodes, flow.edges);
  if (result.error) {
    throw new Error('Flow Definition not Valid!');
  }
  if (!result.executionPlan) {
    throw new Error('No Execution Plan Generated!');
  }

  executionPlan = result.executionPlan;

  console.log(executionPlan);
};
