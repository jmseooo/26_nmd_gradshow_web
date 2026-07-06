"use client";

import { useEffect, useRef } from "react";
import { NetworkGraph } from "@/lib/network-graph";
import { useHeroLight } from "./HeroLightContext";

export default function NetworkGraphCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const graphRef = useRef<NetworkGraph | null>(null);
  const { isLight } = useHeroLight();

  // Sync darkMode whenever light/dark state changes
  useEffect(() => {
    graphRef.current?.setOptions({ darkMode: !isLight });
  }, [isLight]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const g = new NetworkGraph(canvas, {
      nodeCount: 42,
      seed: 4,
      rotateSensitivity: 1,
      depth: 1,
      lineOpacity: 0.32,
      darkMode: true, // initial state is dark
    });
    graphRef.current = g;
    g.start();
    g.setRotationNormalized(0, 0);

    // 모바일(터치) 환경에서는 드래그 인터랙션 비활성화 — 스크롤 우선
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return () => { g.destroy(); graphRef.current = null; };

    const drag = { active: false, startX: 0, startY: 0, baseNx: 0, baseNy: 0, accNx: 0, accNy: 0 };

    const handleDown = (e: PointerEvent) => {
      drag.startX = e.clientX;
      drag.startY = e.clientY;
      drag.baseNx = drag.accNx;
      drag.baseNy = drag.accNy;
      drag.active = true;
      canvas.style.cursor = "grabbing";
    };

    const handleMove = (e: PointerEvent) => {
      if (!drag.active) return;
      if (g.isDraggingNode) {
        const rect = canvas.getBoundingClientRect();
        g.updateMouse(e.clientX - rect.left, e.clientY - rect.top, true);
        return;
      }
      const rect = canvas.getBoundingClientRect();
      const nx = Math.max(-0.5, Math.min(0.5, drag.baseNx + (e.clientX - drag.startX) / rect.width));
      const ny = Math.max(-0.5, Math.min(0.5, drag.baseNy + (e.clientY - drag.startY) / rect.height));
      drag.accNx = nx;
      drag.accNy = ny;
      g.setRotationNormalized(nx, ny);
    };

    const handleUp = () => {
      drag.active = false;
      canvas.style.cursor = "grab";
    };

    document.addEventListener("pointerdown", handleDown);
    document.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerup", handleUp);
    document.addEventListener("pointercancel", handleUp);

    return () => {
      g.destroy();
      graphRef.current = null;
      document.removeEventListener("pointerdown", handleDown);
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerup", handleUp);
      document.removeEventListener("pointercancel", handleUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block touch-auto pointer-events-none md:touch-none md:pointer-events-auto"
      style={{ cursor: "grab", zIndex: 1 }}
    />
  );
}
