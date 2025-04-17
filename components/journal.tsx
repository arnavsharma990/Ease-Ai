"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PenLine, Save, Trash2, CalendarIcon, AlertCircle, BookOpen } from "lucide-react"
import { format } from "date-fns"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

type JournalEntry = {
  id: string
  date: string
  title: string
  content: string
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

export function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [currentEntryId, setCurrentEntryId] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  useEffect(() => {
    const savedEntries = localStorage.getItem("journalEntries")
    if (savedEntries) {
      try {
        const parsedEntries = JSON.parse(savedEntries) as JournalEntry[]
        setEntries(parsedEntries)
      } catch (e) {
        console.error("Failed to parse journal entries", e)
      }
    }
  }, [])

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

  const saveEntry = () => {
    if (!title.trim() && !content.trim()) return

    try {
      const newEntry: JournalEntry = {
        id: currentEntryId || crypto.randomUUID(),
        date: selectedDate.toISOString(),
        title: title.trim() || `Journal Entry - ${format(selectedDate, "MMM d, yyyy")}`,
        content,
      }

      let newEntries: JournalEntry[]
      if (currentEntryId) {
        newEntries = entries.map((entry) => (entry.id === currentEntryId ? newEntry : entry))
      } else {
        const selectedDateStr = format(selectedDate, "yyyy-MM-dd")
        const filteredEntries = entries.filter((entry) => {
          const entryDate = format(new Date(entry.date), "yyyy-MM-dd")
          return entryDate !== selectedDateStr
        })
        newEntries = [...filteredEntries, newEntry]
      }

      setEntries(newEntries)
      localStorage.setItem("journalEntries", JSON.stringify(newEntries))
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

    const newEntries = entries.filter((entry) => entry.id !== currentEntryId)
    setEntries(newEntries)
    localStorage.setItem("journalEntries", JSON.stringify(newEntries))
    setSaveMessage("Journal entry deleted successfully!")
    setTimeout(() => setSaveMessage(""), 3000)
    setTitle("")
    setContent("")
    setCurrentEntryId(null)
    setIsEditing(true)
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 lg:grid-cols-12 gap-6"
    >
      {/* Left Column - Calendar and Recent Entries */}
      <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
        <Card className="border-none shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Select Date
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border shadow-sm"
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
                  backgroundColor: "rgba(147, 51, 234, 0.1)",
                  borderRadius: "100%",
                },
              }}
            />
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Recent Entries
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-2">
                {entries
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((entry) => (
                    <motion.div
                      key={entry.id}
                      whileHover={{ scale: 1.02 }}
                      className={cn(
                        "p-4 rounded-lg border transition-all cursor-pointer",
                        entry.id === currentEntryId
                          ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500"
                      )}
                      onClick={() => setSelectedDate(new Date(entry.date))}
                    >
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <CalendarIcon className="h-3 w-3" />
                        {format(new Date(entry.date), "MMM d, yyyy")}
                      </div>
                      <div className="font-medium line-clamp-1">{entry.title}</div>
                      <div className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {entry.content}
                      </div>
                    </motion.div>
                  ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>

      {/* Right Column - Entry Editor */}
      <motion.div variants={itemVariants} className="lg:col-span-8">
        <Card className="border-none shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle>
                {isEditing ? (currentEntryId ? "Edit Entry" : "New Entry") : "Journal Entry"}
              </CardTitle>
              <div className="flex gap-2">
                {!isEditing && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setIsEditing(true)}
                    className="bg-white/20 hover:bg-white/30 text-white"
                  >
                    <PenLine className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                )}
                {currentEntryId && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={deleteEntry}
                    className="bg-white/20 hover:bg-white/30 text-white"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                )}
              </div>
            </div>
            <CardDescription className="text-white/90">
              {format(selectedDate, "MMMM d, yyyy")}
            </CardDescription>
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
                <Label htmlFor="title" className="text-base font-medium">
                  Title
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your entry a title..."
                  disabled={!isEditing}
                  className="mt-2 bg-white/50 dark:bg-slate-800/50"
                />
              </div>

              <div>
                <Label htmlFor="content" className="text-base font-medium">
                  Your Thoughts
                </Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your thoughts, feelings, and experiences..."
                  disabled={!isEditing}
                  className="mt-2 min-h-[400px] bg-white/50 dark:bg-slate-800/50 resize-none"
                />
              </div>

              {isEditing && (
                <Button
                  onClick={saveEntry}
                  disabled={!title.trim() && !content.trim()}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Entry
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

