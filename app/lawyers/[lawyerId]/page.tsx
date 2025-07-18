"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Star,
    MapPin,
    Clock,
    Phone,
    Video,
    MessageCircle,
    User,
    Award,
    Calendar,
    Loader,
    AlertCircle,
    ArrowLeft,
    Scale,
    BookOpen,
    Briefcase,
    ShieldCheck,
    Languages
} from "lucide-react"
import Link from "next/link"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

interface Lawyer {
    _id: string
    userId: string
    fullName: string
    profileImage?: string
    barCouncilId: string
    experience: string
    state: string
    city: string
    specialization: string[]
    languagesSpoken: string[]
    consultationFee: number
    status: string
    averageRating: number
    totalReviews: number
    bio: string
    consultationModes: {
        video: boolean
        call: boolean
        chat: boolean
        inPerson: boolean
    }
    verifiedByPlatform: boolean
    kycStatus: string
    timeSlots: {
        day: string
        slots: string[]
        _id: string
    }[]
    yearsPracticing: number
}

export default function LawyerDetailsPage() {
    const params = useParams()
    const router = useRouter()
    const { toast } = useToast()
    const [lawyer, setLawyer] = useState<Lawyer | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const lawyerId = params?.lawyerId as string

    useEffect(() => {
        const fetchLawyerDetails = async () => {
            try {
                setLoading(true)
                setError(null)

                if (!lawyerId) {
                    throw new Error("Lawyer ID is missing from URL parameters")
                }

                const response = await axios.get(
                    `https://nyaymitra-backend.onrender.com/api/v1/lawyer/details/${lawyerId}`
                )

                // Transform the response data to match our interface
                const lawyerData = {
                    ...response.data.lawyer,
                    fullName: response.data.lawyer.userInfo?.fullName || "Lawyer",
                    profileImage: response.data.lawyer.userInfo?.profileImage
                }

                setLawyer(lawyerData)
            } catch (err: any) {
                console.error("Error details:", {
                    message: err.message,
                    response: err.response?.data,
                    status: err.response?.status
                })

                const errorMessage = err.response?.data?.message ||
                    err.message ||
                    "Failed to fetch lawyer details"

                setError(errorMessage)
                toast({
                    title: "Error",
                    description: errorMessage,
                    variant: "destructive",
                })
            } finally {
                setLoading(false)
            }
        }

        if (lawyerId) {
            fetchLawyerDetails()
        }
    }, [lawyerId, router, toast])

    const handleBookConsultation = () => {
        const token = localStorage.getItem("token")
        if (!token) {
            toast({
                title: "Login Required",
                description: "Please login to book a consultation",
                variant: "destructive",
            })
            router.push(`/auth/login?redirect=/lawyers/${lawyerId}`)
            return
        }
        router.push(`/lawyers/${lawyerId}/book`)
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center mb-6">
                        <Button variant="ghost" onClick={() => router.back()}>
                            <ArrowLeft className="h-5 w-5 mr-2" />
                            Back
                        </Button>
                    </div>

                    <div className="space-y-8">
                        <div className="flex items-start space-x-6">
                            <Skeleton className="h-32 w-32 rounded-full" />
                            <div className="space-y-4">
                                <Skeleton className="h-8 w-64" />
                                <Skeleton className="h-4 w-48" />
                                <div className="flex space-x-4">
                                    <Skeleton className="h-6 w-24" />
                                    <Skeleton className="h-6 w-24" />
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <Card key={i}>
                                    <CardHeader>
                                        <Skeleton className="h-6 w-32" />
                                    </CardHeader>
                                    <CardContent>
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-3/4 mt-2" />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="max-w-md text-center p-6 bg-white rounded-lg shadow-md border border-red-100">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                        <AlertCircle className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="mt-3 text-lg font-medium text-gray-900">Error loading lawyer details</h3>
                    <p className="mt-2 text-gray-600">{error}</p>
                    <div className="mt-6 space-x-3">
                        <Button onClick={() => window.location.reload()}>Try Again</Button>
                        <Button variant="outline" onClick={() => router.push("/lawyers")}>
                            Browse Lawyers
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    if (!lawyer) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="max-w-md text-center p-6 bg-white rounded-lg shadow-md border border-gray-200">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                        <User className="h-6 w-6 text-gray-600" />
                    </div>
                    <h3 className="mt-3 text-lg font-medium text-gray-900">Lawyer not found</h3>
                    <p className="mt-2 text-gray-600">The lawyer you're looking for doesn't exist or may have been removed.</p>
                    <div className="mt-6">
                        <Button variant="outline" onClick={() => router.push("/lawyers")}>
                            Browse Lawyers
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center mb-6">
                    <Button variant="ghost" onClick={() => router.back()}>
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Back to Lawyers
                    </Button>
                </div>

                <div className="space-y-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="relative">
                            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center overflow-hidden">
                                {lawyer.profileImage ? (
                                    <img
                                        src={lawyer.profileImage}
                                        alt={lawyer.fullName}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <User className="h-16 w-16 text-blue-600" />
                                )}
                            </div>
                            {lawyer.verifiedByPlatform && (
                                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm">
                                    <div className="bg-blue-600 text-white p-1 rounded-full">
                                        <Award className="h-4 w-4" />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        {lawyer.fullName}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-2 mt-2">
                                        {lawyer.specialization.map((spec, i) => (
                                            <Badge key={i} variant="outline" className="text-blue-600 border-blue-200">
                                                {spec}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                        <span className="ml-1 font-medium text-gray-900">
                                            {lawyer.averageRating.toFixed(1)}
                                        </span>
                                        <span className="text-gray-600 text-sm ml-1">
                                            ({lawyer.totalReviews} reviews)
                                        </span>
                                    </div>

                                    <Badge
                                        variant={lawyer.status === "online" ? "default" : "secondary"}
                                        className="px-3 py-1"
                                    >
                                        {lawyer.kycStatus === "verified" ? "Available Now" : "Available Soon"}
                                    </Badge>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-600">
                                <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                                    {lawyer.city}, {lawyer.state}
                                </div>
                                <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1 text-gray-500" />
                                    {lawyer.experience} years experience
                                </div>
                                <div className="flex items-center">
                                    <Scale className="h-4 w-4 mr-1 text-gray-500" />
                                    Bar Council ID: {lawyer.barCouncilId}
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                                        About
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-700">{lawyer.bio}</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
                                        Experience & Qualifications
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h4 className="font-medium text-gray-900">Years Practicing</h4>
                                        <p className="text-gray-700">{lawyer.yearsPracticing} years</p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">Total Experience</h4>
                                        <p className="text-gray-700">{lawyer.experience} years</p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">Bar Council ID</h4>
                                        <p className="text-gray-700">{lawyer.barCouncilId}</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                                        Availability
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {lawyer.timeSlots.length > 0 ? (
                                            lawyer.timeSlots.map((daySlot) => (
                                                <div key={daySlot._id}>
                                                    <h4 className="font-medium text-gray-900">{daySlot.day}</h4>
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        {daySlot.slots.map((slot, i) => (
                                                            <Badge key={i} variant="outline" className="px-3">
                                                                {slot}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500">No availability information provided</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Phone className="h-5 w-5 mr-2 text-blue-600" />
                                        Consultation
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h4 className="font-medium text-gray-900">Fee</h4>
                                        <p className="text-2xl font-bold text-gray-900">₹{lawyer.consultationFee}</p>
                                        <p className="text-sm text-gray-500">per consultation</p>
                                    </div>

                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-2">Available Modes</h4>
                                        <div className="space-y-2">
                                            {lawyer.consultationModes.video && (
                                                <div className="flex items-center">
                                                    <Video className="h-4 w-4 mr-2 text-purple-600" />
                                                    <span>Video Call</span>
                                                </div>
                                            )}
                                            {lawyer.consultationModes.call && (
                                                <div className="flex items-center">
                                                    <Phone className="h-4 w-4 mr-2 text-green-600" />
                                                    <span>Phone Call</span>
                                                </div>
                                            )}
                                            {lawyer.consultationModes.chat && (
                                                <div className="flex items-center">
                                                    <MessageCircle className="h-4 w-4 mr-2 text-blue-600" />
                                                    <span>Chat</span>
                                                </div>
                                            )}
                                            {lawyer.consultationModes.inPerson && (
                                                <div className="flex items-center">
                                                    <User className="h-4 w-4 mr-2 text-orange-600" />
                                                    <span>In-Person</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* <Button
                                        className="w-full mt-4"
                                        onClick={handleBookConsultation}
                                    >
                                        Book Consultation
                                    </Button> */}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Languages className="h-5 w-5 mr-2 text-blue-600" />
                                        Languages
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {lawyer.languagesSpoken.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {lawyer.languagesSpoken.map((lang, i) => (
                                                <Badge key={i} variant="secondary">
                                                    {lang}
                                                </Badge>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500">No languages specified</p>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <ShieldCheck className="h-5 w-5 mr-2 text-blue-600" />
                                        Verification
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-700">Platform Verified</span>
                                        {lawyer.verifiedByPlatform ? (
                                            <Badge variant="default">Verified</Badge>
                                        ) : (
                                            <Badge variant="secondary">Not Verified</Badge>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-700">KYC Status</span>
                                        <Badge
                                            variant={
                                                lawyer.kycStatus === "verified"
                                                    ? "default"
                                                    : lawyer.kycStatus === "pending"
                                                        ? "secondary"
                                                        : "destructive"
                                            }
                                        >
                                            {lawyer.kycStatus.charAt(0).toUpperCase() + lawyer.kycStatus.slice(1)}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}