export type SourceType = 'user-provided' | 'ai-extracted' | 'ai-generated' | 'system';

export interface AuditEntry {
  timestamp: string;
  changedBy: string;
  previousValue: any;
  newValue: any;
}

export interface Sourced<T> {
  value: T;
  source: SourceType;
  detail?: string;
  verified: boolean;
  history?: AuditEntry[];
}

export function createSourced<T>(value: T, source: SourceType, detail?: string): Sourced<T> {
  return {
    value,
    source,
    detail,
    verified: source === 'user-provided' // User provided is implicitly verified
  };
}

export function markAsVerified<T>(sourced: Sourced<T>): Sourced<T> {
  return {
    ...sourced,
    verified: true
  };
}

export function updateWithAudit<T>(
  sourced: Sourced<T>, 
  newValue: T, 
  changedBy: string
): { updated: Sourced<T>, audit: AuditEntry } {
  
  const audit: AuditEntry = {
    timestamp: new Date().toISOString(),
    changedBy,
    previousValue: sourced.value,
    newValue
  };
  
  const updated: Sourced<T> = {
    ...sourced,
    value: newValue,
    history: [...(sourced.history || []), audit]
  };
  
  return { updated, audit };
}
