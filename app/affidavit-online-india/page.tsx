// app/affidavit-online-india/page.tsx
"use client";

import { useState, useEffect, useRef, useCallback, memo } from "react";
import {
    FileText,
    Shield,
    Zap,
    Users,
    Clock,
    Scale,
    CheckCircle,
    ArrowRight,
    MessageCircle,
    Gavel,
    ChevronRight,
    Star,
    Sparkles,
    Building2,
    BadgeCheck,
    FileCheck,
    Timer,
    ThumbsUp,
    Lock,
    Phone,
    Mail,
    MapPin,
    Twitter,
    Linkedin,
    Facebook,
    Globe,
    Eye,
    PenTool,
    Printer,
    Download,
    AlertCircle,
    Info,
    X,
    Menu,
    ChevronDown,
    Play,
    Headphones,
    Calendar,
    DollarSign,
    Briefcase,
    Award,
    BookOpen,
    Heart,
    Share2,
    Copy,
    ExternalLink,
    HelpCircle,
    Layers,
    BarChart3,
    TrendingUp,
    Rocket,
    Target,
    Search,
    Hash,
    Quote,
    Mic,
    Video,
    Camera,
    Smartphone,
    Laptop,
    Tablet,
    Wifi,
    Battery,
    Cpu,
    HardDrive,
    Database,
    Cloud,
    Server,
    Network,
    Globe2,
    LockKeyhole,
    Fingerprint,
    QrCode,
    Bell,
    Settings,
    UserCircle,
    LogOut,
    LifeBuoy,
    Truck,
    Package,
    ShoppingCart,
    CreditCard,
    Banknote,
    Receipt,
    Wallet,
    PiggyBank,
    TrendingDown,
    Activity,
    BarChart,
    PieChart,
    LineChart,
    AreaChart,
    ScatterChart,
    Radar,
    Compass,
    NavigationIcon,
    Map,
    Flag,
    Home,
    GraduationCap,
    HeartHandshake,
    Handshake,
    Sparkle,
    Stars,
    Crown,
    Diamond,
    Gem,
    Medal,
    Trophy,
} from "lucide-react";

// ============================================================================
// TYPES & INTERFACES - Enterprise Grade Type System
// ============================================================================

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg" | "xl";
type AnimationVariant = "fade-up" | "fade-left" | "fade-right" | "scale" | "none";

interface ButtonProps {
    variant?: Variant;
    size?: Size;
    children: React.ReactNode;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    isLoading?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
    fullWidth?: boolean;
    ariaLabel?: string;
}

interface StatItem {
    value: string;
    label: string;
    icon: React.ReactNode;
    trend?: number;
}

interface ServiceCard {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    badge?: string;
    popular?: boolean;
    metrics?: {
        time: string;
        price: string;
        rating: number;
    };
}

interface Step {
    id: string;
    number: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    details: string[];
    estimatedTime: string;
}

interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: string;
    helpful?: number;
}

interface Testimonial {
    id: string;
    name: string;
    role: string;
    company: string;
    content: string;
    rating: number;
    avatar: string;
    date: string;
    verified: boolean;
    service?: string;
}

interface PricingTier {
    id: string;
    name: string;
    price: number;
    period: string;
    description: string;
    features: Array<{ name: string; included: boolean; tooltip?: string }>;
    cta: string;
    popular?: boolean;
    savings?: string;
}

// ============================================================================
// CUSTOM HOOKS - Advanced React Patterns
// ============================================================================

const useIntersectionObserver = (options?: IntersectionObserverInit) => {
    const [ref, setRef] = useState<Element | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!ref) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.1, ...options });

        observer.observe(ref);
        return () => observer.disconnect();
    }, [ref, options]);

    return { setRef, isVisible };
};

const useScrollPosition = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const position = window.scrollY;
            setScrollPosition(position);
            setIsScrolled(position > 50);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return { scrollPosition, isScrolled };
};

const useLocalStorage = <T,>(key: string, initialValue: T) => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch {
            return initialValue;
        }
    });

    const setValue = (value: T | ((val: T) => T)) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue] as const;
};

// ============================================================================
// UI COMPONENTS - Production Ready Component Library
// ============================================================================

const Button = memo(({
    variant = "primary",
    size = "md",
    children,
    icon,
    iconPosition = "left",
    isLoading = false,
    disabled = false,
    onClick,
    className = "",
    fullWidth = false,
    ariaLabel,
}: ButtonProps) => {
    const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-200 hover:shadow-xl hover:scale-[1.02] hover:from-indigo-700 hover:to-indigo-800 focus:ring-indigo-500",
        secondary: "bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-300 hover:text-indigo-600 focus:ring-indigo-500",
        outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500",
        ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm gap-2",
        md: "px-6 py-3 text-base gap-2.5",
        lg: "px-8 py-4 text-lg gap-3",
        xl: "px-10 py-5 text-xl gap-3.5",
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled || isLoading}
            aria-label={ariaLabel}
            className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
        >
            {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
                <>
                    {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
                    <span>{children}</span>
                    {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
                </>
            )}
        </button>
    );
});

Button.displayName = "Button";

const AnimatedSection = memo(({
    children,
    animation = "fade-up",
    delay = 0,
    className = ""
}: {
    children: React.ReactNode;
    animation?: AnimationVariant;
    delay?: number;
    className?: string;
}) => {
    const { setRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });

    const animations = {
        "fade-up": "translate-y-10 opacity-0",
        "fade-left": "-translate-x-10 opacity-0",
        "fade-right": "translate-x-10 opacity-0",
        scale: "scale-95 opacity-0",
        none: "",
    };

    return (
        <div
            ref={(el) => setRef(el)}
            className={`transition-all duration-700 ${className}`}
            style={{
                transform: isVisible ? "none" : animations[animation],
                opacity: isVisible ? 1 : 0,
                transitionDelay: `${delay}ms`,
            }}
        >
            {children}
        </div>
    );
});

AnimatedSection.displayName = "AnimatedSection";

// WhatsApp helper
const openWhatsApp = (message: string) => {
    const phone = "919661644025";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
};

// ============================================================================
// HEADER SECTION - NyayMitra Brand Header with Navigation
// ============================================================================

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isScrolled } = useScrollPosition();

    const navLinks = [
        { name: "Home", href: "#home" },
        { name: "Services", href: "#services" },
        { name: "How It Works", href: "#how-it-works" },
        { name: "Pricing", href: "#pricing" },
        { name: "FAQs", href: "#faqs" },
    ];

    const scrollToSection = (href: string) => {
        setIsMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
            : "bg-transparent"
            }`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                        <div className="relative">
                            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                                <Scale className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        </div>
                        <div>
                            <span className="font-bold text-lg lg:text-xl text-gray-900">Nyay<span className="text-indigo-600">Mitra</span></span>
                            {/* <span className="hidden lg:inline-block ml-2 text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">Legal Tech</span> */}
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => scrollToSection(link.href)}
                                className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
                            >
                                {link.name}
                            </button>
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openWhatsApp("I have a question about NyayMitra services.")}
                        >
                            <HelpCircle className="w-4 h-4" />
                            Support
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => openWhatsApp("I want to create an affidavit. Please help me get started.")}
                        >
                            <FileText className="w-4 h-4" />
                            Get Started
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
                        <nav className="flex flex-col gap-3">
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => scrollToSection(link.href)}
                                    className="px-4 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg text-left transition-colors"
                                >
                                    {link.name}
                                </button>
                            ))}
                            <div className="pt-2 flex flex-col gap-2">
                                <Button
                                    variant="ghost"
                                    fullWidth
                                    onClick={() => openWhatsApp("I have a question about NyayMitra services.")}
                                >
                                    Support
                                </Button>
                                <Button
                                    variant="primary"
                                    fullWidth
                                    onClick={() => openWhatsApp("I want to create an affidavit. Please help me get started.")}
                                >
                                    Get Started
                                </Button>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

// ============================================================================
// FOOTER SECTION - Comprehensive NyayMitra Footer
// ============================================================================

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [activeColumn, setActiveColumn] = useState<string | null>(null);

    // Clean, relevant footer links only
    const footerLinks = {
        company: [
            { name: "About NyayMitra", href: "#" },
            { name: "Contact Us", href: "#" },
            { name: "Blog", href: "#" },
        ],
        services: [
            { name: "Affidavit Online", href: "#" },
            { name: "Name Change Affidavit", href: "#" },
            { name: "Address Proof Affidavit", href: "#" },
            { name: "Property Affidavit", href: "#" },
        ],
        legal: [
            { name: "Privacy Policy", href: "#" },
            { name: "Terms of Service", href: "#" },
            { name: "Refund Policy", href: "#" },
        ],
    };

    const socialLinks = [
        { icon: <MessageCircle className="w-5 h-5" />, href: "https://wa.me/919661644025", label: "WhatsApp" },
        { icon: <Mail className="w-5 h-5" />, href: "mailto:support@nyaymitra.com", label: "Email" },
        { icon: <Phone className="w-5 h-5" />, href: "tel:+919661644025", label: "Call" },
    ];

    const toggleColumn = (column: string) => {
        setActiveColumn(activeColumn === column ? null : column);
    };

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
                {/* Brand Section - Centered on mobile */}
                <div className="text-center mb-8 pb-6 border-b border-gray-800">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Scale className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-xl text-white">Nyay<span className="text-indigo-400">Mitra</span></span>
                    </div>
                    <p className="text-sm text-gray-400 max-w-xs mx-auto">
                        Get legally valid affidavits online in minutes. Expert reviewed, court approved.
                    </p>
                </div>

                {/* Quick Links - Mobile Accordion + Desktop Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {/* Company */}
                    <div className="border-b border-gray-800 sm:border-none">
                        <button
                            onClick={() => toggleColumn("company")}
                            className="w-full flex items-center justify-between py-3 sm:py-0 sm:cursor-default"
                        >
                            <h3 className="text-white font-semibold text-base">Company</h3>
                            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 sm:hidden ${activeColumn === "company" ? "rotate-180" : ""}`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${activeColumn === "company" ? "max-h-48 pb-3" : "max-h-0 sm:max-h-48"} sm:!max-h-full`}>
                            <ul className="space-y-2 mt-2 sm:mt-3">
                                {footerLinks.company.map((link, idx) => (
                                    <li key={idx}>
                                        <a href={link.href} className="text-sm text-gray-400 hover:text-indigo-400 transition-colors block py-1">
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Services */}
                    <div className="border-b border-gray-800 sm:border-none">
                        <button
                            onClick={() => toggleColumn("services")}
                            className="w-full flex items-center justify-between py-3 sm:py-0 sm:cursor-default"
                        >
                            <h3 className="text-white font-semibold text-base">Services</h3>
                            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 sm:hidden ${activeColumn === "services" ? "rotate-180" : ""}`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${activeColumn === "services" ? "max-h-64 pb-3" : "max-h-0 sm:max-h-64"} sm:!max-h-full`}>
                            <ul className="space-y-2 mt-2 sm:mt-3">
                                {footerLinks.services.map((link, idx) => (
                                    <li key={idx}>
                                        <a href={link.href} className="text-sm text-gray-400 hover:text-indigo-400 transition-colors block py-1">
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Legal */}
                    <div className="border-b border-gray-800 sm:border-none">
                        <button
                            onClick={() => toggleColumn("legal")}
                            className="w-full flex items-center justify-between py-3 sm:py-0 sm:cursor-default"
                        >
                            <h3 className="text-white font-semibold text-base">Legal</h3>
                            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 sm:hidden ${activeColumn === "legal" ? "rotate-180" : ""}`} />
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${activeColumn === "legal" ? "max-h-48 pb-3" : "max-h-0 sm:max-h-48"} sm:!max-h-full`}>
                            <ul className="space-y-2 mt-2 sm:mt-3">
                                {footerLinks.legal.map((link, idx) => (
                                    <li key={idx}>
                                        <a href={link.href} className="text-sm text-gray-400 hover:text-indigo-400 transition-colors block py-1">
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Contact & Social - One row on mobile */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-gray-800">
                    <div className="flex items-center gap-4">
                        {socialLinks.map((social, idx) => (
                            <a
                                key={idx}
                                href={social.href}
                                target={social.label === "WhatsApp" ? "_blank" : undefined}
                                rel={social.label === "WhatsApp" ? "noopener noreferrer" : undefined}
                                aria-label={social.label}
                                className="flex items-center gap-2 text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                            >
                                {social.icon}
                                <span className="hidden sm:inline">{social.label}</span>
                            </a>
                        ))}
                    </div>
                    <div className="text-xs text-gray-500">
                        © {currentYear} NyayMitra. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

// ============================================================================
// HERO SECTION - Premium with Dynamic Elements
// ============================================================================

const HeroSection = () => {
    const [typedText, setTypedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const phrases = ["Legally Valid", "Court Approved", "Instant Download", "Expert Reviewed"];

    useEffect(() => {
        const timer = setTimeout(() => {
            setTypedText(phrases[currentIndex]);
            setCurrentIndex((prev) => (prev + 1) % phrases.length);
        }, 2000);
        return () => clearTimeout(timer);
    }, [currentIndex, phrases]);

    return (
        <section id="home" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 pt-16 lg:pt-20">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-2000" />
            </div>

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 lg:pt-28 lg:pb-32">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <AnimatedSection animation="fade-right">
                        {/* Trust Badge */}
                        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-8 shadow-sm border border-gray-100">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 border-2 border-white" />
                                ))}
                            </div>
                            <span className="text-sm font-medium text-gray-700">
                                Trusted by <span className="font-bold text-indigo-600">500+</span> Indians
                            </span>
                        </div>

                        {/* Main Headline */}
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                            Create Affidavit{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-gradient">
                                Online in India
                            </span>
                        </h1>

                        <div className="h-12 mb-6">
                            <p className="text-xl text-gray-600">
                                Fast,{" "}
                                <span className="relative inline-block">
                                    <span className="absolute inset-0 bg-indigo-100 transform -skew-y-2" />
                                    <span className="relative font-semibold text-indigo-800">{typedText}</span>
                                </span>
                            </p>
                        </div>

                        <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                            Get your legally binding affidavit drafted, reviewed by experts, and ready in minutes.
                            No court visits, no confusion, complete peace of mind.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <Button
                                variant="primary"
                                size="lg"
                                icon={<Sparkles className="w-5 h-5" />}
                                onClick={() => openWhatsApp("I need to create an affidavit. Please help me get started.")}
                            >
                                Create Affidavit Now
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                icon={<Play className="w-5 h-5" />}
                                iconPosition="right"
                                onClick={() => openWhatsApp("Can you explain how the affidavit process works?")}
                            >
                                Watch Demo
                            </Button>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex flex-wrap gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                </div>
                                <span className="text-gray-600">Free Consultation</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Lock className="w-4 h-4 text-blue-600" />
                                </div>
                                <span className="text-gray-600">100% Confidential</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                    <Timer className="w-4 h-4 text-purple-600" />
                                </div>
                                <span className="text-gray-600">24hr Delivery</span>
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* Right - Document Preview */}
                    <AnimatedSection animation="fade-left" delay={200}>
                        <div className="relative">
                            <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-500 rounded-full opacity-10 blur-2xl animate-pulse" />
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-500 rounded-full opacity-10 blur-2xl animate-pulse delay-700" />

                            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
                                <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-400" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                        <div className="w-3 h-3 rounded-full bg-green-400" />
                                    </div>
                                    <div className="flex-1 flex justify-center">
                                        <div className="bg-white rounded-md px-3 py-1 text-xs text-gray-500 flex items-center gap-2 shadow-sm">
                                            <Lock className="w-3 h-3 text-green-600" />
                                            affidavit.nyaymitra.com
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 sm:p-8">
                                    <div className="border-b border-gray-200 pb-4 mb-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <Scale className="w-5 h-5 text-indigo-600" />
                                                <span className="font-semibold text-gray-900">AFFIDAVIT</span>
                                            </div>
                                            <div className="text-xs text-gray-400">Format as per Indian Evidence Act</div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex gap-3">
                                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                                <FileText className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                                                <div className="h-3 bg-gray-100 rounded w-full" />
                                                <div className="h-3 bg-gray-100 rounded w-5/6" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-500">Deponent Name:</span>
                                                <span className="font-medium text-gray-900">Ramesh Kumar Sharma</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-500">Purpose:</span>
                                                <span className="font-medium text-indigo-600">Address Proof Declaration</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-500">Date:</span>
                                                <span className="font-medium text-gray-900">{new Date().toLocaleDateString('en-IN')}</span>
                                            </div>
                                        </div>

                                        <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
                                            <div className="flex items-start gap-2">
                                                <BadgeCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                                                <p className="text-xs text-indigo-800">
                                                    Legally reviewed by Advocate Priya Sharma (10+ years experience)
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex gap-3 pt-2">
                                            <div className="flex-1 bg-indigo-600 text-white text-center py-2 rounded-lg text-sm font-medium">
                                                Download PDF
                                            </div>
                                            <div className="px-3 py-2 border border-gray-200 rounded-lg">
                                                <Printer className="w-4 h-4 text-gray-600" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="relative bg-white/80 backdrop-blur-sm border-y border-gray-100 py-4">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                        {[
                            { icon: <Gavel className="w-5 h-5" />, label: "Verified Lawyers", value: "500+" },
                            { icon: <Users className="w-5 h-5" />, label: "Happy Clients", value: "50K+" },
                            { icon: <Clock className="w-5 h-5" />, label: "Avg Response", value: "< 2 min" },
                            { icon: <Star className="w-5 h-5" />, label: "Client Rating", value: "4.9★" },
                        ].map((stat, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="text-indigo-600">{stat.icon}</div>
                                <div>
                                    <div className="font-bold text-gray-900">{stat.value}</div>
                                    <div className="text-xs text-gray-500">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

// ============================================================================
// SERVICES SECTION - Premium Service Cards (Condensed)
// ============================================================================

const ServicesSection = () => {
    const services: ServiceCard[] = [
        {
            id: "address-proof",
            title: "Address Proof Affidavit",
            description: "Legal declaration for verifying your current residential address.",
            icon: <Home className="w-6 h-6" />,
            popular: true,
            metrics: { time: "2 hours", price: "₹999", rating: 4.9 },
        },
        {
            id: "name-change",
            title: "Name Change Affidavit",
            description: "Sworn statement for legal name change after marriage or personal choice.",
            icon: <PenTool className="w-6 h-6" />,
            metrics: { time: "3 hours", price: "₹1,199", rating: 4.8 },
        },
        {
            id: "income-proof",
            title: "Income Proof Affidavit",
            description: "Income declaration for loans, visas, or government applications.",
            icon: <DollarSign className="w-6 h-6" />,
            metrics: { time: "2 hours", price: "₹999", rating: 4.7 },
        },
        {
            id: "identity",
            title: "Identity Verification",
            description: "Confirm your identity for lost documents or legal proceedings.",
            icon: <Fingerprint className="w-6 h-6" />,
            metrics: { time: "1.5 hours", price: "₹899", rating: 4.9 },
        },
        {
            id: "property",
            title: "Property Affidavit",
            description: "Declaration for property ownership, disputes, or transfer matters.",
            icon: <Building2 className="w-6 h-6" />,
            metrics: { time: "4 hours", price: "₹1,499", rating: 4.8 },
        },
        {
            id: "educational",
            title: "Educational Affidavit",
            description: "Sworn statement for educational qualifications and certificates.",
            icon: <GraduationCap className="w-6 h-6" />,
            metrics: { time: "2 hours", price: "₹999", rating: 4.8 },
        },
    ];

    return (
        <section id="services" className="py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 bg-indigo-100 rounded-full px-4 py-1.5 mb-4">
                        <Sparkles className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm font-medium text-indigo-900">Comprehensive Legal Solutions</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                        Affidavit Services for{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                            Every Need
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600">
                        Choose from our range of affidavit services tailored to your specific requirements
                    </p>
                </AnimatedSection>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, idx) => (
                        <AnimatedSection key={service.id} animation="fade-up" delay={idx * 100}>
                            <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-100">
                                {service.popular && (
                                    <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                                        Most Popular
                                    </div>
                                )}

                                <div className="p-6">
                                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                        {service.icon}
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                                    <p className="text-gray-600 mb-4 leading-relaxed">
                                        {service.description}
                                    </p>

                                    {service.metrics && (
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-600">{service.metrics.time}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-sm font-medium text-gray-900">{service.metrics.rating}</span>
                                            </div>
                                            <div className="text-lg font-bold text-indigo-600">
                                                {service.metrics.price}
                                            </div>
                                        </div>
                                    )}

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full mt-4"
                                        fullWidth
                                        onClick={() => openWhatsApp(`I need a ${service.title}. Please help me create one.`)}
                                    >
                                        Get Started
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ============================================================================
// HOW IT WORKS - Process Flow (Condensed)
// ============================================================================

const HowItWorksSection = () => {
    const steps: Step[] = [
        {
            id: "step-1",
            number: 1,
            title: "Share Requirements",
            description: "Tell us about your affidavit needs via WhatsApp",
            icon: <MessageCircle className="w-6 h-6" />,
            details: ["Select affidavit type", "Provide personal details", "Share supporting docs"],
            estimatedTime: "5-7 min",
        },
        {
            id: "step-2",
            number: 2,
            title: "Expert Drafting",
            description: "AI generates draft, reviewed by legal experts",
            icon: <BrainIcon className="w-6 h-6" />,
            details: ["AI-powered generation", "Lawyer verification", "Legal compliance check"],
            estimatedTime: "2-4 hours",
        },
        {
            id: "step-3",
            number: 3,
            title: "Final Delivery",
            description: "Review, request changes, download document",
            icon: <Download className="w-6 h-6" />,
            details: ["Unlimited revisions", "Download PDF/DOCX", "Notary guidance"],
            estimatedTime: "Instant",
        },
    ];

    return (
        <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 bg-purple-100 rounded-full px-4 py-1.5 mb-4">
                        <Rocket className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-900">Simple Process</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                        Get Your Affidavit in{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                            3 Easy Steps
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600">
                        No complexity, no paperwork hassle - just a smooth digital experience
                    </p>
                </AnimatedSection>

                <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                    {steps.map((step, idx) => (
                        <AnimatedSection key={step.id} animation="fade-up" delay={idx * 200}>
                            <div className="relative group">
                                <div className="relative z-10 flex justify-center mb-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-xl group-hover:scale-110 transition-all duration-300">
                                        {step.number}
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-indigo-600 mb-4 mx-auto shadow-sm">
                                        {step.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                                    <p className="text-gray-600 mb-4">{step.description}</p>
                                    <div className="text-left bg-white rounded-lg p-3 mb-3">
                                        {step.details.map((detail, i) => (
                                            <div key={i} className="flex items-center gap-2 text-sm text-gray-600 py-1">
                                                <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                                                <span>{detail}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="inline-flex items-center gap-1 text-xs text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                                        <Clock className="w-3 h-3" />
                                        <span>{step.estimatedTime}</span>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ============================================================================
// PRICING SECTION - Enterprise Tiered Pricing (Condensed)
// ============================================================================

const PricingSection = () => {
    const tiers: PricingTier[] = [
        {
            id: "basic",
            name: "Essential",
            price: 999,
            period: "one-time",
            description: "Perfect for simple affidavit needs",
            features: [
                { name: "Standard affidavit drafting", included: true },
                { name: "AI-powered generation", included: true },
                { name: "Email support", included: true },
                { name: "Lawyer review", included: false },
                { name: "Notary assistance", included: false },
            ],
            cta: "Get Started",
        },
        {
            id: "professional",
            name: "Professional",
            price: 1999,
            period: "one-time",
            description: "Most popular for comprehensive needs",
            features: [
                { name: "Everything in Essential", included: true },
                { name: "Expert lawyer review", included: true },
                { name: "Unlimited revisions", included: true },
                { name: "24/7 priority support", included: true },
                { name: "Notary guidance", included: true },
            ],
            cta: "Choose Plan",
            popular: true,
        },
        {
            id: "business",
            name: "Enterprise",
            price: 4999,
            period: "one-time",
            description: "For businesses and bulk requirements",
            features: [
                { name: "Everything in Professional", included: true },
                { name: "Bulk document processing", included: true },
                { name: "Dedicated account manager", included: true },
                { name: "Legal compliance certificate", included: true },
                { name: "Custom template creation", included: true },
            ],
            cta: "Contact Sales",
        },
    ];

    return (
        <section id="pricing" className="py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 bg-green-100 rounded-full px-4 py-1.5 mb-4">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-900">Simple Pricing</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                        Affordable Plans for{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600">
                            Every Budget
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600">
                        Transparent pricing with no hidden fees
                    </p>
                </AnimatedSection>

                <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {tiers.map((tier, idx) => (
                        <AnimatedSection key={tier.id} animation="fade-up" delay={idx * 150}>
                            <div className={`
                relative rounded-2xl transition-all duration-300 hover:-translate-y-2
                ${tier.popular
                                    ? "bg-white shadow-2xl border-2 border-indigo-200 scale-105 lg:scale-110 z-10"
                                    : "bg-white shadow-lg border border-gray-100"
                                }
              `}>
                                {tier.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                                            Most Popular
                                        </div>
                                    </div>
                                )}

                                <div className="p-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                                    <p className="text-gray-500 mb-4">{tier.description}</p>

                                    <div className="mb-6">
                                        <span className="text-5xl font-bold text-gray-900">₹{tier.price}</span>
                                        <span className="text-gray-500"> / {tier.period}</span>
                                    </div>

                                    <Button
                                        variant={tier.popular ? "primary" : "outline"}
                                        fullWidth
                                        size="lg"
                                        onClick={() => openWhatsApp(`I'm interested in the ${tier.name} plan. Tell me more.`)}
                                    >
                                        {tier.cta} on WhatsApp
                                    </Button>

                                    <div className="mt-6 space-y-3">
                                        {tier.features.map((feature, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                {feature.included ? (
                                                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                                                ) : (
                                                    <X className="w-4 h-4 text-gray-300 shrink-0" />
                                                )}
                                                <span className={`text-sm ${feature.included ? "text-gray-700" : "text-gray-400"}`}>
                                                    {feature.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ============================================================================
// BENEFITS SECTION - Key Advantages (Replaces Comparison)
// ============================================================================

const BenefitsSection = () => {
    const benefits = [
        {
            icon: <Zap className="w-6 h-6 text-indigo-600" />,
            title: "Lightning Fast",
            description: "Get your affidavit in 2-4 hours instead of 3-7 days",
        },
        {
            icon: <Shield className="w-6 h-6 text-indigo-600" />,
            title: "Legally Verified",
            description: "Reviewed by experienced lawyers for full compliance",
        },
        {
            icon: <MessageCircle className="w-6 h-6 text-indigo-600" />,
            title: "24/7 Support",
            description: "Real-time assistance via WhatsApp anytime",
        },
        {
            icon: <FileCheck className="w-6 h-6 text-indigo-600" />,
            title: "Unlimited Revisions",
            description: "Free changes until you're completely satisfied",
        },
        {
            icon: <Lock className="w-6 h-6 text-indigo-600" />,
            title: "Bank-Grade Security",
            description: "256-bit SSL encryption for your data",
        },
        {
            icon: <Award className="w-6 h-6 text-indigo-600" />,
            title: "Money-Back Guarantee",
            description: "30-day guarantee, no questions asked",
        },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 bg-indigo-100 rounded-full px-4 py-1.5 mb-4">
                        <Crown className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm font-medium text-indigo-900">Why Choose Us</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                        Better Than{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                            Traditional Process
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600">
                        Experience the modern way of legal documentation
                    </p>
                </AnimatedSection>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {benefits.map((benefit, idx) => (
                        <AnimatedSection key={idx} animation="fade-up" delay={idx * 100}>
                            <div className="flex gap-4 p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
                                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0">
                                    {benefit.icon}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">{benefit.title}</h3>
                                    <p className="text-sm text-gray-600">{benefit.description}</p>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <p className="text-gray-500 text-sm">Join 500+ satisfied customers who made the switch</p>
                </div>
            </div>
        </section>
    );
};

// ============================================================================
// TESTIMONIALS - Social Proof (Condensed)
// ============================================================================

const TestimonialsSection = () => {
    const testimonials: Testimonial[] = [
        {
            id: "1",
            name: "Swapnil Anand",
            role: "Property Owner",
            company: "Real Estate Investor",
            content: "Took notary service for name change in property documents. The entire process was smooth, and I got my registered affidavit within 24 hours. Saved me from 3 trips to the notary office!",
            rating: 5,
            avatar: "SA",
            date: "5 months ago",
            verified: true,
            service: "Name Change Affidavit"
        },
        {
            id: "2",
            name: "Jay Kumar",
            role: "Homeowner",
            company: "Residential Property",
            content: "Needed an affidavit for electricity connection at my new house. NyayMitra delivered within 2 hours. The document was perfect and accepted by the electricity department without any issues.",
            rating: 5,
            avatar: "JK",
            date: "2 weeks ago",
            verified: true,
            service: "Address Proof Affidavit"
        },
        {
            id: "3",
            name: "Ramesh Sharma",
            role: "Business Owner",
            company: "Sharma Enterprises",
            content: "The affidavit was perfect and legally sound. Saved me from multiple trips to the notary. Highly recommended for any legal documentation needs.",
            rating: 5,
            avatar: "RS",
            date: "1 month ago",
            verified: true,
            service: "Income Proof Affidavit"
        },
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-indigo-50/30 to-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 bg-yellow-100 rounded-full px-4 py-1.5 mb-4">
                        <Star className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-medium text-yellow-900">Real Customer Stories</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                        Trusted by{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">
                            500+ Indians
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600">
                        Real reviews from real customers who got their affidavits done
                    </p>
                </AnimatedSection>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {testimonials.map((testimonial, idx) => (
                        <AnimatedSection key={testimonial.id} animation="fade-up" delay={idx * 150}>
                            <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                                {/* Service Badge */}
                                <div className="absolute -top-3 left-6">
                                    <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-medium px-3 py-1 rounded-full">
                                        {testimonial.service}
                                    </span>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center gap-1 mb-4 mt-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                    <span className="text-xs text-gray-500 ml-2">5.0</span>
                                </div>

                                {/* Quote Icon */}
                                <QuoteIcon className="w-8 h-8 text-indigo-200 mb-3" />

                                {/* Content */}
                                <p className="text-gray-700 mb-4 leading-relaxed flex-grow">
                                    "{testimonial.content}"
                                </p>

                                {/* User Info */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div>
                                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                        <div className="text-sm text-gray-500">{testimonial.role}</div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <BadgeCheck className="w-4 h-4 text-green-500" />
                                        <span className="text-xs text-gray-400">Verified</span>
                                    </div>
                                </div>

                                {/* Date */}
                                <div className="text-xs text-gray-400 mt-2">
                                    {testimonial.date}
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>

                {/* Trust Badge Row */}
                <div className="flex flex-wrap justify-center gap-6 mt-12 pt-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-sm text-gray-600">100% Legal Valid</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Timer className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm text-gray-600">24hr Delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <Shield className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="text-sm text-gray-600">Expert Reviewed</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

// ============================================================================
// FAQ SECTION - Comprehensive (Condensed)
// ============================================================================

const FAQSection = () => {
    const faqs: FAQ[] = [
        {
            id: "q1",
            question: "Is online affidavit valid in India?",
            answer: "Yes, online affidavits are completely valid in India when properly notarized. Our affidavits follow the standard format prescribed by the Indian Evidence Act.",
            category: "Legal",
        },
        {
            id: "q2",
            question: "How long does it take to get my affidavit?",
            answer: "Most standard affidavits are delivered within 2-4 hours. Complex cases may take up to 24 hours.",
            category: "Timeline",
        },
        {
            id: "q3",
            question: "Can I make changes after drafting?",
            answer: "Absolutely! We offer unlimited free revisions until you're completely satisfied.",
            category: "Process",
        },
        {
            id: "q4",
            question: "Is my information secure?",
            answer: "We use bank-grade 256-bit SSL encryption. Documents are auto-deleted after 30 days.",
            category: "Security",
        },
    ];

    const [openFAQ, setOpenFAQ] = useState<string | null>("q1");

    return (
        <section id="faqs" className="py-24 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-1.5 mb-4">
                        <HelpCircle className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">FAQs</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                        Common{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                            Questions
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600">
                        Everything you need to know
                    </p>
                </AnimatedSection>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq) => (
                        <div key={faq.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <button
                                onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                            >
                                <span className="font-semibold text-gray-900">{faq.question}</span>
                                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openFAQ === faq.id ? "rotate-180" : ""}`} />
                            </button>
                            {openFAQ === faq.id && (
                                <div className="px-6 pb-4 pt-0">
                                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Button variant="outline" onClick={() => openWhatsApp("I have a question about affidavits.")}>
                        <MessageCircle className="w-4 h-4" />
                        Ask on WhatsApp
                    </Button>
                </div>
            </div>
        </section>
    );
};

// ============================================================================
// FINAL CTA - Conversion Focused
// ============================================================================

const FinalCTASection = () => {
    return (
        <section className="py-24 bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-900 relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full filter blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative text-center z-10">
                <AnimatedSection>
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-medium text-white">Ready to get started?</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Create Your Affidavit
                        <span className="block text-indigo-200"> in Minutes</span>
                    </h2>
                    <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of satisfied customers who trust NyayMitra.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button variant="primary" size="xl" className="bg-white text-indigo-600 hover:bg-gray-100" onClick={() => openWhatsApp("I want to create an affidavit right now.")}>
                            <MessageCircle className="w-5 h-5" />
                            Start on WhatsApp - ₹999 Only
                        </Button>
                        <Button variant="outline" size="xl" className="border-white text-white hover:bg-white/10" onClick={() => openWhatsApp("Can I get a callback?")}>
                            <Phone className="w-5 h-5" />
                            Request Callback
                        </Button>
                    </div>
                    <div className="mt-8 flex flex-wrap justify-center gap-4 text-indigo-200 text-sm">
                        <span className="flex items-center gap-1">✓ Free consultation</span>
                        <span className="flex items-center gap-1">✓ 30-day guarantee</span>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

// ============================================================================
// STICKY CTA - Always visible action button (Condensed)
// ============================================================================

const StickyCTA = () => {
    const { isScrolled } = useScrollPosition();

    if (!isScrolled) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col sm:flex-row gap-3 animate-in slide-in-from-bottom-5 duration-300">
            <Button size="md" className="shadow-2xl" onClick={() => openWhatsApp("I need to create an affidavit.")}>
                <Sparkles className="w-4 h-4" />
                Create Affidavit
            </Button>
            <Button variant="secondary" size="md" className="shadow-2xl bg-white" onClick={() => openWhatsApp("I have a question.")}>
                <MessageCircle className="w-4 h-4" />
                Need Help?
            </Button>
        </div>
    );
};

// ============================================================================
// ICON COMPONENTS (missing from lucide-react)
// ============================================================================

const BrainIcon = (props: any) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5v2.5h-4v-2.5c-1.2-.7-2-2-2-3.5a4 4 0 0 1 4-4z" />
        <path d="M8 14v3" />
        <path d="M16 14v3" />
        <path d="M12 20v-2" />
        <path d="M9 17h6" />
    </svg>
);

const QuoteIcon = (props: any) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
    </svg>
);

// ============================================================================
// MAIN PAGE COMPONENT - With NyayMitra Header and Footer
// ============================================================================

export default function AffidavitOnlineIndiaPage() {
    return (
        <main className="min-h-screen bg-white font-sans antialiased">
            <Header />
            <HeroSection />
            <ServicesSection />
            <HowItWorksSection />
            <PricingSection />
            <BenefitsSection />
            <TestimonialsSection />
            <FAQSection />
            <FinalCTASection />
            <StickyCTA />
            <Footer />
        </main>
    );
}