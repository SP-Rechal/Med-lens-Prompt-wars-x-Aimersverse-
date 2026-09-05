import { auth } from '@/auth';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default async function DashboardPage() {
  const session = null;
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {session?.user?.name || 'User'}
        </h1>
        <p className="mt-2 text-gray-600">
          Manage your patients and review clinical information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/record/new" className="block group">
          <div className="h-full bg-white rounded-xl border-2 border-dashed border-blue-300 p-6 flex flex-col items-center justify-center text-center hover:bg-blue-50 hover:border-blue-500 transition-all shadow-sm">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Plus className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-blue-900 mb-2">Start New Patient Record</h2>
            <p className="text-gray-600 text-sm">
              Begin by entering patient intake information, then upload a medical report for AI-powered analysis.
            </p>
          </div>
        </Link>
        
        {/* Placeholder for future recent records */}
        <div className="md:col-span-1 lg:col-span-2 bg-white rounded-xl border p-6 flex flex-col justify-center items-center text-gray-400 shadow-sm min-h-[250px]">
          <p>Recent records will appear here</p>
        </div>
      </div>
    </div>
  );
}
