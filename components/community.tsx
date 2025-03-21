'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Heart, Share2, Users, Shield, BookOpen } from "lucide-react"

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

const samplePosts: Post[] = [
  {
    id: "1",
    author: {
      name: "Sarah M.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    content: "Just completed my first guided meditation session. Feeling so much more centered and peaceful. Anyone else practice mindfulness regularly?",
    likes: 24,
    comments: 8,
    time: "2h ago"
  },
  {
    id: "2",
    author: {
      name: "Alex P.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    },
    content: "Having a tough day but this community always helps me feel less alone. Grateful for all of you. 💜",
    likes: 42,
    comments: 15,
    time: "4h ago"
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

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Community Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {guidelines.map((guideline) => (
              <div key={guideline.title} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <guideline.icon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium">{guideline.title}</h3>
                  <p className="text-sm text-muted-foreground">{guideline.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="feed">Community Feed</TabsTrigger>
          <TabsTrigger value="groups">Support Groups</TabsTrigger>
        </TabsList>
        
        <TabsContent value="feed" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <Textarea
                placeholder="Share your thoughts, experiences, or ask for support..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="mb-4"
              />
              <div className="flex justify-end">
                <Button>
                  Share Post
                </Button>
              </div>
            </CardContent>
          </Card>

          {samplePosts.map((post) => (
            <Card key={post.id}>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src={post.author.avatar} />
                    <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{post.author.name}</h3>
                      <span className="text-sm text-muted-foreground">{post.time}</span>
                    </div>
                    <p className="mt-2 text-muted-foreground">{post.content}</p>
                    <div className="mt-4 flex gap-4">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Heart className="h-4 w-4" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <MessageCircle className="h-4 w-4" />
                        {post.comments}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="groups" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Anxiety Support",
                members: 234,
                description: "A safe space to discuss anxiety and share coping strategies."
              },
              {
                title: "Mindfulness Practice",
                members: 156,
                description: "Daily mindfulness exercises and meditation discussions."
              },
              {
                title: "Stress Management",
                members: 189,
                description: "Tips and discussions about managing daily stress."
              },
              {
                title: "Positive Growth",
                members: 145,
                description: "Focus on personal development and positive thinking."
              }
            ].map((group) => (
              <Card key={group.title}>
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-2">{group.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{group.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {group.members} members
                    </span>
                    <Button variant="outline" size="sm">
                      Join Group
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 