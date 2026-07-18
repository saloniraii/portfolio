"use client";

import { useEffect, useRef } from "react";

export default function CursorHalo() {
  const haloRef = useRef<HTMLDivElement>(null);
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
      position.current.x = lerp(position.current.x, target.current.x, 0.07);
      position.current.y = lerp(position.current.y, target.current.y, 0.07);

      if (haloRef.current) {
        haloRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`;
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
      ref={haloRef}
      className="pointer-events-none fixed top-0 left-0 z-[9998]"
      style={{ willChange: "transform" }}
    >
      <div
        className="w-[200px] h-[200px] -ml-[100px] -mt-[100px] rounded-full"
        style={{
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          maskImage:
            "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.2) 55%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.2) 55%, transparent 70%)",
        }}
      />
    </div>
  );
}
