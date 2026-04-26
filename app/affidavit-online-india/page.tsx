// app/page.tsx
"use client";

import { useState, useEffect, useRef, memo } from "react";
import {
    Scale, FileText, Shield, Zap, Users, Clock, CheckCircle,
    ArrowRight, MessageCircle, Gavel, Star, Sparkles, Building2,
    BadgeCheck, FileCheck, Timer, Lock, Phone, Mail, ChevronDown,
    Play, Download, Award, Crown, HelpCircle, Fingerprint,
    GraduationCap, Home, PenTool, DollarSign, Printer, X, Menu,
    ChevronRight, Rocket, ExternalLink, Globe, ThumbsUp, Eye,
    BookOpen, Info, Layers, BarChart, Briefcase
} from "lucide-react";

// ─────────────────────────────────────────────
// HELPERS & HOOKS
// ─────────────────────────────────────────────

const openWhatsApp = (msg: string) =>
    window.open(`https://wa.me/919661644025?text=${encodeURIComponent(msg)}`, "_blank");

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
    }, [options]);
    return { ref, inView };
};

// ─────────────────────────────────────────────
// ANIMATION WRAPPER
// ─────────────────────────────────────────────

const Reveal = ({ children, delay = 0, y = 28, className = "" }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) => {
    const { ref, inView } = useInView();
    return (
        <div
            ref={ref}
            className={className}
            style={{
                transition: `opacity 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1) ${delay}ms, transform 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1) ${delay}ms`,
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
                height: 72, gap: 12
            }}>
                <div
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", flexShrink: 0 }}
                >
                    <div style={{
                        width: 34, height: 34,
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

                <nav style={{ display: "flex", gap: 32 }} className="hide-mobile">
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

                <div style={{ display: "flex", gap: 12, alignItems: "center" }} className="hide-mobile">
                    <button
                        onClick={() => openWhatsApp("I need help with NyayMitra services.")}
                        style={{
                            background: "none", border: "1px solid rgba(255,255,255,0.18)",
                            borderRadius: 10, padding: "8px 18px", color: "rgba(255,255,255,0.8)",
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
                            border: "none", borderRadius: 10, padding: "8px 20px",
                            color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer",
                            transition: "opacity 0.2s", fontFamily: "'DM Sans', sans-serif",
                            boxShadow: "0 4px 15px rgba(99,102,241,0.35)",
                            whiteSpace: "nowrap",
                        }}
                    >
                        Get Started →
                    </button>
                </div>

                <button
                    onClick={() => setOpen(!open)}
                    className="show-mobile"
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", padding: 4 }}
                >
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

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
                            width: "100%", marginTop: 20,
                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            border: "none", borderRadius: 12, padding: "14px",
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
// SEO HERO
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

            <Reveal delay={0}>
                <div style={{
                    display: "inline-flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "center",
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 99, padding: "6px 16px", marginBottom: 28,
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

            <Reveal delay={100}>
                <h1 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(42px, 8vw, 88px)",
                    fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em",
                    textAlign: "center", color: "#fff",
                    maxWidth: 1000, margin: "0 auto 16px",
                    padding: "0 8px",
                }}>
                    Create Affidavit Online in India <br />
                    <span style={{
                        background: "linear-gradient(90deg, #818cf8, #c4b5fd, #818cf8)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                        backgroundSize: "200%",
                        animation: "shimmer 3s linear infinite",
                    }}>
                        (Legally Valid & Fast)
                    </span>
                </h1>
            </Reveal>

            <Reveal delay={200}>
                <div style={{ textAlign: "center", marginBottom: 24, height: 32 }}>
                    <span style={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(16px, 4vw, 18px)",
                        color: "rgba(255,255,255,0.5)",
                    }}>
                        Delivered in 2–4 hours · Lawyer-reviewed · Starting ₹999
                    </span>
                </div>
            </Reveal>

            <Reveal delay={280}>
                <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "clamp(15px, 3.5vw, 18px)", color: "rgba(255,255,255,0.45)", lineHeight: 1.6,
                    textAlign: "center", maxWidth: 600, margin: "0 auto 36px",
                    padding: "0 12px",
                }}>
                    Legally binding affidavits drafted, lawyer-reviewed, and ready in hours.
                    No court trips, no confusion — just peace of mind.
                </p>
            </Reveal>

            <Reveal delay={360}>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginBottom: 48, padding: "0 8px" }}>
                    <button
                        onClick={() => openWhatsApp("I need to create an affidavit. Please help me get started.")}
                        style={{
                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            border: "none", borderRadius: 12,
                            padding: "14px 28px", color: "#fff",
                            fontSize: "clamp(14px, 3.5vw, 16px)", fontWeight: 700, cursor: "pointer",
                            fontFamily: "'DM Sans', sans-serif",
                            boxShadow: "0 8px 30px rgba(99,102,241,0.4)",
                            display: "flex", alignItems: "center", gap: 8,
                            transition: "transform 0.2s",
                        }}
                    >
                        <MessageCircle size={18} />
                        Create Affidavit Now
                    </button>
                    <button
                        onClick={() => openWhatsApp("Can you explain how the affidavit process works at NyayMitra?")}
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12,
                            padding: "14px 28px", color: "rgba(255,255,255,0.8)",
                            fontSize: "clamp(14px, 3.5vw, 16px)", fontWeight: 600, cursor: "pointer",
                            fontFamily: "'DM Sans', sans-serif",
                            display: "flex", alignItems: "center", gap: 8,
                        }}
                    >
                        <Phone size={18} />
                        Talk to Expert
                    </button>
                </div>
            </Reveal>

            {/* <Reveal delay={440}>
                <div style={{
                    display: "flex", gap: "clamp(20px, 4vw, 40px)",
                    flexWrap: "wrap", justifyContent: "center",
                    padding: "0 12px"
                }}>
                    {[
                        { icon: <CheckCircle size={14} color="#4ade80" />, text: "500+ Happy Clients" },
                        { icon: <BadgeCheck size={14} color="#818cf8" />, text: "Verified Lawyers" },
                        { icon: <Lock size={14} color="#22d3ee" />, text: "100% Confidential" },
                    ].map((t, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            {t.icon}
                            <span style={{ fontSize: "clamp(12px, 3vw, 14px)", color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>{t.text}</span>
                        </div>
                    ))}
                </div>
            </Reveal> */}

            <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                borderTop: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.02)", backdropFilter: "blur(8px)",
                padding: "16px 20px",
            }}>
                <div style={{
                    maxWidth: 1000, margin: "0 auto",
                    display: "flex", justifyContent: "center", gap: "clamp(24px, 6vw, 80px)", flexWrap: "wrap",
                }}>
                    {[
                        { v: "60+", l: "Verified Lawyers" },
                        { v: "500+", l: "Happy Clients" },
                        { v: "< 2 min", l: "Response Time" },
                        { v: "4.9 ★", l: "Client Rating" },
                    ].map((s, i) => (
                        <div key={i} style={{ textAlign: "center" }}>
                            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 4vw, 24px)", fontWeight: 700, color: "#fff" }}>{s.v}</div>
                            <div style={{ fontSize: "clamp(10px, 2.5vw, 12px)", color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.04em", textTransform: "uppercase", marginTop: 4 }}>{s.l}</div>
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
      `}</style>
        </section>
    );
};

// ─────────────────────────────────────────────
// WHAT IS AN AFFIDAVIT (SEO BLOCK)
// ─────────────────────────────────────────────

const WhatIsAffidavit = () => (
    <section style={{ padding: "clamp(48px, 10vw, 100px) 20px", background: "#080812" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: 16 }}>
                        <h2 style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(32px, 7vw, 56px)", fontWeight: 700, color: "#fff",
                            lineHeight: 1.2, letterSpacing: "-0.02em",
                        }}>
                            What is an <span style={{ color: "#818cf8" }}>Affidavit</span>?
                        </h2>
                    </div>
                </Reveal>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
                    <Reveal delay={100}>
                        <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "28px 24px", height: "100%" }}>
                            <div style={{ width: 48, height: 48, background: "rgba(99,102,241,0.1)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                                <FileText size={24} color="#818cf8" />
                            </div>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Legal Declaration</h3>
                            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
                                An affidavit is a sworn written statement confirmed by oath or affirmation, used as evidence in court, government offices, and financial institutions. Under the Indian Evidence Act, 1872, affidavits hold legal weight when properly notarized.
                            </p>
                        </div>
                    </Reveal>
                    <Reveal delay={200}>
                        <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "28px 24px", height: "100%" }}>
                            <div style={{ width: 48, height: 48, background: "rgba(139,92,246,0.1)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                                <Shield size={24} color="#a78bfa" />
                            </div>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Legal Validity in India</h3>
                            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
                                Online affidavits are fully valid in India when prepared following the format prescribed by law. They are accepted by courts, banks, passport offices, educational institutions, and government authorities nationwide.
                            </p>
                        </div>
                    </Reveal>
                    <Reveal delay={300}>
                        <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "28px 24px", height: "100%" }}>
                            <div style={{ width: 48, height: 48, background: "rgba(74,222,128,0.1)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                                <Globe size={24} color="#4ade80" />
                            </div>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Common Use Cases</h3>
                            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
                                Name change after marriage, address proof for KYC, income declaration for loans, property disputes, lost document verification, educational certificate validation, and legal proceedings.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </div>
        </div>
    </section>
);

// ─────────────────────────────────────────────
// TYPES OF AFFIDAVITS
// ─────────────────────────────────────────────

const affidavitTypes = [
    { icon: <PenTool size={20} />, title: "Name Change Affidavit", desc: "Sworn statement for legal name change after marriage, divorce, or personal choice. Accepted by passport offices and government bodies.", time: "3 hrs", price: "₹1,199", rating: 4.8, popular: true },
    { icon: <Home size={20} />, title: "Address Proof Affidavit", desc: "Legal declaration for verifying your current residential address for KYC, banks, and government applications.", time: "2 hrs", price: "₹999", rating: 4.9 },
    { icon: <DollarSign size={20} />, title: "Income Proof Affidavit", desc: "Income declaration accepted for loans, visa applications, or government schemes. Legally binding and court-admissible.", time: "2 hrs", price: "₹999", rating: 4.7 },
    { icon: <Building2 size={20} />, title: "Property Affidavit", desc: "Declaration for property ownership, disputes, inheritance, or transfer matters. Essential for real estate transactions.", time: "4 hrs", price: "₹1,499", rating: 4.8 },
];

const TypesSection = () => (
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
                        <span style={{ fontSize: 11, color: "#818cf8", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Browse by Type</span>
                    </div>
                    <h2 style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(32px, 7vw, 56px)", fontWeight: 700, color: "#fff",
                        lineHeight: 1.15, letterSpacing: "-0.02em", margin: "0 0 12px", padding: "0 12px",
                    }}>
                        Types of <span style={{ color: "#818cf8" }}>Affidavits</span>
                    </h2>
                    <p style={{ fontSize: "clamp(14px, 3.5vw, 16px)", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif", maxWidth: 600, margin: "0 auto", padding: "0 16px" }}>
                        Choose from our most popular affidavit categories, each drafted for legal compliance
                    </p>
                </div>
            </Reveal>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
                gap: 24,
                padding: "0 4px"
            }}>
                {affidavitTypes.map((s, i) => (
                    <Reveal key={i} delay={i * 80}>
                        <div
                            style={{
                                position: "relative",
                                background: "rgba(255,255,255,0.03)",
                                border: s.popular ? "1px solid rgba(129,140,248,0.35)" : "1px solid rgba(255,255,255,0.07)",
                                borderRadius: 20, padding: "28px 24px 24px",
                                transition: "all 0.3s",
                                cursor: "default",
                            }}
                        >
                            {s.popular && (
                                <div style={{
                                    position: "absolute", top: -12, right: 20,
                                    background: "linear-gradient(135deg, #f59e0b, #ef4444)",
                                    borderRadius: 99, padding: "4px 12px",
                                    fontSize: 10, fontWeight: 700, color: "#fff",
                                    fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em",
                                }}>
                                    MOST POPULAR
                                </div>
                            )}
                            <div style={{
                                width: 48, height: 48,
                                background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)",
                                borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
                                color: "#818cf8", marginBottom: 20,
                            }}>
                                {s.icon}
                            </div>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(17px, 4vw, 18px)", fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>{s.title}</h3>
                            <p style={{ fontSize: "clamp(13px, 3.5vw, 14px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: "0 0 20px", fontFamily: "'DM Sans', sans-serif" }}>{s.desc}</p>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.07)", marginBottom: 20, flexWrap: "wrap", gap: 8 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                    <Clock size={14} color="rgba(255,255,255,0.3)" />
                                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif" }}>{s.time}</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                    <Star size={14} fill="#f59e0b" color="#f59e0b" />
                                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>{s.rating}</span>
                                </div>
                                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: "#818cf8" }}>{s.price}</span>
                            </div>
                            <button
                                onClick={() => openWhatsApp(`I need a ${s.title}. Please help me.`)}
                                style={{
                                    width: "100%", background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)",
                                    borderRadius: 12, padding: "12px", color: "#a5b4fc",
                                    fontSize: "clamp(13px, 3vw, 14px)", fontWeight: 600, cursor: "pointer",
                                    fontFamily: "'DM Sans', sans-serif",
                                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                                    transition: "background 0.2s",
                                }}
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
// HOW IT WORKS
// ─────────────────────────────────────────────

const ProcessSection = () => {
    const steps = [
        { n: "01", icon: <MessageCircle size={22} />, title: "Share Requirements", desc: "Tell us your needs via WhatsApp. Select type, share personal details and supporting documents.", time: "5–7 min", color: "#6366f1" },
        { n: "02", icon: <FileText size={22} />, title: "Expert Drafting", desc: "AI-powered generation combined with lawyer verification for full legal compliance.", time: "2–4 hours", color: "#8b5cf6" },
        { n: "03", icon: <Download size={22} />, title: "Review & Download", desc: "Review your document, request unlimited revisions, then download as PDF or DOCX.", time: "Instant", color: "#a78bfa" },
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
                            fontSize: "clamp(32px, 7vw, 56px)", fontWeight: 700, color: "#fff",
                            lineHeight: 1.15, letterSpacing: "-0.02em", padding: "0 12px",
                        }}>
                            Your Affidavit in{" "}
                            <span style={{ color: "#a78bfa" }}>3 Simple Steps</span>
                        </h2>
                        <p style={{ fontSize: "clamp(14px, 3.5vw, 16px)", color: "rgba(255,255,255,0.4)", maxWidth: 500, margin: "12px auto 0", fontFamily: "'DM Sans', sans-serif" }}>
                            No paperwork, no office visits — complete everything from your phone
                        </p>
                    </div>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 24, position: "relative" }}>
                    {steps.map((s, i) => (
                        <Reveal key={i} delay={i * 160}>
                            <div style={{
                                background: "rgba(255,255,255,0.025)",
                                border: "1px solid rgba(255,255,255,0.07)",
                                borderRadius: 24, padding: "32px 24px",
                                textAlign: "center",
                                transition: "all 0.3s",
                            }}>
                                <div style={{
                                    width: 64, height: 64, borderRadius: 20, margin: "0 auto 20px",
                                    background: `linear-gradient(135deg, ${s.color}22, ${s.color}10)`,
                                    border: `1px solid ${s.color}50`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    position: "relative",
                                }}>
                                    <span style={{ color: s.color }}>{s.icon}</span>
                                    <div style={{
                                        position: "absolute", top: -8, right: -8,
                                        width: 26, height: 26, borderRadius: "50%",
                                        background: s.color, display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: 11, fontWeight: 700, color: "#fff", fontFamily: "'DM Sans', sans-serif",
                                    }}>
                                        {i + 1}
                                    </div>
                                </div>
                                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(18px, 4vw, 20px)", fontWeight: 700, color: "#fff", margin: "0 0 10px" }}>{s.title}</h3>
                                <p style={{ fontSize: "clamp(13px, 3.5vw, 14px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.65, fontFamily: "'DM Sans', sans-serif", margin: "0 0 20px" }}>{s.desc}</p>
                                <div style={{
                                    display: "inline-flex", alignItems: "center", gap: 6,
                                    background: `${s.color}15`, border: `1px solid ${s.color}30`,
                                    borderRadius: 99, padding: "6px 16px",
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
        { name: "Essential", price: 999, desc: "For simple, straightforward affidavit needs", features: ["Standard affidavit drafting", "AI-powered generation", "Email support", "PDF download"], excluded: ["Expert lawyer review", "Notary guidance"], cta: "Get Essential" },
        { name: "Professional", price: 1999, desc: "Most comprehensive — our recommended plan", features: ["Everything in Essential", "Expert lawyer review", "Unlimited revisions", "24/7 priority support", "Notary guidance"], excluded: [], cta: "Get Professional", popular: true },
        { name: "Enterprise", price: 4999, desc: "For businesses and bulk requirements", features: ["Everything in Professional", "Bulk document processing", "Dedicated account manager", "Legal compliance certificate", "Custom templates"], excluded: [], cta: "Contact Sales" },
    ];

    return (
        <section id="pricing" style={{ padding: "clamp(48px, 10vw, 100px) 20px", background: "#0d0d1a" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
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
                            fontSize: "clamp(32px, 7vw, 56px)", fontWeight: 700, color: "#fff",
                            lineHeight: 1.15, letterSpacing: "-0.02em", padding: "0 12px",
                        }}>
                            Simple Plans,{" "}
                            <span style={{ color: "#4ade80" }}>No Hidden Fees</span>
                        </h2>
                        <p style={{ fontSize: "clamp(14px, 3.5vw, 16px)", color: "rgba(255,255,255,0.4)", marginTop: 12, fontFamily: "'DM Sans', sans-serif" }}>
                            One-time payment, lifetime access to your document
                        </p>
                    </div>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 24, alignItems: "start" }}>
                    {tiers.map((t, i) => (
                        <Reveal key={i} delay={i * 120}>
                            <div style={{
                                background: t.popular ? "rgba(99,102,241,0.06)" : "rgba(255,255,255,0.025)",
                                border: t.popular ? "1px solid rgba(99,102,241,0.4)" : "1px solid rgba(255,255,255,0.07)",
                                borderRadius: 24, padding: "32px 24px",
                                position: "relative",
                                transform: t.popular ? "scale(1.02)" : "none",
                                transition: "all 0.3s",
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
                                    <span style={{ fontSize: 14, fontWeight: 700, color: t.popular ? "#818cf8" : "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em", textTransform: "uppercase" }}>{t.name}</span>
                                </div>
                                <div style={{ margin: "12px 0 6px" }}>
                                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(48px, 8vw, 56px)", fontWeight: 700, color: "#fff", lineHeight: 1 }}>₹{t.price.toLocaleString()}</span>
                                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif", marginLeft: 6 }}>/ one-time</span>
                                </div>
                                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif", marginBottom: 28, lineHeight: 1.5 }}>{t.desc}</p>

                                <button
                                    onClick={() => openWhatsApp(`I'm interested in the ${t.name} plan at ₹${t.price}. Please tell me more.`)}
                                    style={{
                                        width: "100%",
                                        background: t.popular ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "rgba(255,255,255,0.08)",
                                        border: t.popular ? "none" : "1px solid rgba(255,255,255,0.12)",
                                        borderRadius: 14, padding: "14px",
                                        color: "#fff", fontSize: "clamp(13px, 3.5vw, 14px)", fontWeight: 600, cursor: "pointer",
                                        fontFamily: "'DM Sans', sans-serif",
                                        boxShadow: t.popular ? "0 8px 24px rgba(99,102,241,0.3)" : "none",
                                        marginBottom: 24,
                                    }}
                                >
                                    {t.cta} on WhatsApp
                                </button>

                                <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                                    {t.features.map((f, j) => (
                                        <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                                            <CheckCircle size={14} color="#4ade80" style={{ flexShrink: 0, marginTop: 2 }} />
                                            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif" }}>{f}</span>
                                        </div>
                                    ))}
                                    {t.excluded.map((f, j) => (
                                        <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                                            <X size={14} color="rgba(255,255,255,0.25)" style={{ flexShrink: 0, marginTop: 2 }} />
                                            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", fontFamily: "'DM Sans', sans-serif" }}>{f}</span>
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
// LEGAL VALIDITY SECTION (VERY IMPORTANT)
// ─────────────────────────────────────────────

const LegalValiditySection = () => (
    <section style={{ padding: "clamp(48px, 10vw, 100px) 20px", background: "#080812" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
                <div style={{ textAlign: "center", marginBottom: "clamp(40px, 8vw, 56px)" }}>
                    <div style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.2)",
                        borderRadius: 99, padding: "4px 14px", marginBottom: 16,
                    }}>
                        <Shield size={12} color="#22d3ee" />
                        <span style={{ fontSize: 11, color: "#22d3ee", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Legal Assurance</span>
                    </div>
                    <h2 style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(32px, 7vw, 56px)", fontWeight: 700, color: "#fff",
                        lineHeight: 1.2, letterSpacing: "-0.02em", padding: "0 12px",
                    }}>
                        Is an Online Affidavit{" "}
                        <span style={{ color: "#22d3ee" }}>Legally Valid</span> in India?
                    </h2>
                </div>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28 }}>
                <Reveal delay={100}>
                    <div style={{ background: "rgba(255,255,255,0.025)", borderRadius: 20, padding: "28px", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <div style={{ width: 44, height: 44, background: "rgba(34,211,238,0.1)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                            <CheckCircle size={22} color="#22d3ee" />
                        </div>
                        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Legally Recognized</h3>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
                            Yes, online affidavits are fully valid in India when prepared in the proper format. The Indian Evidence Act, 1872, recognizes affidavits as admissible evidence. Our documents strictly follow the prescribed legal structure and are reviewed by experienced lawyers.
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={200}>
                    <div style={{ background: "rgba(255,255,255,0.025)", borderRadius: 20, padding: "28px", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <div style={{ width: 44, height: 44, background: "rgba(245,158,11,0.1)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                            <Gavel size={22} color="#f59e0b" />
                        </div>
                        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Role of Notary & Stamp Paper</h3>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
                            For most purposes, an affidavit requires notarization. We provide complete guidance — including recommended notary offices near you and exactly what documents to carry. Some government portals accept e-stamped affidavits without physical notarization.
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={300}>
                    <div style={{ background: "rgba(255,255,255,0.025)", borderRadius: 20, padding: "28px", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <div style={{ width: 44, height: 44, background: "rgba(74,222,128,0.1)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                            <Building2 size={22} color="#4ade80" />
                        </div>
                        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Where It's Accepted</h3>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
                            Courts, banks, passport offices, educational institutions, government departments, visa applications, property registrations, and all legal proceedings across India accept properly notarized affidavits.
                        </p>
                    </div>
                </Reveal>
            </div>
        </div>
    </section>
);

// ─────────────────────────────────────────────
// TRUST & TESTIMONIALS
// ─────────────────────────────────────────────

const TestimonialsSection = () => {
    const testimonials = [
        { initials: "SA", name: "Swapnil Anand", role: "Property Owner", content: "Took notary service for name change in property documents. The entire process was smooth — got my registered affidavit within 24 hours. Saved me 3 trips to the notary office!", service: "Name Change", rating: 5, verified: true },
        { initials: "JK", name: "Jay Kumar", role: "Homeowner", content: "Needed an affidavit for electricity connection at my new house. NyayMitra delivered within 2 hours. Accepted by the electricity department without any issues whatsoever.", service: "Address Proof", rating: 5, verified: true },
        { initials: "RS", name: "Ramesh Sharma", role: "Business Owner", content: "The affidavit was perfect and legally sound. Saved me from multiple visits to the notary. Highly recommended for anyone needing quick, professional legal documentation.", service: "Income Proof", rating: 5, verified: true },
    ];

    return (
        <section style={{ padding: "clamp(48px, 10vw, 100px) 20px", background: "#0d0d1a" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: "clamp(40px, 8vw, 56px)" }}>
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: 6,
                            background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)",
                            borderRadius: 99, padding: "4px 14px", marginBottom: 16,
                        }}>
                            <Star size={12} color="#f59e0b" />
                            <span style={{ fontSize: 11, color: "#f59e0b", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Trust & Social Proof</span>
                        </div>
                        <h2 style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(32px, 7vw, 56px)", fontWeight: 700, color: "#fff",
                            lineHeight: 1.15, letterSpacing: "-0.02em", padding: "0 12px",
                        }}>
                            Trusted by{" "}
                            <span style={{ color: "#fbbf24" }}>500+ Indians</span>
                        </h2>
                        <p style={{ fontSize: "clamp(14px, 3.5vw, 16px)", color: "rgba(255,255,255,0.4)", marginTop: 12, fontFamily: "'DM Sans', sans-serif" }}>
                            Rated 4.9/5 based on 150+ verified reviews
                        </p>
                    </div>
                </Reveal>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: 24 }}>
                    {testimonials.map((item, i) => (
                        <Reveal key={i} delay={i * 130}>
                            <div style={{
                                background: "rgba(255,255,255,0.025)",
                                border: "1px solid rgba(255,255,255,0.07)",
                                borderRadius: 20, padding: "28px",
                                display: "flex", flexDirection: "column", height: "100%",
                            }}>
                                <div style={{ marginBottom: 14 }}>
                                    <span style={{
                                        display: "inline-block", background: "rgba(99,102,241,0.12)",
                                        border: "1px solid rgba(99,102,241,0.25)", borderRadius: 99,
                                        padding: "4px 12px", fontSize: 10, fontWeight: 600,
                                        color: "#818cf8", fontFamily: "'DM Sans', sans-serif",
                                        letterSpacing: "0.04em", textTransform: "uppercase",
                                    }}>
                                        {item.service}
                                    </span>
                                </div>
                                <div style={{ display: "flex", gap: 4, marginBottom: 18 }}>
                                    {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="#f59e0b" color="#f59e0b" />)}
                                </div>
                                <p style={{
                                    fontSize: "clamp(14px, 3.5vw, 15px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.7,
                                    fontFamily: "'DM Sans', sans-serif", flexGrow: 1, margin: "0 0 24px",
                                    fontStyle: "italic",
                                }}>
                                    "{item.content}"
                                </p>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 18, borderTop: "1px solid rgba(255,255,255,0.07)", flexWrap: "wrap", gap: 12 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                        <div style={{
                                            width: 44, height: 44, borderRadius: "50%",
                                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff",
                                        }}>
                                            {item.initials}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>{item.name}</div>
                                            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif" }}>{item.role}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                        <BadgeCheck size={14} color="#4ade80" />
                                        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif" }}>Verified Client</span>
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
// FAQ SECTION (CRITICAL FOR SEO)
// ─────────────────────────────────────────────

const FAQSection = () => {
    const [open, setOpen] = useState<number | null>(0);
    const faqs = [
        { q: "Is an online affidavit legally valid in India?", a: "Yes. Online affidavits are fully valid in India when properly notarized. Our documents strictly follow the format prescribed by the Indian Evidence Act, 1872, and are accepted by courts, banks, and government offices nationwide. We also provide expert lawyer review to ensure complete legal compliance." },
        { q: "Do I need to visit a notary after receiving my affidavit?", a: "For most purposes, a notarized affidavit is required. We provide complete notary guidance including recommended notary offices near you and exactly what to carry. Some government portals also accept e-stamped affidavits without physical notarization. Our support team will help you understand what applies to your specific case." },
        { q: "How long does it take to receive my affidavit?", a: "Most standard affidavits are delivered within 2–4 hours. Complex or multi-page documents may take up to 24 hours. We'll keep you updated via WhatsApp throughout the process. Express delivery options are also available for urgent requirements." },
        { q: "What documents are required to create an affidavit?", a: "Typically, you'll need identity proof (Aadhaar, PAN, Voter ID, or Passport), address proof, and any supporting documents related to your affidavit type. Our team will guide you on WhatsApp — usually you just need to share clear photos of these documents." },
        { q: "Can I use an affidavit for passport or visa applications?", a: "Absolutely. Many passport and visa applications require affidavits for name change, address proof, or relationship verification. Our affidavits are formatted to meet the requirements of the Passport Seva Kendra and various embassies." },
        { q: "What if I need changes after receiving the draft?", a: "We offer unlimited free revisions until you are 100% satisfied with the final document. Simply share your feedback on WhatsApp and we'll update it promptly. No hidden charges, no questions asked." },
        { q: "Is my personal information kept secure?", a: "Your data is protected with 256-bit SSL encryption — the same standard used by banks. All documents are permanently deleted from our servers after 30 days. We never share your information with third parties. Our platform is fully GDPR and Indian data protection compliant." },
        { q: "What's the difference between an affidavit and a notarized affidavit?", a: "An affidavit is a written sworn statement. A notarized affidavit is one where a notary public has verified the identity of the signer and witnessed the signing. Most legal purposes require notarization. We provide guidance for both scenarios." },
    ];

    // Generate FAQ Schema
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.a
            }
        }))
    };

    return (
        <section id="faqs" style={{ padding: "clamp(48px, 10vw, 100px) 20px", background: "#080812" }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
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
                            fontSize: "clamp(32px, 7vw, 56px)", fontWeight: 700, color: "#fff",
                            lineHeight: 1.15, letterSpacing: "-0.02em", padding: "0 12px",
                        }}>
                            Common <span style={{ color: "#22d3ee" }}>Questions</span>
                        </h2>
                        <p style={{ fontSize: "clamp(14px, 3.5vw, 16px)", color: "rgba(255,255,255,0.4)", marginTop: 12, fontFamily: "'DM Sans', sans-serif" }}>
                            Everything you need to know about online affidavits
                        </p>
                    </div>
                </Reveal>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {faqs.map((f, i) => (
                        <Reveal key={i} delay={Math.min(i * 60, 300)}>
                            <div style={{
                                background: open === i ? "rgba(34,211,238,0.04)" : "rgba(255,255,255,0.025)",
                                border: open === i ? "1px solid rgba(34,211,238,0.25)" : "1px solid rgba(255,255,255,0.07)",
                                borderRadius: 16, overflow: "hidden",
                                transition: "all 0.2s",
                            }}>
                                <button
                                    onClick={() => setOpen(open === i ? null : i)}
                                    style={{
                                        width: "100%", textAlign: "left", padding: "18px 22px",
                                        background: "none", border: "none", cursor: "pointer",
                                        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
                                    }}
                                >
                                    <span style={{ fontSize: "clamp(14px, 3.8vw, 16px)", fontWeight: 600, color: "#fff", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.45, paddingRight: 8 }}>{f.q}</span>
                                    <ChevronDown
                                        size={18}
                                        color="rgba(255,255,255,0.4)"
                                        style={{ flexShrink: 0, transition: "transform 0.3s", transform: open === i ? "rotate(180deg)" : "none" }}
                                    />
                                </button>
                                {open === i && (
                                    <div style={{ padding: "0 22px 20px 22px" }}>
                                        <p style={{ fontSize: "clamp(13px, 3.5vw, 14px)", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>{f.a}</p>
                                    </div>
                                )}
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={400}>
                    <div style={{ textAlign: "center", marginTop: 48 }}>
                        <button
                            onClick={() => openWhatsApp("I have a question about affidavits at NyayMitra.")}
                            style={{
                                background: "none", border: "1px solid rgba(34,211,238,0.35)", borderRadius: 14,
                                padding: "12px 32px", color: "#22d3ee", fontSize: "clamp(13px, 3.5vw, 14px)", fontWeight: 600,
                                cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                                display: "inline-flex", alignItems: "center", gap: 8,
                                transition: "all 0.2s",
                            }}
                        >
                            <MessageCircle size={15} /> Still have questions? Ask on WhatsApp
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
        padding: "clamp(60px, 12vw, 100px) 20px",
        position: "relative", overflow: "hidden",
        background: "linear-gradient(160deg, #0a0a12, #0f0b1e)",
    }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative" }}>
            <Reveal>
                <div style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 99, padding: "6px 18px", marginBottom: 28,
                }}>
                    <Sparkles size={14} color="#fbbf24" />
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Ready to Get Started?</span>
                </div>
                <h2 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(36px, 8vw, 72px)", fontWeight: 700, color: "#fff",
                    lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 20px",
                    padding: "0 12px",
                }}>
                    Create Your Affidavit
                    <br />
                    <span style={{ color: "#818cf8" }}>in Minutes</span>
                </h2>
                <p style={{ fontSize: "clamp(15px, 4vw, 18px)", color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif", marginBottom: 40, lineHeight: 1.6, padding: "0 16px" }}>
                    Join 500+ satisfied customers who trust NyayMitra for fast, legally valid documentation.
                    Start your affidavit right now on WhatsApp.
                </p>

                <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginBottom: 32, padding: "0 8px" }}>
                    <button
                        onClick={() => openWhatsApp("I want to create an affidavit right now. Starting at ₹999.")}
                        style={{
                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            border: "none", borderRadius: 16,
                            padding: "14px 32px", color: "#fff",
                            fontSize: "clamp(14px, 3.5vw, 16px)", fontWeight: 700, cursor: "pointer",
                            fontFamily: "'DM Sans', sans-serif",
                            boxShadow: "0 12px 40px rgba(99,102,241,0.4)",
                            display: "flex", alignItems: "center", gap: 10,
                        }}
                    >
                        <MessageCircle size={18} />
                        Start Now on WhatsApp — ₹999
                    </button>
                    <button
                        onClick={() => openWhatsApp("Can I request a callback from NyayMitra?")}
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.15)", borderRadius: 16,
                            padding: "14px 32px", color: "rgba(255,255,255,0.85)",
                            fontSize: "clamp(14px, 3.5vw, 16px)", fontWeight: 600, cursor: "pointer",
                            fontFamily: "'DM Sans', sans-serif",
                            display: "flex", alignItems: "center", gap: 10,
                        }}
                    >
                        <Phone size={18} />
                        Request Callback
                    </button>
                </div>

                <div style={{ display: "flex", gap: "clamp(16px, 4vw, 28px)", flexWrap: "wrap", justifyContent: "center", padding: "0 12px" }}>
                    {["Free Expert Consultation", "30-Day Money-Back Guarantee", "100% Legally Valid"].map((item, i) => (
                        <span key={i} style={{ fontSize: "clamp(12px, 3vw, 13px)", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 6 }}>
                            <CheckCircle size={14} color="rgba(74,222,128,0.7)" /> {item}
                        </span>
                    ))}
                </div>
            </Reveal>
        </div>
    </section>
);

// ─────────────────────────────────────────────
// INTERNAL SEO LINKING
// ─────────────────────────────────────────────

const InternalLinks = () => (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "20px", textAlign: "center" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20 }}>
            <a href="#" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Legal Notice</a>
            <a href="#" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Lawyer Consultation</a>
            <a href="#" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Privacy Policy</a>
            <a href="#" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Terms of Service</a>
            <a href="#" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Refund Policy</a>
        </div>
    </div>
);

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────

const Footer = () => {
    const year = new Date().getFullYear();
    const [open, setOpen] = useState<string | null>(null);
    const toggle = (col: string) => setOpen(open === col ? null : col);

    const cols = [
        { key: "company", title: "Company", links: [{ l: "About NyayMitra", h: "#" }, { l: "Legal Blog", h: "#" }, { l: "Contact Us", h: "#" }] },
        { key: "services", title: "Services", links: [{ l: "Affidavit Online", h: "#" }, { l: "Name Change Affidavit", h: "#" }, { l: "Address Proof Affidavit", h: "#" }, { l: "Property Affidavit", h: "#" }] },
        { key: "legal", title: "Legal", links: [{ l: "Privacy Policy", h: "#" }, { l: "Terms of Service", h: "#" }, { l: "Refund Policy", h: "#" }, { l: "GDPR Compliance", h: "#" }] },
    ];

    return (
        <footer style={{ background: "#05050e", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 20px 32px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 48, marginBottom: 48 }}>
                    <div style={{ minWidth: 200, flex: "1 1 220px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                            <div style={{
                                width: 34, height: 34, background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                                borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                                <Scale size={16} color="#fff" />
                            </div>
                            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 20, color: "#fff" }}>
                                Nyay<span style={{ color: "#818cf8" }}>Mitra</span>
                            </span>
                        </div>
                        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6, maxWidth: 240, margin: "0 0 20px" }}>
                            Legally valid affidavits online in minutes. Expert reviewed, court approved, trusted by Indians across the country.
                        </p>
                        <div style={{ display: "flex", gap: 12 }}>
                            {[
                                { label: "WhatsApp", href: "https://wa.me/919661644025", icon: <MessageCircle size={15} /> },
                                { label: "Email", href: "mailto:support@nyaymitra.com", icon: <Mail size={15} /> },
                                { label: "Call", href: "tel:+919661644025", icon: <Phone size={15} /> },
                            ].map((s, i) => (
                                <a key={i} href={s.href} target={i === 0 ? "_blank" : undefined} rel="noopener noreferrer"
                                    style={{
                                        width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.05)",
                                        border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center",
                                        justifyContent: "center", color: "rgba(255,255,255,0.5)", transition: "all 0.2s",
                                    }}
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 32, flex: "2" }}>
                        {cols.map(col => (
                            <div key={col.key}>
                                <div
                                    onClick={() => toggle(col.key)}
                                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", marginBottom: 16 }}
                                >
                                    <span style={{ fontSize: 13, fontWeight: 700, color: "#fff", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.04em", textTransform: "uppercase" }}>{col.title}</span>
                                    <ChevronDown size={13} color="rgba(255,255,255,0.3)" style={{ transition: "transform 0.3s", transform: open === col.key ? "rotate(180deg)" : "none" }} />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                    {col.links.map((l, i) => (
                                        <a key={i} href={l.h} style={{
                                            fontSize: 13, color: "rgba(255,255,255,0.4)",
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

                <div style={{ paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", fontFamily: "'DM Sans', sans-serif" }}>© {year} NyayMitra. All rights reserved.</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", fontFamily: "'DM Sans', sans-serif" }}>Made with care in India 🇮🇳</span>
                </div>
            </div>
        </footer>
    );
};

// ─────────────────────────────────────────────
// STICKY CTA
// ─────────────────────────────────────────────

const StickyAction = () => {
    const scrolled = useScrolled(500);
    if (!scrolled) return null;
    return (
        <div style={{
            position: "fixed", bottom: 20, right: 20, zIndex: 200,
            display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end",
            animation: "fadeInUp 0.4s ease",
        }}>
            <button
                onClick={() => openWhatsApp("I need to create an affidavit.")}
                style={{
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    border: "none", borderRadius: 99,
                    padding: "12px 24px", color: "#fff",
                    fontSize: "clamp(12px, 3.5vw, 14px)", fontWeight: 700, cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    boxShadow: "0 8px 28px rgba(99,102,241,0.5)",
                    display: "flex", alignItems: "center", gap: 10,
                }}
            >
                <Sparkles size={16} /> Create Affidavit
            </button>
            <button
                onClick={() => openWhatsApp("I have a question about NyayMitra.")}
                style={{
                    background: "rgba(10,10,18,0.96)", backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.15)", borderRadius: 99,
                    padding: "10px 20px", color: "rgba(255,255,255,0.75)",
                    fontSize: "clamp(11px, 3vw, 13px)", fontWeight: 600, cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    display: "flex", alignItems: "center", gap: 8,
                }}
            >
                <MessageCircle size={14} /> Need Help?
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
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: #0a0a12; }
    ::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.5); border-radius: 99px; }
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

export default function NyayMitraLandingPage() {
    return (
        <>
            <GlobalStyles />
            <main style={{ minHeight: "100vh", background: "#0a0a12", overflowX: "hidden", width: "100%" }}>
                <Header />
                <Hero />
                <WhatIsAffidavit />
                <TypesSection />
                <ProcessSection />
                <PricingSection />
                <LegalValiditySection />
                <TestimonialsSection />
                <FAQSection />
                <FinalCTA />
                <InternalLinks />
                <StickyAction />
                <Footer />
            </main>
        </>
    );
}