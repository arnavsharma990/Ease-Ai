"use client"

import { useState, useEffect } from "react"
import { MoodTracker } from "@/components/mood-tracker"
import { format } from "date-fns"

type Mood = "great" | "good" | "okay" | "bad" | "awful"

type MoodEntry = {
  id: string
  date: string
  mood: Mood
  note: string
}

export default function MoodPage() {
  const [mounted, setMounted] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("moodHistory")
    if (saved) {
      setMoodHistory(JSON.parse(saved))
    }
    setMounted(true)
  }, [])

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date)
    }
  }

  const handleMoodUpdate = (mood: Mood | undefined, note: string) => {
    if (!mood) {
      // Delete mood entry
      const selectedDateStr = format(selectedDate, "yyyy-MM-dd")
      const newHistory = moodHistory.filter(entry => {
        const entryDate = format(new Date(entry.date), "yyyy-MM-dd")
        return entryDate !== selectedDateStr
      })
      setMoodHistory(newHistory)
      localStorage.setItem("moodHistory", JSON.stringify(newHistory))
      return
    }

    // Add or update mood entry
    const selectedDateStr = format(selectedDate, "yyyy-MM-dd")
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: selectedDateStr,
      mood,
      note
    }

    const newHistory = [
      ...moodHistory.filter(entry => {
        const entryDate = format(new Date(entry.date), "yyyy-MM-dd")
        return entryDate !== selectedDateStr
      }),
      newEntry
    ]

    setMoodHistory(newHistory)
    localStorage.setItem("moodHistory", JSON.stringify(newHistory))
  }

  // Don't render anything until after hydration
  if (!mounted) {
    return null
  }

  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <MoodTracker
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          moodHistory={moodHistory}
          onMoodUpdate={handleMoodUpdate}
        />
      </div>
    </div>
  )
} 