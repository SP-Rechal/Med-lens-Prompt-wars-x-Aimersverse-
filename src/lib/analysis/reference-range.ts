export type ReferenceRange = {
  min?: number;
  max?: number;
  originalText: string;
};

export function parseReferenceRange(rangeText: string): ReferenceRange | null {
  if (!rangeText) return null;
  
  const originalText = rangeText.trim();
  const cleanedText = originalText.replace(/[^\d.><\-\–\s]/g, '').trim();
  
  // Pattern 1: x - y or x – y
  const dashMatch = cleanedText.match(/^([\d.]+)\s*[-\–]\s*([\d.]+)$/);
  if (dashMatch) {
    return {
      min: parseFloat(dashMatch[1]),
      max: parseFloat(dashMatch[2]),
      originalText
    };
  }
  
  // Pattern 2: < x
  const lessThanMatch = cleanedText.match(/^<\s*([\d.]+)$/);
  if (lessThanMatch) {
    return {
      max: parseFloat(lessThanMatch[1]),
      originalText
    };
  }
  
  // Pattern 3: > x
  const greaterThanMatch = cleanedText.match(/^>\s*([\d.]+)$/);
  if (greaterThanMatch) {
    return {
      min: parseFloat(greaterThanMatch[1]),
      originalText
    };
  }
  
  // Return just the original text if unparseable
  return { originalText };
}

export function evaluateAgainstRange(value: number, range: ReferenceRange): 'normal' | 'below' | 'above' | 'unknown' {
  if (isNaN(value)) return 'unknown';
  
  if (range.min !== undefined && value < range.min) {
    return 'below';
  }
  
  if (range.max !== undefined && value > range.max) {
    return 'above';
  }
  
  if (range.min !== undefined || range.max !== undefined) {
    return 'normal';
  }
  
  return 'unknown';
}

export function analyzeLabResults(results: any[]): any[] {
  return results.map(result => {
    let status = result.flag || 'unknown';
    
    if (result.value !== undefined && result.referenceRange) {
      const parsedRange = parseReferenceRange(result.referenceRange);
      if (parsedRange) {
        const evaluation = evaluateAgainstRange(Number(result.value), parsedRange);
        if (evaluation !== 'unknown') {
           status = evaluation;
        }
      }
    }
    
    return {
      ...result,
      computedStatus: status
    };
  });
}
