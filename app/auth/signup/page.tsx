"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"
import { Eye, EyeOff, Shield, CheckCircle2, Scale, Building2, User, Briefcase } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// --- Types ---
interface BaseFormData {
  password: string
  confirmPassword: string
  agreeToTerms: boolean
  subscribeNewsletter: boolean
}

interface UserFormData extends BaseFormData {
  fullName: string
  email: string
  phone: string
}

interface LawyerFormData extends BaseFormData {
  fullName: string
  email: string
  phone: string
  barCouncilNumber: string
  specialization: string
  experience: string
  state: string
  city: string
}

interface BusinessFormData extends BaseFormData {
  // Company Information
  companyName: string
  industry: string
  teamSize: string
  website: string // optional
  // Primary Contact
  fullName: string
  designation: string
  email: string
  phone: string
  // Business Needs (multi-select)
  businessNeeds: string[]
  // Current Setup
  hasCA: boolean
  hasLawyer: boolean
  hasCS: boolean
}

type UserType = "business" | "lawyer" | "user"

// --- Constants ---
const BASE_API_URL = "https://nyaymitra-backend-production.up.railway.app/api/v1/auth"

const BUSINESS_NEEDS_OPTIONS = [
  "Compliance Management",
  "Contract Management",
  "Documentation Support",
  "Investor Readiness",
  "Vendor Agreements",
  "Employment Documentation",
  "Legal Desk Retainer",
]

const INDUSTRIES = [
  "Technology / SaaS",
  "Fintech",
  "E-Commerce",
  "Healthcare / Healthtech",
  "Edtech",
  "Manufacturing",
  "Retail / D2C",
  "Real Estate",
  "Logistics / Supply Chain",
  "Media & Entertainment",
  "Professional Services",
  "Food & Beverage",
  "Agriculture / Agritech",
  "Energy / Cleantech",
  "NBFC / Financial Services",
  "Other",
]

const TEAM_SIZES = [
  "1–10 (Micro)",
  "11–50 (Small)",
  "51–200 (Mid-size)",
  "201–500",
  "500+ (Enterprise)",
]

const DESIGNATIONS = [
  "Founder / Co-Founder",
  "CEO / Managing Director",
  "CFO",
  "COO",
  "Head of Legal",
  "Company Secretary",
  "Finance Manager",
  "Operations Manager",
  "HR Manager",
  "Other",
]

const SPECIALIZATIONS = [
  "Criminal Law",
  "Civil Law",
  "Family Law",
  "Divorce Law",
  "Property Law",
  "Tenant & Landlord",
  "Consumer Rights",
  "Cyber Crime",
  "Cheque Bounce",
  "Motor Accident Claims",
  "Medical Negligence",
  "Bail Matters",
  "Documentation & Affidavits",
  "Insurance Claims",
  "Employment & Service Matters",
  "Immigration Law",
  "Constitutional Law",
  "Environmental Law",
  "Corporate Law",
  "Startup & Compliance",
  "Contract Drafting",
  "Business Agreements",
  "Company Registration",
  "Labour & Employment Law",
  "Tax Law",
  "GST",
  "Intellectual Property",
  "Trademark",
  "Copyright",
  "Patent",
  "Banking & Finance",
  "Debt Recovery",
  "Arbitration & Dispute Resolution",
  "NCLT & Insolvency",
  "Real Estate & RERA",
  "High Court Matters",
  "Supreme Court Matters",
]

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman & Nicobar Islands",
  "Chandigarh",
  "Dadra & Nagar Haveli and Daman & Diu",
  "Delhi",
  "Jammu & Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
]

// --- Reusable field components ---
function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {children}
      {hint && <span className="form-hint">{hint}</span>}
    </div>
  )
}

function TextInput({
  value,
  onChange,
  ...rest
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  onChange: (v: string) => void
}) {
  return (
    <input
      className="form-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
  )
}

function PasswordInput({ id, value, onChange, placeholder }: { id: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  const [show, setShow] = useState(false)
  return (
    <div className="input-wrapper">
      <input
        className="form-input"
        id={id}
        type={show ? "text" : "password"}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ paddingRight: "48px" }}
        required
        autoComplete="new-password"
      />
      <button type="button" className="password-toggle" onClick={() => setShow(!show)} aria-label="Toggle password">
        {show ? <EyeOff size={17} /> : <Eye size={17} />}
      </button>
    </div>
  )
}

function SelectInput({ value, onChange, options, placeholder }: { value: string; onChange: (v: string) => void; options: string[]; placeholder: string }) {
  return (
    <select className="form-select" value={value} onChange={e => onChange(e.target.value)} required>
      <option value="" disabled>{placeholder}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

function SectionLabel({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="section-label">
      {icon && <span className="section-icon">{icon}</span>}
      {children}
    </div>
  )
}

function CheckRow({ id, checked, onChange, children }: { id: string; checked: boolean; onChange: (v: boolean) => void; children: React.ReactNode }) {
  return (
    <label className="checkbox-row" htmlFor={id}>
      <input className="checkbox-custom" type="checkbox" id={id} checked={checked} onChange={e => onChange(e.target.checked)} />
      <span className="checkbox-label">{children}</span>
    </label>
  )
}

function PasswordStrength({ password }: { password: string }) {
  if (!password) return null
  const score = [/.{8,}/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter(r => r.test(password)).length
  const labels = ["", "Weak", "Fair", "Good", "Strong"]
  const colors = ["", "#d4574a", "#d4954a", "#a5a84a", "#6b9d4a"]
  return (
    <div className="password-strength">
      <div className="strength-bars">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="strength-bar" style={{ background: i <= score ? colors[score] : "rgba(0,0,0,.1)" }} />
        ))}
      </div>
      {score > 0 && <span className="strength-label" style={{ color: colors[score] }}>{labels[score]}</span>}
    </div>
  )
}

// Multi-select business needs
function BusinessNeedsSelector({ selected, onChange }: { selected: string[]; onChange: (v: string[]) => void }) {
  const toggle = (need: string) => {
    onChange(selected.includes(need) ? selected.filter(n => n !== need) : [...selected, need])
  }
  return (
    <div className="needs-grid">
      {BUSINESS_NEEDS_OPTIONS.map(need => {
        const active = selected.includes(need)
        return (
          <button
            key={need}
            type="button"
            className={`need-chip ${active ? "need-chip-active" : ""}`}
            onClick={() => toggle(need)}
          >
            <span className="need-chip-check">{active ? "✓" : "+"}</span>
            {need}
          </button>
        )
      })}
    </div>
  )
}

// Current setup toggle row
function SetupToggle({ label, id, checked, onChange }: { label: string; id: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="setup-toggle" htmlFor={id}>
      <span className="setup-toggle-label">{label}</span>
      <div className="setup-toggle-track" onClick={() => onChange(!checked)}>
        <input type="checkbox" id={id} checked={checked} onChange={e => onChange(e.target.checked)} style={{ display: "none" }} />
        <div className={`setup-toggle-thumb ${checked ? "checked" : ""}`} />
      </div>
    </label>
  )
}

// --- Main Page ---
export default function SignupPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<UserType>("business")
  const [showDialog, setShowDialog] = useState(false)
  const [loading, setLoading] = useState(false)

  const [user, setUser] = useState<UserFormData>({
    fullName: "", email: "", phone: "",
    password: "", confirmPassword: "", agreeToTerms: false, subscribeNewsletter: false,
  })

  const [lawyer, setLawyer] = useState<LawyerFormData>({
    fullName: "", email: "", phone: "",
    barCouncilNumber: "", specialization: "", experience: "", state: "", city: "",
    password: "", confirmPassword: "", agreeToTerms: false, subscribeNewsletter: false,
  })

  const [business, setBusiness] = useState<BusinessFormData>({
    companyName: "", industry: "", teamSize: "", website: "",
    fullName: "", designation: "", email: "", phone: "",
    businessNeeds: [],
    hasCA: false, hasLawyer: false, hasCS: false,
    password: "", confirmPassword: "", agreeToTerms: false, subscribeNewsletter: false,
  })

  const setU = (field: keyof UserFormData, v: string | boolean) => setUser(p => ({ ...p, [field]: v }))
  const setL = (field: keyof LawyerFormData, v: string | boolean) => setLawyer(p => ({ ...p, [field]: v }))
  const setB = (field: keyof BusinessFormData, v: string | boolean | string[]) => setBusiness(p => ({ ...p, [field]: v }))

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    let data: any
    let url: string

    if (userType === "business") {
      // Build the business registration payload.
      // `confirmPassword` is a UI-only guard — excluded from the request body.
      // Primary contact details are nested under `contact` so the backend can
      // persist the company record and contact record independently.
      const {
        confirmPassword: _cp,   // strip — not sent to backend
        agreeToTerms: _at,      // strip — frontend consent only
        subscribeNewsletter,
        companyName,
        industry,
        teamSize,
        website,
        fullName,
        designation,
        email,
        phone,
        businessNeeds,
        hasCA,
        hasLawyer,
        hasCS,
        password,
      } = business

      data = {
        // Company
        companyName,
        industry,
        teamSize,
        website: website || undefined,   // omit empty string — optional field
        // Primary contact
        contact: {
          fullName,
          designation,
          email,
          phone,
        },
        // Needs & setup
        businessNeeds,
        currentSetup: { hasCA, hasLawyer, hasCS },
        // Auth
        password,
        subscribeNewsletter,
      }

      url = `${BASE_API_URL}/register-business`
    } else if (userType === "lawyer") {
      data = { ...lawyer, experience: Number(lawyer.experience) }
      url = `${BASE_API_URL}/register-lawyer`
    } else {
      data = user
      url = `${BASE_API_URL}/register-user`
    }

    // Password match guard (applies to all account types)
    const rawPassword = userType === "business" ? business.password : data.password
    const rawConfirm = userType === "business" ? business.confirmPassword : data.confirmPassword
    if (rawPassword !== rawConfirm) { toast.error("Passwords do not match"); return }

    setLoading(true)
    try {
      const res = await axios.post(url, data, { headers: { "Content-Type": "application/json" } })
      if (res.status === 201) {
        toast.success(res.data.message || "Account created successfully!")
        if (userType === "user") {
          setUser({ fullName: "", email: "", phone: "", password: "", confirmPassword: "", agreeToTerms: false, subscribeNewsletter: false })
          setTimeout(() => router.push("/auth/login"), 1200)
        } else if (userType === "business") {
          setBusiness({
            companyName: "", industry: "", teamSize: "", website: "",
            fullName: "", designation: "", email: "", phone: "",
            businessNeeds: [],
            hasCA: false, hasLawyer: false, hasCS: false,
            password: "", confirmPassword: "", agreeToTerms: false, subscribeNewsletter: false,
          })
          setShowDialog(true)
        } else {
          setLawyer({ fullName: "", email: "", phone: "", password: "", confirmPassword: "", barCouncilNumber: "", specialization: "", experience: "", state: "", city: "", agreeToTerms: false, subscribeNewsletter: false })
          setShowDialog(true)
        }
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }, [userType, user, lawyer, business, router])

  const agreeToTerms = userType === "business" ? business.agreeToTerms : userType === "lawyer" ? lawyer.agreeToTerms : user.agreeToTerms

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=DM+Mono:wght@400;500&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
          --ink: #0a0a0a;
          --ink-2: #1a1a1a;
          --ink-3: #3a3a3a;
          --ink-4: #6b6b6b;
          --ink-5: #9a9a9a;
          --ink-6: #c8c8c8;
          --ink-7: #e8e8e8;
          --ink-8: #f4f3f0;
          --parchment: #faf9f6;
          --white: #ffffff;
          --gold: #c9a84c;
          --gold-lt: #e8c96a;
          --gold-dk: #8b6914;
          --gold-pale: #fdf6e3;
          --serif: 'Cormorant Garamond', 'Georgia', serif;
          --sans: 'DM Sans', system-ui, sans-serif;
          --mono: 'DM Mono', monospace;
          --page-bg: #ffffff;
          --panel-bg: #ffffff;
          --text-primary: #0a0a0a;
          --text-secondary: #3a3a3a;
          --text-muted: #6b6b6b;
          --text-faint: #9a9a9a;
          --border-light: rgba(0,0,0,0.09);
          --border-medium: rgba(0,0,0,0.14);
          --input-bg: #fafaf9;
          --input-bg-focus: #ffffff;
          --toggle-bg: #f4f3f0;
          --toggle-border: rgba(0,0,0,0.1);
        }

        body { background: var(--page-bg); font-family: var(--sans); }

        .signup-root {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr;
          background: var(--page-bg);
        }

        @media (min-width: 768px) {
          .signup-root { grid-template-columns: 1fr 1fr; }
          .mobile-hero { display: none !important; }
          .desktop-left { display: flex !important; }
          .form-panel { padding: 2.5rem 3.5rem; }
          .form-inner { max-width: 460px; }
          .form-brand { display: flex !important; }
        }

        @media (max-width: 767px) {
          .desktop-left { display: none !important; }
          .mobile-hero { display: block !important; }
          .form-panel { padding: 1.75rem 1.5rem 2.5rem; }
          .form-inner { max-width: 100%; }
          .form-brand { display: none !important; }
          .form-title { font-size: 1.8rem !important; }
          .signup-row2 { grid-template-columns: 1fr !important; }
        }

        /* Desktop Left Panel */
        .desktop-left {
          display: none;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #0d0f16 0%, #0a0b0f 100%);
          flex-direction: column;
          justify-content: space-between;
          padding: 2.5rem;
          border-right: 1px solid rgba(201,168,76,0.18);
        }

        .glow-effect {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(ellipse 70% 55% at 15% 88%, rgba(201, 168, 76, 0.1) 0%, transparent 70%),
                      radial-gradient(ellipse 55% 45% at 85% 15%, rgba(201, 168, 76, 0.07) 0%, transparent 70%);
        }

        .grid-lines {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: linear-gradient(rgba(201, 168, 76, 0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(201, 168, 76, 0.04) 1px, transparent 1px);
          background-size: 44px 44px;
        }

        .desktop-brand { position: relative; z-index: 1; }
        .desktop-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--gold-dk), var(--gold));
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
        }
        .desktop-brand-name { font-size: 18px; font-weight: 600; color: #e8e3dc; letter-spacing: -0.01em; font-family: var(--serif); }
        .desktop-brand-tag { font-size: 9px; color: var(--gold); text-transform: uppercase; letter-spacing: 0.12em; margin-top: 2px; font-family: var(--mono); }

        .benefits-section { position: relative; z-index: 1; }
        .benefits-title { font-size: 10px; font-weight: 600; color: var(--gold); text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 1rem; font-family: var(--mono); }
        .benefit { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 1.2rem; }
        .benefit-icon {
          width: 24px; height: 24px; border-radius: 50%;
          background: linear-gradient(135deg, var(--gold-dk), var(--gold));
          display: flex; align-items: center; justify-content: center;
          font-size: 9px; font-weight: 600; color: #0a0a0a; flex-shrink: 0; margin-top: 1px;
        }
        .benefit-title { font-size: 12.5px; font-weight: 500; color: #c0bbb4; margin-bottom: 1px; }
        .benefit-desc { font-size: 11px; color: #4e4d4b; line-height: 1.45; }

        .desktop-stats {
          position: relative; z-index: 1;
          display: flex; gap: 1.8rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(201,168,76,0.15);
        }
        .stat-sep { width: 1px; background: rgba(201,168,76,0.15); align-self: stretch; }
        .stat-number { font-family: var(--serif); font-size: 1.6rem; font-weight: 600; color: var(--gold); line-height: 1; }
        .stat-label { font-size: 9px; color: #4a4845; text-transform: uppercase; letter-spacing: 0.08em; margin-top: 4px; font-family: var(--mono); }

        /* Mobile Hero */
        .mobile-hero {
          display: none;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #0d0f16 0%, #0a0b0f 100%);
          padding: 2rem 1.5rem 1.8rem;
          border-bottom: 1px solid rgba(201,168,76,0.18);
        }
        .mobile-brand {
          position: relative; z-index: 1;
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 1.8rem; text-decoration: none;
        }
        .mobile-icon {
          width: 40px; height: 40px; border-radius: 10px;
          background: linear-gradient(135deg, var(--gold-dk), var(--gold));
          display: flex; align-items: center; justify-content: center;
        }
        .mobile-brand-name { font-size: 16px; font-weight: 600; color: #e8e3dc; font-family: var(--serif); }
        .mobile-brand-tag { font-size: 9px; color: var(--gold); text-transform: uppercase; letter-spacing: 0.12em; font-family: var(--mono); }
        .mobile-title {
          font-family: var(--serif); font-style: italic;
          font-size: 1.7rem; line-height: 1.2; letter-spacing: -0.025em;
          color: #f0ede8; margin-bottom: 0.4rem; position: relative; z-index: 1;
        }
        .mobile-sub { font-size: 11px; color: #5a5754; margin-bottom: 1.2rem; position: relative; z-index: 1; line-height: 1.5; }
        .mobile-stats {
          position: relative; z-index: 1;
          display: grid; grid-template-columns: repeat(3, 1fr);
          background: rgba(255, 255, 255, 0.04);
          border-radius: 12px; overflow: hidden;
          border: 1px solid rgba(201,168,76,0.15);
        }
        .mobile-stat { padding: 10px 0; text-align: center; }
        .mobile-stat + .mobile-stat { border-left: 1px solid rgba(201,168,76,0.15); }
        .mobile-stat-number { font-family: var(--serif); font-size: 1.2rem; font-weight: 600; color: var(--gold); line-height: 1; }
        .mobile-stat-label { font-size: 8px; color: #4a4845; text-transform: uppercase; letter-spacing: 0.06em; margin-top: 4px; font-family: var(--mono); }

        /* Form Panel */
        .form-panel {
          display: flex; align-items: flex-start; justify-content: center;
          background: var(--panel-bg); overflow-y: auto;
        }
        .form-inner { width: 100%; padding-top: 2rem; padding-bottom: 2.5rem; }

        .form-brand {
          align-items: center; gap: 10px;
          margin-bottom: 1.8rem; text-decoration: none;
        }
        .form-icon {
          width: 32px; height: 32px; border-radius: 8px;
          background: linear-gradient(135deg, var(--gold-dk), var(--gold));
          display: flex; align-items: center; justify-content: center;
        }
        .form-brand-name { font-size: 14px; font-weight: 600; color: var(--ink-3); font-family: var(--serif); letter-spacing: -0.01em; }

        .role-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 12px; border-radius: 7px; margin-bottom: 1.4rem;
          background: rgba(201, 168, 76, 0.08); border: 1px solid rgba(201, 168, 76, 0.25);
          font-size: 11.5px; font-weight: 500; color: var(--gold-dk);
          transition: all 0.2s; font-family: var(--mono);
        }
        .role-badge-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--gold); }

        .form-title {
          font-family: var(--serif); font-style: italic;
          font-size: 2rem; color: var(--ink);
          letter-spacing: -0.025em; line-height: 1.2; margin-bottom: 0.4rem;
        }
        .form-sub { font-size: 12px; color: var(--text-muted); margin-bottom: 1.6rem; line-height: 1.55; }

        /* 3-way Toggle */
        .user-toggle {
          display: flex; gap: 4px;
          background: var(--toggle-bg);
          border: 1px solid var(--toggle-border);
          border-radius: 12px; padding: 4px;
          margin-bottom: 1.5rem;
        }
        .toggle-btn {
          flex: 1; min-height: 44px; padding: 8px 10px;
          border-radius: 8px; border: none;
          font-family: var(--sans); font-size: 12px; font-weight: 500;
          cursor: pointer; color: var(--text-muted); background: transparent;
          display: flex; align-items: center; justify-content: center;
          gap: 5px; transition: all 0.2s ease;
        }
        .toggle-btn.active {
          background: #ffffff; color: var(--gold-dk);
          border: 1px solid rgba(201, 168, 76, 0.3);
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }
        .toggle-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--gold); opacity: 0; transition: opacity 0.2s;
        }
        .toggle-btn.active .toggle-dot { opacity: 1; }
        .toggle-icon { display: flex; align-items: center; opacity: 0.5; }
        .toggle-btn.active .toggle-icon { opacity: 1; color: var(--gold-dk); }

        /* Form Fields */
        .form-field { margin-bottom: 1rem; }
        .form-label {
          display: block; font-size: 10px; font-weight: 600;
          color: var(--text-muted); text-transform: uppercase;
          letter-spacing: 0.1em; margin-bottom: 6px; font-family: var(--mono);
        }
        .form-hint {
          display: block; font-size: 10.5px; color: var(--text-faint);
          margin-top: 4px; line-height: 1.4; font-family: var(--mono);
        }
        .form-input {
          width: 100%; background: var(--input-bg);
          border: 1px solid var(--border-light);
          border-radius: 10px; padding: 12px 14px;
          font-family: var(--sans); font-size: 14px; color: var(--ink);
          outline: none; transition: all 0.2s;
        }
        .form-input::placeholder { color: #b8b4ae; }
        .form-input:focus {
          border-color: rgba(201, 168, 76, 0.6);
          box-shadow: 0 0 0 3px rgba(201, 168, 76, 0.1);
          background: var(--input-bg-focus);
        }
        .form-input:hover:not(:focus) { border-color: var(--border-medium); }

        .input-wrapper { position: relative; }
        .password-toggle {
          position: absolute; right: 0; top: 0; bottom: 0; width: 48px;
          background: none; border: none; cursor: pointer;
          color: var(--text-faint);
          display: flex; align-items: center; justify-content: center;
          transition: color 0.2s;
        }
        .password-toggle:hover { color: var(--gold-dk); }

        .form-select {
          width: 100%; background: var(--input-bg);
          border: 1px solid var(--border-light);
          border-radius: 10px; padding: 12px 36px 12px 14px;
          font-family: var(--sans); font-size: 14px; color: var(--ink);
          outline: none; appearance: none; cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b6b6b' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 12px center;
          transition: all 0.2s;
        }
        .form-select:focus {
          border-color: rgba(201, 168, 76, 0.6);
          box-shadow: 0 0 0 3px rgba(201, 168, 76, 0.1);
          background-color: var(--input-bg-focus);
        }
        .form-select:hover:not(:focus) { border-color: var(--border-medium); }
        .form-select option { background: #ffffff; color: var(--ink); }

        .signup-row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

        /* Section Labels */
        .section-label {
          display: flex; align-items: center; gap: 6px;
          font-size: 10px; font-weight: 600; color: var(--gold-dk);
          text-transform: uppercase; letter-spacing: 0.1em;
          margin: 1.2rem 0 0.75rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(201,168,76,0.15);
          font-family: var(--mono);
        }
        .section-icon { color: var(--gold); display: flex; align-items: center; }

        /* Password Strength */
        .password-strength { display: flex; align-items: center; gap: 8px; margin-top: 6px; }
        .strength-bars { display: flex; gap: 3px; }
        .strength-bar { width: 28px; height: 3px; border-radius: 2px; transition: background 0.25s; }
        .strength-label { font-size: 10.5px; font-weight: 500; font-family: var(--mono); }

        /* Business Needs */
        .needs-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 8px; margin-top: 4px;
        }
        .need-chip {
          display: flex; align-items: center; gap: 7px;
          padding: 9px 11px; border-radius: 8px;
          border: 1px solid var(--border-light);
          background: var(--input-bg);
          font-family: var(--sans); font-size: 12px;
          color: var(--text-muted); cursor: pointer;
          text-align: left; transition: all 0.15s;
          line-height: 1.3;
        }
        .need-chip:hover { border-color: rgba(201,168,76,0.35); color: var(--ink-3); }
        .need-chip-active {
          background: rgba(201,168,76,0.08);
          border-color: rgba(201,168,76,0.4);
          color: var(--gold-dk);
        }
        .need-chip-check {
          flex-shrink: 0; width: 16px; height: 16px;
          border-radius: 4px; display: flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: 700;
          background: rgba(201,168,76,0.15);
          color: var(--gold-dk);
        }
        .need-chip-active .need-chip-check {
          background: var(--gold); color: #fff;
        }

        /* Setup Toggle */
        .setup-toggles { display: flex; flex-direction: column; gap: 10px; margin-top: 4px; }
        .setup-toggle {
          display: flex; align-items: center; justify-content: space-between;
          padding: 11px 14px; border-radius: 10px;
          border: 1px solid var(--border-light);
          background: var(--input-bg); cursor: pointer;
          transition: border-color 0.15s;
        }
        .setup-toggle:hover { border-color: rgba(201,168,76,0.25); }
        .setup-toggle-label { font-size: 13px; color: var(--text-secondary); }
        .setup-toggle-track {
          width: 34px; height: 20px; border-radius: 10px;
          background: var(--ink-7); position: relative;
          cursor: pointer; transition: background 0.2s;
          flex-shrink: 0;
        }
        .setup-toggle-thumb {
          position: absolute; top: 3px; left: 3px;
          width: 14px; height: 14px; border-radius: 50%;
          background: #fff; transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        .setup-toggle-thumb.checked { transform: translateX(14px); }
        .setup-toggle:has(.setup-toggle-thumb.checked) .setup-toggle-track { background: var(--gold); }

        /* Verify note */
        .verify-note {
          background: linear-gradient(135deg, rgba(201, 168, 76, 0.07), rgba(139, 105, 20, 0.04));
          border: 1px solid rgba(201, 168, 76, 0.2);
          border-radius: 10px; padding: 12px 14px;
          margin: 0.5rem 0 0.9rem;
          display: flex; gap: 10px; align-items: flex-start;
        }
        .verify-icon { color: var(--gold-dk); flex-shrink: 0; margin-top: 1px; }
        .verify-text { font-size: 11.5px; color: var(--text-muted); line-height: 1.55; }

        /* Checkboxes */
        .checkbox-row {
          display: flex; align-items: flex-start; gap: 9px;
          margin-bottom: 0.6rem; cursor: pointer;
        }
        .checkbox-custom {
          width: 17px; height: 17px; flex-shrink: 0;
          border: 1px solid var(--border-medium); border-radius: 4px;
          background: var(--input-bg); appearance: none; cursor: pointer;
          position: relative; transition: all 0.15s; margin-top: 1px;
        }
        .checkbox-custom:checked { background: var(--gold); border-color: var(--gold); }
        .checkbox-custom:checked::after {
          content: ''; position: absolute;
          left: 4px; top: 2px; width: 4px; height: 8px;
          border: 2px solid #ffffff; border-top: none; border-left: none;
          transform: rotate(45deg);
        }
        .checkbox-label { font-size: 12px; color: var(--text-muted); line-height: 1.45; }
        .checkbox-label a { color: var(--gold-dk); text-decoration: none; font-weight: 500; }
        .checkbox-label a:hover { text-decoration: underline; }

        /* Submit Button */
        .submit-btn {
          width: 100%; padding: 14px;
          background: linear-gradient(135deg, var(--gold-dk), var(--gold));
          border: none; border-radius: 10px;
          font-family: var(--sans); font-size: 14px; font-weight: 600;
          color: #ffffff; cursor: pointer; letter-spacing: 0.02em;
          transition: all 0.2s; position: relative; overflow: hidden;
        }
        .submit-btn::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.15), transparent);
          pointer-events: none;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(201, 168, 76, 0.35);
        }
        .submit-btn:active:not(:disabled) { transform: scale(0.98); }
        .submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }

        .spinner { display: inline-flex; align-items: center; gap: 8px; }
        .spin {
          width: 15px; height: 15px; border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.3); border-top-color: #ffffff;
          animation: spin 0.6s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .signin-link {
          text-align: center; font-size: 12px;
          color: var(--text-muted); margin-top: 1.1rem;
        }
        .signin-link a { color: var(--gold-dk); text-decoration: none; font-weight: 500; }
        .signin-link a:hover { text-decoration: underline; }

        .trust-badges {
          display: flex; align-items: center; justify-content: center;
          flex-wrap: wrap; gap: 8px;
          font-size: 9px; color: #b0aba4;
          font-family: var(--mono); letter-spacing: 0.05em;
          margin-top: 0.9rem;
        }
        .trust-dot { width: 3px; height: 3px; border-radius: 50%; background: #d0cbc4; }

        /* Animations */
        .fade-in { animation: fadeIn 0.5s ease both; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .delay-1 { animation-delay: 0.05s; }
        .delay-2 { animation-delay: 0.1s; }
        .delay-3 { animation-delay: 0.15s; }
        .delay-4 { animation-delay: 0.2s; }
        .delay-5 { animation-delay: 0.25s; }
        .delay-6 { animation-delay: 0.3s; }
        .delay-7 { animation-delay: 0.35s; }
      `}</style>

      <div className="signup-root">
        {/* ── Desktop Left Panel ── */}
        <div className="desktop-left">
          <div className="glow-effect" /><div className="grid-lines" />

          <div className="desktop-brand">
            <div className="desktop-icon"><Scale size={22} color="#0a0a0a" /></div>
            <div>
              <div className="desktop-brand-name">NyayMitra</div>
              <div className="desktop-brand-tag">Fractional Legal &amp; Compliance Desk</div>
            </div>
          </div>

          <div className="benefits-section">
            <div className="benefits-title">Why businesses choose NyayMitra</div>
            {[
              { n: 1, t: "Compliance Coordination", d: "Stay ahead of regulatory requirements with structured compliance workflows built for your business." },
              { n: 2, t: "Contract Management", d: "Draft, review, and track contracts with support from verified legal professionals across India." },
              { n: 3, t: "Expert Legal Access", d: "Work with vetted lawyers, CAs, and CS professionals who understand your industry." },
              { n: 4, t: "Fractional Legal Desk", d: "Get the equivalent of an in-house legal team without the overhead — on retainer or on-demand." },
            ].map(b => (
              <div className="benefit" key={b.n}>
                <div className="benefit-icon">{b.n}</div>
                <div><div className="benefit-title">{b.t}</div><div className="benefit-desc">{b.d}</div></div>
              </div>
            ))}
          </div>

          <div className="desktop-stats">
            <div><div className="stat-number">100+</div><div className="stat-label">Founder conversations</div></div>
            <div className="stat-sep" />
            <div><div className="stat-number">65+</div><div className="stat-label">Legal experts</div></div>
            <div className="stat-sep" />
            <div><div className="stat-number">Pan India</div><div className="stat-label">Coverage</div></div>
          </div>
        </div>

        {/* ── Mobile Hero ── */}
        <div className="mobile-hero">
          <div className="glow-effect" /><div className="grid-lines" />
          <Link href="/" className="mobile-brand">
            <div className="mobile-icon"><Scale size={18} color="#0a0a0a" /></div>
            <div><div className="mobile-brand-name">NyayMitra</div><div className="mobile-brand-tag">Fractional Legal &amp; Compliance Desk</div></div>
          </Link>
          <h1 className="mobile-title fade-in delay-1">Create Your NyayMitra Account.</h1>
          <p className="mobile-sub fade-in delay-1">Join businesses, legal professionals and individuals on India's Legal & Compliance Network.</p>
          <div className="mobile-stats fade-in delay-2">
            <div className="mobile-stat"><div className="mobile-stat-number">100+</div><div className="mobile-stat-label">Founders</div></div>
            <div className="mobile-stat"><div className="mobile-stat-number">65+</div><div className="mobile-stat-label">Experts</div></div>
            <div className="mobile-stat"><div className="mobile-stat-number">Pan India</div><div className="mobile-stat-label">Coverage</div></div>
          </div>
        </div>

        {/* ── Form Panel ── */}
        <div className="form-panel">
          <div className="form-inner">
            <Link href="/" className="form-brand fade-in delay-1" style={{ display: "flex" }}>
              <div className="form-icon"><Scale size={14} color="#0a0a0a" /></div>
              <span className="form-brand-name">NyayMitra</span>
            </Link>

            <h1 className="form-title fade-in delay-2">Create Your NyayMitra Account.</h1>
            <p className="form-sub fade-in delay-2">Join businesses, legal professionals and individuals on India's Legal &amp; Compliance Network.</p>

            {/* 3-way toggle */}
            <div className="user-toggle fade-in delay-3">
              <button
                className={`toggle-btn ${userType === "business" ? "active" : ""}`}
                type="button"
                onClick={() => setUserType("business")}
              >
                <span className="toggle-icon"><Building2 size={12} /></span>
                <span className="toggle-dot" />
                Business
              </button>
              <button
                className={`toggle-btn ${userType === "lawyer" ? "active" : ""}`}
                type="button"
                onClick={() => setUserType("lawyer")}
              >
                <span className="toggle-icon"><Briefcase size={12} /></span>
                <span className="toggle-dot" />
                Legal Professional
              </button>
              <button
                className={`toggle-btn ${userType === "user" ? "active" : ""}`}
                type="button"
                onClick={() => setUserType("user")}
              >
                <span className="toggle-icon"><User size={12} /></span>
                <span className="toggle-dot" />
                Individual
              </button>
            </div>

            <div className="role-badge fade-in delay-3">
              <span className="role-badge-dot" />
              {userType === "business" && "Business account registration"}
              {userType === "lawyer" && "Legal professional registration"}
              {userType === "user" && "Individual account registration"}
            </div>

            <form onSubmit={handleSubmit}>
              {/* ── BUSINESS FORM ── */}
              {userType === "business" && (
                <div key="business" className="fade-in delay-4">
                  <SectionLabel icon={<Building2 size={12} />}>Company information</SectionLabel>
                  <Field label="Company name">
                    <TextInput value={business.companyName} onChange={v => setB("companyName", v)} placeholder="Acme Technologies Pvt. Ltd." autoComplete="organization" required />
                  </Field>
                  <div className="signup-row2">
                    <Field label="Industry">
                      <SelectInput value={business.industry} onChange={v => setB("industry", v)} options={INDUSTRIES} placeholder="Select industry" />
                    </Field>
                    <Field label="Team size">
                      <SelectInput value={business.teamSize} onChange={v => setB("teamSize", v)} options={TEAM_SIZES} placeholder="Select size" />
                    </Field>
                  </div>
                  <Field label="Website" hint="Optional">
                    <TextInput type="url" value={business.website} onChange={v => setB("website", v)} placeholder="https://yourcompany.com" autoComplete="url" />
                  </Field>

                  <SectionLabel icon={<User size={12} />}>Primary contact</SectionLabel>
                  <Field label="Full name">
                    <TextInput value={business.fullName} onChange={v => setB("fullName", v)} placeholder="Rahul Sharma" autoComplete="name" required />
                  </Field>
                  <Field label="Designation">
                    <SelectInput value={business.designation} onChange={v => setB("designation", v)} options={DESIGNATIONS} placeholder="Select designation" />
                  </Field>
                  <div className="signup-row2">
                    <Field label="Email address">
                      <TextInput type="email" value={business.email} onChange={v => setB("email", v)} placeholder="rahul@company.com" autoComplete="email" required />
                    </Field>
                    <Field label="Phone number">
                      <TextInput type="tel" value={business.phone} onChange={v => { if (/^\d{0,10}$/.test(v)) setB("phone", v) }} placeholder="9876543210" inputMode="numeric" required />
                    </Field>
                  </div>

                  <SectionLabel icon={<CheckCircle2 size={12} />}>Business needs</SectionLabel>
                  <div style={{ marginBottom: "0.5rem" }}>
                    <label className="form-label">Select all that apply</label>
                    <BusinessNeedsSelector selected={business.businessNeeds} onChange={v => setB("businessNeeds", v)} />
                  </div>

                  <SectionLabel icon={<Briefcase size={12} />}>Current setup</SectionLabel>
                  <div style={{ marginBottom: "0.25rem" }}>
                    <label className="form-label" style={{ marginBottom: "8px" }}>Do you currently work with?</label>
                    <div className="setup-toggles">
                      <SetupToggle id="hasCA" label="Chartered Accountant (CA)" checked={business.hasCA} onChange={v => setB("hasCA", v)} />
                      <SetupToggle id="hasCS" label="Company Secretary (CS)" checked={business.hasCS} onChange={v => setB("hasCS", v)} />
                      <SetupToggle id="hasLawyer" label="Legal Counsel / Lawyer" checked={business.hasLawyer} onChange={v => setB("hasLawyer", v)} />
                    </div>
                  </div>

                  <SectionLabel icon={<Shield size={12} />}>Security</SectionLabel>
                  <Field label="Password">
                    <PasswordInput id="bpw" value={business.password} onChange={v => setB("password", v)} placeholder="Create a strong password" />
                    <PasswordStrength password={business.password} />
                  </Field>
                  <Field label="Confirm password">
                    <PasswordInput id="bcpw" value={business.confirmPassword} onChange={v => setB("confirmPassword", v)} placeholder="Repeat your password" />
                  </Field>

                  <div style={{ marginTop: "0.9rem", marginBottom: "1.1rem" }}>
                    <CheckRow id="bterms" checked={business.agreeToTerms} onChange={v => setB("agreeToTerms", v)}>
                      I agree to the <Link href="/terms">Terms of Service</Link> and <Link href="/privacy">Privacy Policy</Link>
                    </CheckRow>
                    <CheckRow id="bnews" checked={business.subscribeNewsletter} onChange={v => setB("subscribeNewsletter", v)}>
                      Subscribe to compliance updates and legal alerts
                    </CheckRow>
                  </div>
                </div>
              )}

              {/* ── INDIVIDUAL FORM ── */}
              {userType === "user" && (
                <div key="user" className="fade-in delay-4">
                  <Field label="Full name">
                    <TextInput value={user.fullName} onChange={v => setU("fullName", v)} placeholder="Priya Sharma" autoComplete="name" required />
                  </Field>
                  <Field label="Email address">
                    <TextInput type="email" value={user.email} onChange={v => setU("email", v)} placeholder="you@example.com" inputMode="email" autoComplete="email" required />
                  </Field>
                  <Field label="Phone number">
                    <TextInput type="tel" value={user.phone} onChange={v => { if (/^\d{0,10}$/.test(v)) setU("phone", v) }} placeholder="9876543210" inputMode="numeric" required />
                  </Field>
                  <Field label="Password">
                    <PasswordInput id="upw" value={user.password} onChange={v => setU("password", v)} placeholder="Create a strong password" />
                    <PasswordStrength password={user.password} />
                  </Field>
                  <Field label="Confirm password">
                    <PasswordInput id="ucpw" value={user.confirmPassword} onChange={v => setU("confirmPassword", v)} placeholder="Repeat your password" />
                  </Field>
                  <div style={{ marginTop: "0.9rem", marginBottom: "1.1rem" }}>
                    <CheckRow id="uterms" checked={user.agreeToTerms} onChange={v => setU("agreeToTerms", v)}>
                      I agree to the <Link href="/terms">Terms of Service</Link> and <Link href="/privacy">Privacy Policy</Link>
                    </CheckRow>
                    <CheckRow id="unews" checked={user.subscribeNewsletter} onChange={v => setU("subscribeNewsletter", v)}>
                      Subscribe to legal updates and tips
                    </CheckRow>
                  </div>
                </div>
              )}

              {/* ── LAWYER FORM ── */}
              {userType === "lawyer" && (
                <div key="lawyer" className="fade-in delay-4">
                  <SectionLabel icon={<Shield size={12} />}>Personal information</SectionLabel>
                  <Field label="Full name">
                    <TextInput value={lawyer.fullName} onChange={v => setL("fullName", v)} placeholder="Advocate Rajesh Kumar" autoComplete="name" required />
                  </Field>
                  <div className="signup-row2">
                    <Field label="Email address">
                      <TextInput type="email" value={lawyer.email} onChange={v => setL("email", v)} placeholder="you@example.com" required />
                    </Field>
                    <Field label="Phone number">
                      <TextInput type="tel" value={lawyer.phone} onChange={v => { if (/^\d{0,10}$/.test(v)) setL("phone", v) }} placeholder="9876543210" required />
                    </Field>
                  </div>
                  <Field label="Bar council registration number" hint="Format varies by state council, e.g. MH/1234/2010">
                    <TextInput value={lawyer.barCouncilNumber} onChange={v => setL("barCouncilNumber", v)} placeholder="e.g. MH/1234/2010" required />
                  </Field>

                  <SectionLabel icon={<CheckCircle2 size={12} />}>Professional details</SectionLabel>
                  <div className="signup-row2">
                    <Field label="Primary specialization">
                      <SelectInput value={lawyer.specialization} onChange={v => setL("specialization", v)} options={SPECIALIZATIONS} placeholder="Select specialization" />
                    </Field>
                    <Field label="Years of experience">
                      <SelectInput
                        value={lawyer.experience}
                        onChange={v => setL("experience", v)}
                        options={Array.from({ length: 41 }, (_, i) => i.toString())}
                        placeholder="Select experience"
                      />
                    </Field>
                  </div>
                  <div className="signup-row2">
                    <Field label="State">
                      <SelectInput value={lawyer.state} onChange={v => setL("state", v)} options={INDIAN_STATES} placeholder="Select state" />
                    </Field>
                    <Field label="City">
                      <TextInput value={lawyer.city} onChange={v => setL("city", v)} placeholder="Mumbai" required />
                    </Field>
                  </div>

                  <SectionLabel icon={<Shield size={12} />}>Security</SectionLabel>
                  <Field label="Password">
                    <PasswordInput id="lpw" value={lawyer.password} onChange={v => setL("password", v)} placeholder="Create a strong password" />
                    <PasswordStrength password={lawyer.password} />
                  </Field>
                  <Field label="Confirm password">
                    <PasswordInput id="lcpw" value={lawyer.confirmPassword} onChange={v => setL("confirmPassword", v)} placeholder="Repeat your password" />
                  </Field>

                  <div className="verify-note">
                    <span className="verify-icon"><Shield size={14} /></span>
                    <div className="verify-text">Our team will verify your Bar Council number and credentials within 2–3 business days before your profile goes live.</div>
                  </div>
                  <div style={{ marginTop: "0.9rem", marginBottom: "1.1rem" }}>
                    <CheckRow id="lterms" checked={lawyer.agreeToTerms} onChange={v => setL("agreeToTerms", v)}>
                      I agree to the <Link href="/terms">Terms of Service</Link> and <Link href="/privacy">Privacy Policy</Link>
                    </CheckRow>
                    <CheckRow id="lnews" checked={lawyer.subscribeNewsletter} onChange={v => setL("subscribeNewsletter", v)}>
                      Subscribe to professional updates and tips
                    </CheckRow>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="submit-btn fade-in delay-5"
                disabled={loading || !agreeToTerms}
              >
                {loading ? (
                  <span className="spinner"><span className="spin" />Creating account…</span>
                ) : (
                  <>
                    {userType === "business" && "Create business account"}
                    {userType === "lawyer" && "Create lawyer account"}
                    {userType === "user" && "Create individual account"}
                  </>
                )}
              </button>
            </form>

            <div className="signin-link fade-in delay-6">Already have an account? <Link href="/auth/login">Sign in here</Link></div>
            <div className="trust-badges fade-in delay-6">
              <span>256-bit encrypted</span><span className="trust-dot" />
              <span>Bar Council compliant</span><span className="trust-dot" />
              <span>DPDP Act 2023</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Post-signup dialog ── */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "14px", color: "#0a0a0a", fontFamily: "'Cormorant Garamond',serif" }}>
          <DialogHeader>
            <DialogTitle style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "1.4rem", color: "#0a0a0a", fontWeight: 400 }}>
              Almost there!
            </DialogTitle>
            <DialogDescription style={{ color: "#6b6b6b", fontSize: "13.5px", lineHeight: 1.6 }}>
              {userType === "business"
                ? "Your business account has been created. Please log in to complete your company profile and get matched with the right legal and compliance support."
                : "You've successfully signed up as a legal professional. Please log in and complete your profile to start receiving clients."}
            </DialogDescription>
          </DialogHeader>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "1rem" }}>
            <button type="button" onClick={() => setShowDialog(false)} style={{ padding: "9px 16px", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.12)", background: "transparent", color: "#6b6b6b", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: "13px" }}>
              Close
            </button>
            <button type="button" onClick={() => router.push("/auth/login")} style={{ padding: "9px 18px", borderRadius: "8px", border: "none", background: "linear-gradient(135deg,#8b6914,#c9a84c)", color: "#ffffff", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: "13px", fontWeight: 500 }}>
              Login now
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}