"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Scale,
  Star,
  MapPin,
  Clock,
  Phone,
  Video,
  MessageCircle,
  Filter,
  Search,
  User,
  Award,
  Calendar,
} from "lucide-react"
import Link from "next/link"

export default function LawyersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialization, setSelectedSpecialization] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [selectedExperience, setSelectedExperience] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("")

  const lawyers = [
    {
      id: 1,
      name: "Adv. Priya Sharma",
      specialization: "Family Law",
      experience: 12,
      rating: 4.8,
      reviews: 156,
      location: "Mumbai, Maharashtra",
      languages: ["Hindi", "English", "Marathi"],
      consultationFee: 1500,
      availability: "Available Today",
      image: "/placeholder.svg?height=100&width=100",
      verified: true,
      about: "Specialized in divorce, child custody, and family disputes with over 12 years of experience.",
      consultationModes: ["chat", "call", "video", "in-person"],
    },
    {
      id: 2,
      name: "Adv. Rajesh Kumar",
      specialization: "Criminal Law",
      experience: 15,
      rating: 4.9,
      reviews: 203,
      location: "Delhi, Delhi",
      languages: ["Hindi", "English", "Punjabi"],
      consultationFee: 2000,
      availability: "Available Tomorrow",
      image: "/placeholder.svg?height=100&width=100",
      verified: true,
      about: "Expert in criminal defense, bail applications, and high-profile criminal cases.",
      consultationModes: ["call", "video", "in-person"],
    },
    {
      id: 3,
      name: "Adv. Anita Patel",
      specialization: "Property Law",
      experience: 8,
      rating: 4.7,
      reviews: 89,
      location: "Ahmedabad, Gujarat",
      languages: ["Hindi", "English", "Gujarati"],
      consultationFee: 1200,
      availability: "Available Now",
      image: "/placeholder.svg?height=100&width=100",
      verified: true,
      about: "Specializes in property disputes, documentation, and real estate transactions.",
      consultationModes: ["chat", "call", "video"],
    },
    {
      id: 4,
      name: "Adv. Suresh Reddy",
      specialization: "Corporate Law",
      experience: 18,
      rating: 4.9,
      reviews: 267,
      location: "Hyderabad, Telangana",
      languages: ["Hindi", "English", "Telugu"],
      consultationFee: 2500,
      availability: "Available Today",
      image: "/placeholder.svg?height=100&width=100",
      verified: true,
      about: "Corporate law expert with extensive experience in mergers, acquisitions, and compliance.",
      consultationModes: ["video", "in-person"],
    },
    {
      id: 5,
      name: "Adv. Meera Singh",
      specialization: "Consumer Rights",
      experience: 6,
      rating: 4.6,
      reviews: 74,
      location: "Bangalore, Karnataka",
      languages: ["Hindi", "English", "Kannada"],
      consultationFee: 1000,
      availability: "Available Today",
      image: "/placeholder.svg?height=100&width=100",
      verified: true,
      about: "Consumer rights advocate helping clients with product defects and service issues.",
      consultationModes: ["chat", "call", "video"],
    },
    {
      id: 6,
      name: "Adv. Vikram Joshi",
      specialization: "Cyber Law",
      experience: 10,
      rating: 4.8,
      reviews: 132,
      location: "Pune, Maharashtra",
      languages: ["Hindi", "English", "Marathi"],
      consultationFee: 1800,
      availability: "Available Tomorrow",
      image: "/placeholder.svg?height=100&width=100",
      verified: true,
      about: "Cyber law specialist dealing with online fraud, data protection, and digital crimes.",
      consultationModes: ["chat", "call", "video", "in-person"],
    },
  ]

  const specializations = [
    "All Specializations",
    "Criminal Law",
    "Family Law",
    "Property Law",
    "Corporate Law",
    "Consumer Rights",
    "Cyber Law",
    "Labor Law",
  ]

  const states = [
    "All States",
    "Maharashtra",
    "Delhi",
    "Gujarat",
    "Karnataka",
    "Telangana",
    "Tamil Nadu",
    "West Bengal",
    "Rajasthan",
    "Uttar Pradesh",
  ]

  const experienceLevels = ["All Experience", "0-5 years", "5-10 years", "10-15 years", "15+ years"]

  const languages = [
    "All Languages",
    "Hindi",
    "English",
    "Marathi",
    "Gujarati",
    "Telugu",
    "Tamil",
    "Kannada",
    "Bengali",
  ]

  const filteredLawyers = lawyers.filter((lawyer) => {
    const matchesSearch =
      lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lawyer.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialization =
      !selectedSpecialization ||
      selectedSpecialization === "All Specializations" ||
      lawyer.specialization === selectedSpecialization
    const matchesState = !selectedState || selectedState === "All States" || lawyer.location.includes(selectedState)
    const matchesExperience =
      !selectedExperience ||
      selectedExperience === "All Experience" ||
      (selectedExperience === "0-5 years" && lawyer.experience <= 5) ||
      (selectedExperience === "5-10 years" && lawyer.experience > 5 && lawyer.experience <= 10) ||
      (selectedExperience === "10-15 years" && lawyer.experience > 10 && lawyer.experience <= 15) ||
      (selectedExperience === "15+ years" && lawyer.experience > 15)
    const matchesLanguage =
      !selectedLanguage || selectedLanguage === "All Languages" || lawyer.languages.includes(selectedLanguage)

    return matchesSearch && matchesSpecialization && matchesState && matchesExperience && matchesLanguage
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Scale className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Nyay Mitra</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/legal-gpt">
                <Button variant="outline">Ask AI</Button>
              </Link>
              <Link href="/auth/lawyer-signup">
                <Button>Join as Lawyer</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Verified Lawyers</h1>
          <p className="text-gray-600">Connect with experienced lawyers across India for expert legal advice</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search lawyers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Specialization */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Specialization</label>
                  <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      {specializations.map((spec) => (
                        <SelectItem key={spec} value={spec}>
                          {spec}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* State */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">State</label>
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Experience */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Experience</label>
                  <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Language */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Language</label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedSpecialization("")
                    setSelectedState("")
                    setSelectedExperience("")
                    setSelectedLanguage("")
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Lawyers List */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">Showing {filteredLawyers.length} lawyers</p>
            </div>

            <div className="space-y-6">
              {filteredLawyers.map((lawyer) => (
                <Card key={lawyer.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Lawyer Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                              <User className="h-8 w-8 text-gray-400" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h3 className="text-xl font-semibold text-gray-900">{lawyer.name}</h3>
                                {lawyer.verified && (
                                  <Badge className="bg-green-100 text-green-800">
                                    <Award className="h-3 w-3 mr-1" />
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              <p className="text-blue-600 font-medium">{lawyer.specialization}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                                <span className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {lawyer.experience} years exp.
                                </span>
                                <span className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {lawyer.location}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-4">{lawyer.about}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="text-sm text-gray-600">Languages:</span>
                          {lawyer.languages.map((lang, index) => (
                            <Badge key={index} variant="secondary">
                              {lang}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center space-x-4 mb-4">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="ml-1 font-medium">{lawyer.rating}</span>
                            <span className="text-gray-600 text-sm ml-1">({lawyer.reviews} reviews)</span>
                          </div>
                          <Badge variant={lawyer.availability === "Available Now" ? "default" : "secondary"}>
                            {lawyer.availability}
                          </Badge>
                        </div>

                        <div className="flex items-center space-x-2 mb-4">
                          <span className="text-sm text-gray-600">Consultation modes:</span>
                          {lawyer.consultationModes.includes("chat") && (
                            <MessageCircle className="h-4 w-4 text-blue-600" />
                          )}
                          {lawyer.consultationModes.includes("call") && <Phone className="h-4 w-4 text-green-600" />}
                          {lawyer.consultationModes.includes("video") && <Video className="h-4 w-4 text-purple-600" />}
                          {lawyer.consultationModes.includes("in-person") && (
                            <User className="h-4 w-4 text-orange-600" />
                          )}
                        </div>
                      </div>

                      {/* Booking Section */}
                      <div className="md:w-64 flex flex-col justify-between">
                        <div className="text-center mb-4">
                          <div className="text-2xl font-bold text-gray-900">₹{lawyer.consultationFee}</div>
                          <div className="text-sm text-gray-600">per consultation</div>
                        </div>

                        <div className="space-y-2">
                          <Link href={`/booking?lawyer=${lawyer.id}`}>
                            <Button className="w-full">
                              <Calendar className="h-4 w-4 mr-2" />
                              Book Consultation
                            </Button>
                          </Link>
                          <Button variant="outline" className="w-full">
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredLawyers.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <User className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No lawyers found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
