'use client'

import { useEffect } from "react"
import { FeatureLayout } from "@/components/feature-layout"
import { Resources } from "@/components/resources"

export default function ResourcesPage() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])

  return (
    <FeatureLayout title=" ">
      <Resources />
    </FeatureLayout>
  )
} 