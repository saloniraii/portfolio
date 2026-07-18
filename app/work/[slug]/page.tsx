"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import PageTransition from "@/components/shared/PageTransition";

// Placeholder data — each company page will be customized later
const workData: Record<
  string,
  { title: string; role: string; period: string; description: string }
> = {
  "company-one": {
    title: "Company One",
    role: "Design Lead",
    period: "2023 — Present",
    description:
      "This page will showcase all the projects and work done at Company One. Custom layout coming soon.",
  },
  "company-two": {
    title: "Company Two",
    role: "Product Designer",
    period: "2021 — 2023",
    description:
      "This page will showcase all the projects and work done at Company Two. Custom layout coming soon.",
  },
  college: {
    title: "College",
    role: "Student / Creative",
    period: "2017 — 2021",
    description:
      "This page will showcase projects, explorations, and creative work from college. Custom layout coming soon.",
  },
};

export default function WorkPage() {
  const params = useParams();
  const slug = params.slug as string;
  const data = workData[slug];

  if (!data) {
    return (
      <PageTransition>
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-4xl font-bold mb-4">
              Page not found
            </h1>
            <Link
              href="/"
              className="text-gray-500 hover:text-accent transition-colors font-body"
            >
              ← Back home
            </Link>
          </div>
        </main>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <main className="min-h-screen px-6 py-32 max-w-5xl mx-auto">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-accent transition-colors mb-16 font-body"
          >
            ← Back
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-6xl font-bold mb-4">
            {data.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-500 mb-12 font-body">
            <span>{data.role}</span>
            <span className="w-1 h-1 rounded-full bg-accent" />
            <span>{data.period}</span>
          </div>
        </motion.div>

        {/* Placeholder content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-12 rounded-2xl border border-dashed border-gray-200 bg-white"
        >
          <p className="text-lg text-gray-500 text-center font-body">
            {data.description}
          </p>
        </motion.div>
      </main>
    </PageTransition>
  );
}
