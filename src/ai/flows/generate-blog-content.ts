'use server';

/**
 * @fileOverview An AI agent for generating blog content about Nairobi suburbs.
 *
 * - generateBlogContent - A function that generates blog content based on a suburb name.
 * - GenerateBlogContentInput - The input type for the generateBlogContent function.
 * - GenerateBlogContentOutput - The return type for the generateBlogContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBlogContentInputSchema = z.object({
  suburbName: z.string().describe('The name of the Nairobi suburb to generate content about.'),
});
export type GenerateBlogContentInput = z.infer<typeof GenerateBlogContentInputSchema>;

const GenerateBlogContentOutputSchema = z.object({
  title: z.string().describe('The title of the blog post.'),
  content: z.string().describe('The generated blog content for the suburb.'),
});
export type GenerateBlogContentOutput = z.infer<typeof GenerateBlogContentOutputSchema>;

export async function generateBlogContent(input: GenerateBlogContentInput): Promise<GenerateBlogContentOutput> {
  return generateBlogContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBlogContentPrompt',
  input: {schema: GenerateBlogContentInputSchema},
  output: {schema: GenerateBlogContentOutputSchema},
  prompt: `You are an expert content creator specializing in Nairobi suburbs.

  Generate an engaging and informative blog post about the following suburb in Nairobi:

  Suburb Name: {{{suburbName}}}

  Include information about the lifestyle, amenities, and attractions in the suburb. The blog post should have a title and content.
  The title should be catchy and relevant to the suburb.
  The content should be well-structured and easy to read.
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
