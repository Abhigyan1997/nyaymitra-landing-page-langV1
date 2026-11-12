"use client"

import React, { useEffect, useMemo, useState } from "react"
import Link from "next/link"

import {
    Star,
    MapPin,
    Clock,
    Video,
    Phone,
    MessageCircle,
    Search,
    User,
    Award,
    Calendar,
    AlertCircle,
    SlidersHorizontal,
    X,
    LayoutGrid,
    List,
    Rows3,
    Globe,
    ArrowUpRight,
    ChevronRight,
} from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

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
    consultationModes: {
        video: boolean
        call: boolean
        chat: boolean
        inPerson: boolean
    }
    kycStatus: string
    availableNow?: boolean
}

type ViewMode = "grid" | "list" | "editorial"

type SortMode =
    | "rating"
    | "experience"
    | "consultationFee"
    | "availableNow"

interface LawyerListingProps {
    lawyers: Lawyer[]
    loading: boolean
    error: string | null
    onBook: (lawyer: Lawyer) => void
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PAGE_SIZE = 12

const SPECIALIZATIONS = [
    "All",
    "Criminal",
    "Civil",
    "Family",
    "Divorce",
    "Property",
    "Corporate",
    "Startup & Compliance",
    "Cyber Crime",
    "Consumer Court",
    "Labour",
    "Employment",
    "Tax",
    "GST",
    "Cheque Bounce",
    "Banking & Finance",
    "Debt Recovery",
    "Intellectual Property",
    "Trademark",
    "Copyright",
    "Patent",
    "Real Estate",
    "RERA",
    "Arbitration",
    "Mediation",
    "Insurance",
    "Immigration",
    "Documentation",
    "Contract Drafting",
    "Company Registration",
    "NGO & Trust",
    "Education",
    "Medical Negligence",
    "Motor Accident Claims",
    "Environmental Law",
    "Constitutional Law",
    "Service Matters",
    "White Collar Crime",
    "NDPS",
    "Bail Matters",
    "Supreme Court",
    "High Court",
    "NCLT & Insolvency",
]

const STATES = [
    "All States",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman & Nicobar Islands",
    "Chandigarh",
    "Dadra & Nagar Haveli and Daman & Diu",
    "Delhi",
    "Jammu & Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
]

const LANGUAGES = [
    "All Languages",
    "Hindi",
    "English",
    "Marathi",
    "Gujarati",
    "Telugu",
    "Tamil",
    "Kannada",
    "Bengali",
    "Punjabi",
]

const AVATAR_COLORS = [
    "#1a2a1e",
    "#1e2035",
    "#2a1a1a",
    "#1a2535",
    "#261e10",
    "#1d2a26",
    "#2b1e35",
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

const safeArray = (value: unknown): string[] => {
    if (!Array.isArray(value)) return []

    return value.filter(
        (item): item is string =>
            typeof item === "string" && item.trim().length > 0
    )
}

const safeNumber = (value: unknown, fallback = 0): number => {
    const number = Number(value)

    return Number.isFinite(number) ? number : fallback
}

const getInitials = (name: string) => {
    return (name || "Lawyer")
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map(part => part[0])
        .join("")
        .toUpperCase()
}

const getAvatarColor = (name: string) => {
    const value = name || "Lawyer"

    return AVATAR_COLORS[value.length % AVATAR_COLORS.length]
}

const getLocation = (lawyer: Lawyer) => {
    return [lawyer.city, lawyer.state]
        .filter(Boolean)
        .join(", ") || "Location not provided"
}

const formatFee = (fee: number) => {
    return `₹${safeNumber(fee).toLocaleString("en-IN")}`
}

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
        --ink:#0a0a0a;
        --ink-2:#1a1a1a;
        --ink-3:#3a3a3a;
        --ink-4:#6b6b6b;
        --ink-5:#9a9a9a;
        --ink-6:#c8c8c8;
        --ink-7:#e8e8e8;
        --ink-8:#f4f3f0;
        --parchment:#faf9f6;
        --white:#ffffff;
        --gold:#c9a84c;
        --gold-lt:#e8c96a;
        --gold-dk:#8b6914;
        --gold-pale:#fdf6e3;
        --emerald:#10b981;
        --red:#c0392b;
        --serif:'Cormorant Garamond',Georgia,serif;
        --sans:'DM Sans',system-ui,sans-serif;
        --mono:'DM Mono',monospace;
      }

      .ll-root,
      .ll-root *,
      .ll-root *::before,
      .ll-root *::after {
        box-sizing:border-box;
      }

      .ll-root {
        width:100%;
        color:var(--ink);
        font-family:var(--sans);
      }

      @keyframes llFadeUp {
        from { opacity:0; transform:translateY(16px); }
        to { opacity:1; transform:translateY(0); }
      }

      @keyframes llShimmer {
        0% { background-position:-200% center; }
        100% { background-position:200% center; }
      }

      @keyframes llPulse {
        0% { transform:scale(1); opacity:1; }
        100% { transform:scale(1.5); opacity:0; }
      }

      @keyframes llSpin {
        to { transform:rotate(360deg); }
      }

      .ll-container {
        max-width:1200px;
        margin:0 auto;
        padding:0 24px;
      }

      .ll-gold-shimmer {
        background:linear-gradient(
          100deg,
          var(--gold-dk),
          var(--gold),
          var(--gold-lt),
          var(--gold),
          var(--gold-dk)
        );
        background-size:200% auto;
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
        background-clip:text;
        animation:llShimmer 4s linear infinite;
      }

      .ll-controls {
        position:sticky;
        top:60px;
        z-index:50;
        background:rgba(255,255,255,.96);
        backdrop-filter:blur(12px);
        border-bottom:1px solid var(--ink-7);
        padding:10px 0;
      }

      .ll-search {
        display:flex;
        align-items:center;
        gap:8px;
        background:var(--white);
        border:1px solid var(--ink-7);
        border-radius:10px;
        padding:8px 14px;
        transition:border-color .2s;
      }

      .ll-search:focus-within {
        border-color:var(--gold);
        box-shadow:0 0 0 3px rgba(201,168,76,.08);
      }

      .ll-search input {
        flex:1;
        min-width:80px;
        border:none;
        outline:none;
        font-size:13px;
        font-family:var(--sans);
        background:transparent;
        color:var(--ink);
      }

      .ll-select {
        appearance:none;
        -webkit-appearance:none;
        padding:7px 28px 7px 10px;
        border:1px solid var(--ink-7);
        border-radius:8px;
        background-color:var(--white);
        font-size:11px;
        font-family:var(--sans);
        color:var(--ink-4);
        cursor:pointer;
        max-width:100%;
      }

      .ll-select:focus {
        outline:none;
        border-color:var(--gold);
      }

      .ll-ghost {
        display:inline-flex;
        align-items:center;
        justify-content:center;
        gap:5px;
        background:transparent;
        color:var(--ink-4);
        border:1px solid var(--ink-7);
        border-radius:8px;
        padding:6px 10px;
        font-size:11px;
        font-family:var(--sans);
        cursor:pointer;
        transition:all .15s;
      }

      .ll-ghost:hover {
        border-color:var(--ink-5);
        color:var(--ink);
      }

      .ll-view-btn {
        display:inline-flex;
        align-items:center;
        justify-content:center;
        padding:7px 10px;
        border:1px solid var(--ink-7);
        border-radius:8px;
        background:var(--white);
        cursor:pointer;
        color:var(--ink-5);
        transition:all .15s;
      }

      .ll-view-btn.active {
        background:var(--ink);
        color:var(--white);
        border-color:var(--ink);
      }

      .ll-quick-filter {
        display:inline-flex;
        align-items:center;
        gap:5px;
        padding:5px 12px;
        border:1px solid var(--ink-7);
        border-radius:100px;
        font-size:11px;
        background:var(--white);
        cursor:pointer;
        white-space:nowrap;
        transition:all .15s;
        font-family:var(--sans);
        color:var(--ink-4);
      }

      .ll-quick-filter:hover {
        border-color:var(--gold);
        color:var(--gold-dk);
        background:var(--gold-pale);
      }

      .ll-quick-filter.active {
        background:var(--ink);
        color:var(--white);
        border-color:var(--ink);
      }

      .ll-grid {
        display:grid;
        grid-template-columns:repeat(3,minmax(0,1fr));
        gap:14px;
      }

      .ll-editorial-grid {
        display:grid;
        grid-template-columns:repeat(2,minmax(0,1fr));
        gap:14px;
      }

      .ll-card {
        position:relative;
        overflow:hidden;
        background:var(--white);
        border:1px solid var(--ink-7);
        border-radius:16px;
        display:flex;
        flex-direction:column;
        animation:llFadeUp .4s ease both;
        transition:all .25s;
        min-width:0;
      }

      .ll-card:hover {
        transform:translateY(-3px);
        box-shadow:0 16px 40px rgba(0,0,0,.07);
        border-color:var(--ink-6);
      }

      .ll-card-accent {
        position:absolute;
        top:0;
        left:0;
        right:0;
        height:3px;
        background:linear-gradient(90deg,transparent,var(--gold),transparent);
        opacity:0;
        transition:opacity .25s;
      }

      .ll-card:hover .ll-card-accent {
        opacity:1;
      }

      .ll-avatar {
        position:relative;
        flex-shrink:0;
      }

      .ll-avatar img {
        display:block;
        border-radius:50%;
        object-fit:cover;
        border:2px solid var(--ink-8);
      }

      .ll-online {
        position:absolute;
        bottom:1px;
        right:1px;
        width:10px;
        height:10px;
        border-radius:50%;
        background:var(--emerald);
        border:2px solid var(--white);
      }

      .ll-online::before {
        content:'';
        position:absolute;
        inset:-3px;
        border-radius:50%;
        border:1px solid var(--emerald);
        animation:llPulse 2s ease-out infinite;
      }

      .ll-verified {
        position:absolute;
        bottom:-2px;
        right:-2px;
        width:17px;
        height:17px;
        border-radius:50%;
        background:var(--gold);
        border:2px solid var(--white);
        display:flex;
        align-items:center;
        justify-content:center;
      }

      .ll-spec {
        font-size:9px;
        padding:2px 7px;
        border-radius:100px;
        background:var(--ink-8);
        color:var(--ink-4);
        white-space:nowrap;
        font-family:var(--mono);
      }

      .ll-spec.primary {
        background:var(--gold-pale);
        color:var(--gold-dk);
        border:1px solid rgba(201,168,76,.2);
      }

      .ll-chip {
        display:inline-flex;
        align-items:center;
        gap:3px;
        font-size:10px;
        color:var(--ink-5);
      }

      .ll-stars {
        display:flex;
        gap:1px;
      }

      .ll-fee {
        font-family:var(--serif);
        font-size:20px;
        font-weight:700;
        color:var(--ink);
        line-height:1;
      }

      .ll-fee-sm {
        font-family:var(--serif);
        font-size:15px;
        font-weight:600;
      }

      .ll-book {
        display:inline-flex;
        align-items:center;
        justify-content:center;
        gap:6px;
        background:var(--ink);
        color:var(--white);
        border:none;
        border-radius:8px;
        padding:7px 14px;
        font-size:11px;
        font-weight:600;
        font-family:var(--sans);
        cursor:pointer;
        transition:all .2s;
        white-space:nowrap;
      }

      .ll-book:hover {
        background:var(--gold);
        color:var(--ink);
      }

      .ll-book.gold {
        background:var(--gold);
        color:var(--ink);
      }

      .ll-book.gold:hover {
        background:var(--gold-lt);
      }

      .ll-mode-icons {
        display:flex;
        gap:4px;
      }

      .ll-mode-icon {
        width:22px;
        height:22px;
        border-radius:6px;
        border:1px solid var(--ink-7);
        display:flex;
        align-items:center;
        justify-content:center;
        color:var(--ink-5);
      }

      .ll-mode-icon.active {
        background:var(--ink-8);
        color:var(--ink);
        border-color:var(--ink-6);
      }

      .ll-list {
        display:flex;
        flex-direction:column;
        border:1px solid var(--ink-7);
        border-radius:14px;
        overflow:hidden;
      }

      .ll-list-row {
        display:flex;
        align-items:center;
        gap:14px;
        padding:12px 16px;
        border-bottom:1px solid var(--ink-8);
        background:var(--white);
        transition:background .15s;
        animation:llFadeUp .4s ease both;
      }

      .ll-list-row:last-child {
        border-bottom:none;
      }

      .ll-list-row:hover {
        background:var(--parchment);
      }

      .ll-editorial-card {
        position:relative;
        border-radius:16px;
        overflow:hidden;
        border:1px solid var(--ink-7);
        background:var(--white);
        transition:all .25s;
        animation:llFadeUp .4s ease both;
        min-width:0;
      }

      .ll-editorial-card:hover {
        transform:translateY(-3px);
        box-shadow:0 20px 50px rgba(0,0,0,.08);
      }

      .ll-editorial-card.featured {
        grid-column:span 2;
      }

      .ll-experience {
        height:3px;
        background:var(--ink-8);
        border-radius:100px;
        overflow:hidden;
        margin-top:4px;
      }

      .ll-experience > div {
        height:100%;
        background:linear-gradient(90deg,var(--gold-dk),var(--gold));
        border-radius:100px;
      }

      .ll-available {
        display:inline-flex;
        align-items:center;
        gap:4px;
        font-size:9px;
        padding:2px 7px;
        border-radius:100px;
        background:rgba(16,185,129,.1);
        color:var(--emerald);
        border:1px solid rgba(16,185,129,.2);
        font-family:var(--mono);
      }

      .ll-load-more {
        display:flex;
        align-items:center;
        justify-content:center;
        gap:12px;
        padding:24px 0;
      }

      .ll-skeleton {
        background:linear-gradient(
          90deg,
          var(--ink-8) 25%,
          var(--ink-7) 50%,
          var(--ink-8) 75%
        );
        background-size:200% 100%;
        animation:llShimmer 1.4s infinite;
        border-radius:4px;
      }

      @media(max-width:1024px) {
        .ll-grid {
          grid-template-columns:repeat(2,minmax(0,1fr));
        }
      }

      @media(max-width:768px) {
        .ll-grid,
        .ll-editorial-grid {
          grid-template-columns:1fr;
        }

        .ll-editorial-card.featured {
          grid-column:span 1;
        }

        .ll-list-row {
          flex-wrap:wrap;
        }
      }

      @media(max-width:640px) {
        .ll-container {
          padding-left:14px;
          padding-right:14px;
        }

        .ll-controls {
          top:0;
        }

        .ll-list-row {
          gap:10px;
          padding:12px;
        }
      }

      @media(prefers-reduced-motion:reduce) {
        .ll-root *,
        .ll-root *::before,
        .ll-root *::after {
          animation-duration:.01ms!important;
          animation-iteration-count:1!important;
          scroll-behavior:auto!important;
          transition-duration:.01ms!important;
        }
      }
    `

        document.head.appendChild(style)

        return () => {
            // Keep shared styles mounted; another listing instance may use them.
        }
    }, [])

    return null
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

function LawyerAvatar({
    lawyer,
    size = 48,
}: {
    lawyer: Lawyer
    size?: number
}) {
    const [imageFailed, setImageFailed] = useState(false)

    const initials = getInitials(lawyer.fullName)
    const color = getAvatarColor(lawyer.fullName)

    return (
        <div
            className="ll-avatar"
            style={{ width: size, height: size }}
        >
            {lawyer.profilePhoto && !imageFailed ? (
                <img
                    src={lawyer.profilePhoto}
                    alt={lawyer.fullName || "Lawyer"}
                    width={size}
                    height={size}
                    onError={() => setImageFailed(true)}
                />
            ) : (
                <div
                    style={{
                        width: size,
                        height: size,
                        borderRadius: "50%",
                        background: color,
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "var(--serif)",
                        fontSize: size * 0.36,
                        fontWeight: 600,
                        border: "2px solid var(--ink-8)",
                    }}
                >
                    {initials}
                </div>
            )}

            {lawyer.availableNow && <div className="ll-online" />}

            {lawyer.kycStatus === "verified" && !lawyer.availableNow && (
                <div className="ll-verified">
                    <Award size={8} color="var(--ink)" />
                </div>
            )}
        </div>
    )
}

// ─── Rating ───────────────────────────────────────────────────────────────────

function RatingStars({ rating }: { rating: number }) {
    const safeRating = Math.max(0, Math.min(5, safeNumber(rating)))

    return (
        <div
            className="ll-stars"
            aria-label={`${safeRating.toFixed(1)} out of 5`}
        >
            {[1, 2, 3, 4, 5].map(star => (
                <Star
                    key={star}
                    size={10}
                    style={{
                        color:
                            star <= Math.round(safeRating)
                                ? "var(--gold)"
                                : "var(--ink-7)",
                        fill:
                            star <= Math.round(safeRating)
                                ? "var(--gold)"
                                : "var(--ink-7)",
                    }}
                />
            ))}
        </div>
    )
}

// ─── Consultation Modes ───────────────────────────────────────────────────────

function ModeIcons({
    modes,
}: {
    modes: Lawyer["consultationModes"]
}) {
    const safeModes = modes || {
        video: false,
        call: false,
        chat: false,
        inPerson: false,
    }

    return (
        <div className="ll-mode-icons">
            <div
                className={`ll-mode-icon ${safeModes.video ? "active" : ""}`}
                title="Video"
            >
                <Video size={11} />
            </div>

            <div
                className={`ll-mode-icon ${safeModes.call ? "active" : ""}`}
                title="Call"
            >
                <Phone size={11} />
            </div>

            <div
                className={`ll-mode-icon ${safeModes.chat ? "active" : ""}`}
                title="Chat"
            >
                <MessageCircle size={11} />
            </div>

            <div
                className={`ll-mode-icon ${safeModes.inPerson ? "active" : ""}`}
                title="In-person"
            >
                <User size={11} />
            </div>
        </div>
    )
}

// ─── Experience Bar ───────────────────────────────────────────────────────────

function ExperienceBar({ years }: { years: number }) {
    const pct = Math.max(
        0,
        Math.min((safeNumber(years) / 30) * 100, 100)
    )

    return (
        <div className="ll-experience">
            <div style={{ width: `${pct}%` }} />
        </div>
    )
}

// ─── Grid Card ────────────────────────────────────────────────────────────────

function GridCard({
    lawyer,
    delay,
    onBook,
}: {
    lawyer: Lawyer
    delay: number
    onBook: (lawyer: Lawyer) => void
}) {
    const specializations = safeArray(lawyer.specialization)

    return (
        <div
            className="ll-card"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="ll-card-accent" />

            <div
                style={{
                    padding: "16px 16px 12px",
                    borderBottom: "1px solid var(--ink-8)",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 10,
                        marginBottom: 10,
                    }}
                >
                    <LawyerAvatar lawyer={lawyer} size={46} />

                    <div style={{ textAlign: "right" }}>
                        <div className="ll-fee">
                            {formatFee(lawyer.consultationFee)}
                        </div>

                        <div
                            style={{
                                fontSize: 9,
                                color: "var(--ink-5)",
                                fontFamily: "var(--mono)",
                            }}
                        >
                            per session
                        </div>
                    </div>
                </div>

                <div style={{ marginBottom: 6 }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            flexWrap: "wrap",
                            marginBottom: 5,
                        }}
                    >
                        <h3
                            style={{
                                fontFamily: "var(--serif)",
                                fontSize: 17,
                                fontWeight: 600,
                                lineHeight: 1.2,
                            }}
                        >
                            {lawyer.fullName || "Legal Professional"}
                        </h3>

                        {lawyer.kycStatus === "verified" && (
                            <span
                                style={{
                                    fontSize: 8,
                                    padding: "2px 6px",
                                    background: "rgba(16,185,129,.1)",
                                    color: "var(--emerald)",
                                    borderRadius: 100,
                                    border: "1px solid rgba(16,185,129,.2)",
                                }}
                            >
                                ✓ Verified
                            </span>
                        )}
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 4,
                        }}
                    >
                        {specializations.slice(0, 2).map((item, index) => (
                            <span
                                key={item}
                                className={`ll-spec ${index === 0 ? "primary" : ""}`}
                            >
                                {item}
                            </span>
                        ))}

                        {specializations.length > 2 && (
                            <span className="ll-spec">
                                +{specializations.length - 2}
                            </span>
                        )}
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        flexWrap: "wrap",
                    }}
                >
                    <RatingStars rating={lawyer.rating} />

                    <span
                        style={{
                            width: 3,
                            height: 3,
                            borderRadius: "50%",
                            background: "var(--ink-7)",
                        }}
                    />

                    <span className="ll-chip">
                        <MapPin size={10} />
                        {getLocation(lawyer)}
                    </span>

                    {lawyer.availableNow && (
                        <span className="ll-available">
                            <span
                                style={{
                                    width: 5,
                                    height: 5,
                                    borderRadius: "50%",
                                    background: "var(--emerald)",
                                }}
                            />
                            Available
                        </span>
                    )}
                </div>
            </div>

            <div
                style={{
                    padding: "12px 16px",
                    flex: 1,
                }}
            >
                <div style={{ marginBottom: 10 }}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 3,
                        }}
                    >
                        <span
                            style={{
                                fontSize: 9,
                                color: "var(--ink-5)",
                                fontFamily: "var(--mono)",
                                textTransform: "uppercase",
                                letterSpacing: ".1em",
                            }}
                        >
                            Experience
                        </span>

                        <span
                            style={{
                                fontSize: 11,
                                fontWeight: 600,
                                fontFamily: "var(--mono)",
                                color: "var(--ink-3)",
                            }}
                        >
                            {safeNumber(lawyer.experience)} years
                        </span>
                    </div>

                    <ExperienceBar years={lawyer.experience} />
                </div>

                <p
                    style={{
                        fontSize: 11,
                        color: "var(--ink-5)",
                        lineHeight: 1.6,
                        marginBottom: 10,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    {lawyer.bio || "Experienced legal professional."}
                </p>

                <ModeIcons modes={lawyer.consultationModes} />
            </div>

            <div
                style={{
                    padding: "10px 16px 14px",
                    display: "flex",
                    gap: 6,
                    alignItems: "center",
                }}
            >
                <button
                    type="button"
                    className="ll-book gold"
                    style={{ flex: 1 }}
                    onClick={() => onBook(lawyer)}
                >
                    <Calendar size={12} />
                    Book Now
                </button>

                <Link
                    href={`/lawyers/${encodeURIComponent(lawyer.id)}`}
                    aria-label={`View ${lawyer.fullName}'s profile`}
                    style={{ textDecoration: "none" }}
                >
                    <span className="ll-ghost">
                        <ArrowUpRight size={13} />
                    </span>
                </Link>
            </div>
        </div>
    )
}

// ─── List Row ─────────────────────────────────────────────────────────────────

function ListRow({
    lawyer,
    delay,
    onBook,
}: {
    lawyer: Lawyer
    delay: number
    onBook: (lawyer: Lawyer) => void
}) {
    const specialization = safeArray(lawyer.specialization)

    return (
        <div
            className="ll-list-row"
            style={{ animationDelay: `${delay}ms` }}
        >
            <LawyerAvatar lawyer={lawyer} size={42} />

            <div
                style={{
                    flex: 1,
                    minWidth: 0,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        flexWrap: "wrap",
                        marginBottom: 4,
                    }}
                >
                    <span
                        style={{
                            fontFamily: "var(--serif)",
                            fontSize: 16,
                            fontWeight: 600,
                        }}
                    >
                        {lawyer.fullName || "Legal Professional"}
                    </span>

                    {specialization[0] && (
                        <span className="ll-spec primary">
                            {specialization[0]}
                        </span>
                    )}

                    {lawyer.availableNow && (
                        <span className="ll-available">
                            Available
                        </span>
                    )}
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: 10,
                        flexWrap: "wrap",
                        alignItems: "center",
                    }}
                >
                    <span className="ll-chip">
                        <Clock size={10} />
                        {safeNumber(lawyer.experience)}y exp
                    </span>

                    <span className="ll-chip">
                        <MapPin size={10} />
                        {getLocation(lawyer)}
                    </span>

                    <ModeIcons modes={lawyer.consultationModes} />
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    flexShrink: 0,
                }}
            >
                <div style={{ textAlign: "right" }}>
                    <div className="ll-fee-sm">
                        {formatFee(lawyer.consultationFee)}
                    </div>

                    <div
                        style={{
                            fontSize: 8,
                            color: "var(--ink-5)",
                            fontFamily: "var(--mono)",
                        }}
                    >
                        / consult
                    </div>
                </div>

                <button
                    type="button"
                    className="ll-book"
                    style={{ padding: "7px 12px" }}
                    onClick={() => onBook(lawyer)}
                >
                    <Calendar size={11} />
                    Book
                </button>
            </div>
        </div>
    )
}

// ─── Editorial Card ──────────────────────────────────────────────────────────

function EditorialCard({
    lawyer,
    delay,
    featured,
    onBook,
}: {
    lawyer: Lawyer
    delay: number
    featured?: boolean
    onBook: (lawyer: Lawyer) => void
}) {
    const initials = getInitials(lawyer.fullName)
    const bgColor = getAvatarColor(lawyer.fullName)
    const specializations = safeArray(lawyer.specialization)
    const languages = safeArray(lawyer.languages)

    return (
        <div
            className={`ll-editorial-card ${featured ? "featured" : ""}`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div
                style={{
                    background: bgColor,
                    padding: featured ? "24px 20px 18px" : "18px 16px 14px",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: -20,
                        right: -20,
                        width: 120,
                        height: 120,
                        borderRadius: "50%",
                        border: "1px solid rgba(255,255,255,.08)",
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        border: "1px solid rgba(255,255,255,.05)",
                    }}
                />

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 10,
                        position: "relative",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            minWidth: 0,
                        }}
                    >
                        {lawyer.profilePhoto ? (
                            <img
                                src={lawyer.profilePhoto}
                                alt={lawyer.fullName || "Lawyer"}
                                width={featured ? 52 : 44}
                                height={featured ? 52 : 44}
                                style={{
                                    width: featured ? 52 : 44,
                                    height: featured ? 52 : 44,
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    border: "2px solid rgba(255,255,255,.2)",
                                }}
                            />
                        ) : (
                            <div
                                style={{
                                    width: featured ? 52 : 44,
                                    height: featured ? 52 : 44,
                                    borderRadius: "50%",
                                    background: "rgba(255,255,255,.12)",
                                    border: "2px solid rgba(255,255,255,.2)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontFamily: "var(--serif)",
                                    fontSize: featured ? 20 : 17,
                                    color: "rgba(255,255,255,.9)",
                                    flexShrink: 0,
                                }}
                            >
                                {initials}
                            </div>
                        )}

                        <div style={{ minWidth: 0 }}>
                            <div
                                style={{
                                    fontFamily: "var(--serif)",
                                    fontSize: featured ? 18 : 15,
                                    fontWeight: 600,
                                    color: "rgba(255,255,255,.95)",
                                    lineHeight: 1.2,
                                    marginBottom: 5,
                                }}
                            >
                                {lawyer.fullName || "Legal Professional"}
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    gap: 3,
                                    flexWrap: "wrap",
                                }}
                            >
                                {specializations
                                    .slice(0, featured ? 2 : 1)
                                    .map(item => (
                                        <span
                                            key={item}
                                            style={{
                                                fontSize: 8,
                                                padding: "2px 7px",
                                                borderRadius: 100,
                                                background: "rgba(255,255,255,.15)",
                                                color: "rgba(255,255,255,.8)",
                                                fontFamily: "var(--mono)",
                                            }}
                                        >
                                            {item}
                                        </span>
                                    ))}
                            </div>
                        </div>
                    </div>

                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div
                            style={{
                                fontFamily: "var(--serif)",
                                fontSize: featured ? 22 : 18,
                                fontWeight: 700,
                                color: "rgba(255,255,255,.95)",
                            }}
                        >
                            {formatFee(lawyer.consultationFee)}
                        </div>

                        <div
                            style={{
                                fontSize: 8,
                                color: "rgba(255,255,255,.6)",
                                fontFamily: "var(--mono)",
                            }}
                        >
                            per consult
                        </div>
                    </div>
                </div>

                {lawyer.availableNow && (
                    <div
                        style={{
                            marginTop: 10,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                            fontSize: 9,
                            padding: "3px 8px",
                            borderRadius: 100,
                            background: "rgba(16,185,129,.2)",
                            color: "#6ee7b7",
                            border: "1px solid rgba(16,185,129,.25)",
                            fontFamily: "var(--mono)",
                        }}
                    >
                        <span
                            style={{
                                width: 5,
                                height: 5,
                                borderRadius: "50%",
                                background: "#6ee7b7",
                            }}
                        />
                        Available now
                    </div>
                )}
            </div>

            <div
                style={{
                    padding: featured ? "14px 18px 16px" : "12px 14px 14px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 10,
                        marginBottom: 10,
                    }}
                >
                    <span className="ll-chip">
                        <Clock size={10} />
                        {safeNumber(lawyer.experience)}y exp
                    </span>

                    <span className="ll-chip">
                        <MapPin size={10} />
                        {getLocation(lawyer)}
                    </span>

                    <span className="ll-chip">
                        <Globe size={10} />
                        {languages.slice(0, 2).join(", ") || "Languages not listed"}
                    </span>
                </div>

                <div style={{ marginBottom: 10 }}>
                    <RatingStars rating={lawyer.rating} />
                </div>

                {featured && (
                    <p
                        style={{
                            fontSize: 11,
                            color: "var(--ink-5)",
                            lineHeight: 1.6,
                            marginBottom: 12,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                        }}
                    >
                        {lawyer.bio || "Experienced legal professional."}
                    </p>
                )}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 8,
                    }}
                >
                    <ModeIcons modes={lawyer.consultationModes} />

                    <div style={{ display: "flex", gap: 5 }}>
                        <button
                            type="button"
                            className="ll-book gold"
                            style={{ padding: "6px 12px", fontSize: 10 }}
                            onClick={() => onBook(lawyer)}
                        >
                            <Calendar size={10} />
                            Book
                        </button>

                        <Link
                            href={`/lawyers/${encodeURIComponent(lawyer.id)}`}
                            aria-label={`View ${lawyer.fullName}'s profile`}
                            style={{ textDecoration: "none" }}
                        >
                            <span className="ll-ghost">
                                <ChevronRight size={12} />
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonCard({ view }: { view: ViewMode }) {
    if (view === "list") {
        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "12px 16px",
                    borderBottom: "1px solid var(--ink-8)",
                }}
            >
                <div
                    className="ll-skeleton"
                    style={{
                        width: 42,
                        height: 42,
                        borderRadius: "50%",
                        flexShrink: 0,
                    }}
                />

                <div style={{ flex: 1 }}>
                    <div
                        className="ll-skeleton"
                        style={{
                            height: 12,
                            width: "40%",
                            marginBottom: 7,
                        }}
                    />

                    <div
                        className="ll-skeleton"
                        style={{
                            height: 9,
                            width: "60%",
                        }}
                    />
                </div>

                <div
                    className="ll-skeleton"
                    style={{
                        height: 28,
                        width: 70,
                        borderRadius: 8,
                    }}
                />
            </div>
        )
    }

    return (
        <div
            style={{
                border: "1px solid var(--ink-7)",
                borderRadius: 16,
                overflow: "hidden",
            }}
        >
            <div
                className="ll-skeleton"
                style={{ height: 80 }}
            />

            <div style={{ padding: 14 }}>
                <div
                    className="ll-skeleton"
                    style={{
                        height: 12,
                        width: "60%",
                        marginBottom: 8,
                    }}
                />

                <div
                    className="ll-skeleton"
                    style={{
                        height: 9,
                        width: "80%",
                        marginBottom: 6,
                    }}
                />

                <div
                    className="ll-skeleton"
                    style={{
                        height: 9,
                        width: "50%",
                    }}
                />
            </div>
        </div>
    )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LawyerListing({
    lawyers,
    loading,
    error,
    onBook,
}: LawyerListingProps) {
    const [view, setView] = useState<ViewMode>("grid")

    const [search, setSearch] = useState("")
    const [spec, setSpec] = useState("All")
    const [state, setState] = useState("All States")
    const [lang, setLang] = useState("All Languages")

    const [sort, setSort] = useState<SortMode>("rating")

    const [page, setPage] = useState(1)

    const [showFilters, setShowFilters] = useState(false)
    const [onlyAvailable, setOnlyAvailable] = useState(false)

    // Reset pagination whenever a filter or sort changes.
    const resetPage = () => {
        setPage(1)
    }

    // ─── Filter and Sort ─────────────────────────────────────────────────────

    const filtered = useMemo(() => {
        const query = search.trim().toLowerCase()

        const normalizedLawyers = (lawyers || []).filter(
            lawyer => lawyer && lawyer.id && lawyer.userId
        )

        return normalizedLawyers
            .filter(lawyer => {
                const name = (lawyer.fullName || "").toLowerCase()
                const city = (lawyer.city || "").toLowerCase()
                const lawyerState = (lawyer.state || "").toLowerCase()

                const specializations = safeArray(lawyer.specialization)
                const languages = safeArray(lawyer.languages)

                const matchesSearch =
                    !query ||
                    name.includes(query) ||
                    city.includes(query) ||
                    lawyerState.includes(query) ||
                    specializations.some(item =>
                        item.toLowerCase().includes(query)
                    ) ||
                    languages.some(item =>
                        item.toLowerCase().includes(query)
                    )

                const matchesSpecialization =
                    spec === "All" ||
                    specializations.some(item =>
                        item.toLowerCase().includes(spec.toLowerCase())
                    )

                const matchesState =
                    state === "All States" ||
                    lawyerState === state.toLowerCase()

                const matchesLanguage =
                    lang === "All Languages" ||
                    languages.some(
                        item => item.toLowerCase() === lang.toLowerCase()
                    )

                const matchesAvailability =
                    !onlyAvailable || lawyer.availableNow === true

                return (
                    matchesSearch &&
                    matchesSpecialization &&
                    matchesState &&
                    matchesLanguage &&
                    matchesAvailability
                )
            })
            .sort((a, b) => {
                if (sort === "rating") {
                    return safeNumber(b.rating) - safeNumber(a.rating)
                }

                if (sort === "experience") {
                    return safeNumber(b.experience) - safeNumber(a.experience)
                }

                if (sort === "consultationFee") {
                    return (
                        safeNumber(a.consultationFee) -
                        safeNumber(b.consultationFee)
                    )
                }

                if (sort === "availableNow") {
                    return (
                        Number(b.availableNow === true) -
                        Number(a.availableNow === true)
                    )
                }

                return 0
            })
    }, [
        lawyers,
        search,
        spec,
        state,
        lang,
        sort,
        onlyAvailable,
    ])

    // ─── Frontend Pagination ──────────────────────────────────────────────────
    // Important:
    // The parent page fetches all backend pages.
    // This component displays the complete dataset 12 lawyers at a time.

    const totalLawyers = filtered.length

    const totalPages = Math.ceil(totalLawyers / PAGE_SIZE)

    const visibleCount = Math.min(page * PAGE_SIZE, totalLawyers)

    const paged = filtered.slice(0, visibleCount)

    const hasMore = visibleCount < totalLawyers

    const remainingCount = Math.max(
        0,
        totalLawyers - visibleCount
    )

    // ─── Active Filters ───────────────────────────────────────────────────────

    const activeFilters = [
        spec !== "All" ? spec : null,
        state !== "All States" ? state : null,
        lang !== "All Languages" ? lang : null,
        onlyAvailable ? "Available Now" : null,
    ].filter((item): item is string => Boolean(item))

    const resetFilters = () => {
        setSpec("All")
        setState("All States")
        setLang("All Languages")
        setSearch("")
        setSort("rating")
        setOnlyAvailable(false)
        setPage(1)
    }

    // ─── Render Cards ─────────────────────────────────────────────────────────

    const renderCards = () => {
        if (view === "list") {
            return (
                <div className="ll-list">
                    {paged.map((lawyer, index) => (
                        <ListRow
                            key={lawyer.id}
                            lawyer={lawyer}
                            delay={index * 30}
                            onBook={onBook}
                        />
                    ))}
                </div>
            )
        }

        if (view === "editorial") {
            return (
                <div className="ll-editorial-grid">
                    {paged.map((lawyer, index) => (
                        <EditorialCard
                            key={lawyer.id}
                            lawyer={lawyer}
                            delay={index * 30}
                            featured={index === 0}
                            onBook={onBook}
                        />
                    ))}
                </div>
            )
        }

        return (
            <div className="ll-grid">
                {paged.map((lawyer, index) => (
                    <GridCard
                        key={lawyer.id}
                        lawyer={lawyer}
                        delay={index * 30}
                        onBook={onBook}
                    />
                ))}
            </div>
        )
    }

    // ─── Error State ──────────────────────────────────────────────────────────

    if (error) {
        return (
            <div className="ll-root">
                <GlobalStyles />

                <div
                    className="ll-container"
                    style={{
                        textAlign: "center",
                        paddingTop: 60,
                        paddingBottom: 60,
                    }}
                >
                    <AlertCircle
                        size={36}
                        color="var(--red)"
                        style={{ marginBottom: 12 }}
                    />

                    <h3
                        style={{
                            fontFamily: "var(--serif)",
                            fontSize: 22,
                            marginBottom: 8,
                        }}
                    >
                        Failed to load lawyers
                    </h3>

                    <p
                        style={{
                            color: "var(--ink-4)",
                            marginBottom: 18,
                            fontSize: 13,
                        }}
                    >
                        {error}
                    </p>

                    <button
                        type="button"
                        className="ll-book"
                        onClick={() => window.location.reload()}
                    >
                        Retry
                    </button>
                </div>
            </div>
        )
    }

    // ─── Main Render ──────────────────────────────────────────────────────────

    return (
        <div className="ll-root">
            <GlobalStyles />

            {/* Controls Bar */}
            <div className="ll-controls">
                <div className="ll-container">

                    {/* Search, Sort and View */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            flexWrap: "wrap",
                        }}
                    >
                        <div
                            className="ll-search"
                            style={{
                                flex: "1 1 220px",
                                minWidth: 0,
                            }}
                        >
                            <Search
                                size={14}
                                color="var(--ink-5)"
                                style={{ flexShrink: 0 }}
                            />

                            <input
                                type="search"
                                placeholder="Search name, specialization, city..."
                                value={search}
                                onChange={event => {
                                    setSearch(event.target.value)
                                    resetPage()
                                }}
                            />

                            {search && (
                                <button
                                    type="button"
                                    aria-label="Clear search"
                                    onClick={() => {
                                        setSearch("")
                                        resetPage()
                                    }}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        padding: 2,
                                        display: "flex",
                                    }}
                                >
                                    <X size={13} color="var(--ink-5)" />
                                </button>
                            )}
                        </div>

                        <select
                            className="ll-select"
                            value={sort}
                            onChange={event => {
                                setSort(event.target.value as SortMode)
                                resetPage()
                            }}
                            aria-label="Sort lawyers"
                        >
                            <option value="rating">Top Rated</option>
                            <option value="experience">Most Experienced</option>
                            <option value="consultationFee">Lowest Fee</option>
                            <option value="availableNow">Available First</option>
                        </select>

                        <button
                            type="button"
                            className="ll-ghost"
                            onClick={() => setShowFilters(value => !value)}
                        >
                            <SlidersHorizontal size={12} />
                            Filters
                            {activeFilters.length > 0 &&
                                ` (${activeFilters.length})`}
                        </button>

                        {/* View Toggle */}
                        <div style={{ display: "flex", gap: 4 }}>
                            <button
                                type="button"
                                className={`ll-view-btn ${view === "grid" ? "active" : ""}`}
                                onClick={() => setView("grid")}
                                title="Grid view"
                                aria-label="Grid view"
                            >
                                <LayoutGrid size={13} />
                            </button>

                            <button
                                type="button"
                                className={`ll-view-btn ${view === "list" ? "active" : ""}`}
                                onClick={() => setView("list")}
                                title="List view"
                                aria-label="List view"
                            >
                                <List size={13} />
                            </button>

                            <button
                                type="button"
                                className={`ll-view-btn ${view === "editorial" ? "active" : ""}`}
                                onClick={() => setView("editorial")}
                                title="Magazine view"
                                aria-label="Magazine view"
                            >
                                <Rows3 size={13} />
                            </button>
                        </div>
                    </div>

                    {/* Expandable Filters */}
                    {showFilters && (
                        <div
                            style={{
                                display: "flex",
                                gap: 8,
                                flexWrap: "wrap",
                                marginTop: 10,
                                paddingTop: 10,
                                borderTop: "1px solid var(--ink-8)",
                            }}
                        >
                            <select
                                className="ll-select"
                                value={spec}
                                onChange={event => {
                                    setSpec(event.target.value)
                                    resetPage()
                                }}
                                aria-label="Filter by specialization"
                            >
                                {SPECIALIZATIONS.map(item => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>

                            <select
                                className="ll-select"
                                value={state}
                                onChange={event => {
                                    setState(event.target.value)
                                    resetPage()
                                }}
                                aria-label="Filter by state"
                            >
                                {STATES.map(item => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>

                            <select
                                className="ll-select"
                                value={lang}
                                onChange={event => {
                                    setLang(event.target.value)
                                    resetPage()
                                }}
                                aria-label="Filter by language"
                            >
                                {LANGUAGES.map(item => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>

                            <button
                                type="button"
                                className={`ll-quick-filter ${onlyAvailable ? "active" : ""}`}
                                onClick={() => {
                                    setOnlyAvailable(value => !value)
                                    resetPage()
                                }}
                            >
                                <span
                                    style={{
                                        width: 6,
                                        height: 6,
                                        borderRadius: "50%",
                                        background: onlyAvailable
                                            ? "#fff"
                                            : "var(--emerald)",
                                    }}
                                />
                                Available now
                            </button>

                            {activeFilters.length > 0 && (
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        fontSize: 11,
                                        color: "var(--gold-dk)",
                                        cursor: "pointer",
                                        fontFamily: "var(--mono)",
                                        padding: "4px 8px",
                                    }}
                                >
                                    Clear all ×
                                </button>
                            )}
                        </div>
                    )}

                    {/* Quick Specialization Filters */}
                    <div
                        style={{
                            display: "flex",
                            gap: 6,
                            marginTop: 10,
                            overflowX: "auto",
                            paddingBottom: 3,
                        }}
                    >
                        {SPECIALIZATIONS.slice(0, 12).map(item => (
                            <button
                                key={item}
                                type="button"
                                className={`ll-quick-filter ${(item === "All" && spec === "All") ||
                                    (item !== "All" && spec === item)
                                    ? "active"
                                    : ""
                                    }`}
                                onClick={() => {
                                    setSpec(item)
                                    resetPage()
                                }}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Results */}
            <div
                className="ll-container"
                style={{
                    paddingTop: 22,
                    paddingBottom: 48,
                }}
            >
                {/* Results Count */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 16,
                        flexWrap: "wrap",
                        gap: 8,
                    }}
                >
                    <div
                        style={{
                            fontFamily: "var(--mono)",
                            fontSize: 10,
                            color: "var(--ink-5)",
                        }}
                    >
                        {loading
                            ? "Loading lawyers..."
                            : `${totalLawyers} ${totalLawyers === 1 ? "lawyer" : "lawyers"
                            } found`}

                        {activeFilters.length > 0 && (
                            <span style={{ marginLeft: 8 }}>
                                {activeFilters.map(filter => (
                                    <span
                                        key={filter}
                                        style={{
                                            marginLeft: 4,
                                            padding: "2px 7px",
                                            background: "var(--gold-pale)",
                                            color: "var(--gold-dk)",
                                            borderRadius: 100,
                                            fontSize: 9,
                                            border: "1px solid rgba(201,168,76,.2)",
                                        }}
                                    >
                                        {filter}
                                    </span>
                                ))}
                            </span>
                        )}
                    </div>

                    {!loading && (
                        <div
                            style={{
                                fontFamily: "var(--mono)",
                                fontSize: 10,
                                color: "var(--ink-5)",
                            }}
                        >
                            Showing {visibleCount} of {totalLawyers}
                        </div>
                    )}
                </div>

                {/* Loading State */}
                {loading ? (
                    view === "list" ? (
                        <div className="ll-list">
                            {[1, 2, 3, 4, 5].map(index => (
                                <SkeletonCard key={index} view="list" />
                            ))}
                        </div>
                    ) : (
                        <div
                            className={
                                view === "editorial"
                                    ? "ll-editorial-grid"
                                    : "ll-grid"
                            }
                        >
                            {[1, 2, 3, 4, 5, 6].map(index => (
                                <SkeletonCard key={index} view="grid" />
                            ))}
                        </div>
                    )
                ) : totalLawyers === 0 ? (
                    /* Empty State */
                    <div
                        style={{
                            textAlign: "center",
                            padding: "56px 20px",
                        }}
                    >
                        <div
                            style={{
                                width: 56,
                                height: 56,
                                borderRadius: "50%",
                                background: "var(--ink-8)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto 14px",
                            }}
                        >
                            <User size={22} color="var(--ink-5)" />
                        </div>

                        <h3
                            style={{
                                fontFamily: "var(--serif)",
                                fontSize: 22,
                                marginBottom: 6,
                            }}
                        >
                            No lawyers found
                        </h3>

                        <p
                            style={{
                                color: "var(--ink-5)",
                                fontSize: 12,
                                marginBottom: 18,
                            }}
                        >
                            Try changing your search term or filters.
                        </p>

                        <button
                            type="button"
                            className="ll-book"
                            onClick={resetFilters}
                        >
                            Reset All Filters
                        </button>
                    </div>
                ) : (
                    renderCards()
                )}

                {/* Pagination / Show More */}
                {!loading && hasMore && (
                    <div className="ll-load-more">
                        <div
                            style={{
                                flex: 1,
                                height: 1,
                                background: "var(--ink-7)",
                            }}
                        />

                        <button
                            type="button"
                            className="ll-ghost"
                            style={{
                                padding: "9px 22px",
                                borderRadius: 100,
                                fontSize: 11,
                            }}
                            onClick={() => {
                                setPage(currentPage =>
                                    Math.min(currentPage + 1, totalPages)
                                )
                            }}
                        >
                            Show More Lawyers ({remainingCount} remaining)
                        </button>

                        <div
                            style={{
                                flex: 1,
                                height: 1,
                                background: "var(--ink-7)",
                            }}
                        />
                    </div>
                )}

                {/* All Results Displayed */}
                {!loading && totalLawyers > PAGE_SIZE && !hasMore && (
                    <div
                        style={{
                            textAlign: "center",
                            padding: "22px 0",
                            fontFamily: "var(--mono)",
                            fontSize: 10,
                            color: "var(--ink-5)",
                        }}
                    >
                        You are viewing all {totalLawyers} lawyers.
                    </div>
                )}
            </div>
        </div>
    )
}