"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = [
  "Cogitating",
  "Percolating",
  "Marinating",
  "Synthesizing",
  "Orchestrating",
  "Crystallizing",
  "Bamboozling",
  "Discombobulating",
];

interface ThinkingWordsProps {
  /** Time in ms each word stays visible */
  interval?: number;
  /** Show the elapsed timer */
  showTimer?: boolean;
  /** Show the tip line beneath */
  tip?: string;
  /** Additional class names */
  className?: string;
}

export default function ThinkingWords({
  interval = 3000,
  showTimer = true,
  tip,
  className = "",
}: ThinkingWordsProps) {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const startTime = useRef<number | null>(null);

  // Only render dynamic content after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    startTime.current = Date.now();
  }, []);

  const getNextIndex = useCallback(() => {
    let next: number;
    do {
      next = Math.floor(Math.random() * WORDS.length);
    } while (next === currentIndex && WORDS.length > 1);
    return next;
  }, [currentIndex]);

  // Cycle through words
  useEffect(() => {
    if (!mounted) return;

    const timer = setInterval(() => {
      setCurrentIndex(getNextIndex());
    }, interval);

    return () => clearInterval(timer);
  }, [mounted, interval, getNextIndex]);

  // Elapsed timer
  useEffect(() => {
    if (!mounted || !showTimer) return;

    const timer = setInterval(() => {
      if (startTime.current) {
        setElapsed(Math.floor((Date.now() - startTime.current) / 1000));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [mounted, showTimer]);

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  if (!mounted) {
    return (
      <div className={`font-mono text-sm leading-relaxed ${className}`}>
        <div className="flex items-center gap-1.5">
          <span className="text-accent font-bold">✱</span>
          <span className="text-accent font-medium">{WORDS[0]}</span>
          <span className="text-accent">...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`font-mono text-sm leading-relaxed ${className}`}>
      {/* Main line: ✱ Word… (3s · ●) */}
      <div className="flex items-center gap-1.5">
        <span className="text-accent font-bold">✱</span>

        <AnimatePresence mode="wait">
          <motion.span
            key={WORDS[currentIndex]}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="text-accent font-medium"
          >
            {WORDS[currentIndex]}
          </motion.span>
        </AnimatePresence>

        <motion.span
          animate={{ opacity: [1, 0.3] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          className="text-accent"
        >
          ...
        </motion.span>

        {showTimer && (
          <span className="text-foreground/40 ml-1">
            ({formatTime(elapsed)} ·{" "}
            <motion.span
              animate={{ opacity: [1, 0.4] }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
              className="inline-block"
            >
              ●
            </motion.span>
            )
          </span>
        )}
      </div>

      {/* Tip line: └ Tip: Running... */}
      {tip && (
        <div className="flex items-center gap-1.5 ml-4 mt-0.5 text-foreground/40">
          <span>└</span>
          <span>Tip: {tip}</span>
        </div>
      )}
    </div>
  );
}
