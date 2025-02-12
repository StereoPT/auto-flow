import { GetWorkflowExecutionWithPhases } from '@/actions/workflows/getWorkflowExecutionWithPhases';
import { Topbar } from '@/app/workflow/_components/topbar/Topbar';
import { Loader2Icon } from 'lucide-react';
import { Suspense } from 'react';
import { ExecutionViewer } from './_components/ExecutionViewer';

type ExecutionViewerWrapperProps = {
  executionId: string;
};

const ExecutionViewerWrapper = async ({
  executionId,
}: ExecutionViewerWrapperProps) => {
  const workflowExecution = await GetWorkflowExecutionWithPhases(executionId);
  if (!workflowExecution) {
    return <div>Not Found</div>;
  }

  return <ExecutionViewer initialData={workflowExecution} />;
};

type ExecutionViewerPageProps = {
  params: {
    executionId: string;
    workflowId: string;
  };
};

const ExecutionViewerPage = async ({ params }: ExecutionViewerPageProps) => {
  const { workflowId, executionId } = await params;

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <Topbar
        workflowId={workflowId}
        title="Workflow Run Details"
        subtitle={`Run ID: ${executionId}`}
        hideButtons
      />
      <section className="flex h-full overflow-auto">
        <Suspense
          fallback={
            <div className="flex w-full items-center justify-center">
              <Loader2Icon className="h-10 w-10 animate-spin stroke-primary" />
            </div>
          }>
          <ExecutionViewerWrapper executionId={executionId} />
        </Suspense>
      </section>
    </div>
  );
};

export default ExecutionViewerPage;
