// components/notary-booking-dialog.tsx
"use client"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Info, FileText, User, Mail, Phone, MapPin, AlertCircle, CheckCircle, Printer, X, Scale, Sparkles } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

interface DocumentType {
    id: string
    name: string
    stampRange: [number, number]
    description: string
    requiresRegistration: boolean
    registrationNote?: string
}

interface FormData {
    name: string
    email: string
    phone: string
    documentType: string
    stampValue: number
    documentDescription: string
    deliveryAddress?: string
    specialInstructions: string
    requiresRegistration: boolean
}

interface BookingReceipt {
    orderId: string
    paymentId: string
    serviceOrderId: string
    documentType: string
    stampValue: number
    serviceFee: number
    deliveryFee: number
    totalAmount: number
    serviceType: 'digital' | 'physical'
    deliveryMethod: string
    customerName: string
    email: string
    phone: string
    date: string
    status: string
}

const DOCUMENT_TYPES: DocumentType[] = [
    {
        id: "general_affidavit",
        name: "General Affidavit",
        stampRange: [10, 20],
        description: "For general declarations and statements",
        requiresRegistration: false
    },
    {
        id: "power_of_attorney",
        name: "Power of Attorney",
        stampRange: [100, 1000],
        description: "For authorizing someone to act on your behalf",
        requiresRegistration: true,
        registrationNote: "Registration required for property transactions"
    },
    {
        id: "education_gap_affidavit",
        name: "Education Gap Affidavit",
        stampRange: [10, 20],
        description: "For explaining gaps in educational history",
        requiresRegistration: false
    },
    {
        id: "indemnity_bond",
        name: "Indemnity Bond",
        stampRange: [100, 500],
        description: "For compensation against potential losses",
        requiresRegistration: false
    },
    {
        id: "legal_heir_certificate",
        name: "Legal Heir Certificate",
        stampRange: [50, 100],
        description: "For establishing inheritance rights",
        requiresRegistration: false
    },
    {
        id: "court_evidence_affidavit",
        name: "Court Evidence Affidavit",
        stampRange: [10, 100],
        description: "For submitting evidence in court",
        requiresRegistration: false
    },
    {
        id: "other",
        name: "Other Document",
        stampRange: [10, 100],
        description: "For documents not listed above",
        requiresRegistration: false
    }
]

export function NotaryBookingDialog({ serviceType }: { serviceType: 'digital' | 'physical' }) {
    const [open, setOpen] = useState<boolean>(false)
    const [bookingReceipt, setBookingReceipt] = useState<BookingReceipt | null>(null)
    const [showReceipt, setShowReceipt] = useState<boolean>(false)
    const { toast } = useToast()
    const receiptRef = useRef<HTMLDivElement>(null)
    const [razorpayLoaded, setRazorpayLoaded] = useState<boolean>(false)

    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        documentType: 'general_affidavit',
        stampValue: 10,
        documentDescription: '',
        deliveryAddress: serviceType === 'physical' ? '' : undefined,
        specialInstructions: '',
        requiresRegistration: false
    })

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    useEffect(() => {
        const script = document.createElement("script")
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        script.async = true
        script.onload = () => setRazorpayLoaded(true)
        document.body.appendChild(script)
        return () => {
            document.body.removeChild(script)
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const handleDocumentTypeChange = (value: string): void => {
        const selectedDoc = DOCUMENT_TYPES.find(doc => doc.id === value) || DOCUMENT_TYPES[0]
        setFormData(prev => ({
            ...prev,
            documentType: value,
            stampValue: selectedDoc.stampRange[0],
            requiresRegistration: selectedDoc.requiresRegistration
        }))
    }

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {}

        if (!formData.name.trim()) newErrors.name = 'Name is required'
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format'
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone is required'
        } else if (!/^[0-9]{10}$/.test(formData.phone)) {
            newErrors.phone = 'Invalid phone number'
        }
        if (!formData.documentDescription.trim()) newErrors.documentDescription = 'Description is required'
        if (serviceType === 'physical' && !formData.deliveryAddress?.trim()) {
            newErrors.deliveryAddress = 'Delivery address is required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);

        try {
            const selectedDoc = DOCUMENT_TYPES.find(doc => doc.id === formData.documentType) || DOCUMENT_TYPES[0];
            const serviceFee = serviceType === 'digital' ? 399 : 799;

            const profileRaw = localStorage.getItem("userProfile");
            const profile = profileRaw ? JSON.parse(profileRaw) : {};

            setOpen(false);
            await new Promise(resolve => setTimeout(resolve, 50));

            const response = await fetch('https://nyaymitra-backend-document-production.up.railway.app/api/documents/create-notary-booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    serviceType,
                    userId: profile.userId,
                    userEmail: profile.email
                })
            });

            if (!response.ok) {
                throw new Error('Booking failed');
            }

            const data = await response.json();

            const options = {
                key: data.key,
                amount: data.amount,
                currency: data.currency,
                name: "NyayMitra",
                description: "Notary Service Booking",
                order_id: data.orderId,
                handler: async function (response: any) {
                    try {
                        const verifyRes = await fetch('https://nyaymitra-backend-document-production.up.railway.app/api/payment/verify', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                documentId: data.serviceOrderId
                            })
                        });

                        if (!verifyRes.ok) {
                            throw new Error('Payment verification failed');
                        }

                        const receiptData: BookingReceipt = {
                            orderId: data.orderId,
                            paymentId: response.razorpay_payment_id,
                            serviceOrderId: data.serviceOrderId,
                            documentType: selectedDoc.name,
                            stampValue: formData.stampValue,
                            serviceFee: serviceFee,
                            totalAmount: serviceFee + formData.stampValue + (serviceType === 'physical' ? 100 : 0),
                            serviceType,
                            deliveryFee: serviceType === 'physical' ? 100 : 0,
                            deliveryMethod: serviceType === 'digital' ? 'Email' : 'Courier',
                            customerName: formData.name,
                            email: formData.email,
                            phone: formData.phone,
                            date: new Date().toLocaleString(),
                            status: 'Completed'
                        };

                        setBookingReceipt(receiptData);
                        setShowReceipt(true);

                        toast({
                            title: "Payment Successful",
                            description: "Your notary booking has been confirmed.",
                            variant: "default",
                        });

                        setFormData({
                            name: '',
                            email: '',
                            phone: '',
                            documentType: 'general_affidavit',
                            stampValue: 10,
                            documentDescription: '',
                            deliveryAddress: serviceType === 'physical' ? '' : undefined,
                            specialInstructions: '',
                            requiresRegistration: false
                        });
                    } catch (error) {
                        console.error('Verification error:', error);
                        toast({
                            title: "Verification Failed",
                            description: "Payment was successful but verification failed. Please contact support.",
                            variant: "destructive",
                        });
                        setOpen(true);
                    }
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone
                },
                theme: {
                    color: "#c9a84c"
                },
                modal: {
                    ondismiss: () => {
                        setOpen(true);
                        toast({
                            title: "Payment Cancelled",
                            description: "You can try again if you want to proceed.",
                            variant: "default",
                        });
                    }
                }
            };

            const razor = new (window as any).Razorpay(options);
            razor.open();

            razor.on('payment.failed', function (response: any) {
                toast({
                    title: "Payment Failed",
                    description: response.error.description,
                    variant: "destructive",
                });
                setOpen(true);
            });

        } catch (error) {
            console.error('Booking error:', error);
            toast({
                title: "Booking Failed",
                description: "There was an error processing your request. Please try again.",
                variant: "destructive",
            });
            setOpen(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const calculateTotal = (): number => {
        const serviceFee = serviceType === 'digital' ? 399 : 799
        const deliveryFee = serviceType === 'physical' ? 100 : 0
        return serviceFee + formData.stampValue + deliveryFee
    }

    const handlePrintReceipt = (): void => {
        if (receiptRef.current) {
            const printWindow = window.open('', '', 'width=800,height=600')
            if (printWindow) {
                printWindow.document.write(`
                    <html>
                        <head>
                            <title>Payment Receipt - NyayMitra</title>
                            <style>
                                body { font-family: 'Georgia', serif; padding: 40px; background: #fffefb; }
                                .receipt-container { max-width: 600px; margin: 0 auto; border: 1px solid #e0ddd8; border-radius: 14px; padding: 2rem; background: #fffefb; }
                                .header { text-align: center; margin-bottom: 1.5rem; }
                                .success-icon { color: #15803d; margin-bottom: 0.5rem; }
                                .section { margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid #e0ddd8; }
                                .section-title { font-size: 1rem; font-weight: 600; margin-bottom: 1rem; color: #8b6d22; font-family: 'Courier New', monospace; letter-spacing: 0.05em; }
                                .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
                                .flex-between { display: flex; justify-content: space-between; }
                                .text-muted { color: #8a8680; font-size: 0.75rem; }
                                .total { font-weight: bold; font-size: 1.125rem; color: #8b6d22; }
                                .footer { margin-top: 2rem; text-align: center; color: #8a8680; font-size: 0.75rem; }
                                h1 { font-family: 'Georgia', serif; font-size: 1.5rem; color: #0c0b09; }
                            </style>
                        </head>
                        <body>
                            <div class="receipt-container">
                                <div class="header">
                                    <div class="success-icon">✓</div>
                                    <h1>Payment Successful</h1>
                                </div>
                                ${receiptRef.current?.innerHTML || ''}
                                <div class="footer">
                                    <p>Thank you for choosing NyayMitra</p>
                                    <p>Receipt generated on ${new Date().toLocaleString()}</p>
                                </div>
                            </div>
                            <script>
                                window.onload = function() {
                                    setTimeout(function() {
                                        window.print();
                                        window.close();
                                    }, 200);
                                }
                            </script>
                        </body>
                    </html>
                `)
                printWindow.document.close()
            }
        }
    }

    const selectedDoc = DOCUMENT_TYPES.find(doc => doc.id === formData.documentType) || DOCUMENT_TYPES[0]

    return (
        <TooltipProvider>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <button
                        className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white text-sm font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
                    >
                        <FileText className="h-4 w-4" />
                        Book {serviceType === 'digital' ? 'Digital' : 'Physical'} Notarization
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[700px] w-[calc(100%-32px)] mx-auto rounded-2xl bg-white border border-gray-200 shadow-xl p-0 overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Header with gold accent */}
                        <div className="relative">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600" />
                            <DialogHeader className="px-6 pt-6 pb-4">
                                <DialogTitle className="font-serif text-2xl text-gray-900">
                                    {serviceType === 'digital' ? 'Digital' : 'Physical'} Notarization Booking
                                </DialogTitle>
                                <p className="text-sm text-gray-500 mt-1">
                                    Complete this form to get your document notarized
                                </p>
                            </DialogHeader>
                        </div>

                        <form onSubmit={handleSubmit} className="px-6 pb-6 max-h-[70vh] overflow-y-auto space-y-5">
                            {/* Personal Information Section */}
                            <div className="space-y-4 p-4 bg-amber-50/40 rounded-xl border border-amber-100">
                                <h3 className="flex items-center text-sm font-semibold text-gray-800">
                                    <User className="h-4 w-4 mr-2 text-amber-600" />
                                    Personal Information
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-sm text-gray-700">Full Name *</Label>
                                        <div className="relative">
                                            <Input
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Enter your full name"
                                                className="pl-9 border-gray-200 focus:ring-amber-400 focus:border-amber-400 rounded-lg"
                                            />
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        </div>
                                        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-sm text-gray-700">Email *</Label>
                                        <div className="relative">
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="you@example.com"
                                                className="pl-9 border-gray-200 focus:ring-amber-400 focus:border-amber-400 rounded-lg"
                                            />
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        </div>
                                        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-sm text-gray-700">Phone Number *</Label>
                                        <div className="relative">
                                            <Input
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="9876543210"
                                                maxLength={10}
                                                className="pl-9 border-gray-200 focus:ring-amber-400 focus:border-amber-400 rounded-lg"
                                            />
                                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        </div>
                                        {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Document Information Section */}
                            <div className="space-y-4 p-4 bg-amber-50/40 rounded-xl border border-amber-100">
                                <h3 className="flex items-center text-sm font-semibold text-gray-800">
                                    <FileText className="h-4 w-4 mr-2 text-amber-600" />
                                    Document Details
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="documentType" className="text-sm text-gray-700">Document Type *</Label>
                                        <Select value={formData.documentType} onValueChange={handleDocumentTypeChange}>
                                            <SelectTrigger className="w-full border-gray-200 rounded-lg">
                                                <SelectValue placeholder="Select document type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {DOCUMENT_TYPES.map((doc) => (
                                                    <SelectItem key={doc.id} value={doc.id}>
                                                        <div className="flex items-center">
                                                            {doc.name}
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <Info className="h-3 w-3 ml-1 text-gray-400" />
                                                                </TooltipTrigger>
                                                                <TooltipContent side="right" className="max-w-[300px] bg-white shadow-lg border border-gray-200">
                                                                    <p className="font-medium">{doc.name}</p>
                                                                    <p className="text-sm mt-1">{doc.description}</p>
                                                                    <p className="text-sm font-medium mt-2">Stamp Duty: ₹{doc.stampRange[0]}-₹{doc.stampRange[1]}</p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="stampValue" className="flex items-center gap-1 text-sm text-gray-700">
                                            Stamp Value (₹)
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Info className="h-3 w-3 text-gray-400 cursor-help" />
                                                </TooltipTrigger>
                                                <TooltipContent className="bg-white shadow-lg border border-gray-200">
                                                    <p>Standard range: ₹{selectedDoc.stampRange[0]} - ₹{selectedDoc.stampRange[1]}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </Label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                                            <Input
                                                id="stampValue"
                                                name="stampValue"
                                                type="number"
                                                min={selectedDoc.stampRange[0]}
                                                max={selectedDoc.stampRange[1]}
                                                value={formData.stampValue}
                                                onChange={(e) => {
                                                    const numValue = Number(e.target.value);
                                                    const value = isNaN(numValue) ? selectedDoc.stampRange[0] : Math.max(selectedDoc.stampRange[0], Math.min(selectedDoc.stampRange[1], numValue));
                                                    setFormData(prev => ({ ...prev, stampValue: value }));
                                                }}
                                                className="pl-10 border-gray-200 rounded-lg"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-400">Range: ₹{selectedDoc.stampRange[0]} - ₹{selectedDoc.stampRange[1]}</p>
                                    </div>
                                </div>

                                {formData.requiresRegistration && (
                                    <div className="flex items-start gap-3 p-3 bg-amber-100/50 rounded-lg border border-amber-200">
                                        <Info className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-medium text-amber-800 text-sm">Registration Required</h4>
                                            <p className="text-xs text-amber-700 mt-1">This document type requires additional registration with the sub-registrar office. Our team will guide you.</p>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="documentDescription" className="text-sm text-gray-700">Document Description *</Label>
                                    <Textarea
                                        id="documentDescription"
                                        name="documentDescription"
                                        value={formData.documentDescription}
                                        onChange={handleChange}
                                        placeholder="Describe the document (purpose, parties involved, etc.)"
                                        rows={3}
                                        className="border-gray-200 rounded-lg resize-none"
                                    />
                                    {errors.documentDescription && <p className="text-red-500 text-xs">{errors.documentDescription}</p>}
                                </div>
                            </div>

                            {/* Delivery Section */}
                            {serviceType === 'physical' && (
                                <div className="space-y-4 p-4 bg-amber-50/40 rounded-xl border border-amber-100">
                                    <h3 className="flex items-center text-sm font-semibold text-gray-800">
                                        <MapPin className="h-4 w-4 mr-2 text-amber-600" />
                                        Delivery Information
                                    </h3>
                                    <div className="space-y-2">
                                        <Label htmlFor="deliveryAddress" className="text-sm text-gray-700">Delivery Address *</Label>
                                        <Textarea
                                            id="deliveryAddress"
                                            name="deliveryAddress"
                                            value={formData.deliveryAddress}
                                            onChange={handleChange}
                                            placeholder="Full address with PIN code, city, and state"
                                            rows={3}
                                            className="border-gray-200 rounded-lg resize-none"
                                        />
                                        {errors.deliveryAddress && <p className="text-red-500 text-xs">{errors.deliveryAddress}</p>}
                                    </div>
                                </div>
                            )}

                            {/* Special Instructions */}
                            <div className="space-y-2">
                                <Label htmlFor="specialInstructions" className="text-sm text-gray-700">Special Instructions (Optional)</Label>
                                <Textarea
                                    id="specialInstructions"
                                    name="specialInstructions"
                                    value={formData.specialInstructions}
                                    onChange={handleChange}
                                    placeholder="Any urgent processing requirements or specific notary needs"
                                    rows={2}
                                    className="border-gray-200 rounded-lg resize-none"
                                />
                            </div>

                            {/* Payment Summary */}
                            <div className="bg-amber-50 p-5 rounded-xl border border-amber-200">
                                <h3 className="text-base font-semibold mb-3 text-gray-800 flex items-center gap-2">
                                    <Scale className="h-4 w-4 text-amber-600" />
                                    Payment Summary
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Service Fee:</span>
                                        <span className="font-medium text-amber-700">₹{serviceType === 'digital' ? '399' : '799'}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Stamp Duty:</span>
                                        <span className="font-medium text-amber-700">₹{formData.stampValue}</span>
                                    </div>
                                    {serviceType === 'physical' && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Delivery Charges:</span>
                                            <span className="font-medium text-amber-700">₹100</span>
                                        </div>
                                    )}
                                    <div className="border-t border-amber-200 my-2"></div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-gray-800">Total Amount:</span>
                                        <span className="font-bold text-lg text-amber-700">₹{calculateTotal()}</span>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-2">
                                        {serviceType === 'digital'
                                            ? '* Digital documents will be emailed within 24 hours'
                                            : '* Physical documents will be delivered within 3-5 business days'}
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={isSubmitting || !razorpayLoaded}
                                className="w-full py-3 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-semibold rounded-lg transition-all"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Processing...
                                    </>
                                ) : !razorpayLoaded ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Loading Payment...
                                    </>
                                ) : (
                                    <>
                                        <FileText className="h-4 w-4 mr-2" />
                                        Confirm Booking (₹{calculateTotal()})
                                    </>
                                )}
                            </Button>
                        </form>
                    </motion.div>
                </DialogContent>
            </Dialog>

            {/* Payment Receipt Dialog */}
            <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
                <DialogContent className="max-w-[95vw] sm:max-w-[500px] rounded-2xl bg-white border border-gray-200 p-0 overflow-hidden">
                    <div ref={receiptRef} className="p-6">
                        <div className="text-center mb-6">
                            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
                                <CheckCircle className="h-6 w-6 text-green-600" />
                            </div>
                            <h3 className="font-serif text-xl font-semibold text-gray-900">Payment Successful</h3>
                            <p className="text-sm text-gray-500 mt-1">Your notary booking is confirmed</p>
                        </div>

                        {bookingReceipt && (
                            <div className="space-y-5">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-xs text-gray-400">Order ID</p>
                                        <p className="text-sm font-medium text-gray-800 truncate">{bookingReceipt.orderId}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">Date</p>
                                        <p className="text-sm font-medium text-gray-800">{bookingReceipt.date}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-xs text-gray-400">Status</p>
                                        <Badge className="mt-1 bg-green-100 text-green-700 border-green-200">Completed</Badge>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-4">
                                    <h4 className="text-sm font-semibold text-gray-800 mb-3">Document Details</h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <p className="text-xs text-gray-400">Type</p>
                                            <p className="text-sm text-gray-700">{bookingReceipt.documentType}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400">Service</p>
                                            <p className="text-sm text-gray-700 capitalize">{bookingReceipt.serviceType}</p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="text-xs text-gray-400">Delivery</p>
                                            <p className="text-sm text-gray-700">{bookingReceipt.deliveryMethod}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-amber-50 rounded-xl p-4 space-y-2">
                                    <h4 className="text-sm font-semibold text-gray-800">Payment Breakdown</h4>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Service Fee</span>
                                        <span className="text-sm text-gray-800">₹{bookingReceipt.serviceFee}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Stamp Duty</span>
                                        <span className="text-sm text-gray-800">₹{bookingReceipt.stampValue}</span>
                                    </div>
                                    {bookingReceipt.serviceType === 'physical' && (
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Delivery</span>
                                            <span className="text-sm text-gray-800">₹{bookingReceipt.deliveryFee}</span>
                                        </div>
                                    )}
                                    <div className="border-t border-amber-200 my-2"></div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-gray-800">Total</span>
                                        <span className="font-bold text-amber-700">₹{bookingReceipt.totalAmount}</span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-4">
                                    <h4 className="text-sm font-semibold text-gray-800 mb-3">Customer Information</h4>
                                    <div className="space-y-2">
                                        <div>
                                            <p className="text-xs text-gray-400">Name</p>
                                            <p className="text-sm text-gray-700">{bookingReceipt.customerName}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400">Email</p>
                                            <p className="text-sm text-gray-700 break-all">{bookingReceipt.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400">Phone</p>
                                            <p className="text-sm text-gray-700">{bookingReceipt.phone}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                    <div className="flex items-start gap-2">
                                        <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <h4 className="text-sm font-medium text-blue-800">Next Steps</h4>
                                            <p className="text-xs text-blue-700 mt-1">
                                                {bookingReceipt.serviceType === 'digital'
                                                    ? 'Our notary will contact you within 1 hour. Your digitally notarized document will be emailed within 24 hours.'
                                                    : 'Our notary will contact you within 1 hour. Your physical document will be dispatched via courier within 24 hours.'}
                                            </p>
                                            <p className="text-xs font-medium text-blue-700 mt-2">
                                                For queries: nyaymitra.ai@gmail.com | +91 7970596183
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                            <Button variant="outline" size="sm" onClick={handlePrintReceipt} className="gap-1.5 border-gray-200">
                                <Printer className="h-3.5 w-3.5" />
                                Print
                            </Button>
                            <Button size="sm" onClick={() => { setShowReceipt(false); setOpen(false); }} className="bg-amber-600 hover:bg-amber-700">
                                Done
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </TooltipProvider>
    )
}