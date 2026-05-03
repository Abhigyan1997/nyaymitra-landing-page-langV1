"use client"
import { useState, useEffect, useRef } from "react"
import {
  BarChart2, CalendarCheck, PenTool, IndianRupee, LogOut,
  User, Scale, MessageCircle, Star, Menu, X,
  ArrowRight, MapPin, Mail, PhoneCall, Sparkles, FileText,
  Bot, FileCheck, Stamp, CheckCircle, ArrowUpRight,
  Gavel, Clock, Zap, Shield, ThumbsUp,
  Instagram, Linkedin, ChevronDown,
} from "lucide-react"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import Head from "next/head"

/* ─── GLOBAL STYLES ─────────────────────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=DM+Mono:wght@400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --ink:        #0a0a0a;
      --ink-2:      #1a1a1a;
      --ink-3:      #3a3a3a;
      --ink-4:      #6b6b6b;
      --ink-5:      #9a9a9a;
      --ink-6:      #c8c8c8;
      --ink-7:      #e8e8e8;
      --ink-8:      #f4f3f0;
      --parchment:  #faf9f6;
      --white:      #ffffff;
      --gold:       #c9a84c;
      --gold-lt:    #e8c96a;
      --gold-dk:    #8b6914;
      --gold-pale:  #fdf6e3;
      --red:        #c0392b;
      --serif:      'Cormorant Garamond', 'Georgia', serif;
      --sans:       'DM Sans', system-ui, sans-serif;
      --mono:       'DM Mono', monospace;
    }

    html { scroll-behavior: smooth; }
    body {
      background: var(--white);
      color: var(--ink);
      font-family: var(--sans);
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }

    @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
    @keyframes pulse-ring {
      0%   { box-shadow: 0 0 0 0 rgba(201,168,76,0.5); }
      70%  { box-shadow: 0 0 0 10px rgba(201,168,76,0); }
      100% { box-shadow: 0 0 0 0 rgba(201,168,76,0); }
    }

    .reveal {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1),
                  transform 0.7s cubic-bezier(0.22,1,0.36,1);
      will-change: opacity, transform;
    }
    .reveal.is-on {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }

    .gold-shimmer {
      background: linear-gradient(100deg,var(--gold-dk) 0%,var(--gold) 30%,var(--gold-lt) 50%,var(--gold) 70%,var(--gold-dk) 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 4s linear infinite;
    }

    .mq-track { display:flex; width:max-content; animation: marquee 30s linear infinite; }
    .mq-track:hover { animation-play-state: paused; }

    .eyebrow {
      display: inline-flex; align-items: center; gap: 10px;
      font-family: var(--mono); font-size: 9.5px; font-weight: 500;
      letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold-dk);
    }
    .eyebrow::before, .eyebrow::after {
      content:''; width:22px; height:1px; background:var(--gold); flex-shrink:0;
    }

    .btn {
      display: inline-flex; align-items: center; justify-content: center;
      gap: 8px; font-family: var(--sans); font-size: 13px; font-weight: 600;
      letter-spacing: 0.03em; border-radius: 6px; padding: 13px 24px;
      cursor: pointer; border: none; text-decoration: none;
      transition: transform 0.22s cubic-bezier(0.4,0,0.2,1),
                  background 0.22s, box-shadow 0.22s, color 0.22s, border-color 0.22s;
      white-space: nowrap;
    }
    @media (max-width: 480px) {
      .btn { white-space: normal; text-align: center; padding: 12px 18px; font-size: 12px; }
    }
    .btn-ink   { background:var(--ink); color:var(--white); }
    .btn-ink:hover { background:var(--ink-2); transform:translateY(-2px); box-shadow:0 8px 28px rgba(0,0,0,0.18); }
    .btn-gold  { background:var(--gold); color:var(--ink); font-weight:700; text-transform:uppercase; letter-spacing:0.06em; animation:pulse-ring 3s ease-in-out infinite; }
    .btn-gold:hover { background:var(--gold-lt); transform:translateY(-2px); }
    .btn-ghost { background:transparent; color:var(--ink); border:1.5px solid var(--ink-7); }
    .btn-ghost:hover { background:var(--ink); color:var(--white); border-color:var(--ink); transform:translateY(-2px); }
    .btn-wa    { background:#f0faf5; color:#15803d; border:1.5px solid #bbf7d0; }
    .btn-wa:hover { background:#dcfce7; transform:translateY(-2px); }
    .btn-gw    { background:transparent; color:rgba(255,255,255,0.75); border:1px solid rgba(255,255,255,0.2); }
    .btn-gw:hover { background:rgba(255,255,255,0.07); color:white; border-color:rgba(255,255,255,0.35); transform:translateY(-2px); }

    .card {
      background:var(--white); border:1px solid var(--ink-7); border-radius:14px;
      transition: transform 0.28s cubic-bezier(0.22,1,0.36,1),
                  box-shadow 0.28s cubic-bezier(0.22,1,0.36,1),
                  border-color 0.28s;
    }
    .card:hover { transform:translateY(-4px); box-shadow:0 20px 56px rgba(0,0,0,0.08); border-color:var(--ink-6); }
    .card-ink { background:var(--ink); border-color:transparent; }

    .nav-link {
      font-family:var(--sans); font-size:13px; font-weight:500;
      color:var(--ink-4); text-decoration:none; padding:8px 13px;
      border-radius:5px; transition:all 0.18s; letter-spacing:0.01em;
    }
    .nav-link:hover { color:var(--ink); background:var(--ink-8); }

    .faq-row { border-top:1px solid var(--ink-7); }
    .faq-row:last-child { border-bottom:1px solid var(--ink-7); }
    .faq-btn {
      width:100%; display:flex; align-items:center; justify-content:space-between;
      padding:22px 0; background:none; border:none; cursor:pointer; gap:20px; text-align:left;
    }
    @media (max-width: 540px) {
      .faq-btn { gap: 12px; padding: 18px 0; }
      .faq-btn span { font-size: 15px !important; }
    }

    .trust-pill {
      display:inline-flex; align-items:center; gap:10px;
      padding:9px 22px; border:1px solid var(--ink-7); border-radius:100px;
      margin:0 8px; white-space:nowrap; background:var(--white);
    }
    @media (max-width: 480px) {
      .trust-pill { padding: 6px 14px; gap: 6px; margin: 0 4px; }
      .trust-pill span:first-child { font-size: 12px; }
      .trust-pill span:last-child { font-size: 9px; }
    }

    .step-ghost {
      position:absolute; top:-10px; left:20px;
      font-family:var(--serif); font-size:90px; font-weight:700; line-height:1;
      color:transparent; -webkit-text-stroke:1px var(--ink-7);
      pointer-events:none; user-select:none; z-index:0;
    }
    @media (max-width: 768px) {
      .step-ghost { font-size: 70px; top: -5px; left: 16px; }
    }

    .stat-block { text-align:center; padding:32px 20px; }
    @media (max-width: 640px) { .stat-block { padding: 24px 16px; } }

    ::-webkit-scrollbar { width:5px; }
    ::-webkit-scrollbar-track { background:var(--parchment); }
    ::-webkit-scrollbar-thumb { background:var(--ink-6); border-radius:3px; }

    /* ========== FULLY RESPONSIVE ========== */
    .mob-btn { display: none !important; }
    .desk-nav { display: flex; }
    .mobile-menu-panel { display: none; }

    @media (max-width: 768px) {
      .mob-btn { display: flex !important; }
      .desk-nav { display: none !important; }
      .desk-social { display: none !important; }
      .mobile-menu-panel { display: block; }
    }

    .hero-grid {
      display: grid;
      grid-template-columns: 1fr 400px;
      gap: 64px;
      align-items: center;
    }
    .hero-card-col { display: block; }
    @media (max-width: 1024px) {
      .hero-grid { grid-template-columns: 1fr; gap: 48px; }
      .hero-card-col { display: block; }
    }

    .step-grid {
      display: grid;
      grid-template-columns: repeat(3,1fr);
      gap: 0;
    }
    @media (max-width: 768px) {
      .step-grid { grid-template-columns: 1fr; }
      .step-cell { border-right:none !important; border-bottom:1px solid var(--ink-7) !important; }
      .step-cell:last-child { border-bottom:none !important; }
      .step-cell { padding: 40px 24px 32px !important; }
    }

    .svc-grid {
      display: grid;
      grid-template-columns: 5fr 4fr;
      gap: 20px;
      align-items: start;
    }
    @media (max-width: 900px) {
      .svc-grid { grid-template-columns: 1fr; gap: 24px; }
    }

    .why-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      align-items: start;
    }
    @media (max-width: 900px) {
      .why-grid { grid-template-columns: 1fr; gap: 48px; }
    }

    .feat-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    @media (max-width: 560px) {
      .feat-grid { grid-template-columns: 1fr; gap: 12px; }
    }

    .prob-grid {
      display: grid;
      grid-template-columns: repeat(4,1fr);
      gap: 0;
    }
    @media (max-width: 900px) {
      .prob-grid { grid-template-columns: 1fr 1fr; }
      .prob-cell { border-right:none !important; border-bottom:1px solid rgba(255,255,255,0.06) !important; }
      .prob-cell { padding: 30px 20px !important; }
    }
    @media (max-width: 540px) {
      .prob-grid { grid-template-columns: 1fr; }
    }

    .test-grid {
      display: grid;
      grid-template-columns: repeat(3,1fr);
      gap: 20px;
    }
    @media (max-width: 900px) { 
      .test-grid { grid-template-columns: 1fr; gap: 16px; }
    }

    .stat-grid {
      display: grid;
      grid-template-columns: repeat(4,1fr);
    }
    @media (max-width: 640px) {
      .stat-grid { grid-template-columns: 1fr 1fr; }
      .stat-block { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.07); }
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 2.2fr 1fr 1fr 1.2fr;
      gap: 48px;
    }
    @media (max-width: 960px) {
      .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
    }
    @media (max-width: 640px) {
      .footer-grid { grid-template-columns: 1fr; gap: 32px; text-align: center; }
      .footer-grid > div { display: flex; flex-direction: column; align-items: center; text-align: center; }
      .footer-grid address div { justify-content: center; }
      .footer-grid ul { text-align: center; }
      .footer-grid .btn, .footer-grid a { justify-content: center; }
    }

    .hero-stats { display:flex; align-items:center; flex-wrap:wrap; gap:0; }
    @media (max-width: 540px) {
      .hero-stats { gap: 16px; justify-content: space-between; }
      .hero-stats-sep { display:none !important; }
      .hero-stats > div { flex: 1; min-width: 90px; }
      .hero-stats > div div:first-child { font-size: 24px !important; }
    }

    .hero-ctas { display:flex; flex-wrap:wrap; gap:10px; }
    @media (max-width: 540px) {
      .hero-ctas { flex-direction:column; }
      .hero-ctas .btn { width:100%; justify-content:center; }
    }

    .cta-btns { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }
    @media (max-width: 540px) {
      .cta-btns { flex-direction:column; align-items:center; }
      .cta-btns .btn { width:100%; max-width:280px; justify-content:center; }
    }

    .section-pad { padding: 100px 28px; }
    @media (max-width: 768px) { .section-pad { padding: 64px 20px; } }
    @media (max-width: 480px) { .section-pad { padding: 48px 16px; } }

    .nav-container {
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 66px;
    }
    @media (max-width: 640px) {
      .nav-container { padding: 0 16px; }
    }

    /* Services card fixes */
    .svc-card-content {
      transition: all 0.2s ease;
    }
    @media (max-width: 900px) {
      .svc-card-content { flex-direction: column; align-items: flex-start !important; gap: 12px !important; }
      .svc-card-content .svc-right { width: 100%; flex-direction: row; justify-content: space-between; align-items: center; margin-top: 8px; }
    }
    @media (max-width: 480px) {
      .svc-card-content { padding: 18px !important; }
      .svc-card-content .svc-icon { width: 36px; height: 36px; }
      .svc-card-content h3 { font-size: 15px !important; }
      .svc-card-content p { font-size: 11px !important; white-space: normal !important; }
    }

    /* Featured service card responsive */
    @media (max-width: 640px) {
      .featured-card { padding: 28px 20px !important; }
      .featured-card h3 { font-size: 24px !important; }
      .featured-card .tags { gap: 6px; }
      .featured-card .tags span { font-size: 7px !important; padding: 3px 8px !important; }
      .featured-card .meta { gap: 12px; flex-wrap: wrap; }
    }

    /* Hero card responsive */
    @media (max-width: 640px) {
      .hero-card-inner { padding: 20px !important; }
      .hero-card-steps { padding: 14px 18px !important; }
      .hero-card-steps .step-icon { width: 32px; height: 32px; }
      .hero-card-steps .step-title { font-size: 11px !important; }
      .hero-card-steps .step-desc { font-size: 10px !important; }
      .floating-badge-1 { bottom: -10px; left: -10px !important; padding: 6px 12px !important; font-size: 9px !important; }
      .floating-badge-2 { top: -10px; right: -10px !important; padding: 5px 10px !important; font-size: 8px !important; }
    }

    /* Stat blocks */
    @media (max-width: 640px) {
      .stat-block .stat-value { font-size: 28px !important; }
    }

    /* Footer fixes */
    @media (max-width: 640px) {
      footer { padding: 48px 20px 32px !important; }
      .footer-disclaimer { text-align: center !important; margin-top: 16px; }
      .footer-copyright { text-align: center !important; width: 100%; }
      .footer-bottom { flex-direction: column; align-items: center; gap: 12px; }
    }

    /* Floating WhatsApp */
    @media (max-width: 480px) {
      .floating-wa { bottom: 20px; right: 20px; width: 48px; height: 48px; }
      .floating-wa svg { width: 22px; height: 22px; }
    }
  `}</style>
)

/* ─── CONTENT ───────────────────────────────────────────────────────────────── */
const content = {
  en: {
    nav: { home: "Home", services: "Services", lawyers: "Find Lawyers", legalGPT: "Legal GPT", about: "About", contact: "Contact", login: "Login", signup: "Sign Up" },
    profileMenu: { profile: "My Profile", dashboard: "My Dashboard", bookings: "My Bookings", logout: "Logout" },
    langToggle: "हि", langSwitchMobile: "हिंदी में देखें",
    hero: {
      badge: "100+ Indians Helped",
      titleStatic: "Your Legal Problem,",
      titleAccents: ["Solved Today.", "Resolved Fast.", "In Your Hands."],
      description: "FIR, property disputes, family matters understand your rights instantly and connect with verified lawyers in minutes. Serving Patna, Lucknow, Indore, Jaipur, Ranchi & across India.",
      ctaPrimary: "Talk to Legal AI", ctaSecondary: "Find a Lawyer", ctaWhatsapp: "Chat on WhatsApp",
      whatsappNumber: "919661644025",
      cardTitle: "How It Works",
      cardSteps: [
        { n: "01", title: "Tell your problem", desc: "Describe your issue in Hindi or English" },
        { n: "02", title: "Get instant guidance", desc: "AI advice based on Indian law" },
        { n: "03", title: "Talk to a lawyer", desc: "Book verified experts when needed" },
      ],
      cardFooter: "Available 24/7 · Zero hidden costs",
      stats: [{ value: "25+", label: "Cases Resolved" }, { value: "60+", label: "Expert Lawyers" }, { value: "99.9%", label: "Success Rate" }, { value: "<30m", label: "Response Time" }],
    },
    trustBar: [{ label: "Verified Lawyers", value: "60+" }, { label: "Happy Clients", value: "25+" }, { label: "Avg Response", value: "< 2 min" }, { label: "Client Rating", value: "4.9 ★" }, { label: "Affidavits Delivered", value: "20+" }, { label: "Cities Served", value: "10+" }],
    howItWorks: {
      eyebrow: "Process", title: "Three steps to resolution",
      steps: [
        { n: "01", title: "Tell your problem", desc: "Describe your legal issue in simple Hindi or English no jargon needed.", icon: "file" },
        { n: "02", title: "Get free guidance", desc: "Understand instantly what steps you should take, backed by Indian law.", icon: "bot" },
        { n: "03", title: "Talk to a lawyer", desc: "Book a background verified lawyer if you need professional representation.", icon: "thumb" },
      ],
    },
    services: {
      eyebrow: "Our Services", title: "Legal help, every kind", subtitle: "Comprehensive solutions for your legal needs", allServices: "View all services",
      featured: {
        badge: "Most Popular",
        title: "Affidavit Online India",
        desc: "Get legally valid affidavits drafted, reviewed by experts, and delivered in hours. Address proof, name change, income declaration, property all covered.",
        tags: ["Address Proof", "Name Change", "Income Declaration", "Property", "Identity"],
        meta: ["2–4 hour delivery", "Lawyer reviewed", "From ₹999"],
      },
      cards: [
        { title: "Legal AI Chat", desc: "Trained on Indian law. Ask about FIR, property, family, consumer rights instant answers 24/7.", footer: "Free to start", href: "/legal-gpt" },
        { title: "Find Lawyers", desc: "Browse 60+ verified lawyers by specialization. Book consultations with real time availability.", footer: "< 30 min response", href: "/lawyers" },
        { title: "Document Generator", desc: "Create rent agreements, legal notices, complaints using AI-powered forms in minutes.", footer: "Instant download", href: "/services" },
      ],
    },
    whyUs: {
      eyebrow: "Why NyayMitra", title: "Built for Bharat,", titleLine2: "not for boardrooms",
      desc: "Legal help in India has always been expensive, confusing, and inaccessible. NyayMitra changes that plain language, transparent pricing, and real lawyers on demand.",
      quote: '"Legal aid is not a privilege. It is the foundation of a just society."',
      quoteAttr: "— NyayMitra Founding Principle",
      cta: "Try for free",
      features: [
        { n: "01", title: "Transparent Pricing", desc: "No surprise charges. Fixed, upfront rates for every service we offer." },
        { n: "02", title: "Always Available", desc: "AI on WhatsApp, call, or web 24 hours a day, 7 days a week." },
        { n: "03", title: "Verified Lawyers", desc: "Every lawyer is background checked and bar council enrolled." },
        { n: "04", title: "Plain Language", desc: "No legal jargon. Complex law explained simply for every Indian." },
      ],
    },
    problems: {
      eyebrow: "We solve these every day", title: "Common Legal Problems",
      items: [
        { title: "FIR Not Registered", desc: "Understand your rights and compel action from authorities.", emoji: "📋" },
        { title: "Property Dispute", desc: "Protect your ownership, boundaries and land records.", emoji: "🏠" },
        { title: "Divorce & Family", desc: "Expert guidance on custody, alimony and settlements.", emoji: "👨‍👩‍👧" },
        { title: "Online Fraud", desc: "Recover lost money and file cyber crime complaints.", emoji: "🔒" },
      ],
    },
    testimonials: {
      eyebrow: "Client Stories", title: "Trusted across India", verified: "Verified",
      items: [
        { name: "Swapnil Anand", location: "Bhagalpur, Bihar", avatar: "SA", rating: 5, text: "Their remote notary service saved me a court trip. Needed an affidavit urgently NyayMitra handled everything, notarized and home delivered in 2 days without any hassle." },
        { name: "Anand Upadhyay", location: "Indore, MP", avatar: "AU", rating: 4, text: "Facing delayed salary issues. Through NyayMitra I connected with a lawyer instantly who guided me on the right steps and helped resolve the situation effectively." },
        { name: "Dinesh Chand", location: "Gurgaon, Haryana", avatar: "DC", rating: 5, text: "Got a challan in Delhi and was unsure about the process. NyayMitra gave quick, clear guidance I understood exactly what to do without any confusion at all." },
      ],
    },
    faq: {
      eyebrow: "Frequently Asked", title: "Legal questions, answered simply",
      subtitle: "Everything you need to know before getting legal help",
      items: [
        { q: "How do I file an FIR online in India?", a: "In India, you can file an FIR at your nearest police station. If the police refuse, you can send a written complaint to the Superintendent of Police. Many states like UP, Bihar, Maharashtra, and Delhi offer e-FIR services. NyayMitra's Legal AI guides you step by step in Hindi or English, 24/7." },
        { q: "What is an affidavit and when do I need one?", a: "An affidavit is a sworn written statement legally binding in Indian courts and government offices. You need one for address proof, name change, income declaration, property matters, and passport applications. NyayMitra delivers notarized affidavits starting at ₹999 within 2–4 hours." },
        { q: "How much does a lawyer consultation cost on NyayMitra?", a: "Initial AI-powered legal guidance is completely free. Paid lawyer consultations start from ₹150 for a 15-minute session. There are no hidden charges the price you see is the price you pay." },
        { q: "Are the lawyers on NyayMitra verified and legitimate?", a: "Yes. Every lawyer is verified through Bar Council enrollment number, practice certificate, and professional background checks. We have 60+ verified lawyers covering civil, criminal, family, property, consumer rights, labour, and cyber crime law." },
        { q: "Can I get legal help in Hindi on NyayMitra?", a: "Absolutely. NyayMitra is built for Bharat our Legal AI, services, and consultations are available in both Hindi and English." },
        { q: "What types of legal problems can NyayMitra help with?", a: "NyayMitra covers FIR registration, property disputes, divorce, consumer complaints, online fraud, labour disputes, rent agreements, legal notices, and affidavit creation." },
        { q: "Is NyayMitra a law firm?", a: "No. NyayMitra is a technology platform connecting people with verified legal professionals. AI guidance is for informational purposes. For formal representation, you'll be connected with a licensed advocate." },
        { q: "Which cities does NyayMitra serve?", a: "NyayMitra serves all of India online. Strong presence in Patna, Lucknow, Indore, Jaipur, Ranchi, Bengaluru, Delhi, Mumbai, Hyderabad, and Kolkata." },
      ],
    },
    cta: {
      title: "Ready to solve your legal problem?",
      subtitle: "Join thousands of Indians who trust NyayMitra. Free AI consultation, verified lawyers, transparent pricing all in one place.",
      primary: "Start Free Consultation", secondary: "Browse Lawyers",
    },
    footer: {
      company: "NyayMitra", tagline: "Making legal help accessible to every Indian",
      quickLinks: "Quick Links", legal: "Legal",
      address: "Koramangala, Bengaluru - 560034, Karnataka, India",
      email: "support@nyaymitra.tech", phone: "+91 79705 96183",
      privacy: "Privacy Policy", terms: "Terms of Service",
      deliveryPolicy: "Shipping & Delivery", about: "About NyayMitra",
      affidavit: "Affidavit Online", signup: "Sign Up",
      cancellation: "Cancellation & Refund", contact: "Contact Us",
      copyright: "All rights reserved.",
      disclaimerLabel: "Disclaimer:",
      disclaimer: "NyayMitra is a technology platform. We do not act as a law firm. All consultations and notary services are delivered by licensed third-party professionals.",
      followUs: "Follow Us",
    },
    social: { instagram: "https://www.instagram.com/nyaymitra.tech", linkedin: "https://www.linkedin.com/company/nyaymitra-tech-pvt-ltd" },
  },
  hi: {
    nav: { home: "होम", services: "सेवाएं", lawyers: "वकील खोजें", legalGPT: "लीगल GPT", about: "हमारे बारे में", contact: "संपर्क", login: "लॉगिन", signup: "साइन अप" },
    profileMenu: { profile: "मेरी प्रोफ़ाइल", dashboard: "मेरा डैशबोर्ड", bookings: "मेरी बुकिंग्स", logout: "लॉगआउट" },
    langToggle: "EN", langSwitchMobile: "View in English",
    hero: {
      badge: "100+ भारतीयों की मदद",
      titleStatic: "आपकी कानूनी समस्या,",
      titleAccents: ["आज हल होगी।", "जल्दी सुलझेगी।", "आपके हाथ में।"],
      description: "FIR, संपत्ति विवाद, पारिवारिक मामले तुरंत अपने अधिकार समझें और मिनटों में सत्यापित वकील से जुड़ें। पटना, लखनऊ, इंदौर, जयपुर, रांची और पूरे भारत में।",
      ctaPrimary: "लीगल AI से बात करें", ctaSecondary: "वकील खोजें", ctaWhatsapp: "व्हाट्सऐप पर बात करें",
      whatsappNumber: "919661644025",
      cardTitle: "यह कैसे काम करता है",
      cardSteps: [
        { n: "01", title: "समस्या बताएं", desc: "हिंदी या अंग्रेज़ी में समस्या बताएं" },
        { n: "02", title: "तुरंत मार्गदर्शन पाएं", desc: "भारतीय कानून पर आधारित AI सलाह" },
        { n: "03", title: "वकील से जुड़ें", desc: "सत्यापित विशेषज्ञ बुक करें" },
      ],
      cardFooter: "24/7 उपलब्ध · कोई छुपा शुल्क नहीं",
      stats: [{ value: "25+", label: "मामले हल" }, { value: "60+", label: "विशेषज्ञ वकील" }, { value: "99.9%", label: "सफलता दर" }, { value: "<30मि", label: "जवाब समय" }],
    },
    trustBar: [{ label: "सत्यापित वकील", value: "60+" }, { label: "संतुष्ट ग्राहक", value: "25+" }, { label: "औसत जवाब", value: "< 2 मिनट" }, { label: "रेटिंग", value: "4.9 ★" }, { label: "शपथपत्र", value: "200+" }, { label: "शहर", value: "10+" }],
    howItWorks: {
      eyebrow: "प्रक्रिया", title: "तीन स्टेप में समाधान",
      steps: [
        { n: "01", title: "समस्या बताएं", desc: "अपनी कानूनी समस्या हिंदी या अंग्रेज़ी में बताएं।", icon: "file" },
        { n: "02", title: "मुफ्त मार्गदर्शन पाएं", desc: "तुरंत समझें कि आपको क्या करना चाहिए।", icon: "bot" },
        { n: "03", title: "वकील से बात करें", desc: "जरूरत हो तो सत्यापित वकील से सीधे बात करें।", icon: "thumb" },
      ],
    },
    services: {
      eyebrow: "हमारी सेवाएं", title: "हर तरह की कानूनी मदद", subtitle: "आपकी जरूरतों के लिए व्यापक समाधान", allServices: "सभी सेवाएं देखें",
      featured: { badge: "सबसे लोकप्रिय", title: "ऑनलाइन शपथपत्र", desc: "विशेषज्ञों द्वारा समीक्षित कानूनी रूप से वैध शपथपत्र घंटों में पाएं।", tags: ["पते का प्रमाण", "नाम परिवर्तन", "आय घोषणा", "संपत्ति", "पहचान"], meta: ["2–4 घंटे में डिलीवरी", "वकील द्वारा जांचा गया", "₹999 से शुरू"] },
      cards: [
        { title: "लीगल AI चैट", desc: "भारतीय कानून पर प्रशिक्षित। FIR, संपत्ति, परिवार — 24/7 तुरंत जवाब।", footer: "मुफ्त में शुरू करें", href: "/legal-gpt" },
        { title: "वकील खोजें", desc: "60+ सत्यापित वकीलों को ब्राउज़ करें। रीयल-टाइम बुकिंग।", footer: "< 30 मिनट जवाब", href: "/lawyers" },
        { title: "दस्तावेज़ जनरेटर", desc: "AI फॉर्म से किराया समझौते, कानूनी नोटिस मिनटों में।", footer: "तुरंत डाउनलोड", href: "/services" },
      ],
    },
    whyUs: {
      eyebrow: "हम क्यों", title: "भारत के लिए बना,", titleLine2: "बड़े दफ्तरों के लिए नहीं",
      desc: "NyayMitra बदलाव लाता है — सरल भाषा, पारदर्शी मूल्य, और मांग पर असली वकील।",
      quote: '"कानूनी मदद विशेषाधिकार नहीं — यह न्यायपूर्ण समाज की नींव है।"',
      quoteAttr: "— न्यायमित्र संस्थापक सिद्धांत",
      cta: "मुफ्त में आज़माएं",
      features: [
        { n: "01", title: "पारदर्शी मूल्य", desc: "कोई छुपा शुल्क नहीं। हर सेवा की तय दर।" },
        { n: "02", title: "हमेशा उपलब्ध", desc: "व्हाट्सऐप, कॉल या वेब पर 24/7।" },
        { n: "03", title: "सत्यापित वकील", desc: "हर वकील बार काउंसिल में नामांकित।" },
        { n: "04", title: "सरल भाषा", desc: "कोई जटिल शब्द नहीं। कानून सबके लिए आसान।" },
      ],
    },
    problems: {
      eyebrow: "हम रोज़ इन समस्याओं को हल करते हैं", title: "सामान्य कानूनी समस्याएं",
      items: [
        { title: "FIR दर्ज नहीं हो रही", desc: "अपने अधिकार समझें और सही कदम उठाएं।", emoji: "📋" },
        { title: "संपत्ति विवाद", desc: "मालिकाना हक और सीमाओं की रक्षा करें।", emoji: "🏠" },
        { title: "तलाक / परिवार", desc: "कस्टडी और सेटलमेंट पर सही मार्गदर्शन।", emoji: "👨‍👩‍👧" },
        { title: "ऑनलाइन धोखाधड़ी", desc: "पैसे वापस पाने में मदद।", emoji: "🔒" },
      ],
    },
    testimonials: {
      eyebrow: "क्लाइंट स्टोरीज़", title: "पूरे भारत में भरोसेमंद", verified: "सत्यापित",
      items: [
        { name: "स्वप्निल आनंद", location: "भागलपुर, बिहार", avatar: "SA", rating: 5, text: "2 दिनों में नोटरीकृत और घर पहुंचा दिया बिना किसी परेशानी के। शानदार सेवा।" },
        { name: "आनंद उपाध्याय", location: "इंदौर, एमपी", avatar: "AU", rating: 4, text: "NyayMitra के माध्यम से तुरंत वकील से जुड़ा और वेतन विवाद सुलझ गया।" },
        { name: "दिनेश चंद", location: "गुड़गांव, हरियाणा", avatar: "DC", rating: 5, text: "दिल्ली में चालान मिला न्यायमित्र ने त्वरित मार्गदर्शन दिया, बिना किसी भ्रम के।" },
      ],
    },
    faq: {
      eyebrow: "अक्सर पूछे जाने वाले सवाल", title: "कानूनी सवाल, आसान जवाब",
      subtitle: "कानूनी मदद लेने से पहले जो जानना जरूरी है",
      items: [
        { q: "भारत में FIR ऑनलाइन कैसे दर्ज करें?", a: "पुलिस स्टेशन में या e-FIR पोर्टल पर। NyayMitra का Legal AI 24/7 हिंदी में मार्गदर्शन करता है।" },
        { q: "शपथपत्र क्या होता है और कब जरूरी होता है?", a: "₹999 से शुरू, 2-4 घंटे में नोटरी शपथपत्र पते का प्रमाण, नाम परिवर्तन, आय घोषणा सब।" },
        { q: "NyayMitra पर वकील परामर्श की कीमत?", a: "AI मार्गदर्शन बिल्कुल मुफ्त। वकील परामर्श ₹150 से शुरू। कोई छुपा शुल्क नहीं।" },
        { q: "NyayMitra के वकील कितने विश्वसनीय हैं?", a: "60+ सत्यापित वकील Bar Council verified, practice certificate जांचा गया।" },
        { q: "क्या NyayMitra पर हिंदी में मदद मिलती है?", a: "बिल्कुल Legal AI चैट, सेवाएं और परामर्श हिंदी और अंग्रेज़ी दोनों में।" },
        { q: "NyayMitra किन समस्याओं में मदद करता है?", a: "FIR, संपत्ति, तलाक, उपभोक्ता शिकायत, ऑनलाइन धोखाधड़ी, वेतन विवाद, शपथपत्र सभी में।" },
        { q: "क्या NyayMitra एक law firm है?", a: "नहीं — यह एक technology platform है जो लोगों को verified lawyers से जोड़ता है।" },
        { q: "NyayMitra किन शहरों में सेवा देता है?", a: "पूरे भारत में ऑनलाइन। पटना, लखनऊ, दिल्ली, मुंबई सहित 10+ शहरों में मजबूत उपस्थिति।" },
      ],
    },
    cta: { title: "अपनी कानूनी समस्या हल करने के लिए तैयार हैं?", subtitle: "मुफ्त AI परामर्श, सत्यापित वकील, पारदर्शी मूल्य सब एक जगह।", primary: "मुफ्त परामर्श शुरू करें", secondary: "वकील देखें" },
    footer: { company: "न्यायमित्र", tagline: "हर भारतीय के लिए कानूनी सहायता को सुलभ बनाना", quickLinks: "त्वरित लिंक", legal: "कानूनी", address: "कोरामंगला, बेंगलुरु - 560034, कर्नाटक, भारत", email: "support@nyaymitra.tech", phone: "+91 79705 96183", privacy: "गोपनीयता नीति", terms: "सेवा की शर्तें", deliveryPolicy: "शिपिंग और डिलीवरी", about: "न्यायमित्र के बारे में", affidavit: "ऑनलाइन शपथपत्र", signup: "साइन अप", cancellation: "रद्दीकरण और धनवापसी", contact: "संपर्क करें", copyright: "सर्वाधिकार सुरक्षित।", disclaimerLabel: "अस्वीकरण:", disclaimer: "NyayMitra एक प्रौद्योगिकी मंच है। हम कानूनी फर्म नहीं हैं।", followUs: "फॉलो करें" },
    social: { instagram: "https://www.instagram.com/nyaymitra.tech", linkedin: "https://www.linkedin.com/company/nyaymitra-tech-pvt-ltd" },
  },
}

/* ─── TYPEWRITER ─────────────────────────────────────────────────────────────── */
function useTypewriter(words: string[], interval = 2600) {
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState<"in" | "hold" | "out">("hold")
  useEffect(() => { setIdx(0); setPhase("hold") }, [words.join("|")])
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    if (phase === "hold") t = setTimeout(() => setPhase("out"), interval - 400)
    else if (phase === "out") t = setTimeout(() => { setIdx(i => (i + 1) % words.length); setPhase("in") }, 320)
    else t = setTimeout(() => setPhase("hold"), 360)
    return () => clearTimeout(t)
  }, [phase, idx])
  return {
    word: words[idx],
    style: {
      opacity: phase === "out" ? 0 : 1,
      transform: phase === "in" ? "translateY(0)" : phase === "out" ? "translateY(-10px)" : "translateY(0)",
      transition: "opacity 0.3s ease, transform 0.3s ease",
    } as React.CSSProperties,
  }
}

/* ─── ONE-WAY REVEAL ────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const tid = setTimeout(() => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add("is-on")
            obs.disconnect()
          }
        },
        { threshold: 0.07, rootMargin: "0px 0px -24px 0px" }
      )
      obs.observe(el)
      return () => obs.disconnect()
    }, 60)
    return () => clearTimeout(tid)
  }, [])
  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

/* ─── ATOMS ──────────────────────────────────────────────────────────────────── */
const WaSvg = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size, flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.677-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.897 6.994c-.004 5.45-4.437 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.181-1.24-6.162-3.495-8.411" />
  </svg>
)

const SocialIcon = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
    style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", border: "1px solid var(--ink-7)", color: "var(--ink-5)", textDecoration: "none", transition: "all 0.2s", flexShrink: 0 }}
    onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.borderColor = "var(--ink-5)"; a.style.color = "var(--ink-2)"; a.style.background = "var(--ink-8)" }}
    onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.borderColor = "var(--ink-7)"; a.style.color = "var(--ink-5)"; a.style.background = "" }}>
    <Icon style={{ width: 13, height: 13 }} />
  </a>
)

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="faq-row">
      <button className="faq-btn" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span style={{ fontFamily: "var(--serif)", fontSize: "17px", fontWeight: 600, color: "var(--ink-2)", lineHeight: 1.4 }}>{q}</span>
        <div style={{ width: 28, height: 28, borderRadius: "50%", border: "1px solid var(--ink-7)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.28s", background: open ? "var(--ink)" : "transparent" }}>
          <ChevronDown style={{ width: 13, height: 13, color: open ? "white" : "var(--gold-dk)", transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.28s" }} />
        </div>
      </button>
      <div style={{ maxHeight: open ? "400px" : "0", overflow: "hidden", transition: "max-height 0.44s cubic-bezier(0.22,1,0.36,1)" }}>
        <p style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "var(--ink-4)", lineHeight: 1.85, paddingBottom: 22, maxWidth: 680 }}>{a}</p>
      </div>
    </div>
  )
}

interface Profile { id: string; name: string; email: string; role: "lawyer" | "user"; avatar?: string; phoneNumber?: string }

/* ─── MAIN PAGE ──────────────────────────────────────────────────────────────── */
export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [lang, setLang] = useState<"en" | "hi">("en")
  const [loggedIn, setLoggedIn] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const t = content[lang]
  const { word: accentWord, style: accentStyle } = useTypewriter(t.hero.titleAccents)

  useEffect(() => {
    setMounted(true)
    setLoggedIn(!!localStorage.getItem("token"))
    try { const s = localStorage.getItem("userProfile"); if (s) setProfile(JSON.parse(s)) } catch { }
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!mounted) return null

  const navLinks = Object.entries(t.nav).filter(([k]) => !["login", "signup"].includes(k))
  const navHref = (key: string) => key === "home" ? "/" : key === "legalGPT" ? "/legal-ai" : `/${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`
  const waUrl = `https://wa.me/${t.hero.whatsappNumber}?text=${encodeURIComponent("I need help with my legal issue")}`

  const stepIcon = (icon: string) =>
    icon === "file" ? <FileCheck style={{ width: 22, height: 22 }} /> :
      icon === "bot" ? <Bot style={{ width: 22, height: 22 }} /> :
        <ThumbsUp style={{ width: 22, height: 22 }} />

  const svcIcons = [
    <Bot style={{ width: 18, height: 18 }} />,
    <Gavel style={{ width: 18, height: 18 }} />,
    <FileText style={{ width: 18, height: 18 }} />,
  ]

  return (
    <>
      <GlobalStyles />
      <Head>
        <title>NyayMitra – Online Legal Help India | Lawyers & Affidavit</title>
        <meta name="description" content="Instant legal help in India — AI guidance, verified lawyers, affidavits. Hindi & English. Serving Patna, Lucknow, Indore & all India." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="canonical" href="https://nyaymitra.tech" />
      </Head>

      <div style={{ minHeight: "100vh", background: "var(--white)", color: "var(--ink)" }}>

        {/* Announcement Bar */}
        <div style={{ background: "var(--ink)", color: "white", textAlign: "center", padding: "9px 16px", fontSize: "11px", fontFamily: "var(--mono)", letterSpacing: "0.1em" }}>
          🇮🇳&nbsp; Free AI Legal Guidance in Hindi & English &nbsp;·&nbsp; 24/7 &nbsp;·&nbsp;
          <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)", textDecoration: "none", fontWeight: 600 }}>WhatsApp Now →</a>
        </div>

        {/* Enhanced Navbar */}
        <nav style={{
          position: "sticky", top: 0, zIndex: 100,
          background: scrolled ? "rgba(255,255,255,0.96)" : "var(--white)",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: "1px solid var(--ink-7)",
          boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.06)" : "none",
          transition: "background 0.3s, box-shadow 0.3s",
        }}>
          <div className="nav-container">
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none", flexShrink: 0 }}>
              <div style={{ width: 38, height: 38, background: "var(--ink)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.18)", flexShrink: 0 }}>
                <Scale style={{ color: "white", width: 17, height: 17 }} />
              </div>
              <div>
                <div style={{ fontFamily: "var(--serif)", fontSize: "19px", fontWeight: 700, color: "var(--ink)", lineHeight: 1, letterSpacing: "-0.01em" }}>{t.footer.company}</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: "7px", color: "var(--gold-dk)", letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 1 }}>Legal Tech · India</div>
              </div>
            </Link>

            <div className="desk-nav" style={{ alignItems: "center", gap: 2 }}>
              {navLinks.map(([key, val]) => (
                <Link key={key} href={navHref(key)} className="nav-link">{val}</Link>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <div className="desk-social desk-nav" style={{ alignItems: "center", gap: 6 }}>
                <SocialIcon href={t.social.instagram} icon={Instagram} label="Instagram" />
                <SocialIcon href={t.social.linkedin} icon={Linkedin} label="LinkedIn" />
                <div style={{ width: 1, height: 18, background: "var(--ink-7)", margin: "0 2px" }} />
              </div>

              <button onClick={() => setLang(l => l === "en" ? "hi" : "en")}
                style={{ width: 33, height: 33, borderRadius: "50%", border: "1.5px solid var(--ink-7)", background: "none", cursor: "pointer", fontFamily: "var(--mono)", fontSize: "9.5px", fontWeight: 700, color: "var(--ink-5)", transition: "all 0.18s", flexShrink: 0 }}
                aria-label="Switch language">
                {t.langToggle}
              </button>

              {loggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--ink-8)", border: "1px solid var(--ink-7)", borderRadius: 100, padding: "5px 14px 5px 5px", cursor: "pointer", flexShrink: 0 }}>
                      <div style={{ width: 27, height: 27, borderRadius: "50%", background: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <User style={{ color: "white", width: 12, height: 12 }} />
                      </div>
                      <span style={{ fontFamily: "var(--sans)", fontSize: "12px", fontWeight: 600, color: "var(--ink)" }}>{profile?.name?.split(" ")[0] || "Account"}</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" style={{ background: "white", border: "1px solid var(--ink-7)", borderRadius: 10, padding: 6, minWidth: 186, boxShadow: "0 12px 40px rgba(0,0,0,0.1)" }}>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 5, textDecoration: "none", color: "var(--ink)", fontFamily: "var(--sans)", fontSize: "13px" }}>
                        <User style={{ width: 13, height: 13 }} />{t.profileMenu.profile}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => window.location.href = "https://nyay-dashboard.netlify.app/"} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 5, cursor: "pointer", fontFamily: "var(--sans)", fontSize: "13px" }}>
                      <BarChart2 style={{ width: 13, height: 13 }} />{t.profileMenu.dashboard}
                    </DropdownMenuItem>
                    {profile?.role !== "lawyer" && (
                      <DropdownMenuItem asChild>
                        <Link href="/all-bookings" style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 5, textDecoration: "none", color: "var(--ink)", fontFamily: "var(--sans)", fontSize: "13px" }}>
                          <CalendarCheck style={{ width: 13, height: 13 }} />{t.profileMenu.bookings}
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <div style={{ height: 1, background: "var(--ink-7)", margin: "4px 0" }} />
                    <DropdownMenuItem onClick={() => { localStorage.removeItem("token"); window.location.reload() }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 5, cursor: "pointer", color: "var(--red)", fontFamily: "var(--sans)", fontSize: "13px" }}>
                      <LogOut style={{ width: 13, height: 13 }} />{t.profileMenu.logout}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="desk-nav" style={{ gap: 6, alignItems: "center" }}>
                  <Link href="/auth/login" className="nav-link" style={{ color: "var(--ink-4)" }}>{t.nav.login}</Link>
                  <Link href="/auth/signup" className="btn btn-ink" style={{ textDecoration: "none", padding: "9px 18px", fontSize: "13px", borderRadius: 6 }}>{t.nav.signup}</Link>
                </div>
              )}

              <button onClick={() => setMenuOpen(!menuOpen)}
                className="mob-btn"
                style={{ width: 38, height: 38, border: "1px solid var(--ink-7)", background: "none", borderRadius: 7, cursor: "pointer", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                aria-label="Menu">
                {menuOpen ? <X style={{ width: 16, height: 16 }} /> : <Menu style={{ width: 16, height: 16 }} />}
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="mobile-menu-panel" style={{ borderTop: "1px solid var(--ink-7)", background: "white", padding: "16px 24px 28px", boxShadow: "0 8px 20px rgba(0,0,0,0.08)" }}>
              {navLinks.map(([key, val]) => (
                <Link key={key} href={navHref(key)} onClick={() => setMenuOpen(false)}
                  style={{ display: "block", padding: "14px 0", fontFamily: "var(--sans)", fontSize: "16px", fontWeight: 500, color: "var(--ink-2)", textDecoration: "none", borderBottom: "1px solid var(--ink-8)" }}>
                  {val}
                </Link>
              ))}
              <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                <Link href="/auth/login" onClick={() => setMenuOpen(false)} style={{ flex: 1, padding: "12px", textAlign: "center", border: "1px solid var(--ink-6)", borderRadius: 8, fontFamily: "var(--sans)", fontSize: "14px", fontWeight: 500, color: "var(--ink)", textDecoration: "none", background: "var(--white)" }}>{t.nav.login}</Link>
                <Link href="/auth/signup" onClick={() => setMenuOpen(false)} style={{ flex: 1, padding: "12px", textAlign: "center", background: "var(--ink)", borderRadius: 8, fontFamily: "var(--sans)", fontSize: "14px", fontWeight: 600, color: "white", textDecoration: "none" }}>{t.nav.signup}</Link>
              </div>
              <button onClick={() => { setLang(l => l === "en" ? "hi" : "en"); setMenuOpen(false) }}
                style={{ marginTop: 16, width: "100%", padding: "12px", border: "1px dashed var(--ink-6)", background: "var(--ink-8)", borderRadius: 8, fontFamily: "var(--sans)", fontSize: "13px", fontWeight: 500, cursor: "pointer", color: "var(--ink-3)" }}>
                {t.langSwitchMobile}
              </button>
              <div style={{ display: "flex", gap: 14, alignItems: "center", marginTop: 20, paddingTop: 12, borderTop: "1px solid var(--ink-7)" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--ink-5)", letterSpacing: "0.1em" }}>Follow us:</span>
                <SocialIcon href={t.social.instagram} icon={Instagram} label="Instagram" />
                <SocialIcon href={t.social.linkedin} icon={Linkedin} label="LinkedIn" />
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section style={{ position: "relative", overflow: "hidden", padding: "72px 24px 72px" }}>
          <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", background: "var(--parchment)", clipPath: "polygon(8% 0,100% 0,100% 100%,0 100%)", zIndex: 0 }} />
          <div style={{ position: "absolute", top: "50%", right: "23%", transform: "translate(50%,-50%)", width: 460, height: 460, borderRadius: "50%", border: "1px solid rgba(0,0,0,0.05)", zIndex: 0, pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "50%", right: "23%", transform: "translate(50%,-50%)", width: 300, height: 300, borderRadius: "50%", border: "1px solid rgba(0,0,0,0.04)", zIndex: 0, pointerEvents: "none" }} />

          <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div className="hero-grid">
              <div style={{ animation: "fadeUp 0.75s cubic-bezier(0.22,1,0.36,1) both" }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginBottom: 28 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 15px", border: "1px solid var(--gold)", borderRadius: 100, background: "rgba(201,168,76,0.07)" }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--gold)", flexShrink: 0, boxShadow: "0 0 8px var(--gold)", animation: "pulse-ring 2.6s ease-in-out infinite" }} />
                    <span style={{ fontFamily: "var(--mono)", fontSize: "9.5px", color: "var(--gold-dk)", letterSpacing: "0.14em", textTransform: "uppercase" }}>{t.hero.badge}</span>
                  </div>
                </div>

                <h1 style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(34px,5.8vw,66px)",
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: "-0.022em",
                  color: "var(--ink)",
                  marginBottom: 0,
                  overflow: "visible",
                }}>
                  <span style={{ display: "block", marginBottom: 6 }}>{t.hero.titleStatic}</span>
                  <span style={{
                    display: "block",
                    fontStyle: "italic",
                    fontWeight: 300,
                    background: "linear-gradient(110deg,var(--ink) 0%,var(--gold-dk) 32%,var(--gold) 52%,var(--gold-dk) 72%,var(--ink) 100%)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "shimmer 4.5s linear infinite",
                    paddingTop: "0.15em",
                    paddingBottom: "0.08em",
                    paddingRight: "0.1em",
                    overflow: "visible",
                    minHeight: "1.2em",
                    ...accentStyle,
                  }}>{accentWord}</span>
                </h1>

                <div style={{ width: 52, height: 2, background: "linear-gradient(90deg,var(--gold),var(--gold-lt))", marginTop: 22, marginBottom: 22 }} />

                <p style={{ fontFamily: "var(--sans)", fontSize: "15px", color: "var(--ink-4)", lineHeight: 1.82, maxWidth: 480, marginBottom: 34 }}>
                  {t.hero.description}
                </p>

                <div className="hero-ctas" style={{ marginBottom: 44 }}>
                  <Link href="/legal-gpt" className="btn btn-ink" style={{ textDecoration: "none" }}>
                    <MessageCircle style={{ width: 15, height: 15 }} />{t.hero.ctaPrimary}
                  </Link>
                  <Link href="/lawyers" className="btn btn-ghost" style={{ textDecoration: "none" }}>
                    <Gavel style={{ width: 15, height: 15 }} />{t.hero.ctaSecondary}
                  </Link>
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-wa" style={{ textDecoration: "none" }}>
                    <WaSvg />{t.hero.ctaWhatsapp}
                  </a>
                </div>

                <div className="hero-stats" style={{ paddingTop: 28, borderTop: "1px solid var(--ink-7)" }}>
                  {t.hero.stats.map((s, i) => (
                    <div key={s.label} style={{ display: "flex", alignItems: "center" }}>
                      {i > 0 && <div className="hero-stats-sep" style={{ width: 1, height: 38, background: "var(--ink-7)", margin: "0 24px" }} />}
                      <div>
                        <div style={{ fontFamily: "var(--serif)", fontSize: "28px", fontWeight: 600, color: "var(--ink)", lineHeight: 1 }}>{s.value}</div>
                        <div style={{ fontFamily: "var(--sans)", fontSize: "10.5px", color: "var(--ink-5)", letterSpacing: "0.04em", marginTop: 3 }}>{s.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hero-card-col" style={{ animation: "fadeUp 0.8s 0.18s cubic-bezier(0.22,1,0.36,1) both" }}>
                <div style={{ animation: "float 7s ease-in-out infinite", position: "relative" }}>
                  <div style={{ background: "var(--white)", border: "1px solid var(--ink-7)", borderRadius: 18, boxShadow: "0 40px 80px rgba(0,0,0,0.09), 0 0 0 1px rgba(0,0,0,0.02)", overflow: "hidden" }}>
                    <div style={{ background: "var(--ink)", padding: "16px 22px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--gold)", boxShadow: "0 0 9px var(--gold)" }} />
                        <span style={{ fontFamily: "var(--mono)", fontSize: "9.5px", color: "rgba(255,255,255,0.55)", letterSpacing: "0.16em", textTransform: "uppercase" }}>{t.hero.cardTitle}</span>
                      </div>
                      <div style={{ display: "flex", gap: 6 }}>
                        {["#ff5f57", "#febc2e", "#28c840"].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />)}
                      </div>
                    </div>

                    {t.hero.cardSteps.map((step, i) => (
                      <div key={step.n} style={{ padding: "17px 22px", display: "flex", gap: 14, alignItems: "flex-start", borderBottom: i < 2 ? "1px solid var(--ink-8)" : "none", transition: "background 0.18s", cursor: "default" }}
                        onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "var(--parchment)"}
                        onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = ""}>
                        <div style={{ width: 36, height: 36, borderRadius: 9, background: "var(--parchment)", border: "1px solid var(--ink-7)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "var(--gold-dk)" }}>
                          {i === 0 ? <FileCheck style={{ width: 14, height: 14 }} /> : i === 1 ? <Bot style={{ width: 14, height: 14 }} /> : <CalendarCheck style={{ width: 14, height: 14 }} />}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                            <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--gold)", letterSpacing: "0.1em" }}>{step.n}</span>
                            <span style={{ fontFamily: "var(--sans)", fontSize: "12.5px", fontWeight: 600, color: "var(--ink)" }}>{step.title}</span>
                          </div>
                          <p style={{ fontFamily: "var(--sans)", fontSize: "11.5px", color: "var(--ink-5)", lineHeight: 1.55 }}>{step.desc}</p>
                        </div>
                      </div>
                    ))}

                    <div style={{ padding: "13px 22px", background: "var(--parchment)", borderTop: "1px solid var(--ink-7)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: "9.5px", color: "var(--ink-5)", letterSpacing: "0.07em" }}>{t.hero.cardFooter}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, color: "#15803d", background: "#f0fdf4", padding: "4px 10px", borderRadius: 100, border: "1px solid #bbf7d0" }}>
                        <WaSvg size={10} /><span style={{ fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.08em", fontWeight: 600 }}>WhatsApp</span>
                      </div>
                    </div>
                  </div>

                  <div className="floating-badge-1" style={{ position: "absolute", bottom: -14, left: -20, background: "var(--ink)", color: "white", borderRadius: 9, padding: "10px 16px", boxShadow: "0 10px 32px rgba(0,0,0,0.17)", fontFamily: "var(--sans)", fontSize: "11.5px", fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                    <Shield style={{ width: 12, height: 12, color: "var(--gold)" }} /> Bar Council Verified
                  </div>
                  <div className="floating-badge-2" style={{ position: "absolute", top: -14, right: -16, background: "var(--gold-pale)", border: "1px solid var(--gold)", borderRadius: 9, padding: "8px 14px", boxShadow: "0 8px 24px rgba(201,168,76,0.18)", fontFamily: "var(--mono)", fontSize: "10px", fontWeight: 700, color: "var(--gold-dk)", display: "flex", alignItems: "center", gap: 6 }}>
                    <Star style={{ width: 11, height: 11, fill: "var(--gold)", color: "var(--gold)" }} /> 4.9 / 5.0
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Marquee */}
        <div style={{ borderTop: "1px solid var(--ink-7)", borderBottom: "1px solid var(--ink-7)", padding: "12px 0", overflow: "hidden", background: "var(--parchment)" }}>
          <div className="mq-track">
            {[...t.trustBar, ...t.trustBar, ...t.trustBar].map((item, i) => (
              <span key={i} className="trust-pill">
                <span style={{ fontFamily: "var(--serif)", fontSize: "14px", fontWeight: 600, color: "var(--gold-dk)" }}>{item.value}</span>
                <span style={{ fontFamily: "var(--sans)", fontSize: "11.5px", color: "var(--ink-5)" }}>{item.label}</span>
                <span style={{ color: "var(--ink-7)", marginLeft: 4 }}>·</span>
              </span>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <section className="section-pad" style={{ background: "var(--white)" }}>
          <div style={{ maxWidth: 1140, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 64 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}><span className="eyebrow">{t.howItWorks.eyebrow}</span></div>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px,4vw,46px)", fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.02em" }}>{t.howItWorks.title}</h2>
              </div>
            </Reveal>

            <div className="step-grid" style={{ border: "1px solid var(--ink-7)", borderRadius: 16, overflow: "hidden" }}>
              {t.howItWorks.steps.map((step, i) => (
                <Reveal key={step.n} delay={i * 90}>
                  <div className="step-cell" style={{ padding: "52px 36px 44px", position: "relative", overflow: "hidden", height: "100%", borderRight: i < 2 ? "1px solid var(--ink-7)" : "none", transition: "background 0.22s", cursor: "default", background: "var(--white)" }}
                    onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "var(--parchment)"}
                    onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "var(--white)"}>
                    <div className="step-ghost">{step.n}</div>
                    <div style={{ width: 52, height: 52, borderRadius: 13, background: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22, position: "relative", zIndex: 1, color: "var(--gold)" }}>
                      {stepIcon(step.icon)}
                    </div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 10px", background: "var(--gold-pale)", border: "1px solid var(--gold)", borderRadius: 100, marginBottom: 14, position: "relative", zIndex: 1 }}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: "8.5px", color: "var(--gold-dk)", letterSpacing: "0.12em" }}>STEP {i + 1}</span>
                    </div>
                    <h3 style={{ fontFamily: "var(--serif)", fontSize: "21px", fontWeight: 600, color: "var(--ink)", marginBottom: 10, position: "relative", zIndex: 1 }}>{step.title}</h3>
                    <p style={{ fontFamily: "var(--sans)", fontSize: "13.5px", color: "var(--ink-4)", lineHeight: 1.75, position: "relative", zIndex: 1 }}>{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <div style={{ background: "var(--ink)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ maxWidth: 1140, margin: "0 auto" }}>
            <div className="stat-grid">
              {[{ value: "60+", label: "Verified Lawyers" }, { value: "25+", label: "Cases Resolved" }, { value: "4.9★", label: "Average Rating" }, { value: "<2min", label: "AI Response Time" }].map((s, i) => (
                <div key={s.label} className="stat-block" style={{ borderRight: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                  <div className="gold-shimmer stat-value" style={{ fontFamily: "var(--serif)", fontSize: "36px", fontWeight: 600, lineHeight: 1, marginBottom: 6 }}>{s.value}</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: "9.5px", color: "rgba(255,255,255,0.32)", letterSpacing: "0.15em", textTransform: "uppercase" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Services Section - IMPROVED RESPONSIVENESS */}
        <section className="section-pad" style={{ background: "var(--parchment)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Reveal>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 52, flexWrap: "wrap", gap: 14 }}>
                <div>
                  <div style={{ display: "flex", marginBottom: 14 }}><span className="eyebrow">{t.services.eyebrow}</span></div>
                  <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(26px,4vw,46px)", fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.02em" }}>{t.services.title}</h2>
                  <p style={{ fontFamily: "var(--sans)", fontSize: "13.5px", color: "var(--ink-5)", marginTop: 7 }}>{t.services.subtitle}</p>
                </div>
                <Link href="/services" style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--mono)", fontSize: "10px", color: "var(--gold-dk)", textDecoration: "none", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  {t.services.allServices} <ArrowRight style={{ width: 12, height: 12 }} />
                </Link>
              </div>
            </Reveal>

            <div className="svc-grid">
              <Reveal>
                <Link href="/affidavit-online-india" style={{ textDecoration: "none", display: "block", height: "100%" }}>
                  <div className="card card-ink featured-card" style={{ padding: "40px 36px", position: "relative", overflow: "hidden", height: "100%", display: "flex", flexDirection: "column", cursor: "pointer" }}>
                    <div style={{ position: "absolute", top: -70, right: -70, width: 220, height: 220, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.05)" }} />
                    <div style={{ position: "absolute", top: 16, left: 16, width: 20, height: 20, borderTop: "1.5px solid var(--gold)", borderLeft: "1.5px solid var(--gold)" }} />
                    <div style={{ position: "absolute", bottom: 16, right: 16, width: 20, height: 20, borderBottom: "1.5px solid var(--gold)", borderRight: "1.5px solid var(--gold)" }} />
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 12px", border: "1px solid var(--gold)", borderRadius: 100, marginBottom: 26, alignSelf: "flex-start" }}>
                      <Stamp style={{ width: 10, height: 10, color: "var(--gold)" }} /><span style={{ fontFamily: "var(--mono)", fontSize: "8px", color: "var(--gold)", letterSpacing: "0.14em", textTransform: "uppercase" }}>{t.services.featured.badge}</span>
                    </div>
                    <h3 style={{ fontFamily: "var(--serif)", fontSize: "clamp(24px,4vw,30px)", fontWeight: 600, lineHeight: 1.15, marginBottom: 14, color: "white", letterSpacing: "-0.01em" }}>{t.services.featured.title}</h3>
                    <p style={{ fontFamily: "var(--sans)", fontSize: "13.5px", color: "rgba(255,255,255,0.42)", lineHeight: 1.8, marginBottom: 26, flex: 1 }}>{t.services.featured.desc}</p>
                    <div className="tags" style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 26 }}>
                      {t.services.featured.tags.map(tag => (
                        <span key={tag} style={{ fontFamily: "var(--mono)", fontSize: "8.5px", color: "rgba(255,255,255,0.38)", border: "1px solid rgba(255,255,255,0.1)", padding: "4px 11px", borderRadius: 100, letterSpacing: "0.08em" }}>{tag}</span>
                      ))}
                    </div>
                    <div className="meta" style={{ display: "flex", flexWrap: "wrap", gap: 16, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                      {t.services.featured.meta.map((m, idx) => {
                        const icons = [<Clock style={{ width: 10, height: 10, color: "var(--gold)" }} />, <CheckCircle style={{ width: 10, height: 10, color: "var(--gold)" }} />, <Zap style={{ width: 10, height: 10, color: "var(--gold)" }} />]
                        return <span key={m} style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--sans)", fontSize: "11.5px", color: "rgba(255,255,255,0.38)" }}>{icons[idx]}{m}</span>
                      })}
                    </div>
                  </div>
                </Link>
              </Reveal>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {t.services.cards.map((card, i) => (
                  <Reveal key={card.title} delay={(i + 1) * 70}>
                    <Link href={card.href} style={{ textDecoration: "none" }}>
                      <div className="card svc-card-content" style={{ padding: "22px 24px", display: "flex", alignItems: "center", gap: 18, cursor: "pointer" }}>
                        <div className="svc-icon" style={{ width: 44, height: 44, borderRadius: 11, background: "var(--parchment)", border: "1px solid var(--ink-7)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "var(--ink-3)" }}>
                          {svcIcons[i]}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h3 style={{ fontFamily: "var(--serif)", fontSize: "17px", fontWeight: 600, color: "var(--ink)", marginBottom: 4 }}>{card.title}</h3>
                          <p style={{ fontFamily: "var(--sans)", fontSize: "12px", color: "var(--ink-5)", lineHeight: 1.6 }}>{card.desc}</p>
                        </div>
                        <div className="svc-right" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5, flexShrink: 0 }}>
                          <ArrowUpRight style={{ width: 15, height: 15, color: "var(--ink-5)" }} />
                          <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--gold-dk)", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>{card.footer}</span>
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                ))}
                <Reveal delay={280}>
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    <div className="card" style={{ padding: "20px 24px", background: "#f0fdf4", borderColor: "#bbf7d0", display: "flex", alignItems: "center", gap: 16, cursor: "pointer" }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: "#dcfce7", border: "1px solid #86efac", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#15803d" }}>
                        <WaSvg size={18} />
                      </div>
                      <div>
                        <div style={{ fontFamily: "var(--sans)", fontSize: "13px", fontWeight: 600, color: "#15803d", marginBottom: 2 }}>Quick help on WhatsApp</div>
                        {/* <div style={{ fontFamily: "var(--mono)", fontSize: "9.5px", color: "#16a34a", letterSpacing: "0.07em" }}>+91 96616 44025</div> */}
                      </div>
                      <ArrowRight style={{ width: 14, height: 14, color: "#16a34a", marginLeft: "auto" }} />
                    </div>
                  </a>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Why Us Section */}
        <section className="section-pad" style={{ background: "var(--white)", borderTop: "1px solid var(--ink-7)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div className="why-grid">
              <Reveal>
                <div>
                  <div style={{ display: "flex", marginBottom: 18 }}><span className="eyebrow">{t.whyUs.eyebrow}</span></div>
                  <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px,4vw,50px)", fontWeight: 600, color: "var(--ink)", lineHeight: 1.1, letterSpacing: "-0.022em", marginBottom: 8 }}>{t.whyUs.title}</h2>
                  <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px,4vw,50px)", fontWeight: 300, fontStyle: "italic", color: "var(--ink-5)", lineHeight: 1.1, letterSpacing: "-0.022em", marginBottom: 26 }}>{t.whyUs.titleLine2}</h2>
                  <div style={{ width: 52, height: 2, background: "linear-gradient(90deg,var(--gold),var(--gold-lt))", marginBottom: 22 }} />
                  <p style={{ fontFamily: "var(--sans)", fontSize: "14.5px", color: "var(--ink-4)", lineHeight: 1.85, marginBottom: 34 }}>{t.whyUs.desc}</p>
                  <Link href="/legal-gpt" className="btn btn-ink" style={{ textDecoration: "none" }}>
                    {t.whyUs.cta} <ArrowRight style={{ width: 14, height: 14 }} />
                  </Link>
                  <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid var(--ink-7)" }}>
                    <div style={{ position: "relative", paddingLeft: 20 }}>
                      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: "linear-gradient(180deg,var(--gold),var(--gold-lt))", borderRadius: 2 }} />
                      <p style={{ fontFamily: "var(--serif)", fontSize: "18px", fontStyle: "italic", fontWeight: 300, color: "var(--ink-3)", lineHeight: 1.65 }}>{t.whyUs.quote}</p>
                      <div style={{ fontFamily: "var(--mono)", fontSize: "9.5px", color: "var(--ink-6)", letterSpacing: "0.1em", marginTop: 10 }}>{t.whyUs.quoteAttr}</div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div className="feat-grid">
                  {t.whyUs.features.map((f, i) => {
                    const icons = [<IndianRupee style={{ width: 17, height: 17 }} />, <Bot style={{ width: 17, height: 17 }} />, <Shield style={{ width: 17, height: 17 }} />, <PenTool style={{ width: 17, height: 17 }} />]
                    const dark = i % 2 === 1
                    return (
                      <div key={f.title} className="card" style={{ padding: "28px 24px", background: dark ? "var(--ink)" : "var(--white)", borderColor: dark ? "transparent" : "var(--ink-7)", position: "relative", overflow: "hidden" }}>
                        <div style={{ position: "absolute", bottom: -10, right: 6, fontFamily: "var(--serif)", fontSize: "72px", fontWeight: 700, lineHeight: 1, color: "transparent", WebkitTextStroke: dark ? "1px rgba(255,255,255,0.05)" : "1px var(--ink-8)", userSelect: "none", pointerEvents: "none" }}>{f.n}</div>
                        <div style={{ width: 38, height: 38, borderRadius: 9, background: dark ? "rgba(255,255,255,0.06)" : "var(--parchment)", border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "var(--ink-7)"}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, color: dark ? "var(--gold)" : "var(--gold-dk)" }}>
                          {icons[i]}
                        </div>
                        <h3 style={{ fontFamily: "var(--serif)", fontSize: "17px", fontWeight: 600, color: dark ? "white" : "var(--ink)", marginBottom: 8 }}>{f.title}</h3>
                        <p style={{ fontFamily: "var(--sans)", fontSize: "12.5px", color: dark ? "rgba(255,255,255,0.38)" : "var(--ink-4)", lineHeight: 1.65 }}>{f.desc}</p>
                      </div>
                    )
                  })}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Problems Section */}
        <section className="section-pad" style={{ background: "var(--ink)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(201,168,76,0.024) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.024) 1px,transparent 1px)", backgroundSize: "64px 64px", zIndex: 0 }} />
          <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <Reveal>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 14 }}>
                <div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: "9.5px", color: "var(--gold)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ display: "inline-block", width: 22, height: 1, background: "var(--gold)" }} />{t.problems.eyebrow}<span style={{ display: "inline-block", width: 22, height: 1, background: "var(--gold)" }} />
                  </div>
                  <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(26px,4vw,46px)", fontWeight: 600, color: "white", letterSpacing: "-0.02em" }}>{t.problems.title}</h2>
                </div>
                <Link href="/legal-gpt" className="btn btn-gw" style={{ textDecoration: "none", fontSize: "12px", padding: "10px 20px" }}>
                  Get Free Help <ArrowRight style={{ width: 12, height: 12 }} />
                </Link>
              </div>
            </Reveal>

            <div className="prob-grid" style={{ border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden" }}>
              {t.problems.items.map((item, i) => (
                <Reveal key={item.title} delay={i * 70}>
                  <div className="prob-cell" style={{ padding: "40px 26px", height: "100%", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none", transition: "background 0.22s", cursor: "default" }}
                    onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)"}
                    onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = ""}>
                    <div style={{ fontSize: 32, marginBottom: 18, display: "inline-block", padding: "10px", background: "rgba(255,255,255,0.04)", borderRadius: 11, border: "1px solid rgba(255,255,255,0.06)" }}>{item.emoji}</div>
                    <h3 style={{ fontFamily: "var(--serif)", fontSize: "19px", fontWeight: 600, color: "white", marginBottom: 9, lineHeight: 1.3 }}>{item.title}</h3>
                    <p style={{ fontFamily: "var(--sans)", fontSize: "12.5px", color: "rgba(255,255,255,0.33)", lineHeight: 1.7, marginBottom: 18 }}>{item.desc}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--gold)", fontFamily: "var(--mono)", fontSize: "8.5px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      Get help <ArrowRight style={{ width: 10, height: 10 }} />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section-pad" style={{ background: "var(--parchment)", borderBottom: "1px solid var(--ink-7)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 60 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}><span className="eyebrow">{t.testimonials.eyebrow}</span></div>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(26px,4vw,46px)", fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.02em" }}>{t.testimonials.title}</h2>
              </div>
            </Reveal>
            <div className="test-grid">
              {t.testimonials.items.map((item, i) => (
                <Reveal key={item.name} delay={i * 80}>
                  <div className="card" style={{ padding: "34px 30px", position: "relative", overflow: "hidden", height: "100%" }}>
                    <div style={{ position: "absolute", top: 14, left: 20, fontFamily: "var(--serif)", fontSize: "72px", lineHeight: 1, color: "var(--ink-8)", userSelect: "none", pointerEvents: "none" }}>"</div>
                    <div style={{ display: "flex", gap: 2, marginBottom: 18, position: "relative" }}>
                      {[...Array(5)].map((_, j) => <Star key={j} style={{ width: 12, height: 12, fill: j < item.rating ? "var(--gold)" : "var(--ink-7)", color: j < item.rating ? "var(--gold)" : "var(--ink-7)" }} />)}
                    </div>
                    <p style={{ fontFamily: "var(--serif)", fontSize: "16px", fontStyle: "italic", fontWeight: 400, color: "var(--ink-3)", lineHeight: 1.78, marginBottom: 26 }}>{item.text}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 18, borderTop: "1px solid var(--ink-8)", flexWrap: "wrap", gap: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                        <div style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--mono)", fontSize: "10px", fontWeight: 600, color: "var(--gold)", flexShrink: 0 }}>{item.avatar}</div>
                        <div>
                          <div style={{ fontFamily: "var(--sans)", fontSize: "13px", fontWeight: 600, color: "var(--ink)" }}>{item.name}</div>
                          <div style={{ fontFamily: "var(--sans)", fontSize: "11px", color: "var(--ink-5)", marginTop: 1 }}>{item.location}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "var(--mono)", fontSize: "8.5px", color: "#16a34a", letterSpacing: "0.08em", background: "#f0fdf4", padding: "4px 9px", borderRadius: 100, border: "1px solid #bbf7d0", whiteSpace: "nowrap" }}>
                        <CheckCircle style={{ width: 9, height: 9 }} />{t.testimonials.verified}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-pad" style={{ background: "var(--white)" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 60 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}><span className="eyebrow">{t.faq.eyebrow}</span></div>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(26px,4vw,46px)", fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.02em", marginBottom: 10 }}>{t.faq.title}</h2>
                <p style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "var(--ink-5)" }}>{t.faq.subtitle}</p>
              </div>
            </Reveal>
            <Reveal delay={70}>
              <div>{t.faq.items.map(item => <FaqItem key={item.q} q={item.q} a={item.a} />)}</div>
            </Reveal>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-pad" style={{ background: "var(--ink)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(201,168,76,0.028) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.028) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 660, height: 660, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(201,168,76,0.06),transparent 65%)", pointerEvents: "none" }} />
          <div style={{ maxWidth: 740, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
            <Reveal>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", border: "1px solid rgba(201,168,76,0.35)", borderRadius: 100, marginBottom: 28 }}>
                <Sparkles style={{ width: 11, height: 11, color: "var(--gold)" }} /><span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--gold)", letterSpacing: "0.16em", textTransform: "uppercase" }}>Start for free</span>
              </div>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px,5vw,54px)", fontWeight: 600, color: "white", letterSpacing: "-0.022em", lineHeight: 1.13, marginBottom: 18 }}>{t.cta.title}</h2>
              <p style={{ fontFamily: "var(--sans)", fontSize: "14.5px", color: "rgba(255,255,255,0.38)", lineHeight: 1.8, maxWidth: 480, margin: "0 auto 40px" }}>{t.cta.subtitle}</p>
              <div className="cta-btns">
                <Link href="/legal-gpt" className="btn btn-gold" style={{ textDecoration: "none" }}>
                  <Sparkles style={{ width: 13, height: 13 }} />{t.cta.primary}
                </Link>
                <Link href="/lawyers" className="btn btn-gw" style={{ textDecoration: "none" }}>
                  {t.cta.secondary}
                </Link>
              </div>
              <div style={{ marginTop: 36, display: "flex", justifyContent: "center", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
                {[
                  { icon: <Shield style={{ width: 11, height: 11 }} />, text: "Bar Council Verified" },
                  { icon: <CheckCircle style={{ width: 11, height: 11 }} />, text: "No Hidden Charges" },
                  { icon: <Star style={{ width: 11, height: 11 }} />, text: "4.9★ Rated" },
                ].map(item => (
                  <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--mono)", fontSize: "9px", color: "rgba(255,255,255,0.28)", letterSpacing: "0.08em" }}>
                    <span style={{ color: "var(--gold)" }}>{item.icon}</span>{item.text}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Footer - IMPROVED RESPONSIVENESS */}
        <footer style={{ background: "var(--parchment)", borderTop: "1px solid var(--ink-7)", padding: "68px 24px 40px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div className="footer-grid" style={{ marginBottom: 48, paddingBottom: 44, borderBottom: "1px solid var(--ink-7)" }}>
              {/* Brand Column */}
              <div>
                <Link href="/" style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none", marginBottom: 14, justifyContent: "flex-start" }}>
                  <div style={{ width: 36, height: 36, background: "var(--ink)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Scale style={{ color: "white", width: 15, height: 15 }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--serif)", fontSize: "18px", fontWeight: 700, color: "var(--ink)", lineHeight: 1 }}>{t.footer.company}</div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: "7px", color: "var(--gold-dk)", letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 1 }}>Legal Tech · India</div>
                  </div>
                </Link>
                <p style={{ fontFamily: "var(--sans)", fontSize: "13px", color: "var(--ink-4)", lineHeight: 1.7, maxWidth: 260, marginBottom: 22 }}>{t.footer.tagline}</p>
                <address style={{ fontStyle: "normal" }}>
                  {[
                    { icon: <MapPin style={{ width: 11, height: 11, flexShrink: 0 }} />, text: t.footer.address },
                    { icon: <Mail style={{ width: 11, height: 11, flexShrink: 0 }} />, text: t.footer.email, href: `mailto:${t.footer.email}` },
                    { icon: <PhoneCall style={{ width: 11, height: 11, flexShrink: 0 }} />, text: t.footer.phone, href: "tel:+917970596183" },
                  ].map(row => (
                    <div key={row.text} style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 9, marginBottom: 8 }}>
                      <span style={{ color: "var(--gold-dk)", marginTop: 1 }}>{row.icon}</span>
                      {row.href
                        ? <a href={row.href} style={{ fontFamily: "var(--sans)", fontSize: "12px", color: "var(--ink-4)", textDecoration: "none", wordBreak: "break-all" }}>{row.text}</a>
                        : <span style={{ fontFamily: "var(--sans)", fontSize: "12px", color: "var(--ink-4)" }}>{row.text}</span>}
                    </div>
                  ))}
                </address>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 18, justifyContent: "flex-start" }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: "8px", color: "var(--ink-5)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{t.footer.followUs}</span>
                  <SocialIcon href={t.social.instagram} icon={Instagram} label="Instagram" />
                  <SocialIcon href={t.social.linkedin} icon={Linkedin} label="LinkedIn" />
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <div style={{ fontFamily: "var(--mono)", fontSize: "8px", fontWeight: 600, color: "var(--ink-5)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 18 }}>{t.footer.quickLinks}</div>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {[
                    { href: "/about", label: t.footer.about },
                    { href: "/services", label: t.nav.services },
                    { href: "/lawyers", label: t.nav.lawyers },
                    { href: "/affidavit-online-india", label: t.footer.affidavit },
                    { href: "/auth/signup", label: t.footer.signup },
                  ].map(l => (
                    <li key={l.href} style={{ marginBottom: 10 }}>
                      <Link href={l.href} style={{ fontFamily: "var(--sans)", fontSize: "13px", color: "var(--ink-5)", textDecoration: "none", transition: "color 0.18s" }}
                        onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink)"}
                        onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink-5)"}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <div style={{ fontFamily: "var(--mono)", fontSize: "8px", fontWeight: 600, color: "var(--ink-5)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 18 }}>{t.footer.legal}</div>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {[
                    { href: "/terms", label: t.footer.terms },
                    { href: "/privacy-policy", label: t.footer.privacy },
                    { href: "/cancellation", label: t.footer.cancellation },
                    { href: "/Shipping&DeliveryPolicy", label: t.footer.deliveryPolicy },
                    { href: "/contact", label: t.footer.contact },
                  ].map(l => (
                    <li key={l.href} style={{ marginBottom: 10 }}>
                      <Link href={l.href} style={{ fontFamily: "var(--sans)", fontSize: "13px", color: "var(--ink-5)", textDecoration: "none", transition: "color 0.18s" }}
                        onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink)"}
                        onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink-5)"}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Get Started Box */}
              <div>
                <div style={{ fontFamily: "var(--mono)", fontSize: "8px", fontWeight: 600, color: "var(--ink-5)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 18 }}>Get Started</div>
                <div style={{ background: "var(--ink)", borderRadius: 12, padding: "26px 22px", textAlign: "center" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                    <Scale style={{ color: "var(--gold)", width: 17, height: 17 }} />
                  </div>
                  <p style={{ fontFamily: "var(--serif)", fontSize: "14.5px", fontStyle: "italic", fontWeight: 300, color: "rgba(255,255,255,0.7)", marginBottom: 16, lineHeight: 1.55 }}>Free legal guidance,<br />always available.</p>
                  <Link href="/legal-gpt" style={{ display: "block", background: "var(--gold)", color: "var(--ink)", padding: "10px", borderRadius: 7, fontFamily: "var(--sans)", fontSize: "12px", fontWeight: 700, textDecoration: "none", letterSpacing: "0.04em", textTransform: "uppercase", transition: "background 0.2s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = "var(--gold-lt)"}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = "var(--gold)"}>
                    Try Legal AI →
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Bar - Improved for mobile */}
            <div className="footer-bottom" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14 }}>
              <p className="footer-copyright" style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--ink-6)", letterSpacing: "0.06em" }}>© 2026 {t.footer.company}. {t.footer.copyright}</p>
              <p className="footer-disclaimer" style={{ fontFamily: "var(--sans)", fontSize: "11px", color: "var(--ink-6)", maxWidth: 540, lineHeight: 1.65, textAlign: "right" }}>
                <span style={{ color: "var(--red)", fontWeight: 600 }}>{t.footer.disclaimerLabel} </span>{t.footer.disclaimer}
              </p>
            </div>
          </div>
        </footer>

        {/* Floating WhatsApp Button */}
        <a href={waUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
          className="floating-wa"
          style={{ position: "fixed", bottom: 26, right: 26, zIndex: 200, width: 52, height: 52, borderRadius: "50%", background: "#128C7E", color: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 28px rgba(18,140,126,0.4)", transition: "all 0.22s cubic-bezier(0.22,1,0.36,1)", textDecoration: "none" }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = "scale(1.12)"; el.style.background = "#20c874" }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = ""; el.style.background = "#128C7E" }}>
          <WaSvg size={24} />
        </a>
      </div>
    </>
  )
}