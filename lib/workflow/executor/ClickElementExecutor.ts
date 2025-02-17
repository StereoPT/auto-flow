import { ExecutionEnvironment } from '@/types/executor';
import { ClickElementTask } from '../task/ClickElement';

export const ClickElementExecutor = async (
  environment: ExecutionEnvironment<typeof ClickElementTask>,
): Promise<boolean> => {
  try {
    const selector = environment.getInput('Selector');
    if (!selector) {
      environment.log.error('Selector not Defined!');
      return false;
    }

    await environment.getPage()!.click(selector);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
};
