"use client";

import { useState, useRef } from "react";
import NavBar from "./NavBar";

/* ─── 배경 이미지 ─────────────────────────────────────────────── */
const img1Dark  = "https://www.figma.com/api/mcp/asset/3d8e2f49-628a-4a9c-9d2e-d1c561bc931d";
const img1Light = "https://www.figma.com/api/mcp/asset/d52e1b7c-03ff-4ae1-bbf9-e2bef6e5d71e";
const img2      = "https://www.figma.com/api/mcp/asset/291546da-52c6-4d23-9d55-db5b73ba6a38";
const imgVector1 = "https://www.figma.com/api/mcp/asset/f0113058-7e60-4632-9c93-38cc6f764c8c";

const INITIAL_BUBBLES: string[] = [];

const T = "0.5s ease";

export default function HeroSection() {
  const [isLight, setIsLight] = useState(false);
  const [bubbles, setBubbles] = useState<string[]>(INITIAL_BUBBLES);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const submitMessage = () => {
    const text = inputValue.trim();
    if (!text) return;
    setBubbles((prev) => [...prev.slice(-8), text]);
    setInputValue("");
    inputRef.current?.focus();
  };

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
        <div className="absolute bg-[#0fa7d2] h-full left-0 overflow-clip top-0 w-full">
          <div className="absolute h-[1444.826px] left-0 top-[-278.92px] w-full">
            <img alt="" className="absolute block inset-0 max-w-none size-full object-cover" src={img1Dark} />
          </div>
        </div>
        <div className="absolute h-[1444.826px] left-0 top-[-278.92px] w-full">
          <img alt="" className="absolute block inset-0 max-w-none size-full object-cover" src={img2} />
        </div>
      </div>

      {/* ── 라이트 배경 레이어 (node 66-2294) ───────────── */}
      <div
        className="absolute inset-0"
        style={{ opacity: isLight ? 1 : 0, transition: `opacity ${T}`, pointerEvents: "none" }}
      >
        <div className="absolute h-[1444.826px] left-0 top-[-278.92px] w-full">
          <img alt="" className="absolute block inset-0 max-w-none size-full object-cover" src={img1Light} />
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
      <div className="absolute top-[101px]" style={{ left: "clamp(16px, 5.56vw, 80px)", right: "clamp(16px, 5.56vw, 80px)" }}>
        <NavBar activeItem="거점" isLight={isLight} />
      </div>

      {/* ── 말풍선 ────────────────────────────────────── */}
      <style>{`
        @keyframes bubble-pop {
          from { opacity: 0; transform: scale(0.8) translateY(6px); }
          to   { opacity: 1; transform: scale(1)   translateY(0);   }
        }
      `}</style>
      <div
        className="absolute flex flex-col items-end"
        style={{ left: "1199px", top: "44%", width: "200px", gap: "10px" }}
      >
        {bubbles.map((text, i) => (
          <div
            key={`${i}-${text}`}
            className="flex items-center justify-center"
            style={{
              height: "38px", padding: "0 12px",
              borderRadius: "100px",
              backgroundColor: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(2px)",
              boxShadow: "0px 0px 10px 0px rgba(0,184,238,0.24)",
              whiteSpace: "nowrap",
              animation: i === bubbles.length - 1 ? "bubble-pop 0.3s cubic-bezier(0.22,1,0.36,1) both" : "none",
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
        className="absolute flex items-center"
        onClick={(e) => e.stopPropagation()}
        style={{
          left: "993px", top: "87.82%",
          width: "367px", height: "53px",
          backgroundColor: "white", borderRadius: "100px",
          padding: "0 16px 0 24px",
        }}
      >
        <input
          ref={inputRef}
          type="text"
          className="guestbook"
          placeholder="남기고 싶은 말이 있나요?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") submitMessage(); }}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            fontSize: "18px",
            fontWeight: 600,
            color: "#202024",
            letterSpacing: "-0.36px",
            fontFamily: "inherit",
          }}
        />
        <img
          alt="보내기"
          src="/assets/hero-send.svg"
          onClick={submitMessage}
          style={{ width: "22px", height: "22px", flexShrink: 0, cursor: "pointer" }}
        />
      </div>
    </section>
  );
}
