"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Clock, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

type Therapist = {
  readonly id: number
  readonly name: string
  readonly specialty: string
  readonly experience: string
  readonly description: string
  readonly availability: readonly string[]
  readonly image: string
}

const therapists = {
  therapy: [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialty: "Anxiety & Depression",
      experience: "10+ years experience",
      description: "Dr. Sharma specializes in cognitive behavioral therapy and has helped hundreds of clients overcome anxiety and depression.",
      availability: ["Monday", "Wednesday", "Friday"],
      image: "/placeholder-avatar.jpg"
    },
    {
      id: 2,
      name: "Dr. Rahul Mehta",
      specialty: "Trauma & PTSD",
      experience: "8+ years experience",
      description: "With expertise in trauma-focused therapy, Dr. Mehta helps clients process difficult experiences and build resilience.",
      availability: ["Tuesday", "Thursday", "Saturday"],
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
      image: "/placeholder-avatar.jpg"
    }
  ]
} as const

const consultationTitles = {
  therapy: "Therapy Session",
  stress: "Stress Management",
  mental: "Mental Exercises"
} as const

export default function BookingPage() {
  const params = useParams()
  const [consultationType, setConsultationType] = useState<keyof typeof therapists | null>(null)
  const [availableTherapists, setAvailableTherapists] = useState<readonly Therapist[]>([])

  useEffect(() => {
    const type = params.type as keyof typeof therapists
    if (type && type in therapists) {
      setConsultationType(type)
      setAvailableTherapists(therapists[type])
    }
  }, [params.type])

  if (!consultationType) {
    return null // or loading state
  }

  return (
    <div className="container max-w-6xl py-10 min-h-screen">
      <div className="space-y-8">
        {/* Back Button and Header */}
        <div className="space-y-6">
          <Link 
            href="/consultation/book"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to all consultation types
          </Link>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Book a {consultationTitles[consultationType]}</h1>
            <p className="text-xl text-muted-foreground">
              Choose a therapist who specializes in your area of concern.
            </p>
          </div>
        </div>

        {/* Therapist Cards */}
        <div className="space-y-6">
          {availableTherapists.map((therapist) => (
            <motion.div
              key={therapist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden">
                <div className="flex flex-col md:flex-row gap-6 p-6">
                  {/* Avatar Section */}
                  <div className="w-full md:w-48 h-48 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                      <User className="w-24 h-24 text-gray-400" />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">{therapist.name}</h2>
                        <span className="text-sm text-muted-foreground">
                          {therapist.experience}
                        </span>
                      </div>
                      <p className="text-muted-foreground">
                        Specialty: {therapist.specialty}
                      </p>
                    </div>

                    <p>{therapist.description}</p>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Available on:</p>
                        <div className="flex flex-wrap gap-2">
                          {therapist.availability.map((day) => (
                            <Badge key={day} variant="secondary">
                              {day}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Button 
                          className="bg-gradient-to-r from-purple-500 to-violet-500 text-white hover:opacity-90 transition-opacity"
                          onClick={() => window.location.href = `/consultation/book/${consultationType}/${therapist.id}`}
                        >
                          Book Appointment
                        </Button>
                        <Button variant="outline">
                          View Full Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 