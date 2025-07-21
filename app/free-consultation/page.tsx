"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import axios, { AxiosError } from "axios"
import { CheckCircle, Clock, Star, Award, Shield, Video, Phone, MapPin, Scale, Mail, X } from "lucide-react"
import Link from "next/link"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Lawyer {
    consultationModes: {
        video: boolean
        call: boolean
        chat: boolean
        inPerson: boolean
    }
    bankDetails: {
        upiId: string
    }
    isPremium: boolean
    kycStatus: string
    specialization: string[]
    experience: number
    languagesSpoken: string[]
    verifiedByPlatform: boolean
    consultationFee: number
    maxBookingsPerDay: number
    consultationDurationMinutes: number
    status: string
    averageRating: number
    totalReviews: number
    consultationCount: number
    _id: string
    userId: string
    yearsPracticing: number
    barCouncilId: string
    state: string
    city: string
    bio: string
    fullName: string
    userInfo: {
        fullName: string
        profileImage: string | null
    }
}

interface BookingResponse {
    message: string
    booking: {
        notificationStatus: {
            confirmationSent: boolean
            reminderSent: boolean
        }
        isFreeConsultation: boolean
        paymentMode: string
        status: string
        payoutStatus: string
        documents: any[]
        _id: string
        userId: string
        lawyerId: string
        date: string
        slot: string
        mode: string
        amount: number
        createdAt: string
        updatedAt: string
        __v: number
    }
}

// Hardcoded lawyer data from API
const lawyer: Lawyer = {
    consultationModes: {
        video: true,
        call: true,
        chat: false,
        inPerson: false
    },
    bankDetails: {
        upiId: "9097793641@ybl"
    },
    isPremium: false,
    kycStatus: "verified",
    specialization: ["Criminal Law", "Civil Law", "Family Law"],
    experience: 27,
    languagesSpoken: ["English", "Hindi"],
    verifiedByPlatform: true,
    consultationFee: 499,
    maxBookingsPerDay: 5,
    consultationDurationMinutes: 30,
    status: "offline",
    averageRating: 4.5,
    totalReviews: 10,
    consultationCount: 100,
    _id: "685390dce56abd93ac28f4b9",
    userId: "L01JY36VQ7BJ3YT683PTMXSTYJ0", // Added userId
    yearsPracticing: 25,
    barCouncilId: "B/1114/2000",
    state: "Bihar",
    city: "Bhagalpur City",
    bio: "Professional Lawyer with 25 years of experience in Criminal Law",
    fullName: "Bharat Rajak",
    userInfo: {
        fullName: "Bharat Rajak",
        profileImage: null
    }
}
// Available time slots
const timeSlots = [
    "09:00-10:00",
    "10:00-11:00",
    "11:00-12:00",
    "14:00-15:00",
    "15:00-16:00",
    "16:00-17:00"
]

export default function LawyerDetailsPage() {
    const router = useRouter()
    const [isBooking, setIsBooking] = useState(false)
    const [showBookingDialog, setShowBookingDialog] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    const [selectedSlot, setSelectedSlot] = useState("10:00-11:00")
    const [selectedMode, setSelectedMode] = useState("video")
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)
    const [bookingDetails, setBookingDetails] = useState<BookingResponse | null>(null)

    const handleOpenBookingDialog = () => {
        // Check if user is logged in
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
        if (!token) {
            router.push("/auth/login?redirect=/free-consultation")
            toast.warning("Please login to book a consultation")
            return
        }
        setShowBookingDialog(true)
    }

    const handleBookConsultation = async () => {
        if (!selectedDate) {
            toast.warning("Please select a date")
            return
        }

        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
        if (!token) {
            router.push("/auth/login?redirect=/free-consultation")
            toast.warning("Please login to book a consultation")
            return
        }

        setIsBooking(true)

        try {
            const response = await axios.post<BookingResponse>(
                'https://nyaymitra-backend-production.up.railway.app/api/v1/booking/free-consultation/booked',
                {
                    userId: localStorage.getItem('userId'),
                    lawyerId: lawyer.userId,
                    date: selectedDate.toISOString().split('T')[0],
                    slot: selectedSlot,
                    mode: selectedMode
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )

            if (response.data.message === "Free consultation booked") {
                setBookingDetails(response.data)
                setShowBookingDialog(false)
                setShowConfirmationDialog(true)
            }
        } catch (error) {
            console.error("Booking error:", error)
            const axiosError = error as AxiosError<{ message?: string }>
            if (axiosError.response) {
                toast.error(axiosError.response.data.message || "Failed to book consultation")
            } else {
                toast.error("Network error. Please try again.")
            }
        } finally {
            setIsBooking(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            {/* NyayMitra Header */}
            <header className="bg-white dark:bg-gray-900 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <Scale className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                            <span className="text-xl font-bold text-gray-900 dark:text-white">NyayMitra</span>
                        </Link>
                        <div className="flex items-center space-x-4">
                            <Link href="/" passHref>
                                <Button variant="outline" className="hidden sm:flex">
                                    Home
                                </Button>
                            </Link>

                            {/* <Button variant="outline">
                                Sign In
                            </Button> */}
                        </div>
                    </div>
                </div>
            </header>

            <main className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Lawyer Profile */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card className="relative overflow-hidden border-0 shadow-lg">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-30" />
                                <div className="relative z-10">
                                    <CardHeader>
                                        <div className="flex items-start space-x-4">
                                            <Avatar className="h-20 w-20 border-2 border-blue-500/50 shadow-md">
                                                <AvatarImage
                                                    src={lawyer.userInfo.profileImage || "/images/lawyer-avatar.jpg"}
                                                    alt={lawyer.fullName}
                                                />
                                                <AvatarFallback>
                                                    {lawyer.fullName.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                                            {lawyer.fullName}
                                                        </h2>
                                                        <p className="text-blue-600 dark:text-blue-400 font-medium">
                                                            Advocate | {lawyer.yearsPracticing}+ years experience
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                                                        <span className="font-bold text-gray-900 dark:text-white">
                                                            {lawyer.averageRating.toFixed(1)}
                                                        </span>
                                                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                                                            ({lawyer.totalReviews} reviews)
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="mt-2 flex flex-wrap gap-2">
                                                    {lawyer.specialization.map((spec, index) => (
                                                        <Badge
                                                            key={index}
                                                            variant="outline"
                                                            className="border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/10"
                                                        >
                                                            {spec}
                                                        </Badge>
                                                    ))}
                                                    <Badge variant="success" className="ml-2">
                                                        {lawyer.kycStatus === "verified" && "Verified"}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="flex items-center space-x-2">
                                                <Award className="h-5 w-5 text-blue-500" />
                                                <div>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        Experience
                                                    </p>
                                                    <p className="font-medium">
                                                        {lawyer.yearsPracticing}+ years
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <CheckCircle className="h-5 w-5 text-blue-500" />
                                                <div>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        Consultations
                                                    </p>
                                                    <p className="font-medium">
                                                        {lawyer.consultationCount}+ completed
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <MapPin className="h-5 w-5 text-blue-500" />
                                                <div>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        Location
                                                    </p>
                                                    <p className="font-medium">
                                                        {lawyer.city}, {lawyer.state}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Clock className="h-5 w-5 text-blue-500" />
                                                <div>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        Duration
                                                    </p>
                                                    <p className="font-medium">
                                                        {lawyer.consultationDurationMinutes} mins
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                                                About Advocate {lawyer.fullName.split(" ")[0]}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                {lawyer.bio}
                                            </p>
                                        </div>

                                        {/* Consultation Modes */}
                                        <div className="mt-6">
                                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">
                                                Consultation Modes
                                            </h3>
                                            <div className="flex flex-wrap gap-4">
                                                {lawyer.consultationModes.video && (
                                                    <div className="flex items-center space-x-2 p-3 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                                                        <Video className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                        <span>Video Call</span>
                                                    </div>
                                                )}
                                                {lawyer.consultationModes.call && (
                                                    <div className="flex items-center space-x-2 p-3 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                                                        <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                        <span>Phone Call</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </div>
                            </Card>

                            {/* Bar Council Verification */}
                            <Card className="border-0 shadow-lg">
                                <CardHeader>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                        Bar Council Verification
                                    </h3>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                                            <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Bar Council ID: {lawyer.barCouncilId}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                Verified advocate with {lawyer.state} State Bar Council
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Booking Card */}
                        <div className="space-y-6">
                            <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/20 rounded-2xl overflow-hidden">
                                <CardHeader className="text-center py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                                    <h3 className="text-2xl font-extrabold tracking-tight">🎉 Get Your First Legal Consultation FREE!</h3>
                                    <p className="text-sm mt-1 opacity-90">No hidden charges. No commitments.</p>
                                </CardHeader>

                                <CardContent className="space-y-5">
                                    {/* Free Badge & Info */}
                                    <div className="flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-semibold">First Consultation</span>
                                                <Badge variant="success" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-3 py-1">
                                                    100% FREE
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {lawyer.consultationDurationMinutes} min 1-on-1 session
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-400 line-through">₹{lawyer.consultationFee}</p>
                                            <p className="text-3xl font-bold text-green-600 dark:text-green-400">₹0</p>
                                        </div>
                                    </div>

                                    {/* Benefits */}
                                    <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-300 rounded-lg px-4 py-3 space-y-2 text-sm">
                                        <p>✅ Personalized legal advice from an expert.</p>
                                        <p>✅ Discuss your case or legal confusion confidently.</p>
                                        <p>✅ <strong>No fees, no obligations.</strong> First call is on us.</p>
                                    </div>
                                </CardContent>

                                <CardFooter className="flex flex-col space-y-4 pb-6 px-6">
                                    <Button
                                        onClick={handleOpenBookingDialog}
                                        className="w-full py-5 text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-green-500/40 transition-all duration-300 rounded-xl"
                                        size="lg"
                                    >
                                        🚀 Book Free Consultation Now
                                    </Button>
                                    <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                                        Spoken in: {lawyer.languagesSpoken.join(", ")}
                                    </p>
                                </CardFooter>
                            </Card>

                            {/* Languages */}
                            <Card className="border-0 shadow-lg rounded-xl">
                                <CardHeader>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Languages</h3>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {lawyer.languagesSpoken.map((language, index) => (
                                            <Badge key={index} variant="secondary" className="px-3 py-1 rounded-full">
                                                {language}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>

            {/* Booking Dialog */}
            <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
                <DialogContent className="sm:max-w-[600px] w-[95vw] max-w-[95vw] max-h-[90vh] overflow-y-auto rounded-lg p-6">

                    <div className="flex justify-between items-center">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">
                                Book Free Consultation
                            </DialogTitle>
                            <DialogDescription>
                                Schedule your free {lawyer.consultationDurationMinutes}-minute consultation with {lawyer.fullName}
                            </DialogDescription>
                        </DialogHeader>
                        {/* <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowBookingDialog(false)}
                            className="h-8 w-8"
                        >
                            <X className="h-4 w-4" />
                        </Button> */}
                    </div>

                    <div className="grid gap-6 py-4">
                        {/* Responsive grid for date and time */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Date Picker */}
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Select Date</Label>
                                <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    className="rounded-md border w-full"
                                    disabled={(date) => date < new Date()}
                                />
                            </div>

                            {/* Time Slot Selection */}
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Select Time Slot</Label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {timeSlots.map((slot) => (
                                        <Button
                                            key={slot}
                                            variant={selectedSlot === slot ? "default" : "outline"}
                                            onClick={() => setSelectedSlot(slot)}
                                            className="py-2 w-full"
                                        >
                                            {slot}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Consultation Mode */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Consultation Mode</Label>
                            <RadioGroup
                                value={selectedMode}
                                onValueChange={setSelectedMode}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                            >
                                {lawyer.consultationModes.video && (
                                    <div>
                                        <RadioGroupItem value="video" id="video" className="peer sr-only" />
                                        <Label
                                            htmlFor="video"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                        >
                                            <Video className="mb-3 h-6 w-6" />
                                            Video Call
                                        </Label>
                                    </div>
                                )}
                                {lawyer.consultationModes.call && (
                                    <div>
                                        <RadioGroupItem value="call" id="call" className="peer sr-only" />
                                        <Label
                                            htmlFor="call"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                        >
                                            <Phone className="mb-3 h-6 w-6" />
                                            Phone Call
                                        </Label>
                                    </div>
                                )}
                            </RadioGroup>
                        </div>

                        {/* Summary */}
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-300">Consultation Fee:</span>
                                <span className="text-sm font-medium">₹0 (Free)</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-300">Duration:</span>
                                <span className="text-sm font-medium">{lawyer.consultationDurationMinutes} minutes</span>
                            </div>
                            {selectedDate && (
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-300">Date:</span>
                                    <span className="text-sm font-medium">{format(selectedDate, "PPP")}</span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-300">Time:</span>
                                <span className="text-sm font-medium">{selectedSlot}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-300">Mode:</span>
                                <span className="text-sm font-medium capitalize">{selectedMode}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end gap-3">
                        <Button
                            variant="outline"
                            onClick={() => setShowBookingDialog(false)}
                            disabled={isBooking}
                            className="w-full sm:w-auto"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleBookConsultation}
                            disabled={isBooking || !selectedDate}
                            className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
                        >
                            {isBooking ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Booking...
                                </span>
                            ) : (
                                'Confirm Booking'
                            )}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Booking Confirmation Dialog */}
            <Dialog open={showConfirmationDialog} onOpenChange={setShowConfirmationDialog}>
                <DialogContent className="sm:max-w-[600px] w-[95vw] max-w-[95vw] rounded-lg p-6">
                    <div className="flex justify-between items-center">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold flex items-center">
                                <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                                Booking Confirmed!
                            </DialogTitle>
                            <DialogDescription>
                                Your free consultation with {lawyer.fullName} has been scheduled
                            </DialogDescription>
                        </DialogHeader>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowConfirmationDialog(false)}
                            className="h-8 w-8"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {bookingDetails && (
                        <div className="space-y-6 py-4">
                            {/* Booking Summary */}
                            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                                <div className="flex items-start space-x-3">
                                    <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full">
                                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-green-800 dark:text-green-200">
                                            Your booking is confirmed
                                        </h4>
                                        <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                                            {lawyer.fullName} will connect with you at the scheduled time
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Booking Details */}
                            <div className="space-y-4">
                                <h4 className="font-medium text-lg">Booking Details</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                                        <p className="font-medium">
                                            {format(new Date(bookingDetails.booking.date), "PPP")}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Time Slot</p>
                                        <p className="font-medium">{bookingDetails.booking.slot}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Consultation Mode</p>
                                        <p className="font-medium capitalize">{bookingDetails.booking.mode}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                                        <p className="font-medium">{lawyer.consultationDurationMinutes} minutes</p>
                                    </div>
                                </div>
                            </div>

                            {/* Important Notes */}
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                                    Important Information
                                </h4>
                                <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        The lawyer will contact you at the scheduled time via {bookingDetails.booking.mode === "video" ? "video call" : "phone call"}
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        Please be available 5 minutes before your scheduled time
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        You'll receive a reminder 1 hour before your consultation
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        For any queries, contact our support team
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                        <Button
                            variant="outline"
                            onClick={() => setShowConfirmationDialog(false)}
                            className="w-full sm:w-auto"
                        >
                            Close
                        </Button>
                        <Button
                            onClick={() => {
                                setShowConfirmationDialog(false)
                                // You can add navigation to user's dashboard if needed
                            }}
                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
                        >
                            View All Bookings
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* NyayMitra Footer */}
            <footer className="relative z-20 bg-[#111827] border-t border-white/10 mt-12">
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