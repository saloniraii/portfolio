"use client";

import { motion } from "framer-motion";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

// Placeholder testimonials — replace with actual ones later
const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "An incredibly talented designer who brings energy and creativity to everything they touch.",
    author: "Person One",
    role: "Manager at Company",
  },
  {
    id: "2",
    quote:
      "Their attention to detail and ability to think through complex interactions is remarkable.",
    author: "Person Two",
    role: "Colleague at Company",
  },
  {
    id: "3",
    quote:
      "Always pushing boundaries and finding ways to make the work more delightful.",
    author: "Person Three",
    role: "Collaborator",
  },
];

export default function Testimonials() {
  return (
    <section className="w-full max-w-5xl mx-auto py-32 px-6">
      <h2 className="font-display text-5xl font-bold mb-16">
        What people say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Accent quote mark */}
            <span className="text-accent text-4xl font-display leading-none">
              &ldquo;
            </span>
            <p className="text-base leading-relaxed text-gray-600 font-body mt-2 mb-6">
              {testimonial.quote}
            </p>
            <div className="border-t border-gray-100 pt-4">
              <p className="font-semibold text-sm font-body">
                {testimonial.author}
              </p>
              <p className="text-xs text-gray-400 mt-1 font-body">
                {testimonial.role}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
