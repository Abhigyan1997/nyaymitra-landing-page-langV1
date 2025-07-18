"use client"

import { motion } from "framer-motion"
import { NotaryBookingDialog } from "@/components/notary-booking-dialog"
import { PenTool, Clock, Mail, Package, Check, ArrowRight, Info, Menu, X, Scale, BookText, Home, Phone, ClipboardList } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useState, useEffect } from "react" // Add useEffect
import { useRouter } from "next/navigation" // Add useRouter

export default function NotaryServicePage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [authStatus, setAuthStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading") // Add auth state
    const router = useRouter() // Initialize router

    // Add authentication check effect
    useEffect(() => {
        const checkAuth = () => {
            try {
                const token = localStorage.getItem("token")
                if (!token) {
                    setAuthStatus("unauthenticated")
                    // Store current path before redirecting
                    router.push(`/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`)
                } else {
                    setAuthStatus("authenticated")
                }
            } catch (error) {
                console.error("Authentication check failed:", error)
                setAuthStatus("unauthenticated")
                router.push(`/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`)
            }
        }
        checkAuth()
    }, [router])

    // Add loading states
    if (authStatus === "loading") {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        )
    }

    if (authStatus === "unauthenticated") {
        return null // or your redirect message
    }

    const steps = [
        {
            title: "Submit Request",
            description: "Provide details about the document you need notarized",
            icon: <ClipboardList className="h-6 w-6 text-blue-400" />
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
            {/* Responsive Header */}
            <header className="relative z-50 w-full border-b border-white/10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo on the left */}
                        <div className="flex-shrink-0">
                            <Link href="/" className="flex items-center space-x-3 group">
                                <div className="relative">
                                    <Scale className="h-10 w-10 text-blue-400 group-hover:text-blue-300 transition-all duration-300 group-hover:rotate-12" />
                                    <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                                </div>
                                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    Nyay Mitra
                                </span>
                            </Link>
                        </div>

                        {/* Centered navigation links */}
                        <nav className="hidden md:flex items-center justify-center flex-1 px-8">
                            <div className="flex space-x-8">
                                <Link href="/" className="text-white/80 hover:text-white transition-colors flex items-center">
                                    <Home className="h-4 w-4 mr-1" /> Home
                                </Link>
                                <Link href="/services" className="text-white/80 hover:text-white transition-colors flex items-center">
                                    <BookText className="h-4 w-4 mr-1" /> Services
                                </Link>
                                <Link href="/contact" className="text-white/80 hover:text-white transition-colors flex items-center">
                                    <Mail className="h-4 w-4 mr-1" /> Contact
                                </Link>
                            </div>
                        </nav>

                        {/* Right side links */}
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/services"
                                className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
                            >
                                Back to Services
                            </Link>
                            <Link
                                href="/services"
                                className="hidden md:inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 transition-colors"
                            >
                                Get Started
                            </Link>

                            {/* Mobile menu button */}
                            <button
                                className="md:hidden text-white focus:outline-none"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden bg-gray-900/95 backdrop-blur-sm px-4 py-6 border-t border-white/10">
                            <div className="flex flex-col space-y-4">
                                <Link href="/" className="text-white/80 hover:text-white transition-colors">
                                    <Home className="h-4 w-4 mr-2 inline" /> Home
                                </Link>
                                <Link href="/services" className="text-white/80 hover:text-white transition-colors">
                                    <BookText className="h-4 w-4 mr-2 inline" /> Services
                                </Link>
                                <Link href="/contact" className="text-white/80 hover:text-white transition-colors">
                                    <Mail className="h-4 w-4 mr-2 inline" /> Contact
                                </Link>
                                <Link href="/lawyers" className="text-white/80 hover:text-white transition-colors">
                                    Find Lawyer
                                </Link>
                                <Link href="/ai-legal-assistant" className="text-white/80 hover:text-white transition-colors">
                                    Talk to AI
                                </Link>
                                <Link
                                    href="/services"
                                    className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
                                >
                                    Back to Services
                                </Link>
                                <Link
                                    href="/services"
                                    className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 transition-colors"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 to-orange-900/20" />
                <div className="absolute inset-0 cyber-grid opacity-30" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 backdrop-blur-sm mb-4 md:mb-6">
                        <PenTool className="h-4 w-4 text-yellow-400 mr-2" />
                        <span className="text-sm text-yellow-300">Remote Notarization</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent pb-2">
                        Legal Notary Service
                    </h1>
                    <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                        Get your documents notarized remotely by licensed lawyers with delivery in 1-4 days.
                    </p>
                </motion.div>

                {/* Process Steps */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-20">
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
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 flex items-center justify-center mb-3 md:mb-4">
                                        {step.icon}
                                    </div>
                                    <CardTitle className="text-white text-base md:text-lg">{step.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-white/70 text-sm md:text-base">
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
                    className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16"
                >
                    <Card className="bg-white/5 backdrop-blur-xl border border-blue-500/30 relative overflow-hidden">
                        <div className="absolute -right-8 -top-8 w-24 h-24 md:-right-10 md:-top-10 md:w-32 md:h-32 bg-blue-500/10 rounded-full blur-xl" />
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-white">Digital Notarization</CardTitle>
                                    <div className="text-2xl md:text-3xl font-bold text-blue-400 mt-1 md:mt-2">₹399</div>
                                </div>
                                <Badge className="bg-blue-500/20 text-blue-300 text-xs md:text-sm">Instant Delivery</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
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
                            <NotaryBookingDialog serviceType="digital" />
                        </CardContent>
                    </Card>

                    <Card className="bg-white/5 backdrop-blur-xl border border-orange-500/30 relative overflow-hidden">
                        <div className="absolute -right-8 -top-8 w-24 h-24 md:-right-10 md:-top-10 md:w-32 md:h-32 bg-orange-500/10 rounded-full blur-xl" />
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-white">Physical Notarization</CardTitle>
                                    <div className="text-2xl md:text-3xl font-bold text-orange-400 mt-1 md:mt-2">₹799</div>
                                </div>
                                <Badge className="bg-orange-500/20 text-orange-300 text-xs md:text-sm">Courier Included</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                                <div className="flex items-start">
                                    <Check className="h-4 w-4 text-orange-400 mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-sm text-white/80">Physically notarized copy</span>
                                </div>
                                <div className="flex items-start">
                                    <Check className="h-4 w-4 text-orange-400 mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-sm text-white/80">Delivered in 3-4 days</span>
                                </div>
                                <div className="flex items-start">
                                    <Check className="h-4 w-4 text-orange-400 mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-sm text-white/80">Tracking number provided</span>
                                </div>
                            </div>
                            <NotaryBookingDialog serviceType="physical" />
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
                    <div className="inline-flex items-center mb-4 md:mb-6 text-sm text-white/60">
                        <Info className="h-4 w-4 mr-2" />
                        Have questions about the notarization process?
                    </div>
                    <Link href="/contact">
                        <Button variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20">
                            Contact Us
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                    </Link>
                </motion.div>
            </div>

            {/* Footer */}
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
                                    contact@nyaymitra.tech
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