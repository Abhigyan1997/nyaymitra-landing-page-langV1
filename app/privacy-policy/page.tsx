// app/privacy/page.tsx
"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
    Shield, Lock, Database, Eye, Users, CreditCard, CheckCircle,
    Server, Bell, Mail, Globe, FileText, Fingerprint, Scale,
    ArrowLeft, Sparkles, Menu, X, ChevronRight, BookOpen,
    Clock, AlertCircle, Phone
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
    @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.75)} }
    @keyframes glowPulse { 0%,100%{opacity:0.4} 50%{opacity:0.9} }
    @keyframes slideIn  { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
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

    .bullet-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      font-family: var(--sans);
      font-size: 13.5px;
      color: var(--ink-3);
      line-height: 1.8;
      padding: 10px 0;
      border-bottom: 1px solid var(--ink-8);
    }
    .bullet-item:last-child { border-bottom: none; }

    .bullet-dot {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 3px;
    }

    .contact-row {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 16px 20px;
      border: 1px solid var(--ink-7);
      border-radius: var(--radius);
      text-decoration: none;
      transition: all 0.22s cubic-bezier(0.16,1,0.3,1);
    }
    .contact-row:hover {
      border-color: var(--gold);
      background: var(--gold-pale);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(201,168,76,0.12);
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

    /* Responsive fixes */
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
      .contact-grid { grid-template-columns: 1fr !important; }
      .hero-pad { padding: 56px 20px 72px !important; }
      .main-pad { padding: 32px 20px !important; }
      .data-grid { grid-template-columns: 1fr !important; }
      .rights-grid { grid-template-columns: 1fr !important; }
      .security-badge-wrap { gap: 8px !important; }
      .footer-container { flex-direction: column; align-items: center; text-align: center; gap: 16px; }
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
    { href: "#collection", label: "Data Collection", icon: Database },
    { href: "#usage", label: "How We Use Data", icon: Eye },
    { href: "#payment", label: "Payment Security", icon: CreditCard },
    { href: "#sharing", label: "Data Sharing", icon: Users },
    { href: "#rights", label: "Your Rights", icon: CheckCircle },
    { href: "#security", label: "Security Measures", icon: Server },
    { href: "#cookies", label: "Cookies", icon: Globe },
    { href: "#updates", label: "Policy Updates", icon: Bell },
    { href: "#contact", label: "Contact Us", icon: Mail },
]

const DATA_CATEGORIES = [
    {
        title: "Personal Information",
        items: ["Full name", "Phone number", "Email address", "Date of birth"],
        icon: Users,
        dotColor: "var(--gold-dk)",
        dotBg: "var(--gold-pale)",
    },
    {
        title: "Identity Documents",
        items: ["Government ID (Aadhaar/PAN)", "Address proof", "Professional credentials (for lawyers)"],
        icon: Fingerprint,
        dotColor: "var(--gold-dk)",
        dotBg: "var(--gold-pale)",
    },
    {
        title: "Legal Data",
        items: ["Case documents", "Consultation history", "Chat transcripts", "Legal preferences"],
        icon: FileText,
        dotColor: "var(--gold-dk)",
        dotBg: "var(--gold-pale)",
    },
    {
        title: "Technical Data",
        items: ["IP address", "Device information", "Browser type", "Usage patterns"],
        icon: Globe,
        dotColor: "var(--gold-dk)",
        dotBg: "var(--gold-pale)",
    },
]

const USAGE_ITEMS = [
    "Process legal consultations and lawyer bookings",
    "Verify your identity for secure document notarization",
    "Send important updates, invoices, and confirmation emails",
    "Improve our AI assistant and service recommendations",
    "Comply with legal and regulatory requirements",
    "Prevent fraud and enhance platform security",
]

const SHARING_ITEMS = [
    "With the lawyer you book, for consultation purposes only",
    "With government agencies when required by law",
    "With our trusted service providers (hosting, email, analytics)",
    "To protect legal rights or prevent fraud",
]

const RIGHTS = [
    { title: "Access Data", desc: "View all personal information we hold about you" },
    { title: "Correct Errors", desc: "Update or fix inaccurate information" },
    { title: "Delete Data", desc: "Request permanent deletion of your data" },
    { title: "Opt-Out", desc: "Unsubscribe from marketing communications" },
    { title: "Data Portability", desc: "Export your data in a machine-readable format" },
    { title: "Withdraw Consent", desc: "Revoke previously given permissions" },
]

const SECURITY_BADGES = [
    "256-bit SSL/TLS",
    "JWT Authentication",
    "Data Encryption",
    "Secure APIs",
    "Regular Audits",
    "Access Controls",
]

/* ─── BULLET LIST ────────────────────────────────────────────────────────────── */
function BulletList({ items, dotColor = "var(--gold-dk)", dotBg = "var(--gold-pale)", dotBorder = "var(--gold)" }: {
    items: string[]; dotColor?: string; dotBg?: string; dotBorder?: string
}) {
    return (
        <div>
            {items.map((item, i) => (
                <div key={i} className="bullet-item">
                    <div className="bullet-dot" style={{ background: dotBg, border: `1px solid ${dotBorder}` }}>
                        <CheckCircle style={{ width: 9, height: 9, color: dotColor }} />
                    </div>
                    <span>{item}</span>
                </div>
            ))}
        </div>
    )
}

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
        <Shield style={{ width: 9, height: 9, color: "var(--gold)" }} />
        <div style={{ width: 20, height: 1, background: "linear-gradient(90deg, var(--gold), transparent)" }} />
    </div>
)

/* ─── DATA GRID CARD ─────────────────────────────────────────────────────────── */
function DataGridCard({ title, items, icon: Icon }: { title: string; items: string[]; icon: any }) {
    return (
        <div style={{
            padding: "20px",
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
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{
                    width: 32, height: 32, borderRadius: 8,
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
                        display: "flex", alignItems: "center", gap: 8,
                        padding: "6px 0", fontSize: "12.5px", color: "var(--ink-4)",
                        borderBottom: i < items.length - 1 ? "1px solid var(--ink-8)" : "none",
                    }}>
                        <span style={{
                            width: 4, height: 4, borderRadius: "50%",
                            background: "var(--gold)", flexShrink: 0,
                        }} />
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    )
}

/* ─── RIGHTS CARD ────────────────────────────────────────────────────────────── */
function RightsCard({ title, desc }: { title: string; desc: string }) {
    return (
        <div style={{
            padding: "18px 20px",
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
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <div style={{
                    width: 24, height: 24, borderRadius: "50%",
                    background: "var(--gold-pale)", border: "1px solid var(--gold)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--gold-dk)",
                }}>
                    <CheckCircle style={{ width: 11, height: 11 }} />
                </div>
                <h4 style={{
                    fontFamily: "var(--serif)", fontSize: "15px",
                    fontWeight: 600, color: "var(--ink)", margin: 0,
                }}>{title}</h4>
            </div>
            <p style={{
                fontSize: "12px", color: "var(--ink-4)", lineHeight: 1.65,
                margin: 0, paddingLeft: 34,
            }}>{desc}</p>
        </div>
    )
}

/* ─── PAGE ───────────────────────────────────────────────────────────────────── */
export default function PrivacyPage() {
    const [activeSection, setActiveSection] = useState("collection")
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 8)
            const sections = ["collection", "usage", "payment", "sharing", "rights", "security", "cookies", "updates", "contact"]
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

                        {/* Desktop Navigation - visible on large screens */}
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

                        {/* Mobile Menu Button - visible only on mobile */}
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

                    {/* Mobile Menu Dropdown - visible only when open on mobile */}
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
                    {/* Background grid */}
                    <div style={{
                        position: "absolute", inset: 0,
                        backgroundImage: "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)",
                        backgroundSize: "80px 80px", pointerEvents: "none",
                    }} />
                    <div style={{
                        position: "absolute", right: "-5%", top: "5%",
                        width: 520, height: 520, opacity: 0.03, pointerEvents: "none",
                    }}>
                        <Shield style={{ width: "100%", height: "100%", color: "var(--gold-dk)" }} />
                    </div>
                    <div style={{
                        position: "absolute", inset: 0,
                        background: "radial-gradient(ellipse 70% 60% at 80% 20%, rgba(201,168,76,0.05) 0%, transparent 60%)",
                        pointerEvents: "none",
                    }} />

                    <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
                        <div style={{ animation: "fadeUp 0.72s cubic-bezier(0.16,1,0.3,1) both" }}>

                            {/* Badge */}
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
                                    <Lock style={{ width: 10, height: 10, color: "var(--gold-dk)" }} />
                                </div>
                                <span style={{ fontFamily: "var(--mono)", fontSize: "9.5px", color: "var(--ink-4)", letterSpacing: "0.1em" }}>
                                    Privacy Promise
                                </span>
                            </div>

                            {/* Headline */}
                            <h1 className="hero-title" style={{
                                fontFamily: "var(--serif)",
                                fontSize: "clamp(44px, 7vw, 80px)",
                                fontWeight: 600, lineHeight: 1.08,
                                letterSpacing: "-0.03em",
                                color: "var(--ink)", marginBottom: 0,
                            }}>
                                Your privacy,<br />
                                <span className="gold-text" style={{ fontStyle: "italic", fontWeight: 300, display: "inline-block", lineHeight: 1.3 }}>
                                    our promise.
                                </span>
                            </h1>

                            <OrnamentLine />

                            <p style={{
                                fontFamily: "var(--sans)", fontSize: "15px",
                                color: "var(--ink-4)", lineHeight: 1.85,
                                maxWidth: 480, marginBottom: 12, fontWeight: 300,
                            }}>
                                How we protect, use, and safeguard your personal information across all NyayMitra services.
                            </p>

                            <div style={{
                                display: "inline-flex", alignItems: "center", gap: 7,
                                fontFamily: "var(--mono)", fontSize: "9.5px", color: "var(--ink-5)", letterSpacing: "0.1em",
                            }}>
                                <Clock style={{ width: 11, height: 11, color: "var(--gold-dk)" }} />
                                Effective from: June 2025
                            </div>
                        </div>
                    </div>
                </section>

                <div style={{ height: 1, background: "var(--ink-7)" }} />

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
                                            Your Data is Safe
                                        </span>
                                    </div>
                                    <p style={{ fontFamily: "var(--sans)", fontSize: "11px", color: "var(--ink-4)", lineHeight: 1.6, fontWeight: 300 }}>
                                        Industry-standard encryption protects your information.
                                    </p>
                                </div>
                            </div>
                        </aside>

                        {/* ── CONTENT ──────────────────────────────────────────────────────── */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>

                            {/* Introduction */}
                            <Reveal>
                                <div id="collection" className="content-card" style={{ scrollMarginTop: 100 }}>
                                    <SectionHeader eyebrow="Overview" title="Our Commitment to" italic="Privacy" icon={Shield} />

                                    <p style={{
                                        fontFamily: "var(--sans)", fontSize: "14px",
                                        color: "var(--ink-4)", lineHeight: 1.85,
                                        marginBottom: 20, fontWeight: 300,
                                    }}>
                                        At <span style={{ fontFamily: "var(--serif)", fontWeight: 600, fontSize: "16px", color: "var(--ink)" }}>NyayMitra</span>
                                        , your privacy is our highest priority. We are committed to protecting your personal information
                                        and maintaining transparency about how we collect, use, and safeguard your data.
                                    </p>

                                    <div style={{
                                        display: "flex", alignItems: "flex-start", gap: 14,
                                        padding: "16px 20px",
                                        background: "var(--ink-9)", border: "1px solid var(--ink-7)",
                                        borderRadius: "var(--radius)",
                                        borderLeft: "3px solid var(--gold)",
                                    }}>
                                        <AlertCircle style={{ width: 16, height: 16, color: "var(--gold-dk)", flexShrink: 0, marginTop: 1 }} />
                                        <p style={{ fontFamily: "var(--sans)", fontSize: "13px", color: "var(--ink-3)", lineHeight: 1.75, fontWeight: 400 }}>
                                            <span style={{ fontWeight: 700, color: "var(--ink)" }}>This Privacy Policy applies to: </span>
                                            All services offered by NyayMitra, including our website, mobile app, and legal consultation platform.
                                        </p>
                                    </div>
                                </div>
                            </Reveal>

                            {/* Data Collection */}
                            <Reveal delay={40}>
                                <div id="collection" className="content-card" style={{ scrollMarginTop: 100 }}>
                                    <SectionHeader eyebrow="What we collect" title="Information We" italic="Collect" icon={Database} />
                                    <div className="data-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
                                        {DATA_CATEGORIES.map((cat, i) => (
                                            <DataGridCard key={i} title={cat.title} items={cat.items} icon={cat.icon} />
                                        ))}
                                    </div>
                                </div>
                            </Reveal>

                            {/* How We Use Data */}
                            <Reveal delay={60}>
                                <div id="usage" className="content-card" style={{ scrollMarginTop: 100 }}>
                                    <SectionHeader eyebrow="Purpose" title="How We Use Your" italic="Information" icon={Eye} />
                                    <BulletList items={USAGE_ITEMS} />
                                </div>
                            </Reveal>

                            {/* Payment Security */}
                            <Reveal delay={80}>
                                <div id="payment" className="content-card gold-accent" style={{ scrollMarginTop: 100 }}>
                                    <SectionHeader eyebrow="Secure transactions" title="Payment" italic="Security" icon={CreditCard} />
                                    <blockquote style={{
                                        borderLeft: "3px solid var(--gold)",
                                        paddingLeft: 20, margin: "0 0 20px 0",
                                        fontStyle: "italic", color: "var(--ink-3)",
                                    }}>
                                        <p style={{ fontSize: "14px", lineHeight: 1.7 }}>
                                            All payments on NyayMitra are processed through <strong>Razorpay</strong>, a PCI-DSS compliant payment gateway.
                                            We <strong>never</strong> store your credit/debit card details, CVV, or sensitive financial information on our servers.
                                        </p>
                                    </blockquote>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16 }}>
                                        <div style={{
                                            width: 32, height: 32, borderRadius: 8,
                                            background: "var(--ink-9)", border: "1px solid var(--ink-7)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            color: "var(--gold-dk)",
                                        }}>
                                            <Lock style={{ width: 14, height: 14 }} />
                                        </div>
                                        <span style={{ fontSize: "13px", color: "var(--ink-4)" }}>256-bit SSL encryption for all transactions</span>
                                    </div>
                                </div>
                            </Reveal>

                            {/* Data Sharing */}
                            <Reveal delay={60}>
                                <div id="sharing" className="content-card" style={{ scrollMarginTop: 100 }}>
                                    <SectionHeader eyebrow="Limited disclosure" title="Data Sharing &amp;" italic="Disclosure" icon={Users} />
                                    <p style={{
                                        fontSize: "14px", color: "var(--ink-4)", marginBottom: 20,
                                        lineHeight: 1.7,
                                    }}>
                                        We respect your privacy and do <strong style={{ color: "var(--ink)" }}>not</strong> sell or rent your personal data.
                                        Your information is shared only:
                                    </p>
                                    <BulletList items={SHARING_ITEMS} />
                                </div>
                            </Reveal>

                            {/* Your Rights */}
                            <Reveal delay={60}>
                                <div id="rights" className="content-card" style={{ scrollMarginTop: 100 }}>
                                    <SectionHeader eyebrow="Control your data" title="Your Privacy" italic="Rights" icon={CheckCircle} />
                                    <div className="rights-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
                                        {RIGHTS.map((right, i) => (
                                            <RightsCard key={i} title={right.title} desc={right.desc} />
                                        ))}
                                    </div>
                                </div>
                            </Reveal>

                            {/* Security Measures */}
                            <Reveal delay={60}>
                                <div id="security" className="content-card" style={{ scrollMarginTop: 100 }}>
                                    <SectionHeader eyebrow="Protection" title="Security" italic="Measures" icon={Server} />
                                    <div className="security-badge-wrap" style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
                                        {SECURITY_BADGES.map((badge, i) => (
                                            <span key={i} style={{
                                                fontFamily: "var(--mono)", fontSize: "10px",
                                                padding: "6px 14px", borderRadius: 20,
                                                background: "var(--ink-9)", border: "1px solid var(--ink-7)",
                                                color: "var(--ink-3)", fontWeight: 500,
                                            }}>
                                                {badge}
                                            </span>
                                        ))}
                                    </div>
                                    <p style={{
                                        fontSize: "13.5px", color: "var(--ink-4)", lineHeight: 1.8,
                                    }}>
                                        We follow industry-standard security practices and regularly update our systems to protect against
                                        unauthorized access, data breaches, and cyber threats.
                                    </p>
                                </div>
                            </Reveal>

                            {/* Cookies */}
                            <Reveal delay={60}>
                                <div id="cookies" className="content-card" style={{ scrollMarginTop: 100 }}>
                                    <SectionHeader eyebrow="Tracking" title="Cookies &amp;" italic="Tracking" icon={Globe} />
                                    <p style={{
                                        fontSize: "14px", color: "var(--ink-4)", lineHeight: 1.8,
                                    }}>
                                        We use cookies to enhance your browsing experience, analyze platform usage, and personalize content.
                                        You can control cookie preferences through your browser settings at any time.
                                    </p>
                                </div>
                            </Reveal>

                            {/* Policy Updates */}
                            <Reveal delay={60}>
                                <div id="updates" className="content-card" style={{ scrollMarginTop: 100 }}>
                                    <SectionHeader eyebrow="Changes" title="Updates to This" italic="Policy" icon={Bell} />
                                    <p style={{
                                        fontSize: "14px", color: "var(--ink-4)", lineHeight: 1.8, marginBottom: 20,
                                    }}>
                                        We may update this Privacy Policy to reflect changes in our practices or legal requirements.
                                        Significant changes will be notified via email or platform notification. We encourage you to review this page periodically.
                                    </p>
                                    <div style={{
                                        paddingTop: 16, borderTop: "1px solid var(--ink-7)",
                                        fontSize: "12px", color: "var(--ink-5)",
                                    }}>
                                        Last reviewed: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                                    </div>
                                </div>
                            </Reveal>

                            {/* Consent Notice */}
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
                                            <Shield style={{ width: 18, height: 18, color: "var(--gold-dk)" }} />
                                        </div>
                                        <div>
                                            <h3 style={{
                                                fontFamily: "var(--serif)", fontSize: "20px",
                                                fontWeight: 600, color: "var(--ink)", marginBottom: 10, letterSpacing: "-0.01em",
                                            }}>
                                                Your Consent
                                            </h3>
                                            <p style={{
                                                fontFamily: "var(--sans)", fontSize: "13.5px",
                                                color: "var(--ink-3)", lineHeight: 1.8, fontWeight: 300,
                                            }}>
                                                By using NyayMitra, you consent to the collection, use, and sharing of your information as described in this Privacy Policy.
                                                If you do not agree with any part of this policy, please discontinue using our services.
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
                                                Privacy Questions?
                                            </span>
                                            <h2 style={{
                                                fontFamily: "var(--serif)",
                                                fontSize: "clamp(22px, 3.5vw, 30px)",
                                                fontWeight: 600, color: "white",
                                                letterSpacing: "-0.02em", lineHeight: 1.2,
                                            }}>
                                                Have questions about your data?
                                            </h2>
                                            <p style={{
                                                fontFamily: "var(--sans)", fontSize: "13.5px",
                                                color: "rgba(255,255,255,0.4)", marginTop: 8, lineHeight: 1.7, fontWeight: 300,
                                            }}>
                                                If you have questions about this Privacy Policy or want to exercise your data rights, our privacy team is here to help.
                                            </p>
                                        </div>

                                        <div style={{
                                            display: "flex", alignItems: "center", gap: 12, marginTop: 24,
                                        }}>
                                            <div style={{ width: 32, height: 1, background: "linear-gradient(90deg, var(--gold-dk), var(--gold))" }} />
                                            <Shield style={{ width: 9, height: 9, color: "var(--gold)" }} />
                                            <div style={{ width: 16, height: 1, background: "linear-gradient(90deg, var(--gold), transparent)" }} />
                                        </div>
                                    </div>

                                    <div className="contact-grid" style={{
                                        display: "grid", gridTemplateColumns: "1fr 1fr",
                                        gap: 12, padding: "24px 28px 28px",
                                        background: "var(--ink-2)",
                                    }}>
                                        {[
                                            {
                                                href: "mailto:privacy@mynyaymitra.in",
                                                icon: Mail, label: "Email",
                                                value: "privacy@mynyaymitra.in",
                                            },
                                            {
                                                href: "mailto:support@mynyaymitra.in",
                                                icon: Mail, label: "Support",
                                                value: "support@mynyaymitra.in",
                                            },
                                        ].map(({ href, icon: Icon, label, value }) => (
                                            <a key={href} href={href} className="contact-row" style={{
                                                background: "rgba(255,255,255,0.04)",
                                                borderColor: "rgba(255,255,255,0.08)",
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
                                                    <Icon style={{ width: 14, height: 14 }} />
                                                </div>
                                                <div>
                                                    <p style={{
                                                        fontFamily: "var(--mono)", fontSize: "8px", fontWeight: 500,
                                                        letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)",
                                                        marginBottom: 3,
                                                    }}>{label}</p>
                                                    <p style={{
                                                        fontFamily: "var(--sans)", fontSize: "13px",
                                                        color: "rgba(255,255,255,0.65)", fontWeight: 400,
                                                    }}>{value}</p>
                                                </div>
                                            </a>
                                        ))}
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
                                            We typically respond to privacy inquiries within 48 hours.
                                        </p>
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
                                width: 30, height: 30, borderRadius: 8, background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(201,168,76,0.2)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                                <Shield style={{ color: "var(--gold)", width: 13, height: 13 }} />
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
                                { label: "Privacy", href: "/privacy" },
                                { label: "Terms", href: "/terms" },
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