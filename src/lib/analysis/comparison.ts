import { ExtractedReport, ReportComparison } from '@/types';

function normalizeTestName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function compareReports(previous: ExtractedReport, current: ExtractedReport): any[] {
  const comparisons: any[] = [];
  
  if (!previous.labResults || !current.labResults) {
    return comparisons;
  }
  
  const prevMap = new Map();
  previous.labResults.forEach(res => {
    prevMap.set(normalizeTestName(res.testName), res);
  });
  
  current.labResults.forEach(currRes => {
    const normalizedName = normalizeTestName(currRes.testName);
    const prevRes = prevMap.get(normalizedName);
    
    if (prevRes && typeof currRes.value === 'number' && typeof prevRes.value === 'number') {
      const delta = currRes.value - prevRes.value;
      const percentChange = (delta / prevRes.value) * 100;
      
      let direction: 'decreased' | 'increased' | 'unchanged' = 'unchanged';
      if (delta > 0) direction = 'increased';
      if (delta < 0) direction = 'decreased';
      if (Math.abs(percentChange) < 1) direction = 'unchanged';
      
      let significant = false;
      if (Math.abs(percentChange) > 10) significant = true; // basic threshold
      
      comparisons.push({
        testName: currRes.testName,
        previousValue: prevRes.value,
        currentValue: currRes.value,
        unit: currRes.unit || prevRes.unit,
        delta,
        direction,
        significant
      });
    }
  });
  
  return comparisons;
}
