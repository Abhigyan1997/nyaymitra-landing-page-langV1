// app/shipping-policy/page.tsx
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

const TruckIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-5 h-5">
        <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
)

const SendIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-5 h-5">
        <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
)

const ClockIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
)

const MapPinIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-5 h-5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
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

const PackageIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-5 h-5">
        <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
)

const CheckIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className="w-4 h-4">
        <path d="M20 6L9 17l-5-5" />
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
    { id: "digital", label: "Digital Delivery", icon: SendIcon },
    { id: "physical", label: "Physical Courier", icon: TruckIcon },
    { id: "timeline", label: "Delivery Timeline", icon: ClockIcon },
    { id: "tracking", label: "Order Tracking", icon: MapPinIcon },
    { id: "faq", label: "FAQ", icon: FileIcon },
    { id: "contact", label: "Contact Support", icon: MailIcon },
]

const DIGITAL_SERVICES = [
    {
        title: "Legal Documents (Contracts, Agreements, Notices)",
        items: [
            "Instant generation for standard templates",
            "Delivery via email & NyayMitra dashboard",
            "WhatsApp delivery option available",
            "Downloadable PDF format with digital signatures",
        ],
        icon: FileIcon,
    },
    {
        title: "Legal Reviews & Consultations",
        items: [
            "Lawyer-reviewed documents within 24 hours",
            "Detailed analysis sent to your registered email",
            "Follow-up consultation available via video/chat",
            "Document version tracking included",
        ],
        icon: ShieldIcon,
    },
    {
        title: "Remote Notarization",
        items: [
            "Digitally notarized documents instantly",
            "Shared via email and dashboard",
            "Blockchain-verified certificates",
            "Physical courier option available",
        ],
        icon: CheckIcon,
    },
]

const TIMELINE_ROWS = [
    ["Standard Templates", "Digital", "Instant"],
    ["Custom Documents", "Digital", "24–48 hours"],
    ["Lawyer Review", "Digital", "Within 24 hours"],
    ["Remote Notarization", "Digital", "1–2 Business Days"],
    ["Physical Notarized Copy", "Courier", "3–5 Business Days"],
    ["Express Shipping", "Courier", "1–2 Business Days"],
]

const TRACKING_ITEMS = [
    "Email confirmation with tracking number",
    "SMS notification with tracking link",
    "Real-time updates in your NyayMitra dashboard",
]

const FAQS = [
    {
        q: "Is there any shipping charge for digital delivery?",
        a: "No, digital delivery is completely free. All documents sent via email or dashboard are included in your consultation/service fee.",
    },
    {
        q: "Do you ship internationally?",
        a: "Currently, physical shipping is available only within India. Digital services are available worldwide.",
    },
    {
        q: "What if my package is delayed or lost?",
        a: "If your package is delayed beyond 7 business days or lost in transit, we will re-ship your documents at no additional cost. Contact our support team immediately.",
    },
    {
        q: "Can I change my delivery address after shipping?",
        a: "Address changes are only possible before dispatch. Once shipped, you'll need to coordinate directly with the courier partner using your tracking number.",
    },
    {
        q: "Do you offer express shipping?",
        a: "Yes, express shipping (1–2 business days) is available at an additional cost. Select the option at checkout.",
    },
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

export default function ShippingPolicyPage() {
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
                            Last updated{" "}
                            {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                        </span>

                        <h1
                            className="font-serif text-[clamp(3rem,7vw,5.5rem)] leading-[1.05] tracking-tight text-[#0d1117] mb-6"
                            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                        >
                            Shipping &amp; delivery,<br />
                            <em className="not-italic text-[#1a3a6b] italic">done right.</em>
                        </h1>

                        <div className="w-16 h-0.5 bg-[#c6973f] rounded-full mb-6" />

                        <p className="text-[clamp(1rem,1.8vw,1.2rem)] text-[#6b7280] max-w-xl leading-[1.75] font-light">
                            Fast, secure, and reliable delivery of your legal documents and services — digital or physical.
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
                                Quick Navigation
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

                            {/* Info box */}
                            <div className="mt-8 p-5 border border-black/[0.07] rounded-xl bg-[#f8f7f4]">
                                <div className="w-9 h-9 rounded bg-[#e8eef8] flex items-center justify-center text-[#1a3a6b] mb-3">
                                    <PackageIcon />
                                </div>
                                <p className="text-[0.825rem] text-[#6b7280] leading-[1.65]">
                                    Most NyayMitra services are delivered digitally — instantly to your inbox and dashboard.
                                </p>
                            </div>
                        </aside>

                        {/* ── CONTENT AREA ────────────────────────────────────────────── */}
                        <div className="space-y-6">

                            {/* Digital Delivery */}
                            <ContentCard id="digital">
                                <CardHeading icon={SendIcon} label="Digital Service Delivery" />
                                <p className="text-[0.975rem] text-[#374151] leading-[1.8] mb-6">
                                    NyayMitra primarily offers digital legal services. Most deliverables are provided electronically for instant access and maximum convenience.
                                </p>
                                <div className="grid md:grid-cols-1 gap-4">
                                    {DIGITAL_SERVICES.map((service, i) => (
                                        <div
                                            key={i}
                                            className="p-5 border border-black/[0.07] rounded-xl bg-[#f8f7f4] hover:border-[#1a3a6b]/20 hover:shadow-[0_4px_16px_rgba(26,58,107,0.06)] transition-all"
                                        >
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-[#1a3a6b]"><service.icon /></span>
                                                <h4 className="font-semibold text-[#0d1117] text-sm">{service.title}</h4>
                                            </div>
                                            <ul className="space-y-2 grid sm:grid-cols-2">
                                                {service.items.map((item, j) => (
                                                    <li key={j} className="flex items-start gap-2 text-sm text-[#6b7280]">
                                                        <span className="w-1 h-1 rounded-full bg-[#c6973f] mt-[7px] flex-shrink-0" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </ContentCard>

                            {/* Physical Courier */}
                            <ContentCard id="physical">
                                <CardHeading icon={TruckIcon} label="Physical Courier Service" />
                                <p className="text-[0.975rem] text-[#374151] leading-[1.8] mb-6">
                                    For printed and notarized documents requiring physical delivery, we partner with trusted courier services to ensure safe and timely delivery.
                                </p>

                                <div className="grid sm:grid-cols-2 gap-4 mb-5">
                                    {[
                                        { label: "Processing Time", value: "1–2", unit: "Business days after notarization", icon: PackageIcon },
                                        { label: "Shipping Time", value: "2–3", unit: "Business days (varies by location)", icon: ClockIcon },
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

                                <div className="flex items-start gap-3 p-4 border border-black/[0.07] rounded-xl bg-[#f8f7f4]">
                                    <span className="text-[#1a3a6b] flex-shrink-0 mt-0.5"><MapPinIcon /></span>
                                    <div>
                                        <h4 className="font-semibold text-[#0d1117] text-sm mb-1">Shipping Partners</h4>
                                        <p className="text-sm text-[#6b7280] leading-[1.65]">
                                            We partner with leading courier services including DTDC, BlueDart, Delhivery, and India Post for pan-India delivery.
                                        </p>
                                    </div>
                                </div>
                            </ContentCard>

                            {/* Delivery Timeline */}
                            <ContentCard id="timeline">
                                <CardHeading icon={ClockIcon} label="Delivery Timeline by Service" />
                                <div className="overflow-x-auto rounded-xl border border-black/[0.07]">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-[#f8f7f4] border-b border-black/[0.07]">
                                            <tr>
                                                {["Service Type", "Delivery Method", "Timeline"].map((h) => (
                                                    <th key={h} className="px-5 py-3 text-[11px] font-semibold tracking-[0.07em] uppercase text-[#9ca3af]">
                                                        {h}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {TIMELINE_ROWS.map((row, i) => (
                                                <tr
                                                    key={i}
                                                    className={`border-b border-black/[0.05] last:border-0 hover:bg-[#f8f7f4] transition-colors ${i % 2 === 0 ? "bg-white" : "bg-[#fafafa]"}`}
                                                >
                                                    <td className="px-5 py-3.5 text-[#374151] font-medium">{row[0]}</td>
                                                    <td className="px-5 py-3.5">
                                                        <span className={`text-[11px] font-semibold tracking-[0.06em] uppercase px-2.5 py-1 rounded-sm inline-block ${row[1] === "Digital"
                                                                ? "bg-[#e8eef8] text-[#1a3a6b]"
                                                                : "bg-[#fdf6e8] text-[#c6973f]"
                                                            }`}>
                                                            {row[1]}
                                                        </span>
                                                    </td>
                                                    <td className="px-5 py-3.5 text-[#1a3a6b] font-semibold">{row[2]}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </ContentCard>

                            {/* Order Tracking */}
                            <ContentCard id="tracking">
                                <CardHeading icon={MapPinIcon} label="Order Tracking" />
                                <p className="text-[0.975rem] text-[#374151] leading-[1.75] mb-5">
                                    Once your physical order is dispatched, you will receive:
                                </p>
                                <div className="space-y-3">
                                    {TRACKING_ITEMS.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3 p-4 border border-black/[0.07] rounded-xl bg-[#f8f7f4] hover:border-[#1a3a6b]/20 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(26,58,107,0.06)] transition-all duration-300">
                                            <div className="w-5 h-5 rounded-full bg-[#e8eef8] flex items-center justify-center text-[#1a3a6b] flex-shrink-0 mt-0.5">
                                                <CheckIcon />
                                            </div>
                                            <span className="text-[0.925rem] text-[#374151] leading-[1.7]">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </ContentCard>

                            {/* FAQ */}
                            <ContentCard id="faq">
                                <CardHeading icon={FileIcon} label="Frequently Asked Questions" />
                                <div className="space-y-0 divide-y divide-black/[0.06]">
                                    {FAQS.map((faq, i) => (
                                        <div key={i} className="py-5 first:pt-0 last:pb-0">
                                            <h4
                                                className="font-serif text-[1.05rem] text-[#0d1117] mb-2"
                                                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                                            >
                                                {faq.q}
                                            </h4>
                                            <p className="text-[0.925rem] text-[#6b7280] leading-[1.7]">{faq.a}</p>
                                        </div>
                                    ))}
                                </div>
                            </ContentCard>

                            {/* Disclaimer */}
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
                                            Important Note
                                        </h3>
                                        <p className="text-[0.925rem] text-[#6b7280] leading-[1.7]">
                                            Delivery times are estimates and may vary due to courier partner delays, weather conditions, or unforeseen circumstances.
                                            NyayMitra is not liable for third-party delays beyond our control. For urgent matters, we recommend digital delivery.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact */}
                            <ContentCard id="contact">
                                <CardHeading icon={MailIcon} label="Need Help With Delivery?" />
                                <p className="text-[0.975rem] text-[#374151] leading-[1.75] mb-6">
                                    For any delivery-related concerns, tracking issues, or special requests, our support team is here to help.
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
                                    Response time: Within 24 hours on business days.
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