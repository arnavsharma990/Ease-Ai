"use client";

import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Yoga Instructor',
    content: 'Sukoon AI has transformed my meditation practice. The personalized guidance and soothing sounds help me achieve deeper states of mindfulness. I recommend it to all my students!',
  },
  {
    name: 'Rahul Verma',
    role: 'Software Engineer',
    content: 'As someone dealing with work stress, Sukoon AI has been a lifesaver. The AI understands my concerns and provides practical coping strategies that actually work.',
  },
  {
    name: 'Anita Desai',
    role: 'Mental Health Advocate',
    content: 'The personalized approach and 24/7 availability make Sukoon AI an invaluable tool for mental wellness. It\'s like having a supportive friend always ready to listen.',
  }
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrent((prev) => (prev + newDirection + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50/50" id="testimonials">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            What Our Users Say
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Discover how Sukoon AI is helping people improve their mental wellness
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto px-4">
          <div className="relative h-[400px] overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute w-full"
              >
                <div className="flex flex-col items-center text-center px-6">
                  <div className="w-24 h-24 rounded-full bg-gray-200 mb-8 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center">
                      <Quote className="w-8 h-8 text-purple-500 opacity-70" />
                    </div>
                  </div>
                  <blockquote className="text-xl md:text-2xl text-gray-700 italic mb-8 max-w-3xl">
                    {testimonials[current].content}
                  </blockquote>
                  <div className="mt-2">
                    <p className="font-semibold text-xl mb-2">{testimonials[current].name}</p>
                    <p className="text-gray-500 text-lg">{testimonials[current].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            onClick={() => paginate(-1)}
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            onClick={() => paginate(1)}
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > current ? 1 : -1);
                  setCurrent(index);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === current ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 