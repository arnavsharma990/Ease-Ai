"use client";

import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const getPlans = (isYearly: boolean) => [
  {
    name: 'Free',
    price: '0',
    description: 'Basic features for personal use',
    features: [
      'Basic chat with AI',
      'Limited messages per day',
      'Standard response time',
      'Basic mood tracking',
      'Community support'
    ],
    buttonText: 'Get Started',
    popular: false,
    period: isYearly ? '/year' : '/month'
  },
  {
    name: 'Nirvana',
    price: isYearly ? '4999' : '499',
    description: 'Advanced features for deeper support',
    features: [
      'Unlimited AI chat sessions',
      'Priority response time',
      'Advanced mood analytics',
      'Personalized insights',
      'Guided meditation sessions',
      'Nirvana community access',
      '24/7 priority support'
    ],
    buttonText: 'Go Nirvana',
    popular: true,
    period: isYearly ? '/year' : '/month',
    savings: isYearly ? 'Save ₹989' : null
  }
];

export default function PricingSection() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isYearly, setIsYearly] = useState(false);
  const plans = getPlans(isYearly);

  const handleSubscribe = async (planName: string) => {
    if (!user) {
      // Redirect to sign in if not authenticated
      window.location.href = '/signin';
      return;
    }

    if (planName === 'Nirvana') {
      try {
        setLoading(true);
        const token = await user.getIdToken();
        
        const response = await fetch('/api/create-checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            isYearly
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to create checkout session');
        }

        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: "Error",
          description: "Failed to start checkout process. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className="py-12" id="pricing">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose the plan that best fits your needs
          </p>
          
          <div className="flex items-center justify-center gap-4 mt-8">
            <Label htmlFor="billing-toggle" className={!isYearly ? 'font-semibold' : ''}>Monthly</Label>
            <Switch
              id="billing-toggle"
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-blue-600"
            />
            <div className="flex items-center gap-2">
              <Label htmlFor="billing-toggle" className={isYearly ? 'font-semibold' : ''}>Yearly</Label>
              {isYearly && (
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  Save 17%
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-8 shadow-sm ${
                plan.popular ? 'border-blue-600 shadow-blue-100' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-blue-600 px-4 py-1 text-sm font-medium text-white">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight">₹{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                  {plan.savings && (
                    <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      {plan.savings}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-gray-600">{plan.description}</p>
              </div>

              <ul className="mb-8 space-y-4 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleSubscribe(plan.name)}
                disabled={loading}
                className={`w-full ${
                  plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''
                }`}
              >
                {loading ? 'Processing...' : plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 