import { NextRequest, NextResponse } from 'next/server';
import { compareReports } from '@/lib/analysis/comparison';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { previousReport, currentReport } = body;
    
    if (!previousReport || !currentReport) {
      return NextResponse.json({ error: 'Both previousReport and currentReport are required' }, { status: 400 });
    }
    
    const comparisons = compareReports(previousReport, currentReport);
    
    return NextResponse.json({ comparisons });
    
  } catch (error) {
    console.error('Compare API Error:', error);
    return NextResponse.json(
      { error: 'Failed to compare reports', details: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
}
