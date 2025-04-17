"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Smile, Meh, Frown, ThumbsUp, Heart, AlertCircle, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { MoodCalendar } from "./mood-calendar"
import { motion, AnimatePresence } from "framer-motion"

type Mood = "great" | "good" | "okay" | "bad" | "awful"

type MoodEntry = {
  id: string
  date: string
  mood: Mood
  note: string
}

interface MoodTrackerProps {
  selectedDate: Date
  onDateSelect: (date: Date | undefined) => void
  moodHistory: MoodEntry[]
  onMoodUpdate: (mood: Mood | undefined, note: string) => void
}

const moodConfig = {
  great: {
    icon: Heart,
    color: "pink",
    label: "Great",
    description: "Feeling fantastic and energetic"
  },
  good: {
    icon: ThumbsUp,
    color: "green",
    label: "Good",
    description: "Feeling positive and content"
  },
  okay: {
    icon: Smile,
    color: "yellow",
    label: "Okay",
    description: "Feeling balanced and neutral"
  },
  bad: {
    icon: Meh,
    color: "orange",
    label: "Bad",
    description: "Feeling down or stressed"
  },
  awful: {
    icon: Frown,
    color: "red",
    label: "Awful",
    description: "Feeling very low or overwhelmed"
  }
}

export function MoodTracker({ selectedDate, onDateSelect, moodHistory, onMoodUpdate }: MoodTrackerProps) {
  const [currentMood, setCurrentMood] = useState<Mood>()
  const [note, setNote] = useState("")
  const [saveMessage, setSaveMessage] = useState("")

  const handleSaveMood = () => {
    if (!currentMood) return;
    
    const newEntry: MoodEntry = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      mood: currentMood,
      note: note || ''
    };

    onMoodUpdate(currentMood, note)
    setSaveMessage("Mood saved successfully!")
    setTimeout(() => setSaveMessage(""), 3000)
  }

  const deleteMoodEntry = () => {
    setCurrentMood(undefined)
    setNote("")
    onMoodUpdate(undefined, "")
  }

  const selectedDateStr = format(selectedDate, "yyyy-MM-dd")
  const existingEntry = moodHistory.find(entry => format(new Date(entry.date), "yyyy-MM-dd") === selectedDateStr)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column - Mood Selection */}
      <Card className="lg:col-span-7 border-none shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
          <CardTitle>How are you feeling?</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <AnimatePresence mode="wait">
            {saveMessage && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-4"
              >
                <Alert className="bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{saveMessage}</AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-4 block">Select your mood for {format(selectedDate, "MMMM d, yyyy")}</Label>
              <div className="grid grid-cols-5 gap-3">
                {(Object.entries(moodConfig) as [Mood, typeof moodConfig.great][]).map(([mood, config]) => {
                  const Icon = config.icon
                  return (
                    <motion.button
                      key={mood}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentMood(mood)}
                      className={cn(
                        "flex flex-col items-center p-4 rounded-xl border-2 transition-all",
                        currentMood === mood
                          ? `ring-2 ring-${config.color}-500 bg-${config.color}-50 dark:bg-${config.color}-900/20 border-${config.color}-500`
                          : `hover:border-${config.color}-500 hover:text-${config.color}-600 border-gray-200 dark:border-gray-700`
                      )}
                    >
                      <Icon className={`h-8 w-8 mb-2 text-${config.color}-500`} />
                      <span className="font-medium text-sm">{config.label}</span>
                      <span className="text-xs text-muted-foreground mt-1">{config.description}</span>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="note" className="text-base font-medium">Add a note about your day</Label>
                <Textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="What's making you feel this way? Any specific events or thoughts?"
                  className="mt-2 min-h-[120px] bg-white/50 dark:bg-slate-800/50 resize-none"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleSaveMood}
                  disabled={!currentMood}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                >
                  Save Mood
                </Button>
                {(existingEntry || note) && (
                  <Button
                    variant="outline"
                    onClick={deleteMoodEntry}
                    className="px-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Right Column - Calendar */}
      <Card className="lg:col-span-5 border-none shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
          <CardTitle>Mood History</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <MoodCalendar
            selectedDate={selectedDate}
            onSelect={onDateSelect}
            moodHistory={moodHistory}
          />
        </CardContent>
      </Card>
    </div>
  )
}

