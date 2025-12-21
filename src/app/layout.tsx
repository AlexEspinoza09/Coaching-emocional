import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Coaching Emocional Profesional | Transforma tu Vida',
  description: 'Descubre el poder del coaching emocional. Sesiones personalizadas para mejorar tu bienestar emocional, gestionar el estrés y alcanzar tus metas personales.',
  keywords: 'coaching emocional, bienestar emocional, desarrollo personal, gestión de emociones, coach profesional',
  authors: [{ name: 'Coach Emocional' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://coaching-emocional.com',
    title: 'Coaching Emocional Profesional | Transforma tu Vida',
    description: 'Descubre el poder del coaching emocional. Sesiones personalizadas para mejorar tu bienestar emocional.',
    siteName: 'Coaching Emocional',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coaching Emocional Profesional | Transforma tu Vida',
    description: 'Descubre el poder del coaching emocional. Sesiones personalizadas para mejorar tu bienestar emocional.',
  },
  viewport: 'width=device-width, initial-scale=1',
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
