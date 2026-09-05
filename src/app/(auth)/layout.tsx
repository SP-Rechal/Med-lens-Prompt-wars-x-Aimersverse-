import { Shield } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <main className="flex-grow flex items-center justify-center">
        {children}
      </main>
      
      <footer className="py-6 text-center text-slate-500 text-sm border-t border-slate-200 bg-white">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center space-y-2">
          <div className="flex items-center space-x-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-full">
            <Shield className="w-4 h-4" />
            <span className="font-medium">Medical Information System</span>
          </div>
          <p>
            This system provides AI-assisted clinical information intelligence.
            <br />
            It is designed to assist, not replace, professional medical judgment. 
            Always verify findings with primary source documents.
          </p>
          <p className="text-xs text-slate-400 mt-2">
            © {new Date().getFullYear()} MedLens. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
