import { NextRequest, NextResponse } from 'next/server';
import { extractReportData, detectConflicts as detectAiConflicts, generateClarifications } from '@/lib/ai/gemini';
import { analyzeLabResults } from '@/lib/analysis/reference-range';
import { detectConflicts as detectSystemConflicts } from '@/lib/analysis/conflict-detector';
import { analyzeMissingInfo } from '@/lib/analysis/missing-info';
import { createSourced } from '@/lib/utils/source-tracking';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { rawText, patientIntake } = body;
    
    if (!rawText) {
      return NextResponse.json({ error: 'rawText is required' }, { status: 400 });
    }
    
    // 1. AI Extraction
    const extractedReport = await extractReportData(rawText);
    
    // 2. Reference Range Analysis
    if (extractedReport.labResults) {
      extractedReport.labResults = analyzeLabResults(extractedReport.labResults);
    }
    
    // 3. Conflict Detection
    const systemConflicts = detectSystemConflicts(patientIntake, [extractedReport]);
    let aiConflicts: any[] = [];
    if (patientIntake) {
      try {
         aiConflicts = await detectAiConflicts(patientIntake, extractedReport);
      } catch (e) {
         console.warn("AI conflict detection failed, continuing without it.", e);
      }
    }
    
    const allConflicts = [...systemConflicts, ...aiConflicts];
    
    // 4. Missing Info / Clarifications
    const systemMissing = analyzeMissingInfo(patientIntake, extractedReport);
    let aiClarifications: any[] = [];
    if (patientIntake) {
      try {
        aiClarifications = await generateClarifications(patientIntake, extractedReport);
      } catch (e) {
         console.warn("AI clarification generation failed.", e);
      }
    }
    
    const allClarifications = [...systemMissing, ...aiClarifications];
    
    // Apply source tracking to everything
    const analysisResult = {
      report: createSourced(extractedReport, 'ai-extracted', 'Extracted via Gemini 1.5 Flash'),
      conflicts: createSourced(allConflicts, 'ai-generated'),
      clarifications: createSourced(allClarifications, 'ai-generated'),
      safetyDisclaimer: "This system provides AI-extracted clinical information and is NOT a diagnostic tool. Do not use for medical advice."
    };

    return NextResponse.json(analysisResult);
    
  } catch (error) {
    console.error('Analyze API Error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze report', details: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
}
