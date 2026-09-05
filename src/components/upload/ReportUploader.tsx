'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SourceBadge } from '@/components/common/SourceBadge';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { usePatientStore } from '@/store/patient-store';
import { useWorkflowStore } from '@/store/workflow-store';
import { Upload } from 'lucide-react';

export default function ReportUploader() {
  const { patientIntake, setRawText, setExtractedReport, setAnalysisResult } = usePatientStore((state) => state);
  const { markStepComplete, nextStep } = useWorkflowStore((state) => state);
  const [isProcessing, setIsProcessing] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleProcess = async () => {
    setIsProcessing(true);
    setError(null);
    try {
      let rawText = textInput;
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/extract', { method: 'POST', body: formData });
        if (!res.ok) throw new Error('Extraction failed');
        const data = await res.json();
        rawText = data.rawText;
      }
      
      setRawText(rawText);

      const analyzeRes = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawText, patientIntake })
      });
      if (!analyzeRes.ok) throw new Error('Analysis failed');
      const analyzeData = await analyzeRes.json();

      setExtractedReport(analyzeData.extractedReport);
      setAnalysisResult(analyzeData.analysisResult);
      
      markStepComplete('upload');
      nextStep();
    } catch (err: any) {
      setError(err.message || 'Something went wrong processing the report.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Medical Report</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="paste" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="paste">Paste Text</TabsTrigger>
              <TabsTrigger value="upload">Upload PDF</TabsTrigger>
            </TabsList>
            <TabsContent value="paste">
              <Textarea 
                placeholder="Paste the lab report text here..." 
                className="min-h-[250px]" 
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
              />
            </TabsContent>
            <TabsContent value="upload">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center flex flex-col items-center justify-center">
                <Upload className="h-10 w-10 text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">Drag and drop your PDF here, or click to select</p>
                <input 
                  type="file" 
                  accept=".pdf" 
                  className="hidden" 
                  id="pdf-upload"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <Button variant="outline" onClick={() => document.getElementById('pdf-upload')?.click()}>Select File</Button>
                {file && <p className="mt-4 text-sm font-medium text-green-600">Selected: {file.name}</p>}
              </div>
            </TabsContent>
          </Tabs>

          {error && <div className="mt-4 text-red-500 font-medium">{error}</div>}

          <div className="mt-6 flex justify-end">
            <Button 
              size="lg" 
              onClick={handleProcess} 
              disabled={isProcessing || (!textInput.trim() && !file)}
            >
              {isProcessing ? <><LoadingSpinner className="mr-2 h-4 w-4" /> Analyzing your report with AI...</> : 'Process Report'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
