'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import EditableField from '@/components/review/EditableField';
import ConflictResolver from '@/components/review/ConflictResolver';
import VerificationCheckbox from '@/components/review/VerificationCheckbox';
import { SourceBadge } from '@/components/common/SourceBadge';
import { usePatientStore } from '@/store/patient-store';
import { useWorkflowStore } from '@/store/workflow-store';

export default function ReviewPanel() {
  const { extractedReport, analysisResult, reviewState } = usePatientStore((state) => state);
  const { markStepComplete, nextStep } = useWorkflowStore((state) => state);

  const handleComplete = () => {
    markStepComplete('review');
    nextStep();
  };

  const sectionsVerified = reviewState.verifiedSections.length;
  const totalSections = 4;
  const editsMade = Object.keys(reviewState.editedFields).length;
  const conflictsResolved = Object.keys(reviewState.resolvedConflicts).length;

  return (
    <div className="space-y-8">
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Review and verify the AI-extracted information. Edit any errors and resolve conflicts.</h3>
          <p className="text-blue-700">Stats: {editsMade} edits made, {conflictsResolved} conflicts resolved, {sectionsVerified}/{totalSections} sections verified.</p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-bold">Lab Results Review</h3>
        {extractedReport?.labResults?.map((lab: any, i: number) => (
          <EditableField 
            key={i} 
            fieldName={lab.testName} 
            label={lab.testName} 
            value={`${lab.value} ${lab.unit}`} 
            source="ai-extracted" 
          />
        ))}
      </div>

      {analysisResult?.conflicts && analysisResult.conflicts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Conflicts</h3>
          {analysisResult.conflicts.map((conflict: any, i: number) => (
            <ConflictResolver key={conflict.id || i} conflict={conflict} />
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Verification Checklist</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <VerificationCheckbox section="Patient Information" label="Patient Information" />
          <VerificationCheckbox section="Lab Results" label="Lab Results" />
          <VerificationCheckbox section="Observations" label="Observations" />
          <VerificationCheckbox section="Conflicts Reviewed" label="Conflicts Reviewed" />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button size="lg" onClick={handleComplete}>Complete Review</Button>
      </div>
    </div>
  );
}
