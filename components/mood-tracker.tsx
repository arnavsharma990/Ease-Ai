"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Smile, Meh, Frown, ThumbsUp, Heart, AlertCircle, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { Alert, AlertDescription } from "@/components/ui/alert"

type Mood = "great" | "good" | "okay" | "bad" | "awful"

type MoodEntry = {
  id: string
  date: string // Store as ISO string for reliable serialization
  mood: Mood
  note: string
}

interface MoodTrackerProps {
  selectedDate: Date
  onDateSelect: (date: Date | undefined) => void
  moodHistory: MoodEntry[]
  onMoodUpdate: (newMoodHistory: MoodEntry[]) => void
}

export function MoodTracker({ selectedDate, onDateSelect, moodHistory, onMoodUpdate }: MoodTrackerProps) {
  const [currentMood, setCurrentMood] = useState<Mood | null>(null)
  const [note, setNote] = useState("")
  const [saveMessage, setSaveMessage] = useState("")

  // Check if there's an entry for the selected date
  useEffect(() => {
    const selectedDateStr = format(selectedDate, "yyyy-MM-dd")
    const existingEntry = moodHistory.find((entry) => {
      const entryDate = format(new Date(entry.date), "yyyy-MM-dd")
      return entryDate === selectedDateStr
    })

    if (existingEntry) {
      setCurrentMood(existingEntry.mood)
      setNote(existingEntry.note)
    } else {
      setCurrentMood(null)
      setNote("")
    }
  }, [selectedDate, moodHistory])

  const saveMood = () => {
    if (!currentMood) return

    try {
      // Create a new entry
      const newEntry: MoodEntry = {
        id: Date.now().toString(),
        date: selectedDate.toISOString(),
        mood: currentMood,
        note,
      }

      // Remove any existing entry for this date
      const selectedDateStr = format(selectedDate, "yyyy-MM-dd")
      const filteredHistory = moodHistory.filter((entry) => {
        const entryDate = format(new Date(entry.date), "yyyy-MM-dd")
        return entryDate !== selectedDateStr
      })

      // Add the new entry
      const newHistory = [...filteredHistory, newEntry]
      onMoodUpdate(newHistory)

      // Save to localStorage
      localStorage.setItem("moodHistory", JSON.stringify(newHistory))

      // Show success message
      setSaveMessage("Mood saved successfully!")
      setTimeout(() => setSaveMessage(""), 3000)
    } catch (error) {
      console.error("Error saving mood:", error)
      setSaveMessage("Error saving mood. Please try again.")
      setTimeout(() => setSaveMessage(""), 3000)
    }
  }

  const deleteMoodEntry = () => {
    try {
      // Remove the entry for this date
      const selectedDateStr = format(selectedDate, "yyyy-MM-dd")
      const newHistory = moodHistory.filter((entry) => {
        const entryDate = format(new Date(entry.date), "yyyy-MM-dd")
        return entryDate !== selectedDateStr
      })

      // Update state and localStorage
      onMoodUpdate(newHistory)
      localStorage.setItem("moodHistory", JSON.stringify(newHistory))

      // Reset current mood and note
      setCurrentMood(null)
      setNote("")

      // Show success message
      setSaveMessage("Mood entry deleted successfully!")
      setTimeout(() => setSaveMessage(""), 3000)
    } catch (error) {
      console.error("Error deleting mood:", error)
      setSaveMessage("Error deleting mood entry. Please try again.")
      setTimeout(() => setSaveMessage(""), 3000)
    }
  }

  const getMoodIcon = (mood: Mood) => {
    switch (mood) {
      case "great":
        return <Heart className="h-6 w-6 text-pink-500" />
      case "good":
        return <ThumbsUp className="h-6 w-6 text-green-500" />
      case "okay":
        return <Smile className="h-6 w-6 text-yellow-500" />
      case "bad":
        return <Meh className="h-6 w-6 text-orange-500" />
      case "awful":
        return <Frown className="h-6 w-6 text-red-500" />
    }
  }

  const getMoodColor = (mood: Mood) => {
    switch (mood) {
      case "great":
        return "bg-pink-100 border-pink-300 dark:bg-pink-900/30 dark:border-pink-700"
      case "good":
        return "bg-green-100 border-green-300 dark:bg-green-900/30 dark:border-green-700"
      case "okay":
        return "bg-yellow-100 border-yellow-300 dark:bg-yellow-900/30 dark:border-yellow-700"
      case "bad":
        return "bg-orange-100 border-orange-300 dark:bg-orange-900/30 dark:border-orange-700"
      case "awful":
        return "bg-red-100 border-red-300 dark:bg-red-900/30 dark:border-red-700"
    }
  }

  // Function to check if a date has a mood entry and get its mood
  const getMoodForDate = (date: Date): Mood | null => {
    const dateStr = format(date, "yyyy-MM-dd")

    for (const entry of moodHistory) {
      const entryDate = format(new Date(entry.date), "yyyy-MM-dd")
      if (entryDate === dateStr) {
        return entry.mood
      }
    }

    return null
  }

  return (
    <Card className="w-full border-none shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur">
      <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-t-lg">
        <CardTitle>Mood Tracker</CardTitle>
        <CardDescription className="text-white/90">Track your daily moods and see patterns over time</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {saveMessage && (
          <Alert className="mb-4 bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{saveMessage}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={onDateSelect}
              className="rounded-md border shadow p-3 bg-white dark:bg-slate-800"
              modifiers={{
                highlighted: (date) => {
                  const dateStr = format(date, "yyyy-MM-dd")
                  return moodHistory.some((entry) => {
                    const entryDate = format(new Date(entry.date), "yyyy-MM-dd")
                    return entryDate === dateStr
                  })
                },
              }}
              modifiersStyles={{
                highlighted: {
                  backgroundColor: "rgba(134, 239, 172, 0.25)",
                  borderRadius: "100%",
                },
              }}
            />

            <div className="mt-6">
              <h3 className="font-medium mb-2">Mood Legend</h3>
              <div className="grid grid-cols-5 gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded-full bg-pink-200 dark:bg-pink-800"></div>
                  <span className="text-xs">Great</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded-full bg-green-200 dark:bg-green-800"></div>
                  <span className="text-xs">Good</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded-full bg-yellow-200 dark:bg-yellow-800"></div>
                  <span className="text-xs">Okay</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded-full bg-orange-200 dark:bg-orange-800"></div>
                  <span className="text-xs">Bad</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded-full bg-red-200 dark:bg-red-800"></div>
                  <span className="text-xs">Awful</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">How are you feeling today?</h3>
            <div className="grid grid-cols-5 gap-2 mb-6">
              <Button
                variant="outline"
                className={`flex flex-col items-center p-3 h-auto ${currentMood === "great" ? "ring-2 ring-pink-500 bg-pink-50 dark:bg-pink-900/20" : ""}`}
                onClick={() => setCurrentMood("great")}
              >
                <Heart className="h-6 w-6 mb-1 text-pink-500" />
                <span className="text-xs">Great</span>
              </Button>
              <Button
                variant="outline"
                className={`flex flex-col items-center p-3 h-auto ${currentMood === "good" ? "ring-2 ring-green-500 bg-green-50 dark:bg-green-900/20" : ""}`}
                onClick={() => setCurrentMood("good")}
              >
                <ThumbsUp className="h-6 w-6 mb-1 text-green-500" />
                <span className="text-xs">Good</span>
              </Button>
              <Button
                variant="outline"
                className={`flex flex-col items-center p-3 h-auto ${currentMood === "okay" ? "ring-2 ring-yellow-500 bg-yellow-50 dark:bg-yellow-900/20" : ""}`}
                onClick={() => setCurrentMood("okay")}
              >
                <Smile className="h-6 w-6 mb-1 text-yellow-500" />
                <span className="text-xs">Okay</span>
              </Button>
              <Button
                variant="outline"
                className={`flex flex-col items-center p-3 h-auto ${currentMood === "bad" ? "ring-2 ring-orange-500 bg-orange-50 dark:bg-orange-900/20" : ""}`}
                onClick={() => setCurrentMood("bad")}
              >
                <Meh className="h-6 w-6 mb-1 text-orange-500" />
                <span className="text-xs">Bad</span>
              </Button>
              <Button
                variant="outline"
                className={`flex flex-col items-center p-3 h-auto ${currentMood === "awful" ? "ring-2 ring-red-500 bg-red-50 dark:bg-red-900/20" : ""}`}
                onClick={() => setCurrentMood("awful")}
              >
                <Frown className="h-6 w-6 mb-1 text-red-500" />
                <span className="text-xs">Awful</span>
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="note">Notes (optional)</Label>
                <Textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="How are you feeling? What's on your mind?"
                  className="mt-1.5"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={saveMood}
                  disabled={!currentMood}
                  className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
                >
                  Save Mood
                </Button>
                {(currentMood || note) && (
                  <Button
                    variant="destructive"
                    onClick={deleteMoodEntry}
                    className="px-3"
                    title="Delete mood entry"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

