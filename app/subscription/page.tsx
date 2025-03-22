"use client"

import PricingSection from "@/components/subscription/PricingSection"
import PremiumFeatures from "@/components/subscription/PremiumFeatures"
import FAQ from "@/components/subscription/FAQ"
import Testimonials from "@/components/subscription/Testimonials"
import { motion } from "framer-motion"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

export default function SubscriptionPage() {
  return (
    <motion.div 
      initial="initial"
      animate="animate"
      variants={stagger}
      className="container max-w-6xl py-10 space-y-20"
    >
      {/* Hero Section */}
      <motion.section 
        variants={fadeInUp}
        className="text-center space-y-6"
      >
        <div className="space-y-2">
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold"
          >
            Upgrade to
          </motion.h2>
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-violet-600 text-transparent bg-clip-text"
          >
            Sukoon AI Nirvana
          </motion.h1>
        </div>
        <motion.p 
          variants={fadeInUp}
          className="text-xl text-muted-foreground max-w-3xl mx-auto"
        >
          Take your mental wellness journey to the next level with our premium features and personalized support.
        </motion.p>
      </motion.section>

      {/* Premium Features */}
      <motion.div variants={fadeInUp}>
        <PremiumFeatures />
      </motion.div>

      {/* Pricing Section */}
      <motion.div variants={fadeInUp}>
        <PricingSection />
      </motion.div>

      {/* Testimonials */}
      <motion.div variants={fadeInUp}>
        <Testimonials />
      </motion.div>

      {/* FAQ */}
      <motion.div variants={fadeInUp}>
        <FAQ />
      </motion.div>
    </motion.div>
  )
} 