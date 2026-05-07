import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { GeistMono } from 'geist/font/mono'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { KleverWalletProvider } from '@/components/providers/KleverWalletProvider'
import { siteConfig } from '@/config/site'
import './globals.css'

const satoshi = localFont({
  src: [
    { path: '../fonts/Satoshi-Light.woff2', weight: '300', style: 'normal' },
    { path: '../fonts/Satoshi-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/Satoshi-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/Satoshi-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-display',
  display: 'swap',
})

const switzer = localFont({
  src: [
    { path: '../fonts/Switzer-Light.woff2', weight: '300', style: 'normal' },
    { path: '../fonts/Switzer-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/Switzer-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/Switzer-Semibold.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${satoshi.variable} ${switzer.variable} ${GeistMono.variable}`}
      >
        <ThemeProvider>
          <KleverWalletProvider>
            <SiteHeader />
            {children}
          </KleverWalletProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
