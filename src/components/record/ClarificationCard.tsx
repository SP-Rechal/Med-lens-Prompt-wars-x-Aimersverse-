import React, { useState } from 'react';
import { ClarificationQuestion } from '@/types/analysis';
import { HelpCircle } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface ClarificationCardProps {
  question: ClarificationQuestion;
  onAnswer?: (id: string, answer: string) => void;
}

export function ClarificationCard({ question, onAnswer }: ClarificationCardProps) {
  const [answer, setAnswer] = useState('');

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3 flex flex-row items-start space-y-0 gap-2">
        <HelpCircle className="h-5 w-5 text-blue-500 mt-0.5" />
        <div className="flex-1 space-y-1">
          <CardTitle className="text-base font-medium flex items-center justify-between">
            {question.question}
            <Badge variant="outline">ai-generated</Badge>
          </CardTitle>
          {question.context && (
            <p className="text-sm text-muted-foreground">{question.context}</p>
          )}
        </div>
      </CardHeader>
      {onAnswer && (
        <CardContent>
          <Textarea 
            placeholder="Type your answer here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="min-h-[80px]"
          />
        </CardContent>
      )}
      {onAnswer && (
        <CardFooter className="pt-0">
          <Button 
            onClick={() => {
              if (answer.trim()) {
                onAnswer(question.id, answer);
                setAnswer('');
              }
            }}
            disabled={!answer.trim()}
          >
            Submit Answer
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
