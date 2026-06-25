"use client";

import type { CSSProperties } from "react";
import { useRouter } from "next/navigation";
import ScrollToTop from "../components/ScrollToTop";
import NavBar from "../components/NavBar";

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

/* ─── 데이터 (추후 실제 데이터로 교체) ──────────────────────── */
const designers = [
  { id: 1,  name: "김채현" },
  { id: 2,  name: "김채현" },
  { id: 3,  name: "김채현" },
  { id: 4,  name: "김채현" },
  { id: 5,  name: "김채현" },
  { id: 6,  name: "김채현" },
  { id: 7,  name: "김채현" },
  { id: 8,  name: "김채현" },
  { id: 9,  name: "김채현" },
];

/* ─── 페이지 ──────────────────────────────────────────────────── */
export default function DesignerPage() {
  const router = useRouter();
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
        style={{ top: "clamp(280px, 39.38vw, 567px)", left: 0, width: "100%", height: "clamp(148px, 21.6vw, 311px)", zIndex: 1 }}
      >
        <img alt="" src="/assets/designer-banner.svg" className="w-full h-full object-cover" />
      </div>

      {/* ── 컨텐츠 ────────────────────────────────────────── */}
      <div className="relative" style={{ zIndex: 2 }}>

        {/* ── 네비게이션 바 ──────────────────────────────── */}
        <div style={{ padding: "clamp(10px, 4.93vw, 71px) clamp(16px, 5.56vw, 80px) 0" }}>
          <NavBar activeItem="디자이너" isLight={true} compact={true} />
        </div>

        {/* ── 카드 그리드 ───────────────────────────────── */}
        <div style={{ padding: "clamp(24px, 5.56vw, 80px) clamp(16px, 8.96vw, 129px) 0" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              columnGap: "clamp(10px, 1.46vw, 21px)",
              rowGap: "clamp(18px, 2.5vw, 36px)",
            }}
          >
            {designers.map((d) => (
              <div
                key={d.id}
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "380 / 505",
                  backgroundColor: "#e6f5f9",
                  borderRadius: "clamp(12px, 1.67vw, 24px)",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
                onClick={() => router.push(`/student/${d.id}`)}
              >
                <p
                  style={{
                    ...txt(24, 800, "black"),
                    position: "absolute",
                    bottom: "clamp(12px, 1.25vw, 18px)",
                    right: "clamp(16px, 1.67vw, 24px)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {d.name}
                </p>
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
      </div>

      <ScrollToTop />
    </div>
  );
}
