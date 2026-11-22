import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VERVE RESIDENCES // Architectural Estate Portfolio',
  description: 'Flagship residential developments and private estate architecture. Structural clarity, monolithic volumes, and uncompromised materiality.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-neutral-200 antialiased font-sans selection:bg-accent/20 selection:text-white">
        {children}
      </body>
    </html>
  );
}
