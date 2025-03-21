"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  const monthlyPrice = 499;
  const yearlyPrice = 4999;
  const monthlyInYearly = Math.round(yearlyPrice / 12);
  const savings = Math.round((monthlyPrice * 12 - yearlyPrice) / (monthlyPrice * 12) * 100);

  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Transparent Pricing</h2>
        <p className="text-xl text-muted-foreground">
          Choose your preferred billing cycle
        </p>
      </motion.div>

      <div className="flex items-center justify-center gap-4 mb-12">
        <motion.div
          animate={{ color: !isYearly ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))" }}
          className="text-lg font-medium"
        >
          Monthly
        </motion.div>
        <Switch
          checked={isYearly}
          onCheckedChange={setIsYearly}
          className="data-[state=checked]:bg-primary"
        />
        <motion.div
          animate={{ color: isYearly ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))" }}
          className="text-lg font-medium flex items-center gap-2"
        >
          Yearly
          {isYearly && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm rounded-full"
            >
              Save {savings}%
            </motion.span>
          )}
        </motion.div>
      </div>

      <motion.div
        layout
        className="max-w-lg mx-auto rounded-2xl overflow-hidden bg-card shadow-xl border"
      >
        <div className="p-8">
          <h3 className="text-2xl font-bold text-center mb-6">Premium Plan</h3>
          <div className="flex justify-center items-baseline gap-1 mb-4">
            <span className="text-3xl font-bold">₹</span>
            <motion.span
              key={isYearly ? 'yearly' : 'monthly'}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl font-bold"
            >
              {isYearly ? yearlyPrice : monthlyPrice}
            </motion.span>
            <span className="text-lg text-muted-foreground">/{isYearly ? 'year' : 'month'}</span>
          </div>

          {isYearly && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-muted-foreground mb-6"
            >
              Just ₹{monthlyInYearly}/month when billed yearly
            </motion.p>
          )}

          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-500" />
              <span>Unlimited AI conversations</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-500" />
              <span>Priority 24/7 support</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-500" />
              <span>Advanced mindfulness tools</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-500" />
              <span>Personalized recommendations</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-500" />
              <span>Progress tracking & insights</span>
            </li>
          </ul>

          <Button 
            size="lg" 
            className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
            onClick={() => alert('Premium subscriptions coming soon!')}
          >
            Get Started Now
          </Button>
        </div>

        <div className="px-8 py-4 bg-muted/50">
          <p className="text-center text-sm text-muted-foreground">
            30-day money-back guarantee. No questions asked.
          </p>
        </div>
      </motion.div>
    </section>
  );
} 