import { ExecutionEnvironment } from '@/types/executor';
import { ExtractTextFromElementTask } from '../task/ExtractTextFromElement';
import * as cheerio from 'cheerio';

export const ExtractTextFromElementExecutor = async (
  environment: ExecutionEnvironment<typeof ExtractTextFromElementTask>,
): Promise<boolean> => {
  try {
    const selector = environment.getInput('Selector');
    if (!selector) {
      console.error('Selector not Defined!');
      return false;
    }

    const html = environment.getInput('Html');
    if (!html) {
      console.error('HTML not Defined');
      return false;
    }

    const $ = cheerio.load(html);

    const element = $(selector);
    if (!element) {
      console.error('Element Not Found!');
      return false;
    }

    const extractedText = $.text(element);
    if (!extractedText) {
      console.error('Element has No Text!');
      return false;
    }

    environment.setOutput('Extracted text', extractedText);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
