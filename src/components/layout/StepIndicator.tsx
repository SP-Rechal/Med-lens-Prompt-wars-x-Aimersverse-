'use client';

import { useWorkflowStore, STEP_LABELS, type WorkflowStep } from '@/store/workflow-store';
import { cn } from '@/lib/utils';
import { ClipboardList, Upload, FileText, CheckSquare, FileCheck, Check } from 'lucide-react';

const ICONS: Record<WorkflowStep, React.ElementType> = {
  intake: ClipboardList,
  upload: Upload,
  record: FileText,
  review: CheckSquare,
  summary: FileCheck,
};

const STEPS: WorkflowStep[] = ['intake', 'upload', 'record', 'review', 'summary'];

export function StepIndicator() {
  const { currentStep, completedSteps, setStep, isStepAccessible } = useWorkflowStore((state) => state);

  return (
    <div className="w-full py-4">
      {/* Mobile View */}
      <div className="md:hidden flex items-center justify-between bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center gap-3">
          {(() => {
            const Icon = ICONS[currentStep];
            return <Icon className="w-5 h-5 text-blue-600" />;
          })()}
          <span className="font-semibold text-blue-900">{STEP_LABELS[currentStep]}</span>
        </div>
        <span className="text-sm font-medium text-blue-600">
          Step {STEPS.indexOf(currentStep) + 1} of {STEPS.length}
        </span>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex items-center justify-between w-full relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>
        {STEPS.map((step, index) => {
          const isCurrent = step === currentStep;
          const isAccessible = isStepAccessible(step);
          const isPast = STEPS.indexOf(step) < STEPS.indexOf(currentStep);
          const Icon = isPast ? Check : ICONS[step];

          return (
            <div key={step} className="flex flex-col items-center gap-2 bg-white px-2">
              <button
                disabled={!isAccessible}
                onClick={() => setStep(step)}
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors z-10 bg-white',
                  isCurrent ? 'border-blue-600 text-blue-600 shadow-md scale-110' : 
                  isPast ? 'border-green-500 text-green-500 bg-green-50' : 
                  isAccessible ? 'border-gray-400 text-gray-700 hover:border-gray-500' : 'border-gray-200 text-gray-400 cursor-not-allowed'
                )}
              >
                <Icon className={cn("w-5 h-5", isCurrent && "w-6 h-6")} />
              </button>
              <span className={cn(
                'text-xs font-medium',
                isCurrent ? 'text-blue-700 font-bold' : isPast ? 'text-green-600' : isAccessible ? 'text-gray-700' : 'text-gray-400'
              )}>
                {STEP_LABELS[step]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
