"use client"

import { motion } from "framer-motion"
import { PenTool, Clock, Mail, Package, Check, ArrowRight, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function NotaryServicePage() {
    const steps = [
        {
            title: "Upload Document",
            description: "Upload the document you need notarized",
            icon: <PenTool className="h-6 w-6 text-blue-400" />
        },
        {
            title: "Verify Details",
            description: "Our team verifies your identity and document",
            icon: <Check className="h-6 w-6 text-green-400" />
        },
        {
            title: "Notarization",
            description: "Licensed lawyer notarizes your document",
            icon: <PenTool className="h-6 w-6 text-purple-400" />
        },
        {
            title: "Delivery",
            description: "Receive notarized copy via email or courier",
            icon: <Package className="h-6 w-6 text-yellow-400" />
        }
    ]

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 to-orange-900/20" />
                <div className="absolute inset-0 cyber-grid opacity-30" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 backdrop-blur-sm mb-6">
                        <PenTool className="h-4 w-4 text-yellow-400 mr-2" />
                        <span className="text-sm text-yellow-300">Remote Notarization</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent pb-2">
                        Legal Notary Service
                    </h1>
                    <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                        Get your documents notarized remotely by licensed lawyers with delivery in 1-4 days.
                    </p>
                </motion.div>

                {/* Process Steps */}
                <div className="grid md:grid-cols-4 gap-6 mb-20">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            <Card className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-yellow-500/30 transition-all duration-300 h-full">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 flex items-center justify-center mb-4">
                                        {step.icon}
                                    </div>
                                    <CardTitle className="text-white text-lg">{step.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-white/70">
                                        {step.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Pricing Options */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="grid md:grid-cols-2 gap-8 mb-16"
                >
                    <Card className="bg-white/5 backdrop-blur-xl border border-blue-500/30 relative overflow-hidden">
                        <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl" />
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-white">Digital Notarization</CardTitle>
                                    <div className="text-3xl font-bold text-blue-400 mt-2">₹399</div>
                                </div>
                                <Badge className="bg-blue-500/20 text-blue-300">Instant Delivery</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3 mb-6">
                                <div className="flex items-start">
                                    <Check className="h-4 w-4 text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-sm text-white/80">Electronically notarized PDF</span>
                                </div>
                                <div className="flex items-start">
                                    <Check className="h-4 w-4 text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-sm text-white/80">Delivered within 24 hours</span>
                                </div>
                                <div className="flex items-start">
                                    <Check className="h-4 w-4 text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-sm text-white/80">Legal validity across India</span>
                                </div>
                            </div>
                            <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500">
                                Choose Digital
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/5 backdrop-blur-xl border border-orange-500/30 relative overflow-hidden">
                        <div className="absolute -right-10 -top-10 w-32 h-32 bg-orange-500/10 rounded-full blur-xl" />
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-white">Physical Notarization</CardTitle>
                                    <div className="text-3xl font-bold text-orange-400 mt-2">₹799</div>
                                </div>
                                <Badge className="bg-orange-500/20 text-orange-300">Courier Included</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3 mb-6">
                                <div className="flex items-start">
                                    <Check className="h-4 w-4 text-orange-400 mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-sm text-white/80">Physically notarized copy</span>
                                </div>
                                <div className="flex items-start">
                                    <Check className="h-4 w-4 text-orange-400 mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-sm text-white/80">Delivered in 2-4 days</span>
                                </div>
                                <div className="flex items-start">
                                    <Check className="h-4 w-4 text-orange-400 mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-sm text-white/80">Tracking number provided</span>
                                </div>
                            </div>
                            <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500">
                                Choose Physical
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* FAQ CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center"
                >
                    <div className="inline-flex items-center mb-6 text-sm text-white/60">
                        <Info className="h-4 w-4 mr-2" />
                        Have questions about the notarization process?
                    </div>
                    <Link href="/notary/how-it-works">
                        <Button variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20">
                            Learn How It Works
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}