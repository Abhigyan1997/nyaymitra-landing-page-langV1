"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Scale, MessageCircle, Phone, Video, User, CreditCard, Shield, CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState("")
  const [consultationType, setConsultationType] = useState("")
  const [step, setStep] = useState(1)

  // Mock lawyer data (in real app, this would come from URL params or API)
  const lawyer = {
    id: 1,
    name: "Adv. Priya Sharma",
    specialization: "Family Law",
    experience: 12,
    rating: 4.8,
    consultationFee: 1500,
    location: "Mumbai, Maharashtra",
    image: "/placeholder.svg?height=100&width=100",
  }

  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
    "06:00 PM",
  ]

  const consultationTypes = [
    {
      id: "chat",
      name: "Chat Consultation",
      description: "Text-based consultation via secure messaging",
      icon: MessageCircle,
      duration: "30 minutes",
      price: lawyer.consultationFee * 0.7,
    },
    {
      id: "call",
      name: "Phone Call",
      description: "Voice consultation over phone",
      icon: Phone,
      duration: "30 minutes",
      price: lawyer.consultationFee,
    },
    {
      id: "video",
      name: "Video Call",
      description: "Face-to-face consultation via video call",
      icon: Video,
      duration: "30 minutes",
      price: lawyer.consultationFee,
    },
    {
      id: "in-person",
      name: "In-Person Meeting",
      description: "Meet at lawyer's office",
      icon: User,
      duration: "45 minutes",
      price: lawyer.consultationFee * 1.5,
    },
  ]

  const selectedConsultationType = consultationTypes.find((type) => type.id === consultationType)

  const handleBooking = () => {
    // In real app, this would process the booking
    setStep(4) // Go to confirmation step
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Scale className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Nyay Mitra</span>
            </Link>
            <Link href="/lawyers">
              <Button variant="outline" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Lawyers
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step > stepNumber ? <CheckCircle className="h-5 w-5" /> : stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div className={`w-16 h-1 mx-2 ${step > stepNumber ? "bg-blue-600" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <span className="text-sm text-gray-600">
              {step === 1 && "Select Consultation Type"}
              {step === 2 && "Choose Date & Time"}
              {step === 3 && "Payment & Details"}
              {step === 4 && "Booking Confirmed"}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Select Consultation Type</CardTitle>
                  <CardDescription>Choose how you'd like to consult with the lawyer</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={consultationType} onValueChange={setConsultationType}>
                    <div className="space-y-4">
                      {consultationTypes.map((type) => {
                        const IconComponent = type.icon
                        return (
                          <div key={type.id} className="flex items-center space-x-2">
                            <RadioGroupItem value={type.id} id={type.id} />
                            <Label htmlFor={type.id} className="flex-1 cursor-pointer">
                              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                                <div className="flex items-center space-x-3">
                                  <IconComponent className="h-5 w-5 text-blue-600" />
                                  <div>
                                    <div className="font-medium">{type.name}</div>
                                    <div className="text-sm text-gray-600">{type.description}</div>
                                    <div className="text-sm text-gray-500">{type.duration}</div>
                                  </div>
                                </div>
                                <div className="text-lg font-semibold">₹{type.price}</div>
                              </div>
                            </Label>
                          </div>
                        )
                      })}
                    </div>
                  </RadioGroup>
                  <div className="mt-6">
                    <Button onClick={() => setStep(2)} disabled={!consultationType} className="w-full">
                      Continue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Select Date & Time</CardTitle>
                  <CardDescription>Choose your preferred consultation date and time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-base font-medium mb-3 block">Select Date</Label>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date() || date.getDay() === 0}
                        className="rounded-md border"
                      />
                    </div>
                    <div>
                      <Label className="text-base font-medium mb-3 block">Available Time Slots</Label>
                      <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
                        {timeSlots.map((time) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTime(time)}
                            className="justify-center"
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-4 mt-6">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                      Back
                    </Button>
                    <Button onClick={() => setStep(3)} disabled={!selectedDate || !selectedTime} className="flex-1">
                      Continue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Case Details</CardTitle>
                    <CardDescription>Provide details about your legal issue</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="caseTitle">Case Title</Label>
                      <Input id="caseTitle" placeholder="Brief title of your legal issue" />
                    </div>
                    <div>
                      <Label htmlFor="caseDescription">Case Description</Label>
                      <Textarea id="caseDescription" placeholder="Describe your legal issue in detail..." rows={4} />
                    </div>
                    <div>
                      <Label htmlFor="urgency">Urgency Level</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select urgency level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low - General consultation</SelectItem>
                          <SelectItem value="medium">Medium - Important matter</SelectItem>
                          <SelectItem value="high">High - Urgent legal issue</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Payment Information
                    </CardTitle>
                    <CardDescription>Secure payment processing</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input id="expiryDate" placeholder="MM/YY" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                      <div>
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input id="cardName" placeholder="John Doe" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Shield className="h-4 w-4" />
                      <span>Your payment information is secure and encrypted</span>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex space-x-4">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={handleBooking} className="flex-1">
                    Confirm Booking
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <Card>
                <CardContent className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
                  <p className="text-gray-600 mb-6">
                    Your consultation has been successfully booked. You will receive a confirmation email shortly.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>
                        <strong>Booking ID:</strong> BK-2024-001234
                      </div>
                      <div>
                        <strong>Date:</strong> {selectedDate?.toDateString()}
                      </div>
                      <div>
                        <strong>Time:</strong> {selectedTime}
                      </div>
                      <div>
                        <strong>Type:</strong> {selectedConsultationType?.name}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Button className="w-full">Go to Dashboard</Button>
                    <Button variant="outline" className="w-full">
                      Download Receipt
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Lawyer Info */}
                <div className="flex items-center space-x-3 mb-4 pb-4 border-b">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-gray-400" />
                  </div>
                  <div>
                    <div className="font-medium">{lawyer.name}</div>
                    <div className="text-sm text-gray-600">{lawyer.specialization}</div>
                    <div className="text-sm text-gray-500">{lawyer.experience} years exp.</div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="space-y-3 text-sm">
                  {selectedConsultationType && (
                    <div className="flex justify-between">
                      <span>Consultation Type:</span>
                      <span className="font-medium">{selectedConsultationType.name}</span>
                    </div>
                  )}
                  {selectedDate && (
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span className="font-medium">{selectedDate.toDateString()}</span>
                    </div>
                  )}
                  {selectedTime && (
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                  )}
                  {selectedConsultationType && (
                    <>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="font-medium">{selectedConsultationType.duration}</span>
                      </div>
                      <div className="border-t pt-3">
                        <div className="flex justify-between text-base font-semibold">
                          <span>Total Amount:</span>
                          <span>₹{selectedConsultationType.price}</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
