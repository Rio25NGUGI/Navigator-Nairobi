
'use server';

/**
 * @fileOverview An AI agent for recommending Nairobi suburbs based on user preferences.
 *
 * - recommendSuburbs - A function that takes quiz answers and returns suburb recommendations.
 * - RecommendSuburbsInput - The input type for the recommendSuburbs function.
 * - RecommendSuburbsOutput - The return type for the recommendSuburbs function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { suburbs as suburbData, type Suburb } from '@/lib/suburbs-data';

// Define input schema based on the quiz questions
const RecommendSuburbsInputSchema = z.object({
  budget: z
    .string()
    .describe('The user\'s housing budget (e.g., economy, mid-range, luxury).'),
  lifestyle: z
    .string()
    .describe(
      'The user\'s preferred lifestyle (e.g., quiet, lively, family-friendly).'
    ),
  priorities: z
    .array(z.string())
    .describe('A list of user\'s top priorities (e.g., nightlife, dining, security).'),
});
export type RecommendSuburbsInput = z.infer<typeof RecommendSuburbsInputSchema>;


const SuburbRecommendationSchema = z.object({
  slug: z.string().describe('The slug of the recommended suburb.'),
  matchReasoning: z.string().describe('A brief explanation of why this suburb is a good match, starting with a score like "Match Score: 9/10".'),
  highlights: z.array(z.string()).describe('A few key highlights of the suburb that align with the user\'s priorities.')
});
export type SuburbRecommendation = z.infer<typeof SuburbRecommendationSchema>;


const RecommendSuburbsOutputSchema = z.array(SuburbRecommendationSchema).max(3);
export type RecommendSuburbsOutput = z.infer<typeof RecommendSuburbsOutputSchema>;


export async function recommendSuburbs(
  input: RecommendSuburbsInput
): Promise<RecommendSuburbsOutput> {
  // Create a string representation of the available suburbs for the prompt
  const suburbsListForPrompt = suburbData.map(s => (
      `- ${s.name} (slug: ${s.slug}): ${s.description} Best for: ${s.tags.join(', ')}. Vibe: ${s.vibe}`
  )).join('\n');


  const prompt = ai.definePrompt({
    name: 'recommendSuburbsPrompt',
    input: { schema: RecommendSuburbsInputSchema },
    output: { schema: RecommendSuburbsOutputSchema },
    prompt: `You are a Nairobi relocation expert. Your goal is to recommend the top 3 suburbs for a user based on their quiz answers.

Analyze the user's preferences:
- Budget: {{{budget}}}
- Lifestyle: {{{lifestyle}}}
- Priorities: {{{JSONstringify priorities}}}

Here is a list of available suburbs with their characteristics:
${suburbsListForPrompt}

Based on the user's preferences, evaluate each suburb and select the three that are the best fit. For each of the top 3 recommendations, provide:
1.  The suburb's slug.
2.  A "matchReasoning" string that starts with a "Match Score: X/10:" followed by a concise, one-sentence explanation for why it's a good match. The score should reflect how well the suburb aligns with ALL of the user's preferences.
3.  An array of "highlights" (2-3 bullet points) that specifically connect the suburb's features to the user's stated priorities.

Return the response as a JSON array of 3 objects, ordered from the best match to the third-best match.
`,
  });

  const recommendSuburbsFlow = ai.defineFlow(
    {
      name: 'recommendSuburbsFlow',
      inputSchema: RecommendSuburbsInputSchema,
      outputSchema: RecommendSuburbsOutputSchema,
    },
    async input => {
      const { output } = await prompt(input);
      return output || [];
    }
  );

  return recommendSuburbsFlow(input);
}
