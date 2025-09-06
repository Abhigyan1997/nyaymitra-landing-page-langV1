"use client"

import { motion } from "framer-motion"
import { Download, FileCheck, ArrowRight, FileText, Check, Zap, FileSearch, Scale, Sparkles, Users, Menu, X, Mail, Phone, Home, BookText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { loadRazorpayScript } from "@/utils/loadRazorpay";
import axios, { AxiosError, AxiosResponse } from "axios"
import { getUser } from "@/utils/getUser";

declare global {
    interface Window {
        Razorpay: any;
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
    type: string
}

interface RazorpayResponse {
    razorpay_payment_id: string
    razorpay_order_id: string
    razorpay_signature: string
}

export default function InstantDownloadPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [loadingDocumentId, setLoadingDocumentId] = useState<string | null>(null);
    const [authStatus, setAuthStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading")
    const router = useRouter()
    const { toast } = useToast()

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

    const documents: Document[] = [
        {
            id: "two-party-agreement",
            name: "Two Party Agreement",
            description: "Legally binding contract between two parties",
            features: ["Customizable terms", "Payment clauses", "Termination conditions"],
            price: 49,
            type: "agreement",
            sampleUrl: "/sample/agreement.html",
            downloadUrl: "/template/agreement.html"
        },
        {
            id: "affidavit-draft",
            name: "Affidavit Draft",
            description: "Legal declaration for various purposes",
            features: ["Name change", "Address proof", "Income declaration"],
            price: 99,
            type: "affidavit",
            sampleUrl: "/sample/affidavit.htm",
            downloadUrl: "/template/affidavit.html"
        },
        {
            id: "police-complaint",
            name: "Police Complaint",
            description: "Formal complaint letter to police authorities",
            features: ["Theft report", "Harassment complaint", "Lost property"],
            price: 99,
            type: "complaint",
            sampleUrl: "/sample/police-complaint.html",
            downloadUrl: "/template/police-complaint.html"
        }
    ];

    const handleViewSample = (doc: Document) => {
        window.open(doc.sampleUrl, '_blank', 'noopener,noreferrer');
    };

    const initiatePayment = async (docId: string) => {
        setLoadingDocumentId(docId);
        try {
            const doc = documents.find(d => d.id === docId);
            if (!doc) throw new Error("Document not found");

            const user = getUser();

            const razorpayLoaded = await loadRazorpayScript();
            if (!razorpayLoaded) throw new Error("Razorpay SDK failed to load");

            const { data: orderData } = await axios.post('https://nyaymitra-backend-document-production.up.railway.app/api/payment/create-order', {
                userId: user.userId,
                userEmail: user.email,
                serviceName: doc.name,
                documentType: doc.type,
                price: doc.price
            });

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Nyay Mitra",
                description: `Payment for ${doc.name}`,
                order_id: orderData.id,
                handler: async function (response: RazorpayResponse) {
                    await verifyPayment(response, orderData.orderRecordId, user.userId, doc.name);
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: user.phone || "9000000000"
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
                description: error?.message || "Failed to initiate payment",
                variant: "destructive"
            });
        } finally {
            setLoadingDocumentId(null);
        }
    };

    const verifyPayment = async (
        paymentResponse: RazorpayResponse,
        serviceOrderId: string,
        userId: string,
        documentName: string
    ) => {
        try {
            const { data } = await axios.post('https://nyaymitra-backend-document-production.up.railway.app/api/payment/verify', {
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_signature: paymentResponse.razorpay_signature,
                documentId: serviceOrderId
            });

            toast({
                title: "Payment Successful!",
                description: "Your document is ready for download",
            });

            await downloadDocument(serviceOrderId, userId, documentName);
        } catch (error: any) {
            console.error('Verification error:', error);
            toast({
                title: "Verification Failed",
                description: error.response?.data?.message || error.message || "Could not verify payment",
                variant: "destructive"
            });
        } finally {
            setLoadingDocumentId(null);
        }
    };

    const downloadDocument = async (documentId: string, userId: string, documentName: string) => {
        try {
            const response = await axios.get(`https://nyaymitra-backend-document-production.up.railway.app/api/documents/download`, {
                params: { documentId, userId },
                responseType: 'blob',
            });

            // Create a blob from the response data
            const blob = new Blob([response.data], { type: response.headers['content-type'] });

            // Create a temporary URL for the blob
            const url = window.URL.createObjectURL(blob);

            // Create a temporary anchor element to trigger the download
            const link = document.createElement('a');
            link.href = url;

            // Set the download filename based on the document type
            const fileName = `${documentName.toLowerCase().replace(/\s+/g, '-')}-template.html`;
            link.setAttribute('download', fileName);

            // Append to the body, click and remove
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Revoke the object URL to free up memory
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
                                            disabled={loadingDocumentId !== null}
                                        >
                                            {loadingDocumentId === doc.id ? (
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
                        {/* <Link href="/sample">
                            <Button variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20">
                                View All Samples
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        </Link> */}
                        <Link href="/lawyers">
                            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                                <Users className="h-4 w-4 mr-2" />
                                Consult a Lawyer
                            </Button>
                        </Link>
                    </div>
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