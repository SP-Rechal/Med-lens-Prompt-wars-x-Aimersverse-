'use client';

import { SessionProvider } from 'next-auth/react';
import { PatientStoreProvider } from '@/store/patient-store';
import { WorkflowStoreProvider } from '@/store/workflow-store';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <PatientStoreProvider>
        <WorkflowStoreProvider>
          {children}
        </WorkflowStoreProvider>
      </PatientStoreProvider>
    </SessionProvider>
  );
}
