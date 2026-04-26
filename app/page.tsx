"use client"
import { useState, useEffect } from "react"
import {
  BarChart2, CalendarCheck, PenTool, IndianRupee, LogOut,
  User, Scale, MessageCircle, Star, Menu, X,
  ArrowRight, MapPin, Mail, PhoneCall, Sparkles, FileText,
  Bot, FileCheck, Stamp, CheckCircle, ArrowUpRight,
  Gavel, Users, Clock, Zap, Shield, ThumbsUp,
} from "lucide-react"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface Profile {
  id: string; name: string; email: string;
  role: "lawyer" | "user"; avatar?: string; phoneNumber?: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPLETE BILINGUAL CONTENT — every string lives here, zero hardcoding in JSX
// ═══════════════════════════════════════════════════════════════════════════════
const content = {
  en: {
    nav: {
      home: "Home", services: "Services", lawyers: "Find Lawyers",
      legalGPT: "Legal GPT", about: "About", contact: "Contact",
      login: "Login", signup: "Sign Up",
    },
    profileMenu: {
      profile: "My Profile", dashboard: "My Dashboard",
      bookings: "My Bookings", logout: "Logout",
    },
    langToggle: "हि",
    langSwitchMobile: "हिंदी में देखें",
    hero: {
      badge: "500+ Indians helped",
      titleStatic: "Your Legal Problem,",
      titleAccents: ["Solved Today.", "Resolved Fast.", "In Your Hands."],
      description: "FIR, property disputes, family matters - understand your rights instantly and connect with verified lawyers in minutes.",
      ctaPrimary: "Talk to Legal AI",
      ctaSecondary: "Find a Lawyer",
      ctaWhatsapp: "Chat on WhatsApp",
      whatsappNumber: "919661644025",
      cardTitle: "How It Works",
      cardSteps: [
        { n: "01", title: "Tell your problem", desc: "Describe your issue in Hindi or English" },
        { n: "02", title: "Get instant guidance", desc: "AI advice based on Indian law" },
        { n: "03", title: "Talk to lawyer", desc: "Book verified experts when needed" },
      ],
      cardFooter: "Available 24/7 · Zero hidden costs",
      stats: [
        { value: "100+", label: "Cases Resolved" },
        { value: "60+", label: "Expert Lawyers" },
        { value: "99.9%", label: "Success Rate" },
        { value: "<30m", label: "Response Time" },
      ],
    },
    trustBar: [
      { label: "Verified Lawyers", value: "60+" },
      { label: "Happy Clients", value: "500+" },
      { label: "Avg Response", value: "< 2 min" },
      { label: "Client Rating", value: "4.9★" },
    ],
    howItWorks: {
      eyebrow: "Process",
      title: "Three steps to resolution",
      steps: [
        { n: "01", title: "Tell your problem", desc: "Describe your legal issue in simple Hindi or English." },
        { n: "02", title: "Get free guidance", desc: "Understand instantly what steps you should take." },
        { n: "03", title: "Talk to lawyer", desc: "Book a verified lawyer if you need professional help." },
      ],
    },
    services: {
      eyebrow: "Our Services",
      title: "Legal help, every kind",
      subtitle: "Comprehensive solutions for your legal needs",
      allServices: "All services",
      featured: {
        badge: "🔥 Most Popular",
        title: "Affidavit Online India",
        desc: "Get legally valid affidavits drafted, reviewed by experts, and delivered in hours. Address proof, name change, income declaration, property — all covered.",
        tags: ["Address Proof", "Name Change", "Income Declaration", "Property", "Identity"],
        meta: ["2–4 hour delivery", "Lawyer reviewed", "From ₹999"],
      },
      cards: [
        { title: "Legal AI Chat", desc: "Trained on Indian law. Ask about FIR, property, family, consumer rights — instant answers 24/7.", footer: "Free to start", href: "/legal-gpt" },
        { title: "Find Lawyers", desc: "Browse 60+ verified lawyers by specialization. Book consultations with real-time availability.", footer: "< 30 min response", href: "/lawyers" },
        { title: "Document Generator", desc: "Create rent agreements, legal notices, complaints using AI-powered forms in minutes.", footer: "Instant download", href: "/services" },
      ],
    },
    whyUs: {
      eyebrow: "Why Us",
      title: "Built for Bharat,",
      titleLine2: "not for boardrooms",
      desc: "Legal help in India has always been expensive, confusing, and inaccessible. NyayMitra changes that — plain language, transparent pricing, and real lawyers on demand.",
      cta: "Try for free",
      features: [
        { title: "Transparent Pricing", desc: "No surprise charges. Fixed rates for every service." },
        { title: "Always Available", desc: "AI on WhatsApp, call, or web — 24/7 without waiting." },
        { title: "Verified Lawyers", desc: "Every lawyer is background-checked and bar-enrolled." },
        { title: "Plain Language", desc: "No jargon. Complex law explained simply for everyone." },
      ],
    },
    problems: {
      eyebrow: "We solve these every day",
      title: "Common Legal Problems",
      items: [
        { title: "FIR not being registered", desc: "Understand your rights and take action", emoji: "📋" },
        { title: "Property dispute", desc: "Protect your ownership and boundaries", emoji: "🏠" },
        { title: "Divorce / Family issue", desc: "Guidance on custody and settlements", emoji: "👨‍👩‍👧" },
        { title: "Online fraud", desc: "Recover money and file complaints", emoji: "🔒" },
      ],
    },
    testimonials: {
      eyebrow: "Social Proof",
      title: "What our users say",
      verified: "Verified",
      items: [
        { name: "Swapnil Anand", location: "Bhagalpur, Bihar", avatar: "SA", rating: 5, text: "Their remote notary service saved me a court trip. Needed an affidavit urgently — NyayMitra handled everything, notarized and home-delivered in 2 days without hassle." },
        { name: "Anand Upadhyay", location: "Bhopal, MP", avatar: "AU", rating: 4, text: "Facing delayed salary issues. Through NyayMitra I connected with a lawyer instantly who guided me on the right steps and helped me resolve the situation." },
        { name: "Dinesh Chand", location: "Gurgaon, Haryana", avatar: "DC", rating: 5, text: "Got a challan in Delhi, was unsure about the process. NyayMitra gave quick guidance — I understood exactly what to do without any confusion." },
      ],
    },
    cta: {
      title: "Ready to solve your legal problem?",
      subtitle: "Join thousands of Indians who trust NyayMitra. Free AI consultation, verified lawyers, transparent pricing.",
      primary: "Start Free Consultation",
      secondary: "Browse Lawyers",
    },
    footer: {
      company: "NyayMitra", tagline: "Making legal help accessible to every Indian",
      quickLinks: "Quick Links", legal: "Legal",
      address: "Koramangala, Bengaluru-560034",
      email: "support@nyaymitra.tech", phone: "+91 79705 96183",
      privacy: "Privacy Policy", terms: "Terms of Service",
      deliveryPolicy: "Shipping & Delivery Policy", about: "About NyayMitra",
      affidavit: "Affidavit Online", signup: "Sign Up",
      cancellation: "Cancellation & Refund", contact: "Contact Us",
      copyright: "All rights reserved.",
      disclaimerLabel: "Disclaimer:",
      disclaimer: "NyayMitra is a technology platform. We do not act as a law firm. All consultations and notary services are delivered by licensed third-party professionals. Not liable for actions taken based on AI suggestions.",
    },
  },

  hi: {
    nav: {
      home: "होम", services: "सेवाएं", lawyers: "वकील खोजें",
      legalGPT: "लीगल GPT", about: "हमारे बारे में", contact: "संपर्क",
      login: "लॉगिन", signup: "साइन अप",
    },
    profileMenu: {
      profile: "मेरी प्रोफ़ाइल", dashboard: "मेरा डैशबोर्ड",
      bookings: "मेरी बुकिंग्स", logout: "लॉगआउट",
    },
    langToggle: "EN",
    langSwitchMobile: "View in English",
    hero: {
      badge: "500+ भारतीयों की मदद",
      titleStatic: "आपकी कानूनी समस्या,",
      titleAccents: ["आज हल होगी।", "जल्दी सुलझेगी।", "आपके हाथ में।"],
      description: "FIR, संपत्ति विवाद, पारिवारिक मामले — तुरंत अपने अधिकार समझें और मिनटों में सत्यापित वकील से जुड़ें।",
      ctaPrimary: "लीगल AI से बात करें",
      ctaSecondary: "वकील खोजें",
      ctaWhatsapp: "व्हाट्सऐप पर बात करें",
      whatsappNumber: "919661644025",
      cardTitle: "यह कैसे काम करता है",
      cardSteps: [
        { n: "01", title: "समस्या बताएं", desc: "हिंदी या अंग्रेज़ी में समस्या बताएं" },
        { n: "02", title: "तुरंत मार्गदर्शन पाएं", desc: "भारतीय कानून पर आधारित AI सलाह" },
        { n: "03", title: "वकील से जुड़ें", desc: "जरूरत पर सत्यापित विशेषज्ञ बुक करें" },
      ],
      cardFooter: "24/7 उपलब्ध · कोई छुपा शुल्क नहीं",
      stats: [
        { value: "100+", label: "मामले हल" },
        { value: "60+", label: "विशेषज्ञ वकील" },
        { value: "99.9%", label: "सफलता दर" },
        { value: "<30मि", label: "जवाब समय" },
      ],
    },
    trustBar: [
      { label: "सत्यापित वकील", value: "60+" },
      { label: "संतुष्ट ग्राहक", value: "500+" },
      { label: "औसत जवाब", value: "< 2 मिनट" },
      { label: "रेटिंग", value: "4.9★" },
    ],
    howItWorks: {
      eyebrow: "प्रक्रिया",
      title: "तीन स्टेप में समाधान",
      steps: [
        { n: "01", title: "समस्या बताएं", desc: "अपनी कानूनी समस्या हिंदी या अंग्रेज़ी में बताएं।" },
        { n: "02", title: "मुफ्त मार्गदर्शन पाएं", desc: "तुरंत समझें कि आपको क्या करना चाहिए।" },
        { n: "03", title: "वकील से बात करें", desc: "जरूरत हो तो सत्यापित वकील से सीधे बात करें।" },
      ],
    },
    services: {
      eyebrow: "हमारी सेवाएं",
      title: "हर तरह की कानूनी मदद",
      subtitle: "आपकी कानूनी जरूरतों के लिए व्यापक समाधान",
      allServices: "सभी सेवाएं",
      featured: {
        badge: "🔥 सबसे लोकप्रिय",
        title: "ऑनलाइन शपथपत्र (Affidavit)",
        desc: "विशेषज्ञों द्वारा समीक्षित कानूनी रूप से वैध शपथपत्र घंटों में पाएं। पते का प्रमाण, नाम परिवर्तन, आय घोषणा, संपत्ति — सब कवर।",
        tags: ["पते का प्रमाण", "नाम परिवर्तन", "आय घोषणा", "संपत्ति", "पहचान"],
        meta: ["2–4 घंटे में डिलीवरी", "वकील द्वारा जांचा गया", "₹999 से शुरू"],
      },
      cards: [
        { title: "लीगल AI चैट", desc: "भारतीय कानून पर प्रशिक्षित। FIR, संपत्ति, परिवार, उपभोक्ता अधिकार — 24/7 तुरंत जवाब।", footer: "मुफ्त में शुरू करें", href: "/legal-gpt" },
        { title: "वकील खोजें", desc: "विशेषज्ञता के अनुसार 60+ सत्यापित वकीलों को ब्राउज़ करें। रीयल-टाइम उपलब्धता के साथ बुकिंग।", footer: "< 30 मिनट जवाब", href: "/lawyers" },
        { title: "दस्तावेज़ जनरेटर", desc: "AI फॉर्म से किराया समझौते, कानूनी नोटिस, शिकायतें मिनटों में बनाएं।", footer: "तुरंत डाउनलोड", href: "/services" },
      ],
    },
    whyUs: {
      eyebrow: "हम क्यों",
      title: "भारत के लिए बना,",
      titleLine2: "बड़े दफ्तरों के लिए नहीं",
      desc: "भारत में कानूनी मदद हमेशा महंगी, उलझन भरी और पहुंच से दूर रही है। NyayMitra यह बदलता है — सरल भाषा, पारदर्शी मूल्य, और मांग पर असली वकील।",
      cta: "मुफ्त में आज़माएं",
      features: [
        { title: "पारदर्शी मूल्य", desc: "कोई छुपा शुल्क नहीं। हर सेवा के लिए तय दरें।" },
        { title: "हमेशा उपलब्ध", desc: "व्हाट्सऐप, कॉल या वेब पर 24/7 बिना प्रतीक्षा।" },
        { title: "सत्यापित वकील", desc: "हर वकील की पृष्ठभूमि जांची गई और बार में नामांकित।" },
        { title: "सरल भाषा", desc: "कोई जटिल शब्द नहीं। कानून सबके लिए आसान।" },
      ],
    },
    problems: {
      eyebrow: "हम रोज़ इन समस्याओं को हल करते हैं",
      title: "सामान्य कानूनी समस्याएं",
      items: [
        { title: "FIR दर्ज नहीं हो रही", desc: "अपने अधिकार समझें और सही कदम उठाएं", emoji: "📋" },
        { title: "संपत्ति विवाद", desc: "अपने मालिकाना हक और सीमाओं की रक्षा करें", emoji: "🏠" },
        { title: "तलाक / पारिवारिक समस्या", desc: "कस्टडी और सेटलमेंट पर सही मार्गदर्शन", emoji: "👨‍👩‍👧" },
        { title: "ऑनलाइन धोखाधड़ी", desc: "पैसे वापस पाने और शिकायत दर्ज करने में मदद", emoji: "🔒" },
      ],
    },
    testimonials: {
      eyebrow: "उपयोगकर्ताओं की राय",
      title: "हमारे उपयोगकर्ता क्या कहते हैं",
      verified: "सत्यापित",
      items: [
        { name: "स्वप्निल आनंद", location: "भागलपुर, बिहार", avatar: "स्वा", rating: 5, text: "उनकी रिमोट नोटरी सेवा ने मुझे कोर्ट जाने से बचाया। जरूरी शपथपत्र था — NyayMitra ने 2 दिन में नोटरी करके घर पहुंचाया।" },
        { name: "आनंद उपाध्याय", location: "भोपाल, मध्यप्रदेश", avatar: "आउ", rating: 4, text: "वेतन देरी की समस्या थी। NyayMitra के ज़रिए तुरंत वकील से जुड़ा जिसने सही कदम बताए और समस्या हल हुई।" },
        { name: "दिनेश चंद", location: "गुड़गांव, हरियाणा", avatar: "दि", rating: 5, text: "दिल्ली में चालान मिला, प्रक्रिया नहीं पता थी। NyayMitra ने जल्दी मार्गदर्शन दिया — बिना किसी उलझन के सब समझ आया।" },
      ],
    },
    cta: {
      title: "अपनी कानूनी समस्या हल करने के लिए तैयार हैं?",
      subtitle: "हजारों भारतीयों में शामिल हों जो NyayMitra पर भरोसा करते हैं। मुफ्त AI परामर्श, सत्यापित वकील, पारदर्शी मूल्य।",
      primary: "मुफ्त परामर्श शुरू करें",
      secondary: "वकील देखें",
    },
    footer: {
      company: "न्यायमित्र", tagline: "हर भारतीय के लिए कानूनी सहायता को सुलभ बनाना",
      quickLinks: "त्वरित लिंक", legal: "कानूनी",
      address: "कोरामंगला, बेंगलुरु-560034",
      email: "support@nyaymitra.tech", phone: "+91 79705 96183",
      privacy: "गोपनीयता नीति", terms: "सेवा की शर्तें",
      deliveryPolicy: "शिपिंग और डिलीवरी नीति", about: "न्यायमित्र के बारे में",
      affidavit: "ऑनलाइन शपथपत्र", signup: "साइन अप",
      cancellation: "रद्दीकरण और धनवापसी", contact: "संपर्क करें",
      copyright: "सर्वाधिकार सुरक्षित।",
      disclaimerLabel: "अस्वीकरण:",
      disclaimer: "NyayMitra एक प्रौद्योगिकी मंच है। हम कानूनी फर्म नहीं हैं। सभी परामर्श और नोटरी सेवाएं लाइसेंस प्राप्त तृतीय-पक्ष पेशेवरों द्वारा दी जाती हैं। AI सुझावों पर उठाए गए कदमों के लिए हम उत्तरदायी नहीं हैं।",
    },
  },
}

// ─── TYPEWRITER HOOK — resets on language change ─────────────────────────────
function useTypewriter(words: string[], interval = 2800) {
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in")

  // Reset when language switches
  const wordsKey = words.join("|")
  useEffect(() => { setIdx(0); setPhase("in") }, [wordsKey])

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (phase === "in") timer = setTimeout(() => setPhase("hold"), 300)
    else if (phase === "hold") timer = setTimeout(() => setPhase("out"), interval - 600)
    else timer = setTimeout(() => { setIdx(i => (i + 1) % words.length); setPhase("in") }, 280)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, idx])

  return {
    word: words[idx],
    style: {
      opacity: phase === "out" ? 0 : 1,
      transform: phase === "in" ? "translateY(0)" : phase === "out" ? "translateY(-8px)" : "translateY(0)",
      transition: "opacity 0.27s cubic-bezier(0.4,0,0.2,1), transform 0.27s cubic-bezier(0.4,0,0.2,1)",
    } as React.CSSProperties,
  }
}

// ─── SHARED ATOMS ─────────────────────────────────────────────────────────────
const LiveDot = () => (
  <span className="relative flex" style={{ width: 7, height: 7 }}>
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
    <span className="relative inline-flex rounded-full bg-green-400" style={{ width: 7, height: 7 }} />
  </span>
)

const WaSvg = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size, flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.677-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.897 6.994c-.004 5.45-4.437 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.181-1.24-6.162-3.495-8.411" />
  </svg>
)

const Divider = () => <div className="h-px bg-white/[0.04] w-full" />

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [language, setLanguage] = useState<"en" | "hi">("en")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mounted, setMounted] = useState(false)

  const t = content[language]
  const { word: accentWord, style: accentStyle } = useTypewriter(t.hero.titleAccents)

  useEffect(() => {
    setMounted(true)
    setIsLoggedIn(!!localStorage.getItem("token"))
  }, [])

  useEffect(() => {
    try { const s = localStorage.getItem("userProfile"); if (s) setProfile(JSON.parse(s)) } catch { }
  }, [])

  if (!mounted) return null

  const navLinks = Object.entries(t.nav).filter(([k]) => !["login", "signup"].includes(k))

  // Per-card accent palette for service cards
  const cardAccent = [
    { border: "hover:border-purple-500/25", iconWrap: "bg-purple-600/[0.1] border-purple-500/[0.16] text-purple-400", dot: "bg-purple-400/80", arrowHover: "group-hover:text-purple-400", iconHover: "group-hover:bg-purple-600/[0.18]" },
    { border: "hover:border-cyan-500/25", iconWrap: "bg-cyan-600/[0.1] border-cyan-500/[0.16] text-cyan-400", dot: "bg-cyan-400/80", arrowHover: "group-hover:text-cyan-400", iconHover: "group-hover:bg-cyan-600/[0.18]" },
    { border: "hover:border-emerald-500/25", iconWrap: "bg-emerald-600/[0.1] border-emerald-500/[0.16] text-emerald-400", dot: "bg-emerald-400/80", arrowHover: "group-hover:text-emerald-400", iconHover: "group-hover:bg-emerald-600/[0.18]" },
  ]
  const svcIcons = [<Bot style={{ width: 17, height: 17 }} />, <Gavel style={{ width: 17, height: 17 }} />, <FileText style={{ width: 17, height: 17 }} />]
  const whyIcons = [<IndianRupee style={{ width: 17, height: 17 }} />, <Bot style={{ width: 17, height: 17 }} />, <Shield style={{ width: 17, height: 17 }} />, <PenTool style={{ width: 17, height: 17 }} />]
  const whyColor = ["text-blue-400 bg-blue-600/[0.08]", "text-purple-400 bg-purple-600/[0.08]", "text-emerald-400 bg-emerald-600/[0.08]", "text-cyan-400 bg-cyan-600/[0.08]"]

  return (
    <div className="min-h-screen bg-[#06080f] text-white overflow-x-hidden" style={{ fontFamily: "'Inter var','Inter',system-ui,sans-serif" }}>

      {/* ══ AMBIENT BACKGROUND ══ */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[560px]"
          style={{ background: "radial-gradient(ellipse at 50% 0%,rgba(37,99,235,0.11) 0%,transparent 65%)" }} />
        <div className="absolute bottom-0 right-0 w-[600px] h-[500px]"
          style={{ background: "radial-gradient(ellipse at 100% 100%,rgba(124,58,237,0.055) 0%,transparent 60%)" }} />
        <div className="absolute inset-0 opacity-[0.017]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />
      </div>

      {/* ══ NAV ══ */}
      <nav className="relative z-50 sticky top-0 border-b border-white/[0.055] backdrop-blur-2xl"
        style={{ background: "rgba(6,8,15,0.82)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[62px]">

            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-8 h-8 bg-blue-600 rounded-[9px] flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:bg-blue-500 group-hover:shadow-blue-500/40 transition-all">
                <Scale className="text-white" style={{ width: 16, height: 16 }} />
              </div>
              <span className="text-[15px] font-bold tracking-tight">{t.footer.company}</span>
            </Link>

            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map(([key, val]) => (
                <Link key={key}
                  href={key === "home" ? "/" : key === "legalGPT" ? "/legal-ai" : `/${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`}
                  className="px-3.5 py-2 text-[13px] font-medium text-slate-500 hover:text-white hover:bg-white/[0.042] rounded-lg transition-all">
                  {val}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {/* Language toggle */}
              <button onClick={() => setLanguage(l => l === "en" ? "hi" : "en")}
                className="hidden sm:inline-flex items-center justify-center w-[34px] h-[34px] rounded-full border border-white/[0.09] text-[11px] font-bold text-slate-500 hover:text-slate-200 hover:border-white/[0.16] transition-all">
                {t.langToggle}
              </button>

              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-full pl-1.5 pr-3 py-1 hover:bg-white/[0.07] transition-all">
                      <div className="w-7 h-7 rounded-full bg-blue-600/70 flex items-center justify-center">
                        <User className="text-white" style={{ width: 12, height: 12 }} />
                      </div>
                      <span className="text-[13px] font-medium text-slate-300 hidden sm:block">
                        {profile?.name?.split(" ")[0] || "Account"}
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 mt-2 p-1 rounded-xl shadow-2xl border border-white/[0.08]"
                    style={{ background: "#0c1220" }} align="end">
                    <DropdownMenuItem asChild className="rounded-lg hover:bg-white/[0.04] focus:bg-white/[0.04] cursor-pointer">
                      <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5">
                        <User className="text-blue-400" style={{ width: 13, height: 13 }} />
                        <span className="text-[13px] text-slate-200">{t.profileMenu.profile}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => window.location.href = "https://nyay-dashboard.netlify.app/"}
                      className="rounded-lg hover:bg-white/[0.04] focus:bg-white/[0.04] cursor-pointer">
                      <div className="flex items-center gap-3 px-3 py-2.5 w-full">
                        <BarChart2 className="text-emerald-400" style={{ width: 13, height: 13 }} />
                        <span className="text-[13px] text-slate-200">{t.profileMenu.dashboard}</span>
                      </div>
                    </DropdownMenuItem>
                    {profile?.role !== "lawyer" && (
                      <DropdownMenuItem asChild className="rounded-lg hover:bg-white/[0.04] focus:bg-white/[0.04] cursor-pointer">
                        <Link href="/all-bookings" className="flex items-center gap-3 px-3 py-2.5">
                          <CalendarCheck className="text-purple-400" style={{ width: 13, height: 13 }} />
                          <span className="text-[13px] text-slate-200">{t.profileMenu.bookings}</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <div className="h-px bg-white/[0.07] my-1" />
                    <DropdownMenuItem onClick={() => { localStorage.removeItem("token"); window.location.reload() }}
                      className="rounded-lg hover:bg-red-500/[0.08] focus:bg-red-500/[0.08] cursor-pointer">
                      <div className="flex items-center gap-3 px-3 py-2.5">
                        <LogOut className="text-red-400" style={{ width: 13, height: 13 }} />
                        <span className="text-[13px] text-red-400">{t.profileMenu.logout}</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-1.5">
                  <Link href="/auth/login">
                    <button className="px-4 py-2 text-[13px] font-medium text-slate-400 hover:text-white transition-colors">
                      {t.nav.login}
                    </button>
                  </Link>
                  <Link href="/auth/signup">
                    <button className="px-4 py-2 text-[13px] font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-[9px] transition-all shadow-lg shadow-blue-600/20">
                      {t.nav.signup}
                    </button>
                  </Link>
                </div>
              )}

              <button onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.08]">
                {isMenuOpen ? <X style={{ width: 14, height: 14 }} /> : <Menu style={{ width: 14, height: 14 }} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-white/[0.05]" style={{ background: "rgba(7,9,18,0.97)" }}>
            <div className="px-4 py-3 space-y-0.5">
              {navLinks.map(([key, val]) => (
                <Link key={key}
                  href={key === "home" ? "/" : key === "legalGPT" ? "/legal-ai" : `/${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`}
                  className="block px-4 py-2.5 text-[13px] font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] rounded-xl"
                  onClick={() => setIsMenuOpen(false)}>
                  {val}
                </Link>
              ))}
              <div className="h-px bg-white/[0.06] my-2" />
              <button onClick={() => { setLanguage(l => l === "en" ? "hi" : "en"); setIsMenuOpen(false) }}
                className="block w-full text-left px-4 py-2.5 text-[13px] text-slate-400 hover:text-white hover:bg-white/[0.04] rounded-xl">
                {t.langSwitchMobile}
              </button>
              <Link href="/auth/login" className="block px-4 py-2.5 text-[13px] text-slate-300 hover:bg-white/[0.04] rounded-xl" onClick={() => setIsMenuOpen(false)}>{t.nav.login}</Link>
              <Link href="/auth/signup" className="block px-4 py-2.5 text-[13px] font-semibold text-blue-400 hover:bg-white/[0.04] rounded-xl" onClick={() => setIsMenuOpen(false)}>{t.nav.signup}</Link>
            </div>
          </div>
        )}
      </nav>

      {/* ══ HERO — REDUCED SPACING (changed from py-20 to py-6) ══ */}
      <section className="relative z-10 flex items-center px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-[1200px] mx-auto w-full">
          <div className="grid lg:grid-cols-[1fr_420px] gap-12 xl:gap-24 items-center">

            {/* LEFT */}
            <div>
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2.5 mb-9">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/[0.2] bg-blue-500/[0.055]">
                  <LiveDot />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.025]">
                  <span className="text-[10.5px] font-medium text-slate-500">{t.hero.badge}</span>
                </div>
              </div>

              {/* Headline */}
              <div className="mb-7">
                <h1
                  className="font-bold text-white leading-[1.15] tracking-[-0.035em] mb-2"
                  style={{ fontSize: "clamp(38px,5.8vw,72px)" }}
                >
                  {t.hero.titleStatic}
                </h1>

                {/* Animated line */}
                <div
                  style={{
                    height: "clamp(76px,10.5vw,128px)",
                    overflow: "hidden",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <h1
                    className="font-bold leading-[1.35] tracking-[-0.035em]"
                    style={{
                      fontSize: "clamp(38px,5.8vw,72px)",
                      background:
                        "linear-gradient(100deg,#60a5fa 0%,#38bdf8 38%,#a78bfa 78%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      transform: "translateY(3px)",
                      ...accentStyle,
                    }}
                  >
                    {accentWord}
                  </h1>
                </div>
              </div>

              <p className="text-[15px] sm:text-[16px] text-slate-400 leading-[1.78] max-w-[500px] mb-9">
                {t.hero.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 mb-11">
                <Link href="/legal-gpt">
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-[13.5px] shadow-xl shadow-blue-600/25 hover:shadow-blue-500/30 hover:-translate-y-[1px] active:translate-y-0 transition-all">
                    <MessageCircle style={{ width: 15, height: 15 }} />{t.hero.ctaPrimary}
                  </button>
                </Link>
                <Link href="/lawyers">
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/[0.05] hover:bg-white/[0.09] text-white font-semibold rounded-xl border border-white/[0.1] hover:border-white/[0.18] text-[13.5px] hover:-translate-y-[1px] active:translate-y-0 transition-all">
                    <Gavel style={{ width: 15, height: 15 }} />{t.hero.ctaSecondary}
                  </button>
                </Link>
                <a href={`https://wa.me/${t.hero.whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-[#4ade80] font-semibold rounded-xl border border-[#25D366]/[0.17] hover:border-[#25D366]/30 text-[13.5px] hover:-translate-y-[1px] active:translate-y-0 transition-all"
                    style={{ background: "rgba(15,42,30,0.55)" }}>
                    <WaSvg />{t.hero.ctaWhatsapp}
                  </button>
                </a>
              </div>

              {/* Stats inline */}
              <div className="flex items-center justify-center sm:justify-start flex-wrap gap-x-4 sm:gap-x-7 gap-y-2.5">
                {t.hero.stats.map((s, i) => (
                  <div key={s.label} className="flex items-baseline gap-1.5 relative">
                    {i > 0 && (
                      <div className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 w-px h-3 sm:h-4 bg-white/[0.07]" />
                    )}
                    <span className="text-sm sm:text-[15px] md:text-base font-bold text-white">
                      {s.value}
                    </span>
                    <span className="text-[10px] sm:text-[11.5px] text-slate-500 sm:text-slate-600 whitespace-nowrap">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — premium glass card */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Outer halo */}
                <div className="absolute -inset-8 rounded-[40px] pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 50% 50%,rgba(37,99,235,0.09) 0%,transparent 65%)" }} />

                <div className="relative rounded-[20px] overflow-hidden border border-white/[0.07]"
                  style={{
                    background: "linear-gradient(160deg,rgba(14,21,40,0.99) 0%,rgba(7,10,22,1) 100%)",
                    boxShadow: "0 0 0 1px rgba(255,255,255,0.025),0 48px 96px -24px rgba(0,0,0,0.75)",
                  }}>

                  {/* Card header */}
                  <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.045]"
                    style={{ background: "rgba(255,255,255,0.015)" }}>
                    <div className="flex items-center gap-2">
                      <LiveDot />
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.16em]">{t.hero.cardTitle}</span>
                    </div>
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-white/[0.07]" />
                      <div className="w-2 h-2 rounded-full bg-white/[0.07]" />
                      <div className="w-2 h-2 rounded-full bg-blue-500/40" />
                    </div>
                  </div>

                  {/* Steps */}
                  <div className="px-5 py-5 space-y-0.5">
                    {t.hero.cardSteps.map((step, i) => (
                      <div key={step.n} className="flex gap-3.5 group py-3 px-2.5 rounded-xl hover:bg-white/[0.025] cursor-default transition-all">
                        <div className="flex flex-col items-center shrink-0">
                          <div className="w-[38px] h-[38px] rounded-[11px] border flex items-center justify-center text-blue-400 bg-blue-600/[0.08] border-blue-500/[0.13] group-hover:bg-blue-600/[0.14] group-hover:border-blue-500/22 transition-all">
                            {i === 0 ? <FileCheck style={{ width: 15, height: 15 }} /> : i === 1 ? <Bot style={{ width: 15, height: 15 }} /> : <CalendarCheck style={{ width: 15, height: 15 }} />}
                          </div>
                          {i < 2 && <div className="w-px mt-1" style={{ height: 12, background: "rgba(59,130,246,0.09)" }} />}
                        </div>
                        <div className="pt-2">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[9.5px] font-mono text-slate-700">{step.n}</span>
                            <span className="text-[12.5px] font-semibold text-white">{step.title}</span>
                          </div>
                          <p className="text-[11.5px] text-slate-600 leading-snug">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Card footer */}
                  <div className="px-5 pb-5">
                    <div className="rounded-xl border border-white/[0.045] px-4 py-3"
                      style={{ background: "rgba(255,255,255,0.018)" }}>
                      <p className="text-[11px] text-slate-700">{t.hero.cardFooter}</p>
                    </div>
                  </div>
                </div>

                {/* Floating WhatsApp tag */}
                <div className="absolute -bottom-3.5 -right-3.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#25D366]/[0.18] text-[10.5px] font-bold text-[#4ade80]"
                  style={{ background: "rgba(10,30,20,0.96)", backdropFilter: "blur(20px)" }}>
                  <WaSvg size={10} />WhatsApp
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ══ TRUST BAR ══ */}
      <div className="relative z-10 py-4 overflow-hidden" style={{ background: "rgba(255,255,255,0.012)" }}>
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-14">
          {t.trustBar.map((s, i) => (
            <div key={s.label} className="flex items-center gap-3">
              {i > 0 && <div className="hidden md:block w-px h-6 bg-white/[0.06]" />}
              <div>
                <div className="text-[13.5px] font-bold text-white">{s.value}</div>
                <div className="text-[11px] text-slate-600">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ══ HOW IT WORKS ══ */}
      <section className="relative z-10 py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10.5px] font-bold text-blue-400 uppercase tracking-[0.16em] mb-3">{t.howItWorks.eyebrow}</p>
            <h2 className="text-3xl sm:text-[38px] font-bold text-white tracking-tight">{t.howItWorks.title}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-7 left-[calc(16.7%+8px)] right-[calc(16.7%+8px)] h-px"
              style={{ background: "linear-gradient(90deg,rgba(37,99,235,0.16),rgba(124,58,237,0.16))" }} />
            {t.howItWorks.steps.map((step, i) => (
              <div key={step.n} className="relative flex flex-col items-center text-center group">
                <div className="relative z-10 w-14 h-14 rounded-2xl border border-white/[0.065] group-hover:border-blue-500/25 flex items-center justify-center text-blue-400 mb-5 transition-all group-hover:bg-blue-600/[0.07]"
                  style={{ background: "rgba(255,255,255,0.022)" }}>
                  {i === 0 ? <FileCheck style={{ width: 20, height: 20 }} /> : i === 1 ? <Bot style={{ width: 20, height: 20 }} /> : <ThumbsUp style={{ width: 20, height: 20 }} />}
                  <div className="absolute -top-2 -right-2 w-[18px] h-[18px] rounded-full bg-blue-600 flex items-center justify-center shadow-md shadow-blue-600/30">
                    <span className="text-[8.5px] font-bold text-white">{i + 1}</span>
                  </div>
                </div>
                <h3 className="text-[13.5px] font-semibold text-white mb-1.5">{step.title}</h3>
                <p className="text-[12.5px] text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ══ SERVICES ══ */}
      <section className="relative z-10 py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <p className="text-[10.5px] font-bold text-blue-400 uppercase tracking-[0.16em] mb-3">{t.services.eyebrow}</p>
              <h2 className="text-3xl sm:text-[38px] font-bold text-white tracking-tight">{t.services.title}</h2>
              <p className="text-[13px] text-slate-600 mt-2">{t.services.subtitle}</p>
            </div>
            <Link href="/services" className="inline-flex items-center gap-1.5 text-[12.5px] text-blue-400 hover:text-blue-300 font-medium transition-colors whitespace-nowrap">
              {t.services.allServices} <ArrowRight style={{ width: 12, height: 12 }} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Featured: 2-col affidavit card */}
            <Link href="/affidavit-online-india"
              className="group lg:col-span-2 relative overflow-hidden border border-white/[0.06] hover:border-blue-500/22 rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.018]"
              style={{ background: "rgba(255,255,255,0.016)" }}>
              <div className="absolute top-0 right-0 w-52 h-52 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 100% 0%,rgba(37,99,235,0.065) 0%,transparent 65%)" }} />
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-600/[0.11] border border-blue-500/[0.17] flex items-center justify-center text-blue-400">
                    <Stamp style={{ width: 17, height: 17 }} />
                  </div>
                  <div>
                    <span className="inline-block text-[10px] font-bold text-amber-400 bg-amber-400/[0.08] border border-amber-400/[0.16] px-2 py-0.5 rounded-full mb-1">
                      {t.services.featured.badge}
                    </span>
                    <h3 className="text-[14.5px] font-bold text-white group-hover:text-blue-300 transition-colors">{t.services.featured.title}</h3>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full border border-white/[0.07] flex items-center justify-center group-hover:border-blue-500/25 group-hover:bg-blue-600/[0.09] transition-all">
                  <ArrowUpRight className="text-slate-600 group-hover:text-blue-400 transition-colors" style={{ width: 12, height: 12 }} />
                </div>
              </div>
              <p className="text-[12.5px] text-slate-500 leading-relaxed mb-5 max-w-md">{t.services.featured.desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {t.services.featured.tags.map(tag => (
                  <span key={tag} className="text-[10.5px] text-slate-600 border border-white/[0.055] px-2.5 py-1 rounded-full"
                    style={{ background: "rgba(255,255,255,0.022)" }}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-5 text-[11.5px] text-slate-600">
                <span className="flex items-center gap-1.5"><Clock className="text-blue-500" style={{ width: 11, height: 11 }} />{t.services.featured.meta[0]}</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="text-emerald-500" style={{ width: 11, height: 11 }} />{t.services.featured.meta[1]}</span>
                <span className="flex items-center gap-1.5"><Zap className="text-amber-500" style={{ width: 11, height: 11 }} />{t.services.featured.meta[2]}</span>
              </div>
            </Link>

            {/* 3 smaller cards */}
            {t.services.cards.map((card, i) => (
              <Link key={card.title} href={card.href}
                className={`group relative overflow-hidden border border-white/[0.06] ${cardAccent[i].border} rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.018] flex flex-col`}
                style={{ background: "rgba(255,255,255,0.016)" }}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all ${cardAccent[i].iconWrap} ${cardAccent[i].iconHover}`}>
                    {svcIcons[i]}
                  </div>
                  <div className={`w-7 h-7 rounded-full border border-white/[0.07] flex items-center justify-center transition-all group-hover:border-opacity-30`}>
                    <ArrowUpRight className={`text-slate-600 transition-colors ${cardAccent[i].arrowHover}`} style={{ width: 11, height: 11 }} />
                  </div>
                </div>
                <h3 className="text-[13.5px] font-bold text-white mb-2">{card.title}</h3>
                <p className="text-[12.5px] text-slate-600 leading-relaxed flex-1">{card.desc}</p>
                <div className="mt-4 flex items-center gap-1.5 text-[11px] text-slate-700">
                  <span className={`w-1.5 h-1.5 rounded-full ${cardAccent[i].dot}`} />{card.footer}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ══ WHY US ══ */}
      <section className="relative z-10 py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[10.5px] font-bold text-blue-400 uppercase tracking-[0.16em] mb-4">{t.whyUs.eyebrow}</p>
              <h2 className="text-3xl sm:text-[38px] font-bold text-white tracking-tight leading-[1.1] mb-5">
                {t.whyUs.title}<br /><span className="text-slate-500">{t.whyUs.titleLine2}</span>
              </h2>
              <p className="text-[13.5px] text-slate-500 leading-[1.82] mb-8 max-w-md">{t.whyUs.desc}</p>
              <Link href="/legal-gpt">
                <button className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-[13px] shadow-lg shadow-blue-600/20 hover:-translate-y-[1px] transition-all">
                  {t.whyUs.cta} <ArrowRight style={{ width: 13, height: 13 }} />
                </button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {t.whyUs.features.map((f, i) => (
                <div key={f.title} className="border border-white/[0.055] rounded-xl p-5 hover:border-white/[0.09] transition-all"
                  style={{ background: "rgba(255,255,255,0.016)" }}>
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${whyColor[i]}`}>
                    {whyIcons[i]}
                  </div>
                  <h3 className="text-[13px] font-semibold text-white mb-1">{f.title}</h3>
                  <p className="text-[12px] text-slate-600 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ══ COMMON PROBLEMS ══ */}
      <section className="relative z-10 py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10.5px] font-bold text-blue-400 uppercase tracking-[0.16em] mb-3">{t.problems.eyebrow}</p>
            <h2 className="text-3xl sm:text-[38px] font-bold text-white tracking-tight">{t.problems.title}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {t.problems.items.map((item) => (
              <div key={item.title}
                className="group border border-white/[0.055] hover:border-white/[0.1] hover:bg-white/[0.018] rounded-xl p-5 transition-all cursor-pointer"
                style={{ background: "rgba(255,255,255,0.016)" }}>
                <div className="text-2xl mb-3">{item.emoji}</div>
                <h3 className="text-[13px] font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                <p className="text-[12px] text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ══ TESTIMONIALS ══ */}
      <section className="relative z-10 py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10.5px] font-bold text-blue-400 uppercase tracking-[0.16em] mb-3">{t.testimonials.eyebrow}</p>
            <h2 className="text-3xl sm:text-[38px] font-bold text-white tracking-tight">{t.testimonials.title}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {t.testimonials.items.map((item) => (
              <div key={item.name}
                className="border border-white/[0.055] rounded-2xl p-6 hover:border-white/[0.1] transition-all"
                style={{ background: "rgba(255,255,255,0.016)" }}>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="fill-amber-400 text-amber-400" style={{ width: 12, height: 12 }} />
                  ))}
                </div>
                <p className="text-[12.5px] text-slate-500 leading-[1.8] mb-6 italic">"{item.text}"</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-600/[0.13] border border-blue-500/[0.14] flex items-center justify-center text-[10.5px] font-bold text-blue-300 shrink-0">
                      {item.avatar}
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold text-white">{item.name}</div>
                      <div className="text-[11px] text-slate-700">{item.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-700">
                    <CheckCircle className="text-emerald-600" style={{ width: 10, height: 10 }} />
                    {t.testimonials.verified}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ══ CTA BAND ══ */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl border border-blue-500/[0.14] p-10 sm:p-14 text-center"
            style={{
              background: "linear-gradient(135deg,rgba(37,99,235,0.09) 0%,rgba(124,58,237,0.055) 60%,rgba(37,99,235,0.075) 100%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.035)",
            }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 50% 0%,rgba(59,130,246,0.08) 0%,transparent 55%)" }} />
            <div className="relative">
              <h2 className="text-3xl sm:text-[38px] font-bold text-white tracking-tight mb-4">{t.cta.title}</h2>
              <p className="text-[13.5px] text-slate-500 mb-8 max-w-xl mx-auto leading-relaxed">{t.cta.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/legal-gpt">
                  <button className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-xl shadow-blue-600/22 text-[13.5px] hover:-translate-y-[1px] transition-all">
                    <Sparkles style={{ width: 14, height: 14 }} />{t.cta.primary}
                  </button>
                </Link>
                <Link href="/lawyers">
                  <button className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold rounded-xl border border-white/[0.1] hover:border-white/[0.17] text-[13.5px] hover:-translate-y-[1px] transition-all">
                    {t.cta.secondary}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="relative z-10 border-t border-white/[0.05] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-[9px] flex items-center justify-center shadow-lg shadow-blue-600/22">
                  <Scale className="text-white" style={{ width: 15, height: 15 }} />
                </div>
                <span className="text-[15px] font-bold text-white">{t.footer.company}</span>
              </div>
              <p className="text-[12.5px] text-slate-600 mb-5 max-w-xs leading-relaxed">{t.footer.tagline}</p>
              <div className="space-y-2">
                {[
                  { icon: <MapPin style={{ width: 12, height: 12, flexShrink: 0 }} />, text: t.footer.address },
                  { icon: <Mail style={{ width: 12, height: 12, flexShrink: 0 }} />, text: t.footer.email },
                  { icon: <PhoneCall style={{ width: 12, height: 12, flexShrink: 0 }} />, text: t.footer.phone },
                ].map(row => (
                  <div key={row.text} className="flex items-center gap-2.5 text-[12px] text-slate-700">{row.icon}{row.text}</div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-[10px] font-semibold text-slate-600 uppercase tracking-[0.13em] mb-5">{t.footer.quickLinks}</h3>
              <ul className="space-y-2.5">
                {[
                  { href: "/about", label: t.footer.about },
                  { href: "/services", label: t.nav.services },
                  { href: "/lawyers", label: t.nav.lawyers },
                  { href: "/affidavit-online-india", label: t.footer.affidavit },
                  { href: "/auth/signup", label: t.footer.signup },
                ].map(l => (
                  <li key={l.href}><Link href={l.href} className="text-[12px] text-slate-700 hover:text-slate-300 transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] font-semibold text-slate-600 uppercase tracking-[0.13em] mb-5">{t.footer.legal}</h3>
              <ul className="space-y-2.5">
                {[
                  { href: "/terms", label: t.footer.terms },
                  { href: "/privacy-policy", label: t.footer.privacy },
                  { href: "/cancellation", label: t.footer.cancellation },
                  { href: "/Shipping&DeliveryPolicy", label: t.footer.deliveryPolicy },
                  { href: "/contact", label: t.footer.contact },
                ].map(l => (
                  <li key={l.href}><Link href={l.href} className="text-[12px] text-slate-700 hover:text-slate-300 transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/[0.04] pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-[11px] text-slate-700">© 2026 {t.footer.company}. {t.footer.copyright}</p>
            <p className="text-[10.5px] text-slate-700 max-w-2xl text-left sm:text-right leading-relaxed">
              <span className="text-red-500/55 font-semibold">{t.footer.disclaimerLabel} </span>
              {t.footer.disclaimer}
            </p>
          </div>
        </div>
      </footer>

      {/* ══ FLOATING WHATSAPP ══ */}
      <a href={`https://wa.me/${t.hero.whatsappNumber}`} target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group">
        <div className="relative">
          <div className="absolute -inset-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
            style={{ background: "radial-gradient(ellipse at center,rgba(37,211,102,0.18) 0%,transparent 70%)" }} />
          <div className="relative bg-[#128C7E] hover:bg-[#20c874] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300"
            style={{ width: 50, height: 50 }}>
            <WaSvg size={23} />
          </div>
        </div>
      </a>

    </div>
  )
}