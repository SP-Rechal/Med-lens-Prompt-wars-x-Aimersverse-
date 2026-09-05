export type SourceType = 'user-provided' | 'ai-extracted' | 'ai-generated' | 'report-data' | 'user-corrected';

export type Sourced<T> = {
  value: T;
  source: SourceType;
  sourceDetail?: string;
  confidence?: number;
  verified: boolean;
  originalValue?: T;
};

export type AuditEntry = {
  fieldName: string;
  previousValue: any;
  newValue: any;
  changedBy: string;
  changedAt: Date | string;
  reason?: string;
};
