"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import type { CSSProperties } from "react";
import { useSearchParams } from "next/navigation";
import { works, type Work } from "@/lib/works-data";

/* ─── 카테고리 컬러 맵 ────────────────────────────────────────── */
const categoryColor: Record<string, string> = {
  XR:     "#b8d870",
  MOTION: "#e7b871",
  UI:     "#e99fa9",
  UX:     "#9898c8",
};

function categoryGradient(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `linear-gradient(to bottom, rgba(0,0,0,0.66) 20%, rgba(${r},${g},${b},0.66) 100%)`;
}

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
  { label: "XR",     color: "#b8d870" },
  { label: "MOTION", color: "#e7b871" },
  { label: "UI",     color: "#e99fa9" },
  { label: "UX",     color: "#9898c8" },
].map((t) => ({ ...t, count: works.filter((w) => w.category === t.label).length }));

/* ─── 작품 상세 모달 ──────────────────────────────────────────── */
function WorkModal({ work, onClose }: { work: Work; onClose: () => void }) {
  useEffect(() => {
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
  }, []);

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
          {(work.members ?? []).map((name, i) => (
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
        {/* 상세 이미지 */}
        {work.images && work.images.length > 0 && (
          <div style={{
            marginTop: "clamp(24px, 4.31vw, 62px)",
            width: "min(568px, calc(100% - clamp(32px, 11.11vw, 160px)))",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(8px, 1.11vw, 16px)",
            flexShrink: 0,
          }}>
            {work.images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${work.name || "작품"} ${i + 1}`}
                style={{ width: "100%", height: "auto", borderRadius: "clamp(8px, 1.11vw, 16px)", display: "block" }}
              />
            ))}
          </div>
        )}

        {/* 작품 설명 */}
        {work.description && (
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
            {work.description}
          </p>
        )}

        {/* 참고 링크 */}
        {work.url && (
          <a
            href={work.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#38b3d6",
              letterSpacing: "-0.28px",
              lineHeight: 1.5,
              textAlign: "center",
              marginTop: "clamp(12px, 2.22vw, 32px)",
              whiteSpace: "nowrap",
              textDecoration: "underline",
            }}
          >
            {work.url}
          </a>
        )}

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
              <a href="https://www.instagram.com/swu_nmd/" target="_blank" rel="noopener noreferrer" className="whitespace-nowrap" style={{ ...txt(12, 600, "white"), textDecoration: "none" }}>@swu_nmd</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

/* ─── 페이지 ──────────────────────────────────────────────────── */
function WorksContent() {
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState(() => {
    const cat = searchParams.get("category");
    return filterTabs.some((t) => t.label === cat) ? cat! : "XR";
  });

  useEffect(() => {
    const cat = searchParams.get("category");
    setActiveFilter(filterTabs.some((t) => t.label === cat) ? cat! : "XR");
  }, [searchParams]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [visibleIds, setVisibleIds] = useState<Set<number>>(new Set());
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const openWork = (work: Work) => {
    setSelectedWork(work);
    history.pushState({ workModal: work.id }, "");
  };
  const closeWork = () => { history.back(); };

  useEffect(() => {
    const onPopState = () => setSelectedWork(null);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const filtered = works.filter((w) => w.category === activeFilter);

  useEffect(() => {
    setVisibleIds(new Set());
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleIds((prev) => {
          const next = new Set(prev);
          entries.forEach((entry) => {
            const id = Number((entry.target as HTMLElement).dataset.workId);
            if (entry.isIntersecting) next.add(id);
            else next.delete(id);
          });
          return next;
        });
      },
      { threshold: 0.05 }
    );
    cardRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeFilter]);

  return (
    <div className="bg-white min-h-screen overflow-x-hidden flex flex-col" style={{ fontFamily: "Pretendard, sans-serif", marginTop: "calc(-1 * var(--nav-height, 0px))", paddingTop: "var(--nav-height, 0px)" }}>

      {/* ── 카테고리 필터 탭 ───────────────────────────── */}
      <div
        className="flex items-center"
        style={{
          padding: "clamp(12px, 2.78vw, 40px) clamp(16px, 5.56vw, 80px) 0",
          gap: "clamp(16px, 2.78vw, 40px)",
        }}
      >
        {filterTabs.map(({ label, count, color }) => {
          const isActive = activeFilter === label;
          return (
            <button
              key={label}
              onClick={() => setActiveFilter(label)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0 }}
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
      <div style={{ padding: "clamp(16px, 2.78vw, 40px) clamp(16px, 5.56vw, 80px) clamp(32px, 5.56vw, 80px)", flex: 1 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          gap: isMobile ? "16px" : "clamp(12px, 1.94vw, 28px)",
        }}>
          {filtered.map((work, idx) => {
            const isVisible = visibleIds.has(work.id);
            return (
            <div
              key={work.id}
              data-work-id={work.id}
              ref={(el) => {
                if (el) cardRefs.current.set(work.id, el);
                else cardRefs.current.delete(work.id);
              }}
              className="relative overflow-hidden"
              style={{
                backgroundColor: "#f3f3f3",
                borderRadius: "clamp(12px, 1.67vw, 24px)",
                aspectRatio: "408 / 229.527",
                cursor: "pointer",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(32px)",
                transition: `opacity 0.65s ease ${idx * 0.1}s, transform 0.65s ease ${idx * 0.1}s`,
              }}
              onClick={() => openWork(work)}
              onMouseEnter={() => setHoveredId(work.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* 썸네일 */}
              {work.thumbnail && (
                <img
                  src={work.thumbnail}
                  alt={work.name || ""}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
              {/* 호버 오버레이 */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background: categoryGradient(categoryColor[work.category]),
                  opacity: hoveredId === work.id ? 1 : 0,
                  transition: "opacity 0.4s ease",
                  pointerEvents: "none",
                }}
              >
                <p style={{ ...txt(18, 600, "white"), textAlign: "center" }}>
                  {work.name || "작품명"}
                </p>
              </div>
            </div>
            );
          })}
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
            <a href="https://www.instagram.com/swu_nmd/" target="_blank" rel="noopener noreferrer" className="whitespace-nowrap" style={{ ...txt(12, 600, "white"), textDecoration: "none" }}>@swu_nmd</a>
          </div>
        </div>
      </footer>

      {/* ── 작품 상세 모달 ──────────────────────────────── */}
      {selectedWork && (
        <WorkModal work={selectedWork} onClose={closeWork} />
      )}
    </div>
  );
}

export default function WorksPage() {
  return (
    <Suspense>
      <WorksContent />
    </Suspense>
  );
}
