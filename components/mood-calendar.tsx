"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Heart, ThumbsUp, Smile, Meh, Frown } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Function to get mood for a specific date
  const getMoodForDate = (date: Date): Mood | null => {
    if (!mounted) return null

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
    if (!mounted) {
      return (
        <div className="h-9 w-9 flex items-center justify-center rounded-full transition-colors">
          {date.getDate()}
        </div>
      )
    }

    const mood = getMoodForDate(date)
    const isSelected = format(selectedDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")

    if (!mood) {
      return (
        <div className={cn(
          "h-9 w-9 flex items-center justify-center rounded-full transition-colors",
          isSelected && "bg-purple-100 dark:bg-purple-900/50"
        )}>
          {date.getDate()}
        </div>
      )
    }

    const moodColors = {
      great: "bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300",
      good: "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300",
      okay: "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300",
      bad: "bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300",
      awful: "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300"
    }

    const moodIcons = {
      great: <Heart className="h-3.5 w-3.5" />,
      good: <ThumbsUp className="h-3.5 w-3.5" />,
      okay: <Smile className="h-3.5 w-3.5" />,
      bad: <Meh className="h-3.5 w-3.5" />,
      awful: <Frown className="h-3.5 w-3.5" />
    }

    return (
      <div className={cn(
        "h-9 w-9 flex items-center justify-center relative rounded-full transition-all transform",
        moodColors[mood],
        isSelected && "ring-2 ring-purple-500 dark:ring-purple-400 scale-110"
      )}>
        <span className="text-sm font-medium">{date.getDate()}</span>
        <div className={cn(
          "absolute -bottom-1 -right-1 p-0.5 rounded-full",
          moodColors[mood]
        )}>
          {moodIcons[mood]}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-purple-100 dark:border-gray-700 p-4 shadow-lg">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onSelect}
        className="rounded-xl w-full max-w-[350px]"
        classNames={{
          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4 w-full",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-base font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            "h-7 w-7 bg-transparent p-0 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-full transition-colors",
            "text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex w-full justify-between",
          head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] uppercase",
          row: "flex w-full mt-2 justify-between",
          cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-transparent",
          day: "h-9 w-9 p-0 font-normal",
          day_selected: "bg-transparent",
          day_today: "bg-transparent text-purple-600 dark:text-purple-400 font-bold",
          day_outside: "opacity-50 cursor-default",
          day_disabled: "text-muted-foreground opacity-50",
          day_hidden: "invisible",
        }}
        components={{
          DayContent: ({ date }) => renderDay(date),
        }}
      />
    </div>
  )
}

