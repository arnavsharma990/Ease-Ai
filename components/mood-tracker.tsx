"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Smile, Meh, Frown, ThumbsUp, Heart, AlertCircle, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { MoodCalendar } from "./mood-calendar"

type Mood = "great" | "good" | "okay" | "bad" | "awful"

type MoodEntry = {
  date: string
  mood: Mood
  note?: string
}

interface MoodTrackerProps {
  selectedDate: Date
  onDateSelect: (date: Date | undefined) => void
  moodHistory: MoodEntry[]
  onMoodUpdate: (mood: Mood | undefined, note: string) => void
}

export function MoodTracker({ selectedDate, onDateSelect, moodHistory, onMoodUpdate }: MoodTrackerProps) {
  const [currentMood, setCurrentMood] = useState<Mood>()
  const [note, setNote] = useState("")
  const [saveMessage, setSaveMessage] = useState("")

  const saveMood = () => {
    if (currentMood) {
      onMoodUpdate(currentMood, note)
      setSaveMessage("Mood saved successfully!")
      setTimeout(() => setSaveMessage(""), 3000)
    }
  }

  const deleteMoodEntry = () => {
    setCurrentMood(undefined)
    setNote("")
    onMoodUpdate(undefined, "")
  }

  return (
    <Card className="w-full border-none shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-4">How are you feeling today?</h3>
              <div className="grid grid-cols-5 gap-2 mb-6">
                <Button
                  variant="outline"
                  className={cn(
                    "flex flex-col items-center p-3 h-auto border-2 transition-all",
                    currentMood === "great" 
                      ? "ring-2 ring-pink-500 bg-pink-50 dark:bg-pink-900/20 border-pink-500" 
                      : "hover:border-pink-500 hover:text-pink-600"
                  )}
                  onClick={() => setCurrentMood("great")}
                >
                  <Heart className="h-6 w-6 mb-1 text-pink-500" />
                  <span className="text-xs">Great</span>
                </Button>
                <Button
                  variant="outline"
                  className={cn(
                    "flex flex-col items-center p-3 h-auto border-2 transition-all",
                    currentMood === "good" 
                      ? "ring-2 ring-green-500 bg-green-50 dark:bg-green-900/20 border-green-500" 
                      : "hover:border-green-500 hover:text-green-600"
                  )}
                  onClick={() => setCurrentMood("good")}
                >
                  <ThumbsUp className="h-6 w-6 mb-1 text-green-500" />
                  <span className="text-xs">Good</span>
                </Button>
                <Button
                  variant="outline"
                  className={cn(
                    "flex flex-col items-center p-3 h-auto border-2 transition-all",
                    currentMood === "okay" 
                      ? "ring-2 ring-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500" 
                      : "hover:border-yellow-500 hover:text-yellow-600"
                  )}
                  onClick={() => setCurrentMood("okay")}
                >
                  <Smile className="h-6 w-6 mb-1 text-yellow-500" />
                  <span className="text-xs">Okay</span>
                </Button>
                <Button
                  variant="outline"
                  className={cn(
                    "flex flex-col items-center p-3 h-auto border-2 transition-all",
                    currentMood === "bad" 
                      ? "ring-2 ring-orange-500 bg-orange-50 dark:bg-orange-900/20 border-orange-500" 
                      : "hover:border-orange-500 hover:text-orange-600"
                  )}
                  onClick={() => setCurrentMood("bad")}
                >
                  <Meh className="h-6 w-6 mb-1 text-orange-500" />
                  <span className="text-xs">Bad</span>
                </Button>
                <Button
                  variant="outline"
                  className={cn(
                    "flex flex-col items-center p-3 h-auto border-2 transition-all",
                    currentMood === "awful" 
                      ? "ring-2 ring-red-500 bg-red-50 dark:bg-red-900/20 border-red-500" 
                      : "hover:border-red-500 hover:text-red-600"
                  )}
                  onClick={() => setCurrentMood("awful")}
                >
                  <Frown className="h-6 w-6 mb-1 text-red-500" />
                  <span className="text-xs">Awful</span>
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="note" className="text-sm font-medium">Notes (optional)</Label>
                <Textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="How are you feeling? What's on your mind?"
                  className="mt-1.5 min-h-[100px] bg-white/50 dark:bg-slate-800/50 resize-none"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={saveMood}
                  disabled={!currentMood}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                >
                  Save Mood
                </Button>
                {(currentMood || note) && (
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

          <div className="bg-white/50 dark:bg-slate-800/50 rounded-xl p-4">
            <h3 className="font-medium mb-4">Your Mood History</h3>
            <MoodCalendar
              selectedDate={selectedDate}
              onSelect={onDateSelect}
              moodHistory={moodHistory}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

