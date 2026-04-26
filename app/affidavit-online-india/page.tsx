"use client";

import { useState, useEffect, useRef, memo } from "react";
import {
    Scale, FileText, Shield, Zap, Users, Clock, CheckCircle,
    ArrowRight, MessageCircle, Gavel, Star, Sparkles, Building2,
    BadgeCheck, FileCheck, Timer, Lock, Phone, Mail, ChevronDown,
    Play, Download, Award, Crown, HelpCircle, Fingerprint,
    GraduationCap, Home, PenTool, DollarSign, Printer, X, Menu,
    ChevronRight, Rocket
} from "lucide-react";

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

const openWhatsApp = (msg: string) =>
    window.open(`https://wa.me/919661644025?text=${encodeURIComponent(msg)}`, "_blank");

// ─────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────

const useScrolled = (threshold = 50) => {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > threshold);
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, [threshold]);
    return scrolled;
};

const useInView = (options?: IntersectionObserverInit) => {
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        if (!ref.current) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { setInView(true); obs.disconnect(); }
        }, { threshold: 0.12, ...options });
        obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return { ref, inView };
};

// ─────────────────────────────────────────────
// ANIMATION WRAPPER
// ─────────────────────────────────────────────

const Reveal = ({
    children, delay = 0, y = 28, className = ""
}: { children: React.ReactNode; delay?: number; y?: number; className?: string }) => {
    const { ref, inView } = useInView();
    return (
        <div
            ref={ref}
            className={className}
            style={{
                transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : `translateY(${y}px)`,
            }}
        >
            {children}
        </div>
    );
};

// ─────────────────────────────────────────────
// HEADER
// ─────────────────────────────────────────────

const Header = () => {
    const scrolled = useScrolled();
    const [open, setOpen] = useState(false);

    const links = [
        { label: "Services", href: "#services" },
        { label: "How It Works", href: "#process" },
        { label: "Pricing", href: "#pricing" },
        { label: "FAQs", href: "#faqs" },
    ];

    const go = (href: string) => {
        setOpen(false);
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <header
            style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
                transition: "all 0.3s ease",
                background: scrolled ? "rgba(10,10,18,0.92)" : "transparent",
                backdropFilter: scrolled ? "blur(16px)" : "none",
                borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
            }}
        >
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
                {/* Logo */}
                <div
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
                >
                    <div style={{
                        width: 36, height: 36,
                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                        borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 0 20px rgba(99,102,241,0.4)",
                    }}>
                        <Scale size={18} color="#fff" />
                    </div>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 22, color: "#fff", letterSpacing: "-0.01em" }}>
                        Nyay<span style={{ color: "#818cf8" }}>Mitra</span>
                    </span>
                </div>

                {/* Desktop nav */}
                <nav style={{ display: "flex", gap: 36 }} className="hide-mobile">
                    {links.map(l => (
                        <button
                            key={l.label}
                            onClick={() => go(l.href)}
                            style={{
                                background: "none", border: "none", cursor: "pointer",
                                color: "rgba(255,255,255,0.65)", fontSize: 14, fontWeight: 500,
                                letterSpacing: "0.02em", transition: "color 0.2s",
                                fontFamily: "'DM Sans', sans-serif",
                            }}
                            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                        >
                            {l.label}
                        </button>
                    ))}
                </nav>

                {/* CTA */}
                <div style={{ display: "flex", gap: 12, alignItems: "center" }} className="hide-mobile">
                    <button
                        onClick={() => openWhatsApp("I need help with NyayMitra services.")}
                        style={{
                            background: "none", border: "1px solid rgba(255,255,255,0.18)",
                            borderRadius: 8, padding: "8px 18px", color: "rgba(255,255,255,0.8)",
                            fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "all 0.2s",
                            fontFamily: "'DM Sans', sans-serif",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
                    >
                        Support
                    </button>
                    <button
                        onClick={() => openWhatsApp("I want to create an affidavit. Please help me get started.")}
                        style={{
                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            border: "none", borderRadius: 8, padding: "8px 20px",
                            color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer",
                            transition: "opacity 0.2s", fontFamily: "'DM Sans', sans-serif",
                            boxShadow: "0 4px 15px rgba(99,102,241,0.35)",
                        }}
                    >
                        Get Started →
                    </button>
                </div>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setOpen(!open)}
                    className="show-mobile"
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", padding: 4 }}
                >
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile menu */}
            {open && (
                <div style={{
                    background: "rgba(10,10,18,0.98)", backdropFilter: "blur(16px)",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    padding: "20px 24px 28px",
                }}>
                    {links.map(l => (
                        <button
                            key={l.label}
                            onClick={() => go(l.href)}
                            style={{
                                display: "block", width: "100%", textAlign: "left",
                                background: "none", border: "none", cursor: "pointer",
                                color: "rgba(255,255,255,0.7)", fontSize: 16, fontWeight: 500,
                                padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.06)",
                                fontFamily: "'DM Sans', sans-serif",
                            }}
                        >
                            {l.label}
                        </button>
                    ))}
                    <button
                        onClick={() => openWhatsApp("I want to create an affidavit. Please help me get started.")}
                        style={{
                            width: "100%", marginTop: 16,
                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            border: "none", borderRadius: 8, padding: "12px",
                            color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer",
                            fontFamily: "'DM Sans', sans-serif",
                        }}
                    >
                        Get Started on WhatsApp
                    </button>
                </div>
            )}
        </header>
    );
};

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────

const Hero = () => {
    const phrases = ["Legally Valid", "Court Approved", "Expert Reviewed", "Instant Download"];
    const [idx, setIdx] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const cycle = setInterval(() => {
            setVisible(false);
            setTimeout(() => { setIdx(i => (i + 1) % phrases.length); setVisible(true); }, 350);
        }, 2400);
        return () => clearInterval(cycle);
    }, []);

    return (
        <section id="home" style={{
            minHeight: "100vh", position: "relative", overflow: "hidden",
            background: "linear-gradient(160deg, #0a0a12 0%, #0d0d1e 50%, #080814 100%)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            paddingTop: 80, paddingBottom: 60,
        }}>
            {/* Atmospheric orbs */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
                <div style={{
                    position: "absolute", top: "8%", left: "12%",
                    width: 520, height: 520,
                    background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
                    borderRadius: "50%",
                }} />
                <div style={{
                    position: "absolute", bottom: "5%", right: "8%",
                    width: 480, height: 480,
                    background: "radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 70%)",
                    borderRadius: "50%",
                }} />
                <div style={{
                    position: "absolute", top: "40%", left: "55%",
                    width: 300, height: 300,
                    background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)",
                    borderRadius: "50%",
                }} />
                {/* Subtle grid lines */}
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04 }}>
                    <defs>
                        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            {/* Trust pill */}
            <Reveal delay={0}>
                <div style={{
                    display: "inline-flex", alignItems: "center", gap: 10,
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 99, padding: "7px 16px", marginBottom: 36,
                    backdropFilter: "blur(10px)",
                }}>
                    <div style={{ display: "flex" }}>
                        {["#6366f1", "#8b5cf6", "#a78bfa", "#c4b5fd"].map((c, i) => (
                            <div key={i} style={{
                                width: 24, height: 24, borderRadius: "50%", background: c,
                                border: "2px solid #0a0a12", marginLeft: i > 0 ? -8 : 0,
                            }} />
                        ))}
                    </div>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif" }}>
                        Trusted by <strong style={{ color: "#a5b4fc" }}>500+</strong> Indians
                    </span>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80" }} />
                </div>
            </Reveal>

            {/* Headline */}
            <Reveal delay={100}>
                <h1 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(42px, 7vw, 88px)",
                    fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em",
                    textAlign: "center", color: "#fff",
                    maxWidth: 900, margin: "0 auto 20px",
                }}>
                    Create Your Affidavit
                    <br />
                    <span style={{
                        background: "linear-gradient(90deg, #818cf8, #c4b5fd, #818cf8)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                        backgroundSize: "200%",
                        animation: "shimmer 3s linear infinite",
                    }}>
                        Online in India
                    </span>
                </h1>
            </Reveal>

            {/* Animated sub-tag */}
            <Reveal delay={200}>
                <div style={{ textAlign: "center", marginBottom: 28, height: 32 }}>
                    <span style={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: 18,
                        color: "rgba(255,255,255,0.5)",
                    }}>
                        Fast ·{" "}
                    </span>
                    <span
                        style={{
                            fontFamily: "'DM Sans', sans-serif", fontSize: 18,
                            color: "#818cf8", fontWeight: 600,
                            transition: "opacity 0.35s ease",
                            opacity: visible ? 1 : 0,
                            display: "inline-block",
                        }}
                    >
                        {phrases[idx]}
                    </span>
                </div>
            </Reveal>

            <Reveal delay={280}>
                <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 17, color: "rgba(255,255,255,0.45)", lineHeight: 1.7,
                    textAlign: "center", maxWidth: 520, margin: "0 auto 44px",
                }}>
                    Legally binding affidavits drafted, lawyer-reviewed, and ready in hours.
                    No court trips, no confusion — just peace of mind.
                </p>
            </Reveal>

            {/* CTA Buttons */}
            <Reveal delay={360}>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginBottom: 56 }}>
                    <button
                        onClick={() => openWhatsApp("I need to create an affidavit. Please help me get started.")}
                        style={{
                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            border: "none", borderRadius: 10,
                            padding: "15px 32px", color: "#fff",
                            fontSize: 15, fontWeight: 700, cursor: "pointer",
                            fontFamily: "'DM Sans', sans-serif",
                            boxShadow: "0 8px 30px rgba(99,102,241,0.4)",
                            display: "flex", alignItems: "center", gap: 8,
                            transition: "transform 0.2s, box-shadow 0.2s",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(99,102,241,0.5)"; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(99,102,241,0.4)"; }}
                    >
                        <MessageCircle size={17} />
                        Create Affidavit Now
                    </button>
                    <button
                        onClick={() => openWhatsApp("Can you explain how the affidavit process works at NyayMitra?")}
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10,
                            padding: "15px 32px", color: "rgba(255,255,255,0.8)",
                            fontSize: 15, fontWeight: 600, cursor: "pointer",
                            fontFamily: "'DM Sans', sans-serif",
                            display: "flex", alignItems: "center", gap: 8,
                            transition: "border-color 0.2s, color 0.2s",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
                    >
                        <Play size={17} />
                        How It Works
                    </button>
                </div>
            </Reveal>

            {/* Trust indicators */}
            <Reveal delay={440}>
                <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center" }}>
                    {[
                        { icon: <CheckCircle size={14} color="#4ade80" />, text: "Free Consultation" },
                        { icon: <Lock size={14} color="#818cf8" />, text: "100% Confidential" },
                        { icon: <Timer size={14} color="#f59e0b" />, text: "24hr Delivery" },
                        { icon: <Shield size={14} color="#22d3ee" />, text: "Lawyer Reviewed" },
                    ].map((t, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                            {t.icon}
                            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}>{t.text}</span>
                        </div>
                    ))}
                </div>
            </Reveal>

            {/* Stats strip */}
            <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                borderTop: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.02)", backdropFilter: "blur(8px)",
                padding: "16px 24px",
            }}>
                <div style={{
                    maxWidth: 1000, margin: "0 auto",
                    display: "flex", justifyContent: "center", gap: "clamp(20px,5vw,64px)", flexWrap: "wrap",
                }}>
                    {[
                        { v: "500+", l: "Verified Lawyers" },
                        { v: "50K+", l: "Happy Clients" },
                        { v: "< 2 min", l: "Response Time" },
                        { v: "4.9 ★", l: "Client Rating" },
                    ].map((s, i) => (
                        <div key={i} style={{ textAlign: "center" }}>
                            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: "#fff" }}>{s.v}</div>
                            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.04em", textTransform: "uppercase", marginTop: 2 }}>{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        @keyframes shimmer { 0%,100%{background-position:0%} 50%{background-position:100%} }
        .hide-mobile { } .show-mobile { display:none; }
        @media(max-width:768px){.hide-mobile{display:none!important}.show-mobile{display:flex!important}}
      `}</style>
        </section>
    );
};

// ─────────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────────

const services = [
    { icon: <Home size={20} />, title: "Address Proof Affidavit", desc: "Legal declaration for verifying your current residential address for KYC, banks, and government applications.", time: "2 hrs", price: "₹999", rating: 4.9, popular: true },
    { icon: <PenTool size={20} />, title: "Name Change Affidavit", desc: "Sworn statement for legal name change after marriage, divorce, or personal choice.", time: "3 hrs", price: "₹1,199", rating: 4.8 },
    { icon: <DollarSign size={20} />, title: "Income Proof Affidavit", desc: "Income declaration accepted for loans, visa applications, or government schemes.", time: "2 hrs", price: "₹999", rating: 4.7 },
    { icon: <Fingerprint size={20} />, title: "Identity Verification", desc: "Confirm your identity for lost documents, legal proceedings, or official purposes.", time: "1.5 hrs", price: "₹899", rating: 4.9 },
    { icon: <Building2 size={20} />, title: "Property Affidavit", desc: "Declaration for property ownership, disputes, inheritance, or transfer matters.", time: "4 hrs", price: "₹1,499", rating: 4.8 },
    { icon: <GraduationCap size={20} />, title: "Educational Affidavit", desc: "Sworn statement for educational qualifications, certifications, and academic records.", time: "2 hrs", price: "₹999", rating: 4.8 },
];

const ServicesSection = () => (
    <section id="services" style={{ padding: "100px 24px", background: "#0d0d1a" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <Reveal>
                <div style={{ textAlign: "center", marginBottom: 64 }}>
                    <div style={{
                        display: "inline-flex", alignItems: "center", gap: 7,
                        background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)",
                        borderRadius: 99, padding: "6px 16px", marginBottom: 20,
                    }}>
                        <Sparkles size={13} color="#818cf8" />
                        <span style={{ fontSize: 12, color: "#818cf8", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>All Services</span>
                    </div>
                    <h2 style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 700, color: "#fff",
                        lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 16px",
                    }}>
                        Affidavit Services for{" "}
                        <span style={{ color: "#818cf8" }}>Every Need</span>
                    </h2>
                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif", maxWidth: 500, margin: "0 auto" }}>
                        Tailored legal documentation solutions across all major categories
                    </p>
                </div>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 20 }}>
                {services.map((s, i) => (
                    <Reveal key={i} delay={i * 80}>
                        <div
                            style={{
                                position: "relative",
                                background: "rgba(255,255,255,0.03)",
                                border: s.popular ? "1px solid rgba(129,140,248,0.35)" : "1px solid rgba(255,255,255,0.07)",
                                borderRadius: 16, padding: "28px 28px 24px",
                                transition: "border-color 0.25s, background 0.25s, transform 0.25s",
                                cursor: "default",
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(129,140,248,0.45)";
                                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.05)";
                                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLDivElement).style.borderColor = s.popular ? "rgba(129,140,248,0.35)" : "rgba(255,255,255,0.07)";
                                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
                                (e.currentTarget as HTMLDivElement).style.transform = "none";
                            }}
                        >
                            {s.popular && (
                                <div style={{
                                    position: "absolute", top: -12, right: 20,
                                    background: "linear-gradient(135deg, #f59e0b, #ef4444)",
                                    borderRadius: 99, padding: "3px 12px",
                                    fontSize: 11, fontWeight: 700, color: "#fff",
                                    fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em",
                                }}>
                                    MOST POPULAR
                                </div>
                            )}
                            <div style={{
                                width: 44, height: 44,
                                background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)",
                                borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
                                color: "#818cf8", marginBottom: 18,
                            }}>
                                {s.icon}
                            </div>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>{s.title}</h3>
                            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, margin: "0 0 20px", fontFamily: "'DM Sans', sans-serif" }}>{s.desc}</p>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.07)", marginBottom: 18 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                    <Clock size={13} color="rgba(255,255,255,0.3)" />
                                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif" }}>{s.time}</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                    <Star size={13} fill="#f59e0b" color="#f59e0b" />
                                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>{s.rating}</span>
                                </div>
                                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: "#818cf8" }}>{s.price}</span>
                            </div>
                            <button
                                onClick={() => openWhatsApp(`I need a ${s.title}. Please help me.`)}
                                style={{
                                    width: "100%", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)",
                                    borderRadius: 8, padding: "10px", color: "#a5b4fc",
                                    fontSize: 13, fontWeight: 600, cursor: "pointer",
                                    fontFamily: "'DM Sans', sans-serif",
                                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                                    transition: "background 0.2s, border-color 0.2s",
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = "rgba(99,102,241,0.18)"; e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)"; }}
                                onMouseLeave={e => { e.currentTarget.style.background = "rgba(99,102,241,0.1)"; e.currentTarget.style.borderColor = "rgba(99,102,241,0.25)"; }}
                            >
                                Get Started <ChevronRight size={14} />
                            </button>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);

// ─────────────────────────────────────────────
// PROCESS
// ─────────────────────────────────────────────

const ProcessSection = () => {
    const steps = [
        {
            n: "01", icon: <MessageCircle size={22} />, title: "Share Requirements",
            desc: "Tell us your needs via WhatsApp. Select type, share personal details and supporting documents.",
            time: "5–7 min", color: "#6366f1",
        },
        {
            n: "02", icon: <FileText size={22} />, title: "Expert Drafting",
            desc: "AI-powered generation combined with lawyer verification for full legal compliance.",
            time: "2–4 hours", color: "#8b5cf6",
        },
        {
            n: "03", icon: <Download size={22} />, title: "Review & Download",
            desc: "Review your document, request unlimited revisions, then download as PDF or DOCX.",
            time: "Instant", color: "#a78bfa",
        },
    ];

    return (
        <section id="process" style={{ padding: "100px 24px", background: "#080812", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                <div style={{ position: "absolute", top: "20%", right: "-5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)", borderRadius: "50%" }} />
            </div>
            <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: 64 }}>
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: 7,
                            background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)",
                            borderRadius: 99, padding: "6px 16px", marginBottom: 20,
                        }}>
                            <Rocket size={13} color="#a78bfa" />
                            <span style={{ fontSize: 12, color: "#a78bfa", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Simple Process</span>
                        </div>
                        <h2 style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 700, color: "#fff",
                            lineHeight: 1.1, letterSpacing: "-0.02em",
                        }}>
                            Your Affidavit in{" "}
                            <span style={{ color: "#a78bfa" }}>3 Steps</span>
                        </h2>
                    </div>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, position: "relative" }}>
                    {/* Connector line */}
                    <div style={{
                        position: "absolute", top: 56, left: "16.5%", right: "16.5%", height: 1,
                        background: "linear-gradient(90deg, #6366f1, #a78bfa)",
                        opacity: 0.25, display: "none",
                    }} className="connector-line" />

                    {steps.map((s, i) => (
                        <Reveal key={i} delay={i * 160}>
                            <div style={{
                                background: "rgba(255,255,255,0.025)",
                                border: "1px solid rgba(255,255,255,0.07)",
                                borderRadius: 20, padding: "36px 28px",
                                textAlign: "center",
                                transition: "border-color 0.25s, background 0.25s",
                            }}
                                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(129,140,248,0.3)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)"; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.025)"; }}
                            >
                                {/* Step number */}
                                <div style={{
                                    width: 60, height: 60, borderRadius: 18, margin: "0 auto 22px",
                                    background: `linear-gradient(135deg, ${s.color}22, ${s.color}10)`,
                                    border: `1px solid ${s.color}40`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    position: "relative",
                                }}>
                                    <span style={{ color: s.color }}>{s.icon}</span>
                                    <div style={{
                                        position: "absolute", top: -10, right: -10,
                                        width: 24, height: 24, borderRadius: "50%",
                                        background: s.color, display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: 11, fontWeight: 700, color: "#fff", fontFamily: "'DM Sans', sans-serif",
                                    }}>
                                        {i + 1}
                                    </div>
                                </div>
                                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: "#fff", margin: "0 0 10px" }}>{s.title}</h3>
                                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif", margin: "0 0 20px" }}>{s.desc}</p>
                                <div style={{
                                    display: "inline-flex", alignItems: "center", gap: 6,
                                    background: `${s.color}15`, border: `1px solid ${s.color}25`,
                                    borderRadius: 99, padding: "5px 14px",
                                }}>
                                    <Clock size={12} color={s.color} />
                                    <span style={{ fontSize: 12, color: s.color, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>{s.time}</span>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ─────────────────────────────────────────────
// PRICING
// ─────────────────────────────────────────────

const PricingSection = () => {
    const tiers = [
        {
            name: "Essential", price: 999,
            desc: "For simple, straightforward affidavit needs",
            features: ["Standard affidavit drafting", "AI-powered generation", "Email support", "PDF download"],
            excluded: ["Expert lawyer review", "Notary guidance"],
            cta: "Get Essential",
        },
        {
            name: "Professional", price: 1999,
            desc: "Most comprehensive — our recommended plan",
            features: ["Everything in Essential", "Expert lawyer review", "Unlimited revisions", "24/7 priority support", "Notary guidance"],
            excluded: [],
            cta: "Get Professional",
            popular: true,
        },
        {
            name: "Enterprise", price: 4999,
            desc: "For businesses and bulk requirements",
            features: ["Everything in Professional", "Bulk document processing", "Dedicated account manager", "Legal compliance certificate", "Custom templates"],
            excluded: [],
            cta: "Contact Sales",
        },
    ];

    return (
        <section id="pricing" style={{ padding: "100px 24px", background: "#0d0d1a" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: 64 }}>
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: 7,
                            background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)",
                            borderRadius: 99, padding: "6px 16px", marginBottom: 20,
                        }}>
                            <DollarSign size={13} color="#4ade80" />
                            <span style={{ fontSize: 12, color: "#4ade80", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Transparent Pricing</span>
                        </div>
                        <h2 style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 700, color: "#fff",
                            lineHeight: 1.1, letterSpacing: "-0.02em",
                        }}>
                            Simple Plans,{" "}
                            <span style={{ color: "#4ade80" }}>No Hidden Fees</span>
                        </h2>
                    </div>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 20, alignItems: "start" }}>
                    {tiers.map((t, i) => (
                        <Reveal key={i} delay={i * 120}>
                            <div style={{
                                background: t.popular ? "rgba(99,102,241,0.08)" : "rgba(255,255,255,0.025)",
                                border: t.popular ? "1px solid rgba(99,102,241,0.4)" : "1px solid rgba(255,255,255,0.07)",
                                borderRadius: 20, padding: "36px 28px",
                                position: "relative",
                                transform: t.popular ? "scale(1.03)" : "none",
                            }}>
                                {t.popular && (
                                    <div style={{
                                        position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                                        borderRadius: 99, padding: "4px 16px",
                                        fontSize: 11, fontWeight: 700, color: "#fff",
                                        fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.06em",
                                        whiteSpace: "nowrap",
                                    }}>
                                        MOST POPULAR
                                    </div>
                                )}
                                <div style={{ marginBottom: 8 }}>
                                    <span style={{ fontSize: 13, fontWeight: 600, color: t.popular ? "#818cf8" : "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em", textTransform: "uppercase" }}>{t.name}</span>
                                </div>
                                <div style={{ margin: "12px 0 6px" }}>
                                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 52, fontWeight: 700, color: "#fff", lineHeight: 1 }}>₹{t.price.toLocaleString()}</span>
                                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", fontFamily: "'DM Sans', sans-serif", marginLeft: 4 }}>/ one-time</span>
                                </div>
                                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif", marginBottom: 28, lineHeight: 1.55 }}>{t.desc}</p>

                                <button
                                    onClick={() => openWhatsApp(`I'm interested in the ${t.name} plan at ₹${t.price}. Please tell me more.`)}
                                    style={{
                                        width: "100%",
                                        background: t.popular ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "rgba(255,255,255,0.06)",
                                        border: t.popular ? "none" : "1px solid rgba(255,255,255,0.12)",
                                        borderRadius: 10, padding: "12px",
                                        color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer",
                                        fontFamily: "'DM Sans', sans-serif",
                                        boxShadow: t.popular ? "0 8px 24px rgba(99,102,241,0.3)" : "none",
                                        marginBottom: 24, transition: "opacity 0.2s",
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                                >
                                    {t.cta} on WhatsApp
                                </button>

                                <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                                    {t.features.map((f, j) => (
                                        <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                                            <CheckCircle size={15} color="#4ade80" style={{ flexShrink: 0, marginTop: 1 }} />
                                            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", fontFamily: "'DM Sans', sans-serif" }}>{f}</span>
                                        </div>
                                    ))}
                                    {t.excluded.map((f, j) => (
                                        <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                                            <X size={15} color="rgba(255,255,255,0.2)" style={{ flexShrink: 0, marginTop: 1 }} />
                                            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", fontFamily: "'DM Sans', sans-serif" }}>{f}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ─────────────────────────────────────────────
// BENEFITS
// ─────────────────────────────────────────────

const BenefitsSection = () => {
    const benefits = [
        { icon: <Zap size={18} color="#f59e0b" />, bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.2)", title: "Lightning Fast", desc: "Affidavit in 2–4 hours vs 3–7 days at a notary" },
        { icon: <Shield size={18} color="#22d3ee" />, bg: "rgba(34,211,238,0.1)", border: "rgba(34,211,238,0.2)", title: "Legally Verified", desc: "Reviewed by experienced lawyers for full court compliance" },
        { icon: <MessageCircle size={18} color="#4ade80" />, bg: "rgba(74,222,128,0.1)", border: "rgba(74,222,128,0.2)", title: "24/7 WhatsApp Support", desc: "Real-time assistance from legal experts, always available" },
        { icon: <FileCheck size={18} color="#818cf8" />, bg: "rgba(129,140,248,0.1)", border: "rgba(129,140,248,0.2)", title: "Unlimited Revisions", desc: "Free changes until you are completely satisfied" },
        { icon: <Lock size={18} color="#f472b6" />, bg: "rgba(244,114,182,0.1)", border: "rgba(244,114,182,0.2)", title: "Bank-Grade Security", desc: "256-bit SSL encryption, auto-delete after 30 days" },
        { icon: <Award size={18} color="#fb923c" />, bg: "rgba(251,146,60,0.1)", border: "rgba(251,146,60,0.2)", title: "Money-Back Guarantee", desc: "30-day full refund, zero questions asked" },
    ];

    return (
        <section style={{ padding: "100px 24px", background: "#080812" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: 64 }}>
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: 7,
                            background: "rgba(129,140,248,0.1)", border: "1px solid rgba(129,140,248,0.2)",
                            borderRadius: 99, padding: "6px 16px", marginBottom: 20,
                        }}>
                            <Crown size={13} color="#818cf8" />
                            <span style={{ fontSize: 12, color: "#818cf8", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Why NyayMitra</span>
                        </div>
                        <h2 style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 700, color: "#fff",
                            lineHeight: 1.1, letterSpacing: "-0.02em",
                        }}>
                            Better Than the{" "}
                            <span style={{ color: "#818cf8" }}>Old Way</span>
                        </h2>
                    </div>
                </Reveal>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
                    {benefits.map((b, i) => (
                        <Reveal key={i} delay={i * 80}>
                            <div style={{
                                display: "flex", gap: 16, padding: "22px 24px",
                                background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)",
                                borderRadius: 14, transition: "border-color 0.25s, background 0.25s",
                            }}
                                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = b.border; (e.currentTarget as HTMLDivElement).style.background = b.bg.replace("0.1", "0.06"); }}
                                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.025)"; }}
                            >
                                <div style={{
                                    width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                                    background: b.bg, border: `1px solid ${b.border}`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                }}>
                                    {b.icon}
                                </div>
                                <div>
                                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff", margin: "0 0 5px" }}>{b.title}</h3>
                                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6, margin: 0 }}>{b.desc}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ─────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────

const TestimonialsSection = () => {
    const t = [
        { initials: "SA", name: "Swapnil Anand", role: "Property Owner", content: "Took notary service for name change in property documents. The entire process was smooth — got my registered affidavit within 24 hours. Saved me 3 trips to the notary office!", service: "Name Change", date: "5 months ago" },
        { initials: "JK", name: "Jay Kumar", role: "Homeowner", content: "Needed an affidavit for electricity connection at my new house. NyayMitra delivered within 2 hours. Accepted by the electricity department without any issues whatsoever.", service: "Address Proof", date: "2 weeks ago" },
        { initials: "RS", name: "Ramesh Sharma", role: "Business Owner", content: "The affidavit was perfect and legally sound. Saved me from multiple visits to the notary. Highly recommended for anyone needing quick, professional legal documentation.", service: "Income Proof", date: "1 month ago" },
    ];

    return (
        <section style={{ padding: "100px 24px", background: "#0d0d1a", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 600, height: 400, background: "radial-gradient(ellipse, rgba(99,102,241,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: 56 }}>
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: 7,
                            background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)",
                            borderRadius: 99, padding: "6px 16px", marginBottom: 20,
                        }}>
                            <Star size={13} color="#f59e0b" />
                            <span style={{ fontSize: 12, color: "#f59e0b", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Real Reviews</span>
                        </div>
                        <h2 style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 700, color: "#fff",
                            lineHeight: 1.1, letterSpacing: "-0.02em",
                        }}>
                            Trusted by{" "}
                            <span style={{ color: "#fbbf24" }}>500+ Indians</span>
                        </h2>
                    </div>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
                    {t.map((item, i) => (
                        <Reveal key={i} delay={i * 130}>
                            <div style={{
                                background: "rgba(255,255,255,0.025)",
                                border: "1px solid rgba(255,255,255,0.07)",
                                borderRadius: 20, padding: "32px 28px",
                                display: "flex", flexDirection: "column", height: "100%",
                                transition: "border-color 0.25s",
                            }}
                                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.14)"}
                                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)"}
                            >
                                {/* Service badge */}
                                <div style={{ marginBottom: 16 }}>
                                    <span style={{
                                        display: "inline-block", background: "rgba(99,102,241,0.1)",
                                        border: "1px solid rgba(99,102,241,0.2)", borderRadius: 99,
                                        padding: "3px 12px", fontSize: 11, fontWeight: 600,
                                        color: "#818cf8", fontFamily: "'DM Sans', sans-serif",
                                        letterSpacing: "0.04em", textTransform: "uppercase",
                                    }}>
                                        {item.service}
                                    </span>
                                </div>

                                {/* Stars */}
                                <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
                                    {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="#f59e0b" color="#f59e0b" />)}
                                </div>

                                {/* Quote */}
                                <p style={{
                                    fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.75,
                                    fontFamily: "'DM Sans', sans-serif", flexGrow: 1, margin: "0 0 24px",
                                    fontStyle: "italic",
                                }}>
                                    "{item.content}"
                                </p>

                                {/* Author */}
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                        <div style={{
                                            width: 40, height: 40, borderRadius: "50%",
                                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff",
                                        }}>
                                            {item.initials}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>{item.name}</div>
                                            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif" }}>{item.role}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                        <BadgeCheck size={14} color="#4ade80" />
                                        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "'DM Sans', sans-serif" }}>Verified</span>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ─────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────

const FAQSection = () => {
    const [open, setOpen] = useState<number | null>(0);
    const faqs = [
        { q: "Is an online affidavit legally valid in India?", a: "Yes. Online affidavits are fully valid in India when properly notarized. Our documents strictly follow the format prescribed by the Indian Evidence Act, 1872, and are accepted by courts, banks, and government offices nationwide." },
        { q: "How long does it take to receive my affidavit?", a: "Most standard affidavits are delivered within 2–4 hours. Complex or multi-page documents may take up to 24 hours. We'll keep you updated via WhatsApp throughout the process." },
        { q: "Can I request changes after the draft is created?", a: "Absolutely. We offer unlimited free revisions until you are 100% satisfied with the final document. Simply share your feedback on WhatsApp and we'll update it promptly." },
        { q: "How is my personal information kept secure?", a: "Your data is protected with 256-bit SSL encryption — the same standard used by banks. All documents are permanently deleted from our servers after 30 days. We never share your information with third parties." },
        { q: "Do I need to visit a notary after receiving my affidavit?", a: "For most purposes, a notarized affidavit is required. We provide complete notary guidance including recommended notary offices near you and exactly what to carry. Some government portals also accept e-stamped affidavits without physical notarization." },
    ];

    return (
        <section id="faqs" style={{ padding: "100px 24px", background: "#080812" }}>
            <div style={{ maxWidth: 760, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: 56 }}>
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: 7,
                            background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.2)",
                            borderRadius: 99, padding: "6px 16px", marginBottom: 20,
                        }}>
                            <HelpCircle size={13} color="#22d3ee" />
                            <span style={{ fontSize: 12, color: "#22d3ee", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>FAQs</span>
                        </div>
                        <h2 style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 700, color: "#fff",
                            lineHeight: 1.1, letterSpacing: "-0.02em",
                        }}>
                            Common <span style={{ color: "#22d3ee" }}>Questions</span>
                        </h2>
                    </div>
                </Reveal>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {faqs.map((f, i) => (
                        <Reveal key={i} delay={i * 60}>
                            <div style={{
                                background: open === i ? "rgba(34,211,238,0.04)" : "rgba(255,255,255,0.025)",
                                border: open === i ? "1px solid rgba(34,211,238,0.2)" : "1px solid rgba(255,255,255,0.07)",
                                borderRadius: 14, overflow: "hidden", transition: "border-color 0.25s, background 0.25s",
                            }}>
                                <button
                                    onClick={() => setOpen(open === i ? null : i)}
                                    style={{
                                        width: "100%", textAlign: "left", padding: "20px 24px",
                                        background: "none", border: "none", cursor: "pointer",
                                        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
                                    }}
                                >
                                    <span style={{ fontSize: 15, fontWeight: 600, color: "#fff", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>{f.q}</span>
                                    <ChevronDown
                                        size={18}
                                        color="rgba(255,255,255,0.4)"
                                        style={{ flexShrink: 0, transition: "transform 0.3s", transform: open === i ? "rotate(180deg)" : "none" }}
                                    />
                                </button>
                                {open === i && (
                                    <div style={{ padding: "0 24px 20px" }}>
                                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>{f.a}</p>
                                    </div>
                                )}
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={300}>
                    <div style={{ textAlign: "center", marginTop: 40 }}>
                        <button
                            onClick={() => openWhatsApp("I have a question about affidavits at NyayMitra.")}
                            style={{
                                background: "none", border: "1px solid rgba(34,211,238,0.3)", borderRadius: 10,
                                padding: "12px 28px", color: "#22d3ee", fontSize: 14, fontWeight: 600,
                                cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                                display: "inline-flex", alignItems: "center", gap: 8,
                                transition: "background 0.2s, border-color 0.2s",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = "rgba(34,211,238,0.06)"; e.currentTarget.style.borderColor = "rgba(34,211,238,0.5)"; }}
                            onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.borderColor = "rgba(34,211,238,0.3)"; }}
                        >
                            <MessageCircle size={16} /> Ask on WhatsApp
                        </button>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

// ─────────────────────────────────────────────
// FINAL CTA
// ─────────────────────────────────────────────

const FinalCTA = () => (
    <section style={{
        padding: "100px 24px", position: "relative", overflow: "hidden",
        background: "linear-gradient(160deg, #0a0a12, #0f0b1e)",
    }}>
        {/* Glowing center */}
        <div style={{
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
            width: 700, height: 400,
            background: "radial-gradient(ellipse, rgba(99,102,241,0.14) 0%, transparent 70%)",
            pointerEvents: "none",
        }} />
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative" }}>
            <Reveal>
                <div style={{
                    display: "inline-flex", alignItems: "center", gap: 7,
                    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 99, padding: "6px 16px", marginBottom: 28,
                }}>
                    <Sparkles size={13} color="#fbbf24" />
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Get Started Today</span>
                </div>
                <h2 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(38px, 6vw, 72px)", fontWeight: 700, color: "#fff",
                    lineHeight: 1.05, letterSpacing: "-0.02em", margin: "0 0 20px",
                }}>
                    Your Affidavit,
                    <br />
                    <span style={{ color: "#818cf8" }}>Ready in Minutes</span>
                </h2>
                <p style={{ fontSize: 17, color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif", marginBottom: 44, lineHeight: 1.7 }}>
                    Join thousands of satisfied customers who trust NyayMitra for fast, legally valid documentation.
                </p>

                <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginBottom: 32 }}>
                    <button
                        onClick={() => openWhatsApp("I want to create an affidavit right now. Starting at ₹999.")}
                        style={{
                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            border: "none", borderRadius: 12,
                            padding: "16px 36px", color: "#fff",
                            fontSize: 16, fontWeight: 700, cursor: "pointer",
                            fontFamily: "'DM Sans', sans-serif",
                            boxShadow: "0 10px 40px rgba(99,102,241,0.4)",
                            display: "flex", alignItems: "center", gap: 9,
                            transition: "transform 0.2s, box-shadow 0.2s",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 50px rgba(99,102,241,0.5)"; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 10px 40px rgba(99,102,241,0.4)"; }}
                    >
                        <MessageCircle size={18} />
                        Start on WhatsApp — ₹999
                    </button>
                    <button
                        onClick={() => openWhatsApp("Can I request a callback from NyayMitra?")}
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12,
                            padding: "16px 32px", color: "rgba(255,255,255,0.8)",
                            fontSize: 16, fontWeight: 600, cursor: "pointer",
                            fontFamily: "'DM Sans', sans-serif",
                            display: "flex", alignItems: "center", gap: 9,
                            transition: "border-color 0.2s, color 0.2s",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
                    >
                        <Phone size={18} />
                        Request Callback
                    </button>
                </div>

                <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
                    {["Free consultation", "30-day money-back guarantee", "100% legally valid"].map((item, i) => (
                        <span key={i} style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 6 }}>
                            <CheckCircle size={13} color="rgba(74,222,128,0.6)" /> {item}
                        </span>
                    ))}
                </div>
            </Reveal>
        </div>
    </section>
);

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────

const Footer = () => {
    const year = new Date().getFullYear();
    const [open, setOpen] = useState<string | null>(null);
    const toggle = (col: string) => setOpen(open === col ? null : col);

    const cols = [
        {
            key: "company", title: "Company",
            links: [{ l: "About NyayMitra", h: "#" }, { l: "Blog", h: "#" }, { l: "Contact Us", h: "#" }],
        },
        {
            key: "services", title: "Services",
            links: [{ l: "Affidavit Online", h: "#" }, { l: "Name Change", h: "#" }, { l: "Address Proof", h: "#" }, { l: "Property Affidavit", h: "#" }],
        },
        {
            key: "legal", title: "Legal",
            links: [{ l: "Privacy Policy", h: "#" }, { l: "Terms of Service", h: "#" }, { l: "Refund Policy", h: "#" }],
        },
    ];

    return (
        <footer style={{ background: "#05050e", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "56px 24px 28px" }}>
                {/* Top: brand + cols */}
                <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 48, marginBottom: 48 }}>
                    {/* Brand */}
                    <div style={{ minWidth: 200 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                            <div style={{
                                width: 34, height: 34, background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                                borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                                <Scale size={17} color="#fff" />
                            </div>
                            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 20, color: "#fff" }}>
                                Nyay<span style={{ color: "#818cf8" }}>Mitra</span>
                            </span>
                        </div>
                        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7, maxWidth: 200, margin: "0 0 20px" }}>
                            Legally valid affidavits online in minutes. Expert reviewed, court approved.
                        </p>
                        <div style={{ display: "flex", gap: 12 }}>
                            {[
                                { label: "WhatsApp", href: "https://wa.me/919661644025", icon: <MessageCircle size={16} /> },
                                { label: "Email", href: "mailto:support@nyaymitra.com", icon: <Mail size={16} /> },
                                { label: "Call", href: "tel:+919661644025", icon: <Phone size={16} /> },
                            ].map((s, i) => (
                                <a key={i} href={s.href} target={i === 0 ? "_blank" : undefined} rel="noopener noreferrer"
                                    style={{
                                        width: 36, height: 36, borderRadius: 9, background: "rgba(255,255,255,0.05)",
                                        border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center",
                                        justifyContent: "center", color: "rgba(255,255,255,0.5)", transition: "color 0.2s, border-color 0.2s",
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.color = "#818cf8"; e.currentTarget.style.borderColor = "rgba(129,140,248,0.3)"; }}
                                    onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                        {cols.map(col => (
                            <div key={col.key}>
                                <div
                                    onClick={() => toggle(col.key)}
                                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", marginBottom: 14 }}
                                >
                                    <span style={{ fontSize: 13, fontWeight: 700, color: "#fff", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.04em", textTransform: "uppercase" }}>{col.title}</span>
                                    <ChevronDown size={14} color="rgba(255,255,255,0.3)" style={{ transition: "transform 0.3s", transform: open === col.key ? "rotate(180deg)" : "none" }} />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                    {col.links.map((l, i) => (
                                        <a key={i} href={l.h} style={{
                                            fontSize: 13, color: "rgba(255,255,255,0.35)",
                                            fontFamily: "'DM Sans', sans-serif", textDecoration: "none",
                                            transition: "color 0.2s",
                                        }}
                                            onMouseEnter={e => e.currentTarget.style.color = "#818cf8"}
                                            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}
                                        >
                                            {l.l}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{ paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", fontFamily: "'DM Sans', sans-serif" }}>© {year} NyayMitra. All rights reserved.</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", fontFamily: "'DM Sans', sans-serif" }}>Made with care in India 🇮🇳</span>
                </div>
            </div>
        </footer>
    );
};

// ─────────────────────────────────────────────
// STICKY CTA
// ─────────────────────────────────────────────

const StickyAction = () => {
    const scrolled = useScrolled(400);
    if (!scrolled) return null;
    return (
        <div style={{
            position: "fixed", bottom: 24, right: 24, zIndex: 200,
            display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end",
            animation: "fadeInUp 0.4s ease",
        }}>
            <button
                onClick={() => openWhatsApp("I need to create an affidavit.")}
                style={{
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    border: "none", borderRadius: 12,
                    padding: "12px 22px", color: "#fff",
                    fontSize: 14, fontWeight: 700, cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    boxShadow: "0 8px 30px rgba(99,102,241,0.45)",
                    display: "flex", alignItems: "center", gap: 8,
                }}
            >
                <Sparkles size={15} /> Create Affidavit
            </button>
            <button
                onClick={() => openWhatsApp("I have a question about NyayMitra.")}
                style={{
                    background: "rgba(10,10,18,0.92)", backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12,
                    padding: "10px 18px", color: "rgba(255,255,255,0.7)",
                    fontSize: 13, fontWeight: 600, cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    display: "flex", alignItems: "center", gap: 7,
                }}
            >
                <MessageCircle size={14} /> Need Help?
            </button>
            <style>{`@keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}`}</style>
        </div>
    );
};

// ─────────────────────────────────────────────
// GOOGLE FONTS LOADER
// ─────────────────────────────────────────────

const FontLoader = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #0a0a12; }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #0a0a12; }
    ::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.4); border-radius: 99px; }
    @media (max-width: 768px) {
      .hide-mobile { display: none !important; }
      .show-mobile { display: flex !important; }
    }
  `}</style>
);

// ─────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────

export default function AffidavitOnlineIndiaPage() {
    return (
        <>
            <FontLoader />
            <main style={{ minHeight: "100vh", background: "#0a0a12" }}>
                <Header />
                <Hero />
                <ServicesSection />
                <ProcessSection />
                <PricingSection />
                <BenefitsSection />
                <TestimonialsSection />
                <FAQSection />
                <FinalCTA />
                <StickyAction />
                <Footer />
            </main>
        </>
    );
}