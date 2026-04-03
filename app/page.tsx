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
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("--:--:--");
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

    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(timer);
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
      profileMenu: {
        profile: "My Profile",
        dashboard: "My Dashboard",
        bookings: "My Bookings",
        logout: "Logout"
      },

      hero: {
        title: "Legal problem hai?",
        subtitle: "Hum help karenge",
        description:
          "FIR, property, family issues — samajhiye aur turant lawyer se baat kariye",
        ctaPrimary: "Talk to Legal Buddy",
        ctaSecondary: "Talk to Lawyer",
        whatsapp: "Talk on WhatsApp",
        whatsappNumber: "919970596183",
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
        subtitle: "Teeno simple step mein solution",
        steps: [
          {
            title: "Tell your problem",
            description: "Apni legal problem simple words me batayein",
            icon: FileCheck,
            color: "from-blue-500 to-indigo-500",
          },
          {
            title: "Get free guidance",
            description: "Turant samjhein aapko kya karna chahiye",
            icon: CalendarCheck,
            color: "from-purple-500 to-pink-500",
          },
          {
            title: "Talk to lawyer",
            description: "Jarurat ho toh verified lawyer se baat karein",
            icon: ThumbsUp,
            color: "from-yellow-500 to-orange-500",
          },
        ]
      },
      whyChoose: {
        title: "Why Choose NyayMitra?",
        subtitle: "Saral, asaan, aur bharosa",
        features: [
          {
            title: "Simple legal help",
            description: "Law ko easy language me samjhein",
            icon: IndianRupee,
          },
          {
            title: "Talk instantly",
            description: "WhatsApp ya call pe turant help",
            icon: Bot,
          },
          {
            title: "Verified lawyers",
            description: "Trusted lawyers se direct connect",
            icon: FileText,
          },
          {
            title: "No confusion",
            description: "Step-by-step guidance milega",
            icon: PenTool,
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
      },

      commonProblems: {
        title: "Common Legal Problems",
        subtitle: "We help with these issues every day",
        items: [
          {
            title: "FIR not being registered",
            description: "Understand your rights and take action"
          },
          {
            title: "Property dispute",
            description: "Protect your ownership and boundaries"
          },
          {
            title: "Divorce / Family issue",
            description: "Get guidance on custody and settlements"
          },
          {
            title: "Online fraud",
            description: "Recover your money and file complaints"
          },
        ]
      },
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
          }
        ],
      },
      footer: {
        company: "NyayMitra",
        tagline: "Making legal help accessible to every Indian",
        quickLinks: "Quick Links",
        legal: "Legal",
        contact: "Contact Us",
        address: "Koramangala,Bengaluru-560034",
        email: "contact@nyaymitra.tech",
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
      profileMenu: {
        profile: "मेरी प्रोफ़ाइल",
        dashboard: "मेरा डैशबोर्ड",
        bookings: "मेरी बुकिंग्स",
        logout: "लॉगआउट"
      },

      hero: {
        title: "Legal problem hai?",
        subtitle: "Hum help karenge",
        description:
          "FIR, property, family issues — samajhiye aur turant lawyer se baat kariye",
        ctaPrimary: "Talk to Legal Buddy",
        ctaSecondary: "Talk to Lawyer",
        whatsapp: "Talk on WhatsApp",
        whatsappNumber: "919970596183",
        liveStatus: "AI सिस्टम ऑनलाइन",
        stats: {
          cases: "10 लाख+ मामले हल",
          lawyers: "50 हज़ार+ विशेषज्ञ वकील",
          success: "99.9% सफलता दर",
          response: "30 सेकंड से कम में जवाब",
        },
      },

      howItWorks: {
        title: "Yeh Kaise Kaam Karta Hai",
        subtitle: "Teeno simple step mein solution",
        steps: [
          {
            title: "Tell your problem",
            description: "Apni legal problem simple words me batayein",
            icon: FileText,
            color: "from-blue-500 to-indigo-500",
          },
          {
            title: "Get free guidance",
            description: "Turant samjhein aapko kya karna chahiye",
            icon: CalendarCheck,
            color: "from-purple-500 to-pink-500",
          },
          {
            title: "Talk to lawyer",
            description: "Jarurat ho toh verified lawyer se baat karein",
            icon: ThumbsUp,
            color: "from-green-500 to-emerald-500",
          },
        ],
      },
      whyChoose: {
        title: "Kyun Choose Karein",
        subtitle: "Saral, asaan, aur bharosa",
        features: [
          {
            title: "Simple legal help",
            description: "Law ko easy language me samjhein",
            icon: IndianRupee,
          },
          {
            title: "Talk instantly",
            description: "WhatsApp ya call pe turant help",
            icon: Bot,
          },
          {
            title: "Verified lawyers",
            description: "Trusted lawyers se direct connect",
            icon: FileText,
          },
          {
            title: "No confusion",
            description: "Step-by-step guidance milega",
            icon: PenTool,
          },
        ],
      },

      features: {
        title: "शक्तिशाली सुविधाएं",
        subtitle: "स्मार्ट, किफायती और तेज़ कानूनी सहायता, बस एक क्लिक दूर",
        items: [
          {
            title: "त्वरित वकील बुकिंग",
            description: "सत्यापित वकीलों से मिनटों में परामर्श बुक करें — रीयल-टाइ�� उपलब्धता और प्राथमि��ता बुकिंग के साथ।",
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
            description: "अपने दस्तावेज़ों को भारत भर में लाइसेंस प्राप्त वकीलों से ऑनलाइन या कूरियर के माध्यम से नोटरी ��रवाएं।",
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
            text: "मैंने सिर्फ 5 मिनट में वकील बुक किया ���र उसी दिन परामर्श मिला। संपत्ति विवाद में तुरंत समाधान मिला।",
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
          }
        ],
      },
      footer: {
        company: "न्यायमित्र",
        tagline: "हर भारतीय के लिए कानूनी सहायता को सुलभ बनाना",
        quickLinks: "त्वरित लिंक",
        legal: "कानूनी",
        contact: "संपर्क करें",
        address: "कोरामंगला, बेंगलुरु-560034",
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 text-gray-900 overflow-hidden relative">
      {/* Premium subtle gradient background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50" />
        {/* Subtle accent gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/20 rounded-full filter blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-100/10 rounded-full filter blur-3xl opacity-20" />
      </div>

      {/* Navigation remains the same... */}
      <nav className="relative z-50 bg-white border-b border-gray-200 sticky top-0">
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
              <Link href="/" className="flex items-center space-x-3">
                <div className="bg-blue-600 p-3 rounded-lg hover:bg-blue-700 transition">
                  <Scale className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">NyayMitra</span>
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
                      className="relative text-gray-700 hover:text-blue-600 px-4 py-3 text-sm font-medium transition-colors"
                    >
                      <span>{value}</span>
                    </Link>
                  ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Language Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(language === "en" ? "hi" : "en")}
                className="border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                <Globe className="h-4 w-4 mr-2" />
                <span className="font-medium">{language === "en" ? "हिं" : "EN"}</span>
              </Button>

              {mounted && isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="sm"
                      className="border border-gray-300 text-gray-700 hover:bg-gray-100"
                      disabled={isProfileLoading}
                    >
                      {isProfileLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-700 mr-2"></div>
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
                    className="mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg p-2"
                    sideOffset={5}
                  >
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="block px-3 py-2 hover:bg-gray-100 rounded text-gray-700">
                        {t.profileMenu.profile}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        window.location.href = 'https://nyay-dashboard.netlify.app/';
                      }}
                    >
                      <div className="flex items-center gap-3 w-full justify-between text-gray-700">
                        <div className="flex items-center gap-3">
                          <BarChart2 className="h-5 w-5 text-green-600" />
                          <span>{t.profileMenu.dashboard}</span>
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
                        className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-gray-700"
                      >
                        {t.profileMenu.logout}
                      </button>
                    </DropdownMenuItem>
                    {profile?.role !== "lawyer" && (
                      <DropdownMenuItem asChild>
                        <Link href="/all-bookings" className="block px-3 py-2 hover:bg-gray-100 rounded text-gray-700">
                          {t.profileMenu.bookings}
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
                      className="border border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                      {t.nav.login}
                    </Button>
                  </Link>

                  {/* Signup Button */}
                  <Link href="/auth/signup">
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {t.nav.signup}
                    </Button>
                  </Link>
                </>
              )}
            </div>


            <div className="md:hidden">
              <Button
                variant="ghost"
                size="default"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:bg-gray-100 transition-all duration-300 w-11 h-11 p-0"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>

          </div>
        </div>


        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200">
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
                    {t.profileMenu.profile}
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
                    <span>{t.profileMenu.dashboard}</span>
                  </button>


                  {profile?.role !== "lawyer" && (
                    <Link
                      href="/all-bookings"
                      className="text-white/80 hover:text-white block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg hover:bg-white/10"
                    >
                      {t.profileMenu.bookings}
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      window.location.reload();
                    }}
                    className="text-white/80 hover:text-white block w-full text-left px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg hover:bg-white/10"
                  >
                    {t.profileMenu.logout}
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

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Content */}
            <div className="space-y-8">
              {/* Trust Line */}
              <div className="inline-flex items-center space-x-3 px-4 py-2 bg-blue-50 rounded-full border border-blue-100">
                <span className="text-xs font-semibold text-blue-700 tracking-wide">TRUSTED BY INDIANS</span>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-6">
                <h1 className="text-5xl sm:text-6xl lg:text-6xl font-bold tracking-tight leading-tight text-gray-900">
                  {t.hero.title}
                </h1>

                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 leading-relaxed">
                  {t.hero.subtitle}
                </h2>
              </div>

              {/* Description */}
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
                {t.hero.description}
              </p>

              {/* CTA Card */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/legal-gpt" className="flex-1">
                    <Button
                      size="lg"
                      className="w-full text-base px-6 py-6 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      {t.hero.ctaPrimary}
                    </Button>
                  </Link>

                  <Link href="/lawyers" className="flex-1">
                    <Button
                      size="lg"
                      className="w-full text-base px-6 py-6 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <FileText className="mr-2 h-5 w-5" />
                      {t.hero.ctaSecondary}
                    </Button>
                  </Link>
                </div>

                <a href={`https://wa.me/${t.hero.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="block">
                  <Button
                    size="lg"
                    className="w-full text-base px-6 py-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.677-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.897 6.994c-.004 5.45-4.437 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.181-1.24-6.162-3.495-8.411" />
                    </svg>
                    {t.hero.whatsapp}
                  </Button>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 h-5 w-5 text-blue-700">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <span className="text-sm text-gray-700"><span className="font-semibold text-gray-900">Verified</span> Lawyers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 h-5 w-5 text-blue-700">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <span className="text-sm text-gray-700"><span className="font-semibold text-gray-900">Instant</span> Guidance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 h-5 w-5 text-blue-700">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <span className="text-sm text-gray-700"><span className="font-semibold text-gray-900">100%</span> Confidential</span>
                </div>
              </div>
            </div>

            {/* Right: Visual (Premium Card) */}
            <div className="hidden lg:block">
              <div className="relative h-96 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 shadow-lg p-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-blue-700 rounded-xl flex items-center justify-center text-white font-bold">1</div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">Tell your problem</h3>
                      <p className="text-xs text-gray-600">Apni legal issue batayein</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">2</div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">Get instant guidance</h3>
                      <p className="text-xs text-gray-600">Turant samajho solution</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold">3</div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">Talk to lawyer</h3>
                      <p className="text-xs text-gray-600">Connect with verified expert</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 py-24 bg-gradient-to-b from-white via-blue-50/30 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              {t.howItWorks.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.howItWorks.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.howItWorks.steps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <div key={index} className="relative group">
                  <div className="text-center p-8 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300">
                    <div className="mb-6 flex justify-center">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="h-8 w-8 text-blue-700" />
                      </div>
                    </div>
                    <div className="inline-block px-3 py-1 bg-blue-50 rounded-lg mb-4">
                      <span className="text-sm font-bold text-blue-700">Step {index + 1}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:flex absolute top-1/2 -right-4 items-center justify-center w-8 h-8 text-gray-400">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose NyayMitra Section */}
      <section className="relative z-10 py-24 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              {t.whyChoose.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.whyChoose.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.whyChoose.features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="group text-center p-8 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300">
                  <div className="mb-6 flex justify-center">
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-7 w-7 text-blue-700" />
                    </div>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Common Problems Section */}
      <section className="relative z-10 py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              {t.commonProblems.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.commonProblems.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.commonProblems.items.map((item, index) => (
              <div key={index} className="group p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <span className="text-sm font-bold text-blue-700">✓</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              {t.features.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.features.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {t.features.items.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={index}
                  className="group p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300"
                >
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="h-7 w-7 text-blue-700" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-24 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-5xl font-bold mb-6 text-gray-900">
              {t.testimonials.title}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">{t.testimonials.subtitle}</p>
          </div>

          {/* Responsive container: scroll on mobile, grid on larger screens */}
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-px-4 scrollbar-hide">
            {t.testimonials.items.map((testimonial, index) => (
              <div
                key={index}
                className="min-w-[90%] sm:min-w-[45%] md:min-w-0 snap-center group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 p-8"
              >
                {/* Star rating */}
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-sm text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </blockquote>

                {/* User info */}
                <div className="flex items-center space-x-4 pt-6 border-t border-gray-100">
                  {/* Avatar fallback */}
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {testimonial.avatar}
                  </div>
                  <div className="text-left min-w-0">
                    <div className="font-semibold text-gray-900 text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-600 text-xs">{testimonial.role}</div>
                    <div className="text-gray-500 text-xs">{testimonial.location}</div>
                  </div>
                </div>
              </div>
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
      <footer className="relative z-10 bg-gray-900 border-t border-gray-200 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <Scale className="h-10 w-10 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">
                  {t.footer.company}
                </span>
              </div>
              <p className="text-gray-600 mb-6 max-w-md">{t.footer.tagline}</p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">{t.footer.address}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">{t.footer.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <PhoneCall className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">{t.footer.phone}</span>
                </div>
                {/* <div className="flex items-center space-x-3">
                  <MessageSquare className="h-5 w-5 text-green-400" />
                  <span className="text-white/80">WhatsApp: {t.footer.whatsapp}</span>
                </div> */}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">{t.footer.quickLinks}</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                    {t.nav.services}
                  </Link>
                </li>
                <li>
                  <Link href="/lawyers" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                    {t.nav.lawyers}
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signup" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                    {t.footer.signup}
                  </Link>
                </li>
                <li>
                  <Link href="/auth/login" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                    {t.footer.signin}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">{t.footer.legal}</h3>
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
                  <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                    {t.footer.contact}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-sm">
            <p className="text-gray-600 mb-2">
              © 2026 {t.footer.company}. All rights reserved. Powered by AI.
            </p>

            <div className="flex justify-center gap-4 text-gray-500 mb-2">
              <a href="/terms" className="hover:text-blue-600 underline">Terms & Conditions</a>
              <a href="/privacy-policy" className="hover:text-blue-600 underline">Privacy Policy</a>
              <a href="/cancellation" className="hover:text-blue-600 underline">Cancellation & Refund</a>
            </div>

            <p className="text-sm text-gray-600 mt-4">
              <strong className="text-red-600">Disclaimer:</strong>
              <span className="text-gray-600">
                NyayMitra is a technology platform that helps users connect with verified legal professionals, access general legal information, and generate basic legal documents. While we provide AI-powered assistance, we do not offer legal advice or act as a law firm. All consultations and notary services are delivered by licensed third-party professionals. NyayMitra is not liable for actions taken based on AI suggestions or external legal interactions through the platform.
              </span>
            </p>
          </div>

        </div>
      </footer>
      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${t.hero.whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-8 w-8 text-white"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.677-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.897 6.994c-.004 5.45-4.437 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.181-1.24-6.162-3.495-8.411" />
            </svg>
          </div>
        </div>
      </a>
    </div>
  )
}
