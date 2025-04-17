"use client"

import { useEffect } from "react"
import { Journal } from "@/components/journal"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function JournalPage() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-950"
    >
      <div className="container max-w-7xl mx-auto py-8 px-4">
        <motion.div 
          variants={itemVariants}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Your Digital Journal
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A safe space to express your thoughts, feelings, and daily reflections
          </p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="max-w-5xl mx-auto"
        >
          <Journal />
        </motion.div>
      </div>
    </motion.div>
  )
} 