"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PenLine, Save, Trash2, CalendarIcon, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

type JournalEntry = {
  id: string
  date: string // Store as ISO string for reliable serialization
  title: string
  content: string
}

export function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [currentEntryId, setCurrentEntryId] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")
  const [highlightedDates, setHighlightedDates] = useState<Date[]>([])

  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem("journalEntries")
    if (savedEntries) {
      try {
        const parsedEntries = JSON.parse(savedEntries) as JournalEntry[]
        setEntries(parsedEntries)
        console.log("Loaded journal entries:", parsedEntries)
      } catch (e) {
        console.error("Failed to parse journal entries", e)
      }
    }
  }, [])

  // Check if there's an entry for the selected date
  useEffect(() => {
    const selectedDateStr = format(selectedDate, "yyyy-MM-dd")
    const existingEntry = entries.find((entry) => {
      const entryDate = format(new Date(entry.date), "yyyy-MM-dd")
      return entryDate === selectedDateStr
    })

    if (existingEntry) {
      setTitle(existingEntry.title)
      setContent(existingEntry.content)
      setCurrentEntryId(existingEntry.id)
      setIsEditing(false)
    } else {
      setTitle("")
      setContent("")
      setCurrentEntryId(null)
      setIsEditing(true)
    }
  }, [selectedDate, entries])

  // Function to check if a date has a journal entry
  const hasEntryForDate = (date: Date): boolean => {
    const dateStr = format(date, "yyyy-MM-dd")

    for (const entry of entries) {
      const entryDate = format(new Date(entry.date), "yyyy-MM-dd")
      if (entryDate === dateStr) {
        return true
      }
    }

    return false
  }

  const saveEntry = () => {
    if (!title.trim() && !content.trim()) return

    try {
      // Create a new entry
      const newEntry: JournalEntry = {
        id: currentEntryId || Date.now().toString(),
        date: selectedDate.toISOString(),
        title: title.trim() || `Journal Entry - ${format(selectedDate, "MMM d, yyyy")}`,
        content,
      }

      // Remove any existing entry for this date if we're not editing an existing entry
      let newEntries: JournalEntry[] = []
      if (currentEntryId) {
        // If editing, replace the existing entry
        newEntries = entries.map((entry) => (entry.id === currentEntryId ? newEntry : entry))
      } else {
        // If creating new, remove any entry for the same date
        const selectedDateStr = format(selectedDate, "yyyy-MM-dd")
        const filteredEntries = entries.filter((entry) => {
          const entryDate = format(new Date(entry.date), "yyyy-MM-dd")
          return entryDate !== selectedDateStr
        })
        newEntries = [...filteredEntries, newEntry]
      }

      // Update state
      setEntries(newEntries)

      // Save to localStorage
      localStorage.setItem("journalEntries", JSON.stringify(newEntries))
      console.log("Saved journal entries:", newEntries)

      // Show success message
      setSaveMessage("Journal entry saved successfully!")
      setTimeout(() => setSaveMessage(""), 3000)

      setCurrentEntryId(newEntry.id)
      setIsEditing(false)
    } catch (error) {
      console.error("Error saving journal entry:", error)
      setSaveMessage("Error saving entry. Please try again.")
      setTimeout(() => setSaveMessage(""), 3000)
    }
  }

  const deleteEntry = () => {
    if (!currentEntryId) return

    // Remove the entry
    const newEntries = entries.filter((entry) => entry.id !== currentEntryId)

    // Update state
    setEntries(newEntries)

    // Update highlighted dates
    const newDates = newEntries.map((entry) => new Date(entry.date))
    setHighlightedDates(newDates)

    // Save to localStorage
    localStorage.setItem("journalEntries", JSON.stringify(newEntries))

    // Show success message
    setSaveMessage("Journal entry deleted successfully!")
    setTimeout(() => setSaveMessage(""), 3000)

    setTitle("")
    setContent("")
    setCurrentEntryId(null)
    setIsEditing(true)
  }

  // Function to check if a date has a journal entry

  return (
    <Card className="w-full border-none shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-t-lg">
        <CardTitle>Journal</CardTitle>
        <CardDescription className="text-white/90">Record your thoughts, feelings, and experiences</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {saveMessage && (
          <Alert className="mb-4 bg-purple-50 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{saveMessage}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="flex flex-col items-center w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-purple-100 dark:border-gray-700 p-4 shadow-lg">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-xl w-full max-w-[350px]"
                modifiers={{
                  highlighted: (date) => {
                    const dateStr = format(date, "yyyy-MM-dd")
                    return entries.some((entry) => {
                      const entryDate = format(new Date(entry.date), "yyyy-MM-dd")
                      return entryDate === dateStr
                    })
                  },
                }}
                modifiersStyles={{
                  highlighted: {
                    backgroundColor: "rgba(167, 139, 250, 0.25)",
                    borderRadius: "100%",
                  },
                }}
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
                  day_selected: "bg-transparent text-purple-600 dark:text-purple-400 font-bold",
                  day_today: "bg-transparent text-purple-600 dark:text-purple-400 font-bold",
                  day_outside: "opacity-50 cursor-default",
                  day_disabled: "text-muted-foreground opacity-50",
                  day_hidden: "invisible",
                }}
              />
            </div>

            <div className="mt-6">
              <h3 className="font-medium mb-2">Recent Entries</h3>
              <ScrollArea className="h-[200px]">
                <div className="space-y-2">
                  {entries
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .slice(0, 10)
                    .map((entry) => (
                      <Button
                        key={entry.id}
                        variant="outline"
                        className={`w-full justify-start text-left ${
                          entry.id === currentEntryId ? "border-purple-500 dark:border-purple-400" : ""
                        }`}
                        onClick={() => setSelectedDate(new Date(entry.date))}
                      >
                        <div className="truncate">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {format(new Date(entry.date), "MMM d, yyyy")}
                            </span>
                          </div>
                          <div className="truncate font-medium">{entry.title}</div>
                        </div>
                      </Button>
                    ))}
                </div>
              </ScrollArea>
            </div>
          </div>

          <div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">
                  {isEditing ? (currentEntryId ? "Edit Entry" : "New Entry") : "Journal Entry"}
                </h3>
                <div className="flex gap-2">
                  {!isEditing && (
                    <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                      <PenLine className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  )}
                  {currentEntryId && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={deleteEntry}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Entry title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={!isEditing}
                  className="bg-white dark:bg-slate-800"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Write your thoughts here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  disabled={!isEditing}
                  className="min-h-[250px] resize-none bg-white dark:bg-slate-800"
                />
              </div>

              {isEditing && (
                <Button
                  onClick={saveEntry}
                  disabled={!title.trim() && !content.trim()}
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Entry
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

