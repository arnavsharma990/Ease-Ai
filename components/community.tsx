'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Heart, Share2, Users, Shield, BookOpen, Trash2, Ghost, Send, Smile, Menu } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Post = {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  likes: number
  comments: number
  time: string
}

type Message = {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  time: string
}

const samplePosts: Post[] = [
  {
    id: "1",
    author: {
      name: "Saksham B.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Saksham"
    },
    content: "Meditation has been a game-changer for my anxiety. Started with just 5 minutes a day, and now I'm up to 20 minutes. Small steps lead to big changes! 🧘‍♂️",
    likes: 42,
    comments: 15,
    time: "2h ago"
  },
  {
    id: "2",
    author: {
      name: "Tanishk S.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tanishk"
    },
    content: "Found this amazing breathing technique that helps with stress. Inhale for 4, hold for 4, exhale for 4. Try it out! 💫",
    likes: 35,
    comments: 12,
    time: "3h ago"
  },
  {
    id: "3",
    author: {
      name: "Siddharth M.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siddharth"
    },
    content: "Remember: It's okay to take breaks and prioritize your mental health. Your well-being comes first! 🌟",
    likes: 56,
    comments: 20,
    time: "4h ago"
  },
  {
    id: "4",
    author: {
      name: "Kinshuk G.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kinshuk"
    },
    content: "Just completed a month of daily journaling. It's amazing how writing down your thoughts can bring such clarity and peace. 📝",
    likes: 48,
    comments: 18,
    time: "5h ago"
  }
]

const guidelines = [
  {
    icon: Shield,
    title: "Safe Space",
    description: "This is a judgment-free zone. Be kind and supportive to others."
  },
  {
    icon: Users,
    title: "Respect Privacy",
    description: "What's shared here stays here. Don't share others' personal information."
  },
  {
    icon: BookOpen,
    title: "Share Wisely",
    description: "Share your experiences but avoid giving medical advice."
  }
]

export function Community() {
  const [activeTab, setActiveTab] = useState("feed")
  const [newPost, setNewPost] = useState("")
  const [posts, setPosts] = useState<Post[]>(samplePosts)
  const [isGhostMode, setIsGhostMode] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
  const [groupMessage, setGroupMessage] = useState("")
  const [groupMessages, setGroupMessages] = useState<Record<string, Message[]>>({
    "Anxiety Support": [
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
    ]
  })
  
  const handleCreatePost = () => {
    if (!newPost.trim()) return
    
    const currentUser = {
      name: isGhostMode ? "Anonymous User" : "You",
      avatar: isGhostMode 
        ? `https://api.dicebear.com/7.x/bottts/svg?seed=${Date.now()}` // Robot avatar for anonymous users
        : `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`
    }
    
    const post: Post = {
      id: Date.now().toString(),
      author: currentUser,
      content: newPost,
      likes: 0,
      comments: 0,
      time: "Just now"
    }
    
    setPosts(prevPosts => [post, ...prevPosts])
    setNewPost("")
  }

  const handleDeletePost = (postId: string) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId))
  }

  const handleSendGroupMessage = (groupName: string) => {
    if (!groupMessage.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      author: {
        name: isGhostMode ? "Anonymous User" : "You",
        avatar: isGhostMode 
          ? `https://api.dicebear.com/7.x/bottts/svg?seed=${Date.now()}`
          : `https://api.dicebear.com/7.x/avataaars/svg?seed=you`
      },
      content: groupMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setGroupMessages(prev => ({
      ...prev,
      [groupName]: [...(prev[groupName] || []), newMessage]
    }))
    setGroupMessage("")
  }

  const handleLikePost = (postId: string) => {
    setPosts(prevPosts => prevPosts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ))
  }

  const handleCommentPost = (postId: string) => {
    setPosts(prevPosts => prevPosts.map(post => 
      post.id === postId ? { ...post, comments: post.comments + 1 } : post
    ))
  }

  return (
    <div className="space-y-4 sm:space-y-8">
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

      <Card className="rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border-none shadow-lg">
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-lg sm:text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Community Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <div className="grid gap-3 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {guidelines.map((guideline, index) => (
              <motion.div
                key={guideline.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="flex gap-2 sm:gap-4 p-3 sm:p-6 rounded-[1rem] sm:rounded-[1.5rem] hover:bg-purple-50/80 dark:hover:bg-purple-900/10 transition-all"
              >
                <motion.div 
                  className="flex-shrink-0"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="h-8 w-8 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center shadow-inner">
                    <guideline.icon className="h-4 w-4 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </motion.div>
                <div>
                  <h3 className="font-medium text-sm sm:text-lg">{guideline.title}</h3>
                  <p className="text-[10px] sm:text-sm text-muted-foreground">{guideline.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mb-4">
            <TabsList className="grid w-full sm:w-[400px] grid-cols-2 rounded-full p-1 bg-purple-50 dark:bg-purple-900/10">
              <TabsTrigger value="feed" className="rounded-full text-xs sm:text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Community Feed</TabsTrigger>
              <TabsTrigger value="groups" className="rounded-full text-xs sm:text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Support Groups</TabsTrigger>
            </TabsList>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/10 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full">
                    <Ghost className={`h-3 w-3 sm:h-4 sm:w-4 ${isGhostMode ? 'text-purple-600' : 'text-gray-400'}`} />
                    <Switch
                      checked={isGhostMode}
                      onCheckedChange={setIsGhostMode}
                      className="data-[state=checked]:bg-purple-600"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Ghost Mode: Post anonymously</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <TabsContent value="feed" className="space-y-3 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-[1.5rem] sm:rounded-[2rem]">
                <CardContent className="p-3 sm:pt-6">
                  <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                    <Avatar className="h-7 w-7 sm:h-10 sm:w-10 border-2 border-purple-100 dark:border-purple-800">
                      <AvatarImage 
                        src={isGhostMode 
                          ? `https://api.dicebear.com/7.x/bottts/svg?seed=${Date.now()}`
                          : `https://api.dicebear.com/7.x/avataaars/svg?seed=you`} 
                      />
                      <AvatarFallback>{isGhostMode ? 'A' : 'Y'}</AvatarFallback>
                    </Avatar>
                    <span className="text-[10px] sm:text-sm text-muted-foreground">
                      Posting as: <span className="font-medium">{isGhostMode ? 'Anonymous User' : 'You'}</span>
                    </span>
                  </div>
                  <Textarea
                    placeholder="Share your thoughts, experiences, or ask for support..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="mb-3 sm:mb-4 min-h-[70px] sm:min-h-[100px] bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-purple-100 dark:border-purple-800 focus:border-purple-300 dark:focus:border-purple-600 rounded-[1rem] sm:rounded-[1.5rem] transition-all duration-200 hover:bg-white dark:hover:bg-gray-900 p-3 sm:p-6 text-xs sm:text-sm"
                  />
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleCreatePost}
                      disabled={!newPost.trim()}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-md hover:shadow-lg transition-all duration-200 rounded-full px-4 sm:px-8 py-1.5 sm:py-2 text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Share Post
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <AnimatePresence>
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <Card className="border-none shadow-md hover:shadow-lg transition-all duration-200 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-[1.5rem] sm:rounded-[2rem]">
                    <CardContent className="p-3 sm:pt-6 sm:px-8">
                      <div className="flex gap-3 sm:gap-6">
                        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                          <Avatar className="h-8 w-8 sm:h-14 sm:w-14 border-2 sm:border-4 border-purple-100 dark:border-purple-800 ring-2 sm:ring-4 ring-purple-50 dark:ring-purple-900/20">
                            <AvatarImage loading="lazy" src={post.author.avatar} />
                            <AvatarFallback className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900">
                              {post.author.name[0]}
                            </AvatarFallback>
                          </Avatar>
                        </motion.div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-sm sm:text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                              {post.author.name}
                            </h3>
                            <div className="flex items-center gap-2 sm:gap-4">
                              <span className="text-[10px] sm:text-sm text-muted-foreground bg-purple-50 dark:bg-purple-900/20 px-2 sm:px-4 py-0.5 sm:py-1 rounded-full">
                                {post.time}
                              </span>
                              {post.author.name === "You" && (
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-full"
                                    >
                                      <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete Post</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete this post? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleDeletePost(post.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white"
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              )}
                            </div>
                          </div>
                          <p className="mt-2 sm:mt-4 text-xs sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">{post.content}</p>
                          <div className="mt-3 sm:mt-6 flex gap-2 sm:gap-6">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="gap-1 sm:gap-2 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-600 dark:hover:text-pink-400 transition-colors rounded-full px-2 sm:px-6 py-1 sm:py-2 text-xs sm:text-sm"
                              onClick={() => handleLikePost(post.id)}
                            >
                              <Heart className={`h-3 w-3 sm:h-4 sm:w-4 ${post.likes > 0 ? 'fill-pink-500 text-pink-500' : ''}`} />
                              {post.likes}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="gap-1 sm:gap-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-colors rounded-full px-2 sm:px-6 py-1 sm:py-2 text-xs sm:text-sm"
                              onClick={() => handleCommentPost(post.id)}
                            >
                              <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                              {post.comments}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-full px-2 sm:px-6 py-1 sm:py-2 text-xs sm:text-sm"
                            >
                              <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </TabsContent>

          <TabsContent value="groups" className="space-y-3 sm:space-y-6">
            <div className="grid gap-3 sm:gap-6 grid-cols-1 sm:grid-cols-2">
              {[
                {
                  id: "anxiety-support",
                  title: "Anxiety Support",
                  members: 234,
                  description: "A safe space to discuss anxiety and share coping strategies."
                },
                {
                  id: "mindfulness-practice",
                  title: "Mindfulness Practice",
                  members: 156,
                  description: "Daily mindfulness exercises and meditation discussions."
                },
                {
                  id: "stress-management",
                  title: "Stress Management",
                  members: 189,
                  description: "Tips and discussions about managing daily stress."
                },
                {
                  id: "positive-growth",
                  title: "Positive Growth",
                  members: 145,
                  description: "Focus on personal development and positive thinking."
                }
              ].map((group) => (
                <Card key={group.id} className="rounded-[1.5rem] sm:rounded-[2rem] border-none shadow-md hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-3 sm:pt-6 sm:px-8">
                    <h3 className="font-medium text-base sm:text-xl mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{group.title}</h3>
                    <p className="text-[10px] sm:text-sm text-muted-foreground mb-3 sm:mb-6">{group.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] sm:text-sm bg-purple-50 dark:bg-purple-900/20 px-2 sm:px-4 py-0.5 sm:py-1 rounded-full">
                        {group.members} members
                      </span>
                      <Link href={`/community/${group.id}`}>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="rounded-full px-3 sm:px-6 py-1 sm:py-2 text-xs sm:text-sm hover:bg-purple-50 dark:hover:bg-purple-900/20"
                        >
                          Join Group
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 