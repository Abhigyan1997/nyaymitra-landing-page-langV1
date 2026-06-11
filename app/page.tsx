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
  TriangleAlert, BookOpen, Lightbulb, CreditCard, Headset,
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
      align-items: stretch;
    }
    .pain-grid > .reveal {
      display: flex !important;
      flex-direction: column;
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
      a: "No. NyayMitra is a technology-first legal operations platform connecting individuals, startups, and businesses with verified legal professionals. We coordinate legal workflows and documentation; licensed advocates handle legal representation.",
    },
    {
      q: "What is the difference between a legal operations partner and a law firm?",
      a: "A law firm provides legal advice and representation on a matter-by-matter basis, typically billed by the hour. A legal operations partner like NyayMitra manages your entire legal function contracts, compliance, documentation, registrations on an ongoing, coordinated basis at a predictable cost. Think of it as your outsourced in-house legal team.",
    },
    {
      q: "What does an outsourced legal team for startups include?",
      a: "NyayMitra's outsourced legal team service for startups includes contract drafting and review, NDA management, co-founder and employee agreements, compliance tracking, legal documentation, and on-call expert consultations. All coordinated through one point of contact.",
    },
    {
      q: "How much does legal operations support cost for a startup?",
      a: "NyayMitra operates on transparent, fixed-price plans no hourly billing. Startup plans are designed to be accessible for early-stage companies. Contact us for a free legal operations assessment to find the right plan for your stage.",
    },
    {
      q: "What is POSH compliance and does my company need it?",
      a: "The Prevention of Sexual Harassment (POSH) Act 2013 mandates that every organisation with 10 or more employees constitutes an Internal Complaints Committee (ICC) and implements a workplace sexual harassment policy. Non-compliance can result in penalties. NyayMitra handles full POSH implementation including ICC setup, policy drafting, and annual training.",
    },
    {
      q: "What is MSME registration and how does NyayMitra help?",
      a: "MSME (Micro, Small & Medium Enterprise) registration under the Udyam portal provides access to government schemes, priority lending, and tax benefits. NyayMitra coordinates the complete registration process with no documentation hassles.",
    },
    {
      q: "Can NyayMitra handle multi-city compliance for my business?",
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
      a: "Yes. NyayMitra coordinates trademark search and filing through verified IP professionals. We handle the paperwork and follow-up, keeping you informed at every stage.",
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
    "foundingDate": "2023",
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
        <title>NyayMitra | Legal Operations & Compliance for Startups & Businesses</title>
        <meta name="description" content="India's legal operations partner for startups and growing businesses. One point of accountability for contracts, compliance, documentation, and registrations. Works with your existing CA/lawyer." />
        <meta name="keywords" content="startup legal operations India, legal operations platform, compliance management startup, POSH compliance, FSSAI registration, MSME registration, outsourced legal team, contract management, business legal support India" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://nyaymitra.tech" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nyaymitra.tech" />
        <meta property="og:title" content="NyayMitra | Legal Operations & Compliance for Startups & Businesses" />
        <meta property="og:description" content="India's legal operations partner for startups and growing businesses. One point of accountability for contracts, compliance, documentation, and registrations." />
        <meta property="og:image" content="https://nyaymitra.tech/og-image.png" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content="NyayMitra" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nyaymitra" />
        <meta name="twitter:title" content="NyayMitra | Legal Operations & Compliance for Startups & Businesses" />
        <meta name="twitter:description" content="India's legal operations partner for startups and growing businesses. One point of accountability for contracts, compliance, documentation, and registrations." />
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
            Your outsourced legal operations partner for startups & growing businesses
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
            HERO B2B-first, outcome-driven messaging
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
                    Trusted by 300+ founders & businesses across India
                  </span>
                </div>

                {/* H1 B2B-first */}
                <h1 style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(40px, 6vw, 72px)",
                  fontWeight: 600, lineHeight: 1.15,
                  letterSpacing: "-0.03em", color: "var(--ink)",
                  marginBottom: 0, paddingTop: "0.3rem", overflow: "visible",
                }}>
                  Your Legal Operations,<br />
                  <span className="gold-text" style={{ fontStyle: "italic", fontWeight: 300, display: "inline-block", lineHeight: 1.35, overflow: "visible" }}>
                    Handled. End to End.
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
                  NyayMitra is the execution layer between founders and India's fragmented legal ecosystem. We don't just advise we own execution. One team handles your contracts, compliance, and registrations so you can focus on building.
                </p>

                {/* Primary CTA Free Assessment */}
                <div className="hero-ctas" style={{ marginBottom: 40 }}>
                  <a href={waAssessment} target="_blank" rel="noopener noreferrer" className="btn btn-gold" style={{ gap: 9 }}>
                    <Sparkles style={{ width: 14, height: 14 }} />
                    Get Free Legal Ops Assessment
                  </a>
                  <Link href="/startup-legal" className="btn btn-ink" style={{ textDecoration: "none" }}>
                    Explore Plans →
                  </Link>
                </div>

                {/* Trust row */}
                <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 10, flexWrap: "wrap" }}>
                  {[
                    { icon: <Headset style={{ width: 10, height: 10 }} />, text: "Dedicated Coordinator" },
                    { icon: <CheckCircle style={{ width: 10, height: 10 }} />, text: "Fixed Monthly Pricing" },
                    { icon: <Zap style={{ width: 10, height: 10 }} />, text: "Works with your CA/Lawyer" },
                    { icon: <TrendingUp style={{ width: 10, height: 10 }} />, text: "Startup-Friendly" },
                  ].map(t => (
                    <div key={t.text} style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--mono)", fontSize: "9px", color: "var(--ink-5)", letterSpacing: "0.08em" }}>
                      <span style={{ color: "var(--gold-dk)" }}>{t.icon}</span>
                      {t.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Right column: How It Works card ── */}
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
                          NyayMitra · How we take legal off your plate
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
                        WhatsApp updates · One accountable team
                      </span>
                      <div style={{
                        display: "flex", alignItems: "center", gap: 5,
                        background: "#f0fdf4", border: "1px solid #bbf7d0",
                        padding: "4px 10px", borderRadius: 100, color: "#15803d",
                      }}>
                        <WaSvg size={9} />
                        <span style={{ fontFamily: "var(--mono)", fontSize: "8.5px", fontWeight: 600 }}>Available 24/7</span>
                      </div>
                    </div>
                  </div>

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
                    Works with your existing CA/Lawyer
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
                    4.9★ from 300+ founders
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
                { icon: <Handshake style={{ width: 13, height: 13 }} />, label: "One Point of Accountability", sub: "Stop chasing. We own execution." },
                { icon: <FileSignature style={{ width: 13, height: 13 }} />, label: "Contracts & Documentation", sub: "NDAs, agreements, corporate records" },
                { icon: <ClipboardList style={{ width: 13, height: 13 }} />, label: "Compliance Coordination", sub: "POSH, FSSAI, MSME, multi-city" },
                { icon: <Network style={{ width: 13, height: 13 }} />, label: "Works With Your Advisors", sub: "We coordinate, not replace" },
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
              { val: "₹0", text: "coordination cost for founders" },
              { val: "300+", text: "founders & businesses served" },
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
            FOUNDER PAIN SECTION "That's exactly me"
        ═══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="Founder challenges" className="section-pad" style={{ background: "var(--ink)", position: "relative", overflow: "hidden" }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(rgba(201,168,76,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px", pointerEvents: "none",
          }} />
          <div className="max-w" style={{ padding: "0 28px", position: "relative", zIndex: 1 }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 60 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                  <span className="eyebrow" style={{ color: "var(--gold)" }}>The hidden tax on founders</span>
                </div>
                <h2 style={{
                  fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 52px)",
                  fontWeight: 600, letterSpacing: "-0.025em", color: "white", lineHeight: 1.1,
                }}>
                  You have a CA. You have a lawyer.<br />
                  <span className="gold-text" style={{ fontWeight: 300, fontStyle: "italic" }}>So why are you still the project manager?</span>
                </h2>
                <p style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "rgba(255,255,255,0.45)", fontWeight: 300, marginTop: 14, maxWidth: 520, margin: "14px auto 0" }}>
                  Most founders don't need more professionals. They need someone to own the process.
                </p>
              </div>
            </Reveal>

            <div className="pain-grid">
              {[
                {
                  icon: <Clock style={{ width: 18, height: 18 }} />,
                  title: "Chasing lawyers for updates",
                  problem: "You follow up. They reply next week. Nothing moves.",
                  cost: "3+ hours/week wasted on coordination",
                  solution: "We own follow-ups. You get WhatsApp updates.",
                },
                {
                  icon: <AlertCircle style={{ width: 18, height: 18 }} />,
                  title: "Compliance deadlines missed",
                  problem: "You don't even know what's due until you get a notice.",
                  cost: "Penalties, stress, and investor questions",
                  solution: "We track deadlines and execute before they arrive.",
                },
                {
                  icon: <FileQuestion style={{ width: 18, height: 18 }} />,
                  title: "Same documents, requested repeatedly",
                  problem: "Every professional asks for the same paperwork. You send it again.",
                  cost: "Frustration and lost hours",
                  solution: "One document repository. We share, not you.",
                },
                {
                  icon: <Users style={{ width: 18, height: 18 }} />,
                  title: "Multiple professionals, zero coordination",
                  problem: "Your CA says X. Your lawyer says Y. Nobody talks.",
                  cost: "Conflicting advice, stalled decisions",
                  solution: "We sit between them and drive alignment.",
                },
                {
                  icon: <Target style={{ width: 18, height: 18 }} />,
                  title: "No one owns execution",
                  problem: "Professionals advise. You execute. It never ends.",
                  cost: "Forever-pending to-dos",
                  solution: "We execute. You approve. Done.",
                },
                {
                  icon: <Gavel style={{ width: 18, height: 18 }} />,
                  title: "Legal feels like a black box",
                  problem: "You sign what they put in front of you. You hope it's fine.",
                  cost: "Risk of bad terms, hidden liabilities",
                  solution: "We explain in plain English before you sign.",
                },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 55} style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{
                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.12)",
                    borderRadius: "var(--radius-lg)", padding: "28px 24px",
                    display: "flex", flexDirection: "column", gap: 14,
                    flex: 1,
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
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <XCircle style={{ width: 11, height: 11, color: "#f87171", flexShrink: 0, marginTop: 2 }} />
                        <span style={{ fontFamily: "var(--sans)", fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: 1.6, fontWeight: 300 }}>{item.problem}</span>
                      </div>
                      <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <XCircle style={{ width: 11, height: 11, color: "#f87171", flexShrink: 0, marginTop: 2 }} />
                        <span style={{ fontFamily: "var(--sans)", fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: 1.6, fontWeight: 300 }}>{item.cost}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "flex-start", paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: "auto" }}>
                      <CheckCircle style={{ width: 11, height: 11, color: "var(--gold)", flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontFamily: "var(--sans)", fontSize: "12px", color: "rgba(201,168,76,0.8)", lineHeight: 1.6, fontWeight: 400 }}>{item.solution}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={100}>
              <div style={{ textAlign: "center", marginTop: 56 }}>
                <a
                  href={waAssessment}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold"
                  style={{
                    gap: 9,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '12px 20px',
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
                    maxWidth: '100%'
                  }}
                >
                  <Sparkles style={{ width: 14, height: 14, flexShrink: 0 }} />
                  <span style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                    Get Free Assessment — We'll show you what's missing
                  </span>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            WHY NYAYMITRA OWNERSHIP, EXECUTION, ACCOUNTABILITY
        ═══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="Why NyayMitra" className="section-pad" style={{ background: "var(--white)" }}>
          <div className="max-w" style={{ padding: "0 28px" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 56 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                  <span className="eyebrow">What makes us different</span>
                </div>
                <h2 style={{
                  fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 52px)",
                  fontWeight: 600, letterSpacing: "-0.025em", color: "var(--ink)", lineHeight: 1.1,
                }}>
                  Not another legal marketplace.<br />
                  <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--ink-3)" }}>Your outsourced legal ops team.</span>
                </h2>
                <p style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "var(--ink-5)", fontWeight: 300, marginTop: 14, maxWidth: 560, margin: "14px auto 0" }}>
                  We don't just connect you to professionals. We become the accountability layer between you and India's legal ecosystem.
                </p>
              </div>
            </Reveal>

            <div className="why-grid">
              {[
                {
                  icon: <Handshake style={{ width: 20, height: 20 }} />,
                  title: "One Point of Accountability",
                  desc: "You don't chase. We do. You don't coordinate. We do. You get one team that owns execution from start to finish.",
                  dark: false,
                },
                {
                  icon: <Zap style={{ width: 20, height: 20 }} />,
                  title: "Execution, Not Just Advice",
                  desc: "Lawyers advise. Consultants suggest. We execute. From drafting to filing to follow-up we drive every step.",
                  dark: true,
                },
                {
                  icon: <Network style={{ width: 20, height: 20 }} />,
                  title: "Works With Your Existing Team",
                  desc: "Already have a CA or lawyer? Great. We coordinate with them so you don't have to. No replacement just orchestration.",
                  dark: false,
                },
                {
                  icon: <Globe style={{ width: 20, height: 20 }} />,
                  title: "Pan India Compliance Coverage",
                  desc: "Multi-city registrations, state-specific licenses, and cross-location coordination one team, everywhere you operate.",
                  dark: false,
                },
                {
                  icon: <Clock style={{ width: 20, height: 20 }} />,
                  title: "Defined Turnaround Times",
                  desc: "NDAs in 2 hours. Agreements in 24. Compliance tracking from day one. No more 'I'll get back to you.'",
                  dark: true,
                },
                {
                  icon: <BadgeCheck style={{ width: 20, height: 20 }} />,
                  title: "Fixed, Transparent Pricing",
                  desc: "No hourly billing. No surprise fees. Monthly plans built for startups and growing businesses.",
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
            B2B SECTION OUTSOURCED LEGAL OPERATIONS
        ═══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="Startup legal operations" className="section-pad" style={{ background: "var(--ink-9)", borderTop: "1px solid var(--ink-7)", borderBottom: "1px solid var(--ink-7)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: 0, bottom: 0, width: 360, height: 360, background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div className="max-w" style={{ padding: "0 28px" }}>
            <div className="startup-grid">
              <Reveal>
                <div>
                  <div style={{ marginBottom: 20 }}>
                    <span className="eyebrow">For founders & growing businesses</span>
                  </div>
                  <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 600, lineHeight: 1.08, letterSpacing: "-0.025em", color: "var(--ink)", marginBottom: 12 }}>
                    Your outsourced<br />
                    <span style={{ fontWeight: 300, fontStyle: "italic", color: "var(--ink-3)" }}>legal operations team.</span>
                  </h2>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "22px 0 24px" }}>
                    <div style={{ width: 40, height: 1, background: "linear-gradient(90deg, var(--gold-dk), var(--gold))" }} />
                    <Scale style={{ width: 9, height: 9, color: "var(--gold)" }} />
                    <div style={{ width: 20, height: 1, background: "linear-gradient(90deg, var(--gold), transparent)" }} />
                  </div>
                  <p style={{ fontFamily: "var(--sans)", fontSize: "14.5px", color: "var(--ink-4)", lineHeight: 1.9, marginBottom: 32, fontWeight: 300 }}>
                    NyayMitra is the execution layer between founders and India's legal ecosystem. We handle your contracts, compliance, documentation, and registrations all through one point of contact. Keep your existing CA and lawyer. We'll coordinate with them so you don't have to.
                  </p>
                  <Link href="/startup-legal" className="btn btn-ink" style={{ textDecoration: "none" }}>
                    View Startup Legal Plans <ArrowRight style={{ width: 14, height: 14 }} />
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                  {[
                    { icon: <FileSignature style={{ width: 15, height: 15 }} />, title: "Contracts & NDAs", desc: "Drafted, reviewed, and delivered with defined SLAs. NDAs in 2 hours.", dark: true },
                    { icon: <Gavel style={{ width: 15, height: 15 }} />, title: "Legal Consultation", desc: "30-min expert sessions in plain language. Actionable advice, not jargon.", dark: false },
                    { icon: <CheckCircle style={{ width: 15, height: 15 }} />, title: "Compliance Coordination", desc: "We track deadlines, coordinate filings, and keep you ahead of notices.", dark: true },
                    { icon: <IndianRupee style={{ width: 15, height: 15 }} />, title: "Fixed Monthly Pricing", desc: "No hourly billing. No surprises. Plans built for startups.", dark: false },
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
            STARTUP LEGAL PLANS NyayMitra Starter, Growth, Scale
        ═══════════════════════════════════════════════════════════════════════ */}
        {/* <section aria-label="Startup legal plans" className="section-pad" style={{ background: "var(--white)" }}>
          <div className="max-w" style={{ padding: "0 28px" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 56 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                  <span className="eyebrow">Simple, transparent pricing</span>
                </div>
                <h2 style={{
                  fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 50px)",
                  fontWeight: 600, letterSpacing: "-0.025em", color: "var(--ink)", lineHeight: 1.15,
                }}>
                  Legal operations plans<br />
                  <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--ink-3)" }}>built for your stage.</span>
                </h2>
                <p style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "var(--ink-5)", fontWeight: 300, marginTop: 14, maxWidth: 500, margin: "14px auto 0" }}>
                  No hourly billing. No retainers. Just fixed monthly plans with defined outcomes.
                </p>
              </div>
            </Reveal>

            <div className="use-cases-grid">
              {[
                {
                  icon: <Rocket style={{ width: 24, height: 24 }} />,
                  tag: "NyayMitra Starter",
                  title: "Early-stage founders.",
                  price: "₹7,999/month",
                  items: [
                    "Dedicated legal coordinator",
                    "NDA & basic contract drafting",
                    "Contract review (2/month)",
                    "Basic compliance tracking",
                    "30-min legal consultation/month",
                    "WhatsApp support",
                  ],
                  href: "/startup-legal",
                  dark: true,
                },
                {
                  icon: <TrendingUp style={{ width: 24, height: 24 }} />,
                  tag: "NyayMitra Growth",
                  title: "Businesses with 5-20 employees.",
                  price: "₹15,999/month",
                  items: [
                    "All Starter features",
                    "Unlimited contract drafting",
                    "Advanced contract review",
                    "Full compliance coordination",
                    "POSH compliance support",
                    "Multi-city registration support",
                    "Priority WhatsApp & call support",
                  ],
                  href: "/startup-legal",
                  dark: false,
                },
                {
                  icon: <Building2 style={{ width: 24, height: 24 }} />,
                  tag: "NyayMitra Scale",
                  title: "Growing businesses & funded startups.",
                  price: "Custom pricing",
                  items: [
                    "All Growth features",
                    "Fractional legal ops manager",
                    "End-to-end compliance execution",
                    "Investor due diligence support",
                    "IP & trademark coordination",
                    "Custom legal workflows",
                    "Dedicated account team",
                  ],
                  href: "/startup-legal",
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
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
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
                    <div style={{ fontFamily: "var(--sans)", fontSize: "24px", fontWeight: 700, color: card.dark ? "var(--gold)" : "var(--gold-dk)" }}>
                      {card.price}
                    </div>
                    <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                      {card.items.map((item) => (
                        <li key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--sans)", fontSize: "12.5px", color: card.dark ? "rgba(255,255,255,0.6)" : "var(--ink-4)", fontWeight: 400 }}>
                          <CheckCircle style={{ width: 12, height: 12, color: card.dark ? "var(--gold)" : "var(--gold-dk)", flexShrink: 0 }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link href={card.href} style={{
                      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7,
                      fontFamily: "var(--sans)", fontSize: "13px", fontWeight: 700,
                      background: card.dark ? "var(--gold)" : "var(--ink)",
                      color: card.dark ? "var(--ink)" : "white",
                      textDecoration: "none", padding: "12px 20px", borderRadius: "var(--radius)",
                      marginTop: "auto", transition: "all 0.2s",
                    }}
                      onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.transform = "translateY(-2px)"; a.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)" }}
                      onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.transform = ""; a.style.boxShadow = "" }}>
                      Get Started <ArrowRight style={{ width: 13, height: 13 }} />
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={120}>
              <p style={{ textAlign: "center", marginTop: 32, fontFamily: "var(--sans)", fontSize: "11px", color: "var(--ink-5)" }}>
                *Government fees and third-party costs billed separately. All plans include a dedicated coordinator.
              </p>
            </Reveal>
          </div>
        </section> */}

        {/* ═══════════════════════════════════════════════════════════════════════
            "I ALREADY HAVE A CA/LAWYER" SECTION ADDRESS OBJECTIONS
        ═══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="Works with existing advisors" className="section-pad" style={{ background: "var(--ink-9)", borderTop: "1px solid var(--ink-7)", borderBottom: "1px solid var(--ink-7)" }}>
          <div className="max-w" style={{ padding: "0 28px" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                  <span className="eyebrow">We complement not replace</span>
                </div>
                <h2 style={{
                  fontFamily: "var(--serif)", fontSize: "clamp(26px, 3.5vw, 44px)",
                  fontWeight: 600, letterSpacing: "-0.025em", color: "var(--ink)", lineHeight: 1.2,
                }}>
                  "I already have a CA and a lawyer."<br />
                  <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--ink-3)" }}>Perfect. We'll coordinate with both.</span>
                </h2>
                <p style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "var(--ink-5)", fontWeight: 300, marginTop: 14, maxWidth: 560, margin: "14px auto 0" }}>
                  NyayMitra isn't here to replace your trusted advisors. We're here to sit between them and you so you stop being the project manager.
                </p>
              </div>
            </Reveal>

            <div className="why-grid">
              {[
                {
                  icon: <Handshake style={{ width: 18, height: 18 }} />,
                  title: "We work WITH your CA",
                  desc: "Your CA handles finances. We handle legal coordination. No overlap. No confusion.",
                  dark: false,
                },
                {
                  icon: <Gavel style={{ width: 18, height: 18 }} />,
                  title: "We work WITH your lawyer",
                  desc: "Your lawyer advises. We execute. Drafting, filing, follow-ups owned by us.",
                  dark: true,
                },
                {
                  icon: <Network style={{ width: 18, height: 18 }} />,
                  title: "One source of truth",
                  desc: "Documents, deadlines, updates all in one place. Shared with your team, not scattered across emails.",
                  dark: false,
                },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 55}>
                  <div className="why-card" style={{
                    background: item.dark ? "var(--ink)" : "var(--white)",
                    borderColor: item.dark ? "transparent" : "var(--ink-7)",
                    textAlign: "center",
                    alignItems: "center",
                  }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: 28, flexShrink: 0,
                      background: item.dark ? "rgba(201,168,76,0.1)" : "var(--gold-pale)",
                      border: `1px solid ${item.dark ? "rgba(201,168,76,0.2)" : "var(--gold)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: item.dark ? "var(--gold)" : "var(--gold-dk)",
                      marginBottom: 16,
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--serif)", fontSize: "20px", fontWeight: 600, color: item.dark ? "white" : "var(--ink)", marginBottom: 8 }}>
                        {item.title}
                      </div>
                      <p style={{ fontFamily: "var(--sans)", fontSize: "13px", color: item.dark ? "rgba(255,255,255,0.5)" : "var(--ink-5)", lineHeight: 1.7 }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={100}>
              <div style={{ textAlign: "center", marginTop: 48 }}>
                <a href={waStrategyCall} target="_blank" rel="noopener noreferrer" className="btn btn-ink" style={{ gap: 9 }}>
                  Book a Free Strategy Call <ArrowRight style={{ width: 14, height: 14 }} />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            B2C SECTION RETAINED WITH BETTER MESSAGING
        ═══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="Personal legal assistance" className="section-pad" style={{ background: "var(--white)", borderBottom: "1px solid var(--ink-7)" }}>
          <div className="max-w" style={{ padding: "0 28px" }}>
            <Reveal>
              <div style={{ marginBottom: 48 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 20 }}>
                  <span className="eyebrow">Need personal legal help?</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20 }}>
                  <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(26px, 3.5vw, 44px)", fontWeight: 600, letterSpacing: "-0.022em", color: "var(--ink)", lineHeight: 1.2 }}>
                    Legal issues,<br />
                    <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--ink-3)" }}>resolved simply.</span>
                  </h2>
                  <p style={{ fontFamily: "var(--sans)", fontSize: "13.5px", color: "var(--ink-5)", fontWeight: 300, maxWidth: 340, lineHeight: 1.75 }}>
                    From money disputes to family matters get clarity and action steps on WhatsApp, instantly.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <div style={{ padding: "28px", border: "1px solid var(--ink-7)", borderRadius: "var(--radius-xl)", background: "var(--ink-9)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8), 0 2px 8px rgba(12,11,9,0.04)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--ink-5)", letterSpacing: "0.18em", textTransform: "uppercase" }}>Select your issue get WhatsApp guidance</span>
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
                  Tap any issue get free guidance on WhatsApp within minutes
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            COMPARISON SECTION Traditional Firms vs Compliance Portals vs NyayMitra
        ═══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="Comparison" className="section-pad" style={{ background: "var(--ink-9)", borderTop: "1px solid var(--ink-7)", borderBottom: "1px solid var(--ink-7)" }}>
          <div className="max-w" style={{ padding: "0 28px" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 56 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                  <span className="eyebrow">See how we compare</span>
                </div>
                <h2 style={{
                  fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 50px)",
                  fontWeight: 600, letterSpacing: "-0.025em", color: "var(--ink)", lineHeight: 1.15,
                }}>
                  Traditional firms vs compliance portals vs NyayMitra.
                </h2>
                <p style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "var(--ink-5)", fontWeight: 300, marginTop: 14, maxWidth: 560, margin: "14px auto 0" }}>
                  Most options leave founders acting as project managers. We're built differently.
                </p>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--sans)", minWidth: 640 }} role="table">
                  <thead>
                    <tr>
                      <th style={{ padding: "18px 24px", textAlign: "left", fontFamily: "var(--mono)", fontSize: "9px", color: "var(--ink-5)", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500, borderBottom: "2px solid var(--ink-7)", background: "var(--ink-9)", borderRadius: "12px 0 0 0" }}>
                        Capability
                      </th>
                      {[
                        { label: "Traditional Law Firms", highlight: false },
                        { label: "Compliance Portals", highlight: false },
                        { label: "NyayMitra", highlight: true },
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
                      { label: "Dedicated Coordinator", vals: ["❌", "❌", "✅"] },
                      { label: "Works with your CA/Lawyer", vals: ["❌", "❌", "✅"] },
                      { label: "WhatsApp Updates", vals: ["❌", "❌", "✅"] },
                      { label: "Fixed Monthly Pricing", vals: ["❌", "✅", "✅"] },
                      { label: "End-to-End Execution", vals: ["❌ ", "❌ ", "✅"] },
                      { label: "Multi-City Compliance", vals: ["❌", "❌", "✅"] },
                      { label: "Single Point of Contact", vals: ["❌", "❌", "✅"] },
                      { label: "Startup-Friendly Plans", vals: ["❌", "❌", "✅"] },
                    ].map((row, i) => (
                      <tr key={row.label} style={{ background: i % 2 === 0 ? "var(--white)" : "var(--ink-9)" }}>
                        <td style={{ padding: "16px 24px", fontFamily: "var(--sans)", fontSize: "13px", color: "var(--ink-3)", fontWeight: 500, borderBottom: "1px solid var(--ink-8)" }}>
                          {row.label}
                        </td>
                        {row.vals.map((val, j) => (
                          <td key={j} style={{
                            padding: "16px 24px", textAlign: "center", fontSize: "13px",
                            color: j === 2 ? "var(--green)" : "var(--ink-5)",
                            fontWeight: j === 2 ? 600 : 400,
                            borderBottom: "1px solid var(--ink-8)",
                            background: j === 2 ? (i % 2 === 0 ? "#f0fdf4" : "#e8faf0") : "transparent",
                          }}>
                            {val === "✅" ? <CheckCircle style={{ width: 14, height: 14, color: "var(--green)", margin: "0 auto" }} /> : val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            TESTIMONIALS OUTCOME-FOCUSED
        ═══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="Client testimonials" className="section-pad" style={{ background: "var(--white)", borderTop: "1px solid var(--ink-7)", borderBottom: "1px solid var(--ink-7)" }}>
          <div className="max-w" style={{ padding: "0 28px", position: "relative", zIndex: 1 }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 56 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                  <span className="eyebrow">What founders are saying</span>
                </div>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(26px, 3.8vw, 48px)", fontWeight: 600, letterSpacing: "-0.022em", color: "var(--ink)" }}>
                  Less chasing. More building.{" "}
                  <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--ink-3)" }}>That's the NyayMitra difference.</span>
                </h2>
              </div>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 18 }}>
              {[
                { name: "Arjun Mehta", location: "Bengaluru", avatar: "AM", rating: 5, text: "I used to spend 4 hours a week chasing my CA and lawyer. Now I get one WhatsApp update. NyayMitra took legal off my plate completely." },
                { name: "Priya Sharma", location: "Delhi NCR", avatar: "PS", rating: 5, text: "We already had a lawyer. NyayMitra coordinates with him so I don't have to. Finally, someone owns execution." },
                { name: "Rohan Khanna", location: "Mumbai", avatar: "RK", rating: 5, text: "Got our POSH compliance, MSME registration, and employee contracts done through one team. No friction. No delays." },
              ].map((item, i) => (
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
                        Founder
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            FAQ EXPANDED FOR SEO & OBJECTION HANDLING
        ═══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="Frequently asked questions" className="section-pad" style={{ background: "var(--ink-9)", borderTop: "1px solid var(--ink-7)" }}>
          <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 28px" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 56 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                  <span className="eyebrow">FAQ</span>
                </div>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(26px, 3.8vw, 46px)", fontWeight: 600, letterSpacing: "-0.022em", color: "var(--ink)", marginBottom: 10 }}>
                  Questions founders ask us.
                </h2>
                <p style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "var(--ink-5)", fontWeight: 300 }}>
                  Everything you need to know before working with NyayMitra.
                </p>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <div>
                {[
                  { q: "I already have a CA and a lawyer. Why do I need NyayMitra?", a: "You don't need to replace them. You need someone to coordinate between them and you. NyayMitra becomes the execution layer we handle follow-ups, document collection, deadline tracking, and filing coordination. Your CA and lawyer continue their work. You stop being the project manager." },
                  { q: "Does NyayMitra provide legal advice or representation?", a: "NyayMitra is a legal operations platform, not a law firm. We coordinate execution. Legal advice and representation are provided by licensed advocates empaneled with us. For matters requiring court representation, we connect you with verified lawyers from our network." },
                  { q: "What's the typical turnaround time for contracts or NDAs?", a: "Standard NDAs and common contract types: 2–4 hours. Complex agreements: 24–48 hours. Every document is reviewed by a verified legal professional before delivery." },
                  { q: "How does compliance tracking work?", a: "Once you share your business details, we map all applicable registrations and deadlines. You get a compliance calendar and proactive WhatsApp reminders. We coordinate filings with your existing CA or handle them through our network." },
                  { q: "Are government fees included in your plans?", a: "No. Government fees, stamp duty, and third-party costs are billed separately at actuals. Our plans cover coordination, drafting, review, and execution support not statutory payments." },
                  { q: "What happens if I need litigation support?", a: "We connect you with a verified lawyer from our network who specializes in your type of case. We'll also coordinate document handover and case tracking through our platform." },
                  { q: "Can NyayMitra handle multi-city compliance for my business?", a: "Yes. We provide pan India compliance coordination across states. Whether you need Shop & Establishment licenses in three cities or state-specific registrations one team manages everything." },
                  { q: "Who is the Startup Legal Ops plan for?", a: "Early-stage and growing startups (pre-revenue to Series A) that need ongoing legal support but don't have an in-house legal team. Works for tech startups, D2C brands, SaaS companies, and MSMEs." },
                  { q: "How do I get started?", a: "Click 'Get Free Assessment' on this page, share your business details on WhatsApp, and we'll schedule a 15-min discovery call. We'll identify gaps and recommend the right plan no obligation." },
                ].map(item => (
                  <FaqItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            FINAL CTA MEMORABLE PROMISE
        ═══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="Call to action" className="section-pad" style={{ background: "var(--white)", borderTop: "1px solid var(--ink-7)", borderBottom: "1px solid var(--ink-7)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 700, height: 500, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1, padding: "0 28px" }}>
            <Reveal>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", border: "1px solid var(--gold)", borderRadius: 100, marginBottom: 32, background: "var(--gold-pale)" }}>
                <Sparkles style={{ width: 11, height: 11, color: "var(--gold-dk)" }} />
                <span style={{ fontFamily: "var(--mono)", fontSize: "8.5px", color: "var(--gold-dk)", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500 }}>
                  Stop chasing. Start building.
                </span>
              </div>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(32px, 5.5vw, 60px)", fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.028em", lineHeight: 1.4, marginBottom: 18 }}>
                One WhatsApp number.<br />
                <span className="gold-text" style={{ fontStyle: "italic", fontWeight: 300, display: "inline-block", lineHeight: 1.4, paddingTop: "0.15rem" }}>
                  One accountable team.
                </span>
              </h2>
              <p style={{ fontFamily: "var(--sans)", fontSize: "15px", color: "var(--ink-4)", lineHeight: 1.9, maxWidth: 520, margin: "0 auto 40px", fontWeight: 300 }}>
                Focus on growing your business. We'll handle the rest contracts, compliance, documentation, and everything legal that's been slowing you down.
              </p>
              <div className="cta-row">
                <a href={waAssessment} target="_blank" rel="noopener noreferrer" className="btn btn-gold" style={{ gap: 10 }}>
                  <Sparkles style={{ width: 14, height: 14 }} />
                  Get Free Legal Ops Assessment
                </a>
                <a href={waStrategyCall} target="_blank" rel="noopener noreferrer" className="btn btn-ink" style={{ gap: 9 }}>
                  Book a Strategy Call
                </a>
                <Link href="/startup-legal" className="btn btn-ghost" style={{ textDecoration: "none" }}>
                  View Plans →
                </Link>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, marginTop: 36, flexWrap: "wrap" }}>
                {[
                  { icon: <Headset style={{ width: 10, height: 10 }} />, text: "Dedicated Coordinator" },
                  { icon: <Star style={{ width: 10, height: 10 }} />, text: "4.9★ from 300+ founders" },
                  { icon: <Zap style={{ width: 10, height: 10 }} />, text: "< 2 min Response" },
                  { icon: <CheckCircle style={{ width: 10, height: 10 }} />, text: "Works with your CA/Lawyer" },
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
                  The legal operations and compliance execution layer for startups and growing businesses in India.
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
                    { href: "/startup-legal", label: "Startup Legal Ops" },
                    { href: "/compliance", label: "Compliance" },
                    { href: "/lawyers", label: "Legal Consultation" },
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
                    <Headset style={{ color: "var(--gold)", width: 16, height: 16 }} />
                  </div>
                  <p style={{ fontFamily: "var(--serif)", fontSize: "14px", fontStyle: "italic", fontWeight: 300, color: "rgba(255,255,255,0.45)", marginBottom: 16, lineHeight: 1.6 }}>
                    Legal operations support,<br />without the headache.
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

// Add missing Rocket icon import
const Rocket = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4.5 16.5c-1.5 1.26-2 3-2 3s1.74-.5 3-2" />
    <path d="M12 3c-1.5 0-3 1-4.5 2.5S5 8.5 5 11c0 3 1 5 2 6s3 2 6 2c2 0 4-1 5-2s2-3 2-6c0-2.5-1-5-2.5-6.5S13.5 3 12 3z" />
    <path d="M12 8v8" />
    <path d="M8 12h8" />
  </svg>
)