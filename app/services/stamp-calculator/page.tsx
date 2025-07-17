"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, FileText, Scale, ArrowRight, Download, Info, MapPin, Mail, Phone, X, Menu, BookText, Home } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function StampCalculatorPage() {
    const [state, setState] = useState<string>("Maharashtra")
    const [documentType, setDocumentType] = useState<string>("Rent Agreement")
    const [propertyValue, setPropertyValue] = useState<number>(10000)
    const [duration, setDuration] = useState<number>(11)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const states = [
        // States
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal",

        // Union Territories
        "Andaman and Nicobar Islands",
        "Chandigarh",
        "Dadra and Nagar Haveli and Daman and Diu",
        "Delhi",
        "Jammu and Kashmir",
        "Ladakh",
        "Lakshadweep",
        "Puducherry"
    ];


    const documentTypes = [
        "Rent Agreement", "Affidavit", "Power of Attorney", "Sale Agreement",
        "Gift Deed", "Partnership Deed", "Will", "Lease Agreement",
        "Mortgage Deed", "Business Agreement", "Employment Contract", "Adoption Deed"
    ];

    const stampDutyRates: {
        [state: string]: {
            [docType: string]: number | ((value: number, duration?: number) => number)
        }
    } = {
        "Maharashtra": {
            "Rent Agreement": (value, duration = 11) => Math.max(100, value * duration * 0.0025),
            "Sale Agreement": (value) => value * 0.05,
            "Gift Deed": (value) => value * 0.03,
            "Affidavit": 100,
            "Power of Attorney": 500,
            "Partnership Deed": 2000,
            "Will": 200,
            "Lease Agreement": (value) => value * 0.025,
            "Mortgage Deed": (value) => value * 0.03,
            "Business Agreement": 1500,
            "Employment Contract": 100,
            "Adoption Deed": 500,
        },
        "Delhi": {
            "Rent Agreement": (value, duration = 11) => value * duration * 0.02,
            "Sale Agreement": (value) => value * 0.04,
            "Gift Deed": (value) => value * 0.02,
            "Affidavit": 50,
            "Power of Attorney": 200,
            "Partnership Deed": 1000,
            "Will": 100,
            "Lease Agreement": (value) => value * 0.03,
            "Mortgage Deed": (value) => value * 0.02,
            "Business Agreement": 1000,
            "Employment Contract": 50,
            "Adoption Deed": 300,
        },
        "Karnataka": {
            "Rent Agreement": (value, duration = 11) => Math.max(200, value * duration * 0.01),
            "Sale Agreement": (value) => value * 0.05,
            "Gift Deed": (value) => value * 0.02,
            "Affidavit": 20,
            "Power of Attorney": 100,
            "Partnership Deed": 1500,
            "Will": 100,
            "Lease Agreement": (value) => value * 0.02,
            "Mortgage Deed": (value) => value * 0.03,
            "Business Agreement": 1000,
            "Employment Contract": 50,
            "Adoption Deed": 300,
        },
        "Uttar Pradesh": {
            "Rent Agreement": (value, duration = 11) => value * duration * 0.01,
            "Sale Agreement": (value) => value * 0.07,
            "Gift Deed": (value) => value * 0.05,
            "Affidavit": 50,
            "Power of Attorney": 200,
            "Partnership Deed": 1000,
            "Will": 150,
            "Lease Agreement": (value) => value * 0.03,
            "Mortgage Deed": (value) => value * 0.05,
            "Business Agreement": 1000,
            "Employment Contract": 100,
            "Adoption Deed": 400,
        },
        "Tamil Nadu": {
            "Rent Agreement": (value, duration = 11) => value * duration * 0.01,
            "Sale Agreement": (value) => value * 0.07,
            "Gift Deed": (value) => value * 0.04,
            "Affidavit": 20,
            "Power of Attorney": 100,
            "Partnership Deed": 1500,
            "Will": 100,
            "Lease Agreement": (value) => value * 0.02,
            "Mortgage Deed": (value) => value * 0.04,
            "Business Agreement": 800,
            "Employment Contract": 100,
            "Adoption Deed": 300,
        },
        "Gujarat": {
            "Rent Agreement": (value, duration = 11) => value * duration * 0.005,
            "Sale Agreement": (value) => value * 0.045,
            "Gift Deed": (value) => value * 0.025,
            "Affidavit": 100,
            "Power of Attorney": 300,
            "Partnership Deed": 1200,
            "Will": 100,
            "Lease Agreement": (value) => value * 0.02,
            "Mortgage Deed": (value) => value * 0.035,
            "Business Agreement": 1200,
            "Employment Contract": 100,
            "Adoption Deed": 250,
        },
        "West Bengal": {
            "Rent Agreement": (value, duration = 11) => value * duration * 0.005,
            "Sale Agreement": (value) => value * 0.06,
            "Gift Deed": (value) => value * 0.05,
            "Affidavit": 50,
            "Power of Attorney": 300,
            "Partnership Deed": 1000,
            "Will": 100,
            "Lease Agreement": (value) => value * 0.025,
            "Mortgage Deed": (value) => value * 0.03,
            "Business Agreement": 1000,
            "Employment Contract": 100,
            "Adoption Deed": 300,
        },
        "Rajasthan": {
            "Rent Agreement": (value, duration = 11) => value * duration * 0.01,
            "Sale Agreement": (value) => value * 0.06,
            "Gift Deed": (value) => value * 0.04,
            "Affidavit": 100,
            "Power of Attorney": 300,
            "Partnership Deed": 1200,
            "Will": 100,
            "Lease Agreement": (value) => value * 0.02,
            "Mortgage Deed": (value) => value * 0.04,
            "Business Agreement": 1000,
            "Employment Contract": 100,
            "Adoption Deed": 350,
        },
        "Telangana": {
            "Rent Agreement": (value, duration = 11) => value * duration * 0.005,
            "Sale Agreement": (value) => value * 0.06,
            "Gift Deed": (value) => value * 0.04,
            "Affidavit": 100,
            "Power of Attorney": 300,
            "Partnership Deed": 1200,
            "Will": 150,
            "Lease Agreement": (value) => value * 0.02,
            "Mortgage Deed": (value) => value * 0.04,
            "Business Agreement": 1200,
            "Employment Contract": 80,
            "Adoption Deed": 300,
        },
        "Madhya Pradesh": {
            "Rent Agreement": (value, duration = 11) => value * duration * 0.01,
            "Sale Agreement": (value) => value * 0.05,
            "Gift Deed": (value) => value * 0.03,
            "Affidavit": 100,
            "Power of Attorney": 200,
            "Partnership Deed": 1500,
            "Will": 100,
            "Lease Agreement": (value) => value * 0.02,
            "Mortgage Deed": (value) => value * 0.035,
            "Business Agreement": 1200,
            "Employment Contract": 100,
            "Adoption Deed": 300,
        },
        "Andhra Pradesh": {
            "Rent Agreement": (value, duration = 11) => value * duration * 0.005,
            "Sale Agreement": (value) => value * 0.06,
            "Gift Deed": (value) => value * 0.04,
            "Affidavit": 50,
            "Power of Attorney": 200,
            "Partnership Deed": 1000,
            "Will": 100,
            "Lease Agreement": (value) => value * 0.02,
            "Mortgage Deed": (value) => value * 0.035,
            "Business Agreement": 1000,
            "Employment Contract": 100,
            "Adoption Deed": 300,
        },
        "Bihar": {
            "Rent Agreement": (value, duration = 11) => value * duration * 0.01,
            "Sale Agreement": (value) => value * 0.06,
            "Gift Deed": (value) => value * 0.05,
            "Affidavit": 50,
            "Power of Attorney": 200,
            "Partnership Deed": 1000,
            "Will": 100,
            "Lease Agreement": (value) => value * 0.03,
            "Mortgage Deed": (value) => value * 0.04,
            "Business Agreement": 1000,
            "Employment Contract": 100,
            "Adoption Deed": 300,
        },
        "Punjab": {
            "Rent Agreement": (value, duration = 11) => value * duration * 0.005,
            "Sale Agreement": (value) => value * 0.06,
            "Gift Deed": (value) => value * 0.045,
            "Affidavit": 100,
            "Power of Attorney": 200,
            "Partnership Deed": 1000,
            "Will": 100,
            "Lease Agreement": (value) => value * 0.025,
            "Mortgage Deed": (value) => value * 0.035,
            "Business Agreement": 1000,
            "Employment Contract": 100,
            "Adoption Deed": 300,
        },
        // For remaining states/UTs: Use default flat rates or % values
        ...Object.fromEntries(
            [
                "Andaman and Nicobar Islands", "Arunachal Pradesh", "Assam", "Chandigarh", "Chhattisgarh",
                "Dadra and Nagar Haveli and Daman and Diu", "Goa", "Haryana", "Himachal Pradesh",
                "Jammu and Kashmir", "Jharkhand", "Kerala", "Ladakh", "Lakshadweep", "Manipur",
                "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Sikkim", "Tripura", "Uttarakhand"
            ].map(state => [
                state,
                {
                    "Rent Agreement": (value: number, duration = 11) => value * duration * 0.01,
                    "Sale Agreement": (value: number) => value * 0.05,
                    "Gift Deed": (value: number) => value * 0.03,
                    "Affidavit": 50,
                    "Power of Attorney": 100,
                    "Partnership Deed": 1000,
                    "Will": 100,
                    "Lease Agreement": (value: number) => value * 0.02,
                    "Mortgage Deed": (value: number) => value * 0.03,
                    "Business Agreement": 1000,
                    "Employment Contract": 50,
                    "Adoption Deed": 300
                }
            ])
        )
    }

    const calculateStampDuty = () => {
        const stateRates = stampDutyRates[state];

        if (!stateRates) return 0;

        const rate = stateRates[documentType];

        if (typeof rate === "function") {
            return rate(propertyValue, duration);
        } else if (typeof rate === "number") {
            return rate;
        }

        return 0;
    };

    const stampDuty = calculateStampDuty();

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Responsive Header */}
            <header className="relative z-50 w-full border-b border-white/10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo on the left */}
                        <div className="flex-shrink-0">
                            <Link href="/" className="flex items-center space-x-3 group">
                                <div className="relative">
                                    <Scale className="h-10 w-10 text-blue-400 group-hover:text-blue-300 transition-all duration-300 group-hover:rotate-12" />
                                    <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                                </div>
                                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    Nyay Mitra
                                </span>
                            </Link>
                        </div>

                        {/* Centered navigation links */}
                        <nav className="hidden md:flex items-center justify-center flex-1 px-8">
                            <div className="flex space-x-8">
                                <Link href="/" className="text-white/80 hover:text-white transition-colors flex items-center">
                                    <Home className="h-4 w-4 mr-1" /> Home
                                </Link>
                                <Link href="/services" className="text-white/80 hover:text-white transition-colors flex items-center">
                                    <BookText className="h-4 w-4 mr-1" /> Services
                                </Link>
                                <Link href="/contact" className="text-white/80 hover:text-white transition-colors flex items-center">
                                    <Mail className="h-4 w-4 mr-1" /> Contact
                                </Link>
                            </div>
                        </nav>

                        {/* Right side links */}
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/services"
                                className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
                            >
                                Back to Services
                            </Link>
                            <Link
                                href="/services"
                                className="hidden md:inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 transition-colors"
                            >
                                Get Started
                            </Link>

                            {/* Mobile menu button */}
                            <button
                                className="md:hidden text-white focus:outline-none"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden bg-gray-900/95 backdrop-blur-sm px-4 py-6 border-t border-white/10">
                            <div className="flex flex-col space-y-4">
                                <Link href="/" className="text-white/80 hover:text-white transition-colors">
                                    <Home className="h-4 w-4 mr-2 inline" /> Home
                                </Link>
                                <Link href="/services" className="text-white/80 hover:text-white transition-colors">
                                    <BookText className="h-4 w-4 mr-2 inline" /> Services
                                </Link>
                                <Link href="/contact" className="text-white/80 hover:text-white transition-colors">
                                    <Mail className="h-4 w-4 mr-2 inline" /> Contact
                                </Link>
                                <Link href="/lawyers" className="text-white/80 hover:text-white transition-colors">
                                    Find Lawyer
                                </Link>
                                <Link href="/ai-legal-assistant" className="text-white/80 hover:text-white transition-colors">
                                    Talk to AI
                                </Link>
                                <Link
                                    href="/services"
                                    className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
                                >
                                    Back to Services
                                </Link>
                                <Link
                                    href="/services"
                                    className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 transition-colors"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
                <div className="absolute inset-0 cyber-grid opacity-30" />
            </div>

            {/* Header */}
            <section className="relative z-10 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 backdrop-blur-sm mb-8">
                            <Scale className="h-4 w-4 text-blue-400 mr-2" />
                            <span className="text-sm text-blue-300">Legal Utility Tool</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent pb-2">
                            Stamp Duty Calculator
                        </h1>
                        <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                            Calculate the exact stamp paper value required for your documents based on Indian state laws
                        </p>
                    </div>
                </div>
            </section>

            {/* Calculator Section */}
            <section className="relative z-10 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
                        <CardHeader>
                            <CardTitle className="text-2xl flex items-center">
                                <Calculator className="h-6 w-6 mr-2 text-blue-400" />
                                Stamp Duty Calculator
                            </CardTitle>
                            <CardDescription className="text-white/70">
                                Enter your document details to calculate the required stamp duty
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <label className="block text-sm font-medium text-white/80 mb-2">Select State</label>
                                    <select
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white/15 transition-colors"
                                    >
                                        {states.map((s) => (
                                            <option key={s} value={s} className="bg-gray-800 text-white">
                                                {s}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white/80 mb-2">Document Type</label>
                                    <select
                                        value={documentType}
                                        onChange={(e) => setDocumentType(e.target.value)}
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white/15 transition-colors"
                                    >
                                        {documentTypes.map((type) => (
                                            <option key={type} value={type} className="bg-gray-800 text-white">
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {documentType === "Rent Agreement" && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-white/80 mb-2">
                                                Monthly Rent Amount (₹)
                                            </label>
                                            <input
                                                type="number"
                                                value={propertyValue}
                                                onChange={(e) => setPropertyValue(Number(e.target.value))}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-white/80 mb-2">
                                                Agreement Duration (months)
                                            </label>
                                            <input
                                                type="number"
                                                value={duration}
                                                onChange={(e) => setDuration(Number(e.target.value))}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </>
                                )}

                                {(documentType === "Sale Agreement" || documentType === "Gift Deed") && (
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-white/80 mb-2">
                                            Property Value (₹)
                                        </label>
                                        <input
                                            type="number"
                                            value={propertyValue}
                                            onChange={(e) => setPropertyValue(Number(e.target.value))}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Results */}
                            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl p-6 mb-8">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-1">Estimated Stamp Duty</h3>
                                        <p className="text-white/70 text-sm">
                                            For {documentType} in {state}
                                        </p>
                                    </div>
                                    <div className="mt-4 md:mt-0">
                                        <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                            ₹{stampDuty.toFixed(2)}
                                        </div>
                                        <div className="text-xs text-white/60 mt-1">
                                            *Approximate calculation
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                <div className="flex items-start">
                                    <Info className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-medium text-white mb-2">Important Notes</h4>
                                        <ul className="text-sm text-white/70 space-y-2">
                                            <li>• Stamp duty rates vary by state and document type</li>
                                            <li>• For agreements over ₹50,000, registration may be required</li>
                                            <li>• Some states offer e-stamping for convenience</li>
                                            <li>• Always verify with local authorities before payment</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative z-10 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Need the actual document?</h2>
                        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                            Generate a ready-to-use {documentType} with our AI-powered document creator
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/services/ai-affidavit">
                                <Button
                                    size="lg"
                                    className="px-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 border-0 transform hover:scale-105 transition-all duration-300 group"
                                >
                                    <FileText className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                                    Create {documentType.replace(/ .*/, '')} Document
                                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </Button>
                            </Link>
                            <Link href="/services">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="px-8 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
                                >
                                    <MapPin className="mr-3 h-5 w-5" />
                                    Find Notary Near Me
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="relative z-20 bg-black/50 backdrop-blur-lg border-t border-white/10 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="md:col-span-2">
                            <div className="flex items-center mb-4">
                                <Link href="/" className="flex items-center space-x-3 group">
                                    <div className="relative">
                                        <Scale className="h-8 w-8 md:h-10 md:w-10 text-blue-400 group-hover:text-blue-300 transition-all duration-300 group-hover:rotate-12" />
                                        <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                                    </div>
                                    <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                        Nyay Mitra
                                    </span>
                                </Link>
                            </div>
                            <p className="text-white/70 text-sm">
                                Empowering citizens with accessible legal solutions through technology.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-white font-medium mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/" className="text-white/70 hover:text-white text-sm">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/services" className="text-white/70 hover:text-white text-sm">
                                        Services
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about" className="text-white/70 hover:text-white text-sm">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="text-white/70 hover:text-white text-sm">
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-medium mb-4">Contact Us</h3>
                            <ul className="space-y-2 text-sm text-white/70">
                                <li className="flex items-center">
                                    <Mail className="h-4 w-4 mr-2 text-lime-400" />
                                    contact@nyaymitra.tech
                                </li>
                                <li className="flex items-center">
                                    <Phone className="h-4 w-4 mr-2 text-lime-400" />
                                    +91 79705 96183
                                </li>
                            </ul>
                            <div className="mt-4 flex space-x-4">
                                <Link href="#" className="text-white/70 hover:text-white">
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                                <Link href="#" className="text-white/70 hover:text-white">
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </Link>
                                <Link href="#" className="text-white/70 hover:text-white">
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/50">
                        <p>© {new Date().getFullYear()} NyayMitra. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}