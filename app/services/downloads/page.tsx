"use client"

import { motion } from "framer-motion"
import { Download, FileCheck, ArrowRight, FileText, Check, Zap, FileSearch, Scale, Sparkles, Users, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import axios, { AxiosError, AxiosResponse } from "axios"

// Declare Razorpay on window interface
declare global {
    interface Window {
        Razorpay: new (options: any) => any
    }
}

interface Document {
    id: string
    name: string
    description: string
    features: string[]
    price: number
    sampleUrl: string
    downloadUrl: string
}

interface RazorpayResponse {
    razorpay_payment_id: string
    razorpay_order_id: string
    razorpay_signature: string
}

export default function InstantDownloadPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { toast } = useToast()

    const documents: Document[] = [
        {
            id: "two-party-agreement",
            name: "Two Party Agreement",
            description: "Legally binding contract between two parties",
            features: ["Customizable terms", "Payment clauses", "Termination conditions"],
            price: 149,
            sampleUrl: "/sample/agreement.html", // Path to sample in public folder
            downloadUrl: "/template/agreement.html" // Path to template in public folder
        },
        {
            id: "affidavit-draft",
            name: "Affidavit Draft",
            description: "Legal declaration for various purposes",
            features: ["Name change", "Address proof", "Income declaration"],
            price: 99,
            sampleUrl: "/sample/affidavit.htm",
            downloadUrl: "/template/affidavit.html"
        },
        {
            id: "police-complaint",
            name: "Police Complaint",
            description: "Formal complaint letter to police authorities",
            features: ["Theft report", "Harassment complaint", "Lost property"],
            price: 99,
            sampleUrl: "/sample/police-complaint.html",
            downloadUrl: "/template/police-complaint.html"
        }
    ];

    const handleViewSample = (doc: Document) => {
        // Open sample PDF from public/sample folder in new tab
        window.open(doc.sampleUrl, '_blank', 'noopener,noreferrer');
    };

    // Update your initiatePayment function
    const initiatePayment = async (docId: string) => {
        setIsLoading(true);
        try {
            const doc = documents.find(d => d.id === docId);
            if (!doc) throw new Error("Document not found");

            // Create order using axios
            const { data: orderData } = await axios.post('http://localhost:4000/api/payment/create-order', {
                documentId: docId,
                amount: doc.price * 100, // in paise
                currency: 'INR'
            });

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Nyay Mitra",
                description: `Payment for ${doc.name}`,
                order_id: orderData.id,
                handler: async function (response: RazorpayResponse) {
                    await verifyPayment(response, docId);
                },
                prefill: {
                    name: "Customer Name",
                    email: "customer@example.com",
                    contact: "9000000000"
                },
                theme: {
                    color: "#4F46E5"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error: any) {
            console.error('Payment error:', error);
            toast({
                title: "Payment Error",
                description: error.response?.data?.message || error.message || "Failed to initiate payment",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };


    const verifyPayment = async (paymentResponse: RazorpayResponse, docId: string) => {
        try {
            const { data: verificationData } = await axios.post('http://localhost:4000/api/payment/verify', {
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_signature: paymentResponse.razorpay_signature,
                documentId: docId
            });

            toast({
                title: "Payment Successful!",
                description: "Your document is ready for download",
            });

            await downloadDocument(docId);

        } catch (error: any) {
            console.error('Verification error:', error);
            toast({
                title: "Verification Failed",
                description: error.response?.data?.message || error.message || "Could not verify payment",
                variant: "destructive"
            });
        }
    };

    const downloadDocument = async (docId: string) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/documents/download`, {
                params: { documentId: docId },
                responseType: 'blob',
                withCredentials: true,
            });

            const blob = new Blob([response.data]);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;

            const doc = documents.find(d => d.id === docId);
            link.setAttribute('download', `${doc?.name.replace(/\s+/g, '-').toLowerCase()}-template.html`);

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            toast({
                title: "Download Started",
                description: "Your document is being downloaded",
            });
        } catch (error: any) {
            console.error('Download error:', error);
            toast({
                title: "Download Error",
                description: error.response?.data?.message || error.message || "Failed to download document",
                variant: "destructive"
            });
        }
    };

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-emerald-900/20 to-teal-900/20" />
                <div className="absolute inset-0 cyber-grid opacity-30" />
            </div>

            {/* Navigation */}
            <nav className="relative z-50 bg-black/20 backdrop-blur-xl border-b border-white/10 sticky top-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center space-x-4 md:space-x-6">
                            <Link href="/" className="flex items-center space-x-3 group">
                                <div className="relative">
                                    <Scale className="h-10 w-10 text-blue-400 group-hover:text-blue-300 transition-all duration-300 group-hover:rotate-12" />
                                    <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                                </div>
                                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    Nyay Mitra
                                </span>
                            </Link>
                            <Link href="/services" className="hidden md:block">
                                <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
                                    <ArrowRight className="h-4 w-4 mr-1 transform rotate-180" />
                                    Back to Services
                                </Button>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-4">
                            <Link href="/lawyers">
                                <Button
                                    variant="outline"
                                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                                >
                                    Find Lawyers
                                </Button>
                            </Link>
                            <Link href="/legal-gpt">
                                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 border-0">
                                    AI Assistant
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-white hover:bg-white/10"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden pb-4 space-y-2"
                        >
                            <Link href="/services">
                                <Button variant="ghost" className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10">
                                    <ArrowRight className="h-4 w-4 mr-2 transform rotate-180" />
                                    Back to Services
                                </Button>
                            </Link>
                            <Link href="/lawyers">
                                <Button variant="outline" className="w-full justify-start bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm">
                                    Find Lawyers
                                </Button>
                            </Link>
                            <Link href="/legal-gpt">
                                <Button className="w-full justify-start bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 border-0">
                                    AI Assistant
                                </Button>
                            </Link>
                        </motion.div>
                    )}
                </div>
            </nav>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 backdrop-blur-sm mb-6">
                        <Zap className="h-4 w-4 text-green-400 mr-2" />
                        <span className="text-sm text-green-300">Instant Access</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent pb-2">
                        Self-Attested Documents
                    </h1>
                    <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                        Download legally valid templates instantly. Fill in your details, print, and use immediately.
                    </p>
                </motion.div>

                {/* Documents Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {documents.map((doc, index) => (
                        <motion.div
                            key={doc.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            <Card className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-green-500/30 transition-all duration-300 h-full flex flex-col">
                                <CardHeader>
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                                            <FileText className="h-5 w-5 text-white" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-white">{doc.name}</CardTitle>
                                            <div className="text-sm text-green-300">₹{doc.price}</div>
                                        </div>
                                    </div>
                                    <CardDescription className="text-white/70">
                                        {doc.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="mt-auto">
                                    <div className="space-y-3 mb-6">
                                        {doc.features.map((feature, i) => (
                                            <div key={i} className="flex items-start">
                                                <Check className="h-4 w-4 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                                                <span className="text-sm text-white/80">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <Button
                                            variant="outline"
                                            onClick={() => handleViewSample(doc)}
                                            className="border-green-500/50 text-green-300 hover:bg-green-500/10 hover:text-green-200 hover:border-green-400/70 transition-colors"
                                        >
                                            <FileSearch className="h-4 w-4 mr-2" />
                                            View Sample
                                        </Button>
                                        <Button
                                            onClick={() => initiatePayment(doc.id)}
                                            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 group"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <span className="flex items-center">
                                                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Processing...
                                                </span>
                                            ) : (
                                                <>
                                                    <Download className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                                                    Download Now (₹{doc.price})
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-20 text-center"
                >
                    <div className="inline-flex items-center mb-6 text-sm text-white/60">
                        <FileSearch className="h-4 w-4 mr-2" />
                        Not sure which document you need?
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/services/downloads/samples">
                            <Button variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20">
                                View All Samples
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        </Link>
                        <Link href="/lawyers">
                            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                                <Users className="h-4 w-4 mr-2" />
                                Consult a Lawyer
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}