'use client'

import { useEffect, useState } from "react"
import { useSession, signIn } from "next-auth/react"
import { Chat } from "../../components/chat"
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import { BackgroundGradient } from "../../components/ui/background-gradient"
import { Brain, Heart, Shield, Sparkles, MessageCircle, Lock, Star, Users, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ChatPage() {
  const { data: session, status } = useSession()
  const [currentFeature, setCurrentFeature] = useState(0)

  const features = [
    {
      icon: <Brain className="w-12 h-12 text-purple-500" />,
      title: "AI-Powered Support",
      description: "24/7 emotional support and guidance powered by advanced AI"
    },
    {
      icon: <Heart className="w-12 h-12 text-pink-500" />,
      title: "Empathetic Conversations",
      description: "Warm, understanding responses tailored to your emotional needs"
    },
    {
      icon: <Shield className="w-12 h-12 text-blue-500" />,
      title: "Safe & Confidential",
      description: "Your conversations are private and secure"
    },
    {
      icon: <MessageCircle className="w-12 h-12 text-green-500" />,
      title: "Natural Dialogue",
      description: "Engage in flowing, natural conversations about your feelings"
    },
    {
      icon: <Sparkles className="w-12 h-12 text-yellow-500" />,
      title: "Personalized Growth",
      description: "Get customized suggestions for emotional well-being"
    },
    {
      icon: <Lock className="w-12 h-12 text-gray-500 dark:text-gray-400" />,
      title: "Secure Access",
      description: "Protected by Google authentication for your privacy"
    }
  ]

  useEffect(() => {
    window.scrollTo(0, 0)
    
    // Auto-advance feature showcase
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  }, [])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    )
  }

  // If user is logged in, show only the chat interface
  if (session) {
    return (
      <>
        <BackgroundGradient />
        <div className="min-h-screen py-12 px-4 dark:bg-gray-900/80">
          <div className="max-w-4xl mx-auto">
            <div className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-2xl p-6 shadow-xl">
              <Chat />
            </div>
          </div>
        </div>
      </>
    )
  }

  // If user is not logged in, show the landing page with features
  return (
    <>
      <BackgroundGradient />
      <div className="min-h-screen dark:bg-gray-900/80 flex flex-col">
        {/* Main Content */}
        <div className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Introduction */}
            <div className="flex flex-col justify-center space-y-8">
              <div className="prose max-w-none dark:prose-invert">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                  Welcome to SukoonAI Chat
                </h1>
                <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                  Your personal AI companion for emotional well-being. I'm here to listen, support, and guide you through your mental health journey. Our conversations are private, judgment-free, and tailored to your needs.
                </p>
                <div className="mt-8">
                  <Button 
                    onClick={() => signIn("google")} 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105"
                  >
                    Sign in with Google to Start Chatting
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Side - Animated Feature Showcase */}
            <div className="h-[400px] flex items-center justify-center">
              <Card className="w-full h-full backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 rounded-xl overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentFeature}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full flex flex-col items-center justify-center p-8 text-center"
                  >
                    <div className="p-4 rounded-full bg-white/80 dark:bg-gray-700/80 shadow-lg mb-6">
                      {features[currentFeature].icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {features[currentFeature].title}
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      {features[currentFeature].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
                
                {/* Feature Navigation Dots */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {features.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentFeature(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentFeature === index 
                          ? 'bg-purple-600 w-4' 
                          : 'bg-gray-400 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-xl">
                <Users className="w-8 h-8 text-purple-500 mb-3" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">500+</h3>
                <p className="text-gray-600 dark:text-gray-300">Active Users</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-xl">
                <Star className="w-8 h-8 text-yellow-500 mb-3" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">4.7/5</h3>
                <p className="text-gray-600 dark:text-gray-300">User Rating</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-xl">
                <MessageCircle className="w-8 h-8 text-green-500 mb-3" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">2,500+</h3>
                <p className="text-gray-600 dark:text-gray-300">Conversations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About SukoonAI</h4>
                  <p className="text-gray-600 dark:text-gray-300">Your trusted companion for mental wellness, providing 24/7 emotional support and guidance.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Features</h4>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>AI Chat Support</li>
                    <li>Mood Tracking</li>
                    <li>Breathing Exercises</li>
                    <li>Journal Writing</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Resources</h4>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>Mental Health Tips</li>
                    <li>Meditation Guides</li>
                    <li>Wellness Blog</li>
                    <li>Community Support</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Get Started</h4>
                  <Button 
                    onClick={() => signIn("google")}
                    className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all"
                  >
                    <span>Start Chatting</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-300">
                <p>&copy; {new Date().getFullYear()} SukoonAI. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
} 