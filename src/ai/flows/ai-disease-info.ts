
'use server';

/**
 * @fileOverview Provides detailed information about a specific disease or analyzes symptoms using AI.
 *
 * - getDiseaseInfo - Fetches a comprehensive overview of a disease or symptom analysis.
 * - DiseaseInfoInput - The input type for the function.
 * - DiseaseInfoOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const DiseaseInfoInputSchema = z.object({
  diseaseName: z.string().describe('The name of the disease, health condition, or a description of symptoms.'),
  language: z.string().describe("The language for the response (e.g., 'en' for English, 'te' for Telugu)."),
});
export type DiseaseInfoInput = z.infer<typeof DiseaseInfoInputSchema>;

const DiseaseInfoOutputSchema = z.object({
  isDisease: z.boolean().describe("True if the input was identified as a specific disease, false if it was a symptom description."),
  diseaseName: z.string().describe("The name of the identified disease or a title for the symptom analysis."),
  summary: z.string().describe("A simple, easy-to-understand summary of the disease or initial analysis of the symptoms."),
  symptoms: z.array(z.string()).describe("A list of common symptoms associated with the disease or potential causes of the user's symptoms."),
  recommendedDiet: z.array(z.string()).describe("A list of recommended dietary habits or specific foods."),
  recommendedTests: z.array(z.string()).describe("A list of diagnostic tests a doctor might recommend."),
  affectedOrgans: z.string().optional().describe("A summary of organs that may be damaged if the condition is neglected. (Only for diseases)"),
  recommendedSpecialist: z.string().optional().describe("Based on the symptoms, recommend a single, appropriate specialist type to consult. (Only for symptoms)"),
});
export type DiseaseInfoOutput = z.infer<typeof DiseaseInfoOutputSchema>;

const prompt = ai.definePrompt({
  name: 'diseaseInfoPrompt',
  input: { schema: DiseaseInfoInputSchema },
  output: { schema: DiseaseInfoOutputSchema },
  prompt: `You are a medical knowledge AI. Your role is to provide clear, concise, and accurate information for educational purposes, guided by the principle: "Right disease/symptom for the right doctor + Right Diet = 99% cure".
  Your response must be in the specified language: {{language}}.

  First, analyze the user's input to determine if it is a specific disease name or a description of symptoms.
  User Input: "{{{diseaseName}}}"

  **Scenario 1: If the input is a specific disease name (e.g., "Diabetes", "Hypertension", "Malaria"):**
  - Set 'isDisease' to true.
  - 'diseaseName' should be the name of the disease.
  - Provide the following information about the disease:
    1.  **Summary**: A brief overview of what the disease is.
    2.  **Symptoms**: A list of the most common symptoms.
    3.  **Recommended Diet**: General dietary advice, including foods to eat and avoid.
    4.  **Recommended Tests**: Suggest common diagnostic tests that a doctor might use.
    5.  **Affected Organs**: Explain which organs can be damaged if the disease is left untreated.

  **Scenario 2: If the input is a description of symptoms (e.g., "fever and headache", "stomach pain for 2 days"):**
  - Set 'isDisease' to false.
  - 'diseaseName' should be a short title summarizing the symptoms (e.g., "Fever and Headache Analysis").
  - Provide the following analysis:
    1.  **Summary**: An initial analysis of the potential causes for the symptoms.
    2.  **firstAid**: The 'symptoms' field in the output schema should be used to provide simple **first-aid or home care tips** to manage the symptoms. This is a critical step.
    3.  **Recommended Diet**: Suggest a top-level diet plan suitable for the symptoms.
    4.  **Recommended Tests**: Recommend relevant diagnostic tests for discussion with a doctor.
    5.  **Recommended Specialist**: Suggest the single most appropriate specialist (e.g., "General Physician", "Cardiologist") and their department to consult.

  IMPORTANT: Your response must not be a diagnosis. Conclude with a clear disclaimer that the user must consult a qualified healthcare professional for any health concerns. Frame recommendations as things to "discuss with a doctor."
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
