// app/terms/page.tsx
"use client"

import React from "react"
import Link from "next/link"
import { Scale, Shield, Users, BookOpen, ChevronRight, AlertCircle, Clock, UserCheck, Ban, RefreshCw, Mail, Phone, MapPin } from "lucide-react"
import { motion } from "framer-motion"

export default function TermsPage() {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    }

    const staggerChildren = {
        animate: { transition: { staggerChildren: 0.1 } }
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-16 pb-12 md:pt-24 md:pb-16">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-transparent" />
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
                            <Scale className="h-4 w-4 text-blue-400" />
                            <span className="text-sm text-white/80">Legal Agreement</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
                            Terms & Conditions
                        </h1>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            Please read these terms carefully before using NyayMitra platform
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-6 text-gray-400 text-sm">
                            <Clock className="h-4 w-4" />
                            <span>Last updated: March 2026</span>
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
                                <BookOpen className="h-5 w-5 text-blue-400" />
                                Contents
                            </h3>
                            <nav className="space-y-2">
                                {[
                                    { href: "#general", label: "General Terms", icon: Shield },
                                    { href: "#lawyers", label: "Lawyer Terms", icon: Users },
                                    { href: "#privacy", label: "Privacy & Data", icon: UserCheck },
                                    { href: "#restrictions", label: "Restrictions", icon: Ban },
                                    { href: "#changes", label: "Changes to Terms", icon: RefreshCw },
                                    { href: "#contact", label: "Contact Us", icon: Mail },
                                ].map((item) => (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all group"
                                    >
                                        <item.icon className="h-4 w-4 text-blue-400/70 group-hover:text-blue-400" />
                                        <span className="text-sm">{item.label}</span>
                                        <ChevronRight className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </motion.aside>

                    {/* Main Content Area */}
                    <motion.div
                        variants={staggerChildren}
                        initial="initial"
                        animate="animate"
                        className="lg:col-span-2 space-y-8"
                    >
                        {/* Introduction */}
                        <motion.section variants={fadeInUp} id="general" className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-500/20 rounded-lg">
                                    <Scale className="h-5 w-5 text-blue-400" />
                                </div>
                                <h2 className="text-2xl font-semibold text-white">Introduction</h2>
                            </div>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                Welcome to <span className="text-blue-400 font-semibold">NyayMitra</span>. By accessing or using our platform, you agree to comply with the following terms and conditions.
                                NyayMitra is committed to providing a secure, transparent, and efficient legal tech platform that connects users with verified legal professionals.
                            </p>
                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mt-4">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                                    <p className="text-sm text-gray-300">
                                        <span className="font-semibold text-blue-400">Important:</span> NyayMitra is a technology platform that connects users with verified lawyers.
                                        We do not provide direct legal advice or representation. All legal advice comes from independent legal professionals.
                                    </p>
                                </div>
                            </div>
                        </motion.section>

                        {/* General Terms */}
                        <motion.section variants={fadeInUp} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8">
                            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                                <Shield className="h-5 w-5 text-blue-400" />
                                General Terms
                            </h2>
                            <ul className="space-y-3">
                                {[
                                    "You must be at least 18 years old to use this platform.",
                                    "You are responsible for the accuracy of your personal information, documents, and consultation details.",
                                    "All bookings are non-transferable and subject to lawyer availability.",
                                    "NyayMitra reserves the right to suspend or block accounts involved in suspicious or unethical activity.",
                                    "Users agree to communicate respectfully with lawyers and platform staff.",
                                    "Any false information or misrepresentation may lead to immediate account termination.",
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 text-gray-300">
                                        <div className="h-1.5 w-1.5 bg-blue-400 rounded-full mt-2 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.section>

                        {/* Lawyer Terms */}
                        <motion.section variants={fadeInUp} id="lawyers" className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-indigo-500/20 rounded-lg">
                                    <Users className="h-5 w-5 text-indigo-400" />
                                </div>
                                <h2 className="text-2xl font-semibold text-white">Additional Terms for Lawyers</h2>
                            </div>
                            <ul className="space-y-3">
                                {[
                                    "Lawyers must provide accurate, updated, and verified information including qualifications, specialization, and license details.",
                                    "Lawyers agree to uphold professional standards during all consultations booked through NyayMitra.",
                                    "Lawyers are not employees or agents of NyayMitra. They operate as independent professionals and are solely responsible for legal advice provided.",
                                    "Any misuse of the platform, including but not limited to misinformation, abuse, or no-shows, may result in temporary or permanent suspension.",
                                    "Lawyers must ensure availability and timely communication with clients who book through the platform.",
                                    "NyayMitra reserves the right to remove or suspend profiles that receive consistent negative feedback or breach platform terms.",
                                    "Lawyers must maintain client confidentiality as per legal ethics and applicable laws.",
                                    "Lawyers are required to respond to client queries within 24 hours during business days.",
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 text-gray-300">
                                        <div className="h-1.5 w-1.5 bg-indigo-400 rounded-full mt-2 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.section>

                        {/* Payment & Refund */}
                        <motion.section variants={fadeInUp} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8">
                            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                                <Scale className="h-5 w-5 text-green-400" />
                                Payment & Refund Policy
                            </h2>
                            <ul className="space-y-3">
                                {[
                                    "Consultation fees are displayed before booking and are non-refundable after the consultation begins.",
                                    "Cancellations made 24 hours before the scheduled consultation are eligible for full refund.",
                                    "Technical issues from NyayMitra's side that prevent consultation will result in full refund or rescheduling.",
                                    "Payment disputes must be raised within 7 days of the transaction date.",
                                    "All prices are in Indian Rupees (INR) and include applicable taxes.",
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 text-gray-300">
                                        <div className="h-1.5 w-1.5 bg-green-400 rounded-full mt-2 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.section>

                        {/* Restrictions */}
                        <motion.section variants={fadeInUp} id="restrictions" className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8">
                            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                                <Ban className="h-5 w-5 text-red-400" />
                                Prohibited Activities
                            </h2>
                            <ul className="space-y-3">
                                {[
                                    "Using the platform for illegal purposes or harassing lawyers/staff.",
                                    "Sharing offensive, abusive, or discriminatory content.",
                                    "Attempting to bypass payment systems or share account credentials.",
                                    "Providing false information during registration or consultation.",
                                    "Recording consultations without explicit consent from all parties.",
                                    "Using the platform to solicit business outside NyayMitra's ecosystem.",
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 text-gray-300">
                                        <div className="h-1.5 w-1.5 bg-red-400 rounded-full mt-2 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.section>

                        {/* Changes to Terms */}
                        <motion.section variants={fadeInUp} id="changes" className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8">
                            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                                <RefreshCw className="h-5 w-5 text-yellow-400" />
                                Changes to Terms
                            </h2>
                            <p className="text-gray-300 leading-relaxed mb-3">
                                NyayMitra may update these terms at any time to reflect changes in laws, platform features, or business operations.
                                We will notify users of significant changes via email or platform notification.
                            </p>
                            <p className="text-gray-300 leading-relaxed">
                                Continued use of the platform after changes indicates your acceptance of the revised terms.
                                If you do not agree with any part of these terms, please discontinue using our services.
                            </p>
                        </motion.section>

                        {/* Disclaimer */}
                        <motion.section variants={fadeInUp} className="bg-amber-500/10 backdrop-blur-sm rounded-2xl border border-amber-500/20 p-6 md:p-8">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="h-6 w-6 text-amber-400 shrink-0" />
                                <div>
                                    <h3 className="text-lg font-semibold text-amber-400 mb-2">Legal Disclaimer</h3>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        The information provided on NyayMitra is for general informational purposes only and does not constitute legal advice.
                                        No lawyer-client relationship is formed through the use of this platform. Always seek the advice of a qualified lawyer
                                        for your specific legal situation. NyayMitra shall not be liable for any decisions made based on information provided through the platform.
                                    </p>
                                </div>
                            </div>
                        </motion.section>

                        {/* Contact Section */}
                        <motion.section variants={fadeInUp} id="contact" className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-sm rounded-2xl border border-blue-500/30 p-6 md:p-8">
                            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                                <Mail className="h-5 w-5 text-blue-400" />
                                Contact Us
                            </h2>
                            <p className="text-gray-300 mb-6">
                                If you have any questions, concerns, or need clarification about these Terms & Conditions, please reach out to our support team.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                    <Mail className="h-5 w-5 text-blue-400" />
                                    <div>
                                        <p className="text-xs text-gray-400">Email</p>
                                        <a href="mailto:support@nyaymitra.tech" className="text-white hover:text-blue-400 transition-colors">
                                            support@nyaymitra.tech
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                    <Phone className="h-5 w-5 text-blue-400" />
                                    <div>
                                        <p className="text-xs text-gray-400">Phone</p>
                                        <a href="tel:+919900112233" className="text-white hover:text-blue-400 transition-colors">
                                            +91 79705 96183
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-white/10 text-center text-gray-400 text-sm">
                                <p>© {new Date().getFullYear()} NyayMitra. All rights reserved.</p>
                            </div>
                        </motion.section>
                    </motion.div>
                </div>
            </div>
        </main>
    )
}