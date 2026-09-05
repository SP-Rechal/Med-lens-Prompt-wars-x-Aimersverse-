import React from 'react';
import { Conflict } from '@/types/analysis';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

interface ConflictAlertProps {
  conflict: Conflict;
}

export function ConflictAlert({ conflict }: ConflictAlertProps) {
  const variant = conflict.severity === 'high' ? 'destructive' : 'default';
  const severityColors = {
    high: 'bg-red-500 hover:bg-red-600 text-white',
    medium: 'bg-amber-500 hover:bg-amber-600 text-white',
    low: 'bg-gray-500 hover:bg-gray-600 text-white',
  };

  return (
    <Alert variant={variant} className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-2">
        Conflict Detected
        <Badge className={severityColors[conflict.severity]}>{conflict.severity}</Badge>
        <Badge variant="outline">Requires clarification</Badge>
      </AlertTitle>
      <AlertDescription className="mt-2 flex flex-col gap-2">
        <p>{conflict.description}</p>
        <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
          <div className="p-2 bg-muted rounded-md border">
            <span className="font-semibold block mb-1">Source 1:</span>
            {conflict.sources.value1}
          </div>
          <div className="p-2 bg-muted rounded-md border">
            <span className="font-semibold block mb-1">Source 2:</span>
            {conflict.sources.value2}
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
}
