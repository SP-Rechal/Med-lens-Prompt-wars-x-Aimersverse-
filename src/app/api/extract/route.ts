import { NextRequest, NextResponse } from 'next/server';
import { extractTextFromPdf } from '@/lib/extraction/pdf-extractor';
import { cleanText } from '@/lib/extraction/text-cleaner';
// import { auth } from '@/auth'; // Assuming NextAuth v5 setup

export async function POST(req: NextRequest) {
  try {
    // Basic auth check placeholder
    // const session = await auth();
    // if (!session) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    let rawText = '';

    const contentType = req.headers.get('content-type') || '';
    
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;
      
      if (!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 });
      }
      
      const buffer = Buffer.from(await file.arrayBuffer());
      const extractedText = await extractTextFromPdf(buffer);
      rawText = cleanText(extractedText);
      
    } else if (contentType.includes('application/json')) {
      const body = await req.json();
      if (!body.text) {
        return NextResponse.json({ error: 'No text provided' }, { status: 400 });
      }
      rawText = cleanText(body.text);
    } else {
      return NextResponse.json({ error: 'Unsupported content type' }, { status: 400 });
    }
    
    return NextResponse.json({ rawText, success: true });
    
  } catch (error) {
    console.error('Extract API Error:', error);
    return NextResponse.json(
      { error: 'Failed to extract text', details: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
}
