"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import ScrollToTop from "../components/ScrollToTop";
import NavBar from "../components/NavBar";

/* ─── 카테고리 컬러 맵 ────────────────────────────────────────── */
const categoryColor: Record<string, string> = {
  XR:     "#b8d870",
  MOTION: "#e7b871",
  UI:     "#e99fa9",
  UX:     "#9898c8",
};

/* ─── 텍스트 스타일 헬퍼 ──────────────────────────────────────── */
function txt(size: number, weight: number, color: string, tracking = -0.02): CSSProperties {
  const min = Math.max(10, Math.round(size * 0.45));
  return {
    fontSize: `clamp(${min}px, ${((size / 1440) * 100).toFixed(3)}vw, ${size}px)`,
    fontWeight: weight,
    color,
    letterSpacing: `${tracking * size}px`,
    lineHeight: 1.5,
  };
}

/* ─── 데이터 ──────────────────────────────────────────────────── */
const filterTabs = [
  { label: "XR",     count: 10, color: "#b8d870" },
  { label: "MOTION", count: 2,  color: "#e7b871" },
  { label: "UI",     count: 3,  color: "#e99fa9" },
  { label: "UX",     count: 8,  color: "#9898c8" },
];

// 작품명은 추후 수정 예정 — name: "" 이면 빈 카드로 표시
const works = [
  { id: 1,  name: "Coco", category: "UI" },
  { id: 2,  name: "",     category: "UI" },
  { id: 3,  name: "",     category: "UI" },
  { id: 4,  name: "",     category: "XR" },
  { id: 5,  name: "",     category: "XR" },
  { id: 6,  name: "",     category: "XR" },
  { id: 7,  name: "",     category: "XR" },
  { id: 8,  name: "",     category: "XR" },
  { id: 9,  name: "",     category: "XR" },
  { id: 10, name: "",     category: "XR" },
  { id: 11, name: "",     category: "XR" },
  { id: 12, name: "",     category: "XR" },
  { id: 13, name: "",     category: "XR" },
  { id: 14, name: "",     category: "UX" },
  { id: 15, name: "",     category: "UX" },
];


/* ─── 페이지 ──────────────────────────────────────────────────── */
export default function WorksPage() {
  const [activeFilter, setActiveFilter] = useState("UI");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filtered = works.filter((w) => w.category === activeFilter);

  return (
    <div className="bg-white min-h-screen overflow-x-hidden" style={{ fontFamily: "Pretendard, sans-serif" }}>

      {/* ── 네비게이션 바 ──────────────────────────────── */}
      <div style={{ padding: "clamp(40px, 7.01vw, 101px) clamp(16px, 5.56vw, 80px) 0" }}>
        <NavBar activeItem="작품" isLight={true} compact={true} />
      </div>

      {/* ── 카테고리 필터 탭 ───────────────────────────── */}
      <div
        className="flex items-center"
        style={{
          padding: "clamp(20px, 6.53vw, 94px) clamp(16px, 5.56vw, 80px) 0",
          gap: "clamp(16px, 2.78vw, 40px)",
        }}
      >
        {filterTabs.map(({ label, count, color }) => {
          const isActive = activeFilter === label;
          return (
            <button
              key={label}
              onClick={() => setActiveFilter(label)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              <p style={{
                ...txt(30, 800, isActive ? color : "black"),
                whiteSpace: "nowrap",
                transition: "color 0.2s ease",
              }}>
                {label}&nbsp;{count}
              </p>
            </button>
          );
        })}
      </div>

      {/* ── 작품 카드 그리드 ───────────────────────────── */}
      <div style={{ padding: "clamp(16px, 3.19vw, 46px) clamp(16px, 5.56vw, 80px)" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(12px, 1.94vw, 28px)",
        }}>
          {filtered.map((work) => (
            <div
              key={work.id}
              className="relative overflow-hidden"
              style={{
                backgroundColor: "#f3f3f3",
                borderRadius: "clamp(12px, 1.67vw, 24px)",
                aspectRatio: "408 / 229.527",
                cursor: "pointer",
              }}
              onMouseEnter={() => setHoveredId(work.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* 호버 오버레이 (딤 + 원형 배지) */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.6) 20.652%, rgba(0,48,61,0.6) 72.717%, rgba(33,116,164,0.6) 124.78%)",
                  opacity: hoveredId === work.id ? 1 : 0,
                  transition: "opacity 0.3s ease",
                  pointerEvents: "none",
                }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: "clamp(60px, 7.08vw, 102px)",
                    height: "clamp(60px, 7.08vw, 102px)",
                    borderRadius: "50%",
                    backgroundColor: categoryColor[work.category],
                    flexShrink: 0,
                  }}
                >
                  {work.name && (
                    <p style={{ ...txt(24, 600, "white"), textAlign: "center" }}>
                      {work.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 푸터 ───────────────────────────────────────── */}
      <footer
        className="flex items-center"
        style={{
          backgroundColor: "#34b2d5",
          height: "clamp(72px, 8.13vw, 117px)",
          padding: "0 clamp(16px, 5.56vw, 80px)",
          marginTop: "clamp(40px, 5.56vw, 80px)",
        }}
      >
        <div className="flex items-center justify-between w-full flex-wrap" style={{ gap: "clamp(8px, 1.11vw, 16px)" }}>
          <p className="whitespace-nowrap" style={txt(12, 600, "white")}>
            2026 Seoul Women&apos;s University. All rights reserved
          </p>
          <div className="flex items-center" style={{ gap: "clamp(16px, 2.22vw, 32px)" }}>
            <p className="whitespace-nowrap" style={txt(12, 600, "white")}>@swu_graduation</p>
            <p className="whitespace-nowrap" style={txt(12, 600, "white")}>behance</p>
          </div>
        </div>
      </footer>

      <ScrollToTop />
    </div>
  );
}
