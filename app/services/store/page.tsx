"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ShoppingBag, Search, Star, Filter, Download, FileCheck, ArrowRight, FileText, Check, Phone, FileSearch, Scale, Sparkles, Users, Menu, X, BookText, Home, Mail, } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const templates = [
    {
        id: "rent-agreement",
        title: "Rent Agreement",
        description: "Standard rental contract for residential properties with all necessary clauses",
        price: "₹149",
        rating: 4.8,
        downloads: 1243,
        category: "Property",
        popular: true
    },
    {
        id: "complaint-letter",
        title: "Police Complaint Letter",
        description: "Formal complaint format for reporting incidents to police authorities",
        price: "₹99",
        rating: 4.5,
        downloads: 876,
        category: "Legal Notice"
    },
    {
        id: "name-change-affidavit",
        title: "Name Change Affidavit",
        description: "Affidavit format for name change purposes with notary clause",
        price: "₹129",
        rating: 4.7,
        downloads: 1532,
        category: "Affidavit",
        popular: true
    },
    {
        id: "employment-contract",
        title: "Employment Contract",
        description: "Standard employment agreement between employer and employee",
        price: "₹199",
        rating: 4.6,
        downloads: 654,
        category: "Business"
    },
    {
        id: "will-draft",
        title: "Last Will & Testament",
        description: "Template for creating a legally valid will document",
        price: "₹249",
        rating: 4.9,
        downloads: 432,
        category: "Estate Planning"
    },
    {
        id: "consumer-complaint",
        title: "Consumer Court Complaint",
        description: "Format for filing complaints in consumer courts",
        price: "₹129",
        rating: 4.4,
        downloads: 765,
        category: "Legal Notice"
    }
]

const categories = [
    "All",
    "Affidavit",
    "Property",
    "Business",
    "Legal Notice",
    "Family",
    "Estate Planning"
]

export default function LegalStorePage() {
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [searchQuery, setSearchQuery] = useState("")
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const filteredTemplates = templates.filter(template => {
        const matchesCategory = selectedCategory === "All" || template.category === selectedCategory
        const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-gray-800/20" />
                <div className="absolute inset-0 cyber-grid opacity-30" />
            </div>

            {/* Header */}
            <header className="relative z-50 w-full border-b border-white/10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div className="relative">
                                <Scale className="h-10 w-10 text-blue-400 group-hover:text-blue-300 transition-all duration-300 group-hover:rotate-12" />
                                <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Nyay Mitra
                            </span>
                        </Link>


                        <nav className="hidden md:flex items-center space-x-6">
                            <Link href="/" className="text-white/80 hover:text-white transition-colors">
                                <Home className="h-4 w-4 mr-1 inline" /> Home
                            </Link>
                            <Link href="/services" className="text-white/80 hover:text-white transition-colors">
                                <BookText className="h-4 w-4 mr-1 inline" /> Services
                            </Link>
                            <Link href="/contact" className="text-white/80 hover:text-white transition-colors">
                                <Mail className="h-4 w-4 mr-1 inline" /> Contact
                            </Link>
                        </nav>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Button variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20 hidden sm:inline-flex">
                            Back to Services
                        </Button>
                        <Button className="hidden md:inline-flex bg-gradient-to-r from-yellow-500 to-orange-500">
                            Get Started
                        </Button>

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
                            {/* <Link href="/services" className="text-white/80 hover:text-white transition-colors">
                                Services
                            </Link> */}
                            <Link href="/lawyers" className="text-white/80 hover:text-white transition-colors">
                                Find Lawyer
                            </Link>
                            <Link href="/ai-legal-assistant" className="text-white/80 hover:text-white transition-colors">
                                Talk to AI
                            </Link>
                            <Button variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20">
                                Back to Services
                            </Button>
                            <Button className="bg-gradient-to-r from-yellow-500 to-orange-500">
                                Get Started
                            </Button>
                        </div>
                    </div>
                )}
            </header>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-gray-500/20 to-gray-700/20 border border-gray-500/30 backdrop-blur-sm mb-6">
                        <ShoppingBag className="h-4 w-4 text-gray-300 mr-2" />
                        <span className="text-sm text-gray-300">Verified Legal Templates</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent pb-2">
                        Legal Template Store
                    </h1>
                    <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                        Purchase professionally drafted legal document templates — ready to fill and use.
                    </p>
                </motion.div>

                {/* Search and Filter */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-12"
                >
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                type="search"
                                placeholder="Search templates..."
                                className="pl-10 bg-white/5 border-white/10 text-white"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                            {categories.map((category) => (
                                <Button
                                    key={category}
                                    variant={selectedCategory === category ? "default" : "outline"}
                                    className={`whitespace-nowrap ${selectedCategory === category ? 'bg-white text-black hover:bg-white/90' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Templates Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredTemplates.map((template, index) => (
                        <motion.div
                            key={template.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            <Card className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-gray-400/30 transition-all duration-300 h-full flex flex-col">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-white">{template.title}</CardTitle>
                                        {template.popular && (
                                            <Badge className="bg-gray-300/20 text-gray-300">
                                                <Star className="h-3 w-3 mr-1" />
                                                Popular
                                            </Badge>
                                        )}
                                    </div>
                                    <CardDescription className="text-white/70">
                                        {template.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="text-2xl font-bold text-white">{template.price}</div>
                                        <div className="flex items-center text-sm text-white/70">
                                            <Star className="h-4 w-4 text-yellow-400 mr-1 fill-yellow-400/20" />
                                            {template.rating} ({template.downloads} downloads)
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="text-xs border-white/20 text-white/60 mb-4">
                                        {template.category}
                                    </Badge>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 group">
                                        <Download className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                                        Purchase Template
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {filteredTemplates.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">No Templates Found</h3>
                        <p className="text-white/70 mb-6">Try adjusting your search or filter criteria</p>
                        <Button
                            variant="outline"
                            className="bg-white/10 border-white/20 hover:bg-white/20"
                            onClick={() => {
                                setSelectedCategory("All")
                                setSearchQuery("")
                            }}
                        >
                            Reset Filters
                        </Button>
                    </motion.div>
                )}

                {/* Custom Request CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-20 text-center"
                >
                    <div className="inline-flex items-center mb-6 text-sm text-white/60">
                        <FileText className="h-4 w-4 mr-2" />
                        Need a custom legal document?
                    </div>
                    <Link href="/ai-document-generator">
                        <Button variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20">
                            Try Our AI Document Generator
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
            {/* Footer */}
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
                                    legal@nyaymitra.in
                                </li>
                                <li className="flex items-center">
                                    <Phone className="h-4 w-4 mr-2 text-lime-400" />
                                    +91 98765 43210
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