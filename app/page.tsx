"use client"
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2, ChevronRight, Briefcase, Bell, ThumbsUp, CalendarCheck, PenTool, IndianRupee, ShieldCheck } from 'lucide-react'; // or your icon library
import { User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import {
  Scale,
  MessageCircle,
  Video,
  Shield,
  Star,
  Globe,
  Menu,
  X,
  ArrowRight,
  MapPin,
  Mail,
  PhoneCall,
  Sparkles,
  Brain,
  Users,
  FileText,
  Smartphone,
  Languages,
  MapIcon,
  Bot,
  FileCheck,
  Stamp,
  MessageSquare,
  Heart,
  Wifi,
  Clock,
  TrendingUp,
  Play,
  Award,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { sign } from 'crypto';

interface Profile {
  id: string;
  name: string;
  email: string;
  role: 'lawyer' | 'user';
  avatar?: string;
  phoneNumber?: string;
  // Add any other fields you need
}


export default function HomePage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null)
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("--:--:--"); // Changed to string type
  const [sparklePositions, setSparklePositions] = useState<Array<{ left: string, top: string }>>([]);
  const [floatElements, setFloatElements] = useState<Array<{
    left: string
    top: string
    delay: string
    duration: string
  }>>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);


  useEffect(() => {
    setMounted(true); // Set mounted to true when component mounts on client
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      try {
        const parsed = JSON.parse(storedProfile);
        setProfile(parsed);
      } catch (error) {
        console.error("Failed to parse userProfile from localStorage", error);
      }
    }
  }, []);


  useEffect(() => {
    // Only run on client side
    setIsLoaded(true);
    setCurrentTime(new Date().toLocaleTimeString());

    // Initialize random positions
    setSparklePositions(
      Array(6).fill(0).map(() => ({
        left: `${20 + Math.random() * 60}%`,
        top: `${20 + Math.random() * 60}%`
      }))
    );

    setFloatElements(
      Array(12).fill(0).map((_, i) => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${6 + Math.random() * 4}s`
      }))
    );

    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearInterval(timer);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const content = {
    en: {
      nav: {
        home: "Home",
        services: "Services",
        lawyers: "Find Lawyers",
        legalGPT: "Legal GPT",
        about: "About",
        contact: "Contact",
        login: "Login",
        signup: "Sign Up",
      },
      hero: {
        title: "Justice for All",
        subtitle: "Anywhere, Anytime",
        description:
          "Create legal documents in minutes, talk to trusted lawyers, and get papers notarized — all from your phone, anywhere in India. Simple, fast, and affordable legal help for everyone.",
        ctaPrimary: "Talk to AI Now",
        ctaSecondary: "Start Digital Notary",
        liveStatus: "AI System Online",
        stats: {
          cases: "1M+ Cases Resolved",
          lawyers: "50K+ Expert Lawyers",
          success: "99.9% Success Rate",
          response: "< 30 Sec Response",
        },
      },

      howItWorks: {
        title: "How It Works",
        subtitle: "From legal doubt to resolution – in a few simple steps",
        steps: [
          {
            title: "Choose a Service",
            description: "Start by selecting what you need – self-attested docs, notary, legal notice, or consult a lawyer.",
            icon: FileCheck, // you can replace with your preferred icon
            color: "from-blue-500 to-indigo-500",
          },
          {
            title: "Book & Pay Securely",
            description: "Pick your time, preferred mode (chat/call/video), and pay securely through our platform.",
            icon: CalendarCheck,
            color: "from-purple-500 to-pink-500",
          },
          {
            title: "Get Notified & Connect",
            description: "Receive instant booking confirmation, reminders, and connect directly at your scheduled time.",
            icon: Bell,
            color: "from-green-500 to-emerald-500",
          },
          {
            title: "Receive Legal Help",
            description: "Your lawyer helps you live. Post-session, access receipts and documents, and give feedback.",
            icon: ThumbsUp,
            color: "from-yellow-500 to-orange-500",
          },
        ],
      },
      whyChoose: {
        title: "Why Choose NyayMitra",
        subtitle: "India’s Fastest Legal Assistant – Affordable. Instant. Reliable.",
        features: [
          {
            title: "Instant Legal Documents",
            description: "Download affidavits, agreements, and notices in minutes using AI-powered templates.",
            icon: FileText, // or FileCheck if available
          },
          {
            title: "Remote Notarization",
            description: "Get documents notarized online or via courier with licensed lawyers across India.",
            icon: PenTool,
          },
          {
            title: "Affordable Lawyer Access",
            description: "Verified lawyers. Transparent pricing. No surprise fees – starting at ₹99.",
            icon: IndianRupee, // or BadgeCheck
          },
          {
            title: "AI + Human Legal Help",
            description: "Blend of AI tools and expert lawyers for faster, smarter legal solutions.",
            icon: Bot, // or Sparkles if available
          },
        ],
      },
      features: {
        title: "Powerful Features",
        subtitle: "Smart, affordable and fast legal support at your fingertips",
        items: [
          {
            title: "Instant Lawyer Booking",
            description: "Book consultations with verified lawyers in minutes — with real-time availability and priority booking.",
            icon: CalendarCheck,
            color: "from-indigo-600 to-purple-600",
          },
          {
            title: "Legal Document Generator",
            description: "Create affidavits, rent agreements, complaints and more in minutes using AI-powered forms.",
            icon: FileText,
            color: "from-blue-600 to-indigo-600",
          },
          {
            title: "Remote Notarization",
            description: "Get documents notarized online or via courier by licensed lawyers anywhere in India.",
            icon: Stamp,
            color: "from-purple-600 to-pink-500",
          },
          {
            title: "Indian Law Trained Legal GPT",
            description: "Get instant legal guidance powered by AI trained on Indian laws, procedures, and real case patterns.",
            icon: Bot,
            color: "from-blue-600 to-indigo-600",
          },
        ]
      }
      ,

      getStarted: {
        title: "Ready to Get Started?",
        subtitle: "Join thousands of Indians who trust NyayMitra for their legal needs",
        description: "Start your legal journey today with free AI consultation and connect with expert lawyers",
        cta: "Start Free Consultation",
        secondary: "Browse Lawyers",
      },
      testimonials: {
        title: "What Our Users Say",
        subtitle: "Real experiences from real people",
        items: [
          {
            name: "Ritika Mehra",
            location: "Lucknow, Uttar Pradesh",
            text: "I booked a lawyer in just 5 minutes through NyayMitra. The consultation was smooth and solved my property issue quickly.",
            rating: 5,
            role: "Teacher",
            avatar: "RM",
          },
          {
            name: "Sunil Verma",
            location: "Indore, Madhya Pradesh",
            text: "I used the legal notice generator for a tenant dispute. The draft looked professional and was ready instantly.",
            rating: 5,
            role: "Landlord",
            avatar: "SV",
          },
          {
            name: "Neha D'Souza",
            location: "Bangalore, Karnataka",
            text: "Their remote notary service saved me a trip to the court. Got my affidavit notarized and delivered at home within 2 days!",
            rating: 5,
            role: "Working Professional",
            avatar: "ND",
          },
          {
            name: "Dr. Anil Chauhan",
            location: "Chandigarh",
            text: "The AI-based legal assistant understood my licensing concerns perfectly and gave accurate suggestions. Very impressive!",
            rating: 5,
            role: "Doctor",
            avatar: "AC",
          },
          {
            name: "Pooja Sharma",
            location: "Varanasi, Uttar Pradesh",
            text: "I uploaded my rent agreement draft and received a detailed lawyer review within hours. Great value for ₹499!",
            rating: 5,
            role: "Freelancer",
            avatar: "PS",
          },
          {
            name: "Adv. Raghav Deshmukh",
            location: "Pune, Maharashtra",
            text: "The platform connects me with genuine clients, and AI-based case summaries save me time. A game-changer for lawyers.",
            rating: 5,
            role: "Lawyer",
            avatar: "RD",
          },
        ],
      },
      footer: {
        company: "NyayMitra",
        tagline: "Making legal help accessible to every Indian",
        quickLinks: "Quick Links",
        legal: "Legal",
        contact: "Contact Us",
        address: "Bhagalpur, Bihar - 812002",
        email: "nyaymitra.ai@gmail.com",
        phone: "+91 79705 96183",
        // whatsapp: "+91 79705 96183",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        disclaimer: "Legal Disclaimer",
        about: "About NyayMitra",
        // careers: "Careers",
        deliveryPolicy: "Shipping & Delivery Policy",
        press: "Press",
        blog: "Blog",
        signup: "Sign Up",
        signin: "Login",
      },
    },
    hi: {
      nav: {
        home: "होम",
        services: "सेवाएं",
        lawyers: "वकील खोजें",
        legalGPT: "लीगल GPT",
        about: "हमारे बारे में",
        contact: "संपर्क",
        login: "लॉगिन",
        signup: "साइन अप",
      },
      hero: {
        title: "सभी के लिए न्याय",
        subtitle: "कहीं भी, कभी भी",
        description:
          "कानूनी दस्तावेज पाएं, भरोसेमंद वकीलों से बात करें, और नोटरी से दस्तावेज सत्यापित करवाएं — सब कुछ मोबाइल से, भारत में कहीं भी। आसान, तेज़ और सस्ती कानूनी मदद।",
        ctaPrimary: "अभी AI से बात करें",
        ctaSecondary: "तुरंत नोटरी सेवा शुरू करें",
        liveStatus: "AI सिस्टम ऑनलाइन",
        stats: {
          cases: "10 लाख+ मामले हल",
          lawyers: "50 हज़ार+ विशेषज्ञ वकील",
          success: "99.9% सफलता दर",
          response: "30 सेकंड से कम में जवाब",
        },
      },

      howItWorks: {
        title: "यह कैसे काम करता है",
        subtitle: "कानूनी सहायता पाने के आसान और भरोसेमंद चरण",
        steps: [
          {
            title: "सेवा चुनें",
            description: "सेल्फ-अटेस्टेड दस्तावेज़, रिमोट नोटरी, वकील सलाह, या नोटिस जैसी सेवाओं में से चुनें।",
            icon: FileText,
            color: "from-blue-500 to-indigo-500",
          },
          {
            title: "समय तय करें और भुगतान करें",
            description: "अपना पसंदीदा समय और संचार तरीका (कॉल/वीडियो/चैट) चुनें और भुगतान सुरक्षित रूप से करें।",
            icon: CalendarCheck,
            color: "from-purple-500 to-pink-500",
          },
          {
            title: "सूचना प्राप्त करें और जुड़ें",
            description: "बुकिंग की पुष्टि और रिमाइंडर प्राप्त करें, और अपने निर्धारित समय पर वकील से जुड़ें।",
            icon: Bell,
            color: "from-green-500 to-emerald-500",
          },
          {
            title: "सहायता प्राप्त करें और प्रतिक्रिया दें",
            description: "वकील से कानूनी सलाह लें, रसीद और दस्तावेज़ डाउनलोड करें, और अनुभव साझा करें।",
            icon: ThumbsUp,
            color: "from-yellow-500 to-orange-500",
          },
        ],
      },
      whyChoose: {
        title: "न्यायमित्र क्यों चुनें",
        subtitle: "भारत का सबसे तेज़ और भरोसेमंद कानूनी सहायक",
        features: [
          {
            title: "तुरंत कानूनी दस्तावेज़",
            description: "AI की मदद से हलफ़नामे, अनुबंध और नोटिस कुछ ही मिनटों में डाउनलोड करें।",
            icon: FileText,
          },
          {
            title: "ऑनलाइन नोटरी सेवा",
            description: "लाइसेंस प्राप्त वकीलों से दस्तावेज़ ऑनलाइन या कूरियर द्वारा नोटराइज़ करवाएं।",
            icon: PenTool,
          },
          {
            title: "सुलभ वकील सेवाएं",
            description: "प्रामाणिक वकील, पारदर्शी शुल्क – सेवाएं ₹99 से शुरू।",
            icon: IndianRupee,
          },
          {
            title: "AI + मानव विशेषज्ञता",
            description: "AI टूल्स और अनुभवी वकीलों का मेल – तेज़ और सटीक समाधान के लिए।",
            icon: Bot,
          },
        ],
      },
      features: {
        title: "शक्तिशाली सुविधाएं",
        subtitle: "स्मार्ट, किफायती और तेज़ कानूनी सहायता, बस एक क्लिक दूर",
        items: [
          {
            title: "त्वरित वकील बुकिंग",
            description: "सत्यापित वकीलों से मिनटों में परामर्श बुक करें — रीयल-टाइम उपलब्धता और प्राथमिकता बुकिंग के साथ।",
            icon: CalendarCheck,
            color: "from-indigo-600 to-purple-600",
          },
          {
            title: "कानूनी दस्तावेज़ जनरेटर",
            description: "AI फॉर्म की मदद से एफिडेविट, किराया समझौते, शिकायतें और अन्य दस्तावेज मिनटों में बनाएं।",
            icon: FileText,
            color: "from-blue-600 to-indigo-600",
          },
          {
            title: "दूरस्थ नोटरी सेवा",
            description: "अपने दस्तावेज़ों को भारत भर में लाइसेंस प्राप्त वकीलों से ऑनलाइन या कूरियर के माध्यम से नोटरी करवाएं।",
            icon: Stamp,
            color: "from-purple-600 to-pink-500",
          },
          {
            title: "भारतीय कानून प्रशिक्षित लीगल GPT",
            description: "भारतीय कानून, प्रक्रियाओं और केस पैटर्न पर प्रशिक्षित AI से तुरंत कानूनी मार्गदर्शन प्राप्त करें।",
            icon: Bot,
            color: "from-blue-600 to-indigo-600",
          },
        ],
      },
      getStarted: {
        title: "शुरुआत करने के लिए तैयार हैं?",
        subtitle: "हजारों भारतीयों में शामिल हों जो अपनी कानूनी जरूरतों के लिए न्यायमित्र पर भरोसा करते हैं",
        description: "मुफ्त AI परामर्श के साथ आज ही अपनी कानूनी यात्रा शुरू करें और विशेषज्ञ वकीलों से जुड़ें",
        cta: "मुफ्त परामर्श शुरू करें",
        secondary: "वकील ब्राउज़ करें",
      },
      testimonials: {
        title: "हमारे उपयोगकर्ता क्या कहते हैं",
        subtitle: "वास्तविक लोगों के वास्तविक अनुभव",
        items: [
          {
            name: "ऋतिका मेहरा",
            location: "लखनऊ, उत्तर प्रदेश",
            text: "मैंने सिर्फ 5 मिनट में वकील बुक किया और उसी दिन परामर्श मिला। संपत्ति विवाद में तुरंत समाधान मिला।",
            rating: 5,
            role: "शिक्षिका",
            avatar: "RM",
          },
          {
            name: "सुनील वर्मा",
            location: "इंदौर, मध्यप्रदेश",
            text: "किरायेदार विवाद के लिए मैंने कानूनी नोटिस जनरेटर का उपयोग किया। टेम्पलेट बढ़िया था और तुरंत मिल गया।",
            rating: 5,
            role: "मकान मालिक",
            avatar: "SV",
          },
          {
            name: "नेहा डी’सूज़ा",
            location: "बेंगलुरु, कर्नाटक",
            text: "नोटरी सेवा ने मुझे कोर्ट जाने से बचा लिया। दो दिन में दस्तावेज़ घर पहुँच गया। बहुत ही आसान और प्रभावी।",
            rating: 5,
            role: "कामकाजी महिला",
            avatar: "ND",
          },
          {
            name: "डॉ. अनिल चौहान",
            location: "चंडीगढ़",
            text: "AI ने मेरे मेडिकल-कानूनी प्रश्नों को सही से समझा और स्पष्ट सुझाव दिए। यह तकनीक वाकई प्रभावशाली है।",
            rating: 5,
            role: "चिकित्सक",
            avatar: "AC",
          },
          {
            name: "पूजा शर्मा",
            location: "वाराणसी, उत्तर प्रदेश",
            text: "मैंने अपना रेंट एग्रीमेंट अपलोड किया और कुछ ही घंटों में वकील का विस्तृत रिव्यू मिला। सिर्फ ₹499 में बहुत काम आया।",
            rating: 5,
            role: "फ्रीलांसर",
            avatar: "PS",
          },
          {
            name: "अधिवक्ता राघव देशमुख",
            location: "पुणे, महाराष्ट्र",
            text: "मुझे यहां गुणवत्तापूर्ण क्लाइंट्स मिलते हैं और AI केस की शुरुआती स्कैनिंग कर देता है, जिससे समय बचता है।",
            rating: 5,
            role: "वकील",
            avatar: "RD",
          },
        ],
      },
      footer: {
        company: "न्यायमित्र",
        tagline: "हर भारतीय के लिए कानूनी सहायता को सुलभ बनाना",
        quickLinks: "त्वरित लिंक",
        legal: "कानूनी",
        contact: "संपर्क करें",
        address: "रामसर, भागलपुर, बिहार - 812002",
        email: "nyaymitra.ai@gmail.com",
        phone: "+91 79705 96183",
        // whatsapp: "+91 79705 96183",
        privacy: "गोपनीयता नीति",
        terms: "सेवा की शर्तें",
        disclaimer: "कानूनी अस्वीकरण",
        about: "न्यायमित्र के बारे में",
        // careers: "करियर",
        deliveryPolicy: "शिपिंग और डिलीवरी नीति",
        press: "प्रेस",
        blog: "ब्लॉग",
        signup: "साइन अप",
        signin: "लॉगिन",
      },
    },
  }

  const t = content[language]
  if (!mounted) return null; // prevent hydration mismatch in Next.js

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Enhanced Beautiful Background */}
      <div className="fixed inset-0 z-0">
        {/* Sophisticated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/30 via-purple-900/20 to-black" />

        {/* Elegant Mesh Gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div
            className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500/15 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
            style={{ animationDelay: "4s" }}
          />
        </div>

        {/* Sophisticated Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.3)_1px,transparent_1px)] bg-[size:100px_100px]" />
        </div>

        {/* Dynamic Mouse-Following Glow */}
        <div
          className="absolute w-[600px] h-[600px] bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x / 8,
            top: mousePosition.y / 8,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      {/* Navigation remains the same... */}
      <nav className="relative z-50 bg-black/5 backdrop-blur-3xl border-b border-white/5 sticky top-0">
        {/* Top Status Bar */}
        {/* <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-8 text-xs">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-300 font-medium">{t.hero.liveStatus}</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-300">
                  <Clock className="h-3 w-3" />
                  {currentTime}
                </div>
              </div>
              <div className="flex items-center space-x-4 text-white/60">
                <div className="flex items-center space-x-1">
                  <Wifi className="h-3 w-3" />
                  <span>99.9% Uptime</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>1k+ Active Users</span>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Main Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Enhanced Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-4 group">
                <div className="relative">
                  {/* Outer Glow Ring */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-lg opacity-30 group-hover:opacity-60 transition-all duration-500 animate-pulse" />

                  {/* Main Logo Container */}
                  <div className="relative bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4 rounded-2xl shadow-2xl transform group-hover:scale-110 transition-all duration-500">
                    <Scale className="h-8 w-8 text-white group-hover:rotate-12 transition-transform duration-500" />

                    {/* Inner Sparkles */}
                    <div className="absolute inset-0 rounded-2xl overflow-hidden">
                      {sparklePositions.map((pos, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full animate-ping"
                          style={{
                            left: pos.left,
                            top: pos.top,
                            animationDelay: `${i * 0.3}s`,
                            animationDuration: "2s"
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-3xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-white group-hover:via-blue-200 group-hover:to-purple-200 transition-all duration-500">
                    NyayMitra
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-white/60 font-medium tracking-wider uppercase">
                      Legal AI Platform
                    </span>
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
                      <div
                        className="w-1 h-1 bg-purple-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0.5s" }}
                      />
                      <div
                        className="w-1 h-1 bg-pink-400 rounded-full animate-pulse"
                        style={{ animationDelay: "1s" }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-2">
                {Object.entries(t.nav)
                  .slice(0, -2)
                  .map(([key, value], index) => (
                    <Link
                      key={key}
                      href={
                        key === "home" ? "/" :
                          key === "legalGPT" ? "/legal-ai" : // Special case for Legal GPT
                            `/${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`
                      }
                      className="relative text-white/70 hover:text-white px-4 py-3 text-sm font-medium transition-all duration-500 group"
                    >
                      <div className="relative z-10 flex items-center space-x-2">
                        <span>{value}</span>
                        {index === 0 && <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />}
                      </div>

                      {/* Hover Background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-95 group-hover:scale-100 blur-sm group-hover:blur-none" />

                      {/* Bottom Indicator */}
                      <div className="absolute bottom-0 left-1/2 w-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 group-hover:w-3/4 transition-all duration-500 transform -translate-x-1/2 rounded-full" />

                      {/* Side Glow */}
                      <div className="absolute inset-y-0 -left-2 w-1 bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-full blur-sm" />
                    </Link>
                  ))}
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Language Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(language === "en" ? "hi" : "en")}
                className="bg-white/5 border-white/10 text-white hover:bg-white/10 backdrop-blur-xl transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Globe className="h-4 w-4 mr-2 group-hover:rotate-180 transition-transform duration-700" />
                <span className="relative z-10 font-medium">{language === "en" ? "हिं" : "EN"}</span>
              </Button>

              {mounted && isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="sm"
                      className="bg-white/5 border-white/10 text-white hover:bg-white/10 backdrop-blur-xl transition-all duration-500 group relative overflow-hidden"
                      disabled={isProfileLoading}
                    >
                      {isProfileLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Loading...
                        </div>
                      ) : (
                        <>
                          <User className="h-4 w-4 mr-2" />
                          Profile
                        </>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="mt-2 w-48 bg-black/90 border border-white/10 rounded-md shadow-lg p-2 text-white"
                    sideOffset={5}
                  >
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="block px-3 py-2 hover:bg-white/10 rounded">
                        My Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        window.location.href = 'https://nyay-dashboard.netlify.app/';
                      }}
                    >
                      <div className="flex items-center gap-3 w-full justify-between">
                        <div className="flex items-center gap-3">
                          <BarChart2 className="h-5 w-5 text-green-500" />
                          <span>My Dashboard</span>
                        </div>
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </DropdownMenuItem>



                    <DropdownMenuItem asChild>
                      <button
                        onClick={() => {
                          localStorage.removeItem("token");
                          window.location.reload();
                        }}
                        className="block w-full text-left px-3 py-2 hover:bg-white/10 rounded"
                      >
                        Logout
                      </button>
                    </DropdownMenuItem>
                    {profile?.role !== "lawyer" && (
                      <DropdownMenuItem asChild>
                        <Link href="/all-bookings" className="block px-3 py-2 hover:bg-white/10 rounded">
                          My Bookings
                        </Link>
                      </DropdownMenuItem>
                    )}


                  </DropdownMenuContent>
                </DropdownMenu>
              ) : mounted && (
                <>
                  {/* Login Button */}
                  <Link href="/auth/login">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/5 border-white/10 text-white hover:bg-white/10 backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                    >
                      {t.nav.login}
                    </Button>
                  </Link>

                  {/* Signup Button */}
                  <Link href="/auth/signup">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 border-0 shadow-xl shadow-blue-500/25 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/40 group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <Sparkles className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-500" />
                      <span className="relative z-10">{t.nav.signup}</span>
                    </Button>
                  </Link>
                </>
              )}
            </div>


            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:bg-white/10 transition-all duration-300"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>


        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-3xl border-b border-white/10 animate-fade-in">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {/* Show regular nav links */}
              {Object.entries(t.nav)
                .filter(([key]) => !['login', 'signup'].includes(key)) // Filter out login/signup when logged in
                .map(([key, value]) => (
                  <Link
                    key={key}
                    href={
                      key === "home"
                        ? "/"
                        : key === "legalGPT"
                          ? "/legal-ai"
                          : `/${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`
                    }
                    className="text-white/80 hover:text-white block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg hover:bg-white/10"
                  >
                    {value}
                  </Link>

                ))}

              {/* Show profile and logout when logged in */}
              {mounted && isLoggedIn && (
                <>
                  <Link
                    href="/profile"
                    className="text-white/80 hover:text-white block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg hover:bg-white/10"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      const token = localStorage.getItem('token');
                      if (!token) {
                        router.push('/auth/login');
                        return;
                      }

                      // Redirect all authenticated users (lawyer or not) to the main dashboard
                      window.location.href = 'https://nyay-dashboard.netlify.app/';
                    }}
                    className="text-white/80 hover:text-white block w-full text-left px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg hover:bg-white/10"
                  >
                    My Dashboard
                  </button>


                  {profile?.role !== "lawyer" && (
                    <Link
                      href="/all-bookings"
                      className="text-white/80 hover:text-white block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg hover:bg-white/10"
                    >
                      My Bookings
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      window.location.reload();
                    }}
                    className="text-white/80 hover:text-white block w-full text-left px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg hover:bg-white/10"
                  >
                    Logout
                  </button>
                </>
              )}

              {/* Show login/signup when not logged in */}
              {mounted && !isLoggedIn && (
                <>
                  <Link
                    href="/auth/login"
                    className="text-white/80 hover:text-white block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg hover:bg-white/10"
                  >
                    {t.nav.login}
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="text-white/80 hover:text-white block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg hover:bg-white/10"
                  >
                    {t.nav.signup}
                  </Link>
                </>
              )}

              {/* Language toggle for mobile */}
              <button
                onClick={() => setLanguage(language === "en" ? "hi" : "en")}
                className="text-white/80 hover:text-white block w-full text-left px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg hover:bg-white/10 flex items-center"
              >
                <Globe className="h-5 w-5 mr-3" />
                {language === "en" ? "हिंदी" : "English"}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Elegant & Eye-Catching Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        {/* Sophisticated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Elegant Floating Orbs */}
          {floatElements.map((element, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: element.left,
                top: element.top,
                animationDelay: element.delay,
                animationDuration: element.duration
              }}
            >
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400/40 to-purple-400/40 rounded-full blur-sm" />
            </div>
          ))}

          {/* Elegant Light Rays */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div
              className="w-[800px] h-[800px] bg-gradient-conic from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-full animate-spin"
              style={{ animationDuration: "20s" }}
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left Column - Content */}
            <div
              className={`space-y-6 md:space-y-8 transition-all duration-1500 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            >
              <div className="text-sm md:text-base text-yellow-300 font-semibold tracking-wide">
                ⚡ Digital Notary Delivered in 12 Hours — Physical Courier in 5–7 Days
              </div>


              {/* Elegant Badge - Responsive */}
              <div className="inline-flex items-center px-6 py-3 md:px-8 md:py-3 rounded-full bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-md border border-blue-300/20 shadow-xl transition-all duration-300 group hover:scale-105 hover:ring-2 hover:ring-purple-400/50 animate-float">
                <Award className="h-6 w-6 text-purple-300 mr-3 drop-shadow-md animate-pulse" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-400 font-bold text-base md:text-lg tracking-wide animate-shimmer">
                  India’s #1 One-Tap Legal Assistant – Draft, Notarize, & Book Lawyers Instantly
                </span>
              </div>

              {/* Sophisticated Title - Responsive */}
              <div className="space-y-4 md:space-y-6">
                <h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight leading-[1.15] sm:leading-[1.2] md:leading-[1.25] text-balance break-words overflow-visible"
                  style={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
                >
                  <span className="block bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-2 md:mb-4">
                    {t.hero.title.split(" ")[0]}
                  </span>
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {t.hero.title.split(" ").slice(1).join(" ")}
                  </span>
                </h1>


                <div className="relative">
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-white/90 tracking-wide">
                    {t.hero.subtitle}
                  </h2>
                  <div className="absolute -bottom-1 left-0 w-16 md:w-24 h-0.5 md:h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                </div>
              </div>

              {/* Elegant Description - Responsive */}
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed font-light max-w-2xl break-words text-pretty">
                <span className="bg-gradient-to-r from-white/95 via-blue-100/85 to-purple-100/75 bg-clip-text text-transparent">
                  {t.hero.description}
                </span>
              </p>


              {/* Premium Free Consultation Banner - Responsive */}
              <div className="relative">
                {/* Floating Notification Badge */}
                <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 z-10">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                    <span className="text-white text-xs font-bold">🔥</span>
                  </div>
                </div>

                <Link href="/lawyers">
                  <div className="group cursor-pointer transform hover:scale-[1.02] md:hover:scale-105 transition-all duration-500">
                    <div className="relative overflow-hidden rounded-xl md:rounded-2xl lg:rounded-3xl bg-gradient-to-r from-emerald-500/15 via-green-500/15 to-teal-500/15 border-2 border-emerald-400/40 backdrop-blur-xl p-4 sm:p-6 md:p-8 shadow-lg md:shadow-2xl shadow-emerald-500/10">
                      {/* Animated Background Glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                      {/* Sparkle Effects */}
                      <div className="absolute inset-0 overflow-hidden rounded-xl md:rounded-2xl lg:rounded-3xl">
                        {Array(8).fill(0).map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 bg-emerald-300 rounded-full animate-ping"
                            style={{
                              left: `${10 + (i * 10)}%`,
                              top: `${10 + (i * 10)}%`,
                              animationDelay: `${i * 0.5}s`,
                              animationDuration: "3s"
                            }}
                          />
                        ))}
                      </div>

                      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
                        <div className="flex items-center space-x-4 md:space-x-6">
                          {/* Icon Container */}
                          <div className="relative">
                            <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-lg md:shadow-xl">
                              <Heart className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-white group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            {/* Floating Badge */}
                            <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                              <span className="text-[8px] md:text-xs">✨</span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="space-y-1 md:space-y-2">
                            <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 md:space-x-3">
                              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black bg-gradient-to-r from-emerald-300 to-green-300 bg-clip-text text-transparent">
                                🎉 First Consultation
                              </span>
                              <div className="px-2 py-0.5 sm:px-3 sm:py-1 md:px-4 md:py-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full w-fit">
                                <span className="text-black font-bold text-sm sm:text-base md:text-lg">FREE</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-x-2 gap-y-1 md:gap-x-4 text-emerald-200/90">
                              <div className="flex items-center space-x-1 md:space-x-2">
                                <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-400" />
                                <span className="text-xs md:text-sm font-medium">No hidden charges</span>
                              </div>
                              <div className="flex items-center space-x-1 md:space-x-2">
                                <Clock className="h-3 w-3 md:h-4 md:w-4 text-blue-400" />
                                <span className="text-xs md:text-sm font-medium">Instant access</span>
                              </div>
                              <div className="flex items-center space-x-1 md:space-x-2">
                                <Shield className="h-3 w-3 md:h-4 md:w-4 text-purple-400" />
                                <span className="text-xs md:text-sm font-medium">100% Confidential</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Arrow with Glow - Hidden on small screens */}
                        <div className="relative hidden sm:block">
                          <div className="absolute inset-0 bg-emerald-400/30 rounded-full blur-lg group-hover:blur-xl transition-all duration-500" />
                          <ArrowRight className="relative h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-emerald-400 group-hover:translate-x-3 group-hover:scale-110 transition-all duration-300" />
                        </div>
                      </div>

                      {/* Bottom Highlight */}
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 md:h-1 bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 rounded-b-xl md:rounded-b-2xl lg:rounded-b-3xl" />
                    </div>
                  </div>
                </Link>
              </div>

              {/* Sophisticated CTA Buttons - Responsive */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
                <Link href="/legal-gpt">
                  <Button
                    size="lg"
                    className="text-base md:text-lg px-6 py-4 md:px-8 md:py-5 lg:px-10 lg:py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 border-0 shadow-lg md:shadow-xl lg:shadow-2xl shadow-blue-500/25 hover:shadow-purple-500/40 transition-all duration-500 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <MessageCircle className="mr-2 md:mr-3 h-5 w-5 md:h-6 md:w-6 group-hover:scale-110 transition-transform duration-300" />
                    <span className="relative z-10 font-semibold">{t.hero.ctaPrimary}</span>
                    <ArrowRight className="ml-2 md:ml-3 h-5 w-5 md:h-6 md:w-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </Button>
                </Link>

                <Link href="/services/notary">
                  <Button
                    size="lg"
                    className="text-base md:text-lg px-6 py-4 md:px-8 md:py-5 lg:px-10 lg:py-6 bg-gradient-to-r from-yellow-400 to-orange-400 text-black hover:from-yellow-500 hover:to-orange-500 shadow-lg transition-all duration-500 group relative overflow-hidden"
                  >
                    <FileText className="mr-2 md:mr-3 h-5 w-5 md:h-6 md:w-6" />
                    <span className="relative z-10 font-semibold">{t.hero.ctaSecondary}</span>
                    <ArrowRight className="ml-2 md:ml-3 h-5 w-5 md:h-6 md:w-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </Button>
                </Link>


              </div>

              {/* Trust Indicators - Responsive */}
              <div className="flex flex-wrap gap-3 md:gap-4 lg:gap-6 md:space-x-0 pt-2 md:pt-4">
                <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-400" />
                <span className="text-white/70 text-xs md:text-sm">
                  Built with <span className="font-medium text-green-300">Real User Insights</span>
                </span>

                <div className="flex items-center space-x-2 md:space-x-3">
                  <Shield className="h-4 w-4 md:h-5 md:w-5 text-blue-400" />
                  <span className="text-white/70 text-xs md:text-sm">
                    <span className="font-medium text-blue-300">Secure</span> Payments
                  </span>

                </div>
                <div className="flex items-center space-x-2 md:space-x-3 animate-fade-in" style={{ animationDelay: "0.6s" }}>
                  <ShieldCheck className="h-4 w-4 md:h-5 md:w-5 text-teal-400" />
                  <span className="text-white/70 text-xs md:text-sm">
                    <span className="font-medium text-teal-300">Verified</span> Lawyers
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Animated Legal Illustration */}
            <div
              className={`relative transition-all duration-1500 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
              style={{ animationDelay: "0.3s" }}
            >
              {/* Main Illustration Container */}
              <div className="relative w-full max-w-lg mx-auto">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />

                {/* Central Justice Scale */}
                <div className="relative z-10 flex flex-col items-center">
                  {/* Floating Crown/Badge */}
                  <div className="mb-8 animate-float">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-yellow-500/25 transform rotate-12 hover:rotate-0 transition-transform duration-700">
                        <Award className="h-10 w-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-ping">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Main Scale of Justice */}
                  <div className="relative mb-8">
                    {/* Scale Base */}
                    <div className="w-4 h-32 bg-gradient-to-b from-gray-300 to-gray-600 rounded-full mx-auto shadow-lg" />

                    {/* Scale Beam */}
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                      <div className="w-48 h-2 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full shadow-lg animate-pulse" />

                      {/* Left Scale Pan */}
                      <div className="absolute -left-8 top-2 transform -translate-x-1/2">
                        <div
                          className="flex flex-col items-center animate-bounce"
                          style={{ animationDelay: "0s", animationDuration: "3s" }}
                        >
                          <div className="w-3 h-8 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full" />
                          <div className="w-16 h-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-lg" />
                          <div className="w-20 h-2 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full" />
                          {/* AI Symbol */}
                          <div className="mt-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                            <Brain className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Right Scale Pan */}
                      <div className="absolute -right-8 top-2 transform translate-x-1/2">
                        <div
                          className="flex flex-col items-center animate-bounce"
                          style={{ animationDelay: "1.5s", animationDuration: "3s" }}
                        >
                          <div className="w-3 h-8 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full" />
                          <div className="w-16 h-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-lg" />
                          <div className="w-20 h-2 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full" />
                          {/* Human Symbol */}
                          <div className="mt-2 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                            <Users className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Legal Elements */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Floating Documents */}
                    <div
                      className="absolute top-16 -left-12 animate-float"
                      style={{ animationDelay: "0s", animationDuration: "4s" }}
                    >
                      <div className="w-12 h-16 bg-gradient-to-b from-white/90 to-gray-100 rounded-lg shadow-lg border border-gray-200 transform rotate-12 hover:rotate-0 transition-transform duration-500">
                        <div className="p-2">
                          <div className="w-full h-1 bg-gray-300 rounded mb-1" />
                          <div className="w-3/4 h-1 bg-gray-300 rounded mb-1" />
                          <div className="w-full h-1 bg-gray-300 rounded mb-1" />
                          <div className="w-1/2 h-1 bg-gray-300 rounded" />
                        </div>
                      </div>
                    </div>

                    <div
                      className="absolute top-32 -right-16 animate-float"
                      style={{ animationDelay: "2s", animationDuration: "5s" }}
                    >
                      <div className="w-12 h-16 bg-gradient-to-b from-white/90 to-gray-100 rounded-lg shadow-lg border border-gray-200 transform -rotate-12 hover:rotate-0 transition-transform duration-500">
                        <div className="p-2">
                          <div className="w-full h-1 bg-gray-300 rounded mb-1" />
                          <div className="w-2/3 h-1 bg-gray-300 rounded mb-1" />
                          <div className="w-full h-1 bg-gray-300 rounded mb-1" />
                          <div className="w-3/4 h-1 bg-gray-300 rounded" />
                        </div>
                      </div>
                    </div>

                    {/* Floating Gavel */}
                    <div
                      className="absolute bottom-16 -left-8 animate-float"
                      style={{ animationDelay: "1s", animationDuration: "6s" }}
                    >
                      <div className="transform rotate-45 hover:rotate-12 transition-transform duration-700">
                        <div className="w-3 h-12 bg-gradient-to-b from-amber-600 to-amber-800 rounded-full" />
                        <div className="w-8 h-4 bg-gradient-to-r from-amber-700 to-amber-900 rounded-lg -mt-2 ml-1" />
                      </div>
                    </div>

                    {/* Floating Shield */}
                    <div
                      className="absolute bottom-20 -right-12 animate-float"
                      style={{ animationDelay: "3s", animationDuration: "4s" }}
                    >
                      <div className="w-12 h-14 bg-gradient-to-b from-blue-500 to-blue-700 rounded-t-full rounded-b-lg shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-500">
                        <Shield className="h-6 w-6 text-white" />
                      </div>
                    </div>

                    {/* Orbiting Elements */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="relative w-80 h-80">
                        {/* Orbiting Chat Bubble */}
                        <div className="absolute animate-spin" style={{ animationDuration: "1s" }}>
                          <div className="w-80 h-80 relative">
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                              <div className="w-10 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                                <MessageCircle className="h-5 w-5 text-white" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Orbiting Video Call */}
                        <div
                          className="absolute animate-spin"
                          style={{ animationDuration: "2s", animationDirection: "reverse" }}
                        >
                          <div className="w-80 h-80 relative">
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                              <div className="w-10 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                                <Video className="h-5 w-5 text-white" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Orbiting Phone */}
                        <div className="absolute animate-spin" style={{ animationDuration: "2s" }}>
                          <div className="w-80 h-80 relative">
                            <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                              <div className="w-8 h-10 bg-gradient-to-b from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                                <PhoneCall className="h-5 w-5 text-white" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Text */}
                  <div className="text-center mt-8 space-y-2">
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      AI-Powered Justice
                    </div>
                    <div className="text-white/60 text-sm">Balancing Technology & Human Expertise</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Elegant Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
            <div className="flex flex-col items-center space-y-2">
              <span className="text-white/60 text-sm font-medium">Discover More</span>
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 py-20 bg-gradient-to-b from-transparent to-blue-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t.howItWorks.title}
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">{t.howItWorks.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.howItWorks.steps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <Card
                  key={index}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 group transform hover:scale-105 hover:-translate-y-2"
                >
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4">
                      <div
                        className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center group-hover:rotate-12 transition-transform duration-500`}
                      >
                        <IconComponent className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-2">{index + 1}</div>
                    <CardTitle className="text-xl text-white group-hover:text-blue-300 transition-colors duration-300">
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-white/70 text-center leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose NyayMitra Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t.whyChoose.title}
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">{t.whyChoose.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.whyChoose.features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="text-center group transform hover:scale-105 transition-all duration-500">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-sm border border-white/10 group-hover:border-white/30 transition-all duration-300">
                      <IconComponent className="h-10 w-10 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 bg-gradient-to-b from-transparent to-purple-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t.features.title}
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">{t.features.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {t.features.items.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <Card
                  key={index}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 group transform hover:scale-105 hover:-translate-y-2"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4 mb-4">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:rotate-12 transition-transform duration-500`}
                      >
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl text-white group-hover:text-blue-300 transition-colors duration-300">
                        {feature.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-white/70 text-lg leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 sm:mb-20">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t.testimonials.title}
            </h2>
            <p className="text-base sm:text-xl text-white/80 max-w-3xl mx-auto">{t.testimonials.subtitle}</p>
          </div>

          {/* Responsive container: scroll on mobile, grid on larger screens */}
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-px-4 scrollbar-hide">
            {t.testimonials.items.map((testimonial, index) => (
              <Card
                key={index}
                className="min-w-[90%] sm:min-w-[45%] md:min-w-0 snap-center bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 group transform hover:scale-105 hover:-translate-y-2"
              >
                <CardContent className="p-5 sm:p-6">
                  {/* Star rating */}
                  <div className="flex mb-4 sm:mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-sm sm:text-lg text-white/80 mb-4 sm:mb-6 leading-relaxed group-hover:text-white transition-colors duration-300">
                    "{testimonial.text}"
                  </blockquote>

                  {/* User info */}
                  <div className="flex items-center space-x-4">
                    {/* Avatar fallback */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                      {testimonial.avatar}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-white group-hover:text-blue-300 transition-colors duration-300 text-sm sm:text-base">
                        {testimonial.name}
                      </div>
                      <div className="text-white/60 text-xs sm:text-sm">{testimonial.role}</div>
                      <div className="text-white/40 text-xs sm:text-sm">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section className="relative z-10 py-20 bg-gradient-to-b from-transparent to-blue-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">{t.getStarted.title}</h2>
            <p className="text-base sm:text-xl text-white/80 mb-3 sm:mb-4 max-w-2xl mx-auto">{t.getStarted.subtitle}</p>
            <p className="text-sm sm:text-lg text-white/70 mb-6 sm:mb-8 max-w-2xl mx-auto">{t.getStarted.description}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/legal-gpt" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 border-0 shadow-2xl shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 group"
                >
                  <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  {t.getStarted.cta}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Link href="/lawyers" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
                >
                  {t.getStarted.secondary}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="relative z-10 bg-black/40 backdrop-blur-xl border-t border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <Scale className="h-10 w-10 text-blue-400" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {t.footer.company}
                </span>
              </div>
              <p className="text-white/60 mb-6 max-w-md">{t.footer.tagline}</p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-400" />
                  <span className="text-white/80">{t.footer.address}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <span className="text-white/80">{t.footer.email}</span>
                </div>
                {/* <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <span className="text-white/80">{t.footer.email}</span>
                </div> */}
                <div className="flex items-center space-x-3">
                  <PhoneCall className="h-5 w-5 text-blue-400" />
                  <span className="text-white/80">{t.footer.phone}</span>
                </div>
                {/* <div className="flex items-center space-x-3">
                  <MessageSquare className="h-5 w-5 text-green-400" />
                  <span className="text-white/80">WhatsApp: {t.footer.whatsapp}</span>
                </div> */}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-6">{t.footer.quickLinks}</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-white/60 hover:text-white transition-colors duration-300">
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-white/60 hover:text-white transition-colors duration-300">
                    {t.nav.services}
                  </Link>
                </li>
                <li>
                  <Link href="/lawyers" className="text-white/60 hover:text-white transition-colors duration-300">
                    {t.nav.lawyers}
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signup" className="text-white/60 hover:text-white transition-colors duration-300">
                    {t.footer.signup}
                  </Link>
                </li>
                <li>
                  <Link href="/auth/login" className="text-white/60 hover:text-white transition-colors duration-300">
                    {t.footer.signin}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-6">{t.footer.legal}</h3>
              <ul className="space-y-3">
                <li>
                  {/* <Link href="/careers" className="text-white/60 hover:text-white transition-colors duration-300">
                    {t.footer.careers}
                  </Link> */}
                </li>
                <li>
                  <Link href="/terms" className="text-white/60 hover:text-white transition-colors duration-300">
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link href="/Shipping&DeliveryPolicy" className="text-white/60 hover:text-white transition-colors duration-300">
                    {t.footer.deliveryPolicy}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-white/60 hover:text-white transition-colors duration-300">
                    {t.footer.contact}
                  </Link>
                </li>
                <li>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm">
            <p className="text-white/60 mb-2">
              © 2025 {t.footer.company}. All rights reserved. Powered by AI.
            </p>

            <div className="flex justify-center gap-4 text-white/50 mb-2">
              <a href="/terms" className="hover:text-white underline">Terms & Conditions</a>
              <a href="/privacy-policy" className="hover:text-white underline">Privacy Policy</a>
              <a href="/cancellation" className="hover:text-white underline">Cancellation & Refund</a>
            </div>

            <p className="text-white/40 text-xs max-w-2xl mx-auto px-4">
              <strong>Disclaimer:</strong> NyayMitra is an AI-powered legal assistant intended for informational purposes only.
              It does not constitute formal legal advice or establish a lawyer-client relationship.
              For personalized legal counsel, always consult with a licensed advocate. NyayMitra is not responsible
              for any decisions made based on AI-generated responses.
            </p>
          </div>

        </div>
      </footer>
    </div>
  )
}
