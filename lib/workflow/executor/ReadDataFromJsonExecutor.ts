import { ExecutionEnvironment } from '@/types/executor';
import { ReadDataFromJsonTask } from '../task/ReadDataFromJson';

export const ReadDataFromJsonExecutor = async (
  environment: ExecutionEnvironment<typeof ReadDataFromJsonTask>,
): Promise<boolean> => {
  try {
    const jsonData = environment.getInput('JSON');
    if (!jsonData) {
      environment.log.error('JSON not Defined!');
      return false;
    }

    const propertyName = environment.getInput('Property Name');
    if (!propertyName) {
      environment.log.error('Property Name not Defined!');
      return false;
    }

    const json = JSON.parse(jsonData);
    const propertyValue = json[propertyName];
    if (propertyValue === undefined) {
      environment.log.error('Property not Found!');
      return false;
    }

    environment.setOutput('Property Value', propertyValue);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
};
