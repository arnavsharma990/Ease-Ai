'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wind, Moon, Sun, Flower2, Timer, Play, Pause } from 'lucide-react'
import { Button } from '@/components/ui/button'

const breathingExercises = [
  {
    id: 'box',
    name: 'Box Breathing',
    description: '4-4-4-4 pattern for focus',
    duration: 4,
    icon: Wind,
    color: 'from-blue-500 to-cyan-500',
    steps: ['Inhale', 'Hold', 'Exhale', 'Hold']
  },
  {
    id: 'relaxing',
    name: 'Deep Relaxation',
    description: 'Slow 6-6-6-6 pattern for calm',
    duration: 6,
    icon: Moon,
    color: 'from-indigo-500 to-purple-500',
    steps: ['Inhale', 'Hold', 'Exhale', 'Hold']
  },
  {
    id: 'energizing',
    name: 'Energizing Breath',
    description: 'Quick 2-2-2-2 pattern for energy',
    duration: 2,
    icon: Sun,
    color: 'from-orange-500 to-yellow-500',
    steps: ['Inhale', 'Hold', 'Exhale', 'Hold']
  }
]

const initialState = { scale: 1, opacity: 0.6 }

export default function BreathingPage() {
  const [selectedExercise, setSelectedExercise] = useState(breathingExercises[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [animationState, setAnimationState] = useState(initialState)

  // Handle breathing cycle
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + (100 / (selectedExercise.duration * 10))
          if (newProgress >= 100) {
            setCurrentStep((prevStep) => (prevStep + 1) % selectedExercise.steps.length)
            return 0
          }
          return newProgress
        })
      }, 100)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isPlaying, selectedExercise])

  // Handle animation state updates
  useEffect(() => {
    if (!isPlaying) {
      setAnimationState(initialState)
      return
    }

    const step = selectedExercise.steps[currentStep]
    
    switch (step) {
      case 'Inhale':
        setAnimationState({ scale: 1.5, opacity: 1 })
        break
      case 'Hold':
        setAnimationState({ scale: 1.5, opacity: 0.8 })
        break
      case 'Exhale':
        setAnimationState({ scale: 0.8, opacity: 0.6 })
        break
      default:
        setAnimationState({ scale: 0.8, opacity: 0.6 })
    }
  }, [currentStep, isPlaying])

  const handlePlayPause = () => {
    if (!isPlaying) {
      setCurrentStep(0)
      setProgress(0)
    }
    setIsPlaying((prev) => !prev)
  }

  const handleExerciseChange = (exercise: typeof selectedExercise) => {
    setSelectedExercise(exercise)
    setIsPlaying(false)
    setCurrentStep(0)
    setProgress(0)
    setAnimationState(initialState)
  }

  return (
    <main className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex-1 grid grid-cols-12 gap-6 p-6">
        {/* Left sidebar with exercise options */}
        <div className="col-span-3 space-y-4">
          <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Choose Exercise
          </h2>
          {breathingExercises.map((exercise) => (
            <motion.div
              key={exercise.id}
              whileHover={{ scale: 1.02 }}
              className={`relative overflow-hidden rounded-xl p-4 cursor-pointer ${
                selectedExercise.id === exercise.id
                  ? 'bg-gradient-to-r shadow-lg ' + exercise.color
                  : 'bg-white/80 dark:bg-slate-900/80'
              }`}
              onClick={() => handleExerciseChange(exercise)}
            >
              <div className="flex items-center gap-3">
                <exercise.icon className={`h-6 w-6 ${
                  selectedExercise.id === exercise.id ? 'text-white' : 'text-purple-500'
                }`} />
                <div>
                  <h3 className={`font-semibold ${
                    selectedExercise.id === exercise.id ? 'text-white' : ''
                  }`}>
                    {exercise.name}
                  </h3>
                  <p className={`text-xs ${
                    selectedExercise.id === exercise.id ? 'text-white/90' : 'text-muted-foreground'
                  }`}>
                    {exercise.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main breathing animation area */}
        <div className="col-span-9 flex flex-col items-center justify-center relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm"
              animate={animationState}
              transition={{ 
                duration: selectedExercise.duration,
                ease: selectedExercise.steps[currentStep] === 'Inhale' ? "easeOut" : "easeIn"
              }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-72 h-72 rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 backdrop-blur-sm"
              animate={animationState}
              transition={{ 
                duration: selectedExercise.duration,
                delay: 0.1,
                ease: selectedExercise.steps[currentStep] === 'Inhale' ? "easeOut" : "easeIn"
              }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-48 h-48 rounded-full bg-gradient-to-r from-purple-500/40 to-blue-500/40 backdrop-blur-sm"
              animate={animationState}
              transition={{ 
                duration: selectedExercise.duration,
                delay: 0.2,
                ease: selectedExercise.steps[currentStep] === 'Inhale' ? "easeOut" : "easeIn"
              }}
            />
          </div>

          {/* Current step display */}
          <motion.div
            className="relative z-10 text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            key={currentStep}
          >
            <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              {isPlaying ? selectedExercise.steps[currentStep] : 'Press Play to Start'}
            </h2>
            <div className="flex items-center justify-center gap-4">
              <Button
                size="lg"
                className={`rounded-full ${
                  isPlaying
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-purple-500 hover:bg-purple-600'
                }`}
                onClick={handlePlayPause}
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </Button>
              <div className="flex items-center gap-2">
                <Timer className="h-5 w-5 text-purple-500" />
                <span className="text-sm text-muted-foreground">
                  {selectedExercise.duration}s per step
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
} 