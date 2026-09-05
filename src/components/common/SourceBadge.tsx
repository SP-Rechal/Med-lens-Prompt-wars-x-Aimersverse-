'use client';

import { cn } from '@/lib/utils';
import { User, Search, Bot, FileText, Pencil } from 'lucide-react';

export type SourceType = 'user-provided' | 'ai-extracted' | 'ai-generated' | 'report-data' | 'user-corrected';

interface SourceBadgeProps {
  source: SourceType;
  detail?: string;
  className?: string;
}

export function SourceBadge({ source, detail, className }: SourceBadgeProps) {
  const config = {
    'user-provided': { bg: 'bg-blue-100', text: 'text-blue-700', icon: User, label: 'User Provided' },
    'ai-extracted': { bg: 'bg-amber-100', text: 'text-amber-700', icon: Search, label: 'AI Extracted' },
    'ai-generated': { bg: 'bg-purple-100', text: 'text-purple-700', icon: Bot, label: 'AI Generated' },
    'report-data': { bg: 'bg-teal-100', text: 'text-teal-700', icon: FileText, label: 'Report Data' },
    'user-corrected': { bg: 'bg-green-100', text: 'text-green-700', icon: Pencil, label: 'User Corrected' },
  };

  const { bg, text, icon: Icon, label } = config[source];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
        bg,
        text,
        className
      )}
      title={detail}
    >
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}
