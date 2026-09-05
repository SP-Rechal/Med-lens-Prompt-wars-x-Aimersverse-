import Link from 'next/link';
import { Search, GitCompare, Shield, AlertTriangle, FileText, BarChart3 } from 'lucide-react';
import { SafetyDisclaimer } from '@/components/common/SafetyDisclaimer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-blue-50 to-white">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 tracking-tight mb-4">
          MedLens
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 max-w-3xl">
          AI-Powered Clinical Information Intelligence
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mb-10">
          Transform fragmented medical information into structured, traceable, human-reviewable patient records.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/dashboard"
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            Get Started
          </Link>
          <Link
            href="#features"
            className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors shadow-sm"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border rounded-xl hover:shadow-md transition-shadow bg-slate-50">
              <Search className="w-10 h-10 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Extraction</h3>
              <p className="text-gray-600">AI-powered report parsing to extract key medical data with precision.</p>
            </div>
            <div className="p-6 border rounded-xl hover:shadow-md transition-shadow bg-slate-50">
              <GitCompare className="w-10 h-10 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Source Tracking</h3>
              <p className="text-gray-600">Every data point traced to its origin for complete transparency.</p>
            </div>
            <div className="p-6 border rounded-xl hover:shadow-md transition-shadow bg-slate-50">
              <Shield className="w-10 h-10 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Human Review</h3>
              <p className="text-gray-600">AI assists, but you decide. Full control over all extracted information.</p>
            </div>
            <div className="p-6 border rounded-xl hover:shadow-md transition-shadow bg-slate-50">
              <AlertTriangle className="w-10 h-10 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Conflict Detection</h3>
              <p className="text-gray-600">Spot inconsistencies between different reports automatically.</p>
            </div>
            <div className="p-6 border rounded-xl hover:shadow-md transition-shadow bg-slate-50">
              <FileText className="w-10 h-10 text-teal-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Structured Records</h3>
              <p className="text-gray-600">Organized clinical data that is easy to read and understand.</p>
            </div>
            <div className="p-6 border rounded-xl hover:shadow-md transition-shadow bg-slate-50">
              <BarChart3 className="w-10 h-10 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Trend Analysis</h3>
              <p className="text-gray-600">Compare reports over time to monitor patient progress.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Disclaimer */}
      <footer className="mt-auto px-4 py-8 bg-white border-t">
        <div className="max-w-4xl mx-auto">
          <SafetyDisclaimer />
        </div>
      </footer>
    </div>
  );
}
