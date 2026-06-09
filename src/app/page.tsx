import type { CSSProperties } from "react";
import ScrollToTop from "./components/ScrollToTop";

/* ─── 정적 데이터 ─────────────────────────────────────────────────── */

const chatBubbles = [
  { text: "여름 졸전 멋있다",          w: "61.5%" },
  { text: "교수님...",                  w: "37.9%" },
  { text: "여름 졸전 멋있다",          w: "61.5%" },
  { text: "교수님...",                  w: "37.9%" },
  { text: "졸준위 고생했어요 사랑해!!!", w: "93.8%" },
  { text: "첨단미디어디자인 가고 싶어요", w: "100%" },
  { text: "전시 잘 봤어요. 멋져요",     w: "77.6%" },
];

const navLinks = ["거점", "작품", "디자이너", "방명록", "현장"];

const trackDots = ["#e99fa9", "#e7b871", "#b8d870", "#9898c8"];

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
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "#0a99d1", height: "min(100vh, clamp(420px, 65vw, 936px))" }}
      >
        {/* 배경 클리핑 컨테이너 (레이어 1 + 네트워크 그래프) */}
        <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: "#0fa7d2" }}>
          <img alt="" src="/assets/hero-bg1.svg"
            className="absolute pointer-events-none select-none"
            style={{ width: "100%", height: "clamp(650px, 100.335vw, 1444.826px)", left: 0, top: "clamp(-278.92px, -19.369vw, 0px)" }} />
          <img alt="" src="/assets/hero-vector.svg"
            className="absolute pointer-events-none select-none"
            style={{ inset: "65.06% 20.76% -16.35% 20.76%" }} />
          <img alt="" src="/assets/hero-network.svg"
            className="absolute pointer-events-none select-none"
            style={{ left: "20.76%", top: "clamp(60px, 9.236vw, 133px)", width: "58.52%", height: "clamp(325px, 50.208vw, 723px)" }} />
        </div>

        {/* 레이어 3 - 오버레이 */}
        <img alt="" src="/assets/hero-bg3.svg"
          className="absolute pointer-events-none select-none"
          style={{ width: "100%", height: "clamp(650px, 100.335vw, 1444.826px)", left: 0, top: "clamp(-278.92px, -19.369vw, 0px)" }} />

        {/* Vector 장식 */}
        <img alt="" src="/assets/hero-vector.svg"
          className="absolute pointer-events-none select-none"
          style={{ inset: "65.06% 20.76% -16.35% 20.76%" }} />

        {/* 말풍선 */}
        <div
          className="absolute flex flex-col items-end"
          style={{ gap: "clamp(5px, 0.694vw, 10px)", left: "83.264%", top: "clamp(216px, 33.333vw, 480px)", width: "11.181%" }}
        >
          {chatBubbles.map(({ text, w }, i) => (
            <div
              key={i}
              className="flex items-center justify-center"
              style={{
                backdropFilter: "blur(2px)",
                backgroundColor: "rgba(255,255,255,0.8)",
                borderRadius: 100,
                boxShadow: "0px 0px 10px 0px rgba(0,184,238,0.24)",
                height: "clamp(17px, 2.639vw, 38px)",
                padding: "0 clamp(5px, 0.694vw, 10px)",
                whiteSpace: "nowrap",
                width: w,
              }}
            >
              <p style={txt(12, 600, "#202024", 0)}>{text}</p>
            </div>
          ))}
        </div>

        {/* 방명록 입력창 */}
        <div
          className="absolute flex items-center rounded-full"
          style={{
            backgroundColor: "white",
            left: "68.958%",
            top: "clamp(370px, 57.083vw, 822px)",
            width: "25.486%",
            height: "clamp(24px, 3.681vw, 53px)",
            padding: "0 clamp(6px, 0.972vw, 14px) 0 clamp(9px, 1.389vw, 20px)",
          }}
        >
          <p className="flex-1 whitespace-nowrap" style={txt(18, 600, "#828282")}>
            남기고 싶은 말이 있나요?
          </p>
          <img
            alt="보내기"
            src="/assets/hero-send.svg"
            className="flex-shrink-0"
            style={{ width: "clamp(11px, 1.667vw, 24px)", height: "clamp(11px, 1.667vw, 24px)" }} />
        </div>

        {/* 네비게이션 */}
        <nav
          className="absolute flex items-start justify-between"
          style={{ left: "5.556%", top: "clamp(45px, 7.014vw, 101px)", width: "88.889%" }}
        >
          {/* 좌측: 학교명 + 타이틀 이미지 */}
          <div className="flex flex-col items-start">
            <p style={{ ...txt(24, 600, "white"), padding: "clamp(5px, 0.694vw, 10px) clamp(13px, 1.944vw, 28px)" }}>
              서울여자대학교 첨단미디어디자인전공<br />
              제2회 졸업전시
            </p>
            <img
              alt="우리의 거점"
              src="/assets/hero-title.png"
              style={{
                marginLeft: "clamp(12px, 1.806vw, 26px)",
                marginTop: "clamp(11px, 1.667vw, 24px)",
                width: "clamp(211px, 32.5vw, 468px)",
                height: "clamp(38px, 5.938vw, 85.5px)",
                objectFit: "cover",
              }}
            />
          </div>

          {/* 우측: 메뉴 */}
          <div className="flex items-center" style={{ paddingTop: "clamp(4px, 0.556vw, 8px)" }}>
            {navLinks.map((item) =>
              item === "거점" ? (
                <div
                  key={item}
                  className="flex items-center justify-center rounded-full"
                  style={{
                    backgroundColor: "#aedce9",
                    padding: "clamp(5px, 0.694vw, 10px) clamp(5px, 0.833vw, 12px)",
                    width: "clamp(61px, 9.375vw, 135px)",
                  }}
                >
                  <p className="whitespace-nowrap text-center" style={txt(30, 800, "#38b3d6")}>{item}</p>
                </div>
              ) : (
                <div
                  key={item}
                  className="flex items-center justify-center cursor-pointer"
                  style={{ width: "clamp(61px, 9.375vw, 135px)", height: "clamp(29px, 4.514vw, 65px)" }}
                >
                  <p className="whitespace-nowrap text-center" style={txt(30, 800, "white")}>{item}</p>
                </div>
              )
            )}
          </div>
        </nav>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 2 · 텍스트 섹션
      ══════════════════════════════════════════════════════════ */}
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

      {/* ══════════════════════════════════════════════════════════
          SECTION 3 · 카테고리 슬라이더
      ══════════════════════════════════════════════════════════ */}
      <section
        className="bg-white"
        style={{ padding: "clamp(32px, 5.56vw, 80px) clamp(16px, 4.44vw, 64px)" }}
      >
        {/* 트랙 레이블 + 컬러 도트 */}
        <div className="flex flex-col items-center" style={{ gap: "clamp(6px, 0.56vw, 8px)", marginBottom: "clamp(20px, 3.47vw, 50px)" }}>
          <p style={txt(12, 600, "black")}>UX</p>
          <div className="flex items-center" style={{ gap: "clamp(10px, 1.53vw, 22px)" }}>
            {trackDots.map((color) => (
              <div
                key={color}
                className="rounded-full flex-shrink-0"
                style={{
                  backgroundColor: color,
                  width: "clamp(14px, 2.08vw, 30px)",
                  height: "clamp(14px, 2.08vw, 30px)",
                }}
              />
            ))}
          </div>
        </div>

        {/* 슬라이더 영역 */}
        <div className="flex items-center" style={{ gap: "clamp(8px, 1.11vw, 16px)" }}>
          {/* 이전 화살표 */}
          <div
            className="flex-shrink-0"
            style={{ width: "clamp(32px, 4.44vw, 64px)", height: "clamp(32px, 4.44vw, 64px)", transform: "rotate(180deg)" }}
          >
            <img alt="이전" src="/assets/arrow-forward.svg" className="w-full h-full" />
          </div>

          {/* 핑크 카드 */}
          <div className="flex-1 overflow-x-auto">
            <div style={{ backgroundColor: "#ffeef0", minWidth: "480px" }}>
              {/* 수평 구분선 */}
              <div style={{ position: "relative", height: "clamp(40px, 4.24vw, 61px)", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }} />
                </div>
                {/* 열 헤더 */}
                <div className="absolute inset-0 grid" style={{ gridTemplateColumns: "1fr 2fr 1fr" }}>
                  {["UX", "개요", "교수님"].map((h) => (
                    <p key={h} className="flex items-center justify-center whitespace-nowrap" style={txt(18, 800, "black")}>
                      {h}
                    </p>
                  ))}
                </div>
              </div>

              {/* 데이터 행 */}
              <div
                className="grid items-start"
                style={{
                  gridTemplateColumns: "1fr 2fr 1fr",
                  padding: "clamp(16px, 5.76vw, 83px) 0",
                }}
              >
                {/* UX 열 */}
                <div className="flex flex-col items-center" style={{ gap: "clamp(12px, 4.17vw, 60px)", padding: "0 clamp(8px, 1.11vw, 16px)" }}>
                  <p className="whitespace-nowrap underline" style={txt(18, 600, "black")}>작품, 3개</p>
                  <div className="flex flex-col items-center" style={{ gap: "clamp(4px, 0.56vw, 8px)" }}>
                    <p className="whitespace-nowrap" style={txt(18, 600, "black")}>참여자, 4명</p>
                    {["성이름", "성이름", "성이름", "성이름"].map((name, i) => (
                      <p key={i} className="whitespace-nowrap" style={txt(18, 200, "#828282")}>{name}</p>
                    ))}
                  </div>
                </div>

                {/* 개요 열 */}
                <div style={{ padding: "0 clamp(10px, 2.08vw, 30px)" }}>
                  <p style={{ ...txt(12, 400, "#63636e"), lineHeight: 1.7 }}>
                    어쩌구 그래서 이런 것을 전시합니다 그래서 이런 것을 준비했는데 예쁘게 봐주세요
                    어쩌구 그래서 이런 것을 전시합니다 그래서 이런 것을 준비했는데 예쁘게 봐주세요
                  </p>
                </div>

                {/* 교수님 열 */}
                <div className="flex justify-center" style={{ padding: "0 clamp(8px, 1.11vw, 16px)" }}>
                  <p className="whitespace-nowrap" style={txt(18, 400, "black")}>유영재 교수님</p>
                </div>
              </div>
            </div>
          </div>

          {/* 다음 화살표 */}
          <div
            className="flex-shrink-0"
            style={{ width: "clamp(32px, 4.44vw, 64px)", height: "clamp(32px, 4.44vw, 64px)" }}
          >
            <img alt="다음" src="/assets/arrow-forward.svg" className="w-full h-full" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 4 · 졸업전시위원회
      ══════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(to bottom, rgba(230,245,249,0.18) 0%, #e6f5f9 100%)",
          padding: "clamp(32px, 4.93vw, 71px) clamp(16px, 5.56vw, 80px) clamp(32px, 4.44vw, 64px)",
        }}
      >
        {/* 헤더 행 */}
        <div className="flex items-start justify-between" style={{ marginBottom: "clamp(24px, 3.68vw, 53px)" }}>
          <p className="whitespace-nowrap" style={txt(40, 800, "#2174a4")}>졸업전시위원회</p>
          <div
            className="flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: "#a8e6f8",
              borderRadius: 18,
              padding: "clamp(4px, 0.42vw, 6px) clamp(8px, 0.69vw, 10px)",
            }}
          >
            <p className="whitespace-nowrap" style={txt(12, 600, "#007aa3")}>졸업전시위원회 인터뷰 보러가기</p>
          </div>
        </div>

        {/* 위원 목록 */}
        <div className="grid grid-cols-3" style={{ gap: "clamp(16px, 2.22vw, 32px)" }}>
          {/* 위원장·부위원장 */}
          <div className="flex flex-col" style={{ gap: "clamp(10px, 1.46vw, 21px)" }}>
            {committeeLeft.map((m, i) => (
              <div key={i} className="flex items-center flex-wrap" style={{ gap: "clamp(4px, 0.83vw, 12px)" }}>
                <p className="whitespace-nowrap" style={txt(24, 800, "black")}>{m.role}</p>
                <p className="whitespace-nowrap" style={txt(24, 600, "black")}>{m.name}</p>
              </div>
            ))}
            <p style={txt(12, 600, "black")}>23</p>
          </div>

          {/* 기획팀 */}
          <div className="flex flex-col" style={{ gap: "clamp(10px, 1.46vw, 21px)" }}>
            {committeeMid.map((m, i) => (
              <div key={i} className="flex items-center flex-wrap" style={{ gap: "clamp(4px, 0.83vw, 12px)" }}>
                <p className="whitespace-nowrap" style={txt(24, 800, "black")}>{m.role}</p>
                <p className="whitespace-nowrap" style={txt(24, 600, "black")}>{m.name}</p>
              </div>
            ))}
            <p style={txt(12, 600, "black")}>22</p>
          </div>

          {/* 디자인팀 */}
          <div className="flex flex-col" style={{ gap: "clamp(10px, 1.46vw, 21px)" }}>
            {committeeRight.map((m, i) => (
              <div key={i} className="flex items-center flex-wrap" style={{ gap: m.role ? "clamp(4px, 0.83vw, 12px)" : "0" }}>
                {m.role && <p className="whitespace-nowrap" style={txt(24, 800, "black")}>{m.role}</p>}
                <p className="whitespace-nowrap" style={txt(24, 600, "black")}>{m.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 5 · 협찬
      ══════════════════════════════════════════════════════════ */}
      <section style={{ padding: "clamp(32px, 4.93vw, 71px) clamp(16px, 5.56vw, 80px)" }}>
        <p
          className="text-center whitespace-nowrap"
          style={{ ...txt(40, 800, "#2174a4"), marginBottom: "clamp(24px, 2.78vw, 40px)" }}
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

      {/* ══════════════════════════════════════════════════════════
          SECTION 6 · 푸터
      ══════════════════════════════════════════════════════════ */}
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

      <ScrollToTop />
    </div>
  );
}
