"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"
import { Eye, EyeOff, Shield, CheckCircle2, Scale } from "lucide-react"
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

// Password strength indicator
function PasswordStrength({ password }: { password: string }) {
  if (!password) return null
  const score = [/.{8,}/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter(r => r.test(password)).length
  const labels = ["", "Weak", "Fair", "Good", "Strong"]
  const colors = ["", "#d4574a", "#d4954a", "#a5a84a", "#6b9d4a"]
  return (
    <div className="password-strength">
      <div className="strength-bars">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="strength-bar" style={{ background: i <= score ? colors[score] : "rgba(255,255,255,.05)" }} />
        ))}
      </div>
      {score > 0 && <span className="strength-label" style={{ color: colors[score] }}>{labels[score]}</span>}
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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=DM+Mono:wght@400;500&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

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
        }

        body {
          background: var(--ink);
          font-family: var(--sans);
        }

        .signup-root {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr;
          background: var(--ink);
        }

        @media (min-width: 768px) {
          .signup-root {
            grid-template-columns: 1fr 1fr;
          }
          .mobile-hero { display: none !important; }
          .desktop-left { display: flex !important; }
          .form-panel { padding: 2.5rem 3.5rem; }
          .form-inner { max-width: 420px; }
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
          border-right: 1px solid rgba(255, 255, 255, 0.06);
        }

        .glow-effect {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(ellipse 70% 55% at 15% 88%, rgba(201, 168, 76, 0.08) 0%, transparent 70%),
                      radial-gradient(ellipse 55% 45% at 85% 15%, rgba(201, 168, 76, 0.05) 0%, transparent 70%);
        }

        .grid-lines {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: linear-gradient(rgba(201, 168, 76, 0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(201, 168, 76, 0.03) 1px, transparent 1px);
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
        .desktop-brand-tag { font-size: 9px; color: var(--gold-dk); text-transform: uppercase; letter-spacing: 0.12em; margin-top: 2px; font-family: var(--mono); }

        .benefits-section { position: relative; z-index: 1; }
        .benefits-title { font-size: 10px; font-weight: 600; color: var(--gold-dk); text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 1rem; font-family: var(--mono); }
        .benefit { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 1.2rem; }
        .benefit-icon { width: 24px; height: 24px; border-radius: 50%; background: linear-gradient(135deg, var(--gold-dk), var(--gold)); display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 600; color: var(--ink); flex-shrink: 0; margin-top: 1px; }
        .benefit-title { font-size: 12.5px; font-weight: 500; color: #c0bbb4; margin-bottom: 1px; }
        .benefit-desc { font-size: 11px; color: #3e3d3b; line-height: 1.45; }

        .desktop-stats {
          position: relative;
          z-index: 1;
          display: flex;
          gap: 1.8rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }
        .stat-sep { width: 1px; background: rgba(255, 255, 255, 0.06); align-self: stretch; }
        .stat-number {
          font-family: var(--serif);
          font-size: 1.6rem;
          font-weight: 600;
          color: var(--gold);
          line-height: 1;
        }
        .stat-label { font-size: 9px; color: #4a4845; text-transform: uppercase; letter-spacing: 0.08em; margin-top: 4px; font-family: var(--mono); }

        /* Mobile Hero */
        .mobile-hero {
          display: none;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #0d0f16 0%, #0a0b0f 100%);
          padding: 2rem 1.5rem 1.8rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .mobile-brand {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1.8rem;
          text-decoration: none;
        }
        .mobile-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: linear-gradient(135deg, var(--gold-dk), var(--gold));
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mobile-brand-name { font-size: 16px; font-weight: 600; color: #e8e3dc; font-family: var(--serif); }
        .mobile-brand-tag { font-size: 9px; color: var(--gold-dk); text-transform: uppercase; letter-spacing: 0.12em; font-family: var(--mono); }
        .mobile-title {
          font-family: var(--serif);
          font-style: italic;
          font-size: 2rem;
          line-height: 1.2;
          letter-spacing: -0.025em;
          color: #f0ede8;
          margin-bottom: 0.4rem;
        }
        .mobile-sub {
          font-size: 12px;
          color: #4a4845;
          margin-bottom: 1.2rem;
        }
        .mobile-stats {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .mobile-stat {
          padding: 10px 0;
          text-align: center;
        }
        .mobile-stat + .mobile-stat { border-left: 1px solid rgba(255, 255, 255, 0.06); }
        .mobile-stat-number {
          font-family: var(--serif);
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--gold);
          line-height: 1;
        }
        .mobile-stat-label {
          font-size: 8px;
          color: #4a4845;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-top: 4px;
          font-family: var(--mono);
        }

        /* Form Panel */
        .form-panel {
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--ink);
          overflow-y: auto;
        }
        .form-inner { width: 100%; padding-top: 0.5rem; padding-bottom: 2rem; }

        .form-brand {
          align-items: center;
          gap: 10px;
          margin-bottom: 1.8rem;
          text-decoration: none;
        }
        .form-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: linear-gradient(135deg, var(--gold-dk), var(--gold));
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .form-brand-name { font-size: 14px; font-weight: 600; color: #d0cbc4; font-family: var(--serif); letter-spacing: -0.01em; }

        .role-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 7px;
          margin-bottom: 1.4rem;
          background: rgba(201, 168, 76, 0.1);
          border: 1px solid rgba(201, 168, 76, 0.2);
          font-size: 11.5px;
          font-weight: 500;
          color: #a89c6f;
          transition: all 0.2s;
          font-family: var(--mono);
        }
        .role-badge-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--gold); }

        .form-title {
          font-family: var(--serif);
          font-style: italic;
          font-size: 2rem;
          color: #f0ede8;
          letter-spacing: -0.025em;
          line-height: 1.2;
          margin-bottom: 0.4rem;
        }
        .form-sub {
          font-size: 12px;
          color: #4a4845;
          margin-bottom: 1.6rem;
        }

        /* Toggle */
        .user-toggle {
          display: flex;
          gap: 6px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          padding: 4px;
          margin-bottom: 1.5rem;
        }
        .toggle-btn {
          flex: 1;
          min-height: 46px;
          padding: 9px 12px;
          border-radius: 8px;
          border: none;
          font-family: var(--sans);
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          color: #4a4845;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.2s ease;
        }
        .toggle-btn.active {
          background: rgba(201, 168, 76, 0.1);
          color: var(--gold);
          border: 1px solid rgba(201, 168, 76, 0.25);
        }
        .toggle-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--gold);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .toggle-btn.active .toggle-dot { opacity: 1; }

        /* Form Fields */
        .form-field { margin-bottom: 1rem; }
        .form-label {
          display: block;
          font-size: 10px;
          font-weight: 600;
          color: #4a4845;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 6px;
          font-family: var(--mono);
        }
        .form-hint {
          display: block;
          font-size: 10.5px;
          color: #2e2d2b;
          margin-top: 4px;
          line-height: 1.4;
          font-family: var(--mono);
        }
        .form-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 12px 14px;
          font-family: var(--sans);
          font-size: 14px;
          color: #e0dbd3;
          outline: none;
          transition: all 0.2s;
        }
        .form-input::placeholder { color: #2a2826; }
        .form-input:focus {
          border-color: rgba(201, 168, 76, 0.5);
          box-shadow: 0 0 0 3px rgba(201, 168, 76, 0.1);
          background: rgba(255, 255, 255, 0.05);
        }
        .form-input:hover:not(:focus) { border-color: rgba(255, 255, 255, 0.14); }

        .input-wrapper { position: relative; }
        .password-toggle {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 48px;
          background: none;
          border: none;
          cursor: pointer;
          color: #4a4845;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s;
        }
        .password-toggle:hover { color: var(--gold); }

        .form-select {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 12px 36px 12px 14px;
          font-family: var(--sans);
          font-size: 14px;
          color: #e0dbd3;
          outline: none;
          appearance: none;
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%234a4845' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          transition: all 0.2s;
        }
        .form-select:focus {
          border-color: rgba(201, 168, 76, 0.5);
          box-shadow: 0 0 0 3px rgba(201, 168, 76, 0.1);
          background: rgba(255, 255, 255, 0.05);
        }
        .form-select:hover:not(:focus) { border-color: rgba(255, 255, 255, 0.14); }
        .form-select option { background: #1a1d26; color: #e0dbd3; }

        .signup-row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

        /* Section Labels */
        .section-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 600;
          color: var(--gold-dk);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 1.2rem 0 0.75rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          font-family: var(--mono);
        }
        .section-icon { color: var(--gold); display: flex; align-items: center; }

        /* Password Strength */
        .password-strength { display: flex; align-items: center; gap: 8px; margin-top: 6px; }
        .strength-bars { display: flex; gap: 3px; }
        .strength-bar { width: 28px; height: 3px; border-radius: 2px; transition: background 0.25s; }
        .strength-label { font-size: 10.5px; font-weight: 500; font-family: var(--mono); }

        /* Verification Note */
        .verify-note {
          background: linear-gradient(135deg, rgba(201, 168, 76, 0.08), rgba(139, 105, 20, 0.05));
          border: 1px solid rgba(201, 168, 76, 0.15);
          border-radius: 10px;
          padding: 12px 14px;
          margin: 0.5rem 0 0.9rem;
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }
        .verify-icon { color: var(--gold); flex-shrink: 0; margin-top: 1px; }
        .verify-text { font-size: 11.5px; color: #6b6055; line-height: 1.55; }

        /* Checkboxes */
        .checkbox-row {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          margin-bottom: 0.6rem;
          cursor: pointer;
        }
        .checkbox-custom {
          width: 17px;
          height: 17px;
          flex-shrink: 0;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.03);
          appearance: none;
          cursor: pointer;
          position: relative;
          transition: all 0.15s;
          margin-top: 1px;
        }
        .checkbox-custom:checked {
          background: var(--gold);
          border-color: var(--gold);
        }
        .checkbox-custom:checked::after {
          content: '';
          position: absolute;
          left: 4px;
          top: 2px;
          width: 4px;
          height: 8px;
          border: 2px solid var(--ink);
          border-top: none;
          border-left: none;
          transform: rotate(45deg);
        }
        .checkbox-label { font-size: 12px; color: #4a4845; line-height: 1.45; }
        .checkbox-label a { color: var(--gold); text-decoration: none; }
        .checkbox-label a:hover { text-decoration: underline; }

        /* Submit Button */
        .submit-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, var(--gold-dk), var(--gold));
          border: none;
          border-radius: 10px;
          font-family: var(--sans);
          font-size: 14px;
          font-weight: 600;
          color: var(--ink);
          cursor: pointer;
          letter-spacing: 0.02em;
          transition: all 0.2s;
          position: relative;
          overflow: hidden;
        }
        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.2), transparent);
          pointer-events: none;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(201, 168, 76, 0.3);
        }
        .submit-btn:active:not(:disabled) { transform: scale(0.98); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .spinner {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .spin {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          border: 2px solid rgba(10, 10, 10, 0.3);
          border-top-color: var(--ink);
          animation: spin 0.6s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Links */
        .signin-link {
          text-align: center;
          font-size: 12px;
          color: #4a4845;
          margin-top: 1.1rem;
        }
        .signin-link a {
          color: var(--gold);
          text-decoration: none;
        }
        .signin-link a:hover { text-decoration: underline; }

        /* Trust Badges */
        .trust-badges {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 8px;
          font-size: 9px;
          color: #2a2825;
          font-family: var(--mono);
          letter-spacing: 0.05em;
          margin-top: 0.9rem;
        }
        .trust-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #1e1c1a;
        }

        /* Animations */
        .fade-in {
          animation: fadeIn 0.5s ease both;
        }
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
            <div className="desktop-icon"><Scale size={22} color="var(--ink)" /></div>
            <div>
              <div className="desktop-brand-name">NyayMitra</div>
              <div className="desktop-brand-tag">Legal Intelligence Platform</div>
            </div>
          </div>

          <div className="benefits-section">
            <div className="benefits-title">Why join nyaymitra?</div>
            {[
              { n: 1, t: "Instant access", d: "Get AI-powered legal guidance in minutes without appointments." },
              { n: 2, t: "Expert network", d: "Connect with verified lawyers across all major Indian states." },
              { n: 3, t: "Affordable", d: "Legal help tailored to your budget with flexible options." },
              { n: 4, t: "Secure & confidential", d: "Bank-level encryption protects your legal information." },
            ].map(b => (
              <div className="benefit" key={b.n}>
                <div className="benefit-icon">{b.n}</div>
                <div><div className="benefit-title">{b.t}</div><div className="benefit-desc">{b.d}</div></div>
              </div>
            ))}
          </div>

          <div className="desktop-stats">
            <div><div className="stat-number">100+</div><div className="stat-label">Cases advised</div></div>
            <div className="stat-sep" />
            <div><div className="stat-number">60+</div><div className="stat-label">Verified lawyers</div></div>
            <div className="stat-sep" />
            <div><div className="stat-number">18</div><div className="stat-label">States covered</div></div>
          </div>
        </div>

        {/* ── Mobile Hero ── */}
        <div className="mobile-hero">
          <div className="glow-effect" /><div className="grid-lines" />
          <Link href="/" className="mobile-brand">
            <div className="mobile-icon"><Scale size={18} color="var(--ink)" /></div>
            <div><div className="mobile-brand-name">NyayMitra</div><div className="mobile-brand-tag">Legal Intelligence Platform</div></div>
          </Link>
          <h1 className="mobile-title fade-in delay-1">Create your account.</h1>
          <p className="mobile-sub fade-in delay-1">Start your legal journey today</p>
          <div className="mobile-stats fade-in delay-2">
            <div className="mobile-stat"><div className="mobile-stat-number">100+</div><div className="mobile-stat-label">Cases</div></div>
            <div className="mobile-stat"><div className="mobile-stat-number">60+</div><div className="mobile-stat-label">Lawyers</div></div>
            <div className="mobile-stat"><div className="mobile-stat-number">18</div><div className="mobile-stat-label">States</div></div>
          </div>
        </div>

        {/* ── Form Panel ── */}
        <div className="form-panel">
          <div className="form-inner">
            <Link href="/" className="form-brand fade-in delay-1" style={{ display: "flex" }}>
              <div className="form-icon"><Scale size={14} color="var(--ink)" /></div>
              <span className="form-brand-name">NyayMitra</span>
            </Link>

            <h1 className="form-title fade-in delay-2">Create your account.</h1>
            <p className="form-sub fade-in delay-2">Join thousands accessing legal guidance instantly</p>

            <div className="user-toggle fade-in delay-3">
              <button className={`toggle-btn ${userType === "user" ? "active" : ""}`} type="button" onClick={() => setUserType("user")}>
                <span className="toggle-dot" />Individual
              </button>
              <button className={`toggle-btn ${userType === "lawyer" ? "active" : ""}`} type="button" onClick={() => setUserType("lawyer")}>
                <span className="toggle-dot" />Legal Professional
              </button>
            </div>

            <div className="role-badge fade-in delay-3">
              <span className="role-badge-dot" />
              {userType === "user" ? "Individual account registration" : "Lawyer account registration"}
            </div>

            <form onSubmit={handleSubmit}>
              {userType === "user" ? (
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
              ) : (
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
                      <SelectInput value={lawyer.experience} onChange={v => setL("experience", v)} options={Array.from({ length: 41 }, (_, i) => `${i} ${i === 1 ? "year" : "years"}`)} placeholder="Select experience" />
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
                disabled={loading || (userType === "user" ? !user.agreeToTerms : !lawyer.agreeToTerms)}
              >
                {loading ? (
                  <span className="spinner"><span className="spin" />Creating account…</span>
                ) : (
                  userType === "user" ? "Create individual account" : "Create lawyer account"
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

      {/* ── Post-signup dialog (lawyer) ── */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent style={{ background: "#13151c", border: "1px solid rgba(255,255,255,.1)", borderRadius: "14px", color: "#f0ede8", fontFamily: "'Cormorant Garamond',serif" }}>
          <DialogHeader>
            <DialogTitle style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "1.4rem", color: "#f0ede8", fontWeight: 400 }}>
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
            <button type="button" onClick={() => router.push("/auth/login")} style={{ padding: "9px 18px", borderRadius: "8px", border: "none", background: "linear-gradient(135deg,#8b6914,#c9a84c)", color: "#0a0a0a", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: "13px", fontWeight: 500 }}>
              Login now
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}