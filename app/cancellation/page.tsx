// app/cancellation/page.tsx
"use client"

import React from "react"
import Link from "next/link"
import { CalendarX, RefreshCw, Clock, CreditCard, Mail, Phone, AlertCircle, CheckCircle, Shield, FileText, Truck, Ban, DollarSign, HelpCircle, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

export default function CancellationRefundPolicy() {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-16 pb-12 md:pt-24 md:pb-16">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-orange-600/5 to-transparent" />
                <div className="absolute top-20 right-10 w-72 h-72 bg-red-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-10 left-10 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl" />

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
                            <RefreshCw className="h-4 w-4 text-red-400" />
                            <span className="text-sm text-white/80">Cancellation & Refunds</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                            Cancellation & Refund Policy
                        </h1>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            Clear, fair, and transparent policies for cancellations and refunds
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-6 text-gray-400 text-sm">
                            <CalendarX className="h-4 w-4" />
                            <span>Effective Date: June 2025</span>
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
                                <HelpCircle className="h-5 w-5 text-red-400" />
                                Policy Guide
                            </h3>
                            <nav className="space-y-2">
                                {[
                                    { href: "#cancellation", label: "Booking Cancellation", icon: CalendarX },
                                    { href: "#eligibility", label: "Refund Eligibility", icon: CheckCircle },
                                    { href: "#process", label: "Refund Process", icon: RefreshCw },
                                    { href: "#timeline", label: "Refund Timeline", icon: Clock },
                                    { href: "#special", label: "Special Cases", icon: FileText },
                                    { href: "#exceptions", label: "Non-Refundable Items", icon: Ban },
                                    { href: "#disputes", label: "Dispute Resolution", icon: Shield },
                                    { href: "#contact", label: "Contact Support", icon: Mail },
                                ].map((item) => (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all group"
                                    >
                                        <item.icon className="h-4 w-4 text-red-400/70 group-hover:text-red-400" />
                                        <span className="text-sm">{item.label}</span>
                                        <ChevronRight className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                ))}
                            </nav>

                            {/* Quick Help Box */}
                            <div className="mt-6 pt-6 border-t border-white/10">
                                <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl p-4 border border-red-500/20">
                                    <DollarSign className="h-8 w-8 text-red-400 mb-2" />
                                    <p className="text-xs text-gray-400 leading-relaxed">
                                        Need immediate assistance with a refund? Contact our support team within 48 hours of your scheduled service.
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
                                <div className="p-2 bg-red-500/20 rounded-lg">
                                    <Shield className="h-5 w-5 text-red-400" />
                                </div>
                                <h2 className="text-2xl font-semibold text-white">Our Commitment to Fairness</h2>
                            </div>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                At <span className="text-red-400 font-semibold">NyayMitra</span>, we understand that circumstances may change.
                                This policy outlines the terms under which users can cancel bookings and request refunds for services offered through our platform.
                            </p>
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                                    <p className="text-sm text-gray-300">
                                        We strive to process all refund requests fairly and transparently. Please review this policy carefully before making a booking.
                                    </p>
                                </div>
                            </div>
                        </motion.section>

                        {/* Booking Cancellation */}
                        <motion.section variants={fadeInUp} id="cancellation" className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-500/20 rounded-lg">
                                    <CalendarX className="h-5 w-5 text-blue-400" />
                                </div>
                                <h2 className="text-2xl font-semibold text-white">Booking Cancellation Policy</h2>
                            </div>
                            <div className="space-y-4">
                                {[
                                    {
                                        title: "Standard Cancellation",
                                        time: "12+ hours before",
                                        refund: "100% Full Refund",
                                        color: "green",
                                        icon: CheckCircle
                                    },
                                    {
                                        title: "Late Cancellation",
                                        time: "Within 12 hours",
                                        refund: "No Refund / Partial",
                                        color: "yellow",
                                        icon: Clock
                                    },
                                    {
                                        title: "Lawyer Cancellation",
                                        time: "Any time",
                                        refund: "Full Refund or Free Reschedule",
                                        color: "blue",
                                        icon: Shield
                                    }
                                ].map((item, idx) => (
                                    <div key={idx} className={`bg-${item.color}-500/5 rounded-xl p-4 border border-${item.color}-500/20`}>
                                        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                                            <div className="flex items-center gap-2">
                                                <item.icon className={`h-5 w-5 text-${item.color}-400`} />
                                                <h3 className="font-semibold text-white">{item.title}</h3>
                                            </div>
                                            <span className={`text-xs px-2 py-1 bg-${item.color}-500/20 rounded-full text-${item.color}-300`}>
                                                {item.time}
                                            </span>
                                        </div>
                                        <p className={`text-${item.color}-400 font-medium text-sm`}>{item.refund}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Refund Eligibility */}
                        <motion.section variants={fadeInUp} id="eligibility" className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8">
                            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-green-400" />
                                Refund Eligibility Criteria
                            </h2>
                            <div className="space-y-3">
                                {[
                                    "Eligible cancellations made within the specified timeframe",
                                    "Failed transactions due to technical issues on our platform",
                                    "Duplicate payments or accidental charges",
                                    "Service not delivered as promised (verified by our team)",
                                    "Lawyer no-show or cancellation without adequate notice"
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                                        <span className="text-gray-300">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                                <p className="text-sm text-yellow-300">
                                    ⏰ Refund requests must be raised within <strong>48 hours</strong> of the originally scheduled service time.
                                </p>
                            </div>
                        </motion.section>

                        {/* Refund Process */}
                        <motion.section variants={fadeInUp} id="process" className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8">
                            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                                <RefreshCw className="h-5 w-5 text-purple-400" />
                                Refund Process
                            </h2>
                            <div className="space-y-4">
                                {[
                                    { step: 1, title: "Submit Request", desc: "Email us with your booking ID and reason for cancellation" },
                                    { step: 2, title: "Verification", desc: "Our team reviews your request within 24-48 hours" },
                                    { step: 3, title: "Approval", desc: "You'll receive email confirmation if eligible" },
                                    { step: 4, title: "Processing", desc: "Refund initiated to original payment method" }
                                ].map((item) => (
                                    <div key={item.step} className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
                                            <span className="text-purple-400 font-semibold text-sm">{item.step}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white">{item.title}</h4>
                                            <p className="text-gray-400 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Refund Timeline */}
                        <motion.section variants={fadeInUp} id="timeline" className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8">
                            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                                <Clock className="h-5 w-5 text-orange-400" />
                                Refund Timeline
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="bg-white/5 rounded-xl p-4">
                                    <h3 className="font-semibold text-white mb-2">Processing Time</h3>
                                    <p className="text-2xl font-bold text-orange-400">5-7</p>
                                    <p className="text-gray-400 text-sm">Business days for approval</p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-4">
                                    <h3 className="font-semibold text-white mb-2">Bank Transfer</h3>
                                    <p className="text-2xl font-bold text-orange-400">3-5</p>
                                    <p className="text-gray-400 text-sm">Additional business days</p>
                                </div>
                            </div>
                            <div className="mt-4 p-3 bg-blue-500/10 rounded-lg">
                                <p className="text-sm text-blue-300">
                                    💳 Total time may vary depending on your bank or payment gateway. You'll receive email notifications at each stage.
                                </p>
                            </div>
                        </motion.section>

                        {/* Special Cases */}
                        <motion.section variants={fadeInUp} id="special" className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8">
                            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                                <FileText className="h-5 w-5 text-indigo-400" />
                                Special Cases: Notary & Document Services
                            </h2>
                            <div className="space-y-4">
                                {[
                                    "Notary services once initiated may be non-refundable due to third-party processing fees",
                                    "Physical stamp paper purchases are non-refundable after procurement",
                                    "Courier delivery failures may qualify for redelivery or partial refund",
                                    "Document drafting services are refundable only before work begins"
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <div className="h-1.5 w-1.5 bg-indigo-400 rounded-full mt-1.5" />
                                        <span className="text-gray-300 text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Non-Refundable Items */}
                        <motion.section variants={fadeInUp} id="exceptions" className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8">
                            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                                <Ban className="h-5 w-5 text-red-400" />
                                Non-Refundable Items
                            </h2>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {[
                                    "Completed consultations",
                                    "Downloaded documents",
                                    "Government fees",
                                    "Stamp duty charges",
                                    "Third-party processing fees",
                                    "Express delivery charges"
                                ].map((item, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-xs text-red-300">
                                        {item}
                                    </span>
                                ))}
                            </div>
                            <p className="text-gray-400 text-sm">
                                These items are non-refundable once the service has been delivered or third-party costs have been incurred.
                            </p>
                        </motion.section>

                        {/* Dispute Resolution */}
                        <motion.section variants={fadeInUp} id="disputes" className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8">
                            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                                <Shield className="h-5 w-5 text-cyan-400" />
                                Dispute Resolution Process
                            </h2>
                            <p className="text-gray-300 mb-4">
                                If you disagree with our refund decision, you can escalate your concern through the following steps:
                            </p>
                            <ol className="space-y-3 ml-6">
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400 font-semibold">1.</span>
                                    <span className="text-gray-300">Contact our support team for review</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400 font-semibold">2.</span>
                                    <span className="text-gray-300">Escalate to refund supervisor (48-hour response)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400 font-semibold">3.</span>
                                    <span className="text-gray-300">File a formal complaint with supporting documents</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400 font-semibold">4.</span>
                                    <span className="text-gray-300">Final decision within 7 business days</span>
                                </li>
                            </ol>
                        </motion.section>

                        {/* Policy Note */}
                        <motion.section variants={fadeInUp} className="bg-amber-500/10 backdrop-blur-sm rounded-2xl border border-amber-500/20 p-6">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-amber-400 mb-1">Policy Updates</h3>
                                    <p className="text-gray-300 text-sm">
                                        NyayMitra reserves the right to modify this policy at any time. Changes will be effective immediately upon posting.
                                        Please review this page regularly for updates. For bookings made before policy changes, the previous policy applies.
                                    </p>
                                </div>
                            </div>
                        </motion.section>

                        {/* Contact Section */}
                        <motion.section variants={fadeInUp} id="contact" className="bg-gradient-to-r from-red-600/20 to-orange-600/20 backdrop-blur-sm rounded-2xl border border-red-500/30 p-6 md:p-8">
                            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                                <Mail className="h-5 w-5 text-red-400" />
                                Need Help With a Refund?
                            </h2>
                            <p className="text-gray-300 mb-6">
                                Our support team is ready to assist you with cancellations, refunds, or any billing concerns.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                    <Mail className="h-5 w-5 text-red-400" />
                                    <div>
                                        <p className="text-xs text-gray-400">Email</p>
                                        <a href="mailto:support@nyaymitra.tech" className="text-white hover:text-red-400 transition-colors">
                                            support@nyaymitra.tech
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                    <Phone className="h-5 w-5 text-red-400" />
                                    <div>
                                        <p className="text-xs text-gray-400">Phone</p>
                                        <a href="tel:+919900112233" className="text-white hover:text-red-400 transition-colors">
                                            +91 79705 96183
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-white/10 text-center text-gray-400 text-sm">
                                <p>Please include your <span className="text-red-400">Booking ID</span> and <span className="text-red-400">Contact Details</span> for faster processing</p>
                            </div>
                        </motion.section>
                    </div>
                </div>
            </div>
        </main>
    )
}