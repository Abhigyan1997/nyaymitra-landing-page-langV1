// app/privacy/page.tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

// ─── Icons ────────────────────────────────────────────────────────────────────
const ShieldIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className="w-5 h-5">
        <path d="M12 3L4 7v5c0 4.4 3.4 8.5 8 9.5 4.6-1 8-5.1 8-9.5V7l-8-4z" />
        <path d="M9 12l2 2 4-4" />
    </svg>
)

const ArrowRightIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-4 h-4">
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
)

const LockIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-5 h-5">
        <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
)

const DatabaseIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-5 h-5">
        <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
)

const EyeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-5 h-5">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
)

const UsersIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-5 h-5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
)

const CardIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-5 h-5">
        <rect x="1" y="4" width="22" height="16" rx="2" /><path d="M1 10h22" />
    </svg>
)

const CheckIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className="w-4 h-4">
        <path d="M20 6L9 17l-5-5" />
    </svg>
)

const ServerIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><path d="M6 6h.01M6 18h.01" />
    </svg>
)

const BellIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-5 h-5">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
)

const MailIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-5 h-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
)

const GlobeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
)

const FileIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-5 h-5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
    </svg>
)

const FingerprintIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-5 h-5">
        <path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4" /><path d="M5 19.5C5.5 18 6 15 6 12c0-1.7.6-3.2 1.6-4.4" /><path d="M10.9 20.1c.3-1.5 1.1-3.7 2.1-5.1" /><path d="M12 10a2 2 0 0 1 2 2c0 2.4-1 4.8-1 7" /><path d="M20.9 12c.1-.7.1-1.3.1-2 0-3.3-1.6-6.3-4-8.1" /><path d="M17 19c.5-1 1-2 1-3" />
    </svg>
)

// ─── Data ─────────────────────────────────────────────────────────────────────

const SECTIONS = [
    { id: "collection", label: "Data Collection", icon: DatabaseIcon },
    { id: "usage", label: "How We Use Data", icon: EyeIcon },
    { id: "payment", label: "Payment Security", icon: CardIcon },
    { id: "sharing", label: "Data Sharing", icon: UsersIcon },
    { id: "rights", label: "Your Rights", icon: CheckIcon },
    { id: "security", label: "Security Measures", icon: ServerIcon },
    { id: "updates", label: "Policy Updates", icon: BellIcon },
    { id: "contact", label: "Contact Us", icon: MailIcon },
]

const DATA_CATEGORIES = [
    {
        title: "Personal Information",
        items: ["Full name", "Phone number", "Email address", "Date of birth"],
        icon: UsersIcon,
    },
    {
        title: "Identity Documents",
        items: ["Government ID (Aadhaar/PAN)", "Address proof", "Professional credentials (for lawyers)"],
        icon: FingerprintIcon,
    },
    {
        title: "Legal Data",
        items: ["Case documents", "Consultation history", "Chat transcripts", "Legal preferences"],
        icon: FileIcon,
    },
    {
        title: "Technical Data",
        items: ["IP address", "Device information", "Browser type", "Usage patterns"],
        icon: GlobeIcon,
    },
]

const USAGE_ITEMS = [
    "Process legal consultations and lawyer bookings",
    "Verify your identity for secure document notarization",
    "Send important updates, invoices, and confirmation emails",
    "Improve our AI assistant and service recommendations",
    "Comply with legal and regulatory requirements",
    "Prevent fraud and enhance platform security",
]

const SHARING_ITEMS = [
    "With the lawyer you book, for consultation purposes only",
    "With government agencies when required by law",
    "With our trusted service providers (hosting, email, analytics)",
    "To protect legal rights or prevent fraud",
]

const RIGHTS = [
    { title: "Access Data", desc: "View all personal information we hold about you" },
    { title: "Correct Errors", desc: "Update or fix inaccurate information" },
    { title: "Delete Data", desc: "Request permanent deletion of your data" },
    { title: "Opt-Out", desc: "Unsubscribe from marketing communications" },
    { title: "Data Portability", desc: "Export your data in a machine-readable format" },
    { title: "Withdraw Consent", desc: "Revoke previously given permissions" },
]

const SECURITY_BADGES = [
    "256-bit SSL/TLS",
    "JWT Authentication",
    "Data Encryption",
    "Secure APIs",
    "Regular Audits",
    "Access Controls",
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <span className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-[#c6973f] mb-3">
            {children}
        </span>
    )
}

function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <h2
            className={`font-serif text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] tracking-tight text-[#0d1117] ${className}`}
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
            {children}
        </h2>
    )
}

function ContentCard({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
    return (
        <section
            id={id}
            className={`bg-white border border-black/[0.07] rounded-xl p-7 md:p-9 ${className}`}
        >
            {children}
        </section>
    )
}

function CardHeading({ icon: Icon, label, color = "text-[#1a3a6b]" }: { icon: React.FC; label: string; color?: string }) {
    return (
        <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded bg-[#e8eef8] flex items-center justify-center text-[#1a3a6b]">
                <Icon />
            </div>
            <h3
                className="font-serif text-2xl text-[#0d1117]"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
                {label}
            </h3>
        </div>
    )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PrivacyPage() {
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    if (!mounted) return null

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
        .font-serif { font-family: 'DM Serif Display', Georgia, serif !important; }
        body { font-family: 'DM Sans', system-ui, sans-serif; }
        html { scroll-behavior: smooth; }
      `}</style>

            <div className="min-h-screen bg-white text-[#0d1117]" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

                {/* ── NAV ─────────────────────────────────────────────────────────── */}
                <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/[0.06] h-16 flex items-center justify-between px-6 lg:px-16">
                    <Link href="/" className="flex items-center gap-2.5 no-underline group">
                        <div className="w-8 h-8 bg-[#1a3a6b] rounded flex items-center justify-center text-white flex-shrink-0">
                            <ShieldIcon />
                        </div>
                        <span className="font-serif text-xl text-[#0d1117]" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
                            NyayMitra
                        </span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/lawyers"
                            className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded border border-black/10 text-[#374151] hover:bg-gray-50 transition-colors"
                        >
                            Find Lawyers
                        </Link>
                        <div className="w-px h-5 bg-black/10" />
                        <Link
                            href="/legal-gpt"
                            className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded bg-[#1a3a6b] text-white hover:bg-[#2952a3] transition-colors"
                        >
                            Get AI Advice
                        </Link>
                    </div>
                </nav>

                {/* ── HERO ────────────────────────────────────────────────────────── */}
                <section className="relative overflow-hidden bg-white px-6 lg:px-16 py-24 lg:py-36">
                    {/* grid background */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-100"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(13,17,23,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(13,17,23,0.05) 1px, transparent 1px)",
                            backgroundSize: "64px 64px",
                        }}
                    />
                    <div className="absolute top-0 right-0 w-[560px] h-[560px] -translate-y-1/3 translate-x-1/4 rounded-full bg-[#1a3a6b]/[0.05] blur-3xl pointer-events-none" />

                    <div className="relative z-10 max-w-4xl">
                        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.08em] uppercase px-3 py-1.5 rounded-sm bg-[#e8eef8] text-[#2952a3] mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2952a3]" />
                            Effective from June 2025
                        </span>

                        <h1
                            className="font-serif text-[clamp(3rem,7vw,5.5rem)] leading-[1.05] tracking-tight text-[#0d1117] mb-6"
                            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                        >
                            Your privacy,<br />
                            <em className="not-italic text-[#1a3a6b] italic">our promise.</em>
                        </h1>

                        <div className="w-16 h-0.5 bg-[#c6973f] rounded-full mb-6" />

                        <p className="text-[clamp(1rem,1.8vw,1.2rem)] text-[#6b7280] max-w-xl leading-[1.75] font-light">
                            How we protect, use, and safeguard your personal information across
                            all NyayMitra services.
                        </p>
                    </div>
                </section>

                <hr className="border-none border-t border-black/[0.06]" />

                {/* ── MAIN CONTENT ────────────────────────────────────────────────── */}
                <section className="px-6 lg:px-16 py-20 lg:py-28">
                    <div className="grid lg:grid-cols-[280px_1fr] gap-12 lg:gap-16 items-start">

                        {/* ── SIDEBAR ─────────────────────────────────────────────────── */}
                        <aside className="lg:sticky lg:top-24">
                            <SectionLabel>Contents</SectionLabel>
                            <p
                                className="font-serif text-2xl text-[#0d1117] mb-6"
                                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                            >
                                Privacy Hub
                            </p>

                            <nav className="space-y-1">
                                {SECTIONS.map(({ id, label, icon: Icon }) => (
                                    <a
                                        key={id}
                                        href={`#${id}`}
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#374151] hover:text-[#1a3a6b] hover:bg-[#e8eef8] transition-all group text-sm font-medium"
                                    >
                                        <span className="text-[#1a3a6b]/40 group-hover:text-[#1a3a6b] transition-colors">
                                            <Icon />
                                        </span>
                                        {label}
                                        <ArrowRightIcon />
                                    </a>
                                ))}
                            </nav>

                            {/* Trust badge */}
                            <div className="mt-8 p-5 border border-black/[0.07] rounded-xl bg-[#f8f7f4]">
                                <div className="w-9 h-9 rounded bg-[#e8eef8] flex items-center justify-center text-[#1a3a6b] mb-3">
                                    <FingerprintIcon />
                                </div>
                                <p className="text-[0.825rem] text-[#6b7280] leading-[1.65]">
                                    Your data is protected with industry-standard encryption and security protocols.
                                </p>
                            </div>
                        </aside>

                        {/* ── CONTENT AREA ────────────────────────────────────────────── */}
                        <div className="space-y-6">

                            {/* Introduction */}
                            <ContentCard>
                                <CardHeading icon={ShieldIcon} label="Our Commitment to Privacy" />
                                <p className="text-[0.975rem] text-[#374151] leading-[1.8] mb-5">
                                    At <span className="font-semibold text-[#1a3a6b]">NyayMitra</span>, your privacy is our highest priority. We are committed to protecting your personal information
                                    and maintaining transparency about how we collect, use, and safeguard your data.
                                </p>
                                <div className="bg-[#e8eef8] border border-[#1a3a6b]/10 rounded-lg p-4 flex items-start gap-3">
                                    <span className="text-[#1a3a6b] mt-0.5 flex-shrink-0"><LockIcon /></span>
                                    <p className="text-sm text-[#374151] leading-[1.7]">
                                        This Privacy Policy applies to all services offered by NyayMitra, including our website, mobile app, and legal consultation platform.
                                    </p>
                                </div>
                            </ContentCard>

                            {/* Data Collection */}
                            <ContentCard id="collection">
                                <CardHeading icon={DatabaseIcon} label="Information We Collect" />
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {DATA_CATEGORIES.map((cat, i) => (
                                        <div key={i} className="p-5 border border-black/[0.07] rounded-xl bg-[#f8f7f4] hover:border-[#1a3a6b]/20 hover:shadow-[0_4px_16px_rgba(26,58,107,0.06)] transition-all">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-[#1a3a6b]"><cat.icon /></span>
                                                <h4 className="font-semibold text-[#0d1117] text-sm">{cat.title}</h4>
                                            </div>
                                            <ul className="space-y-1.5">
                                                {cat.items.map((item, j) => (
                                                    <li key={j} className="flex items-start gap-2 text-[#6b7280] text-sm">
                                                        <span className="w-1 h-1 rounded-full bg-[#c6973f] mt-[7px] flex-shrink-0" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </ContentCard>

                            {/* How We Use Data */}
                            <ContentCard id="usage">
                                <CardHeading icon={EyeIcon} label="How We Use Your Information" />
                                <div className="space-y-3">
                                    {USAGE_ITEMS.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="w-5 h-5 rounded-full bg-[#e8eef8] flex items-center justify-center text-[#1a3a6b] flex-shrink-0 mt-0.5">
                                                <CheckIcon />
                                            </div>
                                            <span className="text-[0.975rem] text-[#374151] leading-[1.7]">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </ContentCard>

                            {/* Payment Security */}
                            <ContentCard id="payment">
                                <CardHeading icon={CardIcon} label="Payment Security" />
                                <blockquote className="border-l-[3px] border-[#c6973f] pl-6 py-3 bg-[#fdf6e8] rounded-r-md mb-5">
                                    <p className="text-[0.975rem] text-[#374151] leading-[1.75]">
                                        All payments on NyayMitra are processed through <span className="font-semibold text-[#0d1117]">Razorpay</span>, a PCI-DSS compliant payment gateway.
                                        We <em>never</em> store your credit/debit card details, CVV, or sensitive financial information on our servers.
                                    </p>
                                </blockquote>
                                <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                                    <span className="text-[#1a3a6b]"><LockIcon /></span>
                                    256-bit SSL encryption for all transactions
                                </div>
                            </ContentCard>

                            {/* Data Sharing */}
                            <ContentCard id="sharing">
                                <CardHeading icon={UsersIcon} label="Data Sharing & Disclosure" />
                                <p className="text-[0.975rem] text-[#374151] leading-[1.75] mb-5">
                                    We respect your privacy and do <span className="font-semibold text-[#1a3a6b]">not</span> sell or rent your personal data. Your information is shared only:
                                </p>
                                <div className="space-y-3">
                                    {SHARING_ITEMS.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3 p-3 border border-black/[0.06] rounded-lg bg-[#f8f7f4]">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#c6973f] mt-[9px] flex-shrink-0" />
                                            <span className="text-[0.925rem] text-[#374151] leading-[1.7]">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </ContentCard>

                            {/* Your Rights */}
                            <ContentCard id="rights">
                                <CardHeading icon={ShieldIcon} label="Your Privacy Rights" />
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {RIGHTS.map((right, i) => (
                                        <div
                                            key={i}
                                            className="p-5 border border-black/[0.07] rounded-xl bg-[#f8f7f4] hover:border-[#1a3a6b]/20 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(26,58,107,0.08)] transition-all duration-300"
                                        >
                                            <div className="flex items-center gap-2 mb-1.5">
                                                <div className="w-5 h-5 rounded-full bg-[#e8eef8] flex items-center justify-center text-[#1a3a6b] flex-shrink-0">
                                                    <CheckIcon />
                                                </div>
                                                <h4 className="font-semibold text-[#0d1117] text-sm">{right.title}</h4>
                                            </div>
                                            <p className="text-xs text-[#6b7280] leading-[1.65] pl-7">{right.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </ContentCard>

                            {/* Security Measures */}
                            <ContentCard id="security">
                                <CardHeading icon={ServerIcon} label="Security Measures" />
                                <div className="flex flex-wrap gap-2 mb-5">
                                    {SECURITY_BADGES.map((badge, i) => (
                                        <span
                                            key={i}
                                            className="text-xs font-medium px-3 py-1.5 rounded-sm bg-[#e8eef8] text-[#1a3a6b] border border-[#1a3a6b]/10"
                                        >
                                            {badge}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-[0.925rem] text-[#6b7280] leading-[1.7]">
                                    We follow industry-standard security practices and regularly update our systems to protect against
                                    unauthorized access, data breaches, and cyber threats.
                                </p>
                            </ContentCard>

                            {/* Cookies */}
                            <ContentCard>
                                <CardHeading icon={GlobeIcon} label="Cookies & Tracking" />
                                <p className="text-[0.975rem] text-[#374151] leading-[1.8]">
                                    We use cookies to enhance your browsing experience, analyze platform usage, and personalize content.
                                    You can control cookie preferences through your browser settings at any time.
                                </p>
                            </ContentCard>

                            {/* Policy Updates */}
                            <ContentCard id="updates">
                                <CardHeading icon={BellIcon} label="Updates to This Policy" />
                                <p className="text-[0.975rem] text-[#374151] leading-[1.8] mb-5">
                                    We may update this Privacy Policy to reflect changes in our practices or legal requirements.
                                    Significant changes will be notified via email or platform notification. We encourage you to review this page periodically.
                                </p>
                                <div className="pt-4 border-t border-black/[0.06]">
                                    <p className="text-sm text-[#9ca3af]">
                                        Last reviewed:{" "}
                                        {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                                    </p>
                                </div>
                            </ContentCard>

                            {/* Consent */}
                            <div className="border border-black/[0.07] rounded-xl p-7 bg-[#f8f7f4]">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded bg-[#e8eef8] flex items-center justify-center text-[#1a3a6b] flex-shrink-0">
                                        <ShieldIcon />
                                    </div>
                                    <div>
                                        <h3
                                            className="font-serif text-lg text-[#0d1117] mb-2"
                                            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                                        >
                                            Your Consent
                                        </h3>
                                        <p className="text-[0.925rem] text-[#6b7280] leading-[1.7]">
                                            By using NyayMitra, you consent to the collection, use, and sharing of your information as described in this Privacy Policy.
                                            If you do not agree with any part of this policy, please discontinue using our services.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact */}
                            <ContentCard id="contact">
                                <CardHeading icon={MailIcon} label="Privacy Questions?" />
                                <p className="text-[0.975rem] text-[#374151] leading-[1.75] mb-6">
                                    If you have questions about this Privacy Policy or want to exercise your data rights, our privacy team is here to help.
                                </p>
                                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                                    {[
                                        { label: "Email", value: "privacy@nyaymitra.tech" },
                                        { label: "Support", value: "support@nyaymitra.tech" },
                                    ].map((c) => (
                                        <div key={c.label} className="flex items-center gap-3 p-4 border border-black/[0.07] rounded-xl bg-[#f8f7f4] hover:border-[#1a3a6b]/20 transition-colors">
                                            <div className="w-9 h-9 rounded bg-[#e8eef8] flex items-center justify-center text-[#1a3a6b] flex-shrink-0">
                                                <MailIcon />
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-semibold tracking-[0.06em] uppercase text-[#9ca3af] mb-0.5">{c.label}</p>
                                                <a
                                                    href={`mailto:${c.value}`}
                                                    className="text-sm text-[#1a3a6b] hover:text-[#2952a3] transition-colors font-medium"
                                                >
                                                    {c.value}
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-center text-sm text-[#9ca3af]">
                                    We typically respond to privacy inquiries within 48 hours.
                                </p>
                            </ContentCard>

                        </div>
                    </div>
                </section>

                {/* ── CTA ─────────────────────────────────────────────────────────── */}
                <section className="relative bg-[#0d1117] overflow-hidden px-6 lg:px-16 py-20 lg:py-28">
                    <div className="absolute top-0 left-0 w-[500px] h-[500px] -translate-x-1/3 -translate-y-1/3 rounded-full bg-[#1a3a6b]/40 blur-[80px] pointer-events-none" />
                    <div className="relative z-10 max-w-xl">
                        <SectionLabel>Get started today</SectionLabel>
                        <h2
                            className="font-serif text-[clamp(2rem,4vw,3rem)] text-white leading-[1.1] tracking-tight mb-4"
                            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                        >
                            Ready to get the legal help you deserve?
                        </h2>
                        <p className="text-[1rem] text-white/50 leading-[1.7] mb-8">
                            Join thousands of Indians who trust NyayMitra for clear, accessible, and verified legal guidance.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="/legal-gpt"
                                className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded bg-white text-[#0d1117] hover:bg-gray-100 transition-colors"
                            >
                                <LockIcon />
                                Ask Legal GPT
                            </Link>
                            <Link
                                href="/lawyers"
                                className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded border border-white/20 text-white/80 hover:border-white/40 hover:text-white transition-colors"
                            >
                                Find Lawyers
                                <ArrowRightIcon />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ── FOOTER ──────────────────────────────────────────────────────── */}
                <div className="bg-[#0d1117] border-t border-white/[0.06] px-6 lg:px-16 py-5 flex items-center justify-between flex-wrap gap-3">
                    <span className="text-[0.8rem] text-white/30">© 2025 NyayMitra. All rights reserved.</span>
                    <div className="flex gap-6">
                        {["Privacy", "Terms", "Contact"].map((l) => (
                            <Link key={l} href="#" className="text-[0.8rem] text-white/30 hover:text-white/70 transition-colors no-underline">
                                {l}
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </>
    )
}