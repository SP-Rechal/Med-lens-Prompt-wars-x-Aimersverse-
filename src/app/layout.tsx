import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers/Providers';
import { Header } from '@/components/layout/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MedLens — AI Clinical Intelligence',
  description: 'AI-Powered Clinical Information Intelligence',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} pt-16 min-h-screen bg-slate-50`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
