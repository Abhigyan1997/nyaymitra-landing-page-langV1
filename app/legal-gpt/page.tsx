"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Scale, ArrowRight, Zap, ShieldCheck, BookOpen, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

export default function LegalGPTPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: <Zap className="h-6 w-6 text-blue-400" />,
      title: "Instant Answers",
      description: "Get immediate responses to your legal queries 24/7"
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-purple-400" />,
      title: "Indian Law Focused",
      description: "Specialized in IPC, CrPC, Evidence Act and other Indian statutes"
    },
    {
      icon: <BookOpen className="h-6 w-6 text-pink-400" />,
      title: "Case References",
      description: "Includes relevant case laws and precedents"
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-green-400" />,
      title: "Conversational",
      description: "Ask follow-up questions like a real conversation"
    }
  ]

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/auth/login")
    } else {
      setIsLoggedIn(true)
      setIsLoading(false)
    }
  }, [router])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [features.length])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <Scale className="h-12 w-12 text-blue-400 mb-4" />
          <div className="h-4 w-32 bg-blue-900/50 rounded mb-2"></div>
          <div className="h-4 w-24 bg-blue-900/30 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500/10"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              opacity: 0.1
            }}
            animate={{
              x: [null, Math.random() * 100],
              y: [null, Math.random() * 100],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>

      {/* Navbar */}
      <nav className="relative z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <Link href="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Scale className="h-8 w-8 md:h-10 md:w-10 text-blue-400 group-hover:text-purple-400 transition-colors" />
              </motion.div>
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                NyayMitra
              </span>
            </Link>
            <div className="flex items-center space-x-2 md:space-x-4">
              <Link href="/lawyers">
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white text-xs md:text-sm">
                  Find Lawyers
                </Button>
              </Link>
              {!isLoggedIn && (
                <Link href="/auth/login">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all text-xs md:text-sm">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Your 24/7 Legal AI Assistant
            </span>
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto mb-6 md:mb-8">
            Powered by AI trained on Indian laws. Get instant guidance for your legal questions with references to IPC, CrPC, and Supreme Court judgments.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Link href="#try-now" className="w-full sm:w-auto">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-sm md:text-lg py-4 md:py-6 px-6 md:px-8 rounded-lg md:rounded-xl shadow-lg hover:shadow-purple-500/20 transition-all">
                Ask a Legal Question <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </Link>
            <Link href="/lawyers" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full bg-white/10 hover:bg-white/20 border-white/20 text-white text-sm md:text-lg py-4 md:py-6 px-6 md:px-8 rounded-lg md:rounded-xl hover:shadow-white/10 transition-all">
                Connect with Lawyers
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Features Section */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Why Use NyayMitra AI?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="bg-white/5 border border-white/10 backdrop-blur-md h-full">
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="flex items-center space-x-2 md:space-x-3 text-sm md:text-base">
                      {feature.icon}
                      <span>{feature.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-0">
                    <p className="text-white/70 text-xs md:text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Animated Feature Highlight */}
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30 p-4 md:p-6 rounded-lg md:rounded-xl border border-white/10 backdrop-blur-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="flex items-start space-x-3 md:space-x-4"
              >
                <div className="mt-0.5 md:mt-1">
                  {features[activeFeature].icon}
                </div>
                <div>
                  <h3 className="text-base md:text-xl font-semibold text-white">
                    {features[activeFeature].title}
                  </h3>
                  <p className="text-white/80 text-xs md:text-sm">
                    {features[activeFeature].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            How It Works
          </h2>

          <div className="relative">
            <div className="absolute left-4 md:left-6 top-0 h-full w-0.5 bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-pink-500/30"></div>

            <div className="space-y-6 md:space-y-8">
              {[
                {
                  step: "1",
                  title: "Ask Your Question",
                  description: "Type your legal question in simple English or Hindi. Example: 'What are my rights if police arrest me?'"
                },
                {
                  step: "2",
                  title: "Get AI Analysis",
                  description: "Our AI analyzes your question with references to relevant Indian laws, sections, and precedents"
                },
                {
                  step: "3",
                  title: "Review Detailed Answer",
                  description: "Receive a comprehensive response with legal provisions, possible actions, and limitations"
                },
                {
                  step: "4",
                  title: "Connect with Lawyer",
                  description: "For complex matters, get connected with verified NyayMitra lawyers with one click"
                }
              ].map((item, index) => (
                <div key={index} className="relative pl-12 md:pl-16">
                  <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold text-sm md:text-base">
                    {item.step}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">{item.title}</h3>
                  <p className="text-white/80 text-xs md:text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Popular Questions */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Popular Legal Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {[
              "How to file a consumer complaint in India?",
              "What is the procedure for mutual divorce?",
              "Can I get anticipatory bail for IPC 420?",
              "What are tenant rights regarding rent increases?",
              "How to recover money from a cheque bounce?",
              "What is the punishment for cyber crime in India?"
            ].map((question, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className="bg-white/5 border border-white/10 hover:border-purple-400/30 cursor-pointer transition-all"
                  onClick={() => {
                    if (iframeRef.current) {
                      iframeRef.current.scrollIntoView({ behavior: 'smooth' });
                      // In a real implementation, you would also send the question to the iframe here
                    }
                  }}
                >
                  <CardContent className="p-4 md:p-6">
                    <p className="text-white/90 text-sm md:text-base">{question}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chat Interface */}
        <div id="try-now" className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Ask Your Legal Question
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-3 md:p-4 border-b border-white/10">
                <h3 className="font-semibold text-white flex items-center text-sm md:text-base">
                  <MessageSquare className="h-4 w-4 md:h-5 md:w-5 mr-2 text-blue-400" />
                  NyayMitra AI Legal Assistant
                </h3>
              </div>
              <CardContent className="p-0">
                <iframe
                  ref={iframeRef}
                  src="https://www.chatbase.co/chatbot-iframe/elBXW5XncTSaO_Gt4hvrO"
                  width="100%"
                  style={{ height: "100%", minHeight: "500px" }}
                  frameBorder="0"
                  className="w-full"
                  title="Legal AI Assistant"
                ></iframe>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Need Human Legal Assistance?
          </h2>
          <p className="text-base md:text-xl text-white/80 max-w-3xl mx-auto mb-6 md:mb-8">
            While our AI provides excellent guidance, complex legal matters often require human expertise.
          </p>
          <Link href="/lawyers">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-sm md:text-lg py-4 md:py-6 px-6 md:px-8 rounded-lg md:rounded-xl shadow-lg hover:shadow-purple-500/20 transition-all">
              Connect with Verified Lawyers <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-4 md:p-6 rounded-lg md:rounded-xl border border-white/10">
          <h3 className="text-base md:text-lg font-semibold text-white mb-1 md:mb-2 flex items-center">
            <ShieldCheck className="h-4 w-4 md:h-5 md:w-5 mr-2 text-blue-400" />
            Important Disclaimer
          </h3>
          <p className="text-white/80 text-xs md:text-sm">
            NyayMitra AI provides general legal information based on Indian laws. This does not constitute legal advice and should not be relied upon as such.
            For specific legal matters, please consult with a qualified advocate. The information provided may not reflect the most current legal developments
            and is not guaranteed to be correct, complete, or up-to-date.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-black/80 backdrop-blur-xl border-t border-white/10 py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 md:space-x-3 mb-4 md:mb-0">
              <Scale className="h-6 w-6 md:h-8 md:w-8 text-blue-400" />
              <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                NyayMitra
              </span>
            </div>
            <div className="flex space-x-4 md:space-x-6">
              <Link href="/privacy-policy" className="text-white/70 hover:text-white transition-colors text-xs md:text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/70 hover:text-white transition-colors text-xs md:text-sm">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-white/70 hover:text-white transition-colors text-xs md:text-sm">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="mt-4 md:mt-6 text-center md:text-left text-xs md:text-sm text-white/50">
            © {new Date().getFullYear()} NyayMitra | All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}