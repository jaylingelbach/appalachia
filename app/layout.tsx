import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: {
    default:
      'Brown Bear Creative | Web Design & Development for Small Businesses',
    template: '%s | Brown Bear Creative'
  },

  description:
    'Brown Bear Creative is a modern web design and development studio building high-performing websites for ambitious small businesses.',
  keywords: [
    'Modern web design',
    'Remote web development studio',
    'High performance websites',
    'Next.js developer',
    'Small business website design',
    'Brown Bear Creative',
    'Brown Bear Creative'
  ],
  icons: {
    icon: '/icon.svg'
  },
  openGraph: {
    title: 'Brown Bear Creative | Web Design & Development',
    description:
      'Modern, high-performing websites built for small businesses. Based in the St. Louis area.',
    url: 'https://brownbearcreative.org',
    siteName: 'Brown Bear Creative',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/hero-bg.png',
        width: 1200,
        height: 630,
        alt: 'Brown Bear Creative'
      }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
