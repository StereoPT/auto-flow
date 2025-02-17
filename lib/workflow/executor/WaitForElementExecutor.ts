import { ExecutionEnvironment } from '@/types/executor';
import { WaitForElementTask } from '../task/WaitForElement';

export const WaitForElementExecutor = async (
  environment: ExecutionEnvironment<typeof WaitForElementTask>,
): Promise<boolean> => {
  try {
    const selector = environment.getInput('Selector');
    if (!selector) {
      environment.log.error('Selector not Defined!');
      return false;
    }

    const visibility = environment.getInput('Visibility');
    if (!visibility) {
      environment.log.error('Visibility not Defined!');
      return false;
    }

    await environment.getPage()!.waitForSelector(selector, {
      visible: visibility === 'visible',
      hidden: visibility === 'hidden',
    });

    environment.log.info(`Element ${selector} became: ${visibility}`);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
};
