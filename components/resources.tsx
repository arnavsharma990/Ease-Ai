"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ExternalLink, BookOpen, Phone, Video, Music, Clock, Globe2, Laptop } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Resources() {
  return (
    <div className="space-y-4 sm:space-y-8">
      <Card className="rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border-none shadow-lg">
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-lg sm:text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Mental Health Resources</CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <Tabs defaultValue="crisis" className="w-full">
            <TabsList className="grid w-full sm:w-[400px] grid-cols-4 rounded-full p-1 bg-purple-50 dark:bg-purple-900/10 mb-6">
              <TabsTrigger value="crisis" className="rounded-full text-xs sm:text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Crisis</TabsTrigger>
              <TabsTrigger value="articles" className="rounded-full text-xs sm:text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Articles</TabsTrigger>
              <TabsTrigger value="videos" className="rounded-full text-xs sm:text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Videos</TabsTrigger>
              <TabsTrigger value="apps" className="rounded-full text-xs sm:text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">Apps</TabsTrigger>
            </TabsList>

            <ScrollArea className="h-[600px] pr-4">
              <TabsContent value="crisis" className="space-y-4 mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="border-none shadow-md bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-[1.5rem] sm:rounded-[2rem]">
                    <CardContent className="p-4 sm:p-6">
                      <h3 className="text-base sm:text-lg font-semibold text-red-600 dark:text-red-400 flex items-center mb-2">
                        <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                        Immediate Help
                      </h3>
                      <p className="text-xs sm:text-sm text-red-500 dark:text-red-300">
                        If you're experiencing a mental health emergency, please contact emergency services or a crisis
                        hotline immediately.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <div className="grid gap-4">
                  {[
                    {
                      title: "NIMHANS Mental Health Helpline",
                      description: "National Institute of Mental Health and Neurosciences helpline for mental health support",
                      link: "https://nimhans.ac.in",
                      phone: "080-26995000 / 080-26995100"
                    },
                    {
                      title: "Vandrevala Foundation",
                      description: "24/7 helpline for emotional crisis and distress",
                      link: "https://www.vandrevalafoundation.com",
                      phone: "1860-2662-345 / +91 9999 666 555"
                    },
                    {
                      title: "iCall Helpline",
                      description: "Psychosocial helpline by TISS (Tata Institute of Social Sciences)",
                      link: "https://icallhelpline.org",
                      phone: "022-25521111 / +91 9152987821"
                    },
                    {
                      title: "AASRA",
                      description: "24/7 helpline for those feeling suicidal or in emotional distress",
                      link: "http://www.aasra.info",
                      phone: "91-9820466726"
                    },
                    {
                      title: "Sneha India",
                      description: "Suicide prevention organization providing emotional support",
                      link: "https://snehaindia.org",
                      phone: "044-24640050 / +91-9566067080"
                    }
                  ].map((resource, index) => (
                    <motion.div
                      key={resource.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="border-none shadow-md hover:shadow-lg transition-all duration-200 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-[1.5rem] sm:rounded-[2rem]">
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex flex-col gap-2">
                            <h3 className="font-semibold text-sm sm:text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                              {resource.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground">{resource.description}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="gap-2 rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/20"
                                asChild
                              >
                                <a href={`tel:${resource.phone.split('/')[0].trim()}`}>
                                  <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                                  <span className="text-xs sm:text-sm">{resource.phone}</span>
                                </a>
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="gap-2 rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/20"
                                asChild
                              >
                                <a href={resource.link} target="_blank" rel="noopener noreferrer">
                                  <Globe2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                  <span className="text-xs sm:text-sm">Website</span>
                                </a>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="articles" className="space-y-4 mt-0">
                <div className="grid gap-4">
                  {[
                    {
                      title: "Understanding Anxiety",
                      description: "Learn about the different types of anxiety disorders and how they affect daily life",
                      source: "National Institute of Mental Health",
                      link: "https://www.nimh.nih.gov/health/topics/anxiety-disorders"
                    },
                    {
                      title: "Depression: What You Need to Know",
                      description: "Comprehensive guide to understanding depression, its symptoms, causes, and treatment options",
                      source: "Mayo Clinic",
                      link: "https://www.mayoclinic.org/diseases-conditions/depression/symptoms-causes/syc-20356007"
                    },
                    {
                      title: "Stress Management Techniques",
                      description: "Evidence-based strategies for managing stress in your daily life",
                      source: "American Psychological Association",
                      link: "https://www.apa.org/topics/stress/tips"
                    },
                    {
                      title: "The Science of Sleep",
                      description: "How sleep affects mental health and tips for better sleep hygiene",
                      source: "Sleep Foundation",
                      link: "https://www.sleepfoundation.org/mental-health"
                    },
                    {
                      title: "Mindfulness Meditation: A Research-Based Guide",
                      description: "Learn about the benefits of mindfulness meditation and how to practice it",
                      source: "Harvard Health",
                      link: "https://www.health.harvard.edu/blog/mindfulness-meditation-may-ease-anxiety-mental-stress-201401086967"
                    }
                  ].map((article, index) => (
                    <motion.div
                      key={article.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="border-none shadow-md hover:shadow-lg transition-all duration-200 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-[1.5rem] sm:rounded-[2rem]">
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex flex-col gap-2">
                            <h3 className="font-semibold text-sm sm:text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                              {article.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground">{article.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-[10px] sm:text-xs text-muted-foreground bg-purple-50 dark:bg-purple-900/20 px-2 sm:px-4 py-0.5 sm:py-1 rounded-full">
                                {article.source}
                              </span>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="gap-2 rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/20 ml-auto"
                                asChild
                              >
                                <a href={article.link} target="_blank" rel="noopener noreferrer">
                                  <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
                                  <span className="text-xs sm:text-sm">Read Article</span>
                                </a>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="videos" className="space-y-4 mt-0">
                <div className="grid gap-4">
                  {[
                    {
                      title: "How to Practice Mindfulness",
                      description: "A 10-minute guided introduction to mindfulness meditation",
                      duration: "10:23",
                      source: "Headspace",
                      link: "https://www.youtube.com/watch?v=3nwwKbM_vJc"
                    },
                    {
                      title: "Understanding the Science of Depression",
                      description: "An animated explanation of how depression affects the brain",
                      duration: "6:45",
                      source: "TED-Ed",
                      link: "https://www.youtube.com/watch?v=GOK1tKFFIQI"
                    },
                    {
                      title: "5-Minute Anxiety Relief Exercise",
                      description: "Quick breathing technique to help manage anxiety in the moment",
                      duration: "5:12",
                      source: "Therapy in a Nutshell",
                      link: "https://www.youtube.com/watch?v=vXZ5l7G6T2I"
                    },
                    {
                      title: "The Power of Vulnerability",
                      description: "Brené Brown's influential talk on emotional courage",
                      duration: "20:49",
                      source: "TED",
                      link: "https://www.youtube.com/watch?v=iCvmsMzlF7o"
                    },
                    {
                      title: "Guided Sleep Meditation for Insomnia",
                      description: "Calming meditation designed to help you fall asleep",
                      duration: "45:30",
                      source: "Michael Sealey",
                      link: "https://www.youtube.com/watch?v=1vx8iUvfyCY"
                    }
                  ].map((video, index) => (
                    <motion.div
                      key={video.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="border-none shadow-md hover:shadow-lg transition-all duration-200 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-[1.5rem] sm:rounded-[2rem]">
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex flex-col gap-2">
                            <h3 className="font-semibold text-sm sm:text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                              {video.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground">{video.description}</p>
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                              <span className="text-[10px] sm:text-xs text-muted-foreground bg-purple-50 dark:bg-purple-900/20 px-2 sm:px-4 py-0.5 sm:py-1 rounded-full flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {video.duration}
                              </span>
                              <span className="text-[10px] sm:text-xs text-muted-foreground bg-purple-50 dark:bg-purple-900/20 px-2 sm:px-4 py-0.5 sm:py-1 rounded-full">
                                {video.source}
                              </span>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="gap-2 rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/20 ml-auto"
                                asChild
                              >
                                <a href={video.link} target="_blank" rel="noopener noreferrer">
                                  <Video className="h-3 w-3 sm:h-4 sm:w-4" />
                                  <span className="text-xs sm:text-sm">Watch Video</span>
                                </a>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="apps" className="space-y-4 mt-0">
                <div className="grid gap-4">
                  {[
                    {
                      title: "Headspace",
                      description: "Guided meditation and mindfulness practices",
                      category: "Meditation",
                      platforms: "iOS, Android, Web",
                      link: "https://www.headspace.com"
                    },
                    {
                      title: "Wysa",
                      description: "AI chatbot for emotional support and CBT techniques, developed in India",
                      category: "AI Therapy",
                      platforms: "iOS, Android",
                      link: "https://www.wysa.io"
                    },
                    {
                      title: "InnerHour",
                      description: "Self-help app for stress, anxiety, depression, sleep and more, made in India",
                      category: "Self-help",
                      platforms: "iOS, Android, Web",
                      link: "https://www.theinnerhour.com"
                    },
                    {
                      title: "Daylio",
                      description: "Mood tracking journal that helps you understand your emotions",
                      category: "Mood Tracking",
                      platforms: "iOS, Android",
                      link: "https://daylio.net"
                    },
                    {
                      title: "Insight Timer",
                      description: "Free library of guided meditations and sleep music",
                      category: "Meditation",
                      platforms: "iOS, Android, Web",
                      link: "https://insighttimer.com"
                    }
                  ].map((app, index) => (
                    <motion.div
                      key={app.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="border-none shadow-md hover:shadow-lg transition-all duration-200 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-[1.5rem] sm:rounded-[2rem]">
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex flex-col gap-2">
                            <h3 className="font-semibold text-sm sm:text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                              {app.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground">{app.description}</p>
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                              <span className="text-[10px] sm:text-xs text-muted-foreground bg-purple-50 dark:bg-purple-900/20 px-2 sm:px-4 py-0.5 sm:py-1 rounded-full">
                                {app.category}
                              </span>
                              <span className="text-[10px] sm:text-xs text-muted-foreground bg-purple-50 dark:bg-purple-900/20 px-2 sm:px-4 py-0.5 sm:py-1 rounded-full flex items-center gap-1">
                                <Laptop className="h-3 w-3" />
                                {app.platforms}
                              </span>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="gap-2 rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/20 ml-auto"
                                asChild
                              >
                                <a href={app.link} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                                  <span className="text-xs sm:text-sm">Visit Website</span>
                                </a>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

