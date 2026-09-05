'use client';

import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SourceBadge } from '@/components/common/SourceBadge';
import { StatusIndicator } from '@/components/common/StatusIndicator';
import { LabResultsTable } from '@/components/record/LabResultsTable';
import { ConflictAlert } from '@/components/record/ConflictAlert';
import { ClarificationCard } from '@/components/record/ClarificationCard';
import { usePatientStore } from '@/store/patient-store';

export default function StructuredRecord() {
  const { patientIntake, extractedReport, analysisResult } = usePatientStore((state) => state);

  if (!patientIntake) return <div>No patient data</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Structured Medical Record</h2>
      
      <Accordion type="multiple" defaultValue={['info', 'symptoms', 'history', 'allergies', 'medications', 'labs', 'observations', 'conflicts', 'clarifications']} className="w-full">
        
        <AccordionItem value="info">
          <AccordionTrigger>Patient Information</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6 flex justify-between items-start">
                <div>
                  <p><strong>Name:</strong> {patientIntake.name}</p>
                  <p><strong>Age:</strong> {patientIntake.age}</p>
                  <p><strong>Sex:</strong> {patientIntake.sex}</p>
                </div>
                <SourceBadge source="user-provided" />
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="symptoms">
          <AccordionTrigger>Symptoms & Concerns</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-end mb-4"><SourceBadge source="user-provided" /></div>
                {patientIntake.symptoms.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-2">
                    {patientIntake.symptoms.map((sym: any, i: number) => (
                      <li key={i}>{sym.description} (Severity: {sym.severity}, Duration: {sym.duration || 'N/A'}, Freq: {sym.frequency || 'N/A'})</li>
                    ))}
                  </ul>
                ) : <p className="text-gray-500">No symptoms reported.</p>}
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="history">
          <AccordionTrigger>Medical History</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-end mb-4"><SourceBadge source="user-provided" /></div>
                {patientIntake.conditions.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {patientIntake.conditions.map((cond: any, i: number) => <Badge key={i} variant="outline">{cond}</Badge>)}
                  </div>
                ) : <p className="text-gray-500">No conditions reported.</p>}
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="allergies">
          <AccordionTrigger>Allergies</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-end mb-4"><SourceBadge source="user-provided" /></div>
                {patientIntake.allergies.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {patientIntake.allergies.map((all: any, i: number) => (
                      <li key={i}>{all.allergen} - Reaction: {all.reaction} (Severity: {all.severity})</li>
                    ))}
                  </ul>
                ) : <p className="text-gray-500">No allergies reported.</p>}
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="medications">
          <AccordionTrigger>Medications</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-end mb-4"><SourceBadge source="user-provided" /></div>
                {patientIntake.medications.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {patientIntake.medications.map((med: any, i: number) => (
                      <li key={i}>{med.name} - {med.dosage} ({med.frequency})</li>
                    ))}
                  </ul>
                ) : <p className="text-gray-500">No medications reported.</p>}
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="labs">
          <AccordionTrigger>Laboratory Results</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-end mb-4"><SourceBadge source="ai-extracted" /></div>
                {extractedReport?.labResults?.length ? (
                  <LabResultsTable results={extractedReport.labResults} />
                ) : <p className="text-gray-500">No lab results extracted.</p>}
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="observations">
          <AccordionTrigger>Observations</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-end mb-4"><SourceBadge source="ai-extracted" /></div>
                {extractedReport?.observations?.length ? (
                  <ul className="list-disc pl-5 space-y-2">
                    {extractedReport.observations.map((obs: any, i: number) => <li key={i}>{obs}</li>)}
                  </ul>
                ) : <p className="text-gray-500">No observations extracted.</p>}
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {(analysisResult?.conflicts?.length || 0) > 0 && (
          <AccordionItem value="conflicts">
            <AccordionTrigger className="text-red-600 font-semibold">Conflicts & Alerts</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {analysisResult?.conflicts.map((conflict: any, i: number) => (
                  <ConflictAlert key={i} conflict={conflict} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {(analysisResult?.clarifications?.length || 0) > 0 && (
          <AccordionItem value="clarifications">
            <AccordionTrigger className="text-amber-600 font-semibold">Clarification Questions</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {analysisResult?.clarifications.map((clar: any, i: number) => (
                  <ClarificationCard key={i} question={clar} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  );
}
