"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  Scale,
  Calendar,
  MessageCircle,
  Clock,
  User,
  Star,
  Phone,
  Video,
  Bell,
  Settings,
  LogOut,
  DollarSign,
  TrendingUp,
  Users,
  CheckCircle,
  X,
  Eye,
} from "lucide-react"
import Link from "next/link"

export default function LawyerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isAvailable, setIsAvailable] = useState(true)

  // Mock data - in real app, this would come from API
  const lawyer = {
    name: "Adv. Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43210",
    specialization: "Family Law",
    experience: 12,
    rating: 4.8,
    totalConsultations: 156,
    activeClients: 23,
    monthlyEarnings: 85000,
    completionRate: 98,
  }

  const todaySchedule = [
    {
      id: 1,
      client: "Rajesh Kumar",
      time: "10:00 AM",
      type: "video",
      status: "upcoming",
      caseTitle: "Property Dispute",
      duration: 30,
    },
    {
      id: 2,
      client: "Anita Patel",
      time: "2:30 PM",
      type: "call",
      status: "upcoming",
      caseTitle: "Divorce Consultation",
      duration: 45,
    },
    {
      id: 3,
      client: "Suresh Reddy",
      time: "4:00 PM",
      type: "chat",
      status: "completed",
      caseTitle: "Legal Document Review",
      duration: 30,
    },
  ]

  const pendingConsultations = [
    {
      id: 1,
      client: "Meera Singh",
      requestedTime: "2024-01-16 11:00 AM",
      type: "video",
      caseTitle: "Child Custody Case",
      urgency: "high",
      fee: 2000,
    },
    {
      id: 2,
      client: "Vikram Joshi",
      requestedTime: "2024-01-17 3:00 PM",
      type: "call",
      caseTitle: "Property Registration",
      urgency: "medium",
      fee: 1500,
    },
    {
      id: 3,
      client: "Deepa Nair",
      requestedTime: "2024-01-18 10:30 AM",
      type: "in-person",
      caseTitle: "Business Contract Dispute",
      urgency: "low",
      fee: 2500,
    },
  ]

  const recentConsultations = [
    {
      id: 1,
      client: "Amit Sharma",
      date: "2024-01-12",
      type: "video",
      status: "completed",
      rating: 5,
      caseTitle: "Divorce Settlement",
      fee: 2000,
      duration: 45,
    },
    {
      id: 2,
      client: "Ravi Patel",
      date: "2024-01-11",
      type: "call",
      status: "completed",
      rating: 4,
      caseTitle: "Property Dispute",
      fee: 1500,
      duration: 30,
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
      case "in-person":
        return <User className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
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
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Available</span>
                <Switch checked={isAvailable} onCheckedChange={setIsAvailable} />
              </div>
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {lawyer.name}!</h1>
              <p className="text-gray-600">
                {lawyer.specialization} • {lawyer.experience} years experience
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-semibold">{lawyer.rating}</span>
                  <span className="text-gray-600">({lawyer.totalConsultations} reviews)</span>
                </div>
                <div
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {isAvailable ? "Available" : "Unavailable"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Earnings</p>
                  <p className="text-2xl font-bold text-gray-900">₹{lawyer.monthlyEarnings.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Clients</p>
                  <p className="text-2xl font-bold text-gray-900">{lawyer.activeClients}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Consultations</p>
                  <p className="text-2xl font-bold text-gray-900">{lawyer.totalConsultations}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{lawyer.completionRate}%</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="consultations">Consultations</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Today's Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle>Today's Schedule</CardTitle>
                  <CardDescription>Your appointments for today</CardDescription>
                </CardHeader>
                <CardContent>
                  {todaySchedule.length > 0 ? (
                    <div className="space-y-4">
                      {todaySchedule.map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                              {getTypeIcon(appointment.type)}
                            </div>
                            <div>
                              <h3 className="font-medium">{appointment.client}</h3>
                              <p className="text-sm text-gray-600">{appointment.caseTitle}</p>
                              <p className="text-sm text-gray-500">{appointment.duration} minutes</p>
                            </div>
                          </div>
                          <div className="text-right">
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
                      <p className="text-gray-600">No appointments scheduled for today</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Pending Consultation Requests */}
              <Card>
                <CardHeader>
                  <CardTitle>Pending Requests</CardTitle>
                  <CardDescription>New consultation requests awaiting your response</CardDescription>
                </CardHeader>
                <CardContent>
                  {pendingConsultations.length > 0 ? (
                    <div className="space-y-4">
                      {pendingConsultations.slice(0, 3).map((request) => (
                        <div key={request.id} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-medium">{request.client}</h3>
                            <Badge className={getUrgencyColor(request.urgency)}>{request.urgency} priority</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{request.caseTitle}</p>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Calendar className="h-4 w-4" />
                              <span>{request.requestedTime}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              {getTypeIcon(request.type)}
                              <span>₹{request.fee}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" className="flex-1">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Accept
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              <X className="h-4 w-4 mr-2" />
                              Decline
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No pending requests</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Consultations</CardTitle>
                <CardDescription>Your latest completed consultations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentConsultations.map((consultation) => (
                    <div key={consultation.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          {getTypeIcon(consultation.type)}
                        </div>
                        <div>
                          <h3 className="font-medium">{consultation.client}</h3>
                          <p className="text-sm text-gray-600">{consultation.caseTitle}</p>
                          <p className="text-sm text-gray-500">
                            {consultation.date} • {consultation.duration} minutes
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="flex">
                            {[...Array(consultation.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm font-medium">₹{consultation.fee}</p>
                        <Badge className={getStatusColor(consultation.status)}>{consultation.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Manage Schedule</CardTitle>
                <CardDescription>View and manage your appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {todaySchedule.map((appointment) => (
                    <div key={appointment.id} className="p-6 border rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{appointment.client}</h3>
                          <p className="text-gray-600">{appointment.caseTitle}</p>
                        </div>
                        <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{appointment.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(appointment.type)}
                          <span className="text-sm capitalize">{appointment.type}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{appointment.duration} minutes</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {appointment.status === "upcoming" && (
                          <>
                            <Button size="sm">Start Consultation</Button>
                            <Button variant="outline" size="sm">
                              Reschedule
                            </Button>
                            <Button variant="outline" size="sm">
                              Cancel
                            </Button>
                          </>
                        )}
                        {appointment.status === "completed" && (
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        )}
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
                <CardTitle>Consultation Requests</CardTitle>
                <CardDescription>Manage incoming consultation requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {pendingConsultations.map((request) => (
                    <div key={request.id} className="p-6 border rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{request.client}</h3>
                          <p className="text-gray-600">{request.caseTitle}</p>
                        </div>
                        <Badge className={getUrgencyColor(request.urgency)}>{request.urgency} priority</Badge>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{request.requestedTime}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(request.type)}
                          <span className="text-sm capitalize">{request.type}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">₹{request.fee}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Accept Request
                        </Button>
                        <Button variant="outline" size="sm">
                          <X className="h-4 w-4 mr-2" />
                          Decline
                        </Button>
                        <Button variant="outline" size="sm">
                          Suggest Alternative Time
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600">This Month</p>
                    <p className="text-3xl font-bold text-gray-900">₹{lawyer.monthlyEarnings.toLocaleString()}</p>
                    <p className="text-sm text-green-600">+12% from last month</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600">This Week</p>
                    <p className="text-3xl font-bold text-gray-900">₹18,500</p>
                    <p className="text-sm text-green-600">+8% from last week</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600">Average per Consultation</p>
                    <p className="text-3xl font-bold text-gray-900">₹1,750</p>
                    <p className="text-sm text-blue-600">Based on last 30 days</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Earnings</CardTitle>
                <CardDescription>Your consultation earnings breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentConsultations.map((consultation) => (
                    <div key={consultation.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          {getTypeIcon(consultation.type)}
                        </div>
                        <div>
                          <h3 className="font-medium">{consultation.client}</h3>
                          <p className="text-sm text-gray-600">{consultation.caseTitle}</p>
                          <p className="text-sm text-gray-500">{consultation.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-green-600">₹{consultation.fee}</p>
                        <p className="text-sm text-gray-500">{consultation.duration} minutes</p>
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
