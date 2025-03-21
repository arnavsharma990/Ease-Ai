'use client'

import { useEffect } from "react"
import { FeatureLayout } from "../../components/feature-layout"
import { BreathingExercise } from "../../components/breathing-exercise"

export default function BreathingPage() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])

  return (
    <FeatureLayout title="Breathing Exercises">
      <BreathingExercise />
    </FeatureLayout>
  )
} 