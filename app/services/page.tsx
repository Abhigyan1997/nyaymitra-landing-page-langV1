// app/services/page.tsx
"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  PenTool, Calculator, FileText, Download, ArrowRight, Scale,
  Mail, Phone, Users, Menu, X, Sparkles, Star, ChevronRight,
  BadgeCheck, Clock, Shield, Zap
} from "lucide-react"
import Link from "next/link"

/* ─── Global Styles & Design Tokens ─────────────────────────────────────── */
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
    @keyframes pulseDot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.75); }
    }
    @keyframes glowPulse {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 0.9; }
    }
    @keyframes drawLine {
      from { transform: scaleX(0); }
      to { transform: scaleX(1); }
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

    .reveal {
      opacity: 0;
      transform: translateY(22px);
      transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1);
    }
    .reveal.is-on { opacity: 1; transform: translateY(0); }

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

    .desktop-nav-links {
      display: flex;
      align-items: center;
      gap: 8px;
    }

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
      padding: 11px 24px; border-radius: var(--radius); border: none;
      text-decoration: none; cursor: pointer;
      transition: all 0.22s cubic-bezier(0.16,1,0.3,1);
    }
    .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(201,168,76,0.4); }

    .service-card {
      background: var(--white);
      border: 1px solid var(--ink-7);
      border-radius: var(--radius-lg);
      transition: all 0.28s cubic-bezier(0.16,1,0.3,1);
    }
    .service-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 56px rgba(12,11,9,0.08);
      border-color: var(--gold);
    }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--ink-9); }
    ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }
    ::selection { background: var(--gold-pale); color: var(--gold-dk); }

    @media (max-width: 768px) {
      .services-grid { grid-template-columns: 1fr !important; }
      .hero-pad { padding: 56px 20px 72px !important; }
      .stats-row { flex-direction: column !important; gap: 20px !important; }
      .stats-divider { display: none !important; }
      .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
      .cta-buttons { flex-direction: column !important; align-items: stretch !important; }
      .cta-buttons a { justify-content: center !important; }
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

/* ─── Animated Stat Counter ──────────────────────────────────────────────── */
function AnimatedStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 1800
        const steps = 60
        const step = value / steps
        let current = 0
        const timer = setInterval(() => {
          current = Math.min(current + step, value)
          setCount(Math.floor(current))
          if (current >= value) clearInterval(timer)
        }, duration / steps)
      }
    })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="text-center">
      <div style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 600, color: "var(--gold-dk)", letterSpacing: "-0.02em" }}>
        {count.toLocaleString()}{suffix}
      </div>
      <div style={{ fontSize: "10px", fontFamily: "var(--mono)", color: "var(--ink-5)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "4px" }}>
        {label}
      </div>
    </div>
  )
}

/* ─── Services Data ───────────────────────────────────────────────────────── */
const SERVICES = [
  {
    id: "notary-service",
    title: "Remote Notary",
    subtitle: "Via licensed lawyer",
    description: "Get documents notarized remotely or via courier. Delivered in 1–4 business days, fully legal.",
    icon: PenTool,
    accentColor: "#c9a84c",
    glowColor: "rgba(201,168,76,0.15)",
    popular: true,
    tags: ["Affidavit", "Authorization", "Power of Attorney"],
    features: ["PDF Generation", "Manual Notarization", "Email / Courier"],
    pricing: "₹399",
    pricingNote: "e-copy · ₹799 courier",
    href: "/services/notary",
    ctaText: "Notarize now",
  },
  {
    id: "instant-download",
    title: "Document Downloads",
    subtitle: "Self-attested, instant",
    description: "Pre-filled rent agreements, affidavits, and complaint letters pay once, download immediately.",
    icon: Download,
    accentColor: "#15803d",
    glowColor: "rgba(21,128,61,0.13)",
    popular: true,
    tags: ["Rent Agreement", "Affidavit", "Police Complaint"],
    features: ["Pre-fillable PDF", "Instant Download", "Razorpay Checkout"],
    pricing: "₹49",
    pricingNote: "per document",
    href: "/services/downloads",
    ctaText: "Download now",
  },
  {
    id: "stamp-duty",
    title: "Stamp Duty Calculator",
    subtitle: "State-wise, instant",
    description: "Find the exact stamp paper value for your document and state. Auto-detection included.",
    icon: Calculator,
    accentColor: "#d97706",
    glowColor: "rgba(217,119,6,0.12)",
    popular: false,
    tags: ["Affidavit", "Agreements", "Power of Attorney"],
    features: ["Auto-State Detection", "Value Suggestion", "Legal Tips"],
    pricing: "Free",
    pricingNote: "no sign-up needed",
    href: "/services/stamp-calculator",
    ctaText: "Calculate duty",
  },
]

/* ─── Service Card Component ──────────────────────────────────────────────── */
function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const Icon = service.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ height: "100%" }}
    >
      <div className="service-card" style={{ height: "100%", padding: "28px" }}>
        {/* Top row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: "var(--ink-9)", border: "1px solid var(--ink-7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "transform 0.3s", transform: hovered ? "rotate(8deg) scale(1.05)" : "none",
            color: service.accentColor,
          }}>
            <Icon size={20} />
          </div>
          {service.popular && (
            <div style={{
              display: "flex", alignItems: "center", gap: 4,
              background: "var(--gold-pale)", border: "1px solid var(--gold)",
              borderRadius: 100, padding: "4px 10px",
              fontSize: "9px", color: "var(--gold-dk)", fontWeight: 600,
              textTransform: "uppercase", letterSpacing: "0.05em",
            }}>
              <Star size={9} fill="var(--gold-dk)" /> Popular
            </div>
          )}
        </div>

        {/* Heading */}
        <div style={{ marginBottom: 12 }}>
          <h3 style={{ fontFamily: "var(--serif)", fontSize: "22px", fontWeight: 600, color: "var(--ink)", lineHeight: 1.2, marginBottom: 4 }}>
            {service.title}
          </h3>
          <p style={{ fontSize: "11px", fontFamily: "var(--mono)", color: "var(--ink-5)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
            {service.subtitle}
          </p>
        </div>

        {/* Pricing */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 16 }}>
          <span style={{ fontFamily: "var(--serif)", fontSize: "28px", fontWeight: 600, color: service.accentColor }}>
            {service.pricing}
          </span>
          <span style={{ fontSize: "11px", color: "var(--ink-5)" }}>{service.pricingNote}</span>
        </div>

        {/* Description */}
        <p style={{ fontSize: "13px", color: "var(--ink-4)", lineHeight: 1.65, marginBottom: 16 }}>
          {service.description}
        </p>

        {/* Feature pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
          {service.features.map(f => (
            <span key={f} style={{
              fontSize: "10px", padding: "4px 10px", borderRadius: 100,
              background: "var(--ink-9)", color: service.accentColor,
              border: "1px solid var(--ink-7)", fontWeight: 500,
            }}>{f}</span>
          ))}
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
          {service.tags.map(t => (
            <span key={t} style={{
              fontSize: "10px", padding: "3px 9px", borderRadius: 100,
              border: "1px solid var(--ink-7)", color: "var(--ink-5)",
            }}>{t}</span>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "var(--ink-7)", marginBottom: 16 }} />

        {/* CTA */}
        <Link href={service.href} style={{ textDecoration: "none" }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            color: service.accentColor, fontSize: "13px", fontWeight: 500,
            cursor: "pointer", transition: "gap 0.2s"
          }}>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {service.ctaText}
            </span>
            <ArrowRight size={14} style={{ transform: hovered ? "translateX(4px)" : "none", transition: "transform 0.25s" }} />
          </div>
        </Link>
      </div>
    </motion.div>
  )
}

/* ─── Main Page ───────────────────────────────────────────────────────────── */
export default function ServicesPage() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleMobileLinkClick = () => setMobileMenuOpen(false)

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
                Home
              </Link>
              <Link href="/lawyers" className="nav-link">
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

        {/* ── HERO SECTION ─────────────────────────────────────────────────────── */}
        <section className="hero-pad" style={{
          padding: "80px 28px 100px",
          position: "relative", overflow: "hidden",
        }}>
          {/* Background grid */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)",
            backgroundSize: "80px 80px", pointerEvents: "none",
          }} />
          {/* Radial glow */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 70% 60% at 80% 20%, rgba(201,168,76,0.055) 0%, transparent 60%)",
            pointerEvents: "none",
          }} />
          {/* Scale watermark */}
          <div style={{
            position: "absolute", right: "-4%", top: "5%",
            width: 520, height: 520, opacity: 0.025, pointerEvents: "none",
          }}>
            <Scale style={{ width: "100%", height: "100%", color: "var(--gold-dk)" }} />
          </div>

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
                  <Zap style={{ width: 10, height: 10, color: "var(--gold-dk)" }} />
                </div>
                <span style={{ fontFamily: "var(--mono)", fontSize: "9.5px", color: "var(--ink-4)", letterSpacing: "0.1em" }}>
                  Instant legal solutions powered by AI
                </span>
              </div>

              {/* Headline */}
              <h1 style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(44px, 7vw, 80px)",
                fontWeight: 600, lineHeight: 1.08,
                letterSpacing: "-0.03em",
                color: "var(--ink)", marginBottom: 0,
              }}>
                Smart legal services<br />
                <span className="gold-text" style={{ fontStyle: "italic", fontWeight: 300, display: "inline-block", lineHeight: 1.3 }}>
                  at your fingertips.
                </span>
              </h1>

              <OrnamentLine />

              <p style={{
                fontFamily: "var(--sans)", fontSize: "15.5px",
                color: "var(--ink-4)", lineHeight: 1.85,
                maxWidth: 500, fontWeight: 300,
              }}>
                Notary services, legal documents, and expert consultations AI-powered and delivered within days.
              </p>

              {/* Stats Row */}
              <div className="stats-row" style={{
                display: "flex", gap: "40px", alignItems: "center",
                marginTop: 40, flexWrap: "wrap",
              }}>
                <AnimatedStat value={10} suffix="+" label="Documents processed" />
                <div className="stats-divider" style={{ width: "1px", height: 40, background: "var(--ink-7)" }} />
                <AnimatedStat value={98} suffix="%" label="Satisfaction rate" />
                <div className="stats-divider" style={{ width: "1px", height: 40, background: "var(--ink-7)" }} />
                <AnimatedStat value={4} suffix=" days" label="Max turnaround" />
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div style={{ height: 1, background: "var(--ink-7)" }} />

        {/* ── SERVICES SECTION ───────────────────────────────────────────────────── */}
        <section style={{ padding: "80px 28px", position: "relative", zIndex: 10 }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>

            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
              <span className="eyebrow" style={{ margin: 0 }}>Our services</span>
              <div style={{ flex: 1, height: "1px", background: "var(--ink-7)" }} />
            </div>

            <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
              {SERVICES.map((service, i) => (
                <ServiceCard key={service.id} service={service} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div style={{ height: 1, background: "var(--ink-7)" }} />

        {/* ── CTA SECTION ───────────────────────────────────────────────────────── */}
        <section style={{ padding: "80px 28px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                position: "relative", overflow: "hidden",
                background: "var(--ink-9)",
                border: "1px solid var(--ink-7)",
                borderRadius: "var(--radius-xl)",
                padding: "60px 40px",
                textAlign: "center",
              }}
            >
              {/* Decorative lines */}
              <div style={{
                position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                width: "60%", height: "1px",
                background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
              }} />
              <div style={{
                position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
                width: "40%", height: "1px",
                background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
              }} />

              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20,
                background: "var(--gold-pale)", border: "1px solid var(--gold)",
                borderRadius: 100, padding: "6px 16px",
                fontSize: "11px", fontFamily: "var(--mono)", color: "var(--gold-dk)",
                textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500,
              }}>
                <Sparkles size={12} /> Custom documents
              </div>

              <h2 style={{
                fontFamily: "var(--serif)", fontSize: "clamp(28px, 3.5vw, 40px)",
                color: "var(--ink)", marginBottom: 16, lineHeight: 1.2, letterSpacing: "-0.02em",
              }}>
                Need a custom legal document?
              </h2>

              <p style={{ color: "var(--ink-4)", fontSize: "15px", marginBottom: 32, maxWidth: 520, margin: "0 auto 32px", lineHeight: 1.65 }}>
                Our AI generates personalized legal documents in minutes, or connects you with expert lawyers for complex cases.
              </p>

              <div className="cta-buttons" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/lawyers" style={{ textDecoration: "none" }}>
                  <button className="btn-gold" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <Users size={15} /> Consult a lawyer <ChevronRight size={14} />
                  </button>
                </Link>
                <Link href="/legal-ai" style={{ textDecoration: "none" }}>
                  <button className="btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <Sparkles size={15} /> Try AI assistant <ChevronRight size={14} />
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
        <footer style={{
          background: "var(--ink)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "48px 28px 32px",
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "48px" }}>

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
                  Empowering citizens with accessible legal solutions through technology. Trusted by thousands across India.
                </p>
              </div>

              <div>
                <div style={{
                  fontSize: "11px", fontFamily: "var(--mono)", color: "var(--gold)",
                  textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 20,
                }}>
                  Quick links
                </div>
                {["Home", "Services", "About", "Contact"].map(link => (
                  <div key={link} style={{ marginBottom: 12 }}>
                    <Link href={`/${link.toLowerCase() === "home" ? "" : link.toLowerCase()}`}
                      style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                    >{link}</Link>
                  </div>
                ))}
              </div>

              <div>
                <div style={{
                  fontSize: "11px", fontFamily: "var(--mono)", color: "var(--gold)",
                  textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 20,
                }}>
                  Contact us
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>
                  <Mail size={13} color="var(--gold)" /> support@mynyaymitra.in
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
                  <Phone size={13} color="var(--gold)" /> +91 79705 96183
                </div>
              </div>
            </div>

            <div style={{
              marginTop: 48, paddingTop: 24,
              borderTop: "1px solid rgba(255,255,255,0.05)",
              display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16,
            }}>
              <span style={{ fontSize: "11px", fontFamily: "var(--mono)", color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em" }}>
                © {new Date().getFullYear()} NyayMitra. All rights reserved.
              </span>
              <div style={{ display: "flex", gap: 16 }}>
                <Link href="/privacy-policy" style={{ fontSize: "11px", fontFamily: "var(--mono)", color: "rgba(255,255,255,0.25)", textDecoration: "none" }}>
                  Privacy
                </Link>
                <Link href="/terms" style={{ fontSize: "11px", fontFamily: "var(--mono)", color: "rgba(255,255,255,0.25)", textDecoration: "none" }}>
                  Terms
                </Link>
                <Link href="/contact" style={{ fontSize: "11px", fontFamily: "var(--mono)", color: "rgba(255,255,255,0.25)", textDecoration: "none" }}>
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}