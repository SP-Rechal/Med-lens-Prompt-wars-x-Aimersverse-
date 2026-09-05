import { z } from 'zod';

export const referenceRangeSchema = z.object({
  min: z.number().optional(),
  max: z.number().optional(),
  unit: z.string().optional(),
  rawText: z.string(),
});

export const labResultSchema = z.object({
  id: z.string(),
  testName: z.string().min(1, 'Test name is required'),
  normalizedName: z.string().optional(),
  value: z.string().min(1, 'Value is required'),
  numericValue: z.number().optional(),
  unit: z.string().optional(),
  referenceRange: referenceRangeSchema.optional(),
  status: z.enum(['normal', 'below', 'above', 'no-reference', 'unknown']),
  source: z.enum(['user-provided', 'ai-extracted', 'ai-generated', 'report-data', 'user-corrected']),
  rawText: z.string().optional(),
});

export const extractedReportSchema = z.object({
  id: z.string(),
  labResults: z.array(labResultSchema).default([]),
  reportDate: z.union([z.string(), z.date()]).optional(),
  reportType: z.string().optional(),
  patientInfoFromReport: z.record(z.string(), z.string()).optional(),
  observations: z.array(z.string()).default([]),
  rawText: z.string().min(1, 'Raw text is required'),
  extractedAt: z.union([z.string(), z.date()]).default(() => new Date()),
});
