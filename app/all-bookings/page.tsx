"use client"

import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { format } from "date-fns"
import {
    CalendarDays, Clock, Video, Phone, MessageSquare, MapPin,
    ChevronRight, Loader2, CreditCard, Scale, User,
    CheckCircle2, XCircle, Clock4, Gavel, ChevronLeft,
    Home, Mail, Menu, X, Star, Sparkles, Briefcase,
    ArrowUpRight, Receipt, Filter,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Link from "next/link"

// ─── Global Styles ─────────────────────────────────────────────────────────────
function GlobalStyles() {
    useEffect(() => {
        const id = "bookings-theme-styles"
        if (document.getElementById(id)) return
        const s = document.createElement("style")
        s.id = id
        s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=DM+Mono:wght@400;500&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body {
        background: #faf9f6;
        color: #0a0a0a;
        font-family: 'DM Sans', system-ui, sans-serif;
        -webkit-font-smoothing: antialiased;
      }

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
        --emerald:    #10b981;
        --red:        #c0392b;
        --amber:      #f59e0b;
        --purple:     #7c3aed;
        --serif:      'Cormorant Garamond', Georgia, serif;
        --sans:       'DM Sans', system-ui, sans-serif;
        --mono:       'DM Mono', monospace;
      }

      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(20px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes shimmer {
        0%   { background-position: -200% center; }
        100% { background-position:  200% center; }
      }
      @keyframes spin { to { transform: rotate(360deg); } }
      @keyframes pulse-dot {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0.4; }
      }

      /* Reveal */
      .bk-reveal {
        opacity: 0;
        transform: translateY(18px);
        transition: opacity .6s cubic-bezier(.22,1,.36,1),
                    transform .6s cubic-bezier(.22,1,.36,1);
      }
      .bk-reveal.on { opacity: 1; transform: translateY(0); }

      /* Gold shimmer text */
      .gold-shimmer {
        background: linear-gradient(100deg, var(--gold-dk) 0%, var(--gold) 30%, var(--gold-lt) 50%, var(--gold) 70%, var(--gold-dk) 100%);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: shimmer 4s linear infinite;
      }

      /* Eyebrow */
      .eyebrow {
        display: inline-flex; align-items: center; gap: 10px;
        font-family: var(--mono); font-size: 9.5px; font-weight: 500;
        letter-spacing: .2em; text-transform: uppercase; color: var(--gold-dk);
      }
      .eyebrow::before, .eyebrow::after {
        content: ''; width: 22px; height: 1px; background: var(--gold); flex-shrink: 0;
      }

      /* ── NAV ── */
      .bk-nav {
        position: sticky; top: 0; z-index: 100;
        background: rgba(255,255,255,.96);
        border-bottom: 1px solid var(--ink-7);
        backdrop-filter: blur(16px);
      }
      .bk-nav-inner {
        max-width: 1200px; margin: 0 auto; padding: 0 24px;
        height: 60px; display: flex; align-items: center; justify-content: space-between;
      }
      .bk-nav-logo {
        display: flex; align-items: center; gap: 10px; text-decoration: none;
      }
      .bk-nav-logo-icon {
        width: 34px; height: 34px; background: var(--ink); border-radius: 8px;
        display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      }
      .bk-nav-logo-text {
        font-family: var(--serif); font-size: 17px; font-weight: 700; color: var(--ink);
      }
      .nav-link {
        font-family: var(--sans); font-size: 13px; font-weight: 500;
        color: var(--ink-4); text-decoration: none; padding: 7px 12px;
        border-radius: 6px; transition: all .18s;
      }
      .nav-link:hover { color: var(--ink); background: var(--ink-8); }
      .btn-gold-sm {
        display: inline-flex; align-items: center; gap: 6px;
        padding: 6px 14px; border-radius: 8px; font-size: 12px; font-weight: 600;
        font-family: var(--sans); cursor: pointer; border: none; text-decoration: none;
        background: var(--gold); color: var(--ink); transition: all .2s;
      }
      .btn-gold-sm:hover { background: var(--gold-lt); transform: translateY(-1px); }
      .mobile-only { display: none; }
      .desktop-only { display: flex; }
      @media (max-width: 768px) {
        .mobile-only { display: flex; }
        .desktop-only { display: none !important; }
        .bk-nav-inner { padding: 0 16px; }
      }

      /* Mobile nav dropdown */
      .mobile-nav-menu {
        border-top: 1px solid var(--ink-7);
        background: var(--white);
        padding: 12px 16px;
        display: flex; flex-direction: column; gap: 8px;
      }

      /* ── CONTAINER ── */
      .bk-container {
        max-width: 1200px; margin: 0 auto; padding: 0 24px;
      }
      @media (max-width: 640px) { .bk-container { padding: 0 14px; } }

      /* ── HERO ── */
      .bk-hero {
        padding: 32px 0 20px;
        border-bottom: 1px solid var(--ink-7);
        margin-bottom: 28px;
      }
      .bk-hero-stats {
        display: flex; gap: 28px; flex-wrap: wrap; margin-top: 20px;
      }
      @media (max-width: 540px) {
        .bk-hero-stats { gap: 14px; justify-content: space-between; }
      }

      /* ── TABS ── */
      .bk-tabs {
        display: flex; gap: 4px; flex-wrap: wrap;
        border-bottom: 1px solid var(--ink-7);
        margin-bottom: 24px; padding-bottom: 0;
      }
      .bk-tab {
        padding: 8px 14px; font-size: 12px; font-weight: 500;
        font-family: var(--sans); border: none; background: none;
        color: var(--ink-5); cursor: pointer; border-bottom: 2px solid transparent;
        margin-bottom: -1px; transition: all .18s; border-radius: 4px 4px 0 0;
        display: flex; align-items: center; gap: 6px; white-space: nowrap;
      }
      .bk-tab:hover { color: var(--ink); background: var(--ink-8); }
      .bk-tab.active {
        color: var(--ink); border-bottom-color: var(--gold);
        font-weight: 600;
      }
      .tab-count {
        font-family: var(--mono); font-size: 9px; padding: 1px 5px;
        border-radius: 100px; background: var(--ink-8); color: var(--ink-5);
      }
      .bk-tab.active .tab-count { background: var(--gold-pale); color: var(--gold-dk); }

      /* ── BOOKING CARD ── */
      .bk-card {
        background: var(--white);
        border: 1px solid var(--ink-7);
        border-radius: 16px;
        overflow: hidden;
        transition: all .22s cubic-bezier(.22,1,.36,1);
        animation: fadeUp .5s cubic-bezier(.22,1,.36,1) both;
        position: relative;
      }
      .bk-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 28px rgba(0,0,0,.06);
        border-color: var(--ink-6);
      }
      .bk-card-accent {
        position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
      }

      /* Card header */
      .bk-card-header {
        padding: 16px 20px 12px;
        display: flex; align-items: flex-start; justify-content: space-between;
        gap: 12px; flex-wrap: wrap;
        border-bottom: 1px solid var(--ink-8);
      }
      .bk-card-name {
        font-family: var(--serif); font-size: 17px; font-weight: 600;
        color: var(--ink); display: flex; align-items: center; gap: 8px;
        flex-wrap: wrap;
      }
      .bk-card-mode {
        display: flex; align-items: center; gap: 5px;
        font-size: 11px; color: var(--ink-5); margin-top: 4px;
      }

      /* Status badge */
      .status-badge {
        display: inline-flex; align-items: center; gap: 5px;
        padding: 4px 10px; border-radius: 100px;
        font-size: 10px; font-weight: 600; font-family: var(--mono);
        letter-spacing: .04em; text-transform: uppercase; flex-shrink: 0;
      }
      .status-confirmed  { background: rgba(16,185,129,.1);  color: #065f46; border: 1px solid rgba(16,185,129,.2); }
      .status-pending    { background: rgba(245,158,11,.1);  color: #92400e; border: 1px solid rgba(245,158,11,.2); }
      .status-cancelled  { background: rgba(192,57,43,.1);   color: #7f1d1d; border: 1px solid rgba(192,57,43,.2); }
      .status-completed  { background: rgba(124,58,237,.1);  color: #4c1d95; border: 1px solid rgba(124,58,237,.2); }

      /* Card body */
      .bk-card-body {
        padding: 14px 20px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
      }
      @media (max-width: 640px) {
        .bk-card-body { grid-template-columns: repeat(2, 1fr); }
      }
      @media (max-width: 400px) {
        .bk-card-body { grid-template-columns: 1fr; }
      }
      .bk-card-field-label {
        font-family: var(--mono); font-size: 9px; color: var(--ink-5);
        letter-spacing: .1em; text-transform: uppercase; margin-bottom: 4px;
      }
      .bk-card-field-value {
        display: flex; align-items: center; gap: 6px;
        font-size: 12px; color: var(--ink); font-weight: 500;
      }

      /* Card footer */
      .bk-card-footer {
        padding: 10px 20px 14px;
        display: flex; align-items: center; justify-content: space-between;
        gap: 8px; flex-wrap: wrap;
        border-top: 1px solid var(--ink-8);
      }
      .btn-ghost-sm {
        display: inline-flex; align-items: center; gap: 5px;
        padding: 6px 12px; border-radius: 7px; font-size: 11px; font-weight: 500;
        font-family: var(--sans); cursor: pointer; transition: all .15s;
        background: transparent; border: 1px solid var(--ink-7); color: var(--ink-4);
      }
      .btn-ghost-sm:hover { border-color: var(--ink-5); color: var(--ink); }
      .btn-ink-sm {
        display: inline-flex; align-items: center; gap: 5px;
        padding: 6px 14px; border-radius: 7px; font-size: 11px; font-weight: 600;
        font-family: var(--sans); cursor: pointer; transition: all .15s;
        background: var(--ink); color: var(--white); border: none;
      }
      .btn-ink-sm:hover { background: var(--ink-2); transform: translateY(-1px); }
      .btn-purple-sm {
        display: inline-flex; align-items: center; gap: 5px;
        padding: 6px 14px; border-radius: 7px; font-size: 11px; font-weight: 600;
        font-family: var(--sans); cursor: pointer; transition: all .15s;
        background: var(--purple); color: var(--white); border: none;
      }
      .btn-purple-sm:hover { opacity: .88; transform: translateY(-1px); }

      /* Mode accent colors */
      .mode-video    { color: #4f46e5; }
      .mode-call     { color: #0369a1; }
      .mode-chat     { color: #db2777; }
      .mode-inPerson { color: #c2410c; }

      /* ── SKELETON ── */
      .skel {
        background: linear-gradient(90deg, var(--ink-8) 25%, var(--ink-7) 50%, var(--ink-8) 75%);
        background-size: 200% 100%;
        animation: shimmer 1.4s infinite;
        border-radius: 6px;
      }

      /* ── EMPTY STATE ── */
      .bk-empty {
        border: 1.5px dashed var(--ink-6);
        border-radius: 16px;
        padding: 56px 24px;
        text-align: center;
        background: var(--white);
      }
      .bk-empty-icon {
        width: 56px; height: 56px; border-radius: 50%;
        background: var(--ink-8);
        display: flex; align-items: center; justify-content: center;
        margin: 0 auto 16px;
      }

      /* ── PAGINATION ── */
      .bk-pagination {
        display: flex; align-items: center; justify-content: space-between;
        flex-wrap: wrap; gap: 12px;
        padding: 20px 0 8px;
        border-top: 1px solid var(--ink-7);
        margin-top: 20px;
      }
      .bk-page-info {
        font-family: var(--mono); font-size: 10px; color: var(--ink-5);
      }
      .bk-page-btns { display: flex; align-items: center; gap: 5px; }
      .bk-page-btn {
        width: 30px; height: 30px; border-radius: 7px; border: 1px solid var(--ink-7);
        background: var(--white); font-size: 11px; font-family: var(--mono);
        color: var(--ink-4); cursor: pointer; transition: all .14s;
        display: flex; align-items: center; justify-content: center;
      }
      .bk-page-btn:hover:not(:disabled) { border-color: var(--gold); color: var(--gold-dk); background: var(--gold-pale); }
      .bk-page-btn:disabled { opacity: .35; cursor: not-allowed; }
      .bk-page-btn.active { background: var(--ink); color: var(--white); border-color: var(--ink); }

      /* ── REVIEW MODAL ── */
      .bk-modal-overlay {
        position: fixed; inset: 0;
        background: rgba(0,0,0,.65);
        backdrop-filter: blur(8px);
        display: flex; align-items: center; justify-content: center;
        z-index: 1000; padding: 16px;
      }
      .bk-modal {
        background: var(--white);
        border-radius: 20px;
        border: 1px solid var(--ink-7);
        box-shadow: 0 24px 48px rgba(0,0,0,.18);
        max-width: 440px; width: 100%;
        overflow: hidden;
      }
      .bk-modal-header {
        padding: 18px 22px 14px;
        border-bottom: 1px solid var(--ink-8);
        display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;
      }
      .bk-modal-title {
        font-family: var(--serif); font-size: 18px; font-weight: 600;
      }
      .bk-modal-body { padding: 18px 22px; }
      .bk-modal-footer {
        padding: 12px 22px 18px;
        display: flex; gap: 8px; justify-content: flex-end;
        border-top: 1px solid var(--ink-8);
      }

      /* Review stars */
      .review-stars { display: flex; gap: 4px; }
      .star-btn {
        background: none; border: none; cursor: pointer; padding: 2px;
        transition: transform .12s;
      }
      .star-btn:hover { transform: scale(1.18); }

      /* Review textarea */
      .bk-textarea {
        width: 100%; padding: 10px 12px;
        border: 1px solid var(--ink-7); border-radius: 10px;
        font-size: 13px; font-family: var(--sans); color: var(--ink);
        background: var(--white); resize: vertical; min-height: 90px;
        outline: none; transition: border-color .2s;
        line-height: 1.55;
      }
      .bk-textarea:focus { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(201,168,76,.08); }
      .bk-textarea::placeholder { color: var(--ink-6); }

      /* Field label */
      .field-label {
        font-family: var(--mono); font-size: 9px; letter-spacing: .12em;
        text-transform: uppercase; color: var(--ink-5); margin-bottom: 7px; display: block;
      }

      /* ── TIMELINE DOT ── */
      .timeline-dot {
        width: 8px; height: 8px; border-radius: 50%;
        background: var(--ink-6); flex-shrink: 0;
        margin-top: 22px; transition: background .2s;
      }
      .bk-card:hover ~ .timeline-dot,
      .timeline-item:hover .timeline-dot { background: var(--gold); }

      /* ── FOOTER ── */
      .bk-footer {
        background: var(--ink); border-top: 1px solid rgba(255,255,255,.07);
        margin-top: 56px;
      }
      .bk-footer-inner {
        max-width: 1200px; margin: 0 auto;
        padding: 44px 24px 28px;
        display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 40px;
      }
      @media (max-width: 768px) {
        .bk-footer-inner { grid-template-columns: 1fr 1fr; gap: 28px; }
      }
      @media (max-width: 480px) {
        .bk-footer-inner { grid-template-columns: 1fr; gap: 24px; }
      }
      .bk-footer-brand {
        font-family: var(--serif); font-size: 20px; font-weight: 700; color: var(--white);
      }
      .bk-footer-desc {
        font-size: 12px; color: rgba(255,255,255,.38); line-height: 1.65; margin-top: 8px;
      }
      .bk-footer-section-title {
        font-family: var(--mono); font-size: 9px; letter-spacing: .2em;
        text-transform: uppercase; color: var(--gold); margin-bottom: 12px;
      }
      .bk-footer-link {
        display: block; font-size: 12px; color: rgba(255,255,255,.45);
        text-decoration: none; padding: 3px 0; transition: color .15s;
      }
      .bk-footer-link:hover { color: rgba(255,255,255,.85); }
      .bk-footer-divider {
        max-width: 1200px; margin: 0 auto;
        padding: 16px 24px;
        border-top: 1px solid rgba(255,255,255,.07);
        display: flex; align-items: center; justify-content: space-between;
        flex-wrap: wrap; gap: 8px;
      }
      .bk-footer-copy {
        font-family: var(--mono); font-size: 9px; color: rgba(255,255,255,.25);
        letter-spacing: .06em;
      }

      /* Gold accent line separator */
      .gold-sep {
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--gold), transparent);
        margin: 28px 0; opacity: .4;
      }

      /* Responsive tweaks */
      @media (max-width: 640px) {
        .bk-card-header { padding: 14px 16px 10px; }
        .bk-card-body   { padding: 12px 16px; }
        .bk-card-footer { padding: 8px 16px 12px; }
        .bk-card-name   { font-size: 15px; }
      }
    `
        document.head.appendChild(s)
    }, [])
    return null
}

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Booking {
    _id: string
    userName: string
    lawyerName: string
    lawyerId: string
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

// ─── Config ────────────────────────────────────────────────────────────────────
const MODE_ICONS: Record<string, React.FC<{ size: number; className?: string }>> = {
    video: Video, call: Phone, chat: MessageSquare, inPerson: MapPin,
}
const STATUS_CONFIG: Record<string, { icon: React.FC<any>; cls: string; label: string; accent: string }> = {
    confirmed: { icon: CheckCircle2, cls: "status-confirmed", label: "Confirmed", accent: "#10b981" },
    pending: { icon: Clock4, cls: "status-pending", label: "Pending", accent: "#f59e0b" },
    cancelled: { icon: XCircle, cls: "status-cancelled", label: "Cancelled", accent: "#c0392b" },
    completed: { icon: CheckCircle2, cls: "status-completed", label: "Completed", accent: "#7c3aed" },
}
const MODE_LABEL: Record<string, string> = {
    video: "Video Call", call: "Phone Call", chat: "Chat", inPerson: "In-Person",
}
const TABS = [
    { key: "all", label: "All" },
    { key: "confirmed", label: "Confirmed" },
    { key: "pending", label: "Pending" },
    { key: "cancelled", label: "Cancelled" },
    { key: "completed", label: "Completed" },
]

// ─── Reveal wrapper ─────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const el = ref.current; if (!el) return
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { el.classList.add("on"); obs.disconnect() } },
            { threshold: .08 }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [])
    return (
        <div ref={ref} className="bk-reveal" style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    )
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
    const [open, setOpen] = useState(false)
    return (
        <nav className="bk-nav">
            <div className="bk-nav-inner">
                <Link href="/" className="bk-nav-logo">
                    <div className="bk-nav-logo-icon">
                        <Scale style={{ color: "white", width: 15, height: 15 }} />
                    </div>
                    <span className="bk-nav-logo-text">NyayMitra</span>
                </Link>

                <div className="desktop-only" style={{ alignItems: "center", gap: 10 }}>
                    <Link href="/lawyers" className="nav-link">Find Lawyers</Link>
                    <Link href="/legal-gpt" className="nav-link" style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <Sparkles size={12} /> Ask AI
                    </Link>
                    <Link href="/auth/signup" className="btn-gold-sm">
                        <Briefcase size={11} /> Join as Lawyer
                    </Link>
                </div>

                <button
                    className="mobile-only"
                    onClick={() => setOpen(v => !v)}
                    style={{ background: "none", border: "1px solid var(--ink-7)", borderRadius: 8, padding: "6px 10px", cursor: "pointer", alignItems: "center" }}
                >
                    {open ? <X size={16} /> : <Menu size={16} />}
                </button>
            </div>

            {open && (
                <div className="mobile-nav-menu">
                    <Link href="/lawyers" className="nav-link" onClick={() => setOpen(false)}>Find Lawyers</Link>
                    <Link href="/legal-gpt" className="nav-link" onClick={() => setOpen(false)}>Ask AI</Link>
                    <Link href="/auth/signup" className="btn-gold-sm" style={{ justifyContent: "center" }} onClick={() => setOpen(false)}>
                        Join as Lawyer
                    </Link>
                </div>
            )}
        </nav>
    )
}

// ─── Booking Card ─────────────────────────────────────────────────────────────
function BookingCard({
    booking,
    delay,
    onViewDetails,
    onReview,
}: {
    booking: Booking
    delay: number
    onViewDetails: (id: string) => void
    onReview: (b: Booking) => void
}) {
    const ModeIcon = MODE_ICONS[booking.mode] || Video
    const status = STATUS_CONFIG[booking.status] || STATUS_CONFIG.pending
    const StatusIcon = status.icon
    const formattedDate = format(new Date(booking.date), "EEE, MMM dd, yyyy")
    const formattedTime = booking.slot.replace(/([AP]M)/, " $1")

    return (
        <div className="bk-card" style={{ animationDelay: `${delay}ms` }}>
            {/* Left accent bar */}
            <div className="bk-card-accent" style={{ background: status.accent }} />
            <div style={{ paddingLeft: 3 }}>

                {/* Header */}
                <div className="bk-card-header">
                    <div>
                        <div className="bk-card-name">
                            <User size={14} color="var(--ink-5)" />
                            {booking.lawyerName}
                        </div>
                        <div className="bk-card-mode">
                            <ModeIcon
                                size={11}
                                className={`mode-${booking.mode}`}
                            />
                            <span>{MODE_LABEL[booking.mode] || booking.mode} consultation</span>
                        </div>
                    </div>
                    <div className={`status-badge ${status.cls}`}>
                        <StatusIcon size={10} />
                        {status.label}
                    </div>
                </div>

                {/* Body */}
                <div className="bk-card-body">
                    <div>
                        <div className="bk-card-field-label">Date</div>
                        <div className="bk-card-field-value">
                            <CalendarDays size={12} color="var(--ink-6)" />
                            <span style={{ fontSize: 12 }}>{formattedDate}</span>
                        </div>
                    </div>
                    <div>
                        <div className="bk-card-field-label">Time</div>
                        <div className="bk-card-field-value">
                            <Clock size={12} color="var(--ink-6)" />
                            <span>{formattedTime}</span>
                        </div>
                    </div>
                    <div>
                        <div className="bk-card-field-label">Amount</div>
                        <div className="bk-card-field-value">
                            <Receipt size={12} color="var(--ink-6)" />
                            <span style={{ fontFamily: "var(--serif)", fontSize: 14, fontWeight: 700 }}>
                                ₹{booking.amount.toLocaleString("en-IN")}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bk-card-footer">
                    <button
                        className="btn-ghost-sm"
                        onClick={() => onViewDetails(booking._id)}
                    >
                        View details <ArrowUpRight size={10} />
                    </button>

                    <div style={{ display: "flex", gap: 6 }}>
                        {booking.status === "confirmed" && (
                            <button
                                className="btn-ink-sm"
                                onClick={() => toast.info("Connecting to your consultation…")}
                            >
                                <Video size={10} /> Join Now
                            </button>
                        )}
                        {booking.status === "completed" && (
                            <button
                                className="btn-purple-sm"
                                onClick={() => onReview(booking)}
                            >
                                <Star size={10} /> Add Review
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}

// ─── Skeleton Card ────────────────────────────────────────────────────────────
function SkeletonCard() {
    return (
        <div style={{ background: "var(--white)", border: "1px solid var(--ink-7)", borderRadius: 16, padding: "16px 20px", overflow: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                <div>
                    <div className="skel" style={{ height: 16, width: 180, marginBottom: 7 }} />
                    <div className="skel" style={{ height: 10, width: 110 }} />
                </div>
                <div className="skel" style={{ height: 22, width: 80, borderRadius: 100 }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
                {[1, 2, 3].map(i => (
                    <div key={i}>
                        <div className="skel" style={{ height: 8, width: 40, marginBottom: 6 }} />
                        <div className="skel" style={{ height: 12, width: 90 }} />
                    </div>
                ))}
            </div>
            <div style={{ height: 1, background: "var(--ink-8)", margin: "14px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="skel" style={{ height: 28, width: 100, borderRadius: 7 }} />
                <div className="skel" style={{ height: 28, width: 80, borderRadius: 7 }} />
            </div>
        </div>
    )
}

// ─── Review Modal ─────────────────────────────────────────────────────────────
function ReviewModal({
    booking,
    onClose,
    onSubmit,
    loading,
}: {
    booking: Booking
    onClose: () => void
    onSubmit: (rating: number, comment: string) => void
    loading: boolean
}) {
    const [rating, setRating] = useState(5)
    const [hovered, setHovered] = useState(0)
    const [comment, setComment] = useState("")

    return (
        <div className="bk-modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
            <div className="bk-modal">
                <div className="bk-modal-header">
                    <div>
                        <div className="bk-modal-title">Leave a Review</div>
                        <div style={{ fontSize: 12, color: "var(--ink-5)", marginTop: 3 }}>
                            Consultation with {booking.lawyerName}
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        disabled={loading}
                        style={{ background: "none", border: "none", cursor: "pointer", padding: 4, flexShrink: 0 }}
                    >
                        <X size={18} color="var(--ink-5)" />
                    </button>
                </div>

                <div className="bk-modal-body">
                    {/* Rating */}
                    <div style={{ marginBottom: 18 }}>
                        <label className="field-label">Your rating</label>
                        <div className="review-stars">
                            {[1, 2, 3, 4, 5].map(s => (
                                <button
                                    key={s}
                                    className="star-btn"
                                    onClick={() => setRating(s)}
                                    onMouseEnter={() => setHovered(s)}
                                    onMouseLeave={() => setHovered(0)}
                                >
                                    <Star
                                        size={24}
                                        style={{
                                            fill: s <= (hovered || rating) ? "var(--gold)" : "var(--ink-7)",
                                            color: s <= (hovered || rating) ? "var(--gold)" : "var(--ink-7)",
                                            transition: "all .12s",
                                        }}
                                    />
                                </button>
                            ))}
                        </div>
                        <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--gold-dk)", marginTop: 5 }}>
                            {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][hovered || rating]}
                        </div>
                    </div>

                    {/* Comment */}
                    <div>
                        <label className="field-label">Your experience</label>
                        <textarea
                            className="bk-textarea"
                            placeholder="How was your consultation? Was the lawyer helpful and clear?"
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                        />
                    </div>
                </div>

                <div className="bk-modal-footer">
                    <button
                        className="btn-ghost-sm"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn-gold-sm"
                        onClick={() => onSubmit(rating, comment)}
                        disabled={loading || !comment.trim()}
                        style={{ opacity: !comment.trim() ? .5 : 1 }}
                    >
                        {loading ? (
                            <><Loader2 size={12} style={{ animation: "spin 1s linear infinite" }} /> Submitting…</>
                        ) : (
                            <>Submit Review</>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
    return (
        <footer className="bk-footer">
            <div className="bk-footer-inner">
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                        <div style={{ width: 30, height: 30, background: "rgba(255,255,255,.1)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Scale style={{ color: "var(--gold)", width: 14, height: 14 }} />
                        </div>
                        <span className="bk-footer-brand">NyayMitra</span>
                    </div>
                    <p className="bk-footer-desc">
                        Empowering citizens with accessible legal solutions through technology. India's trusted legal companion.
                    </p>
                    <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
                        <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "rgba(255,255,255,.2)", letterSpacing: ".12em" }}>
                            support@nyaymitra.tech
                        </span>
                    </div>
                </div>

                <div>
                    <div className="bk-footer-section-title">Platform</div>
                    {[
                        ["/ ", "Home"],
                        ["/lawyers", "Find Lawyers"],
                        ["/legal-gpt", "Ask AI"],
                        ["/all-bookings", "My Bookings"],
                    ].map(([href, label]) => (
                        <Link key={href} href={href} className="bk-footer-link">{label}</Link>
                    ))}
                </div>

                <div>
                    <div className="bk-footer-section-title">Company</div>
                    {[
                        ["/about", "About Us"],
                        ["/contact", "Contact"],
                        ["/auth/signup", "Join as Lawyer"],
                        ["/privacy-policy", "Privacy Policy"],
                    ].map(([href, label]) => (
                        <Link key={href} href={href} className="bk-footer-link">{label}</Link>
                    ))}
                </div>
            </div>

            <div className="bk-footer-divider">
                <span className="bk-footer-copy">
                    © {new Date().getFullYear()} NyayMitra · All rights reserved
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--gold)", opacity: .5 }} />
                    <span className="bk-footer-copy">Legal Tech · India</span>
                </div>
            </div>
        </footer>
    )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AllBookingsPage() {
    const router = useRouter()
    const [bookings, setBookings] = useState<Booking[]>([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState("all")
    const [pagination, setPagination] = useState({
        currentPage: 1, totalPages: 1, totalBookings: 0, limit: 10,
    })
    const [reviewBooking, setReviewBooking] = useState<Booking | null>(null)
    const [submittingReview, setSubmittingReview] = useState(false)

    const fetchBookings = async (page = 1) => {
        const userId = localStorage.getItem("userId")
        const token = localStorage.getItem("token")
        try {
            setLoading(true)
            const r = await axios.get<ApiResponse>(
                `https://nyaymitra-backend-production.up.railway.app/api/v1/booking/allOrders/${userId}`,
                { headers: { Authorization: `Bearer ${token}` }, params: { page, limit: pagination.limit } }
            )
            setBookings(r.data.bookings || [])
            setPagination({
                currentPage: r.data.currentPage,
                totalPages: r.data.totalPages,
                totalBookings: r.data.totalBookings,
                limit: pagination.limit,
            })
        } catch (err: any) {
            if (err.response?.status === 404) {
                setBookings([])
            } else {
                toast.error("Failed to load bookings")
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchBookings() }, [activeTab])

    const handlePageChange = (p: number) => {
        if (p >= 1 && p <= pagination.totalPages) fetchBookings(p)
    }

    const filteredBookings = bookings.filter(b =>
        activeTab === "all" || b.status === activeTab
    )

    // Tab counts
    const tabCounts = TABS.reduce((acc, t) => {
        acc[t.key] = t.key === "all" ? bookings.length : bookings.filter(b => b.status === t.key).length
        return acc
    }, {} as Record<string, number>)

    const submitReview = async (rating: number, comment: string) => {
        if (!reviewBooking) return
        const token = localStorage.getItem("token")
        const userId = localStorage.getItem("userId")
        try {
            setSubmittingReview(true)
            const r = await axios.post(
                "https://nyaymitra-backend-production.up.railway.app/api/v1/reviews",
                { userId, lawyerId: reviewBooking.lawyerId, consultationId: reviewBooking._id, rating, comment },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if (r.data.success) {
                toast.success("Review submitted!")
                setReviewBooking(null)
                fetchBookings(pagination.currentPage)
            }
        } catch (e: any) {
            toast.error(e.response?.data?.message || "Failed to submit review")
        } finally {
            setSubmittingReview(false)
        }
    }

    return (
        <>
            <GlobalStyles />
            <Nav />

            <main style={{ minHeight: "100vh", background: "var(--parchment)" }}>
                <div className="bk-container">

                    {/* ── Hero ── */}
                    <div className="bk-hero">
                        <Reveal>
                            <div className="eyebrow" style={{ marginBottom: 10 }}>My Account</div>
                            <h1 style={{
                                fontFamily: "var(--serif)", fontSize: "clamp(26px,5vw,40px)",
                                fontWeight: 600, lineHeight: 1.1, letterSpacing: "-.02em", marginBottom: 8,
                            }}>
                                My <span className="gold-shimmer">Consultations</span>
                            </h1>
                            <p style={{ fontSize: 13, color: "var(--ink-4)", maxWidth: 480, lineHeight: 1.6 }}>
                                Track and manage all your scheduled legal consultations in one place.
                            </p>

                            {!loading && (
                                <div className="bk-hero-stats">
                                    {[
                                        { v: pagination.totalBookings, l: "Total" },
                                        { v: bookings.filter(b => b.status === "confirmed").length, l: "Upcoming" },
                                        { v: bookings.filter(b => b.status === "completed").length, l: "Completed" },
                                        { v: bookings.filter(b => b.status === "pending").length, l: "Pending" },
                                    ].map(stat => (
                                        <div key={stat.l}>
                                            <div style={{ fontFamily: "var(--serif)", fontSize: "clamp(20px,4vw,26px)", fontWeight: 600 }}>{stat.v}</div>
                                            <div style={{ fontSize: "9px", color: "var(--ink-5)", letterSpacing: ".08em", textTransform: "uppercase" }}>{stat.l}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Reveal>
                    </div>

                    {/* ── Tabs ── */}
                    <Reveal delay={80}>
                        <div className="bk-tabs" style={{ overflowX: "auto" }}>
                            {TABS.map(t => (
                                <button
                                    key={t.key}
                                    className={`bk-tab ${activeTab === t.key ? "active" : ""}`}
                                    onClick={() => { setActiveTab(t.key); fetchBookings(1) }}
                                >
                                    {t.label}
                                    {tabCounts[t.key] > 0 && (
                                        <span className="tab-count">{tabCounts[t.key]}</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </Reveal>

                    {/* ── Content ── */}
                    {loading ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
                        </div>
                    ) : filteredBookings.length === 0 ? (
                        <Reveal>
                            <div className="bk-empty">
                                <div className="bk-empty-icon">
                                    <Gavel size={22} color="var(--ink-5)" />
                                </div>
                                <h3 style={{ fontFamily: "var(--serif)", fontSize: 20, marginBottom: 6 }}>
                                    No {activeTab === "all" ? "" : activeTab} consultations
                                </h3>
                                <p style={{ fontSize: 13, color: "var(--ink-5)", maxWidth: 340, margin: "0 auto 20px", lineHeight: 1.6 }}>
                                    {activeTab === "all"
                                        ? "You haven't scheduled any consultations yet."
                                        : `You don't have any ${activeTab} consultations at this time.`}
                                </p>
                                <button
                                    className="btn-gold-sm"
                                    onClick={() => router.push("/lawyers")}
                                >
                                    Find a Lawyer →
                                </button>
                            </div>
                        </Reveal>
                    ) : (
                        <>
                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                {filteredBookings.map((b, i) => (
                                    <Reveal key={b._id} delay={i * 40}>
                                        <BookingCard
                                            booking={b}
                                            delay={0}
                                            onViewDetails={id => router.push(`/bookings/${id}`)}
                                            onReview={setReviewBooking}
                                        />
                                    </Reveal>
                                ))}
                            </div>

                            {/* Pagination */}
                            {pagination.totalPages > 1 && (
                                <div className="bk-pagination">
                                    <span className="bk-page-info">
                                        Showing {(pagination.currentPage - 1) * pagination.limit + 1}–
                                        {Math.min(pagination.currentPage * pagination.limit, pagination.totalBookings)} of {pagination.totalBookings}
                                    </span>

                                    <div className="bk-page-btns">
                                        <button
                                            className="bk-page-btn"
                                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                                            disabled={pagination.currentPage === 1}
                                        >
                                            <ChevronLeft size={13} />
                                        </button>

                                        {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                                            let p: number
                                            if (pagination.totalPages <= 5) p = i + 1
                                            else if (pagination.currentPage <= 3) p = i + 1
                                            else if (pagination.currentPage >= pagination.totalPages - 2) p = pagination.totalPages - 4 + i
                                            else p = pagination.currentPage - 2 + i
                                            return (
                                                <button
                                                    key={p}
                                                    className={`bk-page-btn ${pagination.currentPage === p ? "active" : ""}`}
                                                    onClick={() => handlePageChange(p)}
                                                >
                                                    {p}
                                                </button>
                                            )
                                        })}

                                        <button
                                            className="bk-page-btn"
                                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                                            disabled={pagination.currentPage === pagination.totalPages}
                                        >
                                            <ChevronRight size={13} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    <div style={{ height: 40 }} />
                </div>
            </main>

            <Footer />

            {/* Review Modal */}
            {reviewBooking && (
                <ReviewModal
                    booking={reviewBooking}
                    onClose={() => setReviewBooking(null)}
                    onSubmit={submitReview}
                    loading={submittingReview}
                />
            )}
        </>
    )
}