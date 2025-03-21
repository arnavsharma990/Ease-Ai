"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Clock, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"

const therapists = {
  therapy: [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialty: "Anxiety & Depression",
      experience: "10+ years experience",
      description: "Dr. Sharma specializes in cognitive behavioral therapy and has helped hundreds of clients overcome anxiety and depression.",
      availability: ["Monday", "Wednesday", "Friday"],
      duration: "50 minutes",
      fee: "₹1,500",
      image: "/placeholder-avatar.jpg"
    },
    {
      id: 2,
      name: "Dr. Rahul Mehta",
      specialty: "Trauma & PTSD",
      experience: "8+ years experience",
      description: "With expertise in trauma-focused therapy, Dr. Mehta helps clients process difficult experiences and build resilience.",
      availability: ["Tuesday", "Thursday", "Saturday"],
      duration: "50 minutes",
      fee: "₹1,500",
      image: "/placeholder-avatar.jpg"
    }
  ],
  stress: [
    {
      id: 3,
      name: "Dr. Anjali Desai",
      specialty: "Stress Management",
      experience: "12+ years experience",
      description: "Dr. Desai is an expert in mindfulness-based stress reduction and helps clients develop effective coping strategies.",
      availability: ["Monday", "Tuesday", "Thursday"],
      duration: "45 minutes",
      fee: "₹1,200",
      image: "/placeholder-avatar.jpg"
    }
  ],
  mental: [
    {
      id: 4,
      name: "Dr. Vikram Singh",
      specialty: "Mental Wellness",
      experience: "15+ years experience",
      description: "Dr. Singh specializes in holistic mental wellness approaches and mindfulness-based cognitive therapy.",
      availability: ["Wednesday", "Friday", "Saturday"],
      duration: "60 minutes",
      fee: "₹1,800",
      image: "/placeholder-avatar.jpg"
    }
  ]
} as const

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM"
]

export default function BookAppointmentPage() {
  const params = useParams()
  const [date, setDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()
  const [sessionType, setSessionType] = useState<"Online" | "In-Person">("Online")

  // Find the therapist based on type and id
  const type = params.type as keyof typeof therapists
  const id = parseInt(params.id as string)
  const therapist = therapists[type]?.find(t => t.id === id)

  if (!therapist) {
    return null // or error state
  }

  return (
    <div className="container max-w-6xl py-10">
      <div className="space-y-8">
        {/* Back Button */}
        <Link 
          href={`/consultation/book/${type}`}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to therapists
        </Link>

        {/* Page Title */}
        <div>
          <h1 className="text-3xl font-bold">Book an Appointment with {therapist.name}</h1>
          <p className="text-muted-foreground mt-2">
            Fill in your details and select a convenient time for your session.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Therapist Details Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <h2 className="text-xl font-semibold">Therapist Details</h2>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="w-32 h-32 mx-auto bg-muted rounded-full overflow-hidden">
                <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                  <User className="w-16 h-16 text-gray-400" />
                </div>
              </div>

              {/* Therapist Info */}
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">{therapist.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Specialty: {therapist.specialty}
                </p>
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                  <Clock className="w-4 h-4" /> {therapist.experience}
                </p>
              </div>

              {/* Session Info */}
              <div className="pt-4 border-t space-y-2">
                <h4 className="font-medium">Session Information:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-muted-foreground">Duration:</span>
                  <span>{therapist.duration}</span>
                  <span className="text-muted-foreground">Fee:</span>
                  <span>{therapist.fee}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Form */}
          <Card className="md:col-span-2">
            <CardHeader>
              <h2 className="text-xl font-semibold">Book Your Appointment</h2>
              <p className="text-sm text-muted-foreground">
                Please select a date and time for your session
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="Enter your full name" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="Enter your phone number" className="mt-1.5" />
                </div>
              </div>

              <div>
                <Label htmlFor="concerns">Briefly describe your concerns</Label>
                <Textarea 
                  id="concerns" 
                  placeholder="Please share any specific concerns or topics you'd like to discuss"
                  className="mt-1.5"
                  rows={4}
                />
              </div>

              <div>
                <Label>Session Type</Label>
                <RadioGroup 
                  defaultValue="Online"
                  className="grid grid-cols-2 gap-4 mt-1.5"
                  onValueChange={(value) => setSessionType(value as "Online" | "In-Person")}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Online" id="online" />
                    <Label htmlFor="online">Online</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="In-Person" id="in-person" />
                    <Label htmlFor="in-person">In-Person</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Select Date</Label>
                  <div className="mt-1.5">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                    />
                  </div>
                </div>

                <div>
                  <Label>Select Time</Label>
                  <div className="grid grid-cols-2 gap-2 mt-1.5">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className="w-full"
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-purple-500 to-violet-500 text-white"
                size="lg"
              >
                Confirm Booking
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 