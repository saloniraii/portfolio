"use client";

import { motion } from "framer-motion";
import PageTransition from "@/components/shared/PageTransition";

const socials = [
  { label: "Email", href: "mailto:hello@salonirai.com", icon: "✉️" },
  { label: "LinkedIn", href: "#", icon: "💼" },
  { label: "Twitter / X", href: "#", icon: "🐦" },
  { label: "Instagram", href: "#", icon: "📷" },
  { label: "Dribbble", href: "#", icon: "🏀" },
];

export default function ConnectPage() {
  return (
    <PageTransition>
      <main className="min-h-screen flex flex-col items-center justify-center px-6 py-32">
        <div className="max-w-2xl w-full">
          <motion.h1
            className="font-display text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Let&apos;s connect
          </motion.h1>

          <motion.p
            className="text-xl text-gray-500 mb-16 font-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Always up for a chat, collaboration, or just saying hi.
          </motion.p>

          {/* Social links */}
          <div className="space-y-3 mb-16">
            {socials.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-xl border border-gray-100 bg-white hover:border-accent/30 hover:bg-accent-light transition-all group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <span className="text-2xl">{social.icon}</span>
                <span className="text-lg font-medium font-body flex-1">
                  {social.label}
                </span>
                <span className="text-gray-300 group-hover:text-accent transition-colors">
                  ↗
                </span>
              </motion.a>
            ))}
          </div>

          {/* Resume download */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm"
          >
            <h3 className="font-display text-xl font-semibold mb-2">
              Resume
            </h3>
            <p className="text-gray-500 text-sm mb-4 font-body">
              Download my latest resume to learn more about my experience.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white text-sm font-medium font-body hover:opacity-90 transition-opacity"
            >
              Download PDF ↓
            </a>
          </motion.div>
        </div>
      </main>
    </PageTransition>
  );
}
