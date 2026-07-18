"use client";

import { motion } from "framer-motion";

// Placeholder gallery items — replace with actual images/graphics later
const galleryItems = [
  { id: 1, label: "Graphic 1" },
  { id: 2, label: "Graphic 2" },
  { id: 3, label: "Graphic 3" },
  { id: 4, label: "Graphic 4" },
  { id: 5, label: "Graphic 5" },
  { id: 6, label: "Graphic 6" },
  { id: 7, label: "Graphic 7" },
  { id: 8, label: "Graphic 8" },
];

export default function CreativeGallery() {
  return (
    <section className="w-full max-w-6xl mx-auto py-32 px-6">
      <h2 className="font-display text-5xl font-bold mb-4">
        What else am I up to
      </h2>
      <p className="text-gray-500 mb-16 text-lg font-body">
        A collection of things I make when I&apos;m not working.
      </p>

      {/* Masonry-style grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {galleryItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            className="break-inside-avoid"
          >
            <div
              className="w-full rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 font-body text-sm hover:border-accent/30 transition-colors"
              style={{
                height: `${180 + ((index * 47) % 120)}px`,
              }}
            >
              {item.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
