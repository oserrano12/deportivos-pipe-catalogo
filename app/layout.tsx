import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { MobileHeader } from "@/components/layout/MobileHeader"
import { BottomNav } from "@/components/layout/BottomNav"
import { Footer } from "@/components/layout/Footer"
import { FavoritesProvider } from "@/components/context/FavoritesContext"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Deportivos Pipe | Catálogo",
  description: "Catálogo digital de calzado deportivo y streetwear en Colombia.",
  authors: [{ name: "oserrano12", url: "https://github.com/oserrano12" }],
  creator: "oserrano12",
  publisher: "oserrano12",
  openGraph: {
    title: "Deportivos Pipe | Catálogo",
    description: "Catálogo digital de calzado deportivo y streetwear en Colombia.",
    type: "website",
    locale: "es_CO",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deportivos Pipe | Catálogo",
    description: "Catálogo digital de calzado deportivo y streetwear en Colombia.",
  }
}

import { GoogleTagManager } from '@next/third-parties/google'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300 font-sans antialiased">
        <FavoritesProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <MobileHeader />
            <main className="flex-1 flex flex-col">
              {children}
            </main>
            <Footer />
            <BottomNav />
            <Toaster position="top-center" richColors />
          </ThemeProvider>
        </FavoritesProvider>
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || 'GTM-TGKPL943'} />
      </body>
    </html>
  )
}
