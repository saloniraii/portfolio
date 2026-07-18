"use client";

import { useEffect, useRef, useCallback } from "react";

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    const gridColor = "rgba(0, 0, 0, 0.08)";
    const lineWidth = 0.5;
    const spacing = 55;

    const cols = Math.ceil(w / spacing) + 2;
    const rows = Math.ceil(h / spacing) + 4;

    // The bend starts here — like a wall meeting a floor
    const bendY = h * 0.5;
    // Radius of the cylindrical curve
    const curveRadius = h * 0.6;

    ctx.strokeStyle = gridColor;
    ctx.lineWidth = lineWidth;

    // Helper: given a "flat" y coordinate, return the curved screen position
    // Above bendY: straight. Below bendY: curves away like a cylinder floor
    function getCurvedPoint(flatX: number, flatY: number): [number, number] {
      if (flatY <= bendY) {
        return [flatX, flatY];
      }

      // How far past the bend point
      const dist = flatY - bendY;
      // Arc angle based on distance past bend
      const angle = dist / curveRadius;

      // Y compresses (floor recedes into distance)
      const curvedY = bendY + Math.sin(angle) * curveRadius * 0.55;

      // X spreads outward from center (perspective)
      const centerX = w / 2;
      const offsetX = flatX - centerX;
      const spread = 1 + (1 - Math.cos(angle)) * 1.2;
      const curvedX = centerX + offsetX * spread;

      return [curvedX, curvedY];
    }

    // Draw vertical lines
    for (let i = -2; i <= cols; i++) {
      const x = i * spacing;
      ctx.beginPath();

      for (let y = 0; y <= h; y += 2) {
        const [cx, cy] = getCurvedPoint(x, y);

        if (y === 0) {
          ctx.moveTo(cx, cy);
        } else {
          ctx.lineTo(cx, cy);
        }
      }
      ctx.stroke();
    }

    // Draw horizontal lines
    for (let j = 0; j <= rows; j++) {
      const y = j * spacing;
      if (y > h * 1.3) continue; // Don't draw lines too far past visible area

      ctx.beginPath();

      for (let x = -spacing * 2; x <= w + spacing * 2; x += 2) {
        const [cx, cy] = getCurvedPoint(x, y);

        if (x === -spacing * 2) {
          ctx.moveTo(cx, cy);
        } else {
          ctx.lineTo(cx, cy);
        }
      }
      ctx.stroke();
    }
  }, []);

  useEffect(() => {
    drawGrid();
    window.addEventListener("resize", drawGrid);
    return () => window.removeEventListener("resize", drawGrid);
  }, [drawGrid]);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
