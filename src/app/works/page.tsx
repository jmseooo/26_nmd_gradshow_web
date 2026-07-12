"use client";

import { useState, useEffect, useRef, Suspense, useCallback } from "react";
import type { CSSProperties } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { works, type Work } from "@/lib/works-data";
import { designers } from "@/lib/designers";

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
  const router = useRouter();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const goToDesigner = (designerId: number) => {
    router.push(`/student/${designerId}`);
  };

  return (
    <div
      style={{
        position: "relative",
        zIndex: 101,
        backgroundColor: "white",
        minHeight: "100vh",
        marginTop: "calc(-1 * var(--nav-height, 0px))",
        fontFamily: "Pretendard, sans-serif",
        display: "flex",
        flexDirection: "column",
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
          zIndex: 102,
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
          paddingBottom: "clamp(40px, 5.56vw, 80px)",
          flex: 1,
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
          marginTop: "10px",
        }}>
          {(work.members ?? []).map((name, i) => {
            const designer = designers.find((d) => d.name === name);
            const displayName = name.replace(/ \d{2}$/, "");
            return designer ? (
              <button
                key={i}
                onClick={() => goToDesigner(designer.id)}
                style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: "6px 2px" }}
              >
                <p style={{ fontSize: "clamp(12px, 1.11vw, 16px)", fontWeight: 500, color: "black", letterSpacing: "-0.32px", lineHeight: 1.5, whiteSpace: "nowrap" }}>
                  {displayName}
                </p>
              </button>
            ) : (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "6px 2px" }}>
                <p style={{ fontSize: "clamp(12px, 1.11vw, 16px)", fontWeight: 500, color: "black", letterSpacing: "-0.32px", lineHeight: 1.5, whiteSpace: "nowrap" }}>
                  {displayName}
                </p>
              </div>
            );
          })}
        </div>

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
            marginTop: "33px",
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

        {/* 상세 이미지 */}
        {(work.thumbnail || (work.images && work.images.length > 0)) && (
          <div style={{
            marginTop: "clamp(24px, 4.31vw, 62px)",
            width: "min(810px, calc(100% - clamp(32px, 11.11vw, 160px)))",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(8px, 1.11vw, 16px)",
            flexShrink: 0,
          }}>
            {[
              ...(work.thumbnail && work.thumbnail !== "/assets/card_web.png" ? [work.thumbnail] : []),
              ...(work.images ?? []),
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${work.name || "작품"} ${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
                style={{ width: "100%", height: "auto", borderRadius: "clamp(8px, 1.11vw, 16px)", display: "block" }}
              />
            ))}
          </div>
        )}

      </div>

      {/* 푸터 */}
      <footer
        className="flex items-center w-full"
        style={{
          backgroundColor: "#34b2d5",
          height: "clamp(72px, 8.13vw, 117px)",
          padding: "0 clamp(16px, 5.56vw, 80px)",
          marginTop: "auto",
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
  );
}

/* ─── 페이지 ──────────────────────────────────────────────────── */
function WorksContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [activeFilter, setActiveFilter] = useState(() => {
    const idParam = searchParams.get("id");
    if (idParam) {
      const w = works.find((w) => w.id === Number(idParam));
      if (w) return w.category;
    }
    const cat = searchParams.get("category");
    return filterTabs.some((t) => t.label === cat) ? cat! : "XR";
  });

  const [selectedWork, setSelectedWork] = useState<Work | null>(() => {
    const idParam = searchParams.get("id");
    return idParam ? (works.find((w) => w.id === Number(idParam)) ?? null) : null;
  });

  // URL 변화(back/forward 포함)로 모달 상태 동기화
  // pathname 가드: /works를 벗어나는 순간 effect 무시 (모달 flash 방지)
  useEffect(() => {
    if (pathname !== "/works") return;
    const idParam = searchParams.get("id");
    if (idParam) {
      const w = works.find((w) => w.id === Number(idParam));
      if (w) { setSelectedWork(w); setActiveFilter(w.category); }
    } else {
      setSelectedWork(null);
      const cat = searchParams.get("category");
      if (cat && filterTabs.some((t) => t.label === cat)) setActiveFilter(cat);
    }
  }, [searchParams, pathname]);

  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const [visibleIds, setVisibleIds] = useState<Set<number>>(new Set());
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const savedScrollY = useRef(0);

  const openWork = useCallback((work: Work) => {
    savedScrollY.current = window.scrollY;
    setSelectedWork(work);
    router.push(`/works?id=${work.id}&category=${activeFilter}`, { scroll: false });
  }, [router, activeFilter]);

  const closeWork = useCallback(() => {
    const scroll = savedScrollY.current;
    setSelectedWork(null);
    router.replace(`/works?category=${activeFilter}`, { scroll: false });
    requestAnimationFrame(() => window.scrollTo(0, scroll));
  }, [router, activeFilter]);

  const [filtered, setFiltered] = useState(() =>
    works.filter((w) => w.category === "XR")
  );

  useEffect(() => {
    const arr = works.filter((w) => w.category === activeFilter);
    setFiltered([...arr].sort(() => Math.random() - 0.5));
  }, [activeFilter]);

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
  }, [filtered]);

  return (
    <div className="bg-white min-h-screen overflow-x-hidden flex flex-col" style={{ fontFamily: "Pretendard, sans-serif", marginTop: "calc(-1 * var(--nav-height, 0px))", paddingTop: "var(--nav-height, 0px)" }}>

      <div style={{ display: selectedWork ? "none" : "contents" }}>
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
              className="relative overflow-hidden sk-img"
              style={{
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
              <Image
                src={work.thumbnail ?? "/assets/card_web.png"}
                alt={work.name || ""}
                fill
                sizes="(max-width: 767px) calc(100vw - 32px), calc((100vw - 160px) / 3)"
                style={{ objectFit: "cover" }}
                onLoad={() => cardRefs.current.get(work.id)?.classList.remove("sk-img")}
              />
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

      </div>{/* end main content */}

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
