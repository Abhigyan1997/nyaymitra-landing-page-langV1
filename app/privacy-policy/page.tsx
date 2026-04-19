// app/privacy/page.tsx
"use client"

import React from "react"
import Link from "next/link"
import { Shield, Lock, Database, Eye, Users, CreditCard, FileText, Mail, Phone, AlertCircle, CheckCircle, ChevronRight, Globe, Trash2, Bell, Server, Fingerprint } from "lucide-react"
import { motion } from "framer-motion"

export default function PrivacyPage() {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-16 pb-12 md:pt-24 md:pb-16">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/5 to-transparent" />
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl" />

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
                            <Shield className="h-4 w-4 text-purple-400" />
                            <span className="text-sm text-white/80">Your Privacy Matters</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                            Privacy Policy
                        </h1>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            How we protect, use, and safeguard your personal information
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-6 text-gray-400 text-sm">
                            <FileText className="h-4 w-4" />
                            <span>Effective from: June 2025</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Sidebar Navigation */}
                    <motion.aside
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-1"
                    >
                        <div className="sticky top-24 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Lock className="h-5 w-5 text-purple-400" />
                                Privacy Hub
                            </h3>
                            <nav className="space-y-2">
                                {[
                                    { href: "#collection", label: "Data Collection", icon: Database },
                                    { href: "#usage", label: "How We Use Data", icon: Eye },
                                    { href: "#payment", label: "Payment Security", icon: CreditCard },
                                    { href: "#sharing", label: "Data Sharing", icon: Users },
                                    { href: "#rights", label: "Your Rights", icon: CheckCircle },
                                    { href: "#security", label: "Security Measures", icon: Server },
                                    { href: "#updates", label: "Policy Updates", icon: Bell },
                                    { href: "#contact", label: "Contact Us", icon: Mail },
                                ].map((item) => (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all group"
                                    >
                                        <item.icon className="h-4 w-4 text-purple-400/70 group-hover:text-purple-400" />
                                        <span className="text-sm">{item.label}</span>
                                        <ChevronRight className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                ))}
                            </nav>

                            {/* Trust Badge */}
                            <div className="mt-6 pt-6 border-t border-white/10">
                                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20">
                                    <Fingerprint className="h-8 w-8 text-purple-400 mb-2" />
                                    <p className="text-xs text-gray-400 leading-relaxed">
                                        Your data is protected with industry-standard encryption and security protocols.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.aside>

                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Introduction */}
                        <motion.section variants={fadeInUp} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-purple-500/20 rounded-lg">
                                    <Shield className="h-5 w-5 text-purple-400" />
                                </div>
                                <h2 className="text-2xl font-semibold text-white">Our Commitment to Privacy</h2>
                            </div>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                At <span className="text-purple-400 font-semibold">NyayMitra</span>, your privacy is our highest priority. We are committed to protecting your personal information
                                and maintaining transparency about how we collect, use, and safeguard your data.
                            </p>
                            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                                    <p className="text-sm text-gray-300">
                                        This Privacy Policy applies to all services offered by NyayMitra, including our website, mobile app, and legal consultation platform.
                                    </p>
                                </div>
                            </div>
                        </motion.section>

                        {/* Data Collection */}
                        <motion.section variants={fadeInUp} id="collection" className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-500/20 rounded-lg">
                                    <Database className="h-5 w-5 text-blue-400" />
                                </div>
                                <h2 className="text-2xl font-semibold text-white">Information We Collect</h2>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    {
                                        title: "Personal Information",
                                        items: ["Full name", "Phone number", "Email address", "Date of birth"],
                                        icon: Users
                                    },
                                    {
                                        title: "Identity Documents",
                                        items: ["Government ID (Aadhaar/PAN)", "Address proof", "Professional credentials (for lawyers)"],
                                        icon: Fingerprint
                                    },
                                    {
                                        title: "Legal Data",
                                        items: ["Case documents", "Consultation history", "Chat transcripts", "Legal preferences"],
                                        icon: FileText
                                    },
                                    {
                                        title: "Technical Data",
                                        items: ["IP address", "Device information", "Browser type", "Usage patterns"],
                                        icon: Globe
                                    }
                                ].map((category, idx) => (
                                    <div key={idx} className="bg-white/5 rounded-xl p-4 border border-white/10">
                                        <div className="flex items-center gap-2 mb-3">
                                            <category.icon className="h-4 w-4 text-blue-400" />
                                            <h3 className="font-semibold text-white text-sm">{category.title}</h3>
                                        </div>
                                        <ul className="space-y-1.5">
                                            {category.items.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-gray-300 text-xs">
                                                    <div className="h-1 w-1 bg-blue-400 rounded-full mt-1.5" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* How We Use Data */}
                        <motion.section variants={fadeInUp} id="usage" className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8">
                            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                                <Eye className="h-5 w-5 text-green-400" />
                                How We Use Your Information
                            </h2>
                            <div className="space-y-3">
                                {[
                                    "Process legal consultations and lawyer bookings",
                                    "Verify your identity for secure document notarization",
                                    "Send important updates, invoices, and confirmation emails",
                                    "Improve our AI assistant and service recommendations",
                                    "Comply with legal and regulatory requirements",
                                    "Prevent fraud and enhance platform security"
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                                        <span className="text-gray-300">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Payment Security */}
                        <motion.section variants={fadeInUp} id="payment" className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8">
                            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                                <CreditCard className="h-5 w-5 text-yellow-400" />
                                Payment Security
                            </h2>
                            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-5 border border-yellow-500/20 mb-4">
                                <p className="text-gray-300 leading-relaxed">
                                    All payments on NyayMitra are processed through <span className="font-semibold text-yellow-400">Razorpay</span>, a PCI-DSS compliant payment gateway.
                                    We <span className="italic">never</span> store your credit/debit card details, CVV, or sensitive financial information on our servers.
                                </p>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                                <Lock className="h-4 w-4" />
                                <span>256-bit SSL encryption for all transactions</span>
                            </div>
                        </motion.section>

                        {/* Data Sharing */}
                        <motion.section variants={fadeInUp} id="sharing" className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8">
                            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                                <Users className="h-5 w-5 text-indigo-400" />
                                Data Sharing & Disclosure
                            </h2>
                            <p className="text-gray-300 mb-4">
                                We respect your privacy and do <span className="font-semibold text-indigo-400">not</span> sell or rent your personal data. Your information is shared only:
                            </p>
                            <ul className="space-y-2 ml-6">
                                {[
                                    "With the lawyer you book, for consultation purposes only",
                                    "With government agencies when required by law",
                                    "With our trusted service providers (hosting, email, analytics)",
                                    "To protect legal rights or prevent fraud"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-gray-300">
                                        <div className="h-1.5 w-1.5 bg-indigo-400 rounded-full mt-1.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.section>

                        {/* Your Rights */}
                        <motion.section variants={fadeInUp} id="rights" className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8">
                            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-teal-400" />
                                Your Privacy Rights
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    { title: "Access Data", desc: "View all personal information we hold about you" },
                                    { title: "Correct Errors", desc: "Update or fix inaccurate information" },
                                    { title: "Delete Data", desc: "Request permanent deletion of your data" },
                                    { title: "Opt-Out", desc: "Unsubscribe from marketing communications" },
                                    { title: "Data Portability", desc: "Export your data in a machine-readable format" },
                                    { title: "Withdraw Consent", desc: "Revoke previously given permissions" }
                                ].map((right, idx) => (
                                    <div key={idx} className="flex items-start gap-2 p-3 bg-white/5 rounded-lg">
                                        <CheckCircle className="h-4 w-4 text-teal-400 shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="font-semibold text-white text-sm">{right.title}</h4>
                                            <p className="text-gray-400 text-xs">{right.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Security Measures */}
                        <motion.section variants={fadeInUp} id="security" className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8">
                            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                                <Server className="h-5 w-5 text-red-400" />
                                Security Measures
                            </h2>
                            <div className="flex flex-wrap gap-3 mb-4">
                                {["256-bit SSL/TLS", "JWT Authentication", "Data Encryption", "Secure APIs", "Regular Audits", "Access Controls"].map((measure, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-xs text-red-300">
                                        {measure}
                                    </span>
                                ))}
                            </div>
                            <p className="text-gray-300 text-sm">
                                We follow industry-standard security practices and regularly update our systems to protect against unauthorized access,
                                data breaches, and cyber threats.
                            </p>
                        </motion.section>

                        {/* Cookies & Tracking */}
                        <motion.section variants={fadeInUp} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8">
                            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                                <Globe className="h-5 w-5 text-cyan-400" />
                                Cookies & Tracking
                            </h2>
                            <p className="text-gray-300 leading-relaxed">
                                We use cookies to enhance your browsing experience, analyze platform usage, and personalize content.
                                You can control cookie preferences through your browser settings.
                            </p>
                        </motion.section>

                        {/* Policy Updates */}
                        <motion.section variants={fadeInUp} id="updates" className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8">
                            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                                <Bell className="h-5 w-5 text-orange-400" />
                                Updates to This Policy
                            </h2>
                            <p className="text-gray-300 leading-relaxed">
                                We may update this Privacy Policy to reflect changes in our practices or legal requirements.
                                Significant changes will be notified via email or platform notification. We encourage you to review this page periodically.
                            </p>
                            <div className="mt-4 pt-4 border-t border-white/10">
                                <p className="text-sm text-gray-400">
                                    Last reviewed: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>
                            </div>
                        </motion.section>

                        {/* Consent */}
                        <motion.section variants={fadeInUp} className="bg-green-500/10 backdrop-blur-sm rounded-2xl border border-green-500/20 p-6">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="h-6 w-6 text-green-400 shrink-0" />
                                <div>
                                    <h3 className="text-lg font-semibold text-green-400 mb-1">Your Consent</h3>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        By using NyayMitra, you consent to the collection, use, and sharing of your information as described in this Privacy Policy.
                                        If you do not agree with any part of this policy, please discontinue using our services.
                                    </p>
                                </div>
                            </div>
                        </motion.section>

                        {/* Contact Section */}
                        <motion.section variants={fadeInUp} id="contact" className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6 md:p-8">
                            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                                <Mail className="h-5 w-5 text-purple-400" />
                                Privacy Questions?
                            </h2>
                            <p className="text-gray-300 mb-6">
                                If you have questions about this Privacy Policy or want to exercise your data rights, our privacy team is here to help.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                    <Mail className="h-5 w-5 text-purple-400" />
                                    <div>
                                        <p className="text-xs text-gray-400">Email</p>
                                        <a href="mailto:privacy@nyaymitra.tech" className="text-white hover:text-purple-400 transition-colors">
                                            privacy@nyaymitra.tech
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                    <Mail className="h-5 w-5 text-purple-400" />
                                    <div>
                                        <p className="text-xs text-gray-400">Support</p>
                                        <a href="mailto:support@nyaymitra.tech" className="text-white hover:text-purple-400 transition-colors">
                                            support@nyaymitra.tech
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-white/10 text-center text-gray-400 text-sm">
                                <p>We typically respond to privacy inquiries within 48 hours</p>
                            </div>
                        </motion.section>
                    </div>
                </div>
            </div>
        </main>
    )
}