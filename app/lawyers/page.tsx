"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Scale,
  Star,
  MapPin,
  Clock,
  Phone,
  Video,
  MessageCircle,
  Filter,
  Search,
  User,
  Award,
  Calendar,
  Loader,
  AlertCircle,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import Link from "next/link"
import axios from "axios"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { loadRazorpay } from "@/lib/razorpay"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { DatePicker } from "@/components/ui/date-picker"
import { TimePicker } from "@/components/ui/time-picker"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Lawyer {
  id: string
  userId: string
  fullName: string
  specialization: string[]
  experience: number
  rating: number
  reviews: number
  city: string
  state: string
  languages: string[]
  consultationFee: number
  availability: string
  profilePhoto?: string
  avatar?: string
  verified: boolean
  bio: string
  consultationModes: {
    video: boolean
    call: boolean
    chat: boolean
    inPerson: boolean
  }
  lawFirm?: string
  barCouncilId: string
  yearsPracticing: number
  kycStatus: string
}

interface AvailableSlot {
  startTime: string
  endTime: string
  slot: string
  durationMinutes: number
}

export default function LawyersPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialization, setSelectedSpecialization] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [selectedExperience, setSelectedExperience] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("")
  const [sortBy, setSortBy] = useState("rating")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [lawyers, setLawyers] = useState<Lawyer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Booking state
  const [bookingOpen, setBookingOpen] = useState(false)
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [selectedMode, setSelectedMode] = useState<string>("video")
  const [bookingLoading, setBookingLoading] = useState(false)
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([])
  const [fetchingSlots, setFetchingSlots] = useState(false)

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/auth/login?redirect=/lawyers")
    }
  }, [router])

  // Fetch lawyers data
  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) return

        setLoading(true)
        setError(null)

        const response = await axios.get("https://nyaymitra-backend-production.up.railway.app/api/v1/lawyer/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })

        const lawyersData = response.data?.lawyers?.map((lawyer: any) => ({
          id: lawyer.lawyerDetails?._id || lawyer._id || '',
          userId: lawyer.lawyerDetails?.userId || lawyer.userId || '',
          fullName: lawyer.userInfo?.fullName || '',
          profilePhoto: lawyer.userInfo?.profilePhoto || lawyer.userInfo?.avatar || '',
          specialization: lawyer.lawyerDetails?.specialization || [], // ✅ This is correct
          experience: Number(lawyer.lawyerDetails?.experience) || 0,
          rating: lawyer.lawyerDetails?.averageRating || 0,
          reviews: lawyer.lawyerDetails?.totalReviews || 0,
          city: lawyer.userInfo?.address?.city || lawyer.lawyerDetails?.city || '',
          state: lawyer.userInfo?.address?.state || lawyer.lawyerDetails?.state || '',
          languages: lawyer.lawyerDetails?.languagesSpoken || [],
          consultationFee: lawyer.lawyerDetails?.consultationFee || 0,
          verified: lawyer.lawyerDetails?.verifiedByPlatform || false,
          bio: lawyer.lawyerDetails?.bio || 'Professional lawyer',
          consultationModes: lawyer.lawyerDetails?.consultationModes || {
            video: false,
            call: false,
            chat: false,
            inPerson: false
          },
          barCouncilId: lawyer.lawyerDetails?.barCouncilId || '',
          yearsPracticing: lawyer.lawyerDetails?.yearsPracticing || 0,
          kycStatus: lawyer.lawyerDetails?.kycStatus || 'pending',
          availability: lawyer.lawyerDetails?.kycStatus === "verified" ? "Available Now" : "Available Soon"
        })) || []

        setLawyers(lawyersData)
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch lawyers. Please try again later.")
        console.error("Error fetching lawyers:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchLawyers()
  }, [])

  // Fetch available slots when date changes
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (!selectedDate || !selectedLawyer) return

      try {
        setFetchingSlots(true)
        const token = localStorage.getItem("token")
        const response = await axios.get(
          `https://nyaymitra-backend-production.up.railway.app/api/v1/lawyer/${selectedLawyer.userId}/check?date=${selectedDate.toISOString()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        setAvailableSlots(response.data.data?.availableSlots || [])
      } catch (err) {
        console.error("Error fetching available slots:", err)
        toast({
          title: "Error",
          description: "Failed to fetch available slots",
          variant: "destructive",
        })
      } finally {
        setFetchingSlots(false)
      }
    }

    fetchAvailableSlots()
  }, [selectedDate, selectedLawyer, toast])

  const specializations = [
    "All Specializations",
    "Criminal Law",
    "Civil Law",
    "Family Law",
    "Divorce Law",
    "Child Custody Law",
    "Property Law",
    "Real Estate Law",
    "Corporate Law",
    "Startup Law",
    "Contract Law",
    "Intellectual Property Law",
    "Trademark Law",
    "Patent Law",
    "Cyber Crime Law",
    "Consumer Court Law",
    "Labour & Employment Law",
    "Tax Law",
    "GST Law",
    "Banking & Finance Law",
    "Debt Recovery Law",
    "Immigration Law",
    "Cheque Bounce Law",
    "Motor Accident Law",
    "Insurance Law",
    "Arbitration Law",
    "High Court Law",
    "Supreme Court Law",
    "Service Matter Law",
    "RERA Law",
    "Environmental Law",
    "Constitutional Law"
  ]


  const states = [
    "All States",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
  ]


  const experienceLevels = ["All Experience", "0-5 years", "5-10 years", "10-20 years", "20+ years"]

  const languages = [
    "All Languages",
    "Hindi",
    "English",
    "Marathi",
    "Gujarati",
    "Telugu",
    "Tamil",
    "Kannada",
    "Bengali",
    "Punjabi",
    "Malayalam",
    "Odia",
    "Assamese",
    "Maithili",
    "Bhojpuri",
    "Rajasthani",

  ]

  const sortOptions = [
    { value: "rating", label: "Rating" },
    { value: "experience", label: "Experience" },
    { value: "consultationFee", label: "Consultation Fee" },
    { value: "reviews", label: "Number of Reviews" }
  ]

  const filteredLawyers = lawyers
    .filter((lawyer) => {
      const searchTermLower = searchTerm.toLowerCase()

      const matchesSearch =
        (lawyer.fullName?.toLowerCase()?.includes(searchTermLower) || false) ||
        (lawyer.specialization?.some(spec => spec?.toLowerCase()?.includes(searchTermLower)) || false) ||
        (lawyer.bio?.toLowerCase()?.includes(searchTermLower) || false)

      const matchesSpecialization =
        !selectedSpecialization ||
        selectedSpecialization === "All Specializations" ||
        (lawyer.specialization && lawyer.specialization.some(spec =>
          spec.toLowerCase() === selectedSpecialization.toLowerCase() ||
          spec.toLowerCase().includes(selectedSpecialization.toLowerCase())
        ))
      if (selectedSpecialization && selectedSpecialization !== "All Specializations") {
        console.log('Lawyer:', lawyer.fullName)
        console.log('Specializations:', lawyer.specialization)
        console.log('Selected:', selectedSpecialization)
        console.log('Matches:', matchesSpecialization)
      }

      const matchesState =
        !selectedState ||
        selectedState === "All States" ||
        lawyer.state === selectedState

      const matchesExperience =
        !selectedExperience ||
        selectedExperience === "All Experience" ||
        (selectedExperience === "0-5 years" && lawyer.experience <= 5) ||
        (selectedExperience === "5-10 years" && lawyer.experience > 5 && lawyer.experience <= 10) ||
        (selectedExperience === "10-20 years" && lawyer.experience > 10 && lawyer.experience <= 20) ||
        (selectedExperience === "20+ years" && lawyer.experience > 20)

      const matchesLanguage =
        !selectedLanguage ||
        selectedLanguage === "All Languages" ||
        (lawyer.languages?.includes(selectedLanguage) || false)

      return matchesSearch && matchesSpecialization && matchesState && matchesExperience && matchesLanguage
    })
    .sort((a, b) => {
      const aValue = a[sortBy as keyof Lawyer] || 0
      const bValue = b[sortBy as keyof Lawyer] || 0

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === "desc" ? bValue - aValue : aValue - bValue
      }
      return 0
    })

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc")
  }

  const resetFilters = () => {
    setSearchTerm("")
    setSelectedSpecialization("")
    setSelectedState("")
    setSelectedExperience("")
    setSelectedLanguage("")
    setSortBy("rating")
    setSortOrder("desc")
  }

  const openBookingDialog = (lawyer: Lawyer) => {
    setSelectedLawyer(lawyer)
    setBookingOpen(true)
    setSelectedDate(undefined)
    setSelectedTime("")
    // Set default mode based on what lawyer supports
    if (lawyer.consultationModes.video) {
      setSelectedMode("video")
    } else if (lawyer.consultationModes.call) {
      setSelectedMode("call")
    } else if (lawyer.consultationModes.chat) {
      setSelectedMode("chat")
    } else if (lawyer.consultationModes.inPerson) {
      setSelectedMode("inPerson")
    }
  }

  const handleBooking = async () => {
    if (!selectedLawyer || !selectedDate || !selectedTime || !selectedMode) {
      toast({
        title: "Error",
        description: "Please select all required fields",
        variant: "destructive",
      })
      return
    }

    try {
      setBookingLoading(true)

      // Close the booking dialog first
      setBookingOpen(false)

      const token = localStorage.getItem("token")
      const userId = localStorage.getItem("userId")

      if (!token || !userId) {
        toast({
          title: "Login Required",
          description: "Please log in to proceed with payment",
          variant: "destructive",
        })
        router.push("/auth/login?redirect=/lawyers")
        return
      }

      // Create Razorpay order
      const orderResponse = await axios.post(
        "https://nyaymitra-backend-production.up.railway.app/api/v1/payment/create-order",
        {
          amount: selectedLawyer.consultationFee,
          currency: "INR",
          receipt: `booking_${Date.now()}`,
          notes: {
            userId,
            lawyerId: selectedLawyer.userId,
            mode: selectedMode,
            slot: selectedTime,
            date: selectedDate.toISOString()
          }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const order = orderResponse.data.order

      // Load Razorpay script
      await loadRazorpay()

      // Add a small delay to ensure the booking dialog is fully closed
      await new Promise(resolve => setTimeout(resolve, 300))

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Nyay Mitra",
        description: `Consultation with ${selectedLawyer.fullName}`,
        image: "/logo.png",
        order_id: order.id,
        handler: async function (response: any) {
          try {
            // Verify payment
            const verifyResponse = await axios.post(
              "https://nyaymitra-backend-production.up.railway.app/api/v1/payment/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )

            if (verifyResponse.data.success) {
              // Create booking
              const bookingResponse = await axios.post(
                "https://nyaymitra-backend-production.up.railway.app/api/v1/booking/book",
                {
                  userId,
                  lawyerId: selectedLawyer.userId,
                  date: selectedDate.toISOString(),
                  slot: selectedTime,
                  mode: selectedMode,
                  paymentId: response.razorpay_payment_id,
                  paymentMode: "razorpay",
                  amount: selectedLawyer.consultationFee
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )

              toast({
                title: "Booking Confirmed",
                description: `Your consultation with ${selectedLawyer.fullName} is confirmed`,
              })
              router.push(`/bookings/${bookingResponse.data.booking._id}`)
            }
          } catch (err) {
            console.error("Payment verification failed:", err)
            toast({
              title: "Error",
              description: "Payment verification failed",
              variant: "destructive",
            })
            // Reopen booking dialog if payment fails
            setBookingOpen(true)
          }
        },
        prefill: {
          name: localStorage.getItem("userName") || "",
          email: localStorage.getItem("userEmail") || "",
          contact: localStorage.getItem("userPhone") || "",
        },
        notes: {
          address: "Nyay Mitra Legal Services",
        },
        theme: {
          color: "#2563EB",
        },
        modal: {
          ondismiss: () => {
            // Reopen booking dialog if user closes Razorpay
            setBookingOpen(true)
          }
        }
      }

      const rzp = new (window as any).Razorpay(options)
      rzp.open()

    } catch (err) {
      console.error("Booking failed:", err)
      toast({
        title: "Error",
        description: "Failed to process booking",
        variant: "destructive",
      })
      // Reopen booking dialog if something fails
      setBookingOpen(true)
    } finally {
      setBookingLoading(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar Skeleton */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Filter className="h-5 w-5 mr-2" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Lawyers List Skeleton */}
            <div className="lg:col-span-3 space-y-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-start space-x-4">
                          <Skeleton className="h-16 w-16 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-6 w-48" />
                            <Skeleton className="h-4 w-32" />
                          </div>
                        </div>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <div className="flex space-x-4">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                      <div className="md:w-64 space-y-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="max-w-md text-center p-6 bg-white rounded-lg shadow-md border border-red-100">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="mt-3 text-lg font-medium text-gray-900">Error loading lawyers</h3>
          <p className="mt-2 text-gray-600">{error}</p>
          <div className="mt-6 space-x-3">
            <Button onClick={() => window.location.reload()}>Try Again</Button>
            <Button variant="outline" onClick={() => router.push("/")}>
              Return Home
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Scale className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">NyayMitra</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/legal-gpt">
                <Button variant="outline">Ask AI</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Join as Lawyer</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Verified Lawyers</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with experienced lawyers across India for expert legal advice
          </p>
        </div>

        {/* Mobile Filters Button */}
        <div className="lg:hidden mb-6">
          <Button
            variant="outline"
            className="w-full flex items-center justify-between"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          >
            <span>Filters</span>
            {mobileFiltersOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={cn(
            "lg:col-span-1",
            mobileFiltersOpen ? "block" : "hidden lg:block"
          )}>
            <Card className="sticky top-24 shadow-lg dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-lg text-gray-900 dark:text-white">
                  <Filter className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                  Refine Your Search
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                    <Input
                      placeholder="Search by name or expertise..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Specialization */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Area of Law
                  </label>
                  <Select
                    value={selectedSpecialization}
                    onValueChange={setSelectedSpecialization}
                  >
                    <SelectTrigger className="bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                      {specializations.map((spec) => (
                        <SelectItem
                          key={spec}
                          value={spec}
                          className="dark:text-white dark:focus:bg-gray-700 dark:focus:text-white"
                        >
                          {spec}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* State */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Location
                  </label>
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger className="bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                      {states.map((state) => (
                        <SelectItem
                          key={state}
                          value={state}
                          className="dark:text-white dark:focus:bg-gray-700"
                        >
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Experience */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Years of Experience
                  </label>
                  <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                    <SelectTrigger className="bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                      {experienceLevels.map((level) => (
                        <SelectItem
                          key={level}
                          value={level}
                          className="dark:text-white dark:focus:bg-gray-700"
                        >
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Language */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Language
                  </label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                      {languages.map((lang) => (
                        <SelectItem
                          key={lang}
                          value={lang}
                          className="dark:text-white dark:focus:bg-gray-700"
                        >
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-blue-500 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950"
                  onClick={resetFilters}
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Lawyers List */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-gray-900">{filteredLawyers.length}</span> lawyers
              </p>
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <span className="text-sm text-gray-600 whitespace-nowrap">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select sort" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSortOrder}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {sortOrder === "desc" ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronUp className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              {filteredLawyers.map((lawyer) => (
                <Card
                  key={lawyer.id}
                  className="hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden dark:bg-gray-800"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Lawyer Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                                {lawyer.profilePhoto ? (
                                  <img
                                    src={lawyer.profilePhoto || lawyer.avatar || ''}
                                    alt={lawyer.fullName}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <User className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                )}
                              </div>

                              {lawyer.verified && (
                                <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-800 rounded-full p-1 shadow-sm">
                                  <div className="bg-blue-600 text-white p-1 rounded-full">
                                    <Award className="h-3 w-3" />
                                  </div>
                                </div>
                              )}
                              {lawyer.kycStatus === 'verified' && (
                                <div className="absolute -bottom-1 -right-8 bg-white dark:bg-gray-800 rounded-full p-1 shadow-sm">
                                  <div className="bg-green-600 text-white p-1 rounded-full text-xs px-2">
                                    KYC
                                  </div>
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                  {lawyer.fullName}
                                </h3>
                              </div>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {lawyer.specialization.map((spec, i) => (
                                  <Badge key={i} variant="outline" className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                                    {spec}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mt-2">
                                <span className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
                                  {lawyer.experience} years exp.
                                </span>
                                <span className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
                                  {lawyer.city}, {lawyer.state}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {lawyer.bio.length > 160 ? lawyer.bio.slice(0, 150) + "..." : lawyer.bio}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          <div className="flex items-center bg-yellow-50 dark:bg-yellow-950/30 px-3 py-1 rounded-full">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            {/* <span className="ml-1 font-medium text-gray-900 dark:text-white">{lawyer.rating.toFixed(1)}</span> */}
                            <span className="text-gray-600 dark:text-gray-400 text-sm ml-1">({lawyer.reviews} reviews)</span>
                          </div>

                          <Badge
                            variant={lawyer.availability === "Available Now" ? "default" : "secondary"}
                            className="px-3 py-1"
                          >
                            {lawyer.availability}
                          </Badge>

                          <div className="flex items-center space-x-1">
                            {lawyer.consultationModes.video && (
                              <Badge variant="outline" className="px-2 dark:border-purple-800 dark:text-purple-400">
                                <Video className="h-4 w-4 mr-1 text-purple-600 dark:text-purple-400" />
                                Video
                              </Badge>
                            )}
                            {lawyer.consultationModes.call && (
                              <Badge variant="outline" className="px-2 dark:border-green-800 dark:text-green-400">
                                <Phone className="h-4 w-4 mr-1 text-green-600 dark:text-green-400" />
                                Call
                              </Badge>
                            )}
                            {lawyer.consultationModes.chat && (
                              <Badge variant="outline" className="px-2 dark:border-blue-800 dark:text-blue-400">
                                <MessageCircle className="h-4 w-4 mr-1 text-blue-600 dark:text-blue-400" />
                                Chat
                              </Badge>
                            )}
                            {lawyer.consultationModes.inPerson && (
                              <Badge variant="outline" className="px-2 dark:border-orange-800 dark:text-orange-400">
                                <User className="h-4 w-4 mr-1 text-orange-600 dark:text-orange-400" />
                                In-person
                              </Badge>
                            )}
                          </div>
                        </div>

                        {lawyer.languages.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Languages:</span>
                            {lawyer.languages.map((lang, index) => (
                              <Badge key={index} variant="secondary" className="px-2 dark:bg-gray-700 dark:text-gray-300">
                                {lang}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Booking Section */}
                      <div className="md:w-64 flex flex-col justify-between">
                        <div className="text-center mb-4">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">₹{lawyer.consultationFee}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">per consultation</div>
                        </div>

                        <div className="space-y-3">
                          <Button
                            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                            onClick={() => openBookingDialog(lawyer)}
                          >
                            <Calendar className="h-4 w-4 mr-2" />
                            Book Consultation
                          </Button>
                          <Link href={`/lawyers/${lawyer.id}`}>
                            <Button variant="outline" className="w-full border-blue-500 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950">
                              View Full Profile
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredLawyers.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="text-gray-400 mb-4">
                  <User className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No lawyers match your search</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search for different terms</p>
                <Button
                  variant="outline"
                  className="border-blue-500 text-blue-600 hover:bg-blue-50"
                  onClick={resetFilters}
                >
                  Reset All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Book Consultation</DialogTitle>
            <DialogDescription>
              Schedule a consultation with {selectedLawyer?.fullName}
            </DialogDescription>
          </DialogHeader>

          {selectedLawyer && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Consultation Mode</Label>
                <RadioGroup
                  value={selectedMode}
                  onValueChange={setSelectedMode}
                  className="grid grid-cols-2 gap-2"
                >
                  {selectedLawyer.consultationModes.video && (
                    <div>
                      <RadioGroupItem value="video" id="video" className="peer sr-only" />
                      <Label
                        htmlFor="video"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Video className="mb-2 h-6 w-6" />
                        Video Call
                      </Label>
                    </div>
                  )}
                  {selectedLawyer.consultationModes.call && (
                    <div>
                      <RadioGroupItem value="call" id="call" className="peer sr-only" />
                      <Label
                        htmlFor="call"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Phone className="mb-2 h-6 w-6" />
                        Phone Call
                      </Label>
                    </div>
                  )}
                  {selectedLawyer.consultationModes.chat && (
                    <div>
                      <RadioGroupItem value="chat" id="chat" className="peer sr-only" />
                      <Label
                        htmlFor="chat"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <MessageCircle className="mb-2 h-6 w-6" />
                        Chat
                      </Label>
                    </div>
                  )}
                  {selectedLawyer.consultationModes.inPerson && (
                    <div>
                      <RadioGroupItem value="inPerson" id="inPerson" className="peer sr-only" />
                      <Label
                        htmlFor="inPerson"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <User className="mb-2 h-6 w-6" />
                        In-Person
                      </Label>
                    </div>
                  )}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Date</Label>
                <DatePicker
                  date={selectedDate}
                  setDate={setSelectedDate}
                  disabled={(date) => {
                    // Disable dates in the past
                    return date < new Date(new Date().setHours(0, 0, 0, 0))
                  }}
                />
              </div>

              {selectedDate && (
                <div className="space-y-2">
                  <Label>Available Time Slots</Label>
                  {fetchingSlots ? (
                    <div className="flex justify-center py-4">
                      <Loader className="h-5 w-5 animate-spin" />
                    </div>
                  ) : availableSlots.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2">
                      {availableSlots.map((slot) => (
                        <Button
                          key={slot.slot}
                          variant={selectedTime === slot.slot ? "default" : "outline"}
                          onClick={() => setSelectedTime(slot.slot)}
                        >
                          {slot.startTime}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No available slots for this date</p>
                  )}
                </div>
              )}

              <div className="pt-4">
                {/* <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-600">Consultation Fee</span>
                  <span className="font-medium">₹{selectedLawyer.consultationFee}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-600">Platform Fee (30%)</span>
                  <span className="font-medium">₹{Math.round(selectedLawyer.consultationFee * 0.3)}</span>
                </div> */}
                <div className="flex justify-between items-center border-t pt-4">
                  <span className="font-medium">Total Amount</span>
                  <span className="text-lg font-bold">₹{selectedLawyer.consultationFee}</span>
                </div>
              </div>

              <Button
                className="w-full mt-4"
                onClick={handleBooking}
                disabled={!selectedDate || !selectedTime || bookingLoading}
              >
                {bookingLoading ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Proceed to Payment"
                )}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}