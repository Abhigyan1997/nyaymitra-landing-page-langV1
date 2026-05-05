"use client"

import { useState, useEffect, useRef } from "react"
import {
    Check, Zap, Shield, Users, FileText, MessageCircle,
    ArrowRight, Star, Clock, Scale, AlertCircle, TrendingUp,
    Award, ThumbsUp, Sparkles, Menu, X, Instagram, Linkedin,
    MapPin, Mail, PhoneCall, ChevronRight, Gavel, Bot, XCircle, Languages
} from "lucide-react"

// ─────────────────────────────────────────────────────────────────
// HINDI TRANSLATIONS (KEY TEXT ONLY)
// ─────────────────────────────────────────────────────────────────
const hindiTranslations = {
    // Nav
    navServices: "सेवाएं",
    navFindLawyers: "वकील खोजें",
    navLegalGPT: "लीगल GPT",
    navPricing: "कीमतें",
    navAbout: "हमारे बारे में",
    // Hero
    riskAlert: "जोखिम अलर्ट",
    startupsProtected: "100+ स्टार्टअप सुरक्षित",
    heroHeadline: "एक बुरा अनुबंध आपके स्टार्टअप को",
    heroHeadlineGold: "महंगा न पड़ने दें।",
    heroDesc: "कानूनी स्पष्टता प्राप्त करें और समस्याओं को महंगी गलतियाँ बनने से पहले ठीक करें।",
    heroPrice: "₹999/माह से शुरू",
    ctaWhatsapp: "व्हाट्सएप पर मदद लें",
    ctaPlans: "योजनाएं देखें",
    noCommitment: "कोई दीर्घकालिक प्रतिबद्धता नहीं",
    cancelAnytime: "कभी भी रद्द करें",
    freeTrial: "14-दिन का निःशुल्क परीक्षण",
    live: "लाइव",
    fromConfusion: "भ्रम से कार्रवाई तक",
    aiPowered: "एआई-संचालित · 24/7 · हिंदी और अंग्रेजी",
    verifiedLawyers: "60+ सत्यापित वकील",
    avgResponse: "औसत प्रतिक्रिया < 2 घंटे",
    // Risk Section
    realCost: "वास्तविक लागत",
    riskHeading: "यदि आप कानूनी को अनदेखा करते हैं तो क्या होगा?",
    riskSub: "छोटी चूक महंगी आपदाएँ बन जाती हैं।",
    riskTitle1: "आपने खराब अनुबंध पर हस्ताक्षर किए",
    riskConsequence1: "₹2L+ का वित्तीय नुकसान",
    riskOutcome1: "हम खामियों को ठीक करते हैं इससे पहले कि उनका दुरुपयोग हो",
    riskTitle2: "कोई सह-संस्थापक समझौता नहीं",
    riskConsequence2: "विवाद कंपनी को विभाजित करते हैं",
    riskOutcome2: "स्पष्ट स्वामित्व और निकास शर्तें",
    riskTitle3: "कानूनी नोटिस को अनदेखा करना",
    riskConsequence3: "अदालत में वृद्धि",
    riskOutcome3: "मुकदमेबाजी के बिना समाधान",
    fixBeforeExpensive: "महंगा होने से पहले ठीक करें →",
    // Pricing Section
    pricing: "कीमतें",
    pricingHeading: "चुनें कि आप कितना जोखिम हटाना चाहते हैं",
    pricingSub: "सभी योजनाओं में व्हाट्सएप पहुंच शामिल है। कभी भी रद्द करें।",
    mostPopular: "सबसे लोकप्रिय",
    outcomeStarter: "एक बुरे अनुबंध को ₹2L+ की लागत से बचाएं",
    outcomeGrowth: "अपने पूरे पहले वर्ष के लिए कानूनी सुरक्षा",
    outcomePro: "बिना पूर्णकालिक वकील के पूर्ण कानूनी कवरेज",
    ctaStarter: "₹999 योजना से शुरू करें →",
    ctaGrowth: "ग्रोथ योजना प्राप्त करें →",
    ctaPro: "कानूनी सलाहकार से बात करें →",
    monthly: "/माह",
    billedMonthly: "मासिक बिल · कभी भी रद्द करें",
    featureConsult1: "1 कानूनी परामर्श (30 मिनट)",
    featureReview1: "1 दस्तावेज़ समीक्षा और सुधार",
    featureWhatsapp1: "व्हाट्सएप सपोर्ट (48h)",
    featureTemplates1: "मानक टेम्पलेट",
    featureEmail1: "ईमेल सपोर्ट",
    featureConsult2: "3 परामर्श (45 मिनट प्रत्येक)",
    featureReview2: "3 दस्तावेज़ समीक्षा और सुधार",
    featureWhatsapp2: "प्राथमिकता व्हाट्सएप (12h)",
    featureDrafting2: "कस्टम अनुबंध निर्माण",
    featureChecklist2: "पूर्ण अनुपालन चेकलिस्ट",
    featureFounder2: "संस्थापक सुरक्षा समीक्षा",
    featureConsult3: "असीमित परामर्श",
    featureReview3: "असीमित दस्तावेज़ समीक्षा",
    featureWhatsapp3: "24/7 प्राथमिकता सपोर्ट",
    featureAdvisor3: "समर्पित कानूनी सलाहकार",
    featureAudit3: "कानूनी ऑडिट और अनुपालन",
    featureTermSheet3: "निवेश टर्म शीट समीक्षा",
    featureIP3: "आईपी और पेटेंट मार्गदर्शन",
    pricingDisclaimer: "सभी योजनाओं में शामिल: निःशुल्क एआई परामर्श · सत्यापित वकील · 100% गोपनीय",
    // How It Works
    howItWorks: "3 चरणों में कानूनी स्पष्टता प्राप्त करें",
    step1Title: "अपनी समस्या सादे शब्दों में बताएं",
    step1Desc: "जो आपको परेशान कर रहा है उसे साझा करें। हिंदी या अंग्रेजी। कानूनी शब्दजाल की आवश्यकता नहीं है।",
    step1Detail: "30 सेकंड में एआई पूर्व-विश्लेषण",
    step2Title: "स्पष्टता और अगले कदम प्राप्त करें",
    step2Desc: "हम आपकी स्थिति का विश्लेषण करते हैं और घंटों के भीतर एक स्पष्ट कार्य योजना देते हैं।",
    step2Detail: "< 2 घंटे में विशेषज्ञ मिलान",
    step3Title: "समस्या को लागत बनने से पहले ठीक करें",
    step3Desc: "दस्तावेज़ ठीक करवाएं, कानूनी नोटिस भेजें, या सत्यापित वकील से जुड़ें।",
    step3Detail: "24–48 घंटे में समाधान",
    // Trust Section
    realResults: "वास्तविक परिणाम",
    trustHeading: "संस्थापकों ने हमारे साथ क्या ठीक किया",
    trustSub: "वास्तविक समस्याएं, दिनों में हल। कोई अदालत नहीं, कोई महंगे वकील नहीं।",
    trustText1: "हस्ताक्षर करने से पहले एक खराब खंड को पकड़कर ₹80,000 बचाए",
    trustText2: "बिना अदालत के कानूनी नोटिस के माध्यम से ₹25,000 वसूले",
    trustText3: "सह-संस्थापक समझौते के साथ विवाद से बचा",
    trustText4: "कानूनी पत्र के साथ भुगतान में देरी रोकी",
    fixedTime1: "2 घंटे में ठीक हुआ",
    fixedTime2: "14 दिनों में हल",
    fixedTime3: "48 घंटे में तैयार",
    fixedTime4: "ग्राहक ने 7 दिनों में भुगतान किया",
    testimonialText: "\"NyayMitra ने हमें एक अनुबंध खंड को ठीक करने में मदद की जिसकी हमें ₹2.3 लाख की लागत आनी थी। ग्रोथ योजना ने पहले सप्ताह में ही अपनी लागत वसूल कर ली।\"",
    testimonialName: "अंकित शर्मा",
    testimonialTitle: "सह-संस्थापक, टेकस्टार्ट इंडिया",
    verified: "सत्यापित",
    // Final CTA
    finalHeading: "अनुमान लगाना बंद करें।",
    finalHeadingGold: "कार्रवाई शुरू करें।",
    finalDesc: "घंटों में स्पष्ट कानूनी मार्गदर्शन प्राप्त करें। 100+ स्टार्टअप से जुड़ें जिन्होंने NyayMitra के साथ अपना कानूनी जोखिम ठीक किया।",
    ctaFinal: "अभी कानूनी मदद लें",
    noCard: "कोई क्रेडिट कार्ड आवश्यक नहीं · निःशुल्क एआई परामर्श · कभी भी रद्द करें",
    // Footer
    disclaimer: "NyayMitra एक प्रौद्योगिकी मंच है। हम कानूनी फर्म के रूप में कार्य नहीं करते हैं। सभी परामर्श लाइसेंस प्राप्त तृतीय-पक्ष पेशेवरों द्वारा दिए जाते हैं।",
    quickLinks: "त्वरित लिंक",
    legal: "कानूनी",
}

// English original (default)
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
    heroPrice: "Starting at ₹999/month",
    ctaWhatsapp: "Get Help on WhatsApp",
    ctaPlans: "View Plans",
    noCommitment: "No long-term commitment",
    cancelAnytime: "Cancel anytime",
    freeTrial: "14-day free trial",
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
    // Pricing Section
    pricing: "PRICING",
    pricingHeading: "Choose how much risk you want to remove",
    pricingSub: "All plans include WhatsApp access. Cancel anytime.",
    mostPopular: "MOST POPULAR",
    outcomeStarter: "Stop one bad contract from costing you ₹2L+",
    outcomeGrowth: "Legal protection for your entire first year",
    outcomePro: "Complete legal coverage without a full-time lawyer",
    ctaStarter: "Start with ₹999 plan →",
    ctaGrowth: "Get Growth plan →",
    ctaPro: "Talk to legal advisor →",
    monthly: "/mo",
    billedMonthly: "Billed monthly · Cancel anytime",
    featureConsult1: "1 legal consultation (30 min)",
    featureReview1: "1 document review & fix",
    featureWhatsapp1: "WhatsApp support (48h)",
    featureTemplates1: "Standard templates",
    featureEmail1: "Email support",
    featureConsult2: "3 consultations (45 min each)",
    featureReview2: "3 document reviews & fixes",
    featureWhatsapp2: "Priority WhatsApp (12h)",
    featureDrafting2: "Custom contract drafting",
    featureChecklist2: "Full compliance checklist",
    featureFounder2: "Founder protection review",
    featureConsult3: "Unlimited consultations",
    featureReview3: "Unlimited document reviews",
    featureWhatsapp3: "24/7 priority support",
    featureAdvisor3: "Dedicated legal advisor",
    featureAudit3: "Legal audit & compliance",
    featureTermSheet3: "Investment term sheet review",
    featureIP3: "IP & patent guidance",
    pricingDisclaimer: "All plans include: Free AI consultation · Verified lawyers · 100% confidential",
    // How It Works
    howItWorks: "Get legal clarity in 3 steps",
    step1Title: "Tell your issue in plain words",
    step1Desc: "Share what's worrying you. Hindi or English. No legal jargon needed.",
    step1Detail: "AI pre-analysis in 30 seconds",
    step2Title: "Get clarity & next steps",
    step2Desc: "We analyze your situation and give you a clear action plan within hours.",
    step2Detail: "Expert matched in < 2 hours",
    step3Title: "Fix the problem before it costs you",
    step3Desc: "Get documents fixed, send legal notices, or connect with a verified lawyer.",
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
    testimonialText: "\"NyayMitra helped us fix a contract clause that would have cost us ₹2.3 lakhs. The Growth plan paid for itself in the first week.\"",
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
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [activeStep, setActiveStep] = useState(0)
    const [isHindi, setIsHindi] = useState(false)
    const heroRef = useRef(null)
    const [windowWidth, setWindowWidth] = useState(0)

    // Get current translations
    const t: Translations = isHindi ? hindiTranslations : englishTranslations

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

    // Close mobile menu on link click
    const handleNavClick = () => {
        setIsMenuOpen(false)
    }

    // Toggle language
    const toggleLanguage = () => {
        setIsHindi(!isHindi)
    }

    // WHATSAPP INTENT LINKS (SINGLE CONVERSION PATH)
    const whatsappNumber = "919661644025"
    const whatsappIntentStartup = `https://wa.me/${whatsappNumber}?text=I%20want%20the%20₹999%20startup%20legal%20plan`
    const whatsappIntentContract = `https://wa.me/${whatsappNumber}?text=I%20need%20help%20with%20contracts`
    const whatsappIntentGeneral = `https://wa.me/${whatsappNumber}?text=I%20need%20startup%20legal%20help`

    const navLinks = [
        { label: t.navServices, href: "/services" },
        { label: t.navFindLawyers, href: "/lawyers" },
        { label: t.navLegalGPT, href: "/legal-ai" },
        { label: t.navPricing, href: "#pricing" },
        { label: t.navAbout, href: "/about" },
    ]

    // OUTCOME-BASED PROBLEMS (RISK FOCUSED) - using translations
    const risks = [
        {
            icon: <XCircle className="w-5 h-5" />,
            title: t.riskTitle1,
            consequence: t.riskConsequence1,
            outcome: t.riskOutcome1
        },
        {
            icon: <AlertCircle className="w-5 h-5" />,
            title: t.riskTitle2,
            consequence: t.riskConsequence2,
            outcome: t.riskOutcome2
        },
        {
            icon: <TrendingUp className="w-5 h-5" />,
            title: t.riskTitle3,
            consequence: t.riskConsequence3,
            outcome: t.riskOutcome3
        }
    ]

    // Plan features with translations
    const plans = [
        {
            id: "starter",
            name: "Starter",
            tagline: "Pre-seed & solo founders",
            price: 999,
            yearlyPrice: 799,
            features: [
                t.featureConsult1,
                t.featureReview1,
                t.featureWhatsapp1,
                t.featureTemplates1,
                t.featureEmail1
            ],
            outcome: t.outcomeStarter,
            cta: t.ctaStarter,
            popular: false,
        },
        {
            id: "growth",
            name: "Growth",
            tagline: "For funded startups",
            price: 2999,
            yearlyPrice: 2399,
            features: [
                t.featureConsult2,
                t.featureReview2,
                t.featureWhatsapp2,
                t.featureDrafting2,
                t.featureChecklist2,
                t.featureFounder2
            ],
            outcome: t.outcomeGrowth,
            cta: t.ctaGrowth,
            popular: true,
        },
        {
            id: "pro",
            name: "Pro",
            tagline: "For scaling companies",
            price: 5999,
            yearlyPrice: 4799,
            features: [
                t.featureConsult3,
                t.featureReview3,
                t.featureWhatsapp3,
                t.featureAdvisor3,
                t.featureAudit3,
                t.featureTermSheet3,
                t.featureIP3
            ],
            outcome: t.outcomePro,
            cta: t.ctaPro,
            popular: false,
        }
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

    // OUTCOME-BASED TRUST PROOFS
    const trustProofs = [
        { text: t.trustText1, icon: <FileText className="w-4 h-4" />, time: t.fixedTime1 },
        { text: t.trustText2, icon: <ThumbsUp className="w-4 h-4" />, time: t.fixedTime2 },
        { text: t.trustText3, icon: <Users className="w-4 h-4" />, time: t.fixedTime3 },
        { text: t.trustText4, icon: <Clock className="w-4 h-4" />, time: t.fixedTime4 }
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

    // Responsive helper
    const isMobile = windowWidth < 768

    return (
        <>
            {/* ─── FONT INJECTION & RESPONSIVE STYLES ─── */}
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
                    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s ease; 
                }
                .plan-card:hover { 
                    transform: translateY(-4px); 
                    box-shadow: 0 24px 64px rgba(0,0,0,0.1); 
                }
                .plan-card.popular { 
                    transform: translateY(-8px); 
                    box-shadow: 0 32px 80px rgba(0,0,0,0.12); 
                }
                .plan-card.popular:hover { 
                    transform: translateY(-12px); 
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

                /* Hero gold text style */
                .gold-text {
                    color: #D97706;
                    font-style: italic;
                }
                .hero-headline {
                    font-family: 'Cormorant Garamond', serif;
                    font-weight: 700;
                    letter-spacing: -0.02em;
                }
            `}</style>

            <div className="min-h-screen bg-white overflow-x-hidden" style={{ color: '#0a0a0a' }}>

                {/* ══════════════════════════════════════════════════════
                    NAV — Sticky with blur, scrollable mobile menu
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

                            {/* CTA row with Language Toggle */}
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

                                {/* HINDI/ENGLISH TOGGLE BUTTON */}
                                <button
                                    onClick={toggleLanguage}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6,
                                        padding: '6px 12px',
                                        background: isHindi ? '#D97706' : '#000',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: 40,
                                        fontSize: 12,
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                    }}
                                    className="nm-ui"
                                >
                                    <Languages style={{ width: 14, height: 14 }} />
                                    {isHindi ? "English" : "हिंदी"}
                                </button>

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

                    {/* Mobile menu — scrollable with max-height */}
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
                                {/* Mobile language toggle */}
                                <button
                                    onClick={toggleLanguage}
                                    style={{
                                        padding: '6px 12px',
                                        background: isHindi ? '#D97706' : '#000',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: 40,
                                        fontSize: 12,
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6,
                                    }}
                                >
                                    <Languages style={{ width: 14, height: 14 }} />
                                    {isHindi ? "EN" : "हिं"}
                                </button>
                            </div>
                        </div>
                    )}
                </nav>

                {/* ══════════════════════════════════════════════════════
                    HERO — Refined, stylish, black & gold, compact size
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

                            {/* Left — stylish black & gold copy */}
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

                                {/* STYLISH GOLD HEADLINE — Cormorant Garamond, smaller, impactful */}
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
                                    {/* PRIMARY CTA: WHATSAPP - GOLD ACCENT */}
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
                                    {/* SECONDARY CTA */}
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
                                    {[t.noCommitment, t.cancelAnytime, t.freeTrial].map(text => (
                                        <span key={text} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: '#71717a' }}>
                                            <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#000', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                <Check style={{ width: 8, height: 8, color: '#fff' }} />
                                            </span>
                                            {text}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Right — Live card UI (preserved) */}
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

                {/* ── MARQUEE STRIP (PRESERVED) ── */}
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
                    RISK SECTION (PRESERVED)
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
                    PRICING SECTION (PRESERVED)
                ══════════════════════════════════════════════════════ */}
                <section id="pricing" className="nm-section" style={{ background: '#fff' }}>
                    <div className="nm-container">
                        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 6vw, 4rem)' }}>
                            <p className="brand-line">{t.pricing}</p>
                            <h2 className="nm-display" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 12 }}>
                                {t.pricingHeading}
                            </h2>
                            <p className="nm-body" style={{ fontSize: '0.875rem', color: '#71717a', maxWidth: 400, margin: '0 auto' }}>
                                {t.pricingSub}
                            </p>
                        </div>

                        <div className="nm-grid nm-grid-3" style={{ gap: '1.25rem', alignItems: 'start' }}>
                            {plans.map((plan) => (
                                <div key={plan.id}
                                    className={`plan-card ${plan.popular ? 'popular' : ''}`}
                                    style={{
                                        position: 'relative', borderRadius: 20, overflow: 'visible',
                                        border: plan.popular ? '2px solid #000' : '1px solid rgba(0,0,0,0.1)',
                                        background: plan.popular ? '#000' : '#fff',
                                        padding: plan.popular ? '1.75rem 1.5rem' : '1.5rem'
                                    }}
                                    onMouseEnter={() => setHoveredPlan(plan.id)}
                                    onMouseLeave={() => setHoveredPlan(null)}
                                >
                                    {plan.popular && (
                                        <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)' }}>
                                            <span className="nm-ui" style={{
                                                display: 'inline-flex', alignItems: 'center', gap: 4,
                                                padding: '4px 12px', background: '#D97706', color: '#fff',
                                                fontSize: 9, fontWeight: 700, borderRadius: 999, letterSpacing: '0.1em',
                                                boxShadow: '0 2px 8px rgba(217,119,6,0.3)', whiteSpace: 'nowrap',
                                            }}>
                                                <Zap style={{ width: 9, height: 9 }} /> {t.mostPopular}
                                            </span>
                                        </div>
                                    )}

                                    <div style={{ marginBottom: 20 }}>
                                        <p className="nm-ui" style={{ fontSize: 9, fontWeight: 700, color: plan.popular ? '#D97706' : '#a1a1aa', letterSpacing: '0.14em', marginBottom: 4 }}>
                                            {plan.tagline.toUpperCase()}
                                        </p>
                                        <h3 className="nm-display" style={{ fontSize: '1.5rem', fontWeight: 700, color: plan.popular ? '#fff' : '#0a0a0a', letterSpacing: '-0.02em' }}>
                                            {plan.name}
                                        </h3>
                                    </div>

                                    <p style={{ fontSize: '0.7rem', color: plan.popular ? '#FCD34D' : '#D97706', fontWeight: 500, marginBottom: 10 }}>
                                        {plan.outcome}
                                    </p>

                                    <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: `1px solid ${plan.popular ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}` }}>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 4, flexWrap: 'wrap' }}>
                                            <span className="nm-display" style={{ fontSize: '1rem', fontWeight: 600, color: plan.popular ? 'rgba(255,255,255,0.6)' : '#71717a' }}>₹</span>
                                            <span className="nm-display" style={{ fontSize: '2.5rem', fontWeight: 700, color: plan.popular ? '#fff' : '#0a0a0a', letterSpacing: '-0.03em', lineHeight: 1 }}>
                                                {plan.price.toLocaleString()}
                                            </span>
                                            <span style={{ fontSize: '0.7rem', color: plan.popular ? 'rgba(255,255,255,0.4)' : '#a1a1aa', marginLeft: 4 }}>{t.monthly}</span>
                                        </div>
                                        <p style={{ fontSize: 10, color: plan.popular ? 'rgba(255,255,255,0.35)' : '#a1a1aa' }}>{t.billedMonthly}</p>
                                    </div>

                                    <a
                                        href={plan.id === 'starter' ? whatsappIntentStartup : whatsappIntentGeneral}
                                        target="_blank" rel="noopener noreferrer"
                                        className="nm-ui"
                                        style={{
                                            display: 'block', width: '100%', padding: '11px 0',
                                            textAlign: 'center', fontSize: '0.8125rem',
                                            fontWeight: 600, borderRadius: 40, textDecoration: 'none',
                                            marginBottom: 24, transition: 'all 0.2s ease',
                                            background: plan.popular ? '#fff' : '#000',
                                            color: plan.popular ? '#000' : '#fff',
                                        }}
                                    >
                                        {plan.cta}
                                    </a>

                                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                                        {plan.features.map((feature, i) => (
                                            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                                                <div style={{
                                                    width: 16, height: 16, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                                                    background: plan.popular ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                }}>
                                                    <Check style={{ width: 8, height: 8, color: plan.popular ? '#FCD34D' : '#D97706' }} />
                                                </div>
                                                <span style={{ fontSize: '0.75rem', color: plan.popular ? 'rgba(255,255,255,0.75)' : '#52525b', lineHeight: 1.5 }}>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <p className="nm-body" style={{ textAlign: 'center', fontSize: '0.7rem', color: '#a1a1aa', marginTop: 32 }}>
                            {t.pricingDisclaimer}
                        </p>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════════════
                    HOW IT WORKS (PRESERVED)
                ══════════════════════════════════════════════════════ */}
                <section className="nm-section" style={{ background: '#fafafa' }}>
                    <div className="nm-container">
                        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 6vw, 4rem)' }}>
                            <p className="brand-line">{t.fromConfusion}</p>
                            <h2 className="nm-display" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 700, color: '#0a0a0a', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                                {t.howItWorks}
                            </h2>
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
                    TRUST SECTION (PRESERVED)
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
                                            padding: '0.7rem 1rem',
                                            borderRadius: 12, border: '1px solid rgba(0,0,0,0.07)',
                                            background: '#fafafa', flexWrap: 'wrap', gap: 8,
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                <div style={{ width: 30, height: 30, borderRadius: 9, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706', flexShrink: 0 }}>
                                                    {proof.icon}
                                                </div>
                                                <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#0a0a0a' }}>{proof.text}</span>
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
                    FINAL CTA — STRONG CLOSE, WHATSAPP ONLY
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
                    FOOTER (PRESERVED)
                ══════════════════════════════════════════════════════ */}
                <footer style={{ background: '#fafafa', borderTop: '1px solid rgba(0,0,0,0.07)', padding: 'clamp(1.5rem, 5vw, 3rem) 1.5rem 1.5rem' }}>
                    <div className="nm-container">
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
                                    }
                                `}</style>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                                    <div style={{ width: 28, height: 28, background: '#000', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Scale style={{ width: 13, height: 13, color: '#D97706' }} />
                                    </div>
                                    <span className="nm-display" style={{ fontSize: 16, fontWeight: 700, color: '#0a0a0a' }}>NyayMitra</span>
                                </div>
                                <p style={{ fontSize: 12, color: '#71717a', maxWidth: 240, lineHeight: 1.6, marginBottom: 20 }}>
                                    Making legal help accessible to every Indian plain language, verified lawyers, transparent pricing.
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
                                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
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

                        <div style={{ borderTop: '1px solid rgba(0,0,0,0.07)', paddingTop: 20, display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                            <p style={{ fontSize: 10, color: '#a1a1aa' }}>© 2026 NyayMitra. All rights reserved.</p>
                            <p style={{ fontSize: 10, color: '#a1a1aa', maxWidth: 480, textAlign: 'right', lineHeight: 1.5 }}>
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