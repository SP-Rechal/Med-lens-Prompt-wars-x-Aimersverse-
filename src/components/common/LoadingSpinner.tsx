import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
  message?: string;
}

export function LoadingSpinner({ size = 24, className, message }: LoadingSpinnerProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <Loader2 className="animate-spin text-blue-600" size={size} />
      {message && <p className="mt-2 text-sm text-gray-500">{message}</p>}
    </div>
  );
}
