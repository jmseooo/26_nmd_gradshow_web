import type { CSSProperties } from "react";
import CategorySlider from "./components/CategorySlider";
import ScrollReveal from "./components/ScrollReveal";
import HeroSection from "./components/HeroSection";
import HoverName from "./components/HoverName";

const committeeLeft = [
  { role: "위원장", name: "김지유" },
  { role: "부위원장", name: "김도연" },
];
const committeeMid = [
  { role: "기획홍보팀장", name: "김채현" },
  { role: "기획홍보팀원", name: "김도연" },
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
    <div className="bg-white w-full" style={{ fontFamily: "Pretendard, sans-serif" }}>

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
          style={{ minHeight: "clamp(280px, 25vw, 360px)", padding: "clamp(100px, 8vw, 120px) 16px" }}
        >
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <img alt="" src="/assets/img3.svg" className="w-full h-full object-cover" loading="lazy" />
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
          SECTION 4 · 졸업전시준비위원회
      ══════════════════════════════════════════════════════════ */}
      <ScrollReveal>
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(to bottom, rgba(230,245,249,0) 0%, #e6f5f9 100%)",
          padding: "clamp(100px, 8vw, 130px) clamp(16px, 5.56vw, 80px) clamp(100px, 8vw, 120px)",
        }}
      >
        {/* 인터뷰 버튼 — 섹션 우측 상단 absolute (피그마 330:416), 모바일 숨김 */}
        <div
          className="desktop-nav absolute"
          style={{ top: "clamp(32px, 4.93vw, 71px)", right: "clamp(16px, 5.56vw, 80px)" }}
        >
          <a
            href="https://www.instagram.com/p/DZCKb6BEpJ3/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center"
            style={{
              backgroundColor: "#a8e6f8",
              borderRadius: 18,
              padding: "10px 16px",
              textDecoration: "none",
            }}
          >
            <p className="whitespace-nowrap" style={txt(12, 600, "#007aa3")}>졸업전시준비위원회 인터뷰 보러가기</p>
          </a>
        </div>

        {/* 헤더 — 타이틀 가운데 */}
        <div className="flex justify-center" style={{ marginBottom: "clamp(24px, 3.68vw, 53px)" }}>
          <p className="whitespace-nowrap" style={txt(28, 800, "#2174a4")}>졸업전시준비위원회</p>
        </div>

        {/* 위원 목록 — 3그룹 가운데 정렬 */}
        <div className="flex justify-center items-start overflow-x-hidden" style={{ gap: "clamp(30px, 5.07vw, 73px)" }}>

          {/* 그룹 1: 위원장·부위원장 */}
          <div style={{ display: "grid", gridTemplateColumns: "max-content max-content", columnGap: "clamp(5px, 0.83vw, 12px)", rowGap: "clamp(6px, 0.83vw, 12px)", alignItems: "center" }}>
            <p className="whitespace-nowrap" style={txt(18, 800, "black")}>위원장</p>
            <p className="whitespace-nowrap" style={txt(18, 600, "black")}>김지유</p>
            <p className="whitespace-nowrap" style={txt(18, 800, "black")}>부위원장</p>
            <div className="flex items-baseline" style={{ gap: "clamp(3px, 0.49vw, 7px)" }}>
              <p className="whitespace-nowrap" style={txt(18, 600, "black")}>김도연</p>
              <p className="whitespace-nowrap" style={txt(12, 600, "black")}>23</p>
            </div>
          </div>

          {/* 그룹 2: 기획팀 */}
          <div className="flex flex-col items-start" style={{ gap: "clamp(6px, 0.83vw, 12px)" }}>
            <div className="flex items-center" style={{ gap: "clamp(5px, 0.83vw, 12px)" }}>
              <p className="whitespace-nowrap" style={txt(18, 800, "black")}>기획홍보팀장</p>
              <p className="whitespace-nowrap" style={txt(18, 600, "black")}>김채현</p>
            </div>
            <div className="flex items-center" style={{ gap: "clamp(5px, 0.83vw, 12px)" }}>
              <p className="whitespace-nowrap" style={txt(18, 800, "black")}>기획홍보팀원</p>
              <div className="flex items-baseline" style={{ gap: "clamp(3px, 0.49vw, 7px)" }}>
                <p className="whitespace-nowrap" style={txt(18, 600, "black")}>김도연</p>
                <p className="whitespace-nowrap" style={txt(12, 600, "black")}>22</p>
              </div>
            </div>
          </div>

          {/* 그룹 3: 디자인팀 */}
          <div style={{ display: "grid", gridTemplateColumns: "max-content max-content", columnGap: "clamp(5px, 0.83vw, 12px)", rowGap: "clamp(6px, 0.83vw, 12px)", alignItems: "center" }}>
            <p className="whitespace-nowrap" style={txt(18, 800, "black")}>디자인팀장</p>
            <HoverName name="김지아" hoverText="굿즈 제작" style={txt(18, 600, "black")} />
            <p className="whitespace-nowrap" style={txt(18, 800, "black")}>디자인팀원</p>
            <HoverName name="서한이" hoverText="출력물 제작" style={txt(18, 600, "black")} />
            <span />
            <HoverName name="윤내경" hoverText="브랜딩" style={txt(18, 600, "black")} />
            <span />
            <HoverName name="진민서" hoverText="웹 디자인, 웹 개발" style={txt(18, 600, "black")} />
          </div>

        </div>
      </section>
      </ScrollReveal>

      {/* ══════════════════════════════════════════════════════════
          SECTION 5 · 협찬
      ══════════════════════════════════════════════════════════ */}
      <ScrollReveal>
      <section style={{ padding: "clamp(100px, 8vw, 130px) clamp(16px, 5.56vw, 80px)" }}>
        <p
          className="text-center whitespace-nowrap"
          style={{ ...txt(28, 800, "#2174a4"), marginBottom: "clamp(24px, 2.78vw, 40px)" }}
        >
          협찬/제휴
        </p>
        <div className="flex items-center justify-center" style={{ gap: "clamp(4px, 2.08vw, 30px)" }}>
          <a href="https://yoondesign.com/" target="_blank" rel="noopener noreferrer" className="flex-shrink-0" style={{ width: "clamp(28px, 11.67vw, 168px)", height: "clamp(10px, 4.51vw, 65px)" }}>
            <img alt="Yoondesign group" src="/assets/sponsor2.png" className="w-full h-full object-contain" loading="lazy" />
          </a>
          <a href="https://www.sandollcloud.com/" target="_blank" rel="noopener noreferrer" className="flex-shrink-0" style={{ width: "clamp(20px, 8.33vw, 120px)", height: "clamp(14px, 6.67vw, 96px)" }}>
            <img alt="산돌구름" src="/assets/sandol-logo.png" className="w-full h-full object-contain" loading="lazy" />
          </a>
          <a href="https://pf.kakao.com/_Xfcin" target="_blank" rel="noopener noreferrer" className="flex-shrink-0" style={{
              backgroundColor: "#f7f7f7",
              width: "clamp(22px, 9.17vw, 132px)",
              height: "clamp(12px, 5.9vw, 85px)",
            }}
          />
          <a href="https://www.printaku.com/" target="_blank" rel="noopener noreferrer" className="flex-shrink-0" style={{ width: "clamp(22px, 9.17vw, 132px)", height: "clamp(12px, 5.9vw, 85px)" }}>
            <img alt="PRINTAKU" src="/assets/printaku.svg" className="w-full h-full object-contain" loading="lazy" />
          </a>
          <a href="https://www.inclear.co.kr/" target="_blank" rel="noopener noreferrer" className="flex-shrink-0" style={{ width: "clamp(22px, 9.17vw, 132px)", height: "clamp(12px, 5.9vw, 85px)" }}>
            <img alt="novelS" src="/assets/novels-logo.png" className="w-full h-full object-contain" loading="lazy" />
          </a>
          <a href="https://runwalk.kr/" target="_blank" rel="noopener noreferrer" className="flex-shrink-0" style={{ width: "clamp(22px, 9.17vw, 132px)", height: "clamp(12px, 5.9vw, 85px)" }}>
            <img alt="RUNWALK" src="/assets/runwalk-logo.png" className="w-full h-full object-contain" loading="lazy" />
          </a>
          {[0].map((i) => (
            <div
              key={i}
              className="flex-shrink-0"
              style={{
                backgroundColor: "#f7f7f7",
                width: "clamp(22px, 9.17vw, 132px)",
                height: "clamp(12px, 5.9vw, 85px)",
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
            <a href="https://www.instagram.com/swu_nmd/" target="_blank" rel="noopener noreferrer" className="whitespace-nowrap" style={{ ...txt(12, 600, "white"), textDecoration: "none" }}>@swu_nmd</a>
          </div>
        </div>
      </footer>
      </ScrollReveal>

    </div>
  );
}
