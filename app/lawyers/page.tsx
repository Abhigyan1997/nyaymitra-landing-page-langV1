"use client"

import React, { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  Scale, Star, MapPin, Clock, Phone, Video, MessageCircle,
  Search, User, Award, Calendar, Loader, AlertCircle,
  SlidersHorizontal, X, Shield, Sparkles, CheckCircle, Menu,
  Briefcase, ChevronRight,
} from "lucide-react"
import Link from "next/link"
import axios from "axios"
import { loadRazorpay } from "@/lib/razorpay"
import { useToast } from "@/components/ui/use-toast"

// ─── Styles as a separate component with useEffect ─────────────────────────────
function GlobalStyles() {
  useEffect(() => {
    const styleId = "lawyers-page-styles"
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style")
      style.id = styleId
      style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --ink:        #0a0a0a;
          --ink-2:      #1a1a1a;
          --ink-3:      #3a3a3a;
          --ink-4:      #6b6b6b;
          --ink-5:      #9a9a9a;
          --ink-6:      #c8c8c8;
          --ink-7:      #e8e8e8;
          --ink-8:      #f4f3f0;
          --parchment:  #faf9f6;
          --white:      #ffffff;
          --gold:       #c9a84c;
          --gold-lt:    #e8c96a;
          --gold-dk:    #8b6914;
          --gold-pale:  #fdf6e3;
          --red:        #c0392b;
          --emerald:    #10b981;
          --serif:      'Cormorant Garamond', 'Georgia', serif;
          --sans:       'DM Sans', system-ui, sans-serif;
          --mono:       'DM Mono', monospace;
        }

        html { scroll-behavior: smooth; }
        body {
          background: var(--white);
          color: var(--ink);
          font-family: var(--sans);
          -webkit-font-smoothing: antialiased;
        }

        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }

        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1),
                      transform 0.7s cubic-bezier(0.22,1,0.36,1);
        }
        .reveal.is-on {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        .gold-shimmer {
          background: linear-gradient(100deg,var(--gold-dk) 0%,var(--gold) 30%,var(--gold-lt) 50%,var(--gold) 70%,var(--gold-dk) 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--mono); font-size: 9.5px; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold-dk);
        }
        .eyebrow::before, .eyebrow::after {
          content:''; width:22px; height:1px; background:var(--gold); flex-shrink:0;
        }

        .btn {
          display: inline-flex; align-items: center; justify-content: center;
          gap: 8px; font-family: var(--sans); font-size: 12px; font-weight: 600;
          letter-spacing: 0.03em; border-radius: 8px; padding: 8px 16px;
          cursor: pointer; border: none; text-decoration: none;
          transition: all 0.2s ease;
        }
        .btn-ink   { background:var(--ink); color:var(--white); }
        .btn-ink:hover { background:var(--ink-2); transform:translateY(-2px); }
        .btn-gold  { background:var(--gold); color:var(--ink); font-weight:700; }
        .btn-gold:hover { background:var(--gold-lt); transform:translateY(-2px); }
        .btn-ghost { background:transparent; color:var(--ink); border:1.5px solid var(--ink-7); }
        .btn-ghost:hover { background:var(--ink); color:var(--white); border-color:var(--ink); }
        .btn-outline { background:transparent; border:1px solid var(--ink-6); color:var(--ink-4); }
        .btn-outline:hover { border-color:var(--gold); color:var(--gold-dk); background:var(--gold-pale); }

        .nav-link {
          font-family:var(--sans); font-size:13px; font-weight:500;
          color:var(--ink-4); text-decoration:none; padding:8px 13px;
          border-radius:5px; transition:all 0.18s;
        }
        .nav-link:hover { color:var(--ink); background:var(--ink-8); }

        .lawyers-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        @media (max-width: 768px) {
          .lawyers-container { padding: 0 16px; }
        }

        .filter-panel {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-top: 16px;
          padding: 16px 20px;
          background: var(--white);
          border: 1px solid var(--ink-7);
          border-radius: 12px;
        }

        @media (max-width: 768px) {
          .filter-panel { grid-template-columns: repeat(2, 1fr); gap: 10px; padding: 14px; }
        }
        @media (max-width: 540px) {
          .filter-panel { grid-template-columns: 1fr; gap: 10px; padding: 12px; }
        }

        .lawyer-card {
          display: flex;
          gap: 20px;
          padding: 18px 20px;
          margin-bottom: 12px;
          background: var(--white);
          border: 1px solid var(--ink-7);
          border-radius: 14px;
          transition: all 0.2s ease;
        }

        .lawyer-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.05);
          border-color: var(--ink-6);
        }

        @media (max-width: 768px) {
          .lawyer-card { flex-direction: column; gap: 14px; padding: 16px; }
        }

        .avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--serif);
          font-size: 20px;
          font-weight: 600;
          flex-shrink: 0;
          position: relative;
        }

        @media (max-width: 480px) {
          .avatar { width: 48px; height: 48px; font-size: 18px; }
        }

        .avatar-badge {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--gold);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid var(--white);
        }

        .avatar-badge svg { width: 8px; height: 8px; }

        .card-right {
          margin-left: auto;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
          gap: 8px;
          min-width: 140px;
        }

        @media (max-width: 768px) {
          .card-right {
            margin-left: 0;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .card-right {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }
        }

        .fee-amount {
          font-family: var(--serif);
          font-size: 22px;
          font-weight: 700;
          color: var(--ink);
          line-height: 1.2;
        }

        @media (max-width: 768px) {
          .fee-amount { font-size: 20px; }
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--white);
          border: 1px solid var(--ink-7);
          border-radius: 10px;
          padding: 8px 16px;
          transition: all 0.2s;
          flex-wrap: wrap;
        }

        .search-bar:focus-within {
          border-color: var(--gold);
          box-shadow: 0 0 0 2px rgba(201,168,76,0.1);
        }

        @media (max-width: 640px) {
          .search-bar { padding: 10px 14px; gap: 8px; }
        }
        @media (max-width: 480px) {
          .search-bar { flex-direction: column; align-items: stretch; }
        }

        .filter-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: var(--white);
          border: 1px solid var(--ink-7);
          border-radius: 30px;
          font-size: 11px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.18s;
          white-space: nowrap;
        }

        .filter-chip:hover,
        .filter-chip.active {
          border-color: var(--gold);
          color: var(--gold-dk);
          background: var(--gold-pale);
        }

        .slot-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-top: 10px;
        }

        @media (max-width: 480px) {
          .slot-grid { grid-template-columns: repeat(2, 1fr); gap: 6px; }
        }

        .slot-btn {
          padding: 8px;
          border: 1px solid var(--ink-7);
          border-radius: 8px;
          background: var(--white);
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s;
          text-align: center;
        }

        .slot-btn:hover {
          border-color: var(--gold);
          background: var(--gold-pale);
        }

        .slot-btn.selected {
          border-color: var(--gold);
          background: var(--gold);
          color: var(--ink);
        }

        .mode-option {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border: 1px solid var(--ink-7);
          border-radius: 10px;
          background: var(--white);
          cursor: pointer;
          transition: all 0.15s;
          font-size: 13px;
        }

        .mode-option:hover,
        .mode-option.selected {
          border-color: var(--gold);
          background: var(--gold-pale);
        }

        /* Responsive Booking Modal */
        .booking-modal {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 16px;
        }

        .booking-modal-content {
          background: var(--white);
          border-radius: 20px;
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          border: 1px solid var(--ink-7);
          box-shadow: 0 24px 48px rgba(0,0,0,0.2);
        }

        @media (max-width: 640px) {
          .booking-modal { padding: 12px; }
          .booking-modal-content { max-width: calc(100% - 8px); border-radius: 16px; }
        }

        @media (max-width: 480px) {
          .booking-modal-content { max-height: 85vh; }
        }

        .step-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        @media (max-width: 480px) {
          .step-indicator { gap: 4px; margin-bottom: 16px; }
        }

        .step-dot {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 600;
          background: var(--ink-8);
          color: var(--ink-4);
          flex-shrink: 0;
        }

        @media (max-width: 480px) {
          .step-dot { width: 24px; height: 24px; font-size: 10px; }
        }

        .step-dot.active {
          background: var(--gold);
          color: var(--ink);
        }

        .step-dot.done {
          background: var(--emerald);
          color: white;
        }

        .step-line {
          width: 30px;
          height: 1px;
          background: var(--ink-7);
        }

        @media (max-width: 480px) {
          .step-line { width: 20px; }
        }

        .step-line.done {
          background: var(--emerald);
        }

        .stats-row {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--ink-7);
        }

        @media (max-width: 540px) {
          .stats-row { gap: 16px; justify-content: space-between; }
        }

        .spec-tag {
          font-size: 10px;
          padding: 2px 8px;
          background: var(--ink-8);
          border-radius: 100px;
          color: var(--ink-4);
          white-space: nowrap;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 3px;
        }

        @media (max-width: 480px) {
          .calendar-grid { gap: 2px; }
        }

        .mobile-menu {
          display: none;
        }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu { display: block !important; }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `
      document.head.appendChild(style)
    }
  }, [])

  return null
}

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
  profilePhoto?: string
  verified: boolean
  bio: string
  consultationModes: { video: boolean; call: boolean; chat: boolean; inPerson: boolean }
  kycStatus: string
}

interface AvailableSlot {
  startTime: string
  endTime: string
  slot: string
  durationMinutes: number
}

const SPECIALIZATIONS = [
  "All Specializations", "Criminal Law", "Civil Law", "Family Law", "Divorce Law",
  "Property Law", "Corporate Law", "Cyber Crime Law", "Consumer Court Law",
  "Labour Law", "Tax Law", "Cheque Bounce Law",
]

const STATES = [
  "All States", "Bihar", "Delhi", "Gujarat", "Haryana", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana",
  "Uttar Pradesh", "West Bengal",
]

const LANGUAGES = [
  "All Languages", "Hindi", "English", "Marathi", "Gujarati", "Telugu", "Tamil",
  "Kannada", "Bengali", "Punjabi",
]

const AVATAR_COLORS = ["#1a2a1e", "#1e2035", "#2a1a1a", "#1a2535", "#261e10"]

function Avatar({ lawyer }: { lawyer: Lawyer }) {
  const initials = lawyer.fullName.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase()
  const colorIndex = lawyer.fullName.length % AVATAR_COLORS.length
  return (
    <div className="avatar" style={{ background: AVATAR_COLORS[colorIndex], color: "white" }}>
      {lawyer.profilePhoto ? (
        <img src={lawyer.profilePhoto} alt={lawyer.fullName} style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
      ) : (
        initials
      )}
      {lawyer.verified && (
        <div className="avatar-badge">
          <Award size={8} color="var(--ink)" />
        </div>
      )}
    </div>
  )
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-on")
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

export default function LawyersPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpec, setSelectedSpec] = useState("All Specializations")
  const [selectedState, setSelectedState] = useState("All States")
  const [selectedLang, setSelectedLang] = useState("All Languages")
  const [sortBy, setSortBy] = useState("rating")
  const [lawyers, setLawyers] = useState<Lawyer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [bookingOpen, setBookingOpen] = useState(false)
  const [bookingStep, setBookingStep] = useState(0)
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedMode, setSelectedMode] = useState("video")
  const [bookingLoading, setBookingLoading] = useState(false)
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([])
  const [calendarMonth, setCalendarMonth] = useState(new Date())

  useEffect(() => {
    setMounted(true)
  }, [])

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
        const response = await axios.get(
          "https://nyaymitra-backend-production.up.railway.app/api/v1/lawyer/all",
          { headers: { Authorization: `Bearer ${token}` } }
        )
        const data = response.data?.lawyers?.map((l: any) => ({
          id: l.lawyerDetails?._id || l._id,
          userId: l.lawyerDetails?.userId || l.userId,
          fullName: l.userInfo?.fullName || "",
          profilePhoto: l.userInfo?.profilePhoto || "",
          specialization: l.lawyerDetails?.specialization || [],
          experience: Number(l.lawyerDetails?.experience) || 0,
          rating: l.lawyerDetails?.averageRating || 0,
          reviews: l.lawyerDetails?.totalReviews || 0,
          city: l.userInfo?.address?.city || "",
          state: l.userInfo?.address?.state || "",
          languages: l.lawyerDetails?.languagesSpoken || [],
          consultationFee: l.lawyerDetails?.consultationFee || 0,
          verified: l.lawyerDetails?.verifiedByPlatform || false,
          bio: l.lawyerDetails?.bio?.slice(0, 100) || "Experienced legal professional",
          consultationModes: l.lawyerDetails?.consultationModes || { video: true, call: true, chat: false, inPerson: false },
          kycStatus: l.lawyerDetails?.kycStatus || "pending",
        })) || []
        setLawyers(data)
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load lawyers")
      } finally {
        setLoading(false)
      }
    }
    fetchLawyers()
  }, [])

  const fetchSlots = async (date: Date) => {
    if (!selectedLawyer) return
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(
        `https://nyaymitra-backend-production.up.railway.app/api/v1/lawyer/${selectedLawyer.userId}/check?date=${date.toISOString()}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setAvailableSlots(response.data.data?.availableSlots || [])
    } catch {
      toast({ title: "Error", description: "Could not fetch availability", variant: "destructive" })
    }
  }

  const filtered = lawyers
    .filter(l => {
      const term = searchTerm.toLowerCase()
      return (
        (!term || l.fullName.toLowerCase().includes(term) || l.specialization.some(s => s.toLowerCase().includes(term))) &&
        (selectedSpec === "All Specializations" || l.specialization.includes(selectedSpec)) &&
        (selectedState === "All States" || l.state === selectedState) &&
        (selectedLang === "All Languages" || l.languages.includes(selectedLang))
      )
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "experience") return b.experience - a.experience
      if (sortBy === "consultationFee") return a.consultationFee - b.consultationFee
      return 0
    })

  const activeFilterCount = [selectedSpec, selectedState, selectedLang].filter(f => f && !f.startsWith("All")).length

  const resetFilters = () => {
    setSelectedSpec("All Specializations")
    setSelectedState("All States")
    setSelectedLang("All Languages")
    setSearchTerm("")
    setSortBy("rating")
  }

  const openBooking = (lawyer: Lawyer) => {
    setSelectedLawyer(lawyer)
    setBookingOpen(true)
    setBookingStep(0)
    setSelectedDate(undefined)
    setSelectedTime("")
    setAvailableSlots([])
    const modes = lawyer.consultationModes
    setSelectedMode(modes.video ? "video" : modes.call ? "call" : modes.chat ? "chat" : "inPerson")
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    fetchSlots(date)
    setBookingStep(2)
  }

  const handleBooking = async () => {
    if (!selectedLawyer || !selectedDate || !selectedTime || !selectedMode) {
      toast({ title: "Missing info", description: "Please complete all fields", variant: "destructive" })
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
              await axios.post(
                "https://nyaymitra-backend-production.up.railway.app/api/v1/booking/book",
                {
                  userId,
                  lawyerId: selectedLawyer.userId,
                  date: selectedDate.toISOString(),
                  slot: selectedTime,
                  mode: selectedMode,
                  paymentId: response.razorpay_payment_id,
                  paymentMode: "razorpay",
                  amount: selectedLawyer.consultationFee,
                },
                { headers: { Authorization: `Bearer ${token}` } }
              )
              toast({ title: "Booking confirmed!", description: `Consultation with ${selectedLawyer.fullName} booked.` })
              router.push("/bookings")
            }
          } catch {
            toast({ title: "Payment failed", description: "Please contact support", variant: "destructive" })
            setBookingOpen(true)
          }
        },
        prefill: {
          name: localStorage.getItem("userName") || "",
          email: localStorage.getItem("userEmail") || "",
          contact: localStorage.getItem("userPhone") || "",
        },
        theme: { color: "#c9a84c" },
      }
      const rzp = new (window as any).Razorpay(options)
      rzp.open()
    } catch {
      toast({ title: "Error", description: "Could not initiate payment", variant: "destructive" })
      setBookingOpen(true)
    } finally {
      setBookingLoading(false)
    }
  }

  const modeLabels: Record<string, { icon: React.ReactNode; label: string }> = {
    video: { icon: <Video size={13} />, label: "Video Call" },
    call: { icon: <Phone size={13} />, label: "Phone Call" },
    chat: { icon: <MessageCircle size={13} />, label: "Chat" },
    inPerson: { icon: <User size={13} />, label: "In-Person" },
  }

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  const prevMonth = () => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1))
  const nextMonth = () => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1))

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(calendarMonth)
    const firstDay = getFirstDayOfMonth(calendarMonth)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const cells = []
    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`empty-${i}`} style={{ aspectRatio: "1" }} />)
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), d)
      const isPast = date < today
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString()
      cells.push(
        <button
          key={d}
          onClick={() => !isPast && handleDateSelect(date)}
          disabled={isPast}
          style={{
            aspectRatio: "1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "6px",
            border: isSelected ? "2px solid var(--gold)" : "1px solid var(--ink-7)",
            background: isSelected ? "var(--gold-pale)" : "var(--white)",
            color: isPast ? "var(--ink-5)" : "var(--ink)",
            cursor: isPast ? "not-allowed" : "pointer",
            fontFamily: "var(--sans)",
            fontSize: "clamp(10px, 3.5vw, 12px)",
            fontWeight: isSelected ? 600 : 400,
            transition: "all 0.15s",
          }}
        >
          {d}
        </button>
      )
    }
    return cells
  }

  if (!mounted) {
    return null
  }

  if (error) {
    return (
      <>
        <GlobalStyles />
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--ink-8)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <AlertCircle size={24} color="var(--red)" />
            </div>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: "20px", marginBottom: "8px" }}>Something went wrong</h3>
            <p style={{ color: "var(--ink-4)", marginBottom: "20px" }}>{error}</p>
            <button className="btn btn-ink" onClick={() => window.location.reload()}>Try Again</button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <GlobalStyles />

      {/* Navigation */}
      <nav style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(255,255,255,0.96)",
        borderBottom: "1px solid var(--ink-7)",
        backdropFilter: "blur(16px)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 34, height: 34, background: "var(--ink)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Scale style={{ color: "white", width: 15, height: 15 }} />
            </div>
            <div>
              <div style={{ fontFamily: "var(--serif)", fontSize: "17px", fontWeight: 700, color: "var(--ink)" }}>NyayMitra</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: "6.5px", color: "var(--gold-dk)", letterSpacing: "0.14em", textTransform: "uppercase" }}>Legal Tech · India</div>
            </div>
          </Link>

          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Link href="/legal-gpt" className="nav-link" style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Sparkles size={13} /> Ask AI
            </Link>
            <Link href="/auth/signup" className="btn btn-gold" style={{ padding: "6px 16px", textDecoration: "none" }}>
              <Briefcase size={12} /> Join as Lawyer
            </Link>
          </div>

          <button
            className="mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ background: "none", border: "1px solid var(--ink-7)", borderRadius: "8px", padding: "7px 10px", cursor: "pointer" }}
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div style={{ padding: "14px 20px", borderTop: "1px solid var(--ink-7)", background: "var(--white)", display: "flex", flexDirection: "column", gap: "10px" }}>
            <Link href="/legal-gpt" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Ask AI</Link>
            <Link href="/auth/signup" className="btn btn-gold" style={{ justifyContent: "center" }} onClick={() => setMobileMenuOpen(false)}>Join as Lawyer</Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="lawyers-container" style={{ paddingTop: "32px", paddingBottom: "24px" }}>
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: "12px" }}>Find Your Counsel</div>
          <h1 style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(28px, 5vw, 44px)",
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "12px",
          }}>
            India's Finest <span className="gold-shimmer">Legal Minds</span>
          </h1>
          <p style={{ fontSize: "13px", color: "var(--ink-4)", maxWidth: 520, lineHeight: 1.6, marginBottom: "28px" }}>
            60+ verified lawyers across India. Book consultations instantly with legal experts.
          </p>

          <div className="stats-row">
            {[
              { value: "60+", label: "Lawyers" },
              { value: "20+", label: "Areas" },
              { value: "4.9★", label: "Rating" },
              { value: "<30m", label: "Response" },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{ fontFamily: "var(--serif)", fontSize: "clamp(22px, 4vw, 28px)", fontWeight: 600 }}>{stat.value}</div>
                <div style={{ fontSize: "9px", color: "var(--ink-5)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Search Bar */}
        <Reveal delay={100}>
          <div className="search-bar">
            <Search size="16" color="var(--ink-5)" style={{ flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ flex: 1, border: "none", outline: "none", fontSize: "13px", fontFamily: "var(--sans)", background: "transparent", minWidth: "120px" }}
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} style={{ background: "none", border: "none", cursor: "pointer", flexShrink: 0 }}>
                <X size="12" color="var(--ink-5)" />
              </button>
            )}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ background: "transparent", border: "none", fontSize: "10px", fontFamily: "var(--mono)", color: "var(--ink-4)", cursor: "pointer", padding: "4px" }}
            >
              <option value="rating">Top Rated</option>
              <option value="experience">Most Exp</option>
              <option value="consultationFee">Low Fee</option>
            </select>
            <button
              className={`filter-chip ${filtersOpen ? "active" : ""}`}
              onClick={() => setFiltersOpen(!filtersOpen)}
              style={{ flexShrink: 0 }}
            >
              <SlidersHorizontal size="12" /> Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>
          </div>

          {filtersOpen && (
            <div className="filter-panel">
              <select value={selectedSpec} onChange={(e) => setSelectedSpec(e.target.value)} style={{ padding: "7px 10px", borderRadius: "8px", border: "1px solid var(--ink-7)", fontSize: "12px", background: "var(--white)" }}>
                {SPECIALIZATIONS.map(s => <option key={s}>{s}</option>)}
              </select>
              <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} style={{ padding: "7px 10px", borderRadius: "8px", border: "1px solid var(--ink-7)", fontSize: "12px", background: "var(--white)" }}>
                {STATES.map(s => <option key={s}>{s}</option>)}
              </select>
              <select value={selectedLang} onChange={(e) => setSelectedLang(e.target.value)} style={{ padding: "7px 10px", borderRadius: "8px", border: "1px solid var(--ink-7)", fontSize: "12px", background: "var(--white)" }}>
                {LANGUAGES.map(l => <option key={l}>{l}</option>)}
              </select>
              {activeFilterCount > 0 && (
                <button onClick={resetFilters} style={{ background: "none", border: "none", fontSize: "11px", color: "var(--gold-dk)", cursor: "pointer", fontFamily: "var(--mono)" }}>
                  Clear all →
                </button>
              )}
            </div>
          )}
        </Reveal>

        {/* Results Count */}
        <div style={{ marginTop: "20px", marginBottom: "16px" }}>
          <span style={{ fontSize: "11px", fontFamily: "var(--mono)", color: "var(--ink-5)" }}>
            {loading ? "Loading..." : `${filtered.length} ${filtered.length === 1 ? "lawyer" : "lawyers"} found`}
          </span>
        </div>

        {/* Lawyer Cards */}
        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ padding: "16px", background: "var(--white)", border: "1px solid var(--ink-7)", borderRadius: "14px", display: "flex", gap: "16px" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--ink-8)" }} />
                <div style={{ flex: 1 }}>
                  <div style={{ width: "50%", height: 14, background: "var(--ink-8)", borderRadius: 4, marginBottom: 8 }} />
                  <div style={{ width: "70%", height: 10, background: "var(--ink-8)", borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 20px" }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--ink-8)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
              <User size="20" color="var(--ink-5)" />
            </div>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: "18px", marginBottom: "6px" }}>No lawyers found</h3>
            <p style={{ color: "var(--ink-5)", fontSize: "12px", marginBottom: "16px" }}>Try adjusting your filters</p>
            <button className="btn btn-ghost" onClick={resetFilters} style={{ padding: "6px 14px", fontSize: "11px" }}>Reset Filters</button>
          </div>
        ) : (
          <div>
            {filtered.map((lawyer, idx) => (
              <Reveal key={lawyer.id} delay={idx * 40}>
                <div className="lawyer-card">
                  <Avatar lawyer={lawyer} />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap", marginBottom: "4px" }}>
                      <h3 style={{ fontFamily: "var(--serif)", fontSize: "16px", fontWeight: 600 }}>{lawyer.fullName}</h3>
                      {lawyer.kycStatus === "verified" && (
                        <span style={{ fontSize: "8px", padding: "2px 6px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "100px", color: "var(--emerald)" }}>
                          ✓ Verified
                        </span>
                      )}
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "6px" }}>
                      {lawyer.specialization.slice(0, 2).map(spec => (
                        <span key={spec} className="spec-tag">{spec}</span>
                      ))}
                      {lawyer.specialization.length > 2 && (
                        <span style={{ fontSize: "9px", color: "var(--ink-5)" }}>+{lawyer.specialization.length - 2}</span>
                      )}
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "6px" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "10px", color: "var(--ink-4)" }}>
                        <Clock size="10" /> {lawyer.experience}y
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "10px", color: "var(--ink-4)" }}>
                        <MapPin size="10" /> {lawyer.city || lawyer.state}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "10px", color: "var(--ink-4)" }}>
                        <Star size="10" style={{ fill: "var(--gold)", color: "var(--gold)" }} /> {lawyer.rating.toFixed(1)}
                      </span>
                    </div>

                    <p style={{ fontSize: "11px", color: "var(--ink-5)", lineHeight: 1.5, marginBottom: "6px" }}>{lawyer.bio}</p>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {lawyer.consultationModes.video && <span style={{ fontSize: "9px", padding: "2px 6px", background: "var(--ink-8)", borderRadius: "100px" }}>Video</span>}
                      {lawyer.consultationModes.call && <span style={{ fontSize: "9px", padding: "2px 6px", background: "var(--ink-8)", borderRadius: "100px" }}>Call</span>}
                      {lawyer.languages.slice(0, 1).map(lang => (
                        <span key={lang} style={{ fontSize: "9px", padding: "2px 6px", background: "var(--gold-pale)", borderRadius: "100px", color: "var(--gold-dk)" }}>{lang}</span>
                      ))}
                    </div>
                  </div>

                  <div className="card-right">
                    <div>
                      <div className="fee-amount">₹{lawyer.consultationFee.toLocaleString()}</div>
                      <div style={{ fontSize: "9px", color: "var(--ink-5)" }}>/ consult</div>
                    </div>
                    <button className="btn btn-gold" style={{ padding: "6px 14px", fontSize: "11px" }} onClick={() => openBooking(lawyer)}>
                      <Calendar size="11" /> Book
                    </button>
                    <Link href={`/lawyers/${lawyer.id}`} style={{ textDecoration: "none" }}>
                      <button className="btn btn-outline" style={{ padding: "5px 12px", fontSize: "10px", width: "100%" }}>
                        Profile <ChevronRight size="10" />
                      </button>
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* Responsive Booking Modal */}
      {bookingOpen && selectedLawyer && (
        <div className="booking-modal" onClick={(e) => { if (e.target === e.currentTarget) setBookingOpen(false) }}>
          <div className="booking-modal-content">
            <div style={{ padding: "clamp(16px, 5vw, 24px)" }}>
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px", gap: "12px" }}>
                <div>
                  <h3 style={{ fontFamily: "var(--serif)", fontSize: "clamp(18px, 5vw, 20px)", fontWeight: 600 }}>Book Consultation</h3>
                  <p style={{ fontSize: "clamp(11px, 3.5vw, 12px)", color: "var(--ink-5)" }}>
                    {selectedLawyer.fullName} · ₹{selectedLawyer.consultationFee.toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => setBookingOpen(false)}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", flexShrink: 0 }}
                >
                  <X size="18" color="var(--ink-5)" />
                </button>
              </div>

              {/* Step Indicator */}
              <div className="step-indicator">
                {[0, 1, 2, 3].map((step) => (
                  <React.Fragment key={step}>
                    <div className={`step-dot ${bookingStep === step ? "active" : bookingStep > step ? "done" : ""}`}>
                      {bookingStep > step ? "✓" : step + 1}
                    </div>
                    {step < 3 && <div className={`step-line ${bookingStep > step ? "done" : ""}`} />}
                  </React.Fragment>
                ))}
              </div>

              {/* Step 0: Mode */}
              {bookingStep === 0 && (
                <div>
                  <p style={{ fontSize: "10px", fontFamily: "var(--mono)", color: "var(--ink-5)", letterSpacing: "0.1em", marginBottom: "10px", textTransform: "uppercase" }}>
                    Consultation Mode
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
                    {Object.entries(selectedLawyer.consultationModes).map(([mode, available]) => {
                      if (!available) return null
                      const { icon, label } = modeLabels[mode]
                      return (
                        <button
                          key={mode}
                          className={`mode-option ${selectedMode === mode ? "selected" : ""}`}
                          onClick={() => setSelectedMode(mode)}
                          style={{ fontSize: "clamp(12px, 4vw, 13px)", padding: "clamp(8px, 4vw, 10px) 12px" }}
                        >
                          {icon} {label}
                        </button>
                      )
                    })}
                  </div>
                  <button className="btn btn-gold" style={{ width: "100%", justifyContent: "center", padding: "clamp(10px, 4vw, 12px)" }} onClick={() => setBookingStep(1)}>
                    Continue →
                  </button>
                </div>
              )}

              {/* Step 1: Date */}
              {bookingStep === 1 && (
                <div>
                  <p style={{ fontSize: "10px", fontFamily: "var(--mono)", color: "var(--ink-5)", letterSpacing: "0.1em", marginBottom: "10px", textTransform: "uppercase" }}>
                    Select Date
                  </p>
                  <div style={{ border: "1px solid var(--ink-7)", borderRadius: "12px", padding: "clamp(10px, 4vw, 14px)" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
                      <button
                        onClick={prevMonth}
                        style={{ background: "none", border: "1px solid var(--ink-7)", borderRadius: "6px", padding: "6px 10px", cursor: "pointer" }}
                      >
                        ←
                      </button>
                      <span style={{ fontFamily: "var(--serif)", fontSize: "clamp(13px, 4vw, 15px)", fontWeight: 600 }}>
                        {calendarMonth.toLocaleString("default", { month: "short", year: "numeric" })}
                      </span>
                      <button
                        onClick={nextMonth}
                        style={{ background: "none", border: "1px solid var(--ink-7)", borderRadius: "6px", padding: "6px 10px", cursor: "pointer" }}
                      >
                        →
                      </button>
                    </div>
                    <div className="calendar-grid" style={{ marginBottom: "6px" }}>
                      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
                        <div key={day} style={{ textAlign: "center", fontSize: "clamp(8px, 3vw, 10px)", color: "var(--ink-5)", padding: "4px 0" }}>{day}</div>
                      ))}
                    </div>
                    <div className="calendar-grid">
                      {renderCalendar()}
                    </div>
                  </div>
                  <button
                    className="btn btn-ghost"
                    style={{ width: "100%", marginTop: "12px", justifyContent: "center", padding: "clamp(8px, 3.5vw, 10px)" }}
                    onClick={() => setBookingStep(0)}
                  >
                    ← Back
                  </button>
                </div>
              )}

              {/* Step 2: Slot */}
              {bookingStep === 2 && (
                <div>
                  <p style={{ fontSize: "10px", fontFamily: "var(--mono)", color: "var(--ink-5)", letterSpacing: "0.1em", marginBottom: "10px", textTransform: "uppercase" }}>
                    Available Slots — {selectedDate?.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </p>
                  {availableSlots.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "clamp(20px, 8vw, 32px)" }}>
                      <p style={{ fontSize: "clamp(11px, 4vw, 12px)", color: "var(--ink-5)", marginBottom: "16px" }}>No slots available on this date</p>
                      <button
                        className="btn btn-outline"
                        onClick={() => { setBookingStep(1); setSelectedDate(undefined) }}
                        style={{ padding: "8px 16px", fontSize: "11px" }}
                      >
                        Pick another date →
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="slot-grid">
                        {availableSlots.map(slot => (
                          <button
                            key={slot.slot}
                            className={`slot-btn ${selectedTime === slot.slot ? "selected" : ""}`}
                            onClick={() => { setSelectedTime(slot.slot); setBookingStep(3) }}
                            style={{ fontSize: "clamp(10px, 3.5vw, 12px)", padding: "clamp(6px, 3vw, 8px)" }}
                          >
                            {slot.startTime}
                          </button>
                        ))}
                      </div>
                      <button
                        className="btn btn-ghost"
                        style={{ width: "100%", marginTop: "16px", justifyContent: "center", padding: "clamp(8px, 3.5vw, 10px)" }}
                        onClick={() => setBookingStep(1)}
                      >
                        ← Back to Date
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Step 3: Confirm & Pay */}
              {bookingStep === 3 && (
                <div>
                  <div style={{ background: "var(--ink-8)", borderRadius: "12px", padding: "clamp(12px, 4vw, 16px)", marginBottom: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", flexWrap: "wrap", gap: "6px" }}>
                      <span style={{ fontSize: "clamp(10px, 3.5vw, 11px)", color: "var(--ink-5)" }}>Lawyer</span>
                      <span style={{ fontSize: "clamp(11px, 4vw, 12px)", fontWeight: 500, textAlign: "right", wordBreak: "break-word" }}>
                        {selectedLawyer.fullName}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", flexWrap: "wrap", gap: "6px" }}>
                      <span style={{ fontSize: "clamp(10px, 3.5vw, 11px)", color: "var(--ink-5)" }}>Mode</span>
                      <span style={{ fontSize: "clamp(11px, 4vw, 12px)", fontWeight: 500 }}>{modeLabels[selectedMode]?.label}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", flexWrap: "wrap", gap: "6px" }}>
                      <span style={{ fontSize: "clamp(10px, 3.5vw, 11px)", color: "var(--ink-5)" }}>Date & Time</span>
                      <span style={{ fontSize: "clamp(11px, 4vw, 12px)", fontWeight: 500, textAlign: "right" }}>
                        {selectedDate?.toLocaleDateString("en-IN", { day: "numeric", month: "short" })} · {selectedTime}
                      </span>
                    </div>
                    <div style={{ height: "1px", background: "var(--ink-6)", margin: "12px 0" }} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                      <span style={{ fontSize: "clamp(12px, 4vw, 14px)", fontWeight: 600 }}>Total Amount</span>
                      <span style={{ fontFamily: "var(--serif)", fontSize: "clamp(20px, 6vw, 26px)", fontWeight: 700, color: "var(--gold-dk)" }}>
                        ₹{selectedLawyer.consultationFee.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    className="btn btn-gold"
                    style={{ width: "100%", justifyContent: "center", padding: "clamp(10px, 4vw, 14px)", fontSize: "clamp(12px, 4vw, 14px)" }}
                    onClick={handleBooking}
                    disabled={bookingLoading}
                  >
                    {bookingLoading ? (
                      <Loader size="14" style={{ animation: "spin 1s linear infinite" }} />
                    ) : (
                      `Pay ₹${selectedLawyer.consultationFee.toLocaleString()} →`
                    )}
                  </button>

                  <button
                    className="btn btn-ghost"
                    style={{ width: "100%", marginTop: "10px", justifyContent: "center", padding: "clamp(8px, 3.5vw, 10px)" }}
                    onClick={() => setBookingStep(2)}
                  >
                    ← Change Slot
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}