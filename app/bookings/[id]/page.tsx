"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter, usePathname } from "next/navigation"
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
    Shield,
    Download,
    Briefcase,
    FileText,
    CheckCircle2,
    XCircle,
    Clock,
    AlertCircle,
    Mail,
    Sparkles,
    ExternalLink,
} from "lucide-react"
import { toast, Toaster } from "sonner"
import { format } from "date-fns"

interface Booking {
    _id: string
    userId: string
    lawyerId: string
    userName: string
    lawyerName: string
    lawyerPhone?: string
    lawyerEmail?: string
    lawyerCity?: string
    date: string
    slot: string
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
    mode: 'video' | 'phone' | 'chat'
    amount: number
    paymentMode: string
    paymentStatus: string
    paymentId?: string
    createdAt?: string
    updatedAt?: string
    lawyerDetails?: {
        specialization?: string[]
        experience?: number
        bio?: string
        languages?: string[]
        consultationFee?: number
        averageRating?: number
        totalReviews?: number
    }
}

// ─── Theme Styles ──────────────────────────────────────────────────────────
function ThemeStyles() {
    useEffect(() => {
        const id = "booking-theme-styles"
        if (document.getElementById(id)) return
        const s = document.createElement("style")
        s.id = id
        s.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap');
            :root {
                --ink: #0a0a0a;
                --ink-2: #1a1a1a;
                --ink-4: #6b6b6b;
                --ink-5: #9a9a9a;
                --ink-7: #e8e8e8;
                --ink-8: #f4f3f0;
                --parchment: #faf9f6;
                --white: #ffffff;
                --gold: #c9a84c;
                --gold-lt: #e8c96a;
                --gold-dk: #8b6914;
                --gold-pale: #fdf6e3;
                --emerald: #10b981;
                --red: #c0392b;
                --serif: 'Cormorant Garamond', Georgia, serif;
                --sans: 'DM Sans', system-ui, sans-serif;
                --mono: 'DM Mono', monospace;
            }
            * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
            }
            html {
                scroll-behavior: smooth;
            }
            body {
                background: var(--white);
                color: var(--ink);
                font-family: var(--sans);
                -webkit-font-smoothing: antialiased;
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideInUp {
                from { opacity: 0; transform: translateY(24px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes shimmerGold {
                0% { background-position: -200% center; }
                100% { background-position: 200% center; }
            }
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
            .gold-text {
                background: linear-gradient(100deg, var(--gold-dk) 0%, var(--gold) 30%, var(--gold-lt) 50%, var(--gold) 70%, var(--gold-dk) 100%);
                background-size: 200% auto;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                animation: shimmerGold 4s linear infinite;
            }
            .luxury-card {
                background: var(--white);
                border: 1px solid var(--ink-7);
                border-radius: 12px;
                transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
            }
            .luxury-card:hover {
                border-color: var(--gold);
                box-shadow: 0 8px 24px rgba(201, 168, 76, 0.12);
            }
            .luxury-button {
                font-family: var(--sans);
                font-weight: 600;
                font-size: 13px;
                padding: 10px 18px;
                border-radius: 8px;
                border: none;
                cursor: pointer;
                transition: all 0.2s;
                display: inline-flex;
                align-items: center;
                gap: 6px;
            }
            .luxury-button-gold {
                background: var(--gold);
                color: var(--ink);
            }
            .luxury-button-gold:hover {
                background: var(--gold-lt);
                transform: translateY(-2px);
                box-shadow: 0 8px 16px rgba(201, 168, 76, 0.3);
            }
            .luxury-button-outline {
                background: transparent;
                color: var(--ink);
                border: 1px solid var(--ink-7);
            }
            .luxury-button-outline:hover {
                border-color: var(--gold);
                background: var(--gold-pale);
            }
            .status-badge {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                padding: 8px 14px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                letter-spacing: 0.05em;
                text-transform: uppercase;
            }
            .status-confirmed {
                background: var(--emerald);
                color: var(--white);
            }
            .status-pending {
                background: var(--gold-pale);
                color: var(--gold-dk);
            }
            .status-completed {
                background: var(--gold-pale);
                color: var(--gold-dk);
            }
            .status-cancelled {
                background: var(--ink-8);
                color: var(--ink-4);
            }
            .detail-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                gap: 20px;
            }
            @media (max-width: 768px) {
                .detail-grid {
                    grid-template-columns: 1fr;
                }
            }
            .tab-button {
                padding: 10px 16px;
                border: none;
                background: transparent;
                color: var(--ink-4);
                font-family: var(--sans);
                font-weight: 500;
                font-size: 13px;
                cursor: pointer;
                border-bottom: 2px solid transparent;
                transition: all 0.2s;
                display: inline-flex;
                align-items: center;
                gap: 6px;
            }
            .tab-button:hover {
                color: var(--ink);
            }
            .tab-button.active {
                color: var(--gold-dk);
                border-bottom-color: var(--gold);
            }
            @media (max-width: 640px) {
                .detail-grid {
                    grid-template-columns: 1fr;
                }
                .luxury-button {
                    width: 100%;
                    justify-content: center;
                }
            }
        `
        document.head.appendChild(s)
    }, [])
    return null
}

// ─── Contact Card Component ────────────────────────────────────────────────
function ContactCard({ booking, isLawyer }: { booking: Booking; isLawyer: boolean }) {
    if (isLawyer || !booking.lawyerPhone) return null

    return (
        <div style={{ marginTop: 32, paddingTop: 32, borderTop: `1px solid var(--ink-7)` }}>
            <h3 style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(18px, 4vw, 22px)",
                fontWeight: 600,
                marginBottom: 24,
            }}>
                Contact Information
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
                {/* Phone */}
                <div className="luxury-card" style={{ padding: 20 }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 12,
                    }}>
                        <div style={{
                            width: 40,
                            height: 40,
                            borderRadius: 8,
                            background: "var(--gold-pale)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <Phone size={18} color="var(--gold-dk)" />
                        </div>
                        <p style={{
                            fontSize: 10,
                            fontFamily: "var(--mono)",
                            color: "var(--ink-5)",
                            letterSpacing: ".08em",
                            textTransform: "uppercase",
                            fontWeight: 600,
                        }}>
                            Direct Phone
                        </p>
                    </div>
                    <p style={{
                        fontFamily: "var(--mono)",
                        fontSize: 16,
                        fontWeight: 600,
                        color: "var(--ink)",
                        marginBottom: 12,
                    }}>
                        {booking.lawyerPhone}
                    </p>
                    <button
                        onClick={() => window.open(`tel:${booking.lawyerPhone}`)}
                        className="luxury-button luxury-button-gold"
                        style={{ width: "100%" }}
                    >
                        <Phone size={14} />
                        Call Now
                    </button>
                </div>

                {/* Email */}
                {booking.lawyerEmail && (
                    <div className="luxury-card" style={{ padding: 20 }}>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            marginBottom: 12,
                        }}>
                            <div style={{
                                width: 40,
                                height: 40,
                                borderRadius: 8,
                                background: "var(--gold-pale)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <Mail size={18} color="var(--gold-dk)" />
                            </div>
                            <p style={{
                                fontSize: 10,
                                fontFamily: "var(--mono)",
                                color: "var(--ink-5)",
                                letterSpacing: ".08em",
                                textTransform: "uppercase",
                                fontWeight: 600,
                            }}>
                                Email Address
                            </p>
                        </div>
                        <p style={{
                            fontSize: 14,
                            fontWeight: 500,
                            color: "var(--ink)",
                            marginBottom: 12,
                            wordBreak: "break-all",
                        }}>
                            {booking.lawyerEmail}
                        </p>
                        <button
                            onClick={() => window.open(`mailto:${booking.lawyerEmail}`)}
                            className="luxury-button luxury-button-outline"
                            style={{ width: "100%" }}
                        >
                            <Mail size={14} />
                            Send Email
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

// ─── Detail Card Component ────────────────────────────────────────────────
function DetailCard({
    icon,
    label,
    value,
    subtext,
}: {
    icon: React.ReactNode
    label: string
    value: string
    subtext?: string
}) {
    return (
        <div className="luxury-card" style={{ padding: "clamp(16px, 3vw, 20px)" }}>
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
            }}>
                <span style={{ color: "var(--gold)" }}>{icon}</span>
                <p style={{
                    fontSize: 10,
                    fontFamily: "var(--mono)",
                    color: "var(--ink-5)",
                    letterSpacing: ".08em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                }}>
                    {label}
                </p>
            </div>
            <p style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(18px, 4vw, 22px)",
                fontWeight: 600,
                color: "var(--ink)",
                marginBottom: 4,
            }}>
                {value}
            </p>
            {subtext && (
                <p style={{
                    fontSize: 12,
                    color: "var(--ink-4)",
                }}>
                    {subtext}
                </p>
            )}
        </div>
    )
}

// ─── Status Timeline Component ─────────────────────────────────────────────
function StatusTimeline({ status }: { status: string }) {
    const steps = [
        { id: "pending", label: "Pending" },
        { id: "confirmed", label: "Confirmed" },
        { id: "completed", label: "Completed" },
    ]

    const currentIndex = steps.findIndex(s => s.id === status.toLowerCase())

    return (
        <div style={{ paddingTop: 32, paddingBottom: 32 }}>
            <h3 style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(16px, 4vw, 18px)",
                fontWeight: 600,
                marginBottom: 24,
            }}>
                Booking Status
            </h3>

            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}>
                {steps.map((step, index) => (
                    <div
                        key={step.id}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            flex: 1,
                            position: "relative",
                        }}
                    >
                        {/* Circle */}
                        <div
                            style={{
                                width: 44,
                                height: 44,
                                borderRadius: "50%",
                                background:
                                    index <= currentIndex ? "var(--gold)" : "var(--ink-8)",
                                border: `2px solid ${index <= currentIndex ? "var(--gold)" : "var(--ink-7)"
                                    }`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontFamily: "var(--sans)",
                                fontWeight: 600,
                                fontSize: 12,
                                color: index <= currentIndex ? "var(--ink)" : "var(--ink-5)",
                                transition: "all 0.3s",
                            }}
                        >
                            {index <= currentIndex ? "✓" : index + 1}
                        </div>

                        {/* Label */}
                        <p
                            style={{
                                marginTop: 8,
                                fontSize: 11,
                                fontFamily: "var(--mono)",
                                fontWeight: 600,
                                letterSpacing: ".08em",
                                textTransform: "uppercase",
                                color:
                                    index <= currentIndex ? "var(--ink)" : "var(--ink-5)",
                            }}
                        >
                            {step.label}
                        </p>

                        {/* Connector Line */}
                        {index < steps.length - 1 && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: 22,
                                    left: "50%",
                                    width: "100%",
                                    height: 2,
                                    background:
                                        index < currentIndex ? "var(--gold)" : "var(--ink-7)",
                                    transition: "all 0.3s",
                                    marginLeft: 22,
                                }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

// ─── Main Component ────────────────────────────────────────────────────────
export default function BookingDetails() {
    const [booking, setBooking] = useState<Booking | null>(null)
    const [loading, setLoading] = useState(true)
    const [cancelling, setCancelling] = useState(false)
    const [completing, setCompleting] = useState(false)
    const [activeTab, setActiveTab] = useState("overview")
    const params = useParams()
    const router = useRouter()
    const pathname = usePathname()
    const bookingId = (params?.id as string) || ""

    const isLawyer = pathname?.includes("/dashboard/lawyer") ?? false

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const token = localStorage.getItem("token")
                const response = await axios.get(
                    `https://nyaymitra-backend-production.up.railway.app/api/v1/booking/${bookingId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
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
            await axios.patch(
                `/api/v1/booking/${bookingId}/cancel`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            toast.success("Booking cancelled successfully")
            router.refresh()
        } catch (error) {
            console.error("Failed to cancel booking", error)
            toast.error("Failed to cancel booking")
        } finally {
            setCancelling(false)
        }
    }

    const handleCompleteBooking = async () => {
        setCompleting(true)
        try {
            const token = localStorage.getItem("token")
            await axios.patch(
                `https://nyaymitra-backend-production.up.railway.app/api/v1/booking/${bookingId}/complete`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            toast.success("Booking marked as completed")
            router.refresh()
        } catch (error) {
            console.error("Failed to complete booking", error)
            toast.error("Failed to complete booking")
        } finally {
            setCompleting(false)
        }
    }

    const downloadPaymentReceipt = () => {
        if (!booking) return

        const receiptContent = `
PAYMENT RECEIPT
════════════════════════════════════════

Booking ID: ${booking._id || "N/A"}
Date: ${booking.date ? format(new Date(booking.date), "PPPP") : "N/A"}
Time Slot: ${booking.slot || "N/A"}
Consultation Mode: ${booking.mode ? booking.mode.toUpperCase() : "N/A"}

CLIENT DETAILS
─────────────────────────────────────────
Name: ${booking.userName || "N/A"}

LEGAL PROFESSIONAL DETAILS
─────────────────────────────────────────
Name: ${booking.lawyerName || "N/A"}
Contact: ${booking.lawyerPhone || "N/A"}

PAYMENT SUMMARY
─────────────────────────────────────────
Amount: ₹${booking.amount || "0"}
Payment Method: ${booking.paymentMode ? booking.paymentMode.toUpperCase() : "N/A"}
Transaction ID: ${booking.paymentId || "N/A"}
Status: ${booking.paymentStatus ? booking.paymentStatus.toUpperCase() : "N/A"}

════════════════════════════════════════
Thank you for choosing our legal services.
Contact: nyaymitra.ai@gmail.com
    `.trim()

        const blob = new Blob([receiptContent], { type: "text/plain" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `Receipt_${booking._id ? booking._id.slice(0, 8) : "N/A"}_${format(
            new Date(),
            "yyyyMMdd"
        )}.txt`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    const getModeIcon = () => {
        if (!booking) return <Sparkles size={20} color="var(--gold)" />
        switch (booking.mode) {
            case "video":
                return <Video size={20} color="var(--gold)" />
            case "phone":
                return <Phone size={20} color="var(--gold)" />
            case "chat":
                return <MessageSquare size={20} color="var(--gold)" />
            default:
                return <Sparkles size={20} color="var(--gold)" />
        }
    }

    const getModeLabel = () => {
        if (!booking) return "Unknown"
        switch (booking.mode) {
            case "video":
                return "Video Call"
            case "phone":
                return "Phone Call"
            case "chat":
                return "Chat"
            default:
                return booking.mode || "Unknown"
        }
    }

    const getStatusBadgeClass = () => {
        switch (booking?.status) {
            case "confirmed":
                return "status-confirmed"
            case "pending":
                return "status-pending"
            case "completed":
                return "status-completed"
            case "cancelled":
                return "status-cancelled"
            default:
                return "status-pending"
        }
    }

    if (loading) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--white)",
                }}
            >
                <div style={{ textAlign: "center" }}>
                    <Loader
                        size={44}
                        color="var(--gold)"
                        style={{
                            animation: "spin 1s linear infinite",
                            marginBottom: 16,
                        }}
                    />
                    <p
                        style={{
                            color: "var(--ink-4)",
                            fontFamily: "var(--sans)",
                            fontSize: 14,
                        }}
                    >
                        Loading booking details...
                    </p>
                </div>
            </div>
        )
    }

    if (!booking) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--white)",
                    padding: 24,
                }}
            >
                <FileWarning size={56} color="var(--ink-5)" style={{ marginBottom: 24 }} />
                <h2
                    style={{
                        fontFamily: "var(--serif)",
                        fontSize: "clamp(24px, 5vw, 32px)",
                        fontWeight: 600,
                        marginBottom: 8,
                        color: "var(--ink)",
                    }}
                >
                    Booking Not Found
                </h2>
                <p
                    style={{
                        color: "var(--ink-4)",
                        fontSize: 14,
                        marginBottom: 24,
                        maxWidth: 400,
                        textAlign: "center",
                    }}
                >
                    The booking you're looking for doesn't exist or may have been removed.
                </p>
                <button
                    onClick={() => router.push("/all-bookings")}
                    className="luxury-button luxury-button-gold"
                >
                    ← Back to Bookings
                </button>
            </div>
        )
    }

    return (
        <>
            <ThemeStyles />
            <Toaster position="top-center" richColors />

            {/* Header */}
            <div
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 40,
                    borderBottom: `1px solid var(--ink-7)`,
                    background: "var(--white)",
                    backdropFilter: "blur(8px)",
                }}
            >
                <div
                    style={{
                        maxWidth: 1200,
                        margin: "0 auto",
                        padding: "clamp(12px, 3vw, 16px) clamp(16px, 5vw, 24px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 16,
                    }}
                >
                    <button
                        onClick={() => router.back()}
                        className="luxury-button luxury-button-outline"
                    >
                        <ArrowLeft size={14} />
                        <span style={{ display: "none" }} className="hidden-sm">
                            Back
                        </span>
                    </button>
                    <div style={{ flex: 1 }} />
                    <button
                        onClick={() => router.push("/all-bookings")}
                        className="luxury-button luxury-button-gold"
                    >
                        All Bookings
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    padding: "clamp(24px, 5vw, 48px) clamp(16px, 5vw, 24px)",
                }}
            >
                {/* Hero Section */}
                <div style={{ marginBottom: 48 }}>
                    <div style={{ marginBottom: 32 }}>
                        <div style={{ marginBottom: 16 }}>
                            <p
                                style={{
                                    fontSize: 10,
                                    fontFamily: "var(--mono)",
                                    color: "var(--ink-5)",
                                    letterSpacing: ".1em",
                                    textTransform: "uppercase",
                                    fontWeight: 600,
                                    marginBottom: 8,
                                }}
                            >
                                Booking Reference
                            </p>
                            <h1
                                style={{
                                    fontFamily: "var(--serif)",
                                    fontSize: "clamp(32px, 6vw, 48px)",
                                    fontWeight: 600,
                                    color: "var(--ink)",
                                    lineHeight: 1.1,
                                    marginBottom: 12,
                                }}
                            >
                                {booking.status === "cancelled"
                                    ? "Booking Cancelled"
                                    : "Consultation Scheduled"}
                            </h1>
                            <p
                                style={{
                                    fontSize: "clamp(14px, 2vw, 16px)",
                                    color: "var(--ink-4)",
                                    lineHeight: 1.6,
                                    maxWidth: 600,
                                }}
                            >
                                {booking.status === "cancelled"
                                    ? "This booking is no longer active."
                                    : `Your ${getModeLabel()} consultation with ${isLawyer ? booking.userName : `Advocate ${booking.lawyerName}`
                                    } is scheduled for ${format(new Date(booking.date), "MMMM d, yyyy")} at ${booking.slot
                                    }`}
                            </p>
                        </div>

                        {/* Status Badges */}
                        <div
                            style={{
                                display: "flex",
                                gap: 12,
                                flexWrap: "wrap",
                                alignItems: "center",
                            }}
                        >
                            <span
                                className={`status-badge ${getStatusBadgeClass()}`}
                            >
                                {booking.status.charAt(0).toUpperCase() +
                                    booking.status.slice(1)}
                            </span>
                            <span
                                className="status-badge"
                                style={{
                                    background: "var(--gold-pale)",
                                    color: "var(--gold-dk)",
                                }}
                            >
                                {getModeIcon()}
                                {getModeLabel()}
                            </span>
                        </div>
                    </div>

                    {/* Status Timeline */}
                    <StatusTimeline status={booking.status} />
                </div>

                {/* Alert Sections */}
                {booking.status === "pending" && (
                    <div
                        className="luxury-card"
                        style={{
                            padding: 20,
                            background: "var(--gold-pale)",
                            border: `1px solid var(--gold)`,
                            marginBottom: 32,
                        }}
                    >
                        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                            <AlertCircle size={20} color="var(--gold-dk)" style={{ flexShrink: 0 }} />
                            <div>
                                <h3
                                    style={{
                                        fontWeight: 600,
                                        color: "var(--gold-dk)",
                                        marginBottom: 4,
                                    }}
                                >
                                    Awaiting Confirmation
                                </h3>
                                <p style={{ fontSize: 13, color: "var(--gold-dk)" }}>
                                    This booking is pending confirmation from the{" "}
                                    {isLawyer ? "client" : "legal professional"}. You'll receive a
                                    notification once confirmed.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {booking.status === "cancelled" && (
                    <div
                        className="luxury-card"
                        style={{
                            padding: 20,
                            background: "var(--ink-8)",
                            border: `1px solid var(--ink-7)`,
                            marginBottom: 32,
                        }}
                    >
                        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                            <XCircle size={20} color="var(--ink-4)" style={{ flexShrink: 0 }} />
                            <div>
                                <h3
                                    style={{
                                        fontWeight: 600,
                                        color: "var(--ink)",
                                        marginBottom: 4,
                                    }}
                                >
                                    Booking Cancelled
                                </h3>
                                <p style={{ fontSize: 13, color: "var(--ink-4)" }}>
                                    Cancelled on{" "}
                                    {format(
                                        new Date(booking.updatedAt || booking.createdAt || new Date()),
                                        "MMMM d, yyyy"
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tabs */}
                <div style={{ marginBottom: 32 }}>
                    <div
                        style={{
                            display: "flex",
                            gap: 8,
                            borderBottom: `1px solid var(--ink-7)`,
                            marginBottom: 32,
                            overflowX: "auto",
                            paddingBottom: 0,
                        }}
                    >
                        {["overview", "details", "actions"].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className="tab-button"
                                style={{
                                    borderBottomColor:
                                        activeTab === tab ? "var(--gold)" : "transparent",
                                    color:
                                        activeTab === tab ? "var(--gold-dk)" : "var(--ink-4)",
                                }}
                            >
                                {tab === "overview" && <Briefcase size={14} />}
                                {tab === "details" && <User size={14} />}
                                {tab === "actions" && <Zap size={14} />}
                                <span style={{ textTransform: "capitalize" }}>{tab}</span>
                            </button>
                        ))}
                    </div>

                    {/* Overview Tab */}
                    {activeTab === "overview" && (
                        <div>
                            <h2
                                style={{
                                    fontFamily: "var(--serif)",
                                    fontSize: "clamp(20px, 4vw, 24px)",
                                    fontWeight: 600,
                                    marginBottom: 20,
                                    color: "var(--ink)",
                                }}
                            >
                                Booking Details
                            </h2>

                            <div className="detail-grid">
                                <DetailCard
                                    icon={<CalendarDays size={18} />}
                                    label="Date"
                                    value={format(new Date(booking.date), "MMM d, yyyy")}
                                    subtext={format(new Date(booking.date), "EEEE")}
                                />
                                <DetailCard
                                    icon={<Clock3 size={18} />}
                                    label="Time Slot"
                                    value={booking.slot}
                                />
                                <DetailCard
                                    icon={getModeIcon()}
                                    label="Consultation Mode"
                                    value={getModeLabel()}
                                />
                                <DetailCard
                                    icon={<Wallet size={18} />}
                                    label="Amount"
                                    value={`₹${booking.amount}`}
                                    subtext={booking.paymentStatus}
                                />
                            </div>

                            {/* Payment Information */}
                            <div style={{ marginTop: 40 }}>
                                <h3
                                    style={{
                                        fontFamily: "var(--serif)",
                                        fontSize: "clamp(18px, 4vw, 22px)",
                                        fontWeight: 600,
                                        marginBottom: 20,
                                        color: "var(--ink)",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                    }}
                                >
                                    <CreditCard size={20} color="var(--gold)" />
                                    Payment Information
                                </h3>

                                <div className="detail-grid">
                                    <div className="luxury-card" style={{ padding: 20 }}>
                                        <p
                                            style={{
                                                fontSize: 10,
                                                fontFamily: "var(--mono)",
                                                color: "var(--ink-5)",
                                                letterSpacing: ".08em",
                                                textTransform: "uppercase",
                                                fontWeight: 600,
                                                marginBottom: 8,
                                            }}
                                        >
                                            Payment Method
                                        </p>
                                        <p
                                            style={{
                                                fontSize: 18,
                                                fontWeight: 600,
                                                color: "var(--ink)",
                                                textTransform: "capitalize",
                                            }}
                                        >
                                            {booking.paymentMode}
                                        </p>
                                    </div>
                                    <div className="luxury-card" style={{ padding: 20 }}>
                                        <p
                                            style={{
                                                fontSize: 10,
                                                fontFamily: "var(--mono)",
                                                color: "var(--ink-5)",
                                                letterSpacing: ".08em",
                                                textTransform: "uppercase",
                                                fontWeight: 600,
                                                marginBottom: 8,
                                            }}
                                        >
                                            Payment Status
                                        </p>
                                        <span
                                            className={`status-badge ${booking.paymentStatus === "paid"
                                                ? "status-confirmed"
                                                : "status-pending"
                                                }`}
                                        >
                                            {booking.paymentStatus}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={downloadPaymentReceipt}
                                    className="luxury-button luxury-button-outline"
                                    style={{ width: "100%", marginTop: 20 }}
                                >
                                    <Download size={14} />
                                    Download Payment Receipt
                                </button>
                            </div>

                            {/* Contact Information */}
                            <ContactCard booking={booking} isLawyer={isLawyer} />

                            {/* Parties Card */}
                            <div style={{ marginTop: 40 }}>
                                <h3
                                    style={{
                                        fontFamily: "var(--serif)",
                                        fontSize: "clamp(18px, 4vw, 22px)",
                                        fontWeight: 600,
                                        marginBottom: 20,
                                        color: "var(--ink)",
                                    }}
                                >
                                    Parties Involved
                                </h3>
                                <div className="detail-grid">
                                    <div className="luxury-card" style={{ padding: 24 }}>
                                        <p
                                            style={{
                                                fontSize: 10,
                                                fontFamily: "var(--mono)",
                                                color: "var(--ink-5)",
                                                letterSpacing: ".08em",
                                                textTransform: "uppercase",
                                                fontWeight: 600,
                                                marginBottom: 12,
                                            }}
                                        >
                                            Client
                                        </p>
                                        <p
                                            style={{
                                                fontFamily: "var(--serif)",
                                                fontSize: "clamp(16px, 3vw, 20px)",
                                                fontWeight: 600,
                                                color: "var(--ink)",
                                            }}
                                        >
                                            {booking.userName}
                                        </p>
                                    </div>
                                    <div className="luxury-card" style={{ padding: 24 }}>
                                        <p
                                            style={{
                                                fontSize: 10,
                                                fontFamily: "var(--mono)",
                                                color: "var(--ink-5)",
                                                letterSpacing: ".08em",
                                                textTransform: "uppercase",
                                                fontWeight: 600,
                                                marginBottom: 12,
                                            }}
                                        >
                                            Legal Professional
                                        </p>
                                        <p
                                            style={{
                                                fontFamily: "var(--serif)",
                                                fontSize: "clamp(16px, 3vw, 20px)",
                                                fontWeight: 600,
                                                color: "var(--ink)",
                                            }}
                                        >
                                            {booking.lawyerName}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Details Tab */}
                    {activeTab === "details" && (
                        <div>
                            <h2
                                style={{
                                    fontFamily: "var(--serif)",
                                    fontSize: "clamp(20px, 4vw, 24px)",
                                    fontWeight: 600,
                                    marginBottom: 20,
                                    color: "var(--ink)",
                                }}
                            >
                                {isLawyer ? "Client" : "Legal Professional"} Details
                            </h2>

                            <div className="luxury-card" style={{ padding: "clamp(24px, 5vw, 32px)" }}>
                                {/* Header */}
                                <div style={{ marginBottom: 32 }}>
                                    <div
                                        style={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: 12,
                                            background: "var(--gold)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginBottom: 16,
                                            fontFamily: "var(--serif)",
                                            fontSize: 32,
                                            fontWeight: 700,
                                            color: "var(--ink)",
                                        }}
                                    >
                                        {isLawyer
                                            ? booking.userName.charAt(0).toUpperCase()
                                            : booking.lawyerName.charAt(0).toUpperCase()}
                                    </div>
                                    <h3
                                        style={{
                                            fontFamily: "var(--serif)",
                                            fontSize: "clamp(22px, 4vw, 28px)",
                                            fontWeight: 600,
                                            color: "var(--ink)",
                                            marginBottom: 8,
                                        }}
                                    >
                                        {isLawyer ? booking.userName : `Advocate ${booking.lawyerName}`}
                                    </h3>
                                    <p style={{ color: "var(--ink-4)", fontSize: 14 }}>
                                        {isLawyer ? "Client" : "Legal Expert"}
                                    </p>
                                </div>

                                {/* Lawyer Details */}
                                {!isLawyer && booking.lawyerDetails && (
                                    <div style={{ borderTop: `1px solid var(--ink-7)`, paddingTop: 24 }}>
                                        {booking.lawyerDetails.specialization && (
                                            <div style={{ marginBottom: 24 }}>
                                                <h4
                                                    style={{
                                                        fontWeight: 600,
                                                        color: "var(--ink)",
                                                        marginBottom: 12,
                                                    }}
                                                >
                                                    Specializations
                                                </h4>
                                                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                                    {booking.lawyerDetails.specialization.map(spec => (
                                                        <span
                                                            key={spec}
                                                            style={{
                                                                display: "inline-flex",
                                                                alignItems: "center",
                                                                padding: "6px 12px",
                                                                borderRadius: 20,
                                                                border: `1px solid var(--ink-7)`,
                                                                fontSize: 12,
                                                                color: "var(--ink-4)",
                                                            }}
                                                        >
                                                            {spec}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {booking.lawyerDetails.experience && (
                                            <div style={{ marginBottom: 24 }}>
                                                <h4
                                                    style={{
                                                        fontWeight: 600,
                                                        color: "var(--ink)",
                                                        marginBottom: 8,
                                                    }}
                                                >
                                                    Experience
                                                </h4>
                                                <p style={{ color: "var(--ink)", fontSize: 14 }}>
                                                    {booking.lawyerDetails.experience}+ years in practice
                                                </p>
                                            </div>
                                        )}

                                        {booking.lawyerDetails.languages && (
                                            <div style={{ marginBottom: 24 }}>
                                                <h4
                                                    style={{
                                                        fontWeight: 600,
                                                        color: "var(--ink)",
                                                        marginBottom: 12,
                                                    }}
                                                >
                                                    Languages
                                                </h4>
                                                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                                    {booking.lawyerDetails.languages.map(lang => (
                                                        <span
                                                            key={lang}
                                                            style={{
                                                                display: "inline-flex",
                                                                alignItems: "center",
                                                                padding: "6px 12px",
                                                                borderRadius: 20,
                                                                border: `1px solid var(--ink-7)`,
                                                                fontSize: 12,
                                                                color: "var(--ink-4)",
                                                            }}
                                                        >
                                                            {lang}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {booking.lawyerDetails.bio && (
                                            <div>
                                                <h4
                                                    style={{
                                                        fontWeight: 600,
                                                        color: "var(--ink)",
                                                        marginBottom: 8,
                                                    }}
                                                >
                                                    About
                                                </h4>
                                                <p
                                                    style={{
                                                        color: "var(--ink-4)",
                                                        fontSize: 14,
                                                        lineHeight: 1.6,
                                                    }}
                                                >
                                                    {booking.lawyerDetails.bio}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Contact Section */}
                                <div style={{ borderTop: `1px solid var(--ink-7)`, paddingTop: 24, marginTop: 24 }}>
                                    <ContactCard booking={booking} isLawyer={isLawyer} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Actions Tab */}
                    {activeTab === "actions" && (
                        <div>
                            <h2
                                style={{
                                    fontFamily: "var(--serif)",
                                    fontSize: "clamp(20px, 4vw, 24px)",
                                    fontWeight: 600,
                                    marginBottom: 20,
                                    color: "var(--ink)",
                                }}
                            >
                                Actions & Options
                            </h2>

                            <div className="detail-grid">
                                <button
                                    onClick={downloadPaymentReceipt}
                                    className="luxury-button luxury-button-outline"
                                    style={{
                                        padding: "clamp(14px, 3vw, 18px)",
                                        width: "100%",
                                        justifyContent: "flex-start",
                                    }}
                                >
                                    <Download size={16} />
                                    <div style={{ textAlign: "left" }}>
                                        <div style={{ fontWeight: 600, fontSize: 13 }}>
                                            Download Receipt
                                        </div>
                                        <div style={{ fontSize: 11, color: "var(--ink-5)" }}>
                                            Payment confirmation
                                        </div>
                                    </div>
                                </button>

                                {!isLawyer &&
                                    booking.status !== "cancelled" &&
                                    booking.status !== "completed" && (
                                        <>
                                            <button
                                                onClick={handleCancelBooking}
                                                disabled={cancelling}
                                                className="luxury-button luxury-button-outline"
                                                style={{
                                                    padding: "clamp(14px, 3vw, 18px)",
                                                    width: "100%",
                                                    justifyContent: "flex-start",
                                                    borderColor: "var(--red)",
                                                    color: "var(--red)",
                                                }}
                                            >
                                                {cancelling ? (
                                                    <Loader size={16} style={{ animation: "spin 1s linear infinite" }} />
                                                ) : (
                                                    <FileWarning size={16} />
                                                )}
                                                <div style={{ textAlign: "left" }}>
                                                    <div style={{ fontWeight: 600, fontSize: 13 }}>
                                                        Cancel Booking
                                                    </div>
                                                    <div style={{ fontSize: 11, color: "var(--ink-5)" }}>
                                                        Cancel this appointment
                                                    </div>
                                                </div>
                                            </button>
                                        </>
                                    )}

                                {isLawyer && booking.status === "confirmed" && (
                                    <button
                                        onClick={handleCompleteBooking}
                                        disabled={completing}
                                        className="luxury-button luxury-button-gold"
                                        style={{
                                            padding: "clamp(14px, 3vw, 18px)",
                                            width: "100%",
                                            justifyContent: "flex-start",
                                        }}
                                    >
                                        {completing ? (
                                            <Loader size={16} style={{ animation: "spin 1s linear infinite" }} />
                                        ) : (
                                            <CheckCircle2 size={16} />
                                        )}
                                        <div style={{ textAlign: "left" }}>
                                            <div style={{ fontWeight: 600, fontSize: 13 }}>Mark Complete</div>
                                            <div style={{ fontSize: 11, color: "var(--ink)" }}>
                                                Finish consultation
                                            </div>
                                        </div>
                                    </button>
                                )}

                                {booking.mode === "phone" && !isLawyer && (
                                    <button
                                        onClick={() => window.open(`tel:${booking.lawyerPhone}`)}
                                        className="luxury-button luxury-button-gold"
                                        style={{
                                            padding: "clamp(14px, 3vw, 18px)",
                                            width: "100%",
                                            justifyContent: "flex-start",
                                        }}
                                    >
                                        <Phone size={16} />
                                        <div style={{ textAlign: "left" }}>
                                            <div style={{ fontWeight: 600, fontSize: 13 }}>Call Now</div>
                                            <div style={{ fontSize: 11, color: "var(--ink)" }}>
                                                Direct consultation
                                            </div>
                                        </div>
                                    </button>
                                )}
                            </div>

                            {/* Support Section */}
                            <div className="luxury-card" style={{
                                padding: "clamp(24px, 5vw, 32px)",
                                marginTop: 32,
                                background: "var(--ink-8)",
                            }}>
                                <h3
                                    style={{
                                        fontFamily: "var(--serif)",
                                        fontSize: "clamp(18px, 4vw, 22px)",
                                        fontWeight: 600,
                                        color: "var(--ink)",
                                        marginBottom: 12,
                                    }}
                                >
                                    Need Assistance?
                                </h3>
                                <p style={{
                                    color: "var(--ink-4)",
                                    fontSize: 14,
                                    marginBottom: 16,
                                    lineHeight: 1.6,
                                }}>
                                    Our support team is available to help with any questions about
                                    your booking or consultation.
                                </p>
                                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                                    <button
                                        className="luxury-button luxury-button-gold"
                                    >
                                        <MessageSquare size={14} />
                                        Contact Support
                                    </button>
                                    <a
                                        href="mailto:nyaymitra.ai@gmail.com"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <button className="luxury-button luxury-button-outline">
                                            <Mail size={14} />
                                            Email Us
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}