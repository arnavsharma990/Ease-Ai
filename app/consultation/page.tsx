'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, Brain, Heart, Lightbulb, Shield, Users, TrendingUp, Sparkles, HeartHandshake, Lock, GraduationCap, UserCircle } from 'lucide-react';

interface Consultant {
  name: string;
  experience: string;
  specialty: string;
}

interface ConsultantMap {
  'Therapy Session': Consultant[];
  'Stress Management': Consultant[];
  'Career Counseling': Consultant[];
}

interface Service {
  title: 'Therapy Session' | 'Stress Management' | 'Career Counseling';
  duration: string;
  price: string;
  description: string;
}

const gradients = {
  primary: "from-[#8844ee] to-[#4477ff]",
  warm: "from-[#ff6b6b] to-[#ff4477]",
  nature: "from-[#34d399] to-[#3b82f6]",
  sunset: "from-[#f59e0b] to-[#ef4444]",
  ocean: "from-[#0ea5e9] to-[#6366f1]"
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function ConsultationPage() {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const consultants: ConsultantMap = {
    'Therapy Session': [
      {
        name: "Dr. Priya Sharma",
        experience: "10+ years",
        specialty: "Anxiety & Depression",
      },
      {
        name: "Dr. Rahul Mehta",
        experience: "8+ years",
        specialty: "Trauma & PTSD",
      },
      {
        name: "Dr. Ananya Patel",
        experience: "12+ years",
        specialty: "Relationship Issues",
      },
    ],
    'Stress Management': [
      {
        name: "Dr. Vikram Singh",
        experience: "9+ years",
        specialty: "Work-related Stress",
      },
      {
        name: "Dr. Meera Kapoor",
        experience: "7+ years",
        specialty: "Mindfulness & Meditation",
      },
      {
        name: "Dr. Arjun Reddy",
        experience: "11+ years",
        specialty: "Burnout Prevention",
      },
    ],
    'Career Counseling': [
      {
        name: "Dr. Neha Gupta",
        experience: "15+ years",
        specialty: "Career Transitions",
      },
      {
        name: "Dr. Karan Malhotra",
        experience: "10+ years",
        specialty: "Professional Development",
      },
      {
        name: "Dr. Sonia Joshi",
        experience: "8+ years",
        specialty: "Work-Life Balance",
      },
    ],
  };

  const testimonials = [
    {
      quote: "Sukoon Consultancy has been instrumental in my journey towards better mental health. The counselors are empathetic and skilled.",
      author: "Aisha K.",
      duration: "Client for 6 months"
    },
    {
      quote: "The stress management sessions have given me tools to handle work pressure effectively. I'm more productive and happier now.",
      author: "Rahul J.",
      duration: "Client for 3 months"
    },
    {
      quote: "The career counseling session helped me identify my strengths and make informed decisions. I'm now in a job I truly enjoy.",
      author: "Sanya P.",
      duration: "Client for 1 year"
    }
  ];

  const services: Service[] = [
    {
      title: "Therapy Session",
      duration: "50 minutes",
      price: "₹1,500",
      description: "One-on-one session with a therapist to address mental health concerns."
    },
    {
      title: "Stress Management",
      duration: "45 minutes",
      price: "₹1,200",
      description: "Learn techniques to manage stress and improve overall wellbeing."
    },
    {
      title: "Career Counseling",
      duration: "60 minutes",
      price: "₹1,800",
      description: "Guidance on career decisions, job satisfaction, and professional growth."
    }
  ] as const;

  return (
    <div className="container mx-auto px-4 py-8 space-y-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-16"
      >
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#ff6b6b] to-[#ff4477] bg-clip-text text-transparent">
            Your Journey to Mental Wellbeing Starts Here
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            At Sukoon Consultancy, we provide expert mental health support in a safe, confidential environment. Our team of professionals is dedicated to helping you navigate life's challenges with confidence and peace of mind.
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-gradient-to-r from-[#ff6b6b] to-[#ff4477] hover:opacity-90 text-white border-0" size="lg">
              Book a Consultation
            </Button>
            <Button className="border-[#ff4477] text-[#ff4477] hover:bg-[#ff4477] hover:text-white" size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </section>

        {/* Book Your Consultation */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-[#34d399] to-[#3b82f6] bg-clip-text text-transparent">
            Book Your Consultation
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div 
                key={service.title} 
                className="bg-white dark:bg-gray-800 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-8 hover:shadow-[0_4px_20px_rgba(136,68,238,0.15)] transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#8844ee]/10 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-[#8844ee]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#8844ee]">{service.title}</h3>
                </div>

                <p className="text-gray-500 dark:text-gray-300 mb-4 min-h-[60px]">{service.description}</p>
                
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-300 mb-6">
                  <span className="text-sm">Duration: {service.duration}</span>
                </div>

                <p className="text-2xl font-bold mb-6 text-[#8844ee]">{service.price}</p>
                
                <button
                  onClick={() => setExpandedService(expandedService === service.title ? null : service.title)}
                  className="w-full flex items-center justify-between bg-[#8844ee] hover:bg-[#7733dd] text-white px-6 py-3 rounded-[10px] transition-colors"
                >
                  <span>View Consultants</span>
                  {expandedService === service.title ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {expandedService === service.title && (
                  <div className="mt-6 space-y-4">
                    {consultants[service.title].map((consultant, index) => (
                      <div
                        key={consultant.name}
                        className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-[10px]"
                      >
                        <h4 className="font-semibold text-[#8844ee] mb-2">{consultant.name}</h4>
                        <div className="space-y-1 mb-4">
                          <p className="text-sm text-gray-500 dark:text-gray-300">
                            Experience: {consultant.experience}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-300">
                            Specialty: {consultant.specialty}
                          </p>
                        </div>
                        <button className="w-full bg-[#4477ff] hover:bg-[#3366ee] text-white px-6 py-2 rounded-[10px] text-sm transition-colors">
                          Book Now
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Our Approach Section */}
        <section className="space-y-8 py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#f59e0b] to-[#ef4444] bg-clip-text text-transparent">
              Our Approach
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              We believe in a holistic approach to mental health that addresses your unique needs.
            </p>
          </motion.div>

          <div className="bg-white dark:bg-gray-800 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h3 className="text-2xl font-semibold text-[#8844ee] mb-4">Our Mission & Approach</h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                At Sukoon Consultancy, we believe in a holistic approach to mental health that combines evidence-based practices with compassionate care.
              </p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid md:grid-cols-3 gap-6"
            >
              <motion.div
                variants={fadeInUp}
                className="group bg-white dark:bg-gray-800 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 hover:shadow-[0_4px_20px_rgba(136,68,238,0.2)] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-[#8844ee]/10 flex items-center justify-center mb-4 group-hover:bg-[#8844ee]/20 transition-colors">
                  <Brain className="w-6 h-6 text-[#8844ee]" />
                </div>
                <h4 className="text-lg font-semibold text-[#8844ee] mb-3">Evidence-Based Approach 🧠</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Our therapeutic methods are grounded in scientific research and proven techniques.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="group bg-white dark:bg-gray-800 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 hover:shadow-[0_4px_20px_rgba(255,68,119,0.2)] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-[#ff4477]/10 flex items-center justify-center mb-4 group-hover:bg-[#ff4477]/20 transition-colors">
                  <Heart className="w-6 h-6 text-[#ff4477]" />
                </div>
                <h4 className="text-lg font-semibold text-[#ff4477] mb-3">Compassionate Care ❤️</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  We create a safe, non-judgmental space for your journey to wellness.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="group bg-white dark:bg-gray-800 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 hover:shadow-[0_4px_20px_rgba(68,119,255,0.2)] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-[#4477ff]/10 flex items-center justify-center mb-4 group-hover:bg-[#4477ff]/20 transition-colors">
                  <Lightbulb className="w-6 h-6 text-[#4477ff]" />
                </div>
                <h4 className="text-lg font-semibold text-[#4477ff] mb-3">Holistic Perspective 🌟</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  We consider all aspects of your life for comprehensive care.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-12"
            >
              <h4 className="text-xl font-semibold text-[#8844ee] mb-8 text-center">Our Values</h4>
              <motion.div 
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="grid md:grid-cols-3 gap-6"
              >
                <motion.div
                  variants={fadeInUp}
                  className="group bg-white dark:bg-gray-800 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 hover:shadow-[0_4px_20px_rgba(136,68,238,0.2)] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-[#8844ee]/10 flex items-center justify-center mb-4 group-hover:bg-[#8844ee]/20 transition-colors">
                    <Shield className="w-6 h-6 text-[#8844ee]" />
                  </div>
                  <h5 className="text-lg font-semibold text-[#8844ee] mb-2">Confidentiality</h5>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Your privacy is paramount. All information shared remains strictly confidential.
                  </p>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  className="group bg-white dark:bg-gray-800 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 hover:shadow-[0_4px_20px_rgba(255,68,119,0.2)] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-[#ff4477]/10 flex items-center justify-center mb-4 group-hover:bg-[#ff4477]/20 transition-colors">
                    <Users className="w-6 h-6 text-[#ff4477]" />
                  </div>
                  <h5 className="text-lg font-semibold text-[#ff4477] mb-2">Respect</h5>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    We honor your unique experiences, beliefs, and cultural background.
                  </p>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  className="group bg-white dark:bg-gray-800 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 hover:shadow-[0_4px_20px_rgba(68,119,255,0.2)] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-[#4477ff]/10 flex items-center justify-center mb-4 group-hover:bg-[#4477ff]/20 transition-colors">
                    <Sparkles className="w-6 h-6 text-[#4477ff]" />
                  </div>
                  <h5 className="text-lg font-semibold text-[#4477ff] mb-2">Empowerment</h5>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Equipping you with tools and insights for life's challenges.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Why Choose Sukoon Consultancy */}
        <section className="space-y-8 py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0ea5e9] to-[#6366f1] bg-clip-text text-transparent">
              Why Choose Sukoon Consultancy
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Experience the difference with our comprehensive mental health care approach
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
          >
            <motion.div
              variants={fadeInUp}
              className="group relative bg-white dark:bg-gray-800 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-8 hover:shadow-[0_4px_20px_rgba(244,107,107,0.15)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#ff6b6b]/10 to-transparent rounded-bl-[100px] transition-all duration-300 group-hover:scale-110" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#ff6b6b]/10 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:rotate-6">
                  <Lock className="w-7 h-7 text-[#ff6b6b]" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#ff6b6b]">Confidentiality Assured</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Your privacy is our priority. All sessions and information shared remain strictly confidential, protected by our secure systems and ethical practices.
                </p>
                <div className="mt-6 flex items-center text-[#ff6b6b] font-medium">
                  <span className="text-sm group-hover:translate-x-2 transition-transform duration-300">Learn More</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="group relative bg-white dark:bg-gray-800 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-8 hover:shadow-[0_4px_20px_rgba(52,211,153,0.15)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#34d399]/10 to-transparent rounded-bl-[100px] transition-all duration-300 group-hover:scale-110" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#34d399]/10 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:rotate-6">
                  <GraduationCap className="w-7 h-7 text-[#34d399]" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#34d399]">Expert Counselors</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our team consists of certified professionals with extensive experience across various mental health domains, ensuring expert care.
                </p>
                <div className="mt-6 flex items-center text-[#34d399] font-medium">
                  <span className="text-sm group-hover:translate-x-2 transition-transform duration-300">Meet Our Team</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="group relative bg-white dark:bg-gray-800 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-8 hover:shadow-[0_4px_20px_rgba(14,165,233,0.15)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#0ea5e9]/10 to-transparent rounded-bl-[100px] transition-all duration-300 group-hover:scale-110" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#0ea5e9]/10 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:rotate-6">
                  <HeartHandshake className="w-7 h-7 text-[#0ea5e9]" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#0ea5e9]">Personalized Care</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We tailor our approach to your unique needs, ensuring effective and personalized support throughout your wellness journey.
                </p>
                <div className="mt-6 flex items-center text-[#0ea5e9] font-medium">
                  <span className="text-sm group-hover:translate-x-2 transition-transform duration-300">Discover More</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            <motion.div
              variants={fadeInUp}
              className="group flex items-center gap-4 bg-white/50 dark:bg-gray-800/50 rounded-[15px] p-4 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-[#8844ee]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-6 h-6 text-[#8844ee]" />
              </div>
              <div>
                <h4 className="font-semibold text-[#8844ee]">Safe Space</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Judgment-free environment</p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="group flex items-center gap-4 bg-white/50 dark:bg-gray-800/50 rounded-[15px] p-4 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-[#ff4477]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-[#ff4477]" />
              </div>
              <div>
                <h4 className="font-semibold text-[#ff4477]">Community Support</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Connect with others</p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="group flex items-center gap-4 bg-white/50 dark:bg-gray-800/50 rounded-[15px] p-4 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-[#4477ff]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <UserCircle className="w-6 h-6 text-[#4477ff]" />
              </div>
              <div>
                <h4 className="font-semibold text-[#4477ff]">24/7 Support</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Always here for you</p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* What Our Clients Say */}
        <section className="space-y-8 py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#f59e0b] to-[#ef4444] bg-clip-text text-transparent">
              What Our Clients Say
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Hear from those who have experienced positive changes through our services.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group bg-white dark:bg-gray-800 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-8 hover:shadow-[0_4px_20px_rgba(136,68,238,0.15)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="space-y-6">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8844ee] to-[#4477ff] flex items-center justify-center text-white font-semibold text-lg">
                      {testimonial.author.split(' ')[0][0]}{testimonial.author.split(' ')[1][0]}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#8844ee] group-hover:text-[#7733dd] transition-colors">
                        {testimonial.author}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.duration}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="text-center space-y-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#ff6b6b] to-[#ff4477] bg-clip-text text-transparent">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Take the first step towards better mental health today. Our team is ready to support you.
          </p>
          <Button className="bg-gradient-to-r from-[#ff6b6b] to-[#ff4477] hover:opacity-90 text-white border-0" size="lg">
            Book a Consultation Now
          </Button>
        </section>
      </motion.div>
    </div>
  );
} 