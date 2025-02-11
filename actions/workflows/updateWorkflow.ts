'use server';

import prisma from '@/lib/prisma';
import { WorkflowStatus } from '@/types/workflow';
import { auth } from '@clerk/nextjs/server';

type UpdateWorkflowArgs = {
  id: string;
  definition: string;
};

export const UpdateWorkflow = async ({
  id,
  definition,
}: UpdateWorkflowArgs) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthenticated!');
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id,
      userId,
    },
  });
  if (!workflow) {
    throw new Error('Workflow not found!');
  }
  if (workflow.status !== WorkflowStatus.DRAFT) {
    throw new Error('Workflow is not a Draft!');
  }

  await prisma.workflow.update({
    data: {
      definition,
    },
    where: {
      id,
      userId,
    },
  });
};
