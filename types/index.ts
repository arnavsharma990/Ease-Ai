export type Mood = "great" | "good" | "okay" | "bad" | "awful"

export type MoodEntry = {
  id: string
  date: string
  mood: Mood
  note: string
} 