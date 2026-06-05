"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import {
  BarChart2, CalendarCheck, Smartphone, IndianRupee, LogOut,
  User, Scale, FileWarning, Star, Menu, X,
  ArrowRight, MapPin, Mail, PhoneCall, Sparkles, FileText,
  Bot, FileCheck, Stamp, CheckCircle, ArrowUpRight,
  Gavel, Clock, Zap, Shield, ThumbsUp,
  Instagram, Linkedin, ChevronDown, ChevronRight,
  Building2, Home, Banknote, FileSignature, Briefcase,
  Users, Landmark, AlertCircle, FileQuestion, HeartHandshake,
  Handshake, TrendingUp, BadgeCheck, Layers, ClipboardList,
  Store, HardHat, ShieldCheck, Network, Workflow, Globe,
  Target, Award, Cpu, XCircle, DollarSign, Timer, UserCheck,
  TriangleAlert, BookOpen, Lightbulb, CreditCard,
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

    .trust-strip-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 13px 22px;
      border-right: 1px solid var(--ink-7);
      white-space: nowrap;
      transition: background 0.2s;
    }
    .trust-strip-item:last-child { border-right: none; }
    @media (max-width: 768px) {
      .trust-strip-item { border-right: none; border-bottom: 1px solid var(--ink-7); }
      .trust-strip-item:last-child { border-bottom: none; }
    }

    .workflow-step {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
      text-align: center;
      position: relative;
      flex: 1;
    }
    .workflow-step::after {
      content: '';
      position: absolute;
      top: 28px;
      right: -50%;
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, var(--gold), transparent);
      pointer-events: none;
    }
    .workflow-step:last-child::after { display: none; }

    @media (max-width: 768px) {
      .workflow-row { flex-direction: column !important; }
      .workflow-step::after { display: none; }
    }

    .use-cases-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
    @media (max-width: 860px) { .use-cases-grid { grid-template-columns: 1fr; } }

    .proof-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 18px;
    }
    @media (max-width: 860px) { .proof-grid { grid-template-columns: 1fr; } }

    .why-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
    @media (max-width: 860px) { .why-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 520px) { .why-grid { grid-template-columns: 1fr; } }

    .biz-outcomes-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
    @media (max-width: 860px) { .biz-outcomes-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 520px) { .biz-outcomes-grid { grid-template-columns: 1fr; } }

    @media (max-width: 900px) {
      .compliance-responsive-grid {
        grid-template-columns: 1fr !important;
        gap: 48px !important;
      }
    }

    .why-card {
      background: var(--white);
      border: 1px solid var(--ink-7);
      border-radius: var(--radius-lg);
      padding: 28px 24px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      transition: all 0.28s cubic-bezier(0.16,1,0.3,1);
      position: relative;
      overflow: hidden;
    }
    .why-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, var(--gold-dk), var(--gold));
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.32s cubic-bezier(0.16,1,0.3,1);
    }
    .why-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 56px rgba(12,11,9,0.08);
      border-color: var(--ink-5);
    }
    .why-card:hover::before { transform: scaleX(1); }

    .outcome-card {
      background: var(--ink-9);
      border: 1px solid var(--ink-7);
      border-radius: var(--radius-lg);
      padding: 28px 24px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      transition: all 0.28s cubic-bezier(0.16,1,0.3,1);
      position: relative;
      overflow: hidden;
    }
    .outcome-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 16px 40px rgba(12,11,9,0.07);
      border-color: var(--ink-5);
      background: var(--white);
    }

    /* Comparison table */
    .compare-grid {
      display: grid;
      grid-template-columns: 1.2fr 1fr 1fr;
      gap: 0;
    }
    @media (max-width: 700px) {
      .compare-grid { grid-template-columns: 1fr; }
    }

    /* Pain section */
    .pain-grid {
      display: grid;
      grid-template-columns: repeat(3,1fr);
      gap: 16px;
    }
    @media (max-width: 860px) { .pain-grid { grid-template-columns: repeat(2,1fr); } }
    @media (max-width: 520px) { .pain-grid { grid-template-columns: 1fr; } }
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

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="faq-row">
      <button className="faq-btn" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span style={{
          fontFamily: "var(--serif)", fontSize: "19px", fontWeight: 500,
          color: "var(--ink-2)", lineHeight: 1.4, flex: 1,
        }}>
          {q}
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
        maxHeight: open ? "600px" : "0",
        overflow: "hidden",
        transition: "max-height 0.45s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <p style={{
          fontFamily: "var(--sans)", fontSize: "14px",
          color: "var(--ink-4)", lineHeight: 1.9,
          paddingBottom: 24, maxWidth: 700,
        }}>
          {a}
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
  const waGeneral = waBase + encodeURIComponent("I need legal help.")
  const waAssessment = waBase + encodeURIComponent("I'd like a free legal operations assessment for my business.")
  const waStrategyCall = waBase + encodeURIComponent("I'd like to book a strategy call for business legal operations.")

  const waProblems: Record<string, string> = {
    money: waBase + encodeURIComponent("I need help recovering money that was not returned to me."),
    property: waBase + encodeURIComponent("I have a property dispute I need help with."),
    tenant: waBase + encodeURIComponent("I have a tenant or landlord issue."),
    consumer: waBase + encodeURIComponent("I have a consumer complaint."),
    family: waBase + encodeURIComponent("I need help with a family matter."),
    employment: waBase + encodeURIComponent("I have an employment issue."),
    criminal: waBase + encodeURIComponent("I need help for a criminal matter."),
    cyber: waBase + encodeURIComponent("I am facing cyber crime or online fraud."),
    contract: waBase + encodeURIComponent("I need help with a contract or agreement."),
    legalnotice: waBase + encodeURIComponent("I have received a legal notice and need guidance."),
    other: waBase + encodeURIComponent("I have a legal issue and need guidance."),
  }

  const navLinks = [
    { key: "home", label: "Home", href: "/" },
    { key: "services", label: "Services", href: "/services" },
    { key: "lawyers", label: "Find Lawyers", href: "/lawyers" },
    { key: "legalGPT", label: "Legal AI", href: "/legal-ai" },
    { key: "compliance", label: "Compliance", href: "/compliance" },
    { key: "about", label: "About", href: "/about" },
  ]

  const personalProblems = [
    { key: "money", label: "Money not returned", icon: <Banknote style={{ width: 13, height: 13 }} /> },
    { key: "property", label: "Property dispute", icon: <Home style={{ width: 13, height: 13 }} /> },
    { key: "tenant", label: "Tenant / Landlord", icon: <Building2 style={{ width: 13, height: 13 }} /> },
    { key: "consumer", label: "Consumer complaint", icon: <Shield style={{ width: 13, height: 13 }} /> },
    { key: "family", label: "Family matter", icon: <HeartHandshake style={{ width: 13, height: 13 }} /> },
    { key: "criminal", label: "Criminal matter", icon: <Gavel style={{ width: 13, height: 13 }} /> },
    { key: "cyber", label: "Cyber fraud / Online scam", icon: <Smartphone style={{ width: 13, height: 13 }} /> },
    { key: "employment", label: "Job / Salary issue", icon: <Briefcase style={{ width: 13, height: 13 }} /> },
    { key: "legalnotice", label: "Received legal notice", icon: <FileWarning style={{ width: 13, height: 13 }} /> },
    { key: "other", label: "Something else", icon: <FileText style={{ width: 13, height: 13 }} /> },
  ]

  const actionsBottom = [
    {
      titleEn: "Legal Consultation", descEn: "Connect with a verified expert in under 30 minutes.",
      icon: <Gavel style={{ width: 22, height: 22 }} />, href: "/lawyers",
    },
    {
      titleEn: "Startup Legal Operations", descEn: "Contracts, NDAs, co-founder agreements one dedicated coordinator.",
      icon: <TrendingUp style={{ width: 22, height: 22 }} />, href: "/startup-legal",
    },
    {
      titleEn: "Compliance & Licensing", descEn: "POSH, FSSAI, MSME, Shop & Establishment and more.",
      icon: <ClipboardList style={{ width: 22, height: 22 }} />, href: "/compliance",
    },
  ]

  const flowSteps = [
    {
      n: "01", icon: <FileCheck style={{ width: 16, height: 16 }} />,
      title: "Legal Intake & Assessment",
      desc: "Tell us your legal, documentation and compliance requirements. No jargon needed.",
    },
    {
      n: "02", icon: <Workflow style={{ width: 16, height: 16 }} />,
      title: "Coordination & Documentation",
      desc: "NyayMitra coordinates legal workflows, documentation and compliance execution.",
    },
    {
      n: "03", icon: <CheckCircle style={{ width: 16, height: 16 }} />,
      title: "Execution & Ongoing Support",
      desc: "Track execution, registrations and compliance through one operational layer.",
    },
  ]

  const testimonials = [
    { name: "Swapnil Anand", location: "Bhagalpur, Bihar", avatar: "SA", rating: 5, text: "Notarized affidavit home delivered in 2 days. Every detail handled without hassle." },
    { name: "Anand Upadhyay", location: "Indore, MP", avatar: "AU", rating: 4, text: "Connected with a lawyer instantly. My delayed salary issue was resolved effectively." },
    { name: "Dinesh Chand", location: "Gurgaon, Haryana", avatar: "DC", rating: 5, text: "Delhi traffic challan NyayMitra told me exactly what to do. Clear, fast, no confusion." },
  ]

  const faqs = [
    {
      q: "What is NyayMitra's Legal Operations service?",
      a: "NyayMitra's Legal Operations service is a managed legal support layer for startups and businesses. We handle contract drafting, compliance coordination, documentation, and registrations through a single operational support structure so you never need to manage multiple lawyers or agencies.",
    },
    {
      q: "How does startup legal operations work at NyayMitra?",
      a: "Once you subscribe to a Startup Legal Ops plan, you get access to a dedicated legal coordinator, document review and drafting, compliance tracking, and expert consultation all at a fixed monthly rate. No hourly billing.",
    },
    {
      q: "What compliance services do you offer for businesses?",
      a: "We offer POSH compliance & training, FSSAI registration, MSME registration, Shop & Establishment registration, labour law compliance, and custom legal documentation. All executed by verified legal professionals.",
    },
    {
      q: "Are the lawyers on NyayMitra verified?",
      a: "Yes. Every legal professional on our platform is verified through Bar Council enrollment, practice certificate, and background checks. 65+ verified lawyers across civil, criminal, family, property, consumer, labour, and cyber law.",
    },
    {
      q: "How do I file an FIR or get an affidavit through NyayMitra?",
      a: "For individuals, our Legal AI guides you step by step. For affidavits, NyayMitra delivers notarized documents from ₹999 within 2–4 hours. For FIRs, the AI walks you through the exact process in plain English, 24/7.",
    },
    {
      q: "Is NyayMitra a law firm?",
      a: "No. NyayMitra is a technology first legal operations platform connecting individuals, startups, and businesses with verified legal professionals. We coordinate legal workflows and documentation; licensed advocates handle legal representation.",
    },
    {
      q: "What is the difference between a legal operations partner and a law firm?",
      a: "A law firm provides legal advice and representation on a matter by matter basis, typically billed by the hour. A legal operations partner like NyayMitra manages your entire legal function contracts, compliance, documentation, registrations on an ongoing, coordinated basis at a predictable cost. Think of it as your outsourced in house legal team.",
    },
    {
      q: "What does an outsourced legal team for startups include?",
      a: "NyayMitra's outsourced legal team service for startups includes contract drafting and review, NDA management, co-founder and employee agreements, compliance tracking, legal documentation, and on call expert consultations. All coordinated through one point of contact.",
    },
    {
      q: "How much does legal operations support cost for a startup?",
      a: "NyayMitra operates on transparent, fixed price plans no hourly billing. Startup plans are designed to be accessible for early stage companies. Contact us for a free legal operations assessment to find the right plan for your stage.",
    },
    {
      q: "What is POSH compliance and does my company need it?",
      a: "The Prevention of Sexual Harassment (POSH) Act 2013 mandates that every organisation with 10 or more employees constitutes an Internal Complaints Committee (ICC) and implements a workplace sexual harassment policy. Non compliance can result in penalties. NyayMitra handles full POSH implementation including ICC setup, policy drafting, and annual training.",
    },
    {
      q: "What is MSME registration and how does NyayMitra help?",
      a: "MSME (Micro, Small & Medium Enterprise) registration under the Udyam portal provides access to government schemes, priority lending, and tax benefits. NyayMitra coordinates the complete registration process with no documentation hassles.",
    },
    {
      q: "Can NyayMitra handle multi city compliance for my business?",
      a: "Yes. NyayMitra provides pan India compliance coordination across multiple cities. Whether you need Shop & Establishment licenses, FSSAI registrations, or labour compliance across states we manage the entire execution through one operational layer.",
    },
    {
      q: "How quickly can NyayMitra draft a contract or NDA?",
      a: "Standard NDAs and common contract types are typically drafted within 2–4 hours. Complex agreements with custom clauses may take 24–48 hours. All documents are reviewed by verified legal professionals before delivery.",
    },
    {
      q: "What legal documents does a startup need when incorporating?",
      a: "At incorporation, a startup typically needs: co-founder agreements, IP assignment agreements, employee NDAs, offer letter templates, a founders' shareholders agreement, and a basic privacy policy and terms of service. NyayMitra can prepare and coordinate all of these as part of a Startup Legal Ops package.",
    },
    {
      q: "Does NyayMitra provide legal support for investor agreements and term sheets?",
      a: "Yes. Our verified legal experts can review term sheets, explain investor agreement clauses in plain language, and coordinate with your legal counsel on funding documentation. We help founders understand what they're signing before they sign it.",
    },
    {
      q: "Can NyayMitra help with trademark filing for my startup?",
      a: "Yes. NyayMitra coordinates trademark search and filing through verified IP professionals. We handle the paperwork and follow up, keeping you informed at every stage.",
    },
    {
      q: "What happens if I receive a legal notice as a business?",
      a: "NyayMitra can help you assess the notice, understand your obligations, and coordinate a response through a verified lawyer. Many business legal notices can be addressed without litigation if handled promptly and correctly. Reach us on WhatsApp for immediate guidance.",
    },
    {
      q: "Does NyayMitra serve businesses outside of Bihar and Karnataka?",
      a: "Yes. NyayMitra operates pan India. We serve clients in Bengaluru, Delhi NCR, Mumbai, Hyderabad, Pune, Kolkata, and across Bihar, Jharkhand, UP, and other states. Our compliance coordination covers all Indian states and union territories.",
    },
  ]

  // JSON-LD Schemas
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NyayMitra",
    "alternateName": "NyayMitra Tech Pvt Ltd",
    "url": "https://nyaymitra.tech",
    "logo": "https://nyaymitra.tech/logo.png",
    "description": "NyayMitra is India's legal operations and compliance infrastructure platform for individuals, startups and businesses. Contracts, compliance, registrations, and legal documentation managed through one operational partner.",
    "foundingDate": "2026",
    "areaServed": "IN",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Koramangala",
      "addressLocality": "Bengaluru",
      "addressRegion": "Karnataka",
      "postalCode": "560034",
      "addressCountry": "IN"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-79705-96183",
        "contactType": "customer service",
        "availableLanguage": ["English", "Hindi"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+91-96616-44025",
        "contactType": "sales",
        "availableLanguage": ["English", "Hindi"]
      }
    ],
    "sameAs": [
      "https://www.instagram.com/nyaymitra.tech",
      "https://www.linkedin.com/company/nyaymitra-tech-pvt-ltd"
    ]
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "NyayMitra Legal Operations",
    "image": "https://nyaymitra.tech/logo.png",
    "@id": "https://nyaymitra.tech",
    "url": "https://nyaymitra.tech",
    "telephone": "+91-79705-96183",
    "priceRange": "₹₹",
    "description": "Legal operations and compliance management for startups, MSMEs, and growing businesses in India. Services include startup legal operations, POSH compliance, FSSAI registration, MSME registration, contract drafting, and business documentation.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Koramangala",
      "addressLocality": "Bengaluru",
      "addressRegion": "Karnataka",
      "postalCode": "560034",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 12.9352,
      "longitude": 77.6245
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "serviceType": ["Legal Operations", "Compliance Management", "Contract Drafting", "POSH Compliance", "FSSAI Registration", "MSME Registration", "Startup Legal Support"]
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "NyayMitra",
    "url": "https://nyaymitra.tech",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://nyaymitra.tech/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Legal Operations and Compliance Management",
    "provider": {
      "@type": "Organization",
      "name": "NyayMitra"
    },
    "areaServed": "India",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "NyayMitra Legal Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Startup Legal Operations" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "POSH Compliance" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "FSSAI Registration" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "MSME Registration" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Contract Drafting and Review" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Legal Consultation" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Shop and Establishment Registration" } }
      ]
    }
  }

  /* ─── Render ─────────────────────────────────────────────────────────────── */
  return (
    <>
      <GlobalStyles />
      <Head>
        <title>NyayMitra Legal Operations & Compliance Partner for Startups & Businesses in India</title>
        <meta name="description" content="NyayMitra is India's legal operations and compliance infrastructure platform for startups, MSMEs, and growing businesses. Contracts, compliance, registrations, and documentation managed through one operational partner. POSH, FSSAI, MSME, startup legal ops." />
        <meta name="keywords" content="startup legal operations India, legal operations platform India, compliance management startup, POSH compliance India, FSSAI registration, MSME registration, outsourced legal team India, contract management startup, startup compliance India, legal documentation business, compliance coordination, business legal support India, startup legal partner" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://nyaymitra.tech" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nyaymitra.tech" />
        <meta property="og:title" content="NyayMitra Legal Operations & Compliance Partner for Startups & Businesses in India" />
        <meta property="og:description" content="India's legal operations and compliance infrastructure for startups, MSMEs, and growing businesses. Contracts, compliance, registrations one partner." />
        <meta property="og:image" content="https://nyaymitra.tech/og-image.png" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content="NyayMitra" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nyaymitra" />
        <meta name="twitter:title" content="NyayMitra Legal Operations & Compliance Partner for Startups & Businesses in India" />
        <meta name="twitter:description" content="India's legal operations and compliance infrastructure for startups, MSMEs, and growing businesses." />
        <meta name="twitter:image" content="https://nyaymitra.tech/og-image.png" />

        {/* JSON-LD Schemas */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      </Head>

      <div style={{ minHeight: "100vh", background: "var(--white)" }}>

        {/* ── Announcement Bar ─────────────────────────────────────────────────── */}
        <div role="banner" style={{
          background: "linear-gradient(90deg, var(--ink) 0%, var(--ink-2) 40%, var(--ink-3) 100%)",
          color: "white", textAlign: "center", padding: "9px 16px",
          fontSize: "11px", fontFamily: "var(--mono)", letterSpacing: "0.1em",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.06) 50%, transparent 100%)",
            pointerEvents: "none",
          }} />
          <span style={{ color: "rgba(255,255,255,0.55)" }}>🇮🇳</span>{" "}
          <span style={{ color: "rgba(255,255,255,0.7)" }}>
            Your Outsourced Legal Operations &amp; Compliance Partner for Startups &amp; Businesses
          </span>
          &nbsp;·&nbsp;
          <a href={waAssessment} target="_blank" rel="noopener noreferrer"
            style={{ color: "var(--gold-lt)", textDecoration: "none", fontWeight: 600, letterSpacing: "0.12em" }}>
            Get Free Assessment →
          </a>
        </div>

        {/* ── Navbar ───────────────────────────────────────────────────────────── */}
        <nav aria-label="Main navigation" style={{
          position: "sticky", top: 0, zIndex: 100,
          background: scrolled ? "rgba(255,254,251,0.96)" : "var(--white)",
          backdropFilter: scrolled ? "blur(24px) saturate(1.4)" : "none",
          borderBottom: `1px solid ${scrolled ? "var(--ink-7)" : "transparent"}`,
          boxShadow: scrolled ? "0 2px 24px rgba(12,11,9,0.06)" : "none",
          transition: "all 0.32s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <div style={{
            maxWidth: 1200, margin: "0 auto", padding: "0 28px",
            display: "flex", alignItems: "center", justifyContent: "space-between", height: 66,
          }}>
            {/* Logo */}
            <Link href="/" aria-label="NyayMitra Home" style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none", flexShrink: 0 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10, background: "var(--ink)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                boxShadow: "0 2px 12px rgba(12,11,9,0.2)", position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(201,168,76,0.15) 0%, transparent 60%)" }} />
                <Scale style={{ color: "var(--gold)", width: 16, height: 16, position: "relative", zIndex: 1 }} />
              </div>
              <div>
                <div style={{ fontFamily: "var(--serif)", fontSize: "20px", fontWeight: 600, color: "var(--ink)", lineHeight: 1, letterSpacing: "-0.02em" }}>NyayMitra</div>
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

              {loggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button style={{
                      display: "flex", alignItems: "center", gap: 8,
                      background: "var(--ink-9)", border: "1px solid var(--ink-7)",
                      borderRadius: 100, padding: "5px 14px 5px 5px", cursor: "pointer", transition: "all 0.2s",
                    }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <User style={{ color: "var(--gold)", width: 12, height: 12 }} />
                      </div>
                      <span style={{ fontFamily: "var(--sans)", fontSize: "12px", fontWeight: 600, color: "var(--ink)" }}>
                        {profile?.name?.split(" ")[0] || "Account"}
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" style={{
                    background: "white", border: "1px solid var(--ink-7)",
                    borderRadius: 12, padding: 6, minWidth: 185,
                    boxShadow: "0 16px 48px rgba(12,11,9,0.12)",
                  }}>
                    {[{ href: "/profile", icon: User, label: "My Profile" }].map(item => (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href} style={{
                          display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
                          borderRadius: 7, textDecoration: "none", color: "var(--ink)",
                          fontFamily: "var(--sans)", fontSize: "13px",
                        }}>
                          <item.icon style={{ width: 13, height: 13, color: "var(--gold-dk)" }} />
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuItem onClick={() => window.location.href = "https://nyay-dashboard.netlify.app/"} style={{
                      display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
                      borderRadius: 7, cursor: "pointer", fontFamily: "var(--sans)", fontSize: "13px",
                    }}>
                      <BarChart2 style={{ width: 13, height: 13, color: "var(--gold-dk)" }} />
                      Dashboard
                    </DropdownMenuItem>
                    {profile?.role !== "lawyer" && (
                      <DropdownMenuItem asChild>
                        <Link href="/all-bookings" style={{
                          display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
                          borderRadius: 7, textDecoration: "none", color: "var(--ink)",
                          fontFamily: "var(--sans)", fontSize: "13px",
                        }}>
                          <CalendarCheck style={{ width: 13, height: 13, color: "var(--gold-dk)" }} />
                          My Bookings
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <div style={{ height: 1, background: "var(--ink-7)", margin: "4px 0" }} />
                    <DropdownMenuItem onClick={() => { localStorage.removeItem("token"); window.location.reload() }} style={{
                      display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
                      borderRadius: 7, cursor: "pointer", color: "var(--red)",
                      fontFamily: "var(--sans)", fontSize: "13px",
                    }}>
                      <LogOut style={{ width: 13, height: 13 }} />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="desk-only" style={{ gap: 7, alignItems: "center" }}>
                  <Link href="/auth/login" className="nav-link">Login</Link>
                  <Link href="/auth/signup" className="btn btn-ink" style={{ textDecoration: "none", padding: "9px 18px", fontSize: "12.5px" }}>Sign Up</Link>
                </div>
              )}

              {/* Mobile burger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="mob-only"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
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
                }}>Login</Link>
                <Link href="/auth/signup" onClick={() => setMenuOpen(false)} style={{
                  flex: 1, padding: "12px", textAlign: "center",
                  background: "var(--ink)", borderRadius: 9,
                  fontFamily: "var(--sans)", fontSize: "13.5px", fontWeight: 600,
                  color: "white", textDecoration: "none",
                }}>Sign Up</Link>
              </div>
            </div>
          )}
        </nav>

        {/* ═══════════════════════════════════════════════════════════════════════
            HERO B2B-first, investor-grade messaging
        ═══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="Hero" style={{ padding: "80px 28px 96px", position: "relative", overflow: "hidden" }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 80% 60% at 75% 30%, rgba(201,168,76,0.055) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 10% 70%, rgba(12,11,9,0.025) 0%, transparent 60%)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)",
            backgroundSize: "80px 80px", pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", right: "-4%", top: "6%",
            width: 560, height: 560, opacity: 0.025, pointerEvents: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
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
                    Trusted by Startups, Businesses &amp; Individuals Across India
                  </span>
                </div>

                {/* H1 */}
                <h1 style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(40px, 6vw, 72px)",
                  fontWeight: 600, lineHeight: 1.15,
                  letterSpacing: "-0.03em", color: "var(--ink)",
                  marginBottom: 0, paddingTop: "0.3rem", overflow: "visible",
                }}>
                  India's Legal Operations<br />
                  <span className="gold-text" style={{ fontStyle: "italic", fontWeight: 300, display: "inline-block", lineHeight: 1.35, overflow: "visible" }}>
                    Infrastructure Partner.
                  </span>
                </h1>

                <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "28px 0" }}>
                  <div style={{ width: 44, height: 1, background: "linear-gradient(90deg, var(--gold-dk), var(--gold))" }} />
                  <Scale style={{ width: 10, height: 10, color: "var(--gold)" }} />
                  <div style={{ width: 24, height: 1, background: "linear-gradient(90deg, var(--gold), transparent)" }} />
                </div>

                <p style={{
                  fontFamily: "var(--sans)", fontSize: "15.5px",
                  color: "var(--ink-4)", lineHeight: 1.85,
                  maxWidth: 520, marginBottom: 36, fontWeight: 300,
                }}>
                  NyayMitra is a managed legal operations and compliance platform for startups, MSMEs, and growing businesses. One partner handles your contracts, compliance, registrations, and documentation so your team can focus on building.
                </p>

                {/* ── 3-way B2B-first CTA ── */}
                <div className="hero-3cta">
                  {[
                    {
                      icon: <TrendingUp style={{ width: 15, height: 15 }} />,
                      label: "Startup Legal Ops",
                      sub: "NDAs, contracts, compliance one partner",
                      href: "/startup-legal", external: false, accent: "var(--gold-dk)",
                    },
                    {
                      icon: <ClipboardList style={{ width: 15, height: 15 }} />,
                      label: "Compliance & Licensing",
                      sub: "POSH, FSSAI, MSME & more",
                      href: "/compliance", external: false, accent: "var(--ink-3)",
                    },
                    {
                      icon: <WaSvg size={15} />,
                      label: "Personal Legal Help",
                      sub: "Immediate WhatsApp guidance",
                      href: waGeneral, external: true, accent: "#128C7E",
                    },
                  ].map((cta) => {
                    const inner = (
                      <>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ color: cta.accent as string }}>{cta.icon}</span>
                          <span style={{ fontFamily: "var(--sans)", fontSize: "13px", fontWeight: 700, color: "var(--ink)" }}>{cta.label}</span>
                        </div>
                        <p style={{ fontFamily: "var(--sans)", fontSize: "11px", color: "var(--ink-5)", fontWeight: 300, lineHeight: 1.5 }}>{cta.sub}</p>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "var(--mono)", fontSize: "9px", color: cta.accent as string, letterSpacing: "0.08em" }}>
                          Get started <ChevronRight style={{ width: 10, height: 10 }} />
                        </div>
                      </>
                    )
                    return cta.external ? (
                      <a key={cta.label} href={cta.href} target="_blank" rel="noopener noreferrer" className="hero-cta-card">{inner}</a>
                    ) : (
                      <Link key={cta.label} href={cta.href} className="hero-cta-card" style={{ textDecoration: "none" }}>{inner}</Link>
                    )
                  })}
                </div>

                {/* Primary CTAs Assessment first */}
                <div className="hero-ctas" style={{ marginBottom: 40 }}>
                  <a href={waAssessment} target="_blank" rel="noopener noreferrer" className="btn btn-gold" style={{ gap: 9 }}>
                    <Sparkles style={{ width: 14, height: 14 }} />
                    Get Free Legal Operations Assessment
                  </a>
                  {/* <a href={waStrategyCall} target="_blank" rel="noopener noreferrer" className="btn btn-ink" style={{ gap: 9 }}>
                    Book Strategy Call
                  </a> */}
                  <Link href="/startup-legal" className="btn btn-ghost" style={{ textDecoration: "none" }}>
                    Explore Business Solutions →
                  </Link>
                </div>

                {/* Trust row */}
                <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 10, flexWrap: "wrap" }}>
                  {[
                    { icon: <BadgeCheck style={{ width: 10, height: 10 }} />, text: "Verified Legal Experts" },
                    { icon: <Shield style={{ width: 10, height: 10 }} />, text: "Transparent Pricing" },
                    { icon: <Zap style={{ width: 10, height: 10 }} />, text: "AI + Human Assisted" },
                    { icon: <TrendingUp style={{ width: 10, height: 10 }} />, text: "Startup Friendly" },
                  ].map(t => (
                    <div key={t.text} style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--mono)", fontSize: "9px", color: "var(--ink-5)", letterSpacing: "0.08em" }}>
                      <span style={{ color: "var(--gold-dk)" }}>{t.icon}</span>
                      {t.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Right column floating card ── */}
              <div style={{ animation: "fadeUp 0.82s 0.12s cubic-bezier(0.16,1,0.3,1) both" }}>
                <div style={{ animation: "floatSlow 9s ease-in-out infinite", position: "relative" }}>
                  <div className="card" style={{ overflow: "hidden", boxShadow: "0 40px 80px rgba(12,11,9,0.1), 0 8px 24px rgba(12,11,9,0.06), 0 0 0 1px rgba(12,11,9,0.03)" }}>
                    <div style={{
                      background: "var(--ink)", padding: "16px 22px",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      position: "relative", overflow: "hidden",
                    }}>
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, transparent 60%)" }} />
                      <div style={{ display: "flex", alignItems: "center", gap: 10, position: "relative", zIndex: 1 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--gold)", boxShadow: "0 0 12px rgba(201,168,76,0.6)", animation: "glowPulse 2.5s ease-in-out infinite" }} />
                        <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                          NyayMitra · How it works
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
                            padding: "20px 24px", display: "flex", gap: 16, alignItems: "flex-start",
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
                              <span style={{ fontFamily: "var(--sans)", fontSize: "13px", fontWeight: 600, color: "var(--ink)" }}>{step.title}</span>
                            </div>
                            <p style={{ fontFamily: "var(--sans)", fontSize: "11.5px", color: "var(--ink-5)", lineHeight: 1.6 }}>{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{
                      padding: "13px 22px", background: "var(--ink-9)", borderTop: "1px solid var(--ink-7)",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                    }}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: "8.5px", color: "var(--ink-5)", letterSpacing: "0.08em" }}>
                        Available 24/7 · Zero hidden costs
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
                    Bar Council Verified
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

        {/* ── Trust Strip ────────────────────────────────────────────────────────── */}
        <div style={{
          borderTop: "1px solid var(--ink-7)", borderBottom: "1px solid var(--ink-7)",
          background: "var(--ink-9)", overflow: "hidden",
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px" }}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "stretch" }}>
              {[
                { icon: <ShieldCheck style={{ width: 13, height: 13 }} />, label: "Compliance Coordination", sub: "POSH, FSSAI, MSME & more" },
                { icon: <FileSignature style={{ width: 13, height: 13 }} />, label: "Business Documentation", sub: "Contracts, NDAs, agreements" },
                { icon: <Globe style={{ width: 13, height: 13 }} />, label: "Multi City Registrations", sub: "Pan India coverage" },
                { icon: <Network style={{ width: 13, height: 13 }} />, label: "Legal Workflow Support", sub: "Single operational layer" },
              ].map((item, i) => (
                <div key={item.label} className="trust-strip-item" style={{
                  display: "flex", alignItems: "center", gap: 11, padding: "16px 22px",
                  borderRight: i < 4 ? "1px solid var(--ink-7)" : "none", flex: "1 1 180px",
                }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, flexShrink: 0, background: "var(--white)", border: "1px solid var(--ink-7)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold-dk)" }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--sans)", fontSize: "12px", fontWeight: 600, color: "var(--ink-2)", lineHeight: 1.3 }}>{item.label}</div>
                    <div style={{ fontFamily: "var(--sans)", fontSize: "10.5px", color: "var(--ink-5)", fontWeight: 300, lineHeight: 1.4, marginTop: 2 }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Metrics Marquee ───────────────────────────────────────────────────── */}
        <div style={{
          borderBottom: "1px solid var(--ink-7)", padding: "11px 0", overflow: "hidden",
          background: "linear-gradient(90deg, var(--ink-9) 0%, var(--white) 50%, var(--ink-9) 100%)",
        }}>
          <div className="mq-track">
            {[...Array(3)].flatMap(() => [
              { val: "₹25,000", text: "recovered via legal notice" },
              { val: "65+", text: "verified legal experts" },
              { val: "< 2 min", text: "avg AI response time" },
              { val: "4.9★", text: "client satisfaction" },
              { val: "2 hrs", text: "NDA reviewed & ready" },
              { val: "10+", text: "cities served" },
              { val: "POSH", text: "compliance executed" },
              { val: "Pan India", text: "registration coverage" },
            ]).map((item, i) => (
              <span key={i} className="trust-pill">
                <span style={{ fontFamily: "var(--serif)", fontSize: "13.5px", fontWeight: 600, color: "var(--gold-dk)" }}>{item.val}</span>
                <span style={{ fontFamily: "var(--sans)", fontSize: "11px", color: "var(--ink-5)", fontWeight: 400 }}>{item.text}</span>
                <span style={{ color: "var(--gold-pale)", fontSize: "16px" }}>◆</span>
              </span>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════
            WHAT LEGAL CHAOS COSTS FOUNDER PAIN SECTION
        ═══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="Business legal challenges" className="section-pad" style={{ background: "var(--ink)", position: "relative", overflow: "hidden" }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(rgba(201,168,76,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px", pointerEvents: "none",
          }} />
          <div className="max-w" style={{ padding: "0 28px", position: "relative", zIndex: 1 }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 60 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                  <span className="eyebrow" style={{ color: "var(--gold)" }}>The real cost of legal gaps</span>
                </div>
                <h2 style={{
                  fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 52px)",
                  fontWeight: 600, letterSpacing: "-0.025em", color: "white", lineHeight: 1.1,
                }}>
                  What legal chaos costs<br />
                  <span className="gold-text" style={{ fontWeight: 300, fontStyle: "italic" }}>growing businesses.</span>
                </h2>
                <p style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "rgba(255,255,255,0.45)", fontWeight: 300, marginTop: 14, maxWidth: 520, margin: "14px auto 0" }}>
                  Most founders don't realize the damage until it's too late. Here's what unmanaged legal operations actually cost.
                </p>
              </div>
            </Reveal>

            <div className="pain-grid">
              {[
                {
                  icon: <TriangleAlert style={{ width: 18, height: 18 }} />,
                  title: "Missed Compliance Deadlines",
                  problem: "POSH, FSSAI, or Shop & Establishment deadlines missed",
                  cost: "Penalties up to ₹50,000+ and business disruption",
                  solution: "NyayMitra tracks deadlines and coordinates execution proactively",
                },
                {
                  icon: <FileWarning style={{ width: 18, height: 18 }} />,
                  title: "Weak or Missing Contracts",
                  problem: "Verbal agreements or generic templates used for key deals",
                  cost: "Disputes, unpaid invoices, IP loss, and vendor conflicts",
                  solution: "Verified lawyers draft and review agreements before you sign",
                },
                {
                  icon: <Users style={{ width: 18, height: 18 }} />,
                  title: "Founder & Co-founder Disputes",
                  problem: "No formal co-founder agreement or equity documentation",
                  cost: "Company breakdowns, investor concerns, legal battles",
                  solution: "NyayMitra prepares binding agreements at the right stage",
                },
                {
                  icon: <Briefcase style={{ width: 18, height: 18 }} />,
                  title: "HR Documentation Gaps",
                  problem: "Missing offer letters, NDAs, or HR policies",
                  cost: "Labour disputes, employee poaching, confidentiality breaches",
                  solution: "Complete HR documentation package drafted and maintained",
                },
                {
                  icon: <Gavel style={{ width: 18, height: 18 }} />,
                  title: "Regulatory Penalties",
                  problem: "Operating without required licenses or registrations",
                  cost: "Fines, forced closure, and reputational damage",
                  solution: "Pan India registration support covering all applicable licenses",
                },
                {
                  icon: <Clock style={{ width: 18, height: 18 }} />,
                  title: "Founder Time Drain",
                  problem: "Founders managing legal tasks instead of building",
                  cost: "Slowed growth and costly context-switching",
                  solution: "One legal operations partner handles the entire legal function",
                },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 55}>
                  <div style={{
                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.12)",
                    borderRadius: "var(--radius-lg)", padding: "28px 24px",
                    display: "flex", flexDirection: "column", gap: 14,
                    transition: "all 0.28s cubic-bezier(0.16,1,0.3,1)",
                  }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLDivElement
                      el.style.borderColor = "rgba(201,168,76,0.3)"
                      el.style.background = "rgba(201,168,76,0.04)"
                      el.style.transform = "translateY(-3px)"
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLDivElement
                      el.style.borderColor = "rgba(201,168,76,0.12)"
                      el.style.background = "rgba(255,255,255,0.03)"
                      el.style.transform = ""
                    }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 11,
                      background: "rgba(192,57,43,0.1)", border: "1px solid rgba(192,57,43,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#f87171",
                    }}>
                      {item.icon}
                    </div>
                    <div style={{ fontFamily: "var(--serif)", fontSize: "17px", fontWeight: 600, color: "white", letterSpacing: "-0.01em" }}>
                      {item.title}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <XCircle style={{ width: 11, height: 11, color: "#f87171", flexShrink: 0, marginTop: 2 }} />
                        <span style={{ fontFamily: "var(--sans)", fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: 1.6, fontWeight: 300 }}>{item.problem}</span>
                      </div>
                      <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <XCircle style={{ width: 11, height: 11, color: "#f87171", flexShrink: 0, marginTop: 2 }} />
                        <span style={{ fontFamily: "var(--sans)", fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: 1.6, fontWeight: 300 }}>{item.cost}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "flex-start", paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <CheckCircle style={{ width: 11, height: 11, color: "var(--gold)", flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontFamily: "var(--sans)", fontSize: "12px", color: "rgba(201,168,76,0.8)", lineHeight: 1.6, fontWeight: 400 }}>{item.solution}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={100}>
              <div style={{ textAlign: "center", marginTop: 56 }}>
                <a href={waAssessment} target="_blank" rel="noopener noreferrer" className="btn btn-gold" style={{ gap: 9 }}>
                  <Sparkles style={{ width: 14, height: 14 }} />
                  Get Free Legal Operations Assessment
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            BUILT FOR MODERN BUSINESSES Use Cases
        ═══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="Business use cases" className="section-pad" style={{ background: "var(--white)" }}>
          <div className="max-w" style={{ padding: "0 28px" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 60 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                  <span className="eyebrow">Built for modern businesses</span>
                </div>
                <h2 style={{
                  fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 52px)",
                  fontWeight: 600, letterSpacing: "-0.025em", color: "var(--ink)", lineHeight: 1.1,
                }}>
                  Legal operations support<br />
                  <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--ink-3)" }}>at every stage.</span>
                </h2>
                <p style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "var(--ink-5)", fontWeight: 300, marginTop: 14, maxWidth: 500, margin: "14px auto 0" }}>
                  Whether you're launching, scaling, or operating NyayMitra is your dedicated legal operations and compliance layer.
                </p>
              </div>
            </Reveal>

            <div className="use-cases-grid">
              {[
                {
                  icon: <TrendingUp style={{ width: 24, height: 24 }} />,
                  tag: "Startups",
                  title: "Launch with legal confidence.",
                  items: [
                    "Founder & Co-founder Agreements",
                    "Employee NDAs & Offer Letters",
                    "Vendor & Client Contracts",
                    "IP Assignment Documentation",
                    "Compliance Planning & Setup",
                  ],
                  href: "/startup-legal",
                  dark: true,
                },
                {
                  icon: <Store style={{ width: 24, height: 24 }} />,
                  tag: "MSMEs",
                  title: "Operate with full compliance.",
                  items: [
                    "MSME & Udyam Registration",
                    "Shop & Establishment License",
                    "FSSAI Registration",
                    "Compliance Documentation",
                    "Legal Operations Coordination",
                  ],
                  href: "/compliance",
                  dark: false,
                },
                {
                  icon: <Building2 style={{ width: 24, height: 24 }} />,
                  tag: "Growing Businesses",
                  title: "Scale without legal friction.",
                  items: [
                    "Multi City Business Registrations",
                    "Contract Management & Review",
                    "POSH Compliance & Training",
                    "Compliance Workflow Execution",
                    "Operational Legal Support",
                  ],
                  href: "/compliance",
                  dark: false,
                },
              ].map((card, i) => (
                <Reveal key={card.tag} delay={i * 80}>
                  <div style={{
                    background: card.dark ? "var(--ink)" : "var(--white)",
                    border: `1px solid ${card.dark ? "transparent" : "var(--ink-7)"}`,
                    borderRadius: "var(--radius-lg)",
                    padding: "36px 32px",
                    display: "flex", flexDirection: "column", gap: 20,
                    height: "100%", position: "relative", overflow: "hidden",
                    transition: "all 0.28s cubic-bezier(0.16,1,0.3,1)",
                    cursor: "default",
                  }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLDivElement
                      el.style.transform = "translateY(-4px)"
                      el.style.boxShadow = "0 24px 64px rgba(12,11,9,0.1)"
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLDivElement
                      el.style.transform = ""
                      el.style.boxShadow = ""
                    }}>
                    {card.dark && (
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(201,168,76,0.04) 0%, transparent 60%)", pointerEvents: "none" }} />
                    )}
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{
                        width: 50, height: 50, borderRadius: 13, flexShrink: 0,
                        background: card.dark ? "rgba(201,168,76,0.1)" : "var(--ink-9)",
                        border: `1px solid ${card.dark ? "rgba(201,168,76,0.2)" : "var(--ink-7)"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: card.dark ? "var(--gold)" : "var(--gold-dk)",
                      }}>
                        {card.icon}
                      </div>
                      <div style={{
                        padding: "3px 12px", borderRadius: 100,
                        background: card.dark ? "rgba(201,168,76,0.1)" : "var(--gold-pale)",
                        border: `1px solid ${card.dark ? "rgba(201,168,76,0.25)" : "var(--gold)"}`,
                      }}>
                        <span style={{ fontFamily: "var(--mono)", fontSize: "8px", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, color: card.dark ? "var(--gold-lt)" : "var(--gold-dk)" }}>
                          {card.tag}
                        </span>
                      </div>
                    </div>
                    <h3 style={{ fontFamily: "var(--serif)", fontSize: "22px", fontWeight: 600, color: card.dark ? "white" : "var(--ink)", lineHeight: 1.25, letterSpacing: "-0.015em" }}>
                      {card.title}
                    </h3>
                    <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                      {card.items.map((item) => (
                        <li key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--sans)", fontSize: "12.5px", color: card.dark ? "rgba(255,255,255,0.6)" : "var(--ink-4)", fontWeight: 400 }}>
                          <div style={{ width: 5, height: 5, borderRadius: "50%", background: card.dark ? "var(--gold)" : "var(--gold-dk)", flexShrink: 0 }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link href={card.href} style={{
                      display: "inline-flex", alignItems: "center", gap: 7,
                      fontFamily: "var(--sans)", fontSize: "12.5px", fontWeight: 700,
                      color: card.dark ? "var(--gold-lt)" : "var(--gold-dk)",
                      textDecoration: "none",
                      borderTop: `1px solid ${card.dark ? "rgba(255,255,255,0.08)" : "var(--ink-8)"}`,
                      paddingTop: 16, marginTop: "auto",
                    }}>
                      Learn more <ArrowRight style={{ width: 13, height: 13 }} />
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            WHY BUSINESSES CHOOSE NYAYMITRA
        ═══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="Why choose NyayMitra" className="section-pad" style={{ background: "var(--ink-9)", borderTop: "1px solid var(--ink-7)", borderBottom: "1px solid var(--ink-7)" }}>
          <div className="max-w" style={{ padding: "0 28px" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 56 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                  <span className="eyebrow">Why businesses choose us</span>
                </div>
                <h2 style={{
                  fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 50px)",
                  fontWeight: 600, letterSpacing: "-0.025em", color: "var(--ink)", lineHeight: 1.15,
                }}>
                  One partner for all your<br />
                  <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--ink-3)" }}>legal operations needs.</span>
                </h2>
              </div>
            </Reveal>

            <div className="why-grid">
              {[
                {
                  icon: <Handshake style={{ width: 20, height: 20 }} />,
                  title: "Single Point of Contact",
                  desc: "One dedicated coordinator for all your legal, compliance, and documentation requirements. No juggling multiple vendors or lawyers.",
                  dark: false,
                },
                {
                  icon: <Zap style={{ width: 20, height: 20 }} />,
                  title: "Execution Focused",
                  desc: "We go beyond consultation. NyayMitra coordinates and executes legal workflows so nothing falls through the cracks.",
                  dark: true,
                },
                {
                  icon: <TrendingUp style={{ width: 20, height: 20 }} />,
                  title: "Startup Friendly Pricing",
                  desc: "Built specifically for founders and growing businesses. Flat rate plans, no hourly billing, no fine print surprises.",
                  dark: false,
                },
                {
                  icon: <Globe style={{ width: 20, height: 20 }} />,
                  title: "Pan India Coverage",
                  desc: "Multi city registration and compliance coordination across all Indian states. One team, everywhere you need to operate.",
                  dark: false,
                },
                {
                  icon: <Clock style={{ width: 20, height: 20 }} />,
                  title: "Defined SLAs",
                  desc: "NDAs in 2 hours. Compliance coordinated in days. Structured workflows with defined turnaround times for every deliverable.",
                  dark: true,
                },
                {
                  icon: <Layers style={{ width: 20, height: 20 }} />,
                  title: "Legal + Operations",
                  desc: "We combine verified legal expertise with operational execution giving you a full stack legal operations partner.",
                  dark: false,
                },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 55}>
                  <div className="why-card" style={{
                    background: item.dark ? "var(--ink)" : "var(--white)",
                    borderColor: item.dark ? "transparent" : "var(--ink-7)",
                  }}>
                    <div style={{
                      width: 46, height: 46, borderRadius: 12, flexShrink: 0,
                      background: item.dark ? "rgba(201,168,76,0.1)" : "var(--ink-9)",
                      border: `1px solid ${item.dark ? "rgba(201,168,76,0.2)" : "var(--ink-7)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: item.dark ? "var(--gold)" : "var(--gold-dk)",
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--serif)", fontSize: "18px", fontWeight: 600, color: item.dark ? "white" : "var(--ink)", marginBottom: 8, letterSpacing: "-0.01em" }}>
                        {item.title}
                      </div>
                      <p style={{ fontFamily: "var(--sans)", fontSize: "12.5px", color: item.dark ? "rgba(255,255,255,0.5)" : "var(--ink-5)", lineHeight: 1.75, fontWeight: 300 }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            COMPARISON NyayMitra vs In-House Legal vs Ad-hoc Lawyers
        ═══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="Comparison with in-house legal" className="section-pad" style={{ background: "var(--white)" }}>
          <div className="max-w" style={{ padding: "0 28px" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 60 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                  <span className="eyebrow">How we compare</span>
                </div>
                <h2 style={{
                  fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 50px)",
                  fontWeight: 600, letterSpacing: "-0.025em", color: "var(--ink)", lineHeight: 1.1,
                }}>
                  NyayMitra vs<br />
                  <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--ink-3)" }}>the alternatives.</span>
                </h2>
                <p style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "var(--ink-5)", fontWeight: 300, marginTop: 14, maxWidth: 500, margin: "14px auto 0" }}>
                  Most growing businesses face a choice between expensive in house counsel, ad-hoc legal spend, or nothing at all. There's a better option.
                </p>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--sans)", minWidth: 640 }} role="table" aria-label="Comparison between NyayMitra, In-House Legal, and Ad-hoc Lawyers">
                  <thead>
                    <tr>
                      <th style={{ padding: "18px 24px", textAlign: "left", fontFamily: "var(--mono)", fontSize: "9px", color: "var(--ink-5)", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500, borderBottom: "2px solid var(--ink-7)", background: "var(--ink-9)", borderRadius: "12px 0 0 0" }}>
                        Capability
                      </th>
                      {[
                        { label: "NyayMitra", highlight: true },
                        { label: "In House Legal", highlight: false },
                        { label: "Ad-hoc Lawyers", highlight: false },
                      ].map((col) => (
                        <th key={col.label} style={{
                          padding: "18px 24px", textAlign: "center",
                          fontFamily: "var(--sans)", fontSize: "13px", fontWeight: 700,
                          color: col.highlight ? "var(--gold-dk)" : "var(--ink-4)",
                          borderBottom: `2px solid ${col.highlight ? "var(--gold)" : "var(--ink-7)"}`,
                          background: col.highlight ? "var(--gold-pale)" : "var(--ink-9)",
                          position: "relative",
                        }}>
                          {col.label}
                          {col.highlight && (
                            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, var(--gold-dk), var(--gold))" }} />
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: "Monthly Cost", vals: ["Fixed, transparent", "₹8–25L salary+", "Unpredictable, per-matter"] },
                      { label: "Speed of Execution", vals: ["Hours to days", "Slow (hiring/onboarding)", "Variable, often slow"] },
                      { label: "Multi City Coverage", vals: ["Pan India", "Limited", "Depends on lawyer"] },
                      { label: "Compliance Tracking", vals: ["Proactive", "Variable", "Not included"] },
                      { label: "Contract Drafting", vals: ["Included", "Included", "Extra billing"] },
                      { label: "POSH Compliance", vals: ["Coordinated end-to-end", "Variable", "Not typical"] },
                      { label: "Startup Friendly Plans", vals: ["Yes", "No", "No"] },
                      { label: "Single Point of Contact", vals: ["Always", "Sometimes", "Never"] },
                    ].map((row, i) => (
                      <tr key={row.label} style={{ background: i % 2 === 0 ? "var(--white)" : "var(--ink-9)" }}>
                        <td style={{ padding: "16px 24px", fontFamily: "var(--sans)", fontSize: "13px", color: "var(--ink-3)", fontWeight: 500, borderBottom: "1px solid var(--ink-8)" }}>
                          {row.label}
                        </td>
                        {row.vals.map((val, j) => (
                          <td key={j} style={{
                            padding: "16px 24px", textAlign: "center", fontSize: "12.5px",
                            color: j === 0 ? "var(--green)" : "var(--ink-5)",
                            fontWeight: j === 0 ? 600 : 400,
                            borderBottom: "1px solid var(--ink-8)",
                            background: j === 0 ? (i % 2 === 0 ? "#f0fdf4" : "#e8faf0") : "transparent",
                          }}>
                            {j === 0 ? (
                              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                                <CheckCircle style={{ width: 11, height: 11, color: "var(--green)" }} />
                                {val}
                              </span>
                            ) : val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div style={{ textAlign: "center", marginTop: 48 }}>
                <a href={waAssessment} target="_blank" rel="noopener noreferrer" className="btn btn-ink" style={{ gap: 9 }}>
                  Get Free Legal Operations Assessment <ArrowRight style={{ width: 14, height: 14 }} />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            BUSINESS OUTCOMES
        ═══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="Business outcomes" className="section-pad" style={{ background: "var(--ink-9)", borderTop: "1px solid var(--ink-7)", borderBottom: "1px solid var(--ink-7)" }}>
          <div className="max-w" style={{ padding: "0 28px" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 56 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                  <span className="eyebrow">What we help businesses achieve</span>
                </div>
                <h2 style={{
                  fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 50px)",
                  fontWeight: 600, letterSpacing: "-0.025em", color: "var(--ink)", lineHeight: 1.15,
                }}>
                  Outcomes your business<br />
                  <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--ink-3)" }}>actually cares about.</span>
                </h2>
              </div>
            </Reveal>

            <div className="biz-outcomes-grid">
              {[
                { icon: <ShieldCheck style={{ width: 18, height: 18 }} />, title: "Avoid Compliance Penalties", desc: "Stay ahead of registration deadlines and statutory obligations with proactive compliance coordination." },
                { icon: <Zap style={{ width: 18, height: 18 }} />, title: "Close Deals Faster", desc: "Reduce contract bottlenecks with rapid drafting, review, and negotiation support from verified experts." },
                { icon: <TrendingUp style={{ width: 18, height: 18 }} />, title: "Scale Without In House Legal", desc: "Access on demand legal operations support that grows with your business no full time overhead." },
                { icon: <FileCheck style={{ width: 18, height: 18 }} />, title: "Stay Documentation Ready", desc: "Keep contracts, policies, and corporate records organized and investor-ready at all times." },
                { icon: <Network style={{ width: 18, height: 18 }} />, title: "Reduce Coordination Effort", desc: "One partner instead of multiple lawyers, agencies, and vendors. Fewer emails, faster results." },
                { icon: <BadgeCheck style={{ width: 18, height: 18 }} />, title: "Operate With Confidence", desc: "Access ongoing legal and compliance guidance so your team can focus on building, not firefighting." },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 55}>
                  <div className="outcome-card">
                    <div style={{ width: 42, height: 42, borderRadius: 10, background: "var(--gold-pale)", border: "1px solid var(--gold)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold-dk)" }}>
                      {item.icon}
                    </div>
                    <div style={{ fontFamily: "var(--serif)", fontSize: "17px", fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.01em" }}>{item.title}</div>
                    <p style={{ fontFamily: "var(--sans)", fontSize: "12.5px", color: "var(--ink-5)", lineHeight: 1.75, fontWeight: 300 }}>{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={100}>
              <div style={{ textAlign: "center", marginTop: 48 }}>
                <a href={waStrategyCall} target="_blank" rel="noopener noreferrer" className="btn btn-ink" style={{ gap: 9 }}>
                  Book a Strategy Call <ArrowRight style={{ width: 14, height: 14 }} />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SERVICES
        ═══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="Our services" className="section-pad" style={{ background: "var(--white)" }}>
          <div className="max-w" style={{ padding: "0 28px" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 64 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                  <span className="eyebrow">Our services</span>
                </div>
                <h2 style={{
                  fontFamily: "var(--serif)", fontSize: "clamp(32px, 4.5vw, 56px)",
                  fontWeight: 600, letterSpacing: "-0.025em", color: "var(--ink)", lineHeight: 1.1,
                }}>
                  Legal support that<br />
                  <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--ink-3)" }}>drives execution.</span>
                </h2>
              </div>
            </Reveal>

            <div className="actions-grid-bottom">
              {actionsBottom.map((action, i) => (
                <Reveal key={action.titleEn} delay={i * 65}>
                  <Link href={action.href} className="action-card" style={{ height: "100%", textDecoration: "none" }}>
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
                      <h3 style={{ fontFamily: "var(--serif)", fontSize: "20px", fontWeight: 600, color: "var(--ink)", marginBottom: 8, lineHeight: 1.25, letterSpacing: "-0.01em" }}>
                        {action.titleEn}
                      </h3>
                      <p style={{ fontFamily: "var(--sans)", fontSize: "12.5px", color: "var(--ink-5)", lineHeight: 1.7, fontWeight: 300 }}>
                        {action.descEn}
                      </p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--mono)", fontSize: "9px", color: "var(--gold-dk)", letterSpacing: "0.1em", marginTop: "auto", textTransform: "uppercase" }}>
                      Get started <ChevronRight style={{ width: 11, height: 11 }} />
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
        <div style={{ background: "var(--ink)", borderTop: "1px solid rgba(255,255,255,0.04)", position: "relative", overflow: "hidden" }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px", pointerEvents: "none",
          }} />
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div className="stat-bar">
              {[
                { value: "65+", label: "Verified Legal Experts" },
                { value: "25+", label: "Outcomes Delivered" },
                { value: "4.9★", label: "Client Satisfaction" },
                { value: "<2min", label: "AI Response Time" },
              ].map((s, i) => (
                <div key={s.label} style={{ padding: "36px 24px", textAlign: "center", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none", position: "relative" }}>
                  <div style={{ fontFamily: "var(--serif)", fontSize: "38px", fontWeight: 600, lineHeight: 1, marginBottom: 8 }} className="gold-text">
                    {s.value}
                  </div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: "8.5px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════
            COMPLIANCE PREVIEW
        ═══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="Compliance services" className="section-pad" style={{ background: "var(--ink)", borderTop: "1px solid rgba(255,255,255,0.04)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(201,168,76,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.025) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
          <div style={{ position: "absolute", right: "-10%", top: "50%", transform: "translateY(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div className="max-w" style={{ padding: "0 28px", position: "relative", zIndex: 1 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 80, alignItems: "center" }} className="compliance-responsive-grid">

              <Reveal>
                <div style={{ width: "100%" }}>
                  <div style={{ marginBottom: 20 }}>
                    <span className="eyebrow" style={{ color: "var(--gold)" }}>Compliance infrastructure</span>
                  </div>
                  <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.025em", color: "white", marginBottom: 12 }}>
                    Compliance,<br />
                    <span className="gold-text" style={{ fontWeight: 300, fontStyle: "italic" }}>without the headache.</span>
                  </h2>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "22px 0 24px" }}>
                    <div style={{ width: 40, height: 1, background: "linear-gradient(90deg, var(--gold-dk), var(--gold))" }} />
                    <Scale style={{ width: 9, height: 9, color: "var(--gold)" }} />
                    <div style={{ width: 20, height: 1, background: "linear-gradient(90deg, var(--gold), transparent)" }} />
                  </div>
                  <p style={{ fontFamily: "var(--sans)", fontSize: "clamp(13px, 3vw, 14.5px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.9, marginBottom: 32, fontWeight: 300 }}>
                    From POSH compliance to FSSAI registration, NyayMitra coordinates and executes the full legal compliance layer so you can focus on growing your business.
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(8px, 2vw, 10px)", marginBottom: 36 }}>
                    {[
                      { en: "Verified Experts", icon: <BadgeCheck style={{ width: 10, height: 10 }} /> },
                      { en: "Business Legal Support", icon: <Briefcase style={{ width: 10, height: 10 }} /> },
                      { en: "Transparent Pricing", icon: <IndianRupee style={{ width: 10, height: 10 }} /> },
                    ].map(b => (
                      <div key={b.en} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 14px", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 100, background: "rgba(201,168,76,0.06)", fontFamily: "var(--mono)", fontSize: "clamp(7px, 2vw, 8.5px)", color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
                        <span style={{ color: "var(--gold)", flexShrink: 0 }}>{b.icon}</span>
                        {b.en}
                      </div>
                    ))}
                  </div>
                  <Link href="/compliance" className="btn btn-gold" style={{ textDecoration: "none", display: "inline-flex" }}>
                    Explore Compliance <ArrowRight style={{ width: 14, height: 14 }} />
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "var(--radius-xl)", overflow: "hidden", width: "100%" }}>
                  <div style={{ padding: "clamp(12px, 2vw, 14px) clamp(16px, 3vw, 20px)", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(201,168,76,0.04)", flexWrap: "wrap", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <ShieldCheck style={{ width: 13, height: 13, color: "var(--gold)", flexShrink: 0 }} />
                      <span style={{ fontFamily: "var(--mono)", fontSize: "clamp(7px, 2vw, 8.5px)", color: "rgba(255,255,255,0.45)", letterSpacing: "0.16em", textTransform: "uppercase" }}>
                        Compliance Services
                      </span>
                    </div>
                    <div style={{ padding: "3px 10px", borderRadius: 100, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)", fontFamily: "var(--mono)", fontSize: "clamp(6px, 1.8vw, 7.5px)", color: "#4ade80", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>Active</div>
                  </div>
                  <div style={{ padding: "clamp(12px, 2vw, 16px)", display: "flex", flexDirection: "column", gap: 8 }}>
                    {[
                      { icon: <Users style={{ width: 13, height: 13 }} />, label: "POSH Compliance", tag: "Mandatory" },
                      { icon: <Store style={{ width: 13, height: 13 }} />, label: "FSSAI Registration", tag: "Food business" },
                      { icon: <Landmark style={{ width: 13, height: 13 }} />, label: "MSME Registration", tag: "Free govt scheme" },
                      { icon: <Building2 style={{ width: 13, height: 13 }} />, label: "Shop & Establishment", tag: "Required" },
                      { icon: <HardHat style={{ width: 13, height: 13 }} />, label: "Labour Compliance", tag: "HR protection" },
                      { icon: <FileText style={{ width: 13, height: 13 }} />, label: "Legal Documentation", tag: "Contracts & policies" },
                    ].map((item) => (
                      <div key={item.label} className="compliance-item" style={{ display: "flex", alignItems: "center", gap: "clamp(10px, 2vw, 12px)", padding: "clamp(12px, 2vw, 16px) clamp(12px, 2vw, 18px)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "var(--radius)", background: "rgba(255,255,255,0.05)", transition: "all 0.22s cubic-bezier(0.16,1,0.3,1)", cursor: "default", flexWrap: "wrap" }}>
                        <div style={{ width: "clamp(28px, 5vw, 32px)", height: "clamp(28px, 5vw, 32px)", borderRadius: 8, flexShrink: 0, background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold)" }}>
                          {item.icon}
                        </div>
                        <div style={{ flex: 1, minWidth: "120px" }}>
                          <div style={{ fontFamily: "var(--sans)", fontSize: "clamp(11px, 2.5vw, 12.5px)", fontWeight: 600, color: "rgba(255,255,255,0.75)", lineHeight: 1.3 }}>{item.label}</div>
                          <div style={{ fontFamily: "var(--mono)", fontSize: "clamp(7px, 1.8vw, 8px)", color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em", marginTop: 2, lineHeight: 1.4 }}>{item.tag}</div>
                        </div>
                        <ChevronRight style={{ width: "clamp(10px, 2vw, 12px)", height: "clamp(10px, 2vw, 12px)", color: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: "clamp(10px, 2vw, 14px) clamp(16px, 3vw, 20px)", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(201,168,76,0.03)", flexWrap: "wrap", gap: 8 }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "clamp(7px, 2vw, 8px)", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", lineHeight: 1.4 }}>Expert coordinated · Pan India</span>
                    <Link href="/compliance" style={{ fontFamily: "var(--mono)", fontSize: "clamp(7px, 2vw, 8.5px)", fontWeight: 600, color: "var(--gold-lt)", textDecoration: "none", letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" }}>
                      View all <ArrowRight style={{ width: 10, height: 10 }} />
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
        <section aria-label="Startup legal operations" className="section-pad" style={{ background: "var(--ink-9)", borderTop: "1px solid var(--ink-7)", borderBottom: "1px solid var(--ink-7)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: 0, bottom: 0, width: 360, height: 360, background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div className="max-w" style={{ padding: "0 28px" }}>
            <div className="startup-grid">
              <Reveal>
                <div>
                  <div style={{ marginBottom: 20 }}>
                    <span className="eyebrow">Startup legal operations</span>
                  </div>
                  <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 600, lineHeight: 1.08, letterSpacing: "-0.025em", color: "var(--ink)", marginBottom: 12 }}>
                    Legal operations<br />
                    <span style={{ fontWeight: 300, fontStyle: "italic", color: "var(--ink-3)" }}>built for founders.</span>
                  </h2>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "22px 0 24px" }}>
                    <div style={{ width: 40, height: 1, background: "linear-gradient(90deg, var(--gold-dk), var(--gold))" }} />
                    <Scale style={{ width: 9, height: 9, color: "var(--gold)" }} />
                    <div style={{ width: 20, height: 1, background: "linear-gradient(90deg, var(--gold), transparent)" }} />
                  </div>
                  <p style={{ fontFamily: "var(--sans)", fontSize: "14.5px", color: "var(--ink-4)", lineHeight: 1.9, marginBottom: 32, fontWeight: 300 }}>
                    Running a startup shouldn't mean drowning in legal uncertainty. Get contracts reviewed, NDAs drafted, and compliance handled all through one dedicated legal operations partner at a predictable monthly rate.
                  </p>
                  <Link href="/startup-legal" className="btn btn-ink" style={{ textDecoration: "none" }}>
                    Explore Startup Legal Solutions <ArrowRight style={{ width: 14, height: 14 }} />
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                  {[
                    { icon: <FileSignature style={{ width: 15, height: 15 }} />, title: "Contracts & NDAs", desc: "Legally sound agreements drafted and reviewed by verified lawyers.", dark: true },
                    { icon: <Gavel style={{ width: 15, height: 15 }} />, title: "Legal Consultation", desc: "30-min expert session plain language, actionable advice.", dark: false },
                    { icon: <CheckCircle style={{ width: 15, height: 15 }} />, title: "Compliance Coordination", desc: "Know what you need, when you need it. Executed without surprises.", dark: true },
                    { icon: <IndianRupee style={{ width: 15, height: 15 }} />, title: "Transparent Pricing", desc: "Fixed plans. No billing by the hour. No hidden charges.", dark: false },
                  ].map((item) => (
                    <div key={item.title} className="card" style={{ padding: "20px 22px", display: "flex", gap: 15, alignItems: "flex-start" }}>
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
                        <div style={{ fontFamily: "var(--serif)", fontSize: "16px", fontWeight: 600, color: "var(--ink)", marginBottom: 4, letterSpacing: "-0.01em" }}>{item.title}</div>
                        <p style={{ fontFamily: "var(--sans)", fontSize: "12px", color: "var(--ink-5)", lineHeight: 1.65, fontWeight: 300 }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            PROOF / EXECUTION OUTCOMES
        ═══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="Execution outcomes" className="section-pad" style={{ background: "var(--white)" }}>
          <div className="max-w" style={{ padding: "0 28px" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 60 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                  <span className="eyebrow">Execution outcomes</span>
                </div>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 50px)", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--ink)" }}>
                  Not promises.{" "}
                  <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--ink-3)" }}>Results.</span>
                </h2>
                <p style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "var(--ink-5)", fontWeight: 300, marginTop: 14, maxWidth: 520, margin: "14px auto 0" }}>
                  Real outcomes delivered for individuals, startups, and businesses across India.
                </p>
              </div>
            </Reveal>

            <div className="proof-grid">
              {[
                {
                  amount: "₹25,000", tag: "Money Recovery",
                  title: "Recovered via legal notice",
                  desc: "A user in Lucknow recovered unpaid rent with a single legal notice drafted and delivered within 2 hours. No court visit required.",
                  metric: "2 hrs", metricLabel: "notice delivered",
                },
                {
                  amount: "Same Day", tag: "Startup Documentation",
                  title: "Multi city compliance coordinated",
                  desc: "Successfully coordinated compliance workflows across multiple Indian cities for a growing business POSH, S&E, and labour documentation all handled.",
                  metric: "3 cities", metricLabel: "compliance executed",
                },
                {
                  amount: "No court", tag: "Legal Operations",
                  title: "NDA reviewed before the meeting ended",
                  desc: "A Bengaluru founder got a co-founder NDA reviewed, redlined, and finalised before the funding meeting concluded through our Startup Legal Ops service.",
                  metric: "2 hrs", metricLabel: "end-to-end",
                },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 75}>
                  <div className="card" style={{ padding: "34px 30px", position: "relative", overflow: "hidden", height: "100%" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, var(--gold-dk), var(--gold), var(--gold-lt))" }} />
                    <div style={{ display: "inline-flex", alignItems: "center", padding: "3px 11px", background: "var(--gold-pale)", border: "1px solid var(--gold)", borderRadius: 100, marginBottom: 20 }}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: "8px", color: "var(--gold-dk)", letterSpacing: "0.12em" }}>{item.tag}</span>
                    </div>
                    <div style={{ fontFamily: "var(--serif)", fontSize: "36px", fontWeight: 600, color: "var(--ink)", lineHeight: 1, marginBottom: 8, letterSpacing: "-0.02em" }}>{item.amount}</div>
                    <div style={{ fontFamily: "var(--sans)", fontSize: "13.5px", fontWeight: 600, color: "var(--ink-3)", marginBottom: 14 }}>{item.title}</div>
                    <p style={{ fontFamily: "var(--sans)", fontSize: "12.5px", color: "var(--ink-5)", lineHeight: 1.75, marginBottom: 24, fontWeight: 300 }}>{item.desc}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 18, borderTop: "1px solid var(--ink-8)" }}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontFamily: "var(--serif)", fontSize: "18px", fontWeight: 600, color: "var(--gold-dk)" }}>{item.metric}</span>
                        <span style={{ fontFamily: "var(--mono)", fontSize: "8px", color: "var(--ink-5)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{item.metricLabel}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "var(--mono)", fontSize: "8.5px", color: "var(--green)", background: "#f0fdf4", padding: "4px 10px", borderRadius: 100, border: "1px solid #bbf7d0", marginLeft: "auto" }}>
                        <CheckCircle style={{ width: 8, height: 8 }} />
                        Verified outcome
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
        <section aria-label="Client testimonials" className="section-pad" style={{ background: "var(--ink-9)", borderTop: "1px solid var(--ink-7)", borderBottom: "1px solid var(--ink-7)", position: "relative", overflow: "hidden" }}>
          <div className="max-w" style={{ padding: "0 28px", position: "relative", zIndex: 1 }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 56 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                  <span className="eyebrow">Client stories</span>
                </div>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(26px, 3.8vw, 48px)", fontWeight: 600, letterSpacing: "-0.022em", color: "var(--ink)" }}>
                  Trusted across{" "}
                  <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--ink-3)" }}>India.</span>
                </h2>
              </div>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 18 }}>
              {testimonials.map((item, i) => (
                <Reveal key={item.name} delay={i * 75}>
                  <div className="card" style={{ padding: "32px 28px", height: "100%", position: "relative", overflow: "hidden", cursor: "default" }}>
                    <div style={{ position: "absolute", top: 10, left: 20, fontFamily: "var(--serif)", fontSize: "72px", lineHeight: 1, color: "rgba(201,168,76,0.07)", userSelect: "none", pointerEvents: "none" }}>"</div>
                    <div style={{ display: "flex", gap: 2, marginBottom: 18 }}>
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} style={{ width: 12, height: 12, fill: j < item.rating ? "var(--gold)" : "var(--ink-7)", color: j < item.rating ? "var(--gold)" : "var(--ink-7)" }} />
                      ))}
                    </div>
                    <p style={{ fontFamily: "var(--serif)", fontSize: "16px", fontStyle: "italic", fontWeight: 300, color: "var(--ink-3)", lineHeight: 1.8, marginBottom: 24 }}>
                      {item.text}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 18, borderTop: "1px solid var(--ink-8)", flexWrap: "wrap", gap: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--ink)", border: "1px solid var(--ink-6)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--mono)", fontSize: "9.5px", fontWeight: 600, color: "var(--gold)", flexShrink: 0 }}>{item.avatar}</div>
                        <div>
                          <div style={{ fontFamily: "var(--sans)", fontSize: "13px", fontWeight: 600, color: "var(--ink)" }}>{item.name}</div>
                          <div style={{ fontFamily: "var(--sans)", fontSize: "11px", color: "var(--ink-5)", marginTop: 2 }}>{item.location}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "var(--mono)", fontSize: "8px", color: "var(--green)", background: "#f0fdf4", padding: "4px 10px", borderRadius: 100, border: "1px solid #bbf7d0" }}>
                        <CheckCircle style={{ width: 8, height: 8 }} />
                        Verified
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            PERSONAL LEGAL ASSISTANCE (secondary)
        ═══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="Personal legal assistance" className="section-pad" style={{ background: "var(--white)", borderBottom: "1px solid var(--ink-7)" }}>
          <div className="max-w" style={{ padding: "0 28px" }}>
            <Reveal>
              <div style={{ marginBottom: 48 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 20 }}>
                  <span className="eyebrow">Personal legal assistance</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20 }}>
                  <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(26px, 3.5vw, 44px)", fontWeight: 600, letterSpacing: "-0.022em", color: "var(--ink)", lineHeight: 1.2 }}>
                    Individual legal issues,<br />
                    <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--ink-3)" }}>resolved simply.</span>
                  </h2>
                  <p style={{ fontFamily: "var(--sans)", fontSize: "13.5px", color: "var(--ink-5)", fontWeight: 300, maxWidth: 340, lineHeight: 1.75 }}>
                    From money disputes to family matters NyayMitra gives individuals clarity and action steps on WhatsApp, instantly.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <div style={{ padding: "28px", border: "1px solid var(--ink-7)", borderRadius: "var(--radius-xl)", background: "var(--ink-9)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8), 0 2px 8px rgba(12,11,9,0.04)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--ink-5)", letterSpacing: "0.18em", textTransform: "uppercase" }}>Select your issue and get guidance on WhatsApp</span>
                  <div style={{ flex: 1, height: 1, background: "var(--ink-7)" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))", gap: 9 }}>
                  {personalProblems.map(p => (
                    <a key={p.key} href={waProblems[p.key]} target="_blank" rel="noopener noreferrer" className="problem-pill" style={{ justifyContent: "flex-start" }}>
                      <span style={{ color: "var(--gold-dk)", flexShrink: 0 }}>{p.icon}</span>
                      <span style={{ fontSize: "12px" }}>{p.label}</span>
                    </a>
                  ))}
                </div>
                <p style={{ fontFamily: "var(--sans)", fontSize: "10.5px", color: "var(--ink-6)", marginTop: 18, letterSpacing: "0.01em", display: "flex", alignItems: "center", gap: 6 }}>
                  <WaSvg size={10} />
                  Tap to get guidance on WhatsApp instantly
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            FAQ Expanded for SEO
        ═══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="Frequently asked questions" className="section-pad" style={{ background: "var(--ink-9)", borderTop: "1px solid var(--ink-7)" }}>
          <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 28px" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 56 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                  <span className="eyebrow">FAQ</span>
                </div>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(26px, 3.8vw, 46px)", fontWeight: 600, letterSpacing: "-0.022em", color: "var(--ink)", marginBottom: 10 }}>
                  Legal operations questions,<br />
                  <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--ink-3)" }}>answered simply.</span>
                </h2>
                <p style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "var(--ink-5)", fontWeight: 300 }}>
                  Everything you need to know before working with NyayMitra.
                </p>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <div>
                {faqs.map(item => (
                  <FaqItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            CTA SECTION
        ═══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="Call to action" className="section-pad" style={{ background: "var(--white)", borderTop: "1px solid var(--ink-7)", borderBottom: "1px solid var(--ink-7)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 700, height: 500, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1, padding: "0 28px" }}>
            <Reveal>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", border: "1px solid var(--gold)", borderRadius: 100, marginBottom: 32, background: "var(--gold-pale)" }}>
                <Sparkles style={{ width: 11, height: 11, color: "var(--gold-dk)" }} />
                <span style={{ fontFamily: "var(--mono)", fontSize: "8.5px", color: "var(--gold-dk)", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500 }}>
                  Free assessment included
                </span>
              </div>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(32px, 5.5vw, 60px)", fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.028em", lineHeight: 1.4, marginBottom: 18 }}>
                From legal chaos<br />
                <span className="gold-text" style={{ fontStyle: "italic", fontWeight: 300, display: "inline-block", lineHeight: 1.4, paddingTop: "0.15rem" }}>
                  to operational clarity.
                </span>
              </h2>
              <p style={{ fontFamily: "var(--sans)", fontSize: "15px", color: "var(--ink-4)", lineHeight: 1.9, maxWidth: 520, margin: "0 auto 40px", fontWeight: 300 }}>
                Startups, MSMEs &amp; businesses NyayMitra is your outsourced legal operations and compliance infrastructure partner. Start with a free assessment. No commitment required.
              </p>
              <div className="cta-row">
                <a href={waAssessment} target="_blank" rel="noopener noreferrer" className="btn btn-gold" style={{ gap: 10 }}>
                  <Sparkles style={{ width: 14, height: 14 }} />
                  Get Free Legal Operations Assessment
                </a>
                <a href={waStrategyCall} target="_blank" rel="noopener noreferrer" className="btn btn-ink" style={{ gap: 9 }}>
                  Book Strategy Call
                </a>
                <Link href="/startup-legal" className="btn btn-ghost" style={{ textDecoration: "none" }}>
                  Startup Legal Ops →
                </Link>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, marginTop: 36, flexWrap: "wrap" }}>
                {[
                  { icon: <BadgeCheck style={{ width: 10, height: 10 }} />, text: "Verified Legal Experts" },
                  { icon: <Star style={{ width: 10, height: 10 }} />, text: "4.9★ Rated" },
                  { icon: <Zap style={{ width: 10, height: 10 }} />, text: "< 2 min Response" },
                  { icon: <TrendingUp style={{ width: 10, height: 10 }} />, text: "Startup Friendly" },
                ].map(t => (
                  <div key={t.text} style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--mono)", fontSize: "9px", color: "var(--ink-5)", letterSpacing: "0.08em" }}>
                    <span style={{ color: "var(--gold-dk)" }}>{t.icon}</span>
                    {t.text}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            FOOTER
        ═══════════════════════════════════════════════════════════════════════ */}
        <footer style={{ background: "var(--ink)", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "72px 28px 40px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(201,168,76,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.02) 1px, transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none" }} />
          <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div className="footer-grid" style={{ marginBottom: 48, paddingBottom: 44, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              {/* Brand col */}
              <div>
                <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 11, textDecoration: "none", marginBottom: 16 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Scale style={{ color: "var(--gold)", width: 15, height: 15 }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--serif)", fontSize: "18px", fontWeight: 600, color: "white", lineHeight: 1, letterSpacing: "-0.02em" }}>NyayMitra</div>
                  </div>
                </Link>
                <p style={{ fontFamily: "var(--sans)", fontSize: "12.5px", color: "rgba(255,255,255,0.35)", lineHeight: 1.75, maxWidth: 240, marginBottom: 22, fontWeight: 300 }}>
                  Legal Operations &amp; Compliance Infrastructure for Startups, MSMEs &amp; Growing Businesses across India.
                </p>
                <address style={{ fontStyle: "normal" }}>
                  {[
                    { icon: <MapPin style={{ width: 10, height: 10 }} />, text: "Koramangala, Bengaluru 560034, Karnataka" },
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
                  <span style={{ fontFamily: "var(--mono)", fontSize: "7.5px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Follow</span>
                  <SocialIcon href="https://www.instagram.com/nyaymitra.tech" icon={Instagram} label="Instagram" />
                  <SocialIcon href="https://www.linkedin.com/company/nyaymitra-tech-pvt-ltd" icon={Linkedin} label="LinkedIn" />
                </div>
              </div>

              {/* Quick links */}
              <nav aria-label="Quick links">
                <div style={{ fontFamily: "var(--mono)", fontSize: "7.5px", fontWeight: 500, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 18 }}>Quick Links</div>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {[
                    { href: "/about", label: "About NyayMitra" },
                    { href: "/services", label: "Services" },
                    { href: "/lawyers", label: "Legal Consultation" },
                    { href: "/startup-legal", label: "Startup Legal Ops" },
                    { href: "/compliance", label: "Compliance" },
                    { href: "/affidavit-online-india", label: "Affidavit Online" },
                    { href: "/auth/signup", label: "Sign Up" },
                  ].map(l => (
                    <li key={l.href} style={{ marginBottom: 10 }}>
                      <Link href={l.href} style={{ fontFamily: "var(--sans)", fontSize: "12.5px", color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 0.18s", fontWeight: 300 }}
                        onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold-lt)"}
                        onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.35)"}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Legal */}
              <nav aria-label="Legal links">
                <div style={{ fontFamily: "var(--mono)", fontSize: "7.5px", fontWeight: 500, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 18 }}>Legal</div>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {[
                    { href: "/terms", label: "Terms of Service" },
                    { href: "/privacy-policy", label: "Privacy Policy" },
                    { href: "/cancellation", label: "Cancellation & Refund" },
                    { href: "/Shipping&DeliveryPolicy", label: "Shipping & Delivery" },
                    { href: "/contact", label: "Contact Us" },
                    { href: "/blog", label: "Blog" },
                  ].map(l => (
                    <li key={l.href} style={{ marginBottom: 10 }}>
                      <Link href={l.href} style={{ fontFamily: "var(--sans)", fontSize: "12.5px", color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 0.18s", fontWeight: 300 }}
                        onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold-lt)"}
                        onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.35)"}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Footer CTA */}
              <div>
                <div style={{ fontFamily: "var(--mono)", fontSize: "7.5px", fontWeight: 500, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 18 }}>Get Started</div>
                <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "var(--radius-lg)", padding: "24px 22px", textAlign: "center" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                    <Scale style={{ color: "var(--gold)", width: 16, height: 16 }} />
                  </div>
                  <p style={{ fontFamily: "var(--serif)", fontSize: "14px", fontStyle: "italic", fontWeight: 300, color: "rgba(255,255,255,0.45)", marginBottom: 16, lineHeight: 1.6 }}>
                    Legal operations support,<br />always available.
                  </p>
                  <a href={waAssessment} target="_blank" rel="noopener noreferrer" style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
                    background: "linear-gradient(135deg, var(--gold-dk), var(--gold))",
                    color: "var(--ink)", padding: "11px", borderRadius: 9,
                    fontFamily: "var(--sans)", fontSize: "12px", fontWeight: 700,
                    textDecoration: "none", transition: "all 0.22s",
                  }}
                    onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.transform = "translateY(-1px)"; a.style.boxShadow = "0 8px 24px rgba(201,168,76,0.3)" }}
                    onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.transform = ""; a.style.boxShadow = "" }}>
                    <WaSvg size={13} />
                    Free Assessment
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
              <p style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em" }}>
                © 2026 NyayMitra Tech Pvt Ltd. All rights reserved.
              </p>
              <p style={{ fontFamily: "var(--sans)", fontSize: "10.5px", color: "rgba(255,255,255,0.28)", maxWidth: 520, lineHeight: 1.8, textAlign: "right", fontWeight: 300 }}>
                <span style={{ color: "rgba(192,57,43,0.9)", fontWeight: 600 }}>Disclaimer: </span>
                NyayMitra is a legal operations &amp; compliance platform. Legal representation and advisory services are provided by licensed professionals registered with the Bar Council of India.
              </p>
            </div>
          </div>
        </footer>

        {/* ── Floating WhatsApp ─────────────────────────────────────────────────── */}
        <a href={waGeneral} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="floating-wa">
          <WaSvg size={22} />
        </a>
      </div>
    </>
  )
}