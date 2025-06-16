"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Scale, Send } from "lucide-react"
import Link from "next/link"

export default function LegalGPTPage() {
  const [question, setQuestion] = useState("")
  const [messages, setMessages] = useState<
    Array<{
      id: number
      type: "user" | "ai"
      content: string
      suggestions?: string[]
      timestamp: Date
    }>
  >([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sampleQuestions = [
    "What are my rights as a tenant in India?",
    "How to file a consumer complaint?",
    "What documents are needed for property registration?",
    "Can I get divorce without mutual consent?",
    "What is the process for filing an FIR?",
    "How to register a trademark in India?",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    const userMessage = {
      id: Date.now(),
      type: "user" as const,
      content: question,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)
    setQuestion("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: "ai" as const,
        content:
          "Thank you for your legal question. Based on Indian law, I can provide guidance on this matter. This AI-powered response analyzes your query against our database of legal precedents and current regulations.",
        suggestions: [
          "Connect with a specialist lawyer",
          "Get detailed legal documentation",
          "Schedule a consultation",
          "Learn about related laws",
        ],
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 2000)
  }

  const handleSampleQuestion = (sampleQ: string) => {
    setQuestion(sampleQ)
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
      </div>

      {/* Navigation */}
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Legal AI Assistant
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Get instant AI-powered legal guidance for your questions about Indian law
          </p>
        </div>

        {/* Sample Questions */}
        {messages.length === 0 && (
          <Card className="mb-8 bg-white/5 backdrop-blur-xl border border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Popular Legal Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {sampleQuestions.map((q, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="text-left h-auto p-4 bg-white/5 border-white/10 hover:bg-white/10 text-white"
                    onClick={() => handleSampleQuestion(q)}
                  >
                    {q}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Messages */}
        {messages.length > 0 && (
          <div className="space-y-6 mb-8">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-3xl">
                  <div
                    className={`p-4 rounded-lg ${
                      message.type === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-white/10 border border-white/20 text-white"
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.suggestions && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs bg-white/5 text-white border-white/20"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Input Form */}
        <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex space-x-4">
                <Textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask your legal question here..."
                  className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-white/50"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={!question.trim() || isLoading}
                  className="bg-gradient-to-r from-blue-500 to-purple-500"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
