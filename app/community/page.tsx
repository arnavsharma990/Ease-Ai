'use client'

import { useEffect } from "react"
import { FeatureLayout } from "@/components/feature-layout"
import { Community } from "@/components/community"

export default function CommunityPage() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])

  return (
    <FeatureLayout title="Community">
      <Community />
    </FeatureLayout>
  )
} 