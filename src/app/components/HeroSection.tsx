"use client";

import { useState } from "react";

/* ─── 배경 이미지 ─────────────────────────────────────────────── */
const img1Dark  = "https://www.figma.com/api/mcp/asset/3d8e2f49-628a-4a9c-9d2e-d1c561bc931d";
const img1Light = "https://www.figma.com/api/mcp/asset/d52e1b7c-03ff-4ae1-bbf9-e2bef6e5d71e";
const img2      = "https://www.figma.com/api/mcp/asset/291546da-52c6-4d23-9d55-db5b73ba6a38";
const imgVector1 = "https://www.figma.com/api/mcp/asset/f0113058-7e60-4632-9c93-38cc6f764c8c";

const chatBubbles = [
  { text: "여름 졸전 멋있다",             w: "99px"  },
  { text: "교수님...",                     w: "61px"  },
  { text: "여름 졸전 멋있다",             w: "99px"  },
  { text: "교수님...",                     w: "61px"  },
  { text: "졸준위 고생했어요 사랑해!!!",   w: "151px" },
  { text: "첨단미디어디자인 가고 싶어요", w: "161px" },
  { text: "전시 잘 봤어요. 멋져요",        w: "125px" },
];

const T = "0.5s ease";

export default function HeroSection() {
  const [isLight, setIsLight] = useState(false);

  return (
    <section
      className="relative overflow-hidden"
      onClick={() => setIsLight((v) => !v)}
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: isLight ? "white" : "#0a99d1",
        transition: `background-color ${T}`,
        cursor: "pointer",
      }}
    >
      {/* ── 다크 배경 레이어 ─────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{ opacity: isLight ? 0 : 1, transition: `opacity ${T}`, pointerEvents: "none" }}
      >
        <div className="absolute bg-[#0fa7d2] h-full left-0 overflow-clip top-0 w-[1440px]">
          <div className="absolute h-[1444.826px] left-0 top-[-278.92px] w-[1440px]">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={img1Dark} />
          </div>
        </div>
        <div className="absolute h-[1444.826px] left-0 top-[-278.92px] w-[1440px]">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={img2} />
        </div>
      </div>

      {/* ── 라이트 배경 레이어 (node 66-2294) ───────────── */}
      <div
        className="absolute inset-0"
        style={{ opacity: isLight ? 1 : 0, transition: `opacity ${T}`, pointerEvents: "none" }}
      >
        <div className="absolute h-[1444.826px] left-0 top-[-278.92px] w-[1440px]">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={img1Light} />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(174,220,233,0.2), rgba(250,250,248,0.2) 50%, rgba(174,220,233,0.2))",
          }}
        />
      </div>

      {/* ── Vector 장식 (다크 모드만) ────────────────────── */}
      <div
        className="absolute"
        style={{
          left: "20.76%", top: "65.06%", width: "58.48%",
          opacity: isLight ? 0 : 1,
          transition: `opacity ${T}`,
          pointerEvents: "none",
        }}
      >
        <img alt="" className="block w-full h-auto" src={imgVector1} />
      </div>

      {/* ── 네비게이션 바 ──────────────────────────────── */}
      <div className="absolute content-stretch flex items-start justify-between left-[80px] top-[101px] w-[1280px]">
        {/* 좌측: 학교명 + 타이틀 */}
        <div className="flex flex-col" style={{ width: "520.586px", height: "227px" }}>
          <div style={{ padding: "10px 28px" }}>
            <p
              style={{
                fontSize: "24px",
                fontWeight: 600,
                color: isLight ? "black" : "white",
                letterSpacing: "-0.48px",
                lineHeight: 1.5,
                transition: `color ${T}`,
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
              style={{
                left: "26px", top: "24px", width: "468px", height: "85.5px", objectFit: "cover",
                filter: isLight
                  ? "brightness(0) saturate(100%) invert(68%) sepia(27%) saturate(607%) hue-rotate(163deg) brightness(97%) contrast(90%)"
                  : "none",
                transition: `filter ${T}`,
              }}
            />
          </div>
        </div>

        {/* 우측 메뉴 */}
        <div className="flex items-center">
          {/* 거점 */}
          <div
            className="flex items-center justify-center"
            style={{
              width: "135px",
              backgroundColor: isLight ? "#38b3d6" : "#aedce9",
              borderRadius: "100px",
              padding: "10px 12px",
              transition: `background-color ${T}`,
            }}
          >
            <p
              style={{
                fontSize: "30px", fontWeight: 800,
                color: isLight ? "#f7f7f7" : "#38b3d6",
                letterSpacing: "-0.6px", lineHeight: 1.5, whiteSpace: "nowrap",
                transition: `color ${T}`,
              }}
            >
              거점
            </p>
          </div>

          {["작품", "디자이너", "방명록", "현장"].map((item) => (
            <div
              key={item}
              className="flex items-center justify-center"
              style={{ width: "135px", height: "65px" }}
            >
              <p
                style={{
                  fontSize: "30px", fontWeight: 800,
                  color: isLight ? "black" : "white",
                  letterSpacing: "-0.6px", lineHeight: 1.5,
                  whiteSpace: "nowrap", textAlign: "center",
                  transition: `color ${T}`,
                }}
              >
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── 말풍선 ────────────────────────────────────── */}
      <div
        className="absolute flex flex-col items-end"
        style={{ left: "1199px", top: "44%", width: "161px", gap: "10px" }}
      >
        {chatBubbles.map(({ text, w }, i) => (
          <div
            key={i}
            className="flex items-center justify-center"
            style={{
              width: w, height: "38px", padding: "10px",
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

      {/* ── 방명록 입력창 ─────────────────────────────── */}
      <div
        className="absolute flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
        style={{
          left: "993px", top: "87.82%",
          width: "367px", height: "53px",
          backgroundColor: "white", borderRadius: "100px",
          padding: "10px", gap: "10px",
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
  );
}
