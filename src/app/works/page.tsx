"use client";

import { useState } from "react";
import type { CSSProperties } from "react";

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

type Work = { id: number; name: string; category: string };

const works: Work[] = [
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

/* ─── 작품 상세 모달 ──────────────────────────────────────────── */
function WorkModal({ work, onClose }: { work: Work; onClose: () => void }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "white",
        zIndex: 100,
        overflowY: "auto",
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        style={{
          position: "fixed",
          top: "clamp(60px, 7.01vw, 101px)",
          right: "clamp(16px, 5.56vw, 80px)",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          zIndex: 101,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 24,
          height: 24,
        }}
        aria-label="닫기"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M5 5L19 19M19 5L5 19" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      {/* 본문 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "clamp(60px, 7.01vw, 101px)",
        }}
      >
        {/* 작품명 */}
        <p style={{
          fontSize: "clamp(16px, 1.67vw, 24px)",
          fontWeight: 600,
          color: "black",
          letterSpacing: "-0.48px",
          lineHeight: 1.5,
          textAlign: "center",
          whiteSpace: "nowrap",
        }}>
          {work.name || "작품명이 여기에 쓰입니다"}
        </p>

        {/* 팀원 */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(8px, 0.83vw, 12px)",
          marginTop: "clamp(20px, 3.06vw, 44px)",
        }}>
          {["팀원명", "팀원명", "팀원명", "팀원명"].map((name, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "6px 2px",
              }}
            >
              <p style={{
                fontSize: "clamp(12px, 1.11vw, 16px)",
                fontWeight: 500,
                color: "black",
                letterSpacing: "-0.32px",
                lineHeight: 1.5,
                whiteSpace: "nowrap",
              }}>
                {name}
              </p>
            </div>
          ))}
        </div>

        {/* 프리뷰 영역 */}
        <div style={{
          marginTop: "clamp(24px, 4.31vw, 62px)",
          width: "min(568px, calc(100% - clamp(32px, 11.11vw, 160px)))",
          aspectRatio: "568 / 320",
          backgroundColor: "#f3f3f3",
          borderRadius: "clamp(8px, 1.11vw, 16px)",
          overflow: "hidden",
          flexShrink: 0,
        }} />

        {/* 작품 설명 */}
        <p style={{
          fontSize: "14px",
          fontWeight: 500,
          color: "black",
          letterSpacing: "-0.28px",
          lineHeight: 1.62,
          textAlign: "center",
          width: "min(568px, calc(100% - clamp(32px, 11.11vw, 160px)))",
          padding: "0 10px",
          boxSizing: "border-box",
          marginTop: "clamp(24px, 5.56vw, 80px)",
        }}>
          서울여자대학교 첨단미디어디자인전공은 네 가지 트랙으로 나뉜다. UI와 UX, XR, Motion이 그 트랙에 해당하며, 본 전공은 다양한 미디어 디자인의 발전 가능성을 탐구한다. 전공생은 시대의 흐름에 맞춰 AI를 적극적으로 도입하며, 그 안에서 디자이너가 할 수 있는 역할에 대해 고민한다. 이를 고민한 과정의 최종 결과물은 본 졸업 전시를 통해 표현한다. 졸업 전시의 결과물은 저마다의 고민과 역량을 고루 담은 작품이자 스킬이자, 가치관이 된다. 이들이 나아가 우리 사회에서 신시대의 디자이너 역할을 제시하고, 수행하기를 바란다.
        </p>

        {/* 참고 링크 */}
        <p style={{
          fontSize: "14px",
          fontWeight: 500,
          color: "#38b3d6",
          letterSpacing: "-0.28px",
          lineHeight: 1.5,
          textAlign: "center",
          marginTop: "clamp(12px, 2.22vw, 32px)",
          whiteSpace: "nowrap",
        }}>
          참고: https://asdf.com
        </p>

        {/* 푸터 */}
        <footer
          className="flex items-center w-full"
          style={{
            backgroundColor: "#34b2d5",
            height: "clamp(72px, 8.13vw, 117px)",
            padding: "0 clamp(16px, 5.56vw, 80px)",
            marginTop: "clamp(40px, 5.56vw, 80px)",
            flexShrink: 0,
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
    </div>
  );
}

/* ─── 페이지 ──────────────────────────────────────────────────── */
export default function WorksPage() {
  const [activeFilter, setActiveFilter] = useState("XR");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  const filtered = works.filter((w) => w.category === activeFilter);

  return (
    <div className="bg-white min-h-screen overflow-x-hidden" style={{ fontFamily: "Pretendard, sans-serif" }}>

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
              onClick={() => setSelectedWork(work)}
              onMouseEnter={() => setHoveredId(work.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* 호버 오버레이 */}
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

      {/* ── 작품 상세 모달 ──────────────────────────────── */}
      {selectedWork && (
        <WorkModal work={selectedWork} onClose={() => setSelectedWork(null)} />
      )}
    </div>
  );
}
