import { ExtractedReport } from './report';
import { AnalysisResult } from './analysis';

export type Symptom = {
  description: string;
  duration?: string;
  severity?: string;
  frequency?: string;
};

export type Allergy = {
  allergen: string;
  severity?: string;
  reaction?: string;
};

export type Medication = {
  name: string;
  dosage?: string;
  frequency?: string;
  duration?: string;
};

export type PatientIntake = {
  id: string;
  name: string;
  age: number;
  sex: 'male' | 'female' | 'other';
  symptoms: Symptom[];
  conditions: string[];
  allergies: Allergy[];
  medications: Medication[];
  notes?: string;
  createdAt: string | Date;
};

export type PatientRecord = PatientIntake & {
  extractedData?: ExtractedReport[];
  analysisResults?: AnalysisResult;
  reviewState?: 'pending' | 'reviewed' | 'needs-attention';
  summary?: string;
};
