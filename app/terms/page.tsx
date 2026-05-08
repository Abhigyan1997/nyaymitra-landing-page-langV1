// app/terms/page.tsx
"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
    Scale, Shield, Users, UserCheck, Ban, RefreshCw, Mail,
    Phone, Clock, AlertCircle, ChevronRight, BookOpen,
    ArrowLeft, Sparkles, CheckCircle, Gavel, Menu, X,
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

    /* Desktop utility classes - properly hidden on mobile */
    .desktop-only {
      display: none !important;
    }

    /* Mobile menu animation */
    @keyframes mobileMenuFade {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @media (min-width: 769px) {
      .desktop-only {
        display: inline-flex !important;
      }
      .mobile-only {
        display: none !important;
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
    { href: "#general", label: "General Terms", icon: Scale },
    { href: "#lawyers", label: "Lawyer Terms", icon: Users },
    { href: "#payment", label: "Payment & Refund", icon: Gavel },
    { href: "#restrictions", label: "Restrictions", icon: Ban },
    { href: "#changes", label: "Changes to Terms", icon: RefreshCw },
    { href: "#contact", label: "Contact Us", icon: Mail },
]

const GENERAL_TERMS = [
    "You must be at least 18 years old to use this platform.",
    "You are responsible for the accuracy of your personal information, documents, and consultation details.",
    "All bookings are non-transferable and subject to lawyer availability.",
    "NyayMitra reserves the right to suspend or block accounts involved in suspicious or unethical activity.",
    "Users agree to communicate respectfully with lawyers and platform staff.",
    "Any false information or misrepresentation may lead to immediate account termination.",
]

const LAWYER_TERMS = [
    "Lawyers must provide accurate, updated, and verified information including qualifications, specialization, and license details.",
    "Lawyers agree to uphold professional standards during all consultations booked through NyayMitra.",
    "Lawyers are not employees or agents of NyayMitra. They operate as independent professionals solely responsible for the legal advice provided.",
    "Any misuse of the platform including misinformation, abuse, or no-shows may result in suspension or permanent removal.",
    "Lawyers must ensure availability and timely communication with clients who book through the platform.",
    "NyayMitra reserves the right to remove profiles that receive consistent negative feedback or breach platform terms.",
    "Lawyers must maintain client confidentiality as per legal ethics and applicable laws.",
    "Lawyers are required to respond to client queries within 24 hours on business days.",
]

const PAYMENT_TERMS = [
    "Consultation fees are displayed before booking and are non-refundable after the consultation begins.",
    "Cancellations made 24 hours before the scheduled consultation are eligible for a full refund.",
    "Technical issues from NyayMitra's side that prevent consultation will result in a full refund or rescheduling.",
    "Payment disputes must be raised within 7 days of the transaction date.",
    "All prices are in Indian Rupees (INR) and include applicable taxes.",
]

const RESTRICTIONS = [
    "Using the platform for illegal purposes or harassing lawyers or staff.",
    "Sharing offensive, abusive, or discriminatory content.",
    "Attempting to bypass payment systems or sharing account credentials.",
    "Providing false information during registration or consultation.",
    "Recording consultations without explicit consent from all parties.",
    "Using the platform to solicit business outside NyayMitra's ecosystem.",
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
        <Scale style={{ width: 9, height: 9, color: "var(--gold)" }} />
        <div style={{ width: 20, height: 1, background: "linear-gradient(90deg, var(--gold), transparent)" }} />
    </div>
)

/* ─── PAGE ───────────────────────────────────────────────────────────────────── */
export default function TermsPage() {
    const [activeSection, setActiveSection] = useState("general")
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 8)
            // Active section tracking
            const sections = ["general", "lawyers", "payment", "restrictions", "changes", "contact"]
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

    // Close mobile menu when a link is clicked
    const handleMobileLinkClick = () => {
        setMobileMenuOpen(false)
    }

    return (
        <>
            <GlobalStyles />
            <div style={{ minHeight: "100vh", background: "var(--white)" }}>

                {/* ── NAVBAR (RESPONSIVE) ───────────────────────────────────────────────────────────── */}
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
                        {/* Logo matches landing page exactly */}
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

                        {/* Desktop Navigation Links - visible on large screens */}
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <Link href="/" className="btn-ghost desktop-only" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                                    <ArrowLeft style={{ width: 13, height: 13 }} />
                                    Home
                                </Link>
                                <Link href="/lawyers" className="nav-link desktop-only" style={{ display: "inline-flex", alignItems: "center" }}>
                                    Find Lawyers
                                </Link>
                                <Link href="/legal-ai" className="btn-ink desktop-only" style={{ display: "inline-flex", alignItems: "center" }}>
                                    <Sparkles style={{ width: 13, height: 13 }} />
                                    Legal AI
                                </Link>
                            </div>

                            {/* Mobile Menu Button - visible only on small screens */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
                                className="mobile-only"
                                aria-label="Menu"
                            >
                                {mobileMenuOpen ? (
                                    <X style={{ width: 22, height: 22, color: "var(--ink)" }} />
                                ) : (
                                    <Menu style={{ width: 22, height: 22, color: "var(--ink)" }} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Dropdown - only visible when menu is open and on mobile */}
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
                        }}
                            className="mobile-only"
                        >
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
                    {/* Radial glow */}
                    <div style={{
                        position: "absolute", right: "-5%", top: "5%",
                        width: 520, height: 520, opacity: 0.03, pointerEvents: "none",
                    }}>
                        <Scale style={{ width: "100%", height: "100%", color: "var(--gold-dk)" }} />
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
                                    <Shield style={{ width: 10, height: 10, color: "var(--gold-dk)" }} />
                                </div>
                                <span style={{ fontFamily: "var(--mono)", fontSize: "9.5px", color: "var(--ink-4)", letterSpacing: "0.1em" }}>
                                    Legal Agreement
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
                                Terms &amp;<br />
                                <span className="gold-text" style={{ fontStyle: "italic", fontWeight: 300, display: "inline-block", lineHeight: 1.3 }}>
                                    Conditions.
                                </span>
                            </h1>

                            <OrnamentLine />

                            <p style={{
                                fontFamily: "var(--sans)", fontSize: "15px",
                                color: "var(--ink-4)", lineHeight: 1.85,
                                maxWidth: 480, marginBottom: 12, fontWeight: 300,
                            }}>
                                Please read these terms carefully before using the NyayMitra platform.
                            </p>

                            <div style={{
                                display: "inline-flex", alignItems: "center", gap: 7,
                                fontFamily: "var(--mono)", fontSize: "9.5px", color: "var(--ink-5)", letterSpacing: "0.1em",
                            }}>
                                <Clock style={{ width: 11, height: 11, color: "var(--gold-dk)" }} />
                                Last updated: March 2026
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
                                {/* Sidebar header */}
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

                                {/* Nav items */}
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

                                {/* Sidebar footer badge */}
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
                                        Questions about these terms? Our team is here.
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

                        {/* ── CONTENT ──────────────────────────────────────────────────────── */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>

                            {/* Introduction */}
                            <Reveal>
                                <div id="general" className="content-card" style={{ scrollMarginTop: 100 }}>
                                    <SectionHeader eyebrow="Overview" title="Introduction" icon={Scale} />

                                    <p style={{
                                        fontFamily: "var(--sans)", fontSize: "14px",
                                        color: "var(--ink-4)", lineHeight: 1.85,
                                        marginBottom: 20, fontWeight: 300,
                                    }}>
                                        Welcome to{" "}
                                        <span style={{ fontFamily: "var(--serif)", fontWeight: 600, fontSize: "16px", color: "var(--ink)" }}>NyayMitra</span>
                                        . By accessing or using our platform, you agree to comply with the following terms and conditions.
                                        NyayMitra is committed to providing a secure, transparent, and efficient legal-tech platform that
                                        connects users with verified legal professionals.
                                    </p>

                                    {/* Alert box */}
                                    <div style={{
                                        display: "flex", alignItems: "flex-start", gap: 14,
                                        padding: "16px 20px",
                                        background: "var(--ink-9)", border: "1px solid var(--ink-7)",
                                        borderRadius: "var(--radius)",
                                        borderLeft: "3px solid var(--gold)",
                                    }}>
                                        <AlertCircle style={{ width: 16, height: 16, color: "var(--gold-dk)", flexShrink: 0, marginTop: 1 }} />
                                        <p style={{ fontFamily: "var(--sans)", fontSize: "13px", color: "var(--ink-3)", lineHeight: 1.75, fontWeight: 400 }}>
                                            <span style={{ fontWeight: 700, color: "var(--ink)" }}>Important: </span>
                                            NyayMitra is a technology platform that connects users with verified lawyers. We do not provide
                                            direct legal advice or representation. All legal advice comes from independent legal professionals.
                                        </p>
                                    </div>
                                </div>
                            </Reveal>

                            {/* General Terms */}
                            <Reveal delay={40}>
                                <div id="general" className="content-card" style={{ scrollMarginTop: 100 }}>
                                    <SectionHeader eyebrow="Platform rules" title="General" italic="Terms" icon={Shield} />
                                    <BulletList items={GENERAL_TERMS} />
                                </div>
                            </Reveal>

                            {/* Lawyer Terms */}
                            <Reveal delay={60}>
                                <div id="lawyers" className="content-card" style={{ scrollMarginTop: 100 }}>
                                    <SectionHeader eyebrow="For legal professionals" title="Additional Terms for" italic="Lawyers" icon={Users} />
                                    <BulletList
                                        items={LAWYER_TERMS}
                                        dotColor="var(--green)"
                                        dotBg="#f0fdf4"
                                        dotBorder="#bbf7d0"
                                    />
                                </div>
                            </Reveal>

                            {/* Payment */}
                            <Reveal delay={80}>
                                <div id="payment" className="content-card gold-accent" style={{ scrollMarginTop: 100 }}>
                                    <SectionHeader eyebrow="Billing & refunds" title="Payment &amp;" italic="Refund Policy" icon={Gavel} />
                                    <BulletList items={PAYMENT_TERMS} />
                                </div>
                            </Reveal>

                            {/* Restrictions */}
                            <Reveal delay={60}>
                                <div id="restrictions" className="content-card" style={{ scrollMarginTop: 100 }}>
                                    <SectionHeader eyebrow="Prohibited activities" title="What's" italic="not allowed" icon={Ban} />
                                    <BulletList
                                        items={RESTRICTIONS}
                                        dotColor="var(--red)"
                                        dotBg="#fef2f2"
                                        dotBorder="#fecaca"
                                    />
                                </div>
                            </Reveal>

                            {/* Changes */}
                            <Reveal delay={60}>
                                <div id="changes" className="content-card" style={{ scrollMarginTop: 100 }}>
                                    <SectionHeader title="Changes to" italic="Terms" icon={RefreshCw} />
                                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                        {[
                                            "NyayMitra may update these terms at any time to reflect changes in laws, platform features, or business operations. We will notify users of significant changes via email or platform notification.",
                                            "Continued use of the platform after changes indicates your acceptance of the revised terms. If you do not agree with any part of these terms, please discontinue using our services.",
                                        ].map((para, i) => (
                                            <p key={i} style={{
                                                fontFamily: "var(--sans)", fontSize: "14px",
                                                color: "var(--ink-4)", lineHeight: 1.85, fontWeight: 300,
                                            }}>{para}</p>
                                        ))}
                                    </div>
                                </div>
                            </Reveal>

                            {/* Legal Disclaimer */}
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
                                                Legal Disclaimer
                                            </h3>
                                            <p style={{
                                                fontFamily: "var(--sans)", fontSize: "13.5px",
                                                color: "var(--ink-3)", lineHeight: 1.8, fontWeight: 300,
                                            }}>
                                                The information provided on NyayMitra is for general informational purposes only and does not
                                                constitute legal advice. No lawyer-client relationship is formed through the use of this platform.
                                                Always seek the advice of a qualified lawyer for your specific legal situation. NyayMitra shall not
                                                be liable for any decisions made based on information provided through the platform.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>

                            {/* Contact */}
                            <Reveal delay={60}>
                                <div id="contact" className="content-card dark-accent" style={{ overflow: "hidden", scrollMarginTop: 100, padding: 0 }}>
                                    {/* Dark header */}
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
                                                Get in touch
                                            </span>
                                            <h2 style={{
                                                fontFamily: "var(--serif)",
                                                fontSize: "clamp(22px, 3.5vw, 30px)",
                                                fontWeight: 600, color: "white",
                                                letterSpacing: "-0.02em", lineHeight: 1.2,
                                            }}>
                                                Questions about these terms?
                                            </h2>
                                            <p style={{
                                                fontFamily: "var(--sans)", fontSize: "13.5px",
                                                color: "rgba(255,255,255,0.4)", marginTop: 8, lineHeight: 1.7, fontWeight: 300,
                                            }}>
                                                If you have questions, concerns, or need clarification, please reach out to our support team.
                                            </p>
                                        </div>

                                        {/* Divider */}
                                        <div style={{
                                            display: "flex", alignItems: "center", gap: 12, marginTop: 24,
                                        }}>
                                            <div style={{ width: 32, height: 1, background: "linear-gradient(90deg, var(--gold-dk), var(--gold))" }} />
                                            <Scale style={{ width: 9, height: 9, color: "var(--gold)" }} />
                                            <div style={{ width: 16, height: 1, background: "linear-gradient(90deg, var(--gold), transparent)" }} />
                                        </div>
                                    </div>

                                    {/* Contact links */}
                                    <div className="contact-grid" style={{
                                        display: "grid", gridTemplateColumns: "1fr 1fr",
                                        gap: 12, padding: "24px 28px 28px",
                                        background: "var(--ink-2)",
                                    }}>
                                        {[
                                            {
                                                href: "mailto:support@nyaymitra.tech",
                                                icon: Mail, label: "Email",
                                                value: "support@nyaymitra.tech",
                                            },
                                            {
                                                href: "tel:+917970596183",
                                                icon: Phone, label: "Phone",
                                                value: "+91 79705 96183",
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
                    <div style={{
                        maxWidth: 1200, margin: "0 auto",
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        flexWrap: "wrap", gap: 12,
                    }}>
                        {/* Logo */}
                        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                            <div style={{
                                width: 30, height: 30, borderRadius: 8, background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(201,168,76,0.2)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                                <Scale style={{ color: "var(--gold)", width: 13, height: 13 }} />
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