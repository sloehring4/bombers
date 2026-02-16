import type { Metadata } from 'next';
import { inter, poppins } from '@/lib/fonts';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: "O'Fallon Bombers Baseball",
  description: "O'Fallon Bombers select youth baseball club — teams, rosters, events, and registration for ages 7U-15U.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="flex min-h-screen flex-col bg-white text-navy-900 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
