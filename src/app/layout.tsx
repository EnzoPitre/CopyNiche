import type { Metadata } from 'next';
import { Instrument_Serif } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';

const instrument = Instrument_Serif({ 
  weight: "400",
  subsets: ['latin'],
  variable: '--font-instrument' 
});

export const metadata: Metadata = {
  title: 'CopyNiche - Fiches produits générées par IA',
  description: 'Des fiches produits qui vendent, générées en 10 secondes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${GeistSans.variable} ${GeistMono.variable} ${instrument.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
