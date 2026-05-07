"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Scale, MapPin, Mail, PhoneCall, Instagram, Linkedin, ArrowRight, ChevronDown, Shield, Zap, Clock, TrendingUp, CheckCircle2, AlertTriangle, X } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ServiceCategory { category: string; icon: string; services: Service[] }
interface Service { name: string; icon: string }
interface BusinessType { title: string; icon: string; problems: string[]; solution: string }
interface Risk { risk: string; consequence: string; solution: string }
interface Step { num: string; title: string; desc: string }
interface Testimonial { name: string; role: string; text: string; initials: string; company: string }

// ─── Constants ────────────────────────────────────────────────────────────────
const WA = `https://wa.me/919999999999?text=${encodeURIComponent("Hi NyayMitra! I need help with business compliance.")}`;

const SERVICES: ServiceCategory[] = [
    { category: "Food & Manufacturing", icon: "🏭", services: [{ name: "FSSAI License", icon: "🍽" }, { name: "BIS Certification", icon: "✅" }, { name: "Packaged Drinking Water", icon: "💧" }, { name: "Factory Compliance", icon: "⚙️" }, { name: "Trade License", icon: "📋" }, { name: "Pollution / NOC", icon: "🌿" }] },
    { category: "Startup & Business", icon: "🚀", services: [{ name: "MSME Registration", icon: "🏢" }, { name: "Startup Compliance", icon: "💡" }, { name: "Trademark / IP", icon: "™️" }, { name: "GST Compliance", icon: "📊" }, { name: "Vendor Documentation", icon: "📁" }] },
    { category: "Workplace & HR", icon: "👥", services: [{ name: "POSH Compliance", icon: "⚖️" }, { name: "Employee Agreements", icon: "🤝" }, { name: "HR Policies", icon: "📝" }, { name: "Workplace Documentation", icon: "🗂" }] },
];

const BUSINESS_TYPES: BusinessType[] = [
    { title: "Manufacturers", icon: "🏭", problems: ["BIS certification delays", "Factory act compliance"], solution: "End-to-end factory & product licensing support" },
    { title: "Food Businesses", icon: "🍽", problems: ["FSSAI rejections", "Packaging non-compliance"], solution: "FSSAI, labelling & hygiene compliance handled" },
    { title: "Startups", icon: "🚀", problems: ["Registration confusion", "Investor-ready compliance"], solution: "Full startup compliance & documentation stack" },
    { title: "D2C Brands", icon: "📦", problems: ["Trademark gaps", "GST & vendor docs"], solution: "IP protection, GST & ecommerce compliance" },
    { title: "MSMEs", icon: "🏢", problems: ["MSME benefits missed", "Labour law gaps"], solution: "MSME registration + ongoing compliance support" },
    { title: "Clinics", icon: "🏥", problems: ["Healthcare licensing", "POSH & HR gaps"], solution: "Healthcare compliance & workplace policy setup" },
    { title: "Water Plants", icon: "💧", problems: ["BIS & BEE compliance", "Labelling norms"], solution: "Complete packaged water compliance" },
    { title: "Agencies", icon: "💼", problems: ["Vendor onboarding docs", "Employee agreements"], solution: "Documentation, policies & HR compliance" },
];

const RISKS: Risk[] = [
    { risk: "FSSAI Rejection", consequence: "Production halt, fines up to ₹5L, license cancellation", solution: "Pre-audit FSSAI documentation & expert filing" },
    { risk: "Non-Compliant Packaging", consequence: "Product seizure, marketplace bans, brand damage", solution: "Labelling audit & packaging compliance review" },
    { risk: "Missing BIS Certification", consequence: "Export bans, legal liability, market exclusion", solution: "BIS certification roadmap & filing support" },
    { risk: "Labour Compliance Gaps", consequence: "Employee lawsuits, penalties, shutdown orders", solution: "HR policies, agreements & statutory filings" },
    { risk: "No POSH Setup", consequence: "Regulatory action, reputational risk, legal notices", solution: "POSH policy, ICC formation & training" },
    { risk: "Trademark Not Filed", consequence: "Brand hijacking, expensive litigation", solution: "Trademark search, filing & IP protection" },
];

const STEPS: Step[] = [
    { num: "01", title: "Share Business Details", desc: "Tell us about your business, industry, and compliance needs via WhatsApp or a quick form." },
    { num: "02", title: "Compliance Assessment", desc: "Our experts map your exact compliance requirements and identify critical gaps." },
    { num: "03", title: "Expert Allocation", desc: "A dedicated compliance specialist is assigned to your business immediately." },
    { num: "04", title: "Documentation Support", desc: "We prepare, review, and organise all required documents and filings." },
    { num: "05", title: "Filing & Coordination", desc: "Submissions are handled with government bodies and certifying agencies on your behalf." },
    { num: "06", title: "Ongoing Support", desc: "Renewal reminders, compliance updates, and continuous advisory as your business grows." },
];

const TESTIMONIALS: Testimonial[] = [
    { name: "Priya Sharma", role: "Founder", company: "FreshBite Foods", text: "NyayMitra got our FSSAI Central License in record time. Their team knew exactly what documents we needed. Absolutely stress-free experience.", initials: "PS" },
    { name: "Rahul Mehra", role: "Managing Director", company: "Aquapur Water Plant", text: "We were stuck on BIS and BEE compliance for months. NyayMitra resolved everything in 3 weeks. Game changer for our operations.", initials: "RM" },
    { name: "Sneha Joshi", role: "Co-founder", company: "Arya Ventures", text: "From MSME registration to POSH policy, they handled our entire compliance setup. Felt like having an in-house legal team without the cost.", initials: "SJ" },
];

const STATS = [
    { value: "50+", label: "Businesses Supported", icon: <TrendingUp size={18} /> },
    { value: "98%", label: "Approval Rate", icon: <CheckCircle2 size={18} /> },
    { value: "48hr", label: "Avg Response Time", icon: <Clock size={18} /> },
    { value: "15+", label: "Compliance Experts", icon: <Shield size={18} /> },
];

const RISK_QUESTIONS = [
    { id: "fssai", question: "Does your business handle or sell food products?", risk: "FSSAI License Mandatory", icon: "🍽️" },
    { id: "bis", question: "Do you manufacture electronic, water, or industrial products?", risk: "BIS Certification Required", icon: "✅" },
    { id: "posh", question: "Does your business have 10+ employees?", risk: "POSH Act Compliance Needed", icon: "⚖️" },
    { id: "trademark", question: "Is your brand name or trademark NOT yet registered?", risk: "Trademark Protection Missing", icon: "™️" },
    { id: "gst", question: "Is turnover above ₹40L (goods) or ₹20L (services)?", risk: "Mandatory GST Registration", icon: "📊" },
    { id: "msme", question: "Have you NOT registered as an MSME yet?", risk: "MSME Benefits Not Availed", icon: "🏢" },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
        obs.observe(el); return () => obs.disconnect();
    }, [threshold]);
    return { ref, visible };
}

// ─── Animation wrapper ────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "", y = 24 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
    const { ref, visible } = useInView();
    return (
        <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : `translateY(${y}px)`, transition: `opacity 0.65s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.65s cubic-bezier(.16,1,.3,1) ${delay}s` }}>
            {children}
        </div>
    );
}

// ─── Gold badge ───────────────────────────────────────────────────────────────
function Badge({ children }: { children: React.ReactNode }) {
    return (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8B6510", background: "#FDF6E3", border: "1px solid #E8C96A", borderRadius: 999, padding: "5px 14px", fontFamily: "var(--nm-sans)" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#B89440", display: "inline-block" }} />
            {children}
        </span>
    );
}

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionHead({ badge, title, sub, light = false }: { badge: string; title: React.ReactNode; sub?: string; light?: boolean }) {
    return (
        <div style={{ textAlign: "center", marginBottom: "clamp(40px,6vw,72px)" }}>
            <Badge>{badge}</Badge>
            <h2 style={{ fontFamily: "var(--nm-serif)", fontSize: "clamp(28px,4vw,52px)", fontWeight: 600, color: light ? "#fff" : "#0A0A0A", lineHeight: 1.08, letterSpacing: "-0.02em", margin: "18px 0 0", fontStyle: "italic" }}>
                {title}
            </h2>
            {sub && <p style={{ fontFamily: "var(--nm-sans)", fontSize: 15, color: light ? "rgba(255,255,255,0.55)" : "#666", marginTop: 14, maxWidth: 480, margin: "14px auto 0", lineHeight: 1.7, fontWeight: 400 }}>{sub}</p>}
        </div>
    );
}

// ─── WA Button ────────────────────────────────────────────────────────────────
function WABtn({ label = "Talk on WhatsApp", sm = false }: { label?: string; sm?: boolean }) {
    const [hov, setHov] = useState(false);
    return (
        <a href={WA} target="_blank" rel="noopener noreferrer"
            onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: hov ? "#25D366" : "#0A0A0A", color: "#fff", fontWeight: 600, fontSize: sm ? 12 : 14, letterSpacing: "0.03em", padding: sm ? "10px 20px" : "13px 28px", borderRadius: 999, textDecoration: "none", transition: "all 0.22s ease", fontFamily: "var(--nm-sans)", border: "none", cursor: "pointer", whiteSpace: "nowrap" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            {label}
        </a>
    );
}

// ─── Ghost Button ─────────────────────────────────────────────────────────────
function GhostBtn({ label, href }: { label: string; href: string }) {
    const [hov, setHov] = useState(false);
    return (
        <a href={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, border: `1.5px solid ${hov ? "#B89440" : "#D0CECC"}`, color: hov ? "#B89440" : "#444", fontWeight: 500, fontSize: 13, letterSpacing: "0.04em", padding: "12px 24px", borderRadius: 999, textDecoration: "none", background: "transparent", cursor: "pointer", transition: "all 0.2s", fontFamily: "var(--nm-sans)", whiteSpace: "nowrap" }}>
            {label} <ArrowRight size={13} />
        </a>
    );
}

// ─── Horizontal scroll track for mobile ──────────────────────────────────────
function HScroll({ children, gap = 16 }: { children: React.ReactNode; gap?: number }) {
    return (
        <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none", paddingBottom: 4 }}>
            <style>{`.nm-hscroll::-webkit-scrollbar{display:none}`}</style>
            <div className="nm-hscroll" style={{ display: "flex", gap, paddingLeft: "5%", paddingRight: "5%", width: "max-content" }}>
                {children}
            </div>
        </div>
    );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function NyayMitraCompliance() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileNav, setMobileNav] = useState(false);
    const [activeRisk, setActiveRisk] = useState<number | null>(null);
    const [riskAnswers, setRiskAnswers] = useState<Record<string, boolean>>({});
    const [showResults, setShowResults] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [activeBiz, setActiveBiz] = useState(0);
    const [ticker, setTicker] = useState(0);

    useEffect(() => { const fn = () => setScrolled(window.scrollY > 48); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
    useEffect(() => { const t = setInterval(() => setTicker(p => (p + 1) % 4), 2800); return () => clearInterval(t); }, []);

    const answered = Object.keys(riskAnswers).length;
    const allAnswered = answered === RISK_QUESTIONS.length;
    const riskyCount = RISK_QUESTIONS.filter(q => riskAnswers[q.id] === true).length;
    const riskPct = (riskyCount / RISK_QUESTIONS.length) * 100;
    const riskMeta = riskPct === 0 ? { label: "Low Risk", color: "#0F7B3E", bg: "#EDFAF0", border: "#B7EFC5" } : riskPct <= 33 ? { label: "Moderate Risk", color: "#9A5E0A", bg: "#FEF3C7", border: "#FCD34D" } : riskPct <= 66 ? { label: "High Risk", color: "#B91C1C", bg: "#FEE2E2", border: "#FECACA" } : { label: "Critical Risk", color: "#7F1D1D", bg: "#FEE2E2", border: "#FCA5A5" };
    const riskyItems = RISK_QUESTIONS.filter(q => riskAnswers[q.id] === true);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Outfit:wght@300;400;500;600;700&display=swap');
        :root {
          --nm-gold: #B89440;
          --nm-gold-lt: #D4AF5A;
          --nm-gold-pale: #FDF6E3;
          --nm-ink: #0A0A0A;
          --nm-muted: #666;
          --nm-border: #EBEBEB;
          --nm-bg: #FAFAFA;
          --nm-serif: 'Playfair Display', Georgia, serif;
          --nm-sans: 'Outfit', 'Helvetica Neue', Arial, sans-serif;
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; font-size: 16px; }
        body { font-family: var(--nm-sans); background: #fff; color: var(--nm-ink); -webkit-font-smoothing: antialiased; overflow-x: hidden; }

        @keyframes goldShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .nm-gold-text {
          background: linear-gradient(90deg, #8B6510, var(--nm-gold), #D4AF5A, var(--nm-gold), #8B6510);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: goldShimmer 5s linear infinite;
        }
        @keyframes pulseDot {
          0%,100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.6); opacity: 0.5; }
        }
        .nm-live { animation: pulseDot 2s ease-in-out infinite; }
        @keyframes tickerSlide {
          0% { opacity: 0; transform: translateY(8px); }
          15%,85% { opacity: 1; transform: none; }
          100% { opacity: 0; transform: translateY(-8px); }
        }
        .nm-ticker { animation: tickerSlide 2.8s ease-in-out; }

        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--nm-gold); border-radius: 2px; }

        .nm-card { border: 1px solid var(--nm-border); border-radius: 16px; background: #fff; transition: box-shadow 0.22s, border-color 0.22s, transform 0.22s; }
        .nm-card:hover { box-shadow: 0 16px 48px rgba(184,148,64,0.1); border-color: rgba(184,148,64,0.35); transform: translateY(-3px); }

        .nm-tab-btn { border: none; cursor: pointer; font-family: var(--nm-sans); font-size: 13px; font-weight: 500; padding: 8px 20px; border-radius: 999px; transition: all 0.2s; white-space: nowrap; }

        @media (max-width: 768px) {
          .nm-nav-links { display: none !important; }
          .nm-hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .nm-services-grid { grid-template-columns: 1fr !important; }
          .nm-steps-grid { grid-template-columns: 1fr !important; }
          .nm-stats-grid { grid-template-columns: 1fr 1fr !important; }
          .nm-footer-grid { grid-template-columns: 1fr !important; }
          .nm-hide-mobile { display: none !important; }
          .nm-risks-grid { grid-template-columns: 1fr !important; }
          .nm-testi-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 769px) {
          .nm-show-mobile { display: none !important; }
        }
      `}</style>

            {/* ── NAV ─────────────────────────────────────────────────────────────── */}
            <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, background: scrolled ? "rgba(255,255,255,0.96)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: scrolled ? "1px solid var(--nm-border)" : "1px solid transparent", transition: "all 0.3s", padding: "0 5%" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
                    <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Scale size={16} style={{ color: "#B89440" }} />
                        </div>
                        <span style={{ fontFamily: "var(--nm-serif)", fontWeight: 700, fontSize: 19, color: "#0A0A0A", letterSpacing: "-0.01em" }}>NyayMitra</span>
                    </a>

                    <div className="nm-nav-links" style={{ display: "flex", gap: 32, alignItems: "center" }}>
                        {["Services", "Who It's For", "How It Works", "Trust"].map(l => (
                            <a key={l} href={`#${l.replace(/[^a-z]/gi, "").toLowerCase()}`} style={{ fontFamily: "var(--nm-sans)", fontSize: 13, fontWeight: 500, color: "#444", textDecoration: "none", letterSpacing: "0.02em", transition: "color 0.15s" }}
                                onMouseEnter={e => (e.currentTarget.style.color = "#B89440")} onMouseLeave={e => (e.currentTarget.style.color = "#444")}>
                                {l}
                            </a>
                        ))}
                        <WABtn label="WhatsApp Us" sm />
                    </div>

                    <button className="nm-show-mobile" onClick={() => setMobileNav(p => !p)} style={{ background: "none", border: "1px solid var(--nm-border)", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontFamily: "var(--nm-sans)", fontSize: 12, fontWeight: 600, color: "#333" }}>
                        {mobileNav ? <X size={18} /> : "MENU"}
                    </button>
                </div>

                {/* Mobile menu */}
                {mobileNav && (
                    <div style={{ background: "#fff", borderTop: "1px solid var(--nm-border)", padding: "20px 5% 24px" }}>
                        {["Services", "Who It's For", "How It Works", "Trust"].map(l => (
                            <a key={l} href={`#${l.replace(/[^a-z]/gi, "").toLowerCase()}`} onClick={() => setMobileNav(false)}
                                style={{ display: "block", fontFamily: "var(--nm-sans)", fontSize: 15, fontWeight: 500, color: "#222", textDecoration: "none", padding: "12px 0", borderBottom: "1px solid #F5F5F5" }}>
                                {l}
                            </a>
                        ))}
                        <div style={{ marginTop: 20 }}><WABtn label="Talk on WhatsApp" /></div>
                    </div>
                )}
            </nav>

            {/* ── HERO ─────────────────────────────────────────────────────────────── */}
            <section style={{ minHeight: "100svh", display: "flex", alignItems: "center", padding: "clamp(100px,12vw,140px) 5% clamp(80px,10vw,120px)", position: "relative", overflow: "hidden", background: "#fff" }}>
                {/* Subtle grid bg */}
                <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(184,148,64,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(184,148,64,0.045) 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />
                {/* Radial glow */}
                <div style={{ position: "absolute", top: -120, right: -80, width: 600, height: 600, background: "radial-gradient(circle at 50% 50%, rgba(184,148,64,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

                <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
                    <div className="nm-hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }}>

                        {/* LEFT */}
                        <div>
                            {/* Ticker */}
                            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#F8F4EC", border: "1px solid rgba(184,148,64,0.25)", borderRadius: 8, padding: "8px 16px", marginBottom: 32, overflow: "hidden" }}>
                                <span className="nm-live" style={{ width: 7, height: 7, borderRadius: "50%", background: "#22C55E", display: "inline-block", flexShrink: 0 }} />
                                <div style={{ height: 18, overflow: "hidden", position: "relative", minWidth: 220 }}>
                                    {["50+ businesses protected", "98% approval rate achieved", "FSSAI experts standing by", "Free compliance audit today"].map((txt, i) => ticker === i ? (
                                        <span key={i} className="nm-ticker" style={{ fontFamily: "var(--nm-sans)", fontSize: 12, fontWeight: 600, color: "#7A5C0E", letterSpacing: "0.05em", textTransform: "uppercase", display: "block", position: "absolute", top: 0, whiteSpace: "nowrap" }}>{txt}</span>
                                    ) : null)}
                                </div>
                            </div>

                            <h1 style={{ fontFamily: "var(--nm-serif)", fontWeight: 700, fontSize: "clamp(38px,5.5vw,68px)", lineHeight: 1.04, color: "#0A0A0A", letterSpacing: "-0.025em", marginBottom: 24 }}>
                                Compliance that{" "}
                                <span className="nm-gold-text" style={{ fontStyle: "italic" }}>protects</span>
                                <br />your business.
                            </h1>

                            <p style={{ fontFamily: "var(--nm-sans)", fontSize: 16, color: "#666", lineHeight: 1.8, maxWidth: 480, marginBottom: 36, fontWeight: 400 }}>
                                FSSAI, BIS, MSME, POSH, GST, Trademark every Indian business compliance need, handled by experts. No jargon. No delays. No penalties.
                            </p>

                            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
                                <WABtn label="Get Free Consultation" />
                                <GhostBtn label="Explore Services" href="#services" />
                            </div>

                            {/* Trust strip */}
                            <div style={{ display: "flex", gap: 32, paddingTop: 32, borderTop: "1px solid #F0EDE6", flexWrap: "wrap" }}>
                                {STATS.map(s => (
                                    <div key={s.label}>
                                        <div style={{ fontFamily: "var(--nm-serif)", fontSize: 28, fontWeight: 700, color: "#B89440", letterSpacing: "-0.02em" }}>{s.value}</div>
                                        <div style={{ fontFamily: "var(--nm-sans)", fontSize: 11, color: "#999", letterSpacing: "0.04em", marginTop: 2 }}>{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT Risk Assessment */}
                        <div>
                            <div style={{ background: "#fff", border: "1px solid var(--nm-border)", borderRadius: 20, padding: "clamp(20px,4vw,32px)", boxShadow: "0 32px 80px rgba(0,0,0,0.07), 0 4px 16px rgba(184,148,64,0.06)", position: "relative", overflow: "hidden" }}>
                                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #B89440, #D4AF5A, #B89440)", backgroundSize: "200% 100%", animation: "goldShimmer 4s linear infinite" }} />

                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                                    <div>
                                        <div style={{ fontFamily: "var(--nm-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B89440", marginBottom: 4 }}>Risk Checker</div>
                                        <div style={{ fontFamily: "var(--nm-serif)", fontSize: 18, fontWeight: 600, color: "#0A0A0A", fontStyle: "italic" }}>Is your business exposed?</div>
                                    </div>
                                    <div style={{ width: 44, height: 44, borderRadius: 12, background: "#FDF6E3", border: "1px solid rgba(184,148,64,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <AlertTriangle size={20} style={{ color: "#B89440" }} />
                                    </div>
                                </div>

                                {/* Progress */}
                                <div style={{ marginBottom: 20 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--nm-sans)", fontSize: 11, color: "#999", marginBottom: 6 }}>
                                        <span>Progress</span><span>{answered}/{RISK_QUESTIONS.length} answered</span>
                                    </div>
                                    <div style={{ height: 4, background: "#F0EDE6", borderRadius: 2, overflow: "hidden" }}>
                                        <div style={{ height: "100%", width: `${(answered / RISK_QUESTIONS.length) * 100}%`, background: "linear-gradient(90deg, #B89440, #D4AF5A)", borderRadius: 2, transition: "width 0.4s ease" }} />
                                    </div>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                                    {RISK_QUESTIONS.map(q => (
                                        <div key={q.id} style={{ padding: "12px 14px", background: "#FAFAF8", borderRadius: 12, border: `1px solid ${riskAnswers[q.id] !== undefined ? (riskAnswers[q.id] ? "#FECACA" : "#BBF7D0") : "var(--nm-border)"}`, transition: "all 0.2s" }}>
                                            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
                                                <div style={{ display: "flex", alignItems: "flex-start", gap: 8, flex: 1 }}>
                                                    <span style={{ fontSize: 14, lineHeight: 1.5 }}>{q.icon}</span>
                                                    <span style={{ fontFamily: "var(--nm-sans)", fontSize: 12, color: "#333", fontWeight: 500, lineHeight: 1.5, flex: 1 }}>{q.question}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                                                    {[true, false].map(v => (
                                                        <button key={String(v)} onClick={() => { setRiskAnswers(p => ({ ...p, [q.id]: v })); setShowResults(false); }}
                                                            style={{ padding: "4px 14px", borderRadius: 999, border: riskAnswers[q.id] === v ? (v ? "1.5px solid #DC2626" : "1.5px solid #16A34A") : "1px solid #DDD", background: riskAnswers[q.id] === v ? (v ? "#FEE2E2" : "#DCFCE7") : "#fff", color: riskAnswers[q.id] === v ? (v ? "#B91C1C" : "#15803D") : "#999", fontSize: 11, fontWeight: 600, cursor: "pointer", transition: "all 0.15s", fontFamily: "var(--nm-sans)" }}>
                                                            {v ? "Yes" : "No"}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button onClick={() => allAnswered && setShowResults(true)}
                                    style={{ width: "100%", padding: "13px", background: allAnswered ? "#0A0A0A" : "#E5E5E5", color: allAnswered ? "#fff" : "#AAA", border: "none", borderRadius: 12, fontWeight: 600, fontSize: 14, cursor: allAnswered ? "pointer" : "not-allowed", fontFamily: "var(--nm-sans)", transition: "all 0.2s", letterSpacing: "0.02em" }}
                                    onMouseEnter={e => allAnswered && (e.currentTarget.style.background = "#B89440")}
                                    onMouseLeave={e => allAnswered && (e.currentTarget.style.background = "#0A0A0A")}>
                                    Analyze My Risk →
                                </button>

                                {showResults && allAnswered && (
                                    <div style={{ marginTop: 14, padding: "18px 16px", background: riskMeta.bg, border: `1px solid ${riskMeta.border}`, borderRadius: 14, animation: "goldShimmer 0.3s ease" }}>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                                            <span style={{ fontFamily: "var(--nm-sans)", fontWeight: 700, fontSize: 15, color: riskMeta.color }}>{riskMeta.label}</span>
                                            <span style={{ fontFamily: "var(--nm-sans)", fontSize: 12, color: riskMeta.color, fontWeight: 600 }}>{riskyCount}/{RISK_QUESTIONS.length} gaps</span>
                                        </div>
                                        <div style={{ height: 5, background: "rgba(0,0,0,0.08)", borderRadius: 3, marginBottom: 12, overflow: "hidden" }}>
                                            <div style={{ width: `${riskPct}%`, height: "100%", background: riskMeta.color, borderRadius: 3, transition: "width 0.6s ease" }} />
                                        </div>
                                        {riskyItems.length > 0 && (
                                            <div style={{ marginBottom: 14 }}>
                                                {riskyItems.map(i => <div key={i.id} style={{ fontFamily: "var(--nm-sans)", fontSize: 11, color: "#B91C1C", marginBottom: 4, fontWeight: 500 }}>↳ {i.risk}</div>)}
                                            </div>
                                        )}
                                        <WABtn label="Fix These Gaps Now" sm />
                                    </div>
                                )}

                                {!allAnswered && <p style={{ fontFamily: "var(--nm-sans)", fontSize: 11, color: "#AAA", textAlign: "center", marginTop: 10 }}>Answer all {RISK_QUESTIONS.length} questions to see your risk score</p>}
                            </div>
                        </div>
                    </div>

                    {/* Scroll cue */}
                    <div style={{ display: "flex", justifyContent: "center", marginTop: 64 }}>
                        <a href="#services" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, textDecoration: "none", opacity: 0.4 }}>
                            <span style={{ fontFamily: "var(--nm-sans)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#666" }}>Explore</span>
                            <ChevronDown size={16} style={{ color: "#666" }} />
                        </a>
                    </div>
                </div>
            </section>

            {/* ── MARQUEE STRIP ─────────────────────────────────────────────────────── */}
            <div style={{ background: "#0A0A0A", overflow: "hidden", padding: "14px 0", borderTop: "1px solid #111" }}>
                <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}.nm-marquee{display:flex;animation:marquee 28s linear infinite;width:max-content;}`}</style>
                <div className="nm-marquee">
                    {[...Array(2)].map((_, ri) => (
                        ["FSSAI License", "BIS Certification", "Trademark Filing", "MSME Registration", "GST Compliance", "POSH Setup", "Factory Act", "Trade License", "Labour Compliance", "Startup Documentation"].map((t, i) => (
                            <span key={`${ri}-${i}`} style={{ fontFamily: "var(--nm-sans)", fontSize: 12, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", padding: "0 24px", whiteSpace: "nowrap" }}>
                                <span style={{ color: "#B89440", marginRight: 24 }}>✦</span>{t}
                            </span>
                        ))
                    ))}
                </div>
            </div>

            {/* ── SERVICES ─────────────────────────────────────────────────────────── */}
            <section id="services" style={{ padding: "clamp(64px,10vw,112px) 0", background: "#FAFAFA", borderTop: "1px solid var(--nm-border)" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%" }}>
                    <Reveal>
                        <SectionHead badge="Our Services" title={<>Full stack compliance<br /><em>coverage.</em></>} sub="Every license, certification, and policy your business needs handled by domain specialists." />
                    </Reveal>

                    {/* Tab nav */}
                    <Reveal delay={0.1}>
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
                            <div style={{ display: "flex", gap: 6, background: "#F0EDE6", borderRadius: 999, padding: 4, overflowX: "auto" }}>
                                {SERVICES.map((cat, i) => (
                                    <button key={cat.category} className="nm-tab-btn"
                                        onClick={() => setActiveTab(i)}
                                        style={{ background: activeTab === i ? "#0A0A0A" : "transparent", color: activeTab === i ? "#fff" : "#666", padding: "9px 20px", borderRadius: 999, border: "none", cursor: "pointer", fontFamily: "var(--nm-sans)", fontSize: 13, fontWeight: 500, whiteSpace: "nowrap", transition: "all 0.2s" }}>
                                        {cat.icon} {cat.category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </Reveal>

                    {/* Service cards */}
                    <Reveal delay={0.15}>
                        <div className="nm-services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, maxWidth: 800, margin: "0 auto" }}>
                            {SERVICES[activeTab].services.map((svc, i) => (
                                <div key={svc.name} className="nm-card" style={{ padding: "18px 22px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", borderRadius: 14 }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(184,148,64,0.4)"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(184,148,64,0.1)"; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--nm-border)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                                    <div style={{ width: 40, height: 40, background: "#FDF6E3", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{svc.icon}</div>
                                    <span style={{ fontFamily: "var(--nm-sans)", fontSize: 14, fontWeight: 500, color: "#222", flex: 1 }}>{svc.name}</span>
                                    <ArrowRight size={14} style={{ color: "#B89440", flexShrink: 0 }} />
                                </div>
                            ))}
                        </div>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <div style={{ textAlign: "center", marginTop: 40 }}>
                            <WABtn label={`Get Help with ${SERVICES[activeTab].category}`} />
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── WHO IT'S FOR ─────────────────────────────────────────────────────── */}
            <section id="whoitsfor" style={{ padding: "clamp(64px,10vw,112px) 0", background: "#fff", borderTop: "1px solid var(--nm-border)" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div style={{ padding: "0 5%" }}>
                        <Reveal>
                            <SectionHead badge="Who It's For" title={<>Built for every Indian<br /><em>business type.</em></>} />
                        </Reveal>
                    </div>

                    {/* Desktop grid */}
                    <div className="nm-hide-mobile" style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 0, padding: "0 5%", maxWidth: 1100, margin: "0 auto" }}>
                        {/* Left nav */}
                        <div style={{ borderRight: "1px solid var(--nm-border)", paddingRight: 24, display: "flex", flexDirection: "column", gap: 6 }}>
                            {BUSINESS_TYPES.map((bt, i) => (
                                <button key={bt.title} onClick={() => setActiveBiz(i)}
                                    style={{ textAlign: "left", padding: "12px 16px", borderRadius: 10, border: "none", background: activeBiz === i ? "#FDF6E3" : "transparent", cursor: "pointer", fontFamily: "var(--nm-sans)", fontSize: 14, fontWeight: activeBiz === i ? 600 : 400, color: activeBiz === i ? "#8B6510" : "#555", transition: "all 0.18s", display: "flex", alignItems: "center", gap: 10, borderLeft: activeBiz === i ? "2px solid #B89440" : "2px solid transparent" }}>
                                    <span style={{ fontSize: 18 }}>{bt.icon}</span> {bt.title}
                                </button>
                            ))}
                        </div>

                        {/* Right detail */}
                        <div style={{ paddingLeft: 40 }}>
                            <div style={{ opacity: 1, transition: "opacity 0.3s" }}>
                                <h3 style={{ fontFamily: "var(--nm-serif)", fontSize: 28, fontWeight: 700, color: "#0A0A0A", fontStyle: "italic", marginBottom: 24 }}>{BUSINESS_TYPES[activeBiz].icon} {BUSINESS_TYPES[activeBiz].title}</h3>
                                <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                                    <div style={{ flex: 1, minWidth: 200 }}>
                                        <div style={{ fontFamily: "var(--nm-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#999", marginBottom: 14 }}>Common problems</div>
                                        {BUSINESS_TYPES[activeBiz].problems.map(p => (
                                            <div key={p} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--nm-sans)", fontSize: 14, color: "#555", marginBottom: 10 }}>
                                                <X size={13} style={{ color: "#DC2626", flexShrink: 0 }} /> {p}
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 200 }}>
                                        <div style={{ fontFamily: "var(--nm-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#999", marginBottom: 14 }}>Our solution</div>
                                        <div style={{ padding: "16px 20px", background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 12, fontFamily: "var(--nm-sans)", fontSize: 14, color: "#15803D", fontWeight: 500, lineHeight: 1.6 }}>
                                            <CheckCircle2 size={14} style={{ marginRight: 8, verticalAlign: -2 }} />
                                            {BUSINESS_TYPES[activeBiz].solution}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginTop: 32 }}>
                                    <WABtn label={`Get Help for ${BUSINESS_TYPES[activeBiz].title}`} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile: horizontal scroll cards */}
                    <div className="nm-show-mobile" style={{ marginTop: 8 }}>
                        <HScroll>
                            {BUSINESS_TYPES.map(bt => (
                                <div key={bt.title} className="nm-card" style={{ width: 260, padding: "20px", flexShrink: 0, borderRadius: 16 }}>
                                    <div style={{ fontSize: 28, marginBottom: 12 }}>{bt.icon}</div>
                                    <div style={{ fontFamily: "var(--nm-sans)", fontSize: 15, fontWeight: 600, color: "#111", marginBottom: 12 }}>{bt.title}</div>
                                    {bt.problems.map(p => <div key={p} style={{ fontFamily: "var(--nm-sans)", fontSize: 12, color: "#888", marginBottom: 6, display: "flex", gap: 6 }}><X size={11} style={{ color: "#DC2626", flexShrink: 0, marginTop: 2 }} />{p}</div>)}
                                    <div style={{ marginTop: 14, padding: "10px 14px", background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 10, fontFamily: "var(--nm-sans)", fontSize: 12, color: "#15803D", lineHeight: 1.5 }}>✓ {bt.solution}</div>
                                </div>
                            ))}
                        </HScroll>
                    </div>
                </div>
            </section>

            {/* ── RISKS ────────────────────────────────────────────────────────────── */}
            <section style={{ padding: "clamp(64px,10vw,112px) 0", background: "#0A0A0A", borderTop: "1px solid #111" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%" }}>
                    <Reveal>
                        <SectionHead badge="Compliance Risks" title={<>Non-compliance is <span className="nm-gold-text" style={{ fontStyle: "italic" }}>expensive.</span></>} sub="These are the most common gaps that cost Indian businesses fines, shutdowns, and legal notices." light />
                    </Reveal>

                    <div className="nm-risks-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
                        {RISKS.map((r, i) => (
                            <Reveal key={r.risk} delay={i * 0.07}>
                                <div onClick={() => setActiveRisk(activeRisk === i ? null : i)}
                                    style={{ padding: "22px 24px", borderRadius: 14, border: `1px solid ${activeRisk === i ? "rgba(184,148,64,0.45)" : "#1E1E1E"}`, background: activeRisk === i ? "rgba(184,148,64,0.05)" : "#111", cursor: "pointer", transition: "all 0.22s" }}>
                                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                                                <AlertTriangle size={14} style={{ color: "#F59E0B", flexShrink: 0 }} />
                                                <span style={{ fontFamily: "var(--nm-sans)", fontWeight: 700, fontSize: 14, color: "#fff" }}>{r.risk}</span>
                                            </div>
                                            <div style={{ fontFamily: "var(--nm-sans)", fontSize: 12, color: "#EF4444", lineHeight: 1.55 }}>{r.consequence}</div>
                                        </div>
                                        <span style={{ color: "#B89440", fontSize: 20, fontWeight: 300, flexShrink: 0, lineHeight: 1 }}>{activeRisk === i ? "−" : "+"}</span>
                                    </div>
                                    {activeRisk === i && (
                                        <div style={{ marginTop: 14, padding: "12px 14px", background: "rgba(184,148,64,0.1)", borderRadius: 10, border: "1px solid rgba(184,148,64,0.2)", fontFamily: "var(--nm-sans)", fontSize: 13, color: "#D4AF5A", lineHeight: 1.5 }}>
                                            <CheckCircle2 size={12} style={{ marginRight: 6, verticalAlign: -1 }} />NyayMitra: {r.solution}
                                        </div>
                                    )}
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal delay={0.3}>
                        <div style={{ textAlign: "center", marginTop: 48 }}>
                            <WABtn label="Fix My Compliance Gaps" />
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── HOW IT WORKS ─────────────────────────────────────────────────────── */}
            <section id="howitworks" style={{ padding: "clamp(64px,10vw,112px) 0", background: "#FAFAFA", borderTop: "1px solid var(--nm-border)" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%" }}>
                    <Reveal>
                        <SectionHead badge="Process" title={<>Six steps to full<br /><em>compliance.</em></>} />
                    </Reveal>

                    <div className="nm-steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                        {STEPS.map((s, i) => (
                            <Reveal key={s.num} delay={i * 0.08}>
                                <div className="nm-card" style={{ padding: "28px 24px", borderRadius: 16, height: "100%", position: "relative", overflow: "hidden" }}>
                                    <div style={{ position: "absolute", top: -8, right: 12, fontFamily: "var(--nm-serif)", fontSize: 80, fontWeight: 700, color: "rgba(184,148,64,0.05)", lineHeight: 1, userSelect: "none", fontStyle: "italic" }}>{s.num}</div>
                                    <div style={{ width: 36, height: 36, background: "#0A0A0A", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                                        <span style={{ fontFamily: "var(--nm-serif)", fontWeight: 700, fontSize: 13, color: "#B89440" }}>{s.num}</span>
                                    </div>
                                    <h3 style={{ fontFamily: "var(--nm-sans)", fontSize: 15, fontWeight: 700, color: "#111", marginBottom: 10, letterSpacing: "-0.01em" }}>{s.title}</h3>
                                    <p style={{ fontFamily: "var(--nm-sans)", fontSize: 13, color: "#777", lineHeight: 1.75, fontWeight: 400 }}>{s.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal delay={0.4}>
                        <div style={{ textAlign: "center", marginTop: 48 }}>
                            <WABtn label="Start Your Journey" />
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── TRUST / STATS / TESTIMONIALS ─────────────────────────────────────── */}
            <section id="trust" style={{ padding: "clamp(64px,10vw,112px) 0", background: "#fff", borderTop: "1px solid var(--nm-border)" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%" }}>

                    {/* Stats grid */}
                    <Reveal>
                        <div className="nm-stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, border: "1px solid var(--nm-border)", borderRadius: 18, overflow: "hidden", marginBottom: 80 }}>
                            {STATS.map((s, i) => (
                                <div key={s.label} style={{ padding: "36px 24px", textAlign: "center", background: i % 2 === 0 ? "#FAFAFA" : "#fff", borderRight: i < 3 ? "1px solid var(--nm-border)" : "none" }}>
                                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 8, color: "#B89440" }}>{s.icon}</div>
                                    <div style={{ fontFamily: "var(--nm-serif)", fontSize: 44, fontWeight: 700, color: "#B89440", lineHeight: 1, marginBottom: 8, letterSpacing: "-0.03em" }}>{s.value}</div>
                                    <div style={{ fontFamily: "var(--nm-sans)", fontSize: 12, color: "#999", letterSpacing: "0.03em" }}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </Reveal>

                    {/* <Reveal>
                        <SectionHead badge="Client Stories" title={<>Trusted by growing<br /><em>Indian businesses.</em></>} />
                    </Reveal> */}

                    {/* Desktop testimonials */}
                    {/* <div className="nm-testi-grid nm-hide-mobile" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                        {TESTIMONIALS.map((t, i) => (
                            <Reveal key={t.name} delay={i * 0.1}>
                                <div className="nm-card" style={{ padding: "28px 24px", borderRadius: 18, height: "100%", display: "flex", flexDirection: "column" }}>
                                    <div style={{ color: "#B89440", fontSize: 14, letterSpacing: 3, marginBottom: 16 }}>★★★★★</div>
                                    <p style={{ fontFamily: "var(--nm-serif)", fontSize: 15, color: "#444", lineHeight: 1.8, flex: 1, marginBottom: 24, fontStyle: "italic", fontWeight: 400 }}>"{t.text}"</p>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 18, borderTop: "1px solid #F5F3EE" }}>
                                        <div style={{ width: 42, height: 42, borderRadius: "50%", background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--nm-serif)", fontWeight: 700, fontSize: 14, color: "#B89440", flexShrink: 0 }}>{t.initials}</div>
                                        <div>
                                            <div style={{ fontFamily: "var(--nm-sans)", fontWeight: 700, fontSize: 13, color: "#111" }}>{t.name}</div>
                                            <div style={{ fontFamily: "var(--nm-sans)", fontSize: 11, color: "#999" }}>{t.role}, {t.company}</div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div> */}

                    {/* Mobile testimonials: horizontal scroll */}
                    {/* <div className="nm-show-mobile">
                        <HScroll>
                            {TESTIMONIALS.map(t => (
                                <div key={t.name} className="nm-card" style={{ width: 300, padding: "22px 20px", flexShrink: 0, borderRadius: 16 }}>
                                    <div style={{ color: "#B89440", fontSize: 12, letterSpacing: 3, marginBottom: 12 }}>★★★★★</div>
                                    <p style={{ fontFamily: "var(--nm-serif)", fontSize: 14, color: "#444", lineHeight: 1.75, fontStyle: "italic", marginBottom: 18 }}>"{t.text}"</p>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 14, borderTop: "1px solid #F5F3EE" }}>
                                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--nm-serif)", fontWeight: 700, fontSize: 12, color: "#B89440", flexShrink: 0 }}>{t.initials}</div>
                                        <div>
                                            <div style={{ fontFamily: "var(--nm-sans)", fontWeight: 700, fontSize: 12, color: "#111" }}>{t.name}</div>
                                            <div style={{ fontFamily: "var(--nm-sans)", fontSize: 11, color: "#999" }}>{t.role}, {t.company}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </HScroll>
                    </div> */}
                </div>
            </section>

            {/* ── FINAL CTA ─────────────────────────────────────────────────────────── */}
            <section style={{ padding: "clamp(80px,12vw,140px) 5%", background: "linear-gradient(135deg, #0A0A0A 0%, #141008 50%, #0A0A0A 100%)", position: "relative", overflow: "hidden", borderTop: "1px solid #111" }}>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 800, height: 400, background: "radial-gradient(ellipse, rgba(184,148,64,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
                {/* Gold corner ornament */}
                <div style={{ position: "absolute", top: 40, right: 60, width: 120, height: 120, border: "1px solid rgba(184,148,64,0.12)", borderRadius: "50%", pointerEvents: "none" }} />
                <div style={{ position: "absolute", top: 20, right: 40, width: 80, height: 80, border: "1px solid rgba(184,148,64,0.07)", borderRadius: "50%", pointerEvents: "none" }} />

                <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center", position: "relative" }}>
                    <Reveal>
                        <Badge>Take Action</Badge>
                        <h2 style={{ fontFamily: "var(--nm-serif)", fontWeight: 700, fontSize: "clamp(30px,5vw,58px)", color: "#fff", letterSpacing: "-0.025em", lineHeight: 1.06, margin: "20px 0 20px", fontStyle: "italic" }}>
                            Running a business without compliance <span className="nm-gold-text">is expensive.</span>
                        </h2>
                        <p style={{ fontFamily: "var(--nm-sans)", fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 500, margin: "0 auto 44px", lineHeight: 1.75 }}>
                            Fix compliance before it becomes a business risk. Our experts are ready to help you get fully operational starting today.
                        </p>
                        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                            <WABtn label="Talk to Compliance Team" />
                            <a href="#services" style={{ display: "inline-flex", alignItems: "center", gap: 6, border: "1.5px solid #2A2A2A", color: "rgba(255,255,255,0.5)", fontWeight: 500, fontSize: 13, padding: "12px 24px", borderRadius: 999, textDecoration: "none", fontFamily: "var(--nm-sans)", transition: "all 0.2s" }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = "#B89440"; e.currentTarget.style.color = "#B89440"; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = "#2A2A2A"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}>
                                View All Services <ArrowRight size={13} />
                            </a>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
            <footer style={{ background: "#FAFAFA", borderTop: "1px solid var(--nm-border)", padding: "clamp(48px,8vw,80px) 5% 32px" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div className="nm-footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "clamp(24px,5vw,48px)", marginBottom: 48 }}>
                        {/* Brand col */}
                        <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                                <div style={{ width: 30, height: 30, background: "#0A0A0A", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Scale size={13} style={{ color: "#B89440" }} />
                                </div>
                                <span style={{ fontFamily: "var(--nm-serif)", fontWeight: 700, fontSize: 16, color: "#0A0A0A" }}>NyayMitra</span>
                            </div>
                            <p style={{ fontFamily: "var(--nm-sans)", fontSize: 13, color: "#888", maxWidth: 240, lineHeight: 1.7, marginBottom: 20 }}>
                                Making business compliance accessible to every Indian MSME and startup.
                            </p>
                            {[
                                { icon: <MapPin size={11} />, text: "Koramangala, Bengaluru – 560034" },
                                { icon: <Mail size={11} />, text: "support@nyaymitra.tech", href: "mailto:support@nyaymitra.tech" },
                                { icon: <PhoneCall size={11} />, text: "+91 79705 96183", href: "tel:+917970596183" },
                            ].map((row, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, color: "#999", fontSize: 12, fontFamily: "var(--nm-sans)" }}>
                                    <span style={{ color: "#B89440" }}>{row.icon}</span>
                                    {row.href ? <a href={row.href} style={{ color: "#888", textDecoration: "none" }}>{row.text}</a> : row.text}
                                </div>
                            ))}
                            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                                {[{ icon: <Instagram size={13} />, href: "https://www.instagram.com/nyaymitra.tech" }, { icon: <Linkedin size={13} />, href: "https://www.linkedin.com/company/nyaymitra-tech-pvt-ltd" }].map((s, i) => (
                                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                                        style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid var(--nm-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "#999", textDecoration: "none", transition: "all 0.15s" }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = "#B89440"; e.currentTarget.style.color = "#B89440"; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--nm-border)"; e.currentTarget.style.color = "#999"; }}>
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Link cols */}
                        {[
                            { heading: "Services", links: ["FSSAI License", "BIS Certification", "GST Compliance", "MSME Registration"] },
                            { heading: "Company", links: ["About Us", "Blog", "Careers", "Contact"] },
                            { heading: "Legal", links: ["Privacy Policy", "Terms & Conditions", "Disclaimer"] },
                        ].map(col => (
                            <div key={col.heading}>
                                <h4 style={{ fontFamily: "var(--nm-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#AAA", marginBottom: 16 }}>{col.heading}</h4>
                                <ul style={{ listStyle: "none" }}>
                                    {col.links.map(l => (
                                        <li key={l} style={{ marginBottom: 10 }}>
                                            <a href="#" style={{ fontFamily: "var(--nm-sans)", fontSize: 13, color: "#777", textDecoration: "none", transition: "color 0.15s" }}
                                                onMouseEnter={e => (e.currentTarget.style.color = "#B89440")} onMouseLeave={e => (e.currentTarget.style.color = "#777")}>
                                                {l}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div style={{ paddingTop: 24, borderTop: "1px solid var(--nm-border)", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                        <p style={{ fontFamily: "var(--nm-sans)", fontSize: 11, color: "#BBB" }}>© 2026 NyayMitra Technology Pvt. Ltd. All rights reserved.</p>
                        <p
                            style={{
                                fontFamily: "var(--nm-sans)",

                                fontSize:
                                    typeof window !== "undefined" && window.innerWidth < 768
                                        ? 12
                                        : 11,

                                color: "rgba(12,11,9,0.72)",

                                maxWidth:
                                    typeof window !== "undefined" && window.innerWidth < 768
                                        ? "100%"
                                        : 500,

                                lineHeight: 1.8,

                                textAlign:
                                    typeof window !== "undefined" && window.innerWidth < 768
                                        ? "left"
                                        : "right",

                                padding:
                                    typeof window !== "undefined" && window.innerWidth < 768
                                        ? "0 4px"
                                        : 0,

                                marginTop:
                                    typeof window !== "undefined" && window.innerWidth < 768
                                        ? 16
                                        : 0,

                                fontWeight: 300,
                            }}
                        >
                            <strong
                                style={{
                                    color: "rgba(12,11,9,0.92)",
                                    fontWeight: 600,
                                }}
                            >
                                Disclaimer:
                            </strong>{" "}

                            This website is for informational purposes only and does not
                            constitute legal advice. Consult qualified professionals for your
                            specific compliance needs.
                        </p>
                    </div>
                </div>
            </footer>

            {/* ── FLOATING WA ──────────────────────────────────────────────────────── */}
            {/* <a href={WA} target="_blank" rel="noopener noreferrer"
                style={{ position: "fixed", bottom: 24, right: 24, zIndex: 300, background: "#25D366", color: "#fff", borderRadius: 999, padding: "12px 22px", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", gap: 8, textDecoration: "none", boxShadow: "0 8px 28px rgba(37,211,102,0.35)", transition: "all 0.2s", fontFamily: "var(--nm-sans)", letterSpacing: "0.02em" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 14px 36px rgba(37,211,102,0.45)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(37,211,102,0.35)"; }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                Quick Consultation
            </a> */}
        </>
    );
}