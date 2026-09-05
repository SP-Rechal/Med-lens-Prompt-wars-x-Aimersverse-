'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { SourceBadge } from '@/components/common/SourceBadge';
import { StatusIndicator } from '@/components/common/StatusIndicator';
import ComparisonTable from '@/components/summary/ComparisonTable';
import { usePatientStore } from '@/store/patient-store';
import { useWorkflowStore } from '@/store/workflow-store';
import { useRouter } from 'next/navigation';

export default function PatientSummary() {
  const { patientIntake, extractedReport, analysisResult, reviewState, previousReport, summary, setSummary, resetStore } = usePatientStore((state) => state);
  const { resetWorkflow } = useWorkflowStore((state) => state);
  const router = useRouter();

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientIntake, extractedReport, analysisResult, reviewState })
      });
      if (!res.ok) throw new Error('Failed to generate summary');
      const data = await res.json();
      setSummary(data.summary);
    } catch (err: any) {
      setError(err.message || 'Error generating summary.');
    } finally {
      setIsGenerating(false);
    }
  };

  const outOfRangeLabs = extractedReport?.labResults?.filter((l: any) => l.status !== 'normal') || [];
  const unresolvedConflictsCount = (analysisResult?.conflicts?.length || 0) - Object.keys(reviewState.resolvedConflicts).length;
  const totalClarifications = analysisResult?.clarifications?.length || 0;

  const handleStartNew = () => {
    resetStore();
    resetWorkflow();
    router.push('/record/new');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>AI Summary</CardTitle>
          <SourceBadge source="ai-generated" />
        </CardHeader>
        <CardContent>
          {summary ? (
            <div className="prose max-w-none whitespace-pre-wrap">{summary}</div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
              <p className="text-gray-500 mb-4">Generate a comprehensive clinical summary based on the reviewed data.</p>
              {error && <p className="text-red-500">{error}</p>}
              <Button onClick={handleGenerateSummary} disabled={isGenerating}>
                {isGenerating ? <><LoadingSpinner className="mr-2 h-4 w-4" /> Generating...</> : 'Generate Summary'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Key Findings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm text-gray-500 mb-2">Out-of-range Labs ({outOfRangeLabs.length})</h4>
                {outOfRangeLabs.length > 0 ? (
                  <ul className="space-y-2">
                    {outOfRangeLabs.map((lab: any, i: number) => (
                      <li key={i} className="flex justify-between items-center text-sm border-b pb-1">
                        <span>{lab.testName}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{lab.value} {lab.unit}</span>
                          <StatusIndicator status={lab.status} />
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : <p className="text-sm text-gray-500">None detected.</p>}
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-sm text-gray-500">Unresolved Conflicts</span>
                <span className={`font-semibold ${unresolvedConflictsCount > 0 ? 'text-red-500' : 'text-green-500'}`}>{unresolvedConflictsCount}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-sm text-gray-500">Clarification Questions</span>
                <span className="font-semibold">{totalClarifications}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Review Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="text-sm text-gray-500">Sections Verified</span>
                <span className="font-semibold">{reviewState.verifiedSections.length} / 4</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-sm text-gray-500">Fields Edited</span>
                <span className="font-semibold">{Object.keys(reviewState.editedFields).length}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-sm text-gray-500">Conflicts Resolved</span>
                <span className="font-semibold">{Object.keys(reviewState.resolvedConflicts).length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {previousReport && (
        <Card>
          <CardHeader>
            <CardTitle>Longitudinal Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ComparisonTable />
          </CardContent>
        </Card>
      )}

      <div className="p-4 bg-gray-100 rounded-lg text-sm text-gray-500 border border-gray-200">
        <strong>Safety Disclaimer:</strong> MedLens is an AI-powered clinical information intelligence system intended to assist healthcare professionals. It does not provide medical diagnoses or treatment recommendations. Always verify AI-extracted information against original source documents.
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={handleStartNew}>Start New Record</Button>
        <Button size="lg">Save Record</Button>
      </div>
    </div>
  );
}
