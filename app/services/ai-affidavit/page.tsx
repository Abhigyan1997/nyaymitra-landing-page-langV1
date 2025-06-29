"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { FileSignature, Wand2, Sparkles, ArrowRight, Info, FileText } from "lucide-react"
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
            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20" />
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
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 backdrop-blur-sm mb-6">
                        <Wand2 className="h-4 w-4 text-indigo-400 mr-2" />
                        <span className="text-sm text-indigo-300">AI-Powered</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent pb-2">
                        Affidavit Generator
                    </h1>
                    <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                        Create legally valid affidavits in minutes with our AI assistant. Just fill in the details and download.
                    </p>
                </motion.div>

                {/* Progress Steps */}
                <div className="flex justify-between mb-12 relative">
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 -z-10" />
                    {[1, 2, 3].map((stepNumber) => (
                        <div key={stepNumber} className="flex flex-col items-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${step >= stepNumber ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 'bg-white/10 border border-white/20'}`}>
                                {step > stepNumber ? (
                                    <Check className="h-5 w-5 text-white" />
                                ) : (
                                    <span className="text-white font-medium">{stepNumber}</span>
                                )}
                            </div>
                            <span className={`text-sm ${step >= stepNumber ? 'text-indigo-300' : 'text-white/50'}`}>
                                {stepNumber === 1 && 'Details'}
                                {stepNumber === 2 && 'Review'}
                                {stepNumber === 3 && 'Download'}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Form Steps */}
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 mb-12">
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
                                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
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
                                className="text-center py-8"
                            >
                                <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Sparkles className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Your Affidavit is Ready!</h3>
                                <p className="text-white/70 mb-8">Download your legally formatted affidavit document below.</p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button className="bg-gradient-to-r from-indigo-500 to-purple-500">
                                        <FileText className="h-4 w-4 mr-2" />
                                        Download PDF (₹149)
                                    </Button>
                                    <Button variant="outline" className="bg-white/10 border-white/20">
                                        Make Changes
                                    </Button>
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
                    <div className="inline-flex items-center mb-6 text-sm text-white/60">
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
        </div>
    )
}