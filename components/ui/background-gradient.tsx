'use client'

import { useEffect, useRef } from 'react'

export function BackgroundGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frame: number
    let gradient: CanvasGradient
    
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    }

    const animate = (t: number) => {
      if (!ctx || !gradient) return

      // Update gradient colors based on time
      const hue1 = (t * 0.02) % 360
      const hue2 = (hue1 + 60) % 360
      const hue3 = (hue2 + 60) % 360

      gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, `hsla(${hue1}, 80%, 75%, 0.3)`)
      gradient.addColorStop(0.5, `hsla(${hue2}, 80%, 75%, 0.3)`)
      gradient.addColorStop(1, `hsla(${hue3}, 80%, 75%, 0.3)`)

      // Clear and fill with gradient
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      frame = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener('resize', resize)
    frame = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-full w-full opacity-30"
      style={{ filter: 'blur(100px)' }}
    />
  )
} 