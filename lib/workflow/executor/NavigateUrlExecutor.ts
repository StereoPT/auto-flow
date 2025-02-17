import { ExecutionEnvironment } from '@/types/executor';
import { NavigateUrlTask } from '../task/NavigateUrl';

export const NavigateUrlExecutor = async (
  environment: ExecutionEnvironment<typeof NavigateUrlTask>,
): Promise<boolean> => {
  try {
    const url = environment.getInput('URL');
    if (!url) {
      environment.log.error('URL not Defined!');
      return false;
    }

    await environment.getPage()!.goto(url);
    environment.log.info(`Visited: ${url}`);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
};
