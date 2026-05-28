"use client"

import { useState, useEffect, useRef } from "react"
import {
    Check, Zap, Shield, Users, FileText, MessageCircle,
    ArrowRight, Star, Clock, Scale, AlertCircle, TrendingUp,
    Award, ThumbsUp, Sparkles, Menu, X, Instagram, Linkedin,
    MapPin, Mail, PhoneCall, ChevronRight, Gavel, Bot, XCircle,
    Briefcase, FileCheck, Users2, Lock, Zap as ZapIcon, Target
} from "lucide-react"

// English translations (ONLY VERSION)
const englishTranslations = {
    // Nav
    navServices: "Services",
    navFindLawyers: "Find Lawyers",
    navLegalGPT: "Legal GPT",
    navPricing: "Pricing",
    navAbout: "About",
    // Hero
    riskAlert: "RISK ALERT",
    startupsProtected: "100+ STARTUPS PROTECTED",
    heroHeadline: "Don't let one bad contract",
    heroHeadlineGold: "cost your startup.",
    heroDesc: "Get legal clarity and fix issues before they become expensive mistakes.",
    heroPrice: "Starting at ₹2,999/month",
    ctaWhatsapp: "Get Help on WhatsApp",
    ctaPlans: "View Plans",
    noCommitment: "No long-term commitment",
    cancelAnytime: "Cancel anytime",
    // freeTrial: "14-day free trial",
    live: "LIVE",
    fromConfusion: "FROM CONFUSION TO ACTION.",
    aiPowered: "AI-powered · 24/7 · Hindi & English",
    verifiedLawyers: "60+ Verified Lawyers",
    avgResponse: "Avg response < 2 hours",
    // Risk Section
    realCost: "THE REAL COST",
    riskHeading: "What happens if you ignore legal?",
    riskSub: "Small oversights become expensive disasters.",
    riskTitle1: "Bad contract you signed",
    riskConsequence1: "Financial loss of ₹2L+",
    riskOutcome1: "We fix loopholes before they're exploited",
    riskTitle2: "No co-founder agreement",
    riskConsequence2: "Disputes split the company",
    riskOutcome2: "Clear ownership & exit terms",
    riskTitle3: "Ignoring legal notice",
    riskConsequence3: "Escalation to court",
    riskOutcome3: "Resolution without litigation",
    fixBeforeExpensive: "Fix it before it becomes expensive →",
    // Pricing Section - NEW POSITIONING
    pricing: "PRICING",
    pricingHeading: "Startup Legal Operations Infrastructure",
    pricingSub: "Protect your founders. Run your compliance. Control your legal risk.",
    mostPopular: "MOST POPULAR",
    positioningLabel1: "Founder Protection Layer",
    positioningLabel2: "Legal Clarity Infrastructure",
    positioningLabel3: "Operational Legal Support",

    // Services Section
    servicesHeading: "Execution & Compliance Services",
    servicesSub: "Execution-focused legal support for startups & businesses",

    // How It Works
    howItWorks: "How NyayMitra Works",
    howItWorksSub: "Your operational legal infrastructure",
    step1Title: "Legal Intake & Risk Mapping",
    step1Desc: "We understand your business operations, legal gaps, documentation needs, and compliance exposure.",
    step1Detail: "AI pre-analysis in 30 seconds",
    step2Title: "Operational Coordination",
    step2Desc: "NyayMitra coordinates documentation, filings, workflows, and partner professionals.",
    step2Detail: "Expert matched in < 2 hours",
    step3Title: "Execution & Ongoing Support",
    step3Desc: "We ensure operational follow-through across legal, compliance, and business workflows.",
    step3Detail: "Resolution in 24–48 hours",

    // Trust Section
    realResults: "REAL RESULTS",
    trustHeading: "What founders fixed with us",
    trustSub: "Real problems, solved in days. No court, no expensive lawyers.",
    trustText1: "Saved ₹80,000 by catching a bad clause before signing",
    trustText2: "Recovered ₹25,000 via legal notice without court",
    trustText3: "Avoided a dispute with co-founder agreement",
    trustText4: "Stopped payment delay with legal letter",
    fixedTime1: "Fixed in 2 hours",
    fixedTime2: "Resolved in 14 days",
    fixedTime3: "Drafted in 48h",
    fixedTime4: "Client paid in 7 days",
    testimonialText: "\"NyayMitra helped us fix a contract clause that would have cost us ₹2.3 lakhs. The Startup Legal Ops plan paid for itself in the first week.\"",
    testimonialName: "Ankit Sharma",
    testimonialTitle: "Co-founder, TechStart India",
    verified: "Verified",

    // Final CTA
    finalHeading: "Stop guessing.",
    finalHeadingGold: "Start acting.",
    finalDesc: "Get clear legal guidance in hours. Join 100+ startups that fixed their legal risk with NyayMitra.",
    ctaFinal: "Get Legal Help Now",
    noCard: "No credit card required · Free AI consultation · Cancel anytime",

    // Footer
    disclaimer: "NyayMitra is a technology platform. We do not act as a law firm. All consultations are delivered by licensed third-party professionals.",
    quickLinks: "Quick Links",
    legal: "Legal",
}

type Translations = typeof englishTranslations

export default function StartupLegalPage() {
    const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)
    const [hoveredService, setHoveredService] = useState<string | null>(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [activeStep, setActiveStep] = useState(0)
    const heroRef = useRef(null)
    const [windowWidth, setWindowWidth] = useState(0)
    const [isYearly, setIsYearly] = useState(false)

    // Get current translations (English only)
    const t: Translations = englishTranslations

    // Handle resize for responsive adjustments
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth)
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    useEffect(() => {
        const timer = setInterval(() => setActiveStep(s => (s + 1) % 3), 2800)
        return () => clearInterval(timer)
    }, [])

    const handleNavClick = () => {
        setIsMenuOpen(false)
    }

    // WHATSAPP INTENT LINKS
    const whatsappNumber = "919661644025"
    const whatsappIntentStartup = `https://wa.me/${whatsappNumber}?text=I%20want%20the%20Founder%20Launchpad%20plan`
    const whatsappIntentContract = `https://wa.me/${whatsappNumber}?text=I%20need%20help%20with%20contracts`
    const whatsappIntentGeneral = `https://wa.me/${whatsappNumber}?text=I%20need%20startup%20legal%20help`

    const navLinks = [
        { label: t.navServices, href: "/services" },
        { label: t.navFindLawyers, href: "/lawyers" },
        { label: t.navLegalGPT, href: "/legal-ai" },
        { label: t.navPricing, href: "#pricing" },
        { label: t.navAbout, href: "/about" },
    ]

    // RISK SECTION
    const risks = [
        {
            icon: <XCircle className="w-5 h-5" />,
            title: "Bad contract you signed",
            consequence: "Financial loss of ₹2L+",
            outcome: "We fix loopholes before they're exploited"
        },
        {
            icon: <AlertCircle className="w-5 h-5" />,
            title: "No co-founder agreement",
            consequence: "Disputes split the company",
            outcome: "Clear ownership & exit terms"
        },
        {
            icon: <TrendingUp className="w-5 h-5" />,
            title: "Ignoring legal notice",
            consequence: "Escalation to court",
            outcome: "Resolution without litigation"
        }
    ]

    // ENHANCED PLANS WITH NEW PRICING STRUCTURE
    const plans = [
        {
            id: "launchpad",
            name: "Founder Launchpad",
            tagline: "For early-stage founders setting up startup operations properly",
            price: 2999,
            yearlyPrice: 2399,
            features: [
                "AI legal assistant access",
                "1 founder guidance session/month",
                "Founder agreement templates",
                "Freelancer/vendor templates",
                "Basic startup compliance checklist",
                "Email & WhatsApp coordination",
                "Monthly legal reminders"
            ],
            outcome: "Set up your startup foundation with legal clarity and smart templates.",
            cta: "Start Building Safely →",
            popular: false,
            positioningLabel: "Best for Early Founders",
            disclaimer: "Execution, filing & government charges separate."
        },

        {
            id: "ops",
            name: "Startup Legal Ops",
            tagline: "Managed legal operations support for growing startups",
            price: 14999,
            yearlyPrice: 11999,
            features: [
                "Monthly legal coordination support",
                "Contract drafting & review",
                "Vendor/client agreements",
                "HR & employment documentation",
                "Notice drafting coordination",
                "Compliance workflow assistance",
                "Priority founder support",
                "Assigned legal operations manager",
                "Partner lawyer routing"
            ],
            outcome: "Operate with structured legal support without hiring a full legal team.",
            cta: "Talk to Legal Ops →",
            popular: true,
            positioningLabel: "Most Popular",
            disclaimer: "External filings, litigation & statutory fees billed separately."
        },

        {
            id: "fractional",
            name: "Fractional Legal Desk",
            tagline: "For scaling startups, MSMEs & multi-city businesses",
            price: null,
            yearlyPrice: null,
            customPricing: true,
            features: [
                "Dedicated legal operations layer",
                "Multi-city compliance coordination",
                "Ongoing workflow management",
                "Strategic legal support",
                "Documentation lifecycle management",
                "Business risk coordination",
                "Compliance tracking system",
                "Startup governance assistance",
                "Escalation support"
            ],
            outcome: "Build structured legal infrastructure as your business scales.",
            cta: "Book Strategy Call →",
            popular: false,
            positioningLabel: "For Scaling Businesses",
        }
    ]

    // PREMIUM EXECUTION & COMPLIANCE SERVICES
    const services = [
        {
            id: "shop",
            title: "Shop & Establishment Registration",
            desc: "Get registered with authorities. Complete compliance. Expert coordination.",
            price: "Starting from ₹4,999 + Govt Fees",
            icon: <Briefcase className="w-5 h-5" />,
            highlight: false
        },
        {
            id: "startup-docs",
            title: "Startup Documentation Support",
            desc: "Complete startup setup. All documents. All filings. Expert guidance.",
            price: "Starting from ₹9,999 + Govt Fees",
            icon: <FileCheck className="w-5 h-5" />,
            highlight: true
        },
        {
            id: "employment",
            title: "Employment & HR Documentation",
            desc: "Hire the right way. Compliant agreements. Employee clarity.",
            price: "Starting from ₹3,999 + Govt Fees",
            icon: <Users2 className="w-5 h-5" />
        },
        {
            id: "notices",
            title: "Legal Notices & Recovery",
            desc: "Official notices. Recover money. Protect your business rights.",
            price: "Starting from ₹3,999 + Govt Fees",
            icon: <MessageCircle className="w-5 h-5" />
        },
        {
            id: "trademark",
            title: "Trademark & IP Coordination",
            desc: "Protect your brand. IP strategy. Filing coordination.",
            price: "Starting from ₹6,999 + Govt Fees",
            icon: <Shield className="w-5 h-5" />
        },
        {
            id: "vendor",
            title: "Vendor & Commercial Agreements",
            desc: "Clear vendor terms. Client contracts. Smart agreements.",
            price: "Starting from ₹2,999 + Govt Fees",
            icon: <FileText className="w-5 h-5" />
        },
        {
            id: "audit",
            title: "Compliance Audit & Coordination",
            desc: "Audit your legal gaps. Fix compliance issues. Structured plan.",
            price: "Starting from ₹14,999 + Govt Fees",
            icon: <Check className="w-5 h-5" />
        },
        {
            id: "multi-city",
            title: "Multi-city Registration Support",
            desc: "Multi-state expansion. All registrations. Compliance mapped.",
            price: "Starting from ₹8,999 + Govt Fees",
            icon: <MapPin className="w-5 h-5" />
        },
    ]

    const steps = [
        {
            icon: <MessageCircle className="w-6 h-6" />,
            number: "01",
            title: t.step1Title,
            description: t.step1Desc,
            detail: t.step1Detail
        },
        {
            icon: <Scale className="w-6 h-6" />,
            number: "02",
            title: t.step2Title,
            description: t.step2Desc,
            detail: t.step2Detail
        },
        {
            icon: <Check className="w-6 h-6" />,
            number: "03",
            title: t.step3Title,
            description: t.step3Desc,
            detail: t.step3Detail
        }
    ]

    const trustProofs = [
        { text: "Saved ₹80,000 by catching a bad clause before signing", icon: <FileText className="w-4 h-4" />, time: "Fixed in 2 hours" },
        { text: "Recovered ₹25,000 via legal notice without court", icon: <ThumbsUp className="w-4 h-4" />, time: "Resolved in 14 days" },
        { text: "Avoided a dispute with co-founder agreement", icon: <Users className="w-4 h-4" />, time: "Drafted in 48h" },
        { text: "Stopped payment delay with legal letter", icon: <Clock className="w-4 h-4" />, time: "Client paid in 7 days" }
    ]

    const footerLinks = {
        [t.quickLinks]: [
            { label: "NyayMitra", href: "/about" },
            { label: t.navServices, href: "/services" },
            { label: t.navFindLawyers, href: "/lawyers" },
            { label: "Affidavit Online", href: "/affidavit-online-india" },
            { label: "Sign Up", href: "/auth/signup" },
        ],
        [t.legal]: [
            { label: "Terms of Service", href: "/terms" },
            { label: "Privacy Policy", href: "/privacy-policy" },
            { label: "Cancellation & Refund", href: "/cancellation" },
            { label: "Shipping & Delivery", href: "/Shipping&DeliveryPolicy" },
            { label: "Contact Us", href: "/contact" },
        ]
    }

    const WaSvg = ({ size = 16 }: { size?: number }) => (
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size, flexShrink: 0 }}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.677-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.897 6.994c-.004 5.45-4.437 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.181-1.24-6.162-3.495-8.411" />
        </svg>
    )

    const isMobile = windowWidth < 768

    return (
        <>
            {/* ─── GLOBAL STYLES ─── */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Syne:wght@400;500;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

                * { 
                    box-sizing: border-box; 
                    margin: 0; 
                    padding: 0; 
                }

                body { 
                    font-family: 'DM Sans', system-ui, sans-serif; 
                    overflow-x: hidden;
                }

                .nm-container {
                    width: 100%;
                    max-width: 1280px;
                    margin-left: auto;
                    margin-right: auto;
                    padding-left: 1.5rem;
                    padding-right: 1.5rem;
                }

                @media (max-width: 640px) {
                    .nm-container {
                        padding-left: 1rem;
                        padding-right: 1rem;
                    }
                }

                .nm-grid {
                    display: grid;
                    gap: 1.5rem;
                }

                .nm-grid-2 {
                    grid-template-columns: repeat(2, 1fr);
                }

                .nm-grid-3 {
                    grid-template-columns: repeat(3, 1fr);
                }

                @media (max-width: 768px) {
                    .nm-grid-2, .nm-grid-3 {
                        grid-template-columns: 1fr;
                    }
                }

                .nm-hide-mobile {
                    display: block;
                }

                @media (max-width: 768px) {
                    .nm-hide-mobile {
                        display: none !important;
                    }
                }

                .nm-show-mobile {
                    display: none !important;
                }

                @media (max-width: 768px) {
                    .nm-show-mobile {
                        display: flex !important;
                    }
                }

                .nm-flex-between {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .nm-flex-center {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .hover-underline {
                    position: relative;
                }
                .hover-underline::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 0;
                    height: 1px;
                    background: #D97706;
                    transition: width 0.28s cubic-bezier(0.4,0,0.2,1);
                }
                .hover-underline:hover::after { 
                    width: 100%; 
                }

                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .marquee-track { 
                    animation: marquee 28s linear infinite; 
                    display: flex;
                }

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .anim-1 { animation: fadeInUp 0.7s cubic-bezier(0.4,0,0.2,1) both; }
                .anim-2 { animation: fadeInUp 0.7s 0.12s cubic-bezier(0.4,0,0.2,1) both; }
                .anim-3 { animation: fadeInUp 0.7s 0.24s cubic-bezier(0.4,0,0.2,1) both; }
                .anim-4 { animation: fadeInUp 0.7s 0.36s cubic-bezier(0.4,0,0.2,1) both; }

                @keyframes glow-pulse {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(217,119,6,0.4); }
                    50% { box-shadow: 0 0 0 6px rgba(217,119,6,0); }
                }
                .amber-pulse { animation: glow-pulse 2s infinite; }

                .plan-card { 
                    transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
                }
                .plan-card:hover { 
                    transform: translateY(-6px); 
                    box-shadow: 0 24px 64px rgba(0,0,0,0.12); 
                }
                .plan-card.popular { 
                    transform: translateY(-8px); 
                    box-shadow: 0 32px 80px rgba(0,0,0,0.15); 
                }
                .plan-card.popular:hover { 
                    transform: translateY(-14px); 
                }

                .service-card {
                    transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
                }
                .service-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 16px 48px rgba(0,0,0,0.1);
                }

                .step-bar { transition: width 2.8s linear; }

                @media (max-width: 640px) {
                    h1.nm-display {
                        font-size: 2rem !important;
                    }
                    h2.nm-display {
                        font-size: 1.75rem !important;
                    }
                }

                .overflow-x-hidden {
                    overflow-x: hidden;
                }

                .nm-section {
                    padding: 5rem 1.5rem;
                }
                @media (max-width: 768px) {
                    .nm-section {
                        padding: 3rem 1rem;
                    }
                }

                .brand-line {
                    font-family: 'Syne', sans-serif;
                    font-size: 10px;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: #D97706;
                }
                .risk-card {
                    transition: all 0.2s ease;
                }
                .risk-card:hover {
                    transform: translateX(4px);
                    border-left-color: #D97706;
                }

                .gold-text {
                    color: #D97706;
                    font-style: italic;
                }
                .hero-headline {
                    font-family: 'Cormorant Garamond', serif;
                    font-weight: 700;
                    letter-spacing: -0.02em;
                }

                /* PREMIUM PRICING ENHANCEMENTS */
                .pricing-positioning {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 4px 10px 4px 8px;
                    border-radius: 999px;
                    background: rgba(217, 119, 6, 0.08);
                    border: 1px solid rgba(217, 119, 6, 0.2);
                    font-size: 9px;
                    font-weight: 600;
                    color: #D97706;
                    letter-spacing: 0.08em;
                }

                .plan-grid-responsive {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.5rem;
                    align-items: start;
                }

                @media (max-width: 1024px) {
                    .plan-grid-responsive {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }
                }

                .plan-header-enhanced {
                    margin-bottom: 24px;
                    padding-bottom: 24px;
                    border-bottom: 1px solid rgba(0,0,0,0.08);
                }

                .plan-headline {
                    font-size: clamp(0.9rem, 2vw, 1.1rem);
                    font-weight: 600;
                    color: inherit;
                    line-height: 1.4;
                    margin-bottom: 12px;
                }

                /* PREMIUM SERVICES SECTION */
                .services-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
                    gap: 1.75rem;
                }

                @media (max-width: 1024px) {
                    .services-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 1.5rem;
                    }
                }

                @media (max-width: 640px) {
                    .services-grid {
                        grid-template-columns: 1fr;
                        gap: 1.25rem;
                    }
                }

                .service-tile {
                    padding: 2rem;
                    border-radius: 20px;
                    border: 1px solid rgba(0,0,0,0.08);
                    background: #fff;
                    text-decoration: none;
                    transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
                    cursor: pointer;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .service-tile:hover {
                    border-color: #D97706;
                    box-shadow: 0 20px 60px rgba(217, 119, 6, 0.18);
                    transform: translateY(-8px);
                }

                .service-tile.highlight {
                    border: 2px solid #D97706;
                    background: linear-gradient(135deg, rgba(254, 243, 199, 0.3) 0%, rgba(255, 255, 255, 1) 100%);
                    box-shadow: 0 8px 32px rgba(217, 119, 6, 0.1);
                }

                .service-tile.highlight:hover {
                    box-shadow: 0 24px 80px rgba(217, 119, 6, 0.25);
                    transform: translateY(-10px);
                }

                .service-icon-wrapper {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    background: #000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #D97706;
                    flex-shrink: 0;
                }

                .service-title {
                    font-size: 1.05rem;
                    font-weight: 700;
                    color: #0a0a0a;
                    line-height: 1.3;
                }

                .service-desc {
                    font-size: 0.85rem;
                    color: #71717a;
                    line-height: 1.5;
                    flex-grow: 1;
                }

                .service-price {
                    font-size: 0.85rem;
                    color: #D97706;
                    font-weight: 700;
                    letter-spacing: 0.02em;
                    margin-top: auto;
                }

                /* Premium positioning strip */
                .premium-positioning-strip {
                    background: linear-gradient(135deg, #000 0%, #1a1a1a 100%);
                    padding: 2rem 1.5rem;
                    margin: 3rem 0;
                    border-radius: 24px;
                    border: 1px solid rgba(217, 119, 6, 0.2);
                }

                .premium-positioning-strip h3 {
                    color: #fff;
                    font-size: 1.1rem;
                    font-weight: 600;
                    margin-bottom: 16px;
                    text-align: center;
                }

                .premium-bullets {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                    gap: 12px;
                }

                .premium-bullet {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 0.85rem;
                }

                .premium-bullet::before {
                    content: '•';
                    color: #D97706;
                    font-weight: bold;
                    flex-shrink: 0;
                }
            `}</style>

            <div className="min-h-screen bg-white overflow-x-hidden" style={{ color: '#0a0a0a' }}>

                {/* ══════════════════════════════════════════════════════
                    NAV
                ══════════════════════════════════════════════════════ */}
                <nav
                    style={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 50,
                        background: scrolled ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,1)',
                        backdropFilter: 'blur(20px)',
                        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(0,0,0,0.06)',
                        transition: 'all 0.3s ease',
                    }}
                >
                    <div className="nm-container">
                        <div className="nm-flex-between" style={{ height: 64 }}>

                            {/* Logo */}
                            <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
                                <div style={{
                                    width: 34, height: 34, background: '#000', borderRadius: 9,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexShrink: 0,
                                }}>
                                    <Scale style={{ width: 16, height: 16, color: '#D97706' }} />
                                </div>
                                <span className="nm-display" style={{ fontSize: 18, fontWeight: 700, color: '#000', letterSpacing: '-0.01em' }}>
                                    NyayMitra
                                </span>
                                <span style={{
                                    fontSize: 9, fontWeight: 700, color: '#D97706', background: '#FEF3C7',
                                    border: '1px solid #FCD34D', borderRadius: 4, padding: '1px 6px',
                                    letterSpacing: '0.08em', marginLeft: 2,
                                }} className="nm-ui">PRO</span>
                            </a>

                            {/* Desktop nav links */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}
                                className="nm-hide-mobile">
                                {navLinks.map(link => (
                                    <a key={link.label} href={link.href}
                                        className="hover-underline nm-ui"
                                        style={{
                                            padding: '8px 14px', fontSize: 13, fontWeight: 500,
                                            color: '#52525b', textDecoration: 'none', borderRadius: 8,
                                            transition: 'color 0.2s ease, background 0.2s ease',
                                            whiteSpace: 'nowrap',
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.color = '#000'; e.currentTarget.style.background = 'rgba(0,0,0,0.04)' }}
                                        onMouseLeave={e => { e.currentTarget.style.color = '#52525b'; e.currentTarget.style.background = 'transparent' }}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>

                            {/* CTA row */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <div className="nm-hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <a href="https://www.instagram.com/nyaymitra.tech" target="_blank" rel="noopener noreferrer"
                                        style={{ padding: 6, borderRadius: '50%', color: '#a1a1aa', textDecoration: 'none', transition: 'color 0.2s', display: 'flex' }}
                                        onMouseEnter={e => e.currentTarget.style.color = '#000'}
                                        onMouseLeave={e => e.currentTarget.style.color = '#a1a1aa'}
                                    >
                                        <Instagram style={{ width: 16, height: 16 }} />
                                    </a>
                                    <a href="https://www.linkedin.com/company/nyaymitra-tech-pvt-ltd" target="_blank" rel="noopener noreferrer"
                                        style={{ padding: 6, borderRadius: '50%', color: '#a1a1aa', textDecoration: 'none', transition: 'color 0.2s', display: 'flex' }}
                                        onMouseEnter={e => e.currentTarget.style.color = '#000'}
                                        onMouseLeave={e => e.currentTarget.style.color = '#a1a1aa'}
                                    >
                                        <Linkedin style={{ width: 16, height: 16 }} />
                                    </a>
                                </div>

                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    style={{
                                        padding: 8,
                                        background: 'rgba(0,0,0,0.05)',
                                        border: 'none',
                                        borderRadius: 8,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    className="nm-show-mobile"
                                >
                                    {isMenuOpen ? <X style={{ width: 18, height: 18 }} /> : <Menu style={{ width: 18, height: 18 }} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    {isMenuOpen && (
                        <div style={{
                            borderTop: '1px solid rgba(0,0,0,0.07)',
                            padding: '20px 16px',
                            background: '#fff',
                            position: 'relative',
                            zIndex: 49,
                            maxHeight: '80vh',
                            overflowY: 'auto',
                        }}
                            className="nm-show-mobile"
                        >
                            {navLinks.map(link => (
                                <a key={link.label} href={link.href}
                                    onClick={handleNavClick}
                                    style={{
                                        display: 'block',
                                        padding: '12px 16px',
                                        fontSize: 15,
                                        fontWeight: 500,
                                        color: '#3f3f46',
                                        textDecoration: 'none',
                                        borderRadius: 8,
                                        transition: 'background 0.2s'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#f4f4f5'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <div style={{
                                borderTop: '1px solid rgba(0,0,0,0.07)',
                                marginTop: 12,
                                paddingTop: 16,
                                display: 'flex',
                                gap: 12,
                                justifyContent: 'center'
                            }}>
                                <a href="https://www.instagram.com/nyaymitra.tech" target="_blank" rel="noopener noreferrer"
                                    style={{ padding: 8, background: '#f4f4f5', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3f3f46' }}>
                                    <Instagram style={{ width: 18, height: 18 }} />
                                </a>
                                <a href="https://www.linkedin.com/company/nyaymitra-tech-pvt-ltd" target="_blank" rel="noopener noreferrer"
                                    style={{ padding: 8, background: '#f4f4f5', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3f3f46' }}>
                                    <Linkedin style={{ width: 18, height: 18 }} />
                                </a>
                            </div>
                        </div>
                    )}
                </nav>

                {/* ══════════════════════════════════════════════════════
                    HERO
                ══════════════════════════════════════════════════════ */}
                <section ref={heroRef} style={{ position: 'relative', overflow: 'hidden', padding: '3rem 1.5rem', background: '#fff' }}>
                    <div style={{
                        position: 'absolute', inset: 0, pointerEvents: 'none',
                        backgroundImage: 'linear-gradient(rgba(0,0,0,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.025) 1px,transparent 1px)',
                        backgroundSize: '48px 48px',
                    }} />
                    <div style={{
                        position: 'absolute', top: -60, right: -60, width: 360, height: 360,
                        background: 'radial-gradient(circle, rgba(217,119,6,0.08) 0%, transparent 70%)',
                        pointerEvents: 'none',
                    }} />

                    <div className="nm-container" style={{ position: 'relative' }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 380px',
                            gap: '2rem',
                            alignItems: 'center'
                        }}
                            className="responsive-hero-grid"
                        >
                            <style>{`
                                @media (max-width: 768px) {
                                    .responsive-hero-grid {
                                        grid-template-columns: 1fr !important;
                                        gap: 2rem !important;
                                    }
                                }
                            `}</style>

                            {/* Left — Hero copy */}
                            <div>
                                <div className="anim-1" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                                    <div style={{
                                        display: 'inline-flex', alignItems: 'center', gap: 6,
                                        padding: '4px 10px 4px 8px', borderRadius: 999,
                                        background: '#FEF3C7', border: '1px solid #D97706',
                                    }}>
                                        <span className="amber-pulse" style={{
                                            width: 6, height: 6, borderRadius: '50%', background: '#D97706', flexShrink: 0,
                                        }} />
                                        <span className="nm-ui" style={{ fontSize: 9, fontWeight: 700, color: '#92400E', letterSpacing: '0.12em' }}>
                                            {t.riskAlert}
                                        </span>
                                    </div>
                                    <div style={{
                                        display: 'inline-flex', alignItems: 'center', gap: 5,
                                        padding: '4px 10px', borderRadius: 999,
                                        background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)',
                                    }}>
                                        <span className="nm-ui" style={{ fontSize: 9, fontWeight: 600, color: '#71717a', letterSpacing: '0.1em' }}>
                                            {t.startupsProtected}
                                        </span>
                                    </div>
                                </div>

                                <h1 className="hero-headline anim-2" style={{
                                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                                    fontWeight: 700,
                                    lineHeight: 1.2,
                                    letterSpacing: '-0.02em',
                                    color: '#000',
                                    marginBottom: 20,
                                }}>
                                    {t.heroHeadline}<br />
                                    <span className="gold-text">{t.heroHeadlineGold}</span>
                                </h1>

                                <p className="anim-3 nm-body" style={{
                                    fontSize: 'clamp(0.875rem, 3.5vw, 1rem)',
                                    color: '#52525b',
                                    lineHeight: 1.6,
                                    maxWidth: 480,
                                    marginBottom: 28,
                                }}>
                                    {t.heroDesc}
                                    <strong style={{ color: '#D97706' }}> {t.heroPrice}</strong>
                                </p>

                                <div className="anim-4" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
                                    <a
                                        href={whatsappIntentGeneral}
                                        target="_blank" rel="noopener noreferrer"
                                        style={{
                                            display: 'inline-flex', alignItems: 'center', gap: 8,
                                            padding: '0.75rem 1.5rem',
                                            background: '#000', color: '#fff',
                                            borderRadius: 40, fontSize: '0.875rem',
                                            fontWeight: 600, textDecoration: 'none',
                                            transition: 'all 0.25s ease', boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                                        }}
                                        className="nm-ui"
                                    >
                                        <WaSvg size={16} /> {t.ctaWhatsapp}
                                    </a>
                                    <a
                                        href="#pricing"
                                        style={{
                                            display: 'inline-flex', alignItems: 'center', gap: 8,
                                            padding: '0.75rem 1.5rem',
                                            background: '#fff', color: '#000',
                                            borderRadius: 40, fontSize: '0.875rem',
                                            fontWeight: 600, textDecoration: 'none',
                                            border: '1px solid rgba(0,0,0,0.2)',
                                        }}
                                        className="nm-ui"
                                    >
                                        {t.ctaPlans} <ChevronRight style={{ width: 14, height: 14 }} />
                                    </a>
                                </div>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                                    {[t.noCommitment, t.cancelAnytime].map(text => (
                                        <span key={text} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: '#71717a' }}>
                                            <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#000', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                <Check style={{ width: 8, height: 8, color: '#fff' }} />
                                            </span>
                                            {text}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Right — Live card UI */}
                            <div className="nm-hide-mobile" style={{ position: 'relative' }}>
                                <div style={{
                                    position: 'absolute', inset: -12, borderRadius: 28,
                                    background: 'linear-gradient(135deg, #FEF3C7 0%, #fff 60%)',
                                    border: '1px solid rgba(0,0,0,0.06)',
                                }} />
                                <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)', background: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
                                    <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(0,0,0,0.07)', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <div style={{ display: 'flex', gap: 4 }}>
                                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#e5e5e5' }} />
                                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#e5e5e5' }} />
                                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#000' }} />
                                            </div>
                                        </div>
                                        <span className="nm-ui" style={{ fontSize: 9, fontWeight: 600, color: '#D97706', letterSpacing: '0.1em' }}>{t.fromConfusion}</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                            <div className="amber-pulse" style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981' }} />
                                            <span style={{ fontSize: 9, color: '#10b981', fontWeight: 600 }}>{t.live}</span>
                                        </div>
                                    </div>

                                    <div style={{ padding: '16px 18px' }}>
                                        {steps.map((step, i) => (
                                            <div key={i}
                                                style={{
                                                    display: 'flex', gap: 12, padding: '12px 10px',
                                                    borderRadius: 12, marginBottom: 2,
                                                    background: activeStep === i ? 'rgba(0,0,0,0.02)' : 'transparent',
                                                    transition: 'background 0.4s ease',
                                                    cursor: 'default',
                                                }}>
                                                <div style={{
                                                    width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                                                    border: activeStep === i ? '1.5px solid #D97706' : '1px solid rgba(0,0,0,0.1)',
                                                    background: activeStep === i ? '#FEF3C7' : '#fafafa',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    color: activeStep === i ? '#D97706' : '#71717a',
                                                }}>
                                                    {step.icon}
                                                </div>
                                                <div style={{ paddingTop: 2, flex: 1 }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2, flexWrap: 'wrap' }}>
                                                        <span className="nm-ui" style={{ fontSize: 8, color: '#a1a1aa', fontWeight: 600, fontFamily: 'monospace' }}>{step.number}</span>
                                                        <span style={{ fontSize: 12, fontWeight: 600, color: '#0a0a0a' }}>{step.title}</span>
                                                    </div>
                                                    <p style={{ fontSize: 10.5, color: '#71717a', lineHeight: 1.4 }}>{step.description}</p>
                                                    {activeStep === i && (
                                                        <div style={{ marginTop: 6, height: 2, background: '#f0f0f0', borderRadius: 2, overflow: 'hidden' }}>
                                                            <div className="step-bar" style={{ height: '100%', background: '#D97706', borderRadius: 2, width: '100%' }} />
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

                                <div style={{
                                    position: 'absolute', bottom: -12, left: -12,
                                    background: '#fff', border: '1px solid rgba(0,0,0,0.08)',
                                    borderRadius: 12, padding: '8px 12px',
                                    display: 'flex', alignItems: 'center', gap: 8,
                                    boxShadow: '0 6px 16px rgba(0,0,0,0.06)',
                                }}>
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

                {/* ── MARQUEE STRIP ── */}
                <div style={{ background: '#000', padding: '0.6rem 0', overflow: 'hidden' }}>
                    <div className="marquee-track" style={{ display: 'flex', width: 'max-content' }}>
                        {[...Array(2)].map((_, j) => (
                            <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '2rem', paddingRight: '2rem', whiteSpace: 'nowrap' }}>
                                {["Contract Risk", "Co-founder Disputes", "Legal Notice Recovery", "Compliance Gaps", "Investment Terms", "IP Theft", "Payment Recovery", "Labour Law"].map(item => (
                                    <span key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span className="nm-ui" style={{ fontSize: '0.625rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em' }}>{item}</span>
                                        <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#D97706', flexShrink: 0 }} />
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ══════════════════════════════════════════════════════
                    RISK SECTION
                ══════════════════════════════════════════════════════ */}
                <section className="nm-section" style={{ background: '#fafafa' }}>
                    <div className="nm-container">
                        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 6vw, 4rem)' }}>
                            <p className="brand-line">{t.realCost}</p>
                            <h2 className="nm-display" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 12 }}>
                                {t.riskHeading}
                            </h2>
                            <p className="nm-body" style={{ fontSize: 'clamp(0.875rem, 3vw, 0.9375rem)', color: '#71717a', maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>
                                {t.riskSub}
                            </p>
                        </div>

                        <div className="nm-grid nm-grid-3" style={{ gap: '1.25rem' }}>
                            {risks.map((risk, idx) => (
                                <div key={idx} className="risk-card" style={{
                                    background: '#fff', border: '1px solid rgba(0,0,0,0.08)',
                                    borderRadius: 20, padding: 'clamp(1.25rem, 4vw, 1.75rem)',
                                    borderLeft: '3px solid #D97706',
                                }}>
                                    <div style={{ width: 40, height: 40, borderRadius: 12, background: '#FEF3C7', border: '1px solid #FCD34D', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706', marginBottom: 16 }}>
                                        {risk.icon}
                                    </div>
                                    <h3 className="nm-body" style={{ fontSize: '1rem', fontWeight: 600, color: '#0a0a0a', marginBottom: 6, lineHeight: 1.4 }}>{risk.title}</h3>
                                    <p style={{ fontSize: '0.8125rem', color: '#D97706', fontWeight: 600, marginBottom: 8 }}>{risk.consequence}</p>
                                    <p style={{ fontSize: '0.75rem', color: '#71717a', lineHeight: 1.6 }}>{risk.outcome}</p>
                                </div>
                            ))}
                        </div>

                        <div style={{ textAlign: 'center', marginTop: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
                            <a href={whatsappIntentGeneral} target="_blank" rel="noopener noreferrer"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#000', color: '#fff', padding: '10px 24px', borderRadius: 40, fontWeight: 600, textDecoration: 'none', fontSize: '0.875rem' }}>
                                {t.fixBeforeExpensive} <ArrowRight style={{ width: 12 }} />
                            </a>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════════════
                    ENHANCED PRICING SECTION — PREMIUM POSITIONING
                ══════════════════════════════════════════════════════ */}
                <section id="pricing" className="nm-section" style={{ background: '#fff' }}>
                    <div className="nm-container">
                        {/* Pricing Header */}
                        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 6vw, 4rem)' }}>
                            <p className="brand-line">{t.pricing}</p>
                            {/* Billing Toggle */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 24 }}>
                                <span style={{ fontSize: '0.875rem', fontWeight: isYearly ? 400 : 600, color: isYearly ? '#71717a' : '#0a0a0a' }}>Monthly</span>
                                <button
                                    onClick={() => setIsYearly(v => !v)}
                                    style={{
                                        width: 48, height: 26, borderRadius: 999, border: 'none', cursor: 'pointer',
                                        background: isYearly ? '#D97706' : 'rgba(0,0,0,0.12)',
                                        position: 'relative', transition: 'background 0.25s ease',
                                    }}
                                >
                                    <span style={{
                                        position: 'absolute', top: 3, left: isYearly ? 25 : 3, width: 20, height: 20,
                                        borderRadius: '50%', background: '#fff',
                                        boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                                        transition: 'left 0.25s cubic-bezier(0.4,0,0.2,1)',
                                    }} />
                                </button>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <span style={{ fontSize: '0.875rem', fontWeight: isYearly ? 600 : 400, color: isYearly ? '#0a0a0a' : '#71717a' }}>Yearly</span>
                                    <span style={{
                                        fontSize: 10, fontWeight: 700, color: '#fff', background: '#D97706',
                                        padding: '2px 8px', borderRadius: 999, letterSpacing: '0.06em'
                                    }}>SAVE 20%</span>
                                </span>
                            </div>
                            <p className="nm-body" style={{ fontSize: '0.9rem', color: '#71717a', maxWidth: 500, margin: '0 auto', lineHeight: 1.6 }}>
                                {t.pricingSub}
                            </p>
                        </div>

                        {/* Plan Cards */}
                        <div className="plan-grid-responsive">
                            {plans.map((plan) => (
                                <div key={plan.id}
                                    className={`plan-card ${plan.popular ? 'popular' : ''}`}
                                    style={{
                                        position: 'relative', borderRadius: 24, overflow: 'visible',
                                        border: plan.popular ? '2px solid #000' : '1px solid rgba(0,0,0,0.1)',
                                        background: plan.popular ? '#000' : '#fff',
                                        padding: plan.popular ? '2rem 1.75rem' : '1.75rem'
                                    }}
                                    onMouseEnter={() => setHoveredPlan(plan.id)}
                                    onMouseLeave={() => setHoveredPlan(null)}
                                >
                                    {plan.popular && (
                                        <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)' }}>
                                            <span className="nm-ui" style={{
                                                display: 'inline-flex', alignItems: 'center', gap: 5,
                                                padding: '5px 14px', background: '#D97706', color: '#fff',
                                                fontSize: 10, fontWeight: 700, borderRadius: 999, letterSpacing: '0.1em',
                                                boxShadow: '0 4px 12px rgba(217,119,6,0.35)', whiteSpace: 'nowrap',
                                            }}>
                                                <Zap style={{ width: 10, height: 10 }} /> {t.mostPopular}
                                            </span>
                                        </div>
                                    )}

                                    {/* Plan Header with Enhanced Info */}
                                    <div className="plan-header-enhanced">
                                        {/* Positioning Label */}
                                        <div style={{ marginBottom: 12 }}>
                                            <span className="pricing-positioning" style={{
                                                background: plan.popular ? 'rgba(217, 119, 6, 0.15)' : 'rgba(217, 119, 6, 0.08)',
                                                color: plan.popular ? '#FCD34D' : '#D97706',
                                                border: plan.popular ? '1px solid rgba(252, 211, 77, 0.2)' : '1px solid rgba(217, 119, 6, 0.2)',
                                            }}>
                                                {plan.positioningLabel}
                                            </span>
                                        </div>

                                        {/* Plan Name and Tagline */}
                                        <div style={{ marginBottom: 12 }}>
                                            <p className="nm-ui" style={{
                                                fontSize: 10, fontWeight: 700, color: plan.popular ? '#D97706' : '#a1a1aa',
                                                letterSpacing: '0.14em', marginBottom: 6, textTransform: 'uppercase'
                                            }}>
                                                {plan.tagline}
                                            </p>
                                            <h3 className="nm-display" style={{
                                                fontSize: '1.5rem', fontWeight: 700, color: plan.popular ? '#fff' : '#0a0a0a',
                                                letterSpacing: '-0.02em'
                                            }}>
                                                {plan.name}
                                            </h3>
                                        </div>

                                        {/* Outcome */}
                                        <p style={{
                                            fontSize: '0.75rem', color: plan.popular ? '#FCD34D' : '#D97706',
                                            fontWeight: 500, marginTop: 12
                                        }}>
                                            {plan.outcome}
                                        </p>
                                    </div>

                                    {/* Pricing */}
                                    <div style={{ marginBottom: 24 }}>
                                        {plan.customPricing ? (
                                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 4, flexWrap: 'wrap' }}>
                                                <span className="nm-display" style={{
                                                    fontSize: '1.75rem', fontWeight: 700, color: plan.popular ? '#fff' : '#0a0a0a',
                                                    letterSpacing: '-0.03em', lineHeight: 1
                                                }}>
                                                    Custom
                                                </span>
                                            </div>
                                        ) : (
                                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 4, flexWrap: 'wrap' }}>
                                                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: plan.popular ? 'rgba(255,255,255,0.6)' : '#71717a' }}>₹</span>
                                                <span className="nm-display" style={{
                                                    fontSize: '2.75rem', fontWeight: 700, color: plan.popular ? '#fff' : '#0a0a0a',
                                                    letterSpacing: '-0.03em', lineHeight: 1
                                                }}>
                                                    {(isYearly ? plan.yearlyPrice ?? 0 : plan.price ?? 0).toLocaleString()}
                                                </span>
                                                <span style={{ fontSize: '0.75rem', color: plan.popular ? 'rgba(255,255,255,0.4)' : '#a1a1aa', marginLeft: 6 }}>per month</span>
                                            </div>
                                        )}
                                        {isYearly && !plan.customPricing ? (
                                            <p style={{ fontSize: 11, color: plan.popular ? 'rgba(255,255,255,0.5)' : '#71717a' }}>
                                                Billed ₹{((plan.yearlyPrice ?? 0) * 12).toLocaleString()}/year · Cancel anytime
                                            </p>
                                        ) : (
                                            <p style={{ fontSize: 11, color: plan.popular ? 'rgba(255,255,255,0.35)' : '#a1a1aa' }}>
                                                Billed monthly · Cancel anytime
                                            </p>
                                        )}
                                    </div>

                                    {/* CTA Button */}
                                    <a
                                        href={plan.id === 'launchpad' ? whatsappIntentStartup : whatsappIntentGeneral}
                                        target="_blank" rel="noopener noreferrer"
                                        className="nm-ui"
                                        style={{
                                            display: 'block', width: '100%', padding: '12px 0',
                                            textAlign: 'center', fontSize: '0.875rem',
                                            fontWeight: 600, borderRadius: 40, textDecoration: 'none',
                                            marginBottom: 24, transition: 'all 0.2s ease',
                                            background: plan.popular ? '#D97706' : '#000',
                                            color: plan.popular ? '#000' : '#fff',
                                            border: 'none',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {plan.cta}
                                    </a>

                                    {/* Features List */}
                                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 16 }}>
                                        {plan.features.map((feature, i) => (
                                            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                                                <div style={{
                                                    width: 18, height: 18, borderRadius: '50%', flexShrink: 0, marginTop: 0,
                                                    background: plan.popular ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                }}>
                                                    <Check style={{ width: 9, height: 9, color: plan.popular ? '#FCD34D' : '#D97706' }} />
                                                </div>
                                                <span style={{ fontSize: '0.8rem', color: plan.popular ? 'rgba(255,255,255,0.8)' : '#52525b', lineHeight: 1.5 }}>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Plan Disclaimer */}
                                    {plan.disclaimer && (
                                        <p style={{
                                            fontSize: '0.7rem', color: plan.popular ? 'rgba(255,255,255,0.5)' : '#a1a1aa',
                                            fontStyle: 'italic', paddingTop: 12, borderTop: plan.popular ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)',
                                        }}>
                                            {plan.disclaimer}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Premium Positioning Strip */}
                        <div className="premium-positioning-strip">
                            <h3>More than legal advice. NyayMitra acts as your startup's operational legal infrastructure layer.</h3>
                            <div className="premium-bullets">
                                <div className="premium-bullet">Compliance Coordination</div>
                                <div className="premium-bullet">Documentation Workflows</div>
                                <div className="premium-bullet">Startup Legal Ops</div>
                                <div className="premium-bullet">Multi-city Execution</div>
                                <div className="premium-bullet">Founder Risk Management</div>
                            </div>
                        </div>

                        {/* Pricing Footer with Disclaimer */}
                        <div style={{ marginTop: 48, textAlign: 'center', paddingTop: 32, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                            {/* <p style={{ fontSize: '0.75rem', color: '#a1a1aa', maxWidth: 600, margin: '0 auto 16px' }}>
                                <strong style={{ color: '#0a0a0a' }}>All plans include:</strong> Free AI consultation · Verified lawyers · 100% confidential
                            </p> */}
                            <p style={{ fontSize: '0.7rem', color: '#a1a1aa', maxWidth: 700, margin: '0 auto', fontStyle: 'italic' }}>
                                <strong style={{ color: '#0a0a0a' }}>Important:</strong> Government fees, statutory charges, litigation, court representation, and external professional services are billed separately where applicable.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════════════
                    EXECUTION & COMPLIANCE SERVICES SECTION
                ══════════════════════════════════════════════════════ */}
                <section className="nm-section" style={{ background: '#fff' }}>
                    <div className="nm-container">
                        {/* Services Header */}
                        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 8vw, 4rem)' }}>
                            <p className="brand-line">LEGAL SUPPORT</p>
                            <h2 className="nm-display" style={{
                                fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', fontWeight: 700, color: '#0a0a0a',
                                letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 16
                            }}>
                                {t.servicesHeading}
                            </h2>
                            <p style={{
                                fontSize: '0.95rem', color: '#71717a', maxWidth: 520, margin: '0 auto', lineHeight: 1.6
                            }}>
                                {t.servicesSub}
                            </p>
                        </div>

                        {/* Services Grid */}
                        <div className="services-grid">
                            {services.map((service) => (
                                <a
                                    key={service.id}
                                    href={whatsappIntentGeneral}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`service-tile ${service.highlight ? 'highlight' : ''}`}
                                    onMouseEnter={() => setHoveredService(service.id)}
                                    onMouseLeave={() => setHoveredService(null)}
                                >
                                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                                        <div className="service-icon-wrapper">
                                            {service.icon}
                                        </div>
                                        {service.highlight && (
                                            <span style={{
                                                fontSize: '9px', fontWeight: 700, color: '#D97706',
                                                background: '#FEF3C7', padding: '4px 8px', borderRadius: '999px',
                                                whiteSpace: 'nowrap', letterSpacing: '0.08em'
                                            }}>
                                                FEATURED
                                            </span>
                                        )}
                                    </div>

                                    <div>
                                        <h3 className="service-title">
                                            {service.title}
                                        </h3>
                                        <p className="service-desc">
                                            {service.desc}
                                        </p>
                                    </div>

                                    <p className="service-price">
                                        {service.price}
                                    </p>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════════════
                    HOW NYAYMITRA WORKS — NEW 3-STEP WORKFLOW
                ══════════════════════════════════════════════════════ */}
                <section className="nm-section" style={{ background: '#fafafa' }}>
                    <div className="nm-container">
                        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 6vw, 4rem)' }}>
                            <p className="brand-line">{t.fromConfusion}</p>
                            <h2 className="nm-display" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 12 }}>
                                {t.howItWorks}
                            </h2>
                            <p style={{ fontSize: '0.9rem', color: '#71717a', maxWidth: 500, margin: '0 auto' }}>
                                {t.howItWorksSub}
                            </p>
                        </div>

                        <div className="nm-grid nm-grid-3" style={{ gap: '0.5rem', position: 'relative' }}>
                            {steps.map((step, idx) => (
                                <div key={idx} style={{ position: 'relative', padding: 'clamp(1.25rem, 4vw, 2rem)', borderRadius: 20, background: '#fff', border: '1px solid rgba(0,0,0,0.07)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
                                        <span className="nm-display" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: 700, color: 'rgba(0,0,0,0.05)', lineHeight: 1 }}>{step.number}</span>
                                        <div style={{ width: 40, height: 40, borderRadius: 12, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706' }}>
                                            {step.icon}
                                        </div>
                                    </div>
                                    <h3 className="nm-body" style={{ fontSize: '1rem', fontWeight: 600, color: '#0a0a0a', marginBottom: 8 }}>{step.title}</h3>
                                    <p style={{ fontSize: '0.75rem', color: '#71717a', lineHeight: 1.6, marginBottom: 16 }}>{step.description}</p>
                                    <div style={{
                                        display: 'inline-flex', alignItems: 'center', gap: 5,
                                        padding: '4px 10px', borderRadius: 999,
                                        background: '#FEF3C7', border: '1px solid #FCD34D',
                                    }}>
                                        <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#D97706' }} />
                                        <span className="nm-ui" style={{ fontSize: 10, fontWeight: 600, color: '#92400E' }}>{step.detail}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════════════
                    TRUST SECTION
                ══════════════════════════════════════════════════════ */}
                <section className="nm-section" style={{ background: '#fff' }}>
                    <div className="nm-container">
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: 'clamp(2rem, 5vw, 3rem)',
                            alignItems: 'center'
                        }}
                            className="responsive-trust-grid"
                        >
                            <style>{`
                                @media (max-width: 768px) {
                                    .responsive-trust-grid {
                                        grid-template-columns: 1fr !important;
                                        gap: 2rem !important;
                                    }
                                }
                            `}</style>

                            <div>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px 4px 8px', borderRadius: 999, background: '#FEF3C7', border: '1px solid #FCD34D', marginBottom: 20 }}>
                                    <Award style={{ width: 12, height: 12, color: '#D97706' }} />
                                    <span className="nm-ui" style={{ fontSize: 9, fontWeight: 700, color: '#92400E', letterSpacing: '0.12em' }}>{t.realResults}</span>
                                </div>
                                <h2 className="nm-display" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 12 }}>
                                    {t.trustHeading}
                                </h2>
                                <p style={{ fontSize: '0.875rem', color: '#71717a', marginBottom: 28, lineHeight: 1.6 }}>
                                    {t.trustSub}
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {trustProofs.map((proof, idx) => (
                                        <div key={idx} style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                            padding: '0.8rem 1rem',
                                            borderRadius: 12, border: '1px solid rgba(0,0,0,0.07)',
                                            background: '#fafafa', flexWrap: 'wrap', gap: 8,
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                <div style={{ width: 32, height: 32, borderRadius: 9, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706', flexShrink: 0 }}>
                                                    {proof.icon}
                                                </div>
                                                <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#0a0a0a' }}>{proof.text}</span>
                                            </div>
                                            <span className="nm-ui" style={{ fontSize: 10, fontWeight: 600, color: '#D97706', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{proof.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', inset: -10, borderRadius: 24, background: 'linear-gradient(135deg, #FEF3C7, #fff)', border: '1px solid #FCD34D', zIndex: 0 }} />
                                <div style={{ position: 'relative', zIndex: 1, background: '#fff', borderRadius: 20, padding: 'clamp(1.25rem, 4vw, 2rem)', border: '1px solid rgba(0,0,0,0.08)' }}>
                                    <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} style={{ width: 14, height: 14, color: '#D97706', fill: '#D97706' }} />
                                        ))}
                                    </div>
                                    <div className="nm-display" style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)', lineHeight: 0.8, color: '#D97706', marginBottom: 6, fontWeight: 400 }}>"</div>
                                    <p className="nm-body" style={{ fontSize: '0.875rem', color: '#27272a', lineHeight: 1.65, fontStyle: 'italic', marginBottom: 24 }}>
                                        {t.testimonialText}
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 20, borderTop: '1px solid rgba(0,0,0,0.08)', flexWrap: 'wrap' }}>
                                        <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span className="nm-display" style={{ fontSize: 16, fontWeight: 700, color: '#D97706' }}>A</span>
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0a0a0a' }}>{t.testimonialName}</p>
                                            <p style={{ fontSize: '0.625rem', color: '#a1a1aa' }}>{t.testimonialTitle}</p>
                                        </div>
                                        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <Check style={{ width: 10, height: 10, color: '#10b981' }} />
                                            <span style={{ fontSize: 10, color: '#10b981', fontWeight: 600 }}>{t.verified}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════════════
                    FINAL CTA
                ══════════════════════════════════════════════════════ */}
                <section style={{ background: '#000', padding: 'clamp(2rem, 6vw, 4rem) 1.5rem', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
                    <div className="nm-container" style={{ textAlign: 'center', position: 'relative' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', marginBottom: 24 }}>
                            <MessageCircle style={{ width: 10, height: 10, color: '#D97706' }} />
                            <span className="nm-ui" style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.14em' }}>{t.fromConfusion}</span>
                        </div>
                        <h2 className="nm-display" style={{ fontSize: 'clamp(1.75rem, 6vw, 3.5rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: 16 }}>
                            {t.finalHeading}<br />
                            <span style={{ color: '#D97706', fontStyle: 'italic' }}>{t.finalHeadingGold}</span>
                        </h2>
                        <p className="nm-body" style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', maxWidth: 420, margin: '0 auto 32px', lineHeight: 1.6 }}>
                            {t.finalDesc}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBottom: 24 }}>
                            <a href={whatsappIntentGeneral} target="_blank" rel="noopener noreferrer" className="nm-ui" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0.7rem 1.75rem', background: '#D97706', color: '#000', borderRadius: 40, fontSize: '0.8125rem', fontWeight: 700, textDecoration: 'none' }}>
                                <WaSvg size={14} /> {t.ctaFinal}
                            </a>
                        </div>
                        <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)' }}>
                            {t.noCard}
                        </p>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════════════
                    FOOTER
                ══════════════════════════════════════════════════════ */}
                <footer style={{ background: '#fafafa', borderTop: '1px solid rgba(0,0,0,0.07)', padding: 'clamp(1.5rem, 5vw, 3rem) 1.5rem 1.5rem' }}>
                    <div className="nm-container" style={{ maxWidth: 1280, margin: '0 auto' }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
                            gap: 'clamp(1.5rem, 4vw, 2.5rem)',
                            marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)'
                        }}>
                            <div style={{ gridColumn: 'span 2' }} className="responsive-footer-brand">
                                <style>{`
                    @media (max-width: 640px) {
                        .responsive-footer-brand {
                            grid-column: span 1 !important;
                        }
                        .footer-bottom {
                            flex-direction: column !important;
                            align-items: flex-start !important;
                            text-align: left !important;
                        }
                        .footer-disclaimer {
                            text-align: left !important;
                            max-width: 100% !important;
                        }
                    }
                `}</style>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                                    <div style={{ width: 28, height: 28, background: '#000', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Scale style={{ width: 13, height: 13, color: '#D97706' }} />
                                    </div>
                                    <span className="nm-display" style={{ fontSize: 16, fontWeight: 700, color: '#0a0a0a' }}>NyayMitra</span>
                                </div>
                                <p style={{ fontSize: 12, color: '#71717a', maxWidth: 240, lineHeight: 1.6, marginBottom: 20 }}>
                                    Making legal help accessible to every Indian founder. Plain language, verified lawyers, transparent pricing.
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
                                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 16, flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: 10, color: '#a1a1aa', marginRight: 4 }}>Follow us</span>
                                    {[
                                        { icon: <Instagram style={{ width: 13, height: 13 }} />, href: "https://www.instagram.com/nyaymitra.tech", label: "Instagram" },
                                        { icon: <Linkedin style={{ width: 13, height: 13 }} />, href: "https://www.linkedin.com/company/nyaymitra-tech-pvt-ltd", label: "LinkedIn" },
                                    ].map(s => (
                                        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                                            style={{ width: 28, height: 28, borderRadius: 8, border: '1px solid rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a1a1aa', textDecoration: 'none' }}>
                                            {s.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {Object.entries(footerLinks).map(([heading, links]) => (
                                <div key={heading}>
                                    <h4 className="nm-ui" style={{ fontSize: 9, fontWeight: 700, color: '#a1a1aa', letterSpacing: '0.15em', marginBottom: 14 }}>
                                        {heading.toUpperCase()}
                                    </h4>
                                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, padding: 0, margin: 0 }}>
                                        {links.map(link => (
                                            <li key={link.label}>
                                                <a href={link.href} className="hover-underline" style={{ fontSize: 12, color: '#71717a', textDecoration: 'none' }}>
                                                    {link.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Fixed Bottom Section */}
                        <div className="footer-bottom" style={{
                            borderTop: '1px solid rgba(0,0,0,0.07)',
                            paddingTop: 20,
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 16
                        }}>
                            <p style={{ fontSize: 10, color: '#a1a1aa', margin: 0, flexShrink: 0 }}>
                                © 2026 NyayMitra. All rights reserved.
                            </p>
                            <p className="footer-disclaimer" style={{
                                fontSize: 10,
                                color: '#a1a1aa',
                                maxWidth: 480,
                                textAlign: 'right',
                                lineHeight: 1.5,
                                margin: 0,
                                flex: '1 1 auto'
                            }}>
                                <span style={{ color: '#71717a', fontWeight: 600 }}>Disclaimer: </span>
                                {t.disclaimer}
                            </p>
                        </div>
                    </div>
                </footer>
                {/* Floating WhatsApp */}
                <a href={whatsappIntentGeneral} target="_blank" rel="noopener noreferrer"
                    style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 50, width: 48, height: 48, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                    <WaSvg size={22} />
                </a>
            </div>
        </>
    )
}