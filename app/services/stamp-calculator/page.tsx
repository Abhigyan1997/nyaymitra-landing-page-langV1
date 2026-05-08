// app/services/stamp-calculator/page.tsx
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
    Calculator, FileText, Scale, ArrowRight, Info, MapPin, Mail, Phone,
    X, Menu, BookText, Home, Check, Sparkles, Shield
} from "lucide-react"
import Link from "next/link"

/* ─── Global Styles ─────────────────────────────────────────────────────────── */
const GlobalStyles = () => (
    <style suppressHydrationWarning>{`
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
      --serif:      'Cormorant Garamond', Georgia, serif;
      --sans:       'Outfit', system-ui, sans-serif;
      --mono:       'DM Mono', monospace;
      --radius:     8px;
      --radius-lg:  14px;
      --radius-xl:  20px;
    }

    body {
      background: var(--white);
      color: var(--ink);
      font-family: var(--sans);
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes shimmer {
      0% { background-position: -300% center; }
      100% { background-position: 300% center; }
    }
    @keyframes mobileMenuFade {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

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

    .desktop-nav-links { display: flex; align-items: center; gap: 8px; }

    .mobile-menu-btn { display: flex; align-items: center; justify-content: center; }
    .mobile-menu-dropdown { display: none; }

    @media (max-width: 768px) {
      .desktop-nav-links { display: none !important; }
      .mobile-menu-btn { display: flex !important; }
      .mobile-menu-dropdown.mobile-open { display: block; }
    }
    @media (min-width: 769px) {
      .mobile-menu-btn { display: none !important; }
      .mobile-menu-dropdown { display: none !important; }
    }

    .mobile-nav-link {
      font-family: var(--sans); font-size: 16px; font-weight: 500;
      color: var(--ink-3); text-decoration: none; padding: 12px 0;
      width: 100%; transition: all 0.16s;
      border-bottom: 1px solid var(--ink-8);
      display: flex; align-items: center; gap: 12px;
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
      padding: 11px 24px; border-radius: var(--radius); border: none;
      text-decoration: none; cursor: pointer;
      transition: all 0.22s cubic-bezier(0.16,1,0.3,1);
    }
    .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(201,168,76,0.4); }

    .form-select, .form-input {
      width: 100%;
      background: var(--white);
      border: 1.5px solid var(--ink-7);
      border-radius: var(--radius);
      padding: 11px 14px;
      font-family: var(--sans);
      font-size: 13.5px;
      color: var(--ink);
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
      appearance: none;
      -webkit-appearance: none;
    }
    .form-select:focus, .form-input:focus {
      border-color: var(--gold);
      box-shadow: 0 0 0 3px rgba(201,168,76,0.12);
    }
    .form-select option { background: var(--white); color: var(--ink); }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--ink-9); }
    ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }
    ::selection { background: var(--gold-pale); color: var(--gold-dk); }

    @media (max-width: 768px) {
      .calc-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
      .hero-pad { padding: 56px 20px 72px !important; }
      .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
      .cta-inner { padding: 40px 24px !important; }
      .cta-btns { flex-direction: column !important; align-items: center !important; }
    }
  `}</style>
)

/* ─── Ornament Line ──────────────────────────────────────────────────────── */
const OrnamentLine = () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "22px 0" }}>
        <div style={{ width: 44, height: 1, background: "linear-gradient(90deg, var(--gold-dk), var(--gold))" }} />
        <Scale style={{ width: 9, height: 9, color: "var(--gold)" }} />
        <div style={{ width: 24, height: 1, background: "linear-gradient(90deg, var(--gold), transparent)" }} />
    </div>
)

export default function StampCalculatorPage() {
    const [state, setState] = useState<string>("Maharashtra")
    const [documentType, setDocumentType] = useState<string>("Rent Agreement")
    const [propertyValue, setPropertyValue] = useState<number>(10000)
    const [duration, setDuration] = useState<number>(11)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    const handleMobileLinkClick = () => setMobileMenuOpen(false)

    const states = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
        "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
        "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
        "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
        "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
        "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
    ]

    const documentTypes = [
        "Rent Agreement", "Affidavit", "Power of Attorney", "Sale Agreement",
        "Gift Deed", "Partnership Deed", "Will", "Lease Agreement",
        "Mortgage Deed", "Business Agreement", "Employment Contract", "Adoption Deed"
    ]

    const stampDutyRates: {
        [state: string]: { [docType: string]: number | ((value: number, duration?: number) => number) }
    } = {
        "Maharashtra": {
            "Rent Agreement": (value, duration = 11) => Math.max(100, value * duration * 0.0025),
            "Sale Agreement": (value) => value * 0.05,
            "Gift Deed": (value) => value * 0.03,
            "Affidavit": 100, "Power of Attorney": (value) => value * 0.05,
            "Partnership Deed": 2000, "Will": 200,
            "Lease Agreement": (value) => value * 0.025,
            "Mortgage Deed": (value) => value * 0.03,
            "Business Agreement": 1500, "Employment Contract": 100, "Adoption Deed": 500,
        },
        "Delhi": {
            "Rent Agreement": (value, duration = 11) => value * duration * 0.02,
            "Sale Agreement": (value) => value * 0.04,
            "Gift Deed": (value) => value * 0.02,
            "Affidavit": 50, "Power of Attorney": 200,
            "Partnership Deed": 1000, "Will": 100,
            "Lease Agreement": (value) => value * 0.03,
            "Mortgage Deed": (value) => value * 0.02,
            "Business Agreement": 1000, "Employment Contract": 50, "Adoption Deed": 300,
        },
        "Karnataka": {
            "Rent Agreement": (value, duration = 11) => Math.max(200, value * duration * 0.01),
            "Sale Agreement": (value) => value * 0.05,
            "Gift Deed": (value) => value * 0.02,
            "Affidavit": 20, "Power of Attorney": 100,
            "Partnership Deed": 1500, "Will": 100,
            "Lease Agreement": (value) => value * 0.02,
            "Mortgage Deed": (value) => value * 0.03,
            "Business Agreement": 1000, "Employment Contract": 50, "Adoption Deed": 300,
        },
        "Uttar Pradesh": {
            "Rent Agreement": (value, duration = 11) => value * duration * 0.01,
            "Sale Agreement": (value) => value * 0.07,
            "Gift Deed": (value) => value * 0.05,
            "Affidavit": 50, "Power of Attorney": 200,
            "Partnership Deed": 1000, "Will": 150,
            "Lease Agreement": (value) => value * 0.03,
            "Mortgage Deed": (value) => value * 0.05,
            "Business Agreement": 1000, "Employment Contract": 100, "Adoption Deed": 400,
        },
        "Tamil Nadu": {
            "Rent Agreement": (value, duration = 11) => value * duration * 0.01,
            "Sale Agreement": (value) => value * 0.07,
            "Gift Deed": (value) => value * 0.04,
            "Affidavit": 20, "Power of Attorney": 100,
            "Partnership Deed": 1500, "Will": 100,
            "Lease Agreement": (value) => value * 0.02,
            "Mortgage Deed": (value) => value * 0.04,
            "Business Agreement": 800, "Employment Contract": 100, "Adoption Deed": 300,
        },
        "Gujarat": {
            "Rent Agreement": (value, duration = 11) => value * duration * 0.005,
            "Sale Agreement": (value) => value * 0.045,
            "Gift Deed": (value) => value * 0.025,
            "Affidavit": 100, "Power of Attorney": 300,
            "Partnership Deed": 1200, "Will": 100,
            "Lease Agreement": (value) => value * 0.02,
            "Mortgage Deed": (value) => value * 0.035,
            "Business Agreement": 1200, "Employment Contract": 100, "Adoption Deed": 250,
        },
        "West Bengal": {
            "Rent Agreement": (value, duration = 11) => value * duration * 0.005,
            "Sale Agreement": (value) => value * 0.06,
            "Gift Deed": (value) => value * 0.05,
            "Affidavit": 50, "Power of Attorney": 300,
            "Partnership Deed": 1000, "Will": 100,
            "Lease Agreement": (value) => value * 0.025,
            "Mortgage Deed": (value) => value * 0.03,
            "Business Agreement": 1000, "Employment Contract": 100, "Adoption Deed": 300,
        },
        "Rajasthan": {
            "Rent Agreement": (value, duration = 11) => value * duration * 0.01,
            "Sale Agreement": (value) => value * 0.06,
            "Gift Deed": (value) => value * 0.04,
            "Affidavit": 100, "Power of Attorney": 300,
            "Partnership Deed": 1200, "Will": 100,
            "Lease Agreement": (value) => value * 0.02,
            "Mortgage Deed": (value) => value * 0.04,
            "Business Agreement": 1000, "Employment Contract": 100, "Adoption Deed": 350,
        },
        "Telangana": {
            "Rent Agreement": (value, duration = 11) => value * duration * 0.005,
            "Sale Agreement": (value) => value * 0.06,
            "Gift Deed": (value) => value * 0.04,
            "Affidavit": 100, "Power of Attorney": 300,
            "Partnership Deed": 1200, "Will": 150,
            "Lease Agreement": (value) => value * 0.02,
            "Mortgage Deed": (value) => value * 0.04,
            "Business Agreement": 1200, "Employment Contract": 80, "Adoption Deed": 300,
        },
        "Madhya Pradesh": {
            "Rent Agreement": (value, duration = 11) => value * duration * 0.01,
            "Sale Agreement": (value) => value * 0.05,
            "Gift Deed": (value) => value * 0.03,
            "Affidavit": 100, "Power of Attorney": 200,
            "Partnership Deed": 1500, "Will": 100,
            "Lease Agreement": (value) => value * 0.02,
            "Mortgage Deed": (value) => value * 0.035,
            "Business Agreement": 1200, "Employment Contract": 100, "Adoption Deed": 300,
        },
        ...Object.fromEntries(
            [
                "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Andaman and Nicobar Islands",
                "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu",
                "Goa", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Kerala",
                "Ladakh", "Lakshadweep", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
                "Puducherry", "Punjab", "Sikkim", "Tripura", "Uttarakhand"
            ].map(s => [s, {
                "Rent Agreement": (value: number, duration = 11) => value * duration * 0.01,
                "Sale Agreement": (value: number) => value * 0.05,
                "Gift Deed": (value: number) => value * 0.03,
                "Affidavit": 50, "Power of Attorney": 100,
                "Partnership Deed": 1000, "Will": 100,
                "Lease Agreement": (value: number) => value * 0.02,
                "Mortgage Deed": (value: number) => value * 0.03,
                "Business Agreement": 1000, "Employment Contract": 50, "Adoption Deed": 300
            }])
        )
    }

    const calculateStampDuty = () => {
        const stateRates = stampDutyRates[state]
        if (!stateRates) return 0
        const rate = stateRates[documentType]
        if (typeof rate === "function") return rate(propertyValue, duration)
        if (typeof rate === "number") return rate
        return 0
    }

    const stampDuty = calculateStampDuty()

    const needsPropertyValue = ["Sale Agreement", "Gift Deed", "Lease Agreement", "Mortgage Deed", "Power of Attorney"].includes(documentType)
    const isRentAgreement = documentType === "Rent Agreement"

    return (
        <>
            <GlobalStyles />
            <div className="min-h-screen" style={{ background: "var(--white)" }}>

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

                        <div className="desktop-nav-links">
                            <Link href="/" className="btn-ghost">Home</Link>
                            <Link href="/services" className="nav-link">Services</Link>
                            <Link href="/lawyers" className="nav-link">Find Lawyers</Link>
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
                                padding: "8px", borderRadius: "8px", transition: "all 0.2s",
                            }}
                            aria-label="Menu"
                        >
                            {mobileMenuOpen
                                ? <X style={{ width: 22, height: 22, color: "var(--ink)" }} />
                                : <Menu style={{ width: 22, height: 22, color: "var(--ink)" }} />
                            }
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    <div className={`mobile-menu-dropdown ${mobileMenuOpen ? "mobile-open" : ""}`} style={{
                        position: "absolute", top: 66, left: 0, right: 0,
                        background: "var(--white)", borderBottom: "1px solid var(--ink-7)",
                        boxShadow: "0 4px 24px rgba(12,11,9,0.08)", padding: "20px",
                        animation: mobileMenuOpen ? "mobileMenuFade 0.3s ease-out" : "none", zIndex: 99,
                    }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            <Link href="/" className="mobile-nav-link" onClick={handleMobileLinkClick} style={{ borderTop: "none" }}>
                                <Home style={{ width: 18, height: 18, color: "var(--gold-dk)" }} /> Home
                            </Link>
                            <Link href="/services" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                                <BookText style={{ width: 18, height: 18, color: "var(--gold-dk)" }} /> Services
                            </Link>
                            <Link href="/lawyers" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                                <Shield style={{ width: 18, height: 18, color: "var(--gold-dk)" }} /> Find Lawyers
                            </Link>
                            <Link href="/legal-ai" className="mobile-nav-link" onClick={handleMobileLinkClick} style={{ borderBottom: "none" }}>
                                <Sparkles style={{ width: 18, height: 18, color: "var(--gold-dk)" }} /> Legal AI
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* ── HERO SECTION ─────────────────────────────────────────────────────── */}
                <section className="hero-pad" style={{
                    padding: "80px 28px 100px",
                    position: "relative", overflow: "hidden",
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
                        <Calculator style={{ width: "100%", height: "100%", color: "var(--gold-dk)" }} />
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
                                    <Calculator style={{ width: 10, height: 10, color: "var(--gold-dk)" }} />
                                </div>
                                <span style={{ fontFamily: "var(--mono)", fontSize: "9.5px", color: "var(--ink-4)", letterSpacing: "0.1em" }}>
                                    Legal Utility Tool
                                </span>
                            </div>

                            <h1 style={{
                                fontFamily: "var(--serif)",
                                fontSize: "clamp(44px, 7vw, 80px)",
                                fontWeight: 600, lineHeight: 1.08,
                                letterSpacing: "-0.03em",
                                color: "var(--ink)", marginBottom: 0,
                            }}>
                                Stamp Duty<br />
                                <span className="gold-text" style={{ fontStyle: "italic", fontWeight: 300, display: "inline-block", lineHeight: 1.3 }}>
                                    Calculator.
                                </span>
                            </h1>

                            <OrnamentLine />

                            <p style={{
                                fontFamily: "var(--sans)", fontSize: "15.5px",
                                color: "var(--ink-4)", lineHeight: 1.85,
                                maxWidth: 500, fontWeight: 300,
                            }}>
                                Calculate the exact stamp paper value required for your documents based on Indian state laws.
                            </p>
                        </div>
                    </div>
                </section>

                <div style={{ height: 1, background: "var(--ink-7)" }} />

                {/* ── CALCULATOR SECTION ───────────────────────────────────────────────── */}
                <section style={{ padding: "80px 28px", position: "relative", zIndex: 10 }}>
                    <div style={{ maxWidth: 900, margin: "0 auto" }}>
                        <div style={{ textAlign: "center", marginBottom: 56 }}>
                            <span className="eyebrow">Calculator</span>
                            <h2 style={{
                                fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 42px)",
                                fontWeight: 600, color: "var(--ink)", marginTop: 16,
                            }}>
                                Enter your <span className="gold-text">document details</span>
                            </h2>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            style={{
                                background: "var(--white)",
                                border: "1px solid var(--gold)",
                                borderRadius: "var(--radius-xl)",
                                overflow: "hidden",
                                position: "relative",
                            }}
                        >
                            {/* Gold top bar */}
                            <div style={{
                                position: "absolute", top: 0, left: 0, right: 0,
                                height: 4, background: "linear-gradient(90deg, var(--gold-dk), var(--gold), var(--gold-lt))",
                            }} />

                            <div style={{ padding: "40px 36px 36px" }}>

                                {/* Form grid */}
                                <div className="calc-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>

                                    {/* State */}
                                    <div>
                                        <label style={{
                                            display: "block", fontSize: "11px", fontFamily: "var(--mono)",
                                            color: "var(--gold-dk)", textTransform: "uppercase",
                                            letterSpacing: "0.1em", marginBottom: 8,
                                        }}>Select State</label>
                                        <div style={{ position: "relative" }}>
                                            <select
                                                value={state}
                                                onChange={(e) => setState(e.target.value)}
                                                className="form-select"
                                            >
                                                {states.map((s) => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                            <div style={{
                                                position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                                                pointerEvents: "none", color: "var(--ink-5)",
                                            }}>
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Document Type */}
                                    <div>
                                        <label style={{
                                            display: "block", fontSize: "11px", fontFamily: "var(--mono)",
                                            color: "var(--gold-dk)", textTransform: "uppercase",
                                            letterSpacing: "0.1em", marginBottom: 8,
                                        }}>Document Type</label>
                                        <div style={{ position: "relative" }}>
                                            <select
                                                value={documentType}
                                                onChange={(e) => setDocumentType(e.target.value)}
                                                className="form-select"
                                            >
                                                {documentTypes.map((type) => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                            <div style={{
                                                position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                                                pointerEvents: "none", color: "var(--ink-5)",
                                            }}>
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Rent Agreement fields */}
                                    {isRentAgreement && (
                                        <>
                                            <div>
                                                <label style={{
                                                    display: "block", fontSize: "11px", fontFamily: "var(--mono)",
                                                    color: "var(--gold-dk)", textTransform: "uppercase",
                                                    letterSpacing: "0.1em", marginBottom: 8,
                                                }}>Monthly Rent (₹)</label>
                                                <input
                                                    type="number"
                                                    value={propertyValue}
                                                    onChange={(e) => setPropertyValue(Number(e.target.value))}
                                                    className="form-input"
                                                />
                                            </div>
                                            <div>
                                                <label style={{
                                                    display: "block", fontSize: "11px", fontFamily: "var(--mono)",
                                                    color: "var(--gold-dk)", textTransform: "uppercase",
                                                    letterSpacing: "0.1em", marginBottom: 8,
                                                }}>Duration (months)</label>
                                                <input
                                                    type="number"
                                                    value={duration}
                                                    onChange={(e) => setDuration(Number(e.target.value))}
                                                    className="form-input"
                                                />
                                            </div>
                                        </>
                                    )}

                                    {/* Sale / Gift / other value-based fields */}
                                    {needsPropertyValue && !isRentAgreement && (
                                        <div style={{ gridColumn: "1 / -1" }}>
                                            <label style={{
                                                display: "block", fontSize: "11px", fontFamily: "var(--mono)",
                                                color: "var(--gold-dk)", textTransform: "uppercase",
                                                letterSpacing: "0.1em", marginBottom: 8,
                                            }}>Property / Transaction Value (₹)</label>
                                            <input
                                                type="number"
                                                value={propertyValue}
                                                onChange={(e) => setPropertyValue(Number(e.target.value))}
                                                className="form-input"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* ── RESULT BOX ── */}
                                <motion.div
                                    key={`${state}-${documentType}-${propertyValue}-${duration}`}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        background: "var(--gold-pale)",
                                        border: "1px solid var(--gold)",
                                        borderRadius: "var(--radius-lg)",
                                        padding: "28px 32px",
                                        marginBottom: 28,
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                        gap: 20,
                                    }}
                                >
                                    <div>
                                        <div style={{
                                            fontSize: "10px", fontFamily: "var(--mono)", color: "var(--gold-dk)",
                                            textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 6,
                                        }}>
                                            Estimated Stamp Duty
                                        </div>
                                        <div style={{
                                            fontFamily: "var(--sans)", fontSize: "13px",
                                            color: "var(--ink-4)", lineHeight: 1.5,
                                        }}>
                                            For <strong style={{ color: "var(--ink-3)" }}>{documentType}</strong> in <strong style={{ color: "var(--ink-3)" }}>{state}</strong>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: "right" }}>
                                        <div style={{
                                            fontFamily: "var(--serif)", fontSize: "clamp(32px, 5vw, 48px)",
                                            fontWeight: 600, lineHeight: 1,
                                        }}>
                                            <span className="gold-text">₹{stampDuty.toFixed(2)}</span>
                                        </div>
                                        <div style={{
                                            fontSize: "10px", fontFamily: "var(--mono)",
                                            color: "var(--ink-5)", marginTop: 6,
                                        }}>
                                            * Approximate calculation
                                        </div>
                                    </div>
                                </motion.div>

                                {/* ── IMPORTANT NOTES ── */}
                                <div style={{
                                    background: "var(--ink-9)",
                                    border: "1px solid var(--ink-7)",
                                    borderRadius: "var(--radius-lg)",
                                    padding: "20px 24px",
                                    display: "flex",
                                    gap: 14,
                                    alignItems: "flex-start",
                                }}>
                                    <div style={{
                                        width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                                        background: "var(--gold-pale)", border: "1px solid var(--gold)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        marginTop: 2,
                                    }}>
                                        <Info style={{ width: 12, height: 12, color: "var(--gold-dk)" }} />
                                    </div>
                                    <div>
                                        <div style={{
                                            fontSize: "11px", fontFamily: "var(--mono)", color: "var(--gold-dk)",
                                            textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10,
                                        }}>Important Notes</div>
                                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                            {[
                                                "Stamp duty rates vary by state and document type",
                                                "For agreements over ₹50,000, registration may be required",
                                                "Some states offer e-stamping for convenience",
                                                "Always verify with local authorities before payment",
                                            ].map((note, i) => (
                                                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                                                    <div style={{
                                                        width: 16, height: 16, borderRadius: "50%", flexShrink: 0, marginTop: 1,
                                                        background: "var(--gold-pale)", border: "1px solid var(--gold)",
                                                        display: "flex", alignItems: "center", justifyContent: "center",
                                                    }}>
                                                        <Check style={{ width: 7, height: 7, color: "var(--gold-dk)" }} />
                                                    </div>
                                                    <span style={{ fontSize: "12.5px", color: "var(--ink-4)", lineHeight: 1.5 }}>{note}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <div style={{ height: 1, background: "var(--ink-7)" }} />

                {/* ── CTA SECTION ───────────────────────────────────────────────────────── */}
                <section style={{ padding: "80px 28px" }}>
                    <div style={{ maxWidth: 900, margin: "0 auto" }}>
                        <div
                            className="cta-inner"
                            style={{
                                position: "relative", overflow: "hidden",
                                background: "var(--ink-9)", border: "1px solid var(--ink-7)",
                                borderRadius: "var(--radius-xl)", padding: "60px 40px",
                                textAlign: "center",
                            }}
                        >
                            <div style={{
                                position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                                width: "60%", height: "1px",
                                background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
                            }} />

                            <div style={{
                                display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20,
                                background: "var(--gold-pale)", border: "1px solid var(--gold)",
                                borderRadius: 100, padding: "6px 16px",
                                fontSize: "11px", fontFamily: "var(--mono)", color: "var(--gold-dk)",
                                textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500,
                            }}>
                                <FileText size={12} /> Need the actual document?
                            </div>

                            <h2 style={{
                                fontFamily: "var(--serif)", fontSize: "clamp(28px, 3.5vw, 40px)",
                                color: "var(--ink)", marginBottom: 16, lineHeight: 1.2, letterSpacing: "-0.02em",
                            }}>
                                Generate a ready-to-use<br />
                                <span className="gold-text" style={{ fontStyle: "italic", fontWeight: 300 }}>
                                    {documentType} document.
                                </span>
                            </h2>

                            <p style={{
                                color: "var(--ink-4)", fontSize: "15px",
                                marginBottom: 36, maxWidth: 460, margin: "0 auto 36px",
                                lineHeight: 1.65, fontWeight: 300,
                            }}>
                                Use our AI-powered document creator to generate your document in minutes.
                            </p>

                            <div className="cta-btns" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                                <Link href="/affidavit-online-india" style={{ textDecoration: "none" }}>
                                    <button className="btn-gold" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                                        <FileText size={14} />
                                        Create {documentType.replace(/ .*/, "")} Document
                                        <ArrowRight size={14} />
                                    </button>
                                </Link>
                                <Link href="/services" style={{ textDecoration: "none" }}>
                                    <button className="btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                                        <MapPin size={14} />
                                        Find Notary Near Me
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
                <footer style={{
                    background: "var(--ink)", borderTop: "1px solid rgba(255,255,255,0.05)",
                    padding: "48px 28px 32px",
                }}>
                    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 48 }}>
                            <div>
                                <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 20 }}>
                                    <div style={{
                                        width: 36, height: 36, borderRadius: 10,
                                        background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.2)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                    }}>
                                        <Scale style={{ color: "var(--gold)", width: 16, height: 16 }} />
                                    </div>
                                    <span style={{ fontFamily: "var(--serif)", fontSize: "18px", fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>
                                        NyayMitra
                                    </span>
                                </Link>
                                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.65, maxWidth: 280 }}>
                                    Empowering citizens with accessible legal solutions through technology.
                                </p>
                            </div>

                            <div>
                                <div style={{ fontSize: "11px", fontFamily: "var(--mono)", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 20 }}>
                                    Quick Links
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                    {[["Home", "/"], ["Services", "/services"], ["About Us", "/about"], ["Contact", "/contact"]].map(([label, href]) => (
                                        <Link key={label} href={href} style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s" }}>
                                            {label}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div style={{ fontSize: "11px", fontFamily: "var(--mono)", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 20 }}>
                                    Contact Us
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>
                                    <Mail size={13} color="var(--gold)" /> contact@nyaymitra.tech
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
                                    <Phone size={13} color="var(--gold)" /> +91 79705 96183
                                </div>
                            </div>
                        </div>

                        <div style={{
                            marginTop: 48, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.05)",
                            display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16,
                        }}>
                            <span style={{ fontSize: "11px", fontFamily: "var(--mono)", color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em" }}>
                                © {new Date().getFullYear()} NyayMitra. All rights reserved.
                            </span>
                            <div style={{ display: "flex", gap: 16 }}>
                                {[["Privacy", "/privacy-policy"], ["Terms", "/terms"], ["Contact", "/contact"]].map(([label, href]) => (
                                    <Link key={label} href={href} style={{ fontSize: "11px", fontFamily: "var(--mono)", color: "rgba(255,255,255,0.25)", textDecoration: "none" }}>
                                        {label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </footer>

            </div>
        </>
    )
}