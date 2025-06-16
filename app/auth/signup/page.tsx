"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Scale, Eye, EyeOff, Mail, Lock, User, Shield, Phone, MapPin, Award } from "lucide-react"
import Link from "next/link"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [userType, setUserType] = useState<"user" | "lawyer">("user")
  const [userFormData, setUserFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    subscribeNewsletter: false,
  })
  const [lawyerFormData, setLawyerFormData] = useState({
    firstName: "",
    lastName: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = userType === "user" ? userFormData : lawyerFormData
    console.log("Signup attempt:", { ...formData, userType })
  }

  const handleUserInputChange = (field: string, value: string | boolean) => {
    setUserFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleLawyerInputChange = (field: string, value: string | boolean) => {
    setLawyerFormData((prev) => ({ ...prev, [field]: value }))
  }

  const specializations = [
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

  const states = [
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
              onValueChange={(value) => setUserType(value as "user" | "lawyer")}
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
                  onInputChange={handleUserInputChange}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                  onToggleConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
                  onSubmit={handleSubmit}
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
                  onInputChange={handleLawyerInputChange}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                  onToggleConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
                  onSubmit={handleSubmit}
                  specializations={specializations}
                  states={states}
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

function UserSignupForm({
  formData,
  showPassword,
  showConfirmPassword,
  onInputChange,
  onTogglePassword,
  onToggleConfirmPassword,
  onSubmit,
}: {
  formData: any
  showPassword: boolean
  showConfirmPassword: boolean
  onInputChange: (field: string, value: string | boolean) => void
  onTogglePassword: () => void
  onToggleConfirmPassword: () => void
  onSubmit: (e: React.FormEvent) => void
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={(e) => onInputChange("firstName", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={(e) => onInputChange("lastName", e.target.value)}
            required
          />
        </div>
      </div>

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
        <Label htmlFor="phone">Phone Number</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="phone"
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={(e) => onInputChange("phone", e.target.value)}
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
            placeholder="Create a strong password"
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

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => onInputChange("confirmPassword", e.target.value)}
            className="pl-10 pr-10"
            required
          />
          <button
            type="button"
            onClick={onToggleConfirmPassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="agreeToTerms"
            checked={formData.agreeToTerms}
            onCheckedChange={(checked) => onInputChange("agreeToTerms", checked as boolean)}
            required
          />
          <Label htmlFor="agreeToTerms" className="text-sm">
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
            id="subscribeNewsletter"
            checked={formData.subscribeNewsletter}
            onCheckedChange={(checked) => onInputChange("subscribeNewsletter", checked as boolean)}
          />
          <Label htmlFor="subscribeNewsletter" className="text-sm">
            Subscribe to our newsletter for legal updates and tips
          </Label>
        </div>
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={!formData.agreeToTerms}>
        Create User Account
      </Button>
    </form>
  )
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
}: {
  formData: any
  showPassword: boolean
  showConfirmPassword: boolean
  onInputChange: (field: string, value: string | boolean) => void
  onTogglePassword: () => void
  onToggleConfirmPassword: () => void
  onSubmit: (e: React.FormEvent) => void
  specializations: string[]
  states: string[]
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={(e) => onInputChange("firstName", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={(e) => onInputChange("lastName", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
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
          <Label htmlFor="phone">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="phone"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => onInputChange("phone", e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="barCouncilNumber">Bar Council Registration Number</Label>
        <div className="relative">
          <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="barCouncilNumber"
            placeholder="Enter your Bar Council number"
            value={formData.barCouncilNumber}
            onChange={(e) => onInputChange("barCouncilNumber", e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="specialization">Primary Specialization</Label>
          <Select value={formData.specialization} onValueChange={(value) => onInputChange("specialization", value)}>
            <SelectTrigger>
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
            <SelectTrigger>
              <SelectValue placeholder="Select experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-2">0-2 years</SelectItem>
              <SelectItem value="3-5">3-5 years</SelectItem>
              <SelectItem value="6-10">6-10 years</SelectItem>
              <SelectItem value="11-15">11-15 years</SelectItem>
              <SelectItem value="16-20">16-20 years</SelectItem>
              <SelectItem value="20+">20+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Select value={formData.state} onValueChange={(value) => onInputChange("state", value)}>
            <SelectTrigger>
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
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="city"
              placeholder="Enter your city"
              value={formData.city}
              onChange={(e) => onInputChange("city", e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
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

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => onInputChange("confirmPassword", e.target.value)}
            className="pl-10 pr-10"
            required
          />
          <button
            type="button"
            onClick={onToggleConfirmPassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="agreeToTerms"
            checked={formData.agreeToTerms}
            onCheckedChange={(checked) => onInputChange("agreeToTerms", checked as boolean)}
            required
          />
          <Label htmlFor="agreeToTerms" className="text-sm">
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
            id="subscribeNewsletter"
            checked={formData.subscribeNewsletter}
            onCheckedChange={(checked) => onInputChange("subscribeNewsletter", checked as boolean)}
          />
          <Label htmlFor="subscribeNewsletter" className="text-sm">
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

      <Button type="submit" className="w-full" size="lg" disabled={!formData.agreeToTerms}>
        Create Lawyer Account
      </Button>
    </form>
  )
}
