import { ExtractTextFromElementTask } from './ExtractTextFromElement';
import { LaunchBrowserTask } from './LaunchBrowser';
import { PageToHtmlTask } from './PageToHtml';

export const TaskRegistry = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: PageToHtmlTask,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask,
};
