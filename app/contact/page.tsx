"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Scale, MapPin, Phone, Mail, Clock, Send, MessageCircle, Users, CheckCircle, AlertCircle, Loader2, Globe, Headphones, BookOpen, ChevronRight, Star } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState as useState_ } from "react"

export default function ContactPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState_(false)
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message')
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting form:', error)
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
      details: [
        "NyayMitra Technologies Pvt. Ltd.",
        "Koramangala, 5th Block",
        "Bangalore, Karnataka - 560095",
        "India",
      ],
      color: "blue"
    },
    {
      icon: MapPin,
      title: "Registered Address",
      details: [
        "NyayMitra Technologies Pvt. Ltd.",
        "Bhagalpur, Bihar",
        "India",
      ],
      color: "green"
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: [
        "Emergency: +91 79705 96183",
      ],
      color: "purple"
    },
    {
      icon: Mail,
      title: "Email Addresses",
      details: [
        "Support: support@nyaymitra.tech"
      ],
      color: "orange"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9:00 AM - 8:00 PM",
        "Saturday: 10:00 AM - 6:00 PM",
        "Sunday: 10:00 AM - 4:00 PM",
      ],
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4 dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="text-center py-12">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Thank you for contacting us. We've sent a confirmation to your email and our team will get back to you within 24 hours.
            </p>
            <div className="space-y-3">
              <Button className="w-full" onClick={() => {
                setIsSubmitted(false)
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  subject: "",
                  category: "",
                  message: "",
                })
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
            <Link href="/" className="flex items-center space-x-2 group">
              <Scale className="h-8 w-8 text-blue-600 dark:text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">Nyay Mitra</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/lawyers">
                <Button variant="outline" className="dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700">
                  Find Lawyers
                </Button>
              </Link>
              <Link href="/legal-gpt">
                <Button className="dark:bg-blue-600 dark:hover:bg-blue-700">Get AI Advice</Button>
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
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Headphones className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-gray-600 dark:text-gray-300">24/7 Support Available</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Have questions about our services? Need legal assistance? We're here to help you navigate your legal journey.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl dark:text-white">Send us a Message</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="dark:text-gray-300">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        required
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="dark:text-gray-300">Email Address *</Label>
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

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="dark:text-gray-300">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+91 98765 43210"
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category" className="dark:text-gray-300">Query Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
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

                  <div>
                    <Label htmlFor="subject" className="dark:text-gray-300">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="Brief subject of your query"
                      required
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="dark:text-gray-300">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Describe your query in detail..."
                      rows={6}
                      required
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-3">
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
                      <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm p-3 bg-red-50 dark:bg-red-900/20 rounded-md">
                        <AlertCircle className="h-4 w-4" />
                        <span>{error}</span>
                      </div>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Get in Touch</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Multiple ways to reach us for your convenience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon
                  return (
                    <div key={index} className="flex items-start space-x-3 group">
                      <div className={`w-10 h-10 ${colorClasses[info.color as keyof typeof colorClasses]} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{info.title}</h3>
                        <div className="space-y-1">
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-sm text-gray-600 dark:text-gray-400">
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

            {/* Quick Support Card */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-0">
              <CardContent className="pt-6">
                <div className="text-center">
                  <MessageCircle className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Need Quick Help?</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Try our AI Legal Assistant for instant answers
                  </p>
                  <Link href="/legal-gpt">
                    <Button variant="outline" className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-700">
                      Ask Legal GPT
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="text-center">
              <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 rounded-full px-4 py-2 mx-auto mb-4">
                <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Knowledge Base</span>
              </div>
              <CardTitle className="text-2xl dark:text-white">Frequently Asked Questions</CardTitle>
              <CardDescription className="dark:text-gray-400">
                Find quick answers to common questions about our platform and services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="group">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-start gap-2">
                      <Star className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                      {faq.question}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 pl-6">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Trusted by 1000+ Users</p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">100% Verified Lawyers</p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
              <Globe className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Pan India Coverage</p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
              <Headphones className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">24/7 Support</p>
          </div>
        </div>
      </div>
    </div>
  )
}