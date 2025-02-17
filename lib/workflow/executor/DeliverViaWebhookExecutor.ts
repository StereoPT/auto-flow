import { ExecutionEnvironment } from '@/types/executor';
import { DeliverViaWebhookTask } from '../task/DeliverViaWebhook';

export const DeliverViaWebhookExecutor = async (
  environment: ExecutionEnvironment<typeof DeliverViaWebhookTask>,
): Promise<boolean> => {
  try {
    const targetUrl = environment.getInput('Target URL');
    if (!targetUrl) {
      environment.log.error('Target Url not Defined!');
      return false;
    }

    const body = environment.getInput('Body');
    if (!body) {
      environment.log.error('Body not Defined!');
      return false;
    }

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const statusCode = response.status;
    if (statusCode !== 200) {
      environment.log.error(`Status Code: ${statusCode}`);
      return false;
    }

    const responseBody = await response.json();
    environment.log.info(JSON.stringify(responseBody, null, 4));

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
};
