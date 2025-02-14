import { ExecutionEnvironment } from '@/types/executor';
import puppeteer from 'puppeteer';
import { LaunchBrowserTask } from '../task/LaunchBrowser';

export const LaunchBrowserExecutor = async (
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>,
): Promise<boolean> => {
  try {
    const websiteUrl = environment.getInput('Website Url');

    const browser = await puppeteer.launch({
      headless: true,
    });
    environment.log.info('Browser Started Successfully');

    environment.setBrowser(browser);

    const page = await browser.newPage();
    await page.goto(websiteUrl);
    environment.log.info(`Opened Page at: ${websiteUrl}`);

    environment.setPage(page);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
};
