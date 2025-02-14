'use server';

import prisma from '@/lib/prisma';
import { FlowToExecutionPlan } from '@/lib/workflow/executionPlan';
import { CalculateWorkflowCost } from '@/lib/workflow/helpers';
import { WorkflowStatus } from '@/types/workflow';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

type PublishWorkflowArgs = {
  id: string;
  flowDefinition: string;
};

export const PublishWorkflow = async ({
  id,
  flowDefinition,
}: PublishWorkflowArgs) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthenticated!');
  }

  const workflow = await prisma.workflow.findUnique({ where: { id, userId } });
  if (!workflow) {
    throw new Error('Workflow Not Found!');
  }

  if (workflow.status !== WorkflowStatus.DRAFT) {
    throw new Error('Workflow is Not a Draft!');
  }

  const flow = JSON.parse(flowDefinition);

  const result = FlowToExecutionPlan(flow.nodes, flow.edges);
  if (result.error) {
    throw new Error('Flow Definition Not Valid!');
  }

  if (!result.executionPlan) {
    throw new Error('No Execution Plan Generated!');
  }

  const creditsCost = CalculateWorkflowCost(flow.nodes);
  await prisma.workflow.update({
    where: { id, userId },
    data: {
      definition: flowDefinition,
      executionPlan: JSON.stringify(result.executionPlan),
      creditsCost,
      status: WorkflowStatus.PUBLISHED,
    },
  });

  revalidatePath(`/workflow/editor/${id}`);
};
