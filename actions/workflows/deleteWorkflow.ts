'use server';

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export const DeleteWorkflow = async (id: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthenticated!');
  }

  await prisma.workflow.delete({ where: { id, userId } });

  revalidatePath('/workflows');
};
