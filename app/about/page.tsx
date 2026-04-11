"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Scale, Target, Eye, Heart, Users, Award, Linkedin, Twitter, Mail, ArrowRight, Globe, Shield, Zap, BookOpen, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function AboutPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const achievements = [
    {
      number: "100+",
      label: "Legal Queries Resolved",
      icon: Scale,
      description: "Successfully handled cases across various domains"
    },
    {
      number: "100+",
      label: "Verified Lawyers",
      icon: Users,
      description: "Rigorous verification process for quality assurance"
    },
    {
      number: "95%",
      label: "Client Satisfaction",
      icon: Heart,
      description: "Based on post-consultation feedback"
    },
    {
      number: "24/7",
      label: "AI Support Available",
      icon: Award,
      description: "Round-the-clock legal assistance"
    },
  ]

  const values = [
    {
      title: "Accessibility",
      description: "Making legal help accessible to every Indian, regardless of their location or economic background.",
      icon: Users,
      color: "blue"
    },
    {
      title: "Transparency",
      description: "Clear, honest communication about legal processes, costs, and expected outcomes.",
      icon: Eye,
      color: "green"
    },
    {
      title: "Quality",
      description: "Maintaining the highest standards in legal advice and lawyer verification processes.",
      icon: Award,
      color: "purple"
    },
    {
      title: "Innovation",
      description: "Leveraging cutting-edge AI technology to revolutionize legal services in India.",
      icon: Target,
      color: "orange"
    },
  ]

  const colorClasses = {
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    orange: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2 group">
              <Scale className="h-8 w-8 text-blue-600 dark:text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">NyayMitra</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/lawyers">
                <Button
                  variant="outline"
                  className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Find Lawyers
                </Button>
              </Link>
              <Link href="/legal-gpt">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700">
                  Get AI Advice
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {theme === "dark" ? "🌞" : "🌙"}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <Badge className="mb-4 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2">
              Empowering Legal Access Since 2025
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 py-2">
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                About Nyay Mitra
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Democratizing legal access across India through AI-powered technology and verified legal expertise
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800 dark:bg-gray-800">
              <CardHeader className="text-center pb-6">
                <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-2xl dark:text-white">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  To bridge the gap between ordinary citizens and legal help by offering a platform that simplifies legal access using AI, real lawyers, and regional language support starting with a minimal product but driven by a big purpose.
                </p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-purple-200 dark:hover:border-purple-800 dark:bg-gray-800">
              <CardHeader className="text-center pb-6">
                <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Eye className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-2xl dark:text-white">Our Vision</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  To become the go-to legal companion for every Indian especially those in Tier 2 and 3 cities by making legal awareness a basic right, not a privilege. We aim to empower users with knowledge, access, and trust, one click at a time.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">Our Journey</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Story</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">How Nyay Mitra came to be</p>
          </div>

          <div className="prose prose-lg dark:prose-invert mx-auto text-gray-600 dark:text-gray-300 space-y-6">
            <p className="leading-relaxed">
              NyayMitra is a legal-tech initiative launched in June 2025, built on a simple yet critical insight even today, millions of people in India struggle to access basic legal support. From tenant disputes and consumer complaints to family related matters, legal assistance is often perceived as complex, expensive, and difficult to navigate.
            </p>

            <p className="leading-relaxed">
              Observing this gap firsthand, especially how individuals are often misled or disadvantaged due to a lack of legal awareness, led to the creation of NyayMitra. The goal was to build a platform that could bridge the gap between everyday users and reliable legal guidance.
            </p>

            <p className="leading-relaxed">
              NyayMitra started as a focused MVP with a clear mission: to make legal help more accessible, understandable, and efficient. By combining technology with a network of verified legal professionals, the platform enables users to gain initial clarity through AI-powered guidance and seamlessly connect with lawyers when needed.
            </p>

            <p className="leading-relaxed">
              While still in its early stages, NyayMitra is steadily evolving into a trust first legal ecosystem. Each improvement, user interaction, and lawyer onboarding contributes to a larger vision making legal awareness and access a fundamental service, not a privilege.
            </p>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">Our Impact</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Making a Difference</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Transforming legal accessibility across India</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon
              return (
                <Card key={index} className="text-center p-6 group hover:shadow-xl transition-all duration-300 dark:bg-gray-800">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{achievement.number}</div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium mb-2">{achievement.label}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{achievement.description}</div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">Core Principles</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 dark:bg-gray-800 overflow-hidden">
                  <div className={`h-1 w-full bg-gradient-to-r from-${value.color}-500 to-${value.color}-600`}></div>
                  <CardHeader className="text-center">
                    <div className={`w-14 h-14 ${colorClasses[value.color as keyof typeof colorClasses]} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-xl dark:text-white">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">Leadership</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">The passionate minds behind NyayMitra</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden dark:bg-gray-800">
              <div className="relative h-64 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <div className="w-32 h-32 relative">
                  <Image
                    src="/images/alok.jpg"
                    alt="Alok Abhigyan"
                    fill
                    className="rounded-full object-cover ring-4 ring-white/50"
                  />
                </div>
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Alok Abhigyan</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">Founder & CEO</p>
                <div className="flex justify-center gap-2 mb-4">
                  <Badge variant="secondary" className="dark:bg-gray-700 dark:text-gray-300">Full Stack Development</Badge>
                  <Badge variant="secondary" className="dark:bg-gray-700 dark:text-gray-300">Product Strategy</Badge>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Leads product, technology, and strategic direction for NyayMitra, building a structured and trustworthy legal-tech platform.
                </p>
              </CardContent>
            </Card>

            {/* Team Member 2 */}
            <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden dark:bg-gray-800">
              <div className="relative h-64 bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                  <Users className="h-16 w-16 text-white" />
                </div>
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Bharat Rajak</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">Director of Legal Affairs</p>
                <div className="flex justify-center gap-2 mb-4">
                  <Badge variant="secondary" className="dark:bg-gray-700 dark:text-gray-300">Civil Law</Badge>
                  <Badge variant="secondary" className="dark:bg-gray-700 dark:text-gray-300">Criminal Law</Badge>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Senior practicing advocate with 25+ years of experience in civil, criminal, and consumer law. Ensures legal integrity and compliance across the platform.
                </p>
              </CardContent>
            </Card>

            {/* Team Member 3 */}
            <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden dark:bg-gray-800">
              <div className="relative h-64 bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                  <Users className="h-16 w-16 text-white" />
                </div>
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Twinkle Chatterjee</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">Co-Founder</p>
                <div className="flex justify-center gap-2 mb-4">
                  <Badge variant="secondary" className="dark:bg-gray-700 dark:text-gray-300">Growth Strategy</Badge>
                  <Badge variant="secondary" className="dark:bg-gray-700 dark:text-gray-300">Marketing</Badge>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Focuses on brand positioning, organic marketing, and user acquisition strategy to strengthen NyayMitra's trust-driven growth.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-blue-100">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-blue-100">Partner Law Firms</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">1000+</div>
              <div className="text-blue-100">Legal Documents Processed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-blue-100">Response Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Legal Help?</h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of Indians who trust Nyay Mitra for their legal needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/legal-gpt">
              <Button size="lg" variant="secondary" className="px-8 group">
                Ask Legal GPT
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/lawyers">
              <Button
                size="lg"
                variant="outline"
                className="px-8 text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200"
              >
                Find Lawyers
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}