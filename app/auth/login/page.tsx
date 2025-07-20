"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Scale, Eye, EyeOff, Mail, Lock, User, Shield } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState<"user" | "lawyer">("user")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post(
        "https://nyaymitra-backend-production.up.railway.app/api/v1/auth/login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      )

      const { token, user, message } = response.data

      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      localStorage.setItem("userId", response.data.user.userId)
      localStorage.setItem("userName", response.data.user.fullName)
      localStorage.setItem("userEmail", response.data.user.email)
      localStorage.setItem("userProfile", JSON.stringify(user))

      toast.success(message || "Logged in successfully!", {
        description: `Welcome back, ${response.data.user.fullName}!`,
        action: {
          label: "Go to Dashboard",
          onClick: () => {
            const urlParams = new URLSearchParams(window.location.search)
            const redirectTo = urlParams.get('redirect') || 'https://nyay-dashboard.netlify.app/'
            router.push(redirectTo)
          }
        }
      })

      // Redirect after a short delay to allow toast to be seen
      setTimeout(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const redirectTo = urlParams.get('redirect') || '/'
        router.push(redirectTo)
      }, 1000)

    } catch (error: any) {
      let errorMessage = "Login failed"
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = "Invalid email or password"
        } else if (error.response.status === 403) {
          errorMessage = "Account not verified. Please check your email."
        } else {
          errorMessage = error.response?.data?.message || errorMessage
        }
      } else if (error.request) {
        errorMessage = "Network error. Please check your connection."
      }

      toast.error("Login Failed", {
        description: errorMessage,
        action: {
          label: "Retry",
          onClick: () => handleSubmit(e)
        }
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <Scale className="h-10 w-10 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">NyayMitra</span>
          </Link>
          <p className="text-gray-600 mt-2">Welcome back! Please sign in to your account.</p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Choose your account type and enter your credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={userType}
              onValueChange={(value) => setUserType(value as "user" | "lawyer")}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="user" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>User</span>
                </TabsTrigger>
                <TabsTrigger value="lawyer" className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Lawyer</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="user" className="space-y-4 mt-6">
                <div className="text-center text-sm text-gray-600 mb-4">
                  Sign in to access AI legal advice, book consultations, and manage your legal queries.
                </div>
                <LoginForm
                  formData={formData}
                  showPassword={showPassword}
                  onInputChange={handleInputChange}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                  onSubmit={handleSubmit}
                  userType="user"
                  loading={loading}
                />
              </TabsContent>

              <TabsContent value="lawyer" className="space-y-4 mt-6">
                <div className="text-center text-sm text-gray-600 mb-4">
                  Sign in to manage your practice, view consultations, and connect with clients.
                </div>
                <LoginForm
                  formData={formData}
                  showPassword={showPassword}
                  onInputChange={handleInputChange}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                  onSubmit={handleSubmit}
                  userType="lawyer"
                  loading={loading}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-blue-600 hover:underline font-medium">
              Sign up here
            </Link>
          </p>
          <p className="text-sm text-gray-600">
            <Link href="/" className="text-blue-600 hover:underline">
              Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

function LoginForm({
  formData,
  showPassword,
  onInputChange,
  onTogglePassword,
  onSubmit,
  userType,
  loading,
}: {
  formData: any
  showPassword: boolean
  onInputChange: (field: string, value: string | boolean) => void
  onTogglePassword: () => void
  onSubmit: (e: React.FormEvent) => void
  userType: "user" | "lawyer"
  loading: boolean
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => onInputChange("email", e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => onInputChange("password", e.target.value)}
            className="pl-10 pr-10"
            required
          />
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={formData.rememberMe}
            onCheckedChange={(checked) => onInputChange("rememberMe", checked as boolean)}
          />
          <Label htmlFor="remember" className="text-sm">
            Remember me
          </Label>
        </div>
        <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
          Forgot password?
        </Link>
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={loading}>
        {loading ? "Signing in..." : `Sign In as ${userType === "user" ? "User" : "Lawyer"}`}
      </Button>
    </form>
  )
}