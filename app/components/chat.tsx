"use client"

import { ArrowLeft, Sparkles, RotateCw, X, Send, Bot, Paperclip, SmilePlus, User } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import EmojiPicker, { Theme } from 'emoji-picker-react'
import type { EmojiClickData } from 'emoji-picker-react'

type Message = {
  role: 'assistant' | 'user'
  content: string
}

const INITIAL_GREETING = {
  role: 'assistant' as const,
  content: "Hello! I'm Sukoon AI, your mental wellness companion. I'm here to listen, support, and guide you through your mental health journey. How are you feeling today? 🌸"
}

export default function Chat() {
  const [isMinimized, setIsMinimized] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([INITIAL_GREETING])
  const [isLoading, setIsLoading] = useState(false)
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const emojiButtonRef = useRef<HTMLButtonElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false)
      return
    }
    scrollToBottom()
  }, [messages, isFirstLoad])

  const onEmojiClick = (emojiData: EmojiClickData) => {
    const cursorPosition = (document.querySelector('input') as HTMLInputElement)?.selectionStart || input.length
    const textBeforeCursor = input.slice(0, cursorPosition)
    const textAfterCursor = input.slice(cursorPosition)
    setInput(textBeforeCursor + emojiData.emoji + textAfterCursor)
    setShowEmojiPicker(false)
  }

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showEmojiPicker && emojiButtonRef.current && !emojiButtonRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showEmojiPicker])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setIsLoading(true)

    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer dummy-token' // Replace with actual auth token if needed
        },
        body: JSON.stringify({ message: userMessage })
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error. Please try again.' 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  if (isMinimized) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-full shadow-lg p-4 cursor-pointer"
        onClick={() => setIsMinimized(false)}
      >
        <Bot className="w-8 h-8 text-purple-500" />
      </motion.div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-[calc(100vh-6rem)] max-h-[calc(100vh-6rem)] bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-purple-100 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-purple-500" />
            <div>
              <h1 className="text-xl font-semibold flex items-center gap-2">
                Chat with Sukoon AI <Sparkles className="h-5 w-5 text-purple-500" />
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Online</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setMessages([INITIAL_GREETING])}
            className="hover:bg-purple-100 dark:hover:bg-gray-700"
          >
            <RotateCw className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMinimized(true)}
            className="hover:bg-purple-100 dark:hover:bg-gray-700"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((message, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "flex items-start space-x-2 max-w-[80%]",
                message.role === "user" ? "ml-auto flex-row-reverse space-x-reverse" : ""
              )}
            >
              <div className={cn(
                "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                message.role === "user" 
                  ? "bg-purple-100 dark:bg-purple-900" 
                  : "bg-blue-100 dark:bg-blue-900"
              )}>
                {message.role === "user" 
                  ? <User className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  : <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                }
              </div>
              <div className={cn(
                "rounded-2xl px-4 py-2 shadow-sm",
                message.role === "user"
                  ? "bg-purple-600 text-white"
                  : "bg-white dark:bg-gray-700"
              )}>
                {message.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start space-x-2"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-2xl px-4 py-2 shadow-sm">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-purple-100 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Button 
            type="button" 
            variant="ghost" 
            size="icon"
            className="hover:bg-purple-100 dark:hover:bg-gray-700"
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          <div className="relative">
            <Button 
              type="button" 
              variant="ghost" 
              size="icon"
              ref={emojiButtonRef}
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="hover:bg-purple-100 dark:hover:bg-gray-700"
            >
              <SmilePlus className="h-5 w-5" />
            </Button>
            {showEmojiPicker && (
              <div className="absolute bottom-full left-0 mb-2 z-50">
                <EmojiPicker
                  onEmojiClick={onEmojiClick}
                  autoFocusSearch={false}
                  theme={Theme.LIGHT}
                  height={350}
                  width={300}
                />
              </div>
            )}
          </div>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-transparent border-purple-100 dark:border-gray-700 focus:ring-purple-500 dark:focus:ring-purple-400"
          />
          <Button 
            type="submit" 
            className="bg-purple-500 hover:bg-purple-600 text-white"
            disabled={!input.trim() || isLoading}
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </motion.div>
  )
} 