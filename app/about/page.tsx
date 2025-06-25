"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Scale, Target, Eye, Heart, Users, Award, Linkedin, Twitter, Mail, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const team = [
    {
      name: "Adv. Rajesh Gupta",
      role: "Founder & CEO",
      experience: "20+ years in Legal Practice",
      education: "LLM from Delhi University",
      specialization: "Constitutional Law",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Former Supreme Court advocate with extensive experience in constitutional and corporate law.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "rajesh@nyaymitra.com",
      },
    },
    {
      name: "Dr. Priya Sharma",
      role: "Chief Technology Officer",
      experience: "15+ years in AI/ML",
      education: "PhD in Computer Science, IIT Delhi",
      specialization: "AI & Legal Tech",
      image: "/placeholder.svg?height=200&width=200",
      bio: "AI researcher specializing in natural language processing and legal document analysis.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "priya@nyaymitra.com",
      },
    },
    {
      name: "Adv. Suresh Kumar",
      role: "Head of Legal Operations",
      experience: "18+ years in Legal Practice",
      education: "LLB from National Law School",
      specialization: "Criminal & Family Law",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Experienced litigator with expertise in criminal defense and family law matters.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "suresh@nyaymitra.com",
      },
    },
    {
      name: "Ms. Anita Patel",
      role: "Head of Operations",
      experience: "12+ years in Legal Services",
      education: "MBA from IIM Ahmedabad",
      specialization: "Operations & Strategy",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Operations expert focused on scaling legal services and improving client experience.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "anita@nyaymitra.com",
      },
    },
  ]

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
            <Card className="p-8">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 text-lg leading-relaxed">
                  To make quality legal advice accessible to every Indian citizen by combining artificial intelligence
                  with verified legal expertise, breaking down barriers of cost, location, and complexity.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 text-lg leading-relaxed">
                  To become India's most trusted legal platform, empowering citizens with knowledge of their rights and
                  connecting them with the right legal professionals for justice and peace of mind.
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
              Nyay Mitra was born from a simple observation: millions of Indians struggle to access quality legal advice
              when they need it most. Whether it's understanding tenant rights, filing a consumer complaint, or
              navigating family disputes, legal help often feels out of reach due to high costs, complex procedures, and
              geographical barriers.
            </p>

            <p>
              Founded in 2023 by a team of experienced lawyers and technology experts, Nyay Mitra set out to bridge this
              gap. We recognized that artificial intelligence could democratize legal knowledge, making basic legal
              guidance available instantly and affordably to anyone with a smartphone.
            </p>

            <p>
              But we also understood that AI alone isn't enough. Complex legal matters require human expertise, empathy,
              and experience. That's why we built a platform that seamlessly connects AI-powered guidance with verified
              legal professionals across India.
            </p>

            <p>
              Today, Nyay Mitra serves thousands of users daily, from students seeking advice on consumer rights to
              families navigating property disputes. We're proud to be making legal help more accessible, transparent,
              and affordable for all Indians.
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
      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The experts behind Nyay Mitra</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Mune Alok Abhigyan */}
            <Card className="text-center overflow-hidden">
              <CardContent className="p-6">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-16 w-16 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1"> Alok Abhigyan</h3>
                <p className="text-blue-600 font-medium mb-2">Founder & Full Stack Developer</p>
                <div className="space-y-1 text-sm text-gray-600 mb-4">
                  <p>2+ years in Web Development</p>
                  <p>Jadavpur University</p>
                  <Badge variant="secondary" className="text-xs">
                    MERN Stack Specialist
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Full stack developer with expertise in building scalable web applications and AI integrations.
                </p>
                <div className="flex justify-center space-x-3">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="https://www.linkedin.com/in/alok-abhigyan" target="_blank">
                      <Linkedin className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Placeholder for Team Member 2 */}
            <Card className="text-center overflow-hidden">
              <CardContent className="p-6">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-16 w-16 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Bharat Rajak</h3>
                <p className="text-blue-600 font-medium mb-2">Head of Legal Operations</p>
                <div className="space-y-1 text-sm text-gray-600 mb-4">
                  <p>25+ years in Legal Practice</p>
                  <p>M.Com(LLB) from T.N.B University</p>
                  <Badge variant="secondary" className="text-xs">
                    Civil & Criminal Law Specialist
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Experienced legal professional with expertise in civil and criminal law.
                </p>
                <div className="flex justify-center space-x-3">
                  <Button variant="outline" size="sm">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Placeholder for Team Member 3 */}
            <Card className="text-center overflow-hidden">
              <CardContent className="p-6">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-16 w-16 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">AI Researcher</h3>
                <p className="text-blue-600 font-medium mb-2">AI/ML Engineer</p>
                <div className="space-y-1 text-sm text-gray-600 mb-4">
                  <p>4+ years in Machine Learning</p>
                  <p>M.Tech in Computer Science</p>
                  <Badge variant="secondary" className="text-xs">
                    NLP Specialist
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Specializes in natural language processing and legal document analysis.
                </p>
                <div className="flex justify-center space-x-3">
                  <Button variant="outline" size="sm">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Placeholder for Team Member 4 */}
            <Card className="text-center overflow-hidden">
              <CardContent className="p-6">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-16 w-16 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">UX Designer</h3>
                <p className="text-blue-600 font-medium mb-2">Product Designer</p>
                <div className="space-y-1 text-sm text-gray-600 mb-4">
                  <p>6+ years in UI/UX Design</p>
                  <p>B.Des from NID</p>
                  <Badge variant="secondary" className="text-xs">
                    User Experience
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Focused on creating intuitive and accessible interfaces for legal technology.
                </p>
                <div className="flex justify-center space-x-3">
                  <Button variant="outline" size="sm">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
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
                className="px-8 text-white border-white hover:bg-white hover:text-blue-600"
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
