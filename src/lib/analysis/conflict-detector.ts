import { PatientIntake, ExtractedReport, Conflict } from '@/types';

export function detectConflicts(intake: PatientIntake, reports: ExtractedReport[]): Conflict[] {
  const conflicts: Conflict[] = [];
  
  if (!intake || !reports || reports.length === 0) return conflicts;
  
  // Combine all report findings for simpler checking
  const allFindings = reports.flatMap(report => report.observations || []);
  const allFindingsText = allFindings.join(' ').toLowerCase();
  
  // 1. Check Allergies
  if (intake.allergies && intake.allergies.length > 0) {
    for (const allergy of intake.allergies) {
      if (allFindingsText.includes(allergy.allergen.toLowerCase())) {
        conflicts.push({
          id: `conflict-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          type: 'allergy-mismatch',
          description: `Patient reported allergy to ${allergy.allergen}, but it is mentioned in the report findings.`,
          severity: 'high',
          sources: { source1: 'Patient Intake', value1: allergy.allergen, source2: 'Extracted Report', value2: 'Mentioned in findings' },
          resolved: false
        });
      }
    }
  }
  
  // 2. Check Conditions
  if (intake.conditions && intake.conditions.length > 0) {
    // If patient claims no condition X, but report says X... (hard to do without NLP, just basic keyword matching for now)
  }
  
  return conflicts;
}
