"use client";

import { Brain, Clock, Heart, MessageCircle, Shield, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    name: 'Advanced AI Chat',
    description: 'Unlimited access to our advanced AI mental health assistant with deeper, more personalized conversations.',
    icon: Brain
  },
  {
    name: '24/7 Support',
    description: 'Round-the-clock access to AI support whenever you need it, with priority response times.',
    icon: Clock
  },
  {
    name: 'Enhanced Privacy',
    description: 'Advanced encryption and privacy features to keep your conversations completely confidential.',
    icon: Shield
  },
  {
    name: 'Personalized Insights',
    description: 'Detailed analytics and insights about your mental well-being and progress over time.',
    icon: Sparkles
  },
  {
    name: 'Mood Tracking',
    description: 'Advanced mood tracking with detailed patterns and personalized recommendations.',
    icon: Heart
  },
  {
    name: 'Community Access',
    description: 'Join our premium community for peer support and exclusive wellness resources.',
    icon: MessageCircle
  }
];

// Duplicate features for smooth infinite scroll
const duplicatedFeatures = [...features, ...features];

export default function PremiumFeatures() {
  return (
    <section className="py-24 overflow-hidden bg-gradient-to-b from-white to-gray-50/50" id="features">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Nirvana Features
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Everything you need for better mental well-being
          </p>
        </div>

        <div className="relative">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
          
          {/* Scrolling container */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-8 py-8"
              animate={{
                x: ["0%", "-50%"]
              }}
              transition={{
                x: {
                  duration: 13,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
            >
              {duplicatedFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={`${feature.name}-${index}`}
                    className="flex-shrink-0 w-[350px] relative flex flex-col rounded-2xl border bg-white/50 backdrop-blur-sm p-8 hover:shadow-lg transition-shadow"
                  >
                    <div className="mb-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 