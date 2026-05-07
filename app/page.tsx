"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import {
  BarChart2, CalendarCheck, PenTool, IndianRupee, LogOut,
  User, Scale, MessageCircle, Star, Menu, X,
  ArrowRight, MapPin, Mail, PhoneCall, Sparkles, FileText,
  Bot, FileCheck, Stamp, CheckCircle, ArrowUpRight,
  Gavel, Clock, Zap, Shield, ThumbsUp,
  Instagram, Linkedin, ChevronDown, ChevronRight,
  Building2, Home, Banknote, FileSignature, Briefcase,
  Users, Landmark, AlertCircle, FileQuestion, HeartHandshake,
  Handshake, TrendingUp, BadgeCheck, Layers, ClipboardList,
  Store, HardHat, ShieldCheck,
} from "lucide-react"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import Head from "next/head"

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
      cursor: default;
    }

    @keyframes fadeUp   { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }
    @keyframes fadeIn   { from { opacity:0 } to { opacity:1 } }
    @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    @keyframes floatSlow{ 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-6px) rotate(1deg)} }
    @keyframes marquee  { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    @keyframes shimmer  { 0%{background-position:-300% center} 100%{background-position:300% center} }
    @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.75)} }
    @keyframes drawLine { from{transform:scaleX(0)} to{transform:scaleX(1)} }
    @keyframes rotateSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes slideUp  { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
    @keyframes glowPulse { 0%,100%{opacity:0.4} 50%{opacity:0.8} }

    .reveal {
      opacity: 0;
      transform: translateY(22px);
      transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1);
    }
    .reveal.is-on { opacity:1 !important; transform:translateY(0) !important; }

    .gold-text {
      background: linear-gradient(115deg, var(--gold-dk) 0%, var(--gold) 30%, var(--gold-lt) 52%, var(--gold) 70%, var(--gold-dk) 100%);
      background-size: 300% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 7s linear infinite;
    }

    .mq-track { display:flex; width:max-content; animation: marquee 40s linear infinite; }
    .mq-track:hover { animation-play-state: paused; }

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

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 9px;
      font-family: var(--sans);
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.02em;
      border-radius: var(--radius);
      padding: 14px 26px;
      cursor: pointer;
      border: none;
      text-decoration: none;
      transition: transform 0.22s cubic-bezier(0.16,1,0.3,1),
                  box-shadow 0.22s, background 0.22s, color 0.22s, border-color 0.22s;
      white-space: nowrap;
      position: relative;
      overflow: hidden;
    }
    .btn::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%);
      pointer-events: none;
    }
    .btn-ink {
      background: var(--ink);
      color: var(--white);
    }
    .btn-ink:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 36px rgba(12,11,9,0.3), 0 2px 8px rgba(12,11,9,0.15);
    }
    .btn-gold {
      background: linear-gradient(135deg, var(--gold-dk) 0%, var(--gold) 50%, var(--gold-lt) 100%);
      color: var(--ink);
      font-weight: 700;
    }
    .btn-gold:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 32px rgba(201,168,76,0.4);
    }
    .btn-ghost {
      background: transparent;
      color: var(--ink);
      border: 1.5px solid var(--ink-6);
    }
    .btn-ghost:hover {
      background: var(--ink);
      color: var(--white);
      border-color: var(--ink);
      transform: translateY(-2px);
    }
    .btn-gw {
      background: transparent;
      color: rgba(255,255,255,0.7);
      border: 1px solid rgba(255,255,255,0.2);
    }
    .btn-gw:hover {
      border-color: rgba(201,168,76,0.5);
      color: var(--gold-lt);
      transform: translateY(-2px);
    }

    .card {
      background: var(--white);
      border: 1px solid var(--ink-7);
      border-radius: var(--radius-lg);
      transition: transform 0.28s cubic-bezier(0.16,1,0.3,1),
                  box-shadow 0.28s, border-color 0.28s;
    }
    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 56px rgba(12,11,9,0.08), 0 2px 12px rgba(12,11,9,0.04);
      border-color: var(--ink-5);
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
      letter-spacing: 0.01em;
    }
    .nav-link:hover { color: var(--ink); background: var(--ink-8); }

    .problem-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      border: 1px solid var(--ink-7);
      border-radius: 100px;
      background: var(--white);
      cursor: pointer;
      font-family: var(--sans);
      font-size: 12.5px;
      font-weight: 500;
      color: var(--ink-3);
      transition: all 0.2s cubic-bezier(0.16,1,0.3,1);
      text-decoration: none;
      white-space: nowrap;
    }
    .problem-pill:hover {
      background: var(--ink);
      color: white;
      border-color: var(--ink);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(12,11,9,0.18);
    }

    .action-card {
      background: var(--white);
      border: 1px solid var(--ink-7);
      border-radius: var(--radius-lg);
      padding: 28px 26px;
      cursor: pointer;
      transition: all 0.28s cubic-bezier(0.16,1,0.3,1);
      text-decoration: none;
      display: flex;
      flex-direction: column;
      gap: 14px;
      position: relative;
      overflow: hidden;
    }
    .action-card::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, var(--gold-dk), var(--gold), var(--gold-lt));
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.32s cubic-bezier(0.16,1,0.3,1);
    }
    .action-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 24px 64px rgba(12,11,9,0.1);
      border-color: var(--ink-5);
    }
    .action-card:hover::after { transform: scaleX(1); }

    .faq-row { border-top: 1px solid var(--ink-7); }
    .faq-row:last-child { border-bottom: 1px solid var(--ink-7); }
    .faq-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 22px 0;
      background: none;
      border: none;
      cursor: pointer;
      gap: 20px;
      text-align: left;
    }

    .trust-pill {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 9px 22px;
      border: 1px solid var(--ink-7);
      border-radius: 100px;
      margin: 0 6px;
      white-space: nowrap;
      background: var(--white);
    }

    .section-pad { padding: 104px 24px; }
    @media (max-width: 768px) { .section-pad { padding: 72px 20px; } }
    @media (max-width: 480px) { .section-pad { padding: 52px 16px; } }

    .max-w { max-width: 1200px; margin: 0 auto; }

    .hero-grid {
      display: grid;
      grid-template-columns: 1fr 440px;
      gap: 80px;
      align-items: start;
    }
    @media (max-width: 1060px) { .hero-grid { grid-template-columns: 1fr; gap: 56px; } }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(3,1fr);
      gap: 16px;
    }
    @media (max-width: 920px) { .actions-grid { grid-template-columns: repeat(2,1fr); } }
    @media (max-width: 480px) { .actions-grid { grid-template-columns: 1fr 1fr; gap: 10px; } }

    .actions-grid-bottom {
      display: grid;
      grid-template-columns: repeat(3,1fr);
      gap: 16px;
      margin-top: 16px;
    }
    @media (max-width: 920px) { .actions-grid-bottom { grid-template-columns: repeat(2,1fr); } }
    @media (max-width: 480px) { .actions-grid-bottom { grid-template-columns: 1fr; gap: 10px; } }

    .audience-grid {
      display: grid;
      grid-template-columns: repeat(3,1fr);
      gap: 20px;
    }
    @media (max-width: 860px) { .audience-grid { grid-template-columns: 1fr; } }

    .compliance-grid {
      display: grid;
      grid-template-columns: repeat(3,1fr);
      gap: 12px;
    }
    @media (max-width: 720px) { .compliance-grid { grid-template-columns: repeat(2,1fr); } }
    @media (max-width: 480px) { .compliance-grid { grid-template-columns: 1fr; } }

    .startup-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 72px;
      align-items: center;
    }
    @media (max-width: 900px) { .startup-grid { grid-template-columns: 1fr; gap: 44px; } }

    .outcomes-grid {
      display: grid;
      grid-template-columns: repeat(3,1fr);
      gap: 20px;
    }
    @media (max-width: 860px) { .outcomes-grid { grid-template-columns: 1fr; } }

    .stat-bar {
      display: grid;
      grid-template-columns: repeat(4,1fr);
    }
    @media (max-width: 640px) { .stat-bar { grid-template-columns: repeat(2,1fr); } }

    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1.3fr;
      gap: 48px;
    }
    @media (max-width: 960px) { .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; } }
    @media (max-width: 600px) {
      .footer-grid { grid-template-columns: 1fr; gap: 28px; }
    }

    .hero-ctas { display:flex; flex-wrap:wrap; gap:10px; }
    @media (max-width: 520px) {
      .hero-ctas { flex-direction:column; }
      .hero-ctas .btn { width:100%; justify-content:center; }
    }

    .cta-row { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }
    @media (max-width: 520px) {
      .cta-row { flex-direction:column; align-items:stretch; }
      .cta-row .btn { justify-content:center; }
    }

    /* 3-way hero CTA */
    .hero-3cta {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-bottom: 36px;
    }
    @media (max-width: 680px) {
      .hero-3cta { grid-template-columns: 1fr; }
    }

    .hero-cta-card {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 16px 18px;
      border: 1px solid var(--ink-7);
      border-radius: var(--radius-lg);
      background: var(--white);
      text-decoration: none;
      cursor: pointer;
      transition: all 0.24s cubic-bezier(0.16,1,0.3,1);
      position: relative;
      overflow: hidden;
    }
    .hero-cta-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, var(--gold-dk), var(--gold));
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.28s cubic-bezier(0.16,1,0.3,1);
    }
    .hero-cta-card:hover {
      border-color: var(--ink-5);
      transform: translateY(-3px);
      box-shadow: 0 16px 40px rgba(12,11,9,0.09);
    }
    .hero-cta-card:hover::before { transform: scaleX(1); }

    .mob-only { display:none !important; }
    .desk-only { display:flex; }
    @media (max-width: 768px) {
      .mob-only { display:flex !important; }
      .desk-only { display:none !important; }
    }

    .pills-wrap { display:flex; flex-wrap:wrap; gap:10px; }

    .floating-wa {
      position: fixed;
      bottom: 28px;
      right: 28px;
      z-index: 300;
      width: 54px;
      height: 54px;
      border-radius: 50%;
      background: #128C7E;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 32px rgba(18,140,126,0.45), 0 0 0 0 rgba(18,140,126,0.3);
      transition: all 0.24s cubic-bezier(0.16,1,0.3,1);
      text-decoration: none;
    }
    .floating-wa:hover {
      transform: scale(1.1) translateY(-2px);
      background: #25d366;
      box-shadow: 0 14px 40px rgba(37,211,102,0.4);
    }
    @media (max-width: 480px) { .floating-wa { width:48px; height:48px; bottom:20px; right:18px; } }

    .ornament-line {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .ornament-line::before, .ornament-line::after {
      content: '';
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--ink-7), transparent);
    }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--ink-9); }
    ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; opacity: 0.4; }
    ::-webkit-scrollbar-thumb:hover { background: var(--gold-dk); }

    ::selection { background: var(--gold-pale); color: var(--gold-dk); }

    .noise-overlay {
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
      pointer-events: none;
      opacity: 0.4;
      mix-blend-mode: multiply;
    }

    .count-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--gold-pale);
      border: 1px solid var(--gold);
      font-family: var(--mono);
      font-size: 8px;
      color: var(--gold-dk);
      font-weight: 500;
      flex-shrink: 0;
    }

    /* Audience card hover */
    .audience-card {
      background: var(--white);
      border: 1px solid var(--ink-7);
      border-radius: var(--radius-lg);
      padding: 36px 32px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      transition: all 0.28s cubic-bezier(0.16,1,0.3,1);
      position: relative;
      overflow: hidden;
    }
    .audience-card::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--gold-dk), var(--gold), var(--gold-lt));
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.32s cubic-bezier(0.16,1,0.3,1);
    }
    .audience-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 24px 64px rgba(12,11,9,0.09);
      border-color: var(--ink-5);
    }
    .audience-card:hover::after { transform: scaleX(1); }

    /* Compliance item */
    .compliance-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 18px;
      border: 1px solid rgba(201,168,76,0.15);
      border-radius: var(--radius);
      background: rgba(255,255,255,0.05);
      transition: all 0.22s cubic-bezier(0.16,1,0.3,1);
      cursor: default;
    }
    .compliance-item:hover {
      background: rgba(201,168,76,0.06);
      border-color: rgba(201,168,76,0.3);
      transform: translateX(3px);
    }
  `}</style>
)

/* ─── HELPERS ────────────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
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

const WaSvg = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size, flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.677-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.897 6.994c-.004 5.45-4.437 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.181-1.24-6.162-3.495-8.411" />
  </svg>
)

const SocialIcon = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
    style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      width: 32, height: 32, borderRadius: "50%",
      border: "1px solid var(--ink-7)", color: "var(--ink-5)",
      textDecoration: "none", transition: "all 0.2s",
    }}
    onMouseEnter={e => {
      const a = e.currentTarget as HTMLAnchorElement
      a.style.borderColor = "var(--gold)"; a.style.color = "var(--gold-dk)"; a.style.background = "var(--gold-pale)"
    }}
    onMouseLeave={e => {
      const a = e.currentTarget as HTMLAnchorElement
      a.style.borderColor = "var(--ink-7)"; a.style.color = "var(--ink-5)"; a.style.background = ""
    }}>
    <Icon style={{ width: 13, height: 13 }} />
  </a>
)

function FaqItem({ q, a, qHi, aHi, lang }: { q: string; a: string; qHi: string; aHi: string; lang: "en" | "hi" }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="faq-row">
      <button className="faq-btn" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span style={{
          fontFamily: "var(--serif)", fontSize: "19px", fontWeight: 500,
          color: "var(--ink-2)", lineHeight: 1.4, flex: 1,
        }}>
          {lang === "en" ? q : qHi}
        </span>
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          border: `1.5px solid ${open ? "var(--gold)" : "var(--ink-7)"}`,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          transition: "all 0.28s cubic-bezier(0.16,1,0.3,1)",
          background: open ? "var(--gold-pale)" : "transparent",
        }}>
          <ChevronDown style={{
            width: 12, height: 12,
            color: open ? "var(--gold-dk)" : "var(--ink-5)",
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 0.28s cubic-bezier(0.16,1,0.3,1)",
          }} />
        </div>
      </button>
      <div style={{
        maxHeight: open ? "500px" : "0",
        overflow: "hidden",
        transition: "max-height 0.45s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <p style={{
          fontFamily: "var(--sans)", fontSize: "14px",
          color: "var(--ink-4)", lineHeight: 1.9,
          paddingBottom: 24, maxWidth: 700,
        }}>
          {lang === "en" ? a : aHi}
        </p>
      </div>
    </div>
  )
}

interface Profile { id: string; name: string; email: string; role: "lawyer" | "user"; avatar?: string; phoneNumber?: string }

/* ─── MAIN ───────────────────────────────────────────────────────────────────── */
export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [lang, setLang] = useState<"en" | "hi">("en")
  const [loggedIn, setLoggedIn] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)
    setLoggedIn(!!localStorage.getItem("token"))
    try { const s = localStorage.getItem("userProfile"); if (s) setProfile(JSON.parse(s)) } catch { }
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!mounted) return null

  const waBase = "https://wa.me/919661644025?text="
  const waGeneral = waBase + encodeURIComponent(lang === "en" ? "I need legal help." : "मुझे कानूनी मदद चाहिए।")

  const waProblems: Record<string, string> = {
    money: waBase + encodeURIComponent(lang === "en" ? "I need help recovering money that was not returned to me." : "मुझे वह पैसा वापस पाने में मदद चाहिए।"),
    property: waBase + encodeURIComponent(lang === "en" ? "I have a property dispute I need help with." : "मुझे एक संपत्ति विवाद है जिसमें मदद चाहिए।"),
    tenant: waBase + encodeURIComponent(lang === "en" ? "I have a tenant or landlord issue." : "मेरे पास किरायेदार या मकान मालिक का मुद्दा है।"),
    consumer: waBase + encodeURIComponent(lang === "en" ? "I have a consumer complaint." : "मेरे पास उपभोक्ता शिकायत है।"),
    family: waBase + encodeURIComponent(lang === "en" ? "I need help with a family matter." : "मुझे पारिवारिक मामले में मदद चाहिए।"),
    employment: waBase + encodeURIComponent(lang === "en" ? "I have an employment issue." : "मेरे पास रोजगार का मुद्दा है।"),
    criminal: waBase + encodeURIComponent(lang === "en" ? "I need help for a criminal matter." : "मुझे आपराधिक मामले के लिए मदद चाहिए।"),
    cyber: waBase + encodeURIComponent(lang === "en" ? "I am facing cyber crime or online fraud." : "मैं साइबर अपराध का सामना कर रहा हूं।"),
    contract: waBase + encodeURIComponent(lang === "en" ? "I need help with a contract or agreement." : "मुझे एक अनुबंध में मदद चाहिए।"),
    other: waBase + encodeURIComponent(lang === "en" ? "I have a legal issue and need guidance." : "मुझे कानूनी मार्गदर्शन चाहिए।"),
  }

  const navLinks = [
    { key: "home", label: lang === "en" ? "Home" : "होम", href: "/" },
    { key: "services", label: lang === "en" ? "Services" : "सेवाएं", href: "/services" },
    { key: "lawyers", label: lang === "en" ? "Find Lawyers" : "वकील खोजें", href: "/lawyers" },
    { key: "legalGPT", label: lang === "en" ? "Legal AI" : "कानूनी एआई", href: "/legal-ai" },
    { key: "compliance", label: lang === "en" ? "Compliance" : "अनुपालन", href: "/compliance" },
    { key: "about", label: lang === "en" ? "About" : "हमारे बारे में", href: "/about" },
  ]

  const problems = [
    { key: "money", labelEn: "Money not returned", labelHi: "पैसा वापस नहीं आया", icon: <Banknote style={{ width: 13, height: 13 }} /> },
    { key: "property", labelEn: "Property dispute", labelHi: "संपत्ति विवाद", icon: <Home style={{ width: 13, height: 13 }} /> },
    { key: "tenant", labelEn: "Tenant / Landlord", labelHi: "किरायेदार / मकान मालिक", icon: <Building2 style={{ width: 13, height: 13 }} /> },
    { key: "consumer", labelEn: "Consumer complaint", labelHi: "उपभोक्ता शिकायत", icon: <Shield style={{ width: 13, height: 13 }} /> },
    { key: "family", labelEn: "Family matter", labelHi: "पारिवारिक मामला", icon: <HeartHandshake style={{ width: 13, height: 13 }} /> },
    { key: "employment", labelEn: "Employment issue", labelHi: "रोजगार मुद्दा", icon: <Briefcase style={{ width: 13, height: 13 }} /> },
    { key: "criminal", labelEn: "Criminal matter", labelHi: "आपराधिक मामला", icon: <Gavel style={{ width: 13, height: 13 }} /> },
    { key: "cyber", labelEn: "Cyber crime", labelHi: "साइबर अपराध", icon: <AlertCircle style={{ width: 13, height: 13 }} /> },
    // { key: "contract", labelEn: "Contract / Agreement", labelHi: "अनुबंध / समझौता", icon: <FileSignature style={{ width: 13, height: 13 }} /> },
    { key: "other", labelEn: "Something else", labelHi: "कुछ और", icon: <FileText style={{ width: 13, height: 13 }} /> },
  ]

  const actions = [
    {
      titleEn: "Recover your money", titleHi: "अपना पैसा वापस पाएं",
      descEn: "Unpaid loans, fraud, or disputes legal notice drafted in hours.",
      descHi: "अवैतनिक ऋण, धोखाधड़ी कानूनी नोटिस घंटों में तैयार।",
      icon: <Banknote style={{ width: 22, height: 22 }} />,
      href: waBase + encodeURIComponent(lang === "en" ? "I need help recovering money." : "मुझे पैसा वापस पाने में मदद चाहिए।"),
      badge: "Most Popular",
    },
    {
      titleEn: "Solve property issues", titleHi: "संपत्ति के मुद्दे सुलझाएं",
      descEn: "Boundary disputes, title issues, illegal possession.",
      descHi: "सीमा विवाद, शीर्षक मुद्दे, अवैध कब्जा।",
      icon: <Home style={{ width: 22, height: 22 }} />,
      href: "/lawyers",
      badge: null,
    },
    {
      titleEn: "Get documents done", titleHi: "दस्तावेज़ तैयार करवाएं",
      descEn: "Affidavits, rent agreements, legal notices ready fast.",
      descHi: "हलफनामे, किराया समझौते जल्दी तैयार।",
      icon: <FileSignature style={{ width: 22, height: 22 }} />,
      href: "/affidavit-online-india",
      badge: "₹999 onwards",
    },
  ]

  const actionsBottom = [
    {
      titleEn: "Talk to a lawyer", titleHi: "वकील से बात करें",
      descEn: "Connect with a verified expert in under 30 minutes.",
      descHi: "30 मिनट के भीतर सत्यापित विशेषज्ञ से जुड़ें।",
      icon: <Gavel style={{ width: 22, height: 22 }} />,
      href: "/lawyers",
      badge: "From ₹150",
    },
    {
      titleEn: "Startup Legal Support", titleHi: "स्टार्टअप कानूनी सहायता",
      descEn: "Contracts, NDAs, co-founder agreements monthly flat rate.",
      descHi: "अनुबंध, एनडीए, सह-संस्थापक समझौते मासिक दर।",
      icon: <TrendingUp style={{ width: 22, height: 22 }} />,
      href: "/startup-legal",
      badge: "₹999/mo",
    },
    {
      titleEn: "Compliance & Licensing", titleHi: "अनुपालन और लाइसेंसिंग",
      descEn: "POSH, FSSAI, MSME, Shop & Establishment and more.",
      descHi: "POSH, FSSAI, MSME, शॉप एंड एस्टेब्लिशमेंट और अधिक।",
      icon: <ClipboardList style={{ width: 22, height: 22 }} />,
      href: "/compliance",
      badge: "New",
    },
  ]

  const flowSteps = [
    {
      n: "01", icon: <FileCheck style={{ width: 16, height: 16 }} />,
      titleEn: "Tell your problem", titleHi: "अपनी समस्या बताएं",
      descEn: "No legal jargon needed. Hindi or English, any device.",
      descHi: "कानूनी शब्दावली की जरूरत नहीं। हिंदी या अंग्रेजी।",
    },
    {
      n: "02", icon: <ArrowRight style={{ width: 16, height: 16 }} />,
      titleEn: "Get your next step", titleHi: "अगला कदम जानें",
      descEn: "AI-powered clarity backed by Indian law, instantly.",
      descHi: "भारतीय कानून द्वारा समर्थित, तुरंत स्पष्टता।",
    },
    {
      n: "03", icon: <CheckCircle style={{ width: 16, height: 16 }} />,
      titleEn: "Take action", titleHi: "कार्रवाई करें",
      descEn: "Send a notice, book a lawyer, or get a document. Done.",
      descHi: "नोटिस भेजें, वकील बुक करें, दस्तावेज़ पाएं।",
    },
  ]

  const testimonials = [
    { name: "Swapnil Anand", location: "Bhagalpur, Bihar", avatar: "SA", rating: 5, textEn: "Notarized affidavit home delivered in 2 days. Every detail handled without hassle.", textHi: "2 दिनों में नोटरीकृत हलफनामा घर पहुंचा। बिना किसी परेशानी के।" },
    { name: "Anand Upadhyay", location: "Indore, MP", avatar: "AU", rating: 4, textEn: "Connected with a lawyer instantly. My delayed salary issue was resolved effectively.", textHi: "तुरंत एक वकील से जुड़े। विलंबित वेतन का प्रभावी समाधान।" },
    { name: "Dinesh Chand", location: "Gurgaon, Haryana", avatar: "DC", rating: 5, textEn: "Delhi traffic challan NyayMitra told me exactly what to do. Clear, fast, no confusion.", textHi: "दिल्ली चालान न्यायमित्र ने बताया कि वास्तव में क्या करना है।" },
  ]

  const faqs = [
    {
      qEn: "How do I file an FIR online in India?",
      aEn: "In India, you can file an FIR at your nearest police station. If the police refuse, you can write to the Superintendent of Police. Many states offer e-FIR services. NyayMitra's Legal AI guides you step by step in Hindi or English, 24/7.",
      qHi: "भारत में ऑनलाइन एफआईआर कैसे दर्ज कराएं?",
      aHi: "भारत में, आप अपने नजदीकी पुलिस स्टेशन में एफआईआर दर्ज करा सकते हैं। यदि पुलिस मना करती है, तो आप पुलिस अधीक्षक को लिख सकते हैं। कई राज्य ई-एफआईआर सेवाएं प्रदान करते हैं।",
    },
    {
      qEn: "What is an affidavit and when do I need one?",
      aEn: "An affidavit is a sworn written statement legally binding in Indian courts and government offices. You need one for address proof, name change, income declaration, property matters. NyayMitra delivers notarized affidavits from ₹999, within 2–4 hours.",
      qHi: "हलफनामा क्या है और कब चाहिए?",
      aHi: "हलफनामा एक शपथ पत्र है भारतीय अदालतों में बाध्यकारी। पते के प्रमाण, नाम परिवर्तन के लिए आवश्यक। न्यायमित्र ₹999 से 2-4 घंटों में प्रदान करता है।",
    },
    {
      qEn: "How much does a lawyer consultation cost?",
      aEn: "AI-powered legal guidance is completely free. Paid lawyer consultations start from ₹150 for 15 minutes. No hidden charges the price you see is what you pay.",
      qHi: "वकील परामर्श की लागत कितनी है?",
      aHi: "एआई-संचालित कानूनी मार्गदर्शन पूरी तरह मुफ्त है। सशुल्क परामर्श ₹150 से शुरू होता है। कोई छिपा शुल्क नहीं।",
    },
    {
      qEn: "Are the lawyers on NyayMitra verified?",
      aEn: "Yes. Every lawyer is verified through Bar Council enrollment, practice certificate, and background checks. 60+ verified lawyers across civil, criminal, family, property, consumer, labour, and cyber law.",
      qHi: "क्या न्यायमित्र पर वकील सत्यापित हैं?",
      aHi: "हाँ। बार काउंसिल पंजीकरण और बैकग्राउंड चेक के माध्यम से। 60+ सत्यापित वकील।",
    },
    {
      qEn: "Is NyayMitra a law firm?",
      aEn: "No. NyayMitra is a technology platform connecting people with verified legal professionals. AI guidance is for informational purposes. For representation, you'll be connected with a licensed advocate.",
      qHi: "क्या न्यायमित्र एक कानूनी फर्म है?",
      aHi: "नहीं। न्यायमित्र एक प्रौद्योगिकी मंच है। एआई मार्गदर्शन सूचनात्मक उद्देश्यों के लिए है।",
    },
  ]

  /* ─── Render ─────────────────────────────────────────────────────────────── */
  return (
    <>
      <GlobalStyles />
      <Head>
        <title>NyayMitra {lang === "en" ? "Legal Operating System for India" : "भारत का कानूनी ऑपरेटिंग सिस्टम"}</title>
        <meta name="description" content="India's legal operating system for individuals, startups & businesses. Free AI guidance, verified lawyers, compliance services, startup legal support, instant documents." />
        <meta name="keywords" content="startup legal services India, compliance services India, POSH compliance, legal consultation online, business legal support, MSME registration, FSSAI registration" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="canonical" href="https://nyaymitra.tech" />
      </Head>

      <div style={{ minHeight: "100vh", background: "var(--white)" }}>

        {/* ── Announcement Bar ─────────────────────────────────────────────────── */}
        <div style={{
          background: "linear-gradient(90deg, var(--ink) 0%, var(--ink-2) 40%, var(--ink-3) 100%)",
          color: "white",
          textAlign: "center",
          padding: "9px 16px",
          fontSize: "11px",
          fontFamily: "var(--mono)",
          letterSpacing: "0.1em",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.06) 50%, transparent 100%)",
            pointerEvents: "none",
          }} />
          <span style={{ color: "rgba(255,255,255,0.55)" }}>🇮🇳</span>{" "}
          <span style={{ color: "rgba(255,255,255,0.7)" }}>
            {lang === "en" ? "Free legal guidance in Hindi & English 24/7" : "हिंदी और अंग्रेजी में मुफ्त कानूनी मार्गदर्शन 24/7"}
          </span>
          &nbsp;·&nbsp;
          <a href={waGeneral} target="_blank" rel="noopener noreferrer"
            style={{ color: "var(--gold-lt)", textDecoration: "none", fontWeight: 600, letterSpacing: "0.12em" }}>
            {lang === "en" ? "WhatsApp Now →" : "अभी व्हाट्सएप करें →"}
          </a>
        </div>

        {/* ── Navbar ───────────────────────────────────────────────────────────── */}
        <nav style={{
          position: "sticky", top: 0, zIndex: 100,
          background: scrolled ? "rgba(255,254,251,0.96)" : "var(--white)",
          backdropFilter: scrolled ? "blur(24px) saturate(1.4)" : "none",
          borderBottom: `1px solid ${scrolled ? "var(--ink-7)" : "transparent"}`,
          boxShadow: scrolled ? "0 2px 24px rgba(12,11,9,0.06)" : "none",
          transition: "all 0.32s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <div style={{
            maxWidth: 1200, margin: "0 auto", padding: "0 28px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            height: 66,
          }}>
            {/* Logo */}
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none", flexShrink: 0 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: "var(--ink)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                boxShadow: "0 2px 12px rgba(12,11,9,0.2)",
                position: "relative", overflow: "hidden",
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
                {/* <div style={{
                  fontFamily: "var(--mono)", fontSize: "7px", color: "var(--gold-dk)",
                  letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 2,
                }}>{lang === "en" ? "Legal OS · India" : "कानूनी ओएस · भारत"}</div> */}
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="desk-only" style={{ alignItems: "center", gap: 2 }}>
              {navLinks.map(l => <Link key={l.key} href={l.href} className="nav-link">{l.label}</Link>)}
            </div>

            {/* Right */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <div className="desk-only" style={{ alignItems: "center", gap: 7 }}>
                <SocialIcon href="https://www.instagram.com/nyaymitra.tech" icon={Instagram} label="Instagram" />
                <SocialIcon href="https://www.linkedin.com/company/nyaymitra-tech-pvt-ltd" icon={Linkedin} label="LinkedIn" />
                <div style={{ width: 1, height: 18, background: "var(--ink-7)", margin: "0 2px" }} />
              </div>

              {/* Lang toggle */}
              <button
                onClick={() => setLang(l => l === "en" ? "hi" : "en")}
                style={{
                  width: 34, height: 34, borderRadius: "50%",
                  border: "1.5px solid var(--ink-7)", background: "none",
                  cursor: "pointer", fontFamily: "var(--mono)", fontSize: "9px",
                  fontWeight: 600, color: "var(--ink-4)",
                  transition: "all 0.2s", flexShrink: 0,
                }}
                onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = "var(--gold)"; b.style.color = "var(--gold-dk)"; }}
                onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = "var(--ink-7)"; b.style.color = "var(--ink-4)"; }}
              >
                {lang === "en" ? "हि" : "EN"}
              </button>

              {loggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button style={{
                      display: "flex", alignItems: "center", gap: 8,
                      background: "var(--ink-9)", border: "1px solid var(--ink-7)",
                      borderRadius: 100, padding: "5px 14px 5px 5px", cursor: "pointer",
                      transition: "all 0.2s",
                    }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: "50%", background: "var(--ink)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <User style={{ color: "var(--gold)", width: 12, height: 12 }} />
                      </div>
                      <span style={{ fontFamily: "var(--sans)", fontSize: "12px", fontWeight: 600, color: "var(--ink)" }}>
                        {profile?.name?.split(" ")[0] || (lang === "en" ? "Account" : "खाता")}
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" style={{
                    background: "white", border: "1px solid var(--ink-7)",
                    borderRadius: 12, padding: 6, minWidth: 185,
                    boxShadow: "0 16px 48px rgba(12,11,9,0.12)",
                  }}>
                    {[
                      { href: "/profile", icon: User, labelEn: "My Profile", labelHi: "मेरी प्रोफाइल" },
                    ].map(item => (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href} style={{
                          display: "flex", alignItems: "center", gap: 10,
                          padding: "10px 12px", borderRadius: 7,
                          textDecoration: "none", color: "var(--ink)",
                          fontFamily: "var(--sans)", fontSize: "13px",
                        }}>
                          <item.icon style={{ width: 13, height: 13, color: "var(--gold-dk)" }} />
                          {lang === "en" ? item.labelEn : item.labelHi}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuItem onClick={() => window.location.href = "https://nyay-dashboard.netlify.app/"} style={{
                      display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
                      borderRadius: 7, cursor: "pointer", fontFamily: "var(--sans)", fontSize: "13px",
                    }}>
                      <BarChart2 style={{ width: 13, height: 13, color: "var(--gold-dk)" }} />
                      {lang === "en" ? "Dashboard" : "डैशबोर्ड"}
                    </DropdownMenuItem>
                    {profile?.role !== "lawyer" && (
                      <DropdownMenuItem asChild>
                        <Link href="/all-bookings" style={{
                          display: "flex", alignItems: "center", gap: 10,
                          padding: "10px 12px", borderRadius: 7,
                          textDecoration: "none", color: "var(--ink)",
                          fontFamily: "var(--sans)", fontSize: "13px",
                        }}>
                          <CalendarCheck style={{ width: 13, height: 13, color: "var(--gold-dk)" }} />
                          {lang === "en" ? "My Bookings" : "मेरी बुकिंग"}
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <div style={{ height: 1, background: "var(--ink-7)", margin: "4px 0" }} />
                    <DropdownMenuItem onClick={() => { localStorage.removeItem("token"); window.location.reload() }} style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "10px 12px", borderRadius: 7, cursor: "pointer",
                      color: "var(--red)", fontFamily: "var(--sans)", fontSize: "13px",
                    }}>
                      <LogOut style={{ width: 13, height: 13 }} />
                      {lang === "en" ? "Logout" : "लॉगआउट"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="desk-only" style={{ gap: 7, alignItems: "center" }}>
                  <Link href="/auth/login" className="nav-link">{lang === "en" ? "Login" : "लॉगिन"}</Link>
                  <Link href="/auth/signup" className="btn btn-ink" style={{ textDecoration: "none", padding: "9px 18px", fontSize: "12.5px" }}>
                    {lang === "en" ? "Sign Up" : "साइन अप"}
                  </Link>
                </div>
              )}

              {/* Mobile burger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="mob-only"
                style={{
                  width: 38, height: 38, border: "1px solid var(--ink-7)",
                  background: "none", borderRadius: 8, cursor: "pointer",
                  alignItems: "center", justifyContent: "center", transition: "all 0.2s",
                }}>
                {menuOpen ? <X style={{ width: 15, height: 15 }} /> : <Menu style={{ width: 15, height: 15 }} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div style={{
              borderTop: "1px solid var(--ink-7)", background: "var(--white)",
              padding: "16px 22px 28px",
              boxShadow: "0 12px 32px rgba(12,11,9,0.08)",
              animation: "slideUp 0.22s cubic-bezier(0.16,1,0.3,1) both",
            }}>
              {navLinks.map((l, i) => (
                <Link key={l.key} href={l.href} onClick={() => setMenuOpen(false)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "14px 0", fontFamily: "var(--sans)", fontSize: "15px",
                    fontWeight: 500, color: "var(--ink-2)", textDecoration: "none",
                    borderBottom: i < navLinks.length - 1 ? "1px solid var(--ink-8)" : "none",
                  }}>
                  {l.label}
                  <ChevronRight style={{ width: 13, height: 13, color: "var(--ink-6)" }} />
                </Link>
              ))}
              <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                <Link href="/auth/login" onClick={() => setMenuOpen(false)} style={{
                  flex: 1, padding: "12px", textAlign: "center",
                  border: "1.5px solid var(--ink-6)", borderRadius: 9,
                  fontFamily: "var(--sans)", fontSize: "13.5px", fontWeight: 500,
                  color: "var(--ink)", textDecoration: "none",
                }}>{lang === "en" ? "Login" : "लॉगिन"}</Link>
                <Link href="/auth/signup" onClick={() => setMenuOpen(false)} style={{
                  flex: 1, padding: "12px", textAlign: "center",
                  background: "var(--ink)", borderRadius: 9,
                  fontFamily: "var(--sans)", fontSize: "13.5px", fontWeight: 600,
                  color: "white", textDecoration: "none",
                }}>{lang === "en" ? "Sign Up" : "साइन अप"}</Link>
              </div>
            </div>
          )}
        </nav>

        {/* ═══════════════════════════════════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════════════════════════════════ */}
        <section style={{ padding: "80px 28px 96px", position: "relative", overflow: "hidden" }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 80% 60% at 75% 30%, rgba(201,168,76,0.055) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 10% 70%, rgba(12,11,9,0.025) 0%, transparent 60%)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", right: "-4%", top: "6%",
            width: 560, height: 560, opacity: 0.025,
            pointerEvents: "none", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Scale style={{ width: "100%", height: "100%", color: "var(--gold-dk)" }} />
          </div>

          <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div className="hero-grid">

              {/* ── Left column ── */}
              <div style={{ animation: "fadeUp 0.72s cubic-bezier(0.16,1,0.3,1) both" }}>

                {/* Live indicator */}
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
                    {lang === "en" ? "100+ Indians helped · Active now" : "100+ भारतीयों की मदद · अभी सक्रिय"}
                  </span>
                </div>

                {/* Headline */}
                <h1 style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(44px, 6.5vw, 78px)",
                  fontWeight: 600,
                  lineHeight: 1.3,
                  letterSpacing: "-0.03em",
                  color: "var(--ink)",
                  marginBottom: 0,
                  paddingTop: "0.3rem",
                  overflow: "visible",
                }}>
                  {lang === "en" ? "Know your next" : "अपना अगला"}<br />
                  <span className="gold-text" style={{
                    fontStyle: "italic",
                    fontWeight: 300,
                    display: "inline-block",
                    lineHeight: 1.4,
                    overflow: "visible",
                  }}>
                    {lang === "en" ? "legal step." : "कानूनी कदम जानें."}
                  </span>
                </h1>

                {/* Ornamental divider */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "28px 0" }}>
                  <div style={{ width: 44, height: 1, background: "linear-gradient(90deg, var(--gold-dk), var(--gold))" }} />
                  <Scale style={{ width: 10, height: 10, color: "var(--gold)" }} />
                  <div style={{ width: 24, height: 1, background: "linear-gradient(90deg, var(--gold), transparent)" }} />
                </div>

                {/* Updated subheadline B2B positioning */}
                <p style={{
                  fontFamily: "var(--sans)", fontSize: "15.5px",
                  color: "var(--ink-4)", lineHeight: 1.85,
                  maxWidth: 480, marginBottom: 36, fontWeight: 300,
                }}>
                  {lang === "en"
                    ? "For individuals, startups & businesses get legal clarity, documents, compliance support, and expert help without complexity."
                    : "व्यक्तियों, स्टार्टअप और व्यवसायों के लिए बिना जटिलता के कानूनी स्पष्टता, दस्तावेज़, अनुपालन सहायता।"}
                </p>

                {/* ── NEW: 3-way CTA structure ── */}
                <div className="hero-3cta">
                  {[
                    {
                      icon: <WaSvg size={15} />,
                      labelEn: "Personal Legal Help",
                      labelHi: "व्यक्तिगत कानूनी मदद",
                      subEn: "Immediate WhatsApp guidance",
                      subHi: "तुरंत व्हाट्सएप मार्गदर्शन",
                      href: waGeneral,
                      external: true,
                      accent: "#128C7E",
                    },
                    {
                      icon: <TrendingUp style={{ width: 15, height: 15 }} />,
                      labelEn: "Startup Legal",
                      labelHi: "स्टार्टअप कानूनी",
                      subEn: "NDAs, contracts, monthly plans",
                      subHi: "एनडीए, अनुबंध, मासिक योजना",
                      href: "/startup-legal",
                      external: false,
                      accent: "var(--gold-dk)",
                    },
                    {
                      icon: <ClipboardList style={{ width: 15, height: 15 }} />,
                      labelEn: "Compliance & Licensing",
                      labelHi: "अनुपालन और लाइसेंस",
                      subEn: "POSH, FSSAI, MSME & more",
                      subHi: "POSH, FSSAI, MSME और अधिक",
                      href: "/compliance",
                      external: false,
                      accent: "var(--ink-3)",
                    },
                  ].map((cta) => (
                    cta.external ? (
                      <a key={cta.labelEn} href={cta.href} target="_blank" rel="noopener noreferrer" className="hero-cta-card">
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ color: cta.accent as string }}>{cta.icon}</span>
                          <span style={{ fontFamily: "var(--sans)", fontSize: "13px", fontWeight: 700, color: "var(--ink)" }}>
                            {lang === "en" ? cta.labelEn : cta.labelHi}
                          </span>
                        </div>
                        <p style={{ fontFamily: "var(--sans)", fontSize: "11px", color: "var(--ink-5)", fontWeight: 300, lineHeight: 1.5 }}>
                          {lang === "en" ? cta.subEn : cta.subHi}
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "var(--mono)", fontSize: "9px", color: cta.accent as string, letterSpacing: "0.08em" }}>
                          {lang === "en" ? "Get started" : "शुरू करें"} <ChevronRight style={{ width: 10, height: 10 }} />
                        </div>
                      </a>
                    ) : (
                      <Link key={cta.labelEn} href={cta.href} className="hero-cta-card" style={{ textDecoration: "none" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ color: cta.accent as string }}>{cta.icon}</span>
                          <span style={{ fontFamily: "var(--sans)", fontSize: "13px", fontWeight: 700, color: "var(--ink)" }}>
                            {lang === "en" ? cta.labelEn : cta.labelHi}
                          </span>
                        </div>
                        <p style={{ fontFamily: "var(--sans)", fontSize: "11px", color: "var(--ink-5)", fontWeight: 300, lineHeight: 1.5 }}>
                          {lang === "en" ? cta.subEn : cta.subHi}
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "var(--mono)", fontSize: "9px", color: cta.accent as string, letterSpacing: "0.08em" }}>
                          {lang === "en" ? "Get started" : "शुरू करें"} <ChevronRight style={{ width: 10, height: 10 }} />
                        </div>
                      </Link>
                    )
                  ))}
                </div>

                {/* Problem selector */}
                <div style={{
                  marginBottom: 40, padding: "24px",
                  border: "1px solid var(--ink-7)", borderRadius: "var(--radius-xl)",
                  background: "var(--ink-9)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8), 0 2px 8px rgba(12,11,9,0.04)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--ink-5)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                      {lang === "en" ? "Select your issue" : "अपनी समस्या चुनें"}
                    </span>
                    <div style={{ flex: 1, height: 1, background: "var(--ink-7)" }} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))", gap: 9 }}>
                    {problems.map(p => (
                      <a key={p.key} href={waProblems[p.key]} target="_blank" rel="noopener noreferrer"
                        className="problem-pill" style={{ justifyContent: "flex-start" }}>
                        <span style={{ color: "var(--gold-dk)", flexShrink: 0 }}>{p.icon}</span>
                        <span style={{ fontSize: "12px" }}>{lang === "en" ? p.labelEn : p.labelHi}</span>
                      </a>
                    ))}
                  </div>
                  <p style={{
                    fontFamily: "var(--sans)", fontSize: "10.5px",
                    color: "var(--ink-6)", marginTop: 14, letterSpacing: "0.01em",
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <WaSvg size={10} />
                    {lang === "en" ? "Tap to get help on WhatsApp instantly" : "तुरंत व्हाट्सएप पर मदद पाने के लिए टैप करें"}
                  </p>
                </div>

                {/* Trust row */}
                <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 10, flexWrap: "wrap" }}>
                  {[
                    { icon: <BadgeCheck style={{ width: 10, height: 10 }} />, enText: "Verified Legal Experts", hiText: "सत्यापित कानूनी विशेषज्ञ" },
                    { icon: <Shield style={{ width: 10, height: 10 }} />, enText: "Transparent Pricing", hiText: "पारदर्शी मूल्य" },
                    { icon: <Zap style={{ width: 10, height: 10 }} />, enText: "AI + Human Assisted", hiText: "एआई + मानव सहायता" },
                    { icon: <TrendingUp style={{ width: 10, height: 10 }} />, enText: "Startup Friendly", hiText: "स्टार्टअप अनुकूल" },
                  ].map(t => (
                    <div key={t.enText} style={{
                      display: "flex", alignItems: "center", gap: 6,
                      fontFamily: "var(--mono)", fontSize: "9px",
                      color: "var(--ink-5)", letterSpacing: "0.08em",
                    }}>
                      <span style={{ color: "var(--gold-dk)" }}>{t.icon}</span>
                      {lang === "en" ? t.enText : t.hiText}
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Right column floating card ── */}
              <div style={{ animation: "fadeUp 0.82s 0.12s cubic-bezier(0.16,1,0.3,1) both" }}>
                <div style={{ animation: "floatSlow 9s ease-in-out infinite", position: "relative" }}>
                  <div className="card" style={{
                    overflow: "hidden",
                    boxShadow: "0 40px 80px rgba(12,11,9,0.1), 0 8px 24px rgba(12,11,9,0.06), 0 0 0 1px rgba(12,11,9,0.03)",
                  }}>
                    <div style={{
                      background: "var(--ink)",
                      padding: "16px 22px",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      position: "relative", overflow: "hidden",
                    }}>
                      <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, transparent 60%)",
                      }} />
                      <div style={{ display: "flex", alignItems: "center", gap: 10, position: "relative", zIndex: 1 }}>
                        <div style={{
                          width: 8, height: 8, borderRadius: "50%", background: "var(--gold)",
                          boxShadow: "0 0 12px rgba(201,168,76,0.6)", animation: "glowPulse 2.5s ease-in-out infinite",
                        }} />
                        <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                          {lang === "en" ? "NyayMitra · How it works" : "न्यायमित्र · यह कैसे काम करता है"}
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: 5, position: "relative", zIndex: 1 }}>
                        {["#ff5f57", "#febc2e", "#28c840"].map(c => (
                          <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c, opacity: 0.9 }} />
                        ))}
                      </div>
                    </div>

                    <div style={{ padding: "4px 0" }}>
                      {flowSteps.map((step, i) => (
                        <div key={step.n}
                          style={{
                            padding: "20px 24px",
                            display: "flex", gap: 16, alignItems: "flex-start",
                            borderBottom: i < 2 ? "1px solid var(--ink-8)" : "none",
                            transition: "background 0.2s", cursor: "default",
                            background: i === 2 ? "var(--gold-pale)" : "transparent",
                          }}
                          onMouseEnter={e => { if (i !== 2) (e.currentTarget as HTMLDivElement).style.background = "var(--ink-9)" }}
                          onMouseLeave={e => { if (i !== 2) (e.currentTarget as HTMLDivElement).style.background = "" }}>
                          <div style={{
                            width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                            background: i === 2 ? "var(--ink)" : "var(--ink-9)",
                            border: `1px solid ${i === 2 ? "transparent" : "var(--ink-7)"}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: i === 2 ? "var(--gold)" : "var(--gold-dk)",
                            boxShadow: i === 2 ? "0 4px 16px rgba(12,11,9,0.2)" : "none",
                          }}>
                            {step.icon}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 4 }}>
                              <span style={{ fontFamily: "var(--mono)", fontSize: "8px", color: "var(--gold)", letterSpacing: "0.12em" }}>{step.n}</span>
                              <span style={{ fontFamily: "var(--sans)", fontSize: "13px", fontWeight: 600, color: "var(--ink)" }}>
                                {lang === "en" ? step.titleEn : step.titleHi}
                              </span>
                            </div>
                            <p style={{ fontFamily: "var(--sans)", fontSize: "11.5px", color: "var(--ink-5)", lineHeight: 1.6 }}>
                              {lang === "en" ? step.descEn : step.descHi}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{
                      padding: "13px 22px",
                      background: "var(--ink-9)", borderTop: "1px solid var(--ink-7)",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                    }}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: "8.5px", color: "var(--ink-5)", letterSpacing: "0.08em" }}>
                        {lang === "en" ? "Available 24/7 · Zero hidden costs" : "24/7 उपलब्ध · कोई छिपी लागत नहीं"}
                      </span>
                      <div style={{
                        display: "flex", alignItems: "center", gap: 5,
                        background: "#f0fdf4", border: "1px solid #bbf7d0",
                        padding: "4px 10px", borderRadius: 100, color: "#15803d",
                      }}>
                        <WaSvg size={9} />
                        <span style={{ fontFamily: "var(--mono)", fontSize: "8.5px", fontWeight: 600 }}>WhatsApp</span>
                      </div>
                    </div>
                  </div>

                  {/* Floating badges */}
                  <div style={{
                    position: "absolute", bottom: -18, left: -20,
                    background: "var(--ink)", color: "white", borderRadius: 10,
                    padding: "10px 16px",
                    boxShadow: "0 12px 36px rgba(12,11,9,0.22), 0 0 0 1px rgba(255,255,255,0.05) inset",
                    fontFamily: "var(--sans)", fontSize: "11.5px", fontWeight: 600,
                    display: "flex", alignItems: "center", gap: 8,
                    animation: "float 7s 1s ease-in-out infinite",
                  }}>
                    <Shield style={{ width: 12, height: 12, color: "var(--gold)" }} />
                    {lang === "en" ? "Bar Council Verified" : "बार काउंसिल सत्यापित"}
                  </div>
                  <div style={{
                    position: "absolute", top: -16, right: -16,
                    background: "var(--gold-pale)", border: "1px solid var(--gold)",
                    borderRadius: 10, padding: "8px 14px",
                    boxShadow: "0 8px 24px rgba(201,168,76,0.2)",
                    fontFamily: "var(--mono)", fontSize: "9.5px", fontWeight: 700,
                    color: "var(--gold-dk)", display: "flex", alignItems: "center", gap: 7,
                    animation: "float 8s 0.5s ease-in-out infinite",
                  }}>
                    <Star style={{ width: 11, height: 11, fill: "var(--gold)", color: "var(--gold)" }} />
                    4.9 / 5.0
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Trust Marquee ─────────────────────────────────────────────────────── */}
        <div style={{
          borderTop: "1px solid var(--ink-7)", borderBottom: "1px solid var(--ink-7)",
          padding: "11px 0", overflow: "hidden",
          background: "linear-gradient(90deg, var(--ink-9) 0%, var(--white) 50%, var(--ink-9) 100%)",
        }}>
          <div className="mq-track">
            {[...Array(3)].flatMap(() => [
              { val: "₹25,000", en: "recovered via notice", hi: "नोटिस से वसूल" },
              { val: "60+", en: "verified lawyers", hi: "सत्यापित वकील" },
              { val: "< 2 min", en: "avg AI response", hi: "औसत एआई प्रतिक्रिया" },
              { val: "4.9★", en: "client rating", hi: "ग्राहक रेटिंग" },
              { val: "2 hrs", en: "NDA reviewed", hi: "एनडीए समीक्षित" },
              { val: "10+", en: "cities served", hi: "शहरों में सेवाएं" },
              { val: "POSH", en: "compliance ready", hi: "अनुपालन तैयार" },
            ]).map((item, i) => (
              <span key={i} className="trust-pill">
                <span style={{ fontFamily: "var(--serif)", fontSize: "13.5px", fontWeight: 600, color: "var(--gold-dk)" }}>{item.val}</span>
                <span style={{ fontFamily: "var(--sans)", fontSize: "11px", color: "var(--ink-5)", fontWeight: 400 }}>
                  {lang === "en" ? item.en : item.hi}
                </span>
                <span style={{ color: "var(--gold-pale)", fontSize: "16px" }}>◆</span>
              </span>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════
            WHO IS THIS FOR? (NEW SECTION)
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="section-pad" style={{ background: "var(--ink-9)", borderBottom: "1px solid var(--ink-7)" }}>
          <div className="max-w" style={{ padding: "0 28px" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 56 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                  <span className="eyebrow">{lang === "en" ? "Who is this for?" : "यह किसके लिए है?"}</span>
                </div>
                <h2 style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(28px, 4vw, 50px)",
                  fontWeight: 600, letterSpacing: "-0.025em", color: "var(--ink)", lineHeight: 1.15,
                }}>
                  {lang === "en" ? "Legal support for" : "कानूनी सहायता"}<br />
                  <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--ink-3)" }}>
                    {lang === "en" ? "everyone who needs it." : "हर उस व्यक्ति के लिए।"}
                  </span>
                </h2>
                <p style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "var(--ink-5)", fontWeight: 300, marginTop: 14, maxWidth: 520, margin: "14px auto 0" }}>
                  {lang === "en"
                    ? "Trusted by startups, professionals & growing businesses across India."
                    : "भारत भर में स्टार्टअप, पेशेवरों और बढ़ते व्यवसायों द्वारा विश्वसनीय।"}
                </p>
              </div>
            </Reveal>

            <div className="audience-grid">
              {[
                {
                  icon: <User style={{ width: 20, height: 20 }} />,
                  tagEn: "Individuals",
                  tagHi: "व्यक्ति",
                  titleEn: "Personal legal issues, resolved.",
                  titleHi: "व्यक्तिगत कानूनी समस्याएं, हल।",
                  descEn: "From money disputes to family matters, NyayMitra gives you clarity and action steps without needing to know any law.",
                  descHi: "धन विवाद से पारिवारिक मामलों तक, बिना कानून जाने स्पष्टता और कार्रवाई।",
                  bullets: [
                    { en: "Legal notice drafting", hi: "कानूनी नोटिस" },
                    { en: "Affidavits & documents", hi: "हलफनामे और दस्तावेज़" },
                    { en: "Lawyer consultation from ₹150", hi: "₹150 से परामर्श" },
                  ],
                  cta: { en: "Get Help on WhatsApp", hi: "व्हाट्सएप पर मदद", href: waGeneral, external: true },
                  dark: false,
                },
                {
                  icon: <TrendingUp style={{ width: 20, height: 20 }} />,
                  tagEn: "Startups",
                  tagHi: "स्टार्टअप",
                  titleEn: "Legal clarity for founders.",
                  titleHi: "संस्थापकों के लिए स्पष्टता।",
                  descEn: "Scale confidently with contracts, compliance, and on-call legal support at a flat monthly rate. No hourly billing.",
                  descHi: "अनुबंध, अनुपालन, और कानूनी सहायता के साथ आत्मविश्वास से आगे बढ़ें।",
                  bullets: [
                    { en: "Founder & co-founder agreements", hi: "सह-संस्थापक समझौते" },
                    { en: "NDAs & contracts reviewed", hi: "एनडीए और अनुबंध समीक्षा" },
                    { en: "Monthly legal support ₹999", hi: "₹999 मासिक सहायता" },
                  ],
                  cta: { en: "View Startup Plans", hi: "स्टार्टअप योजना देखें", href: "/startup-legal", external: false },
                  dark: true,
                },
                {
                  icon: <Building2 style={{ width: 20, height: 20 }} />,
                  tagEn: "Businesses & MSMEs",
                  tagHi: "व्यवसाय और एमएसएमई",
                  titleEn: "Compliance done right.",
                  titleHi: "अनुपालन सही तरह से।",
                  descEn: "Protect your business with POSH compliance, labour law, vendor agreements, and licensing all handled by experts.",
                  descHi: "POSH अनुपालन, श्रम कानून, विक्रेता समझौते और लाइसेंसिंग विशेषज्ञों द्वारा।",
                  bullets: [
                    { en: "POSH compliance & training", hi: "POSH अनुपालन और प्रशिक्षण" },
                    { en: "Licensing (FSSAI, S&E, MSME)", hi: "लाइसेंसिंग (FSSAI, S&E, MSME)" },
                    { en: "Vendor & employment contracts", hi: "विक्रेता और रोजगार अनुबंध" },
                  ],
                  cta: { en: "Explore Compliance", hi: "अनुपालन देखें", href: "/compliance", external: false },
                  dark: false,
                },
              ].map((card, i) => (
                <Reveal key={card.tagEn} delay={i * 80}>
                  <div className="audience-card" style={{
                    background: card.dark ? "var(--ink)" : "var(--white)",
                    borderColor: card.dark ? "transparent" : "var(--ink-7)",
                  }}>
                    {/* Icon + tag */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{
                        width: 46, height: 46, borderRadius: 12, flexShrink: 0,
                        background: card.dark ? "rgba(201,168,76,0.12)" : "var(--ink-9)",
                        border: `1px solid ${card.dark ? "rgba(201,168,76,0.2)" : "var(--ink-7)"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: card.dark ? "var(--gold)" : "var(--gold-dk)",
                      }}>
                        {card.icon}
                      </div>
                      <div style={{
                        padding: "3px 12px",
                        borderRadius: 100,
                        background: card.dark ? "rgba(201,168,76,0.1)" : "var(--gold-pale)",
                        border: `1px solid ${card.dark ? "rgba(201,168,76,0.25)" : "var(--gold)"}`,
                      }}>
                        <span style={{
                          fontFamily: "var(--mono)", fontSize: "8px", letterSpacing: "0.16em",
                          textTransform: "uppercase", fontWeight: 600,
                          color: card.dark ? "var(--gold-lt)" : "var(--gold-dk)",
                        }}>
                          {lang === "en" ? card.tagEn : card.tagHi}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 style={{
                        fontFamily: "var(--serif)", fontSize: "22px", fontWeight: 600,
                        color: card.dark ? "white" : "var(--ink)",
                        marginBottom: 10, lineHeight: 1.25, letterSpacing: "-0.015em",
                      }}>
                        {lang === "en" ? card.titleEn : card.titleHi}
                      </h3>
                      <p style={{
                        fontFamily: "var(--sans)", fontSize: "13px",
                        color: card.dark ? "rgba(255,255,255,0.5)" : "var(--ink-5)",
                        lineHeight: 1.75, fontWeight: 300,
                      }}>
                        {lang === "en" ? card.descEn : card.descHi}
                      </p>
                    </div>

                    {/* Bullets */}
                    <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                      {card.bullets.map((b) => (
                        <li key={b.en} style={{
                          display: "flex", alignItems: "center", gap: 9,
                          fontFamily: "var(--sans)", fontSize: "12.5px", fontWeight: 500,
                          color: card.dark ? "rgba(255,255,255,0.65)" : "var(--ink-3)",
                        }}>
                          <div style={{
                            width: 16, height: 16, borderRadius: "50%", flexShrink: 0,
                            background: card.dark ? "rgba(201,168,76,0.12)" : "var(--gold-pale)",
                            border: `1px solid ${card.dark ? "rgba(201,168,76,0.25)" : "var(--gold)"}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            <CheckCircle style={{ width: 8, height: 8, color: card.dark ? "var(--gold)" : "var(--gold-dk)" }} />
                          </div>
                          {lang === "en" ? b.en : b.hi}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    {card.cta.external ? (
                      <a href={card.cta.href} target="_blank" rel="noopener noreferrer" style={{
                        display: "inline-flex", alignItems: "center", gap: 7,
                        fontFamily: "var(--sans)", fontSize: "12.5px", fontWeight: 700,
                        color: card.dark ? "var(--gold-lt)" : "var(--gold-dk)",
                        textDecoration: "none", marginTop: "auto",
                        borderTop: `1px solid ${card.dark ? "rgba(255,255,255,0.08)" : "var(--ink-8)"}`,
                        paddingTop: 16,
                      }}>
                        {lang === "en" ? card.cta.en : card.cta.hi}
                        <ArrowRight style={{ width: 13, height: 13 }} />
                      </a>
                    ) : (
                      <Link href={card.cta.href} style={{
                        display: "inline-flex", alignItems: "center", gap: 7,
                        fontFamily: "var(--sans)", fontSize: "12.5px", fontWeight: 700,
                        color: card.dark ? "var(--gold-lt)" : "var(--gold-dk)",
                        textDecoration: "none", marginTop: "auto",
                        borderTop: `1px solid ${card.dark ? "rgba(255,255,255,0.08)" : "var(--ink-8)"}`,
                        paddingTop: 16,
                      }}>
                        {lang === "en" ? card.cta.en : card.cta.hi}
                        <ArrowRight style={{ width: 13, height: 13 }} />
                      </Link>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            ACTIONS
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="section-pad" style={{ background: "var(--white)" }}>
          <div className="max-w" style={{ padding: "0 28px" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 64 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                  <span className="eyebrow">{lang === "en" ? "What do you need?" : "आपको क्या चाहिए?"}</span>
                </div>
                <h2 style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(32px, 4.5vw, 56px)",
                  fontWeight: 600, letterSpacing: "-0.025em", color: "var(--ink)", lineHeight: 1.1,
                }}>
                  {lang === "en" ? "Legal help that" : "कानूनी मदद जो"}<br />
                  <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--ink-3)" }}>
                    {lang === "en" ? "takes action." : "कार्रवाई करती है।"}
                  </span>
                </h2>
              </div>
            </Reveal>

            {/* Top row: 3 cards */}
            {/* <div className="actions-grid">
              {actions.map((action, i) => (
                <Reveal key={action.titleEn} delay={i * 65}>
                  <a
                    href={action.href}
                    target={action.href.startsWith("http") ? "_blank" : undefined}
                    rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="action-card"
                    style={{ height: "100%", textDecoration: "none" }}>
                    {action.badge && (
                      <div style={{
                        position: "absolute", top: 16, right: 16,
                        padding: "3px 9px", borderRadius: 100,
                        background: "var(--gold-pale)", border: "1px solid var(--gold)",
                        fontFamily: "var(--mono)", fontSize: "7.5px",
                        color: "var(--gold-dk)", fontWeight: 600, letterSpacing: "0.06em",
                      }}>{action.badge}</div>
                    )}
                    <div style={{
                      width: 50, height: 50, borderRadius: 13,
                      background: i % 2 === 0 ? "var(--ink)" : "var(--ink-9)",
                      border: `1px solid ${i % 2 === 0 ? "transparent" : "var(--ink-7)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: i % 2 === 0 ? "var(--gold)" : "var(--gold-dk)",
                      boxShadow: i % 2 === 0 ? "0 4px 16px rgba(12,11,9,0.15)" : "none",
                    }}>
                      {action.icon}
                    </div>
                    <div>
                      <h3 style={{
                        fontFamily: "var(--serif)", fontSize: "20px", fontWeight: 600,
                        color: "var(--ink)", marginBottom: 8, lineHeight: 1.25,
                        letterSpacing: "-0.01em",
                      }}>
                        {lang === "en" ? action.titleEn : action.titleHi}
                      </h3>
                      <p style={{ fontFamily: "var(--sans)", fontSize: "12.5px", color: "var(--ink-5)", lineHeight: 1.7, fontWeight: 300 }}>
                        {lang === "en" ? action.descEn : action.descHi}
                      </p>
                    </div>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 6,
                      fontFamily: "var(--mono)", fontSize: "9px",
                      color: "var(--gold-dk)", letterSpacing: "0.1em",
                      marginTop: "auto", textTransform: "uppercase",
                    }}>
                      {lang === "en" ? "Get started" : "शुरू करें"}
                      <ChevronRight style={{ width: 11, height: 11 }} />
                    </div>
                  </a>
                </Reveal>
              ))}
            </div> */}

            {/* Bottom row: Talk + Startup + Compliance */}
            <div className="actions-grid-bottom">
              {actionsBottom.map((action, i) => (
                <Reveal key={action.titleEn} delay={200 + i * 65}>
                  <Link
                    href={action.href}
                    className="action-card"
                    style={{ height: "100%", textDecoration: "none" }}>
                    {action.badge && (
                      <div style={{
                        position: "absolute", top: 16, right: 16,
                        padding: "3px 9px", borderRadius: 100,
                        background: i === 2 ? "var(--ink)" : "var(--gold-pale)",
                        border: `1px solid ${i === 2 ? "transparent" : "var(--gold)"}`,
                        fontFamily: "var(--mono)", fontSize: "7.5px",
                        color: i === 2 ? "var(--gold)" : "var(--gold-dk)",
                        fontWeight: 600, letterSpacing: "0.06em",
                      }}>{action.badge}</div>
                    )}
                    <div style={{
                      width: 50, height: 50, borderRadius: 13,
                      background: i === 1 ? "var(--ink)" : "var(--ink-9)",
                      border: `1px solid ${i === 1 ? "transparent" : "var(--ink-7)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: i === 1 ? "var(--gold)" : "var(--gold-dk)",
                      boxShadow: i === 1 ? "0 4px 16px rgba(12,11,9,0.15)" : "none",
                    }}>
                      {action.icon}
                    </div>
                    <div>
                      <h3 style={{
                        fontFamily: "var(--serif)", fontSize: "20px", fontWeight: 600,
                        color: "var(--ink)", marginBottom: 8, lineHeight: 1.25,
                        letterSpacing: "-0.01em",
                      }}>
                        {lang === "en" ? action.titleEn : action.titleHi}
                      </h3>
                      <p style={{ fontFamily: "var(--sans)", fontSize: "12.5px", color: "var(--ink-5)", lineHeight: 1.7, fontWeight: 300 }}>
                        {lang === "en" ? action.descEn : action.descHi}
                      </p>
                    </div>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 6,
                      fontFamily: "var(--mono)", fontSize: "9px",
                      color: "var(--gold-dk)", letterSpacing: "0.1em",
                      marginTop: "auto", textTransform: "uppercase",
                    }}>
                      {lang === "en" ? "Get started" : "शुरू करें"}
                      <ChevronRight style={{ width: 11, height: 11 }} />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            STATS BAR
        ═══════════════════════════════════════════════════════════════════════ */}
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
            <div className="stat-bar">
              {[
                { value: "60+", en: "Verified Lawyers", hi: "सत्यापित वकील" },
                { value: "25+", en: "Cases Resolved", hi: "मामले सुलझे" },
                { value: "4.9★", en: "Average Rating", hi: "औसत रेटिंग" },
                { value: "<2min", en: "AI Response Time", hi: "एआई प्रतिक्रिया" },
              ].map((s, i) => (
                <div key={s.en} style={{
                  padding: "36px 24px", textAlign: "center",
                  borderRight: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  position: "relative",
                }}>
                  <div style={{ fontFamily: "var(--serif)", fontSize: "38px", fontWeight: 600, lineHeight: 1, marginBottom: 8 }} className="gold-text">
                    {s.value}
                  </div>
                  <div style={{
                    fontFamily: "var(--mono)", fontSize: "8.5px",
                    color: "rgba(255,255,255,0.25)", letterSpacing: "0.18em", textTransform: "uppercase",
                  }}>
                    {lang === "en" ? s.en : s.hi}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════
            COMPLIANCE PREVIEW SECTION (NEW)
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="section-pad" style={{
          background: "var(--ink)",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          position: "relative", overflow: "hidden",
        }}>
          {/* Decorative grid */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(rgba(201,168,76,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px", pointerEvents: "none",
          }} />
          {/* Radial glow */}
          <div style={{
            position: "absolute", right: "-10%", top: "50%", transform: "translateY(-50%)",
            width: 600, height: 600, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <div className="max-w" style={{ padding: "0 28px", position: "relative", zIndex: 1 }}>
            {/* Responsive grid: stacked on mobile, side-by-side on desktop */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 80,
              alignItems: "center",
              // Responsive breakpoint inside style tag is not directly possible,
              // but we can use a media query via a className or inline style with a wrapper.
              // For this component, we'll rely on the existing global responsive CSS.
            }} className="compliance-responsive-grid">
              {/* Override grid layout for mobile using CSS */}
              <style>{`
                @media (max-width: 900px) {
                  .compliance-responsive-grid {
                    grid-template-columns: 1fr !important;
                    gap: 48px !important;
                  }
                }
              `}</style>

              {/* Left: copy - fully responsive text */}
              <Reveal>
                <div style={{ width: "100%" }}>
                  <div style={{ marginBottom: 20 }}>
                    <span className="eyebrow" style={{ color: "var(--gold)" }}>
                      {lang === "en" ? "Built for modern businesses" : "आधुनिक व्यवसायों के लिए"}
                    </span>
                  </div>
                  <h2 style={{
                    fontFamily: "var(--serif)",
                    fontSize: "clamp(28px, 4vw, 52px)",
                    fontWeight: 600, lineHeight: 1.1,
                    letterSpacing: "-0.025em", color: "white", marginBottom: 12,
                  }}>
                    {lang === "en" ? "Compliance," : "अनुपालन,"}<br />
                    <span className="gold-text" style={{ fontWeight: 300, fontStyle: "italic" }}>
                      {lang === "en" ? "without the headache." : "बिना सिरदर्द के।"}
                    </span>
                  </h2>

                  <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "22px 0 24px" }}>
                    <div style={{ width: 40, height: 1, background: "linear-gradient(90deg, var(--gold-dk), var(--gold))" }} />
                    <Scale style={{ width: 9, height: 9, color: "var(--gold)" }} />
                    <div style={{ width: 20, height: 1, background: "linear-gradient(90deg, var(--gold), transparent)" }} />
                  </div>

                  <p style={{
                    fontFamily: "var(--sans)", fontSize: "clamp(13px, 3vw, 14.5px)",
                    color: "rgba(255,255,255,0.5)", lineHeight: 1.9, marginBottom: 32, fontWeight: 300,
                  }}>
                    {lang === "en"
                      ? "From POSH compliance to FSSAI registration, we handle the legal overhead so you can focus on growing your business."
                      : "POSH अनुपालन से FSSAI पंजीकरण तक, हम कानूनी जटिलता संभालते हैं।"}
                  </p>

                  {/* Trust badges - fully responsive wrapping */}
                  <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "clamp(8px, 2vw, 10px)",
                    marginBottom: 36,
                    justifyContent: "flex-start",
                  }}>
                    {[
                      { en: "Verified Experts", hi: "सत्यापित विशेषज्ञ", icon: <BadgeCheck style={{ width: 10, height: 10 }} /> },
                      { en: "Business Legal Support", hi: "व्यावसायिक कानूनी", icon: <Briefcase style={{ width: 10, height: 10 }} /> },
                      { en: "Transparent Pricing", hi: "पारदर्शी मूल्य", icon: <IndianRupee style={{ width: 10, height: 10 }} /> },
                    ].map(b => (
                      <div key={b.en} style={{
                        display: "inline-flex", alignItems: "center", gap: 7,
                        padding: "7px 14px",
                        border: "1px solid rgba(201,168,76,0.2)",
                        borderRadius: 100, background: "rgba(201,168,76,0.06)",
                        fontFamily: "var(--mono)", fontSize: "clamp(7px, 2vw, 8.5px)",
                        color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em",
                        whiteSpace: "nowrap",
                      }}>
                        <span style={{ color: "var(--gold)", flexShrink: 0 }}>{b.icon}</span>
                        {lang === "en" ? b.en : b.hi}
                      </div>
                    ))}
                  </div>

                  <Link href="/compliance" className="btn btn-gold" style={{ textDecoration: "none", display: "inline-flex" }}>
                    {lang === "en" ? "Explore Compliance" : "अनुपालन देखें"}
                    <ArrowRight style={{ width: 14, height: 14 }} />
                  </Link>
                </div>
              </Reveal>

              {/* Right: compliance dashboard card - fully responsive */}
              <Reveal delay={100}>
                <div style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(201,168,76,0.15)",
                  borderRadius: "var(--radius-xl)",
                  overflow: "hidden",
                  width: "100%",
                }}>
                  {/* Card header - responsive padding */}
                  <div style={{
                    padding: "clamp(12px, 2vw, 14px) clamp(16px, 3vw, 20px)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    background: "rgba(201,168,76,0.04)",
                    flexWrap: "wrap",
                    gap: 8,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <ShieldCheck style={{ width: 13, height: 13, color: "var(--gold)", flexShrink: 0 }} />
                      <span style={{ fontFamily: "var(--mono)", fontSize: "clamp(7px, 2vw, 8.5px)", color: "rgba(255,255,255,0.45)", letterSpacing: "0.16em", textTransform: "uppercase" }}>
                        {lang === "en" ? "Compliance Services" : "अनुपालन सेवाएं"}
                      </span>
                    </div>
                    <div style={{
                      padding: "3px 10px", borderRadius: 100,
                      background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)",
                      fontFamily: "var(--mono)", fontSize: "clamp(6px, 1.8vw, 7.5px)", color: "#4ade80", letterSpacing: "0.1em",
                      whiteSpace: "nowrap",
                    }}>
                      {lang === "en" ? "Active" : "सक्रिय"}
                    </div>
                  </div>

                  {/* Compliance items - responsive padding and layout */}
                  <div style={{
                    padding: "clamp(12px, 2vw, 16px)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8
                  }}>
                    {[
                      { icon: <Users style={{ width: 13, height: 13 }} />, en: "POSH Compliance", hi: "POSH अनुपालन", tagEn: "Mandatory", tagHi: "अनिवार्य" },
                      { icon: <Store style={{ width: 13, height: 13 }} />, en: "FSSAI Registration", hi: "FSSAI पंजीकरण", tagEn: "Food business", tagHi: "खाद्य व्यवसाय" },
                      { icon: <Landmark style={{ width: 13, height: 13 }} />, en: "MSME Registration", hi: "MSME पंजीकरण", tagEn: "Free govt scheme", tagHi: "सरकारी योजना" },
                      { icon: <Building2 style={{ width: 13, height: 13 }} />, en: "Shop & Establishment", hi: "शॉप एंड एस्टेब्लिशमेंट", tagEn: "Required", tagHi: "आवश्यक" },
                      { icon: <HardHat style={{ width: 13, height: 13 }} />, en: "Labour Compliance", hi: "श्रम अनुपालन", tagEn: "HR protection", tagHi: "एचआर सुरक्षा" },
                      { icon: <FileText style={{ width: 13, height: 13 }} />, en: "Legal Documentation", hi: "कानूनी दस्तावेज़ीकरण", tagEn: "Contracts & policies", tagHi: "अनुबंध" },
                    ].map((item, idx) => (
                      <div key={item.en} className="compliance-item" style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "clamp(10px, 2vw, 12px)",
                        padding: "clamp(12px, 2vw, 16px) clamp(12px, 2vw, 18px)",
                        border: "1px solid rgba(201,168,76,0.15)",
                        borderRadius: "var(--radius)",
                        background: "rgba(255,255,255,0.05)",
                        transition: "all 0.22s cubic-bezier(0.16,1,0.3,1)",
                        cursor: "default",
                        flexWrap: "wrap",
                      }}>
                        <div style={{
                          width: "clamp(28px, 5vw, 32px)",
                          height: "clamp(28px, 5vw, 32px)",
                          borderRadius: 8, flexShrink: 0,
                          background: "rgba(201,168,76,0.08)",
                          border: "1px solid rgba(201,168,76,0.15)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "var(--gold)",
                        }}>
                          {item.icon}
                        </div>
                        <div style={{ flex: 1, minWidth: "120px" }}>
                          <div style={{
                            fontFamily: "var(--sans)",
                            fontSize: "clamp(11px, 2.5vw, 12.5px)",
                            fontWeight: 600,
                            color: "rgba(255,255,255,0.75)",
                            lineHeight: 1.3,
                          }}>
                            {lang === "en" ? item.en : item.hi}
                          </div>
                          <div style={{
                            fontFamily: "var(--mono)",
                            fontSize: "clamp(7px, 1.8vw, 8px)",
                            color: "rgba(255,255,255,0.25)",
                            letterSpacing: "0.08em",
                            marginTop: 2,
                            lineHeight: 1.4,
                          }}>
                            {lang === "en" ? item.tagEn : item.tagHi}
                          </div>
                        </div>
                        <ChevronRight style={{
                          width: "clamp(10px, 2vw, 12px)",
                          height: "clamp(10px, 2vw, 12px)",
                          color: "rgba(255,255,255,0.2)",
                          flexShrink: 0
                        }} />
                      </div>
                    ))}
                  </div>

                  {/* Card footer - responsive */}
                  <div style={{
                    padding: "clamp(10px, 2vw, 14px) clamp(16px, 3vw, 20px)",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    background: "rgba(201,168,76,0.03)",
                    flexWrap: "wrap",
                    gap: 8,
                  }}>
                    <span style={{
                      fontFamily: "var(--mono)",
                      fontSize: "clamp(7px, 2vw, 8px)",
                      color: "rgba(255,255,255,0.25)",
                      letterSpacing: "0.1em",
                      lineHeight: 1.4,
                    }}>
                      {lang === "en" ? "Expert-assisted · Pan India" : "विशेषज्ञ-सहायता · पूरे भारत"}
                    </span>
                    <Link href="/compliance" style={{
                      fontFamily: "var(--mono)",
                      fontSize: "clamp(7px, 2vw, 8.5px)",
                      fontWeight: 600,
                      color: "var(--gold-lt)",
                      textDecoration: "none",
                      letterSpacing: "0.08em",
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      whiteSpace: "nowrap",
                    }}>
                      {lang === "en" ? "View all" : "सभी देखें"}
                      <ArrowRight style={{ width: 10, height: 10 }} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            STARTUP SECTION
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="section-pad" style={{
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

          <div className="max-w" style={{ padding: "0 28px" }}>
            <div className="startup-grid">
              <Reveal>
                <div>
                  <div style={{ marginBottom: 20 }}>
                    <span className="eyebrow">{lang === "en" ? "For Startups" : "स्टार्टअप्स के लिए"}</span>
                  </div>
                  <h2 style={{
                    fontFamily: "var(--serif)",
                    fontSize: "clamp(28px, 4vw, 52px)",
                    fontWeight: 600, lineHeight: 1.08,
                    letterSpacing: "-0.025em", color: "var(--ink)", marginBottom: 12,
                  }}>
                    {lang === "en" ? "Legal support" : "कानूनी सहायता"}<br />
                    <span style={{ fontWeight: 300, fontStyle: "italic", color: "var(--ink-3)" }}>
                      {lang === "en" ? "built for founders." : "संस्थापकों के लिए।"}
                    </span>
                  </h2>

                  <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "22px 0 24px" }}>
                    <div style={{ width: 40, height: 1, background: "linear-gradient(90deg, var(--gold-dk), var(--gold))" }} />
                    <Scale style={{ width: 9, height: 9, color: "var(--gold)" }} />
                    <div style={{ width: 20, height: 1, background: "linear-gradient(90deg, var(--gold), transparent)" }} />
                  </div>

                  <p style={{
                    fontFamily: "var(--sans)", fontSize: "14.5px",
                    color: "var(--ink-4)", lineHeight: 1.9, marginBottom: 12, fontWeight: 300,
                  }}>
                    {lang === "en"
                      ? "Running a startup shouldn't mean drowning in legal uncertainty. Get contracts reviewed, NDAs drafted, and compliance handled at a flat monthly rate."
                      : "स्टार्टअप चलाने का मतलब कानूनी अनिश्चितता नहीं। अनुबंध समीक्षा, एनडीए, और अनुपालन फ्लैट मासिक दर पर।"}
                  </p>

                  <div style={{
                    display: "inline-flex", alignItems: "baseline", gap: 6,
                    padding: "12px 20px",
                    background: "var(--gold-pale)", border: "1px solid var(--gold)",
                    borderRadius: "var(--radius)", marginBottom: 32,
                  }}>
                    <span style={{ fontFamily: "var(--serif)", fontSize: "30px", fontWeight: 600, color: "var(--gold-dk)" }}>₹999</span>
                    <span style={{ fontFamily: "var(--sans)", fontSize: "13px", color: "var(--gold-dk)", fontWeight: 500 }}>
                      {lang === "en" ? "/ month" : "/ माह"}
                    </span>
                  </div>
                  <br />
                  <Link href="/startup-legal" className="btn btn-ink" style={{ textDecoration: "none" }}>
                    {lang === "en" ? "View Plans" : "योजनाएं देखें"}
                    <ArrowRight style={{ width: 14, height: 14 }} />
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                  {[
                    { icon: <FileSignature style={{ width: 15, height: 15 }} />, en: "Contracts & NDAs", hi: "अनुबंध और एनडीए", descEn: "Legally sound agreements drafted and reviewed by verified lawyers.", descHi: "सत्यापित वकीलों द्वारा तैयार कानूनी समझौते।", dark: true },
                    { icon: <Gavel style={{ width: 15, height: 15 }} />, en: "Legal Consultation", hi: "कानूनी परामर्श", descEn: "30-min expert session plain language, real advice.", descHi: "30 मिनट का विशेषज्ञ सत्र।", dark: false },
                    { icon: <CheckCircle style={{ width: 15, height: 15 }} />, en: "Compliance Basics", hi: "अनुपालन बेसिक्स", descEn: "Know what you need, when you need it. No surprises.", descHi: "जानें आपको क्या चाहिए, कब चाहिए।", dark: true },
                    { icon: <IndianRupee style={{ width: 15, height: 15 }} />, en: "Transparent Pricing", hi: "पारदर्शी मूल्य", descEn: "Fixed monthly rate. No billing by the hour.", descHi: "निश्चित मासिक दर। प्रति घंटे बिलिंग नहीं।", dark: false },
                  ].map((item) => (
                    <div key={item.en} className="card" style={{
                      padding: "20px 22px", display: "flex", gap: 15, alignItems: "flex-start",
                    }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                        background: item.dark ? "var(--ink)" : "var(--ink-9)",
                        border: `1px solid ${item.dark ? "transparent" : "var(--ink-7)"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: item.dark ? "var(--gold)" : "var(--gold-dk)",
                        boxShadow: item.dark ? "0 3px 12px rgba(12,11,9,0.15)" : "none",
                      }}>
                        {item.icon}
                      </div>
                      <div>
                        <div style={{ fontFamily: "var(--serif)", fontSize: "16px", fontWeight: 600, color: "var(--ink)", marginBottom: 4, letterSpacing: "-0.01em" }}>
                          {lang === "en" ? item.en : item.hi}
                        </div>
                        <p style={{ fontFamily: "var(--sans)", fontSize: "12px", color: "var(--ink-5)", lineHeight: 1.65, fontWeight: 300 }}>
                          {lang === "en" ? item.descEn : item.descHi}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            OUTCOMES
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="section-pad" style={{ background: "var(--white)" }}>
          <div className="max-w" style={{ padding: "0 28px" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 60 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                  <span className="eyebrow">{lang === "en" ? "Real outcomes" : "वास्तविक परिणाम"}</span>
                </div>
                <h2 style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(28px, 4vw, 50px)",
                  fontWeight: 600, letterSpacing: "-0.02em", color: "var(--ink)",
                }}>
                  {lang === "en" ? "Not promises." : "वादे नहीं।"}{" "}
                  <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--ink-3)" }}>
                    {lang === "en" ? "Results." : "परिणाम।"}
                  </span>
                </h2>
              </div>
            </Reveal>

            <div className="outcomes-grid">
              {[
                {
                  amount: "₹25,000", avatar: "AK",
                  en: "Recovered via legal notice", hi: "कानूनी नोटिस से वसूल",
                  tagEn: "Money dispute", tagHi: "धन विवाद",
                  descEn: "A Lucknow user recovered unpaid rent with a single legal notice drafted in 2 hours.",
                  descHi: "लखनऊ में उपयोगकर्ता ने 2 घंटे में एक नोटिस से किराया वसूल किया।",
                },
                {
                  amount: "2 hrs", avatar: "RV",
                  en: "NDA reviewed & signed", hi: "एनडीए समीक्षा व हस्ताक्षरित",
                  tagEn: "Startup", tagHi: "स्टार्टअप",
                  descEn: "A Bengaluru founder got a co-founder NDA reviewed and ready before the meeting ended.",
                  descHi: "बेंगलुरु संस्थापक को बैठक से पहले एनडीए तैयार मिल गई।",
                },
                {
                  amount: "No court", avatar: "MB",
                  en: "Property boundary settled", hi: "संपत्ति सीमा तय",
                  tagEn: "Property", tagHi: "संपत्ति",
                  descEn: "A Patna family resolved a plot dispute with a guided notice no courtroom required.",
                  descHi: "पटना परिवार ने नोटिस से विवाद सुलझाया अदालत की जरूरत नहीं।",
                },
              ].map((item, i) => (
                <Reveal key={item.en} delay={i * 75}>
                  <div className="card" style={{ padding: "34px 30px", position: "relative", overflow: "hidden", height: "100%" }}>
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0, height: 3,
                      background: "linear-gradient(90deg, var(--gold-dk), var(--gold), var(--gold-lt))",
                    }} />
                    <div style={{
                      display: "inline-flex", alignItems: "center",
                      padding: "3px 11px",
                      background: "var(--gold-pale)", border: "1px solid var(--gold)",
                      borderRadius: 100, marginBottom: 20,
                    }}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: "8px", color: "var(--gold-dk)", letterSpacing: "0.12em" }}>
                        {lang === "en" ? item.tagEn : item.tagHi}
                      </span>
                    </div>
                    <div style={{
                      fontFamily: "var(--serif)", fontSize: "40px", fontWeight: 600,
                      color: "var(--ink)", lineHeight: 1, marginBottom: 8, letterSpacing: "-0.02em",
                    }}>{item.amount}</div>
                    <div style={{
                      fontFamily: "var(--sans)", fontSize: "13.5px", fontWeight: 600,
                      color: "var(--ink-3)", marginBottom: 14,
                    }}>
                      {lang === "en" ? item.en : item.hi}
                    </div>
                    <p style={{ fontFamily: "var(--sans)", fontSize: "12.5px", color: "var(--ink-5)", lineHeight: 1.75, marginBottom: 24, fontWeight: 300 }}>
                      {lang === "en" ? item.descEn : item.descHi}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 18, borderTop: "1px solid var(--ink-8)" }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: "50%", background: "var(--ink)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "var(--mono)", fontSize: "9px", color: "var(--gold)", fontWeight: 600, flexShrink: 0,
                      }}>{item.avatar}</div>
                      <div style={{
                        display: "flex", alignItems: "center", gap: 5,
                        fontFamily: "var(--mono)", fontSize: "8.5px", color: "var(--green)",
                        background: "#f0fdf4", padding: "4px 10px", borderRadius: 100,
                        border: "1px solid #bbf7d0",
                      }}>
                        <CheckCircle style={{ width: 8, height: 8 }} />
                        {lang === "en" ? "Verified outcome" : "सत्यापित परिणाम"}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            TESTIMONIALS
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="section-pad" style={{
          background: "var(--ink-9)",
          borderTop: "1px solid var(--ink-7)", borderBottom: "1px solid var(--ink-7)",
          position: "relative", overflow: "hidden",
        }}>
          <div className="max-w" style={{ padding: "0 28px", position: "relative", zIndex: 1 }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 56 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                  <span className="eyebrow">{lang === "en" ? "Client stories" : "ग्राहक कहानियां"}</span>
                </div>
                <h2 style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(26px, 3.8vw, 48px)",
                  fontWeight: 600, letterSpacing: "-0.022em", color: "var(--ink)",
                }}>
                  {lang === "en" ? "Trusted across" : "पूरे"}{" "}
                  <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--ink-3)" }}>
                    {lang === "en" ? "India." : "भारत में विश्वसनीय।"}
                  </span>
                </h2>
              </div>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 18 }}>
              {testimonials.map((item, i) => (
                <Reveal key={item.name} delay={i * 75}>
                  <div className="card" style={{
                    padding: "32px 28px", height: "100%", position: "relative", overflow: "hidden",
                    cursor: "default",
                  }}>
                    <div style={{
                      position: "absolute", top: 10, left: 20,
                      fontFamily: "var(--serif)", fontSize: "72px", lineHeight: 1,
                      color: "rgba(201,168,76,0.07)", userSelect: "none",
                      pointerEvents: "none",
                    }}>"</div>
                    <div style={{ display: "flex", gap: 2, marginBottom: 18 }}>
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} style={{
                          width: 12, height: 12,
                          fill: j < item.rating ? "var(--gold)" : "var(--ink-7)",
                          color: j < item.rating ? "var(--gold)" : "var(--ink-7)",
                        }} />
                      ))}
                    </div>
                    <p style={{
                      fontFamily: "var(--serif)", fontSize: "16px", fontStyle: "italic",
                      fontWeight: 300, color: "var(--ink-3)",
                      lineHeight: 1.8, marginBottom: 24,
                    }}>
                      {lang === "en" ? item.textEn : item.textHi}
                    </p>
                    <div style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      paddingTop: 18, borderTop: "1px solid var(--ink-8)",
                      flexWrap: "wrap", gap: 10,
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: "50%",
                          background: "var(--ink)", border: "1px solid var(--ink-6)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontFamily: "var(--mono)", fontSize: "9.5px", fontWeight: 600, color: "var(--gold)", flexShrink: 0,
                        }}>{item.avatar}</div>
                        <div>
                          <div style={{ fontFamily: "var(--sans)", fontSize: "13px", fontWeight: 600, color: "var(--ink)" }}>{item.name}</div>
                          <div style={{ fontFamily: "var(--sans)", fontSize: "11px", color: "var(--ink-5)", marginTop: 2 }}>{item.location}</div>
                        </div>
                      </div>
                      <div style={{
                        display: "flex", alignItems: "center", gap: 5,
                        fontFamily: "var(--mono)", fontSize: "8px", color: "var(--green)",
                        background: "#f0fdf4", padding: "4px 10px",
                        borderRadius: 100, border: "1px solid #bbf7d0",
                      }}>
                        <CheckCircle style={{ width: 8, height: 8 }} />
                        {lang === "en" ? "Verified" : "सत्यापित"}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            FAQ
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="section-pad" style={{ background: "var(--white)" }}>
          <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 28px" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 56 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                  <span className="eyebrow">FAQ</span>
                </div>
                <h2 style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(26px, 3.8vw, 46px)",
                  fontWeight: 600, letterSpacing: "-0.022em", color: "var(--ink)", marginBottom: 10,
                }}>
                  {lang === "en" ? "Legal questions," : "कानूनी प्रश्न,"}<br />
                  <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--ink-3)" }}>
                    {lang === "en" ? "answered simply." : "सरल उत्तर।"}
                  </span>
                </h2>
                <p style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "var(--ink-5)", fontWeight: 300 }}>
                  {lang === "en" ? "Everything you need to know before getting legal help." : "कानूनी मदद लेने से पहले आपको जो जानना चाहिए।"}
                </p>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <div>
                {faqs.map(item => (
                  <FaqItem key={item.qEn} q={item.qEn} a={item.aEn} qHi={item.qHi} aHi={item.aHi} lang={lang} />
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            CTA SECTION
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="section-pad" style={{
          background: "var(--ink-9)",
          borderTop: "1px solid var(--ink-7)", borderBottom: "1px solid var(--ink-7)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700, height: 500, borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1, padding: "0 28px" }}>
            <Reveal>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "6px 16px",
                border: "1px solid var(--gold)",
                borderRadius: 100, marginBottom: 32,
                background: "var(--gold-pale)",
              }}>
                <Sparkles style={{ width: 11, height: 11, color: "var(--gold-dk)" }} />
                <span style={{
                  fontFamily: "var(--mono)", fontSize: "8.5px", color: "var(--gold-dk)",
                  letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500,
                }}>
                  {lang === "en" ? "Free to start" : "शुरू करने के लिए मुफ्त"}
                </span>
              </div>
              <h2 style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(32px, 5.5vw, 60px)",
                fontWeight: 600,
                color: "var(--ink)",
                letterSpacing: "-0.028em",
                lineHeight: 1.4,
                marginBottom: 18,
              }}>
                {lang === "en" ? "From confusion" : "भ्रम से"}<br />
                <span className="gold-text" style={{
                  fontStyle: "italic",
                  fontWeight: 300,
                  display: "inline-block",
                  lineHeight: 1.4,
                  paddingTop: "0.15rem",
                }}>
                  {lang === "en" ? "to action." : "कार्रवाई तक।"}
                </span>
              </h2>

              <p style={{
                fontFamily: "var(--sans)", fontSize: "15px",
                color: "var(--ink-4)", lineHeight: 1.9,
                maxWidth: 480, margin: "0 auto 40px", fontWeight: 300,
              }}>
                {lang === "en"
                  ? "Individuals, startups & businesses NyayMitra is your legal operating system. Free AI consultation, verified lawyers, transparent pricing."
                  : "व्यक्ति, स्टार्टअप और व्यवसाय न्यायमित्र आपका कानूनी ऑपरेटिंग सिस्टम है।"}
              </p>

              <div className="cta-row">
                <a href={waGeneral} target="_blank" rel="noopener noreferrer" className="btn btn-ink" style={{ gap: 10 }}>
                  <WaSvg size={15} />
                  {lang === "en" ? "Get Help on WhatsApp" : "व्हाट्सएप पर मदद लें"}
                </a>
                <Link href="/startup-legal" className="btn btn-ghost" style={{ textDecoration: "none" }}>
                  {lang === "en" ? "Startup Legal →" : "स्टार्टअप कानूनी →"}
                </Link>
                <Link href="/compliance" className="btn btn-ghost" style={{ textDecoration: "none" }}>
                  {lang === "en" ? "Compliance →" : "अनुपालन →"}
                </Link>
              </div>

              <div style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: 24, marginTop: 36, flexWrap: "wrap",
              }}>
                {[
                  { icon: <BadgeCheck style={{ width: 10, height: 10 }} />, en: "Verified Legal Experts", hi: "सत्यापित कानूनी विशेषज्ञ" },
                  { icon: <Star style={{ width: 10, height: 10 }} />, en: "4.9★ Rated", hi: "4.9★ रेटेड" },
                  { icon: <Zap style={{ width: 10, height: 10 }} />, en: "< 2 min Response", hi: "< 2 मिनट प्रतिक्रिया" },
                  { icon: <TrendingUp style={{ width: 10, height: 10 }} />, en: "Startup Friendly", hi: "स्टार्टअप अनुकूल" },
                ].map(t => (
                  <div key={t.en} style={{
                    display: "flex", alignItems: "center", gap: 6,
                    fontFamily: "var(--mono)", fontSize: "9px",
                    color: "var(--ink-5)", letterSpacing: "0.08em",
                  }}>
                    <span style={{ color: "var(--gold-dk)" }}>{t.icon}</span>
                    {lang === "en" ? t.en : t.hi}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            FOOTER
        ═══════════════════════════════════════════════════════════════════════ */}
        <footer style={{
          background: "var(--ink)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "72px 28px 40px",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(rgba(201,168,76,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.02) 1px, transparent 1px)",
            backgroundSize: "64px 64px", pointerEvents: "none",
          }} />

          <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div className="footer-grid" style={{ marginBottom: 48, paddingBottom: 44, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              {/* Brand col */}
              <div>
                <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 11, textDecoration: "none", marginBottom: 16 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 9, background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(201,168,76,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Scale style={{ color: "var(--gold)", width: 15, height: 15 }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--serif)", fontSize: "18px", fontWeight: 600, color: "white", lineHeight: 1, letterSpacing: "-0.02em" }}>NyayMitra</div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: "7px", color: "rgba(201,168,76,0.6)", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 2 }}>
                      {lang === "en" ? "Legal OS · India" : "कानूनी ओएस · भारत"}
                    </div>
                  </div>
                </Link>
                <p style={{
                  fontFamily: "var(--sans)", fontSize: "12.5px",
                  color: "rgba(255,255,255,0.35)", lineHeight: 1.75,
                  maxWidth: 240, marginBottom: 22, fontWeight: 300,
                }}>
                  {lang === "en" ? "Legal operating system for individuals, startups & businesses. From confusion to action." : "व्यक्तियों, स्टार्टअप और व्यवसायों के लिए कानूनी ओएस।"}
                </p>
                <address style={{ fontStyle: "normal" }}>
                  {[
                    { icon: <MapPin style={{ width: 10, height: 10 }} />, text: "Koramangala, Bengaluru - 560034, Karnataka" },
                    { icon: <Mail style={{ width: 10, height: 10 }} />, text: "support@nyaymitra.tech", href: "mailto:support@nyaymitra.tech" },
                    { icon: <PhoneCall style={{ width: 10, height: 10 }} />, text: "+91 79705 96183", href: "tel:+917970596183" },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 9, marginBottom: 9 }}>
                      <span style={{ color: "rgba(201,168,76,0.5)", marginTop: 2, flexShrink: 0 }}>{item.icon}</span>
                      {item.href ? (
                        <a href={item.href} style={{ fontFamily: "var(--sans)", fontSize: "11.5px", color: "rgba(255,255,255,0.35)", textDecoration: "none", fontWeight: 300 }}>{item.text}</a>
                      ) : (
                        <span style={{ fontFamily: "var(--sans)", fontSize: "11.5px", color: "rgba(255,255,255,0.35)", fontWeight: 300 }}>{item.text}</span>
                      )}
                    </div>
                  ))}
                </address>
                <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 18 }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: "7.5px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    {lang === "en" ? "Follow" : "फॉलो"}
                  </span>
                  <SocialIcon href="https://www.instagram.com/nyaymitra.tech" icon={Instagram} label="Instagram" />
                  <SocialIcon href="https://www.linkedin.com/company/nyaymitra-tech-pvt-ltd" icon={Linkedin} label="LinkedIn" />
                </div>
              </div>

              {/* Quick links */}
              <div>
                <div style={{ fontFamily: "var(--mono)", fontSize: "7.5px", fontWeight: 500, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 18 }}>
                  {lang === "en" ? "Quick Links" : "त्वरित लिंक"}
                </div>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {[
                    { href: "/about", labelEn: "About NyayMitra", labelHi: "न्यायमित्र के बारे में" },
                    { href: "/services", labelEn: "Services", labelHi: "सेवाएं" },
                    { href: "/lawyers", labelEn: "Find Lawyers", labelHi: "वकील खोजें" },
                    { href: "/startup-legal", labelEn: "Startup Legal", labelHi: "स्टार्टअप कानूनी" },
                    { href: "/compliance", labelEn: "Compliance", labelHi: "अनुपालन" },
                    { href: "/affidavit-online-india", labelEn: "Affidavit Online", labelHi: "ऑनलाइन हलफनामा" },
                    { href: "/auth/signup", labelEn: "Sign Up", labelHi: "साइन अप" },
                  ].map(l => (
                    <li key={l.href} style={{ marginBottom: 10 }}>
                      <Link href={l.href} style={{
                        fontFamily: "var(--sans)", fontSize: "12.5px",
                        color: "rgba(255,255,255,0.35)", textDecoration: "none",
                        transition: "color 0.18s", fontWeight: 300,
                      }}
                        onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold-lt)"}
                        onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.35)"}>
                        {lang === "en" ? l.labelEn : l.labelHi}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <div style={{ fontFamily: "var(--mono)", fontSize: "7.5px", fontWeight: 500, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 18 }}>
                  {lang === "en" ? "Legal" : "कानूनी"}
                </div>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {[
                    { href: "/terms", labelEn: "Terms of Service", labelHi: "सेवा की शर्तें" },
                    { href: "/privacy-policy", labelEn: "Privacy Policy", labelHi: "गोपनीयता नीति" },
                    { href: "/cancellation", labelEn: "Cancellation & Refund", labelHi: "रद्दीकरण और धनवापसी" },
                    { href: "/Shipping&DeliveryPolicy", labelEn: "Shipping & Delivery", labelHi: "शिपिंग और डिलीवरी" },
                    { href: "/contact", labelEn: "Contact Us", labelHi: "संपर्क करें" },
                  ].map(l => (
                    <li key={l.href} style={{ marginBottom: 10 }}>
                      <Link href={l.href} style={{
                        fontFamily: "var(--sans)", fontSize: "12.5px",
                        color: "rgba(255,255,255,0.35)", textDecoration: "none",
                        transition: "color 0.18s", fontWeight: 300,
                      }}
                        onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold-lt)"}
                        onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.35)"}>
                        {lang === "en" ? l.labelEn : l.labelHi}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer CTA */}
              <div>
                <div style={{ fontFamily: "var(--mono)", fontSize: "7.5px", fontWeight: 500, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 18 }}>
                  {lang === "en" ? "Get Started" : "शुरू करें"}
                </div>
                <div style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(201,168,76,0.15)",
                  borderRadius: "var(--radius-lg)", padding: "24px 22px", textAlign: "center",
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 14px",
                  }}>
                    <Scale style={{ color: "var(--gold)", width: 16, height: 16 }} />
                  </div>
                  <p style={{
                    fontFamily: "var(--serif)", fontSize: "14px", fontStyle: "italic",
                    fontWeight: 300, color: "rgba(255,255,255,0.45)",
                    marginBottom: 16, lineHeight: 1.6,
                  }}>
                    {lang === "en" ? "Free legal guidance," : "मुफ्त कानूनी मार्गदर्शन,"}<br />
                    {lang === "en" ? "always available." : "हमेशा उपलब्ध।"}
                  </p>
                  <a href={waGeneral} target="_blank" rel="noopener noreferrer" style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
                    background: "linear-gradient(135deg, var(--gold-dk), var(--gold))",
                    color: "var(--ink)", padding: "11px",
                    borderRadius: 9, fontFamily: "var(--sans)", fontSize: "12px",
                    fontWeight: 700, textDecoration: "none", transition: "all 0.22s",
                  }}
                    onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.transform = "translateY(-1px)"; a.style.boxShadow = "0 8px 24px rgba(201,168,76,0.3)" }}
                    onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.transform = ""; a.style.boxShadow = "" }}>
                    <WaSvg size={13} />
                    {lang === "en" ? "WhatsApp Now" : "अभी व्हाट्सएप करें"}
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
              <p style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em" }}>
                © 2026 NyayMitra. {lang === "en" ? "All rights reserved." : "सर्वाधिकार सुरक्षित।"}
              </p>
              <p
                style={{
                  fontFamily: "var(--sans)",
                  fontSize:
                    typeof window !== "undefined" && window.innerWidth < 768
                      ? "11.5px"
                      : "10.5px",

                  color: "rgba(255,255,255,0.28)",

                  maxWidth:
                    typeof window !== "undefined" && window.innerWidth < 768
                      ? "100%"
                      : 520,

                  lineHeight: 1.8,

                  textAlign:
                    typeof window !== "undefined" && window.innerWidth < 768
                      ? "left"
                      : "right",

                  fontWeight: 300,

                  padding:
                    typeof window !== "undefined" && window.innerWidth < 768
                      ? "0 6px"
                      : 0,

                  marginTop:
                    typeof window !== "undefined" && window.innerWidth < 768
                      ? 18
                      : 0,
                }}
              >
                <span
                  style={{
                    color: "rgba(192,57,43,0.9)",
                    fontWeight: 600,
                  }}
                >
                  {lang === "en"
                    ? "Disclaimer: "
                    : "अस्वीकरण: "}
                </span>

                {lang === "en"
                  ? "NyayMitra is a technology platform. We do not act as a law firm. All consultations and notary services are delivered by licensed third-party professionals."
                  : "न्यायमित्र एक प्रौद्योगिकी मंच है। हम कानूनी फर्म नहीं हैं।"}
              </p>
            </div>
          </div>
        </footer>

        {/* ── Floating WhatsApp ─────────────────────────────────────────────────── */}
        <a href={waGeneral} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="floating-wa">
          <WaSvg size={22} />
        </a>
      </div>
    </>
  )
}