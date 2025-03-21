"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What's included in the Nirvana plan?",
    answer: "The Nirvana plan includes unlimited AI chat sessions, priority response times, advanced mood analytics, personalized insights, guided meditation sessions, Nirvana community access, and 24/7 priority support."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your Nirvana subscription at any time. Your Nirvana features will remain active until the end of your current billing period."
  },
  {
    question: "Is my data secure with the Nirvana plan?",
    answer: "Yes, we take data security very seriously. All conversations and personal information are encrypted and protected using industry-standard security measures. Nirvana members get additional privacy features."
  },
  {
    question: "How does the unlimited AI chat work?",
    answer: "With Nirvana, you get unlimited access to our AI mental health assistant. You can have as many conversations as you need, any time of day, with faster response times and more personalized support."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, and digital payment methods through our secure payment processor, Stripe."
  },
  {
    question: "Is there a free trial for Nirvana?",
    answer: "While we don't offer a free trial of Nirvana, you can use our basic features with a free account to experience our service. You can upgrade to Nirvana whenever you're ready."
  }
];

export default function FAQ() {
  return (
    <section className="py-12" id="faq">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to know about our Nirvana subscription
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
} 