'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
}

const features = [
  {
    title: "AI Chat",
    description: "Experience empathetic conversations with our advanced AI companion, trained to understand and support your emotional well-being.",
    icon: "🤖",
    href: "/chat",
    color: "from-pink-500 to-rose-500"
  },
  {
    title: "Community",
    description: "Join a supportive network where you can share experiences, find understanding, and connect with others in a safe, moderated space.",
    icon: "👥",
    href: "/community",
    color: "from-violet-500 to-fuchsia-500"
  },
  {
    title: "Consultation",
    description: "Schedule personalized sessions with mental health professionals for expert guidance and support on your wellness journey.",
    icon: "👨‍⚕️",
    href: "/consultation",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Analytics",
    description: "Gain insights into your emotional patterns and progress with detailed analytics and personalized recommendations.",
    icon: "📊",
    href: "/profile/analytics",
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "Resources",
    description: "Access a curated collection of mental health resources, articles, and educational materials to support your growth.",
    icon: "📚",
    href: "/resources",
    color: "from-yellow-500 to-orange-500"
  },
  {
    title: "Wellness Tools",
    description: "Explore a suite of interactive tools designed to enhance your mental well-being, from meditation to mood tracking.",
    icon: "🧘‍♀️",
    href: "/wellness",
    color: "from-purple-500 to-indigo-500"
  }
]

const services = [
  {
    title: "AI Voice Assistant",
    description: "Chat naturally with voice support in Indian English"
  },
  {
    title: "Ghost Mode Community",
    description: "Share anonymously in moderated support groups"
  },
  {
    title: "Expert Consultations",
    description: "Connect with verified mental health professionals"
  },
  {
    title: "Smart Analytics",
    description: "Track your wellness journey with AI insights"
  },
  {
    title: "Interactive Exercises",
    description: "Engage with personalized wellness activities"
  },
  {
    title: "Crisis Support",
    description: "24/7 emergency resources and helpline access"
  },
  {
    title: "Wellness Integration",
    description: "Sync with your daily health and meditation apps"
  },
  {
    title: "Personalized Growth",
    description: "AI-driven recommendations for your journey"
  }
]

export default function Home() {
  return (
    <main className="container max-w-7xl mx-auto py-12">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Your Mental Health Journey
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Start your journey to better mental health with SukoonAI. Our AI-powered platform
              provides personalized support, guided exercises, and tools to help you understand
              and improve your mental wellbeing.
            </p>
            <Button size="lg" className="rounded-full bg-purple-600 hover:bg-purple-700" asChild>
              <Link href="/chat" className="inline-flex items-center gap-2">
                Start Your Journey
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-3xl blur-3xl" />
            <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
              <h2 className="text-2xl font-semibold mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                What We Offer
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {services.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <motion.section 
        className="py-20 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Features to Support Your Journey
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="relative"
            >
              <Link
                href={feature.href}
                className="block group relative overflow-hidden rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur p-8 transition-all hover:shadow-2xl"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10"
                  style={{ backgroundImage: `linear-gradient(to right, ${feature.color})` }}
                  initial={false}
                  animate={{ opacity: 0 }}
                  whileHover={{ opacity: 0.1 }}
                />
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  className="text-4xl mb-4 block"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  )
}

