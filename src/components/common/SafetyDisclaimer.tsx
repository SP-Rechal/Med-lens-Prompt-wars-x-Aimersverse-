import { ShieldAlert } from 'lucide-react';

export function SafetyDisclaimer() {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 text-sm text-blue-800 flex items-start gap-3">
      <ShieldAlert className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
      <div>
        <p>
          <span className="font-semibold">⚕️ Not a diagnostic tool.</span> MedLens is an information organization tool. It does not provide medical diagnoses, treatment recommendations, or replace professional medical advice. Always consult a qualified healthcare professional.
        </p>
      </div>
    </div>
  );
}
