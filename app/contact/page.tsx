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
const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-4 h-4">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
)
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-4 h-4">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
)
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-4 h-4">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-4 h-4">
    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
  </svg>
)
const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-4 h-4">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
)
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className="w-6 h-6">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)
const SpinnerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 animate-spin">
    <circle cx="12" cy="12" r="10" strokeOpacity={0.25} />
    <path d="M12 2a10 10 0 0110 10" />
  </svg>
)
const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-4 h-4">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)
const AlertIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-4 h-4 flex-shrink-0">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
)

// ─── Data ─────────────────────────────────────────────────────────────────────
const CONTACT_INFO = [
  {
    icon: <MapPinIcon />,
    title: "Office Address",
    lines: ["NyayMitra Technologies Pvt. Ltd.", "Koramangala, 5th Block", "Bangalore, Karnataka – 560095"],
  },
  {
    icon: <MapPinIcon />,
    title: "Registered Address",
    lines: ["NyayMitra Technologies Pvt. Ltd.", "Bhagalpur, Bihar, India"],
  },
  {
    icon: <PhoneIcon />,
    title: "Emergency Line",
    lines: ["+91 79705 96183"],
  },
  {
    icon: <MailIcon />,
    title: "Email",
    lines: ["support@nyaymitra.tech"],
  },
  {
    icon: <ClockIcon />,
    title: "Business Hours",
    lines: ["Mon–Fri: 9 AM – 8 PM", "Sat: 10 AM – 6 PM", "Sun: 10 AM – 4 PM"],
  },
]

const CATEGORIES = [
  "General Inquiry",
  "Legal Advice",
  "Lawyer Registration",
  "Technical Support",
  "Billing & Payments",
  "Partnership",
  "Media & Press",
  "Other",
]

const FAQS = [
  {
    q: "How do I book a consultation with a lawyer?",
    a: "Browse verified lawyers on our platform and book a consultation by selecting a date, time, and preferred mode.",
  },
  {
    q: "Is the first consultation free?",
    a: "Yes — every user gets one free consultation with a verified lawyer after signing up.",
  },
  {
    q: "How do lawyers get verified?",
    a: "We verify lawyers by checking their Bar Council ID and professional details before approving their profiles.",
  },
  {
    q: "Is my data safe on NyayMitra?",
    a: "Absolutely. We follow strict data privacy standards and never share your information without consent.",
  },
  {
    q: "How does AI legal support work?",
    a: "Our AI provides 24/7 guidance based on Indian laws. For complex issues, it connects you to a real lawyer.",
  },
  {
    q: "Can I reschedule or cancel a booking?",
    a: "Yes — manage your bookings through your dashboard. Please inform the lawyer in advance for any changes.",
  },
]

// ─── Types ────────────────────────────────────────────────────────────────────
type FormData = {
  name: string
  email: string
  phone: string
  subject: string
  category: string
  message: string
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [mounted, setMounted] = useState(false)
  const [form, setForm] = useState<FormData>({ name: "", email: "", phone: "", subject: "", category: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => setMounted(true), [])

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Failed to send message")
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null

  // ── Success State ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>
        <div className="min-h-screen bg-white flex items-center justify-center px-6" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
          <div className="max-w-md w-full text-center">
            <div className="w-16 h-16 bg-[#e6f4f1] rounded-full flex items-center justify-center mx-auto mb-6 text-[#1a6b5e]">
              <CheckIcon />
            </div>
            <h2 className="font-serif text-3xl text-[#0d1117] mb-3" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
              Message sent.
            </h2>
            <p className="text-[#6b7280] leading-[1.7] mb-8">
              Thank you for reaching out. We've sent a confirmation to your email and will get back to you within 24 hours.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", category: "", message: "" }) }}
                className="w-full py-2.5 px-5 rounded bg-[#1a3a6b] text-white text-sm font-medium hover:bg-[#2952a3] transition-colors"
              >
                Send another message
              </button>
              <Link href="/" className="w-full py-2.5 px-5 rounded border border-black/10 text-[#374151] text-sm font-medium hover:bg-gray-50 transition-colors text-center">
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </>
    )
  }

  // ── Main Page ──────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
        .font-serif { font-family: 'DM Serif Display', Georgia, serif !important; }
        input, textarea, select {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.9rem;
          width: 100%;
          padding: 9px 13px;
          border: 1px solid rgba(13,17,23,0.12);
          border-radius: 6px;
          background: #fff;
          color: #0d1117;
          outline: none;
          transition: border-color 0.2s;
          appearance: none;
        }
        input::placeholder, textarea::placeholder { color: #9ca3af; }
        input:focus, textarea:focus, select:focus { border-color: #1a3a6b; box-shadow: 0 0 0 3px rgba(26,58,107,0.07); }
        textarea { resize: none; }
        select { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 10px center; background-size: 16px; padding-right: 36px; }
        label { display: block; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: #6b7280; margin-bottom: 6px; }
      `}</style>

      <div className="min-h-screen bg-white text-[#0d1117]" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

        {/* ── NAV ───────────────────────────────────────────────────────────── */}
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/[0.06] h-16 flex items-center justify-between px-6 lg:px-16">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <div className="w-8 h-8 bg-[#1a3a6b] rounded flex items-center justify-center text-white flex-shrink-0">
              <ShieldIcon />
            </div>
            <span className="font-serif text-xl text-[#0d1117]" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
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
              backgroundImage: "linear-gradient(rgba(13,17,23,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(13,17,23,0.05) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
          <div className="absolute top-0 right-0 w-[480px] h-[480px] -translate-y-1/3 translate-x-1/4 rounded-full bg-[#1a3a6b]/[0.05] blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.08em] uppercase px-3 py-1.5 rounded-sm bg-[#e8eef8] text-[#2952a3] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2952a3]" />
              24/7 Support Available
            </span>
            <h1 className="font-serif text-[clamp(2.8rem,6vw,5rem)] leading-[1.05] tracking-tight text-[#0d1117] mb-5" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
              We're here<br />to <em className="italic text-[#1a3a6b]">help you.</em>
            </h1>
            <div className="w-16 h-0.5 bg-[#c6973f] rounded-full mb-5" />
            <p className="text-[clamp(1rem,1.6vw,1.15rem)] text-[#6b7280] max-w-lg leading-[1.75] font-light">
              Have questions about our services? Need legal assistance? Reach out and we'll help you navigate your legal journey.
            </p>
          </div>
        </section>

        <hr className="border-none border-t border-black/[0.06]" />

        {/* ── MAIN CONTENT ──────────────────────────────────────────────────── */}
        <section className="px-6 lg:px-16 py-16 lg:py-24">
          <div className="grid lg:grid-cols-[1fr_340px] gap-10 lg:gap-16 items-start">

            {/* ── FORM ──────────────────────────────────────────────────────── */}
            <div>
              <span className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-[#c6973f] mb-3">Send a message</span>
              <h2 className="font-serif text-[2rem] text-[#0d1117] mb-8" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
                Tell us what you need
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name">Full name *</label>
                    <input id="name" value={form.name} onChange={set("name")} placeholder="Your full name" required />
                  </div>
                  <div>
                    <label htmlFor="email">Email address *</label>
                    <input id="email" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" required />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone">Phone number</label>
                    <input id="phone" value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" />
                  </div>
                  <div>
                    <label htmlFor="category">Query category *</label>
                    <select id="category" value={form.category} onChange={set("category")} required>
                      <option value="" disabled>Select a category</option>
                      {CATEGORIES.map((c) => <option key={c} value={c.toLowerCase().replace(/\s+/g, "-")}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject">Subject *</label>
                  <input id="subject" value={form.subject} onChange={set("subject")} placeholder="Brief subject of your query" required />
                </div>

                <div>
                  <label htmlFor="message">Message *</label>
                  <textarea id="message" rows={5} value={form.message} onChange={set("message")} placeholder="Describe your query in detail…" required />
                </div>

                {error && (
                  <div className="flex items-start gap-2.5 text-sm text-[#a32d2d] bg-[#fcebeb] border border-[#f09595] rounded-md px-4 py-3">
                    <AlertIcon />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded bg-[#1a3a6b] text-white text-sm font-medium hover:bg-[#2952a3] disabled:opacity-60 transition-colors mt-1"
                >
                  {loading ? <><SpinnerIcon /> Sending…</> : <><SendIcon /> Send Message</>}
                </button>
              </form>
            </div>

            {/* ── SIDEBAR ───────────────────────────────────────────────────── */}
            <div className="space-y-6 lg:sticky lg:top-24">

              {/* Contact info card */}
              <div className="border border-black/[0.08] rounded-xl overflow-hidden">
                <div className="px-6 py-5 border-b border-black/[0.06]">
                  <span className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-[#c6973f] mb-1">Contact details</span>
                  <h3 className="font-serif text-xl text-[#0d1117]" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>Get in touch</h3>
                </div>
                <div className="divide-y divide-black/[0.05]">
                  {CONTACT_INFO.map((item, i) => (
                    <div key={i} className="px-6 py-4 flex items-start gap-3 hover:bg-[#f8f7f4] transition-colors">
                      <div className="w-8 h-8 rounded bg-[#e8eef8] flex items-center justify-center text-[#1a3a6b] flex-shrink-0 mt-0.5">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold tracking-wide uppercase text-[#9ca3af] mb-0.5">{item.title}</p>
                        {item.lines.map((l, j) => (
                          <p key={j} className="text-[0.875rem] text-[#374151] leading-[1.6]">{l}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI CTA */}
              <div className="relative overflow-hidden rounded-xl bg-[#0d1117] px-6 py-7">
                <div className="absolute top-0 right-0 w-40 h-40 translate-x-1/3 -translate-y-1/3 rounded-full bg-[#1a3a6b]/60 blur-2xl pointer-events-none" />
                <div className="relative z-10">
                  <span className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-[#c6973f] mb-2">Need instant help?</span>
                  <p className="font-serif text-lg text-white leading-snug mb-4" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
                    Try our AI Legal Assistant for immediate guidance
                  </p>
                  <Link
                    href="/legal-gpt"
                    className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded bg-white text-[#0d1117] hover:bg-gray-100 transition-colors"
                  >
                    Ask Legal GPT
                    <ArrowRightIcon />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        <hr className="border-none border-t border-black/[0.06] mx-6 lg:mx-16" />

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <section className="bg-[#f8f7f4] px-6 lg:px-16 py-16 lg:py-24">
          <span className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-[#c6973f] mb-3">Knowledge base</span>
          <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] text-[#0d1117] mb-3" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
            Frequently asked questions
          </h2>
          <p className="text-[1rem] text-[#6b7280] max-w-md leading-[1.7] mb-10">
            Quick answers to common questions about our platform and services.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white border border-black/[0.07] rounded-xl p-6 hover:shadow-[0_8px_32px_rgba(26,58,107,0.07)] hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-6 h-6 rounded bg-[#e8eef8] flex items-center justify-center text-[#1a3a6b] mb-4 flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className="w-3.5 h-3.5">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
                <h3 className="font-serif text-[1.05rem] text-[#0d1117] mb-2 leading-snug" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
                  {faq.q}
                </h3>
                <p className="text-[0.875rem] text-[#6b7280] leading-[1.7]">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── TRUST BAR ─────────────────────────────────────────────────────── */}
        <section className="bg-[#1a3a6b]">
          <div className="grid grid-cols-2 lg:grid-cols-4 max-w-none">
            {[
              { value: "1000+", label: "Trusted users" },
              { value: "100%", label: "Verified lawyers" },
              { value: "Pan India", label: "Coverage" },
              { value: "24/7", label: "AI support" },
            ].map((s, i) => (
              <div key={i} className="px-8 py-9 border-r border-b border-white/10 last:border-r-0 lg:[&:nth-child(n+3)]:border-b-0">
                <div className="font-serif text-[1.8rem] text-white leading-none mb-1" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
                  {s.value}
                </div>
                <div className="text-xs font-medium tracking-wide text-white/50 uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FOOTER ────────────────────────────────────────────────────────── */}
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