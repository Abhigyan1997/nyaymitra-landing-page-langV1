"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Scale, Menu, X, Home, BookText, Mail, Sparkles, Shield,
    ArrowRight, Clock, Tag, Search, ChevronRight, TrendingUp,
    Bookmark, Share2, Eye, Calendar, Filter, ChevronLeft,
    User, MessageCircle, Twitter, Facebook, Linkedin,
    ChevronUp, Rss, Globe, Phone
} from "lucide-react"
import Link from "next/link"

/* ─── Global Styles ─────────────────────────────────────────────────────────── */
const GlobalStyles = () => (
    <style suppressHydrationWarning>{`
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
      --side-w:     300px;
    }

    html { scroll-behavior: smooth; }
    body {
      background: var(--white);
      color: var(--ink);
      font-family: var(--sans);
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }

    @keyframes shimmer {
      0%   { background-position: -300% center; }
      100% { background-position:  300% center; }
    }
    @keyframes marquee {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .gold-text {
      background: linear-gradient(115deg, var(--gold-dk) 0%, var(--gold) 30%, var(--gold-lt) 52%, var(--gold) 70%, var(--gold-dk) 100%);
      background-size: 300% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 7s linear infinite;
    }

    /* ── Category badge ── */
    .cat-badge {
      display: inline-block;
      font-family: var(--mono);
      font-size: 8px;
      font-weight: 500;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--gold-dk);
      background: var(--gold-pale);
      border: 1px solid rgba(201,168,76,0.3);
      padding: 3px 10px;
    }
    .cat-badge.dark {
      background: var(--ink);
      color: var(--gold-lt);
      border-color: var(--gold-dk);
    }

    /* ── Post meta ── */
    .post-meta {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: var(--mono);
      font-size: 9.5px;
      color: var(--ink-5);
      flex-wrap: wrap;
    }
    .post-meta .sep { color: var(--ink-7); }

    /* ── Section label ── */
    .section-label {
      font-family: var(--mono);
      font-size: 8.5px;
      font-weight: 500;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--gold-dk);
      padding-bottom: 10px;
      border-bottom: 2px solid var(--ink);
      display: block;
      margin-bottom: 24px;
    }

    /* ── Nav top bar ── */
    .nav-top { background: var(--ink); padding: 6px 0; }
    .nav-top-inner {
      max-width: 1200px; margin: 0 auto; padding: 0 24px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .nav-top a {
      font-family: var(--mono); font-size: 9px; font-weight: 500;
      letter-spacing: 0.1em; text-transform: uppercase;
      color: rgba(255,255,255,0.45); text-decoration: none; transition: color 0.15s;
    }
    .nav-top a:hover { color: var(--gold-lt); }

    /* Responsive: Hide top bar on mobile */
    @media (max-width: 768px) {
      .nav-top { display: none; }
    }

    /* ── Main nav ── */
    .nav-main {
      background: var(--white); position: sticky; top: 0; z-index: 100;
      border-bottom: 1px solid var(--ink-7);
    }
    .nav-main-inner {
      max-width: 1200px; margin: 0 auto; padding: 0 16px;
      display: flex; align-items: center; gap: 16px; height: 62px;
    }
    .nav-link {
      font-family: var(--sans); font-size: 12px; font-weight: 500;
      letter-spacing: 0.04em; text-transform: uppercase;
      color: var(--ink-4); text-decoration: none; padding: 4px 0;
      border-bottom: 2px solid transparent; transition: all 0.15s;
    }
    .nav-link:hover, .nav-link.active { color: var(--ink); border-bottom-color: var(--gold); }

    /* ── Category nav ── */
    .nav-cats { background: var(--ink-9); border-bottom: 1px solid var(--ink-7); overflow-x: auto; }
    .nav-cats::-webkit-scrollbar { display: none; }
    .nav-cats-inner {
      max-width: 1200px; margin: 0 auto; padding: 0 16px;
      display: flex; gap: 0; white-space: nowrap;
    }
    .cat-tab {
      font-family: var(--mono); font-size: 9px; font-weight: 500;
      letter-spacing: 0.12em; text-transform: uppercase;
      color: var(--ink-5); padding: 11px 18px;
      border: none; background: transparent; cursor: pointer;
      transition: all 0.15s; border-bottom: 2px solid transparent;
    }
    .cat-tab:hover { color: var(--ink); background: var(--ink-8); }
    .cat-tab.active { color: var(--gold-dk); border-bottom-color: var(--gold); font-weight: 600; }

    /* Responsive category tabs */
    @media (max-width: 768px) {
      .cat-tab { padding: 11px 12px; font-size: 8px; }
    }

    /* ── Ticker ── */
    .ticker-inner { display: flex; width: max-content; animation: marquee 35s linear infinite; }
    .ticker-inner:hover { animation-play-state: paused; }

    /* Responsive ticker */
    @media (max-width: 1024px) {
      .ticker-wrapper { display: none; }
    }

    /* ── Buttons ── */
    .btn-ink {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--ink); color: var(--white);
      font-family: var(--sans); font-size: 12px; font-weight: 600;
      letter-spacing: 0.06em; text-transform: uppercase;
      padding: 9px 20px; border: none; cursor: pointer;
      transition: all 0.2s; text-decoration: none;
    }
    .btn-ink:hover { background: var(--ink-3); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(12,11,9,0.18); }

    .btn-gold {
      display: inline-flex; align-items: center; gap: 8px;
      background: linear-gradient(135deg, var(--gold-dk) 0%, var(--gold) 50%, var(--gold-lt) 100%);
      color: var(--ink); font-family: var(--sans); font-size: 12px; font-weight: 700;
      letter-spacing: 0.06em; text-transform: uppercase;
      padding: 10px 22px; border: none; cursor: pointer;
      transition: all 0.22s; text-decoration: none;
    }
    .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(201,168,76,0.35); }

    .btn-outline {
      display: inline-flex; align-items: center; gap: 8px;
      background: transparent; color: var(--ink-3);
      font-family: var(--sans); font-size: 12px; font-weight: 600;
      letter-spacing: 0.06em; text-transform: uppercase;
      padding: 9px 20px; border: 1.5px solid var(--ink-7); cursor: pointer;
      transition: all 0.2s; text-decoration: none;
    }
    .btn-outline:hover { background: var(--ink); color: var(--white); border-color: var(--ink); }

    /* Responsive buttons */
    @media (max-width: 768px) {
      .btn-ink, .btn-gold, .btn-outline { padding: 7px 14px; font-size: 10px; }
    }

    /* ── Article card ── */
    .card-standard {
      border-bottom: 1px solid var(--ink-8);
      padding-bottom: 24px; margin-bottom: 24px;
      cursor: pointer; transition: all 0.2s;
    }
    .card-standard:last-child { border-bottom: none; }
    .card-standard:hover .card-title { color: var(--gold-dk); }

    .card-compact {
      display: flex; gap: 14px; align-items: flex-start;
      padding: 12px 0; border-bottom: 1px solid var(--ink-8); cursor: pointer;
    }
    .card-compact:last-child { border-bottom: none; }
    .card-compact:hover h4 { color: var(--gold-dk); }

    /* ── Search ── */
    .search-field {
      width: 100%; background: var(--white);
      border: 1.5px solid var(--ink-7); padding: 10px 16px 10px 40px;
      font-family: var(--sans); font-size: 13px; color: var(--ink);
      outline: none; transition: border-color 0.2s; border-radius: 0;
    }
    .search-field:focus { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(201,168,76,0.1); }
    .search-field::placeholder { color: var(--ink-6); }

    /* ── Sidebar widgets ── */
    .widget { margin-bottom: 32px; padding-bottom: 32px; border-bottom: 1px solid var(--ink-7); }
    .widget:last-child { border-bottom: none; margin-bottom: 0; }

    /* ── Reading progress ── */
    #reading-bar {
      position: fixed; top: 0; left: 0; height: 3px; z-index: 9999;
      background: linear-gradient(90deg, var(--gold-dk), var(--gold), var(--gold-lt));
      transition: width 0.1s linear; pointer-events: none;
    }

    /* ── Reader article styles ── */
    .reader-body h2 {
      font-family: var(--serif); font-size: 24px; font-weight: 600;
      color: var(--ink); margin: 40px 0 14px;
      border-bottom: 1px solid var(--ink-8); padding-bottom: 10px;
    }
    .reader-body p {
      font-family: var(--serif); font-size: 18px; line-height: 1.82;
      color: var(--ink-2); margin-bottom: 20px;
    }
    .reader-body ul, .reader-body ol { margin: 0 0 20px 24px; }
    .reader-body li {
      font-family: var(--serif); font-size: 17px; line-height: 1.75;
      color: var(--ink-2); margin-bottom: 8px;
    }
    .reader-body strong { font-weight: 600; color: var(--ink); }
    .reader-body .dropcap::first-letter {
      float: left; font-family: var(--serif); font-size: 68px; font-weight: 700;
      line-height: 0.82; color: var(--gold-dk);
      margin: 8px 10px 0 0;
    }
    .reader-body blockquote.pull-quote {
      border-left: 3px solid var(--gold);
      margin: 36px 0; padding: 0 0 0 22px;
      font-family: var(--serif); font-size: 21px; font-style: italic;
      line-height: 1.45; color: var(--ink-3);
    }

    /* Responsive reader */
    @media (max-width: 768px) {
      .reader-body h2 { font-size: 20px; }
      .reader-body p { font-size: 16px; line-height: 1.7; }
      .reader-body blockquote.pull-quote { font-size: 18px; }
    }

    /* ── Share buttons ── */
    .share-btn {
      display: flex; align-items: center; gap: 7px;
      font-family: var(--mono); font-size: 9px; font-weight: 500;
      letter-spacing: 0.1em; text-transform: uppercase;
      padding: 8px 16px; border: 1px solid var(--ink-7);
      background: transparent; cursor: pointer; transition: all 0.15s;
      color: var(--ink-4);
    }
    .share-btn:hover { background: var(--ink); color: var(--white); border-color: var(--ink); }

    /* ── Back to top ── */
    .back-top {
      position: fixed; bottom: 28px; right: 28px;
      width: 40px; height: 40px;
      background: var(--ink); color: var(--white); border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      opacity: 0; pointer-events: none; transition: opacity 0.2s; z-index: 200;
    }
    .back-top.visible { opacity: 1; pointer-events: all; }

    /* ── Layout ── */
    .layout-cols { display: grid; grid-template-columns: 1fr var(--side-w); gap: 52px; align-items: start; }
    @media (max-width: 1024px) { .layout-cols { grid-template-columns: 1fr; } .sidebar { display: none; } }
    .cards-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 0 32px; }
    @media (max-width: 768px) {
      .hero-grid { grid-template-columns: 1fr !important; }
      .cards-2col { grid-template-columns: 1fr !important; }
    }

    /* desktop/mobile nav */
    .desktop-nav { display: flex; }
    .mobile-menu-btn { display: none; }
    @media (max-width: 768px) { 
      .desktop-nav { display: none !important; } 
      .mobile-menu-btn { display: flex !important; }
      .nav-main-inner { gap: 8px; }
    }
    .mobile-dropdown { display: none; }
    .mobile-dropdown.open { display: block; }

    /* Masthead responsive */
    .masthead-title { font-size: clamp(42px, 7vw, 80px); }
    .masthead-sub { font-size: clamp(10px, 3vw, 12px); }

    /* Hide ticker completely on mobile */
    @media (max-width: 1024px) {
      .ticker-left { display: none !important; }
      .subscribe-right { display: none !important; }
    }

    /* Hero section responsive */
    @media (max-width: 768px) {
      .hero-lead { border-right: none !important; padding-right: 0 !important; }
      .hero-stack { padding-left: 0 !important; }
    }

    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }
    ::selection { background: var(--gold-pale); color: var(--gold-dk); }
  `}</style>
)

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface Post {
    slug: string
    title: string
    excerpt: string
    content: string
    category: string
    author: string
    authorRole: string
    date: string
    dateShort: string
    readTime: string
    views: string
    comments: number
    featured?: boolean
    color: string
    icon: string
    tags: string[]
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const CATEGORIES = ["All", "Rights & Laws", "Property", "Consumer", "Family", "Business", "Criminal", "Contracts"]

const POSTS: Post[] = [
    {
        slug: "employment-rights-workplace",
        title: "Know Your Workplace Rights as an Employee in India",
        excerpt: "From notice periods to PF deductions, wrongful termination to maternity leave everything you need to know about your rights at work, explained in plain language.",
        content: `<p class="dropcap">Many employees in India don't fully understand their legal rights in the workplace. This can lead to exploitation unpaid overtime, illegal termination, or denial of benefits you're legally entitled to. Understanding the law is your first line of defence.</p>
<h2>Employment Status and What It Means for You</h2>
<p>Your rights depend significantly on your employment status. Permanent employees are entitled to all statutory benefits PF, ESI, gratuity, bonus, paid leave, notice period, and severance. Contract workers have limited rights defined by their contract, while casual employees are still covered by minimum wage laws and safety regulations.</p>
<blockquote class="pull-quote">"Knowledge of your rights is the first line of defence against exploitation in the workplace."</blockquote>
<h2>Provident Fund What Your Employer Owes You</h2>
<p>If your basic + DA is ₹15,000 or less per month, EPFO registration is mandatory for your employer. The employer contributes 12% of your basic salary 3.67% to PF and 8.33% to the pension scheme. You contribute another 12%. Total: 24.17% of your basic salary goes toward your retirement corpus every month.</p>
<p>If your PF is not being deposited, you can file a complaint on the EPFO portal. Employers who default face prosecution with imprisonment up to 3 years.</p>
<h2>Gratuity Five Years and It's Yours</h2>
<p>Under the Payment of Gratuity Act, 1972, you become eligible after 5 continuous years of service. The formula: (15 × last drawn basic salary × years of service) ÷ 26. The current maximum is ₹20 lakh for private sector employees. If an employer withholds gratuity, approach the Controlling Authority penalties include imprisonment of 3 months to 1 year.</p>
<h2>Notice Periods and Termination</h2>
<p>Termination for misconduct requires a domestic inquiry and show-cause notice first. Termination without proper inquiry is illegal. For redundancy-related termination after 240 days of continuous service, you're entitled to 15 days' average wages for each completed year, plus one month's notice or pay in lieu.</p>`,
        category: "Rights & Laws",
        author: "Admin",
        authorRole: "NyayMitra Editorial",
        date: "September 4, 2025",
        dateShort: "Sep 4, 2025",
        readTime: "7 min read",
        views: "16.7k",
        comments: 34,
        featured: true,
        color: "#c9a84c",
        icon: "💼",
        tags: ["Labour Law", "Employment", "PF", "Gratuity"]
    },
    {
        slug: "tenant-rights-india-2024",
        title: "Your Complete Guide to Tenant Rights in India",
        excerpt: "Everything you need to know about rental agreements, security deposits, eviction laws, and how to protect yourself as a tenant under Indian law.",
        content: `<p class="dropcap">Renting a home in India comes with its own set of challenges and legal protections. Whether you're moving to a new city or renewing a long-standing tenancy, understanding your rights is crucial to avoid exploitation and ensure a fair rental experience.</p>
<h2>The Written Rental Agreement Non-Negotiable</h2>
<p>While verbal agreements are technically valid, a written rental agreement is essential for protecting your interests. It should cover duration, monthly rent, security deposit, maintenance responsibilities, and the notice period for vacating. Register agreements above 11 months at your local Sub-Registrar office it costs very little and provides strong legal protection.</p>
<h2>Security Deposit Rules State by State</h2>
<p>Security deposits typically range from 2–10 months' rent. The landlord must return the deposit when you vacate, minus legitimate deductions for damage beyond normal wear and tear. In most states, the deposit cannot exceed 10 months' rent, and no interest is payable on it by law.</p>
<blockquote class="pull-quote">"An unregistered rental agreement still protects you but a registered one protects you far better."</blockquote>
<h2>Eviction Laws Your Right to Due Process</h2>
<p>A landlord cannot evict you without following proper legal procedure. They must serve written notice (15–30 days), file an eviction petition, prove valid grounds (non-payment, breach of agreement, or bonafide personal requirement), and obtain a court order before any forcible eviction. Self-help eviction changing locks, cutting utilities is illegal.</p>`,
        category: "Property",
        author: "Admin",
        authorRole: "NyayMitra Editorial",
        date: "September 19, 2025",
        dateShort: "Sep 19, 2025",
        readTime: "8 min read",
        views: "12.4k",
        comments: 21,
        featured: true,
        color: "#c9a84c",
        icon: "🏠",
        tags: ["Tenant Rights", "Rental", "Eviction", "Property"]
    },
    {
        slug: "fir-vs-complaint-difference",
        title: "FIR vs Police Complaint: What's the Real Difference?",
        excerpt: "Many people confuse these two. Here's a clear breakdown of when to file an FIR, when a written complaint suffices, and what happens next.",
        content: `<p class="dropcap">When you're a victim of a crime, knowing whether to file an FIR or a complaint can make a significant difference in how your case proceeds and how quickly the police act. This distinction trips up most citizens including many who've been through the system before.</p>
<h2>What is an FIR?</h2>
<p>An FIR (First Information Report) is a written document prepared by police when they receive information about a cognizable offence a serious crime where they can arrest without a warrant. Murder, rape, robbery, kidnapping, dowry death, acid attack, and serious cheating are cognizable offences. Police are legally obligated to register an FIR for these they cannot refuse.</p>
<h2>What is a Police Complaint?</h2>
<p>A complaint is filed for non-cognizable offences like simple hurt, defamation, public nuisance, or minor cheating. Police will register a Non-Cognizable Report (NCR) but cannot investigate without a magistrate's permission. You may need to approach a court directly for these.</p>
<blockquote class="pull-quote">"If the police refuse to register your FIR, you can directly approach a Magistrate under Section 156(3) CrPC this is your right."</blockquote>
<h2>When Police Refuse to Register an FIR</h2>
<p>Sadly, this happens. Your options: send a registered post complaint to the SHO (creating a paper trail), approach the Superintendent of Police, file before a Magistrate under Section 200 CrPC, or approach State/National Human Rights Commission. Always get a date stamp on any written complaint you submit in person.</p>`,
        category: "Criminal",
        author: "Admin",
        authorRole: "NyayMitra Editorial",
        date: "October 7, 2025",
        dateShort: "Oct 7, 2025",
        readTime: "4 min read",
        views: "18.2k",
        comments: 56,
        color: "#c9a84c",
        icon: "🚔",
        tags: ["FIR", "Criminal Law", "Police", "Rights"]
    },
    {
        slug: "right-to-information-rti",
        title: "Using RTI to Fight For Your Rights A Citizen's Guide",
        excerpt: "The Right to Information Act is one of India's most powerful citizen tools. Here's how to file an RTI application that actually gets results.",
        content: `<p class="dropcap">The Right to Information Act, 2005, is arguably India's most transformative citizen empowerment law. It forces the government to answer your questions within 30 days or face penalties. When used well, RTI has exposed corruption, retrieved delayed pensions, and held officials accountable at every level.</p>
<h2>What Can You Ask For?</h2>
<p>Almost any information held by a public authority central government, state government, local bodies, public sector undertakings, and NGOs receiving substantial government funding. Passport delays, road repair contracts, police complaint records, pension calculations all fair game.</p>
<blockquote class="pull-quote">"Be specific. Instead of 'details of the road project', ask for 'contracts, payment vouchers, and inspection reports for road repair on MG Road from Jan 2025 to date.'"</blockquote>
<h2>Filing Your Application</h2>
<p>Identify the correct Public Information Officer (PIO) for the department holding your information. Write clear, specific, point-wise questions vagueness invites delay. Pay ₹10 fee (free for BPL card holders) by cash, demand draft, or online at rtionline.gov.in for central government departments. The PIO must respond within 30 days.</p>
<h2>What If You Don't Get a Response?</h2>
<p>File a First Appeal (no fee) with the First Appellate Authority within 30 days. If that fails, file a Second Appeal with the Central or State Information Commission within 90 days. The Commission has powers of a civil court and can penalise the PIO up to ₹25,000 and recommend disciplinary action.</p>`,
        category: "Rights & Laws",
        author: "Admin",
        authorRole: "NyayMitra Editorial",
        date: "October 22, 2025",
        dateShort: "Oct 22, 2025",
        readTime: "6 min read",
        views: "11.9k",
        comments: 19,
        color: "#c9a84c",
        icon: "📢",
        tags: ["RTI", "Transparency", "Citizen Rights", "Government"]
    },
    {
        slug: "consumer-forum-how-to-file",
        title: "How to File a Complaint in the Consumer Forum Step by Step",
        excerpt: "A step-by-step walkthrough of filing consumer complaints, documentation required, fees involved, and realistic timelines to expect.",
        content: `<p class="dropcap">The Consumer Protection Act, 2019, gives every Indian consumer the right to seek redressal against defective goods, deficient services, and unfair trade practices. The system is designed to be accessible no lawyer required for small claims, nominal fees, and time-bound proceedings.</p>
<h2>Step 1: Pick the Right Forum</h2>
<p>The forum depends on the compensation you're claiming: District Consumer Disputes Redressal Forum (DCDRF) for claims up to ₹1 crore; State Commission (SCDRC) for ₹1–10 crore; National Commission (NCDRC) for above ₹10 crore.</p>
<blockquote class="pull-quote">"A well-drafted legal notice resolves more consumer disputes than all court filings combined."</blockquote>
<h2>Step 2: Send a Legal Notice First</h2>
<p>Before filing formally, send a legal notice by registered post giving the opposite party 15–30 days to resolve the issue. This creates a paper trail, is often mandatory, and frequently leads to resolution without court intervention. Keep your postal receipt carefully.</p>
<h2>Step 3: Gather Your Documents</h2>
<p>You'll need: original invoice, warranty card, evidence of deficiency (photos, videos, repair reports), email correspondence, and copies of your legal notice with postal receipt. For service deficiency cases, screenshots of chats and call recordings (where legal) are valuable.</p>`,
        category: "Consumer",
        author: "Admin",
        authorRole: "NyayMitra Editorial",
        date: "November 11, 2025",
        dateShort: "Nov 11, 2025",
        readTime: "6 min read",
        views: "9.1k",
        comments: 28,
        color: "#c9a84c",
        icon: "⚖️",
        tags: ["Consumer Rights", "Forum", "Complaint", "Legal Notice"]
    },
    {
        slug: "divorce-law-india-explained",
        title: "Divorce Law in India: A Calm, Clear Overview",
        excerpt: "Mutual consent vs contested divorce, alimony, child custody explained in plain language without legal jargon for those facing difficult decisions.",
        content: `<p class="dropcap">Divorce is an emotionally taxing process. But understanding the legal framework clearly can remove at least one layer of uncertainty, and help you make informed decisions at every stage. Here is an honest, plain-language overview of how divorce works in India.</p>
<h2>Mutual Consent Divorce</h2>
<p>Both spouses agree to end the marriage on mutually accepted terms. Requirements: the couple must have lived separately for at least 1 year, and consent must be free and voluntary. The process involves a first motion (joint petition), a 6-month cooling-off period (waivable in some circumstances since the Supreme Court's 2017 ruling), a second motion, and then the decree.</p>
<blockquote class="pull-quote">"The welfare of the child is the paramount consideration in every custody matter before an Indian court not the rights of either parent."</blockquote>
<h2>Contested Divorce</h2>
<p>One spouse files for divorce on specific grounds adultery, cruelty, desertion (2+ years), mental disorder, conversion, or communicable venereal disease. The burden of proof lies with the petitioner. Contested divorces routinely take 3–5 years in family courts.</p>
<h2>Child Custody</h2>
<p>Indian courts prioritise the welfare of the child above all else. Courts consider age (children under 5 typically stay with the mother unless there's a compelling reason otherwise), both parents' ability to provide stability, the child's own preferences if mature enough, and any history of abuse. Joint custody orders are increasingly common in metro courts.</p>`,
        category: "Family",
        author: "Admin",
        authorRole: "NyayMitra Editorial",
        date: "November 28, 2025",
        dateShort: "Nov 28, 2025",
        readTime: "10 min read",
        views: "21.3k",
        comments: 74,
        color: "#c9a84c",
        icon: "👨‍👩‍👧",
        tags: ["Family Law", "Divorce", "Custody", "Alimony"]
    },
    {
        slug: "power-of-attorney-guide",
        title: "Power of Attorney in India: When You Need It and How to Draft One",
        excerpt: "Understanding the difference between general and special PoA, when each applies, and the exact registration process across Indian states.",
        content: `<p class="dropcap">A Power of Attorney (PoA) is a legal document that lets one person act on behalf of another. Used correctly, it saves enormous time and money especially for NRIs, the elderly, or anyone managing affairs from a distance. Misused or improperly drafted, it can lead to serious fraud and financial loss.</p>
<h2>General vs Special Power of Attorney</h2>
<p>A General PoA (GPA) grants broad powers to the agent selling property, managing bank accounts, paying taxes. Use a GPA only when you need ongoing assistance and trust your agent completely. A Special PoA (SPA) grants authority for one specific transaction or time period far safer for most situations.</p>
<blockquote class="pull-quote">"Never give a blank or overly broad Power of Attorney. Limit it to exactly what is needed, and nothing more."</blockquote>
<h2>Registration Requirements</h2>
<p>For property-related PoAs, registration is mandatory in most states. The document must be printed on non-judicial stamp paper (₹100–₹1,000 depending on state), signed by the principal and two witnesses, and registered at the Sub-Registrar's office within 4 months of execution. A simple notarised PoA suffices for banking and legal representation.</p>`,
        category: "Contracts",
        author: "Admin",
        authorRole: "NyayMitra Editorial",
        date: "December 15, 2025",
        dateShort: "Dec 15, 2025",
        readTime: "5 min read",
        views: "7.8k",
        comments: 12,
        color: "#c9a84c",
        icon: "📋",
        tags: ["PoA", "Contracts", "Property", "Legal Documents"]
    },
    {
        slug: "startup-legal-checklist",
        title: "Legal Checklist Every Indian Startup Must Complete Before Launch",
        excerpt: "Company registration, IP protection, employment contracts, GST compliance the non-negotiable legal foundation for any new business in India.",
        content: `<p class="dropcap">Starting a business in India requires navigating a complex web of legal requirements. Skipping any of them even with the best intentions can result in penalties, operational shutdowns, and personal liability for founders. Here is the complete legal foundation every startup must build.</p>
<h2>1. Choose the Right Business Structure</h2>
<p>Most funded startups choose a Private Limited Company under the Companies Act, 2013 it's a separate legal entity, offers limited liability, and is the structure VCs and angel investors require. Sole proprietorships and partnerships work for early-stage or bootstrapped ventures, but lack investor-readiness. LLPs offer a middle ground for professional service firms.</p>
<blockquote class="pull-quote">"Legal costs at formation are an investment. The cost of not doing it properly is always far higher."</blockquote>
<h2>2. Register Your Business</h2>
<p>Company incorporation via MCA's SPICe+ form is now a single-window process that simultaneously registers your company, issues PAN, TAN, GSTIN, EPFO, and ESIC numbers. The entire process typically takes 7–15 working days. Shop & Establishment Act registration must follow within 30 days of starting operations.</p>
<h2>3. IP Protection</h2>
<p>File your trademark the day you launch using "TM" is your right from filing date, even before registration completes. For deep-tech startups, patents protect your core innovation. Copyright is automatic for code, designs, and content but registration creates evidentiary value.</p>`,
        category: "Business",
        author: "Admin",
        authorRole: "NyayMitra Editorial",
        date: "January 8, 2026",
        dateShort: "Jan 8, 2026",
        readTime: "7 min read",
        views: "15.6k",
        comments: 43,
        color: "#c9a84c",
        icon: "🚀",
        tags: ["Startup", "Business Law", "Company Registration", "IP"]
    },
    {
        slug: "property-registration-process",
        title: "Property Registration in India: The Complete Process Explained",
        excerpt: "From sale deed to stamp duty to sub-registrar office a complete walkthrough of registering property without surprises or hidden costs.",
        content: `<p class="dropcap">Buying property is one of the largest financial decisions most Indians will ever make. Property registration is the legal act that transfers ownership and creates a permanent public record without it, you have no enforceable ownership, regardless of how much you've paid.</p>
<h2>Why Registration is Mandatory</h2>
<p>Under the Registration Act, 1908, any transaction involving immovable property worth ₹100 or more must be registered. An unregistered sale agreement gives you no legal ownership. Registration makes the sale deed legally valid, prevents multiple sales of the same property (fraud), and is required for home loans and future resale.</p>
<blockquote class="pull-quote">"Never register at below circle rate to save stamp duty. The penalty is 200% of the deficient duty, plus criminal proceedings for tax evasion."</blockquote>
<h2>Stamp Duty State by State</h2>
<p>Stamp duty is calculated on the circle rate (government minimum value) or actual consideration, whichever is higher. Rates vary: Maharashtra (5% men, 4% women), Delhi (4% men, 3% women), Tamil Nadu (7%), UP (7% men, 6% women). Women buyers get a consistent concession across most states.</p>
<h2>Post-Registration: Mutation is Essential</h2>
<p>Registration transfers ownership legally, but mutation (patta/khata transfer) updates government land records to reflect your name. Without mutation, you cannot pay property tax in your name, sell the property later without complications, or establish your ownership for loan purposes.</p>`,
        category: "Property",
        author: "Admin",
        authorRole: "NyayMitra Editorial",
        date: "January 29, 2026",
        dateShort: "Jan 29, 2026",
        readTime: "9 min read",
        views: "14.1k",
        comments: 37,
        color: "#c9a84c",
        icon: "🏛️",
        tags: ["Property", "Registration", "Stamp Duty", "Real Estate"]
    },
    {
        slug: "cybercrime-india-how-to-report",
        title: "Cybercrime in India: How to Report and What to Expect",
        excerpt: "Online fraud, identity theft, phishing, sextortion how to report cybercrimes, which authority to approach, and how to protect evidence.",
        content: `<p class="dropcap">Digital crime is rising faster than the legal system can adapt. Whether you've been scammed online, had your identity stolen, or are facing online harassment, knowing how to report quickly and correctly significantly improves your chances of action and recovery.</p>
<h2>National Cybercrime Portal: Your First Stop</h2>
<p>Report at cybercrime.gov.in immediately. It handles financial fraud, social media crimes, online harassment, and child sexual abuse material (CSAM). For financial fraud, report within the golden hour the first 60 minutes to maximise the chance of transaction freezing by banks. Call the helpline 1930 for immediate assistance.</p>
<blockquote class="pull-quote">"Screenshot everything before you report many cybercriminals delete evidence the moment they suspect a complaint is coming."</blockquote>
<h2>Preserving Evidence</h2>
<p>Before you do anything else: take screenshots of messages, transactions, and profiles. Note URLs, usernames, and time stamps. Download your bank transaction history. Do not delete any messages even threatening ones. Forward suspicious emails as attachments (not screenshots) to preserve email headers investigators need.</p>`,
        category: "Criminal",
        author: "Admin",
        authorRole: "NyayMitra Editorial",
        date: "February 18, 2026",
        dateShort: "Feb 18, 2026",
        readTime: "5 min read",
        views: "22.8k",
        comments: 91,
        color: "#c9a84c",
        icon: "🖥️",
        tags: ["Cybercrime", "Online Fraud", "Digital Safety", "IT Act"]
    },
    {
        slug: "will-making-india-guide",
        title: "How to Write a Valid Will in India Everything You Need to Know",
        excerpt: "Who can make a will, what it must contain, whether registration is required, and how to prevent family disputes after you're gone.",
        content: `<p class="dropcap">A will is the most important legal document most people will ever write, and the one most people put off until it's too late. In India, dying intestate without a will means your assets are distributed according to succession laws that may not reflect your wishes at all.</p>
<h2>Who Can Make a Will?</h2>
<p>Any person of sound mind who is at least 18 years of age can write a will under the Indian Succession Act, 1925. There is no legal requirement to hire a lawyer, though it's strongly recommended for complex estates.</p>
<blockquote class="pull-quote">"An unregistered will is completely valid in India but registration creates an unimpeachable public record that is nearly impossible to challenge."</blockquote>
<h2>Essential Elements</h2>
<p>The will must be in writing, clearly identify the testator (you), list your assets and their intended beneficiaries, appoint an executor to carry out the will's instructions, be signed by you in the presence of two witnesses, and be signed by both witnesses in your presence. Witnesses cannot be beneficiaries a common and costly mistake.</p>`,
        category: "Family",
        author: "Admin",
        authorRole: "NyayMitra Editorial",
        date: "March 10, 2026",
        dateShort: "Mar 10, 2026",
        readTime: "6 min read",
        views: "13.4k",
        comments: 29,
        color: "#c9a84c",
        icon: "📜",
        tags: ["Will", "Succession", "Estate Planning", "Family Law"]
    },
    {
        slug: "gst-small-business-india",
        title: "GST for Small Business Owners: What You Actually Need to Know",
        excerpt: "Registration thresholds, return filing timelines, composition scheme benefits, and the most common compliance mistakes that cost small businesses dearly.",
        content: `<p class="dropcap">GST has been in force since July 2017, but small business owners still routinely make costly mistakes. Whether you're a freelancer, shopkeeper, or service provider, here is what you genuinely need to understand about your GST obligations.</p>
<h2>When Must You Register?</h2>
<p>If your annual aggregate turnover exceeds ₹40 lakh (₹20 lakh for special category states), registration is mandatory. For service providers, the threshold is ₹20 lakh. If you supply goods interstate, registration is mandatory regardless of turnover. E-commerce sellers must also register regardless of turnover.</p>
<blockquote class="pull-quote">"Missing a GST return even with nil liability attracts a ₹50 per day late fee. Set calendar reminders the day you register."</blockquote>
<h2>Composition Scheme</h2>
<p>If your turnover is below ₹1.5 crore, the Composition Scheme lets you pay a flat tax rate (1% for traders, 5% for restaurants, 6% for service providers) instead of regular GST, and file only quarterly returns. The trade-off: you cannot claim Input Tax Credit, and you cannot supply to other states.</p>`,
        category: "Business",
        author: "Admin",
        authorRole: "NyayMitra Editorial",
        date: "April 2, 2026",
        dateShort: "Apr 2, 2026",
        readTime: "8 min read",
        views: "10.3k",
        comments: 47,
        color: "#c9a84c",
        icon: "🧾",
        tags: ["GST", "Small Business", "Tax Compliance", "MSME"]
    },
    {
        slug: "domestic-violence-law-india",
        title: "Domestic Violence Law in India: Rights, Remedies, and How to Seek Help",
        excerpt: "The Protection of Women from Domestic Violence Act, 2005, provides powerful civil remedies beyond prosecution. Here's what they are and how to access them.",
        content: `<p class="dropcap">Domestic violence is one of the most underreported crimes in India, often because survivors don't know the full range of legal remedies available to them. The law provides civil and criminal protections, and accessing either does not require leaving your home or involving police if you choose not to.</p>
<h2>What Counts as Domestic Violence?</h2>
<p>Under the DV Act, 2005, domestic violence includes physical abuse, sexual abuse, emotional or verbal abuse, economic abuse (withholding money, assets, or preventing employment), and threats of harm. It covers women in any domestic relationship wives, mothers, sisters, live-in partners, and women in relationships "in the nature of marriage."</p>
<blockquote class="pull-quote">"You can seek a Protection Order, Residence Order, and Monetary Relief all under one application you do not need to file a criminal FIR to access civil remedies."</blockquote>
<h2>Types of Orders Available</h2>
<p>A Protection Order prohibits the abuser from committing acts of violence. A Residence Order can prevent the abuser from entering your shared household even if the home is in their name. A Monetary Relief Order requires the abuser to pay maintenance, loss of earnings, and medical costs. All applications are heard by a Magistrate within 3 days.</p>`,
        category: "Family",
        author: "Admin",
        authorRole: "NyayMitra Editorial",
        date: "April 21, 2026",
        dateShort: "Apr 21, 2026",
        readTime: "7 min read",
        views: "19.6k",
        comments: 63,
        color: "#c9a84c",
        icon: "🛡️",
        tags: ["Domestic Violence", "Women's Rights", "DV Act", "Family Law"]
    },
    {
        slug: "loan-default-rights-india",
        title: "What Happens If You Default on a Loan? Your Rights as a Borrower",
        excerpt: "SARFAESI notices, recovery agents, loan settlement what lenders can and cannot do when you default, and how to protect yourself legally.",
        content: `<p class="dropcap">A loan default is stressful, but many borrowers don't know their legal rights and lenders sometimes take advantage of that ignorance. Whether it's a home loan, personal loan, or credit card, you have significant legal protections even after missing payments.</p>
<h2>The Recovery Process What to Expect</h2>
<p>After 3 consecutive missed EMIs, the account is classified as a Non-Performing Asset (NPA). The lender will first send written notices, then escalate to phone calls, field visits, and eventually legal action. For secured loans (home, car), the lender can invoke SARFAESI Act, 2002, after 90 days of default.</p>
<blockquote class="pull-quote">"A SARFAESI notice is not the end you have 60 days to respond and raise objections before the lender can take physical possession of secured property."</blockquote>
<h2>Recovery Agents Their Limits Under Law</h2>
<p>Recovery agents cannot visit your home between 7 PM and 7 AM. They cannot use abusive language, physical threats, or harassment. They must carry an authorisation letter from the bank at all times. RBI's Fair Practices Code explicitly prohibits all of these behaviours. Violations can be reported directly to the RBI's consumer complaint portal (cms.rbi.org.in).</p>`,
        category: "Consumer",
        author: "Admin",
        authorRole: "NyayMitra Editorial",
        date: "May 14, 2026",
        dateShort: "May 14, 2026",
        readTime: "6 min read",
        views: "17.2k",
        comments: 58,
        color: "#c9a84c",
        icon: "💳",
        tags: ["Loan", "Banking", "Borrower Rights", "RBI"]
    },
]

/* ─── Post Illustration ───────────────────────────────────────────────────── */
const PostArt = ({ icon, h = 220 }: { icon: string; h?: number }) => (
    <div style={{
        height: h, width: "100%", overflow: "hidden",
        background: "linear-gradient(145deg, rgba(201,168,76,0.1) 0%, rgba(201,168,76,0.04) 100%)",
        borderBottom: "1px solid var(--ink-8)",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
    }}>
        <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `repeating-linear-gradient(0deg, rgba(201,168,76,0.06) 0px, rgba(201,168,76,0.06) 1px, transparent 1px, transparent 36px), repeating-linear-gradient(90deg, rgba(201,168,76,0.06) 0px, rgba(201,168,76,0.06) 1px, transparent 1px, transparent 36px)`,
        }} />
        <div style={{
            position: "absolute",
            width: h * 1.4, height: h * 1.4,
            border: "1px solid rgba(201,168,76,0.12)", borderRadius: "50%",
            top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        }} />
        <div style={{
            position: "absolute",
            width: h * 0.85, height: h * 0.85,
            border: "1px solid rgba(201,168,76,0.18)", borderRadius: "50%",
            top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        }} />
        <span style={{ fontSize: h * 0.22, position: "relative", zIndex: 1, filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.1))" }}>{icon}</span>
    </div>
)

/* ─── Blog Reader ─────────────────────────────────────────────────────────── */
const BlogReader = ({ post, onClose }: { post: Post; onClose: () => void }) => {
    const [saved, setSaved] = useState(false)
    const [progress, setProgress] = useState(0)
    const readerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.body.style.overflow = "hidden"
        const el = readerRef.current
        if (!el) return
        const onScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = el
            setProgress((scrollTop / (scrollHeight - clientHeight)) * 100)
        }
        el.addEventListener("scroll", onScroll)
        return () => { document.body.style.overflow = ""; el.removeEventListener("scroll", onScroll) }
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.28 }}
            ref={readerRef}
            style={{ position: "fixed", inset: 0, background: "var(--white)", zIndex: 1000, overflowY: "auto" }}
        >
            {/* Progress bar */}
            <div style={{ position: "sticky", top: 0, left: 0, right: 0, height: 3, background: "var(--ink-8)", zIndex: 10 }}>
                <div style={{ height: "100%", background: "linear-gradient(90deg, var(--gold-dk), var(--gold), var(--gold-lt))", width: `${progress}%`, transition: "width 0.1s linear" }} />
            </div>

            {/* Reader nav */}
            <div style={{
                position: "sticky", top: 3, background: "rgba(255,254,251,0.97)",
                backdropFilter: "blur(12px)", borderBottom: "1px solid var(--ink-7)", zIndex: 9, padding: "0 16px",
            }}>
                <div style={{ maxWidth: 860, margin: "0 auto", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <button onClick={onClose} style={{
                        display: "flex", alignItems: "center", gap: 8,
                        background: "none", border: "none", cursor: "pointer",
                        fontFamily: "var(--mono)", fontSize: "9px", fontWeight: 500,
                        color: "var(--ink-4)", letterSpacing: "0.12em", textTransform: "uppercase",
                    }}>
                        <ChevronLeft size={13} /> Back to Blog
                    </button>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--ink-5)" }}>{post.readTime}</span>
                        <button onClick={() => setSaved(!saved)} style={{
                            display: "flex", alignItems: "center", gap: 6,
                            background: saved ? "var(--gold-pale)" : "transparent",
                            color: saved ? "var(--gold-dk)" : "var(--ink-4)",
                            border: `1px solid ${saved ? "var(--gold)" : "var(--ink-7)"}`,
                            padding: "6px 14px", cursor: "pointer",
                            fontFamily: "var(--mono)", fontSize: "9px", letterSpacing: "0.1em",
                            textTransform: "uppercase", transition: "all 0.2s",
                        }}>
                            <Bookmark size={12} fill={saved ? "var(--gold)" : "none"} />
                            {saved ? "Saved" : "Save"}
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 16px 96px" }}>
                {/* Category */}
                <span className="cat-badge" style={{ marginBottom: 20, display: "inline-block" }}>{post.category}</span>

                {/* Headline */}
                <h1 style={{
                    fontFamily: "var(--serif)", fontSize: "clamp(28px, 4.5vw, 48px)",
                    fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.025em",
                    color: "var(--ink)", marginTop: 14, marginBottom: 18,
                }}>{post.title}</h1>

                {/* Dek */}
                <p style={{
                    fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "16px",
                    color: "var(--ink-3)", lineHeight: 1.65, marginBottom: 24,
                    borderLeft: "3px solid var(--gold)", paddingLeft: 16,
                }}>{post.excerpt}</p>

                {/* Double rule */}
                <div style={{ borderTop: "3px solid var(--ink)", borderBottom: "1px solid var(--ink)", paddingTop: 3, marginBottom: 22 }} />

                {/* Byline */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{
                            width: 40, height: 40,
                            background: "var(--ink)", border: "1px solid var(--gold-dk)",
                            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px",
                        }}>{post.icon}</div>
                        <div>
                            <div style={{ fontFamily: "var(--sans)", fontSize: "13px", fontWeight: 600, color: "var(--ink)" }}>
                                By {post.author}
                            </div>
                            <div style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--ink-5)", letterSpacing: "0.06em" }}>
                                {post.authorRole}
                            </div>
                        </div>
                    </div>
                    <div className="post-meta">
                        <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Calendar size={11} />{post.date}</span>
                        <span className="sep">·</span>
                        <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Clock size={11} />{post.readTime}</span>
                        <span className="sep">·</span>
                        <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Eye size={11} />{post.views}</span>
                        <span className="sep">·</span>
                        <span style={{ display: "flex", alignItems: "center", gap: 5 }}><MessageCircle size={11} />{post.comments} comments</span>
                    </div>
                </div>

                {/* Hero art */}
                <PostArt icon={post.icon} h={340} />

                {/* Share row */}
                <div style={{ display: "flex", gap: 8, margin: "24px 0", paddingBottom: 24, borderBottom: "1px solid var(--ink-7)", flexWrap: "wrap" }}>
                    <button className="share-btn"><Twitter size={12} />Tweet</button>
                    <button className="share-btn"><Linkedin size={12} />Share</button>
                    <button className="share-btn"><Facebook size={12} />Post</button>
                    <button className="share-btn" style={{ marginLeft: "auto" }}><Share2 size={12} />Copy Link</button>
                </div>

                {/* Article body */}
                <div className="reader-body" dangerouslySetInnerHTML={{ __html: post.content }} />

                {/* Tags */}
                <div style={{ marginTop: 48, paddingTop: 24, borderTop: "2px solid var(--ink)", display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                    <Tag size={13} color="var(--gold-dk)" />
                    {post.tags.map(t => (
                        <span key={t} className="cat-badge">{t}</span>
                    ))}
                </div>

                {/* Author box */}
                <div style={{ marginTop: 40, background: "var(--ink-9)", border: "1px solid var(--ink-7)", padding: "24px" }}>
                    <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
                        <div style={{
                            width: 52, height: 52, background: "var(--ink)", flexShrink: 0,
                            border: "1px solid var(--gold-dk)",
                            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px",
                        }}>{post.icon}</div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontFamily: "var(--serif)", fontSize: "18px", fontWeight: 600, marginBottom: 4 }}>About the Author</div>
                            <div style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--gold-dk)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
                                {post.author} · {post.authorRole}
                            </div>
                            <p style={{ fontFamily: "var(--sans)", fontSize: "13px", color: "var(--ink-4)", lineHeight: 1.7 }}>
                                NyayMitra's editorial team writes clear, accurate legal guides for Indian citizens. All articles are reviewed for factual accuracy. This is general information, not legal advice for your specific situation, consult a qualified lawyer.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Newsletter CTA */}
                <div style={{ marginTop: 36, background: "var(--ink)", padding: "32px 20px" }}>
                    <div style={{ display: "flex", gap: 14, alignItems: "flex-start", flexWrap: "wrap" }}>
                        <Mail size={20} color="var(--gold)" style={{ flexShrink: 0, marginTop: 3 }} />
                        <div style={{ flex: 1, minWidth: "200px" }}>
                            <h3 style={{ fontFamily: "var(--serif)", fontSize: "20px", fontWeight: 600, color: "var(--white)", marginBottom: 8 }}>
                                Get weekly legal insights in your inbox
                            </h3>
                            <p style={{ fontFamily: "var(--sans)", fontSize: "12.5px", color: "rgba(255,255,255,0.45)", lineHeight: 1.65, marginBottom: 16 }}>
                                Join 18,000+ citizens who trust NyayMitra for plain-language legal news every Saturday morning.
                            </p>
                            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                <input type="email" placeholder="your@email.com" style={{
                                    flex: 1, minWidth: 180, padding: "10px 14px",
                                    background: "rgba(255,255,255,0.07)",
                                    border: "1px solid rgba(201,168,76,0.3)",
                                    color: "white", fontFamily: "var(--sans)", fontSize: "13px", outline: "none",
                                }} />
                                <button className="btn-gold" style={{ whiteSpace: "nowrap" }}>Subscribe Free</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function BlogPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [activeCategory, setActiveCategory] = useState("All")
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedPost, setSelectedPost] = useState<Post | null>(null)
    const [showBackTop, setShowBackTop] = useState(false)
    const [currentDate, setCurrentDate] = useState<string>("")

    // Fix hydration by setting date only on client
    useEffect(() => {
        setCurrentDate(new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }))
    }, [])

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 10)
            setShowBackTop(window.scrollY > 400)
        }
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    const filtered = POSTS.filter(p => {
        const matchCat = activeCategory === "All" || p.category === activeCategory
        const q = searchQuery.toLowerCase()
        const matchQ = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
        return matchCat && matchQ
    })

    const ticker = [...POSTS, ...POSTS]

    return (
        <>
            <GlobalStyles />
            <div id="reading-bar" style={{ width: 0 }} />

            <div style={{ background: "var(--white)", minHeight: "100vh" }}>

                {/* ── TOP BAR (Only rendered on client to avoid hydration mismatch) ── */}
                <div className="nav-top">
                    <div className="nav-top-inner">
                        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                            <a href="/about">About</a>
                            <a href="/contact">Contact</a>
                            {/* <a href="/disclaimer">Disclaimer</a> */}
                        </div>
                        {currentDate && (
                            <div style={{
                                fontFamily: "var(--mono)",
                                fontSize: "9px",
                                color: "var(--gold-dk)",
                                letterSpacing: "0.1em"
                            }}>
                                {currentDate}
                            </div>
                        )}
                        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                            <a href="#"><Rss size={11} color="var(--gold-dk)" /></a>
                            <a href="#"><Twitter size={11} color="var(--gold-dk)" /></a>
                            <a href="#"><Linkedin size={11} color="var(--gold-dk)" /></a>
                        </div>
                    </div>
                </div>

                {/* ── MASTHEAD ── */}
                <div style={{ background: "var(--white)", borderBottom: "1px solid var(--ink-7)", padding: "22px 16px" }}>
                    <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center", position: "relative" }}>
                        {/* Ticker left - hidden on mobile via CSS */}
                        <div className="ticker-left" style={{
                            position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
                            display: "flex", alignItems: "center", overflow: "hidden", width: 240,
                        }}>
                            <span style={{
                                background: "var(--ink)", color: "var(--gold-lt)",
                                fontFamily: "var(--mono)", fontSize: "7.5px", fontWeight: 500,
                                letterSpacing: "0.16em", textTransform: "uppercase",
                                padding: "4px 10px", whiteSpace: "nowrap", flexShrink: 0,
                            }}>Latest</span>
                            <div style={{ overflow: "hidden", flex: 1 }}>
                                <div className="ticker-inner">
                                    {ticker.map((p, i) => (
                                        <span key={i} style={{
                                            fontFamily: "var(--mono)", fontSize: "9px",
                                            color: "var(--ink-4)", padding: "0 18px", whiteSpace: "nowrap",
                                        }}>{p.title} ·</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Masthead title */}
                        <div>
                            <h1 style={{
                                fontFamily: "var(--serif)", fontSize: "clamp(42px, 7vw, 80px)",
                                fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 0.9, color: "var(--ink)",
                            }}>NyayMitra</h1>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginTop: 10, flexWrap: "wrap" }}>
                                <div style={{ height: 1, width: 60, background: "linear-gradient(90deg, transparent, var(--gold))" }} />
                                <Scale style={{ width: 10, height: 10, color: "var(--gold)" }} />
                                <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "12px", color: "var(--ink-5)", letterSpacing: "0.06em" }}>
                                    Legal Knowledge for Every Citizen · Est. 2025
                                </p>
                                <Scale style={{ width: 10, height: 10, color: "var(--gold)" }} />
                                <div style={{ height: 1, width: 60, background: "linear-gradient(90deg, var(--gold), transparent)" }} />
                            </div>
                        </div>

                        {/* Subscribe button - hidden on mobile via CSS */}
                        <div className="subscribe-right" style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)" }}>
                            <button className="btn-gold" style={{ gap: 6, padding: "9px 18px" }}>
                                <Rss size={11} /> Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── MAIN NAV ── */}
                <nav className="nav-main" style={{ boxShadow: scrolled ? "0 2px 20px rgba(12,11,9,0.08)" : "none", transition: "box-shadow 0.25s" }}>
                    <div className="nav-main-inner">
                        <Link href="/" style={{ textDecoration: "none", flexShrink: 0, display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{
                                width: 34, height: 34, background: "var(--ink)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                                <Scale size={15} color="var(--gold)" />
                            </div>
                            <span style={{ fontFamily: "var(--serif)", fontSize: "17px", fontWeight: 600, color: "var(--ink)" }}>NyayMitra</span>
                        </Link>

                        <div className="desktop-nav" style={{ gap: 4, flex: 1, marginLeft: 16 }}>
                            {[["Home", "/"], ["Services", "/services"], ["Find Lawyers", "/lawyers"], ["Blog", "/blog"], ["Legal AI", "/legal-ai"]].map(([l, h]) => (
                                <Link key={l} href={h} className={`nav-link ${l === "Blog" ? "active" : ""}`} style={{ marginRight: 4 }}>{l}</Link>
                            ))}
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: "auto" }}>
                            <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: 4 }}>
                                <Search size={16} color="var(--ink-4)" />
                            </button>
                            <Link href="/legal-ai" className="btn-ink" style={{ gap: 6, padding: "8px 16px" }}>
                                <Sparkles size={11} /> Legal AI
                            </Link>
                            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    <div className={`mobile-dropdown ${mobileMenuOpen ? "open" : ""}`}
                        style={{ background: "var(--white)", borderTop: "1px solid var(--ink-7)", padding: "16px 16px" }}>
                        {[["Home", "/", Home], ["Services", "/services", BookText], ["Find Lawyers", "/lawyers", Shield], ["Blog", "/blog", BookText], ["Legal AI", "/legal-ai", Sparkles]].map(([l, h, Icon]: any) => (
                            <Link key={l} href={h} style={{
                                display: "flex", alignItems: "center", gap: 10, padding: "12px 0",
                                borderBottom: "1px solid var(--ink-8)", fontFamily: "var(--sans)",
                                fontSize: "14px", color: "var(--ink-2)", textDecoration: "none",
                            }} onClick={() => setMobileMenuOpen(false)}>
                                <Icon size={14} color="var(--gold-dk)" /> {l}
                            </Link>
                        ))}
                    </div>
                </nav>

                {/* ── CATEGORY NAV ── */}
                <div className="nav-cats">
                    <div className="nav-cats-inner">
                        {CATEGORIES.map(c => (
                            <button key={c} className={`cat-tab ${activeCategory === c ? "active" : ""}`} onClick={() => setActiveCategory(c)}>{c}</button>
                        ))}
                    </div>
                </div>

                {/* ── HERO SECTION ── */}
                {activeCategory === "All" && !searchQuery && (
                    <section style={{ background: "var(--white)", borderBottom: "1px solid var(--ink-7)" }}>
                        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px" }}>
                            {/* Section header */}
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid var(--ink-7)", flexWrap: "wrap", gap: 8 }}>
                                <span className="section-label" style={{ marginBottom: 0, paddingBottom: 0, borderBottom: "none" }}>Top Stories</span>
                                <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--gold-dk)", letterSpacing: "0.08em" }}>
                                    Updated {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                                </span>
                            </div>

                            <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 0, minHeight: 500 }}>
                                {/* Lead story */}
                                <div className="hero-lead" onClick={() => setSelectedPost(POSTS[0])} style={{
                                    borderRight: "1px solid var(--ink-7)", paddingRight: 36,
                                    paddingTop: 28, paddingBottom: 28, cursor: "pointer",
                                    transition: "background 0.2s",
                                }}
                                    onMouseEnter={e => e.currentTarget.style.background = "var(--ink-9)"}
                                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                                >
                                    <PostArt icon={POSTS[0].icon} h={280} />
                                    <div style={{ marginTop: 20 }}>
                                        <span className="cat-badge" style={{ marginBottom: 14, display: "inline-block" }}>{POSTS[0].category}</span>
                                        <h2 style={{
                                            fontFamily: "var(--serif)", fontSize: "clamp(24px, 3.5vw, 40px)",
                                            fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.025em",
                                            color: "var(--ink)", marginBottom: 12,
                                        }}>{POSTS[0].title}</h2>
                                        <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "14.5px", color: "var(--ink-3)", lineHeight: 1.65, marginBottom: 16 }}>
                                            {POSTS[0].excerpt}
                                        </p>
                                        <div className="post-meta">
                                            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                                <User size={10} /> By <strong style={{ color: "var(--ink-3)", fontWeight: 600 }}>{POSTS[0].author}</strong>
                                            </span>
                                            <span className="sep">·</span>
                                            <span>{POSTS[0].date}</span>
                                            <span className="sep">·</span>
                                            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={10} />{POSTS[0].readTime}</span>
                                            <span className="sep">·</span>
                                            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Eye size={10} />{POSTS[0].views}</span>
                                            <span className="sep">·</span>
                                            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><MessageCircle size={10} />{POSTS[0].comments}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Secondary stack */}
                                <div className="hero-stack" style={{ paddingLeft: 32, display: "flex", flexDirection: "column" }}>
                                    {POSTS.slice(1, 5).map((p, i) => (
                                        <div key={p.slug} onClick={() => setSelectedPost(p)} style={{
                                            display: "flex", gap: 14, padding: "16px 0",
                                            borderBottom: i < 3 ? "1px solid var(--ink-8)" : "none",
                                            cursor: "pointer", transition: "background 0.15s",
                                        }}
                                            onMouseEnter={e => e.currentTarget.style.background = "var(--ink-9)"}
                                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                                        >
                                            <div style={{
                                                width: 72, height: 72, flexShrink: 0,
                                                background: "linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))",
                                                border: "1px solid rgba(201,168,76,0.2)",
                                                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px",
                                            }}>{p.icon}</div>
                                            <div style={{ flex: 1 }}>
                                                <span className="cat-badge" style={{ fontSize: "7.5px", padding: "2px 7px", marginBottom: 6, display: "inline-block" }}>
                                                    {p.category}
                                                </span>
                                                <h3 style={{
                                                    fontFamily: "var(--serif)", fontSize: "14px", fontWeight: 600,
                                                    lineHeight: 1.3, color: "var(--ink)", marginBottom: 6,
                                                    display: "-webkit-box", WebkitLineClamp: 2,
                                                    WebkitBoxOrient: "vertical" as const, overflow: "hidden",
                                                }}>{p.title}</h3>
                                                <div className="post-meta">
                                                    <span>{p.dateShort}</span>
                                                    <span className="sep">·</span>
                                                    <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Eye size={9} />{p.views}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* ── MAIN LAYOUT ── */}
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 16px 80px" }}>
                    <div className="layout-cols">

                        {/* Main column */}
                        <div>
                            {/* Search */}
                            <div style={{ position: "relative", marginBottom: 28 }}>
                                <Search style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", width: 14, height: 14, color: "var(--ink-5)" }} />
                                <input className="search-field" placeholder="Search articles, topics, categories…"
                                    value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                                {searchQuery && (
                                    <button onClick={() => setSearchQuery("")} style={{
                                        position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                                        background: "var(--ink-7)", border: "none", borderRadius: "50%", width: 20, height: 20,
                                        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                                    }}><X size={10} color="var(--ink-4)" /></button>
                                )}
                            </div>

                            {/* Results info */}
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 0, flexWrap: "wrap", gap: 8 }}>
                                <span className="section-label" style={{ marginBottom: 0, paddingBottom: 8 }}>
                                    {activeCategory !== "All" ? activeCategory : "All Articles"}
                                    {searchQuery ? ` — "${searchQuery}"` : ""}
                                </span>
                                <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--ink-5)" }}>{filtered.length} articles</span>
                            </div>
                            <div style={{ height: 2, background: "var(--ink)", marginBottom: 28 }} />

                            {/* Cards */}
                            <AnimatePresence mode="popLayout">
                                {filtered.length === 0 ? (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center", padding: "60px 20px" }}>
                                        <div style={{ fontSize: "36px", marginBottom: 16 }}>🔍</div>
                                        <h3 style={{ fontFamily: "var(--serif)", fontSize: "22px", color: "var(--ink)", marginBottom: 8 }}>No articles found</h3>
                                        <p style={{ color: "var(--ink-4)", fontSize: "13px", marginBottom: 20 }}>Try a different search term or category</p>
                                        <button className="btn-outline" onClick={() => { setSearchQuery(""); setActiveCategory("All") }}>
                                            Clear Filters
                                        </button>
                                    </motion.div>
                                ) : (
                                    <div className="cards-2col">
                                        {filtered.map((post, i) => (
                                            <motion.article
                                                key={post.slug} layout
                                                initial={{ opacity: 0, y: 16 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3, delay: i * 0.04 }}
                                                className="card-standard"
                                                onClick={() => setSelectedPost(post)}
                                            >
                                                <PostArt icon={post.icon} h={168} />
                                                <div style={{ paddingTop: 16 }}>
                                                    <div style={{ marginBottom: 10, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                                                        <span className="cat-badge">{post.category}</span>
                                                    </div>
                                                    <h3 className="card-title" style={{
                                                        fontFamily: "var(--serif)", fontSize: "17px", fontWeight: 600,
                                                        lineHeight: 1.25, color: "var(--ink)", marginBottom: 8,
                                                        transition: "color 0.2s",
                                                        display: "-webkit-box", WebkitLineClamp: 2,
                                                        WebkitBoxOrient: "vertical" as const, overflow: "hidden",
                                                    }}>{post.title}</h3>
                                                    <p style={{
                                                        fontFamily: "var(--sans)", fontSize: "12.5px", color: "var(--ink-4)",
                                                        lineHeight: 1.65, marginBottom: 14,
                                                        display: "-webkit-box", WebkitLineClamp: 2,
                                                        WebkitBoxOrient: "vertical" as const, overflow: "hidden",
                                                    }}>{post.excerpt}</p>
                                                    <div style={{ height: 1, background: "var(--ink-8)", marginBottom: 12 }} />
                                                    <div className="post-meta" style={{ justifyContent: "space-between", flexWrap: "wrap" }}>
                                                        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                                                            <div style={{
                                                                width: 20, height: 20, background: "var(--ink)",
                                                                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px",
                                                            }}>{post.icon}</div>
                                                            <span style={{ fontFamily: "var(--sans)", fontSize: "11px", fontWeight: 500, color: "var(--ink-3)" }}>
                                                                {post.author}
                                                            </span>
                                                        </div>
                                                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                            <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Calendar size={9} />{post.dateShort}</span>
                                                            <span className="sep">·</span>
                                                            <span style={{ display: "flex", alignItems: "center", gap: 3 }}><MessageCircle size={9} />{post.comments}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.article>
                                        ))}
                                    </div>
                                )}
                            </AnimatePresence>

                            {/* Pagination */}
                            {filtered.length > 0 && (
                                <div style={{ marginTop: 48, paddingTop: 28, borderTop: "1px solid var(--ink-7)", display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
                                    <button className="btn-outline" style={{ padding: "8px 16px", fontSize: "11px" }}>← Newer</button>
                                    {[1, 2, 3].map(n => (
                                        <button key={n} style={{
                                            width: 36, height: 36,
                                            background: n === 1 ? "var(--ink)" : "transparent",
                                            color: n === 1 ? "var(--white)" : "var(--ink-4)",
                                            border: `1.5px solid ${n === 1 ? "var(--ink)" : "var(--ink-7)"}`,
                                            fontFamily: "var(--mono)", fontSize: "11px", cursor: "pointer", transition: "all 0.15s",
                                        }}>{n}</button>
                                    ))}
                                    <button className="btn-outline" style={{ padding: "8px 16px", fontSize: "11px" }}>Older →</button>
                                </div>
                            )}
                        </div>

                        {/* ── SIDEBAR ── */}
                        <aside className="sidebar" style={{ position: "sticky", top: 120 }}>

                            {/* About */}
                            <div className="widget">
                                <span className="section-label">About NyayMitra</span>
                                <div style={{ background: "var(--ink)", padding: "18px", marginBottom: 14, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                                    <Scale size={26} color="var(--gold)" />
                                    <div>
                                        <div style={{ fontFamily: "var(--serif)", fontSize: "15px", fontWeight: 600, color: "white" }}>NyayMitra Blog</div>
                                        <div style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--gold-dk)", letterSpacing: "0.08em" }}>Legal Knowledge for Every Indian</div>
                                    </div>
                                </div>
                                <p style={{ fontFamily: "var(--sans)", fontSize: "12.5px", lineHeight: 1.7, color: "var(--ink-4)" }}>
                                    Plain-language legal guides written and reviewed by practicing advocates. General information only consult a lawyer for advice specific to your situation.
                                </p>
                            </div>

                            {/* Most Read */}
                            <div className="widget">
                                <span className="section-label">Most Read</span>
                                {[...POSTS].sort((a, b) => parseFloat(b.views) - parseFloat(a.views)).slice(0, 5).map((p, i) => (
                                    <div key={p.slug} className="card-compact" onClick={() => setSelectedPost(p)}>
                                        <span style={{ fontFamily: "var(--serif)", fontSize: "26px", fontWeight: 700, color: "var(--ink-7)", lineHeight: 1, flexShrink: 0, width: 26 }}>{i + 1}</span>
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{
                                                fontFamily: "var(--serif)", fontSize: "13px", fontWeight: 600,
                                                lineHeight: 1.3, color: "var(--ink)", marginBottom: 4, transition: "color 0.2s",
                                                display: "-webkit-box", WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical" as const, overflow: "hidden",
                                            }}>{p.title}</h4>
                                            <div className="post-meta">
                                                <span>{p.dateShort}</span>
                                                <span className="sep">·</span>
                                                <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Eye size={9} />{p.views}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Newsletter */}
                            <div className="widget">
                                <div style={{ background: "var(--ink)", padding: "22px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
                                        <div style={{ width: 36, height: 36, background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <Mail size={15} color="var(--gold)" />
                                        </div>
                                        <h3 style={{ fontFamily: "var(--serif)", fontSize: "17px", fontWeight: 600, color: "white", lineHeight: 1.2 }}>
                                            Legal updates,<br />every week.
                                        </h3>
                                    </div>
                                    <p style={{ fontFamily: "var(--sans)", fontSize: "11.5px", color: "rgba(255,255,255,0.4)", lineHeight: 1.65, marginBottom: 16 }}>
                                        18,000+ citizens trust NyayMitra. No spam. Unsubscribe anytime.
                                    </p>
                                    <input type="email" placeholder="your@email.com" style={{
                                        width: "100%", padding: "9px 12px", marginBottom: 8,
                                        background: "rgba(255,255,255,0.07)",
                                        border: "1px solid rgba(201,168,76,0.25)",
                                        color: "white", fontFamily: "var(--sans)", fontSize: "12px", outline: "none",
                                    }} />
                                    <button className="btn-gold" style={{ width: "100%", justifyContent: "center" }}>
                                        Subscribe Free
                                    </button>
                                    <p style={{ fontFamily: "var(--mono)", fontSize: "8.5px", color: "rgba(255,255,255,0.2)", textAlign: "center", marginTop: 10, letterSpacing: "0.06em" }}>
                                        No spam. Unsubscribe anytime.
                                    </p>
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="widget">
                                <span className="section-label">Categories</span>
                                {CATEGORIES.filter(c => c !== "All").map(cat => {
                                    const count = POSTS.filter(p => p.category === cat).length
                                    return (
                                        <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                                            display: "flex", alignItems: "center", justifyContent: "space-between",
                                            width: "100%", background: "transparent", border: "none",
                                            padding: "9px 0", borderBottom: "1px dashed var(--ink-8)",
                                            cursor: "pointer", transition: "all 0.15s",
                                            fontFamily: "var(--sans)", fontSize: "13px",
                                            color: activeCategory === cat ? "var(--gold-dk)" : "var(--ink-3)",
                                            fontWeight: activeCategory === cat ? 600 : 400, textAlign: "left",
                                        }}
                                            onMouseEnter={e => { if (activeCategory !== cat) e.currentTarget.style.color = "var(--ink)" }}
                                            onMouseLeave={e => { if (activeCategory !== cat) e.currentTarget.style.color = "var(--ink-3)" }}
                                        >
                                            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                <span style={{
                                                    width: 6, height: 6,
                                                    background: activeCategory === cat ? "var(--gold)" : "var(--ink-6)",
                                                    flexShrink: 0,
                                                }} />
                                                {cat}
                                            </span>
                                            <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--ink-5)", background: "var(--ink-9)", padding: "1px 7px" }}>{count}</span>
                                        </button>
                                    )
                                })}
                            </div>

                            {/* Tags cloud */}
                            <div className="widget">
                                <span className="section-label">Topics</span>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                    {Array.from(new Set(POSTS.flatMap(p => p.tags))).slice(0, 18).map(tag => (
                                        <span key={tag} className="cat-badge" style={{ cursor: "pointer", transition: "all 0.15s" }}
                                            onMouseEnter={e => {
                                                (e.currentTarget as HTMLSpanElement).style.background = "var(--ink)";
                                                (e.currentTarget as HTMLSpanElement).style.color = "var(--gold-lt)";
                                                (e.currentTarget as HTMLSpanElement).style.borderColor = "var(--gold-dk)";
                                            }}
                                            onMouseLeave={e => {
                                                (e.currentTarget as HTMLSpanElement).style.background = "var(--gold-pale)";
                                                (e.currentTarget as HTMLSpanElement).style.color = "var(--gold-dk)";
                                                (e.currentTarget as HTMLSpanElement).style.borderColor = "rgba(201,168,76,0.3)";
                                            }}
                                        >{tag}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Contact */}
                            <div className="widget" style={{ borderBottom: "none" }}>
                                <span className="section-label">Contact Us</span>
                                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                    {[[Mail, "supportt@nyaymitra.tech"], [Phone, "+91 79705 96183"], [Globe, "nyaymitra.tech"]].map(([Icon, val]: any) => (
                                        <div key={val} style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                                            <Icon size={12} color="var(--gold-dk)" />
                                            <span style={{ fontFamily: "var(--sans)", fontSize: "12px", color: "var(--ink-3)" }}>{val}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>

                {/* ── CTA BAND ── */}
                <section style={{ background: "var(--ink)", padding: "72px 16px", position: "relative", overflow: "hidden", borderTop: "3px solid var(--gold-dk)" }}>
                    <div style={{
                        position: "absolute", inset: 0,
                        backgroundImage: "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)",
                        backgroundSize: "64px 64px",
                    }} />
                    <div style={{
                        position: "absolute", left: "50%", top: 0, transform: "translateX(-50%)",
                        width: "70%", height: 1, background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
                    }} />
                    <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1, padding: "0 16px" }}>
                        <span style={{
                            display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24,
                            background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)",
                            padding: "6px 16px", fontFamily: "var(--mono)", fontSize: "8.5px",
                            color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.16em",
                        }}>
                            <Sparkles size={10} /> AI-Powered Legal Assistance
                        </span>
                        <h2 style={{
                            fontFamily: "var(--serif)", fontSize: "clamp(28px, 5vw, 50px)",
                            fontWeight: 600, color: "rgba(255,255,255,0.92)",
                            lineHeight: 1.12, letterSpacing: "-0.025em", marginBottom: 16,
                        }}>
                            Reading about the law is the first step.<br />
                            <span className="gold-text" style={{ fontStyle: "italic", fontWeight: 300 }}>Acting on it is the second.</span>
                        </h2>
                        <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "15px", color: "rgba(255,255,255,0.4)", lineHeight: 1.8, marginBottom: 36, maxWidth: 540, margin: "0 auto 36px" }}>
                            Use NyayMitra's AI legal assistant to draft documents, calculate stamp duty, and get personalised guidance in minutes, in your language.
                        </p>
                        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                            <Link href="/legal-ai" className="btn-gold">Try Legal AI Free <ArrowRight size={13} /></Link>
                            <Link href="/services" style={{
                                display: "inline-flex", alignItems: "center", gap: 8,
                                background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.6)",
                                fontFamily: "var(--sans)", fontSize: "12px", fontWeight: 600,
                                letterSpacing: "0.06em", textTransform: "uppercase",
                                padding: "10px 22px", border: "1px solid rgba(255,255,255,0.1)",
                                cursor: "pointer", transition: "all 0.2s", textDecoration: "none",
                            }}>Explore Services <ChevronRight size={13} /></Link>
                        </div>
                    </div>
                </section>

                {/* ── FOOTER ── */}
                <footer style={{ background: "var(--ink-2)", padding: "48px 16px 28px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, paddingBottom: 40, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                            <div>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                                    <Scale size={18} color="var(--gold)" />
                                    <span style={{ fontFamily: "var(--serif)", fontSize: "18px", fontWeight: 600, color: "white" }}>NyayMitra</span>
                                </div>
                                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", lineHeight: 1.7, maxWidth: 240 }}>
                                    Empowering citizens with accessible legal knowledge and technology driven solutions since 2024.
                                </p>
                                <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
                                    {[Twitter, Linkedin, Facebook].map((Icon, i) => (
                                        <button key={i} style={{ width: 30, height: 30, background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                                            <Icon size={12} color="var(--gold-dk)" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div style={{ fontFamily: "var(--mono)", fontSize: "8.5px", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold-dk)", marginBottom: 16 }}>Site</div>
                                {[["Home", "/"], ["Blog", "/blog"], ["Services", "/services"], ["Find Lawyers", "/lawyers"], ["Legal AI", "/legal-ai"], ["About", "/about"]].map(([l, h]) => (
                                    <Link key={l} href={h} style={{ display: "block", fontSize: "13px", color: "rgba(255,255,255,0.35)", textDecoration: "none", padding: "4px 0" }}>{l}</Link>
                                ))}
                            </div>
                            <div>
                                <div style={{ fontFamily: "var(--mono)", fontSize: "8.5px", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold-dk)", marginBottom: 16 }}>Legal</div>
                                {[["Disclaimer", "/disclaimer"], ["Privacy Policy", "/privacy-policy"], ["Terms of Use", "/terms"], ["Cookie Policy", "/cookies"]].map(([l, h]) => (
                                    <Link key={l} href={h} style={{ display: "block", fontSize: "13px", color: "rgba(255,255,255,0.35)", textDecoration: "none", padding: "4px 0" }}>{l}</Link>
                                ))}
                            </div>
                            <div>
                                <div style={{ fontFamily: "var(--mono)", fontSize: "8.5px", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold-dk)", marginBottom: 16 }}>Disclaimer</div>
                                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.22)", lineHeight: 1.7 }}>
                                    Content on NyayMitra is for general informational purposes only and does not constitute legal advice. Always consult a qualified lawyer for your specific situation.
                                </p>
                            </div>
                        </div>
                        <div style={{ paddingTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                            <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em" }}>
                                © {new Date().getFullYear()} NyayMitra. All rights reserved.
                            </span>
                            <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "rgba(201,168,76,0.3)", letterSpacing: "0.06em" }}>
                                Made with ♥ for every Indian citizen
                            </span>
                        </div>
                    </div>
                </footer>
            </div>

            {/* Back to top */}
            <button className={`back-top ${showBackTop ? "visible" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <ChevronUp size={16} />
            </button>

            {/* Blog Reader */}
            <AnimatePresence>
                {selectedPost && <BlogReader post={selectedPost} onClose={() => setSelectedPost(null)} />}
            </AnimatePresence>
        </>
    )
}