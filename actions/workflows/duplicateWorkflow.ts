'use server';

import prisma from '@/lib/prisma';
import {
  duplicateWorkflowSchema,
  duplicateWorkflowSchemaType,
} from '@/schema/workflows';
import { WorkflowStatus } from '@/types/workflow';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export const DuplicateWorkflow = async (form: duplicateWorkflowSchemaType) => {
  const { success, data } = await duplicateWorkflowSchema.safeParseAsync(form);
  if (!success) {
    throw new Error('Invalid Form Data!');
  }

  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthenticated!');
  }

  const sourceWorkflow = await prisma.workflow.findUnique({
    where: {
      id: data.workflowId,
    },
  });
  if (!sourceWorkflow) {
    throw new Error('Workflow not Found!');
  }

  const result = await prisma.workflow.create({
    data: {
      userId,
      name: data.name,
      description: data.description,
      status: WorkflowStatus.DRAFT,
      definition: sourceWorkflow.definition,
    },
  });

  if (!result) {
    throw new Error('Failed to duplicate workflow!');
  }

  revalidatePath(`/workflows`);
};
