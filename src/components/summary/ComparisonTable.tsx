'use client';

import React, { useEffect, useState } from 'react';
import { usePatientStore } from '@/store/patient-store';
import { SourceBadge } from '@/components/common/SourceBadge';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ArrowUp, ArrowDown, ArrowRight } from 'lucide-react';
import { ReportComparison } from '@/types';

export default function ComparisonTable() {
  const { extractedReport, previousReport } = usePatientStore((state) => state);
  const [comparisons, setComparisons] = useState<ReportComparison[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (extractedReport && previousReport) {
      const fetchComparison = async () => {
        setIsLoading(true);
        try {
          const res = await fetch('/api/compare', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ currentReport: extractedReport, previousReport })
          });
          if (res.ok) {
            const data = await res.json();
            setComparisons(data.comparisons);
          }
        } catch (error) {
          console.error("Comparison failed", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchComparison();
    }
  }, [extractedReport, previousReport]);

  if (isLoading) {
    return <div className="flex justify-center p-8"><LoadingSpinner className="h-8 w-8" /></div>;
  }

  if (comparisons.length === 0) {
    return <div className="text-center p-8 text-gray-500">No comparison data available.</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end"><SourceBadge source="ai-extracted" /></div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-3 text-left font-medium text-gray-600">Parameter</th>
              <th className="p-3 text-left font-medium text-gray-600">Previous</th>
              <th className="p-3 text-left font-medium text-gray-600">Current</th>
              <th className="p-3 text-left font-medium text-gray-600">Change</th>
              <th className="p-3 text-center font-medium text-gray-600">Direction</th>
            </tr>
          </thead>
          <tbody>
            {comparisons.map((comp, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{comp.parameter}</td>
                <td className="p-3 text-gray-600">{comp.previousValue}</td>
                <td className="p-3 font-semibold">{comp.currentValue}</td>
                <td className="p-3 text-sm">{Number(comp.change) > 0 ? '+' : ''}{comp.change}</td>
                <td className="p-3 flex justify-center">
                  {comp.direction === 'increased' && <ArrowUp className="text-red-500" size={20} />}
                  {comp.direction === 'decreased' && <ArrowDown className="text-blue-500" size={20} />}
                  {comp.direction === 'unchanged' && <ArrowRight className="text-gray-400" size={20} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
