'use server';

/**
 * @fileOverview Provides an AI-powered diet plan based on a specific organ's health condition.
 *
 * - generateOrganDietPlan - Creates a personalized diet plan for an organ.
 * - AiOrganDietPlanInput - Input type for the function.
 * - AiOrganDietPlanOutput - Return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const AiOrganDietPlanInputSchema = z.object({
  organName: z.string().describe("The name of the organ (e.g., 'Liver', 'Heart')."),
  condition: z.string().describe("The user's current health condition related to that organ (e.g., 'Liver Cirrhosis', 'Mildly reduced Ejection Fraction')."),
});
export type AiOrganDietPlanInput = z.infer<typeof AiOrganDietPlanInputSchema>;

const AiOrganDietPlanOutputSchema = z.object({
    plan: z.array(z.object({
        meal: z.string().describe('The name of the meal (e.g., Breakfast, Lunch, Dinner, Snacks).'),
        items: z.array(z.string()).describe('A list of food items recommended for this meal.'),
        reason: z.string().describe("A simple explanation for why these food items are recommended for the specified organ's condition."),
    })).describe('A meal-by-meal diet plan.'),
    generalAdvice: z.array(z.string()).describe('A list of general dietary advice points for the organ.'),
});
export type AiOrganDietPlanOutput = z.infer<typeof AiOrganDietPlanOutputSchema>;

export async function generateOrganDietPlan(input: AiOrganDietPlanInput): Promise<AiOrganDietPlanOutput> {
  return organDietPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'organDietPlanPrompt',
  input: {schema: AiOrganDietPlanInputSchema},
  output: {schema: AiOrganDietPlanOutputSchema},
  prompt: `You are an expert AI nutritionist specializing in therapeutic diets for organ health based on ICMR (Indian Council of Medical Research) guidelines.
  
  Your task is to create a simple, one-day diet plan for an Indian user to help correct abnormalities related to a specific organ.

  Organ: {{{organName}}}
  Condition: {{{condition}}}

  Based on the severity implied by the condition (e.g., 'Healthy' vs 'Liver Cirrhosis'), generate a suitable diet plan.

  - Structure the plan with sections for Breakfast, Lunch, and Dinner.
  - For each meal, provide a few recommended food items and a brief reason explaining how it benefits the specified organ.
  - Include a section for 'General Advice' with a few key dietary points.
  - Keep the language simple, encouraging, and easy for a non-medical person to understand.
  - Ensure the food items are commonly available in India.
  `,
});

const organDietPlanFlow = ai.defineFlow(
  {
    name: 'organDietPlanFlow',
    inputSchema: AiOrganDietPlanInputSchema,
    outputSchema: AiOrganDietPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
