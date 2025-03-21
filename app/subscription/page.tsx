import PricingSection from "@/components/subscription/PricingSection"
import PremiumFeatures from "@/components/subscription/PremiumFeatures"
import FAQ from "@/components/subscription/FAQ"
import Testimonials from "@/components/subscription/Testimonials"

export default function SubscriptionPage() {
  return (
    <div className="container max-w-6xl py-10 space-y-20">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-violet-600 text-transparent bg-clip-text">
          Unlock Premium Features
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Take your mental wellness journey to the next level with our premium features and personalized support.
        </p>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* Premium Features */}
      <PremiumFeatures />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />
    </div>
  )
} 