"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Chat } from "@/components/chat"
import { MoodTracker } from "@/components/mood-tracker"
import { BreathingExercise } from "@/components/breathing-exercise"
import { Journal } from "@/components/journal"
import { Resources } from "@/components/resources"
import { DailyAffirmation } from "@/components/daily-affirmation"

export function WellnessAssistant() {
  const [activeTab, setActiveTab] = useState("chat")

  return (
    <div className="mx-auto max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <DailyAffirmation />
        </div>
        <div className="md:col-span-3">
          <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 sm:grid-cols-5 w-full">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="mood">Mood</TabsTrigger>
              <TabsTrigger value="breathing">Breathing</TabsTrigger>
              <TabsTrigger value="journal" className="hidden sm:block">
                Journal
              </TabsTrigger>
              <TabsTrigger value="resources" className="hidden sm:block">
                Resources
              </TabsTrigger>
            </TabsList>

            {/* Secondary tabs for mobile only */}
            <TabsList className="grid grid-cols-2 w-full sm:hidden mt-2">
              <TabsTrigger value="journal">Journal</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="chat">
              <Chat />
            </TabsContent>
            <TabsContent value="mood">
              <MoodTracker />
            </TabsContent>
            <TabsContent value="breathing">
              <BreathingExercise />
            </TabsContent>
            <TabsContent value="journal">
              <Journal />
            </TabsContent>
            <TabsContent value="resources">
              <Resources />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

