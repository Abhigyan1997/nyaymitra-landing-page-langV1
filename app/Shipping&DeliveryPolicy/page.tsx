// app/shipping-policy/page.tsx
"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
    Shield, Lock, Truck, Send, Clock, MapPin, FileText, Mail, Phone,
    Package, CheckCircle, AlertCircle, Info, ArrowLeft, Sparkles,
    Menu, X, ChevronRight, BookOpen, Globe, Scale, Users
} from "lucide-react"

/* ─── GLOBAL STYLES (same as privacy page) ──────────────────────────────────── */
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
      --gold-rich:  #d4a843;
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

    @keyframes fadeUp   { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }
    @keyframes shimmer  { 0%{background-position:-300% center} 100%{background-position:300% center} }
    @keyframes glowPulse { 0%,100%{opacity:0.4} 50%{opacity:0.9} }
    @keyframes mobileMenuFade {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .reveal {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1);
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

    .btn-ink {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--ink);
      color: var(--white);
      font-family: var(--sans);
      font-size: 12.5px;
      font-weight: 600;
      padding: 9px 18px;
      border-radius: var(--radius);
      border: none;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.22s cubic-bezier(0.16,1,0.3,1);
    }
    .btn-ink:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 28px rgba(12,11,9,0.25);
    }

    .btn-ghost {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: transparent;
      color: var(--ink-3);
      font-family: var(--sans);
      font-size: 12.5px;
      font-weight: 500;
      padding: 9px 16px;
      border-radius: var(--radius);
      border: 1.5px solid var(--ink-7);
      text-decoration: none;
      cursor: pointer;
      transition: all 0.22s;
    }
    .btn-ghost:hover {
      background: var(--ink-9);
      border-color: var(--ink-5);
      color: var(--ink);
    }

    .desktop-nav-items {
      display: none !important;
    }
    .mobile-menu-button {
      display: inline-flex !important;
    }
    .sidebar-wrap {
      display: block !important;
    }

    @media (min-width: 769px) {
      .desktop-nav-items {
        display: flex !important;
        align-items: center;
        gap: 8px;
      }
      .mobile-menu-button {
        display: none !important;
      }
      .sidebar-wrap {
        display: block !important;
      }
    }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--ink-9); }
    ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--gold-dk); }
    ::selection { background: var(--gold-pale); color: var(--gold-dk); }

    @media (max-width: 768px) {
      .hero-title { font-size: clamp(38px, 10vw, 64px) !important; }
      .content-card { padding: 24px 20px !important; }
      .layout-grid { grid-template-columns: 1fr !important; }
      .sidebar-sticky { position: static !important; }
      .sidebar-wrap { display: none !important; }
      .hero-pad { padding: 56px 20px 72px !important; }
      .main-pad { padding: 32px 20px !important; }
      .data-grid { grid-template-columns: 1fr !important; }
      .rights-grid { grid-template-columns: 1fr !important; }
      .security-badge-wrap { gap: 8px !important; }
      .footer-container { flex-direction: column; align-items: center; text-align: center; gap: 16px; }
      .stats-grid { grid-template-columns: 1fr !important; }
      .service-grid { grid-template-columns: 1fr !important; }
      .timeline-table { font-size: 11px; }
      .timeline-table td, .timeline-table th { padding: 12px 8px !important; }
    }
  `}</style>
)

/* ─── REVEAL HELPER ──────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const el = ref.current; if (!el) return
        const tid = setTimeout(() => {
            const obs = new IntersectionObserver(([e]) => {
                if (e.isIntersecting) { el.classList.add("is-on"); obs.disconnect() }
            }, { threshold: 0.05, rootMargin: "0px 0px -20px 0px" })
            obs.observe(el)
            return () => obs.disconnect()
        }, 60)
        return () => clearTimeout(tid)
    }, [])
    return <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

/* ─── DATA ───────────────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
    { href: "#digital", label: "Digital Delivery", icon: Send },
    { href: "#physical", label: "Physical Courier", icon: Truck },
    { href: "#timeline", label: "Delivery Timeline", icon: Clock },
    { href: "#tracking", label: "Order Tracking", icon: MapPin },
    { href: "#faq", label: "FAQ", icon: FileText },
    { href: "#contact", label: "Contact Support", icon: Mail },
]

const DIGITAL_SERVICES = [
    {
        title: "Legal Documents (Contracts, Agreements, Notices)",
        items: [
            "Instant generation for standard templates",
            "Delivery via email & NyayMitra dashboard",
            "WhatsApp delivery option available",
            "Downloadable PDF format with digital signatures",
        ],
        icon: FileText,
    },
    {
        title: "Legal Reviews & Consultations",
        items: [
            "Lawyer-reviewed documents within 24 hours",
            "Detailed analysis sent to your registered email",
            "Follow-up consultation available via video/chat",
            "Document version tracking included",
        ],
        icon: Shield,
    },
    {
        title: "Remote Notarization",
        items: [
            "Digitally notarized documents instantly",
            "Shared via email and dashboard",
            "Blockchain-verified certificates",
            "Physical courier option available",
        ],
        icon: CheckCircle,
    },
]

const TIMELINE_ROWS = [
    ["Standard Templates", "Digital", "Instant"],
    ["Custom Documents", "Digital", "24–48 hours"],
    ["Lawyer Review", "Digital", "Within 24 hours"],
    ["Remote Notarization", "Digital", "1–2 Business Days"],
    ["Physical Notarized Copy", "Courier", "3–5 Business Days"],
    ["Express Shipping", "Courier", "1–2 Business Days"],
]

const TRACKING_ITEMS = [
    "Email confirmation with tracking number",
    "SMS notification with tracking link",
    "Real-time updates in your NyayMitra dashboard",
]

const FAQS = [
    {
        q: "Is there any shipping charge for digital delivery?",
        a: "No, digital delivery is completely free. All documents sent via email or dashboard are included in your consultation/service fee.",
    },
    {
        q: "Do you ship internationally?",
        a: "Currently, physical shipping is available only within India. Digital services are available worldwide.",
    },
    {
        q: "What if my package is delayed or lost?",
        a: "If your package is delayed beyond 7 business days or lost in transit, we will re-ship your documents at no additional cost. Contact our support team immediately.",
    },
    {
        q: "Can I change my delivery address after shipping?",
        a: "Address changes are only possible before dispatch. Once shipped, you'll need to coordinate directly with the courier partner using your tracking number.",
    },
    {
        q: "Do you offer express shipping?",
        a: "Yes, express shipping (1–2 business days) is available at an additional cost. Select the option at checkout.",
    },
]

const STATS = [
    { value: "Instant", label: "Digital Delivery", icon: Send },
    { value: "24/7", label: "Tracking Available", icon: MapPin },
    { value: "100%", label: "Secure Delivery", icon: Shield },
    { value: "50K+", label: "Happy Customers", icon: Users },
]

/* ─── SECTION HEADER ─────────────────────────────────────────────────────────── */
function SectionHeader({ eyebrow, title, italic, icon: Icon }: {
    eyebrow?: string; title: string; italic?: string; icon: any
}) {
    return (
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 28 }}>
            <div style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: "var(--ink-9)", border: "1px solid var(--ink-7)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--gold-dk)",
            }}>
                <Icon style={{ width: 18, height: 18 }} />
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
                    fontSize: "clamp(20px, 3vw, 26px)",
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

/* ─── ORNAMENT LINE ──────────────────────────────────────────────────────────── */
const OrnamentLine = () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
        <div style={{ width: 40, height: 1, background: "linear-gradient(90deg, var(--gold-dk), var(--gold))" }} />
        <Truck style={{ width: 9, height: 9, color: "var(--gold)" }} />
        <div style={{ width: 20, height: 1, background: "linear-gradient(90deg, var(--gold), transparent)" }} />
    </div>
)

/* ─── STAT CARD ──────────────────────────────────────────────────────────────── */
function StatCard({ value, label, icon: Icon }: { value: string; label: string; icon: any }) {
    return (
        <div style={{
            padding: "20px 16px",
            textAlign: "center",
            border: "1px solid var(--ink-7)",
            borderRadius: "var(--radius)",
            background: "var(--white)",
            transition: "all 0.22s",
        }}
            onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.borderColor = "var(--gold)"
                el.style.transform = "translateY(-3px)"
                el.style.boxShadow = "0 8px 24px rgba(201,168,76,0.08)"
            }}
            onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.borderColor = "var(--ink-7)"
                el.style.transform = "translateY(0)"
                el.style.boxShadow = "none"
            }}
        >
            <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: "var(--ink-9)", border: "1px solid var(--ink-7)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--gold-dk)", margin: "0 auto 12px auto",
            }}>
                <Icon style={{ width: 16, height: 16 }} />
            </div>
            <p style={{
                fontFamily: "var(--serif)",
                fontSize: "28px", fontWeight: 600, color: "var(--ink)",
                lineHeight: 1.2, marginBottom: 4,
            }}>{value}</p>
            <p style={{ fontSize: "11px", color: "var(--ink-5)", letterSpacing: "0.03em" }}>{label}</p>
        </div>
    )
}

/* ─── DIGITAL SERVICE CARD ───────────────────────────────────────────────────── */
function DigitalServiceCard({ title, items, icon: Icon }: { title: string; items: string[]; icon: any }) {
    return (
        <div style={{
            padding: "22px",
            border: "1px solid var(--ink-7)",
            borderRadius: "var(--radius)",
            background: "var(--white)",
            transition: "all 0.22s",
        }}
            onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.borderColor = "var(--gold)"
                el.style.transform = "translateY(-2px)"
                el.style.boxShadow = "0 8px 24px rgba(201,168,76,0.08)"
            }}
            onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.borderColor = "var(--ink-7)"
                el.style.transform = "translateY(0)"
                el.style.boxShadow = "none"
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{
                    width: 36, height: 36, borderRadius: 9,
                    background: "var(--ink-9)", border: "1px solid var(--ink-7)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--gold-dk)",
                }}>
                    <Icon style={{ width: 14, height: 14 }} />
                </div>
                <h4 style={{
                    fontFamily: "var(--serif)", fontSize: "16px",
                    fontWeight: 600, color: "var(--ink)", margin: 0,
                }}>{title}</h4>
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {items.map((item, i) => (
                    <li key={i} style={{
                        display: "flex", alignItems: "flex-start", gap: 8,
                        padding: "6px 0", fontSize: "12.5px", color: "var(--ink-4)",
                        borderBottom: i < items.length - 1 ? "1px solid var(--ink-8)" : "none",
                    }}>
                        <span style={{
                            width: 4, height: 4, borderRadius: "50%",
                            background: "var(--gold)", flexShrink: 0, marginTop: 6,
                        }} />
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    )
}

/* ─── PAGE ───────────────────────────────────────────────────────────────────── */
export default function ShippingPolicyPage() {
    const [activeSection, setActiveSection] = useState("digital")
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 8)
            const sections = ["digital", "physical", "timeline", "tracking", "faq", "contact"]
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

    const handleMobileLinkClick = () => {
        setMobileMenuOpen(false)
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
                        {/* Logo */}
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
                            <div>
                                <div style={{
                                    fontFamily: "var(--serif)", fontSize: "20px", fontWeight: 600,
                                    color: "var(--ink)", lineHeight: 1, letterSpacing: "-0.02em",
                                }}>NyayMitra</div>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="desktop-nav-items" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <Link href="/" className="btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                                <ArrowLeft style={{ width: 13, height: 13 }} />
                                Home
                            </Link>
                            <Link href="/lawyers" className="nav-link" style={{ display: "inline-flex", alignItems: "center" }}>
                                Find Lawyers
                            </Link>
                            <Link href="/legal-ai" className="btn-ink" style={{ display: "inline-flex", alignItems: "center" }}>
                                <Sparkles style={{ width: 13, height: 13 }} />
                                Legal AI
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="mobile-menu-button"
                            style={{
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                padding: "8px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "8px",
                                transition: "all 0.2s",
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

                    {/* Mobile Menu Dropdown */}
                    {mobileMenuOpen && (
                        <div style={{
                            position: "absolute",
                            top: 66,
                            left: 0,
                            right: 0,
                            background: "var(--white)",
                            borderBottom: "1px solid var(--ink-7)",
                            boxShadow: "0 4px 24px rgba(12,11,9,0.08)",
                            padding: "20px",
                            animation: "mobileMenuFade 0.3s ease-out",
                            zIndex: 99,
                        }}>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 4,
                            }}>
                                <Link
                                    href="/"
                                    className="mobile-nav-link"
                                    onClick={handleMobileLinkClick}
                                    style={{ borderTop: "none" }}
                                >
                                    <ArrowLeft style={{ width: 18, height: 18, color: "var(--gold-dk)" }} />
                                    Home
                                </Link>
                                <Link
                                    href="/lawyers"
                                    className="mobile-nav-link"
                                    onClick={handleMobileLinkClick}
                                >
                                    <Users style={{ width: 18, height: 18, color: "var(--gold-dk)" }} />
                                    Find Lawyers
                                </Link>
                                <Link
                                    href="/legal-ai"
                                    className="mobile-nav-link"
                                    onClick={handleMobileLinkClick}
                                    style={{ borderBottom: "none" }}
                                >
                                    <Sparkles style={{ width: 18, height: 18, color: "var(--gold-dk)" }} />
                                    Legal AI
                                </Link>
                            </div>
                        </div>
                    )}
                </nav>

                {/* ── HERO ─────────────────────────────────────────────────────────────── */}
                <section className="hero-pad" style={{
                    padding: "80px 28px 96px",
                    position: "relative", overflow: "hidden",
                    background: "var(--white)",
                }}>
                    <div style={{
                        position: "absolute", inset: 0,
                        backgroundImage: "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)",
                        backgroundSize: "80px 80px", pointerEvents: "none",
                    }} />
                    <div style={{
                        position: "absolute", right: "-5%", top: "5%",
                        width: 520, height: 520, opacity: 0.03, pointerEvents: "none",
                    }}>
                        <Truck style={{ width: "100%", height: "100%", color: "var(--gold-dk)" }} />
                    </div>

                    <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
                        <div style={{ animation: "fadeUp 0.72s cubic-bezier(0.16,1,0.3,1) both" }}>
                            <div style={{
                                display: "inline-flex", alignItems: "center", gap: 9,
                                padding: "6px 16px 6px 9px",
                                border: "1px solid var(--ink-7)", borderRadius: 100,
                                marginBottom: 36, background: "var(--white)",
                                boxShadow: "0 2px 12px rgba(12,11,9,0.04)",
                            }}>
                                <div style={{
                                    width: 22, height: 22, borderRadius: "50%",
                                    background: "var(--gold-pale)", border: "1px solid var(--gold)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                }}>
                                    <Truck style={{ width: 10, height: 10, color: "var(--gold-dk)" }} />
                                </div>
                                <span style={{ fontFamily: "var(--mono)", fontSize: "9.5px", color: "var(--ink-4)", letterSpacing: "0.1em" }}>
                                    Shipping & Delivery
                                </span>
                            </div>

                            <h1 className="hero-title" style={{
                                fontFamily: "var(--serif)",
                                fontSize: "clamp(44px, 7vw, 80px)",
                                fontWeight: 600, lineHeight: 1.08,
                                letterSpacing: "-0.03em",
                                color: "var(--ink)", marginBottom: 0,
                            }}>
                                Shipping & delivery,<br />
                                <span className="gold-text" style={{ fontStyle: "italic", fontWeight: 300, display: "inline-block", lineHeight: 1.3 }}>
                                    done right.
                                </span>
                            </h1>

                            <OrnamentLine />

                            <p style={{
                                fontFamily: "var(--sans)", fontSize: "15px",
                                color: "var(--ink-4)", lineHeight: 1.85,
                                maxWidth: 480, marginBottom: 12, fontWeight: 300,
                            }}>
                                Fast, secure, and reliable delivery of your legal documents and services digital or physical.
                            </p>

                            <div style={{
                                display: "inline-flex", alignItems: "center", gap: 7,
                                fontFamily: "var(--mono)", fontSize: "9.5px", color: "var(--ink-5)", letterSpacing: "0.1em",
                            }}>
                                <Clock style={{ width: 11, height: 11, color: "var(--gold-dk)" }} />
                                Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                            </div>
                        </div>
                    </div>
                </section>

                <div style={{ height: 1, background: "var(--ink-7)" }} />

                {/* ── STATS SECTION ────────────────────────────────────────────────────── */}
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 28px 0" }}>
                    <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
                        {STATS.map((stat, i) => (
                            <Reveal delay={i * 40} key={i}>
                                <StatCard value={stat.value} label={stat.label} icon={stat.icon} />
                            </Reveal>
                        ))}
                    </div>
                </div>

                {/* ── MAIN LAYOUT ──────────────────────────────────────────────────────── */}
                <div className="main-pad" style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 28px 96px" }}>
                    <div className="layout-grid" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 48, alignItems: "start" }}>

                        {/* ── SIDEBAR ──────────────────────────────────────────────────────── */}
                        <aside className="sidebar-wrap sidebar-sticky" style={{ position: "sticky", top: 88 }}>
                            <div style={{
                                border: "1px solid var(--ink-7)",
                                borderRadius: "var(--radius-lg)", overflow: "hidden",
                                background: "var(--white)",
                            }}>
                                <div style={{
                                    padding: "14px 18px",
                                    borderBottom: "1px solid var(--ink-7)",
                                    display: "flex", alignItems: "center", gap: 10,
                                    background: "var(--ink-9)",
                                }}>
                                    <div style={{
                                        width: 28, height: 28, borderRadius: 7,
                                        background: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center",
                                    }}>
                                        <BookOpen style={{ color: "var(--gold)", width: 12, height: 12 }} />
                                    </div>
                                    <span style={{ fontFamily: "var(--serif)", fontSize: "15px", fontWeight: 600, color: "var(--ink)" }}>Contents</span>
                                </div>

                                <nav style={{ padding: "6px 0" }}>
                                    {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                                        const id = href.replace("#", "")
                                        return (
                                            <a
                                                key={href}
                                                href={href}
                                                className={`sidebar-link${activeSection === id ? " active" : ""}`}
                                            >
                                                <Icon style={{ width: 13, height: 13, flexShrink: 0 }} />
                                                <span>{label}</span>
                                                <ChevronRight style={{
                                                    width: 11, height: 11, marginLeft: "auto",
                                                    opacity: activeSection === id ? 1 : 0,
                                                    transition: "opacity 0.2s",
                                                    color: "var(--gold-dk)",
                                                }} />
                                            </a>
                                        )
                                    })}
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
                                            Most deliveries are digital
                                        </span>
                                    </div>
                                    <p style={{ fontFamily: "var(--sans)", fontSize: "11px", color: "var(--ink-4)", lineHeight: 1.6, fontWeight: 300 }}>
                                        Instant access to your documents via email and dashboard.
                                    </p>
                                </div>
                            </div>
                        </aside>

                        {/* ── CONTENT ──────────────────────────────────────────────────────── */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>

                            {/* Digital Delivery */}
                            <Reveal>
                                <div id="digital" className="content-card" style={{ scrollMarginTop: 100 }}>
                                    <SectionHeader eyebrow="Instant Access" title="Digital Service" italic="Delivery" icon={Send} />
                                    <p style={{
                                        fontFamily: "var(--sans)", fontSize: "14px",
                                        color: "var(--ink-4)", lineHeight: 1.85,
                                        marginBottom: 24, fontWeight: 300,
                                    }}>
                                        NyayMitra primarily offers digital legal services. Most deliverables are provided electronically for instant access and maximum convenience.
                                    </p>
                                    <div className="service-grid" style={{ display: "grid", gap: 16 }}>
                                        {DIGITAL_SERVICES.map((service, i) => (
                                            <DigitalServiceCard
                                                key={i}
                                                title={service.title}
                                                items={service.items}
                                                icon={service.icon}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </Reveal>

                            {/* Physical Courier */}
                            <Reveal delay={40}>
                                <div id="physical" className="content-card" style={{ scrollMarginTop: 100 }}>
                                    <SectionHeader eyebrow="Tangible Documents" title="Physical Courier" italic="Service" icon={Truck} />
                                    <p style={{
                                        fontFamily: "var(--sans)", fontSize: "14px",
                                        color: "var(--ink-4)", lineHeight: 1.85,
                                        marginBottom: 24, fontWeight: 300,
                                    }}>
                                        For printed and notarized documents requiring physical delivery, we partner with trusted courier services to ensure safe and timely delivery.
                                    </p>

                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
                                        <div style={{
                                            padding: "20px",
                                            border: "1px solid var(--ink-7)",
                                            borderRadius: "var(--radius)",
                                            background: "var(--ink-9)",
                                        }}>
                                            <p style={{ fontFamily: "var(--mono)", fontSize: "8px", fontWeight: 500, letterSpacing: "0.12em", color: "var(--gold-dk)", marginBottom: 8 }}>
                                                Processing Time
                                            </p>
                                            <p style={{ fontFamily: "var(--serif)", fontSize: "36px", fontWeight: 600, color: "var(--ink)", lineHeight: 1 }}>
                                                1–2
                                            </p>
                                            <p style={{ fontSize: "11px", color: "var(--ink-4)", marginTop: 4 }}>Business days after notarization</p>
                                        </div>
                                        <div style={{
                                            padding: "20px",
                                            border: "1px solid var(--ink-7)",
                                            borderRadius: "var(--radius)",
                                            background: "var(--ink-9)",
                                        }}>
                                            <p style={{ fontFamily: "var(--mono)", fontSize: "8px", fontWeight: 500, letterSpacing: "0.12em", color: "var(--gold-dk)", marginBottom: 8 }}>
                                                Shipping Time
                                            </p>
                                            <p style={{ fontFamily: "var(--serif)", fontSize: "36px", fontWeight: 600, color: "var(--ink)", lineHeight: 1 }}>
                                                2–3
                                            </p>
                                            <p style={{ fontSize: "11px", color: "var(--ink-4)", marginTop: 4 }}>Business days (varies by location)</p>
                                        </div>
                                    </div>

                                    <div style={{
                                        display: "flex", alignItems: "flex-start", gap: 14,
                                        padding: "16px 20px",
                                        background: "var(--ink-9)", border: "1px solid var(--ink-7)",
                                        borderRadius: "var(--radius)",
                                        borderLeft: "3px solid var(--gold)",
                                    }}>
                                        <MapPin style={{ width: 16, height: 16, color: "var(--gold-dk)", flexShrink: 0, marginTop: 2 }} />
                                        <div>
                                            <h4 style={{ fontFamily: "var(--serif)", fontSize: "14px", fontWeight: 600, color: "var(--ink)", marginBottom: 4 }}>
                                                Shipping Partners
                                            </h4>
                                            <p style={{ fontSize: "12px", color: "var(--ink-4)", lineHeight: 1.6 }}>
                                                We partner with leading courier services including DTDC, BlueDart, Delhivery, and India Post for pan-India delivery.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>

                            {/* Delivery Timeline */}
                            <Reveal delay={60}>
                                <div id="timeline" className="content-card" style={{ scrollMarginTop: 100 }}>
                                    <SectionHeader eyebrow="Expected Delivery" title="Delivery Timeline" italic="by Service" icon={Clock} />
                                    <div style={{ overflowX: "auto" }}>
                                        <table className="timeline-table" style={{
                                            width: "100%", borderCollapse: "collapse",
                                            fontFamily: "var(--sans)", fontSize: "13px",
                                        }}>
                                            <thead>
                                                <tr style={{ borderBottom: "1px solid var(--ink-7)" }}>
                                                    {["Service Type", "Delivery Method", "Timeline"].map((h) => (
                                                        <th key={h} style={{
                                                            textAlign: "left", padding: "14px 12px",
                                                            fontFamily: "var(--mono)", fontSize: "9px",
                                                            fontWeight: 600, letterSpacing: "0.1em",
                                                            textTransform: "uppercase", color: "var(--gold-dk)",
                                                        }}>
                                                            {h}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {TIMELINE_ROWS.map((row, i) => (
                                                    <tr key={i} style={{ borderBottom: i < TIMELINE_ROWS.length - 1 ? "1px solid var(--ink-8)" : "none" }}>
                                                        <td style={{ padding: "14px 12px", color: "var(--ink-3)", fontWeight: 500 }}>{row[0]}</td>
                                                        <td style={{ padding: "14px 12px" }}>
                                                            <span style={{
                                                                fontSize: "10px", fontWeight: 600,
                                                                padding: "3px 10px", borderRadius: 20,
                                                                background: row[1] === "Digital" ? "var(--gold-pale)" : "var(--ink-8)",
                                                                color: row[1] === "Digital" ? "var(--gold-dk)" : "var(--ink-4)",
                                                            }}>
                                                                {row[1]}
                                                            </span>
                                                        </td>
                                                        <td style={{ padding: "14px 12px", color: "var(--gold-dk)", fontWeight: 600 }}>{row[2]}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Reveal>

                            {/* Order Tracking */}
                            <Reveal delay={60}>
                                <div id="tracking" className="content-card" style={{ scrollMarginTop: 100 }}>
                                    <SectionHeader eyebrow="Stay Updated" title="Order" italic="Tracking" icon={MapPin} />
                                    <p style={{
                                        fontSize: "14px", color: "var(--ink-4)", marginBottom: 20,
                                        lineHeight: 1.7,
                                    }}>
                                        Once your physical order is dispatched, you will receive:
                                    </p>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                        {TRACKING_ITEMS.map((item, i) => (
                                            <div key={i} style={{
                                                display: "flex", alignItems: "center", gap: 12,
                                                padding: "12px 16px",
                                                border: "1px solid var(--ink-7)", borderRadius: "var(--radius)",
                                                background: "var(--ink-9)",
                                            }}>
                                                <div style={{
                                                    width: 28, height: 28, borderRadius: "50%",
                                                    background: "var(--gold-pale)",
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                }}>
                                                    <CheckCircle style={{ width: 12, height: 12, color: "var(--gold-dk)" }} />
                                                </div>
                                                <span style={{ fontSize: "13px", color: "var(--ink-3)" }}>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Reveal>

                            {/* FAQ */}
                            <Reveal delay={60}>
                                <div id="faq" className="content-card" style={{ scrollMarginTop: 100 }}>
                                    <SectionHeader eyebrow="Common Questions" title="Frequently Asked" italic="Questions" icon={FileText} />
                                    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                                        {FAQS.map((faq, i) => (
                                            <div key={i} style={{
                                                padding: "20px 0",
                                                borderBottom: i < FAQS.length - 1 ? "1px solid var(--ink-8)" : "none",
                                            }}>
                                                <h4 style={{
                                                    fontFamily: "var(--serif)", fontSize: "16px",
                                                    fontWeight: 600, color: "var(--ink)", marginBottom: 8,
                                                }}>{faq.q}</h4>
                                                <p style={{ fontSize: "13px", color: "var(--ink-4)", lineHeight: 1.7 }}>{faq.a}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Reveal>

                            {/* Disclaimer */}
                            <Reveal delay={60}>
                                <div style={{
                                    borderRadius: "var(--radius-lg)",
                                    border: "1px solid rgba(201,168,76,0.3)",
                                    background: "var(--gold-pale)",
                                    padding: "28px 32px",
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
                                                fontWeight: 600, color: "var(--ink)", marginBottom: 10, letterSpacing: "-0.01em",
                                            }}>
                                                Important Note
                                            </h3>
                                            <p style={{
                                                fontFamily: "var(--sans)", fontSize: "13.5px",
                                                color: "var(--ink-3)", lineHeight: 1.8, fontWeight: 300,
                                            }}>
                                                Delivery times are estimates and may vary due to courier partner delays, weather conditions, or unforeseen circumstances.
                                                NyayMitra is not liable for third-party delays beyond our control. For urgent matters, we recommend digital delivery.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>

                            {/* Contact */}
                            <Reveal delay={60}>
                                <div id="contact" className="content-card dark-accent" style={{ overflow: "hidden", scrollMarginTop: 100, padding: 0 }}>
                                    <div style={{
                                        padding: "36px 36px 28px",
                                        position: "relative", overflow: "hidden",
                                        background: "var(--ink)",
                                    }}>
                                        <div style={{
                                            position: "absolute", inset: 0,
                                            background: "linear-gradient(135deg, rgba(201,168,76,0.06) 0%, transparent 60%)",
                                            pointerEvents: "none",
                                        }} />
                                        <div style={{
                                            position: "absolute", right: -40, top: -40,
                                            width: 200, height: 200, borderRadius: "50%",
                                            background: "rgba(255,255,255,0.02)", pointerEvents: "none",
                                        }} />

                                        <div style={{ marginBottom: 10 }}>
                                            <span style={{
                                                fontFamily: "var(--mono)", fontSize: "8px", fontWeight: 500,
                                                letterSpacing: "0.22em", textTransform: "uppercase",
                                                color: "var(--gold)", display: "block", marginBottom: 10,
                                            }}>
                                                Need Help?
                                            </span>
                                            <h2 style={{
                                                fontFamily: "var(--serif)",
                                                fontSize: "clamp(22px, 3.5vw, 30px)",
                                                fontWeight: 600, color: "white",
                                                letterSpacing: "-0.02em", lineHeight: 1.2,
                                            }}>
                                                Have questions about your delivery?
                                            </h2>
                                            <p style={{
                                                fontFamily: "var(--sans)", fontSize: "13.5px",
                                                color: "rgba(255,255,255,0.4)", marginTop: 8, lineHeight: 1.7, fontWeight: 300,
                                            }}>
                                                For delivery-related concerns, tracking issues, or special requests, our support team is here to help.
                                            </p>
                                        </div>

                                        <div style={{
                                            display: "flex", alignItems: "center", gap: 12, marginTop: 24,
                                        }}>
                                            <div style={{ width: 32, height: 1, background: "linear-gradient(90deg, var(--gold-dk), var(--gold))" }} />
                                            <Truck style={{ width: 9, height: 9, color: "var(--gold)" }} />
                                            <div style={{ width: 16, height: 1, background: "linear-gradient(90deg, var(--gold), transparent)" }} />
                                        </div>
                                    </div>

                                    <div style={{
                                        display: "grid", gridTemplateColumns: "1fr 1fr",
                                        gap: 12, padding: "24px 28px 28px",
                                        background: "var(--ink-2)",
                                    }}>
                                        <a href="mailto:support@nyaymitra.tech" style={{
                                            display: "flex", alignItems: "center", gap: 14,
                                            padding: "16px 20px",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            borderRadius: "var(--radius)",
                                            textDecoration: "none",
                                            background: "rgba(255,255,255,0.04)",
                                            transition: "all 0.22s",
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
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                color: "var(--gold)",
                                            }}>
                                                <Mail style={{ width: 14, height: 14 }} />
                                            </div>
                                            <div>
                                                <p style={{
                                                    fontFamily: "var(--mono)", fontSize: "8px", fontWeight: 500,
                                                    letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)",
                                                    marginBottom: 3,
                                                }}>Email</p>
                                                <p style={{
                                                    fontFamily: "var(--sans)", fontSize: "13px",
                                                    color: "rgba(255,255,255,0.65)", fontWeight: 400,
                                                }}>support@nyaymitra.tech</p>
                                            </div>
                                        </a>
                                        <a href="tel:+917970596183" style={{
                                            display: "flex", alignItems: "center", gap: 14,
                                            padding: "16px 20px",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            borderRadius: "var(--radius)",
                                            textDecoration: "none",
                                            background: "rgba(255,255,255,0.04)",
                                            transition: "all 0.22s",
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
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                color: "var(--gold)",
                                            }}>
                                                <Phone style={{ width: 14, height: 14 }} />
                                            </div>
                                            <div>
                                                <p style={{
                                                    fontFamily: "var(--mono)", fontSize: "8px", fontWeight: 500,
                                                    letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)",
                                                    marginBottom: 3,
                                                }}>Phone</p>
                                                <p style={{
                                                    fontFamily: "var(--sans)", fontSize: "13px",
                                                    color: "rgba(255,255,255,0.65)", fontWeight: 400,
                                                }}>+91 79705 96183</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div style={{
                                        padding: "16px 28px 24px",
                                        background: "var(--ink-2)",
                                        borderTop: "1px solid rgba(255,255,255,0.05)",
                                        textAlign: "center",
                                    }}>
                                        <p style={{
                                            fontSize: "11px", color: "rgba(255,255,255,0.25)",
                                            fontFamily: "var(--mono)", letterSpacing: "0.06em",
                                        }}>
                                            Response time: Within 24 hours on business days.
                                        </p>
                                    </div>
                                </div>
                            </Reveal>

                            {/* CTA Section */}
                            <Reveal delay={60}>
                                <div style={{
                                    borderRadius: "var(--radius-lg)",
                                    background: "linear-gradient(135deg, var(--ink) 0%, var(--ink-2) 100%)",
                                    padding: "48px 40px",
                                    textAlign: "center",
                                    border: "1px solid rgba(201,168,76,0.15)",
                                }}>
                                    <h2 style={{
                                        fontFamily: "var(--serif)",
                                        fontSize: "clamp(24px, 4vw, 32px)",
                                        fontWeight: 600, color: "white",
                                        marginBottom: 16, letterSpacing: "-0.02em",
                                    }}>
                                        Ready to get the legal help you deserve?
                                    </h2>
                                    <p style={{
                                        fontSize: "14px", color: "rgba(255,255,255,0.5)",
                                        marginBottom: 28, maxWidth: 500, marginLeft: "auto", marginRight: "auto",
                                    }}>
                                        Join thousands of Indians who trust NyayMitra for clear, accessible, and verified legal guidance.
                                    </p>
                                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                                        <Link href="/legal-ai" className="btn-ink" style={{ background: "var(--gold)", color: "var(--ink)" }}>
                                            <Sparkles style={{ width: 13, height: 13 }} />
                                            Ask Legal AI
                                        </Link>
                                        <Link href="/lawyers" className="btn-ghost" style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)" }}>
                                            Find Lawyers
                                            <ChevronRight style={{ width: 12, height: 12 }} />
                                        </Link>
                                    </div>
                                </div>
                            </Reveal>

                        </div>
                    </div>
                </div>

                {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
                <footer style={{
                    background: "var(--ink)",
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                    padding: "24px 28px",
                }}>
                    <div className="footer-container" style={{
                        maxWidth: 1200, margin: "0 auto",
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        flexWrap: "wrap", gap: 12,
                    }}>
                        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
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
                            <span style={{
                                fontFamily: "var(--serif)", fontSize: "16px",
                                fontWeight: 600, color: "rgba(255,255,255,0.7)", lineHeight: 1,
                            }}>NyayMitra</span>
                        </Link>

                        <p style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em" }}>
                            © {new Date().getFullYear()} NyayMitra. All rights reserved.
                        </p>

                        <div style={{ display: "flex", gap: 4 }}>
                            {[
                                { label: "Privacy", href: "/privacy-policy" },
                                { label: "Shipping", href: "/Shipping&DeliveryPolicy" },
                                { label: "Contact", href: "/contact" },
                            ].map(({ label, href }) => (
                                <Link key={label} href={href} style={{
                                    fontFamily: "var(--sans)", fontSize: "12px",
                                    color: "rgba(255,255,255,0.3)", textDecoration: "none",
                                    padding: "4px 10px", borderRadius: 6, transition: "all 0.16s",
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