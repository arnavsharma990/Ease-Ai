"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

const affirmations = [
  "I am worthy of love and respect.",
  "I trust myself to make the right decisions.",
  "I am in charge of how I feel today.",
  "I am grateful for everything I have in my life.",
  "I am enough just as I am.",
  "My potential is limitless, and I can achieve anything.",
  "I embrace challenges as opportunities to grow.",
  "I am becoming the best version of myself.",
  "I radiate positivity and attract positive energy.",
  "I am resilient and can overcome any obstacle.",
  "I deserve peace and happiness.",
  "My mind is clear, focused, and ready for today.",
  "I release all negative thoughts and welcome positivity.",
  "I am surrounded by supportive and loving people.",
  "I choose to be happy and content in this moment.",
  "I am proud of my progress, no matter how small.",
  "I am capable of amazing things.",
  "I am allowed to make mistakes and learn from them.",
  "I am at peace with my past and excited for my future.",
  "I am exactly where I need to be right now.",
]

export function DailyAffirmation() {
  const [affirmation, setAffirmation] = useState("")

  const getRandomAffirmation = () => {
    const randomIndex = Math.floor(Math.random() * affirmations.length)
    return affirmations[randomIndex]
  }

  useEffect(() => {
    // Check if we already have today's affirmation
    const today = new Date().toDateString()
    const savedAffirmation = localStorage.getItem("dailyAffirmation")
    const savedDate = localStorage.getItem("affirmationDate")

    if (savedAffirmation && savedDate === today) {
      setAffirmation(savedAffirmation)
    } else {
      // Generate new affirmation for today
      const newAffirmation = getRandomAffirmation()
      setAffirmation(newAffirmation)
      localStorage.setItem("dailyAffirmation", newAffirmation)
      localStorage.setItem("affirmationDate", today)
    }
  }, [])

  const refreshAffirmation = () => {
    const newAffirmation = getRandomAffirmation()
    setAffirmation(newAffirmation)
    localStorage.setItem("dailyAffirmation", newAffirmation)
    localStorage.setItem("affirmationDate", new Date().toDateString())
  }

  return (
    <Card className="h-full border-none shadow-lg bg-[#2D1B55] backdrop-blur">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-[#E6C97B]">Daily Affirmation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-center mb-4">
            <p className="text-lg font-medium italic text-[#E6C97B]">"{affirmation}"</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshAffirmation}
            className="mt-2 border-[#C9A227] text-[#E6C97B] hover:bg-[#3D2B65] shadow-[0_0_10px_rgba(201,162,39,0.3)] transition-all hover:shadow-[0_0_15px_rgba(201,162,39,0.5)]"
          >
            <RefreshCw className="h-3 w-3 mr-2" />
            New Affirmation
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

