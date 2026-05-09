"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import {
    Scale, Star, MapPin, Clock, Video, Phone, MessageCircle,
    Search, User, Award, Calendar, Loader, AlertCircle,
    SlidersHorizontal, X, Sparkles, CheckCircle, Menu,
    Briefcase, ChevronRight, LayoutGrid, List, Rows3,
    Filter, TrendingUp, Zap, Shield, ChevronDown, Globe,
    BarChart2, ArrowUpRight,
} from "lucide-react"
import Link from "next/link"

// ─── Global Styles ────────────────────────────────────────────────────────────
function GlobalStyles() {
    useEffect(() => {
        const styleId = "lawyers-listing-styles"
        if (document.getElementById(styleId)) return
        const style = document.createElement("style")
        style.id = styleId
        style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=DM+Mono:wght@400;500&display=swap');

      :root {
        --ink:       #0a0a0a; --ink-2:#1a1a1a; --ink-3:#3a3a3a; --ink-4:#6b6b6b;
        --ink-5:     #9a9a9a; --ink-6:#c8c8c8; --ink-7:#e8e8e8; --ink-8:#f4f3f0;
        --parchment: #faf9f6; --white:#ffffff;
        --gold:      #c9a84c; --gold-lt:#e8c96a; --gold-dk:#8b6914; --gold-pale:#fdf6e3;
        --emerald:   #10b981; --red:#c0392b;
        --serif:     'Cormorant Garamond',Georgia,serif;
        --sans:      'DM Sans',system-ui,sans-serif;
        --mono:      'DM Mono',monospace;
      }

      *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
      html { scroll-behavior:smooth; }
      body { background:var(--white); color:var(--ink); font-family:var(--sans); -webkit-font-smoothing:antialiased; }

      @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
      @keyframes pulse-ring { 0%{transform:scale(1);opacity:1} 100%{transform:scale(1.5);opacity:0} }
      @keyframes spin { to{transform:rotate(360deg)} }

      .gold-shimmer {
        background:linear-gradient(100deg,var(--gold-dk) 0%,var(--gold) 30%,var(--gold-lt) 50%,var(--gold) 70%,var(--gold-dk) 100%);
        background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent;
        background-clip:text; animation:shimmer 4s linear infinite;
      }
      .reveal { opacity:0; transform:translateY(20px); transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1); }
      .reveal.on { opacity:1; transform:translateY(0); }

      /* View toggle buttons */
      .view-btn {
        display:inline-flex; align-items:center; gap:5px; padding:6px 10px;
        border:1px solid var(--ink-7); border-radius:8px; background:var(--white);
        cursor:pointer; font-size:11px; font-family:var(--sans); color:var(--ink-5);
        transition:all .15s;
      }
      .view-btn.active { background:var(--ink); color:var(--white); border-color:var(--ink); }
      .view-btn:hover:not(.active) { border-color:var(--ink-5); color:var(--ink); }

      /* ── GRID CARD ── */
      .grid-card {
        position:relative; overflow:hidden;
        background:var(--white); border:1px solid var(--ink-7); border-radius:16px;
        transition:all .25s cubic-bezier(.22,1,.36,1);
        display:flex; flex-direction:column;
        animation:fadeUp .5s cubic-bezier(.22,1,.36,1) both;
      }
      .grid-card:hover { transform:translateY(-4px); box-shadow:0 16px 40px rgba(0,0,0,.07); border-color:var(--ink-6); }
      .grid-card-accent { position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,transparent,var(--gold),transparent); opacity:0; transition:opacity .25s; }
      .grid-card:hover .grid-card-accent { opacity:1; }

      /* ── COMPACT LIST ROW ── */
      .list-row {
        display:flex; align-items:center; gap:14px;
        padding:12px 16px; border-bottom:1px solid var(--ink-8);
        background:var(--white); transition:background .15s;
        animation:fadeUp .4s cubic-bezier(.22,1,.36,1) both;
      }
      .list-row:last-child { border-bottom:none; }
      .list-row:hover { background:var(--parchment); }

      /* ── EDITORIAL (magazine) CARD ── */
      .editorial-card {
        position:relative; border-radius:16px; overflow:hidden;
        border:1px solid var(--ink-7); background:var(--white);
        transition:all .25s cubic-bezier(.22,1,.36,1);
        animation:fadeUp .5s cubic-bezier(.22,1,.36,1) both;
      }
      .editorial-card:hover { transform:translateY(-3px); box-shadow:0 20px 50px rgba(0,0,0,.08); }
      .editorial-card.featured { grid-column:span 2; }
      @media (max-width:768px) { .editorial-card.featured { grid-column:span 1; } }

      /* Avatar */
      .avatar-wrap { position:relative; flex-shrink:0; }
      .avatar-img {
        border-radius:50%; object-fit:cover; display:block;
        border:2px solid var(--ink-8);
      }
      .online-dot {
        position:absolute; bottom:1px; right:1px;
        width:10px; height:10px; border-radius:50%;
        background:var(--emerald); border:2px solid var(--white);
      }
      .online-dot::before {
        content:''; position:absolute; inset:-3px; border-radius:50%;
        border:1px solid var(--emerald); animation:pulse-ring 2s ease-out infinite;
      }
      .verified-badge {
        position:absolute; bottom:-2px; right:-2px;
        width:16px; height:16px; border-radius:50%;
        background:var(--gold); border:2px solid var(--white);
        display:flex; align-items:center; justify-content:center;
      }

      /* Spec pills */
      .spec-pill {
        font-size:9px; padding:2px 7px; border-radius:100px;
        background:var(--ink-8); color:var(--ink-4); white-space:nowrap;
        font-family:var(--mono); letter-spacing:.03em;
      }
      .spec-pill.primary { background:var(--gold-pale); color:var(--gold-dk); border:1px solid rgba(201,168,76,.2); }

      /* Stat chip */
      .stat-chip { display:flex; align-items:center; gap:3px; font-size:10px; color:var(--ink-5); }

      /* Rating stars */
      .stars { display:flex; gap:1px; }

      /* Book btn */
      .book-btn {
        display:inline-flex; align-items:center; gap:6px;
        background:var(--ink); color:var(--white);
        border:none; border-radius:8px; padding:7px 14px;
        font-size:11px; font-weight:600; font-family:var(--sans);
        cursor:pointer; transition:all .2s; white-space:nowrap;
      }
      .book-btn:hover { background:var(--gold); color:var(--ink); }
      .book-btn.gold { background:var(--gold); color:var(--ink); }
      .book-btn.gold:hover { background:var(--gold-lt); }

      /* Ghost btn */
      .ghost-btn {
        display:inline-flex; align-items:center; gap:4px;
        background:transparent; color:var(--ink-4);
        border:1px solid var(--ink-7); border-radius:7px; padding:5px 10px;
        font-size:10px; font-family:var(--sans); cursor:pointer; transition:all .15s;
      }
      .ghost-btn:hover { border-color:var(--ink-5); color:var(--ink); }

      /* Search & filter bar */
      .search-wrap {
        display:flex; align-items:center; gap:8px;
        background:var(--white); border:1px solid var(--ink-7); border-radius:10px;
        padding:8px 14px; transition:border-color .2s;
      }
      .search-wrap:focus-within { border-color:var(--gold); box-shadow:0 0 0 3px rgba(201,168,76,.08); }
      .search-input { flex:1; border:none; outline:none; font-size:13px; font-family:var(--sans); background:transparent; min-width:80px; }

      /* Filter pill select */
      .filter-select {
        appearance:none; -webkit-appearance:none;
        padding:6px 28px 6px 10px; border:1px solid var(--ink-7); border-radius:8px;
        background:var(--white) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%239a9a9a' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat right 9px center;
        font-size:11px; font-family:var(--sans); color:var(--ink-4); cursor:pointer;
        transition:border-color .15s;
      }
      .filter-select:focus { outline:none; border-color:var(--gold); }

      /* Divider label */
      .divider-label {
        display:flex; align-items:center; gap:10px;
        font-family:var(--mono); font-size:9px; color:var(--ink-5);
        letter-spacing:.15em; text-transform:uppercase; margin:20px 0 12px;
      }
      .divider-label::before,.divider-label::after { content:''; flex:1; height:1px; background:var(--ink-7); }

      /* Mode icons row */
      .mode-icons { display:flex; gap:4px; }
      .mode-icon {
        width:22px; height:22px; border-radius:6px; border:1px solid var(--ink-7);
        display:flex; align-items:center; justify-content:center;
        color:var(--ink-5); font-size:11px;
      }
      .mode-icon.active { background:var(--ink-8); color:var(--ink); border-color:var(--ink-6); }

      /* Skeleton */
      .skel { background:linear-gradient(90deg,var(--ink-8) 25%,var(--ink-7) 50%,var(--ink-8) 75%); background-size:200% 100%; animation:shimmer 1.4s infinite; border-radius:4px; }

      /* Tabs for quick filters */
      .quick-filter {
        display:inline-flex; align-items:center; gap:5px; padding:5px 12px;
        border:1px solid var(--ink-7); border-radius:100px; font-size:11px;
        background:var(--white); cursor:pointer; white-space:nowrap;
        transition:all .15s; font-family:var(--sans); color:var(--ink-4);
      }
      .quick-filter:hover { border-color:var(--gold); color:var(--gold-dk); background:var(--gold-pale); }
      .quick-filter.active { background:var(--ink); color:var(--white); border-color:var(--ink); }

      /* Fee display */
      .fee { font-family:var(--serif); font-size:20px; font-weight:700; color:var(--ink); line-height:1; }
      .fee-sm { font-family:var(--serif); font-size:15px; font-weight:600; }

      /* Experience bar */
      .exp-bar-wrap { height:3px; background:var(--ink-8); border-radius:100px; overflow:hidden; margin-top:4px; }
      .exp-bar { height:100%; background:linear-gradient(90deg,var(--gold-dk),var(--gold)); border-radius:100px; }

      /* Responsive grid layouts */
      .lawyers-grid-3 { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
      .lawyers-grid-2 { display:grid; grid-template-columns:repeat(2,1fr); gap:14px; }
      .lawyers-editorial { display:grid; grid-template-columns:repeat(2,1fr); gap:14px; }
      @media (max-width:1024px) { .lawyers-grid-3 { grid-template-columns:repeat(2,1fr); } }
      @media (max-width:768px) {
        .lawyers-grid-3,.lawyers-grid-2,.lawyers-editorial { grid-template-columns:1fr; }
        .editorial-card.featured { grid-column:span 1; }
      }
      .lawyers-list { display:flex; flex-direction:column; border:1px solid var(--ink-7); border-radius:14px; overflow:hidden; }

      /* Container */
      .ll-container { max-width:1200px; margin:0 auto; padding:0 24px; }
      @media (max-width:640px) { .ll-container { padding:0 14px; } }

      /* Sticky controls bar */
      .controls-bar {
        position:sticky; top:60px; z-index:50; background:rgba(255,255,255,.95);
        backdrop-filter:blur(12px); border-bottom:1px solid var(--ink-7);
        padding:10px 0;
      }

      /* Pagination-style load more */
      .load-more-row { display:flex; align-items:center; justify-content:center; gap:8px; padding:24px 0; }

      /* Tooltip hover card */
      .lang-dot { width:6px; height:6px; border-radius:50%; background:var(--gold); display:inline-block; }

      /* Available now indicator */
      .avail-badge {
        display:inline-flex; align-items:center; gap:4px;
        font-size:9px; padding:2px 7px; border-radius:100px;
        background:rgba(16,185,129,.1); color:var(--emerald);
        border:1px solid rgba(16,185,129,.2); font-family:var(--mono);
      }
    `
        document.head.appendChild(style)
    }, [])
    return null
}

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Lawyer {
    id: string
    userId: string
    fullName: string
    specialization: string[]
    experience: number
    rating: number
    reviews: number
    city: string
    state: string
    languages: string[]
    consultationFee: number
    profilePhoto?: string
    verified: boolean
    bio: string
    consultationModes: { video: boolean; call: boolean; chat: boolean; inPerson: boolean }
    kycStatus: string
    availableNow?: boolean
}

type ViewMode = "grid" | "list" | "editorial"

// ─── Constants ─────────────────────────────────────────────────────────────────
const SPECIALIZATIONS = [
    "All", "Criminal", "Civil", "Family", "Divorce",
    "Property", "Corporate", "Cyber Crime", "Consumer Court",
    "Labour", "Tax", "Cheque Bounce",
]
const STATES = ["All States", "Bihar", "Delhi", "Gujarat", "Haryana", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal"]
const LANGUAGES = ["All Languages", "Hindi", "English", "Marathi", "Gujarati", "Telugu", "Tamil", "Kannada", "Bengali", "Punjabi"]
const AVATAR_COLORS = ["#1a2a1e", "#1e2035", "#2a1a1a", "#1a2535", "#261e10", "#1d2a26", "#2b1e35"]

const PAGE_SIZE = 12

// ─── Sub-components ────────────────────────────────────────────────────────────
function LawyerAvatar({ lawyer, size = 48 }: { lawyer: Lawyer; size?: number }) {
    const initials = lawyer.fullName.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase()
    const color = AVATAR_COLORS[lawyer.fullName.length % AVATAR_COLORS.length]
    return (
        <div className="avatar-wrap" style={{ width: size, height: size }}>
            {lawyer.profilePhoto ? (
                <img src={lawyer.profilePhoto} alt={lawyer.fullName} className="avatar-img" style={{ width: size, height: size }} />
            ) : (
                <div style={{
                    width: size, height: size, borderRadius: "50%", background: color, color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--serif)", fontSize: size * 0.36, fontWeight: 600,
                    border: "2px solid var(--ink-8)",
                }}>{initials}</div>
            )}
            {lawyer.availableNow && <div className="online-dot" />}
            {lawyer.kycStatus === "verified" && !lawyer.availableNow && (
                <div className="verified-badge"><Award size={7} color="var(--ink)" /></div>
            )}
        </div>
    )
}

function RatingStars({ rating }: { rating: number }) {
    return (
        <div className="stars">
            {[1, 2, 3, 4, 5].map(s => (
                <Star key={s} size={9} style={{ color: s <= Math.round(rating) ? "var(--gold)" : "var(--ink-7)", fill: s <= Math.round(rating) ? "var(--gold)" : "var(--ink-7)" }} />
            ))}
        </div>
    )
}

function ModeIcons({ modes }: { modes: Lawyer["consultationModes"] }) {
    return (
        <div className="mode-icons">
            <div className={`mode-icon ${modes.video ? "active" : ""}`} title="Video"><Video size={11} /></div>
            <div className={`mode-icon ${modes.call ? "active" : ""}`} title="Call"><Phone size={11} /></div>
            <div className={`mode-icon ${modes.chat ? "active" : ""}`} title="Chat"><MessageCircle size={11} /></div>
            <div className={`mode-icon ${modes.inPerson ? "active" : ""}`} title="In-person"><User size={11} /></div>
        </div>
    )
}

function ExperienceBar({ years }: { years: number }) {
    const pct = Math.min((years / 30) * 100, 100)
    return (
        <div className="exp-bar-wrap">
            <div className="exp-bar" style={{ width: `${pct}%` }} />
        </div>
    )
}

// ─── Card variants ─────────────────────────────────────────────────────────────
function GridCard({ lawyer, delay, onBook }: { lawyer: Lawyer; delay: number; onBook: (l: Lawyer) => void }) {
    return (
        <div className="grid-card" style={{ animationDelay: `${delay}ms` }}>
            <div className="grid-card-accent" />

            {/* Top area */}
            <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid var(--ink-8)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <LawyerAvatar lawyer={lawyer} size={46} />
                    <div style={{ textAlign: "right" }}>
                        <div className="fee">₹{lawyer.consultationFee.toLocaleString()}</div>
                        <div style={{ fontSize: "9px", color: "var(--ink-5)", fontFamily: "var(--mono)" }}>per session</div>
                    </div>
                </div>

                <div style={{ marginBottom: 6 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap", marginBottom: 3 }}>
                        <h3 style={{ fontFamily: "var(--serif)", fontSize: 15, fontWeight: 600, lineHeight: 1.2 }}>{lawyer.fullName}</h3>
                        {lawyer.kycStatus === "verified" && (
                            <span style={{ fontSize: "8px", padding: "1px 5px", background: "rgba(16,185,129,.1)", color: "var(--emerald)", borderRadius: 100, border: "1px solid rgba(16,185,129,.2)" }}>✓</span>
                        )}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                        {lawyer.specialization.slice(0, 1).map(s => (
                            <span key={s} className="spec-pill primary">{s}</span>
                        ))}
                        {lawyer.specialization.slice(1, 2).map(s => (
                            <span key={s} className="spec-pill">{s}</span>
                        ))}
                        {lawyer.specialization.length > 2 && <span className="spec-pill">+{lawyer.specialization.length - 2}</span>}
                    </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <RatingStars rating={lawyer.rating} />
                        <span style={{ fontSize: "10px", color: "var(--ink-4)", fontFamily: "var(--mono)" }}>{lawyer.rating.toFixed(1)}</span>
                    </div>
                    <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--ink-7)", display: "inline-block" }} />
                    <span className="stat-chip"><MapPin size={9} /> {lawyer.city || lawyer.state}</span>
                    {lawyer.availableNow && <span className="avail-badge"><span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--emerald)", display: "inline-block" }} />Now</span>}
                </div>
            </div>

            {/* Middle info */}
            <div style={{ padding: "10px 16px", flex: 1 }}>
                <div style={{ marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                        <span style={{ fontSize: "9px", color: "var(--ink-5)", fontFamily: "var(--mono)", textTransform: "uppercase", letterSpacing: ".1em" }}>Experience</span>
                        <span style={{ fontSize: "10px", fontWeight: 600, fontFamily: "var(--mono)", color: "var(--ink-3)" }}>{lawyer.experience}y</span>
                    </div>
                    <ExperienceBar years={lawyer.experience} />
                </div>
                <p style={{
                    fontSize: "10px", color: "var(--ink-5)", lineHeight: 1.55, marginBottom: 8,
                    display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden"
                }}>
                    {lawyer.bio}
                </p>
                <ModeIcons modes={lawyer.consultationModes} />
            </div>

            {/* Bottom CTA */}
            <div style={{ padding: "10px 16px 14px", display: "flex", gap: 6, alignItems: "center" }}>
                <button className="book-btn gold" style={{ flex: 1, justifyContent: "center" }} onClick={() => onBook(lawyer)}>
                    <Calendar size={11} /> Book Now
                </button>
                <Link href={`/lawyers/${lawyer.id}`} style={{ textDecoration: "none" }}>
                    <button className="ghost-btn">
                        <ArrowUpRight size={10} />
                    </button>
                </Link>
            </div>
        </div>
    )
}

function ListRow({ lawyer, delay, onBook }: { lawyer: Lawyer; delay: number; onBook: (l: Lawyer) => void }) {
    return (
        <div className="list-row" style={{ animationDelay: `${delay}ms` }}>
            <LawyerAvatar lawyer={lawyer} size={40} />

            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 2 }}>
                    <span style={{ fontFamily: "var(--serif)", fontSize: 14, fontWeight: 600 }}>{lawyer.fullName}</span>
                    <span className="spec-pill primary">{lawyer.specialization[0]}</span>
                    {lawyer.availableNow && <span className="avail-badge"><span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--emerald)", display: "inline-block" }} />Available</span>}
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                    <span className="stat-chip"><Clock size={9} />{lawyer.experience}y exp</span>
                    <span className="stat-chip"><MapPin size={9} />{lawyer.city || lawyer.state}</span>
                    <span className="stat-chip"><Star size={9} style={{ fill: "var(--gold)", color: "var(--gold)" }} />{lawyer.rating.toFixed(1)} ({lawyer.reviews})</span>
                    <ModeIcons modes={lawyer.consultationModes} />
                </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                <div style={{ textAlign: "right" }}>
                    <div className="fee-sm">₹{lawyer.consultationFee.toLocaleString()}</div>
                    <div style={{ fontSize: "8px", color: "var(--ink-5)", fontFamily: "var(--mono)" }}>/ consult</div>
                </div>
                <button className="book-btn" style={{ padding: "6px 12px" }} onClick={() => onBook(lawyer)}>
                    <Calendar size={10} /> Book
                </button>
            </div>
        </div>
    )
}

function EditorialCard({ lawyer, delay, featured, onBook }: { lawyer: Lawyer; delay: number; featured?: boolean; onBook: (l: Lawyer) => void }) {
    const initials = lawyer.fullName.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase()
    const bgColor = AVATAR_COLORS[lawyer.fullName.length % AVATAR_COLORS.length]

    return (
        <div className={`editorial-card ${featured ? "featured" : ""}`} style={{ animationDelay: `${delay}ms` }}>
            {/* Colored header strip with avatar */}
            <div style={{ background: bgColor, padding: featured ? "24px 20px 18px" : "18px 16px 14px", position: "relative", overflow: "hidden" }}>
                {/* Decorative pattern */}
                <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: "50%", border: "1px solid rgba(255,255,255,.08)" }} />
                <div style={{ position: "absolute", top: 10, right: 10, width: 60, height: 60, borderRadius: "50%", border: "1px solid rgba(255,255,255,.05)" }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        {lawyer.profilePhoto ? (
                            <img src={lawyer.profilePhoto} alt={lawyer.fullName} style={{ width: featured ? 52 : 44, height: featured ? 52 : 44, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(255,255,255,.2)" }} />
                        ) : (
                            <div style={{ width: featured ? 52 : 44, height: featured ? 52 : 44, borderRadius: "50%", background: "rgba(255,255,255,.12)", border: "2px solid rgba(255,255,255,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--serif)", fontSize: featured ? 20 : 17, color: "rgba(255,255,255,.9)" }}>{initials}</div>
                        )}
                        <div>
                            <div style={{ fontFamily: "var(--serif)", fontSize: featured ? 17 : 14, fontWeight: 600, color: "rgba(255,255,255,.95)", lineHeight: 1.2, marginBottom: 3 }}>{lawyer.fullName}</div>
                            <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                                {lawyer.specialization.slice(0, featured ? 2 : 1).map(s => (
                                    <span key={s} style={{ fontSize: "8px", padding: "2px 7px", borderRadius: 100, background: "rgba(255,255,255,.15)", color: "rgba(255,255,255,.8)", fontFamily: "var(--mono)", letterSpacing: ".04em" }}>{s}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <div style={{ fontFamily: "var(--serif)", fontSize: featured ? 22 : 18, fontWeight: 700, color: "rgba(255,255,255,.95)" }}>₹{lawyer.consultationFee.toLocaleString()}</div>
                        <div style={{ fontSize: "8px", color: "rgba(255,255,255,.5)", fontFamily: "var(--mono)" }}>per consult</div>
                    </div>
                </div>

                {lawyer.availableNow && (
                    <div style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 4, fontSize: "8px", padding: "2px 8px", borderRadius: 100, background: "rgba(16,185,129,.2)", color: "#6ee7b7", border: "1px solid rgba(16,185,129,.25)", fontFamily: "var(--mono)" }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#6ee7b7", display: "inline-block" }} />Available now
                    </div>
                )}
            </div>

            {/* Body */}
            <div style={{ padding: featured ? "14px 18px 16px" : "12px 14px 14px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 8 }}>
                    <span className="stat-chip"><Clock size={9} />{lawyer.experience}y exp</span>
                    <span className="stat-chip"><MapPin size={9} />{lawyer.city || lawyer.state}</span>
                    <span className="stat-chip"><Globe size={9} />{lawyer.languages.slice(0, 2).join(", ")}</span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: featured ? 8 : 6 }}>
                    <RatingStars rating={lawyer.rating} />
                    <span style={{ fontSize: "10px", fontFamily: "var(--mono)", color: "var(--ink-4)" }}>{lawyer.rating.toFixed(1)} · {lawyer.reviews} reviews</span>
                </div>

                {featured && (
                    <p style={{
                        fontSize: "11px", color: "var(--ink-5)", lineHeight: 1.6, marginBottom: 10,
                        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden"
                    }}>
                        {lawyer.bio}
                    </p>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <ModeIcons modes={lawyer.consultationModes} />
                    <div style={{ display: "flex", gap: 5 }}>
                        <button className="book-btn gold" style={{ padding: "5px 12px", fontSize: "10px" }} onClick={() => onBook(lawyer)}>
                            <Calendar size={10} /> Book
                        </button>
                        <Link href={`/lawyers/${lawyer.id}`} style={{ textDecoration: "none" }}>
                            <button className="ghost-btn"><ChevronRight size={10} /></button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

function SkeletonCard({ view }: { view: ViewMode }) {
    if (view === "list") {
        return (
            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", borderBottom: "1px solid var(--ink-8)" }}>
                <div className="skel" style={{ width: 40, height: 40, borderRadius: "50%", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                    <div className="skel" style={{ height: 12, width: "40%", marginBottom: 6 }} />
                    <div className="skel" style={{ height: 9, width: "60%" }} />
                </div>
                <div className="skel" style={{ height: 28, width: 70, borderRadius: 8 }} />
            </div>
        )
    }
    return (
        <div style={{ border: "1px solid var(--ink-7)", borderRadius: 16, overflow: "hidden" }}>
            <div className="skel" style={{ height: 80 }} />
            <div style={{ padding: 14 }}>
                <div className="skel" style={{ height: 12, width: "60%", marginBottom: 8 }} />
                <div className="skel" style={{ height: 9, width: "80%", marginBottom: 6 }} />
                <div className="skel" style={{ height: 9, width: "50%" }} />
            </div>
        </div>
    )
}

// ─── Reveal wrapper ─────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const el = ref.current; if (!el) return
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("on"); obs.disconnect() } }, { threshold: .1 })
        obs.observe(el)
        return () => obs.disconnect()
    }, [])
    return <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

// ─── Main component ─────────────────────────────────────────────────────────────
interface LawyerListingProps {
    lawyers: Lawyer[]
    loading: boolean
    error: string | null
    onBook: (lawyer: Lawyer) => void
}

export default function LawyerListing({ lawyers, loading, error, onBook }: LawyerListingProps) {
    const [view, setView] = useState<ViewMode>("grid")
    const [search, setSearch] = useState("")
    const [spec, setSpec] = useState("All")
    const [state, setState] = useState("All States")
    const [lang, setLang] = useState("All Languages")
    const [sort, setSort] = useState<"rating" | "experience" | "consultationFee" | "availableNow">("rating")
    const [page, setPage] = useState(1)
    const [showFilters, setShowFilters] = useState(false)
    const [onlyAvailable, setOnlyAvailable] = useState(false)

    // Reset page on filter change
    useEffect(() => { setPage(1) }, [search, spec, state, lang, sort, onlyAvailable])

    const filtered = lawyers
        .filter(l => {
            const t = search.toLowerCase()
            return (
                (!t || l.fullName.toLowerCase().includes(t) || l.specialization.some(s => s.toLowerCase().includes(t)) || l.city.toLowerCase().includes(t)) &&
                (spec === "All" || l.specialization.some(s => s.toLowerCase().includes(spec.toLowerCase()))) &&
                (state === "All States" || l.state === state) &&
                (lang === "All Languages" || l.languages.includes(lang)) &&
                (!onlyAvailable || l.availableNow)
            )
        })
        .sort((a, b) => {
            if (sort === "rating") return b.rating - a.rating
            if (sort === "experience") return b.experience - a.experience
            if (sort === "consultationFee") return a.consultationFee - b.consultationFee
            if (sort === "availableNow") return (b.availableNow ? 1 : 0) - (a.availableNow ? 1 : 0)
            return 0
        })

    const paged = filtered.slice(0, page * PAGE_SIZE)
    const hasMore = paged.length < filtered.length
    const activeFilters = [spec !== "All" ? spec : null, state !== "All States" ? state : null, lang !== "All Languages" ? lang : null].filter(Boolean)

    const resetFilters = () => { setSpec("All"); setState("All States"); setLang("All Languages"); setSearch(""); setSort("rating"); setOnlyAvailable(false) }

    const renderCards = () => {
        if (view === "list") {
            return (
                <div className="lawyers-list">
                    {paged.map((l, i) => <ListRow key={l.id} lawyer={l} delay={0} onBook={onBook} />)}
                </div>
            )
        }
        if (view === "editorial") {
            return (
                <div className="lawyers-editorial">
                    {paged.map((l, i) => (
                        <EditorialCard key={l.id} lawyer={l} delay={0} featured={i === 0} onBook={onBook} />
                    ))}
                </div>
            )
        }
        // Default: grid
        return (
            <div className="lawyers-grid-3">
                {paged.map((l, i) => <GridCard key={l.id} lawyer={l} delay={0} onBook={onBook} />)}
            </div>
        )
    }

    if (error) {
        return (
            <div style={{ textAlign: "center", padding: "48px 20px" }}>
                <AlertCircle size={32} color="var(--red)" style={{ marginBottom: 12 }} />
                <h3 style={{ fontFamily: "var(--serif)", fontSize: 20, marginBottom: 8 }}>Failed to load</h3>
                <p style={{ color: "var(--ink-4)", marginBottom: 16, fontSize: 13 }}>{error}</p>
                <button className="book-btn" onClick={() => window.location.reload()}>Retry</button>
            </div>
        )
    }

    return (
        <>
            <GlobalStyles />

            {/* ── Controls bar ── */}
            <div className="controls-bar">
                <div className="ll-container">
                    {/* Row 1: search + sort + view */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <div className="search-wrap" style={{ flex: "1 1 200px", minWidth: 0 }}>
                            <Search size={14} color="var(--ink-5)" style={{ flexShrink: 0 }} />
                            <input
                                className="search-input"
                                placeholder="Search name, specialization, city…"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                            {search && <button onClick={() => setSearch("")} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, flexShrink: 0 }}><X size={12} color="var(--ink-5)" /></button>}
                        </div>

                        <select className="filter-select" value={sort} onChange={e => setSort(e.target.value as any)}>
                            <option value="rating">Top Rated</option>
                            <option value="experience">Most Experienced</option>
                            <option value="consultationFee">Lowest Fee</option>
                            <option value="availableNow">Available Now</option>
                        </select>

                        <button
                            className={`ghost-btn ${showFilters ? "" : ""}`}
                            onClick={() => setShowFilters(v => !v)}
                            style={{ gap: 5, fontSize: 11 }}
                        >
                            <SlidersHorizontal size={11} />
                            Filters{activeFilters.length > 0 ? ` (${activeFilters.length})` : ""}
                        </button>

                        {/* View toggle */}
                        <div style={{ display: "flex", gap: 4 }}>
                            <button className={`view-btn ${view === "grid" ? "active" : ""}`} onClick={() => setView("grid")} title="Grid"><LayoutGrid size={12} /></button>
                            <button className={`view-btn ${view === "list" ? "active" : ""}`} onClick={() => setView("list")} title="List"><List size={12} /></button>
                            <button className={`view-btn ${view === "editorial" ? "active" : ""}`} onClick={() => setView("editorial")} title="Magazine"><Rows3 size={12} /></button>
                        </div>
                    </div>

                    {/* Row 2: expandable filters */}
                    {showFilters && (
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8, paddingTop: 8, borderTop: "1px solid var(--ink-8)" }}>
                            <select className="filter-select" value={spec} onChange={e => setSpec(e.target.value)}>
                                {SPECIALIZATIONS.map(s => <option key={s}>{s}</option>)}
                            </select>
                            <select className="filter-select" value={state} onChange={e => setState(e.target.value)}>
                                {STATES.map(s => <option key={s}>{s}</option>)}
                            </select>
                            <select className="filter-select" value={lang} onChange={e => setLang(e.target.value)}>
                                {LANGUAGES.map(l => <option key={l}>{l}</option>)}
                            </select>
                            <button
                                className={`quick-filter ${onlyAvailable ? "active" : ""}`}
                                onClick={() => setOnlyAvailable(v => !v)}
                            >
                                <span style={{ width: 6, height: 6, borderRadius: "50%", background: onlyAvailable ? "#fff" : "var(--emerald)", display: "inline-block" }} />
                                Available now
                            </button>
                            {(activeFilters.length > 0 || onlyAvailable) && (
                                <button onClick={resetFilters} style={{ background: "none", border: "none", fontSize: "11px", color: "var(--gold-dk)", cursor: "pointer", fontFamily: "var(--mono)", padding: "4px 8px" }}>
                                    Clear all ×
                                </button>
                            )}
                        </div>
                    )}

                    {/* Row 3: quick spec pills */}
                    <div style={{ display: "flex", gap: 6, marginTop: 8, overflowX: "auto", paddingBottom: 2 }}>
                        {SPECIALIZATIONS.slice(0, 7).map(s => (
                            <button
                                key={s}
                                className={`quick-filter ${(s === "All" ? spec === "All" : spec === s) ? "active" : ""}`}
                                onClick={() => setSpec(s === "All" ? "All" : s)}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Results ── */}
            <div className="ll-container" style={{ paddingTop: 20, paddingBottom: 48 }}>
                {/* Results count + active filters */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--ink-5)" }}>
                        {loading ? "Loading…" : `${filtered.length} ${filtered.length === 1 ? "lawyer" : "lawyers"} found`}
                        {activeFilters.length > 0 && (
                            <span style={{ marginLeft: 8 }}>
                                {activeFilters.map(f => (
                                    <span key={f} style={{ marginLeft: 4, padding: "1px 6px", background: "var(--gold-pale)", color: "var(--gold-dk)", borderRadius: 100, fontSize: "9px", border: "1px solid rgba(201,168,76,.2)" }}>{f}</span>
                                ))}
                            </span>
                        )}
                    </div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: "10px", color: "var(--ink-6)" }}>
                        showing {Math.min(paged.length, filtered.length)} of {filtered.length}
                    </div>
                </div>

                {/* Cards */}
                {loading ? (
                    view === "list" ? (
                        <div className="lawyers-list">
                            {[1, 2, 3, 4, 5].map(i => <SkeletonCard key={i} view="list" />)}
                        </div>
                    ) : (
                        <div className={view === "editorial" ? "lawyers-editorial" : "lawyers-grid-3"}>
                            {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} view="grid" />)}
                        </div>
                    )
                ) : filtered.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "56px 20px" }}>
                        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--ink-8)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                            <User size={22} color="var(--ink-5)" />
                        </div>
                        <h3 style={{ fontFamily: "var(--serif)", fontSize: 20, marginBottom: 6 }}>No lawyers found</h3>
                        <p style={{ color: "var(--ink-5)", fontSize: 12, marginBottom: 18 }}>Try a different filter or search term</p>
                        <button className="book-btn" style={{ background: "var(--ink-8)", color: "var(--ink-4)", fontSize: 11 }} onClick={resetFilters}>Reset All Filters</button>
                    </div>
                ) : (
                    renderCards()
                )}

                {/* Load more */}
                {!loading && hasMore && (
                    <div className="load-more-row">
                        <div style={{ flex: 1, height: 1, background: "var(--ink-7)" }} />
                        <button
                            className="ghost-btn"
                            style={{ padding: "8px 20px", fontSize: 11, borderRadius: 100 }}
                            onClick={() => setPage(p => p + 1)}
                        >
                            Show more lawyers ({filtered.length - paged.length} remaining)
                        </button>
                        <div style={{ flex: 1, height: 1, background: "var(--ink-7)" }} />
                    </div>
                )}
            </div>
        </>
    )
}