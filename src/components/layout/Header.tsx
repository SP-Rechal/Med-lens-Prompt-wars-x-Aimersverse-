'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Stethoscope, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm h-16">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-blue-600">
          <Stethoscope className="w-6 h-6" />
          <span className="font-bold text-xl">MedLens</span>
        </Link>
        
        {session && (
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Dashboard
            </Link>
            <Link href="/record/new" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              New Record
            </Link>
          </nav>
        )}

        <div className="hidden md:flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">{session.user?.name || session.user?.email}</span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="text-sm font-medium text-gray-600 hover:text-blue-600"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link href="/login" className="text-sm font-medium text-blue-600 hover:text-blue-700">
              Sign In
            </Link>
          )}
        </div>

        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b px-4 py-4 space-y-4 shadow-lg absolute top-16 left-0 right-0">
          {session ? (
            <>
              <Link href="/dashboard" className="block text-sm font-medium text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                Dashboard
              </Link>
              <Link href="/record/new" className="block text-sm font-medium text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                New Record
              </Link>
              <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
                <span className="text-sm text-gray-500">{session.user?.name}</span>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-left text-sm font-medium text-red-600"
                >
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <Link href="/login" className="block text-sm font-medium text-blue-600" onClick={() => setMobileMenuOpen(false)}>
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
