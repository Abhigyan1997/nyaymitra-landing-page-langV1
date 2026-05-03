"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Eye, EyeOff, Scale } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState<"user" | "lawyer">("user")
  const [formData, setFormData] = useState({ email: "", password: "", rememberMe: false })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field: string, value: string | boolean) =>
    setFormData((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post(
        "https://nyaymitra-backend-production.up.railway.app/api/v1/auth/login",
        { email: formData.email, password: formData.password },
        { withCredentials: true }
      )
      const { token, user, message } = response.data
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      localStorage.setItem("userId", user.userId)
      localStorage.setItem("userName", user.fullName)
      localStorage.setItem("userEmail", user.email)
      localStorage.setItem("userProfile", JSON.stringify(user))
      toast.success(message || "Logged in successfully!", {
        description: `Welcome back, ${user.fullName}!`,
      })
      setTimeout(() => {
        const redirectTo = new URLSearchParams(window.location.search).get("redirect") || "/"
        router.push(redirectTo)
      }, 1000)
    } catch (error: any) {
      let msg = "Login failed"
      if (error.response?.status === 401) msg = "Invalid email or password"
      else if (error.response?.status === 403) msg = "Account not verified. Please check your email."
      else if (error.response?.data?.message) msg = error.response.data.message
      else if (error.request) msg = "Network error. Please check your connection."
      toast.error("Login Failed", { description: msg })
    } finally {
      setLoading(false)
    }
  }

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

        .login-root {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr;
          background: var(--ink);
        }

        @media (min-width: 768px) {
          .login-root {
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

        .quote-section { position: relative; z-index: 1; margin-top: auto; margin-bottom: auto; }
        .quote-mark {
          font-family: var(--serif);
          font-size: 4rem;
          line-height: 0.6;
          color: rgba(201, 168, 76, 0.25);
          display: block;
          margin-bottom: 0.8rem;
        }
        .quote-text {
          font-family: var(--serif);
          font-style: italic;
          font-size: 1.1rem;
          line-height: 1.55;
          color: #ddd8d0;
          margin: 0 0 1.2rem;
          letter-spacing: -0.01em;
        }
        .quote-author {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .quote-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--gold-dk), var(--gold));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 600;
          color: var(--ink);
          flex-shrink: 0;
          font-family: var(--mono);
        }
        .quote-name { font-size: 12px; font-weight: 500; color: #c0bbb4; }
        .quote-role { font-size: 10px; color: var(--gold-dk); font-family: var(--mono); letter-spacing: 0.06em; }

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
        }
        .form-inner { width: 100%; }

        .form-brand {
          align-items: center;
          gap: 10px;
          margin-bottom: 2rem;
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
        }
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

        /* Options */
        .form-options {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.4rem;
        }
        .remember-checkbox {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          min-height: 40px;
        }
        .checkbox-custom {
          width: 17px;
          height: 17px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 4px;
          background: transparent;
          appearance: none;
          cursor: pointer;
          position: relative;
          transition: all 0.2s;
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
        .remember-label { font-size: 12px; color: #4a4845; cursor: pointer; }
        .forgot-link {
          font-size: 12px;
          color: var(--gold);
          text-decoration: none;
          transition: color 0.2s;
        }
        .forgot-link:hover { color: var(--gold-lt); }

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

        /* Divider */
        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 1.2rem 0;
        }
        .divider-line { flex: 1; height: 1px; background: rgba(255, 255, 255, 0.06); }
        .divider-text { font-size: 11px; color: #2a2826; font-family: var(--mono); }

        /* Signup Link */
        .signup-link {
          text-align: center;
          font-size: 12px;
          color: #4a4845;
          margin-bottom: 1.2rem;
        }
        .signup-link a {
          color: var(--gold);
          text-decoration: none;
          font-weight: 500;
        }
        .signup-link a:hover { color: var(--gold-lt); }

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
        .delay-8 { animation-delay: 0.4s; }
      `}</style>

      <div className="login-root">
        {/* Desktop Left Panel */}
        <div className="desktop-left">
          <div className="glow-effect" />
          <div className="grid-lines" />

          <div className="desktop-brand">
            <div className="desktop-icon">
              <Scale size={22} color="var(--ink)" />
            </div>
            <div className="desktop-brand-name">NyayMitra</div>
            <div className="desktop-brand-tag">Legal Intelligence Platform</div>
          </div>

          <div className="quote-section">
            <span className="quote-mark">"</span>
            <p className="quote-text">
              I was confused about a payment dispute. NyayMitra gave me clarity on my next legal step within minutes.
            </p>
            <div className="quote-author">
              <div className="quote-avatar">A</div>
              <div>
                <div className="quote-name">Anonymous User</div>
                <div className="quote-role">Early User</div>
              </div>
            </div>
          </div>

          <div className="desktop-stats">
            <div>
              <div className="stat-number">100+</div>
              <div className="stat-label">Cases advised</div>
            </div>
            <div className="stat-sep" />
            <div>
              <div className="stat-number">60+</div>
              <div className="stat-label">Verified lawyers</div>
            </div>
            <div className="stat-sep" />
            <div>
              <div className="stat-number">18</div>
              <div className="stat-label">States covered</div>
            </div>
          </div>
        </div>

        {/* Mobile Hero */}
        <div className="mobile-hero">
          <div className="glow-effect" />
          <div className="grid-lines" />

          <Link href="/" className="mobile-brand">
            <div className="mobile-icon">
              <Scale size={18} color="var(--ink)" />
            </div>
            <div>
              <div className="mobile-brand-name">NyayMitra</div>
              <div className="mobile-brand-tag">Legal Intelligence Platform</div>
            </div>
          </Link>

          <h1 className="mobile-title fade-in delay-1">Sign in to continue.</h1>
          <p className="mobile-sub fade-in delay-1">Access your legal workspace</p>

          <div className="mobile-stats fade-in delay-2">
            <div className="mobile-stat">
              <div className="mobile-stat-number">100+</div>
              <div className="mobile-stat-label">Cases</div>
            </div>
            <div className="mobile-stat">
              <div className="mobile-stat-number">60+</div>
              <div className="mobile-stat-label">Lawyers</div>
            </div>
            <div className="mobile-stat">
              <div className="mobile-stat-number">18</div>
              <div className="mobile-stat-label">States</div>
            </div>
          </div>
        </div>

        {/* Form Panel */}
        <div className="form-panel">
          <div className="form-inner">
            <Link href="/" className="form-brand fade-in delay-1" style={{ display: "flex" }}>
              <div className="form-icon">
                <Scale size={14} color="var(--ink)" />
              </div>
              <span className="form-brand-name">NyayMitra</span>
            </Link>

            <h1 className="form-title fade-in delay-2">Welcome back.</h1>
            <p className="form-sub fade-in delay-2">Sign in to continue to your account</p>

            <div className="user-toggle fade-in delay-3">
              <button
                className={`toggle-btn ${userType === "user" ? "active" : ""}`}
                onClick={() => setUserType("user")}
                type="button"
              >
                <span className="toggle-dot" />
                Individual
              </button>
              <button
                className={`toggle-btn ${userType === "lawyer" ? "active" : ""}`}
                onClick={() => setUserType("lawyer")}
                type="button"
              >
                <span className="toggle-dot" />
                Legal Professional
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-field fade-in delay-4">
                <label className="form-label" htmlFor="email">Email address</label>
                <input
                  className="form-input"
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  inputMode="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>

              <div className="form-field fade-in delay-5">
                <label className="form-label" htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <input
                    className="form-input"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    style={{ paddingRight: "48px" }}
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              <div className="form-options fade-in delay-6">
                <label className="remember-checkbox">
                  <input
                    type="checkbox"
                    className="checkbox-custom"
                    checked={formData.rememberMe}
                    onChange={(e) => handleInputChange("rememberMe", e.target.checked)}
                  />
                  <span className="remember-label">Remember me</span>
                </label>
                <Link href="/auth/forgot-password" className="forgot-link">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className="submit-btn fade-in delay-7" disabled={loading}>
                {loading ? (
                  <span className="spinner">
                    <span className="spin" /> Signing in…
                  </span>
                ) : (
                  `Sign in as ${userType === "lawyer" ? "Legal Professional" : "Individual"}`
                )}
              </button>
            </form>

            <div className="divider fade-in delay-7">
              <div className="divider-line" />
              <span className="divider-text">new to nyaymitra?</span>
              <div className="divider-line" />
            </div>

            <div className="signup-link fade-in delay-8">
              <Link href="/auth/signup">Create a free account</Link>
            </div>

            <div className="trust-badges fade-in delay-8">
              <span>256-bit encrypted</span>
              <span className="trust-dot" />
              <span>Bar Council compliant</span>
              <span className="trust-dot" />
              <span>DPDP Act 2023</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}