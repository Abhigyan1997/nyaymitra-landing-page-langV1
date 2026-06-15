"use client"

import { useState, useEffect, useRef } from "react"
import {
    Check, Zap, Shield, Users, FileText, MessageCircle,
    ArrowRight, Clock, Scale, AlertCircle, TrendingUp,
    Award, ThumbsUp, Sparkles, Menu, X, Instagram, Linkedin,
    MapPin, Mail, PhoneCall, ChevronRight, Gavel, Bot, XCircle,
    Briefcase, FileCheck, Users2, Lock, Target, ChevronDown, Building, Users as UsersIcon, IndianRupee,
    Handshake
} from "lucide-react"

// ─── TRANSLATIONS ────────────────────────────────────────────────────────────
const t = {
    navServices: "Services",
    navFindLawyers: "Find Lawyers",
    navLegalGPT: "Legal GPT",
    navPricing: "Pricing",
    navAbout: "About",

    // Hero
    heroBadge: "OUTSOURCED LEGAL OPERATIONS FOR STARTUPS",
    startupsProtected: "Helping startups across India simplify legal operations.",
    heroHeadline: "Stop Managing Lawyers,",
    heroHeadlineGold: "CAs & Compliance Yourself.",
    heroDesc: "NyayMitra acts as your startup's outsourced legal operations team coordinating filings, contracts, compliance, and follow ups so you can focus on building.",
    heroPrice: "Legal Operations Support Starting at ₹6,999/month",
    heroTrust: "Already working with a CA or lawyer? Great. We coordinate with them too.",
    bullet1: "Save time on legal coordination",
    bullet2: "Stay compliant without the stress",
    bullet3: "One accountable team for everything legal",
    ctaWhatsapp: "Talk to Legal Ops",
    ctaPlans: "View Plans",
    live: "LIVE",
    fromConfusion: "FROM CONFUSION TO ACTION.",
    aiPowered: "AI powered · 24/7 · Hindi & English",
    verifiedLawyers: "65+ Verified Lawyers",
    avgResponse: "Avg response < 2 hours",
    heroNewDesc: "Trusted by founders to coordinate lawyers, CAs, compliance and documentation without hiring an in house legal team.",

    // Who Is This For
    whoHeading: "Is this for you?",
    whoSub: "NyayMitra is built for founders who don't want to become legal project managers.",
    earlyStage: "Early Stage Founders",
    earlyStageItems: ["Doing compliance themselves", "Unsure what matters", "No legal structure"],
    growingStartups: "Growing Startups",
    growingItems: ["Vendor contracts", "HR documentation", "Investor readiness"],
    msme: "MSMEs & Multi City Businesses",
    msmeItems: ["Multi state execution", "Compliance coordination", "One accountable team"],

    // Pain Section
    painBadge: "THE REAL PROBLEM",
    painHeadline: "You're not short of advisors.",
    painHeadlineGold: "You're short of ownership.",
    painDesc: "Founders spend hours every week on things that should never land on their plate.",
    painItems: [
        "Following up with lawyers and CAs",
        "Repeating the same documents to multiple professionals",
        "Coordinating compliance between CA, CS and legal counsel",
        "Tracking filing deadlines manually",
        "Managing legal notices and not knowing next steps",
    ],
    painClose: "The founder unintentionally becomes the legal project manager. That's why NyayMitra exists.",

    // Risk Section
    realCost: "THE REAL COST",
    riskHeading: "What happens if you ignore legal?",
    riskSub: "Small oversights become expensive disasters.",

    // Why NyayMitra
    whyBadge: "WHY NYAYMITRA",
    whyHeadline: "Why founders choose NyayMitra.",
    whySub: "Stop patchworking legal. Get one coordinated layer that handles it all.",
    traditionalLabel: "Law Firms",
    nyayLabel: "NyayMitra",
    platformLabel: "Compliance Platforms",

    // Pricing
    pricing: "PRICING",
    pricingHeading: "Startup Legal Operations Plans",
    pricingSub: "Choose the level of legal operations support your business needs.",
    mostPopular: "MOST POPULAR",

    // ROI
    roiBadge: "THE COST OF DOING NOTHING",
    roiHeadline: "What are you actually paying for legal?",
    roiSub: "Compare your real options before deciding.",
    roiFooter: "Your biggest legal expense isn't legal fees. It's founder distraction.",

    // Matrix
    matrixBadge: "PLAN COMPARISON",
    matrixHeadline: "Compare all plans.",

    // Testimonials
    testimonialBadge: "FOUNDER STORIES",
    testimonialHeadline: "What founders fixed with NyayMitra.",
    testimonialSub: "Real problems. Solved in days. No court. No expensive surprises.",

    // Transparency
    transparencyHeading: "What's Not Included",
    transparencySub: "Clear expectations build better partnerships.",
    noCourt: "Court representation excluded",
    noLitigation: "Specialist litigation available separately",
    noGovtFees: "Government fees billed separately",
    noTax: "Tax filing excluded",

    // FAQ
    faqBadge: "FAQ",
    faqHeadline: "Common questions answered.",

    // Final CTA
    finalHeading: "Focus on building your business.",
    finalHeadingGold: "We'll handle the legal coordination behind the scenes.",
    finalDesc: "Get the support of a startup-focused legal arm without hiring an in house legal team.",
    ctaFinal: "Talk to Legal Ops",
    noCard: "No lock-ins. Works with your existing CA and lawyers.",

    // Services
    servicesHeading: "Execution & Compliance Services",
    servicesSub: "Execution-focused legal support for startups & businesses",

    // How it works
    howItWorks: "How NyayMitra Works",
    howItWorksSub: "Your operational legal infrastructure",
    step1Title: "Legal Intake & Risk Mapping",
    step1Desc: "We understand your business operations, legal gaps, documentation needs, and compliance exposure.",
    step1Detail: "AI pre analysis in 30 seconds",
    step2Title: "Operational Coordination",
    step2Desc: "NyayMitra coordinates documentation, filings, workflows, and partner professionals.",
    step2Detail: "Expert matched in < 2 hours",
    step3Title: "Execution & Ongoing Support",
    step3Desc: "We ensure operational follow through across legal, compliance, and business workflows.",
    step3Detail: "Resolution in 24–48 hours",

    // Trust
    realResults: "REAL RESULTS",
    trustHeading: "What founders fixed with us",
    trustSub: "Real problems, solved in days. No court, no expensive lawyers.",
    testimonialText: "\"Instead of coordinating multiple professionals myself, we finally had one point of contact. NyayMitra took the entire legal coordination off my plate and I stopped losing hours every week to follow ups.\"",
    testimonialName: "Ankit Sharma",
    testimonialTitle: "Co-founder, TechStart India",
    verified: "Verified",

    // Footer
    disclaimer: "NyayMitra is a technology platform. We do not act as a law firm. All consultations are delivered by licensed third party professionals.",
    quickLinks: "Quick Links",
    legal: "Legal",

    // Existing advisors trust strip
    existingAdvisorsTitle: "Already have a CA or lawyer?",
    existingAdvisorsDesc: "Perfect. NyayMitra works alongside your existing advisors so you don't have to coordinate everything yourself.",
}

// ─── WHATSAPP ────────────────────────────────────────────────────────────────
const WA = "919661644025"
const waLite = `https://wa.me/${WA}?text=I%20want%20the%20Founder%20Essentials%20plan`
const waOps = `https://wa.me/${WA}?text=I%20want%20the%20Startup%20Legal%20Ops%20plan`
const waFractional = `https://wa.me/${WA}?text=I%20want%20to%20discuss%20the%20Fractional%20Legal%20Department%20plan`
const waGeneral = `https://wa.me/${WA}?text=I%20need%20startup%20legal%20help`
const waStrategy = `https://wa.me/${WA}?text=I%20want%20to%20book%20a%20strategy%20call`

// ─── DATA ────────────────────────────────────────────────────────────────────
const risks = [
    { icon: <XCircle className="w-5 h-5" />, title: "Bad contract you signed", consequence: "Financial loss of ₹2L+", outcome: "We fix loopholes before they're exploited" },
    { icon: <AlertCircle className="w-5 h-5" />, title: "No co-founder agreement", consequence: "Disputes split the company", outcome: "Clear ownership & exit terms" },
    { icon: <TrendingUp className="w-5 h-5" />, title: "Ignoring legal notice", consequence: "Escalation to court", outcome: "Resolution without litigation" },
]

// ─── PLAN DATA (RESTRUCTURED) ─────────────────────────────────────────────────
// Each plan now has:
// - Visible-by-default fields: positioningLabel, name, tagline, bestFor, outcomes, price, billingNote, cta, trustBadge, premiumNote, badge
// - Hidden-by-default (in "View Details"): problems, benefits, upgradeWhen
const plans = [
    {
        id: "lite",
        name: "Founder Essentials",
        tagline: "Stay protected while you focus on building.",
        price: 6999,
        yearlyPrice: 5599,
        priceDisplay: null as string | null, // null => use numeric price
        bestFor: "Solopreneurs and early stage startups.",
        billingNote: "Billed monthly.",
        outcomes: [
            "Know exactly what's pending.",
            "Avoid costly legal surprises.",
            "Save 3–5 founder hours every month.",
            "Build with confidence from day one.",
        ],
        cta: "Get Started",
        whatsapp: waLite,
        popular: false,
        positioningLabel: "Founder Safety Net",
        trustBadge: "WhatsApp response within 24 hours.",
        premiumNote: null as string | null,
        problems: [
            "Not sure what legal work actually matters.",
            "Signing contracts without understanding the risks.",
            "Missing important deadlines.",
            "Realizing too late that paperwork was incomplete.",
            "Spending hours figuring things out yourself.",
        ],
        benefits: [
            { title: "Founder Legal Hotline (WhatsApp)", desc: "Get answers before making important decisions." },
            { title: "Contract Safety Review", desc: "Avoid signing agreements that expose your business." },
            { title: "Compliance Early Warning System", desc: "Know about deadlines before they become penalties." },
            { title: "Founder Documentation Vault", desc: "Keep all critical documents organized and accessible." },
            { title: "Startup Legal Roadmap", desc: "Know what legal milestones matter as you grow." },
        ],
        upgradeWhen: "When hiring starts, client contracts increase, or legal complexity grows.",
        bonus: "₹5,000 execution credits annually.",
    },
    {
        id: "ops",
        name: "Startup Legal Ops",
        tagline: "Your startup's legal arm without hiring a legal team.",
        price: 17999,
        yearlyPrice: 14399,
        priceDisplay: null as string | null,
        bestFor: "Growing startups and MSMEs.",
        billingNote: "Billed monthly.",
        outcomes: [
            "Save 5–10 founder hours every month.",
            "Never wonder what's happening.",
            "Close contracts faster.",
            "Reduce legal risk as you scale.",
        ],
        cta: "Talk to Legal Ops",
        whatsapp: waOps,
        popular: true,
        positioningLabel: "Most Popular",
        badge: "MOST POPULAR",
        trustBadge: "WhatsApp response within 4 business hours.",
        premiumNote: "We onboard a limited number of retainer clients each month to maintain service quality.",
        problems: [
            "Chasing multiple advisors for updates.",
            "Not knowing what's pending.",
            "Losing deals because contracts take too long.",
            "Missing compliance obligations.",
            "Founder distraction from growth activities.",
        ],
        benefits: [
            { title: "One WhatsApp Number For Everything Legal", desc: "No more coordinating multiple professionals." },
            { title: "Contract Turnaround Support", desc: "Reduce delays in client and vendor agreements." },
            { title: "Founder Decision Support", desc: "Discuss important business decisions before acting." },
            { title: "Legal Risk Radar", desc: "Identify issues before they become expensive problems." },
            { title: "Compliance Ownership", desc: "We follow up so you don't have to." },
            { title: "Notice Response Coordination", desc: "Avoid panic when notices arrive." },
            { title: "Hiring Documentation Support", desc: "Onboard employees the right way." },
        ],
        upgradeWhen: "When fundraising begins, operations expand across states, or multiple stakeholders are involved.",
        bonus: "₹15,000 execution credits annually.",
    },
    {
        id: "fractional",
        name: "Fractional Legal Department",
        tagline: "Operate with the confidence of an in house legal team.",
        price: 29999,
        yearlyPrice: 23999,
        priceDisplay: "Starting at ₹29,999",
        bestFor: "Scaling startups and multi state businesses.",
        billingNote: "Custom pricing available.",
        outcomes: [
            "Board level peace of mind.",
            "Full visibility into legal obligations.",
            "Faster execution across teams.",
            "Stronger investor readiness.",
        ],
        cta: "Book Strategy Call",
        whatsapp: waFractional,
        popular: false,
        positioningLabel: "Fractional Legal Team",
        trustBadge: "Priority response within 2 business hours.",
        premiumNote: null as string | null,
        problems: [
            "Founders becoming the bottleneck.",
            "Investor due diligence stress.",
            "Multi state compliance chaos.",
            "No visibility into legal risks.",
            "Growing teams without legal structure.",
        ],
        benefits: [
            { title: "Investor & Due Diligence Readiness", desc: "Never scramble for documents during fundraising." },
            { title: "Multi State Execution Management", desc: "One team coordinates everything." },
            { title: "Board & Leadership Documentation Support", desc: "Maintain governance as you grow." },
            { title: "Legal Operations Manager", desc: "A single accountable owner." },
            { title: "Quarterly Risk Reviews", desc: "Identify vulnerabilities before they escalate." },
            { title: "Escalation & Crisis Coordination", desc: "Get structured support when urgent issues arise." },
            { title: "Legal Infrastructure Development", desc: "Build systems that scale with the business." },
        ],
        upgradeWhen: "This is our highest tier built for businesses that need ongoing legal department support.",
        bonus: "₹30,000 execution credits annually.",
    },
]

const matrixRows = [
    { label: "Dedicated coordinator", lite: true, ops: true, frac: true },
    { label: "WhatsApp support", lite: true, ops: true, frac: true },
    { label: "Contract reviews", lite: "2/month", ops: "Unlimited", frac: "Unlimited" },
    { label: "Legal queries", lite: "Basic", ops: "Unlimited", frac: "Unlimited" },
    { label: "Compliance reminders", lite: true, ops: true, frac: true },
    { label: "Document support", lite: true, ops: true, frac: true },
    { label: "Founder strategy calls", lite: false, ops: "Monthly", frac: "Monthly" },
    { label: "Multi state coordination", lite: false, ops: false, frac: true },
    { label: "Priority turnaround", lite: false, ops: true, frac: true },
    { label: "Legal operations manager", lite: false, ops: false, frac: true },
    { label: "Execution credits (annual)", lite: "₹5,000", ops: "₹15,000", frac: "₹30,000" },
]

const services = [
    { id: "shop", title: "Shop & Establishment Registration", desc: "State specific compliance. End to end coordination.", price: "Starting from ₹9,999 + Govt Fees", icon: <Briefcase className="w-5 h-5" />, highlight: false, showOnPage: false },
    { id: "startup-docs", title: "Startup Foundation", desc: "Founder agreements, contracts, documentation and compliance roadmap.", price: "Starting from ₹19,999 + Govt Fees", icon: <FileCheck className="w-5 h-5" />, highlight: true, showOnPage: true },
    { id: "employment", title: "Employment & HR Documentation", desc: "Offer letters, employment agreements, HR policies.", price: "Starting from ₹14,999", icon: <Users2 className="w-5 h-5" />, highlight: false, showOnPage: false },
    { id: "notices", title: "Legal Notices & Recovery", desc: "Lawyer-reviewed notices, recovery strategy and dispute support.", price: "Starting from ₹9,999", icon: <MessageCircle className="w-5 h-5" />, highlight: false, showOnPage: false },
    { id: "trademark", title: "Trademark & IP Coordination", desc: "Protect your brand with expert filing coordination.", price: "Starting from ₹14,999 + Govt Fees", icon: <Shield className="w-5 h-5" />, highlight: false, showOnPage: false },
    { id: "vendor", title: "Contract Support", desc: "Vendor contracts, client agreements, commercial documentation review and turnaround.", price: "Starting from ₹9,999", icon: <FileText className="w-5 h-5" />, highlight: false, showOnPage: true },
    { id: "audit", title: "Compliance Coordination", desc: "Comprehensive legal audit, compliance tracking, and ongoing follow ups.", price: "Starting from ₹39,999", icon: <Check className="w-5 h-5" />, highlight: false, showOnPage: true },
    { id: "multi-city", title: "Investor Readiness", desc: "Due diligence preparation, documentation organization and multi state coordination.", price: "Starting from ₹19,999", icon: <MapPin className="w-5 h-5" />, highlight: false, showOnPage: true },
]

// Services shown on this landing page (subset, to reduce distraction from retainer focus)
const visibleServices = services.filter(s => s.showOnPage)

const steps = [
    { icon: <MessageCircle className="w-6 h-6" />, number: "01", title: t.step1Title, description: t.step1Desc, detail: t.step1Detail },
    { icon: <Scale className="w-6 h-6" />, number: "02", title: t.step2Title, description: t.step2Desc, detail: t.step2Detail },
    { icon: <Check className="w-6 h-6" />, number: "03", title: t.step3Title, description: t.step3Desc, detail: t.step3Detail },
]

// "What Happens After You Join" steps
const onboardingSteps = [
    { icon: <MessageCircle className="w-6 h-6" />, number: "01", title: "Message Us on WhatsApp", description: "Tell us what you're dealing with and share relevant documents.", detail: "Response within hours" },
    { icon: <UsersIcon className="w-6 h-6" />, number: "02", title: "Get Your Dedicated Coordinator", description: "A single point of contact manages timelines, updates and follow ups.", detail: "One accountable owner" },
    { icon: <Scale className="w-6 h-6" />, number: "03", title: "We Coordinate Everything", description: "We work with lawyers, CAs and other professionals until the task moves forward.", detail: "End to end ownership" },
]

const trustProofs = [
    { text: "Saved ₹80,000 by catching a bad clause before signing", icon: <FileText className="w-4 h-4" />, time: "Fixed in 2 hours" },
    { text: "Recovered ₹25,000 via legal notice without court", icon: <ThumbsUp className="w-4 h-4" />, time: "Resolved in 14 days" },
    { text: "Avoided a co-founder dispute with a proper agreement", icon: <Users className="w-4 h-4" />, time: "Drafted in 48h" },
    { text: "Stopped payment delay with a legal demand letter", icon: <Clock className="w-4 h-4" />, time: "Client paid in 7 days" },
]

// Execution Proof — replaces named-founder testimonials with representative scenarios
const executionProofs = [
    {
        text: "Multi-state registration coordinated without founder follow-ups",
        outcome: "Documentation completed smoothly across multiple jurisdictions.",
        icon: <MapPin className="w-4 h-4" />,
    },
    {
        text: "Legal notice coordination prevented unnecessary escalation",
        outcome: "Founder avoided lengthy disputes and regained clarity quickly.",
        icon: <Shield className="w-4 h-4" />,
    },
    {
        text: "Co-founder agreement prepared before conflict emerged",
        outcome: "Clear ownership and exit expectations established early.",
        icon: <FileCheck className="w-4 h-4" />,
    },
    {
        text: "Payment recovery notice drafted and coordinated",
        outcome: "Structured legal action initiated without disrupting business operations.",
        icon: <FileText className="w-4 h-4" />,
    },
]

// Why Founders Choose NyayMitra — comparison table rows (Others vs NyayMitra)
const whyChooseRows = [
    { others: "Advice only", nyay: "End-to-end coordination" },
    { others: "Multiple contacts", nyay: "One dedicated coordinator" },
    { others: "Reactive support", nyay: "Proactive reminders" },
    { others: "Founder follows up", nyay: "We follow up" },
    { others: "Task completion", nyay: "Ownership until closure" },
    { others: "Legal jargon", nyay: "Founder-friendly communication" },
]

const faqs = [
    {
        q: "What is legal operations?",
        a: "Legal operations is the coordination layer between you and your legal professionals lawyers, CAs, and CSs. Instead of you chasing updates, managing documents, and tracking filings, NyayMitra handles all of that coordination so founders can focus on building.",
    },
    {
        q: "Do I still need NyayMitra if I already have a CA?",
        a: "Yes and your CA will thank you. NyayMitra works with your existing CA. We handle coordination, reminders, document management and follow ups so your CA can focus on their core work and you don't have to project-manage the entire relationship.",
    },
    {
        q: "Do I still need NyayMitra if I already have a lawyer?",
        a: "Absolutely. Having a lawyer doesn't solve the coordination problem. NyayMitra acts as the operations layer between you and your lawyer managing timelines, documents, follow ups, and execution so nothing falls through the cracks.",
    },
    {
        q: "How is NyayMitra different from IndiaFilings?",
        a: "IndiaFilings is a compliance filing platform. NyayMitra is a legal operations partner. We don't just file documents we coordinate end-to-end legal execution, work with your existing CA and lawyer, provide a dedicated coordinator, WhatsApp support, and ongoing compliance tracking. We're accountable for outcomes, not just transactions.",
    },
    {
        q: "What happens during fundraising?",
        a: "During fundraising, we coordinate due diligence requests, organize your legal documents, review term sheets with your existing lawyers, and manage the documentation workflow. You focus on the pitch we handle the legal ops.",
    },
    {
        q: "Can startups outside Bengaluru use NyayMitra?",
        a: "Yes. NyayMitra supports startups across India including multi-state registration, compliance coordination, and remote-first legal operations. Our Fractional Legal Department plan includes explicit multi-city coordination.",
    },
    {
        q: "Are government fees included?",
        a: "Government fees, statutory charges, and filing fees are billed separately at actuals. Your plan covers legal coordination, document review, compliance tracking, and operations support.",
    },
    {
        q: "Is litigation included?",
        a: "Litigation and court representation are not included in retainer plans. NyayMitra can coordinate and connect you with the right litigation support through our lawyer network as an add-on service.",
    },
    {
        q: "Can I cancel anytime?",
        a: "Yes. Monthly plans can be cancelled before the next billing cycle. There are no lock-in periods or cancellation fees.",
    },
    {
        q: "Can I upgrade my plan later?",
        a: "Yes. You can upgrade at any time and we'll pro-rate the difference. Most founders start on Founder Essentials and upgrade to Startup Legal Ops as their team and compliance needs grow.",
    },
]

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function StartupLegalPage() {
    const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)
    const [hoveredService, setHoveredService] = useState<string | null>(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [activeStep, setActiveStep] = useState(0)
    const heroRef = useRef(null)
    const [isYearly, setIsYearly] = useState(false)
    const [openFaq, setOpenFaq] = useState<number | null>(null)
    const [expandedPlan, setExpandedPlan] = useState<string | null>(null)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    useEffect(() => {
        const timer = setInterval(() => setActiveStep(s => (s + 1) % 3), 2800)
        return () => clearInterval(timer)
    }, [])

    const navLinks = [
        { label: t.navServices, href: "/services" },
        { label: t.navFindLawyers, href: "/lawyers" },
        { label: t.navLegalGPT, href: "/legal-ai" },
        { label: t.navPricing, href: "#pricing" },
        { label: t.navAbout, href: "/about" },
    ]

    const WaSvg = ({ size = 16 }: { size?: number }) => (
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size, flexShrink: 0 }}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.677-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.897 6.994c-.004 5.45-4.437 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.181-1.24-6.162-3.495-8.411" />
        </svg>
    )

    // Cell helper for matrix
    const MatrixCell = ({ val, popular }: { val: boolean | string; popular: boolean }) => {
        if (val === false) return <span style={{ color: '#d1d5db', fontSize: 14 }}>—</span>
        if (val === true) return <Check style={{ width: 16, height: 16, color: popular ? '#D97706' : '#10b981' }} />
        return <span style={{ fontSize: 11, fontWeight: 600, color: popular ? '#FCD34D' : '#D97706' }}>{val}</span>
    }

    // Who Is This For cards data
    const whoCards = [
        {
            title: t.earlyStage,
            icon: <UsersIcon className="w-5 h-5" />,
            items: t.earlyStageItems,
            bg: "from-amber-900/20 to-transparent"
        },
        {
            title: t.growingStartups,
            icon: <TrendingUp className="w-5 h-5" />,
            items: t.growingItems,
            bg: "from-amber-800/20 to-transparent"
        },
        {
            title: t.msme,
            icon: <Building className="w-5 h-5" />,
            items: t.msmeItems,
            bg: "from-amber-700/20 to-transparent"
        }
    ]

    // Transparency cards (compact, includes all 4 items per spec)
    const transparencyItems = [
        { icon: <IndianRupee className="w-5 h-5" />, title: "Government fees billed separately" },
        { icon: <Gavel className="w-5 h-5" />, title: "Court representation excluded" },
        { icon: <FileText className="w-5 h-5" />, title: "Tax filing excluded" },
        { icon: <Scale className="w-5 h-5" />, title: "Specialist litigation available separately" },
    ]

    // ROI cards
    const roiCards = [
        { label: "In House Legal Hire", price: "₹80,000–₹1,25,000/month", sub: "Salary + benefits + overheads", highlight: false },
        { label: "Traditional Retainers", price: "₹25,000–₹60,000/month", sub: "Monthly retainer with limited scope", highlight: false },
        { label: "Compliance Mistakes", price: "₹25,000–₹5,00,000+", sub: "Per notice or filing missed", highlight: false },
        { label: "NyayMitra", price: "Starting at ₹6,999/month", sub: "Full legal operations coordination", highlight: true },
    ]

    return (
        <>
            {/* ── JSON-LD SEO SCHEMAS ── */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "Organization",
                            "@id": "https://nyaymitra.com/#organization",
                            name: "NyayMitra Technologies Private Limited",
                            url: "https://nyaymitra.com",
                            logo: "https://nyaymitra.com/logo.png",
                            contactPoint: { "@type": "ContactPoint", telephone: "+91-79705-96183", contactType: "customer support" },
                            sameAs: ["https://www.instagram.com/nyaymitra.tech", "https://www.linkedin.com/company/nyaymitra-tech-pvt-ltd"],
                        },
                        {
                            "@type": "LocalBusiness",
                            name: "NyayMitra",
                            description: "Outsourced legal operations and compliance execution partner for Indian startups and MSMEs.",
                            address: { "@type": "PostalAddress", streetAddress: "Koramangala", addressLocality: "Bengaluru", addressRegion: "Karnataka", postalCode: "560034", addressCountry: "IN" },
                            telephone: "+91-79705-96183",
                            url: "https://nyaymitra.com",
                        },
                        {
                            "@type": "BreadcrumbList",
                            itemListElement: [
                                { "@type": "ListItem", position: 1, name: "Home", item: "https://nyaymitra.com" },
                                { "@type": "ListItem", position: 2, name: "Startup Legal Plans", item: "https://nyaymitra.com/startup-legal-plans" },
                            ],
                        },
                        {
                            "@type": "FAQPage",
                            mainEntity: faqs.map(f => ({
                                "@type": "Question",
                                name: f.q,
                                acceptedAnswer: { "@type": "Answer", text: f.a },
                            })),
                        },
                        ...plans.map(p => ({
                            "@type": "Product",
                            name: p.name,
                            description: p.tagline,
                            brand: { "@type": "Brand", name: "NyayMitra" },
                            offers: {
                                "@type": "Offer",
                                price: p.price,
                                priceCurrency: "INR",
                                availability: "https://schema.org/InStock",
                                url: "https://nyaymitra.com/startup-legal-plans#pricing",
                            },
                        })),
                    ],
                })
            }} />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Syne:wght@400;500;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
                html { scroll-behavior: smooth; }
                body { font-family: 'DM Sans', system-ui, sans-serif; overflow-x: hidden; -webkit-font-smoothing: antialiased; }

                .nm-container { width: 100%; max-width: 1280px; margin: 0 auto; padding: 0 1.5rem; }
                @media (max-width: 640px) { .nm-container { padding: 0 1rem; } }

                .nm-section { padding: 5rem 1.5rem; }
                @media (max-width: 768px) { .nm-section { padding: 3rem 1rem; } }

                .brand-line { font-family: 'Syne', sans-serif; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #D97706; display: block; margin-bottom: 12px; }

                /* Grids */
                .nm-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
                @media (max-width: 900px) { .nm-grid-3 { grid-template-columns: 1fr; } }
                .nm-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
                @media (max-width: 640px) { .nm-grid-2 { grid-template-columns: 1fr; } }

                /* Nav */
                .nm-hide-mobile { display: flex !important; }
                .nm-show-mobile { display: none !important; }
                @media (max-width: 768px) { .nm-hide-mobile { display: none !important; } .nm-show-mobile { display: flex !important; } }

                /* Animations */
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                .anim-1 { animation: fadeInUp 0.65s cubic-bezier(0.4,0,0.2,1) both; }
                .anim-2 { animation: fadeInUp 0.65s 0.1s cubic-bezier(0.4,0,0.2,1) both; }
                .anim-3 { animation: fadeInUp 0.65s 0.2s cubic-bezier(0.4,0,0.2,1) both; }
                .anim-4 { animation: fadeInUp 0.65s 0.3s cubic-bezier(0.4,0,0.2,1) both; }
                @keyframes glow-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(217,119,6,0.4); } 50% { box-shadow: 0 0 0 6px rgba(217,119,6,0); } }
                .amber-pulse { animation: glow-pulse 2s infinite; }
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .marquee-track { animation: marquee 28s linear infinite; display: flex; }

                /* Plan cards */
                .plan-card { transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s ease; border-radius: 24px; display: flex; flex-direction: column; }
                .plan-card:hover { transform: translateY(-6px); box-shadow: 0 24px 64px rgba(0,0,0,0.1); }
                .plan-card.popular { transform: translateY(-8px); box-shadow: 0 32px 80px rgba(0,0,0,0.14); }
                .plan-card.popular:hover { transform: translateY(-14px); }
                .plan-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; align-items: start; }
                @media (max-width: 1024px) { .plan-grid { grid-template-columns: 1fr; gap: 2rem; } }

                /* Services */
                .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%,240px),1fr)); gap: 1.75rem; }
                @media (max-width: 640px) { .services-grid { grid-template-columns: 1fr; gap: 1.25rem; } }
                .service-tile { padding: 2rem; border-radius: 20px; border: 1px solid rgba(0,0,0,0.08); background: #fff; text-decoration: none; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); cursor: pointer; display: flex; flex-direction: column; gap: 16px; }
                .service-tile:hover { border-color: #D97706; box-shadow: 0 20px 60px rgba(217,119,6,0.15); transform: translateY(-6px); }
                .service-tile.highlight { border: 2px solid #D97706; background: linear-gradient(135deg, rgba(254,243,199,0.3),#fff); }

                /* Compare */
                .compare-col { border-radius: 20px; padding: 1.75rem; }
                .compare-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px 0; border-bottom: 1px solid rgba(0,0,0,0.05); font-size: 0.875rem; }
                .compare-item:last-child { border-bottom: none; }

                /* Matrix table */
                .matrix-table { width: 100%; border-collapse: collapse; }
                .matrix-table th, .matrix-table td { padding: 12px 16px; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.05); }
                .matrix-table th:first-child, .matrix-table td:first-child { text-align: left; }
                .matrix-table thead th { font-size: 12px; font-weight: 700; letter-spacing: 0.05em; padding-bottom: 16px; }
                .matrix-table tbody tr:hover { background: rgba(0,0,0,0.015); }
                @media (max-width: 640px) {
                    .matrix-table th, .matrix-table td { padding: 10px 6px; font-size: 11px; }
                    .matrix-table th:first-child, .matrix-table td:first-child { font-size: 11.5px; }
                }
                @media (max-width: 400px) {
                    .matrix-table th, .matrix-table td { padding: 8px 4px; font-size: 10px; }
                }

                /* Why Founders Choose comparison table */
                .compare-table { width: 100%; border-collapse: collapse; }
                .compare-table th, .compare-table td { padding: 14px 16px; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.06); }
                .compare-table thead tr { background: #000; }
                .compare-table tbody tr:last-child td { border-bottom: none; }
                @media (max-width: 640px) {
                    .compare-table th, .compare-table td { padding: 10px 8px; font-size: 12px; }
                }

                /* ROI */
                .roi-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1rem; }
                @media (max-width: 900px) { .roi-grid { grid-template-columns: repeat(2,1fr); } }
                @media (max-width: 480px) { .roi-grid { grid-template-columns: 1fr; } }

                /* Testimonials */
                .testimonial-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
                @media (max-width: 900px) { .testimonial-grid { grid-template-columns: 1fr; } }
                .proof-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 1.5rem; }
                @media (max-width: 768px) { .proof-grid { grid-template-columns: 1fr; } }

                /* FAQ */
                .faq-item { border: 1px solid rgba(0,0,0,0.08); border-radius: 14px; overflow: hidden; transition: border-color 0.2s; }
                .faq-item.open { border-color: #D97706; }
                .faq-q { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 18px 20px; background: transparent; border: none; cursor: pointer; text-align: left; gap: 12px; }
                .faq-a { padding: 0 20px 18px; font-size: 0.875rem; color: #52525b; line-height: 1.65; }

                /* Step bar */
                @keyframes stepBar { from { width: 0; } to { width: 100%; } }
                .step-bar { animation: stepBar 2.8s linear forwards; height: 100%; background: #D97706; border-radius: 2px; }

                /* Instead strip */
                .instead-strip { background: linear-gradient(135deg,#000,#1a1a1a); padding: 2rem 1.5rem; margin: 2.5rem 0; border-radius: 24px; border: 1px solid rgba(217,119,6,0.2); }
                .instead-grid { display: grid; grid-template-columns: 1fr auto 1fr; gap: 2rem; align-items: center; }
                @media (max-width: 768px) { .instead-grid { grid-template-columns: 1fr; gap: 1.25rem; } }
                .instead-divider { display: flex; flex-direction: column; align-items: center; gap: 6px; }
                @media (max-width: 768px) { .instead-divider { flex-direction: row; justify-content: center; } }
                .instead-col { display: flex; flex-direction: column; gap: 10px; }
                .instead-item { display: flex; align-items: center; gap: 8px; font-size: 0.82rem; }

                /* Trust */
                .responsive-trust { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
                @media (max-width: 768px) { .responsive-trust { grid-template-columns: 1fr; } }
                .responsive-hero { display: grid; grid-template-columns: 1fr 380px; gap: 2rem; align-items: center; }
                @media (max-width: 900px) { .responsive-hero { grid-template-columns: 1fr; } }

                /* Plan expand - overlay so it doesn't affect sibling card heights via grid stretch */
               /* Plan expand - simple in-flow expand, works on all screen sizes */
               .plan-expand {
                 transition: max-height 0.4s ease, padding 0.3s ease;
                    max-height: 0;
            }
// .plan-expand.is-open {
//     max-height: 2000px;
//     overflow: visible;
// }

                /* Risk card */
                .risk-card { transition: transform 0.2s, border-left-color 0.2s; }
                .risk-card:hover { transform: translateX(4px); border-left-color: #D97706; }

                /* Gold text */
                .gold-text { color: #D97706; font-style: italic; }
                .hero-headline { font-family: 'Cormorant Garamond', serif; font-weight: 700; letter-spacing: -0.02em; }

                /* CTA buttons */
                .btn-primary { display: inline-flex; align-items: center; gap: 8px; padding: 0.75rem 1.5rem; background: #000; color: #fff; border-radius: 40px; font-size: 0.875rem; font-weight: 600; text-decoration: none; transition: opacity 0.2s, transform 0.2s; border: none; cursor: pointer; }
                .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
                .btn-secondary { display: inline-flex; align-items: center; gap: 8px; padding: 0.75rem 1.5rem; background: #fff; color: #000; border-radius: 40px; font-size: 0.875rem; font-weight: 600; text-decoration: none; border: 1px solid rgba(0,0,0,0.18); transition: background 0.2s; }
                .btn-secondary:hover { background: #f4f4f5; }
                .btn-amber { display: inline-flex; align-items: center; gap: 8px; padding: 0.75rem 1.75rem; background: #D97706; color: #000; border-radius: 40px; font-size: 0.8125rem; font-weight: 700; text-decoration: none; transition: opacity 0.2s; }
                .btn-amber:hover { opacity: 0.9; }

                /* View Details toggle */
                .view-details-btn { display: flex; align-items: center; justify-content: center; gap: 6px; width: 100%; padding: 10px 0; background: transparent; border: 1px dashed; border-radius: 12px; font-size: 0.78rem; font-weight: 600; cursor: pointer; transition: background 0.2s; }
                .view-details-btn:hover { background: rgba(217,119,6,0.06); }

                /* Existing advisors strip */
                .advisors-strip { display: flex; align-items: center; gap: 14px; padding: 1rem 1.5rem; border-radius: 16px; background: #fafafa; border: 1px solid rgba(0,0,0,0.07); margin-bottom: 2rem; flex-wrap: wrap; }
                @media (max-width: 600px) { .advisors-strip { flex-direction: column; text-align: center; align-items: center; } }

                @media (prefers-reduced-motion: reduce) {
                    *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
                }
            `}</style>

            <div className="min-h-screen bg-white" style={{ color: '#0a0a0a', overflowX: 'hidden' }}>

                {/* ══ NAV ══════════════════════════════════════════════════════ */}
                <nav style={{
                    position: 'sticky', top: 0, zIndex: 50,
                    background: scrolled ? 'rgba(255,255,255,0.96)' : '#fff',
                    backdropFilter: 'blur(20px)',
                    borderBottom: `1px solid ${scrolled ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.06)'}`,
                    transition: 'all 0.3s ease',
                }}>
                    <div className="nm-container">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
                            <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
                                <div style={{ width: 34, height: 34, background: '#000', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Scale style={{ width: 16, height: 16, color: '#D97706' }} />
                                </div>
                                <span style={{ fontSize: 18, fontWeight: 700, color: '#000', letterSpacing: '-0.01em' }}>NyayMitra</span>
                                <span style={{ fontSize: 9, fontWeight: 700, color: '#D97706', background: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: 4, padding: '1px 6px', letterSpacing: '0.08em' }}>PRO</span>
                            </a>
                            <div style={{ alignItems: 'center', gap: 4 }} className="nm-hide-mobile">
                                {navLinks.map(link => (
                                    <a key={link.label} href={link.href}
                                        style={{ padding: '8px 14px', fontSize: 13, fontWeight: 500, color: '#52525b', textDecoration: 'none', borderRadius: 8, transition: 'color 0.2s, background 0.2s', whiteSpace: 'nowrap' }}
                                        onMouseEnter={e => { e.currentTarget.style.color = '#000'; e.currentTarget.style.background = 'rgba(0,0,0,0.04)' }}
                                        onMouseLeave={e => { e.currentTarget.style.color = '#52525b'; e.currentTarget.style.background = 'transparent' }}>
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <div className="nm-hide-mobile" style={{ display: 'flex', gap: 6 }}>
                                    <a href="https://www.instagram.com/nyaymitra.tech" target="_blank" rel="noopener noreferrer" style={{ padding: 6, borderRadius: '50%', color: '#a1a1aa', textDecoration: 'none', display: 'flex', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#000'} onMouseLeave={e => e.currentTarget.style.color = '#a1a1aa'}><Instagram style={{ width: 16, height: 16 }} /></a>
                                    <a href="https://www.linkedin.com/company/nyaymitra-tech-pvt-ltd" target="_blank" rel="noopener noreferrer" style={{ padding: 6, borderRadius: '50%', color: '#a1a1aa', textDecoration: 'none', display: 'flex', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#000'} onMouseLeave={e => e.currentTarget.style.color = '#a1a1aa'}><Linkedin style={{ width: 16, height: 16 }} /></a>
                                </div>
                                <button onClick={() => setIsMenuOpen(v => !v)} style={{ padding: 8, background: 'rgba(0,0,0,0.05)', border: 'none', borderRadius: 8, cursor: 'pointer' }} className="nm-show-mobile">
                                    {isMenuOpen ? <X style={{ width: 18, height: 18 }} /> : <Menu style={{ width: 18, height: 18 }} />}
                                </button>
                            </div>
                        </div>
                    </div>
                    {isMenuOpen && (
                        <div style={{ borderTop: '1px solid rgba(0,0,0,0.07)', padding: '20px 16px', background: '#fff' }}>
                            {navLinks.map(link => (
                                <a key={link.label} href={link.href} onClick={() => setIsMenuOpen(false)} style={{ display: 'block', padding: '12px 16px', fontSize: 15, fontWeight: 500, color: '#3f3f46', textDecoration: 'none', borderRadius: 8 }}>{link.label}</a>
                            ))}
                        </div>
                    )}
                </nav>

                {/* ══ HERO ═════════════════════════════════════════════════════ */}
                <section ref={heroRef} style={{ position: 'relative', overflow: 'hidden', padding: '3.5rem 1.5rem 4rem', background: '#fff' }}>
                    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(0,0,0,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.025) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
                    <div style={{ position: 'absolute', top: -60, right: -60, width: 360, height: 360, background: 'radial-gradient(circle, rgba(217,119,6,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

                    <div className="nm-container" style={{ position: 'relative' }}>
                        <div className="responsive-hero">
                            {/* Left */}
                            <div>
                                <div className="anim-1" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px 4px 8px', borderRadius: 999, background: '#FEF3C7', border: '1px solid #D97706' }}>
                                        <span className="amber-pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: '#D97706', flexShrink: 0 }} />
                                        <span style={{ fontSize: 9, fontWeight: 700, color: '#92400E', letterSpacing: '0.12em' }}>{t.heroBadge}</span>
                                    </div>
                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 999, background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)' }}>
                                        <span style={{ fontSize: 9, fontWeight: 600, color: '#71717a', letterSpacing: '0.1em' }}>{t.startupsProtected}</span>
                                    </div>
                                </div>

                                <h1 className="hero-headline anim-2" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, lineHeight: 1.15, color: '#000', marginBottom: 16 }}>
                                    {t.heroHeadline}<br />
                                    <span className="gold-text">{t.heroHeadlineGold}</span>
                                </h1>

                                <p className="anim-3" style={{ fontSize: 'clamp(0.875rem, 3vw, 1rem)', color: '#52525b', lineHeight: 1.65, maxWidth: 500, marginBottom: 20 }}>
                                    {t.heroDesc}{" "}
                                    <strong style={{ color: '#D97706' }}>{t.heroPrice}.</strong>
                                </p>

                                <p className="anim-3" style={{ fontSize: '0.875rem', color: '#52525b', lineHeight: 1.65, marginBottom: 20 }}>
                                    {t.heroNewDesc}
                                </p>

                                {/* Trust statement */}
                                <div className="anim-3" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 10, background: '#F0FDF4', border: '1px solid #86EFAC', marginBottom: 24 }}>
                                    <Check style={{ width: 14, height: 14, color: '#16a34a', flexShrink: 0 }} />
                                    <span style={{ fontSize: '0.8rem', color: '#166534', fontWeight: 500 }}>{t.heroTrust}</span>
                                </div>

                                {/* Benefits */}
                                <div className="anim-3" style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
                                    {[t.bullet1, t.bullet2, t.bullet3].map(text => (
                                        <span key={text} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8125rem', color: '#27272a', fontWeight: 500 }}>
                                            <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#000', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                <Check style={{ width: 9, height: 9, color: '#D97706' }} />
                                            </span>
                                            {text}
                                        </span>
                                    ))}
                                </div>

                                {/* Mini badges */}
                                <div className="anim-3" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                                    {["✓ Works with your existing CA", "✓ Works with your existing lawyer", "✓ WhatsApp first coordination", "✓ Multi state execution support"].map(badge => (
                                        <span key={badge} style={{ fontSize: '0.7rem', padding: '4px 10px', background: '#f4f4f5', borderRadius: 99, color: '#3f3f46' }}>{badge}</span>
                                    ))}
                                </div>

                                <div className="anim-4" style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                                    <a href={waGeneral} target="_blank" rel="noopener noreferrer" className="btn-primary">
                                        <WaSvg size={16} /> {t.ctaWhatsapp}
                                    </a>
                                    <a href="#pricing" className="btn-secondary">
                                        {t.ctaPlans} <ChevronRight style={{ width: 14, height: 14 }} />
                                    </a>
                                </div>
                            </div>

                            {/* Right card */}
                            <div className="nm-hide-mobile" style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', inset: -12, borderRadius: 28, background: 'linear-gradient(135deg, #FEF3C7 0%, #fff 60%)', border: '1px solid rgba(0,0,0,0.06)' }} />
                                <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)', background: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
                                    <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(0,0,0,0.07)', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', gap: 4 }}>
                                            {['#e5e5e5', '#e5e5e5', '#000'].map((c, i) => <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />)}
                                        </div>
                                        <span style={{ fontSize: 9, fontWeight: 600, color: '#D97706', letterSpacing: '0.1em' }}>{t.fromConfusion}</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                            <div className="amber-pulse" style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981' }} />
                                            <span style={{ fontSize: 9, color: '#10b981', fontWeight: 600 }}>LIVE</span>
                                        </div>
                                    </div>
                                    <div style={{ padding: '16px 18px' }}>
                                        {steps.map((step, i) => (
                                            <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 10px', borderRadius: 12, marginBottom: 2, background: activeStep === i ? 'rgba(0,0,0,0.02)' : 'transparent', transition: 'background 0.4s' }}>
                                                <div style={{ width: 34, height: 34, borderRadius: 10, flexShrink: 0, border: activeStep === i ? '1.5px solid #D97706' : '1px solid rgba(0,0,0,0.1)', background: activeStep === i ? '#FEF3C7' : '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeStep === i ? '#D97706' : '#71717a' }}>
                                                    {step.icon}
                                                </div>
                                                <div style={{ paddingTop: 2, flex: 1 }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                                                        <span style={{ fontSize: 8, color: '#a1a1aa', fontWeight: 600, fontFamily: 'monospace' }}>{step.number}</span>
                                                        <span style={{ fontSize: 12, fontWeight: 600, color: '#0a0a0a' }}>{step.title}</span>
                                                    </div>
                                                    <p style={{ fontSize: 10.5, color: '#71717a', lineHeight: 1.4 }}>{step.description}</p>
                                                    {activeStep === i && (
                                                        <div style={{ marginTop: 6, height: 2, background: '#f0f0f0', borderRadius: 2, overflow: 'hidden' }}>
                                                            <div className="step-bar" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ padding: '10px 18px', borderTop: '1px solid rgba(0,0,0,0.06)', background: '#fafafa', display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <Bot style={{ width: 11, height: 11, color: '#D97706' }} />
                                        <span style={{ fontSize: 10, color: '#71717a' }}>{t.aiPowered}</span>
                                    </div>
                                </div>
                                <div style={{ position: 'absolute', bottom: -12, left: -12, background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 12, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 6px 16px rgba(0,0,0,0.06)' }}>
                                    <div style={{ width: 28, height: 28, borderRadius: 8, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Gavel style={{ width: 12, height: 12, color: '#D97706' }} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 11, fontWeight: 600, color: '#000' }}>{t.verifiedLawyers}</div>
                                        <div style={{ fontSize: 9, color: '#a1a1aa' }}>{t.avgResponse}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══ WHO IS THIS FOR SECTION ════════════════════════════════════ */}
                <section className="nm-section" style={{ background: '#fff' }}>
                    <div className="nm-container">
                        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem,6vw,3.5rem)' }}>
                            <span className="brand-line">{t.whoHeading}</span>
                            <h2 style={{ fontSize: 'clamp(1.5rem,4vw,2.25rem)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 12 }}>{t.whoHeading}</h2>
                            <p style={{ fontSize: '0.9rem', color: '#71717a', maxWidth: 500, margin: '0 auto' }}>{t.whoSub}</p>
                        </div>
                        <div className="nm-grid-3">
                            {whoCards.map((card, idx) => (
                                <div key={idx} style={{ borderRadius: 20, padding: '2rem', border: '1px solid rgba(0,0,0,0.08)', background: '#fff', transition: 'transform 0.2s, border-color 0.2s' }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#D97706' }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)' }}>
                                    <div style={{ width: 48, height: 48, borderRadius: 12, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, color: '#D97706' }}>
                                        {card.icon}
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0a0a0a', marginBottom: 16 }}>{card.title}</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                        {card.items.map((item, ii) => (
                                            <div key={ii} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                <div style={{ width: 20, height: 20, borderRadius: 10, background: 'rgba(217,119,6,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Check style={{ width: 10, height: 10, color: '#D97706' }} />
                                                </div>
                                                <span style={{ fontSize: '0.875rem', color: '#52525b' }}>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══ MARQUEE ══════════════════════════════════════════════════ */}
                <div style={{ background: '#000', padding: '0.6rem 0', overflow: 'hidden' }}>
                    <div className="marquee-track">
                        {[...Array(2)].map((_, j) => (
                            <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '2rem', paddingRight: '2rem', whiteSpace: 'nowrap' }}>
                                {["Legal Operations", "Contract Management", "Compliance Tracking", "Document Workflows", "Startup Legal Ops", "Fractional Legal Team", "Founder Protection", "MSME Support", "outsourced legal team india", "startup compliance partner india"].map(item => (
                                    <span key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{ fontSize: '0.625rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em' }}>{item}</span>
                                        <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#D97706', flexShrink: 0 }} />
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ══ FOUNDER PAIN SECTION ═════════════════════════════════════ */}
                <section className="nm-section" style={{ background: '#000', color: '#fff', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', top: -80, left: -80, width: 400, height: 400, background: 'radial-gradient(circle, rgba(217,119,6,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />
                    <div className="nm-container" style={{ position: 'relative' }}>
                        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
                            <span className="brand-line" style={{ color: '#D97706', display: 'block', marginBottom: 12 }}>{t.painBadge}</span>
                            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.75rem, 5vw, 3rem)', fontWeight: 700, lineHeight: 1.15, color: '#fff', marginBottom: 16 }}>
                                {t.painHeadline}<br />
                                <span className="gold-text">{t.painHeadlineGold}</span>
                            </h2>
                            <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.55)', marginBottom: 32, lineHeight: 1.6 }}>{t.painDesc}</p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36, textAlign: 'left' }}>
                                {t.painItems.map((item, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                        <div style={{ width: 24, height: 24, borderRadius: 6, background: 'rgba(217,119,6,0.15)', border: '1px solid rgba(217,119,6,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <XCircle style={{ width: 12, height: 12, color: '#D97706' }} />
                                        </div>
                                        <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)' }}>{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div style={{ display: 'inline-block', padding: '14px 24px', borderRadius: 14, background: 'rgba(217,119,6,0.1)', border: '1px solid rgba(217,119,6,0.25)' }}>
                                <p style={{ fontSize: '0.9375rem', color: '#FCD34D', fontWeight: 600, lineHeight: 1.5 }}>{t.painClose}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══ RISK SECTION ═════════════════════════════════════════════ */}
                <section className="nm-section" style={{ background: '#fafafa' }}>
                    <div className="nm-container">
                        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem,6vw,4rem)' }}>
                            <span className="brand-line">{t.realCost}</span>
                            <h2 style={{ fontSize: 'clamp(1.5rem,4vw,2.5rem)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 12 }}>{t.riskHeading}</h2>
                            <p style={{ fontSize: '0.9375rem', color: '#71717a', maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>{t.riskSub}</p>
                        </div>
                        <div className="nm-grid-3">
                            {risks.map((risk, idx) => (
                                <div key={idx} className="risk-card" style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 20, padding: 'clamp(1.25rem,4vw,1.75rem)', borderLeft: '3px solid rgba(0,0,0,0.1)' }}>
                                    <div style={{ width: 40, height: 40, borderRadius: 12, background: '#FEF3C7', border: '1px solid #FCD34D', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706', marginBottom: 16 }}>{risk.icon}</div>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#0a0a0a', marginBottom: 6, lineHeight: 1.4 }}>{risk.title}</h3>
                                    <p style={{ fontSize: '0.8125rem', color: '#D97706', fontWeight: 600, marginBottom: 8 }}>{risk.consequence}</p>
                                    <p style={{ fontSize: '0.75rem', color: '#71717a', lineHeight: 1.6 }}>{risk.outcome}</p>
                                </div>
                            ))}
                        </div>
                        <div style={{ textAlign: 'center', marginTop: 'clamp(1.5rem,4vw,2.5rem)' }}>
                            <a href={waGeneral} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ margin: '0 auto' }}>
                                Fix it before it becomes expensive <ArrowRight style={{ width: 12, height: 12 }} />
                            </a>
                        </div>
                    </div>
                </section>

                {/* ══ WHY NYAYMITRA ════════════════════════════════════════════ */}
                <section className="nm-section" style={{ background: '#fff' }}>
                    <div className="nm-container">
                        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem,6vw,3.5rem)' }}>
                            <span className="brand-line">{t.whyBadge}</span>
                            <h2 style={{ fontSize: 'clamp(1.5rem,4vw,2.25rem)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 12 }}>{t.whyHeadline}</h2>
                            <p style={{ fontSize: '0.9rem', color: '#71717a', maxWidth: 500, margin: '0 auto' }}>{t.whySub}</p>
                        </div>

                        {/* 3-column comparison - FULLY RESPONSIVE */}
                        <div className="nm-grid-3" style={{ gap: '1.25rem' }}>
                            {[
                                {
                                    label: "Law Firms",
                                    dark: false,
                                    icon: <Briefcase style={{ width: 16, height: 16, color: '#ef4444' }} />,
                                    items: [
                                        ["Expensive retainers", false],
                                        ["Reactive support", false],
                                        ["No compliance ownership", false],
                                        ["You manage execution", false],
                                    ],
                                },
                                {
                                    label: "Compliance Platforms",
                                    dark: false,
                                    icon: <Bot style={{ width: 16, height: 16, color: '#f59e0b' }} />,
                                    items: [
                                        ["Ticket systems", false],
                                        ["Generic execution", false],
                                        ["No founder context", false],
                                        ["No dedicated coordinator", false],
                                    ],
                                },
                                {
                                    label: "NyayMitra",
                                    dark: true,
                                    icon: <Scale style={{ width: 16, height: 16, color: '#D97706' }} />,
                                    items: [
                                        ["One accountable team", true],
                                        ["Founder first execution", true],
                                        ["WhatsApp support", true],
                                        ["Multi city coordination", true],
                                        ["Works with existing advisors", true],
                                        ["End to end ownership", true],
                                    ],
                                },
                            ].map((col, ci) => (
                                <div key={ci} style={{
                                    borderRadius: 20,
                                    padding: '1.75rem',
                                    background: col.dark ? '#000' : '#fafafa',
                                    border: col.dark ? '2px solid rgba(217,119,6,0.3)' : '1px solid rgba(0,0,0,0.07)',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                                        <div style={{ width: 32, height: 32, borderRadius: 8, background: col.dark ? 'rgba(217,119,6,0.15)' : 'rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {col.icon}
                                        </div>
                                        <span style={{ fontSize: '0.875rem', fontWeight: 700, color: col.dark ? '#fff' : '#0a0a0a' }}>{col.label}</span>
                                    </div>
                                    {col.items.map(([item, good], ii) => (
                                        <div key={ii} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '9px 0', borderBottom: `1px solid ${col.dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}` }}>
                                            {good
                                                ? <Check style={{ width: 14, height: 14, color: '#D97706', flexShrink: 0, marginTop: 2 }} />
                                                : <XCircle style={{ width: 14, height: 14, color: '#ef4444', flexShrink: 0, marginTop: 2 }} />
                                            }
                                            <span style={{ fontSize: '0.82rem', color: col.dark ? 'rgba(255,255,255,0.8)' : '#71717a', lineHeight: 1.5 }}>{item as string}</span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══ ROI SECTION ══════════════════════════════════════════════ */}
                <section className="nm-section" style={{ background: '#fafafa' }}>
                    <div className="nm-container">
                        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem,6vw,3.5rem)' }}>
                            <span className="brand-line">{t.roiBadge}</span>
                            <h2 style={{ fontSize: 'clamp(1.5rem,4vw,2.25rem)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 12 }}>{t.roiHeadline}</h2>
                            <p style={{ fontSize: '0.9rem', color: '#71717a', maxWidth: 480, margin: '0 auto' }}>{t.roiSub}</p>
                        </div>

                        <div className="roi-grid">
                            {roiCards.map((item, i) => (
                                <div key={i} style={{ borderRadius: 20, padding: '1.5rem', border: item.highlight ? '2px solid #D97706' : '1px solid rgba(0,0,0,0.08)', background: item.highlight ? '#000' : '#fff', position: 'relative', overflow: 'hidden' }}>
                                    {item.highlight && <div style={{ position: 'absolute', top: 0, right: 0, background: '#D97706', fontSize: 9, fontWeight: 700, color: '#000', padding: '4px 10px', borderBottomLeftRadius: 10, letterSpacing: '0.08em' }}>YOU BUILD. WE HANDLE.</div>}
                                    <p style={{ fontSize: '0.75rem', fontWeight: 600, color: item.highlight ? '#a1a1aa' : '#71717a', marginBottom: 8 }}>{item.label}</p>
                                    <p style={{ fontSize: 'clamp(1rem,3vw,1.3rem)', fontWeight: 700, color: item.highlight ? '#D97706' : '#ef4444', marginBottom: 6, lineHeight: 1.2 }}>{item.price}</p>
                                    <p style={{ fontSize: '0.75rem', color: item.highlight ? 'rgba(255,255,255,0.45)' : '#a1a1aa', lineHeight: 1.5 }}>{item.sub}</p>
                                </div>
                            ))}
                        </div>

                        <div style={{ textAlign: 'center', marginTop: 32 }}>
                            <p style={{ fontSize: '1rem', fontWeight: 600, color: '#0a0a0a' }}>{t.roiFooter}</p>
                        </div>
                    </div>
                </section>

                {/* ══ WHY FOUNDERS CHOOSE NYAYMITRA (COMPARISON TABLE) ═════════ */}
                <section className="nm-section" style={{ background: '#fff' }}>
                    <div className="nm-container">
                        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem,6vw,3rem)' }}>
                            <span className="brand-line">COMPARISON</span>
                            <h2 style={{ fontSize: 'clamp(1.5rem,4vw,2.25rem)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 12 }}>Why Founders Choose NyayMitra</h2>
                            <p style={{ fontSize: '0.9rem', color: '#71717a', maxWidth: 520, margin: '0 auto', lineHeight: 1.6 }}>Most founders already know a CA or lawyer. The real challenge is managing everything.</p>
                        </div>

                        <div style={{ maxWidth: 720, margin: '0 auto', borderRadius: 20, border: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden', background: '#fafafa' }}>
                            <table className="compare-table">
                                <thead>
                                    <tr>
                                        <th style={{ width: '50%' }}>
                                            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'rgba(255,255,255,0.5)' }}>Others</span>
                                        </th>
                                        <th style={{ width: '50%' }}>
                                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', fontWeight: 700, color: '#D97706' }}>
                                                <Scale style={{ width: 14, height: 14 }} /> NyayMitra
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {whyChooseRows.map((row, ri) => (
                                        <tr key={ri} style={{ background: ri % 2 === 0 ? '#fff' : '#fafafa' }}>
                                            <td>
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: '#71717a' }}>
                                                    <XCircle style={{ width: 14, height: 14, color: '#d4d4d8', flexShrink: 0 }} />
                                                    {row.others}
                                                </span>
                                            </td>
                                            <td style={{ background: 'rgba(217,119,6,0.04)' }}>
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', fontWeight: 600, color: '#0a0a0a' }}>
                                                    <Check style={{ width: 14, height: 14, color: '#D97706', flexShrink: 0 }} />
                                                    {row.nyay}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* ══ PRICING ══════════════════════════════════════════════════ */}
                <section id="pricing" className="nm-section" style={{ background: '#fff' }}>
                    <div className="nm-container">
                        <div style={{ textAlign: 'center', marginBottom: 'clamp(1.5rem,5vw,2.5rem)' }}>
                            <span className="brand-line">{t.pricing}</span>
                            <h2 style={{ fontSize: 'clamp(1.75rem,5vw,2.5rem)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 12 }}>{t.pricingHeading}</h2>
                            <p style={{ fontSize: '0.9rem', color: '#71717a', maxWidth: 500, margin: '0 auto 24px', lineHeight: 1.6 }}>{t.pricingSub}</p>
                            {/* Toggle */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                                <span style={{ fontSize: '0.875rem', fontWeight: isYearly ? 400 : 600, color: isYearly ? '#71717a' : '#0a0a0a' }}>Monthly</span>
                                <button onClick={() => setIsYearly(v => !v)} aria-label="Toggle yearly billing" style={{ width: 48, height: 26, borderRadius: 999, border: 'none', cursor: 'pointer', background: isYearly ? '#D97706' : 'rgba(0,0,0,0.12)', position: 'relative', transition: 'background 0.25s' }}>
                                    <span style={{ position: 'absolute', top: 3, left: isYearly ? 25 : 3, width: 20, height: 20, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.25s cubic-bezier(0.4,0,0.2,1)' }} />
                                </button>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <span style={{ fontSize: '0.875rem', fontWeight: isYearly ? 600 : 400, color: isYearly ? '#0a0a0a' : '#71717a' }}>Yearly</span>
                                    <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', background: '#D97706', padding: '2px 8px', borderRadius: 999, letterSpacing: '0.06em' }}>SAVE 20%</span>
                                </span>
                            </div>
                        </div>

                        {/* Existing Advisors Trust Strip */}
                        <div className="advisors-strip">
                            <div style={{ width: 40, height: 40, borderRadius: 12, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#D97706' }}>
                                <Handshake style={{ width: 18, height: 18 }} />
                            </div>
                            <div>
                                <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0a0a0a', marginBottom: 2 }}>{t.existingAdvisorsTitle}</p>
                                <p style={{ fontSize: '0.8rem', color: '#71717a', lineHeight: 1.5 }}>{t.existingAdvisorsDesc}</p>
                            </div>
                        </div>

                        {/* Plan cards */}
                        <div className="plan-grid">
                            {plans.map(plan => {
                                const isExpanded = expandedPlan === plan.id
                                return (
                                    <div key={plan.id}
                                        className={`plan-card ${plan.popular ? 'popular' : ''}`}
                                        style={{ position: 'relative', border: plan.popular ? '2px solid #000' : '1px solid rgba(0,0,0,0.1)', background: plan.popular ? '#000' : '#fff', padding: plan.popular ? '2rem 1.75rem' : '1.75rem', overflow: 'visible' }}
                                        onMouseEnter={() => setHoveredPlan(plan.id)} onMouseLeave={() => setHoveredPlan(null)}
                                    >
                                        {plan.badge && (
                                            <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)' }}>
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 14px', background: '#D97706', color: '#fff', fontSize: 10, fontWeight: 700, borderRadius: 999, letterSpacing: '0.1em', boxShadow: '0 4px 12px rgba(217,119,6,0.35)', whiteSpace: 'nowrap' }}>
                                                    <Zap style={{ width: 10, height: 10 }} /> {plan.badge}
                                                </span>
                                            </div>
                                        )}

                                        {/* Header */}
                                        <div style={{ marginBottom: 16, paddingBottom: 16, borderBottom: `1px solid ${plan.popular ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}` }}>
                                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px 4px 8px', borderRadius: 999, background: plan.popular ? 'rgba(217,119,6,0.15)' : 'rgba(217,119,6,0.08)', border: `1px solid ${plan.popular ? 'rgba(252,211,77,0.2)' : 'rgba(217,119,6,0.2)'}`, marginBottom: 12 }}>
                                                <span style={{ fontSize: 9, fontWeight: 600, color: plan.popular ? '#FCD34D' : '#D97706', letterSpacing: '0.08em' }}>{plan.positioningLabel}</span>
                                            </div>
                                            <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: plan.popular ? '#fff' : '#0a0a0a', letterSpacing: '-0.02em', marginBottom: 6 }}>{plan.name}</h3>
                                            <p style={{ fontSize: '0.78rem', color: plan.popular ? 'rgba(255,255,255,0.55)' : '#71717a', lineHeight: 1.5 }}>{plan.tagline}</p>
                                        </div>

                                        {/* Best For */}
                                        <div style={{ marginBottom: 14, padding: '10px 12px', borderRadius: 10, background: plan.popular ? 'rgba(255,255,255,0.05)' : '#fafafa', border: `1px solid ${plan.popular ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}` }}>
                                            <p style={{ fontSize: 9, fontWeight: 700, color: plan.popular ? '#D97706' : '#a1a1aa', letterSpacing: '0.12em', marginBottom: 4 }}>BEST FOR</p>
                                            <p style={{ fontSize: '0.78rem', color: plan.popular ? 'rgba(255,255,255,0.7)' : '#52525b', lineHeight: 1.5 }}>{plan.bestFor}</p>
                                        </div>

                                        {/* Outcomes */}
                                        <div style={{ marginBottom: 18 }}>
                                            <p style={{ fontSize: 9, fontWeight: 700, color: plan.popular ? '#D97706' : '#a1a1aa', letterSpacing: '0.12em', marginBottom: 8 }}>EXPECTED OUTCOMES</p>
                                            {plan.outcomes.map((o, oi) => (
                                                <div key={oi} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
                                                    <div style={{ width: 16, height: 16, borderRadius: '50%', flexShrink: 0, background: plan.popular ? 'rgba(217,119,6,0.2)' : '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Check style={{ width: 8, height: 8, color: '#D97706' }} />
                                                    </div>
                                                    <span style={{ fontSize: '0.78rem', color: plan.popular ? 'rgba(255,255,255,0.75)' : '#52525b' }}>{o}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Spacer pushes Price/CTA/footer to bottom uniformly across cards */}
                                        <div style={{ marginTop: 'auto' }} />

                                        {/* Price */}
                                        <div style={{ marginBottom: 16, minHeight: 72 }}>
                                            {plan.priceDisplay ? (
                                                <div style={{ marginBottom: 4 }}>
                                                    <span style={{ fontSize: '2.5rem', fontWeight: 700, color: plan.popular ? '#fff' : '#0a0a0a', letterSpacing: '-0.03em', lineHeight: 1 }}>
                                                        {plan.priceDisplay}
                                                    </span>
                                                    <span style={{ fontSize: '0.75rem', color: plan.popular ? 'rgba(255,255,255,0.4)' : '#a1a1aa', marginLeft: 6 }}>/ month</span>
                                                </div>
                                            ) : (
                                                <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 4 }}>
                                                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: plan.popular ? 'rgba(255,255,255,0.6)' : '#71717a' }}>₹</span>
                                                    <span style={{ fontSize: '2.5rem', fontWeight: 700, color: plan.popular ? '#fff' : '#0a0a0a', letterSpacing: '-0.03em', lineHeight: 1 }}>
                                                        {(isYearly ? plan.yearlyPrice : plan.price).toLocaleString()}
                                                    </span>
                                                    <span style={{ fontSize: '0.75rem', color: plan.popular ? 'rgba(255,255,255,0.4)' : '#a1a1aa', marginLeft: 6 }}>/ month</span>
                                                </div>
                                            )}
                                            <p style={{ fontSize: 11, color: plan.popular ? 'rgba(255,255,255,0.45)' : '#71717a', minHeight: 16 }}>
                                                {plan.id === "fractional"
                                                    ? plan.billingNote
                                                    : isYearly
                                                        ? `Billed ₹${(plan.yearlyPrice * 12).toLocaleString()}/year · Cancel anytime`
                                                        : `${plan.billingNote} Cancel anytime`}
                                            </p>
                                        </div>

                                        {/* Trust badge */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, minHeight: 32 }}>
                                            <Clock style={{ width: 12, height: 12, color: '#D97706', flexShrink: 0 }} />
                                            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: plan.popular ? 'rgba(255,255,255,0.65)' : '#52525b', lineHeight: 1.5 }}>{plan.trustBadge}</span>
                                        </div>

                                        {/* Premium Note - reserved height for alignment even when absent */}
                                        <div style={{ minHeight: plan.premiumNote ? undefined : 0, marginBottom: plan.premiumNote ? 12 : 0 }}>
                                            {plan.premiumNote && (
                                                <p style={{ fontSize: '0.72rem', color: plan.popular ? '#FCD34D' : '#92400E', fontStyle: 'italic', lineHeight: 1.5 }}>
                                                    {plan.premiumNote}
                                                </p>
                                            )}
                                        </div>

                                        {/* CTA */}
                                        <a href={plan.whatsapp} target="_blank" rel="noopener noreferrer"
                                            style={{ display: 'block', width: '100%', padding: '12px 0', textAlign: 'center', fontSize: '0.875rem', fontWeight: 600, borderRadius: 40, textDecoration: 'none', marginBottom: 14, background: plan.popular ? '#D97706' : '#000', color: plan.popular ? '#000' : '#fff', transition: 'opacity 0.2s' }}>
                                            {plan.cta}
                                        </a>

                                        {/* View Details toggle */}
                                        <button
                                            onClick={() => setExpandedPlan(isExpanded ? null : plan.id)}
                                            className="view-details-btn"
                                            style={{
                                                color: plan.popular ? '#D97706' : '#D97706',
                                                borderColor: plan.popular ? 'rgba(217,119,6,0.4)' : 'rgba(217,119,6,0.35)',
                                                marginBottom: isExpanded ? 16 : 0,
                                            }}
                                            aria-expanded={isExpanded}
                                        >
                                            {isExpanded ? "Hide Details" : "View Details"}
                                            <ChevronDown style={{ width: 14, height: 14, transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                                        </button>

                                        {/* Expandable section */}
                                        <div
                                            className={`plan-expand ${isExpanded ? 'is-open' : ''}`}
                                            style={{
                                                maxHeight: isExpanded ? 2000 : 0,
                                                overflow: 'hidden',
                                                padding: isExpanded ? (plan.popular ? '0 0 1rem' : '0 0 0.75rem') : undefined,
                                            }}
                                        >
                                            <div style={{ paddingTop: 4 }}>
                                                {/* Problems We Solve */}
                                                <div style={{ marginBottom: 18 }}>
                                                    <p style={{ fontSize: 9, fontWeight: 700, color: plan.popular ? '#D97706' : '#a1a1aa', letterSpacing: '0.12em', marginBottom: 8 }}>PROBLEMS WE SOLVE</p>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                                        {plan.problems.map((p, pi) => (
                                                            <div key={pi} style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
                                                                <Check style={{ width: 12, height: 12, color: '#D97706', flexShrink: 0, marginTop: 2 }} />
                                                                <span style={{ fontSize: '0.76rem', color: plan.popular ? 'rgba(255,255,255,0.65)' : '#71717a', lineHeight: 1.5 }}>{p}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Benefits / Features */}
                                                <div style={{ marginBottom: 16 }}>
                                                    <p style={{ fontSize: 9, fontWeight: 700, color: plan.popular ? '#D97706' : '#a1a1aa', letterSpacing: '0.12em', marginBottom: 8 }}>BENEFITS</p>
                                                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                                                        {plan.benefits.map((f, fi) => (
                                                            <li key={fi} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                                                                <div style={{ width: 17, height: 17, borderRadius: '50%', flexShrink: 0, background: plan.popular ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>
                                                                    <Check style={{ width: 8, height: 8, color: plan.popular ? '#FCD34D' : '#D97706' }} />
                                                                </div>
                                                                <div>
                                                                    <span style={{ fontSize: '0.78rem', fontWeight: 600, color: plan.popular ? 'rgba(255,255,255,0.9)' : '#27272a', display: 'block', lineHeight: 1.4 }}>{f.title}</span>
                                                                    <span style={{ fontSize: '0.72rem', color: plan.popular ? 'rgba(255,255,255,0.5)' : '#a1a1aa', lineHeight: 1.4 }}>{f.desc}</span>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {plan.bonus && (
                                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 8, background: plan.popular ? 'rgba(217,119,6,0.15)' : '#FEF3C7', border: `1px solid ${plan.popular ? 'rgba(217,119,6,0.25)' : '#FCD34D'}`, marginBottom: 14 }}>
                                                        <Sparkles style={{ width: 11, height: 11, color: '#D97706' }} />
                                                        <span style={{ fontSize: 11, fontWeight: 600, color: plan.popular ? '#FCD34D' : '#92400E' }}>{plan.bonus}</span>
                                                    </div>
                                                )}

                                                {/* Upgrade indicator */}
                                                <div style={{ padding: '10px 12px', borderRadius: 10, background: plan.popular ? 'rgba(255,255,255,0.04)' : '#fafafa', border: `1px solid ${plan.popular ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}` }}>
                                                    <p style={{ fontSize: '0.72rem', color: plan.popular ? 'rgba(255,255,255,0.4)' : '#a1a1aa', lineHeight: 1.5, fontStyle: 'italic' }}>
                                                        <span style={{ color: '#D97706', fontStyle: 'normal', fontWeight: 600 }}>Upgrade when: </span>
                                                        {plan.upgradeWhen}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div style={{ marginTop: 36, textAlign: 'center', paddingTop: 24, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                            <p style={{ fontSize: '0.7rem', color: '#a1a1aa', maxWidth: 700, margin: '0 auto', fontStyle: 'italic' }}>
                                <strong style={{ color: '#0a0a0a' }}>Important:</strong> Government fees, statutory charges, litigation, court representation, and external professional services are billed separately where applicable.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ══ WHAT HAPPENS AFTER YOU JOIN ══════════════════════════════ */}
                <section className="nm-section" style={{ background: '#fff' }}>
                    <div className="nm-container">
                        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem,6vw,4rem)' }}>
                            <span className="brand-line">GETTING STARTED</span>
                            <h2 style={{ fontSize: 'clamp(1.75rem,5vw,2.5rem)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 12 }}>What Happens After You Join</h2>
                            <p style={{ fontSize: '0.9rem', color: '#71717a', maxWidth: 500, margin: '0 auto' }}>No confusion. No chasing. Here's exactly how it works.</p>
                        </div>
                        <div className="nm-grid-3" style={{ gap: '0.75rem' }}>
                            {onboardingSteps.map((step, idx) => (
                                <div key={idx} style={{ position: 'relative', padding: 'clamp(1.25rem,4vw,2rem)', borderRadius: 20, background: '#fafafa', border: '1px solid rgba(0,0,0,0.07)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                                        <span style={{ fontSize: 'clamp(1.5rem,5vw,2.5rem)', fontWeight: 700, color: 'rgba(0,0,0,0.05)', lineHeight: 1 }}>{step.number}</span>
                                        <div style={{ width: 40, height: 40, borderRadius: 12, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706' }}>{step.icon}</div>
                                    </div>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#0a0a0a', marginBottom: 8 }}>{step.title}</h3>
                                    <p style={{ fontSize: '0.75rem', color: '#71717a', lineHeight: 1.6, marginBottom: 16 }}>{step.description}</p>
                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 999, background: '#FEF3C7', border: '1px solid #FCD34D' }}>
                                        <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#D97706' }} />
                                        <span style={{ fontSize: 10, fontWeight: 600, color: '#92400E' }}>{step.detail}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══ TRANSPARENCY SECTION (moved directly below pricing) ═══════ */}
                <section className="nm-section" style={{ background: '#fafafa', paddingTop: 'clamp(2.5rem,6vw,3.5rem)' }}>
                    <div className="nm-container">
                        <div style={{ textAlign: 'center', marginBottom: 'clamp(1.5rem,5vw,2.5rem)' }}>
                            <span className="brand-line" style={{ color: '#D97706' }}>TRANSPARENCY</span>
                            <h2 style={{ fontSize: 'clamp(1.5rem,4vw,2.25rem)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 8 }}>{t.transparencyHeading}</h2>
                            <p style={{ fontSize: '0.85rem', color: '#71717a', maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>{t.transparencySub}</p>
                        </div>
                        <div className="nm-grid-2" style={{ maxWidth: 720, margin: '0 auto' }}>
                            {transparencyItems.map((item, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '1rem 1.25rem', background: '#fff', borderRadius: 14, border: '1px solid rgba(0,0,0,0.08)' }}>
                                    <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(217,119,6,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#D97706' }}>
                                        {item.icon}
                                    </div>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#3f3f46', lineHeight: 1.4 }}>{item.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══ COMPARISON MATRIX ════════════════════════════════════════ */}
                <section className="nm-section" style={{ background: '#fff' }}>
                    <div className="nm-container">
                        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem,6vw,3rem)' }}>
                            <span className="brand-line">{t.matrixBadge}</span>
                            <h2 style={{ fontSize: 'clamp(1.5rem,4vw,2.25rem)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.02em', lineHeight: 1.2 }}>{t.matrixHeadline}</h2>
                        </div>
                        <div style={{ background: '#fafafa', borderRadius: 20, border: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden' }}>
                            <div style={{ overflowX: 'auto' }}>
                                <table className="matrix-table">
                                    <thead style={{ background: '#000' }}>
                                        <tr>
                                            <th style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 600, textAlign: 'left', width: '38%' }}>Feature</th>
                                            {plans.map(p => (
                                                <th key={p.id} style={{ color: p.popular ? '#D97706' : 'rgba(255,255,255,0.7)' }}>
                                                    {p.id === 'fractional' ? 'Fractional' : p.id === 'lite' ? 'Essentials' : 'Legal Ops'}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {matrixRows.map((row, ri) => (
                                            <tr key={ri} style={{ background: ri % 2 === 0 ? '#fff' : '#fafafa' }}>
                                                <td style={{ fontSize: '0.825rem', color: '#3f3f46', fontWeight: 500 }}>{row.label}</td>
                                                <td><MatrixCell val={row.lite} popular={false} /></td>
                                                <td style={{ background: 'rgba(217,119,6,0.04)' }}><MatrixCell val={row.ops} popular={true} /></td>
                                                <td><MatrixCell val={row.frac} popular={false} /></td>
                                            </tr>
                                        ))}
                                        <tr style={{ background: '#000' }}>
                                            <td style={{ fontSize: '0.8rem', fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>Monthly price</td>
                                            {plans.map(p => (
                                                <td key={p.id} style={{ background: p.popular ? 'rgba(217,119,6,0.1)' : undefined }}>
                                                    <a href={p.whatsapp} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '6px 14px', borderRadius: 20, background: p.popular ? '#D97706' : 'rgba(255,255,255,0.1)', color: p.popular ? '#000' : '#fff', fontSize: 11, fontWeight: 700, textDecoration: 'none' }}>
                                                        {p.id === 'fractional' ? '₹29,999+' : `₹${(isYearly ? p.yearlyPrice : p.price).toLocaleString()}`}
                                                    </a>
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══ SERVICES ═════════════════════════════════════════════════ */}
                <section className="nm-section" style={{ background: '#fafafa' }}>
                    <div className="nm-container">
                        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem,8vw,4rem)' }}>
                            <span className="brand-line">ADD-ON SERVICES</span>
                            <h2 style={{ fontSize: 'clamp(1.75rem,5vw,2.5rem)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 16 }}>{t.servicesHeading}</h2>
                            <p style={{ fontSize: '0.95rem', color: '#71717a', maxWidth: 520, margin: '0 auto', lineHeight: 1.6 }}>{t.servicesSub}</p>
                        </div>
                        <div className="services-grid">
                            {visibleServices.map(service => (
                                <a key={service.id} href={waGeneral} target="_blank" rel="noopener noreferrer"
                                    className={`service-tile ${service.highlight ? 'highlight' : ''}`}
                                    onMouseEnter={() => setHoveredService(service.id)} onMouseLeave={() => setHoveredService(null)}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                                        <div style={{ width: 48, height: 48, borderRadius: 12, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706', flexShrink: 0 }}>{service.icon}</div>
                                        {service.highlight && <span style={{ fontSize: 9, fontWeight: 700, color: '#D97706', background: '#FEF3C7', padding: '4px 8px', borderRadius: 999, whiteSpace: 'nowrap', letterSpacing: '0.08em' }}>FEATURED</span>}
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0a0a0a', lineHeight: 1.3, marginBottom: 6 }}>{service.title}</h3>
                                        <p style={{ fontSize: '0.85rem', color: '#71717a', lineHeight: 1.5 }}>{service.desc}</p>
                                    </div>
                                    <p style={{ fontSize: '0.85rem', color: '#D97706', fontWeight: 700, letterSpacing: '0.02em' }}>{service.price}</p>
                                </a>
                            ))}
                        </div>
                        <div style={{ textAlign: 'center', marginTop: 32 }}>
                            <a href={waGeneral} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', color: '#71717a', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                                Need a one-time legal service? Talk to us and we'll guide you to the right solution.
                                <ArrowRight style={{ width: 13, height: 13, color: '#D97706' }} />
                            </a>
                        </div>
                    </div>
                </section>

                {/* ══ HOW IT WORKS ═════════════════════════════════════════════ */}
                <section className="nm-section" style={{ background: '#fff' }}>
                    <div className="nm-container">
                        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem,6vw,4rem)' }}>
                            <span className="brand-line">{t.fromConfusion}</span>
                            <h2 style={{ fontSize: 'clamp(1.75rem,5vw,2.5rem)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 12 }}>{t.howItWorks}</h2>
                            <p style={{ fontSize: '0.9rem', color: '#71717a', maxWidth: 500, margin: '0 auto' }}>{t.howItWorksSub}</p>
                        </div>
                        <div className="nm-grid-3" style={{ gap: '0.75rem' }}>
                            {steps.map((step, idx) => (
                                <div key={idx} style={{ position: 'relative', padding: 'clamp(1.25rem,4vw,2rem)', borderRadius: 20, background: '#fafafa', border: '1px solid rgba(0,0,0,0.07)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                                        <span style={{ fontSize: 'clamp(1.5rem,5vw,2.5rem)', fontWeight: 700, color: 'rgba(0,0,0,0.05)', lineHeight: 1 }}>{step.number}</span>
                                        <div style={{ width: 40, height: 40, borderRadius: 12, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706' }}>{step.icon}</div>
                                    </div>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#0a0a0a', marginBottom: 8 }}>{step.title}</h3>
                                    <p style={{ fontSize: '0.75rem', color: '#71717a', lineHeight: 1.6, marginBottom: 16 }}>{step.description}</p>
                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 999, background: '#FEF3C7', border: '1px solid #FCD34D' }}>
                                        <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#D97706' }} />
                                        <span style={{ fontSize: 10, fontWeight: 600, color: '#92400E' }}>{step.detail}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══ EXECUTION PROOF ══════════════════════════════════════════ */}
                <section className="nm-section" style={{ background: '#fafafa' }}>
                    <div className="nm-container">
                        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem,6vw,3.5rem)' }}>
                            <span className="brand-line">EXECUTION PROOF</span>
                            <h2 style={{ fontSize: 'clamp(1.5rem,4vw,2.25rem)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 12 }}>Execution Proof</h2>
                            <p style={{ fontSize: '0.9rem', color: '#71717a', maxWidth: 500, margin: '0 auto' }}>Examples of how structured legal operations save founders time, money and stress.</p>
                        </div>
                        <div className="proof-grid">
                            {executionProofs.map((proof, pi) => (
                                <div key={pi} style={{ borderRadius: 20, padding: '1.75rem', border: '1px solid rgba(0,0,0,0.08)', background: '#fff', position: 'relative' }}>
                                    <div style={{ position: 'absolute', top: -1, left: 0, right: 0, height: 2, borderRadius: '20px 20px 0 0', background: 'linear-gradient(90deg, #D97706, #FCD34D)' }} />
                                    <div style={{ width: 36, height: 36, borderRadius: 10, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706', marginBottom: 16 }}>
                                        {proof.icon}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 16 }}>
                                        <Check style={{ width: 14, height: 14, color: '#D97706', flexShrink: 0, marginTop: 2 }} />
                                        <p style={{ fontSize: '0.9rem', color: '#0a0a0a', fontWeight: 600, lineHeight: 1.5 }}>{proof.text}</p>
                                    </div>
                                    <div style={{ paddingTop: 14, borderTop: '1px solid rgba(0,0,0,0.07)' }}>
                                        <p style={{ fontSize: 9, fontWeight: 700, color: '#a1a1aa', letterSpacing: '0.12em', marginBottom: 4 }}>OUTCOME</p>
                                        <p style={{ fontSize: '0.8rem', color: '#71717a', lineHeight: 1.6, fontStyle: 'italic' }}>{proof.outcome}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <p style={{ textAlign: 'center', marginTop: 24, fontSize: '0.7rem', color: '#a1a1aa', maxWidth: 640, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6, fontStyle: 'italic' }}>
                            Representative examples based on legal operations scenarios handled through the NyayMitra network. Individual outcomes vary.
                        </p>

                        {/* Trust proof strip */}
                        <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {trustProofs.map((proof, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.8rem 1rem', borderRadius: 12, border: '1px solid rgba(0,0,0,0.07)', background: '#fff', flexWrap: 'wrap', gap: 8 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <div style={{ width: 32, height: 32, borderRadius: 9, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706', flexShrink: 0 }}>{proof.icon}</div>
                                        <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#0a0a0a' }}>{proof.text}</span>
                                    </div>
                                    <span style={{ fontSize: 10, fontWeight: 600, color: '#D97706', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{proof.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══ FAQ ══════════════════════════════════════════════════════ */}
                <section className="nm-section" style={{ background: '#fff' }}>
                    <div className="nm-container">
                        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem,6vw,3.5rem)' }}>
                            <span className="brand-line">{t.faqBadge}</span>
                            <h2 style={{ fontSize: 'clamp(1.5rem,4vw,2.25rem)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.02em', lineHeight: 1.2 }}>{t.faqHeadline}</h2>
                        </div>
                        <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {faqs.map((faq, fi) => (
                                <div key={fi} className={`faq-item ${openFaq === fi ? 'open' : ''}`}>
                                    <button className="faq-q" onClick={() => setOpenFaq(openFaq === fi ? null : fi)} aria-expanded={openFaq === fi}>
                                        <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#0a0a0a', flex: 1 }}>{faq.q}</span>
                                        <ChevronDown style={{ width: 16, height: 16, color: '#71717a', flexShrink: 0, transform: openFaq === fi ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                                    </button>
                                    {openFaq === fi && <div className="faq-a">{faq.a}</div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══ FINAL CTA ════════════════════════════════════════════════ */}
                <section style={{ background: '#000', padding: 'clamp(3rem,8vw,5rem) 1.5rem', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, background: 'radial-gradient(circle, rgba(217,119,6,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
                    <div className="nm-container" style={{ textAlign: 'center', position: 'relative' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', marginBottom: 24 }}>
                            <MessageCircle style={{ width: 10, height: 10, color: '#D97706' }} />
                            <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.14em' }}>ONE ACCOUNTABLE TEAM</span>
                        </div>
                        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,6vw,3.5rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.15, marginBottom: 8 }}>
                            {t.finalHeading}
                        </h2>
                        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.25rem,4vw,2rem)', fontWeight: 600, fontStyle: 'italic', color: '#D97706', letterSpacing: '-0.01em', lineHeight: 1.25, marginBottom: 20 }}>
                            {t.finalHeadingGold}
                        </h3>
                        <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.5)', maxWidth: 460, margin: '0 auto 36px', lineHeight: 1.65 }}>{t.finalDesc}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBottom: 20 }}>
                            <a href={waOps} target="_blank" rel="noopener noreferrer" className="btn-amber">
                                {t.ctaFinal} <ArrowRight style={{ width: 13, height: 13 }} />
                            </a>
                            <a href={waGeneral} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ background: 'rgba(255,255,255,0.06)', color: '#fff', borderColor: 'rgba(255,255,255,0.12)' }}>
                                <WaSvg size={14} /> WhatsApp Us
                            </a>
                        </div>
                        <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)' }}>{t.noCard}</p>
                    </div>
                </section>

                {/* ══ FOOTER ═══════════════════════════════════════════════════ */}
                <footer style={{ background: '#fafafa', borderTop: '1px solid rgba(0,0,0,0.07)', padding: 'clamp(2rem,5vw,3rem) 1.5rem 1.5rem' }}>
                    <div className="nm-container">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,180px),1fr))', gap: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: 'clamp(1.5rem,4vw,2.5rem)' }}>
                            <div style={{ gridColumn: 'span 2' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                                    <div style={{ width: 28, height: 28, background: '#000', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Scale style={{ width: 13, height: 13, color: '#D97706' }} /></div>
                                    <span style={{ fontSize: 16, fontWeight: 700, color: '#0a0a0a' }}>NyayMitra</span>
                                </div>
                                <p style={{ fontSize: 12, color: '#71717a', maxWidth: 240, lineHeight: 1.6, marginBottom: 20 }}>
                                    India's outsourced legal operations partner for startups and MSMEs. One team. Full accountability.
                                </p>
                                <address style={{ fontStyle: 'normal' }}>
                                    {[
                                        { icon: <MapPin style={{ width: 11, height: 11 }} />, text: "Koramangala, Bengaluru – 560034", href: null },
                                        { icon: <Mail style={{ width: 11, height: 11 }} />, text: "support@nyaymitra.tech", href: "mailto:support@nyaymitra.tech" },
                                        { icon: <PhoneCall style={{ width: 11, height: 11 }} />, text: "+91 79705 96183", href: "tel:+917970596183" },
                                    ].map((row, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, color: '#71717a', fontSize: 11 }}>
                                            <span style={{ color: '#a1a1aa' }}>{row.icon}</span>
                                            {row.href ? <a href={row.href} style={{ color: '#71717a', textDecoration: 'none' }}>{row.text}</a> : row.text}
                                        </div>
                                    ))}
                                </address>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 16 }}>
                                    <span style={{ fontSize: 10, color: '#a1a1aa', marginRight: 4 }}>Follow us</span>
                                    {[
                                        { icon: <Instagram style={{ width: 13, height: 13 }} />, href: "https://www.instagram.com/nyaymitra.tech", label: "Instagram" },
                                        { icon: <Linkedin style={{ width: 13, height: 13 }} />, href: "https://www.linkedin.com/company/nyaymitra-tech-pvt-ltd", label: "LinkedIn" },
                                    ].map(s => (
                                        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ width: 28, height: 28, borderRadius: 8, border: '1px solid rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a1a1aa', textDecoration: 'none' }}>{s.icon}</a>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h4 style={{ fontSize: 9, fontWeight: 700, color: '#a1a1aa', letterSpacing: '0.15em', marginBottom: 14, textTransform: 'uppercase' }}>{t.quickLinks}</h4>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {[
                                        { label: "NyayMitra", href: "/about" },
                                        { label: "Services", href: "/services" },
                                        { label: "Find Lawyers", href: "/lawyers" },
                                        { label: "Affidavit Online", href: "/affidavit-online-india" },
                                        { label: "Sign Up", href: "/auth/signup" },
                                    ].map(link => <li key={link.label}><a href={link.href} style={{ fontSize: 12, color: '#71717a', textDecoration: 'none' }}>{link.label}</a></li>)}
                                </ul>
                            </div>

                            {/* Legal Links */}
                            <div>
                                <h4 style={{ fontSize: 9, fontWeight: 700, color: '#a1a1aa', letterSpacing: '0.15em', marginBottom: 14, textTransform: 'uppercase' }}>{t.legal}</h4>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {[
                                        { label: "Terms of Service", href: "/terms" },
                                        { label: "Privacy Policy", href: "/privacy-policy" },
                                        { label: "Cancellation & Refund", href: "/cancellation" },
                                        { label: "Shipping & Delivery", href: "/Shipping&DeliveryPolicy" },
                                        { label: "Contact Us", href: "/contact" },
                                    ].map(link => <li key={link.label}><a href={link.href} style={{ fontSize: 12, color: '#71717a', textDecoration: 'none' }}>{link.label}</a></li>)}
                                </ul>
                            </div>
                        </div>

                        <div className="footer-bottom" style={{ borderTop: '1px solid rgba(0,0,0,0.07)', paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <p style={{ fontSize: 10, color: '#a1a1aa', textAlign: 'left', lineHeight: 1.5 }}>
                                <span style={{ color: '#71717a', fontWeight: 600 }}>Disclaimer: </span>{t.disclaimer}
                            </p>
                            <p style={{ fontSize: 10, color: '#a1a1aa', textAlign: 'left' }}>© 2026 NyayMitra Technologies Private Limited · CIN: U69100BR2026PTC082217</p>
                        </div>
                    </div>
                </footer>

                {/* Floating WhatsApp */}
                <a href={waGeneral} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 50, width: 50, height: 50, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: '#fff', boxShadow: '0 4px 14px rgba(0,0,0,0.18)' }}>
                    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 24, height: 24 }}>
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.677-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.897 6.994c-.004 5.45-4.437 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.181-1.24-6.162-3.495-8.411" />
                    </svg>
                </a>
            </div>
        </>
    )
}