"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Star, MapPin, Clock, Phone, Video, MessageCircle, User, Award,
    Calendar, Loader, AlertCircle, ArrowLeft, Scale, BookOpen,
    Briefcase, ShieldCheck, Languages, ChevronRight, Check
} from "lucide-react"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog"
import { DatePicker } from "@/components/ui/date-picker"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

/* ─── Types ─────────────────────────────────────────────────────────────── */
interface Lawyer {
    _id: string; userId: string; fullName: string
    profilePhoto?: string; avatar?: string; barCouncilId: string
    experience: string; state: string; city: string
    specialization: string[]; languagesSpoken: string[]
    consultationFee: number; status: string
    averageRating: number; totalReviews: number; bio: string
    consultationModes: { video: boolean; call: boolean; chat: boolean; inPerson: boolean }
    verifiedByPlatform: boolean; kycStatus: string
    timeSlots: { day: string; slots: string[]; _id: string }[]
    yearsPracticing: number
}
interface AvailableSlot { startTime: string; endTime: string; slot: string; durationMinutes: number }

/* ─── Skeleton ───────────────────────────────────────────────────────────── */
function PremiumSkeleton() {
    return (
        <div className="lp-root">
            <style>{CSS}</style>
            <div className="lp-back-btn skeleton-btn" />
            <div className="lp-hero skeleton-hero">
                <div className="skeleton-avatar" />
                <div className="skeleton-info">
                    <div className="skeleton-line w-64 h-8" />
                    <div className="skeleton-line w-40 h-4 mt-2" />
                    <div className="skeleton-line w-48 h-4 mt-2" />
                </div>
            </div>
            {[1, 2, 3].map(i => (
                <div key={i} className="lp-card skeleton-card">
                    <div className="skeleton-line w-32 h-5" />
                    <div className="skeleton-line w-full h-4 mt-3" />
                    <div className="skeleton-line w-3/4 h-4 mt-2" />
                </div>
            ))}
        </div>
    )
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function LawyerDetailsPage() {
    const params = useParams()
    const router = useRouter()
    const { toast } = useToast()
    const [lawyer, setLawyer] = useState<Lawyer | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [bookingOpen, setBookingOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | undefined>()
    const [selectedTime, setSelectedTime] = useState<string>("")
    const [selectedMode, setSelectedMode] = useState<string>("video")
    const [bookingLoading, setBookingLoading] = useState(false)
    const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([])
    const [fetchingSlots, setFetchingSlots] = useState(false)
    const lawyerId = params?.lawyerId as string

    useEffect(() => {
        if (!lawyerId) return
        setLoading(true)
        axios.get(`https://nyaymitra-backend-production.up.railway.app/api/v1/lawyer/details/${lawyerId}`)
            .then(r => {
                const d = r.data.lawyer
                setLawyer({ ...d, fullName: d.userInfo?.fullName || "Lawyer", profilePhoto: d.userInfo?.profilePhoto || d.userInfo?.avatar || '' })
            })
            .catch(err => {
                const msg = err.response?.data?.message || err.message || "Failed to fetch"
                setError(msg)
                toast({ title: "Error", description: msg, variant: "destructive" })
            })
            .finally(() => setLoading(false))
    }, [lawyerId, toast])

    useEffect(() => {
        if (!selectedDate || !lawyer) return
        setFetchingSlots(true)
        const token = localStorage.getItem("token")
        axios.get(`https://nyaymitra-backend-production.up.railway.app/api/v1/lawyer/${lawyer.userId}/check?date=${selectedDate.toISOString()}`,
            { headers: { Authorization: `Bearer ${token}` } })
            .then(r => setAvailableSlots(r.data.data?.availableSlots || []))
            .catch(() => toast({ title: "Error", description: "Failed to fetch slots", variant: "destructive" }))
            .finally(() => setFetchingSlots(false))
    }, [selectedDate, lawyer, toast])

    const openBookingDialog = () => {
        const token = localStorage.getItem("token")
        if (!token) {
            toast({ title: "Login Required", description: "Please login to book", variant: "destructive" });
            router.push(`/auth/login?redirect=/lawyers/${lawyerId}`);
            return
        }
        const m = lawyer?.consultationModes
        setSelectedMode(m?.video ? "video" : m?.call ? "call" : m?.chat ? "chat" : "inPerson")
        setSelectedDate(undefined); setSelectedTime(""); setBookingOpen(true)
    }

    const handleBooking = async () => {
        if (!lawyer || !selectedDate || !selectedTime || !selectedMode) {
            toast({ title: "Error", description: "Please select all fields", variant: "destructive" });
            return
        }
        try {
            setBookingLoading(true);
            setBookingOpen(false)
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId")
            if (!token || !userId) {
                router.push("/auth/login?redirect=/lawyers");
                return
            }
            const { data: { order } } = await axios.post(
                "https://nyaymitra-backend-production.up.railway.app/api/v1/payment/create-order",
                {
                    amount: lawyer.consultationFee,
                    currency: "INR",
                    receipt: `booking_${Date.now()}`,
                    notes: {
                        userId,
                        lawyerId: lawyer.userId,
                        mode: selectedMode,
                        slot: selectedTime,
                        date: selectedDate.toISOString()
                    }
                },
                { headers: { Authorization: `Bearer ${token}` } }
            )

            // Load Razorpay
            await new Promise((resolve, reject) => {
                const s = document.createElement('script');
                s.src = 'https://checkout.razorpay.com/v1/checkout.js';
                s.onload = () => resolve(true);
                s.onerror = () => reject(new Error('Failed to load Razorpay'));
                document.body.appendChild(s);
            })
            await new Promise(res => setTimeout(res, 300))

            const rzp = new (window as any).Razorpay({
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "Nyay Mitra",
                description: `Consultation with ${lawyer.fullName}`,
                image: "/logo.png",
                order_id: order.id,
                handler: async (response: any) => {
                    try {
                        const vr = await axios.post("https://nyaymitra-backend-production.up.railway.app/api/v1/payment/verify",
                            {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            },
                            { headers: { Authorization: `Bearer ${token}` } })
                        if (vr.data.success) {
                            const br = await axios.post("https://nyaymitra-backend-production.up.railway.app/api/v1/booking/book",
                                {
                                    userId,
                                    lawyerId: lawyer.userId,
                                    date: selectedDate.toISOString(),
                                    slot: selectedTime,
                                    mode: selectedMode,
                                    paymentId: response.razorpay_payment_id,
                                    paymentMode: "razorpay",
                                    amount: lawyer.consultationFee
                                },
                                { headers: { Authorization: `Bearer ${token}` } })
                            toast({ title: "Booking Confirmed", description: `Consultation with ${lawyer.fullName} confirmed` })
                            router.push(`/bookings/${br.data.booking._id}`)
                        }
                    } catch {
                        toast({ title: "Error", description: "Payment verification failed", variant: "destructive" });
                        setBookingOpen(true)
                    }
                },
                prefill: {
                    name: localStorage.getItem("userName") || "",
                    email: localStorage.getItem("userEmail") || "",
                    contact: localStorage.getItem("userPhone") || ""
                },
                theme: { color: "#C9A96E" },
                modal: { ondismiss: () => setBookingOpen(true) }
            })
            rzp.open()
        } catch (error) {
            toast({ title: "Error", description: "Failed to process booking", variant: "destructive" });
            setBookingOpen(true)
        }
        finally { setBookingLoading(false) }
    }

    if (loading) return <><style>{CSS}</style><PremiumSkeleton /></>
    if (error) return (
        <div className="lp-root lp-center"><style>{CSS}</style>
            <div className="lp-error-card">
                <div className="lp-error-icon"><AlertCircle size={28} /></div>
                <h3 className="lp-error-title">Unable to load profile</h3>
                <p className="lp-error-msg">{error}</p>
                <div className="lp-error-btns">
                    <button className="lp-btn-primary" onClick={() => window.location.reload()}>Try Again</button>
                    <button className="lp-btn-ghost" onClick={() => router.push("/lawyers")}>Browse Lawyers</button>
                </div>
            </div>
        </div>
    )
    if (!lawyer) return null

    const modes = [
        { key: "video", label: "Video", icon: <Video size={18} />, active: lawyer.consultationModes.video },
        { key: "call", label: "Call", icon: <Phone size={18} />, active: lawyer.consultationModes.call },
        { key: "chat", label: "Chat", icon: <MessageCircle size={18} />, active: lawyer.consultationModes.chat },
        { key: "inPerson", label: "In-Person", icon: <User size={18} />, active: lawyer.consultationModes.inPerson },
    ].filter(m => m.active)

    const initials = lawyer.fullName.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()
    const ratingStars = Array.from({ length: 5 }, (_, i) => i < Math.round(lawyer.averageRating))

    return (
        <div className="lp-root">
            <style>{CSS}</style>

            {/* ── Back ── */}
            <div className="lp-topbar">
                <button className="lp-back" onClick={() => router.back()}>
                    <ArrowLeft size={16} />
                    <span>All Lawyers</span>
                </button>
                <div className="lp-breadcrumb">
                    <span>Lawyers</span>
                    <ChevronRight size={12} />
                    <span className="lp-bc-active">{lawyer.fullName}</span>
                </div>
            </div>

            {/* ── Hero ── */}
            <div className="lp-hero-section">
                <div className="lp-hero-bg" />
                <div className="lp-hero-content">
                    <div className="lp-avatar-wrap">
                        {lawyer.profilePhoto
                            ? <img src={lawyer.profilePhoto} alt={lawyer.fullName} className="lp-avatar-img" />
                            : <div className="lp-avatar-initials">{initials}</div>
                        }
                        {lawyer.verifiedByPlatform && <div className="lp-verified-badge"><ShieldCheck size={14} /></div>}
                        <div className={`lp-status-dot ${lawyer.status === "online" ? "online" : ""}`} />
                    </div>

                    <div className="lp-hero-info">
                        <div className="lp-hero-top">
                            <div>
                                <h1 className="lp-name">{lawyer.fullName}</h1>
                                <div className="lp-specs">
                                    {lawyer.specialization.map((s, i) => (
                                        <span key={i} className="lp-spec-chip">{s}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="lp-hero-right">
                                <div className="lp-rating-block">
                                    <div className="lp-stars">
                                        {ratingStars.map((filled, i) => (
                                            <Star key={i} size={14} className={filled ? "star-filled" : "star-empty"} />
                                        ))}
                                    </div>
                                    <span className="lp-rating-num">{lawyer.averageRating.toFixed(1)}</span>
                                    <span className="lp-rating-count">({lawyer.totalReviews})</span>
                                </div>
                                <div className="lp-fee-hero">
                                    <span className="lp-fee-label">Consultation Fee</span>
                                    <span className="lp-fee-amt">₹{lawyer.consultationFee.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="lp-meta-row">
                            <span className="lp-meta-item"><MapPin size={13} />{lawyer.city}, {lawyer.state}</span>
                            <span className="lp-meta-sep" />
                            <span className="lp-meta-item"><Clock size={13} />{lawyer.experience} yrs experience</span>
                            <span className="lp-meta-sep" />
                            <span className="lp-meta-item"><Scale size={13} />Bar ID: {lawyer.barCouncilId}</span>
                        </div>

                        <div className="lp-mode-chips">
                            {modes.map(m => (
                                <span key={m.key} className="lp-mode-chip">{m.icon}{m.label}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Body Grid ── */}
            <div className="lp-body-grid">

                {/* Left Column */}
                <div className="lp-left-col">

                    {/* About */}
                    <div className="lp-card">
                        <div className="lp-card-header">
                            <BookOpen size={16} className="lp-card-icon" />
                            <h2 className="lp-card-title">About</h2>
                        </div>
                        <p className="lp-bio-text">{lawyer.bio || "No bio provided"}</p>
                    </div>

                    {/* Experience */}
                    <div className="lp-card">
                        <div className="lp-card-header">
                            <Briefcase size={16} className="lp-card-icon" />
                            <h2 className="lp-card-title">Experience & Credentials</h2>
                        </div>
                        <div className="lp-exp-grid">
                            <div className="lp-exp-item">
                                <span className="lp-exp-value">{lawyer.yearsPracticing || lawyer.experience}</span>
                                <span className="lp-exp-label">Years Practicing</span>
                            </div>
                            <div className="lp-exp-item">
                                <span className="lp-exp-value">{lawyer.totalReviews}</span>
                                <span className="lp-exp-label">Client Reviews</span>
                            </div>
                            <div className="lp-exp-item">
                                <span className="lp-exp-value">{lawyer.averageRating.toFixed(1)}</span>
                                <span className="lp-exp-label">Avg. Rating</span>
                            </div>
                            <div className="lp-exp-item">
                                <span className="lp-exp-value">{lawyer.specialization.length}</span>
                                <span className="lp-exp-label">Specializations</span>
                            </div>
                        </div>
                        <div className="lp-bar-id">
                            <span className="lp-bar-label">Bar Council ID</span>
                            <span className="lp-bar-value">{lawyer.barCouncilId}</span>
                        </div>
                    </div>

                    {/* Availability */}
                    <div className="lp-card">
                        <div className="lp-card-header">
                            <Calendar size={16} className="lp-card-icon" />
                            <h2 className="lp-card-title">Weekly Availability</h2>
                        </div>
                        {lawyer.timeSlots && lawyer.timeSlots.length > 0 ? (
                            <div className="lp-avail-list">
                                {lawyer.timeSlots.map((d) => (
                                    <div key={d._id} className="lp-avail-row">
                                        <span className="lp-avail-day">{d.day}</span>
                                        <div className="lp-avail-slots">
                                            {d.slots.map((s, i) => <span key={i} className="lp-time-chip">{s}</span>)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="lp-empty-text">No availability information provided</p>
                        )}
                    </div>
                </div>

                {/* Right Column */}
                <div className="lp-right-col">

                    {/* Book CTA */}
                    <div className="lp-book-card">
                        <div className="lp-book-glow" />
                        <div className="lp-book-header">
                            <span className="lp-book-label">Consultation Fee</span>
                            <span className="lp-book-fee">₹{lawyer.consultationFee.toLocaleString()}</span>
                            <span className="lp-book-sub">per session</span>
                        </div>
                        <div className="lp-book-modes">
                            {modes.map(m => (
                                <div key={m.key} className="lp-book-mode-row">
                                    <div className="lp-book-mode-icon">{m.icon}</div>
                                    <span>{m.label} Consultation</span>
                                    <Check size={14} className="lp-check" />
                                </div>
                            ))}
                        </div>
                        <button className="lp-book-btn" onClick={openBookingDialog}>
                            <Calendar size={16} />
                            Book Consultation
                        </button>
                        <p className="lp-book-note">Secure payment · Instant confirmation</p>
                    </div>

                    {/* Languages */}
                    <div className="lp-card">
                        <div className="lp-card-header">
                            <Languages size={16} className="lp-card-icon" />
                            <h2 className="lp-card-title">Languages</h2>
                        </div>
                        {lawyer.languagesSpoken && lawyer.languagesSpoken.length > 0 ? (
                            <div className="lp-lang-chips">
                                {lawyer.languagesSpoken.map((l, i) => <span key={i} className="lp-lang-chip">{l}</span>)}
                            </div>
                        ) : (
                            <p className="lp-empty-text">Not specified</p>
                        )}
                    </div>

                    {/* Verification */}
                    <div className="lp-card">
                        <div className="lp-card-header">
                            <Award size={16} className="lp-card-icon" />
                            <h2 className="lp-card-title">Verification Status</h2>
                        </div>
                        <div className="lp-verify-list">
                            <div className="lp-verify-row">
                                <span className="lp-verify-label">Platform Verified</span>
                                <span className={`lp-verify-badge ${lawyer.verifiedByPlatform ? "verified" : "unverified"}`}>
                                    {lawyer.verifiedByPlatform ? <><Check size={11} /> Verified</> : "Not Verified"}
                                </span>
                            </div>
                            <div className="lp-verify-row">
                                <span className="lp-verify-label">KYC Status</span>
                                <span className={`lp-verify-badge ${lawyer.kycStatus === "verified" ? "verified" : lawyer.kycStatus === "pending" ? "pending" : "unverified"}`}>
                                    {lawyer.kycStatus === "verified" && <><Check size={11} /> </>}
                                    {lawyer.kycStatus?.charAt(0).toUpperCase() + lawyer.kycStatus?.slice(1) || "Not Initiated"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Booking Dialog ── */}
            <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
                <DialogContent className="lp-dialog">
                    <style>{CSS}</style>
                    <DialogHeader>
                        <DialogTitle className="lp-dialog-title">Book a Consultation</DialogTitle>
                        <DialogDescription className="lp-dialog-desc">
                            Schedule your session with {lawyer.fullName}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="lp-dialog-body">
                        {/* Mode Select */}
                        <div className="lp-field">
                            <label className="lp-field-label">Consultation Mode</label>
                            <div className="lp-mode-grid">
                                {modes.map(m => (
                                    <button
                                        key={m.key}
                                        className={`lp-mode-option ${selectedMode === m.key ? "selected" : ""}`}
                                        onClick={() => setSelectedMode(m.key)}
                                    >
                                        <div className="lp-mode-opt-icon">{m.icon}</div>
                                        <span>{m.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Date */}
                        <div className="lp-field">
                            <label className="lp-field-label">Select Date</label>
                            <DatePicker
                                date={selectedDate}
                                setDate={setSelectedDate}
                                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                            />
                        </div>

                        {/* Time Slots */}
                        {selectedDate && (
                            <div className="lp-field">
                                <label className="lp-field-label">Available Time Slots</label>
                                {fetchingSlots ? (
                                    <div className="lp-slots-loading"><Loader size={18} className="lp-spin" /></div>
                                ) : availableSlots.length > 0 ? (
                                    <div className="lp-slots-grid">
                                        {availableSlots.map(s => (
                                            <button
                                                key={s.slot}
                                                className={`lp-slot-btn ${selectedTime === s.slot ? "selected" : ""}`}
                                                onClick={() => setSelectedTime(s.slot)}
                                            >
                                                {s.startTime}
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="lp-no-slots">No available slots for this date</p>
                                )}
                            </div>
                        )}

                        {/* Summary */}
                        <div className="lp-payment-summary">
                            <div className="lp-summary-row">
                                <span>Consultation Fee</span>
                                <span>₹{lawyer.consultationFee.toLocaleString()}</span>
                            </div>
                            <div className="lp-summary-divider" />
                            <div className="lp-summary-row total">
                                <span>Total</span>
                                <span>₹{lawyer.consultationFee.toLocaleString()}</span>
                            </div>
                        </div>

                        <button
                            className="lp-pay-btn"
                            onClick={handleBooking}
                            disabled={!selectedDate || !selectedTime || bookingLoading}
                        >
                            {bookingLoading ? <><Loader size={16} className="lp-spin" /> Processing…</> : "Proceed to Payment →"}
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

/* ─── CSS ─────────────────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500;600&display=swap');

:root {
  --gold: #C9A96E;
  --gold-light: #E2C99A;
  --gold-dim: rgba(201,169,110,0.15);
  --gold-dim2: rgba(201,169,110,0.08);
  --bg: #0E0E12;
  --surface: #16161C;
  --surface2: #1C1C24;
  --border: rgba(255,255,255,0.07);
  --border-gold: rgba(201,169,110,0.25);
  --text: #F0EDE8;
  --text-muted: #8A8A9A;
  --text-dim: #5A5A6E;
  --green: #4ECBA3;
  --red: #E06B6B;
  --amber: #E0A84A;
  --radius: 14px;
  --radius-sm: 8px;
}

.lp-root {
  min-height: 100vh;
  background: var(--bg);
  font-family: 'DM Sans', sans-serif;
  color: var(--text);
  padding-bottom: 80px;
}

/* ── Topbar ── */
.lp-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px 0;
  max-width: 1100px;
  margin: 0 auto;
}

.lp-back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 13px;
  font-family: 'DM Sans', sans-serif;
  padding: 8px 16px;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.2s;
}
.lp-back:hover { border-color: var(--gold-dim); color: var(--gold); background: var(--gold-dim2); }

.lp-breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-dim);
}
.lp-bc-active { color: var(--text-muted); }

/* ── Hero Section ── */
.lp-hero-section {
  position: relative;
  max-width: 1100px;
  margin: 28px auto 0;
  padding: 0 40px;
}

.lp-hero-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(201,169,110,0.05) 0%, transparent 60%);
  border: 1px solid var(--border-gold);
  border-radius: 20px;
  pointer-events: none;
}

.lp-hero-content {
  display: flex;
  align-items: flex-start;
  gap: 28px;
  padding: 36px;
  position: relative;
}

/* Avatar */
.lp-avatar-wrap {
  position: relative;
  flex-shrink: 0;
}
.lp-avatar-img, .lp-avatar-initials {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--border-gold);
}
.lp-avatar-initials {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e1e2e, #2a2a3e);
  font-family: 'Cormorant Garamond', serif;
  font-size: 36px;
  font-weight: 600;
  color: var(--gold);
  letter-spacing: 1px;
}
.lp-verified-badge {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, #1a4a3a, #0e2a20);
  border: 1.5px solid var(--green);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--green);
}
.lp-status-dot {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 10px;
  height: 10px;
  background: var(--text-dim);
  border-radius: 50%;
  border: 2px solid var(--surface);
}
.lp-status-dot.online { background: var(--green); box-shadow: 0 0 6px var(--green); }

/* Hero Info */
.lp-hero-info { flex: 1; min-width: 0; }
.lp-hero-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  flex-wrap: wrap;
}

.lp-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 34px;
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.5px;
  margin: 0;
}

.lp-specs { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
.lp-spec-chip {
  font-size: 11px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 100px;
  background: var(--gold-dim2);
  border: 1px solid var(--border-gold);
  color: var(--gold-light);
  letter-spacing: 0.3px;
  text-transform: uppercase;
}

.lp-hero-right { display: flex; flex-direction: column; align-items: flex-end; gap: 12px; }

.lp-rating-block { display: flex; align-items: center; gap: 6px; }
.lp-stars { display: flex; gap: 2px; }
.star-filled { color: var(--gold); fill: var(--gold); }
.star-empty { color: var(--text-dim); }
.lp-rating-num { font-weight: 600; font-size: 14px; }
.lp-rating-count { font-size: 12px; color: var(--text-muted); }

.lp-fee-hero { text-align: right; }
.lp-fee-label { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-dim); margin-bottom: 2px; }
.lp-fee-amt { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 600; color: var(--gold); }

.lp-meta-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 16px;
}
.lp-meta-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: var(--text-muted);
}
.lp-meta-sep { width: 3px; height: 3px; background: var(--text-dim); border-radius: 50%; }

.lp-mode-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
.lp-mode-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  padding: 5px 12px;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 100px;
  color: var(--text-muted);
}

/* ── Body Grid ── */
.lp-body-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 20px;
  max-width: 1100px;
  margin: 24px auto 0;
  padding: 0 40px;
}

/* ── Card ── */
.lp-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px 28px;
  transition: border-color 0.2s;
}
.lp-card:hover { border-color: rgba(255,255,255,0.12); }

.lp-left-col, .lp-right-col { display: flex; flex-direction: column; gap: 20px; }

.lp-card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}
.lp-card-icon { color: var(--gold); flex-shrink: 0; }
.lp-card-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 0.2px;
  color: var(--text);
  margin: 0;
}

.lp-bio-text { font-size: 14px; line-height: 1.75; color: var(--text-muted); }

/* Exp Grid */
.lp-exp-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  overflow: hidden;
  margin-bottom: 16px;
}
.lp-exp-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 18px 12px;
  background: var(--surface2);
  gap: 4px;
}
.lp-exp-value {
  font-family: 'Cormorant Garamond', serif;
  font-size: 28px;
  font-weight: 600;
  color: var(--gold);
  line-height: 1;
}
.lp-exp-label { font-size: 11px; color: var(--text-dim); text-align: center; }

.lp-bar-id {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
}
.lp-bar-label { font-size: 12px; color: var(--text-dim); }
.lp-bar-value { font-size: 13px; font-weight: 500; color: var(--text-muted); font-family: monospace; letter-spacing: 0.5px; }

/* Availability */
.lp-avail-list { display: flex; flex-direction: column; gap: 14px; }
.lp-avail-row { display: flex; align-items: flex-start; gap: 16px; }
.lp-avail-day { font-size: 12px; font-weight: 600; color: var(--text-muted); min-width: 72px; padding-top: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
.lp-avail-slots { display: flex; flex-wrap: wrap; gap: 6px; }
.lp-time-chip {
  font-size: 11px;
  padding: 4px 10px;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text-muted);
}

.lp-empty-text { font-size: 13px; color: var(--text-dim); }

/* ── Book Card ── */
.lp-book-card {
  position: relative;
  background: linear-gradient(160deg, #1a1810 0%, #111114 100%);
  border: 1px solid var(--border-gold);
  border-radius: var(--radius);
  padding: 28px;
  overflow: hidden;
}
.lp-book-glow {
  position: absolute;
  top: -40px;
  right: -40px;
  width: 160px;
  height: 160px;
  background: radial-gradient(circle, rgba(201,169,110,0.12) 0%, transparent 70%);
  pointer-events: none;
}
.lp-book-header { text-align: center; margin-bottom: 24px; }
.lp-book-label { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: var(--text-dim); margin-bottom: 6px; }
.lp-book-fee { display: block; font-family: 'Cormorant Garamond', serif; font-size: 42px; font-weight: 600; color: var(--gold); line-height: 1; }
.lp-book-sub { display: block; font-size: 11px; color: var(--text-dim); margin-top: 4px; }

.lp-book-modes { display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
.lp-book-mode-row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: var(--text-muted);
  padding: 10px 14px;
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
}
.lp-book-mode-icon { color: var(--gold); display: flex; }
.lp-check { color: var(--green); margin-left: auto; }

.lp-book-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px;
  background: linear-gradient(135deg, var(--gold) 0%, #A07840 100%);
  color: #0E0E12;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s;
  letter-spacing: 0.3px;
}
.lp-book-btn:hover { opacity: 0.9; transform: translateY(-1px); }
.lp-book-btn:active { transform: translateY(0); }

.lp-book-note { text-align: center; font-size: 11px; color: var(--text-dim); margin-top: 10px; }

/* Languages */
.lp-lang-chips { display: flex; flex-wrap: wrap; gap: 8px; }
.lp-lang-chip {
  font-size: 12px;
  font-weight: 500;
  padding: 5px 14px;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 100px;
  color: var(--text-muted);
}

/* Verification */
.lp-verify-list { display: flex; flex-direction: column; gap: 10px; }
.lp-verify-row { display: flex; align-items: center; justify-content: space-between; }
.lp-verify-label { font-size: 13px; color: var(--text-muted); }
.lp-verify-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 100px;
  letter-spacing: 0.3px;
}
.lp-verify-badge.verified { background: rgba(78,203,163,0.12); color: var(--green); border: 1px solid rgba(78,203,163,0.25); }
.lp-verify-badge.pending { background: rgba(224,168,74,0.12); color: var(--amber); border: 1px solid rgba(224,168,74,0.25); }
.lp-verify-badge.unverified { background: rgba(224,107,107,0.1); color: var(--red); border: 1px solid rgba(224,107,107,0.2); }

/* ── Dialog ── */
.lp-dialog {
  background: var(--surface) !important;
  border: 1px solid var(--border-gold) !important;
  border-radius: 18px !important;
  color: var(--text) !important;
  max-width: 440px !important;
  font-family: 'DM Sans', sans-serif !important;
}
.lp-dialog-title { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 600; color: var(--text); }
.lp-dialog-desc { font-size: 13px; color: var(--text-muted); margin-top: 4px; }

.lp-dialog-body { padding: 8px 0; display: flex; flex-direction: column; gap: 20px; }

.lp-field { display: flex; flex-direction: column; gap: 8px; }
.lp-field-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: var(--text-dim); }

.lp-mode-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
.lp-mode-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: var(--surface2);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s;
}
.lp-mode-option:hover { border-color: var(--border-gold); color: var(--text); }
.lp-mode-option.selected { border-color: var(--gold); background: var(--gold-dim); color: var(--gold); }
.lp-mode-opt-icon { display: flex; }

.lp-slots-loading { display: flex; justify-content: center; padding: 16px; }
.lp-spin { animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.lp-slots-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.lp-slot-btn {
  padding: 8px 6px;
  background: var(--surface2);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;
}
.lp-slot-btn:hover { border-color: var(--border-gold); color: var(--text); }
.lp-slot-btn.selected { border-color: var(--gold); background: var(--gold-dim); color: var(--gold); font-weight: 600; }

.lp-no-slots { font-size: 13px; color: var(--text-dim); text-align: center; padding: 8px 0; }

.lp-payment-summary {
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 14px 16px;
}
.lp-summary-row { display: flex; justify-content: space-between; font-size: 13px; color: var(--text-muted); }
.lp-summary-row.total { font-weight: 600; font-size: 15px; color: var(--text); }
.lp-summary-divider { height: 1px; background: var(--border); margin: 10px 0; }

.lp-pay-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px;
  background: linear-gradient(135deg, var(--gold) 0%, #A07840 100%);
  color: #0E0E12;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s;
  letter-spacing: 0.3px;
}
.lp-pay-btn:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
.lp-pay-btn:disabled { opacity: 0.4; cursor: not-allowed; }

/* ── Error ── */
.lp-center { display: flex; align-items: center; justify-content: center; min-height: 60vh; }
.lp-error-card {
  background: var(--surface);
  border: 1px solid rgba(224,107,107,0.2);
  border-radius: var(--radius);
  padding: 40px;
  max-width: 380px;
  text-align: center;
}
.lp-error-icon { color: var(--red); display: flex; justify-content: center; margin-bottom: 14px; }
.lp-error-title { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 600; margin: 0 0 8px; }
.lp-error-msg { font-size: 13px; color: var(--text-muted); margin: 0 0 24px; }
.lp-error-btns { display: flex; gap: 10px; justify-content: center; }

.lp-btn-primary, .lp-btn-ghost {
  padding: 10px 20px;
  border-radius: var(--radius-sm);
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
}
.lp-btn-primary { background: var(--gold); color: #0E0E12; border: none; }
.lp-btn-primary:hover { opacity: 0.9; }
.lp-btn-ghost { background: transparent; color: var(--text-muted); border: 1px solid var(--border); }
.lp-btn-ghost:hover { border-color: var(--border-gold); color: var(--text); }

/* ── Skeleton ── */
.skeleton-btn { width: 120px; height: 36px; background: var(--surface); border-radius: 100px; margin: 20px 40px; }
.skeleton-hero { display: flex; gap: 24px; padding: 36px 40px; }
.skeleton-avatar { width: 110px; height: 110px; border-radius: 50%; background: var(--surface2); flex-shrink: 0; }
.skeleton-info { flex: 1; padding-top: 8px; }
.skeleton-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px 28px; max-width: 1100px; margin: 16px auto; }

.skeleton-line {
  background: linear-gradient(90deg, var(--surface2) 25%, rgba(255,255,255,0.05) 50%, var(--surface2) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
  display: block;
}
.w-64 { width: 256px; } .w-48 { width: 192px; } .w-40 { width: 160px; } .w-32 { width: 128px; } .w-full { width: 100%; } .w-3\/4 { width: 75%; }
.h-8 { height: 32px; } .h-5 { height: 20px; } .h-4 { height: 16px; }
.mt-2 { margin-top: 8px; } .mt-3 { margin-top: 12px; }
@keyframes shimmer { to { background-position: -200% 0; } }

/* Responsive */
@media (max-width: 768px) {
  .lp-topbar, .lp-hero-section { padding: 16px; }
  .lp-hero-content { flex-direction: column; padding: 24px; }
  .lp-hero-top { flex-direction: column; }
  .lp-hero-right { align-items: flex-start; }
  .lp-body-grid { grid-template-columns: 1fr; padding: 0 16px; }
  .lp-name { font-size: 26px; }
}
`