"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  PenTool, GraduationCap, FileSignature, Package, Clock, ShoppingBag, FileCode,
  Eye, Info, List, FileSearch, Play, Award, Users, ArrowRight, Brain, Zap,
  Scale, Heart, Building, ShoppingCart, Shield, Briefcase, FileText, Gavel,
  Sparkles, Star, Download, FileCheck, BookOpen, LayoutTemplate
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Predefined positions for the floating dots to avoid hydration mismatch
const FLOATING_DOTS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: Math.floor(Math.random() * 100),
  top: Math.floor(Math.random() * 100),
  delay: Math.random() * 3,
  duration: 2 + Math.random() * 3
}));

export default function ServicesPage() {
  const [hoveredService, setHoveredService] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const services = [
    {
      id: "instant-download",
      title: "Self-Attested Document Download",
      description: "Download pre-filled Rent Agreements, Complaint Letters & Affidavits instantly.",
      icon: FileText,
      color: "from-green-500 to-emerald-500",
      popular: true,
      areas: ["Rent Agreement", "Affidavit Draft", "Police Complaint", "Consumer Complaint"],
      aiFeatures: ["Pre-fillable PDF Templates", "Instant Download", "Razorpay Checkout"],
      pricing: "₹99/document"
    },
    {
      id: "notary-service",
      title: "Remote Notary via Licensed Lawyer",
      description: "Get documents notarized remotely or via courier within 1–4 days.",
      icon: PenTool,
      color: "from-yellow-500 to-orange-500",
      popular: true,
      areas: ["Affidavit", "Authorization Letter", "Power of Attorney"],
      aiFeatures: ["PDF Generation", "Manual Notarization", "Email/Courier Delivery"],
      pricing: "₹399 (e-copy) / ₹799 (courier)"
    },
    {
      id: "ai-affidavit",
      title: "AI Affidavit Assistant",
      description: "Generate clean, ready-to-use affidavits with AI in minutes.",
      icon: FileSignature,
      color: "from-indigo-500 to-purple-500",
      popular: false,
      areas: ["Name Change", "Address Proof", "Lost Certificate", "Declaration"],
      aiFeatures: ["Form-Based GPT Input", "Legal Formatting", "PDF Output"],
      pricing: "₹149/document"
    },
    {
      id: "priority-booking",
      title: "Speed Booking (Priority)",
      description: "Get same-day legal consultations with verified lawyers.",
      icon: Clock,
      color: "from-red-500 to-pink-500",
      popular: false,
      areas: ["Urgent Consultations", "Today Booking"],
      aiFeatures: ["Priority Lawyer Matching", "Razorpay Add-on", "Same-Day Guarantee"],
      pricing: "₹99 extra (optional)"
    },
    {
      id: "legal-store",
      title: "Legal Template Store",
      description: "Purchase verified legal document templates — ready to fill & use.",
      icon: ShoppingBag,
      color: "from-gray-700 to-gray-900",
      popular: false,
      areas: ["Rent Agreement", "Complaint Letter", "Notice Draft", "Declaration"],
      aiFeatures: ["Secure Storage (Firebase/S3)", "Dynamic Pricing", "Preview + Buy"],
      pricing: "₹49–₹299/document"
    },
    {
      id: "ai-pdf",
      title: "AI PDF Generator",
      description: "Use GPT to create any legal text and export it as a formatted PDF.",
      icon: FileCode,
      color: "from-lime-500 to-green-700",
      popular: false,
      areas: ["Police Complaints", "Custom Notices", "Draft Legal Letters"],
      aiFeatures: ["Natural Language Input", "PDFKit Output", "Instant Download"],
      pricing: "₹99/document"
    },
  ];

  const getServiceButtons = (serviceId: string) => {
    switch (serviceId) {
      case "instant-download":
        return {
          primary: { text: "Download Now", icon: Download, href: "/services/downloads" }
        };
      case "notary-service":
        return {
          primary: { text: "Notarize Now", icon: PenTool, href: "/services/notary" }
        };
      case "ai-affidavit":
        return {
          primary: { text: "Generate Now", icon: FileSignature, href: "/services/ai-affidavit" }
        };
      case "priority-booking":
        return {
          primary: { text: "Book Now", icon: Clock, href: "/services/booking" }
        };
      case "legal-store":
        return {
          primary: { text: "Browse Store", icon: ShoppingBag, href: "/services/store" }
        };
      case "ai-pdf":
        return {
          primary: { text: "Create PDF", icon: FileCode, href: "/services/ai-pdf" }
        };
      default:
        return {
          primary: { text: "Get Started", icon: ArrowRight, href: "/services" }
        };
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
        <div className="absolute inset-0 cyber-grid opacity-30" />

        {/* Floating Tech Elements - Client-side only */}
        {isClient && (
          <div className="absolute inset-0">
            {FLOATING_DOTS.map((dot) => (
              <div
                key={dot.id}
                className="absolute w-1 h-1 bg-blue-400/40 rounded-full animate-pulse"
                style={{
                  left: `${dot.left}%`,
                  top: `${dot.top}%`,
                  animationDelay: `${dot.delay}s`,
                  animationDuration: `${dot.duration}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="relative z-50 bg-black/20 backdrop-blur-xl border-b border-white/10 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Scale className="h-10 w-10 text-blue-400 group-hover:text-blue-300 transition-all duration-300 group-hover:rotate-12" />
                <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Nyay Mitra
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/lawyers">
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  Find Lawyers
                </Button>
              </Link>
              <Link href="/legal-gpt">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 border-0">
                  AI Assistant
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 backdrop-blur-sm mb-8 animate-pulse">
              <Sparkles className="h-4 w-4 text-blue-400 mr-2" />
              <span className="text-sm text-blue-300">Instant Legal Solutions</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent pb-2">
              Smart Legal Services
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Get instant access to legal documents, notary services, and expert consultations with our AI-powered platform.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon
              const isHovered = hoveredService === service.id
              const buttons = getServiceButtons(service.id)

              return (
                <Card
                  key={service.id}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 group transform hover:scale-105 hover:-translate-y-2 relative overflow-hidden flex flex-col h-full"
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  {service.popular && (
                    <Badge className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-pink-500 border-0 z-10 shadow-lg">
                      <Star className="h-3 w-3 mr-1" />
                      Popular
                    </Badge>
                  )}

                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                  <CardHeader className="relative">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 relative`}>
                        <IconComponent className="h-8 w-8 text-white" />
                        {isHovered && <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse" />}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl text-white group-hover:text-blue-300 transition-colors duration-300">
                          {service.title}
                        </CardTitle>
                        <div className="text-sm text-white/60 mt-1">{service.pricing}</div>
                      </div>
                    </div>
                    <CardDescription className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                      {service.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative mt-auto">
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm text-blue-300 mb-2 flex items-center">
                        <Brain className="h-4 w-4 mr-2" />
                        AI Features:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {service.aiFeatures.slice(0, 2).map((feature, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="text-xs bg-blue-500/20 text-blue-300 border-blue-500/30"
                          >
                            {feature}
                          </Badge>
                        ))}
                        {service.aiFeatures.length > 2 && (
                          <Badge variant="secondary" className="text-xs bg-purple-500/20 text-purple-300">
                            +{service.aiFeatures.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-sm text-white/70 mb-2">Specialized Areas:</h4>
                      <div className="flex flex-wrap gap-1">
                        {service.areas.slice(0, 3).map((area, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs border-white/20 text-white/60">
                            {area}
                          </Badge>
                        ))}
                        {service.areas.length > 3 && (
                          <Badge variant="outline" className="text-xs border-white/20 text-white/60">
                            +{service.areas.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Link href={buttons.primary.href} className="w-full">
                      <Button
                        className={`w-full bg-gradient-to-r ${service.color} hover:scale-105 transition-all duration-300 group/btn`}
                      >
                        <buttons.primary.icon className="h-4 w-4 mr-2 group-hover/btn:rotate-12 transition-transform duration-300" />
                        {buttons.primary.text}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Updated CTA Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-white/10 rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <div className="absolute top-8 right-8 w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
              <div className="absolute bottom-6 left-12 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
            </div>

            <h2 className="text-4xl font-bold text-white mb-4">Need Custom Legal Documents?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Our AI-powered document generator can create personalized legal documents in minutes, or connect you with expert lawyers for complex cases.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ai-document-generator">
                <Button
                  size="lg"
                  className="px-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 border-0 transform hover:scale-105 transition-all duration-300 group"
                >
                  <LayoutTemplate className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  Generate Document
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Link href="/lawyers">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
                >
                  <Users className="mr-3 h-5 w-5" />
                  Consult a Lawyer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}