// app/shipping-policy/page.tsx
"use client"

import React from "react"
import Link from "next/link"
import { Truck, Mail, Clock, MapPin, Package, Send, FileText, Phone, CheckCircle, Shield, AlertCircle, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

export default function ShippingPolicyPage() {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-16 pb-12 md:pt-24 md:pb-16">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-transparent" />
                <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
                            <Truck className="h-4 w-4 text-blue-400" />
                            <span className="text-sm text-white/80">Shipping & Delivery</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
                            Shipping & Delivery Policy
                        </h1>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            Fast, secure, and reliable delivery of your legal documents and services
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-6 text-gray-400 text-sm">
                            <Clock className="h-4 w-4" />
                            <span>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
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
                                <Package className="h-5 w-5 text-blue-400" />
                                Quick Navigation
                            </h3>
                            <nav className="space-y-2">
                                {[
                                    { href: "#digital", label: "Digital Delivery", icon: Send },
                                    { href: "#physical", label: "Physical Courier", icon: Truck },
                                    { href: "#timeline", label: "Delivery Timeline", icon: Clock },
                                    { href: "#tracking", label: "Order Tracking", icon: MapPin },
                                    { href: "#faq", label: "FAQ", icon: FileText },
                                    { href: "#contact", label: "Contact Support", icon: Mail },
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
                    <div className="lg:col-span-2 space-y-8">
                        {/* Digital Service Delivery */}
                        <motion.section variants={fadeInUp} id="digital" className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-500/20 rounded-lg">
                                    <Send className="h-5 w-5 text-blue-400" />
                                </div>
                                <h2 className="text-2xl font-semibold text-white">Digital Service Delivery</h2>
                            </div>
                            <p className="text-gray-300 leading-relaxed mb-6">
                                NyayMitra primarily offers digital legal services. Most deliverables are provided electronically for instant access and maximum convenience.
                            </p>

                            <div className="space-y-4">
                                {[
                                    {
                                        title: "Legal Documents (Contracts, Agreements, Notices)",
                                        items: [
                                            "Instant generation for standard templates",
                                            "Delivery via email & NyayMitra dashboard",
                                            "WhatsApp delivery option available",
                                            "Downloadable PDF format with digital signatures"
                                        ],
                                        icon: FileText
                                    },
                                    {
                                        title: "Legal Reviews & Consultations",
                                        items: [
                                            "Lawyer-reviewed documents within 24 hours",
                                            "Detailed analysis sent to your registered email",
                                            "Follow-up consultation available via video/chat",
                                            "Document version tracking included"
                                        ],
                                        icon: Shield
                                    },
                                    {
                                        title: "Remote Notarization",
                                        items: [
                                            "Digitally notarized documents instantly",
                                            "Shared via email and dashboard",
                                            "Blockchain-verified certificates",
                                            "Physical courier option available"
                                        ],
                                        icon: CheckCircle
                                    }
                                ].map((service, idx) => (
                                    <div key={idx} className="bg-white/5 rounded-xl p-4 border border-white/10">
                                        <div className="flex items-center gap-2 mb-3">
                                            <service.icon className="h-4 w-4 text-blue-400" />
                                            <h3 className="font-semibold text-white">{service.title}</h3>
                                        </div>
                                        <ul className="space-y-2 ml-6">
                                            {service.items.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                                                    <div className="h-1.5 w-1.5 bg-blue-400 rounded-full mt-1.5 shrink-0" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Physical Courier Section */}
                        <motion.section variants={fadeInUp} id="physical" className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-indigo-500/20 rounded-lg">
                                    <Truck className="h-5 w-5 text-indigo-400" />
                                </div>
                                <h2 className="text-2xl font-semibold text-white">Physical Courier Service</h2>
                            </div>
                            <p className="text-gray-300 leading-relaxed mb-6">
                                For printed and notarized documents requiring physical delivery, we partner with trusted courier services to ensure safe and timely delivery.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-4 mb-6">
                                <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl p-4 border border-blue-500/20">
                                    <Package className="h-8 w-8 text-blue-400 mb-2" />
                                    <h3 className="font-semibold text-white mb-2">Processing Time</h3>
                                    <p className="text-gray-300 text-sm">1-2 business days after document notarization</p>
                                </div>
                                <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl p-4 border border-indigo-500/20">
                                    <Clock className="h-8 w-8 text-indigo-400 mb-2" />
                                    <h3 className="font-semibold text-white mb-2">Shipping Time</h3>
                                    <p className="text-gray-300 text-sm">2-3 business days (varies by location)</p>
                                </div>
                            </div>

                            <div className="bg-white/5 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <MapPin className="h-4 w-4 text-green-400" />
                                    <h3 className="font-semibold text-white">Shipping Partners</h3>
                                </div>
                                <p className="text-gray-300 text-sm">We partner with leading courier services including DTDC, BlueDart, Delhivery, and India Post for pan-India delivery.</p>
                            </div>
                        </motion.section>

                        {/* Delivery Timeline */}
                        <motion.section variants={fadeInUp} id="timeline" className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8">
                            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                                <Clock className="h-5 w-5 text-green-400" />
                                Delivery Timeline by Service
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="border-b border-white/10">
                                        <tr>
                                            <th className="pb-3 text-white font-semibold">Service Type</th>
                                            <th className="pb-3 text-white font-semibold">Delivery Method</th>
                                            <th className="pb-3 text-white font-semibold">Timeline</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/10">
                                        {[
                                            ["Standard Templates", "Digital", "Instant"],
                                            ["Custom Documents", "Digital", "24-48 hours"],
                                            ["Lawyer Review", "Digital", "Within 24 hours"],
                                            ["Remote Notarization", "Digital", "1-2 Business Days"],
                                            ["Physical Notarized Copy", "Courier", "3-5 business days"],
                                            ["Express Shipping", "Courier", "1-2 business days"],
                                        ].map((row, idx) => (
                                            <tr key={idx} className="hover:bg-white/5 transition-colors">
                                                <td className="py-3 text-gray-300">{row[0]}</td>
                                                <td className="py-3 text-gray-300">{row[1]}</td>
                                                <td className="py-3 text-blue-400 font-medium">{row[2]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.section>

                        {/* Tracking Information */}
                        <motion.section variants={fadeInUp} id="tracking" className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8">
                            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-yellow-400" />
                                Order Tracking
                            </h2>
                            <div className="space-y-3 text-gray-300">
                                <p>Once your physical order is dispatched, you will receive:</p>
                                <ul className="space-y-2 ml-6">
                                    <li className="flex items-start gap-2">
                                        <div className="h-1.5 w-1.5 bg-yellow-400 rounded-full mt-1.5" />
                                        <span>📧 Email confirmation with tracking number</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="h-1.5 w-1.5 bg-yellow-400 rounded-full mt-1.5" />
                                        <span>📱 SMS notification with tracking link</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="h-1.5 w-1.5 bg-yellow-400 rounded-full mt-1.5" />
                                        <span>📦 Real-time updates in your NyayMitra dashboard</span>
                                    </li>
                                </ul>
                            </div>
                        </motion.section>

                        {/* FAQ Section */}
                        <motion.section variants={fadeInUp} id="faq" className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8">
                            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                                <FileText className="h-5 w-5 text-purple-400" />
                                Frequently Asked Questions
                            </h2>
                            <div className="space-y-4">
                                {[
                                    {
                                        q: "Is there any shipping charge for digital delivery?",
                                        a: "No, digital delivery is completely free. All documents sent via email or dashboard are included in your consultation/service fee."
                                    },
                                    {
                                        q: "Do you ship internationally?",
                                        a: "Currently, physical shipping is available only within India. Digital services are available worldwide."
                                    },
                                    {
                                        q: "What if my package is delayed or lost?",
                                        a: "If your package is delayed beyond 7 business days or lost in transit, we will re-ship your documents at no additional cost. Contact our support team immediately."
                                    },
                                    {
                                        q: "Can I change my delivery address after shipping?",
                                        a: "Address changes are only possible before dispatch. Once shipped, you'll need to coordinate directly with the courier partner using your tracking number."
                                    },
                                    {
                                        q: "Do you offer express shipping?",
                                        a: "Yes, express shipping (1-2 business days) is available at an additional cost. Select the option at checkout."
                                    }
                                ].map((faq, idx) => (
                                    <div key={idx} className="border-b border-white/10 pb-3 last:border-0">
                                        <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
                                        <p className="text-gray-300 text-sm">{faq.a}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Disclaimer */}
                        <motion.section variants={fadeInUp} className="bg-amber-500/10 backdrop-blur-sm rounded-2xl border border-amber-500/20 p-6">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-amber-400 mb-1">Important Note</h3>
                                    <p className="text-gray-300 text-sm">
                                        Delivery times are estimates and may vary due to courier partner delays, weather conditions, or unforeseen circumstances.
                                        NyayMitra is not liable for third-party delays beyond our control. For urgent matters, we recommend digital delivery.
                                    </p>
                                </div>
                            </div>
                        </motion.section>

                        {/* Contact Section */}
                        <motion.section variants={fadeInUp} id="contact" className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-sm rounded-2xl border border-blue-500/30 p-6 md:p-8">
                            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                                <Mail className="h-5 w-5 text-blue-400" />
                                Need Help With Delivery?
                            </h2>
                            <p className="text-gray-300 mb-6">
                                For any delivery-related concerns, tracking issues, or special requests, our support team is here to help.
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
                                <p>Response time: Within 24 hours on business days</p>
                            </div>
                        </motion.section>
                    </div>
                </div>
            </div>
        </main>
    )
}