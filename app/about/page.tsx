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

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-5 h-5">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
)

const TargetIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-5 h-5">
    <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-4 h-4">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-4 h-4">
    <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
  </svg>
)

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATS = [
  { value: "100+", label: "Active users" },
  { value: "60+", label: "Verified lawyers" },
  { value: "95%", label: "Client satisfaction" },
  { value: "24/7", label: "AI support available" },
]

const VALUES = [
  { n: "1", title: "Accessibility", desc: "Making legal help accessible to every Indian, regardless of location or economic background." },
  { n: "2", title: "Transparency", desc: "Clear, honest communication about legal processes, costs, and expected outcomes." },
  { n: "3", title: "Quality", desc: "Maintaining the highest standards in legal advice and our lawyer verification process." },
  { n: "4", title: "Innovation", desc: "Leveraging cutting-edge AI to revolutionise legal services for a billion people." },
]

const TEAM = [
  {
    initials: "AA",
    name: "Alok Abhigyan",
    role: "Founder & CEO",
    tags: ["Full Stack", "Product Strategy"],
    bio: "Visionary leader driving the convergence of legal expertise and technology to democratise legal access across India.",
    accent: "bg-[#1a3a6b]",
    avatarBg: "bg-[#e8eef8]",
    avatarText: "text-[#1a3a6b]",
  },
  {
    initials: "BR",
    name: "Bharat Rajak",
    role: "Director of Legal Affairs",
    tags: ["Civil Law", "Criminal Law"],
    bio: "Senior advocate with 25+ years of experience ensuring legal integrity and compliance across the platform.",
    accent: "bg-[#1a6b5e]",
    avatarBg: "bg-[#e6f4f1]",
    avatarText: "text-[#1a6b5e]",
  },
  {
    initials: "TW",
    name: "Twinkle",
    role: "Co-Founder",
    tags: ["Growth Strategy", "Marketing"],
    bio: "Drives brand positioning and user acquisition strategy to strengthen NyayMitra's trust-driven growth.",
    accent: "bg-[#c6973f]",
    avatarBg: "bg-[#fdf6e8]",
    avatarText: "text-[#c6973f]",
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
        .font-serif { font-family: 'DM Serif Display', Georgia, serif !important; }
        body { font-family: 'DM Sans', system-ui, sans-serif; }
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
          {/* radial glow */}
          <div className="absolute top-0 right-0 w-[560px] h-[560px] -translate-y-1/3 translate-x-1/4 rounded-full bg-[#1a3a6b]/[0.05] blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.08em] uppercase px-3 py-1.5 rounded-sm bg-[#e8eef8] text-[#2952a3] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2952a3]" />
              Empowering Legal Access Since 2025
            </span>

            <h1
              className="font-serif text-[clamp(3rem,7vw,5.5rem)] leading-[1.05] tracking-tight text-[#0d1117] mb-6"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              Justice, made<br />
              <em className="not-italic text-[#1a3a6b] italic">accessible</em> for all.
            </h1>

            <div className="w-16 h-0.5 bg-[#c6973f] rounded-full mb-6" />

            <p className="text-[clamp(1rem,1.8vw,1.2rem)] text-[#6b7280] max-w-xl leading-[1.75] font-light">
              Democratising legal access across India through AI-powered technology, verified expertise,
              and a commitment to every citizen's right to understand the law.
            </p>
          </div>
        </section>

        <hr className="border-none border-t border-black/[0.06]" />

        {/* ── MISSION & VISION ────────────────────────────────────────────── */}
        <section className="px-6 lg:px-16 py-20 lg:py-28">
          <SectionLabel>Purpose</SectionLabel>
          <SectionTitle className="mb-10">Why we exist</SectionTitle>

          <div className="grid md:grid-cols-2 border border-black/[0.08] rounded-xl overflow-hidden">
            {[
              {
                num: "01",
                icon: <TargetIcon />,
                title: "Our Mission",
                body: "To bridge the gap between ordinary citizens and legal help — offering a platform that simplifies legal access using AI, real lawyers, and regional language support. Starting minimal, driven by a big purpose.",
              },
              {
                num: "02",
                icon: <EyeIcon />,
                title: "Our Vision",
                body: "To become the go-to legal companion for every Indian — especially those in Tier 2 and 3 cities — making legal awareness a basic right, not a privilege. One click at a time.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`relative p-10 bg-white hover:bg-[#f8f7f4] transition-colors group ${i === 1 ? "border-t md:border-t-0 md:border-l border-black/[0.08]" : ""
                  }`}
              >
                <span
                  className="absolute top-6 right-6 font-serif text-7xl text-black/[0.04] select-none"
                  style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                  {item.num}
                </span>
                <div className="w-10 h-10 rounded bg-[#e8eef8] flex items-center justify-center text-[#1a3a6b] mb-5 group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
                <h3
                  className="font-serif text-2xl text-[#0d1117] mb-3"
                  style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-[0.975rem] text-[#374151] leading-[1.75]">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── STATS ───────────────────────────────────────────────────────── */}
        <section className="bg-[#1a3a6b]">
          <div className="grid grid-cols-2 lg:grid-cols-4 max-w-none">
            {STATS.map((s, i) => (
              <div
                key={i}
                className="px-8 py-10 border-r border-b border-white/10 last:border-r-0 lg:odd:border-b-0 lg:[&:nth-child(3)]:border-b-0"
              >
                <div
                  className="font-serif text-[clamp(2rem,4vw,3rem)] text-white leading-none mb-1"
                  style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                  {s.value}
                </div>
                <div className="text-xs font-medium tracking-wide text-white/50 uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── STORY ───────────────────────────────────────────────────────── */}
        <section className="bg-[#f8f7f4] px-6 lg:px-16 py-20 lg:py-28">
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-24 items-start">
            {/* Sticky aside */}
            <div className="lg:sticky lg:top-24">
              <div
                className="font-serif text-6xl text-[#1a3a6b] leading-none mb-1"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
              >
                2025
              </div>
              <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#9ca3af] mb-4">Founded</div>
              <div className="w-10 h-0.5 bg-[#c6973f] rounded-full mb-5" />
              <SectionLabel>Our Journey</SectionLabel>
              <SectionTitle className="text-[2rem] leading-tight">
                The story<br />behind<br />NyayMitra
              </SectionTitle>
            </div>

            {/* Body */}
            <div className="space-y-5 text-[1.05rem] text-[#374151] leading-[1.85]">
              <p>
                NyayMitra was launched in June 2025, built on a simple yet critical insight: even today, millions of
                people in India struggle to access basic legal support. From tenant disputes and consumer complaints to
                family-related matters, legal assistance is often perceived as complex, expensive, and difficult to navigate.
              </p>

              <blockquote className="border-l-[3px] border-[#c6973f] pl-6 py-3 bg-[#fdf6e8] rounded-r-md not-italic">
                <p
                  className="font-serif text-lg italic text-[#0d1117] leading-relaxed"
                  style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                  "Legal awareness should be a fundamental service, not a privilege reserved for the few."
                </p>
              </blockquote>

              <p>
                Observing this gap firsthand — especially how individuals are often misled or disadvantaged due to a lack
                of legal awareness — led to the creation of NyayMitra. The goal: build a platform that bridges the gap
                between everyday users and reliable legal guidance.
              </p>
              <p>
                NyayMitra started as a focused MVP with a clear mission. By combining technology with a network of verified
                legal professionals, the platform enables users to gain initial clarity through AI-powered guidance and
                seamlessly connect with lawyers when needed.
              </p>
              <p>
                While still in its early stages, NyayMitra is steadily evolving into a trust-first legal ecosystem. Each
                improvement, user interaction, and lawyer onboarding contributes to the larger vision.
              </p>
            </div>
          </div>
        </section>

        {/* ── VALUES ──────────────────────────────────────────────────────── */}
        <section className="px-6 lg:px-16 py-20 lg:py-28">
          <SectionLabel>Core Principles</SectionLabel>
          <SectionTitle className="mb-3">What guides us</SectionTitle>
          <p className="text-[1.05rem] text-[#6b7280] max-w-md leading-[1.7] mb-10">
            Four principles that inform every decision we make at NyayMitra.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v) => (
              <div
                key={v.n}
                className="p-7 border border-black/[0.07] rounded-xl bg-white hover:border-[#1a3a6b]/20 hover:shadow-[0_8px_32px_rgba(26,58,107,0.08)] hover:-translate-y-0.5 transition-all duration-300 cursor-default"
              >
                <div
                  className="font-serif text-5xl text-black/[0.05] leading-none mb-4"
                  style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                  {v.n}
                </div>
                <h4
                  className="font-serif text-lg text-[#0d1117] mb-2"
                  style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                  {v.title}
                </h4>
                <p className="text-[0.875rem] text-[#6b7280] leading-[1.7]">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-none border-t border-black/[0.06]" />

        {/* ── TEAM ────────────────────────────────────────────────────────── */}
        <section className="bg-[#f8f7f4] px-6 lg:px-16 py-20 lg:py-28">
          <SectionLabel>Leadership</SectionLabel>
          <SectionTitle className="mb-3">The people behind<br />the platform</SectionTitle>
          <p className="text-[1.05rem] text-[#6b7280] max-w-md leading-[1.7] mb-10">
            Legal experts and technologists committed to making justice accessible for all.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="bg-white border border-black/[0.07] rounded-xl overflow-hidden hover:shadow-[0_12px_40px_rgba(26,58,107,0.1)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className={`h-1.5 w-full ${member.accent}`} />
                <div className="p-7">
                  <div
                    className={`w-14 h-14 rounded-full ${member.avatarBg} ${member.avatarText} flex items-center justify-center font-serif text-xl mb-5 border-2 border-black/[0.06]`}
                    style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                  >
                    {member.initials}
                  </div>
                  <h3
                    className="font-serif text-[1.25rem] text-[#0d1117] mb-1"
                    style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                  >
                    {member.name}
                  </h3>
                  <p className="text-[11px] font-semibold tracking-[0.06em] uppercase text-[#9ca3af] mb-4">
                    {member.role}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {member.tags.map((t) => (
                      <span key={t} className="text-[11px] font-medium px-2.5 py-1 rounded-sm bg-[#f1efe8] text-[#374151]">
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-[0.875rem] text-[#6b7280] leading-[1.7]">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <section className="relative bg-[#0d1117] overflow-hidden px-6 lg:px-16 py-20 lg:py-28">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] -translate-x-1/3 -translate-y-1/3 rounded-full bg-[#1a3a6b]/40 blur-[80px] pointer-events-none" />
          <div className="relative z-10 max-w-xl">
            <span className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-[#c6973f] mb-4">
              Get started today
            </span>
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