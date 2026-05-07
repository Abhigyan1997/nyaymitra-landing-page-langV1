"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  PenTool, Calculator, FileText, Download, ArrowRight, Scale,
  Mail, Phone, Users, Menu, X, Sparkles, Star, ChevronRight
} from "lucide-react"
import Link from "next/link"

/* ─── design tokens (White Background, Black & Gold) ─────────────────────── */
const WHITE = "#ffffff"
const BLACK = "#0a0a0a"
const BLACK2 = "#1a1a1a"
const GOLD = "#c9a84c"
const GOLD_LT = "#e8c96a"
const GOLD_DK = "#8b6914"
const GOLD_PALE = "rgba(201,168,76,0.08)"
const MUTED = "rgba(0,0,0,0.45)"
const MUTED_LIGHT = "rgba(0,0,0,0.55)"
const BORDER = "rgba(0,0,0,0.08)"
const BORDER_GOLD = "rgba(201,168,76,0.25)"

/* ─── floating grid dots (subtle gold) ───────────────────────────────────── */
const DOTS = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: (i * 37 + 13) % 100,
  top: (i * 53 + 7) % 100,
  delay: (i * 0.4) % 3,
  size: i % 3 === 0 ? 2 : 1,
}))

/* ─── services data (Affidavit focused) ──────────────────────────────────── */
const SERVICES = [
  {
    id: "name-change",
    title: "Name Change Affidavit",
    subtitle: "Marriage / Divorce / Personal",
    description: "Get a legally valid name change affidavit accepted by passport offices, government bodies, and courts.",
    icon: PenTool,
    accentColor: GOLD,
    glowColor: "rgba(201,168,76,0.08)",
    popular: true,
    tags: ["Name Change", "Passport", "Marriage"],
    features: ["PDF Generation", "Lawyer Reviewed", "Instant Download"],
    pricing: "₹1,199",
    pricingNote: "includes notary guidance",
    href: "/services/name-change",
    ctaText: "Create affidavit",
    ctaIcon: FileText,
  },
  {
    id: "address-proof",
    title: "Address Proof Affidavit",
    subtitle: "KYC & Bank approved",
    description: "Legal address verification affidavit for bank KYC, government applications, and property registration.",
    icon: FileText,
    accentColor: GOLD,
    glowColor: "rgba(201,168,76,0.08)",
    popular: false,
    tags: ["Address Proof", "Bank KYC", "Rental"],
    features: ["Pre-fillable PDF", "Expert Review", "2hr Delivery"],
    pricing: "₹999",
    pricingNote: "express option available",
    href: "/services/address-affidavit",
    ctaText: "Create now",
    ctaIcon: FileText,
  },
  {
    id: "income-proof",
    title: "Income Proof Affidavit",
    subtitle: "Loans & Visa ready",
    description: "Court-admissible income declaration affidavit for loan applications, visa processing, and government schemes.",
    icon: Calculator,
    accentColor: GOLD,
    glowColor: "rgba(201,168,76,0.08)",
    popular: false,
    tags: ["Income Proof", "Visa", "Loans"],
    features: ["Court Admissible", "Lawyer Drafted", "24hr Support"],
    pricing: "₹999",
    pricingNote: "includes free revisions",
    href: "/services/income-affidavit",
    ctaText: "Get started",
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
      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.6rem, 4vw, 2rem)", color: BLACK, letterSpacing: "-0.02em" }}>
        {count.toLocaleString()}{suffix}
      </div>
      <div style={{ fontSize: "0.7rem", color: MUTED, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "4px" }}>
        {label}
      </div>
    </div>
  )
}

/* ─── service card (White Background, Black & Gold) ──────────────────────── */
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
      <div style={{
        position: "relative", zIndex: 1, height: "100%",
        background: WHITE,
        border: `1px solid ${hovered ? GOLD : BORDER}`,
        borderRadius: 20, padding: "1.75rem",
        transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 35px -12px rgba(0,0,0,0.1)" : "0 1px 3px rgba(0,0,0,0.03)",
        display: "flex", flexDirection: "column", gap: "1.25rem",
      }}>

        {/* top row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
            background: GOLD_PALE, border: `1px solid ${BORDER_GOLD}`,
            transition: "transform 0.3s", transform: hovered ? "rotate(8deg) scale(1.05)" : "none"
          }}>
            <Icon size={20} color={GOLD} />
          </div>
          {service.popular && (
            <div style={{
              display: "flex", alignItems: "center", gap: 4,
              background: GOLD_PALE, border: `1px solid ${BORDER_GOLD}`,
              borderRadius: 100, padding: "3px 10px",
              fontSize: "10px", color: GOLD_DK, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase"
            }}>
              <Star size={9} fill={GOLD} color={GOLD} /> Popular
            </div>
          )}
        </div>

        {/* heading */}
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.3rem", color: BLACK, lineHeight: 1.2, marginBottom: 4, fontWeight: 600 }}>
            {service.title}
          </div>
          <div style={{ fontSize: "0.75rem", color: MUTED, textTransform: "uppercase", letterSpacing: "0.07em" }}>
            {service.subtitle}
          </div>
        </div>

        {/* price */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: GOLD_DK, fontWeight: 700 }}>
            {service.pricing}
          </span>
          <span style={{ fontSize: "0.72rem", color: MUTED }}>{service.pricingNote}</span>
        </div>

        {/* description */}
        <p style={{ fontSize: "0.85rem", color: MUTED_LIGHT, lineHeight: 1.65, margin: 0 }}>
          {service.description}
        </p>

        {/* feature pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {service.features.map(f => (
            <span key={f} style={{
              fontSize: "11px", padding: "4px 10px", borderRadius: 100,
              background: GOLD_PALE, color: GOLD_DK,
              border: `1px solid ${BORDER_GOLD}`, fontWeight: 500
            }}>{f}</span>
          ))}
        </div>

        {/* tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {service.tags.map(t => (
            <span key={t} style={{
              fontSize: "11px", padding: "3px 9px", borderRadius: 100,
              border: `1px solid ${BORDER}`, color: MUTED
            }}>{t}</span>
          ))}
        </div>

        {/* divider */}
        <div style={{ height: "0.5px", background: BORDER }} />

        {/* cta */}
        <Link href={service.href} style={{ textDecoration: "none" }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            color: GOLD_DK, fontSize: "0.85rem", fontWeight: 600,
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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: ${WHITE};
          color: ${BLACK};
          margin: 0;
          -webkit-font-smoothing: antialiased;
        }

        .grid-bg {
          background-image:
            linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        ::selection { background: rgba(201,168,76,0.25); color: ${BLACK}; }

        .nav-glass {
          background: ${scrolled ? `rgba(255,255,255,0.98)` : "transparent"};
          backdrop-filter: ${scrolled ? "blur(20px)" : "none"};
          border-bottom: 1px solid ${scrolled ? BORDER : "transparent"};
          transition: all 0.35s ease;
        }

        .eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'DM Mono', monospace; font-size: 9.5px; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase; color: ${GOLD_DK};
        }
        .eyebrow::before, .eyebrow::after {
          content:''; width: 22px; height: 1px; background: ${GOLD}; flex-shrink:0;
        }

        @keyframes pulse {
          from { opacity: 0.2; }
          to { opacity: 0.6; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: WHITE, position: "relative", overflow: "hidden" }}>

        {/* background layers */}
        <div className="grid-bg" style={{ position: "fixed", inset: 0, zIndex: 0 }} />

        {/* floating dots - gold */}
        <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
          {DOTS.map(d => (
            <div key={d.id} style={{
              position: "absolute", left: `${d.left}%`, top: `${d.top}%`,
              width: d.size, height: d.size, borderRadius: "50%",
              background: d.id % 2 === 0 ? `rgba(201,168,76,0.3)` : `rgba(139,107,20,0.2)`,
              animation: `pulse ${2 + d.delay}s ease-in-out ${d.delay}s infinite alternate`
            }} />
          ))}
        </div>

        {/* ── NAV ──────────────────────────────────────────────────────────── */}
        <nav className="nav-glass" style={{ position: "sticky", top: 0, zIndex: 100, padding: "0 2rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>

            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: `linear-gradient(135deg, ${GOLD_PALE}, rgba(139,107,20,0.1))`,
                border: `1px solid ${BORDER_GOLD}`,
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <Scale size={18} color={GOLD_DK} />
              </div>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 700, color: BLACK }}>
                  Nyay<span style={{ color: GOLD_DK }}>Mitra</span>
                </div>
                {/* <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "6.5px", color: GOLD_DK, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                  Legal Tech · India
                </div> */}
              </div>
            </Link>

            {/* desktop nav */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }} className="hidden md:flex">
              {["Services", "Find lawyers", "About", "Contact"].map(item => (
                <Link key={item} href={`/${item.toLowerCase().replace(" ", "-")}`}
                  style={{ fontSize: "0.85rem", color: MUTED, padding: "6px 14px", borderRadius: 8, textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = BLACK)}
                  onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
                >
                  {item}
                </Link>
              ))}
              <Link href="/legal-gpt" style={{ textDecoration: "none" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 6,
                  background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DK})`,
                  borderRadius: 8, padding: "8px 18px",
                  fontSize: "0.85rem", fontWeight: 600, color: WHITE, cursor: "pointer"
                }}>
                  <Sparkles size={13} /> AI assistant
                </div>
              </Link>
            </div>

            {/* mobile hamburger */}
            <button
              style={{ background: "none", border: `1px solid ${BORDER}`, borderRadius: 8, color: BLACK, cursor: "pointer", padding: "7px 10px" }}
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {/* mobile menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                style={{ overflow: "hidden", borderTop: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.98)", backdropFilter: "blur(20px)" }}
              >
                <div style={{ padding: "1rem 0", display: "flex", flexDirection: "column", gap: 4 }}>
                  {["Services", "Find lawyers", "About", "Contact"].map(item => (
                    <Link key={item} href={`/${item.toLowerCase().replace(" ", "-")}`}
                      style={{ color: MUTED, fontSize: "0.9rem", padding: "10px 0", textDecoration: "none" }}
                      onClick={() => setMenuOpen(false)}
                    >{item}</Link>
                  ))}
                  <Link href="/legal-gpt" style={{ textDecoration: "none" }} onClick={() => setMenuOpen(false)}>
                    <div style={{
                      marginTop: 8, background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DK})`,
                      borderRadius: 8, padding: "10px 18px", fontSize: "0.9rem", color: WHITE,
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

            {/* eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="eyebrow"
              style={{ justifyContent: "center", marginBottom: "1.5rem" }}
            >
              Instant legal solutions
            </motion.div>

            {/* headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2.6rem, 6vw, 4.2rem)",
                lineHeight: 1.1, letterSpacing: "-0.02em",
                margin: "0 0 1.5rem",
                color: BLACK,
              }}
            >
              Smart legal services<br />
              <span style={{ color: GOLD_DK }}>at your fingertips</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontSize: "clamp(0.95rem, 3.5vw, 1.05rem)", color: MUTED, maxWidth: 520, margin: "0 auto 3rem", lineHeight: 1.7 }}
            >
              Affidavits, legal documents, and expert consultations — lawyer-drafted and delivered within hours.
            </motion.p>

            {/* stat strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
              style={{
                display: "inline-flex", gap: "3rem", alignItems: "center",
                background: GOLD_PALE, border: `1px solid ${BORDER_GOLD}`,
                borderRadius: 16, padding: "1.25rem 2.5rem",
              }}
            >
              <AnimatedStat value={100} suffix="+" label="Documents processed" />
              <div style={{ width: "0.5px", height: 40, background: BORDER }} />
              <AnimatedStat value={98} suffix="%" label="Satisfaction rate" />
              <div style={{ width: "0.5px", height: 40, background: BORDER }} />
              <AnimatedStat value={4} suffix=" hrs" label="Max turnaround" />
            </motion.div>
          </div>
        </motion.section>

        {/* ── SERVICES ─────────────────────────────────────────────────────── */}
        <section style={{ position: "relative", zIndex: 10, padding: "2rem 2rem 5rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "2.5rem" }}>
              <span className="eyebrow" style={{ fontSize: "0.7rem", letterSpacing: "0.12em" }}>Our services</span>
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
                background: `linear-gradient(135deg, ${GOLD_PALE} 0%, rgba(201,168,76,0.03) 100%)`,
                border: `1px solid ${BORDER_GOLD}`,
                borderRadius: 24, padding: "4rem 3rem", textAlign: "center"
              }}
            >
              {/* decorative lines */}
              <div style={{
                position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                width: "60%", height: "1px",
                background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`
              }} />
              <div style={{
                position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
                width: "40%", height: "1px",
                background: `linear-gradient(90deg, transparent, ${GOLD_DK}, transparent)`
              }} />

              <div className="eyebrow" style={{ justifyContent: "center", marginBottom: "1.25rem" }}>
                Custom documents
              </div>

              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                color: BLACK, marginBottom: "1rem", lineHeight: 1.2, letterSpacing: "-0.02em"
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
                      background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DK})`,
                      borderRadius: 10, padding: "12px 24px",
                      fontSize: "0.9rem", fontWeight: 600, color: WHITE, cursor: "pointer"
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
                      background: WHITE, border: `1px solid ${BORDER_GOLD}`,
                      borderRadius: 10, padding: "12px 24px",
                      fontSize: "0.9rem", fontWeight: 500, color: BLACK, cursor: "pointer"
                    }}
                  >
                    <Sparkles size={15} color={GOLD_DK} /> Try AI assistant <ChevronRight size={14} />
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────────────── */}
        <footer style={{
          position: "relative", zIndex: 10,
          background: BLACK,
          borderTop: `1px solid rgba(255,255,255,0.08)`,
          padding: "3rem 2rem"
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "3rem" }} className="footer-grid">

              <div>
                <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: "1rem" }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 9,
                    background: `linear-gradient(135deg, ${GOLD_PALE}, rgba(139,107,20,0.15))`,
                    border: `1px solid ${BORDER_GOLD}`,
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    <Scale size={15} color={GOLD} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontWeight: 700, color: WHITE }}>
                      Nyay<span style={{ color: GOLD }}>Mitra</span>
                    </div>
                    {/* <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "6px", color: GOLD_DK, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                      Legal Tech · India
                    </div> */}
                  </div>
                </Link>
                <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.65, maxWidth: 280 }}>
                  Legally valid affidavits online in minutes. Expert reviewed, court approved, trusted by Indians.
                </p>
              </div>

              <div>
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 500, marginBottom: "1rem" }}>
                  Quick links
                </div>
                {["Home", "Services", "About us", "Contact"].map(link => (
                  <div key={link} style={{ marginBottom: "0.6rem" }}>
                    <Link href={`/${link.toLowerCase().replace(" ", "-")}`}
                      style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = WHITE)}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                    >{link}</Link>
                  </div>
                ))}
              </div>

              <div>
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 500, marginBottom: "1rem" }}>
                  Contact us
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.82rem", color: "rgba(255,255,255,0.45)", marginBottom: "0.75rem" }}>
                  <Mail size={13} color={GOLD} /> contact@nyaymitra.tech
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.82rem", color: "rgba(255,255,255,0.45)" }}>
                  <Phone size={13} color={GOLD} /> +91 79705 96183
                </div>
              </div>
            </div>

            <div style={{ marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.3)" }}>
                © {new Date().getFullYear()} NyayMitra. All rights reserved.
              </span>
              <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.3)" }}>
                Made with care in India 🇮🇳
              </span>
            </div>
          </div>
        </footer>

        <style>{`
          @media (max-width: 768px) {
            .footer-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
            .hidden.md\\:flex { display: none !important; }
          }
          @media (max-width: 480px) {
            .nav-glass { padding: 0 1rem !important; }
          }
        `}</style>
      </div>
    </>
  )
}