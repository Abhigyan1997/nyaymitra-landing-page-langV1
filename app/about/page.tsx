// app/about/page.tsx
"use client"

import { useState, useEffect, useRef, type ReactNode, type CSSProperties } from "react"
import Link from "next/link"
import {
  Scale, Shield, Eye, Target, ArrowRight, AlertCircle,
  Sparkles, CheckCircle, Users, Zap, BadgeCheck,
  TrendingUp, Star, ArrowLeft, ChevronRight, Menu, X,
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
    @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    @keyframes drawLine  { from{transform:scaleX(0)} to{transform:scaleX(1)} }
    @keyframes marquee   { from{transform:translateX(0)} to{transform:translateX(-50%)} }
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

    .value-card {
      background: var(--white);
      border: 1px solid var(--ink-7);
      border-radius: var(--radius-lg);
      padding: 32px 28px;
      position: relative; overflow: hidden;
      transition: all 0.28s cubic-bezier(0.16,1,0.3,1);
      cursor: default;
    }
    .value-card::after {
      content: '';
      position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, var(--gold-dk), var(--gold), var(--gold-lt));
      transform: scaleX(0); transform-origin: left;
      transition: transform 0.32s cubic-bezier(0.16,1,0.3,1);
    }
    .value-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 24px 64px rgba(12,11,9,0.09);
      border-color: var(--ink-5);
    }
    .value-card:hover::after { transform: scaleX(1); }

    .team-card {
      background: var(--white);
      border: 1px solid var(--ink-7);
      border-radius: var(--radius-lg);
      overflow: hidden;
      transition: all 0.28s cubic-bezier(0.16,1,0.3,1);
    }
    .team-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 24px 64px rgba(12,11,9,0.1);
      border-color: var(--ink-5);
    }

    .mission-card {
      background: var(--white);
      border: 1px solid var(--ink-7);
      padding: 44px 40px;
      position: relative; overflow: hidden;
      transition: background 0.22s;
      cursor: default;
    }
    .mission-card:hover { background: var(--ink-9); }

    .stat-cell {
      padding: 36px 28px;
      text-align: center;
      border-right: 1px solid rgba(255,255,255,0.06);
      position: relative;
    }
    .stat-cell:last-child { border-right: none; }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--ink-9); }
    ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--gold-dk); }
    ::selection { background: var(--gold-pale); color: var(--gold-dk); }

    /* ── Responsive ── */
    @media (max-width: 900px) {
      .story-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
      .mission-grid { grid-template-columns: 1fr !important; }
      .mission-card-r { border-left: none !important; border-top: 1px solid var(--ink-7) !important; }
      .stat-bar-grid { grid-template-columns: repeat(2,1fr) !important; }
      .stat-cell { border-right: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06); }
      .stat-cell:nth-child(2n) { border-right: none; }
      .cta-inner { grid-template-columns: 1fr !important; gap: 48px !important; }
    }
    @media (max-width: 640px) {
      .values-grid { grid-template-columns: 1fr 1fr !important; }
      .team-grid { grid-template-columns: 1fr !important; }
      .hero-pad { padding: 56px 20px 72px !important; }
      .section-pad { padding: 60px 20px !important; }
      .mission-card { padding: 28px 22px !important; }
      .cta-btns { flex-direction: column !important; }
      .cta-btns a { justify-content: center !important; }
    }
    @media (max-width: 480px) {
      .values-grid { grid-template-columns: 1fr !important; }
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

/* ─── DATA ───────────────────────────────────────────────────────────────────── */
const STATS = [
  { value: "100+", labelEn: "Active Users" },
  { value: "60+", labelEn: "Verified Lawyers" },
  { value: "95%", labelEn: "Client Satisfaction" },
  { value: "24/7", labelEn: "AI Support Available" },
]

const VALUES = [
  {
    n: "01", title: "Accessibility",
    desc: "Making legal help accessible to every Indian, regardless of location or economic background.",
    icon: Users,
  },
  {
    n: "02", title: "Transparency",
    desc: "Clear, honest communication about legal processes, costs, and expected outcomes.",
    icon: Eye,
  },
  {
    n: "03", title: "Quality",
    desc: "Maintaining the highest standards in legal advice and our lawyer verification process.",
    icon: BadgeCheck,
  },
  {
    n: "04", title: "Innovation",
    desc: "Leveraging cutting-edge AI to revolutionise legal services for a billion people.",
    icon: Zap,
  },
]

const TEAM = [
  {
    initials: "AA",
    name: "Alok Abhigyan",
    role: "Founder & CEO",
    tags: ["Full Stack", "Product Strategy"],
    bio: "Visionary leader driving the convergence of legal expertise and technology to democratise legal access across India.",
    accentColor: "var(--ink)",
    avatarBg: "var(--ink-9)",
    avatarColor: "var(--gold)",
  },
  {
    initials: "BR",
    name: "Bharat Rajak",
    role: "Director of Legal Affairs",
    tags: ["Civil Law", "Criminal Law"],
    bio: "Senior advocate with 25+ years of experience ensuring legal integrity and compliance across the platform.",
    accentColor: "var(--green)",
    avatarBg: "#f0fdf4",
    avatarColor: "var(--green)",
  },
  {
    initials: "TW",
    name: "Twinkle",
    role: "Co-Founder",
    tags: ["Growth Strategy", "Marketing"],
    bio: "Drives brand positioning and user acquisition strategy to strengthen NyayMitra's trust-driven growth.",
    accentColor: "var(--gold-dk)",
    avatarBg: "var(--gold-pale)",
    avatarColor: "var(--gold-dk)",
  },
]

/* ─── PAGE ───────────────────────────────────────────────────────────────────── */
export default function AboutPage() {
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false)
  }

  if (!mounted) return null

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
            {/* Logo  exact match to landing page */}
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

            {/* Desktop Navigation Links - always visible on desktop, hidden on mobile */}
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

            {/* Mobile Menu Button - only visible on mobile */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "8px",
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

          {/* Mobile Menu Dropdown - only visible when open AND on mobile */}
          <div className={`mobile-menu-dropdown ${mobileMenuOpen ? "mobile-open" : ""}`} style={{
            position: "absolute",
            top: 66,
            left: 0,
            right: 0,
            background: "var(--white)",
            borderBottom: "1px solid var(--ink-7)",
            boxShadow: "0 4px 24px rgba(12,11,9,0.08)",
            padding: "20px",
            animation: mobileMenuOpen ? "mobileMenuFade 0.3s ease-out" : "none",
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
        </nav>

        {/* ══════════════════════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="hero-pad" style={{
          padding: "80px 28px 100px",
          position: "relative", overflow: "hidden",
        }}>
          {/* Grid bg */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)",
            backgroundSize: "80px 80px", pointerEvents: "none",
          }} />
          {/* Glow */}
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
                  <span style={{
                    width: 7, height: 7, borderRadius: "50%", background: "#22c55e",
                    animation: "pulseDot 2.2s ease-in-out infinite", display: "block",
                  }} />
                </div>
                <span style={{ fontFamily: "var(--mono)", fontSize: "9.5px", color: "var(--ink-4)", letterSpacing: "0.1em" }}>
                  Empowering Legal Access Since 2025
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
                Justice, made<br />
                <span className="gold-text" style={{ fontStyle: "italic", fontWeight: 300, display: "inline-block", lineHeight: 1.3 }}>
                  accessible for all.
                </span>
              </h1>

              <OrnamentLine />

              <p style={{
                fontFamily: "var(--sans)", fontSize: "15.5px",
                color: "var(--ink-4)", lineHeight: 1.85,
                maxWidth: 500, fontWeight: 300,
              }}>
                Democratising legal access across India through AI-powered technology, verified expertise,
                and a commitment to every citizen's right to understand the law.
              </p>

              {/* Trust pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 32 }}>
                {[
                  { icon: BadgeCheck, text: "Bar Council Verified Lawyers" },
                  { icon: Star, text: "4.9★ Rated Platform" },
                  { icon: Zap, text: "AI-Powered Legal Guidance" },
                  { icon: TrendingUp, text: "Startup & MSME Friendly" },
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

        {/* Divider */}
        <div style={{ height: 1, background: "var(--ink-7)" }} />

        {/* ══════════════════════════════════════════════════════════════════════
            MISSION & VISION
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="section-pad" style={{ padding: "96px 28px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 56 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                  <span className="eyebrow">Our Purpose</span>
                </div>
                <h2 style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(28px, 4vw, 52px)",
                  fontWeight: 600, letterSpacing: "-0.025em", color: "var(--ink)", lineHeight: 1.1,
                }}>
                  Why we{" "}
                  <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--ink-3)" }}>exist.</span>
                </h2>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <div className="mission-grid" style={{
                display: "grid", gridTemplateColumns: "1fr 1fr",
                border: "1px solid var(--ink-7)", borderRadius: "var(--radius-xl)", overflow: "hidden",
              }}>
                {[
                  {
                    num: "01", icon: Target,
                    title: "Our Mission",
                    body: "To bridge the gap between ordinary citizens and legal help  offering a platform that simplifies legal access using AI, real lawyers, and regional language support. Starting minimal, driven by a big purpose.",
                  },
                  {
                    num: "02", icon: Eye,
                    title: "Our Vision",
                    body: "To become the go-to legal companion for every Indian  especially those in Tier 2 and 3 cities  making legal awareness a basic right, not a privilege. One click at a time.",
                    right: true,
                  },
                ].map(({ num, icon: Icon, title, body, right }) => (
                  <div key={num} className={`mission-card${right ? " mission-card-r" : ""}`}
                    style={{ borderLeft: right ? "1px solid var(--ink-7)" : "none" }}>
                    {/* Large faded number */}
                    <div style={{
                      position: "absolute", top: 20, right: 24,
                      fontFamily: "var(--serif)", fontSize: "80px",
                      lineHeight: 1, color: "rgba(12,11,9,0.04)",
                      userSelect: "none", pointerEvents: "none",
                    }}>{num}</div>

                    <div style={{
                      width: 46, height: 46, borderRadius: 12, flexShrink: 0,
                      background: "var(--ink-9)", border: "1px solid var(--ink-7)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "var(--gold-dk)", marginBottom: 22,
                    }}>
                      <Icon style={{ width: 19, height: 19 }} />
                    </div>

                    <h3 style={{
                      fontFamily: "var(--serif)", fontSize: "clamp(20px, 3vw, 26px)",
                      fontWeight: 600, color: "var(--ink)",
                      letterSpacing: "-0.015em", marginBottom: 14, lineHeight: 1.2,
                    }}>{title}</h3>

                    <p style={{
                      fontFamily: "var(--sans)", fontSize: "14px",
                      color: "var(--ink-4)", lineHeight: 1.85, fontWeight: 300,
                    }}>{body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            STATS BAR
        ══════════════════════════════════════════════════════════════════════ */}
        <div style={{
          background: "var(--ink)",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px", pointerEvents: "none",
          }} />
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div className="stat-bar-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
              {STATS.map((s, i) => (
                <div key={s.labelEn} className="stat-cell" style={{
                  borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}>
                  <div style={{
                    fontFamily: "var(--serif)", fontSize: "clamp(32px,5vw,44px)",
                    fontWeight: 600, lineHeight: 1, marginBottom: 8,
                  }} className="gold-text">
                    {s.value}
                  </div>
                  <div style={{
                    fontFamily: "var(--mono)", fontSize: "8.5px",
                    color: "rgba(255,255,255,0.25)", letterSpacing: "0.18em", textTransform: "uppercase",
                  }}>
                    {s.labelEn}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            STORY
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="section-pad" style={{
          padding: "96px 28px",
          background: "var(--ink-9)",
          borderTop: "1px solid var(--ink-7)", borderBottom: "1px solid var(--ink-7)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", right: 0, bottom: 0,
            width: 360, height: 360,
            background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div className="story-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 72, alignItems: "start" }}>

              {/* Sticky left */}
              <Reveal>
                <div style={{ position: "sticky", top: 96 }}>
                  <div style={{
                    fontFamily: "var(--serif)", fontSize: "clamp(52px,8vw,88px)",
                    fontWeight: 600, lineHeight: 1, marginBottom: 6,
                  }} className="gold-text">2025</div>

                  <div style={{
                    fontFamily: "var(--mono)", fontSize: "8.5px", fontWeight: 500,
                    color: "var(--ink-5)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20,
                  }}>Founded</div>

                  <OrnamentLine />

                  <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 14 }}>
                    <span className="eyebrow">Our Journey</span>
                  </div>

                  <h2 style={{
                    fontFamily: "var(--serif)",
                    fontSize: "clamp(26px, 3.5vw, 40px)",
                    fontWeight: 600, letterSpacing: "-0.02em",
                    color: "var(--ink)", lineHeight: 1.15,
                  }}>
                    The story<br />behind<br />
                    <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--ink-3)" }}>NyayMitra.</span>
                  </h2>
                </div>
              </Reveal>

              {/* Story body */}
              <Reveal delay={80}>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {[
                    "NyayMitra was launched in June 2025, built on a simple yet critical insight: even today, millions of people in India struggle to access basic legal support. From tenant disputes and consumer complaints to family-related matters, legal assistance is often perceived as complex, expensive, and difficult to navigate.",
                    null, // blockquote
                    "Observing this gap firsthand  especially how individuals are often misled or disadvantaged due to a lack of legal awareness  led to the creation of NyayMitra. The goal: build a platform that bridges the gap between everyday users and reliable legal guidance.",
                    "NyayMitra started as a focused MVP with a clear mission. By combining technology with a network of verified legal professionals, the platform enables users to gain initial clarity through AI-powered guidance and seamlessly connect with lawyers when needed.",
                    "While still in its early stages, NyayMitra is steadily evolving into a trust-first legal ecosystem. Each improvement, user interaction, and lawyer onboarding contributes to the larger vision.",
                  ].map((para, i) => (
                    para === null ? (
                      /* Blockquote */
                      <div key="bq" style={{
                        borderLeft: "3px solid var(--gold)",
                        paddingLeft: 24, paddingTop: 12, paddingBottom: 12,
                        background: "var(--gold-pale)",
                        borderRadius: "0 var(--radius) var(--radius) 0",
                      }}>
                        <p style={{
                          fontFamily: "var(--serif)", fontSize: "clamp(16px, 2.5vw, 20px)",
                          fontStyle: "italic", fontWeight: 400,
                          color: "var(--ink)", lineHeight: 1.7,
                        }}>
                          "Legal awareness should be a fundamental service, not a privilege reserved for the few."
                        </p>
                      </div>
                    ) : (
                      <p key={i} style={{
                        fontFamily: "var(--sans)", fontSize: "14.5px",
                        color: "var(--ink-4)", lineHeight: 1.9, fontWeight: 300,
                      }}>{para}</p>
                    )
                  ))}

                  {/* Milestones */}
                  <div style={{ marginTop: 8 }}>
                    <div style={{
                      fontFamily: "var(--mono)", fontSize: "8.5px", color: "var(--ink-5)",
                      letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 16,
                    }}>Key milestones</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                      {[
                        { year: "Jun 2025", event: "Platform launched with core legal AI features" },
                        { year: "Aug 2025", event: "60+ lawyers onboarded across 10+ cities" },
                        { year: "Dec 2025", event: "Compliance & startup legal plans introduced" },
                        { year: "2026 →", event: "Scaling to Tier 2 & 3 cities across India" },
                      ].map(({ year, event }, i, arr) => (
                        <div key={year} style={{
                          display: "flex", gap: 20, alignItems: "flex-start",
                          paddingBottom: i < arr.length - 1 ? 16 : 0,
                          paddingTop: i > 0 ? 16 : 0,
                          borderTop: i > 0 ? "1px solid var(--ink-7)" : "none",
                        }}>
                          <span style={{
                            fontFamily: "var(--mono)", fontSize: "9.5px",
                            color: "var(--gold-dk)", letterSpacing: "0.1em",
                            flexShrink: 0, marginTop: 2, minWidth: 60,
                          }}>{year}</span>
                          <span style={{
                            fontFamily: "var(--sans)", fontSize: "13.5px",
                            color: "var(--ink-3)", lineHeight: 1.65, fontWeight: 400,
                          }}>{event}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            VALUES
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="section-pad" style={{ padding: "96px 28px", background: "var(--white)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 56 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                  <span className="eyebrow">Core Principles</span>
                </div>
                <h2 style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(28px, 4vw, 52px)",
                  fontWeight: 600, letterSpacing: "-0.025em", color: "var(--ink)", lineHeight: 1.1,
                }}>
                  What{" "}
                  <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--ink-3)" }}>guides us.</span>
                </h2>
                <p style={{
                  fontFamily: "var(--sans)", fontSize: "14px",
                  color: "var(--ink-5)", fontWeight: 300, marginTop: 14,
                  maxWidth: 420, margin: "14px auto 0",
                }}>
                  Four principles that inform every decision we make at NyayMitra.
                </p>
              </div>
            </Reveal>

            <div className="values-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
              {VALUES.map((v, i) => (
                <Reveal key={v.n} delay={i * 70}>
                  <div className="value-card">
                    {/* Ghost number */}
                    <div style={{
                      fontFamily: "var(--serif)", fontSize: "56px", lineHeight: 1,
                      color: "rgba(12,11,9,0.04)", userSelect: "none",
                      marginBottom: 16,
                    }}>{v.n}</div>

                    <div style={{
                      width: 42, height: 42, borderRadius: 11,
                      background: "var(--ink-9)", border: "1px solid var(--ink-7)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "var(--gold-dk)", marginBottom: 18,
                    }}>
                      <v.icon style={{ width: 18, height: 18 }} />
                    </div>

                    <h4 style={{
                      fontFamily: "var(--serif)", fontSize: "20px", fontWeight: 600,
                      color: "var(--ink)", marginBottom: 10, letterSpacing: "-0.01em",
                    }}>{v.title}</h4>

                    <p style={{
                      fontFamily: "var(--sans)", fontSize: "13px",
                      color: "var(--ink-5)", lineHeight: 1.75, fontWeight: 300,
                    }}>{v.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <div style={{ height: 1, background: "var(--ink-7)" }} />

        {/* ══════════════════════════════════════════════════════════════════════
            TEAM
        ══════════════════════════════════════════════════════════════════════ */}
        <section className="section-pad" style={{
          padding: "96px 28px",
          background: "var(--ink-9)",
          borderBottom: "1px solid var(--ink-7)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", left: 0, top: 0,
            width: 400, height: 400,
            background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 60 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                  <span className="eyebrow">Leadership</span>
                </div>
                <h2 style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(28px, 4vw, 52px)",
                  fontWeight: 600, letterSpacing: "-0.025em", color: "var(--ink)", lineHeight: 1.1,
                }}>
                  The people behind<br />
                  <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--ink-3)" }}>the platform.</span>
                </h2>
                <p style={{
                  fontFamily: "var(--sans)", fontSize: "14px",
                  color: "var(--ink-5)", fontWeight: 300, marginTop: 14,
                  maxWidth: 400, margin: "14px auto 0",
                }}>
                  Legal experts and technologists committed to making justice accessible for all.
                </p>
              </div>
            </Reveal>

            <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
              {TEAM.map((member, i) => (
                <Reveal key={member.name} delay={i * 80}>
                  <div className="team-card">
                    {/* Accent top bar */}
                    <div style={{ height: 3, background: member.accentColor }} />

                    <div style={{ padding: "32px 28px" }}>
                      {/* Avatar */}
                      <div style={{
                        width: 56, height: 56, borderRadius: "50%",
                        background: member.avatarBg,
                        border: "2px solid var(--ink-7)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "var(--serif)", fontSize: "18px", fontWeight: 600,
                        color: member.avatarColor, marginBottom: 20, flexShrink: 0,
                      }}>
                        {member.initials}
                      </div>

                      <h3 style={{
                        fontFamily: "var(--serif)", fontSize: "22px",
                        fontWeight: 600, color: "var(--ink)",
                        letterSpacing: "-0.015em", marginBottom: 4, lineHeight: 1.2,
                      }}>{member.name}</h3>

                      <div style={{
                        fontFamily: "var(--mono)", fontSize: "8.5px", fontWeight: 500,
                        letterSpacing: "0.14em", textTransform: "uppercase",
                        color: "var(--ink-5)", marginBottom: 16,
                      }}>{member.role}</div>

                      {/* Tags */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                        {member.tags.map(tag => (
                          <span key={tag} style={{
                            fontFamily: "var(--sans)", fontSize: "10.5px", fontWeight: 500,
                            padding: "3px 10px", borderRadius: 100,
                            background: "var(--ink-8)", color: "var(--ink-3)",
                            border: "1px solid var(--ink-7)",
                          }}>{tag}</span>
                        ))}
                      </div>

                      <p style={{
                        fontFamily: "var(--sans)", fontSize: "13px",
                        color: "var(--ink-5)", lineHeight: 1.75, fontWeight: 300,
                      }}>{member.bio}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            CTA
        ══════════════════════════════════════════════════════════════════════ */}
        <section style={{
          background: "var(--ink)",
          position: "relative", overflow: "hidden",
          padding: "96px 28px",
        }}>
          {/* Grid bg */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(rgba(201,168,76,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px", pointerEvents: "none",
          }} />
          {/* Glow orbs */}
          <div style={{
            position: "absolute", left: "-5%", top: "50%", transform: "translateY(-50%)",
            width: 500, height: 500, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", right: "-5%", bottom: "-10%",
            width: 400, height: 400, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <Reveal>
              <div className="cta-inner" style={{
                display: "grid", gridTemplateColumns: "1fr 1fr",
                gap: 80, alignItems: "center",
              }}>
                {/* Left copy */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                    <Sparkles style={{ width: 11, height: 11, color: "var(--gold-dk)" }} />
                    <span style={{
                      fontFamily: "var(--mono)", fontSize: "8.5px", color: "var(--gold)",
                      letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500,
                    }}>Get started today</span>
                  </div>

                  <h2 style={{
                    fontFamily: "var(--serif)",
                    fontSize: "clamp(28px, 4.5vw, 56px)",
                    fontWeight: 600, color: "white",
                    letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: 16,
                  }}>
                    Ready for the legal help{" "}
                    <span className="gold-text" style={{ fontStyle: "italic", fontWeight: 300 }}>
                      you deserve?
                    </span>
                  </h2>

                  <OrnamentLine />

                  <p style={{
                    fontFamily: "var(--sans)", fontSize: "14.5px",
                    color: "rgba(255,255,255,0.45)", lineHeight: 1.85,
                    marginBottom: 36, fontWeight: 300,
                  }}>
                    Join thousands of Indians who trust NyayMitra for clear, accessible, and verified legal guidance.
                  </p>

                  <div className="cta-btns" style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    <Link href="/legal-ai" className="btn-gold">
                      <Sparkles style={{ width: 14, height: 14 }} />
                      Ask Legal AI
                    </Link>
                    <Link href="/lawyers" className="btn-gw" style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      background: "transparent", color: "rgba(255,255,255,0.65)",
                      fontFamily: "var(--sans)", fontSize: "13px", fontWeight: 500,
                      padding: "13px 22px", borderRadius: "var(--radius)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      textDecoration: "none", cursor: "pointer", transition: "all 0.22s",
                    }}
                      onMouseEnter={e => {
                        const a = e.currentTarget as HTMLAnchorElement
                        a.style.borderColor = "rgba(201,168,76,0.5)"; a.style.color = "var(--gold-lt)"; a.style.transform = "translateY(-2px)"
                      }}
                      onMouseLeave={e => {
                        const a = e.currentTarget as HTMLAnchorElement
                        a.style.borderColor = "rgba(255,255,255,0.15)"; a.style.color = "rgba(255,255,255,0.65)"; a.style.transform = ""
                      }}
                    >
                      Find Lawyers
                      <ArrowRight style={{ width: 14, height: 14 }} />
                    </Link>
                  </div>
                </div>

                {/* Right: trust card */}
                <div>
                  <div style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(201,168,76,0.15)",
                    borderRadius: "var(--radius-xl)", overflow: "hidden",
                  }}>
                    <div style={{
                      padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)",
                      display: "flex", alignItems: "center", gap: 10,
                      background: "rgba(201,168,76,0.04)",
                    }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", animation: "glowPulse 2.5s ease-in-out infinite" }} />
                      <span style={{ fontFamily: "var(--mono)", fontSize: "8.5px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.16em", textTransform: "uppercase" }}>
                        Why trust us
                      </span>
                    </div>

                    <div style={{ padding: "8px 0" }}>
                      {[
                        { icon: BadgeCheck, text: "Bar Council verified lawyers only", sub: "Every lawyer undergoes rigorous verification" },
                        { icon: Shield, text: "Transparent pricing, always", sub: "No hidden fees. What you see is what you pay" },
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
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "var(--gold)",
                          }}>
                            <Icon style={{ width: 14, height: 14 }} />
                          </div>
                          <div>
                            <div style={{ fontFamily: "var(--sans)", fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.75)", marginBottom: 3 }}>{text}</div>
                            <div style={{ fontFamily: "var(--sans)", fontSize: "11.5px", color: "rgba(255,255,255,0.3)", fontWeight: 300, lineHeight: 1.5 }}>{sub}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{
                      padding: "14px 24px",
                      borderTop: "1px solid rgba(255,255,255,0.06)",
                      background: "rgba(201,168,76,0.03)",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
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
          background: "var(--ink)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "24px 28px",
        }}>
          <div style={{
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
                <Scale style={{ color: "var(--gold)", width: 13, height: 13 }} />
              </div>
              <span style={{ fontFamily: "var(--serif)", fontSize: "16px", fontWeight: 600, color: "rgba(255,255,255,0.7)", lineHeight: 1 }}>
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