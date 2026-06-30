"use client";

import { useState } from "react";
import type { CSSProperties } from "react";

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

const DAYS = [
  { label: "[1] 26.07.17", id: "day-1" },
  { label: "[2] 26.07.18", id: "day-2" },
  { label: "[3] 26.07.19", id: "day-3" },
];

export default function FieldPage() {
  const [activeDay, setActiveDay] = useState(0);

  const handleDayClick = (idx: number) => {
    setActiveDay(idx);
    document.getElementById(DAYS[idx].id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className="bg-white min-h-screen overflow-x-hidden relative"
      style={{ fontFamily: "Pretendard, sans-serif" }}
    >
      {/* ── 배경 ──────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0, opacity: 0.4 }}>
        <div className="absolute w-full" style={{ top: "-278.92px", height: "1444.826px" }}>
          <img alt="" src="/assets/hero-bg1.svg" className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="absolute w-full" style={{ top: "1166px", height: "1444.826px" }}>
          <img alt="" src="/assets/hero-bg1.svg" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </div>

      {/* ── 배너 (배경 장식) ──────────────────────────────── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "clamp(280px, 39.38vw, 567px)",
          left: 0,
          width: "100%",
          height: "clamp(148px, 21.6vw, 311px)",
          zIndex: 1,
        }}
      >
        <img alt="" src="/assets/field-banner.svg" className="w-full h-full object-cover" />
      </div>

      {/* ── 컨텐츠 ────────────────────────────────────────── */}
      <div className="relative" style={{ zIndex: 2 }}>

        {/* ── 본문: 날짜 탭 + 사진 섹션 ──────────────────── */}
        <div
          className="flex items-start"
          style={{
            padding: "clamp(24px, 2.57vw, 37px) clamp(16px, 5.56vw, 80px) 0",
            gap: "clamp(20px, 9.03vw, 130px)",
          }}
        >
          {/* ── 좌: 날짜 탭 ────────────────────────────── */}
          <div
            className="flex flex-col flex-shrink-0"
            style={{
              width: "clamp(60px, 9.03vw, 130px)",
              gap: "clamp(6px, 0.83vw, 12px)",
              position: "sticky",
              top: "clamp(20px, 2.08vw, 30px)",
            }}
          >
            {DAYS.map((day, i) => (
              <button
                key={day.id}
                onClick={() => handleDayClick(i)}
                style={{
                  width: "100%",
                  padding: "clamp(6px, 0.83vw, 12px)",
                  backgroundColor: activeDay === i ? "#42b1da" : "transparent",
                  borderRadius: "clamp(5px, 0.69vw, 10px)",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "center",
                  ...txt(16, 800, activeDay === i ? "white" : "black", -0.02),
                  whiteSpace: "nowrap",
                  transition: "background-color 0.3s ease, color 0.3s ease",
                }}
              >
                {day.label}
              </button>
            ))}
          </div>

          {/* ── 우: 날별 사진 섹션 ─────────────────────── */}
          <div
            className="flex flex-col"
            style={{ flex: 1, gap: "clamp(32px, 4.44vw, 64px)", paddingBottom: "clamp(40px, 5.56vw, 80px)" }}
          >
            {DAYS.map((day) => (
              <div
                key={day.id}
                id={day.id}
                className="flex flex-col"
                style={{ gap: "clamp(12px, 1.67vw, 24px)" }}
              >
                {/* 사진 카드 1 */}
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "4 / 3",
                    backgroundColor: "#e6f5f9",
                    borderRadius: "clamp(8px, 1.11vw, 16px)",
                    overflow: "hidden",
                  }}
                />
                {/* 사진 카드 2 */}
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "4 / 3",
                    backgroundColor: "#e6f5f9",
                    borderRadius: "clamp(8px, 1.11vw, 16px)",
                    overflow: "hidden",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── 구분선 ─────────────────────────────────────── */}
        <div
          style={{
            margin: "0 clamp(16px, 5.56vw, 80px)",
            height: "1px",
            backgroundColor: "#d0eaf3",
          }}
        />

        {/* ── 푸터 ───────────────────────────────────────── */}
        <footer
          className="flex items-center"
          style={{
            backgroundColor: "#34b2d5",
            height: "clamp(72px, 8.13vw, 117px)",
            padding: "0 clamp(16px, 5.56vw, 80px)",
          }}
        >
          <div className="flex items-center justify-between w-full flex-wrap" style={{ gap: "clamp(8px, 1.11vw, 16px)" }}>
            <p className="whitespace-nowrap" style={txt(12, 600, "white")}>
              2026 Seoul Women&apos;s University. All rights reserved
            </p>
            <div className="flex items-center" style={{ gap: "clamp(16px, 2.22vw, 32px)" }}>
              <p className="whitespace-nowrap" style={txt(12, 600, "white")}>@swu_graduation</p>
            </div>
          </div>
        </footer>
      </div>

    </div>
  );
}
