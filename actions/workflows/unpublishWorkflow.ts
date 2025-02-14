'use server';

import prisma from '@/lib/prisma';
import { WorkflowStatus } from '@/types/workflow';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export const UnpublishWorkflow = async (id: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthenticated!');
  }

  const workflow = await prisma.workflow.findUnique({ where: { id, userId } });
  if (!workflow) {
    throw new Error('Workflow Not Found!');
  }

  if (workflow.status !== WorkflowStatus.PUBLISHED) {
    throw new Error('Workflow is Not Published!');
  }

  await prisma.workflow.update({
    where: { id, userId },
    data: {
      status: WorkflowStatus.DRAFT,
      executionPlan: null,
      creditsCost: 0,
    },
  });

  revalidatePath(`/workflow/editor/${id}`);
};
