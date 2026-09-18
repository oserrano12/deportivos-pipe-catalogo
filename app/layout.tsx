import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { MobileHeader } from "@/components/layout/MobileHeader"
import { BottomNav } from "@/components/layout/BottomNav"
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300 font-sans antialiased pb-16">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MobileHeader />
          <main className="flex-1">
            {children}
          </main>
          <BottomNav />
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
