"use client";

import { Suspense } from 'react';
import PricingSection from '@/components/subscription/PricingSection';
import PremiumFeatures from '@/components/subscription/PremiumFeatures';
import Testimonials from '@/components/subscription/Testimonials';
import FAQ from '@/components/subscription/FAQ';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion, useScroll, useAnimationControls } from "framer-motion";

// Animated background component
const AnimatedBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <motion.div
      className="absolute inset-0"
      style={{
        background: "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15), transparent 70%)",
      }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.4, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <div className="absolute inset-0 bg-[#faf8ff]/80 dark:bg-background/80 backdrop-blur-sm" />
  </div>
);

export default function SubscriptionPage() {
  const controls = useAnimationControls();

  const scrollToFeatures = async () => {
    const element = document.getElementById('features');
    if (element) {
      controls.start({
        opacity: [1, 0.5, 1],
        scale: [1, 0.98, 1],
        transition: { duration: 0.4 }
      });
      
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToPricing = () => {
    const element = document.getElementById('pricing');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <motion.div
              className="inline-block relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight inline-flex flex-col items-center gap-4">
                <span className="whitespace-nowrap">Unlock Ultimate Peace of Mind with</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-violet-500 to-purple-600 whitespace-nowrap">
                  Sukoon AI Nirvana
                </span>
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto mt-6"
            >
              Personalized relaxation, expert support, and AI-driven mindfulness tools.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center gap-4 pt-8"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white px-8"
                onClick={scrollToPricing}
              >
                Upgrade to Nirvana
              </Button>
              <motion.div animate={controls}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-200 hover:bg-purple-50 dark:border-purple-800 dark:hover:bg-purple-950/30"
                  onClick={scrollToFeatures}
                >
                  Explore Features
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        id="features"
        className="w-full max-w-7xl mx-auto space-y-16 py-8 px-4 md:px-8"
      >
        <PremiumFeatures />
      </motion.div>
      
      <div id="pricing" className="w-full max-w-7xl mx-auto space-y-16 py-8 px-4 md:px-8">
        <Suspense fallback={<div>Loading pricing...</div>}>
          <PricingSection />
        </Suspense>
      </div>

      <Testimonials />

      <Suspense fallback={<div>Loading FAQ...</div>}>
        <FAQ />
      </Suspense>
    </div>
  );
} 