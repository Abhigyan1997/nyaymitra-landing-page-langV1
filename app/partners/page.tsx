"use client"

import { useState, useEffect, useRef } from "react"
import {
    Scale, Menu, X, ChevronDown, ChevronRight, ArrowRight,
    Star, Shield, Zap, CheckCircle, BadgeCheck, TrendingUp,
    Instagram, Linkedin, MapPin, Mail, PhoneCall, Sparkles,
    Handshake, Users, Briefcase, Building2, Globe, Network,
    FileSignature, ClipboardList, Gavel, IndianRupee, Clock,
    Layers, Target, Award, UserCheck, BookOpen, HeartHandshake,
    Store, Landmark, FileCheck, FileText, ShieldCheck, Workflow,
    Gift, BarChart2, CalendarCheck, LogOut, User,
} from "lucide-react"
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import Head from "next/head"

/* ─── GLOBAL STYLES (exact same design system) ──────────────────────────────── */
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

    @keyframes fadeUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
    @keyframes shimmer  { 0%{background-position:-300% center} 100%{background-position:300% center} }
    @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.75)} }
    @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    @keyframes floatSlow{ 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-5px) rotate(0.5deg)} }
    @keyframes slideUp  { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
    @keyframes glowPulse{ 0%,100%{opacity:0.4} 50%{opacity:0.8} }
    @keyframes drawLine { from{transform:scaleX(0)} to{transform:scaleX(1)} }
    @keyframes marquee  { from{transform:translateX(0)} to{transform:translateX(-50%)} }

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
      transition: transform 0.22s cubic-bezier(0.16,1,0.3,1), box-shadow 0.22s, background 0.22s, color 0.22s, border-color 0.22s;
      white-space: nowrap;
      position: relative;
      overflow: hidden;
    }
    .btn::before {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%);
      pointer-events: none;
    }
    .btn-ink { background: var(--ink); color: var(--white); }
    .btn-ink:hover { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(12,11,9,0.3); }
    .btn-gold {
      background: linear-gradient(135deg, var(--gold-dk) 0%, var(--gold) 50%, var(--gold-lt) 100%);
      color: var(--ink); font-weight: 700;
    }
    .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(201,168,76,0.4); }
    .btn-ghost {
      background: transparent; color: var(--ink);
      border: 1.5px solid var(--ink-6);
    }
    .btn-ghost:hover { background: var(--ink); color: var(--white); border-color: var(--ink); transform: translateY(-2px); }

    .card {
      background: var(--white);
      border: 1px solid var(--ink-7);
      border-radius: var(--radius-lg);
      transition: transform 0.28s cubic-bezier(0.16,1,0.3,1), box-shadow 0.28s, border-color 0.28s;
    }
    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 56px rgba(12,11,9,0.08);
      border-color: var(--ink-5);
    }

    .nav-link {
      font-family: var(--sans); font-size: 13px; font-weight: 500;
      color: var(--ink-4); text-decoration: none;
      padding: 7px 13px; border-radius: 6px; transition: all 0.16s; letter-spacing: 0.01em;
    }
    .nav-link:hover { color: var(--ink); background: var(--ink-8); }

    .section-pad { padding: 104px 24px; }
    @media (max-width: 768px) { .section-pad { padding: 72px 20px; } }
    @media (max-width: 480px) { .section-pad { padding: 52px 16px; } }

    .max-w { max-width: 1200px; margin: 0 auto; }

    .mob-only { display:none !important; }
    .desk-only { display:flex; }
    @media (max-width: 768px) {
      .mob-only { display:flex !important; }
      .desk-only { display:none !important; }
    }

    .faq-row { border-top: 1px solid var(--ink-7); }
    .faq-row:last-child { border-bottom: 1px solid var(--ink-7); }
    .faq-btn {
      width: 100%; display: flex; align-items: center; justify-content: space-between;
      padding: 22px 0; background: none; border: none; cursor: pointer; gap: 20px; text-align: left;
    }

    /* Who can join grid */
    .who-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 14px;
    }
    @media (max-width: 1000px) { .who-grid { grid-template-columns: repeat(3, 1fr); } }
    @media (max-width: 600px)  { .who-grid { grid-template-columns: repeat(2, 1fr); } }

    /* Steps grid */
    .steps-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0;
      position: relative;
    }
    @media (max-width: 860px) { .steps-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; } }
    @media (max-width: 480px) { .steps-grid { grid-template-columns: 1fr; } }

    /* Rewards table */
    .reward-cards {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 12px;
    }
    @media (max-width: 1000px) { .reward-cards { grid-template-columns: repeat(3, 1fr); } }
    @media (max-width: 600px)  { .reward-cards { grid-template-columns: 1fr 1fr; } }
    @media (max-width: 400px)  { .reward-cards { grid-template-columns: 1fr; } }

    /* Why grid */
    .why-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 14px;
    }
    @media (max-width: 960px) { .why-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 520px) { .why-grid { grid-template-columns: 1fr; } }

    /* Services grid */
    .services-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 12px;
    }
    @media (max-width: 1000px) { .services-grid { grid-template-columns: repeat(3, 1fr); } }
    @media (max-width: 600px)  { .services-grid { grid-template-columns: repeat(2, 1fr); } }

    /* Form */
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    @media (max-width: 640px) { .form-grid { grid-template-columns: 1fr; } }

    .form-input {
      width: 100%;
      background: var(--white);
      border: 1px solid var(--ink-7);
      border-radius: var(--radius);
      padding: 13px 16px;
      font-family: var(--sans);
      font-size: 13.5px;
      color: var(--ink);
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .form-input:focus {
      border-color: var(--gold);
      box-shadow: 0 0 0 3px rgba(201,168,76,0.1);
    }
    .form-input::placeholder { color: var(--ink-5); }

    select.form-input { cursor: pointer; }

    .form-label {
      display: block;
      font-family: var(--mono);
      font-size: 8.5px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--ink-4);
      font-weight: 500;
      margin-bottom: 7px;
    }

    /* Why card */
    .why-card {
      background: var(--white);
      border: 1px solid var(--ink-7);
      border-radius: var(--radius-lg);
      padding: 24px 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      transition: all 0.28s cubic-bezier(0.16,1,0.3,1);
      position: relative;
      overflow: hidden;
    }
    .why-card::before {
      content: '';
      position: absolute; top: 0; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, var(--gold-dk), var(--gold));
      transform: scaleX(0); transform-origin: left;
      transition: transform 0.32s cubic-bezier(0.16,1,0.3,1);
    }
    .why-card:hover { transform: translateY(-4px); box-shadow: 0 20px 56px rgba(12,11,9,0.08); border-color: var(--ink-5); }
    .why-card:hover::before { transform: scaleX(1); }

    /* Who card */
    .who-card {
      background: var(--white);
      border: 1px solid var(--ink-7);
      border-radius: var(--radius-lg);
      padding: 22px 18px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: flex-start;
      transition: all 0.24s cubic-bezier(0.16,1,0.3,1);
      position: relative; overflow: hidden;
    }
    .who-card::after {
      content: '';
      position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, var(--gold-dk), var(--gold));
      transform: scaleX(0); transform-origin: left;
      transition: transform 0.28s cubic-bezier(0.16,1,0.3,1);
    }
    .who-card:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(12,11,9,0.08); border-color: var(--ink-5); }
    .who-card:hover::after { transform: scaleX(1); }

    /* Service pill card */
    .svc-card {
      background: var(--ink-9);
      border: 1px solid var(--ink-7);
      border-radius: var(--radius-lg);
      padding: 20px 18px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      transition: all 0.24s cubic-bezier(0.16,1,0.3,1);
    }
    .svc-card:hover { background: var(--white); border-color: var(--ink-5); transform: translateY(-2px); box-shadow: 0 12px 32px rgba(12,11,9,0.06); }

    /* Reward card */
    .reward-card {
      background: var(--white);
      border: 1px solid var(--ink-7);
      border-radius: var(--radius-lg);
      padding: 28px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      text-align: center;
      transition: all 0.28s cubic-bezier(0.16,1,0.3,1);
      position: relative; overflow: hidden;
    }
    .reward-card.featured {
      background: var(--ink);
      border-color: transparent;
    }
    .reward-card:hover { transform: translateY(-4px); box-shadow: 0 20px 48px rgba(12,11,9,0.12); }

    /* Floating WA */
    .floating-wa {
      position: fixed; bottom: 28px; right: 28px; z-index: 300;
      width: 54px; height: 54px; border-radius: 50%; background: #128C7E;
      color: white; display: flex; align-items: center; justify-content: center;
      box-shadow: 0 8px 32px rgba(18,140,126,0.45); transition: all 0.24s cubic-bezier(0.16,1,0.3,1);
      text-decoration: none;
    }
    .floating-wa:hover { transform: scale(1.1) translateY(-2px); background: #25d366; }

    .cta-row { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }
    @media (max-width:520px) { .cta-row { flex-direction:column; align-items:stretch; } .cta-row .btn { justify-content:center; } }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--ink-9); }
    ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }
    ::selection { background: var(--gold-pale); color: var(--gold-dk); }

    /* Step connector line */
    .step-connector {
      position: absolute;
      top: 44px;
      left: 50%;
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, var(--gold), rgba(201,168,76,0.15));
      pointer-events: none;
    }
    .steps-grid > div:last-child .step-connector { display: none; }
    @media (max-width: 860px) { .step-connector { display: none; } }
  `}</style>
)

/* ─── HELPERS ───────────────────────────────────────────────────────────────── */
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
        style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", border: "1px solid var(--ink-7)", color: "var(--ink-5)", textDecoration: "none", transition: "all 0.2s" }}
        onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.borderColor = "var(--gold)"; a.style.color = "var(--gold-dk)"; a.style.background = "var(--gold-pale)" }}
        onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.borderColor = "var(--ink-7)"; a.style.color = "var(--ink-5)"; a.style.background = "" }}>
        <Icon style={{ width: 13, height: 13 }} />
    </a>
)

function FaqItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false)
    return (
        <div className="faq-row">
            <button className="faq-btn" onClick={() => setOpen(o => !o)} aria-expanded={open}>
                <span style={{ fontFamily: "var(--serif)", fontSize: "19px", fontWeight: 500, color: "var(--ink-2)", lineHeight: 1.4, flex: 1 }}>{q}</span>
                <div style={{ width: 28, height: 28, borderRadius: "50%", border: `1.5px solid ${open ? "var(--gold)" : "var(--ink-7)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.28s", background: open ? "var(--gold-pale)" : "transparent" }}>
                    <ChevronDown style={{ width: 12, height: 12, color: open ? "var(--gold-dk)" : "var(--ink-5)", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.28s" }} />
                </div>
            </button>
            <div style={{ maxHeight: open ? "400px" : "0", overflow: "hidden", transition: "max-height 0.45s cubic-bezier(0.16,1,0.3,1)" }}>
                <p style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "var(--ink-4)", lineHeight: 1.9, paddingBottom: 24, maxWidth: 700 }}>{a}</p>
            </div>
        </div>
    )
}

interface Profile { id: string; name: string; email: string; role: "lawyer" | "user" }

/* ─── PAGE ──────────────────────────────────────────────────────────────────── */
export default function PartnersPage() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [profile, setProfile] = useState<Profile | null>(null)
    const [formState, setFormState] = useState({ name: "", org: "", profession: "", email: "", phone: "", city: "", linkedin: "", volume: "", message: "" })
    const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

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
    const waPartner = waBase + encodeURIComponent("I'd like to become a NyayMitra Partner and learn more about the program.")
    const waDiscussion = waBase + encodeURIComponent("I'd like to schedule a discussion about the NyayMitra Partner Program.")

    const navLinks = [
        { key: "home", label: "Home", href: "/" },
        { key: "services", label: "Services", href: "/services" },
        { key: "lawyers", label: "Find Lawyers", href: "/lawyers" },
        { key: "legalGPT", label: "Legal AI", href: "/legal-ai" },
        { key: "compliance", label: "Compliance", href: "/compliance" },
        { key: "about", label: "About", href: "/about" },
    ]

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFormStatus("submitting")
        // Simulate submission replace with real API call
        await new Promise(r => setTimeout(r, 1400))
        setFormStatus("success")
    }

    /* ── JSON-LD ── */
    const orgSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "NyayMitra",
        "url": "https://mynyaymitra.in",
        "logo": "https://mynyaymitra.in/logo.png",
        "sameAs": ["https://www.instagram.com/nyaymitra.in", "https://www.linkedin.com/company/nyaymitra-tech-pvt-ltd"]
    }

    const webPageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "NyayMitra Partner Program",
        "url": "https://mynyaymitra.in/partners",
        "description": "Join the NyayMitra Partner Program. Refer startups and businesses for legal operations, compliance, documentation, and registrations. Earn rewards for successful referrals.",
        "isPartOf": { "@type": "WebSite", "name": "NyayMitra", "url": "https://mynyaymitra.in" }
    }

    const faqData = [
        { q: "Who can become a NyayMitra Partner?", a: "Anyone who works with or advises startups and businesses can join including startup founders, business consultants, CA firms, company secretaries, lawyers, HR consultants, incubators, accelerators, fractional CFOs, and business communities." },
        { q: "When are partner rewards paid?", a: "Rewards are paid after the referred project is successfully completed and full payment is realized from the client. NyayMitra maintains transparent tracking of all referred engagements." },
        { q: "Is there any joining fee?", a: "No. Joining the NyayMitra Partner Program is completely free. There is no onboarding fee, subscription, or hidden cost of any kind." },
        { q: "Can existing NyayMitra clients be referred?", a: "The Partner Program is designed for new client referrals. If you have an existing client relationship, please reach out to discuss the specifics of your case with our partner team." },
        { q: "Can CAs, CSs, and lawyers become partners?", a: "Yes, absolutely. Chartered Accountants, Company Secretaries, and practising lawyers are among our most valued partner profiles. Their client bases often require exactly the services NyayMitra provides." },
        { q: "How do I track my referrals?", a: "Once onboarded, you will receive a dedicated partner contact and referral tracking process. We are actively building a self-service partner dashboard and will roll it out to the network." },
        { q: "Do partners need legal expertise?", a: "No. Partners do not need to provide legal advice or have legal expertise. Your role is to identify and refer businesses that need NyayMitra's services. Our team handles all legal and compliance execution." },
        { q: "Can incubators and startup communities join?", a: "Yes. Incubators, accelerators, startup ecosystems, and business communities are welcome to join as institutional partners. We offer tailored collaboration structures for ecosystem organisations." },
    ]

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqData.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
    }

    return (
        <>
            <GlobalStyles />
            <Head>
                <title>NyayMitra Partner Program | Refer Businesses &amp; Earn Rewards</title>
                <meta name="description" content="Join the NyayMitra Partner Program. Refer startups and businesses for legal operations, compliance, documentation, and registrations. Earn rewards for successful referrals." />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://mynyaymitra.in/partners" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://mynyaymitra.in/partners" />
                <meta property="og:title" content="NyayMitra Partner Program | Refer Businesses & Earn Rewards" />
                <meta property="og:description" content="Refer startups and businesses for legal operations, compliance, documentation, and registrations. Earn rewards for successful referrals." />
                <meta property="og:image" content="https://mynyaymitra.in/og-image.png" />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            </Head>

            <div style={{ minHeight: "100vh", background: "var(--white)" }}>

                {/* ── Announcement Bar ── */}
                <div style={{ background: "linear-gradient(90deg, var(--ink), var(--ink-2) 40%, var(--ink-3))", color: "white", textAlign: "center", padding: "9px 16px", fontSize: "11px", fontFamily: "var(--mono)", letterSpacing: "0.1em", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.06) 50%, transparent)", pointerEvents: "none" }} />
                    <span style={{ color: "rgba(255,255,255,0.55)" }}>🤝</span>{" "}
                    <span style={{ color: "rgba(255,255,255,0.7)" }}>NyayMitra Partner Program Refer &amp; Earn</span>
                    &nbsp;·&nbsp;
                    <a href={waPartner} target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold-lt)", textDecoration: "none", fontWeight: 600, letterSpacing: "0.12em" }}>
                        Become a Partner →
                    </a>
                </div>

                {/* ── Navbar ── */}
                <nav aria-label="Main navigation" style={{ position: "sticky", top: 0, zIndex: 100, background: scrolled ? "rgba(255,254,251,0.96)" : "var(--white)", backdropFilter: scrolled ? "blur(24px) saturate(1.4)" : "none", borderBottom: `1px solid ${scrolled ? "var(--ink-7)" : "transparent"}`, boxShadow: scrolled ? "0 2px 24px rgba(12,11,9,0.06)" : "none", transition: "all 0.32s cubic-bezier(0.16,1,0.3,1)" }}>
                    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 66 }}>
                        <Link href="/" aria-label="NyayMitra Home" style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none", flexShrink: 0 }}>
                            <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 12px rgba(12,11,9,0.2)", position: "relative", overflow: "hidden" }}>
                                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(201,168,76,0.15) 0%, transparent 60%)" }} />
                                <Scale style={{ color: "var(--gold)", width: 16, height: 16, position: "relative", zIndex: 1 }} />
                            </div>
                            <div style={{ fontFamily: "var(--serif)", fontSize: "20px", fontWeight: 600, color: "var(--ink)", lineHeight: 1, letterSpacing: "-0.02em" }}>NyayMitra</div>
                        </Link>

                        <div className="desk-only" style={{ alignItems: "center", gap: 2 }}>
                            {navLinks.map(l => <Link key={l.key} href={l.href} className="nav-link">{l.label}</Link>)}
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                            <div className="desk-only" style={{ alignItems: "center", gap: 7 }}>
                                <SocialIcon href="https://www.instagram.com/mynyaymitra.in" icon={Instagram} label="Instagram" />
                                <SocialIcon href="https://www.linkedin.com/company/nyaymitra-tech-pvt-ltd" icon={Linkedin} label="LinkedIn" />
                                <div style={{ width: 1, height: 18, background: "var(--ink-7)", margin: "0 2px" }} />
                                <Link href="/auth/login" className="nav-link">Login</Link>
                                <Link href="/auth/signup" className="btn btn-ink" style={{ textDecoration: "none", padding: "9px 18px", fontSize: "12.5px" }}>Sign Up</Link>
                            </div>
                            <button onClick={() => setMenuOpen(!menuOpen)} className="mob-only" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}
                                style={{ width: 38, height: 38, border: "1px solid var(--ink-7)", background: "none", borderRadius: 8, cursor: "pointer", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                                {menuOpen ? <X style={{ width: 15, height: 15 }} /> : <Menu style={{ width: 15, height: 15 }} />}
                            </button>
                        </div>
                    </div>

                    {menuOpen && (
                        <div style={{ borderTop: "1px solid var(--ink-7)", background: "var(--white)", padding: "16px 22px 28px", boxShadow: "0 12px 32px rgba(12,11,9,0.08)", animation: "slideUp 0.22s cubic-bezier(0.16,1,0.3,1) both" }}>
                            {navLinks.map((l, i) => (
                                <Link key={l.key} href={l.href} onClick={() => setMenuOpen(false)}
                                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", fontFamily: "var(--sans)", fontSize: "15px", fontWeight: 500, color: "var(--ink-2)", textDecoration: "none", borderBottom: i < navLinks.length - 1 ? "1px solid var(--ink-8)" : "none" }}>
                                    {l.label} <ChevronRight style={{ width: 13, height: 13, color: "var(--ink-6)" }} />
                                </Link>
                            ))}
                            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                                <Link href="/auth/login" onClick={() => setMenuOpen(false)} style={{ flex: 1, padding: "12px", textAlign: "center", border: "1.5px solid var(--ink-6)", borderRadius: 9, fontFamily: "var(--sans)", fontSize: "13.5px", fontWeight: 500, color: "var(--ink)", textDecoration: "none" }}>Login</Link>
                                <Link href="/auth/signup" onClick={() => setMenuOpen(false)} style={{ flex: 1, padding: "12px", textAlign: "center", background: "var(--ink)", borderRadius: 9, fontFamily: "var(--sans)", fontSize: "13.5px", fontWeight: 600, color: "white", textDecoration: "none" }}>Sign Up</Link>
                            </div>
                        </div>
                    )}
                </nav>

                {/* ═══════════════════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════════════════ */}
                <section aria-label="Partner Program Hero" style={{ padding: "84px 28px 100px", position: "relative", overflow: "hidden" }}>
                    {/* Background elements */}
                    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 70% 30%, rgba(201,168,76,0.06) 0%, transparent 60%)", pointerEvents: "none" }} />
                    <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)", backgroundSize: "80px 80px", pointerEvents: "none" }} />
                    <div style={{ position: "absolute", right: "-2%", top: "8%", width: 480, height: 480, opacity: 0.025, pointerEvents: "none" }}>
                        <Handshake style={{ width: "100%", height: "100%", color: "var(--gold-dk)" }} />
                    </div>

                    <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 72, alignItems: "start" }}
                            className="hero-partners-grid">
                            <style>{`
                .hero-partners-grid { grid-template-columns: 1fr 420px; }
                @media (max-width: 1000px) { .hero-partners-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }
              `}</style>

                            {/* Left */}
                            <div style={{ animation: "fadeUp 0.72s cubic-bezier(0.16,1,0.3,1) both" }}>
                                {/* Badge */}
                                <div style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "6px 16px 6px 9px", border: "1px solid var(--ink-7)", borderRadius: 100, marginBottom: 36, background: "var(--white)", boxShadow: "0 2px 12px rgba(12,11,9,0.04)" }}>
                                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--gold-pale)", border: "1px solid var(--gold)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <span style={{ fontSize: "11px" }}>🤝</span>
                                    </div>
                                    <span style={{ fontFamily: "var(--mono)", fontSize: "9.5px", color: "var(--ink-4)", letterSpacing: "0.1em" }}>
                                        NyayMitra Partner Program
                                    </span>
                                </div>

                                <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(38px, 5.5vw, 68px)", fontWeight: 600, lineHeight: 1.12, letterSpacing: "-0.03em", color: "var(--ink)", marginBottom: 0, overflow: "visible" }}>
                                    Grow Your Network.<br />
                                    <span className="gold-text" style={{ fontStyle: "italic", fontWeight: 300, display: "inline-block", lineHeight: 1.35, overflow: "visible" }}>
                                        Earn With Every Referral.
                                    </span>
                                </h1>

                                <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "26px 0" }}>
                                    <div style={{ width: 44, height: 1, background: "linear-gradient(90deg, var(--gold-dk), var(--gold))" }} />
                                    <Handshake style={{ width: 10, height: 10, color: "var(--gold)" }} />
                                    <div style={{ width: 24, height: 1, background: "linear-gradient(90deg, var(--gold), transparent)" }} />
                                </div>

                                <p style={{ fontFamily: "var(--sans)", fontSize: "15.5px", color: "var(--ink-4)", lineHeight: 1.85, maxWidth: 500, marginBottom: 40, fontWeight: 300 }}>
                                    Refer startups and businesses that need legal, compliance, documentation, registrations, or operational support. Earn rewards while helping businesses stay compliant and execution ready.
                                </p>

                                {/* CTAs */}
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 40 }}>
                                    <a href="#apply" className="btn btn-gold" style={{ gap: 9 }}>
                                        <Handshake style={{ width: 14, height: 14 }} />
                                        Become a Partner
                                    </a>
                                    <a href={waDiscussion} target="_blank" rel="noopener noreferrer" className="btn btn-ink" style={{ gap: 9 }}>
                                        Book a Discussion
                                    </a>
                                </div>

                                {/* Trust points */}
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 18 }}>
                                    {[
                                        "No Joining Fee",
                                        "Transparent Rewards",
                                        "Startup & MSME Focused",
                                        "Dedicated Support",
                                    ].map(t => (
                                        <div key={t} style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--mono)", fontSize: "9px", color: "var(--ink-5)", letterSpacing: "0.08em" }}>
                                            <CheckCircle style={{ width: 11, height: 11, color: "var(--green)", flexShrink: 0 }} />
                                            {t}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right floating card */}
                            <div style={{ animation: "fadeUp 0.82s 0.14s cubic-bezier(0.16,1,0.3,1) both" }}>
                                <div style={{ animation: "floatSlow 9s ease-in-out infinite", position: "relative" }}>
                                    <div className="card" style={{ overflow: "hidden", boxShadow: "0 40px 80px rgba(12,11,9,0.1), 0 8px 24px rgba(12,11,9,0.06)" }}>
                                        {/* Card header */}
                                        <div style={{ background: "var(--ink)", padding: "16px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
                                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, transparent 60%)" }} />
                                            <div style={{ display: "flex", alignItems: "center", gap: 10, position: "relative", zIndex: 1 }}>
                                                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--gold)", animation: "glowPulse 2.5s ease-in-out infinite" }} />
                                                <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                                                    Partner Reward Structure
                                                </span>
                                            </div>
                                            <div style={{ display: "flex", gap: 5, position: "relative", zIndex: 1 }}>
                                                {["#ff5f57", "#febc2e", "#28c840"].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c, opacity: 0.9 }} />)}
                                            </div>
                                        </div>

                                        {/* Reward rows */}
                                        <div style={{ padding: "4px 0" }}>
                                            {[
                                                { range: "₹5,000 – ₹15,000", reward: "₹500", highlight: false },
                                                { range: "₹15,001 – ₹30,000", reward: "₹1,000", highlight: false },
                                                { range: "₹30,001 – ₹50,000", reward: "₹2,000", highlight: false },
                                                { range: "₹50,001 – ₹1,00,000", reward: "₹5,000", highlight: true },
                                                { range: "₹1,00,000+", reward: "Custom", highlight: false },
                                            ].map((row, i) => (
                                                <div key={row.range} style={{ padding: "16px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: i < 4 ? "1px solid var(--ink-8)" : "none", background: row.highlight ? "var(--gold-pale)" : "transparent", transition: "background 0.2s", cursor: "default" }}
                                                    onMouseEnter={e => { if (!row.highlight) (e.currentTarget as HTMLDivElement).style.background = "var(--ink-9)" }}
                                                    onMouseLeave={e => { if (!row.highlight) (e.currentTarget as HTMLDivElement).style.background = "" }}>
                                                    <span style={{ fontFamily: "var(--sans)", fontSize: "12px", color: row.highlight ? "var(--gold-dk)" : "var(--ink-4)", fontWeight: row.highlight ? 600 : 400 }}>{row.range}</span>
                                                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                                                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: row.highlight ? "var(--gold)" : "var(--green)", flexShrink: 0 }} />
                                                        <span style={{ fontFamily: "var(--serif)", fontSize: "17px", fontWeight: 600, color: row.highlight ? "var(--gold-dk)" : "var(--ink)", letterSpacing: "-0.01em" }}>{row.reward}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div style={{ padding: "12px 22px", background: "var(--ink-9)", borderTop: "1px solid var(--ink-7)", display: "flex", alignItems: "center", gap: 7 }}>
                                            <CheckCircle style={{ width: 10, height: 10, color: "var(--green)", flexShrink: 0 }} />
                                            <span style={{ fontFamily: "var(--mono)", fontSize: "8px", color: "var(--ink-5)", letterSpacing: "0.08em" }}>
                                                Paid after successful project completion
                                            </span>
                                        </div>
                                    </div>

                                    {/* Floating badges */}
                                    <div style={{ position: "absolute", bottom: -16, left: -18, background: "var(--ink)", color: "white", borderRadius: 10, padding: "10px 14px", boxShadow: "0 12px 36px rgba(12,11,9,0.22)", fontFamily: "var(--sans)", fontSize: "11px", fontWeight: 600, display: "flex", alignItems: "center", gap: 7, animation: "float 7s 1s ease-in-out infinite" }}>
                                        <Gift style={{ width: 12, height: 12, color: "var(--gold)" }} />
                                        Zero Joining Fee
                                    </div>
                                    <div style={{ position: "absolute", top: -14, right: -14, background: "var(--gold-pale)", border: "1px solid var(--gold)", borderRadius: 10, padding: "8px 14px", boxShadow: "0 8px 24px rgba(201,168,76,0.2)", fontFamily: "var(--mono)", fontSize: "9px", fontWeight: 700, color: "var(--gold-dk)", display: "flex", alignItems: "center", gap: 7, animation: "float 8s 0.5s ease-in-out infinite" }}>
                                        <Star style={{ width: 11, height: 11, fill: "var(--gold)", color: "var(--gold)" }} />
                                        Partner Network
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════
            WHO CAN JOIN
        ═══════════════════════════════════════════════════════ */}
                <section aria-label="Who can become a partner" className="section-pad" style={{ background: "var(--ink-9)", borderTop: "1px solid var(--ink-7)", borderBottom: "1px solid var(--ink-7)" }}>
                    <div className="max-w" style={{ padding: "0 28px" }}>
                        <Reveal>
                            <div style={{ textAlign: "center", marginBottom: 56 }}>
                                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                                    <span className="eyebrow">Open to all</span>
                                </div>
                                <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 50px)", fontWeight: 600, letterSpacing: "-0.025em", color: "var(--ink)", lineHeight: 1.1 }}>
                                    Who can become<br />
                                    <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--ink-3)" }}>a partner?</span>
                                </h2>
                                <p style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "var(--ink-5)", fontWeight: 300, marginTop: 14, maxWidth: 480, margin: "14px auto 0" }}>
                                    If you work with or advise businesses, startups, or professionals you are the right fit.
                                </p>
                            </div>
                        </Reveal>

                        <div className="who-grid">
                            {[
                                { icon: <TrendingUp style={{ width: 18, height: 18 }} />, label: "Startup Founders", desc: "Founders who know other founders in need of legal foundation." },
                                { icon: <Briefcase style={{ width: 18, height: 18 }} />, label: "Business Consultants", desc: "Consultants advising SMEs, MSMEs, and growing companies." },
                                { icon: <Landmark style={{ width: 18, height: 18 }} />, label: "CA Firms", desc: "Chartered Accountants whose clients need compliance and documentation." },
                                { icon: <FileCheck style={{ width: 18, height: 18 }} />, label: "Company Secretaries", desc: "CSs who encounter legal ops gaps across their client portfolios." },
                                { icon: <Gavel style={{ width: 18, height: 18 }} />, label: "Lawyers", desc: "Legal professionals in adjacent practice areas looking to collaborate." },
                                { icon: <Users style={{ width: 18, height: 18 }} />, label: "HR Consultants", desc: "HR professionals who identify documentation and compliance needs." },
                                { icon: <Building2 style={{ width: 18, height: 18 }} />, label: "Incubators & Accelerators", desc: "Programs serving early stage startups who need legal foundations." },
                                { icon: <Target style={{ width: 18, height: 18 }} />, label: "Startup Advisors", desc: "Angels and advisors guiding portfolio companies through operations." },
                                { icon: <BarChart2 style={{ width: 18, height: 18 }} />, label: "Fractional CFOs", desc: "Finance leaders who see legal and compliance gaps at client companies." },
                                { icon: <Network style={{ width: 18, height: 18 }} />, label: "Business Communities", desc: "Networks and communities serving entrepreneurs and business owners." },
                            ].map((item, i) => (
                                <Reveal key={item.label} delay={i * 40}>
                                    <div className="who-card">
                                        <div style={{ width: 42, height: 42, borderRadius: 11, background: i % 3 === 1 ? "var(--ink)" : "var(--white)", border: `1px solid ${i % 3 === 1 ? "transparent" : "var(--ink-7)"}`, display: "flex", alignItems: "center", justifyContent: "center", color: i % 3 === 1 ? "var(--gold)" : "var(--gold-dk)", boxShadow: i % 3 === 1 ? "0 4px 14px rgba(12,11,9,0.18)" : "none", flexShrink: 0 }}>
                                            {item.icon}
                                        </div>
                                        <div style={{ fontFamily: "var(--serif)", fontSize: "15px", fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.01em", lineHeight: 1.25 }}>{item.label}</div>
                                        <p style={{ fontFamily: "var(--sans)", fontSize: "11.5px", color: "var(--ink-5)", lineHeight: 1.65, fontWeight: 300 }}>{item.desc}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════
            HOW IT WORKS
        ═══════════════════════════════════════════════════════ */}
                <section aria-label="How the partner program works" className="section-pad" style={{ background: "var(--white)" }}>
                    <div className="max-w" style={{ padding: "0 28px" }}>
                        <Reveal>
                            <div style={{ textAlign: "center", marginBottom: 64 }}>
                                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                                    <span className="eyebrow">How it works</span>
                                </div>
                                <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 50px)", fontWeight: 600, letterSpacing: "-0.025em", color: "var(--ink)", lineHeight: 1.1 }}>
                                    Simple. Transparent.<br />
                                    <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--ink-3)" }}>Rewarding.</span>
                                </h2>
                            </div>
                        </Reveal>

                        <div className="steps-grid">
                            {[
                                { n: "01", icon: <Handshake style={{ width: 20, height: 20 }} />, title: "Refer a Startup or Business", desc: "Identify a business in your network that needs legal, compliance, documentation, or registration support and connect them with NyayMitra." },
                                { n: "02", icon: <Workflow style={{ width: 20, height: 20 }} />, title: "NyayMitra Handles Execution", desc: "Our team manages the discovery, scope, coordination, and complete execution of the legal or compliance engagement." },
                                { n: "03", icon: <CheckCircle style={{ width: 20, height: 20 }} />, title: "Client Successfully Engages", desc: "The referred business onboards, the scope is defined, and the engagement moves to execution through our verified legal network." },
                                { n: "04", icon: <Gift style={{ width: 20, height: 20 }} />, title: "Receive Your Partner Reward", desc: "Once the project is completed and payment realized, your partner reward is processed transparently and on time." },
                            ].map((step, i) => (
                                <Reveal key={step.n} delay={i * 80}>
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, textAlign: "center", padding: "0 20px", position: "relative" }}>
                                        {/* Connector */}
                                        {i < 3 && (
                                            <div style={{ position: "absolute", top: 44, left: "50%", width: "100%", height: "1px", background: "linear-gradient(90deg, rgba(201,168,76,0.4), rgba(201,168,76,0.08))", pointerEvents: "none" }} className="step-connector" />
                                        )}
                                        {/* Icon */}
                                        <div style={{ width: 88, height: 88, borderRadius: "50%", background: i === 3 ? "var(--ink)" : "var(--white)", border: `1px solid ${i === 3 ? "transparent" : "var(--ink-7)"}`, display: "flex", alignItems: "center", justifyContent: "center", color: i === 3 ? "var(--gold)" : "var(--gold-dk)", boxShadow: i === 3 ? "0 8px 32px rgba(12,11,9,0.18)" : "0 2px 12px rgba(12,11,9,0.06)", flexShrink: 0, position: "relative", zIndex: 1 }}>
                                            {step.icon}
                                        </div>
                                        {/* Step number */}
                                        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 12px", background: "var(--gold-pale)", border: "1px solid var(--gold)", borderRadius: 100 }}>
                                            <span style={{ fontFamily: "var(--mono)", fontSize: "8px", color: "var(--gold-dk)", letterSpacing: "0.16em", fontWeight: 700 }}>STEP {step.n}</span>
                                        </div>
                                        <div style={{ fontFamily: "var(--serif)", fontSize: "17px", fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.01em", lineHeight: 1.25 }}>{step.title}</div>
                                        <p style={{ fontFamily: "var(--sans)", fontSize: "12.5px", color: "var(--ink-5)", lineHeight: 1.75, fontWeight: 300, maxWidth: 230 }}>{step.desc}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════
            REWARD STRUCTURE
        ═══════════════════════════════════════════════════════ */}
                <section aria-label="Partner rewards" className="section-pad" style={{ background: "var(--ink)", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(201,168,76,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.025) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
                    <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 700, height: 500, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

                    <div className="max-w" style={{ padding: "0 28px", position: "relative", zIndex: 1 }}>
                        <Reveal>
                            <div style={{ textAlign: "center", marginBottom: 56 }}>
                                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                                    <span className="eyebrow" style={{ color: "var(--gold)" }}>Earn with every referral</span>
                                </div>
                                <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 50px)", fontWeight: 600, letterSpacing: "-0.025em", color: "white", lineHeight: 1.1 }}>
                                    Partner<br />
                                    <span className="gold-text" style={{ fontStyle: "italic", fontWeight: 300 }}>Rewards.</span>
                                </h2>
                                <p style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "rgba(255,255,255,0.45)", fontWeight: 300, marginTop: 14, maxWidth: 480, margin: "14px auto 0" }}>
                                    Transparent, tiered rewards based on the project value. No ambiguity, no delays paid after successful completion.
                                </p>
                            </div>
                        </Reveal>

                        <div className="reward-cards" style={{ marginBottom: 32 }}>
                            {[
                                { range: "₹5,000 –\n₹15,000", reward: "₹500", featured: false, label: "Entry" },
                                { range: "₹15,001 –\n₹30,000", reward: "₹1,000", featured: false, label: "Standard" },
                                { range: "₹30,001 –\n₹50,000", reward: "₹2,000", featured: false, label: "Growth" },
                                { range: "₹50,001 –\n₹1,00,000", reward: "₹5,000", featured: true, label: "Premium" },
                                { range: "₹1,00,000+", reward: "Custom", featured: false, label: "Enterprise" },
                            ].map((card, i) => (
                                <Reveal key={card.label} delay={i * 60}>
                                    <div className={`reward-card${card.featured ? " featured" : ""}`} style={{ height: "100%" }}>
                                        {card.featured && (
                                            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, var(--gold-dk), var(--gold), var(--gold-lt))" }} />
                                        )}
                                        <div style={{ fontFamily: "var(--mono)", fontSize: "7.5px", letterSpacing: "0.2em", textTransform: "uppercase", color: card.featured ? "var(--gold)" : "var(--ink-5)", fontWeight: 600 }}>
                                            {card.label}
                                        </div>
                                        <div style={{ fontFamily: "var(--sans)", fontSize: "11.5px", color: card.featured ? "rgba(255,255,255,0.55)" : "var(--ink-4)", fontWeight: 300, lineHeight: 1.5, whiteSpace: "pre-line", textAlign: "center" }}>
                                            Project Value<br /><span style={{ color: card.featured ? "rgba(255,255,255,0.75)" : "var(--ink-3)", fontWeight: 500 }}>{card.range}</span>
                                        </div>
                                        <div style={{ width: "100%", height: "1px", background: card.featured ? "rgba(255,255,255,0.08)" : "var(--ink-7)" }} />
                                        <div style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 700, color: card.featured ? "var(--gold-lt)" : "var(--gold-dk)", letterSpacing: "-0.02em", lineHeight: 1 }}>
                                            {card.reward}
                                        </div>
                                        <div style={{ fontFamily: "var(--mono)", fontSize: "8px", color: card.featured ? "rgba(255,255,255,0.3)" : "var(--ink-6)", letterSpacing: "0.1em" }}>
                                            PARTNER REWARD
                                        </div>
                                        {card.featured && (
                                            <div style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 12px", background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 100, fontFamily: "var(--mono)", fontSize: "7.5px", color: "var(--gold)", letterSpacing: "0.12em" }}>
                                                <Star style={{ width: 9, height: 9, fill: "var(--gold)", color: "var(--gold)" }} />
                                                Most Referred
                                            </div>
                                        )}
                                    </div>
                                </Reveal>
                            ))}
                        </div>

                        <Reveal delay={120}>
                            <div style={{ textAlign: "center" }}>
                                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 100 }}>
                                    <Shield style={{ width: 11, height: 11, color: "var(--gold)", flexShrink: 0 }} />
                                    <span style={{ fontFamily: "var(--sans)", fontSize: "12px", color: "rgba(255,255,255,0.45)", fontWeight: 300 }}>
                                        Rewards are paid after successful project completion and payment realization.
                                    </span>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════
            WHY PARTNER WITH NYAYMITRA
        ═══════════════════════════════════════════════════════ */}
                <section aria-label="Why partner with NyayMitra" className="section-pad" style={{ background: "var(--ink-9)", borderTop: "1px solid var(--ink-7)", borderBottom: "1px solid var(--ink-7)" }}>
                    <div className="max-w" style={{ padding: "0 28px" }}>
                        <Reveal>
                            <div style={{ textAlign: "center", marginBottom: 56 }}>
                                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                                    <span className="eyebrow">Why choose NyayMitra</span>
                                </div>
                                <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 50px)", fontWeight: 600, letterSpacing: "-0.025em", color: "var(--ink)", lineHeight: 1.1 }}>
                                    Why partners choose<br />
                                    <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--ink-3)" }}>NyayMitra.</span>
                                </h2>
                            </div>
                        </Reveal>

                        <div className="why-grid">
                            {[
                                { icon: <ShieldCheck style={{ width: 18, height: 18 }} />, title: "Legal Operations Expertise", desc: "Deep expertise across startup legal ops, compliance, documentation, and registrations.", dark: false },
                                { icon: <Globe style={{ width: 18, height: 18 }} />, title: "Multi-City Compliance Support", desc: "Pan India coverage across states and cities one partner for all geographies.", dark: true },
                                { icon: <TrendingUp style={{ width: 18, height: 18 }} />, title: "Startup-Focused Services", desc: "Services built specifically for startups, MSMEs, and growing businesses.", dark: false },
                                { icon: <IndianRupee style={{ width: 18, height: 18 }} />, title: "Transparent Pricing", desc: "Fixed, predictable pricing for all services no billing surprises for your referrals.", dark: false },
                                { icon: <Handshake style={{ width: 18, height: 18 }} />, title: "Dedicated Coordination", desc: "Every referred client gets a dedicated coordinator for end-to-end execution.", dark: true },
                                { icon: <Network style={{ width: 18, height: 18 }} />, title: "Growing Partner Network", desc: "Join a growing ecosystem of professionals collaborating across disciplines.", dark: false },
                                { icon: <BadgeCheck style={{ width: 18, height: 18 }} />, title: "Professional Execution", desc: "Bar Council verified legal experts execute every engagement no shortcuts.", dark: false },
                                { icon: <Award style={{ width: 18, height: 18 }} />, title: "Long-Term Collaboration", desc: "We invest in building lasting partner relationships not one time transactions.", dark: true },
                            ].map((item, i) => (
                                <Reveal key={item.title} delay={i * 45}>
                                    <div className="why-card" style={{ background: item.dark ? "var(--ink)" : "var(--white)", borderColor: item.dark ? "transparent" : "var(--ink-7)" }}>
                                        <div style={{ width: 44, height: 44, borderRadius: 11, background: item.dark ? "rgba(201,168,76,0.1)" : "var(--ink-9)", border: `1px solid ${item.dark ? "rgba(201,168,76,0.2)" : "var(--ink-7)"}`, display: "flex", alignItems: "center", justifyContent: "center", color: item.dark ? "var(--gold)" : "var(--gold-dk)" }}>
                                            {item.icon}
                                        </div>
                                        <div style={{ fontFamily: "var(--serif)", fontSize: "16px", fontWeight: 600, color: item.dark ? "white" : "var(--ink)", letterSpacing: "-0.01em" }}>
                                            {item.title}
                                        </div>
                                        <p style={{ fontFamily: "var(--sans)", fontSize: "12px", color: item.dark ? "rgba(255,255,255,0.5)" : "var(--ink-5)", lineHeight: 1.75, fontWeight: 300 }}>
                                            {item.desc}
                                        </p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════
            SERVICES ELIGIBLE FOR REWARDS
        ═══════════════════════════════════════════════════════ */}
                <section aria-label="Services eligible for partner rewards" className="section-pad" style={{ background: "var(--white)" }}>
                    <div className="max-w" style={{ padding: "0 28px" }}>
                        <Reveal>
                            <div style={{ textAlign: "center", marginBottom: 56 }}>
                                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                                    <span className="eyebrow">Reward-eligible services</span>
                                </div>
                                <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 50px)", fontWeight: 600, letterSpacing: "-0.025em", color: "var(--ink)", lineHeight: 1.1 }}>
                                    Earn across<br />
                                    <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--ink-3)" }}>multiple services.</span>
                                </h2>
                                <p style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "var(--ink-5)", fontWeight: 300, marginTop: 14, maxWidth: 480, margin: "14px auto 0" }}>
                                    Every referral that leads to a successful engagement earns you a partner reward across this range of services.
                                </p>
                            </div>
                        </Reveal>

                        <div className="services-grid" style={{ marginBottom: 28 }}>
                            {[
                                { icon: <FileSignature style={{ width: 16, height: 16 }} />, label: "Startup Legal Foundation", tag: "Startup" },
                                { icon: <Store style={{ width: 16, height: 16 }} />, label: "Shop & Establishment Registration", tag: "Compliance" },
                                { icon: <BadgeCheck style={{ width: 16, height: 16 }} />, label: "Trademark & IP Coordination", tag: "IP" },
                                { icon: <Briefcase style={{ width: 16, height: 16 }} />, label: "Employment Documentation", tag: "HR" },
                                { icon: <FileCheck style={{ width: 16, height: 16 }} />, label: "Vendor Agreements", tag: "Contracts" },
                                { icon: <Gavel style={{ width: 16, height: 16 }} />, label: "Legal Notices", tag: "Dispute" },
                                { icon: <ClipboardList style={{ width: 16, height: 16 }} />, label: "Compliance Audit", tag: "Compliance" },
                                { icon: <Globe style={{ width: 16, height: 16 }} />, label: "Multi-City Compliance Support", tag: "Compliance" },
                                { icon: <FileText style={{ width: 16, height: 16 }} />, label: "Contract Drafting", tag: "Contracts" },
                                { icon: <Building2 style={{ width: 16, height: 16 }} />, label: "Corporate Documentation", tag: "Documentation" },
                            ].map((item, i) => (
                                <Reveal key={item.label} delay={i * 35}>
                                    <div className="svc-card">
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                                            <div style={{ width: 36, height: 36, borderRadius: 9, background: "var(--white)", border: "1px solid var(--ink-7)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold-dk)", flexShrink: 0 }}>
                                                {item.icon}
                                            </div>
                                            <div style={{ padding: "2px 9px", background: "var(--gold-pale)", border: "1px solid var(--gold)", borderRadius: 100 }}>
                                                <span style={{ fontFamily: "var(--mono)", fontSize: "7px", color: "var(--gold-dk)", letterSpacing: "0.14em", fontWeight: 600 }}>{item.tag}</span>
                                            </div>
                                        </div>
                                        <div style={{ fontFamily: "var(--sans)", fontSize: "12.5px", fontWeight: 600, color: "var(--ink)", lineHeight: 1.35 }}>{item.label}</div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>

                        <Reveal delay={80}>
                            <div style={{ textAlign: "center" }}>
                                <p style={{ fontFamily: "var(--sans)", fontSize: "13px", color: "var(--ink-5)", fontWeight: 300, fontStyle: "italic" }}>
                                    And many more legal and compliance services. Reach out to confirm eligibility for specific engagements.
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════
            PARTNER STORIES PLACEHOLDER
        ═══════════════════════════════════════════════════════ */}
                <section aria-label="Partner success stories" className="section-pad" style={{ background: "var(--ink)", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(201,168,76,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
                    <div className="max-w" style={{ padding: "0 28px", position: "relative", zIndex: 1 }}>
                        <Reveal>
                            <div style={{ textAlign: "center", marginBottom: 56 }}>
                                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                                    <span className="eyebrow" style={{ color: "var(--gold)" }}>Partner stories</span>
                                </div>
                                <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 50px)", fontWeight: 600, letterSpacing: "-0.025em", color: "white", lineHeight: 1.1 }}>
                                    Partner success stories<br />
                                    <span className="gold-text" style={{ fontStyle: "italic", fontWeight: 300 }}>coming soon.</span>
                                </h2>
                            </div>
                        </Reveal>

                        <Reveal delay={60}>
                            <div style={{ maxWidth: 760, margin: "0 auto" }}>
                                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "var(--radius-xl)", padding: "52px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
                                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />
                                    <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", color: "var(--gold)" }}>
                                        <Handshake style={{ width: 28, height: 28 }} />
                                    </div>
                                    <div style={{ fontFamily: "var(--serif)", fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 500, color: "white", fontStyle: "italic", lineHeight: 1.5, marginBottom: 20 }}>
                                        "NyayMitra is actively building its partner ecosystem. Success stories from our early partners will be featured here."
                                    </div>
                                    <p style={{ fontFamily: "var(--sans)", fontSize: "13.5px", color: "rgba(255,255,255,0.4)", lineHeight: 1.8, fontWeight: 300, maxWidth: 500, margin: "0 auto 32px" }}>
                                        We're onboarding our founding partner cohort startup consultants, CA firms, incubators, and business advisors who are shaping the NyayMitra partner network from the ground up.
                                    </p>
                                    <div style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "10px 22px", background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 100 }}>
                                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", animation: "pulseDot 2.2s ease-in-out infinite" }} />
                                        <span style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.14em" }}>Founding Partner Applications Open</span>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════
            FAQ
        ═══════════════════════════════════════════════════════ */}
                <section aria-label="Partner program FAQ" className="section-pad" style={{ background: "var(--ink-9)", borderTop: "1px solid var(--ink-7)" }}>
                    <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 28px" }}>
                        <Reveal>
                            <div style={{ textAlign: "center", marginBottom: 56 }}>
                                <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                                    <span className="eyebrow">FAQ</span>
                                </div>
                                <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(26px, 3.8vw, 46px)", fontWeight: 600, letterSpacing: "-0.022em", color: "var(--ink)", marginBottom: 10 }}>
                                    Partner program questions,<br />
                                    <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--ink-3)" }}>answered clearly.</span>
                                </h2>
                            </div>
                        </Reveal>
                        <Reveal delay={60}>
                            <div>
                                {faqData.map(item => <FaqItem key={item.q} q={item.q} a={item.a} />)}
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════
            FINAL CTA
        ═══════════════════════════════════════════════════════ */}
                <section aria-label="Join the partner network" className="section-pad" style={{ background: "var(--white)", borderTop: "1px solid var(--ink-7)", borderBottom: "1px solid var(--ink-7)", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 500, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
                    <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1, padding: "0 28px" }}>
                        <Reveal>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", border: "1px solid var(--gold)", borderRadius: 100, marginBottom: 32, background: "var(--gold-pale)" }}>
                                <Sparkles style={{ width: 11, height: 11, color: "var(--gold-dk)" }} />
                                <span style={{ fontFamily: "var(--mono)", fontSize: "8.5px", color: "var(--gold-dk)", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500 }}>No joining fee</span>
                            </div>
                            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(32px, 5vw, 58px)", fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.028em", lineHeight: 1.2, marginBottom: 18 }}>
                                Let's Grow<br />
                                <span className="gold-text" style={{ fontStyle: "italic", fontWeight: 300, display: "inline-block", lineHeight: 1.35 }}>Together.</span>
                            </h2>
                            <p style={{ fontFamily: "var(--sans)", fontSize: "15px", color: "var(--ink-4)", lineHeight: 1.9, maxWidth: 480, margin: "0 auto 40px", fontWeight: 300 }}>
                                Join the NyayMitra Partner Network and help startups and businesses access reliable legal and compliance support while building a meaningful, rewarded collaboration.
                            </p>
                            <div className="cta-row">
                                <a href="#apply" className="btn btn-gold" style={{ gap: 9 }}>
                                    <Handshake style={{ width: 14, height: 14 }} />
                                    Become a Partner
                                </a>
                                <a href={waDiscussion} target="_blank" rel="noopener noreferrer" className="btn btn-ink" style={{ gap: 9 }}>
                                    Schedule a Call
                                </a>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════
            PARTNER APPLICATION FORM
        ═══════════════════════════════════════════════════════ */}
                <section aria-label="Partner application form" id="apply" className="section-pad" style={{ background: "var(--ink-9)", borderBottom: "1px solid var(--ink-7)" }}>
                    <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 28px" }}>
                        <Reveal>
                            <div style={{ textAlign: "center", marginBottom: 52 }}>
                                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                                    <span className="eyebrow">Apply now</span>
                                </div>
                                <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 600, letterSpacing: "-0.025em", color: "var(--ink)", lineHeight: 1.1, marginBottom: 12 }}>
                                    Partner Application
                                </h2>
                                <p style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "var(--ink-5)", fontWeight: 300 }}>
                                    Fill in the details below and our partner team will reach out within 2 business days.
                                </p>
                            </div>
                        </Reveal>

                        <Reveal delay={60}>
                            {formStatus === "success" ? (
                                <div style={{ background: "var(--white)", border: "1px solid var(--ink-7)", borderRadius: "var(--radius-xl)", padding: "64px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
                                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, var(--gold-dk), var(--gold), var(--gold-lt))" }} />
                                    <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#f0fdf4", border: "1px solid #bbf7d0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                                        <CheckCircle style={{ width: 32, height: 32, color: "var(--green)" }} />
                                    </div>
                                    <h3 style={{ fontFamily: "var(--serif)", fontSize: "28px", fontWeight: 600, color: "var(--ink)", marginBottom: 14 }}>Application Submitted</h3>
                                    <p style={{ fontFamily: "var(--sans)", fontSize: "14px", color: "var(--ink-5)", lineHeight: 1.8, maxWidth: 440, margin: "0 auto 28px", fontWeight: 300 }}>
                                        Thank you for applying to the NyayMitra Partner Program. Our partner team will review your application and reach out within 2 business days.
                                    </p>
                                    <a href={waPartner} target="_blank" rel="noopener noreferrer" className="btn btn-ink" style={{ gap: 8 }}>
                                        <WaSvg size={13} />
                                        Message Us on WhatsApp
                                    </a>
                                </div>
                            ) : (
                                <div style={{ background: "var(--white)", border: "1px solid var(--ink-7)", borderRadius: "var(--radius-xl)", padding: "48px 44px", position: "relative", overflow: "hidden" }}>
                                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, var(--gold-dk), var(--gold), var(--gold-lt))" }} />

                                    <form onSubmit={handleSubmit} noValidate>
                                        <div className="form-grid">
                                            {/* Full Name */}
                                            <div>
                                                <label className="form-label" htmlFor="p-name">Full Name *</label>
                                                <input id="p-name" className="form-input" type="text" placeholder="Your full name" required value={formState.name} onChange={e => setFormState(s => ({ ...s, name: e.target.value }))} />
                                            </div>
                                            {/* Organization */}
                                            <div>
                                                <label className="form-label" htmlFor="p-org">Organization</label>
                                                <input id="p-org" className="form-input" type="text" placeholder="Company or firm name" value={formState.org} onChange={e => setFormState(s => ({ ...s, org: e.target.value }))} />
                                            </div>
                                            {/* Profession */}
                                            <div>
                                                <label className="form-label" htmlFor="p-profession">Profession / Role *</label>
                                                <select id="p-profession" className="form-input" required value={formState.profession} onChange={e => setFormState(s => ({ ...s, profession: e.target.value }))}>
                                                    <option value="">Select your role</option>
                                                    <option value="startup_founder">Startup Founder</option>
                                                    <option value="business_consultant">Business Consultant</option>
                                                    <option value="ca_firm">CA / CA Firm</option>
                                                    <option value="company_secretary">Company Secretary</option>
                                                    <option value="lawyer">Lawyer / Law Firm</option>
                                                    <option value="hr_consultant">HR Consultant</option>
                                                    <option value="incubator_accelerator">Incubator / Accelerator</option>
                                                    <option value="startup_advisor">Startup Advisor / Angel</option>
                                                    <option value="fractional_cfo">Fractional CFO</option>
                                                    <option value="business_community">Business Community / Network</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>
                                            {/* Email */}
                                            <div>
                                                <label className="form-label" htmlFor="p-email">Email Address *</label>
                                                <input id="p-email" className="form-input" type="email" placeholder="your@email.com" required value={formState.email} onChange={e => setFormState(s => ({ ...s, email: e.target.value }))} />
                                            </div>
                                            {/* Phone */}
                                            <div>
                                                <label className="form-label" htmlFor="p-phone">Phone Number *</label>
                                                <input id="p-phone" className="form-input" type="tel" placeholder="+91 98765 43210" required value={formState.phone} onChange={e => setFormState(s => ({ ...s, phone: e.target.value }))} />
                                            </div>
                                            {/* City */}
                                            <div>
                                                <label className="form-label" htmlFor="p-city">City</label>
                                                <input id="p-city" className="form-input" type="text" placeholder="Your city" value={formState.city} onChange={e => setFormState(s => ({ ...s, city: e.target.value }))} />
                                            </div>
                                            {/* LinkedIn */}
                                            <div>
                                                <label className="form-label" htmlFor="p-linkedin">LinkedIn Profile</label>
                                                <input id="p-linkedin" className="form-input" type="url" placeholder="https://linkedin.com/in/yourprofile" value={formState.linkedin} onChange={e => setFormState(s => ({ ...s, linkedin: e.target.value }))} />
                                            </div>
                                            {/* Referral Volume */}
                                            <div>
                                                <label className="form-label" htmlFor="p-volume">Expected Referral Volume</label>
                                                <select id="p-volume" className="form-input" value={formState.volume} onChange={e => setFormState(s => ({ ...s, volume: e.target.value }))}>
                                                    <option value="">Select approximate volume</option>
                                                    <option value="1_2">1–2 per month</option>
                                                    <option value="3_5">3–5 per month</option>
                                                    <option value="5_10">5–10 per month</option>
                                                    <option value="10_plus">10+ per month</option>
                                                    <option value="unsure">Not sure yet</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Message full width */}
                                        <div style={{ marginTop: 16 }}>
                                            <label className="form-label" htmlFor="p-message">Message / Additional Context</label>
                                            <textarea id="p-message" className="form-input" rows={4} placeholder="Tell us about your network, the types of businesses you work with, or any questions you have about the partner program." style={{ resize: "vertical", minHeight: 100 }} value={formState.message} onChange={e => setFormState(s => ({ ...s, message: e.target.value }))} />
                                        </div>

                                        {/* Submit */}
                                        <div style={{ marginTop: 28, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                                            <p style={{ fontFamily: "var(--sans)", fontSize: "11.5px", color: "var(--ink-5)", fontWeight: 300, lineHeight: 1.6, maxWidth: 380 }}>
                                                By submitting this form you agree to be contacted by our partner team. No spam, no automated outreach.
                                            </p>
                                            <button type="submit" className="btn btn-gold" disabled={formStatus === "submitting"} style={{ gap: 9, minWidth: 240 }}>
                                                {formStatus === "submitting" ? (
                                                    <>
                                                        <div style={{ width: 14, height: 14, border: "2px solid rgba(12,11,9,0.3)", borderTopColor: "var(--ink)", borderRadius: "50%", animation: "rotateSlow 0.8s linear infinite" }} />
                                                        Submitting…
                                                    </>
                                                ) : (
                                                    <>
                                                        <Handshake style={{ width: 14, height: 14 }} />
                                                        Apply to Become a Partner
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </Reveal>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════
            FOOTER
        ═══════════════════════════════════════════════════════ */}
                <footer style={{ background: "var(--ink)", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "56px 28px 36px", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(201,168,76,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.02) 1px, transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none" }} />
                    <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32, marginBottom: 44, paddingBottom: 40, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                            {/* Brand */}
                            <div>
                                <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 11, textDecoration: "none", marginBottom: 14 }}>
                                    <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Scale style={{ color: "var(--gold)", width: 15, height: 15 }} />
                                    </div>
                                    <div style={{ fontFamily: "var(--serif)", fontSize: "18px", fontWeight: 600, color: "white", lineHeight: 1, letterSpacing: "-0.02em" }}>NyayMitra</div>
                                </Link>
                                <p style={{ fontFamily: "var(--sans)", fontSize: "12.5px", color: "rgba(255,255,255,0.35)", lineHeight: 1.75, maxWidth: 240, fontWeight: 300 }}>
                                    Legal Operations &amp; Compliance Infrastructure for Startups, MSMEs &amp; Businesses.
                                </p>
                                <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 16 }}>
                                    <SocialIcon href="https://www.instagram.com/mynyaymitra.in" icon={Instagram} label="Instagram" />
                                    <SocialIcon href="https://www.linkedin.com/company/nyaymitra-tech-pvt-ltd" icon={Linkedin} label="LinkedIn" />
                                </div>
                            </div>

                            {/* Partner links */}
                            <nav aria-label="Partner links">
                                <div style={{ fontFamily: "var(--mono)", fontSize: "7.5px", fontWeight: 500, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>Partner Program</div>
                                <ul style={{ listStyle: "none", padding: 0 }}>
                                    {[
                                        { href: "#apply", label: "Apply Now" },
                                        { href: "#how-it-works", label: "How It Works" },
                                        { href: "#rewards", label: "Reward Structure" },
                                    ].map(l => (
                                        <li key={l.label} style={{ marginBottom: 10 }}>
                                            <a href={l.href} style={{ fontFamily: "var(--sans)", fontSize: "12.5px", color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 0.18s", fontWeight: 300 }}
                                                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold-lt)"}
                                                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.35)"}>
                                                {l.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            {/* Quick links */}
                            <nav aria-label="Quick links">
                                <div style={{ fontFamily: "var(--mono)", fontSize: "7.5px", fontWeight: 500, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>NyayMitra</div>
                                <ul style={{ listStyle: "none", padding: 0 }}>
                                    {[
                                        { href: "/", label: "Home" },
                                        { href: "/startup-legal", label: "Startup Legal Ops" },
                                        { href: "/compliance", label: "Compliance" },
                                        { href: "/lawyers", label: "Find Lawyers" },
                                        { href: "/contact", label: "Contact Us" },
                                    ].map(l => (
                                        <li key={l.label} style={{ marginBottom: 10 }}>
                                            <Link href={l.href} style={{ fontFamily: "var(--sans)", fontSize: "12.5px", color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 0.18s", fontWeight: 300 }}
                                                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold-lt)"}
                                                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.35)"}>
                                                {l.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            {/* CTA widget */}
                            <div>
                                <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "var(--radius-lg)", padding: "24px 22px", textAlign: "center", minWidth: 200 }}>
                                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", color: "var(--gold)" }}>
                                        <Handshake style={{ width: 16, height: 16 }} />
                                    </div>
                                    <p style={{ fontFamily: "var(--serif)", fontSize: "14px", fontStyle: "italic", fontWeight: 300, color: "rgba(255,255,255,0.45)", marginBottom: 16, lineHeight: 1.6 }}>
                                        Ready to refer<br />and earn?
                                    </p>
                                    <a href={waPartner} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 9, background: "linear-gradient(135deg, var(--gold-dk), var(--gold))", color: "var(--ink)", padding: "11px", borderRadius: 9, fontFamily: "var(--sans)", fontSize: "12px", fontWeight: 700, textDecoration: "none", transition: "all 0.22s" }}
                                        onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.transform = "translateY(-1px)"; a.style.boxShadow = "0 8px 24px rgba(201,168,76,0.3)" }}
                                        onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.transform = ""; a.style.boxShadow = "" }}>
                                        <WaSvg size={13} />
                                        Become a Partner
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                            <p style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em" }}>
                                © 2026 NyayMitra Tech Pvt Ltd. All rights reserved.
                            </p>
                            <p style={{ fontFamily: "var(--sans)", fontSize: "10.5px", color: "rgba(255,255,255,0.28)", maxWidth: 500, lineHeight: 1.8, textAlign: "right", fontWeight: 300 }}>
                                <span style={{ color: "rgba(192,57,43,0.9)", fontWeight: 600 }}>Disclaimer: </span>
                                NyayMitra is a legal operations &amp; compliance platform. Partner rewards are subject to successful project completion and payment realization.
                            </p>
                        </div>
                    </div>
                </footer>

                {/* Floating WhatsApp */}
                <a href={waPartner} target="_blank" rel="noopener noreferrer" aria-label="Become a Partner on WhatsApp" className="floating-wa">
                    <WaSvg size={22} />
                </a>

                {/* rotateSlow keyframe for button spinner */}
                <style>{`@keyframes rotateSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
            </div>
        </>
    )
}