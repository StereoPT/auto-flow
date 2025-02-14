'use server';

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export const GetWorkflowExecutions = async (workflowId: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthenticated!');
  }

  return await prisma.workflowExecution.findMany({
    where: {
      workflowId,
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};
