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
import axios from "axios"
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
    Gavel,
    Users as UsersIcon,
    FileSearch,
    Bookmark,
    FileSignature,
    Landmark,
    GraduationCap,
    Globe,
    Linkedin,
    Briefcase,
    Languages,
    Award,
    Clock,
    Banknote,
    BookOpen,
    Home,
    BriefcaseBusiness,
    Scale,
    FileLock,
    FileKey,
    ChevronRight
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface Address {
    street?: string
    city?: string
    state?: string
    country?: string
    pincode?: string
}

interface BankDetails {
    accountHolder?: string
    accountNumber?: string
    ifsc?: string
    upiId?: string
}

interface ConsultationMode {
    video?: boolean
    call?: boolean
    chat?: boolean
    inPerson?: boolean
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
    updatedAt: string

    // Common fields
    language?: string
    emergencyContact?: {
        name?: string
        phone?: string
        relation?: string
    }
    accountStatus?: 'active' | 'blocked' | 'deleted'
    profileCompletedPercentage?: number

    // Lawyer-specific fields
    barCouncilId?: string
    specialization?: string[]
    yearsPracticing?: number
    experience?: string
    consultationFee?: number
    languagesSpoken?: string[]
    linkedinUrl?: string
    website?: string
    lawFirm?: string
    licenseIssuedDate?: string
    licenseExpiryDate?: string
    verifiedByPlatform?: boolean
    consultationModes?: ConsultationMode
    averageRating?: number
    consultationCount?: number
    bankDetails?: BankDetails
    panNumber?: string
    bio?: string
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

                const response = await axios.get(
                    'https://nyaymitra-backend.onrender.com/api/v1/auth/profile',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        withCredentials: true,
                    }
                )

                setProfile(response.data)
            } catch (err: any) {
                let errorMessage = 'An unknown error occurred'
                if (err?.response?.data?.message) {
                    errorMessage = err.response.data.message
                } else if (err instanceof Error) {
                    errorMessage = err.message
                }

                setError(errorMessage)
                console.error('Error fetching profile:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()
    }, [router])

    const handleSaveChanges = async () => {
        const token = localStorage.getItem("token");
        if (!token || !profile) return;

        const getInputValue = (id: string) => {
            const element = document.getElementById(id) as HTMLInputElement;
            return element?.value;
        };

        const getNumberValue = (id: string) => {
            const value = getInputValue(id);
            return value ? Number(value) : undefined;
        };

        const getBooleanValue = (id: string) => {
            const element = document.getElementById(id) as HTMLInputElement;
            return element?.checked;
        };

        const updatedData: any = {
            fullName: getInputValue("name"),
            phone: getInputValue("phone"),
            gender: getInputValue("gender"),
            dob: getInputValue("dob"),
            address: {
                street: getInputValue("street"),
                city: getInputValue("city"),
                state: getInputValue("state"),
                country: getInputValue("country"),
                pincode: getInputValue("pincode"),
            },
            emergencyContact: {
                name: getInputValue("emergencyContactName"),
                phone: getInputValue("emergencyContactPhone"),
                relation: getInputValue("emergencyContactRelation"),
            },
        };

        if (profile.role === 'lawyer') {
            updatedData.barCouncilId = getInputValue("barCouncilId");
            updatedData.specialization = getInputValue("specialization")?.split(',').map((s: string) => s.trim());
            updatedData.yearsPracticing = getNumberValue("yearsPracticing");
            updatedData.experience = getInputValue("experience");
            updatedData.consultationFee = getNumberValue("consultationFee");
            updatedData.languagesSpoken = getInputValue("languagesSpoken")?.split(',').map((s: string) => s.trim());
            updatedData.linkedinUrl = getInputValue("linkedinUrl");
            updatedData.website = getInputValue("website");
            updatedData.lawFirm = getInputValue("lawFirm");
            updatedData.licenseIssuedDate = getInputValue("licenseIssuedDate");
            updatedData.licenseExpiryDate = getInputValue("licenseExpiryDate");
            updatedData.panNumber = getInputValue("panNumber");
            updatedData.bio = getInputValue("bio");

            updatedData.consultationModes = {
                video: getBooleanValue("consultationModeVideo"),
                call: getBooleanValue("consultationModeCall"),
                chat: getBooleanValue("consultationModeChat"),
                inPerson: getBooleanValue("consultationModeInPerson"),
            };

            updatedData.bankDetails = {
                accountHolder: getInputValue("bankAccountHolder"),
                accountNumber: getInputValue("bankAccountNumber"),
                ifsc: getInputValue("bankIFSC"),
                upiId: getInputValue("upiId"),
            };
        }

        try {
            const endpoint = profile.role === 'lawyer'
                ? "https://nyaymitra-backend.onrender.com/api/v1/auth/edit_lawyer"
                : "https://nyaymitra-backend.onrender.com/api/v1/auth/edit_user";

            const response = await axios.put(
                endpoint,
                updatedData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                }
            );

            setProfile(response.data?.user || profile);
            setIsEditing(false);
        } catch (error: any) {
            console.error("Error updating profile:", error);
            alert(error?.response?.data?.message || "Failed to update profile");
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'Not specified';
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

    const renderUserProfile = () => (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{profile.fullName}</p>
                </div>
            </div>
            <Separator />
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
                <User className="h-5 w-5 text-gray-400" />
                <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium">{profile.gender || 'Not specified'}</p>
                </div>
            </div>
            <Separator />
            <div className="flex items-center gap-4">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium">{formatDate(profile.dob)}</p>
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
            <div className="flex items-center gap-4">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium">{formatDate(profile.createdAt)}</p>
                </div>
            </div>
        </div>
    );

    const renderLawyerProfile = () => (
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
            <div className="flex items-center gap-4">
                <Briefcase className="h-5 w-5 text-gray-400" />
                <div>
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="font-medium">
                        {profile.experience || 'Not specified'}
                    </p>
                </div>
            </div>
            <Separator />
            <div className="flex items-center gap-4">
                <Award className="h-5 w-5 text-gray-400" />
                <div>
                    <p className="text-sm text-gray-500">Consultation Fee</p>
                    <p className="font-medium">
                        ₹{profile.consultationFee || 0}
                    </p>
                </div>
            </div>
            <Separator />
            <div className="flex items-center gap-4">
                <Languages className="h-5 w-5 text-gray-400" />
                <div>
                    <p className="text-sm text-gray-500">Languages Spoken</p>
                    <p className="font-medium">
                        {profile.languagesSpoken?.join(', ') || 'Not specified'}
                    </p>
                </div>
            </div>
            {profile.bio && (
                <>
                    <Separator />
                    <div className="flex items-start gap-4">
                        <FileText className="h-5 w-5 text-gray-400 mt-1" />
                        <div>
                            <p className="text-sm text-gray-500">Professional Bio</p>
                            <p className="font-medium whitespace-pre-line">{profile.bio}</p>
                        </div>
                    </div>
                </>
            )}
            <Separator />
            <div className="flex items-center gap-4">
                <BriefcaseBusiness className="h-5 w-5 text-gray-400" />
                <div>
                    <p className="text-sm text-gray-500">Law Firm</p>
                    <p className="font-medium">{profile.lawFirm || 'Not specified'}</p>
                </div>
            </div>
            <Separator />
            <div className="flex items-center gap-4">
                <FileLock className="h-5 w-5 text-gray-400" />
                <div>
                    <p className="text-sm text-gray-500">License Issued Date</p>
                    <p className="font-medium">{formatDate(profile.licenseIssuedDate)}</p>
                </div>
            </div>
            <Separator />
            <div className="flex items-center gap-4">
                <FileLock className="h-5 w-5 text-gray-400" />
                <div>
                    <p className="text-sm text-gray-500">License Expiry Date</p>
                    <p className="font-medium">{formatDate(profile.licenseExpiryDate)}</p>
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
            {(profile.linkedinUrl || profile.website) && (
                <>
                    <Separator />
                    <div className="flex items-center gap-4">
                        <Linkedin className="h-5 w-5 text-gray-400" />
                        <div>
                            <p className="text-sm text-gray-500">LinkedIn</p>
                            <p className="font-medium">
                                {profile.linkedinUrl ? (
                                    <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                        {profile.linkedinUrl}
                                    </a>
                                ) : 'Not specified'}
                            </p>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-4">
                        <Globe className="h-5 w-5 text-gray-400" />
                        <div>
                            <p className="text-sm text-gray-500">Website</p>
                            <p className="font-medium">
                                {profile.website ? (
                                    <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                        {profile.website}
                                    </a>
                                ) : 'Not specified'}
                            </p>
                        </div>
                    </div>
                </>
            )}
            <Separator />
            <div className="flex items-center gap-4">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium">{formatDate(profile.createdAt)}</p>
                </div>
            </div>
        </div>
    );

    const renderUserEditForm = () => (
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
                    <Label htmlFor="gender">Gender</Label>
                    <Select defaultValue={profile.gender || ''}>
                        <SelectTrigger id="gender">
                            <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" defaultValue={profile.dob || ''} />
            </div>
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <Label htmlFor="street">Street Address</Label>
                    <Input id="street" defaultValue={profile.address?.street || ''} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" defaultValue={profile.address?.city || ''} />
                </div>
                <div>
                    <Label htmlFor="state">State</Label>
                    <Input id="state" defaultValue={profile.address?.state || ''} />
                </div>
                <div>
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" defaultValue={profile.address?.country || ''} />
                </div>
                <div>
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input id="pincode" defaultValue={profile.address?.pincode || ''} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                    <Input id="emergencyContactName" defaultValue={profile.emergencyContact?.name || ''} />
                </div>
                <div>
                    <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
                    <Input id="emergencyContactPhone" defaultValue={profile.emergencyContact?.phone || ''} />
                </div>
                <div>
                    <Label htmlFor="emergencyContactRelation">Relation</Label>
                    <Input id="emergencyContactRelation" defaultValue={profile.emergencyContact?.relation || ''} />
                </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button onClick={handleSaveChanges}>Save Changes</Button>
            </div>
        </div>
    );

    const renderLawyerEditForm = () => (
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
                    <Label htmlFor="barCouncilId">Bar Council ID</Label>
                    <Input id="barCouncilId" defaultValue={profile.barCouncilId || ''} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="panNumber">PAN Number</Label>
                    <Input id="panNumber" defaultValue={profile.panNumber || ''} />
                </div>
                <div>
                    <Label htmlFor="yearsPracticing">Years Practicing</Label>
                    <Input
                        id="yearsPracticing"
                        type="number"
                        defaultValue={profile.yearsPracticing || 0}
                        min="0"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="consultationFee">Consultation Fee (₹)</Label>
                    <Input
                        id="consultationFee"
                        type="number"
                        defaultValue={profile.consultationFee || 0}
                        min="0"
                    />
                </div>
                <div>
                    <Label htmlFor="lawFirm">Law Firm</Label>
                    <Input
                        id="lawFirm"
                        defaultValue={profile.lawFirm || ''}
                    />
                </div>
            </div>
            <div>
                <Label htmlFor="specialization">Specialization (comma separated)</Label>
                <Input
                    id="specialization"
                    defaultValue={profile.specialization?.join(', ') || ''}
                    placeholder="e.g. Criminal Law, Corporate Law"
                />
            </div>
            <div>
                <Label htmlFor="languagesSpoken">Languages Spoken (comma separated)</Label>
                <Input
                    id="languagesSpoken"
                    defaultValue={profile.languagesSpoken?.join(', ') || ''}
                    placeholder="e.g. English, Hindi"
                />
            </div>
            <div>
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea
                    id="bio"
                    defaultValue={profile.bio || ''}
                    rows={4}
                    placeholder="Tell clients about your expertise..."
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="licenseIssuedDate">License Issued Date</Label>
                    <Input
                        id="licenseIssuedDate"
                        type="date"
                        defaultValue={profile.licenseIssuedDate || ''}
                    />
                </div>
                <div>
                    <Label htmlFor="licenseExpiryDate">License Expiry Date</Label>
                    <Input
                        id="licenseExpiryDate"
                        type="date"
                        defaultValue={profile.licenseExpiryDate || ''}
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="linkedinUrl">LinkedIn Profile URL</Label>
                    <Input
                        id="linkedinUrl"
                        defaultValue={profile.linkedinUrl || ''}
                        placeholder="https://linkedin.com/in/yourprofile"
                    />
                </div>
                <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                        id="website"
                        defaultValue={profile.website || ''}
                        placeholder="https://yourwebsite.com"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <Label>Consultation Modes</Label>
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="consultationModeVideo"
                            defaultChecked={profile.consultationModes?.video || false}
                        />
                        <Label htmlFor="consultationModeVideo">Video</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="consultationModeCall"
                            defaultChecked={profile.consultationModes?.call || false}
                        />
                        <Label htmlFor="consultationModeCall">Call</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="consultationModeChat"
                            defaultChecked={profile.consultationModes?.chat || false}
                        />
                        <Label htmlFor="consultationModeChat">Chat</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="consultationModeInPerson"
                            defaultChecked={profile.consultationModes?.inPerson || false}
                        />
                        <Label htmlFor="consultationModeInPerson">In Person</Label>
                    </div>
                </div>
            </div>
            <div className="space-y-2">
                <Label className="block">Bank Details</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="bankAccountHolder">Account Holder Name</Label>
                        <Input
                            id="bankAccountHolder"
                            defaultValue={profile.bankDetails?.accountHolder || ''}
                        />
                    </div>
                    <div>
                        <Label htmlFor="bankAccountNumber">Account Number</Label>
                        <Input
                            id="bankAccountNumber"
                            defaultValue={profile.bankDetails?.accountNumber || ''}
                        />
                    </div>
                    <div>
                        <Label htmlFor="bankIFSC">IFSC Code</Label>
                        <Input
                            id="bankIFSC"
                            defaultValue={profile.bankDetails?.ifsc || ''}
                        />
                    </div>
                    <div>
                        <Label htmlFor="upiId">UPI ID</Label>
                        <Input
                            id="upiId"
                            defaultValue={profile.bankDetails?.upiId || ''}
                            placeholder="yourname@upi"
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button onClick={handleSaveChanges}>Save Changes</Button>
            </div>
        </div>
    );

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
                                            <p className="text-sm text-green-600">Profile Completion</p>
                                            <p className="text-2xl font-bold text-green-900">{profile.profileCompletedPercentage || 0}%</p>
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
                                            <p className="text-2xl font-bold text-blue-900">{profile.consultationCount || 0}</p>
                                        </div>
                                        <div className="bg-purple-50 p-4 rounded-lg">
                                            <p className="text-sm text-purple-600">Experience</p>
                                            <p className="text-2xl font-bold text-purple-900">{profile.experience || 0} years</p>
                                        </div>
                                        <div className="bg-green-50 p-4 rounded-lg">
                                            <p className="text-sm text-green-600">Rating</p>
                                            <p className="text-2xl font-bold text-green-900">{profile.averageRating ? profile.averageRating.toFixed(1) : '0.0'}/5</p>
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
                                        <span>{profile.role === 'lawyer' ? 'Professional' : 'Personal'} Information</span>
                                        <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
                                            <Edit className="h-4 w-4 mr-2" />
                                            {isEditing ? 'Cancel' : 'Edit'}
                                        </Button>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {isEditing ? (
                                        profile.role === 'lawyer' ? renderLawyerEditForm() : renderUserEditForm()
                                    ) : (
                                        profile.role === 'lawyer' ? renderLawyerProfile() : renderUserProfile()
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
                                            <Button
                                                variant="ghost"
                                                className="w-full justify-between"
                                                onClick={() => window.location.href = "https://nyay-dashboard.netlify.app/"}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <FileSignature className="h-5 w-5 text-blue-500" />
                                                    <span>Dashboard</span>
                                                </div>
                                                <ChevronRight className="h-4 w-4" />
                                            </Button>

                                        </>
                                    )}
                                    {/* <Button variant="ghost" className="w-full justify-between">
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
                                    </Button> */}
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
                </Tabs>
            </div>
        </div>
    )
}