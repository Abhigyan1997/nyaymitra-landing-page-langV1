"use client"

import { useState, Suspense, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Lock, CheckCircle, Loader, ArrowLeft, Eye, EyeOff, AlertCircle, KeyRound } from "lucide-react"
import Link from "next/link"

// ─── Theme Styles ──────────────────────────────────────────────────────────
function ThemeStyles() {
    useEffect(() => {
        const id = "reset-password-styles"
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

      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
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

      .requirements-section {
        background: var(--ink-8);
        border: 1px solid var(--ink-7);
        border-radius: 12px;
        padding: clamp(16px, 3vw, 20px);
      }

      .requirement-item {
        display: flex;
        gap: 8px;
        font-size: 12px;
        color: var(--ink-4);
        line-height: 1.5;
      }

      .requirement-item::before {
        content: '•';
        color: var(--gold);
        font-weight: bold;
        flex-shrink: 0;
      }

      .requirement-item.valid {
        color: var(--emerald);
      }

      .requirement-item.valid::before {
        content: '✓';
        color: var(--emerald);
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
        padding-right: 40px;
      }

      .form-eye-button {
        position: absolute;
        right: 12px;
        background: none;
        border: none;
        color: var(--ink-4);
        cursor: pointer;
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color 0.2s;
      }

      .form-eye-button:hover {
        color: var(--gold);
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
function SuccessState() {
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
                <div className="luxury-card-lg" style={{
                    textAlign: "center",
                    animation: "slideInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
                }}>
                    <div className="success-icon-wrapper">
                        <CheckCircle size={clampNumber(32, 40)} className="success-icon" />
                    </div>

                    <h2 style={{
                        fontFamily: "var(--serif)",
                        fontSize: "clamp(24px, 5vw, 32px)",
                        fontWeight: 600,
                        color: "var(--ink)",
                        marginBottom: 8,
                    }}>
                        Password Reset Successful
                    </h2>

                    <p style={{
                        fontSize: 14,
                        color: "var(--ink-4)",
                        lineHeight: 1.6,
                        marginBottom: 24,
                    }}>
                        Your password has been successfully reset. You can now login with your new password.
                    </p>

                    <div style={{ marginBottom: 16 }}>
                        <Link href="/auth/login" style={{ textDecoration: "none" }}>
                            <button className="luxury-button luxury-button-primary" style={{
                                justifyContent: "center",
                                width: "100%",
                                padding: "clamp(11px, 2vw, 13px)",
                            }}>
                                <ArrowLeft size={14} />
                                Back to Login
                            </button>
                        </Link>
                    </div>

                    <p style={{
                        fontSize: 12,
                        color: "var(--ink-5)",
                        marginTop: 16,
                    }}>
                        Having trouble?{" "}
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

// ─── Password Strength Helper ───────────────────────────────────────────────
function PasswordRequirements({ password }: { password: string }) {
    const requirements = [
        { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
        { label: "At least one uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
        { label: "At least one lowercase letter", test: (p: string) => /[a-z]/.test(p) },
        { label: "At least one number", test: (p: string) => /[0-9]/.test(p) },
        { label: "At least one special character", test: (p: string) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
    ]

    return (
        <div className="requirements-section">
            <h3 style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(14px, 3vw, 16px)",
                fontWeight: 600,
                color: "var(--ink)",
                marginBottom: 12,
            }}>
                🔒 Password Requirements
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {requirements.map((req, index) => {
                    const isValid = req.test(password)
                    return (
                        <div key={index} className={isValid ? "requirement-item valid" : "requirement-item"}>
                            {req.label}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

// ─── Main Reset Password Form ───────────────────────────────────────────────
function ResetPasswordForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams?.get("token") || ""

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState("")

    const validatePassword = (pwd: string) => {
        const hasMinLength = pwd.length >= 8
        const hasUpperCase = /[A-Z]/.test(pwd)
        const hasLowerCase = /[a-z]/.test(pwd)
        const hasNumber = /[0-9]/.test(pwd)
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd)

        return hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (!token) {
            setError("Invalid or missing reset token")
            return
        }

        if (password !== confirmPassword) {
            setError("Passwords don't match")
            return
        }

        if (!validatePassword(password)) {
            setError("Password does not meet the requirements")
            return
        }

        setIsLoading(true)

        try {
            const response = await fetch("https://nyaymitra-backend-production.up.railway.app/api/v1/auth/reset-password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token, password }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Failed to reset password")
            }

            setIsSuccess(true)
        } catch (err: unknown) {
            let errorMessage = "Failed to reset password. Please try again."

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

    if (isSuccess) {
        return (
            <>
                <ThemeStyles />
                <SuccessState />
            </>
        )
    }

    if (!token) {
        return (
            <>
                <ThemeStyles />
                <div style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--white)",
                    padding: "clamp(16px, 3vw, 24px)",
                }}>
                    <div className="luxury-card-lg" style={{ textAlign: "center", maxWidth: 480 }}>
                        <div className="error-banner" style={{ marginBottom: 20 }}>
                            <AlertCircle size={16} className="error-banner-icon" />
                            <div className="error-banner-text">Invalid or missing reset token. Please request a new password reset link.</div>
                        </div>
                        <Link href="/auth/forgot-password" style={{ textDecoration: "none" }}>
                            <button className="luxury-button luxury-button-primary" style={{ width: "100%", justifyContent: "center" }}>
                                Request New Reset Link
                            </button>
                        </Link>
                    </div>
                </div>
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
                                <KeyRound size={clampNumber(24, 28)} color="var(--ink)" />
                            </div>
                            <div className="logo-text">NyayMitra</div>
                        </Link>
                        <p className="logo-subtitle">Create a new password for your account</p>
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
                                Reset Password
                            </h1>
                            <p style={{
                                fontSize: 13,
                                color: "var(--ink-4)",
                                textAlign: "center",
                                lineHeight: 1.6,
                            }}>
                                Enter your new password below
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
                                <label className="form-label" htmlFor="password">
                                    New Password
                                </label>
                                <div className="form-input-wrapper">
                                    <Lock size={16} className="form-input-icon" />
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your new password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="luxury-input form-input-with-icon"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="form-eye-button"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="confirmPassword">
                                    Confirm Password
                                </label>
                                <div className="form-input-wrapper">
                                    <Lock size={16} className="form-input-icon" />
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm your new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="luxury-input form-input-with-icon"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="form-eye-button"
                                    >
                                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
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
                                        Resetting Password...
                                    </>
                                ) : (
                                    <>
                                        <KeyRound size={14} />
                                        Reset Password
                                    </>
                                )}
                            </button>

                            {/* Back to Login Link */}
                            <div style={{ textAlign: "center" }}>
                                <Link href="/auth/login" style={{ textDecoration: "none" }}>
                                    <div className="back-link" style={{
                                        justifyContent: "center",
                                        padding: "8px 0",
                                    }}>
                                        <ArrowLeft size={14} />
                                        Back to Login
                                    </div>
                                </Link>
                            </div>
                        </form>
                    </div>

                    {/* Password Requirements Section */}
                    <div style={{
                        marginTop: clampNumber(16, 24),
                        animation: "slideInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
                    }}>
                        <PasswordRequirements password={password} />

                        <div className="divider"></div>

                        <Link href="/contact" style={{ textDecoration: "none" }}>
                            <button className="luxury-button luxury-button-secondary" style={{
                                width: "100%",
                                justifyContent: "center",
                            }}>
                                Need Help? Contact Support
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

// Helper function for clamp (used for responsive values)
function clampNumber(min: number, max: number): number {
    // This is a simplified version - in production you'd use CSS clamp
    return min
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--white)",
            }}>
                <Loader size={32} style={{ animation: "spin 1s linear infinite", color: "var(--gold)" }} />
            </div>
        }>
            <ResetPasswordForm />
        </Suspense>
    )
}