"use client"

import { useState, useEffect, type ReactNode } from "react"
import {
    Check, Scale, Gavel, Menu, X, Instagram, Linkedin, Mail, PhoneCall,
    ChevronDown, ChevronRight, ArrowRight, FileText, Shield, Building, Users,
    MapPin, FolderOpen, Calendar, Workflow, Handshake, Activity, Clock
} from "lucide-react"

// ─── WHATSAPP (existing number, unchanged) ───────────────────────────────────
const WA = "919661644025"
const wa = (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`
const waGeneral = wa("I want to talk to NyayMitra about my business legal requirements")
const waLitigation = wa("I need help with a litigation / court representation matter")

// ─── TYPES ───────────────────────────────────────────────────────────────────
type Plan = {
    id: string
    name: string
    price: number
    positioning: string
    bestFor: string
    features: string[]
    popular?: boolean
}
type Cell = boolean | string
type MatrixRow = { label: string; values: [Cell, Cell, Cell, Cell, Cell] }
type Pillar = { id: string; title: string; icon: ReactNode; items: string[]; note?: string }

// ─── PLANS (single source of truth, monthly INR retainers) ───────────────────
const plans: Plan[] = [
    {
        id: "essentials", name: "Legal Essentials", price: 10000,
        positioning: "Essential legal support for early stage businesses.",
        bestFor: "Founders, small startups and businesses with basic ongoing legal requirements.",
        features: [
            "Legal request intake and coordination",
            "Up to 1 standard agreement draft per month",
            "Up to 1 standard agreement review per month",
            "Up to 4 scheduled consultation/coordination hours per month",
            "Basic corporate document organisation",
            "Basic compliance deadline reminders based on information provided",
            "Routine legal query coordination",
            "Access to the NyayMitra workspace, subject to available features",
            "Monthly activity summary",
            "Coordination with your existing CA, CS or advocate",
        ],
    },
    {
        id: "startupOps", name: "Startup Legal Operations", price: 25000, popular: true,
        positioning: "A structured legal operations system for growing startups.",
        bestFor: "Startups with employees, vendors, customers, commercial contracts and recurring compliance needs.",
        features: [
            "Up to 2 standard agreement drafts per month",
            "Up to 2 standard agreement reviews per month",
            "Up to 8 scheduled consultation/coordination hours per month",
            "Contract register with status, owner and important dates",
            "Compliance calendar and deadline tracking",
            "Corporate document repository and organisation",
            "Legal request tracking and follow ups",
            "Coordination with external CA, CS and advocates",
            "HR and vendor documentation coordination",
            "Monthly legal operations report and review meeting",
            "Access to the NyayMitra business workspace",
        ],
    },
    {
        id: "businessDesk", name: "Business Legal Desk", price: 50000,
        positioning: "Managed legal operations for established and scaling businesses.",
        bestFor: "Companies with regular commercial agreements, employee documentation, vendor relationships and multiple legal requirements.",
        features: [
            "Up to 4 standard agreement drafts per month",
            "Up to 4 standard agreement reviews per month",
            "Up to 16 scheduled consultation/coordination hours per month",
            "Contract lifecycle coordination: intake, review, approval, execution and renewal tracking",
            "Vendor, customer, employment and commercial documentation",
            "Compliance calendar and obligation tracking",
            "Corporate records and document management",
            "Legal request prioritisation and escalation",
            "CA, CS and advocate coordination",
            "Monthly management report and review",
            "Legal risk and pending task tracking",
        ],
    },
    {
        id: "advancedOps", name: "Advanced Legal Operations", price: 75000,
        positioning: "Advanced legal operations across departments and business functions.",
        bestFor: "High activity companies, multiple location businesses and companies with substantial recurring legal work.",
        features: [
            "Up to 6 standard agreement drafts per month",
            "Up to 6 standard agreement reviews per month",
            "Up to 24 scheduled consultation/coordination hours per month",
            "Department level legal request coordination",
            "Advanced contract and renewal tracking",
            "Compliance ownership matrix and periodic status reviews",
            "HR, vendor, customer and corporate documentation coordination",
            "Legal risk register and issue escalation tracking",
            "Coordination with specialist legal professionals",
            "Monthly management report and review",
            "Cross functional coordination with management, HR and finance",
            "Priority request handling under a defined SLA",
        ],
    },
    {
        id: "fractionalOffice", name: "Fractional Legal Operations Office", price: 100000,
        positioning: "A managed legal operations function for funded and high growth companies.",
        bestFor: "Businesses with substantial ongoing legal activity, multiple departments and complex coordination requirements.",
        features: [
            "Up to 8 standard agreement drafts per month",
            "Up to 8 standard agreement reviews per month",
            "Up to 32 scheduled consultation/coordination hours per month",
            "Dedicated legal operations coordination",
            "Centralised contract, compliance and corporate document management",
            "Legal request intake, prioritisation, assignment and follow ups",
            "Coordination with founders, HR, finance, CA, CS and advocates",
            "Periodic legal risk and compliance status reporting",
            "Quarterly legal operations planning",
            "Priority coordination and management escalation",
            "Customised workflows based on business requirements",
        ],
    },
]

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`
const planWa = (p: Plan) => wa(`I want to enquire about the ${p.name} plan (${inr(p.price)}/month)`)

type Capacity = { stage: string; outcome: string; drafts: number; reviews: number; hours: number; report: string }
const capacity: Record<string, Capacity> = {
    essentials: { stage: "Early stage", outcome: "Your basic legal paperwork, deadlines and advisor coordination, handled in one place.", drafts: 1, reviews: 1, hours: 4, report: "Monthly activity summary" },
    startupOps: { stage: "Growing", outcome: "A working legal operations system: contract register, compliance calendar and a monthly review with our team.", drafts: 2, reviews: 2, hours: 8, report: "Monthly operations report and review meeting" },
    businessDesk: { stage: "Scaling", outcome: "Contracts managed from intake to renewal, with escalation, risk tracking and management reporting.", drafts: 4, reviews: 4, hours: 16, report: "Monthly management report and review" },
    advancedOps: { stage: "Multi department", outcome: "Legal work coordinated across departments, with a risk register and priority handling under a defined SLA.", drafts: 6, reviews: 6, hours: 24, report: "Management report with risk register" },
    fractionalOffice: { stage: "High growth", outcome: "A managed legal operations function with dedicated coordination and quarterly planning.", drafts: 8, reviews: 8, hours: 32, report: "Periodic reporting and quarterly planning" },
}
const dashMetrics = [
    { label: "Compliance health", value: "92%", sub: "3 actions due", icon: <Activity style={{ width: 15, height: 15 }} /> },
    { label: "Active contracts", value: "7", sub: "2 under review", icon: <FileText style={{ width: 15, height: 15 }} /> },
    { label: "Open legal requests", value: "5", sub: "2 awaiting documents", icon: <Workflow style={{ width: 15, height: 15 }} /> },
    { label: "Pending tasks", value: "4", sub: "1 urgent", icon: <Clock style={{ width: 15, height: 15 }} /> },
    { label: "Upcoming deadlines", value: "3", sub: "Next one due this week", icon: <Calendar style={{ width: 15, height: 15 }} /> },
    { label: "Stored documents", value: "42", sub: "Organised and secured", icon: <FolderOpen style={{ width: 15, height: 15 }} /> },
]
const dashContracts: [string, string, boolean][] = [["Vendor agreement", "Under review", true], ["Client service agreement", "Signed", false], ["Employment agreements, 3 hires", "Drafting", true], ["Freelancer NDA", "Awaiting signature", true]]
const dashDeadlines: [string, string, boolean][] = [["GST return filing", "Due in 5 days", true], ["TDS payment", "Due in 3 weeks", false], ["Annual ROC filing", "Due next quarter", false], ["PF and ESI monthly", "Due in 5 weeks", false]]
const dashRequests: [string, number][] = [["Vendor agreement review", 70], ["Shop and Establishment documents", 45], ["Trademark filing coordination", 25], ["Employee policy set", 90]]
const dashActivity: [string, string][] = [["Compliance reminder sent to CA", "2h ago"], ["Vendor NDA reviewed and sent for signature", "Yesterday"], ["Shop and Establishment documents collected", "2 days ago"], ["Document vault updated", "3 days ago"]]
const marqueeItems = ["Legal Operations", "Contract Management", "Compliance Coordination", "Document Workflows", "Litigation Support", "Corporate Documentation", "Founder Protection", "MSME Support"]

const matrixRows: MatrixRow[] = [
    { label: "Legal request management", values: ["Intake", "Tracking & follow ups", "Prioritised, escalated", "Department level", "Intake to assignment"] },
    { label: "Legal operations workspace*", values: [true, true, true, true, true] },
    { label: "Document organisation", values: ["Basic", true, true, true, "Centralised"] },
    { label: "Contract repository", values: [false, true, true, true, true] },
    { label: "Standard agreement drafts / month", values: ["1", "2", "4", "6", "8"] },
    { label: "Standard agreement reviews / month", values: ["1", "2", "4", "6", "8"] },
    { label: "Consultation / coordination hours / month", values: ["4", "8", "16", "24", "32"] },
    { label: "Compliance calendar", values: ["Reminders", true, true, "Ownership matrix", true] },
    { label: "Legal risk tracking", values: [false, false, "Risks & pending tasks", "Risk register", "Periodic reporting"] },
    { label: "CA / CS / advocate coordination", values: [true, true, true, "Plus specialists", "Cross functional"] },
    { label: "HR and vendor documentation", values: [false, true, true, true, true] },
    { label: "Contract lifecycle management", values: [false, false, true, "Advanced renewals", true] },
    { label: "Monthly reporting", values: ["Activity summary", "Operations report", "Management report", "Management report", "Periodic status reports"] },
    { label: "Management reviews", values: [false, "Monthly", "Monthly", "Monthly", "Quarterly planning"] },
    { label: "Dedicated coordination", values: [false, false, false, false, true] },
    { label: "Department level workflows", values: [false, false, false, true, "Customised"] },
    { label: "Priority handling", values: [false, false, "Escalation", "Defined SLA", "Priority & escalation"] },
]

// ─── SERVICE PILLARS ─────────────────────────────────────────────────────────
const ic = "w-5 h-5"
const pillars: Pillar[] = [
    { id: "ops", title: "Legal Operations Management", icon: <Workflow className={ic} />, items: ["Legal request management", "Legal task tracking", "Professional coordination", "Document and workflow management", "Legal operations reporting", "Pending matter follow ups", "Legal risk tracking"] },
    { id: "contracts", title: "Contract & Agreement Services", icon: <FileText className={ic} />, items: ["Vendor, customer and client agreements", "Service and commercial agreements", "Nondisclosure agreements", "Employment and consultancy agreements", "Partnership, shareholder and founder agreements", "Review, revision and negotiation support", "Contract lifecycle management"], note: "Complex agreements and extensive negotiations may require separate scope and fees." },
    { id: "corporate", title: "Corporate & Business Legal Services", icon: <Building className={ic} />, items: ["Company incorporation coordination", "Private Limited, LLP and partnership documentation", "Founder and shareholder documentation", "Board resolutions and corporate records", "Corporate restructuring coordination", "Investor documentation and due diligence preparation"] },
    { id: "compliance", title: "Compliance & Regulatory Coordination", icon: <Calendar className={ic} />, items: ["Compliance calendar and statutory deadline tracking", "MCA related compliance coordination", "GST and tax coordination through qualified professionals", "Labour and employment compliance coordination", "Shop and Establishment registration coordination", "Business licence and registration coordination", "Documentation collection, follow ups, CA/CS coordination"], note: "Not every filing is included in a monthly retainer." },
    { id: "ip", title: "Intellectual Property Services", icon: <Shield className={ic} />, items: ["Trademark search and filing coordination", "Copyright registration coordination", "IP documentation and brand protection support", "Software and technology ownership documentation", "IP assignment and licensing agreements"], note: "Government filing fees and specialist professional fees are identified separately." },
    { id: "hr", title: "Employment & HR Legal Documentation", icon: <Users className={ic} />, items: ["Offer letters and employment agreements", "Consultant agreements", "HR and workplace policies", "Employee confidentiality agreements and NDAs", "Employee exit documentation", "Labour law coordination through qualified professionals"] },
    { id: "disputes", title: "Legal Notices, Recovery & Dispute Resolution", icon: <Scale className={ic} />, items: ["Legal notice drafting and coordination", "Payment recovery notices", "Contractual and commercial dispute assistance", "Negotiation and settlement coordination", "Legal assistance before litigation", "Arbitration and mediation coordination where appropriate", "Dispute documentation and case preparation coordination"] },
    { id: "litigation", title: "Litigation & Court Representation Coordination", icon: <Gavel className={ic} />, items: ["Nationwide advocate network and coordination", "Separately scoped and quoted", "Delivered by qualified, independent advocates"] },
]

const litigationCategories = [
    "Civil litigation", "Commercial and contractual disputes", "Cheque bounce matters under applicable law",
    "Recovery and money disputes", "Arbitration matters", "Company and shareholder disputes",
    "Employment and labour disputes", "Intellectual property disputes", "Consumer disputes",
    "Property and real estate disputes", "Criminal matters and defence representation, subject to case and advocate acceptance",
    "High Court matters", "District and subordinate court matters", "NCLT and other tribunals, where qualified professionals are available",
    "Appeals, quashing petitions and other specialised proceedings, subject to case assessment and jurisdiction",
]
const litigationSteps = [
    "Submit your legal issue and relevant documents.",
    "NyayMitra conducts an initial service intake and coordinates case assessment.",
    "An appropriately qualified advocate is identified based on the matter and jurisdiction.",
    "The advocate independently assesses the case and confirms engagement, scope and professional fees.",
    "NyayMitra coordinates communication, documents, updates and administrative follow ups where authorised.",
]
const litigationSafeguards = [
    "Litigation is not included in the monthly retainer plans. It is separately scoped and quoted.",
    "Advocate fees, court fees, filing fees, travel, clerical and other case expenses are disclosed separately.",
    "The advocate independently assesses and accepts each case.",
    "No case outcome, bail, quashing, injunction, recovery or judgment is ever guaranteed.",
    "Representation depends on advocate availability, case acceptance and jurisdiction.",
    "The advocate and client engagement is governed by applicable professional rules.",
]

const additionalServices = [
    "Company incorporation", "LLP registration", "Business restructuring documentation", "Contract drafting and review",
    "Founder and shareholder agreements", "Employment and HR documentation", "Trademark and IP coordination",
    "Compliance health checks", "Business licences and registrations", "Legal notices and payment recovery",
    "Arbitration and dispute support", "Litigation and court representation coordination",
    "Investor due diligence documentation", "Corporate legal documentation",
]

const workspaceFeatures = [
    "Legal requests and matter tracking", "Contract repository", "Secure document vault", "Compliance calendar",
    "Tasks and follow ups", "Team and professional coordination", "Activity timeline", "Legal operations reports",
    "Business document organisation", "Contract status and renewal tracking",
] // TODO(before publish): keep only features that are live for customers today

const cities = ["Bengaluru", "Delhi", "Mumbai", "Ahmedabad", "Hyderabad", "Kolkata", "Chennai", "Pune", "Jaipur", "Patna"]

const journey = [
    { title: "Tell Us Your Requirement", desc: "Share your business, contract, compliance or dispute related requirement." },
    { title: "Assessment & Scope", desc: "We understand the requirement, review available documents and determine the appropriate professional support." },
    { title: "Professional Coordination", desc: "We coordinate with the relevant lawyer, CA, CS or specialist advocate, as applicable." },
    { title: "Execution & Tracking", desc: "The work progresses through defined tasks, communication, documentation and follow ups." },
    { title: "Visibility & Ongoing Support", desc: "You receive updates, organised records and visibility into pending and completed work." },
]

const traditional = [
    "Professional advice and specialist legal services",
    "Separate communication channels",
    "Client may need to coordinate multiple professionals",
    "Contract work may be managed separately from compliance",
    "Business documents can be spread across email and messaging platforms",
]
const nyay = [
    "Managed legal operations layer",
    "One coordinated point of contact",
    "Contract and document organisation",
    "Legal request and workflow tracking",
    "Compliance deadline visibility",
    "Coordination with your existing advisors",
    "Access to specialist legal professionals and litigation coordination across India",
]

const scopeItems = [
    "Standard drafting and review limits are defined by the selected monthly plan.",
    "Complex agreements, extensive negotiations and substantial redrafting may require additional fees.",
    "Litigation and court representation are available as separately scoped services.",
    "Advocate fees and case related expenses are separately quoted.",
    "Government fees, statutory charges, stamp duty and filing costs are additional unless expressly stated otherwise.",
    "External CA, CS and specialist professional fees are disclosed separately where applicable.",
    "Tax filings and statutory certifications are performed by appropriately qualified professionals.",
    "No legal outcome or court result is guaranteed.",
    "Each legal engagement is subject to professional assessment, acceptance and applicable rules.",
]

const faqs = [
    { q: "What exactly does NyayMitra do?", a: "NyayMitra is a technology enabled legal operations and professional coordination platform. We help businesses manage contracts, corporate documentation, compliance coordination, legal requests and disputes through one organised partner, and coordinate qualified lawyers, CAs, CSs and advocates where specialist work is needed." },
    { q: "Is NyayMitra a law firm?", a: "No. NyayMitra is not a law firm, and not an advocate, CA or CS practice. Legal advice, drafting, filings, appearances and representation are delivered by appropriately qualified and authorised professionals, who are responsible for their professional work under applicable Indian laws and professional rules." },
    { q: "How is NyayMitra different from hiring a lawyer directly?", a: "A lawyer provides legal expertise. NyayMitra adds a legal operations layer: one point of contact, organised documents, request and deadline tracking, and coordination across the professionals you work with. You can still hire a lawyer directly; we work alongside them." },
    { q: "Can NyayMitra work with my existing CA, CS and lawyer?", a: "Yes. Every plan includes coordination with your existing advisors. We do not replace them. Where you need additional specialists, we can coordinate those as well." },
    { q: "Do your monthly plans include contract drafting?", a: "Yes, within stated limits. Each plan includes a set number of standard agreement drafts and reviews per month, from 1 each in Legal Essentials to 8 each in the Fractional Legal Operations Office." },
    { q: "Are agreement drafting and reviews unlimited?", a: "No. The monthly limits are caps for standard work. Complex agreements, extensive negotiations and substantial redrafting may require separate scope and fees." },
    { q: "Can NyayMitra help with company incorporation?", a: "Yes. We coordinate incorporation and related documentation for Private Limited Companies, LLPs and partnerships as a standalone service. Government fees and stamp duty are additional." },
    { q: "Can NyayMitra coordinate GST, MCA and statutory compliance?", a: "We coordinate compliance tracking, documentation collection and follow ups with qualified CAs and CSs. Tax filings and statutory certifications are performed by appropriately qualified professionals. Not every filing is included in a monthly retainer, and filing and professional fees may be separate." },
    { q: "Does NyayMitra provide litigation and court representation?", a: "We coordinate access to qualified advocates for litigation and dispute matters. Representation is provided by the advocate, who independently assesses and accepts the case. NyayMitra itself does not appear in court." },
    { q: "Can you help with cases anywhere in India?", a: "We work through a nationwide advocate network and coordination model, subject to advocate availability, case acceptance and jurisdictional requirements. We cannot promise representation in every court or location without confirming availability first." },
    { q: "How does nationwide litigation coordination work?", a: "You submit your issue and documents, we run an initial intake, and we identify a suitably qualified advocate for the matter and jurisdiction. The advocate assesses the case and confirms engagement, scope and fees. NyayMitra then coordinates communication, documents, updates and administrative follow ups where authorised." },
    { q: "Are advocate fees included in the monthly retainer?", a: "No. Litigation and court representation are separately scoped and quoted. Advocate fees are confirmed by the advocate and disclosed before engagement." },
    { q: "Are court fees and filing charges included?", a: "No. Court fees, filing fees, stamp duty, travel, clerical expenses and other case related costs are additional and disclosed separately." },
    { q: "Can I engage NyayMitra for only one legal service?", a: "Yes. Monthly retainers are not the only option. You can request a quote for a single service such as incorporation, a contract, a trademark, a legal notice or a dispute matter." },
    { q: "Is the NyayMitra workspace included in the plans?", a: "Plans include access to the NyayMitra workspace, subject to the features available at the time. Some tracking and reporting is currently coordinated by our team." },
    { q: "How do I get started?", a: "Message us on WhatsApp with your requirement, or choose a plan and tap its enquiry button. We will review what you share and recommend the right scope." },
]

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function StartupLegalPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [openFaq, setOpenFaq] = useState<number | null>(null)
    const [activePlan, setActivePlan] = useState(1)
    const plan = plans[activePlan]
    const cap = capacity[plan.id]

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    const navLinks = [
        { label: "Services", href: "#services" },
        { label: "Litigation", href: "#litigation" },
        { label: "Find Lawyers", href: "/lawyers" },
        { label: "Legal AI", href: "/legal-ai" },
        { label: "Pricing", href: "#pricing" },
        { label: "About", href: "/about" },
    ]

    const renderCell = (v: Cell) => {
        if (v === false) return <span className="nm-dash">Not included</span>
        if (v === true) return <Check style={{ width: 16, height: 16, color: "#D97706" }} />
        return <span style={{ fontSize: 11.5, fontWeight: 600, color: "#27272a" }}>{v}</span>
    }

    const eyebrow = (text: string) => <span className="brand-line">{text}</span>
    const h2 = (text: string) => <h2 className="nm-h2">{text}</h2>

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization", "@id": "https://nyaymitra.com/#organization",
                name: "NyayMitra Technologies Private Limited", url: "https://nyaymitra.com",
                description: "Technology enabled legal operations and professional coordination platform for businesses across India. Not a law firm.",
                contactPoint: { "@type": "ContactPoint", telephone: "+91 79705 96183", contactType: "customer support" },
                sameAs: ["https://www.instagram.com/mynyaymitra.in", "https://www.linkedin.com/company/nyaymitra-tech-pvt-ltd"],
            },
            {
                "@type": "BreadcrumbList",
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: "https://nyaymitra.com" },
                    { "@type": "ListItem", position: 2, name: "Legal Operations Plans", item: "https://nyaymitra.com/startup-legal-plans" },
                ],
            },
            {
                "@type": "FAQPage",
                mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
            },
            ...plans.map(p => ({
                "@type": "Service", name: p.name, description: p.positioning,
                provider: { "@id": "https://nyaymitra.com/#organization" }, areaServed: { "@type": "Country", name: "India" },
                offers: {
                    "@type": "Offer", priceCurrency: "INR", url: "https://nyaymitra.com/startup-legal-plans#pricing",
                    priceSpecification: { "@type": "UnitPriceSpecification", price: p.price, priceCurrency: "INR", unitText: "MONTH" },
                },
            })),
        ],
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Syne:wght@400;500;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
                html { scroll-behavior: smooth; }
                body { font-family: 'DM Sans', system-ui, sans-serif; font-variant-numeric: lining-nums; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
                h1 { font-family: 'Cormorant Garamond', serif; }
                h3, h4 { font-family: 'DM Sans', sans-serif; font-weight: 700; letter-spacing: -0.005em; line-height: 1.4; padding-bottom: 3px; overflow: visible; }
                a:focus-visible, button:focus-visible { outline: 2px solid #D97706; outline-offset: 2px; }
                .nm-container { width: 100%; max-width: 1280px; margin: 0 auto; padding: 0 1.5rem; }
                .nm-section { padding: 5.5rem 1.5rem; background: #fff; }
                .nm-section.alt { background: #FAFAF8; }
                @media (max-width: 768px) { .nm-section { padding: 3.25rem 1rem; } .nm-container { padding: 0 1rem; } }
                .brand-line { font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: #D97706; display: block; margin-bottom: 14px; }
                .nm-head { text-align: center; margin-bottom: clamp(2.25rem, 6vw, 3.5rem); }
                .nm-h2 { font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 700; color: #000; line-height: 1.22; letter-spacing: -0.02em; margin-bottom: 14px; padding-bottom: 0.12em; overflow: visible; }
                .nm-sub { font-size: 1rem; color: #52525b; max-width: 640px; margin: 0 auto; line-height: 1.7; }
                .gold-text { color: #D97706; font-style: italic; }
                .card { background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 20px; padding: 1.6rem; transition: border-color 0.25s, box-shadow 0.25s; }
                .card:hover { border-color: rgba(217,119,6,0.55); box-shadow: 0 18px 44px rgba(217,119,6,0.09); }
                .icon-box { width: 42px; height: 42px; border-radius: 12px; background: #000; color: #D97706; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
                .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
                .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
                .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
                @media (max-width: 1000px) { .grid-4, .grid-3 { grid-template-columns: repeat(2, 1fr); } }
                @media (max-width: 640px) { .grid-4, .grid-3, .grid-2 { grid-template-columns: 1fr; } }
                .hide-mobile { display: flex !important; } .show-mobile { display: none !important; }
                @media (max-width: 900px) { .hide-mobile { display: none !important; } .show-mobile { display: flex !important; } }
                .btn-primary, .btn-secondary, .btn-amber, .btn-ghost { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 0.8rem 1.6rem; border-radius: 40px; font-size: 0.875rem; font-weight: 600; text-decoration: none; cursor: pointer; transition: opacity 0.2s, background 0.2s, border-color 0.2s; }
                .btn-primary { background: #000; color: #fff; border: 1px solid #000; }
                .btn-secondary { background: #fff; color: #000; border: 1px solid rgba(0,0,0,0.2); }
                .btn-amber { background: #D97706; color: #000; border: 1px solid #D97706; font-weight: 700; }
                .btn-ghost { background: rgba(255,255,255,0.06); color: #fff; border: 1px solid rgba(255,255,255,0.18); }
                .btn-primary:hover, .btn-amber:hover { opacity: 0.88; } .btn-secondary:hover { background: #FEF3C7; } .btn-ghost:hover { border-color: #D97706; }
                .hero { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 3rem; align-items: center; }
                @media (max-width: 900px) { .hero { grid-template-columns: 1fr; } }
                .tick { display: flex; align-items: flex-start; gap: 9px; font-size: 0.85rem; color: #3f3f46; line-height: 1.5; }
                .tick svg { width: 14px; height: 14px; color: #D97706; flex-shrink: 0; margin-top: 3px; }
                .chip { display: inline-block; padding: 7px 14px; border-radius: 999px; border: 1px solid rgba(217,119,6,0.4); background: #FEF3C7; color: #92400E; font-size: 0.8rem; font-weight: 600; }
                .callout { border: 1px solid #D97706; border-left-width: 4px; background: #FFFBEB; border-radius: 14px; padding: 1.1rem 1.4rem; }
                .step { display: flex; gap: 16px; align-items: flex-start; }
                .step-num { font-family: 'DM Sans', sans-serif; font-size: 2rem; font-weight: 700; color: #D97706; line-height: 1.15; min-width: 38px; }
                .faq { border: 1px solid rgba(0,0,0,0.09); border-radius: 16px; overflow: hidden; background: #fff; }
                .faq.open { border-color: #D97706; }
                .faq button { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 18px 22px; background: transparent; border: none; cursor: pointer; text-align: left; font: inherit; font-size: 0.95rem; font-weight: 600; color: #000; }
                .faq p { padding: 0 22px 20px; font-size: 0.88rem; color: #52525b; line-height: 1.7; }
                .dark { background: #000; color: #fff; position: relative; overflow: hidden; }
                .dark::before { content: ""; position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px); background-size: 48px 48px; pointer-events: none; }
                .dark::after { content: ""; position: absolute; top: -140px; right: -140px; width: 520px; height: 520px; background: radial-gradient(circle, rgba(217,119,6,0.13), transparent 65%); pointer-events: none; }
                .dark > .nm-container { position: relative; z-index: 1; }
                .dark .nm-h2 { color: #fff; font-family: 'Cormorant Garamond', serif; font-size: clamp(2.2rem, 5vw, 3.2rem); line-height: 1.15; } .dark .nm-sub { color: rgba(255,255,255,0.6); }
                .dark .chip { background: rgba(217,119,6,0.1); border-color: rgba(217,119,6,0.35); color: #FCD34D; }
                .pain-item { display: flex; align-items: center; gap: 12px; padding: 13px 18px; border-radius: 14px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); font-size: 0.92rem; color: rgba(255,255,255,0.8); text-align: left; }
                .pain-close { display: inline-block; padding: 16px 26px; border-radius: 16px; background: rgba(217,119,6,0.1); border: 1px solid rgba(217,119,6,0.3); color: #FCD34D; font-weight: 600; line-height: 1.55; }
                .marquee { background: #000; padding: 0.75rem 0; overflow: hidden; border-top: 1px solid rgba(217,119,6,0.25); }
                .marquee-track { display: flex; width: max-content; animation: marquee 34s linear infinite; }
                .marquee-row { display: flex; gap: 2rem; padding-right: 2rem; white-space: nowrap; }
                .marquee-row span { display: flex; align-items: center; gap: 2rem; font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.55); }
                .marquee-row i { width: 4px; height: 4px; border-radius: 50%; background: #D97706; }
                @keyframes marquee { to { transform: translateX(-50%); } }
                .dash { border: 1px solid rgba(255,255,255,0.12); border-radius: 24px; overflow: hidden; background: rgba(255,255,255,0.03); backdrop-filter: blur(16px); }
                .dash-bar { display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap; padding: 12px 20px; background: rgba(0,0,0,0.5); border-bottom: 1px solid rgba(255,255,255,0.08); font-family: 'DM Sans', sans-serif; font-size: 11px; letter-spacing: 0.14em; color: #D97706; font-weight: 600; }
                .dots { display: flex; gap: 6px; } .dots i { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.18); } .dots i:last-child { background: rgba(217,119,6,0.7); }
                .dash-body { padding: clamp(1rem, 3vw, 1.5rem); }
                .dash-metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; margin-bottom: 0.75rem; }
                .dm { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09); border-radius: 14px; padding: 1rem 1.2rem; transition: border-color 0.2s; }
                .dm:hover { border-color: rgba(217,119,6,0.45); }
                .dm-top { display: flex; justify-content: space-between; align-items: center; color: rgba(255,255,255,0.45); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 600; margin-bottom: 8px; }
                .dm-top svg { color: #D97706; }
                .dm-val { font-family: 'DM Sans', sans-serif; font-size: 2rem; font-weight: 700; line-height: 1.15; color: #fff; margin-bottom: 4px; }
                .dm-sub { font-size: 11px; color: rgba(255,255,255,0.4); }
                .dash-panels { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
                .gc { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09); border-radius: 16px; padding: 1.1rem 1.25rem; }
                .gc-title { display: flex; justify-content: space-between; font-family: 'DM Sans', sans-serif; font-size: 11px; letter-spacing: 0.1em; font-weight: 700; color: rgba(255,255,255,0.75); margin-bottom: 12px; }
                .gc-title em { font-style: normal; color: #D97706; font-size: 10px; }
                .gc-row { display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 9px 0; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 12px; color: rgba(255,255,255,0.7); }
                .gc-row:last-child { border-bottom: none; }
                .tag { font-size: 10px; font-weight: 700; padding: 3px 9px; border-radius: 999px; white-space: nowrap; border: 1px solid rgba(217,119,6,0.4); color: #D97706; background: rgba(217,119,6,0.1); }
                .tag.dim { border-color: rgba(255,255,255,0.15); color: rgba(255,255,255,0.6); background: rgba(255,255,255,0.05); }
                .bar { height: 4px; border-radius: 2px; background: rgba(255,255,255,0.1); margin-top: 6px; overflow: hidden; }
                .bar i { display: block; height: 100%; background: linear-gradient(90deg, #D97706, #FCD34D); }
                .dash-foot { padding: 11px 20px; border-top: 1px solid rgba(255,255,255,0.07); background: rgba(0,0,0,0.35); font-size: 11px; color: rgba(255,255,255,0.45); }
                @media (max-width: 700px) { .dash-metrics { grid-template-columns: repeat(2, 1fr); } .dash-panels { grid-template-columns: 1fr; } }
                .seg { display: flex; gap: 10px; overflow-x: auto; padding: 14px 2px 16px; }
                .seg button { flex: 1 0 180px; position: relative; text-align: left; padding: 14px 16px; border-radius: 16px; border: 1px solid rgba(0,0,0,0.12); background: #fff; cursor: pointer; font: inherit; color: #000; transition: border-color 0.2s, background 0.2s; }
                .seg button:hover { border-color: #D97706; }
                .seg button.on { background: #000; border-color: #000; color: #fff; }
                .seg-stage { display: block; font-family: 'DM Sans', sans-serif; font-size: 10.5px; letter-spacing: 0.12em; text-transform: uppercase; color: #71717a; font-weight: 600; }
                .seg button.on .seg-stage { color: #D97706; }
                .seg-name { display: block; font-size: 0.9rem; font-weight: 700; margin: 5px 0 2px; line-height: 1.25; }
                .seg-price { display: block; font-size: 0.8rem; color: #52525b; }
                .seg button.on .seg-price { color: rgba(255,255,255,0.7); }
                .seg-badge { position: absolute; top: 0; right: 12px; transform: translateY(-50%); background: #D97706; color: #000; font-size: 9.5px; font-weight: 700; padding: 3px 9px; border-radius: 999px; letter-spacing: 0.06em; }
                .vpanel { display: grid; grid-template-columns: 0.85fr 1.15fr; background: #000; color: #fff; border-radius: 26px; overflow: hidden; border: 1px solid rgba(217,119,6,0.35); }
                .vp-left { padding: clamp(1.5rem, 4vw, 2.5rem); border-right: 1px solid rgba(255,255,255,0.1); background: radial-gradient(circle at 0 0, rgba(217,119,6,0.16), transparent 60%); }
                .vp-right { padding: clamp(1.5rem, 4vw, 2.5rem); }
                .vp-name { font-family: 'DM Sans', sans-serif; font-size: clamp(1.8rem, 3vw, 2.3rem); font-weight: 700; line-height: 1.2; padding-bottom: 0.08em; letter-spacing: -0.02em; margin: 4px 0 12px; }
                .vp-out { color: rgba(255,255,255,0.72); font-size: 0.95rem; line-height: 1.65; margin-bottom: 24px; }
                .vp-price { font-family: 'DM Sans', sans-serif; font-size: 2.8rem; font-weight: 700; color: #D97706; line-height: 1; }
                .vp-price span { font-family: 'DM Sans', sans-serif; font-size: 0.85rem; color: rgba(255,255,255,0.5); font-weight: 400; }
                .vp-note { font-size: 11.5px; color: rgba(255,255,255,0.45); margin: 8px 0 18px; }
                .vp-best { font-size: 0.82rem; color: rgba(255,255,255,0.6); line-height: 1.6; margin-bottom: 24px; }
                .vp-label { font-family: 'DM Sans', sans-serif; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #D97706; font-weight: 600; margin-bottom: 12px; }
                .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; margin-bottom: 12px; }
                .stat { border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 1rem; background: rgba(255,255,255,0.04); }
                .stat b { display: block; font-family: 'DM Sans', sans-serif; font-size: 2.4rem; font-weight: 700; color: #fff; line-height: 1; }
                .stat span { display: block; font-size: 11.5px; color: rgba(255,255,255,0.55); line-height: 1.4; margin-top: 6px; }
                .vp-report { border: 1px solid rgba(217,119,6,0.35); background: rgba(217,119,6,0.08); border-radius: 14px; padding: 0.9rem 1.1rem; font-size: 0.85rem; color: #FCD34D; margin-bottom: 26px; }
                .vp-list { display: grid; grid-template-columns: 1fr 1fr; gap: 11px 22px; }
                .vp-list .tick { color: rgba(255,255,255,0.78); font-size: 0.8rem; }
                @media (max-width: 900px) { .vpanel { grid-template-columns: 1fr; } .vp-left { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.1); } .vp-list { grid-template-columns: 1fr; } }
                @media (max-width: 480px) { .stats { grid-template-columns: 1fr; } }
                .matrix { width: 100%; border-collapse: collapse; min-width: 760px; }
                .matrix th, .matrix td { padding: 13px 12px; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.06); }
                .matrix th:first-child, .matrix td:first-child { text-align: left; position: sticky; left: 0; background: inherit; font-size: 0.82rem; font-weight: 500; color: #27272a; min-width: 210px; }
                .matrix thead tr { background: #000; }
                .matrix thead th { font-family: 'DM Sans', sans-serif; font-size: 11.5px; font-weight: 700; color: #fff; }
                .matrix thead th:first-child { color: rgba(255,255,255,0.6); }
                .matrix tbody tr:nth-child(odd) { background: #fff; } .matrix tbody tr:nth-child(even) { background: #FAFAF8; }
                .matrix .hl { background: rgba(217,119,6,0.07); }
                .nm-dash { color: #a1a1aa; font-size: 11px; }
                @media (prefers-reduced-motion: reduce) { * { transition-duration: 0.01ms !important; scroll-behavior: auto !important; } .marquee-track { animation: none; } }
            `}</style>

            <div style={{ background: "#fff", color: "#000", minHeight: "100vh" }}>
                {/* NAV */}
                <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.96)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${scrolled ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.06)"}` }}>
                    <div className="nm-container">
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
                            <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                                <div className="icon-box" style={{ width: 34, height: 34, borderRadius: 9 }}><Scale style={{ width: 16, height: 16 }} /></div>
                                <span style={{ fontSize: 18, fontWeight: 700, color: "#000" }}>NyayMitra</span>
                            </a>
                            <div className="hide-mobile" style={{ alignItems: "center", gap: 2 }}>
                                {navLinks.map(l => <a key={l.label} href={l.href} style={{ padding: "8px 12px", fontSize: 13, fontWeight: 500, color: "#52525b", textDecoration: "none", whiteSpace: "nowrap" }}>{l.label}</a>)}
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <a className="hide-mobile" aria-label="Instagram" href="https://www.instagram.com/mynyaymitra.in" target="_blank" rel="noopener noreferrer" style={{ padding: 6, color: "#a1a1aa" }}><Instagram style={{ width: 16, height: 16 }} /></a>
                                <a className="hide-mobile" aria-label="LinkedIn" href="https://www.linkedin.com/company/nyaymitra-tech-pvt-ltd" target="_blank" rel="noopener noreferrer" style={{ padding: 6, color: "#a1a1aa" }}><Linkedin style={{ width: 16, height: 16 }} /></a>
                                <button className="show-mobile" aria-label="Toggle menu" aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen(v => !v)} style={{ padding: 8, background: "rgba(0,0,0,0.05)", border: "none", borderRadius: 8, cursor: "pointer" }}>
                                    {isMenuOpen ? <X style={{ width: 18, height: 18 }} /> : <Menu style={{ width: 18, height: 18 }} />}
                                </button>
                            </div>
                        </div>
                    </div>
                    {isMenuOpen && (
                        <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)", padding: "16px", background: "#fff" }}>
                            {navLinks.map(l => <a key={l.label} href={l.href} onClick={() => setIsMenuOpen(false)} style={{ display: "block", padding: "12px 16px", fontSize: 15, fontWeight: 500, color: "#27272a", textDecoration: "none" }}>{l.label}</a>)}
                        </div>
                    )}
                </nav>

                {/* HERO */}
                <section className="nm-section" style={{ paddingTop: "4rem", backgroundImage: "linear-gradient(rgba(0,0,0,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.025) 1px,transparent 1px)", backgroundSize: "48px 48px" }}>
                    <div className="nm-container hero">
                        <div>
                            <span className="chip" style={{ marginBottom: 22 }}>Legal operations and legal services across India</span>
                            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 5.2vw, 3.6rem)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.015em", margin: "22px 0 16px" }}>
                                Your Business Deserves More Than Just a Lawyer.<br />
                                <span className="gold-text">One Partner. Every Legal Requirement.</span>
                            </h1>
                            <p style={{ fontSize: "1rem", color: "#52525b", lineHeight: 1.7, maxWidth: 560, marginBottom: 28 }}>
                                From business incorporation, contracts and compliance to disputes and litigation coordination, NyayMitra helps businesses manage their legal requirements through one organised partner and a nationwide network of qualified legal professionals.
                            </p>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                                <a href={waGeneral} target="_blank" rel="noopener noreferrer" className="btn-primary">Talk to NyayMitra</a>
                                <a href="#pricing" className="btn-secondary">Explore Our Plans <ChevronRight style={{ width: 14, height: 14 }} /></a>
                                <a href={waLitigation} target="_blank" rel="noopener noreferrer" className="btn-secondary">Need Litigation Support?</a>
                            </div>
                        </div>
                        <div className="card" style={{ padding: "1.75rem", borderColor: "rgba(217,119,6,0.4)", background: "#fff" }}>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: "0.12em", color: "#D97706", marginBottom: 16 }}>WHAT WE COORDINATE</p>
                            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                {["Business legal operations", "Contracts and corporate documentation", "Compliance and regulatory coordination", "Litigation and dispute resolution coordination", "One organised workspace for business legal matters", "Nationwide professional coordination"].map(v => (
                                    <div key={v} className="tick" style={{ fontSize: "0.92rem", fontWeight: 500, color: "#000" }}><Check />{v}</div>
                                ))}
                            </div>
                            <p style={{ fontSize: 11.5, color: "#71717a", marginTop: 18, lineHeight: 1.6 }}>We work alongside your existing lawyers, CAs and CSs. We do not replace them.</p>
                        </div>
                    </div>
                </section>

                {/* MARQUEE */}
                <div className="marquee" aria-hidden="true">
                    <div className="marquee-track">
                        {[0, 1].map(j => (
                            <div key={j} className="marquee-row">
                                {marqueeItems.map(m => <span key={m}>{m}<i /></span>)}
                            </div>
                        ))}
                    </div>
                </div>

                {/* WHO WE SERVE */}
                <section className="nm-section alt">
                    <div className="nm-container">
                        <div className="nm-head">{eyebrow("WHO WE SERVE")}{h2("Built for businesses at every stage")}
                            <p className="nm-sub">From incorporation to courtroom representation coordination, NyayMitra helps businesses manage their legal requirements through one organised partner.</p></div>
                        <div className="grid-3">
                            {["Startups and founders", "Private Limited Companies", "LLPs and partnerships", "MSMEs and small businesses", "Growing and funded companies", "Businesses across multiple Indian states or needing litigation assistance"].map(w => (
                                <div key={w} className="card" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <div className="icon-box" style={{ width: 34, height: 34 }}><Check style={{ width: 15, height: 15 }} /></div>
                                    <span style={{ fontSize: "0.92rem", fontWeight: 600 }}>{w}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* PAIN */}
                <section className="nm-section dark">
                    <div className="nm-container" style={{ maxWidth: 760, textAlign: "center" }}>
                        <span className="brand-line">The real problem</span>
                        <h2 className="nm-h2">You are not short of advisors.<br /><span className="gold-text">You are short of ownership.</span></h2>
                        <p className="nm-sub" style={{ marginBottom: 32 }}>Founders spend hours every week on work that should never reach their desk.</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 34 }}>
                            {["Following up with lawyers and CAs", "Repeating the same documents to multiple professionals", "Coordinating compliance between CA, CS and legal counsel", "Tracking filing deadlines manually", "Managing legal notices without knowing the next step"].map(i => (
                                <div key={i} className="pain-item"><X style={{ width: 14, height: 14, color: "#D97706", flexShrink: 0 }} />{i}</div>
                            ))}
                        </div>
                        <p className="pain-close">The founder unintentionally becomes the legal project manager. That is why NyayMitra exists.</p>
                    </div>
                </section>

                {/* WHAT WE ACTUALLY DO */}
                <section id="services" className="nm-section">
                    <div className="nm-container">
                        <div className="nm-head">{eyebrow("WHAT WE ACTUALLY DO")}{h2("A complete legal services and operations offering")}
                            <p className="nm-sub">Eight service pillars, delivered by qualified professionals and coordinated by NyayMitra.</p></div>
                        <div className="grid-4">
                            {pillars.map(p => (
                                <div key={p.id} className="card" style={p.id === "litigation" ? { borderColor: "#D97706", borderWidth: 2 } : undefined}>
                                    <div className="icon-box" style={{ marginBottom: 14 }}>{p.icon}</div>
                                    <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 12, lineHeight: 1.4, paddingBottom: 3 }}>{p.title}</h3>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                        {p.items.map(i => <div key={i} className="tick" style={{ fontSize: "0.8rem" }}><Check />{i}</div>)}
                                    </div>
                                    {p.note && <p style={{ fontSize: 11.5, color: "#92400E", fontStyle: "italic", marginTop: 12, lineHeight: 1.5 }}>{p.note}</p>}
                                    {p.id === "litigation" && <a href="#litigation" style={{ display: "inline-flex", gap: 6, alignItems: "center", marginTop: 14, fontSize: 12.5, fontWeight: 700, color: "#D97706", textDecoration: "none" }}>See details <ArrowRight style={{ width: 12, height: 12 }} /></a>}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* LITIGATION */}
                <section id="litigation" className="nm-section alt">
                    <div className="nm-container">
                        <div className="nm-head">{eyebrow("LITIGATION SUPPORT")}{h2("Litigation and Legal Representation Across India")}
                            <p className="nm-sub">Access qualified legal professionals for business and individual legal matters, wherever your case requires assistance in India.</p></div>
                        <p style={{ maxWidth: 760, margin: "0 auto 2rem", textAlign: "center", fontSize: "0.92rem", color: "#3f3f46", lineHeight: 1.7 }}>
                            NyayMitra can coordinate access to appropriately qualified advocates and legal professionals across Indian states and relevant court jurisdictions, through a nationwide advocate network and coordination, subject to availability, case assessment and professional acceptance.
                        </p>
                        <div className="grid-2" style={{ alignItems: "start", marginBottom: "1.5rem" }}>
                            <div className="card">
                                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: 14 }}>Matters we can help coordinate</h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>{litigationCategories.map(c => <div key={c} className="tick"><Check />{c}</div>)}</div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                                <div className="card">
                                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: 14 }}>How it works</h3>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                        {litigationSteps.map((s, i) => <div key={s} className="step"><span className="step-num" style={{ fontSize: "1.5rem", minWidth: 28 }}>{i + 1}</span><p style={{ fontSize: "0.86rem", color: "#3f3f46", lineHeight: 1.55 }}>{s}</p></div>)}
                                    </div>
                                </div>
                                <div className="callout">
                                    <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: 10 }}>Commercial and legal safeguards</h3>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{litigationSafeguards.map(s => <div key={s} className="tick" style={{ fontSize: "0.8rem" }}><Check />{s}</div>)}</div>
                                </div>
                            </div>
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <a href={waLitigation} target="_blank" rel="noopener noreferrer" className="btn-primary">Discuss Your Legal Matter</a>
                        </div>
                    </div>
                </section>

                {/* DASHBOARD */}
                <section className="nm-section dark">
                    <div className="nm-container">
                        <div className="nm-head"><span className="brand-line">Platform preview</span><h2 className="nm-h2">Your Startup Legal Command Center</h2>
                            <p className="nm-sub">See contracts, compliance, legal requests and documents in one place, so you always know what is pending, what is done and what is coming next.</p></div>
                        <div className="dash">
                            <div className="dash-bar">
                                <div className="dots"><i /><i /><i /></div>
                                <span>NYAYMITRA LEGAL OPERATIONS WORKSPACE</span>
                                <span style={{ color: "rgba(255,255,255,0.45)" }}>SAMPLE DATA</span>
                            </div>
                            <div className="dash-body">
                                <div className="dash-metrics">
                                    {dashMetrics.map(m => (
                                        <div key={m.label} className="dm">
                                            <div className="dm-top"><span>{m.label}</span>{m.icon}</div>
                                            <div className="dm-val">{m.value}</div>
                                            <div className="dm-sub">{m.sub}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="dash-panels">
                                    <div className="gc">
                                        <div className="gc-title">CONTRACT TRACKER<em>7 ACTIVE</em></div>
                                        {dashContracts.map(([n, st, hl]) => <div key={n} className="gc-row"><span>{n}</span><span className={`tag ${hl ? "" : "dim"}`}>{st}</span></div>)}
                                    </div>
                                    <div className="gc">
                                        <div className="gc-title">COMPLIANCE TIMELINE<em>3 UPCOMING</em></div>
                                        {dashDeadlines.map(([n, d, hl]) => <div key={n} className="gc-row"><span style={{ display: "flex", alignItems: "center", gap: 8 }}><Calendar style={{ width: 12, height: 12, color: hl ? "#D97706" : "rgba(255,255,255,0.35)" }} />{n}</span><span className={`tag ${hl ? "" : "dim"}`}>{d}</span></div>)}
                                    </div>
                                    <div className="gc">
                                        <div className="gc-title">LEGAL REQUESTS<em>5 OPEN</em></div>
                                        {dashRequests.map(([n, v]) => <div key={n} style={{ padding: "8px 0" }}><div className="gc-row" style={{ border: "none", padding: 0 }}><span>{n}</span><span style={{ color: "#D97706", fontSize: 11, fontWeight: 700 }}>{v}%</span></div><div className="bar"><i style={{ width: `${v}%` }} /></div></div>)}
                                    </div>
                                    <div className="gc">
                                        <div className="gc-title">RECENT ACTIVITY</div>
                                        {dashActivity.map(([n, t]) => <div key={n} className="gc-row"><span>{n}</span><span style={{ fontSize: 10.5, color: "rgba(255,255,255,0.4)", whiteSpace: "nowrap" }}>{t}</span></div>)}
                                    </div>
                                </div>
                            </div>
                            <div className="dash-foot">Illustrative preview with sample data. Workspace features are subject to availability, and some tracking is currently coordinated by our team.</div>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", maxWidth: 900, margin: "32px auto 0" }}>
                            {workspaceFeatures.map(f => <span key={f} className="chip">{f}</span>)}
                        </div>
                    </div>
                </section>

                {/* WHY NYAYMITRA */}
                <section className="nm-section alt">
                    <div className="nm-container">
                        <div className="nm-head">{eyebrow("WHY NYAYMITRA")}{h2("Legal expertise and legal operations serve different needs")}
                            <p className="nm-sub">We do not say others cannot offer this. We describe what NyayMitra brings together.</p></div>
                        <div className="grid-2" style={{ maxWidth: 960, margin: "0 auto" }}>
                            <div className="card">
                                <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 14 }}>Traditional legal engagement</h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{traditional.map(t => <div key={t} className="tick" style={{ color: "#52525b" }}><span style={{ color: "#a1a1aa", marginTop: 0 }}>•</span>{t}</div>)}</div>
                            </div>
                            <div className="card" style={{ borderColor: "#D97706", borderWidth: 2 }}>
                                <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 14 }}>NyayMitra</h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{nyay.map(t => <div key={t} className="tick"><Check />{t}</div>)}</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PRICING */}
                <section id="pricing" className="nm-section">
                    <div className="nm-container">
                        <div className="nm-head"><span className="brand-line">Pricing</span><h2 className="nm-h2">Choose the legal operations capacity your business needs</h2>
                            <p className="nm-sub">Every plan gives you a defined monthly capacity for contracts and consultations, plus tracking, reporting and coordination. Nothing is unlimited, and every limit is shown.</p></div>
                        <div className="callout" style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 26 }}>
                            <div className="icon-box"><Handshake style={{ width: 18, height: 18 }} /></div>
                            <p style={{ fontSize: "0.88rem", color: "#3f3f46", lineHeight: 1.55 }}><strong style={{ color: "#000" }}>Already have a CA, CS or lawyer?</strong> Every plan works alongside your existing advisors.</p>
                        </div>
                        <div className="seg" role="tablist" aria-label="Choose a plan">
                            {plans.map((pl, i) => (
                                <button key={pl.id} role="tab" aria-selected={i === activePlan} className={i === activePlan ? "on" : ""} onClick={() => setActivePlan(i)}>
                                    {pl.popular && <span className="seg-badge">MOST POPULAR</span>}
                                    <span className="seg-stage">{capacity[pl.id].stage}</span>
                                    <span className="seg-name">{pl.name}</span>
                                    <span className="seg-price">{inr(pl.price)} / month</span>
                                </button>
                            ))}
                        </div>
                        <div className="vpanel">
                            <div className="vp-left">
                                <span className="brand-line">{cap.stage}</span>
                                <h3 className="vp-name">{plan.name}</h3>
                                <p className="vp-out">{cap.outcome}</p>
                                <div className="vp-price">{inr(plan.price)} <span>/ month</span></div>
                                <p className="vp-note">Billed monthly. Taxes extra where applicable.</p>
                                <p className="vp-best"><strong style={{ color: "#fff" }}>Best for: </strong>{plan.bestFor}</p>
                                <a href={planWa(plan)} target="_blank" rel="noopener noreferrer" className="btn-amber">Enquire About This Plan</a>
                            </div>
                            <div className="vp-right">
                                <p className="vp-label">Every month you get</p>
                                <div className="stats">
                                    <div className="stat"><b>{cap.drafts}</b><span>Standard agreement {cap.drafts === 1 ? "draft" : "drafts"}</span></div>
                                    <div className="stat"><b>{cap.reviews}</b><span>Standard agreement {cap.reviews === 1 ? "review" : "reviews"}</span></div>
                                    <div className="stat"><b>{cap.hours}</b><span>Consultation and coordination hours</span></div>
                                </div>
                                <div className="vp-report">{cap.report}</div>
                                <p className="vp-label">Everything included</p>
                                <div className="vp-list">
                                    {plan.features.map(f => <div key={f} className="tick"><Check />{f}</div>)}
                                </div>
                            </div>
                        </div>
                        <p style={{ textAlign: "center", marginTop: 26, fontSize: 12, color: "#71717a", maxWidth: 760, marginInline: "auto", lineHeight: 1.65 }}>
                            Limits apply to standard work. Litigation and court representation are separately quoted and are not included in monthly retainer allowances. Government fees, stamp duty, filing costs and external professional fees are additional.
                        </p>
                    </div>
                </section>

                {/* COMPARISON MATRIX */}
                <section className="nm-section alt">
                    <div className="nm-container">
                        <div className="nm-head">{eyebrow("PLAN COMPARISON")}{h2("Compare every plan in detail")}</div>
                        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                            <div style={{ overflowX: "auto" }}>
                                <table className="matrix">
                                    <thead>
                                        <tr>
                                            <th>Feature</th>
                                            {plans.map(p => <th key={p.id} className={p.popular ? "hl" : ""} style={p.popular ? { color: "#D97706" } : undefined}>{p.name}<br /><span style={{ fontWeight: 500, fontSize: 11, color: "rgba(255,255,255,0.55)" }}>{inr(p.price)}/mo</span></th>)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {matrixRows.map(row => (
                                            <tr key={row.label}>
                                                <td>{row.label}</td>
                                                {row.values.map((v, i) => <td key={i} className={plans[i].popular ? "hl" : ""}>{renderCell(v)}</td>)}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <p style={{ fontSize: 12, color: "#71717a", marginTop: 14, lineHeight: 1.65 }}>
                            *Workspace access is subject to available features. Litigation and court representation are separately quoted services and are not included in monthly retainer allowances.
                        </p>
                    </div>
                </section>

                {/* ADDITIONAL SERVICES */}
                <section className="nm-section">
                    <div className="nm-container">
                        <div className="nm-head">{eyebrow("STANDALONE SERVICES")}{h2("Need a Specific Legal Service? We Can Help.")}
                            <p className="nm-sub">You do not need a monthly retainer to engage NyayMitra. Tell us your requirement and we will share a scoped quote.</p></div>
                        <div className="grid-4">
                            {additionalServices.map(s => {
                                const isLit = s.startsWith("Litigation")
                                return (
                                    <a key={s} href={isLit ? waLitigation : wa(`I need a quote for: ${s}`)} target="_blank" rel="noopener noreferrer" className="card" style={{ textDecoration: "none", color: "#000", display: "flex", flexDirection: "column", gap: 10, justifyContent: "space-between" }}>
                                        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, lineHeight: 1.35 }}>{s}</h3>
                                        <span style={{ fontSize: 12.5, fontWeight: 700, color: "#D97706", display: "inline-flex", alignItems: "center", gap: 6 }}>{isLit ? "Discuss Your Requirement" : "Request a Quote"} <ArrowRight style={{ width: 12, height: 12 }} /></span>
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* COVERAGE */}
                <section className="nm-section alt">
                    <div className="nm-container">
                        <div className="nm-head">{eyebrow("COVERAGE")}{h2("Legal Support That Goes Beyond Your City.")}
                            <p className="nm-sub">Whether your business operates in Bengaluru, Delhi, Mumbai, Ahmedabad, Hyderabad, Kolkata, Chennai, Pune, Jaipur, Patna or elsewhere in India, NyayMitra helps coordinate business legal services and access to qualified advocates based on your requirement and jurisdiction.</p></div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 24 }}>
                            {cities.map(c => <span key={c} className="chip" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><MapPin style={{ width: 12, height: 12 }} />{c}</span>)}
                            <span className="chip" style={{ background: "#fff" }}>And elsewhere in India</span>
                        </div>
                        <p style={{ textAlign: "center", fontSize: 12.5, color: "#52525b", maxWidth: 680, margin: "0 auto", lineHeight: 1.65 }}>
                            Services are coordinated remotely and through professional networks. Court representation is subject to advocate availability, case acceptance and jurisdictional requirements.
                        </p>
                    </div>
                </section>

                {/* HOW IT WORKS */}
                <section className="nm-section">
                    <div className="nm-container">
                        <div className="nm-head">{eyebrow("HOW IT WORKS")}{h2("From requirement to organised delivery")}</div>
                        <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", flexDirection: "column", gap: 14 }}>
                            {journey.map((s, i) => (
                                <div key={s.title} className="card step">
                                    <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
                                    <div>
                                        <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 4 }}>{s.title}</h3>
                                        <p style={{ fontSize: "0.86rem", color: "#52525b", lineHeight: 1.6 }}>{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                            <p style={{ fontSize: 12.5, color: "#52525b", lineHeight: 1.65, textAlign: "center", marginTop: 6 }}>
                                For litigation matters, case assessment, advocate engagement, fees and representation are separately confirmed.
                            </p>
                        </div>
                    </div>
                </section>

                {/* TRANSPARENCY */}
                <section className="nm-section alt">
                    <div className="nm-container">
                        <div className="nm-head">{eyebrow("TRANSPARENCY")}{h2("Transparent Scope. Professional Delivery.")}</div>
                        <div className="grid-3">
                            {scopeItems.map(s => <div key={s} className="card tick" style={{ fontSize: "0.85rem", alignItems: "flex-start" }}><Check />{s}</div>)}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="nm-section">
                    <div className="nm-container">
                        <div className="nm-head">{eyebrow("FAQ")}{h2("Frequently asked questions")}</div>
                        <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", flexDirection: "column", gap: 10 }}>
                            {faqs.map((f, i) => (
                                <div key={f.q} className={`faq ${openFaq === i ? "open" : ""}`}>
                                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                                        <span>{f.q}</span>
                                        <ChevronDown style={{ width: 16, height: 16, color: "#71717a", flexShrink: 0, transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                                    </button>
                                    {openFaq === i && <p>{f.a}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FINAL CTA */}
                <section className="nm-section dark" style={{ textAlign: "center" }}>
                    <div className="nm-container" style={{ maxWidth: 860 }}>
                        <span className="brand-line">One accountable team</span>
                        <h2 className="nm-h2" style={{ fontSize: "clamp(2rem,5vw,3.2rem)" }}>Your Business Has Legal Responsibilities.<br /><span className="gold-text">You Do Not Have to Manage Them Alone.</span></h2>
                        <p className="nm-sub" style={{ marginBottom: 32 }}>From everyday business documentation and compliance coordination to complex disputes and litigation support, NyayMitra helps you access organised legal services across India.</p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                            <a href={waGeneral} target="_blank" rel="noopener noreferrer" className="btn-amber">Talk to Our Team</a>
                            <a href="#pricing" className="btn-ghost">Explore Monthly Plans</a>
                            <a href={waLitigation} target="_blank" rel="noopener noreferrer" className="btn-ghost">Get Litigation Assistance</a>
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                <footer style={{ background: "#fff", borderTop: "1px solid rgba(0,0,0,0.08)", padding: "clamp(2rem,5vw,3rem) 1.5rem 1.5rem" }}>
                    <div className="nm-container" style={{ padding: 0 }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", marginBottom: "2rem" }}>
                            <div>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                                    <div className="icon-box" style={{ width: 28, height: 28, borderRadius: 8 }}><Scale style={{ width: 13, height: 13 }} /></div>
                                    <span style={{ fontSize: 16, fontWeight: 700 }}>NyayMitra</span>
                                </div>
                                <p style={{ fontSize: 12, color: "#52525b", maxWidth: 260, lineHeight: 1.6, marginBottom: 14 }}>Legal operations and legal services coordination for businesses across India.</p>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6, fontSize: 12 }}><Mail style={{ width: 12, height: 12, color: "#D97706" }} /><a href="mailto:support@mynyaymitra.in" style={{ color: "#52525b", textDecoration: "none" }}>support@mynyaymitra.in</a></div>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}><PhoneCall style={{ width: 12, height: 12, color: "#D97706" }} /><a href="tel:+917970596183" style={{ color: "#52525b", textDecoration: "none" }}>+91 79705 96183</a></div>
                            </div>
                            <div>
                                <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.14em", color: "#D97706", marginBottom: 14 }}>QUICK LINKS</h4>
                                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                                    {[{ l: "NyayMitra", h: "/about" }, { l: "Services", h: "/services" }, { l: "Find Lawyers", h: "/lawyers" }, { l: "Affidavit Online", h: "/affidavit-online-india" }, { l: "Sign Up", h: "/auth/signup" }].map(x => <li key={x.l}><a href={x.h} style={{ fontSize: 12.5, color: "#52525b", textDecoration: "none" }}>{x.l}</a></li>)}
                                </ul>
                            </div>
                            <div>
                                <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.14em", color: "#D97706", marginBottom: 14 }}>LEGAL</h4>
                                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                                    {[{ l: "Terms of Service", h: "/terms" }, { l: "Privacy Policy", h: "/privacy-policy" }, { l: "Cancellation & Refund", h: "/cancellation" }, { l: "Shipping & Delivery", h: "/Shipping&DeliveryPolicy" }, { l: "Contact Us", h: "/contact" }].map(x => <li key={x.l}><a href={x.h} style={{ fontSize: 12.5, color: "#52525b", textDecoration: "none" }}>{x.l}</a></li>)}
                                </ul>
                            </div>
                        </div>
                        <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
                            <p style={{ fontSize: 11, color: "#71717a", lineHeight: 1.6 }}>
                                <strong style={{ color: "#3f3f46" }}>Disclaimer: </strong>NyayMitra is a technology enabled legal operations and professional coordination platform. It is not a law firm and is not an advocate, CA or CS practice. Legal advice, drafting, filings, appearances and representation are delivered by appropriately qualified and authorised independent professionals, in accordance with applicable Indian laws and professional rules. No legal outcome is guaranteed.
                            </p>
                            <p style={{ fontSize: 11, color: "#71717a" }}>© 2026 NyayMitra Technologies Private Limited · CIN: U69100BR2026PTC082217</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}