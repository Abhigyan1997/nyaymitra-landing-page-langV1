"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
    Clock,
    User,
    Phone,
    Mail,
    Calendar,
    ArrowRight,
    X,
    Loader2,
} from "lucide-react"
import { useRouter } from "next/navigation"
import axios, { AxiosError } from "axios"
import { toast } from "@/components/ui/use-toast"

interface BookingResponse {
    bookingId: string
    razorpayOrderId?: string
}

interface VerifyResponse {
    success: boolean
    verified: boolean
    bookingId: string
}

interface ApiError {
    message: string
}

export function PriorityBookingDialog() {
    const [open, setOpen] = useState(false)
    const [step, setStep] = useState<number>(1)
    const [loading, setLoading] = useState(false)
    const [paymentStatus, setPaymentStatus] = useState<
        "pending" | "success" | "failed"
    >("pending")
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        issueType: "",
        preferredDate: "",
        preferredTime: "",
        description: "",
        urgency: "high",
    })
    const router = useRouter()
    const API_BASE_URL = "https://nyaymitra-backend-document-production.up.railway.app/api"

    const issueTypes = [
        "Property Dispute",
        "Family Matter",
        "Criminal Case",
        "Employment Issue",
        "Consumer Complaint",
        "Contract Review",
        "Other Legal Matter",
    ]

    const timeSlots = [
        "9:00 AM - 11:00 AM",
        "11:00 AM - 1:00 PM",
        "2:00 PM - 4:00 PM",
        "4:00 PM - 6:00 PM",
        "6:00 PM - 8:00 PM",
    ]

    const calculateTotalAmount = () => 99 + 99 // ₹99 base + ₹99 priority fee

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const resetForm = () => {
        setStep(1)
        setPaymentStatus("pending")
        setFormData({
            name: "",
            email: "",
            phone: "",
            issueType: "",
            preferredDate: "",
            preferredTime: "",
            description: "",
            urgency: "high",
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (step === 1) {
            // Basic validation
            if (
                !formData.name ||
                !formData.email ||
                !formData.phone ||
                !formData.issueType ||
                !formData.preferredDate ||
                !formData.preferredTime
            ) {
                toast({ title: "Please fill in all required fields", variant: "destructive" })
                return
            }
            setStep(2)
            return
        }

        // Step 2 = confirm & pay
        setLoading(true)

        try {
            // Create booking
            const bookingRes = await axios.post<BookingResponse>(
                `${API_BASE_URL}/documents/priority-bookings`,
                {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    issueType: formData.issueType,
                    preferredDate: formData.preferredDate,
                    preferredTime: formData.preferredTime,
                    description: formData.description,
                    urgency: formData.urgency,
                }
            )

            const bookingId = bookingRes.data?.bookingId

            if (!bookingId) {
                throw new Error("Booking ID missing from response")
            }

            // Simulate payment
            await new Promise((r) => setTimeout(r, 1500))

            // Simulate verify payment
            const verifyRes = await axios.post<VerifyResponse>(
                `${API_BASE_URL}/payment/verify`,
                {
                    bookingId,
                    amount: calculateTotalAmount(),
                    paymentId: `mock_pay_${Date.now()}`,
                }
            )

            if (verifyRes.data.success) {
                setPaymentStatus("success")
                toast({
                    title: "Booking confirmed 🎉",
                    description: "Your priority consultation is booked.",
                })
                router.push(`/booking/success?id=${bookingId}`)
            } else {
                setPaymentStatus("failed")
                toast({
                    title: "Payment failed",
                    description: "Please try again or contact support",
                    variant: "destructive",
                })
            }
        } catch (err) {
            setPaymentStatus("failed")
            const message =
                axios.isAxiosError<ApiError>(err) ? err.response?.data.message : err instanceof Error ? err.message : "Error"
            toast({ title: "Error", description: message, variant: "destructive" })
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 border-0"
            >
                <Clock className="h-4 w-4 mr-2" />
                Book Now
            </Button>

            <Dialog
                open={open}
                onOpenChange={(o) => {
                    if (!o) resetForm()
                    setOpen(o)
                }}
            >
                <DialogContent className="sm:max-w-[600px] bg-gray-900">
                    <DialogHeader>
                        <DialogTitle className="flex items-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">
                            <Clock className="h-6 w-6 mr-2" />
                            Priority Legal Consultation
                        </DialogTitle>
                        <DialogDescription className="text-gray-300">
                            {step === 1
                                ? "Enter your details"
                                : paymentStatus === "pending"
                                    ? "Review and confirm payment"
                                    : paymentStatus === "success"
                                        ? "Success!"
                                        : "Failed"}
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <AnimatePresence mode="wait">
                            {step === 1 ? (
                                // Step 1 Form
                                <motion.div
                                    key="step1"
                                    initial={{ x: -10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: 10, opacity: 0 }}
                                >
                                    <div className="space-y-4">
                                        {/* Name */}
                                        <div>
                                            <Label>Name *</Label>
                                            <Input name="name" value={formData.name} onChange={handleChange} />
                                        </div>
                                        {/* Email */}
                                        <div>
                                            <Label>Email *</Label>
                                            <Input name="email" value={formData.email} onChange={handleChange} />
                                        </div>
                                        {/* Phone */}
                                        <div>
                                            <Label>Phone *</Label>
                                            <Input name="phone" value={formData.phone} onChange={handleChange} />
                                        </div>
                                        {/* Issue Type */}
                                        <div>
                                            <Label>Issue Type *</Label>
                                            <Select onValueChange={(v) => handleSelectChange("issueType", v)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select issue type">{formData.issueType}</SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {issueTypes.map((t) => (
                                                        <SelectItem key={t} value={t}>{t}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        {/* Preferred Date */}
                                        <div>
                                            <Label>Preferred Date *</Label>
                                            <Input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} />
                                        </div>
                                        {/* Preferred Time */}
                                        <div>
                                            <Label>Preferred Time *</Label>
                                            <Select onValueChange={(v) => handleSelectChange("preferredTime", v)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select time">{formData.preferredTime}</SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {timeSlots.map((s) => (
                                                        <SelectItem key={s} value={s}>{s}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        {/* Urgency */}
                                        <div>
                                            <Label>Urgency</Label>
                                            <Select onValueChange={(v) => handleSelectChange("urgency", v)}>
                                                <SelectTrigger>
                                                    <SelectValue>{formData.urgency}</SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="high">High (Today)</SelectItem>
                                                    <SelectItem value="medium">Medium (This Week)</SelectItem>
                                                    <SelectItem value="low">Low (Whenever)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        {/* Description */}
                                        <div>
                                            <Label>Description (Optional)</Label>
                                            <Textarea name="description" value={formData.description} onChange={handleChange} />
                                        </div>
                                    </div>
                                </motion.div>
                            ) : paymentStatus === "pending" ? (
                                // Step 2 Summary
                                <motion.div
                                    key="step2"
                                    initial={{ x: 10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -10, opacity: 0 }}
                                >
                                    <div className="space-y-4">
                                        <p><strong>Name:</strong> {formData.name}</p>
                                        <p><strong>Email:</strong> {formData.email}</p>
                                        <p><strong>Phone:</strong> {formData.phone}</p>
                                        <p><strong>Issue:</strong> {formData.issueType}</p>
                                        <p><strong>Date:</strong> {formData.preferredDate}</p>
                                        <p><strong>Time:</strong> {formData.preferredTime}</p>
                                        <p><strong>Urgency:</strong> {formData.urgency}</p>
                                        {formData.description && <p><strong>Description:</strong> {formData.description}</p>}
                                        <hr />
                                        <p><strong>Total:</strong> ₹{calculateTotalAmount()}</p>
                                    </div>
                                </motion.div>
                            ) : paymentStatus === "success" ? (
                                // Step 3 Success
                                <motion.div
                                    key="success"
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-center py-8 space-y-4"
                                >
                                    <Clock className="mx-auto h-12 w-12 text-green-400" />
                                    <p className="text-lg font-semibold">Booking Confirmed!</p>
                                    <p>Our lawyer will reach out to you shortly.</p>
                                </motion.div>
                            ) : (
                                // Step 3 Failure
                                <motion.div
                                    key="failed"
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-center py-8 space-y-4"
                                >
                                    <X className="mx-auto h-12 w-12 text-red-400" />
                                    <p className="text-lg font-semibold">Payment Failed</p>
                                    <p>Please try again or contact support.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {paymentStatus === "pending" && (
                            <div className="flex justify-between gap-4 mt-6">
                                {step === 2 && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setStep(1)}
                                        disabled={loading}
                                        className="flex-1"
                                    >
                                        <X className="h-4 w-4 mr-2" />
                                        Back
                                    </Button>
                                )}
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    style={{ zIndex: 9999, pointerEvents: "auto" }}
                                    className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 border-0"
                                >

                                    {loading ? (
                                        <>
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            Processing...
                                        </>
                                    ) : step === 1 ? (
                                        "Continue"
                                    ) : (
                                        `Confirm & Pay ₹${calculateTotalAmount()}`
                                    )}
                                </Button>
                            </div>
                        )}
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}
