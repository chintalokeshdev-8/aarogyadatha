'use server';

/**
 * @fileOverview A general-purpose AI assistant for the medibridge app.
 *
 * - askAiAssistant - A function that answers user questions based on their health data.
 * - AiAssistantInput - The input type for the askAiAssistant function.
 * - AiAssistantOutput - The return type for the askAiAssistant function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { previousAppointments } from '@/lib/appointments-data';
import { labReports } from '@/lib/lab-reports-data';
import { imagingReports } from '@/lib/imaging-reports-data';
import { medicineSchedule } from '@/lib/medicines-data';

const AiAssistantInputSchema = z.object({
  question: z.string().describe('The user\'s question about their health data.'),
});
export type AiAssistantInput = z.infer<typeof AiAssistantInputSchema>;

const AiAssistantOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the user\'s question.'),
});
export type AiAssistantOutput = z.infer<typeof AiAssistantOutputSchema>;

export async function askAiAssistant(input: AiAssistantInput): Promise<AiAssistantOutput> {
  return aiAssistantFlow(input);
}

const aiAssistantFlow = ai.defineFlow(
  {
    name: 'aiAssistantFlow',
    inputSchema: AiAssistantInputSchema,
    outputSchema: AiAssistantOutputSchema,
  },
  async (input) => {
    // Construct a context string from the app's data
    const context = `
      Here is the user's health data:
      
      Appointment History: ${JSON.stringify(previousAppointments, null, 2)}
      
      Lab Reports: ${JSON.stringify(labReports, null, 2)}
      
      Imaging Reports: ${JSON.stringify(imagingReports, null, 2)}
      
      Current Medications: ${JSON.stringify(medicineSchedule, null, 2)}
    `;

    const prompt = `You are a helpful AI health assistant for the medibridge app. Your role is to answer user questions based on the health data provided. Keep your answers concise, clear, and easy to understand. Do not provide medical advice, but rather summarize the data and help the user find information within their records.
    
    Here is the user's question:
    "${input.question}"
    
    Use the following data to answer the question:
    ${context}
    
    Answer:`;

    const { output } = await ai.generate({
      prompt: prompt,
      output: {
        schema: AiAssistantOutputSchema
      }
    });

    return output!;
  }
);
