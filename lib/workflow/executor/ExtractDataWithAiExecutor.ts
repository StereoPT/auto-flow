import { ExecutionEnvironment } from '@/types/executor';
import { ExtractDataWithAiTask } from '../task/ExtractDataWithAI';
import prisma from '@/lib/prisma';
import { symmetricDecrypt } from '@/lib/encryption';
import OpenAI from 'openai';

export const ExtractDataWithAiExecutor = async (
  environment: ExecutionEnvironment<typeof ExtractDataWithAiTask>,
): Promise<boolean> => {
  try {
    const credentials = environment.getInput('Credentials');
    if (!credentials) {
      environment.log.error('Credentials not Defined!');
      return false;
    }

    const prompt = environment.getInput('Prompt');
    if (!prompt) {
      environment.log.error('Prompt not Defined!');
      return false;
    }

    const content = environment.getInput('Content');
    if (!content) {
      environment.log.error('Content not Defined!');
      return false;
    }

    const credential = await prisma.credential.findUnique({
      where: {
        id: credentials,
      },
    });
    if (!credential) {
      environment.log.error('Credential not Found!');
      return false;
    }

    const plainCredentialValue = symmetricDecrypt(credential.value);
    if (!plainCredentialValue) {
      environment.log.error('Cannot Decrypt Credential!');
      return false;
    }

    const openai = new OpenAI({
      apiKey: plainCredentialValue,
    });

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a webscraper helper that extracts data from HTML or text. You will be given a piece of text or HTML content as input and also the prompt with the data you want to extract. The response should always be only the extracted data as a JSON array or object, without any additional words or explanations. Analyze the input carefully and extract data precisely based on the prompt. If no data is found, return an empty JSON array. Work only with the provided content and ensure the ouput is always a valid JSON array without any surrounding text.',
        },
        {
          role: 'user',
          content: content,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 1,
    });

    environment.log.info(`Prompt Tokens: ${response.usage?.prompt_tokens}`);
    environment.log.info(
      `Completion Tokens: ${response.usage?.completion_tokens}`,
    );

    const result = response.choices[0].message?.content;
    if (!result) {
      environment.log.error('Empty response from AI!');
      return false;
    }

    environment.setOutput('Extracted Data', result);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
};
