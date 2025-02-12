'use server';

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export const GetWorkflowExecutionWithPhases = async (executionId: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthenticated!');
  }

  return await prisma.workflowExecution.findUnique({
    where: {
      userId,
      id: executionId,
    },
    include: {
      phases: {
        orderBy: {
          number: 'asc',
        },
      },
    },
  });
};
