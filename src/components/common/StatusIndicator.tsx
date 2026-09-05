'use client';

import { cn } from '@/lib/utils';
import { CheckCircle2, ArrowDown, ArrowUp, Minus, HelpCircle } from 'lucide-react';

export type StatusType = 'normal' | 'below' | 'above' | 'no-reference' | 'unknown';

interface StatusIndicatorProps {
  status: StatusType;
  className?: string;
}

export function StatusIndicator({ status, className }: StatusIndicatorProps) {
  const config = {
    'normal': { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle2, label: 'Normal' },
    'below': { bg: 'bg-amber-100', text: 'text-amber-700', icon: ArrowDown, label: 'Below Range' },
    'above': { bg: 'bg-red-100', text: 'text-red-700', icon: ArrowUp, label: 'Above Range' },
    'no-reference': { bg: 'bg-gray-100', text: 'text-gray-700', icon: Minus, label: 'No Reference' },
    'unknown': { bg: 'bg-gray-100', text: 'text-gray-700', icon: HelpCircle, label: 'Unknown' },
  };

  const { bg, text, icon: Icon, label } = config[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
        bg,
        text,
        className
      )}
    >
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}
