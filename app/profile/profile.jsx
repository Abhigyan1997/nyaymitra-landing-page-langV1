"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Shield,
    FileText,
    Settings,
    Bell,
    CreditCard,
    Lock,
    HelpCircle,
    LogOut,
    Edit,
    ChevronRight,
    Star,
    Clock,
    CheckCircle,
    Briefcase,
    Award
} from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
    const [userData, setUserData] = useState({
        name: "Priya Sharma",
        email: "priya.sharma@example.com",
        phone: "+91 98765 43210",
        address: "Mumbai, Maharashtra",
        joinDate: "Joined January 2023",
        avatar: "/avatars/avatar1.jpg",
        role: "Premium Member",
        cases: 12,
        consultations: 24,
        successRate: "95%",
        membership: "Gold Tier",
        notifications: 3
    })

    const [activeTab, setActiveTab] = useState("overview")
    const [isEditing, setIsEditing] = useState(false)

    // Mock legal cases data
    const cases = [
        {
            id: 1,
            title: "Property Dispute Resolution",
            status: "Completed",
            date: "15 Mar 2024",
            lawyer: "Adv. Vikram Joshi",
            rating: 5
        },
        {
            id: 2,
            title: "Rental Agreement Review",
            status: "In Progress",
            date: "28 Apr 2024",
            lawyer: "Adv. Anita Patel",
            rating: 4
        },
        {
            id: 3,
            title: "Will Documentation",
            status: "Upcoming",
            date: "10 May 2024",
            lawyer: "Adv. Rajesh Kumar",
            rating: null
        }
    ]

    const lawyers = [
        {
            id: 1,
            name: "Adv. Vikram Joshi",
            specialization: "Property Law",
            rating: 4.9,
            cases: 42,
            avatar: "/avatars/lawyer1.jpg"
        },
        {
            id: 2,
            name: "Adv. Anita Patel",
            specialization: "Contract Law",
            rating: 4.7,
            cases: 35,
            avatar: "/avatars/lawyer2.jpg"
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
            {/* Profile Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="relative group">
                            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                                <AvatarImage src={userData.avatar} />
                                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-2xl font-bold">
                                    {userData.name.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                            </Avatar>
                            <button
                                className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition-all duration-300 opacity-0 group-hover:opacity-100"
                                onClick={() => setIsEditing(true)}
                            >
                                <Edit className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">{userData.name}</h1>
                                    <p className="text-gray-600 flex items-center gap-2 mt-1">
                                        <Badge variant="premium" className="gap-1">
                                            <Shield className="h-4 w-4" />
                                            {userData.role}
                                        </Badge>
                                        <span className="text-sm text-gray-500">{userData.joinDate}</span>
                                    </p>
                                </div>
                                <Button variant="outline" className="hidden md:flex gap-2">
                                    <Edit className="h-4 w-4" />
                                    Edit Profile
                                </Button>
                            </div>

                            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <p className="text-sm text-blue-600">Cases</p>
                                    <p className="text-2xl font-bold text-blue-900">{userData.cases}</p>
                                </div>
                                <div className="bg-purple-50 p-4 rounded-lg">
                                    <p className="text-sm text-purple-600">Consultations</p>
                                    <p className="text-2xl font-bold text-purple-900">{userData.consultations}</p>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <p className="text-sm text-green-600">Success Rate</p>
                                    <p className="text-2xl font-bold text-green-900">{userData.successRate}</p>
                                </div>
                                <div className="bg-amber-50 p-4 rounded-lg">
                                    <p className="text-sm text-amber-600">Membership</p>
                                    <p className="text-2xl font-bold text-amber-900">{userData.membership}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-white shadow-sm">
                        <TabsTrigger value="overview" className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Overview
                        </TabsTrigger>
                        <TabsTrigger value="cases" className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            My Cases
                        </TabsTrigger>
                        <TabsTrigger value="lawyers" className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4" />
                            My Lawyers
                        </TabsTrigger>
                        <TabsTrigger value="documents" className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Documents
                        </TabsTrigger>
                        <TabsTrigger value="settings" className="flex items-center gap-2">
                            <Settings className="h-4 w-4" />
                            Settings
                        </TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="mt-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Personal Info Card */}
                            <Card className="lg:col-span-2">
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span>Personal Information</span>
                                        <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
                                            <Edit className="h-4 w-4 mr-2" />
                                            {isEditing ? 'Cancel' : 'Edit'}
                                        </Button>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {isEditing ? (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="name">Full Name</Label>
                                                    <Input id="name" value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
                                                </div>
                                                <div>
                                                    <Label htmlFor="email">Email</Label>
                                                    <Input id="email" type="email" value={userData.email} disabled />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="phone">Phone</Label>
                                                    <Input id="phone" value={userData.phone} onChange={(e) => setUserData({ ...userData, phone: e.target.value })} />
                                                </div>
                                                <div>
                                                    <Label htmlFor="address">Address</Label>
                                                    <Input id="address" value={userData.address} onChange={(e) => setUserData({ ...userData, address: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="flex justify-end gap-2 pt-4">
                                                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                                                <Button>Save Changes</Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4">
                                                <Mail className="h-5 w-5 text-gray-400" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Email</p>
                                                    <p className="font-medium">{userData.email}</p>
                                                </div>
                                            </div>
                                            <Separator />
                                            <div className="flex items-center gap-4">
                                                <Phone className="h-5 w-5 text-gray-400" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Phone</p>
                                                    <p className="font-medium">{userData.phone}</p>
                                                </div>
                                            </div>
                                            <Separator />
                                            <div className="flex items-center gap-4">
                                                <MapPin className="h-5 w-5 text-gray-400" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Address</p>
                                                    <p className="font-medium">{userData.address}</p>
                                                </div>
                                            </div>
                                            <Separator />
                                            <div className="flex items-center gap-4">
                                                <Calendar className="h-5 w-5 text-gray-400" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Member Since</p>
                                                    <p className="font-medium">{userData.joinDate}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Quick Actions Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Quick Actions</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Button variant="ghost" className="w-full justify-between">
                                        <div className="flex items-center gap-3">
                                            <CreditCard className="h-5 w-5 text-blue-500" />
                                            <span>Payment Methods</span>
                                        </div>
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-between">
                                        <div className="flex items-center gap-3">
                                            <Lock className="h-5 w-5 text-purple-500" />
                                            <span>Privacy Settings</span>
                                        </div>
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-between">
                                        <div className="flex items-center gap-3">
                                            <Bell className="h-5 w-5 text-amber-500" />
                                            <div className="flex items-center gap-2">
                                                <span>Notifications</span>
                                                <Badge variant="secondary" className="px-1.5">
                                                    {userData.notifications}
                                                </Badge>
                                            </div>
                                        </div>
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-between">
                                        <div className="flex items-center gap-3">
                                            <HelpCircle className="h-5 w-5 text-green-500" />
                                            <span>Help Center</span>
                                        </div>
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-between text-red-500 hover:text-red-600">
                                        <div className="flex items-center gap-3">
                                            <LogOut className="h-5 w-5" />
                                            <span>Logout</span>
                                        </div>
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* My Cases Tab */}
                    <TabsContent value="cases" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>My Legal Cases</CardTitle>
                                <CardDescription>Track the progress of your ongoing and completed legal matters</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {cases.map((caseItem) => (
                                        <div key={caseItem.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                                <div>
                                                    <h3 className="font-medium text-lg">{caseItem.title}</h3>
                                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="h-4 w-4" />
                                                            {caseItem.date}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <User className="h-4 w-4" />
                                                            {caseItem.lawyer}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col md:items-end gap-2">
                                                    <Badge
                                                        variant={
                                                            caseItem.status === "Completed" ? "success" :
                                                                caseItem.status === "In Progress" ? "warning" : "default"
                                                        }
                                                    >
                                                        {caseItem.status}
                                                    </Badge>
                                                    {caseItem.rating && (
                                                        <div className="flex items-center gap-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`h-4 w-4 ${i < caseItem.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                                                />
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* My Lawyers Tab */}
                    <TabsContent value="lawyers" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>My Lawyers</CardTitle>
                                <CardDescription>Your trusted legal professionals</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {lawyers.map((lawyer) => (
                                        <div key={lawyer.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
                                            <div className="flex items-start gap-4">
                                                <Avatar className="h-16 w-16 border-2 border-white shadow-md">
                                                    <AvatarImage src={lawyer.avatar} />
                                                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
                                                        {lawyer.name.split(" ").map(n => n[0]).join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-lg">{lawyer.name}</h3>
                                                    <p className="text-sm text-gray-600">{lawyer.specialization}</p>
                                                    <div className="flex items-center gap-4 mt-3">
                                                        <div className="flex items-center gap-1">
                                                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                                            <span className="font-medium">{lawyer.rating}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <FileText className="h-4 w-4 text-blue-500" />
                                                            <span className="text-sm text-gray-600">{lawyer.cases} cases</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-3 mt-6">
                                                <Button variant="outline" size="sm" className="flex-1">
                                                    <Phone className="h-4 w-4 mr-2" />
                                                    Call
                                                </Button>
                                                <Button size="sm" className="flex-1">
                                                    <MessageSquare className="h-4 w-4 mr-2" />
                                                    Message
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Documents Tab */}
                    <TabsContent value="documents" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>My Documents</CardTitle>
                                <CardDescription>Access your legal documents and contracts</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="border rounded-lg p-6 text-center">
                                    <FileText className="h-12 w-12 mx-auto text-gray-400" />
                                    <h3 className="mt-4 text-lg font-medium text-gray-900">No documents yet</h3>
                                    <p className="mt-2 text-gray-500">Upload your legal documents to access them anytime</p>
                                    <Button className="mt-6">Upload Document</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Settings Tab */}
                    <TabsContent value="settings" className="mt-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <Card className="lg:col-span-2">
                                <CardHeader>
                                    <CardTitle>Account Settings</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        <div>
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" type="email" value={userData.email} disabled />
                                            <p className="text-sm text-gray-500 mt-1">Contact support to change your email</p>
                                        </div>
                                        <div>
                                            <Label htmlFor="password">Password</Label>
                                            <Input id="password" type="password" placeholder="••••••••" />
                                        </div>
                                        <div>
                                            <Label htmlFor="notifications">Notifications</Label>
                                            <div className="mt-2 space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <input type="checkbox" id="case-updates" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                                    <label htmlFor="case-updates" className="text-sm font-medium text-gray-700">Case updates</label>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <input type="checkbox" id="promotions" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                                    <label htmlFor="promotions" className="text-sm font-medium text-gray-700">Promotions and offers</label>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <input type="checkbox" id="newsletter" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                                    <label htmlFor="newsletter" className="text-sm font-medium text-gray-700">Newsletter</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pt-4">
                                            <Button>Save Changes</Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Danger Zone</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="border border-red-100 bg-red-50 rounded-lg p-4">
                                        <h4 className="font-medium text-red-800">Delete Account</h4>
                                        <p className="text-sm text-red-600 mt-1">This will permanently delete your account and all associated data.</p>
                                        <Button variant="destructive" size="sm" className="mt-3">
                                            Delete Account
                                        </Button>
                                    </div>
                                    <div className="border border-amber-100 bg-amber-50 rounded-lg p-4">
                                        <h4 className="font-medium text-amber-800">Export Data</h4>
                                        <p className="text-sm text-amber-600 mt-1">Download a copy of your personal data.</p>
                                        <Button variant="outline" size="sm" className="mt-3 border-amber-300 text-amber-700 hover:bg-amber-100">
                                            Export Data
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}