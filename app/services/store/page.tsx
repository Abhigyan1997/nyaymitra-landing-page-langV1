"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ShoppingBag, Search, FileText, Download, Star, Filter, ArrowRight } from "lucide-react"
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
        </div>
    )
}