'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';
import { usePatientStore } from '@/store/patient-store';
import { Conflict } from '@/types';

interface ConflictResolverProps {
  conflict: Conflict;
}

export default function ConflictResolver({ conflict }: ConflictResolverProps) {
  const { resolveConflict, reviewState } = usePatientStore((state) => state);
  const [resolution, setResolution] = useState<string>('');
  const [notes, setNotes] = useState('');
  
  const isResolved = reviewState.resolvedConflicts[conflict.id] !== undefined;
  const resolutionDetails = reviewState.resolvedConflicts[conflict.id];

  if (isResolved) {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardContent className="pt-6 flex items-center gap-3">
          <CheckCircle2 className="text-green-600" />
          <div>
            <h4 className="font-semibold text-green-900">Conflict Resolved</h4>
            <p className="text-sm text-green-700">Resolution: {resolutionDetails.resolution}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-amber-200 shadow-sm">
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-semibold text-lg">{conflict.description}</h4>
            <div className="flex gap-2 mt-2">
              <Badge variant={conflict.severity === 'high' ? 'destructive' : 'secondary'}>
                {conflict.severity.toUpperCase()} SEVERITY
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${resolution === conflict.sources.value1 ? 'border-primary bg-primary/5' : 'hover:bg-gray-50'}`}
            onClick={() => setResolution(conflict.sources.value1)}
          >
            <div className="text-sm text-gray-500 mb-1">Source 1 ({conflict.sources.source1})</div>
            <div className="font-medium">{conflict.sources.value1}</div>
          </div>
          <div 
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${resolution === conflict.sources.value2 ? 'border-primary bg-primary/5' : 'hover:bg-gray-50'}`}
            onClick={() => setResolution(conflict.sources.value2)}
          >
            <div className="text-sm text-gray-500 mb-1">Source 2 ({conflict.sources.source2})</div>
            <div className="font-medium">{conflict.sources.value2}</div>
          </div>
        </div>

        <div>
          <Textarea 
            placeholder="Additional notes (optional)" 
            value={notes} 
            onChange={(e) => setNotes(e.target.value)} 
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => resolveConflict(conflict.id, 'Dismissed as non-issue')}>
            Dismiss as non-issue
          </Button>
          <Button 
            disabled={!resolution} 
            onClick={() => resolveConflict(conflict.id, resolution + (notes ? ` - ${notes}` : ''))}
          >
            Resolve
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
