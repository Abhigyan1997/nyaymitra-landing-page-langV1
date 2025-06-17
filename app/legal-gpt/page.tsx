"use client"

import Link from "next/link"
import { Scale } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function LegalGPTPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 bg-black/20 backdrop-blur-xl border-b border-white/10 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center space-x-3">
              <Scale className="h-10 w-10 text-blue-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Nyay Mitra
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/lawyers">
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Find Lawyers
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500">Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Legal AI Assistant
          </h1>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Instantly get AI-powered guidance for your legal questions under Indian law.
          </p>
        </div>

        {/* Chatbase Iframe inside Card */}
        <Card className="bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
          <CardContent className="p-0">
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/elBXW5XncTSaO_Gt4hvrO"
              width="100%"
              style={{ height: "100%", minHeight: "700px" }}
              frameBorder="0"
              className="rounded-xl w-full"
            ></iframe>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
