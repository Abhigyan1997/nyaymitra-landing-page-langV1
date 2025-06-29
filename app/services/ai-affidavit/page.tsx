"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { FileSignature, Wand2, Sparkles, ArrowRight, Info, FileText, Check, Scale, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function AIAffidavitPage() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        purpose: "",
        details: "",
        name: "",
        address: "",
        date: ""
    })

    const affidavitTypes = [
        "Name Change",
        "Address Proof",
        "Income Declaration",
        "Marriage Affidavit",
        "Lost Document",
        "Identity Verification",
        "Other"
    ]

    const handleNext = () => {
        if (step < 3) setStep(step + 1)
    }

    const handleBack = () => {
        if (step > 1) setStep(step - 1)
    }

    const handleSubmit = () => {
        // Handle form submission
        console.log("Generating affidavit with:", formData)
    }

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Responsive Header */}
            <header className="relative z-50 w-full border-b border-white/10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="relative">
                            <Scale className="h-10 w-10 text-blue-400 group-hover:text-blue-300 transition-all duration-300 group-hover:rotate-12" />
                            <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Nyay Mitra
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-6">
                        <Link href="/services" className="text-white/80 hover:text-white transition-colors">
                            Services
                        </Link>
                        <Link href="/pricing" className="text-white/80 hover:text-white transition-colors">
                            Pricing
                        </Link>
                        <Link href="/contact" className="text-white/80 hover:text-white transition-colors">
                            Contact
                        </Link>
                    </nav>

                    <div className="flex items-center space-x-4">
                        <Button className="bg-gradient-to-r from-indigo-500 to-purple-500">
                            Get Started
                        </Button>
                    </div>
                </div>
            </header>

            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20" />
                <div className="absolute inset-0 cyber-grid opacity-30" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 backdrop-blur-sm mb-4 md:mb-6">
                        <Wand2 className="h-4 w-4 text-indigo-400 mr-2" />
                        <span className="text-sm text-indigo-300">AI-Powered</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent pb-2">
                        Affidavit Generator
                    </h1>
                    <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                        Create legally valid affidavits in minutes with our AI assistant. Just fill in the details and download.
                    </p>
                </motion.div>

                {/* Progress Steps */}
                <div className="flex justify-between mb-8 md:mb-12 relative">
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 -z-10" />
                    {[1, 2, 3].map((stepNumber) => (
                        <div key={stepNumber} className="flex flex-col items-center">
                            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-2 ${step >= stepNumber ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 'bg-white/10 border border-white/20'}`}>
                                {step > stepNumber ? (
                                    <Check className="h-5 w-5 text-white" />
                                ) : (
                                    <span className="text-white font-medium">{stepNumber}</span>
                                )}
                            </div>
                            <span className={`text-xs md:text-sm ${step >= stepNumber ? 'text-indigo-300' : 'text-white/50'}`}>
                                {stepNumber === 1 && 'Details'}
                                {stepNumber === 2 && 'Review'}
                                {stepNumber === 3 && 'Download'}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Form Steps */}
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 mb-8 md:mb-12">
                    <CardHeader>
                        <CardTitle className="text-white">
                            {step === 1 && 'Affidavit Information'}
                            {step === 2 && 'Review Your Affidavit'}
                            {step === 3 && 'Download Your Document'}
                        </CardTitle>
                        <CardDescription className="text-white/70">
                            {step === 1 && 'Provide details for your affidavit'}
                            {step === 2 && 'Verify all information is correct'}
                            {step === 3 && 'Your document is ready'}
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
                                <div>
                                    <label className="block text-sm font-medium text-white/80 mb-2">Purpose of Affidavit</label>
                                    <Select onValueChange={(value) => setFormData({ ...formData, purpose: value })}>
                                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                            <SelectValue placeholder="Select purpose..." />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-900 border-white/10 text-white">
                                            {affidavitTypes.map((type) => (
                                                <SelectItem key={type} value={type}>{type}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white/80 mb-2">Full Details</label>
                                    <Textarea
                                        className="bg-white/5 border-white/10 text-white min-h-[120px]"
                                        placeholder="Describe all relevant details for your affidavit..."
                                        value={formData.details}
                                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-white/80 mb-2">Your Full Name</label>
                                        <Input
                                            className="bg-white/5 border-white/10 text-white"
                                            placeholder="As it should appear on the affidavit"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white/80 mb-2">Date</label>
                                        <Input
                                            type="date"
                                            className="bg-white/5 border-white/10 text-white"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white/80 mb-2">Your Address</label>
                                    <Textarea
                                        className="bg-white/5 border-white/10 text-white"
                                        placeholder="Full address as it should appear on the affidavit"
                                        rows={3}
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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
                                <div className="bg-white/5 rounded-lg p-4 md:p-6 border border-white/10">
                                    <h3 className="font-medium text-lg text-white mb-4">Affidavit Preview</h3>

                                    <div className="space-y-4 text-white/80">
                                        <div>
                                            <span className="text-sm text-white/50 block">Purpose:</span>
                                            <p>{formData.purpose || "Not specified"}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-white/50 block">Details:</span>
                                            <p>{formData.details || "Not provided"}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-white/50 block">Name:</span>
                                            <p>{formData.name || "Not provided"}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-white/50 block">Address:</span>
                                            <p>{formData.address || "Not provided"}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-white/50 block">Date:</span>
                                            <p>{formData.date || "Not specified"}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center text-sm text-yellow-300">
                                    <Info className="h-4 w-4 mr-2" />
                                    <span>Verify all information is correct before generating</span>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="text-center py-6 md:py-8"
                            >
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                                    <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-white" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Your Affidavit is Ready!</h3>
                                <p className="text-white/70 mb-6 md:mb-8">Download your legally formatted affidavit document below.</p>

                                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                                    <Button className="bg-gradient-to-r from-indigo-500 to-purple-500">
                                        <FileText className="h-4 w-4 mr-2" />
                                        Download PDF (₹149)
                                    </Button>
                                    <Button variant="outline" className="bg-white/10 border-white/20" onClick={() => setStep(1)}>
                                        Make Changes
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        <div className="mt-6 md:mt-8 flex justify-between">
                            {step > 1 && (
                                <Button variant="outline" onClick={handleBack} className="bg-white/10 border-white/20">
                                    Back
                                </Button>
                            )}
                            {step < 3 ? (
                                <Button
                                    onClick={handleNext}
                                    className="bg-gradient-to-r from-indigo-500 to-purple-500 ml-auto"
                                    disabled={!formData.purpose || !formData.details}
                                >
                                    Next Step
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            ) : null}
                        </div>
                    </CardContent>
                </Card>

                {/* Examples CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center"
                >
                    <div className="inline-flex items-center mb-4 md:mb-6 text-sm text-white/60">
                        <FileText className="h-4 w-4 mr-2" />
                        Need inspiration? See our affidavit examples
                    </div>
                    <Link href="/ai-affidavit/examples">
                        <Button variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20">
                            View Examples
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
                                    legal@nyaymitra.in
                                </li>
                                <li className="flex items-center">
                                    <Phone className="h-4 w-4 mr-2 text-lime-400" />
                                    +91 98765 43210
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