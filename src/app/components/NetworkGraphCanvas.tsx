"use client";

import { useEffect, useRef } from "react";
import { NetworkGraph } from "@/lib/network-graph";
import { useHeroLight } from "./HeroLightContext";

export default function NetworkGraphCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<NetworkGraph | null>(null);
  const { isLight } = useHeroLight();

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
      darkMode: true,
    });
    graphRef.current = g;
    g.start();
    g.setRotationNormalized(0, 0);

    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    // 모바일에서 드래그 존이 없으면 포기
    if (isTouchDevice && !overlayRef.current) {
      return () => { g.destroy(); graphRef.current = null; };
    }

    const drag = { active: false, startX: 0, startY: 0, baseNx: 0, baseNy: 0, accNx: 0, accNy: 0 };

    const handleSelectStart = (e: Event) => {
      if (drag.active) e.preventDefault();
    };

    const handleDown = (e: PointerEvent) => {
      drag.startX = e.clientX;
      drag.startY = e.clientY;
      drag.baseNx = drag.accNx;
      drag.baseNy = drag.accNy;
      drag.active = true;
      if (!isTouchDevice) canvas.style.cursor = "grabbing";
    };

    const handleMove = (e: PointerEvent) => {
      if (!drag.active) return;
      if (g.isDraggingNode) {
        const rect = canvas.getBoundingClientRect();
        g.updateMouse(e.clientX - rect.left, e.clientY - rect.top, true);
        return;
      }
      const rect = canvas.getBoundingClientRect();
      const nx = drag.baseNx + (e.clientX - drag.startX) / rect.width;
      const ny = Math.max(-0.5, Math.min(0.5, drag.baseNy + (e.clientY - drag.startY) / rect.height));
      drag.accNx = nx;
      drag.accNy = ny;
      g.setRotationNormalized(nx, ny);
    };

    const handleUp = () => {
      drag.active = false;
      if (!isTouchDevice) canvas.style.cursor = "grab";
    };

    // 모바일: 드래그 시작을 중앙 overlay에서만 감지 → 위아래 스크롤 보존
    // 데스크탑: 기존대로 document 전체에서 감지
    const downTarget: EventTarget = isTouchDevice ? overlayRef.current! : document;

    downTarget.addEventListener("pointerdown", handleDown as EventListener);
    document.addEventListener("pointermove", handleMove as EventListener);
    document.addEventListener("pointerup", handleUp);
    document.addEventListener("pointercancel", handleUp);
    document.addEventListener("selectstart", handleSelectStart);

    return () => {
      g.destroy();
      graphRef.current = null;
      downTarget.removeEventListener("pointerdown", handleDown as EventListener);
      document.removeEventListener("pointermove", handleMove as EventListener);
      document.removeEventListener("pointerup", handleUp);
      document.removeEventListener("pointercancel", handleUp);
      document.removeEventListener("selectstart", handleSelectStart);
    };
  }, []);

  return (
    <div className="absolute inset-0 md:cursor-grab" style={{ zIndex: 1, pointerEvents: "none" }}>
      {/* 캔버스는 항상 pointer-events: none — 이벤트는 overlay 또는 document가 처리 */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-none"
      />
      {/* 모바일 드래그 존 — top 22% ~ bottom 22%(= top 78%) */}
      {/* 입력창: top 87.82%, 말풍선: bottom 18% → 드래그 존 하단(78%)과 입력창(87.82%) 사이 9.82% 여유 */}
      <div
        ref={overlayRef}
        className="absolute left-0 right-0 md:hidden"
        style={{
          top: "22%",
          bottom: "22%",
          touchAction: "none",
          pointerEvents: "auto",
          cursor: "grab",
        }}
      />
    </div>
  );
}
