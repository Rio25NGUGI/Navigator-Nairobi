
'use server';

/**
 * @fileOverview An AI agent for recommending Nairobi suburbs based on user preferences.
 */

import { ai } from '@/ai/genkit';
import { suburbs as suburbData } from '@/lib/suburbs-data';
import {
  RecommendSuburbsInputSchema,
  type RecommendSuburbsInput,
  RecommendSuburbsOutputSchema,
  type RecommendSuburbsOutput,
} from './types';


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
- Priorities: {{{priorities}}}

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

export async function recommendSuburbs(
  input: RecommendSuburbsInput
): Promise<RecommendSuburbsOutput> {
  return recommendSuburbsFlow(input);
}
