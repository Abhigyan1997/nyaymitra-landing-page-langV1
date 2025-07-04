"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Clock, User, Check, ArrowRight, Mail, MapPin, Phone, Scale, Home, X, Menu, BookText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { toast } from "sonner"
import axios from "axios"

declare global {
    interface Window {
        Razorpay: any
    }
}

type PaymentData = {
    amount: number
    currency: string
    razorpayOrderId: string
    key: string
}

type BookingResponse = {
    success: boolean
    message: string
    data: {
        order: any
        payment: PaymentData
    }
}

export default function PriorityBookingPage() {
    const [step, setStep] = useState(1)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [authStatus, setAuthStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading")
    const [isProcessingPayment, setIsProcessingPayment] = useState(false)
    const [createdOrder, setCreatedOrder] = useState<any>(null)
    const router = useRouter()

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        issue: "",
        date: "",
        time: "",
        lawyerType: ""
    })

    useEffect(() => {
        const checkAuth = () => {
            try {
                const token = localStorage.getItem("token")
                if (!token) {
                    setAuthStatus("unauthenticated")
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

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                return resolve(true)
            }
            const script = document.createElement('script')
            script.src = 'https://checkout.razorpay.com/v1/checkout.js'
            script.onload = () => resolve(true)
            script.onerror = () => {
                toast.error("Failed to load payment processor")
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }

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

    const handleCreateBooking = async () => {
        try {
            const ipAddress = ""; // or fetch from backend if needed
            const userAgent = window.navigator.userAgent;

            // Validate form data first
            if (!formData.name || !formData.phone || !formData.issue || !formData.lawyerType || !formData.date || !formData.time) {
                throw new Error("Please fill all required fields");
            }

            setIsProcessingPayment(true);

            const userProfileString = localStorage.getItem("userProfile");
            if (!userProfileString) {
                throw new Error("User session expired. Please login again.");
            }

            const userProfile = JSON.parse(userProfileString);
            const userId = userProfile.userId;
            const userEmail = userProfile.email;

            if (!userId || !userEmail) {
                throw new Error("Invalid user session. Please login again.");
            }

            const response = await axios.post<BookingResponse>(
                'http://localhost:4000/api/documents/priority-booking',
                {
                    name: formData.name,
                    phone: formData.phone,
                    issueType: formData.lawyerType,
                    preferredDate: formData.date,
                    preferredTime: formData.time,
                    description: formData.issue,
                    urgency: "high",
                    userId,
                    userEmail,
                    ipAddress,
                    userAgent,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            if (!response.data.success || !response.data.data?.payment) {
                throw new Error(response.data.message || "Failed to create booking");
            }

            setCreatedOrder(response.data.data.order);
            await handlePayment(response.data.data.payment);

        } catch (error: any) {
            console.error("Booking failed:", error);
            toast.error(error.response?.data?.message || error.message || "Failed to create booking");
            setIsProcessingPayment(false);
        }
    };

    const handlePayment = async (paymentData: PaymentData) => {
        try {
            const razorpayLoaded = await loadRazorpay();
            if (!razorpayLoaded) {
                toast.error("Payment processor failed to load");
                return;
            }

            const userProfileString = localStorage.getItem("userProfile");
            const userProfile = userProfileString ? JSON.parse(userProfileString) : null;

            // Validate we have required data
            if (!paymentData.razorpayOrderId || !paymentData.key) {
                throw new Error("Invalid payment data received");
            }

            const options = {
                key: paymentData.key,
                amount: paymentData.amount * 100, // Convert to paise
                currency: paymentData.currency,
                name: "Nyay Mitra",
                description: "Priority Legal Consultation",
                order_id: paymentData.razorpayOrderId,
                handler: async (response: any) => {
                    try {
                        const verifyResponse = await axios.post(
                            'http://localhost:4000/api/payment/verify',
                            {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                documentId: createdOrder._id,
                                userId: userProfile?.userId,
                                userEmail: userProfile?.email
                            },
                            {
                                headers: {
                                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                                }
                            }
                        );

                        if (verifyResponse.data.success) {
                            toast.success("Payment successful! Your booking is confirmed.");
                            router.push(`/bookings/${createdOrder._id}`);
                        } else {
                            throw new Error(verifyResponse.data.message || "Payment verification failed");
                        }
                    } catch (error: any) {
                        console.error("Payment verification failed:", error);
                        toast.error(error.response?.data?.message || "Payment verification failed. Please contact support.");
                    }
                },
                prefill: {
                    name: formData.name,
                    contact: formData.phone,
                    email: userProfile?.email || ""
                },
                theme: {
                    color: "#4f46e5"
                },
                modal: {
                    ondismiss: () => {
                        toast.info("Payment window closed. Your booking is still pending.");
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

            rzp.on('payment.failed', (response: any) => {
                toast.error(`Payment failed: ${response.error.description}`);
                console.error("Payment failed:", response.error);
            });

        } catch (error: any) {
            console.error("Payment initialization failed:", error);
            toast.error(error.message || "Failed to initialize payment. Please try again.");
            setIsProcessingPayment(false);
        }
    };

    if (authStatus === "loading") {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        )
    }

    if (authStatus === "unauthenticated") {
        return null
    }

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-pink-900/20" />
                <div className="absolute inset-0 cyber-grid opacity-30" />
            </div>

            {/* Responsive Header */}
            <header className="relative z-50 w-full border-b border-white/10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
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

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 backdrop-blur-sm mb-6">
                        <Clock className="h-4 w-4 text-red-400 mr-2" />
                        <span className="text-sm text-red-300">Same-Day Booking</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent pb-2">
                        Priority Consultation
                    </h1>
                    <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
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
                                    onClick={handleCreateBooking}
                                    disabled={isProcessingPayment}
                                >
                                    {isProcessingPayment ? "Processing..." : "Confirm & Pay ₹99"}
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
                                    nyaymitra.ai@gmail.com
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