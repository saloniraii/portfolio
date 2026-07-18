"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const position = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const animationFrame = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const animate = () => {
      position.current.x = lerp(position.current.x, target.current.x, 0.15);
      position.current.y = lerp(position.current.y, target.current.y, 0.15);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`;
      }

      animationFrame.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{ willChange: "transform" }}
    >
      {/* Tip of the cursor aligns with the actual mouse position */}
      <Image
        src="/cursor/cursor.svg"
        alt=""
        width={28}
        height={34}
        className="pointer-events-none select-none"
        style={{ marginLeft: "-2px", marginTop: "-2px" }}
        priority
      />
    </div>
  );
}
