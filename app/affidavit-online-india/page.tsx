"use client";

import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────
// ICON COMPONENTS (inline SVGs — no lucide bundle needed)
// ─────────────────────────────────────────────

const Icon = ({ d, size = 18, color = "currentColor", ...rest }: { d: string | string[]; size?: number; color?: string; style?: React.CSSProperties }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...rest}>
        {(Array.isArray(d) ? d : [d]).map((p, i) => <path key={i} d={p} />)}
    </svg>
);

// Icon paths
const Icons = {
    scale: ["M12 3v1M3 7h18M5 7l2 12h10l2-12M9 7V4h6v3", "M12 12h.01"],
    msg: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
    file: ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", "M14 2v6h6", "M16 13H8", "M16 17H8", "M10 9H8"],
    shield: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"],
    zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    check: "M20 6 9 17l-5-5",
    circle_check: ["M22 11.08V12a10 10 0 1 1-5.93-9.14", "M22 4 12 14.01l-3-3"],
    arrow: "M5 12h14M12 5l7 7-7 7",
    gavel: ["M14.5 17.5 3 6l2.5-2.5 12 11.5", "M7.5 8.5l2-2", "M3 3l18 18"],
    star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    sparkles: ["M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"],
    building: ["M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z", "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2", "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2", "M10 6h4", "M10 10h4", "M10 14h4", "M10 18h4"],
    badge: ["M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z", "m9 12 2 2 4-4"],
    clock: ["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z", "M12 6v6l4 2"],
    download: ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M7 10l5 5 5-5", "M12 15V3"],
    phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 17z",
    mail: ["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z", "M22 6l-10 7L2 6"],
    menu: ["M3 12h18", "M3 6h18", "M3 18h18"],
    x: "M18 6 6 18M6 6l12 12",
    chevdown: "M6 9l6 6 6-6",
    lock: ["M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z", "M7 11V7a5 5 0 0 1 10 0v4"],
    pen: ["M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"],
    home: ["M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "M9 22V12h6v10"],
    dollar: ["M12 1v22", "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"],
    globe: ["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z", "M2 12h20", "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"],
    help: ["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z", "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", "M12 17h.01"],
    rocket: ["M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z", "M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z", "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0", "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"],
    send: ["M22 2 11 13", "M22 2 15 22 11 13 2 9l20-7z"],
    user: ["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2", "M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"],
    printer: ["M6 9V2h12v7", "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2", "M6 14h12v8H6z"],
};

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

const useInView = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        if (!ref.current) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { setInView(true); obs.disconnect(); }
        }, { threshold: 0.1 });
        obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return { ref, inView };
};

const Reveal = ({ children, delay = 0, className = "", style: extraStyle = {} }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) => {
    const { ref, inView } = useInView();
    return (
        <div ref={ref} className={className} style={{
            transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(24px)",
            ...extraStyle,
        }}>
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
        { label: "Get Quote", href: "#get-started" },
        { label: "Pricing", href: "#pricing" },
        { label: "FAQs", href: "#faqs" },
    ];

    const go = (href: string) => {
        setOpen(false);
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <header style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
            transition: "background 0.3s, border-color 0.3s",
            background: scrolled ? "rgba(10,10,18,0.94)" : "transparent",
            backdropFilter: scrolled ? "blur(16px)" : "none",
            borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68, gap: 12 }}>
                <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", flexShrink: 0 }}>
                    <div style={{ width: 32, height: 32, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon d={Icons.scale} size={16} color="#fff" />
                    </div>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 21, color: "#fff" }}>
                        Nyay<span style={{ color: "#818cf8" }}>Mitra</span>
                    </span>
                </div>

                <nav style={{ display: "flex", gap: 28 }} className="hide-mobile">
                    {links.map(l => (
                        <button key={l.label} onClick={() => go(l.href)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.6)", fontSize: 13.5, fontWeight: 500, letterSpacing: "0.01em", transition: "color 0.2s", fontFamily: "'DM Sans', sans-serif" }}
                            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}>
                            {l.label}
                        </button>
                    ))}
                </nav>

                <div style={{ display: "flex", gap: 10 }} className="hide-mobile">
                    <button onClick={() => go("#get-started")} style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none", borderRadius: 9, padding: "8px 18px", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                        Get Started →
                    </button>
                </div>

                <button onClick={() => setOpen(!open)} className="show-mobile" style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", padding: 4 }}>
                    <Icon d={open ? Icons.x : Icons.menu} size={22} />
                </button>
            </div>

            {open && (
                <div style={{ background: "rgba(10,10,18,0.98)", backdropFilter: "blur(16px)", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "16px 24px 24px" }}>
                    {links.map(l => (
                        <button key={l.label} onClick={() => go(l.href)} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.7)", fontSize: 16, fontWeight: 500, padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", fontFamily: "'DM Sans', sans-serif" }}>
                            {l.label}
                        </button>
                    ))}
                    <button onClick={() => { setOpen(false); document.querySelector("#get-started")?.scrollIntoView({ behavior: "smooth" }); }} style={{ width: "100%", marginTop: 18, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none", borderRadius: 10, padding: "13px", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                        Get Free Quote
                    </button>
                </div>
            )}
        </header>
    );
};

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────

const Hero = () => (
    <section id="home" style={{ minHeight: "100vh", position: "relative", overflow: "hidden", background: "linear-gradient(160deg, #0a0a12 0%, #0d0d1e 60%, #080814 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: 80, paddingBottom: 80, paddingLeft: 20, paddingRight: 20 }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <div style={{ position: "absolute", top: "8%", left: "10%", width: "clamp(300px, 50vw, 520px)", height: "clamp(300px, 50vw, 520px)", background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)", borderRadius: "50%" }} />
            <div style={{ position: "absolute", bottom: "5%", right: "8%", width: "clamp(280px, 45vw, 480px)", height: "clamp(280px, 45vw, 480px)", background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)", borderRadius: "50%" }} />
        </div>

        <Reveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "center", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 99, padding: "6px 16px", marginBottom: 24, backdropFilter: "blur(8px)" }}>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", fontFamily: "'DM Sans', sans-serif" }}>
                    Trusted by <strong style={{ color: "#a5b4fc" }}>500+</strong> Indians · Rated <strong style={{ color: "#fbbf24" }}>4.9★</strong>
                </span>
            </div>
        </Reveal>

        <Reveal delay={80}>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 8vw, 82px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", textAlign: "center", color: "#fff", maxWidth: 980, margin: "0 auto 16px", padding: "0 8px" }}>
                Create Affidavit Online in India<br />
                <span style={{ background: "linear-gradient(90deg, #818cf8, #c4b5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Legally Valid & Fast</span>
            </h1>
        </Reveal>

        <Reveal delay={160}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(15px, 3.5vw, 18px)", color: "rgba(255,255,255,0.45)", lineHeight: 1.65, textAlign: "center", maxWidth: 580, margin: "0 auto 36px", padding: "0 12px" }}>
                Lawyer-drafted, expert-reviewed, delivered in 2–4 hours. No court trips, no confusion — just peace of mind. Starting at ₹999.
            </p>
        </Reveal>

        <Reveal delay={220}>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginBottom: 48 }}>
                <button onClick={() => document.querySelector("#get-started")?.scrollIntoView({ behavior: "smooth" })} style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none", borderRadius: 12, padding: "13px 26px", color: "#fff", fontSize: "clamp(14px, 3.5vw, 15px)", fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 8px 28px rgba(99,102,241,0.4)", display: "flex", alignItems: "center", gap: 8 }}>
                    <Icon d={Icons.file} size={16} color="#fff" /> Create Affidavit Now
                </button>
                <button onClick={() => openWhatsApp("Can you explain how NyayMitra works?")} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "13px 26px", color: "rgba(255,255,255,0.8)", fontSize: "clamp(14px, 3.5vw, 15px)", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 8 }}>
                    <Icon d={Icons.phone} size={16} /> Talk to Expert
                </button>
            </div>
        </Reveal>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", backdropFilter: "blur(8px)", padding: "14px 20px" }}>
            <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "center", gap: "clamp(24px, 6vw, 72px)", flexWrap: "wrap" }}>
                {[{ v: "60+", l: "Verified Lawyers" }, { v: "500+", l: "Happy Clients" }, { v: "< 2 min", l: "Response Time" }, { v: "4.9 ★", l: "Client Rating" }].map((s, i) => (
                    <div key={i} style={{ textAlign: "center" }}>
                        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 4vw, 24px)", fontWeight: 700, color: "#fff" }}>{s.v}</div>
                        <div style={{ fontSize: "clamp(10px, 2vw, 11px)", color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.04em", textTransform: "uppercase", marginTop: 3 }}>{s.l}</div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// ─────────────────────────────────────────────
// WHAT IS AN AFFIDAVIT
// ─────────────────────────────────────────────

const WhatIsAffidavit = () => (
    <section style={{ padding: "clamp(48px, 10vw, 96px) 20px", background: "#080812" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Reveal>
                <div style={{ textAlign: "center", marginBottom: "clamp(36px, 7vw, 56px)" }}>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(30px, 7vw, 52px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
                        What is an <span style={{ color: "#818cf8" }}>Affidavit</span>?
                    </h2>
                </div>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, alignItems: "stretch" }}>
                {[
                    { icon: Icons.file, color: "#6366f1", title: "Legal Declaration", desc: "A sworn written statement confirmed by oath, used as evidence in courts, government offices, and financial institutions. Recognized under the Indian Evidence Act, 1872." },
                    { icon: Icons.shield, color: "#a78bfa", title: "Valid Across India", desc: "Accepted by courts, banks, passport offices, educational institutions, and government authorities nationwide when prepared in the correct legal format." },
                    { icon: Icons.globe, color: "#4ade80", title: "Common Use Cases", desc: "Name change, address proof for KYC, income declaration, property disputes, lost document verification, educational certificate validation, and legal proceedings." },
                ].map((card, i) => (
                    <Reveal key={i} delay={i * 100} style={{ height: "100%" }}>
                        <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, padding: "26px 22px", height: "100%", display: "flex", flexDirection: "column" }}>
                            <div style={{ width: 44, height: 44, flexShrink: 0, background: `${card.color}18`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                                <Icon d={card.icon} size={22} color={card.color} />
                            </div>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 10 }}>{card.title}</h3>
                            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif", flexGrow: 1 }}>{card.desc}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);

// ─────────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────────

const TypesSection = () => {
    const services = [
        { icon: Icons.pen, title: "Name Change Affidavit", desc: "After marriage, divorce, or personal choice. Accepted by passport offices and government bodies.", time: "3 hrs", price: "₹1,199", popular: true },
        { icon: Icons.home, title: "Address Proof Affidavit", desc: "Verify your current residential address for KYC, banks, and government applications.", time: "2 hrs", price: "₹999" },
        { icon: Icons.dollar, title: "Income Proof Affidavit", desc: "Income declaration for loans, visa applications, or government schemes. Court-admissible.", time: "2 hrs", price: "₹999" },
        { icon: Icons.building, title: "Property Affidavit", desc: "Ownership, disputes, inheritance, or transfer matters. Essential for real estate transactions.", time: "4 hrs", price: "₹1,499" },
        { icon: Icons.user, title: "Relationship Affidavit", desc: "Declaration of relationship between individuals — for nominees, insurance, bank accounts, and visa dependents.", time: "2 hrs", price: "₹999" },
        { icon: Icons.file, title: "Lost Document Affidavit", desc: "Declaration for lost Aadhaar, PAN, passport, marksheet, or any government-issued document. Accepted by all authorities.", time: "2 hrs", price: "₹899" },
    ];

    return (
        <section id="services" style={{ padding: "clamp(48px, 10vw, 96px) 20px", background: "#0d0d1a" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: "clamp(36px, 7vw, 56px)" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 99, padding: "4px 14px", marginBottom: 14 }}>
                            <Icon d={Icons.sparkles} size={12} color="#818cf8" />
                            <span style={{ fontSize: 11, color: "#818cf8", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Browse by Type</span>
                        </div>
                        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(30px, 7vw, 52px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
                            Types of <span style={{ color: "#818cf8" }}>Affidavits</span>
                        </h2>
                    </div>
                </Reveal>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: 22, alignItems: "stretch" }}>
                    {services.map((s, i) => (
                        <Reveal key={i} delay={i * 60} style={{ height: "100%" }}>
                            <div style={{ position: "relative", background: "rgba(255,255,255,0.03)", border: s.popular ? "1px solid rgba(129,140,248,0.35)" : "1px solid rgba(255,255,255,0.07)", borderRadius: 18, padding: "26px 22px 22px", height: "100%", display: "flex", flexDirection: "column" }}>
                                {s.popular && (
                                    <div style={{ position: "absolute", top: -11, right: 18, background: "linear-gradient(135deg, #f59e0b, #ef4444)", borderRadius: 99, padding: "3px 10px", fontSize: 9, fontWeight: 700, color: "#fff", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em" }}>MOST POPULAR</div>
                                )}
                                <div style={{ width: 44, height: 44, flexShrink: 0, background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                                    <Icon d={s.icon} size={20} color="#818cf8" />
                                </div>
                                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>{s.title}</h3>
                                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: "0 0 18px", fontFamily: "'DM Sans', sans-serif", flexGrow: 1 }}>{s.desc}</p>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.07)", marginBottom: 18, flexWrap: "wrap", gap: 8, flexShrink: 0 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                        <Icon d={Icons.clock} size={13} color="rgba(255,255,255,0.3)" />
                                        <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif" }}>{s.time}</span>
                                    </div>
                                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: "#818cf8" }}>{s.price}</span>
                                </div>
                                <button onClick={() => document.querySelector("#get-started")?.scrollIntoView({ behavior: "smooth" })} style={{ width: "100%", background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 10, padding: "11px", color: "#a5b4fc", fontSize: 13.5, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, flexShrink: 0 }}>
                                    Get Quote <Icon d={Icons.arrow} size={14} color="#a5b4fc" />
                                </button>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ─────────────────────────────────────────────
// HOW IT WORKS
// ─────────────────────────────────────────────

const ProcessSection = () => {
    const steps = [
        { icon: Icons.file, title: "Share Requirements", desc: "Fill our quick form or chat on WhatsApp. Share your affidavit type and supporting documents.", time: "5 min", color: "#6366f1" },
        { icon: Icons.shield, title: "Expert Drafting", desc: "AI-powered generation combined with lawyer verification ensures full legal compliance.", time: "2–4 hours", color: "#8b5cf6" },
        { icon: Icons.download, title: "Review & Download", desc: "Review your document, request unlimited revisions, then download as PDF or DOCX.", time: "Instant", color: "#a78bfa" },
    ];

    return (
        <section id="process" style={{ padding: "clamp(48px, 10vw, 96px) 20px", background: "#080812" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: "clamp(36px, 7vw, 56px)" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 99, padding: "4px 14px", marginBottom: 14 }}>
                            <Icon d={Icons.rocket} size={12} color="#a78bfa" />
                            <span style={{ fontSize: 11, color: "#a78bfa", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Simple Process</span>
                        </div>
                        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(30px, 7vw, 52px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
                            Your Affidavit in <span style={{ color: "#a78bfa" }}>3 Simple Steps</span>
                        </h2>
                    </div>
                </Reveal>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 22, alignItems: "stretch" }}>
                    {steps.map((s, i) => (
                        <Reveal key={i} delay={i * 140} style={{ height: "100%" }}>
                            <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 22, padding: "30px 22px", textAlign: "center", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <div style={{ width: 60, height: 60, borderRadius: 18, margin: "0 auto 18px", background: `${s.color}18`, border: `1px solid ${s.color}40`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                                    <Icon d={s.icon} size={22} color={s.color} />
                                    <div style={{ position: "absolute", top: -8, right: -8, width: 24, height: 24, borderRadius: "50%", background: s.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>{i + 1}</div>
                                </div>
                                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 19, fontWeight: 700, color: "#fff", margin: "0 0 10px" }}>{s.title}</h3>
                                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, fontFamily: "'DM Sans', sans-serif", margin: "0 0 18px", flexGrow: 1 }}>{s.desc}</p>
                                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${s.color}15`, border: `1px solid ${s.color}30`, borderRadius: 99, padding: "5px 14px" }}>
                                    <Icon d={Icons.clock} size={12} color={s.color} />
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
// INTAKE FORM SECTION ← NEW
// ─────────────────────────────────────────────

type FormData = {
    name: string;
    phone: string;
    email: string;
    affidavitType: string;
    urgency: string;
    purpose: string;
    message: string;
};

const GetStartedForm = () => {
    const [form, setForm] = useState<FormData>({ name: "", phone: "", email: "", affidavitType: "", urgency: "", purpose: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Partial<FormData>>({});

    const affidavitTypes = ["Name Change Affidavit", "Address Proof Affidavit", "Income Proof Affidavit", "Property Affidavit", "Relationship Affidavit", "Lost Document Affidavit", "Other"];
    const urgencyOptions = ["Standard (2–4 hours)", "Express (< 2 hours)", "Next Day", "Not Urgent"];

    const validate = () => {
        const e: Partial<FormData> = {};
        if (!form.name.trim()) e.name = "Name is required";
        if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Valid 10-digit number required";
        if (!form.affidavitType) e.affidavitType = "Please select a type";
        if (!form.urgency) e.urgency = "Please select urgency";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        // Build WhatsApp message with form data
        const msg = `*New Affidavit Request — NyayMitra*\n\n👤 *Name:* ${form.name}\n📞 *Phone:* ${form.phone}\n📧 *Email:* ${form.email || "Not provided"}\n📄 *Type:* ${form.affidavitType}\n⚡ *Urgency:* ${form.urgency}\n🎯 *Purpose:* ${form.purpose || "Not specified"}\n\n💬 *Message:* ${form.message || "No additional message"}`;
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
            openWhatsApp(msg);
        }, 600);
    };

    const update = (field: keyof FormData, value: string) => {
        setForm(f => ({ ...f, [field]: value }));
        if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }));
    };

    const inputStyle = (hasError?: boolean): React.CSSProperties => ({
        width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${hasError ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.1)"}`, borderRadius: 10, padding: "11px 14px", color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none", transition: "border-color 0.2s", boxSizing: "border-box",
    });

    const labelStyle: React.CSSProperties = { display: "block", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.7)", marginBottom: 7, fontFamily: "'DM Sans', sans-serif" };
    const errorStyle: React.CSSProperties = { fontSize: 11.5, color: "#f87171", fontFamily: "'DM Sans', sans-serif", marginTop: 5 };

    return (
        <section id="get-started" style={{ padding: "clamp(48px, 10vw, 96px) 20px", background: "#0d0d1a", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "20%", left: "5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 350, height: 350, background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

            <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: "clamp(32px, 6vw, 48px)" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 99, padding: "4px 14px", marginBottom: 14 }}>
                            <Icon d={Icons.send} size={12} color="#818cf8" />
                            <span style={{ fontSize: 11, color: "#818cf8", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Free Consultation</span>
                        </div>
                        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(30px, 7vw, 52px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", margin: "0 0 12px", padding: "0 12px" }}>
                            Get Your <span style={{ color: "#818cf8" }}>Free Quote</span>
                        </h2>
                        <p style={{ fontSize: "clamp(14px, 3.5vw, 16px)", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif", maxWidth: 520, margin: "0 auto" }}>
                            Fill in the details below. Our legal expert will reach out within 10 minutes on WhatsApp.
                        </p>
                    </div>
                </Reveal>

                {submitted ? (
                    <Reveal>
                        <div style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.25)", borderRadius: 20, padding: "48px 32px", textAlign: "center" }}>
                            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(74,222,128,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                                <Icon d={Icons.check} size={28} color="#4ade80" />
                            </div>
                            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Request Received!</h3>
                            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6, maxWidth: 460, margin: "0 auto 28px" }}>
                                A WhatsApp chat has been opened. Our legal expert will review your request and get back to you within 10 minutes.
                            </p>
                            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                                <button onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", affidavitType: "", urgency: "", purpose: "", message: "" }); }} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "10px 22px", color: "rgba(255,255,255,0.7)", fontSize: 13.5, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                                    Submit Another
                                </button>
                                <button onClick={() => openWhatsApp("Following up on my affidavit request.")} style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none", borderRadius: 10, padding: "10px 22px", color: "#fff", fontSize: 13.5, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 8 }}>
                                    <Icon d={Icons.msg} size={15} color="#fff" /> Continue on WhatsApp
                                </button>
                            </div>
                        </div>
                    </Reveal>
                ) : (
                    <Reveal delay={100}>
                        <form onSubmit={handleSubmit} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 22, padding: "clamp(24px, 5vw, 40px)", display: "flex", flexDirection: "column", gap: 22 }}>

                            {/* Row 1: Name + Phone */}
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 18 }}>
                                <div>
                                    <label style={labelStyle}>Full Name <span style={{ color: "#f87171" }}>*</span></label>
                                    <div style={{ position: "relative" }}>
                                        <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                                            <Icon d={Icons.user} size={15} color="rgba(255,255,255,0.3)" />
                                        </div>
                                        <input
                                            type="text" placeholder="Your full name" value={form.name}
                                            onChange={e => update("name", e.target.value)}
                                            style={{ ...inputStyle(!!errors.name), paddingLeft: 36 }}
                                            onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.6)"}
                                            onBlur={e => e.target.style.borderColor = errors.name ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.1)"}
                                        />
                                    </div>
                                    {errors.name && <p style={errorStyle}>{errors.name}</p>}
                                </div>
                                <div>
                                    <label style={labelStyle}>WhatsApp Number <span style={{ color: "#f87171" }}>*</span></label>
                                    <div style={{ position: "relative" }}>
                                        <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                                            <Icon d={Icons.phone} size={15} color="rgba(255,255,255,0.3)" />
                                        </div>
                                        <input
                                            type="tel" placeholder="10-digit mobile number" value={form.phone}
                                            onChange={e => update("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                                            style={{ ...inputStyle(!!errors.phone), paddingLeft: 36 }}
                                            onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.6)"}
                                            onBlur={e => e.target.style.borderColor = errors.phone ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.1)"}
                                        />
                                    </div>
                                    {errors.phone && <p style={errorStyle}>{errors.phone}</p>}
                                </div>
                            </div>

                            {/* Row 2: Email */}
                            <div>
                                <label style={labelStyle}>Email Address <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 400 }}>(optional)</span></label>
                                <div style={{ position: "relative" }}>
                                    <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                                        <Icon d={Icons.mail} size={15} color="rgba(255,255,255,0.3)" />
                                    </div>
                                    <input
                                        type="email" placeholder="your@email.com" value={form.email}
                                        onChange={e => update("email", e.target.value)}
                                        style={{ ...inputStyle(), paddingLeft: 36 }}
                                        onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.6)"}
                                        onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                                    />
                                </div>
                            </div>

                            {/* Row 3: Type + Urgency */}
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 18 }}>
                                <div>
                                    <label style={labelStyle}>Affidavit Type <span style={{ color: "#f87171" }}>*</span></label>
                                    <div style={{ position: "relative" }}>
                                        <select
                                            value={form.affidavitType}
                                            onChange={e => update("affidavitType", e.target.value)}
                                            style={{ ...inputStyle(!!errors.affidavitType), appearance: "none", paddingRight: 34, cursor: "pointer" }}
                                            onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.6)"}
                                            onBlur={e => e.target.style.borderColor = errors.affidavitType ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.1)"}
                                        >
                                            <option value="" disabled style={{ background: "#0d0d1a" }}>Select type…</option>
                                            {affidavitTypes.map(t => <option key={t} value={t} style={{ background: "#0d0d1a" }}>{t}</option>)}
                                        </select>
                                        <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                                            <Icon d={Icons.chevdown} size={14} color="rgba(255,255,255,0.4)" />
                                        </div>
                                    </div>
                                    {errors.affidavitType && <p style={errorStyle}>{errors.affidavitType}</p>}
                                </div>
                                <div>
                                    <label style={labelStyle}>How Urgent? <span style={{ color: "#f87171" }}>*</span></label>
                                    <div style={{ position: "relative" }}>
                                        <select
                                            value={form.urgency}
                                            onChange={e => update("urgency", e.target.value)}
                                            style={{ ...inputStyle(!!errors.urgency), appearance: "none", paddingRight: 34, cursor: "pointer" }}
                                            onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.6)"}
                                            onBlur={e => e.target.style.borderColor = errors.urgency ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.1)"}
                                        >
                                            <option value="" disabled style={{ background: "#0d0d1a" }}>Select urgency…</option>
                                            {urgencyOptions.map(t => <option key={t} value={t} style={{ background: "#0d0d1a" }}>{t}</option>)}
                                        </select>
                                        <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                                            <Icon d={Icons.chevdown} size={14} color="rgba(255,255,255,0.4)" />
                                        </div>
                                    </div>
                                    {errors.urgency && <p style={errorStyle}>{errors.urgency}</p>}
                                </div>
                            </div>

                            {/* Row 4: Purpose */}
                            <div>
                                <label style={labelStyle}>Purpose / Where will this be used? <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 400 }}>(optional)</span></label>
                                <input
                                    type="text" placeholder="e.g. Passport office, Bank KYC, Property registration…"
                                    value={form.purpose} onChange={e => update("purpose", e.target.value)}
                                    style={inputStyle()}
                                    onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.6)"}
                                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                                />
                            </div>

                            {/* Row 5: Message */}
                            <div>
                                <label style={labelStyle}>Additional Details <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 400 }}>(optional)</span></label>
                                <textarea
                                    placeholder="Any specific requirements, names, dates, or details you'd like included in the affidavit…"
                                    value={form.message} onChange={e => update("message", e.target.value)} rows={3}
                                    style={{ ...inputStyle(), resize: "vertical", minHeight: 90, lineHeight: 1.55 }}
                                    onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.6)"}
                                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                                />
                            </div>

                            {/* Trust badges */}
                            <div style={{ display: "flex", gap: 18, flexWrap: "wrap", padding: "4px 0", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16 }}>
                                {[
                                    { icon: Icons.lock, color: "#22d3ee", text: "100% Confidential" },
                                    { icon: Icons.circle_check, color: "#4ade80", text: "Free Consultation" },
                                    { icon: Icons.clock, color: "#fbbf24", text: "Reply in < 10 mins" },
                                ].map((b, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                                        <Icon d={b.icon} size={14} color={b.color} />
                                        <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif" }}>{b.text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit" disabled={loading}
                                style={{ width: "100%", background: loading ? "rgba(99,102,241,0.5)" : "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none", borderRadius: 12, padding: "14px", color: "#fff", fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 8px 24px rgba(99,102,241,0.35)", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "opacity 0.2s" }}>
                                {loading ? (
                                    <><span style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} /> Connecting to WhatsApp…</>
                                ) : (
                                    <><Icon d={Icons.msg} size={18} color="#fff" /> Get Free Quote on WhatsApp</>
                                )}
                            </button>

                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", textAlign: "center", fontFamily: "'DM Sans', sans-serif", margin: 0 }}>
                                By submitting, you agree to our <a href="#" style={{ color: "rgba(129,140,248,0.7)", textDecoration: "none" }}>Terms of Service</a> and <a href="#" style={{ color: "rgba(129,140,248,0.7)", textDecoration: "none" }}>Privacy Policy</a>
                            </p>
                        </form>
                    </Reveal>
                )}
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
        <section id="pricing" style={{ padding: "clamp(48px, 10vw, 96px) 20px", background: "#080812" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: "clamp(36px, 7vw, 56px)" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: 99, padding: "4px 14px", marginBottom: 14 }}>
                            <Icon d={Icons.dollar} size={12} color="#4ade80" />
                            <span style={{ fontSize: 11, color: "#4ade80", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Transparent Pricing</span>
                        </div>
                        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(30px, 7vw, 52px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
                            Simple Plans, <span style={{ color: "#4ade80" }}>No Hidden Fees</span>
                        </h2>
                        <p style={{ fontSize: "clamp(14px, 3.5vw, 15px)", color: "rgba(255,255,255,0.4)", marginTop: 10, fontFamily: "'DM Sans', sans-serif" }}>One-time payment · Lifetime access to your document</p>
                    </div>
                </Reveal>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 290px), 1fr))", gap: 22, alignItems: "stretch" }}>
                    {tiers.map((t, i) => (
                        <Reveal key={i} delay={i * 100} style={{ height: "100%" }}>
                            <div style={{ background: t.popular ? "rgba(99,102,241,0.06)" : "rgba(255,255,255,0.025)", border: t.popular ? "1px solid rgba(99,102,241,0.4)" : "1px solid rgba(255,255,255,0.07)", borderRadius: 22, padding: "30px 22px", position: "relative", height: "100%", display: "flex", flexDirection: "column" }}>
                                {t.popular && (<div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: 99, padding: "4px 14px", fontSize: 10, fontWeight: 700, color: "#fff", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>MOST POPULAR</div>)}
                                <span style={{ fontSize: 13, fontWeight: 700, color: t.popular ? "#818cf8" : "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em", textTransform: "uppercase" }}>{t.name}</span>
                                <div style={{ margin: "12px 0 6px" }}>
                                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(44px, 7vw, 52px)", fontWeight: 700, color: "#fff", lineHeight: 1 }}>₹{t.price.toLocaleString()}</span>
                                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontFamily: "'DM Sans', sans-serif", marginLeft: 6 }}>/ one-time</span>
                                </div>
                                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif", marginBottom: 22, lineHeight: 1.5 }}>{t.desc}</p>
                                <button onClick={() => openWhatsApp(`I'm interested in the ${t.name} plan at ₹${t.price}. Please tell me more.`)} style={{ width: "100%", background: t.popular ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "rgba(255,255,255,0.07)", border: t.popular ? "none" : "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "13px", color: "#fff", fontSize: 13.5, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", marginBottom: 22, flexShrink: 0 }}>
                                    {t.cta} on WhatsApp
                                </button>
                                <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 18, display: "flex", flexDirection: "column", gap: 10, flexGrow: 1 }}>
                                    {t.features.map((f, j) => (
                                        <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                                            <Icon d={Icons.check} size={13} color="#4ade80" style={{ flexShrink: 0, marginTop: 2 }} />
                                            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", fontFamily: "'DM Sans', sans-serif" }}>{f}</span>
                                        </div>
                                    ))}
                                    {t.excluded.map((f, j) => (
                                        <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 9, opacity: 0.45 }}>
                                            <Icon d={Icons.x} size={13} color="rgba(255,255,255,0.4)" style={{ flexShrink: 0, marginTop: 2 }} />
                                            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif" }}>{f}</span>
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
// LEGAL VALIDITY
// ─────────────────────────────────────────────

const LegalValiditySection = () => (
    <section style={{ padding: "clamp(48px, 10vw, 96px) 20px", background: "#0d0d1a" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
                <div style={{ textAlign: "center", marginBottom: "clamp(36px, 7vw, 52px)" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.2)", borderRadius: 99, padding: "4px 14px", marginBottom: 14 }}>
                        <Icon d={Icons.shield} size={12} color="#22d3ee" />
                        <span style={{ fontSize: 11, color: "#22d3ee", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Legal Assurance</span>
                    </div>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(30px, 7vw, 52px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", padding: "0 12px" }}>
                        Is an Online Affidavit <span style={{ color: "#22d3ee" }}>Legally Valid</span> in India?
                    </h2>
                </div>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
                {[
                    { icon: Icons.circle_check, color: "#22d3ee", title: "Legally Recognized", desc: "Yes — fully valid in India when prepared in the proper format. Recognized under the Indian Evidence Act, 1872. Our documents are reviewed by experienced lawyers." },
                    { icon: Icons.gavel, color: "#f59e0b", title: "Role of Notary & Stamp Paper", desc: "For most purposes, notarization is required. We provide complete guidance including recommended notary offices near you and exactly what documents to carry." },
                    { icon: Icons.building, color: "#4ade80", title: "Where It's Accepted", desc: "Courts, banks, passport offices, educational institutions, government departments, visa applications, property registrations, and all legal proceedings nationwide." },
                ].map((card, i) => (
                    <Reveal key={i} delay={i * 100}>
                        <div style={{ background: "rgba(255,255,255,0.025)", borderRadius: 18, padding: "26px 22px", border: "1px solid rgba(255,255,255,0.07)" }}>
                            <div style={{ width: 44, height: 44, background: `${card.color}15`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                                <Icon d={card.icon} size={22} color={card.color} />
                            </div>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 10 }}>{card.title}</h3>
                            <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>{card.desc}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);

// ─────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────

const TestimonialsSection = () => {
    const testimonials = [
        { initials: "SA", name: "Swapnil Anand", role: "Property Owner", content: "Took notary service for name change in property documents. The entire process was smooth — got my registered affidavit within 24 hours. Saved me 3 trips to the notary office!", service: "Name Change" },
        { initials: "JK", name: "Jay Kumar", role: "Homeowner", content: "Needed an affidavit for electricity connection at my new house. NyayMitra delivered within 2 hours. Accepted by the electricity department without any issues whatsoever.", service: "Address Proof" },
        { initials: "RS", name: "Ramesh Sharma", role: "Business Owner", content: "The affidavit was perfect and legally sound. Saved me from multiple visits to the notary. Highly recommended for anyone needing quick, professional legal documentation.", service: "Income Proof" },
    ];

    return (
        <section style={{ padding: "clamp(48px, 10vw, 96px) 20px", background: "#080812" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: "clamp(36px, 7vw, 52px)" }}>
                        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(30px, 7vw, 52px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
                            Trusted by <span style={{ color: "#fbbf24" }}>500+ Indians</span>
                        </h2>
                        <p style={{ fontSize: "clamp(13px, 3.5vw, 15px)", color: "rgba(255,255,255,0.4)", marginTop: 10, fontFamily: "'DM Sans', sans-serif" }}>Rated 4.9/5 based on 150+ verified reviews</p>
                    </div>
                </Reveal>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 22 }}>
                    {testimonials.map((item, i) => (
                        <Reveal key={i} delay={i * 110}>
                            <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, padding: "26px", display: "flex", flexDirection: "column" }}>
                                <span style={{ display: "inline-block", background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 99, padding: "3px 12px", fontSize: 10, fontWeight: 600, color: "#818cf8", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 14 }}>{item.service}</span>
                                <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
                                    {[...Array(5)].map((_, j) => <Icon key={j} d={Icons.star} size={13} color="#f59e0b" />)}
                                </div>
                                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif", flexGrow: 1, margin: "0 0 22px", fontStyle: "italic" }}>"{item.content}"</p>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.07)", flexWrap: "wrap", gap: 10 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, color: "#fff" }}>{item.initials}</div>
                                        <div>
                                            <div style={{ fontSize: 13.5, fontWeight: 700, color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>{item.name}</div>
                                            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif" }}>{item.role}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                        <Icon d={Icons.badge} size={13} color="#4ade80" />
                                        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif" }}>Verified</span>
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
        { q: "Is an online affidavit legally valid in India?", a: "Yes. Online affidavits are fully valid when properly notarized. Our documents follow the format prescribed by the Indian Evidence Act, 1872, and are accepted by courts, banks, and government offices. Expert lawyer review is included in our Professional and Enterprise plans." },
        { q: "Do I need to visit a notary after receiving my affidavit?", a: "For most purposes, a notarized affidavit is required. We provide complete notary guidance including nearby offices and what to carry. Some government portals accept e-stamped affidavits without physical notarization." },
        { q: "How long does it take to receive my affidavit?", a: "Most standard affidavits are delivered within 2–4 hours. Complex documents may take up to 24 hours. Express delivery is available. We'll update you throughout via WhatsApp." },
        { q: "What documents are required?", a: "Typically: identity proof (Aadhaar, PAN, Voter ID, or Passport), address proof, and documents related to your affidavit type. Our team will guide you on WhatsApp — usually just clear photos are sufficient." },
        { q: "Can I use an affidavit for passport or visa applications?", a: "Absolutely. Many passport and visa applications require affidavits for name change, address proof, or relationship verification. Our affidavits are formatted to meet Passport Seva Kendra and embassy requirements." },
        { q: "What if I need changes after receiving the draft?", a: "We offer unlimited free revisions until you are 100% satisfied. Share your feedback on WhatsApp and we'll update promptly. No hidden charges, no questions asked." },
        { q: "Is my personal information kept secure?", a: "Your data is protected with 256-bit SSL encryption. Documents are permanently deleted from our servers after 30 days. We never share your information with third parties." },
    ];

    return (
        <section id="faqs" style={{ padding: "clamp(48px, 10vw, 96px) 20px", background: "#0d0d1a" }}>
            <div style={{ maxWidth: 780, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: "clamp(36px, 7vw, 52px)" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.2)", borderRadius: 99, padding: "4px 14px", marginBottom: 14 }}>
                            <Icon d={Icons.help} size={12} color="#22d3ee" />
                            <span style={{ fontSize: 11, color: "#22d3ee", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>FAQs</span>
                        </div>
                        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(30px, 7vw, 52px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
                            Common <span style={{ color: "#22d3ee" }}>Questions</span>
                        </h2>
                    </div>
                </Reveal>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {faqs.map((f, i) => (
                        <Reveal key={i} delay={Math.min(i * 50, 250)}>
                            <div style={{ background: open === i ? "rgba(34,211,238,0.04)" : "rgba(255,255,255,0.025)", border: open === i ? "1px solid rgba(34,211,238,0.25)" : "1px solid rgba(255,255,255,0.07)", borderRadius: 14, overflow: "hidden", transition: "all 0.2s" }}>
                                <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", textAlign: "left", padding: "16px 20px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                                    <span style={{ fontSize: "clamp(13.5px, 3.8vw, 15px)", fontWeight: 600, color: "#fff", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.45, paddingRight: 8 }}>{f.q}</span>
                                    <Icon d={Icons.chevdown} size={17} color="rgba(255,255,255,0.4)" style={{ flexShrink: 0, transition: "transform 0.3s", transform: open === i ? "rotate(180deg)" : "none" }} />
                                </button>
                                {open === i && (
                                    <div style={{ padding: "0 20px 18px 20px" }}>
                                        <p style={{ fontSize: "clamp(13px, 3.5vw, 14px)", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>{f.a}</p>
                                    </div>
                                )}
                            </div>
                        </Reveal>
                    ))}
                </div>
                <Reveal delay={300}>
                    <div style={{ textAlign: "center", marginTop: 40 }}>
                        <button onClick={() => openWhatsApp("I have a question about affidavits.")} style={{ background: "none", border: "1px solid rgba(34,211,238,0.35)", borderRadius: 12, padding: "11px 28px", color: "#22d3ee", fontSize: 13.5, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", display: "inline-flex", alignItems: "center", gap: 8 }}>
                            <Icon d={Icons.msg} size={15} color="#22d3ee" /> Still have questions? Ask on WhatsApp
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
    <section style={{ padding: "clamp(60px, 12vw, 100px) 20px", background: "linear-gradient(160deg, #0a0a12, #0f0b1e)" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
            <Reveal>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(34px, 8vw, 68px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 18px", padding: "0 12px" }}>
                    Create Your Affidavit<br /><span style={{ color: "#818cf8" }}>in Minutes</span>
                </h2>
                <p style={{ fontSize: "clamp(14px, 4vw, 17px)", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif", marginBottom: 36, lineHeight: 1.6, padding: "0 16px" }}>
                    Join 500+ satisfied customers. Start your affidavit on WhatsApp or get a free quote now.
                </p>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginBottom: 28 }}>
                    <button onClick={() => document.querySelector("#get-started")?.scrollIntoView({ behavior: "smooth" })} style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none", borderRadius: 14, padding: "13px 28px", color: "#fff", fontSize: "clamp(14px, 3.5vw, 15px)", fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 10px 32px rgba(99,102,241,0.4)", display: "flex", alignItems: "center", gap: 9 }}>
                        <Icon d={Icons.file} size={17} color="#fff" /> Get Free Quote — from ₹999
                    </button>
                    <button onClick={() => openWhatsApp("Can I request a callback from NyayMitra?")} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 14, padding: "13px 28px", color: "rgba(255,255,255,0.8)", fontSize: "clamp(14px, 3.5vw, 15px)", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 9 }}>
                        <Icon d={Icons.phone} size={17} /> Request Callback
                    </button>
                </div>
                <div style={{ display: "flex", gap: "clamp(14px, 4vw, 24px)", flexWrap: "wrap", justifyContent: "center" }}>
                    {["Free Expert Consultation", "30-Day Money-Back", "100% Legally Valid"].map((item, i) => (
                        <span key={i} style={{ fontSize: 12.5, color: "rgba(255,255,255,0.38)", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 6 }}>
                            <Icon d={Icons.check} size={13} color="rgba(74,222,128,0.7)" /> {item}
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
    const cols = [
        { title: "Services", links: ["Affidavit Online", "Name Change Affidavit", "Address Proof Affidavit", "Property Affidavit"] },
        { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Refund Policy", "GDPR Compliance"] },
        { title: "Company", links: ["About NyayMitra", "Legal Blog", "Contact Us"] },
    ];
    return (
        <footer style={{ background: "#05050e", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "44px 20px 28px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 40, marginBottom: 44 }}>
                    <div style={{ minWidth: 200, flex: "1 1 200px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                            <div style={{ width: 30, height: 30, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Icon d={Icons.scale} size={15} color="#fff" />
                            </div>
                            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 19, color: "#fff" }}>Nyay<span style={{ color: "#818cf8" }}>Mitra</span></span>
                        </div>
                        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.32)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6, maxWidth: 230, margin: "0 0 18px" }}>
                            Legally valid affidavits online in minutes. Expert reviewed, court approved, trusted by Indians.
                        </p>
                        <div style={{ display: "flex", gap: 10 }}>
                            {[{ href: "https://wa.me/919661644025", icon: Icons.msg }, { href: "mailto:support@nyaymitra.com", icon: Icons.mail }, { href: "tel:+919661644025", icon: Icons.phone }].map((s, i) => (
                                <a key={i} href={s.href} target={i === 0 ? "_blank" : undefined} rel="noopener noreferrer" style={{ width: 34, height: 34, borderRadius: 9, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.5)" }}>
                                    <Icon d={s.icon} size={14} color="rgba(255,255,255,0.5)" />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 28, flex: "2" }}>
                        {cols.map(col => (
                            <div key={col.title}>
                                <span style={{ fontSize: 11.5, fontWeight: 700, color: "#fff", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: 14 }}>{col.title}</span>
                                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                                    {col.links.map((l, i) => <a key={i} href="#" style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", fontFamily: "'DM Sans', sans-serif", textDecoration: "none" }}>{l}</a>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ paddingTop: 22, borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.22)", fontFamily: "'DM Sans', sans-serif" }}>© {year} NyayMitra. All rights reserved.</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.22)", fontFamily: "'DM Sans', sans-serif" }}>Made with care in India 🇮🇳</span>
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
        <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 200, display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end" }}>
            <button onClick={() => document.querySelector("#get-started")?.scrollIntoView({ behavior: "smooth" })} style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none", borderRadius: 99, padding: "11px 22px", color: "#fff", fontSize: 13.5, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 6px 24px rgba(99,102,241,0.5)", display: "flex", alignItems: "center", gap: 8 }}>
                <Icon d={Icons.file} size={15} color="#fff" /> Get Free Quote
            </button>
            <button onClick={() => openWhatsApp("I have a question about NyayMitra.")} style={{ background: "rgba(10,10,18,0.96)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 99, padding: "9px 18px", color: "rgba(255,255,255,0.75)", fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 7 }}>
                <Icon d={Icons.msg} size={13} color="rgba(255,255,255,0.75)" /> Need Help?
            </button>
        </div>
    );
};

// ─────────────────────────────────────────────
// GLOBAL STYLES
// ─────────────────────────────────────────────

const GlobalStyles = () => (
    <style>{`
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #0a0a12; font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #0a0a12; }
    ::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.45); border-radius: 99px; }
    input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.22); }
    select option { background: #0d0d1a; color: #fff; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .hide-mobile { display: flex; }
    .show-mobile { display: none; }
    @media (max-width: 768px) {
      .hide-mobile { display: none !important; }
      .show-mobile { display: flex !important; }
    }
    @media (max-width: 480px) { button, a { touch-action: manipulation; } }
  `}</style>
);

// ─────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────

export default function NyayMitraLandingPage() {
    return (
        <>
            <GlobalStyles />
            <main style={{ minHeight: "100vh", background: "#0a0a12", overflowX: "hidden" }}>
                <Header />
                <Hero />
                <WhatIsAffidavit />
                <TypesSection />
                <ProcessSection />
                <GetStartedForm />
                <PricingSection />
                <LegalValiditySection />
                <TestimonialsSection />
                <FAQSection />
                <FinalCTA />
                <StickyAction />
                <Footer />
            </main>
        </>
    );
}