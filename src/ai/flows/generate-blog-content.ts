
'use server';

/**
 * @fileOverview An AI agent for generating blog content.
 */

import {ai} from '@/ai/genkit';
import {
  GenerateBlogContentInputSchema,
  type GenerateBlogContentInput,
  GenerateBlogContentOutputSchema,
  type GenerateBlogContentOutput
} from './types';


const prompt = ai.definePrompt({
  name: 'generateBlogContentPrompt',
  input: {schema: GenerateBlogContentInputSchema},
  output: {schema: GenerateBlogContentOutputSchema},
  prompt: `You are an expert content creator and travel writer specializing in Nairobi, Kenya.

Generate an engaging and informative blog post about the following topic:

Topic: {{{topic}}}

Your blog post should be well-structured, easy to read, and at least 4-5 paragraphs long.
The title should be the same as the topic provided.
The content should be engaging and provide real value to someone interested in life and travel in Nairobi.
`,
});

const generateBlogContentFlow = ai.defineFlow(
  {
    name: 'generateBlogContentFlow',
    inputSchema: GenerateBlogContentInputSchema,
    outputSchema: GenerateBlogContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

export async function generateBlogContent(input: GenerateBlogContentInput): Promise<GenerateBlogContentOutput> {
  return generateBlogContentFlow(input);
}
