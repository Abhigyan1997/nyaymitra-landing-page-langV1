"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  PenTool, GraduationCap, FileSignature, Package, Clock, ShoppingBag, FileCode,
  Eye, Info, List, FileSearch, Play, Award, Users, ArrowRight, Brain, Mail,
  Scale, Heart, Building, ShoppingCart, Shield, Briefcase, FileText, Phone,
  Sparkles, Star, Download, FileCheck, BookOpen, LayoutTemplate, Menu, X, Calculator
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { PriorityBookingDialog } from "@/components/PriorityBookingDialog"
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false) // Added mobile menu state

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
      id: "document-review",
      title: "Lawyer Document Review",
      description: "Get your legal documents reviewed by experienced lawyers within 24 hours.",
      icon: FileCheck,
      color: "from-indigo-500 to-purple-500",
      popular: false,
      areas: ["Contracts", "Agreements", "Legal Notices", "Affidavits"],
      aiFeatures: ["Expert Review", "Detailed Feedback", "Suggested Edits"],
      pricing: "₹499/document"
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
      pricing: "₹99 extra (optional)",
      button: <PriorityBookingDialog /> // Replace the button with this component
    },

    {
      id: "legal-notice",
      title: "Legal Notice Generator",
      description: "Generate demand notices for rent, dues, cheating, and other legal issues.",
      icon: FileSignature,
      color: "from-pink-500 to-red-600",
      popular: false,
      areas: ["Payment Default", "Tenant Disputes", "Contract Breach", "Employment Issues"],
      aiFeatures: ["Form-Based Input", "Auto-Section Suggestion", "PDF Output"],
      pricing: "₹149/document"
    },
    {
      id: "stamp-duty",
      title: "Stamp Duty Calculator",
      description: "Find out the exact stamp paper value required for your document and state.",
      icon: Calculator,
      color: "from-gray-600 to-gray-800",
      popular: false,
      areas: ["Affidavit", "Agreements", "Power of Attorney"],
      aiFeatures: ["Auto-State Detection", "Value Suggestion", "Legal Tips"],
      pricing: "Free Tool"
    }
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
      case "document-review":
        return {
          primary: { text: "Get Review", icon: FileCheck, href: "/services/document-review" }
        };
      case "priority-booking":
        return {
          primary: { text: "Book Now", icon: Clock, href: "/services/booking" }
        };
      case "stamp-duty":
        return {
          primary: {
            text: "Calculate Duty",
            icon: Calculator,
            href: "/services/stamp-calculator",
          },
        };
      case "legal-notice":
        return {
          primary: {
            text: "Create Notice",
            icon: FileText,
            href: "/services/legal-notice-genrator",
          },
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
            {/* Logo and Back Button - Flex column on mobile */}
            <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4 lg:space-x-6">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <Scale className="h-8 w-8 md:h-10 md:w-10 text-blue-400 group-hover:text-blue-300 transition-all duration-300 group-hover:rotate-12" />
                  <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                </div>
                <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Nyay Mitra
                </span>
              </Link>
            </div>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
              <Link href="/lawyers">
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm text-sm lg:text-base"
                >
                  Find Lawyers
                </Button>
              </Link>
              <Link href="/legal-gpt">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 border-0 text-sm lg:text-base">
                  AI Assistant
                </Button>
              </Link>
            </div>

            {/* Mobile menu button - Shows on small screens */}
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation - Shows when menu is open */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden pb-4 space-y-2"
            >
              <Link href="/services">
                <Button variant="ghost" className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10">
                  <ArrowRight className="h-4 w-4 mr-2 transform rotate-180" />
                  Back to Services
                </Button>
              </Link>
              <Link href="/lawyers">
                <Button variant="outline" className="w-full justify-start bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm">
                  Find Lawyers
                </Button>
              </Link>
              <Link href="/legal-gpt">
                <Button className="w-full justify-start bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 border-0">
                  AI Assistant
                </Button>
              </Link>
            </motion.div>
          )}
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
              {/* <Link href="/ai-document-generator">
                <Button
                  size="lg"
                  className="px-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 border-0 transform hover:scale-105 transition-all duration-300 group"
                >
                  <LayoutTemplate className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  Generate Document
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link> */}
              <Link href="/lawyers">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-none backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
                >
                  <Users className="mr-3 h-5 w-5" />
                  Consult a Lawyer
                </Button>
              </Link>

            </div>
          </div>
        </div>
      </section>
      <footer className="relative z-20 bg-black/50 backdrop-blur-lg border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <Link href="/" className="flex items-center space-x-3 group">
                  <div className="relative">
                    <Scale className="h-8 w-8 md:h-10 md:w-10 text-blue-400 group-hover:text-blue-300 transition-all duration-300 group-hover:rotate-12" />
                    <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                  </div>
                  <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Nyay Mitra
                  </span>
                </Link>
              </div>
              <p className="text-white/70 text-sm">
                Empowering citizens with accessible legal solutions through technology.
              </p>
            </div>

            <div>
              <h3 className="text-white font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-white/70 hover:text-white text-sm">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-white/70 hover:text-white text-sm">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-white/70 hover:text-white text-sm">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-white/70 hover:text-white text-sm">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-medium mb-4">Contact Us</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-lime-400" />
                  nyaymitra.ai@gmail.com
                </li>
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-lime-400" />
                  +91 79705 96183
                </li>
              </ul>
              <div className="mt-4 flex space-x-4">
                <Link href="#" className="text-white/70 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link href="#" className="text-white/70 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="#" className="text-white/70 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/50">
            <p>© {new Date().getFullYear()} NyayMitra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}