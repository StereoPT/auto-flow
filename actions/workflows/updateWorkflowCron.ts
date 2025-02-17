'use server';

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import parser from 'cron-parser';
import { revalidatePath } from 'next/cache';

type UpdateWorkflowCronArgs = {
  id: string;
  cron: string;
};

export const UpdateWorkflowCron = async ({
  id,
  cron,
}: UpdateWorkflowCronArgs) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthenticated!');
  }

  try {
    const interval = parser.parseExpression(cron, { utc: true });

    await prisma.workflow.update({
      where: { id, userId },
      data: {
        cron,
        nextRunAt: interval.next().toDate(),
      },
    });
  } catch (error: any) {
    console.error('Invalid Cron:', error.message);
    throw new Error('Invalid Cron Expression!');
  }

  revalidatePath('/workflows');
};
