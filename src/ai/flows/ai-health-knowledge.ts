
'use server';

/**
 * @fileOverview Provides AI-powered analysis for general health questions.
 *
 * - analyzeHealthIssue - A function that analyzes a user's query or document.
 * - HealthAnalysisInput - The input type for the function.
 * - HealthAnalysisOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const HealthAnalysisInputSchema = z.object({
  query: z.string().describe('The user\'s health-related question or description of their issue.'),
  documentDataUri: z.string().describe("A document or image as a data URI. Expected format: 'data:<mimetype>;base64,<encoded_data>'.").optional(),
  category: z.string().describe('The selected health category for focused analysis.').optional(),
});
export type HealthAnalysisInput = z.infer<typeof HealthAnalysisInputSchema>;

const HealthAnalysisOutputSchema = z.object({
  summary: z.string().describe('A simple, easy-to-understand summary of the health issue based on the provided information.'),
  nextSteps: z.array(z.string()).describe('A list of potential next steps or things to consider, such as lifestyle changes or consulting a specific type of specialist.'),
});
export type HealthAnalysisOutput = z.infer<typeof HealthAnalysisOutputSchema>;

const prompt = ai.definePrompt({
  name: 'healthKnowledgePrompt',
  input: { schema: HealthAnalysisInputSchema },
  output: { schema: HealthAnalysisOutputSchema },
  prompt: `You are an AI health assistant. Your role is to provide general educational information based on a user's query or uploaded document. You must not provide a medical diagnosis.

  {{#if category}}
  The user has selected the '{{{category}}}' category. Act as an expert on this topic and provide a detailed, focused analysis based on their query.
  {{/if}}

  Analyze the user's input:
  - User's question: {{{query}}}
  {{#if documentDataUri}}- User's document: {{media url=documentDataUri}}{{/if}}

  Provide a simple summary of the potential issue and suggest general, non-prescriptive next steps. For example, recommend consulting a doctor, suggest lifestyle changes (like diet or exercise), or mention relevant types of tests to discuss with a healthcare provider.

  Always prioritize safety and strongly state that your response is not medical advice.
  `,
});

const healthKnowledgeFlow = ai.defineFlow(
  {
    name: 'healthKnowledgeFlow',
    inputSchema: HealthAnalysisInputSchema,
    outputSchema: HealthAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

export async function analyzeHealthIssue(input: HealthAnalysisInput): Promise<HealthAnalysisOutput> {
  return healthKnowledgeFlow(input);
}
