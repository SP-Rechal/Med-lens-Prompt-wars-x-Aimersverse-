import { GoogleGenerativeAI } from '@google/generative-ai';
import { EXTRACTION_PROMPT, SUMMARY_PROMPT, CONFLICT_PROMPT, CLARIFICATION_PROMPT } from './prompts';
import { extractionResponseSchema, conflictResponseSchema, clarificationResponseSchema } from './schemas';
import type { ExtractedReport, PatientIntake, PatientRecord, Conflict, ClarificationQuestion } from '@/types';

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is missing.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const modelFlash = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function extractReportData(rawText: string): Promise<ExtractedReport> {
  try {
    const prompt = EXTRACTION_PROMPT.replace('{text}', rawText);
    const result = await modelFlash.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.1,
        responseMimeType: "application/json",
        responseSchema: extractionResponseSchema as any,
      }
    });

    const responseText = result.response.text();
    return JSON.parse(responseText) as ExtractedReport;
  } catch (error) {
    console.error("Error in extractReportData:", error);
    throw new Error(`Failed to extract report data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function generateSummary(record: PatientRecord): Promise<string> {
  try {
    const prompt = SUMMARY_PROMPT.replace('{record}', JSON.stringify(record, null, 2));
    const result = await modelFlash.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
      }
    });
    
    return result.response.text();
  } catch (error) {
    console.error("Error in generateSummary:", error);
    throw new Error(`Failed to generate summary: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function detectConflicts(intake: PatientIntake, report: ExtractedReport): Promise<Conflict[]> {
  try {
    const prompt = CONFLICT_PROMPT
      .replace('{intake}', JSON.stringify(intake, null, 2))
      .replace('{report}', JSON.stringify(report, null, 2));
      
    const result = await modelFlash.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.1,
        responseMimeType: "application/json",
        responseSchema: conflictResponseSchema as any,
      }
    });

    const responseText = result.response.text();
    return JSON.parse(responseText) as Conflict[];
  } catch (error) {
    console.error("Error in detectConflicts:", error);
    throw new Error(`Failed to detect conflicts: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function generateClarifications(intake: PatientIntake, report: ExtractedReport): Promise<ClarificationQuestion[]> {
  try {
    const prompt = CLARIFICATION_PROMPT.replace('{data}', JSON.stringify({ intake, report }, null, 2));
      
    const result = await modelFlash.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.2,
        responseMimeType: "application/json",
        responseSchema: clarificationResponseSchema as any,
      }
    });

    const responseText = result.response.text();
    return JSON.parse(responseText) as ClarificationQuestion[];
  } catch (error) {
    console.error("Error in generateClarifications:", error);
    throw new Error(`Failed to generate clarifications: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
