// app/cancellation/page.tsx
"use client"

import { useState, useEffect, useRef, type ReactNode, type CSSProperties } from "react"
import Link from "next/link"
import {
    Scale, Shield, Eye, Target, ArrowRight, AlertCircle,
    Sparkles, CheckCircle, Users, Zap, BadgeCheck,
    TrendingUp, Star, ArrowLeft, ChevronRight, Menu, X,
    Calendar, Clock, Ban, RefreshCw, Mail, Phone,
    DollarSign, FileText, Info, CalendarX,
} from "lucide-react"

/* ─── GLOBAL STYLES ─────────────────────────────────────────────────────────── */
const GlobalStyles = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=Outfit:wght@300;400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --ink:        #0c0b09;
      --ink-2:      #1a1916;
      --ink-3:      #2e2c28;
      --ink-4:      #5c5850;
      --ink-5:      #8a8680;
      --ink-6:      #b8b4ae;
      --ink-7:      #e0ddd8;
      --ink-8:      #f2f0eb;
      --ink-9:      #faf8f4;
      --white:      #fffefb;
      --gold:       #c9a84c;
      --gold-lt:    #e2c87a;
      --gold-dk:    #8b6d22;
      --gold-pale:  #fdf6e0;
      --red:        #c0392b;
      --green:      #15803d;
      --serif:      'Cormorant Garamond', Georgia, serif;
      --sans:       'Outfit', system-ui, sans-serif;
      --mono:       'DM Mono', monospace;
      --radius:     8px;
      --radius-lg:  14px;
      --radius-xl:  20px;
    }

    html { scroll-behavior: smooth; }
    body {
      background: var(--white);
      color: var(--ink);
      font-family: var(--sans);
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }

    @keyframes fadeUp    { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }
    @keyframes shimmer   { 0%{background-position:-300% center} 100%{background-position:300% center} }
    @keyframes pulseDot  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.75)} }
    @keyframes glowPulse { 0%,100%{opacity:0.4} 50%{opacity:0.9} }
    @keyframes mobileMenuFade {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .reveal {
      opacity: 0;
      transform: translateY(22px);
      transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1);
    }
    .reveal.is-on { opacity:1; transform:translateY(0); }
    

    .gold-text {
      background: linear-gradient(115deg, var(--gold-dk) 0%, var(--gold) 30%, var(--gold-lt) 52%, var(--gold) 70%, var(--gold-dk) 100%);
      background-size: 300% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 7s linear infinite;
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      font-family: var(--mono);
      font-size: 8.5px;
      font-weight: 500;
      letter-spacing: 0.26em;
      text-transform: uppercase;
      color: var(--gold-dk);
    }
    .eyebrow::before, .eyebrow::after {
      content: '';
      width: 24px;
      height: 1px;
      background: linear-gradient(90deg, var(--gold-dk), var(--gold));
      flex-shrink: 0;
    }

    .nav-link {
      font-family: var(--sans);
      font-size: 13px;
      font-weight: 500;
      color: var(--ink-4);
      text-decoration: none;
      padding: 7px 13px;
      border-radius: 6px;
      transition: all 0.16s;
    }
    .nav-link:hover { color: var(--ink); background: var(--ink-8); }

    /* Desktop navigation links - visible only on large screens */
    .desktop-nav-links {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* Mobile menu button and menu - hidden on desktop */
    .mobile-menu-btn {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .mobile-menu-dropdown {
      display: none;
    }

    @media (max-width: 768px) {
      .desktop-nav-links {
        display: none !important;
      }
      .mobile-menu-btn {
        display: flex !important;
      }
      .mobile-menu-dropdown.mobile-open {
        display: block;
      }
    }

    @media (min-width: 769px) {
      .mobile-menu-btn {
        display: none !important;
      }
      .mobile-menu-dropdown {
        display: none !important;
      }
    }

    .mobile-nav-link {
      font-family: var(--sans);
      font-size: 16px;
      font-weight: 500;
      color: var(--ink-3);
      text-decoration: none;
      padding: 12px 0;
      width: 100%;
      transition: all 0.16s;
      border-bottom: 1px solid var(--ink-8);
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .mobile-nav-link:active {
      background: var(--ink-9);
    }

    .btn-ink {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--ink); color: var(--white);
      font-family: var(--sans); font-size: 12.5px; font-weight: 600;
      padding: 9px 18px; border-radius: var(--radius); border: none;
      text-decoration: none; cursor: pointer;
      transition: all 0.22s cubic-bezier(0.16,1,0.3,1);
    }
    .btn-ink:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(12,11,9,0.25); }

    .btn-ghost {
      display: inline-flex; align-items: center; gap: 8px;
      background: transparent; color: var(--ink-3);
      font-family: var(--sans); font-size: 12.5px; font-weight: 500;
      padding: 9px 16px; border-radius: var(--radius);
      border: 1.5px solid var(--ink-7);
      text-decoration: none; cursor: pointer; transition: all 0.22s;
    }
    .btn-ghost:hover { background: var(--ink-9); border-color: var(--ink-5); color: var(--ink); }

    .btn-gold {
      display: inline-flex; align-items: center; gap: 8px;
      background: linear-gradient(135deg, var(--gold-dk) 0%, var(--gold) 50%, var(--gold-lt) 100%);
      color: var(--ink); font-family: var(--sans); font-size: 13px; font-weight: 700;
      padding: 13px 26px; border-radius: var(--radius); border: none;
      text-decoration: none; cursor: pointer;
      transition: all 0.22s cubic-bezier(0.16,1,0.3,1);
    }
    .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(201,168,76,0.4); }

    .card {
      background: var(--white);
      border: 1px solid var(--ink-7);
      border-radius: var(--radius-lg);
      transition: transform 0.28s cubic-bezier(0.16,1,0.3,1),
                  box-shadow 0.28s, border-color 0.28s;
    }
    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 56px rgba(12,11,9,0.08);
      border-color: var(--ink-5);
    }

    .content-card {
      background: var(--white);
      border: 1px solid var(--ink-7);
      border-radius: var(--radius-lg);
      padding: 36px 36px;
      transition: border-color 0.25s;
      scroll-margin-top: 100px;
    }
    .content-card:hover { border-color: var(--ink-5); }
    .content-card.gold-accent {
      background: var(--gold-pale);
      border-color: rgba(201,168,76,0.3);
    }
    .content-card.dark-accent {
      background: var(--ink);
      border-color: rgba(255,255,255,0.06);
    }

    .sidebar-link {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 18px;
      font-family: var(--sans);
      font-size: 12.5px;
      font-weight: 400;
      color: var(--ink-4);
      text-decoration: none;
      border-left: 2px solid transparent;
      transition: all 0.2s cubic-bezier(0.16,1,0.3,1);
      cursor: pointer;
    }
    .sidebar-link:hover {
      color: var(--ink);
      background: var(--ink-9);
      border-left-color: var(--gold);
      padding-left: 20px;
    }
    .sidebar-link.active {
      color: var(--gold-dk);
      background: var(--gold-pale);
      border-left-color: var(--gold);
      font-weight: 600;
    }

    .cancellation-tier {
      background: var(--white);
      border: 1px solid var(--ink-7);
      border-radius: var(--radius-lg);
      padding: 24px;
      transition: all 0.28s cubic-bezier(0.16,1,0.3,1);
    }
    .cancellation-tier:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 56px rgba(12,11,9,0.08);
      border-color: var(--gold);
    }

    .timeline-item {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 16px 0;
      border-bottom: 1px solid var(--ink-8);
    }
    .timeline-item:last-child { border-bottom: none; }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--ink-9); }
    ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--gold-dk); }
    ::selection { background: var(--gold-pale); color: var(--gold-dk); }

    /* Responsive */
    @media (max-width: 768px) {
      .content-card { padding: 24px 20px !important; }
      .layout-grid { grid-template-columns: 1fr !important; }
      .sidebar-sticky { position: static !important; }
      .sidebar-wrap { display: none !important; }
      .hero-pad { padding: 56px 20px 72px !important; }
      .main-pad { padding: 32px 20px !important; }
      .cancellation-grid { grid-template-columns: 1fr !important; }
      .process-steps { grid-template-columns: 1fr !important; }
      .timeline-grid { grid-template-columns: 1fr !important; }
      .contact-grid { grid-template-columns: 1fr !important; }
      .cta-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
    }
    @media (max-width: 480px) {
      .hero-title { font-size: clamp(38px, 10vw, 64px) !important; }
    }
       
      
  `}</style>
)

/* ─── REVEAL ─────────────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, style = {} }: { children: ReactNode; delay?: number; style?: CSSProperties }) {
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const el = ref.current; if (!el) return
        const tid = setTimeout(() => {
            const obs = new IntersectionObserver(([e]) => {
                if (e.isIntersecting) { el.classList.add("is-on"); obs.disconnect() }
            }, { threshold: 0.05, rootMargin: "0px 0px -24px 0px" })
            obs.observe(el)
            return () => obs.disconnect()
        }, 60)
        return () => clearTimeout(tid)
    }, [])
    return <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms`, ...style }}>{children}</div>
}

/* ─── ORNAMENT LINE ──────────────────────────────────────────────────────────── */
const OrnamentLine = () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "22px 0" }}>
        <div style={{ width: 44, height: 1, background: "linear-gradient(90deg, var(--gold-dk), var(--gold))" }} />
        <Scale style={{ width: 9, height: 9, color: "var(--gold)" }} />
        <div style={{ width: 24, height: 1, background: "linear-gradient(90deg, var(--gold), transparent)" }} />
    </div>
)

/* ─── SECTION HEADER ─────────────────────────────────────────────────────────── */
function SectionHeader({ eyebrow, title, italic, icon: Icon, small = false }: {
    eyebrow?: string; title: string; italic?: string; icon: any; small?: boolean
}) {
    return (
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 28 }}>
            <div style={{
                width: small ? 38 : 44, height: small ? 38 : 44, borderRadius: 12, flexShrink: 0,
                background: "var(--ink-9)", border: "1px solid var(--ink-7)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--gold-dk)",
            }}>
                <Icon style={{ width: small ? 15 : 18, height: small ? 15 : 18 }} />
            </div>
            <div>
                {eyebrow && (
                    <span style={{
                        display: "block",
                        fontFamily: "var(--mono)", fontSize: "8px", fontWeight: 500,
                        letterSpacing: "0.22em", textTransform: "uppercase",
                        color: "var(--gold-dk)", marginBottom: 6,
                    }}>{eyebrow}</span>
                )}
                <h2 style={{
                    fontFamily: "var(--serif)",
                    fontSize: small ? "clamp(18px, 2.5vw, 22px)" : "clamp(20px, 3vw, 26px)",
                    fontWeight: 600, color: "var(--ink)",
                    letterSpacing: "-0.015em", lineHeight: 1.2,
                }}>
                    {title}{" "}
                    {italic && <em style={{ fontWeight: 300, color: "var(--ink-3)" }}>{italic}</em>}
                </h2>
            </div>
        </div>
    )
}

/* ─── BULLET LIST ────────────────────────────────────────────────────────────── */
function BulletList({ items, dotColor = "var(--gold-dk)", dotBg = "var(--gold-pale)", dotBorder = "var(--gold)" }: {
    items: string[]; dotColor?: string; dotBg?: string; dotBorder?: string
}) {
    return (
        <div>
            {items.map((item, i) => (
                <div key={i} style={{
                    display: "flex", alignItems: "flex-start", gap: 12,
                    fontFamily: "var(--sans)", fontSize: "13.5px",
                    color: "var(--ink-3)", lineHeight: 1.8,
                    padding: "10px 0", borderBottom: "1px solid var(--ink-8)",
                }}>
                    <div style={{
                        width: 18, height: 18, borderRadius: "50%", flexShrink: 0, marginTop: 3,
                        background: dotBg, border: `1px solid ${dotBorder}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                        <CheckCircle style={{ width: 9, height: 9, color: dotColor }} />
                    </div>
                    <span>{item}</span>
                </div>
            ))}
        </div>
    )
}

/* ─── DATA ───────────────────────────────────────────────────────────────────── */
const SECTIONS = [
    { id: "cancellation", label: "Booking Cancellation", icon: CalendarX },
    { id: "eligibility", label: "Refund Eligibility", icon: CheckCircle },
    { id: "process", label: "Refund Process", icon: RefreshCw },
    { id: "timeline", label: "Refund Timeline", icon: Clock },
    { id: "special", label: "Special Cases", icon: FileText },
    { id: "exceptions", label: "Non-Refundable", icon: Ban },
    { id: "disputes", label: "Dispute Resolution", icon: Shield },
    { id: "contact", label: "Contact Support", icon: Mail },
]

const CANCELLATION_TIERS = [
    { title: "Standard Cancellation", time: "12+ hours before", refund: "100% Full Refund", variant: "green" },
    { title: "Late Cancellation", time: "Within 12 hours", refund: "No Refund / Partial", variant: "amber" },
    { title: "Lawyer Cancellation", time: "Any time", refund: "Full Refund or Free Reschedule", variant: "gold" },
]

const ELIGIBILITY_ITEMS = [
    "Eligible cancellations made within the specified timeframe",
    "Failed transactions due to technical issues on our platform",
    "Duplicate payments or accidental charges",
    "Service not delivered as promised (verified by our team)",
    "Lawyer no-show or cancellation without adequate notice",
]

const PROCESS_STEPS = [
    { step: "01", title: "Submit Request", desc: "Email us with your booking ID and reason for cancellation" },
    { step: "02", title: "Verification", desc: "Our team reviews your request within 24–48 hours" },
    { step: "03", title: "Approval", desc: "You'll receive email confirmation if eligible" },
    { step: "04", title: "Processing", desc: "Refund initiated to original payment method" },
]

const TIMELINE_ITEMS = [
    { label: "Processing Time", value: "5–7", unit: "Business days for approval" },
    { label: "Bank Transfer", value: "3–5", unit: "Additional business days" },
]

const SPECIAL_CASES = [
    "Notary services once initiated may be non-refundable due to third-party processing fees",
    "Physical stamp paper purchases are non-refundable after procurement",
    "Courier delivery failures may qualify for redelivery or partial refund",
    "Document drafting services are refundable only before work begins",
]

const NON_REFUNDABLE = [
    "Completed consultations", "Downloaded documents", "Government fees",
    "Stamp duty charges", "Third-party processing fees", "Express delivery charges",
]

const DISPUTE_STEPS = [
    "Contact our support team for initial review",
    "Escalate to refund supervisor (48-hour response)",
    "File a formal complaint with supporting documents",
    "Final decision within 7 business days",
]

/* ─── PAGE ───────────────────────────────────────────────────────────────────── */
export default function CancellationPage() {
    const [scrolled, setScrolled] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState("cancellation")

    useEffect(() => {
        setMounted(true)
        const onScroll = () => {
            setScrolled(window.scrollY > 8)
            const sections = ["cancellation", "eligibility", "process", "timeline", "special", "exceptions", "disputes", "contact"]
            for (const id of [...sections].reverse()) {
                const el = document.getElementById(id)
                if (el && window.scrollY >= el.offsetTop - 120) {
                    setActiveSection(id); break
                }
            }
        }
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    const handleMobileLinkClick = () => setMobileMenuOpen(false)

    if (!mounted) return null

    const getVariantStyles = (variant: string) => {
        const styles: Record<string, { border: string; bg: string; badgeBg: string; badgeColor: string; refundColor: string; dotColor: string }> = {
            green: {
                border: "var(--green)", bg: "#f0fdf4", badgeBg: "#dcfce7", badgeColor: "var(--green)",
                refundColor: "var(--green)", dotColor: "var(--green)",
            },
            amber: {
                border: "#f59e0b", bg: "#fffbeb", badgeBg: "#fef3c7", badgeColor: "#d97706",
                refundColor: "#d97706", dotColor: "#d97706",
            },
            gold: {
                border: "var(--gold)", bg: "var(--gold-pale)", badgeBg: "var(--gold-pale)", badgeColor: "var(--gold-dk)",
                refundColor: "var(--gold-dk)", dotColor: "var(--gold)",
            },
        }
        return styles[variant] || styles.green
    }

    return (
        <>
            <GlobalStyles />
            <div style={{ minHeight: "100vh", background: "var(--white)" }}>

                {/* ── NAVBAR ───────────────────────────────────────────────────────────── */}
                <nav style={{
                    position: "sticky", top: 0, zIndex: 100,
                    background: scrolled ? "rgba(255,254,251,0.96)" : "var(--white)",
                    backdropFilter: scrolled ? "blur(24px) saturate(1.4)" : "none",
                    borderBottom: `1px solid ${scrolled ? "var(--ink-7)" : "transparent"}`,
                    boxShadow: scrolled ? "0 2px 24px rgba(12,11,9,0.06)" : "none",
                    transition: "all 0.32s cubic-bezier(0.16,1,0.3,1)",
                }}>
                    <div style={{
                        maxWidth: 1200, margin: "0 auto", padding: "0 20px",
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        height: 66,
                    }}>
                        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none", flexShrink: 0 }}>
                            <div style={{
                                width: 38, height: 38, borderRadius: 10,
                                background: "var(--ink)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                boxShadow: "0 2px 12px rgba(12,11,9,0.2)",
                                position: "relative", overflow: "hidden", flexShrink: 0,
                            }}>
                                <div style={{
                                    position: "absolute", inset: 0,
                                    background: "linear-gradient(135deg, rgba(201,168,76,0.15) 0%, transparent 60%)",
                                }} />
                                <Scale style={{ color: "var(--gold)", width: 16, height: 16, position: "relative", zIndex: 1 }} />
                            </div>
                            <div style={{
                                fontFamily: "var(--serif)", fontSize: "20px", fontWeight: 600,
                                color: "var(--ink)", lineHeight: 1, letterSpacing: "-0.02em",
                            }}>NyayMitra</div>
                        </Link>

                        <div className="desktop-nav-links" style={{ alignItems: "center", gap: 8 }}>
                            <Link href="/" className="btn-ghost">
                                <ArrowLeft style={{ width: 13, height: 13 }} />
                                Home
                            </Link>
                            <Link href="/lawyers" className="nav-link" style={{ display: "inline-flex", alignItems: "center" }}>
                                Find Lawyers
                            </Link>
                            <Link href="/legal-ai" className="btn-ink">
                                <Sparkles style={{ width: 13, height: 13 }} />
                                Legal AI
                            </Link>
                        </div>

                        <button
                            className="mobile-menu-btn"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            style={{
                                background: "transparent", border: "none", cursor: "pointer",
                                padding: "8px", alignItems: "center", justifyContent: "center",
                                borderRadius: "8px", transition: "all 0.2s",
                            }}
                            aria-label="Menu"
                        >
                            {mobileMenuOpen ? (
                                <X style={{ width: 22, height: 22, color: "var(--ink)" }} />
                            ) : (
                                <Menu style={{ width: 22, height: 22, color: "var(--ink)" }} />
                            )}
                        </button>
                    </div>

                    <div className={`mobile-menu-dropdown ${mobileMenuOpen ? "mobile-open" : ""}`} style={{
                        position: "absolute", top: 66, left: 0, right: 0,
                        background: "var(--white)", borderBottom: "1px solid var(--ink-7)",
                        boxShadow: "0 4px 24px rgba(12,11,9,0.08)", padding: "20px",
                        animation: mobileMenuOpen ? "mobileMenuFade 0.3s ease-out" : "none", zIndex: 99,
                    }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            <Link href="/" className="mobile-nav-link" onClick={handleMobileLinkClick} style={{ borderTop: "none" }}>
                                <ArrowLeft style={{ width: 18, height: 18, color: "var(--gold-dk)" }} />
                                Home
                            </Link>
                            <Link href="/lawyers" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                                <Users style={{ width: 18, height: 18, color: "var(--gold-dk)" }} />
                                Find Lawyers
                            </Link>
                            <Link href="/legal-ai" className="mobile-nav-link" onClick={handleMobileLinkClick} style={{ borderBottom: "none" }}>
                                <Sparkles style={{ width: 18, height: 18, color: "var(--gold-dk)" }} />
                                Legal AI
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* ── HERO ─────────────────────────────────────────────────────────────── */}
                <section className="hero-pad" style={{
                    padding: "80px 28px 100px", position: "relative", overflow: "hidden",
                }}>
                    <div style={{
                        position: "absolute", inset: 0,
                        backgroundImage: "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)",
                        backgroundSize: "80px 80px", pointerEvents: "none",
                    }} />
                    <div style={{
                        position: "absolute", inset: 0,
                        background: "radial-gradient(ellipse 70% 60% at 80% 20%, rgba(201,168,76,0.055) 0%, transparent 60%)",
                        pointerEvents: "none",
                    }} />
                    <div style={{
                        position: "absolute", right: "-4%", top: "5%",
                        width: 520, height: 520, opacity: 0.025, pointerEvents: "none",
                    }}>
                        <Scale style={{ width: "100%", height: "100%", color: "var(--gold-dk)" }} />
                    </div>

                    <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
                        <div style={{ animation: "fadeUp 0.72s cubic-bezier(0.16,1,0.3,1) both" }}>
                            <div style={{
                                display: "inline-flex", alignItems: "center", gap: 9,
                                padding: "6px 16px 6px 9px", border: "1px solid var(--ink-7)",
                                borderRadius: 100, marginBottom: 36, background: "var(--white)",
                                boxShadow: "0 2px 12px rgba(12,11,9,0.04)",
                            }}>
                                <div style={{
                                    width: 22, height: 22, borderRadius: "50%",
                                    background: "var(--gold-pale)", border: "1px solid var(--gold)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                }}>
                                    <span style={{
                                        width: 7, height: 7, borderRadius: "50%", background: "#22c55e",
                                        animation: "pulseDot 2.2s ease-in-out infinite", display: "block",
                                    }} />
                                </div>
                                <span style={{ fontFamily: "var(--mono)", fontSize: "9.5px", color: "var(--ink-4)", letterSpacing: "0.1em" }}>
                                    Effective from June 2025
                                </span>
                            </div>

                            <h1 className="hero-title" style={{
                                fontFamily: "var(--serif)", fontSize: "clamp(44px, 7vw, 80px)",
                                fontWeight: 600, lineHeight: 1.08, letterSpacing: "-0.03em",
                                color: "var(--ink)", marginBottom: 0,
                            }}>
                                Cancellations &amp;<br />
                                <span className="gold-text" style={{ fontStyle: "italic", fontWeight: 300, display: "inline-block", lineHeight: 1.3 }}>
                                    refunds, made clear.
                                </span>
                            </h1>

                            <OrnamentLine />

                            <p style={{
                                fontFamily: "var(--sans)", fontSize: "15.5px",
                                color: "var(--ink-4)", lineHeight: 1.85,
                                maxWidth: 500, fontWeight: 300,
                            }}>
                                Clear, fair, and transparent policies for cancellations and refunds across all NyayMitra services.
                            </p>

                            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 32 }}>
                                {[
                                    { icon: Shield, text: "Fair & Transparent" },
                                    { icon: Clock, text: "Quick Processing" },
                                    { icon: DollarSign, text: "Full Refund Options" },
                                    { icon: BadgeCheck, text: "24/7 Support" },
                                ].map(({ icon: Icon, text }) => (
                                    <div key={text} style={{
                                        display: "flex", alignItems: "center", gap: 7,
                                        fontFamily: "var(--mono)", fontSize: "9px",
                                        color: "var(--ink-5)", letterSpacing: "0.08em",
                                    }}>
                                        <Icon style={{ width: 10, height: 10, color: "var(--gold-dk)", flexShrink: 0 }} />
                                        {text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <div style={{ height: 1, background: "var(--ink-7)" }} />

                {/* ── MAIN LAYOUT ──────────────────────────────────────────────────────── */}
                <div className="main-pad" style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 28px 96px" }}>
                    <div className="layout-grid" style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 48, alignItems: "start" }}>

                        {/* Sidebar */}
                        <aside className="sidebar-wrap sidebar-sticky" style={{ position: "sticky", top: 88 }}>
                            <div style={{
                                border: "1px solid var(--ink-7)", borderRadius: "var(--radius-lg)",
                                overflow: "hidden", background: "var(--white)",
                            }}>
                                <div style={{
                                    padding: "14px 18px", borderBottom: "1px solid var(--ink-7)",
                                    display: "flex", alignItems: "center", gap: 10, background: "var(--ink-9)",
                                }}>
                                    <div style={{
                                        width: 28, height: 28, borderRadius: 7,
                                        background: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center",
                                    }}>
                                        <FileText style={{ color: "var(--gold)", width: 12, height: 12 }} />
                                    </div>
                                    <span style={{ fontFamily: "var(--serif)", fontSize: "15px", fontWeight: 600, color: "var(--ink)" }}>Policy Guide</span>
                                </div>

                                <nav style={{ padding: "6px 0" }}>
                                    {SECTIONS.map(({ id, label, icon: Icon }) => (
                                        <a
                                            key={id}
                                            href={`#${id}`}
                                            className={`sidebar-link${activeSection === id ? " active" : ""}`}
                                        >
                                            <Icon style={{ width: 13, height: 13, flexShrink: 0 }} />
                                            <span>{label}</span>
                                            <ChevronRight style={{
                                                width: 11, height: 11, marginLeft: "auto",
                                                opacity: activeSection === id ? 1 : 0,
                                                transition: "opacity 0.2s", color: "var(--gold-dk)",
                                            }} />
                                        </a>
                                    ))}
                                </nav>

                                <div style={{
                                    margin: 12, padding: "12px 14px",
                                    background: "var(--gold-pale)", border: "1px solid rgba(201,168,76,0.3)",
                                    borderRadius: "var(--radius)",
                                }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
                                        <div style={{
                                            width: 6, height: 6, borderRadius: "50%", background: "#22c55e",
                                            animation: "glowPulse 2.5s ease-in-out infinite",
                                        }} />
                                        <span style={{ fontFamily: "var(--mono)", fontSize: "8px", color: "var(--gold-dk)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                                            Need Help?
                                        </span>
                                    </div>
                                    <p style={{ fontFamily: "var(--sans)", fontSize: "11px", color: "var(--ink-4)", lineHeight: 1.6, fontWeight: 300 }}>
                                        Questions about refunds? Our support team is here.
                                    </p>
                                    <a href="#contact" style={{
                                        display: "inline-flex", alignItems: "center", gap: 5, marginTop: 8,
                                        fontFamily: "var(--mono)", fontSize: "8.5px", fontWeight: 600,
                                        color: "var(--gold-dk)", textDecoration: "none", letterSpacing: "0.08em",
                                    }}>
                                        Contact us <ChevronRight style={{ width: 10, height: 10 }} />
                                    </a>
                                </div>
                            </div>
                        </aside>

                        {/* Content */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>

                            {/* Introduction */}
                            <Reveal>
                                <div className="content-card" style={{ scrollMarginTop: 100 }}>
                                    <SectionHeader eyebrow="Our Commitment" title="Fair & Transparent" italic="Refund Policy" icon={Shield} />
                                    <p style={{
                                        fontFamily: "var(--sans)", fontSize: "14px",
                                        color: "var(--ink-4)", lineHeight: 1.85, marginBottom: 20, fontWeight: 300,
                                    }}>
                                        At <span style={{ fontFamily: "var(--serif)", fontWeight: 600, fontSize: "16px", color: "var(--ink)" }}>NyayMitra</span>,
                                        we understand that circumstances may change. This policy outlines the terms under which users can cancel
                                        bookings and request refunds for services offered through our platform.
                                    </p>
                                    <div style={{
                                        display: "flex", alignItems: "flex-start", gap: 14,
                                        padding: "16px 20px", background: "var(--ink-9)",
                                        border: "1px solid var(--ink-7)", borderRadius: "var(--radius)",
                                        borderLeft: "3px solid var(--gold)",
                                    }}>
                                        <AlertCircle style={{ width: 16, height: 16, color: "var(--gold-dk)", flexShrink: 0, marginTop: 1 }} />
                                        <p style={{ fontFamily: "var(--sans)", fontSize: "13px", color: "var(--ink-3)", lineHeight: 1.75, fontWeight: 400 }}>
                                            <span style={{ fontWeight: 700, color: "var(--ink)" }}>Important: </span>
                                            We strive to process all refund requests fairly and transparently. Please review this policy carefully before making a booking.
                                        </p>
                                    </div>
                                </div>
                            </Reveal>

                            {/* Booking Cancellation */}
                            <Reveal delay={40}>
                                <div id="cancellation" className="content-card" style={{ scrollMarginTop: 100 }}>
                                    <SectionHeader eyebrow="Policy" title="Booking Cancellation" icon={CalendarX} />
                                    <div className="cancellation-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
                                        {CANCELLATION_TIERS.map((tier, i) => {
                                            const s = getVariantStyles(tier.variant)
                                            return (
                                                <div key={i} className="cancellation-tier">
                                                    <div style={{
                                                        display: "inline-block", padding: "4px 12px", borderRadius: 100,
                                                        background: s.badgeBg, marginBottom: 14,
                                                    }}>
                                                        <span style={{ fontFamily: "var(--mono)", fontSize: "9px", fontWeight: 600, color: s.badgeColor }}>
                                                            {tier.time}
                                                        </span>
                                                    </div>
                                                    <h4 style={{ fontFamily: "var(--serif)", fontSize: "16px", fontWeight: 600, color: "var(--ink)", marginBottom: 6 }}>
                                                        {tier.title}
                                                    </h4>
                                                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: s.refundColor }} />
                                                        <span style={{ fontFamily: "var(--sans)", fontSize: "13px", fontWeight: 500, color: s.refundColor }}>
                                                            {tier.refund}
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </Reveal>

                            {/* Refund Eligibility */}
                            <Reveal delay={40}>
                                <div id="eligibility" className="content-card" style={{ scrollMarginTop: 100 }}>
                                    <SectionHeader eyebrow="Criteria" title="Refund Eligibility" icon={CheckCircle} />
                                    <BulletList items={ELIGIBILITY_ITEMS} />
                                    <div style={{
                                        marginTop: 20, padding: "14px 18px",
                                        background: "var(--gold-pale)", border: "1px solid rgba(201,168,76,0.2)",
                                        borderRadius: "var(--radius)", display: "flex", alignItems: "center", gap: 12,
                                    }}>
                                        <Clock style={{ width: 14, height: 14, color: "var(--gold-dk)" }} />
                                        <span style={{ fontFamily: "var(--sans)", fontSize: "12px", color: "var(--ink-3)" }}>
                                            Refund requests must be raised within <strong>48 hours</strong> of the originally scheduled service time.
                                        </span>
                                    </div>
                                </div>
                            </Reveal>

                            {/* Refund Process */}
                            <Reveal delay={60}>
                                <div id="process" className="content-card" style={{ scrollMarginTop: 100 }}>
                                    <SectionHeader eyebrow="How it works" title="Refund Process" icon={RefreshCw} />
                                    <div className="process-steps" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
                                        {PROCESS_STEPS.map((item, i) => (
                                            <div key={i} style={{
                                                padding: "20px 16px", background: "var(--ink-9)",
                                                border: "1px solid var(--ink-7)", borderRadius: "var(--radius)",
                                                textAlign: "center", position: "relative",
                                            }}>
                                                <div style={{
                                                    position: "absolute", top: 12, right: 16,
                                                    fontFamily: "var(--serif)", fontSize: "36px", color: "rgba(201,168,76,0.08)",
                                                    fontWeight: 600,
                                                }}>{item.step}</div>
                                                <h4 style={{ fontFamily: "var(--serif)", fontSize: "15px", fontWeight: 600, color: "var(--ink)", marginBottom: 8 }}>
                                                    {item.title}
                                                </h4>
                                                <p style={{ fontFamily: "var(--sans)", fontSize: "11.5px", color: "var(--ink-5)", lineHeight: 1.65 }}>
                                                    {item.desc}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Reveal>

                            {/* Refund Timeline */}
                            <Reveal delay={60}>
                                <div id="timeline" className="content-card" style={{ scrollMarginTop: 100 }}>
                                    <SectionHeader eyebrow="Duration" title="Refund Timeline" icon={Clock} />
                                    <div className="timeline-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16, marginBottom: 20 }}>
                                        {TIMELINE_ITEMS.map((item, i) => (
                                            <div key={i} style={{
                                                padding: "24px", background: "var(--ink-9)",
                                                border: "1px solid var(--ink-7)", borderRadius: "var(--radius-lg)",
                                                textAlign: "center",
                                            }}>
                                                <p style={{ fontFamily: "var(--mono)", fontSize: "8px", color: "var(--ink-5)", letterSpacing: "0.1em", marginBottom: 8 }}>
                                                    {item.label}
                                                </p>
                                                <p style={{ fontFamily: "var(--serif)", fontSize: "44px", fontWeight: 600, color: "var(--gold-dk)", lineHeight: 1, marginBottom: 4 }}>
                                                    {item.value}
                                                </p>
                                                <p style={{ fontFamily: "var(--sans)", fontSize: "11px", color: "var(--ink-4)" }}>{item.unit}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{
                                        padding: "14px 18px", background: "var(--ink-9)",
                                        borderRadius: "var(--radius)", display: "flex", alignItems: "center", gap: 12,
                                        border: "1px solid var(--ink-7)",
                                    }}>
                                        <Info style={{ width: 14, height: 14, color: "var(--gold-dk)" }} />
                                        <span style={{ fontFamily: "var(--sans)", fontSize: "12px", color: "var(--ink-4)" }}>
                                            Total time may vary depending on your bank or payment gateway. You'll receive email notifications at each stage.
                                        </span>
                                    </div>
                                </div>
                            </Reveal>

                            {/* Special Cases */}
                            <Reveal delay={60}>
                                <div id="special" className="content-card" style={{ scrollMarginTop: 100 }}>
                                    <SectionHeader eyebrow="Notary & Documents" title="Special Cases" icon={FileText} />
                                    <BulletList
                                        items={SPECIAL_CASES}
                                        dotColor="var(--gold-dk)"
                                        dotBg="var(--gold-pale)"
                                        dotBorder="var(--gold)"
                                    />
                                </div>
                            </Reveal>

                            {/* Non-Refundable */}
                            <Reveal delay={60}>
                                <div id="exceptions" className="content-card" style={{ scrollMarginTop: 100 }}>
                                    <SectionHeader eyebrow="Exceptions" title="Non-Refundable Items" icon={Ban} />
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                                        {NON_REFUNDABLE.map((item, i) => (
                                            <span key={i} style={{
                                                padding: "6px 14px", background: "var(--ink-9)",
                                                border: "1px solid var(--ink-7)", borderRadius: 100,
                                                fontFamily: "var(--sans)", fontSize: "11px", color: "var(--ink-4)",
                                            }}>
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                    <p style={{ fontFamily: "var(--sans)", fontSize: "12.5px", color: "var(--ink-4)", lineHeight: 1.75 }}>
                                        These items are non-refundable once the service has been delivered or third-party costs have been incurred.
                                    </p>
                                </div>
                            </Reveal>

                            {/* Dispute Resolution */}
                            <Reveal delay={60}>
                                <div id="disputes" className="content-card" style={{ scrollMarginTop: 100 }}>
                                    <SectionHeader eyebrow="Escalation" title="Dispute Resolution" icon={Shield} />
                                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                        {DISPUTE_STEPS.map((step, i) => (
                                            <div key={i} style={{
                                                display: "flex", alignItems: "center", gap: 14,
                                                padding: "14px 18px", background: "var(--ink-9)",
                                                border: "1px solid var(--ink-7)", borderRadius: "var(--radius)",
                                            }}>
                                                <div style={{
                                                    width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                                                    background: "var(--gold-pale)", border: "1px solid var(--gold)",
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    fontFamily: "var(--serif)", fontSize: "14px", fontWeight: 600, color: "var(--gold-dk)",
                                                }}>{i + 1}</div>
                                                <span style={{ fontFamily: "var(--sans)", fontSize: "13px", color: "var(--ink-3)" }}>{step}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Reveal>

                            {/* Policy Note */}
                            <Reveal delay={60}>
                                <div style={{
                                    borderRadius: "var(--radius-lg)", border: "1px solid rgba(201,168,76,0.3)",
                                    background: "var(--gold-pale)", padding: "28px 32px",
                                }}>
                                    <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                                        <div style={{
                                            width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                                            background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                        }}>
                                            <AlertCircle style={{ width: 18, height: 18, color: "var(--gold-dk)" }} />
                                        </div>
                                        <div>
                                            <h3 style={{
                                                fontFamily: "var(--serif)", fontSize: "20px",
                                                fontWeight: 600, color: "var(--ink)", marginBottom: 10,
                                            }}>Policy Updates</h3>
                                            <p style={{
                                                fontFamily: "var(--sans)", fontSize: "13px",
                                                color: "var(--ink-3)", lineHeight: 1.75, fontWeight: 300,
                                            }}>
                                                NyayMitra reserves the right to modify this policy at any time. Changes will be effective immediately upon posting.
                                                Please review this page regularly for updates. For bookings made before policy changes, the previous policy applies.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>

                            {/* Contact */}
                            <Reveal delay={60}>
                                <div id="contact" className="content-card dark-accent" style={{ overflow: "hidden", scrollMarginTop: 100, padding: 0 }}>
                                    <div style={{
                                        padding: "36px 36px 28px", position: "relative", overflow: "hidden", background: "var(--ink)",
                                    }}>
                                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(201,168,76,0.06) 0%, transparent 60%)" }} />
                                        <div style={{ position: "absolute", right: -40, top: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.02)" }} />

                                        <div style={{ marginBottom: 10 }}>
                                            <span style={{
                                                fontFamily: "var(--mono)", fontSize: "8px", fontWeight: 500,
                                                letterSpacing: "0.22em", textTransform: "uppercase",
                                                color: "var(--gold)", display: "block", marginBottom: 10,
                                            }}>Get in touch</span>
                                            <h2 style={{
                                                fontFamily: "var(--serif)", fontSize: "clamp(22px, 3.5vw, 30px)",
                                                fontWeight: 600, color: "white", letterSpacing: "-0.02em", lineHeight: 1.2,
                                            }}>Need help with a refund?</h2>
                                            <p style={{
                                                fontFamily: "var(--sans)", fontSize: "13.5px",
                                                color: "rgba(255,255,255,0.4)", marginTop: 8, lineHeight: 1.7,
                                            }}>
                                                Our support team is ready to assist you with cancellations, refunds, or any billing concerns.
                                            </p>
                                        </div>

                                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 24 }}>
                                            <div style={{ width: 32, height: 1, background: "linear-gradient(90deg, var(--gold-dk), var(--gold))" }} />
                                            <Scale style={{ width: 9, height: 9, color: "var(--gold)" }} />
                                            <div style={{ width: 16, height: 1, background: "linear-gradient(90deg, var(--gold), transparent)" }} />
                                        </div>
                                    </div>

                                    <div className="contact-grid" style={{
                                        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12,
                                        padding: "24px 28px 28px", background: "var(--ink-2)",
                                    }}>
                                        {[
                                            { href: "mailto:support@mynyaymitra.in", icon: Mail, label: "Email", value: "support@mynyaymitra.in" },
                                            { href: "tel:+917970596183", icon: Phone, label: "Phone", value: "+91 79705 96183" },
                                        ].map(({ href, icon: Icon, label, value }) => (
                                            <a key={href} href={href} className="contact-row" style={{
                                                background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)",
                                                textDecoration: "none", display: "flex", alignItems: "center", gap: 14,
                                                padding: "16px 20px", borderRadius: "var(--radius)", transition: "all 0.22s",
                                            }}
                                                onMouseEnter={e => {
                                                    const a = e.currentTarget as HTMLAnchorElement
                                                    a.style.borderColor = "var(--gold)"
                                                    a.style.background = "rgba(201,168,76,0.08)"
                                                }}
                                                onMouseLeave={e => {
                                                    const a = e.currentTarget as HTMLAnchorElement
                                                    a.style.borderColor = "rgba(255,255,255,0.08)"
                                                    a.style.background = "rgba(255,255,255,0.04)"
                                                }}
                                            >
                                                <div style={{
                                                    width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                                                    background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)",
                                                    display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold)",
                                                }}>
                                                    <Icon style={{ width: 14, height: 14 }} />
                                                </div>
                                                <div>
                                                    <p style={{
                                                        fontFamily: "var(--mono)", fontSize: "8px", fontWeight: 500,
                                                        letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 3,
                                                    }}>{label}</p>
                                                    <p style={{ fontFamily: "var(--sans)", fontSize: "13px", color: "rgba(255,255,255,0.65)" }}>{value}</p>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                    <div style={{ padding: "0 28px 28px", background: "var(--ink-2)" }}>
                                        <p style={{ textAlign: "center", fontFamily: "var(--mono)", fontSize: "8.5px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em" }}>
                                            Please include your <span style={{ color: "var(--gold)" }}>Booking ID</span> and <span style={{ color: "var(--gold)" }}>Contact Details</span> for faster processing.
                                        </p>
                                    </div>
                                </div>
                            </Reveal>

                        </div>
                    </div>
                </div>

                {/* ── CTA ─────────────────────────────────────────────────────────────── */}
                <section style={{
                    background: "var(--ink)", position: "relative", overflow: "hidden", padding: "96px 28px",
                }}>
                    <div style={{
                        position: "absolute", inset: 0,
                        backgroundImage: "linear-gradient(rgba(201,168,76,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.025) 1px, transparent 1px)",
                        backgroundSize: "60px 60px", pointerEvents: "none",
                    }} />
                    <div style={{
                        position: "absolute", left: "-5%", top: "50%", transform: "translateY(-50%)",
                        width: 500, height: 500, borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
                        pointerEvents: "none",
                    }} />

                    <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
                        <Reveal>
                            <div className="cta-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
                                <div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                                        <Sparkles style={{ width: 11, height: 11, color: "var(--gold-dk)" }} />
                                        <span style={{
                                            fontFamily: "var(--mono)", fontSize: "8.5px", color: "var(--gold)",
                                            letterSpacing: "0.2em", textTransform: "uppercase",
                                        }}>Get started today</span>
                                    </div>
                                    <h2 style={{
                                        fontFamily: "var(--serif)", fontSize: "clamp(28px, 4.5vw, 56px)",
                                        fontWeight: 600, color: "white", letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: 16,
                                    }}>
                                        Ready for the legal help{" "}
                                        <span className="gold-text" style={{ fontStyle: "italic", fontWeight: 300 }}>you deserve?</span>
                                    </h2>
                                    <OrnamentLine />
                                    <p style={{
                                        fontFamily: "var(--sans)", fontSize: "14.5px",
                                        color: "rgba(255,255,255,0.45)", lineHeight: 1.85, marginBottom: 36,
                                    }}>
                                        Join thousands of Indians who trust NyayMitra for clear, accessible, and verified legal guidance.
                                    </p>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                                        <Link href="/legal-ai" className="btn-gold">
                                            <Sparkles style={{ width: 14, height: 14 }} />
                                            Ask Legal AI
                                        </Link>
                                        <Link href="/lawyers" style={{
                                            display: "inline-flex", alignItems: "center", gap: 8,
                                            background: "transparent", color: "rgba(255,255,255,0.65)",
                                            fontFamily: "var(--sans)", fontSize: "13px", fontWeight: 500,
                                            padding: "13px 22px", borderRadius: "var(--radius)",
                                            border: "1px solid rgba(255,255,255,0.15)", textDecoration: "none",
                                            transition: "all 0.22s",
                                        }}
                                            onMouseEnter={e => {
                                                const a = e.currentTarget as HTMLAnchorElement
                                                a.style.borderColor = "rgba(201,168,76,0.5)"
                                                a.style.color = "var(--gold-lt)"
                                                a.style.transform = "translateY(-2px)"
                                            }}
                                            onMouseLeave={e => {
                                                const a = e.currentTarget as HTMLAnchorElement
                                                a.style.borderColor = "rgba(255,255,255,0.15)"
                                                a.style.color = "rgba(255,255,255,0.65)"
                                                a.style.transform = ""
                                            }}
                                        >
                                            Find Lawyers
                                            <ArrowRight style={{ width: 14, height: 14 }} />
                                        </Link>
                                    </div>
                                </div>

                                <div>
                                    <div style={{
                                        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.15)",
                                        borderRadius: "var(--radius-xl)", overflow: "hidden",
                                    }}>
                                        <div style={{
                                            padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)",
                                            display: "flex", alignItems: "center", gap: 10, background: "rgba(201,168,76,0.04)",
                                        }}>
                                            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", animation: "glowPulse 2.5s ease-in-out infinite" }} />
                                            <span style={{ fontFamily: "var(--mono)", fontSize: "8.5px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.16em", textTransform: "uppercase" }}>
                                                Why trust us
                                            </span>
                                        </div>
                                        <div style={{ padding: "8px 0" }}>
                                            {[
                                                { icon: Shield, text: "Bar Council verified lawyers only", sub: "Every lawyer undergoes rigorous verification" },
                                                { icon: DollarSign, text: "Transparent pricing, always", sub: "No hidden fees. What you see is what you pay" },
                                                { icon: Zap, text: "AI guidance in under 2 minutes", sub: "Instant clarity on any legal situation" },
                                                { icon: Star, text: "4.9 star rated by real users", sub: "Consistently rated top legal platform" },
                                            ].map(({ icon: Icon, text, sub }, i, arr) => (
                                                <div key={text} style={{
                                                    padding: "18px 24px", display: "flex", gap: 14, alignItems: "flex-start",
                                                    borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                                                }}>
                                                    <div style={{
                                                        width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                                                        background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)",
                                                        display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold)",
                                                    }}>
                                                        <Icon style={{ width: 14, height: 14 }} />
                                                    </div>
                                                    <div>
                                                        <div style={{ fontFamily: "var(--sans)", fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.75)", marginBottom: 3 }}>{text}</div>
                                                        <div style={{ fontFamily: "var(--sans)", fontSize: "11.5px", color: "rgba(255,255,255,0.3)", lineHeight: 1.5 }}>{sub}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div style={{
                                            padding: "14px 24px", borderTop: "1px solid rgba(255,255,255,0.06)",
                                            background: "rgba(201,168,76,0.03)", display: "flex", alignItems: "center", justifyContent: "space-between",
                                        }}>
                                            <span style={{ fontFamily: "var(--mono)", fontSize: "8px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>
                                                Available 24/7 · Pan India
                                            </span>
                                            <Link href="/lawyers" style={{
                                                display: "flex", alignItems: "center", gap: 5,
                                                fontFamily: "var(--mono)", fontSize: "8.5px", fontWeight: 600,
                                                color: "var(--gold-lt)", textDecoration: "none", letterSpacing: "0.08em",
                                            }}>
                                                Explore <ChevronRight style={{ width: 10, height: 10 }} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
                <footer style={{
                    background: "var(--ink)", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "24px 28px",
                }}>
                    <div style={{
                        maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center",
                        justifyContent: "space-between", flexWrap: "wrap", gap: 12,
                    }}>
                        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                            <div style={{
                                width: 30, height: 30, borderRadius: 8, background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(201,168,76,0.2)", display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                                <Scale style={{ color: "var(--gold)", width: 13, height: 13 }} />
                            </div>
                            <span style={{ fontFamily: "var(--serif)", fontSize: "16px", fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>
                                NyayMitra
                            </span>
                        </Link>
                        <p style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em" }}>
                            © {new Date().getFullYear()} NyayMitra. All rights reserved.
                        </p>
                        <div style={{ display: "flex", gap: 4 }}>
                            {[
                                { label: "Privacy", href: "/privacy-policy" },
                                { label: "Terms", href: "/terms" },
                                { label: "Contact", href: "/contact" },
                            ].map(({ label, href }) => (
                                <Link key={label} href={href} style={{
                                    fontFamily: "var(--sans)", fontSize: "12px",
                                    color: "rgba(255,255,255,0.3)", textDecoration: "none",
                                    padding: "4px 10px", borderRadius: 6, transition: "color 0.16s",
                                }}
                                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.65)"}
                                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.3)"}
                                >{label}</Link>
                            ))}
                        </div>
                    </div>
                </footer>

            </div>
        </>
    )
}