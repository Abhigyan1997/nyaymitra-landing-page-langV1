"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter, usePathname } from "next/navigation"
import axios from "axios"
import {
    Loader,
    CalendarDays,
    Clock3,
    User,
    Wallet,
    ShieldCheck,
    CreditCard,
    FileWarning,
    ArrowLeft,
    MapPin,
    MessageSquare,
    Phone,
    Video,
    ChevronRight,
    Star,
    Zap,
    Shield,
    Download,
    Briefcase,
    FileText,
    CheckCircle2,
    XCircle,
    Clock,
    AlertCircle
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { toast, Toaster } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Booking {
    _id: string
    userId: string
    lawyerId: string
    userName: string
    lawyerName: string
    date: string
    slot: string
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
    mode: 'video' | 'phone' | 'chat'
    amount: number
    paymentMode: string
    paymentStatus: string
    paymentId?: string
    createdAt?: string
    updatedAt?: string
}

export default function BookingDetails() {
    const [booking, setBooking] = useState<Booking | null>(null)
    const [loading, setLoading] = useState(true)
    const [cancelling, setCancelling] = useState(false)
    const [completing, setCompleting] = useState(false)
    const params = useParams()
    const router = useRouter()
    const pathname = usePathname()
    const bookingId = (params?.id as string) || ""

    const isLawyer = pathname?.includes('/dashboard/lawyer') ?? false

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const token = localStorage.getItem("token")
                const response = await axios.get(`http://localhost:5000/api/v1/booking/${bookingId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setBooking(response.data.booking)
            } catch (error) {
                console.error("Failed to fetch booking", error)
                toast.error("Failed to load booking details")
            } finally {
                setLoading(false)
            }
        }

        if (bookingId) fetchBooking()
    }, [bookingId])

    const handleCancelBooking = async () => {
        setCancelling(true)
        try {
            const token = localStorage.getItem("token")
            await axios.patch(`https://nyaymitra-backend.onrender.com/api/v1/booking/${bookingId}/cancel`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            toast.success("Booking cancelled successfully")
            router.refresh()
        } catch (error) {
            console.error("Failed to cancel booking", error)
            toast.error("Failed to cancel booking")
        } finally {
            setCancelling(false)
        }
    }

    const handleCompleteBooking = async () => {
        setCompleting(true)
        try {
            const token = localStorage.getItem("token")
            await axios.patch(`https://nyaymitra-backend.onrender.com/api/v1/booking/${bookingId}/complete`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            toast.success("Booking marked as completed")
            router.refresh()
        } catch (error) {
            console.error("Failed to complete booking", error)
            toast.error("Failed to complete booking")
        } finally {
            setCompleting(false)
        }
    }

    const downloadPaymentReceipt = () => {
        if (!booking) return;

        const receiptContent = `
LegalConnect Payment Receipt
----------------------------------------
Booking ID: ${booking._id || 'N/A'}
Date: ${booking.date ? format(new Date(booking.date), 'PPPP') : 'N/A'}
Time Slot: ${booking.slot || 'N/A'}
Consultation Mode: ${booking.mode ? booking.mode.toUpperCase() : 'N/A'}
----------------------------------------
Client Details:
Name: ${booking.userName || 'N/A'}
----------------------------------------
Lawyer Details:
Name: ${booking.lawyerName || 'N/A'}
Specialization: Criminal Lawyer
----------------------------------------
Payment Information:
Amount: ₹${booking.amount || '0'}
Payment Method: ${booking.paymentMode ? booking.paymentMode.toUpperCase() : 'N/A'}
Transaction ID: ${booking.paymentId || 'N/A'}
Payment Status: ${booking.paymentStatus ? booking.paymentStatus.toUpperCase() : 'N/A'}
----------------------------------------
Thank you for using LegalConnect!
For any queries, please contact support@legalconnect.in
    `.trim();

        const blob = new Blob([receiptContent], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `LegalConnect_Receipt_${booking._id ? booking._id.slice(0, 8) : 'N/A'}.txt`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    const getStatusBadge = () => {
        const statusSteps = [
            { id: 'pending', label: 'Pending', icon: <Clock className="w-4 h-4" />, color: 'text-yellow-500' },
            { id: 'confirmed', label: 'Confirmed', icon: <CheckCircle2 className="w-4 h-4" />, color: 'text-green-500' },
            { id: 'completed', label: 'Completed', icon: <Star className="w-4 h-4" />, color: 'text-blue-500' },
            { id: 'cancelled', label: 'Cancelled', icon: <XCircle className="w-4 h-4" />, color: 'text-destructive' },
        ]

        const status = statusSteps.find(step => step.id === booking?.status.toLowerCase()) ||
            { icon: <Clock className="w-4 h-4" />, color: 'text-muted-foreground', label: 'Unknown' }

        return (
            <Badge
                variant={
                    booking?.status === 'confirmed' ? 'default' :
                        booking?.status === 'completed' ? 'secondary' :
                            booking?.status === 'cancelled' ? 'destructive' : 'outline'
                }
                className="gap-2 px-3 py-1.5 rounded-lg"
            >
                <span className={status.color}>{status.icon}</span>
                <span>{status.label}</span>
            </Badge>
        )
    }

    const getModeBadge = () => {
        if (!booking) return null;

        const modeConfig = {
            video: { icon: <Video className="w-4 h-4" />, color: 'bg-purple-100 text-purple-800' },
            phone: { icon: <Phone className="w-4 h-4" />, color: 'bg-blue-100 text-blue-800' },
            chat: { icon: <MessageSquare className="w-4 h-4" />, color: 'bg-green-100 text-green-800' },
            default: { icon: <MessageSquare className="w-4 h-4" />, color: 'bg-gray-100 text-gray-800' }
        }

        const mode = modeConfig[booking.mode as keyof typeof modeConfig] || modeConfig.default

        return (
            <Badge className={`gap-2 ${mode.color}`}>
                {mode.icon}
                <span className="capitalize">{booking.mode}</span>
            </Badge>
        )
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
                <div className="flex flex-col items-center gap-4">
                    <Loader className="animate-spin w-10 h-10 text-primary" />
                    <p className="text-muted-foreground animate-pulse">Loading your booking details...</p>
                </div>
            </div>
        )
    }

    if (!booking) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-background to-muted/20 p-6">
                <div className="relative">
                    <FileWarning className="w-16 h-16 text-destructive" />
                    <div className="absolute -inset-2 rounded-full bg-destructive/10 animate-pulse"></div>
                </div>
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-destructive to-foreground bg-clip-text text-transparent">
                        Booking not found
                    </h2>
                    <p className="text-muted-foreground max-w-md">
                        The booking you're looking for doesn't exist or may have been removed.
                    </p>
                </div>
                <Button onClick={() => router.push("/all-bookings")}>
                    View All Bookings
                </Button>


            </div>
        )
    }

    const statusSteps = [
        { id: 'pending', label: 'Pending', icon: <Clock className="w-4 h-4" />, color: 'text-yellow-500' },
        { id: 'confirmed', label: 'Confirmed', icon: <CheckCircle2 className="w-4 h-4" />, color: 'text-green-500' },
        { id: 'completed', label: 'Completed', icon: <Star className="w-4 h-4" />, color: 'text-blue-500' },
        { id: 'cancelled', label: 'Cancelled', icon: <XCircle className="w-4 h-4" />, color: 'text-destructive' },
    ]

    const currentStatusIndex = statusSteps.findIndex(step => step.id === booking.status.toLowerCase())
    const progressValue = (currentStatusIndex / (statusSteps.length - 1)) * 100

    return (
        <div className="max-w-6xl mx-auto my-8 px-4 sm:px-6 lg:px-8 space-y-8">
            <Toaster position="top-center" richColors />

            {/* Header with Navigation */}
            <div className="flex items-center justify-between">
                <Button
                    onClick={() => router.back()}
                    variant="ghost"
                    className="gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Button>
                <Button onClick={() => router.push("/all-bookings")}>
                    View All Bookings
                </Button>

            </div>

            {/* Booking Header */}
            <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div className="space-y-2">
                        <Badge variant="secondary" className="flex items-center gap-2 w-fit">
                            <Zap className="w-3 h-3" />
                            <span>Booking ID: {booking._id.slice(0, 8)}</span>
                        </Badge>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
                            {booking.status === 'cancelled' ? 'Booking Cancelled' : 'Booking Details'}
                        </h1>
                        <p className="text-muted-foreground">
                            {booking.status === 'cancelled'
                                ? 'This booking has been cancelled'
                                : `Your consultation ${isLawyer ? 'with client' : 'with lawyer'} ${isLawyer ? booking.userName : booking.lawyerName} is scheduled for ${format(new Date(booking.date), 'MMMM d, yyyy')} at ${booking.slot}`}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        {getStatusBadge()}
                        {getModeBadge()}
                    </div>
                </div>

                <Progress value={progressValue} className="h-[6px] bg-muted/50" indicatorClassName="bg-gradient-to-r from-primary to-emerald-500" />
            </div>

            {/* Status Alert */}
            {booking.status === 'pending' && (
                <Alert variant="default" className="border-yellow-500 bg-yellow-50">
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                    <AlertTitle>Pending Confirmation</AlertTitle>
                    <AlertDescription>
                        This booking is awaiting confirmation from the {isLawyer ? 'you' : 'lawyer'}.
                        {!isLawyer && ' You will receive a notification once confirmed.'}
                    </AlertDescription>
                </Alert>
            )}

            {booking.status === 'cancelled' && (
                <Alert variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <AlertTitle>Booking Cancelled</AlertTitle>
                    <AlertDescription>
                        This booking was cancelled on {format(new Date(booking.updatedAt || booking.createdAt || new Date()), 'PPPP')}
                    </AlertDescription>
                </Alert>
            )}

            {/* Main Content Tabs */}
            <Tabs defaultValue="details" className="space-y-6">
                <TabsList className="bg-muted/50 p-1.5 h-auto rounded-xl">
                    <TabsTrigger value="details" className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg px-4 py-2">
                        <ShieldCheck className="w-4 h-4 mr-2" />
                        Details
                    </TabsTrigger>
                    <TabsTrigger
                        value={isLawyer ? "client" : "lawyer"}
                        className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg px-4 py-2"
                    >
                        <User className="w-4 h-4 mr-2" />
                        {isLawyer ? 'Client Info' : 'Lawyer Info'}
                    </TabsTrigger>
                    <TabsTrigger value="actions" className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg px-4 py-2">
                        <Zap className="w-4 h-4 mr-2" />
                        Actions
                    </TabsTrigger>
                </TabsList>

                {/* Details Tab */}
                <TabsContent value="details">
                    <Card className="border-none shadow-lg rounded-2xl overflow-hidden bg-gradient-to-br from-background to-muted/10">
                        <CardHeader>
                            <CardTitle>Booking Information</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {!isLawyer && (
                                    <InfoRow icon={<User className="text-primary" />} label="Client" value={booking.userName} />
                                )}
                                <InfoRow
                                    icon={isLawyer ? <User className="text-primary" /> : <ShieldCheck className="text-primary" />}
                                    label={isLawyer ? "Client" : "Lawyer"}
                                    value={isLawyer ? booking.userName : booking.lawyerName}
                                />

                                <InfoRow
                                    icon={<CalendarDays className="text-primary" />}
                                    label="Date"
                                    value={
                                        <div className="flex items-center gap-2">
                                            <span>{format(new Date(booking.date), 'PPP')}</span>
                                            <Badge variant="outline" className="px-2 py-0.5">
                                                {format(new Date(booking.date), 'EEEE')}
                                            </Badge>
                                        </div>
                                    }
                                />

                                <InfoRow
                                    icon={<Clock3 className="text-primary" />}
                                    label="Time Slot"
                                    value={
                                        <Badge variant="secondary" className="px-3 py-1 rounded-lg">
                                            {booking.slot}
                                        </Badge>
                                    }
                                />

                                <InfoRow
                                    label="Mode"
                                    value={
                                        <div className="flex items-center gap-3">
                                            {booking.mode === 'video' ? (
                                                <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-lg">
                                                    <Video className="w-4 h-4 text-primary" />
                                                    <span className="capitalize font-medium">{booking.mode}</span>
                                                </div>
                                            ) : booking.mode === 'phone' ? (
                                                <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-lg">
                                                    <Phone className="w-4 h-4 text-primary" />
                                                    <span className="capitalize font-medium">{booking.mode}</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-lg">
                                                    <MessageSquare className="w-4 h-4 text-primary" />
                                                    <span className="capitalize font-medium">{booking.mode}</span>
                                                </div>
                                            )}
                                        </div>
                                    }
                                />

                                <InfoRow
                                    icon={<Wallet className="text-primary" />}
                                    label="Amount"
                                    value={
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
                                                ₹{booking.amount}
                                            </span>
                                            <Badge variant={booking.paymentStatus === 'paid' ? 'default' : 'destructive'}>
                                                {booking.paymentStatus}
                                            </Badge>
                                        </div>
                                    }
                                />
                            </div>

                            <Separator className="bg-muted/30" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Status Timeline</h3>
                                    <div className="space-y-4">
                                        {statusSteps.map((step, index) => (
                                            <div key={step.id} className="flex items-center gap-4">
                                                <div className={`flex flex-col items-center ${index < currentStatusIndex ? 'text-primary' : 'text-muted-foreground'}`}>
                                                    <div className={cn(
                                                        "w-8 h-8 rounded-full flex items-center justify-center",
                                                        index <= currentStatusIndex ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground',
                                                        step.color
                                                    )}>
                                                        {step.icon}
                                                    </div>
                                                    {index < statusSteps.length - 1 && (
                                                        <div className={cn(
                                                            "w-0.5 h-6",
                                                            index < currentStatusIndex ? 'bg-primary' : 'bg-muted'
                                                        )}></div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className={cn(
                                                        "font-medium",
                                                        index <= currentStatusIndex ? 'text-foreground' : 'text-muted-foreground'
                                                    )}>
                                                        {step.label}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {index === 0 && "Booking received"}
                                                        {index === 1 && isLawyer ? "You confirmed this booking" : "Lawyer confirmed"}
                                                        {index === 2 && "Consultation completed"}
                                                        {index === 3 && "Booking cancelled"}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
                                    <Card className="p-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-muted-foreground">Method</span>
                                                <Badge variant="outline" className="capitalize">
                                                    {booking.paymentMode}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-muted-foreground">Status</span>
                                                <Badge variant={booking.paymentStatus === 'paid' ? 'default' : 'destructive'}>
                                                    {booking.paymentStatus}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-muted-foreground">Transaction ID</span>
                                                <span className="font-mono text-sm">
                                                    {booking.paymentId || `TRX_${booking._id.slice(0, 8)}`}
                                                </span>
                                            </div>
                                            <div className="pt-4">
                                                <Button
                                                    variant="outline"
                                                    className="w-full gap-2"
                                                    onClick={downloadPaymentReceipt}
                                                >
                                                    <Download className="w-4 h-4" />
                                                    Download Payment Receipt
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Client/Lawyer Info Tab */}
                <TabsContent value={isLawyer ? "client" : "lawyer"}>
                    <Card className="border-none shadow-lg rounded-2xl overflow-hidden bg-gradient-to-br from-background to-muted/10">
                        <CardHeader>
                            <CardTitle>{isLawyer ? 'Client Information' : 'Lawyer Profile'}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-8">
                            <div className="flex flex-col md:flex-row items-start gap-6">
                                <div className="relative">
                                    <Avatar className="h-20 w-20">
                                        <AvatarImage src={isLawyer ? "/user-avatar.jpg" : "/lawyer-avatar.jpg"} />
                                        <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-bold text-2xl">
                                            {isLawyer ? booking.userName.charAt(0).toUpperCase() : booking.lawyerName.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <Badge variant="default" className="absolute -bottom-2 -right-2 px-2 py-1 rounded-lg shadow-sm">
                                        <Shield className="w-3 h-3 mr-1" />
                                        Verified
                                    </Badge>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">

                                        {isLawyer ? booking.userName : `Advocate ${booking.lawyerName}`}
                                    </h3>

                                    <p className="text-muted-foreground">
                                        {isLawyer ? "Client" : "Criminal Lawyer | Supreme Court of India"}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-2 mt-3">
                                        {!isLawyer && (
                                            <>
                                                <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1 rounded-lg">
                                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                    <span>4.8 (128 reviews)</span>
                                                </Badge>
                                                <Badge variant="outline" className="px-3 py-1 rounded-lg">
                                                    12+ years experience
                                                </Badge>
                                            </>
                                        )}
                                        <Badge variant="outline" className="px-3 py-1 rounded-lg">
                                            <MapPin className="w-3 h-3 mr-1" />
                                            New Delhi
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            <Separator className="bg-muted/30" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {!isLawyer && (
                                    <div className="space-y-4">
                                        <h4 className="font-semibold text-lg flex items-center gap-2">
                                            <ShieldCheck className="w-5 h-5 text-primary" />
                                            Specializations
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {['Criminal Defense', 'Bail Applications', 'Cyber Crime', 'Property Disputes'].map(spec => (
                                                <TooltipProvider key={spec}>
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <Badge variant="outline" className="rounded-lg px-3 py-1">
                                                                {spec}
                                                            </Badge>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Specialized in {spec.toLowerCase()}</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <h4 className="font-semibold text-lg flex items-center gap-2">
                                        <MessageSquare className="w-5 h-5 text-primary" />
                                        Languages
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['English', 'Hindi', 'Punjabi'].map(lang => (
                                            <Badge key={lang} variant="outline" className="rounded-lg px-3 py-1">
                                                {lang}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-semibold text-lg">About</h4>
                                <p className="text-muted-foreground">
                                    {isLawyer ? (
                                        `Client ${booking.userName} has booked a consultation for legal advice.`
                                    ) : (
                                        "Specialized in criminal defense with extensive experience in high-profile cases across India. Recognized for strategic litigation and client-focused approach. Admitted to practice in the Supreme Court of India and various High Courts."
                                    )}
                                </p>
                            </div>

                            {!isLawyer && (
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-lg">Education</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 mt-2 rounded-full bg-primary"></div>
                                            <div>
                                                <p className="font-medium">LL.M. (Criminal Law)</p>
                                                <p className="text-sm text-muted-foreground">National Law University, Delhi | 2010</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 mt-2 rounded-full bg-primary"></div>
                                            <div>
                                                <p className="font-medium">LL.B. (Hons)</p>
                                                <p className="text-sm text-muted-foreground">Faculty of Law, Delhi University | 2008</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Actions Tab */}
                <TabsContent value="actions">
                    <Card className="border-none shadow-lg rounded-2xl overflow-hidden bg-gradient-to-br from-background to-muted/10">
                        <CardHeader>
                            <CardTitle>Booking Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-8">
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Button
                                        variant="outline"
                                        className="h-16 rounded-xl border-primary/20 hover:border-primary/40 transition-colors"
                                        onClick={downloadPaymentReceipt}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Download className="w-5 h-5 text-primary" />
                                            <div className="text-left">
                                                <p className="font-medium">Download Receipt</p>
                                                <p className="text-xs text-muted-foreground">Get payment confirmation</p>
                                            </div>
                                        </div>
                                    </Button>

                                    {!isLawyer && booking.status !== 'cancelled' && booking.status !== 'completed' && (
                                        <>
                                            <Button
                                                variant="outline"
                                                className="h-16 rounded-xl border-primary/20 hover:border-primary/40 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <CalendarDays className="w-5 h-5 text-primary" />
                                                    <div className="text-left">
                                                        <p className="font-medium">Reschedule</p>
                                                        <p className="text-xs text-muted-foreground">Change appointment time</p>
                                                    </div>
                                                </div>
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                className="h-16 rounded-xl"
                                                onClick={handleCancelBooking}
                                                disabled={cancelling}
                                            >
                                                <div className="flex items-center gap-3">
                                                    {cancelling ? (
                                                        <Loader className="animate-spin w-5 h-5" />
                                                    ) : (
                                                        <FileWarning className="w-5 h-5" />
                                                    )}
                                                    <div className="text-left">
                                                        <p className="font-medium">Cancel Booking</p>
                                                        <p className="text-xs text-white/70">Cancel this appointment</p>
                                                    </div>
                                                </div>
                                            </Button>
                                        </>
                                    )}

                                    {isLawyer && booking.status === 'confirmed' && (
                                        <Button
                                            variant="default"
                                            className="h-16 rounded-xl"
                                            onClick={handleCompleteBooking}
                                            disabled={completing}
                                        >
                                            <div className="flex items-center gap-3">
                                                {completing ? (
                                                    <Loader className="animate-spin w-5 h-5" />
                                                ) : (
                                                    <CheckCircle2 className="w-5 h-5" />
                                                )}
                                                <div className="text-left">
                                                    <p className="font-medium">Mark as Completed</p>
                                                    <p className="text-xs text-white/70">Finish this consultation</p>
                                                </div>
                                            </div>
                                        </Button>
                                    )}
                                </div>

                                {booking.status === 'completed' && (
                                    <Button
                                        variant="outline"
                                        className="h-16 w-full rounded-xl border-primary/20 hover:border-primary/40 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <FileText className="w-5 h-5 text-primary" />
                                            <div className="text-left">
                                                <p className="font-medium">Download Summary</p>
                                                <p className="text-xs text-muted-foreground">Get your consultation notes</p>
                                            </div>
                                        </div>
                                    </Button>
                                )}

                                <Button
                                    className="h-16 w-full rounded-xl bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 transition-all"
                                >
                                    <div className="flex items-center gap-3">
                                        <MessageSquare className="w-5 h-5" />
                                        <div className="text-left">
                                            <p className="font-medium">Contact Support</p>
                                            <p className="text-xs text-white/70">Need help with your booking?</p>
                                        </div>
                                    </div>
                                </Button>
                            </div>

                            <Separator className="bg-muted/30" />

                            <div className="space-y-6">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    {booking.mode === 'video' ? (
                                        <Video className="w-5 h-5 text-primary" />
                                    ) : booking.mode === 'phone' ? (
                                        <Phone className="w-5 h-5 text-primary" />
                                    ) : (
                                        <MessageSquare className="w-5 h-5 text-primary" />
                                    )}
                                    <span>Meeting Details</span>
                                </h3>
                                {booking.mode === 'video' ? (
                                    <div className="space-y-4">
                                        <Card className="bg-primary/5 border-primary/20 p-6 rounded-xl">
                                            <div className="flex items-start gap-4">
                                                <div className="bg-primary/10 p-3 rounded-lg">
                                                    <Video className="w-6 h-6 text-primary" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold">Video Consultation</h4>
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        Your video consultation will be conducted via our secure platform.
                                                        You'll need a device with camera and microphone.
                                                    </p>
                                                </div>
                                            </div>
                                        </Card>
                                        <Button
                                            variant="default"
                                            className="w-full h-14 rounded-xl bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 transition-all"
                                        >
                                            Join Video Call
                                        </Button>
                                        <p className="text-xs text-center text-muted-foreground">
                                            Link will be active 10 minutes before your scheduled time at {booking.slot}
                                        </p>
                                    </div>
                                ) : booking.mode === 'phone' ? (
                                    <div className="space-y-4">
                                        <Card className="bg-primary/5 border-primary/20 p-6 rounded-xl">
                                            <div className="flex items-start gap-4">
                                                <div className="bg-primary/10 p-3 rounded-lg">
                                                    <Phone className="w-6 h-6 text-primary" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold">Phone Consultation</h4>
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        {isLawyer
                                                            ? "You will call the client at their registered phone number."
                                                            : "The lawyer will call you at your registered phone number."
                                                        }
                                                        Please ensure your phone is available at the scheduled time.
                                                    </p>
                                                </div>
                                            </div>
                                        </Card>
                                        <div className="flex items-center justify-between bg-muted/30 p-4 rounded-xl">
                                            <div>
                                                <p className="text-sm text-muted-foreground">
                                                    {isLawyer ? "Client's contact number" : "Your contact number"}
                                                </p>
                                                <p className="font-medium">+91 ••••• •••89</p>
                                            </div>
                                            <Button variant="outline" size="sm">
                                                Edit
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <Card className="bg-primary/5 border-primary/20 p-6 rounded-xl">
                                            <div className="flex items-start gap-4">
                                                <div className="bg-primary/10 p-3 rounded-lg">
                                                    <MessageSquare className="w-6 h-6 text-primary" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold">Chat Consultation</h4>
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        Your chat consultation will be available in your messages.
                                                        You can discuss your legal matter via text with the {isLawyer ? 'client' : 'lawyer'}.
                                                    </p>
                                                </div>
                                            </div>
                                        </Card>
                                        <Button
                                            variant="default"
                                            className="w-full h-14 rounded-xl bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 transition-all"
                                        >
                                            Open Chat
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
function InfoRow({
    icon,
    label,
    value,
}: {
    icon?: React.ReactNode
    label: string
    value: React.ReactNode
}) {
    return (
        <div className="flex items-start gap-4">
            <div className="flex items-center gap-2 text-muted-foreground w-40">
                {icon}
                <span className="font-medium">{label}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground mt-0.5" />
            <div className="font-medium flex-1 break-words">{value}</div>
        </div>
    )
}