'use client'

import { useEffect } from "react"
import { FeatureLayout } from "@/components/feature-layout"
import { Journal } from "@/components/journal"

export default function JournalPage() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])

  return (
    <FeatureLayout title="Journaling">
      <Journal />
    </FeatureLayout>
  )
} 