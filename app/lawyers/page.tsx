"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
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
  Search,
  User,
  Award,
  Calendar,
  Loader,
  AlertCircle,
  SlidersHorizontal,
  ArrowUpDown,
  ChevronDown,
  X,
} from "lucide-react"
import Link from "next/link"
import axios from "axios"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"

// ─── Types ────────────────────────────────────────────────────────────────────
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
  consultationModes: { video: boolean; call: boolean; chat: boolean; inPerson: boolean }
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

// ─── Static data ──────────────────────────────────────────────────────────────
const SPECIALIZATIONS = [
  "All Specializations", "Criminal Law", "Civil Law", "Family Law", "Divorce Law",
  "Child Custody Law", "Property Law", "Real Estate Law", "Corporate Law", "Startup Law",
  "Contract Law", "Intellectual Property Law", "Trademark Law", "Patent Law",
  "Cyber Crime Law", "Consumer Court Law", "Labour & Employment Law", "Tax Law",
  "GST Law", "Banking & Finance Law", "Debt Recovery Law", "Immigration Law",
  "Cheque Bounce Law", "Motor Accident Law", "Insurance Law", "Arbitration Law",
  "High Court Law", "Supreme Court Law", "Service Matter Law", "RERA Law",
  "Environmental Law", "Constitutional Law",
]

const STATES = [
  "All States", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
  "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
]

const EXPERIENCE_LEVELS = ["All Experience", "0-5 years", "5-10 years", "10-20 years", "20+ years"]

const LANGUAGES = [
  "All Languages", "Hindi", "English", "Marathi", "Gujarati", "Telugu", "Tamil",
  "Kannada", "Bengali", "Punjabi", "Malayalam", "Odia", "Assamese", "Maithili",
  "Bhojpuri", "Rajasthani",
]

const SORT_OPTIONS = [
  { value: "rating", label: "Top Rated" },
  { value: "experience", label: "Most Experienced" },
  { value: "consultationFee", label: "Fee: Low to High" },
  { value: "reviews", label: "Most Reviewed" },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function FilterSelect({
  label, value, onChange, options,
}: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{label}</p>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-9 text-sm bg-white border-slate-200 text-slate-700 focus:ring-1 focus:ring-slate-300 rounded-lg">
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent className="rounded-xl border-slate-200 shadow-lg">
          {options.map((opt) => (
            <SelectItem key={opt} value={opt} className="text-sm">
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

function LawyerAvatar({ lawyer }: { lawyer: Lawyer }) {
  const initials = lawyer.fullName
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  const colors = [
    "bg-blue-50 text-blue-700",
    "bg-emerald-50 text-emerald-700",
    "bg-violet-50 text-violet-700",
    "bg-amber-50 text-amber-700",
  ]
  const color = colors[lawyer.fullName.charCodeAt(0) % colors.length]

  if (lawyer.profilePhoto) {
    return (
      <div className="relative w-14 h-14 shrink-0">
        <img
          src={lawyer.profilePhoto}
          alt={lawyer.fullName}
          className="w-14 h-14 rounded-full object-cover ring-2 ring-white"
        />
        {lawyer.verified && (
          <span className="absolute -bottom-0.5 -right-0.5 bg-blue-600 rounded-full p-0.5">
            <Award className="h-3 w-3 text-white" />
          </span>
        )}
      </div>
    )
  }

  return (
    <div className="relative w-14 h-14 shrink-0">
      <div className={cn("w-14 h-14 rounded-full flex items-center justify-center text-base font-semibold ring-2 ring-white", color)}>
        {initials}
      </div>
      {lawyer.verified && (
        <span className="absolute -bottom-0.5 -right-0.5 bg-blue-600 rounded-full p-0.5">
          <Award className="h-3 w-3 text-white" />
        </span>
      )}
    </div>
  )
}

function ConsultationModeBadge({ mode, icon: Icon, label, active }: {
  mode: string; icon: any; label: string; active: boolean
}) {
  if (!active) return null
  return (
    <span className="inline-flex items-center gap-1 text-xs text-slate-500 border border-slate-200 rounded-md px-2 py-0.5">
      <Icon className="h-3 w-3" />
      {label}
    </span>
  )
}

function LawyerCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6">
      <div className="flex gap-4">
        <Skeleton className="w-14 h-14 rounded-full shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-4 w-36" />
        </div>
        <div className="hidden md:flex flex-col gap-2 items-end w-36">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-9 w-36" />
          <Skeleton className="h-9 w-36" />
        </div>
      </div>
      <Skeleton className="h-4 w-full mt-4" />
      <Skeleton className="h-4 w-3/4 mt-2" />
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
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
  const [filtersOpen, setFiltersOpen] = useState(false)

  const [bookingOpen, setBookingOpen] = useState(false)
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [selectedMode, setSelectedMode] = useState<string>("video")
  const [bookingLoading, setBookingLoading] = useState(false)
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([])
  const [fetchingSlots, setFetchingSlots] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) router.push("/auth/login?redirect=/lawyers")
  }, [router])

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) return
        setLoading(true)
        setError(null)
        const response = await axios.get(
          "https://nyaymitra-backend-production.up.railway.app/api/v1/lawyer/all",
          { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
        )
        const lawyersData = response.data?.lawyers?.map((lawyer: any) => ({
          id: lawyer.lawyerDetails?._id || lawyer._id || "",
          userId: lawyer.lawyerDetails?.userId || lawyer.userId || "",
          fullName: lawyer.userInfo?.fullName || "",
          profilePhoto: lawyer.userInfo?.profilePhoto || lawyer.userInfo?.avatar || "",
          specialization: lawyer.lawyerDetails?.specialization || [],
          experience: Number(lawyer.lawyerDetails?.experience) || 0,
          rating: lawyer.lawyerDetails?.averageRating || 0,
          reviews: lawyer.lawyerDetails?.totalReviews || 0,
          city: lawyer.userInfo?.address?.city || lawyer.lawyerDetails?.city || "",
          state: lawyer.userInfo?.address?.state || lawyer.lawyerDetails?.state || "",
          languages: lawyer.lawyerDetails?.languagesSpoken || [],
          consultationFee: lawyer.lawyerDetails?.consultationFee || 0,
          verified: lawyer.lawyerDetails?.verifiedByPlatform || false,
          bio: lawyer.lawyerDetails?.bio || "Professional lawyer",
          consultationModes: lawyer.lawyerDetails?.consultationModes || {
            video: false, call: false, chat: false, inPerson: false,
          },
          barCouncilId: lawyer.lawyerDetails?.barCouncilId || "",
          yearsPracticing: lawyer.lawyerDetails?.yearsPracticing || 0,
          kycStatus: lawyer.lawyerDetails?.kycStatus || "pending",
          availability: lawyer.lawyerDetails?.kycStatus === "verified" ? "Available" : "Soon",
        })) || []
        setLawyers(lawyersData)
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch lawyers. Please try again.")
      } finally {
        setLoading(false)
      }
    }
    fetchLawyers()
  }, [])

  useEffect(() => {
    const fetchSlots = async () => {
      if (!selectedDate || !selectedLawyer) return
      try {
        setFetchingSlots(true)
        const token = localStorage.getItem("token")
        const response = await axios.get(
          `https://nyaymitra-backend-production.up.railway.app/api/v1/lawyer/${selectedLawyer.userId}/check?date=${selectedDate.toISOString()}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        setAvailableSlots(response.data.data?.availableSlots || [])
      } catch {
        toast({ title: "Error", description: "Failed to fetch available slots", variant: "destructive" })
      } finally {
        setFetchingSlots(false)
      }
    }
    fetchSlots()
  }, [selectedDate, selectedLawyer, toast])

  const filteredLawyers = lawyers
    .filter((lawyer) => {
      const q = searchTerm.toLowerCase()
      const matchesSearch =
        lawyer.fullName?.toLowerCase().includes(q) ||
        lawyer.specialization?.some((s) => s.toLowerCase().includes(q)) ||
        lawyer.bio?.toLowerCase().includes(q)
      const matchesSpec =
        !selectedSpecialization || selectedSpecialization === "All Specializations" ||
        lawyer.specialization?.some((s) => s.toLowerCase().includes(selectedSpecialization.toLowerCase()))
      const matchesState = !selectedState || selectedState === "All States" || lawyer.state === selectedState
      const matchesExp =
        !selectedExperience || selectedExperience === "All Experience" ||
        (selectedExperience === "0-5 years" && lawyer.experience <= 5) ||
        (selectedExperience === "5-10 years" && lawyer.experience > 5 && lawyer.experience <= 10) ||
        (selectedExperience === "10-20 years" && lawyer.experience > 10 && lawyer.experience <= 20) ||
        (selectedExperience === "20+ years" && lawyer.experience > 20)
      const matchesLang =
        !selectedLanguage || selectedLanguage === "All Languages" ||
        lawyer.languages?.includes(selectedLanguage)
      return matchesSearch && matchesSpec && matchesState && matchesExp && matchesLang
    })
    .sort((a, b) => {
      const av = a[sortBy as keyof Lawyer] || 0
      const bv = b[sortBy as keyof Lawyer] || 0
      if (typeof av === "number" && typeof bv === "number") {
        return sortOrder === "desc" ? bv - av : av - bv
      }
      return 0
    })

  const activeFilterCount = [selectedSpecialization, selectedState, selectedExperience, selectedLanguage]
    .filter((v) => v && !v.startsWith("All")).length

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
    const modes = lawyer.consultationModes
    setSelectedMode(modes.video ? "video" : modes.call ? "call" : modes.chat ? "chat" : "inPerson")
  }

  const handleBooking = async () => {
    if (!selectedLawyer || !selectedDate || !selectedTime || !selectedMode) {
      toast({ title: "Missing fields", description: "Please select all required fields", variant: "destructive" })
      return
    }
    try {
      setBookingLoading(true)
      setBookingOpen(false)
      const token = localStorage.getItem("token")
      const userId = localStorage.getItem("userId")
      if (!token || !userId) {
        router.push("/auth/login?redirect=/lawyers")
        return
      }
      const orderRes = await axios.post(
        "https://nyaymitra-backend-production.up.railway.app/api/v1/payment/create-order",
        {
          amount: selectedLawyer.consultationFee,
          currency: "INR",
          receipt: `booking_${Date.now()}`,
          notes: { userId, lawyerId: selectedLawyer.userId, mode: selectedMode, slot: selectedTime, date: selectedDate.toISOString() },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      const order = orderRes.data.order
      await loadRazorpay()
      await new Promise((r) => setTimeout(r, 300))
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "NyayMitra",
        description: `Consultation with ${selectedLawyer.fullName}`,
        image: "/logo.png",
        order_id: order.id,
        handler: async (response: any) => {
          try {
            const verifyRes = await axios.post(
              "https://nyaymitra-backend-production.up.railway.app/api/v1/payment/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            )
            if (verifyRes.data.success) {
              const bookingRes = await axios.post(
                "https://nyaymitra-backend-production.up.railway.app/api/v1/booking/book",
                {
                  userId, lawyerId: selectedLawyer.userId,
                  date: selectedDate.toISOString(), slot: selectedTime,
                  mode: selectedMode, paymentId: response.razorpay_payment_id,
                  paymentMode: "razorpay", amount: selectedLawyer.consultationFee,
                },
                { headers: { Authorization: `Bearer ${token}` } }
              )
              toast({ title: "Booking Confirmed", description: `Consultation with ${selectedLawyer.fullName} is confirmed.` })
              router.push(`/bookings/${bookingRes.data.booking._id}`)
            }
          } catch {
            toast({ title: "Verification failed", description: "Please contact support.", variant: "destructive" })
            setBookingOpen(true)
          }
        },
        prefill: {
          name: localStorage.getItem("userName") || "",
          email: localStorage.getItem("userEmail") || "",
          contact: localStorage.getItem("userPhone") || "",
        },
        theme: { color: "#1d4ed8" },
        modal: { ondismiss: () => setBookingOpen(true) },
      }
      const rzp = new (window as any).Razorpay(options)
      rzp.open()
    } catch {
      toast({ title: "Booking failed", description: "Failed to process booking.", variant: "destructive" })
      setBookingOpen(true)
    } finally {
      setBookingLoading(false)
    }
  }

  // ── Error ──
  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-sm text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
            <AlertCircle className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Something went wrong</h3>
            <p className="text-sm text-slate-500 mt-1">{error}</p>
          </div>
          <div className="flex gap-2 justify-center">
            <Button size="sm" onClick={() => window.location.reload()}>Try again</Button>
            <Button size="sm" variant="outline" onClick={() => router.push("/")}>Go home</Button>
          </div>
        </div>
      </div>
    )
  }

  // ── Main render ──
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* ── Nav ── */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between py-3.5">
          <Link href="/" className="flex items-center gap-2 text-slate-900">
            <div className="bg-blue-600 rounded-lg p-1.5">
              <Scale className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-base tracking-tight">NyayMitra</span>
          </Link>
          <nav className="flex items-center gap-2">
            <Link href="/legal-gpt">
              <Button variant="ghost" size="sm" className="text-slate-600 text-sm">
                Ask AI
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-sm">
                Join as Lawyer
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* ── Page heading ── */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Find a Lawyer</h1>
          <p className="text-slate-500 mt-1 text-sm">
            Verified legal professionals across India — book a consultation in minutes.
          </p>
        </div>

        {/* ── Search + Filter row ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <Input
              placeholder="Search by name, specialization or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-10 text-sm bg-white border-slate-200 rounded-xl focus-visible:ring-1 focus-visible:ring-blue-400"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={cn(
              "h-10 gap-2 rounded-xl border-slate-200 text-slate-600 text-sm shrink-0",
              filtersOpen && "bg-slate-100"
            )}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </Button>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="h-10 w-44 text-sm bg-white border-slate-200 rounded-xl shrink-0">
              <ArrowUpDown className="h-3.5 w-3.5 text-slate-400 mr-1.5" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200">
              {SORT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value} className="text-sm">
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* ── Filter panel ── */}
        {filtersOpen && (
          <div className="bg-white border border-slate-100 rounded-2xl p-5 mb-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <FilterSelect label="Area of Law" value={selectedSpecialization} onChange={setSelectedSpecialization} options={SPECIALIZATIONS} />
            <FilterSelect label="State" value={selectedState} onChange={setSelectedState} options={STATES} />
            <FilterSelect label="Experience" value={selectedExperience} onChange={setSelectedExperience} options={EXPERIENCE_LEVELS} />
            <FilterSelect label="Language" value={selectedLanguage} onChange={setSelectedLanguage} options={LANGUAGES} />
            {activeFilterCount > 0 && (
              <div className="col-span-2 sm:col-span-4 flex justify-end">
                <button
                  onClick={resetFilters}
                  className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 transition-colors"
                >
                  <X className="h-3 w-3" /> Clear filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── Result count ── */}
        {!loading && (
          <p className="text-sm text-slate-400 mb-4">
            {filteredLawyers.length === 0
              ? "No lawyers match your search"
              : `${filteredLawyers.length} lawyer${filteredLawyers.length !== 1 ? "s" : ""} found`}
          </p>
        )}

        {/* ── Cards ── */}
        <div className="space-y-4">
          {loading
            ? [...Array(4)].map((_, i) => <LawyerCardSkeleton key={i} />)
            : filteredLawyers.map((lawyer) => (
              <article
                key={lawyer.id}
                className="bg-white rounded-2xl border border-slate-100 p-6 hover:border-slate-200 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row gap-5">
                  {/* Left: info */}
                  <div className="flex gap-4 flex-1 min-w-0">
                    <LawyerAvatar lawyer={lawyer} />
                    <div className="min-w-0 flex-1">
                      {/* Name + status */}
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h2 className="font-semibold text-slate-900 text-base leading-tight truncate">
                          {lawyer.fullName}
                        </h2>
                        {lawyer.kycStatus === "verified" && (
                          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs px-2 py-0.5 rounded-full font-medium">
                            <Award className="h-3 w-3" /> KYC Verified
                          </span>
                        )}
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded-full font-medium",
                          lawyer.availability === "Available"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-slate-100 text-slate-500"
                        )}>
                          {lawyer.availability}
                        </span>
                      </div>

                      {/* Specializations */}
                      <div className="flex flex-wrap gap-1 mb-2">
                        {lawyer.specialization.slice(0, 3).map((spec, i) => (
                          <span key={i} className="text-xs text-slate-500 border border-slate-200 rounded-md px-2 py-0.5">
                            {spec}
                          </span>
                        ))}
                        {lawyer.specialization.length > 3 && (
                          <span className="text-xs text-slate-400 px-1">+{lawyer.specialization.length - 3} more</span>
                        )}
                      </div>

                      {/* Meta row */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {lawyer.experience} yrs experience
                        </span>
                        {(lawyer.city || lawyer.state) && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {[lawyer.city, lawyer.state].filter(Boolean).join(", ")}
                          </span>
                        )}
                        {lawyer.reviews > 0 && (
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            {lawyer.reviews} reviews
                          </span>
                        )}
                      </div>

                      {/* Bio */}
                      <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                        {lawyer.bio}
                      </p>

                      {/* Modes + languages */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-3">
                        <ConsultationModeBadge mode="video" icon={Video} label="Video" active={lawyer.consultationModes.video} />
                        <ConsultationModeBadge mode="call" icon={Phone} label="Call" active={lawyer.consultationModes.call} />
                        <ConsultationModeBadge mode="chat" icon={MessageCircle} label="Chat" active={lawyer.consultationModes.chat} />
                        <ConsultationModeBadge mode="inPerson" icon={User} label="In-person" active={lawyer.consultationModes.inPerson} />
                        {lawyer.languages.slice(0, 3).map((lang, i) => (
                          <span key={i} className="text-xs text-slate-400 bg-slate-50 rounded-md px-2 py-0.5">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: price + CTA */}
                  <div className="flex sm:flex-col sm:items-end justify-between items-center sm:w-44 shrink-0 gap-3 pt-1">
                    <div className="text-right">
                      <p className="text-xl font-semibold text-slate-900">
                        ₹{lawyer.consultationFee.toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-400">per consultation</p>
                    </div>
                    <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm h-9 rounded-xl flex-1 sm:flex-none sm:w-full"
                        onClick={() => openBookingDialog(lawyer)}
                      >
                        <Calendar className="h-3.5 w-3.5 mr-1.5" />
                        Book
                      </Button>
                      <Link href={`/lawyers/${lawyer.id}`} className="flex-1 sm:flex-none sm:w-full">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full text-sm h-9 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50"
                        >
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
        </div>

        {/* ── Empty state ── */}
        {!loading && filteredLawyers.length === 0 && (
          <div className="text-center py-20">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <User className="h-5 w-5 text-slate-400" />
            </div>
            <h3 className="font-semibold text-slate-900">No results found</h3>
            <p className="text-sm text-slate-500 mt-1 mb-4">
              Try adjusting your filters or search for something else.
            </p>
            <Button size="sm" variant="outline" onClick={resetFilters} className="rounded-xl">
              Reset Filters
            </Button>
          </div>
        )}
      </main>

      {/* ── Booking Dialog ── */}
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl p-0 overflow-hidden">
          <div className="px-6 pt-6 pb-4 border-b border-slate-100">
            <DialogTitle className="text-base font-semibold text-slate-900">
              Book a Consultation
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500 mt-0.5">
              {selectedLawyer?.fullName}
            </DialogDescription>
          </div>

          {selectedLawyer && (
            <div className="px-6 py-5 space-y-5">
              {/* Mode */}
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-2">
                  Consultation Mode
                </p>
                <RadioGroup
                  value={selectedMode}
                  onValueChange={setSelectedMode}
                  className="grid grid-cols-2 gap-2"
                >
                  {(["video", "call", "chat", "inPerson"] as const).map((mode) => {
                    const icons = { video: Video, call: Phone, chat: MessageCircle, inPerson: User }
                    const labels = { video: "Video Call", call: "Phone Call", chat: "Chat", inPerson: "In-Person" }
                    if (!selectedLawyer.consultationModes[mode]) return null
                    const Icon = icons[mode]
                    return (
                      <div key={mode}>
                        <RadioGroupItem value={mode} id={mode} className="peer sr-only" />
                        <Label
                          htmlFor={mode}
                          className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-200 p-3 text-sm text-slate-600 cursor-pointer hover:bg-slate-50 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 peer-data-[state=checked]:text-blue-700 transition-all"
                        >
                          <Icon className="h-4 w-4" />
                          {labels[mode]}
                        </Label>
                      </div>
                    )
                  })}
                </RadioGroup>
              </div>

              {/* Date */}
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-2">Date</p>
                <DatePicker
                  date={selectedDate}
                  setDate={setSelectedDate}
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                />
              </div>

              {/* Slots */}
              {selectedDate && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-2">
                    Available Slots
                  </p>
                  {fetchingSlots ? (
                    <div className="flex justify-center py-4">
                      <Loader className="h-4 w-4 animate-spin text-slate-400" />
                    </div>
                  ) : availableSlots.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot.slot}
                          onClick={() => setSelectedTime(slot.slot)}
                          className={cn(
                            "text-xs py-2 rounded-lg border transition-all",
                            selectedTime === slot.slot
                              ? "bg-blue-600 text-white border-blue-600"
                              : "border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50"
                          )}
                        >
                          {slot.startTime}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-400">No available slots for this date.</p>
                  )}
                </div>
              )}

              {/* Summary */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-sm text-slate-500">Total</span>
                <span className="text-lg font-semibold text-slate-900">
                  ₹{selectedLawyer.consultationFee.toLocaleString()}
                </span>
              </div>

              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl h-10 text-sm"
                onClick={handleBooking}
                disabled={!selectedDate || !selectedTime || bookingLoading}
              >
                {bookingLoading ? (
                  <>
                    <Loader className="h-3.5 w-3.5 mr-2 animate-spin" />
                    Processing…
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