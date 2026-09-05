import { SourceType } from './source';

export type ReferenceRange = {
  min?: number;
  max?: number;
  unit?: string;
  rawText: string;
};

export type LabResult = {
  id: string;
  testName: string;
  normalizedName?: string;
  value: string;
  numericValue?: number;
  unit?: string;
  referenceRange?: ReferenceRange;
  status: 'normal' | 'below' | 'above' | 'no-reference' | 'unknown';
  source: SourceType;
  rawText?: string;
};

export type ExtractedReport = {
  id: string;
  labResults: LabResult[];
  reportDate?: string | Date;
  reportType?: string;
  patientInfoFromReport?: Record<string, string>;
  observations: string[];
  rawText: string;
  extractedAt: string | Date;
};

export type ReportComparison = {
  parameter: string;
  previousValue: string | number;
  currentValue: string | number;
  previousUnit?: string;
  currentUnit?: string;
  change: string | number;
  changePercent?: number;
  direction: 'increased' | 'decreased' | 'unchanged' | 'new';
};
