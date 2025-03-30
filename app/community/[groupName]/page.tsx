'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Smile, ChevronLeft, Users, LogOut, Ghost, Menu } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { use } from "react"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Message = {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  time: string
}

type Participant = {
  id: string
  name: string
  avatar: string
  isOnline: boolean
  lastSeen?: string
  isAdmin?: boolean
}

const groupDescriptions = {
  "anxiety-support": {
    title: "Anxiety Support",
    description: "A safe space to discuss anxiety and share coping strategies."
  },
  "mindfulness-practice": {
    title: "Mindfulness Practice",
    description: "Daily mindfulness exercises and meditation discussions."
  },
  "stress-management": {
    title: "Stress Management",
    description: "Tips and discussions about managing daily stress."
  },
  "positive-growth": {
    title: "Positive Growth",
    description: "Focus on personal development and positive thinking."
  }
}

const mockParticipants: Participant[] = [
  {
    id: "0",
    name: "Dr. Smith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Doctor",
    isOnline: true,
    isAdmin: true
  },
  {
    id: "you",
    name: "You",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=you",
    isOnline: true
  },
  {
    id: "1",
    name: "Sarah M.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    isOnline: true
  },
  {
    id: "2",
    name: "Alex P.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    isOnline: true
  },
  {
    id: "3",
    name: "John D.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    isOnline: false,
    lastSeen: "2 hours ago"
  },
  {
    id: "4",
    name: "Maya R.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
    isOnline: true
  }
]

export default function GroupChat({ params }: { params: Promise<{ groupName: string }> }) {
  const router = useRouter()
  const { groupName } = use(params)
  const [message, setMessage] = useState("")
  const [isGhostMode, setIsGhostMode] = useState(false)
  const [participants, setParticipants] = useState<Participant[]>(mockParticipants)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      author: { name: "Sarah M.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
      content: "Hi everyone! I'm new here and looking forward to connecting with you all.",
      time: "2:30 PM"
    },
    {
      id: "2",
      author: { name: "Alex P.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
      content: "Welcome Sarah! Feel free to share whenever you're comfortable.",
      time: "2:32 PM"
    }
  ])

  const groupInfo = groupDescriptions[groupName as keyof typeof groupDescriptions]

  const handleLeaveGroup = () => {
    const confirmed = window.confirm("Are you sure you want to leave this group?")
    if (confirmed) {
      router.push('/community')
    }
  }

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      author: {
        name: isGhostMode ? "Anonymous User" : "You",
        avatar: isGhostMode 
          ? `https://api.dicebear.com/7.x/bottts/svg?seed=${Date.now()}`
          : `https://api.dicebear.com/7.x/avataaars/svg?seed=you`
      },
      content: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, newMessage])
    setMessage("")
  }

  if (!groupInfo) {
    router.push('/community')
    return null
  }

  const onlineParticipants = participants.filter(p => p.isOnline)

  return (
    <div className="container max-w-6xl py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/* Mobile Navigation */}
      <div className="sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Menu className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem>
              <Link href="/" className="w-full">Home</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/chat" className="w-full">AI Chat</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/community" className="w-full">Community</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/journal" className="w-full">Journal</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/profile" className="w-full">Profile</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/community">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/20">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {groupInfo.title}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">{groupInfo.description}</p>
          </div>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/10 px-3 sm:px-4 py-2 rounded-full">
                <Ghost className={`h-4 w-4 ${isGhostMode ? 'text-purple-600' : 'text-gray-400'}`} />
                <Switch
                  checked={isGhostMode}
                  onCheckedChange={setIsGhostMode}
                  className="data-[state=checked]:bg-purple-600"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ghost Mode: Chat anonymously</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 sm:gap-6">
        <Card className="border-none shadow-lg rounded-[1.5rem] sm:rounded-[2rem] h-[300px] lg:h-[calc(100vh-12rem)]">
          <div className="flex flex-col h-full">
            <div className="p-3 sm:p-4 border-b">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                  <h2 className="font-semibold text-sm sm:text-base">Participants</h2>
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {onlineParticipants.length} online
                </span>
              </div>
              <Button 
                variant="ghost" 
                className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm sm:text-base"
                onClick={handleLeaveGroup}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Leave Group
              </Button>
            </div>
            <ScrollArea className="flex-1 p-3 sm:p-4">
              <div className="space-y-2">
                {participants.map((participant) => (
                  <motion.div
                    key={participant.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20"
                  >
                    <div className="relative">
                      <Avatar className="h-7 w-7 sm:h-8 sm:w-8 border-2 border-purple-100 dark:border-purple-800">
                        <AvatarImage loading="lazy" src={participant.avatar} />
                        <AvatarFallback>{participant.name[0]}</AvatarFallback>
                      </Avatar>
                      {participant.isOnline && (
                        <span className="absolute bottom-0 right-0 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm font-medium flex items-center gap-2">
                        {participant.name}
                        {participant.isAdmin && (
                          <span className="px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 rounded-full">
                            Admin
                          </span>
                        )}
                      </span>
                      <span className="text-[10px] sm:text-xs text-muted-foreground">
                        {participant.isOnline ? "Online" : participant.lastSeen}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </Card>

        <Card className="border-none shadow-lg rounded-[1.5rem] sm:rounded-[2rem] h-[calc(100vh-16rem)] lg:h-[calc(100vh-12rem)]">
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 sm:gap-4 ${message.author.name === "You" ? "flex-row-reverse" : ""}`}
                  >
                    <Avatar className="h-7 w-7 sm:h-8 sm:w-8 border-2 border-purple-100 dark:border-purple-800">
                      <AvatarImage src={message.author.avatar} />
                      <AvatarFallback>{message.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className={`flex flex-col gap-1 ${message.author.name === "You" ? "items-end" : ""}`}>
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-medium">{message.author.name}</span>
                        <span className="text-[10px] sm:text-xs text-muted-foreground">{message.time}</span>
                      </div>
                      <div className={`rounded-xl sm:rounded-2xl px-3 sm:px-4 py-1.5 sm:py-2 max-w-[250px] sm:max-w-[300px] ${
                        message.author.name === "You"
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                          : "bg-purple-50 dark:bg-purple-900/20"
                      }`}>
                        <p className="text-xs sm:text-sm">{message.content}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-3 sm:p-4 border-t bg-white dark:bg-gray-950">
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/20"
                >
                  <Smile className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="rounded-full bg-purple-50/50 dark:bg-purple-900/10 border-0 focus-visible:ring-purple-500 text-xs sm:text-base"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/20"
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                >
                  <Send className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 