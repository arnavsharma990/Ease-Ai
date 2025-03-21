"use client"
import { Calendar } from "@/components/ui/calendar"
import { Heart, ThumbsUp, Smile, Meh, Frown } from "lucide-react"
import { format } from "date-fns"

type Mood = "great" | "good" | "okay" | "bad" | "awful"

type MoodEntry = {
  id: string
  date: string
  mood: Mood
  note: string
}

interface MoodCalendarProps {
  selectedDate: Date
  onSelect: (date: Date | undefined) => void
  moodHistory: MoodEntry[]
}

export function MoodCalendar({ selectedDate, onSelect, moodHistory }: MoodCalendarProps) {
  // Function to get mood for a specific date
  const getMoodForDate = (date: Date): Mood | null => {
    try {
      const dateStr = format(date, "yyyy-MM-dd")
      const entry = moodHistory.find(entry => {
        // Parse the entry date safely
        try {
          const entryDate = new Date(entry.date)
          // Check if the date is valid
          if (isNaN(entryDate.getTime())) {
            return false
          }
          return format(entryDate, "yyyy-MM-dd") === dateStr
        } catch {
          return false
        }
      })
      return entry?.mood || null
    } catch {
      return null
    }
  }

  // Custom day renderer
  const renderDay = (date: Date) => {
    const mood = getMoodForDate(date)

    if (!mood) {
      return <div className="h-8 w-8 flex items-center justify-center">{date.getDate()}</div>
    }

    return (
      <div className="h-8 w-8 flex items-center justify-center relative">
        <div
          className={`absolute inset-0 rounded-full ${
            mood === "great"
              ? "bg-pink-200 dark:bg-pink-800/50"
              : mood === "good"
                ? "bg-green-200 dark:bg-green-800/50"
                : mood === "okay"
                  ? "bg-yellow-200 dark:bg-yellow-800/50"
                  : mood === "bad"
                    ? "bg-orange-200 dark:bg-orange-800/50"
                    : "bg-red-200 dark:bg-red-800/50"
          } opacity-70`}
        ></div>
        <span className="z-10">{date.getDate()}</span>
        <div className="absolute bottom-0 right-0 z-10 opacity-90 scale-75">
          {mood === "great" && <Heart className="h-3 w-3 text-pink-500" />}
          {mood === "good" && <ThumbsUp className="h-3 w-3 text-green-500" />}
          {mood === "okay" && <Smile className="h-3 w-3 text-yellow-500" />}
          {mood === "bad" && <Meh className="h-3 w-3 text-orange-500" />}
          {mood === "awful" && <Frown className="h-3 w-3 text-red-500" />}
        </div>
      </div>
    )
  }

  return (
    <Calendar
      mode="single"
      selected={selectedDate}
      onSelect={onSelect}
      className="rounded-md border shadow p-3 bg-white dark:bg-slate-800"
      components={{
        DayContent: ({ date }) => renderDay(date),
      }}
    />
  )
}

