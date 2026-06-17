import type { CSSProperties } from "react";
import ScrollToTop from "./components/ScrollToTop";
import CategorySlider from "./components/CategorySlider";
import ScrollReveal from "./components/ScrollReveal";
import HeroSection from "./components/HeroSection";

const committeeLeft = [
  { role: "위원장", name: "김지유" },
  { role: "부위원장", name: "김도연" },
];
const committeeMid = [
  { role: "기획팀장", name: "김채현" },
  { role: "기획팀원", name: "김도연" },
];
const committeeRight = [
  { role: "디자인팀장", name: "김지아" },
  { role: "디자인팀원", name: "서한이" },
  { role: "", name: "윤내경" },
  { role: "", name: "진민서" },
];

/* ─── 공통 텍스트 스타일 헬퍼 ────────────────────────────────────── */
/* size: 1440px 기준 데스크탑 px값 → clamp()로 자동 스케일 */
function txt(
  size: number,
  weight: number,
  color: string,
  tracking = -0.02
): CSSProperties {
  const min = Math.max(10, Math.round(size * 0.45));
  return {
    fontSize: `clamp(${min}px, ${((size / 1440) * 100).toFixed(3)}vw, ${size}px)`,
    fontWeight: weight,
    color,
    letterSpacing: `${tracking * size}px`,
    lineHeight: 1.5,
  };
}

/* ─── 페이지 ─────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <div className="bg-white overflow-x-hidden" style={{ fontFamily: "Pretendard, sans-serif" }}>

      {/* ══════════════════════════════════════════════════════════
          SECTION 1 · 히어로
      ══════════════════════════════════════════════════════════ */}
      <HeroSection />

      {/* ══════════════════════════════════════════════════════════
          SECTION 2 · 텍스트 섹션
      ══════════════════════════════════════════════════════════ */}
      <ScrollReveal>
        <section
          className="relative overflow-hidden bg-white flex items-center justify-center"
          style={{ minHeight: "clamp(180px, 25vw, 360px)", padding: "clamp(32px, 4vw, 60px) 16px" }}
        >
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <img alt="" src="/assets/img3.svg" className="w-full h-full object-cover" />
          </div>
          <div className="relative text-center">
            <p style={txt(18, 400, "#2174a4")}>
              각자의 방향으로 흘러가던 우리는 수많은 고민과 흔들림 끝에 이곳에 잠시 모였습니다.
            </p>
            <p style={txt(18, 400, "#2174a4")}>
              이곳은 완벽한 도착지가 아니라, 다음 흐름을 준비하는{" "}
              <span style={{ fontWeight: 600 }}>우리의 거점</span>입니다.
            </p>
            <p style={{ ...txt(18, 400, "#2174a4"), marginTop: "clamp(16px, 1.88vw, 27px)" }}>
              그리고 지금, 우리는 그 출발점에 서 있습니다.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ══════════════════════════════════════════════════════════
          SECTION 3 · 카테고리 슬라이더
      ══════════════════════════════════════════════════════════ */}
      <ScrollReveal>
        <CategorySlider />
      </ScrollReveal>

      {/* ══════════════════════════════════════════════════════════
          SECTION 4 · 졸업전시위원회
      ══════════════════════════════════════════════════════════ */}
      <ScrollReveal>
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(to bottom, rgba(230,245,249,0.18) 0%, #e6f5f9 100%)",
          padding: "clamp(32px, 4.93vw, 71px) clamp(16px, 5.56vw, 80px) clamp(32px, 4.44vw, 64px)",
        }}
      >
        {/* 헤더 행 — 타이틀 가운데, 뱃지 오른쪽 */}
        <div className="flex items-start" style={{ marginBottom: "clamp(24px, 3.68vw, 53px)" }}>
          <div style={{ flex: 1 }} />
          <p className="whitespace-nowrap" style={txt(28, 800, "#2174a4")}>졸업전시위원회</p>
          <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <div
              className="flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#a8e6f8", borderRadius: 18, padding: "clamp(4px, 0.42vw, 6px) clamp(8px, 0.69vw, 10px)" }}
            >
              <p className="whitespace-nowrap" style={txt(12, 600, "#007aa3")}>졸업전시위원회 인터뷰 보러가기</p>
            </div>
          </div>
        </div>

        {/* 위원 목록 — 3그룹 가운데 정렬 */}
        <div className="flex justify-center" style={{ gap: "clamp(40px, 6.25vw, 90px)" }}>
          {/* 위원장·부위원장 — 역할명 우측 정렬 grid */}
          <div style={{ display: "grid", gridTemplateColumns: "max-content max-content", columnGap: "clamp(4px, 0.83vw, 12px)", rowGap: "clamp(10px, 1.46vw, 21px)", alignContent: "start" }}>
            <p className="whitespace-nowrap text-right" style={txt(18, 800, "black")}>위원장</p>
            <p className="whitespace-nowrap" style={txt(18, 600, "black")}>김지유</p>
            <p className="whitespace-nowrap text-right" style={txt(18, 800, "black")}>부위원장</p>
            <p className="whitespace-nowrap" style={txt(18, 600, "black")}>
              김도연<span style={{ fontSize: "12px", fontWeight: 600, verticalAlign: "baseline" }}>23</span>
            </p>
          </div>

          {/* 기획팀 — 좌측 정렬 */}
          <div className="flex flex-col items-start" style={{ gap: "clamp(10px, 1.46vw, 21px)" }}>
            <div className="flex items-center" style={{ gap: "clamp(4px, 0.83vw, 12px)" }}>
              <p className="whitespace-nowrap" style={txt(18, 800, "black")}>기획팀장</p>
              <p className="whitespace-nowrap" style={txt(18, 600, "black")}>김채현</p>
            </div>
            <div className="flex items-baseline" style={{ gap: "clamp(4px, 0.83vw, 12px)" }}>
              <p className="whitespace-nowrap" style={txt(18, 800, "black")}>기획팀원</p>
              <p className="whitespace-nowrap" style={txt(18, 600, "black")}>김도연</p>
              <p className="whitespace-nowrap" style={txt(12, 600, "black")}>22</p>
            </div>
          </div>

          {/* 디자인팀 — 2열 grid로 이름 열 좌측 정렬 */}
          <div style={{ display: "grid", gridTemplateColumns: "max-content max-content", columnGap: "clamp(4px, 0.83vw, 12px)", rowGap: "clamp(10px, 1.46vw, 21px)", alignContent: "start" }}>
            <p className="whitespace-nowrap" style={txt(18, 800, "black")}>디자인팀장</p>
            <p className="whitespace-nowrap" style={txt(18, 600, "black")}>김지아</p>
            <p className="whitespace-nowrap" style={txt(18, 800, "black")}>디자인팀원</p>
            <p className="whitespace-nowrap" style={txt(18, 600, "black")}>서한이</p>
            <span />
            <p className="whitespace-nowrap" style={txt(18, 600, "black")}>윤내경</p>
            <span />
            <p className="whitespace-nowrap" style={txt(18, 600, "black")}>진민서</p>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* ══════════════════════════════════════════════════════════
          SECTION 5 · 협찬
      ══════════════════════════════════════════════════════════ */}
      <ScrollReveal>
      <section style={{ padding: "clamp(32px, 4.93vw, 71px) clamp(16px, 5.56vw, 80px)" }}>
        <p
          className="text-center whitespace-nowrap"
          style={{ ...txt(28, 800, "#2174a4"), marginBottom: "clamp(24px, 2.78vw, 40px)" }}
        >
          협찬
        </p>
        <div className="flex flex-wrap items-center justify-center" style={{ gap: "clamp(12px, 2.08vw, 30px)" }}>
          <div className="overflow-hidden relative"
            style={{ width: "clamp(80px, 8.33vw, 120px)", height: "clamp(55px, 6.67vw, 96px)" }}>
            <img alt="산돌구름" src="/assets/sponsor1.png"
              className="absolute max-w-none"
              style={{ height: "409.79%", left: "-92.22%", top: "-169.04%", width: "268.33%" }} />
          </div>
          <div style={{ width: "clamp(110px, 11.67vw, 168px)", height: "clamp(40px, 4.51vw, 65px)" }}>
            <img alt="Yoondesign group" src="/assets/sponsor2.png" className="w-full h-full object-contain" />
          </div>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#f7f7f7",
                width: "clamp(80px, 9.17vw, 132px)",
                height: "clamp(50px, 5.9vw, 85px)",
              }}
            />
          ))}
        </div>
      </section>
      </ScrollReveal>

      {/* ══════════════════════════════════════════════════════════
          SECTION 6 · 푸터
      ══════════════════════════════════════════════════════════ */}
      <ScrollReveal>
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
            <p className="whitespace-nowrap" style={txt(12, 600, "white")}>behance</p>
          </div>
        </div>
      </footer>
      </ScrollReveal>

      <ScrollToTop />
    </div>
  );
}
