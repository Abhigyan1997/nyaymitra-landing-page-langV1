"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"
import { Eye, EyeOff, Shield, Scale, CheckCircle2 } from "lucide-react"
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
  fullName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
  subscribeNewsletter: boolean
}
interface UserFormData extends BaseFormData { }
interface LawyerFormData extends BaseFormData {
  barCouncilNumber: string
  specialization: string
  experience: string
  state: string
  city: string
}
type UserType = "user" | "lawyer"

// --- Constants ---
const BASE_API_URL = "https://nyaymitra-backend-production.up.railway.app/api/v1/auth"
const SPECIALIZATIONS = ["Criminal Law", "Family Law", "Property Law", "Corporate Law", "Consumer Rights", "Cyber Law", "Labor Law", "Tax Law", "Immigration Law", "Intellectual Property", "Environmental Law", "Constitutional Law"]
const INDIAN_STATES = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir", "Ladakh"]

// --- SVG Logo ---
function ScalesIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <path d="M11 3v16M5.5 7l5.5-4 5.5 4" stroke="rgba(255,255,255,.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 12.5c0 2.5 2 4.5 4.5 4.5S11 15 11 12.5L6.5 8 2 12.5z" fill="rgba(255,255,255,.15)" stroke="rgba(255,255,255,.85)" strokeWidth="1.3" />
      <path d="M11 12.5c0 2.5 2 4.5 4.5 4.5S20 15 20 12.5L15.5 8 11 12.5z" fill="rgba(255,255,255,.15)" stroke="rgba(255,255,255,.85)" strokeWidth="1.3" />
    </svg>
  )
}

// --- Reusable field components ---
function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="nm-field">
      <label className="nm-label">{label}</label>
      {children}
      {hint && <span className="nm-hint">{hint}</span>}
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
      className="nm-inp"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
  )
}

function PasswordInput({ id, value, onChange, placeholder }: { id: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  const [show, setShow] = useState(false)
  return (
    <div className="nm-inp-wrap">
      <input
        className="nm-inp"
        id={id}
        type={show ? "text" : "password"}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ paddingRight: "46px" }}
        required
        autoComplete="new-password"
      />
      <button type="button" className="nm-eye" onClick={() => setShow(!show)} aria-label="Toggle password">
        {show ? <EyeOff size={15} /> : <Eye size={15} />}
      </button>
    </div>
  )
}

function SelectInput({ value, onChange, options, placeholder }: { value: string; onChange: (v: string) => void; options: string[]; placeholder: string }) {
  return (
    <select className="nm-sel" value={value} onChange={e => onChange(e.target.value)} required>
      <option value="" disabled>{placeholder}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

function SectionLabel({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="nm-section-label">
      {icon && <span className="nm-section-icon">{icon}</span>}
      {children}
    </div>
  )
}

function CheckRow({ id, checked, onChange, children }: { id: string; checked: boolean; onChange: (v: boolean) => void; children: React.ReactNode }) {
  return (
    <label className="nm-check-row" htmlFor={id}>
      <input className="nm-cb" type="checkbox" id={id} checked={checked} onChange={e => onChange(e.target.checked)} />
      <span className="nm-check-lbl">{children}</span>
    </label>
  )
}

// Password strength indicator
function PasswordStrength({ password }: { password: string }) {
  if (!password) return null
  const score = [/.{8,}/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter(r => r.test(password)).length
  const labels = ["", "Weak", "Fair", "Good", "Strong"]
  const colors = ["", "#e05252", "#e09052", "#7fa84a", "#4a9e6b"]
  return (
    <div className="nm-pw-strength">
      <div className="nm-pw-bars">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="nm-pw-bar" style={{ background: i <= score ? colors[score] : "rgba(255,255,255,.07)" }} />
        ))}
      </div>
      {score > 0 && <span className="nm-pw-label" style={{ color: colors[score] }}>{labels[score]}</span>}
    </div>
  )
}

// --- Main Page ---
export default function SignupPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<UserType>("user")
  const [showDialog, setShowDialog] = useState(false)
  const [loading, setLoading] = useState(false)

  const [user, setUser] = useState<UserFormData>({ fullName: "", email: "", phone: "", password: "", confirmPassword: "", agreeToTerms: false, subscribeNewsletter: false })
  const [lawyer, setLawyer] = useState<LawyerFormData>({ fullName: "", email: "", phone: "", password: "", confirmPassword: "", barCouncilNumber: "", specialization: "", experience: "", state: "", city: "", agreeToTerms: false, subscribeNewsletter: false })

  const setU = (field: keyof UserFormData, v: string | boolean) => setUser(p => ({ ...p, [field]: v }))
  const setL = (field: keyof LawyerFormData, v: string | boolean) => setLawyer(p => ({ ...p, [field]: v }))

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    const data = userType === "user" ? user : lawyer
    if (data.password !== data.confirmPassword) { toast.error("Passwords do not match"); return }
    setLoading(true)
    try {
      const url = userType === "user" ? `${BASE_API_URL}/register-user` : `${BASE_API_URL}/register-lawyer`
      const res = await axios.post(url, data, { headers: { "Content-Type": "application/json" } })
      if (res.status === 201) {
        toast.success(res.data.message || "Account created successfully!")
        if (userType === "user") {
          setUser({ fullName: "", email: "", phone: "", password: "", confirmPassword: "", agreeToTerms: false, subscribeNewsletter: false })
          setTimeout(() => router.push("/auth/login"), 1200)
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
  }, [userType, user, lawyer, router])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .nm-root {
          min-height: 100svh; display: grid; grid-template-columns: 1fr;
          font-family: 'DM Sans', sans-serif; background: #0a0b0f; color: #f0ede8;
        }
        @media (min-width: 780px) {
          .nm-root { grid-template-columns: 420px 1fr; }
          .nm-mob-hero { display: none !important; }
          .nm-desk-left { display: flex !important; }
          .nm-fp { padding: 2.5rem 3rem; }
          .nm-fi { max-width: 440px; }
        }
        @media (max-width: 779px) {
          .nm-desk-left { display: none !important; }
          .nm-mob-hero { display: block !important; }
          .nm-fp { padding: 1.75rem 1.5rem 2.5rem; }
          .nm-fi { max-width: 100%; }
          .nm-f-brand { display: none !important; }
          .nm-row2 { grid-template-columns: 1fr !important; }
        }

        /* ── Desktop left ── */
        .nm-desk-left {
          display: none; position: sticky; top: 0; height: 100svh; overflow: hidden;
          background: #0d0f16; flex-direction: column;
          justify-content: space-between; padding: 2.5rem;
          border-right: 1px solid rgba(255,255,255,.06);
        }
        .nm-glow {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 70% 55% at 15% 85%, rgba(80,100,200,.24) 0%, transparent 70%),
            radial-gradient(ellipse 55% 45% at 85% 15%, rgba(140,90,210,.16) 0%, transparent 70%);
        }
        .nm-grid-bg {
          position: absolute; inset: 0; pointer-events: none;
          background-image: linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
          background-size: 44px 44px;
        }
        .nm-d-brand { position: relative; z-index: 1; display: flex; align-items: center; gap: 10px; }
        .nm-d-icon { width: 40px; height: 40px; border-radius: 10px; background: linear-gradient(135deg,#4f63b8,#8b5bc7); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .nm-d-bname { font-size: 15px; font-weight: 500; color: #d8d3cc; letter-spacing: -.01em; }
        .nm-d-btag { font-size: 10px; color: #3a3835; text-transform: uppercase; letter-spacing: .07em; margin-top: 2px; }

        .nm-d-hero { position: relative; z-index: 1; }
        .nm-d-headline { font-family: 'Instrument Serif', serif; font-style: italic; font-size: 2rem; line-height: 1.2; letter-spacing: -.025em; color: #f0ede8; margin-bottom: .5rem; }
        .nm-d-tagline { font-size: 13px; color: #3d3c3a; line-height: 1.5; max-width: 280px; }

        .nm-steps { position: relative; z-index: 1; }
        .nm-steps-title { font-size: 10px; font-weight: 500; color: #2e2d2b; text-transform: uppercase; letter-spacing: .1em; margin-bottom: 1rem; }
        .nm-step { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 1.1rem; }
        .nm-step-num { width: 24px; height: 24px; border-radius: 50%; background: linear-gradient(135deg,#4f63b8,#7048be); display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 500; color: #fff; flex-shrink: 0; margin-top: 1px; }
        .nm-step-title { font-size: 12.5px; font-weight: 500; color: #c0bbb4; margin-bottom: 1px; }
        .nm-step-desc { font-size: 11px; color: #3e3d3b; line-height: 1.45; }

        .nm-d-stats { position: relative; z-index: 1; display: flex; gap: 1.25rem; background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.06); border-radius: 12px; padding: 1rem 1.25rem; }
        .nm-d-sep { width: 1px; background: rgba(255,255,255,.06); align-self: stretch; }
        .nm-d-stat { flex: 1; }
        .nm-d-sn { font-family: 'Instrument Serif', serif; font-size: 1.5rem; color: #e8e3dc; line-height: 1; }
        .nm-d-sl { font-size: 10px; color: #2e2d2b; text-transform: uppercase; letter-spacing: .07em; margin-top: 3px; }

        /* ── Mobile hero ── */
        .nm-mob-hero {
          display: none; position: relative; overflow: hidden;
          background: #0d0f16; padding: 2.75rem 1.5rem 1.75rem;
          border-bottom: 1px solid rgba(255,255,255,.06);
        }
        .nm-m-brand { position: relative; z-index: 1; display: flex; align-items: center; gap: 10px; margin-bottom: 1.4rem; }
        .nm-m-icon { width: 36px; height: 36px; border-radius: 9px; background: linear-gradient(135deg,#4f63b8,#8b5bc7); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .nm-m-bname { font-size: 15px; font-weight: 500; color: #d8d3cc; letter-spacing: -.01em; }
        .nm-m-btag { font-size: 10px; color: #3a3835; text-transform: uppercase; letter-spacing: .07em; }
        .nm-m-h { position: relative; z-index: 1; font-family: 'Instrument Serif', serif; font-style: italic; font-size: 1.85rem; line-height: 1.2; letter-spacing: -.025em; color: #f0ede8; margin-bottom: .35rem; }
        .nm-m-sub { position: relative; z-index: 1; font-size: 12.5px; color: #4a4845; margin-bottom: 1.4rem; }
        .nm-m-stats { position: relative; z-index: 1; display: grid; grid-template-columns: repeat(3, 1fr); background: #111318; border-radius: 10px; overflow: hidden; border: 1px solid rgba(255,255,255,.07); }
        .nm-m-stat { padding: 10px 0; text-align: center; }
        .nm-m-stat + .nm-m-stat { border-left: 1px solid rgba(255,255,255,.06); }
        .nm-m-sn { font-family: 'Instrument Serif', serif; font-size: 1.1rem; color: #d8d3cc; line-height: 1; }
        .nm-m-sl { font-size: 9px; color: #3a3835; text-transform: uppercase; letter-spacing: .06em; margin-top: 3px; }

        /* ── Form panel ── */
        .nm-fp { display: flex; align-items: flex-start; justify-content: center; background: #0a0b0f; overflow-y: auto; }
        .nm-fi { width: 100%; padding-top: .5rem; padding-bottom: 2rem; }

        /* Brand (desktop only, hidden on mobile via .nm-f-brand) */
        .nm-f-brand { display: flex; align-items: center; gap: 9px; margin-bottom: 1.8rem; text-decoration: none; }
        .nm-f-icon { width: 30px; height: 30px; border-radius: 8px; flex-shrink: 0; background: linear-gradient(135deg,#4f63b8,#8b5bc7); display: flex; align-items: center; justify-content: center; }
        .nm-f-bname { font-size: 14px; font-weight: 500; color: #d0cbc4; letter-spacing: -.01em; }

        /* Role badge — replaces duplicate h1 */
        .nm-role-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 10px; border-radius: 6px; margin-bottom: 1.4rem;
          background: rgba(85,104,204,.12); border: 1px solid rgba(85,104,204,.2);
          font-size: 11.5px; font-weight: 500; color: #7a8fd4;
          transition: all .2s;
        }
        .nm-role-badge-dot { width: 5px; height: 5px; border-radius: 50%; background: #5568cc; }

        /* Type toggle */
        .nm-toggle { display: flex; gap: 4px; background: #111318; border: 1px solid rgba(255,255,255,.08); border-radius: 10px; padding: 4px; margin-bottom: 1.4rem; }
        .nm-tab {
          flex: 1; min-height: 40px; padding: 8px; border-radius: 7px; border: none;
          font-family: 'DM Sans', sans-serif; font-size: 12.5px; cursor: pointer;
          color: #4a4845; background: transparent;
          display: flex; align-items: center; justify-content: center; gap: 5px;
          transition: all .2s cubic-bezier(.4,0,.2,1);
          -webkit-tap-highlight-color: transparent;
        }
        .nm-tab.active { background: #1c1f2a; color: #d0cbc4; border: 1px solid rgba(255,255,255,.1); box-shadow: 0 1px 4px rgba(0,0,0,.5); }
        .nm-tab-dot { width: 5px; height: 5px; border-radius: 50%; background: #5568cc; opacity: 0; transition: opacity .2s; flex-shrink: 0; }
        .nm-tab.active .nm-tab-dot { opacity: 1; }

        /* Section labels */
        .nm-section-label {
          display: flex; align-items: center; gap: 6px;
          font-size: 10px; font-weight: 500; color: #3a3835;
          text-transform: uppercase; letter-spacing: .09em;
          margin: 1.2rem 0 .75rem; padding-bottom: .5rem;
          border-bottom: 1px solid rgba(255,255,255,.06);
        }
        .nm-section-icon { color: #4f63b8; display: flex; align-items: center; }

        /* Fields */
        .nm-field { margin-bottom: .75rem; }
        .nm-label { display: block; font-size: 10.5px; font-weight: 500; color: #4a4845; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 5px; }
        .nm-hint { display: block; font-size: 10.5px; color: #2e2d2b; margin-top: 4px; line-height: 1.4; }
        .nm-inp {
          width: 100%; background: #111318; border: 1px solid rgba(255,255,255,.09); border-radius: 9px;
          padding: 10px 13px; min-height: 44px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #e0dbd3;
          outline: none; transition: border-color .15s, box-shadow .15s, background .15s;
        }
        .nm-inp::placeholder { color: #252422; }
        .nm-inp:focus { border-color: rgba(99,120,200,.6); box-shadow: 0 0 0 3px rgba(99,120,200,.1); background: #12141c; }
        .nm-inp:hover:not(:focus) { border-color: rgba(255,255,255,.14); }
        .nm-inp-wrap { position: relative; }
        .nm-eye { position: absolute; right: 0; top: 0; bottom: 0; width: 44px; background: none; border: none; cursor: pointer; color: #3a3835; display: flex; align-items: center; justify-content: center; transition: color .15s; -webkit-tap-highlight-color: transparent; }
        .nm-eye:hover { color: #7a7672; }
        .nm-sel {
          width: 100%; background: #111318; border: 1px solid rgba(255,255,255,.09); border-radius: 9px;
          padding: 10px 36px 10px 13px; min-height: 44px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #e0dbd3;
          outline: none; appearance: none; cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%234a4845' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 12px center;
          transition: border-color .15s, box-shadow .15s, background .15s;
        }
        .nm-sel:focus { border-color: rgba(99,120,200,.6); box-shadow: 0 0 0 3px rgba(99,120,200,.1); background: #12141c; }
        .nm-sel:hover:not(:focus) { border-color: rgba(255,255,255,.14); }
        .nm-sel option { background: #1a1d26; color: #e0dbd3; }
        .nm-row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

        /* Password strength */
        .nm-pw-strength { display: flex; align-items: center; gap: 8px; margin-top: 6px; }
        .nm-pw-bars { display: flex; gap: 3px; }
        .nm-pw-bar { width: 28px; height: 3px; border-radius: 2px; transition: background .25s; }
        .nm-pw-label { font-size: 10.5px; font-weight: 500; }

        /* Verify note */
        .nm-verify-note {
          background: linear-gradient(135deg, rgba(79,99,184,.1), rgba(112,72,190,.1));
          border: 1px solid rgba(99,120,200,.2); border-radius: 10px;
          padding: 12px 14px; margin: .5rem 0 .9rem;
          display: flex; gap: 10px; align-items: flex-start;
        }
        .nm-verify-icon { color: #5568cc; flex-shrink: 0; margin-top: 1px; }
        .nm-verify-text { font-size: 11.5px; color: #6070b8; line-height: 1.55; }

        /* Checks */
        .nm-checks { margin: .6rem 0 1.1rem; }
        .nm-check-row { display: flex; align-items: flex-start; gap: 9px; margin-bottom: .6rem; cursor: pointer; }
        .nm-cb { width: 16px; height: 16px; flex-shrink: 0; border: 1px solid rgba(255,255,255,.14); border-radius: 4px; background: #111318; appearance: none; cursor: pointer; position: relative; transition: all .15s; margin-top: 1px; }
        .nm-cb:checked { background: #4f63b8; border-color: #4f63b8; }
        .nm-cb:checked::after { content: ''; position: absolute; left: 4px; top: 1px; width: 4px; height: 7px; border: 1.5px solid white; border-top: none; border-left: none; transform: rotate(45deg); }
        .nm-check-lbl { font-size: 12px; color: #4a4845; line-height: 1.45; }
        .nm-check-lbl a { color: #5568cc; text-decoration: none; }
        .nm-check-lbl a:hover { text-decoration: underline; }

        /* Submit button */
        .nm-btn {
          width: 100%; padding: 13px; min-height: 50px;
          background: linear-gradient(135deg, #4f63b8 0%, #7048be 100%);
          border: none; border-radius: 10px; font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 500; color: #fff; cursor: pointer;
          letter-spacing: .01em; transition: opacity .15s, transform .12s, box-shadow .15s;
          position: relative; overflow: hidden;
          -webkit-tap-highlight-color: transparent;
        }
        .nm-btn::before { content: ''; position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(255,255,255,.1), transparent); pointer-events: none; }
        .nm-btn:hover:not(:disabled) { opacity: .9; box-shadow: 0 4px 20px rgba(79,99,184,.35); }
        .nm-btn:active:not(:disabled) { transform: scale(.985); }
        .nm-btn:disabled { opacity: .35; cursor: not-allowed; }
        .nm-spinner { display: inline-flex; align-items: center; gap: 8px; }
        .nm-spin { width: 14px; height: 14px; border-radius: 50%; border: 2px solid rgba(255,255,255,.3); border-top-color: #fff; animation: spin .6s linear infinite; flex-shrink: 0; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .nm-signin { text-align: center; font-size: 12.5px; color: #3a3835; margin-top: 1.1rem; }
        .nm-signin a { color: #5568cc; text-decoration: none; }
        .nm-signin a:hover { text-decoration: underline; }
        .nm-trust { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 5px; font-size: 10px; color: #252422; margin-top: .9rem; }
        .nm-trust-dot { width: 3px; height: 3px; border-radius: 50%; background: #1e1c1a; flex-shrink: 0; }

        .nm-fade { animation: nmfade .42s ease both; }
        @keyframes nmfade { from { opacity: 0; transform: translateY(7px); } to { opacity: 1; transform: translateY(0); } }
        .nm-d1{animation-delay:.04s}.nm-d2{animation-delay:.09s}.nm-d3{animation-delay:.14s}
        .nm-d4{animation-delay:.19s}.nm-d5{animation-delay:.24s}.nm-d6{animation-delay:.29s}

        /* Form transition */
        .nm-form-body { animation: nmfade .3s ease both; }
      `}</style>

      <div className="nm-root">
        {/* ── Desktop Left (sticky) ── */}
        <div className="nm-desk-left">
          <div className="nm-glow" /><div className="nm-grid-bg" />

          <div className="nm-d-brand">
            <div className="nm-d-icon"><ScalesIcon size={20} /></div>
            <div>
              <div className="nm-d-bname">NyayMitra</div>
              <div className="nm-d-btag">Legal Intelligence Platform</div>
            </div>
          </div>

          <div className="nm-d-hero">
            <div className="nm-d-headline">Justice made<br />accessible.</div>
            <div className="nm-d-tagline">AI-powered legal guidance for every Indian citizen — in the language you understand.</div>
          </div>

          <div className="nm-steps">
            <div className="nm-steps-title">How it works</div>
            {[
              { n: 1, t: "Create your account", d: "Sign up as an individual or legal professional in under 2 minutes." },
              { n: 2, t: "Describe your situation", d: "Our AI understands your legal query in plain language — no jargon needed." },
              { n: 3, t: "Get expert guidance", d: "Receive AI-powered advice or connect directly with a verified lawyer." },
              { n: 4, t: "Resolve with confidence", d: "Track your case, book consultations, and access documents — all in one place." },
            ].map(s => (
              <div className="nm-step" key={s.n}>
                <div className="nm-step-num">{s.n}</div>
                <div><div className="nm-step-title">{s.t}</div><div className="nm-step-desc">{s.d}</div></div>
              </div>
            ))}
          </div>

          <div className="nm-d-stats">
            <div className="nm-d-stat"><div className="nm-d-sn">100+</div><div className="nm-d-sl">Cases advised</div></div>
            <div className="nm-d-sep" />
            <div className="nm-d-stat"><div className="nm-d-sn">60+</div><div className="nm-d-sl">Verified lawyers</div></div>
            <div className="nm-d-sep" />
            <div className="nm-d-stat"><div className="nm-d-sn">18</div><div className="nm-d-sl">States covered</div></div>
          </div>
        </div>

        {/* ── Mobile Hero ── */}
        <div className="nm-mob-hero">
          <div className="nm-glow" /><div className="nm-grid-bg" />
          <div className="nm-m-brand">
            <div className="nm-m-icon"><ScalesIcon size={18} /></div>
            <div><div className="nm-m-bname">NyayMitra</div><div className="nm-m-btag">Legal Intelligence Platform</div></div>
          </div>
          <div className="nm-m-h">Justice made accessible.</div>
          <div className="nm-m-sub">AI-powered legal guidance for every Indian citizen</div>
          <div className="nm-m-stats">
            <div className="nm-m-stat"><div className="nm-m-sn">100+</div><div className="nm-m-sl">Cases</div></div>
            <div className="nm-m-stat"><div className="nm-m-sn">60+</div><div className="nm-m-sl">Lawyers</div></div>
            <div className="nm-m-stat"><div className="nm-m-sn">18</div><div className="nm-m-sl">States</div></div>
          </div>
        </div>

        {/* ── Form Panel ── */}
        <div className="nm-fp">
          <div className="nm-fi">
            {/* Desktop-only brand link */}
            <Link href="/" className="nm-f-brand nm-fade nm-d1">
              <div className="nm-f-icon"><ScalesIcon size={14} /></div>
              <span className="nm-f-bname">NyayMitra</span>
            </Link>

            {/* Role toggle */}
            <div className="nm-toggle nm-fade nm-d2">
              <button className={`nm-tab ${userType === "user" ? "active" : ""}`} type="button" onClick={() => setUserType("user")}>
                <span className="nm-tab-dot" />Individual
              </button>
              <button className={`nm-tab ${userType === "lawyer" ? "active" : ""}`} type="button" onClick={() => setUserType("lawyer")}>
                <span className="nm-tab-dot" />Legal Professional
              </button>
            </div>

            {/* Role badge — concise context instead of repeated h1 */}
            <div className="nm-role-badge nm-fade nm-d3">
              <span className="nm-role-badge-dot" />
              {userType === "user" ? "Individual account registration" : "Lawyer account registration"}
            </div>

            <form onSubmit={handleSubmit}>
              {userType === "user" ? (
                <div key="user" className="nm-form-body">
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
                  <div className="nm-checks">
                    <CheckRow id="uterms" checked={user.agreeToTerms} onChange={v => setU("agreeToTerms", v)}>
                      I agree to the <Link href="/terms">Terms of Service</Link> and <Link href="/privacy">Privacy Policy</Link>
                    </CheckRow>
                    <CheckRow id="unews" checked={user.subscribeNewsletter} onChange={v => setU("subscribeNewsletter", v)}>
                      Subscribe to legal updates and tips
                    </CheckRow>
                  </div>
                </div>
              ) : (
                <div key="lawyer" className="nm-form-body">
                  <SectionLabel icon={<Scale size={12} />}>Personal information</SectionLabel>
                  <Field label="Full name">
                    <TextInput value={lawyer.fullName} onChange={v => setL("fullName", v)} placeholder="Advocate Rajesh Kumar" autoComplete="name" required />
                  </Field>
                  <div className="nm-row2">
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
                  <div className="nm-row2">
                    <Field label="Primary specialization">
                      <SelectInput value={lawyer.specialization} onChange={v => setL("specialization", v)} options={SPECIALIZATIONS} placeholder="Select specialization" />
                    </Field>
                    <Field label="Years of experience">
                      <SelectInput value={lawyer.experience} onChange={v => setL("experience", v)} options={Array.from({ length: 41 }, (_, i) => `${i} ${i === 1 ? "year" : "years"}`)} placeholder="Select experience" />
                    </Field>
                  </div>
                  <div className="nm-row2">
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

                  <div className="nm-verify-note">
                    <span className="nm-verify-icon"><Shield size={14} /></span>
                    <div className="nm-verify-text">Our team will verify your Bar Council number and credentials within 2–3 business days before your profile goes live.</div>
                  </div>
                  <div className="nm-checks">
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
                className="nm-btn"
                disabled={loading || (userType === "user" ? !user.agreeToTerms : !lawyer.agreeToTerms)}
              >
                {loading ? (
                  <span className="nm-spinner"><span className="nm-spin" />Creating account…</span>
                ) : (
                  userType === "user" ? "Create individual account" : "Create lawyer account"
                )}
              </button>
            </form>

            <div className="nm-signin">Already have an account? <Link href="/auth/login">Sign in here</Link></div>
            <div className="nm-trust">
              <span>256-bit encrypted</span><span className="nm-trust-dot" />
              <span>Bar Council compliant</span><span className="nm-trust-dot" />
              <span>DPDP Act 2023</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Post-signup dialog (lawyer) ── */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent style={{ background: "#13151c", border: "1px solid rgba(255,255,255,.1)", borderRadius: "14px", color: "#f0ede8", fontFamily: "'DM Sans',sans-serif" }}>
          <DialogHeader>
            <DialogTitle style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontSize: "1.4rem", color: "#f0ede8", fontWeight: 400 }}>
              Almost there!
            </DialogTitle>
            <DialogDescription style={{ color: "#5a5754", fontSize: "13.5px", lineHeight: 1.6 }}>
              You've successfully signed up as a legal professional. Please log in and complete your profile to start receiving clients.
            </DialogDescription>
          </DialogHeader>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "1rem" }}>
            <button type="button" onClick={() => setShowDialog(false)} style={{ padding: "9px 16px", borderRadius: "8px", border: "1px solid rgba(255,255,255,.1)", background: "transparent", color: "#8a8582", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: "13px" }}>
              Close
            </button>
            <button type="button" onClick={() => router.push("/auth/login")} style={{ padding: "9px 18px", borderRadius: "8px", border: "none", background: "linear-gradient(135deg,#4f63b8,#7048be)", color: "#fff", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: "13px", fontWeight: 500 }}>
              Login now
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}