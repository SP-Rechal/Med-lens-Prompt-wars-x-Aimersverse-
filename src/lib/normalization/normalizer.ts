import { LabResult, ExtractedReport } from '@/types/report';
import { normalizeTestName } from './medical-terms';
import { normalizeUnit } from './unit-normalizer';

export function normalizeLabResult(result: LabResult): LabResult {
  return {
    ...result,
    normalizedName: normalizeTestName(result.testName),
    unit: result.unit ? normalizeUnit(result.unit) : result.unit,
    referenceRange: result.referenceRange
      ? {
          ...result.referenceRange,
          unit: result.referenceRange.unit ? normalizeUnit(result.referenceRange.unit) : result.referenceRange.unit,
        }
      : undefined,
  };
}

export function normalizeReport(report: ExtractedReport): ExtractedReport {
  return {
    ...report,
    labResults: report.labResults.map(normalizeLabResult),
  };
}
