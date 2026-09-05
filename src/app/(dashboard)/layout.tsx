import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { SafetyDisclaimer } from '@/components/common/SafetyDisclaimer';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await auth();
  // if (!session) {
  //   redirect('/login');
  // }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col bg-slate-50">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>
      <div className="max-w-7xl mx-auto px-4 pb-6 w-full mt-auto">
        <SafetyDisclaimer />
      </div>
    </div>
  );
}
