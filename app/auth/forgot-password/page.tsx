"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Scale, Mail, ArrowLeft, CheckCircle, Loader, AlertCircle } from "lucide-react"
import Link from "next/link"

// ─── Theme Styles ──────────────────────────────────────────────────────────
function ThemeStyles() {
  useEffect(() => {
    const id = "forgot-password-styles"
    if (document.getElementById(id)) return
    const s = document.createElement("style")
    s.id = id
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap');
      
      :root {
        --ink: #0a0a0a;
        --ink-2: #1a1a1a;
        --ink-4: #6b6b6b;
        --ink-5: #9a9a9a;
        --ink-7: #e8e8e8;
        --ink-8: #f4f3f0;
        --parchment: #faf9f6;
        --white: #ffffff;
        --gold: #c9a84c;
        --gold-lt: #e8c96a;
        --gold-dk: #8b6914;
        --gold-pale: #fdf6e3;
        --emerald: #10b981;
        --red: #c0392b;
        --serif: 'Cormorant Garamond', Georgia, serif;
        --sans: 'DM Sans', system-ui, sans-serif;
        --mono: 'DM Mono', monospace;
      }

      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      html {
        scroll-behavior: smooth;
      }

      body {
        background: var(--white);
        color: var(--ink);
        font-family: var(--sans);
        -webkit-font-smoothing: antialiased;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes slideInUp {
        from { opacity: 0; transform: translateY(24px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes slideInDown {
        from { opacity: 0; transform: translateY(-24px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes shimmerGold {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }

      .gold-text {
        background: linear-gradient(100deg, var(--gold-dk) 0%, var(--gold) 30%, var(--gold-lt) 50%, var(--gold) 70%, var(--gold-dk) 100%);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: shimmerGold 4s linear infinite;
      }

      .luxury-card {
        background: var(--white);
        border: 1px solid var(--ink-7);
        border-radius: 12px;
        transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
      }

      .luxury-card:hover {
        border-color: var(--gold);
        box-shadow: 0 8px 24px rgba(201, 168, 76, 0.12);
      }

      .luxury-card-lg {
        background: var(--white);
        border: 1px solid var(--ink-7);
        border-radius: 16px;
        padding: clamp(24px, 5vw, 40px);
        transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
      }

      .luxury-input {
        width: 100%;
        padding: clamp(12px, 2vw, 14px);
        border: 1px solid var(--ink-7);
        border-radius: 8px;
        font-family: var(--sans);
        font-size: 14px;
        color: var(--ink);
        background: var(--white);
        transition: all 0.2s;
      }

      .luxury-input:focus {
        outline: none;
        border-color: var(--gold);
        box-shadow: 0 0 0 3px rgba(201, 168, 76, 0.1);
        background: var(--gold-pale);
      }

      .luxury-input::placeholder {
        color: var(--ink-5);
      }

      .luxury-button {
        font-family: var(--sans);
        font-weight: 600;
        font-size: 13px;
        padding: clamp(10px, 2vw, 12px) clamp(16px, 3vw, 20px);
        border-radius: 8px;
        border: none;
        cursor: pointer;
        transition: all 0.2s;
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }

      .luxury-button-primary {
        background: var(--gold);
        color: var(--ink);
      }

      .luxury-button-primary:hover:not(:disabled) {
        background: var(--gold-lt);
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(201, 168, 76, 0.3);
      }

      .luxury-button-primary:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }

      .luxury-button-secondary {
        background: transparent;
        color: var(--ink);
        border: 1px solid var(--ink-7);
      }

      .luxury-button-secondary:hover:not(:disabled) {
        border-color: var(--gold);
        background: var(--gold-pale);
      }

      .luxury-button-secondary:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }

      .error-banner {
        background: var(--gold-pale);
        border: 1px solid var(--gold);
        border-radius: 8px;
        padding: clamp(12px, 2vw, 16px);
        display: flex;
        gap: 10px;
        align-items: flex-start;
      }

      .error-banner-icon {
        color: var(--gold-dk);
        flex-shrink: 0;
        margin-top: 2px;
      }

      .error-banner-text {
        color: var(--gold-dk);
        font-size: 13px;
        line-height: 1.5;
      }

      .help-section {
        background: var(--ink-8);
        border: 1px solid var(--ink-7);
        border-radius: 12px;
        padding: clamp(16px, 3vw, 20px);
      }

      .help-item {
        display: flex;
        gap: 8px;
        font-size: 12px;
        color: var(--ink-4);
        line-height: 1.5;
      }

      .help-item::before {
        content: '•';
        color: var(--gold);
        font-weight: bold;
        flex-shrink: 0;
      }

      .logo-area {
        text-align: center;
        margin-bottom: clamp(24px, 5vw, 32px);
        animation: slideInDown 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
      }

      .logo-icon {
        width: clamp(40px, 8vw, 48px);
        height: clamp(40px, 8vw, 48px);
        background: var(--gold);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto clamp(12px, 2vw, 16px);
        transition: all 0.3s;
      }

      .logo-icon:hover {
        background: var(--gold-lt);
        transform: scale(1.05);
      }

      .logo-text {
        font-family: var(--serif);
        font-size: clamp(20px, 5vw, 28px);
        font-weight: 700;
        color: var(--ink);
        margin-bottom: 6px;
      }

      .logo-subtitle {
        font-size: 13px;
        color: var(--ink-4);
      }

      .form-group {
        margin-bottom: clamp(16px, 3vw, 20px);
      }

      .form-label {
        display: block;
        margin-bottom: 8px;
        font-family: var(--sans);
        font-size: 12px;
        font-weight: 600;
        color: var(--ink);
        letter-spacing: 0.05em;
        text-transform: uppercase;
      }

      .form-input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
      }

      .form-input-icon {
        position: absolute;
        left: 12px;
        color: var(--gold);
        flex-shrink: 0;
      }

      .form-input-with-icon {
        padding-left: 40px;
      }

      .success-icon-wrapper {
        width: clamp(64px, 12vw, 80px);
        height: clamp(64px, 12vw, 80px);
        background: linear-gradient(135deg, var(--gold), var(--gold-lt));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto clamp(16px, 3vw, 24px);
        animation: slideInDown 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
      }

      .success-icon {
        color: var(--ink);
        animation: pulse 2s ease-in-out infinite;
      }

      .back-link {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        color: var(--ink-4);
        text-decoration: none;
        transition: all 0.2s;
        padding: 4px 0;
      }

      .back-link:hover {
        color: var(--gold-dk);
        gap: 10px;
      }

      .divider {
        height: 1px;
        background: var(--ink-7);
        margin: clamp(16px, 3vw, 24px) 0;
      }

      @media (max-width: 480px) {
        .luxury-card-lg {
          border-radius: 12px;
          padding: 20px 16px;
        }

        .luxury-button {
          width: 100%;
          justify-content: center;
        }
      }
    `
    document.head.appendChild(s)
  }, [])
  return null
}

// ─── Success State Component ────────────────────────────────────────────────
function SuccessState({ email, onReset }: { email: string; onReset: () => void }) {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--white)",
      padding: "clamp(16px, 3vw, 24px)",
      animation: "fadeIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) both",
    }}>
      <div style={{ width: "100%", maxWidth: 480 }}>
        {/* Success Card */}
        <div className="luxury-card-lg" style={{
          textAlign: "center",
          animation: "slideInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        }}>
          {/* Success Icon */}
          <div className="success-icon-wrapper">
            <CheckCircle size={clamp(32, "6vw", 40)} className="success-icon" style={{
              width: "clamp(32px, 6vw, 40px)",
              height: "clamp(32px, 6vw, 40px)",
            }} />
          </div>

          {/* Success Message */}
          <h2 style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(24px, 5vw, 32px)",
            fontWeight: 600,
            color: "var(--ink)",
            marginBottom: 8,
          }}>
            Check Your Email
          </h2>

          <p style={{
            fontSize: 14,
            color: "var(--ink-4)",
            lineHeight: 1.6,
            marginBottom: 24,
          }}>
            We've sent a password reset link to{" "}
            <strong style={{ color: "var(--ink)", fontWeight: 600 }}>
              {email}
            </strong>
          </p>

          {/* Info Box */}
          <div style={{
            background: "var(--gold-pale)",
            border: "1px solid var(--gold)",
            borderRadius: 8,
            padding: "clamp(12px, 2vw, 16px)",
            marginBottom: 24,
          }}>
            <p style={{
              fontSize: 12,
              color: "var(--gold-dk)",
              lineHeight: 1.5,
            }}>
              💡 The reset link will expire in 15 minutes for security. If you don't see the email, check your spam folder.
            </p>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            marginBottom: 16,
          }}>
            <button
              onClick={onReset}
              className="luxury-button luxury-button-secondary"
              style={{ justifyContent: "center" }}
            >
              Try Different Email
            </button>
            <Link href="/auth/login" style={{ textDecoration: "none" }}>
              <button className="luxury-button luxury-button-primary" style={{ justifyContent: "center", width: "100%" }}>
                Back to Login
              </button>
            </Link>
          </div>

          {/* Help Text */}
          <p style={{
            fontSize: 12,
            color: "var(--ink-5)",
            marginTop: 16,
          }}>
            Still having issues?{" "}
            <Link href="/contact" style={{
              color: "var(--gold-dk)",
              textDecoration: "none",
              fontWeight: 600,
            }}>
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("https://nyaymitra-backend-production.up.railway.app/api/v1/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to send reset link")
      }

      setIsSubmitted(true)
    } catch (err: unknown) {
      let errorMessage = "Something went wrong. Please try again."

      if (err instanceof Error) {
        errorMessage = err.message
      } else if (typeof err === "string") {
        errorMessage = err
      }

      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <>
        <ThemeStyles />
        <SuccessState email={email} onReset={() => {
          setIsSubmitted(false)
          setEmail("")
          setError("")
        }} />
      </>
    )
  }

  return (
    <>
      <ThemeStyles />

      <div style={{
        minHeight: "100vh",
        background: "var(--white)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(16px, 3vw, 24px)",
        animation: "fadeIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) both",
      }}>
        <div style={{
          width: "100%",
          maxWidth: 480,
          animation: "slideInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        }}>
          {/* Logo Section */}
          <div className="logo-area">
            <Link href="/" style={{ textDecoration: "none" }}>
              <div className="logo-icon">
                <Scale size={clamp(24, "5vw", 28)} color="var(--ink)" style={{
                  width: "clamp(24px, 5vw, 28px)",
                  height: "clamp(24px, 5vw, 28px)",
                }} />
              </div>
              <div className="logo-text">NyayMitra</div>
            </Link>
            <p className="logo-subtitle">Reset your password to regain access</p>
          </div>

          {/* Main Card */}
          <div className="luxury-card-lg">
            {/* Header */}
            <div style={{ marginBottom: 28 }}>
              <h1 style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(26px, 5vw, 32px)",
                fontWeight: 600,
                color: "var(--ink)",
                marginBottom: 8,
                textAlign: "center",
              }}>
                Forgot Password?
              </h1>
              <p style={{
                fontSize: 13,
                color: "var(--ink-4)",
                textAlign: "center",
                lineHeight: 1.6,
              }}>
                Enter your email address and we'll send you a link to reset your password
              </p>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="error-banner" style={{ marginBottom: 20 }}>
                <AlertCircle size={16} className="error-banner-icon" />
                <div className="error-banner-text">{error}</div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email Address
                </label>
                <div className="form-input-wrapper">
                  <Mail size={16} className="form-input-icon" />
                  <input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="luxury-input form-input-with-icon"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="luxury-button luxury-button-primary"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "clamp(11px, 2vw, 13px)",
                  fontSize: "clamp(13px, 2vw, 14px)",
                  marginBottom: 20,
                }}
              >
                {isLoading ? (
                  <>
                    <Loader size={14} style={{ animation: "spin 1s linear infinite" }} />
                    Sending Reset Link...
                  </>
                ) : (
                  <>
                    <Mail size={14} />
                    Send Reset Link
                  </>
                )}
              </button>

              {/* Back to Login Link */}
              <div style={{ textAlign: "center" }}>
                <Link href="/auth/login" style={{ textDecoration: "none" }}>
                  <div className="back-link" style={{
                    justifyContent: "center",
                    color: "var(--ink-4)",
                    padding: "8px 0",
                  }}>
                    <ArrowLeft size={14} />
                    Back to Login
                  </div>
                </Link>
              </div>
            </form>
          </div>

          {/* Help Section */}
          <div style={{
            marginTop: clamp(16, "3vw", 24),
            animation: "slideInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
          }}>
            <div className="help-section">
              <h3 style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(14px, 3vw, 16px)",
                fontWeight: 600,
                color: "var(--ink)",
                marginBottom: 12,
              }}>
                💡 Quick Tips
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div className="help-item">Make sure you enter the email address associated with your account</div>
                <div className="help-item">Check your spam or junk folder for the reset email</div>
                <div className="help-item">The reset link will expire in 15 minutes for security</div>
                <div className="help-item">Contact support if you continue having issues</div>
              </div>

              <div className="divider"></div>

              <Link href="/contact" style={{ textDecoration: "none" }}>
                <button className="luxury-button luxury-button-secondary" style={{
                  width: "100%",
                  justifyContent: "center",
                  marginTop: 8,
                }}>
                  Contact Support
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// Helper function for clamp (used for responsive values)
function clamp(min: number | string, preferred: string, max: number | string): string {
  const minVal = typeof min === "number" ? `${min}px` : min
  const maxVal = typeof max === "number" ? `${max}px` : max
  return `clamp(${minVal}, ${preferred}, ${maxVal})`
}