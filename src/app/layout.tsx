import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Viventure — WhatsApp Business API',
  description:
    'WhatsApp Business API built for developers. Manage instances, messages, webhooks, and MCP tools behind one canonical REST API.',
  openGraph: {
    title: 'Viventure — WhatsApp Business API',
    description:
      'WhatsApp Business API built for developers. Manage instances, messages, webhooks, and MCP tools behind one canonical REST API.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#ffffff] text-[#0a0a0a] antialiased selection:bg-neutral-200 min-h-screen">
        {children}
      </body>
    </html>
  );
}
