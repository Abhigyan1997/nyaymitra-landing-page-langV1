"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  PenTool, Calculator, FileText, Download, ArrowRight, Scale,
  Mail, Phone, Users, Menu, X, Sparkles, Star, ChevronRight
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

/* ─── design tokens ─────────────────────────────────────────────────────── */
const NAVY = "#060d1f"
const NAVY2 = "#0b1630"
const ACCENT = "#4f6ef7"
const ACCENT2 = "#7c3aed"
const MUTED = "rgba(255,255,255,0.45)"
const BORDER = "rgba(255,255,255,0.07)"

/* ─── floating grid dots ─────────────────────────────────────────────────── */
const DOTS = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: (i * 37 + 13) % 100,
  top: (i * 53 + 7) % 100,
  delay: (i * 0.4) % 3,
  size: i % 3 === 0 ? 2 : 1,
}))

/* ─── services data ──────────────────────────────────────────────────────── */
const SERVICES = [
  {
    id: "notary-service",
    title: "Remote Notary",
    subtitle: "Via licensed lawyer",
    description: "Get documents notarized remotely or via courier. Delivered in 1–4 business days, fully legal.",
    icon: PenTool,
    accentColor: "#4f6ef7",
    glowColor: "rgba(79,110,247,0.15)",
    popular: true,
    tags: ["Affidavit", "Authorization", "Power of Attorney"],
    features: ["PDF Generation", "Manual Notarization", "Email / Courier"],
    pricing: "₹399",
    pricingNote: "e-copy · ₹799 courier",
    href: "/services/notary",
    ctaText: "Notarize now",
    ctaIcon: PenTool,
  },
  {
    id: "instant-download",
    title: "Document Downloads",
    subtitle: "Self-attested, instant",
    description: "Pre-filled rent agreements, affidavits, and complaint letters — pay once, download immediately.",
    icon: Download,
    accentColor: "#10b981",
    glowColor: "rgba(16,185,129,0.13)",
    popular: true,
    tags: ["Rent Agreement", "Affidavit", "Police Complaint"],
    features: ["Pre-fillable PDF", "Instant Download", "Razorpay Checkout"],
    pricing: "₹49",
    pricingNote: "per document",
    href: "/services/downloads",
    ctaText: "Download now",
    ctaIcon: Download,
  },
  {
    id: "stamp-duty",
    title: "Stamp Duty Calculator",
    subtitle: "State-wise, instant",
    description: "Find the exact stamp paper value for your document and state. Auto-detection included.",
    icon: Calculator,
    accentColor: "#f59e0b",
    glowColor: "rgba(245,158,11,0.12)",
    popular: false,
    tags: ["Affidavit", "Agreements", "Power of Attorney"],
    features: ["Auto-State Detection", "Value Suggestion", "Legal Tips"],
    pricing: "Free",
    pricingNote: "no sign-up needed",
    href: "/services/stamp-calculator",
    ctaText: "Calculate duty",
    ctaIcon: Calculator,
  },
]

/* ─── stat counter ──────────────────────────────────────────────────────── */
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
      <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "2rem", color: "#fff", letterSpacing: "-0.02em" }}>
        {count.toLocaleString()}{suffix}
      </div>
      <div style={{ fontSize: "0.72rem", color: MUTED, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "4px" }}>
        {label}
      </div>
    </div>
  )
}

/* ─── service card ──────────────────────────────────────────────────────── */
function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const Icon = service.icon
  const CtaIcon = service.ctaIcon

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", height: "100%" }}
    >
      {/* glow blob */}
      <div style={{
        position: "absolute", inset: -1, borderRadius: 20,
        background: hovered ? service.glowColor : "transparent",
        filter: "blur(20px)", transition: "background 0.4s", zIndex: 0, pointerEvents: "none"
      }} />

      <div style={{
        position: "relative", zIndex: 1, height: "100%",
        background: hovered
          ? `linear-gradient(145deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.02) 100%)`
          : "rgba(255,255,255,0.025)",
        border: `0.5px solid ${hovered ? service.accentColor + "44" : BORDER}`,
        borderRadius: 20, padding: "1.75rem",
        transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        display: "flex", flexDirection: "column", gap: "1.25rem",
        backdropFilter: "blur(12px)",
      }}>

        {/* top row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
            background: service.accentColor + "18", border: `0.5px solid ${service.accentColor}30`,
            transition: "transform 0.3s", transform: hovered ? "rotate(8deg) scale(1.05)" : "none"
          }}>
            <Icon size={20} color={service.accentColor} />
          </div>
          {service.popular && (
            <div style={{
              display: "flex", alignItems: "center", gap: 4,
              background: "rgba(79,110,247,0.12)", border: "0.5px solid rgba(79,110,247,0.3)",
              borderRadius: 100, padding: "3px 10px",
              fontSize: "10px", color: "#7b9fff", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase"
            }}>
              <Star size={9} fill="#7b9fff" color="#7b9fff" /> Popular
            </div>
          )}
        </div>

        {/* heading */}
        <div>
          <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "1.3rem", color: "#fff", lineHeight: 1.2, marginBottom: 4 }}>
            {service.title}
          </div>
          <div style={{ fontSize: "0.75rem", color: MUTED, textTransform: "uppercase", letterSpacing: "0.07em" }}>
            {service.subtitle}
          </div>
        </div>

        {/* price */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.6rem", color: service.accentColor }}>
            {service.pricing}
          </span>
          <span style={{ fontSize: "0.72rem", color: MUTED }}>{service.pricingNote}</span>
        </div>

        {/* description */}
        <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.65, margin: 0 }}>
          {service.description}
        </p>

        {/* feature pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {service.features.map(f => (
            <span key={f} style={{
              fontSize: "11px", padding: "4px 10px", borderRadius: 100,
              background: service.accentColor + "12", color: service.accentColor,
              border: `0.5px solid ${service.accentColor}30`, fontWeight: 500
            }}>{f}</span>
          ))}
        </div>

        {/* tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {service.tags.map(t => (
            <span key={t} style={{
              fontSize: "11px", padding: "3px 9px", borderRadius: 100,
              border: `0.5px solid ${BORDER}`, color: MUTED
            }}>{t}</span>
          ))}
        </div>

        {/* divider */}
        <div style={{ height: "0.5px", background: BORDER }} />

        {/* cta */}
        <Link href={service.href} style={{ textDecoration: "none" }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            color: service.accentColor, fontSize: "0.85rem", fontWeight: 500,
            cursor: "pointer", transition: "gap 0.2s"
          }}>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <CtaIcon size={14} /> {service.ctaText}
            </span>
            <ArrowRight size={14} style={{ transform: hovered ? "translateX(4px)" : "none", transition: "transform 0.25s" }} />
          </div>
        </Link>
      </div>
    </motion.div>
  )
}

/* ─── main page ─────────────────────────────────────────────────────────── */
export default function ServicesPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: ${NAVY};
          color: #fff;
          margin: 0;
          -webkit-font-smoothing: antialiased;
        }

        .cyber-grid-bg {
          background-image:
            linear-gradient(rgba(79,110,247,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79,110,247,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .noise-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
        }

        ::selection { background: rgba(79,110,247,0.35); color: #fff; }

        .nav-glass {
          background: ${scrolled ? "rgba(6,13,31,0.92)" : "transparent"};
          backdrop-filter: ${scrolled ? "blur(20px)" : "none"};
          border-bottom: 0.5px solid ${scrolled ? BORDER : "transparent"};
          transition: all 0.35s ease;
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: NAVY, position: "relative", overflow: "hidden" }}>

        {/* background layers */}
        <div className="cyber-grid-bg" style={{ position: "fixed", inset: 0, zIndex: 0 }} />
        <div className="noise-overlay" style={{ position: "fixed", inset: 0, zIndex: 0 }} />

        {/* deep radial glows */}
        <div style={{
          position: "fixed", top: "-20%", left: "-10%", width: "60vw", height: "60vw",
          borderRadius: "50%", background: "radial-gradient(circle, rgba(79,110,247,0.07) 0%, transparent 70%)",
          zIndex: 0, pointerEvents: "none"
        }} />
        <div style={{
          position: "fixed", bottom: "-15%", right: "-10%", width: "50vw", height: "50vw",
          borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
          zIndex: 0, pointerEvents: "none"
        }} />

        {/* floating dots */}
        <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
          {DOTS.map(d => (
            <div key={d.id} style={{
              position: "absolute", left: `${d.left}%`, top: `${d.top}%`,
              width: d.size, height: d.size, borderRadius: "50%",
              background: d.id % 2 === 0 ? "rgba(79,110,247,0.5)" : "rgba(124,58,237,0.4)",
              animation: `pulse ${2 + d.delay}s ease-in-out ${d.delay}s infinite alternate`
            }} />
          ))}
        </div>
        <style>{`@keyframes pulse { from { opacity: 0.2; } to { opacity: 0.8; } }`}</style>

        {/* ── NAV ──────────────────────────────────────────────────────────── */}
        <nav className="nav-glass" style={{ position: "sticky", top: 0, zIndex: 100, padding: "0 2rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>

            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "linear-gradient(135deg, rgba(79,110,247,0.25), rgba(124,58,237,0.2))",
                border: "0.5px solid rgba(79,110,247,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <Scale size={18} color={ACCENT} />
              </div>
              <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.25rem", color: "#fff", letterSpacing: "-0.01em" }}>
                NyayMitra
              </span>
            </Link>

            {/* desktop nav */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }} className="hidden md:flex">
              {["Services", "Find lawyers", "About", "Contact"].map(item => (
                <Link key={item} href={`/${item.toLowerCase().replace(" ", "-")}`}
                  style={{ fontSize: "0.85rem", color: MUTED, padding: "6px 14px", borderRadius: 8, textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
                >
                  {item}
                </Link>
              ))}
              <Link href="/legal-gpt" style={{ textDecoration: "none" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 6,
                  background: "linear-gradient(135deg, #4f6ef7, #7c3aed)",
                  borderRadius: 8, padding: "8px 18px",
                  fontSize: "0.85rem", fontWeight: 500, color: "#fff", cursor: "pointer"
                }}>
                  <Sparkles size={13} /> AI assistant
                </div>
              </Link>
            </div>

            {/* mobile hamburger */}
            <button
              style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 8 }}
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* mobile menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                style={{ overflow: "hidden", borderTop: `0.5px solid ${BORDER}` }}
              >
                <div style={{ padding: "1rem 0", display: "flex", flexDirection: "column", gap: 4 }}>
                  {["Services", "Find lawyers", "About", "Contact"].map(item => (
                    <Link key={item} href={`/${item.toLowerCase().replace(" ", "-")}`}
                      style={{ color: MUTED, fontSize: "0.9rem", padding: "10px 0", textDecoration: "none" }}
                    >{item}</Link>
                  ))}
                  <Link href="/legal-gpt" style={{ textDecoration: "none" }}>
                    <div style={{
                      marginTop: 8, background: "linear-gradient(135deg, #4f6ef7, #7c3aed)",
                      borderRadius: 8, padding: "10px 18px", fontSize: "0.9rem", color: "#fff",
                      display: "flex", alignItems: "center", gap: 6
                    }}>
                      <Sparkles size={13} /> AI assistant
                    </div>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <motion.section
          ref={heroRef}
          style={{ y: heroY, opacity: heroOpacity, position: "relative", zIndex: 10 }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "6rem 2rem 4rem", textAlign: "center" }}>

            {/* badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(79,110,247,0.1)", border: "0.5px solid rgba(79,110,247,0.3)",
                borderRadius: 100, padding: "7px 18px", marginBottom: "2rem"
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: ACCENT, animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: "0.72rem", color: "#a5b4fc", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 500 }}>
                Instant legal solutions — powered by AI
              </span>
            </motion.div>

            {/* headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: "clamp(2.6rem, 6vw, 4.2rem)",
                lineHeight: 1.1, letterSpacing: "-0.025em",
                margin: "0 0 1.5rem",
                background: "linear-gradient(160deg, #fff 40%, rgba(165,180,252,0.8) 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
              }}
            >
              Smart legal services<br />
              <em>at your fingertips</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontSize: "1.05rem", color: MUTED, maxWidth: 520, margin: "0 auto 3rem", lineHeight: 1.7 }}
            >
              Notary services, legal documents, and expert consultations — AI-powered and delivered within days.
            </motion.p>

            {/* stat strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
              style={{
                display: "inline-flex", gap: "3rem", alignItems: "center",
                background: "rgba(255,255,255,0.03)", border: `0.5px solid ${BORDER}`,
                borderRadius: 16, padding: "1.25rem 2.5rem", backdropFilter: "blur(12px)"
              }}
            >
              <AnimatedStat value={10} suffix="+" label="Documents processed" />
              <div style={{ width: "0.5px", height: 40, background: BORDER }} />
              <AnimatedStat value={98} suffix="%" label="Satisfaction rate" />
              <div style={{ width: "0.5px", height: 40, background: BORDER }} />
              <AnimatedStat value={4} suffix=" days" label="Max turnaround" />
            </motion.div>
          </div>
        </motion.section>

        {/* ── SERVICES ─────────────────────────────────────────────────────── */}
        <section style={{ position: "relative", zIndex: 10, padding: "2rem 2rem 5rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "2.5rem" }}>
              <span style={{ fontSize: "0.7rem", color: MUTED, textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 500 }}>Our services</span>
              <div style={{ flex: 1, height: "0.5px", background: BORDER }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
              {SERVICES.map((service, i) => (
                <ServiceCard key={service.id} service={service} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section style={{ position: "relative", zIndex: 10, padding: "0 2rem 6rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              style={{
                position: "relative", overflow: "hidden",
                background: `linear-gradient(135deg, ${NAVY2} 0%, rgba(79,110,247,0.08) 100%)`,
                border: `0.5px solid rgba(79,110,247,0.2)`,
                borderRadius: 24, padding: "4rem 3rem", textAlign: "center"
              }}
            >
              {/* decorative lines */}
              <div style={{
                position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                width: "60%", height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(79,110,247,0.6), transparent)"
              }} />
              <div style={{
                position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
                width: "40%", height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)"
              }} />

              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6, marginBottom: "1.25rem",
                background: "rgba(79,110,247,0.1)", border: "0.5px solid rgba(79,110,247,0.25)",
                borderRadius: 100, padding: "5px 14px", fontSize: "11px", color: "#a5b4fc",
                textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500
              }}>
                <Sparkles size={11} /> Custom documents
              </div>

              <h2 style={{
                fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                color: "#fff", marginBottom: "1rem", lineHeight: 1.2, letterSpacing: "-0.02em"
              }}>
                Need a custom legal document?
              </h2>

              <p style={{ color: MUTED, fontSize: "1rem", marginBottom: "2.5rem", maxWidth: 460, margin: "0 auto 2.5rem", lineHeight: 1.65 }}>
                Our AI generates personalized legal documents in minutes, or connects you with expert lawyers for complex cases.
              </p>

              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/lawyers" style={{ textDecoration: "none" }}>
                  <motion.div
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
                    style={{
                      display: "flex", alignItems: "center", gap: 8,
                      background: "linear-gradient(135deg, #4f6ef7, #7c3aed)",
                      borderRadius: 10, padding: "12px 24px",
                      fontSize: "0.9rem", fontWeight: 500, color: "#fff", cursor: "pointer"
                    }}
                  >
                    <Users size={15} /> Consult a lawyer <ChevronRight size={14} />
                  </motion.div>
                </Link>
                <Link href="/legal-gpt" style={{ textDecoration: "none" }}>
                  <motion.div
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
                    style={{
                      display: "flex", alignItems: "center", gap: 8,
                      background: "rgba(255,255,255,0.05)", border: `0.5px solid ${BORDER}`,
                      borderRadius: 10, padding: "12px 24px",
                      fontSize: "0.9rem", fontWeight: 500, color: "rgba(255,255,255,0.8)", cursor: "pointer"
                    }}
                  >
                    <Sparkles size={15} /> Try AI assistant <ChevronRight size={14} />
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────────────── */}
        <footer style={{
          position: "relative", zIndex: 10,
          background: "rgba(0,0,0,0.4)", backdropFilter: "blur(20px)",
          borderTop: `0.5px solid ${BORDER}`, padding: "3rem 2rem"
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "3rem" }} className="footer-grid">

              <div>
                <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: "1rem" }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 9,
                    background: "linear-gradient(135deg, rgba(79,110,247,0.25), rgba(124,58,237,0.2))",
                    border: "0.5px solid rgba(79,110,247,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    <Scale size={15} color={ACCENT} />
                  </div>
                  <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.1rem", color: "#fff" }}>NyayMitra</span>
                </Link>
                <p style={{ fontSize: "0.82rem", color: MUTED, lineHeight: 1.65, maxWidth: 280 }}>
                  Empowering citizens with accessible legal solutions through technology. Trusted by thousands across India.
                </p>
              </div>

              <div>
                <div style={{ fontSize: "0.72rem", color: MUTED, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 500, marginBottom: "1rem" }}>
                  Quick links
                </div>
                {["Home", "Services", "About us", "Contact"].map(link => (
                  <div key={link} style={{ marginBottom: "0.6rem" }}>
                    <Link href={`/${link.toLowerCase().replace(" ", "-")}`}
                      style={{ fontSize: "0.85rem", color: MUTED, textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                      onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
                    >{link}</Link>
                  </div>
                ))}
              </div>

              <div>
                <div style={{ fontSize: "0.72rem", color: MUTED, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 500, marginBottom: "1rem" }}>
                  Contact us
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.82rem", color: MUTED, marginBottom: "0.75rem" }}>
                  <Mail size={13} color="#4ade80" /> contact@nyaymitra.tech
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.82rem", color: MUTED }}>
                  <Phone size={13} color="#4ade80" /> +91 79705 96183
                </div>
              </div>
            </div>

            <div style={{ marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: `0.5px solid ${BORDER}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.3)" }}>
                © {new Date().getFullYear()} NyayMitra. All rights reserved.
              </span>
              <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.3)" }}>
                Built with care for Indian citizens
              </span>
            </div>
          </div>
        </footer>

        <style>{`
          @media (max-width: 768px) {
            .footer-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
            .hidden.md\\:flex { display: none !important; }
          }
        `}</style>
      </div>
    </>
  )
}