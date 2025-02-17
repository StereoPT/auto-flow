import { ExecutionEnvironment } from '@/types/executor';
import { AddPropertyToJsonTask } from '../task/AddPropertyToJson';

export const AddPropertyToJsonExecutor = async (
  environment: ExecutionEnvironment<typeof AddPropertyToJsonTask>,
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

    const propertyValue = environment.getInput('Property Value');
    if (!propertyValue) {
      environment.log.error('Property Value not Defined!');
      return false;
    }

    const json = JSON.parse(jsonData);
    json[propertyName] = propertyValue;

    environment.setOutput('Update JSON', JSON.stringify(json));

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
};
