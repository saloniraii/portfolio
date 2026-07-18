"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  summary: string;
  slug: string;
}

// Placeholder data — replace with actual experiences later
const experiences: Experience[] = [
  {
    id: "1",
    company: "Company One",
    role: "Design Lead",
    period: "2023 — Present",
    summary:
      "Led design for consumer-facing products, building design systems and shipping delightful user experiences.",
    slug: "company-one",
  },
  {
    id: "2",
    company: "Company Two",
    role: "Product Designer",
    period: "2021 — 2023",
    summary:
      "Owned end-to-end design for core features, collaborating closely with engineering and product.",
    slug: "company-two",
  },
  {
    id: "3",
    company: "College",
    role: "Student / Creative",
    period: "2017 — 2021",
    summary:
      "Explored design, technology, and creative expression through projects, hackathons, and coursework.",
    slug: "college",
  },
];

export default function ExperienceList() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="w-full max-w-5xl mx-auto py-32 px-6">
      <h2 className="font-display text-5xl font-bold mb-16">Experience</h2>

      <div className="space-y-2">
        {experiences.map((exp) => (
          <Link
            key={exp.id}
            href={`/work/${exp.slug}`}
            className="block relative group"
            onMouseEnter={() => setHoveredId(exp.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <motion.div
              className="relative flex items-center justify-between p-6 rounded-2xl border border-transparent transition-all duration-200"
              whileHover={{
                backgroundColor: "rgba(178, 34, 34, 0.03)",
                borderColor: "rgba(178, 34, 34, 0.1)",
              }}
            >
              <div className="flex-1">
                <h3 className="font-display text-2xl font-semibold group-hover:text-accent transition-colors">
                  {exp.company}
                </h3>
                <p className="text-gray-500 mt-1 text-sm font-body">
                  {exp.role}
                </p>
              </div>
              <span className="text-sm text-gray-400 font-body">
                {exp.period}
              </span>

              {/* Arrow indicator */}
              <motion.span
                className="ml-4 text-lg text-accent opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
              >
                →
              </motion.span>
            </motion.div>

            {/* Hover summary card */}
            <AnimatePresence>
              {hoveredId === exp.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 w-80 p-5 rounded-xl bg-white shadow-xl border border-gray-100"
                >
                  <p className="text-sm text-gray-600 leading-relaxed font-body">
                    {exp.summary}
                  </p>
                  <span className="mt-3 inline-block text-xs text-accent font-medium">
                    Click to explore →
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
        ))}
      </div>
    </section>
  );
}
