"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { FileCode, Wand2, Sparkles, Download, ArrowRight, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

export default function AIPDFGeneratorPage() {
    const [inputText, setInputText] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)
    const [generatedPDF, setGeneratedPDF] = useState(false)

    const examples = [
        "Draft a legal notice to my landlord about returning my security deposit",
        "Create a complaint letter to the electricity board about frequent power cuts",
        "Generate a rental agreement for a 2BHK apartment in Bangalore for 11 months",
        "Write an affidavit for name change after marriage"
    ]

    const handleGenerate = () => {
        setIsGenerating(true)
        // Simulate generation delay
        setTimeout(() => {
            setIsGenerating(false)
            setGeneratedPDF(true)
        }, 2000)
    }

    const handleReset = () => {
        setInputText("")
        setGeneratedPDF(false)
    }

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-lime-900/20 to-green-900/20" />
                <div className="absolute inset-0 cyber-grid opacity-30" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-lime-500/20 to-green-500/20 border border-lime-500/30 backdrop-blur-sm mb-6">
                        <Wand2 className="h-4 w-4 text-lime-400 mr-2" />
                        <span className="text-sm text-lime-300">AI-Powered</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text text-transparent pb-2">
                        Legal PDF Generator
                    </h1>
                    <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                        Create professional legal documents in PDF format using natural language.
                    </p>
                </motion.div>

                {/* Generator Card */}
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 mb-12">
                    <CardHeader>
                        <CardTitle className="text-white">
                            {generatedPDF ? 'Your PDF is Ready!' : 'Describe Your Document'}
                        </CardTitle>
                        <CardDescription className="text-white/70">
                            {generatedPDF ? 'Download your professionally formatted legal document' : 'Tell us what legal document you need in plain English'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {!generatedPDF ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                <Textarea
                                    className="bg-white/5 border-white/10 text-white min-h-[200px]"
                                    placeholder="Example: 'Create a rental agreement for my 2BHK apartment in Mumbai for 11 months with a security deposit of ₹50,000'"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <h4 className="text-sm font-medium text-white/80 mb-2 flex items-center">
                                            <Sparkles className="h-4 w-4 mr-2 text-lime-300" />
                                            Try these examples:
                                        </h4>
                                        <div className="grid md:grid-cols-2 gap-2">
                                            {examples.map((example, index) => (
                                                <Button
                                                    key={index}
                                                    variant="outline"
                                                    className="text-xs h-auto py-2 text-left bg-white/5 border-white/10 hover:bg-white/10 text-white/80 hover:text-white font-normal"
                                                    onClick={() => setInputText(example)}
                                                >
                                                    {example}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    onClick={handleGenerate}
                                    className="w-full bg-gradient-to-r from-lime-500 to-green-500 hover:from-lime-600 hover:to-green-600"
                                    disabled={!inputText.trim() || isGenerating}
                                >
                                    {isGenerating ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Wand2 className="h-4 w-4 mr-2" />
                                            Generate PDF (₹99)
                                        </>
                                    )}
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="text-center py-8"
                            >
                                <div className="w-20 h-20 bg-gradient-to-r from-lime-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FileCode className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Document Generated!</h3>
                                <p className="text-white/70 mb-8">Your legal document is ready to download in PDF format.</p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button className="bg-gradient-to-r from-lime-500 to-green-500">
                                        <Download className="h-4 w-4 mr-2" />
                                        Download PDF
                                    </Button>
                                    <Button variant="outline" className="bg-white/10 border-white/20" onClick={handleReset}>
                                        Create Another
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </CardContent>
                </Card>

                {/* Demo CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center"
                >
                    <div className="inline-flex items-center mb-6 text-sm text-white/60">
                        <Info className="h-4 w-4 mr-2" />
                        Want to try before purchasing?
                    </div>
                    <Link href="/ai-pdf/demo">
                        <Button variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20">
                            Try Free Demo
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}