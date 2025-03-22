"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
}

const iconVariants = {
  hidden: { scale: 0 },
  visible: { 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15
    }
  }
}

export default function AnalyticsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container max-w-6xl py-10 space-y-12"
    >
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold tracking-tight"
        >
          Understand Your Mind with <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">Sukoon AI</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-muted-foreground max-w-3xl mx-auto"
        >
          Track your mood, journal your thoughts, and get AI-generated insights to improve your mental wellbeing.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4 justify-center"
        >
          <Button 
            size="lg" 
            className="bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 hover:scale-105"
            onClick={() => {
              window.location.href = "/subscription#pricing";
              document.documentElement.style.scrollBehavior = "smooth";
            }}
          >
            Start Tracking
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="gap-2 transition-all duration-300 hover:scale-105"
            onClick={() => window.location.href = "/profile/reports"}
          >
            View Reports <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </section>

      {/* Key Features */}
      <section className="space-y-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-3xl font-bold text-center"
        >
          Key Features
        </motion.h2>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Mood Tracking */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center space-y-4 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.div 
              variants={iconVariants}
              className="relative w-12 h-12 mx-auto"
            >
              <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/20 rounded-full" />
              <div className="absolute inset-2 bg-blue-500 rounded-full" />
            </motion.div>
            <h3 className="text-xl font-semibold relative">Mood Tracking</h3>
            <p className="text-muted-foreground relative">
              Track your daily moods and see patterns over time with beautiful visualizations.
            </p>
          </motion.div>

          {/* Journaling */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center space-y-4 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.div 
              variants={iconVariants}
              className="relative w-12 h-12 mx-auto"
            >
              <div className="absolute inset-0 bg-purple-100 dark:bg-purple-900/20 rounded-full" />
              <div className="absolute inset-2 bg-purple-500 rounded-full" />
            </motion.div>
            <h3 className="text-xl font-semibold relative">Journaling</h3>
            <p className="text-muted-foreground relative">
              Document your thoughts and feelings in a private, secure journal with AI analysis.
            </p>
          </motion.div>

          {/* AI Insights */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center space-y-4 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.div 
              variants={iconVariants}
              className="relative w-12 h-12 mx-auto"
            >
              <div className="absolute inset-0 bg-green-100 dark:bg-green-900/20 rounded-full" />
              <div className="absolute inset-2 bg-green-500 rounded-full" />
            </motion.div>
            <h3 className="text-xl font-semibold relative">AI Insights</h3>
            <p className="text-muted-foreground relative">
              Get personalized insights and recommendations for improving your mental wellbeing.
            </p>
          </motion.div>
        </motion.div>
      </section>
    </motion.div>
  )
} 