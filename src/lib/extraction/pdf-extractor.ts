const pdfParse = require('pdf-parse');

export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  try {
    if (!buffer || buffer.length === 0) {
      throw new Error("Provided PDF buffer is empty.");
    }
    
    const data = await pdfParse(buffer);
    
    if (!data.text || data.text.trim().length === 0) {
      throw new Error("No text could be extracted from the PDF. It might be an image-based PDF or corrupt.");
    }
    
    return data.text;
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    throw new Error(`PDF text extraction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
