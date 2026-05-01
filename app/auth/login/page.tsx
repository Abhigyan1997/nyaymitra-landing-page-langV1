"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Eye, EyeOff } from "lucide-react"
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

  const ScalesIcon = ({ size = 22 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <path d="M11 3v16M5.5 7l5.5-4 5.5 4" stroke="rgba(255,255,255,.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 12.5c0 2.5 2 4.5 4.5 4.5S11 15 11 12.5L6.5 8 2 12.5z" fill="rgba(255,255,255,.15)" stroke="rgba(255,255,255,.85)" strokeWidth="1.3" />
      <path d="M11 12.5c0 2.5 2 4.5 4.5 4.5S20 15 20 12.5L15.5 8 11 12.5z" fill="rgba(255,255,255,.15)" stroke="rgba(255,255,255,.85)" strokeWidth="1.3" />
    </svg>
  )

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .nm-root {
          min-height: 100svh;
          display: grid;
          grid-template-columns: 1fr;
          font-family: 'DM Sans', sans-serif;
          background: #0a0b0f;
          color: #f0ede8;
        }

        /* ── Desktop: 2-col layout ── */
        @media (min-width: 768px) {
          .nm-root { grid-template-columns: 1fr 1fr; }
          .nm-mobile-hero { display: none !important; }
          .nm-desktop-left { display: flex !important; }
          .nm-form-panel { padding: 2.5rem 3.5rem; }
          .nm-form-inner { max-width: 400px; }
          .nm-f-brand { display: flex !important; }
        }

        /* ── Mobile: single col ── */
        @media (max-width: 767px) {
          .nm-desktop-left { display: none !important; }
          .nm-mobile-hero { display: block !important; }
          .nm-form-panel { padding: 1.75rem 1.5rem 2.5rem; align-items: flex-start; }
          .nm-form-inner { max-width: 100%; }
          .nm-f-brand { display: none !important; }
          .nm-f-h { font-size: 1.7rem !important; }
        }

        /* ── Desktop left panel ── */
        .nm-desktop-left {
          display: none;
          position: relative;
          overflow: hidden;
          background: #0d0f16;
          flex-direction: column;
          justify-content: space-between;
          padding: 2.5rem;
          border-right: 1px solid rgba(255,255,255,0.06);
        }
        .nm-glow {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 70% 55% at 15% 88%, rgba(80,100,200,.22) 0%, transparent 70%),
            radial-gradient(ellipse 55% 45% at 85% 15%, rgba(140,90,210,.15) 0%, transparent 70%);
        }
        .nm-grid-lines {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px);
          background-size: 44px 44px;
        }
        .nm-d-brand { position: relative; z-index: 1; }
        .nm-d-icon {
          width: 44px; height: 44px; border-radius: 11px; flex-shrink: 0;
          background: linear-gradient(135deg, #4f63b8, #8b5bc7);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 10px;
        }
        .nm-d-bname { font-size: 16px; font-weight: 500; color: #d8d3cc; letter-spacing: -.01em; }
        .nm-d-btag { font-size: 10px; color: #3a3835; text-transform: uppercase; letter-spacing: .07em; margin-top: 2px; }

        .nm-d-quote { position: relative; z-index: 1; }
        .nm-q-mark { font-family: 'Instrument Serif', serif; font-size: 3.5rem; line-height: .55; color: rgba(99,120,200,.3); display: block; margin-bottom: .6rem; }
        .nm-d-quote blockquote { font-family: 'Instrument Serif', serif; font-style: italic; font-size: 1.05rem; line-height: 1.55; color: #ddd8d0; margin: 0 0 1rem; letter-spacing: -.01em; }
        .nm-q-meta { display: flex; align-items: center; gap: 9px; }
        .nm-q-av { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, #5a72c8, #9060cc); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 500; color: #fff; flex-shrink: 0; }
        .nm-q-name { font-size: 12px; font-weight: 500; color: #c0bbb4; }
        .nm-q-role { font-size: 11px; color: #4a4845; }

        .nm-d-stats { position: relative; z-index: 1; display: flex; gap: 1.5rem; }
        .nm-d-sep { width: 1px; background: rgba(255,255,255,.06); align-self: stretch; }
        .nm-d-sn { font-family: 'Instrument Serif', serif; font-size: 1.55rem; color: #e8e3dc; line-height: 1; }
        .nm-d-sl { font-size: 10px; color: #3a3835; text-transform: uppercase; letter-spacing: .07em; margin-top: 3px; }

        /* ── Mobile hero ── */
        .nm-mobile-hero {
          display: none;
          position: relative;
          overflow: hidden;
          background: #0d0f16;
          padding: 3rem 1.5rem 2rem;
          border-bottom: 1px solid rgba(255,255,255,.06);
        }
        .nm-m-brand { position: relative; z-index: 1; display: flex; align-items: center; gap: 10px; margin-bottom: 1.5rem; text-decoration: none; }
        .nm-m-icon { width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0; background: linear-gradient(135deg, #4f63b8, #8b5bc7); display: flex; align-items: center; justify-content: center; }
        .nm-m-bname { font-size: 15px; font-weight: 500; color: #d8d3cc; letter-spacing: -.01em; }
        .nm-m-btag { font-size: 10px; color: #3a3835; text-transform: uppercase; letter-spacing: .07em; }
        .nm-m-h { position: relative; z-index: 1; font-family: 'Instrument Serif', serif; font-style: italic; font-size: 2rem; line-height: 1.2; letter-spacing: -.025em; color: #f0ede8; margin-bottom: .35rem; }
        .nm-m-sub { position: relative; z-index: 1; font-size: 13px; color: #4a4845; margin-bottom: 1.5rem; }
        .nm-m-stats { position: relative; z-index: 1; display: grid; grid-template-columns: repeat(3, 1fr); background: #111318; border-radius: 10px; overflow: hidden; border: 1px solid rgba(255,255,255,.07); }
        .nm-m-stat { padding: 10px 0; text-align: center; }
        .nm-m-stat + .nm-m-stat { border-left: 1px solid rgba(255,255,255,.06); }
        .nm-m-sn { font-family: 'Instrument Serif', serif; font-size: 1.1rem; color: #d8d3cc; line-height: 1; }
        .nm-m-sl { font-size: 9px; color: #3a3835; text-transform: uppercase; letter-spacing: .06em; margin-top: 3px; }

        /* ── Form panel ── */
        .nm-form-panel {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0a0b0f;
        }
        .nm-form-inner { width: 100%; }

        .nm-f-brand { align-items: center; gap: 9px; margin-bottom: 1.75rem; text-decoration: none; }
        .nm-f-icon { width: 30px; height: 30px; border-radius: 8px; flex-shrink: 0; background: linear-gradient(135deg, #4f63b8, #8b5bc7); display: flex; align-items: center; justify-content: center; }
        .nm-f-bname { font-size: 14px; font-weight: 500; color: #d0cbc4; letter-spacing: -.01em; }
        .nm-f-h { font-family: 'Instrument Serif', serif; font-style: italic; font-size: 1.9rem; color: #f0ede8; letter-spacing: -.025em; line-height: 1.2; margin-bottom: .35rem; }
        .nm-f-sub { font-size: 13px; color: #4a4845; margin-bottom: 1.5rem; }

        .nm-toggle {
          display: flex; gap: 4px;
          background: #111318; border: 1px solid rgba(255,255,255,.08);
          border-radius: 10px; padding: 4px; margin-bottom: 1.4rem;
        }
        .nm-tab {
          flex: 1; min-height: 46px; padding: 9px 8px;
          border-radius: 7px; border: none;
          font-family: 'DM Sans', sans-serif; font-size: 13px;
          cursor: pointer; color: #4a4845; background: transparent;
          display: flex; align-items: center; justify-content: center; gap: 5px;
          transition: all .18s; -webkit-tap-highlight-color: transparent;
        }
        .nm-tab.active {
          background: #1c1f2a; color: #d0cbc4;
          border: 1px solid rgba(255,255,255,.1);
          box-shadow: 0 1px 4px rgba(0,0,0,.5);
        }
        .nm-tab-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #5568cc; opacity: 0; transition: opacity .18s; flex-shrink: 0;
        }
        .nm-tab.active .nm-tab-dot { opacity: 1; }

        .nm-field { margin-bottom: .9rem; }
        .nm-label { display: block; font-size: 10.5px; font-weight: 500; color: #4a4845; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 5px; }
        .nm-input {
          width: 100%; background: #111318;
          border: 1px solid rgba(255,255,255,.09); border-radius: 9px;
          padding: 12px 14px; min-height: 50px;
          font-family: 'DM Sans', sans-serif; font-size: 15px; color: #e0dbd3;
          outline: none; transition: border-color .15s, box-shadow .15s;
        }
        .nm-input::placeholder { color: #2a2826; }
        .nm-input:focus { border-color: rgba(99,120,200,.55); box-shadow: 0 0 0 3px rgba(99,120,200,.11); }
        .nm-input-wrap { position: relative; }
        .nm-eye {
          position: absolute; right: 0; top: 0; bottom: 0; width: 48px;
          background: none; border: none; cursor: pointer; color: #3a3835;
          display: flex; align-items: center; justify-content: center;
          transition: color .15s; -webkit-tap-highlight-color: transparent;
        }
        .nm-eye:hover { color: #7a7672; }

        .nm-opts { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; }
        .nm-remember { display: flex; align-items: center; gap: 9px; cursor: pointer; min-height: 44px; }
        .nm-checkbox {
          width: 17px; height: 17px; flex-shrink: 0;
          border: 1px solid rgba(255,255,255,.14); border-radius: 4px;
          background: #111318; appearance: none; cursor: pointer;
          position: relative; transition: all .15s;
        }
        .nm-checkbox:checked { background: #4f63b8; border-color: #4f63b8; }
        .nm-checkbox:checked::after {
          content: ''; position: absolute; left: 4px; top: 1.5px;
          width: 4px; height: 7.5px;
          border: 2px solid white; border-top: none; border-left: none;
          transform: rotate(45deg);
        }
        .nm-remember-label { font-size: 13px; color: #4a4845; }
        .nm-forgot { font-size: 13px; color: #4f63b8; text-decoration: none; padding: 10px 0; display: inline-block; }
        .nm-forgot:hover { color: #7a8fd4; }

        .nm-submit {
          width: 100%; padding: 14px; min-height: 52px;
          background: linear-gradient(135deg, #4f63b8 0%, #7048be 100%);
          border: none; border-radius: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 14.5px; font-weight: 500;
          color: #fff; cursor: pointer; letter-spacing: .01em;
          transition: opacity .15s, transform .12s;
          position: relative; overflow: hidden;
          -webkit-tap-highlight-color: transparent;
        }
        .nm-submit::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(255,255,255,.09), transparent);
          pointer-events: none;
        }
        .nm-submit:hover:not(:disabled) { opacity: .9; }
        .nm-submit:active:not(:disabled) { transform: scale(.985); }
        .nm-submit:disabled { opacity: .5; cursor: not-allowed; }
        .nm-spinner { display: inline-flex; align-items: center; gap: 8px; }
        .nm-spin {
          width: 15px; height: 15px; border-radius: 50%;
          border: 2px solid rgba(255,255,255,.3); border-top-color: #fff;
          animation: nm-spin .6s linear infinite; flex-shrink: 0;
        }
        @keyframes nm-spin { to { transform: rotate(360deg); } }

        .nm-divider { display: flex; align-items: center; gap: 10px; margin: 1.1rem 0; }
        .nm-div-line { flex: 1; height: 1px; background: rgba(255,255,255,.06); }
        .nm-div-text { font-size: 11px; color: #2a2826; }

        .nm-signup { text-align: center; font-size: 13px; color: #3a3835; margin-bottom: 1.25rem; }
        .nm-signup a { color: #5568cc; text-decoration: none; }
        .nm-signup a:hover { color: #7a8fd4; }

        .nm-trust { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 5px; font-size: 10px; color: #2a2825; }
        .nm-trust-dot { width: 3px; height: 3px; border-radius: 50%; background: #1e1c1a; flex-shrink: 0; }

        .nm-fade { animation: nm-fade .42s ease both; }
        @keyframes nm-fade { from { opacity: 0; transform: translateY(7px); } to { opacity: 1; transform: translateY(0); } }
        .nm-d1{animation-delay:.04s} .nm-d2{animation-delay:.09s} .nm-d3{animation-delay:.14s}
        .nm-d4{animation-delay:.19s} .nm-d5{animation-delay:.24s} .nm-d6{animation-delay:.29s}
        .nm-d7{animation-delay:.34s} .nm-d8{animation-delay:.39s}
      `}</style>

      <div className="nm-root">

        {/* ── Desktop left panel ── */}
        <div className="nm-desktop-left">
          <div className="nm-glow" />
          <div className="nm-grid-lines" />

          <div className="nm-d-brand">
            <div className="nm-d-icon"><ScalesIcon size={22} /></div>
            <div className="nm-d-bname">NyayMitra</div>
            <div className="nm-d-btag">Legal Intelligence Platform</div>
          </div>

          <div className="nm-d-quote">
            <span className="nm-q-mark">"</span>
            <blockquote>
              I was confused about a payment dispute. NyayMitra gave me clarity on my next legal step within minutes.
            </blockquote>

            <div className="nm-q-meta">
              <div className="nm-q-av">A</div>
              <div>
                <div className="nm-q-name">Anonymous User</div>
                <div className="nm-q-role">Early User</div>
              </div>
            </div>
          </div>

          <div className="nm-d-stats">
            <div><div className="nm-d-sn">100+</div><div className="nm-d-sl">Cases advised</div></div>
            <div className="nm-d-sep" />
            <div><div className="nm-d-sn">60+</div><div className="nm-d-sl">Verified lawyers</div></div>
            <div className="nm-d-sep" />
            <div><div className="nm-d-sn">18</div><div className="nm-d-sl">States covered</div></div>
          </div>
        </div>

        {/* ── Mobile hero ── */}
        <div className="nm-mobile-hero">
          <div className="nm-glow" />
          <div className="nm-grid-lines" />
          <Link href="/" className="nm-m-brand">
            <div className="nm-m-icon"><ScalesIcon size={18} /></div>
            <div>
              <div className="nm-m-bname">NyayMitra</div>
              <div className="nm-m-btag">Legal Intelligence Platform</div>
            </div>
          </Link>
          <h1 className="nm-f-h nm-fade nm-d2">Sign in to continue.</h1>
          <p className="nm-f-sub nm-fade nm-d2">Access your legal workspace</p>
          <div className="nm-m-stats">
            <div className="nm-m-stat"><div className="nm-m-sn">100+</div><div className="nm-m-sl">Cases</div></div>
            <div className="nm-m-stat"><div className="nm-m-sn">60+</div><div className="nm-m-sl">Lawyers</div></div>
            <div className="nm-m-stat"><div className="nm-m-sn">18</div><div className="nm-m-sl">States</div></div>
          </div>
        </div>

        {/* ── Form panel ── */}
        <div className="nm-form-panel">
          <div className="nm-form-inner">

            <Link href="/" className="nm-f-brand nm-fade nm-d1">
              <div className="nm-f-icon"><ScalesIcon size={14} /></div>
              <span className="nm-f-bname">NyayMitra</span>
            </Link>

            <h1 className="nm-f-h nm-fade nm-d2">Welcome back.</h1>
            <p className="nm-f-sub nm-fade nm-d2">Sign in to continue to your account</p>

            <div className="nm-toggle nm-fade nm-d3">
              <button
                className={`nm-tab ${userType === "user" ? "active" : ""}`}
                onClick={() => setUserType("user")} type="button"
              >
                <span className="nm-tab-dot" />Individual
              </button>
              <button
                className={`nm-tab ${userType === "lawyer" ? "active" : ""}`}
                onClick={() => setUserType("lawyer")} type="button"
              >
                <span className="nm-tab-dot" />Legal Professional
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="nm-field nm-fade nm-d4">
                <label className="nm-label" htmlFor="email">Email address</label>
                <input
                  className="nm-input" id="email" type="email"
                  placeholder="you@example.com" inputMode="email" autoComplete="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>

              <div className="nm-field nm-fade nm-d5">
                <label className="nm-label" htmlFor="password">Password</label>
                <div className="nm-input-wrap">
                  <input
                    className="nm-input" id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••" style={{ paddingRight: "48px" }}
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    required
                  />
                  <button
                    type="button" className="nm-eye"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              <div className="nm-opts nm-fade nm-d6">
                <label className="nm-remember">
                  <input
                    type="checkbox" className="nm-checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => handleInputChange("rememberMe", e.target.checked)}
                  />
                  <span className="nm-remember-label">Remember me</span>
                </label>
                <Link href="/auth/forgot-password" className="nm-forgot">Forgot password?</Link>
              </div>

              <button type="submit" className="nm-submit nm-fade nm-d7" disabled={loading}>
                {loading ? (
                  <span className="nm-spinner">
                    <span className="nm-spin" />Signing in…
                  </span>
                ) : (
                  `Sign in as ${userType === "lawyer" ? "Legal Professional" : "Individual"}`
                )}
              </button>
            </form>

            <div className="nm-divider nm-fade nm-d7">
              <div className="nm-div-line" />
              <span className="nm-div-text">new to nyaymitra?</span>
              <div className="nm-div-line" />
            </div>

            <div className="nm-signup nm-fade nm-d8">
              <Link href="/auth/signup">Create a free account</Link>
            </div>

            <div className="nm-trust nm-fade nm-d8">
              <span>256-bit encrypted</span>
              <span className="nm-trust-dot" />
              <span>Bar Council compliant</span>
              <span className="nm-trust-dot" />
              <span>DPDP Act 2023</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}