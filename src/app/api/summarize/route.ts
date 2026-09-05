import { NextRequest, NextResponse } from 'next/server';
import { generateSummary } from '@/lib/ai/gemini';
import { createSourced } from '@/lib/utils/source-tracking';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { patientRecord } = body;
    
    if (!patientRecord) {
      return NextResponse.json({ error: 'patientRecord is required' }, { status: 400 });
    }
    
    const summaryText = await generateSummary(patientRecord);
    
    const result = {
      summary: createSourced(summaryText, 'ai-generated'),
      safetyDisclaimer: "This summary is AI-generated for informational purposes and does NOT constitute medical advice. Please consult a healthcare professional."
    };

    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Summarize API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate summary', details: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
}
