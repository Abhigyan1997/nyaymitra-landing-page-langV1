import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { TooltipProvider } from "@/components/ui/tooltip" // Import the TooltipProvider

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nyay Mitra - AI-Powered Legal Platform",
  description:
    "Get instant legal advice, connect with verified lawyers, and understand your rights with AI-powered assistance across India.",
  keywords: "legal advice, lawyers India, AI legal help, legal consultation, Indian law",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TooltipProvider> {/* Wrap children with TooltipProvider */}
          {children}
        </TooltipProvider>
      </body>
    </html>
  )
}