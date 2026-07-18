"use client";

import { motion } from "framer-motion";
import ThinkingWords from "@/components/shared/ThinkingWords";

export default function UpToCards() {
  return (
    <section className="w-full max-w-6xl mx-auto py-32 px-6">
      <h2 className="font-display text-5xl font-bold mb-4">
        What am I up to
      </h2>
      <p className="text-gray-500 mb-16 text-lg font-body">
        A collection of things I&apos;m doing when I&apos;m not working.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* ThinkingWords card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="group md:col-span-2"
        >
          <div className="h-full rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200 p-6 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-200">
            <p className="text-sm text-foreground/50 font-body mb-3">
              These days I am
            </p>
            <ThinkingWords showTimer={false} />
            <p className="mt-4 text-sm text-foreground/70 leading-relaxed font-body">
              Have been focusing on fun, everyday use apps on Claude. Claudemaxxing.
            </p>
          </div>
        </motion.div>

        {/* Remaining 7 cards — content TBD */}
        {Array.from({ length: 7 }, (_, i) => (
          <motion.div
            key={i + 2}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: (i + 1) * 0.06 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group"
          >
            <div className="h-full rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200 p-6 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-200 min-h-[140px]">
              <span className="text-xs font-mono uppercase tracking-wider text-foreground/30 font-medium">
                Coming soon
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
