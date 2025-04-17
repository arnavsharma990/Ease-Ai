'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Wind, Brain, Book, Flower2, Sparkles, Heart } from "lucide-react"

const wellnessTools = [
  {
    title: "Breathing Exercises",
    description: "Practice guided breathing techniques to reduce stress, improve focus, and find inner calm. Includes box breathing, 4-7-8 technique, and deep relaxation exercises.",
    icon: Wind,
    decorativeIcon: Flower2,
    href: "/breathing",
    color: "from-blue-500 to-cyan-500",
    bgImage: "/images/breathing-bg.png",
    features: [
      "Box Breathing",
      "Deep Relaxation",
      "Stress Relief",
      "Focus Enhancement"
    ]
  },
  {
    title: "Mood Tracking",
    description: "Monitor and understand your emotional patterns with our intuitive mood tracking tool. Gain insights into your mental well-being and identify triggers.",
    icon: Brain,
    decorativeIcon: Heart,
    href: "/mood",
    color: "from-purple-500 to-indigo-500",
    bgImage: "/images/mood-bg.png",
    features: [
      "Daily Mood Logs",
      "Emotion Patterns",
      "Trigger Analysis",
      "Progress Charts"
    ]
  },
  {
    title: "Journaling",
    description: "Express your thoughts and feelings in a private, secure space. Use guided prompts and reflection exercises to deepen your self-awareness.",
    icon: Book,
    decorativeIcon: Sparkles,
    href: "/journal",
    color: "from-green-500 to-emerald-500",
    bgImage: "/images/journal-bg.png",
    features: [
      "Guided Prompts",
      "Private Entries",
      "Reflection Tools",
      "Mood Integration"
    ]
  }
]

export default function WellnessPage() {
  return (
    <main className="container max-w-7xl mx-auto py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Wellness Tools
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Explore our collection of interactive tools designed to support your mental well-being journey.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {wellnessTools.map((tool, index) => (
          <motion.div
            key={tool.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Link
              href={tool.href}
              className="block group relative overflow-hidden rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur p-8 transition-all hover:shadow-2xl h-full"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10"
                style={{ backgroundImage: `linear-gradient(to right, ${tool.color})` }}
                initial={false}
                animate={{ opacity: 0 }}
                whileHover={{ opacity: 0.1 }}
              />
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 opacity-5 transform translate-x-1/4 -translate-y-1/4">
                <tool.decorativeIcon className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-2xl bg-gradient-to-r ${tool.color}`}>
                    <tool.icon className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold">{tool.title}</h2>
                </div>
                <p className="text-muted-foreground mb-6">{tool.description}</p>
                <div className="space-y-3">
                  {tool.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center text-sm text-muted-foreground bg-white/50 dark:bg-slate-800/50 rounded-lg p-2"
                    >
                      <div className={`w-1.5 h-1.5 rounded-full mr-2 bg-gradient-to-r ${tool.color}`} />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  )
} 