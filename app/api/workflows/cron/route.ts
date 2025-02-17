import { getAppUrl } from '@/lib/helper/appUrl';
import prisma from '@/lib/prisma';
import { WorkflowStatus } from '@/types/workflow';

const triggerWorkflow = async (workflowId: string) => {
  const triggerApiUrl = getAppUrl(
    `api/workflows/execute?workflowId=${workflowId}`,
  );

  fetch(triggerApiUrl, {
    headers: {
      Authorization: `Bearer ${process.env.API_SECRET!}`,
    },
    cache: 'no-store',
  }).catch((error) =>
    console.error(
      'Error Triggering Workflow with ID',
      workflowId,
      ': Error ->',
      error.message,
    ),
  );
};

export const GET = async (req: Request) => {
  const now = new Date();

  const workflows = await prisma.workflow.findMany({
    select: { id: true },
    where: {
      status: WorkflowStatus.PUBLISHED,
      cron: { not: null },
      nextRunAt: { lte: now },
    },
  });

  for (const workflow of workflows) {
    triggerWorkflow(workflow.id);
  }

  return Response.json({ workflowsToRun: workflows.length }, { status: 200 });
};
