"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Scale,
  Heart,
  Building,
  ShoppingCart,
  Shield,
  Briefcase,
  Users,
  FileText,
  Gavel,
  ArrowRight,
  Sparkles,
  Zap,
  Brain,
  Star,
} from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const [hoveredService, setHoveredService] = useState<string | null>(null)

  const services = [
    {
      id: "criminal-law",
      title: "Criminal Defense AI",
      description: "Advanced AI-powered criminal defense strategies with quantum case analysis",
      icon: Gavel,
      color: "from-red-500 to-pink-500",
      popular: true,
      areas: ["Murder Cases", "Cyber Crimes", "White Collar", "Drug Offenses", "Fraud Defense"],
      aiFeatures: ["Case Outcome Prediction", "Evidence Analysis", "Precedent Matching"],
    },
    {
      id: "family-law",
      title: "Family Law Neural Network",
      description: "Emotional AI for sensitive family matters with holographic mediation",
      icon: Heart,
      color: "from-pink-500 to-rose-500",
      popular: true,
      areas: ["Smart Divorce", "AI Custody", "Digital Alimony", "Virtual Mediation", "Blockchain Adoption"],
      aiFeatures: ["Emotion Detection", "Fair Settlement AI", "Child Welfare Analysis"],
    },
    {
      id: "property-law",
      title: "Quantum Property Rights",
      description: "Blockchain-verified property transactions with AR documentation",
      icon: Building,
      color: "from-blue-500 to-cyan-500",
      popular: true,
      areas: ["Smart Contracts", "AR Surveys", "Blockchain Registry", "Virtual Inspections", "AI Valuations"],
      aiFeatures: ["Price Prediction", "Risk Assessment", "Document Verification"],
    },
    {
      id: "consumer-law",
      title: "Consumer Protection Matrix",
      description: "Real-time consumer rights enforcement with AI complaint processing",
      icon: ShoppingCart,
      color: "from-green-500 to-emerald-500",
      popular: false,
      areas: ["Auto-Complaints", "AI Refunds", "Digital Rights", "E-commerce Protection", "Smart Warranties"],
      aiFeatures: ["Instant Case Filing", "Compensation Calculator", "Merchant Analysis"],
    },
    {
      id: "cyber-law",
      title: "Cyber Security Legal AI",
      description: "Next-gen cybercrime investigation with quantum encryption analysis",
      icon: Shield,
      color: "from-purple-500 to-violet-500",
      popular: false,
      areas: ["Data Breach Response", "AI Privacy", "Quantum Hacking", "Digital Forensics", "Crypto Crimes"],
      aiFeatures: ["Threat Analysis", "Digital Evidence", "Privacy Audit"],
    },
    {
      id: "corporate-law",
      title: "Corporate Intelligence Suite",
      description: "AI-driven corporate compliance with predictive regulatory analysis",
      icon: Briefcase,
      color: "from-indigo-500 to-blue-500",
      popular: false,
      areas: ["Smart Compliance", "AI Contracts", "Merger Analysis", "IPO Automation", "Regulatory Prediction"],
      aiFeatures: ["Compliance Monitoring", "Risk Prediction", "Contract Generation"],
    },
    {
      id: "labor-law",
      title: "Workforce Rights AI",
      description: "Automated labor dispute resolution with fair wage algorithms",
      icon: Users,
      color: "from-orange-500 to-amber-500",
      popular: false,
      areas: ["AI Arbitration", "Wage Analytics", "Workplace Monitoring", "Union Negotiations", "Gig Economy"],
      aiFeatures: ["Fair Wage Calculator", "Dispute Prediction", "Performance Analysis"],
    },
    {
      id: "documentation",
      title: "Legal Document Genesis",
      description: "AI-powered legal document creation with voice-to-contract technology",
      icon: FileText,
      color: "from-teal-500 to-cyan-500",
      popular: false,
      areas: ["Voice Contracts", "Auto-Wills", "Smart Agreements", "Digital Notary", "Blockchain Signatures"],
      aiFeatures: ["Document Generation", "Legal Validation", "Smart Templates"],
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
        <div className="absolute inset-0 cyber-grid opacity-30" />

        {/* Floating Tech Elements */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/40 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
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
                  Find AI Lawyers
                </Button>
              </Link>
              <Link href="/legal-gpt">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 border-0">
                  Neural Assistant
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
              <span className="text-sm text-blue-300">Next-Generation Legal Services</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI-Powered Legal Services
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Experience the future of legal assistance with our revolutionary AI-driven services, quantum-verified
              lawyers, and holographic consultations.
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

              return (
                <Card
                  key={service.id}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 group transform hover:scale-105 hover:-translate-y-2 relative overflow-hidden"
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {service.popular && (
                    <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-pink-500 border-0 z-10">
                      <Star className="h-3 w-3 mr-1" />
                      Popular
                    </Badge>
                  )}

                  {/* Animated Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  <CardHeader className="relative">
                    <div className="flex items-center space-x-4 mb-4">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 relative`}
                      >
                        <IconComponent className="h-8 w-8 text-white" />
                        {isHovered && <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse" />}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl text-white group-hover:text-blue-300 transition-colors duration-300">
                          {service.title}
                        </CardTitle>
                      </div>
                    </div>
                    <CardDescription className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                      {service.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative">
                    {/* AI Features */}
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

                    {/* Service Areas */}
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

                    <div className="flex space-x-2">
                      <Link href={`/lawyers?service=${service.id}`} className="flex-1">
                        <Button
                          variant="outline"
                          className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10 group/btn"
                        >
                          <Users className="h-4 w-4 mr-2 group-hover/btn:rotate-12 transition-transform duration-300" />
                          Find Experts
                        </Button>
                      </Link>
                      <Link href={`/legal-gpt?topic=${service.id}`}>
                        <Button
                          className={`bg-gradient-to-r ${service.color} hover:scale-105 transition-all duration-300 group/btn`}
                        >
                          <Zap className="h-4 w-4 mr-2 group-hover/btn:rotate-12 transition-transform duration-300" />
                          AI Chat
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-white/10 rounded-3xl p-12 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <div
                className="absolute top-8 right-8 w-1 h-1 bg-purple-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />
              <div
                className="absolute bottom-6 left-12 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>

            <h2 className="text-4xl font-bold text-white mb-4">Don't See Your Legal Challenge?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Our quantum AI legal assistant can analyze any legal scenario with 99.2% accuracy, or connect you with
              specialized neural-enhanced lawyers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/legal-gpt">
                <Button
                  size="lg"
                  className="px-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 border-0 transform hover:scale-105 transition-all duration-300 group"
                >
                  <Brain className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  Ask Neural AI
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
                >
                  Contact Specialists
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
