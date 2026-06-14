import type { CSSProperties } from "react";
import ScrollToTop from "./components/ScrollToTop";
import CategorySlider from "./components/CategorySlider";

/* ─── 배경 이미지 ────────────────────────────────────────────────── */

const img1 = "https://www.figma.com/api/mcp/asset/3d8e2f49-628a-4a9c-9d2e-d1c561bc931d";
const imgVector = "https://www.figma.com/api/mcp/asset/e08550b7-3bdd-48fc-a58e-b851f39be9bc";
const img2 = "https://www.figma.com/api/mcp/asset/291546da-52c6-4d23-9d55-db5b73ba6a38";
const imgVector1 = "https://www.figma.com/api/mcp/asset/f0113058-7e60-4632-9c93-38cc6f764c8c";

/* ─── 정적 데이터 ─────────────────────────────────────────────────── */

const chatBubbles = [
  { text: "여름 졸전 멋있다",           w: "99px"  },
  { text: "교수님...",                   w: "61px"  },
  { text: "여름 졸전 멋있다",           w: "99px"  },
  { text: "교수님...",                   w: "61px"  },
  { text: "졸준위 고생했어요 사랑해!!!", w: "151px" },
  { text: "첨단미디어디자인 가고 싶어요", w: "161px" },
  { text: "전시 잘 봤어요. 멋져요",      w: "125px" },
];

const navLinks = ["거점", "작품", "디자이너", "방명록", "현장"];

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
        style={{ width: "100%", height: "100vh", backgroundColor: "#0a99d1" }}
      >
        {/* 레이어 1: overflow-clip 컨테이너 */}
        <div className="absolute bg-[#0fa7d2] h-full left-0 overflow-clip top-0 w-[1440px]">
          {/* 배경 일러스트 */}
          <div className="absolute h-[1444.826px] left-0 top-[-278.92px] w-[1440px]">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={img1} />
          </div>
        </div>

        {/* 레이어 2: 네트워크 오버레이 */}
        <div className="absolute h-[1444.826px] left-0 top-[-278.92px] w-[1440px]">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={img2} />
        </div>

        {/* 레이어 3: Vector 장식 2 */}
        <div className="absolute" style={{ left: "20.76%", top: "65.06%", width: "58.48%" }}>
          <img alt="" className="block w-full h-auto" src={imgVector1} />
        </div>

        {/* 네비게이션 바 */}
        <div className="absolute content-stretch flex items-start justify-between left-[80px] top-[101px] w-[1280px]">
          {/* 좌측 블록 */}
          <div className="flex flex-col" style={{ width: "520.586px", height: "227px" }}>
            <div style={{ padding: "10px 28px" }}>
              <p
                style={{
                  fontSize: "24px",
                  fontWeight: 600,
                  color: "white",
                  letterSpacing: "-0.48px",
                  lineHeight: 1.5,
                }}
              >
                서울여자대학교 첨단미디어디자인전공<br />
                제2회 졸업전시
              </p>
            </div>
            <div className="relative overflow-hidden" style={{ width: "520px", height: "135px" }}>
              <img
                alt="우리의 거점"
                src="/assets/hero-title.png"
                className="absolute"
                style={{ left: "26px", top: "24px", width: "468px", height: "85.5px", objectFit: "cover" }}
              />
            </div>
          </div>

          {/* 우측 메뉴 */}
          <div className="flex items-center">
            <div
              className="flex items-center justify-center"
              style={{ width: "135px", backgroundColor: "#aedce9", borderRadius: "100px", padding: "10px 12px" }}
            >
              <p style={{ fontSize: "30px", fontWeight: 800, color: "#38b3d6", letterSpacing: "-0.6px", lineHeight: 1.5, whiteSpace: "nowrap" }}>
                거점
              </p>
            </div>
            {["작품", "디자이너", "방명록", "현장"].map((item) => (
              <div
                key={item}
                className="flex items-center justify-center"
                style={{ width: "135px", height: "65px" }}
              >
                <p style={{ fontSize: "30px", fontWeight: 800, color: "white", letterSpacing: "-0.6px", lineHeight: 1.5, whiteSpace: "nowrap", textAlign: "center" }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 말풍선 컨테이너 */}
        <div
          className="absolute flex flex-col items-end"
          style={{ left: "1199px", top: "44%", width: "161px", gap: "10px" }}
        >
          {chatBubbles.map(({ text, w }, i) => (
            <div
              key={i}
              className="flex items-center justify-center"
              style={{
                width: w,
                height: "38px",
                padding: "10px",
                borderRadius: "100px",
                backgroundColor: "rgba(255,255,255,0.8)",
                backdropFilter: "blur(2px)",
                boxShadow: "0px 0px 10px 0px rgba(0,184,238,0.24)",
                whiteSpace: "nowrap",
              }}
            >
              <p style={{ fontSize: "12px", fontWeight: 600, color: "#202024", textAlign: "center" }}>
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* 방명록 입력창 */}
        <div
          className="absolute flex items-center justify-center"
          style={{
            left: "993px",
            top: "87.82%",
            width: "367px",
            height: "53px",
            backgroundColor: "white",
            borderRadius: "100px",
            padding: "10px",
            gap: "10px",
          }}
        >
          <p style={{ fontSize: "18px", fontWeight: 600, color: "#828282", letterSpacing: "-0.36px", whiteSpace: "nowrap" }}>
            남기고 싶은 말이 있나요?
          </p>
          <img
            alt="보내기"
            src="/assets/hero-send.svg"
            className="absolute"
            style={{ left: "328px", top: "14.5px", width: "24px", height: "24px" }}
          />
        </div>
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
      <CategorySlider />

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
        {/* 헤더 행 — 타이틀 가운데, 뱃지 오른쪽 */}
        <div className="flex items-start" style={{ marginBottom: "clamp(24px, 3.68vw, 53px)" }}>
          <div style={{ flex: 1 }} />
          <p className="whitespace-nowrap" style={txt(40, 800, "#2174a4")}>졸업전시위원회</p>
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
            <p className="whitespace-nowrap text-right" style={txt(24, 800, "black")}>위원장</p>
            <p className="whitespace-nowrap" style={txt(24, 600, "black")}>김지유</p>
            <p className="whitespace-nowrap text-right" style={txt(24, 800, "black")}>부위원장</p>
            <p className="whitespace-nowrap" style={txt(24, 600, "black")}>
              김도연<span style={{ fontSize: "12px", fontWeight: 600, verticalAlign: "baseline" }}>23</span>
            </p>
          </div>

          {/* 기획팀 — 좌측 정렬 */}
          <div className="flex flex-col items-start" style={{ gap: "clamp(10px, 1.46vw, 21px)" }}>
            <div className="flex items-center" style={{ gap: "clamp(4px, 0.83vw, 12px)" }}>
              <p className="whitespace-nowrap" style={txt(24, 800, "black")}>기획팀장</p>
              <p className="whitespace-nowrap" style={txt(24, 600, "black")}>김채현</p>
            </div>
            <div className="flex items-baseline" style={{ gap: "clamp(4px, 0.83vw, 12px)" }}>
              <p className="whitespace-nowrap" style={txt(24, 800, "black")}>기획팀원</p>
              <p className="whitespace-nowrap" style={txt(24, 600, "black")}>김도연</p>
              <p className="whitespace-nowrap" style={txt(12, 600, "black")}>22</p>
            </div>
          </div>

          {/* 디자인팀 — 좌측 정렬, 이름만 우측 정렬 */}
          <div className="flex flex-col items-start" style={{ gap: "clamp(10px, 1.46vw, 21px)" }}>
            <div className="flex items-center" style={{ gap: "clamp(4px, 0.83vw, 12px)" }}>
              <p className="whitespace-nowrap" style={txt(24, 800, "black")}>디자인팀장</p>
              <p className="whitespace-nowrap" style={txt(24, 600, "black")}>김지아</p>
            </div>
            <div className="flex items-center" style={{ gap: "clamp(4px, 0.83vw, 12px)" }}>
              <p className="whitespace-nowrap" style={txt(24, 800, "black")}>디자인팀원</p>
              <p className="whitespace-nowrap" style={txt(24, 600, "black")}>서한이</p>
            </div>
            <div className="flex justify-end" style={{ width: "clamp(80px, 12.15vw, 175px)" }}>
              <p className="whitespace-nowrap" style={txt(24, 600, "black")}>윤내경</p>
            </div>
            <div className="flex justify-end" style={{ width: "clamp(80px, 12.15vw, 175px)" }}>
              <p className="whitespace-nowrap" style={txt(24, 600, "black")}>진민서</p>
            </div>
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
