"use client"

import { useState, useEffect } from "react"
import { MoodTracker } from "@/components/mood-tracker"
import { format } from "date-fns"
import { motion } from "framer-motion"

type Mood = "great" | "good" | "okay" | "bad" | "awful"

type MoodEntry = {
  id: string
  date: string
  mood: Mood
  note: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-950"
    >
      <div className="container max-w-7xl mx-auto py-8 px-4">
        <motion.div 
          variants={itemVariants}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Track Your Mood Journey
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Monitor your emotional wellbeing and discover patterns in your mood over time
          </p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="max-w-5xl mx-auto"
        >
          <MoodTracker
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            moodHistory={moodHistory}
            onMoodUpdate={handleMoodUpdate}
          />
        </motion.div>
      </div>
    </motion.div>
  )
} 