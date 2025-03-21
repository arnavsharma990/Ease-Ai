"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Play, Pause, RotateCcw } from "lucide-react"

type BreathingPattern = {
  name: string
  inhale: number
  hold1: number
  exhale: number
  hold2: number
  description: string
}

const breathingPatterns: BreathingPattern[] = [
  {
    name: "Box Breathing",
    inhale: 4,
    hold1: 4,
    exhale: 4,
    hold2: 4,
    description: "Equal parts inhale, hold, exhale, and hold. Great for stress reduction and focus.",
  },
  {
    name: "4-7-8 Breathing",
    inhale: 4,
    hold1: 7,
    exhale: 8,
    hold2: 0,
    description: "Inhale for 4, hold for 7, exhale for 8. Helps with anxiety and sleep.",
  },
  {
    name: "Relaxing Breath",
    inhale: 5,
    hold1: 2,
    exhale: 7,
    hold2: 0,
    description: "Longer exhale than inhale helps activate the parasympathetic nervous system.",
  },
]

export function BreathingExercise() {
  const [isActive, setIsActive] = useState(false)
  const [currentPhase, setCurrentPhase] = useState<"inhale" | "hold1" | "exhale" | "hold2">("inhale")
  const [progress, setProgress] = useState(0)
  const [selectedPattern, setSelectedPattern] = useState<BreathingPattern>(breathingPatterns[0])
  const [cycles, setCycles] = useState(0)
  const [duration, setDuration] = useState(3) // Duration in minutes
  const [totalCycles, setTotalCycles] = useState(0)
  const animationRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number | null>(null)

  // Calculate total cycle time in seconds
  const totalCycleTime = selectedPattern.inhale + selectedPattern.hold1 + selectedPattern.exhale + selectedPattern.hold2

  // Calculate total cycles based on duration
  useEffect(() => {
    const cyclesPerMinute = 60 / totalCycleTime
    setTotalCycles(Math.round(cyclesPerMinute * duration))
  }, [duration, totalCycleTime])

  // Animation loop
  const animate = (time: number) => {
    if (lastTimeRef.current === null) {
      lastTimeRef.current = time
    }

    const deltaTime = time - lastTimeRef.current
    lastTimeRef.current = time

    // Update progress based on current phase
    let phaseTime = 0
    switch (currentPhase) {
      case "inhale":
        phaseTime = selectedPattern.inhale
        break
      case "hold1":
        phaseTime = selectedPattern.hold1
        break
      case "exhale":
        phaseTime = selectedPattern.exhale
        break
      case "hold2":
        phaseTime = selectedPattern.hold2
        break
    }

    // Convert phase time to milliseconds
    phaseTime *= 1000

    // Update progress
    setProgress((prev) => {
      const newProgress = prev + deltaTime / phaseTime

      // Move to next phase if progress >= 1
      if (newProgress >= 1) {
        // Determine next phase
        let nextPhase: "inhale" | "hold1" | "exhale" | "hold2" = "inhale"
        switch (currentPhase) {
          case "inhale":
            nextPhase = selectedPattern.hold1 > 0 ? "hold1" : "exhale"
            break
          case "hold1":
            nextPhase = "exhale"
            break
          case "exhale":
            nextPhase = selectedPattern.hold2 > 0 ? "hold2" : "inhale"
            break
          case "hold2":
            nextPhase = "inhale"
            break
        }

        // If completing a full cycle
        if (
          (nextPhase === "inhale" && currentPhase === "hold2") ||
          (nextPhase === "inhale" && currentPhase === "exhale" && selectedPattern.hold2 === 0)
        ) {
          setCycles((prev) => {
            const newCycles = prev + 1
            // Stop if reached total cycles
            if (newCycles >= totalCycles) {
              setIsActive(false)
              return newCycles
            }
            return newCycles
          })
        }

        setCurrentPhase(nextPhase)
        return 0
      }

      return newProgress
    })

    if (isActive) {
      animationRef.current = requestAnimationFrame(animate)
    }
  }

  // Start/stop animation
  useEffect(() => {
    if (isActive) {
      lastTimeRef.current = null
      animationRef.current = requestAnimationFrame(animate)
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isActive, currentPhase, selectedPattern])

  // Reset exercise
  const resetExercise = () => {
    setIsActive(false)
    setCurrentPhase("inhale")
    setProgress(0)
    setCycles(0)
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }

  // Get instruction text based on current phase
  const getInstructionText = () => {
    switch (currentPhase) {
      case "inhale":
        return "Breathe In"
      case "hold1":
        return "Hold"
      case "exhale":
        return "Breathe Out"
      case "hold2":
        return "Hold"
    }
  }

  // Calculate circle size based on current phase and progress
  const getCircleSize = () => {
    const minSize = 50;
    const maxSize = 100;
    const range = maxSize - minSize;

    switch (currentPhase) {
      case "inhale":
        return minSize + (progress * range);
      case "hold1":
        return maxSize;
      case "exhale":
        return maxSize - (progress * range);
      case "hold2":
        return minSize;
    }
  }

  // Get circle opacity based on current phase
  const getCircleOpacity = () => {
    const minOpacity = 0.3;
    const maxOpacity = 0.8;
    const range = maxOpacity - minOpacity;

    switch (currentPhase) {
      case "inhale":
        return minOpacity + (progress * range);
      case "hold1":
        return maxOpacity;
      case "exhale":
        return maxOpacity - (progress * range);
      case "hold2":
        return minOpacity;
    }
  }

  // Get circle transform based on current phase
  const getCircleTransform = () => {
    const minScale = 0.95;
    const maxScale = 1.05;
    const range = maxScale - minScale;

    switch (currentPhase) {
      case "inhale":
        return minScale + (progress * range);
      case "hold1":
        return maxScale;
      case "exhale":
        return maxScale - (progress * range);
      case "hold2":
        return minScale;
    }
  }

  return (
    <Card className="w-full border-none shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-t-lg">
        <CardTitle>Breathing Exercise</CardTitle>
        <CardDescription className="text-white/90">Follow the animation to practice mindful breathing</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center h-64 w-64">
              {/* Background circle */}
              <div className="absolute h-full w-full rounded-full border-2 border-dashed border-gray-200 dark:border-gray-700"></div>

              {/* Animated circle */}
              <div
                className="absolute rounded-full"
                style={{
                  width: `${getCircleSize()}%`,
                  height: `${getCircleSize()}%`,
                  opacity: getCircleOpacity(),
                  background: "radial-gradient(circle at center, rgba(96, 165, 250, 0.8), rgba(34, 211, 238, 0.8))",
                  boxShadow: "0 0 20px rgba(96, 165, 250, 0.3)",
                  transform: `scale(${getCircleTransform()})`,
                }}
              ></div>

              {/* Instruction text */}
              <div className="z-10 text-center">
                <h3 className="text-xl font-semibold">{getInstructionText()}</h3>
                <p className="text-sm text-muted-foreground">
                  {isActive ? `Cycle ${cycles + 1} of ${totalCycles}` : "Press start to begin"}
                </p>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button
                onClick={() => setIsActive(!isActive)}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              >
                {isActive ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                {isActive ? "Pause" : "Start"}
              </Button>
              <Button variant="outline" onClick={resetExercise}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>

          <div>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Breathing Pattern</h3>
                <div className="grid grid-cols-1 gap-2">
                  {breathingPatterns.map((pattern) => (
                    <Button
                      key={pattern.name}
                      variant={selectedPattern.name === pattern.name ? "default" : "outline"}
                      className={
                        selectedPattern.name === pattern.name
                          ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 justify-start"
                          : "justify-start"
                      }
                      onClick={() => {
                        setSelectedPattern(pattern)
                        resetExercise()
                      }}
                    >
                      {pattern.name}
                    </Button>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-2">{selectedPattern.description}</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="duration">Duration: {duration} minutes</Label>
                </div>
                <Slider
                  id="duration"
                  min={1}
                  max={10}
                  step={1}
                  value={[duration]}
                  onValueChange={(value) => {
                    setDuration(value[0])
                    resetExercise()
                  }}
                />
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Current Pattern Timing</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span>Inhale:</span>
                    <span>{selectedPattern.inhale} seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hold:</span>
                    <span>{selectedPattern.hold1} seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Exhale:</span>
                    <span>{selectedPattern.exhale} seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hold:</span>
                    <span>{selectedPattern.hold2} seconds</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

