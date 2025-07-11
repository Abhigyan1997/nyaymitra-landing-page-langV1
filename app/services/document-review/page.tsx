"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    FileCheck, FileText, ArrowRight, Download, Clock, User, Mail, Phone,
    Info, AlertCircle, CheckCircle2, Loader2, ChevronDown, Home, BookText,
    Menu, X, Scale
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { toast } from "sonner"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

const submitDocumentReview = async (formData: any, file: File, token: string) => {
    const data = new FormData()

    // Append all form fields
    Object.keys(formData).forEach(key => {
        data.append(key, formData[key])
    })

    // Append the file
    data.append('document', file)

    const response = await fetch(`${API_URL}/api/documents/review`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: data
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Submission failed')
    }

    return await response.json()
}

export default function DocumentReviewPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        documentType: "",
        documentPurpose: "",
        specificQuestions: "",
        urgency: "48" // Default to 48 hours
    })

    const [file, setFile] = useState<File | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    // Match these with your backend enum values
    const documentTypes = [
        { value: "rent_agreement", label: "Rent Agreement" },
        { value: "bussiness_agreement", label: "Business Agreement" },
        { value: "affidavit", label: "Affidavit" },
        { value: "legal_notice", label: "Legal Notice" },
        { value: "power_of_attorney", label: "Power of Attorney" },
        { value: "will_testament", label: "Will/Testament" },
        { value: "agreement", label: "Generic Agreement" },
        { value: "complaint", label: "Complaint" },
        { value: "contract", label: "Contract" },
        { value: "education_gap_affidavit", label: "Education Gap Affidavit" },
        { value: "indemnity_bond", label: "Indemnity Bond" },
        { value: "legal_heir_certificate", label: "Legal Heir Certificate" },
        { value: "court_evidence_affidavit", label: "Court Evidence Affidavit" },
        { value: "other", label: "Other" }
    ]

    const urgencyOptions = [
        { value: "24", label: "24 Hours (₹999)" },
        { value: "48", label: "48 Hours (₹799)" },
        { value: "72", label: "72 Hours (₹599)" },
        { value: "168", label: "1 Week (₹499)" }
    ]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        // Clear error when field is edited
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }))
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            if (e.target.files[0].size > 5 * 1024 * 1024) { // 5MB limit
                setErrors(prev => ({ ...prev, file: "File size should be less than 5MB" }))
            } else {
                setFile(e.target.files[0])
                setErrors(prev => ({ ...prev, file: "" }))
            }
        }
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}
        if (!formData.name.trim()) newErrors.name = "Name is required"
        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Invalid email format"
        }
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone is required"
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Invalid phone number (10 digits required)"
        }
        if (!formData.documentType) newErrors.documentType = "Document type is required"
        if (!file) newErrors.file = "Document file is required"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return

        setIsSubmitting(true)

        try {
            // Get token from wherever you store it (localStorage, cookies, etc.)
            const token = localStorage.getItem('token') || ''

            const response = await submitDocumentReview({
                ...formData,
                userName: formData.name,
                userPhone: formData.phone
            }, file as File, token)

            if (response.success) {
                setSubmitSuccess(true)
                toast.success("Document submitted for review!", {
                    description: `Review ID: ${response.orderId}`,
                })
            } else {
                throw new Error(response.error || "Submission failed")
            }
        } catch (error) {
            toast.error("Submission failed", {
                description: error instanceof Error ? error.message : "Please try again later",
            })
            console.error("Submission error:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (submitSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
                {/* Header */}
                <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

                <div className="py-20 px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="mb-10"
                        >
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="h-10 w-10 text-green-400" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">Document Review Submitted!</h1>
                            <p className="text-lg text-gray-300 mb-8">
                                Your document has been received and will be reviewed by our legal experts within the selected timeframe.
                            </p>
                            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mb-8 text-left">
                                <h3 className="font-semibold text-lg mb-4 flex items-center">
                                    <FileCheck className="h-5 w-5 mr-2 text-blue-400" />
                                    Review Summary
                                </h3>
                                <div className="space-y-3">
                                    <p><span className="text-gray-400">Document Type:</span> {formData.documentType}</p>
                                    <p><span className="text-gray-400">Urgency:</span> {
                                        urgencyOptions.find(opt => opt.value === formData.urgency)?.label
                                    }</p>
                                    <p><span className="text-gray-400">File:</span> {file?.name}</p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/services">
                                    <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                                        Back to Services
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </Button>
                                </Link>
                                <Button variant="outline" onClick={() => setSubmitSuccess(false)}>
                                    Submit Another Document
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Footer */}
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
            {/* Header */}
            <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

            <div className="py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-12 text-center"
                    >
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 backdrop-blur-sm mb-6">
                            <FileCheck className="h-4 w-4 text-blue-400 mr-2" />
                            <span className="text-sm text-blue-300">Professional Legal Review</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Lawyer Document Review
                        </h1>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                            Get your legal documents reviewed by experienced lawyers with detailed feedback and suggested edits.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column - Form */}
                        <div className="lg:col-span-2">
                            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-white">
                                        <FileCheck className="h-5 w-5 mr-2 text-blue-400" />
                                        Document Details
                                    </CardTitle>
                                    <CardDescription className="text-gray-400">
                                        Fill in your information and upload your document for review
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <Label htmlFor="name" className="flex items-center mb-2 text-gray-300">
                                                    <User className="h-4 w-4 mr-2 text-gray-400" />
                                                    Full Name *
                                                </Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="John Doe"
                                                    className="bg-gray-800 border-gray-700 text-white"
                                                />
                                                {errors.name && (
                                                    <p className="text-red-400 text-sm mt-1 flex items-center">
                                                        <AlertCircle className="h-4 w-4 mr-1" />
                                                        {errors.name}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <Label htmlFor="email" className="flex items-center mb-2 text-gray-300">
                                                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                                    Email Address *
                                                </Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="john@example.com"
                                                    className="bg-gray-800 border-gray-700 text-white"
                                                />
                                                {errors.email && (
                                                    <p className="text-red-400 text-sm mt-1 flex items-center">
                                                        <AlertCircle className="h-4 w-4 mr-1" />
                                                        {errors.email}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <Label htmlFor="phone" className="flex items-center mb-2 text-gray-300">
                                                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                                    Phone Number *
                                                </Label>
                                                <Input
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="9876543210"
                                                    className="bg-gray-800 border-gray-700 text-white"
                                                />
                                                {errors.phone && (
                                                    <p className="text-red-400 text-sm mt-1 flex items-center">
                                                        <AlertCircle className="h-4 w-4 mr-1" />
                                                        {errors.phone}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <Label htmlFor="documentType" className="flex items-center mb-2 text-gray-300">
                                                    <FileText className="h-4 w-4 mr-2 text-gray-400" />
                                                    Document Type *
                                                </Label>
                                                <Select
                                                    onValueChange={(value) => setFormData({ ...formData, documentType: value })}
                                                    value={formData.documentType}
                                                >
                                                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                                        <SelectValue placeholder="Select document type" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-gray-900 border-gray-700 text-white">
                                                        {documentTypes.map((type) => (
                                                            <SelectItem
                                                                key={type.value}
                                                                value={type.value}
                                                                className="hover:bg-gray-800 focus:bg-gray-800"
                                                            >
                                                                {type.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {errors.documentType && (
                                                    <p className="text-red-400 text-sm mt-1 flex items-center">
                                                        <AlertCircle className="h-4 w-4 mr-1" />
                                                        {errors.documentType}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="file" className="flex items-center mb-2 text-gray-300">
                                                <Download className="h-4 w-4 mr-2 text-gray-400" />
                                                Upload Document (PDF/DOC/DOCX) *
                                            </Label>
                                            <div className="flex items-center justify-center w-full">
                                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-800/50 transition-colors">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        {file ? (
                                                            <>
                                                                <FileText className="h-8 w-8 text-blue-400 mb-2" />
                                                                <p className="text-sm text-gray-300">{file.name}</p>
                                                                <p className="text-xs text-gray-500 mt-1">
                                                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                                                </p>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <FileText className="h-8 w-8 text-gray-500 mb-2" />
                                                                <p className="text-sm text-gray-400">Click to upload</p>
                                                                <p className="text-xs text-gray-600 mt-1">Max 5MB</p>
                                                            </>
                                                        )}
                                                    </div>
                                                    <input
                                                        id="file"
                                                        type="file"
                                                        className="hidden"
                                                        onChange={handleFileChange}
                                                        accept=".pdf,.doc,.docx"
                                                    />
                                                </label>
                                            </div>
                                            {errors.file && (
                                                <p className="text-red-400 text-sm mt-1 flex items-center">
                                                    <AlertCircle className="h-4 w-4 mr-1" />
                                                    {errors.file}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="urgency" className="flex items-center mb-2 text-gray-300">
                                                <Clock className="h-4 w-4 mr-2 text-gray-400" />
                                                Review Urgency *
                                            </Label>
                                            <Select
                                                onValueChange={(value) => setFormData({ ...formData, urgency: value })}
                                                value={formData.urgency}
                                            >
                                                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                                    <SelectValue placeholder="Select urgency" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-gray-900 border-gray-700 text-white">
                                                    {urgencyOptions.map((option) => (
                                                        <SelectItem
                                                            key={option.value}
                                                            value={option.value}
                                                            className="hover:bg-gray-800 focus:bg-gray-800"
                                                        >
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label htmlFor="documentPurpose" className="flex items-center mb-2 text-gray-300">
                                                <Info className="h-4 w-4 mr-2 text-gray-400" />
                                                Document Purpose (Optional)
                                            </Label>
                                            <Textarea
                                                id="documentPurpose"
                                                name="documentPurpose"
                                                value={formData.documentPurpose}
                                                onChange={handleChange}
                                                placeholder="Describe what this document is for..."
                                                className="bg-gray-800 border-gray-700 min-h-[100px] text-white"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="specificQuestions" className="flex items-center mb-2 text-gray-300">
                                                <Info className="h-4 w-4 mr-2 text-gray-400" />
                                                Specific Questions (Optional)
                                            </Label>
                                            <Textarea
                                                id="specificQuestions"
                                                name="specificQuestions"
                                                value={formData.specificQuestions}
                                                onChange={handleChange}
                                                placeholder="Any specific areas you want the lawyer to focus on..."
                                                className="bg-gray-800 border-gray-700 min-h-[100px] text-white"
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    Submit for Review
                                                    <ArrowRight className="h-4 w-4 ml-2" />
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column - Information */}
                        <div className="space-y-6">
                            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-white">
                                        <Info className="h-5 w-5 mr-2 text-blue-400" />
                                        How It Works
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 bg-blue-500/20 rounded-full p-2 mr-4 mt-0.5">
                                                <span className="text-blue-400 font-bold">1</span>
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-white mb-1">Upload Your Document</h3>
                                                <p className="text-sm text-gray-400">
                                                    Submit your legal document in PDF, DOC, or DOCX format (max 5MB).
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 bg-purple-500/20 rounded-full p-2 mr-4 mt-0.5">
                                                <span className="text-purple-400 font-bold">2</span>
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-white mb-1">Expert Review</h3>
                                                <p className="text-sm text-gray-400">
                                                    Our licensed lawyers will thoroughly review your document based on your selected urgency.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 bg-green-500/20 rounded-full p-2 mr-4 mt-0.5">
                                                <span className="text-green-400 font-bold">3</span>
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-white mb-1">Receive Feedback</h3>
                                                <p className="text-sm text-gray-400">
                                                    Get detailed feedback, suggested edits, and recommendations via email within the promised timeframe.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-white">
                                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-400" />
                                        What You'll Get
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3 text-sm">
                                        <li className="flex items-start">
                                            <CheckCircle2 className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-300">Detailed review by experienced lawyers in your field</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle2 className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-300">Marked-up document with suggested edits and comments</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle2 className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-300">Summary of key legal issues and potential risks</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle2 className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-300">Answers to your specific questions (if provided)</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle2 className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-300">Recommendations for next steps or additional legal actions</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle2 className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-300">Follow-up options for further consultation</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-white">
                                        <AlertCircle className="h-5 w-5 mr-2 text-yellow-400" />
                                        Important Notes
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex items-start">
                                            <AlertCircle className="h-4 w-4 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <strong className="text-yellow-400">Confidentiality: </strong>
                                                <span className="text-gray-400">Your documents are kept strictly confidential and are only accessible to our legal team.</span>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <AlertCircle className="h-4 w-4 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <strong className="text-yellow-400">Turnaround Time: </strong>
                                                <span className="text-gray-400">The review will be completed within your selected timeframe, starting from when payment is confirmed.</span>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <AlertCircle className="h-4 w-4 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <strong className="text-yellow-400">Not Legal Advice: </strong>
                                                <span className="text-gray-400">This service provides document review only and does not constitute formal legal advice or representation.</span>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <AlertCircle className="h-4 w-4 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <strong className="text-yellow-400">Refunds: </strong>
                                                <span className="text-gray-400">Due to the nature of this service, refunds are only available if we fail to deliver within the promised timeframe.</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    )
}

// Header Component
function Header({ mobileMenuOpen, setMobileMenuOpen }: {
    mobileMenuOpen: boolean,
    setMobileMenuOpen: (open: boolean) => void
}) {
    return (
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
    )
}

// Footer Component
function Footer() {
    return (
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
    )
}