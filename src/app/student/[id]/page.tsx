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

export default async function StudentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  void id; // 추후 실제 데이터 조회에 사용

  return (
    <div
      className="bg-white min-h-screen overflow-x-hidden relative"
      style={{ fontFamily: "Pretendard, sans-serif" }}
    >
      {/* ── 배경 ──────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
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
      <div className="relative" style={{ zIndex: 2 }}>

        {/* ── 본문: 좌측 카드 + 우측 작품 카드 ────────────── */}
        <div
          className="flex items-start"
          style={{
            padding: "0 clamp(16px, 5.56vw, 80px)",
            marginTop: "clamp(12px, 1.6vw, 23px)",
            gap: "clamp(40px, 11.74vw, 169px)",
          }}
        >
          {/* ── 좌: 포트레이트 카드 + 연락처 ──────────────── */}
          <div style={{ flexShrink: 0, width: "clamp(120px, 16.67vw, 240px)" }}>

            {/* 포트레이트 카드 (4:3 landscape → -90° 회전 = portrait) */}
            <div
              style={{
                width: "100%",
                aspectRatio: "3 / 4",
                backgroundColor: "#e6f5f9",
                borderRadius: "clamp(8px, 1.11vw, 16px)",
                overflow: "hidden",
              }}
            />

            {/* 연락처 블록 */}
            <div
              style={{
                marginTop: "clamp(6px, 0.69vw, 10px)",
                display: "flex",
                flexDirection: "column",
                gap: "clamp(1px, 0.14vw, 2px)",
              }}
            >
              {/* 학생명 */}
              <div className="flex items-center" style={{ gap: "clamp(6px, 0.69vw, 10px)" }}>
                <p style={{ ...txt(18, 400, "black", -0.02), whiteSpace: "nowrap" }}>학생명</p>
                <p style={{ ...txt(18, 600, "black", -0.02), whiteSpace: "nowrap" }}>김00</p>
              </div>
              {/* email */}
              <div className="flex items-center" style={{ gap: "clamp(6px, 0.83vw, 12px)" }}>
                <p style={{ ...txt(18, 400, "black", -0.02), whiteSpace: "nowrap", width: "clamp(24px, 3.19vw, 46px)" }}>email</p>
                <p style={{ ...txt(18, 600, "black", -0.02), whiteSpace: "nowrap" }}>asdf@naver.com</p>
              </div>
              {/* sns */}
              <div className="flex items-center" style={{ gap: "clamp(6px, 0.83vw, 12px)" }}>
                <p style={{ ...txt(18, 400, "black", -0.02), whiteSpace: "nowrap", width: "clamp(24px, 3.19vw, 46px)" }}>sns</p>
                <p style={{ ...txt(18, 600, "black", -0.02), whiteSpace: "nowrap" }}>@asdf</p>
              </div>
            </div>
          </div>

          {/* ── 우: 작품 카드 2개 ─────────────────────────── */}
          <div
            style={{
              flex: 1,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(6px, 0.83vw, 12px)",
            }}
          >
            {/* 작품 카드 1 */}
            <div
              style={{
                width: "100%",
                aspectRatio: "408 / 230",
                backgroundColor: "#fcfaf4",
                borderRadius: "clamp(8px, 1.11vw, 16px)",
                overflow: "hidden",
              }}
            />
            {/* 작품 카드 2 */}
            <div
              style={{
                width: "100%",
                aspectRatio: "408 / 230",
                backgroundColor: "#fcfaf4",
                borderRadius: "clamp(8px, 1.11vw, 16px)",
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
