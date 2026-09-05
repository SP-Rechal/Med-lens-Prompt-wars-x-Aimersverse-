'use client';

import React from 'react';
import { StepIndicator } from '@/components/layout/StepIndicator';
import { useWorkflowStore } from '@/store/workflow-store';
import PatientIntakeForm from '@/components/intake/PatientIntakeForm';
import ReportUploader from '@/components/upload/ReportUploader';
import StructuredRecord from '@/components/record/StructuredRecord';
import ReviewPanel from '@/components/review/ReviewPanel';
import PatientSummary from '@/components/summary/PatientSummary';
import { Card } from '@/components/ui/card';

export default function NewRecordPage() {
  const { currentStep } = useWorkflowStore((state: any) => state);

  return (
    <div className="container mx-auto p-6 max-w-5xl space-y-8">
      <StepIndicator />
      
      <Card className="p-6 shadow-sm border">
        {currentStep === 'intake' && <PatientIntakeForm />}
        {currentStep === 'upload' && <ReportUploader />}
        {currentStep === 'record' && <StructuredRecord />}
        {currentStep === 'review' && <ReviewPanel />}
        {currentStep === 'summary' && <PatientSummary />}
      </Card>
    </div>
  );
}
