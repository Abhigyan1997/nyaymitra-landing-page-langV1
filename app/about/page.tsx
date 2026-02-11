"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Scale, Target, Eye, Heart, Users, Award, Linkedin, Twitter, Mail, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image";


export default function AboutPage() {
  // const team = [
  //   {
  //     name: "Adv. Rajesh Gupta",
  //     role: "Founder & CEO",
  //     experience: "20+ years in Legal Practice",
  //     education: "LLM from Delhi University",
  //     specialization: "Constitutional Law",
  //     image: "/placeholder.svg?height=200&width=200",
  //     bio: "Former Supreme Court advocate with extensive experience in constitutional and corporate law.",
  //     social: {
  //       linkedin: "#",
  //       twitter: "#",
  //       email: "rajesh@nyaymitra.com",
  //     },
  //   },
  //   {
  //     name: "Dr. Priya Sharma",
  //     role: "Chief Technology Officer",
  //     experience: "15+ years in AI/ML",
  //     education: "PhD in Computer Science, IIT Delhi",
  //     specialization: "AI & Legal Tech",
  //     image: "/placeholder.svg?height=200&width=200",
  //     bio: "AI researcher specializing in natural language processing and legal document analysis.",
  //     social: {
  //       linkedin: "#",
  //       twitter: "#",
  //       email: "priya@nyaymitra.com",
  //     },
  //   },
  //   {
  //     name: "Adv. Suresh Kumar",
  //     role: "Head of Legal Operations",
  //     experience: "18+ years in Legal Practice",
  //     education: "LLB from National Law School",
  //     specialization: "Criminal & Family Law",
  //     image: "/placeholder.svg?height=200&width=200",
  //     bio: "Experienced litigator with expertise in criminal defense and family law matters.",
  //     social: {
  //       linkedin: "#",
  //       twitter: "#",
  //       email: "suresh@nyaymitra.com",
  //     },
  //   },
  //   {
  //     name: "Ms. Anita Patel",
  //     role: "Head of Operations",
  //     experience: "12+ years in Legal Services",
  //     education: "MBA from IIM Ahmedabad",
  //     specialization: "Operations & Strategy",
  //     image: "/placeholder.svg?height=200&width=200",
  //     bio: "Operations expert focused on scaling legal services and improving client experience.",
  //     social: {
  //       linkedin: "#",
  //       twitter: "#",
  //       email: "anita@nyaymitra.com",
  //     },
  //   },
  // ]

  const achievements = [
    {
      number: "50,000+",
      label: "Legal Queries Resolved",
      icon: Scale,
    },
    {
      number: "2,500+",
      label: "Verified Lawyers",
      icon: Users,
    },
    {
      number: "95%",
      label: "Client Satisfaction",
      icon: Heart,
    },
    {
      number: "24/7",
      label: "AI Support Available",
      icon: Award,
    },
  ]

  const values = [
    {
      title: "Accessibility",
      description: "Making legal help accessible to every Indian, regardless of their location or economic background.",
      icon: Users,
    },
    {
      title: "Transparency",
      description: "Clear, honest communication about legal processes, costs, and expected outcomes.",
      icon: Eye,
    },
    {
      title: "Quality",
      description: "Maintaining the highest standards in legal advice and lawyer verification processes.",
      icon: Award,
    },
    {
      title: "Innovation",
      description: "Leveraging cutting-edge AI technology to revolutionize legal services in India.",
      icon: Target,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Scale className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Nyay Mitra</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/lawyers">
                <Button variant="outline">Find Lawyers</Button>
              </Link>
              <Link href="/legal-gpt">
                <Button>Get AI Advice</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Nyay Mitra</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Democratizing legal access across India through AI-powered technology and verified legal expertise
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <Card className="p-8">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 text-lg leading-relaxed">
                  To bridge the gap between ordinary citizens and legal help by offering a platform that simplifies legal access using AI, real lawyers, and regional language support starting with a minimal product but driven by a big purpose.
                </p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="p-8">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 text-lg leading-relaxed">
                  To become the go-to legal companion for every Indian especially those in Tier 2 and 3 cities by making legal awareness a basic right, not a privilege. We aim to empower users with knowledge, access, and trust, one click at a time.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* Our Story */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-xl text-gray-600">How Nyay Mitra came to be</p>
          </div>

          <div className="prose prose-lg mx-auto text-gray-600">
            <p>
              Nyay Mitra is a newly launched initiative, started in June 2025, born out of a deeply personal observation that even in 2025, millions of people in India still struggle to access basic legal help. Whether it’s a simple tenant issue, a consumer complaint, or family-related matters, legal assistance often feels complicated, expensive, and inaccessible.
            </p>

            <p>
              As a developer who frequently saw people around me getting misled or harassed due to a lack of legal awareness, I realized there had to be a better way. That’s when I decided to create an MVP — a platform that could act as a bridge between ordinary citizens and genuine legal guidance.
            </p>

            <p>
              Nyay Mitra started as a solo project with a simple goal: to offer quick, reliable, and affordable legal help using both technology and a network of trusted legal experts. With features like AI-powered legal guidance, real-time lawyer booking, and an easy-to-use dashboard, the platform is designed for those who don’t have the time or resources to chase legal help the traditional way.
            </p>

            <p>
              While we're just getting started, the vision is big — to make legal literacy and access a basic right, not a luxury. Every update we push, every lawyer we onboard, and every consultation booked is a step closer to that mission.
            </p>
          </div>

        </div>
      </section>

      {/* Achievements */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600">Making a difference in legal accessibility</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{achievement.number}</div>
                  <div className="text-gray-600">{achievement.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card key={index} className="text-center p-6">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">{value.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The team behind NyayMitra</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Team Member 1 */}
            <Card className="text-center overflow-hidden h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="w-32 h-32 mx-auto mb-4 relative">
                  <Image
                    src="/images/alok.jpg"
                    alt="Alok Abhigyan"
                    fill
                    className="rounded-full object-cover ring-4 ring-blue-500/20"
                  />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-1">Alok Abhigyan</h3>
                <p className="text-blue-600 font-medium mb-2">Founder & CEO</p>
                <div className="min-h-[40px] mb-4">
                  <Badge variant="secondary" className="text-xs">Full Stack Development</Badge>
                </div>
                <p className="text-gray-600 text-sm mb-4 flex-grow">
                  Leads product, technology, and strategic direction for NyayMitra, building a structured and trustworthy legal-tech platform.
                </p>
              </CardContent>
            </Card>

            {/* Team Member 2 */}
            <Card className="text-center overflow-hidden h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-16 w-16 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Bharat Rajak</h3>
                <p className="text-blue-600 font-medium mb-2">Director of Legal Affairs</p>
                <div className="min-h-[40px] mb-4">
                  <Badge variant="secondary" className="text-xs">Civil & Criminal Law Specialist</Badge>
                </div>
                <p className="text-gray-600 text-sm mb-4 flex-grow">
                  Senior practicing advocate with 25+ years of experience in civil, criminal, and consumer law. Ensures legal integrity and compliance across the platform.
                </p>
              </CardContent>
            </Card>

            {/* Team Member 3 */}
            <Card className="text-center overflow-hidden h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-16 w-16 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Twinkle Gupta</h3>
                <p className="text-blue-600 font-medium mb-2">Co-Founder</p>
                <div className="min-h-[40px] mb-4">
                  <Badge variant="secondary" className="text-xs">Growth & Market Development</Badge>
                </div>
                <p className="text-gray-600 text-sm mb-4 flex-grow">
                  Focuses on brand positioning, organic marketing, and user acquisition strategy to strengthen NyayMitra’s trust-driven growth.
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Legal Help?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of Indians who trust Nyay Mitra for their legal needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/legal-gpt">
              <Button size="lg" variant="secondary" className="px-8">
                Ask Legal GPT
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/lawyers">
              <Button
                size="lg"
                variant="outline"
                className="px-8 text-black border-white hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                Find Lawyers
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
