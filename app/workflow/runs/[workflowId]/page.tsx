import { GetWorkflowExecutions } from '@/actions/workflows/getWorkflowExecutions';
import { Topbar } from '../../_components/topbar/Topbar';
import { Suspense } from 'react';
import { InboxIcon, Loader2Icon } from 'lucide-react';
import { ExecutionsTable } from './_components/ExecutionsTable';

type ExecutionsTableWrapperProps = {
  workflowId: string;
};

const ExecutionsTableWrapper = async ({
  workflowId,
}: ExecutionsTableWrapperProps) => {
  const executions = await GetWorkflowExecutions(workflowId);

  if (!executions) return <div>No Data</div>;

  if (executions.length === 0) {
    return (
      <div className="container w-full py-6">
        <div className="flex items-center flex-col gap-2 justify-center h-full w-full">
          <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
            <InboxIcon size={40} className="stroke-primary" />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <p className="font-bold">
              No Runs have been Triggered Yet for this Workflow
            </p>
            <p className="text-sm text-muted-foreground">
              You can Trigger a new Run in the Editor Page
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6 w-full">
      <ExecutionsTable workflowId={workflowId} initialData={executions} />
    </div>
  );
};

type ExecutionsPageParams = {
  params: {
    workflowId: string;
  };
};

const ExecutionsPage = ({ params }: ExecutionsPageParams) => {
  return (
    <div className="h-full w-full overflow-auto">
      <Topbar
        workflowId={params.workflowId}
        hideButtons
        title="All Runs"
        subtitle="List of All Your Workflow Runs"
      />
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <Loader2Icon size={30} className="animate-spin stroke-primary" />
          </div>
        }>
        <ExecutionsTableWrapper workflowId={params.workflowId} />
      </Suspense>
    </div>
  );
};

export default ExecutionsPage;
