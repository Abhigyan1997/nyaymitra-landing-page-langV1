"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Scale, MapPin, Phone, Mail, Clock, Send, MessageCircle, Users, CheckCircle, AlertCircle, Loader2, Globe, Headphones, BookOpen, ChevronRight, Star, Menu, X } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState as useState_ } from "react"

export default function ContactPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState_(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState_(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to send message')
      setIsSubmitted(true)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Office Address",
      details: ["NyayMitra Technologies Pvt. Ltd.", "Koramangala, 5th Block", "Bangalore, Karnataka - 560095", "India"],
      color: "blue"
    },
    {
      icon: MapPin,
      title: "Registered Address",
      details: ["NyayMitra Technologies Pvt. Ltd.", "Bhagalpur, Bihar", "India"],
      color: "green"
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: ["Emergency: +91 79705 96183"],
      color: "purple"
    },
    {
      icon: Mail,
      title: "Email Addresses",
      details: ["Support: support@nyaymitra.tech"],
      color: "orange"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday: 9:00 AM - 8:00 PM", "Saturday: 10:00 AM - 6:00 PM", "Sunday: 10:00 AM - 4:00 PM"],
      color: "red"
    },
  ]

  const colorClasses = {
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    orange: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
    red: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
  }

  const faqs = [
    {
      question: "How do I book a consultation with a lawyer?",
      answer: "You can browse verified lawyers on our platform and book a consultation by selecting a date, time, and mode of consultation."
    },
    {
      question: "Is the first consultation free?",
      answer: "Yes, every user gets one free consultation with a verified lawyer after signing up."
    },
    {
      question: "How do lawyers get verified?",
      answer: "We verify lawyers by checking their Bar Council ID and other professional details before approving their profiles."
    },
    {
      question: "Is my data safe on NyayMitra?",
      answer: "Absolutely. We follow strict data privacy standards and never share your information without consent."
    },
    {
      question: "How does AI legal support work?",
      answer: "Our AI Legal Assistant provides 24/7 guidance based on Indian laws and previously answered queries. For complex issues, we connect you to a real lawyer."
    },
    {
      question: "Can I reschedule or cancel a booking?",
      answer: "Yes, you can manage your bookings through your dashboard. Please inform the lawyer in advance for any changes."
    }
  ]

  if (!mounted) return null

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <Card className="max-w-md w-full dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="text-center py-10 px-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6">
              Thank you for contacting us. We've sent a confirmation to your email and our team will get back to you within 24 hours.
            </p>
            <div className="space-y-3">
              <Button className="w-full" onClick={() => {
                setIsSubmitted(false)
                setFormData({ name: "", email: "", phone: "", subject: "", category: "", message: "" })
              }}>
                Send Another Message
              </Button>
              <Link href="/">
                <Button variant="outline" className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600">
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group flex-shrink-0">
              <Scale className="h-7 w-7 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Nyay Mitra</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden sm:flex items-center space-x-3">
              <Link href="/lawyers">
                <Button variant="outline" size="sm" className="dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700">
                  Find Lawyers
                </Button>
              </Link>
              <Link href="/legal-gpt">
                <Button size="sm" className="dark:bg-blue-600 dark:hover:bg-blue-700">Get AI Advice</Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="dark:text-white dark:hover:bg-gray-800"
              >
                {theme === "dark" ? "🌞" : "🌙"}
              </Button>
            </div>

            {/* Mobile Nav Controls */}
            <div className="flex sm:hidden items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="dark:text-white dark:hover:bg-gray-800 h-8 w-8"
              >
                {theme === "dark" ? "🌞" : "🌙"}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="dark:text-white dark:hover:bg-gray-800 h-8 w-8"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden border-t border-gray-200 dark:border-gray-700 py-3 space-y-2">
              <Link href="/lawyers" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-700">
                  Find Lawyers
                </Button>
              </Link>
              <Link href="/legal-gpt" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full dark:bg-blue-600 dark:hover:bg-blue-700">Get AI Advice</Button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Header */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="absolute top-10 right-10 w-48 h-48 sm:w-72 sm:h-72 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6">
              <Headphones className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">24/7 Support Available</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              Contact Us
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto leading-relaxed px-2">
              Have questions about our services? Need legal assistance? We're here to help you navigate your legal journey.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2 order-1">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl sm:text-2xl dark:text-white">Send us a Message</CardTitle>
                <CardDescription className="dark:text-gray-400 text-sm">
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="dark:text-gray-300 text-sm">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        required
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="dark:text-gray-300 text-sm">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  {/* Phone + Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="dark:text-gray-300 text-sm">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+91 98765 43210"
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="category" className="dark:text-gray-300 text-sm">Query Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                          <SelectItem value="general" className="dark:text-white dark:focus:bg-gray-700">General Inquiry</SelectItem>
                          <SelectItem value="legal-advice" className="dark:text-white dark:focus:bg-gray-700">Legal Advice</SelectItem>
                          <SelectItem value="lawyer-registration" className="dark:text-white dark:focus:bg-gray-700">Lawyer Registration</SelectItem>
                          <SelectItem value="technical-support" className="dark:text-white dark:focus:bg-gray-700">Technical Support</SelectItem>
                          <SelectItem value="billing" className="dark:text-white dark:focus:bg-gray-700">Billing & Payments</SelectItem>
                          <SelectItem value="partnership" className="dark:text-white dark:focus:bg-gray-700">Partnership</SelectItem>
                          <SelectItem value="media" className="dark:text-white dark:focus:bg-gray-700">Media & Press</SelectItem>
                          <SelectItem value="other" className="dark:text-white dark:focus:bg-gray-700">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <Label htmlFor="subject" className="dark:text-gray-300 text-sm">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="Brief subject of your query"
                      required
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="dark:text-gray-300 text-sm">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Describe your query in detail..."
                      rows={5}
                      required
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400 resize-none"
                    />
                  </div>

                  <div className="space-y-3 pt-1">
                    <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                    {error && (
                      <div className="flex items-start gap-2 text-red-600 dark:text-red-400 text-sm p-3 bg-red-50 dark:bg-red-900/20 rounded-md">
                        <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-5 order-2">
            {/* Contact Details */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg sm:text-xl dark:text-white">Get in Touch</CardTitle>
                <CardDescription className="dark:text-gray-400 text-sm">
                  Multiple ways to reach us for your convenience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon
                  return (
                    <div key={index} className="flex items-start space-x-3 group">
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 ${colorClasses[info.color as keyof typeof colorClasses]} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-0.5">{info.title}</h3>
                        <div className="space-y-0.5">
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 break-words">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Quick Support */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-0">
              <CardContent className="pt-6 pb-5 px-5">
                <div className="text-center">
                  <MessageCircle className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1.5">Need Quick Help?</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Try our AI Legal Assistant for instant answers
                  </p>
                  <Link href="/legal-gpt">
                    <Button variant="outline" className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-700 text-sm">
                      Ask Legal GPT
                      <ChevronRight className="h-4 w-4 ml-1.5" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 sm:mt-14 lg:mt-16">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="text-center pb-4">
              <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mx-auto mb-3">
                <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Knowledge Base</span>
              </div>
              <CardTitle className="text-xl sm:text-2xl dark:text-white">Frequently Asked Questions</CardTitle>
              <CardDescription className="dark:text-gray-400 text-sm max-w-md mx-auto">
                Find quick answers to common questions about our platform and services
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                {faqs.map((faq, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1.5 flex items-start gap-2 text-sm sm:text-base">
                      <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                      {faq.question}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 pl-5 sm:pl-6">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trust Indicators */}
        <div className="mt-10 sm:mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[
            { icon: Users, color: "green", label: "Trusted by 1000+ Users" },
            { icon: CheckCircle, color: "blue", label: "100% Verified Lawyers" },
            { icon: Globe, color: "purple", label: "Pan India Coverage" },
            { icon: Headphones, color: "orange", label: "24/7 Support" },
          ].map(({ icon: Icon, color, label }, i) => (
            <div key={i} className="text-center p-3 sm:p-4">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-${color}-100 dark:bg-${color}-900/30 rounded-full flex items-center justify-center mx-auto mb-2`}>
                <Icon className={`h-5 w-5 sm:h-6 sm:w-6 text-${color}-600 dark:text-${color}-400`} />
              </div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}