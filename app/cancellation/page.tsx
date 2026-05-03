// app/cancellation/page.tsx
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

const RefreshIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-5 h-5">
        <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
)

const CalendarXIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-5 h-5">
        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="10" y1="14" x2="14" y2="18" /><line x1="14" y1="14" x2="10" y2="18" />
    </svg>
)

const ClockIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
)

const CheckIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className="w-4 h-4">
        <path d="M20 6L9 17l-5-5" />
    </svg>
)

const BanIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    </svg>
)

const FileIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-5 h-5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
    </svg>
)

const MailIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-5 h-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
)

const PhoneIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-5 h-5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.77 12 19.79 19.79 0 0 1 1.72 3.34 2 2 0 0 1 3.69 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.66a16 16 0 0 0 6.29 6.29l1.02-1.02a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
)

const DollarIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-5 h-5">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
)

const AlertIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
)

const InfoIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-4 h-4">
        <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
    </svg>
)

// ─── Data ─────────────────────────────────────────────────────────────────────

const SECTIONS = [
    { id: "cancellation", label: "Booking Cancellation", icon: CalendarXIcon },
    { id: "eligibility", label: "Refund Eligibility", icon: CheckIcon },
    { id: "process", label: "Refund Process", icon: RefreshIcon },
    { id: "timeline", label: "Refund Timeline", icon: ClockIcon },
    { id: "special", label: "Special Cases", icon: FileIcon },
    { id: "exceptions", label: "Non-Refundable Items", icon: BanIcon },
    { id: "disputes", label: "Dispute Resolution", icon: ShieldIcon },
    { id: "contact", label: "Contact Support", icon: MailIcon },
]

const CANCELLATION_TIERS = [
    {
        title: "Standard Cancellation",
        time: "12+ hours before",
        refund: "100% Full Refund",
        variant: "green",
    },
    {
        title: "Late Cancellation",
        time: "Within 12 hours",
        refund: "No Refund / Partial",
        variant: "amber",
    },
    {
        title: "Lawyer Cancellation",
        time: "Any time",
        refund: "Full Refund or Free Reschedule",
        variant: "blue",
    },
]

const ELIGIBILITY_ITEMS = [
    "Eligible cancellations made within the specified timeframe",
    "Failed transactions due to technical issues on our platform",
    "Duplicate payments or accidental charges",
    "Service not delivered as promised (verified by our team)",
    "Lawyer no-show or cancellation without adequate notice",
]

const PROCESS_STEPS = [
    { step: "01", title: "Submit Request", desc: "Email us with your booking ID and reason for cancellation" },
    { step: "02", title: "Verification", desc: "Our team reviews your request within 24–48 hours" },
    { step: "03", title: "Approval", desc: "You'll receive email confirmation if eligible" },
    { step: "04", title: "Processing", desc: "Refund initiated to original payment method" },
]

const SPECIAL_CASES = [
    "Notary services once initiated may be non-refundable due to third-party processing fees",
    "Physical stamp paper purchases are non-refundable after procurement",
    "Courier delivery failures may qualify for redelivery or partial refund",
    "Document drafting services are refundable only before work begins",
]

const NON_REFUNDABLE = [
    "Completed consultations",
    "Downloaded documents",
    "Government fees",
    "Stamp duty charges",
    "Third-party processing fees",
    "Express delivery charges",
]

const DISPUTE_STEPS = [
    "Contact our support team for initial review",
    "Escalate to refund supervisor (48-hour response)",
    "File a formal complaint with supporting documents",
    "Final decision within 7 business days",
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <span className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-[#c6973f] mb-3">
            {children}
        </span>
    )
}

function ContentCard({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
    return (
        <section id={id} className={`bg-white border border-black/[0.07] rounded-xl p-7 md:p-9 ${className}`}>
            {children}
        </section>
    )
}

function CardHeading({ icon: Icon, label }: { icon: React.FC; label: string }) {
    return (
        <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded bg-[#e8eef8] flex items-center justify-center text-[#1a3a6b]">
                <Icon />
            </div>
            <h3 className="font-serif text-2xl text-[#0d1117]" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
                {label}
            </h3>
        </div>
    )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CancellationPage() {
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
                    <div
                        className="absolute inset-0 pointer-events-none"
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
                            Cancellations &amp;<br />
                            <em className="not-italic text-[#1a3a6b] italic">refunds, made clear.</em>
                        </h1>

                        <div className="w-16 h-0.5 bg-[#c6973f] rounded-full mb-6" />

                        <p className="text-[clamp(1rem,1.8vw,1.2rem)] text-[#6b7280] max-w-xl leading-[1.75] font-light">
                            Clear, fair, and transparent policies for cancellations and refunds
                            across all NyayMitra services.
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
                                Policy Guide
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

                            {/* Quick help box */}
                            <div className="mt-8 p-5 border border-black/[0.07] rounded-xl bg-[#f8f7f4]">
                                <div className="w-9 h-9 rounded bg-[#e8eef8] flex items-center justify-center text-[#1a3a6b] mb-3">
                                    <DollarIcon />
                                </div>
                                <p className="text-[0.825rem] text-[#6b7280] leading-[1.65]">
                                    Need immediate assistance with a refund? Contact our support team within 48 hours of your scheduled service.
                                </p>
                            </div>
                        </aside>

                        {/* ── CONTENT AREA ────────────────────────────────────────────── */}
                        <div className="space-y-6">

                            {/* Introduction */}
                            <ContentCard>
                                <CardHeading icon={ShieldIcon} label="Our Commitment to Fairness" />
                                <p className="text-[0.975rem] text-[#374151] leading-[1.8] mb-5">
                                    At <span className="font-semibold text-[#1a3a6b]">NyayMitra</span>, we understand that circumstances may change.
                                    This policy outlines the terms under which users can cancel bookings and request refunds for services offered through our platform.
                                </p>
                                <div className="bg-[#e8eef8] border border-[#1a3a6b]/10 rounded-lg p-4 flex items-start gap-3">
                                    <span className="text-[#1a3a6b] mt-0.5 flex-shrink-0"><AlertIcon /></span>
                                    <p className="text-sm text-[#374151] leading-[1.7]">
                                        We strive to process all refund requests fairly and transparently. Please review this policy carefully before making a booking.
                                    </p>
                                </div>
                            </ContentCard>

                            {/* Booking Cancellation */}
                            <ContentCard id="cancellation">
                                <CardHeading icon={CalendarXIcon} label="Booking Cancellation Policy" />
                                <div className="grid md:grid-cols-3 gap-4">
                                    {CANCELLATION_TIERS.map((tier, i) => {
                                        const styles: Record<string, { border: string; bg: string; badge: string; badgeText: string; refundText: string; dot: string }> = {
                                            green: {
                                                border: "border-[#1a3a6b]/15",
                                                bg: "bg-[#f0f4fa]",
                                                badge: "bg-[#e8eef8]",
                                                badgeText: "text-[#1a3a6b]",
                                                refundText: "text-[#1a3a6b]",
                                                dot: "bg-[#1a3a6b]",
                                            },
                                            amber: {
                                                border: "border-[#c6973f]/20",
                                                bg: "bg-[#fdf6e8]",
                                                badge: "bg-[#faefd4]",
                                                badgeText: "text-[#c6973f]",
                                                refundText: "text-[#c6973f]",
                                                dot: "bg-[#c6973f]",
                                            },
                                            blue: {
                                                border: "border-[#2952a3]/15",
                                                bg: "bg-[#eef2fb]",
                                                badge: "bg-[#dce6f5]",
                                                badgeText: "text-[#2952a3]",
                                                refundText: "text-[#2952a3]",
                                                dot: "bg-[#2952a3]",
                                            },
                                        }
                                        const s = styles[tier.variant]
                                        return (
                                            <div key={i} className={`p-5 border ${s.border} ${s.bg} rounded-xl`}>
                                                <span className={`text-[11px] font-semibold tracking-[0.06em] uppercase px-2.5 py-1 rounded-sm ${s.badge} ${s.badgeText} inline-block mb-3`}>
                                                    {tier.time}
                                                </span>
                                                <h4 className="font-semibold text-[#0d1117] text-sm mb-1">{tier.title}</h4>
                                                <p className={`text-sm font-semibold ${s.refundText}`}>{tier.refund}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </ContentCard>

                            {/* Refund Eligibility */}
                            <ContentCard id="eligibility">
                                <CardHeading icon={CheckIcon} label="Refund Eligibility Criteria" />
                                <div className="space-y-3 mb-5">
                                    {ELIGIBILITY_ITEMS.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="w-5 h-5 rounded-full bg-[#e8eef8] flex items-center justify-center text-[#1a3a6b] flex-shrink-0 mt-0.5">
                                                <CheckIcon />
                                            </div>
                                            <span className="text-[0.975rem] text-[#374151] leading-[1.7]">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-[#fdf6e8] border border-[#c6973f]/20 rounded-lg p-4 flex items-start gap-3">
                                    <span className="text-[#c6973f] flex-shrink-0 mt-0.5"><ClockIcon /></span>
                                    <p className="text-sm text-[#374151] leading-[1.7]">
                                        Refund requests must be raised within <strong>48 hours</strong> of the originally scheduled service time.
                                    </p>
                                </div>
                            </ContentCard>

                            {/* Refund Process */}
                            <ContentCard id="process">
                                <CardHeading icon={RefreshIcon} label="Refund Process" />
                                <div className="grid md:grid-cols-2 border border-black/[0.07] rounded-xl overflow-hidden">
                                    {PROCESS_STEPS.map((item, i) => (
                                        <div
                                            key={i}
                                            className={`relative p-6 bg-white hover:bg-[#f8f7f4] transition-colors
                        ${i % 2 === 1 ? "md:border-l border-black/[0.07]" : ""}
                        ${i < 2 ? "border-b border-black/[0.07]" : ""}
                      `}
                                        >
                                            <span
                                                className="absolute top-4 right-4 font-serif text-5xl text-black/[0.04] select-none leading-none"
                                                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                                            >
                                                {item.step}
                                            </span>
                                            <h4 className="font-serif text-lg text-[#0d1117] mb-1.5" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
                                                {item.title}
                                            </h4>
                                            <p className="text-sm text-[#6b7280] leading-[1.7]">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </ContentCard>

                            {/* Refund Timeline */}
                            <ContentCard id="timeline">
                                <CardHeading icon={ClockIcon} label="Refund Timeline" />
                                <div className="grid sm:grid-cols-2 gap-4 mb-5">
                                    {[
                                        { label: "Processing Time", value: "5–7", unit: "Business days for approval" },
                                        { label: "Bank Transfer", value: "3–5", unit: "Additional business days" },
                                    ].map((t, i) => (
                                        <div key={i} className="p-6 border border-black/[0.07] rounded-xl bg-[#f8f7f4]">
                                            <p className="text-[11px] font-semibold tracking-[0.06em] uppercase text-[#9ca3af] mb-2">{t.label}</p>
                                            <p
                                                className="font-serif text-[2.5rem] text-[#1a3a6b] leading-none mb-1"
                                                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                                            >
                                                {t.value}
                                            </p>
                                            <p className="text-sm text-[#6b7280]">{t.unit}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-[#e8eef8] border border-[#1a3a6b]/10 rounded-lg p-4 flex items-start gap-3">
                                    <span className="text-[#1a3a6b] flex-shrink-0 mt-0.5"><InfoIcon /></span>
                                    <p className="text-sm text-[#374151] leading-[1.7]">
                                        Total time may vary depending on your bank or payment gateway. You'll receive email notifications at each stage.
                                    </p>
                                </div>
                            </ContentCard>

                            {/* Special Cases */}
                            <ContentCard id="special">
                                <CardHeading icon={FileIcon} label="Special Cases: Notary & Document Services" />
                                <div className="space-y-3">
                                    {SPECIAL_CASES.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3 p-3 border border-black/[0.06] rounded-lg bg-[#f8f7f4]">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#c6973f] mt-[9px] flex-shrink-0" />
                                            <span className="text-[0.925rem] text-[#374151] leading-[1.7]">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </ContentCard>

                            {/* Non-Refundable Items */}
                            <ContentCard id="exceptions">
                                <CardHeading icon={BanIcon} label="Non-Refundable Items" />
                                <div className="flex flex-wrap gap-2 mb-5">
                                    {NON_REFUNDABLE.map((item, i) => (
                                        <span
                                            key={i}
                                            className="text-xs font-medium px-3 py-1.5 rounded-sm bg-[#f8f7f4] text-[#374151] border border-black/[0.07]"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-[0.925rem] text-[#6b7280] leading-[1.7]">
                                    These items are non-refundable once the service has been delivered or third-party costs have been incurred.
                                </p>
                            </ContentCard>

                            {/* Dispute Resolution */}
                            <ContentCard id="disputes">
                                <CardHeading icon={ShieldIcon} label="Dispute Resolution Process" />
                                <p className="text-[0.975rem] text-[#374151] leading-[1.75] mb-6">
                                    If you disagree with our refund decision, you can escalate your concern through the following steps:
                                </p>
                                <div className="space-y-3">
                                    {DISPUTE_STEPS.map((step, i) => (
                                        <div key={i} className="flex items-start gap-4 p-4 border border-black/[0.07] rounded-xl bg-[#f8f7f4] hover:border-[#1a3a6b]/20 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(26,58,107,0.06)] transition-all duration-300">
                                            <div
                                                className="font-serif text-xl text-[#1a3a6b]/20 leading-none w-6 flex-shrink-0 mt-0.5"
                                                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                                            >
                                                {i + 1}
                                            </div>
                                            <span className="text-[0.925rem] text-[#374151] leading-[1.7]">{step}</span>
                                        </div>
                                    ))}
                                </div>
                            </ContentCard>

                            {/* Policy Note */}
                            <div className="border border-black/[0.07] rounded-xl p-7 bg-[#f8f7f4]">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded bg-[#fdf6e8] flex items-center justify-center text-[#c6973f] flex-shrink-0">
                                        <AlertIcon />
                                    </div>
                                    <div>
                                        <h3
                                            className="font-serif text-lg text-[#0d1117] mb-2"
                                            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                                        >
                                            Policy Updates
                                        </h3>
                                        <p className="text-[0.925rem] text-[#6b7280] leading-[1.7]">
                                            NyayMitra reserves the right to modify this policy at any time. Changes will be effective immediately upon posting.
                                            Please review this page regularly for updates. For bookings made before policy changes, the previous policy applies.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact */}
                            <ContentCard id="contact">
                                <CardHeading icon={MailIcon} label="Need Help With a Refund?" />
                                <p className="text-[0.975rem] text-[#374151] leading-[1.75] mb-6">
                                    Our support team is ready to assist you with cancellations, refunds, or any billing concerns.
                                </p>
                                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                                    <div className="flex items-center gap-3 p-4 border border-black/[0.07] rounded-xl bg-[#f8f7f4] hover:border-[#1a3a6b]/20 transition-colors">
                                        <div className="w-9 h-9 rounded bg-[#e8eef8] flex items-center justify-center text-[#1a3a6b] flex-shrink-0">
                                            <MailIcon />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-semibold tracking-[0.06em] uppercase text-[#9ca3af] mb-0.5">Email</p>
                                            <a href="mailto:support@nyaymitra.tech" className="text-sm text-[#1a3a6b] hover:text-[#2952a3] transition-colors font-medium">
                                                support@nyaymitra.tech
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 border border-black/[0.07] rounded-xl bg-[#f8f7f4] hover:border-[#1a3a6b]/20 transition-colors">
                                        <div className="w-9 h-9 rounded bg-[#e8eef8] flex items-center justify-center text-[#1a3a6b] flex-shrink-0">
                                            <PhoneIcon />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-semibold tracking-[0.06em] uppercase text-[#9ca3af] mb-0.5">Phone</p>
                                            <a href="tel:+917970596183" className="text-sm text-[#1a3a6b] hover:text-[#2952a3] transition-colors font-medium">
                                                +91 79705 96183
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-center text-sm text-[#9ca3af]">
                                    Please include your <span className="text-[#1a3a6b] font-medium">Booking ID</span> and <span className="text-[#1a3a6b] font-medium">Contact Details</span> for faster processing.
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
                                <InfoIcon />
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