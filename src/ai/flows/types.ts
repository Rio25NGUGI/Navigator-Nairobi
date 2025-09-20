
/**
 * @fileOverview Type definitions and Zod schemas for AI flows.
 * This file does not contain 'use server' and can be safely imported
 * into client and server components.
 */

import { z } from 'zod';

// Types for generate-blog-content.ts
export const GenerateBlogContentInputSchema = z.object({
  topic: z.string().describe('The topic to generate content about.'),
});
export type GenerateBlogContentInput = z.infer<typeof GenerateBlogContentInputSchema>;

export const GenerateBlogContentOutputSchema = z.object({
  title: z.string().describe('The title of the blog post.'),
  content: z.string().describe('The generated blog content for the topic.'),
});
export type GenerateBlogContentOutput = z.infer<typeof GenerateBlogContentOutputSchema>;


// Types for recommend-suburbs.ts
export const RecommendSuburbsInputSchema = z.object({
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

export const SuburbRecommendationSchema = z.object({
  slug: z.string().describe('The slug of the recommended suburb.'),
  matchReasoning: z.string().describe('A brief explanation of why this suburb is a good match, starting with a score like "Match Score: 9/10".'),
  highlights: z.array(z.string()).describe('A few key highlights of the suburb that align with the user\'s priorities.')
});
export type SuburbRecommendation = z.infer<typeof SuburbRecommendationSchema>;

export const RecommendSuburbsOutputSchema = z.array(SuburbRecommendationSchema).max(3);
export type RecommendSuburbsOutput = z.infer<typeof RecommendSuburbsOutputSchema>;


// Types for submit-contact-form.ts
export const ContactFormInputSchema = z.object({
  name: z.string().describe('The name of the person submitting the form.'),
  email: z.string().email().describe('The email address of the person.'),
  service: z.string().optional().describe('The service the person is interested in.'),
  message: z.string().describe('The message content.'),
});
export type ContactFormInput = z.infer<typeof ContactFormInputSchema>;

export const ContactFormOutputSchema = z.object({
  success: z.boolean().describe('Whether the form submission was successful.'),
  message: z.string().describe('A confirmation message.'),
});
export type ContactFormOutput = z.infer<typeof ContactFormOutputSchema>;
