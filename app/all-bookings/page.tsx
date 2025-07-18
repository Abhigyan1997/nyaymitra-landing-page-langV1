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
    Gavel,
    ChevronLeft,
    ChevronRight as ChevronRightIcon,
    Home,
    BookText,
    Mail,
    Menu,
    X
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

interface ApiResponse {
    success: boolean
    currentPage: number
    totalPages: number
    totalBookings: number
    bookings: Booking[]
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
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalBookings: 0,
        limit: 10
    })
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const router = useRouter()

    const fetchBookings = async (page = 1) => {
        const userId = localStorage.getItem("userId")
        const token = localStorage.getItem("token")

        try {
            setLoading(true)
            const response = await axios.get<ApiResponse>(
                `https://nyaymitra-backend.onrender.com/api/v1/booking/allOrders/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        page,
                        limit: pagination.limit
                    }
                }
            )

            setBookings(response.data.bookings || [])
            setPagination({
                currentPage: response.data.currentPage,
                totalPages: response.data.totalPages,
                totalBookings: response.data.totalBookings,
                limit: pagination.limit
            })
        } catch (error) {
            console.error("Error fetching bookings:", error)
            toast.error("Failed to load bookings")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBookings()
    }, [activeTab])

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            fetchBookings(newPage)
        }
    }

    const filteredBookings = bookings.filter(booking => {
        if (activeTab === "all") return true
        return booking.status === activeTab
    })

    const navigateToBookingDetails = (bookingId: string) => {
        router.push(`/bookings/${bookingId}`)
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <Skeleton className="h-9 w-64 rounded-lg" />
                            <Skeleton className="h-4 w-80 rounded-lg" />
                        </div>

                        <div className="space-y-6">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="flex flex-col border rounded-xl p-6 gap-4 bg-white">
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
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-8">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-gray-900">My Consultations</h1>
                        <p className="text-gray-600">
                            Manage your scheduled legal consultations
                        </p>
                    </div>

                    <Tabs value={activeTab} onValueChange={(value) => {
                        setActiveTab(value)
                        fetchBookings(1)
                    }}>
                        <TabsList className="bg-white border border-gray-200 p-1 rounded-lg">
                            <TabsTrigger value="all" className="px-4 py-1 rounded-md data-[state=active]:bg-gray-100">All</TabsTrigger>
                            <TabsTrigger value="confirmed" className="px-4 py-1 rounded-md data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700">Confirmed</TabsTrigger>
                            <TabsTrigger value="pending" className="px-4 py-1 rounded-md data-[state=active]:bg-amber-50 data-[state=active]:text-amber-700">Pending</TabsTrigger>
                            <TabsTrigger value="cancelled" className="px-4 py-1 rounded-md data-[state=active]:bg-rose-50 data-[state=active]:text-rose-700">Cancelled</TabsTrigger>
                        </TabsList>

                        <TabsContent value={activeTab} className="space-y-6">
                            {filteredBookings.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16 space-y-4 border-2 border-dashed border-gray-200 rounded-xl bg-white">
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
                                <>
                                    <div className="space-y-6">
                                        {filteredBookings.map((booking) => {
                                            const ModeIcon = modeIcons[booking.mode as keyof typeof modeIcons] || Video
                                            const StatusIcon = statusIcons[booking.status as keyof typeof statusIcons] || CheckCircle2
                                            const formattedDate = format(new Date(booking.date), "EEE, MMM dd, yyyy")
                                            const formattedTime = booking.slot.replace(/([AP]M)/, " $1")

                                            return (
                                                <div key={booking._id} className="group relative">
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

                                    <div className="flex items-center justify-between mt-8">
                                        <div className="text-sm text-gray-600">
                                            Showing {(pagination.currentPage - 1) * pagination.limit + 1} to{" "}
                                            {Math.min(pagination.currentPage * pagination.limit, pagination.totalBookings)} of{" "}
                                            {pagination.totalBookings} bookings
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handlePageChange(pagination.currentPage - 1)}
                                                disabled={pagination.currentPage === 1}
                                            >
                                                <ChevronLeft className="h-4 w-4" />
                                                Previous
                                            </Button>
                                            <div className="flex items-center space-x-1">
                                                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                                                    let pageNum
                                                    if (pagination.totalPages <= 5) {
                                                        pageNum = i + 1
                                                    } else if (pagination.currentPage <= 3) {
                                                        pageNum = i + 1
                                                    } else if (pagination.currentPage >= pagination.totalPages - 2) {
                                                        pageNum = pagination.totalPages - 4 + i
                                                    } else {
                                                        pageNum = pagination.currentPage - 2 + i
                                                    }

                                                    return (
                                                        <Button
                                                            key={pageNum}
                                                            variant={pagination.currentPage === pageNum ? "default" : "outline"}
                                                            size="sm"
                                                            onClick={() => handlePageChange(pageNum)}
                                                        >
                                                            {pageNum}
                                                        </Button>
                                                    )
                                                })}
                                                {pagination.totalPages > 5 && pagination.currentPage < pagination.totalPages - 2 && (
                                                    <>
                                                        <span className="px-2">...</span>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handlePageChange(pagination.totalPages)}
                                                        >
                                                            {pagination.totalPages}
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handlePageChange(pagination.currentPage + 1)}
                                                disabled={pagination.currentPage === pagination.totalPages}
                                            >
                                                Next
                                                <ChevronRightIcon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </main>

            <Footer />
        </div>
    )
}

function Header({ mobileMenuOpen, setMobileMenuOpen }: { mobileMenuOpen: boolean, setMobileMenuOpen: (open: boolean) => void }) {
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
                                NyayMitra
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

function Footer() {
    return (
        <footer className="relative z-20 bg-gray-900 border-t border-white/10 mt-12">
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
                        <p className="text-gray-400 text-sm">
                            Empowering citizens with accessible legal solutions through technology.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-white font-medium mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-gray-400 hover:text-white text-sm">Home</Link></li>
                            <li><Link href="/services" className="text-gray-400 hover:text-white text-sm">Services</Link></li>
                            <li><Link href="/about" className="text-gray-400 hover:text-white text-sm">About Us</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-white text-sm">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-medium mb-4">Contact Us</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
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
                            {/* social icons here */}
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} NyayMitra. All rights reserved.</p>
                </div>
            </div>
        </footer>

    )
}