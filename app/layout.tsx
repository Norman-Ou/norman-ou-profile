import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '区睿哲 · OU Ruizhe — AI for Science',
  description:
    '区睿哲 (OU Ruizhe / Richie) — AI for Science, remote sensing and Earth observation. PhD student at Peking University.',
  metadataBase: new URL('https://example.com'),
  openGraph: {
    title: '区睿哲 · OU Ruizhe — AI for Science',
    description:
      'AI for Science, remote sensing and Earth observation. PhD student at Peking University.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Noto+Serif+SC:wght@500;600&family=IBM+Plex+Sans:wght@400;500;600&family=Noto+Sans+SC:wght@300;400;500&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
