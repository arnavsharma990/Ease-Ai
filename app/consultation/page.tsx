"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Clock, Heart, Shield, UserCircle, Lock, Users, Sparkles, GraduationCap, Diamond, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const consultationTypes = [
  {
    id: "therapy",
    title: "Therapy Session",
    description: "One-on-one session with a therapist to address mental health concerns.",
    icon: <UserCircle className="w-6 h-6" />,
    duration: "50 minutes",
    price: "₹1,500",
    color: "from-purple-500 to-violet-500",
    buttonText: "View Consultants"
  },
  {
    id: "stress",
    title: "Stress Management",
    description: "Learn techniques to manage stress and improve overall wellbeing.",
    icon: <Brain className="w-6 h-6" />,
    duration: "45 minutes",
    price: "₹1,200",
    color: "from-pink-500 to-rose-500",
    buttonText: "View Consultants"
  },
  {
    id: "mental",
    title: "Mental Exercises",
    description: "Session for mental health related exercises and guidance.",
    icon: <GraduationCap className="w-6 h-6" />,
    duration: "60 minutes",
    price: "₹1,800",
    color: "from-blue-500 to-cyan-500",
    buttonText: "View Consultants"
  }
]

const approachCards = [
  {
    title: "Evidence-Based Approach 🧠",
    description: "Our therapeutic methods are grounded in scientific research and proven techniques.",
    icon: <Brain className="w-6 h-6" />,
    color: "bg-purple-100 dark:bg-purple-900/20"
  },
  {
    title: "Compassionate Care ❤️",
    description: "We create a safe, non-judgmental space for your journey to wellness.",
    icon: <Heart className="w-6 h-6" />,
    color: "bg-pink-100 dark:bg-pink-900/20"
  },
  {
    title: "Holistic Perspective ⭐",
    description: "We consider all aspects of your life for comprehensive care.",
    icon: <Diamond className="w-6 h-6" />,
    color: "bg-blue-100 dark:bg-blue-900/20"
  }
]

const valueCards = [
  {
    title: "Confidentiality",
    description: "Your privacy is paramount. All information shared remains strictly confidential.",
    icon: <Lock className="w-6 h-6" />,
    color: "bg-purple-100 dark:bg-purple-900/20"
  },
  {
    title: "Respect",
    description: "We honor your unique experiences, beliefs, and cultural background.",
    icon: <Users className="w-6 h-6" />,
    color: "bg-pink-100 dark:bg-pink-900/20"
  },
  {
    title: "Empowerment",
    description: "Equipping you with tools and insights for life's challenges.",
    icon: <Sparkles className="w-6 h-6" />,
    color: "bg-blue-100 dark:bg-blue-900/20"
  }
]

const testimonials = [
  {
    quote: "Sukoon Consultancy has been instrumental in my journey towards better mental health. The counselors are empathetic and skilled.",
    author: "Aisha K.",
    duration: "Client for 6 months",
    initials: "AK",
    color: "bg-purple-500"
  },
  {
    quote: "The stress management sessions have given me tools to handle work pressure effectively. I'm more productive and happier now.",
    author: "Rahul J.",
    duration: "Client for 3 months",
    initials: "RJ",
    color: "bg-pink-500"
  },
  {
    quote: "The career counseling session helped me identify my strengths and make informed decisions. I'm now in a job I truly enjoy.",
    author: "Sanya P.",
    duration: "Client for 1 year",
    initials: "SP",
    color: "bg-blue-500"
  }
]

const WhyChooseCard = ({ icon, title, description, linkText, linkColor }: {
  icon: React.ReactNode
  title: string
  description: string
  linkText: string
  linkColor: string
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="cursor-pointer"
    >
      <Card className="border-none transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <motion.div 
            className="flex flex-col items-center text-center gap-4"
            animate={{ 
              gap: isHovered ? "1rem" : "0.5rem",
              marginBottom: isHovered ? "1rem" : "0"
            }}
          >
            <motion.div 
              className={`w-16 h-16 rounded-full bg-${linkColor}-100 dark:bg-${linkColor}-900/20 flex items-center justify-center`}
              animate={{ 
                scale: isHovered ? 0.9 : 1,
                marginBottom: isHovered ? "0.5rem" : "0"
              }}
            >
              {icon}
            </motion.div>
            <CardTitle className="transition-all duration-300">
              {title}
            </CardTitle>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              height: isHovered ? "auto" : 0,
              marginTop: isHovered ? "1rem" : "0"
            }}
            transition={{ duration: 0.2 }}
          >
            <CardDescription className="text-center">
              {description}
            </CardDescription>
            <Button variant="link" className={`text-${linkColor}-500 p-0 h-auto mt-4 mx-auto block`}>
              {linkText}
            </Button>
          </motion.div>
        </CardHeader>
      </Card>
    </motion.div>
  )
}

const TestimonialCard = ({ quote, author, duration, initials, color }: {
  quote: string
  author: string
  duration: string
  initials: string
  color: string
}) => {
  return (
    <Card className="w-[400px] flex-shrink-0 border-none bg-white/80 dark:bg-slate-900/80 backdrop-blur">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <p className="text-muted-foreground">{quote}</p>
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white`}>
              {initials}
            </div>
            <div>
              <p className="font-semibold">{author}</p>
              <p className="text-sm text-muted-foreground">{duration}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ConsultationPage() {
  const [approachIndex, setApproachIndex] = useState(0)
  const [valuesIndex, setValuesIndex] = useState(0)
  const [testimonialOffset, setTestimonialOffset] = useState(0)
  const SLIDE_INTERVAL = 5000 // 5 seconds

  const nextApproach = () => {
    setApproachIndex((prev) => (prev + 1) % approachCards.length)
  }

  const prevApproach = () => {
    setApproachIndex((prev) => (prev - 1 + approachCards.length) % approachCards.length)
  }

  const nextValue = () => {
    setValuesIndex((prev) => (prev + 1) % valueCards.length)
  }

  const prevValue = () => {
    setValuesIndex((prev) => (prev - 1 + valueCards.length) % valueCards.length)
  }

  const handleTestimonialSlide = (direction: 'prev' | 'next') => {
    const cardWidth = 400 // Width of each testimonial card + gap
    const maxOffset = -(testimonials.length - 1) * cardWidth
    
    if (direction === 'next') {
      setTestimonialOffset(prev => Math.max(prev - cardWidth, maxOffset))
    } else {
      setTestimonialOffset(prev => Math.min(prev + cardWidth, 0))
    }
  }

  // Auto-advance slides
  useEffect(() => {
    const approachTimer = setInterval(nextApproach, SLIDE_INTERVAL)
    const valuesTimer = setInterval(nextValue, SLIDE_INTERVAL)

    return () => {
      clearInterval(approachTimer)
      clearInterval(valuesTimer)
    }
  }, []) // Empty dependency array means this only runs once on mount

  return (
    <div className="container max-w-6xl py-10 space-y-20">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-pink-500 to-rose-500 text-transparent bg-clip-text">
          Your Journey to Mental Wellbeing Starts Here
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          At Sukoon Consultancy, we provide expert mental health support in a safe, confidential environment. 
          Our team of professionals is dedicated to helping you navigate life's challenges with confidence and peace of mind.
        </p>
        <div className="flex gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white"
            onClick={() => window.location.href = "/consultation/book"}
          >
            Book a Consultation
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 text-transparent bg-clip-text">
                  Our Consultation Services
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-3">
                <div className="space-y-2">
                  <h3 className="font-semibold">Services:</h3>
                  <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <li>• Therapy Sessions</li>
                    <li>• Stress Management</li>
                    <li>• Mental Exercises</li>
                    <li>• Progress Tracking</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Features:</h3>
                  <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <li>• Licensed Experts</li>
                    <li>• Flexible Scheduling</li>
                    <li>• Confidential Care</li>
                    <li>• Online Sessions</li>
                  </ul>
                </div>
                <div className="bg-muted p-3 rounded-lg mt-4">
                  <p className="text-sm text-muted-foreground">
                    Get professional mental health support in a safe, confidential environment with our experienced counselors.
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Consultation Types */}
      <section className="space-y-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Book Your Consultation</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {consultationTypes.map((type) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="relative overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-xl bg-gradient-to-br ${type.color} text-white`}>
                      {type.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle>{type.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {type.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      {type.duration}
                    </div>
                    <div className="text-lg font-bold">
                      {type.price}
                    </div>
                  </div>
                  <Button 
                    className={`w-full bg-gradient-to-r ${type.color} text-white hover:opacity-90 transition-opacity`}
                    onClick={() => window.location.href = `/consultation/book/${type.id}`}
                  >
                    {type.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Combined Our Approach Section */}
      <section className="space-y-12 bg-gradient-to-b from-purple-50/50 to-pink-50/50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-3xl p-10">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
            Our Philosophy
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We believe in a holistic approach to mental health that combines evidence-based practices with compassionate care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Approach Slider */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
              Our Approach
            </h3>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl">
                <motion.div
                  key={approachIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <Card className="border-none bg-white/80 dark:bg-slate-900/80 backdrop-blur">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-full ${approachCards[approachIndex].color} flex items-center justify-center mb-4`}>
                        {approachCards[approachIndex].icon}
                      </div>
                      <CardTitle>{approachCards[approachIndex].title}</CardTitle>
                      <CardDescription>{approachCards[approachIndex].description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              </div>
              <div className="flex justify-between mt-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevApproach}
                  className="rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/20"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextApproach}
                  className="rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/20"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>

          {/* Values Slider */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
              Our Values
            </h3>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl">
                <motion.div
                  key={valuesIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <Card className="border-none bg-white/80 dark:bg-slate-900/80 backdrop-blur">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-full ${valueCards[valuesIndex].color} flex items-center justify-center mb-4`}>
                        {valueCards[valuesIndex].icon}
                      </div>
                      <CardTitle>{valueCards[valuesIndex].title}</CardTitle>
                      <CardDescription>{valueCards[valuesIndex].description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              </div>
              <div className="flex justify-between mt-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevValue}
                  className="rounded-full hover:bg-pink-100 dark:hover:bg-pink-900/20"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextValue}
                  className="rounded-full hover:bg-pink-100 dark:hover:bg-pink-900/20"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="space-y-10">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 text-transparent bg-clip-text">
            Why Choose Sukoon Consultancy
          </h2>
          <p className="text-muted-foreground">
            Experience the difference with our comprehensive mental health care approach
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <WhyChooseCard
            icon={<Lock className="w-8 h-8" />}
            title="Confidentiality Assured"
            description="Your privacy is our priority. All sessions and information shared remain strictly confidential, protected by our secure systems and ethical practices."
            linkText="Learn More"
            linkColor="pink"
          />
          <WhyChooseCard
            icon={<GraduationCap className="w-8 h-8" />}
            title="Expert Counselors"
            description="Our team consists of certified professionals with extensive experience across various mental health domains, ensuring expert care."
            linkText="Meet Our Team"
            linkColor="emerald"
          />
          <WhyChooseCard
            icon={<Diamond className="w-8 h-8" />}
            title="Personalized Care"
            description="We tailor our approach to your unique needs, ensuring effective and personalized support throughout your wellness journey."
            linkText="Discover More"
            linkColor="blue"
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          What Our Clients Say
        </h2>
        <div className="relative">
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: testimonialOffset }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </motion.div>
          </div>
          <button
            onClick={() => handleTestimonialSlide('prev')}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-white/80 dark:bg-slate-800/80 rounded-full shadow-lg hover:bg-white dark:hover:bg-slate-800 transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => handleTestimonialSlide('next')}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-white/80 dark:bg-slate-800/80 rounded-full shadow-lg hover:bg-white dark:hover:bg-slate-800 transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* CTA Section */}
      <section className="text-center space-y-6">
        <h2 className="text-3xl font-bold">Ready to Begin Your Journey?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Take the first step towards better mental health today. Our team is ready to support you.
        </p>
        <Button 
          size="lg"
          className="bg-gradient-to-r from-pink-500 to-rose-500 text-white"
          onClick={() => window.location.href = "/consultation/book"}
        >
          Book a Consultation Now
        </Button>
      </section>
    </div>
  )
} 