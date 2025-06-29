"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Clock, User, Check, ArrowRight, Calendar, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function PriorityBookingPage() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        issue: "",
        date: "",
        time: "",
        lawyerType: ""
    })

    const lawyerTypes = [
        "Family Law",
        "Criminal Law",
        "Corporate Law",
        "Property Law",
        "Cyber Law",
        "Tax Law",
        "Other"
    ]

    const timeSlots = [
        "9:00 AM - 10:00 AM",
        "11:00 AM - 12:00 PM",
        "1:00 PM - 2:00 PM",
        "3:00 PM - 4:00 PM",
        "5:00 PM - 6:00 PM"
    ]

    const handleNext = () => {
        if (step < 3) setStep(step + 1)
    }

    const handleBack = () => {
        if (step > 1) setStep(step - 1)
    }

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-pink-900/20" />
                <div className="absolute inset-0 cyber-grid opacity-30" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 backdrop-blur-sm mb-6">
                        <Clock className="h-4 w-4 text-red-400 mr-2" />
                        <span className="text-sm text-red-300">Same-Day Booking</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent pb-2">
                        Priority Consultation
                    </h1>
                    <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                        Book same-day consultations with verified lawyers for urgent legal matters.
                    </p>
                </motion.div>

                {/* Booking Form */}
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 mb-12">
                    <CardHeader>
                        <CardTitle className="text-white">
                            {step === 1 && 'Your Information'}
                            {step === 2 && 'Select Lawyer & Time'}
                            {step === 3 && 'Confirm Booking'}
                        </CardTitle>
                        <CardDescription className="text-white/70">
                            {step === 1 && 'Provide your contact details'}
                            {step === 2 && 'Choose your preferred time slot'}
                            {step === 3 && 'Review and confirm your booking'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {step === 1 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-white/80 mb-2">Full Name</label>
                                        <Input
                                            className="bg-white/5 border-white/10 text-white"
                                            placeholder="Your full name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white/80 mb-2">Phone Number</label>
                                        <Input
                                            type="tel"
                                            className="bg-white/5 border-white/10 text-white"
                                            placeholder="Mobile number"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white/80 mb-2">Legal Issue</label>
                                    <Textarea
                                        className="bg-white/5 border-white/10 text-white min-h-[120px]"
                                        placeholder="Briefly describe your legal issue..."
                                        value={formData.issue}
                                        onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-white/80 mb-2">Type of Lawyer Needed</label>
                                    <Select onValueChange={(value) => setFormData({ ...formData, lawyerType: value })}>
                                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                            <SelectValue placeholder="Select specialization..." />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-900 border-white/10 text-white">
                                            {lawyerTypes.map((type) => (
                                                <SelectItem key={type} value={type}>{type}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-white/80 mb-2">Date</label>
                                        <Input
                                            type="date"
                                            className="bg-white/5 border-white/10 text-white"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white/80 mb-2">Time Slot</label>
                                        <Select onValueChange={(value) => setFormData({ ...formData, time: value })}>
                                            <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                                <SelectValue placeholder="Select time..." />
                                            </SelectTrigger>
                                            <SelectContent className="bg-gray-900 border-white/10 text-white">
                                                {timeSlots.map((slot) => (
                                                    <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                    <div className="flex items-center text-sm text-white/80">
                                        <MapPin className="h-4 w-4 mr-2 text-red-300" />
                                        <span>Consultation will be via phone/video call</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                                    <h3 className="font-medium text-lg text-white mb-4">Booking Summary</h3>

                                    <div className="space-y-4 text-white/80">
                                        <div>
                                            <span className="text-sm text-white/50 block">Name:</span>
                                            <p>{formData.name || "Not provided"}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-white/50 block">Phone:</span>
                                            <p>{formData.phone || "Not provided"}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-white/50 block">Legal Issue:</span>
                                            <p>{formData.issue || "Not provided"}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-white/50 block">Lawyer Type:</span>
                                            <p>{formData.lawyerType || "Not specified"}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-white/50 block">Date & Time:</span>
                                            <p>
                                                {formData.date ? new Date(formData.date).toLocaleDateString() : "Not specified"}
                                                {formData.time ? ` at ${formData.time}` : ""}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center text-sm text-green-300">
                                    <Check className="h-4 w-4 mr-2" />
                                    <span>Priority booking fee: ₹99 (added to consultation cost)</span>
                                </div>
                            </motion.div>
                        )}

                        <div className="mt-8 flex justify-between">
                            {step > 1 && (
                                <Button variant="outline" onClick={handleBack} className="bg-white/10 border-white/20">
                                    Back
                                </Button>
                            )}
                            {step < 3 ? (
                                <Button
                                    onClick={handleNext}
                                    className="bg-gradient-to-r from-red-500 to-pink-500 ml-auto"
                                    disabled={step === 1 && (!formData.name || !formData.phone || !formData.issue)}
                                >
                                    {step === 2 ? 'Review Booking' : 'Next Step'}
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            ) : (
                                <Button
                                    className="bg-gradient-to-r from-red-500 to-pink-500 w-full"
                                    size="lg"
                                >
                                    Confirm & Pay ₹99
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Regular Booking CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center"
                >
                    <div className="inline-flex items-center mb-6 text-sm text-white/60">
                        <Clock className="h-4 w-4 mr-2" />
                        Not urgent? Try our regular booking
                    </div>
                    <Link href="/booking">
                        <Button variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20">
                            Standard Booking
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}