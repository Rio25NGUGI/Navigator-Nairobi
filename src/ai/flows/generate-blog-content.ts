
'use server';

/**
 * @fileOverview An AI agent for generating blog content.
 *
 * - generateBlogContent - A function that generates blog content based on a topic.
 * - GenerateBlogContentInput - The input type for the generateBlogContent function.
 * - GenerateBlogContentOutput - The return type for the generateBlogContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBlogContentInputSchema = z.object({
  topic: z.string().describe('The topic to generate content about.'),
});
export type GenerateBlogContentInput = z.infer<typeof GenerateBlogContentInputSchema>;

const GenerateBlogContentOutputSchema = z.object({
  title: z.string().describe('The title of the blog post.'),
  content: z.string().describe('The generated blog content for the topic.'),
});
export type GenerateBlogContentOutput = z.infer<typeof GenerateBlogContentOutputSchema>;

export async function generateBlogContent(input: GenerateBlogContentInput): Promise<GenerateBlogContentOutput> {
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

  return generateBlogContentFlow(input);
}
