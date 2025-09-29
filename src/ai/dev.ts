'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/ai-medicine-assistant.ts';
import '@/ai/flows/ai-symptom-check.ts';
import '@/ai/flows/ai-report-analysis.ts';
import '@/ai/flows/ai-diet-plan.ts';
