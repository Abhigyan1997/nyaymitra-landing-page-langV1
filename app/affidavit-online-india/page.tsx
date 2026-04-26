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
            <div style={{
                maxWidth: 1280, margin: "0 auto", padding: "0 20px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                height: 64, gap: 12
            }}>
                {/* Logo */}
                <div
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", flexShrink: 0 }}
                >
                    <div style={{
                        width: 32, height: 32,
                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                        borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 0 20px rgba(99,102,241,0.4)",
                    }}>
                        <Scale size={16} color="#fff" />
                    </div>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 20, color: "#fff", letterSpacing: "-0.01em" }}>
                        Nyay<span style={{ color: "#818cf8" }}>Mitra</span>
                    </span>
                </div>

                {/* Desktop nav - hidden on mobile */}
                <nav style={{ display: "flex", gap: 28 }} className="hide-mobile">
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

                {/* Desktop CTA - hidden on mobile */}
                <div style={{ display: "flex", gap: 10, alignItems: "center" }} className="hide-mobile">
                    <button
                        onClick={() => openWhatsApp("I need help with NyayMitra services.")}
                        style={{
                            background: "none", border: "1px solid rgba(255,255,255,0.18)",
                            borderRadius: 8, padding: "6px 16px", color: "rgba(255,255,255,0.8)",
                            fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.2s",
                            fontFamily: "'DM Sans', sans-serif",
                        }}
                    >
                        Support
                    </button>
                    <button
                        onClick={() => openWhatsApp("I want to create an affidavit. Please help me get started.")}
                        style={{
                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            border: "none", borderRadius: 8, padding: "6px 18px",
                            color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer",
                            transition: "opacity 0.2s", fontFamily: "'DM Sans', sans-serif",
                            boxShadow: "0 4px 15px rgba(99,102,241,0.35)",
                            whiteSpace: "nowrap",
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
                    padding: "16px 20px 24px",
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
                            border: "none", borderRadius: 10, padding: "12px",
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
            paddingTop: 80, paddingBottom: 80, paddingLeft: 20, paddingRight: 20,
        }}>
            {/* Atmospheric orbs - scaled for mobile */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
                <div style={{
                    position: "absolute", top: "8%", left: "12%",
                    width: "min(520px, 80vw)", height: "min(520px, 80vw)",
                    background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
                    borderRadius: "50%",
                }} />
                <div style={{
                    position: "absolute", bottom: "5%", right: "8%",
                    width: "min(480px, 70vw)", height: "min(480px, 70vw)",
                    background: "radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 70%)",
                    borderRadius: "50%",
                }} />
            </div>

            {/* Trust pill */}
            <Reveal delay={0}>
                <div style={{
                    display: "inline-flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "center",
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 99, padding: "5px 14px", marginBottom: 28,
                    backdropFilter: "blur(10px)",
                }}>
                    <div style={{ display: "flex" }}>
                        {["#6366f1", "#8b5cf6", "#a78bfa", "#c4b5fd"].map((c, i) => (
                            <div key={i} style={{
                                width: 22, height: 22, borderRadius: "50%", background: c,
                                border: "2px solid #0a0a12", marginLeft: i > 0 ? -8 : 0,
                            }} />
                        ))}
                    </div>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif" }}>
                        Trusted by <strong style={{ color: "#a5b4fc" }}>500+</strong> Indians
                    </span>
                </div>
            </Reveal>

            {/* Headline */}
            <Reveal delay={100}>
                <h1 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(38px, 8vw, 88px)",
                    fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em",
                    textAlign: "center", color: "#fff",
                    maxWidth: 900, margin: "0 auto 16px",
                    padding: "0 8px",
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
                <div style={{ textAlign: "center", marginBottom: 24, height: 30 }}>
                    <span style={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(14px, 4vw, 18px)",
                        color: "rgba(255,255,255,0.5)",
                    }}>
                        Fast ·{" "}
                    </span>
                    <span
                        style={{
                            fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(14px, 4vw, 18px)",
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
                    fontSize: "clamp(14px, 3.5vw, 17px)", color: "rgba(255,255,255,0.45)", lineHeight: 1.6,
                    textAlign: "center", maxWidth: 520, margin: "0 auto 36px",
                    padding: "0 12px",
                }}>
                    Legally binding affidavits drafted, lawyer-reviewed, and ready in hours.
                    No court trips, no confusion — just peace of mind.
                </p>
            </Reveal>

            {/* CTA Buttons */}
            <Reveal delay={360}>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 48, padding: "0 8px" }}>
                    <button
                        onClick={() => openWhatsApp("I need to create an affidavit. Please help me get started.")}
                        style={{
                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            border: "none", borderRadius: 10,
                            padding: "12px 24px", color: "#fff",
                            fontSize: "clamp(13px, 3.5vw, 15px)", fontWeight: 700, cursor: "pointer",
                            fontFamily: "'DM Sans', sans-serif",
                            boxShadow: "0 8px 30px rgba(99,102,241,0.4)",
                            display: "flex", alignItems: "center", gap: 8,
                            transition: "transform 0.2s",
                        }}
                    >
                        <MessageCircle size={16} />
                        Create Affidavit Now
                    </button>
                    <button
                        onClick={() => openWhatsApp("Can you explain how the affidavit process works at NyayMitra?")}
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10,
                            padding: "12px 24px", color: "rgba(255,255,255,0.8)",
                            fontSize: "clamp(13px, 3.5vw, 15px)", fontWeight: 600, cursor: "pointer",
                            fontFamily: "'DM Sans', sans-serif",
                            display: "flex", alignItems: "center", gap: 8,
                        }}
                    >
                        <Play size={16} />
                        How It Works
                    </button>
                </div>
            </Reveal>

            {/* Trust indicators - scrollable on mobile if needed */}
            <Reveal delay={440}>
                <div style={{
                    display: "flex", gap: "clamp(12px, 4vw, 32px)",
                    flexWrap: "wrap", justifyContent: "center",
                    padding: "0 12px"
                }}>
                    {[
                        { icon: <CheckCircle size={13} color="#4ade80" />, text: "Free Consultation" },
                        { icon: <Lock size={13} color="#818cf8" />, text: "100% Confidential" },
                        { icon: <Timer size={13} color="#f59e0b" />, text: "24hr Delivery" },
                        { icon: <Shield size={13} color="#22d3ee" />, text: "Lawyer Reviewed" },
                    ].map((t, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            {t.icon}
                            <span style={{ fontSize: "clamp(11px, 3vw, 13px)", color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>{t.text}</span>
                        </div>
                    ))}
                </div>
            </Reveal>

            {/* Stats strip - mobile optimized */}
            <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                borderTop: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.02)", backdropFilter: "blur(8px)",
                padding: "12px 16px",
            }}>
                <div style={{
                    maxWidth: 1000, margin: "0 auto",
                    display: "flex", justifyContent: "center", gap: "clamp(16px, 6vw, 64px)", flexWrap: "wrap",
                }}>
                    {[
                        { v: "60+", l: "Verified Lawyers" },
                        { v: "100+", l: "Happy Clients" },
                        { v: "< 2 min", l: "Response Time" },
                        { v: "4.9 ★", l: "Client Rating" },
                    ].map((s, i) => (
                        <div key={i} style={{ textAlign: "center" }}>
                            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 4vw, 22px)", fontWeight: 700, color: "#fff" }}>{s.v}</div>
                            <div style={{ fontSize: "clamp(9px, 2.5vw, 11px)", color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.04em", textTransform: "uppercase", marginTop: 2 }}>{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        @keyframes shimmer { 0%,100%{background-position:0%} 50%{background-position:100%} }
        .hide-mobile { display: flex; } 
        .show-mobile { display: none; }
        @media(max-width: 768px){
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media(max-width: 480px){
          .stats-text { font-size: 10px; }
        }
      `}</style>
        </section>
    );
};

// ─────────────────────────────────────────────
// SERVICES SECTION - Fully Responsive Grid
// ─────────────────────────────────────────────

const services = [
    { icon: <Home size={18} />, title: "Address Proof Affidavit", desc: "Legal declaration for verifying your current residential address for KYC, banks, and government applications.", time: "2 hrs", price: "₹999", rating: 4.9, popular: true },
    { icon: <PenTool size={18} />, title: "Name Change Affidavit", desc: "Sworn statement for legal name change after marriage, divorce, or personal choice.", time: "3 hrs", price: "₹1,199", rating: 4.8 },
    { icon: <DollarSign size={18} />, title: "Income Proof Affidavit", desc: "Income declaration accepted for loans, visa applications, or government schemes.", time: "2 hrs", price: "₹999", rating: 4.7 },
    { icon: <Fingerprint size={18} />, title: "Identity Verification", desc: "Confirm your identity for lost documents, legal proceedings, or official purposes.", time: "1.5 hrs", price: "₹899", rating: 4.9 },
    { icon: <Building2 size={18} />, title: "Property Affidavit", desc: "Declaration for property ownership, disputes, inheritance, or transfer matters.", time: "4 hrs", price: "₹1,499", rating: 4.8 },
    { icon: <GraduationCap size={18} />, title: "Educational Affidavit", desc: "Sworn statement for educational qualifications, certifications, and academic records.", time: "2 hrs", price: "₹999", rating: 4.8 },
];

const ServicesSection = () => (
    <section id="services" style={{ padding: "clamp(48px, 10vw, 100px) 20px", background: "#0d0d1a" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <Reveal>
                <div style={{ textAlign: "center", marginBottom: "clamp(40px, 8vw, 64px)" }}>
                    <div style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)",
                        borderRadius: 99, padding: "4px 14px", marginBottom: 16,
                    }}>
                        <Sparkles size={12} color="#818cf8" />
                        <span style={{ fontSize: 11, color: "#818cf8", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>All Services</span>
                    </div>
                    <h2 style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(30px, 7vw, 56px)", fontWeight: 700, color: "#fff",
                        lineHeight: 1.15, letterSpacing: "-0.02em", margin: "0 0 12px", padding: "0 12px",
                    }}>
                        Affidavit Services for{" "}
                        <span style={{ color: "#818cf8" }}>Every Need</span>
                    </h2>
                    <p style={{ fontSize: "clamp(13px, 3.5vw, 16px)", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif", maxWidth: 500, margin: "0 auto", padding: "0 16px" }}>
                        Tailored legal documentation solutions across all major categories
                    </p>
                </div>
            </Reveal>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
                gap: 20,
                padding: "0 4px"
            }}>
                {services.map((s, i) => (
                    <Reveal key={i} delay={i * 80}>
                        <div
                            style={{
                                position: "relative",
                                background: "rgba(255,255,255,0.03)",
                                border: s.popular ? "1px solid rgba(129,140,248,0.35)" : "1px solid rgba(255,255,255,0.07)",
                                borderRadius: 16, padding: "24px 20px 20px",
                                transition: "border-color 0.25s, background 0.25s, transform 0.25s",
                                cursor: "default",
                            }}
                        >
                            {s.popular && (
                                <div style={{
                                    position: "absolute", top: -10, right: 16,
                                    background: "linear-gradient(135deg, #f59e0b, #ef4444)",
                                    borderRadius: 99, padding: "2px 10px",
                                    fontSize: 10, fontWeight: 700, color: "#fff",
                                    fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em",
                                }}>
                                    MOST POPULAR
                                </div>
                            )}
                            <div style={{
                                width: 40, height: 40,
                                background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)",
                                borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                                color: "#818cf8", marginBottom: 16,
                            }}>
                                {s.icon}
                            </div>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(16px, 4vw, 17px)", fontWeight: 700, color: "#fff", margin: "0 0 6px" }}>{s.title}</h3>
                            <p style={{ fontSize: "clamp(12px, 3.5vw, 14px)", color: "rgba(255,255,255,0.45)", lineHeight: 1.6, margin: "0 0 18px", fontFamily: "'DM Sans', sans-serif" }}>{s.desc}</p>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.07)", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                    <Clock size={12} color="rgba(255,255,255,0.3)" />
                                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif" }}>{s.time}</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                                    <Star size={12} fill="#f59e0b" color="#f59e0b" />
                                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>{s.rating}</span>
                                </div>
                                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: "#818cf8" }}>{s.price}</span>
                            </div>
                            <button
                                onClick={() => openWhatsApp(`I need a ${s.title}. Please help me.`)}
                                style={{
                                    width: "100%", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)",
                                    borderRadius: 8, padding: "9px", color: "#a5b4fc",
                                    fontSize: "clamp(12px, 3vw, 13px)", fontWeight: 600, cursor: "pointer",
                                    fontFamily: "'DM Sans', sans-serif",
                                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                                }}
                            >
                                Get Started <ChevronRight size={13} />
                            </button>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);

// ─────────────────────────────────────────────
// PROCESS SECTION - Responsive
// ─────────────────────────────────────────────

const ProcessSection = () => {
    const steps = [
        { n: "01", icon: <MessageCircle size={20} />, title: "Share Requirements", desc: "Tell us your needs via WhatsApp. Select type, share personal details and supporting documents.", time: "5–7 min", color: "#6366f1" },
        { n: "02", icon: <FileText size={20} />, title: "Expert Drafting", desc: "AI-powered generation combined with lawyer verification for full legal compliance.", time: "2–4 hours", color: "#8b5cf6" },
        { n: "03", icon: <Download size={20} />, title: "Review & Download", desc: "Review your document, request unlimited revisions, then download as PDF or DOCX.", time: "Instant", color: "#a78bfa" },
    ];

    return (
        <section id="process" style={{ padding: "clamp(48px, 10vw, 100px) 20px", background: "#080812", position: "relative", overflow: "hidden" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: "clamp(40px, 8vw, 64px)" }}>
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: 6,
                            background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)",
                            borderRadius: 99, padding: "4px 14px", marginBottom: 16,
                        }}>
                            <Rocket size={12} color="#a78bfa" />
                            <span style={{ fontSize: 11, color: "#a78bfa", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Simple Process</span>
                        </div>
                        <h2 style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(30px, 7vw, 56px)", fontWeight: 700, color: "#fff",
                            lineHeight: 1.15, letterSpacing: "-0.02em", padding: "0 12px",
                        }}>
                            Your Affidavit in{" "}
                            <span style={{ color: "#a78bfa" }}>3 Steps</span>
                        </h2>
                    </div>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 20, position: "relative" }}>
                    {steps.map((s, i) => (
                        <Reveal key={i} delay={i * 160}>
                            <div style={{
                                background: "rgba(255,255,255,0.025)",
                                border: "1px solid rgba(255,255,255,0.07)",
                                borderRadius: 18, padding: "28px 20px",
                                textAlign: "center",
                                transition: "border-color 0.25s, background 0.25s",
                            }}>
                                <div style={{
                                    width: 52, height: 52, borderRadius: 16, margin: "0 auto 18px",
                                    background: `linear-gradient(135deg, ${s.color}22, ${s.color}10)`,
                                    border: `1px solid ${s.color}40`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    position: "relative",
                                }}>
                                    <span style={{ color: s.color }}>{s.icon}</span>
                                    <div style={{
                                        position: "absolute", top: -8, right: -8,
                                        width: 22, height: 22, borderRadius: "50%",
                                        background: s.color, display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: 10, fontWeight: 700, color: "#fff", fontFamily: "'DM Sans', sans-serif",
                                    }}>
                                        {i + 1}
                                    </div>
                                </div>
                                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(16px, 4vw, 18px)", fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>{s.title}</h3>
                                <p style={{ fontSize: "clamp(12px, 3.5vw, 14px)", color: "rgba(255,255,255,0.4)", lineHeight: 1.65, fontFamily: "'DM Sans', sans-serif", margin: "0 0 18px" }}>{s.desc}</p>
                                <div style={{
                                    display: "inline-flex", alignItems: "center", gap: 5,
                                    background: `${s.color}15`, border: `1px solid ${s.color}25`,
                                    borderRadius: 99, padding: "4px 12px",
                                }}>
                                    <Clock size={11} color={s.color} />
                                    <span style={{ fontSize: 11, color: s.color, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>{s.time}</span>
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
// PRICING SECTION - Fully Responsive
// ─────────────────────────────────────────────

const PricingSection = () => {
    const tiers = [
        { name: "Essential", price: 999, desc: "For simple, straightforward affidavit needs", features: ["Standard affidavit drafting", "AI-powered generation", "Email support", "PDF download"], excluded: ["Expert lawyer review", "Notary guidance"], cta: "Get Essential" },
        { name: "Professional", price: 1999, desc: "Most comprehensive — our recommended plan", features: ["Everything in Essential", "Expert lawyer review", "Unlimited revisions", "24/7 priority support", "Notary guidance"], excluded: [], cta: "Get Professional", popular: true },
        { name: "Enterprise", price: 4999, desc: "For businesses and bulk requirements", features: ["Everything in Professional", "Bulk document processing", "Dedicated account manager", "Legal compliance certificate", "Custom templates"], excluded: [], cta: "Contact Sales" },
    ];

    return (
        <section id="pricing" style={{ padding: "clamp(48px, 10vw, 100px) 20px", background: "#0d0d1a" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: "clamp(40px, 8vw, 64px)" }}>
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: 6,
                            background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)",
                            borderRadius: 99, padding: "4px 14px", marginBottom: 16,
                        }}>
                            <DollarSign size={12} color="#4ade80" />
                            <span style={{ fontSize: 11, color: "#4ade80", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Transparent Pricing</span>
                        </div>
                        <h2 style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(30px, 7vw, 56px)", fontWeight: 700, color: "#fff",
                            lineHeight: 1.15, letterSpacing: "-0.02em", padding: "0 12px",
                        }}>
                            Simple Plans,{" "}
                            <span style={{ color: "#4ade80" }}>No Hidden Fees</span>
                        </h2>
                    </div>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 290px), 1fr))", gap: 20, alignItems: "start" }}>
                    {tiers.map((t, i) => (
                        <Reveal key={i} delay={i * 120}>
                            <div style={{
                                background: t.popular ? "rgba(99,102,241,0.08)" : "rgba(255,255,255,0.025)",
                                border: t.popular ? "1px solid rgba(99,102,241,0.4)" : "1px solid rgba(255,255,255,0.07)",
                                borderRadius: 20, padding: "28px 20px",
                                position: "relative",
                                transform: t.popular ? "scale(1.02)" : "none",
                            }}>
                                {t.popular && (
                                    <div style={{
                                        position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                                        borderRadius: 99, padding: "3px 14px",
                                        fontSize: 10, fontWeight: 700, color: "#fff",
                                        fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.06em",
                                        whiteSpace: "nowrap",
                                    }}>
                                        MOST POPULAR
                                    </div>
                                )}
                                <div style={{ marginBottom: 6 }}>
                                    <span style={{ fontSize: 12, fontWeight: 600, color: t.popular ? "#818cf8" : "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em", textTransform: "uppercase" }}>{t.name}</span>
                                </div>
                                <div style={{ margin: "10px 0 4px" }}>
                                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(42px, 8vw, 52px)", fontWeight: 700, color: "#fff", lineHeight: 1 }}>₹{t.price.toLocaleString()}</span>
                                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontFamily: "'DM Sans', sans-serif", marginLeft: 4 }}>/ one-time</span>
                                </div>
                                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif", marginBottom: 24, lineHeight: 1.5 }}>{t.desc}</p>

                                <button
                                    onClick={() => openWhatsApp(`I'm interested in the ${t.name} plan at ₹${t.price}. Please tell me more.`)}
                                    style={{
                                        width: "100%",
                                        background: t.popular ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "rgba(255,255,255,0.06)",
                                        border: t.popular ? "none" : "1px solid rgba(255,255,255,0.12)",
                                        borderRadius: 10, padding: "11px",
                                        color: "#fff", fontSize: "clamp(12px, 3.5vw, 14px)", fontWeight: 600, cursor: "pointer",
                                        fontFamily: "'DM Sans', sans-serif",
                                        boxShadow: t.popular ? "0 8px 24px rgba(99,102,241,0.3)" : "none",
                                        marginBottom: 20,
                                    }}
                                >
                                    {t.cta} on WhatsApp
                                </button>

                                <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                                    {t.features.map((f, j) => (
                                        <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                                            <CheckCircle size={13} color="#4ade80" style={{ flexShrink: 0, marginTop: 1 }} />
                                            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", fontFamily: "'DM Sans', sans-serif" }}>{f}</span>
                                        </div>
                                    ))}
                                    {t.excluded.map((f, j) => (
                                        <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                                            <X size={13} color="rgba(255,255,255,0.2)" style={{ flexShrink: 0, marginTop: 1 }} />
                                            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", fontFamily: "'DM Sans', sans-serif" }}>{f}</span>
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
// BENEFITS SECTION - Responsive Grid
// ─────────────────────────────────────────────

const BenefitsSection = () => {
    const benefits = [
        { icon: <Zap size={16} color="#f59e0b" />, bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.2)", title: "Lightning Fast", desc: "Affidavit in 2–4 hours vs 3–7 days at a notary" },
        { icon: <Shield size={16} color="#22d3ee" />, bg: "rgba(34,211,238,0.1)", border: "rgba(34,211,238,0.2)", title: "Legally Verified", desc: "Reviewed by experienced lawyers for full court compliance" },
        { icon: <MessageCircle size={16} color="#4ade80" />, bg: "rgba(74,222,128,0.1)", border: "rgba(74,222,128,0.2)", title: "24/7 WhatsApp Support", desc: "Real-time assistance from legal experts, always available" },
        { icon: <FileCheck size={16} color="#818cf8" />, bg: "rgba(129,140,248,0.1)", border: "rgba(129,140,248,0.2)", title: "Unlimited Revisions", desc: "Free changes until you are completely satisfied" },
        { icon: <Lock size={16} color="#f472b6" />, bg: "rgba(244,114,182,0.1)", border: "rgba(244,114,182,0.2)", title: "Bank-Grade Security", desc: "256-bit SSL encryption, auto-delete after 30 days" },
        { icon: <Award size={16} color="#fb923c" />, bg: "rgba(251,146,60,0.1)", border: "rgba(251,146,60,0.2)", title: "Money-Back Guarantee", desc: "30-day full refund, zero questions asked" },
    ];

    return (
        <section style={{ padding: "clamp(48px, 10vw, 100px) 20px", background: "#080812" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: "clamp(40px, 8vw, 64px)" }}>
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: 6,
                            background: "rgba(129,140,248,0.1)", border: "1px solid rgba(129,140,248,0.2)",
                            borderRadius: 99, padding: "4px 14px", marginBottom: 16,
                        }}>
                            <Crown size={12} color="#818cf8" />
                            <span style={{ fontSize: 11, color: "#818cf8", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Why NyayMitra</span>
                        </div>
                        <h2 style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(30px, 7vw, 56px)", fontWeight: 700, color: "#fff",
                            lineHeight: 1.15, letterSpacing: "-0.02em", padding: "0 12px",
                        }}>
                            Better Than the{" "}
                            <span style={{ color: "#818cf8" }}>Old Way</span>
                        </h2>
                    </div>
                </Reveal>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 14 }}>
                    {benefits.map((b, i) => (
                        <Reveal key={i} delay={i * 80}>
                            <div style={{
                                display: "flex", gap: 14, padding: "18px 20px",
                                background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)",
                                borderRadius: 14, transition: "border-color 0.25s, background 0.25s",
                                alignItems: "flex-start",
                            }}>
                                <div style={{
                                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                                    background: b.bg, border: `1px solid ${b.border}`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                }}>
                                    {b.icon}
                                </div>
                                <div>
                                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(14px, 3.5vw, 15px)", fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>{b.title}</h3>
                                    <p style={{ fontSize: "clamp(11px, 3vw, 13px)", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.55, margin: 0 }}>{b.desc}</p>
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
// TESTIMONIALS SECTION - Responsive
// ─────────────────────────────────────────────

const TestimonialsSection = () => {
    const t = [
        { initials: "SA", name: "Swapnil Anand", role: "Property Owner", content: "Took notary service for name change in property documents. The entire process was smooth — got my registered affidavit within 24 hours. Saved me 3 trips to the notary office!", service: "Name Change", date: "5 months ago" },
        { initials: "JK", name: "Jay Kumar", role: "Homeowner", content: "Needed an affidavit for electricity connection at my new house. NyayMitra delivered within 2 hours. Accepted by the electricity department without any issues whatsoever.", service: "Address Proof", date: "2 weeks ago" },
        { initials: "RS", name: "Ramesh Sharma", role: "Business Owner", content: "The affidavit was perfect and legally sound. Saved me from multiple visits to the notary. Highly recommended for anyone needing quick, professional legal documentation.", service: "Income Proof", date: "1 month ago" },
    ];

    return (
        <section style={{ padding: "clamp(48px, 10vw, 100px) 20px", background: "#0d0d1a" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: "clamp(40px, 8vw, 56px)" }}>
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: 6,
                            background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)",
                            borderRadius: 99, padding: "4px 14px", marginBottom: 16,
                        }}>
                            <Star size={12} color="#f59e0b" />
                            <span style={{ fontSize: 11, color: "#f59e0b", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Real Reviews</span>
                        </div>
                        <h2 style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(30px, 7vw, 56px)", fontWeight: 700, color: "#fff",
                            lineHeight: 1.15, letterSpacing: "-0.02em", padding: "0 12px",
                        }}>
                            Trusted by{" "}
                            <span style={{ color: "#fbbf24" }}>100+ Indians</span>
                        </h2>
                    </div>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 18 }}>
                    {t.map((item, i) => (
                        <Reveal key={i} delay={i * 130}>
                            <div style={{
                                background: "rgba(255,255,255,0.025)",
                                border: "1px solid rgba(255,255,255,0.07)",
                                borderRadius: 18, padding: "24px 20px",
                                display: "flex", flexDirection: "column", height: "100%",
                            }}>
                                <div style={{ marginBottom: 12 }}>
                                    <span style={{
                                        display: "inline-block", background: "rgba(99,102,241,0.1)",
                                        border: "1px solid rgba(99,102,241,0.2)", borderRadius: 99,
                                        padding: "2px 10px", fontSize: 10, fontWeight: 600,
                                        color: "#818cf8", fontFamily: "'DM Sans', sans-serif",
                                        letterSpacing: "0.04em", textTransform: "uppercase",
                                    }}>
                                        {item.service}
                                    </span>
                                </div>
                                <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
                                    {[...Array(5)].map((_, j) => <Star key={j} size={12} fill="#f59e0b" color="#f59e0b" />)}
                                </div>
                                <p style={{
                                    fontSize: "clamp(13px, 3.5vw, 15px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.7,
                                    fontFamily: "'DM Sans', sans-serif", flexGrow: 1, margin: "0 0 20px",
                                    fontStyle: "italic",
                                }}>
                                    "{item.content}"
                                </p>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.07)", flexWrap: "wrap", gap: 12 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                        <div style={{
                                            width: 36, height: 36, borderRadius: "50%",
                                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, color: "#fff",
                                        }}>
                                            {item.initials}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>{item.name}</div>
                                            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif" }}>{item.role}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                        <BadgeCheck size={12} color="#4ade80" />
                                        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: "'DM Sans', sans-serif" }}>Verified</span>
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
// FAQ SECTION - Responsive
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
        <section id="faqs" style={{ padding: "clamp(48px, 10vw, 100px) 20px", background: "#080812" }}>
            <div style={{ maxWidth: 760, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: "clamp(40px, 8vw, 56px)" }}>
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: 6,
                            background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.2)",
                            borderRadius: 99, padding: "4px 14px", marginBottom: 16,
                        }}>
                            <HelpCircle size={12} color="#22d3ee" />
                            <span style={{ fontSize: 11, color: "#22d3ee", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>FAQs</span>
                        </div>
                        <h2 style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(30px, 7vw, 56px)", fontWeight: 700, color: "#fff",
                            lineHeight: 1.15, letterSpacing: "-0.02em", padding: "0 12px",
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
                                borderRadius: 14, overflow: "hidden",
                            }}>
                                <button
                                    onClick={() => setOpen(open === i ? null : i)}
                                    style={{
                                        width: "100%", textAlign: "left", padding: "16px 18px",
                                        background: "none", border: "none", cursor: "pointer",
                                        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
                                    }}
                                >
                                    <span style={{ fontSize: "clamp(13px, 3.8vw, 15px)", fontWeight: 600, color: "#fff", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.45, paddingRight: 8 }}>{f.q}</span>
                                    <ChevronDown
                                        size={16}
                                        color="rgba(255,255,255,0.4)"
                                        style={{ flexShrink: 0, transition: "transform 0.3s", transform: open === i ? "rotate(180deg)" : "none" }}
                                    />
                                </button>
                                {open === i && (
                                    <div style={{ padding: "0 18px 18px" }}>
                                        <p style={{ fontSize: "clamp(12px, 3.5vw, 14px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>{f.a}</p>
                                    </div>
                                )}
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={300}>
                    <div style={{ textAlign: "center", marginTop: 32 }}>
                        <button
                            onClick={() => openWhatsApp("I have a question about affidavits at NyayMitra.")}
                            style={{
                                background: "none", border: "1px solid rgba(34,211,238,0.3)", borderRadius: 10,
                                padding: "10px 24px", color: "#22d3ee", fontSize: "clamp(12px, 3.5vw, 14px)", fontWeight: 600,
                                cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                                display: "inline-flex", alignItems: "center", gap: 7,
                            }}
                        >
                            <MessageCircle size={14} /> Ask on WhatsApp
                        </button>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

// ─────────────────────────────────────────────
// FINAL CTA - Responsive
// ─────────────────────────────────────────────

const FinalCTA = () => (
    <section style={{
        padding: "clamp(60px, 12vw, 100px) 20px",
        position: "relative", overflow: "hidden",
        background: "linear-gradient(160deg, #0a0a12, #0f0b1e)",
    }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative" }}>
            <Reveal>
                <div style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 99, padding: "4px 14px", marginBottom: 24,
                }}>
                    <Sparkles size={12} color="#fbbf24" />
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Get Started Today</span>
                </div>
                <h2 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(32px, 8vw, 72px)", fontWeight: 700, color: "#fff",
                    lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 16px",
                    padding: "0 12px",
                }}>
                    Your Affidavit,
                    <br />
                    <span style={{ color: "#818cf8" }}>Ready in Minutes</span>
                </h2>
                <p style={{ fontSize: "clamp(14px, 4vw, 17px)", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif", marginBottom: 36, lineHeight: 1.6, padding: "0 16px" }}>
                    Join thousands of satisfied customers who trust NyayMitra for fast, legally valid documentation.
                </p>

                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 28, padding: "0 8px" }}>
                    <button
                        onClick={() => openWhatsApp("I want to create an affidavit right now. Starting at ₹999.")}
                        style={{
                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            border: "none", borderRadius: 12,
                            padding: "12px 24px", color: "#fff",
                            fontSize: "clamp(13px, 3.5vw, 16px)", fontWeight: 700, cursor: "pointer",
                            fontFamily: "'DM Sans', sans-serif",
                            boxShadow: "0 10px 40px rgba(99,102,241,0.4)",
                            display: "flex", alignItems: "center", gap: 8,
                        }}
                    >
                        <MessageCircle size={16} />
                        Start on WhatsApp — ₹999
                    </button>
                    <button
                        onClick={() => openWhatsApp("Can I request a callback from NyayMitra?")}
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12,
                            padding: "12px 24px", color: "rgba(255,255,255,0.8)",
                            fontSize: "clamp(13px, 3.5vw, 16px)", fontWeight: 600, cursor: "pointer",
                            fontFamily: "'DM Sans', sans-serif",
                            display: "flex", alignItems: "center", gap: 8,
                        }}
                    >
                        <Phone size={16} />
                        Request Callback
                    </button>
                </div>

                <div style={{ display: "flex", gap: "clamp(12px, 4vw, 24px)", flexWrap: "wrap", justifyContent: "center", padding: "0 12px" }}>
                    {["Free consultation", "30-day money-back guarantee", "100% legally valid"].map((item, i) => (
                        <span key={i} style={{ fontSize: "clamp(11px, 3vw, 13px)", color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 5 }}>
                            <CheckCircle size={12} color="rgba(74,222,128,0.6)" /> {item}
                        </span>
                    ))}
                </div>
            </Reveal>
        </div>
    </section>
);

// ─────────────────────────────────────────────
// FOOTER - Responsive
// ─────────────────────────────────────────────

const Footer = () => {
    const year = new Date().getFullYear();
    const [open, setOpen] = useState<string | null>(null);
    const toggle = (col: string) => setOpen(open === col ? null : col);

    const cols = [
        { key: "company", title: "Company", links: [{ l: "About NyayMitra", h: "#" }, { l: "Blog", h: "#" }, { l: "Contact Us", h: "#" }] },
        { key: "services", title: "Services", links: [{ l: "Affidavit Online", h: "#" }, { l: "Name Change", h: "#" }, { l: "Address Proof", h: "#" }, { l: "Property Affidavit", h: "#" }] },
        { key: "legal", title: "Legal", links: [{ l: "Privacy Policy", h: "#" }, { l: "Terms of Service", h: "#" }, { l: "Refund Policy", h: "#" }] },
    ];

    return (
        <footer style={{ background: "#05050e", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 20px 28px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 40, marginBottom: 40 }}>
                    <div style={{ minWidth: 180, flex: "1 1 200px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                            <div style={{
                                width: 30, height: 30, background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                                borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                                <Scale size={15} color="#fff" />
                            </div>
                            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 18, color: "#fff" }}>
                                Nyay<span style={{ color: "#818cf8" }}>Mitra</span>
                            </span>
                        </div>
                        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6, maxWidth: 220, margin: "0 0 16px" }}>
                            Legally valid affidavits online in minutes. Expert reviewed, court approved.
                        </p>
                        <div style={{ display: "flex", gap: 10 }}>
                            {[
                                { label: "WhatsApp", href: "https://wa.me/919661644025", icon: <MessageCircle size={14} /> },
                                { label: "Email", href: "mailto:support@nyaymitra.com", icon: <Mail size={14} /> },
                                { label: "Call", href: "tel:+919661644025", icon: <Phone size={14} /> },
                            ].map((s, i) => (
                                <a key={i} href={s.href} target={i === 0 ? "_blank" : undefined} rel="noopener noreferrer"
                                    style={{
                                        width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.05)",
                                        border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center",
                                        justifyContent: "center", color: "rgba(255,255,255,0.5)", transition: "color 0.2s, border-color 0.2s",
                                    }}
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 28, flex: "2" }}>
                        {cols.map(col => (
                            <div key={col.key}>
                                <div
                                    onClick={() => toggle(col.key)}
                                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", marginBottom: 12 }}
                                >
                                    <span style={{ fontSize: 12, fontWeight: 700, color: "#fff", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.04em", textTransform: "uppercase" }}>{col.title}</span>
                                    <ChevronDown size={12} color="rgba(255,255,255,0.3)" style={{ transition: "transform 0.3s", transform: open === col.key ? "rotate(180deg)" : "none" }} />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                    {col.links.map((l, i) => (
                                        <a key={i} href={l.h} style={{
                                            fontSize: 12, color: "rgba(255,255,255,0.35)",
                                            fontFamily: "'DM Sans', sans-serif", textDecoration: "none",
                                            transition: "color 0.2s",
                                        }}>
                                            {l.l}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", fontFamily: "'DM Sans', sans-serif" }}>© {year} NyayMitra. All rights reserved.</span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", fontFamily: "'DM Sans', sans-serif" }}>Made with care in India 🇮🇳</span>
                </div>
            </div>
        </footer>
    );
};

// ─────────────────────────────────────────────
// STICKY CTA - Mobile Optimized
// ─────────────────────────────────────────────

const StickyAction = () => {
    const scrolled = useScrolled(400);
    if (!scrolled) return null;
    return (
        <div style={{
            position: "fixed", bottom: 16, right: 16, zIndex: 200,
            display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end",
            animation: "fadeInUp 0.4s ease",
        }}>
            <button
                onClick={() => openWhatsApp("I need to create an affidavit.")}
                style={{
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    border: "none", borderRadius: 40,
                    padding: "10px 20px", color: "#fff",
                    fontSize: "clamp(12px, 3.5vw, 14px)", fontWeight: 700, cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    boxShadow: "0 8px 24px rgba(99,102,241,0.45)",
                    display: "flex", alignItems: "center", gap: 8,
                }}
            >
                <Sparkles size={14} /> Create Affidavit
            </button>
            <button
                onClick={() => openWhatsApp("I have a question about NyayMitra.")}
                style={{
                    background: "rgba(10,10,18,0.92)", backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.12)", borderRadius: 40,
                    padding: "8px 16px", color: "rgba(255,255,255,0.7)",
                    fontSize: "clamp(11px, 3vw, 13px)", fontWeight: 600, cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    display: "flex", alignItems: "center", gap: 6,
                }}
            >
                <MessageCircle size={13} /> Need Help?
            </button>
            <style>{`@keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}`}</style>
        </div>
    );
};

// ─────────────────────────────────────────────
// GLOBAL STYLES
// ─────────────────────────────────────────────

const GlobalStyles = () => (
    <style>{`
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { background: #0a0a12; font-family: 'DM Sans', sans-serif; overflow-x: hidden; width: 100%; }
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: #0a0a12; }
      ::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.4); border-radius: 99px; }
      @media (max-width: 768px) {
        .hide-mobile { display: none !important; }
        .show-mobile { display: flex !important; }
      }
      @media (max-width: 480px) {
        button, a { touch-action: manipulation; }
      }
    `}</style>
);

// ─────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────

export default function AffidavitOnlineIndiaPage() {
    return (
        <>
            <GlobalStyles />
            <main style={{ minHeight: "100vh", background: "#0a0a12", overflowX: "hidden", width: "100%" }}>
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