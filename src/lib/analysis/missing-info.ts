import { PatientIntake, ExtractedReport, ClarificationQuestion } from '@/types';

export function analyzeMissingInfo(intake: PatientIntake, report: ExtractedReport): ClarificationQuestion[] {
  const questions: ClarificationQuestion[] = [];
  
  if (!intake) return questions;
  
  // Rule-based missing info checks
  if (intake.medications && intake.medications.length > 0) {
    intake.medications.forEach(med => {
      // If med is just a name without dosage
      if (!med.dosage) {
        questions.push({
          id: `question-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          question: `Could you clarify the dosage you take for ${med.name}?`,
          context: 'Missing medication dosage information',
          priority: 2,
          relatedField: 'medications'
        });
      }
    });
  }
  
  // Let AI handle the more complex context-aware missing info (this function can be augmented with the AI one)
  
  return questions;
}
