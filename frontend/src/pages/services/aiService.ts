/* import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function generateText(prompt: string): Promise<string> {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    maxTokens: 150,
  });

  return response.data.choices[0].text.trim();
} */