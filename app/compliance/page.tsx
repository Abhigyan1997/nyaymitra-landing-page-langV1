"use client";

import { useState, useEffect, useRef } from "react";
import {
    Scale, MapPin, Mail, PhoneCall, Instagram, Linkedin,
    ArrowRight, ChevronDown, Zap, Plus, Minus,
    CheckCircle2, AlertTriangle, X, ArrowUpRight,
    Globe, FileText, Network, BarChart3, Users,
    BadgeCheck, ChevronRight, Shield, Clock, TrendingUp, Building
} from "lucide-react";

const WA_TEAM = `https://wa.me/917970596183?text=${encodeURIComponent("Hi NyayMitra! I'd like to discuss compliance for my business.")}`;
const WA_ASSESS = `https://wa.me/917970596183?text=${encodeURIComponent("Hi NyayMitra! I'd like to check my compliance status.")}`;

const SERVICES = [
    {
        name: "Shop & Establishment Registration",
        price: "Starting from ₹9,999",
        icon: "🏢"
    },
    {
        name: "Startup Compliance Support",
        price: "Starting from ₹14,999",
        icon: "🚀"
    },
    {
        name: "GST & MSME Coordination",
        price: "Starting from ₹7,499",
        icon: "📊"
    },
    {
        name: "Trademark & IP Coordination",
        price: "Starting from ₹14,999",
        icon: "™️"
    },
    {
        name: "Legal Documentation Workflows",
        price: "Starting from ₹9,999",
        icon: "📋"
    },
    {
        name: "Vendor & Employment Agreements",
        price: "Starting from ₹7,999",
        icon: "🤝"
    },
    {
        name: "Multi City Compliance Execution",
        price: "Starting from ₹24,999",
        icon: "🗺️"
    },
    {
        name: "Operational Legal Support",
        price: "Starting from ₹19,999",
        icon: "⚖️"
    },
    {
        name: "FSSAI License Management",
        price: "Starting from ₹9,999",
        icon: "🍽️"
    },
    {
        name: "BIS Certification Coordination",
        price: "Starting from ₹24,999",
        icon: "✅"
    },
    {
        name: "POSH Policy & ICC Setup",
        price: "Starting from ₹14,999",
        icon: "👥"
    },
    {
        name: "Factory Act & Labour Compliance",
        price: "Starting from ₹19,999",
        icon: "⚙️"
    }
];

const STEPS = [
    { num: "01", title: "Understanding Your Business", desc: "We start by understanding your business structure, team size, operating cities, and industry. This helps us map every compliance obligation that applies to you not a generic checklist.", tags: ["Business Structure", "City Mapping", "Obligation Audit"] },
    { num: "02", title: "Collecting Your Documents", desc: "We tell you exactly what documents are needed and guide you through collection. No back-and-forth confusion just a clear list of what we need from you to get started.", tags: ["Doc Collection", "Verification", "Clear Checklists"] },
    { num: "03", title: "Connecting the Right Experts", desc: "Based on your compliance needs, we connect you with the right professional a CA, CS, lawyer, or specialist. You don't have to find them. We route your work to the right person.", tags: ["CA / CS Routing", "Legal Specialists", "Expert Allocation"] },
    { num: "04", title: "Handling the Filing & Registration", desc: "We coordinate submissions with government bodies, follow up on approvals, and track progress across every city. You stay informed without having to chase anyone.", tags: ["Government Filing", "Status Tracking", "Multi city Execution"] },
    { num: "05", title: "Staying Compliant Long-Term", desc: "Once initial compliance is in place, we track renewals, alert you before deadlines, and handle updates as regulations or your business changes. Compliance doesn't stop at registration.", tags: ["Renewal Alerts", "Regulatory Updates", "Long-term Support"] },
];

const DIFFERENTIATORS = [
    { icon: <Globe size={18} />, title: "Multi city Compliance Support", desc: "Growing across cities means different registrations, different state rules, and different timelines. We coordinate compliance across Bangalore, Mumbai, Delhi, and beyond from a single point of contact." },
    { icon: <FileText size={18} />, title: "Documentation Management", desc: "We collect, verify, organise, and manage every document your compliance requires. No chasing emails, no lost files a structured process from start to approval." },
    { icon: <Network size={18} />, title: "Access to the Right Professionals", desc: "Our network includes chartered accountants, company secretaries, and lawyers. We match your compliance need to the right professional and coordinate the work on your behalf." },
    { icon: <BarChart3 size={18} />, title: "Registration Execution", desc: "We handle government portal submissions, follow up on pending approvals, and communicate status updates. You focus on your business while we get the registrations done." },
    { icon: <Clock size={18} />, title: "Renewal Management", desc: "Compliance isn't a one-time task. We track every renewal date, send alerts before deadlines, and ensure your registrations stay current without you having to remember anything." },
    { icon: <Users size={18} />, title: "A Dedicated Compliance Contact", desc: "You get one point of contact for all your compliance needs. No queues, no tickets, no being passed around. One person who understands your business and coordinates everything." },
];

const AUDIENCES = [
    { title: "Startups", icon: "🚀", desc: "Get your legal and compliance foundation right from day one so investor due diligence, customer contracts, and hiring don't hit unexpected blockers." },
    { title: "MSMEs", icon: "🏭", desc: "Stop spending time on labour law, factory registrations, and licensing. We manage the compliance so you can focus on production and growth." },
    { title: "D2C Brands", icon: "📦", desc: "Protect your brand name, stay GST compliant, and ensure your vendor and marketplace agreements are in order without needing an in-house legal team." },
    { title: "Agencies", icon: "💼", desc: "Employment agreements, POSH compliance, vendor onboarding the documentation that keeps your team and client relationships legally sound." },
    { title: "Multi city Businesses", icon: "🗺️", desc: "Opening offices or operations in new cities? We handle state specific registrations and compliance requirements so expansion doesn't become a compliance headache." },
    { title: "Manufacturing", icon: "⚙️", desc: "Factory act, BIS certifications, FSSAI, pollution clearances complex licensing managed end to end so production doesn't get held up." },
];

const COVERAGE_MATRIX = [
    { category: "Business Setup", icon: "🏢", items: ["Company Incorporation", "MSME Registration", "GST Registration", "Startup India Recognition"] },
    { category: "Labour & HR", icon: "👥", items: ["Shop & Establishment", "POSH Compliance", "Employment Agreements", "Labour Law Compliance"] },
    { category: "Licenses", icon: "📋", items: ["FSSAI License", "BIS Certification", "Trade Licenses", "Professional Tax"] },
    { category: "Legal Docs", icon: "📝", items: ["NDAs & Agreements", "Vendor Contracts", "Employment Contracts", "Service Agreements"] },
    { category: "IP Protection", icon: "™️", items: ["Trademark Filing", "Copyright Registration", "Brand Protection", "IP Coordination"] },
];

const OUTCOMES = [
    { icon: <Shield size={20} />, title: "Avoid Compliance Penalties", desc: "Missed registrations, late filings, and unlicensed operations attract fines, government notices, and shutdowns. Staying compliant prevents costly surprises." },
    { icon: <TrendingUp size={20} />, title: "Stay Investor Due-Diligence Ready", desc: "When investors or acquirers review your business, compliance gaps delay or kill deals. Clean documentation and complete registrations keep you fundable." },
    { icon: <Globe size={20} />, title: "Scale Across Multiple Cities", desc: "Every new city has different registration requirements. We coordinate state-wise compliance so expansion doesn't stall waiting for approvals." },
    { icon: <Building size={20} />, title: "Operate Without In-House Legal Teams", desc: "Hiring a compliance team is expensive. NyayMitra gives growing businesses access to expert coordination without the overhead of full-time legal staff." },
    { icon: <FileText size={20} />, title: "Maintain Organised Documentation", desc: "Compliance documents that are missing, expired, or disorganised create friction with customers, banks, and government bodies. We keep everything in order." },
    { icon: <BadgeCheck size={20} />, title: "Close Enterprise Deals Faster", desc: "Large customers and government contracts require vendors to be compliant. Having registrations in place means fewer delays when a big deal is on the table." },
    { icon: <BarChart3 size={20} />, title: "Reduce Legal Bottlenecks", desc: "Legal delays stall hiring, vendor onboarding, and business expansion. Proactive compliance management removes the roadblocks before they appear." },
    { icon: <Clock size={20} />, title: "Stay Audit Ready", desc: "Tax audits, government inspections, and statutory checks happen without warning. Businesses with complete compliance records handle them without disruption." },
];

const COMPLIANCE_GAPS = [
    "Shop & Establishment Registration", "GST Compliance", "MSME Registration",
    "Labour Law Compliance", "POSH Compliance", "Employment Documentation",
    "Vendor Agreements", "Trademark Protection", "FSSAI License",
    "BIS Certification", "Multi-State Registrations",
];

const TRUST_POINTS = [
    { icon: <Globe size={14} />, label: "PAN India Support" },
    { icon: <BadgeCheck size={14} />, label: "Multi city Compliance Expertise" },
    { icon: <TrendingUp size={14} />, label: "Startup Friendly" },
    { icon: <Users size={14} />, label: "Dedicated Compliance Coordination" },
    { icon: <Network size={14} />, label: "Verified Professional Network" },
    { icon: <Shield size={14} />, label: "Transparent Pricing" },
];

const ONGOING_SUPPORT = [
    { icon: "🔔", title: "Renewal Tracking", desc: "We monitor every renewal date across your registrations and alert you well before deadlines so nothing lapses while you're focused on the business." },
    { icon: "📋", title: "Registration Updates", desc: "When your business changes new city, new employees, new product we update registrations to reflect the current reality of your operations." },
    { icon: "🔍", title: "Compliance Reviews", desc: "Periodic reviews to check whether new regulations apply to your business and whether existing compliance needs updating." },
    { icon: "⚖️", title: "Labour Law Coordination", desc: "Labour law requirements evolve. We keep your employment documentation, POSH setup, and statutory filings current as rules change." },
    { icon: "🗂", title: "Documentation Updates", desc: "Contracts, agreements, and policies that were created at incorporation often need updating as the business grows. We manage that lifecycle." },
    { icon: "📡", title: "Regulatory Alerts", desc: "New rules, amended regulations, or government notifications that affect your business we flag them and advise on what action is needed." },
];

const FAQS = [
    { q: "What compliances apply to my business?", a: "The compliances that apply depend on your business type, industry, team size, and operating cities. A food business needs FSSAI. A company with 10+ employees needs POSH. A business in multiple states needs state specific Shop & Establishment registrations. NyayMitra starts every engagement with a compliance mapping exercise to identify exactly what applies to your business." },
    { q: "Do I need registrations in every city where I operate?", a: "Generally, yes. Shop & Establishment registration, professional tax, and some labour law compliance requirements are state and city-specific. If you're operating in Bangalore, Mumbai, and Delhi, you typically need separate registrations in each location. We coordinate all of them through one engagement." },
    { q: "Can NyayMitra handle multi-state compliance?", a: "Yes. Multi city and multi state compliance coordination is one of our core services. We have handled compliance execution across Bangalore, Mumbai, and Delhi simultaneously for clients like StampMyVisa, managing state specific documentation and filing requirements through a single point of coordination." },
    { q: "Do you provide ongoing compliance support?", a: "Yes. Most businesses don't need a one time filing they need renewals tracked, regulations monitored, and documentation updated as the business evolves. We offer ongoing compliance support that covers renewal management, regulatory alerts, documentation updates, and periodic compliance reviews." },
    { q: "How are government fees charged?", a: "Government fees, statutory charges, and regulatory approval costs are billed separately from our service fees. Our pricing covers expert coordination, documentation management, and execution support. Any government fee payable to a statutory body is passed through to you at actual cost there is no markup on government fees." },
    { q: "Can you coordinate with lawyers, CAs, and CS professionals?", a: "Yes. Our professional network includes chartered accountants, company secretaries, and lawyers. When your compliance requirement needs a specific professional, we route the work to the right person and coordinate their involvement. You don't need to find or manage professionals separately." },
];

const STATS = [
    { value: "12+", label: "Compliance Categories Covered" },
    { value: "3", label: "Multicity Workflows Executed" },
    { value: "50+", label: "Businesses Supported" },
    // { value: "15+", label: "Verified Professionals Network" },
];

function useInView(threshold = 0.1) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
        obs.observe(el); return () => obs.disconnect();
    }, [threshold]);
    return { ref, visible };
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
    const { ref, visible } = useInView();
    return (
        <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: `opacity 0.7s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.7s cubic-bezier(.16,1,.3,1) ${delay}s` }}>
            {children}
        </div>
    );
}

function EyebrowLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
    return (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20, fontFamily: "var(--nm-sans)", fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: light ? "rgba(184,148,64,0.9)" : "#8B6510" }}>
            <span style={{ width: 20, height: 1, background: light ? "rgba(184,148,64,0.5)" : "#B89440", display: "inline-block" }} />
            {children}
        </div>
    );
}

function PrimaryBtn({ label, href, dark = true }: { label: string; href: string; dark?: boolean }) {
    const [hov, setHov] = useState(false);
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: dark ? (hov ? "#B89440" : "#0A0A0A") : (hov ? "#0A0A0A" : "#B89440"), color: "#fff", fontWeight: 600, fontSize: 13, letterSpacing: "0.04em", padding: "12px 24px", borderRadius: 4, textDecoration: "none", transition: "all 0.2s ease", fontFamily: "var(--nm-sans)", border: "none", cursor: "pointer", whiteSpace: "nowrap" }}>
            {label} <ArrowRight size={13} />
        </a>
    );
}

function OutlineBtn({ label, href, light = false }: { label: string; href: string; light?: boolean }) {
    const [hov, setHov] = useState(false);
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, border: `1.5px solid ${light ? (hov ? "#D4AF5A" : "rgba(255,255,255,0.2)") : (hov ? "#0A0A0A" : "#CCC")}`, color: light ? (hov ? "#D4AF5A" : "rgba(255,255,255,0.6)") : (hov ? "#0A0A0A" : "#555"), fontWeight: 500, fontSize: 13, letterSpacing: "0.04em", padding: "11px 22px", borderRadius: 4, textDecoration: "none", background: "transparent", cursor: "pointer", transition: "all 0.2s", fontFamily: "var(--nm-sans)", whiteSpace: "nowrap" }}>
            {label}
        </a>
    );
}

export default function NyayMitraCompliance() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileNav, setMobileNav] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [activeDiff, setActiveDiff] = useState(0);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn);
    }, []);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Outfit:wght@300;400;500;600;700&display=swap');
        :root {
          --nm-gold: #B89440; --nm-gold-lt: #D4AF5A; --nm-gold-pale: #FBF6E8;
          --nm-ink: #0A0A0A; --nm-border: #E8E5DF; --nm-bg: #F7F5F0;
          --nm-serif: 'Playfair Display', Georgia, serif;
          --nm-sans: 'Outfit', 'Helvetica Neue', Arial, sans-serif;
          --nm-mono: 'Outfit', 'Courier New', monospace;
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: var(--nm-sans); background: #fff; color: var(--nm-ink); -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        @keyframes shimmerLine { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        .nm-gold-shimmer { background: linear-gradient(90deg, #8B6510, #B89440, #D4AF5A, #B89440, #8B6510); background-size: 300% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: shimmerLine 6s linear infinite; }
        @keyframes marqueeFlow { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .nm-marquee { display: flex; animation: marqueeFlow 32s linear infinite; width: max-content; }
        ::-webkit-scrollbar { width: 3px; height: 3px; }
        ::-webkit-scrollbar-thumb { background: var(--nm-gold); border-radius: 2px; }
        @media (max-width: 768px) {
          .nm-nav-links { display: none !important; }
          .nm-hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .nm-two-col { grid-template-columns: 1fr !important; }
          .nm-three-col { grid-template-columns: 1fr !important; }
          .nm-four-col { grid-template-columns: 1fr 1fr !important; }
          .nm-five-col { grid-template-columns: 1fr 1fr !important; }
          .nm-hide-mobile { display: none !important; }
          .nm-steps-layout { grid-template-columns: 1fr !important; }
          .nm-footer-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 769px) { .nm-show-mobile { display: none !important; } }
      `}</style>

            {/* NAV */}
            <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, background: scrolled ? "rgba(255,255,255,0.97)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid var(--nm-border)" : "1px solid transparent", transition: "all 0.35s ease", padding: "0 5%" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
                    <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                        <div style={{ width: 34, height: 34, borderRadius: 6, background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center" }}><Scale size={15} style={{ color: "#B89440" }} /></div>
                        <div>
                            <div style={{ fontFamily: "var(--nm-serif)", fontWeight: 600, fontSize: 17, color: "#0A0A0A", letterSpacing: "-0.01em", lineHeight: 1 }}>NyayMitra</div>
                            <div style={{ fontFamily: "var(--nm-sans)", fontSize: 8, color: "#B89440", letterSpacing: "0.14em", textTransform: "uppercase", lineHeight: 1.4, fontWeight: 500 }}>Legal Operations</div>
                        </div>
                    </a>
                    <div className="nm-nav-links" style={{ display: "flex", gap: 36, alignItems: "center" }}>
                        {[["Services", "#services"], ["How It Works", "#process"], ["FAQ", "#faq"], ["About", "#about"]].map(([l, h]) => (
                            <a key={l} href={h} style={{ fontFamily: "var(--nm-sans)", fontSize: 13, fontWeight: 400, color: "#555", textDecoration: "none", transition: "color 0.15s" }}
                                onMouseEnter={e => (e.currentTarget.style.color = "#0A0A0A")} onMouseLeave={e => (e.currentTarget.style.color = "#555")}>{l}</a>
                        ))}
                        <PrimaryBtn label="Talk to Team" href={WA_TEAM} />
                    </div>
                    <button className="nm-show-mobile" onClick={() => setMobileNav(p => !p)} style={{ background: "none", border: "1px solid var(--nm-border)", borderRadius: 4, padding: "6px 14px", cursor: "pointer", fontFamily: "var(--nm-sans)", fontSize: 11, color: "#333", letterSpacing: "0.08em" }}>
                        {mobileNav ? <X size={16} /> : "MENU"}
                    </button>
                </div>
                {mobileNav && (
                    <div style={{ background: "#fff", borderTop: "1px solid var(--nm-border)", padding: "20px 5% 28px" }}>
                        {[["Services", "#services"], ["How It Works", "#process"], ["FAQ", "#faq"], ["About", "#about"]].map(([l, h]) => (
                            <a key={l} href={h} onClick={() => setMobileNav(false)} style={{ display: "block", fontFamily: "var(--nm-sans)", fontSize: 15, color: "#222", textDecoration: "none", padding: "12px 0", borderBottom: "1px solid #F0EDE6" }}>{l}</a>
                        ))}
                        <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
                            <PrimaryBtn label="Talk to Team" href={WA_TEAM} />
                            <OutlineBtn label="Check My Status" href={WA_ASSESS} />
                        </div>
                    </div>
                )}
            </nav>

            {/* HERO */}
            <section style={{ minHeight: "100svh", display: "flex", alignItems: "center", padding: "clamp(110px,13vw,148px) 5% clamp(80px,10vw,120px)", position: "relative", overflow: "hidden", background: "#fff" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(184,148,64,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(184,148,64,0.035) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
                <div style={{ position: "absolute", top: 0, right: 0, width: "45%", height: "100%", background: "linear-gradient(135deg, transparent 0%, rgba(251,246,232,0.5) 100%)", pointerEvents: "none" }} />
                <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
                    <div className="nm-hero-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 80, alignItems: "center" }}>
                        <div>
                            <Reveal><EyebrowLabel>Compliance & Legal Operations</EyebrowLabel></Reveal>
                            <Reveal delay={0.05}>
                                <h1 style={{ fontFamily: "var(--nm-serif)", fontWeight: 600, fontStyle: "italic", fontSize: "clamp(38px,5.2vw,64px)", lineHeight: 1.06, color: "#0A0A0A", letterSpacing: "-0.02em", marginBottom: 28 }}>
                                    Take compliance<br />
                                    <span className="nm-gold-shimmer">off your plate.</span>
                                </h1>
                            </Reveal>
                            <Reveal delay={0.1}>
                                <p style={{ fontFamily: "var(--nm-sans)", fontSize: 16, color: "#555", lineHeight: 1.85, maxWidth: 520, marginBottom: 16, fontWeight: 400 }}>
                                    NyayMitra handles registrations, documentation, renewals, and legal coordination for growing businesses so founders spend time building, not managing compliance.
                                </p>
                                <p style={{ fontFamily: "var(--nm-sans)", fontSize: 14, color: "#888", lineHeight: 1.75, maxWidth: 480, marginBottom: 40, fontWeight: 300 }}>
                                    Startups · MSMEs · D2C Brands · Multi city Businesses
                                </p>
                            </Reveal>
                            <Reveal delay={0.15}>
                                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 56 }}>
                                    <PrimaryBtn label="Talk to Compliance Team" href={WA_TEAM} />
                                    <OutlineBtn label="Check My Compliance Status" href={WA_ASSESS} />
                                </div>
                            </Reveal>
                            <Reveal delay={0.2}>
                                <div style={{ display: "flex", gap: 32, paddingTop: 32, borderTop: "1px solid var(--nm-border)", flexWrap: "wrap" }}>
                                    {STATS.map(s => (
                                        <div key={s.label}>
                                            <div style={{ fontFamily: "var(--nm-serif)", fontStyle: "italic", fontSize: 30, fontWeight: 700, color: "#B89440", letterSpacing: "-0.02em", lineHeight: 1 }}>{s.value}</div>
                                            <div style={{ fontFamily: "var(--nm-sans)", fontSize: 9, color: "#999", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4, lineHeight: 1.4, fontWeight: 500 }}>{s.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </Reveal>
                        </div>
                        <Reveal delay={0.12}>
                            <div style={{ background: "#0A0A0A", borderRadius: 12, padding: "clamp(24px,4vw,40px)", position: "relative", overflow: "hidden" }}>
                                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #B89440, #D4AF5A, #B89440, transparent)" }} />
                                <div style={{ fontFamily: "var(--nm-sans)", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(184,148,64,0.7)", marginBottom: 20, fontWeight: 600 }}>What We Handle For You</div>
                                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                    {["Business Registrations & Licenses", "Documentation Collection & Management", "Expert Coordination (CA / CS / Lawyers)", "Multi city Filing & Execution", "Renewals & Ongoing Compliance"].map(item => (
                                        <div key={item} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderRadius: 6, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", flexShrink: 0 }} />
                                                <span style={{ fontFamily: "var(--nm-sans)", fontSize: 13, fontWeight: 400, color: "rgba(255,255,255,0.8)" }}>{item}</span>
                                            </div>
                                            <CheckCircle2 size={13} style={{ color: "#B89440", flexShrink: 0 }} />
                                        </div>
                                    ))}
                                </div>
                                <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <div>
                                        <div style={{ fontFamily: "var(--nm-sans)", fontSize: 9, color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4, fontWeight: 600 }}>How It Works</div>
                                        <div style={{ fontFamily: "var(--nm-sans)", fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 300 }}>One contact. All compliance. Fully managed.</div>
                                    </div>
                                    <BadgeCheck size={20} style={{ color: "#B89440", flexShrink: 0 }} />
                                </div>
                            </div>
                        </Reveal>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", marginTop: 64 }}>
                        <a href="#gaps" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, textDecoration: "none", opacity: 0.35 }}>
                            <span style={{ fontFamily: "var(--nm-sans)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "#666", fontWeight: 500 }}>See What You Might Be Missing</span>
                            <ChevronDown size={14} style={{ color: "#666" }} />
                        </a>
                    </div>
                </div>
            </section>

            {/* TICKER */}
            <div style={{ background: "#0A0A0A", overflow: "hidden", padding: "12px 0", borderTop: "1px solid #111", borderBottom: "1px solid #111" }}>
                <div className="nm-marquee">
                    {[...Array(2)].map((_, ri) =>
                        ["Shop & Establishment", "GST Registration", "MSME Registration", "Trademark Filing", "FSSAI License", "POSH Compliance", "Labour Law", "Multi city Compliance", "BIS Certification", "Employment Agreements", "Vendor Contracts", "Company Incorporation"].map((t, i) => (
                            <span key={`${ri}-${i}`} style={{ fontFamily: "var(--nm-sans)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", padding: "0 28px", whiteSpace: "nowrap", fontWeight: 500 }}>
                                <span style={{ color: "#B89440", marginRight: 28 }}>◆</span>{t}
                            </span>
                        ))
                    )}
                </div>
            </div>

            {/* COMPLIANCE GAPS */}
            <section id="gaps" style={{ padding: "clamp(72px,10vw,120px) 0", background: "#FAFAF7", borderBottom: "1px solid var(--nm-border)" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%" }}>
                    <Reveal>
                        <div style={{ marginBottom: "clamp(40px,5vw,60px)", maxWidth: 640 }}>
                            <EyebrowLabel>Compliance Gaps</EyebrowLabel>
                            <h2 style={{ fontFamily: "var(--nm-serif)", fontSize: "clamp(28px,4vw,50px)", fontWeight: 600, fontStyle: "italic", color: "#0A0A0A", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16 }}>
                                Common compliance gaps businesses miss.
                            </h2>
                            <p style={{ fontFamily: "var(--nm-sans)", fontSize: 15, color: "#666", lineHeight: 1.8, fontWeight: 300 }}>
                                Most businesses discover compliance issues only when facing penalties, audits, investor due diligence, customer onboarding requirements, or government notices. By then, the cost of fixing them is far higher than getting them right early.
                            </p>
                        </div>
                    </Reveal>
                    <Reveal delay={0.08}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10, marginBottom: 40 }}>
                            {COMPLIANCE_GAPS.map((gap, i) => (
                                <div key={gap} style={{ padding: "14px 18px", background: "#fff", border: "1px solid var(--nm-border)", borderRadius: 8, display: "flex", alignItems: "center", gap: 10, transition: "all 0.18s" }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(184,148,64,0.45)"; (e.currentTarget as HTMLElement).style.background = "#FBF6E8"; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--nm-border)"; (e.currentTarget as HTMLElement).style.background = "#fff"; }}>
                                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(184,148,64,0.12)", border: "1px solid rgba(184,148,64,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        <CheckCircle2 size={11} style={{ color: "#B89440" }} />
                                    </div>
                                    <span style={{ fontFamily: "var(--nm-sans)", fontSize: 13, color: "#333", fontWeight: 400 }}>{gap}</span>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                            <PrimaryBtn label="Check My Compliance Status" href={WA_ASSESS} />
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* WHAT WE HELP YOU ACHIEVE */}
            <section style={{ padding: "clamp(72px,10vw,120px) 0", background: "#fff", borderBottom: "1px solid var(--nm-border)" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%" }}>
                    <Reveal>
                        <div style={{ marginBottom: "clamp(40px,5vw,60px)" }}>
                            <EyebrowLabel>Business Outcomes</EyebrowLabel>
                            <h2 style={{ fontFamily: "var(--nm-serif)", fontSize: "clamp(28px,4vw,50px)", fontWeight: 600, fontStyle: "italic", color: "#0A0A0A", lineHeight: 1.1, letterSpacing: "-0.02em", maxWidth: 520 }}>What we help businesses achieve.</h2>
                            <p style={{ fontFamily: "var(--nm-sans)", fontSize: 15, color: "#666", marginTop: 16, maxWidth: 520, lineHeight: 1.8, fontWeight: 300 }}>Not features. Not processes. These are the outcomes founders and business owners actually care about.</p>
                        </div>
                    </Reveal>
                    <div className="nm-four-col" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
                        {OUTCOMES.map((o, i) => (
                            <Reveal key={o.title} delay={i * 0.06}>
                                <div style={{ padding: "24px 22px", background: "#FAFAF7", border: "1px solid var(--nm-border)", borderRadius: 10, height: "100%", transition: "all 0.2s" }}
                                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(184,148,64,0.4)"; el.style.background = "#FBF6E8"; el.style.transform = "translateY(-2px)"; }}
                                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--nm-border)"; el.style.background = "#FAFAF7"; el.style.transform = "none"; }}>
                                    <div style={{ width: 36, height: 36, background: "#0A0A0A", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "#B89440", marginBottom: 14 }}>{o.icon}</div>
                                    <div style={{ fontFamily: "var(--nm-sans)", fontSize: 13, fontWeight: 600, color: "#0A0A0A", marginBottom: 8, letterSpacing: "-0.01em" }}>{o.title}</div>
                                    <p style={{ fontFamily: "var(--nm-sans)", fontSize: 12, color: "#777", lineHeight: 1.75, fontWeight: 300 }}>{o.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHY NYAYMITRA DIFFERENTIATORS */}
            <section id="approach" style={{ padding: "clamp(72px,10vw,120px) 0", background: "#FAFAF7", borderBottom: "1px solid var(--nm-border)" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%" }}>
                    <Reveal>
                        <div style={{ marginBottom: "clamp(40px,5vw,60px)" }}>
                            <EyebrowLabel>Why NyayMitra</EyebrowLabel>
                            <h2 style={{ fontFamily: "var(--nm-serif)", fontSize: "clamp(28px,4vw,50px)", fontWeight: 600, fontStyle: "italic", color: "#0A0A0A", lineHeight: 1.1, letterSpacing: "-0.02em", maxWidth: 560 }}>More than just filing. A compliance partner.</h2>
                            <p style={{ fontFamily: "var(--nm-sans)", fontSize: 15, color: "#666", marginTop: 16, maxWidth: 540, lineHeight: 1.8, fontWeight: 300 }}>We don't just submit documents. We manage the coordination, documentation, expert routing, and follow-up so compliance actually gets done and stays done.</p>
                        </div>
                    </Reveal>
                    <div className="nm-two-col" style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 0, alignItems: "start" }}>
                        <div className="nm-hide-mobile" style={{ borderRight: "1px solid var(--nm-border)" }}>
                            {DIFFERENTIATORS.map((d, i) => (
                                <button key={d.title} onClick={() => setActiveDiff(i)} style={{ width: "100%", textAlign: "left", padding: "16px 20px", background: activeDiff === i ? "#0A0A0A" : "transparent", border: "none", borderBottom: "1px solid var(--nm-border)", cursor: "pointer", fontFamily: "var(--nm-sans)", fontSize: 13, fontWeight: activeDiff === i ? 500 : 400, color: activeDiff === i ? "#fff" : "#555", transition: "all 0.18s", display: "flex", alignItems: "center", gap: 10 }}>
                                    <span style={{ color: activeDiff === i ? "#B89440" : "inherit", flexShrink: 0 }}>{d.icon}</span>
                                    {d.title}
                                </button>
                            ))}
                        </div>
                        <div className="nm-hide-mobile" style={{ paddingLeft: 48, paddingTop: 8 }}>
                            <div style={{ background: "#fff", border: "1px solid var(--nm-border)", borderRadius: 10, padding: "36px 40px", minHeight: 240 }}>
                                <div style={{ width: 44, height: 44, background: "#0A0A0A", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#B89440", marginBottom: 20 }}>{DIFFERENTIATORS[activeDiff].icon}</div>
                                <h3 style={{ fontFamily: "var(--nm-serif)", fontSize: 22, fontWeight: 600, fontStyle: "italic", color: "#0A0A0A", marginBottom: 16 }}>{DIFFERENTIATORS[activeDiff].title}</h3>
                                <p style={{ fontFamily: "var(--nm-sans)", fontSize: 15, color: "#555", lineHeight: 1.85, fontWeight: 300 }}>{DIFFERENTIATORS[activeDiff].desc}</p>
                                <div style={{ marginTop: 28 }}><PrimaryBtn label="Talk to Our Team" href={WA_TEAM} /></div>
                            </div>
                        </div>
                        <div className="nm-show-mobile" style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: 12 }}>
                            {DIFFERENTIATORS.map((d, i) => (
                                <Reveal key={d.title} delay={i * 0.06}>
                                    <div style={{ padding: "20px", background: "#fff", border: "1px solid var(--nm-border)", borderRadius: 10 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                                            <div style={{ width: 34, height: 34, background: "#0A0A0A", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "#B89440", flexShrink: 0 }}>{d.icon}</div>
                                            <span style={{ fontFamily: "var(--nm-sans)", fontSize: 14, fontWeight: 600, color: "#0A0A0A" }}>{d.title}</span>
                                        </div>
                                        <p style={{ fontFamily: "var(--nm-sans)", fontSize: 13, color: "#666", lineHeight: 1.75, fontWeight: 300 }}>{d.desc}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* BUILT FOR WHO WE WORK WITH */}
            <section style={{ padding: "clamp(72px,10vw,120px) 0", background: "#0A0A0A", borderBottom: "1px solid #111" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%" }}>
                    <Reveal>
                        <div style={{ marginBottom: "clamp(40px,5vw,60px)" }}>
                            <EyebrowLabel light>Who We Work With</EyebrowLabel>
                            <h2 style={{ fontFamily: "var(--nm-serif)", fontSize: "clamp(28px,4vw,50px)", fontWeight: 600, fontStyle: "italic", color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em", maxWidth: 560 }}>Built for every type of growing business.</h2>
                            <p style={{ fontFamily: "var(--nm-sans)", fontSize: 15, color: "rgba(255,255,255,0.4)", marginTop: 16, maxWidth: 540, lineHeight: 1.8, fontWeight: 300 }}>Whether you're a first-time founder or scaling to multiple cities, compliance requirements are specific to your business type. Here's how we help each.</p>
                        </div>
                    </Reveal>
                    <div className="nm-three-col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                        {AUDIENCES.map((a, i) => (
                            <Reveal key={a.title} delay={i * 0.07}>
                                <div style={{ padding: "26px 22px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, transition: "all 0.2s", height: "100%" }}
                                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(184,148,64,0.3)"; el.style.background = "rgba(184,148,64,0.04)"; }}
                                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.07)"; el.style.background = "rgba(255,255,255,0.03)"; }}>
                                    <div style={{ fontSize: 26, marginBottom: 14 }}>{a.icon}</div>
                                    <div style={{ fontFamily: "var(--nm-sans)", fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 10 }}>{a.title}</div>
                                    <p style={{ fontFamily: "var(--nm-sans)", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, fontWeight: 300 }}>{a.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section id="process" style={{ padding: "clamp(72px,10vw,120px) 0", background: "#FAFAF7", borderBottom: "1px solid var(--nm-border)" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%" }}>
                    <Reveal>
                        <div style={{ marginBottom: "clamp(40px,5vw,60px)" }}>
                            <EyebrowLabel>How It Works</EyebrowLabel>
                            <h2 style={{ fontFamily: "var(--nm-serif)", fontSize: "clamp(28px,4vw,50px)", fontWeight: 600, fontStyle: "italic", color: "#0A0A0A", lineHeight: 1.1, letterSpacing: "-0.02em" }}>Simple from start to finish.</h2>
                            <p style={{ fontFamily: "var(--nm-sans)", fontSize: 15, color: "#666", marginTop: 16, maxWidth: 480, lineHeight: 1.8, fontWeight: 300 }}>You tell us about your business. We handle the rest from identifying what you need to getting it done and keeping it current.</p>
                        </div>
                    </Reveal>
                    <div className="nm-steps-layout" style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 48, alignItems: "start" }}>
                        <div className="nm-hide-mobile">
                            {STEPS.map((s, i) => (
                                <button key={s.num} onClick={() => setActiveStep(i)} style={{ width: "100%", textAlign: "left", padding: "18px 20px", background: activeStep === i ? "#0A0A0A" : "transparent", border: "none", borderBottom: "1px solid var(--nm-border)", cursor: "pointer", fontFamily: "var(--nm-sans)", display: "flex", alignItems: "center", gap: 14, transition: "all 0.18s" }}>
                                    <span style={{ fontFamily: "var(--nm-sans)", fontSize: 10, color: activeStep === i ? "#B89440" : "#BBB", letterSpacing: "0.1em", fontWeight: 600, flexShrink: 0 }}>{s.num}</span>
                                    <span style={{ fontSize: 13, fontWeight: activeStep === i ? 600 : 400, color: activeStep === i ? "#fff" : "#555" }}>{s.title}</span>
                                    {activeStep === i && <ChevronRight size={13} style={{ color: "#B89440", marginLeft: "auto", flexShrink: 0 }} />}
                                </button>
                            ))}
                        </div>
                        <div className="nm-hide-mobile">
                            <div style={{ background: "#fff", border: "1px solid var(--nm-border)", borderRadius: 10, padding: "40px", minHeight: 280 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
                                    <div style={{ fontFamily: "var(--nm-serif)", fontStyle: "italic", fontSize: 56, fontWeight: 700, color: "#F0EDE6", lineHeight: 1 }}>{STEPS[activeStep].num}</div>
                                    <div style={{ width: 40, height: 40, background: "#0A0A0A", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Zap size={16} style={{ color: "#B89440" }} /></div>
                                </div>
                                <h3 style={{ fontFamily: "var(--nm-serif)", fontSize: 24, fontWeight: 600, fontStyle: "italic", color: "#0A0A0A", marginBottom: 16 }}>{STEPS[activeStep].title}</h3>
                                <p style={{ fontFamily: "var(--nm-sans)", fontSize: 15, color: "#555", lineHeight: 1.85, fontWeight: 300, marginBottom: 28 }}>{STEPS[activeStep].desc}</p>
                                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                    {STEPS[activeStep].tags.map(tag => (<span key={tag} style={{ fontFamily: "var(--nm-sans)", fontSize: 10, fontWeight: 600, color: "#8B6510", background: "#FBF6E8", border: "1px solid rgba(184,148,64,0.2)", borderRadius: 3, padding: "4px 12px", letterSpacing: "0.06em" }}>{tag}</span>))}
                                </div>
                            </div>
                        </div>
                        <div className="nm-show-mobile" style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: 12 }}>
                            {STEPS.map((s, i) => (
                                <Reveal key={s.num} delay={i * 0.07}>
                                    <div style={{ padding: "22px 20px", background: "#fff", border: "1px solid var(--nm-border)", borderRadius: 10 }}>
                                        <div style={{ fontFamily: "var(--nm-sans)", fontSize: 10, color: "#B89440", letterSpacing: "0.1em", marginBottom: 8, fontWeight: 600 }}>{s.num}</div>
                                        <div style={{ fontFamily: "var(--nm-sans)", fontSize: 15, fontWeight: 600, color: "#0A0A0A", marginBottom: 8 }}>{s.title}</div>
                                        <p style={{ fontFamily: "var(--nm-sans)", fontSize: 13, color: "#666", lineHeight: 1.75, fontWeight: 300 }}>{s.desc}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section id="services" style={{ padding: "clamp(72px,10vw,120px) 0", background: "#fff", borderBottom: "1px solid var(--nm-border)" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%" }}>
                    <Reveal>
                        <div style={{ marginBottom: "clamp(40px,5vw,60px)" }}>
                            <EyebrowLabel>Services</EyebrowLabel>
                            <h2 style={{ fontFamily: "var(--nm-serif)", fontSize: "clamp(28px,4vw,50px)", fontWeight: 600, fontStyle: "italic", color: "#0A0A0A", lineHeight: 1.1, letterSpacing: "-0.02em", maxWidth: 540 }}>Compliance services we handle.</h2>
                        </div>
                    </Reveal>
                    <div className="nm-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: "1px solid var(--nm-border)", borderRadius: 10, overflow: "hidden" }}>
                        {SERVICES.map((svc, i) => (
                            <Reveal key={svc.name} delay={Math.min(i * 0.04, 0.3)}>
                                <div style={{ padding: "18px 24px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", borderBottom: "1px solid var(--nm-border)", borderRight: i % 2 === 0 ? "1px solid var(--nm-border)" : "none", background: "#fff", transition: "background 0.15s" }}
                                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#FBF6E8"}
                                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#fff"}>
                                    <span style={{ fontSize: 18, flexShrink: 0 }}>{svc.icon}</span>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontFamily: "var(--nm-sans)", fontSize: 13, fontWeight: 500, color: "#111" }}>{svc.name}</div>
                                        <div style={{ fontFamily: "var(--nm-sans)", fontSize: 10, color: "#B89440", marginTop: 3, letterSpacing: "0.04em", fontWeight: 500 }}>{svc.price} + Govt. Fees</div>
                                    </div>
                                    <ArrowUpRight size={13} style={{ color: "#B89440", flexShrink: 0 }} />
                                </div>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal delay={0.1}>
                        <div style={{ marginTop: 20, padding: "14px 20px", background: "#FAFAF7", border: "1px solid var(--nm-border)", borderRadius: 6, display: "flex", alignItems: "flex-start", gap: 10 }}>
                            <AlertTriangle size={13} style={{ color: "#B89440", flexShrink: 0, marginTop: 2 }} />
                            <p style={{ fontFamily: "var(--nm-sans)", fontSize: 12, color: "#888", lineHeight: 1.65, fontWeight: 300 }}>
                                <strong style={{ fontWeight: 600, color: "#555" }}>Fee Note: </strong>
                                Government fees, statutory charges, regulatory approvals, and third party professional fees are billed separately where applicable. Service pricing reflects coordination, documentation, and execution support only.
                            </p>
                        </div>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 36 }}>
                            <PrimaryBtn label="Discuss Your Requirements" href={WA_TEAM} />
                            <OutlineBtn label="Book Compliance Assessment" href={WA_ASSESS} />
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* COMPLIANCE COVERAGE MATRIX */}
            <section style={{ padding: "clamp(72px,10vw,120px) 0", background: "#FAFAF7", borderBottom: "1px solid var(--nm-border)" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%" }}>
                    <Reveal>
                        <div style={{ marginBottom: "clamp(40px,5vw,60px)" }}>
                            <EyebrowLabel>Coverage</EyebrowLabel>
                            <h2 style={{ fontFamily: "var(--nm-serif)", fontSize: "clamp(28px,4vw,50px)", fontWeight: 600, fontStyle: "italic", color: "#0A0A0A", lineHeight: 1.1, letterSpacing: "-0.02em", maxWidth: 540 }}>Compliance categories we support.</h2>
                            <p style={{ fontFamily: "var(--nm-sans)", fontSize: 15, color: "#666", marginTop: 16, maxWidth: 480, lineHeight: 1.8, fontWeight: 300 }}>From incorporation to IP, labour law to licensing a comprehensive view of what NyayMitra covers.</p>
                        </div>
                    </Reveal>
                    <div className="nm-five-col" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
                        {COVERAGE_MATRIX.map((col, i) => (
                            <Reveal key={col.category} delay={i * 0.07}>
                                <div style={{ padding: "22px 20px", background: "#fff", border: "1px solid var(--nm-border)", borderRadius: 10, height: "100%" }}>
                                    <div style={{ fontSize: 22, marginBottom: 12 }}>{col.icon}</div>
                                    <div style={{ fontFamily: "var(--nm-sans)", fontSize: 12, fontWeight: 700, color: "#0A0A0A", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14, paddingBottom: 12, borderBottom: "1px solid var(--nm-border)" }}>{col.category}</div>
                                    {col.items.map(item => (
                                        <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 7, marginBottom: 9 }}>
                                            <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#B89440", marginTop: 6, flexShrink: 0 }} />
                                            <span style={{ fontFamily: "var(--nm-sans)", fontSize: 12, color: "#555", lineHeight: 1.5, fontWeight: 300 }}>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ONGOING SUPPORT */}
            <section style={{ padding: "clamp(72px,10vw,120px) 0", background: "#0A0A0A", borderBottom: "1px solid #111" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%" }}>
                    <Reveal>
                        <div style={{ marginBottom: "clamp(40px,5vw,60px)" }}>
                            <EyebrowLabel light>Ongoing Support</EyebrowLabel>
                            <h2 style={{ fontFamily: "var(--nm-serif)", fontSize: "clamp(28px,4vw,50px)", fontWeight: 600, fontStyle: "italic", color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em", maxWidth: 560 }}>Compliance doesn't end at registration.</h2>
                            <p style={{ fontFamily: "var(--nm-sans)", fontSize: 15, color: "rgba(255,255,255,0.4)", marginTop: 16, maxWidth: 540, lineHeight: 1.8, fontWeight: 300 }}>Most businesses need ongoing compliance management, not just one-time filings. NyayMitra stays with you as your business grows tracking renewals, updating registrations, and alerting you to changes before they become problems.</p>
                        </div>
                    </Reveal>
                    <div className="nm-three-col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                        {ONGOING_SUPPORT.map((item, i) => (
                            <Reveal key={item.title} delay={i * 0.07}>
                                <div style={{ padding: "26px 22px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, height: "100%", transition: "all 0.2s" }}
                                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(184,148,64,0.3)"; el.style.background = "rgba(184,148,64,0.04)"; }}
                                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.07)"; el.style.background = "rgba(255,255,255,0.03)"; }}>
                                    <div style={{ fontSize: 22, marginBottom: 14 }}>{item.icon}</div>
                                    <div style={{ fontFamily: "var(--nm-sans)", fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 10 }}>{item.title}</div>
                                    <p style={{ fontFamily: "var(--nm-sans)", fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, fontWeight: 300 }}>{item.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal delay={0.3}>
                        <div style={{ marginTop: 48, textAlign: "center" }}>
                            <PrimaryBtn label="Explore Ongoing Support" href={WA_TEAM} dark={false} />
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* CASE STUDY */}
            <section style={{ padding: "clamp(72px,10vw,120px) 0", background: "#fff", borderBottom: "1px solid var(--nm-border)" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%" }}>
                    <Reveal>
                        <div style={{ marginBottom: 48 }}>
                            <EyebrowLabel>Case Study</EyebrowLabel>
                            <h2 style={{ fontFamily: "var(--nm-serif)", fontSize: "clamp(28px,4vw,50px)", fontWeight: 600, fontStyle: "italic", color: "#0A0A0A", lineHeight: 1.1, letterSpacing: "-0.02em" }}>Multi city compliance execution.</h2>
                        </div>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div style={{ background: "#FAFAF7", border: "1px solid var(--nm-border)", borderRadius: 12, padding: "clamp(28px,5vw,52px)", position: "relative", overflow: "hidden" }}>
                            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, transparent, #B89440, transparent)" }} />
                            <div style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                                <div style={{ fontFamily: "var(--nm-serif)", fontStyle: "italic", fontSize: 26, fontWeight: 600, color: "#0A0A0A" }}>StampMyVisa</div>
                                {["Bangalore", "Mumbai", "Delhi"].map(city => (
                                    <span key={city} style={{ fontFamily: "var(--nm-sans)", fontSize: 11, color: "#8B6510", background: "#FBF6E8", border: "1px solid rgba(184,148,64,0.3)", borderRadius: 3, padding: "3px 10px", fontWeight: 500 }}>{city}</span>
                                ))}
                            </div>
                            <div className="nm-three-col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                                <div style={{ padding: "22px 20px", background: "#fff", border: "1px solid var(--nm-border)", borderRadius: 8 }}>
                                    <div style={{ fontFamily: "var(--nm-sans)", fontSize: 9, color: "#DC2626", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 10, fontWeight: 700 }}>Challenge</div>
                                    <p style={{ fontFamily: "var(--nm-sans)", fontSize: 13, color: "#555", lineHeight: 1.75, fontWeight: 300 }}>A growing business operating across Bangalore, Mumbai, and Delhi needed coordinated compliance execution across multiple jurisdictions without the bandwidth to manage it internally.</p>
                                </div>
                                <div style={{ padding: "22px 20px", background: "#fff", border: "1px solid var(--nm-border)", borderRadius: 8 }}>
                                    <div style={{ fontFamily: "var(--nm-sans)", fontSize: 9, color: "#B89440", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 10, fontWeight: 700 }}>Solution</div>
                                    <p style={{ fontFamily: "var(--nm-sans)", fontSize: 13, color: "#555", lineHeight: 1.75, fontWeight: 300 }}>NyayMitra managed documentation collection, state specific requirements, expert routing, and execution tracking through a single workflow one point of contact for all three cities.</p>
                                </div>
                                <div style={{ padding: "22px 20px", background: "#FBF6E8", border: "1px solid rgba(184,148,64,0.3)", borderRadius: 8 }}>
                                    <div style={{ fontFamily: "var(--nm-sans)", fontSize: 9, color: "#8B6510", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 10, fontWeight: 700 }}>Outcome</div>
                                    {["Single point coordination across 3 cities", "Reduced founder involvement in compliance", "All registrations completed in one engagement", "Ongoing renewal management now in place"].map(o => (
                                        <div key={o} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                                            <CheckCircle2 size={12} style={{ color: "#B89440", flexShrink: 0, marginTop: 2 }} />
                                            <span style={{ fontFamily: "var(--nm-sans)", fontSize: 12, color: "#555", lineHeight: 1.6, fontWeight: 300 }}>{o}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* TRUST STRIP */}
            <section style={{ padding: "clamp(40px,6vw,72px) 0", background: "#0A0A0A", borderBottom: "1px solid #111" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%" }}>
                    <Reveal>
                        <div style={{ fontFamily: "var(--nm-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", textAlign: "center", marginBottom: 28 }}>Why Businesses Trust NyayMitra</div>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                            {TRUST_POINTS.map(tp => (
                                <div key={tp.label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6 }}>
                                    <span style={{ color: "#B89440" }}>{tp.icon}</span>
                                    <span style={{ fontFamily: "var(--nm-sans)", fontSize: 12, color: "rgba(255,255,255,0.7)", fontWeight: 400 }}>{tp.label}</span>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* STATS */}
            <section id="about" style={{ padding: "clamp(72px,10vw,120px) 0", background: "#FAFAF7", borderBottom: "1px solid var(--nm-border)" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%" }}>
                    <Reveal>
                        <div className="nm-four-col" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, border: "1px solid var(--nm-border)", borderRadius: 10, overflow: "hidden" }}>
                            {STATS.map((s, i) => (
                                <div key={s.label} style={{ padding: "40px 28px", textAlign: "center", background: i % 2 === 0 ? "#fff" : "#F7F5F0", borderRight: i < 3 ? "1px solid var(--nm-border)" : "none" }}>
                                    <div style={{ fontFamily: "var(--nm-serif)", fontStyle: "italic", fontSize: 48, fontWeight: 700, color: "#B89440", lineHeight: 1, marginBottom: 10, letterSpacing: "-0.02em" }}>{s.value}</div>
                                    <div style={{ fontFamily: "var(--nm-sans)", fontSize: 9, color: "#AAA", letterSpacing: "0.1em", textTransform: "uppercase", lineHeight: 1.5, fontWeight: 600 }}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" style={{ padding: "clamp(72px,10vw,120px) 0", background: "#fff", borderBottom: "1px solid var(--nm-border)" }}>
                <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 5%" }}>
                    <Reveal>
                        <div style={{ marginBottom: "clamp(40px,5vw,60px)", textAlign: "center" }}>
                            <EyebrowLabel>FAQ</EyebrowLabel>
                            <h2 style={{ fontFamily: "var(--nm-serif)", fontSize: "clamp(28px,4vw,50px)", fontWeight: 600, fontStyle: "italic", color: "#0A0A0A", lineHeight: 1.1, letterSpacing: "-0.02em" }}>Common questions.</h2>
                            <p style={{ fontFamily: "var(--nm-sans)", fontSize: 15, color: "#666", marginTop: 16, lineHeight: 1.8, fontWeight: 300 }}>Answers to what businesses typically ask before getting started.</p>
                        </div>
                    </Reveal>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {FAQS.map((faq, i) => (
                            <Reveal key={i} delay={i * 0.05}>
                                <div style={{ borderBottom: "1px solid var(--nm-border)" }}>
                                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        style={{ width: "100%", textAlign: "left", padding: "22px 0", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                                        <span style={{ fontFamily: "var(--nm-sans)", fontSize: 15, fontWeight: 500, color: openFaq === i ? "#B89440" : "#111", lineHeight: 1.5, transition: "color 0.15s" }}>{faq.q}</span>
                                        <span style={{ color: "#B89440", flexShrink: 0 }}>{openFaq === i ? <Minus size={16} /> : <Plus size={16} />}</span>
                                    </button>
                                    {openFaq === i && (
                                        <div style={{ paddingBottom: 22 }}>
                                            <p style={{ fontFamily: "var(--nm-sans)", fontSize: 14, color: "#555", lineHeight: 1.85, fontWeight: 300 }}>{faq.a}</p>
                                        </div>
                                    )}
                                </div>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal delay={0.2}>
                        <div style={{ marginTop: 48, textAlign: "center" }}>
                            <p style={{ fontFamily: "var(--nm-sans)", fontSize: 14, color: "#888", marginBottom: 20, fontWeight: 300 }}>Have a question not answered here?</p>
                            <PrimaryBtn label="Talk to Our Team" href={WA_TEAM} />
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* FINAL CTA */}
            <section style={{ padding: "clamp(80px,12vw,140px) 5%", background: "linear-gradient(135deg, #0A0A0A 0%, #121008 50%, #0A0A0A 100%)", position: "relative", overflow: "hidden", borderBottom: "1px solid #111" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(184,148,64,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(184,148,64,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 700, height: 400, background: "radial-gradient(ellipse, rgba(184,148,64,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative" }}>
                    <Reveal>
                        <div style={{ marginBottom: 20 }}><EyebrowLabel light>Get Started</EyebrowLabel></div>
                        <h2 style={{ fontFamily: "var(--nm-serif)", fontWeight: 600, fontStyle: "italic", fontSize: "clamp(28px,4.5vw,56px)", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.08, marginBottom: 20 }}>
                            Stop managing compliance.<br /><span className="nm-gold-shimmer">Let us handle it.</span>
                        </h2>
                        <p style={{ fontFamily: "var(--nm-sans)", fontSize: 15, color: "rgba(255,255,255,0.4)", maxWidth: 480, margin: "0 auto 44px", lineHeight: 1.85, fontWeight: 300 }}>
                            Talk to our compliance team today. We'll map what applies to your business, identify any gaps, and tell you exactly what needs to be done.
                        </p>
                        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                            <PrimaryBtn label="Talk to Compliance Team" href={WA_TEAM} dark={false} />
                            <OutlineBtn label="Check My Compliance Status" href={WA_ASSESS} light />
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* FOOTER */}
            <footer style={{ background: "#fff", borderTop: "1px solid var(--nm-border)", padding: "clamp(48px,8vw,80px) 5% 32px" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div className="nm-footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "clamp(24px,5vw,48px)", marginBottom: 48 }}>
                        <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                <div style={{ width: 28, height: 28, background: "#0A0A0A", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center" }}><Scale size={12} style={{ color: "#B89440" }} /></div>
                                <span style={{ fontFamily: "var(--nm-serif)", fontWeight: 600, fontSize: 15, color: "#0A0A0A" }}>NyayMitra</span>
                            </div>
                            <div style={{ fontFamily: "var(--nm-sans)", fontSize: 8, color: "#B89440", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Legal Operations</div>
                            <p style={{ fontFamily: "var(--nm-sans)", fontSize: 12, color: "#999", maxWidth: 260, lineHeight: 1.75, marginBottom: 20, fontWeight: 300 }}>Compliance and legal operations for growing Indian startups and MSMEs. One contact. All compliance. Fully managed.</p>
                            {[
                                { icon: <MapPin size={10} />, text: "Koramangala, Bengaluru – 560034" },
                                { icon: <Mail size={10} />, text: "support@nyaymitra.tech", href: "mailto:support@nyaymitra.tech" },
                                { icon: <PhoneCall size={10} />, text: "+91 79705 96183", href: "tel:+917970596183" },
                            ].map((row, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, fontSize: 11, fontFamily: "var(--nm-sans)", color: "#AAA", fontWeight: 300 }}>
                                    <span style={{ color: "#B89440" }}>{row.icon}</span>
                                    {(row as any).href ? <a href={(row as any).href} style={{ color: "#999", textDecoration: "none" }}>{row.text}</a> : row.text}
                                </div>
                            ))}
                            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                                {[{ icon: <Instagram size={12} />, href: "https://www.instagram.com/nyaymitra.tech" }, { icon: <Linkedin size={12} />, href: "https://www.linkedin.com/company/nyaymitra-tech-pvt-ltd" }].map((s, i) => (
                                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                                        style={{ width: 30, height: 30, borderRadius: 5, border: "1px solid var(--nm-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "#AAA", textDecoration: "none", transition: "all 0.15s" }}
                                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#B89440"; (e.currentTarget as HTMLElement).style.color = "#B89440"; }}
                                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--nm-border)"; (e.currentTarget as HTMLElement).style.color = "#AAA"; }}>
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 style={{ fontFamily: "var(--nm-sans)", fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#CCC", marginBottom: 18 }}>What We Do</h4>
                            <ul style={{ listStyle: "none" }}>
                                {["Compliance Mapping", "Documentation Management", "Registration Execution", "Renewal Management", "Multi city Compliance", "Expert Coordination"].map(l => (
                                    <li key={l} style={{ marginBottom: 10 }}>
                                        <a href={WA_TEAM} style={{ fontFamily: "var(--nm-sans)", fontSize: 12, color: "#888", textDecoration: "none", transition: "color 0.15s", fontWeight: 300 }}
                                            onMouseEnter={e => (e.currentTarget.style.color = "#B89440")} onMouseLeave={e => (e.currentTarget.style.color = "#888")}>{l}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ fontFamily: "var(--nm-sans)", fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#CCC", marginBottom: 18 }}>Company</h4>
                            <ul style={{ listStyle: "none" }}>
                                {["About Us", "Blog", "Careers", "Privacy Policy", "Terms & Conditions"].map(l => (
                                    <li key={l} style={{ marginBottom: 10 }}>
                                        <a href="#" style={{ fontFamily: "var(--nm-sans)", fontSize: 12, color: "#888", textDecoration: "none", transition: "color 0.15s", fontWeight: 300 }}
                                            onMouseEnter={e => (e.currentTarget.style.color = "#B89440")} onMouseLeave={e => (e.currentTarget.style.color = "#888")}>{l}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div style={{ paddingTop: 24, borderTop: "1px solid var(--nm-border)", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                        <p style={{ fontFamily: "var(--nm-sans)", fontSize: 10, color: "#CCC", letterSpacing: "0.04em", fontWeight: 500 }}>© 2026 NyayMitra Technology Pvt. Ltd.</p>
                        <p style={{ fontFamily: "var(--nm-sans)", fontSize: 11, color: "#AAA", maxWidth: 500, lineHeight: 1.75, textAlign: "right", fontWeight: 300 }}>
                            <strong style={{ color: "#888", fontWeight: 600 }}>Disclaimer: </strong>
                            This website is for informational purposes only and does not constitute legal advice. Consult qualified professionals for your specific compliance needs.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}