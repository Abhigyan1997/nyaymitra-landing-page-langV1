"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import axios from "axios"
import { cn } from "@/lib/utils"
import {
    User, Mail, Phone, MapPin, Calendar, Shield, FileText, Settings,
    Bell, CreditCard, Lock, LogOut, Edit, Gavel, Users as UsersIcon,
    FileSearch, Bookmark, FileSignature, Landmark, GraduationCap, Globe,
    Linkedin, Briefcase, Languages, Award, Clock, Banknote, BookOpen,
    Home, BriefcaseBusiness, Scale, FileLock, FileKey, ChevronRight,
    Star, TrendingUp, CheckCircle2, AlertCircle, Zap, BarChart3
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

/* ─────────────────────────── Types ─────────────────────────── */
interface Address { street?: string; city?: string; state?: string; country?: string; pincode?: string }
interface BankDetails { accountHolder?: string; accountNumber?: string; ifsc?: string; upiId?: string }
interface ConsultationMode { video?: boolean; call?: boolean; chat?: boolean; inPerson?: boolean }
interface UserProfile {
    _id: string; userId: string; role: 'user' | 'lawyer' | 'admin'
    fullName: string; email: string; phone?: string; gender?: string; dob?: string
    profilePhoto?: string; avatar?: string; address?: Address
    createdAt: string; updatedAt: string; language?: string
    emergencyContact?: { name?: string; phone?: string; relation?: string }
    accountStatus?: 'active' | 'blocked' | 'deleted'
    profileCompletedPercentage?: number
    barCouncilId?: string; specialization?: string[]; yearsPracticing?: number
    experience?: string; consultationFee?: number; languagesSpoken?: string[]
    linkedinUrl?: string; website?: string; lawFirm?: string
    licenseIssuedDate?: string; licenseExpiryDate?: string; verifiedByPlatform?: boolean
    consultationModes?: ConsultationMode; averageRating?: number
    consultationCount?: number; bankDetails?: BankDetails; panNumber?: string; bio?: string
}

/* ─────────────────────────── Inline styles ─────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --ink:       #0d1117;
    --ink-mute:  #6b7280;
    --gold:      #c9a84c;
    --gold-lt:   #f0d98a;
    --gold-bg:   #fffbf0;
    --surface:   #ffffff;
    --border:    #e8e3da;
    --success:   #059669;
    --danger:    #dc2626;
  }

  .profile-root { font-family: 'DM Sans', sans-serif; background: #f7f4ef; min-height: 100vh; }

  /* ── Hero banner ── */
  .hero-banner {
    background: linear-gradient(135deg, #0d1117 0%, #1a2333 60%, #0d1117 100%);
    position: relative; overflow: hidden;
  }
  .hero-banner::before {
    content: ''; position: absolute; inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a84c' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 1;
  }
  .hero-banner::after {
    content: ''; position: absolute; bottom: -1px; left: 0; right: 0; height: 48px;
    background: #f7f4ef; clip-path: ellipse(55% 100% at 50% 100%);
  }

  /* ── Avatar ring ── */
  .avatar-ring {
    padding: 3px;
    background: linear-gradient(135deg, #c9a84c, #f0d98a, #c9a84c);
    border-radius: 9999px;
    display: inline-block;
  }

  /* ── Stat card ── */
  .stat-card {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(201,168,76,0.2);
    border-radius: 12px;
    padding: 16px 20px;
    transition: all .2s ease;
    cursor: default;
  }
  .stat-card:hover {
    background: rgba(201,168,76,0.08);
    border-color: rgba(201,168,76,0.4);
    transform: translateY(-2px);
  }
  .stat-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: rgba(201,168,76,0.7); font-weight: 500; }
  .stat-value { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 600; color: #ffffff; line-height: 1.2; margin-top: 4px; }

  /* ── Tabs ── */
  .premium-tabs [role="tablist"] {
    background: #ffffff;
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 4px;
    gap: 2px;
    height: auto;
  }
  .premium-tabs [role="tab"] {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 500;
    letter-spacing: .01em;
    border-radius: 8px; padding: 8px 16px;
    color: var(--ink-mute);
    transition: all .2s ease;
  }
  .premium-tabs [role="tab"][data-state="active"] {
    background: linear-gradient(135deg, #0d1117, #1a2333);
    color: #f0d98a;
    box-shadow: 0 2px 8px rgba(13,17,23,.15);
  }

  /* ── Info row ── */
  .info-row {
    display: flex; align-items: flex-start; gap: 14px;
    padding: 14px 0; border-bottom: 1px solid var(--border);
    transition: background .15s;
  }
  .info-row:last-child { border-bottom: none; }
  .info-row:hover { background: #fdfcf8; margin: 0 -20px; padding-left: 20px; padding-right: 20px; border-radius: 8px; }
  .info-icon { width: 36px; height: 36px; border-radius: 8px; background: #f7f4ef; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .info-label { font-size: 11px; letter-spacing: .06em; text-transform: uppercase; color: var(--ink-mute); font-weight: 600; margin-bottom: 3px; }
  .info-value { font-size: 14px; font-weight: 500; color: var(--ink); }

  /* ── Quick action button ── */
  .quick-btn {
    width: 100%; display: flex; align-items: center; justify-content: space-between;
    padding: 12px 16px; border-radius: 10px; cursor: pointer;
    border: 1px solid transparent;
    transition: all .18s ease; background: transparent;
    font-family: 'DM Sans', sans-serif;
  }
  .quick-btn:hover { background: var(--gold-bg); border-color: var(--border); }
  .quick-btn-icon { width: 34px; height: 34px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
  .quick-btn-label { font-size: 13.5px; font-weight: 500; color: var(--ink); }

  /* ── Section title ── */
  .section-title { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 600; color: var(--ink); }

  /* ── Gold badge ── */
  .gold-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: linear-gradient(135deg, #c9a84c22, #f0d98a22);
    border: 1px solid #c9a84c55;
    color: #9a7429;
    font-size: 11.5px; font-weight: 600; letter-spacing: .04em;
    padding: 4px 10px; border-radius: 20px;
  }

  /* ── Edit form inputs ── */
  .edit-section-head {
    font-size: 11px; letter-spacing: .08em; text-transform: uppercase;
    color: var(--ink-mute); font-weight: 600;
    padding: 12px 0 8px; border-bottom: 1px solid var(--border); margin-bottom: 14px;
  }

  /* ── Completion ring ── */
  .ring-wrap { position: relative; display: inline-flex; align-items: center; justify-content: center; }

  /* ── Empty state ── */
  .empty-state { text-align: center; padding: 48px 24px; color: var(--ink-mute); }
  .empty-icon { width: 56px; height: 56px; background: var(--gold-bg); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }

  /* ── Card polish ── */
  .premium-card { background: #fff; border: 1px solid var(--border); border-radius: 16px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,.04), 0 4px 16px rgba(0,0,0,.03); }
`

/* ─────────────────────────── Component ─────────────────────────── */
export default function ProfilePage() {
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) { router.push('/'); return }
                const response = await axios.get(
                    'https://nyaymitra-backend-production.up.railway.app/api/v1/auth/profile',
                    { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
                )
                setProfile(response.data)
            } catch (err: any) {
                setError(err?.response?.data?.message || err?.message || 'Unknown error')
            } finally {
                setLoading(false)
            }
        }
        fetchProfile()
    }, [router])

    const handleSaveChanges = async () => {
        const token = localStorage.getItem("token")
        if (!token || !profile) return
        const g = (id: string) => (document.getElementById(id) as HTMLInputElement)?.value
        const gn = (id: string) => { const v = g(id); return v ? Number(v) : undefined }
        const gb = (id: string) => (document.getElementById(id) as HTMLInputElement)?.checked

        const updatedData: any = {
            fullName: g("name"), phone: g("phone"), gender: g("gender"), dob: g("dob"),
            address: { street: g("street"), city: g("city"), state: g("state"), country: g("country"), pincode: g("pincode") },
            emergencyContact: { name: g("emergencyContactName"), phone: g("emergencyContactPhone"), relation: g("emergencyContactRelation") },
        }

        if (profile.role === 'lawyer') {
            Object.assign(updatedData, {
                barCouncilId: g("barCouncilId"),
                specialization: g("specialization")?.split(',').map((s: string) => s.trim()),
                yearsPracticing: gn("yearsPracticing"), experience: g("experience"),
                consultationFee: gn("consultationFee"), languagesSpoken: g("languagesSpoken")?.split(',').map((s: string) => s.trim()),
                linkedinUrl: g("linkedinUrl"), website: g("website"), lawFirm: g("lawFirm"),
                licenseIssuedDate: g("licenseIssuedDate"), licenseExpiryDate: g("licenseExpiryDate"),
                panNumber: g("panNumber"), bio: g("bio"),
                consultationModes: { video: gb("consultationModeVideo"), call: gb("consultationModeCall"), chat: gb("consultationModeChat"), inPerson: gb("consultationModeInPerson") },
                bankDetails: { accountHolder: g("bankAccountHolder"), accountNumber: g("bankAccountNumber"), ifsc: g("bankIFSC"), upiId: g("upiId") },
            })
        }

        try {
            const endpoint = profile.role === 'lawyer'
                ? "https://nyaymitra-backend-production.up.railway.app/api/v1/auth/edit_lawyer"
                : "https://nyaymitra-backend-production.up.railway.app/api/v1/auth/edit_user"
            const response = await axios.put(endpoint, updatedData, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true })
            setProfile(response.data?.user || profile)
            setIsEditing(false)
        } catch (error: any) {
            alert(error?.response?.data?.message || "Failed to update profile")
        }
    }

    const formatDate = (dateString?: string) => {
        if (!dateString) return '—'
        try { return new Date(dateString).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) }
        catch { return '—' }
    }

    const getAddressString = () => {
        if (!profile?.address) return '—'
        const { street, city, state, country, pincode } = profile.address
        return [street, city, state, country, pincode].filter(Boolean).join(', ') || '—'
    }

    const handleLogout = () => { localStorage.removeItem('token'); router.push('/') }

    const initials = (name: string) => name.split(" ").map(n => n[0]).join("").toUpperCase()
    const completion = profile?.profileCompletedPercentage || 0

    /* ── Loading ── */
    if (loading) return (
        <div className="profile-root flex items-center justify-center min-h-screen">
            <style>{styles}</style>
            <div className="space-y-3 w-full max-w-3xl px-6">
                <Skeleton className="h-48 w-full rounded-2xl" />
                <div className="flex gap-4"><Skeleton className="h-32 flex-1 rounded-2xl" /><Skeleton className="h-32 flex-1 rounded-2xl" /></div>
                <Skeleton className="h-64 w-full rounded-2xl" />
            </div>
        </div>
    )

    /* ── Error ── */
    if (error) return (
        <div className="profile-root flex items-center justify-center min-h-screen">
            <style>{styles}</style>
            <div className="premium-card p-12 text-center max-w-sm mx-auto">
                <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-7 h-7 text-red-500" />
                </div>
                <h3 className="section-title mb-2">Something went wrong</h3>
                <p className="text-sm text-gray-500 mb-6">{error}</p>
                <Button onClick={() => window.location.reload()} className="bg-[#0d1117] text-[#f0d98a] hover:bg-[#1a2333]">Try Again</Button>
            </div>
        </div>
    )

    if (!profile) return null

    /* ── Info Row helper ── */
    const InfoRow = ({ icon: Icon, label, value, href }: { icon: any; label: string; value: string; href?: string }) => (
        <div className="info-row">
            <div className="info-icon"><Icon className="w-4 h-4 text-[#c9a84c]" /></div>
            <div>
                <div className="info-label">{label}</div>
                <div className="info-value">
                    {href ? <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{value}</a> : value}
                </div>
            </div>
        </div>
    )

    /* ── Overview content ── */
    const OverviewContent = () => (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Main info card */}
            <div className="lg:col-span-2 premium-card">
                <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#e8e3da]">
                    <h2 className="section-title">{profile.role === 'lawyer' ? 'Professional' : 'Personal'} Details</h2>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={cn(
                            "flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all",
                            isEditing
                                ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                : "bg-[#0d1117] text-[#f0d98a] hover:bg-[#1a2333]"
                        )}
                    >
                        <Edit className="w-3.5 h-3.5" />
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                </div>
                <div className="px-6 py-5">
                    {isEditing ? (
                        profile.role === 'lawyer' ? <LawyerEditForm /> : <UserEditForm />
                    ) : (
                        profile.role === 'lawyer' ? <LawyerProfileView /> : <UserProfileView />
                    )}
                </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
                {/* Completion */}
                {profile.role === 'user' && (
                    <div className="premium-card p-5">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold uppercase tracking-widest text-[#6b7280]">Profile Strength</span>
                            <span className="text-sm font-bold text-[#0d1117]">{completion}%</span>
                        </div>
                        <div className="h-2 bg-[#f0ebe0] rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{ width: `${completion}%`, background: 'linear-gradient(90deg, #c9a84c, #f0d98a)' }}
                            />
                        </div>
                        {completion < 100 && (
                            <p className="text-xs text-[#6b7280] mt-2">Complete your profile to unlock all features</p>
                        )}
                    </div>
                )}

                {/* Quick actions */}
                <div className="premium-card p-4">
                    <div className="text-xs font-semibold uppercase tracking-widest text-[#6b7280] px-2 pb-3">Quick Actions</div>
                    <div className="space-y-1">
                        {profile.role === 'lawyer' && (
                            <button
                                className="quick-btn"
                                onClick={() => window.location.href = "https://nyay-dashboard.netlify.app/"}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="quick-btn-icon bg-blue-50"><BarChart3 className="w-4 h-4 text-blue-600" /></div>
                                    <span className="quick-btn-label">Lawyer Dashboard</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-[#6b7280]" />
                            </button>
                        )}
                        <button className="quick-btn">
                            <div className="flex items-center gap-3">
                                <div className="quick-btn-icon bg-purple-50"><Bell className="w-4 h-4 text-purple-600" /></div>
                                <span className="quick-btn-label">Notifications</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-[#6b7280]" />
                        </button>
                        <button className="quick-btn">
                            <div className="flex items-center gap-3">
                                <div className="quick-btn-icon bg-green-50"><Settings className="w-4 h-4 text-green-600" /></div>
                                <span className="quick-btn-label">Account Settings</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-[#6b7280]" />
                        </button>
                        <div className="my-2 border-t border-[#e8e3da]" />
                        <button
                            className="quick-btn group"
                            onClick={handleLogout}
                        >
                            <div className="flex items-center gap-3">
                                <div className="quick-btn-icon bg-red-50"><LogOut className="w-4 h-4 text-red-500" /></div>
                                <span className="quick-btn-label text-red-500">Sign Out</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-red-400" />
                        </button>
                    </div>
                </div>

                {/* Membership */}
                <div style={{ background: 'linear-gradient(135deg, #0d1117 0%, #1a2333 100%)', borderRadius: 16, padding: 20 }}>
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(201,168,76,.7)' }}>Membership</div>
                            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600, color: '#f0d98a', marginTop: 4 }}>
                                {profile.role === 'lawyer' ? 'Professional' : 'Basic Plan'}
                            </div>
                        </div>
                        {profile.role === 'lawyer' ? <Gavel className="w-5 h-5" style={{ color: '#c9a84c' }} /> : <Shield className="w-5 h-5" style={{ color: '#c9a84c' }} />}
                    </div>
                    <div className="text-xs" style={{ color: 'rgba(255,255,255,.5)', lineHeight: 1.6 }}>
                        Member since {formatDate(profile.createdAt)}
                    </div>
                    {profile.verifiedByPlatform && (
                        <div className="flex items-center gap-1.5 mt-3 text-xs" style={{ color: '#c9a84c' }}>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Platform Verified
                        </div>
                    )}
                </div>
            </div>
        </div>
    )

    /* ── Profile views ── */
    const UserProfileView = () => (
        <div>
            <InfoRow icon={User} label="Full Name" value={profile.fullName} />
            <InfoRow icon={Mail} label="Email Address" value={profile.email} />
            <InfoRow icon={Phone} label="Phone" value={profile.phone || '—'} />
            <InfoRow icon={User} label="Gender" value={profile.gender ? profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1) : '—'} />
            <InfoRow icon={Calendar} label="Date of Birth" value={formatDate(profile.dob)} />
            <InfoRow icon={MapPin} label="Address" value={getAddressString()} />
            {profile.emergencyContact?.name && (
                <InfoRow icon={Phone} label="Emergency Contact" value={`${profile.emergencyContact.name} (${profile.emergencyContact.relation || 'N/A'}) · ${profile.emergencyContact.phone || '—'}`} />
            )}
        </div>
    )

    const LawyerProfileView = () => (
        <div>
            <InfoRow icon={Mail} label="Email" value={profile.email} />
            <InfoRow icon={Phone} label="Phone" value={profile.phone || '—'} />
            <InfoRow icon={Landmark} label="Bar Council ID" value={profile.barCouncilId || '—'} />
            <InfoRow icon={GraduationCap} label="Specialization" value={profile.specialization?.join(', ') || '—'} />
            <InfoRow icon={Briefcase} label="Experience" value={profile.experience || '—'} />
            <InfoRow icon={Award} label="Consultation Fee" value={profile.consultationFee ? `₹${profile.consultationFee.toLocaleString()}` : '—'} />
            <InfoRow icon={Languages} label="Languages" value={profile.languagesSpoken?.join(', ') || '—'} />
            <InfoRow icon={BriefcaseBusiness} label="Law Firm" value={profile.lawFirm || '—'} />
            <InfoRow icon={FileLock} label="License Issued" value={formatDate(profile.licenseIssuedDate)} />
            <InfoRow icon={FileLock} label="License Expiry" value={formatDate(profile.licenseExpiryDate)} />
            <InfoRow icon={MapPin} label="Address" value={getAddressString()} />
            {profile.linkedinUrl && <InfoRow icon={Linkedin} label="LinkedIn" value={profile.linkedinUrl} href={profile.linkedinUrl} />}
            {profile.website && <InfoRow icon={Globe} label="Website" value={profile.website} href={profile.website} />}
            {profile.bio && (
                <div className="info-row flex-col items-start">
                    <div className="flex items-center gap-3 w-full">
                        <div className="info-icon"><FileText className="w-4 h-4 text-[#c9a84c]" /></div>
                        <div className="info-label">Professional Bio</div>
                    </div>
                    <p className="text-sm text-[#374151] mt-2 pl-[50px] leading-relaxed">{profile.bio}</p>
                </div>
            )}
        </div>
    )

    /* ── Edit Forms ── */
    const FormSection = ({ title }: { title: string }) => (
        <div className="edit-section-head">{title}</div>
    )

    const UserEditForm = () => (
        <div className="space-y-5">
            <FormSection title="Basic Information" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label htmlFor="name" className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Full Name</Label><Input id="name" defaultValue={profile.fullName} className="mt-1" /></div>
                <div><Label htmlFor="email" className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Email</Label><Input id="email" type="email" defaultValue={profile.email} disabled className="mt-1 opacity-60" /></div>
                <div><Label htmlFor="phone" className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Phone</Label><Input id="phone" defaultValue={profile.phone || ''} className="mt-1" /></div>
                <div>
                    <Label htmlFor="gender" className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Gender</Label>
                    <Select defaultValue={profile.gender || ''}>
                        <SelectTrigger id="gender" className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div><Label htmlFor="dob" className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Date of Birth</Label><Input id="dob" type="date" defaultValue={profile.dob || ''} className="mt-1" /></div>
            </div>

            <FormSection title="Address" />
            <div><Label htmlFor="street" className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Street</Label><Input id="street" defaultValue={profile.address?.street || ''} className="mt-1" /></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div><Label htmlFor="city" className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">City</Label><Input id="city" defaultValue={profile.address?.city || ''} className="mt-1" /></div>
                <div><Label htmlFor="state" className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">State</Label><Input id="state" defaultValue={profile.address?.state || ''} className="mt-1" /></div>
                <div><Label htmlFor="country" className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Country</Label><Input id="country" defaultValue={profile.address?.country || ''} className="mt-1" /></div>
                <div><Label htmlFor="pincode" className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Pincode</Label><Input id="pincode" defaultValue={profile.address?.pincode || ''} className="mt-1" /></div>
            </div>

            <FormSection title="Emergency Contact" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><Label htmlFor="emergencyContactName" className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Name</Label><Input id="emergencyContactName" defaultValue={profile.emergencyContact?.name || ''} className="mt-1" /></div>
                <div><Label htmlFor="emergencyContactPhone" className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Phone</Label><Input id="emergencyContactPhone" defaultValue={profile.emergencyContact?.phone || ''} className="mt-1" /></div>
                <div><Label htmlFor="emergencyContactRelation" className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Relation</Label><Input id="emergencyContactRelation" defaultValue={profile.emergencyContact?.relation || ''} className="mt-1" /></div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#e8e3da]">
                <Button variant="outline" onClick={() => setIsEditing(false)}>Discard</Button>
                <Button onClick={handleSaveChanges} className="bg-[#0d1117] text-[#f0d98a] hover:bg-[#1a2333]">Save Changes</Button>
            </div>
        </div>
    )

    const LawyerEditForm = () => (
        <div className="space-y-5">
            <FormSection title="Basic Information" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label htmlFor="name" className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Full Name</Label><Input id="name" defaultValue={profile.fullName} className="mt-1" /></div>
                <div><Label htmlFor="email" className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Email</Label><Input id="email" type="email" defaultValue={profile.email} disabled className="mt-1 opacity-60" /></div>
                <div><Label htmlFor="phone" className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Phone</Label><Input id="phone" defaultValue={profile.phone || ''} className="mt-1" /></div>
                <div><Label htmlFor="barCouncilId" className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Bar Council ID</Label><Input id="barCouncilId" defaultValue={profile.barCouncilId || ''} className="mt-1" /></div>
                <div><Label htmlFor="panNumber" className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">PAN Number</Label><Input id="panNumber" defaultValue={profile.panNumber || ''} className="mt-1" /></div>
                <div><Label htmlFor="yearsPracticing" className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Years Practicing</Label><Input id="yearsPracticing" type="number" defaultValue={profile.yearsPracticing || 0} min="0" className="mt-1" /></div>
                <div><Label htmlFor="consultationFee" className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Consultation Fee (₹)</Label><Input id="consultationFee" type="number" defaultValue={profile.consultationFee || 0} min="0" className="mt-1" /></div>
                <div><Label htmlFor="lawFirm" className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Law Firm</Label><Input id="lawFirm" defaultValue={profile.lawFirm || ''} className="mt-1" /></div>
            </div>
            <div><Label htmlFor="specialization" className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Specializations (comma separated)</Label><Input id="specialization" defaultValue={profile.specialization?.join(', ') || ''} placeholder="e.g. Criminal Law, Corporate Law" className="mt-1" /></div>
            <div><Label htmlFor="languagesSpoken" className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Languages Spoken (comma separated)</Label><Input id="languagesSpoken" defaultValue={profile.languagesSpoken?.join(', ') || ''} placeholder="e.g. English, Hindi" className="mt-1" /></div>
            <div><Label htmlFor="bio" className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Professional Bio</Label><Textarea id="bio" defaultValue={profile.bio || ''} rows={4} placeholder="Tell clients about your expertise..." className="mt-1 resize-none" /></div>

            <FormSection title="License" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label htmlFor="licenseIssuedDate" className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Issued Date</Label><Input id="licenseIssuedDate" type="date" defaultValue={profile.licenseIssuedDate || ''} className="mt-1" /></div>
                <div><Label htmlFor="licenseExpiryDate" className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Expiry Date</Label><Input id="licenseExpiryDate" type="date" defaultValue={profile.licenseExpiryDate || ''} className="mt-1" /></div>
            </div>

            <FormSection title="Online Presence" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label htmlFor="linkedinUrl" className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">LinkedIn URL</Label><Input id="linkedinUrl" defaultValue={profile.linkedinUrl || ''} placeholder="https://linkedin.com/in/..." className="mt-1" /></div>
                <div><Label htmlFor="website" className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Website</Label><Input id="website" defaultValue={profile.website || ''} placeholder="https://yourwebsite.com" className="mt-1" /></div>
            </div>

            <FormSection title="Consultation Modes" />
            <div className="flex flex-wrap gap-5">
                {[
                    { id: "consultationModeVideo", label: "Video Call", checked: profile.consultationModes?.video },
                    { id: "consultationModeCall", label: "Phone Call", checked: profile.consultationModes?.call },
                    { id: "consultationModeChat", label: "Chat", checked: profile.consultationModes?.chat },
                    { id: "consultationModeInPerson", label: "In Person", checked: profile.consultationModes?.inPerson },
                ].map(({ id, label, checked }) => (
                    <div key={id} className="flex items-center gap-2.5">
                        <Switch id={id} defaultChecked={checked || false} />
                        <Label htmlFor={id} className="text-sm font-medium cursor-pointer">{label}</Label>
                    </div>
                ))}
            </div>

            <FormSection title="Bank Details" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label htmlFor="bankAccountHolder" className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Account Holder</Label><Input id="bankAccountHolder" defaultValue={profile.bankDetails?.accountHolder || ''} className="mt-1" /></div>
                <div><Label htmlFor="bankAccountNumber" className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">Account Number</Label><Input id="bankAccountNumber" defaultValue={profile.bankDetails?.accountNumber || ''} className="mt-1" /></div>
                <div><Label htmlFor="bankIFSC" className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">IFSC Code</Label><Input id="bankIFSC" defaultValue={profile.bankDetails?.ifsc || ''} className="mt-1" /></div>
                <div><Label htmlFor="upiId" className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">UPI ID</Label><Input id="upiId" defaultValue={profile.bankDetails?.upiId || ''} placeholder="name@upi" className="mt-1" /></div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#e8e3da]">
                <Button variant="outline" onClick={() => setIsEditing(false)}>Discard</Button>
                <Button onClick={handleSaveChanges} className="bg-[#0d1117] text-[#f0d98a] hover:bg-[#1a2333]">Save Changes</Button>
            </div>
        </div>
    )

    /* ── Empty placeholder tabs ── */
    const EmptyTab = ({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) => (
        <div className="empty-state">
            <div className="empty-icon"><Icon className="w-6 h-6 text-[#c9a84c]" /></div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600, color: '#0d1117', marginBottom: 8 }}>{title}</h3>
            <p className="text-sm text-[#6b7280] max-w-xs mx-auto">{desc}</p>
        </div>
    )

    /* ──────────── RENDER ──────────── */
    return (
        <div className="profile-root">
            <style>{styles}</style>

            {/* ── Hero Banner ── */}
            <div className="hero-banner pb-20 pt-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
                        {/* Avatar */}
                        <div className="avatar-ring flex-shrink-0">
                            <Avatar className="h-24 w-24 border-[3px] border-[#0d1117]">
                                <AvatarImage src={profile?.profilePhoto || profile?.avatar || undefined} />
                                <AvatarFallback style={{ background: 'linear-gradient(135deg, #1a2333, #0d1117)', color: '#f0d98a', fontSize: 28, fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
                                    {initials(profile.fullName)}
                                </AvatarFallback>
                            </Avatar>
                        </div>

                        {/* Name & badge row */}
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-1">
                                <div className="gold-badge">
                                    {profile.role === 'lawyer' ? <Gavel className="w-3 h-3" /> : <Shield className="w-3 h-3" />}
                                    {profile.role === 'lawyer' ? 'Advocate' : 'Member'}
                                </div>
                                {profile.verifiedByPlatform && (
                                    <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                        Platform Verified
                                    </div>
                                )}
                            </div>
                            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700, color: '#ffffff', letterSpacing: '-.01em', marginBottom: 4 }}>
                                {profile.fullName}
                            </h1>
                            <p style={{ color: 'rgba(255,255,255,.45)', fontSize: 13 }}>
                                {profile.email}
                                {profile.role === 'lawyer' && profile.specialization?.length
                                    ? ` · ${profile.specialization.slice(0, 2).join(', ')}`
                                    : ''
                                }
                            </p>
                        </div>

                        {/* Edit button */}
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
                            style={{ background: 'rgba(201,168,76,.15)', border: '1px solid rgba(201,168,76,.35)', color: '#f0d98a' }}
                        >
                            <Edit className="w-4 h-4" />
                            Edit Profile
                        </button>
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
                        {profile.role === 'user' ? (
                            <>
                                <div className="stat-card"><div className="stat-label">Cases Filed</div><div className="stat-value">0</div></div>
                                <div className="stat-card"><div className="stat-label">Consultations</div><div className="stat-value">{profile.consultationCount || 0}</div></div>
                                <div className="stat-card"><div className="stat-label">Profile</div><div className="stat-value">{completion}%</div></div>
                                <div className="stat-card"><div className="stat-label">Plan</div><div className="stat-value" style={{ fontSize: 18 }}>Basic</div></div>
                            </>
                        ) : (
                            <>
                                <div className="stat-card"><div className="stat-label">Total Clients</div><div className="stat-value">{profile.consultationCount || 0}</div></div>
                                <div className="stat-card"><div className="stat-label">Experience</div><div className="stat-value">{profile.yearsPracticing || profile.experience || 0}<span style={{ fontSize: 14, color: 'rgba(255,255,255,.5)' }}>yr</span></div></div>
                                <div className="stat-card">
                                    <div className="stat-label">Rating</div>
                                    <div className="stat-value flex items-end gap-1">
                                        {profile.averageRating ? profile.averageRating.toFixed(1) : '—'}
                                        <Star className="w-4 h-4 mb-1" style={{ color: '#c9a84c', fill: '#c9a84c' }} />
                                    </div>
                                </div>
                                <div className="stat-card"><div className="stat-label">Consultations</div><div className="stat-value">{profile.consultationCount || 0}</div></div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Body ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-2">
                <Tabs defaultValue="overview" className="premium-tabs w-full">
                    <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 mb-6">
                        <TabsTrigger value="overview"><User className="h-4 w-4 mr-1.5 hidden sm:inline" />Overview</TabsTrigger>
                        <TabsTrigger value={profile.role === 'user' ? "cases" : "clients"}>
                            {profile.role === 'user' ? <><FileText className="h-4 w-4 mr-1.5 hidden sm:inline" />My Cases</> : <><UsersIcon className="h-4 w-4 mr-1.5 hidden sm:inline" />Clients</>}
                        </TabsTrigger>
                        {profile.role === 'lawyer' && (
                            <TabsTrigger value="casefiles"><FileSearch className="h-4 w-4 mr-1.5 hidden sm:inline" />Case Files</TabsTrigger>
                        )}
                        <TabsTrigger value="documents"><FileText className="h-4 w-4 mr-1.5 hidden sm:inline" />Documents</TabsTrigger>
                        <TabsTrigger value="settings"><Settings className="h-4 w-4 mr-1.5 hidden sm:inline" />Settings</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview"><OverviewContent /></TabsContent>
                    <TabsContent value="cases">
                        <div className="premium-card">
                            <EmptyTab icon={FileText} title="No Cases Yet" desc="Your legal cases will appear here once you file or are assigned one." />
                        </div>
                    </TabsContent>
                    <TabsContent value="clients">
                        <div className="premium-card">
                            <EmptyTab icon={UsersIcon} title="No Clients Yet" desc="Your client list will populate as you accept consultations." />
                        </div>
                    </TabsContent>
                    <TabsContent value="casefiles">
                        <div className="premium-card">
                            <EmptyTab icon={FileSearch} title="No Case Files" desc="Case files and documents shared with clients will be shown here." />
                        </div>
                    </TabsContent>
                    <TabsContent value="documents">
                        <div className="premium-card">
                            <EmptyTab icon={Bookmark} title="No Documents" desc="Uploaded documents, contracts, and legal papers will appear here." />
                        </div>
                    </TabsContent>
                    <TabsContent value="settings">
                        <div className="premium-card p-6 md:p-8">
                            <h2 className="section-title mb-6">Account Settings</h2>
                            <div className="space-y-1 max-w-md">
                                {[
                                    { icon: Bell, label: "Notification Preferences", color: "bg-purple-50 text-purple-600" },
                                    { icon: Lock, label: "Change Password", color: "bg-blue-50 text-blue-600" },
                                    { icon: CreditCard, label: "Payment Methods", color: "bg-green-50 text-green-600" },
                                    { icon: Shield, label: "Privacy & Security", color: "bg-amber-50 text-amber-600" },
                                ].map(({ icon: Icon, label, color }) => (
                                    <button key={label} className="quick-btn">
                                        <div className="flex items-center gap-3">
                                            <div className={cn("quick-btn-icon", color)}><Icon className="w-4 h-4" /></div>
                                            <span className="quick-btn-label">{label}</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-[#6b7280]" />
                                    </button>
                                ))}
                                <div className="pt-2 border-t border-[#e8e3da]" />
                                <button className="quick-btn" onClick={handleLogout}>
                                    <div className="flex items-center gap-3">
                                        <div className="quick-btn-icon bg-red-50"><LogOut className="w-4 h-4 text-red-500" /></div>
                                        <span className="quick-btn-label text-red-500">Sign Out of Account</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-red-400" />
                                </button>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}