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
    CreditCard
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"

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

const statusColors = {
    confirmed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    pending: "bg-yellow-100 text-yellow-800"
}

const modeColors = {
    video: "text-purple-600",
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
            const userId = localStorage.getItem("userId") || "U01JY8BZ01AAZJJCR99GZ8K4ABA"
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
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Skeleton className="h-9 w-64 rounded-md" />
                        <Skeleton className="h-4 w-80 rounded-md" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(6)].map((_, i) => (
                            <Card key={i} className="border rounded-lg">
                                <CardHeader className="pb-3">
                                    <Skeleton className="h-6 w-3/4 rounded-md" />
                                    <Skeleton className="h-4 w-1/2 rounded-md" />
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {[...Array(3)].map((_, j) => (
                                        <div key={j} className="flex items-center gap-3">
                                            <Skeleton className="h-4 w-4 rounded-full" />
                                            <Skeleton className="h-3 w-3/4 rounded-md" />
                                        </div>
                                    ))}
                                </CardContent>
                                <CardFooter>
                                    <Skeleton className="h-9 w-full rounded-md" />
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="space-y-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
                    <p className="text-gray-600">
                        View and manage your upcoming consultations
                    </p>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="bg-white border">
                        <TabsTrigger value="all" className="text-gray-700">All</TabsTrigger>
                        <TabsTrigger value="confirmed" className="text-green-700">Confirmed</TabsTrigger>
                        <TabsTrigger value="pending" className="text-yellow-700">Pending</TabsTrigger>
                        <TabsTrigger value="cancelled" className="text-red-700">Cancelled</TabsTrigger>
                    </TabsList>

                    <TabsContent value={activeTab} className="space-y-4">
                        {filteredBookings.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 space-y-4 border-2 border-dashed border-gray-200 rounded-lg">
                                <CalendarDays className="w-12 h-12 text-gray-400" />
                                <h3 className="text-xl font-semibold text-gray-700">
                                    No {activeTab === "all" ? "" : activeTab} bookings
                                </h3>
                                <p className="text-gray-500 text-center max-w-md">
                                    {activeTab === "all"
                                        ? "You don't have any bookings yet."
                                        : `You don't have any ${activeTab} bookings.`}
                                </p>
                                <Button
                                    onClick={() => router.push("/search")}
                                    className="mt-4"
                                >
                                    Book a Consultation
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredBookings.map((booking) => {
                                    const ModeIcon = modeIcons[booking.mode as keyof typeof modeIcons] || Video
                                    const formattedDate = format(new Date(booking.date), "MMM dd, yyyy")
                                    const formattedTime = booking.slot.replace(/([AP]M)/, " $1")

                                    return (
                                        <Card key={booking._id} className="border rounded-lg hover:shadow-md transition-shadow">
                                            <CardHeader className="pb-3">
                                                <div className="flex justify-between items-start">
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {booking.lawyerName}
                                                    </h3>
                                                    <Badge
                                                        className={`${statusColors[booking.status as keyof typeof statusColors]} rounded-md`}
                                                    >
                                                        {booking.status}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <ModeIcon className={`w-4 h-4 ${modeColors[booking.mode as keyof typeof modeColors]}`} />
                                                    <span className="text-gray-600 capitalize">{booking.mode}</span>
                                                </div>
                                            </CardHeader>

                                            <CardContent className="space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <CalendarDays className="w-5 h-5 text-gray-500" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Date</p>
                                                        <p className="text-gray-900">{formattedDate}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <Clock className="w-5 h-5 text-gray-500" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Time</p>
                                                        <p className="text-gray-900">{formattedTime}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <CreditCard className="w-5 h-5 text-gray-500" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Payment</p>
                                                        <p className="text-gray-900">₹{booking.amount}</p>
                                                    </div>
                                                </div>
                                            </CardContent>

                                            <CardFooter className="flex justify-between pt-0">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => navigateToBookingDetails(booking._id)}
                                                    className="text-gray-600 hover:text-gray-900"
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
                                                    >
                                                        Join Now
                                                    </Button>
                                                )}
                                            </CardFooter>
                                        </Card>
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