import type {Metadata} from 'next';
import { Inter, Amiri } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const amiri = Amiri({ weight: ['400', '700'], subsets: ['arabic'], variable: '--font-amiri' });

export const metadata: Metadata = {
  title: 'د رسول الله مختلف احادیث | Different Hadiths of the Prophet',
  description: 'Sayings and teachings of the noble Messenger of Allah ﷺ',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${amiri.variable}`}>
      <body suppressHydrationWarning className="font-sans antialiased text-neutral-900 bg-neutral-50">{children}</body>
    </html>
  );
}
