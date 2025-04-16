// app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ThemeEffect } from '@/lib/theme-effect'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const metadata: Metadata = {
  title: 'Social Bubble - Your Social Media Marketing Partner',
  description: 'Designing Exceptional Web Experiences that Bring More Happiness to the Digital World',
  keywords: ['web development', 'ecommerce', 'shopify', 'wordpress', 'android development'],
  authors: [{ name: 'Omkar Palika' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased theme-transition bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="offer-page-theme"
        >
          <ThemeEffect />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
