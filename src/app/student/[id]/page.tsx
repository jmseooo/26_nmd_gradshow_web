import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { designers } from "@/lib/designers";
import { works } from "@/lib/works-data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return designers.map((d) => ({ id: String(d.id) }));
}

function linkLabel(url: string): string {
  try {
    const { hostname, pathname } = new URL(url);
    if (hostname.includes("instagram.com")) {
      const handle = pathname.replace(/\//g, "").trim();
      return handle ? `@${handle}` : "Instagram";
    }
    if (hostname.includes("behance.net")) return "Behance";
    if (hostname.includes("notefolio.net")) return "Notefolio";
    if (hostname.includes("linkedin.com")) return "LinkedIn";
    return hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

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

export default async function StudentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const designer = designers.find((d) => d.id === Number(id));
  if (!designer) notFound();

  const designerWorks = works.filter((w) => w.members.includes(designer.name));

  return (
    <div
      className="bg-white min-h-screen overflow-x-hidden relative flex flex-col"
      style={{
        fontFamily: "Pretendard, sans-serif",
        marginTop: "calc(-1 * var(--nav-height, 0px))",
        paddingTop: "var(--nav-height, 0px)",
        overflowY: "clip",
      }}
    >
      {/* ── 배경 ──────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0, opacity: 0.4 }}>
        <div className="absolute w-full" style={{ top: "-278.92px", height: "1444.826px" }}>
          <img alt="" src="/assets/hero-bg1.svg" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        </div>
      </div>

      {/* ── 배너 (배경 장식) ──────────────────────────────── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "clamp(200px, 39.38vw, 567px)",
          left: 0,
          width: "100%",
          height: "clamp(100px, 21.6vw, 311px)",
          zIndex: 1,
        }}
      >
        <img alt="" src="/assets/student-banner.svg" className="w-full h-full object-cover" />
      </div>

      {/* ── 우하단 장식 ───────────────────────────────────── */}
      <div
        className="absolute pointer-events-none"
        style={{ top: "67.36%", left: "44.79%", right: "-3.26%", bottom: "-10.76%", zIndex: 1 }}
      >
        <img alt="" src="/assets/student-deco.svg" className="w-full h-full object-contain" />
      </div>

      {/* ── 컨텐츠 (flex-1 → 푸터를 아래로 밀어냄) ─────── */}
      <style>{`
        .student-layout {
          position: relative;
          flex: 1;
          z-index: 2;
          padding: clamp(40px, 5.56vw, 80px) clamp(16px, 5.56vw, 80px) clamp(40px, 5.56vw, 80px);
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: center;
          gap: clamp(24px, 4.17vw, 60px);
          transition: gap 0.4s ease;
        }
        .student-left {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 1.39vw, 20px);
          width: clamp(140px, 17.36vw, 250px);
        }
        .student-left-photo { width: 100%; }
        .student-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2.5vw, 36px);
          max-width: clamp(380px, 52vw, 720px);
          transition: gap 0.4s ease, max-width 0.4s ease;
        }
        @media (max-width: 767px) {
          .student-layout { flex-direction: column; }
          .student-left {
            flex-direction: row;
            align-items: flex-end;
            width: 100%;
            max-width: 684px;
            margin-left: auto;
            margin-right: auto;
          }
          .student-left-photo {
            width: clamp(120px, 35%, 240px);
            flex-shrink: 0;
          }
          .student-left-info {
            flex: 1;
            padding-left: clamp(12px, 2.78vw, 40px);
          }
          .student-right {
            flex: none;
            width: 100%;
            max-width: 684px;
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}</style>
      <div className="student-layout">
        {/* ── 좌: 포트레이트 + 이름/연락처 ──────────────── */}
        <div className="student-left">
          <div className="student-left-photo">
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "3 / 4",
                backgroundColor: "#e6f5f9",
                borderRadius: "clamp(8px, 1.67vw, 24px)",
                overflow: "hidden",
              }}
            >
              <Image
                src={`/assets/students/${designer.photo}`}
                alt={designer.name}
                fill
                sizes="(max-width: 767px) 35vw, 17vw"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </div>

          {/* 이름 + 연락처 */}
          <div className="student-left-info">
            <p
              style={{
                fontSize: "clamp(22px, 2.5vw, 36px)",
                fontWeight: 700,
                color: "black",
                letterSpacing: "-0.02em",
                lineHeight: 1.5,
              }}
            >
              {designer.name}
            </p>
            {(designer.email || designer.link) && (
              <div
                style={{
                  marginTop: "clamp(2px, 0.28vw, 4px)",
                  paddingLeft: "clamp(2px, 0.28vw, 4px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(1px, 0.14vw, 2px)",
                }}
              >
                {designer.email && (
                  <a
                    href={`mailto:${designer.email}`}
                    style={{ fontSize: "clamp(12px, 1.1vw, 16px)", fontWeight: 400, color: "black", letterSpacing: "-0.02em", lineHeight: 1.5, textDecoration: "none" }}
                  >
                    {designer.email}
                  </a>
                )}
                {designer.link && (
                  <a
                    href={designer.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "clamp(12px, 1.1vw, 16px)", fontWeight: 400, color: "black", letterSpacing: "-0.02em", lineHeight: 1.5, textDecoration: "none", wordBreak: "break-all" }}
                  >
                    {linkLabel(designer.link)}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── 우: 작품 카드 (세로 쌓기) ──────────────────── */}
        <div className="student-right">
          {designerWorks.length === 0 ? (
            <div
              style={{
                width: "100%",
                aspectRatio: "684 / 385",
                backgroundColor: "#f3f3f3",
                borderRadius: "clamp(10px, 1.67vw, 24px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p style={{ color: "#aaa", fontSize: "clamp(13px, 1.1vw, 16px)", fontWeight: 500 }}>
                작품 정보 준비 중
              </p>
            </div>
          ) : (
            designerWorks.map((work) => (
              <div key={work.id}>
                <Link href={`/works?id=${work.id}`} style={{ display: "block", textDecoration: "none" }}>
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "684 / 385",
                      backgroundColor: "#f3f3f3",
                      borderRadius: "clamp(10px, 1.67vw, 24px)",
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                  >
                    {work.thumbnail && (
                      <img
                        src={work.thumbnail}
                        alt={work.name}
                        loading="lazy"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    )}
                  </div>
                </Link>
                <div style={{ marginTop: "clamp(8px, 0.83vw, 12px)", display: "flex", alignItems: "center", gap: "clamp(8px, 0.83vw, 12px)" }}>
                  <span
                    style={{
                      fontSize: "clamp(10px, 0.83vw, 12px)",
                      fontWeight: 600,
                      color: "#34b2d5",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      backgroundColor: "#e8f7fb",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      flexShrink: 0,
                    }}
                  >
                    {work.category}
                  </span>
                  <p
                    style={{
                      fontSize: "clamp(14px, 1.25vw, 18px)",
                      fontWeight: 600,
                      color: "black",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.4,
                    }}
                  >
                    {work.name}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── 푸터 (outer flex-col의 직접 자식 → 항상 맨 아래) ── */}
      <footer
        className="flex items-center"
        style={{
          position: "relative",
          zIndex: 2,
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
            <a href="https://www.instagram.com/swu_nmd/" target="_blank" rel="noopener noreferrer" className="whitespace-nowrap" style={{ ...txt(12, 600, "white"), textDecoration: "none" }}>@swu_nmd</a>
            <p className="whitespace-nowrap" style={txt(12, 600, "white")}>behance</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
