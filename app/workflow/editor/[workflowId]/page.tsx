import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { Editor } from '../../_components/Editor';

type EditorPageProps = {
  params: {
    workflowId: string;
  };
};

const EditorPage = async ({ params }: EditorPageProps) => {
  const { workflowId } = await params;
  const { userId } = await auth();
  if (!userId) return <div>Unauthenticated!</div>;

  const workflow = await prisma.workflow.findUnique({
    where: { id: workflowId, userId },
  });
  if (!workflow) {
    return <div>Workflow not found!</div>;
  }

  return <Editor workflow={workflow} />;
};

export default EditorPage;
