import { LabResult } from './report';

export type Conflict = {
  id: string;
  type: 'allergy-mismatch' | 'medication-conflict' | 'condition-inconsistency' | 'value-discrepancy' | 'other';
  description: string;
  sources: {
    source1: string;
    value1: string;
    source2: string;
    value2: string;
  };
  severity: 'high' | 'medium' | 'low';
  resolved: boolean;
  resolution?: string;
};

export type ClarificationQuestion = {
  id: string;
  question: string;
  context: string;
  relatedField?: string;
  priority: number;
};

export type AnalysisResult = {
  conflicts: Conflict[];
  clarifications: ClarificationQuestion[];
  outOfRangeFindings: LabResult[];
  summary?: string;
  analyzedAt: string | Date;
};
