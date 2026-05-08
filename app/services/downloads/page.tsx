// app/services/downloads/page.tsx
"use client"

import { motion } from "framer-motion"
import { Download, FileCheck, ArrowRight, FileText, Check, Zap, FileSearch, Scale, Sparkles, Users, Menu, X, Mail, Phone, Home, BookText, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { loadRazorpayScript } from "@/utils/loadRazorpay";
import axios, { AxiosError, AxiosResponse } from "axios"
import { getUser } from "@/utils/getUser";

/* ─── Global Styles ─────────────────────────────────────────────────────────── */
const GlobalStyles = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=Outfit:wght@300;400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --ink:        #0c0b09;
      --ink-2:      #1a1916;
      --ink-3:      #2e2c28;
      --ink-4:      #5c5850;
      --ink-5:      #8a8680;
      --ink-6:      #b8b4ae;
      --ink-7:      #e0ddd8;
      --ink-8:      #f2f0eb;
      --ink-9:      #faf8f4;
      --white:      #fffefb;
      --gold:       #c9a84c;
      --gold-lt:    #e2c87a;
      --gold-dk:    #8b6d22;
      --gold-pale:  #fdf6e0;
      --green:      #15803d;
      --green-light:#2e7d32;
      --serif:      'Cormorant Garamond', Georgia, serif;
      --sans:       'Outfit', system-ui, sans-serif;
      --mono:       'DM Mono', monospace;
      --radius:     8px;
      --radius-lg:  14px;
      --radius-xl:  20px;
    }

    body {
      background: var(--white);
      color: var(--ink);
      font-family: var(--sans);
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes shimmer {
      0% { background-position: -300% center; }
      100% { background-position: 300% center; }
    }
    @keyframes pulseDot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.75); }
    }
    @keyframes mobileMenuFade {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .gold-text {
      background: linear-gradient(115deg, var(--gold-dk) 0%, var(--gold) 30%, var(--gold-lt) 52%, var(--gold) 70%, var(--gold-dk) 100%);
      background-size: 300% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 7s linear infinite;
    }

    .green-text {
      background: linear-gradient(115deg, var(--green) 0%, #2e7d32 50%, var(--gold) 100%);
      background-size: 300% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      font-family: var(--mono);
      font-size: 8.5px;
      font-weight: 500;
      letter-spacing: 0.26em;
      text-transform: uppercase;
      color: var(--gold-dk);
    }
    .eyebrow::before, .eyebrow::after {
      content: '';
      width: 24px;
      height: 1px;
      background: linear-gradient(90deg, var(--gold-dk), var(--gold));
      flex-shrink: 0;
    }

    .nav-link {
      font-family: var(--sans);
      font-size: 13px;
      font-weight: 500;
      color: var(--ink-4);
      text-decoration: none;
      padding: 7px 13px;
      border-radius: 6px;
      transition: all 0.16s;
    }
    .nav-link:hover { color: var(--ink); background: var(--ink-8); }

    .desktop-nav-links {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .mobile-menu-btn {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .mobile-menu-dropdown {
      display: none;
    }

    @media (max-width: 768px) {
      .desktop-nav-links {
        display: none !important;
      }
      .mobile-menu-btn {
        display: flex !important;
      }
      .mobile-menu-dropdown.mobile-open {
        display: block;
      }
    }

    @media (min-width: 769px) {
      .mobile-menu-btn {
        display: none !important;
      }
      .mobile-menu-dropdown {
        display: none !important;
      }
    }

    .mobile-nav-link {
      font-family: var(--sans);
      font-size: 16px;
      font-weight: 500;
      color: var(--ink-3);
      text-decoration: none;
      padding: 12px 0;
      width: 100%;
      transition: all 0.16s;
      border-bottom: 1px solid var(--ink-8);
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .btn-ink {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--ink); color: var(--white);
      font-family: var(--sans); font-size: 12.5px; font-weight: 600;
      padding: 9px 18px; border-radius: var(--radius); border: none;
      text-decoration: none; cursor: pointer;
      transition: all 0.22s cubic-bezier(0.16,1,0.3,1);
    }
    .btn-ink:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(12,11,9,0.25); }

    .btn-ghost {
      display: inline-flex; align-items: center; gap: 8px;
      background: transparent; color: var(--ink-3);
      font-family: var(--sans); font-size: 12.5px; font-weight: 500;
      padding: 9px 16px; border-radius: var(--radius);
      border: 1.5px solid var(--ink-7);
      text-decoration: none; cursor: pointer; transition: all 0.22s;
    }
    .btn-ghost:hover { background: var(--ink-9); border-color: var(--ink-5); color: var(--ink); }

    .btn-gold {
      display: inline-flex; align-items: center; gap: 8px;
      background: linear-gradient(135deg, var(--gold-dk) 0%, var(--gold) 50%, var(--gold-lt) 100%);
      color: var(--ink); font-family: var(--sans); font-size: 13px; font-weight: 700;
      padding: 11px 24px; border-radius: var(--radius); border: none;
      text-decoration: none; cursor: pointer;
      transition: all 0.22s cubic-bezier(0.16,1,0.3,1);
    }
    .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(201,168,76,0.4); }

    .btn-green {
      display: inline-flex; align-items: center; gap: 8px;
      background: linear-gradient(135deg, var(--green) 0%, #2e7d32 100%);
      color: var(--white); font-family: var(--sans); font-size: 12.5px; font-weight: 600;
      padding: 11px 24px; border-radius: var(--radius); border: none;
      text-decoration: none; cursor: pointer;
      transition: all 0.22s cubic-bezier(0.16,1,0.3,1);
    }
    .btn-green:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(21,128,61,0.3); }

    .document-card {
      background: var(--white);
      border: 1px solid var(--ink-7);
      border-radius: var(--radius-lg);
      transition: all 0.28s cubic-bezier(0.16,1,0.3,1);
      height: 100%;
    }
    .document-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 56px rgba(12,11,9,0.08);
      border-color: var(--green);
    }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--ink-9); }
    ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }
    ::selection { background: var(--gold-pale); color: var(--gold-dk); }

    @media (max-width: 768px) {
      .documents-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
      .hero-pad { padding: 56px 20px 72px !important; }
      .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
      .cta-buttons { flex-direction: column !important; }
      .cta-buttons a, .cta-buttons button { width: 100% !important; justify-content: center !important; }
    }
  `}</style>
)

/* ─── Ornament Line ──────────────────────────────────────────────────────── */
const OrnamentLine = () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "22px 0" }}>
        <div style={{ width: 44, height: 1, background: "linear-gradient(90deg, var(--gold-dk), var(--gold))" }} />
        <Scale style={{ width: 9, height: 9, color: "var(--gold)" }} />
        <div style={{ width: 24, height: 1, background: "linear-gradient(90deg, var(--gold), transparent)" }} />
    </div>
)

interface Document {
    id: string
    name: string
    description: string
    features: string[]
    price: number
    sampleUrl: string
    downloadUrl: string
    type: string
}

interface RazorpayResponse {
    razorpay_payment_id: string
    razorpay_order_id: string
    razorpay_signature: string
}

export default function InstantDownloadPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [loadingDocumentId, setLoadingDocumentId] = useState<string | null>(null);
    const [authStatus, setAuthStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading")
    const router = useRouter()
    const { toast } = useToast()

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    useEffect(() => {
        const checkAuth = () => {
            try {
                const token = localStorage.getItem("token")
                if (!token) {
                    setAuthStatus("unauthenticated")
                    router.push(`/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`)
                } else {
                    setAuthStatus("authenticated")
                }
            } catch (error) {
                console.error("Authentication check failed:", error)
                setAuthStatus("unauthenticated")
                router.push(`/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`)
            }
        }
        checkAuth()
    }, [router])

    const handleMobileLinkClick = () => setMobileMenuOpen(false)

    if (authStatus === "loading") {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-500 text-sm">Loading...</p>
                </div>
            </div>
        )
    }

    if (authStatus === "unauthenticated") return null

    const documents: Document[] = [
        {
            id: "two-party-agreement",
            name: "Two Party Agreement",
            description: "Legally binding contract between two parties",
            features: ["Customizable terms", "Payment clauses", "Termination conditions"],
            price: 49,
            type: "agreement",
            sampleUrl: "/sample/agreement.html",
            downloadUrl: "/template/agreement.html"
        },
        {
            id: "affidavit-draft",
            name: "Affidavit Draft",
            description: "Legal declaration for various purposes",
            features: ["Name change", "Address proof", "Income declaration"],
            price: 99,
            type: "affidavit",
            sampleUrl: "/sample/affidavit.htm",
            downloadUrl: "/template/affidavit.html"
        },
        {
            id: "police-complaint",
            name: "Police Complaint",
            description: "Formal complaint letter to police authorities",
            features: ["Theft report", "Harassment complaint", "Lost property"],
            price: 99,
            type: "complaint",
            sampleUrl: "/sample/police-complaint.html",
            downloadUrl: "/template/police-complaint.html"
        }
    ];

    const handleViewSample = (doc: Document) => {
        window.open(doc.sampleUrl, '_blank', 'noopener,noreferrer');
    };

    const initiatePayment = async (docId: string) => {
        setLoadingDocumentId(docId);
        try {
            const doc = documents.find(d => d.id === docId);
            if (!doc) throw new Error("Document not found");

            const user = getUser();

            const razorpayLoaded = await loadRazorpayScript();
            if (!razorpayLoaded) throw new Error("Razorpay SDK failed to load");

            const { data: orderData } = await axios.post('https://nyaymitra-backend-document-production.up.railway.app/api/payment/create-order', {
                userId: user.userId,
                userEmail: user.email,
                serviceName: doc.name,
                documentType: doc.type,
                price: doc.price
            });

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "NyayMitra",
                description: `Payment for ${doc.name}`,
                order_id: orderData.id,
                handler: async function (response: RazorpayResponse) {
                    await verifyPayment(response, orderData.orderRecordId, user.userId, doc.name);
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: user.phone || "9000000000"
                },
                theme: {
                    color: "#c9a84c"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error: any) {
            console.error('Payment error:', error);
            toast({
                title: "Payment Error",
                description: error?.message || "Failed to initiate payment",
                variant: "destructive"
            });
        } finally {
            setLoadingDocumentId(null);
        }
    };

    const verifyPayment = async (
        paymentResponse: RazorpayResponse,
        serviceOrderId: string,
        userId: string,
        documentName: string
    ) => {
        try {
            const { data } = await axios.post('https://nyaymitra-backend-document-production.up.railway.app/api/payment/verify', {
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_signature: paymentResponse.razorpay_signature,
                documentId: serviceOrderId
            });

            toast({
                title: "Payment Successful!",
                description: "Your document is ready for download",
            });

            await downloadDocument(serviceOrderId, userId, documentName);
        } catch (error: any) {
            console.error('Verification error:', error);
            toast({
                title: "Verification Failed",
                description: error.response?.data?.message || error.message || "Could not verify payment",
                variant: "destructive"
            });
        } finally {
            setLoadingDocumentId(null);
        }
    };

    const downloadDocument = async (documentId: string, userId: string, documentName: string) => {
        try {
            const response = await axios.get(`https://nyaymitra-backend-document-production.up.railway.app/api/documents/download`, {
                params: { documentId, userId },
                responseType: 'blob',
            });

            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            const fileName = `${documentName.toLowerCase().replace(/\s+/g, '-')}-template.html`;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            toast({
                title: "Download Started",
                description: "Your document is being downloaded",
            });
        } catch (error: any) {
            console.error('Download error:', error);
            toast({
                title: "Download Error",
                description: error.response?.data?.message || error.message || "Failed to download document",
                variant: "destructive"
            });
        }
    };

    return (
        <>
            <GlobalStyles />
            <div className="min-h-screen bg-white">

                {/* ── NAVBAR ───────────────────────────────────────────────────────────── */}
                <nav style={{
                    position: "sticky", top: 0, zIndex: 100,
                    background: scrolled ? "rgba(255,254,251,0.96)" : "var(--white)",
                    backdropFilter: scrolled ? "blur(24px) saturate(1.4)" : "none",
                    borderBottom: `1px solid ${scrolled ? "var(--ink-7)" : "transparent"}`,
                    boxShadow: scrolled ? "0 2px 24px rgba(12,11,9,0.06)" : "none",
                    transition: "all 0.32s cubic-bezier(0.16,1,0.3,1)",
                }}>
                    <div style={{
                        maxWidth: 1200, margin: "0 auto", padding: "0 20px",
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        height: 66,
                    }}>
                        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none", flexShrink: 0 }}>
                            <div style={{
                                width: 38, height: 38, borderRadius: 10,
                                background: "var(--ink)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                boxShadow: "0 2px 12px rgba(12,11,9,0.2)",
                                position: "relative", overflow: "hidden", flexShrink: 0,
                            }}>
                                <div style={{
                                    position: "absolute", inset: 0,
                                    background: "linear-gradient(135deg, rgba(201,168,76,0.15) 0%, transparent 60%)",
                                }} />
                                <Scale style={{ color: "var(--gold)", width: 16, height: 16, position: "relative", zIndex: 1 }} />
                            </div>
                            <div style={{
                                fontFamily: "var(--serif)", fontSize: "20px", fontWeight: 600,
                                color: "var(--ink)", lineHeight: 1, letterSpacing: "-0.02em",
                            }}>NyayMitra</div>
                        </Link>

                        <div className="desktop-nav-links" style={{ alignItems: "center", gap: 8 }}>
                            <Link href="/" className="btn-ghost">Home</Link>
                            <Link href="/services" className="nav-link">Services</Link>
                            <Link href="/lawyers" className="nav-link">Find Lawyers</Link>
                            <Link href="/legal-ai" className="btn-ink">
                                <Sparkles style={{ width: 13, height: 13 }} />
                                Legal AI
                            </Link>
                        </div>

                        <button
                            className="mobile-menu-btn"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            style={{
                                background: "transparent", border: "none", cursor: "pointer",
                                padding: "8px", alignItems: "center", justifyContent: "center",
                                borderRadius: "8px", transition: "all 0.2s",
                            }}
                            aria-label="Menu"
                        >
                            {mobileMenuOpen ? (
                                <X style={{ width: 22, height: 22, color: "var(--ink)" }} />
                            ) : (
                                <Menu style={{ width: 22, height: 22, color: "var(--ink)" }} />
                            )}
                        </button>
                    </div>

                    <div className={`mobile-menu-dropdown ${mobileMenuOpen ? "mobile-open" : ""}`} style={{
                        position: "absolute", top: 66, left: 0, right: 0,
                        background: "var(--white)", borderBottom: "1px solid var(--ink-7)",
                        boxShadow: "0 4px 24px rgba(12,11,9,0.08)", padding: "20px",
                        animation: mobileMenuOpen ? "mobileMenuFade 0.3s ease-out" : "none", zIndex: 99,
                    }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            <Link href="/" className="mobile-nav-link" onClick={handleMobileLinkClick} style={{ borderTop: "none" }}>
                                <Home style={{ width: 18, height: 18, color: "var(--gold-dk)" }} /> Home
                            </Link>
                            <Link href="/services" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                                <BookText style={{ width: 18, height: 18, color: "var(--gold-dk)" }} /> Services
                            </Link>
                            <Link href="/lawyers" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                                <Users style={{ width: 18, height: 18, color: "var(--gold-dk)" }} /> Find Lawyers
                            </Link>
                            <Link href="/legal-ai" className="mobile-nav-link" onClick={handleMobileLinkClick} style={{ borderBottom: "none" }}>
                                <Sparkles style={{ width: 18, height: 18, color: "var(--gold-dk)" }} /> Legal AI
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* ── HERO SECTION ─────────────────────────────────────────────────────── */}
                <section className="hero-pad" style={{
                    padding: "80px 28px 100px",
                    position: "relative", overflow: "hidden",
                }}>
                    <div style={{
                        position: "absolute", inset: 0,
                        backgroundImage: "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)",
                        backgroundSize: "80px 80px", pointerEvents: "none",
                    }} />
                    <div style={{
                        position: "absolute", inset: 0,
                        background: "radial-gradient(ellipse 70% 60% at 80% 20%, rgba(201,168,76,0.055) 0%, transparent 60%)",
                        pointerEvents: "none",
                    }} />
                    <div style={{
                        position: "absolute", right: "-4%", top: "5%",
                        width: 520, height: 520, opacity: 0.025, pointerEvents: "none",
                    }}>
                        <Scale style={{ width: "100%", height: "100%", color: "var(--gold-dk)" }} />
                    </div>

                    <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
                        <div style={{ animation: "fadeUp 0.72s cubic-bezier(0.16,1,0.3,1) both" }}>
                            <div style={{
                                display: "inline-flex", alignItems: "center", gap: 9,
                                padding: "6px 16px 6px 9px",
                                border: "1px solid var(--ink-7)", borderRadius: 100,
                                marginBottom: 36, background: "var(--white)",
                                boxShadow: "0 2px 12px rgba(12,11,9,0.04)",
                            }}>
                                <div style={{
                                    width: 22, height: 22, borderRadius: "50%",
                                    background: "var(--gold-pale)", border: "1px solid var(--gold)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                }}>
                                    <Zap style={{ width: 10, height: 10, color: "var(--gold-dk)" }} />
                                </div>
                                <span style={{ fontFamily: "var(--mono)", fontSize: "9.5px", color: "var(--ink-4)", letterSpacing: "0.1em" }}>
                                    Instant Access
                                </span>
                            </div>

                            <h1 style={{
                                fontFamily: "var(--serif)",
                                fontSize: "clamp(44px, 7vw, 80px)",
                                fontWeight: 600, lineHeight: 1.08,
                                letterSpacing: "-0.03em",
                                color: "var(--ink)", marginBottom: 0,
                            }}>
                                Self-Attested<br />
                                <span className="gold-text" style={{ fontStyle: "italic", fontWeight: 300, display: "inline-block", lineHeight: 1.3 }}>
                                    Documents.
                                </span>
                            </h1>

                            <OrnamentLine />

                            <p style={{
                                fontFamily: "var(--sans)", fontSize: "15.5px",
                                color: "var(--ink-4)", lineHeight: 1.85,
                                maxWidth: 500, fontWeight: 300,
                            }}>
                                Download legally valid templates instantly. Fill in your details, print, and use immediately.
                            </p>
                        </div>
                    </div>
                </section>

                <div style={{ height: 1, background: "var(--ink-7)" }} />

                {/* ── DOCUMENTS GRID ─────────────────────────────────────────────────────── */}
                <section style={{ padding: "80px 28px" }}>
                    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                        <div style={{ textAlign: "center", marginBottom: 56 }}>
                            <span className="eyebrow">Available Templates</span>
                            <h2 style={{
                                fontFamily: "var(--serif)", fontSize: "clamp(28px, 4vw, 42px)",
                                fontWeight: 600, color: "var(--ink)", marginTop: 16,
                            }}>Choose your <span className="gold-text">document</span></h2>
                        </div>

                        <div className="documents-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
                            {documents.map((doc, index) => (
                                <motion.div
                                    key={doc.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="document-card" style={{ padding: "28px" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                                            <div style={{
                                                width: 48, height: 48, borderRadius: 12,
                                                background: "var(--ink-9)", border: "1px solid var(--ink-7)",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                            }}>
                                                <FileText style={{ width: 20, height: 20, color: "var(--green)" }} />
                                            </div>
                                            <div>
                                                <h3 style={{ fontFamily: "var(--serif)", fontSize: "18px", fontWeight: 600, color: "var(--ink)" }}>
                                                    {doc.name}
                                                </h3>
                                                <div style={{ fontFamily: "var(--serif)", fontSize: "20px", fontWeight: 600, color: "var(--green)", marginTop: 4 }}>
                                                    ₹{doc.price}
                                                </div>
                                            </div>
                                        </div>

                                        <p style={{ fontSize: "13px", color: "var(--ink-4)", lineHeight: 1.65, marginBottom: 20 }}>
                                            {doc.description}
                                        </p>

                                        <div style={{ marginBottom: 24, display: "flex", flexDirection: "column", gap: 10 }}>
                                            {doc.features.map((feature, i) => (
                                                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                    <div style={{
                                                        width: 16, height: 16, borderRadius: "50%",
                                                        background: "var(--gold-pale)", border: "1px solid var(--gold)",
                                                        display: "flex", alignItems: "center", justifyContent: "center",
                                                    }}>
                                                        <Check style={{ width: 8, height: 8, color: "var(--gold-dk)" }} />
                                                    </div>
                                                    <span style={{ fontSize: "12px", color: "var(--ink-4)" }}>{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                            <button
                                                onClick={() => handleViewSample(doc)}
                                                style={{
                                                    width: "100%", padding: "10px 16px", borderRadius: "var(--radius)",
                                                    border: "1.5px solid var(--ink-7)", background: "transparent",
                                                    color: "var(--ink-4)", fontSize: "12px", fontWeight: 500,
                                                    cursor: "pointer", transition: "all 0.2s",
                                                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                                                }}
                                                onMouseEnter={e => {
                                                    e.currentTarget.style.borderColor = "var(--green)"
                                                    e.currentTarget.style.color = "var(--green)"
                                                }}
                                                onMouseLeave={e => {
                                                    e.currentTarget.style.borderColor = "var(--ink-7)"
                                                    e.currentTarget.style.color = "var(--ink-4)"
                                                }}
                                            >
                                                <FileSearch style={{ width: 14, height: 14 }} />
                                                View Sample
                                            </button>
                                            <button
                                                onClick={() => initiatePayment(doc.id)}
                                                disabled={loadingDocumentId !== null}
                                                className="btn-green"
                                                style={{
                                                    width: "100%", justifyContent: "center",
                                                    opacity: loadingDocumentId === doc.id ? 0.7 : 1,
                                                }}
                                            >
                                                {loadingDocumentId === doc.id ? (
                                                    <>
                                                        <span style={{ animation: "spin 1s linear infinite" }}>⟳</span>
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Download style={{ width: 14, height: 14 }} />
                                                        Download Now (₹{doc.price})
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <div style={{ height: 1, background: "var(--ink-7)" }} />

                {/* ── CTA SECTION ───────────────────────────────────────────────────────── */}
                <section style={{ padding: "80px 28px" }}>
                    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                        <div style={{
                            position: "relative", overflow: "hidden",
                            background: "var(--ink-9)", border: "1px solid var(--ink-7)",
                            borderRadius: "var(--radius-xl)", padding: "60px 40px",
                            textAlign: "center",
                        }}>
                            <div style={{
                                position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                                width: "60%", height: "1px",
                                background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
                            }} />

                            <div style={{
                                display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20,
                                background: "var(--gold-pale)", border: "1px solid var(--gold)",
                                borderRadius: 100, padding: "6px 16px",
                                fontSize: "11px", fontFamily: "var(--mono)", color: "var(--gold-dk)",
                                textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500,
                            }}>
                                <FileSearch size={12} /> Not sure which document you need?
                            </div>

                            <h2 style={{
                                fontFamily: "var(--serif)", fontSize: "clamp(28px, 3.5vw, 40px)",
                                color: "var(--ink)", marginBottom: 16, lineHeight: 1.2, letterSpacing: "-0.02em",
                            }}>
                                Need personalized legal assistance?
                            </h2>

                            <p style={{ color: "var(--ink-4)", fontSize: "15px", marginBottom: 32, maxWidth: 520, margin: "0 auto 32px", lineHeight: 1.65 }}>
                                Our expert lawyers can help you with custom legal documents and professional advice.
                            </p>

                            <div className="cta-buttons" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                                <Link href="/lawyers" style={{ textDecoration: "none" }}>
                                    <button className="btn-gold" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                                        <Users size={15} /> Consult a Lawyer <ArrowRight size={14} />
                                    </button>
                                </Link>
                                <Link href="/legal-ai" style={{ textDecoration: "none" }}>
                                    <button className="btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                                        <Sparkles size={15} /> Try AI Assistant <ArrowRight size={14} />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
                <footer style={{
                    background: "var(--ink)", borderTop: "1px solid rgba(255,255,255,0.05)",
                    padding: "48px 28px 32px",
                }}>
                    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 48 }}>
                            <div>
                                <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 20 }}>
                                    <div style={{
                                        width: 36, height: 36, borderRadius: 10,
                                        background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.2)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                    }}>
                                        <Scale style={{ color: "var(--gold)", width: 16, height: 16 }} />
                                    </div>
                                    <span style={{ fontFamily: "var(--serif)", fontSize: "18px", fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>
                                        NyayMitra
                                    </span>
                                </Link>
                                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.65, maxWidth: 280 }}>
                                    Empowering citizens with accessible legal solutions through technology.
                                </p>
                            </div>

                            <div>
                                <div style={{ fontSize: "11px", fontFamily: "var(--mono)", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 20 }}>
                                    Quick Links
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                    <Link href="/" style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s" }}>Home</Link>
                                    <Link href="/services" style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s" }}>Services</Link>
                                    <Link href="/about" style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s" }}>About Us</Link>
                                    <Link href="/contact" style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s" }}>Contact</Link>
                                </div>
                            </div>

                            <div>
                                <div style={{ fontSize: "11px", fontFamily: "var(--mono)", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 20 }}>
                                    Contact Us
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>
                                    <Mail size={13} color="var(--gold)" /> support@nyaymitra.tech
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
                                    <Phone size={13} color="var(--gold)" /> +91 79705 96183
                                </div>
                            </div>
                        </div>

                        <div style={{
                            marginTop: 48, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.05)",
                            display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16,
                        }}>
                            <span style={{ fontSize: "11px", fontFamily: "var(--mono)", color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em" }}>
                                © {new Date().getFullYear()} NyayMitra. All rights reserved.
                            </span>
                            <div style={{ display: "flex", gap: 16 }}>
                                <Link href="/privacy-policy" style={{ fontSize: "11px", fontFamily: "var(--mono)", color: "rgba(255,255,255,0.25)", textDecoration: "none" }}>Privacy</Link>
                                <Link href="/terms" style={{ fontSize: "11px", fontFamily: "var(--mono)", color: "rgba(255,255,255,0.25)", textDecoration: "none" }}>Terms</Link>
                                <Link href="/contact" style={{ fontSize: "11px", fontFamily: "var(--mono)", color: "rgba(255,255,255,0.25)", textDecoration: "none" }}>Contact</Link>
                            </div>
                        </div>
                    </div>
                </footer>

            </div>
        </>
    )
}