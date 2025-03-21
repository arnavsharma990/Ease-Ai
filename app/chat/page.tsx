'use client'

import { useEffect } from "react"
import { FeatureLayout } from "@/components/feature-layout"
import Chat from "@/components/chat"

export default function ChatPage() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])

  return (
    <FeatureLayout title="AI Chat Companion">
      <Chat />
    </FeatureLayout>
  )
} 