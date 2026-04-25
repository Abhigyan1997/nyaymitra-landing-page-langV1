"use client"
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  BarChart2, ChevronRight, Briefcase, Bell, ThumbsUp,
  CalendarCheck, PenTool, IndianRupee, LogOut
} from 'lucide-react';
import { User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Scale, MessageCircle, Shield, Star, Menu, X, ArrowRight,
  MapPin, Mail, PhoneCall, Sparkles, FileText, Bot,
  FileCheck, Stamp, MessageSquare, CheckCircle, ArrowUpRight,
  Gavel, Users, Clock, Zap, Lock, ChevronDown,
} from "lucide-react"
import Link from "next/link"

interface Profile {
  id: string;
  name: string;
  email: string;
  role: 'lawyer' | 'user';
  avatar?: string;
  phoneNumber?: string;
}

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null)
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      try {
        setProfile(JSON.parse(storedProfile));
      } catch { }
    }
  }, []);

  const content = {
    en: {
      nav: {
        home: "Home", services: "Services", lawyers: "Find Lawyers",
        legalGPT: "Legal GPT", about: "About", contact: "Contact",
        login: "Login", signup: "Sign Up",
      },
      profileMenu: {
        profile: "My Profile", dashboard: "My Dashboard",
        bookings: "My Bookings", logout: "Logout"
      },
      hero: {
        badge: "500+ Indians Helped",
        title: "Legal problem hai?",
        subtitle: "Hum help karenge",
        description: "FIR, property, family issues samajhiye aur turant lawyer se baat kariye",
        ctaPrimary: "Talk to Legal Buddy",
        ctaSecondary: "Talk to Lawyer",
        whatsapp: "Talk on WhatsApp",
        whatsappNumber: "919661644025",
        stats: [
          { value: "100+", label: "Cases Resolved" },
          { value: "60+", label: "Expert Lawyers" },
          { value: "99.9%", label: "Success Rate" },
          { value: "<30min", label: "Response Time" },
        ],
      },
      howItWorks: {
        label: "How It Works",
        online: "Online · Instant · Zero Hidden Costs",
        steps: [
          { n: "01", title: "Tell your problem", desc: "Describe your legal issue in simple words", },
          { n: "02", title: "Get instant guidance", desc: "AI-powered legal advice in seconds", },
          { n: "03", title: "Connect with lawyer", desc: "Book verified experts when needed", },
        ],
      },
      trustBar: [
        { label: "Verified Lawyers", value: "60+" },
        { label: "Happy Clients", value: "500+" },
        { label: "Avg Response", value: "< 2 min" },
        { label: "Client Rating", value: "4.9★" },
      ],
      process: {
        label: "Process",
        title: "Three steps to resolution",
        steps: [
          { title: "Tell your problem", desc: "Describe your legal issue in simple Hindi or English." },
          { title: "Get free guidance", desc: "Understand instantly what steps you should take." },
          { title: "Talk to lawyer", desc: "Book a verified lawyer if you need professional help." },
        ],
      },
      services: {
        label: "Our Services",
        title: "Legal help, every kind",
        subtitle: "Comprehensive solutions for your legal needs",
        allServices: "All services",
        affidavit: {
          badge: "🔥 Most Popular",
          title: "Affidavit Online India",
          desc: "Get legally valid affidavits drafted, reviewed by experts, and delivered in hours. Address proof, name change, income declaration, property — all covered.",
          tags: ["Address Proof", "Name Change", "Income Declaration", "Property", "Identity"],
          meta: ["2–4 hour delivery", "Lawyer reviewed", "From ₹999"],
        },
        aiChat: {
          title: "Legal AI Chat",
          desc: "Trained on Indian law. Ask about FIR, property, family, consumer rights — get instant answers 24/7.",
          meta: "Free to start",
        },
        findLawyers: {
          title: "Find Lawyers",
          desc: "Browse 60+ verified lawyers by specialization. Book consultations with real-time availability.",
          meta: "<30 min response",
        },
        docGen: {
          title: "Document Generator",
          desc: "Create rent agreements, legal notices, complaints and more using AI-powered forms in minutes.",
          meta: "Instant download",
        },
      },
      whyUs: {
        label: "Why Us",
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
        label: "We solve these every day",
        title: "Common Legal Problems",
        items: [
          { title: "FIR not being registered", desc: "Understand your rights and take action", emoji: "📋" },
          { title: "Property dispute", desc: "Protect your ownership and boundaries", emoji: "🏠" },
          { title: "Divorce / Family issue", desc: "Get guidance on custody and settlements", emoji: "👨‍👩‍👧" },
          { title: "Online fraud", desc: "Recover your money and file complaints", emoji: "🔒" },
        ],
      },
      testimonials: {
        label: "Social Proof",
        title: "What our users say",
        items: [
          { name: "Swapnil Anand", location: "Bhagalpur, Bihar", avatar: "SA", rating: 5, text: "Their remote notary service saved me a trip to court. Needed an affidavit urgently, NyayMitra handled everything smoothly — notarized and delivered at home within 2 days." },
          { name: "Anand Upadhyay", location: "Bhopal, MP", avatar: "AU", rating: 4, text: "Facing delayed salary issues as a corporate employee. Through NyayMitra I connected with a lawyer instantly who guided me on the right steps to resolve it." },
          { name: "Dinesh Chand", location: "Gurgaon, Haryana", avatar: "DC", rating: 5, text: "Got a challan in Delhi, was unsure about the process. NyayMitra gave me quick guidance, I understood exactly what to do without any confusion." },
        ],
      },
      cta: {
        title: "Ready to solve your legal problem?",
        desc: "Join thousands of Indians who trust NyayMitra. Free AI consultation, verified lawyers, transparent pricing.",
        primary: "Start Free Consultation",
        secondary: "Browse Lawyers",
      },
      footer: {
        company: "NyayMitra", tagline: "Making legal help accessible to every Indian",
        quickLinks: "Quick Links", legal: "Legal", contact: "Contact Us",
        address: "Koramangala, Bengaluru-560034",
        email: "support@nyaymitra.tech", phone: "+91 79705 96183",
        privacy: "Privacy Policy", terms: "Terms of Service",
        disclaimer: "Legal Disclaimer", about: "About NyayMitra",
        deliveryPolicy: "Shipping & Delivery Policy", signup: "Sign Up", signin: "Login",
        services: "Services", findLawyers: "Find Lawyers", affidavitOnline: "Affidavit Online",
        cancellation: "Cancellation & Refund", contactUs: "Contact Us",
        disclaimerText: "NyayMitra is a technology platform. We do not act as a law firm. All consultations and notary services are by licensed third-party professionals. Not liable for actions taken based on AI suggestions.",
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
        bookings: "मेरी बुकिंग्स", logout: "लॉगआउट"
      },
      hero: {
        badge: "500+ भारतीयों की मदद हुई",
        title: "कोई कानूनी समस्या है?",
        subtitle: "हम आपकी मदद करेंगे",
        description: "FIR, प्रॉपर्टी और फैमिली से जुड़ी समस्याओं को समझें और तुरंत वकील से बात करें",
        ctaPrimary: "लीगल बडी से बात करें",
        ctaSecondary: "वकील से बात करें",
        whatsapp: "व्हाट्सऐप पर बात करें",
        whatsappNumber: "91961644025",
        stats: [
          { value: "100+", label: "केस हल हुए" },
          { value: "60+", label: "विशेषज्ञ वकील" },
          { value: "99.9%", label: "सफलता दर" },
          { value: "<30मिन", label: "जवाब का समय" },
        ],
      },
      howItWorks: {
        label: "यह कैसे काम करता है",
        online: "ऑनलाइन · तुरंत · कोई छुपा खर्च नहीं",
        steps: [
          { n: "01", title: "अपनी समस्या बताएं", desc: "अपनी कानूनी समस्या सरल शब्दों में बताएं" },
          { n: "02", title: "तुरंत मार्गदर्शन पाएं", desc: "AI से सेकंडों में कानूनी सलाह" },
          { n: "03", title: "वकील से जुड़ें", desc: "जरूरत पड़ने पर विश्वसनीय वकील बुक करें" },
        ],
      },
      trustBar: [
        { label: "सत्यापित वकील", value: "60+" },
        { label: "खुश ग्राहक", value: "500+" },
        { label: "औसत प्रतिक्रिया", value: "< 2 मिनट" },
        { label: "ग्राहक रेटिंग", value: "4.9★" },
      ],
      process: {
        label: "प्रक्रिया",
        title: "तीन कदम में समाधान",
        steps: [
          { title: "अपनी समस्या बताएं", desc: "सरल हिंदी या अंग्रेजी में अपनी समस्या बताएं।" },
          { title: "मुफ्त मार्गदर्शन पाएं", desc: "तुरंत समझें कि आपको क्या कदम उठाने चाहिए।" },
          { title: "वकील से बात करें", desc: "पेशेवर मदद चाहिए तो सत्यापित वकील बुक करें।" },
        ],
      },
      services: {
        label: "हमारी सेवाएं",
        title: "हर तरह की कानूनी मदद",
        subtitle: "आपकी कानूनी जरूरतों के लिए व्यापक समाधान",
        allServices: "सभी सेवाएं",
        affidavit: {
          badge: "🔥 सबसे लोकप्रिय",
          title: "ऑनलाइन हलफनामा (Affidavit)",
          desc: "कानूनी रूप से मान्य हलफनामे बनवाएं, विशेषज्ञों द्वारा समीक्षित और घंटों में डिलीवर। पता प्रमाण, नाम परिवर्तन, आय घोषणा, संपत्ति — सब कुछ।",
          tags: ["पता प्रमाण", "नाम परिवर्तन", "आय घोषणा", "संपत्ति", "पहचान"],
          meta: ["2–4 घंटे में डिलीवरी", "वकील द्वारा समीक्षित", "₹999 से शुरू"],
        },
        aiChat: {
          title: "लीगल AI चैट",
          desc: "भारतीय कानून पर प्रशिक्षित। FIR, प्रॉपर्टी, परिवार, उपभोक्ता अधिकार — 24/7 तुरंत जवाब पाएं।",
          meta: "शुरू करना मुफ्त है",
        },
        findLawyers: {
          title: "वकील खोजें",
          desc: "विशेषज्ञता के अनुसार 60+ सत्यापित वकील ब्राउज़ करें। रियल-टाइम उपलब्धता के साथ परामर्श बुक करें।",
          meta: "<30 मिनट में जवाब",
        },
        docGen: {
          title: "दस्तावेज़ जनरेटर",
          desc: "किराया समझौते, कानूनी नोटिस, शिकायतें और अधिक — AI-संचालित फॉर्म से मिनटों में बनाएं।",
          meta: "तुरंत डाउनलोड",
        },
      },
      whyUs: {
        label: "हमें क्यों चुनें",
        title: "भारत के लिए बना,",
        titleLine2: "बोर्डरूम के लिए नहीं",
        desc: "भारत में कानूनी मदद हमेशा महंगी, उलझी और पहुंच से बाहर रही है। NyayMitra यह बदलता है — सरल भाषा, पारदर्शी मूल्य और मांग पर असली वकील।",
        cta: "मुफ्त में आज़माएं",
        features: [
          { title: "पारदर्शी मूल्य", desc: "कोई छुपा खर्च नहीं। हर सेवा के लिए तय दरें।" },
          { title: "हमेशा उपलब्ध", desc: "WhatsApp, कॉल या वेब पर AI — बिना इंतजार के 24/7।" },
          { title: "सत्यापित वकील", desc: "हर वकील की बैकग्राउंड जांच और बार पंजीकरण।" },
          { title: "सरल भाषा", desc: "कोई कानूनी जार्गन नहीं। जटिल कानून सरल शब्दों में।" },
        ],
      },
      problems: {
        label: "हम रोज़ इन समस्याओं को हल करते हैं",
        title: "सामान्य कानूनी समस्याएं",
        items: [
          { title: "FIR दर्ज नहीं हो रही", desc: "अपने अधिकार समझें और कदम उठाएं", emoji: "📋" },
          { title: "संपत्ति विवाद", desc: "अपनी मालिकी और सीमाओं की रक्षा करें", emoji: "🏠" },
          { title: "तलाक / पारिवारिक मामला", desc: "हिरासत और निपटान पर मार्गदर्शन पाएं", emoji: "👨‍👩‍👧" },
          { title: "ऑनलाइन धोखाधड़ी", desc: "पैसे वापस पाएं और शिकायत दर्ज करें", emoji: "🔒" },
        ],
      },
      testimonials: {
        label: "ग्राहकों की राय",
        title: "हमारे उपयोगकर्ता क्या कहते हैं",
        items: [
          { name: "स्वप्निल आनंद", location: "भागलपुर, बिहार", avatar: "SA", rating: 5, text: "उनकी रिमोट नोटरी सेवा ने मुझे कोर्ट जाने से बचाया। हलफनामा जरूरी था, NyayMitra ने सब कुछ आसानी से संभाला — 2 दिन में घर पर नोटरीकृत हुआ।" },
          { name: "आनंद उपाध्याय", location: "भोपाल, MP", avatar: "AU", rating: 4, text: "कॉर्पोरेट कर्मचारी के रूप में देरी से वेतन की समस्या थी। NyayMitra से तुरंत वकील से जुड़ा जिसने सही कदम बताए।" },
          { name: "दिनेश चंद", location: "गुरुग्राम, हरियाणा", avatar: "DC", rating: 5, text: "दिल्ली में चालान मिला, प्रक्रिया समझ नहीं आई। NyayMitra ने जल्दी मार्गदर्शन दिया, बिना किसी भ्रम के सब समझ आया।" },
        ],
      },
      cta: {
        title: "अपनी कानूनी समस्या हल करने के लिए तैयार हैं?",
        desc: "हजारों भारतीयों की तरह NyayMitra पर भरोसा करें। मुफ्त AI परामर्श, सत्यापित वकील, पारदर्शी मूल्य।",
        primary: "मुफ्त परामर्श शुरू करें",
        secondary: "वकील देखें",
      },
      footer: {
        company: "न्यायमित्र", tagline: "हर भारतीय के लिए कानूनी सहायता को सुलभ बनाना",
        quickLinks: "त्वरित लिंक", legal: "कानूनी", contact: "संपर्क करें",
        address: "कोरामंगला, बेंगलुरु-560034",
        email: "nyaymitra.ai@gmail.com", phone: "+91 79705 96183",
        privacy: "गोपनीयता नीति", terms: "सेवा की शर्तें",
        disclaimer: "कानूनी अस्वीकरण", about: "न्यायमित्र के बारे में",
        deliveryPolicy: "शिपिंग और डिलीवरी नीति", signup: "साइन अप", signin: "लॉगिन",
        services: "सेवाएं", findLawyers: "वकील खोजें", affidavitOnline: "ऑनलाइन हलफनामा",
        cancellation: "रद्दीकरण और वापसी", contactUs: "संपर्क करें",
        disclaimerText: "NyayMitra एक टेक्नोलॉजी प्लेटफॉर्म है। हम लॉ फर्म नहीं हैं। सभी परामर्श और नोटरी सेवाएं लाइसेंसशुदा तृतीय-पक्ष पेशेवरों द्वारा दी जाती हैं। AI सुझावों के आधार पर की गई कार्रवाई के लिए हम उत्तरदायी नहीं हैं।",
      },
    },
  }

  const t = content[language];
  if (!mounted) return null;

  const iconColors = [
    { bg: "bg-blue-600/10", border: "border-blue-500/20", text: "text-blue-400", hover: "group-hover:bg-blue-600/20 group-hover:border-blue-500/40" },
    { bg: "bg-purple-600/10", border: "border-purple-500/20", text: "text-purple-400", hover: "group-hover:bg-purple-600/20 group-hover:border-purple-500/40" },
    { bg: "bg-emerald-600/10", border: "border-emerald-500/20", text: "text-emerald-400", hover: "group-hover:bg-emerald-600/20 group-hover:border-emerald-500/40" },
    { bg: "bg-cyan-600/10", border: "border-cyan-500/20", text: "text-cyan-400", hover: "group-hover:bg-cyan-600/20 group-hover:border-cyan-500/40" },
  ];
  const whyUsIcons = [
    <IndianRupee className="h-5 w-5" />,
    <Bot className="h-5 w-5" />,
    <Shield className="h-5 w-5" />,
    <PenTool className="h-5 w-5" />,
  ];

  return (
    <div className="min-h-screen bg-[#080c14] text-white overflow-hidden relative font-sans">

      {/* ─── AMBIENT BACKGROUND ─── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(37,99,235,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(124,58,237,0.06),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(6,182,212,0.03),transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />
      </div>

      {/* ─── NAV ─── */}
      <nav className="relative z-50 sticky top-0 border-b border-white/5 bg-[#080c14]/80 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-[68px]">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:shadow-blue-600/50 transition-all">
                <Scale className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">NyayMitra</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {Object.entries(t.nav).slice(0, -2).map(([key, value]) => (
                <Link key={key}
                  href={key === "home" ? "/" : key === "legalGPT" ? "/legal-ai" : `/${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`}
                  className="px-3.5 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-150">
                  {value}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setLanguage(language === "en" ? "hi" : "en")}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-white border border-white/10 hover:border-white/20 rounded-full transition-all">
                {language === "en" ? "हिंदी" : "EN"}
              </button>

              {mounted && isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full pl-1.5 pr-3 py-1 hover:bg-white/10 transition-all">
                      <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
                        <User className="h-3.5 w-3.5 text-white" />
                      </div>
                      <span className="text-sm font-medium text-slate-200 hidden sm:block">
                        {profile?.name?.split(' ')[0] || 'Account'}
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 mt-2 bg-[#0f1623] border border-white/10 rounded-xl shadow-2xl p-1" align="end">
                    <DropdownMenuItem asChild className="rounded-lg hover:bg-white/5 focus:bg-white/5 cursor-pointer">
                      <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5">
                        <User className="h-4 w-4 text-blue-400" />
                        <span className="text-sm text-slate-200">{t.profileMenu.profile}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => window.location.href = 'https://nyay-dashboard.netlify.app/'} className="rounded-lg hover:bg-white/5 focus:bg-white/5 cursor-pointer">
                      <div className="flex items-center gap-3 px-3 py-2.5 w-full">
                        <BarChart2 className="h-4 w-4 text-emerald-400" />
                        <span className="text-sm text-slate-200">{t.profileMenu.dashboard}</span>
                      </div>
                    </DropdownMenuItem>
                    {profile?.role !== "lawyer" && (
                      <DropdownMenuItem asChild className="rounded-lg hover:bg-white/5 focus:bg-white/5 cursor-pointer">
                        <Link href="/all-bookings" className="flex items-center gap-3 px-3 py-2.5">
                          <CalendarCheck className="h-4 w-4 text-purple-400" />
                          <span className="text-sm text-slate-200">{t.profileMenu.bookings}</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <div className="h-px bg-white/10 my-1" />
                    <DropdownMenuItem onClick={() => { localStorage.removeItem("token"); window.location.reload(); }} className="rounded-lg hover:bg-red-500/10 focus:bg-red-500/10 cursor-pointer">
                      <div className="flex items-center gap-3 px-3 py-2.5">
                        <LogOut className="h-4 w-4 text-red-400" />
                        <span className="text-sm text-red-400">{t.profileMenu.logout}</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : mounted && (
                <div className="flex items-center gap-2">
                  <Link href="/auth/login">
                    <button className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                      {t.nav.login}
                    </button>
                  </Link>
                  <Link href="/auth/signup">
                    <button className="px-4 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all shadow-lg shadow-blue-600/20">
                      {t.nav.signup}
                    </button>
                  </Link>
                </div>
              )}

              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10">
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-white/5 bg-[#0a0f1a]">
            <div className="px-4 py-4 space-y-1">
              {Object.entries(t.nav).filter(([key]) => !['login', 'signup'].includes(key)).map(([key, value]) => (
                <Link key={key}
                  href={key === "home" ? "/" : key === "legalGPT" ? "/legal-ai" : `/${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`}
                  className="block px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl"
                  onClick={() => setIsMenuOpen(false)}>
                  {value}
                </Link>
              ))}
              <div className="h-px bg-white/10 my-2" />
              <Link href="/auth/login" className="block px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl" onClick={() => setIsMenuOpen(false)}>{t.nav.login}</Link>
              <Link href="/auth/signup" className="block px-4 py-3 text-sm font-semibold text-blue-400 hover:text-blue-300 hover:bg-white/5 rounded-xl" onClick={() => setIsMenuOpen(false)}>{t.nav.signup}</Link>
            </div>
          </div>
        )}
      </nav>

      {/* ─── PREMIUM HERO ─── */}
      <section className="relative z-10 min-h-[94vh] flex items-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">

        {/* Hero-specific ambient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large primary orb */}
          <div className="absolute -top-32 -left-32 w-[700px] h-[700px] bg-blue-600/[0.07] rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s' }} />
          {/* Secondary accent orb */}
          <div className="absolute top-1/2 -right-48 w-[500px] h-[500px] bg-violet-600/[0.06] rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }} />
          {/* Bottom cyan accent */}
          <div className="absolute -bottom-20 left-1/3 w-[400px] h-[300px] bg-cyan-600/[0.04] rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />

          {/* Floating particles */}
          {[
            { top: '15%', left: '8%', delay: '0s', size: 'w-1 h-1', color: 'bg-blue-400' },
            { top: '25%', left: '92%', delay: '1.5s', size: 'w-1.5 h-1.5', color: 'bg-violet-400' },
            { top: '60%', left: '5%', delay: '3s', size: 'w-1 h-1', color: 'bg-cyan-400' },
            { top: '70%', left: '88%', delay: '0.8s', size: 'w-1 h-1', color: 'bg-blue-300' },
            { top: '40%', left: '96%', delay: '2s', size: 'w-1 h-1', color: 'bg-emerald-400' },
            { top: '80%', left: '15%', delay: '4s', size: 'w-1.5 h-1.5', color: 'bg-violet-300' },
          ].map((p, i) => (
            <div key={i} className={`absolute ${p.size} ${p.color} rounded-full opacity-60 animate-ping`}
              style={{ top: p.top, left: p.left, animationDelay: p.delay, animationDuration: '3s' }} />
          ))}

          {/* Diagonal accent line */}
          <div className="absolute top-0 right-[30%] w-px h-full bg-gradient-to-b from-transparent via-blue-500/10 to-transparent" />
          <div className="absolute top-0 right-[70%] w-px h-full bg-gradient-to-b from-transparent via-violet-500/8 to-transparent" />
        </div>

        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">

            {/* ── LEFT COLUMN ── */}
            <div className="space-y-8">

              {/* Animated badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-blue-500/25 bg-blue-500/[0.06] backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                <span className="text-xs font-semibold text-blue-300 tracking-wide">{t.hero.badge}</span>
              </div>

              {/* Headline — large, layered */}
              <div className="space-y-3">
                <h1 className="text-5xl sm:text-6xl lg:text-[70px] font-extrabold leading-[1.0] tracking-tight">
                  {/* Gradient text on first line */}
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-br from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                      {t.hero.title}
                    </span>
                    {/* Underline glow accent */}
                    <span className="absolute -bottom-1 left-0 w-3/4 h-0.5 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
                  </span>
                </h1>
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold leading-tight">
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    {t.hero.subtitle}
                  </span>
                </h2>
              </div>

              <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-lg">
                {t.hero.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/legal-gpt" className="flex-1">
                  <button className="w-full relative group flex items-center justify-center gap-2.5 px-6 py-4 font-semibold rounded-xl text-sm overflow-hidden transition-all duration-300">
                    {/* Animated gradient background */}
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-300 group-hover:from-blue-500 group-hover:to-cyan-500" />
                    {/* Glow */}
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-blue-500/40" />
                    <span className="absolute -inset-px rounded-xl bg-gradient-to-r from-blue-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <MessageCircle className="h-4 w-4 relative z-10 text-white" />
                    <span className="relative z-10 text-white">{t.hero.ctaPrimary}</span>
                    <ArrowRight className="h-3.5 w-3.5 relative z-10 text-white opacity-70 -translate-x-1 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200" />
                  </button>
                </Link>
                <Link href="/lawyers" className="flex-1">
                  <button className="w-full group flex items-center justify-center gap-2.5 px-6 py-4 bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold rounded-xl border border-white/[0.12] hover:border-white/25 transition-all duration-300 text-sm backdrop-blur-sm">
                    <FileText className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                    {t.hero.ctaSecondary}
                  </button>
                </Link>
              </div>

              {/* WhatsApp CTA */}
              <a href={`https://wa.me/${t.hero.whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                <button className="w-full group flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#075E54]/20 hover:bg-[#128C7E]/25 text-[#25D366] font-semibold rounded-xl border border-[#25D366]/20 hover:border-[#25D366]/40 transition-all duration-300 text-sm backdrop-blur-sm">
                  <svg className="h-4 w-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.677-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.897 6.994c-.004 5.45-4.437 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.181-1.24-6.162-3.495-8.411" />
                  </svg>
                  {t.hero.whatsapp}
                </button>
              </a>

              {/* Stats row — glassmorphism cards */}
              <div className="grid grid-cols-4 gap-2.5 pt-2">
                {t.hero.stats.map((s, i) => {
                  const colors = ["text-blue-400", "text-cyan-400", "text-emerald-400", "text-purple-400"];
                  return (
                    <div key={s.label} className="group relative bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-white/[0.12] rounded-xl p-3.5 transition-all duration-300 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className={`text-lg font-bold ${colors[i]} relative z-10`}>{s.value}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5 relative z-10 leading-tight">{s.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── RIGHT COLUMN — Premium "How It Works" Card ── */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Outer glow */}
                <div className="absolute -inset-4 bg-gradient-to-br from-blue-600/15 via-violet-600/10 to-cyan-600/10 rounded-3xl blur-2xl" />

                {/* Card */}
                <div className="relative bg-gradient-to-br from-[#0d1525] to-[#0a1020] border border-white/[0.09] rounded-2xl overflow-hidden">

                  {/* Top shimmer line */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

                  {/* Inner top-right accent */}
                  <div className="absolute -top-20 -right-20 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-violet-600/8 rounded-full blur-2xl pointer-events-none" />

                  <div className="p-8 space-y-7">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                        </div>
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-[0.15em]">{t.howItWorks.label}</span>
                      </div>
                      <span className="text-[10px] text-slate-600 bg-white/[0.03] border border-white/[0.06] px-2.5 py-1 rounded-full">NyayMitra AI</span>
                    </div>

                    {/* Steps */}
                    <div className="space-y-1">
                      {[
                        { icon: <FileCheck className="h-4 w-4" />, color: "blue" },
                        { icon: <Bot className="h-4 w-4" />, color: "violet" },
                        { icon: <CalendarCheck className="h-4 w-4" />, color: "emerald" },
                      ].map((meta, i) => {
                        const step = t.howItWorks.steps[i];
                        const colorMap: Record<string, { ring: string; bg: string; text: string; connector: string }> = {
                          blue: { ring: "border-blue-500/30", bg: "bg-blue-600/10 group-hover:bg-blue-600/20", text: "text-blue-400", connector: "bg-blue-500/20" },
                          violet: { ring: "border-violet-500/30", bg: "bg-violet-600/10 group-hover:bg-violet-600/20", text: "text-violet-400", connector: "bg-violet-500/20" },
                          emerald: { ring: "border-emerald-500/30", bg: "bg-emerald-600/10 group-hover:bg-emerald-600/20", text: "text-emerald-400", connector: "bg-emerald-500/20" },
                        };
                        const c = colorMap[meta.color];
                        return (
                          <div key={i}>
                            <div className="flex gap-4 group p-3 rounded-xl hover:bg-white/[0.03] transition-all duration-200 cursor-default">
                              {/* Icon + connector */}
                              <div className="flex flex-col items-center gap-0">
                                <div className={`flex-shrink-0 w-10 h-10 rounded-xl border ${c.ring} ${c.bg} flex items-center justify-center ${c.text} transition-all duration-200`}>
                                  {meta.icon}
                                </div>
                                {i < 2 && <div className={`w-px h-5 ${c.connector} mt-1`} />}
                              </div>
                              {/* Text */}
                              <div className="pt-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-mono text-slate-700">{step.n}</span>
                                  <span className="text-sm font-semibold text-white">{step.title}</span>
                                </div>
                                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{step.desc}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

                    {/* Bottom CTA inside card */}
                    <Link href="/legal-gpt">
                      <button className="w-full group flex items-center justify-center gap-2 py-3 px-4 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 hover:border-blue-500/40 text-blue-300 hover:text-blue-200 font-semibold text-sm rounded-xl transition-all duration-200">
                        <Sparkles className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
                        {t.hero.ctaPrimary}
                        <ArrowRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      </button>
                    </Link>

                    {/* Footer note */}
                    <p className="text-[10px] text-slate-700 text-center">{t.howItWorks.online}</p>
                  </div>
                </div>

                {/* Floating trust pill */}
                <div className="absolute -bottom-4 -right-4 flex items-center gap-2 bg-[#0d1424] border border-white/10 rounded-xl px-3.5 py-2.5 shadow-2xl">
                  <div className="flex -space-x-1.5">
                    {["SA", "AU", "DC"].map((av) => (
                      <div key={av} className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-[8px] font-bold text-blue-300">{av}</div>
                    ))}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white leading-none">500+ clients</div>
                    <div className="flex gap-px mt-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-2 w-2 fill-amber-400 text-amber-400" />)}
                    </div>
                  </div>
                </div>

                {/* Floating badge top-left */}
                <div className="absolute -top-3 -left-3 flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 rounded-lg px-2.5 py-1.5 shadow-xl">
                  <CheckCircle className="h-3 w-3 text-emerald-400" />
                  <span className="text-[10px] font-bold text-emerald-300">Verified Platform</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <div className="relative z-10 border-y border-white/5 bg-white/[0.02] py-5 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { icon: <Gavel className="w-4 h-4" />, item: t.trustBar[0] },
            { icon: <Users className="w-4 h-4" />, item: t.trustBar[1] },
            { icon: <Clock className="w-4 h-4" />, item: t.trustBar[2] },
            { icon: <Star className="w-4 h-4" />, item: t.trustBar[3] },
          ].map(({ icon, item }) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className="text-blue-500">{icon}</div>
              <div>
                <div className="text-sm font-bold text-white">{item.value}</div>
                <div className="text-xs text-slate-500">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── HOW IT WORKS ─── */}
      <section className="relative z-10 py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">{t.process.label}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">{t.process.title}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-8 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-px bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-blue-600/30" />
            {[
              { icon: <FileCheck className="h-5 w-5" /> },
              { icon: <Bot className="h-5 w-5" /> },
              { icon: <ThumbsUp className="h-5 w-5" /> },
            ].map((meta, i) => {
              const step = t.process.steps[i];
              return (
                <div key={i} className="relative flex flex-col items-center text-center group">
                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-[#0d1424] border border-white/10 group-hover:border-blue-500/40 flex items-center justify-center text-blue-400 mb-5 transition-all group-hover:bg-blue-600/10">
                    {meta.icon}
                    <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-[9px] font-bold text-white">{i + 1}</span>
                    </div>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1.5">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="relative z-10 py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
            <div>
              <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">{t.services.label}</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">{t.services.title}</h2>
              <p className="text-slate-500 mt-2 text-base">{t.services.subtitle}</p>
            </div>
            <Link href="/services" className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors whitespace-nowrap">
              {t.services.allServices} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <Link href="/affidavit-online-india" className="group lg:col-span-2 relative overflow-hidden bg-[#0d1424] border border-white/[0.07] hover:border-blue-500/30 rounded-2xl p-7 transition-all duration-300 hover:bg-[#0f1829]">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-600/15 border border-blue-500/20 flex items-center justify-center">
                    <Stamp className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">{t.services.affidavit.badge}</span>
                    <h3 className="text-lg font-bold text-white mt-1">{t.services.affidavit.title}</h3>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600/20 group-hover:border-blue-500/40 transition-all">
                  <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-blue-400" />
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-5 max-w-md">{t.services.affidavit.desc}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {t.services.affidavit.tags.map(tag => (
                  <span key={tag} className="text-xs text-slate-500 bg-white/[0.03] border border-white/[0.07] px-2.5 py-1 rounded-full">{tag}</span>
                ))}
              </div>
              <div className="flex items-center gap-6 text-xs text-slate-500">
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-blue-500" />{t.services.affidavit.meta[0]}</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-emerald-500" />{t.services.affidavit.meta[1]}</span>
                <span className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-amber-500" />{t.services.affidavit.meta[2]}</span>
              </div>
            </Link>

            <Link href="/legal-gpt" className="group relative overflow-hidden bg-[#0d1424] border border-white/[0.07] hover:border-purple-500/30 rounded-2xl p-7 transition-all duration-300 hover:bg-[#0f1829] flex flex-col">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-600/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-purple-600/15 border border-purple-500/20 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-purple-400" />
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-purple-600/20 group-hover:border-purple-500/40 transition-all">
                  <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-purple-400" />
                </div>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{t.services.aiChat.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed flex-1">{t.services.aiChat.desc}</p>
              <div className="mt-5 text-xs text-slate-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                {t.services.aiChat.meta}
              </div>
            </Link>

            <Link href="/lawyers" className="group relative overflow-hidden bg-[#0d1424] border border-white/[0.07] hover:border-cyan-500/30 rounded-2xl p-7 transition-all duration-300 hover:bg-[#0f1829] flex flex-col">
              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-cyan-600/15 border border-cyan-500/20 flex items-center justify-center">
                  <Gavel className="h-5 w-5 text-cyan-400" />
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-600/20 group-hover:border-cyan-500/40 transition-all">
                  <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-cyan-400" />
                </div>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{t.services.findLawyers.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed flex-1">{t.services.findLawyers.desc}</p>
              <div className="mt-5 text-xs text-slate-500 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {t.services.findLawyers.meta}
              </div>
            </Link>

            <Link href="/services" className="group relative overflow-hidden bg-[#0d1424] border border-white/[0.07] hover:border-emerald-500/30 rounded-2xl p-7 transition-all duration-300 hover:bg-[#0f1829] flex flex-col">
              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-emerald-600/15 border border-emerald-500/20 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-emerald-400" />
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-600/20 group-hover:border-emerald-500/40 transition-all">
                  <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-400" />
                </div>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{t.services.docGen.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed flex-1">{t.services.docGen.desc}</p>
              <div className="mt-5 text-xs text-slate-500 flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5" /> {t.services.docGen.meta}
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHY NYAYMITRA ─── */}
      <section className="relative z-10 py-28 px-4 sm:px-6 lg:px-8 border-y border-white/[0.04]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">{t.whyUs.label}</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
                {t.whyUs.title}<br />{t.whyUs.titleLine2}
              </h2>
              <p className="text-slate-400 text-base leading-relaxed mb-10">{t.whyUs.desc}</p>
              <Link href="/legal-gpt">
                <button className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all text-sm shadow-lg shadow-blue-600/20">
                  {t.whyUs.cta} <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {t.whyUs.features.map((f, i) => (
                <div key={f.title} className={`bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.12] transition-all group`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${iconColors[i].bg} ${iconColors[i].text}`}>
                    {whyUsIcons[i]}
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">{f.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── COMMON PROBLEMS ─── */}
      <section className="relative z-10 py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">{t.problems.label}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">{t.problems.title}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.problems.items.map((item) => (
              <div key={item.title} className="group bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.05] rounded-xl p-5 transition-all cursor-pointer">
                <div className="text-2xl mb-3">{item.emoji}</div>
                <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="relative z-10 py-28 px-4 sm:px-6 lg:px-8 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">{t.testimonials.label}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">{t.testimonials.title}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {t.testimonials.items.map((item) => (
              <div key={item.name} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 hover:border-white/[0.12] transition-all">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 italic">"{item.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.05]">
                  <div className="w-9 h-9 rounded-full bg-blue-600/20 border border-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-300">
                    {item.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{item.name}</div>
                    <div className="text-xs text-slate-600">{item.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BAND ─── */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600/20 to-purple-600/10 border border-blue-500/20 rounded-2xl p-10 sm:p-14 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.1),transparent_70%)]" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t.cta.title}</h2>
              <p className="text-slate-400 text-base mb-8 max-w-xl mx-auto">{t.cta.desc}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/legal-gpt">
                  <button className="flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-xl shadow-blue-600/25 text-sm">
                    <Sparkles className="h-4 w-4" /> {t.cta.primary}
                  </button>
                </Link>
                <Link href="/lawyers">
                  <button className="flex items-center gap-2 px-7 py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all text-sm">
                    {t.cta.secondary}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10 border-t border-white/[0.05] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Scale className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white">{t.footer.company}</span>
              </div>
              <p className="text-slate-500 text-sm mb-5 max-w-xs">{t.footer.tagline}</p>
              <div className="space-y-2.5 text-sm">
                <div className="flex items-center gap-2.5 text-slate-500"><MapPin className="h-4 w-4 text-slate-600 flex-shrink-0" />{t.footer.address}</div>
                <div className="flex items-center gap-2.5 text-slate-500"><Mail className="h-4 w-4 text-slate-600 flex-shrink-0" />{t.footer.email}</div>
                <div className="flex items-center gap-2.5 text-slate-500"><PhoneCall className="h-4 w-4 text-slate-600 flex-shrink-0" />{t.footer.phone}</div>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">{t.footer.quickLinks}</h3>
              <ul className="space-y-3">
                {[
                  { href: "/about", label: t.footer.about },
                  { href: "/services", label: t.footer.services },
                  { href: "/lawyers", label: t.footer.findLawyers },
                  { href: "/affidavit-online-india", label: t.footer.affidavitOnline },
                  { href: "/auth/signup", label: t.footer.signup },
                ].map(l => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-slate-500 hover:text-slate-300 transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">{t.footer.legal}</h3>
              <ul className="space-y-3">
                {[
                  { href: "/terms", label: t.footer.terms },
                  { href: "/privacy-policy", label: t.footer.privacy },
                  { href: "/cancellation", label: t.footer.cancellation },
                  { href: "/Shipping&DeliveryPolicy", label: t.footer.deliveryPolicy },
                  { href: "/contact", label: t.footer.contactUs },
                ].map(l => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-slate-500 hover:text-slate-300 transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/[0.05] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-600">© 2026 {t.footer.company}. All rights reserved.</p>
            <p className="text-xs text-slate-700 max-w-2xl text-center sm:text-right leading-relaxed">
              <span className="text-red-500 font-semibold">Disclaimer: </span>
              {t.footer.disclaimerText}
            </p>
          </div>
        </div>
      </footer>

      {/* ─── FLOATING WHATSAPP ─── */}
      <a href={`https://wa.me/${t.hero.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 group">
        <div className="relative">
          <div className="absolute -inset-1.5 bg-[#25D366]/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all" />
          <div className="relative w-14 h-14 bg-[#128C7E] hover:bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="h-7 w-7">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.677-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.897 6.994c-.004 5.45-4.437 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.181-1.24-6.162-3.495-8.411" />
            </svg>
          </div>
        </div>
      </a>
    </div>
  )
}