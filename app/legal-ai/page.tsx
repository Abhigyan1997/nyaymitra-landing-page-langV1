"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bot, User, Send, Sparkles, Brain, Zap, ArrowRight, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function LegalAIPage() {
  const [messages, setMessages] = useState<Array<{ type: "user" | "ai"; content: string }>>([
    {
      type: "ai",
      content: "Hello! I am NyayMitra AI, your legal assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage = input.trim()
    setMessages((prev) => [...prev, { type: "user", content: userMessage }])
    setInput("")
    setIsLoading(true)

    // Simulate AI thinking
    setTimeout(() => {
      setIsTyping(true)

      // Simulate AI response after thinking
      setTimeout(() => {
        setIsTyping(false)
        setIsLoading(false)

        // Generate response based on user input
        let response = ""

        if (userMessage.toLowerCase().includes("property") || userMessage.toLowerCase().includes("land")) {
          response =
            "Property disputes are common in India. Under the Transfer of Property Act, 1882, you have specific rights. I recommend documenting all ownership papers and considering mediation before litigation. Would you like me to explain more about property rights or the legal process for disputes?"
        } else if (userMessage.toLowerCase().includes("divorce") || userMessage.toLowerCase().includes("marriage")) {
          response =
            "Divorce in India is governed by personal laws based on religion. Under the Hindu Marriage Act or Special Marriage Act, you can file for divorce on grounds like cruelty, desertion, or mutual consent. The process typically takes 6-18 months. Would you like information about alimony, child custody, or the specific procedure?"
        } else if (userMessage.toLowerCase().includes("tenant") || userMessage.toLowerCase().includes("rent")) {
          response =
            "Tenant rights in India are protected under the Rent Control Acts of various states. You're entitled to proper notice periods, receipt of rent payments, and protection against arbitrary eviction. Security deposits are typically 2-3 months' rent. Would you like specific information about your state's rental laws?"
        } else {
          response =
            "Thank you for your query. Based on Indian legal frameworks, I can help you understand your rights and options. Could you provide more specific details about your situation so I can give you more targeted information? Remember, while I can provide general legal information, consulting with a verified lawyer for your specific case is always recommended."
        }

        setMessages((prev) => [...prev, { type: "ai", content: response }])
      }, 2000)
    }, 1000)
  }

  const handleSampleQuestion = (question: string) => {
    setInput(question)
  }

  const sampleQuestions = [
    "What are my rights in a property dispute with my neighbor?",
    "How do I file for divorce in India?",
    "What are tenant rights in India?",
    "How can I register a complaint against police misconduct?",
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Advanced Background */}
      <div className="fixed inset-0 z-0">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-black" />

        {/* Neural Network Grid */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1000 1000">
            <defs>
              <pattern id="neural-grid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <circle cx="25" cy="25" r="1" fill="#3b82f6" opacity="0.5">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
                </circle>
              </pattern>
              <linearGradient id="neural-line" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#neural-grid)" />
            {[...Array(20)].map((_, i) => (
              <line
                key={i}
                x1={Math.random() * 1000}
                y1={Math.random() * 1000}
                x2={Math.random() * 1000}
                y2={Math.random() * 1000}
                stroke="url(#neural-line)"
                strokeWidth="1"
                opacity="0.3"
              >
                <animate
                  attributeName="opacity"
                  values="0;0.6;0"
                  dur={`${2 + Math.random() * 3}s`}
                  repeatCount="indefinite"
                  begin={`${Math.random() * 2}s`}
                />
              </line>
            ))}
          </svg>
        </div>

        {/* Dynamic Mouse-Following Orbs */}
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x / 8,
            top: mousePosition.y / 8,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-md opacity-30 group-hover:opacity-60 transition-all duration-500 animate-pulse" />
              <div className="relative bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-2 rounded-xl shadow-xl transform group-hover:scale-110 transition-all duration-500">
                <Brain className="h-6 w-6 text-white group-hover:rotate-12 transition-transform duration-500" />
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              NyayMitra AI
            </span>
          </Link>

          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="bg-white/5 border-white/10 text-white hover:bg-white/10 backdrop-blur-xl"
            >
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Legal AI Assistant
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Get instant legal guidance powered by advanced AI trained on Indian laws and regulations
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-500/5 to-purple-500/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
            <div className="space-y-6 mb-6 max-h-[500px] overflow-y-auto">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex max-w-[80%] ${
                      message.type === "user"
                        ? "bg-blue-600 text-white rounded-2xl rounded-tr-none"
                        : "bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-2xl rounded-tl-none"
                    } px-4 py-3`}
                  >
                    <div className="mr-3 mt-0.5">
                      {message.type === "user" ? (
                        <User className="h-5 w-5 text-white/70" />
                      ) : (
                        <Bot className="h-5 w-5 text-blue-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm md:text-base">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex max-w-[80%] bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-2xl rounded-tl-none px-4 py-3">
                    <div className="mr-3 mt-0.5">
                      <Bot className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your legal question here..."
                className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-xl"
              >
                {isLoading ? (
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </Button>
            </form>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-white/80 mb-4 flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-blue-400" />
              Sample Questions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sampleQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleSampleQuestion(question)}
                  className="bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 text-left justify-start h-auto py-3 group"
                >
                  <MessageSquare className="h-4 w-4 mr-2 text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="truncate">{question}</span>
                </Button>
              ))}
            </div>
          </div>

          <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-white/10">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-xl">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Connect with a Real Lawyer</h3>
                  <p className="text-white/70 mb-4">
                    For complex legal matters, connect with a verified lawyer specialized in your area of concern
                  </p>
                  <Link href="/lawyers">
                    <Button className="bg-white/10 hover:bg-white/20 text-white group">
                      Find Expert Lawyers
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
