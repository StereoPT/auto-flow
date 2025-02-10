'use server';

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export const GetWorkflowsForUser = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthenticated!');
  }

  return prisma.workflow.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
};
