"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Bot, Send, User, ArrowLeft, Sparkles } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MENTAL_HEALTH_SYSTEM_PROMPT } from "@/lib/openai"

// Define message type
type Message = {
  id: string
  role: "user" | "assistant" | "system"
  content: string
}

export function Chat() {
  const { data: session } = useSession()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-message",
      role: "assistant",
      content:
        "Hello! I'm your SukoonAI Mental Wellness Assistant. How are you feeling today? I'm here to listen and provide support.",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Remove localStorage loading effect
  useEffect(() => {
    // Clear any existing chat history from localStorage
    localStorage.removeItem('chatHistory');
  }, []);

  // Remove localStorage saving effect
  // useEffect(() => {
  //   if (messages.length > 1) {
  //     localStorage.setItem('chatHistory', JSON.stringify(messages));
  //   }
  // }, [messages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!input.trim() || isLoading) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("") // Clear input
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.user?.email}`,
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      // Add assistant message
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.response,
        },
      ])
    } catch (error) {
      console.error("Error:", error)
      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I apologize, but I'm having trouble responding right now. Please try again later.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-white">
      <div className="relative h-screen flex flex-col">
        <div className="flex-1 container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-6">
            <Button 
              onClick={() => router.push('/')}
              variant="ghost" 
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <h1 className="text-2xl font-semibold text-purple-600">
              SukoonAI Chat
            </h1>
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-2xl p-6">
              <h2 className="text-2xl font-semibold mb-2">Chat Support</h2>
              <p className="text-lg text-blue-50">Share your thoughts and feelings in a safe, supportive space.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <ScrollArea className="h-[450px] p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                  {messages.filter(m => m.role !== "system").map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex items-start gap-3 transition-all",
                        message.role === "user"
                          ? "flex-row-reverse"
                          : ""
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-xl shadow-sm",
                          message.role === "user"
                            ? "bg-gradient-to-r from-blue-500 to-teal-500"
                            : "bg-gradient-to-r from-purple-500 to-pink-500"
                        )}
                      >
                        {message.role === "user" ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <Bot className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <div
                        className={cn(
                          "px-4 py-2.5 rounded-xl text-sm max-w-[80%]",
                          message.role === "user"
                            ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white"
                            : "bg-gray-50 text-gray-700"
                        )}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-sm">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex gap-2 items-center bg-gray-50 rounded-xl px-4 py-2.5">
                        <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "0s" }}></span>
                        <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                        <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="p-4 border-t border-gray-100">
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                  <Input
                    id="message"
                    name="message"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                    className="flex-1 bg-gray-50 border-0 focus:ring-2 focus:ring-blue-500 text-sm rounded-xl"
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-sm hover:from-blue-600 hover:to-teal-600 rounded-xl px-4"
                  >
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


