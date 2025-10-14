
'use server';

/**
 * @fileOverview Provides detailed information about a specific disease using AI.
 *
 * - getDiseaseInfo - Fetches a comprehensive overview of a disease.
 * - DiseaseInfoInput - The input type for the function.
 * - DiseaseInfoOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const DiseaseInfoInputSchema = z.object({
  diseaseName: z.string().describe('The name of the disease or health condition.'),
  language: z.string().describe("The language for the response (e.g., 'en' for English, 'te' for Telugu)."),
});
type DiseaseInfoInput = z.infer<typeof DiseaseInfoInputSchema>;

const DiseaseInfoOutputSchema = z.object({
  summary: z.string().describe("A simple, easy-to-understand summary of the disease."),
  symptoms: z.array(z.string()).describe("A list of common symptoms associated with the disease."),
  recommendedDiet: z.array(z.string()).describe("A list of recommended dietary habits or specific foods."),
  recommendedTests: z.array(z.string()).describe("A list of diagnostic tests a doctor might recommend."),
  affectedOrgans: z.string().describe("A summary of organs that may be damaged if the condition is neglected."),
});
export type DiseaseInfoOutput = z.infer<typeof DiseaseInfoOutputSchema>;

const prompt = ai.definePrompt({
  name: 'diseaseInfoPrompt',
  input: { schema: DiseaseInfoInputSchema },
  output: { schema: DiseaseInfoOutputSchema },
  prompt: `You are a medical knowledge AI. Your role is to provide clear, concise, and accurate information about a specific health condition for educational purposes.
  Your response must be in the specified language: {{language}}.

  Analyze the following disease: {{{diseaseName}}}

  Provide the following information:
  1.  **Summary**: A brief overview of what the disease is.
  2.  **Symptoms**: A list of the most common symptoms.
  3.  **Recommended Diet**: General dietary advice, including foods to eat and avoid.
  4.  **Recommended Tests**: Suggest common diagnostic tests that a doctor might use to confirm the condition.
  5.  **Affected Organs**: Explain which organs can be damaged if the disease is left untreated or neglected.

  IMPORTANT: Your response must be purely informational and must not constitute medical advice. Always recommend that the user consults a qualified healthcare professional. Frame your "recommended" sections as things to "discuss with a doctor".
  `,
});

const diseaseInfoFlow = ai.defineFlow(
  {
    name: 'diseaseInfoFlow',
    inputSchema: DiseaseInfoInputSchema,
    outputSchema: DiseaseInfoOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

export async function getDiseaseInfo(input: DiseaseInfoInput): Promise<DiseaseInfoOutput> {
  return diseaseInfoFlow(input);
}
