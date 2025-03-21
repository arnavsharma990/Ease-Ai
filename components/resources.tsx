"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ExternalLink, BookOpen, Phone, Video, Music } from "lucide-react"

export function Resources() {
  return (
    <Card className="w-full border-none shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur">
      <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-lg">
        <CardTitle>Mental Health Resources</CardTitle>
        <CardDescription className="text-white/90">Helpful resources for mental wellness and support</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="crisis" className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="crisis">Crisis Support</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="apps">Apps & Tools</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[400px] mt-4 pr-4">
            <TabsContent value="crisis" className="space-y-4">
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <h3 className="text-lg font-semibold text-red-700 dark:text-red-300 flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Immediate Help
                </h3>
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                  If you're experiencing a mental health emergency, please contact emergency services or a crisis
                  hotline immediately.
                </p>
              </div>

              <div className="space-y-4">
                <ResourceItem
                  title="NIMHANS Mental Health Helpline"
                  description="National Institute of Mental Health and Neurosciences helpline for mental health support"
                  link="https://nimhans.ac.in"
                  phone="080-26995000 / 080-26995100"
                />

                <ResourceItem
                  title="Vandrevala Foundation"
                  description="24/7 helpline for emotional crisis and distress"
                  link="https://www.vandrevalafoundation.com"
                  phone="1860-2662-345 / +91 9999 666 555"
                />

                <ResourceItem
                  title="iCall Helpline"
                  description="Psychosocial helpline by TISS (Tata Institute of Social Sciences)"
                  link="https://icallhelpline.org"
                  phone="022-25521111 / +91 9152987821"
                />

                <ResourceItem
                  title="AASRA"
                  description="24/7 helpline for those feeling suicidal or in emotional distress"
                  link="http://www.aasra.info"
                  phone="91-9820466726"
                />

                <ResourceItem
                  title="Sneha India"
                  description="Suicide prevention organization providing emotional support"
                  link="https://snehaindia.org"
                  phone="044-24640050 / +91-9566067080"
                />
              </div>
            </TabsContent>

            <TabsContent value="articles" className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Educational Resources
              </h3>

              <div className="space-y-4">
                <ArticleItem
                  title="Understanding Anxiety"
                  description="Learn about the different types of anxiety disorders and how they affect daily life"
                  source="National Institute of Mental Health"
                  link="https://www.nimh.nih.gov/health/topics/anxiety-disorders"
                />

                <ArticleItem
                  title="Depression: What You Need to Know"
                  description="Comprehensive guide to understanding depression, its symptoms, causes, and treatment options"
                  source="Mayo Clinic"
                  link="https://www.mayoclinic.org/diseases-conditions/depression/symptoms-causes/syc-20356007"
                />

                <ArticleItem
                  title="Stress Management Techniques"
                  description="Evidence-based strategies for managing stress in your daily life"
                  source="American Psychological Association"
                  link="https://www.apa.org/topics/stress/tips"
                />

                <ArticleItem
                  title="The Science of Sleep"
                  description="How sleep affects mental health and tips for better sleep hygiene"
                  source="Sleep Foundation"
                  link="https://www.sleepfoundation.org/mental-health"
                />

                <ArticleItem
                  title="Mindfulness Meditation: A Research-Based Guide"
                  description="Learn about the benefits of mindfulness meditation and how to practice it"
                  source="Harvard Health"
                  link="https://www.health.harvard.edu/blog/mindfulness-meditation-may-ease-anxiety-mental-stress-201401086967"
                />
              </div>
            </TabsContent>

            <TabsContent value="videos" className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Video className="h-5 w-5 mr-2" />
                Video Resources
              </h3>

              <div className="space-y-4">
                <VideoItem
                  title="How to Practice Mindfulness"
                  description="A 10-minute guided introduction to mindfulness meditation"
                  duration="10:23"
                  source="Headspace"
                  link="https://www.youtube.com/watch?v=3nwwKbM_vJc"
                />

                <VideoItem
                  title="Understanding the Science of Depression"
                  description="An animated explanation of how depression affects the brain"
                  duration="6:45"
                  source="TED-Ed"
                  link="https://www.youtube.com/watch?v=GOK1tKFFIQI"
                />

                <VideoItem
                  title="5-Minute Anxiety Relief Exercise"
                  description="Quick breathing technique to help manage anxiety in the moment"
                  duration="5:12"
                  source="Therapy in a Nutshell"
                  link="https://www.youtube.com/watch?v=vXZ5l7G6T2I"
                />

                <VideoItem
                  title="The Power of Vulnerability"
                  description="Brené Brown's influential talk on emotional courage"
                  duration="20:49"
                  source="TED"
                  link="https://www.youtube.com/watch?v=iCvmsMzlF7o"
                />

                <VideoItem
                  title="Guided Sleep Meditation for Insomnia"
                  description="Calming meditation designed to help you fall asleep"
                  duration="45:30"
                  source="Michael Sealey"
                  link="https://www.youtube.com/watch?v=1vx8iUvfyCY"
                />
              </div>
            </TabsContent>

            <TabsContent value="apps" className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Music className="h-5 w-5 mr-2" />
                Recommended Apps & Tools
              </h3>

              <div className="space-y-4">
                <AppItem
                  title="Headspace"
                  description="Guided meditation and mindfulness practices"
                  category="Meditation"
                  platforms="iOS, Android, Web"
                  link="https://www.headspace.com"
                />

                <AppItem
                  title="Wysa"
                  description="AI chatbot for emotional support and CBT techniques, developed in India"
                  category="AI Therapy"
                  platforms="iOS, Android"
                  link="https://www.wysa.io"
                />

                <AppItem
                  title="InnerHour"
                  description="Self-help app for stress, anxiety, depression, sleep and more, made in India"
                  category="Self-help"
                  platforms="iOS, Android, Web"
                  link="https://www.theinnerhour.com"
                />

                <AppItem
                  title="Daylio"
                  description="Mood tracking journal that helps you understand your emotions"
                  category="Mood Tracking"
                  platforms="iOS, Android"
                  link="https://daylio.net"
                />

                <AppItem
                  title="Insight Timer"
                  description="Free library of guided meditations and sleep music"
                  category="Meditation"
                  platforms="iOS, Android, Web"
                  link="https://insighttimer.com"
                />
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function ResourceItem({
  title,
  description,
  link,
  phone,
}: { title: string; description: string; link: string; phone: string }) {
  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-slate-800">
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
      <div className="mt-2 space-y-1">
        <div className="flex items-center text-sm">
          <Phone className="h-4 w-4 mr-2 text-amber-500" />
          <span>{phone}</span>
        </div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Visit Website
        </a>
      </div>
    </div>
  )
}

function ArticleItem({
  title,
  description,
  source,
  link,
}: { title: string; description: string; source: string; link: string }) {
  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-slate-800">
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Source: {source}</span>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center"
        >
          <ExternalLink className="h-3 w-3 mr-1" />
          Read
        </a>
      </div>
    </div>
  )
}

function VideoItem({
  title,
  description,
  duration,
  source,
  link,
}: { title: string; description: string; duration: string; source: string; link: string }) {
  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-slate-800">
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center text-xs text-muted-foreground">
          <Video className="h-3 w-3 mr-1" />
          {duration} • {source}
        </div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center"
        >
          <ExternalLink className="h-3 w-3 mr-1" />
          Watch
        </a>
      </div>
    </div>
  )
}

function AppItem({
  title,
  description,
  category,
  platforms,
  link,
}: { title: string; description: string; category: string; platforms: string; link: string }) {
  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-slate-800">
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
      <div className="mt-2 flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          <span className="inline-block px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 mr-2">
            {category}
          </span>
          <span>{platforms}</span>
        </div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center"
        >
          <ExternalLink className="h-3 w-3 mr-1" />
          Learn More
        </a>
      </div>
    </div>
  )
}

