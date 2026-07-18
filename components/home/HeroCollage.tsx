"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const collageItems = [
  { id: 1, src: "/collage/vinyl.png", alt: "Vinyl record player", width: 180, height: 100, startX: -260, startY: -220 },
  { id: 2, src: "/collage/coffee.png", alt: "Coffee machine", width: 150, height: 100, startX: 280, startY: -180 },
  { id: 3, src: "/collage/pin.png", alt: "Pinned photo", width: 130, height: 160, startX: -300, startY: 80 },
  { id: 4, src: "/collage/disco.png", alt: "Disco ball", width: 120, height: 120, startX: 300, startY: 160 },
  { id: 5, src: "/collage/dinner.png", alt: "Dinner table", width: 150, height: 170, startX: -180, startY: 260 },
  { id: 6, src: "/collage/character.png", alt: "Character illustration", width: 170, height: 110, startX: 240, startY: -300 },
  { id: 7, src: "/collage/flowerpot.png", alt: "Flower vase", width: 90, height: 120, startX: -350, startY: -100 },
  { id: 8, src: "/collage/disco.gif", alt: "Disco sparkle", width: 100, height: 100, startX: 350, startY: -50 },
];

export default function HeroCollage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Pin the hero section while scroll collage plays
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=150%",
        pin: true,
        pinSpacing: true,
      });

      // Animate each collage item from its starting position to around center
      itemsRef.current.forEach((item, index) => {
        if (!item) return;

        const collageItem = collageItems[index];
        const randomRotation = (Math.random() - 0.5) * 30;

        gsap.fromTo(
          item,
          {
            x: collageItem.startX + (Math.random() - 0.5) * 100,
            y: collageItem.startY + (Math.random() - 0.5) * 100,
            rotation: randomRotation + (Math.random() - 0.5) * 40,
            scale: 0,
            opacity: 0,
          },
          {
            x: collageItem.startX * 0.4,
            y: collageItem.startY * 0.4,
            rotation: randomRotation * 0.3,
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=150%",
              scrub: 1 + index * 0.1,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Center photo */}
      <div className="relative z-10 w-64 h-72 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80">
        <Image
          src="/collage/main.png"
          alt="Saloni Rai"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Collage items */}
      {collageItems.map((item, index) => (
        <div
          key={item.id}
          ref={(el) => {
            itemsRef.current[index] = el;
          }}
          className="absolute select-none"
          style={{ willChange: "transform, opacity" }}
        >
          <Image
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            className="pointer-events-none drop-shadow-md"
          />
        </div>
      ))}
    </section>
  );
}
