import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'د رسول الله مختلف احادیث | Different Hadiths of the Prophet',
  description: 'Sayings and teachings of the noble Messenger of Allah ﷺ',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="font-sans antialiased">{children}</body>
    </html>
  );
}
