"use client";

import { useState, useRef, useEffect } from "react";
import NavBar from "./NavBar";

/* ─── 배경 이미지 ─────────────────────────────────────────────── */
const img1Dark   = "/assets/hero-bg1.svg";
const img1Light  = "/nmd_asset01.png";
const img2       = "/assets/hero-bg3.svg";
const imgVector1 = "/assets/hero-vector.svg";

const INITIAL_BUBBLES: string[] = [];

const T = "0.5s ease";

type Bubble = { id: number; text: string };
let nextId = 0;

export default function HeroSection() {
  const [isLight, setIsLight] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const submitMessage = () => {
    const text = inputValue.trim();
    if (!text) return;
    setBubbles((prev) => [...prev.slice(-8), { id: nextId++, text }]);
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
        @keyframes bubble-rise {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div
        className="absolute"
        style={{ left: "1199px", bottom: "18%", width: "200px", height: "432px" }}
      >
        {bubbles.map(({ id, text }, i) => {
          const fromBottom = (bubbles.length - 1 - i) * 48;
          const isNew = i === bubbles.length - 1;
          return (
            <div
              key={id}
              style={{
                position: "absolute",
                bottom: `${fromBottom}px`,
                right: 0,
                transition: "bottom 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                height: "38px", padding: "0 12px",
                borderRadius: "100px",
                backgroundColor: "rgba(255,255,255,0.8)",
                backdropFilter: "blur(2px)",
                boxShadow: "0px 0px 10px 0px rgba(0,184,238,0.24)",
                whiteSpace: "nowrap",
                ...(isNew && {
                  animation: "bubble-rise 0.45s cubic-bezier(0.22, 1, 0.36, 1) both",
                  willChange: "transform, opacity",
                }),
              }}
            >
              <p style={{ fontSize: "12px", fontWeight: 600, color: "#202024", textAlign: "center" }}>
                {text}
              </p>
            </div>
          );
        })}
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
