// app/contact/page.tsx
"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  Shield, Lock, Mail, Phone, MapPin, Clock, Send, CheckCircle,
  AlertCircle, Info, ArrowLeft, Sparkles, Menu, X, ChevronRight,
  BookOpen, Scale, Users, Globe, MessageCircle, HelpCircle
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

    @media (min-width: 769px) {
      .desktop-nav-items {
        display: flex !important;
        align-items: center;
        gap: 8px;
      }
      .mobile-menu-button {
        display: none !important;
      }
    }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--ink-9); }
    ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--gold-dk); }
    ::selection { background: var(--gold-pale); color: var(--gold-dk); }

    input, textarea, select {
      font-family: var(--sans);
      font-size: 13px;
      width: 100%;
      padding: 10px 14px;
      border: 1px solid var(--ink-7);
      border-radius: var(--radius);
      background: var(--white);
      color: var(--ink);
      outline: none;
      transition: all 0.2s;
    }
    input::placeholder, textarea::placeholder { color: var(--ink-5); }
    input:focus, textarea:focus, select:focus { 
      border-color: var(--gold); 
      box-shadow: 0 0 0 3px rgba(201,168,76,0.1);
    }
    select {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%238a8680' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 12px center;
      background-size: 14px;
      padding-right: 36px;
      appearance: none;
    }
    label {
      display: block;
      font-family: var(--mono);
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--gold-dk);
      margin-bottom: 6px;
    }

    @media (max-width: 768px) {
      .hero-title { font-size: clamp(38px, 10vw, 64px) !important; }
      .hero-pad { padding: 56px 20px 72px !important; }
      .main-pad { padding: 32px 20px !important; }
      .contact-grid { grid-template-columns: 1fr !important; }
      .faq-grid { grid-template-columns: 1fr !important; }
      .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
      .footer-container { flex-direction: column; align-items: center; text-align: center; gap: 16px; }
      .form-grid { grid-template-columns: 1fr !important; }
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
const CONTACT_INFO = [
  { icon: MapPin, title: "Office Address", lines: ["NyayMitra Technologies Pvt. Ltd.", "Koramangala, 5th Block", "Bangalore, Karnataka – 560095"] },
  { icon: MapPin, title: "Registered Address", lines: ["NyayMitra Technologies Pvt. Ltd.", "Bhagalpur, Bihar, India"] },
  { icon: Phone, title: "Emergency Line", lines: ["+91 79705 96183"], href: "tel:+917970596183" },
  { icon: Mail, title: "Email", lines: ["support@nyaymitra.tech"], href: "mailto:support@nyaymitra.tech" },
  { icon: Clock, title: "Business Hours", lines: ["Mon–Fri: 9 AM – 8 PM", "Sat: 10 AM – 6 PM", "Sun: 10 AM – 4 PM"] },
]

const CATEGORIES = [
  "General Inquiry",
  "Legal Advice",
  "Lawyer Registration",
  "Technical Support",
  "Billing & Payments",
  "Partnership",
  "Media & Press",
  "Other",
]

const FAQS = [
  { q: "How do I book a consultation with a lawyer?", a: "Browse verified lawyers on our platform and book a consultation by selecting a date, time, and preferred mode." },
  { q: "Is the first consultation free?", a: "Yes every user gets one free consultation with a verified lawyer after signing up." },
  { q: "How do lawyers get verified?", a: "We verify lawyers by checking their Bar Council ID and professional details before approving their profiles." },
  { q: "Is my data safe on NyayMitra?", a: "Absolutely. We follow strict data privacy standards and never share your information without consent." },
  { q: "How does AI legal support work?", a: "Our AI provides 24/7 guidance based on Indian laws. For complex issues, it connects you to a real lawyer." },
  { q: "Can I reschedule or cancel a booking?", a: "Yes manage your bookings through your dashboard. Please inform the lawyer in advance for any changes." },
]

const STATS = [
  { value: "1000+", label: "Trusted Users" },
  { value: "100%", label: "Verified Lawyers" },
  { value: "Pan India", label: "Coverage" },
  { value: "24/7", label: "AI Support" },
]

/* ─── ORNAMENT LINE ──────────────────────────────────────────────────────────── */
const OrnamentLine = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
    <div style={{ width: 40, height: 1, background: "linear-gradient(90deg, var(--gold-dk), var(--gold))" }} />
    <MessageCircle style={{ width: 9, height: 9, color: "var(--gold)" }} />
    <div style={{ width: 20, height: 1, background: "linear-gradient(90deg, var(--gold), transparent)" }} />
  </div>
)

/* ─── CONTACT INFO CARD ───────────────────────────────────────────────────────── */
function ContactInfoCard({ icon: Icon, title, lines, href }: { icon: any; title: string; lines: string[]; href?: string }) {
  const content = (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 14,
      padding: "16px 20px",
      border: "1px solid var(--ink-7)",
      borderRadius: "var(--radius)",
      background: "var(--white)",
      transition: "all 0.22s",
      textDecoration: "none",
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
      <div style={{
        width: 40, height: 40, borderRadius: 10, flexShrink: 0,
        background: "var(--ink-9)", border: "1px solid var(--ink-7)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "var(--gold-dk)",
      }}>
        <Icon style={{ width: 16, height: 16 }} />
      </div>
      <div>
        <p style={{
          fontFamily: "var(--mono)", fontSize: "8px", fontWeight: 600,
          letterSpacing: "0.12em", textTransform: "uppercase",
          color: "var(--gold-dk)", marginBottom: 4,
        }}>{title}</p>
        {lines.map((line, j) => (
          <p key={j} style={{ fontSize: "13px", color: "var(--ink-3)", lineHeight: 1.6 }}>
            {line}
          </p>
        ))}
      </div>
    </div>
  )

  if (href) {
    return <a href={href} style={{ textDecoration: "none" }}>{content}</a>
  }
  return content
}

/* ─── FAQ CARD ───────────────────────────────────────────────────────────────── */
function FaqCard({ q, a }: { q: string; a: string }) {
  return (
    <div style={{
      padding: "20px 22px",
      border: "1px solid var(--ink-7)",
      borderRadius: "var(--radius)",
      background: "var(--white)",
      transition: "all 0.22s",
    }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = "var(--gold)"
        el.style.transform = "translateY(-2px)"
        el.style.boxShadow = "0 8px 24px rgba(201,168,76,0.06)"
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = "var(--ink-7)"
        el.style.transform = "translateY(0)"
        el.style.boxShadow = "none"
      }}
    >
      <div style={{
        width: 28, height: 28, borderRadius: 8,
        background: "var(--gold-pale)", border: "1px solid var(--gold)",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 14,
      }}>
        <HelpCircle style={{ width: 12, height: 12, color: "var(--gold-dk)" }} />
      </div>
      <h3 style={{
        fontFamily: "var(--serif)", fontSize: "16px",
        fontWeight: 600, color: "var(--ink)", marginBottom: 8,
        lineHeight: 1.3,
      }}>{q}</h3>
      <p style={{ fontSize: "12.5px", color: "var(--ink-4)", lineHeight: 1.65 }}>{a}</p>
    </div>
  )
}

/* ─── STAT CARD ──────────────────────────────────────────────────────────────── */
function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div style={{
      padding: "24px 16px",
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
      <p style={{
        fontFamily: "var(--serif)",
        fontSize: "clamp(28px, 4vw, 36px)",
        fontWeight: 600, color: "var(--gold-dk)",
        lineHeight: 1.2, marginBottom: 6,
      }}>{value}</p>
      <p style={{
        fontFamily: "var(--mono)", fontSize: "9px",
        letterSpacing: "0.12em", color: "var(--ink-4)",
        textTransform: "uppercase",
      }}>{label}</p>
    </div>
  )
}

/* ─── SPINNER ───────────────────────────────────────────────────────────────── */
const SpinnerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 animate-spin">
    <circle cx="12" cy="12" r="10" strokeOpacity={0.25} />
    <path d="M12 2a10 10 0 0110 10" />
  </svg>
)

/* ─── PAGE ───────────────────────────────────────────────────────────────────── */
export default function ContactPage() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [form, setForm] = useState({
    name: "", email: "", phone: "", subject: "", category: "", message: ""
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message")
    } finally {
      setLoading(false)
    }
  }

  const handleMobileLinkClick = () => setMobileMenuOpen(false)

  // Success State
  if (submitted) {
    return (
      <>
        <GlobalStyles />
        <div style={{ minHeight: "100vh", background: "var(--white)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>
            <div style={{
              width: 64, height: 64, borderRadius: 20,
              background: "var(--gold-pale)", border: "1px solid var(--gold)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 24px auto",
            }}>
              <CheckCircle style={{ width: 28, height: 28, color: "var(--gold-dk)" }} />
            </div>
            <h2 style={{
              fontFamily: "var(--serif)", fontSize: "clamp(28px, 5vw, 36px)",
              fontWeight: 600, color: "var(--ink)", marginBottom: 12,
            }}>
              Message sent.
            </h2>
            <p style={{ fontSize: "14px", color: "var(--ink-4)", lineHeight: 1.7, marginBottom: 28 }}>
              Thank you for reaching out. We've sent a confirmation to your email and will get back to you within 24 hours.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <button
                onClick={() => {
                  setSubmitted(false)
                  setForm({ name: "", email: "", phone: "", subject: "", category: "", message: "" })
                }}
                className="btn-ink"
                style={{ justifyContent: "center" }}
              >
                Send another message
              </button>
              <Link href="/" className="btn-ghost" style={{ justifyContent: "center" }}>
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </>
    )
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
              <div>
                <div style={{
                  fontFamily: "var(--serif)", fontSize: "20px", fontWeight: 600,
                  color: "var(--ink)", lineHeight: 1, letterSpacing: "-0.02em",
                }}>NyayMitra</div>
              </div>
            </Link>

            <div className="desktop-nav-items">
              <Link href="/" className="btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <ArrowLeft style={{ width: 13, height: 13 }} />
                Home
              </Link>
              <Link href="/lawyers" className="nav-link">Find Lawyers</Link>
              <Link href="/legal-ai" className="btn-ink">
                <Sparkles style={{ width: 13, height: 13 }} />
                Legal AI
              </Link>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-button"
              style={{
                background: "transparent", border: "none", cursor: "pointer",
                padding: "8px", borderRadius: "8px", transition: "all 0.2s",
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

          {mobileMenuOpen && (
            <div style={{
              position: "absolute", top: 66, left: 0, right: 0,
              background: "var(--white)", borderBottom: "1px solid var(--ink-7)",
              boxShadow: "0 4px 24px rgba(12,11,9,0.08)", padding: "20px",
              animation: "mobileMenuFade 0.3s ease-out", zIndex: 99,
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
            <MessageCircle style={{ width: "100%", height: "100%", color: "var(--gold-dk)" }} />
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
                  <MessageCircle style={{ width: 10, height: 10, color: "var(--gold-dk)" }} />
                </div>
                <span style={{ fontFamily: "var(--mono)", fontSize: "9.5px", color: "var(--ink-4)", letterSpacing: "0.1em" }}>
                  24/7 Support Available
                </span>
              </div>

              <h1 className="hero-title" style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(44px, 7vw, 80px)",
                fontWeight: 600, lineHeight: 1.08,
                letterSpacing: "-0.03em",
                color: "var(--ink)", marginBottom: 0,
              }}>
                We're here<br />
                <span className="gold-text" style={{ fontStyle: "italic", fontWeight: 300, display: "inline-block", lineHeight: 1.3 }}>
                  to help you.
                </span>
              </h1>

              <OrnamentLine />

              <p style={{
                fontFamily: "var(--sans)", fontSize: "15px",
                color: "var(--ink-4)", lineHeight: 1.85,
                maxWidth: 480, marginBottom: 12, fontWeight: 300,
              }}>
                Have questions about our services? Need legal assistance? Reach out and we'll help you navigate your legal journey.
              </p>
            </div>
          </div>
        </section>

        <div style={{ height: 1, background: "var(--ink-7)" }} />

        {/* ── STATS SECTION ────────────────────────────────────────────────────── */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 28px 0" }}>
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {STATS.map((stat, i) => (
              <Reveal delay={i * 40} key={i}>
                <StatCard value={stat.value} label={stat.label} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── MAIN CONTENT ──────────────────────────────────────────────────────── */}
        <div className="main-pad" style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 28px 96px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 48, alignItems: "start" }}>

            {/* ── FORM ──────────────────────────────────────────────────────── */}
            <Reveal>
              <div>
                <div style={{ marginBottom: 8 }}>
                  <span className="eyebrow" style={{ marginBottom: 8 }}>Send a message</span>
                  <h2 style={{
                    fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 36px)",
                    fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.02em",
                  }}>
                    Tell us what you need
                  </h2>
                </div>

                <form onSubmit={handleSubmit} style={{ marginTop: 28 }}>
                  <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                    <div>
                      <label htmlFor="name">Full name *</label>
                      <input id="name" value={form.name} onChange={set("name")} placeholder="Your full name" required />
                    </div>
                    <div>
                      <label htmlFor="email">Email address *</label>
                      <input id="email" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" required />
                    </div>
                  </div>

                  <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                    <div>
                      <label htmlFor="phone">Phone number</label>
                      <input id="phone" value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" />
                    </div>
                    <div>
                      <label htmlFor="category">Query category *</label>
                      <select id="category" value={form.category} onChange={set("category")} required>
                        <option value="" disabled>Select a category</option>
                        {CATEGORIES.map((c) => <option key={c} value={c.toLowerCase().replace(/\s+/g, "-")}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label htmlFor="subject">Subject *</label>
                    <input id="subject" value={form.subject} onChange={set("subject")} placeholder="Brief subject of your query" required />
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <label htmlFor="message">Message *</label>
                    <textarea id="message" rows={5} value={form.message} onChange={set("message")} placeholder="Describe your query in detail…" required />
                  </div>

                  {error && (
                    <div style={{
                      display: "flex", alignItems: "flex-start", gap: 10,
                      padding: "12px 16px", marginBottom: 20,
                      background: "#fef2f2", border: "1px solid #fecaca",
                      borderRadius: "var(--radius)", fontSize: "12px", color: "#dc2626",
                    }}>
                      <AlertCircle style={{ width: 14, height: 14, flexShrink: 0, marginTop: 1 }} />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-ink"
                    style={{ padding: "10px 24px" }}
                  >
                    {loading ? (
                      <><SpinnerIcon /> Sending…</>
                    ) : (
                      <><Send style={{ width: 13, height: 13 }} /> Send Message</>
                    )}
                  </button>
                </form>
              </div>
            </Reveal>

            {/* ── SIDEBAR ──────────────────────────────────────────────────────── */}
            <div style={{ position: "sticky", top: 88 }}>
              <Reveal delay={40}>
                <div style={{
                  border: "1px solid var(--ink-7)",
                  borderRadius: "var(--radius-lg)", overflow: "hidden",
                  background: "var(--white)", marginBottom: 24,
                }}>
                  <div style={{
                    padding: "16px 20px",
                    borderBottom: "1px solid var(--ink-7)",
                    background: "var(--ink-9)",
                  }}>
                    <span style={{
                      fontFamily: "var(--serif)", fontSize: "16px",
                      fontWeight: 600, color: "var(--ink)",
                    }}>Contact details</span>
                  </div>
                  <div style={{ padding: "8px 0" }}>
                    {CONTACT_INFO.map((item, i) => (
                      <ContactInfoCard
                        key={i}
                        icon={item.icon}
                        title={item.title}
                        lines={item.lines}
                        href={"href" in item ? item.href : undefined}
                      />
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={60}>
                <div style={{
                  borderRadius: "var(--radius-lg)",
                  background: "var(--ink)",
                  padding: "28px 24px",
                  textAlign: "center",
                  border: "1px solid rgba(201,168,76,0.15)",
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: "rgba(201,168,76,0.1)",
                    border: "1px solid rgba(201,168,76,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 16px auto",
                    color: "var(--gold)",
                  }}>
                    <Sparkles style={{ width: 20, height: 20 }} />
                  </div>
                  <h3 style={{
                    fontFamily: "var(--serif)", fontSize: "18px",
                    fontWeight: 600, color: "white", marginBottom: 8,
                  }}>
                    Need instant help?
                  </h3>
                  <p style={{
                    fontSize: "12px", color: "rgba(255,255,255,0.5)",
                    marginBottom: 20, lineHeight: 1.6,
                  }}>
                    Try our AI Legal Assistant for immediate guidance
                  </p>
                  <Link
                    href="/legal-ai"
                    className="btn-ink"
                    style={{ background: "var(--gold)", color: "var(--ink)", display: "inline-flex" }}
                  >
                    Ask Legal AI
                    <ChevronRight style={{ width: 12, height: 12 }} />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: "var(--ink-7)" }} />

        {/* ── FAQ SECTION ───────────────────────────────────────────────────────── */}
        <section style={{ padding: "72px 28px", background: "var(--ink-9)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span className="eyebrow" style={{ justifyContent: "center" }}>Knowledge base</span>
              <h2 style={{
                fontFamily: "var(--serif)", fontSize: "clamp(32px, 5vw, 44px)",
                fontWeight: 600, color: "var(--ink)", marginTop: 12,
              }}>
                Frequently asked <span className="gold-text">questions</span>
              </h2>
              <p style={{
                fontSize: "14px", color: "var(--ink-4)",
                maxWidth: 480, margin: "12px auto 0",
              }}>
                Quick answers to common questions about our platform and services.
              </p>
            </div>

            <div className="faq-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
              {FAQS.map((faq, i) => (
                <Reveal delay={i * 60} key={i}>
                  <FaqCard q={faq.q} a={faq.a} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

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