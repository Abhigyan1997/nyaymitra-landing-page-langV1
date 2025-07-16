"use client"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Info, FileText, User, Mail, Phone, MapPin, AlertCircle, CheckCircle, Printer, X } from "lucide-react"
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

            // Close the dialog before opening Razorpay
            setOpen(false);

            // Small delay to ensure dialog is fully closed
            await new Promise(resolve => setTimeout(resolve, 50));

            const response = await fetch('https://nyaymitra-backend-document.onrender.com/api/documents/create-notary-booking', {
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
                        const verifyRes = await fetch('https://nyaymitra-backend-document.onrender.com/api/payment/verify', {
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
                            totalAmount: serviceFee + formData.stampValue,
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

                        // Reset form
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
                        setOpen(true); // Reopen the form if verification fails
                    }
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone
                },
                theme: {
                    color: "#0ea5e9"
                },
                modal: {
                    ondismiss: () => {
                        // Reopen the dialog if payment is cancelled
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
                setOpen(true); // Reopen the form on failure
            });

        } catch (error) {
            console.error('Booking error:', error);
            toast({
                title: "Booking Failed",
                description: "There was an error processing your request. Please try again.",
                variant: "destructive",
            });
            setOpen(true); // Reopen the form on error
        } finally {
            setIsSubmitting(false);
        }
    };
    const calculateTotal = (): number => {
        const serviceFee = serviceType === 'digital' ? 399 : 799
        const deliveryFee = serviceType === 'physical' ? 100 : 0 // Fixed delivery charge
        return serviceFee + formData.stampValue + deliveryFee
    }

    const handlePrintReceipt = (): void => {
        if (receiptRef.current) {
            const printWindow = window.open('', '', 'width=800,height=600')
            if (printWindow) {
                printWindow.document.write(`
                    <html>
                        <head>
                            <title>Payment Receipt</title>
                            <style>
                                body { font-family: Arial, sans-serif; padding: 20px; }
                                .receipt-container { max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 0.5rem; padding: 2rem; }
                                .header { display: flex; align-items: center; margin-bottom: 1.5rem; }
                                .success-icon { color: #10B981; margin-right: 0.75rem; }
                                .section { margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid #e2e8f0; }
                                .section-title { font-size: 1.125rem; font-weight: 600; margin-bottom: 1rem; }
                                .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
                                .flex-between { display: flex; justify-content: space-between; }
                                .text-muted { color: #64748b; font-size: 0.875rem; }
                                .total { font-weight: bold; font-size: 1.125rem; color: #1e40af; }
                                .footer { margin-top: 2rem; text-align: center; color: #64748b; font-size: 0.875rem; }
                                .badge { display: inline-flex; align-items: center; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; background-color: #d1fae5; color: #065f46; }
                                .note { background-color: #f0f9ff; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem; }
                            </style>
                        </head>
                        <body>
                            <div class="receipt-container">
                                <div class="header">
                                    <CheckCircle class="success-icon" size={40} />
                                    <h1 style="font-size: 1.5rem; font-weight: 700; color: #10B981;">Payment Successful</h1>
                                </div>
                                ${receiptRef.current.innerHTML}
                                <div class="footer">
                                    <p>Thank you for using NyayMitra services</p>
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
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg transition-all duration-300 hover:shadow-xl"
                        size="lg"
                    >
                        <FileText className="h-5 w-5 mr-2" />
                        Book {serviceType === 'digital' ? 'Digital' : 'Physical'} Notarization
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[700px] rounded-lg overflow-hidden">
                    <TooltipProvider>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <DialogHeader className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-10" />
                                <DialogTitle className="text-2xl font-bold text-center relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                                    {serviceType === 'digital' ? 'Digital' : 'Physical'} Notarization Booking
                                </DialogTitle>
                                <p className="text-sm text-center text-gray-500 mt-2">
                                    Complete this form to get your document notarized
                                </p>
                            </DialogHeader>

                            <form onSubmit={handleSubmit} className="grid gap-5 py-4 px-1 max-h-[80vh] overflow-y-auto">
                                {errors.form && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 rounded-md border border-red-200 dark:border-red-800"
                                    >
                                        <AlertCircle className="h-5 w-5" />
                                        <span>{errors.form}</span>
                                    </motion.div>
                                )}

                                {/* Personal Information Section */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
                                >
                                    <h3 className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200">
                                        <User className="h-5 w-5 mr-2 text-blue-500" />
                                        Personal Information
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="flex items-center gap-1">
                                                Full Name*
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="John Doe"
                                                    className="pl-9"
                                                />
                                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            </div>
                                            {errors.name && (
                                                <p className="text-red-500 text-xs flex items-center gap-1">
                                                    <AlertCircle className="h-3 w-3" />
                                                    {errors.name}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email*</Label>
                                            <div className="relative">
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="your@email.com"
                                                    className="pl-9"
                                                />
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            </div>
                                            {errors.email && (
                                                <p className="text-red-500 text-xs flex items-center gap-1">
                                                    <AlertCircle className="h-3 w-3" />
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number*</Label>
                                            <div className="relative">
                                                <Input
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="9876543210"
                                                    maxLength={10}
                                                    className="pl-9"
                                                />
                                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            </div>
                                            {errors.phone && (
                                                <p className="text-red-500 text-xs flex items-center gap-1">
                                                    <AlertCircle className="h-3 w-3" />
                                                    {errors.phone}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Document Information Section */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
                                >
                                    <h3 className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200">
                                        <FileText className="h-5 w-5 mr-2 text-blue-500" />
                                        Document Details
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="documentType">Document Type*</Label>
                                            <Select
                                                value={formData.documentType}
                                                onValueChange={handleDocumentTypeChange}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select document type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {DOCUMENT_TYPES.map((doc) => (
                                                        <SelectItem key={doc.id} value={doc.id}>
                                                            <div className="flex items-center">
                                                                {doc.name}
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <Info className="h-4 w-4 ml-2 text-gray-500 hover:text-gray-700" />
                                                                    </TooltipTrigger>
                                                                    <TooltipContent side="right" className="max-w-[300px] bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
                                                                        <p className="font-medium">{doc.name}</p>
                                                                        <p className="text-sm mt-1">{doc.description}</p>
                                                                        <p className="text-sm font-medium mt-2">
                                                                            Stamp Duty: ₹{doc.stampRange[0]}-₹{doc.stampRange[1]}
                                                                        </p>
                                                                        {doc.requiresRegistration && (
                                                                            <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
                                                                                * Requires registration for property documents
                                                                            </p>
                                                                        )}
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </div>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="stampValue" className="flex items-center gap-1">
                                                Stamp Value (₹)
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Info className="h-4 w-4 text-gray-500 hover:text-gray-700 cursor-help" />
                                                    </TooltipTrigger>
                                                    <TooltipContent className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
                                                        <p>Standard value: ₹{selectedDoc.stampRange[0]}-₹{selectedDoc.stampRange[1]}</p>
                                                        {selectedDoc.requiresRegistration && (
                                                            <p className="text-yellow-600 dark:text-yellow-400 mt-1">
                                                                * Additional registration fees may apply
                                                            </p>
                                                        )}
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
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                        const numValue = Number(e.target.value);
                                                        const value = isNaN(numValue)
                                                            ? selectedDoc.stampRange[0]
                                                            : Math.max(
                                                                selectedDoc.stampRange[0],
                                                                Math.min(selectedDoc.stampRange[1], numValue)
                                                            );
                                                        setFormData(prev => ({ ...prev, stampValue: value }));
                                                    }}
                                                    className="pl-10"
                                                />
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Acceptable range: ₹{selectedDoc.stampRange[0]} - ₹{selectedDoc.stampRange[1]}
                                            </p>
                                        </div>
                                    </div>

                                    {formData.requiresRegistration && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-md border border-yellow-200 dark:border-yellow-800/50"
                                        >
                                            <Info className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <h4 className="font-medium text-yellow-700 dark:text-yellow-300">Registration Required</h4>
                                                <p className="text-sm text-yellow-600 dark:text-yellow-400/80 mt-1">
                                                    This document type requires additional registration with the sub-registrar office. Our team will guide you through the process.
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}

                                    <div className="space-y-2">
                                        <Label htmlFor="documentDescription">Document Description*</Label>
                                        <Textarea
                                            id="documentDescription"
                                            name="documentDescription"
                                            value={formData.documentDescription}
                                            onChange={handleChange}
                                            placeholder="Describe the document (purpose, parties involved, etc.)"
                                            rows={4}
                                            className="min-h-[100px]"
                                        />
                                        {errors.documentDescription && (
                                            <p className="text-red-500 text-xs flex items-center gap-1">
                                                <AlertCircle className="h-3 w-3" />
                                                {errors.documentDescription}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>

                                {/* Delivery Section (for physical notarization) */}
                                {serviceType === 'physical' && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
                                    >
                                        <h3 className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200">
                                            <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                                            Delivery Information
                                        </h3>
                                        <div className="space-y-2">
                                            <Label htmlFor="deliveryAddress">Delivery Address*</Label>
                                            <Textarea
                                                id="deliveryAddress"
                                                name="deliveryAddress"
                                                value={formData.deliveryAddress}
                                                onChange={handleChange}
                                                placeholder="Full address with PIN code, city, and state"
                                                rows={3}
                                            />
                                            {errors.deliveryAddress && (
                                                <p className="text-red-500 text-xs flex items-center gap-1">
                                                    <AlertCircle className="h-3 w-3" />
                                                    {errors.deliveryAddress}
                                                </p>
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Special Instructions */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="space-y-2"
                                >
                                    <Label htmlFor="specialInstructions">Special Instructions</Label>
                                    <Textarea
                                        id="specialInstructions"
                                        name="specialInstructions"
                                        value={formData.specialInstructions}
                                        onChange={handleChange}
                                        placeholder="Any urgent processing requirements or specific notary needs"
                                        rows={2}
                                    />
                                </motion.div>

                                {/* Payment Summary */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-5 rounded-lg border border-blue-200 dark:border-blue-800/50 shadow-sm"
                                >
                                    <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Payment Summary</h3>
                                    <div className="space-y-3">
                                        {/* Service Fee - Dynamic based on service type */}
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600 dark:text-gray-300">Service Fee:</span>
                                            <span className="font-medium">
                                                ₹{serviceType === 'digital' ? '399' : '799'}
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Info className="h-4 w-4 ml-1 inline-block text-gray-500" />
                                                    </TooltipTrigger>
                                                    <TooltipContent className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
                                                        <p>
                                                            {serviceType === 'digital'
                                                                ? 'Digital notarization service fee (includes e-stamp and digital certificate)'
                                                                : 'Physical notarization service fee (includes stamp paper and courier charges)'}
                                                        </p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </span>
                                        </div>

                                        {/* Stamp Duty - Dynamic based on document type */}
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600 dark:text-gray-300">Stamp Duty:</span>
                                            <span className="font-medium">
                                                ₹{formData.stampValue}
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Info className="h-4 w-4 ml-1 inline-block text-gray-500" />
                                                    </TooltipTrigger>
                                                    <TooltipContent className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
                                                        <p>
                                                            {selectedDoc.name} requires stamp duty between ₹{selectedDoc.stampRange[0]} and ₹{selectedDoc.stampRange[1]}
                                                        </p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </span>
                                        </div>

                                        {/* Delivery Fee - Fixed for physical service */}
                                        {serviceType === 'physical' && (
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600 dark:text-gray-300">Delivery Charges:</span>
                                                <span className="font-medium">
                                                    ₹100
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Info className="h-4 w-4 ml-1 inline-block text-gray-500" />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Fixed delivery charge for courier service across India</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </span>
                                            </div>
                                        )}

                                        {/* Dynamic Additional Fees */}
                                        {formData.requiresRegistration && (
                                            <div className="flex justify-between items-center text-yellow-700 dark:text-yellow-300">
                                                <span className="flex items-center gap-1">
                                                    Registration Fee*
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Info className="h-4 w-4" />
                                                        </TooltipTrigger>
                                                        <TooltipContent className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
                                                            <p>Registration fees vary by state and document value:</p>
                                                            <ul className="list-disc pl-4 mt-1">
                                                                <li>1% of property value for agreements</li>
                                                                <li>Fixed fees for other documents</li>
                                                            </ul>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </span>
                                                <span>₹1,000 - ₹5,000*</span>
                                            </div>
                                        )}

                                        <div className="border-t border-gray-300 dark:border-gray-700 my-2"></div>

                                        {/* Dynamic Total Calculation */}
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-lg">Total Amount:</span>
                                            <span className="font-bold text-lg text-blue-600 dark:text-blue-400">
                                                ₹{calculateTotal()}
                                                {formData.requiresRegistration && '+'}
                                            </span>
                                        </div>

                                        {/* Conditional Notes */}
                                        <div className="text-xs space-y-1">
                                            {formData.requiresRegistration && (
                                                <p className="text-yellow-600 dark:text-yellow-400">
                                                    * Exact registration fee will be confirmed after document review
                                                </p>
                                            )}
                                            {serviceType === 'digital' && (
                                                <p className="text-gray-500 dark:text-gray-400">
                                                    * Digital documents will be emailed within 24 hours
                                                </p>
                                            )}
                                            {serviceType === 'physical' && (
                                                <p className="text-gray-500 dark:text-gray-400">
                                                    * Physical documents will be delivered within 3-5 business days
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Submit Button */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="mt-4"
                                >
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting || !razorpayLoaded}
                                        className="w-full py-6 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg transition-all duration-300 hover:shadow-xl"
                                        size="lg"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                                Processing Your Request...
                                            </>
                                        ) : !razorpayLoaded ? (
                                            <>
                                                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                                Loading Payment Gateway...
                                            </>
                                        ) : (
                                            <>
                                                <FileText className="h-5 w-5 mr-2" />
                                                Confirm Booking
                                            </>
                                        )}
                                    </Button>
                                </motion.div>
                            </form>
                        </motion.div>
                    </TooltipProvider>
                </DialogContent>
            </Dialog>

            {/* Payment Receipt Dialog */}
            <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
                <DialogContent
                    className="max-w-[95vw] sm:max-w-[500px] rounded-lg p-4 sm:p-6 max-h-[90vh] overflow-y-auto"
                    ref={receiptRef}
                >
                    <DialogHeader className="flex-row items-center justify-between space-y-0 pb-3 sm:pb-4">
                        <div className="flex items-center space-x-2">
                            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
                            <DialogTitle className="text-base sm:text-lg font-bold text-green-600">
                                Payment Successful
                            </DialogTitle>
                        </div>
                        {/* <DialogClose asChild>
                            <Button variant="ghost" size="sm" className="h-7 w-7 sm:h-8 sm:w-8 p-0">
                                <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </Button>
                        </DialogClose> */}
                    </DialogHeader>

                    {bookingReceipt && (
                        <div className="space-y-4 sm:space-y-6">
                            {/* Order Summary */}
                            <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:space-y-0">
                                <div>
                                    <span className="text-xs sm:text-sm text-gray-500">Order ID</span>
                                    <p className="text-xs sm:text-sm font-medium mt-1 truncate">{bookingReceipt.orderId}</p>
                                </div>
                                <div>
                                    <span className="text-xs sm:text-sm text-gray-500">Date</span>
                                    <p className="text-xs sm:text-sm font-medium mt-1">{bookingReceipt.date}</p>
                                </div>
                                <div className="col-span-2">
                                    <span className="text-xs sm:text-sm text-gray-500">Status</span>
                                    <div className="mt-1">
                                        <Badge variant="success" className="text-xs sm:text-sm px-2 py-0.5 sm:px-2 sm:py-1">
                                            {bookingReceipt.status}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            {/* Document Details */}
                            <div className="space-y-2 sm:space-y-3">
                                <h4 className="text-xs sm:text-sm font-semibold text-gray-700">Document Details</h4>
                                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                    <div>
                                        <span className="text-xs sm:text-sm text-gray-500">Type</span>
                                        <p className="text-xs sm:text-sm font-medium mt-1">{bookingReceipt.documentType}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs sm:text-sm text-gray-500">Service</span>
                                        <p className="text-xs sm:text-sm font-medium mt-1 capitalize">{bookingReceipt.serviceType}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="text-xs sm:text-sm text-gray-500">Delivery</span>
                                        <p className="text-xs sm:text-sm font-medium mt-1">{bookingReceipt.deliveryMethod}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Breakdown */}
                            <div className="rounded-lg border p-3 sm:p-4 space-y-2 sm:space-y-3">
                                <h4 className="text-xs sm:text-sm font-semibold text-gray-700">Payment Details</h4>
                                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                    <div>
                                        <span className="text-xs sm:text-sm text-gray-500">Service Fee</span>
                                        <p className="text-xs sm:text-sm mt-1">₹{bookingReceipt.serviceFee}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs sm:text-sm text-gray-500">Stamp Duty</span>
                                        <p className="text-xs sm:text-sm mt-1">₹{bookingReceipt.stampValue}</p>
                                    </div>
                                    {bookingReceipt.serviceType === 'physical' && (
                                        <div>
                                            <span className="text-xs sm:text-sm text-gray-500">Delivery</span>
                                            <p className="text-xs sm:text-sm mt-1">₹{bookingReceipt.deliveryFee}</p>
                                        </div>
                                    )}
                                </div>
                                <div className="border-t border-gray-200 my-1 sm:my-2"></div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs sm:text-sm font-semibold">Total Amount</span>
                                    <span className="text-xs sm:text-sm font-bold text-blue-600">₹{bookingReceipt.totalAmount}</span>
                                </div>
                                <div className="mt-2">
                                    <span className="text-xs sm:text-sm text-gray-500">Payment ID</span>
                                    <p className="text-xs sm:text-sm font-mono mt-1 break-all">{bookingReceipt.paymentId}</p>
                                </div>
                            </div>

                            {/* Customer Info */}
                            <div className="space-y-2 sm:space-y-3">
                                <h4 className="text-xs sm:text-sm font-semibold text-gray-700">Customer Information</h4>
                                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                    <div>
                                        <span className="text-xs sm:text-sm text-gray-500">Name</span>
                                        <p className="text-xs sm:text-sm font-medium mt-1">{bookingReceipt.customerName}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs sm:text-sm text-gray-500">Email</span>
                                        <p className="text-xs sm:text-sm font-medium mt-1 break-all">{bookingReceipt.email}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="text-xs sm:text-sm text-gray-500">Phone</span>
                                        <p className="text-xs sm:text-sm font-medium mt-1">{bookingReceipt.phone}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Important Note */}
                            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-100">
                                <div className="flex items-start gap-2">
                                    <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h4 className="text-xs sm:text-sm font-medium text-blue-700">Next Steps</h4>
                                        <p className="text-xs text-blue-600 mt-1">
                                            {bookingReceipt.serviceType === 'digital'
                                                ? 'Our notary will contact you within 1 hour to verify details and complete the process. Your digitally notarized document will be emailed within 24 hours.'
                                                : 'Our notary will contact you within 1 hour to verify details. Your physical document will be prepared and dispatched via courier within 24 hours.'}
                                        </p>
                                        <p className="text-xs font-medium text-blue-700 mt-2">
                                            For any queries, please contact nyaymitra.ai@gmail.com or call +91 7970596183
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <DialogFooter className="flex-row justify-end gap-2 pt-3 sm:pt-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handlePrintReceipt}
                            className="gap-1.5 text-xs sm:text-sm h-8 sm:h-9 px-3 sm:px-4"
                        >
                            <Printer className="h-3.5 w-3.5" />
                            Print Receipt
                        </Button>
                        <Button
                            size="sm"
                            onClick={() => {
                                setShowReceipt(false)
                                toast({
                                    title: "Booking Confirmed",
                                    description: "Our team will contact you shortly.",
                                })
                            }}
                            className="text-xs sm:text-sm h-8 sm:h-9 px-3 sm:px-4"
                        >
                            Done
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}