'use client'

import { useEffect, useState } from "react"
import { FeatureLayout } from "@/components/feature-layout"
import { MoodTracker } from "@/components/mood-tracker"
import { MoodCalendar } from "@/components/mood-calendar"
import { MoodEntry } from "@/types"

export default function MoodPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([])

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
    
    // Load mood history from localStorage
    const savedMoodHistory = localStorage.getItem('moodHistory')
    if (savedMoodHistory) {
      setMoodHistory(JSON.parse(savedMoodHistory))
    }
  }, [])

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date)
    }
  }

  const handleMoodUpdate = (newMoodHistory: MoodEntry[]) => {
    setMoodHistory(newMoodHistory)
    localStorage.setItem('moodHistory', JSON.stringify(newMoodHistory))
  }

  return (
    <FeatureLayout title="Mood Tracking">
      <div className="grid gap-8 md:grid-cols-2">
        <MoodTracker
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          moodHistory={moodHistory}
          onMoodUpdate={handleMoodUpdate}
        />
        <MoodCalendar
          moodHistory={moodHistory}
          selectedDate={selectedDate}
          onSelect={handleDateSelect}
        />
      </div>
    </FeatureLayout>
  )
} 