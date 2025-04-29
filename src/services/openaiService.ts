
import OpenAI from 'openai';

let openai: OpenAI | null = null;

export const initializeOpenAI = (apiKey: string) => {
  openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true
  });
};

export const generatePodcastScript = async (topic: string): Promise<string> => {
  if (!openai) {
    throw new Error('OpenAI client not initialized. Please provide an API key first.');
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert podcast script writer. Create an engaging, conversational 2-3 minute podcast script on the given topic. Include an intro, main discussion points, and conclusion. Format it nicely with speaker turns clearly marked."
        },
        {
          role: "user",
          content: `Write a podcast script about: ${topic}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0]?.message?.content || "Failed to generate a script.";
  } catch (error) {
    console.error('Error generating script:', error);
    throw new Error('Failed to generate script. Please try again.');
  }
};
