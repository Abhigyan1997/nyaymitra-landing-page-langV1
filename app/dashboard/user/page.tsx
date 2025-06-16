"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Scale,
  Calendar,
  MessageCircle,
  Clock,
  User,
  Star,
  Phone,
  Video,
  FileText,
  Bell,
  Settings,
  LogOut,
  Plus,
  Eye,
} from "lucide-react"
import Link from "next/link"

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data - in real app, this would come from API
  const user = {
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 98765 43210",
    memberSince: "January 2024",
    totalConsultations: 8,
    activeConsultations: 2,
  }

  const upcomingAppointments = [
    {
      id: 1,
      lawyer: "Adv. Priya Sharma",
      specialization: "Family Law",
      date: "2024-01-15",
      time: "10:00 AM",
      type: "video",
      status: "confirmed",
      caseTitle: "Property Dispute Consultation",
    },
    {
      id: 2,
      lawyer: "Adv. Suresh Reddy",
      specialization: "Corporate Law",
      date: "2024-01-18",
      time: "2:30 PM",
      type: "call",
      status: "pending",
      caseTitle: "Business Contract Review",
    },
  ]

  const recentConsultations = [
    {
      id: 1,
      lawyer: "Adv. Anita Patel",
      specialization: "Consumer Rights",
      date: "2024-01-10",
      type: "chat",
      status: "completed",
      rating: 5,
      caseTitle: "Product Defect Complaint",
      summary:
        "Received guidance on filing consumer complaint for defective product. Lawyer provided step-by-step process and required documents.",
    },
    {
      id: 2,
      lawyer: "Adv. Vikram Joshi",
      specialization: "Cyber Law",
      date: "2024-01-08",
      type: "video",
      status: "completed",
      rating: 4,
      caseTitle: "Online Fraud Case",
      summary:
        "Discussed online fraud incident and legal remedies available. Received advice on filing FIR and approaching cyber crime cell.",
    },
  ]

  const aiQueries = [
    {
      id: 1,
      question: "What are my rights as a tenant in Mumbai?",
      date: "2024-01-12",
      status: "answered",
      followUp: true,
    },
    {
      id: 2,
      question: "How to file a consumer complaint online?",
      date: "2024-01-09",
      status: "answered",
      followUp: false,
    },
    {
      id: 3,
      question: "Process for property registration in Maharashtra",
      date: "2024-01-05",
      status: "answered",
      followUp: true,
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "call":
        return <Phone className="h-4 w-4" />
      case "chat":
        return <MessageCircle className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">Manage your legal consultations and track your cases</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Consultations</p>
                  <p className="text-2xl font-bold text-gray-900">{user.totalConsultations}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Cases</p>
                  <p className="text-2xl font-bold text-gray-900">{user.activeConsultations}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Upcoming Appointments</p>
                  <p className="text-2xl font-bold text-gray-900">{upcomingAppointments.length}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">AI Queries</p>
                  <p className="text-2xl font-bold text-gray-900">{aiQueries.length}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="consultations">Consultations</TabsTrigger>
            <TabsTrigger value="ai-queries">AI Queries</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Upcoming Appointments */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled consultations</CardDescription>
                </div>
                <Link href="/lawyers">
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Book New
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {upcomingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            {getTypeIcon(appointment.type)}
                          </div>
                          <div>
                            <h3 className="font-medium">{appointment.lawyer}</h3>
                            <p className="text-sm text-gray-600">{appointment.specialization}</p>
                            <p className="text-sm text-gray-500">{appointment.caseTitle}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-1">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{appointment.date}</span>
                          </div>
                          <div className="flex items-center space-x-2 mb-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{appointment.time}</span>
                          </div>
                          <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No upcoming appointments</p>
                    <Link href="/lawyers">
                      <Button className="mt-4">Book Your First Consultation</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest legal consultations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentConsultations.slice(0, 3).map((consultation) => (
                    <div key={consultation.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          {getTypeIcon(consultation.type)}
                        </div>
                        <div>
                          <h3 className="font-medium">{consultation.lawyer}</h3>
                          <p className="text-sm text-gray-600">{consultation.caseTitle}</p>
                          <p className="text-sm text-gray-500">{consultation.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[...Array(consultation.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <Badge className={getStatusColor(consultation.status)}>{consultation.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>All Appointments</CardTitle>
                  <CardDescription>Manage your scheduled consultations</CardDescription>
                </div>
                <Link href="/lawyers">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Book New Appointment
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="p-6 border rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{appointment.lawyer}</h3>
                          <p className="text-gray-600">{appointment.specialization}</p>
                        </div>
                        <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{appointment.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{appointment.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(appointment.type)}
                          <span className="text-sm capitalize">{appointment.type}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{appointment.caseTitle}</p>
                      <div className="flex space-x-2">
                        <Button size="sm">Join Consultation</Button>
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button variant="outline" size="sm">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="consultations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Consultation History</CardTitle>
                <CardDescription>Your completed legal consultations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentConsultations.map((consultation) => (
                    <div key={consultation.id} className="p-6 border rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{consultation.lawyer}</h3>
                          <p className="text-gray-600">{consultation.specialization}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {[...Array(consultation.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <Badge className={getStatusColor(consultation.status)}>{consultation.status}</Badge>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{consultation.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(consultation.type)}
                          <span className="text-sm capitalize">{consultation.type}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{consultation.caseTitle}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{consultation.summary}</p>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Download Report
                        </Button>
                        <Button variant="outline" size="sm">
                          Book Follow-up
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-queries" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>AI Legal Queries</CardTitle>
                  <CardDescription>Your questions answered by Legal GPT</CardDescription>
                </div>
                <Link href="/legal-gpt">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Ask New Question
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiQueries.map((query) => (
                    <div key={query.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{query.question}</h3>
                        <Badge className={getStatusColor(query.status)}>{query.status}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">{query.date}</p>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View Answer
                          </Button>
                          {query.followUp && <Button size="sm">Connect with Lawyer</Button>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
