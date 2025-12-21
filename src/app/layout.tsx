import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Coaching Emocional Online | Recupera Calma en 6-8 Sesiones',
  description: 'Agenda tu sesión gratuita de coaching emocional online. Recupera calma y claridad en 6–8 sesiones. Especializado en estrés laboral para profesionales.',
  keywords: 'coaching emocional, coaching online, estrés laboral, profesionales, bienestar emocional, gestión del estrés, sesiones personalizadas',
  authors: [{ name: 'Coach Emocional' }],
  robots: 'index, follow',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        url: '/android-chrome-512x512.png',
      },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://coaching-emocional.com',
    title: 'Coaching Emocional Online | Recupera Calma en 6-8 Sesiones',
    description: 'Agenda tu sesión gratuita de coaching emocional online. Recupera calma y claridad en 6–8 sesiones.',
    siteName: 'Coaching Emocional',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coaching Emocional Online | Recupera Calma en 6-8 Sesiones',
    description: 'Agenda tu sesión gratuita de coaching emocional online. Recupera calma y claridad en 6–8 sesiones.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
