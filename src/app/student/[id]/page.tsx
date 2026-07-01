import type { CSSProperties } from "react";
import { designers } from "@/lib/designers";
import { notFound } from "next/navigation";

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

  return (
    <div
      className="bg-white min-h-screen overflow-x-hidden relative flex flex-col"
      style={{
        fontFamily: "Pretendard, sans-serif",
        marginTop: "calc(-1 * var(--nav-height, 0px))",
        paddingTop: "var(--nav-height, 0px)",
      }}
    >
      {/* ── 배경 ──────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0, opacity: 0.4 }}>
        <div className="absolute w-full" style={{ top: "-278.92px", height: "1444.826px" }}>
          <img alt="" src="/assets/hero-bg1.svg" className="absolute inset-0 w-full h-full object-cover" />
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

      {/* ── 컨텐츠 ────────────────────────────────────────── */}
      <div className="relative flex flex-col flex-1" style={{ zIndex: 2 }}>

        {/* ── 본문 ──────────────────────────────────────────── */}
        <div
          className="flex flex-col flex-1"
          style={{
            padding: "0 clamp(16px, 5.56vw, 80px)",
            marginTop: "clamp(12px, 1.6vw, 23px)",
            gap: "clamp(16px, 2.5vw, 36px)",
          }}
        >
          {/* ── 상단: 포트레이트 + 이름/연락처 ────────────── */}
          <div
            className="flex flex-col md:flex-row md:items-start"
            style={{
              maxWidth: "clamp(280px, 47.5vw, 684px)",
              marginLeft: "auto",
              marginRight: "auto",
              width: "100%",
            }}
          >
            {/* 포트레이트 카드 */}
            <div
              className="mx-auto md:mx-0 md:shrink-0"
              style={{ width: "clamp(120px, 16.67vw, 240px)" }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "3 / 4",
                  backgroundColor: "#e6f5f9",
                  borderRadius: "clamp(8px, 1.67vw, 24px)",
                  overflow: "hidden",
                }}
              >
                <img
                  src={`/assets/students/${designer.photo}`}
                  alt={designer.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>

            {/* 이름 + 연락처 */}
            <div
              className="mt-4 md:mt-0 md:pl-3 md:pt-[clamp(0px,11.11vw,160px)]"
              style={{ flex: 1 }}
            >
              <p
                style={{
                  fontSize: "clamp(24px, 4.17vw, 60px)",
                  fontWeight: 600,
                  color: "black",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.5,
                }}
              >
                {designer.name}
              </p>
              <div
                style={{
                  marginTop: "clamp(2px, 0.35vw, 5px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(1px, 0.14vw, 2px)",
                }}
              >
                <p style={{ ...txt(18, 600, "black"), whiteSpace: "nowrap" }}>asdf@naver.com</p>
                <p style={{ ...txt(18, 600, "black"), whiteSpace: "nowrap" }}>@asdf</p>
              </div>
            </div>
          </div>

          {/* ── 작품 카드 2개 (세로 쌓기) ────────────────────── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(16px, 2.5vw, 36px)",
              maxWidth: "clamp(280px, 47.5vw, 684px)",
              marginLeft: "auto",
              marginRight: "auto",
              width: "100%",
            }}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: "684 / 385",
                backgroundColor: "#f3f3f3",
                borderRadius: "clamp(10px, 1.67vw, 24px)",
                overflow: "hidden",
              }}
            />
            <div
              style={{
                width: "100%",
                aspectRatio: "684 / 385",
                backgroundColor: "#f3f3f3",
                borderRadius: "clamp(10px, 1.67vw, 24px)",
                overflow: "hidden",
              }}
            />
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

    </div>
  );
}
