'use client'

import { motion } from "framer-motion"

interface FeatureLayoutProps {
  children: React.ReactNode
  title: string
}

export function FeatureLayout({ children, title }: FeatureLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container py-4"
    >
      {children}
    </motion.div>
  )
}