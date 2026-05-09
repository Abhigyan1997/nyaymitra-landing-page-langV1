"use client"

import React, { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  Scale, Star, MapPin, Clock, Phone, Video, MessageCircle,
  Search, User, Award, Calendar, Loader, AlertCircle,
  X, Shield, Sparkles, Menu, Briefcase, ChevronRight,
  CheckCircle, ArrowRight,
} from "lucide-react"
import Link from "next/link"
import axios from "axios"
import { loadRazorpay } from "@/lib/razorpay"
import { useToast } from "@/components/ui/use-toast"
import LawyerListing from "@/components/LawyerListing"

// ─── Nav styles (minimal, shared) ─────────────────────────────────────────────
function NavStyles() {
  useEffect(() => {
    const id = "nav-page-styles"
    if (document.getElementById(id)) return
    const s = document.createElement("style")
    s.id = id
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap');
      :root{--ink:#0a0a0a;--ink-2:#1a1a1a;--ink-4:#6b6b6b;--ink-5:#9a9a9a;--ink-7:#e8e8e8;--ink-8:#f4f3f0;--parchment:#faf9f6;--white:#ffffff;--gold:#c9a84c;--gold-lt:#e8c96a;--gold-dk:#8b6914;--gold-pale:#fdf6e3;--emerald:#10b981;--red:#c0392b;--serif:'Cormorant Garamond',Georgia,serif;--sans:'DM Sans',system-ui,sans-serif;--mono:'DM Mono',monospace;}
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
      html{scroll-behavior:smooth;}
      body{background:var(--white);color:var(--ink);font-family:var(--sans);-webkit-font-smoothing:antialiased;}
      @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
      @keyframes popIn{0%{opacity:0;transform:scale(.95)}50%{opacity:1;transform:scale(1.02)}100%{opacity:1;transform:scale(1)}}
      @keyframes slideInDown{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}
      @keyframes checkmark{0%{transform:scale(0) rotate(-45deg);opacity:0}50%{opacity:1}100%{transform:scale(1) rotate(0);opacity:1}}
      .gold-shimmer{background:linear-gradient(100deg,var(--gold-dk) 0%,var(--gold) 30%,var(--gold-lt) 50%,var(--gold) 70%,var(--gold-dk) 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 4s linear infinite;}
      .nav-link{font-family:var(--sans);font-size:13px;font-weight:500;color:var(--ink-4);text-decoration:none;padding:7px 12px;border-radius:6px;transition:all .18s;}
      .nav-link:hover{color:var(--ink);background:var(--ink-8);}
      .btn-nav{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:8px;font-size:12px;font-weight:600;font-family:var(--sans);cursor:pointer;border:none;text-decoration:none;transition:all .2s;}
      .btn-gold-nav{background:var(--gold);color:var(--ink);}
      .btn-gold-nav:hover{background:var(--gold-lt);transform:translateY(-1px);}
      .eyebrow{display:inline-flex;align-items:center;gap:10px;font-family:var(--mono);font-size:9.5px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--gold-dk);}
      .eyebrow::before,.eyebrow::after{content:'';width:22px;height:1px;background:var(--gold);flex-shrink:0;}
      .hero-container{max-width:1200px;margin:0 auto;padding:0 24px;}
      @media(max-width:640px){.hero-container{padding:0 14px;}}
      .stats-row{display:flex;gap:24px;flex-wrap:wrap;margin-bottom:28px;padding-bottom:24px;border-bottom:1px solid var(--ink-7);}
      @media(max-width:540px){.stats-row{gap:14px;justify-content:space-between;}}
      .mobile-nav-menu{display:none;}
      @media(max-width:768px){.desktop-nav-items{display:none!important;}.mobile-nav-menu{display:block!important;}}
      .success-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;z-index:2000;padding:16px;animation:fadeUp .3s cubic-bezier(.22,1,.36,1) both;}
      .success-modal-content{background:var(--white);border-radius:24px;max-width:420px;width:100%;padding:clamp(24px,5vw,40px);box-shadow:0 20px 60px rgba(0,0,0,.2);animation:popIn .4s cubic-bezier(.22,1,.36,1) both;}
      .success-checkmark{width:64px;height:64px;margin:0 auto 20px;background:linear-gradient(135deg,var(--gold),var(--gold-lt));border-radius:50%;display:flex;align-items:center;justify-content:center;animation:popIn .6s cubic-bezier(.22,1,.36,1) .2s both;}
      .success-checkmark svg{color:var(--ink);width:36px;height:36px;animation:checkmark .5s ease-out .4s both;}
      @media(max-width:480px){.success-modal-content{padding:24px 20px;}.success-checkmark{width:56px;height:56px;margin-bottom:16px;}.success-checkmark svg{width:32px;height:32px;}}
    `
    document.head.appendChild(s)
  }, [])
  return null
}

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Lawyer {
  id: string; userId: string; fullName: string; specialization: string[]
  experience: number; rating: number; reviews: number; city: string; state: string
  languages: string[]; consultationFee: number; profilePhoto?: string; verified: boolean
  bio: string; consultationModes: { video: boolean; call: boolean; chat: boolean; inPerson: boolean }
  kycStatus: string; availableNow?: boolean
}
interface AvailableSlot { startTime: string; endTime: string; slot: string; durationMinutes: number }
interface BookingData {
  id: string
  lawyer: string
  date: Date
  slot: string
  mode: string
  fee: number
}

// ─── Success Modal Component ────────────────────────────────────────────────────
function SuccessModal({
  isOpen,
  booking,
  onClose,
  onViewBooking,
}: {
  isOpen: boolean
  booking: BookingData | null
  onClose: () => void
  onViewBooking: (id: string) => void
}) {
  if (!isOpen || !booking) return null

  const modeIcons: Record<string, React.ReactNode> = {
    video: <Video size={16} />,
    call: <Phone size={16} />,
    chat: <MessageCircle size={16} />,
    inPerson: <User size={16} />,
  }

  const modeLabels: Record<string, string> = {
    video: "Video Call",
    call: "Phone Call",
    chat: "Chat",
    inPerson: "In-Person",
  }

  return (
    <div className="success-modal-overlay" onClick={onClose}>
      <div
        className="success-modal-content"
        onClick={e => e.stopPropagation()}
      >
        {/* Checkmark Animation */}
        <div className="success-checkmark">
          <CheckCircle strokeWidth={1.5} />
        </div>

        {/* Title & Description */}
        <h2 style={{
          fontFamily: "var(--serif)",
          fontSize: "clamp(22px, 5vw, 28px)",
          fontWeight: 600,
          marginBottom: 8,
          textAlign: "center",
          color: "var(--ink)",
        }}>
          Booking Confirmed!
        </h2>
        <p style={{
          fontSize: 13,
          color: "var(--ink-4)",
          textAlign: "center",
          marginBottom: 28,
          lineHeight: 1.5,
        }}>
          Your consultation is scheduled. A confirmation link will be sent to your email.
        </p>

        {/* Booking Details Card */}
        <div style={{
          background: "linear-gradient(135deg, var(--ink-8) 0%, var(--gold-pale) 100%)",
          borderRadius: 14,
          padding: "clamp(16px, 4vw, 20px)",
          marginBottom: 24,
          border: "1px solid var(--gold-pale)",
        }}>
          {/* Lawyer Name */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 14,
            paddingBottom: 14,
            borderBottom: "1px solid rgba(201, 168, 76, 0.2)",
          }}>
            <Award size={16} color="var(--gold-dk)" />
            <span style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(15px, 3vw, 17px)",
              fontWeight: 600,
              color: "var(--ink)",
            }}>
              {booking.lawyer}
            </span>
          </div>

          {/* Details Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(12px, 3vw, 16px)",
          }}>
            {/* Date & Time */}
            <div>
              <div style={{
                fontSize: 10,
                fontFamily: "var(--mono)",
                color: "var(--ink-5)",
                letterSpacing: ".08em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}>
                Date & Time
              </div>
              <div style={{
                fontSize: "clamp(12px, 2vw, 14px)",
                fontWeight: 500,
                color: "var(--ink)",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}>
                <Calendar size={14} color="var(--gold)" />
                {booking.date.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                })}
              </div>
              <div style={{
                fontSize: "clamp(11px, 2vw, 12px)",
                color: "var(--ink-4)",
                marginTop: 2,
              }}>
                {booking.slot}
              </div>
            </div>

            {/* Mode */}
            <div>
              <div style={{
                fontSize: 10,
                fontFamily: "var(--mono)",
                color: "var(--ink-5)",
                letterSpacing: ".08em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}>
                Consultation Mode
              </div>
              <div style={{
                fontSize: "clamp(12px, 2vw, 14px)",
                fontWeight: 500,
                color: "var(--ink)",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}>
                {modeIcons[booking.mode] || <Video size={14} />}
                {modeLabels[booking.mode] || booking.mode}
              </div>
            </div>
          </div>

          {/* Fee */}
          <div style={{
            marginTop: 14,
            paddingTop: 14,
            borderTop: "1px solid rgba(201, 168, 76, 0.2)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <span style={{
              fontSize: 12,
              color: "var(--ink-5)",
              fontWeight: 500,
            }}>
              Consultation Fee
            </span>
            <span style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(16px, 3vw, 20px)",
              fontWeight: 700,
              color: "var(--gold-dk)",
            }}>
              ₹{booking.fee.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
        }}>
          <button
            onClick={onClose}
            style={{
              padding: "clamp(10px, 3vw, 12px)",
              background: "var(--ink-8)",
              border: "1px solid var(--ink-7)",
              borderRadius: 10,
              fontFamily: "var(--sans)",
              fontSize: "clamp(12px, 2vw, 13px)",
              fontWeight: 600,
              cursor: "pointer",
              color: "var(--ink)",
              transition: "all .2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "var(--ink-7)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "var(--ink-8)"
            }}
          >
            Continue
          </button>
          <button
            onClick={() => onViewBooking(booking.id)}
            style={{
              padding: "clamp(10px, 3vw, 12px)",
              background: "var(--gold)",
              border: "none",
              borderRadius: 10,
              fontFamily: "var(--sans)",
              fontSize: "clamp(12px, 2vw, 13px)",
              fontWeight: 700,
              cursor: "pointer",
              color: "var(--ink)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              transition: "all .2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "var(--gold-lt)"
              e.currentTarget.style.transform = "translateY(-2px)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "var(--gold)"
              e.currentTarget.style.transform = "translateY(0)"
            }}
          >
            View Booking
            <ArrowRight size={14} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Booking Modal ─────────────────────────────────────────────────────────────
function BookingModal({
  lawyer,
  onClose,
  onConfirm,
}: {
  lawyer: Lawyer
  onClose: () => void
  onConfirm: (data: { date: Date; slot: string; mode: string }) => Promise<void>
}) {
  const { toast } = useToast()
  const [step, setStep] = useState(0)
  const [isClosing, setIsClosing] = useState(false)
  const [mode, setMode] = useState(() => {
    const m = lawyer.consultationModes
    return m.video ? "video" : m.call ? "call" : m.chat ? "chat" : "inPerson"
  })
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState("")
  const [slots, setSlots] = useState<AvailableSlot[]>([])
  const [calMonth, setCalMonth] = useState(new Date())
  const [loading, setLoading] = useState(false)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, 200)
  }

  const fetchSlots = async (d: Date) => {
    try {
      const token = localStorage.getItem("token")
      const r = await axios.get(
        `https://nyaymitra-backend-production.up.railway.app/api/v1/lawyer/${lawyer.userId}/check?date=${d.toISOString()}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setSlots(r.data.data?.availableSlots || [])
    } catch {
      toast({ title: "Error", description: "Could not fetch availability", variant: "destructive" })
    }
  }

  const daysInMonth = new Date(calMonth.getFullYear(), calMonth.getMonth() + 1, 0).getDate()
  const firstDay = new Date(calMonth.getFullYear(), calMonth.getMonth(), 1).getDay()

  const modeLabels: Record<string, { icon: React.ReactNode; label: string }> = {
    video: { icon: <Video size={13} />, label: "Video Call" },
    call: { icon: <Phone size={13} />, label: "Phone Call" },
    chat: { icon: <MessageCircle size={13} />, label: "Chat" },
    inPerson: { icon: <User size={13} />, label: "In-Person" },
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: isClosing ? "rgba(0,0,0,0)" : "rgba(0,0,0,.7)",
        backdropFilter: isClosing ? "blur(0px)" : "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 16,
        transition: "all 0.2s ease",
      }}
      onClick={e => {
        if (e.target === e.currentTarget) handleClose()
      }}
    >
      <div style={{
        background: "var(--white)",
        borderRadius: 20,
        maxWidth: 460,
        width: "100%",
        maxHeight: "90vh",
        overflowY: "auto",
        border: "1px solid var(--ink-7)",
        boxShadow: "0 24px 48px rgba(0,0,0,.2)",
        opacity: isClosing ? 0 : 1,
        transform: isClosing ? "scale(0.95)" : "scale(1)",
        transition: "all 0.2s ease",
      }}>
        <div style={{ padding: "clamp(16px,5vw,24px)" }}>

          {/* Header */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 16,
            gap: 12,
          }}>
            <div>
              <h3 style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(18px,5vw,20px)",
                fontWeight: 600,
              }}>
                Book Consultation
              </h3>
              <p style={{ fontSize: 12, color: "var(--ink-5)" }}>
                {lawyer.fullName} · ₹{lawyer.consultationFee.toLocaleString()}
              </p>
            </div>
            <button
              onClick={handleClose}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 4,
                flexShrink: 0,
                transition: "all 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "rotate(90deg)"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "rotate(0deg)"
              }}
            >
              <X size={18} color="var(--ink-5)" />
            </button>
          </div>

          {/* Step dots */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            marginBottom: 20,
          }}>
            {[0, 1, 2, 3].map(s => (
              <React.Fragment key={s}>
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 600,
                  background:
                    step === s ? "var(--gold)" : step > s ? "var(--emerald)" : "var(--ink-8)",
                  color: step === s ? "var(--ink)" : step > s ? "white" : "var(--ink-5)",
                  flexShrink: 0,
                }}>
                  {step > s ? "✓" : s + 1}
                </div>
                {s < 3 && (
                  <div style={{
                    width: 30,
                    height: 1,
                    background: step > s ? "var(--emerald)" : "var(--ink-7)",
                  }} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step 0: Mode */}
          {step === 0 && (
            <div>
              <p style={{
                fontSize: 10,
                fontFamily: "var(--mono)",
                color: "var(--ink-5)",
                letterSpacing: ".1em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}>
                Consultation Mode
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                {Object.entries(lawyer.consultationModes).map(([m, avail]) => {
                  if (!avail) return null
                  const { icon, label } = modeLabels[m]
                  return (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "10px 14px",
                        border: `1px solid ${mode === m ? "var(--gold)" : "var(--ink-7)"}`,
                        borderRadius: 10,
                        background: mode === m ? "var(--gold-pale)" : "var(--white)",
                        cursor: "pointer",
                        fontSize: 13,
                        fontFamily: "var(--sans)",
                      }}
                    >
                      {icon} {label}
                    </button>
                  )
                })}
              </div>
              <button
                onClick={() => setStep(1)}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "var(--gold)",
                  color: "var(--ink)",
                  border: "none",
                  borderRadius: 10,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: 13,
                }}
              >
                Continue →
              </button>
            </div>
          )}

          {/* Step 1: Date */}
          {step === 1 && (
            <div>
              <p style={{
                fontSize: 10,
                fontFamily: "var(--mono)",
                color: "var(--ink-5)",
                letterSpacing: ".1em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}>
                Select Date
              </p>
              <div style={{ border: "1px solid var(--ink-7)", borderRadius: 12, padding: 14 }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}>
                  <button
                    onClick={() =>
                      setCalMonth(
                        new Date(calMonth.getFullYear(), calMonth.getMonth() - 1, 1)
                      )
                    }
                    style={{
                      background: "none",
                      border: "1px solid var(--ink-7)",
                      borderRadius: 6,
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    ←
                  </button>
                  <span style={{
                    fontFamily: "var(--serif)",
                    fontSize: 15,
                    fontWeight: 600,
                  }}>
                    {calMonth.toLocaleString("default", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <button
                    onClick={() =>
                      setCalMonth(
                        new Date(calMonth.getFullYear(), calMonth.getMonth() + 1, 1)
                      )
                    }
                    style={{
                      background: "none",
                      border: "1px solid var(--ink-7)",
                      borderRadius: 6,
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    →
                  </button>
                </div>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7,1fr)",
                  gap: 3,
                  marginBottom: 4,
                }}>
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                    <div key={d} style={{
                      textAlign: "center",
                      fontSize: 10,
                      color: "var(--ink-5)",
                      padding: "3px 0",
                    }}>
                      {d}
                    </div>
                  ))}
                </div>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7,1fr)",
                  gap: 3,
                }}>
                  {Array(firstDay)
                    .fill(null)
                    .map((_, i) => (
                      <div key={`e${i}`} />
                    ))}
                  {Array(daysInMonth)
                    .fill(null)
                    .map((_, i) => {
                      const d = new Date(calMonth.getFullYear(), calMonth.getMonth(), i + 1)
                      const today = new Date()
                      today.setHours(0, 0, 0, 0)
                      const isPast = d < today
                      const isSel = date && d.toDateString() === date.toDateString()
                      return (
                        <button
                          key={i}
                          disabled={isPast}
                          onClick={() => {
                            setDate(d)
                            fetchSlots(d)
                            setStep(2)
                          }}
                          style={{
                            aspectRatio: "1",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 6,
                            border: isSel ? "2px solid var(--gold)" : "1px solid var(--ink-7)",
                            background: isSel ? "var(--gold-pale)" : "var(--white)",
                            fontSize: "clamp(10px,3vw,12px)",
                            color: isPast ? "var(--ink-6)" : "var(--ink)",
                            cursor: isPast ? "not-allowed" : "pointer",
                            fontWeight: isSel ? 600 : 400,
                          }}
                        >
                          {i + 1}
                        </button>
                      )
                    })}
                </div>
              </div>
              <button
                onClick={() => setStep(0)}
                style={{
                  width: "100%",
                  marginTop: 10,
                  padding: 10,
                  background: "transparent",
                  border: "1px solid var(--ink-7)",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontSize: 12,
                }}
              >
                ← Back
              </button>
            </div>
          )}

          {/* Step 2: Slots */}
          {step === 2 && (
            <div>
              <p style={{
                fontSize: 10,
                fontFamily: "var(--mono)",
                color: "var(--ink-5)",
                letterSpacing: ".1em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}>
                Slots — {date?.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
              </p>
              {slots.length === 0 ? (
                <div style={{ textAlign: "center", padding: 32 }}>
                  <p style={{ fontSize: 12, color: "var(--ink-5)", marginBottom: 14 }}>
                    No slots on this date
                  </p>
                  <button
                    onClick={() => {
                      setStep(1)
                      setDate(undefined)
                    }}
                    style={{
                      fontSize: 11,
                      padding: "7px 16px",
                      border: "1px solid var(--ink-7)",
                      borderRadius: 8,
                      cursor: "pointer",
                      background: "var(--white)",
                    }}
                  >
                    Pick another →
                  </button>
                </div>
              ) : (
                <>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gap: 8,
                  }}>
                    {slots.map(sl => (
                      <button
                        key={sl.slot}
                        onClick={() => {
                          setTime(sl.slot)
                          setStep(3)
                        }}
                        style={{
                          padding: "8px 4px",
                          border: `1px solid ${time === sl.slot ? "var(--gold)" : "var(--ink-7)"}`,
                          borderRadius: 8,
                          background: time === sl.slot ? "var(--gold)" : "var(--white)",
                          fontSize: 12,
                          cursor: "pointer",
                          fontFamily: "var(--sans)",
                        }}
                      >
                        {sl.startTime}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    style={{
                      width: "100%",
                      marginTop: 14,
                      padding: "9px",
                      background: "transparent",
                      border: "1px solid var(--ink-7)",
                      borderRadius: 10,
                      cursor: "pointer",
                      fontSize: 11,
                    }}
                  >
                    ← Back to Date
                  </button>
                </>
              )}
            </div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <div>
              <div style={{
                background: "var(--ink-8)",
                borderRadius: 12,
                padding: 16,
                marginBottom: 18,
              }}>
                {[
                  ["Lawyer", lawyer.fullName],
                  ["Mode", modeLabels[mode]?.label],
                  [
                    "Date & Time",
                    `${date?.toLocaleDateString("en-IN", { day: "numeric", month: "short" })} · ${time}`,
                  ],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 8,
                      flexWrap: "wrap",
                      gap: 4,
                    }}
                  >
                    <span style={{ fontSize: 11, color: "var(--ink-5)" }}>{k}</span>
                    <span style={{ fontSize: 12, fontWeight: 500, textAlign: "right" }}>
                      {v}
                    </span>
                  </div>
                ))}
                <div style={{ height: 1, background: "var(--ink-6)", margin: "10px 0" }} />
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>Total</span>
                  <span style={{
                    fontFamily: "var(--serif)",
                    fontSize: 24,
                    fontWeight: 700,
                    color: "var(--gold-dk)",
                  }}>
                    ₹{lawyer.consultationFee.toLocaleString()}
                  </span>
                </div>
              </div>
              <button
                onClick={async () => {
                  setLoading(true)
                  await onConfirm({ date: date!, slot: time, mode })
                  setLoading(false)
                }}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: 13,
                  background: "var(--gold)",
                  color: "var(--ink)",
                  border: "none",
                  borderRadius: 10,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontSize: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? (
                  <Loader
                    size={14}
                    style={{ animation: "spin 1s linear infinite" }}
                  />
                ) : (
                  `Pay ₹${lawyer.consultationFee.toLocaleString()} →`
                )}
              </button>
              <button
                onClick={() => setStep(2)}
                style={{
                  width: "100%",
                  marginTop: 8,
                  padding: 9,
                  background: "transparent",
                  border: "1px solid var(--ink-7)",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontSize: 11,
                }}
              >
                ← Change Slot
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function LawyersPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)
  const [lawyers, setLawyers] = useState<Lawyer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [bookingLawyer, setBookingLawyer] = useState<Lawyer | null>(null)
  const [bookingLoading, setBookingLoading] = useState(false)

  // Success Modal States
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [lastBooking, setLastBooking] = useState<BookingData | null>(null)

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
        const r = await axios.get(
          "https://nyaymitra-backend-production.up.railway.app/api/v1/lawyer/all",
          { headers: { Authorization: `Bearer ${token}` } }
        )
        const data =
          r.data?.lawyers?.map((l: any) => ({
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
            bio: l.lawyerDetails?.bio?.slice(0, 120) || "Experienced legal professional",
            consultationModes: l.lawyerDetails?.consultationModes || {
              video: true,
              call: true,
              chat: false,
              inPerson: false,
            },
            kycStatus: l.lawyerDetails?.kycStatus || "pending",
            availableNow: Math.random() > 0.6,
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

  const handleConfirmBooking = async ({
    date,
    slot,
    mode,
  }: {
    date: Date
    slot: string
    mode: string
  }) => {
    const lawyer = bookingLawyer!
    try {
      setBookingLoading(true)

      const token = localStorage.getItem("token")
      const userId = localStorage.getItem("userId")
      if (!token || !userId) {
        router.push("/auth/login?redirect=/lawyers")
        return
      }

      const orderRes = await axios.post(
        "https://nyaymitra-backend-production.up.railway.app/api/v1/payment/create-order",
        {
          amount: lawyer.consultationFee,
          currency: "INR",
          receipt: `booking_${Date.now()}`,
          notes: {
            userId,
            lawyerId: lawyer.userId,
            mode,
            slot,
            date: date.toISOString(),
          },
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
        description: `Consultation with ${lawyer.fullName}`,
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
                  userId,
                  lawyerId: lawyer.userId,
                  date: date.toISOString(),
                  slot,
                  mode,
                  paymentId: response.razorpay_payment_id,
                  paymentMode: "razorpay",
                  amount: lawyer.consultationFee,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )

              const bookingId =
                bookingRes.data?.booking?._id ||
                bookingRes.data?.data?._id ||
                bookingRes.data?._id

              // ✅ CLOSE booking modal FIRST
              setBookingLawyer(null)

              // Store booking data locally
              if (bookingId) {
                const bookingData = {
                  id: bookingId,
                  lawyerName: lawyer.fullName,
                  date: date.toISOString(),
                  slot,
                  mode,
                  fee: lawyer.consultationFee,
                  timestamp: new Date().toISOString(),
                }
                localStorage.setItem(`booking_${bookingId}`, JSON.stringify(bookingData))
              }

              // ✅ THEN Show success modal (after a brief delay to ensure modal closes)
              setTimeout(() => {
                setLastBooking({
                  id: bookingId,
                  lawyer: lawyer.fullName,
                  date,
                  slot,
                  mode,
                  fee: lawyer.consultationFee,
                })
                setShowSuccessModal(true)
              }, 100)
            }
          } catch {
            toast({
              title: "Payment failed",
              description: "Please contact support",
              variant: "destructive",
            })
            setBookingLawyer(lawyer)
          } finally {
            setBookingLoading(false)
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
      toast({
        title: "Error",
        description: "Could not initiate payment",
        variant: "destructive",
      })
      setBookingLawyer(lawyer)
    } finally {
      setBookingLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <>
      <NavStyles />

      {/* ── Nav ── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(255,255,255,.96)",
          borderBottom: "1px solid var(--ink-7)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div
              style={{
                width: 34,
                height: 34,
                background: "var(--ink)",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Scale style={{ color: "white", width: 15, height: 15 }} />
            </div>
            <span
              style={{
                fontFamily: "var(--serif)",
                fontSize: 17,
                fontWeight: 700,
                color: "var(--ink)",
              }}
            >
              NyayMitra
            </span>
          </Link>

          <div
            className="desktop-nav-items"
            style={{ display: "flex", alignItems: "center", gap: 10 }}
          >
            <Link href="/legal-gpt" className="nav-link" style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Sparkles size={13} /> Ask AI
            </Link>
            <Link
              href="/auth/signup"
              className="btn-nav btn-gold-nav"
              style={{ textDecoration: "none" }}
            >
              <Briefcase size={12} /> Join as Lawyer
            </Link>
          </div>

          <button
            className="mobile-nav-menu"
            onClick={() => setMobileMenuOpen(v => !v)}
            style={{
              background: "none",
              border: "1px solid var(--ink-7)",
              borderRadius: 8,
              padding: "6px 10px",
              cursor: "pointer",
            }}
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div
            style={{
              padding: "12px 20px",
              borderTop: "1px solid var(--ink-7)",
              background: "var(--white)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <Link
              href="/legal-gpt"
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Ask AI
            </Link>
            <Link
              href="/auth/signup"
              className="btn-nav btn-gold-nav"
              style={{ justifyContent: "center", textDecoration: "none" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Join as Lawyer
            </Link>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <div className="hero-container" style={{ paddingTop: 32, paddingBottom: 16 }}>
        <div style={{ animation: "fadeUp .6s cubic-bezier(.22,1,.36,1) both" }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>
            Find Your Counsel
          </div>
          <h1
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(28px,5vw,44px)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-.02em",
              marginBottom: 10,
            }}
          >
            India's Finest <span className="gold-shimmer">Legal Minds</span>
          </h1>
          <p
            style={{
              fontSize: 13,
              color: "var(--ink-4)",
              maxWidth: 520,
              lineHeight: 1.6,
              marginBottom: 24,
            }}
          >
            60+ verified lawyers across India. Book consultations instantly with legal
            experts in criminal, civil, family, and corporate law.
          </p>

          <div className="stats-row">
            {[
              ["60+", "Lawyers"],
              ["20+", "Areas"],
              ["4.9★", "Rating"],
              ["<30m", "Response"],
            ].map(([v, l]) => (
              <div key={l}>
                <div
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: "clamp(22px,4vw,28px)",
                    fontWeight: 600,
                  }}
                >
                  {v}
                </div>
                <div
                  style={{
                    fontSize: "9px",
                    color: "var(--ink-5)",
                    letterSpacing: ".08em",
                    textTransform: "uppercase",
                  }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Lawyer Listing (new component) ── */}
      <LawyerListing lawyers={lawyers} loading={loading} error={error} onBook={setBookingLawyer} />

      {/* ── Booking Modal ── */}
      {bookingLawyer && (
        <BookingModal
          lawyer={bookingLawyer}
          onClose={() => setBookingLawyer(null)}
          onConfirm={handleConfirmBooking}
        />
      )}

      {/* ── Success Modal (FAST FEEDBACK) ── */}
      <SuccessModal
        isOpen={showSuccessModal}
        booking={lastBooking}
        onClose={() => setShowSuccessModal(false)}
        onViewBooking={id => {
          setShowSuccessModal(false)
          router.push(`/bookings/${id}`)
        }}
      />

      {/* Loading overlay for payment processing */}
      {bookingLoading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1500,
          }}
        >
          <div
            style={{
              background: "var(--white)",
              borderRadius: 16,
              padding: "24px 32px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Loader size={18} color="var(--gold)" style={{ animation: "spin 1s linear infinite" }} />
            <span style={{ fontFamily: "var(--sans)", fontSize: 14 }}>
              Processing payment…
            </span>
          </div>
        </div>
      )}
    </>
  )
}