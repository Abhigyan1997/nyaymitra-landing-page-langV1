// app/terms/page.tsx
"use client"

import React from "react"
import Link from "next/link"

// ─── Icons ────────────────────────────────────────────────────────────────────
const ShieldIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className="w-5 h-5">
        <path d="M12 3L4 7v5c0 4.4 3.4 8.5 8 9.5 4.6-1 8-5.1 8-9.5V7l-8-4z" />
        <path d="M9 12l2 2 4-4" />
    </svg>
)
const ScaleIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-4 h-4">
        <path d="M12 3v18M3 8l9-5 9 5M5 10l-2 5h4L5 10zM19 10l-2 5h4L19 10z" />
        <line x1="3" y1="21" x2="21" y2="21" />
    </svg>
)
const UsersIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-4 h-4">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
)
const UserCheckIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-4 h-4">
        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="8.5" cy="7" r="4" />
        <polyline points="17 11 19 13 23 9" />
    </svg>
)
const BanIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-4 h-4">
        <circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    </svg>
)
const RefreshIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-4 h-4">
        <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
    </svg>
)
const MailIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-4 h-4">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
)
const PhoneIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-4 h-4">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
)
const ClockIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-4 h-4">
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
    </svg>
)
const AlertIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-4 h-4 flex-shrink-0">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
)
const ChevronRightIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
        <path d="M9 18l6-6-6-6" />
    </svg>
)
const BookIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-4 h-4">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
)

// ─── Data ─────────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
    { href: "#general", label: "General Terms", icon: <ScaleIcon /> },
    { href: "#lawyers", label: "Lawyer Terms", icon: <UsersIcon /> },
    { href: "#privacy", label: "Privacy & Data", icon: <UserCheckIcon /> },
    { href: "#restrictions", label: "Restrictions", icon: <BanIcon /> },
    { href: "#changes", label: "Changes to Terms", icon: <RefreshIcon /> },
    { href: "#contact", label: "Contact Us", icon: <MailIcon /> },
]

const GENERAL_TERMS = [
    "You must be at least 18 years old to use this platform.",
    "You are responsible for the accuracy of your personal information, documents, and consultation details.",
    "All bookings are non-transferable and subject to lawyer availability.",
    "NyayMitra reserves the right to suspend or block accounts involved in suspicious or unethical activity.",
    "Users agree to communicate respectfully with lawyers and platform staff.",
    "Any false information or misrepresentation may lead to immediate account termination.",
]

const LAWYER_TERMS = [
    "Lawyers must provide accurate, updated, and verified information including qualifications, specialization, and license details.",
    "Lawyers agree to uphold professional standards during all consultations booked through NyayMitra.",
    "Lawyers are not employees or agents of NyayMitra. They operate as independent professionals solely responsible for the legal advice provided.",
    "Any misuse of the platform — including misinformation, abuse, or no-shows — may result in suspension or permanent removal.",
    "Lawyers must ensure availability and timely communication with clients who book through the platform.",
    "NyayMitra reserves the right to remove profiles that receive consistent negative feedback or breach platform terms.",
    "Lawyers must maintain client confidentiality as per legal ethics and applicable laws.",
    "Lawyers are required to respond to client queries within 24 hours on business days.",
]

const PAYMENT_TERMS = [
    "Consultation fees are displayed before booking and are non-refundable after the consultation begins.",
    "Cancellations made 24 hours before the scheduled consultation are eligible for a full refund.",
    "Technical issues from NyayMitra's side that prevent consultation will result in a full refund or rescheduling.",
    "Payment disputes must be raised within 7 days of the transaction date.",
    "All prices are in Indian Rupees (INR) and include applicable taxes.",
]

const RESTRICTIONS = [
    "Using the platform for illegal purposes or harassing lawyers or staff.",
    "Sharing offensive, abusive, or discriminatory content.",
    "Attempting to bypass payment systems or sharing account credentials.",
    "Providing false information during registration or consultation.",
    "Recording consultations without explicit consent from all parties.",
    "Using the platform to solicit business outside NyayMitra's ecosystem.",
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <span className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-[#c6973f] mb-3">
            {children}
        </span>
    )
}

function BulletList({ items, color = "#1a3a6b" }: { items: string[]; color?: string }) {
    return (
        <ul className="space-y-3">
            {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[0.9rem] text-[#374151] leading-[1.75]">
                    <span
                        className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0"
                        style={{ backgroundColor: color }}
                    />
                    {item}
                </li>
            ))}
        </ul>
    )
}

function ContentCard({
    id,
    label,
    title,
    icon,
    children,
    accent = false,
}: {
    id?: string
    label?: string
    title: string
    icon: React.ReactNode
    children: React.ReactNode
    accent?: boolean
}) {
    return (
        <section
            id={id}
            className={`rounded-xl border p-8 scroll-mt-24 ${accent
                    ? "bg-[#fdf6e8] border-[#c6973f]/30"
                    : "bg-white border-black/[0.07]"
                }`}
        >
            <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-[#e8eef8] flex items-center justify-center text-[#1a3a6b] flex-shrink-0">
                    {icon}
                </div>
                <div>
                    {label && <SectionLabel>{label}</SectionLabel>}
                    <h2
                        className="font-serif text-xl text-[#0d1117] leading-snug"
                        style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                    >
                        {title}
                    </h2>
                </div>
            </div>
            {children}
        </section>
    )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TermsPage() {
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
        html { scroll-behavior: smooth; }
      `}</style>

            <div className="min-h-screen bg-white text-[#0d1117]" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

                {/* ── NAV ───────────────────────────────────────────────────────────── */}
                <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/[0.06] h-16 flex items-center justify-between px-6 lg:px-16">
                    <Link href="/" className="flex items-center gap-2.5 no-underline">
                        <div className="w-8 h-8 bg-[#1a3a6b] rounded flex items-center justify-center text-white flex-shrink-0">
                            <ShieldIcon />
                        </div>
                        <span
                            className="text-xl text-[#0d1117]"
                            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                        >
                            NyayMitra
                        </span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <Link href="/lawyers" className="inline-flex items-center text-sm font-medium px-4 py-2 rounded border border-black/10 text-[#374151] hover:bg-gray-50 transition-colors">
                            Find Lawyers
                        </Link>
                        <div className="w-px h-5 bg-black/10" />
                        <Link href="/legal-gpt" className="inline-flex items-center text-sm font-medium px-4 py-2 rounded bg-[#1a3a6b] text-white hover:bg-[#2952a3] transition-colors">
                            Get AI Advice
                        </Link>
                    </div>
                </nav>

                {/* ── HERO ──────────────────────────────────────────────────────────── */}
                <section className="relative overflow-hidden bg-white px-6 lg:px-16 py-20 lg:py-28">
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(13,17,23,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(13,17,23,0.05) 1px, transparent 1px)",
                            backgroundSize: "64px 64px",
                        }}
                    />
                    <div className="absolute top-0 right-0 w-[480px] h-[480px] -translate-y-1/3 translate-x-1/4 rounded-full bg-[#1a3a6b]/[0.05] blur-3xl pointer-events-none" />

                    <div className="relative z-10 max-w-2xl">
                        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.08em] uppercase px-3 py-1.5 rounded-sm bg-[#e8eef8] text-[#2952a3] mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2952a3]" />
                            Legal Agreement
                        </span>
                        <h1
                            className="text-[clamp(2.8rem,6vw,5rem)] leading-[1.05] tracking-tight text-[#0d1117] mb-5"
                            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                        >
                            Terms &amp;<br />
                            <em className="italic text-[#1a3a6b]">Conditions.</em>
                        </h1>
                        <div className="w-16 h-0.5 bg-[#c6973f] rounded-full mb-5" />
                        <p className="text-[clamp(1rem,1.6vw,1.15rem)] text-[#6b7280] max-w-lg leading-[1.75] font-light">
                            Please read these terms carefully before using the NyayMitra platform.
                        </p>
                        <p className="inline-flex items-center gap-2 text-[0.8rem] text-[#9ca3af] mt-4">
                            <ClockIcon />
                            Last updated: March 2026
                        </p>
                    </div>
                </section>

                <hr className="border-none border-t border-black/[0.06]" />

                {/* ── MAIN LAYOUT ───────────────────────────────────────────────────── */}
                <div className="px-6 lg:px-16 py-16 lg:py-24">
                    <div className="grid lg:grid-cols-[240px_1fr] gap-12 lg:gap-16 items-start">

                        {/* ── SIDEBAR ─────────────────────────────────────────────────── */}
                        <aside className="lg:sticky lg:top-24">
                            <div className="border border-black/[0.08] rounded-xl overflow-hidden">
                                <div className="px-5 py-4 border-b border-black/[0.06] flex items-center gap-2">
                                    <div className="w-7 h-7 rounded bg-[#e8eef8] flex items-center justify-center text-[#1a3a6b]">
                                        <BookIcon />
                                    </div>
                                    <span
                                        className="text-[0.95rem] text-[#0d1117]"
                                        style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                                    >
                                        Contents
                                    </span>
                                </div>
                                <nav className="py-2">
                                    {NAV_ITEMS.map((item) => (
                                        <a
                                            key={item.label}
                                            href={item.href}
                                            className="group flex items-center gap-2.5 px-5 py-2.5 text-[0.875rem] text-[#6b7280] hover:text-[#0d1117] hover:bg-[#f8f7f4] transition-colors no-underline"
                                        >
                                            <span className="text-[#1a3a6b] opacity-60 group-hover:opacity-100 transition-opacity">
                                                {item.icon}
                                            </span>
                                            {item.label}
                                            <ChevronRightIcon />
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        </aside>

                        {/* ── CONTENT ─────────────────────────────────────────────────── */}
                        <div className="space-y-6 min-w-0">

                            {/* Introduction */}
                            <ContentCard
                                id="general"
                                label="Overview"
                                title="Introduction"
                                icon={<ScaleIcon />}
                            >
                                <p className="text-[0.9rem] text-[#374151] leading-[1.8] mb-4">
                                    Welcome to{" "}
                                    <span className="font-semibold text-[#1a3a6b]">NyayMitra</span>. By accessing or using our platform,
                                    you agree to comply with the following terms and conditions. NyayMitra is committed to providing a
                                    secure, transparent, and efficient legal-tech platform that connects users with verified legal professionals.
                                </p>
                                <div className="flex items-start gap-3 bg-[#e8eef8] rounded-lg px-4 py-3 border border-[#1a3a6b]/10">
                                    <span className="text-[#1a3a6b] mt-0.5"><AlertIcon /></span>
                                    <p className="text-[0.85rem] text-[#374151] leading-[1.7]">
                                        <span className="font-semibold text-[#1a3a6b]">Important: </span>
                                        NyayMitra is a technology platform that connects users with verified lawyers. We do not provide
                                        direct legal advice or representation. All legal advice comes from independent legal professionals.
                                    </p>
                                </div>
                            </ContentCard>

                            {/* General Terms */}
                            <ContentCard
                                title="General Terms"
                                icon={<ShieldIcon />}
                            >
                                <BulletList items={GENERAL_TERMS} color="#1a3a6b" />
                            </ContentCard>

                            {/* Lawyer Terms */}
                            <ContentCard
                                id="lawyers"
                                label="For legal professionals"
                                title="Additional Terms for Lawyers"
                                icon={<UsersIcon />}
                            >
                                <BulletList items={LAWYER_TERMS} color="#1a6b5e" />
                            </ContentCard>

                            {/* Payment */}
                            <ContentCard
                                title="Payment &amp; Refund Policy"
                                icon={<ScaleIcon />}
                            >
                                <BulletList items={PAYMENT_TERMS} color="#c6973f" />
                            </ContentCard>

                            {/* Restrictions */}
                            <ContentCard
                                id="restrictions"
                                label="Prohibited activities"
                                title="What's not allowed"
                                icon={<BanIcon />}
                            >
                                <BulletList items={RESTRICTIONS} color="#a32d2d" />
                            </ContentCard>

                            {/* Changes */}
                            <ContentCard
                                id="changes"
                                title="Changes to Terms"
                                icon={<RefreshIcon />}
                            >
                                <div className="space-y-3 text-[0.9rem] text-[#374151] leading-[1.8]">
                                    <p>
                                        NyayMitra may update these terms at any time to reflect changes in laws, platform features, or
                                        business operations. We will notify users of significant changes via email or platform notification.
                                    </p>
                                    <p>
                                        Continued use of the platform after changes indicates your acceptance of the revised terms. If you
                                        do not agree with any part of these terms, please discontinue using our services.
                                    </p>
                                </div>
                            </ContentCard>

                            {/* Disclaimer */}
                            <section className="rounded-xl border border-[#c6973f]/30 bg-[#fdf6e8] px-8 py-6">
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-[#c6973f]/15 flex items-center justify-center text-[#c6973f] flex-shrink-0 mt-0.5">
                                        <AlertIcon />
                                    </div>
                                    <div>
                                        <h3
                                            className="text-base text-[#0d1117] mb-2"
                                            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                                        >
                                            Legal Disclaimer
                                        </h3>
                                        <p className="text-[0.875rem] text-[#374151] leading-[1.75]">
                                            The information provided on NyayMitra is for general informational purposes only and does not
                                            constitute legal advice. No lawyer-client relationship is formed through the use of this platform.
                                            Always seek the advice of a qualified lawyer for your specific legal situation. NyayMitra shall not
                                            be liable for any decisions made based on information provided through the platform.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Contact */}
                            <section id="contact" className="rounded-xl border border-black/[0.07] bg-white overflow-hidden scroll-mt-24">
                                <div className="bg-[#1a3a6b] px-8 py-7 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-48 h-48 translate-x-1/3 -translate-y-1/3 rounded-full bg-white/5 pointer-events-none" />
                                    <span className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-[#c6973f] mb-2">Get in touch</span>
                                    <h2
                                        className="text-2xl text-white relative z-10"
                                        style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                                    >
                                        Questions about these terms?
                                    </h2>
                                    <p className="text-[0.875rem] text-white/60 mt-1 max-w-md">
                                        If you have any questions, concerns, or need clarification, please reach out to our support team.
                                    </p>
                                </div>
                                <div className="px-8 py-6 grid sm:grid-cols-2 gap-4">
                                    <a
                                        href="mailto:support@nyaymitra.tech"
                                        className="flex items-center gap-3 px-4 py-3.5 rounded-lg border border-black/[0.08] hover:border-[#1a3a6b]/30 hover:bg-[#f8f7f4] transition-all no-underline group"
                                    >
                                        <div className="w-9 h-9 rounded-lg bg-[#e8eef8] flex items-center justify-center text-[#1a3a6b] flex-shrink-0">
                                            <MailIcon />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-semibold tracking-wide uppercase text-[#9ca3af]">Email</p>
                                            <p className="text-[0.875rem] text-[#374151] group-hover:text-[#1a3a6b] transition-colors">
                                                support@nyaymitra.tech
                                            </p>
                                        </div>
                                    </a>
                                    <a
                                        href="tel:+917970596183"
                                        className="flex items-center gap-3 px-4 py-3.5 rounded-lg border border-black/[0.08] hover:border-[#1a3a6b]/30 hover:bg-[#f8f7f4] transition-all no-underline group"
                                    >
                                        <div className="w-9 h-9 rounded-lg bg-[#e8eef8] flex items-center justify-center text-[#1a3a6b] flex-shrink-0">
                                            <PhoneIcon />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-semibold tracking-wide uppercase text-[#9ca3af]">Phone</p>
                                            <p className="text-[0.875rem] text-[#374151] group-hover:text-[#1a3a6b] transition-colors">
                                                +91 79705 96183
                                            </p>
                                        </div>
                                    </a>
                                </div>
                            </section>

                        </div>
                    </div>
                </div>

                {/* ── FOOTER ────────────────────────────────────────────────────────── */}
                <div className="bg-[#0d1117] border-t border-white/[0.06] px-6 lg:px-16 py-5 flex items-center justify-between flex-wrap gap-3">
                    <span className="text-[0.8rem] text-white/30">© {new Date().getFullYear()} NyayMitra. All rights reserved.</span>
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