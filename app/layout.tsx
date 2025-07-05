import type { Metadata, Viewport } from "next" // Add Viewport to the import
import { Inter } from "next/font/google"
import "./globals.css"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

// Update your metadata export
export const metadata: Metadata = {
  title: "Nyay Mitra - AI-Powered Legal Platform",
  description: "Get instant legal advice, connect with verified lawyers, and understand your rights with AI-powered assistance across India.",
  keywords: "legal advice, lawyers India, AI legal help, legal consultation, Indian law",
  icons: {
    icon: "/favicon.ico",
  },
}

// Add this new viewport export
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={300}>
            {children}
            <Toaster
              position="top-center"
              richColors
              closeButton
              expand={false}
              duration={4000}
            />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}