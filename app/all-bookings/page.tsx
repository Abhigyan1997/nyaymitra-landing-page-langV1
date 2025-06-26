"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { format } from "date-fns"
import {
    CalendarDays,
    Clock,
    Video,
    Phone,
    MessageSquare,
    MapPin,
    ChevronRight,
    Loader2,
    CreditCard,
    ArrowLeft,
    Scale,
    User,
    CheckCircle2,
    XCircle,
    Clock4,
    Gavel
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

interface Booking {
    _id: string
    userName: string
    lawyerName: string
    date: string
    slot: string
    mode: string
    status: string
    amount: number
    paymentId: string
    paymentMode: string
    createdAt: string
}

const modeIcons = {
    video: Video,
    call: Phone,
    chat: MessageSquare,
    inPerson: MapPin
}

const statusIcons = {
    confirmed: CheckCircle2,
    cancelled: XCircle,
    pending: Clock4
}

const statusColors = {
    confirmed: "bg-emerald-50 text-emerald-700",
    cancelled: "bg-rose-50 text-rose-700",
    pending: "bg-amber-50 text-amber-700"
}

const modeColors = {
    video: "text-indigo-600",
    call: "text-blue-600",
    chat: "text-pink-600",
    inPerson: "text-orange-600"
}

export default function AllBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState("all")
    const router = useRouter()

    useEffect(() => {
        const fetchBookings = async () => {
            const userId = localStorage.getItem("userId")
            const token = localStorage.getItem("token")

            try {
                const response = await axios.get(
                    `https://nyaymitra-backend.onrender.com/api/v1/booking/allOrders/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                setBookings(response.data.bookings || [])
            } catch (error) {
                console.error("Error fetching bookings:", error)
                toast.error("Failed to load bookings")
            } finally {
                setLoading(false)
            }
        }

        fetchBookings()
    }, [])

    const filteredBookings = bookings.filter(booking => {
        if (activeTab === "all") return true
        return booking.status === activeTab
    })

    const navigateToBookingDetails = (bookingId: string) => {
        router.push(`/bookings/${bookingId}`)
    }

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="space-y-8">
                    {/* Header with logo and back button skeleton */}
                    <div className="flex items-center gap-4 mb-6">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-6 w-32 rounded-lg" />
                    </div>

                    <div className="space-y-4">
                        <Skeleton className="h-9 w-64 rounded-lg" />
                        <Skeleton className="h-4 w-80 rounded-lg" />
                    </div>

                    <div className="space-y-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex flex-col border rounded-xl p-6 gap-4">
                                <div className="flex justify-between">
                                    <Skeleton className="h-6 w-48 rounded-lg" />
                                    <Skeleton className="h-5 w-20 rounded-full" />
                                </div>
                                <div className="flex gap-8">
                                    {[...Array(3)].map((_, j) => (
                                        <div key={j} className="flex items-center gap-2">
                                            <Skeleton className="h-4 w-4 rounded-full" />
                                            <Skeleton className="h-4 w-24 rounded-lg" />
                                        </div>
                                    ))}
                                </div>
                                <Skeleton className="h-10 w-full rounded-lg mt-2" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="space-y-8">
                {/* Header with logo and back button */}
                <div className="flex items-center gap-4 mb-6">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => router.back()}
                        className="rounded-full"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <Link href="/" className="flex items-center space-x-2">
                        <Scale className="h-8 w-8 text-blue-600" />
                        <span className="text-xl font-bold text-gray-900">Nyay Mitra</span>
                    </Link>
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900">My Consultations</h1>
                    <p className="text-gray-600">
                        Manage your scheduled legal consultations
                    </p>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="bg-white border border-gray-200 p-1 rounded-lg">
                        <TabsTrigger value="all" className="px-4 py-1 rounded-md data-[state=active]:bg-gray-100">All</TabsTrigger>
                        <TabsTrigger value="confirmed" className="px-4 py-1 rounded-md data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700">Confirmed</TabsTrigger>
                        <TabsTrigger value="pending" className="px-4 py-1 rounded-md data-[state=active]:bg-amber-50 data-[state=active]:text-amber-700">Pending</TabsTrigger>
                        <TabsTrigger value="cancelled" className="px-4 py-1 rounded-md data-[state=active]:bg-rose-50 data-[state=active]:text-rose-700">Cancelled</TabsTrigger>
                    </TabsList>

                    <TabsContent value={activeTab} className="space-y-6">
                        {filteredBookings.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 space-y-4 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                                <Gavel className="w-12 h-12 text-gray-400" />
                                <h3 className="text-xl font-semibold text-gray-700">
                                    No {activeTab === "all" ? "" : activeTab} consultations
                                </h3>
                                <p className="text-gray-500 text-center max-w-md">
                                    {activeTab === "all"
                                        ? "You haven't scheduled any consultations yet."
                                        : `You don't have any ${activeTab} consultations at this time.`}
                                </p>
                                <Button
                                    onClick={() => router.push("/search")}
                                    className="mt-4"
                                    variant="outline"
                                >
                                    Find a Lawyer
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {filteredBookings.map((booking) => {
                                    const ModeIcon = modeIcons[booking.mode as keyof typeof modeIcons] || Video
                                    const StatusIcon = statusIcons[booking.status as keyof typeof statusIcons] || CheckCircle2
                                    const formattedDate = format(new Date(booking.date), "EEE, MMM dd, yyyy")
                                    const formattedTime = booking.slot.replace(/([AP]M)/, " $1")

                                    return (
                                        <div key={booking._id} className="group relative">
                                            {/* Timeline dot */}
                                            <div className="absolute left-0 top-6 -ml-1.5 h-3 w-3 rounded-full bg-gray-300 group-hover:bg-indigo-500 transition-colors"></div>

                                            <div className="relative pl-8">
                                                <div className="flex flex-col border rounded-xl p-6 hover:border-indigo-300 hover:shadow-sm transition-all bg-white">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                                                <User className="w-5 h-5 text-gray-400" />
                                                                {booking.lawyerName}
                                                            </h3>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <ModeIcon className={`w-4 h-4 ${modeColors[booking.mode as keyof typeof modeColors]}`} />
                                                                <span className="text-sm text-gray-600 capitalize">{booking.mode} consultation</span>
                                                            </div>
                                                        </div>
                                                        <Badge
                                                            className={`${statusColors[booking.status as keyof typeof statusColors]} rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1`}
                                                        >
                                                            <StatusIcon className="w-3 h-3" />
                                                            {booking.status}
                                                        </Badge>
                                                    </div>

                                                    <Separator className="my-4" />

                                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                        <div className="space-y-1">
                                                            <p className="text-xs text-gray-500">Date</p>
                                                            <div className="flex items-center gap-2">
                                                                <CalendarDays className="w-4 h-4 text-gray-400" />
                                                                <p className="text-gray-900">{formattedDate}</p>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-1">
                                                            <p className="text-xs text-gray-500">Time</p>
                                                            <div className="flex items-center gap-2">
                                                                <Clock className="w-4 h-4 text-gray-400" />
                                                                <p className="text-gray-900">{formattedTime}</p>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-1">
                                                            <p className="text-xs text-gray-500">Amount</p>
                                                            <div className="flex items-center gap-2">
                                                                <CreditCard className="w-4 h-4 text-gray-400" />
                                                                <p className="text-gray-900">₹{booking.amount}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex justify-between mt-6">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => navigateToBookingDetails(booking._id)}
                                                            className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50"
                                                        >
                                                            View details
                                                            <ChevronRight className="w-4 h-4 ml-1" />
                                                        </Button>
                                                        {booking.status === "confirmed" && (
                                                            <Button
                                                                size="sm"
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    toast.info("Connecting to your consultation...")
                                                                }}
                                                                className="bg-indigo-600 hover:bg-indigo-700"
                                                            >
                                                                Join Now
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}