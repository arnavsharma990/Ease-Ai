'use client'

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "./ui/button"

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
      className="container py-8"
    >
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/" className="hover:bg-muted rounded-full">
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          {title}
        </h1>
      </div>
      {children}
    </motion.div>
  )
} 