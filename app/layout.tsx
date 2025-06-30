import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/lib/auth-context';
import { Toaster } from '@/components/ui/sonner';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portal Método VAP - Vendedor de Alta Performance',
  description: 'Portal educacional do Curso Método VAP - Transforme-se em um Vendedor de Alta Performance',
  manifest: '/manifest.json',
  themeColor: '#4B0082',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <AuthProvider>
          <DashboardHeader /> {/* Cabeçalho visível em todas as páginas */}
          <main className="min-h-screen">{children}</main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
