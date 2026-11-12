"use client"

import { useState, useEffect, useRef, useCallback, Children } from "react"
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
  Factory, Stethoscope, Megaphone, Search, Bell, Folder,
  TrendingDown, AlarmClock, FilePlus, FolderCheck, LayoutDashboard,
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
      --gold-dk:    #765a17;
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
      background: linear-gradient(115deg, #5e4710 0%, #7a5f1a 30%, #94741f 52%, #7a5f1a 70%, #5e4710 100%);
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
      grid-template-columns: repeat(2, 1fr);
      gap: 18px;
    }
    @media (max-width: 700px) { .proof-grid { grid-template-columns: 1fr; } }

    .why-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
    @media (max-width: 520px) { .why-grid { grid-template-columns: 1fr; } }

    .biz-services-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
    @media (max-width: 860px) { .biz-services-grid { grid-template-columns: 1fr; } }

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

    /* B2C section lighter treatment */
    .b2c-section {
      background: var(--white);
    }

    /* ── Problem comparison grid (Others vs NyayMitra) ── */
    .problem-compare-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 20px;
      max-width: 860px;
      margin: 0 auto 56px;
      align-items: stretch;
    }
    @media (max-width: 680px) {
      .problem-compare-grid {
        grid-template-columns: 1fr;
        gap: 14px;
        margin: 0 auto 40px;
      }
    }
    .problem-card {
      border-radius: var(--radius-lg);
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 32px 28px;
    }
    @media (max-width: 480px) {
      .problem-card { padding: 22px 20px; }
    }
    .problem-card-list {
      display: flex;
      flex-direction: column;
      gap: 14px;
      flex: 1;
    }
    @media (max-width: 480px) {
      .problem-card-list { gap: 11px; }
    }
    .problem-card-row {
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }
    .problem-card-label {
      font-family: var(--mono);
      font-size: 9px;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      margin-bottom: 24px;
    }
    @media (max-width: 480px) {
      .problem-card-label { margin-bottom: 18px; font-size: 8.5px; letter-spacing: 0.18em; }
    }

    /* ── Footer bottom bar ── */
    .footer-bottom {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 16px;
    }
    .footer-disclaimer {
      max-width: 520px;
      text-align: right;
    }
    @media (max-width: 700px) {
      .footer-bottom {
        flex-direction: column;
        align-items: flex-start;
      }
      .footer-disclaimer {
        max-width: 100%;
        text-align: left;
      }
    }

    /* ── NEW: Pillar cards ── */
    .pillar-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 14px;
    }
    @media (max-width: 920px) { .pillar-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 520px) { .pillar-grid { grid-template-columns: 1fr; } }

    .pillar-card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: var(--radius-lg);
      padding: 26px 22px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      transition: all 0.26s cubic-bezier(0.16,1,0.3,1);
      position: relative;
    }
    .pillar-card.is-last {
      background: rgba(201,168,76,0.07);
      border: 1.5px solid rgba(201,168,76,0.35);
    }
    .pillar-card:hover {
      transform: translateY(-3px);
      border-color: rgba(201,168,76,0.3);
    }

    /* ── NEW: Operations 6-card grid ── */
    .ops-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
    @media (max-width: 920px) { .ops-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 560px) { .ops-grid { grid-template-columns: 1fr; } }

    /* ── NEW: Dashboard mock ── */
    .dash-shell {
      background: var(--ink);
      border-radius: var(--radius-xl);
      border: 1px solid rgba(201,168,76,0.18);
      overflow: hidden;
      box-shadow: 0 50px 120px rgba(12,11,9,0.35), 0 0 0 1px rgba(255,255,255,0.02) inset;
      display: grid;
      grid-template-columns: 220px 1fr;
    }
    @media (max-width: 860px) {
      .dash-shell { grid-template-columns: 1fr; }
    }

    .dash-sidebar {
      background: rgba(255,255,255,0.02);
      border-right: 1px solid rgba(255,255,255,0.06);
      padding: 22px 16px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    @media (max-width: 860px) { .dash-sidebar { display: none; } }

    .dash-nav-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      border-radius: 8px;
      font-family: var(--sans);
      font-size: 12px;
      font-weight: 500;
      color: rgba(255,255,255,0.45);
      cursor: default;
      transition: all 0.18s;
    }
    .dash-nav-item.active {
      background: rgba(201,168,76,0.12);
      color: var(--gold-lt);
    }

    .dash-metrics-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 12px;
      width: 100%;
    }
    @media (max-width: 1040px) {
      .dash-metrics-grid { grid-template-columns: repeat(3, 1fr); }
    }
    @media (max-width: 600px) {
      .dash-metrics-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 360px) {
      .dash-metrics-grid { grid-template-columns: 1fr; }
    }

    .dash-metric-card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 12px;
      padding: 16px 18px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-width: 0;
      max-width: 100%;
    }

    .dash-panels-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 14px;
      width: 100%;
    }
    @media (max-width: 700px) {
      .dash-panels-grid { grid-template-columns: 1fr; }
    }

    .dash-panel {
      background: rgba(255,255,255,0.025);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 12px;
      padding: 18px;
      min-width: 0;
      max-width: 100%;
      overflow: hidden;
    }

    .dash-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 10px 0;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .dash-row:last-child { border-bottom: none; }

    .dash-status-badge {
      font-family: var(--mono);
      font-size: 8.5px;
      letter-spacing: 0.08em;
      padding: 4px 9px;
      border-radius: 100px;
      white-space: nowrap;
      font-weight: 500;
    }

    .dash-progress-track {
      width: 100%;
      height: 4px;
      border-radius: 4px;
      background: rgba(255,255,255,0.08);
      overflow: hidden;
    }
    .dash-progress-fill {
      height: 100%;
      border-radius: 4px;
      background: linear-gradient(90deg, var(--gold-dk), var(--gold));
    }

    /* ── NEW: Workflow ladder (vertical) ── */
    .workflow-ladder {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0;
    }
    .workflow-ladder-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 18px 26px;
      border: 1px solid var(--ink-7);
      border-radius: var(--radius-lg);
      background: var(--white);
      min-width: 280px;
      justify-content: center;
    }
    .workflow-ladder-item.is-accent {
      background: var(--ink);
      border-color: transparent;
    }
    .workflow-ladder-arrow {
      padding: 6px 0;
      color: var(--gold-dk);
    }
    @media (max-width: 480px) {
      .workflow-ladder-item { min-width: 220px; padding: 14px 18px; }
    }

    /* ── NEW: Solutions hub grid ── */
    .solutions-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }
    @media (max-width: 920px) { .solutions-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 520px) { .solutions-grid { grid-template-columns: 1fr; } }

    /* ── NEW: Served-by grid (8 cards, startups last) ── */
    .served-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }
    @media (max-width: 920px) { .served-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 480px) { .served-grid { grid-template-columns: 1fr; } }

    /* ── NEW: Stat counters ── */
    .stat-counter-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 16px;
    }
    @media (max-width: 920px) { .stat-counter-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 520px) { .stat-counter-grid { grid-template-columns: 1fr; } }

    /* ── Services 4-card grid ── */
    .services-4-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }
    @media (max-width: 720px) { .services-4-grid { grid-template-columns: 1fr; } }

    /* ── When businesses need 8-card grid ── */
    .when-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 14px;
    }
    @media (max-width: 920px) { .when-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 480px) { .when-grid { grid-template-columns: 1fr; } }

    @keyframes slMarquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    .sl-scroll::-webkit-scrollbar { display: none; }
    .sl-arrow:not(:disabled):hover { border-color: var(--gold) !important; color: var(--gold-dk) !important; }
    @media (prefers-reduced-motion: reduce) { .sl-track { animation: none !important; } }
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
        }}
          dangerouslySetInnerHTML={{ __html: a }}
        />
      </div>
    </div>
  )
}

function StatCounter({ end, suffix = "", label, prefix = "" }: { end: number; suffix?: string; label: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 1400
        const startTime = performance.now()
        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.round(eased * end))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        obs.disconnect()
      }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [end])

  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div style={{
        fontFamily: "var(--serif)", fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 600,
        color: "var(--ink)", letterSpacing: "-0.02em", lineHeight: 1,
      }}>
        <span className="gold-text">{prefix}{count}{suffix}</span>
      </div>
      <p style={{
        fontFamily: "var(--mono)", fontSize: "9.5px", color: "var(--ink-5)",
        letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 10, lineHeight: 1.5,
      }}>
        {label}
      </p>
    </div>
  )
}

/* ─── SLIDER (4 styles: snap, paged, focus, marquee) ─────────────────────────── */
type SliderProps = {
  children: React.ReactNode
  variant?: "snap" | "paged" | "focus" | "marquee"
  cols?: number
  dark?: boolean
  reverse?: boolean
  speed?: number
  autoplay?: number
  itemW?: number
  style?: React.CSSProperties
}

function Slider({ children, variant = "snap", cols = 3, dark = false, reverse = false, speed = 45, autoplay = 0, itemW = 270, style }: SliderProps) {
  const items = Children.toArray(children)
  const n = items.length
  const GAP = 16
  const wrap = useRef<HTMLDivElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const touchX = useRef<number | null>(null)
  const [w, setW] = useState(1000)
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const calc = () => setW(wrap.current?.clientWidth || 1000)
    calc()
    window.addEventListener("resize", calc)
    return () => window.removeEventListener("resize", calc)
  }, [])

  const per = w < 560 ? 1 : w < 900 ? Math.min(2, cols) : cols
  const cardW = per === 1 ? Math.round(w * 0.86) : Math.floor((w - GAP * (per - 1)) / per)
  const focusW = per === 1 ? Math.round(w * 0.78) : Math.min(360, Math.round(w / 2.7))
  const maxIdx = variant === "focus" ? n - 1 : Math.max(0, n - per)

  useEffect(() => {
    if (!autoplay || paused || variant === "snap" || variant === "marquee") return
    const t = setInterval(() => setIdx(i => (i >= maxIdx ? 0 : i + 1)), autoplay)
    return () => clearInterval(t)
  }, [autoplay, paused, maxIdx, variant])

  const go = (d: number) => {
    if (variant === "snap") scroller.current?.scrollBy({ left: d * (cardW + GAP), behavior: "smooth" })
    else setIdx(i => Math.min(maxIdx, Math.max(0, i + d)))
  }
  const jump = (i: number) => {
    if (variant === "snap") scroller.current?.scrollTo({ left: i * (cardW + GAP), behavior: "smooth" })
    else setIdx(i)
  }

  const ink = dark ? "#fff" : "var(--ink)"
  const line = dark ? "rgba(255,255,255,0.28)" : "var(--ink-6)"
  const accent = dark ? "var(--gold)" : "var(--gold-dk)"
  const dim = dark ? "rgba(255,255,255,0.22)" : "var(--ink-7)"
  const arrow = (dir: 1 | -1) => (
    <button className="sl-arrow" aria-label={dir === 1 ? "Next" : "Previous"} onClick={() => go(dir)}
      disabled={dir === 1 ? idx >= maxIdx : idx <= 0}
      style={{
        width: 38, height: 38, borderRadius: "50%", border: `1.5px solid ${line}`, background: "transparent",
        color: ink, display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", transition: "all 0.2s", opacity: (dir === 1 ? idx >= maxIdx : idx <= 0) ? 0.35 : 1,
      }}>
      <ChevronRight style={{ width: 15, height: 15, transform: dir === -1 ? "rotate(180deg)" : "none" }} />
    </button>
  )
  const controls = maxIdx > 0 && (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 24 }}>
      {arrow(-1)}
      <div style={{ display: "flex", gap: 7 }}>
        {Array.from({ length: maxIdx + 1 }).map((_, i) => (
          <button key={i} aria-label={`Go to slide ${i + 1}`} onClick={() => jump(i)}
            style={{ width: i === idx ? 24 : 7, height: 7, borderRadius: 7, border: "none", cursor: "pointer", background: i === idx ? accent : dim, transition: "all 0.3s" }} />
        ))}
      </div>
      {arrow(1)}
    </div>
  )
  const swipe = {
    onTouchStart: (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX },
    onTouchEnd: (e: React.TouchEvent) => {
      if (touchX.current == null) return
      const dx = e.changedTouches[0].clientX - touchX.current
      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
      touchX.current = null
    },
  }

  if (variant === "marquee") {
    const row = (k: string) => items.map((it, i) => (
      <div key={k + i} style={{ flex: `0 0 ${itemW}px`, marginRight: GAP, display: "flex" }}>{it}</div>
    ))
    return (
      <div ref={wrap} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
        style={{ overflow: "hidden", padding: "6px 0", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent)", maskImage: "linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent)", ...style }}>
        <div className="sl-track" style={{ display: "flex", width: "max-content", animation: `slMarquee ${speed}s linear infinite ${reverse ? "reverse" : "normal"}`, animationPlayState: paused ? "paused" : "running" }}>
          {row("a")}{row("b")}
        </div>
      </div>
    )
  }

  if (variant === "snap") {
    return (
      <div ref={wrap} style={style}>
        <div ref={scroller} className="sl-scroll"
          onScroll={e => setIdx(Math.min(maxIdx, Math.round(e.currentTarget.scrollLeft / (cardW + GAP))))}
          style={{ display: "flex", gap: GAP, overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none", padding: "4px 2px 8px" }}>
          {items.map((it, i) => (
            <div key={i} style={{ flex: `0 0 ${cardW}px`, scrollSnapAlign: "start", display: "flex" }}>{it}</div>
          ))}
        </div>
        {controls}
      </div>
    )
  }

  if (variant === "paged") {
    return (
      <div ref={wrap} style={style} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} {...swipe}>
        <div style={{ overflow: "hidden", padding: "4px 2px 8px" }}>
          <div style={{ display: "flex", gap: GAP, transform: `translateX(${-idx * (cardW + GAP)}px)`, transition: "transform 0.85s cubic-bezier(0.16,1,0.3,1)" }}>
            {items.map((it, i) => (
              <div key={i} style={{ flex: `0 0 ${cardW}px`, display: "flex" }}>{it}</div>
            ))}
          </div>
        </div>
        {controls}
      </div>
    )
  }

  // focus: centred active card, neighbours scaled down
  return (
    <div ref={wrap} style={style} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} {...swipe}>
      <div style={{ overflow: "hidden", padding: "18px 0 22px" }}>
        <div style={{ display: "flex", gap: GAP, transform: `translateX(${w / 2 - (idx * (focusW + GAP) + focusW / 2)}px)`, transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1)" }}>
          {items.map((it, i) => (
            <div key={i}
              onClickCapture={e => { if (i !== idx) { e.preventDefault(); e.stopPropagation(); setIdx(i) } }}
              style={{
                flex: `0 0 ${focusW}px`, display: "flex",
                transform: i === idx ? "scale(1)" : "scale(0.9)", opacity: i === idx ? 1 : 0.5,
                transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.6s", cursor: i === idx ? "default" : "pointer",
              }}>{it}</div>
          ))}
        </div>
      </div>
      {controls}
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
  const waAssessment = waBase + encodeURIComponent("I'd like a free walkthrough of NyayMitra for my business.")
  const waLegalOps = waBase + encodeURIComponent("I'd like to talk to the NyayMitra Legal Ops team.")
  const waLitigation = waBase + encodeURIComponent("I need help with a litigation or court representation matter.")

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
    { key: "startup-legal", label: "Legal Ops Plans", href: "/startup-legal" },
    { key: "lawyers", label: "Find Lawyers", href: "/lawyers" },
    { key: "legalGPT", label: "Legal AI", href: "/legal-ai" },
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

  const flowSteps = [
    {
      n: "01", icon: <FileCheck style={{ width: 16, height: 16 }} />,
      title: "Share Your Requirement",
      desc: "Contracts, compliance, a notice or a dispute. Tell us what you need on WhatsApp.",
    },
    {
      n: "02", icon: <Workflow style={{ width: 16, height: 16 }} />,
      title: "We Coordinate and Track",
      desc: "Requests, documents and deadlines move through one workspace with the right professionals.",
    },
    {
      n: "03", icon: <CheckCircle style={{ width: 16, height: 16 }} />,
      title: "Work Gets Done, You Stay Informed",
      desc: "Clear status, organised records and reports, without chasing anyone.",
    },
  ]

  const faqs = [
    {
      q: "What is NyayMitra?",
      a: "NyayMitra is a <strong>legal operations platform</strong>. You get a workspace to track contracts, compliance and legal requests, plus a team that coordinates your CAs, CSs, lawyers and advocates. It works like a fractional CFO or outsourced HR, but for legal and compliance, without hiring a full time legal team.",
    },
    {
      q: "Can NyayMitra help with litigation and court cases?",
      a: "Yes, through coordination. We connect you with <strong>qualified advocates across India</strong>, run the intake, and manage documents, updates and follow ups. Each advocate independently assesses and accepts the case and confirms scope and fees. Litigation is <strong>not included in monthly plans</strong> and is quoted per matter. No outcome is ever guaranteed.",
    },
    {
      q: "What do the monthly plans include?",
      a: "Every plan includes the NyayMitra workspace, a set number of standard agreement drafts and reviews, consultation hours, and coordination with your existing advisors. Higher plans add contract lifecycle tracking, compliance ownership, risk tracking, reporting and dedicated coordination. Limits apply to standard work, and complex agreements may need separate scope.",
    },
    {
      q: "I already have a CA and a lawyer. Why do I need NyayMitra?",
      a: "Because someone still has to <strong>coordinate between them, track what's pending, chase updates, and ensure execution</strong>. Your CA handles tax. Your lawyer advises on matters. NyayMitra manages the operational layer that sits between them and you. <strong>You stop being the project manager.</strong>",
    },
    {
      q: "How is NyayMitra different from a law firm or compliance agency?",
      a: "NyayMitra is a <strong>legal operations platform, not a law firm</strong>. We give you a workspace to track contracts, compliance and legal requests, plus a team that coordinates your CAs, CSs, lawyers and advocates. Professionals deliver the legal work, and we make sure it moves forward.",
    },
    {
      q: "Can NyayMitra work alongside my existing CA and CS?",
      a: "Yes. NyayMitra is <strong>built to work with your existing advisors</strong>, not replace them. We become the coordination layer that ensures their work, and yours, actually moves forward.",
    },
    {
      q: "What does a Fractional Legal Desk include?",
      a: "Contract review and drafting, NDA management, vendor agreements, founder and employee documentation, compliance tracking, deadline monitoring, registration coordination, documentation governance, and advisor follow-ups all through <strong>one dedicated point of contact</strong>.",
    },
    {
      q: "What legal and compliance work does a startup actually need?",
      a: "Most startups need <strong>co-founder agreements, IP assignment, employment contracts, NDAs, POSH compliance, ROC filings, FSSAI or MSME registrations, and ongoing compliance tracking</strong>. NyayMitra handles all of it as one managed function.",
    },
    {
      q: "Why would I pay monthly for legal ops?",
      a: "Because <strong>compliance doesn't stop</strong>. Contracts keep coming. Deadlines recur. New regulations emerge. A monthly legal operations partner ensures nothing slips through without the cost of a full-time legal hire. Think of it as <strong>compliance infrastructure, not a one-time filing</strong>.",
    },
    {
      q: "Does NyayMitra provide legal advice or representation?",
      a: "NyayMitra is a <strong>technology platform, not a law firm</strong>. Legal advice, filings and court representation are delivered by independent qualified professionals. For court matters we coordinate access to advocates across India, subject to advocate availability, case assessment and acceptance.",
    },
    {
      q: "What is POSH compliance and does my company need it?",
      a: "The <strong>POSH Act 2013</strong> mandates every organisation with 10+ employees to constitute an Internal Complaints Committee and implement a workplace harassment policy. NyayMitra handles full POSH implementation ICC setup, policy drafting, annual training.",
    },
    {
      q: "Can NyayMitra handle multi-city compliance?",
      a: "Yes. NyayMitra provides <strong>pan India compliance coordination</strong> Shop & Establishment licenses, FSSAI registrations, labour compliance, state-specific requirements all managed through one operational layer.",
    },
    {
      q: "How does compliance tracking work?",
      a: "We map every applicable registration and deadline for your business type and location. You get a <strong>compliance calendar and proactive WhatsApp reminders</strong>. We coordinate filings with your CA or handle them through our network.",
    },
    {
      q: "How much does legal ops support cost?",
      a: "NyayMitra offers <strong>five monthly plans</strong>, each with clearly stated limits for agreement drafts, reviews and consultation hours. Nothing is unlimited. Share your requirement and we will recommend the right plan. Litigation, government fees and external professional fees are separate.",
    },
    {
      q: "What documents does a startup need at incorporation?",
      a: "Co-founder agreements, IP assignment, offer letter templates, employee NDAs, shareholders' agreement, privacy policy, and terms of service. NyayMitra prepares and coordinates <strong>all of these as part of a Startup Legal Ops package</strong>.",
    },
    {
      q: "How do I get started?",
      a: "Click <strong>'Book a Free Walkthrough'</strong> on this page. Share your business details on WhatsApp and we'll schedule a 15-min discovery call. We'll identify gaps and recommend the right plan <strong>no obligation</strong>.",
    },
    {
      q: "What is Legal Operations?",
      a: "Legal Operations is the <strong>discipline of managing legal work like a system</strong> tracking deadlines, coordinating documents, following through on execution instead of treating every contract or filing as a one-off fire drill.",
    },
    {
      q: "Why not just hire a full-time legal head?",
      a: "A full-time legal hire costs ₹15–30L+ per year before benefits, and still needs coordination with external CAs, lawyers, and consultants. NyayMitra gives you a <strong>dedicated legal ops function at a fraction of the cost</strong>, with a full team behind it.",
    },
    {
      q: "Do you replace our existing advisors?",
      a: "No. NyayMitra is built to <strong>work alongside your existing CA, CS, and lawyers</strong>. We become the coordination layer that keeps their work and yours moving forward efficiently.",
    },
    {
      q: "What is investor due diligence readiness?",
      a: "Before a funding round, investors review your contracts, incorporation documents, compliance records, IP assignments, and cap table. NyayMitra helps businesses <strong>prepare and organise their data room</strong> so due diligence doesn't delay a deal.",
    },
  ]

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NyayMitra",
    "alternateName": "NyayMitra Technologies Pvt Ltd",
    "url": "https://mynyaymitra.in",
    "logo": "https://mynyaymitra.in/logo.png",
    "description": "NyayMitra is a technology enabled legal operations platform for startups, MSMEs and growing businesses across India. It is not a law firm. Qualified professionals deliver legal work, coordinated through one workspace and team.",
    "foundingDate": "2025",
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
      "https://www.instagram.com/nyaymitra.in",
      "https://www.linkedin.com/company/nyaymitra-tech-pvt-ltd"
    ]
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "NyayMitra Legal Operations Platform",
    "image": "https://mynyaymitra.in/logo.png",
    "@id": "https://mynyaymitra.in",
    "url": "https://mynyaymitra.in",
    "telephone": "+91-79705-96183",
    "priceRange": "₹₹",
    "description": "Legal operations platform for startups, MSMEs and growing businesses across India, covering contracts, compliance coordination, documentation and litigation support coordination.",
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
    "areaServed": { "@type": "Country", "name": "India" },
    "serviceType": [
      "Fractional Legal Team", "Legal Operations", "Compliance Management",
      "Contract Management", "Documentation Governance", "POSH Compliance",
      "FSSAI Registration", "MSME Registration", "Startup Legal Operations",
      "Outsourced Legal Function", "Investor Due Diligence Preparation",
      "Litigation Support Coordination"
    ]
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "NyayMitra",
    "url": "https://mynyaymitra.in",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://mynyaymitra.in/search?q={search_term_string}",
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
        "text": faq.a.replace(/<[^>]+>/g, "")
      }
    }))
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Legal Operations Platform",
    "provider": { "@type": "Organization", "name": "NyayMitra" },
    "areaServed": "India",
    "description": "NyayMitra provides a legal operations platform and coordination team covering contracts, compliance, documentation and litigation support coordination for businesses across India.",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "NyayMitra Legal Operations Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Fractional Legal Desk" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Compliance Management" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Documentation & Governance" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Expert Access & Advisor Coordination" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "POSH Compliance" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "FSSAI Registration" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "MSME Registration" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Investor Due Diligence Preparation" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Litigation Support Coordination" } }
      ]
    }
  }

  /* ─── Render ─────────────────────────────────────────────────────────────── */
  return (
    <>
      <GlobalStyles />
      <Head>
        <title>NyayMitra | Legal Operations Platform for Startups & Businesses in India</title>
        <meta name="description" content="NyayMitra is a legal operations platform for Indian businesses. Manage contracts, compliance and legal requests in one workspace, with a nationwide network of lawyers, CAs, CSs and advocates." />
        <meta name="keywords" content="legal operations platform India, outsourced legal function India, legal operations partner India, compliance management India, contract management startups India, legal ops startup India, outsourced compliance team India, MSME legal support, startup legal operations, litigation support India" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://mynyaymitra.in" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mynyaymitra.in" />
        <meta property="og:title" content="NyayMitra | Legal Operations Platform for Startups & Businesses in India" />
        <meta property="og:description" content="Manage contracts, compliance and legal requests in one workspace, with a nationwide network of qualified professionals." />
        <meta property="og:image" content="https://mynyaymitra.in/og-image.png" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content="NyayMitra" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nyaymitra" />
        <meta name="twitter:title" content="NyayMitra | Legal Operations Platform for Startups & Businesses in India" />
        <meta name="twitter:description" content="Manage contracts, compliance and legal requests in one workspace, with a nationwide network of qualified professionals." />
        <meta name="twitter:image" content="https://mynyaymitra.in/og-image.png" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      </Head>

      <div style={{ minHeight: "100vh", background: "var(--white)" }}>

        {/* ── Navbar ─────────────────────────────────────────────────────────── */}
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

            <div className="desk-only" style={{ alignItems: "center", gap: 2 }}>
              {navLinks.map(l => <Link key={l.key} href={l.href} className="nav-link">{l.label}</Link>)}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <div className="desk-only" style={{ alignItems: "center", gap: 7 }}>
                <SocialIcon href="https://www.instagram.com/mynyaymitra.in" icon={Instagram} label="Instagram" />
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
            HERO
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
                    Legal Operations Platform for Indian Businesses
                  </span>
                </div>

                {/* HEADLINE */}
                <h1 style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(38px, 5.6vw, 66px)",
                  fontWeight: 600, lineHeight: 1.15,
                  letterSpacing: "-0.03em", color: "var(--ink)",
                  marginBottom: 0, paddingTop: "0.3rem", overflow: "visible",
                }}>
                  The Operating System for<br />
                  <span className="gold-text" style={{ fontStyle: "italic", fontWeight: 300, display: "inline-block", lineHeight: 1.35, overflow: "visible" }}>
                    Your Business Legal Work.
                  </span>
                </h1>

                {/* Supporting line */}
                <div style={{ marginTop: "18px", marginBottom: "8px" }}>
                  <span style={{
                    fontFamily: "var(--serif)", fontSize: "clamp(18px, 2.2vw, 24px)",
                    fontWeight: 400, color: "var(--ink-3)", letterSpacing: "-0.01em",
                    borderLeft: "3px solid var(--gold)", paddingLeft: "16px",
                  }}>
                    Contracts, Compliance and Disputes. One Workspace.
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "28px 0" }}>
                  <div style={{ width: 44, height: 1, background: "linear-gradient(90deg, var(--gold-dk), var(--gold))" }} />
                  <Scale style={{ width: 10, height: 10, color: "var(--gold)" }} />
                  <div style={{ width: 24, height: 1, background: "linear-gradient(90deg, var(--gold), transparent)" }} />
                </div>

                {/* SUBHEADLINE */}

                <p style={{
                  fontFamily: "var(--sans)", fontSize: "15.5px",
                  color: "var(--ink-4)", lineHeight: 1.85,
                  maxWidth: 540, marginBottom: 14, fontWeight: 300,
                }}>
                  NyayMitra is a legal operations platform. Track contracts, compliance and legal requests in one workspace, and tap into a nationwide network of lawyers, CAs, CSs and advocates whenever you need them.
                </p>

                <p style={{
                  fontFamily: "var(--sans)", fontSize: "13.5px",
                  color: "var(--gold-dk)", lineHeight: 1.7,
                  maxWidth: 520, marginBottom: 32, fontWeight: 600,
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  <Handshake style={{ width: 14, height: 14, flexShrink: 0 }} />
                  Not a law firm. We work alongside your existing advisors.
                </p>

                {/* CTAs */}
                <div className="hero-ctas" style={{ marginBottom: 20 }}>
                  <a href={waAssessment} target="_blank" rel="noopener noreferrer" className="btn btn-gold" style={{ gap: 9 }}>
                    <Sparkles style={{ width: 14, height: 14 }} />
                    Book a Free Walkthrough
                  </a>
                  <a href={waLegalOps} target="_blank" rel="noopener noreferrer" className="btn btn-ink" style={{ gap: 9 }}>
                    <Headset style={{ width: 14, height: 14 }} />
                    Talk to Legal Ops
                  </a>
                  <Link href="/startup-legal#pricing" className="btn btn-ghost" style={{ gap: 9, textDecoration: "none" }}>
                    <LayoutDashboard style={{ width: 14, height: 14 }} />
                    Explore Plans
                  </Link>
                </div>

                {/* Trust signals */}
                <div style={{ marginBottom: 32, marginTop: 4 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
                    {[
                      { icon: <Shield style={{ width: 10, height: 10 }} />, text: "Works With Your Existing CA & Lawyers" },
                      { icon: <Network style={{ width: 10, height: 10 }} />, text: "Nationwide Professional Network" },
                      { icon: <IndianRupee style={{ width: 10, height: 10 }} />, text: "Simple Monthly Plans" },
                      { icon: <Headset style={{ width: 10, height: 10 }} />, text: "WhatsApp First Support" },
                    ].map(t => (
                      <div key={t.text} style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--mono)", fontSize: "9px", color: "var(--ink-5)", letterSpacing: "0.08em" }}>
                        <span style={{ color: "var(--gold-dk)" }}>{t.icon}</span>
                        ✓ {t.text}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Personal legal link */}
                <div style={{ marginTop: 8 }}>
                  <span style={{ fontFamily: "var(--sans)", fontSize: "12px", color: "var(--ink-5)", fontWeight: 300 }}>
                    Need personal legal help?{" "}
                  </span>
                  <Link href="/lawyers" style={{ fontFamily: "var(--sans)", fontSize: "12px", color: "var(--gold-dk)", fontWeight: 600, textDecoration: "none" }}>
                    Find a verified lawyer →
                  </Link>
                  <span style={{ fontFamily: "var(--sans)", fontSize: "12px", color: "var(--ink-5)", fontWeight: 300 }}>{" "}· Facing a dispute?{" "}</span>
                  <a href={waLitigation} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--sans)", fontSize: "12px", color: "var(--gold-dk)", fontWeight: 600, textDecoration: "none" }}>
                    Discuss litigation support →
                  </a>
                </div>
              </div>

              {/* ── Right column: Legal Ops Workspace card ── */}
              <div style={{ animation: "fadeUp 0.82s 0.12s cubic-bezier(0.16,1,0.3,1) both" }}>
                <div style={{ animation: "floatSlow 9s ease-in-out infinite", position: "relative" }}>
                  <div className="card" style={{ overflow: "hidden", boxShadow: "0 40px 80px rgba(12,11,9,0.1), 0 8px 24px rgba(12,11,9,0.06), 0 0 0 1px rgba(12,11,9,0.03)" }}>
                    <div style={{
                      background: "var(--ink)", padding: "18px 24px",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      position: "relative", overflow: "hidden",
                    }}>
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, transparent 60%)" }} />
                      <div style={{ display: "flex", alignItems: "center", gap: 10, position: "relative", zIndex: 1 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--gold)", boxShadow: "0 0 12px rgba(201,168,76,0.6)", animation: "glowPulse 2.5s ease-in-out infinite" }} />
                        <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                          Legal Operations Workspace
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: 5, position: "relative", zIndex: 1 }}>
                        {["#ff5f57", "#febc2e", "#28c840"].map(c => (
                          <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c, opacity: 0.9 }} />
                        ))}
                      </div>
                    </div>

                    <div style={{ padding: "8px 0" }}>
                      {flowSteps.map((step, i) => (
                        <div key={step.n}
                          style={{
                            padding: "24px 26px", display: "flex", gap: 18, alignItems: "flex-start",
                            borderBottom: i < 2 ? "1px solid var(--ink-8)" : "none",
                            transition: "background 0.2s", cursor: "default",
                            background: i === 2 ? "var(--gold-pale)" : "transparent",
                          }}
                          onMouseEnter={e => { if (i !== 2) (e.currentTarget as HTMLDivElement).style.background = "var(--ink-9)" }}
                          onMouseLeave={e => { if (i !== 2) (e.currentTarget as HTMLDivElement).style.background = "" }}>
                          <div style={{
                            width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                            background: i === 2 ? "var(--ink)" : "var(--ink-9)",
                            border: `1px solid ${i === 2 ? "transparent" : "var(--ink-7)"}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: i === 2 ? "var(--gold)" : "var(--gold-dk)",
                            boxShadow: i === 2 ? "0 4px 16px rgba(12,11,9,0.2)" : "none",
                          }}>
                            {step.icon}
                          </div>
                          <div style={{ flex: 1, paddingTop: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 5 }}>
                              <span style={{ fontFamily: "var(--mono)", fontSize: "8px", color: "var(--gold-dk)", letterSpacing: "0.12em" }}>{step.n}</span>
                              <span style={{ fontFamily: "var(--sans)", fontSize: "13.5px", fontWeight: 600, color: "var(--ink)" }}>{step.title}</span>
                            </div>
                            <p style={{ fontFamily: "var(--sans)", fontSize: "11.5px", color: "var(--ink-5)", lineHeight: 1.65 }}>{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{
                      padding: "14px 24px", background: "var(--ink-9)", borderTop: "1px solid var(--ink-7)",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                    }}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: "8.5px", color: "var(--ink-5)", letterSpacing: "0.08em" }}>
                        One workspace · One team · WhatsApp first
                      </span>
                      <div style={{
                        display: "flex", alignItems: "center", gap: 5,
                        background: "#f0fdf4", border: "1px solid #bbf7d0",
                        padding: "4px 10px", borderRadius: 100, color: "#15803d",
                      }}>
                        <WaSvg size={9} />
                        <span style={{ fontFamily: "var(--mono)", fontSize: "8.5px", fontWeight: 600 }}>Monthly plans</span>
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
                    <Handshake style={{ width: 12, height: 12, color: "var(--gold)" }} />
                    Works Alongside Your Existing Advisors
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
                    <Zap style={{ width: 11, height: 11, color: "var(--gold-dk)" }} />
                    Legal Work. Tracked to Done.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Trust Strip ─────────────────────────────────────────────────────── */}
        <div style={{
          borderTop: "1px solid var(--ink-7)", borderBottom: "1px solid var(--ink-7)",
          background: "var(--ink-9)", overflow: "hidden",
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px" }}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "stretch" }}>
              {[
                { icon: <LayoutDashboard style={{ width: 13, height: 13 }} />, label: "One Legal Workspace", sub: "Requests, contracts and deadlines in one place" },
                { icon: <FileSignature style={{ width: 13, height: 13 }} />, label: "Contracts and Documents", sub: "Drafting, review, repository, renewals" },
                { icon: <ClipboardList style={{ width: 13, height: 13 }} />, label: "Compliance Tracking", sub: "Proactive calendar, not reactive filing" },
                { icon: <Network style={{ width: 13, height: 13 }} />, label: "Nationwide Network", sub: "CAs, CSs, lawyers and advocates coordinated" },
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

        {/* ── Marquee ─────────────────────────────────────────────────────────── */}
        <div style={{
          borderBottom: "1px solid var(--ink-7)", padding: "11px 0", overflow: "hidden",
          background: "linear-gradient(90deg, var(--ink-9) 0%, var(--white) 50%, var(--ink-9) 100%)",
        }}>
          <div className="mq-track">
            {[...Array(3)].flatMap(() => [
              { val: "Legal Operations", text: "Platform" },
              { val: "One workspace", text: "for contracts, compliance and disputes" },
              { val: "Nationwide", text: "professional network" },
              { val: "Monthly plans", text: "with stated limits" },
              { val: "Litigation", text: "coordination across India" },
              { val: "POSH · FSSAI", text: "· MSME · Shop & Establishment" },
              { val: "Works with", text: "your existing CA, CS & lawyer" },
              { val: "Limits stated", text: "on every plan, nothing unlimited" },
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
            SECTION 2 THE COORDINATION GAP (BLACK)
        ═══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="The coordination gap" className="section-pad" style={{ background: "var(--ink)", position: "relative", overflow: "hidden" }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(rgba(201,168,76,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px", pointerEvents: "none",
          }} />
          <div className="max-w" style={{ padding: "0 28px", position: "relative", zIndex: 1 }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 52 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                  <span className="eyebrow" style={{ color: "var(--gold)" }}>The coordination gap</span>
                </div>
                <h2 style={{
                  fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 52px)",
                  fontWeight: 600, letterSpacing: "-0.025em", color: "white", lineHeight: 1.1,
                }}>
                  You Already Have Advisors.<br />Nobody Coordinates Them.
                </h2>
                <p style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "rgba(255,255,255,0.55)", fontWeight: 300, marginTop: 20, maxWidth: 560, margin: "20px auto 0" }}>
                  Most businesses aren't struggling to find a CA or lawyer. They're struggling to get anything actually done once they have one.
                </p>
              </div>
            </Reveal>

            {/* 4 pillar cards */}
            <Reveal delay={70}>
              <Slider variant="snap" cols={3} dark style={{ marginBottom: 44 }}>
                {[
                  { icon: <Landmark style={{ width: 18, height: 18 }} />, title: "You Have A CA", desc: "Handling accounting and tax filings. You still manage everything else." },
                  { icon: <Gavel style={{ width: 18, height: 18 }} />, title: "You Have A Lawyer", desc: "Available when you bring a matter to them. You still track what needs attention." },
                  { icon: <Users style={{ width: 18, height: 18 }} />, title: "You Have Consultants", desc: "Helping with specific registrations. You still coordinate between them." },
                  { icon: <AlertCircle style={{ width: 18, height: 18 }} />, title: "You're Still The Project Manager", desc: "Chasing updates, tracking deadlines, following up, doing it again.", isLast: true },
                ].map(p => (
                  <div key={p.title} className={`pillar-card${p.isLast ? " is-last" : ""}`}>
                    <div style={{
                      width: 38, height: 38, borderRadius: 10,
                      background: p.isLast ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.05)",
                      border: `1px solid ${p.isLast ? "rgba(201,168,76,0.3)" : "rgba(255,255,255,0.08)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: p.isLast ? "var(--gold)" : "rgba(255,255,255,0.5)",
                    }}>
                      {p.icon}
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--serif)", fontSize: "16px", fontWeight: 600, color: p.isLast ? "var(--gold-lt)" : "white", lineHeight: 1.3, marginBottom: 6 }}>
                        {p.title}
                      </div>
                      <p style={{ fontFamily: "var(--sans)", fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: 1.6, fontWeight: 300 }}>
                        {p.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </Slider>
            </Reveal>

            <Reveal delay={110}>
              <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 36px" }}>
                <p style={{ fontFamily: "var(--serif)", fontSize: "19px", fontStyle: "italic", fontWeight: 400, color: "var(--gold-lt)", lineHeight: 1.6 }}>
                  NyayMitra becomes the single operational layer that coordinates your advisors, tracks your compliance, manages your contracts, and ensures execution so you don't have to.
                </p>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div style={{ textAlign: "center" }}>
                <a href={waAssessment} target="_blank" rel="noopener noreferrer" className="btn btn-gold" style={{ gap: 9 }}>
                  <Sparkles style={{ width: 14, height: 14, flexShrink: 0 }} />
                  Book a Free Walkthrough
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 3 WHAT WE DELIVER (4 cards)
        ═══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="What we deliver" className="section-pad" style={{ background: "var(--white)" }}>
          <div className="max-w" style={{ padding: "0 28px" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 56 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                  <span className="eyebrow">What we deliver</span>
                </div>
                <h2 style={{
                  fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 50px)",
                  fontWeight: 600, letterSpacing: "-0.025em", color: "var(--ink)", lineHeight: 1.15,
                }}>
                  More Than Filing. A Legal Operations Layer.
                </h2>
                <p style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "var(--ink-5)", fontWeight: 300, maxWidth: 540, margin: "14px auto 0" }}>
                  Most services file forms. NyayMitra runs the system behind your legal work.
                </p>
              </div>
            </Reveal>

            <Slider variant="paged" cols={2} autoplay={5200}>
              {[
                {
                  icon: <Network style={{ width: 24, height: 24 }} />,
                  title: "Legal Coordination",
                  desc: "Coordinate lawyers, CAs, and specialists through one point of contact. No more chasing multiple advisors or being the middleman between your own professionals.",
                  tags: ["Advisor Management", "Follow-ups", "Escalations"],
                },
                {
                  icon: <Folder style={{ width: 24, height: 24 }} />,
                  title: "Documentation Management",
                  desc: "Keep contracts, registrations, and corporate records organised, version-controlled, and investor-ready. A complete data room when you need it.",
                  tags: ["Contract Repository", "Due Diligence", "Governance Records"],
                },
                {
                  icon: <ClipboardList style={{ width: 24, height: 24 }} />,
                  title: "Compliance Operations",
                  desc: "Track deadlines, filings, and regulatory obligations proactively not reactively. A live compliance calendar with WhatsApp reminders before anything is due.",
                  tags: ["Deadline Calendar", "Pan India", "POSH · FSSAI · MSME"],
                },
                {
                  icon: <CheckCircle style={{ width: 24, height: 24 }} />,
                  title: "Execution Management",
                  desc: "Ensure legal tasks move from discussion to actual completion. NyayMitra tracks every open item until it's done so nothing slips.",
                  tags: ["Task Tracking", "Accountable Closure", "Progress Visibility"],
                },
              ].map((card, i) => (
                <div key={card.title} style={{ display: "flex", width: "100%" }}>
                  <div className="why-card" style={{ height: "100%", padding: "32px 28px" }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: 14,
                      background: "var(--ink-9)", border: "1px solid var(--ink-7)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "var(--gold-dk)",
                    }}>
                      {card.icon}
                    </div>
                    <div>
                      <h3 style={{ fontFamily: "var(--serif)", fontSize: "22px", fontWeight: 600, color: "var(--ink)", marginBottom: 10, lineHeight: 1.25 }}>
                        {card.title}
                      </h3>
                      <p style={{ fontFamily: "var(--sans)", fontSize: "13px", color: "var(--ink-5)", lineHeight: 1.8, fontWeight: 300 }}>
                        {card.desc}
                      </p>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: "auto", paddingTop: 8 }}>
                      {card.tags.map(tag => (
                        <span key={tag} style={{
                          fontFamily: "var(--mono)", fontSize: "8.5px", letterSpacing: "0.1em",
                          padding: "5px 11px", borderRadius: 100,
                          background: "var(--gold-pale)", border: "1px solid var(--gold)",
                          color: "var(--gold-dk)", textTransform: "uppercase",
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 4 LEGAL OPERATIONS WORKSPACE (dashboard)
        ═══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="Platform preview" className="section-pad" style={{ background: "var(--ink-9)", borderTop: "1px solid var(--ink-7)", borderBottom: "1px solid var(--ink-7)" }}>
          <div className="max-w" style={{ padding: "0 28px" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                  <span className="eyebrow">Platform preview</span>
                </div>
                <h2 style={{
                  fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 50px)",
                  fontWeight: 600, letterSpacing: "-0.025em", color: "var(--ink)", lineHeight: 1.15, marginBottom: 14,
                }}>
                  Your Legal Operations Workspace
                </h2>
                <p style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "var(--ink-5)", fontWeight: 300, maxWidth: 560, margin: "0 auto" }}>
                  Track legal requests, contracts, compliance and documents from one place, so you always know what is pending, what is done and what is next. Illustrative preview with sample data.
                </p>
              </div>
            </Reveal>

            <div className="dash-shell">
              {/* Sidebar */}
              <div className="dash-sidebar">
                <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 12px 18px" }}>
                  <Scale style={{ width: 14, height: 14, color: "var(--gold)" }} />
                  <span style={{ fontFamily: "var(--serif)", fontSize: "14px", fontWeight: 600, color: "white" }}>NyayMitra</span>
                </div>
                {[
                  { icon: <LayoutDashboard style={{ width: 13, height: 13 }} />, label: "Overview", active: true },
                  { icon: <ClipboardList style={{ width: 13, height: 13 }} />, label: "Compliance" },
                  { icon: <Workflow style={{ width: 13, height: 13 }} />, label: "Requests" },
                  { icon: <FileSignature style={{ width: 13, height: 13 }} />, label: "Contracts" },
                  { icon: <Folder style={{ width: 13, height: 13 }} />, label: "Documents" },
                  { icon: <Users style={{ width: 13, height: 13 }} />, label: "Advisors" },
                ].map(item => (
                  <div key={item.label} className={`dash-nav-item${item.active ? " active" : ""}`}>
                    {item.icon}
                    {item.label}
                  </div>
                ))}
              </div>

              {/* Main panel */}
              <div style={{ padding: "20px 22px 26px", display: "flex", flexDirection: "column", gap: 18, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 9,
                    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 8, padding: "9px 14px", flex: 1, minWidth: 160, maxWidth: 320,
                  }}>
                    <Search style={{ width: 13, height: 13, color: "rgba(255,255,255,0.3)" }} />
                    <span style={{ fontFamily: "var(--sans)", fontSize: "11.5px", color: "rgba(255,255,255,0.3)" }}>Search compliance, contracts...</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: "50%", position: "relative",
                      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Bell style={{ width: 13, height: 13, color: "rgba(255,255,255,0.5)" }} />
                      <span style={{ position: "absolute", top: 6, right: 7, width: 6, height: 6, borderRadius: "50%", background: "var(--gold)" }} />
                    </div>
                    <div style={{
                      width: 34, height: 34, borderRadius: "50%",
                      background: "var(--gold-pale)", display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: "10px", fontWeight: 700, color: "var(--gold-dk)" }}>NM</span>
                    </div>
                  </div>
                </div>

                <div className="dash-metrics-grid">
                  {[
                    { label: "Compliance Health Score", value: "92%", icon: <ShieldCheck style={{ width: 14, height: 14 }} />, trend: "up" },
                    { label: "Active Contracts", value: "24", icon: <FileSignature style={{ width: 14, height: 14 }} /> },
                    { label: "Pending Tasks", value: "7", icon: <AlarmClock style={{ width: 14, height: 14 }} /> },
                    { label: "Upcoming Deadlines", value: "12", icon: <Clock style={{ width: 14, height: 14 }} /> },
                    { label: "Open Legal Requests", value: "9", icon: <Workflow style={{ width: 14, height: 14 }} /> },
                  ].map(m => (
                    <div key={m.label} className="dash-metric-card">
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ color: "var(--gold)" }}>{m.icon}</span>
                        {m.trend === "up" && <TrendingUp style={{ width: 11, height: 11, color: "#4ade80" }} />}
                      </div>
                      <div style={{ fontFamily: "var(--serif)", fontSize: "26px", fontWeight: 600, color: "white", lineHeight: 1 }}>
                        {m.value}
                      </div>
                      <div style={{ fontFamily: "var(--sans)", fontSize: "10px", color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>
                        {m.label}
                      </div>
                      {m.label === "Compliance Health Score" && (
                        <div className="dash-progress-track" style={{ marginTop: 2 }}>
                          <div className="dash-progress-fill" style={{ width: "92%" }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="dash-panels-grid">
                  <div className="dash-panel">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                      <span style={{ fontFamily: "var(--sans)", fontSize: "12.5px", fontWeight: 600, color: "white" }}>Compliance Calendar</span>
                      <ClipboardList style={{ width: 13, height: 13, color: "var(--gold)" }} />
                    </div>
                    {[
                      { name: "GST Filing", status: "Completed", color: "#4ade80", bg: "rgba(74,222,128,0.12)" },
                      { name: "MSME Renewal", status: "Due in 7 Days", color: "#facc15", bg: "rgba(250,204,21,0.12)" },
                      { name: "FSSAI Renewal", status: "Due in 18 Days", color: "var(--gold-lt)", bg: "rgba(201,168,76,0.12)" },
                      { name: "POSH Annual Filing", status: "Completed", color: "#4ade80", bg: "rgba(74,222,128,0.12)" },
                    ].map(row => (
                      <div key={row.name} className="dash-row">
                        <span style={{ fontFamily: "var(--sans)", fontSize: "11.5px", color: "rgba(255,255,255,0.65)" }}>{row.name}</span>
                        <span className="dash-status-badge" style={{ color: row.color, background: row.bg }}>{row.status}</span>
                      </div>
                    ))}
                  </div>

                  <div className="dash-panel">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                      <span style={{ fontFamily: "var(--sans)", fontSize: "12.5px", fontWeight: 600, color: "white" }}>Contract Management</span>
                      <FileSignature style={{ width: 13, height: 13, color: "var(--gold)" }} />
                    </div>
                    {[
                      { name: "Vendor Agreement", status: "Review Pending", color: "#facc15", bg: "rgba(250,204,21,0.12)" },
                      { name: "Employment Contract", status: "Approved", color: "#4ade80", bg: "rgba(74,222,128,0.12)" },
                      { name: "NDA Client XYZ", status: "Completed", color: "#4ade80", bg: "rgba(74,222,128,0.12)" },
                    ].map(row => (
                      <div key={row.name} className="dash-row">
                        <span style={{ fontFamily: "var(--sans)", fontSize: "11.5px", color: "rgba(255,255,255,0.65)" }}>{row.name}</span>
                        <span className="dash-status-badge" style={{ color: row.color, background: row.bg }}>{row.status}</span>
                      </div>
                    ))}
                    <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                      <div style={{ fontFamily: "var(--sans)", fontSize: "12.5px", fontWeight: 600, color: "white", marginBottom: 10, display: "flex", alignItems: "center", gap: 7 }}>
                        <ArrowUpRight style={{ width: 12, height: 12, color: "var(--gold)" }} />
                        Recent Activities
                      </div>
                      {[
                        { text: "NDA Uploaded & Reviewed", icon: <FilePlus style={{ width: 11, height: 11 }} /> },
                        { text: "Compliance Reminder Sent", icon: <Bell style={{ width: 11, height: 11 }} /> },
                        { text: "Registration Submitted", icon: <FileCheck style={{ width: 11, height: 11 }} /> },
                        { text: "Document Approved & Filed", icon: <FolderCheck style={{ width: 11, height: 11 }} /> },
                      ].map(act => (
                        <div key={act.text} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0" }}>
                          <span style={{ color: "var(--gold-dk)" }}>{act.icon}</span>
                          <span style={{ fontFamily: "var(--sans)", fontSize: "10.5px", color: "rgba(255,255,255,0.45)" }}>{act.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 5 SERVICES (6 areas)
        ═══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="Legal ops services" className="section-pad" style={{ background: "var(--white)" }}>
          <div className="max-w" style={{ padding: "0 28px" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 56 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                  <span className="eyebrow">What we manage</span>
                </div>
                <h2 style={{
                  fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 50px)",
                  fontWeight: 600, letterSpacing: "-0.025em", color: "var(--ink)", lineHeight: 1.15,
                }}>
                  Everything Legal. One Workspace.
                </h2>
                <p style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "var(--ink-5)", fontWeight: 300, maxWidth: 560, margin: "14px auto 0" }}>
                  Six service areas, delivered by qualified professionals and coordinated by NyayMitra. Government fees and specialist professional fees are billed separately.
                </p>
              </div>
            </Reveal>

            <Slider variant="focus" cols={3} autoplay={4800}>
              {[
                {
                  icon: <FileSignature style={{ width: 22, height: 22 }} />,
                  num: "01",
                  title: "Contracts and Agreements",
                  items: ["Vendor, client and service agreements", "NDAs and commercial agreements", "Founder and shareholder agreements", "Review, revision and negotiation support", "Contract repository and renewals"],
                },
                {
                  icon: <ClipboardList style={{ width: 22, height: 22 }} />,
                  num: "02",
                  title: "Compliance and Regulatory",
                  items: ["Compliance calendar and deadline tracking", "MCA, GST and tax coordination via CAs and CSs", "POSH, FSSAI, MSME, Shop & Establishment", "Labour and employment compliance", "Documentation collection and follow ups"],
                },
                {
                  icon: <Building2 style={{ width: 22, height: 22 }} />,
                  num: "03",
                  title: "Corporate and Business Legal",
                  items: ["Company, LLP and partnership documentation", "Board resolutions and corporate records", "Restructuring coordination", "Investor due diligence preparation", "Data room readiness"],
                },
                {
                  icon: <Users style={{ width: 22, height: 22 }} />,
                  num: "04",
                  title: "Employment and HR Documents",
                  items: ["Offer letters and employment agreements", "Consultant agreements", "HR and workplace policies", "Confidentiality agreements", "Employee exit documentation"],
                },
                {
                  icon: <Shield style={{ width: 22, height: 22 }} />,
                  num: "05",
                  title: "IP and Brand Protection",
                  items: ["Trademark search and filing coordination", "Copyright registration coordination", "IP assignment and licensing", "Software ownership documentation", "Brand protection support"],
                },
                {
                  icon: <FileWarning style={{ width: 22, height: 22 }} />,
                  num: "06",
                  title: "Notices, Recovery and Disputes",
                  items: ["Legal notice drafting and coordination", "Payment recovery notices", "Negotiation and settlement coordination", "Arbitration and mediation coordination", "Dispute documentation and case preparation"],
                },
              ].map((svc, i) => (
                <div key={svc.title} style={{ display: "flex", width: "100%" }}>
                  <div className="audience-card" style={{ padding: "32px 28px", gap: 18, height: "100%" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{
                        width: 46, height: 46, borderRadius: 12,
                        background: "var(--ink-9)", border: "1px solid var(--ink-7)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "var(--gold-dk)", flexShrink: 0,
                      }}>
                        {svc.icon}
                      </div>
                      <div>
                        <span style={{ fontFamily: "var(--mono)", fontSize: "8px", color: "var(--gold-dk)", letterSpacing: "0.16em" }}>{svc.num}</span>
                        <h3 style={{ fontFamily: "var(--serif)", fontSize: "20px", fontWeight: 600, color: "var(--ink)", lineHeight: 1.2 }}>{svc.title}</h3>
                      </div>
                    </div>
                    <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                      {svc.items.map(item => (
                        <li key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <CheckCircle style={{ width: 12, height: 12, color: "var(--gold-dk)", flexShrink: 0 }} />
                          <span style={{ fontFamily: "var(--sans)", fontSize: "12.5px", color: "var(--ink-4)", fontWeight: 400 }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            LITIGATION ACROSS INDIA
        ═══════════════════════════════════════════════════════════════════════ */}
        <section id="litigation" aria-label="Litigation support across India" className="section-pad" style={{ background: "var(--ink-9)", borderTop: "1px solid var(--ink-7)", borderBottom: "1px solid var(--ink-7)" }}>
          <div className="max-w" style={{ padding: "0 28px" }}>
            <div className="startup-grid">
              <Reveal>
                <div>
                  <span className="eyebrow">Litigation support</span>
                  <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 600, letterSpacing: "-0.025em", color: "var(--ink)", lineHeight: 1.15, margin: "18px 0 16px" }}>
                    Litigation and Legal Representation, Across India.
                  </h2>
                  <p style={{ fontFamily: "var(--sans)", fontSize: "14.5px", color: "var(--ink-4)", lineHeight: 1.85, fontWeight: 300, marginBottom: 14 }}>
                    Access qualified advocates for business and individual matters, wherever your case needs support. NyayMitra coordinates intake, documents, updates and follow ups, so you are never managing it alone.
                  </p>
                  <p style={{ fontFamily: "var(--sans)", fontSize: "12px", color: "var(--ink-5)", lineHeight: 1.75, fontWeight: 300, marginBottom: 26 }}>
                    Delivered through a nationwide advocate network, subject to advocate availability, case assessment and acceptance. Every case is separately scoped and quoted. Advocates independently assess each matter, and no outcome is ever guaranteed.
                  </p>
                  <a href={waLitigation} target="_blank" rel="noopener noreferrer" className="btn btn-ink" style={{ gap: 9 }}>
                    <Gavel style={{ width: 14, height: 14 }} /> Discuss Your Legal Matter
                  </a>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div className="card" style={{ padding: "28px 26px" }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold-dk)", marginBottom: 16 }}>Matters we can coordinate</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {["Civil", "Commercial disputes", "Cheque bounce", "Recovery", "Arbitration", "Company and shareholder", "Employment and labour", "IP disputes", "Consumer", "Property", "Criminal defence", "High Court", "District courts", "NCLT and tribunals", "Appeals"].map(c => (
                      <span key={c} style={{ fontFamily: "var(--sans)", fontSize: "11.5px", color: "var(--ink-3)", padding: "6px 12px", borderRadius: 100, border: "1px solid var(--ink-7)", background: "var(--ink-9)" }}>{c}</span>
                    ))}
                  </div>
                  <p style={{ fontFamily: "var(--sans)", fontSize: "11px", color: "var(--ink-5)", marginTop: 18, lineHeight: 1.7, fontWeight: 300 }}>
                    Litigation is not included in monthly plans. Advocate fees, court fees and case expenses are quoted and disclosed separately.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 6 WHEN BUSINESSES NEED NYAYMITRA (8 use cases)
        ═══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="When businesses need NyayMitra" className="section-pad" style={{ background: "var(--ink)", position: "relative", overflow: "hidden" }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(rgba(201,168,76,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px", pointerEvents: "none",
          }} />
          <div className="max-w" style={{ padding: "0 28px", position: "relative", zIndex: 1 }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 52 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                  <span className="eyebrow" style={{ color: "var(--gold)" }}>When you need us</span>
                </div>
                <h2 style={{
                  fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 50px)",
                  fontWeight: 600, letterSpacing: "-0.025em", color: "white", lineHeight: 1.15,
                }}>
                  When Businesses Need NyayMitra
                </h2>
                <p style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "rgba(255,255,255,0.45)", fontWeight: 300, maxWidth: 520, margin: "14px auto 0" }}>
                  These are the moments where having an outsourced legal ops team stops being a luxury and becomes a necessity.
                </p>
              </div>
            </Reveal>

            <Slider variant="marquee" dark itemW={280} speed={55}>
              {[
                { icon: <UserCheck style={{ width: 20, height: 20 }} />, title: "Hiring Employees", desc: "Offer letters, NDAs, IP assignment, and employment contracts coordinated and compliant." },
                { icon: <Handshake style={{ width: 20, height: 20 }} />, title: "Signing Enterprise Clients", desc: "MSAs, SOWs, and vendor agreements reviewed and negotiated through your legal ops team." },
                { icon: <Target style={{ width: 20, height: 20 }} />, title: "Vendor Negotiations", desc: "Procurement contracts, payment terms, SLAs, and indemnity clauses handled without delays." },
                { icon: <Globe style={{ width: 20, height: 20 }} />, title: "Multi-City Expansion", desc: "State-wise registrations, Shop & Establishment licenses, and compliance managed centrally." },
                { icon: <TrendingUp style={{ width: 20, height: 20 }} />, title: "Investor Due Diligence", desc: "Data room preparation, document audit trails, and compliance records ready for scrutiny." },
                { icon: <ShieldCheck style={{ width: 20, height: 20 }} />, title: "Regulatory Compliance", desc: "POSH, FSSAI, MSME, and labour compliance tracked and executed before deadlines, not after." },
                { icon: <FileWarning style={{ width: 20, height: 20 }} />, title: "Facing a Notice or Dispute", desc: "Notices, recovery and dispute resolution coordinated, with litigation support when it is needed." },
                { icon: <Sparkles style={{ width: 20, height: 20 }} />, title: "Fundraising Readiness", desc: "Legal infrastructure that makes investors trust you and accelerates closing, not slows it." },
              ].map((card, i) => (
                <div key={card.title} style={{ display: "flex", width: "100%" }}>
                  <div className="pillar-card" style={{ height: "100%" }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "var(--gold)",
                    }}>
                      {card.icon}
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--serif)", fontSize: "15px", fontWeight: 600, color: "white", lineHeight: 1.3, marginBottom: 6 }}>
                        {card.title}
                      </div>
                      <p style={{ fontFamily: "var(--sans)", fontSize: "11.5px", color: "rgba(255,255,255,0.4)", lineHeight: 1.65, fontWeight: 300 }}>
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>

            <Reveal delay={120}>
              <div style={{ textAlign: "center", marginTop: 48 }}>
                <a href={waAssessment} target="_blank" rel="noopener noreferrer" className="btn btn-gold" style={{ gap: 9 }}>
                  <Sparkles style={{ width: 14, height: 14 }} />
                  Book a Free Walkthrough
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 7 HOW NYAYMITRA WORKS (vertical ladder)
        ═══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="How NyayMitra works" className="section-pad" style={{ background: "var(--white)" }}>
          <div className="max-w" style={{ padding: "0 28px" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 56 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                  <span className="eyebrow">How it works</span>
                </div>
                <h2 style={{
                  fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 50px)",
                  fontWeight: 600, letterSpacing: "-0.025em", color: "var(--ink)", lineHeight: 1.15,
                }}>
                  Your Legal Operations Platform and Team
                </h2>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <div className="workflow-ladder">
                {[
                  { label: "Your Business", icon: <Briefcase style={{ width: 16, height: 16 }} />, accent: false },
                  { label: "NyayMitra Legal Operations Platform", icon: <Scale style={{ width: 16, height: 16 }} />, accent: true },
                  { label: "CAs · CSs · Lawyers · Advocates", icon: <Users style={{ width: 16, height: 16 }} />, accent: false },
                  { label: "Work Done and Tracked", icon: <CheckCircle style={{ width: 16, height: 16 }} />, accent: false },
                ].map((step, i, arr) => (
                  <div key={step.label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div className={`workflow-ladder-item${step.accent ? " is-accent" : ""}`}>
                      <span style={{ color: step.accent ? "var(--gold)" : "var(--gold-dk)" }}>{step.icon}</span>
                      <span style={{
                        fontFamily: "var(--sans)", fontSize: "14px", fontWeight: 600,
                        color: step.accent ? "white" : "var(--ink)",
                      }}>
                        {step.label}
                      </span>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="workflow-ladder-arrow">
                        <ChevronDown style={{ width: 18, height: 18 }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={100}>
              <p style={{
                fontFamily: "var(--sans)", fontSize: "14.5px", color: "var(--ink-5)",
                lineHeight: 1.9, maxWidth: 620, margin: "40px auto 0", textAlign: "center", fontWeight: 300,
              }}>
                You already have advisors. NyayMitra is the platform and team in between: tracking requests, routing documents, following up on deadlines and making sure every task reaches completion.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            PLANS TEASER
        ═══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="Plans" className="section-pad" style={{ background: "var(--ink-9)", borderTop: "1px solid var(--ink-7)", borderBottom: "1px solid var(--ink-7)" }}>
          <div className="max-w" style={{ padding: "0 28px" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}><span className="eyebrow">Plans</span></div>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 50px)", fontWeight: 600, letterSpacing: "-0.025em", color: "var(--ink)", lineHeight: 1.15 }}>
                  Pick the Capacity Your Business Needs
                </h2>
                <p style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "var(--ink-5)", fontWeight: 300, maxWidth: 560, margin: "14px auto 0" }}>
                  Five monthly plans with defined limits for drafting, review and consultation. Nothing is unlimited, and every limit is shown.
                </p>
              </div>
            </Reveal>
            <Slider variant="snap" cols={3}>
              {[
                { stage: "Early stage", name: "Legal Essentials", line: "Paperwork, deadlines and advisor coordination in one place.", popular: false },
                { stage: "Growing", name: "Startup Legal Operations", line: "Contract register, compliance calendar and a monthly review.", popular: true },
                { stage: "Scaling", name: "Business Legal Desk", line: "Contracts from intake to renewal, with escalation and reporting.", popular: false },
                { stage: "Multi department", name: "Advanced Legal Operations", line: "Work coordinated across departments with a risk register.", popular: false },
                { stage: "High growth", name: "Fractional Legal Operations Office", line: "A managed legal operations function with dedicated coordination.", popular: false },
              ].map((p, i) => (
                <div key={p.name} style={{ display: "flex", width: "100%" }}>
                  <Link href="/startup-legal#pricing" className="action-card" style={{ height: "100%", borderColor: p.popular ? "var(--gold)" : undefined }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "8.5px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold-dk)" }}>{p.popular ? "Most popular · " : ""}{p.stage}</span>
                    <h3 style={{ fontFamily: "var(--serif)", fontSize: "18px", fontWeight: 600, color: "var(--ink)", lineHeight: 1.25 }}>{p.name}</h3>
                    <p style={{ fontFamily: "var(--sans)", fontSize: "12px", color: "var(--ink-5)", lineHeight: 1.7, fontWeight: 300 }}>{p.line}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: "auto", color: "var(--gold-dk)", fontFamily: "var(--sans)", fontSize: "12px", fontWeight: 600 }}>See what is included <ArrowRight style={{ width: 12, height: 12 }} /></div>
                  </Link>
                </div>
              ))}
            </Slider>
            <p style={{ textAlign: "center", fontFamily: "var(--sans)", fontSize: "11.5px", color: "var(--ink-5)", marginTop: 26, fontWeight: 300 }}>
              Litigation is separately quoted. Government fees, stamp duty and external professional fees are additional.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 8 WHY BUSINESSES CHOOSE NYAYMITRA
        ═══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="Why businesses choose NyayMitra" className="section-pad" style={{ background: "var(--white)" }}>
          <div className="max-w" style={{ padding: "0 28px" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 52 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                  <span className="eyebrow">Why NyayMitra</span>
                </div>
                <h2 style={{
                  fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 50px)",
                  fontWeight: 600, letterSpacing: "-0.025em", color: "var(--ink)", lineHeight: 1.15,
                }}>
                  We Don't Just File Compliances.
                </h2>
                <p style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "var(--ink-5)", fontWeight: 300, maxWidth: 500, margin: "14px auto 0" }}>
                  NyayMitra is legal and compliance infrastructure, not a filing service.
                </p>
              </div>
            </Reveal>

            <Slider variant="paged" cols={3} autoplay={6000}>
              {[
                {
                  icon: <Network style={{ width: 20, height: 20 }} />,
                  title: "Coordinate Execution",
                  desc: "One team routes legal work between your CA, CS, lawyers and specialists. No more managing multiple advisors yourself.",
                },
                {
                  icon: <Folder style={{ width: 20, height: 20 }} />,
                  title: "Manage Documentation",
                  desc: "Contracts, records, and filings organised and version-controlled. Investor-ready documentation when it matters.",
                },
                {
                  icon: <AlarmClock style={{ width: 20, height: 20 }} />,
                  title: "Track Compliance",
                  desc: "Proactive deadline monitoring with WhatsApp reminders before filings are due, not after they're missed.",
                },
                {
                  icon: <Workflow style={{ width: 20, height: 20 }} />,
                  title: "Route Legal Workflows",
                  desc: "Every legal task tracked from assignment to completion. Nothing falls between advisors or sits in someone's inbox.",
                },
                {
                  icon: <UserCheck style={{ width: 20, height: 20 }} />,
                  title: "Reduce Founder Dependency",
                  desc: "Stop being the middleman in your own legal function. NyayMitra owns execution so you own the business.",
                },
                {
                  icon: <ShieldCheck style={{ width: 20, height: 20 }} />,
                  title: "Build Legal Infrastructure",
                  desc: "Transform ad-hoc legal handling into a system. Consistent, trackable, and scalable as you grow.",
                },
              ].map((card, i) => (
                <div key={card.title} style={{ display: "flex", width: "100%" }}>
                  <div className="why-card" style={{ height: "100%" }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 11,
                      background: "var(--ink-9)", border: "1px solid var(--ink-7)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "var(--gold-dk)",
                    }}>
                      {card.icon}
                    </div>
                    <div>
                      <h3 style={{ fontFamily: "var(--serif)", fontSize: "17px", fontWeight: 600, color: "var(--ink)", marginBottom: 7, lineHeight: 1.3 }}>
                        {card.title}
                      </h3>
                      <p style={{ fontFamily: "var(--sans)", fontSize: "12px", color: "var(--ink-5)", lineHeight: 1.7, fontWeight: 300 }}>
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 9 WHO WE SERVE (8 cards)
        ═══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="Who we serve" className="section-pad" style={{ background: "var(--ink-9)", borderTop: "1px solid var(--ink-7)", borderBottom: "1px solid var(--ink-7)" }}>
          <div className="max-w" style={{ padding: "0 28px" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 52 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                  <span className="eyebrow">Who we serve</span>
                </div>
                <h2 style={{
                  fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 50px)",
                  fontWeight: 600, letterSpacing: "-0.025em", color: "var(--ink)", lineHeight: 1.15,
                }}>
                  Built For Growing Businesses
                </h2>
                <p style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "var(--ink-5)", fontWeight: 300, maxWidth: 480, margin: "14px auto 0" }}>
                  Any business that needs contracts managed, compliance tracked, and legal execution handled.
                </p>
              </div>
            </Reveal>

            <Slider variant="marquee" reverse itemW={210} speed={38}>
              {[
                { icon: <Store style={{ width: 20, height: 20 }} />, label: "MSMEs" },
                { icon: <Factory style={{ width: 20, height: 20 }} />, label: "Manufacturing" },
                { icon: <Sparkles style={{ width: 20, height: 20 }} />, label: "D2C Brands" },
                { icon: <Megaphone style={{ width: 20, height: 20 }} />, label: "Agencies" },
                { icon: <Cpu style={{ width: 20, height: 20 }} />, label: "IT Companies" },
                { icon: <Stethoscope style={{ width: 20, height: 20 }} />, label: "Healthcare" },
                { icon: <Briefcase style={{ width: 20, height: 20 }} />, label: "Professional Firms" },
                { icon: <Lightbulb style={{ width: 20, height: 20 }} />, label: "Startups" },
              ].map((item, i) => (
                <div key={item.label} style={{ display: "flex", width: "100%" }}>
                  <div className="audience-card" style={{ padding: "26px 20px", alignItems: "center", textAlign: "center", gap: 14 }}>
                    <div style={{
                      width: 46, height: 46, borderRadius: 12,
                      background: "var(--ink-9)", border: "1px solid var(--ink-7)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "var(--gold-dk)",
                    }}>
                      {item.icon}
                    </div>
                    <span style={{ fontFamily: "var(--serif)", fontSize: "15.5px", fontWeight: 600, color: "var(--ink)" }}>
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 10 EXPLORE SOLUTIONS (navigation hub)
        ═══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="Explore solutions" className="section-pad" style={{ background: "var(--white)" }}>
          <div className="max-w" style={{ padding: "0 28px" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                  <span className="eyebrow">Explore</span>
                </div>
                <h2 style={{
                  fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 50px)",
                  fontWeight: 600, letterSpacing: "-0.025em", color: "var(--ink)", lineHeight: 1.15,
                }}>
                  Explore Solutions
                </h2>
              </div>
            </Reveal>

            <Slider variant="snap" cols={4}>
              {[
                { icon: <ClipboardList style={{ width: 22, height: 22 }} />, title: "Compliance Services", desc: "Registrations, renewals, and filings coordinated end to end across India.", href: "/compliance" },
                { icon: <LayoutDashboard style={{ width: 22, height: 22 }} />, title: "Legal Ops Plans", desc: "Monthly plans for contracts, compliance and legal requests in one workspace.", href: "/startup-legal" },
                { icon: <Gavel style={{ width: 22, height: 22 }} />, title: "Litigation Support", desc: "Access qualified advocates across India, scoped and quoted per matter.", href: waLitigation },
                { icon: <Bot style={{ width: 22, height: 22 }} />, title: "Legal AI", desc: "Plain-language answers to legal and compliance questions, instantly.", href: "/legal-ai" },
              ].map((card, i) => (
                <div key={card.title} style={{ display: "flex", width: "100%" }}>
                  <Link href={card.href} className="action-card" style={{ height: "100%" }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 12,
                      background: "var(--ink-9)", border: "1px solid var(--ink-7)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "var(--gold-dk)",
                    }}>
                      {card.icon}
                    </div>
                    <div>
                      <h3 style={{ fontFamily: "var(--serif)", fontSize: "18px", fontWeight: 600, color: "var(--ink)", marginBottom: 7, lineHeight: 1.3 }}>
                        {card.title}
                      </h3>
                      <p style={{ fontFamily: "var(--sans)", fontSize: "12px", color: "var(--ink-5)", lineHeight: 1.7, fontWeight: 300 }}>
                        {card.desc}
                      </p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: "auto", color: "var(--gold-dk)", fontFamily: "var(--sans)", fontSize: "12px", fontWeight: 600 }}>
                      Explore <ArrowRight style={{ width: 12, height: 12 }} />
                    </div>
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 11 INDIVIDUAL LEGAL SUPPORT (near footer, reduced prominence)
        ═══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="Personal legal help" className="section-pad b2c-section" style={{ borderTop: "1px solid var(--ink-7)", borderBottom: "1px solid var(--ink-7)", paddingTop: 64, paddingBottom: 64 }}>
          <div className="max-w" style={{ padding: "0 28px" }}>
            <Reveal>
              <div style={{ marginBottom: 28 }}>
                <div style={{ marginBottom: 12 }}>
                  <span className="eyebrow">Personal legal help</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 18 }}>
                  <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1.25 }}>
                    Individual Legal Support
                  </h2>
                  <p style={{ fontFamily: "var(--sans)", fontSize: "13px", color: "var(--ink-5)", fontWeight: 300, maxWidth: 320, lineHeight: 1.75 }}>
                    Need help with affidavits, notices, notary, or personal legal matters? NyayMitra connects you to verified advocates.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={50}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginBottom: 28 }}>
                {[
                  { icon: <Scale style={{ width: 18, height: 18 }} />, label: "Find a Lawyer", desc: "Verified advocates across India.", href: "/lawyers" },
                  { icon: <Bot style={{ width: 18, height: 18 }} />, label: "Legal AI Guidance", desc: "AI-powered answers in plain language.", href: "/legal-ai" },
                  { icon: <CalendarCheck style={{ width: 18, height: 18 }} />, label: "Book Consultation", desc: "Speak to an expert in 30 minutes.", href: "/lawyers" },
                ].map(card => (
                  <Link key={card.label} href={card.href} style={{
                    display: "flex", flexDirection: "column", gap: 10, padding: "20px",
                    background: "var(--ink-9)", border: "1px solid var(--ink-7)",
                    borderRadius: "var(--radius-lg)", textDecoration: "none",
                    transition: "all 0.24s cubic-bezier(0.16,1,0.3,1)",
                  }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLAnchorElement
                      el.style.transform = "translateY(-3px)"; el.style.borderColor = "var(--ink-5)"
                      el.style.boxShadow = "0 12px 32px rgba(12,11,9,0.07)"
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLAnchorElement
                      el.style.transform = ""; el.style.borderColor = "var(--ink-7)"; el.style.boxShadow = ""
                    }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--white)", border: "1px solid var(--ink-7)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold-dk)" }}>
                      {card.icon}
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--serif)", fontSize: "15.5px", fontWeight: 600, color: "var(--ink)", marginBottom: 3 }}>{card.label}</div>
                      <p style={{ fontFamily: "var(--sans)", fontSize: "11.5px", color: "var(--ink-5)", lineHeight: 1.6, fontWeight: 300 }}>{card.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div style={{ padding: "18px 22px", border: "1px solid var(--ink-7)", borderRadius: "var(--radius-xl)", background: "var(--ink-9)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--ink-5)", letterSpacing: "0.18em", textTransform: "uppercase" }}>Select your issue → get WhatsApp guidance</span>
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
                <p style={{ fontFamily: "var(--sans)", fontSize: "10.5px", color: "var(--ink-6)", marginTop: 14, display: "flex", alignItems: "center", gap: 6 }}>
                  <WaSvg size={10} />
                  Tap any issue get free guidance on WhatsApp within minutes
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 12 SOCIAL PROOF (real metrics)
        ═══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="Social proof" className="section-pad" style={{ background: "var(--white)" }}>
          <div className="max-w" style={{ padding: "0 28px" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 52 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                  <span className="eyebrow">Built on real business conversations</span>
                </div>
                <h2 style={{
                  fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 50px)",
                  fontWeight: 600, letterSpacing: "-0.025em", color: "var(--ink)", lineHeight: 1.15,
                }}>
                  Built Around Real Business Problems
                </h2>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <div className="stat-counter-grid">
                <StatCounter end={100} suffix="+" label="Founder & Business Conversations" />
                <StatCounter end={65} suffix="+" label="Legal Experts in Network" />
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--serif)", fontSize: "clamp(20px, 2.6vw, 28px)", fontWeight: 600, color: "var(--ink)", lineHeight: 1 }}>
                    <span className="gold-text">20+</span>
                  </div>
                  <p style={{ fontFamily: "var(--mono)", fontSize: "9.5px", color: "var(--ink-5)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 10, lineHeight: 1.5 }}>Compliance Categories Managed</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--serif)", fontSize: "clamp(20px, 2.6vw, 28px)", fontWeight: 600, color: "var(--ink)", lineHeight: 1 }}>
                    <span className="gold-text">Pan India</span>
                  </div>
                  <p style={{ fontFamily: "var(--mono)", fontSize: "9.5px", color: "var(--ink-5)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 10, lineHeight: 1.5 }}>Multi-State Workflows</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--serif)", fontSize: "clamp(20px, 2.6vw, 28px)", fontWeight: 600, color: "var(--ink)", lineHeight: 1 }}>
                    <span className="gold-text">Fixed</span>
                  </div>
                  <p style={{ fontFamily: "var(--mono)", fontSize: "9.5px", color: "var(--ink-5)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 10, lineHeight: 1.5 }}>Monthly Plans. No Hourly Billing</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            FAQ
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
                  Everything you need to know about working with NyayMitra.
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
            FINAL CTA
        ═══════════════════════════════════════════════════════════════════════ */}
        <section aria-label="Call to action" className="section-pad" style={{ background: "var(--ink-9)", borderTop: "1px solid var(--ink-7)", borderBottom: "1px solid var(--ink-7)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 700, height: 500, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1, padding: "0 28px" }}>
            <Reveal>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", border: "1px solid var(--gold)", borderRadius: 100, marginBottom: 32, background: "var(--gold-pale)" }}>
                <Sparkles style={{ width: 11, height: 11, color: "var(--gold-dk)" }} />
                <span style={{ fontFamily: "var(--mono)", fontSize: "8.5px", color: "var(--gold-dk)", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500 }}>
                  Legal Operations Platform · India
                </span>
              </div>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(32px, 5.5vw, 58px)", fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.028em", lineHeight: 1.2, marginBottom: 18 }}>
                Stop Coordinating Legal.<br />
                <span className="gold-text" style={{ fontStyle: "italic", fontWeight: 300, display: "inline-block", lineHeight: 1.4, paddingTop: "0.1rem" }}>
                  Let Us Run It.
                </span>
              </h2>
              <p style={{ fontFamily: "var(--sans)", fontSize: "15px", color: "var(--ink-4)", lineHeight: 1.9, maxWidth: 540, margin: "0 auto 40px", fontWeight: 300 }}>
                NyayMitra gives your business a legal operations platform and a team behind it, coordinating advisors, tracking compliance, managing contracts and supporting disputes, while you run the business.
              </p>
              <div className="cta-row">
                <a href={waAssessment} target="_blank" rel="noopener noreferrer" className="btn btn-gold" style={{ gap: 10 }}>
                  <Sparkles style={{ width: 14, height: 14 }} />
                  Book a Free Walkthrough
                </a>
                <a href={waLegalOps} target="_blank" rel="noopener noreferrer" className="btn btn-ink" style={{ gap: 9 }}>
                  <Headset style={{ width: 14, height: 14 }} />
                  Talk to Legal Ops Team
                </a>
                <Link href="/startup-legal#pricing" className="btn btn-ghost" style={{ textDecoration: "none" }}>
                  <LayoutDashboard style={{ width: 14, height: 14 }} />
                  Explore Plans
                </Link>
              </div>
              <p style={{ fontFamily: "var(--sans)", fontSize: "11.5px", color: "var(--ink-5)", marginTop: 20, fontWeight: 300 }}>
                Free 15 minute walkthrough. We will map your legal needs and recommend the right plan.
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, marginTop: 28, flexWrap: "wrap" }}>
                {[
                  { icon: <Headset style={{ width: 10, height: 10 }} />, text: "Dedicated Legal Ops Team" },
                  { icon: <Zap style={{ width: 10, height: 10 }} />, text: "WhatsApp-first" },
                  { icon: <CheckCircle style={{ width: 10, height: 10 }} />, text: "Works with your CA & Lawyer" },
                  { icon: <Globe style={{ width: 10, height: 10 }} />, text: "Pan-India" },
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
              <div>
                <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 11, textDecoration: "none", marginBottom: 16 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Scale style={{ color: "var(--gold)", width: 15, height: 15 }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--serif)", fontSize: "18px", fontWeight: 600, color: "white", lineHeight: 1, letterSpacing: "-0.02em" }}>NyayMitra</div>
                  </div>
                </Link>
                <p style={{ fontFamily: "var(--sans)", fontSize: "12.5px", color: "rgba(255,255,255,0.35)", lineHeight: 1.75, maxWidth: 260, marginBottom: 22, fontWeight: 300 }}>
                  NyayMitra is a legal operations platform helping startups, MSMEs and growing businesses manage contracts, compliance, documentation and disputes through one workspace and a nationwide professional network.
                </p>
                <address style={{ fontStyle: "normal" }}>
                  {[
                    { icon: <MapPin style={{ width: 10, height: 10 }} />, text: "Koramangala, Bengaluru 560034, Karnataka" },
                    { icon: <Mail style={{ width: 10, height: 10 }} />, text: "support@mynyaymitra.in", href: "mailto:support@mynyaymitra.in" },
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
                  <SocialIcon href="https://www.instagram.com/mynyaymitra.in" icon={Instagram} label="Instagram" />
                  <SocialIcon href="https://www.linkedin.com/company/nyaymitra-tech-pvt-ltd" icon={Linkedin} label="LinkedIn" />
                </div>
              </div>

              <nav aria-label="Quick links">
                <div style={{ fontFamily: "var(--mono)", fontSize: "7.5px", fontWeight: 500, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 18 }}>Quick Links</div>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {[
                    { href: "/about", label: "About NyayMitra" },
                    { href: "/startup-legal", label: "Legal Ops Plans" },
                    { href: "/compliance", label: "Compliance Services" },
                    { href: "/lawyers", label: "Find Lawyers" },
                    { href: "/auth/signup", label: "Get Started" },
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

              <nav aria-label="Legal links">
                <div style={{ fontFamily: "var(--mono)", fontSize: "7.5px", fontWeight: 500, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 18 }}>Legal</div>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {[
                    { href: "/terms", label: "Terms of Service" },
                    { href: "/privacy-policy", label: "Privacy Policy" },
                    { href: "/cancellation", label: "Cancellation & Refund" },
                    { href: "/Shipping&DeliveryPolicy", label: "Shipping & Delivery" },
                    { href: "/contact", label: "Contact Us" },
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

              <div>
                <div style={{ fontFamily: "var(--mono)", fontSize: "7.5px", fontWeight: 500, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 18 }}>Get Started</div>
                <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "var(--radius-lg)", padding: "24px 22px", textAlign: "center" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                    <Headset style={{ color: "var(--gold)", width: 16, height: 16 }} />
                  </div>
                  <p style={{ fontFamily: "var(--serif)", fontSize: "14px", fontStyle: "italic", fontWeight: 300, color: "rgba(255,255,255,0.45)", marginBottom: 16, lineHeight: 1.6 }}>
                    Legal operations managed.<br />You focus on growth.
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
                    Book a Free Walkthrough
                  </a>
                </div>
              </div>
            </div>

            <div className="footer-bottom">
              <p style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em" }}>
                © 2026 NyayMitra Tech Pvt Ltd. All rights reserved.
              </p>
              <p className="footer-disclaimer" style={{ fontFamily: "var(--sans)", fontSize: "10.5px", color: "rgba(255,255,255,0.28)", lineHeight: 1.8, fontWeight: 300 }}>
                <span style={{ color: "rgba(192,57,43,0.9)", fontWeight: 600 }}>Disclaimer: </span>
                NyayMitra is a technology platform and not a law firm. Legal advice, filings and representation are delivered by independent qualified professionals, including advocates, CAs and CSs, in accordance with applicable laws and professional rules. No legal outcome is guaranteed.
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