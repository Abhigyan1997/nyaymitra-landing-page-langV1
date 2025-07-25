"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { useRouter } from "next/navigation" // Import useRouter for redirection
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Scale, Eye, EyeOff, Mail, Lock, User, Shield, Phone, MapPin, Award } from "lucide-react"
import Link from "next/link"

// --- Type Definitions ---
interface BaseFormData {
  fullName: string // Changed from firstName and lastName
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

const SPECIALIZATIONS = [
  "Criminal Law",
  "Family Law",
  "Property Law",
  "Corporate Law",
  "Consumer Rights",
  "Cyber Law",
  "Labor Law",
  "Tax Law",
  "Immigration Law",
  "Intellectual Property",
  "Environmental Law",
  "Constitutional Law",
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
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
]

// --- Main Signup Page Component ---
export default function SignupPage() {
  const router = useRouter() // Initialize the router for navigation
  const [showPostSignupDialog, setShowPostSignupDialog] = useState(false)

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [userType, setUserType] = useState<UserType>("user")

  const [userFormData, setUserFormData] = useState<UserFormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    subscribeNewsletter: false,
  })

  const [lawyerFormData, setLawyerFormData] = useState<LawyerFormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    barCouncilNumber: "",
    specialization: "",
    experience: "",
    state: "",
    city: "",
    agreeToTerms: false,
    subscribeNewsletter: false,
  })

  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false) // New loading state

  // Unified input change handler
  const handleInputChange = useCallback(
    (form: UserType, field: keyof UserFormData | keyof LawyerFormData, value: string | boolean) => {
      if (form === "user") {
        setUserFormData((prev) => ({ ...prev, [field]: value }))
      } else {
        setLawyerFormData((prev) => ({ ...prev, [field]: value }))
      }
    },
    [],
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setMessage("")
      setError("")
      setIsLoading(true)

      try {
        const url =
          userType === "user"
            ? `${BASE_API_URL}/register-user`
            : `${BASE_API_URL}/register-lawyer`
        const data = userType === "user" ? userFormData : lawyerFormData

        // ✅ Password match validation
        if (data.password !== data.confirmPassword) {
          const errorMessage = "Passwords do not match."
          setError(errorMessage)
          toast.error(errorMessage)
          setIsLoading(false)
          return
        }

        const response = await axios.post(url, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (response.status === 201) {
          const successMessage =
            response.data.message || "Registration successful! Redirecting..."
          setMessage(successMessage)
          toast.success(successMessage)

          // ✅ Reset form after success
          if (userType === "user") {
            setUserFormData({
              fullName: "",
              email: "",
              phone: "",
              password: "",
              confirmPassword: "",
              agreeToTerms: false,
              subscribeNewsletter: false,
            })
          } else {
            setLawyerFormData({
              fullName: "",
              email: "",
              phone: "",
              password: "",
              confirmPassword: "",
              barCouncilNumber: "",
              specialization: "",
              experience: "",
              state: "",
              city: "",
              agreeToTerms: false,
              subscribeNewsletter: false,
            })
            setShowPostSignupDialog(true)
          }

          // ✅ Delayed redirect with toast
          // setTimeout(() => {
          //   router.push("/auth/login")
          // }, 1500)
        } else {
          const unexpectedError = "Unexpected response from server."
          setError(unexpectedError)
          toast.error(unexpectedError)
        }
      } catch (err: any) {
        const errorMsg =
          err?.response?.data?.message || "Registration failed. Please try again."
        setError(errorMsg)
        toast.error(errorMsg)
        console.error("Signup error:", err)
      } finally {
        setIsLoading(false)
      }
    },
    [userType, userFormData, lawyerFormData, router]
  )


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <Scale className="h-10 w-10 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Nyay Mitra</span>
          </Link>
          <p className="text-gray-600 mt-2">Create your account to get started with legal assistance.</p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Create Account</CardTitle>
            <CardDescription className="text-center">Choose your account type and fill in your details</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={userType}
              onValueChange={(value) => setUserType(value as UserType)}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="user" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>User Account</span>
                </TabsTrigger>
                <TabsTrigger value="lawyer" className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Lawyer Account</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="user" className="space-y-4 mt-6">
                <div className="text-center text-sm text-gray-600 mb-4">
                  Join thousands of users getting legal help through Nyay Mitra
                </div>
                <UserSignupForm
                  formData={userFormData}
                  showPassword={showPassword}
                  showConfirmPassword={showConfirmPassword}
                  onInputChange={(field, value) => handleInputChange("user", field, value)}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                  onToggleConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
                  onSubmit={handleSubmit}
                  isLoading={isLoading} // Pass loading state
                  message={message}
                  error={error}
                />
              </TabsContent>

              <TabsContent value="lawyer" className="space-y-4 mt-6">
                <div className="text-center text-sm text-gray-600 mb-4">
                  Join our network of verified lawyers and help clients across India
                </div>
                <LawyerSignupForm
                  formData={lawyerFormData}
                  showPassword={showPassword}
                  showConfirmPassword={showConfirmPassword}
                  onInputChange={(field, value) => handleInputChange("lawyer", field, value)}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                  onToggleConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
                  onSubmit={handleSubmit}
                  specializations={SPECIALIZATIONS}
                  states={INDIAN_STATES}
                  isLoading={isLoading} // Pass loading state
                  message={message}
                  error={error}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Additional Links */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:underline font-medium">
              Sign in here
            </Link>{" "}
            or{" "}
            <Link href="/" className="text-blue-600 hover:underline">
              Back to Home
            </Link>
          </p>
        </div>
      </div>
      <Dialog open={showPostSignupDialog} onOpenChange={setShowPostSignupDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Almost there!</DialogTitle>
            <DialogDescription>
              You’ve successfully signed up as a lawyer.
              <br />
              <strong>Please log in and complete your profile</strong> to start receiving clients.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowPostSignupDialog(false)}>Close</Button>
            <Button onClick={() => router.push("/auth/login")}>Login Now</Button>
          </div>
        </DialogContent>
      </Dialog>

    </div>

  )
}

// --- Common Input Field Component for Reusability ---
interface FormInputFieldProps {
  id: string
  label: string
  type?: React.HTMLInputTypeAttribute
  placeholder: string
  value: string
  onChange: (value: string) => void
  icon?: React.ElementType
  required?: boolean
  showPasswordToggle?: boolean
  onTogglePassword?: () => void
}

function FormInputField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon: Icon,
  required = false,
  showPasswordToggle = false,
  onTogglePassword,
}: FormInputFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />}
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={Icon ? "pl-10" : ""}
          required={required}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {type === "password" ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </button>
        )}
      </div>
    </div>
  )
}

// --- User Signup Form Component ---
interface UserSignupFormProps {
  formData: UserFormData
  showPassword: boolean
  showConfirmPassword: boolean
  onInputChange: (field: keyof UserFormData, value: string | boolean) => void
  onTogglePassword: () => void
  onToggleConfirmPassword: () => void
  onSubmit: (e: React.FormEvent) => void
  isLoading: boolean // Added isLoading prop
  message: string
  error: string
}

function UserSignupForm({
  formData,
  showPassword,
  showConfirmPassword,
  onInputChange,
  onTogglePassword,
  onToggleConfirmPassword,
  onSubmit,
  isLoading,
  message,
  error,
}: UserSignupFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormInputField
        id="fullName"
        label="Full Name"
        placeholder="Enter your full name"
        value={formData.fullName}
        onChange={(value) => onInputChange("fullName", value)}
        required
      />

      <FormInputField
        id="email"
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={(value) => onInputChange("email", value)}
        icon={Mail}
        required
      />

      <FormInputField
        id="phone"
        label="Phone Number"
        placeholder="9876543210"
        value={formData.phone}
        onChange={(value) => {
          if (/^\d{0,10}$/.test(value)) onInputChange("phone", value)
        }}
        icon={Phone}
        required
      />


      <FormInputField
        id="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="Create a strong password"
        value={formData.password}
        onChange={(value) => onInputChange("password", value)}
        icon={Lock}
        showPasswordToggle
        onTogglePassword={onTogglePassword}
        required
      />

      <FormInputField
        id="confirmPassword"
        label="Confirm Password"
        type={showConfirmPassword ? "text" : "password"}
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={(value) => onInputChange("confirmPassword", value)}
        icon={Lock}
        showPasswordToggle
        onTogglePassword={onToggleConfirmPassword}
        required
      />

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="agreeToTermsUser"
            checked={formData.agreeToTerms}
            onCheckedChange={(checked) => onInputChange("agreeToTerms", checked as boolean)}
            required
          />
          <Label htmlFor="agreeToTermsUser" className="text-sm">
            I agree to the{" "}
            <Link href="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="subscribeNewsletterUser"
            checked={formData.subscribeNewsletter}
            onCheckedChange={(checked) => onInputChange("subscribeNewsletter", checked as boolean)}
          />
          <Label htmlFor="subscribeNewsletterUser" className="text-sm">
            Subscribe to our newsletter for legal updates and tips
          </Label>
        </div>
      </div>

      {message && <p className="text-green-600 text-center">{message}</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}

      <Button type="submit" className="w-full" size="lg" disabled={!formData.agreeToTerms || isLoading}>
        {isLoading ? "Creating Account..." : "Create User Account"}
      </Button>
    </form>
  )
}

// --- Lawyer Signup Form Component ---
interface LawyerSignupFormProps {
  formData: LawyerFormData
  showPassword: boolean
  showConfirmPassword: boolean
  onInputChange: (field: keyof LawyerFormData, value: string | boolean) => void
  onTogglePassword: () => void
  onToggleConfirmPassword: () => void
  onSubmit: (e: React.FormEvent) => void
  specializations: string[]
  states: string[]
  isLoading: boolean // Added isLoading prop
  message: string
  error: string
}

function LawyerSignupForm({
  formData,
  showPassword,
  showConfirmPassword,
  onInputChange,
  onTogglePassword,
  onToggleConfirmPassword,
  onSubmit,
  specializations,
  states,
  isLoading,
  message,
  error,
}: LawyerSignupFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormInputField
        id="fullNameLawyer"
        label="Full Name"
        placeholder="Enter your full name"
        value={formData.fullName}
        onChange={(value) => onInputChange("fullName", value)}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <FormInputField
          id="emailLawyer"
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(value) => onInputChange("email", value)}
          icon={Mail}
          required
        />
        <FormInputField
          id="phoneLawyer"
          label="Phone Number"
          placeholder="9876543210"
          value={formData.phone}
          onChange={(value) => {
            if (/^\d{0,10}$/.test(value)) onInputChange("phone", value)
          }}
          icon={Phone}
          required
        />
      </div>

      <FormInputField
        id="barCouncilNumber"
        label="Bar Council Registration Number"
        placeholder="Enter your Bar Council number"
        value={formData.barCouncilNumber}
        onChange={(value) => onInputChange("barCouncilNumber", value)}
        icon={Award}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="specialization">Primary Specialization</Label>
          <Select value={formData.specialization} onValueChange={(value) => onInputChange("specialization", value)}>
            <SelectTrigger id="specialization">
              <SelectValue placeholder="Select specialization" />
            </SelectTrigger>
            <SelectContent>
              {specializations.map((spec) => (
                <SelectItem key={spec} value={spec}>
                  {spec}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="experience">Years of Experience</Label>
          <Select value={formData.experience} onValueChange={(value) => onInputChange("experience", value)}>
            <SelectTrigger id="experience">
              <SelectValue placeholder="Select experience" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 41 }, (_, i) => (
                <SelectItem key={i} value={`${i}`}>{i} {i === 1 ? "year" : "years"}</SelectItem>
              ))}

            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Select value={formData.state} onValueChange={(value) => onInputChange("state", value)}>
            <SelectTrigger id="state">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <FormInputField
          id="city"
          label="City"
          placeholder="Enter your city"
          value={formData.city}
          onChange={(value) => onInputChange("city", value)}
          icon={MapPin}
          required
        />
      </div>

      <FormInputField
        id="passwordLawyer"
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="Create a strong password"
        value={formData.password}
        onChange={(value) => onInputChange("password", value)}
        icon={Lock}
        showPasswordToggle
        onTogglePassword={onTogglePassword}
        required
      />

      <FormInputField
        id="confirmPasswordLawyer"
        label="Confirm Password"
        type={showConfirmPassword ? "text" : "password"}
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={(value) => onInputChange("confirmPassword", value)}
        icon={Lock}
        showPasswordToggle
        onTogglePassword={onToggleConfirmPassword}
        required
      />

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="agreeToTermsLawyer"
            checked={formData.agreeToTerms}
            onCheckedChange={(checked) => onInputChange("agreeToTerms", checked as boolean)}
            required
          />
          <Label htmlFor="agreeToTermsLawyer" className="text-sm">
            I agree to the{" "}
            <Link href="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="subscribeNewsletterLawyer"
            checked={formData.subscribeNewsletter}
            onCheckedChange={(checked) => onInputChange("subscribeNewsletter", checked as boolean)}
          />
          <Label htmlFor="subscribeNewsletterLawyer" className="text-sm">
            Subscribe to our newsletter for legal updates and tips
          </Label>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800">
            <strong>Verification Process:</strong> After registration, our team will verify your credentials including
            Bar Council registration and experience. This process typically takes 2-3 business days.
          </div>
        </div>
      </div>

      {message && <p className="text-green-600 text-center">{message}</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}

      <Button type="submit" className="w-full" size="lg" disabled={!formData.agreeToTerms || isLoading}>
        {isLoading ? "Creating Account..." : "Create Lawyer Account"}
      </Button>
    </form>
  )
}