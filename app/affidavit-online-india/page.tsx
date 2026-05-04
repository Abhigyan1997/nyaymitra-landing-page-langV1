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
// GLOBAL STYLES (Ink & Gold Theme)
// ─────────────────────────────────────────────

const GlobalStyles = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Mono:wght@400;500&display=swap');
        
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
          --emerald:    #10b981;
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
        }
        
        @keyframes fadeUp { 
            from { opacity: 0; transform: translateY(28px); } 
            to { opacity: 1; transform: translateY(0); } 
        }
        @keyframes shimmer { 
            0% { background-position: -200% center; } 
            100% { background-position: 200% center; } 
        }
        
        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1),
                      transform 0.7s cubic-bezier(0.22,1,0.36,1);
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
        
        .eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--mono); font-size: 9.5px; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold-dk);
        }
        .eyebrow::before, .eyebrow::after {
          content:''; width: 22px; height: 1px; background: var(--gold); flex-shrink:0;
        }
        
        .btn {
          display: inline-flex; align-items: center; justify-content: center;
          gap: 8px; font-family: var(--sans); font-size: 12px; font-weight: 600;
          letter-spacing: 0.03em; border-radius: 8px; padding: 8px 16px;
          cursor: pointer; border: none; text-decoration: none;
          transition: all 0.2s ease;
        }
        .btn-ink   { background: var(--ink); color: var(--white); }
        .btn-ink:hover { background: var(--ink-2); transform: translateY(-2px); }
        .btn-gold  { background: var(--gold); color: var(--ink); font-weight: 700; }
        .btn-gold:hover { background: var(--gold-lt); transform: translateY(-2px); }
        .btn-ghost { background: transparent; color: var(--ink); border: 1.5px solid var(--ink-7); }
        .btn-ghost:hover { background: var(--ink); color: var(--white); border-color: var(--ink); }
        .btn-outline { background: transparent; border: 1px solid var(--ink-6); color: var(--ink-4); }
        .btn-outline:hover { border-color: var(--gold); color: var(--gold-dk); background: var(--gold-pale); }
        
        .nav-link {
          font-family: var(--sans); font-size: 13px; font-weight: 500;
          color: var(--ink-4); text-decoration: none; padding: 8px 13px;
          border-radius: 5px; transition: all 0.18s;
        }
        .nav-link:hover { color: var(--ink); background: var(--ink-8); }
        
        .hide-mobile { display: flex; }
        .show-mobile { display: none; }
        
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--ink-8); }
        ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 99px; }
        
        input::placeholder, textarea::placeholder { color: var(--ink-5); }
        
        @keyframes spin { 
            to { transform: rotate(360deg); } 
        }
    `}</style>
);

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
        <div ref={ref} className={`reveal ${className}`} style={{
            transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(24px)",
            ...extraStyle,
        }}>
            {children}
        </div>
    );
};

// ─────────────────────────────────────────────
// LOGO COMPONENT (Scale of Justice + NyayMitra)
// ─────────────────────────────────────────────

const Logo = ({ onClick, className = "" }: { onClick?: () => void; className?: string }) => (
    <div onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", flexShrink: 0 }} className={className}>
        <div style={{ width: 34, height: 34, background: "var(--ink)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon d={Icons.scale} size={15} color="#fff" />
        </div>
        <div>
            <div style={{ fontFamily: "var(--serif)", fontSize: "17px", fontWeight: 700, color: "var(--ink)" }}>
                Nyay<span style={{ color: "var(--gold-dk)" }}>Mitra</span>
            </div>
            <div style={{ fontFamily: "var(--mono)", fontSize: "6.5px", color: "var(--gold-dk)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                Legal Tech · India
            </div>
        </div>
    </div>
);

// ─────────────────────────────────────────────
// HEADER (Ink & Gold)
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
            background: scrolled ? "rgba(255,255,255,0.96)" : "transparent",
            backdropFilter: scrolled ? "blur(16px)" : "none",
            borderBottom: scrolled ? "1px solid var(--ink-7)" : "none",
        }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68, gap: 12 }}>
                <Logo onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />

                <nav style={{ display: "flex", gap: 28 }} className="hide-mobile">
                    {links.map(l => (
                        <button key={l.label} onClick={() => go(l.href)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-4)", fontSize: 13, fontWeight: 500, transition: "color 0.2s", fontFamily: "var(--sans)" }}
                            onMouseEnter={e => (e.currentTarget.style.color = "var(--ink)")}
                            onMouseLeave={e => (e.currentTarget.style.color = "var(--ink-4)")}>
                            {l.label}
                        </button>
                    ))}
                </nav>

                <div style={{ display: "flex", gap: 10 }} className="hide-mobile">
                    <button onClick={() => go("#get-started")} style={{ background: "var(--gold)", border: "none", borderRadius: 8, padding: "8px 18px", color: "var(--ink)", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "var(--sans)" }}>
                        Get Started →
                    </button>
                </div>

                <button onClick={() => setOpen(!open)} className="show-mobile" style={{ background: "none", border: "1px solid var(--ink-7)", borderRadius: 8, cursor: "pointer", color: "var(--ink)", padding: "7px 10px" }}>
                    <Icon d={open ? Icons.x : Icons.menu} size={16} />
                </button>
            </div>

            {open && (
                <div style={{ background: "rgba(255,255,255,0.98)", backdropFilter: "blur(16px)", borderTop: "1px solid var(--ink-7)", padding: "16px 24px 24px" }}>
                    {links.map(l => (
                        <button key={l.label} onClick={() => go(l.href)} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", color: "var(--ink-4)", fontSize: 16, fontWeight: 500, padding: "12px 0", borderBottom: "1px solid var(--ink-7)", fontFamily: "var(--sans)" }}>
                            {l.label}
                        </button>
                    ))}
                    <button onClick={() => { setOpen(false); document.querySelector("#get-started")?.scrollIntoView({ behavior: "smooth" }); }} style={{ width: "100%", marginTop: 18, background: "var(--gold)", border: "none", borderRadius: 10, padding: "13px", color: "var(--ink)", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "var(--sans)" }}>
                        Get Free Quote
                    </button>
                </div>
            )}
        </header>
    );
};

// ─────────────────────────────────────────────
// HERO (Ink & Gold Theme)
// ─────────────────────────────────────────────

const Hero = () => (
    <section id="home" style={{ minHeight: "100vh", position: "relative", overflow: "hidden", background: "linear-gradient(145deg, var(--white) 0%, var(--ink-8) 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: 80, paddingBottom: 80, paddingLeft: 20, paddingRight: 20 }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <div style={{ position: "absolute", top: "8%", left: "10%", width: "clamp(300px, 50vw, 520px)", height: "clamp(300px, 50vw, 520px)", background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)", borderRadius: "50%" }} />
            <div style={{ position: "absolute", bottom: "5%", right: "8%", width: "clamp(280px, 45vw, 480px)", height: "clamp(280px, 45vw, 480px)", background: "radial-gradient(circle, rgba(139,107,20,0.06) 0%, transparent 70%)", borderRadius: "50%" }} />
        </div>

        <Reveal>
            <div className="eyebrow" style={{ marginBottom: 20 }}>
                Trusted by 100+ Indians · Rated 4.9★
            </div>
        </Reveal>

        <Reveal delay={80}>
            <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(40px, 8vw, 82px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", textAlign: "center", color: "var(--ink)", maxWidth: 980, margin: "0 auto 16px", padding: "0 8px" }}>
                Create Affidavit Online in India<br />
                <span className="gold-shimmer">Legally Valid & Fast</span>
            </h1>
        </Reveal>

        <Reveal delay={160}>
            <p style={{ fontFamily: "var(--sans)", fontSize: "clamp(15px, 3.5vw, 18px)", color: "var(--ink-4)", lineHeight: 1.65, textAlign: "center", maxWidth: 580, margin: "0 auto 36px", padding: "0 12px" }}>
                Lawyer drafted, expert reviewed, delivered in 2–4 hours. No court trips, no confusion just peace of mind. Starting at ₹999.
            </p>
        </Reveal>

        <Reveal delay={220}>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginBottom: 48 }}>
                <button onClick={() => document.querySelector("#get-started")?.scrollIntoView({ behavior: "smooth" })} style={{ background: "var(--gold)", border: "none", borderRadius: 8, padding: "13px 26px", color: "var(--ink)", fontSize: "clamp(14px, 3.5vw, 15px)", fontWeight: 700, cursor: "pointer", fontFamily: "var(--sans)", boxShadow: "0 8px 28px rgba(201,168,76,0.3)", display: "flex", alignItems: "center", gap: 8 }}>
                    <Icon d={Icons.file} size={16} color="var(--ink)" /> Create Affidavit Now
                </button>
                <button onClick={() => openWhatsApp("Can you explain how NyayMitra works?")} style={{ background: "transparent", border: "1px solid var(--ink-6)", borderRadius: 8, padding: "13px 26px", color: "var(--ink-3)", fontSize: "clamp(14px, 3.5vw, 15px)", fontWeight: 600, cursor: "pointer", fontFamily: "var(--sans)", display: "flex", alignItems: "center", gap: 8 }}>
                    <Icon d={Icons.phone} size={16} /> Talk to Expert
                </button>
            </div>
        </Reveal>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, borderTop: "1px solid var(--ink-7)", background: "rgba(255,255,255,0.8)", backdropFilter: "blur(8px)", padding: "14px 20px" }}>
            <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "center", gap: "clamp(24px, 6vw, 72px)", flexWrap: "wrap" }}>
                {[{ v: "60+", l: "Verified Lawyers" }, { v: "100+", l: "Happy Clients" }, { v: "< 2 min", l: "Response Time" }, { v: "4.9 ★", l: "Client Rating" }].map((s, i) => (
                    <div key={i} style={{ textAlign: "center" }}>
                        <div style={{ fontFamily: "var(--serif)", fontSize: "clamp(20px, 4vw, 24px)", fontWeight: 700, color: "var(--ink)" }}>{s.v}</div>
                        <div style={{ fontSize: "clamp(10px, 2vw, 11px)", color: "var(--ink-5)", fontFamily: "var(--mono)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 3 }}>{s.l}</div>
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
    <section style={{ padding: "clamp(48px, 10vw, 96px) 20px", background: "var(--white)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Reveal>
                <div style={{ textAlign: "center", marginBottom: "clamp(36px, 7vw, 56px)" }}>
                    <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 12 }}>Foundation</div>
                    <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(30px, 7vw, 52px)", fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.02em" }}>
                        What is an <span style={{ color: "var(--gold-dk)" }}>Affidavit</span>?
                    </h2>
                </div>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, alignItems: "stretch" }}>
                {[
                    { icon: Icons.file, color: "var(--ink)", title: "Legal Declaration", desc: "A sworn written statement confirmed by oath, used as evidence in courts, government offices, and financial institutions. Recognized under the Indian Evidence Act, 1872." },
                    { icon: Icons.shield, color: "var(--gold-dk)", title: "Valid Across India", desc: "Accepted by courts, banks, passport offices, educational institutions, and government authorities nationwide when prepared in the correct legal format." },
                    { icon: Icons.globe, color: "var(--emerald)", title: "Common Use Cases", desc: "Name change, address proof for KYC, income declaration, property disputes, lost document verification, educational certificate validation, and legal proceedings." },
                ].map((card, i) => (
                    <Reveal key={i} delay={i * 100} style={{ height: "100%" }}>
                        <div style={{ background: "var(--ink-8)", border: "1px solid var(--ink-7)", borderRadius: 18, padding: "26px 22px", height: "100%", display: "flex", flexDirection: "column" }}>
                            <div style={{ width: 44, height: 44, flexShrink: 0, background: "rgba(201,168,76,0.12)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                                <Icon d={card.icon} size={22} color={card.color} />
                            </div>
                            <h3 style={{ fontFamily: "var(--sans)", fontSize: 18, fontWeight: 700, color: "var(--ink)", marginBottom: 10 }}>{card.title}</h3>
                            <p style={{ fontSize: 14, color: "var(--ink-5)", lineHeight: 1.7, fontFamily: "var(--sans)", flexGrow: 1 }}>{card.desc}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);

// ─────────────────────────────────────────────
// SERVICES (TYPES OF AFFIDAVITS)
// ─────────────────────────────────────────────

const TypesSection = () => {
    const services = [
        { icon: Icons.pen, title: "Name Change Affidavit", desc: "After marriage, divorce, or personal choice. Accepted by passport offices and government bodies.", time: "3 hrs", price: "₹1,199", popular: true },
        { icon: Icons.home, title: "Address Proof Affidavit", desc: "Verify your current residential address for KYC, banks, and government applications.", time: "2 hrs", price: "₹999" },
        { icon: Icons.dollar, title: "Income Proof Affidavit", desc: "Income declaration for loans, visa applications, or government schemes. Court admissible.", time: "2 hrs", price: "₹999" },
        { icon: Icons.building, title: "Property Affidavit", desc: "Ownership, disputes, inheritance, or transfer matters. Essential for real estate transactions.", time: "4 hrs", price: "₹1,499" },
        { icon: Icons.user, title: "Relationship Affidavit", desc: "Declaration of relationship between individuals for nominees, insurance, bank accounts, and visa dependents.", time: "2 hrs", price: "₹999" },
        { icon: Icons.file, title: "Lost Document Affidavit", desc: "Declaration for lost Aadhaar, PAN, passport, marksheet, or any government issued document. Accepted by all authorities.", time: "2 hrs", price: "₹899" },
    ];

    return (
        <section id="services" style={{ padding: "clamp(48px, 10vw, 96px) 20px", background: "var(--ink-8)" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: "clamp(36px, 7vw, 56px)" }}>
                        <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 12 }}>
                            Browse by Type
                        </div>
                        <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(30px, 7vw, 52px)", fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.02em" }}>
                            Types of <span style={{ color: "var(--gold-dk)" }}>Affidavits</span>
                        </h2>
                    </div>
                </Reveal>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
                    gap: 24,
                    alignItems: "stretch"
                }}>
                    {services.map((s, i) => (
                        <Reveal key={i} delay={i * 60} style={{ height: "100%" }}>
                            <div style={{
                                position: "relative",
                                background: "var(--white)",
                                border: s.popular ? "1px solid var(--gold)" : "1px solid var(--ink-7)",
                                borderRadius: 18,
                                padding: "26px 22px 22px",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                transition: "transform 0.2s, border-color 0.2s",
                                cursor: "pointer"
                            }}>
                                {s.popular && (
                                    <div style={{
                                        position: "absolute",
                                        top: -11,
                                        right: 18,
                                        background: "var(--gold)",
                                        borderRadius: 99,
                                        padding: "3px 10px",
                                        fontSize: 9,
                                        fontWeight: 700,
                                        color: "var(--ink)",
                                        fontFamily: "var(--mono)",
                                        letterSpacing: "0.05em"
                                    }}>
                                        MOST POPULAR
                                    </div>
                                )}
                                <div style={{
                                    width: 48,
                                    height: 48,
                                    flexShrink: 0,
                                    background: "rgba(201,168,76,0.12)",
                                    border: "1px solid rgba(201,168,76,0.2)",
                                    borderRadius: 14,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: 20
                                }}>
                                    <Icon d={s.icon} size={22} color="var(--gold-dk)" />
                                </div>
                                <h3 style={{
                                    fontFamily: "var(--sans)",
                                    fontSize: 18,
                                    fontWeight: 700,
                                    color: "var(--ink)",
                                    margin: "0 0 10px",
                                    lineHeight: 1.3
                                }}>
                                    {s.title}
                                </h3>
                                <p style={{
                                    fontSize: 13.5,
                                    color: "var(--ink-5)",
                                    lineHeight: 1.6,
                                    margin: "0 0 20px",
                                    fontFamily: "var(--sans)",
                                    flexGrow: 1
                                }}>
                                    {s.desc}
                                </p>
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    paddingTop: 16,
                                    borderTop: "1px solid var(--ink-7)",
                                    marginBottom: 20,
                                    flexWrap: "wrap",
                                    gap: 12,
                                    flexShrink: 0
                                }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                        <Icon d={Icons.clock} size={14} color="var(--ink-5)" />
                                        <span style={{ fontSize: 12.5, color: "var(--ink-5)", fontFamily: "var(--sans)" }}>{s.time}</span>
                                    </div>
                                    <span style={{ fontFamily: "var(--serif)", fontSize: 24, fontWeight: 700, color: "var(--gold-dk)", lineHeight: 1 }}>
                                        {s.price}
                                    </span>
                                </div>
                                <button
                                    onClick={() => document.querySelector("#get-started")?.scrollIntoView({ behavior: "smooth" })}
                                    style={{
                                        width: "100%",
                                        background: "rgba(201,168,76,0.12)",
                                        border: "1px solid rgba(201,168,76,0.25)",
                                        borderRadius: 12,
                                        padding: "12px",
                                        color: "var(--gold-dk)",
                                        fontSize: 14,
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        fontFamily: "var(--sans)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 8,
                                        flexShrink: 0,
                                        transition: "background 0.2s, border-color 0.2s"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = "rgba(201,168,76,0.2)";
                                        e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "rgba(201,168,76,0.12)";
                                        e.currentTarget.style.borderColor = "rgba(201,168,76,0.25)";
                                    }}
                                >
                                    Get Quote <Icon d={Icons.arrow} size={14} color="var(--gold-dk)" />
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
        { icon: Icons.file, title: "Share Requirements", desc: "Fill our quick form or chat on WhatsApp. Share your affidavit type and supporting documents.", time: "5 min", color: "var(--ink)" },
        { icon: Icons.shield, title: "Expert Drafting", desc: "AI-powered generation combined with lawyer verification ensures full legal compliance.", time: "2–4 hours", color: "var(--gold-dk)" },
        { icon: Icons.download, title: "Review & Download", desc: "Review your document, request unlimited revisions, then download as PDF or DOCX.", time: "Instant", color: "var(--gold)" },
    ];

    return (
        <section id="process" style={{ padding: "clamp(48px, 10vw, 96px) 20px", background: "var(--white)" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: "clamp(36px, 7vw, 56px)" }}>
                        <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 12 }}>Simple Process</div>
                        <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(30px, 7vw, 52px)", fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.02em" }}>
                            Your Affidavit in <span style={{ color: "var(--gold-dk)" }}>3 Simple Steps</span>
                        </h2>
                    </div>
                </Reveal>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 22, alignItems: "stretch" }}>
                    {steps.map((s, i) => (
                        <Reveal key={i} delay={i * 140} style={{ height: "100%" }}>
                            <div style={{ background: "var(--ink-8)", border: "1px solid var(--ink-7)", borderRadius: 22, padding: "30px 22px", textAlign: "center", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <div style={{ width: 60, height: 60, borderRadius: 18, margin: "0 auto 18px", background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                                    <Icon d={s.icon} size={22} color={s.color} />
                                    <div style={{ position: "absolute", top: -8, right: -8, width: 24, height: 24, borderRadius: "50%", background: "var(--gold)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "var(--ink)", fontFamily: "var(--sans)" }}>{i + 1}</div>
                                </div>
                                <h3 style={{ fontFamily: "var(--sans)", fontSize: 19, fontWeight: 700, color: "var(--ink)", margin: "0 0 10px" }}>{s.title}</h3>
                                <p style={{ fontSize: 13.5, color: "var(--ink-5)", lineHeight: 1.65, fontFamily: "var(--sans)", margin: "0 0 18px", flexGrow: 1 }}>{s.desc}</p>
                                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 99, padding: "5px 14px" }}>
                                    <Icon d={Icons.clock} size={12} color="var(--gold-dk)" />
                                    <span style={{ fontSize: 12, color: "var(--gold-dk)", fontFamily: "var(--sans)", fontWeight: 600 }}>{s.time}</span>
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
// INTAKE FORM SECTION (Ink & Gold Theme)
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
        width: "100%", background: "var(--white)", border: `1px solid ${hasError ? "var(--red)" : "var(--ink-7)"}`, borderRadius: 10, padding: "11px 14px", color: "var(--ink)", fontSize: 14, fontFamily: "var(--sans)", outline: "none", transition: "border-color 0.2s", boxSizing: "border-box",
    });

    const labelStyle: React.CSSProperties = { display: "block", fontSize: 12, fontWeight: 600, color: "var(--ink-3)", marginBottom: 7, fontFamily: "var(--sans)" };
    const errorStyle: React.CSSProperties = { fontSize: 10, color: "var(--red)", fontFamily: "var(--sans)", marginTop: 4 };

    return (
        <section id="get-started" style={{ padding: "clamp(48px, 10vw, 96px) 20px", background: "var(--ink-8)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "20%", left: "5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 350, height: 350, background: "radial-gradient(circle, rgba(139,107,20,0.04) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

            <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: "clamp(32px, 6vw, 48px)" }}>
                        <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 14 }}>Free Consultation</div>
                        <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(30px, 7vw, 52px)", fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.02em", margin: "0 0 12px", padding: "0 12px" }}>
                            Get Your <span style={{ color: "var(--gold-dk)" }}>Free Quote</span>
                        </h2>
                        <p style={{ fontSize: "clamp(14px, 3.5vw, 16px)", color: "var(--ink-5)", fontFamily: "var(--sans)", maxWidth: 520, margin: "0 auto" }}>
                            Fill in the details below. Our legal expert will reach out within 10 minutes on WhatsApp.
                        </p>
                    </div>
                </Reveal>

                {submitted ? (
                    <Reveal>
                        <div style={{ background: "var(--white)", border: "1px solid var(--ink-7)", borderRadius: 20, padding: "48px 32px", textAlign: "center" }}>
                            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(16,185,129,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                                <Icon d={Icons.check} size={28} color="var(--emerald)" />
                            </div>
                            <h3 style={{ fontFamily: "var(--serif)", fontSize: 32, fontWeight: 700, color: "var(--ink)", marginBottom: 12 }}>Request Received!</h3>
                            <p style={{ fontSize: 15, color: "var(--ink-5)", fontFamily: "var(--sans)", lineHeight: 1.6, maxWidth: 460, margin: "0 auto 28px" }}>
                                A WhatsApp chat has been opened. Our legal expert will review your request and get back to you within 10 minutes.
                            </p>
                            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                                <button onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", affidavitType: "", urgency: "", purpose: "", message: "" }); }} style={{ background: "transparent", border: "1px solid var(--ink-6)", borderRadius: 10, padding: "10px 22px", color: "var(--ink-4)", fontSize: 13.5, fontWeight: 600, cursor: "pointer", fontFamily: "var(--sans)" }}>
                                    Submit Another
                                </button>
                                <button onClick={() => openWhatsApp("Following up on my affidavit request.")} style={{ background: "var(--gold)", border: "none", borderRadius: 10, padding: "10px 22px", color: "var(--ink)", fontSize: 13.5, fontWeight: 700, cursor: "pointer", fontFamily: "var(--sans)", display: "flex", alignItems: "center", gap: 8 }}>
                                    <Icon d={Icons.msg} size={15} color="var(--ink)" /> Continue on WhatsApp
                                </button>
                            </div>
                        </div>
                    </Reveal>
                ) : (
                    <Reveal delay={100}>
                        <form onSubmit={handleSubmit} style={{ background: "var(--white)", border: "1px solid var(--ink-7)", borderRadius: 22, padding: "clamp(24px, 5vw, 40px)", display: "flex", flexDirection: "column", gap: 22 }}>

                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 18 }}>
                                <div>
                                    <label style={labelStyle}>Full Name <span style={{ color: "var(--red)" }}>*</span></label>
                                    <div style={{ position: "relative" }}>
                                        <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                                            <Icon d={Icons.user} size={15} color="var(--ink-5)" />
                                        </div>
                                        <input
                                            type="text" placeholder="Your full name" value={form.name}
                                            onChange={e => update("name", e.target.value)}
                                            style={{ ...inputStyle(!!errors.name), paddingLeft: 36 }}
                                            onFocus={e => e.target.style.borderColor = "var(--gold)"}
                                            onBlur={e => e.target.style.borderColor = errors.name ? "var(--red)" : "var(--ink-7)"}
                                        />
                                    </div>
                                    {errors.name && <p style={errorStyle}>{errors.name}</p>}
                                </div>
                                <div>
                                    <label style={labelStyle}>WhatsApp Number <span style={{ color: "var(--red)" }}>*</span></label>
                                    <div style={{ position: "relative" }}>
                                        <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                                            <Icon d={Icons.phone} size={15} color="var(--ink-5)" />
                                        </div>
                                        <input
                                            type="tel" placeholder="10-digit mobile number" value={form.phone}
                                            onChange={e => update("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                                            style={{ ...inputStyle(!!errors.phone), paddingLeft: 36 }}
                                            onFocus={e => e.target.style.borderColor = "var(--gold)"}
                                            onBlur={e => e.target.style.borderColor = errors.phone ? "var(--red)" : "var(--ink-7)"}
                                        />
                                    </div>
                                    {errors.phone && <p style={errorStyle}>{errors.phone}</p>}
                                </div>
                            </div>

                            <div>
                                <label style={labelStyle}>Email Address <span style={{ color: "var(--ink-5)", fontSize: 11, fontWeight: 400 }}>(optional)</span></label>
                                <div style={{ position: "relative" }}>
                                    <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                                        <Icon d={Icons.mail} size={15} color="var(--ink-5)" />
                                    </div>
                                    <input
                                        type="email" placeholder="your@email.com" value={form.email}
                                        onChange={e => update("email", e.target.value)}
                                        style={inputStyle()}
                                        onFocus={e => e.target.style.borderColor = "var(--gold)"}
                                        onBlur={e => e.target.style.borderColor = "var(--ink-7)"}
                                    />
                                </div>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 18 }}>
                                <div>
                                    <label style={labelStyle}>Affidavit Type <span style={{ color: "var(--red)" }}>*</span></label>
                                    <div style={{ position: "relative" }}>
                                        <select
                                            value={form.affidavitType}
                                            onChange={e => update("affidavitType", e.target.value)}
                                            style={{ ...inputStyle(!!errors.affidavitType), appearance: "none", paddingRight: 34, cursor: "pointer", background: "var(--white)" }}
                                            onFocus={e => e.target.style.borderColor = "var(--gold)"}
                                            onBlur={e => e.target.style.borderColor = errors.affidavitType ? "var(--red)" : "var(--ink-7)"}
                                        >
                                            <option value="" disabled>Select type…</option>
                                            {affidavitTypes.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                        <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                                            <Icon d={Icons.chevdown} size={14} color="var(--ink-5)" />
                                        </div>
                                    </div>
                                    {errors.affidavitType && <p style={errorStyle}>{errors.affidavitType}</p>}
                                </div>
                                <div>
                                    <label style={labelStyle}>How Urgent? <span style={{ color: "var(--red)" }}>*</span></label>
                                    <div style={{ position: "relative" }}>
                                        <select
                                            value={form.urgency}
                                            onChange={e => update("urgency", e.target.value)}
                                            style={{ ...inputStyle(!!errors.urgency), appearance: "none", paddingRight: 34, cursor: "pointer", background: "var(--white)" }}
                                            onFocus={e => e.target.style.borderColor = "var(--gold)"}
                                            onBlur={e => e.target.style.borderColor = errors.urgency ? "var(--red)" : "var(--ink-7)"}
                                        >
                                            <option value="" disabled>Select urgency…</option>
                                            {urgencyOptions.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                        <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                                            <Icon d={Icons.chevdown} size={14} color="var(--ink-5)" />
                                        </div>
                                    </div>
                                    {errors.urgency && <p style={errorStyle}>{errors.urgency}</p>}
                                </div>
                            </div>

                            <div>
                                <label style={labelStyle}>Purpose / Where will this be used? <span style={{ color: "var(--ink-5)", fontSize: 11, fontWeight: 400 }}>(optional)</span></label>
                                <input
                                    type="text" placeholder="e.g. Passport office, Bank KYC, Property registration…"
                                    value={form.purpose} onChange={e => update("purpose", e.target.value)}
                                    style={inputStyle()}
                                    onFocus={e => e.target.style.borderColor = "var(--gold)"}
                                    onBlur={e => e.target.style.borderColor = "var(--ink-7)"}
                                />
                            </div>

                            <div>
                                <label style={labelStyle}>Additional Details <span style={{ color: "var(--ink-5)", fontSize: 11, fontWeight: 400 }}>(optional)</span></label>
                                <textarea
                                    placeholder="Any specific requirements, names, dates, or details you'd like included in the affidavit…"
                                    value={form.message} onChange={e => update("message", e.target.value)} rows={3}
                                    style={{ ...inputStyle(), resize: "vertical", minHeight: 90, lineHeight: 1.55 }}
                                    onFocus={e => e.target.style.borderColor = "var(--gold)"}
                                    onBlur={e => e.target.style.borderColor = "var(--ink-7)"}
                                />
                            </div>

                            <div style={{ display: "flex", gap: 18, flexWrap: "wrap", padding: "4px 0", borderTop: "1px solid var(--ink-7)", paddingTop: 16 }}>
                                {[
                                    { icon: Icons.lock, color: "var(--ink-4)", text: "100% Confidential" },
                                    { icon: Icons.circle_check, color: "var(--emerald)", text: "Free Consultation" },
                                    { icon: Icons.clock, color: "var(--gold-dk)", text: "Reply in < 10 mins" },
                                ].map((b, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                                        <Icon d={b.icon} size={14} color={b.color} />
                                        <span style={{ fontSize: 12.5, color: "var(--ink-5)", fontFamily: "var(--sans)" }}>{b.text}</span>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="submit" disabled={loading}
                                style={{ width: "100%", background: loading ? "rgba(201,168,76,0.5)" : "var(--gold)", border: "none", borderRadius: 12, padding: "14px", color: "var(--ink)", fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: "var(--sans)", boxShadow: "0 8px 24px rgba(201,168,76,0.35)", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "opacity 0.2s" }}>
                                {loading ? (
                                    <><span style={{ width: 18, height: 18, border: "2px solid rgba(10,10,10,0.3)", borderTopColor: "var(--ink)", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} /> Connecting to WhatsApp…</>
                                ) : (
                                    <><Icon d={Icons.msg} size={18} color="var(--ink)" /> Get Free Quote on WhatsApp</>
                                )}
                            </button>

                            <p style={{ fontSize: 11, color: "var(--ink-5)", textAlign: "center", fontFamily: "var(--sans)", margin: 0 }}>
                                By submitting, you agree to our <a href="#" style={{ color: "var(--gold-dk)", textDecoration: "none" }}>Terms of Service</a> and <a href="#" style={{ color: "var(--gold-dk)", textDecoration: "none" }}>Privacy Policy</a>
                            </p>
                        </form>
                    </Reveal>
                )}
            </div>
        </section>
    );
};

// ─────────────────────────────────────────────
// PRICING (Ink & Gold)
// ─────────────────────────────────────────────

const PricingSection = () => {
    const tiers = [
        { name: "Essential", price: 999, desc: "For simple, straightforward affidavit needs", features: ["Standard affidavit drafting", "AI-powered generation", "Email support", "PDF download"], excluded: ["Expert lawyer review", "Notary guidance"], cta: "Get Essential" },
        { name: "Professional", price: 1999, desc: "Most comprehensive our recommended plan", features: ["Everything in Essential", "Expert lawyer review", "Unlimited revisions", "24/7 priority support", "Notary guidance"], excluded: [], cta: "Get Professional", popular: true },
        { name: "Enterprise", price: 4999, desc: "For businesses and bulk requirements", features: ["Everything in Professional", "Bulk document processing", "Dedicated account manager", "Legal compliance certificate", "Custom templates"], excluded: [], cta: "Contact Sales" },
    ];

    return (
        <section id="pricing" style={{ padding: "clamp(48px, 10vw, 96px) 20px", background: "var(--white)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: "clamp(36px, 7vw, 56px)" }}>
                        <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 12 }}>Transparent Pricing</div>
                        <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(30px, 7vw, 52px)", fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.02em" }}>
                            Simple Plans, <span style={{ color: "var(--gold-dk)" }}>No Hidden Fees</span>
                        </h2>
                        <p style={{ fontSize: "clamp(14px, 3.5vw, 15px)", color: "var(--ink-5)", marginTop: 10, fontFamily: "var(--sans)" }}>One-time payment · Lifetime access to your document</p>
                    </div>
                </Reveal>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 290px), 1fr))", gap: 22, alignItems: "stretch" }}>
                    {tiers.map((t, i) => (
                        <Reveal key={i} delay={i * 100} style={{ height: "100%" }}>
                            <div style={{ background: t.popular ? "rgba(201,168,76,0.04)" : "var(--white)", border: t.popular ? "1px solid var(--gold)" : "1px solid var(--ink-7)", borderRadius: 22, padding: "30px 22px", position: "relative", height: "100%", display: "flex", flexDirection: "column" }}>
                                {t.popular && (<div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: "var(--gold)", borderRadius: 99, padding: "4px 14px", fontSize: 10, fontWeight: 700, color: "var(--ink)", fontFamily: "var(--mono)", whiteSpace: "nowrap" }}>MOST POPULAR</div>)}
                                <span style={{ fontSize: 13, fontWeight: 700, color: t.popular ? "var(--gold-dk)" : "var(--ink-4)", fontFamily: "var(--sans)", letterSpacing: "0.05em", textTransform: "uppercase" }}>{t.name}</span>
                                <div style={{ margin: "12px 0 6px" }}>
                                    <span style={{ fontFamily: "var(--serif)", fontSize: "clamp(44px, 7vw, 52px)", fontWeight: 700, color: "var(--ink)", lineHeight: 1 }}>₹{t.price.toLocaleString()}</span>
                                    <span style={{ fontSize: 12, color: "var(--ink-5)", fontFamily: "var(--sans)", marginLeft: 6 }}>/ one-time</span>
                                </div>
                                <p style={{ fontSize: 13, color: "var(--ink-5)", fontFamily: "var(--sans)", marginBottom: 22, lineHeight: 1.5 }}>{t.desc}</p>
                                <button onClick={() => openWhatsApp(`I'm interested in the ${t.name} plan at ₹${t.price}. Please tell me more.`)} style={{ width: "100%", background: t.popular ? "var(--gold)" : "transparent", border: t.popular ? "none" : "1px solid var(--ink-6)", borderRadius: 12, padding: "13px", color: t.popular ? "var(--ink)" : "var(--ink-4)", fontSize: 13.5, fontWeight: 600, cursor: "pointer", fontFamily: "var(--sans)", marginBottom: 22, flexShrink: 0 }}>
                                    {t.cta} on WhatsApp
                                </button>
                                <div style={{ borderTop: "1px solid var(--ink-7)", paddingTop: 18, display: "flex", flexDirection: "column", gap: 10, flexGrow: 1 }}>
                                    {t.features.map((f, j) => (
                                        <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                                            <Icon d={Icons.check} size={13} color="var(--emerald)" style={{ flexShrink: 0, marginTop: 2 }} />
                                            <span style={{ fontSize: 13, color: "var(--ink-3)", fontFamily: "var(--sans)" }}>{f}</span>
                                        </div>
                                    ))}
                                    {t.excluded.map((f, j) => (
                                        <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 9, opacity: 0.45 }}>
                                            <Icon d={Icons.x} size={13} color="var(--ink-5)" style={{ flexShrink: 0, marginTop: 2 }} />
                                            <span style={{ fontSize: 13, color: "var(--ink-5)", fontFamily: "var(--sans)" }}>{f}</span>
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
    <section style={{ padding: "clamp(48px, 10vw, 96px) 20px", background: "var(--ink-8)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Reveal>
                <div style={{ textAlign: "center", marginBottom: "clamp(36px, 7vw, 52px)" }}>
                    <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 12 }}>Legal Assurance</div>
                    <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(30px, 7vw, 52px)", fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.02em", padding: "0 12px" }}>
                        Is an Online Affidavit <span style={{ color: "var(--gold-dk)" }}>Legally Valid</span> in India?
                    </h2>
                </div>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
                {[
                    { icon: Icons.circle_check, color: "var(--emerald)", title: "Legally Recognized", desc: "Yes fully valid in India when prepared in the proper format. Recognized under the Indian Evidence Act, 1872. Our documents are reviewed by experienced lawyers." },
                    { icon: Icons.gavel, color: "var(--gold-dk)", title: "Role of Notary & Stamp Paper", desc: "For most purposes, notarization is required. We provide complete guidance including recommended notary offices near you and exactly what documents to carry." },
                    { icon: Icons.building, color: "var(--ink)", title: "Where It's Accepted", desc: "Courts, banks, passport offices, educational institutions, government departments, visa applications, property registrations, and all legal proceedings nationwide." },
                ].map((card, i) => (
                    <Reveal key={i} delay={i * 100}>
                        <div style={{ background: "var(--white)", borderRadius: 18, padding: "26px 22px", border: "1px solid var(--ink-7)" }}>
                            <div style={{ width: 44, height: 44, background: "rgba(201,168,76,0.1)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                                <Icon d={card.icon} size={22} color={card.color} />
                            </div>
                            <h3 style={{ fontFamily: "var(--sans)", fontSize: 17, fontWeight: 700, color: "var(--ink)", marginBottom: 10 }}>{card.title}</h3>
                            <p style={{ fontSize: 13.5, color: "var(--ink-5)", lineHeight: 1.7, fontFamily: "var(--sans)" }}>{card.desc}</p>
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
        { initials: "SA", name: "Swapnil Anand", role: "Property Owner", content: "Took notary service for name change in property documents. The entire process was smooth got my registered affidavit within 24 hours. Saved me 3 trips to the notary office!", service: "Name Change" },
        { initials: "JK", name: "Jay Kumar", role: "Homeowner", content: "Needed an affidavit for electricity connection at my new house. NyayMitra delivered within 2 hours. Accepted by the electricity department without any issues whatsoever.", service: "Address Proof" },
        { initials: "RS", name: "Ramesh Sharma", role: "Business Owner", content: "The affidavit was perfect and legally sound. Saved me from multiple visits to the notary. Highly recommended for anyone needing quick, professional legal documentation.", service: "Income Proof" },
    ];

    return (
        <section style={{ padding: "clamp(48px, 10vw, 96px) 20px", background: "var(--white)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: "clamp(36px, 7vw, 52px)" }}>
                        <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 12 }}>Client Love</div>
                        <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(30px, 7vw, 52px)", fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.02em" }}>
                            Trusted by <span style={{ color: "var(--gold-dk)" }}>100+ Indians</span>
                        </h2>
                        <p style={{ fontSize: "clamp(13px, 3.5vw, 15px)", color: "var(--ink-5)", marginTop: 10, fontFamily: "var(--sans)" }}>Rated 4.9/5 based on 150+ verified reviews</p>
                    </div>
                </Reveal>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 22 }}>
                    {testimonials.map((item, i) => (
                        <Reveal key={i} delay={i * 110}>
                            <div style={{ background: "var(--ink-8)", border: "1px solid var(--ink-7)", borderRadius: 18, padding: "26px", display: "flex", flexDirection: "column" }}>
                                <span style={{ display: "inline-block", background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: 99, padding: "3px 12px", fontSize: 10, fontWeight: 600, color: "var(--gold-dk)", fontFamily: "var(--mono)", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 14 }}>{item.service}</span>
                                <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
                                    {[...Array(5)].map((_, j) => <Icon key={j} d={Icons.star} size={13} color="var(--gold)" />)}
                                </div>
                                <p style={{ fontSize: 14, color: "var(--ink-4)", lineHeight: 1.7, fontFamily: "var(--sans)", flexGrow: 1, margin: "0 0 22px", fontStyle: "italic" }}>"{item.content}"</p>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid var(--ink-7)", flexWrap: "wrap", gap: 10 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--sans)", fontSize: 13, fontWeight: 700, color: "var(--white)" }}>{item.initials}</div>
                                        <div>
                                            <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)", fontFamily: "var(--sans)" }}>{item.name}</div>
                                            <div style={{ fontSize: 12, color: "var(--ink-5)", fontFamily: "var(--sans)" }}>{item.role}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                        <Icon d={Icons.badge} size={13} color="var(--emerald)" />
                                        <span style={{ fontSize: 11, color: "var(--ink-5)", fontFamily: "var(--sans)" }}>Verified</span>
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
        { q: "What documents are required?", a: "Typically: identity proof (Aadhaar, PAN, Voter ID, or Passport), address proof, and documents related to your affidavit type. Our team will guide you on WhatsApp usually just clear photos are sufficient." },
        { q: "Can I use an affidavit for passport or visa applications?", a: "Absolutely. Many passport and visa applications require affidavits for name change, address proof, or relationship verification. Our affidavits are formatted to meet Passport Seva Kendra and embassy requirements." },
        { q: "What if I need changes after receiving the draft?", a: "We offer unlimited free revisions until you are 100% satisfied. Share your feedback on WhatsApp and we'll update promptly. No hidden charges, no questions asked." },
        { q: "Is my personal information kept secure?", a: "Your data is protected with 256-bit SSL encryption. Documents are permanently deleted from our servers after 30 days. We never share your information with third parties." },
    ];

    return (
        <section id="faqs" style={{ padding: "clamp(48px, 10vw, 96px) 20px", background: "var(--ink-8)" }}>
            <div style={{ maxWidth: 780, margin: "0 auto" }}>
                <Reveal>
                    <div style={{ textAlign: "center", marginBottom: "clamp(36px, 7vw, 52px)" }}>
                        <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 12 }}>FAQs</div>
                        <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(30px, 7vw, 52px)", fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.02em" }}>
                            Common <span style={{ color: "var(--gold-dk)" }}>Questions</span>
                        </h2>
                    </div>
                </Reveal>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {faqs.map((f, i) => (
                        <Reveal key={i} delay={Math.min(i * 50, 250)}>
                            <div style={{ background: open === i ? "rgba(201,168,76,0.06)" : "var(--white)", border: open === i ? "1px solid var(--gold)" : "1px solid var(--ink-7)", borderRadius: 14, overflow: "hidden", transition: "all 0.2s" }}>
                                <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", textAlign: "left", padding: "16px 20px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                                    <span style={{ fontSize: "clamp(13.5px, 3.8vw, 15px)", fontWeight: 600, color: "var(--ink)", fontFamily: "var(--sans)", lineHeight: 1.45, paddingRight: 8 }}>{f.q}</span>
                                    <Icon d={Icons.chevdown} size={17} color="var(--ink-5)" style={{ flexShrink: 0, transition: "transform 0.3s", transform: open === i ? "rotate(180deg)" : "none" }} />
                                </button>
                                {open === i && (
                                    <div style={{ padding: "0 20px 18px 20px" }}>
                                        <p style={{ fontSize: "clamp(13px, 3.5vw, 14px)", color: "var(--ink-5)", lineHeight: 1.7, margin: 0, fontFamily: "var(--sans)" }}>{f.a}</p>
                                    </div>
                                )}
                            </div>
                        </Reveal>
                    ))}
                </div>
                <Reveal delay={300}>
                    <div style={{ textAlign: "center", marginTop: 40 }}>
                        <button onClick={() => openWhatsApp("I have a question about affidavits.")} style={{ background: "transparent", border: "1px solid var(--gold)", borderRadius: 12, padding: "11px 28px", color: "var(--gold-dk)", fontSize: 13.5, fontWeight: 600, cursor: "pointer", fontFamily: "var(--sans)", display: "inline-flex", alignItems: "center", gap: 8 }}>
                            <Icon d={Icons.msg} size={15} color="var(--gold-dk)" /> Still have questions? Ask on WhatsApp
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
    <section style={{ padding: "clamp(60px, 12vw, 100px) 20px", background: "linear-gradient(145deg, var(--white) 0%, var(--ink-8) 100%)" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
            <Reveal>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(34px, 8vw, 68px)", fontWeight: 700, color: "var(--ink)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 18px", padding: "0 12px" }}>
                    Create Your Affidavit<br /><span className="gold-shimmer">in Minutes</span>
                </h2>
                <p style={{ fontSize: "clamp(14px, 4vw, 17px)", color: "var(--ink-5)", fontFamily: "var(--sans)", marginBottom: 36, lineHeight: 1.6, padding: "0 16px" }}>
                    Join 100+ satisfied customers. Start your affidavit on WhatsApp or get a free quote now.
                </p>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginBottom: 28 }}>
                    <button onClick={() => document.querySelector("#get-started")?.scrollIntoView({ behavior: "smooth" })} style={{ background: "var(--gold)", border: "none", borderRadius: 8, padding: "13px 28px", color: "var(--ink)", fontSize: "clamp(14px, 3.5vw, 15px)", fontWeight: 700, cursor: "pointer", fontFamily: "var(--sans)", boxShadow: "0 10px 32px rgba(201,168,76,0.4)", display: "flex", alignItems: "center", gap: 9 }}>
                        <Icon d={Icons.file} size={17} color="var(--ink)" /> Get Free Quote from ₹999
                    </button>
                    <button onClick={() => openWhatsApp("Can I request a callback from NyayMitra?")} style={{ background: "transparent", border: "1px solid var(--ink-6)", borderRadius: 8, padding: "13px 28px", color: "var(--ink-3)", fontSize: "clamp(14px, 3.5vw, 15px)", fontWeight: 600, cursor: "pointer", fontFamily: "var(--sans)", display: "flex", alignItems: "center", gap: 9 }}>
                        <Icon d={Icons.phone} size={17} /> Request Callback
                    </button>
                </div>
                <div style={{ display: "flex", gap: "clamp(14px, 4vw, 24px)", flexWrap: "wrap", justifyContent: "center" }}>
                    {["Free Expert Consultation", "30-Day Money-Back", "100% Legally Valid"].map((item, i) => (
                        <span key={i} style={{ fontSize: 12.5, color: "var(--ink-5)", fontFamily: "var(--sans)", display: "flex", alignItems: "center", gap: 6 }}>
                            <Icon d={Icons.check} size={13} color="var(--emerald)" /> {item}
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
        <footer style={{ background: "var(--white)", borderTop: "1px solid var(--ink-7)" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "44px 20px 28px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 40, marginBottom: 44 }}>
                    <div style={{ minWidth: 200, flex: "1 1 200px" }}>
                        <Logo onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
                        <p style={{ fontSize: 13, color: "var(--ink-5)", fontFamily: "var(--sans)", lineHeight: 1.6, maxWidth: 230, margin: "16px 0 18px" }}>
                            Legally valid affidavits online in minutes. Expert reviewed, court approved, trusted by Indians.
                        </p>
                        <div style={{ display: "flex", gap: 10 }}>
                            {[{ href: "https://wa.me/919661644025", icon: Icons.msg }, { href: "mailto:support@nyaymitra.com", icon: Icons.mail }, { href: "tel:+919661644025", icon: Icons.phone }].map((s, i) => (
                                <a key={i} href={s.href} target={i === 0 ? "_blank" : undefined} rel="noopener noreferrer" style={{ width: 34, height: 34, borderRadius: 9, background: "var(--ink-8)", border: "1px solid var(--ink-7)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-4)" }}>
                                    <Icon d={s.icon} size={14} color="var(--ink-4)" />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 28, flex: "2" }}>
                        {cols.map(col => (
                            <div key={col.title}>
                                <span style={{ fontSize: 11.5, fontWeight: 700, color: "var(--ink)", fontFamily: "var(--sans)", letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: 14 }}>{col.title}</span>
                                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                                    {col.links.map((l, i) => <a key={i} href="#" style={{ fontSize: 13, color: "var(--ink-5)", fontFamily: "var(--sans)", textDecoration: "none" }}>{l}</a>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ paddingTop: 22, borderTop: "1px solid var(--ink-7)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                    <span style={{ fontSize: 12, color: "var(--ink-5)", fontFamily: "var(--sans)" }}>© {year} NyayMitra. All rights reserved.</span>
                    <span style={{ fontSize: 12, color: "var(--ink-5)", fontFamily: "var(--sans)" }}>Made with care in India 🇮🇳</span>
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
            <button onClick={() => document.querySelector("#get-started")?.scrollIntoView({ behavior: "smooth" })} style={{ background: "var(--gold)", border: "none", borderRadius: 99, padding: "11px 22px", color: "var(--ink)", fontSize: 13.5, fontWeight: 700, cursor: "pointer", fontFamily: "var(--sans)", boxShadow: "0 6px 24px rgba(201,168,76,0.5)", display: "flex", alignItems: "center", gap: 8 }}>
                <Icon d={Icons.file} size={15} color="var(--ink)" /> Get Free Quote
            </button>
            <button onClick={() => openWhatsApp("I have a question about NyayMitra.")} style={{ background: "rgba(255,255,255,0.96)", backdropFilter: "blur(12px)", border: "1px solid var(--ink-6)", borderRadius: 99, padding: "9px 18px", color: "var(--ink-3)", fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: "var(--sans)", display: "flex", alignItems: "center", gap: 7 }}>
                <Icon d={Icons.msg} size={13} color="var(--ink-4)" /> Need Help?
            </button>
        </div>
    );
};

// ─────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────

export default function NyayMitraLandingPage() {
    return (
        <>
            <GlobalStyles />
            <main style={{ minHeight: "100vh", background: "var(--white)", overflowX: "hidden" }}>
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