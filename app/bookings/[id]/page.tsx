"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
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
    Shield
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { toast, Toaster } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"

export default function BookingDetails() {
    const [booking, setBooking] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [cancelling, setCancelling] = useState(false)
    const params = useParams()
    const router = useRouter()
    const bookingId = (params?.id as string) || ""

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const token = localStorage.getItem("token")
                const response = await axios.get(`https://nyaymitra-backend.onrender.com/api/v1/booking/${bookingId}`, {
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
            await axios.patch(`http://localhost:5000/api/v1/booking/${bookingId}/cancel`, {}, {
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
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-destructive to-foreground bg-clip-text text-transparent">Booking not found</h2>
                    <p className="text-muted-foreground max-w-md">The booking you're looking for doesn't exist or may have been removed.</p>
                </div>
                <Button onClick={() => router.back()} variant="outline" className="mt-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Go back
                </Button>
            </div>
        )
    }

    const statusSteps = [
        { id: 'pending', label: 'Pending', icon: <Loader className="w-4 h-4" /> },
        { id: 'confirmed', label: 'Confirmed', icon: <ShieldCheck className="w-4 h-4" /> },
        { id: 'completed', label: 'Completed', icon: <Star className="w-4 h-4" /> },
        { id: 'cancelled', label: 'Cancelled', icon: <FileWarning className="w-4 h-4" /> },
    ]

    const currentStatusIndex = statusSteps.findIndex(step => step.id === booking.status.toLowerCase())
    const progressValue = (currentStatusIndex / (statusSteps.length - 1)) * 100

    return (
        <div className="max-w-5xl mx-auto my-8 px-4 sm:px-6 lg:px-8 space-y-8">
            <Toaster position="top-center" richColors />

            <Button
                onClick={() => router.back()}
                variant="ghost"
                className="gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to bookings
            </Button>

            <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div className="space-y-2">
                        <Badge variant="secondary" className="flex items-center gap-2 w-fit">
                            <Zap className="w-3 h-3" />
                            <span>Booking ID: {booking._id.slice(0, 8)}</span>
                        </Badge>
                        <h1 className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
                            {booking.status === 'cancelled' ? 'Booking Cancelled' : 'Booking Details'}
                        </h1>
                        <p className="text-muted-foreground">
                            {booking.status === 'cancelled'
                                ? 'This booking has been cancelled'
                                : `Your consultation is scheduled for ${format(new Date(booking.date), 'MMMM d, yyyy')} at ${booking.slot}`}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Badge
                            variant={
                                booking.status === 'confirmed' ? 'default' :
                                    booking.status === 'completed' ? 'secondary' :
                                        booking.status === 'cancelled' ? 'destructive' : 'outline'
                            }
                            className="px-3 py-1.5 rounded-lg"
                        >
                            {statusSteps.find(step => step.id === booking.status.toLowerCase())?.icon}
                            <span className="ml-2">{booking.status}</span>
                        </Badge>
                    </div>
                </div>

                <Progress value={progressValue} className="h-[6px] bg-muted/50" indicatorClassName="bg-gradient-to-r from-primary to-emerald-500" />
            </div>

            <Tabs defaultValue="details" className="space-y-8">
                <TabsList className="bg-muted/50 p-1.5 h-auto rounded-xl">
                    <TabsTrigger value="details" className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg px-4 py-2">
                        <ShieldCheck className="w-4 h-4 mr-2" />
                        Details
                    </TabsTrigger>
                    <TabsTrigger value="lawyer" className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg px-4 py-2">
                        <User className="w-4 h-4 mr-2" />
                        Lawyer Info
                    </TabsTrigger>
                    <TabsTrigger value="actions" className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg px-4 py-2">
                        <Zap className="w-4 h-4 mr-2" />
                        Actions
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="details">
                    <Card className="border-none shadow-lg rounded-2xl overflow-hidden bg-gradient-to-br from-background to-muted/10">
                        <div className="p-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <InfoRow icon={<User className="text-primary" />} label="Client" value={booking.userId} />
                                <InfoRow icon={<ShieldCheck className="text-primary" />} label="Lawyer" value={booking.lawyerId} />
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
                                            <Badge variant="outline" className="px-2 py-0.5">
                                                Paid
                                            </Badge>
                                        </div>
                                    }
                                />
                            </div>

                            <Separator className="bg-muted/30" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <InfoRow
                                    label="Status Timeline"
                                    value={
                                        <div className="space-y-4">
                                            {statusSteps.map((step, index) => (
                                                <div key={step.id} className="flex items-center gap-4">
                                                    <div className={`flex flex-col items-center ${index < currentStatusIndex ? 'text-primary' : 'text-muted-foreground'}`}>
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index <= currentStatusIndex ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                                            {step.icon}
                                                        </div>
                                                        {index < statusSteps.length - 1 && (
                                                            <div className={`w-0.5 h-6 ${index < currentStatusIndex ? 'bg-primary' : 'bg-muted'}`}></div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className={`font-medium ${index <= currentStatusIndex ? 'text-foreground' : 'text-muted-foreground'}`}>
                                                            {step.label}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {index === 0 && "Booking received"}
                                                            {index === 1 && "Lawyer confirmed"}
                                                            {index === 2 && "Consultation completed"}
                                                            {index === 3 && "Booking cancelled"}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    }
                                />
                                <InfoRow
                                    icon={<CreditCard className="text-primary" />}
                                    label="Payment Details"
                                    value={
                                        <div className="space-y-3">
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
                                                <span className="font-mono text-sm">TRX_{booking._id.slice(0, 8)}</span>
                                            </div>
                                        </div>
                                    }
                                />
                            </div>
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="lawyer">
                    <Card className="border-none shadow-lg rounded-2xl overflow-hidden bg-gradient-to-br from-background to-muted/10">
                        <div className="p-8 space-y-8">
                            <div className="flex flex-col md:flex-row items-start gap-6">
                                <div className="relative">
                                    <Avatar className="h-20 w-20">
                                        <AvatarImage src="/lawyer-avatar.jpg" />
                                        <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-bold text-2xl">
                                            {booking.lawyerId.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <Badge variant="default" className="absolute -bottom-2 -right-2 px-2 py-1 rounded-lg shadow-sm">
                                        <Shield className="w-3 h-3 mr-1" />
                                        Verified
                                    </Badge>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
                                        Advocate {booking.lawyerId}
                                    </h3>
                                    <p className="text-muted-foreground">Criminal Lawyer | Supreme Court of India</p>
                                    <div className="flex flex-wrap items-center gap-2 mt-3">
                                        <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1 rounded-lg">
                                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                            <span>4.8 (128 reviews)</span>
                                        </Badge>
                                        <Badge variant="outline" className="px-3 py-1 rounded-lg">
                                            12+ years experience
                                        </Badge>
                                        <Badge variant="outline" className="px-3 py-1 rounded-lg">
                                            <MapPin className="w-3 h-3 mr-1" />
                                            New Delhi
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            <Separator className="bg-muted/30" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-lg flex items-center gap-2">
                                        <ShieldCheck className="w-5 h-5 text-primary" />
                                        Specializations
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['Criminal Defense', 'Bail Applications', 'Cyber Crime', 'Property Disputes'].map(spec => (
                                            <Badge key={spec} variant="outline" className="rounded-lg px-3 py-1">
                                                {spec}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
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
                                    Specialized in criminal defense with extensive experience in high-profile cases across India.
                                    Recognized for strategic litigation and client-focused approach. Admitted to practice in the
                                    Supreme Court of India and various High Courts.
                                </p>
                            </div>

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
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="actions">
                    <Card className="border-none shadow-lg rounded-2xl overflow-hidden bg-gradient-to-br from-background to-muted/10">
                        <div className="p-8 space-y-8">
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-primary" />
                                    Booking Actions
                                </h3>

                                {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Button
                                            variant="outline"
                                            className="h-16 rounded-xl border-primary/20 hover:border-primary/40 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <CalendarDays className="w-5 h-5 text-primary" />
                                                <div className="text-left">
                                                    <p className="font-medium">Reschedule</p>
                                                    <p className="text-xs text-muted-foreground">Change your appointment time</p>
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
                                    </div>
                                )}

                                {booking.status === 'completed' && (
                                    <Button
                                        variant="outline"
                                        className="h-16 w-full rounded-xl border-primary/20 hover:border-primary/40 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <MessageSquare className="w-5 h-5 text-primary" />
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
                                                        The lawyer will call you at your registered phone number.
                                                        Please ensure your phone is available at the scheduled time.
                                                    </p>
                                                </div>
                                            </div>
                                        </Card>
                                        <div className="flex items-center justify-between bg-muted/30 p-4 rounded-xl">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Your contact number</p>
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
                                                        You can discuss your legal matter via text with the lawyer.
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
                        </div>
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