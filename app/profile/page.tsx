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
import { cn } from "@/lib/utils"
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
    LogOut,
    Edit,
    ChevronRight,
    Gavel,
    Users as UsersIcon,
    FileSearch,
    Bookmark,
    FileSignature,
    Landmark,
    GraduationCap
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"

interface Address {
    street?: string
    city?: string
    state?: string
    country?: string
    pincode?: string
}

interface UserProfile {
    _id: string
    userId: string
    role: 'user' | 'lawyer' | 'admin'
    fullName: string
    email: string
    phone?: string
    gender?: string
    dob?: string
    profileImage?: string
    address?: Address
    createdAt: string
    barCouncilId?: string
    specialization?: string[]
    bio?: string
    experience?: number
    rating?: number
    consultationCount?: number
    clientCount?: number
}

export default function ProfilePage() {
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState("overview")
    const [isEditing, setIsEditing] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) {
                    router.push('/')
                    return
                }

                const response = await fetch('http://localhost:5000/api/v1/auth/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                if (!response.ok) {
                    throw new Error(`Failed to fetch profile: ${response.status}`)
                }

                const data: UserProfile = await response.json()
                setProfile(data)
            } catch (err) {
                let errorMessage = 'An unknown error occurred'
                if (err instanceof Error) {
                    errorMessage = err.message
                } else if (typeof err === 'string') {
                    errorMessage = err
                }
                setError(errorMessage)
                console.error('Error fetching profile:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()
    }, [router])

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString)
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        } catch {
            return 'Unknown date'
        }
    }

    const getAddressString = () => {
        if (!profile?.address) return 'Not specified'
        const { street, city, state, country, pincode } = profile.address
        return [street, city, state, country, pincode].filter(Boolean).join(', ')
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        router.push('/')
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/3 space-y-4">
                            <Skeleton className="h-64 w-full rounded-lg" />
                            <Skeleton className="h-32 w-full rounded-lg" />
                        </div>
                        <div className="md:w-2/3 space-y-4">
                            <Skeleton className="h-96 w-full rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100">
                <div className="text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">Error loading profile</h3>
                    <p className="mt-2 text-gray-600">{error}</p>
                    <Button className="mt-6" onClick={() => window.location.reload()}>
                        Try Again
                    </Button>
                </div>
            </div>
        )
    }

    if (!profile) {
        return null
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
            {/* Profile Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="relative group">
                            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                                <AvatarImage src={profile.profileImage} />
                                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-2xl font-bold">
                                    {profile.fullName.split(" ").map(n => n[0]).join("")}
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
                                <div className="text-gray-600 flex items-center gap-2 mt-1">
                                    <Badge
                                        variant={profile.role === 'lawyer' ? 'secondary' : 'default'}
                                        className={cn("gap-1", profile.role === 'lawyer' ? "bg-purple-600" : "bg-amber-500")}
                                    >
                                        {profile.role === 'lawyer' ? <Gavel className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
                                        {profile.role === 'lawyer' ? 'Verified Lawyer' : 'Premium Member'}
                                    </Badge>
                                    <span className="text-sm text-gray-500">Joined {formatDate(profile.createdAt)}</span>
                                </div>
                                <Button variant="outline" className="hidden md:flex gap-2" onClick={() => setIsEditing(true)}>
                                    <Edit className="h-4 w-4" />
                                    Edit Profile
                                </Button>
                            </div>

                            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                                {profile.role === 'user' ? (
                                    <>
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <p className="text-sm text-blue-600">Cases</p>
                                            <p className="text-2xl font-bold text-blue-900">0</p>
                                        </div>
                                        <div className="bg-purple-50 p-4 rounded-lg">
                                            <p className="text-sm text-purple-600">Consultations</p>
                                            <p className="text-2xl font-bold text-purple-900">{profile.consultationCount || 0}</p>
                                        </div>
                                        <div className="bg-green-50 p-4 rounded-lg">
                                            <p className="text-sm text-green-600">Success Rate</p>
                                            <p className="text-2xl font-bold text-green-900">-</p>
                                        </div>
                                        <div className="bg-amber-50 p-4 rounded-lg">
                                            <p className="text-sm text-amber-600">Membership</p>
                                            <p className="text-2xl font-bold text-amber-900">Basic</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <p className="text-sm text-blue-600">Clients</p>
                                            <p className="text-2xl font-bold text-blue-900">{profile.clientCount || 0}</p>
                                        </div>
                                        <div className="bg-purple-50 p-4 rounded-lg">
                                            <p className="text-sm text-purple-600">Experience</p>
                                            <p className="text-2xl font-bold text-purple-900">{profile.experience || 0} years</p>
                                        </div>
                                        <div className="bg-green-50 p-4 rounded-lg">
                                            <p className="text-sm text-green-600">Rating</p>
                                            <p className="text-2xl font-bold text-green-900">{profile.rating ? profile.rating.toFixed(1) : '0.0'}/5</p>
                                        </div>
                                        <div className="bg-amber-50 p-4 rounded-lg">
                                            <p className="text-sm text-amber-600">Consultations</p>
                                            <p className="text-2xl font-bold text-amber-900">{profile.consultationCount || 0}</p>
                                        </div>
                                    </>
                                )}
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
                        <TabsTrigger
                            value={profile.role === 'user' ? "cases" : "clients"}
                            className="flex items-center gap-2"
                        >
                            {profile.role === 'user' ? (
                                <>
                                    <FileText className="h-4 w-4" />
                                    My Cases
                                </>
                            ) : (
                                <>
                                    <UsersIcon className="h-4 w-4" />
                                    My Clients
                                </>
                            )}
                        </TabsTrigger>
                        {profile.role === 'lawyer' && (
                            <TabsTrigger value="cases" className="flex items-center gap-2">
                                <FileSearch className="h-4 w-4" />
                                Case Files
                            </TabsTrigger>
                        )}
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
                                                    <Input id="name" defaultValue={profile.fullName} />
                                                </div>
                                                <div>
                                                    <Label htmlFor="email">Email</Label>
                                                    <Input id="email" type="email" defaultValue={profile.email} disabled />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="phone">Phone</Label>
                                                    <Input id="phone" defaultValue={profile.phone || ''} />
                                                </div>
                                                <div>
                                                    <Label htmlFor="address">Address</Label>
                                                    <Input id="address" defaultValue={getAddressString()} />
                                                </div>
                                            </div>
                                            {profile.role === 'lawyer' && (
                                                <>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div>
                                                            <Label htmlFor="barCouncilId">Bar Council ID</Label>
                                                            <Input id="barCouncilId" defaultValue={profile.barCouncilId || ''} disabled />
                                                        </div>
                                                        <div>
                                                            <Label htmlFor="specialization">Specialization</Label>
                                                            <Input id="specialization" defaultValue={profile.specialization?.join(', ') || ''} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="bio">Bio</Label>
                                                        <Input id="bio" defaultValue={profile.bio || ''} />
                                                    </div>
                                                </>
                                            )}
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
                                                    <p className="font-medium">{profile.email}</p>
                                                </div>
                                            </div>
                                            <Separator />
                                            <div className="flex items-center gap-4">
                                                <Phone className="h-5 w-5 text-gray-400" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Phone</p>
                                                    <p className="font-medium">{profile.phone || 'Not specified'}</p>
                                                </div>
                                            </div>
                                            <Separator />
                                            <div className="flex items-center gap-4">
                                                <MapPin className="h-5 w-5 text-gray-400" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Address</p>
                                                    <p className="font-medium">{getAddressString()}</p>
                                                </div>
                                            </div>
                                            <Separator />
                                            {profile.role === 'lawyer' && (
                                                <>
                                                    <div className="flex items-center gap-4">
                                                        <Landmark className="h-5 w-5 text-gray-400" />
                                                        <div>
                                                            <p className="text-sm text-gray-500">Bar Council ID</p>
                                                            <p className="font-medium">{profile.barCouncilId || 'Not specified'}</p>
                                                        </div>
                                                    </div>
                                                    <Separator />
                                                    <div className="flex items-center gap-4">
                                                        <GraduationCap className="h-5 w-5 text-gray-400" />
                                                        <div>
                                                            <p className="text-sm text-gray-500">Specialization</p>
                                                            <p className="font-medium">
                                                                {profile.specialization?.join(', ') || 'Not specified'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <Separator />
                                                </>
                                            )}
                                            <div className="flex items-center gap-4">
                                                <Calendar className="h-5 w-5 text-gray-400" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Member Since</p>
                                                    <p className="font-medium">{formatDate(profile.createdAt)}</p>
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
                                    {profile.role === 'lawyer' && (
                                        <>
                                            <Button variant="ghost" className="w-full justify-between">
                                                <div className="flex items-center gap-3">
                                                    <FileSignature className="h-5 w-5 text-blue-500" />
                                                    <span>Create Consultation</span>
                                                </div>
                                                <ChevronRight className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" className="w-full justify-between">
                                                <div className="flex items-center gap-3">
                                                    <Bookmark className="h-5 w-5 text-purple-500" />
                                                    <span>Manage Availability</span>
                                                </div>
                                                <ChevronRight className="h-4 w-4" />
                                            </Button>
                                        </>
                                    )}
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
                                            <span>Notifications</span>
                                        </div>
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-between text-red-500 hover:text-red-600"
                                        onClick={handleLogout}
                                    >
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

                    {/* Other tabs would be implemented similarly */}
                </Tabs>
            </div>
        </div>
    )
}