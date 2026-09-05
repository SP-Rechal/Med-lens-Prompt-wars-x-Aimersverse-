import React from 'react';
import { LabResult } from '@/types/report';
import { cn } from '@/lib/utils';
// Note: Assuming these components will be created or exist
import { Badge } from '@/components/ui/badge';

interface SourceBadgeProps { type: string }
const SourceBadge = ({ type }: SourceBadgeProps) => <Badge variant="outline">{type}</Badge>;

interface StatusIndicatorProps { status: string }
const StatusIndicator = ({ status }: StatusIndicatorProps) => <Badge variant={status === 'normal' ? 'default' : 'destructive'}>{status}</Badge>;

interface LabResultsTableProps {
  results: LabResult[];
}

export function LabResultsTable({ results }: LabResultsTableProps) {
  if (!results || results.length === 0) {
    return <div className="p-4 text-center text-muted-foreground border rounded-md">No laboratory results extracted</div>;
  }

  const sortedResults = [...results].sort((a, b) => {
    if (a.status !== 'normal' && b.status === 'normal') return -1;
    if (a.status === 'normal' && b.status !== 'normal') return 1;
    return 0;
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-muted text-muted-foreground text-xs uppercase">
          <tr>
            <th className="px-4 py-3 rounded-tl-md">Test Name</th>
            <th className="px-4 py-3">Value</th>
            <th className="px-4 py-3">Unit</th>
            <th className="px-4 py-3">Reference Range</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 rounded-tr-md">Source</th>
          </tr>
        </thead>
        <tbody>
          {sortedResults.map((result, idx) => (
            <tr key={idx} className={cn(
              "border-b last:border-0",
              result.status === 'below' || result.status === 'above' ? "bg-amber-50 dark:bg-amber-950/20" : "bg-green-50 dark:bg-green-950/20"
            )}>
              <td className="px-4 py-3">
                <div className="font-medium">{result.normalizedName || result.testName}</div>
                {result.normalizedName && result.normalizedName !== result.testName && (
                  <div className="text-xs text-muted-foreground">{result.testName}</div>
                )}
              </td>
              <td className={cn("px-4 py-3", result.status !== 'normal' && "font-bold text-destructive")}>
                {result.value}
              </td>
              <td className="px-4 py-3">{result.unit}</td>
              <td className="px-4 py-3 text-muted-foreground italic">
                {typeof result.referenceRange === 'object' ? (result.referenceRange as any).rawText || 'Not provided' : result.referenceRange || 'Not provided'}
              </td>
              <td className="px-4 py-3">
                <StatusIndicator status={result.status} />
              </td>
              <td className="px-4 py-3">
                <SourceBadge type={result.source || 'ai-extracted'} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
