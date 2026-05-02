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
    AlertCircle,
    Mail,
    Sparkles
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
    lawyerPhone?: string
    lawyerEmail?: string
    lawyerCity?: string
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
    lawyerDetails?: {
        specialization?: string[];
        experience?: number;
        bio?: string;
        languages?: string[];
        consultationFee?: number;
        averageRating?: number;
        totalReviews?: number;
    };
}

const ContactCard = ({ booking, isLawyer }: { booking: Booking; isLawyer: boolean }) => {
    if (isLawyer || !booking.lawyerPhone) return null;

    return (
        <div className="space-y-4 mt-8 pt-8 border-t border-gradient-to-r from-transparent via-slate-200 to-transparent">
            <div className="flex items-center gap-2 mb-6">
                <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent to-slate-300"></div>
                <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Contact</span>
                <div className="h-0.5 flex-1 bg-gradient-to-l from-transparent to-slate-300"></div>
            </div>

            <div className="space-y-4">
                {/* Phone Section */}
                <div className="group p-4 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200 hover:border-slate-300 transition-all duration-300">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                            <div className="p-2.5 rounded-lg bg-white border border-slate-200 group-hover:border-slate-300 transition-all">
                                <Phone className="w-4 h-4 text-slate-700" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">Direct Phone</p>
                                <p className="text-lg font-semibold text-slate-900 font-mono break-all">{booking.lawyerPhone}</p>
                            </div>
                        </div>
                        <Button
                            size="sm"
                            onClick={() => window.open(`tel:${booking.lawyerPhone}`)}
                            className="shrink-0 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all"
                        >
                            <Phone className="w-3.5 h-3.5" />
                        </Button>
                    </div>
                </div>

                {/* Email Section */}
                {booking.lawyerEmail && (
                    <div className="group p-4 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200 hover:border-slate-300 transition-all duration-300">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3 flex-1">
                                <div className="p-2.5 rounded-lg bg-white border border-slate-200 group-hover:border-slate-300 transition-all">
                                    <Mail className="w-4 h-4 text-slate-700" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">Email Address</p>
                                    <p className="text-sm font-medium text-slate-900 break-all">{booking.lawyerEmail}</p>
                                </div>
                            </div>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open(`mailto:${booking.lawyerEmail}`)}
                                className="shrink-0 border-slate-300 hover:border-slate-400"
                            >
                                <Mail className="w-3.5 h-3.5" />
                            </Button>
                        </div>
                    </div>
                )}

                {/* Scheduled Time Alert */}
                <div className="p-4 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-xs uppercase tracking-wider font-semibold text-amber-900 mb-1">Contact During</p>
                            <p className="text-sm text-amber-800">
                                {format(new Date(booking.date), 'MMMM d, yyyy')} at {booking.slot}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PremiumBadge = ({ children, variant = "default" }: { children: React.ReactNode; variant?: string }) => {
    const variants = {
        status: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider",
        mode: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider",
    }
    return <span className={variants[variant as keyof typeof variants] || variants.status}>{children}</span>
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
                const response = await axios.get(`https://nyaymitra-backend-production.up.railway.app/api/v1/booking/${bookingId}`, {
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
            await axios.patch(`/api/v1/booking/${bookingId}/cancel`, {}, {
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
            await axios.patch(`https://nyaymitra-backend-production.up.railway.app/api/v1/booking/${bookingId}/complete`, {}, {
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
PAYMENT RECEIPT
════════════════════════════════════════

Booking ID: ${booking._id || 'N/A'}
Date: ${booking.date ? format(new Date(booking.date), 'PPPP') : 'N/A'}
Time Slot: ${booking.slot || 'N/A'}
Consultation Mode: ${booking.mode ? booking.mode.toUpperCase() : 'N/A'}

CLIENT DETAILS
─────────────────────────────────────────
Name: ${booking.userName || 'N/A'}

LEGAL PROFESSIONAL DETAILS
─────────────────────────────────────────
Name: ${booking.lawyerName || 'N/A'}
Contact: ${booking.lawyerPhone || 'N/A'}

PAYMENT SUMMARY
─────────────────────────────────────────
Amount: ₹${booking.amount || '0'}
Payment Method: ${booking.paymentMode ? booking.paymentMode.toUpperCase() : 'N/A'}
Transaction ID: ${booking.paymentId || 'N/A'}
Status: ${booking.paymentStatus ? booking.paymentStatus.toUpperCase() : 'N/A'}

════════════════════════════════════════
Thank you for choosing our legal services.
Contact: nyaymitra.ai@gmail.com
    `.trim();

        const blob = new Blob([receiptContent], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `Receipt_${booking._id ? booking._id.slice(0, 8) : 'N/A'}_${format(new Date(), 'yyyyMMdd')}.txt`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    const getStatusConfig = () => {
        const configs = {
            pending: { label: 'Pending', icon: <Clock className="w-4 h-4" />, color: 'from-amber-500 to-orange-500', bg: 'bg-amber-50', text: 'text-amber-900' },
            confirmed: { label: 'Confirmed', icon: <CheckCircle2 className="w-4 h-4" />, color: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50', text: 'text-emerald-900' },
            completed: { label: 'Completed', icon: <Star className="w-4 h-4" />, color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50', text: 'text-blue-900' },
            cancelled: { label: 'Cancelled', icon: <XCircle className="w-4 h-4" />, color: 'from-slate-500 to-slate-600', bg: 'bg-slate-50', text: 'text-slate-900' },
        }
        return configs[booking?.status?.toLowerCase() as keyof typeof configs] || configs.pending
    }

    const getModeConfig = () => {
        if (!booking) return null;
        const modes = {
            video: { label: 'Video Call', icon: <Video className="w-4 h-4" />, color: 'from-purple-500 to-pink-500' },
            phone: { label: 'Phone Call', icon: <Phone className="w-4 h-4" />, color: 'from-blue-500 to-cyan-500' },
            chat: { label: 'Text Chat', icon: <MessageSquare className="w-4 h-4" />, color: 'from-emerald-500 to-teal-500' },
        }
        return modes[booking.mode as keyof typeof modes] || modes.chat
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
                        <Loader className="relative animate-spin w-12 h-12 text-slate-700" />
                    </div>
                    <p className="text-slate-500 font-medium">Loading your booking details</p>
                </div>
            </div>
        )
    }

    if (!booking) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-gradient-to-br from-slate-50 via-white to-slate-50 px-4">
                <div className="relative">
                    <div className="absolute inset-0 bg-red-500 rounded-full blur-2xl opacity-10"></div>
                    <FileWarning className="relative w-20 h-20 text-slate-400" />
                </div>
                <div className="text-center space-y-3 max-w-md">
                    <h2 className="text-3xl font-bold text-slate-900">Booking Not Found</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        The booking you're looking for doesn't exist or may have been removed.
                    </p>
                </div>
                <Button onClick={() => router.push("/all-bookings")} className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg">
                    View All Bookings
                </Button>
            </div>
        )
    }

    const statusConfig = getStatusConfig()
    const modeConfig = getModeConfig()
    const statusSteps = [
        { id: 'pending', label: 'Pending' },
        { id: 'confirmed', label: 'Confirmed' },
        { id: 'completed', label: 'Completed' },
    ]
    const currentStatusIndex = statusSteps.findIndex(step => step.id === booking.status.toLowerCase())

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
            <Toaster position="top-center" richColors />

            {/* Header Navigation */}
            <div className="sticky top-0 z-40 border-b border-slate-200/50 backdrop-blur-xl bg-white/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <Button
                        onClick={() => router.back()}
                        variant="ghost"
                        className="text-slate-600 hover:text-slate-900 gap-2 -ml-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Back</span>
                    </Button>
                    <Button
                        onClick={() => router.push("/all-bookings")}
                        className="bg-slate-900 hover:bg-slate-800 text-white"
                    >
                        All Bookings
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">

                {/* Hero Section */}
                <div className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div className="space-y-3 flex-1">
                                <div className="flex items-center gap-2">
                                    <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                                    <span className="text-xs uppercase tracking-widest font-bold text-slate-500">Booking ID</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                                    {booking.status === 'cancelled' ? 'Booking Cancelled' : 'Consultation Scheduled'}
                                </h1>
                                <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
                                    {booking.status === 'cancelled'
                                        ? 'This booking is no longer active.'
                                        : `Your ${booking.mode} consultation with ${isLawyer ? booking.userName : `Advocate ${booking.lawyerName}`} is scheduled for ${format(new Date(booking.date), 'MMMM d, yyyy')} at ${booking.slot}`}
                                </p>
                            </div>
                            <div className="flex flex-col gap-3 items-start md:items-end">
                                <div className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r ${statusConfig.color} text-white font-semibold text-sm shadow-lg`}>
                                    {statusConfig.icon}
                                    {statusConfig.label}
                                </div>
                                {modeConfig && (
                                    <div className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r ${modeConfig.color} text-white font-semibold text-sm shadow-lg`}>
                                        {modeConfig.icon}
                                        {modeConfig.label}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Status Progress */}
                        <div className="pt-6 space-y-4">
                            <p className="text-xs uppercase tracking-widest font-bold text-slate-500">Timeline</p>
                            <div className="flex items-center justify-between">
                                {statusSteps.map((step, index) => (
                                    <div key={step.id} className="flex flex-col items-center flex-1">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${index <= currentStatusIndex
                                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                                : 'bg-slate-200 text-slate-400'
                                            }`}>
                                            {index + 1}
                                        </div>
                                        <p className={`text-xs mt-2 font-semibold tracking-wider uppercase ${index <= currentStatusIndex ? 'text-slate-900' : 'text-slate-400'
                                            }`}>
                                            {step.label}
                                        </p>
                                        {index < statusSteps.length - 1 && (
                                            <div className={`h-1 w-12 mt-4 rounded-full ${index < currentStatusIndex ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-slate-200'
                                                }`}></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Alert Sections */}
                {booking.status === 'pending' && (
                    <div className="p-6 rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
                        <div className="flex gap-4 items-start">
                            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-bold text-amber-900 mb-1">Awaiting Confirmation</h3>
                                <p className="text-sm text-amber-800">
                                    This booking is pending confirmation from the {isLawyer ? 'client' : 'legal professional'}. You'll receive a notification once confirmed.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {booking.status === 'cancelled' && (
                    <div className="p-6 rounded-xl border border-slate-300 bg-gradient-to-br from-slate-50 to-slate-100">
                        <div className="flex gap-4 items-start">
                            <XCircle className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-bold text-slate-900 mb-1">Booking Cancelled</h3>
                                <p className="text-sm text-slate-700">
                                    Cancelled on {format(new Date(booking.updatedAt || booking.createdAt || new Date()), 'MMMM d, yyyy')}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Content Tabs */}
                <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList className="bg-white border border-slate-200 rounded-xl p-1.5 h-auto inline-flex shadow-sm">
                        <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg px-4 py-2.5 font-semibold transition-all">
                            <Briefcase className="w-4 h-4 mr-2" />
                            Overview
                        </TabsTrigger>
                        <TabsTrigger value={isLawyer ? "client" : "lawyer"} className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg px-4 py-2.5 font-semibold transition-all">
                            <User className="w-4 h-4 mr-2" />
                            {isLawyer ? 'Client' : 'Lawyer'}
                        </TabsTrigger>
                        <TabsTrigger value="actions" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg px-4 py-2.5 font-semibold transition-all">
                            <Zap className="w-4 h-4 mr-2" />
                            Actions
                        </TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Key Details Grid */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-8">
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                                                <Sparkles className="w-4 h-4 text-white" />
                                            </div>
                                            Booking Details
                                        </h2>

                                        {/* Details Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <DetailCard
                                                icon={<CalendarDays className="w-5 h-5 text-blue-600" />}
                                                label="Date"
                                                value={format(new Date(booking.date), 'MMMM d, yyyy')}
                                                subtext={format(new Date(booking.date), 'EEEE')}
                                            />
                                            <DetailCard
                                                icon={<Clock3 className="w-5 h-5 text-blue-600" />}
                                                label="Time Slot"
                                                value={booking.slot}
                                            />
                                            <DetailCard
                                                icon={modeConfig?.icon}
                                                label="Consultation Mode"
                                                value={modeConfig?.label || booking.mode}
                                            />
                                            <DetailCard
                                                icon={<Wallet className="w-5 h-5 text-blue-600" />}
                                                label="Amount"
                                                value={`₹${booking.amount}`}
                                                subtext={booking.paymentStatus}
                                            />
                                        </div>
                                    </div>

                                    <div className="border-t border-slate-200"></div>

                                    {/* Payment Section */}
                                    <div className="space-y-4">
                                        <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                            <CreditCard className="w-4 h-4 text-blue-600" />
                                            Payment Information
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                                                <p className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">Method</p>
                                                <p className="font-semibold text-slate-900 capitalize">{booking.paymentMode}</p>
                                            </div>
                                            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                                                <p className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">Status</p>
                                                <Badge variant={booking.paymentStatus === 'paid' ? 'default' : 'destructive'} className="rounded-lg">
                                                    {booking.paymentStatus}
                                                </Badge>
                                            </div>
                                        </div>
                                        <Button
                                            onClick={downloadPaymentReceipt}
                                            variant="outline"
                                            className="w-full gap-2 border-slate-300 hover:border-slate-400 text-slate-900 hover:bg-slate-50"
                                        >
                                            <Download className="w-4 h-4" />
                                            Download Payment Receipt
                                        </Button>
                                    </div>

                                    {/* Contact Info */}
                                    <ContactCard booking={booking} isLawyer={isLawyer} />
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Parties Card */}
                                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                                    <h3 className="font-bold text-slate-900">Parties</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1">Client</p>
                                            <p className="font-semibold text-slate-900">{booking.userName}</p>
                                        </div>
                                        <div className="border-t border-slate-200"></div>
                                        <div>
                                            <p className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1">Legal Professional</p>
                                            <p className="font-semibold text-slate-900">{booking.lawyerName}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-6 space-y-3">
                                    <h3 className="font-bold text-slate-900">Quick Actions</h3>
                                    <Button
                                        onClick={downloadPaymentReceipt}
                                        variant="outline"
                                        className="w-full justify-start gap-2 border-blue-300 text-slate-900 hover:bg-white"
                                    >
                                        <Download className="w-4 h-4" />
                                        <span className="text-sm font-medium">Receipt</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Lawyer/Client Info Tab */}
                    <TabsContent value={isLawyer ? "client" : "lawyer"} className="space-y-6">
                        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-32"></div>
                            <div className="px-8 pb-8">
                                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end -mt-16 mb-8">
                                    <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                                        <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold text-3xl">
                                            {isLawyer ? booking.userName.charAt(0).toUpperCase() : booking.lawyerName.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <h2 className="text-3xl font-bold text-slate-900">
                                            {isLawyer ? booking.userName : `Advocate ${booking.lawyerName}`}
                                        </h2>
                                        <p className="text-slate-600 mt-1">{isLawyer ? 'Client' : 'Legal Expert'}</p>
                                        {!isLawyer && booking.lawyerDetails?.experience && (
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                <Badge variant="secondary" className="rounded-full px-3 py-1">
                                                    <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                                                    {booking.lawyerDetails.averageRating} ({booking.lawyerDetails.totalReviews})
                                                </Badge>
                                                <Badge variant="secondary" className="rounded-full px-3 py-1">
                                                    {booking.lawyerDetails.experience}+ years
                                                </Badge>
                                                {booking.lawyerCity && (
                                                    <Badge variant="secondary" className="rounded-full px-3 py-1">
                                                        <MapPin className="w-3 h-3 mr-1" />
                                                        {booking.lawyerCity}
                                                    </Badge>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {!isLawyer && booking.lawyerDetails?.specialization && (
                                        <div>
                                            <h3 className="font-bold text-slate-900 mb-3">Specializations</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {booking.lawyerDetails.specialization.map(spec => (
                                                    <Badge key={spec} variant="outline" className="rounded-full px-3 py-1.5">
                                                        {spec}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {booking.lawyerDetails?.languages && (
                                        <div>
                                            <h3 className="font-bold text-slate-900 mb-3">Languages</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {booking.lawyerDetails.languages.map(lang => (
                                                    <Badge key={lang} variant="outline" className="rounded-full px-3 py-1.5">
                                                        {lang}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {booking.lawyerDetails?.bio && (
                                        <div>
                                            <h3 className="font-bold text-slate-900 mb-3">About</h3>
                                            <p className="text-slate-600 leading-relaxed">{booking.lawyerDetails.bio}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="border-t border-slate-200 mt-8 pt-8">
                                    <ContactCard booking={booking} isLawyer={isLawyer} />
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Actions Tab */}
                    <TabsContent value="actions" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-4">
                                {/* Action Buttons */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <ActionButton
                                        icon={<Download className="w-5 h-5" />}
                                        title="Download Receipt"
                                        description="Payment confirmation"
                                        onClick={downloadPaymentReceipt}
                                        variant="outline"
                                    />

                                    {!isLawyer && booking.status !== 'cancelled' && booking.status !== 'completed' && (
                                        <>
                                            <ActionButton
                                                icon={<CalendarDays className="w-5 h-5" />}
                                                title="Reschedule"
                                                description="Change appointment"
                                                variant="outline"
                                            />
                                            <ActionButton
                                                icon={<FileWarning className="w-5 h-5" />}
                                                title="Cancel Booking"
                                                description="Cancel this appointment"
                                                onClick={handleCancelBooking}
                                                isLoading={cancelling}
                                                variant="destructive"
                                            />
                                        </>
                                    )}

                                    {isLawyer && booking.status === 'confirmed' && (
                                        <ActionButton
                                            icon={<CheckCircle2 className="w-5 h-5" />}
                                            title="Mark Complete"
                                            description="Finish consultation"
                                            onClick={handleCompleteBooking}
                                            isLoading={completing}
                                            variant="default"
                                        />
                                    )}

                                    {booking.status === 'completed' && (
                                        <ActionButton
                                            icon={<FileText className="w-5 h-5" />}
                                            title="Download Summary"
                                            description="Consultation notes"
                                            variant="outline"
                                        />
                                    )}
                                </div>

                                {/* Meeting Details */}
                                <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-6 mt-8">
                                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                        {modeConfig?.icon}
                                        <span>{modeConfig?.label} Details</span>
                                    </h3>

                                    {booking.mode === 'video' && (
                                        <div className="space-y-4">
                                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-6">
                                                <p className="text-sm text-slate-600 mb-2">
                                                    Your video consultation will be conducted via our secure platform. Ensure you have a stable internet connection and a device with camera and microphone.
                                                </p>
                                            </div>
                                            <Button className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl">
                                                <Video className="w-4 h-4 mr-2" />
                                                Join Video Call
                                            </Button>
                                            <p className="text-xs text-center text-slate-500">
                                                Link available 10 minutes before your scheduled time
                                            </p>
                                        </div>
                                    )}

                                    {booking.mode === 'phone' && (
                                        <div className="space-y-4">
                                            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 p-6">
                                                <p className="text-sm text-slate-600 mb-3">
                                                    {isLawyer ? 'You will call the client at their registered number.' : 'Call the lawyer at the number below at your scheduled time.'}
                                                </p>
                                                {!isLawyer && booking.lawyerPhone && (
                                                    <div className="bg-white rounded-lg p-4 border border-blue-200 mb-4">
                                                        <p className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">Direct Number</p>
                                                        <p className="text-2xl font-bold text-slate-900 font-mono">{booking.lawyerPhone}</p>
                                                    </div>
                                                )}
                                            </div>
                                            {!isLawyer && (
                                                <Button
                                                    onClick={() => window.open(`tel:${booking.lawyerPhone}`)}
                                                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl"
                                                >
                                                    <Phone className="w-4 h-4 mr-2" />
                                                    Call Now
                                                </Button>
                                            )}
                                        </div>
                                    )}

                                    {booking.mode === 'chat' && (
                                        <div className="space-y-4">
                                            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 p-6">
                                                <p className="text-sm text-slate-600">
                                                    Your chat consultation is available in your messages. Start the conversation during your scheduled time.
                                                </p>
                                            </div>
                                            <Button className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl">
                                                <MessageSquare className="w-4 h-4 mr-2" />
                                                Open Chat
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Support Card */}
                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white h-fit space-y-4">
                                <h3 className="text-lg font-bold">Need Help?</h3>
                                <p className="text-slate-300 text-sm">
                                    Our support team is available to assist with any questions about your booking.
                                </p>
                                <Button className="w-full bg-white hover:bg-slate-100 text-slate-900 font-semibold rounded-xl">
                                    <MessageSquare className="w-4 h-4 mr-2" />
                                    Contact Support
                                </Button>
                                <div className="pt-4 border-t border-slate-700 space-y-2 text-sm">
                                    <p className="text-slate-400">nyaymitra.ai@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

// Helper Components
function DetailCard({ icon, label, value, subtext }: { icon?: React.ReactNode; label: string; value: string; subtext?: string }) {
    return (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-lg p-4 border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
                {icon && <span className="text-slate-600">{icon}</span>}
                <p className="text-xs uppercase tracking-wider font-bold text-slate-500">{label}</p>
            </div>
            <p className="font-bold text-slate-900 text-lg">{value}</p>
            {subtext && <p className="text-xs text-slate-500 mt-1">{subtext}</p>}
        </div>
    )
}

function ActionButton({ icon, title, description, onClick, isLoading = false, variant = "outline" }: { icon: React.ReactNode; title: string; description: string; onClick?: () => void; isLoading?: boolean; variant?: string }) {
    return (
        <Button
            onClick={onClick}
            disabled={isLoading}
            variant={variant as any}
            className={`h-24 rounded-xl flex flex-col items-start justify-center gap-1 p-4 transition-all ${variant === 'destructive' ? 'border-red-300 hover:border-red-400' : variant === 'default' ? 'border-none shadow-md' : 'border-slate-300 hover:border-slate-400'
                }`}
        >
            <div className="flex items-center gap-2 w-full">
                {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : icon}
                <span className="font-semibold text-sm">{title}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">{description}</p>
        </Button>
    )
}