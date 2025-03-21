"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, UserCircle, Brain, GraduationCap } from "lucide-react"

const consultationTypes = [
  {
    id: "therapy",
    title: "Therapy Session",
    icon: <UserCircle className="w-6 h-6" />,
    description: "One-on-one session with a therapist to address mental health concerns.",
    duration: "50 minutes",
    price: "₹1,500",
    buttonText: "Book Therapy Session",
    color: "from-purple-500 to-violet-500"
  },
  {
    id: "stress",
    title: "Stress Management",
    icon: <Brain className="w-6 h-6" />,
    description: "Learn techniques to manage stress and improve overall wellbeing.",
    duration: "45 minutes",
    price: "₹1,200",
    buttonText: "Book Stress Management",
    color: "from-pink-500 to-rose-500"
  },
  {
    id: "mental",
    title: "Mental Exercises",
    icon: <GraduationCap className="w-6 h-6" />,
    description: "Session for mental health related exercises and guidance.",
    duration: "60 minutes",
    price: "₹1,800",
    buttonText: "Book Mental Exercises",
    color: "from-blue-500 to-cyan-500"
  }
]

export default function BookConsultationPage() {
  return (
    <div className="container max-w-6xl py-10 min-h-screen">
      <div className="space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Book a Consultation</h1>
          <p className="text-muted-foreground text-lg">
            Choose the type of consultation that best suits your needs.
          </p>
        </div>

        {/* Consultation Cards */}
        <div className="grid grid-cols-1 gap-6 max-w-xl mx-auto">
          {consultationTypes.map((type) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="relative overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-xl bg-gradient-to-br ${type.color} text-white`}>
                      {type.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle>{type.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {type.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      {type.duration}
                    </div>
                    <div className="text-lg font-bold">
                      {type.price}
                    </div>
                  </div>
                  <Button 
                    className={`w-full bg-gradient-to-r ${type.color} text-white hover:opacity-90 transition-opacity`}
                    onClick={() => window.location.href = `/consultation/book/${type.id}`}
                  >
                    {type.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Help Text */}
        <div className="text-center mt-8">
          <p className="text-muted-foreground mb-4">
            Not sure which consultation type is right for you?
          </p>
          <Button 
            variant="outline"
            onClick={() => window.location.href = "/contact"}
          >
            Contact Us for Guidance
          </Button>
        </div>
      </div>
    </div>
  )
} 